// Token approximation, prices and the hard spend cap.
//
// Token counts are an approximation (no API key is needed to plan or estimate):
// English Markdown at 3.5 characters per token, which over-counts ordinary
// English prose (about 4 characters per token) so the estimate errs on the
// high side, plus 3 tokens per placeholder ("{12}"). Output tokens are the
// source tokens times a per-language expansion factor: the translations are
// longer than the English and the tokenizer is less efficient outside English.
// Real usage comes back with every response and is what the cap tracks.

export const CHARS_PER_TOKEN = 3.5;
export const TOKENS_PER_PLACEHOLDER = 3;
/** Output tokens per source token, by target language (deliberately high). */
export const EXPANSION = { es: 1.4, fr: 1.45, de: 1.5, pt: 1.4 };
/** JSON framing per segment: {"id":"12","k":"p","text":"..."} in, {"id":"12","t":"..."} out. */
export const SEGMENT_OVERHEAD_IN = 14;
export const SEGMENT_OVERHEAD_OUT = 12;
/** The user message framing around the segments. */
export const REQUEST_OVERHEAD_IN = 60;

/** USD per million tokens (Claude API list prices). */
export const PRICES = {
  'claude-haiku-4-5': { input: 1, output: 5 },
  'claude-sonnet-4-5': { input: 3, output: 15 },
  'claude-sonnet-4-6': { input: 3, output: 15 },
  'claude-sonnet-5': { input: 2, output: 10 },
  'claude-opus-4-5': { input: 5, output: 25 },
  'claude-opus-4-6': { input: 5, output: 25 },
  'claude-opus-5': { input: 5, output: 25 },
};
/** Prompt caching multipliers on the input price; the Batches API halves everything. */
export const CACHE_WRITE = { '5m': 1.25, '1h': 2 };
export const CACHE_READ = 0.1;
export const BATCH_DISCOUNT = 0.5;
/** Haiku 4.5 caches a prefix only from 4,096 tokens; other models from 1,024 or less. */
export const MIN_CACHEABLE = { 'claude-haiku-4-5': 4096 };

const baseModel = (model) => model.replace(/-\d{8}$/, '');

/** Prices for a model id (dated snapshots resolve to their alias); overrides win. */
export function priceFor(model, override = {}) {
  const p = PRICES[baseModel(model)];
  const input = override.input ?? p?.input;
  const output = override.output ?? p?.output;
  if (input === undefined || output === undefined) {
    throw new Error(`no price known for ${model}: pass --price-in and --price-out (USD per million tokens)`);
  }
  return { input, output };
}

export function minCacheable(model) {
  return MIN_CACHEABLE[baseModel(model)] ?? 1024;
}

/** Approximate tokens of a (protected) string. */
export function approxTokens(text) {
  const placeholders = (text.match(/\{\d+\}/g) || []).length;
  const rest = text.replace(/\{\d+\}/g, '').length;
  return Math.ceil(rest / CHARS_PER_TOKEN) + placeholders * TOKENS_PER_PLACEHOLDER;
}

export function expectedOutputTokens(sourceTokens, lang) {
  return Math.ceil(sourceTokens * (EXPANSION[lang] ?? 1.5));
}

/**
 * Output ceiling for one request: generous enough never to truncate a normal
 * answer, and at most 16,000 so a non-streaming call stays well inside the
 * SDK's ten-minute limit (it refuses non-streaming requests above ~21,000).
 */
export function maxTokensFor(expectedOut) {
  return Math.min(16000, Math.ceil(expectedOut * 1.3) + 300);
}

/**
 * USD of one response's usage.
 * @param usage the API usage object (input_tokens, output_tokens, cache_* fields)
 */
export function usageCost(usage, price, { batch = false } = {}) {
  const u = usage ?? {};
  const m = 1e-6;
  const w1h = u.cache_creation?.ephemeral_1h_input_tokens;
  const w5m = u.cache_creation?.ephemeral_5m_input_tokens;
  const writes = w1h !== undefined || w5m !== undefined
    ? (w5m ?? 0) * CACHE_WRITE['5m'] + (w1h ?? 0) * CACHE_WRITE['1h']
    : (u.cache_creation_input_tokens ?? 0) * CACHE_WRITE['1h'];
  const inputUsd = ((u.input_tokens ?? 0) + writes + (u.cache_read_input_tokens ?? 0) * CACHE_READ) * price.input * m;
  const outputUsd = (u.output_tokens ?? 0) * price.output * m;
  return (inputUsd + outputUsd) * (batch ? BATCH_DISCOUNT : 1);
}

/**
 * Worst case of one request before it is sent: the whole prompt billed as a
 * cache write (the dearest way to pay for input), 15% on top of the input
 * approximation, and every token of max_tokens produced.
 */
export function projectedMaxCost({ systemTokens, userTokens, maxTokens }, price, { batch = false, ttl = '5m' } = {}) {
  const m = 1e-6;
  const input = (systemTokens * (CACHE_WRITE[ttl] ?? 1) + userTokens) * 1.15 * price.input * m;
  const output = maxTokens * price.output * m;
  return (input + output) * (batch ? BATCH_DISCOUNT : 1);
}

/**
 * The hard cap. `reserve` refuses (returns null) when the spend so far plus
 * what is in flight plus this request's worst case would pass the cap; `settle`
 * swaps a reservation for the real cost from the response.
 */
export class Budget {
  constructor(capUsd) {
    if (!(capUsd >= 0)) throw new Error(`--max-usd must be a number >= 0, got ${capUsd}`);
    this.cap = capUsd;
    this.spent = 0;
    this.reserved = new Map();
    this.nextId = 1;
    this.refused = 0;
  }

  get inFlight() {
    let s = 0;
    for (const v of this.reserved.values()) s += v;
    return s;
  }

  canAfford(usd) {
    return this.spent + this.inFlight + usd <= this.cap + 1e-12;
  }

  reserve(usd) {
    if (!this.canAfford(usd)) {
      this.refused++;
      return null;
    }
    const id = this.nextId++;
    this.reserved.set(id, usd);
    return id;
  }

  settle(id, realUsd) {
    this.reserved.delete(id);
    this.spent += realUsd;
  }

  /** Real spend that arrives without a reservation (results of an earlier batch). */
  record(realUsd) {
    this.spent += realUsd;
  }

  release(id) {
    this.reserved.delete(id);
  }
}

/**
 * Estimated cost of a set of requests, per scenario.
 * @param requests [{ lang, systemTokens, userTokens, expectedOut }]
 */
export function estimateCost(requests, { model, price, systemTokens, ttl = '5m' }) {
  const m = 1e-6;
  const byLang = {};
  const cacheable = ttl !== 'off' && systemTokens >= minCacheable(model);
  const write = CACHE_WRITE[ttl] ?? 1;
  for (const r of requests) {
    const e = (byLang[r.lang] ??= { requests: 0, segments: 0, sourceTokens: 0, userTokens: 0, systemTokens: 0, outputTokens: 0 });
    e.requests++;
    e.segments += r.segments;
    e.sourceTokens += r.sourceTokens;
    e.userTokens += r.userTokens;
    e.systemTokens += systemTokens;
    e.outputTokens += r.expectedOut;
  }
  const scenarios = (e) => {
    const out = e.outputTokens * price.output * m;
    const user = e.userTokens * price.input * m;
    const sysPlain = e.systemTokens * price.input * m;
    // With caching, best case: one write of the system prompt per language, then reads.
    const sysCached = cacheable
      ? (systemTokens * write + (e.systemTokens - systemTokens) * CACHE_READ) * price.input * m
      : sysPlain;
    return {
      sync: user + sysPlain + out,
      syncCached: user + sysCached + out,
      batch: (user + sysPlain + out) * BATCH_DISCOUNT,
      batchCached: (user + sysCached + out) * BATCH_DISCOUNT,
    };
  };
  const rows = Object.entries(byLang).map(([lang, e]) => ({ lang, ...e, usd: scenarios(e) }));
  const total = rows.reduce(
    (t, r) => {
      for (const k of ['requests', 'segments', 'sourceTokens', 'userTokens', 'systemTokens', 'outputTokens']) t[k] += r[k];
      for (const k of Object.keys(r.usd)) t.usd[k] += r.usd[k];
      return t;
    },
    { lang: 'total', requests: 0, segments: 0, sourceTokens: 0, userTokens: 0, systemTokens: 0, outputTokens: 0, usd: { sync: 0, syncCached: 0, batch: 0, batchCached: 0 } },
  );
  return { rows, total, cacheable };
}
