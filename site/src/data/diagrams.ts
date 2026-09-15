// diagrams.ts: the typed manifest of the interactive diagrams rendered from the
// archify IR under site/diagrams/. Each entry names the generated diagram, the
// curated title and caption shown in its <figcaption>, and where in the Body of
// Knowledge (chapter slug + exact heading text) the figure is placed.
//
// The figure is inserted at the END of the named (sub)section — that is, just
// before the next heading of depth ≤ the target heading (see
// src/lib/rehype-diagrams.ts). Chapter slugs match src/data/chapters.ts; the
// `section`/`sub` strings must match the chapter's real H2/H3 heading text,
// because rehype-diagrams resolves them through slugify() (github-slugger), the
// same slugger rehype-slug uses for the on-page `id`.
//
// Some diagrams also appear on a standalone page (see src/components/Diagram.astro
// usage): those placements live in the page, not here.

export type DiagramType =
  | 'architecture'
  | 'workflow'
  | 'sequence'
  | 'dataflow'
  | 'lifecycle';

export interface DiagramPlacement {
  /** Chapter URL slug (src/data/chapters.ts `slug`). */
  chapter: string;
  /** Exact text of the H2 heading whose section holds the figure. */
  section: string;
  /** Exact text of an H3 heading within that section, when the figure sits
   *  inside a sub-section rather than at the foot of the whole H2. */
  sub?: string;
}

export interface DiagramDef {
  /** Diagram id — matches site/diagrams/<id>.<type>.json and the generated
   *  src/generated/diagrams/<id>.svg. */
  id: string;
  /** Archify diagram type (the penultimate dotted segment of the IR file). */
  type: DiagramType;
  /** Curated title shown in the figure caption. */
  title: string;
  /** One-sentence caption: what the figure shows, and that it is generated
   *  from the Body of Knowledge. */
  caption: string;
  /** Where in the BoK Markdown this figure is inserted (may be empty for a
   *  diagram that only appears on a standalone page). */
  placements: readonly DiagramPlacement[];
}

export const diagrams: readonly DiagramDef[] = [
  {
    id: 'eval-gate-ci',
    type: 'workflow',
    title: 'Eval Gate in CI',
    caption:
      'How a model or prompt change moves through an eval gate in CI — capability and adversarial evals against a versioned suite, a threshold that ships the release or blocks it and files the result against the registry — generated from the Body of Knowledge.',
    placements: [
      { chapter: 'patterns', section: 'Pattern: Eval Gate in CI', sub: 'Solution' },
    ],
  },
  {
    id: 'incident-kill-switch',
    type: 'workflow',
    title: 'Incident Pipeline and Kill Switch',
    caption:
      'The runtime incident pipeline and kill switch: a signal trips a circuit breaker that revokes one agent’s scope without breaking the fleet, while triage opens a reportable incident on the statutory clock — generated from the Body of Knowledge.',
    placements: [
      { chapter: 'patterns', section: 'Pattern: Incident Pipeline', sub: 'Solution' },
    ],
  },
  {
    id: 'agent-identity-registry',
    type: 'architecture',
    title: 'Agent Registry and Scoped Identity',
    caption:
      'How the deploy pipeline registers each agent, issues it a scoped workload identity, and files signed evidence an auditor can attribute — with a policy gate that denies the unregistered — generated from the Body of Knowledge.',
    placements: [
      { chapter: 'patterns', section: 'Pattern: Agent Registry', sub: 'Solution' },
    ],
  },
  {
    id: 'role-workflows',
    type: 'sequence',
    title: 'How the AI governance engineer works',
    caption:
      'The sequence an AI governance engineer runs across the workflows it owns, from intake and inventory through evals, gates and runtime to assurance evidence — generated from the Body of Knowledge.',
    placements: [
      { chapter: 'the-role', section: 'What the role owns, by workflow' },
    ],
  },
  {
    id: 'maturity-levels',
    type: 'lifecycle',
    title: 'The five maturity levels',
    caption:
      'The five maturity levels from Documented to Continuous, each proven by what the running systems show — with the trap that stalls the climb between them — generated from the Body of Knowledge.',
    placements: [
      { chapter: 'maturity-model', section: 'The five levels' },
    ],
  },
  {
    id: 'obligation-to-evidence',
    type: 'dataflow',
    title: 'From obligation to evidence',
    caption:
      'How a regulatory obligation flows to the engineering artefact that satisfies or supports it and the stack layer that artefact lives in — the reverse index made visible — generated from the Body of Knowledge.',
    placements: [
      { chapter: 'regulatory-map', section: 'How to read this map' },
    ],
  },
  {
    id: 'aige-in-the-org',
    type: 'architecture',
    title: 'Where AI governance engineering sits',
    caption:
      'Where AI governance engineering sits among the adjacent roles — analyst, platform and assurance — turning governance intent into running controls and evidence — generated from the Body of Knowledge.',
    placements: [
      { chapter: 'definition', section: 'The disambiguation cluster' },
    ],
  },
  {
    id: 'reference-toolchain',
    type: 'architecture',
    title: 'Reference toolchain by stack layer',
    caption:
      'The reference toolchain mapped to the five stack layers, from policy engines and the agent registry up to guardrails, observability and the assurance store — generated from the Body of Knowledge.',
    placements: [],
  },
] as const;

/** Look up a diagram definition by id. */
export function getDiagram(id: string): DiagramDef | undefined {
  return diagrams.find((diagram) => diagram.id === id);
}

/** Diagrams with at least one placement in the given chapter slug. */
export function diagramsForChapter(slug: string): DiagramDef[] {
  return diagrams.filter((diagram) =>
    diagram.placements.some((placement) => placement.chapter === slug),
  );
}
