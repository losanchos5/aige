// obligation-title.ts: the heading and the short title of an obligation page,
// shared by the page (src/pages/obligations/[id].astro) and its Open Graph card
// (src/pages/og/obligations/[id].png.ts), so the card renders exactly the page
// title and the page's og:image:alt (the title) describes it.
//
// Every string here is assembled from the register row and its framework
// (src/data/frameworks.ts); nothing is written by hand:
// - `obligationHeading` is the row's own name, qualified with its instrument
//   when the name does not say it ("MAP" -> "NIST AI RMF MAP", "AIBOM" ->
//   "OWASP AIBOM"), so the H1 never collides with a glossary term (audit F14).
// - `instrumentClause` joins the instrument's short name and the clause without
//   the stutter of a clause that restates it ("Brazil LGPD" + "LGPD Art. 20" ->
//   "Brazil LGPD Art. 20"; audit F4 / C9).
// - `obligationShortTitle` fits the heading into the title budget: it drops a
//   trailing parenthesis, then cuts at a comma, then on a word boundary with
//   "…", never mid-word and never on a dangling ":" or "and".
import { obligations, type Obligation } from '../data/frameworks';
import { frameworkOf } from './obligations';

/** Title budget. Seo keeps its " · AI Governance Engineer" suffix only while the
 *  whole title stays within 60 characters, so a 60-character title stands alone. */
export const OBLIGATION_TITLE_MAX = 60;

const words = (text: string): string[] => text.split(/\s+/).filter(Boolean);

/** A word without surrounding brackets, quotes or trailing punctuation, lower case. */
const norm = (word: string): string =>
  word.toLowerCase().replace(/^[("'“[]+/, '').replace(/[)"'”\].,:;]+$/, '');

/** True when `token` (from a short name) is one of `text`'s words, hyphenated
 *  parts included ("AI" in "AI-Generated"); tokens of four or more letters also
 *  match as an abbreviation ("Algo." in "Algorithmic"). */
function hasWord(text: string, token: string): boolean {
  const t = norm(token);
  if (!t) return false;
  return words(text)
    .flatMap((w) => [w, ...w.split('-')])
    .map(norm)
    .some((w) => w === t || (t.length >= 4 && w.startsWith(t)));
}

/** "<instrument> <clause>" without repeating the words they share. */
export function instrumentClause(row: Obligation): string {
  const short = words(frameworkOf(row).short);
  const clause = words(row.clause);
  // The clause opens with the tail of the short name: keep one copy.
  for (let k = Math.min(short.length, clause.length); k > 0; k--) {
    const tail = short.slice(-k).map(norm).join(' ');
    const head = clause.slice(0, k).map(norm).join(' ');
    if (tail === head) return [...short.slice(0, -k), ...clause].join(' ');
  }
  // The clause already names the whole instrument ("ISO/IEC 42006:2025").
  const lower = row.clause.toLowerCase();
  if (short.every((token) => lower.includes(norm(token)))) return row.clause;
  return `${short.join(' ')} ${row.clause}`;
}

/** True when the row's name already says which instrument it belongs to. */
function namesInstrument(row: Obligation): boolean {
  const fw = frameworkOf(row);
  const own = words(row.obligation).map(norm);
  return [words(fw.short)[0], words(fw.name)[0]].some(
    (token) => token !== undefined && own.includes(norm(token)),
  );
}

/**
 * The visible name of an obligation (the page's H1): the register's name when it
 * names its instrument, otherwise that name behind the instrument's short name,
 * minus the trailing words of the short name the obligation repeats ("OWASP
 * Agentic" + "Top 10 for Agentic Applications 2026" -> "OWASP Top 10 for ...").
 * A name that is the start of its clause label ("Transparency" for "Transparency
 * chapter") takes the fuller label.
 */
export function obligationHeading(row: Obligation): string {
  if (namesInstrument(row)) return row.obligation;
  const short = words(frameworkOf(row).short);
  const found = short.findIndex((token) => hasWord(row.obligation, token));
  const prefix = (found > 0 ? short.slice(0, found) : found === 0 ? [] : short).join(' ');
  const body = row.clause.toLowerCase().startsWith(row.obligation.toLowerCase())
    ? row.clause
    : row.obligation;
  return prefix ? `${prefix} ${body}` : body;
}

const DANGLING =
  /(?:\s+(?:and|or|of|for|the|with|to|in|on|a|an|by|incl\.?|including|as|at|from|that|which|whose|about|within|without|outside|before|after|under|into|over|against|per|via|between|across|than|Arts?\.))+$/i;

/** Cut `text` to `max` characters on a word boundary, ending in "…". */
function cutOnWord(text: string, max: number): string {
  const budget = max - 1;
  const boundary = text[budget] === ' ' ? budget : text.lastIndexOf(' ', budget);
  let cut = boundary > 0 ? text.slice(0, boundary) : text.slice(0, budget);
  // No half-open bracket, no dangling punctuation or connective.
  const open = cut.lastIndexOf('(');
  if (open > cut.lastIndexOf(')')) cut = cut.slice(0, open);
  for (let prev = ''; prev !== cut; ) {
    prev = cut;
    cut = cut.replace(/[\s,;:–-]+$/, '').replace(DANGLING, '');
  }
  return `${cut}…`;
}

/** Fit `text` into `max` characters, keeping as much of its meaning as possible. */
export function fitTitle(text: string, max = OBLIGATION_TITLE_MAX): string {
  if (text.length <= max) return text;
  // 1. Drop a trailing parenthesis: "(voluntary)", "(in force 2023-01-10)".
  const bare = text.replace(/\s*\([^()]*\)$/, '');
  if (bare.length <= max) return bare;
  // 2. Cut before a semicolon or an ", incl." aside inside the budget (a plain
  //    comma usually splits a list, so it is not a clean place to stop).
  const stop = Math.max(bare.lastIndexOf('; ', max), bare.lastIndexOf(', incl. ', max));
  if (stop >= 30) {
    const head = bare.slice(0, stop);
    if (head.split('(').length === head.split(')').length) return head;
  }
  // 3. A word boundary, with "…".
  return cutOnWord(bare, max);
}

let titles: Map<string, string> | undefined;

/** Short titles for every row, unique: rows whose fitted headings coincide fall
 *  back to their fitted "<instrument> <clause>" labels. */
function allTitles(): Map<string, string> {
  if (titles) return titles;
  const first = new Map(obligations.map((row) => [row.id, fitTitle(obligationHeading(row))]));
  const counts = new Map<string, number>();
  for (const title of first.values()) counts.set(title, (counts.get(title) ?? 0) + 1);
  titles = new Map(
    obligations.map((row) => {
      const title = first.get(row.id) ?? '';
      return [row.id, (counts.get(title) ?? 0) > 1 ? fitTitle(instrumentClause(row)) : title];
    }),
  );
  return titles;
}

/** The page's <title> (before Seo's suffix) and the text of its Open Graph card. */
export function obligationShortTitle(row: Obligation): string {
  return allTitles().get(row.id) ?? fitTitle(obligationHeading(row));
}

/** Path of the obligation's Open Graph card. */
export function obligationOgPath(row: Pick<Obligation, 'id'>): string {
  return `/og/obligations/${row.id.toLowerCase()}.png`;
}
