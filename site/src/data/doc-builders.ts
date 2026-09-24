// doc-builders.ts: the data behind the three document builders of /toolkit
// (block w2-builders-a): the AI register entry, the impact assessment and the
// model card. Each builder writes a record that validates against a published
// schema in public/schemas; this module holds what the schemas cannot: the
// form (sections, labels, hints and field kinds, keyed by the schema's field
// paths), the field crosswalk to other regimes, the ISO/IEC 42005 clause list,
// the re-open triggers and the model card coverage checklist.
//
// The pages render all of it server-side (so the page works as a worksheet
// without JavaScript) and hand it to the client through the ToolShell JSON
// island; the client modules in public/toolkit build the forms from it.
//
// Field names of other regimes are copied from their primary sources as of
// 2026-09-24 (see the sources on each page): UK ATRS template v4.0, the Canada
// AIA questionnaire (canada-ca/aia-eia-js, survey-enfr.json), EU AI Act Annex
// VIII (Reg. (EU) 2024/1689, as amended by Reg. (EU) 2026/1744), the Hugging
// Face model card template and CycloneDX 1.7. ISO/IEC clause wording was not
// opened: ISO/IEC 42005 clause ids come from the INCITS/AI crosswalk against the
// DIS, and the ISO/IEC 42001 Statement of Applicability columns are marked for
// verification. Mappings are illustrative, not a claim of conformity.

import { patterns } from './patterns';

/** Date of the last verification pass over the field names and clause ids. */
export const buildersAsOf = '2026-09-24';

const SITE = 'https://aigovernanceengineer.com';

// ---- Form specs ----------------------------------------------------------------

export type FieldKind =
  | 'text'
  | 'textarea'
  | 'lines'
  | 'date'
  | 'datetime'
  | 'url'
  | 'email'
  | 'select'
  | 'bool'
  | 'int'
  | 'number'
  | 'group'
  | 'checks'
  | 'refs'
  | 'clauses';

export interface FieldSpec {
  /** Dotted path in the record (relative to the item inside a group). */
  path: string;
  label: string;
  kind: FieldKind;
  /** Short help under the control; the client falls back to the schema's description. */
  hint?: string;
  /** Required by the schema (shown in the label). */
  required?: boolean;
  /** select: [value, label]; checks: [value, label] presets. */
  options?: readonly (readonly [string, string])[];
  /** group: the fields of one item. */
  item?: readonly FieldSpec[];
  /** group: the noun for one item ("risk", "component"). */
  itemLabel?: string;
  /** group: prefix of an auto-assigned id in `idKey` ("R" gives R1, R2 ...). */
  idPrefix?: string;
  idKey?: string;
  /** refs: the group whose items this field points at, the key it stores and the key it shows. */
  source?: string;
  sourceKey?: string;
  sourceText?: string;
  /** checks: also accept free lines ("Other triggers"). */
  allowOther?: boolean;
  /** clauses: the clause rows to render, one text box each. */
  clauses?: readonly { clause: string; heading: string; hint: string }[];
  /** impact assessment: the assessment types the field applies to (all when absent). */
  showFor?: readonly string[];
  /** Placeholder text (an example, never a value). */
  placeholder?: string;
}

export interface SectionSpec {
  id: string;
  legend: string;
  hint?: string;
  fields: readonly FieldSpec[];
  showFor?: readonly string[];
}

const opts = (...pairs: [string, string][]): readonly (readonly [string, string])[] => pairs;

const EU_CATEGORY = opts(
  ['not_assessed', 'Not assessed yet'],
  ['out_of_scope', 'Out of scope of the Act'],
  ['minimal', 'Minimal risk'],
  ['transparency', 'Transparency obligations (Art. 50)'],
  ['high_risk_annex_i', 'High-risk, Annex I (product safety)'],
  ['high_risk_annex_iii', 'High-risk, Annex III (use case)'],
  ['gpai', 'General-purpose AI model'],
  ['gpai_systemic_risk', 'GPAI model with systemic risk'],
  ['prohibited', 'Prohibited practice (Art. 5)'],
);

const MARKET_STATUS = opts(
  ['not_yet_placed', 'Not yet placed on the market or in service'],
  ['on_the_market', 'On the market'],
  ['in_service', 'In service'],
  ['withdrawn', 'No longer on the market or in service'],
  ['recalled', 'Recalled'],
);

/** The public-record block both register kinds share (schema field `public_record`). */
const publicRecordSection: SectionSpec = {
  id: 'public',
  legend: 'Public record',
  hint: 'What a public register or transparency record asks for that the internal entry does not. Fill it once; the crosswalk below shows where each field goes.',
  fields: [
    { path: 'public_record.organisation', label: 'Responsible organisation', kind: 'text' },
    { path: 'public_record.contact_email', label: 'Contact email (a role mailbox)', kind: 'email' },
    { path: 'public_record.address', label: 'Address and other contact details', kind: 'textarea' },
    { path: 'public_record.website_url', label: 'Public web page', kind: 'url', placeholder: 'https://' },
    {
      path: 'public_record.one_sentence_description',
      label: 'One-sentence description',
      kind: 'text',
    },
    { path: 'public_record.description', label: 'Plain-language description', kind: 'textarea' },
    {
      path: 'public_record.data_and_logic',
      label: 'Information used (data, inputs) and operating logic',
      kind: 'textarea',
    },
    { path: 'public_record.trade_name', label: 'Trade name and unambiguous reference', kind: 'text' },
    { path: 'public_record.market_status', label: 'Market status', kind: 'select', options: MARKET_STATUS },
    { path: 'public_record.region', label: 'Region whose public it affects', kind: 'text' },
    {
      path: 'public_record.authorised_representative',
      label: 'Authorised representative',
      kind: 'text',
    },
    { path: 'public_record.certificate', label: 'Notified-body certificate', kind: 'text' },
    {
      path: 'public_record.declaration_of_conformity',
      label: 'EU declaration of conformity (link)',
      kind: 'url',
    },
    {
      path: 'public_record.instructions_for_use',
      label: 'Electronic instructions for use (link)',
      kind: 'url',
    },
  ],
};

/** Form of an AI system entry (schema: ai-system-register-entry.v1.json). */
export const aiSystemSections: readonly SectionSpec[] = [
  {
    id: 'identity',
    legend: 'Identity and ownership',
    hint: 'The core the deploy pipeline writes: an entry without an owner, a scope and an expiry is denied production access.',
    fields: [
      { path: 'id', label: 'Registry id', kind: 'text', required: true, placeholder: 'credit-afford-03' },
      { path: 'version', label: 'Version', kind: 'text', required: true, placeholder: '3.2.0' },
      { path: 'name', label: 'Name', kind: 'text' },
      { path: 'owner', label: 'Accountable owner (team or role)', kind: 'text', required: true },
      { path: 'expiry', label: 'Entry expires on', kind: 'date', required: true },
      { path: 'last_reviewed', label: 'Last reviewed on', kind: 'date' },
      { path: 'use_case_record', label: 'Use-case record id', kind: 'text' },
    ],
  },
  {
    id: 'purpose',
    legend: 'Purpose and scope',
    fields: [
      { path: 'purpose', label: 'Intended purpose', kind: 'textarea' },
      {
        path: 'scope',
        label: 'Declared scope',
        kind: 'lines',
        required: true,
        hint: 'One permission, data domain or decision per line. Anything outside it is out of policy.',
      },
      {
        path: 'system_type',
        label: 'Kind of AI artefact',
        kind: 'select',
        options: opts(
          ['ml_model', 'Machine learning model'],
          ['llm_application', 'LLM application'],
          ['agent', 'Agent'],
          ['gpai_model', 'General-purpose AI model'],
          ['rules_plus_ml', 'Rules plus machine learning'],
          ['other', 'Other'],
        ),
      },
      {
        path: 'lifecycle_stage',
        label: 'Lifecycle stage',
        kind: 'select',
        options: opts(
          ['proposed', 'Proposed'],
          ['in_development', 'In development'],
          ['in_validation', 'In validation'],
          ['in_production', 'In production'],
          ['suspended', 'Suspended'],
          ['retired', 'Retired'],
        ),
      },
      {
        path: 'affected_persons',
        label: 'People affected',
        kind: 'lines',
        hint: 'One category per line, for example "loan applicants".',
      },
      {
        path: 'jurisdictions',
        label: 'Where it is used',
        kind: 'lines',
        hint: 'One country or region per line, ISO 3166 codes where possible (ES, PT).',
      },
      { path: 'personal_data', label: 'Processes personal data', kind: 'bool' },
      {
        path: 'human_oversight',
        label: 'Human oversight mode',
        kind: 'select',
        options: opts(
          ['human_in_the_loop', 'Human in the loop'],
          ['human_on_the_loop', 'Human on the loop'],
          ['human_in_command', 'Human in command'],
          ['none', 'None'],
        ),
      },
    ],
  },
  {
    id: 'classification',
    legend: 'Classification and registration',
    hint: 'From the signed classification decision. If you record a classification, the EU AI Act category and the internal tier are both required.',
    fields: [
      {
        path: 'role',
        label: 'Role under the EU AI Act',
        kind: 'select',
        options: opts(
          ['provider', 'Provider'],
          ['deployer', 'Deployer'],
          ['provider_and_deployer', 'Provider and deployer'],
          ['importer', 'Importer'],
          ['distributor', 'Distributor'],
        ),
      },
      {
        path: 'risk_classification.eu_ai_act_category',
        label: 'EU AI Act category',
        kind: 'select',
        options: EU_CATEGORY,
      },
      {
        path: 'risk_classification.annex_iii_point',
        label: 'Annex III point relied on',
        kind: 'text',
        placeholder: '5(b)',
      },
      {
        path: 'risk_classification.internal_tier',
        label: 'Internal risk tier',
        kind: 'select',
        options: opts(['low', 'Low'], ['medium', 'Medium'], ['high', 'High'], ['critical', 'Critical']),
      },
      { path: 'risk_classification.rationale', label: 'Why this classification', kind: 'textarea' },
      {
        path: 'risk_classification.classification_record',
        label: 'Signed classification decision (link)',
        kind: 'url',
      },
      { path: 'risk_classification.decided_at', label: 'Decided on', kind: 'date' },
      {
        path: 'eu_database_registration.required',
        label: 'Registration in the EU database applies',
        kind: 'bool',
      },
      {
        path: 'eu_database_registration.registration_id',
        label: 'EU database registration id',
        kind: 'text',
      },
      { path: 'eu_database_registration.registered_at', label: 'Registered on', kind: 'date' },
    ],
  },
  {
    id: 'build',
    legend: 'Components and evidence',
    fields: [
      {
        path: 'components',
        label: 'Components',
        kind: 'group',
        itemLabel: 'component',
        hint: 'Models, datasets, tools and services the system is built from. Mirrors the AIBOM.',
        item: [
          {
            path: 'type',
            label: 'Kind',
            kind: 'select',
            required: true,
            options: opts(
              ['model', 'Model'],
              ['dataset', 'Dataset'],
              ['tool', 'Tool'],
              ['service', 'Service'],
              ['library', 'Library'],
            ),
          },
          { path: 'ref', label: 'Identifier', kind: 'text', required: true },
          { path: 'version', label: 'Version', kind: 'text' },
          { path: 'supplier', label: 'Supplier, if third party', kind: 'text' },
        ],
      },
      { path: 'aibom', label: 'AIBOM (link)', kind: 'url' },
      {
        path: 'evidence',
        label: 'Evidence links',
        kind: 'lines',
        hint: 'One link per line: model card, impact assessments, eval results, go/no-go.',
      },
    ],
  },
  publicRecordSection,
];

/** Form of an agent entry (schema: agent-register-entry.v1.json). */
export const agentSections: readonly SectionSpec[] = [
  {
    id: 'identity',
    legend: 'Identity and ownership',
    hint: 'Same core as any registry entry. An ownerless agent loses its identity; an expired entry lapses the credential.',
    fields: [
      { path: 'id', label: 'Agent id', kind: 'text', required: true, placeholder: 'csa-01' },
      { path: 'version', label: 'Version', kind: 'text', required: true },
      { path: 'name', label: 'Name', kind: 'text' },
      { path: 'owner', label: 'Accountable owner (team)', kind: 'text', required: true },
      { path: 'expiry', label: 'Entry expires on', kind: 'date', required: true },
      {
        path: 'status',
        label: 'Status',
        kind: 'select',
        options: opts(
          ['active', 'Active'],
          ['suspended', 'Suspended'],
          ['expired', 'Expired'],
          ['retired', 'Retired'],
        ),
      },
      { path: 'registered_at', label: 'First registered at', kind: 'datetime' },
    ],
  },
  {
    id: 'purpose',
    legend: 'Purpose, scope and autonomy',
    fields: [
      { path: 'purpose', label: 'What the agent is for', kind: 'textarea' },
      {
        path: 'scope',
        label: 'Declared scope',
        kind: 'lines',
        required: true,
        hint: 'One permission string per line, for example "refunds:read".',
      },
      { path: 'parent_system', label: 'Parent AI system (registry id)', kind: 'text' },
      { path: 'base_models', label: 'Base models', kind: 'lines' },
      {
        path: 'autonomy_level',
        label: 'Highest autonomy allowed',
        kind: 'select',
        options: opts(
          ['suggest_only', 'Suggest only'],
          ['act_with_approval', 'Act with approval'],
          ['act_and_report', 'Act and report'],
          ['act_autonomously', 'Act autonomously'],
        ),
      },
      { path: 'logging', label: 'Action log location and retention', kind: 'textarea' },
    ],
  },
  {
    id: 'identity-credentials',
    legend: 'Workload identity',
    hint: 'If you record an identity, its type and identifier are both required.',
    fields: [
      {
        path: 'workload_identity.type',
        label: 'Identity type',
        kind: 'select',
        options: opts(
          ['spiffe', 'SPIFFE'],
          ['oidc_client', 'OIDC client'],
          ['service_account', 'Service account'],
          ['other', 'Other'],
        ),
      },
      { path: 'workload_identity.identifier', label: 'Identifier', kind: 'text' },
      { path: 'workload_identity.issuer', label: 'Issuer', kind: 'text' },
      {
        path: 'workload_identity.credential_ttl_seconds',
        label: 'Credential lifetime (seconds)',
        kind: 'int',
      },
    ],
  },
  {
    id: 'tools',
    legend: 'Tools, data and delegation',
    fields: [
      {
        path: 'tools',
        label: 'Tools',
        kind: 'group',
        itemLabel: 'tool',
        hint: 'A tool not listed is denied.',
        item: [
          { path: 'name', label: 'Tool or API', kind: 'text', required: true },
          {
            path: 'operations',
            label: 'Allowed operations',
            kind: 'lines',
            required: true,
            hint: 'One per line.',
          },
          { path: 'requires_approval', label: 'Each call needs a human approval', kind: 'bool' },
          { path: 'limits', label: 'Limits at the tool boundary', kind: 'text' },
        ],
      },
      {
        path: 'data_access',
        label: 'Data access',
        kind: 'group',
        itemLabel: 'data domain',
        item: [
          { path: 'domain', label: 'Data domain or store', kind: 'text', required: true },
          {
            path: 'classification',
            label: 'Highest data class',
            kind: 'select',
            required: true,
            options: opts(
              ['public', 'Public'],
              ['internal', 'Internal'],
              ['confidential', 'Confidential'],
              ['restricted', 'Restricted'],
            ),
          },
          {
            path: 'access',
            label: 'Access',
            kind: 'select',
            required: true,
            options: opts(['read', 'Read'], ['write', 'Write'], ['read_write', 'Read and write']),
          },
        ],
      },
      { path: 'delegation.can_spawn_agents', label: 'May create sub-agents', kind: 'bool' },
      { path: 'delegation.can_delegate_to', label: 'May delegate to (agent ids)', kind: 'lines' },
    ],
  },
  {
    id: 'oversight',
    legend: 'Oversight, limits and kill switch',
    fields: [
      {
        path: 'human_oversight.mode',
        label: 'Oversight mode',
        kind: 'select',
        options: opts(
          ['human_in_the_loop', 'Human in the loop'],
          ['human_on_the_loop', 'Human on the loop'],
          ['human_in_command', 'Human in command'],
        ),
      },
      {
        path: 'human_oversight.approval_required_for',
        label: 'Actions that always need approval',
        kind: 'lines',
      },
      { path: 'human_oversight.overseer_role', label: 'Overseer role', kind: 'text' },
      { path: 'spend_limit.currency', label: 'Spend limit currency (ISO 4217)', kind: 'text' },
      { path: 'spend_limit.amount', label: 'Spend limit amount', kind: 'number' },
      {
        path: 'spend_limit.period',
        label: 'Spend limit period',
        kind: 'select',
        options: opts(
          ['per_action', 'Per action'],
          ['per_hour', 'Per hour'],
          ['per_day', 'Per day'],
          ['per_month', 'Per month'],
        ),
      },
      { path: 'kill_switch.mechanism', label: 'Kill switch: how the agent is stopped', kind: 'text' },
      { path: 'kill_switch.owner', label: 'Kill switch: who can pull it', kind: 'text' },
      { path: 'kill_switch.last_drill', label: 'Kill switch: last tested on', kind: 'date' },
      { path: 'runtime_policies', label: 'Runtime policy cards (ids)', kind: 'lines' },
      { path: 'eval_suites', label: 'Eval suites that gate releases (ids)', kind: 'lines' },
    ],
  },
  publicRecordSection,
];

// ---- Register: the field crosswalk ---------------------------------------------------

export interface CrosswalkRow {
  /** Register field(s), dotted paths; the first one supplies the value shown. */
  paths: readonly string[];
  label: string;
  /** UK ATRS template v4.0 field ids and names. */
  atrs: string;
  /** Canada AIA questionnaire field or section. */
  aia: string;
  /** EU AI Act Annex VIII section and point. */
  euDb: string;
  /** Model or system card: Hugging Face template heading and/or CycloneDX 1.7 field. */
  card: string;
  /** ISO/IEC 42001 Statement of Applicability: the Annex A row the field supports, and the column. */
  soa: string;
}

/** One source record, five regimes. An empty cell means the regime has no field for it. */
export const registerCrosswalk: readonly CrosswalkRow[] = [
  {
    paths: ['name'],
    label: 'Name',
    atrs: '0.1 Title; 1.1 Name',
    aia: 'Project Title',
    euDb: 'A.4, B.4 trade name and unambiguous reference',
    card: 'HF "Model Card for {model_id}"; CycloneDX component name',
    soa: '',
  },
  {
    paths: ['id'],
    label: 'Registry id',
    atrs: '',
    aia: 'Project ID from IT Plan',
    euDb: 'A.4, B.4 reference allowing identification and traceability',
    card: 'CycloneDX component bom-ref',
    soa: '',
  },
  {
    paths: ['version'],
    label: 'Version',
    atrs: '2.4.2.2 Model version',
    aia: '',
    euDb: 'A.4 (part of the unambiguous reference)',
    card: 'CycloneDX component version',
    soa: '',
  },
  {
    paths: ['public_record.one_sentence_description'],
    label: 'One-sentence description',
    atrs: '0.5 One sentence description',
    aia: '',
    euDb: '',
    card: 'HF model summary (the line under the title)',
    soa: '',
  },
  {
    paths: ['public_record.description'],
    label: 'Plain-language description',
    atrs: '1.2 Description; 2.2.1 Detailed description',
    aia: 'Provide a project description',
    euDb: 'A.5 description of the intended purpose and of the components and functions',
    card: 'HF "Model Description"; CycloneDX component description',
    soa: '',
  },
  {
    paths: ['purpose'],
    label: 'Intended purpose',
    atrs: '1.2 Description (what the tool is, why it is used)',
    aia: 'Reasons for Automation (section)',
    euDb: 'A.5, B.5 intended purpose',
    card: 'HF "Direct Use"; CycloneDX modelCard.considerations.useCases',
    soa: 'A.9 row (intended use): justification',
  },
  {
    paths: ['public_record.organisation'],
    label: 'Responsible organisation',
    atrs: '0.2 Organisation name; 2.1.1 Organisation or department',
    aia: 'Department',
    euDb: 'A.1, B.1 provider; C.1 deployer (name, address, contact details)',
    card: 'HF "Developed by"; CycloneDX component supplier',
    soa: '',
  },
  {
    paths: ['public_record.address'],
    label: 'Address and contact details',
    atrs: '',
    aia: '',
    euDb: "A.1, B.1, C.1 (address and contact details); A.2, B.2, C.2 for whoever submits on the provider's or deployer's behalf",
    card: '',
    soa: '',
  },
  {
    paths: ['public_record.contact_email'],
    label: 'Contact email',
    atrs: '1.4 Contact email',
    aia: '',
    euDb: 'A.1, B.1, C.1 (contact details)',
    card: 'HF "Model Card Contact"',
    soa: '',
  },
  {
    paths: ['public_record.website_url'],
    label: 'Public web page',
    atrs: '1.3 Website URL',
    aia: '',
    euDb: 'A.13 URL for additional information (optional)',
    card: 'HF "Model Sources"; CycloneDX externalReferences (website)',
    soa: '',
  },
  {
    paths: ['owner'],
    label: 'Accountable owner',
    atrs: '2.1.2 Team; 2.1.3 Senior responsible owner',
    aia: 'Name of ADM responsible for the program; Branch',
    euDb: '',
    card: 'HF "Model Card Authors"',
    soa: 'A.3 row (roles and responsibilities): owner',
  },
  {
    paths: ['lifecycle_stage'],
    label: 'Lifecycle stage',
    atrs: '0.3 Phase',
    aia: 'Project Phase (Design or Implementation)',
    euDb: '',
    card: '',
    soa: 'A.6 row (life cycle): implementation status',
  },
  {
    paths: ['public_record.market_status'],
    label: 'Market status',
    atrs: '',
    aia: '',
    euDb: 'A.7, B.8 status of the AI system',
    card: '',
    soa: '',
  },
  {
    paths: ['public_record.region'],
    label: 'Region',
    atrs: '0.4 Region',
    aia: '',
    euDb: '',
    card: '',
    soa: '',
  },
  {
    paths: ['jurisdictions'],
    label: 'Where it is used',
    atrs: '',
    aia: '',
    euDb: 'A.10 Member States (the B.9 list was deleted by Reg. (EU) 2026/1744)',
    card: 'HF "Language(s)" only for languages, not places',
    soa: '',
  },
  {
    paths: ['risk_classification.eu_ai_act_category', 'risk_classification.annex_iii_point'],
    label: 'EU AI Act classification',
    atrs: '',
    aia: 'Impact level I to IV, from the Risk Profile and Impact Assessment answers',
    euDb: 'Section A (high-risk) or Section B (Art. 6(3) filter); B.6 conditions relied on',
    card: '',
    soa: 'Justification for inclusion or exclusion of controls',
  },
  {
    paths: ['risk_classification.rationale'],
    label: 'Why this classification',
    atrs: '',
    aia: '',
    euDb: 'B.6 (the B.7 summary of grounds was deleted by Reg. (EU) 2026/1744)',
    card: '',
    soa: 'Justification for inclusion or exclusion of controls',
  },
  {
    paths: ['public_record.data_and_logic'],
    label: 'Information used and operating logic',
    atrs: '2.4.1.2 System-level input; 2.4.1.3 System-level output; 2.4.3.1 Development data description',
    aia: 'About the Data; About the Algorithm (sections)',
    euDb: 'A.6 information used (data, inputs) and operating logic',
    card: 'HF "Training Data"; CycloneDX modelCard.modelParameters (datasets, inputs, outputs)',
    soa: 'A.7 row (data for AI systems): evidence',
  },
  {
    paths: ['components', 'aibom'],
    label: 'Components and AIBOM',
    atrs: '2.4.1.5 Models; 2.1.4 Third party involvement',
    aia: 'About The System: "Who developed the system?"',
    euDb: '',
    card: 'CycloneDX components (the ML-BOM itself)',
    soa: 'A.4 row (resources) and A.10 row (suppliers): evidence',
  },
  {
    paths: ['human_oversight'],
    label: 'Human oversight mode',
    atrs: '2.3.2 Human review',
    aia: 'De-risking and Mitigation Measures (section)',
    euDb: 'A.12 via the instructions for use',
    card: 'System card: human oversight measures (Art. 13(3)(d))',
    soa: 'A.9 row (use of AI systems): evidence',
  },
  {
    paths: ['affected_persons'],
    label: 'People affected',
    atrs: '2.5.2 Risks and mitigations',
    aia: 'Impact Assessment (section)',
    euDb: 'C.4 summary of the FRIA findings (deployers)',
    card: 'CycloneDX modelCard.considerations.fairnessAssessments (groupAtRisk)',
    soa: 'A.5 row (impact assessment): evidence',
  },
  {
    paths: ['personal_data'],
    label: 'Processes personal data',
    atrs: '2.4.3.4 Sensitive attributes; 2.4.4.2 Sensitive attributes',
    aia: 'About the Data (section)',
    euDb: 'C.5 summary of the DPIA (deployers, where applicable)',
    card: '',
    soa: 'A.7 row (data for AI systems): justification',
  },
  {
    paths: ['public_record.trade_name'],
    label: 'Trade name',
    atrs: '',
    aia: '',
    euDb: 'A.4, B.4 trade name',
    card: '',
    soa: '',
  },
  {
    paths: ['public_record.authorised_representative'],
    label: 'Authorised representative',
    atrs: '',
    aia: '',
    euDb: 'A.3, B.3 authorised representative',
    card: '',
    soa: '',
  },
  {
    paths: ['public_record.certificate'],
    label: 'Notified-body certificate',
    atrs: '',
    aia: '',
    euDb: 'A.8 certificate type, number, expiry and notified body; A.9 scanned copy',
    card: '',
    soa: '',
  },
  {
    paths: ['public_record.declaration_of_conformity'],
    label: 'EU declaration of conformity',
    atrs: '',
    aia: '',
    euDb: 'A.11 copy of the EU declaration of conformity',
    card: '',
    soa: '',
  },
  {
    paths: ['public_record.instructions_for_use'],
    label: 'Instructions for use',
    atrs: '',
    aia: '',
    euDb: 'A.12 electronic instructions for use (not for Annex III points 1, 6 and 7)',
    card: 'System card: instructions for use (Art. 13)',
    soa: 'A.8 row (information for interested parties): evidence',
  },
  {
    paths: ['eu_database_registration.registration_id'],
    label: 'EU database registration id',
    atrs: '',
    aia: '',
    euDb: "The registration itself; C.3 URL of the provider's entry (deployers)",
    card: '',
    soa: '',
  },
  {
    paths: ['evidence'],
    label: 'Evidence links',
    atrs: '2.5.1 Impact assessments',
    aia: '',
    euDb: 'C.4 FRIA summary and C.5 DPIA summary (deployers)',
    card: 'HF "More Information"; CycloneDX externalReferences',
    soa: 'Implementation status and evidence of the applicable controls',
  },
];

/** The five regimes, as the crosswalk table heads them. */
export const crosswalkColumns = [
  { key: 'atrs', label: 'UK ATRS v4.0' },
  { key: 'aia', label: 'Canada AIA' },
  { key: 'euDb', label: 'EU database (Annex VIII)' },
  { key: 'card', label: 'Model or system card' },
  { key: 'soa', label: 'ISO/IEC 42001 SoA (verify)' },
] as const;

// ---- Impact assessment ---------------------------------------------------------------

export const iaTypes = [
  {
    id: 'fria',
    label: 'Fundamental rights impact assessment (FRIA)',
    basis: 'EU AI Act Art. 27',
    lede: 'For deployers that must assess the impact on fundamental rights before first use: the six elements of Art. 27(1), then the notification to the market surveillance authority.',
  },
  {
    id: 'aiia',
    label: 'AI system impact assessment (AIIA)',
    basis: 'ISO/IEC 42005',
    lede: "The organisation's own assessment of impacts on individuals, groups and society, documented element by element with the ISO/IEC 42005 clause ids.",
  },
  {
    id: 'dpia_addendum',
    label: 'AI addendum to a DPIA',
    basis: 'GDPR Art. 35',
    lede: 'The AI-specific fields a generic DPIA template lacks, on top of the Art. 35(7) minimum content.',
  },
] as const;

export type IaType = (typeof iaTypes)[number]['id'];

/** Art. 27(1) points (a) to (f), and where the builder records each. */
export const art27Elements = [
  { point: '(a)', text: "The deployer's processes in which the system will be used", paths: ['processes'] },
  { point: '(b)', text: 'The period of time and frequency of intended use', paths: ['period_and_frequency'] },
  { point: '(c)', text: 'The categories of natural persons and groups likely to be affected', paths: ['affected_categories'] },
  { point: '(d)', text: "The specific risks of harm to those persons or groups, using the provider's Art. 13 information", paths: ['risks'] },
  { point: '(e)', text: 'The implementation of human oversight measures', paths: ['human_oversight_measures'] },
  { point: '(f)', text: 'The measures if the risks materialise, including internal governance and complaint mechanisms', paths: ['mitigations', 'governance_and_complaints'] },
] as const;

/** GDPR Art. 35(7) points (a) to (d), and where the builder records each. */
export const dpiaElements = [
  { point: '(a)', text: 'A systematic description of the processing and its purposes', paths: ['processing_description'] },
  { point: '(b)', text: 'An assessment of necessity and proportionality', paths: ['necessity_and_proportionality'] },
  { point: '(c)', text: 'An assessment of the risks to the rights and freedoms of data subjects', paths: ['risks'] },
  { point: '(d)', text: 'The measures envisaged to address the risks', paths: ['mitigations'] },
] as const;

/** ISO/IEC 42005 documentation elements (clause 6), with the clause ids and
 *  headings the INCITS/AI crosswalk lists against ISO/IEC DIS 42005. */
export const iso42005Clauses = [
  { clause: '6.2', heading: 'Scope of the AI system impact assessment', hint: 'Which system, version, deployment and lifecycle stage the assessment covers, and what it leaves out.' },
  { clause: '6.3.1', heading: 'AI system description', hint: 'What the system is, in plain terms.' },
  { clause: '6.3.2', heading: 'AI system functionalities and capabilities', hint: 'What it can do, including capabilities beyond the intended use.' },
  { clause: '6.3.3', heading: 'AI system purpose', hint: 'Why the organisation uses it.' },
  { clause: '6.3.4', heading: 'Intended use', hint: 'The uses, users and contexts it is meant for.' },
  { clause: '6.3.5', heading: 'Unintended uses', hint: 'Uses it is not meant for, including reasonably foreseeable misuse.' },
  { clause: '6.4', heading: 'Data information and quality', hint: 'The data it is built and run on, its provenance and known quality limits.' },
  { clause: '6.5', heading: 'Algorithm and model information', hint: 'The models and algorithms, and what is known about their behaviour.' },
  { clause: '6.6.1', heading: 'Geographical area and languages', hint: 'Where it is deployed and in which languages.' },
  { clause: '6.6.2', heading: 'Deployment environment complexity and constraints', hint: 'The operating environment and its constraints.' },
  { clause: '6.7', heading: 'Relevant interested parties', hint: 'Who is affected or has a stake, including those not using it.' },
  { clause: '6.8.2', heading: 'Benefits and harms', hint: 'Expected benefits, and the harms recorded in the risks below.' },
  { clause: '6.8.3', heading: 'AI system failures and reasonably foreseeable misuse', hint: 'How it can fail or be misused, and the impact of each.' },
] as const;

/** The process clauses of ISO/IEC 42005 (clause 5) and the record fields that carry them. */
export const iso42005Process = [
  { clause: '5.4', heading: 'Timing of AI system impact assessment', where: 'When the assessment is done and redone: the re-open triggers and the next review date.' },
  { clause: '5.6', heading: 'Allocating responsibilities', where: 'The assessor and the people consulted.' },
  { clause: '5.10', heading: 'Recording and reporting', where: 'The exported record itself (JSON, YAML or Markdown).' },
  { clause: '5.11', heading: 'Approval process', where: 'The approvals, each with role, decision and time.' },
  { clause: '5.12', heading: 'Monitoring and review', where: "The re-open triggers and the mitigations' evidence links." },
] as const;

/** Preset re-open triggers. `for` limits a preset to the types it belongs to. */
export const reopenTriggers = [
  { text: 'An Art. 27(1) element changed or is no longer up to date (Art. 27(2))', for: ['fria'] },
  { text: 'The risk represented by the processing changed (GDPR Art. 35(11))', for: ['dpia_addendum'] },
  { text: 'New or changed intended purpose', for: ['fria', 'aiia', 'dpia_addendum'] },
  { text: 'New data source or training data', for: ['fria', 'aiia', 'dpia_addendum'] },
  { text: 'New group of people affected, or a new country', for: ['fria', 'aiia', 'dpia_addendum'] },
  { text: 'Model or system change beyond the pre-determined changes', for: ['fria', 'aiia', 'dpia_addendum'] },
  { text: 'Serious incident, or a complaint alleging harm', for: ['fria', 'aiia', 'dpia_addendum'] },
  { text: 'A monitoring metric crosses its threshold', for: ['fria', 'aiia', 'dpia_addendum'] },
  { text: 'The provider updated the instructions for use', for: ['fria', 'aiia'] },
  { text: 'The scheduled review date is reached', for: ['fria', 'aiia', 'dpia_addendum'] },
] as const;

/** Pattern choices for a mitigation: the canonical pattern pages. */
export const patternOptions: readonly (readonly [string, string])[] = patterns.map(
  (pattern) => [`${SITE}/patterns/${pattern.slug}`, pattern.title] as const,
);

const SCALE = opts(
  ['1', '1 (lowest)'],
  ['2', '2'],
  ['3', '3'],
  ['4', '4'],
  ['5', '5 (highest)'],
);

/** Form of an impact assessment (schema: impact-assessment.v1.json). */
export const iaSections: readonly SectionSpec[] = [
  {
    id: 'identification',
    legend: 'Identification',
    fields: [
      { path: 'assessment_id', label: 'Assessment id', kind: 'text', required: true, placeholder: 'fria-2026-004' },
      {
        path: 'subject',
        label: 'System assessed',
        kind: 'text',
        required: true,
        hint: 'Registry id and version, for example credit-afford-03@3.2.0.',
      },
      { path: 'assessor', label: 'Assessor (role)', kind: 'text', required: true },
      {
        path: 'consulted',
        label: 'People and groups consulted',
        kind: 'lines',
        hint: 'One per line, including representatives of affected groups.',
      },
      {
        path: 'related_assessments',
        label: 'Related assessments (ids)',
        kind: 'lines',
        hint: 'A FRIA may build on an existing DPIA rather than repeat it.',
      },
    ],
  },
  {
    id: 'fria-elements',
    legend: 'Art. 27(1) elements',
    hint: 'Points (d) and (f) are the risks and the measures below.',
    showFor: ['fria'],
    fields: [
      { path: 'processes', label: '(a) Processes in which the system is used', kind: 'textarea' },
      { path: 'period_and_frequency', label: '(b) Period and frequency of use', kind: 'textarea' },
      {
        path: 'affected_categories',
        label: '(c) Categories of people and groups likely to be affected',
        kind: 'lines',
        hint: 'One category per line.',
      },
      { path: 'human_oversight_measures', label: '(e) Human oversight measures', kind: 'textarea' },
      {
        path: 'governance_and_complaints',
        label: '(f) Internal governance and complaint mechanisms',
        kind: 'textarea',
      },
    ],
  },
  {
    id: 'aiia-elements',
    legend: 'ISO/IEC 42005 documentation elements',
    hint: 'One box per clause. Leave a box empty if it does not apply; the risks and the measures below carry the impacts (6.8).',
    showFor: ['aiia'],
    fields: [
      {
        path: 'iso42005_sections',
        label: 'Documented elements',
        kind: 'clauses',
        clauses: iso42005Clauses,
      },
      {
        path: 'affected_categories',
        label: 'Groups affected (for the risk table)',
        kind: 'lines',
        hint: 'One per line.',
      },
    ],
  },
  {
    id: 'dpia-elements',
    legend: 'Art. 35(7) content and AI-specific fields',
    hint: 'Points (c) and (d) are the risks and the measures below.',
    showFor: ['dpia_addendum'],
    fields: [
      {
        path: 'processing_description',
        label: '(a) The processing and its purposes',
        kind: 'textarea',
      },
      {
        path: 'necessity_and_proportionality',
        label: '(b) Necessity and proportionality',
        kind: 'textarea',
      },
      {
        path: 'ai_specific.training_vs_operational_data',
        label: 'Training data versus operational data',
        kind: 'textarea',
      },
      {
        path: 'ai_specific.automated_decision_making',
        label: 'Solely automated decisions with legal or similar effect (GDPR Art. 22)',
        kind: 'bool',
      },
      { path: 'ai_specific.inferences', label: 'Inferences about people', kind: 'textarea' },
      {
        path: 'ai_specific.memorisation_and_extraction',
        label: 'Memorisation and extraction of personal data',
        kind: 'textarea',
      },
      { path: 'dpo_advice', label: 'Advice of the data protection officer', kind: 'textarea' },
    ],
  },
  {
    id: 'risks',
    legend: 'Risks of harm',
    hint: 'One row per specific risk. Likelihood and severity on a 1 to 5 scale. Each risk gets an id so the measures can point at it.',
    fields: [
      {
        path: 'risks',
        label: 'Risks',
        kind: 'group',
        itemLabel: 'risk',
        idPrefix: 'R',
        idKey: 'id',
        required: true,
        item: [
          { path: 'id', label: 'Risk id', kind: 'text' },
          {
            path: 'right_or_interest',
            label: 'Right, freedom or interest at stake',
            kind: 'text',
            required: true,
            placeholder: 'non-discrimination',
          },
          { path: 'description', label: 'How harm could occur', kind: 'textarea', required: true },
          { path: 'affected_group', label: 'Who would bear it', kind: 'text' },
          { path: 'likelihood', label: 'Likelihood', kind: 'select', required: true, options: SCALE },
          { path: 'severity', label: 'Severity', kind: 'select', required: true, options: SCALE },
          { path: 'risk_register_id', label: 'Risk register entry', kind: 'text' },
        ],
      },
    ],
  },
  {
    id: 'mitigations',
    legend: 'Measures',
    hint: 'Link every risk to at least one measure, and each measure to the pattern and the controls that implement it.',
    fields: [
      {
        path: 'mitigations',
        label: 'Measures',
        kind: 'group',
        itemLabel: 'measure',
        required: true,
        item: [
          { path: 'measure', label: 'Measure', kind: 'textarea', required: true },
          {
            path: 'addresses',
            label: 'Risks it addresses',
            kind: 'refs',
            source: 'risks',
            sourceKey: 'id',
            sourceText: 'right_or_interest',
          },
          {
            path: 'pattern',
            label: 'Pattern that implements it',
            kind: 'select',
            options: patternOptions,
          },
          {
            path: 'controls',
            label: 'Controls or obligations (ids)',
            kind: 'lines',
            hint: 'One per line, for example ISO/IEC 42001 A.5 or AIGE-OBL-EUAIA-ART27.',
          },
          { path: 'owner', label: 'Owner (role)', kind: 'text' },
          {
            path: 'status',
            label: 'Status',
            kind: 'select',
            required: true,
            options: opts(['planned', 'Planned'], ['in_place', 'In place'], ['verified', 'Verified']),
          },
          { path: 'evidence', label: 'Evidence it runs (link)', kind: 'url' },
        ],
      },
    ],
  },
  {
    id: 'outcome',
    legend: 'Outcome',
    fields: [
      { path: 'residual_risk', label: 'Residual risk after the measures', kind: 'textarea' },
      {
        path: 'outcome',
        label: 'Outcome',
        kind: 'select',
        required: true,
        options: opts(
          ['proceed', 'Proceed'],
          ['proceed_with_mitigations', 'Proceed with the measures'],
          ['do_not_proceed', 'Do not proceed'],
          ['prior_consultation_required', 'Prior consultation required (GDPR Art. 36)'],
        ),
      },
      {
        path: 'authority_notification.required',
        label: 'Notify the market surveillance authority (Art. 27(3))',
        kind: 'bool',
        showFor: ['fria'],
      },
      {
        path: 'authority_notification.authority',
        label: 'Authority',
        kind: 'text',
        showFor: ['fria'],
      },
      {
        path: 'authority_notification.notified_at',
        label: 'Notified on',
        kind: 'date',
        showFor: ['fria'],
      },
    ],
  },
  {
    id: 'approvals',
    legend: 'Approvals',
    fields: [
      {
        path: 'approvals',
        label: 'Approvals',
        kind: 'group',
        itemLabel: 'approval',
        required: true,
        item: [
          { path: 'role', label: 'Approver (role)', kind: 'text', required: true },
          {
            path: 'decision',
            label: 'Decision',
            kind: 'select',
            required: true,
            options: opts(
              ['approve', 'Approve'],
              ['approve_with_conditions', 'Approve with conditions'],
              ['reject', 'Reject'],
              ['abstain', 'Abstain'],
            ),
          },
          { path: 'conditions', label: 'Conditions', kind: 'text' },
          { path: 'timestamp', label: 'Decided at', kind: 'datetime', required: true },
          { path: 'signature', label: 'Signature reference', kind: 'text' },
        ],
      },
    ],
  },
  {
    id: 'review',
    legend: 'Re-open triggers and review',
    hint: 'The changes that reopen the assessment. An assessment without triggers is a snapshot, not a control.',
    fields: [
      {
        path: 'review_triggers',
        label: 'Re-open the assessment when',
        kind: 'checks',
        allowOther: true,
      },
      { path: 'next_review', label: 'Next scheduled review', kind: 'date' },
    ],
  },
];

// ---- Model card -------------------------------------------------------------------------

/** Form of a model card (schema: model-card.v1.json). */
export const modelCardSections: readonly SectionSpec[] = [
  {
    id: 'applicability',
    legend: 'What the card is read against',
    hint: 'These two answers switch the EU AI Act parts of the coverage checklist on or off.',
    fields: [
      {
        path: 'applicability.high_risk',
        label: 'Part of a high-risk AI system (Art. 11 and Art. 13 apply)',
        kind: 'bool',
      },
      {
        path: 'applicability.gpai',
        label: 'A general-purpose AI model (Art. 53 applies)',
        kind: 'bool',
      },
    ],
  },
  {
    id: 'details',
    legend: 'Model details',
    fields: [
      { path: 'name', label: 'Model or system name', kind: 'text', required: true },
      { path: 'version', label: 'Version', kind: 'text', required: true },
      { path: 'registry_id', label: 'Registry id', kind: 'text' },
      { path: 'developer', label: 'Developed by (organisation)', kind: 'text', required: true },
      { path: 'contact', label: 'Contact (role mailbox or support page)', kind: 'text' },
      { path: 'summary', label: 'One-sentence summary', kind: 'text' },
      { path: 'description', label: 'Description', kind: 'textarea' },
      {
        path: 'license',
        label: 'Licence (SPDX id where one exists)',
        kind: 'text',
        placeholder: 'apache-2.0',
      },
      { path: 'languages', label: 'Languages (ISO 639-1, one per line)', kind: 'lines' },
      { path: 'base_model', label: 'Fine-tuned or adapted from', kind: 'text' },
      { path: 'model_type', label: 'Model type', kind: 'text' },
      { path: 'task', label: 'Task', kind: 'text' },
      { path: 'architecture_family', label: 'Architecture family', kind: 'text' },
      { path: 'architecture', label: 'Specific architecture', kind: 'text' },
      {
        path: 'learning_approach',
        label: 'Learning approach',
        kind: 'select',
        options: opts(
          ['supervised', 'Supervised'],
          ['unsupervised', 'Unsupervised'],
          ['reinforcement-learning', 'Reinforcement learning'],
          ['semi-supervised', 'Semi-supervised'],
          ['self-supervised', 'Self-supervised'],
        ),
      },
      { path: 'library', label: 'Library or framework', kind: 'text' },
      { path: 'tags', label: 'Tags (one per line)', kind: 'lines' },
      { path: 'repository', label: 'Repository (link)', kind: 'url' },
      { path: 'paper', label: 'Paper or report (link)', kind: 'url' },
    ],
  },
  {
    id: 'uses',
    legend: 'Uses',
    fields: [
      { path: 'intended_uses', label: 'Intended uses (one per line)', kind: 'lines' },
      { path: 'users', label: 'Intended users (roles, one per line)', kind: 'lines' },
      { path: 'downstream_use', label: 'Downstream use and integration', kind: 'textarea' },
      {
        path: 'out_of_scope_uses',
        label: 'Out-of-scope uses, including foreseeable misuse (one per line)',
        kind: 'lines',
      },
    ],
  },
  {
    id: 'data',
    legend: 'Data and training',
    fields: [
      {
        path: 'datasets',
        label: 'Datasets',
        kind: 'group',
        itemLabel: 'dataset',
        item: [
          { path: 'name', label: 'Dataset name or id', kind: 'text', required: true },
          {
            path: 'role',
            label: 'Used for',
            kind: 'select',
            options: opts(
              ['training', 'Training'],
              ['validation', 'Validation'],
              ['testing', 'Testing'],
              ['fine_tuning', 'Fine-tuning'],
              ['other', 'Other'],
            ),
          },
          { path: 'url', label: 'Link to the dataset or its card', kind: 'url' },
          { path: 'description', label: 'Provenance, scope, known gaps', kind: 'text' },
        ],
      },
      { path: 'training_data', label: 'Training data', kind: 'textarea' },
      { path: 'preprocessing', label: 'Preprocessing', kind: 'textarea' },
      { path: 'training_procedure', label: 'Training procedure', kind: 'textarea' },
      { path: 'inputs', label: 'Input formats (one per line)', kind: 'lines' },
      { path: 'outputs', label: 'Output formats (one per line)', kind: 'lines' },
    ],
  },
  {
    id: 'evaluation',
    legend: 'Evaluation',
    fields: [
      { path: 'evaluation_data', label: 'Testing data', kind: 'textarea' },
      {
        path: 'metrics',
        label: 'Results',
        kind: 'group',
        itemLabel: 'result',
        hint: 'Overall and by slice. A result with a slice (a group or a condition) counts towards Art. 13(3)(b)(v).',
        item: [
          { path: 'type', label: 'Metric', kind: 'text', required: true },
          { path: 'value', label: 'Value', kind: 'text', required: true },
          { path: 'slice', label: 'Slice (group or condition)', kind: 'text' },
          { path: 'lower_bound', label: 'Lower bound', kind: 'text' },
          { path: 'upper_bound', label: 'Upper bound', kind: 'text' },
          { path: 'dataset', label: 'Measured on (dataset)', kind: 'text' },
        ],
      },
      { path: 'metrics_rationale', label: 'Why these metrics and thresholds', kind: 'textarea' },
      {
        path: 'fairness_assessments',
        label: 'Groups assessed',
        kind: 'group',
        itemLabel: 'group',
        item: [
          { path: 'group_at_risk', label: 'Group', kind: 'text', required: true },
          { path: 'benefits', label: 'Benefits', kind: 'text' },
          { path: 'harms', label: 'Harms', kind: 'text' },
          { path: 'mitigation', label: 'Mitigation', kind: 'text' },
        ],
      },
    ],
  },
  {
    id: 'limits',
    legend: 'Risks and limitations',
    fields: [
      { path: 'limitations', label: 'Technical limitations (one per line)', kind: 'lines' },
      { path: 'tradeoffs', label: 'Performance trade-offs (one per line)', kind: 'lines' },
      {
        path: 'ethical_considerations',
        label: 'Risks to people and society',
        kind: 'group',
        itemLabel: 'risk',
        item: [
          { path: 'name', label: 'Risk or consideration', kind: 'text', required: true },
          { path: 'mitigation', label: 'Mitigation', kind: 'text' },
        ],
      },
      { path: 'recommendations', label: 'Recommendations for users', kind: 'textarea' },
    ],
  },
  {
    id: 'operation',
    legend: 'Oversight and operation',
    hint: 'System-level facts a deployer needs (Art. 13(3)). A model card alone under-describes a system with tools or retrieval.',
    fields: [
      { path: 'human_oversight', label: 'Human oversight measures', kind: 'textarea' },
      { path: 'explainability', label: 'How outputs are explained', kind: 'textarea' },
      { path: 'output_interpretation', label: 'How to interpret the output', kind: 'textarea' },
      { path: 'predetermined_changes', label: 'Pre-determined changes', kind: 'textarea' },
      {
        path: 'compute_and_lifetime',
        label: 'Compute, expected lifetime and maintenance',
        kind: 'textarea',
      },
      { path: 'logging', label: 'Logging', kind: 'textarea' },
      { path: 'cybersecurity', label: 'Robustness and cybersecurity', kind: 'textarea' },
    ],
  },
  {
    id: 'environment',
    legend: 'Environmental impact',
    fields: [
      { path: 'environmental.hardware', label: 'Hardware type', kind: 'text' },
      { path: 'environmental.hours', label: 'Hours used', kind: 'text' },
      { path: 'environmental.cloud_provider', label: 'Cloud provider', kind: 'text' },
      { path: 'environmental.region', label: 'Compute region', kind: 'text' },
      { path: 'environmental.energy_kwh', label: 'Energy in training (kWh)', kind: 'number' },
      { path: 'environmental.co2_emitted', label: 'Carbon emitted (with unit and method)', kind: 'text' },
    ],
  },
  {
    id: 'gpai',
    legend: 'General-purpose AI model documentation (Art. 53)',
    hint: 'Links to the documents Art. 53(1) asks a GPAI provider to keep or publish.',
    fields: [
      { path: 'gpai.technical_documentation', label: '(a) Technical documentation, Annex XI (link)', kind: 'url' },
      { path: 'gpai.downstream_information', label: '(b) Information for downstream providers, Annex XII (link)', kind: 'url' },
      { path: 'gpai.copyright_policy', label: '(c) Copyright policy (link)', kind: 'url' },
      { path: 'gpai.training_content_summary', label: '(d) Public summary of training content (link)', kind: 'url' },
    ],
  },
  {
    id: 'file',
    legend: 'The rest of the technical file',
    hint: 'The card is one part of the file: link the parts it cannot hold.',
    fields: [
      { path: 'links.instructions_for_use', label: 'Instructions for use (link)', kind: 'url' },
      { path: 'links.risk_management', label: 'Risk management record (link)', kind: 'url' },
      { path: 'links.impact_assessment', label: 'Impact assessment (link)', kind: 'url' },
      { path: 'links.post_market_monitoring', label: 'Post-market monitoring plan (link)', kind: 'url' },
      { path: 'links.declaration_of_conformity', label: 'EU declaration of conformity (link)', kind: 'url' },
      { path: 'links.aibom', label: 'AIBOM (link)', kind: 'url' },
      { path: 'standards_applied', label: 'Standards applied (one per line)', kind: 'lines' },
      { path: 'change_log', label: 'Changes since the previous version', kind: 'textarea' },
      { path: 'last_updated', label: 'Card last updated on', kind: 'date' },
    ],
  },
];

export type Applies = 'always' | 'high_risk' | 'gpai';

export interface ChecklistItem {
  id: string;
  group: string;
  /** Clause, as the framework writes it. */
  ref: string;
  text: string;
  applies: Applies;
  /** Card fields that evidence the item ("metrics[].slice": any item has a slice). */
  fields: readonly string[];
  /** Covered when any field is filled (default: all of them). */
  any?: boolean;
  /** The item lives in another artefact the card only links to. */
  elsewhere?: { label: string; href: string };
  /** Stable obligation id in the obligation register. */
  obligation: string;
}

export const checklistGroups = [
  { id: 'annex-iv', label: 'EU AI Act Art. 11(1) and Annex IV: technical documentation', applies: 'high_risk' },
  { id: 'art-13', label: 'EU AI Act Art. 13(3): information for deployers', applies: 'high_risk' },
  { id: 'art-53', label: 'EU AI Act Art. 53(1): general-purpose AI models', applies: 'gpai' },
  { id: 'iso-42001', label: 'ISO/IEC 42001 Annex A', applies: 'always' },
  { id: 'nist', label: 'NIST AI RMF: MAP and MEASURE', applies: 'always' },
] as const;

const E11 = 'AIGE-OBL-EUAIA-ART11';
const E13 = 'AIGE-OBL-EUAIA-ART13';
const E53 = 'AIGE-OBL-EUAIA-ART53';

/** The coverage checklist: what the card evidences, per obligation. */
export const modelCardChecklist: readonly ChecklistItem[] = [
  { id: 'iv-1a', group: 'annex-iv', ref: 'Annex IV 1(a)', text: 'Intended purpose, name of the provider and version of the system', applies: 'high_risk', fields: ['intended_uses', 'developer', 'version'], obligation: E11 },
  { id: 'iv-1bc', group: 'annex-iv', ref: 'Annex IV 1(b), (c)', text: 'Interaction with hardware or software; versions of relevant software', applies: 'high_risk', fields: ['library', 'inputs', 'outputs'], obligation: E11 },
  { id: 'iv-1h', group: 'annex-iv', ref: 'Annex IV 1(h)', text: 'Instructions for use for the deployer', applies: 'high_risk', fields: ['links.instructions_for_use'], elsewhere: { label: 'Instructions for use (schema)', href: '/schemas/instructions-for-use.v1.json' }, obligation: E11 },
  { id: 'iv-2abc', group: 'annex-iv', ref: 'Annex IV 2(a) to (c)', text: 'Development methods, design specifications and system architecture', applies: 'high_risk', fields: ['training_procedure', 'architecture_family', 'architecture'], obligation: E11 },
  { id: 'iv-2d', group: 'annex-iv', ref: 'Annex IV 2(d)', text: 'Data requirements: datasheets, provenance, scope and main characteristics of the data', applies: 'high_risk', fields: ['datasets', 'training_data'], obligation: E11 },
  { id: 'iv-2e', group: 'annex-iv', ref: 'Annex IV 2(e)', text: 'Assessment of the human oversight measures needed', applies: 'high_risk', fields: ['human_oversight'], obligation: E11 },
  { id: 'iv-2f', group: 'annex-iv', ref: 'Annex IV 2(f)', text: 'Pre-determined changes to the system and its performance', applies: 'high_risk', fields: ['predetermined_changes'], obligation: E11 },
  { id: 'iv-2g', group: 'annex-iv', ref: 'Annex IV 2(g)', text: 'Validation and testing procedures, data and metrics', applies: 'high_risk', fields: ['evaluation_data', 'metrics'], obligation: E11 },
  { id: 'iv-2h', group: 'annex-iv', ref: 'Annex IV 2(h)', text: 'Cybersecurity measures', applies: 'high_risk', fields: ['cybersecurity'], obligation: E11 },
  { id: 'iv-3', group: 'annex-iv', ref: 'Annex IV 3', text: 'Monitoring, functioning and control: capabilities and limitations in performance, including for specific persons or groups', applies: 'high_risk', fields: ['limitations', 'fairness_assessments'], obligation: E11 },
  { id: 'iv-4', group: 'annex-iv', ref: 'Annex IV 4', text: 'Appropriateness of the performance metrics', applies: 'high_risk', fields: ['metrics_rationale'], obligation: E11 },
  { id: 'iv-5', group: 'annex-iv', ref: 'Annex IV 5', text: 'The risk management system (Art. 9)', applies: 'high_risk', fields: ['links.risk_management'], elsewhere: { label: 'Risk register entry (schema)', href: '/schemas/risk-register-entry.v1.json' }, obligation: E11 },
  { id: 'iv-6', group: 'annex-iv', ref: 'Annex IV 6', text: 'Relevant changes made through the lifecycle', applies: 'high_risk', fields: ['change_log'], obligation: E11 },
  { id: 'iv-7', group: 'annex-iv', ref: 'Annex IV 7', text: 'Harmonised standards or other specifications applied', applies: 'high_risk', fields: ['standards_applied'], obligation: E11 },
  { id: 'iv-8', group: 'annex-iv', ref: 'Annex IV 8', text: 'A copy of the EU declaration of conformity', applies: 'high_risk', fields: ['links.declaration_of_conformity'], elsewhere: { label: 'Obligation page, Art. 47', href: '/obligations/aige-obl-euaia-art47' }, obligation: E11 },
  { id: 'iv-9', group: 'annex-iv', ref: 'Annex IV 9', text: 'The system to evaluate performance in the post-market phase', applies: 'high_risk', fields: ['links.post_market_monitoring'], elsewhere: { label: 'Post-market monitoring plan (schema)', href: '/schemas/post-market-monitoring-plan.v1.json' }, obligation: E11 },
  { id: '13-a', group: 'art-13', ref: 'Art. 13(3)(a)', text: 'Identity and contact details of the provider', applies: 'high_risk', fields: ['developer', 'contact'], obligation: E13 },
  { id: '13-b-i', group: 'art-13', ref: 'Art. 13(3)(b)(i)', text: 'Intended purpose', applies: 'high_risk', fields: ['intended_uses'], obligation: E13 },
  { id: '13-b-ii', group: 'art-13', ref: 'Art. 13(3)(b)(ii)', text: 'Level of accuracy with its metrics, robustness and cybersecurity', applies: 'high_risk', fields: ['metrics', 'cybersecurity'], obligation: E13 },
  { id: '13-b-iii', group: 'art-13', ref: 'Art. 13(3)(b)(iii)', text: 'Known or foreseeable circumstances, including misuse, that may lead to risks', applies: 'high_risk', fields: ['out_of_scope_uses', 'limitations'], obligation: E13 },
  { id: '13-b-iv', group: 'art-13', ref: 'Art. 13(3)(b)(iv)', text: 'Technical capabilities to provide information that explains the output', applies: 'high_risk', fields: ['explainability'], obligation: E13 },
  { id: '13-b-v', group: 'art-13', ref: 'Art. 13(3)(b)(v)', text: 'Performance for the specific persons or groups it is intended to be used on', applies: 'high_risk', fields: ['metrics[].slice', 'fairness_assessments'], any: true, obligation: E13 },
  { id: '13-b-vi', group: 'art-13', ref: 'Art. 13(3)(b)(vi)', text: 'Input data specifications; information on the training, validation and testing data', applies: 'high_risk', fields: ['inputs', 'datasets'], obligation: E13 },
  { id: '13-b-vii', group: 'art-13', ref: 'Art. 13(3)(b)(vii)', text: 'Information to interpret the output and use it appropriately', applies: 'high_risk', fields: ['output_interpretation'], obligation: E13 },
  { id: '13-c', group: 'art-13', ref: 'Art. 13(3)(c)', text: 'Changes pre-determined at the initial conformity assessment', applies: 'high_risk', fields: ['predetermined_changes'], obligation: E13 },
  { id: '13-d', group: 'art-13', ref: 'Art. 13(3)(d)', text: 'Human oversight measures, including those that help interpret the outputs', applies: 'high_risk', fields: ['human_oversight'], obligation: E13 },
  { id: '13-e', group: 'art-13', ref: 'Art. 13(3)(e)', text: 'Compute and hardware needed, expected lifetime, maintenance and care', applies: 'high_risk', fields: ['compute_and_lifetime'], obligation: E13 },
  { id: '13-f', group: 'art-13', ref: 'Art. 13(3)(f)', text: 'Mechanisms to collect, store and interpret the logs', applies: 'high_risk', fields: ['logging'], obligation: E13 },
  { id: '53-a', group: 'art-53', ref: 'Art. 53(1)(a)', text: 'Technical documentation of the model, including its training and testing process and evaluation results (Annex XI)', applies: 'gpai', fields: ['training_procedure', 'metrics', 'gpai.technical_documentation'], obligation: E53 },
  { id: '53-b', group: 'art-53', ref: 'Art. 53(1)(b)', text: 'Information and documentation for providers who integrate the model (Annex XII)', applies: 'gpai', fields: ['intended_uses', 'limitations', 'downstream_use', 'gpai.downstream_information'], obligation: E53 },
  { id: '53-c', group: 'art-53', ref: 'Art. 53(1)(c)', text: 'A policy to comply with Union law on copyright and related rights', applies: 'gpai', fields: ['gpai.copyright_policy'], obligation: E53 },
  { id: '53-d', group: 'art-53', ref: 'Art. 53(1)(d)', text: 'A public, sufficiently detailed summary of the content used for training', applies: 'gpai', fields: ['gpai.training_content_summary'], obligation: E53 },
  { id: 'a4', group: 'iso-42001', ref: 'A.4', text: 'Resources for AI systems: data, tooling and compute documented', applies: 'always', fields: ['datasets', 'library', 'compute_and_lifetime'], obligation: 'AIGE-OBL-ISO42001-A4' },
  { id: 'a5', group: 'iso-42001', ref: 'A.5', text: 'Assessing impacts of AI systems: the impact assessment is linked', applies: 'always', fields: ['links.impact_assessment'], elsewhere: { label: 'Impact assessment builder', href: '/toolkit/impact-assessment' }, obligation: 'AIGE-OBL-ISO42001-A5' },
  { id: 'a6', group: 'iso-42001', ref: 'A.6', text: 'AI system life cycle: design, verification and validation, changes', applies: 'always', fields: ['training_procedure', 'evaluation_data', 'metrics', 'change_log'], obligation: 'AIGE-OBL-ISO42001-A6' },
  { id: 'a7', group: 'iso-42001', ref: 'A.7', text: 'Data for AI systems: provenance, quality and preparation', applies: 'always', fields: ['datasets', 'training_data', 'preprocessing'], obligation: 'AIGE-OBL-ISO42001-A7' },
  { id: 'a8', group: 'iso-42001', ref: 'A.8', text: 'Information for interested parties: uses, limits and a contact', applies: 'always', fields: ['intended_uses', 'limitations', 'contact'], obligation: 'AIGE-OBL-ISO42001-A8' },
  { id: 'a9', group: 'iso-42001', ref: 'A.9', text: 'Use of AI systems: intended and out-of-scope use', applies: 'always', fields: ['intended_uses', 'out_of_scope_uses'], obligation: 'AIGE-OBL-ISO42001-A9' },
  { id: 'map-1-1', group: 'nist', ref: 'MAP 1.1', text: 'Intended purposes, prospective settings and types of users understood and documented', applies: 'always', fields: ['intended_uses', 'users'], obligation: 'AIGE-OBL-NISTRMF-MAP' },
  { id: 'map-3', group: 'nist', ref: 'MAP 3', text: 'AI capabilities, targeted usage, goals, and expected benefits and costs are understood', applies: 'always', fields: ['description', 'intended_uses', 'tradeoffs'], obligation: 'AIGE-OBL-NISTRMF-MAP' },
  { id: 'measure-2-1', group: 'nist', ref: 'MEASURE 2.1', text: 'Test sets, metrics, and details about the tools used during TEVV are documented', applies: 'always', fields: ['evaluation_data', 'metrics'], obligation: 'AIGE-OBL-NISTRMF-MEASURE' },
  { id: 'measure-2-5', group: 'nist', ref: 'MEASURE 2.5', text: 'Validity and reliability shown, with the limits of generalisation documented', applies: 'always', fields: ['metrics', 'limitations'], obligation: 'AIGE-OBL-NISTRMF-MEASURE' },
  { id: 'measure-2-9', group: 'nist', ref: 'MEASURE 2.9', text: 'The model is explained, validated and documented, and output is interpreted within its context', applies: 'always', fields: ['explainability', 'output_interpretation'], obligation: 'AIGE-OBL-NISTRMF-MEASURE' },
  { id: 'measure-2-11', group: 'nist', ref: 'MEASURE 2.11', text: 'Fairness and bias are evaluated and the results documented', applies: 'always', fields: ['fairness_assessments'], obligation: 'AIGE-OBL-NISTRMF-MEASURE' },
  { id: 'measure-2-12', group: 'nist', ref: 'MEASURE 2.12', text: 'Environmental impact and sustainability are assessed and documented', applies: 'always', fields: ['environmental'], obligation: 'AIGE-OBL-NISTRMF-MEASURE' },
];

// ---- Sources ------------------------------------------------------------------------------

export interface BuilderSource {
  text: string;
  url: string;
  verified: 'primary' | 'secondary' | 'reported';
}

const AIA_ELI = 'https://eur-lex.europa.eu/eli/reg/2024/1689/2026-07-27/eng';
const OMNIBUS_ELI = 'https://eur-lex.europa.eu/eli/reg/2026/1744/oj/eng';
const EURLEX_NOTE =
  "EUR-Lex refused automated access on 2026-09-24; the wording was read on the Commission's AI Act Service Desk, which reproduces the Official Journal text";

export const registerSources: readonly BuilderSource[] = [
  {
    text: `Regulation (EU) 2024/1689 (Artificial Intelligence Act), Art. 49 (registration) and Annex VIII, Sections A (providers of high-risk systems, points 1 to 13), B (systems relying on Art. 6(3), points 1 to 9) and C (deployers, points 1 to 5), consolidated text of 2026-07-27. ${EURLEX_NOTE}. Publications Office of the EU (EUR-Lex). 2026-07-27.`,
    url: `${AIA_ELI}#anx_VIII`,
    verified: 'primary',
  },
  {
    text: 'Regulation (EU) 2026/1744 (Digital Omnibus on AI), deleting Annex VIII, Section B, points 7 (summary of grounds) and 9 (Member States). Publications Office of the EU (EUR-Lex). 2026-07-24.',
    url: OMNIBUS_ELI,
    verified: 'primary',
  },
  {
    text: 'Algorithmic Transparency Recording Standard (ATRS) template, version 4.0: Section 0 metadata (0.1 Title to 0.5 One sentence description), Tier 1 Section 1 Summary (1.1 Name, 1.2 Description, 1.3 Website URL, 1.4 Contact email) and the Tier 2 sections 2.1 to 2.5. Department for Science, Innovation and Technology, GOV.UK. 2025-05-08.',
    url: 'https://www.gov.uk/government/publications/algorithmic-transparency-template',
    verified: 'primary',
  },
  {
    text: 'Algorithmic Impact Assessment tool, questionnaire source (survey-enfr.json, version 1.0.1): Project Details fields (Project Title, Project ID from IT Plan, Department, Branch, Name of ADM responsible for the program, Project Phase, project description) and the section names. Government of Canada, canada-ca/aia-eia-js on GitHub. 2025-10-03.',
    url: 'https://github.com/canada-ca/aia-eia-js',
    verified: 'primary',
  },
  {
    text: 'Directive on Automated Decision-Making (an Algorithmic Impact Assessment completed and published before production; impact levels I to IV). Treasury Board of Canada Secretariat. 2025-06-24.',
    url: 'https://www.tbs-sct.canada.ca/pol/doc-eng.aspx?id=32592',
    verified: 'primary',
  },
  {
    text: 'Model card template (section headings: Model Details, Uses, Bias, Risks, and Limitations, Training Details, Evaluation, Environmental Impact, Model Card Contact). Hugging Face, huggingface_hub. 2026.',
    url: 'https://github.com/huggingface/huggingface_hub/blob/main/src/huggingface_hub/templates/modelcard_template.md',
    verified: 'primary',
  },
  {
    text: 'CycloneDX specification 1.7, JSON reference (component of type machine-learning-model; modelCard with modelParameters, quantitativeAnalysis and considerations). OWASP CycloneDX, Ecma TC54. 2025-10-21.',
    url: 'https://cyclonedx.org/docs/1.7/json/',
    verified: 'primary',
  },
  {
    text: 'ISO/IEC 42001:2023, AI management systems (Annex A control areas A.2 to A.10; the Statement of Applicability of clause 6.1.3). ISO/IEC. 2023-12. The SoA column wording was not opened: verify it against the standard.',
    url: 'https://www.iso.org/standard/81230.html',
    verified: 'primary',
  },
  {
    text: '04. The stack, Layer 02: Inventory & Transparency, and the Agent Registry pattern: the registry entry this builder writes. AI Governance Engineering Body of Knowledge. 2026-09-24.',
    url: `${SITE}/bok/the-stack#layer-02-inventory--transparency`,
    verified: 'primary',
  },
];

export const impactSources: readonly BuilderSource[] = [
  {
    text: `Regulation (EU) 2024/1689 (Artificial Intelligence Act), Art. 27: the six elements of paragraph 1, points (a) to (f); first use and updates (27(2)); notification of the results to the market surveillance authority (27(3)); consolidated text of 2026-07-27. ${EURLEX_NOTE}. Publications Office of the EU (EUR-Lex). 2026-07-27.`,
    url: `${AIA_ELI}#art_27`,
    verified: 'primary',
  },
  {
    text: 'Regulation (EU) 2026/1744 (Digital Omnibus on AI), amending Art. 27(4) and (5): the FRIA may cross-reference or include the relevant DPIA sections, and the template must allow for that; the Annex III regime, and with it the FRIA duty, applies from 2 Dec 2027. Publications Office of the EU (EUR-Lex). 2026-07-24.',
    url: OMNIBUS_ELI,
    verified: 'primary',
  },
  {
    text: 'Regulation (EU) 2016/679 (General Data Protection Regulation), Art. 35(7) minimum content of a DPIA, points (a) to (d); 35(2) advice of the DPO; 35(11) review when the risk changes; Art. 36 prior consultation. Publications Office of the EU (EUR-Lex). 2016-04-27.',
    url: 'https://eur-lex.europa.eu/eli/reg/2016/679/oj/eng#art_35',
    verified: 'primary',
  },
  {
    text: 'ISO/IEC 42005:2025, Information technology, Artificial intelligence, AI system impact assessment. ISO/IEC. 2025-05.',
    url: 'https://www.iso.org/standard/44545.html',
    verified: 'primary',
  },
  {
    text: 'Crosswalk ISO/IEC 42005 to NIST AI RMF 1.0 (clause ids and headings of ISO/IEC DIS 42005: 5.1 to 5.12 and 6.2 to 6.8.3). INCITS/AI, on the NIST Trustworthy and Responsible AI Resource Center. 2025-08-14. The clause ids are those of the draft: verify them against the published standard.',
    url: 'https://airc.nist.gov/documents/2/ai-2025-00108_ISO_IEC_42005_to_NIST_AI_RMF_Crosswalk.pdf',
    verified: 'secondary',
  },
  {
    text: '14. Governing AI development, "Impact assessments compared": who runs each assessment, when, on what trigger and with what output. AI Governance Engineering Body of Knowledge. 2026-09-24.',
    url: `${SITE}/bok/governing-development#impact-assessments-compared`,
    verified: 'primary',
  },
  {
    text: '19. Privacy and data protection law applied to AI, "The DPIA for AI systems": the fields an AI DPIA needs that a generic template lacks. AI Governance Engineering Body of Knowledge. 2026-09-24.',
    url: `${SITE}/bok/privacy-and-ai#the-dpia-for-ai-systems`,
    verified: 'primary',
  },
  {
    text: 'FRIA-as-Code pattern: a versioned assessment generated from the registry, the instructions for use and the DPIA, so an update is a diff. AI Governance Engineering Body of Knowledge. 2026-09-24.',
    url: `${SITE}/patterns/fria-as-code`,
    verified: 'primary',
  },
];

export const modelCardSources: readonly BuilderSource[] = [
  {
    text: `Regulation (EU) 2024/1689 (Artificial Intelligence Act), Art. 11(1) and Annex IV points 1 to 9 (technical documentation), Art. 13(3) points (a) to (f) (instructions for use), Art. 53(1) points (a) to (d) and 53(2) (general-purpose AI models); consolidated text of 2026-07-27. ${EURLEX_NOTE}. Publications Office of the EU (EUR-Lex). 2026-07-27.`,
    url: `${AIA_ELI}#anx_IV`,
    verified: 'primary',
  },
  {
    text: 'CycloneDX specification 1.7 (current version, released 2025-10-21) and its JSON schema bom-1.7.schema.json: component type machine-learning-model; modelCard.modelParameters (approach, task, architectureFamily, modelArchitecture, datasets, inputs, outputs), quantitativeAnalysis.performanceMetrics and considerations (users, useCases, technicalLimitations, performanceTradeoffs, ethicalConsiderations, fairnessAssessments, environmentalConsiderations). OWASP CycloneDX, Ecma TC54. 2025-10-21.',
    url: 'https://cyclonedx.org/specification/overview/',
    verified: 'primary',
  },
  {
    text: 'Model card metadata specification (license, license_name, license_link, language, library_name, tags, datasets, metrics, base_model) and the model card template. Hugging Face. 2026.',
    url: 'https://github.com/huggingface/hub-docs/blob/main/modelcard.md',
    verified: 'primary',
  },
  {
    text: 'Model Cards for Model Reporting (Mitchell et al.; arXiv 1810.03993). arXiv. 2018-10-05.',
    url: 'https://arxiv.org/abs/1810.03993',
    verified: 'primary',
  },
  {
    text: 'ISO/IEC 42001:2023, AI management systems (Annex A control areas A.4 to A.9). ISO/IEC. 2023-12.',
    url: 'https://www.iso.org/standard/81230.html',
    verified: 'primary',
  },
  {
    text: 'Artificial Intelligence Risk Management Framework (AI RMF 1.0), NIST AI 100-1 (MAP 1.1, MAP 3, MEASURE 2.1, 2.5, 2.9, 2.11 and 2.12). NIST. 2023-01-26.',
    url: 'https://nvlpubs.nist.gov/nistpubs/ai/NIST.AI.100-1.pdf',
    verified: 'primary',
  },
  {
    text: '14. Governing AI development, "The technical file" and "Model cards, system cards and datasheets". AI Governance Engineering Body of Knowledge. 2026-09-24.',
    url: `${SITE}/bok/governing-development#model-cards-system-cards-and-datasheets`,
    verified: 'primary',
  },
  {
    text: 'Model Card as Control Evidence and AIBOM patterns: the card generated from the same records production uses. AI Governance Engineering Body of Knowledge. 2026-09-24.',
    url: `${SITE}/patterns/model-card-as-control-evidence`,
    verified: 'primary',
  },
];
