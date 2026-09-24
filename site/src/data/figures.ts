// figures.ts: the typed manifest of the hand-made conceptual infographics under
// src/figures/<id>.svg. Each entry names a figure, its two-sentence caption and
// its text alternative, and where in the Body of Knowledge it is placed —
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
// it is exempt from the usual figure budget — see VISUAL-GUIDE.md §2.4.
// reading-paths lives on the /bok index page (src/pages/bok/index.astro), not
// here, because it has no chapter placement and is rendered as accessible HTML.

import type { DiagramPlacement } from './diagrams';

export interface FigureDef {
  /** Figure id — matches src/figures/<id>.svg. */
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
      'The serious-incident reporting windows for high-risk systems, by incident class, and the pipeline that meets them. Your pipeline must classify the incident before it can report. Drawn from chapter 08.',
    alt: 'The Article 73 serious-incident reporting windows by incident class (2, 10 and no later than 15 days), with the incident pipeline that meets them.',
    description:
      'The serious-incident reporting windows for high-risk systems under Article 73, by incident class. A widespread infringement: 2 days. On the death of a person: 10 days. Otherwise: no later than 15 days. The engineering artefact that meets them is the incident detection and triage pipeline with reporting-clock automation and evidence capture, which must classify the incident before it can report.',
    placements: [
      { chapter: 'regulatory-map', section: 'EU AI Act, post-Omnibus', at: 'foot' },
    ],
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
