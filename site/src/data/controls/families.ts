// controls/families.ts: the 18 control families, the axis that cuts across the
// profiles. A profile says what kind of system a control is for; a family says
// what outcome it secures. Every control has one primary family and up to two
// secondary ones, and an actor (`appliesTo`).
//
// FAMILIES. An id is stable and never reused. A family is admitted when at
// least two independent primary sources treat the area as its own; each anchor
// below names the source, the exact reference, the URL and the date the
// reference was read. Anchors come from the fact sheets of the
// controls-taxonomy-expansion change (research-control-catalogs.md and
// research-laws-standards.md, read 2026-11-28); nothing here is stated from
// memory. EU AI Act anchors point at the AI Act Service Desk (the consolidated
// text after Regulation (EU) 2026/1744), because EUR-Lex could not be read.
//
// CLASSIFICATION. The 93 controls of the first five profiles are classified in
// one table, `classification` below, applied to the registry by
// `withClassification` (./index.ts), the way ./imda-agentic.ts adds its
// cross-reference: the profile files stay as they were. Rule: the primary
// family answers "what outcome does the control secure", read from its
// `objective`; when two families fit, the more specific is primary and the
// other secondary (agent-controls before human-oversight for the approval of
// a tool call). Reclassifying a control is a change to one line of the table.
// A control of a later profile declares `family` and `appliesTo` itself.
import type { Control, ClassifiedControl } from './index';
import { GPAI_CHAPTERS, GPAI_CODE_AS_OF } from '../gpai-code';

export type Actor = 'provider' | 'deployer' | 'gpai-provider';
export const ACTORS: readonly Actor[] = ['provider', 'deployer', 'gpai-provider'];

export const actorLabels: Readonly<Record<Actor, string>> = {
  provider: 'Provider',
  deployer: 'Deployer',
  'gpai-provider': 'GPAI model provider',
};

export interface FamilyAnchor {
  /** The framework or law, as named in its own text. */
  framework: string;
  /** The exact article, clause, domain or element. */
  ref: string;
  /** A page or file that was read for this anchor. */
  url: string;
  /** YYYY-MM-DD the reference was read. */
  read: string;
}

export interface ControlFamily {
  /** Stable kebab id; the anchor of the family on /controls/families. */
  id: string;
  /** 1-based position on the page. */
  order: number;
  title: string;
  /** One or two sentences: the outcome the family secures. */
  definition: string;
  /** What is out of the family, and where it lives instead. */
  excludes: string;
  /** At least two, from primary sources. */
  anchors: readonly FamilyAnchor[];
}

/** Date the anchors of this file were read. */
const READ = '2026-11-28';

const AI_ACT_EXPLORER = 'https://ai-act-service-desk.ec.europa.eu/en/ai-act-explorer';
const aiActArticle = (n: number) => `https://ai-act-service-desk.ec.europa.eu/en/ai-act/article-${n}`;
const NIST_RMF = 'https://nvlpubs.nist.gov/nistpubs/ai/NIST.AI.100-1.pdf';
const AICM = 'https://cloudsecurityalliance.org/artifacts/ai-controls-matrix-v1-1';
const COE = 'https://rm.coe.int/1680afae3c';
const IMDA = 'https://www.imda.gov.sg/-/media/imda/files/about/emerging-tech-and-research/artificial-intelligence/mgf-for-agentic-ai.pdf';
const KOREA = 'https://elaw.klri.re.kr/eng_mobile/viewer.do?hseq=73499&type=part&key=18';
const METR = 'https://metr.org/common-elements';
const ETSI = 'https://www.etsi.org/deliver/etsi_ts/104200_104299/104223/01.01.01_60/ts_104223v010101p.pdf';
const ATLAS = 'https://github.com/mitre-atlas/atlas-data/releases/download/v2026.11/ATLAS-2026.11.yaml';
const SR_26_2 = 'https://www.federalreserve.gov/supervisionreg/srletters/SR2602a1.pdf';
const PRA_SS1_23 = 'https://www.bankofengland.co.uk/prudential-regulation/publication/2023/may/model-risk-management-principles-for-banks-ss';
const OWASP_ASI = 'https://genai.owasp.org/resource/owasp-top-10-for-agentic-applications-for-2026/';
const COLORADO = 'https://leg.colorado.gov/bills/SB26-189';

const anchor = (framework: string, ref: string, url: string): FamilyAnchor => ({ framework, ref, url, read: READ });
/** An anchor in a chapter of the GPAI Code of Practice, read in the chapter PDF (../gpai-code.ts). */
const gpaiAnchor = (ref: string): FamilyAnchor => ({
  framework: 'EU General-Purpose AI Code of Practice',
  ref: `Safety and Security chapter, ${ref}`,
  url: GPAI_CHAPTERS.S.url,
  read: GPAI_CODE_AS_OF,
});

export const families: readonly ControlFamily[] = [
  {
    id: 'governance',
    order: 1,
    title: 'Governance and accountability',
    definition:
      'Policies, named roles and decision rights for AI, so that someone is answerable for each system and for the programme around it.',
    excludes: 'Per-system risk and impact work (risk-and-impact), training (literacy-and-use-policy) and the records that prove it (documentation-and-evidence).',
    anchors: [
      anchor('NIST AI RMF 1.0', 'GOVERN 1, GOVERN 2 and GOVERN 4', NIST_RMF),
      anchor('CSA AI Controls Matrix v1.1', 'Domain GRC, Governance, Risk and Compliance', AICM),
      gpaiAnchor('Commitment 8, Systemic risk responsibility allocation'),
    ],
  },
  {
    id: 'inventory',
    order: 2,
    title: 'Inventory and classification',
    definition:
      'A complete, current record of the AI systems and models in use, each classified by risk, so that nothing runs outside the programme.',
    excludes: 'The documents kept per system (documentation-and-evidence) and the risk assessment itself (risk-and-impact).',
    anchors: [
      anchor('SR 26-2 Supervisory Guidance on Model Risk Management', 'Section VI, Governance and Controls: Model Inventory', SR_26_2),
      anchor('PRA SS1/23 Model risk management principles for banks', 'Principle 1, Model identification and model risk classification', PRA_SS1_23),
    ],
  },
  {
    id: 'risk-and-impact',
    order: 3,
    title: 'Risk and impact assessment',
    definition:
      'Identifying, estimating and treating the risks of an AI system and its effects on people before deployment and as it changes.',
    excludes: 'Testing that measures the system (evaluation-and-testing) and monitoring after release (monitoring-and-logging).',
    anchors: [
      anchor('Regulation (EU) 2024/1689 (AI Act)', 'Article 9, Risk management system', aiActArticle(9)),
      anchor('Council of Europe Framework Convention on AI (CETS 225)', 'Article 16, Risk and impact management framework', COE),
    ],
  },
  {
    id: 'data-and-privacy',
    order: 4,
    title: 'Data governance and privacy',
    definition:
      'Admission, rights, lawful basis, quality, provenance and lineage of the data an AI system is trained on, tested on or processes.',
    excludes: 'Bias testing of outputs (fairness) and integrity or tamper protection of data snapshots and model artefacts, weights included (ai-security).',
    anchors: [
      anchor('Regulation (EU) 2024/1689 (AI Act)', 'Article 10, Data and data governance', aiActArticle(10)),
      anchor('CSA AI Controls Matrix v1.1', 'Domain DSP, Data Security and Privacy Lifecycle Management', AICM),
    ],
  },
  {
    id: 'lifecycle-and-change',
    order: 5,
    title: 'Lifecycle and change management',
    definition:
      'Defined stages from design to retirement, with controlled changes, the release, rollout, rollback and retirement decisions themselves and a quality management system around them.',
    excludes: 'Gates on evaluation results (evaluation-and-testing) and the records a change leaves (documentation-and-evidence).',
    anchors: [
      anchor('Regulation (EU) 2024/1689 (AI Act)', 'Article 17, Quality management system', AI_ACT_EXPLORER),
      anchor('CSA AI Controls Matrix v1.1', 'Domain CCC, Change Control and Configuration Management', AICM),
    ],
  },
  {
    id: 'evaluation-and-testing',
    order: 6,
    title: 'Evaluation and testing',
    definition:
      'Measuring what an AI system does against stated criteria, with methods and environments whose results can be trusted, and the gate that holds a decision to those results.',
    excludes: 'Measuring bias specifically (fairness), observing the system in production (monitoring-and-logging) and the release, rollout, rollback and retirement decisions themselves (lifecycle-and-change).',
    anchors: [
      anchor('NIST AI RMF 1.0', 'MEASURE 1 and MEASURE 2', NIST_RMF),
      anchor('METR, Common Elements of Frontier AI Safety Policies', 'Element 6, Full Capability Elicitation during Evaluations, and element 7, Timing and Frequency of Evaluations', METR),
    ],
  },
  {
    id: 'fairness',
    order: 7,
    title: 'Fairness and non-discrimination',
    definition:
      'Detecting and correcting unwanted bias, and keeping outcomes for different groups of people equitable.',
    excludes: 'General quality testing (evaluation-and-testing) and the redress a person can seek (rights-and-redress).',
    anchors: [
      anchor('NIST AI RMF 1.0', 'MEASURE 2.11', NIST_RMF),
      anchor('Council of Europe Framework Convention on AI (CETS 225)', 'Article 10, Equality and non-discrimination', COE),
    ],
  },
  {
    id: 'transparency',
    order: 8,
    title: 'Transparency and disclosure',
    definition:
      'Telling users, deployers and the public that they are dealing with AI, and what it is, how it was built and how it should be used.',
    excludes: 'Technical documentation kept for authorities (documentation-and-evidence) and explanations owed after a decision (rights-and-redress).',
    anchors: [
      anchor('Regulation (EU) 2024/1689 (AI Act)', 'Article 50, Transparency obligations for providers and deployers of certain AI systems', aiActArticle(50)),
      anchor('Framework Act on AI (South Korea)', 'Article 31, Transparency', KOREA),
    ],
  },
  {
    id: 'rights-and-redress',
    order: 9,
    title: 'Rights of affected people and redress',
    definition:
      'Notice, explanation, human review and a way to contest decisions, for the people an AI system makes or informs decisions about.',
    excludes: 'Disclosure to the public in general (transparency) and oversight by the operator (human-oversight).',
    anchors: [
      anchor('Council of Europe Framework Convention on AI (CETS 225)', 'Article 14, Remedies, and Article 15, Procedural safeguards', COE),
      anchor('Colorado SB26-189, Automated Decision-Making Technology', 'Deployer duties: notice, explanation after an adverse outcome, correction and human review', COLORADO),
    ],
  },
  {
    id: 'human-oversight',
    order: 10,
    title: 'Human oversight',
    definition:
      'People with the competence, authority and information to understand, monitor and override an AI system, and a design that makes that possible.',
    excludes: 'Approval gates on individual tool calls by an agent (agent-controls) and the rights of affected people (rights-and-redress).',
    anchors: [
      anchor('IMDA Model AI Governance Framework for Agentic AI v1.5', '2.2 Make humans meaningfully accountable, 2.2.2 Design for meaningful human oversight', IMDA),
      anchor('Regulation (EU) 2024/1689 (AI Act)', 'Article 14, Human oversight', aiActArticle(14)),
      anchor('Framework Act on AI (South Korea)', 'Article 34, High-impact AI responsibilities: human management and oversight', KOREA),
    ],
  },
  {
    id: 'agent-controls',
    order: 11,
    title: 'Agent controls',
    definition:
      'Limits placed on an AI agent that acts through tools: identity, permissions, mediation of calls, budgets and containment.',
    excludes: 'Organisation-wide governance of agents as a class of system (governance) and general security of the model (ai-security).',
    anchors: [
      anchor('IMDA Model AI Governance Framework for Agentic AI v1.5', '2.1.2 Bound risks through design by defining agents\' limits and permissions', IMDA),
      anchor('OWASP Top 10 for Agentic Applications 2026', 'ASI01 to ASI10', OWASP_ASI),
    ],
  },
  {
    id: 'ai-security',
    order: 12,
    title: 'AI system security',
    definition:
      'Protecting the model, its artefacts and its supply chain against attack, theft and tampering, including integrity and tamper protection of data snapshots, and finding vulnerabilities before others do.',
    excludes: 'Limits on what an agent may do (agent-controls) and the admission, rights, lawful basis, quality, provenance and lineage of data (data-and-privacy).',
    anchors: [
      anchor('ETSI TS 104 223 V1.1.1', 'Section 5, AI Security Principles and Provisions', ETSI),
      anchor('MITRE ATLAS v2026.11', 'Mitigations AML.M0000 to AML.M0043', ATLAS),
    ],
  },
  {
    id: 'third-party',
    order: 13,
    title: 'Third-party and supply chain',
    definition:
      'Managing the risk and responsibilities that come with models, data, tools and services supplied by others.',
    excludes: 'Integrity of artefacts the organisation produces itself (ai-security) and admission of data (data-and-privacy).',
    anchors: [
      anchor('NIST AI RMF 1.0', 'GOVERN 6 and MANAGE 3', NIST_RMF),
      anchor('CSA AI Controls Matrix v1.1', 'Domain STA, Supply Chain Management, Transparency, and Accountability', AICM),
    ],
  },
  {
    id: 'monitoring-and-logging',
    order: 14,
    title: 'Monitoring and logging',
    definition:
      'Recording what an AI system does and watching its behaviour in operation, so that drift, misuse and failure are seen.',
    excludes: 'The response once something is seen (incidents-and-shutdown) and the records kept as evidence (documentation-and-evidence).',
    anchors: [
      anchor('Regulation (EU) 2024/1689 (AI Act)', 'Article 72, Post-market monitoring by providers', aiActArticle(72)),
      anchor('CSA AI Controls Matrix v1.1', 'Domain LOG, Logging and Monitoring', AICM),
    ],
  },
  {
    id: 'incidents-and-shutdown',
    order: 15,
    title: 'Incidents and shutdown',
    definition:
      'Detecting, reporting and responding to AI incidents, including the ability to halt, roll back or retire a system.',
    excludes: 'Routine monitoring (monitoring-and-logging) and the stop conditions of one agent run (agent-controls).',
    anchors: [
      anchor('NIST AI RMF 1.0', 'MANAGE 4', NIST_RMF),
      anchor('METR, Common Elements of Frontier AI Safety Policies', 'Element 4, Conditions for Halting Deployment Plans, and element 5, Conditions for Halting Development Plans', METR),
    ],
  },
  {
    id: 'documentation-and-evidence',
    order: 16,
    title: 'Documentation and evidence',
    definition:
      'Technical documentation, records and signed evidence that let a third party check what was built, tested and decided.',
    excludes: 'Disclosure to users (transparency) and the logs a running system emits (monitoring-and-logging).',
    anchors: [
      anchor('Regulation (EU) 2024/1689 (AI Act)', 'Article 11, Technical documentation, and Article 18, Documentation keeping', AI_ACT_EXPLORER),
      anchor('CSA AI Controls Matrix v1.1', 'Domain A&A, Audit & Assurance', AICM),
    ],
  },
  {
    id: 'literacy-and-use-policy',
    order: 17,
    title: 'Literacy and acceptable use',
    definition:
      'Training for the people who build and use AI, and rules for what staff and users may do with it.',
    excludes: 'The oversight role itself (human-oversight) and organisation-wide policy ownership (governance).',
    anchors: [
      anchor('Regulation (EU) 2024/1689 (AI Act)', 'Article 4, AI literacy', aiActArticle(4)),
      anchor('Council of Europe Framework Convention on AI (CETS 225)', 'Article 20, Digital literacy and skills', COE),
    ],
  },
  {
    id: 'gpai-and-frontier',
    order: 18,
    title: 'General-purpose and frontier models',
    definition:
      'Obligations specific to those who provide general-purpose or frontier models: systemic-risk assessment, safety frameworks, model evaluation and serious-incident reporting.',
    excludes: 'Controls any AI provider or deployer applies to a system, which sit in the other families with `gpai-provider` among the actors.',
    anchors: [
      anchor('Regulation (EU) 2024/1689 (AI Act)', 'Article 55, Obligations of providers of general-purpose AI models with systemic risk', aiActArticle(55)),
      anchor('Framework Act on AI (South Korea)', 'Article 32, Safety', KOREA),
      anchor('METR, Common Elements of Frontier AI Safety Policies', 'Element 1, Capability Thresholds', METR),
      gpaiAnchor('Commitment 1, Safety and Security Framework'),
    ],
  },
];

export const familyById = (id: string): ControlFamily | undefined => families.find((f) => f.id === id);

/** Anchor of a family on /controls/families. */
export const familyPath = (id: string): string => `/controls/families#${id}`;

const KEBAB = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;
const ISO_DATE = /^\d{4}-\d{2}-\d{2}$/;

/** True for a real calendar date written YYYY-MM-DD (2026-99-99 is not). */
export function isIsoDate(text: string): boolean {
  if (!ISO_DATE.test(text)) return false;
  const d = new Date(`${text}T00:00:00Z`);
  return !Number.isNaN(d.getTime()) && d.toISOString().slice(0, 10) === text;
}

/** Rules of the family registry: unique ids, two anchors, each with a url and a read date. Pure, so tests can feed it broken rows. */
export function familyProblems(rows: readonly ControlFamily[] = families): string[] {
  const problems: string[] = [];
  const ids = new Set<string>();
  rows.forEach((f, i) => {
    const at = `families ${f.id}`;
    if (!KEBAB.test(f.id)) problems.push(`${at}: id must be lower-case kebab`);
    if (ids.has(f.id)) problems.push(`${at}: duplicate id`);
    ids.add(f.id);
    if (f.order !== i + 1) problems.push(`${at}: order ${f.order}, expected ${i + 1}`);
    if (!f.title.trim() || !f.definition.trim() || !f.excludes.trim()) problems.push(`${at}: empty title, definition or excludes`);
    if (f.anchors.length < 2) problems.push(`${at}: needs at least two anchors, has ${f.anchors.length}`);
    for (const a of f.anchors) {
      const label = `${at}: anchor ${a.framework} ${a.ref}`;
      if (!a.framework.trim() || !a.ref.trim()) problems.push(`${label}: empty framework or ref`);
      if (!/^https?:\/\//.test(a.url)) problems.push(`${label}: no absolute url`);
      if (!isIsoDate(a.read)) problems.push(`${label}: no read date (YYYY-MM-DD)`);
    }
  });
  return problems;
}

/** How a control is classified (see CLASSIFICATION above). */
export interface Classification {
  family: string;
  secondaryFamilies?: readonly string[];
  appliesTo: readonly Actor[];
}

/** mappingsReviewed of the 93 controls classified here: ./index.ts CONTROLS_AS_OF when their mappings were last reviewed. */
export const CLASSIFIED_MAPPINGS_REVIEWED = '2026-09-26';

export const classification: Readonly<Record<string, Classification>> = {
  'AIGE-CTL-EVAL-001': { family: 'agent-controls', secondaryFamilies: ['evaluation-and-testing'], appliesTo: ['provider', 'gpai-provider'] },
  'AIGE-CTL-EVAL-002': { family: 'agent-controls', secondaryFamilies: ['ai-security'], appliesTo: ['provider', 'gpai-provider'] },
  'AIGE-CTL-EVAL-003': { family: 'agent-controls', secondaryFamilies: ['ai-security'], appliesTo: ['provider', 'gpai-provider'] },
  'AIGE-CTL-EVAL-004': { family: 'agent-controls', appliesTo: ['provider', 'gpai-provider'] },
  'AIGE-CTL-EVAL-005': { family: 'monitoring-and-logging', secondaryFamilies: ['agent-controls'], appliesTo: ['provider', 'gpai-provider'] },
  'AIGE-CTL-EVAL-006': { family: 'agent-controls', secondaryFamilies: ['incidents-and-shutdown'], appliesTo: ['provider', 'gpai-provider'] },
  'AIGE-CTL-EVAL-007': { family: 'incidents-and-shutdown', secondaryFamilies: ['documentation-and-evidence'], appliesTo: ['provider', 'gpai-provider'] },
  'AIGE-CTL-EVAL-008': { family: 'evaluation-and-testing', secondaryFamilies: ['documentation-and-evidence'], appliesTo: ['provider', 'gpai-provider'] },
  'AIGE-CTL-EVAL-009': { family: 'evaluation-and-testing', appliesTo: ['provider', 'gpai-provider'] },
  'AIGE-CTL-AGENT-001': { family: 'inventory', secondaryFamilies: ['agent-controls'], appliesTo: ['provider', 'deployer'] },
  'AIGE-CTL-AGENT-002': { family: 'agent-controls', appliesTo: ['provider', 'deployer'] },
  'AIGE-CTL-AGENT-003': { family: 'agent-controls', secondaryFamilies: ['human-oversight'], appliesTo: ['provider', 'deployer'] },
  'AIGE-CTL-AGENT-004': { family: 'monitoring-and-logging', secondaryFamilies: ['agent-controls'], appliesTo: ['provider', 'deployer'] },
  'AIGE-CTL-AGENT-005': { family: 'agent-controls', appliesTo: ['provider', 'deployer'] },
  'AIGE-CTL-AGENT-006': { family: 'agent-controls', secondaryFamilies: ['human-oversight'], appliesTo: ['provider', 'deployer'] },
  'AIGE-CTL-AGENT-007': { family: 'agent-controls', secondaryFamilies: ['ai-security'], appliesTo: ['provider', 'deployer'] },
  'AIGE-CTL-AGENT-008': { family: 'agent-controls', appliesTo: ['provider', 'deployer'] },
  'AIGE-CTL-AGENT-009': { family: 'agent-controls', secondaryFamilies: ['human-oversight'], appliesTo: ['provider', 'deployer'] },
  'AIGE-CTL-AGENT-010': { family: 'agent-controls', secondaryFamilies: ['incidents-and-shutdown'], appliesTo: ['provider', 'deployer'] },
  'AIGE-CTL-AGENT-011': { family: 'incidents-and-shutdown', secondaryFamilies: ['agent-controls'], appliesTo: ['provider', 'deployer'] },
  'AIGE-CTL-AGENT-012': { family: 'monitoring-and-logging', secondaryFamilies: ['agent-controls', 'human-oversight'], appliesTo: ['provider', 'deployer'] },
  'AIGE-CTL-AGENT-013': { family: 'evaluation-and-testing', secondaryFamilies: ['agent-controls'], appliesTo: ['provider', 'deployer'] },
  'AIGE-CTL-AGENT-014': { family: 'agent-controls', secondaryFamilies: ['human-oversight'], appliesTo: ['provider', 'deployer'] },
  'AIGE-CTL-AGENT-015': { family: 'agent-controls', secondaryFamilies: ['human-oversight'], appliesTo: ['provider', 'deployer'] },
  'AIGE-CTL-AGENT-016': { family: 'agent-controls', secondaryFamilies: ['ai-security'], appliesTo: ['provider', 'deployer'] },
  'AIGE-CTL-AGENT-017': { family: 'agent-controls', secondaryFamilies: ['data-and-privacy'], appliesTo: ['provider', 'deployer'] },
  'AIGE-CTL-AGENT-018': { family: 'third-party', secondaryFamilies: ['ai-security'], appliesTo: ['provider', 'deployer'] },
  'AIGE-CTL-AGENT-019': { family: 'agent-controls', secondaryFamilies: ['ai-security'], appliesTo: ['provider', 'deployer'] },
  'AIGE-CTL-AGENT-020': { family: 'agent-controls', appliesTo: ['provider', 'deployer'] },
  'AIGE-CTL-AGENT-021': { family: 'agent-controls', secondaryFamilies: ['ai-security'], appliesTo: ['provider', 'deployer'] },
  'AIGE-CTL-AGENT-022': { family: 'agent-controls', secondaryFamilies: ['ai-security'], appliesTo: ['provider', 'deployer'] },
  'AIGE-CTL-AGENT-023': { family: 'agent-controls', secondaryFamilies: ['ai-security'], appliesTo: ['provider', 'deployer'] },
  'AIGE-CTL-AGENT-024': { family: 'data-and-privacy', secondaryFamilies: ['agent-controls'], appliesTo: ['provider', 'deployer'] },
  'AIGE-CTL-AGENT-025': { family: 'agent-controls', secondaryFamilies: ['governance'], appliesTo: ['provider', 'deployer'] },
  'AIGE-CTL-AGENT-026': { family: 'third-party', secondaryFamilies: ['agent-controls'], appliesTo: ['provider', 'deployer'] },
  'AIGE-CTL-AGENT-027': { family: 'data-and-privacy', secondaryFamilies: ['inventory', 'risk-and-impact'], appliesTo: ['provider', 'deployer'] },
  'AIGE-CTL-AGENT-028': { family: 'lifecycle-and-change', secondaryFamilies: ['agent-controls'], appliesTo: ['provider', 'deployer'] },
  'AIGE-CTL-AGENT-029': { family: 'monitoring-and-logging', appliesTo: ['provider', 'deployer'] },
  'AIGE-CTL-AGENT-030': { family: 'human-oversight', secondaryFamilies: ['monitoring-and-logging'], appliesTo: ['provider', 'deployer'] },
  'AIGE-CTL-AGENT-031': { family: 'transparency', appliesTo: ['provider', 'deployer'] },
  'AIGE-CTL-AGENT-032': { family: 'human-oversight', secondaryFamilies: ['agent-controls'], appliesTo: ['provider', 'deployer'] },
  'AIGE-CTL-AGENT-033': { family: 'agent-controls', secondaryFamilies: ['human-oversight'], appliesTo: ['provider', 'deployer'] },
  'AIGE-CTL-AGENT-034': { family: 'human-oversight', secondaryFamilies: ['monitoring-and-logging'], appliesTo: ['provider', 'deployer'] },
  'AIGE-CTL-AGENT-035': { family: 'monitoring-and-logging', secondaryFamilies: ['agent-controls'], appliesTo: ['provider', 'deployer'] },
  'AIGE-CTL-AGENT-036': { family: 'agent-controls', secondaryFamilies: ['ai-security'], appliesTo: ['provider', 'deployer'] },
  'AIGE-CTL-AGENT-037': { family: 'agent-controls', secondaryFamilies: ['data-and-privacy'], appliesTo: ['provider', 'deployer'] },
  'AIGE-CTL-AGENT-038': { family: 'agent-controls', appliesTo: ['provider', 'deployer'] },
  'AIGE-CTL-AGENT-039': { family: 'evaluation-and-testing', secondaryFamilies: ['agent-controls'], appliesTo: ['provider', 'deployer'] },
  'AIGE-CTL-AGENT-040': { family: 'transparency', secondaryFamilies: ['rights-and-redress'], appliesTo: ['provider', 'deployer'] },
  'AIGE-CTL-AGENT-041': { family: 'agent-controls', secondaryFamilies: ['human-oversight'], appliesTo: ['provider', 'deployer'] },
  'AIGE-CTL-AGENT-042': { family: 'risk-and-impact', secondaryFamilies: ['agent-controls', 'ai-security'], appliesTo: ['provider', 'deployer'] },
  'AIGE-CTL-DATA-001': { family: 'data-and-privacy', appliesTo: ['provider'] },
  'AIGE-CTL-DATA-002': { family: 'data-and-privacy', secondaryFamilies: ['documentation-and-evidence'], appliesTo: ['provider'] },
  'AIGE-CTL-DATA-003': { family: 'data-and-privacy', secondaryFamilies: ['documentation-and-evidence'], appliesTo: ['provider', 'gpai-provider'] },
  'AIGE-CTL-DATA-004': { family: 'data-and-privacy', secondaryFamilies: ['risk-and-impact'], appliesTo: ['provider'] },
  'AIGE-CTL-DATA-005': { family: 'data-and-privacy', appliesTo: ['provider'] },
  'AIGE-CTL-DATA-006': { family: 'data-and-privacy', appliesTo: ['provider'] },
  'AIGE-CTL-DATA-007': { family: 'data-and-privacy', secondaryFamilies: ['fairness'], appliesTo: ['provider'] },
  'AIGE-CTL-DATA-008': { family: 'data-and-privacy', secondaryFamilies: ['fairness', 'evaluation-and-testing'], appliesTo: ['provider'] },
  'AIGE-CTL-DATA-009': { family: 'ai-security', secondaryFamilies: ['data-and-privacy'], appliesTo: ['provider'] },
  'AIGE-CTL-DATA-010': { family: 'data-and-privacy', secondaryFamilies: ['documentation-and-evidence'], appliesTo: ['provider'] },
  'AIGE-CTL-DATA-011': { family: 'data-and-privacy', secondaryFamilies: ['lifecycle-and-change'], appliesTo: ['provider'] },
  'AIGE-CTL-DATA-012': { family: 'data-and-privacy', secondaryFamilies: ['inventory'], appliesTo: ['provider'] },
  'AIGE-CTL-ASSURE-001': { family: 'evaluation-and-testing', secondaryFamilies: ['documentation-and-evidence'], appliesTo: ['provider'] },
  'AIGE-CTL-ASSURE-002': { family: 'evaluation-and-testing', secondaryFamilies: ['lifecycle-and-change'], appliesTo: ['provider', 'gpai-provider'] },
  'AIGE-CTL-ASSURE-003': { family: 'documentation-and-evidence', secondaryFamilies: ['evaluation-and-testing'], appliesTo: ['provider'] },
  'AIGE-CTL-ASSURE-004': { family: 'documentation-and-evidence', appliesTo: ['provider'] },
  'AIGE-CTL-ASSURE-005': { family: 'documentation-and-evidence', secondaryFamilies: ['monitoring-and-logging'], appliesTo: ['provider'] },
  'AIGE-CTL-ASSURE-006': { family: 'documentation-and-evidence', appliesTo: ['provider'] },
  'AIGE-CTL-ASSURE-007': { family: 'documentation-and-evidence', appliesTo: ['provider'] },
  'AIGE-CTL-ASSURE-008': { family: 'documentation-and-evidence', secondaryFamilies: ['monitoring-and-logging'], appliesTo: ['provider'] },
  'AIGE-CTL-ASSURE-009': { family: 'documentation-and-evidence', secondaryFamilies: ['governance'], appliesTo: ['provider'] },
  'AIGE-CTL-ASSURE-010': { family: 'ai-security', appliesTo: ['provider', 'gpai-provider'] },
  'AIGE-CTL-ASSURE-011': { family: 'ai-security', secondaryFamilies: ['third-party'], appliesTo: ['provider', 'gpai-provider'] },
  'AIGE-CTL-ASSURE-012': { family: 'third-party', secondaryFamilies: ['ai-security', 'inventory'], appliesTo: ['provider', 'gpai-provider'] },
  'AIGE-CTL-DEPLOY-001': { family: 'lifecycle-and-change', secondaryFamilies: ['risk-and-impact', 'documentation-and-evidence'], appliesTo: ['deployer'] },
  'AIGE-CTL-DEPLOY-002': { family: 'transparency', secondaryFamilies: ['third-party'], appliesTo: ['deployer'] },
  'AIGE-CTL-DEPLOY-003': { family: 'human-oversight', secondaryFamilies: ['literacy-and-use-policy'], appliesTo: ['deployer'] },
  'AIGE-CTL-DEPLOY-004': { family: 'lifecycle-and-change', secondaryFamilies: ['governance', 'risk-and-impact'], appliesTo: ['deployer'] },
  'AIGE-CTL-DEPLOY-005': { family: 'lifecycle-and-change', appliesTo: ['deployer'] },
  'AIGE-CTL-DEPLOY-006': { family: 'lifecycle-and-change', secondaryFamilies: ['third-party'], appliesTo: ['deployer'] },
  'AIGE-CTL-DEPLOY-007': { family: 'risk-and-impact', secondaryFamilies: ['lifecycle-and-change'], appliesTo: ['deployer'] },
  'AIGE-CTL-DEPLOY-008': { family: 'monitoring-and-logging', appliesTo: ['deployer'] },
  'AIGE-CTL-DEPLOY-009': { family: 'fairness', secondaryFamilies: ['monitoring-and-logging'], appliesTo: ['deployer'] },
  'AIGE-CTL-DEPLOY-010': { family: 'monitoring-and-logging', secondaryFamilies: ['documentation-and-evidence'], appliesTo: ['deployer'] },
  'AIGE-CTL-DEPLOY-011': { family: 'incidents-and-shutdown', appliesTo: ['provider', 'deployer'] },
  'AIGE-CTL-DEPLOY-012': { family: 'incidents-and-shutdown', secondaryFamilies: ['lifecycle-and-change'], appliesTo: ['deployer'] },
  'AIGE-CTL-DEPLOY-013': { family: 'inventory', secondaryFamilies: ['governance'], appliesTo: ['deployer'] },
  'AIGE-CTL-DEPLOY-014': { family: 'literacy-and-use-policy', secondaryFamilies: ['data-and-privacy', 'third-party'], appliesTo: ['deployer'] },
  'AIGE-CTL-DEPLOY-015': { family: 'lifecycle-and-change', secondaryFamilies: ['data-and-privacy'], appliesTo: ['deployer'] },
  'AIGE-CTL-DEPLOY-016': { family: 'literacy-and-use-policy', secondaryFamilies: ['human-oversight'], appliesTo: ['deployer'] },
  'AIGE-CTL-DEPLOY-017': { family: 'monitoring-and-logging', secondaryFamilies: ['evaluation-and-testing'], appliesTo: ['deployer'] },
  'AIGE-CTL-DEPLOY-018': { family: 'governance', secondaryFamilies: ['third-party'], appliesTo: ['deployer'] },
};

/**
 * The control with the family, secondary families and actors of the table; a
 * control that declares its own keeps them. Throws on a control with neither a
 * row nor its own family and actors, so an unclassified control fails the build.
 */
export function withClassification(control: Control): ClassifiedControl {
  const c = classification[control.id];
  if (!c && (control.family === undefined || control.appliesTo === undefined)) {
    throw new Error(`families: control ${control.id} has no classification row`);
  }
  return {
    ...control,
    family: control.family ?? c!.family,
    secondaryFamilies: control.secondaryFamilies ?? c?.secondaryFamilies,
    appliesTo: control.appliesTo ?? c!.appliesTo,
    mappingsReviewed: control.mappingsReviewed ?? CLASSIFIED_MAPPINGS_REVIEWED,
  };
}
