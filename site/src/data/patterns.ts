// patterns.ts: the typed index of the reusable patterns catalogued in
// bok/05-patterns.md, used to draw the pattern-map infographic (five stack
// layers, each holding the patterns that live in it — see
// scripts/figures-build.mjs and src/data/figures.ts).
//
// Each entry is faithful to the chapter: `id` is the anchor rehype-slug emits
// for the pattern's H2 ("## Pattern: <title>" -> "pattern-<slug>"); `layer` is
// the FIRST layer named on the pattern's "Maps to:" line, and `secondaryLayer`
// the second one for the three dual-layer patterns; `mapsTo` lists the
// frameworks named on that line, verbatim, with the trailing "Layer NN …" token
// dropped. No pattern, framework or layer appears here that chapter 05 does not
// state.
//
// KEEP IN SYNC: bok/05-patterns.md currently defines 15 patterns; two more
// (an adversarial red-team suite in Layer 03 and a runtime guardrail in Layer
// 04) are planned. When a "## Pattern:" heading is added to the chapter, add its
// entry here too — tests/figures.spec.ts fails when the count of "## Pattern:"
// headings in chapter 05 differs from the number of entries below.

export type PatternLayer = 1 | 2 | 3 | 4 | 5;

export interface PatternDef {
  /** Anchor id of the pattern's H2, as rehype-slug (github-slugger) emits it
   *  from "Pattern: <title>", e.g. 'pattern-eval-gate-in-ci'. */
  id: string;
  /** Pattern name, exactly as the H2 states it (without the "Pattern: " prefix). */
  title: string;
  /** The pattern's home layer: the first "Layer NN" on its "Maps to:" line. */
  layer: PatternLayer;
  /** The second layer for dual-layer patterns ("Layer 01 … / Layer 02 …"). */
  secondaryLayer?: PatternLayer;
  /** The frameworks named on the "Maps to:" line, verbatim, layer token dropped. */
  mapsTo: readonly string[];
}

export const patterns: readonly PatternDef[] = [
  {
    id: 'pattern-policy-card',
    title: 'Policy Card',
    layer: 1,
    mapsTo: [
      'EU AI Act Art. 9',
      'ISO/IEC 42001',
      'NIST AI RMF (Govern)',
      'CSA AICM',
      'OWASP Agentic ASI02/ASI03',
    ],
  },
  {
    id: 'pattern-eval-gate-in-ci',
    title: 'Eval Gate in CI',
    layer: 3,
    mapsTo: [
      'EU AI Act Art. 15, Art. 55',
      'ISO/IEC 42001',
      'NIST AI RMF (Measure)',
      'OWASP Agentic ASI01/ASI02',
    ],
  },
  {
    id: 'pattern-adversarial-red-team-suite',
    title: 'Adversarial Red-Team Suite',
    layer: 3,
    mapsTo: [
      'EU AI Act Art. 9, Art. 15, Art. 55 (GPAI)',
      'ISO/IEC 42001',
      'NIST AI RMF (Measure)',
      'OWASP Agentic ASI01/ASI02',
    ],
  },
  {
    id: 'pattern-agent-registry',
    title: 'Agent Registry',
    layer: 2,
    mapsTo: [
      'EU AI Act Art. 49/71, Art. 11',
      'ISO/IEC 42001',
      'NIST AI RMF (Map)',
      'CSA AICM',
      'OWASP Agentic ASI10',
    ],
  },
  {
    id: 'pattern-aibom',
    title: 'AIBOM',
    layer: 2,
    mapsTo: [
      'EU AI Act Art. 11, Art. 53 (GPAI documentation)',
      'ISO/IEC 42001',
      'NIST AI RMF (Map)',
      'CSA AICM',
    ],
  },
  {
    id: 'pattern-model-card-as-control-evidence',
    title: 'Model Card as Control Evidence',
    layer: 2,
    mapsTo: [
      'EU AI Act Art. 11, Art. 13 (transparency)',
      'ISO/IEC 42001, ISO/IEC 42005',
      'NIST AI RMF (Map, Measure)',
    ],
  },
  {
    id: 'pattern-continuous-assurance-telemetry',
    title: 'Continuous Assurance Telemetry',
    layer: 5,
    mapsTo: [
      'EU AI Act Art. 72',
      'ISO/IEC 42001',
      'NIST AI RMF (Manage, Govern)',
      'CSA AICM',
    ],
  },
  {
    id: 'pattern-runtime-guardrail',
    title: 'Runtime Guardrail',
    layer: 4,
    mapsTo: [
      'EU AI Act Art. 14, Art. 15',
      'ISO/IEC 42001',
      'NIST AI RMF (Manage)',
      'OWASP Agentic ASI02/ASI03',
    ],
  },
  {
    id: 'pattern-kill-switch--circuit-breaker',
    title: 'Kill Switch / Circuit Breaker',
    layer: 4,
    mapsTo: [
      'EU AI Act Art. 14, Art. 15',
      'ISO/IEC 42001',
      'NIST AI RMF (Manage)',
      'CSA AICM',
      'OWASP Agentic ASI02/ASI10',
    ],
  },
  {
    id: 'pattern-incident-pipeline',
    title: 'Incident Pipeline',
    layer: 5,
    mapsTo: [
      'EU AI Act Art. 72, Art. 73, Art. 55 (GPAI)',
      'ISO/IEC 42001',
      'NIST AI RMF (Manage)',
    ],
  },
  {
    id: 'pattern-fria-as-code',
    title: 'FRIA-as-Code',
    layer: 1,
    secondaryLayer: 2,
    mapsTo: [
      'EU AI Act Art. 27 (FRIA), Art. 9',
      'GDPR Art. 35 (DPIA)',
      'ISO/IEC 42005',
      'NIST AI RMF (Map)',
    ],
  },
  {
    id: 'pattern-framework-crosswalk',
    title: 'Framework Crosswalk',
    layer: 1,
    secondaryLayer: 5,
    mapsTo: [
      'EU AI Act (cross-cutting)',
      'ISO/IEC 42001',
      'NIST AI RMF (Govern)',
      'CSA AICM',
      'OWASP Agent Control Standard',
    ],
  },
  {
    id: 'pattern-machine-readable-evidence-oscal',
    title: 'Machine-Readable Evidence (OSCAL)',
    layer: 5,
    mapsTo: [
      'EU AI Act Art. 12, Art. 17, Art. 72',
      'ISO/IEC 42001',
      'NIST AI RMF (Manage, Govern)',
    ],
  },
  {
    id: 'pattern-agent-identity--scoped-credentials',
    title: 'Agent Identity & Scoped Credentials',
    layer: 4,
    mapsTo: [
      'EU AI Act Art. 12, Art. 14, Art. 15',
      'ISO/IEC 42001',
      'NIST AI RMF (Manage)',
      'CSA AICM',
      'OWASP Agentic ASI03',
    ],
  },
  {
    id: 'pattern-human-in-the-loop-gate',
    title: 'Human-in-the-loop Gate',
    layer: 4,
    mapsTo: [
      'EU AI Act Art. 14',
      'ISO/IEC 42001',
      'NIST AI RMF (Manage)',
      'OWASP Agentic ASI02',
    ],
  },
  {
    id: 'pattern-shadow-ai-discovery',
    title: 'Shadow-AI Discovery',
    layer: 2,
    mapsTo: [
      'EU AI Act Art. 49/71',
      'ISO/IEC 42001',
      'NIST AI RMF (Map)',
      'CSA AICM',
      'OWASP Agentic ASI10',
    ],
  },
  {
    id: 'pattern-vendor--model-due-diligence-gate',
    title: 'Vendor / Model Due-Diligence Gate',
    layer: 2,
    secondaryLayer: 5,
    mapsTo: [
      'EU AI Act Art. 25 (value-chain responsibilities), Art. 26 (deployer duties), Art. 27 (FRIA), Art. 53 (GPAI documentation)',
      'ISO/IEC 42001 Annex A.10',
      'GPAI Code of Practice',
      'NIST AI RMF (Map, Govern)',
    ],
  },
] as const;

/** Patterns whose home layer is `n`, in catalogue order. */
export function patternsForLayer(n: PatternLayer): PatternDef[] {
  return patterns.filter((pattern) => pattern.layer === n);
}
