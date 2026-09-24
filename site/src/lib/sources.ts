// sources.ts: the numbered-reference model shared by the data-backed reference
// pages (the harms atlas and the incident cases). A source renders in the house
// format that STYLEGUIDE.md §6 fixes for every chapter's "## Sources" list:
//
//   [n] Title (short gloss). Publisher. Date. URL (verified: primary|secondary|reported)
//
// Prose fields in those datasets carry `[n]` markers; `citeSegments` splits a
// string on them so a page can render each marker as a link to its source row.

/** STYLEGUIDE.md §6 verification tags. */
export type Verification = 'primary' | 'secondary' | 'reported';

export interface Source {
  /** Title of the document, decision or record. */
  title: string;
  /** Short gloss in parentheses after the title (what the source settles). */
  gloss?: string;
  /** Issuing body, court, regulator, outlet or authors. */
  publisher: string;
  /** YYYY-MM-DD, YYYY-MM or YYYY. */
  date: string;
  url: string;
  verified: Verification;
}

/** The house-format line for a source, without its `[n]` prefix. */
export function sourceText(source: Source): string {
  const gloss = source.gloss ? ` (${source.gloss})` : '';
  return `${source.title}${gloss}. ${source.publisher}. ${source.date}.`;
}

/** A piece of prose: plain text, or a citation marker pointing at source `n`. */
export type CiteSegment = { text: string } | { cite: number };

/**
 * Split `text` on `[n]` and `[n][m]` markers. Plain runs come back as
 * `{ text }`, each marker as `{ cite: n }`, in order, so a template can render
 * the markers as links without `set:html`.
 */
export function citeSegments(text: string): CiteSegment[] {
  const out: CiteSegment[] = [];
  const re = /\[(\d+)\]/g;
  let last = 0;
  for (const match of text.matchAll(re)) {
    const at = match.index ?? 0;
    if (at > last) out.push({ text: text.slice(last, at) });
    out.push({ cite: Number(match[1]) });
    last = at + match[0].length;
  }
  if (last < text.length) out.push({ text: text.slice(last) });
  return out;
}

/** Every `[n]` marker used across `texts`, deduplicated. */
export function citedNumbers(texts: readonly string[]): Set<number> {
  const found = new Set<number>();
  for (const text of texts) {
    for (const match of text.matchAll(/\[(\d+)\]/g)) found.add(Number(match[1]));
  }
  return found;
}
