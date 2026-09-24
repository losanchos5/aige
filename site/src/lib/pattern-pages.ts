// pattern-pages.ts: the pattern pages (/patterns and /patterns/<slug>) read the
// `patterns` content collection (bok/patterns/<slug>.md) through this module,
// which fails the build when the three places a pattern lives drift apart:
//
//   - the pattern file (typed frontmatter + "# Pattern: <title>" + "## Sources");
//   - its entry in src/data/patterns.ts (slug, title, layers, catalogue order);
//   - its "## Pattern: <title>" section in the chapter 05 catalogue
//     (bok/05-patterns.md), which must link to /patterns/<slug>.
//
// It also checks each file's citations the way rehype-citations renders them:
// every inline [n] needs a "[n]" row under "## Sources", the rows run 1..N with
// no gap, and every row is cited at least once.

import { getCollection, type CollectionEntry } from 'astro:content';
import { patterns, type PatternDef } from '../data/patterns';
import { readSource } from './md-parse';

export type PatternEntry = CollectionEntry<'patterns'>;

export interface PatternPage {
  entry: PatternEntry;
  def: PatternDef;
}

/** The prose part of a Markdown body (before "## Sources"), without code. */
function proseOf(body: string): string {
  const [prose] = body.split(/^## Sources\s*$/m);
  return prose
    .replace(/^```[\s\S]*?^```/gm, '') // fenced code
    .replace(/`[^`\n]*`/g, ''); // inline code
}

/** The source rows under "## Sources": the leading [n] of each line. */
function sourceNumbers(body: string): number[] {
  const parts = body.split(/^## Sources\s*$/m);
  if (parts.length < 2) return [];
  return parts[1]
    .split(/\r?\n/)
    .map((line) => /^\[(\d+)\]\s/.exec(line))
    .filter((match): match is RegExpExecArray => match !== null)
    .map((match) => Number(match[1]));
}

/** Problems with one pattern file's citations; empty when they resolve. */
export function citationProblems(body: string): string[] {
  const problems: string[] = [];
  const rows = sourceNumbers(body);
  if (rows.length === 0) problems.push('no "## Sources" list');
  rows.forEach((n, i) => {
    if (n !== i + 1) problems.push(`source row ${i + 1} is numbered [${n}]`);
  });
  const cited = new Set<number>();
  for (const match of proseOf(body).matchAll(/\[(\d+)\]/g)) cited.add(Number(match[1]));
  for (const n of cited) {
    if (!rows.includes(n)) problems.push(`cites [${n}] but has no source row [${n}]`);
  }
  for (const n of rows) {
    if (!cited.has(n)) problems.push(`source [${n}] is never cited`);
  }
  return problems;
}

/** The "Layer NN" tokens on the "**Maps to:**" line, in order. */
function mapsToLayers(body: string): number[] {
  const match = /^\*\*Maps to:\*\*([\s\S]*?)(?:\n\s*\n|(?![\s\S]))/m.exec(body);
  if (!match) return [];
  return [...match[1].matchAll(/Layer\s+(\d{2})/g)].map((m) => Number(m[1]));
}

let cache: PatternPage[] | undefined;

/**
 * Every pattern page in catalogue order, validated against data/patterns.ts and
 * the chapter 05 catalogue. Throws a build error that names each mismatch.
 */
export async function loadPatternPages(): Promise<PatternPage[]> {
  if (cache) return cache;
  const entries = await getCollection('patterns');
  const errors: string[] = [];
  const bySlug = new Map(entries.map((entry) => [entry.id, entry]));

  const fileSlugs = [...bySlug.keys()].sort();
  const defSlugs = patterns.map((p) => p.slug).sort();
  if (fileSlugs.join(',') !== defSlugs.join(',')) {
    errors.push(
      `bok/patterns and data/patterns.ts list different patterns.\n  files: ${fileSlugs.join(', ')}\n  index: ${defSlugs.join(', ')}`,
    );
  }

  const catalogue = readSource('bok/05-patterns.md');
  const pages: PatternPage[] = [];
  patterns.forEach((def, index) => {
    const entry = bySlug.get(def.slug);
    if (!entry) return;
    const where = `bok/patterns/${def.slug}.md`;
    const data = entry.data;
    const body = entry.body ?? '';
    if (data.id !== entry.id) errors.push(`${where}: frontmatter id "${data.id}" is not the file name`);
    if (data.title !== def.title) errors.push(`${where}: title "${data.title}" vs patterns.ts "${def.title}"`);
    if (data.layer !== def.layer) errors.push(`${where}: layer ${data.layer} vs patterns.ts ${def.layer}`);
    if (data.secondaryLayer !== def.secondaryLayer) {
      errors.push(`${where}: secondaryLayer ${data.secondaryLayer} vs patterns.ts ${def.secondaryLayer}`);
    }
    if (data.order !== index + 1) {
      errors.push(`${where}: order ${data.order}, but it is entry ${index + 1} in patterns.ts`);
    }
    const h1 = /^#\s+(.+?)\s*$/m.exec(body)?.[1];
    if (h1 !== `Pattern: ${def.title}`) errors.push(`${where}: H1 must be "# Pattern: ${def.title}"`);
    const layers = mapsToLayers(body);
    const expected = def.secondaryLayer ? [def.layer, def.secondaryLayer] : [def.layer];
    if (layers.join(',') !== expected.join(',')) {
      errors.push(`${where}: "Maps to:" names Layer ${layers.join('/')} but the frontmatter says ${expected.join('/')}`);
    }
    for (const problem of citationProblems(body)) errors.push(`${where}: ${problem}`);

    // The catalogue keeps the published anchor and links to the page.
    const section = catalogue.split(/^## /m).find((s) => s.startsWith(`Pattern: ${def.title}\n`));
    if (!section) {
      errors.push(`bok/05-patterns.md: no "## Pattern: ${def.title}" section`);
    } else if (!section.includes(`](/patterns/${def.slug})`)) {
      errors.push(`bok/05-patterns.md: "## Pattern: ${def.title}" does not link to /patterns/${def.slug}`);
    }
    pages.push({ entry, def });
  });

  if (errors.length > 0) {
    throw new Error(`pattern pages out of sync:\n  - ${errors.join('\n  - ')}`);
  }
  cache = pages;
  return pages;
}
