// glossary.ts: the canonical glossary, parsed at build time from
// bok/09-glossary.md. Terms are `**Term.** definition … (ch. NN)` paragraphs;
// this reads them once and returns them in the file's (alphabetical) order.

import { readSource, parseDefinitions } from './md-parse';

export interface GlossaryEntry {
  /** The term, without its trailing period (e.g. "Agent registry"). */
  term: string;
  /** One-to-three-sentence definition, faithful to the chapter. */
  definition: string;
  /** Zero-padded chapter numbers the term is cross-referenced to. */
  chapterRefs: string[];
  /** Uppercase first letter, for A–Z grouping on the glossary page. */
  letter: string;
}

const SOURCE = 'bok/09-glossary.md';

/** The glossary, in the source file's alphabetical order. */
export function getGlossary(): GlossaryEntry[] {
  return parseDefinitions(readSource(SOURCE)).map((entry) => ({
    term: entry.term,
    definition: entry.definition,
    chapterRefs: entry.chapterRefs,
    letter: entry.letter,
  }));
}

/** The distinct first letters present, in ascending order. */
export function getGlossaryLetters(): string[] {
  return [...new Set(getGlossary().map((entry) => entry.letter))].sort();
}

/**
 * The DOM id for a glossary term's `<dt>`, so an in-page `#anchor` can point at
 * it. The rule mirrors the on-page ids: `t-` plus the term lowercased with each
 * run of non-alphanumerics collapsed to a single hyphen and the ends trimmed.
 */
export function termId(term: string): string {
  return `t-${term.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '')}`;
}
