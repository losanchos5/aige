// reading-list.ts: the annotated bibliography, parsed at build time from
// bok/10-reading-list.md. Each H2 is a themed group; each bullet is an item
// with a title, a one-line note, a verified URL, a verification tag and two
// reader tags written in the chapter as `(audience: …; jurisdiction: …)`.
// The chapter is the canonical text (/bok/reading-list); /resources/reading-list
// renders the same items with a filter on the two tags.

import { readSource, splitSections, parseAnnotatedList } from './md-parse';

/** Who an entry serves best. The chapter's intro states the same vocabulary. */
export const AUDIENCES = ['engineering', 'governance', 'legal', 'leadership', 'research'] as const;
export type Audience = (typeof AUDIENCES)[number];

/** Display labels for the audiences, in filter order. */
export const audienceLabels: Readonly<Record<Audience, string>> = {
  engineering: 'Engineering',
  governance: 'Governance and risk',
  legal: 'Legal and privacy',
  leadership: 'Leadership',
  research: 'Research',
};

export interface ReadingItem {
  /** The source's title. */
  title: string;
  /** One-line note on why it matters. */
  note: string;
  /** The verified URL (always https:// in the source). */
  url?: string;
  /** Verification tag: `primary`, `secondary` or `reported`. */
  verified?: string;
  /** Audiences the entry serves best (from the chapter's tag). */
  audience: Audience[];
  /** Jurisdictions the entry speaks to, as written ("EU", "South Korea", "global"). */
  jurisdiction: string[];
}

export interface ReadingGroup {
  /** The theme heading (e.g. "Regulation and standards"). */
  group: string;
  /** The annotated sources under that theme. */
  items: ReadingItem[];
}

const SOURCE = 'bok/10-reading-list.md';
const TAGS = /\s*\(audience:\s*([^;)]+);\s*jurisdiction:\s*([^)]+)\)\s*/;

/** Filter value for a jurisdiction label: lower case, spaces to hyphens. */
export function jurisdictionKey(label: string): string {
  return label.trim().toLowerCase().replace(/\s+/g, '-');
}

function splitList(text: string): string[] {
  return text
    .split(',')
    .map((part) => part.trim())
    .filter((part) => part.length > 0);
}

function isAudience(value: string): value is Audience {
  return (AUDIENCES as readonly string[]).includes(value);
}

/** The reading list, grouped by theme, in source order. Empty groups (the
 * intro and the `## Sources` note, which carry no bullets) are dropped. */
export function getReadingList(): ReadingGroup[] {
  return splitSections(readSource(SOURCE), 2)
    .map((section) => ({
      group: section.heading,
      items: parseAnnotatedList(section.body).map((item): ReadingItem => {
        const tags = TAGS.exec(item.note);
        const audience = tags ? splitList(tags[1]).filter(isAudience) : [];
        const jurisdiction = tags ? splitList(tags[2]) : [];
        const note = item.note.replace(TAGS, ' ').replace(/\s*[.;]\s*$/, '').trim();
        return { ...item, note, audience, jurisdiction };
      }),
    }))
    .filter((group) => group.items.length > 0);
}

/** Every jurisdiction used in the list, "global" first, then by frequency
 * (ties alphabetical), each with its filter key and item count. */
export function readingJurisdictions(
  groups: ReadingGroup[],
): { label: string; key: string; count: number }[] {
  const counts = new Map<string, number>();
  for (const group of groups) {
    for (const item of group.items) {
      for (const label of item.jurisdiction) counts.set(label, (counts.get(label) ?? 0) + 1);
    }
  }
  return [...counts.entries()]
    .sort(([a, countA], [b, countB]) => {
      if (a === 'global') return -1;
      if (b === 'global') return 1;
      return countB - countA || a.localeCompare(b);
    })
    .map(([label, count]) => ({ label, key: jurisdictionKey(label), count }));
}
