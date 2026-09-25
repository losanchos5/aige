// lead-sentence.ts: a meta description composed from the opening of a longer
// text (a glossary definition, an obligation's requirement), so the snippet is
// made of whole sentences instead of a paragraph cut mid-thought (audit ONPAGE
// F3 / N1, CONTENT C16). Nothing is written: the sentences are the text's own,
// minus its [n] citation markers, its parenthetical asides when they do not fit
// and restrict nothing, or the clauses after a clause end ("; ", ": ", ",
// which"); the
// caller adds a label and short sentences of page facts (a date, what the page
// carries) to reach the length a snippet should have. A sentence that has no
// such opening is not paraphrased: the label leads the caller's own sentences
// instead (ONPAGE R3). Never an ellipsis.

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
 * Where a sentence may be shortened (audit ONPAGE R3), so the description is
 * the sentence's own opening up to a point where it can stop without saying
 * something else: a clause end, "; " or ": ", or a comma before a clause that
 * only adds to what precedes it (", which", ", such as", ", e.g.", ", for
 * example", ", including", ", in particular", ", usually", ", then", ",
 * each", ", as proposed by"). Any other comma
 * can split a list ("development business operators, who ..., and utilisation
 * business operators") or open a qualifier (", created to act as ...", ",
 * where ..."), so it is not a cut; nor is a space before a preposition
 * ("places it on the market" before "under its own name"). The kind of each
 * match is in its named group.
 */
const CLAUSE_END =
  /(?<end>;\s|:\s)|(?<aside>,\s(?=(?:which|such as|e\.g\.|i\.e\.|for example|for instance|including|incl\.|in particular|notably|usually|often|typically|commonly|then|each|as proposed by)\s))/g;

/**
 * Words that open a qualifier or continue a list: a clause end followed by one
 * of them is not a place to stop ("...; unless", "...: only where", "...; and").
 */
const QUALIFIER =
  /^(?:unless|except|excluding|only|provided|providing|where|wherever|when|whenever|if|save|subject to|other than|as long as|so long as|insofar|to the extent|but|and|or|nor)\b/i;

/** A list enumerator at the start of an item: "(a) ", "(ii) ", "b) ", "2. ". */
const ENUMERATOR = /^\(?(?:[a-z]|[ivx]+|\d+)[).]\s/i;

/**
 * A head before ": " that ends on a word wanting what follows ("... must",
 * "... the following", "... covers"). Before "; " or a comma clause the head
 * is a whole clause and may end on a preposition ("the data it was validated
 * on"), so only a dangling article or conjunction is refused there (LOOSE_END).
 */
const OPEN_END =
  /\b(?:a|an|the|and|or|nor|of|to|in|for|by|with|as|at|on|from|that|which|is|are|be|its|their|this|these|those|than|not|no|any|each|every|such|so|may|can|must|will|would|could|should|shall|has|have|had|was|were|been|only|unless|except|where|when|if|provided|include|includes|including|namely|following|follows|means|covers|requires|comprises|consists)$/i;
const LOOSE_END = /\b(?:a|an|the|and|or|nor)$/i;

/**
 * True when the "; " clause ends of `sentence` separate the items of a list
 * rather than whole clauses: a list after a colon ("must: keep logs; test"),
 * an enumerated item ("(a) ...; (b) ..."), or a last item opened by "and" /
 * "or" ("data quality; model testing; and monitoring").
 */
function semicolonList(sentence: string): boolean {
  const items = sentence.split(/;\s/).map((item) => item.trim());
  if (items.length < 2) return false;
  if (/:\s/.test(items[0])) return true;
  return items.some((item, i) => ENUMERATOR.test(item) || (i > 0 && /^(?:and|or)\s/i.test(item)));
}

/** A parenthetical aside after a space ("Art. 6(3)" keeps its paragraph number). */
const ASIDE = /\s+\([^()]*\)/g;

/** Words that make an aside restrictive, so it cannot be dropped. */
const RESTRICTIVE = /\b(?:unless|except|excluding|only|provided|where|when|if|not|other than|save|subject to|but)\b/i;

/** An aside inside a name: a capitalised word on both sides ("Data (Use and Access) Act"). */
const NAME_ASIDE = /[A-Z][\w-]*\s+\([^()]*\)\s+[A-Z]/;

/** `text` without its parenthetical asides; undefined when one of them
 *  restricts it or is part of a name. */
export function withoutAsides(text: string): string | undefined {
  const asides = text.match(ASIDE) ?? [];
  if (asides.some((aside) => RESTRICTIVE.test(aside)) || NAME_ASIDE.test(text)) return undefined;
  return text.replace(ASIDE, '');
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

/**
 * True when `head` stops inside the list a colon opens: after the colon, no
 * comma-separated list closed by "and" / "or" yet ("rules: which tools are
 * approved" is open; "bibliography: books, papers, law and guidance" is
 * closed).
 */
function openColonList(head: string): boolean {
  const colon = head.lastIndexOf(': ');
  if (colon < 0) return false;
  const items = head.slice(colon + 2).split(/,\s/);
  return items.length < 2 || !/\s(?:and|or)\s/.test(items[items.length - 1] ?? '');
}

/**
 * The longest head of `sentence` before a CLAUSE_END that fits `max` once
 * closed and keeps at least `floor` characters. A head is refused when it ends
 * on a word that wants what follows, when the clause after it opens with a
 * qualifier or an enumerator, at a "; " when the semicolons separate list
 * items (semicolonList), and at a comma inside the list a colon opens
 * (openColonList: "rules: which tools are approved, which data ...") or when
 * the sentence goes on with ", and" or ", or" (the clause sits inside a list
 * whose next item would be lost). Undefined when no head qualifies.
 */
function cutAtClauseEnd(sentence: string, max: number, floor: number): string | undefined {
  const list = semicolonList(sentence);
  let best: string | undefined;
  for (const match of sentence.matchAll(CLAUSE_END)) {
    const at = match.index ?? 0;
    const head = sentence.slice(0, at);
    if (head.length + 1 > max) break;
    const rest = sentence.slice(at + match[0].length);
    if (match.groups?.end?.startsWith(';') && list) continue;
    if (match.groups?.aside !== undefined && (openColonList(head) || /,\s(?:and|or)\s/.test(rest))) continue;
    if (head.length < floor || !balanced(head)) continue;
    if ((match.groups?.end?.startsWith(':') ? OPEN_END : LOOSE_END).test(head)) continue;
    if (QUALIFIER.test(rest) || ENUMERATOR.test(rest)) continue;
    best = closeSentence(head);
  }
  return best;
}

/**
 * `sentence` within `max` characters, closed with a full stop: whole when it
 * fits; else without its parenthetical asides, when none restricts it; else
 * its opening up to the last CLAUSE_END inside the budget that keeps at least
 * `floor` characters and drops no qualifier or list item. Never a cut at any
 * other comma or inside a phrase, which can drop a qualifier and turn a
 * restricted statement into a general one (audit ONPAGE R3). Undefined when
 * no such opening fits: the caller then uses its template or fallback.
 */
export function shortenSentence(sentence: string, max: number, floor = 60): string | undefined {
  const whole = closeSentence(sentence);
  if (whole.length <= max) return whole;
  const bareText = withoutAsides(sentence);
  if (bareText !== undefined) {
    const bare = closeSentence(bareText);
    if (bare.length <= max) return bare;
  }
  return (
    (bareText !== undefined ? cutAtClauseEnd(bareText, max, floor) : undefined) ??
    cutAtClauseEnd(sentence, max, floor)
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
  /** The lead when no opening of `text` fits (e.g. the page heading). Without
   *  it, the label leads the first of `extras` instead: "<label>: definition
   *  with ...", a template that does not paraphrase the text. */
  fallback?: string;
  /** Lower a plain capitalised first word behind the label (glossary prose,
   *  not register rows that open with a name). */
  lowerFirst?: boolean;
  /** Kept for the callers that pass it: since ONPAGE R3 no cut is looser than
   *  a clause end, whatever this says. */
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

/** "Definition with ..." -> "definition with ...", behind a label. */
const lowerOpening = (text: string): string => text.replace(/^[A-Z](?=[a-z])/, (c) => c.toLowerCase());

/**
 * "<label>: <extra>" for the first of `extras` that fits `max`, followed by the
 * extras after it while the description is shorter than `min`: of that extra's
 * alternatives, the longest that still leaves room to reach `min`, else the
 * longest that fits. Undefined when no extra fits.
 */
function labelledTemplate(label: string, extras: readonly Extra[], min: number, max: number): string | undefined {
  for (const [i, extra] of extras.entries()) {
    const options = typeof extra === 'string' ? [extra] : extra;
    const built = options
      .map((option) => `${label}: ${lowerOpening(closeSentence(option))}`)
      .filter((text) => text.length <= max)
      .map((text) => appendSentences(text, extras.slice(i + 1), min, max));
    if (built.length > 0) return built.find((text) => text.length >= min) ?? built[0];
  }
  return undefined;
}

/**
 * A meta description from the opening of `text`: its first sentence (shortened
 * at a clause end when it runs past the budget), the label in front, the next
 * sentences while it is short, then the caller's `always` and `extras`
 * sentences. When no opening of the first sentence can stand alone, the
 * `fallback` leads, or else the label with the first extra ("<term>: definition
 * with ..."), never a cut that changes what the text says. Whole sentences
 * only, within `max`, never an ellipsis.
 */
export function leadDescription(text: string, options: LeadOptions = {}): string {
  const { label, labelRequired = false, fallback, lowerFirst = false } = options;
  const { always = [], extras = [] } = options;
  const min = options.min ?? DESCRIPTION_MIN;
  const max = options.max ?? DESCRIPTION_MAX;
  const [first = '', ...rest] = sentences(text);
  const prefix = label ? `${label}: ` : '';
  const floor = options.floor ?? 60;
  const shorten = (room: number) => (first ? shortenSentence(first, room, floor) : undefined);

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
  let remaining = extras;
  if (lead === undefined) {
    const template = !fallback && label ? labelledTemplate(label, extras, min, max) : undefined;
    if (template) {
      out = template;
      remaining = [];
    } else {
      // A heading's trailing aside ("(in force 2026-02-05)", "(voluntary)")
      // repeats what the appended sentences say; an aside inside it is part of
      // a name ("Data (Use and Access) Act 2025") and stays.
      const alternative = fallback?.replace(/\s*\([^()]*\)$/, '') || label || first;
      out = shortenSentence(alternative, max, 20) ?? closeSentence(label ?? '');
    }
  } else {
    out = useLabel ? `${prefix}${afterLabel(lead, lowerFirst)}` : lead;
  }
  // The text's next sentences, whole and in order, when the lead is its whole
  // first sentence and the description is still short.
  if (lead !== undefined && lead === closeSentence(first)) {
    out = appendSentences(out, rest, min, max, true);
  }
  out = appendSentences(out, always, Infinity, max);
  return appendSentences(out, remaining, min, max);
}
