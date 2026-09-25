// The fixed system prompt (identical for every request and every language, so
// prompt caching can serve it), the per-request user message and the JSON
// schema of the answer.

import { LANG_NAMES, LANGS } from './config.mjs';

/** Structured output: one entry per input segment, same ids. */
export const OUTPUT_SCHEMA = {
  type: 'object',
  properties: {
    segments: {
      type: 'array',
      items: {
        type: 'object',
        properties: {
          id: { type: 'string' },
          t: { type: 'string' },
        },
        required: ['id', 't'],
        additionalProperties: false,
      },
    },
  },
  required: ['segments'],
  additionalProperties: false,
};

const KIND_HELP = [
  'h1..h6: a heading; keep it short and in the heading style of the target language (sentence case).',
  'p: a paragraph or a list item.',
  'td: a table cell; keep it as terse as the source.',
  'fm:title, fm:summary: page metadata (a title, a one-sentence summary).',
  'ui: a user-interface string (button, label, navigation); keep it as short as the source.',
].join('\n');

/** Build the fixed system prompt from the glossary lock. */
export function buildSystemPrompt(glossary) {
  const termLines = Object.entries(glossary.terms)
    .map(([en, tr]) => `${en} | ${LANGS.map((l) => tr[l]).join(' | ')}`)
    .join('\n');
  const dnt = [...glossary.doNotTranslate].sort((a, b) => a.localeCompare(b, 'en')).join('; ');
  return `You translate "AI Governance Engineering: The Thesis & Body of Knowledge", an open technical book, from English into Spanish, French, German or Portuguese. Each request names one target language and gives a JSON list of segments (Markdown inline text). Answer only with the JSON the schema asks for: one entry per segment, with the same id.

# Audience and register
The readers are practitioners of AI governance and engineering: AI governance engineers, ML and platform engineers, security and privacy engineers, DPOs, risk, compliance and legal professionals. Write in a professional technical register, as a senior practitioner of the target language would. Keep the author's voice: direct, short sentences, precise terms, no hype. Translate meaning, not words, but add nothing and drop nothing: every claim, number, qualifier, hedge ("reported", "illustrative") and example stays.

# Target variants
- es: ${LANG_NAMES.es}. Address the reader with "tú" where the English addresses "you".
- fr: ${LANG_NAMES.fr}. Address the reader with "vous".
- de: ${LANG_NAMES.de}. Address the reader with "Sie".
- pt: ${LANG_NAMES.pt}. Use European Portuguese spelling and vocabulary (for example "registo", "equipa", "utilizador", "ficheiro", "governação"), never Brazilian forms; prefer impersonal constructions when addressing the reader.

# Markdown and placeholders
- The text is Markdown. Keep the syntax exactly: **bold**, _italics_, [link text](target). Translate link text; never change a link target.
- Tokens written {1}, {2}, ... are placeholders for code, URLs, link targets, citation markers such as [3], and other protected text. Copy every placeholder exactly once, unchanged, where it belongs in the translated sentence. Never translate, renumber, merge, split, drop or add a placeholder. A placeholder inside "(...)" right after "]" is a link target: keep "](" and ")" around it.
- Keep citation placeholders attached to the claim they support.
- Keep the same number of ** bold markers, around the equivalent words.
- One segment is one line: never add line breaks.
- If a segment has nothing to translate (only names, numbers, codes or placeholders), return it unchanged.

# Typography
- Never use the em dash (U+2014) or the horizontal bar (U+2015). Where English uses an em dash, use a comma, a colon, a semicolon, parentheses or a full stop. The en dash (U+2013) is only for ranges (2024–2026).
- Use the quotation marks of the target language (es: «», fr: « », de: „“, pt: «»), but leave quoted titles of English publications in English.
- Keep ISO dates (2026-08-02), versions, article numbers, percentages and figures unchanged in value. Dates written in words may follow the target language's word order.

# Names and titles
- Keep in English: the names of organisations, products, tools, standards, frameworks and publications (report and paper titles stay in their original language), people's names, and identifiers. The book's own pattern names and the five layer names of its stack are proper names and stay in English (listed below), even when a lower-case phrase with the same words is translated as a concept.
- EU legal terminology follows the official language version of the act on EUR-Lex: Regulation (EU) 2024/1689 (the AI Act) and Regulation (EU) 2016/679 (the GDPR). Use the equivalents below; outside the EU legal sense, translate the same English word normally (for example a human "operator" of a machine, a "processor" in a computer).

# Keep exactly as written (never translate)
${dnt}

# Locked equivalents
Always render these English terms with the given equivalent, adapting only grammar (plural, case, article, contraction). Columns: English | es | fr | de | pt
${termLines}

# Segment kinds
${KIND_HELP}

# Output
Return {"segments":[{"id":"<id>","t":"<translation>"}, ...]} with exactly the ids you received, in the same order.`;
}

/** Models that still take sampling parameters (Opus 4.7+, Sonnet 5 and later reject them). */
export function acceptsSampling(model) {
  return /^claude-(haiku-4-5|sonnet-4-5|sonnet-4-6|opus-4-5|opus-4-6)(-\d{8})?$/.test(model);
}

/** The user message of one request. */
export function buildUserMessage(lang, segments) {
  const items = segments.map((s, i) => ({ id: String(i + 1), k: s.kind, text: s.protected }));
  return `Target language: ${lang} (${LANG_NAMES[lang]}).\nTranslate each segment's "text" and return it as "t" under the same "id".\n${JSON.stringify(items)}`;
}

/** Request parameters for the Messages API (also the params of a batch request). */
export function buildParams({ model, system, lang, segments, maxTokens, ttl = '5m' }) {
  return {
    model,
    max_tokens: maxTokens,
    // A low temperature keeps terminology steady; newer models reject sampling parameters.
    ...(acceptsSampling(model) ? { temperature: 0.2 } : {}),
    system: [
      ttl === 'off'
        ? { type: 'text', text: system }
        : { type: 'text', text: system, cache_control: ttl === '1h' ? { type: 'ephemeral', ttl: '1h' } : { type: 'ephemeral' } },
    ],
    messages: [{ role: 'user', content: buildUserMessage(lang, segments) }],
    output_config: { format: { type: 'json_schema', schema: OUTPUT_SCHEMA } },
  };
}

/**
 * Read the translations out of a response message.
 * @returns {{ ok: boolean, byIndex?: Map<number,string>, error?: string }}
 */
export function parseResponse(message, count) {
  if (!message) return { ok: false, error: 'no message' };
  if (message.stop_reason === 'refusal') return { ok: false, error: 'refusal' };
  if (message.stop_reason === 'max_tokens') return { ok: false, error: 'truncated (max_tokens)' };
  const text = (message.content ?? []).filter((b) => b.type === 'text').map((b) => b.text).join('');
  let data;
  try {
    data = JSON.parse(text);
  } catch {
    const m = /\{[\s\S]*\}/.exec(text);
    try {
      data = m ? JSON.parse(m[0]) : null;
    } catch {
      data = null;
    }
  }
  if (!data || !Array.isArray(data.segments)) return { ok: false, error: 'answer is not the expected JSON' };
  const byIndex = new Map();
  for (const item of data.segments) {
    const i = Number(item?.id);
    if (Number.isInteger(i) && i >= 1 && i <= count && typeof item.t === 'string' && !byIndex.has(i)) byIndex.set(i, item.t);
  }
  return { ok: true, byIndex };
}
