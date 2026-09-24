// tool-anchors.ts: resolve the chapter sections a /toolkit tool links to. Given
// a chapter file and a map of key -> heading anchor (the id rehype-slug gives
// the heading), return key -> heading text, and fail the build when a heading
// has been renamed or removed, so a tool never ships a dead chapter link.
import { readSource, getHeadings, slugify } from './md-parse';

export function chapterAnchorTitles<K extends string>(
  chapterFile: string,
  anchors: Readonly<Record<K, string>>,
): Record<K, string> {
  const headings = new Map(
    getHeadings(readSource(chapterFile)).map((heading) => [slugify(heading.text), heading.text]),
  );
  const out = {} as Record<K, string>;
  for (const [key, anchor] of Object.entries(anchors) as [K, string][]) {
    const text = headings.get(anchor);
    if (!text) throw new Error(`${chapterFile} has no heading #${anchor} (needed by a toolkit page)`);
    out[key] = text;
  }
  return out;
}
