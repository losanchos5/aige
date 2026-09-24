// obligations.ts: derived views over the obligation register (src/data/
// frameworks.ts) for the /obligations pages and the open-data API. Nothing here
// adds a fact: every value is a join between modules that already exist.
//
// - `obligationGroups` groups rows by the framework heading chapter 08 uses.
// - `crosswalkFor` joins a row to the topic crosswalk (src/data/crosswalk.ts)
//   through the crosswalk's own `obligation` field, then lists every other
//   clause filed under the same topics: the row's siblings in other frameworks.
// - `casesFor` lists the incident cases (src/data/cases.ts) whose obligation
//   list cites the same EU AI Act article as the row. The join is by article
//   number only, so it is offered as "cases that cite this article", nothing
//   stronger.
import {
  frameworks,
  obligations,
  obligationPath,
  type Framework,
  type Obligation,
} from '../data/frameworks';
import { patterns, type PatternDef } from '../data/patterns';
import { topics, refs, chipLabel, frameworkById, type CrosswalkRef, type Topic } from '../data/crosswalk';
import { cases, type IncidentCase } from '../data/cases';
import { slugify } from './md-parse';

export { obligationPath, obligationSlug } from '../data/frameworks';

/** Path of the per-row JSON in the static API. */
export function obligationApiPath(row: Pick<Obligation, 'id'>): string {
  return `/api/v1/obligations/${row.id.toLowerCase()}.json`;
}

/** The instrument a row belongs to (every frameworkId resolves; data.spec.ts checks it). */
export function frameworkOf(row: Obligation): Framework {
  const fw = frameworks.find((f) => f.id === row.frameworkId);
  if (!fw) throw new Error(`frameworks.ts: ${row.id} names unknown frameworkId "${row.frameworkId}"`);
  return fw;
}

export interface ObligationGroup {
  /** The framework heading, as chapter 08's tables group the rows. */
  framework: string;
  /** Anchor id for the group on /obligations. */
  anchor: string;
  rows: Obligation[];
}

/** Rows grouped by framework heading, in the order the register lists them. */
export function obligationGroups(): ObligationGroup[] {
  const groups: ObligationGroup[] = [];
  for (const row of obligations) {
    let group = groups.find((g) => g.framework === row.framework);
    if (!group) {
      group = { framework: row.framework, anchor: `group-${slugify(row.framework)}`, rows: [] };
      groups.push(group);
    }
    group.rows.push(row);
  }
  return groups;
}

/** The chapter-05 patterns a row lists, in catalogue order. */
export function patternsFor(row: Obligation): PatternDef[] {
  const wanted = new Set(row.patterns ?? []);
  return patterns.filter((pattern) => wanted.has(pattern.id));
}

/** The row whose exact obligation text a crosswalk ref joins to, if any. */
export function obligationByText(text: string): Obligation | undefined {
  return obligations.find((row) => row.obligation === text);
}

export interface CrosswalkSibling {
  ref: CrosswalkRef;
  /** Chip label as the crosswalk prints it (China refs carry a prefix). */
  label: string;
  /** Instrument name. */
  frameworkName: string;
  /** Path of the sibling's own obligation page, where it has a register row. */
  obligationPath?: string;
}

export interface CrosswalkTopic {
  topic: Topic;
  /** The row's own clause(s) under this topic. */
  own: CrosswalkRef[];
  /** Every other clause filed under the topic, core first. */
  siblings: CrosswalkSibling[];
}

/** The crosswalk topics a row is filed under, with its siblings in each. */
export function crosswalkFor(row: Obligation): CrosswalkTopic[] {
  const own = refs.filter((ref) => ref.obligation === row.obligation);
  const topicIds = [...new Set(own.map((ref) => ref.topic))];
  return topicIds.flatMap((topicId) => {
    const topic = topics.find((t) => t.id === topicId);
    if (!topic) return [];
    const siblings = refs
      .filter((ref) => ref.topic === topicId && ref.obligation !== row.obligation)
      .sort((a, b) => (a.strength === b.strength ? 0 : a.strength === 'core' ? -1 : 1))
      .map((ref) => {
        const target = ref.obligation ? obligationByText(ref.obligation) : undefined;
        return {
          ref,
          label: chipLabel(ref),
          frameworkName: frameworkById(ref.framework)?.short ?? ref.framework,
          ...(target ? { obligationPath: obligationPath(target) } : {}),
        };
      });
    return [{ topic, own: own.filter((ref) => ref.topic === topicId), siblings }];
  });
}

/** EU AI Act article numbers a clause label names: 'Art. 49 / Art. 71' -> ['49', '71']. */
export function euArticles(clause: string): string[] {
  return [...clause.matchAll(/Art\.\s*(\d+[a-z]?)/g)].map((m) => m[1]);
}

/** Incident cases whose obligation list cites the same EU AI Act article as the row. */
export function casesFor(row: Obligation): IncidentCase[] {
  if (row.frameworkId !== 'eu-ai-act') return [];
  const articles = new Set(euArticles(row.clause));
  return cases.filter((c) =>
    c.obligations.some(
      (o) => o.instrument === 'EU AI Act' && euArticles(o.ref).some((a) => articles.has(a)),
    ),
  );
}

/** Previous and next row in register order, for page-to-page navigation. */
export function neighbours(row: Obligation): { prev?: Obligation; next?: Obligation } {
  const i = obligations.findIndex((o) => o.id === row.id);
  return {
    prev: i > 0 ? obligations[i - 1] : undefined,
    next: i >= 0 && i < obligations.length - 1 ? obligations[i + 1] : undefined,
  };
}
