// rehype-diagrams: at build, insert the interactive diagram figures declared in
// src/data/diagrams.ts into the Body of Knowledge chapters. The markdown file is
// mapped to its chapter slug from the vfile path (basename `NN-slug.md` ->
// chapters.ts id -> slug); for each placement the plugin finds the heading whose
// `id` is slugify(section) (and, when a `sub` is given, the H3 inside that
// section whose id is slugify(sub)), then walks to the next heading of depth ≤
// the target and inserts the figure hast there — i.e. at the foot of that
// (sub)section. rehype-autolink-headings wraps heading text in an <a>, but the
// `id` stays on the <h2>/<h3>, so the lookup is unaffected.
//
// A placement whose heading cannot be found is a build error (better than a
// silently missing figure). A diagram that is not yet in the generated manifest
// (its IR is still being authored) is skipped, so the build does not depend on
// every diagram existing at once.

import type { Root, RootContent, ElementContent } from 'hast';
import type { VFile } from 'vfile';
import { fromHtml } from 'hast-util-from-html';
import { getChapter } from '../data/chapters';
import { diagramsForChapter, type DiagramDef, type DiagramPlacement } from '../data/diagrams';
import { diagramIds, renderDiagramFigure } from './diagrams';

/** Heading depth (1-6) for a top-level node, or null when it is not a heading. */
function headingDepth(node: RootContent): number | null {
  if (node.type !== 'element') return null;
  const match = /^h([1-6])$/.exec(node.tagName);
  return match ? Number(match[1]) : null;
}

/**
 * Concatenated, whitespace-normalised text of a heading. rehype-autolink-headings
 * ('wrap') nests the text in an <a>, so gather it recursively. Matching on text
 * (not the slug id) avoids github-slugger's `-1`/`-2` dedup suffixes, which the
 * many repeated "Solution" headings in the patterns chapter would otherwise hit.
 */
function nodeText(node: RootContent): string {
  let out = '';
  const walk = (current: RootContent | ElementContent): void => {
    if (current.type === 'text') {
      out += current.value;
      return;
    }
    if ('children' in current && current.children) current.children.forEach(walk);
  };
  walk(node);
  return out.replace(/\s+/g, ' ').trim();
}

/** The chapter slug for the markdown file being processed, if it is a chapter. */
function chapterSlugForFile(file: VFile | undefined): string | undefined {
  const path =
    file?.path ??
    (Array.isArray(file?.history) && file.history.length > 0
      ? file.history[file.history.length - 1]
      : undefined);
  if (!path) return undefined;
  const base = path.split(/[\\/]/).pop() ?? '';
  const id = base.replace(/\.[^.]+$/, '');
  return getChapter(id)?.slug;
}

function insertFigure(tree: Root, def: DiagramDef, placement: DiagramPlacement): void {
  const children = tree.children;
  const wantSection = placement.section.replace(/\s+/g, ' ').trim();

  let sectionIndex = -1;
  let sectionDepth = -1;
  for (let i = 0; i < children.length; i += 1) {
    const depth = headingDepth(children[i]);
    if (depth !== null && nodeText(children[i]) === wantSection) {
      sectionIndex = i;
      sectionDepth = depth;
      break;
    }
  }
  if (sectionIndex < 0) {
    throw new Error(
      `rehype-diagrams: heading "${placement.section}" not found in chapter "${placement.chapter}" for diagram "${def.id}".`,
    );
  }

  let targetIndex = sectionIndex;
  let targetDepth = sectionDepth;

  if (placement.sub) {
    const wantSub = placement.sub.replace(/\s+/g, ' ').trim();
    let found = -1;
    for (let i = sectionIndex + 1; i < children.length; i += 1) {
      const depth = headingDepth(children[i]);
      if (depth !== null && depth <= sectionDepth) break; // left the section
      if (depth !== null && nodeText(children[i]) === wantSub) {
        found = i;
        targetDepth = depth;
        break;
      }
    }
    if (found < 0) {
      throw new Error(
        `rehype-diagrams: sub-heading "${placement.sub}" not found under "${placement.section}" in chapter "${placement.chapter}" for diagram "${def.id}".`,
      );
    }
    targetIndex = found;
  }

  // Insert before the next heading of depth ≤ the target — i.e. the foot of the
  // (sub)section — or at the end of the document when there is none.
  let insertAt = children.length;
  for (let i = targetIndex + 1; i < children.length; i += 1) {
    const depth = headingDepth(children[i]);
    if (depth !== null && depth <= targetDepth) {
      insertAt = i;
      break;
    }
  }

  const fragment = fromHtml(renderDiagramFigure(def.id), { fragment: true });
  children.splice(insertAt, 0, ...fragment.children);
}

export default function rehypeDiagrams() {
  return (tree: Root, file: VFile): void => {
    const slug = chapterSlugForFile(file);
    if (!slug) return;

    const defs = diagramsForChapter(slug);
    if (!defs.length) return;

    const available = new Set(diagramIds());
    for (const def of defs) {
      // Skip diagrams whose IR has not been built into an SVG yet.
      if (!available.has(def.id)) continue;
      for (const placement of def.placements) {
        if (placement.chapter !== slug) continue;
        insertFigure(tree, def, placement);
      }
    }
  };
}
