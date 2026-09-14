// maturity.ts: the five-level maturity model, faithful to
// bok/07-maturity-model.md — a ladder from paper to production that measures
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
      'Governance exists as artefacts a human maintains — a policy PDF, a spreadsheet inventory, a risk register, a review before launch. The rules are written and someone is accountable, but nothing executes.',
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
      'Systems are evaluated against defined tests — capability, safety and adversarial evals — and the results are recorded as evidence. Failures are visible, but a failing eval does not yet stop anything.',
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
