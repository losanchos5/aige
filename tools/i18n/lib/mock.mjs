// Mock mode: a deterministic pseudo-translation with no network. It applies the
// glossary lock (locked terms become their target equivalent, kept-in-English
// names stay), leaves placeholders alone and marks every other lower-case vowel
// with a language-specific accent, so the output is obviously "translated",
// structurally identical to the source and passes the same validation as a
// real translation. The site uses it to build fixtures.

import { dntRegex, lookupTerm, termsRegex } from './glossary.mjs';

export const MOCK_MODEL = 'mock';

const VOWELS = {
  es: { a: 'á', e: 'é', i: 'í', o: 'ó', u: 'ú' },
  fr: { a: 'à', e: 'è', i: 'î', o: 'ô', u: 'û' },
  de: { a: 'ä', e: 'ë', i: 'ï', o: 'ö', u: 'ü' },
  pt: { a: 'ã', e: 'ê', i: 'í', o: 'õ', u: 'ú' },
};

function accent(text, lang) {
  const map = VOWELS[lang];
  return text.replace(/[aeiou]/g, (v) => map[v]);
}

/** Pseudo-translate a protected segment. */
export function mockTranslate(protectedText, lang, glossary) {
  // Spans that must not be accented: placeholders, kept names, locked terms.
  const spans = [];
  const mark = (re, fn) => {
    if (!re) return;
    for (const m of protectedText.matchAll(re)) {
      const start = m.index;
      const end = start + m[0].length;
      if (spans.some((s) => start < s.end && end > s.start)) continue;
      spans.push({ start, end, out: fn(m[0]) });
    }
  };
  mark(/\{\d+\}/g, (s) => s);
  mark(dntRegex(glossary), (s) => s);
  mark(termsRegex(glossary), (s) => {
    const target = lookupTerm(glossary, s)?.[lang];
    if (!target) return s;
    // Capitalise only where the text did and the glossary key does not (a sentence start).
    const key = Object.keys(glossary.terms).find((k) => k.toLowerCase() === s.toLowerCase()) ?? s;
    const capitalised = /^\p{Lu}/u.test(s) && /^\p{Ll}/u.test(key) && /^\p{Ll}/u.test(target);
    return capitalised ? target[0].toUpperCase() + target.slice(1) : target;
  });
  spans.sort((a, b) => a.start - b.start);
  let out = '';
  let pos = 0;
  for (const s of spans) {
    out += accent(protectedText.slice(pos, s.start), lang) + s.out;
    pos = s.end;
  }
  out += accent(protectedText.slice(pos), lang);
  return out === protectedText ? `${out} (${lang})` : out;
}
