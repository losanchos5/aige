// tests/helpers/in-short.ts: the word band every "In short" passage keeps
// (chapters, patterns, cases), shared by the three specs that check it.
//
// Answer engines quote passages of about 134 to 167 words (GEO audit
// 2026-09-26, N3/G4: 18 passages ran to 168-174 words). The audit counts words
// the way a text extractor does, so "Art. 10(2)(b)" is three words and
// "2005/29/EC" two; a passage is held to the band under both that count and a
// plain split on white space.

export const IN_SHORT_MIN = 134;
export const IN_SHORT_MAX = 167;

/** The passage as prose: no [n] citation markers, no Markdown emphasis or link syntax. */
export function inShortProse(text: string): string {
  return text
    .replace(/\[\d+(?:\s*[,–-]\s*\d+)*\]/g, ' ')
    .replace(/\*\*|__|`/g, '')
    .replace(/\[([^\]]+)\]\([^)]+\)/g, '$1');
}

/** Words separated by white space. */
export function spaceWords(text: string): number {
  return text.split(/\s+/).filter(Boolean).length;
}

/** Words as the audit's extractor counts them: runs of letters and digits,
 *  joined across a hyphen, an apostrophe or a dot ("re-test", "6.1"). */
export function extractorWords(text: string): number {
  return (text.match(/[A-Za-z0-9]+(?:[-'’.][A-Za-z0-9]+)*/g) ?? []).length;
}
