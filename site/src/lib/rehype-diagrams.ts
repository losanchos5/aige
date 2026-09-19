// rehype-diagrams: at build, insert the interactive diagram figures declared in
// src/data/diagrams.ts AND the hand-made conceptual infographics declared in
// src/data/figures.ts into the Body of Knowledge chapters. The markdown file is
// mapped to its chapter slug from the vfile path (basename `NN-slug.md` ->
// chapters.ts id -> slug); for each placement the plugin resolves the anchor by
// matching heading TEXT (normalised) and inserts the figure hast at the point
// named by `at`:
//   - 'lead' — before the chapter's first H2 (an opening figure after the intro);
//   - 'head' — immediately after the anchor heading (the H2 `section`, or the H3
//     `sub` inside it when given);
//   - 'foot' (default) — before the next heading of depth ≤ the anchor, i.e. at
//     the foot of that (sub)section.
// Matching on text (not the slug id) avoids github-slugger's `-1`/`-2` dedup
// suffixes; rehype-autolink-headings wraps heading text in an <a>, so nodeText
// gathers it recursively.
//
// A placement whose heading cannot be found is a build error (better than a
// silently missing figure). A diagram not yet in the generated manifest, or an
// infographic whose src/figures/<id>.svg has not been authored/generated yet, is
// skipped, so the build does not depend on every figure existing at once.

import type { Root, RootContent, ElementContent } from 'hast';
import type { VFile } from 'vfile';
import { existsSync, readFileSync } from 'node:fs';
import { resolve } from 'node:path';
import { fromHtml } from 'hast-util-from-html';
import { getChapter } from '../data/chapters';
import { diagramsForChapter, type DiagramPlacement } from '../data/diagrams';
import { figuresForChapter, type FigureDef } from '../data/figures';
import { diagramIds, renderDiagramFigure } from './diagrams';

// The hand-made infographic SVGs live under site/src/figures, resolved from the
// build cwd (the site directory) like the generated diagram SVGs.
const FIGURES_DIR = resolve(process.cwd(), 'src/figures');

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

function escapeHtml(value: string): string {
  return value.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
}

/**
 * The <figure> HTML for a conceptual infographic: the self-contained inline SVG
 * (which carries its own role/aria/<title>/<desc>) in a framed canvas, the
 * two-sentence figcaption, and a <details> text alternative in the chapter's
 * words. Returns '' when the SVG has not been authored/generated yet, so the
 * build tolerates a figure whose art is not on disk.
 */
function renderFigureFigure(def: FigureDef): string {
  const svgPath = resolve(FIGURES_DIR, `${def.id}.svg`);
  if (!existsSync(svgPath)) return '';
  const svg = readFileSync(svgPath, 'utf8').trim();
  return (
    `<figure class="figure figure--infographic" data-figure="${def.id}">` +
    `<div class="figure-canvas">${svg}</div>` +
    `<figcaption class="figure-figcaption">` +
    `<span class="figure-fig-title">${escapeHtml(def.title)}</span>` +
    `<span class="figure-fig-desc">${escapeHtml(def.caption)}</span>` +
    `</figcaption>` +
    `<details class="figure-alt">` +
    `<summary class="figure-alt-summary">Text description</summary>` +
    `<p>${escapeHtml(def.description)}</p>` +
    `</details>` +
    `</figure>`
  );
}

/**
 * Splice a rendered figure fragment into `tree` at `placement`. `label` names the
 * figure in build errors. Shared by the diagram and infographic passes.
 */
function insertFragment(
  tree: Root,
  fragmentHtml: string,
  placement: DiagramPlacement,
  label: string,
): void {
  const children = tree.children;
  const at = placement.at ?? 'foot';
  const fragment = fromHtml(fragmentHtml, { fragment: true });

  // 'lead': open the chapter with the figure, just before its first H2 (after
  // whatever intro prose precedes the first section).
  if (at === 'lead') {
    let firstH2 = -1;
    for (let i = 0; i < children.length; i += 1) {
      if (headingDepth(children[i]) === 2) {
        firstH2 = i;
        break;
      }
    }
    if (firstH2 < 0) {
      throw new Error(
        `rehype-diagrams: no H2 heading found in chapter "${placement.chapter}" for lead figure "${label}".`,
      );
    }
    children.splice(firstH2, 0, ...fragment.children);
    return;
  }

  // 'head'/'foot' both anchor on the H2 `section` (and optional H3 `sub`).
  if (!placement.section) {
    throw new Error(
      `rehype-diagrams: placement for figure "${label}" in chapter "${placement.chapter}" needs a "section" for at="${at}".`,
    );
  }
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
      `rehype-diagrams: heading "${placement.section}" not found in chapter "${placement.chapter}" for figure "${label}".`,
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
        `rehype-diagrams: sub-heading "${placement.sub}" not found under "${placement.section}" in chapter "${placement.chapter}" for figure "${label}".`,
      );
    }
    targetIndex = found;
  }

  // 'head': immediately after the anchor heading.
  if (at === 'head') {
    children.splice(targetIndex + 1, 0, ...fragment.children);
    return;
  }

  // 'foot': before the next heading of depth ≤ the target — i.e. the foot of the
  // (sub)section — or at the end of the document when there is none.
  let insertAt = children.length;
  for (let i = targetIndex + 1; i < children.length; i += 1) {
    const depth = headingDepth(children[i]);
    if (depth !== null && depth <= targetDepth) {
      insertAt = i;
      break;
    }
  }

  children.splice(insertAt, 0, ...fragment.children);
}

export default function rehypeDiagrams() {
  return (tree: Root, file: VFile): void => {
    const slug = chapterSlugForFile(file);
    if (!slug) return;

    // Pass 1: interactive archify diagrams.
    const defs = diagramsForChapter(slug);
    const available = new Set(diagramIds());
    for (const def of defs) {
      // Skip diagrams whose IR has not been built into an SVG yet.
      if (!available.has(def.id)) continue;
      for (const placement of def.placements) {
        if (placement.chapter !== slug) continue;
        insertFragment(tree, renderDiagramFigure(def.id), placement, def.id);
      }
    }

    // Pass 2: hand-made conceptual infographics.
    for (const figure of figuresForChapter(slug)) {
      const html = renderFigureFigure(figure);
      if (!html) continue; // SVG not authored/generated yet
      for (const placement of figure.placements) {
        if (placement.chapter !== slug) continue;
        insertFragment(tree, html, placement, figure.id);
      }
    }
  };
}
