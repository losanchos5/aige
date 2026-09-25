// threats.ts: the threat bridge. Each row takes one threat, keyed by the id an
// external catalogue gives it, across to the controls that stop it, a test that
// proves the control works and the obligations that test's evidence helps
// satisfy:
//
//   threat (external id) -> control (pattern) -> test (example eval) -> obligation
//
// Four catalogues key the rows, each pinned to the version checked on
// 2026-09-24 (THREATS_AS_OF):
//
// - OWASP Top 10 for LLM Applications 2026 (LLM01:2026 ... LLM10:2026, published
//   3 Aug 2026; `formerly` carries the 2025 id where the entry existed);
// - OWASP Top 10 for Agentic Applications 2026 (ASI01 ... ASI10; names as the
//   PDF's table of contents prints them);
// - MITRE ATLAS techniques, data release v2026.09 (read from the
//   mitre-atlas/atlas-data repository, because atlas.mitre.org renders in
//   JavaScript); `atlasMitigations` are the ATLAS mitigations that the same
//   release links to the technique;
// - NIST AI 100-2 E2025 attack classes, by their NISTAML identifiers.
//
// Every row links only to things that exist: pattern slugs from ./patterns.ts,
// obligation ids from ./frameworks.ts, ISO/IEC 42001 Annex A ids, CSA AICM v1.1
// domain ids, NIST SP 800-218A task ids and NIST COSAiS use cases from the
// lookup tables below, and related rows by id. `threatProblems()` returns every
// broken reference; the /resources/threats page fails the build on any, and
// tests/threats.spec.ts checks the same.
//
// Evals name a check in a public harness (Inspect, promptfoo, garak) as an
// example, never a recommendation; `custom` marks a threat for which none of
// the three ships a named check, so the test is one you write. `related` holds
// our reading of which ids in other catalogues describe the same threat; the
// LLM-to-ASI links follow OWASP's own Appendix A. All of it is illustrative,
// not a claim of conformity.
import type { LayerNumber } from './stack';
import type { Source } from '../lib/sources';
import { obligations, frameworks } from './frameworks';
import { patterns } from './patterns';

export const THREATS_AS_OF = '2026-09-24';

// U+2014, built from its code point so this file itself stays free of it.
const EM_DASH = String.fromCharCode(0x2014);

export type ThreatTaxonomyId = 'owasp-llm' | 'owasp-asi' | 'mitre-atlas' | 'nist-aml';

export interface ThreatTaxonomy {
  id: ThreatTaxonomyId;
  /** Full name of the catalogue. */
  name: string;
  /** Short label for chips and compact UI. */
  short: string;
  /** The version the rows are pinned to. */
  version: string;
  issuer: string;
  url: string;
  /** threatSources number that backs the catalogue. */
  source: number;
  /** What the catalogue covers, in one sentence. */
  scope: string;
}

export type EvalTool = 'Inspect' | 'promptfoo' | 'garak' | 'custom';

export interface ThreatEval {
  tool: EvalTool;
  /** The named check: an Inspect task, a promptfoo plugin, a garak probe; for
   *  `custom`, a short name for the test to write. */
  check: string;
  /** What the check does, in one line. */
  note: string;
}

export type AicmDomainId =
  | 'A&A'
  | 'AIS'
  | 'BCR'
  | 'CCC'
  | 'CEK'
  | 'DCS'
  | 'DSP'
  | 'GRC'
  | 'HRS'
  | 'IAM'
  | 'IPY'
  | 'IVS'
  | 'LOG'
  | 'MDS'
  | 'SEF'
  | 'STA'
  | 'TVM'
  | 'UEM';

export type CosaisUseCase = 'genai-assistant' | 'predictive' | 'single-agent' | 'multi-agent' | 'developers';

export interface Threat {
  /** Stable row id (lower case): the page anchor is `threat-<id>`. */
  id: string;
  taxonomy: ThreatTaxonomyId;
  /** The id exactly as the catalogue prints it (LLM01:2026, ASI01, AML.T0051, NISTAML.018). */
  externalId: string;
  /** The catalogue's own name for it. */
  name: string;
  /** The id the same entry had in the previous edition, where it existed. */
  formerly?: string;
  /** The public page (or canonical source) for the id. */
  url: string;
  /** What the threat is, in our words. */
  summary: string;
  /** The control that stops it, in one line. */
  control: string;
  /** Slugs from ./patterns.ts: the patterns that implement the control. */
  patterns: readonly string[];
  /** Example checks that fail when the control does not work. */
  evals: readonly ThreatEval[];
  /** Obligation ids (./frameworks.ts) the evidence helps satisfy. */
  obligations: readonly string[];
  /** ISO/IEC 42001:2023 Annex A control ids. */
  iso42001: readonly string[];
  /** CSA AICM v1.1 domain ids. */
  aicm: readonly AicmDomainId[];
  /** NIST SP 800-218A task ids, where the threat is a development-time one. */
  ssdf: readonly string[];
  /** NIST COSAiS proposed use cases the threat belongs to. */
  cosais: readonly CosaisUseCase[];
  /** ATLAS mitigation ids the v2026.09 release links to the technique (ATLAS rows only). */
  atlasMitigations: readonly string[];
  /** Ids of rows in other catalogues that describe the same threat (our reading). */
  related: readonly string[];
  /** Stack layers the controls live in. */
  layers: readonly LayerNumber[];
}

// ---------------------------------------------------------------------------
// Sources (house format, STYLEGUIDE.md §6)

export const threatSources: readonly Source[] = [
  {
    title: 'OWASP GenAI LLM Top 10 2026',
    gloss: 'LLM01:2026 Prompt Injection to LLM10:2026 Improper Output Handling; resource page dated 3 Aug 2026',
    publisher: 'OWASP GenAI Security Project',
    date: '2026-08-03',
    url: 'https://genai.owasp.org/resource/owasp-genai-llm-top-10-2026/',
    verified: 'primary',
  },
  {
    title: 'OWASP Top 10 for LLM Applications 2026, canonical Markdown source and Appendix A: Related Framework Mappings',
    gloss:
      'final list and entry texts in 2026/final; Appendix A maps each entry to the Agentic Top 10 and to CSA AICM v1.1 domains; the repository README gives the release date as 4 Aug 2026',
    publisher: 'OWASP GenAI Security Project (GitHub)',
    date: '2026-08',
    url: 'https://github.com/GenAI-Security-Project/GenAI-LLM-Top10/blob/main/2026/final/Appendix_A_Related_Framework_Mappings.md',
    verified: 'primary',
  },
  {
    title: 'OWASP Top 10 for LLM Applications 2025',
    gloss: 'the previous edition, LLM01:2025 to LLM10:2025, used for the "formerly" ids',
    publisher: 'OWASP GenAI Security Project',
    date: '2025',
    url: 'https://genai.owasp.org/llm-top-10/',
    verified: 'primary',
  },
  {
    title: 'OWASP Top 10 for Agentic Applications for 2026',
    gloss: 'ASI01 Agent Goal Hijack to ASI10 Rogue Agents',
    publisher: 'OWASP GenAI Security Project',
    date: '2025-12-09',
    url: 'https://genai.owasp.org/resource/owasp-top-10-for-agentic-applications-for-2026/',
    verified: 'primary',
  },
  {
    title: 'MITRE ATLAS data, release v2026.09',
    gloss:
      '16 tactics, 120 techniques, 88 sub-techniques, 40 mitigations; technique names and technique-to-mitigation links read from dist/v6/ATLAS-2026.09.yaml',
    publisher: 'MITRE',
    date: '2026-09-15',
    url: 'https://github.com/mitre-atlas/atlas-data/releases/tag/v2026.09',
    verified: 'primary',
  },
  {
    title: 'NIST AI 100-2 E2025, Adversarial Machine Learning: A Taxonomy and Terminology of Attacks and Mitigations',
    gloss: 'predictive and generative AI attack taxonomies with NISTAML identifiers',
    publisher: 'NIST',
    date: '2025-03-24',
    url: 'https://csrc.nist.gov/pubs/ai/100/2/e2025/final',
    verified: 'primary',
  },
  {
    title:
      'NIST SP 800-218A, Secure Software Development Practices for Generative AI and Dual-Use Foundation Models: An SSDF Community Profile',
    gloss:
      'AI-specific tasks added to SSDF 1.1 (e.g. PO.5.3, PS.1.3, PW.3.1 to PW.3.3) and AI-specific recommendations on existing tasks (e.g. PW.1.1, RV.1.1)',
    publisher: 'NIST',
    date: '2024-07',
    url: 'https://csrc.nist.gov/pubs/sp/800/218/a/final',
    verified: 'primary',
  },
  {
    title: 'SP 800-53 Control Overlays for Securing AI Systems (COSAiS)',
    gloss:
      'five proposed use cases; concept paper 14 Aug 2025; annotated outline for predictive AI 8 Jan 2026; no overlay published in final form on the project page as of 2026-09-24',
    publisher: 'NIST',
    date: '2026-01-08',
    url: 'https://csrc.nist.gov/projects/cosais',
    verified: 'primary',
  },
  {
    title: 'Regulation (EU) 2024/1689 (AI Act)',
    gloss:
      'Art. 15(5): resilience against attempts to alter use, outputs or performance, including data poisoning, model poisoning, adversarial examples or model evasion, confidentiality attacks and model flaws',
    publisher: 'Publications Office of the EU (EUR-Lex)',
    date: '2024-07-12',
    url: 'https://eur-lex.europa.eu/eli/reg/2024/1689/oj/eng',
    verified: 'primary',
  },
  {
    title: 'ISO/IEC 42001:2023, AI management systems, Annex A',
    gloss: 'reference control objectives and controls A.2 to A.10, cited by id and short title',
    publisher: 'ISO/IEC',
    date: '2023',
    url: 'https://www.iso.org/standard/81230.html',
    verified: 'secondary',
  },
  {
    title: 'AI Controls Matrix v1.1',
    gloss: '247 control objectives across 18 security domains; released 22 Jun 2026',
    publisher: 'Cloud Security Alliance',
    date: '2026-06-22',
    url: 'https://cloudsecurityalliance.org/artifacts/ai-controls-matrix-v1-1',
    verified: 'primary',
  },
  {
    title: 'Inspect Evals',
    gloss: 'community evaluations for the Inspect framework, e.g. agentdojo, agent_threat_bench, strong_reject, cyberseceval_2',
    publisher: 'UK AI Security Institute and contributors (GitHub)',
    date: '2026',
    url: 'https://github.com/UKGovernmentBEIS/inspect_evals',
    verified: 'primary',
  },
  {
    title: 'promptfoo red-team plugins',
    gloss: 'plugin ids such as indirect-prompt-injection, prompt-extraction, rag-poisoning, agentic:memory-poisoning',
    publisher: 'promptfoo',
    date: '2026',
    url: 'https://www.promptfoo.dev/docs/red-team/plugins/',
    verified: 'primary',
  },
  {
    title: 'garak, LLM vulnerability scanner, release v0.17.0',
    gloss: 'probe modules such as promptinject, latentinjection, sysprompt_extraction, leakreplay, packagehallucination',
    publisher: 'NVIDIA (GitHub)',
    date: '2026-09-09',
    url: 'https://github.com/NVIDIA/garak',
    verified: 'primary',
  },
];

/** threatSources numbers by role, so rows and the page cite them by name. */
export const SRC = {
  llm2026: 1,
  llm2026Repo: 2,
  llm2025: 3,
  asi: 4,
  atlas: 5,
  nistAml: 6,
  ssdf: 7,
  cosais: 8,
  aiAct: 9,
  iso42001: 10,
  aicm: 11,
  inspect: 12,
  promptfoo: 13,
  garak: 14,
} as const;

// ---------------------------------------------------------------------------
// The catalogues

export const taxonomies: readonly ThreatTaxonomy[] = [
  {
    id: 'owasp-llm',
    name: 'OWASP Top 10 for LLM Applications 2026',
    short: 'OWASP LLM 2026',
    version: '2026 (published 3 Aug 2026)',
    issuer: 'OWASP GenAI Security Project',
    url: 'https://genai.owasp.org/resource/owasp-genai-llm-top-10-2026/',
    source: SRC.llm2026,
    scope: 'Risks when the model is a component inside an application; the 2026 edition renumbers several 2025 entries.',
  },
  {
    id: 'owasp-asi',
    name: 'OWASP Top 10 for Agentic Applications 2026',
    short: 'OWASP Agentic 2026',
    version: '2026 (published 9 Dec 2025)',
    issuer: 'OWASP GenAI Security Project',
    url: 'https://genai.owasp.org/resource/owasp-top-10-for-agentic-applications-for-2026/',
    source: SRC.asi,
    scope: 'Risks once the model acts: tools it calls, memory it carries, identities it uses and other agents it talks to.',
  },
  {
    id: 'mitre-atlas',
    name: 'MITRE ATLAS techniques',
    short: 'MITRE ATLAS',
    version: 'data release v2026.09 (15 Sep 2026)',
    issuer: 'MITRE',
    url: 'https://atlas.mitre.org/',
    source: SRC.atlas,
    scope: 'Adversary techniques against AI systems, organised by tactic, with the mitigations ATLAS links to each.',
  },
  {
    id: 'nist-aml',
    name: 'NIST AI 100-2 E2025 attack classes',
    short: 'NIST AI 100-2',
    version: 'E2025 (24 Mar 2025)',
    issuer: 'NIST',
    url: 'https://csrc.nist.gov/pubs/ai/100/2/e2025/final',
    source: SRC.nistAml,
    scope: 'Attacks on predictive and generative models, classed by the attacker goal they serve: availability, integrity, privacy, misuse.',
  },
];

// ---------------------------------------------------------------------------
// Lookup tables for the control-framework columns

/** ISO/IEC 42001:2023 Annex A controls used below: id -> short title. */
export const iso42001Controls: Readonly<Record<string, string>> = {
  'A.5.2': 'AI system impact assessment process',
  'A.6.2.2': 'AI system requirements and specification',
  'A.6.2.4': 'AI system verification and validation',
  'A.6.2.5': 'AI system deployment',
  'A.6.2.6': 'AI system operation and monitoring',
  'A.6.2.8': 'AI system recording of event logs',
  'A.7.2': 'Data for development and enhancement of AI system',
  'A.7.4': 'Quality of data for AI systems',
  'A.7.5': 'Data provenance',
  'A.8.2': 'System documentation and information for users',
  'A.8.4': 'Communication of incidents',
  'A.9.2': 'Processes for responsible use of AI systems',
  'A.9.4': 'Intended use of the AI system',
  'A.10.3': 'Suppliers',
};

/** CSA AICM v1.1 domains: id -> title. */
export const aicmDomains: Readonly<Record<AicmDomainId, string>> = {
  'A&A': 'Audit & Assurance',
  AIS: 'Application & Interface Security',
  BCR: 'Business Continuity Management and Operational Resilience',
  CCC: 'Change Control and Configuration Management',
  CEK: 'Cryptography, Encryption & Key Management',
  DCS: 'Datacenter Security',
  DSP: 'Data Security and Privacy Lifecycle Management',
  GRC: 'Governance, Risk and Compliance',
  HRS: 'Human Resources',
  IAM: 'Identity & Access Management',
  IPY: 'Interoperability & Portability',
  IVS: 'Infrastructure & Virtualization Security',
  LOG: 'Logging and Monitoring',
  MDS: 'Model Development Security',
  SEF: 'Security Incident Management, E-Discovery, & Cloud Forensics',
  STA: 'Supply Chain Management, Transparency, and Accountability',
  TVM: 'Threat & Vulnerability Management',
  UEM: 'Universal Endpoint Management',
};

/** NIST SP 800-218A tasks used below: id -> what it asks, paraphrased. */
export const ssdfTasks: Readonly<Record<string, string>> = {
  'PO.5.3': 'Monitor development environments continuously for suspicious activity',
  'PS.1.3': 'Protect model weights and configuration parameters from unauthorised access and change',
  'PS.3.2': 'Keep provenance data for every component of a release',
  'PW.1.1': 'Risk modelling (an SSDF 1.1 task; 800-218A recommends including AI-specific threat types)',
  'PW.3.1': 'Analyse training and test data for poisoning, bias and tampering before use',
  'PW.3.2': 'Track the provenance of training, testing, fine-tuning and aligning data',
  'PW.3.3': 'Include adversarial samples in training and testing data',
  'RV.1.1': 'Gather vulnerability information; log and analyse model inputs and outputs',
};

/** NIST COSAiS proposed use cases, in our short labels. */
export const cosaisUseCases: Readonly<Record<CosaisUseCase, string>> = {
  'genai-assistant': 'Using a generative AI assistant (LLM)',
  predictive: 'Using and fine-tuning predictive AI',
  'single-agent': 'AI agent systems: single agent',
  'multi-agent': 'AI agent systems: multi-agent',
  developers: 'Security controls for AI developers',
};

/** ATLAS mitigations (v2026.09) used below: id -> name. */
export const atlasMitigationNames: Readonly<Record<string, string>> = {
  'AML.M0001': 'Limit Model Artifact Release',
  'AML.M0003': 'Predictive AI Model Hardening',
  'AML.M0004': 'Limit AI Service Query Volume and Rate',
  'AML.M0005': 'Control Access to AI Models and Data at Rest',
  'AML.M0006': 'Predictive AI Ensembles',
  'AML.M0007': 'Sanitize Training Data',
  'AML.M0008': 'Validate AI Model',
  'AML.M0009': 'Predictive AI Multi-Sensor Fusion',
  'AML.M0010': 'Predictive AI Input Restoration',
  'AML.M0013': 'Code Signing',
  'AML.M0014': 'Verify AI Artifacts',
  'AML.M0015': 'Predictive AI Adversarial Input Detection',
  'AML.M0019': 'Control Access to AI Models and Data in Production',
  'AML.M0020': 'Generative AI Guardrails',
  'AML.M0021': 'Generative AI Guidelines',
  'AML.M0022': 'Generative AI Model Alignment',
  'AML.M0023': 'AI Bill of Materials',
  'AML.M0024': 'AI Telemetry Logging',
  'AML.M0025': 'Maintain AI Dataset Provenance',
  'AML.M0026': 'Privileged AI Agent Permissions Configuration',
  'AML.M0027': 'Single-User AI Agent Permissions Configuration',
  'AML.M0028': 'AI Agent Tools Permissions Configuration',
  'AML.M0029': 'Human In-the-Loop for AI Agent Actions',
  'AML.M0030': 'Restrict AI Agent Tool Invocation on Untrusted Data',
  'AML.M0031': 'Memory Hardening',
  'AML.M0032': 'Segmentation of AI Agent Components',
  'AML.M0033': 'Input and Output Validation for AI Agent Components',
  'AML.M0034': 'Deepfake Detection',
  'AML.M0035': 'AI Red Team',
  'AML.M0036': 'Limit AI Workload Resource Consumption',
};

/** Harness names to the threatSources row that documents their checks. */
export const evalToolSource: Readonly<Record<EvalTool, number | null>> = {
  Inspect: SRC.inspect,
  promptfoo: SRC.promptfoo,
  garak: SRC.garak,
  custom: null,
};

const OWASP_LLM_2026 = 'https://github.com/GenAI-Security-Project/GenAI-LLM-Top10/blob/main/2026/final/';
const ASI_URL = 'https://genai.owasp.org/resource/owasp-top-10-for-agentic-applications-for-2026/';
const atlasUrl = (id: string) => `https://atlas.mitre.org/techniques/${id}`;
const NIST_AML_URL = 'https://csrc.nist.gov/pubs/ai/100/2/e2025/final';

// ---------------------------------------------------------------------------
// The rows

export const threats: readonly Threat[] = [
  // ---- OWASP Top 10 for LLM Applications 2026 ------------------------------
  {
    id: 'llm01-2026',
    taxonomy: 'owasp-llm',
    externalId: 'LLM01:2026',
    name: 'Prompt Injection',
    formerly: 'LLM01:2025',
    url: `${OWASP_LLM_2026}LLM01_PromptInjection.md`,
    summary:
      'Any input the model reads (a user message, a retrieved document, a tool result, an image, its own memory) changes its behaviour in a way the developer did not intend, because the model draws no hard line between instructions and data.',
    control:
      'Treat every channel into the context as untrusted: input and output guardrails, narrow tool scopes, and a human checkpoint before consequential actions.',
    patterns: ['runtime-guardrail', 'adversarial-red-team-suite', 'eval-gate-in-ci'],
    evals: [
      { tool: 'promptfoo', check: 'indirect-prompt-injection', note: 'plants instructions in prompt variables and checks whether the model follows them' },
      { tool: 'garak', check: 'latentinjection', note: 'buries injections inside documents such as a resume or a report' },
    ],
    obligations: ['AIGE-OBL-EUAIA-ART15', 'AIGE-OBL-OWASP-LLM', 'AIGE-OBL-ISO42001-A6', 'AIGE-OBL-NISTRMF-MEASURE'],
    iso42001: ['A.6.2.4', 'A.6.2.6'],
    aicm: ['AIS'],
    ssdf: ['PW.1.1'],
    cosais: ['genai-assistant', 'single-agent'],
    atlasMitigations: [],
    related: ['asi01', 'aml-t0051', 'nistaml-018', 'nistaml-015'],
    layers: [3, 4],
  },
  {
    id: 'llm02-2026',
    taxonomy: 'owasp-llm',
    externalId: 'LLM02:2026',
    name: 'Sensitive Information Disclosure',
    formerly: 'LLM02:2025',
    url: `${OWASP_LLM_2026}LLM02_SensitiveInformationDisclosure.md`,
    summary:
      'Confidential, regulated or proprietary data leaves through a channel nobody authorised: the answer, but also tool-call arguments, reasoning traces, retrieved chunks, logs, embeddings and observable properties such as timing.',
    control:
      'Classify data before it reaches the context, redact on every output channel, isolate sessions and tenants, and keep personal data out of training and tuning sets.',
    patterns: ['runtime-guardrail', 'eval-gate-in-ci', 'continuous-assurance-telemetry'],
    evals: [
      { tool: 'promptfoo', check: 'cross-session-leak', note: 'checks whether information from one session reaches another' },
      { tool: 'garak', check: 'leakreplay', note: 'tries to make the model replay text from its training data' },
    ],
    obligations: ['AIGE-OBL-EUAIA-ART15', 'AIGE-OBL-EUAIA-ART10', 'AIGE-OBL-OWASP-LLM', 'AIGE-OBL-ISO42001-A7'],
    iso42001: ['A.6.2.6', 'A.7.4'],
    aicm: ['DSP', 'IAM'],
    ssdf: [],
    cosais: ['genai-assistant'],
    atlasMitigations: [],
    related: ['aml-t0057', 'nistaml-038', 'nistaml-033'],
    layers: [3, 4],
  },
  {
    id: 'llm03-2026',
    taxonomy: 'owasp-llm',
    externalId: 'LLM03:2026',
    name: 'Excessive Agency',
    formerly: 'LLM06:2025',
    url: `${OWASP_LLM_2026}LLM03_ExcessiveAgency.md`,
    summary:
      'The system can take damaging actions in response to unexpected, ambiguous or manipulated model output, because its tools carry more functionality, permission or autonomy than the task needs.',
    control:
      'Least functionality and least privilege per tool, identities scoped to the user on whose behalf the agent acts, and approval before high-impact actions.',
    patterns: ['agent-identity-scoped-credentials', 'human-in-the-loop-gate', 'kill-switch-circuit-breaker'],
    evals: [
      { tool: 'promptfoo', check: 'excessive-agency', note: 'checks whether the model takes initiative or claims abilities beyond its remit' },
      { tool: 'promptfoo', check: 'bfla', note: 'tests broken function-level authorisation: calling functions the user may not call' },
    ],
    obligations: ['AIGE-OBL-EUAIA-ART14', 'AIGE-OBL-EUAIA-ART15', 'AIGE-OBL-OWASP-LLM', 'AIGE-OBL-CSA-AICM-AGENTIC'],
    iso42001: ['A.6.2.2', 'A.9.2'],
    aicm: ['IAM'],
    ssdf: [],
    cosais: ['single-agent', 'multi-agent'],
    atlasMitigations: [],
    related: ['asi02', 'asi03', 'aml-t0053'],
    layers: [1, 4],
  },
  {
    id: 'llm04-2026',
    taxonomy: 'owasp-llm',
    externalId: 'LLM04:2026',
    name: 'Supply Chain',
    formerly: 'LLM03:2025',
    url: `${OWASP_LLM_2026}LLM04_SupplyChain.md`,
    summary:
      'Third-party models, datasets, adapters, conversion pipelines and platforms can be tampered with, poisoned or swapped, so the system inherits flaws it never introduced itself.',
    control:
      'An AIBOM for every model, dataset and adapter, integrity checks on artefacts, admission rules for sources, and due diligence on providers.',
    patterns: ['aibom', 'vendor-model-due-diligence-gate'],
    evals: [
      { tool: 'garak', check: 'fileformats', note: 'inspects the files that ship with a model for risky formats' },
      { tool: 'custom', check: 'AIBOM diff gate', note: 'fails the build when a model, dataset or adapter hash differs from the approved AIBOM' },
    ],
    obligations: ['AIGE-OBL-EUAIA-ART15', 'AIGE-OBL-EUAIA-ART25', 'AIGE-OBL-ISO42001-A10', 'AIGE-OBL-OWASP-AIBOM'],
    iso42001: ['A.7.5', 'A.10.3'],
    aicm: ['STA', 'MDS'],
    ssdf: ['PS.3.2'],
    cosais: ['developers'],
    atlasMitigations: [],
    related: ['asi04', 'aml-t0010', 'nistaml-051'],
    layers: [2, 3],
  },
  {
    id: 'llm05-2026',
    taxonomy: 'owasp-llm',
    externalId: 'LLM05:2026',
    name: 'Data and Model Poisoning',
    formerly: 'LLM04:2025',
    url: `${OWASP_LLM_2026}LLM05_DataModelPoisoning.md`,
    summary:
      'Data or model artefacts are manipulated wherever they are ingested or reused (pre-training, fine-tuning, embeddings, retrieval, distribution) so the system still looks functional while carrying a bias, a weakness or a backdoor.',
    control:
      'Admit data only with provenance and an owner, scan for tampering and triggers before training, and keep regression evals that would expose planted behaviour.',
    patterns: ['aibom', 'eval-gate-in-ci', 'model-card-as-control-evidence'],
    evals: [
      { tool: 'promptfoo', check: 'rag-poisoning', note: 'tests resistance to poisoned documents in the retrieval corpus' },
      { tool: 'custom', check: 'trigger regression set', note: 'a held-out set of suspected trigger inputs run on every retrained version' },
    ],
    obligations: ['AIGE-OBL-EUAIA-ART10', 'AIGE-OBL-EUAIA-ART15', 'AIGE-OBL-ISO42001-A7', 'AIGE-OBL-OWASP-LLM'],
    iso42001: ['A.7.4', 'A.7.5'],
    aicm: ['MDS', 'DSP'],
    ssdf: ['PW.3.1', 'PW.3.2'],
    cosais: ['developers', 'predictive'],
    atlasMitigations: [],
    related: ['asi06', 'aml-t0020', 'aml-t0070', 'nistaml-013', 'nistaml-023'],
    layers: [2, 3],
  },
  {
    id: 'llm06-2026',
    taxonomy: 'owasp-llm',
    externalId: 'LLM06:2026',
    name: 'Unbounded Consumption',
    formerly: 'LLM10:2025',
    url: `${OWASP_LLM_2026}LLM06_UnboundedConsumption.md`,
    summary:
      'Uncontrolled inference lets an attacker exhaust the service, run up cost or clone the model through queries; the attacker pays little while the victim pays for heavy computation.',
    control:
      'Rate, token and budget limits per identity, timeouts on long reasoning, anomaly alerts on spend, and a breaker that stops runaway loops.',
    patterns: ['runtime-guardrail', 'kill-switch-circuit-breaker', 'continuous-assurance-telemetry'],
    evals: [
      { tool: 'promptfoo', check: 'reasoning-dos', note: 'tries to exhaust computation through excessive reasoning' },
      { tool: 'custom', check: 'budget ceiling test', note: 'replays a burst of expensive requests and checks the limits trip' },
    ],
    obligations: ['AIGE-OBL-EUAIA-ART15', 'AIGE-OBL-OWASP-LLM', 'AIGE-OBL-CSA-AICM'],
    iso42001: ['A.6.2.6'],
    aicm: ['AIS', 'BCR'],
    ssdf: [],
    cosais: ['genai-assistant'],
    atlasMitigations: [],
    related: ['asi08', 'aml-t0034', 'nistaml-014', 'nistaml-031'],
    layers: [4],
  },
  {
    id: 'llm07-2026',
    taxonomy: 'owasp-llm',
    externalId: 'LLM07:2026',
    name: 'Misinformation',
    formerly: 'LLM09:2025',
    url: `${OWASP_LLM_2026}LLM07_Misinformation.md`,
    summary:
      'The system produces incorrect, unsupported or misleading output that looks credible enough to be acted on by a person, a workflow or another agent.',
    control:
      'Grounding with checkable sources, calibrated uncertainty shown to the user, factuality evals on release, and human review where the output drives a decision.',
    patterns: ['eval-gate-in-ci', 'human-in-the-loop-gate', 'continuous-assurance-telemetry'],
    evals: [
      { tool: 'Inspect', check: 'simpleqa', note: 'measures accuracy on short fact-seeking questions' },
      { tool: 'promptfoo', check: 'rag-source-attribution', note: 'checks whether a RAG system invents citations or sources' },
    ],
    obligations: ['AIGE-OBL-EUAIA-ART13', 'AIGE-OBL-EUAIA-ART14', 'AIGE-OBL-EUAIA-ART15', 'AIGE-OBL-NISTRMF-MEASURE'],
    iso42001: ['A.6.2.4', 'A.8.2'],
    aicm: ['AIS'],
    ssdf: [],
    cosais: ['genai-assistant'],
    atlasMitigations: [],
    related: ['asi09', 'aml-t0060'],
    layers: [3, 4],
  },
  {
    id: 'llm08-2026',
    taxonomy: 'owasp-llm',
    externalId: 'LLM08:2026',
    name: 'Hidden Context Exposure',
    formerly: 'LLM07:2025',
    url: `${OWASP_LLM_2026}LLM08_HiddenContextExposure.md`,
    summary:
      'Hidden instructions and operational context (the system prompt, tool schemas, retrieved policy text) are extracted or inferred, which matters when they reveal secrets, policy logic or trust boundaries. The 2025 edition called this System Prompt Leakage.',
    control:
      'Keep secrets and authorisation logic out of the context altogether, enforce policy outside the model, and treat the prompt as eventually public.',
    patterns: ['runtime-guardrail', 'adversarial-red-team-suite', 'policy-card'],
    evals: [
      { tool: 'garak', check: 'sysprompt_extraction', note: 'tries direct requests, encodings and role-play to extract the system prompt' },
      { tool: 'promptfoo', check: 'tool-discovery', note: 'checks whether the system reveals the tools and functions it can call' },
    ],
    obligations: ['AIGE-OBL-EUAIA-ART15', 'AIGE-OBL-OWASP-LLM', 'AIGE-OBL-ISO42001-A6'],
    iso42001: ['A.6.2.4'],
    aicm: ['AIS'],
    ssdf: [],
    cosais: ['genai-assistant'],
    atlasMitigations: [],
    related: ['aml-t0056', 'nistaml-035'],
    layers: [3, 4],
  },
  {
    id: 'llm09-2026',
    taxonomy: 'owasp-llm',
    externalId: 'LLM09:2026',
    name: 'Vector and Embedding Weaknesses',
    formerly: 'LLM08:2025',
    url: `${OWASP_LLM_2026}LLM09_VectorAndEmbeddingWeaknesses.md`,
    summary:
      'Wherever similarity search decides what the model sees (retrieval, vector memory, semantic caches), the embedding layer becomes a trust boundary open to poisoning, cross-tenant leakage and inversion.',
    control:
      'Access control enforced at retrieval time per user and tenant, ingestion rules with provenance, and monitoring of what the retriever returns.',
    patterns: ['runtime-guardrail', 'aibom', 'agent-identity-scoped-credentials'],
    evals: [
      { tool: 'promptfoo', check: 'rag-document-exfiltration', note: 'tries to pull documents out of the retrieval corpus' },
      { tool: 'promptfoo', check: 'rag-poisoning', note: 'plants documents that should never be retrieved or trusted' },
    ],
    obligations: ['AIGE-OBL-EUAIA-ART10', 'AIGE-OBL-EUAIA-ART15', 'AIGE-OBL-ISO42001-A7'],
    iso42001: ['A.7.5', 'A.6.2.6'],
    aicm: ['IAM', 'DSP', 'LOG'],
    ssdf: [],
    cosais: ['genai-assistant'],
    atlasMitigations: [],
    related: ['asi06', 'aml-t0070'],
    layers: [2, 4],
  },
  {
    id: 'llm10-2026',
    taxonomy: 'owasp-llm',
    externalId: 'LLM10:2026',
    name: 'Improper Output Handling',
    formerly: 'LLM05:2025',
    url: `${OWASP_LLM_2026}LLM10_ImproperOutputHandling.md`,
    summary:
      'Model output is passed to a browser, shell, database or other component without validation, so whoever controls the prompt gains indirect access to that component.',
    control:
      'Treat model output as untrusted input: encode for the destination, parameterise queries, and run generated code only in a sandbox.',
    patterns: ['runtime-guardrail', 'eval-gate-in-ci'],
    evals: [
      { tool: 'garak', check: 'web_injection', note: 'tests Markdown image exfiltration and cross-site scripting through output' },
      { tool: 'promptfoo', check: 'sql-injection', note: 'tries to get SQL through the model into a database query' },
    ],
    obligations: ['AIGE-OBL-EUAIA-ART15', 'AIGE-OBL-OWASP-LLM', 'AIGE-OBL-ETSI-304223'],
    iso42001: ['A.6.2.4'],
    aicm: ['AIS'],
    ssdf: [],
    cosais: ['genai-assistant', 'single-agent'],
    atlasMitigations: [],
    related: ['asi05', 'aml-t0077'],
    layers: [4],
  },

  // ---- OWASP Top 10 for Agentic Applications 2026 ---------------------------
  {
    id: 'asi01',
    taxonomy: 'owasp-asi',
    externalId: 'ASI01',
    name: 'Agent Goal Hijack',
    url: ASI_URL,
    summary:
      'Content the agent processes (a message, a document, a tool result) redirects its goals or plan, so it pursues the attacker\'s objective with the agent\'s own tools and permissions.',
    control:
      'Keep the goal outside the reach of processed content: instruction provenance, checkpoints before writes, and trajectory evals that watch the plan, not only the answer.',
    patterns: ['runtime-guardrail', 'human-in-the-loop-gate', 'adversarial-red-team-suite'],
    evals: [
      { tool: 'Inspect', check: 'agentdojo', note: 'measures utility and injection robustness of agents that use tools over untrusted data' },
      { tool: 'Inspect', check: 'agent_threat_bench_autonomy_hijack', note: 'email-triage tasks with injected instructions, scored on utility and security' },
    ],
    obligations: ['AIGE-OBL-EUAIA-ART14', 'AIGE-OBL-EUAIA-ART15', 'AIGE-OBL-OWASP-AGENTIC', 'AIGE-OBL-NIST-AGENTS'],
    iso42001: ['A.6.2.4', 'A.6.2.6'],
    aicm: ['AIS'],
    ssdf: [],
    cosais: ['single-agent', 'multi-agent'],
    atlasMitigations: [],
    related: ['llm01-2026', 'llm03-2026', 'aml-t0051', 'nistaml-015'],
    layers: [3, 4],
  },
  {
    id: 'asi02',
    taxonomy: 'owasp-asi',
    externalId: 'ASI02',
    name: 'Tool Misuse and Exploitation',
    url: ASI_URL,
    summary:
      'The agent uses tools it is allowed to use in unsafe ways: destructive parameters, chains of calls nobody intended, or exfiltration through a permitted channel.',
    control:
      'A tool allow-list with per-tool scopes, rate, egress and budget limits, validation of arguments, and a gate on destructive or external actions.',
    patterns: ['runtime-guardrail', 'agent-identity-scoped-credentials', 'kill-switch-circuit-breaker'],
    evals: [
      { tool: 'garak', check: 'agent_breaker', note: 'a multi-turn red-team probe against agents that use tools' },
      { tool: 'promptfoo', check: 'mcp', note: 'tests an agent\'s MCP tool surface for known attack patterns' },
    ],
    obligations: ['AIGE-OBL-EUAIA-ART14', 'AIGE-OBL-EUAIA-ART15', 'AIGE-OBL-OWASP-AGENTIC', 'AIGE-OBL-CSA-AICM-AGENTIC'],
    iso42001: ['A.6.2.6', 'A.9.2'],
    aicm: ['AIS', 'IAM'],
    ssdf: [],
    cosais: ['single-agent'],
    atlasMitigations: [],
    related: ['llm03-2026', 'llm06-2026', 'aml-t0053', 'aml-t0086'],
    layers: [4],
  },
  {
    id: 'asi03',
    taxonomy: 'owasp-asi',
    externalId: 'ASI03',
    name: 'Identity and Privilege Abuse',
    url: ASI_URL,
    summary:
      'Delegated identities, inherited privileges and cached credentials let an agent (or whoever steers it) act with rights the requesting user never had.',
    control:
      'A distinct workload identity per agent, short-lived delegated tokens bound to the user and the audience, and no standing secrets in agent configuration.',
    patterns: ['agent-identity-scoped-credentials', 'agent-registry'],
    evals: [
      { tool: 'promptfoo', check: 'bola', note: 'tests broken object-level authorisation: reaching another user\'s records' },
      { tool: 'promptfoo', check: 'rbac', note: 'checks that role-based access control holds through the agent' },
    ],
    obligations: ['AIGE-OBL-EUAIA-ART15', 'AIGE-OBL-OWASP-AGENTIC', 'AIGE-OBL-CSA-AICM-AGENTIC', 'AIGE-OBL-NIST-AGENTS'],
    iso42001: ['A.6.2.5'],
    aicm: ['IAM'],
    ssdf: [],
    cosais: ['single-agent', 'multi-agent'],
    atlasMitigations: [],
    related: ['llm03-2026', 'nistaml-039'],
    layers: [4],
  },
  {
    id: 'asi04',
    taxonomy: 'owasp-asi',
    externalId: 'ASI04',
    name: 'Agentic Supply Chain Vulnerabilities',
    url: ASI_URL,
    summary:
      'Tools, MCP servers, plugins, prompt templates and models that an agent loads, often at run time, can be malicious or become malicious after they were trusted.',
    control:
      'Admission of servers and tools against a registry, pinned and hashed definitions, and an AIBOM that records what the agent can reach.',
    patterns: ['aibom', 'agent-registry', 'vendor-model-due-diligence-gate'],
    evals: [
      { tool: 'promptfoo', check: 'mcp', note: 'tests the MCP servers and tools an agent connects to' },
      { tool: 'custom', check: 'definition-drift check', note: 'fails when a tool definition differs from the pinned hash' },
    ],
    obligations: ['AIGE-OBL-EUAIA-ART15', 'AIGE-OBL-EUAIA-ART25', 'AIGE-OBL-ISO42001-A10', 'AIGE-OBL-OWASP-AIBOM'],
    iso42001: ['A.10.3', 'A.7.5'],
    aicm: ['STA'],
    ssdf: ['PS.3.2'],
    cosais: ['single-agent', 'multi-agent', 'developers'],
    atlasMitigations: [],
    related: ['llm04-2026', 'aml-t0110', 'aml-t0010', 'aml-t0109'],
    layers: [2],
  },
  {
    id: 'asi05',
    taxonomy: 'owasp-asi',
    externalId: 'ASI05',
    name: 'Unexpected Code Execution (RCE)',
    url: ASI_URL,
    summary:
      'Code the agent writes or runs, directly or through a tool, executes outside the bounds anyone intended and compromises the host or the environment around it.',
    control:
      'Sandboxed execution with no ambient credentials, deny-by-default network and file access, and review of generated code before it runs anywhere that matters.',
    patterns: ['runtime-guardrail', 'kill-switch-circuit-breaker'],
    evals: [
      { tool: 'Inspect', check: 'cyberseceval_2', note: 'includes a code-interpreter abuse task alongside prompt injection' },
      { tool: 'promptfoo', check: 'shell-injection', note: 'tries to execute shell commands through the model' },
    ],
    obligations: ['AIGE-OBL-EUAIA-ART15', 'AIGE-OBL-OWASP-AGENTIC', 'AIGE-OBL-ETSI-304223'],
    iso42001: ['A.6.2.5', 'A.6.2.6'],
    aicm: ['AIS', 'IVS'],
    ssdf: [],
    cosais: ['single-agent'],
    atlasMitigations: [],
    related: ['llm10-2026'],
    layers: [4],
  },
  {
    id: 'asi06',
    taxonomy: 'owasp-asi',
    externalId: 'ASI06',
    name: 'Memory & Context Poisoning',
    url: ASI_URL,
    summary:
      'Stored memory, retrieval stores or carried context are corrupted so the poison persists across sessions and shapes later decisions.',
    control:
      'A gate on memory writes, namespaces per user and task, provenance on stored items, and the ability to roll memory back.',
    patterns: ['runtime-guardrail', 'continuous-assurance-telemetry', 'adversarial-red-team-suite'],
    evals: [
      { tool: 'Inspect', check: 'agent_threat_bench_memory_poison', note: 'tasks with poisoned memory stores, scored on utility and security' },
      { tool: 'promptfoo', check: 'agentic:memory-poisoning', note: 'tests whether an agent can be made to store and act on planted memories' },
    ],
    obligations: ['AIGE-OBL-EUAIA-ART15', 'AIGE-OBL-EUAIA-ART12', 'AIGE-OBL-OWASP-AGENTIC'],
    iso42001: ['A.6.2.6', 'A.6.2.8'],
    aicm: ['AIS', 'DSP'],
    ssdf: [],
    cosais: ['single-agent', 'multi-agent'],
    atlasMitigations: [],
    related: ['llm05-2026', 'llm09-2026', 'aml-t0080', 'aml-t0070'],
    layers: [3, 4],
  },
  {
    id: 'asi07',
    taxonomy: 'owasp-asi',
    externalId: 'ASI07',
    name: 'Insecure Inter-Agent Communication',
    url: ASI_URL,
    summary:
      'Messages between agents travel without authentication or integrity, so a peer can be spoofed, a message replayed or altered, and trust passes along a chain that nobody checked.',
    control:
      'Mutual authentication between agents, signed and verified agent descriptions, an allow-list of peers, and messages bound to the task they belong to.',
    patterns: ['agent-identity-scoped-credentials', 'agent-registry'],
    evals: [
      { tool: 'custom', check: 'unregistered-peer test', note: 'a message from an agent not in the registry, or with a bad signature, must be refused' },
    ],
    obligations: ['AIGE-OBL-EUAIA-ART15', 'AIGE-OBL-OWASP-AGENTIC', 'AIGE-OBL-NIST-AGENTS', 'AIGE-OBL-CSA-AICM-AGENTIC'],
    iso42001: ['A.6.2.5'],
    aicm: ['IAM', 'AIS'],
    ssdf: [],
    cosais: ['multi-agent'],
    atlasMitigations: [],
    related: [],
    layers: [4],
  },
  {
    id: 'asi08',
    taxonomy: 'owasp-asi',
    externalId: 'ASI08',
    name: 'Cascading Failures',
    url: ASI_URL,
    summary:
      'One faulty or compromised agent, tool or output propagates through connected agents and workflows, and each hop amplifies the harm.',
    control:
      'Depth, fan-out and budget limits, a breaker per agent, isolation between workflows, and telemetry that traces a failure back to its first hop.',
    patterns: ['kill-switch-circuit-breaker', 'continuous-assurance-telemetry', 'incident-pipeline'],
    evals: [
      { tool: 'custom', check: 'fault-injection drill', note: 'a tool returns errors or bad data on purpose; the breaker must trip within its budget' },
    ],
    obligations: ['AIGE-OBL-EUAIA-ART15', 'AIGE-OBL-EUAIA-ART72', 'AIGE-OBL-OWASP-AGENTIC', 'AIGE-OBL-NISTRMF-MANAGE'],
    iso42001: ['A.6.2.6'],
    aicm: ['BCR', 'LOG'],
    ssdf: [],
    cosais: ['multi-agent'],
    atlasMitigations: [],
    related: ['llm06-2026', 'aml-t0034'],
    layers: [4, 5],
  },
  {
    id: 'asi09',
    taxonomy: 'owasp-asi',
    externalId: 'ASI09',
    name: 'Human-Agent Trust Exploitation',
    url: ASI_URL,
    summary:
      'Fluent, confident or persuasive agent output leads people to approve harmful actions, disclose information or skip the check they were meant to make.',
    control:
      'Approvals that show the raw action and its consequences, not the agent\'s summary; oversight metrics such as approval rates and time to decide; and disclosure that the user is dealing with an AI system.',
    patterns: ['human-in-the-loop-gate', 'policy-card'],
    evals: [
      { tool: 'Inspect', check: 'make_me_pay', note: 'measures persuasive capability in a simulated donation conversation' },
      { tool: 'promptfoo', check: 'overreliance', note: 'checks whether the model goes along with a wrong user assumption' },
    ],
    obligations: ['AIGE-OBL-EUAIA-ART14', 'AIGE-OBL-EUAIA-ART13', 'AIGE-OBL-EUAIA-ART50', 'AIGE-OBL-OWASP-AGENTIC'],
    iso42001: ['A.8.2', 'A.9.2'],
    aicm: ['AIS', 'HRS'],
    ssdf: [],
    cosais: ['single-agent'],
    atlasMitigations: [],
    related: ['llm07-2026', 'llm01-2026'],
    layers: [4, 5],
  },
  {
    id: 'asi10',
    taxonomy: 'owasp-asi',
    externalId: 'ASI10',
    name: 'Rogue Agents',
    url: ASI_URL,
    summary:
      'An agent drifts from its intended behaviour or scope (through compromise, misalignment or neglect) and keeps acting, possibly deceptively, where nobody is watching.',
    control:
      'A registry entry with an owner and an expiry for every agent, discovery of agents that are not registered, behavioural monitoring, and a drilled kill switch.',
    patterns: ['agent-registry', 'shadow-ai-discovery', 'kill-switch-circuit-breaker', 'incident-pipeline'],
    evals: [
      { tool: 'Inspect', check: 'agentic_misalignment', note: 'fictional scenarios that probe for agents acting against their principals' },
      { tool: 'custom', check: 'registry reconciliation', note: 'every agent identity seen at run time must match a live registry entry' },
    ],
    obligations: ['AIGE-OBL-EUAIA-ART14', 'AIGE-OBL-EUAIA-ART26', 'AIGE-OBL-EUAIA-ART72', 'AIGE-OBL-OWASP-AGENTIC'],
    iso42001: ['A.6.2.6', 'A.6.2.8'],
    aicm: ['GRC', 'LOG'],
    ssdf: [],
    cosais: ['single-agent', 'multi-agent'],
    atlasMitigations: [],
    related: [],
    layers: [2, 4],
  },

  // ---- MITRE ATLAS techniques (v2026.09) -----------------------------------
  {
    id: 'aml-t0051',
    taxonomy: 'mitre-atlas',
    externalId: 'AML.T0051',
    name: 'LLM Prompt Injection',
    url: atlasUrl('AML.T0051'),
    summary:
      'Crafted prompts make the model ignore its instructions and follow the adversary\'s, directly, indirectly through content it ingests, or on a trigger (sub-techniques .000 Direct, .001 Indirect, .002 Triggered). ATLAS places it under Execution.',
    control: 'Guardrails on inputs and outputs, restricted tool use on untrusted data, telemetry, and a standing red team.',
    patterns: ['runtime-guardrail', 'adversarial-red-team-suite'],
    evals: [
      { tool: 'garak', check: 'promptinject', note: 'plaintext injections inside requests for innocuous information' },
      { tool: 'promptfoo', check: 'indirect-prompt-injection', note: 'instructions planted in prompt variables' },
    ],
    obligations: ['AIGE-OBL-EUAIA-ART15', 'AIGE-OBL-EUAIA-ART55', 'AIGE-OBL-NISTRMF-MEASURE'],
    iso42001: ['A.6.2.4'],
    aicm: ['AIS'],
    ssdf: [],
    cosais: ['genai-assistant', 'single-agent'],
    atlasMitigations: ['AML.M0019', 'AML.M0020', 'AML.M0021', 'AML.M0022', 'AML.M0024', 'AML.M0033', 'AML.M0035'],
    related: ['llm01-2026', 'asi01', 'nistaml-018', 'nistaml-015'],
    layers: [3, 4],
  },
  {
    id: 'aml-t0054',
    taxonomy: 'mitre-atlas',
    externalId: 'AML.T0054',
    name: 'LLM Jailbreak',
    url: atlasUrl('AML.T0054'),
    summary:
      'The model is induced to bypass its safety behaviour and guardrails and produce what it is meant to withhold, by adversarial prompting or by changing weights or safety mechanisms.',
    control: 'Alignment and guardrails tested against current jailbreak families, with the jailbreak rate as a release threshold.',
    patterns: ['runtime-guardrail', 'adversarial-red-team-suite', 'eval-gate-in-ci'],
    evals: [
      { tool: 'Inspect', check: 'strong_reject', note: 'scores both refusal and how useful a non-refused harmful answer is' },
      { tool: 'garak', check: 'tap', note: 'Tree of Attacks with Pruning: model-generated jailbreak prompts' },
    ],
    obligations: ['AIGE-OBL-EUAIA-ART15', 'AIGE-OBL-EUAIA-ART55', 'AIGE-OBL-GPAICOP-SAFETY', 'AIGE-OBL-NIST-AI800-1'],
    iso42001: ['A.6.2.4'],
    aicm: ['AIS', 'MDS'],
    ssdf: ['PW.3.3'],
    cosais: ['genai-assistant', 'developers'],
    atlasMitigations: ['AML.M0020', 'AML.M0021', 'AML.M0022', 'AML.M0035'],
    related: ['llm01-2026', 'nistaml-018'],
    layers: [3, 4],
  },
  {
    id: 'aml-t0056',
    taxonomy: 'mitre-atlas',
    externalId: 'AML.T0056',
    name: 'Extract LLM System Prompt',
    url: atlasUrl('AML.T0056'),
    summary:
      'The adversary obtains the system prompt, through injection that makes the model reveal it or from a configuration file, and uses it to plan further attacks.',
    control: 'Nothing secret in the prompt, policy enforced outside the model, and extraction attempts logged.',
    patterns: ['runtime-guardrail', 'adversarial-red-team-suite'],
    evals: [
      { tool: 'garak', check: 'sysprompt_extraction', note: 'direct requests, encoding tricks and role-play' },
      { tool: 'promptfoo', check: 'prompt-extraction', note: 'attempts to get the model to reveal its system prompt' },
    ],
    obligations: ['AIGE-OBL-EUAIA-ART15', 'AIGE-OBL-OWASP-LLM'],
    iso42001: ['A.6.2.4'],
    aicm: ['AIS'],
    ssdf: [],
    cosais: ['genai-assistant'],
    atlasMitigations: ['AML.M0020', 'AML.M0021', 'AML.M0022', 'AML.M0035'],
    related: ['llm08-2026', 'nistaml-035'],
    layers: [3, 4],
  },
  {
    id: 'aml-t0057',
    taxonomy: 'mitre-atlas',
    externalId: 'AML.T0057',
    name: 'LLM Data Leakage',
    url: atlasUrl('AML.T0057'),
    summary:
      'Crafted prompts make the model leak private or proprietary information from its training data, its connected data sources or other users.',
    control: 'Data classification before retrieval, output filtering for personal and secret data, and session isolation.',
    patterns: ['runtime-guardrail', 'eval-gate-in-ci'],
    evals: [
      { tool: 'promptfoo', check: 'pii:direct', note: 'direct attempts to obtain personal data' },
      { tool: 'garak', check: 'leakreplay', note: 'replay attacks that test whether a document was in the training data' },
    ],
    obligations: ['AIGE-OBL-EUAIA-ART15', 'AIGE-OBL-EUAIA-ART10', 'AIGE-OBL-ISO42001-A7'],
    iso42001: ['A.7.4', 'A.6.2.6'],
    aicm: ['DSP'],
    ssdf: [],
    cosais: ['genai-assistant'],
    atlasMitigations: ['AML.M0008', 'AML.M0020', 'AML.M0021', 'AML.M0022', 'AML.M0035'],
    related: ['llm02-2026', 'nistaml-038'],
    layers: [3, 4],
  },
  {
    id: 'aml-t0077',
    taxonomy: 'mitre-atlas',
    externalId: 'AML.T0077',
    name: 'LLM Response Rendering',
    url: atlasUrl('AML.T0077'),
    summary:
      'The model is induced to embed private data in a reference to external content (an image, a link) that the user\'s client fetches on rendering, sending the data to the adversary unseen.',
    control: 'Render model output with external fetches disabled or restricted to an allow-list, and strip data from URLs.',
    patterns: ['runtime-guardrail'],
    evals: [{ tool: 'garak', check: 'web_injection', note: 'includes Markdown image exfiltration probes' }],
    obligations: ['AIGE-OBL-EUAIA-ART15', 'AIGE-OBL-OWASP-LLM'],
    iso42001: ['A.6.2.5'],
    aicm: ['AIS'],
    ssdf: [],
    cosais: ['genai-assistant'],
    atlasMitigations: [],
    related: ['llm10-2026', 'llm02-2026'],
    layers: [4],
  },
  {
    id: 'aml-t0053',
    taxonomy: 'mitre-atlas',
    externalId: 'AML.T0053',
    name: 'AI Agent Tool Invocation',
    url: atlasUrl('AML.T0053'),
    summary:
      'With access to an agent, the adversary invokes the tools the agent holds (integrations, data sources, code execution) to reach systems it could not reach directly.',
    control: 'Per-tool permissions, single-user scoping, no tool calls driven by untrusted data without a check, and human approval for sensitive actions.',
    patterns: ['agent-identity-scoped-credentials', 'human-in-the-loop-gate', 'runtime-guardrail'],
    evals: [
      { tool: 'garak', check: 'agent_breaker', note: 'multi-turn attacks on agents that use tools' },
      { tool: 'promptfoo', check: 'tool-discovery', note: 'checks whether the agent reveals the tools it holds' },
    ],
    obligations: ['AIGE-OBL-EUAIA-ART14', 'AIGE-OBL-EUAIA-ART15', 'AIGE-OBL-CSA-AICM-AGENTIC'],
    iso42001: ['A.6.2.6', 'A.9.2'],
    aicm: ['IAM', 'AIS'],
    ssdf: [],
    cosais: ['single-agent', 'multi-agent'],
    atlasMitigations: ['AML.M0020', 'AML.M0021', 'AML.M0022', 'AML.M0024', 'AML.M0026', 'AML.M0027', 'AML.M0028', 'AML.M0029', 'AML.M0030', 'AML.M0032', 'AML.M0033', 'AML.M0035'],
    related: ['asi02', 'llm03-2026', 'nistaml-039'],
    layers: [4],
  },
  {
    id: 'aml-t0086',
    taxonomy: 'mitre-atlas',
    externalId: 'AML.T0086',
    name: 'Exfiltration via AI Agent Tool Invocation',
    url: atlasUrl('AML.T0086'),
    summary:
      'An agent tool that can write (email, documents, records) is used to encode sensitive data into its parameters and send it somewhere the adversary controls, looking like legitimate work.',
    control: 'Egress allow-lists, data-loss checks on tool arguments, and approval for writes that leave the organisation.',
    patterns: ['runtime-guardrail', 'agent-identity-scoped-credentials', 'continuous-assurance-telemetry', 'incident-pipeline'],
    evals: [
      { tool: 'Inspect', check: 'agent_threat_bench_data_exfil', note: 'customer-support tasks with injected exfiltration instructions' },
      { tool: 'promptfoo', check: 'data-exfil', note: 'indirect injection in web content that tries to make the agent send data out' },
    ],
    obligations: ['AIGE-OBL-EUAIA-ART15', 'AIGE-OBL-OWASP-AGENTIC'],
    iso42001: ['A.6.2.6'],
    aicm: ['DSP', 'LOG'],
    ssdf: [],
    cosais: ['single-agent'],
    atlasMitigations: ['AML.M0024', 'AML.M0026', 'AML.M0027', 'AML.M0028', 'AML.M0029', 'AML.M0030', 'AML.M0032', 'AML.M0033'],
    related: ['asi02', 'asi01', 'llm02-2026'],
    layers: [4],
  },
  {
    id: 'aml-t0080',
    taxonomy: 'mitre-atlas',
    externalId: 'AML.T0080',
    name: 'AI Agent Context Poisoning',
    url: atlasUrl('AML.T0080'),
    summary:
      'The adversary changes the context an agent works from, in its memory (.000) or in a conversation thread (.001), to alter its behaviour persistently. ATLAS places it under Persistence.',
    control: 'Hardened memory: a gate on writes, provenance on stored items, and rollback.',
    patterns: ['runtime-guardrail', 'continuous-assurance-telemetry'],
    evals: [
      { tool: 'promptfoo', check: 'agentic:memory-poisoning', note: 'planted memories the agent should neither store nor act on' },
      { tool: 'Inspect', check: 'agent_threat_bench_memory_poison', note: 'poisoned memory stores in agent tasks' },
    ],
    obligations: ['AIGE-OBL-EUAIA-ART15', 'AIGE-OBL-OWASP-AGENTIC'],
    iso42001: ['A.6.2.6'],
    aicm: ['AIS'],
    ssdf: [],
    cosais: ['single-agent', 'multi-agent'],
    atlasMitigations: ['AML.M0031', 'AML.M0035'],
    related: ['asi06', 'llm05-2026'],
    layers: [4],
  },
  {
    id: 'aml-t0070',
    taxonomy: 'mitre-atlas',
    externalId: 'AML.T0070',
    name: 'RAG Poisoning',
    url: atlasUrl('AML.T0070'),
    summary:
      'Malicious content is placed where a retrieval system indexes it, so it surfaces in future answers for chosen queries.',
    control: 'A source allow-list for ingestion, provenance recorded for every indexed document, and canary documents that must never be retrieved.',
    patterns: ['aibom', 'runtime-guardrail', 'adversarial-red-team-suite'],
    evals: [{ tool: 'promptfoo', check: 'rag-poisoning', note: 'poisoned documents in the retrieval corpus' }],
    obligations: ['AIGE-OBL-EUAIA-ART10', 'AIGE-OBL-EUAIA-ART15', 'AIGE-OBL-ISO42001-A7'],
    iso42001: ['A.7.5'],
    aicm: ['DSP'],
    ssdf: ['PW.3.2'],
    cosais: ['genai-assistant'],
    atlasMitigations: ['AML.M0020', 'AML.M0035'],
    related: ['llm09-2026', 'llm05-2026', 'asi06', 'nistaml-015'],
    layers: [2, 4],
  },
  {
    id: 'aml-t0110',
    taxonomy: 'mitre-atlas',
    externalId: 'AML.T0110',
    name: 'AI Agent Tool Poisoning',
    url: atlasUrl('AML.T0110'),
    summary:
      'A tool the agent uses is poisoned in its model-visible definition, its implementation or its run-time responses; the tool may be an integration, a package, an MCP server or an agent skill.',
    control: 'Admit tools through a registry, pin and hash their definitions, and treat tool responses as untrusted input.',
    patterns: ['aibom', 'agent-registry', 'vendor-model-due-diligence-gate'],
    evals: [
      { tool: 'promptfoo', check: 'mcp', note: 'MCP attack patterns against the agent\'s tool surface' },
      { tool: 'custom', check: 'definition-drift check', note: 'fails when a tool definition changes without review' },
    ],
    obligations: ['AIGE-OBL-EUAIA-ART15', 'AIGE-OBL-ISO42001-A10', 'AIGE-OBL-OWASP-AGENTIC'],
    iso42001: ['A.10.3'],
    aicm: ['STA'],
    ssdf: ['PS.3.2'],
    cosais: ['single-agent', 'multi-agent'],
    atlasMitigations: [],
    related: ['asi04', 'llm04-2026'],
    layers: [2, 4],
  },
  {
    id: 'aml-t0010',
    taxonomy: 'mitre-atlas',
    externalId: 'AML.T0010',
    name: 'AI Supply Chain Compromise',
    url: atlasUrl('AML.T0010'),
    summary:
      'Initial access through the parts of the supply chain unique to AI: hardware, AI software, data, models, container registries and agent tools (sub-techniques .000 to .005).',
    control: 'Verify artefacts (hashes, signatures) before use, keep an AIBOM, and red-team third-party components.',
    patterns: ['aibom', 'vendor-model-due-diligence-gate'],
    evals: [
      { tool: 'garak', check: 'fileformats', note: 'looks for vulnerable items among the files that ship with a model' },
      { tool: 'custom', check: 'AIBOM diff gate', note: 'blocks an artefact whose hash is not in the approved AIBOM' },
    ],
    obligations: ['AIGE-OBL-EUAIA-ART15', 'AIGE-OBL-EUAIA-ART25', 'AIGE-OBL-OWASP-AIBOM', 'AIGE-OBL-ETSI-304223'],
    iso42001: ['A.10.3', 'A.7.5'],
    aicm: ['STA'],
    ssdf: ['PS.3.2'],
    cosais: ['developers'],
    atlasMitigations: ['AML.M0014', 'AML.M0020', 'AML.M0023', 'AML.M0035'],
    related: ['llm04-2026', 'asi04', 'nistaml-051'],
    layers: [2, 3],
  },
  {
    id: 'aml-t0109',
    taxonomy: 'mitre-atlas',
    externalId: 'AML.T0109',
    name: 'AI Supply Chain Rug Pull',
    url: atlasUrl('AML.T0109'),
    summary:
      'A component is published in good faith, earns adoption, and is then updated with a malicious variant, after the scrutiny that came with first adoption has passed.',
    control: 'Pin versions, treat every update as a new admission, and run a canary eval that notices behaviour change nobody announced.',
    patterns: ['vendor-model-due-diligence-gate', 'aibom', 'continuous-assurance-telemetry'],
    evals: [
      { tool: 'custom', check: 'canary regression', note: 'a small fixed eval run on a schedule against each pinned component; drift raises a finding' },
    ],
    obligations: ['AIGE-OBL-EUAIA-ART15', 'AIGE-OBL-EUAIA-ART26', 'AIGE-OBL-ISO42001-A10'],
    iso42001: ['A.10.3', 'A.6.2.6'],
    aicm: ['STA', 'CCC'],
    ssdf: ['PS.3.2'],
    cosais: ['developers', 'single-agent'],
    atlasMitigations: [],
    related: ['asi04', 'llm04-2026'],
    layers: [2, 5],
  },
  {
    id: 'aml-t0020',
    taxonomy: 'mitre-atlas',
    externalId: 'AML.T0020',
    name: 'Training Data Poisoning',
    url: atlasUrl('AML.T0020'),
    summary:
      'Training or fine-tuning data (samples, labels, feedback) is added, removed or altered to bias the model, degrade it or embed a backdoor.',
    control: 'Sanitise and validate data, keep dataset provenance and an AIBOM, restrict write access to data at rest.',
    patterns: ['aibom', 'eval-gate-in-ci', 'model-card-as-control-evidence'],
    evals: [
      { tool: 'custom', check: 'data admission check', note: 'a dataset without provenance, owner and a tamper scan cannot enter training' },
    ],
    obligations: ['AIGE-OBL-EUAIA-ART10', 'AIGE-OBL-EUAIA-ART15', 'AIGE-OBL-ISO42001-A7'],
    iso42001: ['A.7.4', 'A.7.5'],
    aicm: ['MDS', 'DSP'],
    ssdf: ['PW.3.1', 'PW.3.2'],
    cosais: ['developers', 'predictive'],
    atlasMitigations: ['AML.M0001', 'AML.M0005', 'AML.M0007', 'AML.M0008', 'AML.M0023', 'AML.M0025', 'AML.M0035'],
    related: ['llm05-2026', 'nistaml-013', 'nistaml-023'],
    layers: [2, 3],
  },
  {
    id: 'aml-t0018',
    taxonomy: 'mitre-atlas',
    externalId: 'AML.T0018',
    name: 'Manipulate AI Model',
    url: atlasUrl('AML.T0018'),
    summary:
      'A model artefact or its bundled components is altered (weights, architecture, prompt-construction logic, embedded malware) and may behave normally until a chosen input arrives.',
    control: 'Sign and verify model artefacts, restrict access to models at rest, and validate the model before each release.',
    patterns: ['aibom', 'eval-gate-in-ci'],
    evals: [
      { tool: 'custom', check: 'signature verification', note: 'the pipeline fails on a hash or signature mismatch' },
      { tool: 'garak', check: 'fileformats', note: 'flags risky file formats in a model repository' },
    ],
    obligations: ['AIGE-OBL-EUAIA-ART15', 'AIGE-OBL-GPAICOP-SAFETY', 'AIGE-OBL-ISO42001-A6'],
    iso42001: ['A.6.2.4', 'A.7.5'],
    aicm: ['MDS', 'CEK'],
    ssdf: ['PS.1.3'],
    cosais: ['developers'],
    atlasMitigations: ['AML.M0005', 'AML.M0008', 'AML.M0013', 'AML.M0035'],
    related: ['nistaml-051', 'nistaml-023'],
    layers: [2, 3],
  },
  {
    id: 'aml-t0024',
    taxonomy: 'mitre-atlas',
    externalId: 'AML.T0024',
    name: 'Exfiltration via AI Inference API',
    url: atlasUrl('AML.T0024'),
    summary:
      'Queries to the inference API leak private information about training data (membership .000, inversion .001) or the model itself (extraction .002).',
    control: 'Rate and volume limits per identity, access control on the API, query-pattern monitoring, and privacy testing of tuned models.',
    patterns: ['runtime-guardrail', 'continuous-assurance-telemetry', 'adversarial-red-team-suite'],
    evals: [
      { tool: 'garak', check: 'leakreplay', note: 'tests whether the model reproduces text it was trained on' },
      { tool: 'custom', check: 'extraction probe', note: 'a scripted query campaign against the rate limits and the detector' },
    ],
    obligations: ['AIGE-OBL-EUAIA-ART15', 'AIGE-OBL-EUAIA-ART55', 'AIGE-OBL-GPAICOP-SAFETY'],
    iso42001: ['A.6.2.6'],
    aicm: ['DSP', 'LOG'],
    ssdf: ['RV.1.1'],
    cosais: ['predictive', 'genai-assistant'],
    atlasMitigations: ['AML.M0004', 'AML.M0019', 'AML.M0024', 'AML.M0035'],
    related: ['nistaml-031', 'nistaml-032', 'nistaml-033'],
    layers: [4],
  },
  {
    id: 'aml-t0015',
    taxonomy: 'mitre-atlas',
    externalId: 'AML.T0015',
    name: 'Evade AI Model',
    url: atlasUrl('AML.T0015'),
    summary:
      'Crafted adversarial data or deepfakes make a model misidentify what it sees, for example to slip past AI-based malware or fraud detection.',
    control: 'Hardened models, adversarial input detection, ensembles or multi-sensor checks, and robustness thresholds in the release gate.',
    patterns: ['adversarial-red-team-suite', 'eval-gate-in-ci'],
    evals: [
      { tool: 'custom', check: 'perturbation suite', note: 'bounded perturbations of held-out inputs; accuracy under attack is a release threshold' },
    ],
    obligations: ['AIGE-OBL-EUAIA-ART15', 'AIGE-OBL-NISTRMF-MEASURE', 'AIGE-OBL-ISO42001-A6'],
    iso42001: ['A.6.2.4'],
    aicm: ['MDS'],
    ssdf: ['PW.3.3'],
    cosais: ['predictive'],
    atlasMitigations: ['AML.M0003', 'AML.M0006', 'AML.M0009', 'AML.M0010', 'AML.M0015', 'AML.M0034', 'AML.M0035'],
    related: ['nistaml-022'],
    layers: [3],
  },
  {
    id: 'aml-t0034',
    taxonomy: 'mitre-atlas',
    externalId: 'AML.T0034',
    name: 'Cost Harvesting',
    url: atlasUrl('AML.T0034'),
    summary:
      'The adversary drives AI services beyond normal capacity to raise the victim\'s cost, with many cheap queries, a few expensive ones, or agentic loops (.002 Agentic Resource Consumption).',
    control: 'Query and resource limits per identity, budgets per agent, and alerts on spend anomalies.',
    patterns: ['runtime-guardrail', 'kill-switch-circuit-breaker', 'continuous-assurance-telemetry'],
    evals: [{ tool: 'promptfoo', check: 'reasoning-dos', note: 'resource exhaustion through excessive reasoning' }],
    obligations: ['AIGE-OBL-EUAIA-ART15', 'AIGE-OBL-CSA-AICM'],
    iso42001: ['A.6.2.6'],
    aicm: ['BCR', 'AIS'],
    ssdf: [],
    cosais: ['genai-assistant', 'multi-agent'],
    atlasMitigations: ['AML.M0004', 'AML.M0019', 'AML.M0035', 'AML.M0036'],
    related: ['llm06-2026', 'asi08', 'nistaml-014'],
    layers: [4],
  },
  {
    id: 'aml-t0060',
    taxonomy: 'mitre-atlas',
    externalId: 'AML.T0060',
    name: 'Publish Hallucinated Entities',
    url: atlasUrl('AML.T0060'),
    summary:
      'The adversary registers a package, website or address that models tend to invent, and waits for a victim to follow the hallucination.',
    control: 'Allow-lists for packages and domains the system may recommend or install, and checks that generated references exist.',
    patterns: ['runtime-guardrail', 'eval-gate-in-ci', 'aibom'],
    evals: [
      { tool: 'garak', check: 'packagehallucination', note: 'asks for code and checks for packages that do not exist' },
    ],
    obligations: ['AIGE-OBL-EUAIA-ART15', 'AIGE-OBL-OWASP-LLM'],
    iso42001: ['A.6.2.4'],
    aicm: ['STA', 'AIS'],
    ssdf: [],
    cosais: ['genai-assistant', 'developers'],
    atlasMitigations: [],
    related: ['llm07-2026', 'llm04-2026'],
    layers: [3, 4],
  },

  // ---- NIST AI 100-2 E2025 attack classes -----------------------------------
  {
    id: 'nistaml-022',
    taxonomy: 'nist-aml',
    externalId: 'NISTAML.022',
    name: 'Evasion',
    url: NIST_AML_URL,
    summary:
      'An integrity attack on predictive models at deployment time: inputs are modified, often imperceptibly, so the model returns the attacker\'s chosen output.',
    control: 'Adversarial training and input checks, with accuracy under bounded attack measured in the release gate.',
    patterns: ['adversarial-red-team-suite', 'eval-gate-in-ci'],
    evals: [
      { tool: 'custom', check: 'perturbation suite', note: 'accuracy under a stated perturbation budget, as a threshold' },
    ],
    obligations: ['AIGE-OBL-EUAIA-ART15', 'AIGE-OBL-NISTRMF-MEASURE'],
    iso42001: ['A.6.2.4'],
    aicm: ['MDS'],
    ssdf: ['PW.3.3'],
    cosais: ['predictive'],
    atlasMitigations: [],
    related: ['aml-t0015'],
    layers: [3],
  },
  {
    id: 'nistaml-013',
    taxonomy: 'nist-aml',
    externalId: 'NISTAML.013',
    name: 'Data Poisoning',
    url: NIST_AML_URL,
    summary:
      'Training data is manipulated to degrade the model broadly (availability) or on chosen inputs (integrity); NIST lists it for both predictive and generative models.',
    control: 'Data provenance, sanitisation and outlier checks before training, and evals that compare against a clean baseline.',
    patterns: ['aibom', 'eval-gate-in-ci'],
    evals: [
      { tool: 'custom', check: 'data admission check', note: 'provenance, owner and tamper scan required before training' },
    ],
    obligations: ['AIGE-OBL-EUAIA-ART10', 'AIGE-OBL-EUAIA-ART15', 'AIGE-OBL-ISO42001-A7'],
    iso42001: ['A.7.4', 'A.7.5'],
    aicm: ['MDS', 'DSP'],
    ssdf: ['PW.3.1'],
    cosais: ['developers', 'predictive'],
    atlasMitigations: [],
    related: ['aml-t0020', 'llm05-2026'],
    layers: [2, 3],
  },
  {
    id: 'nistaml-023',
    taxonomy: 'nist-aml',
    externalId: 'NISTAML.023',
    name: 'Backdoor Poisoning',
    url: NIST_AML_URL,
    summary:
      'Poisoned training data implants a trigger, so the model behaves normally until the trigger appears and then does what the attacker wants.',
    control: 'Provenance on data and models, trigger scanning, and red-team cases for suspected triggers.',
    patterns: ['aibom', 'adversarial-red-team-suite'],
    evals: [
      { tool: 'custom', check: 'trigger regression set', note: 'suspected triggers run against every retrained version' },
    ],
    obligations: ['AIGE-OBL-EUAIA-ART10', 'AIGE-OBL-EUAIA-ART15', 'AIGE-OBL-ISO42001-A7'],
    iso42001: ['A.7.5', 'A.6.2.4'],
    aicm: ['MDS'],
    ssdf: ['PW.3.1'],
    cosais: ['developers'],
    atlasMitigations: [],
    related: ['aml-t0020', 'aml-t0018', 'llm05-2026'],
    layers: [2, 3],
  },
  {
    id: 'nistaml-051',
    taxonomy: 'nist-aml',
    externalId: 'NISTAML.051',
    name: 'Model Poisoning (supply chain)',
    url: NIST_AML_URL,
    summary:
      'The model itself (its weights or parameters) is modified and distributed through the supply chain, so every downstream user inherits the flaw.',
    control: 'Obtain models from verified sources, verify hashes and signatures, and keep the AIBOM current.',
    patterns: ['aibom', 'vendor-model-due-diligence-gate'],
    evals: [
      { tool: 'custom', check: 'signature verification', note: 'the pipeline refuses a model whose hash or signature does not match' },
    ],
    obligations: ['AIGE-OBL-EUAIA-ART15', 'AIGE-OBL-EUAIA-ART25', 'AIGE-OBL-OWASP-AIBOM'],
    iso42001: ['A.10.3', 'A.7.5'],
    aicm: ['STA', 'MDS'],
    ssdf: ['PS.1.3', 'PS.3.2'],
    cosais: ['developers'],
    atlasMitigations: [],
    related: ['aml-t0010', 'aml-t0018', 'llm04-2026'],
    layers: [2],
  },
  {
    id: 'nistaml-031',
    taxonomy: 'nist-aml',
    externalId: 'NISTAML.031',
    name: 'Model Extraction',
    url: NIST_AML_URL,
    summary:
      'Queries to a deployed model are used to reconstruct a functionally similar copy, which also helps the attacker stage other attacks offline.',
    control: 'Rate limits and query monitoring per identity, and output that reveals no more than the use case needs.',
    patterns: ['runtime-guardrail', 'continuous-assurance-telemetry'],
    evals: [
      { tool: 'custom', check: 'extraction probe', note: 'a scripted campaign that must trip the rate limit and the detector' },
    ],
    obligations: ['AIGE-OBL-EUAIA-ART15', 'AIGE-OBL-GPAICOP-SAFETY'],
    iso42001: ['A.6.2.6'],
    aicm: ['LOG', 'AIS'],
    ssdf: ['PS.1.3'],
    cosais: ['predictive', 'genai-assistant'],
    atlasMitigations: [],
    related: ['aml-t0024', 'llm06-2026'],
    layers: [4],
  },
  {
    id: 'nistaml-032',
    taxonomy: 'nist-aml',
    externalId: 'NISTAML.032',
    name: 'Reconstruction',
    url: NIST_AML_URL,
    summary:
      'A privacy attack that recovers training records, or attributes of them, from the model or its outputs.',
    control: 'Minimise personal data in training, test tuned models for memorisation before release, and filter outputs.',
    patterns: ['eval-gate-in-ci', 'adversarial-red-team-suite'],
    evals: [
      { tool: 'garak', check: 'propile', note: 'probes whether the model has memorised and can leak personal data' },
    ],
    obligations: ['AIGE-OBL-EUAIA-ART10', 'AIGE-OBL-EUAIA-ART15'],
    iso42001: ['A.7.4', 'A.6.2.4'],
    aicm: ['DSP'],
    ssdf: [],
    cosais: ['predictive'],
    atlasMitigations: [],
    related: ['aml-t0024', 'llm02-2026'],
    layers: [3],
  },
  {
    id: 'nistaml-033',
    taxonomy: 'nist-aml',
    externalId: 'NISTAML.033',
    name: 'Membership Inference',
    url: NIST_AML_URL,
    summary: 'The attacker infers whether a given record was in the training data, which is itself a privacy breach when the dataset is sensitive.',
    control: 'Privacy testing of models trained or tuned on personal data, and limits on the confidence detail the API returns.',
    patterns: ['eval-gate-in-ci', 'adversarial-red-team-suite'],
    evals: [{ tool: 'garak', check: 'leakreplay', note: 'tests whether a document was in the training data by replay' }],
    obligations: ['AIGE-OBL-EUAIA-ART10', 'AIGE-OBL-EUAIA-ART15'],
    iso42001: ['A.7.4'],
    aicm: ['DSP'],
    ssdf: [],
    cosais: ['predictive', 'genai-assistant'],
    atlasMitigations: [],
    related: ['aml-t0024', 'llm02-2026'],
    layers: [3],
  },
  {
    id: 'nistaml-018',
    taxonomy: 'nist-aml',
    externalId: 'NISTAML.018',
    name: 'Prompt Injection',
    url: NIST_AML_URL,
    summary:
      'A direct prompting attack: the attacker, as the user, supplies instructions that override the application\'s. NIST treats a jailbreak as one kind of it and lists the class under availability, integrity, privacy and misuse violations alike.',
    control: 'Guardrails on inputs and outputs, alignment tested against current attack families, and misuse monitoring.',
    patterns: ['runtime-guardrail', 'adversarial-red-team-suite'],
    evals: [
      { tool: 'garak', check: 'dan', note: 'do-anything-now style jailbreak prompts' },
      { tool: 'Inspect', check: 'strong_reject', note: 'jailbreak susceptibility with a graded evaluator' },
    ],
    obligations: ['AIGE-OBL-EUAIA-ART15', 'AIGE-OBL-EUAIA-ART55', 'AIGE-OBL-NIST-AI800-1'],
    iso42001: ['A.6.2.4'],
    aicm: ['AIS'],
    ssdf: [],
    cosais: ['genai-assistant'],
    atlasMitigations: [],
    related: ['aml-t0051', 'aml-t0054', 'llm01-2026'],
    layers: [3, 4],
  },
  {
    id: 'nistaml-015',
    taxonomy: 'nist-aml',
    externalId: 'NISTAML.015',
    name: 'Indirect Prompt Injection',
    url: NIST_AML_URL,
    summary:
      'Instructions are planted in resources the model ingests (web pages, documents, emails, tool results) rather than typed by the user, so the attacker never talks to the system directly.',
    control: 'Mark and isolate untrusted content, restrict what tools can do on it, and require approval for consequential actions.',
    patterns: ['runtime-guardrail', 'agent-identity-scoped-credentials', 'adversarial-red-team-suite'],
    evals: [
      { tool: 'Inspect', check: 'agentdojo', note: 'agents solving tasks over untrusted data that carries injections' },
      { tool: 'garak', check: 'latentinjection', note: 'injections buried in documents' },
    ],
    obligations: ['AIGE-OBL-EUAIA-ART15', 'AIGE-OBL-OWASP-AGENTIC', 'AIGE-OBL-NISTRMF-MEASURE'],
    iso42001: ['A.6.2.4', 'A.6.2.6'],
    aicm: ['AIS'],
    ssdf: [],
    cosais: ['genai-assistant', 'single-agent'],
    atlasMitigations: [],
    related: ['aml-t0051', 'llm01-2026', 'asi01', 'aml-t0070'],
    layers: [3, 4],
  },
  {
    id: 'nistaml-035',
    taxonomy: 'nist-aml',
    externalId: 'NISTAML.035',
    name: 'Prompt Extraction',
    url: NIST_AML_URL,
    summary: 'A privacy attack that makes a generative model reveal its system prompt or other hidden context.',
    control: 'No secrets in the prompt, and extraction attempts logged and tested.',
    patterns: ['runtime-guardrail', 'adversarial-red-team-suite'],
    evals: [{ tool: 'garak', check: 'sysprompt_extraction', note: 'system prompt extraction attempts' }],
    obligations: ['AIGE-OBL-EUAIA-ART15', 'AIGE-OBL-OWASP-LLM'],
    iso42001: ['A.6.2.4'],
    aicm: ['AIS'],
    ssdf: [],
    cosais: ['genai-assistant'],
    atlasMitigations: [],
    related: ['aml-t0056', 'llm08-2026'],
    layers: [3, 4],
  },
  {
    id: 'nistaml-038',
    taxonomy: 'nist-aml',
    externalId: 'NISTAML.038',
    name: 'Data Extraction',
    url: NIST_AML_URL,
    summary: 'Training data, including personal or copyrighted text, is extracted from a generative model through its outputs.',
    control: 'Deduplicate and minimise sensitive training data, test for memorisation, and filter outputs that reproduce it.',
    patterns: ['eval-gate-in-ci', 'runtime-guardrail'],
    evals: [
      { tool: 'promptfoo', check: 'divergent-repetition', note: 'repetition patterns that push the model to reveal training data' },
      { tool: 'garak', check: 'divergence', note: 'repeat attacks that make output drift into training data' },
    ],
    obligations: ['AIGE-OBL-EUAIA-ART10', 'AIGE-OBL-EUAIA-ART15', 'AIGE-OBL-EUAIA-ART53'],
    iso42001: ['A.7.4', 'A.6.2.4'],
    aicm: ['DSP'],
    ssdf: [],
    cosais: ['genai-assistant', 'developers'],
    atlasMitigations: [],
    related: ['aml-t0057', 'llm02-2026'],
    layers: [3, 4],
  },
  {
    id: 'nistaml-039',
    taxonomy: 'nist-aml',
    externalId: 'NISTAML.039',
    name: 'Compromising connected resources',
    url: NIST_AML_URL,
    summary:
      'Through prompt injection, the model is made to leak private information from the restricted resources it can reach (tools, APIs, data stores); NIST classes it as a privacy compromise.',
    control: 'Least-privilege access for the model\'s identity, authorisation enforced at each resource, and approval before sensitive actions.',
    patterns: ['agent-identity-scoped-credentials', 'runtime-guardrail', 'human-in-the-loop-gate'],
    evals: [
      { tool: 'promptfoo', check: 'ssrf', note: 'server-side request forgery through the model' },
      { tool: 'Inspect', check: 'agentdojo', note: 'injections that try to misuse the agent\'s tools' },
    ],
    obligations: ['AIGE-OBL-EUAIA-ART14', 'AIGE-OBL-EUAIA-ART15', 'AIGE-OBL-CSA-AICM-AGENTIC'],
    iso42001: ['A.6.2.5', 'A.9.2'],
    aicm: ['IAM', 'AIS'],
    ssdf: [],
    cosais: ['single-agent', 'multi-agent'],
    atlasMitigations: [],
    related: ['aml-t0053', 'asi02', 'asi03'],
    layers: [4],
  },
  {
    id: 'nistaml-014',
    taxonomy: 'nist-aml',
    externalId: 'NISTAML.014',
    name: 'Energy-latency',
    url: NIST_AML_URL,
    summary: 'Inputs crafted to maximise computation degrade the service for everyone, an availability attack.',
    control: 'Per-request compute and time limits, and load monitoring with a breaker.',
    patterns: ['runtime-guardrail', 'kill-switch-circuit-breaker'],
    evals: [{ tool: 'promptfoo', check: 'reasoning-dos', note: 'computational exhaustion through reasoning' }],
    obligations: ['AIGE-OBL-EUAIA-ART15', 'AIGE-OBL-CSA-AICM'],
    iso42001: ['A.6.2.6'],
    aicm: ['BCR'],
    ssdf: [],
    cosais: ['predictive', 'genai-assistant'],
    atlasMitigations: [],
    related: ['aml-t0034', 'llm06-2026'],
    layers: [4],
  },
];

// ---------------------------------------------------------------------------
// Helpers

export const threatAnchor = (row: Pick<Threat, 'id'>) => `threat-${row.id}`;

export function threatById(id: string): Threat | undefined {
  return threats.find((row) => row.id === id);
}

export function taxonomyOf(row: Pick<Threat, 'taxonomy'>): ThreatTaxonomy {
  const found = taxonomies.find((t) => t.id === row.taxonomy);
  if (!found) throw new Error(`threats.ts: unknown taxonomy ${row.taxonomy}`);
  return found;
}

/** Rows of one catalogue, in data order. */
export function threatsIn(taxonomy: ThreatTaxonomyId): Threat[] {
  return threats.filter((row) => row.taxonomy === taxonomy);
}

/** Related ids in both directions: those the row names and those that name it. */
export function relatedOf(row: Threat): Threat[] {
  const ids = new Set(row.related);
  for (const other of threats) if (other.related.includes(row.id)) ids.add(other.id);
  ids.delete(row.id);
  return threats.filter((other) => ids.has(other.id));
}

/** The threatSources numbers a row rests on: its catalogue and the harnesses its evals name. */
export function sourcesOf(row: Threat): number[] {
  const out = new Set<number>([taxonomyOf(row).source]);
  if (row.taxonomy === 'owasp-llm' && row.formerly) out.add(SRC.llm2025);
  if (row.aicm.length > 0) out.add(SRC.aicm);
  if (row.iso42001.length > 0) out.add(SRC.iso42001);
  if (row.ssdf.length > 0) out.add(SRC.ssdf);
  if (row.cosais.length > 0) out.add(SRC.cosais);
  for (const e of row.evals) {
    const n = evalToolSource[e.tool];
    if (n !== null) out.add(n);
  }
  return [...out].sort((a, b) => a - b);
}

/** Readable names for the two CSA rows, whose register wording assumes the
 *  instrument is already named. */
const OBLIGATION_LABELS: Readonly<Record<string, string>> = {
  'AIGE-OBL-CSA-AICM': 'CSA AI Controls Matrix (AICM) v1.1',
  'AIGE-OBL-CSA-AICM-AGENTIC': 'CSA AICM Agentic Control Supplement (proposed)',
};

/** An obligation named so it reads on its own: the register wording, with the
 *  instrument in front where the wording leaves it out. */
export function obligationLabel(id: string): string {
  if (id in OBLIGATION_LABELS) return OBLIGATION_LABELS[id];
  const o = obligations.find((row) => row.id === id);
  if (!o) return id;
  const fw = frameworks.find((f) => f.id === o.frameworkId);
  const name = fw?.name ?? o.framework;
  const first = name.split(' ')[0];
  if (o.obligation.startsWith(first)) return o.obligation;
  if (o.obligation === o.clause) return name.includes(o.clause) ? name : `${name} ${o.clause}`;
  return `${name}, ${o.obligation}`;
}

/** Every broken reference in the dataset; empty when all resolve. */
export function threatProblems(): string[] {
  const problems: string[] = [];
  const obligationIds = new Set(obligations.map((o) => o.id));
  const patternSlugs = new Set(patterns.map((p) => p.slug));
  const rowIds = new Set<string>();
  const externalIds = new Set<string>();
  for (const row of threats) {
    const at = `threats.ts ${row.id}`;
    if (!/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(row.id)) problems.push(`${at}: id must be lower-case kebab`);
    if (rowIds.has(row.id)) problems.push(`${at}: duplicate id`);
    rowIds.add(row.id);
    if (externalIds.has(row.externalId)) problems.push(`${at}: duplicate external id ${row.externalId}`);
    externalIds.add(row.externalId);
    if (!taxonomies.some((t) => t.id === row.taxonomy)) problems.push(`${at}: unknown taxonomy`);
    if (row.formerly && row.taxonomy !== 'owasp-llm') problems.push(`${at}: only OWASP LLM rows carry "formerly"`);
    if (row.patterns.length === 0) problems.push(`${at}: names no pattern`);
    for (const slug of row.patterns) if (!patternSlugs.has(slug)) problems.push(`${at}: unknown pattern ${slug}`);
    if (row.evals.length === 0) problems.push(`${at}: names no eval`);
    if (row.obligations.length === 0) problems.push(`${at}: names no obligation`);
    for (const id of row.obligations) if (!obligationIds.has(id)) problems.push(`${at}: unknown obligation ${id}`);
    for (const id of row.iso42001) if (!(id in iso42001Controls)) problems.push(`${at}: unknown ISO/IEC 42001 control ${id}`);
    for (const id of row.aicm) if (!(id in aicmDomains)) problems.push(`${at}: unknown AICM domain ${id}`);
    for (const id of row.ssdf) if (!(id in ssdfTasks)) problems.push(`${at}: unknown SP 800-218A task ${id}`);
    for (const id of row.cosais) if (!(id in cosaisUseCases)) problems.push(`${at}: unknown COSAiS use case ${id}`);
    for (const id of row.atlasMitigations) {
      if (!(id in atlasMitigationNames)) problems.push(`${at}: unknown ATLAS mitigation ${id}`);
    }
    if (row.atlasMitigations.length > 0 && row.taxonomy !== 'mitre-atlas') {
      problems.push(`${at}: only ATLAS rows carry ATLAS mitigations`);
    }
    if (row.layers.length === 0) problems.push(`${at}: names no layer`);
    if (row.summary.includes(EM_DASH) || row.control.includes(EM_DASH)) problems.push(`${at}: em dash`);
  }
  for (const row of threats) {
    for (const id of row.related) {
      if (!rowIds.has(id)) problems.push(`threats.ts ${row.id}: unknown related row ${id}`);
      if (id === row.id) problems.push(`threats.ts ${row.id}: relates to itself`);
    }
  }
  for (const t of taxonomies) {
    if (!threats.some((row) => row.taxonomy === t.id)) problems.push(`threats.ts: catalogue ${t.id} has no rows`);
    if (t.source < 1 || t.source > threatSources.length) problems.push(`threats.ts: catalogue ${t.id} cites a missing source`);
  }
  return problems;
}
