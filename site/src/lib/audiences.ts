// audiences.ts (lib): resolves the audience hubs of src/data/audiences.ts into
// what the pages render, and checks them at build time. Titles of patterns,
// figures, cases and tools are read from their own registries, obligation rows
// from the register, dates from the register's rows; nothing is retyped.
//
// validateAudiences() throws on the first problem it finds, so a broken hub
// fails the build (the same stance as src/lib/pattern-pages.ts); the link
// checker then verifies every rendered href and #anchor against dist.
import { existsSync } from 'node:fs';
import {
  audiences,
  siblingHubs,
  PARALLEL_TOOL_IDS,
  type Audience,
  type RouteStep,
} from '../data/audiences';
import { getChapterBySlug } from '../data/chapters';
import { chapterNum } from '../data/parts';
import { getPatternBySlug, patternPath } from '../data/patterns';
import { getFigure } from '../data/figures';
import { tools } from '../data/toolkit';
import { cases } from '../data/cases';
import { nodes, nodeHref } from '../data/path';
import { schemaOrder, kit } from '../data/templates';
import {
  obligationById,
  obligationPath,
  appliesStatusLabels,
  type Obligation,
} from '../data/frameworks';
import { frameworkOf } from './obligations';
import { formatDate } from './applies-now';
import { citedNumbers } from './sources';
import { getHeadings, readSource, slugify, sourcePath } from './md-parse';

/** Plain-language label of each step kind, shown before the step's reason. */
const KIND_LABEL: Record<RouteStep['kind'], string> = {
  chapter: 'Chapter',
  pattern: 'Pattern',
  figure: 'Figure',
  tool: 'Tool',
  template: 'Template',
  dataset: 'Dataset',
  case: 'Case',
  reference: 'Reference',
};

export interface ResolvedStep {
  kind: RouteStep['kind'];
  /** e.g. "Chapter 13", "Pattern", "Tool". */
  kindLabel: string;
  title: string;
  href: string;
  why: string;
  /** Layer colour for patterns (`var(--lN)`); none for the rest. */
  swatch?: string;
}

export interface ResolvedPhase {
  title: string;
  steps: (ResolvedStep & { index: string })[];
}

const liveTool = (id: string) => tools.find((tool) => tool.id === id && tool.status === 'live');

/** A step as a titled link; `undefined` for a tool that is not live yet. */
export function resolveStep(step: RouteStep): ResolvedStep | undefined {
  const base = { kind: step.kind, kindLabel: KIND_LABEL[step.kind], why: step.why };
  switch (step.kind) {
    case 'chapter': {
      const chapter = getChapterBySlug(step.slug);
      if (!chapter) throw new Error(`audiences: unknown chapter "${step.slug}"`);
      return {
        ...base,
        kindLabel: `Chapter ${chapterNum(chapter.order)}`,
        title: step.title,
        href: `/bok/${step.slug}#${step.anchor}`,
      };
    }
    case 'pattern': {
      const pattern = getPatternBySlug(step.slug);
      if (!pattern) throw new Error(`audiences: unknown pattern "${step.slug}"`);
      return {
        ...base,
        title: pattern.title,
        href: patternPath(pattern),
        swatch: `var(--l${pattern.layer})`,
      };
    }
    case 'figure': {
      const figure = getFigure(step.id);
      if (!figure) throw new Error(`audiences: unknown figure "${step.id}"`);
      return { ...base, title: figure.title, href: `/figures/${figure.id}` };
    }
    case 'tool': {
      const tool = liveTool(step.id);
      return tool ? { ...base, title: tool.title, href: tool.href } : undefined;
    }
    case 'template':
      return { ...base, title: step.title, href: `/resources/templates#${step.anchor}` };
    case 'case': {
      const entry = cases.find((c) => c.id === step.id);
      if (!entry) throw new Error(`audiences: unknown case "${step.id}"`);
      return { ...base, title: entry.short, href: `/cases/${entry.id}` };
    }
    case 'dataset':
    case 'reference':
      return { ...base, title: step.title, href: step.href };
  }
}

/** The route with tools that are not live dropped, numbered 01.. across phases. */
export function resolveRoute(audience: Audience): ResolvedPhase[] {
  let n = 0;
  return audience.route
    .map((phase) => ({
      title: phase.title,
      steps: phase.steps
        .map(resolveStep)
        .filter((step): step is ResolvedStep => step !== undefined)
        .map((step) => ({ ...step, index: String(++n).padStart(2, '0') })),
    }))
    .filter((phase) => phase.steps.length > 0);
}

/** Tool steps a hub names that are not live yet (for the orchestrator's handoff). */
export function pendingTools(audience: Audience): string[] {
  return audience.route
    .flatMap((phase) => phase.steps)
    .filter((step): step is Extract<RouteStep, { kind: 'tool' }> => step.kind === 'tool')
    .filter((step) => !liveTool(step.id))
    .map((step) => step.id);
}

const DATE_TOKEN = /\{date:([A-Z0-9-]+)(?:\|([^}]+))?\}/g;

/** The ISO date a `{date:…}` token names, from the register. */
function tokenDate(id: string, match?: string): string {
  const row = obligationById(id);
  if (!row) throw new Error(`audiences: {date:${id}} names no obligation`);
  if (!match) {
    if (!row.appliesFrom) throw new Error(`audiences: ${id} has no appliesFrom`);
    return row.appliesFrom;
  }
  const step = row.milestones?.find((m) => m.note.includes(match));
  if (!step) throw new Error(`audiences: ${id} has no milestone matching "${match}"`);
  return step.date;
}

/** Replace every `{date:…}` token with the register's date, as "2 Dec 2027". */
export function fillDates(text: string): string {
  return text.replace(DATE_TOKEN, (_, id: string, match?: string) =>
    formatDate(tokenDate(id, match)),
  );
}

export interface ResolvedObligation {
  row: Obligation;
  href: string;
  instrument: string;
  status: string;
  /** "2 Dec 2027" or undefined for rows without a date. */
  applies?: string;
}

/** The hub's obligations, in its order, with the register's status and date. */
export function resolveObligations(audience: Audience): ResolvedObligation[] {
  return audience.obligations.map((id) => {
    const row = obligationById(id);
    if (!row) throw new Error(`audiences: ${audience.id} names unknown obligation "${id}"`);
    return {
      row,
      href: obligationPath(row),
      instrument: frameworkOf(row).short,
      status: appliesStatusLabels[row.appliesStatus],
      applies: row.appliesFrom ? formatDate(row.appliesFrom) : undefined,
    };
  });
}

/** Learning-path start points as links. */
export function pathLinks(audience: Audience): { label: string; href: string }[] {
  return audience.pathStartAt.map((id) => {
    const node = nodes.find((n) => n.id === id);
    if (!node) throw new Error(`audiences: ${audience.id} starts at unknown path node "${id}"`);
    return { label: node.title, href: nodeHref(id) };
  });
}

/**
 * The hubs another block owns (/for/aigp, /for/certifications) whose page
 * exists in src/pages/for/, as a file or a folder index. Until then the /for
 * index and the hubs do not link them, so no link points at a missing route.
 */
export function liveSiblingHubs(): typeof siblingHubs {
  return siblingHubs.filter((hub) =>
    [`site/src/pages/for/${hub.slug}.astro`, `site/src/pages/for/${hub.slug}/index.astro`].some(
      (file) => existsSync(sourcePath(file)),
    ),
  );
}

/** The count line of a hub card on /for. */
export function hubCount(audience: Audience): string {
  const steps = resolveRoute(audience).reduce((sum, phase) => sum + phase.steps.length, 0);
  return `${steps} steps · ${audience.obligations.length} obligations`;
}

const headingCache = new Map<string, Set<string>>();
function chapterAnchors(slug: string): Set<string> {
  const cached = headingCache.get(slug);
  if (cached) return cached;
  const chapter = getChapterBySlug(slug);
  if (!chapter) throw new Error(`audiences: unknown chapter "${slug}"`);
  const set = new Set(getHeadings(readSource(`bok/${chapter.id}.md`)).map((h) => slugify(h.text)));
  headingCache.set(slug, set);
  return set;
}

const TEMPLATE_ANCHORS = new Set([
  ...schemaOrder.map((name) => `schema-${name}`),
  ...kit.map((item) => `kit-${item.id}`),
]);

/** Internal hrefs a hub links outside its route: answers and actions. */
function checkInternal(where: string, href: string): void {
  if (!href.startsWith('/') || href.startsWith('//')) {
    throw new Error(`audiences: ${where} links "${href}", not an internal absolute path`);
  }
  const bok = href.match(/^\/bok\/([a-z0-9-]+)#(.+)$/);
  if (bok && !chapterAnchors(bok[1]).has(bok[2])) {
    throw new Error(`audiences: ${where} links "${href}": no such heading in the chapter`);
  }
}

/**
 * Every rule of the data file's header comment. Throws on the first problem;
 * the /for pages call it, so a broken hub fails `astro build`.
 */
export function validateAudiences(): void {
  const knownTools = new Set([...tools.map((t) => t.id), ...PARALLEL_TOOL_IDS]);
  const slugs = new Set<string>();

  for (const a of audiences) {
    const at = (what: string) => `${a.id} ${what}`;
    if (a.slug !== a.id) throw new Error(`audiences: ${a.id} slug must equal id`);
    if (slugs.has(a.slug)) throw new Error(`audiences: duplicate slug ${a.slug}`);
    slugs.add(a.slug);
    if (a.metaTitle.length > 45) throw new Error(`audiences: ${at('metaTitle')} is over 45 characters`);
    if (a.description.length < 50 || a.description.length > 160) {
      throw new Error(`audiences: ${at('description')} is ${a.description.length} characters (50 to 160)`);
    }
    if (a.obligations.length < 4) throw new Error(`audiences: ${at('')}lists fewer than 4 obligations`);
    if (a.thisWeek.length < 3 || a.thisWeek.length > 6) {
      throw new Error(`audiences: ${at('thisWeek')} must hold 3 to 6 actions`);
    }

    for (const phase of a.route) {
      for (const step of phase.steps) {
        if (step.kind === 'tool' && !knownTools.has(step.id)) {
          throw new Error(`audiences: ${at('route')} names unknown tool "${step.id}"`);
        }
        if (step.kind === 'chapter' && !chapterAnchors(step.slug).has(step.anchor)) {
          throw new Error(`audiences: ${at('route')} anchor "${step.slug}#${step.anchor}" is not a heading`);
        }
        if (step.kind === 'template' && !TEMPLATE_ANCHORS.has(step.anchor)) {
          throw new Error(`audiences: ${at('route')} template anchor "${step.anchor}" does not exist`);
        }
        if (step.kind === 'dataset' || step.kind === 'reference') checkInternal(at('route'), step.href);
        resolveStep(step); // throws on unknown patterns, figures, cases, chapters
      }
    }
    if (resolveRoute(a).reduce((sum, p) => sum + p.steps.length, 0) < 8) {
      throw new Error(`audiences: ${at('route')} has fewer than 8 live steps`);
    }

    for (const q of a.questions) {
      checkInternal(at('question link'), q.link.href);
      fillDates(q.answer); // throws on a token that does not resolve
    }
    for (const w of a.thisWeek) checkInternal(at('action link'), w.link.href);

    resolveObligations(a);
    pathLinks(a);

    // [n] markers and sources, both ways.
    const cited = citedNumbers(a.questions.map((q) => q.answer));
    for (const n of cited) {
      if (n < 1 || n > a.sources.length) throw new Error(`audiences: ${a.id} cites [${n}] with no source`);
    }
    for (let n = 1; n <= a.sources.length; n++) {
      if (!cited.has(n)) throw new Error(`audiences: ${a.id} source [${n}] is never cited`);
    }

    // House style: no em dash anywhere in a hub.
    if (JSON.stringify(a).includes('—')) throw new Error(`audiences: ${a.id} contains an em dash`);
  }
}
