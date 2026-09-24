// maturity.ts: the five-level maturity model, faithful to
// bok/07-maturity-model.md: a ladder from paper to production that measures
// the running systems, not the paperwork. The levels are bold sub-headings
// inside the "The five levels" section rather than their own headings, so every
// level's `anchor` points at that section.

export type LevelNumber = 1 | 2 | 3 | 4 | 5;

export interface MaturityLevel {
  /** Level number, 1-5. */
  n: LevelNumber;
  /** Level name. */
  name: string;
  /** One-to-two-sentence summary of the level's state. */
  summary: string;
  /** The chapter's "typical evidence" for the level. */
  signals: readonly string[];
  /** `#slug` of the section the levels live in. */
  anchor: string;
}

const LEVELS_ANCHOR = 'the-five-levels';

/** The five maturity levels, Documented → Continuous. Each level is assessed
 * across all five stack layers; the overall level is the weakest layer. */
export const levels: readonly MaturityLevel[] = [
  {
    n: 1,
    name: 'Documented',
    summary:
      'Governance exists as artefacts a human maintains: a policy PDF, a spreadsheet inventory, a risk register, a review before launch. The rules are written and someone is accountable, but nothing executes.',
    signals: [
      'Policy documents',
      'A populated spreadsheet inventory',
      'Meeting minutes',
    ],
    anchor: LEVELS_ANCHOR,
  },
  {
    n: 2,
    name: 'Inventoried',
    summary:
      'There is a real inventory of models and an agent registry, fed by a runtime data path rather than typed by hand: a deploy registers a system with an owner, a scope and a status. You can answer what is running on any given day.',
    signals: [
      'A registry with an owner and a class for every system',
      'A discovery job reconciling registry against production',
    ],
    anchor: LEVELS_ANCHOR,
  },
  {
    n: 3,
    name: 'Tested',
    summary:
      'Systems are evaluated against defined tests (capability, safety and adversarial evals) and the results are recorded as evidence. Failures are visible, but a failing eval does not yet stop anything.',
    signals: [
      'Versioned eval suites',
      'Stored, timestamped eval results',
      'Red-team findings',
    ],
    anchor: LEVELS_ANCHOR,
  },
  {
    n: 4,
    name: 'Enforced',
    summary:
      'The tests bite: policy-as-code and eval gates run in CI/CD and at admission, and a failing control blocks the merge or the deploy. Identity precedes autonomy, and the gating suites’ own coverage and adversarial quality are assessed, not just their existence.',
    signals: [
      'Pipeline logs showing blocked releases with reasons',
      'Admission-control denials',
      'The registry acting as a deploy gate',
      'A tracked coverage or adversarial-quality metric for the gating suites',
    ],
    anchor: LEVELS_ANCHOR,
  },
  {
    n: 5,
    name: 'Continuous',
    summary:
      'Assurance is produced continuously from the runtime data path: guardrail decisions, drift and agent behaviour stream into observability, and evidence is emitted as machine-readable artefacts as the pipeline and runtime operate. The audit is a query.',
    signals: [
      'A live assurance store',
      'Streaming eval and guardrail telemetry',
      'An audit answered by running a query',
    ],
    anchor: LEVELS_ANCHOR,
  },
] as const;

// ---------------------------------------------------------------------------
// Structured criteria for the maturity self-check (/toolkit/maturity-self-check).
// Everything below is additive and taken from bok/07-maturity-model.md: the
// "Observable criteria, by layer and level" table (cell text verbatim, Markdown
// link syntax stripped), the "Metrics per level" list, the "Self-assessment
// checklist" and each level's "Typical failure". tests/toolkit.spec.ts checks
// the cells against the chapter table, so an edit to the chapter that is not
// mirrored here fails the suite.

/** A layer of the stack, by number (names live in stack.ts). */
export type MaturityLayer = 1 | 2 | 3 | 4 | 5;

/** A layer's reading: 0 when it meets no criterion yet, else the level. */
export type LayerReading = 0 | LevelNumber;

/** Where a criterion's pattern link comes from: the chapter's own table cell
 *  links it (`chapter`), or the cell links none and the pattern is the
 *  catalogue entry of the same layer that carries that step (`layer`). */
export type PatternSource = 'chapter' | 'layer';

export interface LayerCriterion {
  /** The level this cell describes. */
  level: LevelNumber;
  /** The table cell, verbatim from chapter 07 (link syntax stripped). */
  text: string;
  /** Anchor id of the chapter 05 pattern that carries the step to this cell,
   *  e.g. 'pattern-eval-gate-in-ci' (see patterns.ts). */
  pattern: string;
  /** Whether chapter 07 links that pattern in this cell or it is inferred. */
  patternSource: PatternSource;
}

export interface LayerCriteria {
  layer: MaturityLayer;
  /** Five cells, Level 1 to Level 5, left to right. */
  cells: readonly LayerCriterion[];
}

/** `#slug`s of the chapter 07 sections the self-check reads. */
export const maturityAnchors = {
  levels: LEVELS_ANCHOR,
  criteria: 'observable-criteria-by-layer-and-level',
  metrics: 'metrics-per-level',
  checklist: 'self-assessment-checklist',
  certification: 'how-this-relates-to-certification-and-other-assessments',
} as const;

/** "Observable criteria, by layer and level": one row per layer, read left to
 *  right. You are at a level only when every row has reached its column. */
export const layerCriteria: readonly LayerCriteria[] = [
  {
    layer: 1,
    cells: [
      {
        level: 1,
        text: 'Policies written as prose',
        pattern: 'pattern-policy-card',
        patternSource: 'layer',
      },
      {
        level: 2,
        text: 'Policies indexed, mapped to systems',
        pattern: 'pattern-policy-card',
        patternSource: 'layer',
      },
      {
        level: 3,
        text: 'Policy checks run and report, non-blocking',
        pattern: 'pattern-policy-card',
        patternSource: 'layer',
      },
      {
        level: 4,
        text: 'Policy-as-code blocks merge/deploy',
        pattern: 'pattern-policy-card',
        patternSource: 'chapter',
      },
      {
        level: 5,
        text: 'Policy verdicts stream to assurance, versioned',
        pattern: 'pattern-continuous-assurance-telemetry',
        patternSource: 'chapter',
      },
    ],
  },
  {
    layer: 2,
    cells: [
      {
        level: 1,
        text: 'Spreadsheet inventory',
        pattern: 'pattern-agent-registry',
        patternSource: 'layer',
      },
      {
        level: 2,
        text: 'Registry fed by deploy; owner + scope per system',
        pattern: 'pattern-agent-registry',
        patternSource: 'layer',
      },
      {
        level: 3,
        text: 'Registry reconciled against production',
        pattern: 'pattern-shadow-ai-discovery',
        patternSource: 'layer',
      },
      {
        level: 4,
        text: 'Registry gates deployment; no entry, no identity',
        pattern: 'pattern-agent-registry',
        patternSource: 'chapter',
      },
      {
        level: 5,
        text: 'Registry live off runtime discovery; drift auto-flagged',
        pattern: 'pattern-shadow-ai-discovery',
        patternSource: 'chapter',
      },
    ],
  },
  {
    layer: 3,
    cells: [
      {
        level: 1,
        text: 'Evals described in a plan',
        pattern: 'pattern-eval-gate-in-ci',
        patternSource: 'layer',
      },
      {
        level: 2,
        text: 'Eval suites exist and are versioned',
        pattern: 'pattern-eval-gate-in-ci',
        patternSource: 'layer',
      },
      {
        level: 3,
        text: 'Evals run, results stored, non-blocking',
        pattern: 'pattern-adversarial-red-team-suite',
        patternSource: 'layer',
      },
      {
        level: 4,
        text: 'Eval gate fails the build on regression; suite coverage and adversarial quality assessed',
        pattern: 'pattern-eval-gate-in-ci',
        patternSource: 'chapter',
      },
      {
        level: 5,
        text: 'Evals run continuously; results are live evidence',
        pattern: 'pattern-continuous-assurance-telemetry',
        patternSource: 'layer',
      },
    ],
  },
  {
    layer: 4,
    cells: [
      {
        level: 1,
        text: 'Guardrails named in a design',
        pattern: 'pattern-runtime-guardrail',
        patternSource: 'layer',
      },
      {
        level: 2,
        text: 'Guardrails deployed, not measured',
        pattern: 'pattern-runtime-guardrail',
        patternSource: 'layer',
      },
      {
        level: 3,
        text: 'Guardrail decisions logged',
        pattern: 'pattern-runtime-guardrail',
        patternSource: 'layer',
      },
      {
        level: 4,
        text: 'Kill switch tested; tool-calls mediated and enforced',
        pattern: 'pattern-kill-switch--circuit-breaker',
        patternSource: 'chapter',
      },
      {
        level: 5,
        text: 'Runtime signals drive control decisions in real time',
        pattern: 'pattern-continuous-assurance-telemetry',
        patternSource: 'layer',
      },
    ],
  },
  {
    layer: 5,
    cells: [
      {
        level: 1,
        text: 'Evidence gathered by hand for audit',
        pattern: 'pattern-machine-readable-evidence-oscal',
        patternSource: 'layer',
      },
      {
        level: 2,
        text: 'Evidence templated per control',
        pattern: 'pattern-machine-readable-evidence-oscal',
        patternSource: 'layer',
      },
      {
        level: 3,
        text: 'Structured evidence produced per run',
        pattern: 'pattern-machine-readable-evidence-oscal',
        patternSource: 'layer',
      },
      {
        level: 4,
        text: 'Evidence required to pass the gate',
        pattern: 'pattern-eval-gate-in-ci',
        patternSource: 'layer',
      },
      {
        level: 5,
        text: 'Machine-readable evidence emitted continuously; audit = query',
        pattern: 'pattern-machine-readable-evidence-oscal',
        patternSource: 'chapter',
      },
    ],
  },
] as const;

/** "Metrics per level": what to read off the systems for each step up, keyed
 *  by the level being reached (2 = the Level 1 → 2 metrics). The chapter has
 *  no metrics for reaching Level 1. */
export const stepMetrics: Readonly<Record<2 | 3 | 4 | 5, readonly string[]>> = {
  2: [
    'Percentage of AI systems and agents in the registry with a named owner and a class',
    'Registry-to-production reconciliation gap (systems in production but not registered)',
  ],
  3: [
    'Percentage of registered systems with a versioned eval suite',
    'Percentage with a recorded, timestamped eval result in the last release',
  ],
  4: [
    'Percentage of releases passing through an eval gate (versus bypassing it)',
    'Percentage of agents with a tested kill switch and a scoped, non-shared identity',
    'Number of releases blocked with a logged reason',
  ],
  5: [
    'Mean time to detect an unauthorised agent action (an agent doing something outside its declared scope)',
    'Evidence freshness (age of the most recent evidence artefact per control)',
    'Percentage of controls whose status is answerable by a live query rather than a manual pull',
  ],
};

/** "Self-assessment checklist": answer with the system, not the intention. A
 *  "no" caps you at the level below. */
export const levelChecklist: Readonly<Record<LevelNumber, readonly string[]>> = {
  1: [
    'Is every AI system covered by a written policy with a named owner?',
    'Is there a risk register that a person maintains?',
  ],
  2: [
    'Does the registry get an entry automatically at deploy, with owner, scope and status?',
    'Can you list every model and agent running today, from the system of record, in under a minute?',
  ],
  3: [
    'Does every registered system have a versioned eval suite?',
    'Are results stored with timestamps?',
    'Do you run red-team evals against your agents?',
  ],
  4: [
    'Does a failing eval or policy check actually block a release?',
    'Is an agent without an owner, scope and kill switch prevented from reaching production?',
    'Can you show a release that was blocked, with the reason logged?',
  ],
  5: [
    'Is runtime telemetry wired to control decisions, not just dashboards?',
    'Is evidence emitted as machine-readable artefacts continuously?',
    'Would an audit question be answered by a query rather than a collection sprint?',
  ],
};

/** Each level's "Typical failure" (the one that moves you back), verbatim. */
export const levelFailures: Readonly<Record<LevelNumber, string>> = {
  1: 'The document was last edited a quarter ago and no longer matches production; the artefact is stale before it is signed.',
  2: 'Shadow AI. A system or agent reaches production without registering, so the inventory is complete only for the honest.',
  3: 'The eval is run once before launch, pasted into a slide, and never re-run when the model or its prompts change.',
  4: 'Brittle gates that engineers route around; a gate maintained by governance alone that engineering does not own; or a gate whose suite is trivial or unmaintained, so the block is real but the assurance is not.',
  5: 'Telemetry that is collected but never wired to a decision; observability without enforcement decays back to Level 3 dressed up as Level 5.',
};

/** The weakest layer sets the overall level: a floor for planning, not a
 *  verdict on the whole function. Returns the floor (0 when a layer meets no
 *  criterion yet) and the layers at it, in build order. The browser tool
 *  (public/toolkit/maturity-self-check.js) applies the same rule. */
export function maturityFloor(profile: Readonly<Record<MaturityLayer, LayerReading>>): {
  level: LayerReading;
  layers: MaturityLayer[];
} {
  const order: MaturityLayer[] = [1, 2, 3, 4, 5];
  const level = Math.min(...order.map((layer) => profile[layer])) as LayerReading;
  return { level, layers: order.filter((layer) => profile[layer] === level) };
}
