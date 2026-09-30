// labels.ts: short drawn labels for the per-item visuals, taken from the
// record's own words (VISUAL-GUIDE §1.4: node labels of at most four words,
// nouns), and the one shortener and centre-box check every per-item radial
// and chain uses. The full wording always stays in the item's name (its
// tooltip and link name) and in the chart's table; nothing here types a word
// by hand.
import { textWidth, wrapText, type Face } from '../charts';

/** Words that open a qualifier: the head phrase ends before them. */
const STOP = new Set([
  'of', 'in', 'for', 'by', 'from', 'through', 'into', 'with', 'without', 'on', 'at', 'to', 'per',
  'against', 'under', 'and', 'or', 'that', 'which', 'whose', 'who', 'where', 'when', 'whenever',
  'given', 'kept', 'held', 'found',
]);
/** Function words a four-word cut never ends on. */
const TRAILING = new Set(['a', 'an', 'the', 'of', 'and', 'or', 'to', 'in', 'for', 'by', 'on', 'with']);
const MAX_WORDS = 4;

/**
 * The head phrase of a descriptive label: its words up to the first
 * qualifier (a preposition, a relative, a participle or a clause mark), at
 * most four, so "Policy card for the risk model listing ..." gives "Policy
 * card". A lone head noun keeps its "of" complement ("Leakage of
 * confidential data", "Record of runs").
 */
export function headPhrase(label: string): string {
  const words = label.trim().split(/\s+/);
  const out: string[] = [];
  for (const raw of words) {
    const word = raw.replace(/[,:;.]+$/, '');
    const lower = word.toLowerCase();
    if (out.length > 0) {
      const keepOf = lower === 'of' && out.length === 1;
      if (!keepOf && (STOP.has(lower) || /^\(/.test(word) || /(?:ing|ed)$/.test(lower))) break;
    }
    out.push(word);
    if (word !== raw) break; // a clause mark closes the phrase
  }
  const head = out.slice(0, MAX_WORDS);
  while (head.length > 1 && TRAILING.has(head[head.length - 1].toLowerCase())) head.pop();
  return head.join(' ');
}

/**
 * A name drawn on one line of `maxPx` at `px` (body face): the name itself
 * when it fits; else without its trailing "(...)" gloss ("Records of
 * processing activities"); else that gloss when it is an acronym ("RLHF");
 * else its head phrase ("OECD Framework"). The caller's primitive still
 * throws when even that does not fit.
 */
export function fitName(name: string, maxPx: number, px = 13): string {
  const fits = (s: string) => textWidth(s, px) <= maxPx;
  if (fits(name)) return name;
  const gloss = /\s*\(([^)]*)\)$/.exec(name);
  const bare = gloss ? name.slice(0, gloss.index) : name;
  if (fits(bare)) return bare;
  if (gloss && /^[A-Z][A-Z0-9-]*$/.test(gloss[1]) && fits(gloss[1])) return gloss[1];
  return headPhrase(bare);
}

/** Words a cut label never ends on before its ellipsis. */
const DANGLING = new Set(['of', 'and', 'the', 'for', 'with', 'from', 'to', 'a', 'an', 'in', 'on', 'per', 'that', 'by', 'or', 'as', 'its', 'is', '&']);

/** `text` when `ok`; else without a trailing "(...)" gloss; else the longest
 *  word-boundary prefix with an ellipsis that is `ok`, trailing function
 *  words and punctuation dropped first; undefined when none is. */
function cutUntil(text: string, ok: (s: string) => boolean): string | undefined {
  const whole = text.replace(/\s+/g, ' ').trim();
  if (ok(whole)) return whole;
  const bare = whole.replace(/\s*\([^)]*\)$/, '');
  if (bare && bare !== whole && ok(bare)) return bare;
  const words = bare.split(' ');
  for (let n = words.length - 1; n >= 1; n -= 1) {
    const cut = words.slice(0, n);
    while (cut.length > 1 && DANGLING.has(cut[cut.length - 1].replace(/[,;:.]+$/, '').toLowerCase())) cut.pop();
    const candidate = `${cut.join(' ').replace(/[,;:.]+$/, '')}…`;
    if (ok(candidate)) return candidate;
  }
  return undefined;
}

const wraps = (s: string, maxPx: number, px: number, lines: number, face: Face): boolean => {
  try {
    wrapText(s, maxPx, px, face, lines, 'cut');
    return true;
  } catch {
    return false;
  }
};

/**
 * The one shortener of the per-item visuals: `text` when it wraps into
 * `lines` lines of `maxPx` at `px` (measured by the kit's own wrapText);
 * else without a trailing "(...)" gloss; else the longest word-boundary
 * prefix that fits with an ellipsis. Throws when not even the first word fits.
 */
export function shortenToFit(text: string, maxPx: number, px = 13, lines = 1, face: Face = 'body'): string {
  const out = cutUntil(text, (s) => wraps(s, maxPx, px, lines, face));
  if (out === undefined) throw new Error(`labels: "${text.split(/\s+/)[0]}" does not fit ${maxPx}px at ${px}px`);
  return out;
}

/** relationRadial's centre box: it fits the label's longest word, 132 to 200
 *  wide (rounded), less 8 px of padding a side, three lines of 13.5 px. */
const CENTRE = { size: 13.5, lines: 3 };
const centreRoom = (label: string): number =>
  Math.round(Math.min(200, Math.max(132, Math.max(...label.split(/\s+/).map((word) => textWidth(word, CENTRE.size))) + 20))) - 16;

/** True when `label` fits the radial centre box. */
export function fitsCentre(label: string): boolean {
  return wraps(label, centreRoom(label), CENTRE.size, CENTRE.lines, 'body');
}

/** A title for the radial centre: whole when it fits, else shortened (the
 *  full title stays in the page heading). */
export const centreLabel = (title: string): string => cutUntil(title, fitsCentre) ?? title;
