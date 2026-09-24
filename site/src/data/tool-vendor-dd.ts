// tool-vendor-dd.ts: the data behind /toolkit/vendor-due-diligence. A tiered,
// evidence-first request an AI governance engineer sends to the supplier of an
// AI product or model before it reaches production: the gate of the
// Vendor / Model Due-Diligence Gate pattern (bok/patterns/vendor-model-due-diligence-gate.md)
// and of chapter 15 ("Build, buy or adapt", "Vendor contracts and licence terms").
//
// The questions are this site's own wording. Each one asks for an artefact, not
// an opinion, and is cross-referenced to crosswalk topics (src/data/crosswalk.ts)
// and to CSA AI Controls Matrix control ids only; the page resolves each id
// against the crosswalk's CSA AICM refs and fails the build on an id the
// crosswalk does not carry, so no control id appears here that the crosswalk
// has not verified. The contract-clause checklist is drawn from
// src/data/contracts.ts by clause id. Mappings are illustrative, not a claim of
// conformity; the questionnaire is not legal advice.
//
// The tiering rule (`vendorTierRule`) is the tool's own, stated on the page:
// the tier is the highest reading across use, data, autonomy and regulatory
// context, and two high readings make it critical.

import { topics as crosswalkTopics, refs as crosswalkRefs } from './crosswalk';
import { clauses as contractClauses, licenceTypes } from './contracts';

export const vendorDdVersion = '2026-09-24';

export type VendorTier = 'low' | 'medium' | 'high' | 'critical';
export const tierOrder: readonly VendorTier[] = ['low', 'medium', 'high', 'critical'];

export interface VendorOption {
  id: string;
  label: string;
  /** Tier this answer sets on its own (1 low ... 4 critical). */
  score?: 1 | 2 | 3 | 4;
}

export const supplyTypes: readonly VendorOption[] = [
  { id: 'saas', label: 'A SaaS or software product with AI features' },
  { id: 'model-api', label: 'A hosted model reached by API (for example a general-purpose model)' },
  { id: 'agent', label: "A vendor's agent that acts in your systems" },
  { id: 'open-weights', label: 'An open-weight model you run yourself' },
  { id: 'component', label: 'An AI component or tool (an MCP server, a guardrail, an eval service)' },
];

export const useTiers: readonly VendorOption[] = [
  { id: 'internal', label: 'Internal productivity; no decisions about people', score: 1 },
  { id: 'customer', label: 'Customer-facing: people outside the organisation read or use its output', score: 2 },
  {
    id: 'people',
    label: 'It decides, or recommends a decision, about people (hiring, credit, benefits, access to services)',
    score: 3,
  },
  {
    id: 'safety',
    label: 'Safety component of a regulated product, or critical infrastructure operation',
    score: 4,
  },
];

export const dataClasses: readonly VendorOption[] = [
  { id: 'public', label: 'Public information only', score: 1 },
  { id: 'internal', label: 'Internal, non-personal information', score: 1 },
  { id: 'confidential', label: 'Confidential business information or trade secrets', score: 2 },
  { id: 'personal', label: 'Personal data', score: 2 },
  { id: 'special', label: 'Special-category or otherwise regulated data (health, biometrics, financial)', score: 3 },
];

export const autonomyLevels: readonly VendorOption[] = [
  { id: 'none', label: 'Answers only: no access to your systems', score: 1 },
  { id: 'reads', label: 'Reads your systems or data through tools or connectors', score: 2 },
  { id: 'writes', label: 'Writes to your systems of record (creates, changes or deletes)', score: 3 },
  { id: 'external', label: 'Acts outside: sends messages, makes payments, publishes', score: 3 },
];

export const jurisdictions: readonly VendorOption[] = [
  { id: 'eu', label: 'EU or EEA' },
  { id: 'uk', label: 'United Kingdom' },
  { id: 'us', label: 'United States' },
  { id: 'other', label: 'Elsewhere' },
];

export const sectors: readonly VendorOption[] = [
  { id: 'dora', label: 'We are a financial entity under DORA' },
  { id: 'nis2', label: 'We are an essential or important entity under NIS2' },
  { id: 'gpai', label: 'The product is built on a general-purpose AI model' },
];

/** The rule, as the page states it. */
export const vendorTierRule =
  'The tier is the highest reading across four dimensions: what the use decides, the most sensitive data the supplier will see, the autonomy and tool access it gets, and the regulatory context. Two or more high readings make it critical. This rule is the tool\'s own and illustrative; write your own thresholds into your third-party AI policy.';

/** When a question (or a clause) is included. All present keys must hold. */
export interface VendorCondition {
  /** Minimum tier. */
  minTier?: VendorTier;
  /** Any of these supply types. */
  supply?: readonly string[];
  /** Any of these use tiers. */
  use?: readonly string[];
  /** Any of these data classes. */
  data?: readonly string[];
  /** Any of these autonomy levels. */
  autonomy?: readonly string[];
  /** Any of these jurisdictions. */
  jurisdiction?: readonly string[];
  /** Any of these sector flags. */
  sector?: readonly string[];
  /** Alternatives: the question also applies when any of these conditions holds. */
  or?: readonly VendorCondition[];
}

export type ResponseField =
  | 'provider_role'
  | 'eu_ai_act_category'
  | 'product.model_ids'
  | 'documentation.model_card'
  | 'documentation.instructions_for_use'
  | 'documentation.downstream_information'
  | 'training_on_customer_data'
  | 'data_processing.locations'
  | 'data_processing.retention'
  | 'data_processing.subprocessors'
  | 'security.certifications'
  | 'evaluations'
  | 'incident_notification'
  | 'change_notification'
  | 'audit_rights'
  | 'logging_support'
  | 'copyright_policy'
  | 'training_content_summary'
  | 'aibom'
  | 'exit';

export interface VendorQuestion {
  /** Stable id: VDD-nn. */
  id: string;
  area: string;
  /** The request, addressed to the supplier. */
  ask: string;
  /** The artefact that answers it. */
  artefact: string;
  /** Crosswalk topic ids. */
  topics: readonly string[];
  /** CSA AICM control ids (must exist in the crosswalk's CSA AICM refs). */
  aicm: readonly string[];
  /** Field of the vendor-due-diligence-response.v1 record the answer fills. */
  field?: ResponseField;
  /** contracts.ts clause ids the answer should be anchored in. */
  clauses?: readonly string[];
  /** When it is asked; absent = always. */
  when?: VendorCondition;
}

const AGENTIC = ['reads', 'writes', 'external'];
const ACTING = ['writes', 'external'];

export const vendorQuestions: readonly VendorQuestion[] = [
  // ---- Role and scope ----------------------------------------------------------
  {
    id: 'VDD-01',
    area: 'Role and scope',
    ask: 'State your role for this product under the EU AI Act (provider, GPAI model provider, component supplier or reseller), and send the document in which you record that decision.',
    artefact: 'Role statement per product',
    topics: ['governance-accountability', 'supply-chain'],
    aicm: ['GRC-06'],
    field: 'provider_role',
    clauses: ['role-allocation'],
  },
  {
    id: 'VDD-02',
    area: 'Role and scope',
    ask: 'Send your own risk classification of the product under the EU AI Act, with the intended purposes it covers and the reasoning behind it.',
    artefact: 'Classification record',
    topics: ['risk-management', 'conformity-assessment'],
    aicm: ['GRC-02'],
    field: 'eu_ai_act_category',
  },
  {
    id: 'VDD-03',
    area: 'Role and scope',
    ask: 'List every model inside the product (name, version, provider), upstream foundation models included, and explain how you tell us when one of them changes.',
    artefact: 'Model inventory for the product',
    topics: ['supply-chain', 'inventory-registration'],
    aicm: ['STA-08', 'STA-10'],
    field: 'product.model_ids',
    clauses: ['sub-processors', 'change-deprecation'],
  },
  // ---- Documentation -------------------------------------------------------------
  {
    id: 'VDD-04',
    area: 'Documentation',
    ask: 'Send the model or system card for the version we will use: intended use, known limitations and failure modes, and evaluation results.',
    artefact: 'Model or system card',
    topics: ['documentation-transparency'],
    aicm: ['MDS-03', 'MDS-04'],
    field: 'documentation.model_card',
    clauses: ['documentation'],
  },
  {
    id: 'VDD-05',
    area: 'Documentation',
    ask: 'Send the instructions for use: the human-oversight measures, the input data the system expects, and the metrics and thresholds a deployer should monitor.',
    artefact: 'Instructions for use',
    topics: ['documentation-transparency', 'human-oversight'],
    aicm: ['MDS-04', 'GRC-15'],
    field: 'documentation.instructions_for_use',
    clauses: ['documentation'],
    when: { use: ['people', 'safety'], or: [{ minTier: 'high' }] },
  },
  {
    id: 'VDD-06',
    area: 'Documentation',
    ask: 'Send an AI bill of materials (for example a CycloneDX ML-BOM or an SPDX AI profile) naming the models, datasets and libraries in the product and their licences, or say that none exists.',
    artefact: 'AIBOM',
    topics: ['supply-chain', 'inventory-registration'],
    aicm: ['STA-09'],
    field: 'aibom',
  },
  {
    id: 'VDD-07',
    area: 'Documentation',
    ask: 'Send the documentation you give downstream providers about the model: capabilities, limitations and what an integrator needs to know.',
    artefact: 'Downstream-provider documentation',
    topics: ['gpai-foundation-models', 'documentation-transparency'],
    aicm: ['MDS-03'],
    field: 'documentation.downstream_information',
    when: { supply: ['model-api', 'open-weights'], or: [{ sector: ['gpai'] }] },
  },
  // ---- Data ------------------------------------------------------------------------
  {
    id: 'VDD-08',
    area: 'Data',
    ask: 'Confirm in writing whether our inputs, outputs, files or logs train or improve any model, what the default setting is, and how we can read that setting back.',
    artefact: 'Written no-training commitment and the setting',
    topics: ['privacy-data-protection', 'data-governance'],
    aicm: ['DSP-08'],
    field: 'training_on_customer_data',
    clauses: ['no-training'],
  },
  {
    id: 'VDD-09',
    area: 'Data',
    ask: 'State the retention period for prompts, outputs, files and logs, per data type and including any abuse-monitoring copies, and send a sample deletion confirmation.',
    artefact: 'Retention schedule and deletion confirmation',
    topics: ['privacy-data-protection'],
    aicm: ['DSP-02'],
    field: 'data_processing.retention',
    clauses: ['retention'],
  },
  {
    id: 'VDD-10',
    area: 'Data',
    ask: 'Send the current list of sub-processors (hosting, model providers, labelling, support), where it is published, and how you notify changes to it.',
    artefact: 'Dated sub-processor list',
    topics: ['supply-chain', 'privacy-data-protection'],
    aicm: ['STA-10'],
    field: 'data_processing.subprocessors',
    clauses: ['sub-processors'],
  },
  {
    id: 'VDD-11',
    area: 'Data',
    ask: 'State where inference, storage and support access take place, and the transfer mechanism for any personal data that leaves the region.',
    artefact: 'Processing locations and transfer mechanism',
    topics: ['privacy-data-protection'],
    aicm: ['DSP-08'],
    field: 'data_processing.locations',
    clauses: ['residency'],
  },
  {
    id: 'VDD-12',
    area: 'Data',
    ask: 'Send the public summary of the content used to train the model.',
    artefact: 'Training-content summary',
    topics: ['gpai-foundation-models', 'data-governance', 'ip-copyright'],
    aicm: ['DSP-20'],
    field: 'training_content_summary',
    when: { supply: ['model-api', 'open-weights'], or: [{ sector: ['gpai'] }] },
  },
  {
    id: 'VDD-13',
    area: 'Data',
    ask: 'Send your copyright policy for the model, including how you identify and respect rights reservations over the content you train on.',
    artefact: 'Copyright policy',
    topics: ['ip-copyright', 'gpai-foundation-models'],
    aicm: ['DSP-20'],
    field: 'copyright_policy',
    when: { supply: ['model-api', 'open-weights'], or: [{ sector: ['gpai'] }] },
  },
  {
    id: 'VDD-14',
    area: 'Data',
    ask: 'Send the data card or datasheet for the training and evaluation data you can disclose: sources, licences, collection period, known gaps, and the checks for poisoned or unlawful content.',
    artefact: 'Data card',
    topics: ['data-governance'],
    aicm: ['DSP-20', 'DSP-21'],
    when: { minTier: 'high' },
  },
  // ---- Evaluation and security ---------------------------------------------------
  {
    id: 'VDD-15',
    area: 'Evaluation and security',
    ask: 'Send the evaluation reports for tasks like ours: method, datasets, metrics, results, date and the model version tested.',
    artefact: 'Evaluation reports',
    topics: ['robustness-security-evals'],
    aicm: ['AIS-05'],
    field: 'evaluations',
    clauses: ['warranties'],
  },
  {
    id: 'VDD-16',
    area: 'Evaluation and security',
    ask: 'Send a summary of the latest red-team or adversarial testing: scope, who ran it and how independent they were, findings by severity, and what was fixed.',
    artefact: 'Red-team summary',
    topics: ['robustness-security-evals'],
    aicm: ['MDS-06', 'MDS-07'],
    field: 'evaluations',
    clauses: ['security'],
    when: { minTier: 'high' },
  },
  {
    id: 'VDD-17',
    area: 'Evaluation and security',
    ask: 'Send the bias and fairness testing you have run for uses like ours: groups, metrics, results, and your commitment to remediate what testing finds.',
    artefact: 'Bias testing report',
    topics: ['fairness-non-discrimination'],
    aicm: ['GRC-11'],
    field: 'evaluations',
    when: { use: ['people'] },
  },
  {
    id: 'VDD-18',
    area: 'Evaluation and security',
    ask: 'Send your security certificates with their scope statements, showing whether the AI service is in scope, and the date of the last independent penetration test.',
    artefact: 'Certificates with scope; test date',
    topics: ['conformity-assessment', 'robustness-security-evals'],
    aicm: ['A&A-02'],
    field: 'security.certifications',
    clauses: ['security'],
  },
  {
    id: 'VDD-19',
    area: 'Evaluation and security',
    ask: 'Describe the input and output controls in the service (prompt-injection defences, output filtering), which of them we can configure, and the events they log.',
    artefact: 'Guardrail description and event log sample',
    topics: ['runtime-guardrails'],
    aicm: ['TVM-13', 'AIS-09', 'AIS-10'],
  },
  {
    id: 'VDD-20',
    area: 'Evaluation and security',
    ask: 'Confirm that we may run our own boundary evaluations and agreed red-team windows against the service, and under what conditions.',
    artefact: 'Testing permission in writing',
    topics: ['robustness-security-evals'],
    aicm: ['AIS-05'],
    clauses: ['audit-eval-access'],
  },
  {
    id: 'VDD-21',
    area: 'Evaluation and security',
    ask: 'Send the independent audit or assurance reports you share with customers, and how often they are renewed.',
    artefact: 'Audit reports and cadence',
    topics: ['conformity-assessment'],
    aicm: ['A&A-02', 'A&A-04'],
    field: 'audit_rights',
    clauses: ['audit-eval-access'],
  },
  // ---- Operation, incidents and change ----------------------------------------------
  {
    id: 'VDD-22',
    area: 'Incidents and change',
    ask: 'State, in hours, the window within which you notify us of security incidents, personal-data breaches and serious model failures, the channel you use, and send a sample notice.',
    artefact: 'Incident-notice SLA in hours',
    topics: ['incident-monitoring'],
    aicm: ['SEF-07', 'SEF-08'],
    field: 'incident_notification',
    clauses: ['incident-notice'],
  },
  {
    id: 'VDD-23',
    area: 'Incidents and change',
    ask: 'Explain how you support our own reporting clocks: which facts you give us about an incident, how fast, and a named contact for regulator enquiries.',
    artefact: 'Incident cooperation procedure',
    topics: ['incident-monitoring'],
    aicm: ['SEF-07'],
    clauses: ['incident-notice', 'role-allocation'],
    when: { minTier: 'medium', or: [{ sector: ['dora', 'nis2'] }] },
  },
  {
    id: 'VDD-24',
    area: 'Incidents and change',
    ask: 'State the notice, in days, you give before a material change (model version updates and deprecations included), and whether we can pin a version.',
    artefact: 'Change and deprecation terms',
    topics: ['deployment-change-decommissioning'],
    aicm: ['CCC-01'],
    field: 'change_notification',
    clauses: ['change-deprecation'],
  },
  {
    id: 'VDD-25',
    area: 'Incidents and change',
    ask: 'State which logs we receive or can export (inputs, outputs, tool calls, timestamps, model version), in what format, and for how long.',
    artefact: 'Log export description and sample',
    topics: ['logging-traceability'],
    aicm: ['LOG-09', 'LOG-12'],
    field: 'logging_support',
    clauses: ['retention'],
  },
  {
    id: 'VDD-26',
    area: 'Incidents and change',
    ask: 'Describe the features that let our staff review, override or stop an output or an action of the system.',
    artefact: 'Oversight features',
    topics: ['human-oversight'],
    aicm: ['GRC-15'],
    when: { use: ['people', 'safety'], or: [{ autonomy: ACTING }] },
  },
  {
    id: 'VDD-27',
    area: 'Incidents and change',
    ask: 'Describe what explanation of an individual output or decision the service can produce, and in what form.',
    artefact: 'Explanation capability',
    topics: ['explainability'],
    aicm: ['GRC-13', 'GRC-14'],
    when: { use: ['people'] },
  },
  {
    id: 'VDD-28',
    area: 'Incidents and change',
    ask: 'Send the version of your acceptable-use policy that will bind us, how you notify changes to it, and confirm that our intended use is permitted.',
    artefact: 'Acceptable-use policy version',
    topics: ['prohibited-practices'],
    aicm: ['GRC-09'],
    clauses: ['acceptable-use'],
  },
  {
    id: 'VDD-29',
    area: 'Incidents and change',
    ask: 'Send the service levels: availability, latency, rate limits, and what happens on an outage or a forced deprecation.',
    artefact: 'SLA',
    topics: ['deployment-change-decommissioning'],
    aicm: [],
    clauses: ['service-levels'],
  },
  {
    id: 'VDD-30',
    area: 'Incidents and change',
    ask: 'Describe how we leave: return of our data (days, format), of fine-tunes, adapters and embeddings, and a deletion certificate afterwards.',
    artefact: 'Exit terms',
    topics: ['deployment-change-decommissioning'],
    aicm: ['DSP-02'],
    field: 'exit',
    clauses: ['exit'],
  },
  // ---- Agents and tool access ----------------------------------------------------------
  {
    id: 'VDD-31',
    area: 'Agents and tool access',
    ask: "List the identities, permissions and scopes the product's agent or integration needs in our systems, their lifetime, and whether it acts under its own identity or under a user's delegated token.",
    artefact: 'Identity and scope list',
    topics: ['agent-identity-autonomy'],
    aicm: ['IAM-18', 'IAM-12', 'AIS-11'],
    when: { autonomy: AGENTIC, or: [{ supply: ['agent'] }] },
  },
  {
    id: 'VDD-32',
    area: 'Agents and tool access',
    ask: "List the tools and MCP servers the agent can call, with publisher, version and a hash of each tool's definition, and how you notify a change to a definition.",
    artefact: 'Tool and MCP server manifest',
    topics: ['agent-identity-autonomy', 'supply-chain'],
    aicm: ['AIS-11', 'STA-09'],
    when: { autonomy: AGENTIC, or: [{ supply: ['agent', 'component'] }] },
  },
  {
    id: 'VDD-33',
    area: 'Agents and tool access',
    ask: 'Describe how our staff approve irreversible actions, how we suspend the agent or stop sending it traffic, and how long a stop takes.',
    artefact: 'Approval and suspension procedure',
    topics: ['human-oversight', 'agent-identity-autonomy'],
    aicm: ['GRC-15', 'IAM-18'],
    when: { autonomy: ACTING, or: [{ supply: ['agent'] }] },
  },
  {
    id: 'VDD-34',
    area: 'Agents and tool access',
    ask: 'Send a sample trace of one agent task: the plan, each tool call with its parameters, any approval, and the result.',
    artefact: 'Sample agent trace',
    topics: ['logging-traceability', 'agent-identity-autonomy'],
    aicm: ['LOG-12'],
    when: { autonomy: ACTING, or: [{ supply: ['agent'] }] },
  },
  // ---- Open weights ----------------------------------------------------------------------
  {
    id: 'VDD-35',
    area: 'Open weights',
    ask: "State the model's licence (family and version), the acceptable-use policy it incorporates, any scale threshold and any attribution or naming duty.",
    artefact: 'Licence and AUP versions',
    topics: ['ip-copyright', 'supply-chain'],
    aicm: ['STA-10'],
    when: { supply: ['open-weights'] },
  },
  {
    id: 'VDD-36',
    area: 'Open weights',
    ask: 'Send the file hashes or signatures of the weight files and name their serialisation format.',
    artefact: 'Weight hashes or signatures',
    topics: ['supply-chain', 'content-provenance'],
    aicm: ['MDS-09'],
    when: { supply: ['open-weights'] },
  },
  // ---- Risk transfer -----------------------------------------------------------------------
  {
    id: 'VDD-37',
    area: 'Risk transfer',
    ask: 'Send the IP indemnity terms with their conditions and exclusions, and the liability cap with its carve-outs.',
    artefact: 'Indemnity and liability terms',
    topics: ['ip-copyright', 'governance-accountability'],
    aicm: [],
    clauses: ['ip-indemnity', 'liability'],
    when: { minTier: 'high' },
  },
  {
    id: 'VDD-38',
    area: 'Risk transfer',
    ask: 'Send certificates of insurance showing cover for AI-related claims, with limits.',
    artefact: 'Certificates of insurance',
    topics: ['governance-accountability'],
    aicm: [],
    clauses: ['insurance'],
    when: { minTier: 'critical' },
  },
];

/** Which contract clauses the checklist includes, by clause id from contracts.ts. */
export const clauseRules: Readonly<Record<string, VendorCondition | 'always'>> = {
  'no-training': 'always',
  'input-output-rights': 'always',
  retention: 'always',
  'sub-processors': 'always',
  residency: { data: ['personal', 'special'], or: [{ jurisdiction: ['eu', 'uk'] }] },
  documentation: 'always',
  'audit-eval-access': { minTier: 'medium' },
  'change-deprecation': 'always',
  'incident-notice': 'always',
  'service-levels': { use: ['customer', 'people', 'safety'], or: [{ minTier: 'high' }] },
  'ip-indemnity': { minTier: 'medium' },
  warranties: { minTier: 'medium' },
  liability: { minTier: 'high' },
  'acceptable-use': 'always',
  'role-allocation': {
    jurisdiction: ['eu'],
    use: ['people', 'safety'],
    or: [{ jurisdiction: ['eu'], supply: ['model-api', 'open-weights'] }],
  },
  security: 'always',
  exit: 'always',
  insurance: { minTier: 'high' },
};

/** The schema's `provider_role` and `eu_ai_act_category` values, labelled. */
export const providerRoles = [
  { id: 'provider', label: 'Provider' },
  { id: 'gpai_provider', label: 'GPAI model provider' },
  { id: 'component_supplier', label: 'Component supplier' },
  { id: 'reseller', label: 'Reseller' },
  { id: 'other', label: 'Other' },
] as const;

export const aiActCategories = [
  { id: 'not_assessed', label: 'Not assessed' },
  { id: 'out_of_scope', label: 'Out of scope' },
  { id: 'minimal', label: 'Minimal risk' },
  { id: 'transparency', label: 'Transparency obligations' },
  { id: 'high_risk_annex_i', label: 'High-risk (Annex I)' },
  { id: 'high_risk_annex_iii', label: 'High-risk (Annex III)' },
  { id: 'gpai', label: 'GPAI model' },
  { id: 'gpai_systemic_risk', label: 'GPAI model with systemic risk' },
  { id: 'prohibited', label: 'Prohibited' },
] as const;

export const decisions = [
  { id: 'approve', label: 'Approve' },
  { id: 'approve_with_conditions', label: 'Approve with conditions' },
  { id: 'reject', label: 'Reject' },
] as const;

// ---- The island ------------------------------------------------------------------


/** CSA AICM id -> short title, from the crosswalk's verified refs. */
export function aicmTitles(): Map<string, string> {
  const map = new Map<string, string>();
  for (const ref of crosswalkRefs) {
    if (ref.framework === 'csa-aicm' && !map.has(ref.ref)) map.set(ref.ref, ref.title);
  }
  return map;
}

/** Everything the client needs, with every topic, control and clause id
 *  resolved; throws at build time on an id the crosswalk or contracts.ts
 *  does not carry. */
export function vendorDdData(siteUrl: string, notice: string, license: string) {
  const topicName = new Map(crosswalkTopics.map((topic) => [topic.id, topic.name]));
  const aicm = aicmTitles();
  const clauseById = new Map(contractClauses.map((clause) => [clause.id, clause]));
  const ids = new Set<string>();
  const questions = vendorQuestions.map((q) => {
    if (ids.has(q.id)) throw new Error(`tool-vendor-dd: duplicate question id ${q.id}`);
    ids.add(q.id);
    return {
      ...q,
      topics: q.topics.map((id) => {
        const name = topicName.get(id);
        if (!name) throw new Error(`tool-vendor-dd: ${q.id} names unknown crosswalk topic ${id}`);
        return { id, name };
      }),
      aicm: q.aicm.map((id) => {
        const title = aicm.get(id);
        if (!title) throw new Error(`tool-vendor-dd: ${q.id} names CSA AICM ${id}, absent from the crosswalk`);
        return { id, title };
      }),
      clauses: (q.clauses ?? []).map((id) => {
        if (!clauseById.has(id)) throw new Error(`tool-vendor-dd: ${q.id} names unknown clause ${id}`);
        return id;
      }),
    };
  });
  for (const id of Object.keys(clauseRules)) {
    if (!clauseById.has(id)) throw new Error(`tool-vendor-dd: clause rule for unknown clause ${id}`);
  }
  return {
    version: vendorDdVersion,
    notice,
    license,
    page: `${siteUrl}/toolkit/vendor-due-diligence`,
    schema: `${siteUrl}/schemas/vendor-due-diligence-response.v1.json`,
    tierRule: vendorTierRule,
    supplyTypes,
    useTiers,
    dataClasses,
    autonomyLevels,
    jurisdictions,
    sectors,
    questions,
    clauses: contractClauses.map((c) => ({
      id: c.id,
      clause: c.clause,
      redFlag: c.redFlag,
      fallback: c.fallback,
      evidence: c.evidence,
    })),
    clauseRules,
    licences: licenceTypes.map((l) => ({
      id: l.id,
      family: l.family,
      watch: l.watch,
      aibomFields: l.aibomFields,
    })),
  };
}
