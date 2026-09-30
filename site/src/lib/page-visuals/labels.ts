// labels.ts: short drawn labels for the per-item visuals, taken from the
// record's own words (VISUAL-GUIDE §1.4: node labels of at most four words,
// nouns). The full wording always stays in the item's name (its tooltip and
// link name) and in the chart's table; nothing here types a word by hand.
import { textWidth } from '../charts';

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
