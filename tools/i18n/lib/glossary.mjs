// The glossary lock (i18n/glossary-lock.json) and the callout labels the site
// maps (site/src/i18n/callouts.json).

import { existsSync, readFileSync } from 'node:fs';

import { LANGS } from './config.mjs';

/**
 * Load and check the glossary lock: { doNotTranslate: string[], terms: { en: { es, fr, de, pt } } }.
 */
export function loadGlossary(path) {
  const raw = JSON.parse(readFileSync(path, 'utf8'));
  const keys = Object.keys(raw).sort().join(',');
  if (keys !== 'doNotTranslate,terms') throw new Error(`${path}: expected exactly the keys doNotTranslate and terms, got ${keys}`);
  if (!Array.isArray(raw.doNotTranslate) || raw.doNotTranslate.some((t) => typeof t !== 'string' || !t.trim())) {
    throw new Error(`${path}: doNotTranslate must be a list of non-empty strings`);
  }
  for (const [en, tr] of Object.entries(raw.terms)) {
    for (const l of LANGS) {
      if (typeof tr[l] !== 'string' || !tr[l].trim()) throw new Error(`${path}: term ${JSON.stringify(en)} has no ${l} equivalent`);
    }
    const extra = Object.keys(tr).filter((l) => !LANGS.includes(l));
    if (extra.length) throw new Error(`${path}: term ${JSON.stringify(en)} has unknown languages ${extra.join(', ')}`);
  }
  if (JSON.stringify(raw).includes('\u2014')) throw new Error(`${path}: em dash in the glossary`);
  return {
    doNotTranslate: [...raw.doNotTranslate].sort((a, b) => b.length - a.length),
    terms: raw.terms,
  };
}

const escapeRe = (s) => s.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
const WORD = '\\p{L}\\p{N}';

const memo = new WeakMap();
function cached(glossary, key, build) {
  let m = memo.get(glossary);
  if (!m) memo.set(glossary, (m = {}));
  if (!(key in m)) m[key] = build();
  return m[key];
}

/** Find doNotTranslate occurrences (case-sensitive, whole word). */
export function dntRegex(glossary) {
  return cached(glossary, 'dnt', () => {
    const list = [...(glossary.doNotTranslate ?? [])].sort((a, b) => b.length - a.length);
    if (!list.length) return null;
    return new RegExp(`(?<![${WORD}])(?:${list.map(escapeRe).join('|')})(?![${WORD}])`, 'gu');
  });
}

/** Find locked terms (case-insensitive, whole word, longest first). */
export function termsRegex(glossary) {
  return cached(glossary, 'terms', () => {
    const keys = Object.keys(glossary.terms ?? {}).sort((a, b) => b.length - a.length);
    if (!keys.length) return null;
    return new RegExp(`(?<![${WORD}])(?:${keys.map(escapeRe).join('|')})(?![${WORD}])`, 'giu');
  });
}

/** The glossary entry for a matched term, whatever its case in the text. */
export function lookupTerm(glossary, matched) {
  if (glossary.terms[matched]) return glossary.terms[matched];
  const lower = matched.toLowerCase();
  const key = Object.keys(glossary.terms).find((k) => k.toLowerCase() === lower);
  return key ? glossary.terms[key] : undefined;
}

/**
 * Callout labels the site maps: { "<English label>": { "es": "...", ... } }.
 * Missing file: labels stay in English. Returns (label, lang) => localized label or undefined.
 */
export function loadCallouts(path) {
  if (!path || !existsSync(path)) return { map: {}, present: false };
  const raw = JSON.parse(readFileSync(path, 'utf8'));
  if (!raw || typeof raw !== 'object' || Array.isArray(raw)) throw new Error(`${path}: expected an object`);
  const map = {};
  for (const [en, tr] of Object.entries(raw)) {
    if (!tr || typeof tr !== 'object') throw new Error(`${path}: label ${JSON.stringify(en)} must map to { lang: label }`);
    map[en.trim()] = tr;
  }
  return { map, present: true };
}

/**
 * Localize a bold label ("**In practice**", "**Maps to:**", "**Postings (footnote).**")
 * when the site maps it; the trailing "." or ":" inside the bold is kept.
 */
export function localizeLabel(callouts, label, lang) {
  const m = /^\*\*(.*?)([.:]?)\*\*$/.exec(label);
  if (!m) return undefined;
  const [, text, punct] = m;
  const tr = callouts.map[text + punct] ?? callouts.map[text];
  const v = tr && typeof tr[lang] === 'string' && tr[lang].trim() ? tr[lang].trim() : undefined;
  if (!v) return undefined;
  if (v.includes('\u2014')) throw new Error(`callouts.json: em dash in the ${lang} label for ${JSON.stringify(text)}`);
  const bare = v.replace(/[.:]$/, '');
  return `**${bare}${punct}**`;
}
