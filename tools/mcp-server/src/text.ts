// text.ts: the small text toolkit the search tools share: normalisation
// (case, diacritics, punctuation), tokenising, a transparent relevance score,
// snippets and edit-distance suggestions. Deliberately simple and
// deterministic: the corpus is a few thousand short strings.

/** Lower case, no diacritics, punctuation to spaces, single spaces. */
export function normalise(value: string): string {
  return value
    .normalize('NFKD')
    .replace(/[̀-ͯ]/g, '')
    .toLowerCase()
    .replace(/&/g, ' and ')
    .replace(/[^a-z0-9]+/g, ' ')
    .trim();
}

const STOP = new Set([
  'a', 'an', 'and', 'are', 'as', 'at', 'be', 'by', 'for', 'from', 'how', 'in', 'is', 'it', 'of', 'on',
  'or', 'the', 'to', 'what', 'when', 'which', 'who', 'why', 'with', 'does', 'do', 'i', 'my', 'we',
]);

/** Distinct query tokens, stop words dropped unless nothing else is left. */
export function tokens(value: string): string[] {
  const all = normalise(value).split(' ').filter((token) => token !== '');
  const kept = all.filter((token) => !STOP.has(token));
  return [...new Set(kept.length > 0 ? kept : all)];
}

/** Does `haystack` (normalised) contain `token` at a word start? */
function hasWordPrefix(haystack: string, token: string): boolean {
  if (haystack.startsWith(token)) return true;
  return haystack.includes(` ${token}`);
}

export interface Field {
  text: string;
  /** Weight of a token hit in this field. */
  weight: number;
}

/**
 * Score a record for a query. A title that equals the query scores highest,
 * then a title that starts with it or contains it as a phrase, then token hits
 * weighted by field. Every query token must hit some field (AND semantics), so
 * adding words narrows the result. Returns 0 for no match.
 */
export function score(query: string, title: string, fields: Field[]): number {
  return scoreNormalised(
    prepareQuery(query),
    normalise(title),
    fields.map((field) => ({ text: normalise(field.text), weight: field.weight })),
  );
}

export interface PreparedQuery {
  q: string;
  tokens: string[];
}

export function prepareQuery(query: string): PreparedQuery {
  return { q: normalise(query), tokens: tokens(query) };
}

/** score() over strings already passed through normalise() (large, pre-indexed corpora). */
export function scoreNormalised(query: PreparedQuery, t: string, normalisedFields: Field[]): number {
  const { q, tokens: qTokens } = query;
  if (q === '' || qTokens.length === 0) return 0;
  let total = 0;
  for (const token of qTokens) {
    let best = 0;
    if (hasWordPrefix(t, token)) best = 10;
    for (const field of normalisedFields) {
      if (field.weight > best && hasWordPrefix(field.text, token)) best = field.weight;
    }
    if (best === 0) return 0;
    total += best;
  }
  if (t === q) total += 100;
  else if (t.startsWith(q)) total += 50;
  else if (hasWordPrefix(t, q)) total += 30;
  else if (normalisedFields.some((field) => field.weight >= 3 && hasWordPrefix(field.text, q))) total += 8;
  return total;
}

/** A short window of `text` around the first query token, for result lists. */
export function snippet(text: string, query: string, max = 220): string {
  const flat = text.replace(/\s+/g, ' ').trim();
  if (flat.length <= max) return flat;
  const lower = flat.toLowerCase();
  let at = -1;
  for (const token of tokens(query)) {
    at = lower.indexOf(token);
    if (at >= 0) break;
  }
  const start = at < 0 ? 0 : Math.max(0, at - Math.floor(max / 3));
  const end = Math.min(flat.length, start + max);
  return `${start > 0 ? '… ' : ''}${flat.slice(start, end).trim()}${end < flat.length ? ' …' : ''}`;
}

/** Levenshtein distance, bounded (returns `limit + 1` once exceeded). */
export function distance(a: string, b: string, limit = 8): number {
  if (Math.abs(a.length - b.length) > limit) return limit + 1;
  let previous = Array.from({ length: b.length + 1 }, (_, i) => i);
  for (let i = 1; i <= a.length; i += 1) {
    const current = [i];
    let rowMin = i;
    for (let j = 1; j <= b.length; j += 1) {
      const cost = a[i - 1] === b[j - 1] ? 0 : 1;
      const value = Math.min((previous[j] ?? 0) + 1, (current[j - 1] ?? 0) + 1, (previous[j - 1] ?? 0) + cost);
      current.push(value);
      rowMin = Math.min(rowMin, value);
    }
    if (rowMin > limit) return limit + 1;
    previous = current;
  }
  return previous[b.length] ?? limit + 1;
}

/** Up to `count` candidates closest to `wanted` (by containment, then edit distance). */
export function suggest(wanted: string, candidates: string[], count = 5): string[] {
  const w = normalise(wanted);
  if (w === '') return candidates.slice(0, count);
  return candidates
    .map((candidate) => {
      const c = normalise(candidate);
      const rank = c.includes(w) || w.includes(c) ? 0 : distance(w, c);
      return { candidate, rank };
    })
    .filter((item) => item.rank <= Math.max(3, Math.floor(w.length / 2)))
    .sort((a, b) => a.rank - b.rank || a.candidate.localeCompare(b.candidate))
    .slice(0, count)
    .map((item) => item.candidate);
}

/** A slug-like key: lower case, words joined by single hyphens. */
export function slugKey(value: string): string {
  return normalise(value).replace(/ /g, '-');
}
