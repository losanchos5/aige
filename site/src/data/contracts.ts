// contracts.ts: the AI vendor contract and licence clause checklist from
// chapter 15 (bok/15-governing-deployment.md, "Vendor contracts and licence
// terms"), rendered at /resources/contracts.
//
// One row per clause: what it governs, the risk it addresses, the red-flag
// pattern to look for (paraphrased, never quoted from any real contract), a
// fallback position to negotiate towards, the evidence an AI governance
// engineer keeps, and the ids of the references it maps to (`references`).
// A second table covers the licence families of open-weight models and
// datasets. These are engineering checks, not legal advice: the legal reading
// of a contract stays with counsel. Mappings are illustrative, not a claim of
// conformity.

export interface ContractReference {
  /** Short label as the table prints it. */
  label: string;
  /** Canonical https source. */
  url: string;
}

/** The instruments the clauses map to, keyed by the ids used in `mapsTo`. */
export const references = {
  'aia-25-4': {
    label: 'EU AI Act Art. 25(4)',
    url: 'https://eur-lex.europa.eu/eli/reg/2024/1689/2026-07-27/eng#art_25',
  },
  'aia-26': {
    label: 'EU AI Act Art. 26',
    url: 'https://ai-act-service-desk.ec.europa.eu/en/ai-act/article-26',
  },
  'aia-13': {
    label: 'EU AI Act Art. 13',
    url: 'https://eur-lex.europa.eu/eli/reg/2024/1689/2026-07-27/eng#art_13',
  },
  'iso-42001-a10': {
    label: 'ISO/IEC 42001 A.10',
    url: 'https://www.iso.org/standard/42001',
  },
  'nist-govern-6': {
    label: 'NIST AI RMF GOVERN 6',
    url: 'https://airc.nist.gov/airmf-resources/playbook/govern/',
  },
  'nist-manage-3': {
    label: 'NIST AI RMF MANAGE 3',
    url: 'https://airc.nist.gov/airmf-resources/playbook/manage/',
  },
  'mcc-ai': {
    label: 'EU MCC-AI (2025)',
    url: 'https://public-buyers-community.ec.europa.eu/communities/procurement-ai/resources/updated-eu-ai-model-contractual-clauses',
  },
  'gdpr-28': {
    label: 'GDPR Art. 28',
    url: 'https://gdpr-info.eu/art-28-gdpr/',
  },
  'gdpr-33': {
    label: 'GDPR Art. 33',
    url: 'https://gdpr-info.eu/art-33-gdpr/',
  },
  'gdpr-44': {
    label: 'GDPR Art. 44',
    url: 'https://gdpr-info.eu/art-44-gdpr/',
  },
  'dora-28': {
    label: 'DORA Art. 28',
    url: 'https://www.digital-operational-resilience-act.com/Article_28.html',
  },
  'nis2-21': {
    label: 'NIS2 Art. 21(2)(d)',
    url: 'https://www.nis-2-directive.com/NIS_2_Directive_Article_21.html',
  },
  'pld-2024-2853': {
    label: 'Product Liability Directive (EU) 2024/2853',
    url: 'https://eur-lex.europa.eu/eli/dir/2024/2853/oj/eng',
  },
} as const satisfies Record<string, ContractReference>;

export type ReferenceId = keyof typeof references;

export interface ContractClause {
  /** Stable id; the page renders it as the row's `id` (`clause-<id>`). */
  id: string;
  /** The clause, named. */
  clause: string;
  /** What the clause governs. */
  governs: string;
  /** The risk it addresses. */
  risk: string;
  /** The red-flag pattern, paraphrased. */
  redFlag: string;
  /** A fallback position to negotiate towards. */
  fallback: string;
  /** The evidence the governance function keeps. */
  evidence: string;
  /** Ids from `references`. */
  mapsTo: readonly ReferenceId[];
}

export type LicenceFamily =
  | 'permissive'
  | 'copyleft'
  | 'network-copyleft'
  | 'responsible-ai'
  | 'custom-community'
  | 'non-commercial';

export interface LicenceType {
  id: LicenceFamily;
  /** Family name. */
  family: string;
  /** Examples of the family, named as categories, not endorsements. */
  examples: string;
  /** What the licence asks of a deployer. */
  obligations: string;
  /** What to watch for in AI use. */
  watch: string;
  /** Fields to capture in the AIBOM entry. */
  aibomFields: string;
}

/** Where chapter 15 discusses the clauses. */
export const chapterAnchor = '/bok/governing-deployment#vendor-contracts-and-licence-terms';

export const disclaimer =
  'An engineering checklist, not legal advice: it names what to look for and what evidence to keep; the legal reading of a contract stays with counsel. Mappings are illustrative, not a claim of conformity.';

export const clauses: readonly ContractClause[] = [
  {
    id: 'no-training',
    clause: 'Use of your data for training',
    governs: 'Whether the supplier may use your inputs, outputs or logs to train or improve its models.',
    risk: 'Confidential or personal data absorbed into a model you do not control; loss of trade secrets.',
    redFlag: 'Training use is on by default, allowed for "service improvement", or controlled by a setting the supplier can change.',
    fallback: 'An express no-training commitment covering inputs, outputs and logs, surviving termination, with any opt-in in writing.',
    evidence: 'The clause, the account or API setting captured at go-live, and a periodic re-check of that setting.',
    mapsTo: ['iso-42001-a10', 'gdpr-28', 'mcc-ai'],
  },
  {
    id: 'input-output-rights',
    clause: 'Rights in inputs and outputs',
    governs: 'Who owns, and who may use, what you send and what the system returns.',
    risk: 'You cannot use or protect outputs you depend on; the supplier claims rights in your content.',
    redFlag: 'The supplier takes a licence to your inputs beyond providing the service, or reserves rights in outputs.',
    fallback: 'You keep your inputs; outputs are assigned or licensed to you; the supplier\'s licence is limited to running the service.',
    evidence: 'The clause, referenced from the registry entry of each system that uses the supplier.',
    mapsTo: ['iso-42001-a10', 'mcc-ai'],
  },
  {
    id: 'retention',
    clause: 'Retention and deletion',
    governs: 'How long prompts, outputs, files and logs are kept by the supplier, and how deletion is proven.',
    risk: 'Data kept longer than your lawful basis allows; logs you need for your own duties are deleted too early.',
    redFlag: 'Retention "as long as necessary" with no number, or abuse-monitoring retention you cannot shorten or see.',
    fallback: 'Stated retention per data type, deletion on request and at exit, and a deletion confirmation you can file.',
    evidence: 'Retention terms per data type; deletion confirmations; your own log-retention schedule that meets Art. 26(6).',
    mapsTo: ['aia-26', 'gdpr-28'],
  },
  {
    id: 'sub-processors',
    clause: 'Sub-processors and upstream model providers',
    governs: 'Which third parties (hosting, model providers, labelling services) touch your data.',
    risk: 'An unvetted party in the chain; the model behind the service changes supplier without notice.',
    redFlag: 'A sub-processor list that is not published, or changes with no notice and no right to object.',
    fallback: 'A published list, advance notice of changes, a right to object, and flow-down of the same terms.',
    evidence: 'Dated snapshots of the sub-processor list; objection decisions.',
    mapsTo: ['gdpr-28', 'iso-42001-a10', 'nis2-21'],
  },
  {
    id: 'residency',
    clause: 'Data residency and transfers',
    governs: 'Where inference, storage and support access happen.',
    risk: 'Unlawful transfer of personal data; inference routed outside the permitted region.',
    redFlag: 'A region commitment for storage only, while inference or support may run anywhere.',
    fallback: 'Region commitments for inference, storage and support access, with a transfer mechanism where needed.',
    evidence: 'Residency policy verdicts from the inference path; the transfer assessment.',
    mapsTo: ['gdpr-44', 'iso-42001-a10'],
  },
  {
    id: 'documentation',
    clause: 'Documentation and instructions for use',
    governs: 'The model card, instructions for use, known limitations and evaluation results the supplier provides.',
    risk: 'You cannot meet your own deployer duties (use per instructions, oversight, monitoring) without them.',
    redFlag: 'Documentation "available on request" or limited to marketing material.',
    fallback: 'A named documentation set at signature, updated with each material version, including limitations and failure modes.',
    evidence: 'Versioned copies attached to the registry entry.',
    mapsTo: ['aia-13', 'aia-25-4', 'aia-26', 'mcc-ai'],
  },
  {
    id: 'audit-eval-access',
    clause: 'Audit and evaluation access',
    governs: 'Your right to assess the supplier and to test the system.',
    risk: 'No way to verify claims; evaluation or red-teaming of the service is a breach of terms.',
    redFlag: 'Audit only by reading the supplier\'s own summary; testing, benchmarking or security research prohibited.',
    fallback: 'Independent reports on a set cadence, a right to run boundary evals and agreed red-team windows.',
    evidence: 'Reports received; your boundary eval results; the agreed test windows.',
    mapsTo: ['iso-42001-a10', 'nist-manage-3', 'mcc-ai'],
  },
  {
    id: 'change-deprecation',
    clause: 'Change notice, version pinning and deprecation',
    governs: 'How the supplier changes, replaces or retires the model you depend on.',
    risk: 'Behaviour changes in production without a release on your side; forced migration on short notice.',
    redFlag: 'Models may be "updated or improved at any time"; deprecation notice shorter than your re-validation cycle.',
    fallback: 'Pinnable versions, advance notice of material change, and a deprecation window longer than your re-validation cycle.',
    evidence: 'Change notices filed against the registry entry; re-validation results per version.',
    mapsTo: ['iso-42001-a10', 'nist-manage-3', 'aia-25-4'],
  },
  {
    id: 'incident-notice',
    clause: 'Incident and vulnerability notification',
    governs: 'When and how the supplier tells you about security incidents, data breaches and model failures.',
    risk: 'You miss your own clocks (GDPR Art. 33, AI Act serious-incident duties) because the supplier told you late.',
    redFlag: 'Notice "without undue delay" with no hours, or limited to personal-data breaches.',
    fallback: 'A notice window in hours that fits your own clocks, covering security, privacy and serious model failures.',
    evidence: 'The SLA; notices received and their timestamps; your incident records that cite them.',
    mapsTo: ['gdpr-33', 'aia-26', 'dora-28', 'nis2-21'],
  },
  {
    id: 'service-levels',
    clause: 'Availability, latency and rate limits',
    governs: 'Uptime, response time, throughput and the remedies when they fail.',
    risk: 'The business process stops when the model does; rate limits cap you at peak.',
    redFlag: 'Service credits as the only remedy for an outage that halts a critical process.',
    fallback: 'SLAs sized to the process, capacity commitments, and termination rights on repeated breach.',
    evidence: 'SLA reports; your own availability monitoring; continuity tests.',
    mapsTo: ['dora-28', 'nis2-21'],
  },
  {
    id: 'ip-indemnity',
    clause: 'IP indemnity',
    governs: 'Who defends and pays if outputs or the model infringe third-party rights.',
    risk: 'Infringement claims over generated content or training data land on you.',
    redFlag: 'Indemnity excluded when you modify prompts, use filters differently or combine outputs.',
    fallback: 'Indemnity for outputs used as documented, with conditions you can meet and evidence you can produce.',
    evidence: 'Proof that you met the indemnity conditions (filters on, documented use), kept as logs.',
    mapsTo: ['iso-42001-a10', 'nist-govern-6'],
  },
  {
    id: 'warranties',
    clause: 'Performance warranties and output disclaimers',
    governs: 'What the supplier promises about accuracy, safety and fitness.',
    risk: 'All output risk sits with you, whatever the marketing said.',
    redFlag: 'Blanket disclaimers of accuracy with no documented performance at all.',
    fallback: 'Documented performance on stated tasks, and an obligation to disclose known material degradations.',
    evidence: 'The documented performance, compared with your own evals.',
    mapsTo: ['aia-13', 'mcc-ai'],
  },
  {
    id: 'liability',
    clause: 'Liability caps and exclusions',
    governs: 'The ceiling on what the supplier pays and what it excludes.',
    risk: 'A cap far below the harm a failure can cause; exclusions that swallow the AI risk.',
    redFlag: 'A cap set at a few months of fees, with data, IP and regulatory losses all excluded.',
    fallback: 'Carve-outs from the cap for data protection, confidentiality and IP; a cap sized to the risk tier.',
    evidence: 'The cap and carve-outs, recorded as residual risk in the risk register.',
    mapsTo: ['nist-govern-6', 'pld-2024-2853'],
  },
  {
    id: 'acceptable-use',
    clause: 'Supplier acceptable-use policy',
    governs: 'Uses the supplier forbids, which bind you and your users.',
    risk: 'Your intended use, or a downstream user\'s, breaches the supplier\'s terms and the service is cut.',
    redFlag: 'A policy incorporated by reference that the supplier can change unilaterally.',
    fallback: 'A frozen copy at signature, notice of changes, and confirmation that your intended use is permitted.',
    evidence: 'The policy version checked at go-live, mapped to your own prohibited-use list.',
    mapsTo: ['iso-42001-a10'],
  },
  {
    id: 'role-allocation',
    clause: 'Role allocation and regulatory cooperation',
    governs: 'Who is provider and who is deployer, and what information, access and help flows between them.',
    risk: 'Duties fall between the parties; you become provider by rebranding or modifying without knowing it.',
    redFlag: 'Silence on AI Act roles, or a clause that shifts provider duties to you without the access to meet them.',
    fallback: 'Roles stated per system, and the information, technical access and assistance Art. 25(4) contemplates.',
    evidence: 'The role decision recorded in the registry entry, with the clause that supports it.',
    mapsTo: ['aia-25-4', 'aia-26', 'mcc-ai'],
  },
  {
    id: 'security',
    clause: 'Security controls and certifications',
    governs: 'The supplier\'s security programme, certifications and AI-specific protections.',
    risk: 'Your data and your users are exposed through the supplier\'s weaknesses, including prompt injection in shared components.',
    redFlag: 'Certifications that exclude the AI service from their scope.',
    fallback: 'Certifications that name the service in scope, plus disclosure of AI-specific tests (red team, injection).',
    evidence: 'Certificates with their scope statements; red-team summaries.',
    mapsTo: ['nis2-21', 'dora-28', 'iso-42001-a10'],
  },
  {
    id: 'exit',
    clause: 'Termination assistance, portability and exit',
    governs: 'How you leave: data return, transition help, format of what you get back.',
    risk: 'Lock-in: you cannot move prompts, fine-tunes, embeddings or logs to another supplier.',
    redFlag: 'No transition period; fine-tuned weights or adapters belong to the supplier; export only in proprietary formats.',
    fallback: 'A transition period, return of your data and tuning artefacts in open formats, and deletion afterwards.',
    evidence: 'An exit plan and the record of an exit drill.',
    mapsTo: ['dora-28', 'iso-42001-a10', 'mcc-ai'],
  },
  {
    id: 'insurance',
    clause: 'Insurance',
    governs: 'The cover the supplier must carry, and the evidence it must show.',
    risk: 'An indemnity the supplier cannot pay; AI losses excluded from the supplier\'s policies.',
    redFlag: 'No insurance clause, or cover that excludes AI-related claims.',
    fallback: 'Named cover types and limits, with certificates on request and notice of cancellation.',
    evidence: 'Certificates of insurance, dated and filed with the contract.',
    mapsTo: ['nist-govern-6'],
  },
];

export const licenceTypes: readonly LicenceType[] = [
  {
    id: 'permissive',
    family: 'Permissive',
    examples: 'Apache 2.0, MIT, BSD',
    obligations: 'Keep notices and the licence text; Apache 2.0 adds an express patent grant.',
    watch: 'The model licence may be permissive while its training data or a dataset licence is not.',
    aibomFields: 'Licence id, notice file, source URL, file hash.',
  },
  {
    id: 'copyleft',
    family: 'Copyleft',
    examples: 'GPL family',
    obligations: 'Distributing a derivative requires releasing it under the same licence.',
    watch: 'Applies to code in the serving stack as much as to the model; distribution is the trigger.',
    aibomFields: 'Licence id, what is distributed, where the source offer lives.',
  },
  {
    id: 'network-copyleft',
    family: 'Network copyleft',
    examples: 'AGPL 3.0',
    obligations: 'Users interacting over a network with a modified version must be offered its source.',
    watch: 'Serving a modified component behind an API can trigger the source offer.',
    aibomFields: 'Licence id, modification status, source-offer location.',
  },
  {
    id: 'responsible-ai',
    family: 'Responsible-AI licence (use-restricted)',
    examples: 'OpenRAIL family',
    obligations: 'Open access with listed prohibited uses that must be passed on to every downstream user and derivative.',
    watch: 'Use restrictions travel with the model: your terms of use must carry them.',
    aibomFields: 'Licence id, restriction list version, where the restrictions are flowed down.',
  },
  {
    id: 'custom-community',
    family: 'Custom community licence',
    examples: 'Vendor "community" licences for open-weight models',
    obligations: 'Acceptable-use policy incorporated by reference; attribution or naming duties; scale thresholds above which a separate licence is needed.',
    watch: 'Thresholds and policies differ per model version; naming rules can apply to derivatives you publish.',
    aibomFields: 'Licence id and version, AUP version, threshold check result, attribution duty.',
  },
  {
    id: 'non-commercial',
    family: 'Non-commercial or research-only',
    examples: 'CC BY-NC family; research licences',
    obligations: 'No commercial use.',
    watch: 'A research-only dataset or model inside a commercial product is a breach, whoever added it.',
    aibomFields: 'Licence id; a policy verdict that blocks it from production builds.',
  },
];
