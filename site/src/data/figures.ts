// figures.ts: the typed manifest of the hand-made conceptual infographics under
// src/figures/<id>.svg. Each entry names a figure, its two-sentence caption and
// its text alternative, and where in the Body of Knowledge it is placed:
// reusing the placement type and text-matching rules of the interactive archify
// diagrams (src/data/diagrams.ts). The figures are inlined into the chapters at
// Markdown-compile time by src/lib/rehype-diagrams.ts, wrapped in
// <figure class="figure figure--infographic">; the same figures can be dropped
// onto an editorial page with <Figure> (src/components/Figure.astro).
//
// Content comes only from the chapters and the typed data modules (values.ts,
// stack.ts, maturity.ts, patterns.ts) and from the binding visual brief in
// site/VISUAL-GUIDE.md; a figure never adds a fact, number, date or vendor the
// chapter does not state. `alt` is the SVG's one-sentence accessible name/desc;
// `description` is the fuller text alternative rendered in a <details> under the
// figure, in the chapter's own words.
//
// Three figures (values-principles, pattern-map, discipline-map) are generated
// from data by scripts/figures-build.mjs; the rest are hand-authored.
// discipline-map is the whole "map of the discipline" (scripts/map-build.mjs):
// it carries no chapter placement (placements: []) because it lives on /map, and
// it is exempt from the usual figure budget: see VISUAL-GUIDE.md §2.4.
// reading-paths lives on the /bok index page (src/pages/bok/index.astro), not
// here, because it has no chapter placement and is rendered as accessible HTML.
//
// Every entry is also citable and reusable: it gets a permalink page at
// /figures/<id> and, at build, standalone SVG and PNG exports with an
// attribution band under /downloads/figures/ (file names from figureExports).
// Dated content carries `asOf` (printed inside the image) and `reviewBy`. New
// figures are appended at the END of the array.

import type { DiagramPlacement } from './diagrams';

/** What kind of figure it is; sets its size budget (VISUAL-GUIDE.md §1.12, §5). */
export type FigureKind = 'infographic' | 'data-viz' | 'poster';

/** Size budget in KB of the inline SVG, per kind (enforced by figures-build.mjs). */
export const figureBudgetKb: Readonly<Record<FigureKind, number>> = {
  infographic: 12,
  'data-viz': 12,
  poster: 48,
};

/** Licence of every figure unless an entry says otherwise (matches site.ts). */
export const DEFAULT_FIGURE_LICENSE = 'CC BY 4.0';

/**
 * The HTML table that stands in for a data-viz figure (VISUAL-GUIDE.md §4): the
 * same numbers the chart draws, a caption and the source line. Rendered on the
 * figure's permalink page; every value must already be in the chapter.
 */
export interface FigureTable {
  /** Table caption: what the rows are. */
  caption: string;
  /** Column headers, left to right. */
  columns: readonly string[];
  /** One array of cell strings per row, in column order. */
  rows: readonly (readonly string[])[];
  /** Source line, e.g. "Chapter 17, sources [3] and [4]". */
  source: string;
}

export interface FigureDef {
  /** Figure id: matches src/figures/<id>.svg. */
  id: string;
  /** Short title (≤ 6 words) shown in the figcaption. */
  title: string;
  /** Two-sentence caption: what it shows, then what the reader does with it;
   *  ends "Drawn from chapter NN." (see VISUAL-GUIDE.md §1.2). */
  caption: string;
  /** One-sentence accessible name/description (the SVG <desc>). */
  alt: string;
  /** Fuller text alternative rendered in a <details>, in the chapter's words. */
  description: string;
  /** Where in the BoK the figure is inserted (matched by heading text). */
  placements: readonly DiagramPlacement[];
  /** Kind of figure (default 'infographic'); sets the size budget. */
  kind?: FigureKind;
  /** Site paths outside the chapters that show the figure (e.g. '/map'). */
  pages?: readonly string[];
  /**
   * YYYY-MM-DD on which the dated content (deadlines, statuses, counts) was
   * last checked against its chapter. Set it on every figure whose content can
   * go stale: the SVG itself must then print "As of <asOf>" (the build fails
   * otherwise), so a download never travels without its date.
   */
  asOf?: string;
  /** YYYY-MM-DD by which a dated figure must be re-checked; the build warns
   *  once it has passed. */
  reviewBy?: string;
  /** Licence label when it is not DEFAULT_FIGURE_LICENSE. */
  license?: string;
  /** Table fallback for a data-viz figure (required when kind is 'data-viz'). */
  data?: FigureTable;
}

export const figures: readonly FigureDef[] = [
  {
    id: 'three-questions',
    title: 'The three questions',
    caption:
      'The three questions every AI governance function must answer from live systems, and the stack layers that answer each. If you cannot answer one of them for a system today, that is your first task. Drawn from chapter 01.',
    alt: 'Three panels (what AI is running, what it is allowed to do, and what evidence proves it), each with the stack layers that answer it.',
    description:
      'Three panels, one per question. What AI is running? Answered by Layer 02 Inventory & Transparency: the inventory and the agent registry, fed by a runtime data path. What is it allowed to do? Answered by Layer 01 Govern-as-Code and Layer 04 Runtime Controls & Observability: identity before autonomy, scope before action. What evidence proves it? Answered by Layer 03 Evals & Red Teaming as Evidence and Layer 05 Assurance & Continuous Compliance: evidence as a by-product of the build.',
    placements: [{ chapter: 'definition', section: 'The three questions', at: 'head' }],
  },
  {
    id: 'values-principles',
    title: 'Values and principles',
    caption:
      'The eight values, stated as affirmations, and the six principles, stated as commitments, verbatim from the Thesis. Quote them, do not reword them, when you write your own policy. Drawn from chapter 03.',
    alt: 'Two groups: the eight values as affirmations of which way to lean, and the six principles as commitments to act.',
    description:
      'Two groups. Eight values, each stated as an affirmation of which way to lean, from "Governance is code, not a document" to "Governance is owned with engineering, not enforced from outside". Six principles, each a commitment to act, from "Build the control at the earliest point it can block" to "Make the governed path the easiest path". Both are set out verbatim in the sections that follow.',
    placements: [
      { chapter: 'values-and-principles', section: 'The eight values', at: 'head' },
    ],
  },
  {
    id: 'minimum-viable-stack',
    title: 'The minimum viable stack',
    caption:
      'The five ordered steps that stand the whole stack up thinly, one per layer, for a team of one. Do step one this week. Drawn from chapter 04.',
    alt: 'Five ordered steps (see it, rule it, test it, contain it, prove it), one per stack layer, chained top to bottom.',
    description:
      'Five ordered steps for a team of one, in the order see it, rule it, test it, contain it, prove it. Step 1, Layer 02: a registry a deploy writes to, with an owner and a scope per entry. Step 2, Layer 01: one policy with teeth, as code, in the pipeline, blocking on failure. Step 3, Layer 03: one adversarial eval against your highest-risk agent, wired so a regression fails the build. Step 4, Layer 04: every agent under its own identity with a scope, and a tested way to stop it. Step 5, Layer 05: each of the above emits a structured, timestamped record into one store.',
    placements: [
      {
        chapter: 'the-stack',
        section: 'The minimum viable stack for a team of one',
        at: 'head',
      },
    ],
  },
  {
    id: 'maturity-grid',
    title: 'The maturity grid',
    caption:
      'The five levels across the five stack layers, with an illustrative profile whose weakest layer sets the overall level. Assess each layer separately, then read the floor. Drawn from chapter 07.',
    alt: 'A five-by-five grid of stack layers against maturity levels, with an illustrative profile whose weakest layer sets the overall level.',
    description:
      'A five-by-five grid: the five stack layers as rows, in canonical order, and the five levels (Documented, Inventoried, Tested, Enforced, Continuous) as columns. The fill is illustrative: a function with inventory at Level 4, evals at Level 2 and assurance at Level 3, where the weakest layer, evals at Level 2, sets the overall level at Level 2, Inventoried. Assess each layer separately, then read the floor.',
    placements: [
      {
        chapter: 'maturity-model',
        section: 'Observable criteria, by layer and level',
        at: 'head',
      },
    ],
  },
  {
    id: 'art73-clock',
    title: 'The Article 73 clock',
    caption:
      'The serious-incident reporting windows for high-risk systems, by incident class, and the pipeline that meets them. Your pipeline must classify the incident before it can report. Drawn from chapter 08, as of 2026-09-24.',
    alt: 'The Article 73 serious-incident reporting windows by incident class (2, 10 and no later than 15 days), with the incident pipeline that meets them.',
    description:
      'The serious-incident reporting windows for high-risk systems under Article 73, by incident class. A widespread infringement: 2 days. On the death of a person: 10 days. Otherwise: no later than 15 days. The engineering artefact that meets them is the incident detection and triage pipeline with reporting-clock automation and evidence capture, which must classify the incident before it can report.',
    placements: [
      { chapter: 'regulatory-map', section: 'EU AI Act, post-Omnibus', at: 'foot' },
    ],
    // Statutory deadlines: dated, and re-checked with chapter 08's next date pass.
    asOf: '2026-09-24',
    reviewBy: '2027-03-24',
  },
  {
    id: 'pattern-map',
    title: 'The pattern map',
    caption:
      'Every pattern in the catalogue, placed on the five stack layers it lives in, as links. Start from the layer you are weakest in and open its patterns. Drawn from chapter 05.',
    alt: 'Five bands, one per stack layer in canonical order, each holding the patterns whose home layer it is, as links.',
    description:
      'Five bands, one per stack layer in canonical order (Govern-as-Code, Inventory & Transparency, Evals & Red Teaming as Evidence, Runtime Controls & Observability, Assurance & Continuous Compliance), each holding the patterns whose home layer it is, as links to the pattern in this chapter. A pattern that maps to two layers appears once, in its first layer, marked with its second.',
    placements: [{ chapter: 'patterns', at: 'lead' }],
  },
  {
    id: 'discipline-map',
    title: 'The map of the discipline',
    caption:
      'The whole discipline on one canvas: a central node and eight branches (foundations, values, the stack, patterns, the role, obligations, maturity and the learning path), every node a link. Follow the branch you are weakest in, or read the same map as a list below. Drawn from chapters 01–08.',
    alt: 'A two-sided mind map with a central AI Governance Engineer node and eight branches, each with its second-level topics as links.',
    description:
      'A two-sided mind map. The centre is the AI Governance Engineer. Four branches sit on the left: Foundations (the definition, the three questions, the disambiguation cluster, the five problems), Values and principles, The Stack (five layers and the minimum viable stack) and Patterns (the catalogue by layer); and four on the right: The Role (seven workflows, the career ladder, three ways in), Obligations (the topic crosswalk, the frameworks and the reverse index), Maturity (the five levels, metrics and the self-assessment) and the Learning path (four stages of nodes). Every node links to the page or on-page anchor that develops it; the list under the map is the same content as text.',
    placements: [],
    kind: 'poster',
    pages: ['/map'],
  },
] as const;

/** Look up a figure definition by id. */
export function getFigure(id: string): FigureDef | undefined {
  return figures.find((figure) => figure.id === id);
}

/** Figures with at least one placement in the given chapter slug. */
export function figuresForChapter(slug: string): FigureDef[] {
  return figures.filter((figure) =>
    figure.placements.some((placement) => placement.chapter === slug),
  );
}

/** The figure's kind, defaulting to 'infographic'. */
export function figureKind(figure: FigureDef): FigureKind {
  return figure.kind ?? 'infographic';
}

/** The figure's licence label, defaulting to DEFAULT_FIGURE_LICENSE. */
export function figureLicense(figure: FigureDef): string {
  return figure.license ?? DEFAULT_FIGURE_LICENSE;
}

/** Chapter slugs the figure is placed in, first placement first, no repeats. */
export function figureChapters(figure: FigureDef): string[] {
  return [...new Set(figure.placements.map((placement) => placement.chapter))];
}

/** One downloadable export of a figure (see scripts/figures-build.mjs). */
export interface FigureExport {
  /** 'svg' adapts to the viewer's colour scheme unless `theme` pins it. */
  format: 'svg' | 'png';
  /** 'auto' follows prefers-color-scheme (SVG only). */
  theme: 'auto' | 'light' | 'dark';
  /** Rendered pixel width (PNG only). */
  width?: number;
  /** File name under /downloads/figures/. */
  file: string;
}

/** Directory (site path) that holds every figure export. */
export const FIGURE_EXPORT_DIR = '/downloads/figures';

/** Rendered PNG widths, in px. */
export const FIGURE_PNG_WIDTHS: readonly number[] = [1600, 3200];

/**
 * Every export of one figure for one book version, in download order. The
 * single source for file names: the exporter writes exactly these and the
 * pages link exactly these. `<id>-v<version>[-<theme>][-<width>].<ext>`.
 */
export function figureExports(id: string, version: string): FigureExport[] {
  const base = `${id}-v${version}`;
  const out: FigureExport[] = [
    { format: 'svg', theme: 'auto', file: `${base}.svg` },
    { format: 'svg', theme: 'light', file: `${base}-light.svg` },
    { format: 'svg', theme: 'dark', file: `${base}-dark.svg` },
  ];
  for (const theme of ['light', 'dark'] as const) {
    for (const width of FIGURE_PNG_WIDTHS) {
      out.push({ format: 'png', theme, width, file: `${base}-${theme}-${width}.png` });
    }
  }
  return out;
}
