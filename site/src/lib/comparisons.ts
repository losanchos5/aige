// comparisons.ts: the derived half of the "<A> vs <B>" comparison pages
// (src/data/comparisons.ts holds the editorial half). Everything here is read
// from the crosswalk (src/data/crosswalk.ts) and the obligation register
// (src/data/frameworks.ts), so a page cannot say more, or other, than the
// matrix on /resources/crosswalk:
//
// - one overlap row per crosswalk topic that either instrument reaches, with
//   each side's clauses (core first), the register rows they join and an
//   overlap level;
// - the chapter-05 patterns that evidence a register row on BOTH sides of a
//   topic (a single artefact that serves the two instruments);
// - the counts the page states, a generated FAQ item, and the source URLs.
//
// Overlap levels, from the refs' own `strength`:
//   strong  both instruments file a core clause under the topic;
//   partial both file a clause, at least one only a related one;
//   a-only / b-only  one instrument files a clause, the other none.
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
import type { ComparisonDef, Qa } from '../data/comparisons';

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
  /** Patterns whose register rows sit on both sides of the topic, catalogue order. */
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

function patternIds(list: SideRef[]): Set<string> {
  return new Set(list.flatMap((s) => s.obligation?.patterns ?? []));
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
    const inA = patternIds(a);
    const inB = patternIds(b);
    const shared = patterns.filter((p) => inA.has(p.id) && inB.has(p.id));
    rows.push({ topic, a, b, level: levelOf(a, b), shared });
  }

  const count = (level: OverlapLevel) => rows.filter((row) => row.level === level).length;
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
      neither,
    },
  };
}

/** Human label of an overlap level for this pair. */
export function levelLabel(level: OverlapLevel, c: Pick<Comparison, 'def'>): string {
  switch (level) {
    case 'strong':
      return 'Strong';
    case 'partial':
      return 'Partial';
    case 'a-only':
      return `${c.def.aName} only`;
    case 'b-only':
      return `${c.def.bName} only`;
  }
}

/** A short name as it reads mid-sentence: "the EU AI Act", but "ISO 42001". */
export function inSentence(name: string): string {
  return name.startsWith('ISO') ? name : `the ${name}`;
}

/**
 * The FAQ item generated from the crosswalk: what the wider instrument covers
 * that the other does not (the side with more one-sided topics; B on a tie).
 */
export function gapQuestion(c: Comparison): Qa {
  const bSide = c.counts.bOnly >= c.counts.aOnly;
  const [wide, narrow] = bSide ? [c.def.bName, c.def.aName] : [c.def.aName, c.def.bName];
  const level: OverlapLevel = bSide ? 'b-only' : 'a-only';
  const only = c.rows.filter((row) => row.level === level).map((row) => row.topic.name);
  const q = `What does ${inSentence(wide)} cover that ${inSentence(narrow)} does not?`;
  if (only.length === 0) {
    return {
      q,
      a: `In this crosswalk, every topic ${inSentence(wide)} reaches also has a ${narrow} clause. A shared topic means the two deal with the same thing, not that meeting one meets the other.`,
    };
  }
  const verb = only.length === 1 ? 'has' : 'have';
  return {
    q,
    a: `In this crosswalk, ${only.length} of the ${c.counts.topics} topics ${verb} ${wide} clauses and no ${narrow} clause: ${only.join('; ')}. The overlap table on this page lists the clauses; mappings are illustrative, not a claim of conformity.`,
  };
}

/** A source URL without its fragment, for de-duplication. */
const bare = (url: string): string => url.replace(/#.*$/, '');

/**
 * The primary sources the page rests on: each instrument's canonical URL
 * (frameworks.ts) and the distinct documents its clauses on this page cite
 * (crosswalk.ts refs), fragments dropped. Labelled by instrument.
 */
export function comparisonSources(c: Comparison): { label: string; url: string }[] {
  const seen = new Set<string>();
  const out: { label: string; url: string }[] = [];
  for (const [fw, pick] of [
    [c.fa, (row: OverlapRow) => row.a],
    [c.fb, (row: OverlapRow) => row.b],
  ] as const) {
    const urls = [fw.url, ...c.rows.flatMap((row) => pick(row).map((s) => s.ref.url))];
    for (const url of urls) {
      if (!url) continue;
      const key = bare(url);
      if (seen.has(key)) continue;
      seen.add(key);
      out.push({ label: fw.name, url: key });
    }
  }
  return out;
}
