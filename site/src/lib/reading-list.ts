// reading-list.ts: the annotated bibliography, parsed at build time from
// bok/10-reading-list.md. Each H2 is a themed group; each bullet is an item
// with a title, a one-line note, a verified URL and a verification tag.

import { readSource, splitSections, parseAnnotatedList } from './md-parse';

export interface ReadingItem {
  /** The source's title. */
  title: string;
  /** One-line note on why it matters. */
  note: string;
  /** The verified URL (always https:// in the source). */
  url?: string;
  /** Verification tag: `primary`, `secondary` or `reported`. */
  verified?: string;
}

export interface ReadingGroup {
  /** The theme heading (e.g. "Regulation and standards"). */
  group: string;
  /** The annotated sources under that theme. */
  items: ReadingItem[];
}

const SOURCE = 'bok/10-reading-list.md';

/** The reading list, grouped by theme, in source order. Empty groups (the
 * intro and the `## Sources` note, which carry no bullets) are dropped. */
export function getReadingList(): ReadingGroup[] {
  return splitSections(readSource(SOURCE), 2)
    .map((section) => ({
      group: section.heading,
      items: parseAnnotatedList(section.body),
    }))
    .filter((group) => group.items.length > 0);
}
