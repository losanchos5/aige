// A translatable segment: its hash (the translation-memory key), its protected
// form (what the model sees), and the checks every translation must pass.

import { createHash } from 'node:crypto';

import { dntRegex, lookupTerm, termsRegex } from './glossary.mjs';
import { countCitations, placeholdersIn, protect, restore } from './protect.mjs';

export const EM_DASH = '\u2014';

export const sha256 = (s) => createHash('sha256').update(s, 'utf8').digest('hex');

/** sha256 of a file's content after normalising line endings to LF. */
export function sourceHash(text) {
  return sha256(text.replace(/\r\n?/g, '\n'));
}

/**
 * Prepare a segment for translation.
 * @param seg      { kind, source } from the document model
 * @param glossary the loaded glossary lock
 */
export function prepareSegment(seg, glossary) {
  const p = protect(seg.source);
  return {
    ...seg,
    h: sha256(seg.source),
    protected: p.text,
    map: p.map,
    linkTargets: p.linkTargets,
    untranslatable: isUntranslatable(p.text, glossary),
  };
}

const ACRONYM_RE = /(?<![\p{L}\p{N}])\p{Lu}[\p{Lu}\p{N}&/.+-]*\p{Lu}[\p{Lu}\p{N}]*s?(?![\p{L}\p{N}])/gu;
const WITH_DIGIT_RE = /[\p{L}\p{N}._/-]*\p{N}[\p{L}\p{N}._/-]*/gu;

/** What is left of a protected string once placeholders, locked names, acronyms and numbers go. */
function residue(protectedText, glossary) {
  let s = protectedText.replace(/\{\d+\}/g, ' ');
  const dnt = dntRegex(glossary);
  if (dnt) s = s.replace(dnt, ' ');
  return s.replace(ACRONYM_RE, ' ').replace(WITH_DIGIT_RE, ' ');
}

/** Nothing a translator could change: no word of two or more letters remains. */
export function isUntranslatable(protectedText, glossary) {
  return !/\p{L}{2,}/u.test(residue(protectedText, glossary));
}

/** A short run of capitalised words (a name) may legitimately come back unchanged. */
function isShortName(protectedText, glossary) {
  const words = residue(protectedText, glossary).match(/\p{L}[\p{L}'-]*/gu) || [];
  return words.length > 0 && words.length <= 3 && words.every((w) => /^\p{Lu}/u.test(w));
}

/**
 * Deterministic clean-up before validation: one line, no em dash (a spaced or
 * closed-up em dash becomes a comma), no doubled punctuation left behind.
 */
export function postProcess(text) {
  return String(text ?? '')
    .replace(/\s*\n\s*/g, ' ')
    .replace(/\s*[\u2014\u2015]\s*/g, ', ')
    .replace(/,\s*([,.;:!?)])/g, '$1')
    .replace(/([(])\s*,\s*/g, '$1')
    .replace(/^,\s*/, '')
    .replace(/[ \t]{2,}/g, ' ')
    .trim();
}

const BOLD_RE = /\*\*/g;

/**
 * Validate one translated segment (in its protected form, as the model returned it).
 * @returns {{ ok: boolean, text?: string, errors: string[], warnings: string[] }}
 *   `text` is the restored Markdown ready to store and render.
 */
export function validateTranslation(prep, output, { glossary, lang } = {}) {
  const errors = [];
  const warnings = [];
  const out = postProcess(output);
  if (!out) return { ok: false, errors: ['empty translation'], warnings };

  const seen = placeholdersIn(out);
  const expected = prep.map.length;
  const counts = new Map();
  for (const k of seen) counts.set(k, (counts.get(k) ?? 0) + 1);
  for (let k = 1; k <= expected; k++) {
    const c = counts.get(k) ?? 0;
    if (c === 0) errors.push(`placeholder {${k}} missing`);
    else if (c > 1) errors.push(`placeholder {${k}} repeated`);
  }
  for (const k of counts.keys()) if (k < 1 || k > expected) errors.push(`unknown placeholder {${k}}`);
  for (const k of prep.linkTargets) {
    if (!out.includes(`](${`{${k}}`})`)) errors.push(`link target {${k}} is no longer a link`);
  }
  const boldIn = (prep.protected.match(BOLD_RE) || []).length;
  const boldOut = (out.match(BOLD_RE) || []).length;
  if (boldIn !== boldOut) errors.push(`bold markers: ${boldIn} in the source, ${boldOut} in the translation`);

  const text = restore(out, prep.map);
  const citeIn = countCitations(prep.source);
  const citeOut = countCitations(text);
  if (citeIn !== citeOut) errors.push(`[n] markers: ${citeIn} in the source, ${citeOut} in the translation`);
  if (text.includes(EM_DASH)) errors.push('em dash in the translation');
  if (text === prep.source && !prep.untranslatable && !isShortName(prep.protected, glossary ?? { doNotTranslate: [] })) {
    errors.push('identical to the source');
  }

  if (glossary && lang) {
    const dnt = dntRegex(glossary);
    if (dnt) {
      for (const m of new Set(prep.protected.match(dnt) || [])) {
        if (!out.includes(m)) warnings.push(`kept-in-English term "${m}" not found`);
      }
    }
    const tr = termsRegex(glossary);
    if (tr) {
      for (const m of new Set(prep.protected.match(tr) || [])) {
        // Only specific terms are checked; single common words ("layer",
        // "provider") are also used in their everyday sense.
        if (!/\s/.test(m) && !/^\p{Lu}{2,}$/u.test(m)) continue;
        const entry = lookupTerm(glossary, m);
        const want = entry?.[lang];
        if (want && !out.toLowerCase().includes(want.toLowerCase().slice(0, Math.max(4, want.length - 3)))) {
          warnings.push(`locked term "${m}" not rendered as "${want}"`);
        }
      }
    }
  }
  return { ok: errors.length === 0, text, errors, warnings };
}
