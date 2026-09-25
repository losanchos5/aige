// The pipeline: plan what needs translating, translate it (mock, Messages API or
// Message Batches API) under a hard spend cap, validate every segment, keep the
// good ones in the translation memory and write the translated files.

import { existsSync, mkdirSync, readFileSync, renameSync, unlinkSync, writeFileSync } from 'node:fs';
import { dirname, isAbsolute, join, relative, sep } from 'node:path';

import { DEFAULT_MODEL, LANGS, REQUEST_SOURCE_TOKENS } from './config.mjs';
import {
  Budget, approxTokens, estimateCost, expectedOutputTokens, maxTokensFor, minCacheable, priceFor,
  projectedMaxCost, SEGMENT_OVERHEAD_OUT, usageCost,
} from './cost.mjs';
import { appliesTo, discoverSources, existingHash, loadSource, outputPath, renderTranslation } from './document.mjs';
import { globToRegExp } from './glob.mjs';
import { loadCallouts, loadGlossary, localizeLabel } from './glossary.mjs';
import { MOCK_MODEL, mockTranslate } from './mock.mjs';
import { buildParams, buildSystemPrompt, buildUserMessage, parseResponse } from './prompt.mjs';
import { prepareSegment, validateTranslation } from './segment.mjs';
import { TranslationMemory } from './tm.mjs';

const HASH_PREFIX = 12;
const PENDING_FILE = 'pending-batches.json';

/** Split segments into requests of about `maxSourceTokens` source tokens each. */
export function groupRequests(preps, lang, { maxSourceTokens = REQUEST_SOURCE_TOKENS, systemTokens = 0 } = {}) {
  const reqs = [];
  let cur = null;
  for (const p of preps) {
    const t = approxTokens(p.protected);
    if (!cur || (cur.segments.length > 0 && cur.sourceTokens + t > maxSourceTokens)) {
      cur = { lang, segments: [], sourceTokens: 0 };
      reqs.push(cur);
    }
    cur.segments.push(p);
    cur.sourceTokens += t;
  }
  for (const r of reqs) {
    r.userTokens = approxTokens(buildUserMessage(lang, r.segments));
    r.expectedOut = r.segments.reduce((s, p) => s + expectedOutputTokens(approxTokens(p.protected), lang) + SEGMENT_OVERHEAD_OUT, 20);
    r.maxTokens = maxTokensFor(r.expectedOut);
    r.systemTokens = systemTokens;
  }
  return reqs;
}

function atomicWrite(path, content) {
  mkdirSync(dirname(path), { recursive: true });
  const tmp = `${path}.tmp-${process.pid}`;
  writeFileSync(tmp, content, 'utf8');
  renameSync(tmp, path);
}

export function loadPending(tmDir) {
  const path = join(tmDir, PENDING_FILE);
  if (!existsSync(path)) return { version: 1, batches: [] };
  const data = JSON.parse(readFileSync(path, 'utf8'));
  if (data?.version !== 1 || !Array.isArray(data.batches)) throw new Error(`${path}: unexpected format`);
  return data;
}

export function savePending(tmDir, pending, { dryRun = false } = {}) {
  if (dryRun) return;
  const path = join(tmDir, PENDING_FILE);
  if (pending.batches.length === 0) {
    if (existsSync(path)) unlinkSync(path);
    return;
  }
  atomicWrite(path, JSON.stringify(pending, null, 2) + '\n');
}

/** A path for logs and reports: repo-relative inside the repository, else relative to I18N_DIR. */
export function displayPath(dirs, p) {
  const inRepo = relative(dirs.repo, p);
  const rel = !inRepo.startsWith('..') && !isAbsolute(inRepo) ? inRepo : relative(dirs.i18nDir, p);
  return rel.split(sep).join('/');
}

const fmtUsd = (n) => `$${n.toFixed(4)}`;

/**
 * Run the pipeline.
 * @param o.mode    'mock' | 'estimate' | 'sync' | 'batch'
 * @param o.dirs    from resolveDirs()
 * @param o.client  API client (createApiClient() or a fake); needed for sync and batch
 */
export async function run(o) {
  const log = o.log ?? ((...a) => console.log(...a));
  const sleep = o.sleep ?? ((ms) => new Promise((r) => setTimeout(r, ms)));
  const now = o.now ?? (() => Date.now());
  const mode = o.mode;
  const dryRun = !!o.dryRun;
  const langs = o.langs ?? LANGS;
  const model = mode === 'mock' ? MOCK_MODEL : (o.model ?? DEFAULT_MODEL);
  const priceModel = mode === 'mock' ? (o.model ?? DEFAULT_MODEL) : model;
  const price = priceFor(priceModel, o.priceOverride ?? {});
  const date = o.date ?? new Date(now()).toISOString().slice(0, 10);
  // Prompt caching of the fixed system prompt: 5m (default), 1h or off.
  const ttl = o.cacheTtl ?? '5m';
  if (!['5m', '1h', 'off'].includes(ttl)) throw new Error(`cache TTL must be 5m, 1h or off, got ${ttl}`);
  const dirs = o.dirs;
  const budget = new Budget(o.maxUsd ?? 1);
  const glossary = loadGlossary(dirs.glossary);
  const callouts = loadCallouts(dirs.callouts);
  const system = buildSystemPrompt(glossary);
  const systemTokens = approxTokens(system);
  const onlyRes = (o.only ?? []).map(globToRegExp);

  const report = {
    mode, model, langs, dryRun, date,
    capUsd: budget.cap, spentUsd: 0, stoppedByCap: false,
    systemTokens, cacheable: systemTokens >= minCacheable(priceModel),
    perLang: {}, fallbacks: [], warnings: 0, pendingBatches: [], errors: [],
  };

  // Every source is loaded (a resumed batch may carry segments of any file);
  // --only narrows what this run plans.
  const allDocs = discoverSources(dirs.sourceRoot).map((src) => loadSource(src, dirs.sourceRoot));
  const prepCache = new Map();
  const prep = (seg) => {
    let p = prepCache.get(seg.source);
    if (!p) {
      p = prepareSegment(seg, glossary);
      prepCache.set(seg.source, p);
    }
    return { ...p, kind: seg.kind };
  };
  for (const d of allDocs) d.preps = d.segments.map(prep);
  const byPrefix = new Map();
  for (const d of allDocs) for (const p of d.preps) if (!byPrefix.has(p.h.slice(0, HASH_PREFIX))) byPrefix.set(p.h.slice(0, HASH_PREFIX), p);

  const selected = allDocs.filter((d) => onlyRes.length === 0 || onlyRes.some((re) => re.test(d.src.rel)));
  if (selected.length === 0) throw new Error(`no source matches --only ${JSON.stringify(o.only)}`);

  const tms = new Map();
  const tmFor = (lang) => {
    if (!tms.has(lang)) tms.set(lang, o.full ? new TranslationMemory(join(dirs.tmDir, `__none__.${lang}.jsonl`)) : TranslationMemory.forLang(dirs.tmDir, lang));
    return tms.get(lang);
  };

  // Per segment and language: done | invalid | unanswered | fallback | deferred.
  const state = new Map();
  const key = (lang, h) => `${lang}:${h}`;

  // ---- plan
  const plans = {};
  for (const lang of langs) {
    const tm = tmFor(lang);
    const files = [];
    const missing = new Map();
    let identity = 0;
    let fromTm = 0;
    let total = 0;
    for (const d of selected) {
      if (!appliesTo(d.src, lang)) continue;
      const out = outputPath(d.src, lang, dirs);
      const skip = !o.force && !o.full && d.src.kind !== 'ui' && existingHash(out) === d.hash;
      files.push({ doc: d, out, skip });
      if (skip) continue;
      for (const p of d.preps) {
        total++;
        if (p.untranslatable) identity++;
        else if (tm.has(p.h)) fromTm++;
        else if (!missing.has(p.h)) missing.set(p.h, p);
      }
    }
    plans[lang] = { lang, files, missing, identity, fromTm, total };
    report.perLang[lang] = {
      files: files.length,
      skipped: files.filter((f) => f.skip).map((f) => f.doc.src.rel),
      written: [], unchanged: [], deferred: [],
      segments: { total, identity, fromTm, toTranslate: missing.size, translated: 0, fallback: 0, deferred: 0 },
      requests: 0, spentUsd: 0,
    };
  }

  const pending = loadPending(dirs.tmDir);
  const inPending = new Set();
  for (const b of pending.batches) for (const r of Object.values(b.requests)) for (const h of r.h) inPending.add(`${r.lang}:${h}`);

  const requestsFor = (lang, preps, maxSourceTokens) => groupRequests(preps, lang, { maxSourceTokens, systemTokens });
  const plannedRequests = [];
  for (const lang of langs) {
    // Segments an unfinished batch already carries are never paid for twice:
    // a --batch run resumes them, a --sync run leaves them to that batch.
    const preps = [...plans[lang].missing.values()].filter((p) => mode === 'mock' || !inPending.has(`${lang}:${p.h.slice(0, HASH_PREFIX)}`));
    const reqs = requestsFor(lang, preps);
    report.perLang[lang].requests = reqs.length;
    plannedRequests.push(...reqs);
  }

  const est = estimateCost(plannedRequests.map((r) => ({ ...r, segments: r.segments.length })), { model: priceModel, price, systemTokens, ttl });
  est.worst = {
    sync: plannedRequests.reduce((s, r) => s + projectedMaxCost(r, price, { ttl }), 0),
    batch: plannedRequests.reduce((s, r) => s + projectedMaxCost(r, price, { ttl, batch: true }), 0),
  };
  report.estimate = est;
  printPlan(log, report, est, { pending, mode, price, priceModel });
  if (mode === 'estimate' || dryRun) return finish(report, budget);

  // ---- translate
  const applyAnswer = (lang, segs, parsed) => {
    const tm = tmFor(lang);
    const accepted = [];
    segs.forEach((p, i) => {
      if (!p) return;
      const st = state.get(key(lang, p.h)) ?? { prep: p, lang, attempts: 0 };
      st.attempts++;
      state.set(key(lang, p.h), st);
      if (!parsed.ok) {
        st.status = 'invalid';
        st.errors = [parsed.error];
        return;
      }
      const out = parsed.byIndex.get(i + 1);
      if (out === undefined) {
        st.status = 'invalid';
        st.errors = ['missing from the answer'];
        return;
      }
      const v = validateTranslation(p, out, { glossary, lang });
      report.warnings += v.warnings.length;
      if (v.ok) {
        st.status = 'done';
        accepted.push({ h: p.h, t: v.text });
      } else {
        st.status = 'invalid';
        st.errors = v.errors;
      }
    });
    tm.addMany(accepted, { model, at: date });
    if (report.perLang[lang]) report.perLang[lang].segments.translated += accepted.length;
  };
  const markUnanswered = (lang, segs, why) => {
    for (const p of segs) {
      if (!p) continue;
      const st = state.get(key(lang, p.h)) ?? { prep: p, lang, attempts: 0 };
      // No answer this time: the segment is deferred to a later run, never
      // given up on without a second answer to judge.
      st.status = 'unanswered';
      st.errors = [why];
      state.set(key(lang, p.h), st);
    }
  };
  const addSpend = (lang, usd) => {
    report.spentUsd += usd;
    if (report.perLang[lang]) report.perLang[lang].spentUsd += usd;
  };

  let client = null;
  const getClient = async () => {
    if (!client) client = o.client ?? (await (await import('./client.mjs')).createApiClient());
    return client;
  };

  /** Messages API, `concurrency` requests at a time, each reserved against the cap first. */
  const runSync = async (reqs) => {
    const c = await getClient();
    let next = 0;
    let fatal = null;
    const worker = async () => {
      while (next < reqs.length && !fatal) {
        const r = reqs[next++];
        const params = buildParams({ model, system, lang: r.lang, segments: r.segments, maxTokens: r.maxTokens, ttl });
        const worst = projectedMaxCost(r, price, { ttl });
        const id = budget.reserve(worst);
        if (id === null) {
          report.stoppedByCap = true;
          markUnanswered(r.lang, r.segments, 'not sent: the spend cap would be exceeded');
          continue;
        }
        let msg;
        try {
          msg = await c.create(params);
        } catch (err) {
          budget.release(id);
          if (c.isFatal(err)) {
            fatal = err;
            break;
          }
          report.errors.push(`${r.lang}: ${err.message}`);
          markUnanswered(r.lang, r.segments, `API error: ${err.message}`);
          continue;
        }
        const usd = usageCost(msg.usage, price);
        budget.settle(id, usd);
        addSpend(r.lang, usd);
        applyAnswer(r.lang, r.segments, parseResponse(msg, r.segments.length));
      }
    };
    await Promise.all(Array.from({ length: Math.max(1, o.concurrency ?? 4) }, worker));
    if (fatal) throw fatal;
  };

  /** Fetch and apply the results of one ended batch. */
  const applyBatch = async (c, b) => {
    for await (const r of c.batchResults(b.id)) {
      const entry = b.requests[r.custom_id];
      if (!entry) continue;
      const segs = entry.h.map((p) => byPrefix.get(p) ?? null);
      if (r.result?.type === 'succeeded') {
        const usd = usageCost(r.result.message.usage, price, { batch: true });
        if (b.reservations?.[r.custom_id]) budget.settle(b.reservations[r.custom_id], usd);
        else budget.record(usd);
        addSpend(entry.lang, usd);
        applyAnswer(entry.lang, segs, parseResponse(r.result.message, segs.length));
      } else {
        if (b.reservations?.[r.custom_id]) budget.release(b.reservations[r.custom_id]);
        markUnanswered(entry.lang, segs, `batch result ${r.result?.type ?? 'unknown'}`);
      }
    }
  };

  /** Poll the pending batches; apply every one that has ended. */
  const drainPending = async (c) => {
    const started = now();
    for (;;) {
      const still = [];
      for (const b of pending.batches) {
        const info = await c.batchRetrieve(b.id);
        if (info.processing_status === 'ended') {
          log(`batch ${b.id}: ended; applying results`);
          await applyBatch(c, b);
        } else {
          still.push(b);
        }
      }
      pending.batches = still;
      savePending(dirs.tmDir, stripRuntime(pending));
      if (still.length === 0 || o.wait === false) return;
      if (now() - started >= (o.maxWaitMs ?? 300 * 60_000)) {
        log(`batches still processing after the maximum wait: ${still.map((b) => b.id).join(', ')}`);
        return;
      }
      log(`waiting for ${still.length} batch(es)...`);
      await sleep(o.pollMs ?? 60_000);
    }
  };

  if (mode === 'mock') {
    for (const lang of langs) {
      const segs = [...plans[lang].missing.values()];
      const byIndex = new Map(segs.map((p, i) => [i + 1, mockTranslate(p.protected, lang, glossary)]));
      applyAnswer(lang, segs, { ok: true, byIndex });
    }
  } else if (mode === 'sync') {
    await runSync(plannedRequests);
  } else if (mode === 'batch') {
    const c = await getClient();
    if (pending.batches.length) {
      log(`resuming ${pending.batches.length} pending batch(es)`);
      await drainPending(c);
    }
    // Recompute what is still missing (resumed results may have filled some),
    // leaving out what an unfinished batch already carries.
    const stillPending = new Set();
    for (const b of pending.batches) for (const r of Object.values(b.requests)) for (const h of r.h) stillPending.add(`${r.lang}:${h}`);
    const fresh = [];
    for (const lang of langs) {
      const tm = tmFor(lang);
      const preps = [...plans[lang].missing.values()].filter((p) => !tm.has(p.h) && !stillPending.has(`${lang}:${p.h.slice(0, HASH_PREFIX)}`) && state.get(key(lang, p.h))?.status !== 'invalid');
      fresh.push(...requestsFor(lang, preps));
    }
    if (fresh.length) {
      const tag = now().toString(36);
      const batch = { id: null, createdAt: new Date(now()).toISOString(), model, requests: {}, reservations: {} };
      const params = [];
      fresh.forEach((r, i) => {
        const worst = projectedMaxCost(r, price, { batch: true, ttl });
        const id = budget.reserve(worst);
        if (id === null) {
          report.stoppedByCap = true;
          markUnanswered(r.lang, r.segments, 'not sent: the spend cap would be exceeded');
          return;
        }
        const cid = `${r.lang}-${tag}-${i + 1}`;
        batch.requests[cid] = { lang: r.lang, h: r.segments.map((p) => p.h.slice(0, HASH_PREFIX)) };
        batch.reservations[cid] = id;
        params.push({ custom_id: cid, params: buildParams({ model, system, lang: r.lang, segments: r.segments, maxTokens: r.maxTokens, ttl }) });
      });
      if (params.length) {
        const created = await c.batchCreate(params);
        batch.id = created.id;
        pending.batches.push(batch);
        savePending(dirs.tmDir, stripRuntime(pending));
        log(`batch ${batch.id} created with ${params.length} request(s); id saved in ${displayPath(dirs, join(dirs.tmDir, PENDING_FILE))}`);
        await drainPending(c);
      }
    }
  }

  // ---- retry once (Messages API), smaller requests
  if (mode === 'sync' || mode === 'batch') {
    for (const lang of langs) {
      const retry = [...state.values()].filter((s) => s.lang === lang && (s.status === 'invalid' || s.status === 'unanswered') && s.attempts <= 1 && !/spend cap/.test(s.errors?.[0] ?? ''));
      if (!retry.length) continue;
      log(`${lang}: retrying ${retry.length} segment(s) once`);
      await runSync(requestsFor(lang, retry.map((s) => s.prep), Math.ceil(REQUEST_SOURCE_TOKENS / 2)));
    }
  }
  for (const s of state.values()) {
    if (s.status === 'invalid') s.status = 'fallback';
    else if (s.status === 'unanswered') s.status = 'deferred';
  }
  for (const s of state.values()) {
    if (s.status === 'fallback') {
      report.fallbacks.push({ lang: s.lang, h: s.prep.h, source: s.prep.source.slice(0, 160), errors: s.errors });
    }
  }

  // ---- write the files
  const stillPendingAfter = new Set();
  for (const b of pending.batches) for (const r of Object.values(b.requests)) for (const h of r.h) stillPendingAfter.add(`${r.lang}:${h}`);
  for (const lang of langs) {
    const tm = tmFor(lang);
    const pl = report.perLang[lang];
    const labelMap = (label) => localizeLabel(callouts, label, lang);
    for (const f of plans[lang].files) {
      if (f.skip) continue;
      let deferred = false;
      const tr = (seg) => {
        const p = prepCache.get(seg.source);
        if (!p || p.untranslatable) return undefined;
        const e = tm.get(p.h);
        if (e) return e.t;
        const st = state.get(key(lang, p.h));
        if (st?.status === 'fallback') return undefined;
        deferred = true;
        return undefined;
      };
      let content;
      try {
        content = renderTranslation(f.doc, lang, tr, { model, date, labelMap });
      } catch (err) {
        // A translation that would change the document's structure is a bug to
        // look at, not a file to publish: keep the file out of this run.
        report.errors.push(err.message);
        pl.deferred.push(f.doc.src.rel);
        continue;
      }
      const rel = displayPath(dirs, f.out);
      if (deferred) {
        pl.deferred.push(f.doc.src.rel);
        continue;
      }
      if (existsSync(f.out) && readFileSync(f.out, 'utf8') === content) {
        pl.unchanged.push(rel);
        continue;
      }
      atomicWrite(f.out, content);
      pl.written.push(rel);
    }
    pl.segments.fallback = report.fallbacks.filter((x) => x.lang === lang).length;
    pl.segments.deferred = [...state.values()].filter((s) => s.lang === lang && s.status === 'deferred').length
      + [...stillPendingAfter].filter((k) => k.startsWith(`${lang}:`)).length;
  }
  report.pendingBatches = pending.batches.map((b) => b.id);
  return finish(report, budget);
}

function stripRuntime(pending) {
  return { version: 1, batches: pending.batches.map(({ reservations, ...b }) => b) };
}

function finish(report, budget) {
  report.spentUsd = budget.spent;
  report.refusedByCap = budget.refused;
  return report;
}

function printPlan(log, report, est, { pending, mode, price, priceModel }) {
  log(`i18n ${mode}${report.dryRun ? ' (dry run)' : ''}: model ${report.model}, languages ${report.langs.join(', ')}, cap ${fmtUsd(report.capUsd)}`);
  log(`system prompt: ~${report.systemTokens} tokens (${report.cacheable ? 'cacheable' : `below the ${minCacheable(priceModel)}-token cache minimum`})`);
  for (const [lang, pl] of Object.entries(report.perLang)) {
    const s = pl.segments;
    log(`  ${lang}: ${pl.files} file(s), ${pl.skipped.length} unchanged by sourceHash; segments ${s.total} (${s.identity} untranslatable, ${s.fromTm} from memory, ${s.toTranslate} to translate) in ${pl.requests} request(s)`);
  }
  if (pending.batches.length) {
    log(`  pending batches: ${pending.batches.map((b) => b.id).join(', ')}${mode === 'batch' ? ' (resumed first)' : '; their segments are left to them: run --batch to resume'}`);
  }
  const rows = [...est.rows, est.total];
  log('');
  log(`estimate at USD ${price.input} / ${price.output} per million input / output tokens (${priceModel}):`);
  log('  lang   reqs  segments  in_tokens  out_tokens    sync  sync+cache   batch  batch+cache');
  for (const r of rows) {
    const inTok = r.userTokens + r.systemTokens;
    log(`  ${r.lang.padEnd(5)} ${String(r.requests).padStart(5)} ${String(r.segments).padStart(9)} ${String(inTok).padStart(10)} ${String(r.outputTokens).padStart(11)} ${fmtUsd(r.usd.sync).padStart(8)} ${fmtUsd(r.usd.syncCached).padStart(11)} ${fmtUsd(r.usd.batch).padStart(7)} ${fmtUsd(r.usd.batchCached).padStart(12)}`);
  }
  log(`  source tokens ~${est.total.sourceTokens}; "+cache" assumes every request after the first reads the cached system prompt (best case).`);
  log(`  worst case the cap is checked against (every max_tokens used, every request a cache write, input +15%): sync ${fmtUsd(est.worst.sync)}, batch ${fmtUsd(est.worst.batch)}`);
  log('');
}
