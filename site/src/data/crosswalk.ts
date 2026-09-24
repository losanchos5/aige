// crosswalk.ts: the topic-centred index built on frameworks.ts. Where
// frameworks.ts answers "for this obligation, what artefact evidences it and on
// which layer does it live?", this module answers the reader's other question:
// "which article or clause of each framework deals with topic X?" — e.g. AI risk
// management is EU AI Act Art. 9, ISO/IEC 42001 6.1.2/6.1.3/8.2/8.3, NIST AI RMF
// MAP/MANAGE and China's TC260 3.0 risk taxonomy.
//
// The clause ids here are finer than chapter 08 (bok/08-regulatory-map.md): ISO
// clause ids (6.1.2, A.5, …) come from the ISO Online Browsing Platform table of
// contents and NIST subcategory ids (MAP 1, MANAGE 2.4, GOVERN 1.6, …) from NIST
// AI RMF 1.0 Appendix A / the Playbook. Fidelity to chapter 08 is kept through
// the optional `obligation` join: where a clause has an obligations[] row in
// frameworks.ts, `obligation` carries that row's exact text so the UI can link
// the crosswalk cell to the obligation matrix. Mappings are illustrative, not a
// claim of conformity.

import type { Framework, StackLayer } from './frameworks';
import { frameworks } from './frameworks';

export { disclaimer } from './frameworks';

export interface Topic {
  /** Stable id used by refs and the route fragment. */
  id: string;
  /** Short human name. */
  name: string;
  /** One-to-two-sentence description of the topic. */
  summary: string;
  /** Stack layer(s) the topic mostly lives on, where it maps cleanly. */
  layerN?: readonly StackLayer[];
}

export interface CrosswalkColumn {
  /** Column id: 'eu' | 'iso' | 'nist' | 'cn'. */
  id: string;
  /** Column header label. */
  label: string;
  /** Framework ids that share the column, in display order. */
  frameworks: readonly string[];
}

export type RefStrength = 'core' | 'related';

export interface CrosswalkRef {
  /** Topic id. */
  topic: string;
  /** Framework id (must exist in frameworks.ts). */
  framework: string;
  /** Clause id WITHOUT the instrument prefix, e.g. 'Art. 9', '6.1.2', 'A.5',
   *  'MAP 1', 'App. 2 II.5'. */
  ref: string;
  /** The clause's own short title. */
  title: string;
  /** Canonical https source, where one exists. */
  url?: string;
  /** One sentence: why the clause belongs to the topic, a printed-page cite, or
   *  a chapter-05 pattern anchor. */
  note?: string;
  /** 'core' = the clause is primarily about the topic; 'related' = it touches it. */
  strength: RefStrength;
  /** Exact text of an obligations[].obligation row in frameworks.ts, to link the
   *  obligation-matrix row. Unset where no row exists (ISO clauses). */
  obligation?: string;
  /** false = could not be checked against the source; then `note` is required. */
  verified?: boolean;
}

/** EU AI Act article in the EUR-Lex consolidated text (Reg. (EU) 2024/1689 as
 *  amended by the Digital Omnibus, Reg. (EU) 2026/1744; consolidation of
 *  2026-07-27). EUR-Lex anchors each article as #art_<n>. */
const aia = (n: string): string =>
  `https://eur-lex.europa.eu/eli/reg/2024/1689/2026-07-27/eng#art_${n}`;

// One canonical URL per instrument keeps the refs terse and easy to re-point.
const ISO_URL = 'https://www.iso.org/standard/42001';
const NIST_URL = 'https://airc.nist.gov/airmf-resources/airmf/';
const TC260_URL =
  'https://www.cac.gov.cn/rootimages/uploadimg/1791137114683961/1791137114683961.pdf';
const ALGOREC_URL = 'https://www.cac.gov.cn/2022-01/04/c_1642894606364259.htm';
const DEEPSYN_URL = 'https://www.cac.gov.cn/2022-12/11/c_1672221949354811.htm';
const GENAI_URL = 'https://www.cac.gov.cn/2023-07/13/c_1690898327029107.htm';
const LABEL_URL = 'https://www.cac.gov.cn/2025-03/14/c_1743654684782215.htm';
/** Official listing of GB/T 45654-2025 on the national standards platform. */
const GBT_URL =
  'https://openstd.samr.gov.cn/bzgk/std/newGbInfo?hcno=F67D3F376E0A0A0FF5317FB36B32A30A';

/**
 * Chip prefix for the frameworks that share the China column, and the single
 * place the six cn-* ids live (together with the `cn` column, whose frameworks
 * are derived from these keys). Single-framework columns carry no prefix.
 */
export const chipPrefix: Readonly<Record<string, string>> = {
  'cn-tc260-framework': 'TC260',
  'cn-genai-measures': 'GenAI',
  'cn-deep-synthesis': 'DeepSyn',
  'cn-algo-recommendation': 'AlgoRec',
  'cn-content-labelling': 'Label',
  'cn-gbt-45654': 'GB/T 45654',
};

/** The twelve topics, in display order. */
export const topics: readonly Topic[] = [
  {
    id: 'risk-management',
    name: 'Risk management',
    summary:
      'Identifying, analysing and treating AI risks across the lifecycle, and keeping the treatment current as the system and its context change.',
    layerN: [1, 3],
  },
  {
    id: 'governance-accountability',
    name: 'Governance and accountability',
    summary:
      'The policies, roles and accountability structures that put a named owner behind every AI decision and control.',
    layerN: [1],
  },
  {
    id: 'impact-assessment',
    name: 'Impact assessment',
    summary:
      "Assessing an AI system's impact on fundamental rights, individuals and society before and during deployment.",
    layerN: [1, 2],
  },
  {
    id: 'data-governance',
    name: 'Data governance',
    summary:
      'Governing the data an AI system trains on and processes: lawful sourcing, quality, lineage and protection of personal and input data.',
    layerN: [2, 3],
  },
  {
    id: 'documentation-transparency',
    name: 'Documentation and transparency',
    summary:
      'Technical documentation, disclosures and content labelling that make an AI system legible to regulators, deployers and users.',
    layerN: [2],
  },
  {
    id: 'inventory-registration',
    name: 'Inventory and registration',
    summary:
      'Keeping an inventory of AI systems and agents and, where required, registering or filing them with the authorities.',
    layerN: [2],
  },
  {
    id: 'logging-traceability',
    name: 'Logging and traceability',
    summary:
      "Automatic, tamper-evident logs and records that make an AI system's behaviour reconstructable after the fact.",
    layerN: [4],
  },
  {
    id: 'human-oversight',
    name: 'Human oversight',
    summary:
      'Human-in-the-loop checkpoints, approval gates and the ability to intervene in or stop an AI system.',
    layerN: [4],
  },
  {
    id: 'runtime-guardrails',
    name: 'Runtime guardrails',
    summary:
      'Controls that constrain an AI system while it runs: input/output filtering, tool-invocation limits, isolation and memory management.',
    layerN: [4],
  },
  {
    id: 'robustness-security-evals',
    name: 'Robustness, security and evaluations',
    summary:
      'Testing an AI system for accuracy, robustness, security and adversarial failure, including red-teaming and sandbox validation.',
    layerN: [3, 4],
  },
  {
    id: 'incident-monitoring',
    name: 'Incident response and monitoring',
    summary:
      'Post-market monitoring, incident detection and reporting, and the complaint channels that surface real-world failures.',
    layerN: [5],
  },
  {
    id: 'supply-chain',
    name: 'Supply chain and third parties',
    summary:
      'Allocating responsibility along the AI value chain and managing risks from third-party models, data, tools and technical supporters.',
    layerN: [2, 5],
  },
];

/** The four columns, in display order (eu, iso, nist, cn). */
export const columns: readonly CrosswalkColumn[] = [
  { id: 'eu', label: 'EU AI Act', frameworks: ['eu-ai-act'] },
  { id: 'iso', label: 'ISO/IEC 42001', frameworks: ['iso-42001'] },
  { id: 'nist', label: 'NIST AI RMF', frameworks: ['nist-ai-rmf'] },
  // The China column bundles six instruments; its ids come from chipPrefix so
  // renaming (or their arrival in frameworks.ts) stays a one-line change.
  { id: 'cn', label: 'China', frameworks: Object.keys(chipPrefix) },
];

// Exact obligation-row texts reused across topics, verbatim from frameworks.ts.
const OBL_EU_9 = 'EU AI Act Art. 9 risk management system';
const OBL_EU_26 = 'EU AI Act Art. 26 deployer obligations for high-risk systems';
const OBL_EU_55 = 'EU AI Act Art. 55 GPAI models with systemic risk';
const OBL_EU_4971 =
  'EU AI Act Art. 49/71 registration of high-risk systems in the EU database';
const OBL_A6 = 'A.6 AI system life cycle';
// China obligation-row texts, verbatim from frameworks.ts (em-dash U+2014, section sign U+00A7).
const OBL_CN_ALGOREC = 'Provisions on Algorithmic Recommendation (in force 2022-03-01)';
const OBL_CN_DEEPSYN = 'Provisions on Deep Synthesis (in force 2023-01-10)';
const OBL_CN_GENAI = 'Interim Measures for Generative AI Services (in force 2023-08-15)';
const OBL_CN_LABEL = 'Measures for Labelling AI-Generated Synthetic Content with GB 45438-2025 (in force 2025-09-01)';
const OBL_CN_GBT = 'GB/T 45654-2025 Basic security requirements for generative AI services (voluntary; implemented 2025-11-01)';
const OBL_CN_TC260 = 'TC260 AI Safety Governance Framework 3.0: operators\' guidelines §5.3 (voluntary; 2026-09-14)';
const OBL_CN_TC260_APP2 = 'TC260 Framework 3.0 Appendix 2: agentic AI risk management (voluntary; 2026-09-14)';

/** The topic → framework clause refs, grouped by topic in display order. */
export const refs: readonly CrosswalkRef[] = [
  // ── Risk management ──────────────────────────────────────────────────────
  {
    topic: 'risk-management',
    framework: 'eu-ai-act',
    ref: 'Art. 9',
    title: 'Risk management system',
    url: aia('9'),
    note: 'Iterative, lifecycle risk management; the backbone of the risk register.',
    strength: 'core',
    obligation: OBL_EU_9,
    verified: true,
  },
  {
    topic: 'risk-management',
    framework: 'iso-42001',
    ref: '6.1.2',
    title: 'AI risk assessment',
    url: ISO_URL,
    note: 'Planning-stage AI risk assessment.',
    strength: 'core',
    verified: true,
  },
  {
    topic: 'risk-management',
    framework: 'iso-42001',
    ref: '6.1.3',
    title: 'AI risk treatment',
    url: ISO_URL,
    strength: 'core',
    verified: true,
  },
  {
    topic: 'risk-management',
    framework: 'iso-42001',
    ref: '8.2',
    title: 'AI risk assessment (operation)',
    url: ISO_URL,
    strength: 'core',
    verified: true,
  },
  {
    topic: 'risk-management',
    framework: 'iso-42001',
    ref: '8.3',
    title: 'AI risk treatment (operation)',
    url: ISO_URL,
    strength: 'core',
    verified: true,
  },
  {
    topic: 'risk-management',
    framework: 'iso-42001',
    ref: 'A.6',
    title: 'AI system life cycle',
    url: ISO_URL,
    note: 'Lifecycle controls operationalise the risk treatment.',
    strength: 'related',
    obligation: OBL_A6,
    verified: true,
  },
  {
    topic: 'risk-management',
    framework: 'nist-ai-rmf',
    ref: 'MAP 1',
    title: 'MAP 1: Context is established and understood',
    url: NIST_URL,
    strength: 'core',
    obligation: 'MAP',
    verified: true,
  },
  {
    topic: 'risk-management',
    framework: 'nist-ai-rmf',
    ref: 'MAP 5',
    title:
      'MAP 5: Impacts to individuals, groups, communities, organizations, and society are characterized',
    url: NIST_URL,
    strength: 'core',
    obligation: 'MAP',
    verified: true,
  },
  {
    topic: 'risk-management',
    framework: 'nist-ai-rmf',
    ref: 'MANAGE 1',
    title:
      'MANAGE 1: AI risks based on assessments and other analytical output are prioritized, responded to, and managed',
    url: NIST_URL,
    strength: 'core',
    obligation: 'MANAGE',
    verified: true,
  },
  {
    topic: 'risk-management',
    framework: 'nist-ai-rmf',
    ref: 'MEASURE 2',
    title: 'MEASURE 2: AI systems are evaluated for trustworthy characteristics',
    url: NIST_URL,
    note: 'Measurement feeds the risk picture.',
    strength: 'related',
    obligation: 'MEASURE',
    verified: true,
  },
  {
    topic: 'risk-management',
    framework: 'cn-tc260-framework',
    ref: '2',
    title: 'Classification of AI safety risks',
    url: TC260_URL,
    note: 'Three-way taxonomy: inherent / application / secondary (derivative) safety risks; printed p. 54.',
    strength: 'core',
    obligation: OBL_CN_TC260,
    verified: true,
  },
  {
    topic: 'risk-management',
    framework: 'cn-tc260-framework',
    ref: 'Summary table',
    title: 'Risks × technological × governance measures',
    url: TC260_URL,
    note: 'Maps each risk class to its countermeasures; printed pp. 107-108.',
    strength: 'core',
    obligation: OBL_CN_TC260,
    verified: true,
  },
  {
    topic: 'risk-management',
    framework: 'cn-tc260-framework',
    ref: '5.3.19',
    title: 'Re-assessment on material change',
    url: TC260_URL,
    note: 'Re-run the risk assessment when the system materially changes; printed p. 104.',
    strength: 'related',
    obligation: OBL_CN_TC260,
    verified: true,
  },
  {
    topic: 'risk-management',
    framework: 'cn-genai-measures',
    ref: 'Art. 17',
    title: 'Security assessment and algorithm filing',
    url: GENAI_URL,
    note: 'Security assessment for services with public-opinion attributes; CAC text.',
    strength: 'related',
    obligation: OBL_CN_GENAI,
    verified: true,
  },
  {
    topic: 'risk-management',
    framework: 'cn-algo-recommendation',
    ref: 'Art. 27',
    title: 'Security assessment',
    url: ALGOREC_URL,
    note: 'Security assessment for recommendation services with public-opinion or social-mobilization capacity; CAC text.',
    strength: 'related',
    obligation: OBL_CN_ALGOREC,
    verified: true,
  },

  // ── Governance and accountability ────────────────────────────────────────
  {
    topic: 'governance-accountability',
    framework: 'eu-ai-act',
    ref: 'Art. 17',
    title: 'Quality management system',
    url: aia('17'),
    note: 'The QMS that assigns and documents responsibilities.',
    strength: 'core',
    obligation: 'EU AI Act Art. 17 quality management system',
    verified: true,
  },
  {
    topic: 'governance-accountability',
    framework: 'eu-ai-act',
    ref: 'Art. 4',
    title: 'AI literacy',
    url: aia('4'),
    note: 'Staff competence underpins accountable operation.',
    strength: 'related',
    obligation: 'EU AI Act Art. 4 AI literacy',
    verified: true,
  },
  {
    topic: 'governance-accountability',
    framework: 'iso-42001',
    ref: '5.1',
    title: 'Leadership and commitment',
    url: ISO_URL,
    strength: 'core',
    verified: true,
  },
  {
    topic: 'governance-accountability',
    framework: 'iso-42001',
    ref: '5.2',
    title: 'AI policy',
    url: ISO_URL,
    strength: 'core',
    verified: true,
  },
  {
    topic: 'governance-accountability',
    framework: 'iso-42001',
    ref: '5.3',
    title: 'Roles, responsibilities and authorities',
    url: ISO_URL,
    strength: 'core',
    verified: true,
  },
  {
    topic: 'governance-accountability',
    framework: 'iso-42001',
    ref: 'A.2',
    title: 'Policies related to AI',
    url: ISO_URL,
    strength: 'core',
    obligation: 'A.2 Policies related to AI',
    verified: true,
  },
  {
    topic: 'governance-accountability',
    framework: 'iso-42001',
    ref: 'A.3',
    title: 'Internal organization',
    url: ISO_URL,
    strength: 'core',
    obligation: 'A.3 Internal organization',
    verified: true,
  },
  {
    topic: 'governance-accountability',
    framework: 'nist-ai-rmf',
    ref: 'GOVERN 1',
    title:
      'GOVERN 1: Policies, processes, procedures, and practices across the organization related to the mapping, measuring, and managing of AI risks are in place, transparent, and implemented effectively',
    url: NIST_URL,
    strength: 'core',
    obligation: 'GOVERN',
    verified: true,
  },
  {
    topic: 'governance-accountability',
    framework: 'nist-ai-rmf',
    ref: 'GOVERN 2',
    title:
      'GOVERN 2: Accountability structures are in place so that the appropriate teams and individuals are empowered, responsible, and trained',
    url: NIST_URL,
    strength: 'core',
    obligation: 'GOVERN',
    verified: true,
  },
  {
    topic: 'governance-accountability',
    framework: 'cn-tc260-framework',
    ref: '4',
    title: 'Comprehensive governance measures',
    url: TC260_URL,
    note: 'Organisational and institutional governance measures; printed p. 85.',
    strength: 'core',
    obligation: OBL_CN_TC260,
    verified: true,
  },
  {
    topic: 'governance-accountability',
    framework: 'cn-tc260-framework',
    ref: '5.3.12',
    title: 'Traceable chain of responsibility',
    url: TC260_URL,
    note: 'A traceable responsibility chain across the lifecycle; printed p. 103.',
    strength: 'core',
    obligation: OBL_CN_TC260,
    verified: true,
  },
  {
    topic: 'governance-accountability',
    framework: 'cn-genai-measures',
    ref: 'Art. 9',
    title: 'Provider responsibility as content producer',
    url: GENAI_URL,
    note: 'Providers bear network-information content-producer responsibility; CAC text.',
    strength: 'core',
    obligation: OBL_CN_GENAI,
    verified: true,
  },
  {
    topic: 'governance-accountability',
    framework: 'cn-algo-recommendation',
    ref: 'Art. 7',
    title: 'Algorithm-security responsibility system',
    url: ALGOREC_URL,
    note: 'Providers establish algorithm-security management systems; CAC text.',
    strength: 'core',
    obligation: OBL_CN_ALGOREC,
    verified: true,
  },
  {
    topic: 'governance-accountability',
    framework: 'cn-deep-synthesis',
    ref: 'Art. 7',
    title: 'Information-security responsibility system',
    url: DEEPSYN_URL,
    note: 'Providers establish management systems (registration, review, ethics, data and personal-information protection); CAC text.',
    strength: 'core',
    obligation: OBL_CN_DEEPSYN,
    verified: true,
  },

  // ── Impact assessment ────────────────────────────────────────────────────
  {
    topic: 'impact-assessment',
    framework: 'eu-ai-act',
    ref: 'Art. 27',
    title: 'Fundamental rights impact assessment for high-risk AI systems',
    url: aia('27'),
    note: 'See pattern: /bok/patterns#pattern-fria-as-code',
    strength: 'core',
    obligation: 'EU AI Act Art. 27 Fundamental Rights Impact Assessment (FRIA)',
    verified: true,
  },
  {
    topic: 'impact-assessment',
    framework: 'eu-ai-act',
    ref: 'Art. 9',
    title: 'Risk management system',
    url: aia('9'),
    note: 'Risk management and the FRIA cross-reference each other.',
    strength: 'related',
    obligation: OBL_EU_9,
    verified: true,
  },
  {
    topic: 'impact-assessment',
    framework: 'iso-42001',
    ref: '6.1.4',
    title: 'AI system impact assessment',
    url: ISO_URL,
    strength: 'core',
    verified: true,
  },
  {
    topic: 'impact-assessment',
    framework: 'iso-42001',
    ref: '8.4',
    title: 'AI system impact assessment (operation)',
    url: ISO_URL,
    strength: 'core',
    verified: true,
  },
  {
    topic: 'impact-assessment',
    framework: 'iso-42001',
    ref: 'A.5',
    title: 'Assessing impacts of AI systems',
    url: ISO_URL,
    note: 'See pattern: /bok/patterns#pattern-fria-as-code',
    strength: 'core',
    obligation: 'A.5 Assessing impacts of AI systems',
    verified: true,
  },
  {
    topic: 'impact-assessment',
    framework: 'nist-ai-rmf',
    ref: 'MAP 3',
    title:
      'MAP 3: AI capabilities, targeted usage, goals, and expected benefits and costs are understood',
    url: NIST_URL,
    strength: 'core',
    obligation: 'MAP',
    verified: true,
  },
  {
    topic: 'impact-assessment',
    framework: 'nist-ai-rmf',
    ref: 'MAP 5',
    title:
      'MAP 5: Impacts to individuals, groups, communities, organizations, and society are characterized',
    url: NIST_URL,
    strength: 'core',
    obligation: 'MAP',
    verified: true,
  },
  {
    topic: 'impact-assessment',
    framework: 'cn-tc260-framework',
    ref: 'Appendix 1',
    title: 'Grading principles',
    url: TC260_URL,
    note: 'Grading principles for classifying risk; printed pp. 109-112.',
    strength: 'core',
    obligation: OBL_CN_TC260,
    verified: true,
  },
  {
    topic: 'impact-assessment',
    framework: 'cn-tc260-framework',
    ref: '2.2',
    title: 'Safety risks in the application of AI',
    url: TC260_URL,
    note: 'Application-layer risks to assess (agentic, embodied, cybersecurity, content, personal information, real-world); printed p. 60.',
    strength: 'related',
    obligation: OBL_CN_TC260,
    verified: true,
  },
  {
    topic: 'impact-assessment',
    framework: 'cn-genai-measures',
    ref: 'Art. 17',
    title: 'Security assessment',
    url: GENAI_URL,
    note: 'Pre-deployment security assessment for public-opinion services; CAC text.',
    strength: 'core',
    obligation: OBL_CN_GENAI,
    verified: true,
  },

  // ── Data governance ──────────────────────────────────────────────────────
  {
    topic: 'data-governance',
    framework: 'eu-ai-act',
    ref: 'Art. 10',
    title: 'Data and data governance',
    url: aia('10'),
    note: 'Training, validation and test data quality and governance.',
    strength: 'core',
    obligation: 'EU AI Act Art. 10 data and data governance',
    verified: true,
  },
  {
    topic: 'data-governance',
    framework: 'eu-ai-act',
    ref: 'Art. 4a',
    title: 'Special-category data for bias detection',
    note: 'Post-Omnibus new article: a lawful basis to process special-category data to detect and correct bias.',
    strength: 'related',
    obligation:
      'EU AI Act Art. 4a lawful basis for special-category data in bias detection',
    verified: true,
  },
  {
    topic: 'data-governance',
    framework: 'iso-42001',
    ref: 'A.7',
    title: 'Data for AI systems',
    url: ISO_URL,
    strength: 'core',
    obligation: 'A.7 Data for AI systems',
    verified: true,
  },
  {
    topic: 'data-governance',
    framework: 'iso-42001',
    ref: 'A.4',
    title: 'Resources for AI systems',
    url: ISO_URL,
    note: 'Data as a governed resource.',
    strength: 'related',
    obligation: 'A.4 Resources for AI systems',
    verified: true,
  },
  {
    topic: 'data-governance',
    framework: 'nist-ai-rmf',
    ref: 'MAP 2',
    title: 'MAP 2: Categorization of the AI system is performed',
    url: NIST_URL,
    note: 'Data categorisation and provenance.',
    strength: 'related',
    obligation: 'MAP',
    verified: true,
  },
  {
    topic: 'data-governance',
    framework: 'nist-ai-rmf',
    ref: 'MEASURE 2.10',
    title: 'MEASURE 2.10: Privacy risk of the AI system is examined and documented',
    url: NIST_URL,
    strength: 'related',
    obligation: 'MEASURE',
    verified: true,
  },
  {
    topic: 'data-governance',
    framework: 'nist-ai-rmf',
    ref: 'MEASURE 2.11',
    title: 'MEASURE 2.11: Fairness and bias are evaluated and results are documented',
    url: NIST_URL,
    strength: 'related',
    obligation: 'MEASURE',
    verified: true,
  },
  {
    topic: 'data-governance',
    framework: 'cn-tc260-framework',
    ref: '2.1.3',
    title: 'Data safety risks',
    url: TC260_URL,
    note: 'Inherent data risks (quality, poisoning, leakage); printed p. 57.',
    strength: 'core',
    obligation: OBL_CN_TC260,
    verified: true,
  },
  {
    topic: 'data-governance',
    framework: 'cn-tc260-framework',
    ref: '5.1',
    title: 'Model R&D safety guidelines',
    url: TC260_URL,
    note: 'Training-data governance during model R&D; printed p. 95.',
    strength: 'related',
    obligation: OBL_CN_TC260,
    verified: true,
  },
  {
    topic: 'data-governance',
    framework: 'cn-genai-measures',
    ref: 'Art. 7',
    title: 'Training-data lawful sourcing',
    url: GENAI_URL,
    note: 'Lawful sources, IP and personal-information compliance for training data; CAC text.',
    strength: 'core',
    obligation: OBL_CN_GENAI,
    verified: true,
  },
  {
    topic: 'data-governance',
    framework: 'cn-genai-measures',
    ref: 'Art. 8',
    title: 'Data-annotation standards',
    url: GENAI_URL,
    note: 'Clear, specific annotation rules and quality checks; CAC text.',
    strength: 'core',
    obligation: OBL_CN_GENAI,
    verified: true,
  },
  {
    topic: 'data-governance',
    framework: 'cn-genai-measures',
    ref: 'Art. 11',
    title: 'Protection of user input and records',
    url: GENAI_URL,
    note: 'No unlawful retention of user input and usage records; CAC text.',
    strength: 'core',
    obligation: OBL_CN_GENAI,
    verified: true,
  },
  {
    topic: 'data-governance',
    framework: 'cn-deep-synthesis',
    ref: 'Art. 14',
    title: 'Training-data management',
    url: DEEPSYN_URL,
    note: 'Providers and technical supporters secure training data and personal information; CAC text.',
    strength: 'core',
    obligation: OBL_CN_DEEPSYN,
    verified: true,
  },
  {
    topic: 'data-governance',
    framework: 'cn-gbt-45654',
    ref: 'Corpus security',
    title: 'Training-corpus (data) security requirements',
    url: GBT_URL,
    note: 'GB/T 45654-2025 corpus-security requirements (TC260-003 predecessor §5). The official listing shows the standard as current (issued 2025-04-25, implemented 2025-11-01; checked 2026-09-24), but the full text is only offered there as an image preview, so the clause id is not verified against it.',
    strength: 'core',
    obligation: OBL_CN_GBT,
    verified: false,
  },

  // ── Documentation and transparency ───────────────────────────────────────
  {
    topic: 'documentation-transparency',
    framework: 'eu-ai-act',
    ref: 'Art. 11',
    title: 'Technical documentation',
    url: aia('11'),
    note: 'Annex IV technical documentation.',
    strength: 'core',
    obligation: 'EU AI Act Art. 11 technical documentation (Annex IV)',
    verified: true,
  },
  {
    topic: 'documentation-transparency',
    framework: 'eu-ai-act',
    ref: 'Art. 13',
    title: 'Transparency and provision of information to deployers',
    url: aia('13'),
    strength: 'core',
    obligation: 'EU AI Act Art. 13 transparency and information to deployers',
    verified: true,
  },
  {
    topic: 'documentation-transparency',
    framework: 'eu-ai-act',
    ref: 'Art. 53',
    title: 'Obligations for providers of general-purpose AI models',
    url: aia('53'),
    note: 'Model documentation and training-content summary for GPAI providers.',
    strength: 'core',
    obligation: 'EU AI Act Art. 53 GPAI provider obligations',
    verified: true,
  },
  {
    topic: 'documentation-transparency',
    framework: 'eu-ai-act',
    ref: 'Art. 50',
    title:
      'Transparency obligations for providers and deployers of certain AI systems',
    url: aia('50'),
    note: 'User-facing disclosure and machine-readable content marking.',
    strength: 'related',
    obligation: 'EU AI Act Art. 50 transparency for certain AI systems',
    verified: true,
  },
  {
    topic: 'documentation-transparency',
    framework: 'iso-42001',
    ref: '7.5',
    title: 'Documented information',
    url: ISO_URL,
    strength: 'core',
    verified: true,
  },
  {
    topic: 'documentation-transparency',
    framework: 'iso-42001',
    ref: 'A.6',
    title: 'AI system life cycle',
    url: ISO_URL,
    note: 'Lifecycle documentation.',
    strength: 'core',
    obligation: OBL_A6,
    verified: true,
  },
  {
    topic: 'documentation-transparency',
    framework: 'iso-42001',
    ref: 'A.8',
    title: 'Information for interested parties',
    url: ISO_URL,
    strength: 'core',
    obligation: 'A.8 Information for interested parties',
    verified: true,
  },
  {
    topic: 'documentation-transparency',
    framework: 'nist-ai-rmf',
    ref: 'MAP 1',
    title: 'MAP 1: Context is established and understood',
    url: NIST_URL,
    note: 'Documenting context and intended use.',
    strength: 'related',
    obligation: 'MAP',
    verified: true,
  },
  {
    topic: 'documentation-transparency',
    framework: 'nist-ai-rmf',
    ref: 'MEASURE 2.8',
    title:
      'MEASURE 2.8: Risks associated with transparency and accountability are examined and documented',
    url: NIST_URL,
    strength: 'related',
    obligation: 'MEASURE',
    verified: true,
  },
  {
    topic: 'documentation-transparency',
    framework: 'cn-content-labelling',
    ref: 'Art. 4',
    title: 'Explicit labels for generated content',
    url: LABEL_URL,
    note: 'Visible labels on AI-generated and synthetic content; CAC text.',
    strength: 'core',
    obligation: OBL_CN_LABEL,
    verified: true,
  },
  {
    topic: 'documentation-transparency',
    framework: 'cn-content-labelling',
    ref: 'Art. 5',
    title: 'Implicit (metadata) labels',
    url: LABEL_URL,
    note: 'Implicit labels embedded in file metadata; CAC text.',
    strength: 'core',
    obligation: OBL_CN_LABEL,
    verified: true,
  },
  {
    topic: 'documentation-transparency',
    framework: 'cn-genai-measures',
    ref: 'Art. 12',
    title: 'Labelling of generated content',
    url: GENAI_URL,
    note: 'Label generated images and video per the Deep Synthesis rules; CAC text.',
    strength: 'core',
    obligation: OBL_CN_GENAI,
    verified: true,
  },
  {
    topic: 'documentation-transparency',
    framework: 'cn-genai-measures',
    ref: 'Art. 19',
    title: 'Disclosure to regulators',
    url: GENAI_URL,
    note: 'Disclose training-data sources, scale and labelling mechanisms on request; CAC text.',
    strength: 'related',
    obligation: OBL_CN_GENAI,
    verified: true,
  },
  {
    topic: 'documentation-transparency',
    framework: 'cn-deep-synthesis',
    ref: 'Art. 16',
    title: 'Implicit technical labels',
    url: DEEPSYN_URL,
    note: 'Non-disruptive technical marks on synthetic content; CAC text.',
    strength: 'core',
    obligation: OBL_CN_DEEPSYN,
    verified: true,
  },
  {
    topic: 'documentation-transparency',
    framework: 'cn-deep-synthesis',
    ref: 'Art. 17',
    title: 'Conspicuous labels for confusable content',
    url: DEEPSYN_URL,
    note: 'Prominent labels where synthetic media could mislead; CAC text.',
    strength: 'core',
    obligation: OBL_CN_DEEPSYN,
    verified: true,
  },
  {
    topic: 'documentation-transparency',
    framework: 'cn-algo-recommendation',
    ref: 'Art. 16',
    title: 'Notice that recommendation is used',
    url: ALGOREC_URL,
    note: 'Conspicuously inform users that algorithmic recommendation is in use; CAC text.',
    strength: 'related',
    obligation: OBL_CN_ALGOREC,
    verified: true,
  },
  {
    topic: 'documentation-transparency',
    framework: 'cn-gbt-45654',
    ref: 'Content labelling',
    title: 'Generated-content labelling requirements',
    url: GBT_URL,
    note: 'GB/T 45654-2025 content-labelling requirements (aligned with the 2025 Labelling Measures). The official listing shows the standard as current (issued 2025-04-25, implemented 2025-11-01; checked 2026-09-24), but the full text is only offered there as an image preview, so the clause id is not verified against it.',
    strength: 'related',
    obligation: OBL_CN_GBT,
    verified: false,
  },

  // ── Inventory and registration ───────────────────────────────────────────
  {
    topic: 'inventory-registration',
    framework: 'eu-ai-act',
    ref: 'Art. 49',
    title: 'Registration',
    url: aia('49'),
    note: 'Registration of high-risk systems in the EU database.',
    strength: 'core',
    obligation: OBL_EU_4971,
    verified: true,
  },
  {
    topic: 'inventory-registration',
    framework: 'eu-ai-act',
    ref: 'Art. 71',
    title: 'EU database for high-risk AI systems',
    url: aia('71'),
    note: 'The EU database that registration feeds.',
    strength: 'core',
    obligation: OBL_EU_4971,
    verified: true,
  },
  {
    topic: 'inventory-registration',
    framework: 'eu-ai-act',
    ref: 'Art. 6',
    title: 'Classification rules for high-risk AI systems',
    url: aia('6'),
    note: 'Classification decides what must be registered.',
    strength: 'related',
    obligation:
      'EU AI Act Art. 6 classification of high-risk AI systems (incl. the Annex III route)',
    verified: true,
  },
  {
    topic: 'inventory-registration',
    framework: 'iso-42001',
    ref: 'A.4',
    title: 'Resources for AI systems',
    url: ISO_URL,
    note: 'Resource and asset inventory of AI systems.',
    strength: 'core',
    obligation: 'A.4 Resources for AI systems',
    verified: true,
  },
  {
    topic: 'inventory-registration',
    framework: 'nist-ai-rmf',
    ref: 'GOVERN 1.6',
    title:
      'GOVERN 1.6: Mechanisms are in place to inventory AI systems and are resourced according to organizational risk priorities',
    url: NIST_URL,
    note: 'See pattern: /bok/patterns#pattern-agent-registry',
    strength: 'core',
    obligation: 'GOVERN',
    verified: true,
  },
  {
    topic: 'inventory-registration',
    framework: 'cn-algo-recommendation',
    ref: 'Art. 24',
    title: 'Algorithm filing',
    url: ALGOREC_URL,
    note: 'File within ten working days via the algorithm-filing system (public-opinion services); CAC text.',
    strength: 'core',
    obligation: OBL_CN_ALGOREC,
    verified: true,
  },
  {
    topic: 'inventory-registration',
    framework: 'cn-deep-synthesis',
    ref: 'Art. 19',
    title: 'Filing for public-opinion services',
    url: DEEPSYN_URL,
    note: 'Filing per the Algorithm Recommendation rules; CAC text.',
    strength: 'core',
    obligation: OBL_CN_DEEPSYN,
    verified: true,
  },
  {
    topic: 'inventory-registration',
    framework: 'cn-genai-measures',
    ref: 'Art. 17',
    title: 'Algorithm filing',
    url: GENAI_URL,
    note: 'Algorithm filing alongside the security assessment; CAC text.',
    strength: 'core',
    obligation: OBL_CN_GENAI,
    verified: true,
  },
  {
    topic: 'inventory-registration',
    framework: 'cn-tc260-framework',
    ref: 'App. 2 II.2',
    title: 'Identity and access management',
    url: TC260_URL,
    note: 'Identity and permissions per agent; printed pp. 120-121.',
    strength: 'related',
    obligation: OBL_CN_TC260_APP2,
    verified: true,
  },
  {
    topic: 'inventory-registration',
    framework: 'cn-tc260-framework',
    ref: '4.4.1',
    title: 'CII registration and filing',
    url: TC260_URL,
    note: 'Registration/filing for critical information infrastructure; printed p. 91.',
    strength: 'related',
    obligation: OBL_CN_TC260,
    verified: true,
  },

  // ── Logging and traceability ─────────────────────────────────────────────
  {
    topic: 'logging-traceability',
    framework: 'eu-ai-act',
    ref: 'Art. 12',
    title: 'Record-keeping',
    url: aia('12'),
    note: 'Automatic logging over the system lifetime.',
    strength: 'core',
    obligation: 'EU AI Act Art. 12 record-keeping and logging',
    verified: true,
  },
  {
    topic: 'logging-traceability',
    framework: 'eu-ai-act',
    ref: 'Art. 26',
    title: 'Obligations of deployers of high-risk AI systems',
    url: aia('26'),
    note: 'Deployers keep the logs the system generates.',
    strength: 'related',
    obligation: OBL_EU_26,
    verified: true,
  },
  {
    topic: 'logging-traceability',
    framework: 'iso-42001',
    ref: 'A.6',
    title: 'AI system life cycle',
    url: ISO_URL,
    note: 'Lifecycle event logs.',
    strength: 'core',
    obligation: OBL_A6,
    verified: true,
  },
  {
    topic: 'logging-traceability',
    framework: 'nist-ai-rmf',
    ref: 'MANAGE 4',
    title:
      'MANAGE 4: Risk treatments, including response and recovery, and communication plans for the identified and measured AI risks are documented and monitored',
    url: NIST_URL,
    strength: 'related',
    obligation: 'MANAGE',
    verified: true,
  },
  {
    topic: 'logging-traceability',
    framework: 'nist-ai-rmf',
    ref: 'MEASURE 3',
    title: 'MEASURE 3: Mechanisms for tracking identified AI risks over time are in place',
    url: NIST_URL,
    strength: 'related',
    obligation: 'MEASURE',
    verified: true,
  },
  {
    topic: 'logging-traceability',
    framework: 'cn-tc260-framework',
    ref: 'App. 2 II.6',
    title: 'Continuous monitoring and auditing',
    url: TC260_URL,
    note: 'Log management and auditing for agents; printed pp. 124-125.',
    strength: 'core',
    obligation: OBL_CN_TC260_APP2,
    verified: true,
  },
  {
    topic: 'logging-traceability',
    framework: 'cn-tc260-framework',
    ref: '5.3.6',
    title: 'Logs kept and audited',
    url: TC260_URL,
    note: 'Keep logs at least six months and audit them; printed p. 102.',
    strength: 'core',
    obligation: OBL_CN_TC260,
    verified: true,
  },
  {
    topic: 'logging-traceability',
    framework: 'cn-content-labelling',
    ref: 'Art. 5',
    title: 'Implicit metadata labels',
    url: LABEL_URL,
    note: 'Metadata labels support content traceability; CAC text.',
    strength: 'related',
    obligation: OBL_CN_LABEL,
    verified: true,
  },

  // ── Human oversight ──────────────────────────────────────────────────────
  {
    topic: 'human-oversight',
    framework: 'eu-ai-act',
    ref: 'Art. 14',
    title: 'Human oversight',
    url: aia('14'),
    note: 'See pattern: /bok/patterns#pattern-human-in-the-loop-gate',
    strength: 'core',
    obligation: 'EU AI Act Art. 14 human oversight',
    verified: true,
  },
  {
    topic: 'human-oversight',
    framework: 'eu-ai-act',
    ref: 'Art. 26',
    title: 'Obligations of deployers of high-risk AI systems',
    url: aia('26'),
    note: 'Deployers assign the humans who oversee the system.',
    strength: 'related',
    obligation: OBL_EU_26,
    verified: true,
  },
  {
    topic: 'human-oversight',
    framework: 'iso-42001',
    ref: 'A.9',
    title: 'Use of AI systems',
    url: ISO_URL,
    note: 'Oversight of AI systems in use.',
    strength: 'core',
    obligation: 'A.9 Use of AI systems',
    verified: true,
  },
  {
    topic: 'human-oversight',
    framework: 'nist-ai-rmf',
    ref: 'MANAGE 2.4',
    title:
      'MANAGE 2.4: Mechanisms are in place and applied, and responsibilities are assigned and understood, to supersede, disengage, or deactivate AI systems that demonstrate performance or outcomes inconsistent with intended use',
    url: NIST_URL,
    note: 'See pattern: /bok/patterns#pattern-human-in-the-loop-gate',
    strength: 'core',
    obligation: 'MANAGE',
    verified: true,
  },
  {
    topic: 'human-oversight',
    framework: 'nist-ai-rmf',
    ref: 'GOVERN 3.2',
    title:
      'GOVERN 3.2: Policies and procedures are in place to define and differentiate roles and responsibilities for human-AI configurations and oversight of AI systems',
    url: NIST_URL,
    strength: 'related',
    obligation: 'GOVERN',
    verified: true,
  },
  {
    topic: 'human-oversight',
    framework: 'cn-tc260-framework',
    ref: 'App. 2 II.3',
    title: 'Strengthen human approval',
    url: TC260_URL,
    note: 'Human approval checkpoints, tamper-proof approval logs, deny-by-default; printed pp. 121-122.',
    strength: 'core',
    obligation: OBL_CN_TC260_APP2,
    verified: true,
  },
  {
    topic: 'human-oversight',
    framework: 'cn-algo-recommendation',
    ref: 'Art. 17',
    title: 'User option to switch off',
    url: ALGOREC_URL,
    note: 'Users can opt out of algorithmic recommendation; CAC text.',
    strength: 'related',
    obligation: OBL_CN_ALGOREC,
    verified: true,
  },
  {
    topic: 'human-oversight',
    framework: 'cn-genai-measures',
    ref: 'Art. 10',
    title: 'User guidance and protection',
    url: GENAI_URL,
    note: 'Disclose scope of use and protect minors from over-reliance; CAC text.',
    strength: 'related',
    obligation: OBL_CN_GENAI,
    verified: true,
  },

  // ── Runtime guardrails ───────────────────────────────────────────────────
  {
    topic: 'runtime-guardrails',
    framework: 'eu-ai-act',
    ref: 'Art. 5',
    title: 'Prohibited AI practices',
    url: aia('5'),
    note: 'Prohibitions enforced as input/output guardrails.',
    strength: 'related',
    obligation: 'EU AI Act Art. 5 prohibited practices (incl. new NCII and CSAM bans)',
    verified: true,
  },
  {
    topic: 'runtime-guardrails',
    framework: 'eu-ai-act',
    ref: 'Art. 15',
    title: 'Accuracy, robustness and cybersecurity',
    url: aia('15'),
    note: 'Robustness and security controls that also act at runtime.',
    strength: 'related',
    obligation: 'EU AI Act Art. 15 accuracy, robustness and cybersecurity',
    verified: true,
  },
  {
    topic: 'runtime-guardrails',
    framework: 'iso-42001',
    ref: 'A.9',
    title: 'Use of AI systems',
    url: ISO_URL,
    note: 'See pattern: /bok/patterns#pattern-runtime-guardrail',
    strength: 'core',
    obligation: 'A.9 Use of AI systems',
    verified: true,
  },
  {
    topic: 'runtime-guardrails',
    framework: 'iso-42001',
    ref: 'A.6',
    title: 'AI system life cycle',
    url: ISO_URL,
    note: 'Operational controls in the run phase.',
    strength: 'related',
    obligation: OBL_A6,
    verified: true,
  },
  {
    topic: 'runtime-guardrails',
    framework: 'nist-ai-rmf',
    ref: 'MANAGE 2',
    title:
      'MANAGE 2: Strategies to maximize AI benefits and minimize negative impacts are planned, prepared, implemented, documented, and informed by relevant AI actors',
    url: NIST_URL,
    note: 'See pattern: /bok/patterns#pattern-runtime-guardrail',
    strength: 'core',
    obligation: 'MANAGE',
    verified: true,
  },
  {
    topic: 'runtime-guardrails',
    framework: 'cn-tc260-framework',
    ref: 'App. 2 II.5',
    title: 'Dynamic runtime management',
    url: TC260_URL,
    note: 'Runtime guardrails, memory isolation and sandbox isolation for agents; printed pp. 123-124.',
    strength: 'core',
    obligation: OBL_CN_TC260_APP2,
    verified: true,
  },
  {
    topic: 'runtime-guardrails',
    framework: 'cn-tc260-framework',
    ref: '3.2.1',
    title: 'Technological countermeasures for agentic AI',
    url: TC260_URL,
    note: 'Agentic-AI technical countermeasures; printed p. 77.',
    strength: 'core',
    obligation: OBL_CN_TC260,
    verified: true,
  },
  {
    topic: 'runtime-guardrails',
    framework: 'cn-genai-measures',
    ref: 'Art. 10',
    title: 'Guided, bounded use',
    url: GENAI_URL,
    note: 'Bound the service scope and guide reasonable use; CAC text.',
    strength: 'core',
    obligation: OBL_CN_GENAI,
    verified: true,
  },
  {
    topic: 'runtime-guardrails',
    framework: 'cn-genai-measures',
    ref: 'Art. 14',
    title: 'Stop unlawful generation',
    url: GENAI_URL,
    note: 'Stop generation and transmission of unlawful content; CAC text.',
    strength: 'core',
    obligation: OBL_CN_GENAI,
    verified: true,
  },
  {
    topic: 'runtime-guardrails',
    framework: 'cn-deep-synthesis',
    ref: 'Art. 10',
    title: 'Input and output review',
    url: DEEPSYN_URL,
    note: 'Technical or manual review of user inputs and synthetic outputs; CAC text.',
    strength: 'core',
    obligation: OBL_CN_DEEPSYN,
    verified: true,
  },
  {
    topic: 'runtime-guardrails',
    framework: 'cn-algo-recommendation',
    ref: 'Art. 8',
    title: 'Periodic algorithm review',
    url: ALGOREC_URL,
    note: 'Regularly review the algorithm mechanisms, models and data; CAC text.',
    strength: 'related',
    obligation: OBL_CN_ALGOREC,
    verified: true,
  },
  {
    topic: 'runtime-guardrails',
    framework: 'cn-algo-recommendation',
    ref: 'Art. 9',
    title: 'Feature database for unlawful content',
    url: ALGOREC_URL,
    note: 'Maintain a feature library to identify unlawful and harmful information; CAC text.',
    strength: 'related',
    obligation: OBL_CN_ALGOREC,
    verified: true,
  },

  // ── Robustness, security and evaluations ─────────────────────────────────
  {
    topic: 'robustness-security-evals',
    framework: 'eu-ai-act',
    ref: 'Art. 15',
    title: 'Accuracy, robustness and cybersecurity',
    url: aia('15'),
    note: 'See pattern: /bok/patterns#pattern-adversarial-red-team-suite',
    strength: 'core',
    obligation: 'EU AI Act Art. 15 accuracy, robustness and cybersecurity',
    verified: true,
  },
  {
    topic: 'robustness-security-evals',
    framework: 'eu-ai-act',
    ref: 'Art. 55',
    title: 'Obligations for providers of general-purpose AI models with systemic risk',
    url: aia('55'),
    note: 'Model evaluations and adversarial testing for systemic-risk GPAI.',
    strength: 'core',
    obligation: OBL_EU_55,
    verified: true,
  },
  {
    topic: 'robustness-security-evals',
    framework: 'eu-ai-act',
    ref: 'Art. 60',
    title:
      'Testing of high-risk AI systems in real-world conditions outside AI regulatory sandboxes',
    url: aia('60'),
    note: 'Real-world testing plan and controls.',
    strength: 'related',
    obligation: 'EU AI Act Art. 60 testing in real-world conditions outside sandboxes',
    verified: true,
  },
  {
    topic: 'robustness-security-evals',
    framework: 'iso-42001',
    ref: 'A.6',
    title: 'AI system life cycle',
    url: ISO_URL,
    note: 'Verification and validation in the lifecycle; see pattern: /bok/patterns#pattern-eval-gate-in-ci',
    strength: 'core',
    obligation: OBL_A6,
    verified: true,
  },
  {
    topic: 'robustness-security-evals',
    framework: 'iso-42001',
    ref: '9.1',
    title: 'Monitoring, measurement, analysis and evaluation',
    url: ISO_URL,
    strength: 'related',
    verified: true,
  },
  {
    topic: 'robustness-security-evals',
    framework: 'nist-ai-rmf',
    ref: 'MEASURE 2',
    title: 'MEASURE 2: AI systems are evaluated for trustworthy characteristics',
    url: NIST_URL,
    note: 'See pattern: /bok/patterns#pattern-eval-gate-in-ci',
    strength: 'core',
    obligation: 'MEASURE',
    verified: true,
  },
  {
    topic: 'robustness-security-evals',
    framework: 'cn-tc260-framework',
    ref: '3',
    title: 'Technological countermeasures',
    url: TC260_URL,
    note: 'Technical measures across model, algorithm and data; printed p. 73.',
    strength: 'core',
    obligation: OBL_CN_TC260,
    verified: true,
  },
  {
    topic: 'robustness-security-evals',
    framework: 'cn-tc260-framework',
    ref: 'App. 2 II.6',
    title: 'Sandbox validation and red teaming',
    url: TC260_URL,
    note: 'Sandbox validation, red teaming and auditing for agents; printed pp. 124-125.',
    strength: 'core',
    obligation: OBL_CN_TC260_APP2,
    verified: true,
  },
  {
    topic: 'robustness-security-evals',
    framework: 'cn-tc260-framework',
    ref: '5.3.14',
    title: 'Resilience',
    url: TC260_URL,
    note: 'System resilience requirement; printed p. 103.',
    strength: 'related',
    obligation: OBL_CN_TC260,
    verified: true,
  },
  {
    topic: 'robustness-security-evals',
    framework: 'cn-deep-synthesis',
    ref: 'Art. 15',
    title: 'Technology management and algorithm verification',
    url: DEEPSYN_URL,
    note: 'Regular audit, assessment and verification of the synthesis-algorithm mechanisms; CAC text.',
    strength: 'core',
    obligation: OBL_CN_DEEPSYN,
    verified: true,
  },
  {
    topic: 'robustness-security-evals',
    framework: 'cn-deep-synthesis',
    ref: 'Art. 20',
    title: 'Security assessment of new products',
    url: DEEPSYN_URL,
    note: 'Security assessment before launching public-opinion products; CAC text.',
    strength: 'core',
    obligation: OBL_CN_DEEPSYN,
    verified: true,
  },
  {
    topic: 'robustness-security-evals',
    framework: 'cn-genai-measures',
    ref: 'Art. 17',
    title: 'Security assessment',
    url: GENAI_URL,
    note: 'Pre-deployment security assessment; CAC text.',
    strength: 'related',
    obligation: OBL_CN_GENAI,
    verified: true,
  },
  {
    topic: 'robustness-security-evals',
    framework: 'cn-gbt-45654',
    ref: 'Security assessment',
    title: 'Security-assessment requirements for generative AI services',
    url: GBT_URL,
    note: 'GB/T 45654-2025 security-assessment requirements (TC260-003 predecessor §8 and Annex A risk list). The official listing shows the standard as current (issued 2025-04-25, implemented 2025-11-01; checked 2026-09-24), but the full text is only offered there as an image preview, so the clause id is not verified against it.',
    strength: 'core',
    obligation: OBL_CN_GBT,
    verified: false,
  },

  // ── Incident response and monitoring ─────────────────────────────────────
  {
    topic: 'incident-monitoring',
    framework: 'eu-ai-act',
    ref: 'Art. 72',
    title: 'Post-market monitoring by providers and post-market monitoring plan',
    url: aia('72'),
    note: 'Continuous post-market monitoring.',
    strength: 'core',
    obligation: 'EU AI Act Art. 72 post-market monitoring',
    verified: true,
  },
  {
    topic: 'incident-monitoring',
    framework: 'eu-ai-act',
    ref: 'Art. 73',
    title: 'Reporting of serious incidents',
    url: aia('73'),
    note: 'See pattern: /bok/patterns#pattern-incident-pipeline',
    strength: 'core',
    obligation: 'EU AI Act Art. 73 serious-incident reporting',
    verified: true,
  },
  {
    topic: 'incident-monitoring',
    framework: 'eu-ai-act',
    ref: 'Art. 55',
    title: 'Obligations for providers of general-purpose AI models with systemic risk',
    url: aia('55'),
    note: 'Systemic-risk incident tracking and reporting.',
    strength: 'related',
    obligation: OBL_EU_55,
    verified: true,
  },
  {
    topic: 'incident-monitoring',
    framework: 'iso-42001',
    ref: 'A.8',
    title: 'Information for interested parties',
    url: ISO_URL,
    note: 'Incident communication to interested parties.',
    strength: 'core',
    obligation: 'A.8 Information for interested parties',
    verified: true,
  },
  {
    topic: 'incident-monitoring',
    framework: 'iso-42001',
    ref: '10.2',
    title: 'Nonconformity and corrective action',
    url: ISO_URL,
    strength: 'core',
    verified: true,
  },
  {
    topic: 'incident-monitoring',
    framework: 'nist-ai-rmf',
    ref: 'MANAGE 4',
    title:
      'MANAGE 4: Risk treatments, including response and recovery, and communication plans for the identified and measured AI risks are documented and monitored',
    url: NIST_URL,
    note: 'See pattern: /bok/patterns#pattern-continuous-assurance-telemetry',
    strength: 'core',
    obligation: 'MANAGE',
    verified: true,
  },
  {
    topic: 'incident-monitoring',
    framework: 'cn-tc260-framework',
    ref: '5.3.7',
    title: 'Real-time risk monitoring',
    url: TC260_URL,
    note: 'Real-time monitoring of AI risks in operation; printed p. 102.',
    strength: 'core',
    obligation: OBL_CN_TC260,
    verified: true,
  },
  {
    topic: 'incident-monitoring',
    framework: 'cn-tc260-framework',
    ref: '5.3.18',
    title: 'Incident reporting',
    url: TC260_URL,
    note: 'Report safety incidents; printed p. 104.',
    strength: 'core',
    obligation: OBL_CN_TC260,
    verified: true,
  },
  {
    topic: 'incident-monitoring',
    framework: 'cn-tc260-framework',
    ref: 'App. 2 II.6',
    title: 'Emergency plans',
    url: TC260_URL,
    note: 'Emergency plans within continuous monitoring for agents; printed pp. 124-125.',
    strength: 'related',
    obligation: OBL_CN_TC260_APP2,
    verified: true,
  },
  {
    topic: 'incident-monitoring',
    framework: 'cn-genai-measures',
    ref: 'Art. 14',
    title: 'Handle and report unlawful content',
    url: GENAI_URL,
    note: 'Stop, rectify and report unlawful content and optimise the model; CAC text.',
    strength: 'core',
    obligation: OBL_CN_GENAI,
    verified: true,
  },
  {
    topic: 'incident-monitoring',
    framework: 'cn-genai-measures',
    ref: 'Art. 15',
    title: 'Complaint and reporting mechanism',
    url: GENAI_URL,
    note: 'Accessible complaint and report channels with published timelines; CAC text.',
    strength: 'core',
    obligation: OBL_CN_GENAI,
    verified: true,
  },
  {
    topic: 'incident-monitoring',
    framework: 'cn-algo-recommendation',
    ref: 'Art. 7',
    title: 'Security management and emergency response',
    url: ALGOREC_URL,
    note: 'Management systems include emergency response; CAC text.',
    strength: 'related',
    obligation: OBL_CN_ALGOREC,
    verified: true,
  },

  // ── Supply chain and third parties ───────────────────────────────────────
  {
    topic: 'supply-chain',
    framework: 'eu-ai-act',
    ref: 'Art. 25',
    title: 'Responsibilities along the AI value chain',
    url: aia('25'),
    note: 'See pattern: /bok/patterns#pattern-vendor--model-due-diligence-gate',
    strength: 'core',
    obligation: 'EU AI Act Art. 25 responsibilities along the AI value chain',
    verified: true,
  },
  {
    topic: 'supply-chain',
    framework: 'eu-ai-act',
    ref: 'Art. 26',
    title: 'Obligations of deployers of high-risk AI systems',
    url: aia('26'),
    note: 'Deployer duties toward upstream providers.',
    strength: 'related',
    obligation: OBL_EU_26,
    verified: true,
  },
  {
    topic: 'supply-chain',
    framework: 'iso-42001',
    ref: 'A.10',
    title: 'Third-party and customer relationships',
    url: ISO_URL,
    strength: 'core',
    obligation: 'A.10 Third-party and customer relationships',
    verified: true,
  },
  {
    topic: 'supply-chain',
    framework: 'nist-ai-rmf',
    ref: 'GOVERN 6',
    title:
      'GOVERN 6: Policies and procedures are in place to address AI risks and benefits arising from third-party software and data and other supply chain issues',
    url: NIST_URL,
    strength: 'core',
    obligation: 'GOVERN',
    verified: true,
  },
  {
    topic: 'supply-chain',
    framework: 'nist-ai-rmf',
    ref: 'MAP 4',
    title:
      'MAP 4: Risks and benefits are mapped for all AI system components including third-party software and data',
    url: NIST_URL,
    strength: 'core',
    obligation: 'MAP',
    verified: true,
  },
  {
    topic: 'supply-chain',
    framework: 'nist-ai-rmf',
    ref: 'MANAGE 3',
    title: 'MANAGE 3: AI risks and benefits from third-party entities are managed',
    url: NIST_URL,
    strength: 'core',
    obligation: 'MANAGE',
    verified: true,
  },
  {
    topic: 'supply-chain',
    framework: 'cn-tc260-framework',
    ref: 'App. 2 II.4',
    title: 'Supply chain and tool management',
    url: TC260_URL,
    note: 'Supply-chain and tool-invocation management for agents; printed pp. 122-123.',
    strength: 'core',
    obligation: OBL_CN_TC260_APP2,
    verified: true,
  },
  {
    topic: 'supply-chain',
    framework: 'cn-tc260-framework',
    ref: '4.4.4',
    title: 'Open-source ecosystem',
    url: TC260_URL,
    note: 'Governance of the open-source AI ecosystem; printed p. 92.',
    strength: 'related',
    obligation: OBL_CN_TC260,
    verified: true,
  },
  {
    topic: 'supply-chain',
    framework: 'cn-genai-measures',
    ref: 'Art. 7',
    title: 'Lawful data and model sources',
    url: GENAI_URL,
    note: 'Upstream training-data (and model) sourcing must be lawful; CAC text.',
    strength: 'related',
    obligation: OBL_CN_GENAI,
    verified: true,
  },
  {
    topic: 'supply-chain',
    framework: 'cn-deep-synthesis',
    ref: 'Art. 14',
    title: 'Providers and technical supporters',
    url: DEEPSYN_URL,
    note: 'Providers and their technical supporters share training-data duties (a value-chain relationship); CAC text. Draft mapped this to Art. 7, but Art. 14 is the article that names technical supporters.',
    strength: 'related',
    obligation: OBL_CN_DEEPSYN,
    verified: true,
  },
];

const byId = new Map<string, Framework>(frameworks.map((f) => [f.id, f]));

/** Look up a framework by id. */
export function frameworkById(id: string): Framework | undefined {
  return byId.get(id);
}

/** `${prefix} ${ref}` for the China column's chips, `${ref}` otherwise. */
export function chipLabel(r: CrosswalkRef): string {
  const prefix = chipPrefix[r.framework];
  return prefix ? `${prefix} ${r.ref}` : r.ref;
}

/** Refs for one topic, grouped by framework id in declaration order. */
export function refsByTopic(topicId: string): Map<string, CrosswalkRef[]> {
  const grouped = new Map<string, CrosswalkRef[]>();
  for (const r of refs) {
    if (r.topic !== topicId) continue;
    const list = grouped.get(r.framework);
    if (list) list.push(r);
    else grouped.set(r.framework, [r]);
  }
  return grouped;
}

const strengthRank: Record<RefStrength, number> = { core: 0, related: 1 };

/** The full grid: columns with their resolved frameworks, and one row per topic
 *  whose cells (core first) line up with the columns. */
export function topicMatrix(): {
  columns: (CrosswalkColumn & { fws: Framework[] })[];
  rows: { topic: Topic; cells: CrosswalkRef[][] }[];
} {
  const resolvedColumns = columns.map((column) => ({
    ...column,
    fws: column.frameworks
      .map((id) => frameworkById(id))
      .filter((f): f is Framework => f !== undefined),
  }));

  const rows = topics.map((topic) => ({
    topic,
    cells: columns.map((column) =>
      refs
        .filter(
          (r) => r.topic === topic.id && column.frameworks.includes(r.framework),
        )
        // Stable sort keeps declaration order within each strength band.
        .sort((a, b) => strengthRank[a.strength] - strengthRank[b.strength]),
    ),
  }));

  return { columns: resolvedColumns, rows };
}
