// research-pages.ts: the research note pages (/research and /research/<slug>)
// read the `research` content collection (research/<slug>.md at the repo root)
// through this module, which fails the build when a note and the registers it
// names drift apart:
//
//   - the note file (typed frontmatter + "# <title>" + "## Sources");
//   - its theme in src/data/research.ts (slug, title, status `written`);
//   - the people, controls and patterns its frontmatter names.
//
// It also checks the note's citations the way rehype-citations renders them
// (citationProblems, shared with the pattern pages), and that nothing is shown
// as published before a named reviewer has reviewed it.

import { getCollection, type CollectionEntry } from 'astro:content';
import { controlById } from '../data/controls';
import { getPatternBySlug } from '../data/patterns';
import { personById } from '../data/people';
import { writtenThemes, type ResearchTheme } from '../data/research';
import { citationProblems } from './pattern-pages';

export type ResearchEntry = CollectionEntry<'research'>;

export interface ResearchPage {
  entry: ResearchEntry;
  theme: ResearchTheme;
}

/** The source URLs listed under "## Sources", in order, for a `citation` list. */
export function researchCitations(body: string): string[] {
  const sources = body.split(/^## Sources\s*$/m)[1] ?? '';
  return [...sources.matchAll(/(https?:\/\/\S+) \(verified:/g)].map((match) => match[1]);
}

let cache: ResearchPage[] | undefined;

/**
 * Every written research note in register order, validated against
 * data/research.ts, data/people.ts, the control registry and data/patterns.ts.
 * Throws a build error that names each mismatch.
 */
export async function loadResearchPages(): Promise<ResearchPage[]> {
  if (cache) return cache;
  const entries = await getCollection('research');
  const errors: string[] = [];
  const bySlug = new Map(entries.map((entry) => [entry.id, entry]));
  const themes = writtenThemes();

  const fileSlugs = [...bySlug.keys()].sort();
  const themeSlugs = themes.map((theme) => theme.slug).sort();
  if (fileSlugs.join(',') !== themeSlugs.join(',')) {
    errors.push(
      `research/ and the written themes of data/research.ts differ.\n  files: ${fileSlugs.join(', ')}\n  written: ${themeSlugs.join(', ')}`,
    );
  }

  const pages: ResearchPage[] = [];
  for (const theme of themes) {
    const entry = bySlug.get(theme.slug);
    if (!entry) continue;
    const where = `research/${theme.slug}.md`;
    const data = entry.data;
    const body = entry.body ?? '';
    if (data.id !== entry.id) errors.push(`${where}: frontmatter id "${data.id}" is not the file name`);
    if (data.title !== theme.title) errors.push(`${where}: title "${data.title}" vs research.ts "${theme.title}"`);
    const h1 = /^#\s+(.+?)\s*$/m.exec(body)?.[1];
    if (h1 !== data.title) errors.push(`${where}: H1 must be "# ${data.title}"`);
    for (const id of data.authors) {
      if (!personById(id)) errors.push(`${where}: unknown author "${id}"`);
    }
    for (const id of data.reviewers) {
      if (!personById(id)) errors.push(`${where}: unknown reviewer "${id}"`);
    }
    if (data.status === 'published' && data.reviewers.length === 0) {
      errors.push(`${where}: status "published" needs at least one named reviewer`);
    }
    for (const id of data.relatedControls) {
      if (!controlById(id)) errors.push(`${where}: unknown control "${id}"`);
    }
    for (const slug of data.relatedPatterns) {
      if (!getPatternBySlug(slug)) errors.push(`${where}: unknown pattern "${slug}"`);
    }
    if (data.updated !== undefined && data.updated < data.date) {
      errors.push(`${where}: updated ${data.updated} is before date ${data.date}`);
    }
    for (const problem of citationProblems(body)) errors.push(`${where}: ${problem}`);
    pages.push({ entry, theme });
  }

  if (errors.length > 0) {
    throw new Error(`research notes out of sync:\n  - ${errors.join('\n  - ')}`);
  }
  cache = pages;
  return pages;
}
