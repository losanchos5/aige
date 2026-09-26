// controls/assurance-and-evidence.ts: the Assurance and Evidence Control
// Profile, v0.1 (draft). Twelve reference controls, AIGE-CTL-ASSURE-001 to 012,
// for how an AI system is tested before release, how every control leaves
// evidence and keeps it, and how the model artefacts and bill of materials a
// release ships with can be proved to be what was built. Each control is
// derived (`depth: 'derived'`) from material the site already publishes, named
// in `derivedFrom`, and adds nothing that material does not say:
//
//   patterns  -> eval-gate-in-ci, continuous-assurance-telemetry,
//                machine-readable-evidence-oscal, model-artefact-integrity, aibom
//                (bok/patterns/<slug>.md, the chapter 05 catalogue)
//   schemas   -> test-plan, eval-result, test-report, evidence-record,
//                control-observation, ai-system-register-entry (public/schemas):
//                a required field or a stated rule of the schema becomes the
//                evidence or a failure mode, never a new requirement
//   chapters  -> 14 (test plan, go/no-go gate, reproducibility, technical file,
//                record keeping), 18 (post-market monitoring; Arts. 18 and 19)
//                and 22 (clause 9 of ISO/IEC 42001 as one evidence store
//                answering internal audit; the Statement of Applicability)
//
// Mappings carry only ids the site already publishes: obligations the pattern
// or schema cites (../frameworks.ts), ISO/IEC 42001 Annex A ids (../threats.ts;
// the clause-9 references the schemas and chapter 22 cite go in `other`), NIST
// AI RMF subcategories only where the official text (../nist-ai-rmf.ts) matches
// the control, OWASP and ATLAS rows the pattern names, and AIUC-1 ids whose
// public page, opened on 2026-09-26, plainly covers the control's objective (no
// affiliation with AIUC; retired requirements are never mapped). References
// reuse rows the patterns and chapters already cite (sources/SOURCES.md).
//
// Where the material states no failure response, the control says so; where it
// states no check, `verification` stays empty. The environment a model is
// evaluated in (./evaluation-environment.ts, above all EVAL-008 and EVAL-009)
// and agent-specific runtime controls (./agent-runtime.ts) are cross-referenced,
// not repeated.
//
// Draft control specifications, open for technical review; illustrative, not a
// claim of conformity, not legal advice. Types and rules: ./index.ts.
import type { Control, ControlProfile, ObservationExample } from './index';
import type { Source } from '../../lib/sources';
import { threatSources, SRC } from '../threats';
import { getPatternBySlug } from '../patterns';
import { site } from '../site';
import { AIUC1_REQUIREMENTS } from './evaluation-environment';

const PROFILE = 'assurance-and-evidence';

export const assuranceAndEvidenceProfile: ControlProfile = {
  slug: PROFILE,
  title: 'Assurance and Evidence Control Profile',
  shortTitle: 'Assurance and evidence',
  version: '0.1',
  status: 'draft',
  reviewerStatus: 'open',
  summary:
    'Reference controls for testing an AI system before release, for the evidence every control writes and keeps, and for the integrity of the model artefacts and bill of materials a release ships with. Every control is a draft: it restates site material, carries no verification procedure yet and is open for technical review.',
  scope:
    'AI systems and models from the test plan to the release gate, the evidence records every control emits and how long they are kept, and the model artefacts and AI bill of materials of each build. The environment a model or agent is evaluated in is covered by the evaluation environment profile, and agent-specific runtime controls by the agent runtime profile.',
  published: '2026-09-26',
  updated: '2026-09-26',
  authors: ['jorge-garcia-aibar'],
  reviewers: [],
  changelog: [
    {
      version: '0.1',
      date: '2026-09-26',
      note: 'First draft, derived from the Eval Gate in CI, Continuous Assurance Telemetry, Machine-Readable Evidence (OSCAL), Model Artefact Integrity and AIBOM patterns, six record schemas and chapters 14, 18 and 22: 12 controls, open for technical review.',
    },
  ],
  issueTemplate: 'control-review.yml',
};

// ---------------------------------------------------------------------------
// References. The site material each control restates first (pattern pages and
// chapter sections), then external rows the patterns and chapters already cite.

const PUBLISHER = `${site.name} (${site.author})`;

/** A pattern page of the chapter 05 catalogue, as a numbered reference. */
function pattern(slug: string): Source {
  const def = getPatternBySlug(slug);
  if (!def) throw new Error(`assurance-and-evidence.ts: unknown pattern ${slug}`);
  return {
    title: `Pattern: ${def.title}`,
    gloss: `AI Governance Engineering Body of Knowledge v${site.bokVersion}, chapter 05 pattern catalogue`,
    publisher: PUBLISHER,
    date: '2026-09',
    url: `${site.url}/patterns/${slug}`,
    verified: 'primary',
  };
}

/** A section of a Body of Knowledge chapter, as a numbered reference. */
function chapter(slug: string, number: string, title: string, anchor: string, heading: string): Source {
  return {
    title,
    gloss: `AI Governance Engineering Body of Knowledge v${site.bokVersion}, chapter ${number}, section "${heading}"`,
    publisher: PUBLISHER,
    date: '2026-09',
    url: `${site.url}/bok/${slug}#${anchor}`,
    verified: 'primary',
  };
}

const ch14 = (anchor: string, heading: string) =>
  chapter('governing-development', '14', 'Governing AI development', anchor, heading);
const ch18 = (anchor: string, heading: string) => chapter('eu-ai-act', '18', 'The EU AI Act in one pass', anchor, heading);
const ch22 = (anchor: string, heading: string) =>
  chapter('principles-and-standards', '22', 'Principles, soft law and standards', anchor, heading);

const P = {
  evalGate: pattern('eval-gate-in-ci'),
  telemetry: pattern('continuous-assurance-telemetry'),
  oscal: pattern('machine-readable-evidence-oscal'),
  integrity: pattern('model-artefact-integrity'),
  aibom: pattern('aibom'),
} as const;

const CH14 = {
  testPlan: ch14('a-test-plan-before-the-first-run', 'A test plan before the first run'),
  validity: ch14('statistical-validity-of-evals', 'Statistical validity of evals'),
  reproducibility: ch14('reproducibility-and-linked-versioning', 'Reproducibility and linked versioning'),
  goNoGo: ch14('the-gono-go-gate', 'The go/no-go gate'),
  annexIv: ch14('annex-iv-element-by-element', 'Annex IV, element by element'),
  recordKeeping: ch14('record-keeping', 'Record keeping'),
} as const;

const CH18 = {
  conformity: ch18(
    'conformity-assessment-declaration-marking-and-registration',
    'Conformity assessment, declaration, marking and registration',
  ),
  postMarket: ch18(
    'post-market-monitoring-and-serious-incidents-articles-72-and-73',
    'Post-market monitoring and serious incidents (Articles 72 and 73)',
  ),
} as const;

const CH22 = {
  trio: ch22('the-management-system-trio', 'The management-system trio'),
  integrating: ch22('integrating-with-27001-27701-and-9001', 'Integrating with 27001, 27701 and 9001'),
} as const;

/** Rows shared with the threat bridge (../threats.ts). */
const OWASP_LLM: Source = threatSources[SRC.llm2026 - 1];
const OWASP_AGENTIC: Source = threatSources[SRC.asi - 1];
const ATLAS: Source = threatSources[SRC.atlas - 1];

const AI_ACT: Source = {
  title: 'Regulation (EU) 2024/1689 (AI Act), consolidated text of 2026-07-27 as amended by Regulation (EU) 2026/1744',
  gloss: 'the articles each control maps to, as chapters 14 and 18 restate them',
  publisher: 'Publications Office of the EU (EUR-Lex)',
  date: '2026-07-27',
  url: 'https://eur-lex.europa.eu/eli/reg/2024/1689/2026-07-27/eng',
  verified: 'primary',
};

const NIST_AI_RMF: Source = {
  title: 'Artificial Intelligence Risk Management Framework (AI RMF 1.0), NIST AI 100-1',
  gloss: 'MEASURE and MANAGE subcategories cited by id, mapped only where the official text matches the control',
  publisher: 'NIST',
  date: '2023-01-26',
  url: 'https://nvlpubs.nist.gov/nistpubs/ai/NIST.AI.100-1.pdf',
  verified: 'primary',
};

const ISO_42001: Source = {
  title: 'ISO/IEC 42001:2023, AI management systems',
  gloss: 'Annex A control ids and clause numbers cited by number and short title only; the text of the standard was not opened',
  publisher: 'ISO/IEC',
  date: '2023-12',
  url: 'https://www.iso.org/standard/81230.html',
  verified: 'secondary',
};

const OSCAL_LAYERS: Source = {
  title: 'OSCAL Layers and Models',
  gloss:
    'control layer (catalog, profile), implementation layer (component-definition, system-security-plan) and assessment layer (assessment-plan, assessment-results, POA&M), with traceability from a result to the control it tested',
  publisher: 'NIST',
  date: '2026',
  url: 'https://pages.nist.gov/OSCAL/learn/concepts/layer/',
  verified: 'primary',
};

const OSCAL_AI_PREPRINT: Source = {
  title: 'Making AI Compliance Evidence Machine-Readable (arXiv 2604.13767)',
  gloss: 'one proposed approach, a single preprint: OSCAL with sixteen property extensions for AI',
  publisher: 'UC3M',
  date: '2026-04-15',
  url: 'https://arxiv.org/abs/2604.13767',
  verified: 'primary',
};

const OMS: Source = {
  title: 'An Introduction to the OpenSSF Model Signing (OMS) Specification',
  gloss: 'detached signature over a manifest of file hashes, in the Sigstore bundle format; PKI-agnostic',
  publisher: 'OpenSSF',
  date: '2025-06-25',
  url: 'https://openssf.org/blog/2025/06/25/an-introduction-to-the-openssf-model-signing-oms-specification/',
  verified: 'primary',
};

const MODEL_TRANSPARENCY: Source = {
  title: 'model-transparency: supply chain security for ML',
  gloss: 'signs a statement of file paths and digests through Sigstore or conventional keys; verification recomputes the hashes',
  publisher: 'Sigstore (GitHub)',
  date: '2026',
  url: 'https://github.com/sigstore/model-transparency',
  verified: 'primary',
};

const SLSA: Source = {
  title: 'SLSA specification v1.2, Build track basics',
  gloss: 'Build L1 provenance exists, L2 hosted build platform, L3 hardened builds; provenance describes what built the artefact, by what process and from which top-level inputs',
  publisher: 'OpenSSF SLSA project',
  date: 'n.d. (accessed 2026-09-24)',
  url: 'https://slsa.dev/spec/v1.2/build-track-basics',
  verified: 'primary',
};

const PICKLE: Source = {
  title: 'pickle: Python object serialization',
  gloss: '"The pickle module is not secure. Only unpickle data you trust."',
  publisher: 'Python Software Foundation',
  date: '2026',
  url: 'https://docs.python.org/3/library/pickle.html',
  verified: 'primary',
};

const HF_PICKLE: Source = {
  title: 'Pickle Scanning',
  gloss: 'arbitrary code execution when loading pickle files; the Hub\'s pickle-import scan "is not 100% foolproof"',
  publisher: 'Hugging Face Hub documentation',
  date: 'n.d. (accessed 2026-09-24)',
  url: 'https://huggingface.co/docs/hub/security-pickle',
  verified: 'primary',
};

const SAFETENSORS: Source = {
  title: 'Safetensors',
  gloss: '"a new simple format for storing tensors safely (as opposed to pickle)"',
  publisher: 'Hugging Face documentation',
  date: 'n.d. (accessed 2026-09-24)',
  url: 'https://huggingface.co/docs/safetensors/index',
  verified: 'primary',
};

const TORCH_LOAD: Source = {
  title: 'torch.load',
  gloss: 'default weights_only=True; "Never load data from an untrusted source"',
  publisher: 'PyTorch documentation (2.14)',
  date: 'n.d. (accessed 2026-09-24)',
  url: 'https://docs.pytorch.org/docs/stable/generated/torch.load.html',
  verified: 'primary',
};

const OWASP_AIBOM_GENERATOR: Source = {
  title: 'Evolving AI Transparency: the AIBOM generator\'s new home at OWASP',
  gloss: 'OWASP AIBOM generator, CycloneDX output',
  publisher: 'OWASP GenAI Security Project',
  date: '2025-12-18',
  url: 'https://genai.owasp.org/2025/12/18/evolving-ai-transparency-the-journey-of-the-aibom-generator-and-its-new-home-at-owasp/',
  verified: 'primary',
};

// ---------------------------------------------------------------------------
// Shared text

/** First open question of every control: the derivation invents no test. */
export const VERIFICATION_TODO =
  'Verification procedure to be specified: the derivation adds no check its source material does not state; requires technical review.';

/** The failure response of a control whose source material states none. */
const RESPONSE_TO_SPECIFY = {
  effect: 'alert',
  text: 'To be specified: the source material states no failure response for this control.',
} as const;

/** ISO/IEC 42001 clause 9.1, which the evidence-record and control-observation schemas cite. */
const ISO_9_1 = {
  framework: 'ISO/IEC 42001:2023',
  ref: '9.1',
  note: 'Performance evaluation: monitoring and measurement (cited by the evidence-record and control-observation schemas)',
} as const;

// ---------------------------------------------------------------------------
// Example observations: none, since no control of this profile is specified.

export const observationExamples: readonly ObservationExample[] = [];

// ---------------------------------------------------------------------------
// Controls

/** Fields every control of this version shares. */
const base = {
  profile: PROFILE,
  version: '0.1',
  status: 'draft',
  reviewerStatus: 'open',
  depth: 'derived',
  seeds: [],
  verification: [],
} as const;

export const assuranceAndEvidenceControls: readonly Control[] = [
  {
    ...base,
    id: 'AIGE-CTL-ASSURE-001',
    title: 'Test Plan Frozen Before Evaluation',
    derivedFrom: [
      { kind: 'schema', ref: 'test-plan' },
      { kind: 'pattern', ref: 'eval-gate-in-ci' },
      { kind: 'chapter', ref: 'governing-development' },
    ],
    objective:
      'The test plan (suites, metrics, thresholds with their link to the error appetite, datasets, subgroups, sample sizes and the number of repeated runs) is frozen in the repository before evaluation starts, and a change to it after results are known is a diff with an approver.',
    failureModes: [
      "Evaluation starts before the plan's metrics, thresholds, datasets, subgroups, sample sizes and number of repeated runs are fixed.",
      'A metric or threshold changes after the results are known with no approved diff: metric shopping, choosing the metric that passes after seeing all of them.',
      'A planned suite names no failure mode, or its threshold has no link to the error appetite.',
      'A test category is missing from the plan with no reason given in its scope.',
    ],
    scope:
      'Every system or model tested before a release, and every change to its test plan. The suites themselves, and whether a result is valid, are covered by AIGE-CTL-ASSURE-002 and AIGE-CTL-EVAL-009.',
    enforcementPoints: ['pre_merge'],
    evidence: [
      {
        artefact: 'Test plan frozen in the repository before the first run: suites with metric, threshold, failure mode and whether a failure blocks, exit criteria, owner and approver',
        schemaId: 'test-plan',
        layer: 3,
      },
    ],
    failureResponse: {
      effect: 'require_approval',
      text: 'A change to the plan after results are known is a diff that needs an approver before it takes effect.',
    },
    layer: 3,
    patterns: ['eval-gate-in-ci'],
    mappings: {
      obligations: ['AIGE-OBL-EUAIA-ART9', 'AIGE-OBL-NISTRMF-MEASURE', 'AIGE-OBL-ISO42001-A6'],
      iso42001: ['A.6.2.4'],
      nistAiRmf: ['MEASURE 2.1'],
      owasp: [],
    },
    references: [CH14.testPlan, P.evalGate, AI_ACT, NIST_AI_RMF, ISO_42001],
    implementationNotes: [
      'The EU AI Act asks for testing against "prior defined metrics and probabilistic thresholds" (Art. 9(8)); chapter 14 reads the operative words as prior defined and freezes the plan before evaluation starts.',
      "Build the plan from the chapter's test-type matrix: one suite per test type the system needs (validation, robustness, security and adversarial, bias and fairness, regression and the rest), each behind the eval gate; the schema asks for a reason in the scope for any category left out.",
    ],
    openQuestions: [
      VERIFICATION_TODO,
      'Which changes to a frozen plan (a new suite, a larger sample, a stricter threshold) may proceed without a new approval, and which reopen the plan?',
    ],
  },
  {
    ...base,
    id: 'AIGE-CTL-ASSURE-002',
    title: 'Release Blocked Below the Eval Threshold',
    derivedFrom: [
      { kind: 'pattern', ref: 'eval-gate-in-ci' },
      { kind: 'schema', ref: 'eval-result' },
      { kind: 'chapter', ref: 'governing-development' },
    ],
    objective:
      'A model or agent ships only after a versioned eval suite, with at least one capability and one adversarial eval, passes in the pipeline above a documented threshold that traces to a named failure mode or obligation, and every run leaves a structured result filed against the registry entry of the version tested.',
    failureModes: [
      'A model or agent is retrained, re-prompted or given a new tool and ships with no eval run for its version.',
      'A result below the threshold does not fail the pipeline, so the release ships and a finding is filed instead.',
      'A threshold traces to no named failure mode or obligation.',
      'A result exists only as a pasted score or a slide, not as a structured record (suite id, model version, score, threshold, result, timestamp) filed against the registry entry.',
    ],
    scope:
      'Models and agents that change (retrained, re-prompted or given a new tool) and ship through a pipeline that already runs functional tests. The trajectory evals of an agent are AIGE-CTL-AGENT-013, and the checks that a result is valid enough to gate a release are AIGE-CTL-EVAL-009.',
    enforcementPoints: ['pre_merge'],
    evidence: [
      {
        artefact: 'Eval result of each run: suite id, model version, score, threshold, pass or fail and timestamp, filed against the registry entry',
        schemaId: 'eval-result',
        layer: 3,
      },
    ],
    failureResponse: {
      effect: 'deny',
      text: 'A result below the threshold fails the pipeline, and the release does not ship until it is fixed.',
    },
    layer: 3,
    patterns: ['eval-gate-in-ci', 'adversarial-red-team-suite'],
    mappings: {
      obligations: ['AIGE-OBL-EUAIA-ART15', 'AIGE-OBL-EUAIA-ART55', 'AIGE-OBL-NISTRMF-MEASURE', 'AIGE-OBL-OWASP-AGENTIC'],
      iso42001: ['A.6.2.4'],
      nistAiRmf: ['MEASURE 2.3'],
      owasp: ['asi01', 'asi02'],
      aiuc1: ['C002'],
    },
    references: [P.evalGate, CH14.validity, CH14.reproducibility, OWASP_AGENTIC, AI_ACT, NIST_AI_RMF, ISO_42001, AIUC1_REQUIREMENTS],
    implementationNotes: [
      'Version the suite alongside the model and run it in CI (for example with Inspect, promptfoo, Garak or Giskard; illustrative); the security suite is the Adversarial Red-Team Suite.',
      'Size the suite from the threshold, not from the time available: chapter 14 shows a 0.96 pass rate on 200 cases with a 95% interval of about 0.933 to 0.987, which a 0.95 threshold sits inside, so the gate cannot tell a pass from a fail.',
      'Link the records both ways: model version to training record to eval results to release tag to the risk approvals that let it ship.',
    ],
    openQuestions: [
      VERIFICATION_TODO,
      'How should the gate treat a suite whose repeated runs straddle the threshold: rerun, enlarge the sample or block, given that the pattern warns against flaky gates?',
    ],
  },
  {
    ...base,
    id: 'AIGE-CTL-ASSURE-003',
    title: 'Signed Test Report Against the Plan',
    derivedFrom: [
      { kind: 'schema', ref: 'test-report' },
      { kind: 'pattern', ref: 'eval-gate-in-ci' },
      { kind: 'chapter', ref: 'governing-development' },
    ],
    objective:
      "Each test campaign ends in a dated, signed test report that sets the eval result of every planned suite against the frozen plan, records deviations and waivers, and concludes against the plan's exit criteria; the release gate does not open without a current one.",
    failureModes: [
      'A release goes ahead with no test report against the frozen plan, or with a stale one.',
      'A planned suite has no result in the report, or a deviation from the plan is not recorded.',
      'A failed suite is waived with no approving role recorded.',
      'The report is not signed off by the responsible role, or its conclusion does not follow from the results against the exit criteria.',
    ],
    scope:
      'Test campaigns whose results feed a release decision. The go/no-go record the release gate writes, and what else it reads, are out of scope; runs excluded or re-scored after validity checks are reported under AIGE-CTL-EVAL-009.',
    enforcementPoints: ['deploy'],
    evidence: [
      {
        artefact: 'Test report: the test plan executed, the eval result per planned suite, counts passed, failed and waived, deviations and waivers, conclusion and a dated sign-off by role',
        schemaId: 'test-report',
        layer: 3,
      },
    ],
    failureResponse: {
      effect: 'deny',
      text: 'The release gate refuses to open while the test report against the frozen plan is missing or stale.',
    },
    layer: 3,
    patterns: ['eval-gate-in-ci'],
    mappings: {
      obligations: ['AIGE-OBL-EUAIA-ART9', 'AIGE-OBL-EUAIA-ART11', 'AIGE-OBL-ISO42001-A6', 'AIGE-OBL-NISTRMF-MEASURE'],
      iso42001: ['A.6.2.4'],
      nistAiRmf: ['MEASURE 2.3'],
      owasp: [],
    },
    references: [CH14.goNoGo, CH14.testPlan, P.evalGate, AI_ACT, NIST_AI_RMF, ISO_42001],
    implementationNotes: [
      'The release gate reads the records the earlier gates produced; a test report against the frozen plan is one of them, and the gate writes a signed go/no-go record with its conditions, filed against the registry entry.',
      'Sign off by role, not by personal name, as the schema asks, and release in stages (shadow, canary, limited pilot, general availability), each with exit criteria from the test plan.',
    ],
    openQuestions: [
      VERIFICATION_TODO,
      'When a waiver in the report expires after release, is the release gated again or only the waived suite rerun?',
    ],
  },
  {
    ...base,
    id: 'AIGE-CTL-ASSURE-004',
    title: 'Common Signed Evidence Record',
    derivedFrom: [
      { kind: 'pattern', ref: 'continuous-assurance-telemetry' },
      { kind: 'schema', ref: 'evidence-record' },
      { kind: 'chapter', ref: 'patterns' },
    ],
    objective:
      "Every control writes a timestamped, signed record on one common schema (control id; subject as registry id and version; decision; metric, value and threshold; failure mode or obligation; input hash; actor; timestamp; signature) to one assurance store keyed on the registry id, and other tools' outputs are normalised into that shape on ingest.",
    failureModes: [
      "A control's decision leaves no record in the assurance store, or its record lacks the control id, the subject's registry id and version, the decision, the actor, the timestamp or the signature.",
      'Records from different tools keep their own shapes and cannot be joined on the registry id.',
      'A record cannot be shown to be unchanged, because it carries no signature, or to come from a given input, because it carries no input hash.',
    ],
    scope:
      'Every control of an AI system that decides something (policy verdicts, eval results, guardrail actions, identity events, admissions, go/no-go decisions), whatever tool runs it. What each control decides is set by the control itself.',
    enforcementPoints: ['runtime'],
    evidence: [
      {
        artefact: 'Evidence record of each control decision, signed and filed in the assurance store under the registry id',
        schemaId: 'evidence-record',
        layer: 5,
      },
    ],
    failureResponse: RESPONSE_TO_SPECIFY,
    layer: 5,
    patterns: ['continuous-assurance-telemetry'],
    mappings: {
      obligations: ['AIGE-OBL-EUAIA-ART12', 'AIGE-OBL-EUAIA-ART17', 'AIGE-OBL-EUAIA-ART72', 'AIGE-OBL-NISTRMF-MANAGE'],
      iso42001: [],
      nistAiRmf: [],
      owasp: [],
      other: [ISO_9_1],
    },
    references: [P.telemetry, AI_ACT, ISO_42001],
    implementationNotes: [
      "Fix the schema first, then normalise every tool's output into it on ingest, so heterogeneous sources compose into one store queryable by registry id.",
      'Where a record is a normalised copy of a fuller one (an eval result, a go/no-go record, an incident record), link the original with record_ref; keep evidence-bearing fields in the core record, not in extensions.',
    ],
    openQuestions: [
      VERIFICATION_TODO,
      "Which key signs a record that a third-party tool produced and the ingest pipeline normalised: the tool's, the pipeline's or both?",
    ],
  },
  {
    ...base,
    id: 'AIGE-CTL-ASSURE-005',
    title: 'Live Control Status from the Assurance Store',
    derivedFrom: [
      { kind: 'pattern', ref: 'continuous-assurance-telemetry' },
      { kind: 'schema', ref: 'evidence-record' },
      { kind: 'chapter', ref: 'eu-ai-act' },
    ],
    objective:
      'The status of each control is a live query over the records it emits to the assurance store, not a point-in-time attestation, so a control that stops firing or starts failing is visible as it happens, not at the next audit.',
    failureModes: [
      "A control's status rests on an attestation made when someone looked, although the model has since been retrained or an agent has gained a tool.",
      'A control stops firing and its status still shows it working until the next audit.',
      'The post-market monitoring plan of a high-risk system is a document, not the versioned configuration of the telemetry that collects the data.',
    ],
    scope:
      'Controls of AI systems in production whose decisions reach the assurance store, and, for high-risk systems, the post-market monitoring their provider runs under Art. 72. What a control decides, and the monitoring of model performance itself, are out of scope: the monitoring plan with its thresholds, owners and consequences is AIGE-CTL-DEPLOY-008.',
    enforcementPoints: ['runtime', 'periodic'],
    evidence: [
      {
        artefact: 'Evidence records each control emits to the assurance store, which the live status query of that control reads',
        schemaId: 'evidence-record',
        layer: 5,
      },
    ],
    failureResponse: {
      effect: 'alert',
      text: "A control that stops firing shows as failing within minutes (the pattern's illustrative dashboard tile goes red), not at the next audit.",
    },
    layer: 5,
    patterns: ['continuous-assurance-telemetry'],
    mappings: {
      obligations: ['AIGE-OBL-EUAIA-ART72', 'AIGE-OBL-NISTRMF-MANAGE', 'AIGE-OBL-NISTRMF-GOVERN', 'AIGE-OBL-CSA-AICM'],
      iso42001: [],
      nistAiRmf: ['MANAGE 4.1'],
      owasp: [],
    },
    references: [P.telemetry, CH18.postMarket, AI_ACT, NIST_AI_RMF],
    implementationNotes: [
      'Expose the current status of each control as a query over the store, for example a dashboard tile backed by a live query over the decisions the control emitted.',
      "For a high-risk system, chapter 18 treats Continuous Assurance Telemetry as the post-market monitoring system and the plan as its versioned configuration; the Commission's guidance and template for the plan are due by 2 Sep 2027 (Art. 72(3)).",
    ],
    openQuestions: [
      VERIFICATION_TODO,
      'How long may a control go without emitting a record before its status turns to failing, and should that window differ by control?',
    ],
  },
  {
    ...base,
    id: 'AIGE-CTL-ASSURE-006',
    title: 'Control Observations Filed Against Control Ids',
    derivedFrom: [
      { kind: 'schema', ref: 'control-observation' },
      { kind: 'pattern', ref: 'continuous-assurance-telemetry' },
    ],
    objective:
      'Each observation of a reference control is filed as a record naming the control id and version, the subject and its kind, what the control expects, what was observed, whether it held and when, and the evidence records it rests on, so a third party can check it without trusting the observer.',
    failureModes: [
      'An observation lists no evidence, so a third party has to trust the observer.',
      'An observation does not name the control version it was made against, so it cannot be read once the control changes.',
      'The observer is recorded as a person\'s name rather than a system or a role.',
      'A control that does not apply to a subject is recorded as passing, instead of not applicable with the reason in the notes.',
    ],
    scope:
      'Observations of the controls of the open control profiles on this site, whether an adapter, a test or a reviewer makes them.',
    enforcementPoints: ['runtime', 'periodic'],
    evidence: [
      {
        artefact: 'Control observation: control id and version, subject and kind, expected, observed, status, timestamp and the evidence it rests on',
        schemaId: 'control-observation',
        layer: 5,
      },
    ],
    failureResponse: RESPONSE_TO_SPECIFY,
    layer: 5,
    secondaryLayers: [4],
    patterns: ['continuous-assurance-telemetry', 'machine-readable-evidence-oscal'],
    mappings: {
      obligations: ['AIGE-OBL-EUAIA-ART12', 'AIGE-OBL-EUAIA-ART15', 'AIGE-OBL-EUAIA-ART17'],
      iso42001: [],
      nistAiRmf: [],
      owasp: [],
      other: [ISO_9_1],
    },
    references: [P.telemetry, P.oscal, AI_ACT, ISO_42001],
    implementationNotes: [
      'Make each piece of evidence checkable: where it is kept, a digest prefixed with the algorithm, and the schema it validates against when it is a structured record (for example evidence-record or eval-result).',
      'Sign the observation with a detached signature so it is tamper-evident in the evidence store; the evaluation environment profile publishes illustrative pass and fail observations of its specified controls.',
    ],
    openQuestions: [
      VERIFICATION_TODO,
      'Should an observation an adapter emits and one a reviewer records weigh the same when the status of a control is computed from them?',
    ],
  },
  {
    ...base,
    id: 'AIGE-CTL-ASSURE-007',
    title: 'Machine-Readable Evidence in OSCAL',
    derivedFrom: [
      { kind: 'pattern', ref: 'machine-readable-evidence-oscal' },
      { kind: 'chapter', ref: 'patterns' },
    ],
    objective:
      "Control results are emitted in a machine-readable standard format, OSCAL first (component-definition and assessment-results artefacts that trace each result back to the control it tested), and stored so that an auditor's question is answered by a query, not by collecting the evidence again.",
    failureModes: [
      'Evidence reaches an audit as a screenshot or as a document a person formatted and filed by hand.',
      'An assessment result cannot be traced back to the control it tested.',
      'Each audit collects the evidence again from scratch.',
    ],
    scope:
      'The results of the controls of an AI stack that already produces structured records, and the assurance function that answers auditors from them. The choice of AI-specific OSCAL extensions is left open.',
    enforcementPoints: ['runtime', 'periodic'],
    evidence: [
      { artefact: 'OSCAL assessment-results for each control result, with component definitions of the controls that produced them', layer: 5 },
      { artefact: 'Structured records the controls already produce, the starting point the pattern assumes (for example evidence records)', schemaId: 'evidence-record', layer: 5 },
    ],
    failureResponse: RESPONSE_TO_SPECIFY,
    layer: 5,
    patterns: ['machine-readable-evidence-oscal', 'continuous-assurance-telemetry'],
    mappings: {
      obligations: [
        'AIGE-OBL-EUAIA-ART12',
        'AIGE-OBL-EUAIA-ART17',
        'AIGE-OBL-EUAIA-ART72',
        'AIGE-OBL-NISTRMF-MANAGE',
        'AIGE-OBL-NISTRMF-GOVERN',
      ],
      iso42001: [],
      nistAiRmf: [],
      owasp: [],
    },
    references: [P.oscal, OSCAL_LAYERS, OSCAL_AI_PREPRINT, AI_ACT],
    implementationNotes: [
      "Build on OSCAL's native model first: the control layer (catalog, profile), the implementation layer (component-definition, system-security-plan) and the assessment layer (assessment-plan, assessment-results, POA&M), which traces a result back to the control it tested.",
      'AI-specific extensions are still forming: one 2026 preprint proposes sixteen property extensions; adopt them only where they fit, since the native assessment models carry most of the load today.',
      'An eval gate that writes an OSCAL assessment result on every run turns a request such as "all robustness evidence in Q3" into a filter over the store (the pattern\'s illustrative example).',
    ],
    openQuestions: [
      VERIFICATION_TODO,
      'Which OSCAL model should carry the result of an AI-specific control that no published catalogue defines: a local catalogue of these reference controls, or a property extension?',
    ],
  },
  {
    ...base,
    id: 'AIGE-CTL-ASSURE-008',
    title: 'Evidence Retention as Code',
    derivedFrom: [
      { kind: 'schema', ref: 'evidence-record' },
      { kind: 'chapter', ref: 'governing-development' },
      { kind: 'chapter', ref: 'eu-ai-act' },
    ],
    objective:
      "Each evidence class carries a retention rule keyed to its obligation (for a high-risk system, the technical documentation, QMS documentation and EU declaration for 10 years after placing on the market, and logs under the provider's control for at least six months, set by intended purpose); signed records go to write-once storage and a legal hold overrides deletion.",
    failureModes: [
      'An evidence class has no retention rule, or its rule is not keyed to the obligation it evidences.',
      'Automatically generated logs are deleted before six months, or the six-month floor is applied as a default whatever the intended purpose.',
      'A signed record sits on storage where it can be overwritten, or is deleted while a legal hold applies.',
      "Personal data in the logs is kept without reconciling the log retention rule with the GDPR's storage limitation.",
    ],
    scope:
      "Evidence records, logs and documentation of AI systems, above all high-risk systems whose provider keeps documentation under Art. 18 and logs under Art. 19. The deployer's parallel log duty (Art. 26(6), chapter 15) is AIGE-CTL-DEPLOY-010.",
    enforcementPoints: ['periodic'],
    evidence: [
      { artefact: 'Retention rule per evidence class, keyed to its obligation, with its storage and any legal hold', layer: 5 },
      {
        artefact: 'Signed evidence records kept on write-once storage',
        schemaId: 'evidence-record',
        layer: 5,
      },
    ],
    failureResponse: {
      effect: 'deny',
      text: 'A legal hold overrides deletion: a record under hold is not deleted when its retention period ends.',
    },
    layer: 5,
    patterns: ['machine-readable-evidence-oscal'],
    mappings: {
      obligations: ['AIGE-OBL-EUAIA-ART18', 'AIGE-OBL-EUAIA-ART19', 'AIGE-OBL-EUAIA-ART12'],
      iso42001: [],
      nistAiRmf: [],
      owasp: [],
      aiuc1: ['E015'],
    },
    references: [CH14.recordKeeping, CH18.conformity, AI_ACT, AIUC1_REQUIREMENTS],
    implementationNotes: [
      'Keep evidence in open formats (JSON, OSCAL): a 10-year horizon outlives most tools.',
      'Financial institutions keep the logs within their financial-services documentation (Art. 19); other law can set a period other than six months.',
    ],
    openQuestions: [
      VERIFICATION_TODO,
      "How should a write-once evidence store honour an erasure request for personal data inside a signed record without breaking the record's signature?",
    ],
  },
  {
    ...base,
    id: 'AIGE-CTL-ASSURE-009',
    title: 'Internal Audit Answered from the Evidence Store',
    derivedFrom: [
      { kind: 'pattern', ref: 'continuous-assurance-telemetry' },
      { kind: 'pattern', ref: 'machine-readable-evidence-oscal' },
      { kind: 'chapter', ref: 'principles-and-standards' },
    ],
    objective:
      'Internal audit of the AI management system is answered from one evidence store, the same one that answers internal audit for any management system run alongside ISO/IEC 42001, and each Annex A control listed as applicable points at the running control and the evidence stream that implement it.',
    failureModes: [
      'Internal audit collects evidence by hand for each management system instead of querying one evidence store.',
      'An Annex A control listed as applicable in the Statement of Applicability points at no running control or evidence stream, or an exclusion carries no justification or owner.',
      'The internal audit programme does not cover the AI controls.',
    ],
    scope:
      'Organisations that run an AI management system to ISO/IEC 42001, alone or with ISO/IEC 27001, ISO/IEC 27701 or ISO 9001. What internal audit tests and how management review runs are not derived here: chapter 22 names clause 9 only as one evidence store answering internal audit.',
    enforcementPoints: ['periodic'],
    evidence: [
      { artefact: 'Statement of Applicability generated from control metadata, each applicable control linked to its evidence stream, each exclusion with its justification and owner', layer: 5 },
      { artefact: 'Evidence records internal audit queries, filed under the registry id', schemaId: 'evidence-record', layer: 5 },
    ],
    failureResponse: RESPONSE_TO_SPECIFY,
    layer: 5,
    patterns: ['continuous-assurance-telemetry', 'machine-readable-evidence-oscal'],
    mappings: {
      obligations: [],
      iso42001: [],
      nistAiRmf: [],
      owasp: [],
      aiuc1: ['E008'],
      other: [
        {
          framework: 'ISO/IEC 42001:2023',
          ref: '9',
          note: 'Performance evaluation: one evidence store answering internal audit (clause heading as chapter 22 names it)',
        },
      ],
    },
    references: [CH22.integrating, CH22.trio, P.telemetry, P.oscal, ISO_42001, AIUC1_REQUIREMENTS],
    implementationNotes: [
      'Treat the Statement of Applicability as a generated file, not a document: each applicable Annex A control points at the running control and its evidence stream, and each exclusion carries its justification and an owner.',
      "Map each shared clause of the Harmonized Structure to one artefact serving every management system; for clause 9 that is one evidence store answering internal audit. In chapter 22's illustrative case, a team that held ISO/IEC 27001 added AI controls to its internal audit programme and generated the 42001 Statement of Applicability from the same control metadata.",
    ],
    openQuestions: [
      VERIFICATION_TODO,
      'Chapter 22 names clause 9 only at heading level: which inputs and outputs of internal audit and management review should this control cover once they are read against the standard?',
    ],
  },
  {
    ...base,
    id: 'AIGE-CTL-ASSURE-010',
    title: 'Model Artefacts Signed at Build and Verified Before Load',
    derivedFrom: [
      { kind: 'pattern', ref: 'model-artefact-integrity' },
      { kind: 'schema', ref: 'evidence-record' },
      { kind: 'chapter', ref: 'governing-development' },
    ],
    objective:
      'Every model artefact is signed at build through a manifest of each file and its digest and carries build provenance (what built it, by what process, from which inputs), and a runtime loads it only after verifying the signature, the signer, the digests and the provenance against the registry entry of the version deployed, writing an evidence record either way.',
    failureModes: [
      'A tampered or malicious model file loads with the privileges of the serving process.',
      'A model that skipped the eval gate reaches production through a manual copy or a moved tag.',
      'After an incident, nobody can prove which weights produced the outputs in question.',
      'A model is allowed or refused at load and no evidence record of the verification is written.',
    ],
    scope:
      'Model weights and their companion files, from training jobs to registries to serving clusters, including fine-tunes of bases pulled from public hubs. The artefacts an evaluation run loads are covered by AIGE-CTL-EVAL-008, and the admission of MCP servers by AIGE-CTL-AGENT-018.',
    enforcementPoints: ['deploy', 'runtime'],
    evidence: [
      { artefact: 'Signed manifest of every model file and its digest, with SLSA build provenance, recorded in the registry entry', layer: 2 },
      {
        artefact: 'Verification at load: signature, signer, file digests and provenance checked against the registry entry, with the decision',
        schemaId: 'evidence-record',
        layer: 4,
      },
    ],
    failureResponse: {
      effect: 'deny',
      text: "The serving platform's admission control refuses a model whose signature, signer identity, file digests or provenance do not match the registry entry, and writes an evidence record either way.",
    },
    layer: 2,
    secondaryLayers: [4],
    patterns: ['model-artefact-integrity', 'aibom'],
    mappings: {
      obligations: [
        'AIGE-OBL-EUAIA-ART15',
        'AIGE-OBL-EUAIA-ART55',
        'AIGE-OBL-ISO42001-A6',
        'AIGE-OBL-ISO42001-A10',
        'AIGE-OBL-NISTRMF-MANAGE',
        'AIGE-OBL-OWASP-LLM',
        'AIGE-OBL-OWASP-AGENTIC',
      ],
      iso42001: ['A.6.2.5', 'A.10.3'],
      nistAiRmf: ['MANAGE 3.2', 'MEASURE 2.7'],
      owasp: ['llm04-2026', 'asi04'],
      atlas: ['aml-t0010'],
      other: [
        { framework: 'MITRE ATLAS mitigation', ref: 'AML.M0013', note: 'Code Signing' },
        { framework: 'MITRE ATLAS mitigation', ref: 'AML.M0014', note: 'Verify AI Artifacts' },
      ],
    },
    references: [
      P.integrity,
      CH14.reproducibility,
      OMS,
      MODEL_TRANSPARENCY,
      SLSA,
      OWASP_LLM,
      OWASP_AGENTIC,
      ATLAS,
      NIST_AI_RMF,
      ISO_42001,
      AI_ACT,
    ],
    implementationNotes: [
      'Sign a manifest of file digests at build: the OpenSSF Model Signing (OMS) specification puts a detached signature over such a manifest in the Sigstore bundle format and is PKI-agnostic; its reference implementation, model-signing, recomputes the hashes on verification.',
      'Record provenance as SLSA provenance (https://slsa.dev/provenance/v1): Build L1 means provenance exists, L2 a hosted build platform and L3 hardened builds. Include the base model digest and the dataset admission records among the inputs, and list the same artefacts in the AIBOM.',
      "Budget for the verification latency at load, small next to model load times but real for fast scale-out; the pattern's example found a hand-copied model that had never passed the current eval gate, refused on a digest mismatch.",
    ],
    openQuestions: [
      VERIFICATION_TODO,
      'Which SLSA Build level should a model build reach before its provenance is trusted at load, and should that depend on the risk tier of the system?',
    ],
  },
  {
    ...base,
    id: 'AIGE-CTL-ASSURE-011',
    title: 'Safe Model Formats and Digest-Pinned Third-Party Models',
    derivedFrom: [
      { kind: 'pattern', ref: 'model-artefact-integrity' },
      { kind: 'chapter', ref: 'governing-development' },
    ],
    objective:
      'Model weights are stored in a format that cannot execute code on load (safetensors); every file in a code-executing format is scanned for code-executing imports before it reaches a registry and quarantined if it fails; third-party models are pulled by content digest, not by tag, re-hosted internally and recorded with their upstream source and digest in the registry entry.',
    failureModes: [
      'A pickle file runs code when it is loaded: the Python documentation warns that the pickle module is not secure.',
      'A file in a code-executing format reaches a registry unscanned, or after a failed scan.',
      'A third-party model is pulled by name or tag, and the tag has since moved.',
    ],
    scope:
      'Every serialised model file admitted to an internal registry, and every third-party model or base model pulled from outside. Signature and provenance checks at load are AIGE-CTL-ASSURE-010.',
    enforcementPoints: ['deploy'],
    evidence: [
      {
        artefact: 'Scan result for code-executing imports per serialised file, with the quarantine decision',
        schemaId: 'evidence-record',
        layer: 2,
      },
      { artefact: 'Upstream source and content digest of each third-party model, recorded in its registry entry', layer: 2 },
    ],
    failureResponse: {
      effect: 'deny',
      text: 'A serialised file that fails the scan for code-executing imports is quarantined and does not reach the registry.',
    },
    layer: 2,
    patterns: ['model-artefact-integrity'],
    mappings: {
      obligations: ['AIGE-OBL-EUAIA-ART15', 'AIGE-OBL-ISO42001-A10', 'AIGE-OBL-OWASP-LLM'],
      iso42001: ['A.10.3'],
      nistAiRmf: [],
      owasp: ['llm04-2026', 'asi04'],
      atlas: ['aml-t0010'],
      other: [{ framework: 'MITRE ATLAS mitigation', ref: 'AML.M0016', note: 'Vulnerability Scanning' }],
    },
    references: [
      P.integrity,
      CH14.reproducibility,
      PICKLE,
      HF_PICKLE,
      SAFETENSORS,
      TORCH_LOAD,
      OWASP_LLM,
      OWASP_AGENTIC,
      ATLAS,
      ISO_42001,
      AI_ACT,
    ],
    implementationNotes: [
      'Where a framework still loads pickle, keep its restrictions on: torch.load defaults to weights_only=True in its current documentation and warns "Never load data from an untrusted source".',
      'Do not rely on the scan alone: Hugging Face says of its own pickle-import scanner that it "is not 100% foolproof". Convert legacy checkpoints to safetensors, and verify the publisher\'s signature on a third-party model where one exists.',
    ],
    openQuestions: [
      VERIFICATION_TODO,
      'How should a legacy checkpoint that cannot be converted to safetensors be handled: blocked, or admitted after a scan with a named acceptor of the risk?',
    ],
  },
  {
    ...base,
    id: 'AIGE-CTL-ASSURE-012',
    title: 'AI Bill of Materials per Build',
    derivedFrom: [
      { kind: 'pattern', ref: 'aibom' },
      { kind: 'schema', ref: 'ai-system-register-entry' },
      { kind: 'chapter', ref: 'governing-development' },
    ],
    objective:
      'Each AI system has an AI bill of materials generated at build in a standard format (CycloneDX ML-BOM or the SPDX 3.0 AI profile), recording its models, datasets and weights with their provenance and licences, attached to its registry entry and regenerated on each build so it never drifts from the deployed system.',
    failureModes: [
      'Nobody can say which model version, from which provenance, trained on which data, is inside a given system.',
      'The AIBOM was written once and no longer matches the deployed system.',
      'A licence or provenance change in a model or dataset does not show in the next build\'s AIBOM.',
      'The registry entry of the system links no AIBOM.',
    ],
    scope:
      'AI systems assembled from foundation models, fine-tunes, third-party datasets and libraries. The software dependencies a classic SBOM already captures are out of scope.',
    enforcementPoints: ['deploy'],
    evidence: [
      {
        artefact: 'AIBOM of each build (CycloneDX ML-BOM or SPDX 3.0 AI profile), linked from the registry entry',
        schemaId: 'ai-system-register-entry',
        layer: 2,
      },
    ],
    failureResponse: RESPONSE_TO_SPECIFY,
    layer: 2,
    patterns: ['aibom'],
    mappings: {
      obligations: [
        'AIGE-OBL-EUAIA-ART11',
        'AIGE-OBL-EUAIA-ART53',
        'AIGE-OBL-OWASP-AIBOM',
        'AIGE-OBL-NISTRMF-MAP',
        'AIGE-OBL-CSA-AICM',
      ],
      iso42001: ['A.7.5', 'A.10.3'],
      nistAiRmf: [],
      owasp: ['llm04-2026'],
      atlas: ['aml-t0010'],
      other: [{ framework: 'MITRE ATLAS mitigation', ref: 'AML.M0023', note: 'AI Bill of Materials' }],
    },
    references: [P.aibom, CH14.annexIv, OWASP_AIBOM_GENERATOR, OWASP_LLM, ATLAS, ISO_42001, AI_ACT],
    implementationNotes: [
      'Generate the AIBOM in the build, for example with the OWASP AIBOM generator (illustrative), covering models, datasets and weights with their provenance and licences.',
      'Transparency documents can be generated from the AIBOM, as the pattern notes; chapter 14 draws Annex IV items 1(b) and 1(c) (interaction with other systems; software versions) from it.',
    ],
    openQuestions: [
      VERIFICATION_TODO,
      'Should a build fail when its AIBOM changes in a way nobody approved (a new model, dataset or licence), or only flag the difference for review?',
    ],
  },
];
