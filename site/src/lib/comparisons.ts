// comparisons.ts: the derived half of the "<A> vs <B>" comparison pages
// (src/data/comparisons.ts holds the editorial half). Everything here is read
// from the crosswalk (src/data/crosswalk.ts) and the obligation register
// (src/data/frameworks.ts), so a page cannot say more, or other, than the
// matrix on /resources/crosswalk:
//
// - one overlap row per crosswalk topic that either instrument reaches, with
//   each side's clauses (core first), the register rows they join and an
//   overlap level;
// - the chapter-05 patterns that serve a CORE clause of the topic on BOTH
//   sides (a single artefact that serves the two instruments), see
//   sharedPatterns;
// - the counts the page states, the generated texts (the "can you use"
//   question, the overlap summary, a FAQ item) and the source URLs.
//
// Overlap levels, from the refs' own `strength`:
//   strong  both instruments file a core clause under the topic;
//   partial both file a clause, at least one only a related one;
//   a-only / b-only  one instrument files a clause, the other none. When that
//     instrument's clauses are all `related`, the row is marked `passing`: it
//     touches the topic in passing, and the page never counts it as a topic
//     the instrument covers and the other does not.
// A shared topic means the two deal with the same thing, never that meeting one
// meets the other (the crosswalk's own caveat).
import type { Framework, Obligation } from '../data/frameworks';
import {
  topics,
  refs,
  chipLabel,
  frameworkById,
  refObligation,
  type CrosswalkRef,
  type Topic,
} from '../data/crosswalk';
import { patterns, type PatternDef } from '../data/patterns';
import { glance, type ComparisonDef, type Qa } from '../data/comparisons';

export type OverlapLevel = 'strong' | 'partial' | 'a-only' | 'b-only';

/** One clause of one side, with the register row it joins (if any). */
export interface SideRef {
  ref: CrosswalkRef;
  /** Chip label as the crosswalk prints it ("Art. 9", "6.1.2", "MAP 1.1"). */
  label: string;
  /** The clause's title without a repeated clause id. */
  title: string;
  obligation?: Obligation;
}

export interface OverlapRow {
  topic: Topic;
  a: SideRef[];
  b: SideRef[];
  level: OverlapLevel;
  /** One-sided row whose clauses are all `related`: the topic is touched in
   *  passing, not covered. Always false on a two-sided row. */
  passing: boolean;
  /** Patterns that serve a core clause of the topic on each side, catalogue order. */
  shared: PatternDef[];
}

export interface Comparison {
  def: ComparisonDef;
  fa: Framework;
  fb: Framework;
  rows: OverlapRow[];
  counts: {
    topics: number;
    both: number;
    strong: number;
    aOnly: number;
    bOnly: number;
    /** Of aOnly and bOnly, the rows touched only in passing. */
    aPassing: number;
    bPassing: number;
    neither: number;
  };
}

const coreFirst = (list: CrosswalkRef[]): CrosswalkRef[] =>
  [...list].sort((x, y) => Number(x.strength !== 'core') - Number(y.strength !== 'core'));

function side(topicId: string, frameworkId: string): SideRef[] {
  return coreFirst(refs.filter((r) => r.topic === topicId && r.framework === frameworkId)).map(
    (ref) => ({
      ref,
      label: chipLabel(ref),
      // NIST refs are titled "MAP 1.1: <statement>"; the chip already says MAP 1.1.
      title: ref.title.startsWith(`${ref.ref}: `) ? ref.title.slice(ref.ref.length + 2) : ref.title,
      obligation: refObligation(ref),
    }),
  );
}

// ---- Patterns for both -------------------------------------------------------
//
// A pattern's register rows (obligation.patterns) are per obligation, and an
// obligation row spans more than one topic: ISO/IEC 42001 A.8 "information for
// interested parties" lists the explanation and notice patterns, which then
// leaked into the incident row, and a whole-article `related` clause (Art. 3
// under risk management) leaked its article's patterns into narrow topics. So a
// pattern is listed on a row only when, on EACH side, one CORE clause of that
// row both joins a register row listing the pattern AND is named on the
// pattern's own "Maps to" line (that very clause, control or subcategory, or a
// paragraph of an EU AI Act article the row files whole; never an ISO/IEC 42001
// control or a NIST AI RMF subcategory standing in for its group, nor a NIST
// function named as a whole, "NIST AI RMF (Manage)"). A pattern whose line
// names the instrument without a clause ("ISO/IEC 42001") cannot pass on that
// side. Where no pattern passes, the cell stays empty.

/** How a pattern's "Maps to" line names each instrument this module compares. */
const MAPS_TO_PREFIX: Readonly<Record<string, string>> = {
  'eu-ai-act': 'EU AI Act',
  'iso-42001': 'ISO/IEC 42001',
  'nist-ai-rmf': 'NIST AI RMF',
};

/**
 * The clause ids a pattern's "Maps to" line names for one instrument, in the
 * crosswalk's `ref` notation: "Art. 10(2)(f)–(g)", "A.9.2", "MANAGE 2.4", or a
 * bare NIST function ("MANAGE"). Empty for an instrument the line names without
 * a clause, or not at all.
 */
export function namedClauses(pattern: Pick<PatternDef, 'mapsTo'>, frameworkId: string): string[] {
  const prefix = MAPS_TO_PREFIX[frameworkId];
  if (!prefix) return [];
  const out: string[] = [];
  for (const entry of pattern.mapsTo) {
    if (!entry.startsWith(prefix)) continue;
    const rest = entry.slice(prefix.length).trim();
    if (frameworkId === 'eu-ai-act') {
      // "Art. 9, Art. 15", "Art. 10(2)(f)–(g)", "Art. 49/71"; "(GPAI)" glosses drop.
      for (const m of rest.matchAll(/Art\. (\d+[a-z]?)((?:\([^)\s]*\)(?:–\([^)\s]*\))?)*)(?:\/(\d+))?/g)) {
        out.push(`Art. ${m[1]}${m[2]}`);
        if (m[3]) out.push(`Art. ${m[3]}`);
      }
    } else if (frameworkId === 'iso-42001') {
      // "A.2, A.9.2, A.10.3", "Annex A.10", "6.1.2"; "ISO/IEC 42005" is no clause.
      for (const m of rest.matchAll(/\bA\.\d+(?:\.\d+)*|\b\d+(?:\.\d+)+/g)) out.push(m[0]);
    } else {
      // "MEASURE 2.10, GOVERN 1.1", "(Measure 2.8, 2.9)", "(Govern 6.1; Map 4.1)",
      // "(Manage, Govern)": a bare number continues the function before it.
      for (const part of rest.replace(/^\(|\)$/g, '').split(';')) {
        let fn = '';
        for (const token of part.split(',').map((t) => t.trim())) {
          const m = /^(?:([A-Za-z]+)\s*)?(\d+(?:\.\d+)*)?$/.exec(token);
          if (!m || (!m[1] && !m[2])) continue;
          if (m[1]) fn = m[1].toUpperCase();
          if (!fn) continue;
          out.push(m[2] ? `${fn} ${m[2]}` : fn);
        }
      }
    }
  }
  return out;
}

/** Whether a named clause is the ref's own clause: the same clause, control or
 *  subcategory, or a paragraph of the EU AI Act article the ref files whole
 *  ("Art. 26(5)" in "Art. 26": one article, one duty holder's obligation). An
 *  ISO/IEC 42001 control does not stand in for its group ("A.6.2.4", a
 *  fairness eval, is not all of "A.6" and so not documentation), a NIST
 *  subcategory for its category ("GOVERN 2.2", training, is not all of
 *  "GOVERN 2"), nor a function named as a whole for its subcategories
 *  ("MANAGE" is not "MANAGE 2.4"): each paired patterns with topics they do
 *  not serve (audit CONTENT N-R3-5). */
function covers(named: string, ref: string): boolean {
  return named === ref || (/^Art\. \d+[a-z]?$/.test(ref) && named.startsWith(`${ref}(`));
}

/** Whether the pattern serves a core clause of this side of the row: the clause
 *  joins a register row listing the pattern and the pattern's line names it. */
function servesCore(pattern: PatternDef, list: SideRef[], frameworkId: string): boolean {
  const named = namedClauses(pattern, frameworkId);
  if (named.length === 0) return false;
  return list.some(
    (s) =>
      s.ref.strength === 'core' &&
      (s.obligation?.patterns ?? []).includes(pattern.id) &&
      named.some((n) => covers(n, s.ref.ref)),
  );
}

/** The patterns that serve a core clause on both sides of a row, catalogue order. */
export function sharedPatterns(
  a: SideRef[],
  b: SideRef[],
  aFramework: string,
  bFramework: string,
): PatternDef[] {
  return patterns.filter((p) => servesCore(p, a, aFramework) && servesCore(p, b, bFramework));
}

function levelOf(a: SideRef[], b: SideRef[]): OverlapLevel {
  const core = (list: SideRef[]) => list.some((s) => s.ref.strength === 'core');
  if (a.length > 0 && b.length > 0) return core(a) && core(b) ? 'strong' : 'partial';
  return a.length > 0 ? 'a-only' : 'b-only';
}

/** The derived comparison for one editorial definition. Throws on an unknown id. */
export function buildComparison(def: ComparisonDef): Comparison {
  const fa = frameworkById(def.a);
  const fb = frameworkById(def.b);
  if (!fa || !fb) throw new Error(`comparisons: no framework "${fa ? def.b : def.a}"`);

  const rows: OverlapRow[] = [];
  let neither = 0;
  for (const topic of topics) {
    const a = side(topic.id, fa.id);
    const b = side(topic.id, fb.id);
    if (a.length === 0 && b.length === 0) {
      neither += 1;
      continue;
    }
    const level = levelOf(a, b);
    const one = level === 'a-only' ? a : level === 'b-only' ? b : [];
    const passing = one.length > 0 && one.every((s) => s.ref.strength !== 'core');
    rows.push({ topic, a, b, level, passing, shared: sharedPatterns(a, b, fa.id, fb.id) });
  }

  const count = (level: OverlapLevel) => rows.filter((row) => row.level === level).length;
  const inPassing = (level: OverlapLevel) =>
    rows.filter((row) => row.level === level && row.passing).length;
  return {
    def,
    fa,
    fb,
    rows,
    counts: {
      topics: topics.length,
      both: count('strong') + count('partial'),
      strong: count('strong'),
      aOnly: count('a-only'),
      bOnly: count('b-only'),
      aPassing: inPassing('a-only'),
      bPassing: inPassing('b-only'),
      neither,
    },
  };
}

/** Human label of an overlap level for this pair ("EU AI Act only, in passing"
 *  when the one side's clauses are all `related`). */
export function levelLabel(
  level: OverlapLevel,
  c: Pick<Comparison, 'def'>,
  passing = false,
): string {
  const tail = passing ? ', in passing' : '';
  switch (level) {
    case 'strong':
      return 'Strong';
    case 'partial':
      return 'Partial';
    case 'a-only':
      return `${c.def.aName} only${tail}`;
    case 'b-only':
      return `${c.def.bName} only${tail}`;
  }
}

/** A short name as it reads mid-sentence: "the EU AI Act", but "ISO 42001". */
export function inSentence(name: string): string {
  return name.startsWith('ISO') ? name : `the ${name}`;
}

/**
 * The heading of the pair's "can you use" question, worded by what B is: a law
 * is complied with ("Can you use ISO 42001 to comply with the EU AI Act?"), a
 * certifiable standard is certified to ("Can the NIST AI RMF help you certify
 * to ISO/IEC 42001?").
 */
export function canUseQuestion(c: Pick<Comparison, 'def' | 'fb'>): string {
  const a = inSentence(c.def.aName);
  if (c.fb.type === 'law') return `Can you use ${a} to comply with ${inSentence(c.def.bName)}?`;
  if (c.fb.type === 'standard') return `Can ${a} help you certify to ${c.fb.name}?`;
  return `Can you use ${a} alongside ${inSentence(c.def.bName)}?`;
}

/** A pair's text with {topics}, {both} and {strong} replaced by its crosswalk counts. */
export function fillCounts(text: string, c: Pick<Comparison, 'counts'>): string {
  return text
    .replace(/\{topics\}/g, String(c.counts.topics))
    .replace(/\{both\}/g, String(c.counts.both))
    .replace(/\{strong\}/g, String(c.counts.strong));
}

/** The pair's "In short" passage, counts filled in. */
export function inShortText(c: Pick<Comparison, 'def' | 'counts'>): string {
  return fillCounts(c.def.inShort, c);
}

/**
 * The sentences the overlap section opens with: how many topics the two share,
 * how many each covers alone (rows touched only in passing counted apart) and
 * how many neither reaches. The page and its Markdown twin both print them.
 */
export function overlapSummary(c: Comparison): string {
  const { topics: total, both, strong, aOnly, bOnly, aPassing, bPassing, neither } = c.counts;
  const coreA = aOnly - aPassing;
  const coreB = bOnly - bPassing;
  const passing = aPassing + bPassing;
  const isAre = (n: number) => (n === 1 ? 'is' : 'are');
  const passingPart =
    passing > 0
      ? `; ${passing} more ${isAre(passing)} touched by one side only in passing (a related clause, not a core one)`
      : '';
  return [
    `The crosswalk maps ${total} AI governance topics.`,
    `Both instruments file clauses under ${both} of them, ${strong} strongly (a core clause on each side).`,
    `${coreA} ${coreA === 1 ? 'topic has' : 'topics have'} a core clause only in ${inSentence(c.def.aName)} and ${coreB} only in ${inSentence(c.def.bName)}${passingPart}; ${neither} ${isAre(neither)} reached by neither.`,
    'A shared topic means the two deal with the same thing, not that meeting one meets the other.',
  ].join(' ');
}

/**
 * The FAQ item generated from the crosswalk: what the wider instrument covers
 * that the other does not (the side with more one-sided topics; B on a tie).
 * Only topics with a CORE clause on the wide side count as covered; the ones it
 * touches in passing are named apart. Stated for this mapping, never as a fact
 * about the instruments ("no ISO 42001 clause mapped", not "ISO 42001 has no
 * clause": its text is paywalled and environmental impact, for one, is a topic
 * this mapping does not reach there; audit CONTENT R2), with the pair's gapNote
 * (what the mapping leaves out) appended.
 */
export function gapQuestion(c: Comparison): Qa {
  const bSide = c.counts.bOnly >= c.counts.aOnly;
  const [wide, narrow] = bSide ? [c.def.bName, c.def.aName] : [c.def.aName, c.def.bName];
  const level: OverlapLevel = bSide ? 'b-only' : 'a-only';
  const oneSided = c.rows.filter((row) => row.level === level);
  const only = oneSided.filter((row) => !row.passing).map((row) => row.topic.name);
  const passing = oneSided.filter((row) => row.passing).map((row) => row.topic.name);
  const q = `What does ${inSentence(wide)} cover that ${inSentence(narrow)} does not?`;
  const note = c.def.gapNote;
  const withNote = (text: string) => (note ? `${text} ${note.text}` : text);
  const sources = note ? { sources: note.sources } : {};
  if (only.length === 0 && passing.length === 0) {
    return {
      q,
      a: withNote(
        `In this crosswalk, every topic ${inSentence(wide)} reaches also has a ${narrow} clause. A shared topic means the two deal with the same thing, not that meeting one meets the other.`,
      ),
      ...sources,
    };
  }
  const covered =
    only.length === 0
      ? `In this crosswalk, no topic has a core ${wide} clause and no ${narrow} clause.`
      : `In this crosswalk, ${only.length} of the ${c.counts.topics} topics ${only.length === 1 ? 'has' : 'have'} a core ${wide} clause and no ${narrow} clause mapped: ${only.join('; ')}.`;
  const touched =
    passing.length === 0
      ? ''
      : ` ${passing.join('; ')} ${passing.length === 1 ? 'is' : 'are'} touched only in passing: ${inSentence(wide)} files a related clause there, not a core one, and ${narrow} none.`;
  return {
    q,
    a: withNote(
      `${covered}${touched} A topic with no ${narrow} clause here is one this mapping does not reach, not one ${inSentence(narrow)} is shown to leave out. The overlap table on this page lists the clauses; mappings are illustrative, not a claim of conformity.`,
    ),
    ...sources,
  };
}

/** A source URL without its fragment, for de-duplication. */
const bare = (url: string): string => url.replace(/#.*$/, '');

/**
 * The primary sources the page rests on: each instrument's canonical URL
 * (frameworks.ts) and the distinct documents its clauses on this page
 * (crosswalk.ts refs) and its "At a glance" cells cite, labelled by instrument;
 * then the other documents the FAQ answers cite, under their own label.
 * Fragments dropped, each document once.
 */
export function comparisonSources(c: Comparison): { label: string; url: string }[] {
  const seen = new Set<string>();
  const out: { label: string; url: string }[] = [];
  const add = (label: string, url: string | undefined) => {
    if (!url) return;
    const key = bare(url);
    if (seen.has(key)) return;
    seen.add(key);
    out.push({ label, url: key });
  };
  for (const [fw, pick] of [
    [c.fa, (row: OverlapRow) => row.a],
    [c.fb, (row: OverlapRow) => row.b],
  ] as const) {
    add(fw.name, fw.url);
    for (const row of c.rows) for (const s of pick(row)) add(fw.name, s.ref.url);
  }
  const cited = [
    ...[c.fa, c.fb].flatMap((fw) => Object.values(glance[fw.id]?.sources ?? {}).flat()),
    ...[...c.def.faq, gapQuestion(c)].flatMap((item) => item.sources ?? []),
  ];
  for (const s of cited) add(s.doc ?? s.label, s.url);
  return out;
}
