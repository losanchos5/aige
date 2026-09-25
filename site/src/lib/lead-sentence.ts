// lead-sentence.ts: a concise meta description taken from the opening of a
// longer text (a glossary definition, an obligation's requirement), so the
// snippet is a whole sentence instead of a paragraph cut mid-thought (audit
// ONPAGE / CONTENT, 2026-09-25). Nothing is written: the sentences are the
// text's own, minus its [n] citation markers.

/** A full stop after one of these is not a sentence end ("Art. 9", "e.g. the"). */
const ABBREVIATION =
  /(?:^|[\s(/])(?:Art|Arts|No|Nos|Sec|Ch|para|paras|p|pp|v|vs|cf|e\.g|i\.e|etc|al|incl|Inc|Ltd|Co|St|Dr|approx|U\.S|U\.K|s|ss)$/;

/** The text split into sentences, abbreviation- and initial-aware. */
export function sentences(text: string): string[] {
  const clean = text
    .replace(/\s*\[\d+(?:\s*[,–-]\s*\d+)*\]/g, '')
    .replace(/\s+/g, ' ')
    .trim();
  const out: string[] = [];
  let start = 0;
  for (const match of clean.matchAll(/[.!?]["'”’)\]]?(?= ["“'(\[]?[A-Z0-9])/g)) {
    const at = match.index ?? 0;
    const before = clean.slice(start, at);
    if (ABBREVIATION.test(before) || /(?:^|\s)[A-Z]$/.test(before)) continue;
    const end = at + match[0].length;
    out.push(clean.slice(start, end).trim());
    start = end;
  }
  const rest = clean.slice(start).trim();
  if (rest) out.push(rest);
  return out;
}

/**
 * The opening sentence of `text`, plus the next ones while the result is shorter
 * than `min` and they still fit `max`. A first sentence longer than `max` is cut
 * on a word boundary with "…", never mid-word.
 */
export function leadSentence(text: string, max = 155, min = 50): string {
  const all = sentences(text);
  let lead = all[0] ?? '';
  for (const next of all.slice(1)) {
    if (lead.length >= min || `${lead} ${next}`.length > max) break;
    lead = `${lead} ${next}`;
  }
  if (lead.length <= max) return lead;
  const budget = max - 1;
  const boundary = lead[budget] === ' ' ? budget : lead.lastIndexOf(' ', budget);
  const cut = boundary > 0 ? lead.slice(0, boundary) : lead.slice(0, budget);
  return `${cut.replace(/[\s,;:(–-]+$/, '')}…`;
}
