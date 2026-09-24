// diagrams.ts: the typed manifest of the interactive diagrams rendered from the
// archify IR under site/diagrams/. Each entry names the generated diagram, the
// curated title and caption shown in its <figcaption>, and where in the Body of
// Knowledge (chapter slug + exact heading text) the figure is placed.
//
// Each placement's `at` picks where the figure lands: 'lead' opens the chapter
// (before its first H2, after the intro), 'head' sits immediately under the
// anchor heading, and 'foot' (the default) goes at the END of the named
// (sub)section — just before the next heading of depth ≤ the anchor (see
// src/lib/rehype-diagrams.ts). Chapter slugs match src/data/chapters.ts; the
// `section`/`sub` strings must match the chapter's real H2/H3 heading text,
// because rehype-diagrams matches them by normalised heading text.
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
  /**
   * Where the figure is inserted relative to its anchor (default `'foot'`):
   * - `'lead'` — before the chapter's first H2, as an opening figure after the
   *   intro. `section`/`sub` are ignored.
   * - `'head'` — immediately after the anchor heading (`section`, plus `sub`
   *   when the anchor is an H3 inside that section).
   * - `'foot'` — at the foot of the anchor (sub)section, i.e. just before the
   *   next heading of depth ≤ the anchor.
   */
  at?: 'lead' | 'head' | 'foot';
  /** Exact text of the H2 heading whose section holds the figure. Required for
   *  `'head'` and `'foot'`; ignored for `'lead'`. */
  section?: string;
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
      'How a model or prompt change moves through an eval gate in CI: capability and adversarial evals against a versioned suite, a threshold that ships the release or blocks it and files the result against the registry. Generated from the Body of Knowledge.',
    placements: [
      { chapter: 'patterns', section: 'Pattern: Eval Gate in CI', at: 'head' },
    ],
  },
  {
    id: 'incident-kill-switch',
    type: 'workflow',
    title: 'Incident Pipeline and Kill Switch',
    caption:
      'The runtime incident pipeline and kill switch: a signal trips a circuit breaker that revokes one agent’s scope without breaking the fleet, while triage opens a reportable incident on the statutory clock. Generated from the Body of Knowledge.',
    placements: [
      { chapter: 'patterns', section: 'Pattern: Incident Pipeline', at: 'head' },
    ],
  },
  {
    id: 'agent-identity-registry',
    type: 'architecture',
    title: 'Agent Registry and Scoped Identity',
    caption:
      'How the deploy pipeline registers each agent, issues it a scoped workload identity, and files signed evidence an auditor can attribute, with a policy gate that denies the unregistered. Generated from the Body of Knowledge.',
    placements: [
      { chapter: 'patterns', section: 'Pattern: Agent Registry', at: 'head' },
    ],
  },
  {
    id: 'role-workflows',
    type: 'sequence',
    title: 'How the AI governance engineer works',
    caption:
      'The sequence an AI governance engineer runs across the workflows it owns, from intake and inventory through evals, gates and runtime to assurance evidence. Generated from the Body of Knowledge.',
    placements: [{ chapter: 'the-role', at: 'lead' }],
  },
  {
    id: 'maturity-levels',
    type: 'lifecycle',
    title: 'The five maturity levels',
    caption:
      'The five maturity levels from Documented to Continuous, each proven by what the running systems show, with the trap that stalls the climb between them. Generated from the Body of Knowledge.',
    placements: [{ chapter: 'maturity-model', at: 'lead' }],
  },
  {
    id: 'obligation-to-evidence',
    type: 'dataflow',
    title: 'From obligation to evidence',
    caption:
      'How a regulatory obligation flows to the engineering artefact that satisfies or supports it and the stack layer that artefact lives in: the reverse index made visible. Generated from the Body of Knowledge.',
    placements: [{ chapter: 'regulatory-map', at: 'lead' }],
  },
  {
    id: 'aige-in-the-org',
    type: 'architecture',
    title: 'Where AI governance engineering sits',
    caption:
      'Where AI governance engineering sits among the adjacent roles (analyst, platform and assurance), turning governance intent into running controls and evidence. Generated from the Body of Knowledge.',
    placements: [{ chapter: 'definition', at: 'lead' }],
  },
  {
    id: 'reference-toolchain',
    type: 'architecture',
    title: 'Reference toolchain by stack layer',
    caption:
      'The reference toolchain mapped to the five stack layers, from policy engines and the agent registry up to guardrails, observability and the assurance store. Generated from the Body of Knowledge.',
    placements: [{ chapter: 'the-stack', section: 'The cost of the stack', at: 'foot' }],
  },
  {
    id: 'policy-card',
    type: 'workflow',
    title: 'Policy Card',
    caption:
      'A governance rule travels as a versioned policy card that a policy engine evaluates at one gate, recording an allow-or-deny verdict against every change. Start by writing one card for one obligation and wiring it to that gate. Generated from the Body of Knowledge.',
    placements: [
      { chapter: 'patterns', section: 'Pattern: Policy Card', at: 'head' },
    ],
  },
  {
    id: 'aibom-at-build',
    type: 'dataflow',
    title: 'AIBOM at Build',
    caption:
      'The build step emits an AI bill of materials that lands on the registry entry and feeds the vulnerability-matching and documentation consumers. If your build does not emit it, you cannot answer what is running. Generated from the Body of Knowledge.',
    placements: [{ chapter: 'patterns', section: 'Pattern: AIBOM', at: 'head' }],
  },
  {
    id: 'model-card-evidence',
    type: 'workflow',
    title: 'Model Card as Evidence',
    caption:
      'The model card is generated from real training and eval outputs, checked against a schema at one gate, and attached to the release as control evidence. A hand-written card is documentation; a generated, validated one is a control. Generated from the Body of Knowledge.',
    placements: [
      {
        chapter: 'patterns',
        section: 'Pattern: Model Card as Control Evidence',
        at: 'head',
      },
    ],
  },
  {
    id: 'continuous-assurance-telemetry',
    type: 'dataflow',
    title: 'Continuous Assurance Telemetry',
    caption:
      'Runtime signals are checked against controls continuously, and every check writes an evidence record an auditor can read from the assurance store. Continuous means the evidence is produced by the data path, not a quarterly exercise. Generated from the Body of Knowledge.',
    placements: [
      {
        chapter: 'patterns',
        section: 'Pattern: Continuous Assurance Telemetry',
        at: 'head',
      },
    ],
  },
  {
    id: 'fria-as-code',
    type: 'workflow',
    title: 'FRIA-as-Code',
    caption:
      'The fundamental-rights impact assessment is captured as data at intake, assessed and mitigated, then approved at a human gate and stored machine-readable beside the DPIA. Run it before deploying a high-risk system and keep the record where the auditor looks. Generated from the Body of Knowledge.',
    placements: [
      { chapter: 'patterns', section: 'Pattern: FRIA-as-Code', at: 'head' },
    ],
  },
  {
    id: 'framework-crosswalk',
    type: 'architecture',
    title: 'Framework Crosswalk',
    caption:
      'One internal control set is the hub that external frameworks map onto, with evidence attached once to the hub and reused for all of them. The crosswalk is an index, not the end state; the hub is what you maintain. Generated from the Body of Knowledge.',
    placements: [
      { chapter: 'patterns', section: 'Pattern: Framework Crosswalk', at: 'head' },
    ],
  },
  {
    id: 'machine-readable-evidence',
    type: 'dataflow',
    title: 'Machine-Readable Evidence',
    caption:
      'Controls, assessments and evidence become OSCAL documents that a validator checks and assurance consumers read without anyone re-typing them. Choose the format your assessor can ingest and generate it from data you already hold. Generated from the Body of Knowledge.',
    placements: [
      {
        chapter: 'patterns',
        section: 'Pattern: Machine-Readable Evidence (OSCAL)',
        at: 'head',
      },
    ],
  },
  {
    id: 'adversarial-red-team-suite',
    type: 'workflow',
    title: 'Adversarial Red-Team Suite',
    caption:
      'A versioned adversarial suite built from a threat taxonomy runs in CI or on a schedule, and every finding is fixed or accepted on the record and filed as evidence, with fixes feeding back into the suite. Treat red-team findings like test failures, with an owner and a deadline. Generated from the Body of Knowledge.',
    placements: [
      { chapter: 'patterns', section: 'Pattern: Adversarial Red-Team Suite', at: 'head' },
    ],
  },
  {
    id: 'runtime-guardrail',
    type: 'architecture',
    title: 'Runtime Guardrail',
    caption:
      'Input and output guardrails on the model or agent path enforce the same policy card that CI evaluated and emit a decision event on every call to the assurance store and, on a breach, to the circuit breaker. A guardrail without events is a filter, not a control. Generated from the Body of Knowledge.',
    placements: [
      { chapter: 'patterns', section: 'Pattern: Runtime Guardrail', at: 'head' },
    ],
  },
  {
    id: 'kill-switch-circuit-breaker',
    type: 'architecture',
    title: 'Kill Switch and Circuit Breaker',
    caption:
      'A breaker trips on a signal and revokes one agent’s scope while the rest of the fleet keeps running, and the trip itself becomes an incident record. Design the breaker per agent scope before you need it and test the trip in staging. Generated from the Body of Knowledge.',
    placements: [
      { chapter: 'patterns', section: 'Pattern: Kill Switch / Circuit Breaker', at: 'head' },
    ],
  },
  {
    id: 'agent-identity-scoped-credentials',
    type: 'sequence',
    title: 'Agent Identity and Scoped Credentials',
    caption:
      'An agent receives a short-lived, scoped credential from its registry entry at deploy time, and every downstream call is verified and attributed in the audit log. No registry entry, no credential, no access. Generated from the Body of Knowledge.',
    placements: [
      { chapter: 'patterns', section: 'Pattern: Agent Identity & Scoped Credentials', at: 'head' },
    ],
  },
  {
    id: 'hitl-gate',
    type: 'sequence',
    title: 'Human-in-the-loop Gate',
    caption:
      'For the actions the policy marks as needing a human, the agent pauses, a named reviewer decides within a time box, and the decision is logged as evidence. Define which actions need a human by policy, not by habit. Generated from the Body of Knowledge.',
    placements: [
      { chapter: 'patterns', section: 'Pattern: Human-in-the-loop Gate', at: 'head' },
    ],
  },
  {
    id: 'shadow-ai-discovery',
    type: 'workflow',
    title: 'Shadow-AI Discovery',
    caption:
      'Discovery scans the places AI hides, matches each finding against the registry, and turns unknowns into registry entries or blocks, leaving a discovery report. Run it before you claim your inventory is complete. Generated from the Body of Knowledge.',
    placements: [
      { chapter: 'patterns', section: 'Pattern: Shadow-AI Discovery', at: 'head' },
    ],
  },
  {
    id: 'vendor-due-diligence-gate',
    type: 'workflow',
    title: 'Vendor and Model Due-Diligence Gate',
    caption:
      'A procured model or tool enters the inventory only after a gate that checks its documentation, evals and contract terms, and the outcome is recorded with any conditions. The gate is where deployer duties start, so keep its checklist versioned. Generated from the Body of Knowledge.',
    placements: [
      { chapter: 'patterns', section: 'Pattern: Vendor / Model Due-Diligence Gate', at: 'head' },
    ],
  },
  {
    id: 'the-stack-layers',
    type: 'architecture',
    title: 'The five layers and their artefacts',
    caption:
      'The five layers of the stack in their canonical order, each holding the artefacts it produces, with evidence flowing up into assurance. Read the chapter layer by layer, then build in the order it gives for a team of one. Generated from the Body of Knowledge.',
    placements: [{ chapter: 'the-stack', at: 'lead' }],
  },
  {
    id: 'regulatory-wave',
    type: 'lifecycle',
    title: 'The regulatory window',
    caption:
      'The obligations that are live now and the deferred deadlines that follow them, as the chapter states them as of 2026-09-24. Pick the next stage and map its obligations to artefacts in chapter 08. Generated from the Body of Knowledge.',
    placements: [{ chapter: 'why-now', at: 'lead' }],
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
