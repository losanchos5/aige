// map-index.ts: build the per-branch "content by cluster" index that sits under
// the map on /map: the textual, JavaScript-free alternative to the SVG. For
// each of the eight branches it groups everything the site says about that
// branch: the map's own tree as links, the chapter's H2 sections, the diagrams
// and figures placed in those chapters, the learning-path nodes that reach into
// them, and the section pages. This module is Astro-side only (it uses the
// slugger); the map data itself stays pure in src/data/map.ts.

import type { MapBranch, MapBranchId, MapDef, MapNode } from '../data/map';
import type { Heading } from './md-parse';
import { slugify } from './md-parse';
import type { DiagramDef } from '../data/diagrams';
import type { FigureDef } from '../data/figures';
import type { PathNode, PathStage } from '../data/path';

/** One link in a group, optionally carrying a small meta note (depth, stage…). */
export interface IndexItem {
  label: string;
  href: string;
  meta?: string;
}

/** A titled group of links within a branch. */
export interface IndexGroup {
  heading: string;
  items: IndexItem[];
}

/** The full index for one branch. */
export interface BranchIndex {
  branch: MapBranchId;
  label: string;
  color: MapBranch['color'];
  chapters: string[];
  groups: IndexGroup[];
}

/** The data the caller supplies (each loaded on the Astro side). */
export interface ClusterIndexContext {
  /** Headings of each chapter this map touches, keyed by chapter slug. */
  headings: Record<string, readonly Heading[]>;
  diagrams: readonly DiagramDef[];
  figures: readonly FigureDef[];
  nodes: readonly PathNode[];
  stages: readonly PathStage[];
}

/** Flatten a branch's leaves (and their children) into indented links. */
function walkTree(nodes: readonly MapNode[], depth: number, out: IndexItem[]): void {
  for (const node of nodes) {
    out.push({ label: node.label, href: node.href, meta: `L${depth}` });
    if (node.children && node.children.length > 0) {
      walkTree(node.children, depth + 1, out);
    }
  }
}

/** True when an href points into any of the given chapter slugs. */
function hrefInChapters(href: string, chapters: readonly string[]): boolean {
  return chapters.some(
    (slug) => href === `/bok/${slug}` || href.startsWith(`/bok/${slug}#`),
  );
}

/** Diagrams and figures with at least one placement in the branch's chapters. */
function drawnHere(
  ctx: ClusterIndexContext,
  chapters: readonly string[],
): IndexItem[] {
  const items: IndexItem[] = [];
  const seen = new Set<string>();
  const collect = (entries: readonly { id: string; title: string; placements: readonly { chapter: string }[] }[]) => {
    for (const entry of entries) {
      const placement = entry.placements.find((p) => chapters.includes(p.chapter));
      if (!placement || seen.has(entry.id)) continue;
      seen.add(entry.id);
      items.push({ label: entry.title, href: `/bok/${placement.chapter}` });
    }
  };
  collect(ctx.diagrams);
  collect(ctx.figures);
  return items;
}

/** Learning-path nodes relevant to a branch (all, by stage, for the path branch). */
function pathNodes(
  branch: MapBranch,
  ctx: ClusterIndexContext,
): IndexItem[] {
  if (branch.id === 'path') {
    const byStage = (stage: PathStage): IndexItem[] =>
      ctx.nodes
        .filter((n) => n.stage === stage.id)
        .map((n) => ({ label: n.title, href: `/path#node-${n.id}`, meta: stage.title }));
    return ctx.stages.flatMap(byStage);
  }
  return ctx.nodes
    .filter((n) => n.links.some((l) => hrefInChapters(l.href, branch.chapters)))
    .map((n) => ({ label: n.title, href: `/path#node-${n.id}` }));
}

/** H2 sections of the branch's chapters, excluding the "Sources" back matter. */
function chapterSections(
  branch: MapBranch,
  ctx: ClusterIndexContext,
): IndexItem[] {
  const items: IndexItem[] = [];
  for (const slug of branch.chapters) {
    const headings = ctx.headings[slug] ?? [];
    for (const heading of headings) {
      if (heading.depth !== 2 || heading.text === 'Sources') continue;
      items.push({ label: heading.text, href: `/bok/${slug}#${slugify(heading.text)}` });
    }
  }
  return items;
}

/**
 * Build the index for every branch. Only non-empty groups are returned, so the
 * page can assume each group it renders has links.
 */
export function buildClusterIndex(
  map: MapDef,
  ctx: ClusterIndexContext,
): BranchIndex[] {
  return map.branches.map((branch) => {
    const inMap: IndexItem[] = [];
    walkTree(branch.leaves, 2, inMap);

    const groups: IndexGroup[] = [
      { heading: 'In the map', items: inMap },
      { heading: 'Chapter sections', items: chapterSections(branch, ctx) },
      { heading: 'Diagrams and figures', items: drawnHere(ctx, branch.chapters) },
      { heading: 'Learning-path nodes', items: pathNodes(branch, ctx) },
      { heading: 'Resources', items: branch.routes.map((r) => ({ label: r.label, href: r.href })) },
    ].filter((group) => group.items.length > 0);

    return {
      branch: branch.id,
      label: branch.label,
      color: branch.color,
      chapters: branch.chapters,
      groups,
    };
  });
}
