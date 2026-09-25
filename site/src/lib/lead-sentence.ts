// lead-sentence.ts: a meta description composed from the opening of a longer
// text (a glossary definition, an obligation's requirement), so the snippet is
// made of whole sentences instead of a paragraph cut mid-thought (audit ONPAGE
// F3 / N1, CONTENT C16). Nothing is written: the sentences are the text's own,
// minus its [n] citation markers, its parenthetical asides when they do not fit,
// or the clauses after a clause break; the caller adds a label and short
// sentences of page facts (a date, what the page carries) to reach the length a
// snippet should have. Never an ellipsis.

/** A description shorter than this says too little about the page. */
export const DESCRIPTION_MIN = 110;

/** A description longer than this is cut in the search snippet. */
export const DESCRIPTION_MAX = 158;

/** A full stop after one of these is not a sentence end ("Art. 9", "e.g. the"). */
const ABBREVIATION =
  /(?:^|[\s(/])(?:Art|Arts|No|Nos|Sec|Ch|para|paras|p|pp|v|vs|cf|e\.g|i\.e|etc|al|incl|Inc|Ltd|Co|St|Dr|approx|U\.S|U\.K|s|ss)$/;

/** Sentence end: . ! or ? with an optional closing quote or bracket. */
const SENTENCE_END = /[.!?]["'”’)\]]?$/;

/**
 * Clause breaks a sentence can be shortened at: "; ", ": ", or ", " before a
 * word that opens a qualifying clause (", which", ", where", ", incl.", ", then").
 * Not any other comma, which usually splits a list or opens an aside.
 */
const CLAUSE_BREAK =
  /;\s|:\s|,\s(?=(?:which|who|whose|where|when|while|whether|whatever|what|how|so|thus|each|not|but|with|without|incl\.|including|such as|e\.g\.|i\.e\.|unless|except|provided|as well as|rather than|in particular|notably|usually|often|typically|possibly|then|since|until|before|after|once|if)\s)/g;

/**
 * The looser break, tried when no clause break fits: ", " before a participle
 * or a preposition (", rendered from", ", describing its", ", at version 1.0"),
 * which usually opens a trailing qualifier but can open a list item, so the
 * cut must keep more of the sentence (LOOSE_FLOOR).
 */
const LOOSE_BREAK =
  /,\s(?=(?:[a-z]+ed|[a-z]+ing|fed|held|kept|set|run|made|taken|given|shown|known|drawn|written|in|at|by|for|to|under|within|across|through|on|over|per|via|into|from|against|between|during|among|beyond|outside|as|and so)\s)/g;
const LOOSE_FLOOR = 50;

/**
 * The last resort for a long sentence with no usable comma: a cut before a
 * preposition or a relative word, so the sentence ends on the noun a qualifier
 * follows ("... leads to harm" before "to health, critical infrastructure").
 * It keeps PHRASE_FLOOR characters, and never ends on a function word, on a
 * verb that wants its complement ("leads", "established") or inside a list
 * (the last item keeps two words: "develop, train" is refused).
 */
const PHRASE_BREAK =
  /\s(?=(?:in|on|at|by|for|to|under|within|across|through|over|per|via|into|from|against|between|during|among|beyond|outside|around|where|which|that|who|whose|when|while|with|without)\s)/g;
const PHRASE_FLOOR = 80;
const FUNCTION_WORD =
  /\b(?:a|an|the|and|or|nor|of|to|in|for|by|with|as|at|on|from|that|which|is|are|be|its|their|this|these|those|more|most|less|than|not|no|any|each|every|such|so|it|them|likely|may|can|must|will|would|could|should|has|have|had|was|were|been|also|only|both|either|lead|leads|read|apply|applies|conforms|means|[a-z]+ed)$/i;

/** True when `head` ends on a list item of one word ("develop, train"). */
function endsInShortListItem(head: string): boolean {
  const items = head.split(/,\s|\s(?:and|or)\s/);
  return items.length > 1 && (items[items.length - 1] ?? '').trim().split(/\s+/).length < 2;
}

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

/** `text` as a closed sentence: no trailing space or dangling mark, and a full
 *  stop unless it already ends in one. */
export function closeSentence(text: string): string {
  const clean = text
    .replace(/\s+/g, ' ')
    .trim()
    .replace(/[\s,;:–-]+$/, '');
  return SENTENCE_END.test(clean) ? clean : `${clean}.`;
}

/** True when every "(" in `text` is closed. */
const balanced = (text: string): boolean => text.split('(').length === text.split(')').length;

/** The longest head of `text` before a `breaks` match that fits `max` once
 *  closed, keeps at least `floor` characters and passes `accept`. */
function cutAt(
  text: string,
  breaks: RegExp,
  max: number,
  floor: number,
  accept: (head: string) => boolean = () => true,
): string | undefined {
  let best: string | undefined;
  for (const match of text.matchAll(breaks)) {
    const head = text.slice(0, match.index);
    if (head.length + 1 > max) break;
    if (head.length >= floor && balanced(head) && accept(head)) best = closeSentence(head);
  }
  return best;
}

/**
 * `sentence` within `max` characters, closed with a full stop: whole when it
 * fits; else without its parenthetical asides; else cut at the last clause
 * break inside the budget that keeps at least `floor` characters; else, when
 * `loose`, at a LOOSE_BREAK comma, then at a PHRASE_BREAK. Undefined when no
 * whole clause fits.
 */
export function shortenSentence(
  sentence: string,
  max: number,
  floor = 60,
  loose = false,
): string | undefined {
  const whole = closeSentence(sentence);
  if (whole.length <= max) return whole;
  // Asides after a space only, so "Art. 6(3)" keeps its paragraph number.
  const bare = closeSentence(sentence.replace(/\s+\([^()]*\)/g, ''));
  if (bare.length <= max) return bare;
  if (!loose) return cutAt(bare, CLAUSE_BREAK, max, floor);
  return (
    cutAt(bare, CLAUSE_BREAK, max, floor) ??
    cutAt(bare, LOOSE_BREAK, max, Math.min(floor, LOOSE_FLOOR)) ??
    cutAt(bare, PHRASE_BREAK, max, PHRASE_FLOOR, (head) => !FUNCTION_WORD.test(head) && !endsInShortListItem(head))
  );
}

/**
 * The lead as it reads behind a label: "The rules ..." -> "Term: the rules ...".
 * With `lowerFirst`, any plain capitalised first word is lowered ("Techniques
 * that ..."), not a name ("NIST's", "OECD", "Directive (EU) ...").
 */
function afterLabel(text: string, lowerFirst = false): string {
  if (!lowerFirst) return text.replace(/^(A|An|The)\s/, (word) => word.toLowerCase());
  // An article or a preposition always; another plain word only before a
  // lower-case one ("Techniques that", not "New York's").
  return text.replace(
    /^(?:(A|An|The|In|Under|For|On|At|By|With|Within|From)(?=\s)|([A-Z][a-z]*)(?=\s[a-z]))/,
    (word) => word.toLowerCase(),
  );
}

/** A sentence to append, or alternatives for it, longest first: the first that fits is taken. */
export type Extra = string | readonly string[];

/** "a", "a and b", "a, b and c". */
export function listAnd(items: readonly string[]): string {
  return items.length < 2 ? (items[0] ?? '') : `${items.slice(0, -1).join(', ')} and ${items[items.length - 1]}`;
}

/**
 * "<opening> a, b and c." and its shorter forms, longest first ("<opening> a
 * and b.", "<opening> a."): what a page carries, as an Extra that drops its
 * last items to fit.
 */
export function listSentences(opening: string, items: readonly string[]): string[] {
  return items.map((_, i) => `${opening} ${listAnd(items.slice(0, items.length - i))}.`);
}

/**
 * Append `extras` to `text` while it is shorter than `min`, each one only if it
 * (or one of its alternatives) still fits `max`. `contiguous` stops at the
 * first that does not fit, so a text's own sentences are never taken out of
 * order.
 */
export function appendSentences(
  text: string,
  extras: readonly Extra[],
  min = DESCRIPTION_MIN,
  max = DESCRIPTION_MAX,
  contiguous = false,
): string {
  let out = text;
  for (const extra of extras) {
    if (out.length >= min) break;
    const options = typeof extra === 'string' ? [extra] : extra;
    const next = options.map((option) => `${out} ${closeSentence(option)}`).find((t) => t.length <= max);
    if (next) out = next;
    else if (contiguous) break;
  }
  return out;
}

/** A labelled lead cut shorter than this reads worse than the whole lead alone. */
const LABELLED_FLOOR = 90;

export interface LeadOptions {
  /** Put in front as "<label>: <lead>" (a glossary term, an obligation's
   *  instrument and article). */
  label?: string;
  /** The label must lead: the lead is shortened to leave room for it. Otherwise
   *  it leads only when it fits beside the lead and the lead does not name it. */
  labelRequired?: boolean;
  /** The lead when no whole clause of `text` fits (e.g. the page heading). */
  fallback?: string;
  /** Lower a plain capitalised first word behind the label (glossary prose,
   *  not register rows that open with a name). */
  lowerFirst?: boolean;
  /** Also cut a long first sentence at a looser break (LOOSE_BREAK, PHRASE_BREAK). */
  loose?: boolean;
  /** The shortest cut of the first sentence worth keeping (default 60). */
  floor?: number;
  /** Sentences appended when they fit, whatever the length (e.g. a date). */
  always?: readonly Extra[];
  /** Sentences appended while the description is shorter than `min`. */
  extras?: readonly Extra[];
  min?: number;
  max?: number;
}

/**
 * A meta description from the opening of `text`: its first sentence (shortened
 * at a clause break when it runs past the budget), the label in front, the next
 * sentences while it is short, then the caller's `always` and `extras`
 * sentences. Whole sentences only, within `max`, never an ellipsis.
 */
export function leadDescription(text: string, options: LeadOptions = {}): string {
  const { label, labelRequired = false, fallback, lowerFirst = false, loose = false } = options;
  const { always = [], extras = [] } = options;
  const min = options.min ?? DESCRIPTION_MIN;
  const max = options.max ?? DESCRIPTION_MAX;
  const [first = '', ...rest] = sentences(text);
  const prefix = label ? `${label}: ` : '';
  const floor = options.floor ?? 60;
  const shorten = (room: number) => (first ? shortenSentence(first, room, floor, loose) : undefined);

  // The label leads when it must, or when the lead does not name it already and
  // the labelled lead keeps the whole sentence or at least LABELLED_FLOOR
  // characters; otherwise the lead stands alone.
  const named = label !== undefined && first.toLowerCase().includes(label.toLowerCase());
  const labelledLead = label && (labelRequired || !named) ? shorten(max - prefix.length) : undefined;
  const plainLead = labelRequired ? undefined : shorten(max);
  const useLabel =
    labelledLead !== undefined &&
    (labelRequired ||
      plainLead === undefined ||
      labelledLead === plainLead ||
      prefix.length + labelledLead.length >= LABELLED_FLOOR);
  const lead = useLabel ? labelledLead : plainLead;
  let out: string;
  if (lead === undefined) {
    const alternative = fallback ?? label ?? first;
    out = shortenSentence(alternative, max, 20) ?? closeSentence(label ?? '');
  } else {
    out = useLabel ? `${prefix}${afterLabel(lead, lowerFirst)}` : lead;
  }
  // The text's next sentences, whole and in order, when the lead is its whole
  // first sentence and the description is still short.
  if (lead !== undefined && lead === closeSentence(first)) {
    out = appendSentences(out, rest, min, max, true);
  }
  out = appendSentences(out, always, Infinity, max);
  return appendSentences(out, extras, min, max);
}
