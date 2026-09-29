// obligation-lookup.ts: builds the index behind the "Look up an article" box
// (served as /obligations/lookup.json). One entry per obligation-register row,
// then one per crosswalk clause that has no register row, so a finer clause
// (ISO/IEC 42001 6.1.2, NIST GOVERN 1.6) still lands on the crosswalk topic that
// files it. Keys are computed here with the same code the browser runs
// (obligation-lookup-core.js), so the two cannot drift.

import { frameworks, obligations } from '../data/frameworks';
import { refs, refObligation, topics, frameworkById, crosswalkFrameworks } from '../data/crosswalk';
import { instrumentAliases } from '../data/obligation-aliases';
import { obligationPath } from './obligations';
import { aliasTokens, clauseKey, clauseKeys } from './obligation-lookup-core.js';

/** One searchable clause: `k` 'o' = obligation page, 't' = crosswalk topic. */
export interface LookupEntry {
  k: 'o' | 't';
  /** Site path the result opens. */
  p: string;
  /** Framework id. */
  f: string;
  /** Instrument short name, as shown in the result. */
  s: string;
  /** Clause label as written in the data. */
  c: string;
  /** Obligation title, or the clause title and its topic. */
  t: string;
  /** Whole-label key. */
  u: string;
  /** Every key the clause answers to; omitted when it is just `u`. */
  x?: string[];
}

export interface LookupIndex {
  version: 1;
  /** Alias token lists with their framework id, longest first. */
  aliases: Array<[string[], string]>;
  entries: LookupEntry[];
}

/** Framework ids the box knows: the register's, then the crosswalk's. */
function knownFrameworkIds(): Set<string> {
  return new Set([...frameworks.map((f) => f.id), ...crosswalkFrameworks().map((f) => f.id)]);
}

/** Alias token lists for every instrument: its id with dashes as spaces, its
 *  short name, and the curated aliases. Duplicates that point at two
 *  instruments are dropped, so an alias never guesses. */
export function lookupAliases(): Array<[string[], string]> {
  const byAlias = new Map<string, Set<string>>();
  const add = (alias: string, id: string) => {
    const toks = aliasTokens(alias);
    if (!toks.length) return;
    const joined = toks.join(' ');
    byAlias.set(joined, (byAlias.get(joined) ?? new Set()).add(id));
    // "iso42001", "euaia": the same alias typed without spaces.
    if (toks.length > 1) {
      const glued = toks.join('');
      byAlias.set(glued, (byAlias.get(glued) ?? new Set()).add(id));
    }
  };
  for (const id of knownFrameworkIds()) {
    const fw = frameworkById(id);
    add(id, id);
    if (fw?.short) add(fw.short, id);
  }
  for (const [id, list] of Object.entries(instrumentAliases)) {
    for (const alias of list) add(alias, id);
  }
  return [...byAlias.entries()]
    .filter(([, ids]) => ids.size === 1)
    .map(([alias, ids]): [string[], string] => [alias.split(' '), [...ids][0]])
    .sort((a, b) => b[0].length - a[0].length || a[0].join(' ').localeCompare(b[0].join(' ')));
}

/** Curated alias keys that name no known instrument (a test keeps this empty). */
export function unknownAliasKeys(): string[] {
  const known = knownFrameworkIds();
  return Object.keys(instrumentAliases).filter((id) => !known.has(id));
}

/** Result titles are one line; the page carries the full text. */
function clip(text: string, max = 90): string {
  return text.length <= max ? text : `${text.slice(0, max - 1).trimEnd()}…`;
}

/** Keys for an entry, dropping `x` when it only repeats the whole-label key. */
function keysOf(clause: string): Pick<LookupEntry, 'u' | 'x'> {
  const u = clauseKey(clause);
  const x = clauseKeys(clause);
  return x.length === 1 && x[0] === u ? { u } : { u, x };
}

export function lookupIndex(): LookupIndex {
  const short = (id: string) => frameworkById(id)?.short ?? id;
  const entries: LookupEntry[] = obligations.map((row) => ({
    k: 'o',
    p: obligationPath(row),
    f: row.frameworkId,
    s: short(row.frameworkId),
    c: row.clause,
    t: clip(row.obligation),
    ...keysOf(row.clause),
  }));
  const topicName = new Map(topics.map((t) => [t.id, t.name]));
  // One entry per clause: a clause the crosswalk files under several topics
  // opens the first of them, so the result list never repeats the same clause.
  const seen = new Set<string>();
  for (const r of refs) {
    if (refObligation(r)) continue;
    const path = `/resources/crosswalk#topic-${r.topic}`;
    const id = `${r.framework}|${r.ref}`;
    if (seen.has(id)) continue;
    seen.add(id);
    entries.push({
      k: 't',
      p: path,
      f: r.framework,
      s: short(r.framework),
      c: r.ref,
      t: clip(`${r.title} (topic: ${topicName.get(r.topic) ?? r.topic})`),
      ...keysOf(r.ref),
    });
  }
  return { version: 1, aliases: lookupAliases(), entries };
}
