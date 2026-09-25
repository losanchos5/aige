// rehype-diagrams: at build, insert the interactive diagram figures declared in
// src/data/diagrams.ts AND the hand-made conceptual infographics declared in
// src/data/figures.ts into the Body of Knowledge chapters and the pattern pages.
// The markdown file is mapped to its target from the vfile path: a chapter
// (basename `NN-slug.md` -> chapters.ts id -> slug) takes the placements whose
// `chapter` is that slug and that name no `pattern`; a pattern file
// (`bok/patterns/<slug>.md`) takes the placements whose `pattern` is its slug.
// For each placement the plugin resolves the anchor by matching heading TEXT
// (normalised) and inserts the figure hast at the point named by `at`:
//   - 'lead': before the chapter's first H2 (an opening figure after the intro);
//   - 'head': immediately after the anchor heading (the H2 `section`, or the H3
//     `sub` inside it when given);
//   - 'foot' (default): before the next heading of depth ≤ the anchor, i.e. at
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
import {
  diagramsForChapter,
  diagramsForPattern,
  type DiagramPlacement,
} from '../data/diagrams';
import { figures, figuresForChapter, type FigureDef } from '../data/figures';
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

/** Where a markdown file renders: a chapter slug or a pattern page slug. */
type Target = { kind: 'chapter'; slug: string } | { kind: 'pattern'; slug: string };

/** The chapter or pattern page the markdown file being processed belongs to. */
function targetForFile(file: VFile | undefined): Target | undefined {
  const path =
    file?.path ??
    (Array.isArray(file?.history) && file.history.length > 0
      ? file.history[file.history.length - 1]
      : undefined);
  if (!path) return undefined;
  const segments = path.split(/[\\/]/);
  const base = segments.pop() ?? '';
  const id = base.replace(/\.[^.]+$/, '');
  // bok/patterns/<slug>.md: one pattern of the chapter 05 catalogue.
  if (segments.at(-1) === 'patterns' && segments.at(-2) === 'bok') {
    return { kind: 'pattern', slug: id };
  }
  const chapterSlug = getChapter(id)?.slug;
  return chapterSlug ? { kind: 'chapter', slug: chapterSlug } : undefined;
}

/** True when `placement` lands in the file rendered for `target`. */
function placedIn(placement: DiagramPlacement, target: Target): boolean {
  return target.kind === 'pattern'
    ? placement.pattern === target.slug
    : placement.pattern === undefined && placement.chapter === target.slug;
}

/** "chapter <slug>" or "pattern <slug>", for build errors. */
function where(placement: DiagramPlacement): string {
  return placement.pattern !== undefined
    ? `pattern "${placement.pattern}"`
    : `chapter "${placement.chapter}"`;
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
  // Optional wide variant (src/figures/<id>-wide.svg, e.g. values-principles in
  // two columns): both SVGs are inlined and figures.css shows exactly one, so
  // the hidden one never reaches the accessibility tree. A poster (kind
  // 'poster') keeps a legible width: it fills the well and, on a narrow screen,
  // scrolls sideways inside a focusable, labelled region (see figures.css).
  const poster = def.kind === 'poster';
  const widePath = resolve(FIGURES_DIR, `${def.id}-wide.svg`);
  const wide = !poster && existsSync(widePath) ? readFileSync(widePath, 'utf8').trim() : '';
  const canvas = poster
    ? `<div class="figure-canvas figure-canvas--poster" tabindex="0" role="region" ` +
      `aria-label="${escapeHtml(def.title).replace(/"/g, '&quot;')}: poster, scroll sideways on a narrow screen">${svg}</div>`
    : wide
      ? `<div class="figure-canvas figure-canvas--dual">${svg}${wide}</div>`
      : `<div class="figure-canvas">${svg}</div>`;
  // id="figure-<id>" is the deep link the figure's permalink page uses for
  // "Where it appears"; the caption links that page (downloads, citation). A
  // poster's link also carries figure-poster-link: it is the way to the full
  // size, which figures-posters.spec checks.
  const permalinkText = poster
    ? 'Full-size poster, downloads and citation'
    : 'Permalink, downloads and citation';
  return (
    `<figure class="figure figure--infographic${poster ? ' figure--poster' : ''}" id="figure-${def.id}" data-figure="${def.id}">` +
    canvas +
    `<figcaption class="figure-figcaption">` +
    `<span class="figure-fig-title">${escapeHtml(def.title)}</span>` +
    `<span class="figure-fig-desc">${escapeHtml(def.caption)}</span>` +
    `<a class="figure-permalink${poster ? ' figure-poster-link' : ''}" href="/figures/${def.id}">${permalinkText}</a>` +
    `</figcaption>` +
    `<details class="figure-alt">` +
    `<summary class="figure-alt-summary" data-pagefind-ignore>Text description</summary>` +
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
        `rehype-diagrams: no H2 heading found in ${where(placement)} for lead figure "${label}".`,
      );
    }
    children.splice(firstH2, 0, ...fragment.children);
    return;
  }

  // 'head'/'foot' both anchor on the H2 `section` (and optional H3 `sub`).
  if (!placement.section) {
    throw new Error(
      `rehype-diagrams: placement for figure "${label}" in ${where(placement)} needs a "section" for at="${at}".`,
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
      `rehype-diagrams: heading "${placement.section}" not found in ${where(placement)} for figure "${label}".`,
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
        `rehype-diagrams: sub-heading "${placement.sub}" not found under "${placement.section}" in ${where(placement)} for figure "${label}".`,
      );
    }
    targetIndex = found;
  }

  // 'head': immediately after the anchor heading.
  if (at === 'head') {
    children.splice(targetIndex + 1, 0, ...fragment.children);
    return;
  }

  // 'foot': before the next heading of depth ≤ the target, i.e. the foot of the
  // (sub)section, or at the end of the document when there is none.
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
    const target = targetForFile(file);
    if (!target) return;

    // Pass 1: interactive archify diagrams.
    const defs =
      target.kind === 'pattern' ? diagramsForPattern(target.slug) : diagramsForChapter(target.slug);
    const available = new Set(diagramIds());
    for (const def of defs) {
      // Skip diagrams whose IR has not been built into an SVG yet.
      if (!available.has(def.id)) continue;
      for (const placement of def.placements) {
        if (!placedIn(placement, target)) continue;
        insertFragment(tree, renderDiagramFigure(def.id), placement, def.id);
      }
    }

    // Pass 2: hand-made conceptual infographics.
    const infographics =
      target.kind === 'pattern'
        ? figures.filter((figure) => figure.placements.some((p) => p.pattern === target.slug))
        : figuresForChapter(target.slug);
    for (const figure of infographics) {
      const html = renderFigureFigure(figure);
      if (!html) continue; // SVG not authored/generated yet
      for (const placement of figure.placements) {
        if (!placedIn(placement, target)) continue;
        insertFragment(tree, html, placement, figure.id);
      }
    }
  };
}
