// patterns.ts: the typed index of the reusable patterns catalogued in chapter 05.
// Each pattern's full text lives in its own file, bok/patterns/<slug>.md (the
// `patterns` content collection, rendered at /patterns/<slug>); chapter 05
// (bok/05-patterns.md) is the catalogue that keeps one "## Pattern: <title>"
// section per pattern, with a summary and a link, so every published
// /bok/patterns#pattern-* anchor still resolves. This index draws the
// pattern-map infographic (five stack layers, each holding the patterns that
// live in it: see scripts/figures-build.mjs and src/data/figures.ts), the map
// branch, the /patterns index and the prev/next order of the pattern pages.
//
// Each entry is faithful to the pattern file: `id` is the anchor rehype-slug
// emits for the pattern's H2 in the catalogue ("## Pattern: <title>" ->
// "pattern-<slug>"); `slug` is the page id and file name; `layer` is the FIRST
// layer named on the pattern's "Maps to:" line, and `secondaryLayer` the second
// one for the three dual-layer patterns; `mapsTo` lists the frameworks named on
// that line, verbatim, with the trailing "Layer NN …" token dropped. The array
// order is the catalogue order (the files' `order` frontmatter). No pattern,
// framework or layer appears here that the pattern files do not state.
//
// KEEP IN SYNC: 33 patterns. When a pattern is added, add its file under
// bok/patterns/, its "## Pattern:" section to chapter 05 and its entry here:
// src/lib/pattern-pages.ts fails the build when the three disagree, and
// tests/figures.spec.ts fails when the count of "## Pattern:" headings in
// chapter 05 differs from the number of entries below.

export type PatternLayer = 1 | 2 | 3 | 4 | 5;

export interface PatternDef {
  /** Anchor id of the pattern's H2, as rehype-slug (github-slugger) emits it
   *  from "Pattern: <title>", e.g. 'pattern-eval-gate-in-ci'. */
  id: string;
  /** Page id and file name: /patterns/<slug>, bok/patterns/<slug>.md. */
  slug: string;
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
    slug: 'policy-card',
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
    slug: 'eval-gate-in-ci',
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
    slug: 'adversarial-red-team-suite',
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
    slug: 'agent-registry',
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
    slug: 'aibom',
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
    slug: 'model-card-as-control-evidence',
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
    slug: 'continuous-assurance-telemetry',
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
    slug: 'runtime-guardrail',
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
    slug: 'kill-switch-circuit-breaker',
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
    slug: 'incident-pipeline',
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
    slug: 'fria-as-code',
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
    slug: 'framework-crosswalk',
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
    slug: 'machine-readable-evidence-oscal',
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
    slug: 'agent-identity-scoped-credentials',
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
    slug: 'human-in-the-loop-gate',
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
    slug: 'shadow-ai-discovery',
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
    slug: 'vendor-model-due-diligence-gate',
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
  // Block w2-patterns-a (v0.5.0): eight development-side patterns, catalogue
  // order 18 to 25 (intake, threat model, data rights and admission, fairness,
  // explanation, model integrity, claims).
  {
    id: 'pattern-use-case-intake--risk-tiering',
    slug: 'use-case-intake-risk-tiering',
    title: 'Use-Case Intake & Risk Tiering',
    layer: 1,
    secondaryLayer: 2,
    mapsTo: [
      'EU AI Act Art. 3(12), Art. 5, Art. 6(3)–(4), Art. 49(2), Annex III',
      'ISO/IEC 42001 A.5.2, A.9.4',
      'NIST AI RMF (Govern 1.3, 1.6; Map 1.1, 1.5, 5.1)',
    ],
  },
  {
    id: 'pattern-ai-threat-model',
    slug: 'ai-threat-model',
    title: 'AI Threat Model',
    layer: 1,
    secondaryLayer: 3,
    mapsTo: [
      'EU AI Act Art. 15(5), Art. 55(1)(d)',
      'ISO/IEC 42001 A.6.2.2, A.6.2.4',
      'NIST AI RMF (Map 5.1; Measure 2.7)',
      'OWASP LLM01:2026, LLM05:2026',
      'OWASP Agentic ASI02/ASI03/ASI04',
      'MITRE ATLAS',
    ],
  },
  {
    id: 'pattern-training-data-rights-ledger',
    slug: 'training-data-rights-ledger',
    title: 'Training-Data Rights Ledger',
    layer: 2,
    mapsTo: [
      'EU AI Act Art. 10(2)(b), Art. 53(1)(c)–(d)',
      'Directive (EU) 2019/790 Art. 4(3)',
      'GDPR Art. 5(1)(b), Art. 6(4)',
      'ISO/IEC 42001 A.7.3, A.7.5',
      'NIST AI RMF (Govern 6.1; Map 4.1)',
    ],
  },
  {
    id: 'pattern-dataset-admission-gate',
    slug: 'dataset-admission-gate',
    title: 'Dataset Admission Gate',
    layer: 1,
    secondaryLayer: 2,
    mapsTo: [
      'EU AI Act Art. 10(2)–(4), Art. 4a',
      'GDPR Art. 5(1)(b), Art. 6(4)',
      'ISO/IEC 42001 A.7.2, A.7.4, A.7.5, A.7.6',
      'NIST AI RMF (Map 2.3, 4.1)',
      'OWASP LLM05:2026',
    ],
  },
  {
    id: 'pattern-fairness-eval-suite',
    slug: 'fairness-eval-suite',
    title: 'Fairness Eval Suite',
    layer: 3,
    mapsTo: [
      'EU AI Act Art. 10(2)(f)–(g), Art. 13(3)(b)(v), Art. 15(4), Art. 4a',
      'NYC Local Law 144',
      '29 CFR 1607.4(D)',
      'ISO/IEC 42001 A.5.4, A.6.2.4',
      'ISO/IEC TR 24027',
      'NIST AI RMF (Measure 2.11)',
    ],
  },
  {
    id: 'pattern-explanation-artefact',
    slug: 'explanation-artefact',
    title: 'Explanation Artefact',
    layer: 4,
    secondaryLayer: 5,
    mapsTo: [
      'EU AI Act Art. 86, Art. 26(11), Art. 13(3)(b)(iv)',
      'GDPR Art. 15(1)(h), Art. 22',
      'Regulation B (12 CFR 1002.9)',
      'ISO/IEC 42001 A.8.2',
      'NIST AI RMF (Measure 2.8, 2.9)',
    ],
  },
  {
    id: 'pattern-model-artefact-integrity',
    slug: 'model-artefact-integrity',
    title: 'Model Artefact Integrity',
    layer: 2,
    secondaryLayer: 4,
    mapsTo: [
      'EU AI Act Art. 15(5), Art. 55(1)(d)',
      'ISO/IEC 42001 A.6.2.5, A.10.3',
      'NIST AI RMF (Govern 6.1; Manage 3.2; Measure 2.7)',
      'OWASP LLM04:2026',
      'OWASP Agentic ASI04',
      'MITRE ATLAS',
    ],
  },
  {
    id: 'pattern-claims-substantiation-gate',
    slug: 'claims-substantiation-gate',
    title: 'Claims Substantiation Gate',
    layer: 5,
    secondaryLayer: 3,
    mapsTo: [
      'EU AI Act Art. 3(12), Art. 13(3)(b)(ii), Art. 15(3)',
      'FTC Act s. 5',
      'Directive 2005/29/EC Art. 5',
      'DMCC Act 2024 s. 225',
      'ISO/IEC 42001 A.8.2, A.8.5',
      'NIST AI RMF (Measure 2.3, 2.5)',
    ],
  },
  // Block w2-patterns-b (v0.5.0): eight patterns on the deployment and use
  // side, catalogue order 26 to 33 (their files' `order` frontmatter), after
  // the development-side patterns of w2-patterns-a.
  {
    id: 'pattern-decision-notice--contest-path',
    slug: 'decision-notice-contest-path',
    title: 'Decision Notice & Contest Path',
    layer: 4,
    secondaryLayer: 5,
    mapsTo: [
      'EU AI Act Art. 26(11), Art. 86',
      'GDPR Art. 13(2)(f), Art. 15(1)(h), Art. 22',
      'UK GDPR Arts. 22A–22D',
      'ECOA / Regulation B 12 CFR 1002.9',
      'ISO/IEC 42001 A.8.2, A.9.2',
      'NIST AI RMF MEASURE 3.3, MANAGE 4.1, MAP 3.5',
    ],
  },
  {
    id: 'pattern-rights-requests-against-models',
    slug: 'rights-requests-against-models',
    title: 'Rights Requests Against Models',
    layer: 2,
    secondaryLayer: 5,
    mapsTo: [
      'GDPR Art. 12(3), Arts. 15–17, Art. 21',
      'EU AI Act Art. 26(6)',
      'ISO/IEC 42001 A.7',
      'NIST AI RMF MEASURE 2.10, GOVERN 1.1',
      'OWASP LLM02:2026',
    ],
  },
  {
    id: 'pattern-sanctioned-ai-gateway',
    slug: 'sanctioned-ai-gateway',
    title: 'Sanctioned AI Gateway',
    layer: 4,
    secondaryLayer: 2,
    mapsTo: [
      'EU AI Act Art. 4',
      'GDPR Art. 5(1)(c)',
      'ISO/IEC 42001 A.2, A.9.2, A.10.3',
      'NIST AI RMF GOVERN 2.2, GOVERN 6.1, MANAGE 3.1',
      'OWASP LLM02:2026',
    ],
  },
  {
    id: 'pattern-staged-rollout-with-rollback-criteria',
    slug: 'staged-rollout-rollback-criteria',
    title: 'Staged Rollout with Rollback Criteria',
    layer: 4,
    mapsTo: [
      'EU AI Act Art. 26(5), Art. 60',
      'ISO/IEC 42001 A.6.2.5, A.6.2.6',
      'NIST AI RMF MANAGE 1.1, MEASURE 2.3, MANAGE 2.4',
    ],
  },
  {
    id: 'pattern-drift--fairness-monitor',
    slug: 'drift-fairness-monitor',
    title: 'Drift & Fairness Monitor',
    layer: 4,
    secondaryLayer: 5,
    mapsTo: [
      'EU AI Act Art. 4a, Art. 15(4), Art. 26(5), Art. 72',
      'NYC Local Law 144',
      'ISO/IEC 42001 A.5.4, A.6.2.6',
      'NIST AI RMF MEASURE 2.4, MEASURE 2.11, MEASURE 3.1, MANAGE 4.1',
    ],
  },
  {
    id: 'pattern-downstream-use-register',
    slug: 'downstream-use-register',
    title: 'Downstream Use Register',
    layer: 2,
    secondaryLayer: 1,
    mapsTo: [
      'EU AI Act Art. 3(13), Art. 9(2)(b), Art. 25(1)(c), Art. 50(2)',
      'ISO/IEC 42001 A.8.2, A.9.4, A.10.4',
      'NIST AI RMF MAP 1.1, MAP 3.3, MANAGE 1.4',
      'OWASP LLM10:2026, OWASP Agentic ASI08',
    ],
  },
  {
    id: 'pattern-disclosure--notification-pipeline',
    slug: 'disclosure-notification-pipeline',
    title: 'Disclosure & Notification Pipeline',
    layer: 5,
    secondaryLayer: 2,
    mapsTo: [
      'EU AI Act Art. 26(5), Art. 26(7), Art. 26(11), Art. 50',
      'GDPR Art. 33, Art. 34',
      'Korea AI Basic Act Art. 31',
      'ISO/IEC 42001 A.8.2, A.8.3, A.8.4, A.8.5',
      'NIST AI RMF MANAGE 4.3, GOVERN 4.2, GOVERN 5.1',
    ],
  },
  {
    id: 'pattern-deactivation-localisation--retirement-runbook',
    slug: 'deactivation-localisation-retirement-runbook',
    title: 'Deactivation, Localisation & Retirement Runbook',
    layer: 4,
    secondaryLayer: 2,
    mapsTo: [
      'EU AI Act Art. 5, Art. 18, Art. 20, Art. 26(5), Art. 26(6), Art. 79',
      'ISO/IEC 42001 A.6.2.5, A.6.2.6',
      'NIST AI RMF GOVERN 1.7, MANAGE 2.4, MANAGE 4.1',
      'OWASP Agentic ASI10',
    ],
  },
] as const;

/** Patterns whose home layer is `n`, in catalogue order. */
export function patternsForLayer(n: PatternLayer): PatternDef[] {
  return patterns.filter((pattern) => pattern.layer === n);
}

/** Look up a pattern by its page slug (/patterns/<slug>). */
export function getPatternBySlug(slug: string): PatternDef | undefined {
  return patterns.find((pattern) => pattern.slug === slug);
}

/** The pattern's own page. */
export function patternPath(pattern: Pick<PatternDef, 'slug'>): string {
  return `/patterns/${pattern.slug}`;
}

/** The pattern's section in the chapter 05 catalogue (the published anchor). */
export function patternCatalogueHref(pattern: Pick<PatternDef, 'id'>): string {
  return `/bok/patterns#${pattern.id}`;
}
