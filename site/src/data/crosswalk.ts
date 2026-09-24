// crosswalk.ts: the topic-centred index built on frameworks.ts. Where
// frameworks.ts answers "for this obligation, what artefact evidences it and on
// which layer does it live?", this module answers the reader's other question:
// "which article or clause of each framework deals with topic X?", e.g. AI risk
// management is EU AI Act Art. 9, ISO/IEC 42001 6.1.2/6.1.3/8.2/8.3, NIST AI RMF
// MAP/MANAGE and China's TC260 3.0 risk taxonomy.
//
// The clause ids here are finer than chapter 08 (bok/08-regulatory-map.md): ISO
// clause ids (6.1.2, A.5, …) come from the ISO Online Browsing Platform table of
// contents and NIST subcategory ids (MAP 1, MANAGE 2.4, GOVERN 1.6, …) from NIST
// AI RMF 1.0 Appendix A / the Playbook. Fidelity to chapter 08 is kept through
// the optional `obligationId` join: where a clause has an obligations[] row in
// frameworks.ts, `obligationId` carries that row's stable id (AIGE-OBL-...), so
// the UI links the crosswalk cell to the row's page in the obligation register
// (/obligations/<id>) and a reworded row never breaks the join. Mappings are
// illustrative, not a claim of conformity.
//
// Version 2 (BoK v0.5.0) widens the grid to 25 topics and 14 columns, keeps a
// fallback list for instruments the register does not carry yet
// (`crosswalkInstruments`, looked up after frameworks.ts), and gives every
// reference a `clauseId` token that the explorer and the OSCAL export reuse.
// `verified` stays honest: true only where the clause was checked against the
// primary text (or a sibling chapter's primary check, as STYLEGUIDE §6 allows);
// ISO/IEC clauses that could not be opened, and the prEN drafts, stay false
// with a note saying why.

import type { Framework, Obligation, StackLayer } from './frameworks';
import { frameworks, obligations } from './frameworks';

export { disclaimer } from './frameworks';

/** Date of the last verification pass over the v0.5.0 references. */
export const crosswalkAsOf = '2026-09-24';

/** Schema version of the published crosswalk.json / crosswalk.csv shape. */
export const crosswalkSchemaVersion = 2;

export interface Topic {
  /** Stable id used by refs and the route fragment. */
  id: string;
  /** Short human name. */
  name: string;
  /** One-to-two-sentence description of the topic. */
  summary: string;
  /** Stack layer(s) the topic mostly lives on, where it maps cleanly. */
  layerN?: readonly StackLayer[];
  /** Where the Body of Knowledge treats the topic (internal hrefs). */
  read?: readonly { label: string; href: string }[];
}

/** How the column chooser groups the columns. */
export type ColumnGroup = 'law' | 'codes' | 'standards';

export interface CrosswalkColumn {
  /** Column id, e.g. 'eu', 'iso', 'nist', 'cn'. */
  id: string;
  /** Column header label. */
  label: string;
  /** Framework ids that share the column, in display order. */
  frameworks: readonly string[];
  /** Chooser group: binding law, codes and frameworks, or standards and controls. */
  group: ColumnGroup;
  /** Shown before the reader picks columns (the four v0.4 columns). */
  defaultVisible?: boolean;
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
  /** Stable id of the obligations[] row in frameworks.ts the clause joins
   *  (AIGE-OBL-...), linking the row's register page. Unset where no row exists
   *  (most ISO clauses). */
  obligationId?: string;
  /** Legacy (v0.4) join by the row's exact obligation text. Still resolved by
   *  `refObligation`, so refs written against the text keep working, but new
   *  refs use `obligationId`. */
  obligation?: string;
  /** false = could not be checked against the source; then `note` is required. */
  verified?: boolean;
  /** Internal href of the Body-of-Knowledge section that uses the clause. */
  see?: string;
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

/** EU AI Act annex in the same consolidated text; EUR-Lex anchors it #anx_<n>. */
const aiaAnx = (n: string): string =>
  `https://eur-lex.europa.eu/eli/reg/2024/1689/2026-07-27/eng#anx_${n}`;
/** GDPR article on EUR-Lex (ELI of Reg. (EU) 2016/679, #art_<n>). */
const gdpr = (n: string): string => `https://eur-lex.europa.eu/eli/reg/2016/679/oj/eng#art_${n}`;

// v0.5.0 instruments: one canonical URL each, as opened on 2026-09-24.
const GPAI_T_URL = 'https://ec.europa.eu/newsroom/dae/redirection/document/118120';
const GPAI_C_URL = 'https://ec.europa.eu/newsroom/dae/redirection/document/118115';
const GPAI_S_URL = 'https://ec.europa.eu/newsroom/dae/redirection/document/118119';
const ISO42005_URL = 'https://www.iso.org/standard/44545.html';
const ISO23894_URL = 'https://www.iso.org/standard/77304.html';
const ISO42006_URL = 'https://www.iso.org/standard/42006';
const CSA_URL = 'https://cloudsecurityalliance.org/artifacts/ai-controls-matrix-v1-1';
const LLM_URL = 'https://genai.owasp.org/resource/owasp-genai-llm-top-10-2026/';
const ASI_URL =
  'https://genai.owasp.org/resource/owasp-top-10-for-agentic-applications-for-2026/';
const KR_URL = 'https://www.law.go.kr/LSW/lsInfoP.do?lsiSeq=268543';
const DUAA_URL = 'https://www.legislation.gov.uk/ukpga/2025/18/section/80';
const ATRS_URL = 'https://www.gov.uk/government/publications/algorithmic-transparency-template';
const SG_GENAI_URL =
  'https://aiverifyfoundation.sg/wp-content/uploads/2024/05/Model-AI-Governance-Framework-for-Generative-AI-May-2024-1-1.pdf';
const SG_AGENTIC_URL =
  'https://www.imda.gov.sg/-/media/imda/files/about/emerging-tech-and-research/artificial-intelligence/mgf-for-agentic-ai.pdf';
const COE_URL = 'https://rm.coe.int/1680afae3c';
const OECD_URL = 'https://legalinstruments.oecd.org/en/instruments/OECD-LEGAL-0449';
const G7_URL =
  'https://digital-strategy.ec.europa.eu/en/library/hiroshima-process-international-code-conduct-advanced-ai-systems';
const EN18286_URL =
  'https://www.cencenelec.eu/news-events/news/2026/en-in-the-spotlight/2026-07-30-ai-quality-management/';
const PREN18228_URL = 'https://genorma.com/en/standards/pren-18228';
const JTC21_URL = 'https://jtc21.eu/working-groups/';

/**
 * Instruments the crosswalk maps before frameworks.ts carries them. Empty since
 * the v0.5.0 register promoted all eight it held (gdpr, uk-atrs,
 * sg-agentic-framework, coe-cets-225, oecd-ai-principles, g7-hiroshima-coc,
 * pren-18228, pren-18229-1). A new instrument the crosswalk needs before the
 * register carries it goes here, same shape as frameworks.ts; frameworkById
 * looks in frameworks.ts first, so a promoted entry wins.
 */
export const crosswalkInstruments: readonly Framework[] = [];

/**
 * Chip prefix for the frameworks that share a column: the single place the
 * six cn-* ids live (the `cn` column's frameworks are derived from them), plus
 * the other multi-instrument columns. An empty prefix means the clause id
 * already names its instrument (LLM01:2026, ASI03, EN 18286). Single-framework
 * columns carry no entry and no prefix.
 */
export const cnChipPrefix: Readonly<Record<string, string>> = {
  'cn-tc260-framework': 'TC260',
  'cn-genai-measures': 'GenAI',
  'cn-deep-synthesis': 'DeepSyn',
  'cn-algo-recommendation': 'AlgoRec',
  'cn-content-labelling': 'Label',
  'cn-gbt-45654': 'GB/T 45654',
};

export const chipPrefix: Readonly<Record<string, string>> = {
  ...cnChipPrefix,
  'iso-42005': '42005',
  'iso-23894': '23894',
  'iso-42006': '',
  'owasp-llm-top-10': '',
  'owasp-agentic-top-10': '',
  'uk-duaa': 'UK GDPR',
  'uk-atrs': 'ATRS',
  'sg-genai-framework': 'GenAI',
  'sg-agentic-framework': 'Agentic',
  'coe-cets-225': 'CoE',
  'oecd-ai-principles': 'OECD',
  'g7-hiroshima-coc': 'G7',
  'en-18286': '',
  'pren-18228': '',
  'pren-18229-1': '',
};

/** The 25 topics, in display order: the twelve v0.4 topics, then thirteen more. */
export const topics: readonly Topic[] = [
  {
    id: 'risk-management',
    name: 'Risk management',
    summary:
      'Identifying, analysing and treating AI risks across the lifecycle, and keeping the treatment current as the system and its context change.',
    layerN: [1, 3],
    read: [{ label: '13. Where risk management sits', href: '/bok/risk-management' }],
  },
  {
    id: 'governance-accountability',
    name: 'Governance and accountability',
    summary:
      'The policies, roles and accountability structures that put a named owner behind every AI decision and control.',
    layerN: [1],
    read: [{ label: '12. Running the AI governance program', href: '/bok/governance-program' }],
  },
  {
    id: 'impact-assessment',
    name: 'Impact assessment',
    summary:
      "Assessing an AI system's impact on fundamental rights, individuals and society before and during deployment.",
    layerN: [1, 2],
    read: [
      {
        label: '18. The EU AI Act in one pass: fundamental rights impact assessment',
        href: '/bok/eu-ai-act#fundamental-rights-impact-assessment-article-27',
      },
    ],
  },
  {
    id: 'data-governance',
    name: 'Data governance',
    summary:
      'Governing the data an AI system trains on and processes: lawful sourcing, quality, lineage and protection of personal and input data.',
    layerN: [2, 3],
    read: [{ label: '14. Governing AI development', href: '/bok/governing-development' }],
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
    read: [{ label: '11. AI, defined for governance', href: '/bok/ai-defined' }],
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
    read: [{ label: '17. Incidents, issues and root causes', href: '/bok/incidents' }],
  },
  {
    id: 'supply-chain',
    name: 'Supply chain and third parties',
    summary:
      'Allocating responsibility along the AI value chain and managing risks from third-party models, data, tools and technical supporters.',
    layerN: [2, 5],
    read: [
      {
        label: '18. The EU AI Act in one pass: who you are in the value chain',
        href: '/bok/eu-ai-act#who-you-are-in-the-value-chain',
      },
    ],
  },
  // ── v0.5.0 topics ─────────────────────────────────────────────────────────
  {
    id: 'prohibited-practices',
    name: 'Prohibited practices',
    summary:
      'Uses of AI that a jurisdiction bans outright or a framework treats as unacceptable, and the intake controls that keep them out of the portfolio.',
    layerN: [1],
    read: [
      {
        label: '18. The EU AI Act in one pass: prohibited practices',
        href: '/bok/eu-ai-act#prohibited-practices-article-5',
      },
    ],
  },
  {
    id: 'fairness-non-discrimination',
    name: 'Fairness and non-discrimination',
    summary:
      'Detecting and correcting bias in data, models and outcomes, and the lawful handling of the sensitive data that bias testing needs.',
    layerN: [2, 3],
    read: [
      {
        label: '16. Fairness and explainability for practitioners',
        href: '/bok/fairness-and-explainability',
      },
    ],
  },
  {
    id: 'privacy-data-protection',
    name: 'Privacy and data protection',
    summary:
      'Lawful basis, minimisation, privacy by design and the privacy attacks specific to models, wherever an AI system touches personal data.',
    layerN: [1, 2, 4],
    read: [
      {
        label: '19. Privacy and data protection law applied to AI',
        href: '/bok/privacy-and-ai',
      },
    ],
  },
  {
    id: 'explainability',
    name: 'Explainability and right to explanation',
    summary:
      'Explaining a model and an individual output to the people who use it or are affected by it, and the legal rights to an explanation and to contest.',
    layerN: [2, 4],
    read: [
      {
        label: '18. The EU AI Act in one pass: explanation and notice to affected people',
        href: '/bok/eu-ai-act#explanation-and-notice-to-affected-people',
      },
    ],
  },
  {
    id: 'ai-literacy',
    name: 'AI literacy and competence',
    summary:
      'Making sure the people who build, operate, oversee and use an AI system have the knowledge their role needs, with a record that shows it.',
    layerN: [1],
    read: [
      {
        label: '18. The EU AI Act in one pass: AI literacy and bias-detection data',
        href: '/bok/eu-ai-act#ai-literacy-and-bias-detection-data',
      },
    ],
  },
  {
    id: 'conformity-assessment',
    name: 'Conformity assessment and certification',
    summary:
      'Demonstrating conformity before market entry, independent audit and certification, and the standards that carry a presumption of conformity.',
    layerN: [5],
    read: [
      {
        label:
          '18. The EU AI Act in one pass: conformity assessment, declaration, marking and registration',
        href: '/bok/eu-ai-act#conformity-assessment-declaration-marking-and-registration',
      },
    ],
  },
  {
    id: 'gpai-foundation-models',
    name: 'GPAI and foundation models',
    summary:
      'Duties that attach to general-purpose and foundation models themselves: documentation for downstream providers, evaluation, and systemic-risk management.',
    layerN: [2, 3],
    read: [
      {
        label: '18. The EU AI Act in one pass: general-purpose AI models',
        href: '/bok/eu-ai-act#general-purpose-ai-models',
      },
    ],
  },
  {
    id: 'ip-copyright',
    name: 'IP and copyright',
    summary:
      'Lawful access to training content, honouring rights reservations, and keeping outputs from reproducing protected works.',
    layerN: [2],
    read: [{ label: '20. Other law that already applies to AI', href: '/bok/existing-law' }],
  },
  {
    id: 'agent-identity-autonomy',
    name: 'Agent identity and autonomy',
    summary:
      'Giving each agent its own identity and scoped permissions, bounding what it may do on its own, and keeping a human able to stop it.',
    layerN: [2, 4],
    read: [
      {
        label: '05. Patterns: Agent Identity & Scoped Credentials',
        href: '/bok/patterns#pattern-agent-identity--scoped-credentials',
      },
    ],
  },
  {
    id: 'content-provenance',
    name: 'Content provenance and deepfakes',
    summary:
      'Marking synthetic content so it can be detected, labelling deepfakes for the people who see them, and verifying where content came from.',
    layerN: [2, 4],
    read: [
      {
        label: '18. The EU AI Act in one pass: transparency cases',
        href: '/bok/eu-ai-act#transparency-cases-article-50',
      },
    ],
  },
  {
    id: 'sandboxes-real-world-testing',
    name: 'Sandboxes and real-world testing',
    summary:
      'Supervised regulatory sandboxes and testing in real-world conditions, with the plans, consent records and reversal paths they require.',
    layerN: [3],
    read: [
      {
        label: '18. The EU AI Act in one pass: sandboxes and real-world testing',
        href: '/bok/eu-ai-act#sandboxes-and-real-world-testing',
      },
    ],
  },
  {
    id: 'environmental-impact',
    name: 'Environmental impact',
    summary:
      'Measuring and reporting the energy and resource use of training and running AI systems, and weighing it in design decisions.',
    layerN: [2, 5],
    read: [
      {
        label: '22. Principles, soft law and standards: OECD AI Principles',
        href: '/bok/principles-and-standards#oecd-ai-principles',
      },
    ],
  },
  {
    id: 'deployment-change-decommissioning',
    name: 'Deployment, change and decommissioning',
    summary:
      'Putting a system into service, controlling changes that alter its risk, and withdrawing or retiring it safely when it no longer performs as intended.',
    layerN: [4, 5],
    read: [{ label: '15. Governing deployment and use', href: '/bok/governing-deployment' }],
  },
];

/**
 * The fourteen columns, in display order. The v0.4 columns keep their ids (eu,
 * iso, nist, cn) and stay the default view; the rest join through the column
 * chooser. Multi-instrument columns prefix their chips from chipPrefix.
 */
export const columns: readonly CrosswalkColumn[] = [
  { id: 'eu', label: 'EU AI Act', frameworks: ['eu-ai-act'], group: 'law', defaultVisible: true },
  { id: 'gpai', label: 'GPAI Code', frameworks: ['gpai-code-of-practice'], group: 'codes' },
  { id: 'gdpr', label: 'GDPR', frameworks: ['gdpr'], group: 'law' },
  {
    id: 'iso',
    label: 'ISO/IEC 42001',
    frameworks: ['iso-42001'],
    group: 'standards',
    defaultVisible: true,
  },
  {
    id: 'iso-more',
    label: 'ISO/IEC 42005 · 23894 · 42006',
    frameworks: ['iso-42005', 'iso-23894', 'iso-42006'],
    group: 'standards',
  },
  {
    id: 'nist',
    label: 'NIST AI RMF',
    frameworks: ['nist-ai-rmf'],
    group: 'codes',
    defaultVisible: true,
  },
  { id: 'csa', label: 'CSA AICM', frameworks: ['csa-aicm'], group: 'standards' },
  {
    id: 'owasp',
    label: 'OWASP GenAI',
    frameworks: ['owasp-llm-top-10', 'owasp-agentic-top-10'],
    group: 'standards',
  },
  { id: 'kr', label: 'Korea AI Basic Act', frameworks: ['kr-ai-basic-act'], group: 'law' },
  { id: 'uk', label: 'United Kingdom', frameworks: ['uk-duaa', 'uk-atrs'], group: 'law' },
  {
    id: 'sg',
    label: 'Singapore',
    frameworks: ['sg-genai-framework', 'sg-agentic-framework'],
    group: 'codes',
  },
  {
    id: 'intl',
    label: 'Treaty and soft law',
    frameworks: ['coe-cets-225', 'oecd-ai-principles', 'g7-hiroshima-coc'],
    group: 'codes',
  },
  {
    id: 'cen',
    label: 'CEN-CENELEC',
    frameworks: ['en-18286', 'pren-18228', 'pren-18229-1'],
    group: 'standards',
  },
  // The China column bundles six instruments; its ids come from cnChipPrefix so
  // renaming (or their arrival in frameworks.ts) stays a one-line change.
  {
    id: 'cn',
    label: 'China',
    frameworks: Object.keys(cnChipPrefix),
    group: 'law',
    defaultVisible: true,
  },
];

// Obligation-row ids (frameworks.ts) reused across topics.
const OBL_EU_9 = 'AIGE-OBL-EUAIA-ART9';
const OBL_EU_26 = 'AIGE-OBL-EUAIA-ART26';
const OBL_EU_55 = 'AIGE-OBL-EUAIA-ART55';
const OBL_EU_4971 = 'AIGE-OBL-EUAIA-ART49-71';
const OBL_A6 = 'AIGE-OBL-ISO42001-A6';
// China obligation-row ids (frameworks.ts).
const OBL_CN_ALGOREC = 'AIGE-OBL-CN-ALGOREC';
const OBL_CN_DEEPSYN = 'AIGE-OBL-CN-DEEPSYN';
const OBL_CN_GENAI = 'AIGE-OBL-CN-GENAI';
const OBL_CN_LABEL = 'AIGE-OBL-CN-LABEL';
const OBL_CN_GBT = 'AIGE-OBL-CN-GBT45654';
const OBL_CN_TC260 = 'AIGE-OBL-CN-TC260-OPS';
const OBL_CN_TC260_APP2 = 'AIGE-OBL-CN-TC260-AGENTS';

/** The v0.4 topic → framework clause refs, grouped by topic in display order. */
const refsV04: readonly CrosswalkRef[] = [
  // ── Risk management ──────────────────────────────────────────────────────
  {
    topic: 'risk-management',
    framework: 'eu-ai-act',
    ref: 'Art. 9',
    title: 'Risk management system',
    url: aia('9'),
    note: 'Iterative, lifecycle risk management; the backbone of the risk register.',
    strength: 'core',
    obligationId: OBL_EU_9,
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
    obligationId: OBL_A6,
    verified: true,
  },
  {
    topic: 'risk-management',
    framework: 'nist-ai-rmf',
    ref: 'MAP 1',
    title: 'MAP 1: Context is established and understood',
    url: NIST_URL,
    strength: 'core',
    obligationId: 'AIGE-OBL-NISTRMF-MAP',
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
    obligationId: 'AIGE-OBL-NISTRMF-MAP',
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
    obligationId: 'AIGE-OBL-NISTRMF-MANAGE',
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
    obligationId: 'AIGE-OBL-NISTRMF-MEASURE',
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
    obligationId: OBL_CN_TC260,
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
    obligationId: OBL_CN_TC260,
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
    obligationId: OBL_CN_TC260,
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
    obligationId: OBL_CN_GENAI,
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
    obligationId: OBL_CN_ALGOREC,
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
    obligationId: 'AIGE-OBL-EUAIA-ART17',
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
    obligationId: 'AIGE-OBL-EUAIA-ART4',
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
    obligationId: 'AIGE-OBL-ISO42001-A2',
    verified: true,
  },
  {
    topic: 'governance-accountability',
    framework: 'iso-42001',
    ref: 'A.3',
    title: 'Internal organization',
    url: ISO_URL,
    strength: 'core',
    obligationId: 'AIGE-OBL-ISO42001-A3',
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
    obligationId: 'AIGE-OBL-NISTRMF-GOVERN',
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
    obligationId: 'AIGE-OBL-NISTRMF-GOVERN',
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
    obligationId: OBL_CN_TC260,
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
    obligationId: OBL_CN_TC260,
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
    obligationId: OBL_CN_GENAI,
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
    obligationId: OBL_CN_ALGOREC,
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
    obligationId: OBL_CN_DEEPSYN,
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
    obligationId: 'AIGE-OBL-EUAIA-ART27',
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
    obligationId: OBL_EU_9,
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
    obligationId: 'AIGE-OBL-ISO42001-A5',
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
    obligationId: 'AIGE-OBL-NISTRMF-MAP',
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
    obligationId: 'AIGE-OBL-NISTRMF-MAP',
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
    obligationId: OBL_CN_TC260,
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
    obligationId: OBL_CN_TC260,
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
    obligationId: OBL_CN_GENAI,
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
    obligationId: 'AIGE-OBL-EUAIA-ART10',
    verified: true,
  },
  {
    topic: 'data-governance',
    framework: 'eu-ai-act',
    ref: 'Art. 4a',
    title: 'Special-category data for bias detection',
    note: 'Post-Omnibus new article: a lawful basis to process special-category data to detect and correct bias.',
    strength: 'related',
    obligationId: 'AIGE-OBL-EUAIA-ART4A',
    verified: true,
  },
  {
    topic: 'data-governance',
    framework: 'iso-42001',
    ref: 'A.7',
    title: 'Data for AI systems',
    url: ISO_URL,
    strength: 'core',
    obligationId: 'AIGE-OBL-ISO42001-A7',
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
    obligationId: 'AIGE-OBL-ISO42001-A4',
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
    obligationId: 'AIGE-OBL-NISTRMF-MAP',
    verified: true,
  },
  {
    topic: 'data-governance',
    framework: 'nist-ai-rmf',
    ref: 'MEASURE 2.10',
    title: 'MEASURE 2.10: Privacy risk of the AI system is examined and documented',
    url: NIST_URL,
    strength: 'related',
    obligationId: 'AIGE-OBL-NISTRMF-MEASURE',
    verified: true,
  },
  {
    topic: 'data-governance',
    framework: 'nist-ai-rmf',
    ref: 'MEASURE 2.11',
    title: 'MEASURE 2.11: Fairness and bias are evaluated and results are documented',
    url: NIST_URL,
    strength: 'related',
    obligationId: 'AIGE-OBL-NISTRMF-MEASURE',
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
    obligationId: OBL_CN_TC260,
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
    obligationId: OBL_CN_TC260,
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
    obligationId: OBL_CN_GENAI,
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
    obligationId: OBL_CN_GENAI,
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
    obligationId: OBL_CN_GENAI,
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
    obligationId: OBL_CN_DEEPSYN,
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
    obligationId: OBL_CN_GBT,
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
    obligationId: 'AIGE-OBL-EUAIA-ART11',
    verified: true,
  },
  {
    topic: 'documentation-transparency',
    framework: 'eu-ai-act',
    ref: 'Art. 13',
    title: 'Transparency and provision of information to deployers',
    url: aia('13'),
    strength: 'core',
    obligationId: 'AIGE-OBL-EUAIA-ART13',
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
    obligationId: 'AIGE-OBL-EUAIA-ART53',
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
    obligationId: 'AIGE-OBL-EUAIA-ART50',
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
    obligationId: OBL_A6,
    verified: true,
  },
  {
    topic: 'documentation-transparency',
    framework: 'iso-42001',
    ref: 'A.8',
    title: 'Information for interested parties',
    url: ISO_URL,
    strength: 'core',
    obligationId: 'AIGE-OBL-ISO42001-A8',
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
    obligationId: 'AIGE-OBL-NISTRMF-MAP',
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
    obligationId: 'AIGE-OBL-NISTRMF-MEASURE',
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
    obligationId: OBL_CN_LABEL,
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
    obligationId: OBL_CN_LABEL,
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
    obligationId: OBL_CN_GENAI,
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
    obligationId: OBL_CN_GENAI,
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
    obligationId: OBL_CN_DEEPSYN,
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
    obligationId: OBL_CN_DEEPSYN,
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
    obligationId: OBL_CN_ALGOREC,
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
    obligationId: OBL_CN_GBT,
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
    obligationId: OBL_EU_4971,
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
    obligationId: OBL_EU_4971,
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
    obligationId: 'AIGE-OBL-EUAIA-ART6',
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
    obligationId: 'AIGE-OBL-ISO42001-A4',
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
    obligationId: 'AIGE-OBL-NISTRMF-GOVERN',
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
    obligationId: OBL_CN_ALGOREC,
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
    obligationId: OBL_CN_DEEPSYN,
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
    obligationId: OBL_CN_GENAI,
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
    obligationId: OBL_CN_TC260_APP2,
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
    obligationId: OBL_CN_TC260,
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
    obligationId: 'AIGE-OBL-EUAIA-ART12',
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
    obligationId: OBL_EU_26,
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
    obligationId: OBL_A6,
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
    obligationId: 'AIGE-OBL-NISTRMF-MANAGE',
    verified: true,
  },
  {
    topic: 'logging-traceability',
    framework: 'nist-ai-rmf',
    ref: 'MEASURE 3',
    title: 'MEASURE 3: Mechanisms for tracking identified AI risks over time are in place',
    url: NIST_URL,
    strength: 'related',
    obligationId: 'AIGE-OBL-NISTRMF-MEASURE',
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
    obligationId: OBL_CN_TC260_APP2,
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
    obligationId: OBL_CN_TC260,
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
    obligationId: OBL_CN_LABEL,
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
    obligationId: 'AIGE-OBL-EUAIA-ART14',
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
    obligationId: OBL_EU_26,
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
    obligationId: 'AIGE-OBL-ISO42001-A9',
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
    obligationId: 'AIGE-OBL-NISTRMF-MANAGE',
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
    obligationId: 'AIGE-OBL-NISTRMF-GOVERN',
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
    obligationId: OBL_CN_TC260_APP2,
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
    obligationId: OBL_CN_ALGOREC,
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
    obligationId: OBL_CN_GENAI,
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
    obligationId: 'AIGE-OBL-EUAIA-ART5',
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
    obligationId: 'AIGE-OBL-EUAIA-ART15',
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
    obligationId: 'AIGE-OBL-ISO42001-A9',
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
    obligationId: OBL_A6,
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
    obligationId: 'AIGE-OBL-NISTRMF-MANAGE',
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
    obligationId: OBL_CN_TC260_APP2,
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
    obligationId: OBL_CN_TC260,
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
    obligationId: OBL_CN_GENAI,
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
    obligationId: OBL_CN_GENAI,
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
    obligationId: OBL_CN_DEEPSYN,
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
    obligationId: OBL_CN_ALGOREC,
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
    obligationId: OBL_CN_ALGOREC,
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
    obligationId: 'AIGE-OBL-EUAIA-ART15',
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
    obligationId: OBL_EU_55,
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
    obligationId: 'AIGE-OBL-EUAIA-ART60',
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
    obligationId: OBL_A6,
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
    obligationId: 'AIGE-OBL-NISTRMF-MEASURE',
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
    obligationId: OBL_CN_TC260,
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
    obligationId: OBL_CN_TC260_APP2,
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
    obligationId: OBL_CN_TC260,
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
    obligationId: OBL_CN_DEEPSYN,
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
    obligationId: OBL_CN_DEEPSYN,
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
    obligationId: OBL_CN_GENAI,
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
    obligationId: OBL_CN_GBT,
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
    obligationId: 'AIGE-OBL-EUAIA-ART72',
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
    obligationId: 'AIGE-OBL-EUAIA-ART73',
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
    obligationId: OBL_EU_55,
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
    obligationId: 'AIGE-OBL-ISO42001-A8',
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
    obligationId: 'AIGE-OBL-NISTRMF-MANAGE',
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
    obligationId: OBL_CN_TC260,
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
    obligationId: OBL_CN_TC260,
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
    obligationId: OBL_CN_TC260_APP2,
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
    obligationId: OBL_CN_GENAI,
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
    obligationId: OBL_CN_GENAI,
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
    obligationId: OBL_CN_ALGOREC,
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
    obligationId: 'AIGE-OBL-EUAIA-ART25',
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
    obligationId: OBL_EU_26,
    verified: true,
  },
  {
    topic: 'supply-chain',
    framework: 'iso-42001',
    ref: 'A.10',
    title: 'Third-party and customer relationships',
    url: ISO_URL,
    strength: 'core',
    obligationId: 'AIGE-OBL-ISO42001-A10',
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
    obligationId: 'AIGE-OBL-NISTRMF-GOVERN',
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
    obligationId: 'AIGE-OBL-NISTRMF-MAP',
    verified: true,
  },
  {
    topic: 'supply-chain',
    framework: 'nist-ai-rmf',
    ref: 'MANAGE 3',
    title: 'MANAGE 3: AI risks and benefits from third-party entities are managed',
    url: NIST_URL,
    strength: 'core',
    obligationId: 'AIGE-OBL-NISTRMF-MANAGE',
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
    obligationId: OBL_CN_TC260_APP2,
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
    obligationId: OBL_CN_TC260,
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
    obligationId: OBL_CN_GENAI,
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
    obligationId: OBL_CN_DEEPSYN,
    verified: true,
  },
];

// ── v0.5.0 references ──────────────────────────────────────────────────────
// Every `crosswalk` entry from the chapter 11–22 and harms-atlas handoffs, the
// thirteen new topics, and the new columns for the v0.4 topics. Checked on
// 2026-09-24: EU AI Act article titles against the Commission's AI Act Service
// Desk (EUR-Lex itself refused automated access; links keep the consolidated
// EUR-Lex text), the GPAI Code chapters, the CSA AICM v1.1.1 machine-readable
// bundle, the OWASP LLM 2026 and Agentic 2026 PDFs, legislation.gov.uk, the ATRS
// v4.0 template, both Singapore frameworks, NIST AI 100-1 and the CAC texts.
// Korea, the GDPR, the Council of Europe, the OECD and the G7 carry the primary
// check of chapters 19, 21 and 22 (same day). ISO/IEC clause ids that are new
// here could not be opened and stay unverified.

type RefExtra = Partial<Pick<CrosswalkRef, 'note' | 'obligationId' | 'verified' | 'see'>>;

/** One v0.5.0 reference; verified unless `extra` says otherwise. */
function mk(
  topic: string,
  framework: string,
  ref: string,
  title: string,
  strength: RefStrength,
  url: string,
  extra: RefExtra = {},
): CrosswalkRef {
  return { topic, framework, ref, title, url, strength, verified: true, ...extra };
}

// Notes for the references that could not be checked against their source.
const ISO_UNVERIFIED =
  "Clause id and title as listed in the AI RMF to ISO/IEC FDIS 42001 crosswalk (contributed by Microsoft to NIST's AI Resource Center) and in CSA's AICM v1.1.1 mapping; the published ISO text was not opened.";
const ISO23894_UNVERIFIED =
  "Clause as listed in the INCITS/AI revised crosswalk between ISO/IEC 23894 and the AI RMF (2025-08-14, on NIST's AI Resource Center); the ISO text was not opened.";
const ISO42005_UNVERIFIED =
  "Clause as listed in the INCITS/AI crosswalk against the DIS of ISO/IEC 42005 (2025-08-14, on NIST's AI Resource Center); numbering not checked against the published 2025 text.";
const GDPR_SECONDARY =
  'Read on a secondary reproduction of the GDPR; EUR-Lex refused automated access on 2026-09-24 and chapter 19 does not cite this article (verify).';
const PREN_UNVERIFIED =
  'Draft European standard; stage as reported by Genorma on 2026-09-24 (secondary); the draft text is not public.';

// Obligation-row ids (frameworks.ts).
const OBL_EU_4 = 'AIGE-OBL-EUAIA-ART4';
const OBL_EU_4A = 'AIGE-OBL-EUAIA-ART4A';
const OBL_EU_5 = 'AIGE-OBL-EUAIA-ART5';
const OBL_EU_10 = 'AIGE-OBL-EUAIA-ART10';
const OBL_EU_13 = 'AIGE-OBL-EUAIA-ART13';
const OBL_EU_14 = 'AIGE-OBL-EUAIA-ART14';
const OBL_EU_15 = 'AIGE-OBL-EUAIA-ART15';
const OBL_EU_25 = 'AIGE-OBL-EUAIA-ART25';
const OBL_EU_43 = 'AIGE-OBL-EUAIA-ART43';
const OBL_EU_47 = 'AIGE-OBL-EUAIA-ART47';
const OBL_EU_50 = 'AIGE-OBL-EUAIA-ART50';
const OBL_EU_53 = 'AIGE-OBL-EUAIA-ART53';
const OBL_EU_60 = 'AIGE-OBL-EUAIA-ART60';
const OBL_GPAI_T = 'AIGE-OBL-GPAICOP-TRANSPARENCY';
const OBL_GPAI_C = 'AIGE-OBL-GPAICOP-COPYRIGHT';
const OBL_GPAI_S = 'AIGE-OBL-GPAICOP-SAFETY';
const OBL_ISO42006 = 'AIGE-OBL-ISO42006-CB';
const OBL_ISO23894 = 'AIGE-OBL-ISO23894-RISK';
const OBL_CSA = 'AIGE-OBL-CSA-AICM';
const OBL_LLM = 'AIGE-OBL-OWASP-LLM';
const OBL_ASI = 'AIGE-OBL-OWASP-AGENTIC';
const OBL_KR = 'AIGE-OBL-KR-AIBASIC';
const OBL_SG = 'AIGE-OBL-SG-GENAI';
const OBL_UK = 'AIGE-OBL-UK-ADM';

// Per-instrument shorthands. Each fills the framework id, the canonical URL
// and, where one exists, the obligation-row join.
const eu = (t: string, ref: string, title: string, s: RefStrength, art: string, x: RefExtra = {}) =>
  mk(t, 'eu-ai-act', ref, title, s, aia(art), x);
const gd = (t: string, ref: string, title: string, s: RefStrength, art: string, x: RefExtra = {}) =>
  mk(t, 'gdpr', ref, title, s, gdpr(art), x);
const gpT = (t: string, ref: string, title: string, s: RefStrength, x: RefExtra = {}) =>
  mk(t, 'gpai-code-of-practice', ref, title, s, GPAI_T_URL, { obligationId: OBL_GPAI_T, ...x });
const gpC = (t: string, ref: string, title: string, s: RefStrength, x: RefExtra = {}) =>
  mk(t, 'gpai-code-of-practice', ref, title, s, GPAI_C_URL, { obligationId: OBL_GPAI_C, ...x });
const gpS = (t: string, ref: string, title: string, s: RefStrength, x: RefExtra = {}) =>
  mk(t, 'gpai-code-of-practice', ref, title, s, GPAI_S_URL, { obligationId: OBL_GPAI_S, ...x });
/** ISO/IEC 42001 clause already checked in v0.4 (same id, same title). */
const iso = (t: string, ref: string, title: string, s: RefStrength, x: RefExtra = {}) =>
  mk(t, 'iso-42001', ref, title, s, ISO_URL, x);
/** ISO/IEC 42001 clause new in v0.5.0: unverified. */
const isoU = (t: string, ref: string, title: string, s: RefStrength, x: RefExtra = {}) =>
  mk(t, 'iso-42001', ref, title, s, ISO_URL, { verified: false, note: ISO_UNVERIFIED, ...x });
const i23894 = (t: string, ref: string, title: string, s: RefStrength) =>
  mk(t, 'iso-23894', ref, title, s, ISO23894_URL, {
    verified: false,
    note: ISO23894_UNVERIFIED,
    obligationId: OBL_ISO23894,
  });
const i42005 = (t: string, ref: string, title: string, s: RefStrength) =>
  mk(t, 'iso-42005', ref, title, s, ISO42005_URL, { verified: false, note: ISO42005_UNVERIFIED });
/** NIST AI RMF subcategory or category, titled with NIST's own statement. */
const nist = (t: string, id: string, statement: string, s: RefStrength, x: RefExtra = {}) =>
  mk(t, 'nist-ai-rmf', id, `${id}: ${statement}`, s, NIST_URL, {
    // 'MAP 1.1' joins the NIST AI RMF MAP row, and so on for each function.
    obligationId: `AIGE-OBL-NISTRMF-${id.split(' ')[0]}`,
    ...x,
  });
const csa = (t: string, id: string, title: string, s: RefStrength, x: RefExtra = {}) =>
  mk(t, 'csa-aicm', id, title, s, CSA_URL, { obligationId: OBL_CSA, ...x });
const llm = (t: string, id: string, title: string, s: RefStrength, x: RefExtra = {}) =>
  mk(t, 'owasp-llm-top-10', id, title, s, LLM_URL, { obligationId: OBL_LLM, ...x });
const asi = (t: string, id: string, title: string, s: RefStrength, x: RefExtra = {}) =>
  mk(t, 'owasp-agentic-top-10', id, title, s, ASI_URL, { obligationId: OBL_ASI, ...x });
const kr = (t: string, ref: string, title: string, s: RefStrength, x: RefExtra = {}) =>
  mk(t, 'kr-ai-basic-act', ref, title, s, KR_URL, { obligationId: OBL_KR, ...x });
const ukd = (t: string, ref: string, title: string, s: RefStrength, x: RefExtra = {}) =>
  mk(t, 'uk-duaa', ref, title, s, DUAA_URL, { obligationId: OBL_UK, ...x });
const atrs = (t: string, ref: string, title: string, s: RefStrength, x: RefExtra = {}) =>
  mk(t, 'uk-atrs', ref, title, s, ATRS_URL, x);
const sgG = (t: string, ref: string, title: string, s: RefStrength, x: RefExtra = {}) =>
  mk(t, 'sg-genai-framework', ref, title, s, SG_GENAI_URL, { obligationId: OBL_SG, ...x });
const sgA = (t: string, ref: string, title: string, s: RefStrength, x: RefExtra = {}) =>
  mk(t, 'sg-agentic-framework', ref, title, s, SG_AGENTIC_URL, x);
const coe = (t: string, ref: string, title: string, s: RefStrength, x: RefExtra = {}) =>
  mk(t, 'coe-cets-225', ref, title, s, COE_URL, x);
const oecd = (t: string, ref: string, title: string, s: RefStrength, x: RefExtra = {}) =>
  mk(t, 'oecd-ai-principles', ref, title, s, OECD_URL, x);
const g7 = (t: string, ref: string, title: string, s: RefStrength, x: RefExtra = {}) =>
  mk(t, 'g7-hiroshima-coc', ref, title, s, G7_URL, x);

// Titles reused across topics.
const T_ART_86 = 'Right to explanation of individual decision-making';
const T_ART_26 = 'Obligations of deployers of high-risk AI systems';
const T_ART_53 = 'Obligations for providers of general-purpose AI models';
const T_ART_55 = 'Obligations of providers of general-purpose AI models with systemic risk';
const N_GOVERN_17 =
  "Processes and procedures are in place for decommissioning and phasing out AI systems safely and in a manner that does not increase risks or decrease the organization's trustworthiness";
const N_MANAGE_24 =
  'Mechanisms are in place and applied, and responsibilities are assigned and understood, to supersede, disengage, or deactivate AI systems that demonstrate performance or outcomes inconsistent with intended use';
const N_MANAGE_43 =
  'Incidents and errors are communicated to relevant AI actors, including affected communities. Processes for tracking, responding to, and recovering from incidents and errors are followed and documented';
const N_MEASURE_29 =
  'The AI model is explained, validated, and documented, and AI system output is interpreted within its context as identified in the MAP function to inform responsible use and governance';
const N_MEASURE_211 =
  'Fairness and bias as identified in the MAP function are evaluated and results are documented';
const N_GOVERN_61 =
  "Policies and procedures are in place that address AI risks associated with third-party entities, including risks of infringement of a third-party's intellectual property or other rights";
const K_ART_32 = 'Safety duties for AI above the compute threshold';
const K_ART_31 = 'Transparency: prior notice, output labelling, realistic synthetic content';
const K_ART_34_2 = 'Explanation plan: result, main criteria, training-data overview';
const G_ACTION_11 =
  'Implement data input measures and protect personal data and intellectual property';
const G_ACTION_1 = 'Identify, evaluate and mitigate risks across the lifecycle, including testing';

const refsV05: readonly CrosswalkRef[] = [
  // ── Risk management ──────────────────────────────────────────────────────
  eu('risk-management', 'Art. 3', 'Definitions', 'related', '3', {
    note: 'Points (12) intended purpose, (13) reasonably foreseeable misuse and (23) substantial modification set the scope of the risk file.',
  }),
  iso('risk-management', '6.1.4', 'AI system impact assessment', 'related', {
    see: '/bok/risk-management#iso-31000-isoiec-23894-and-isoiec-42001',
  }),
  i23894('risk-management', '6.4', 'Risk assessment', 'core'),
  i23894('risk-management', '6.5', 'Risk treatment', 'core'),
  i23894('risk-management', '6.6', 'Monitoring and review', 'related'),
  nist(
    'risk-management',
    'GOVERN 1.3',
    "Processes, procedures, and practices are in place to determine the needed level of risk management activities based on the organization's risk tolerance",
    'core',
    { see: '/bok/risk-management#proportionate-governance-tailoring-the-loop' },
  ),
  nist('risk-management', 'MAP 1.5', 'Organizational risk tolerances are determined and documented', 'core', {
    see: '/bok/risk-management#risk-appetite-and-tolerance-compiled-into-gates',
  }),
  nist(
    'risk-management',
    'MANAGE 1.3',
    'Responses to the AI risks deemed high priority, as identified by the MAP function, are developed, planned, and documented',
    'core',
    { see: '/bok/risk-management#treating-risk-the-mitigation-hierarchy' },
  ),
  nist(
    'risk-management',
    'MANAGE 1.4',
    'Negative residual risks to both downstream acquirers of AI systems and end users are documented',
    'core',
    { see: '/bok/risk-management#inherent-risk-residual-risk-and-who-accepts-it' },
  ),
  nist('risk-management', 'MEASURE 3', 'Mechanisms for tracking identified AI risks over time are in place', 'core', {
    see: '/bok/risk-management#operating-the-register',
  }),
  gpS('risk-management', 'Safety C1', 'Commitment 1: Safety and Security Framework', 'related'),
  gpS('risk-management', 'Safety C3', 'Commitment 3: Systemic risk analysis', 'related'),
  csa('risk-management', 'GRC-02', 'Risk Management Program', 'core'),
  csa('risk-management', 'MDS-12', 'Open Model Risk Assessment', 'related'),
  kr('risk-management', 'Art. 34(1)(1)', 'Risk management plan for high-impact AI', 'core'),
  atrs('risk-management', '2.5.2', 'Risks and mitigations', 'core'),
  sgA('risk-management', '2.1', 'Assess and bound the risks upfront', 'core'),
  coe('risk-management', 'Art. 16', 'Risk and impact management framework', 'core'),
  oecd('risk-management', '1.5(c)', 'Systematic risk management at each lifecycle phase', 'related'),
  mk('risk-management', 'pren-18228', 'prEN 18228', 'AI risk management (draft; supports Art. 9)', 'core', PREN18228_URL, {
    verified: false,
    note: PREN_UNVERIFIED,
  }),

  // ── Governance and accountability ────────────────────────────────────────
  eu('governance-accountability', 'Art. 87', 'Reporting of infringements and protection of reporting persons', 'related', '87'),
  gd('governance-accountability', 'Art. 5(2)', 'Accountability', 'core', '5', {
    note: 'The controller must demonstrate compliance, including any claim that a model is anonymous.',
  }),
  isoU('governance-accountability', '7.2', 'Competence', 'related'),
  isoU('governance-accountability', '9.2', 'Internal audit', 'related'),
  isoU('governance-accountability', '9.3', 'Management review', 'core'),
  isoU('governance-accountability', '10.1', 'Continual improvement', 'related'),
  nist(
    'governance-accountability',
    'GOVERN 4',
    'Organizational teams are committed to a culture that considers and communicates AI risk',
    'related',
  ),
  nist('governance-accountability', 'GOVERN 5', 'Processes are in place for robust engagement with relevant AI actors', 'related'),
  gpS('governance-accountability', 'Safety C8', 'Commitment 8: Systemic risk responsibility allocation', 'related'),
  csa('governance-accountability', 'GRC-01', 'Governance Program Policy and Procedures', 'core'),
  csa('governance-accountability', 'GRC-06', 'Governance Responsibility Model', 'core'),
  kr('governance-accountability', 'Art. 36', 'Domestic representative', 'related'),
  atrs('governance-accountability', '2.1', 'Owner and responsibility', 'core'),
  sgG('governance-accountability', '1', 'Accountability', 'core'),
  sgA('governance-accountability', '2.2.1', 'Clear allocation of responsibilities within and outside the organisation', 'core'),
  coe('governance-accountability', 'Art. 9', 'Accountability and responsibility', 'related'),
  oecd('governance-accountability', '1.5', 'Accountability', 'core'),
  g7('governance-accountability', 'Action 5', 'Develop, implement and disclose AI governance and risk-management policies', 'related'),
  mk('governance-accountability', 'en-18286', 'EN 18286', 'Quality management system for EU AI Act regulatory purposes', 'related', EN18286_URL, {
    note: 'Published July 2026; supports Art. 17. No Official Journal citation, so no presumption of conformity, as of 2026-09-24.',
  }),

  // ── Impact assessment ────────────────────────────────────────────────────
  gd('impact-assessment', 'Art. 35', 'Data protection impact assessment', 'core', '35', {
    note: 'The DPIA is the privacy twin of the FRIA; an AI DPIA adds training sources, memorisation and inference risks.',
  }),
  gd('impact-assessment', 'Art. 36', 'Prior consultation', 'related', '36'),
  i42005('impact-assessment', '5.8', 'Performing the AI system impact assessment', 'core'),
  i42005('impact-assessment', '6.8', 'Actual and reasonably foreseeable impacts', 'core'),
  i42005('impact-assessment', '5.12', 'Monitoring and review', 'related'),
  csa('impact-assessment', 'GRC-10', 'AI Impact Assessment', 'core'),
  csa('impact-assessment', 'DSP-09', 'Data Protection Impact Assessment', 'related'),
  kr('impact-assessment', 'Art. 35', 'Impact assessment (best-effort duty)', 'core', {
    note: 'Operators shall endeavour to assess the effect of high-impact AI on fundamental rights.',
  }),
  atrs('impact-assessment', '2.5.1', 'Impact assessments', 'core'),
  coe('impact-assessment', 'Art. 16', 'Risk and impact management framework', 'related'),

  // ── Data governance ──────────────────────────────────────────────────────
  eu('data-governance', 'Art. 10(2)(f)–(g)', 'Examination for possible biases; measures to detect, prevent and mitigate them', 'core', '10', {
    obligationId: OBL_EU_10,
  }),
  eu('data-governance', 'Art. 53', T_ART_53, 'related', '53', {
    note: 'Art. 53(1)(d): public summary of the content used for training, on the AI Office template.',
  }),
  eu('data-governance', 'Art. 53(1)(c)', 'Copyright policy, including rights reservations', 'related', '53'),
  eu('data-governance', 'Art. 5(1)(e)', 'Prohibited: untargeted scraping of facial images', 'related', '5', {
    note: 'Facial-recognition databases built by untargeted scraping of the internet or CCTV are banned; a sourcing rule for data pipelines.',
  }),
  gpC('data-governance', 'Copyright 1.1–1.5', 'Commitment 1: Copyright policy (Measures 1.1 to 1.5)', 'related'),
  gd('data-governance', 'Art. 5(1)(c)', 'Data minimisation', 'core', '5', {
    note: 'Minimisation argued feature by feature for training, retrieval, logs and eval sets.',
  }),
  gd('data-governance', 'Art. 25', 'Data protection by design and by default', 'core', '25'),
  gd('data-governance', 'Art. 9', 'Processing of special categories of personal data', 'related', '9', {
    note: 'Sits beside AI Act Art. 4a on bias-detection processing; inferred sensitive data counts.',
  }),
  isoU('data-governance', 'A.7.3', 'Acquisition of data', 'core', {
    obligationId: 'AIGE-OBL-ISO42001-A7',
  }),
  csa('data-governance', 'DSP-20', 'Data Provenance and Transparency', 'core'),
  csa('data-governance', 'DSP-21', 'Data Poisoning Prevention & Detection', 'related'),
  llm('data-governance', 'LLM05:2026', 'Data and Model Poisoning', 'related'),
  atrs('data-governance', '2.4.3', 'Development data specification', 'core'),
  sgG('data-governance', '2', 'Data', 'core'),

  // ── Documentation and transparency ───────────────────────────────────────
  eu('documentation-transparency', 'Art. 86', T_ART_86, 'related', '86', {
    note: 'Transparency that reaches the affected person: reason codes and an appeal route.',
  }),
  eu('documentation-transparency', 'Art. 18', 'Documentation keeping', 'related', '18'),
  eu('documentation-transparency', 'Art. 43', 'Conformity assessment', 'related', '43'),
  eu('documentation-transparency', 'Art. 53(1)(d)', 'Public summary of the content used for training', 'related', '53'),
  eu('documentation-transparency', 'Art. 50(2), 50(4)', 'Machine-readable marking of synthetic content; disclosure of deep fakes', 'related', '50', {
    obligationId: OBL_EU_50,
  }),
  gpT('documentation-transparency', 'Transparency 1.1', 'Drawing up and keeping up-to-date model documentation', 'core'),
  gpT('documentation-transparency', 'Transparency 1.2', 'Providing relevant information', 'related'),
  gd('documentation-transparency', 'Arts. 13–14', 'Information to be provided to the data subject', 'core', '13', {
    note: 'Notice versioned with the model card; Art. 14 covers scraped or licensed training data.',
  }),
  gd('documentation-transparency', 'Art. 30', 'Records of processing activities', 'related', '30'),
  nist(
    'documentation-transparency',
    'MAP 1.6',
    'System requirements are elicited from and understood by relevant AI actors. Design decisions take socio-technical implications into account to address AI risks',
    'related',
  ),
  nist('documentation-transparency', 'MEASURE 2.9', N_MEASURE_29, 'related'),
  csa('documentation-transparency', 'MDS-03', 'Model Documentation', 'core'),
  csa('documentation-transparency', 'MDS-04', 'Model Documentation Requirements', 'related'),
  kr('documentation-transparency', 'Art. 31', K_ART_31, 'core'),
  kr('documentation-transparency', 'Art. 34(1)(2)', K_ART_34_2, 'related'),
  atrs('documentation-transparency', 'Tier 1', 'Summary information', 'core'),
  atrs('documentation-transparency', '2.2', 'Description and rationale', 'related'),
  sgG('documentation-transparency', '3', 'Trusted Development and Deployment', 'core'),
  coe('documentation-transparency', 'Art. 14(2)', 'Documentation sufficient to contest decisions; complaint to authorities', 'core'),
  coe('documentation-transparency', 'Art. 15(2)', 'Notification of interaction with an AI system', 'related'),
  oecd('documentation-transparency', '1.3', 'Transparency and explainability', 'core'),
  g7('documentation-transparency', 'Action 3', 'Publicly report capabilities, limitations and domains of use', 'core'),

  // ── Inventory and registration ───────────────────────────────────────────
  eu('inventory-registration', 'Art. 3(1)', 'Definition of an AI system', 'related', '3', {
    note: 'The definition decides which systems enter the inventory at all; the Commission guidelines list the excluded families.',
  }),
  eu('inventory-registration', 'Art. 52', 'Procedure', 'related', '52', {
    note: 'Notification of GPAI models that meet the systemic-risk condition.',
  }),
  nist('inventory-registration', 'GOVERN 1.7', N_GOVERN_17, 'related'),
  csa('inventory-registration', 'STA-08', 'Supply Chain Inventory', 'related'),
  csa('inventory-registration', 'IAM-03', 'Identity Inventory', 'related'),
  kr('inventory-registration', 'Art. 33', 'Confirmation of high-impact AI', 'related'),
  atrs('inventory-registration', 'Tier 1', 'Summary information (the published record)', 'core'),

  // ── Logging and traceability ─────────────────────────────────────────────
  eu('logging-traceability', 'Art. 26(6)', 'Deployers keep the automatically generated logs', 'core', '26', {
    obligationId: OBL_EU_26,
  }),
  eu('logging-traceability', 'Art. 19', 'Automatically generated logs', 'related', '19'),
  isoU('logging-traceability', 'A.6.2.8', 'AI system recording of event logs', 'core', {
    obligationId: OBL_A6,
  }),
  csa('logging-traceability', 'LOG-09', 'Log Records', 'core'),
  csa('logging-traceability', 'LOG-12', 'Transaction/Activity Logging', 'related'),
  kr('logging-traceability', 'Art. 34(1)(5)', 'Documents showing the measures taken', 'core', {
    note: 'The enforcement decree keeps the evidence for five years.',
  }),
  sgA('logging-traceability', '2.3.3', 'When deploying, continuously monitor and test', 'related'),
  oecd('logging-traceability', '1.5(b)', 'Traceability of datasets, processes and decisions', 'core'),
  mk('logging-traceability', 'pren-18229-1', 'prEN 18229-1', 'AI trustworthiness framework, Part 1: logging (draft; supports Art. 12)', 'core', JTC21_URL, {
    verified: false,
    note: PREN_UNVERIFIED,
  }),

  // ── Human oversight ──────────────────────────────────────────────────────
  eu('human-oversight', 'Art. 14(4)(b)', 'Awareness of automation bias', 'related', '14', {
    obligationId: OBL_EU_14,
    note: 'Gate logs approver, time to decide and override rate so degrading oversight is visible.',
  }),
  gd('human-oversight', 'Art. 22', 'Automated individual decision-making, including profiling', 'core', '22', {
    note: 'Human intervention and contest for solely automated significant decisions.',
  }),
  nist('human-oversight', 'MAP 3.5', 'Processes for human oversight are defined, assessed, and documented in accordance with organizational policies from the GOVERN function', 'core'),
  csa('human-oversight', 'GRC-15', 'Human supervision', 'core'),
  asi('human-oversight', 'ASI09', 'Human-Agent Trust Exploitation', 'related'),
  kr('human-oversight', 'Art. 34(1)(4)', 'Human management and supervision', 'core'),
  ukd('human-oversight', 'Art. 22C', 'Safeguards for automated decision-making', 'core', {
    note: 'Inserted into the UK GDPR by DUAA s. 80: information, representations, human intervention and contest.',
  }),
  atrs('human-oversight', '2.3.2', 'Human review', 'core'),
  sgA('human-oversight', '2.2.2', 'Design for meaningful human oversight', 'core'),
  coe('human-oversight', 'Art. 8', 'Transparency and oversight', 'related'),
  oecd('human-oversight', '1.2(b)', 'Human agency and oversight safeguards', 'related'),

  // ── Runtime guardrails ───────────────────────────────────────────────────
  eu('runtime-guardrails', 'Art. 5(1)(a)–(b)', 'Manipulative techniques; exploitation of vulnerabilities', 'related', '5', {
    obligationId: OBL_EU_5,
  }),
  gpS('runtime-guardrails', 'Safety C5', 'Commitment 5: Safety mitigations', 'related'),
  csa('runtime-guardrails', 'TVM-13', 'Guardrails', 'core'),
  csa('runtime-guardrails', 'AIS-09', 'Input Validation', 'core'),
  csa('runtime-guardrails', 'AIS-10', 'Output Validation', 'core'),
  llm('runtime-guardrails', 'LLM01:2026', 'Prompt Injection', 'core'),
  llm('runtime-guardrails', 'LLM10:2026', 'Improper Output Handling', 'core'),
  llm('runtime-guardrails', 'LLM06:2026', 'Unbounded Consumption', 'related'),
  sgA('runtime-guardrails', '2.3.1', 'During design and development, use technical controls', 'core'),

  // ── Robustness, security and evaluations ─────────────────────────────────
  eu('robustness-security-evals', 'Art. 15(3)', 'Declared accuracy levels and metrics', 'related', '15', {
    obligationId: OBL_EU_15,
    note: 'Declared metrics become the eval baseline; calibration is measured in the gate.',
  }),
  eu('robustness-security-evals', 'Art. 9', 'Risk management system', 'related', '9', {
    obligationId: OBL_EU_9,
    note: 'Art. 9(8): testing against prior defined metrics and probabilistic thresholds, before placing on the market.',
  }),
  eu('robustness-security-evals', 'Art. 42(3)', 'Presumption of conformity for cybersecurity (Cyber Resilience Act)', 'related', '42', {
    note: 'Added by the Digital Omnibus (Reg. (EU) 2026/1744): CRA conformity counts for the Art. 15 cybersecurity requirement.',
  }),
  gpS('robustness-security-evals', 'Safety 3.2', 'Measure 3.2: Model evaluations', 'core'),
  gpS('robustness-security-evals', 'Safety C6', 'Commitment 6: Security mitigations', 'related'),
  gd('robustness-security-evals', 'Art. 32', 'Security of processing', 'related', '32', {
    note: 'Privacy-attack evals (membership inference, extraction) as evidence of appropriate security.',
  }),
  nist('robustness-security-evals', 'MEASURE 2.7', 'AI system security and resilience as identified in the MAP function are evaluated and documented', 'core'),
  nist('robustness-security-evals', 'MEASURE 2.1', 'Test sets, metrics, and details about the tools used during TEVV are documented', 'related'),
  nist('robustness-security-evals', 'MEASURE 1', 'Appropriate methods and metrics are identified and applied', 'related'),
  csa('robustness-security-evals', 'MDS-06', 'Adversarial Attack Analysis', 'core'),
  csa('robustness-security-evals', 'MDS-07', 'Robustness against Adversarial Attack / Model Hardening', 'core'),
  csa('robustness-security-evals', 'AIS-05', 'Application Security Testing', 'related'),
  llm('robustness-security-evals', 'LLM01:2026', 'Prompt Injection', 'related'),
  asi('robustness-security-evals', 'ASI05', 'Unexpected Code Execution (RCE)', 'related'),
  kr('robustness-security-evals', 'Art. 32(1)', K_ART_32, 'related'),
  sgG('robustness-security-evals', '5', 'Testing and Assurance', 'core'),
  sgG('robustness-security-evals', '6', 'Security', 'core'),
  sgA('robustness-security-evals', '2.3.2', 'Before deploying, test agents', 'core'),
  coe('robustness-security-evals', 'Art. 16(2)(g)', 'Testing before first use and when significantly modified', 'core'),
  oecd('robustness-security-evals', '1.4', 'Robustness, security and safety', 'core'),
  g7('robustness-security-evals', 'Action 1', G_ACTION_1, 'core'),

  // ── Incident response and monitoring ─────────────────────────────────────
  eu('incident-monitoring', 'Art. 26(5)', 'Deployer monitoring, informing the provider and suspending use', 'core', '26', {
    obligationId: OBL_EU_26,
    see: '/bok/incidents#deployer-duties-inform-the-provider-suspend-use',
  }),
  eu('incident-monitoring', 'Art. 3(49)', 'Definition of serious incident', 'related', '3', {
    see: '/bok/incidents#incident-hazard-issue-and-serious-incident',
  }),
  eu('incident-monitoring', 'Art. 20', 'Corrective actions and duty of information', 'related', '20', {
    see: '/bok/incidents#capa-from-incident-to-risk-register-and-eval-suite',
  }),
  gpS('incident-monitoring', 'Safety C9', 'Commitment 9: Serious incident reporting', 'core'),
  gpS('incident-monitoring', 'Safety 3.5', 'Measure 3.5: Post-market monitoring', 'related'),
  gd('incident-monitoring', 'Arts. 33–34', 'Notification and communication of a personal data breach', 'core', '33', {
    note: 'A 72-hour clock beside AI Act Art. 73; AI adds regurgitation, inversion and prompt-injection breaches.',
  }),
  nist('incident-monitoring', 'MANAGE 4.3', N_MANAGE_43, 'core', {
    see: '/bok/incidents#capa-from-incident-to-risk-register-and-eval-suite',
  }),
  nist('incident-monitoring', 'MANAGE 2.4', N_MANAGE_24, 'related', {
    see: '/bok/incidents#the-response-lifecycle',
  }),
  nist('incident-monitoring', 'GOVERN 4.3', 'Organizational practices are in place to enable AI testing, identification of incidents, and information sharing', 'related'),
  csa('incident-monitoring', 'SEF-07', 'Incident Management and Response', 'core'),
  csa('incident-monitoring', 'SEF-08', 'Security Breach Notification', 'core'),
  kr('incident-monitoring', 'Art. 32(1)', K_ART_32, 'core', {
    note: 'Risk monitoring and a response system for AI above the compute threshold.',
  }),
  sgG('incident-monitoring', '4', 'Incident Reporting', 'core'),
  sgA('incident-monitoring', '2.3.3', 'When deploying, continuously monitor and test', 'core'),
  g7('incident-monitoring', 'Action 2', 'Identify and mitigate vulnerabilities, incidents and misuse after deployment', 'core'),
  g7('incident-monitoring', 'Action 4', 'Responsible information sharing and reporting of incidents', 'core'),

  // ── Supply chain and third parties ───────────────────────────────────────
  eu('supply-chain', 'Art. 25(4)', 'Written agreement with third-party suppliers', 'core', '25', {
    obligationId: OBL_EU_25,
  }),
  eu('supply-chain', 'Art. 22', 'Authorised representatives of providers of high-risk AI systems', 'related', '22'),
  eu('supply-chain', 'Art. 23', 'Obligations of importers', 'related', '23'),
  eu('supply-chain', 'Art. 24', 'Obligations of distributors', 'related', '24'),
  eu('supply-chain', 'Art. 54', 'Authorised representatives of providers of general-purpose AI models', 'related', '54'),
  gpT('supply-chain', 'Transparency 1.2', 'Providing relevant information', 'related', {
    note: 'Information for downstream providers that integrate the model into their AI systems.',
  }),
  gd('supply-chain', 'Art. 28', 'Processor', 'core', '28', {
    note: 'AI vendor contracts: no-training clauses, retention, region, sub-processors, change notice.',
  }),
  gd('supply-chain', 'Arts. 44–46', 'Transfers to third countries', 'related', '44', {
    note: 'Remote inference endpoints and vendor telemetry outside the EEA are transfers.',
  }),
  nist('supply-chain', 'MANAGE 3.1', 'AI risks and benefits from third-party resources are regularly monitored, and risk controls are applied and documented', 'core'),
  nist('supply-chain', 'GOVERN 6.2', 'Contingency processes are in place to handle failures or incidents in third-party data or AI systems deemed to be high-risk', 'related'),
  csa('supply-chain', 'STA-10', 'Supply Chain Risk Management', 'core'),
  csa('supply-chain', 'STA-09', 'Service Bill of Material (BOM)', 'core'),
  llm('supply-chain', 'LLM04:2026', 'Supply Chain', 'core'),
  asi('supply-chain', 'ASI04', 'Agentic Supply Chain Vulnerabilities', 'core'),
  atrs('supply-chain', '2.1.4', 'Third party involvement', 'related'),
  g7('supply-chain', 'Action 11', G_ACTION_11, 'related'),

  // ── Prohibited practices ─────────────────────────────────────────────────
  eu('prohibited-practices', 'Art. 5', 'Prohibited AI practices', 'core', '5', {
    obligationId: OBL_EU_5,
    note: 'The Digital Omnibus adds new prohibitions that apply from 2026-12-02.',
  }),
  isoU('prohibited-practices', 'A.9.4', 'Intended use of the AI system', 'related', {
    obligationId: 'AIGE-OBL-ISO42001-A9',
  }),
  nist('prohibited-practices', 'GOVERN 1.1', 'Legal and regulatory requirements involving AI are understood, managed, and documented', 'related'),
  csa('prohibited-practices', 'GRC-09', 'Acceptable Use of the AI Service', 'related'),
  csa('prohibited-practices', 'HRS-15', 'AI Acceptable Use', 'related'),
  sgA('prohibited-practices', '2.1.1', 'Determine suitable use cases for agent deployment', 'related'),
  coe('prohibited-practices', 'Art. 16(4)', 'Assess the need for a moratorium, ban or other measures for incompatible uses', 'core'),
  mk('prohibited-practices', 'cn-genai-measures', 'Art. 4', 'Prohibited content and baseline duties', 'related', GENAI_URL, {
    obligationId: OBL_CN_GENAI,
    note: 'Point (1) lists content that must not be generated; points (2) to (5) set non-discrimination, IP, rights and transparency duties; CAC text.',
  }),

  // ── Fairness and non-discrimination ──────────────────────────────────────
  eu('fairness-non-discrimination', 'Art. 10(2)(f)–(g)', 'Examination for possible biases; measures to detect, prevent and mitigate them', 'core', '10', {
    obligationId: OBL_EU_10,
  }),
  eu('fairness-non-discrimination', 'Art. 4a', 'Special-category data for bias detection', 'core', '4a', {
    obligationId: OBL_EU_4A,
    note: 'Added by the Digital Omnibus; strictly necessary, pseudonymised, access-controlled and deleted after correction.',
  }),
  gd('fairness-non-discrimination', 'Art. 5(1)(a)', 'Lawfulness, fairness and transparency', 'core', '5'),
  gd('fairness-non-discrimination', 'Art. 9', 'Processing of special categories of personal data', 'related', '9'),
  isoU('fairness-non-discrimination', 'A.5.4', 'Assessing AI system impact on individuals or groups of individuals', 'related', {
    obligationId: 'AIGE-OBL-ISO42001-A5',
  }),
  nist('fairness-non-discrimination', 'MEASURE 2.11', N_MEASURE_211, 'core', {
    see: '/bok/fairness-and-explainability',
  }),
  nist(
    'fairness-non-discrimination',
    'GOVERN 3.1',
    'Decision-making related to mapping, measuring, and managing AI risks throughout the lifecycle is informed by a diverse team',
    'related',
  ),
  csa('fairness-non-discrimination', 'GRC-11', 'Bias and Fairness Assessment', 'core'),
  atrs('fairness-non-discrimination', '2.4.2', 'Model specification', 'related', {
    note: 'Model performance and the bias checks behind it are recorded here.',
  }),
  coe('fairness-non-discrimination', 'Art. 10', 'Equality and non-discrimination', 'core'),
  oecd('fairness-non-discrimination', '1.2', 'Rule of law, human rights and democratic values, including fairness and privacy', 'related'),
  mk('fairness-non-discrimination', 'cn-genai-measures', 'Art. 4(2)', 'Prevent discrimination in design, data, training and service', 'core', GENAI_URL, {
    obligationId: OBL_CN_GENAI,
    note: 'Ethnicity, belief, country, region, sex, age, occupation and health; CAC text.',
  }),
  mk('fairness-non-discrimination', 'cn-algo-recommendation', 'Art. 21', 'No unreasonable differential treatment in trading conditions', 'related', ALGOREC_URL, {
    obligationId: OBL_CN_ALGOREC,
    note: 'Bars algorithmic price discrimination based on consumer preferences and habits; CAC text.',
  }),

  // ── Privacy and data protection ──────────────────────────────────────────
  eu('privacy-data-protection', 'Art. 59', 'Further processing of personal data in the AI regulatory sandbox', 'related', '59'),
  eu('privacy-data-protection', 'Art. 4a', 'Special-category data for bias detection', 'related', '4a', {
    obligationId: OBL_EU_4A,
  }),
  gd('privacy-data-protection', 'Art. 5', 'Principles relating to processing of personal data', 'core', '5'),
  gd('privacy-data-protection', 'Art. 6', 'Lawfulness of processing', 'core', '6'),
  gd('privacy-data-protection', 'Art. 25', 'Data protection by design and by default', 'core', '25'),
  gd('privacy-data-protection', 'Art. 35', 'Data protection impact assessment', 'related', '35'),
  iso('privacy-data-protection', 'A.7', 'Data for AI systems', 'related', {
    obligationId: 'AIGE-OBL-ISO42001-A7',
  }),
  nist('privacy-data-protection', 'MEASURE 2.10', 'Privacy risk of the AI system as identified in the MAP function is examined and documented', 'core'),
  csa('privacy-data-protection', 'DSP-08', 'Data Privacy by Design and Default', 'core'),
  csa('privacy-data-protection', 'DSP-22', 'Privacy Enhancing Technologies', 'related'),
  llm('privacy-data-protection', 'LLM02:2026', 'Sensitive Information Disclosure', 'core'),
  ukd('privacy-data-protection', 'Art. 22B', 'Restrictions on automated decision-making', 'related', {
    note: 'Tighter rules where a significant decision rests on special-category data; UK GDPR as amended by DUAA s. 80.',
  }),
  sgG('privacy-data-protection', '2', 'Data', 'related', {
    note: 'Trusted use of personal data in training and deployment.',
  }),
  coe('privacy-data-protection', 'Art. 11', 'Privacy and personal data protection', 'core'),
  oecd('privacy-data-protection', '1.2', 'Rule of law, human rights and democratic values, including fairness and privacy', 'related'),
  g7('privacy-data-protection', 'Action 11', G_ACTION_11, 'related'),
  mk('privacy-data-protection', 'cn-genai-measures', 'Art. 7(3)', 'Consent or another lawful basis for personal information in training data', 'core', GENAI_URL, {
    obligationId: OBL_CN_GENAI,
    note: 'CAC text.',
  }),
  mk('privacy-data-protection', 'cn-genai-measures', 'Art. 11', 'Protection of user input and records', 'core', GENAI_URL, {
    obligationId: OBL_CN_GENAI,
    note: 'No unnecessary collection; access, correction and deletion requests handled; CAC text.',
  }),

  // ── Explainability and right to explanation ──────────────────────────────
  eu('explainability', 'Art. 86', T_ART_86, 'core', '86'),
  eu('explainability', 'Art. 13(3)(b)(iv)–(v)', 'Information relevant to explain output; performance for specific persons or groups', 'core', '13', {
    obligationId: OBL_EU_13,
  }),
  gd('explainability', 'Art. 15(1)(h)', 'Meaningful information about the logic involved', 'core', '15'),
  gd('explainability', 'Art. 13(2)(f)', 'Existence of automated decision-making', 'related', '13'),
  gd('explainability', 'Art. 22(3)', 'Right to obtain human intervention and to contest the decision', 'related', '22'),
  isoU('explainability', 'A.8.2', 'System documentation and information for users', 'related', {
    obligationId: 'AIGE-OBL-ISO42001-A8',
  }),
  nist('explainability', 'MEASURE 2.9', N_MEASURE_29, 'core'),
  nist('explainability', 'MEASURE 2.8', 'Risks associated with transparency and accountability as identified in the MAP function are examined and documented', 'related'),
  csa('explainability', 'GRC-13', 'Explainability Requirement', 'core'),
  csa('explainability', 'GRC-14', 'Explainability Evaluation', 'core'),
  kr('explainability', 'Art. 34(1)(2)', K_ART_34_2, 'core'),
  ukd('explainability', 'Art. 22C', 'Safeguards for automated decision-making', 'core', {
    note: 'Information about the decision, representations, human intervention and contest.',
  }),
  atrs('explainability', '2.3.5', 'Appeals and review', 'related'),
  sgG('explainability', '3', 'Trusted Development and Deployment', 'related'),
  coe('explainability', 'Art. 14(2)', 'Documentation sufficient to contest decisions; complaint to authorities', 'related'),
  oecd('explainability', '1.3', 'Transparency and explainability', 'core'),
  mk('explainability', 'cn-algo-recommendation', 'Art. 17', 'Explain where an algorithm significantly affects user rights', 'related', ALGOREC_URL, {
    obligationId: OBL_CN_ALGOREC,
    note: 'Third paragraph; the first two give an opt-out and control over user tags; CAC text.',
  }),

  // ── AI literacy and competence ───────────────────────────────────────────
  eu('ai-literacy', 'Art. 4', 'AI literacy', 'core', '4', {
    obligationId: OBL_EU_4,
    note: 'Reworded by the Digital Omnibus: providers and deployers take measures to support AI literacy, without a guaranteed level.',
    see: '/bok/eu-ai-act#ai-literacy-and-bias-detection-data',
  }),
  eu('ai-literacy', 'Art. 26(2)', 'Oversight by people with the competence, training and authority it needs', 'related', '26', {
    obligationId: OBL_EU_26,
  }),
  eu('ai-literacy', 'Art. 95(2)(c)', 'Codes of conduct: promoting AI literacy', 'related', '95'),
  gd('ai-literacy', 'Art. 39(1)(b)', 'DPO tasks: awareness-raising and training of staff', 'related', '39', {
    verified: false,
    note: GDPR_SECONDARY,
  }),
  isoU('ai-literacy', '7.2', 'Competence', 'core'),
  isoU('ai-literacy', '7.3', 'Awareness', 'related'),
  nist(
    'ai-literacy',
    'GOVERN 2.2',
    "The organization's personnel and partners receive AI risk management training to enable them to perform their duties and responsibilities consistent with related policies, procedures, and agreements",
    'core',
  ),
  nist(
    'ai-literacy',
    'MAP 3.4',
    'Processes for operator and practitioner proficiency with AI system performance and trustworthiness, and relevant technical standards and certifications, are defined, assessed, and documented',
    'related',
  ),
  csa('ai-literacy', 'HRS-14', 'AI Competency Training', 'core'),
  csa('ai-literacy', 'HRS-11', 'Security Awareness Training', 'related'),
  atrs('ai-literacy', '2.3.4', 'Required training', 'related'),
  sgA('ai-literacy', '2.4', 'Enable end-user responsibility', 'core'),
  sgG('ai-literacy', '9', 'AI for Public Good', 'related', {
    note: 'Includes upskilling workers.',
  }),
  mk('ai-literacy', 'cn-genai-measures', 'Art. 10', 'Guide users to understand and use generative AI rationally', 'related', GENAI_URL, {
    obligationId: OBL_CN_GENAI,
    note: 'Also protects minors from over-reliance; CAC text.',
  }),

  // ── Conformity assessment and certification ──────────────────────────────
  eu('conformity-assessment', 'Art. 43', 'Conformity assessment', 'core', '43', {
    obligationId: OBL_EU_43,
  }),
  eu('conformity-assessment', 'Art. 47', 'EU declaration of conformity', 'related', '47', {
    obligationId: OBL_EU_47,
  }),
  eu('conformity-assessment', 'Art. 48', 'CE marking', 'related', '48'),
  eu('conformity-assessment', 'Art. 40', 'Harmonised standards and standardisation deliverables', 'related', '40', {
    note: 'Presumption of conformity once a harmonised standard is cited in the Official Journal.',
  }),
  gd('conformity-assessment', 'Art. 42', 'Certification', 'related', '42', {
    verified: false,
    note: GDPR_SECONDARY,
  }),
  isoU('conformity-assessment', '9.2', 'Internal audit', 'related'),
  mk('conformity-assessment', 'iso-42006', 'ISO/IEC 42006', 'Requirements for bodies providing audit and certification of AI management systems', 'core', ISO42006_URL, {
    obligationId: OBL_ISO42006,
    note: 'The whole standard: who may credibly certify an organisation to ISO/IEC 42001.',
  }),
  nist(
    'conformity-assessment',
    'MEASURE 1.3',
    'Internal experts who did not serve as front-line developers for the system and/or independent assessors are involved in regular assessments and updates',
    'related',
  ),
  csa('conformity-assessment', 'A&A-02', 'Independent Assessments', 'core'),
  csa('conformity-assessment', 'A&A-04', 'Requirements Compliance', 'related'),
  kr('conformity-assessment', 'Art. 33', 'Confirmation of high-impact AI', 'related'),
  sgG('conformity-assessment', '5', 'Testing and Assurance', 'related', {
    note: 'Third-party testing and common testing standards.',
  }),
  mk('conformity-assessment', 'en-18286', 'EN 18286', 'Quality management system for EU AI Act regulatory purposes', 'related', EN18286_URL, {
    note: 'A harmonised-standard candidate for Art. 17; not cited in the Official Journal as of 2026-09-24.',
  }),
  mk('conformity-assessment', 'cn-genai-measures', 'Art. 17', 'Security assessment and algorithm filing', 'related', GENAI_URL, {
    obligationId: OBL_CN_GENAI,
    note: 'Services with public-opinion attributes or social-mobilisation capacity; CAC text.',
  }),

  // ── GPAI and foundation models ───────────────────────────────────────────
  eu('gpai-foundation-models', 'Art. 53', T_ART_53, 'core', '53', { obligationId: OBL_EU_53 }),
  eu('gpai-foundation-models', 'Art. 55', T_ART_55, 'core', '55', { obligationId: OBL_EU_55 }),
  eu('gpai-foundation-models', 'Art. 51', 'Classification of general-purpose AI models as general-purpose AI models with systemic risk', 'related', '51'),
  eu('gpai-foundation-models', 'Art. 56', 'Codes of practice', 'related', '56'),
  gpT('gpai-foundation-models', 'Transparency 1.1', 'Drawing up and keeping up-to-date model documentation', 'core'),
  gpS('gpai-foundation-models', 'Safety C1', 'Commitment 1: Safety and Security Framework', 'core'),
  gpS('gpai-foundation-models', 'Safety 3.2', 'Measure 3.2: Model evaluations', 'related'),
  gpS('gpai-foundation-models', 'Safety C7', 'Commitment 7: Safety and Security Model Reports', 'related'),
  csa('gpai-foundation-models', 'MDS-12', 'Open Model Risk Assessment', 'related'),
  csa('gpai-foundation-models', 'MDS-03', 'Model Documentation', 'related'),
  kr('gpai-foundation-models', 'Art. 32', K_ART_32, 'core', {
    note: 'Applies where cumulative training compute exceeds the threshold the enforcement decree sets.',
  }),
  sgG('gpai-foundation-models', '8', 'Safety and Alignment R&D', 'related'),
  g7('gpai-foundation-models', 'Action 1', G_ACTION_1, 'related', {
    note: 'The whole code addresses organisations developing advanced AI systems.',
  }),
  mk('gpai-foundation-models', 'cn-genai-measures', 'Art. 7', 'Lawful data and foundation-model sources', 'related', GENAI_URL, {
    obligationId: OBL_CN_GENAI,
    note: 'Point (1): use data and foundation models with lawful sources; CAC text.',
  }),

  // ── IP and copyright ─────────────────────────────────────────────────────
  eu('ip-copyright', 'Art. 53(1)(c)', 'Copyright policy, including rights reservations', 'core', '53', {
    obligationId: OBL_EU_53,
    note: 'Identify and honour reservations of rights under Art. 4(3) of Directive (EU) 2019/790.',
  }),
  eu('ip-copyright', 'Art. 53(1)(d)', 'Public summary of the content used for training', 'related', '53'),
  gpC('ip-copyright', 'Copyright 1.1', 'Draw up, keep up-to-date and implement a copyright policy', 'core'),
  gpC('ip-copyright', 'Copyright 1.2', 'Reproduce and extract only lawfully accessible copyright-protected content', 'core'),
  gpC('ip-copyright', 'Copyright 1.3', 'Identify and comply with rights reservations when crawling the World Wide Web', 'core'),
  gpC('ip-copyright', 'Copyright 1.4', 'Mitigate the risk of copyright-infringing outputs', 'core'),
  gpC('ip-copyright', 'Copyright 1.5', 'Designate a point of contact and enable the lodging of complaints', 'related'),
  nist('ip-copyright', 'GOVERN 6.1', N_GOVERN_61, 'core'),
  nist(
    'ip-copyright',
    'MAP 4.1',
    "Approaches for mapping AI technology and legal risks of its components, including the use of third-party data or software, are in place, followed, and documented, as are risks of infringement of a third party's intellectual property or other rights",
    'related',
  ),
  csa('ip-copyright', 'DSP-20', 'Data Provenance and Transparency', 'related'),
  sgG('ip-copyright', '2', 'Data', 'related', {
    note: 'Balancing copyright with data accessibility for training.',
  }),
  g7('ip-copyright', 'Action 11', G_ACTION_11, 'core'),
  mk('ip-copyright', 'cn-genai-measures', 'Art. 7(2)', 'No infringement of IP rights in training data', 'core', GENAI_URL, {
    obligationId: OBL_CN_GENAI,
    note: 'CAC text.',
  }),
  mk('ip-copyright', 'cn-genai-measures', 'Art. 4(3)', 'Respect IP rights and business ethics', 'related', GENAI_URL, {
    obligationId: OBL_CN_GENAI,
    note: 'CAC text.',
  }),

  // ── Agent identity and autonomy ──────────────────────────────────────────
  eu('agent-identity-autonomy', 'Art. 14', 'Human oversight', 'related', '14', {
    obligationId: OBL_EU_14,
    note: 'No agent-specific article; oversight and the Art. 14(4)(e) stop duty apply to agentic high-risk systems.',
  }),
  nist(
    'agent-identity-autonomy',
    'GOVERN 3.2',
    'Policies and procedures are in place to define and differentiate roles and responsibilities for human-AI configurations and oversight of AI systems',
    'related',
  ),
  csa('agent-identity-autonomy', 'IAM-18', 'Agent Access Restriction', 'core'),
  csa('agent-identity-autonomy', 'AIS-11', 'Agents Security Boundaries', 'core'),
  csa('agent-identity-autonomy', 'IAM-12', 'Unique Identities', 'related'),
  asi('agent-identity-autonomy', 'ASI03', 'Identity and Privilege Abuse', 'core'),
  llm('agent-identity-autonomy', 'LLM03:2026', 'Excessive Agency', 'core'),
  asi('agent-identity-autonomy', 'ASI02', 'Tool Misuse and Exploitation', 'related'),
  asi('agent-identity-autonomy', 'ASI07', 'Insecure Inter-Agent Communication', 'related'),
  asi('agent-identity-autonomy', 'ASI10', 'Rogue Agents', 'related'),
  sgA('agent-identity-autonomy', '2.1.2', 'Bound risks through design by defining agents limits and permissions', 'core', {
    note: 'Includes agent identity: unique, verifiable and tied to an accountable human or supervising agent.',
  }),
  sgA('agent-identity-autonomy', '2.2.2', 'Design for meaningful human oversight', 'related'),
  mk('agent-identity-autonomy', 'cn-tc260-framework', 'App. 2 II.2', 'Identity and access management', 'core', TC260_URL, {
    obligationId: OBL_CN_TC260_APP2,
    note: 'Identity and permissions per agent; printed pp. 120-121.',
  }),
  mk('agent-identity-autonomy', 'cn-tc260-framework', 'App. 2 II.3', 'Strengthen human approval', 'related', TC260_URL, {
    obligationId: OBL_CN_TC260_APP2,
  }),

  // ── Content provenance and deepfakes ─────────────────────────────────────
  eu('content-provenance', 'Art. 50(2)', 'Machine-readable marking of synthetic content', 'core', '50', {
    obligationId: OBL_EU_50,
  }),
  eu('content-provenance', 'Art. 50(4)', 'Disclosure of deep fakes', 'core', '50', {
    obligationId: OBL_EU_50,
  }),
  eu('content-provenance', 'Art. 3(60)', 'Definition of deep fake', 'related', '3'),
  csa('content-provenance', 'MDS-09', 'Model Signing/Ownership Verification', 'related', {
    note: 'Model provenance rather than content provenance; the signing mechanism is the same.',
  }),
  llm('content-provenance', 'LLM07:2026', 'Misinformation', 'related'),
  kr('content-provenance', 'Art. 31', K_ART_31, 'core', {
    note: 'Outputs labelled as generated; sound, images or video hard to tell from reality must be recognisable as AI-generated.',
  }),
  sgG('content-provenance', '7', 'Content Provenance', 'core'),
  g7('content-provenance', 'Action 7', 'Deploy content authentication and provenance mechanisms where feasible', 'core'),
  mk('content-provenance', 'cn-content-labelling', 'Art. 4', 'Explicit labels for generated content', 'core', LABEL_URL, {
    obligationId: OBL_CN_LABEL,
  }),
  mk('content-provenance', 'cn-content-labelling', 'Art. 5', 'Implicit (metadata) labels', 'core', LABEL_URL, {
    obligationId: OBL_CN_LABEL,
  }),
  mk('content-provenance', 'cn-deep-synthesis', 'Art. 17', 'Conspicuous labels for confusable content', 'core', DEEPSYN_URL, {
    obligationId: OBL_CN_DEEPSYN,
  }),
  mk('content-provenance', 'cn-genai-measures', 'Art. 12', 'Labelling of generated content', 'related', GENAI_URL, {
    obligationId: OBL_CN_GENAI,
  }),

  // ── Sandboxes and real-world testing ─────────────────────────────────────
  eu('sandboxes-real-world-testing', 'Art. 57', 'AI regulatory sandboxes', 'core', '57', {
    note: 'At least one national sandbox per Member State, due by 2 Aug 2027 after the Digital Omnibus (was 2 Aug 2026).',
    see: '/bok/eu-ai-act#sandboxes-and-real-world-testing',
  }),
  eu('sandboxes-real-world-testing', 'Art. 58', 'Detailed arrangements for, and functioning of, AI regulatory sandboxes', 'related', '58'),
  eu('sandboxes-real-world-testing', 'Art. 59', 'Further processing of personal data in the AI regulatory sandbox', 'related', '59'),
  eu('sandboxes-real-world-testing', 'Art. 60', 'Testing of high-risk AI systems in real world conditions outside AI regulatory sandboxes', 'core', '60', {
    obligationId: OBL_EU_60,
  }),
  eu('sandboxes-real-world-testing', 'Art. 61', 'Informed consent to participate in testing in real world conditions', 'related', '61'),
  isoU('sandboxes-real-world-testing', 'A.6.2.4', 'AI system verification and validation', 'related', {
    obligationId: OBL_A6,
  }),
  nist(
    'sandboxes-real-world-testing',
    'MEASURE 2.3',
    'AI system performance or assurance criteria are measured qualitatively or quantitatively and demonstrated for conditions similar to deployment setting(s)',
    'related',
  ),
  csa('sandboxes-real-world-testing', 'AIS-13', 'AI Sandboxing', 'related', {
    note: 'Technical isolation of AI tools and plugins, not a regulatory sandbox.',
  }),
  sgA('sandboxes-real-world-testing', '2.3.2', 'Before deploying, test agents', 'related'),
  coe('sandboxes-real-world-testing', 'Art. 13', 'Safe innovation (controlled testing environments)', 'core'),
  mk('sandboxes-real-world-testing', 'cn-tc260-framework', 'App. 2 II.6', 'Sandbox validation and red teaming', 'related', TC260_URL, {
    obligationId: OBL_CN_TC260_APP2,
    note: 'Technical sandbox validation for agents, not a regulatory sandbox; printed pp. 124-125.',
  }),

  // ── Environmental impact ─────────────────────────────────────────────────
  mk('environmental-impact', 'eu-ai-act', 'Annex XI 1(2)(e)', 'Known or estimated energy consumption of the GPAI model', 'core', aiaAnx('XI'), {
    obligationId: OBL_EU_53,
    note: 'Part of the technical documentation GPAI providers keep under Art. 53(1)(a); may be estimated from compute where unknown.',
  }),
  eu('environmental-impact', 'Art. 40(2)', 'Standardisation deliverables on energy and resource performance', 'related', '40'),
  eu('environmental-impact', 'Art. 95(2)(b)', 'Codes of conduct: environmental sustainability', 'related', '95'),
  gpT('environmental-impact', 'Transparency 1.1', 'Drawing up and keeping up-to-date model documentation', 'core', {
    note: 'The Model Documentation Form asks for energy used in training and inference.',
  }),
  nist(
    'environmental-impact',
    'MEASURE 2.12',
    'Environmental impact and sustainability of AI model training and management activities as identified in the MAP function are assessed and documented',
    'core',
  ),
  sgG('environmental-impact', '9', 'AI for Public Good', 'related', {
    note: 'Includes developing AI systems sustainably.',
  }),
  oecd('environmental-impact', '1.1', 'Inclusive growth, sustainable development and well-being', 'core'),

  // ── Deployment, change and decommissioning ───────────────────────────────
  eu('deployment-change-decommissioning', 'Art. 26', T_ART_26, 'core', '26', { obligationId: OBL_EU_26 }),
  eu('deployment-change-decommissioning', 'Art. 25', 'Responsibilities along the AI value chain', 'related', '25', {
    obligationId: OBL_EU_25,
    note: 'A substantial modification or a changed intended purpose makes the deployer a provider.',
  }),
  eu('deployment-change-decommissioning', 'Art. 43(4)', 'New conformity assessment on substantial modification', 'related', '43', {
    obligationId: OBL_EU_43,
  }),
  eu('deployment-change-decommissioning', 'Art. 20', 'Corrective actions and duty of information', 'related', '20', {
    note: 'Bring into conformity, withdraw, disable or recall.',
  }),
  eu('deployment-change-decommissioning', 'Art. 79', 'Procedure at national level for dealing with AI systems presenting a risk', 'related', '79'),
  eu('deployment-change-decommissioning', 'Art. 86', T_ART_86, 'related', '86'),
  iso('deployment-change-decommissioning', 'A.9', 'Use of AI systems', 'related', {
    obligationId: 'AIGE-OBL-ISO42001-A9',
  }),
  isoU('deployment-change-decommissioning', 'A.6.2.5', 'AI system deployment', 'core', { obligationId: OBL_A6 }),
  isoU('deployment-change-decommissioning', 'A.6.2.6', 'AI system operation and monitoring', 'core', {
    obligationId: OBL_A6,
  }),
  nist('deployment-change-decommissioning', 'MANAGE 2.4', N_MANAGE_24, 'core'),
  nist(
    'deployment-change-decommissioning',
    'MANAGE 4.1',
    'Post-deployment AI system monitoring plans are implemented, including mechanisms for capturing and evaluating input from users and other relevant AI actors, appeal and override, decommissioning, incident response, recovery, and change management',
    'core',
  ),
  nist('deployment-change-decommissioning', 'GOVERN 1.7', N_GOVERN_17, 'core'),
  csa('deployment-change-decommissioning', 'AIS-06', 'Secure Application Deployment', 'core'),
  csa('deployment-change-decommissioning', 'CCC-01', 'Change Management Policy and Procedures', 'related'),
  csa('deployment-change-decommissioning', 'DSP-02', 'Secure Disposal', 'related'),
  sgA('deployment-change-decommissioning', '2.3.3', 'When deploying, continuously monitor and test', 'related'),
  coe('deployment-change-decommissioning', 'Art. 16(2)(g)', 'Testing before first use and when significantly modified', 'related'),
  oecd('deployment-change-decommissioning', '1.4', 'Robustness, security and safety', 'related', {
    note: 'The 2024 revision asks for mechanisms to override, repair or decommission safely.',
  }),
  mk('deployment-change-decommissioning', 'cn-tc260-framework', '5.3', "Operators' safety guidelines", 'related', TC260_URL, {
    obligationId: OBL_CN_TC260,
    note: 'Logs kept at least six months and audited; voluntary.',
  }),
  mk('deployment-change-decommissioning', 'cn-tc260-framework', '5.3.19', 'Re-assessment on material change', 'related', TC260_URL, {
    obligationId: OBL_CN_TC260,
  }),
];

/** Every topic → clause reference: the v0.4 set, then the v0.5.0 additions. */
export const refs: readonly CrosswalkRef[] = [...refsV04, ...refsV05];

// frameworks.ts wins over crosswalkInstruments when both carry an id.
const byId = new Map<string, Framework>([
  ...crosswalkInstruments.map((f) => [f.id, f] as const),
  ...frameworks.map((f) => [f.id, f] as const),
]);

/** Look up a framework by id (frameworks.ts first, then crosswalkInstruments). */
/** The obligation-register row a ref joins, by id (or, for a legacy ref, by
 *  the row's exact text); undefined where the clause has no row. */
export function refObligation(
  r: Pick<CrosswalkRef, 'obligationId' | 'obligation'>,
): Obligation | undefined {
  if (r.obligationId) return obligations.find((row) => row.id === r.obligationId);
  if (r.obligation) return obligations.find((row) => row.obligation === r.obligation);
  return undefined;
}

export function frameworkById(id: string): Framework | undefined {
  return byId.get(id);
}

const columnByFramework = new Map<string, CrosswalkColumn>(
  columns.flatMap((column) => column.frameworks.map((id) => [id, column] as const)),
);

/** The column a framework sits in. */
export function columnOf(frameworkId: string): CrosswalkColumn | undefined {
  return columnByFramework.get(frameworkId);
}

/** Every framework the crosswalk maps, in column order. */
export function crosswalkFrameworks(): Framework[] {
  return columns
    .flatMap((column) => column.frameworks)
    .map((id) => frameworkById(id))
    .filter((f): f is Framework => f !== undefined);
}

/** `${prefix} ${ref}` for chips in multi-instrument columns, `${ref}` otherwise. */
export function chipLabel(r: CrosswalkRef): string {
  const prefix = chipPrefix[r.framework];
  return prefix ? `${prefix} ${r.ref}` : r.ref;
}

/**
 * A stable NCName token for a clause, unique within its framework: the OSCAL
 * `id-ref` of the explorer's export and the `clauseId` of crosswalk.json. CSA
 * AICM ids follow CSA's own OSCAL catalog (A&A-01 becomes A_A-01); every other
 * id is lower-cased, with runs of other characters folded to "-", and a leading
 * "_" where it would otherwise start with a digit (6.1.2 becomes _6.1.2).
 */
export function clauseId(r: Pick<CrosswalkRef, 'framework' | 'ref'>): string {
  if (r.framework === 'csa-aicm') return r.ref.replace(/&/g, '_');
  const slug = r.ref
    .toLowerCase()
    .replace(/[^a-z0-9.]+/g, '-')
    .replace(/\.-|-\./g, '-')
    .replace(/^[-.]+|[-.]+$/g, '');
  return /^[a-z_]/.test(slug) ? slug : `_${slug}`;
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
