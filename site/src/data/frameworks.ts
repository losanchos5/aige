// frameworks.ts: the regulatory map, faithful to bok/08-regulatory-map.md:
// the reverse index that names, for each obligation, the engineering artefact
// that evidences it and the stack layer the artefact lives in.
//
// `obligations` reproduces the chapter's obligation → artefact → layer tables
// (EU AI Act, GPAI Code of Practice, ISO/IEC 42001/42005/42006 and 23894, NIST
// AI RMF and newer NIST AI work, CSA, OWASP, US federal/state laws and other
// jurisdictions). `layerN` is an array because many rows map to more than one
// layer. Every anchor is the `#slug` of the table's H2. Mappings are
// illustrative, not a claim of conformity.
//
// STABLE IDS (schema version 2, v0.5.0). Every obligation row carries an `id`
// that other sites, datasets and citations may rely on. The rule:
//
//   AIGE-OBL-<INSTRUMENT>-<CLAUSE>
//
// - Upper-case ASCII letters, digits and hyphens only (OBLIGATION_ID_PATTERN).
// - <INSTRUMENT> is a fixed code per instrument: EUAIA (EU AI Act), GPAICOP
//   (GPAI Code of Practice), ISO42001, ISO42006, ISO23894, NISTRMF (NIST AI RMF
//   functions), NIST (newer NIST work), CSA, OWASP, USCA, USNY, USTX, USCO (US
//   states), KR, SG, UK, ETSI and CN (China).
// - <CLAUSE> is the article, clause, function or document number the row names
//   (ART9, ART4A, ART49-71, A5, GOVERN, IR8596) or, where the row stands for the
//   instrument as a whole, a short mnemonic (SB53, AIBASIC, TC260-OPS, CB). Every
//   id has both parts, so it has at least four hyphen-separated segments.
// - An id is assigned once and never changes: new wording, dates, artefacts or
//   layers keep the id. A row that is removed has its id moved to
//   `retiredObligationIds` and the id is never reused. A row that is split keeps
//   its id on the part that carries the original meaning; the new part gets a
//   new id.
// - The public page of a row is /obligations/<id in lower case>, and its JSON is
//   /api/v1/obligations/<id in lower case>.json.
//
// `appliesFrom` is the ISO date the row first applies; `appliesStatus` says
// where it stands on the `reviewed` date; `appliesNote` keeps the chapter's human
// wording; `milestones` carries the later dated steps chapter 08 states (the
// Annex I date, the public-authority legacy date, new bans, grace ends).
// `patterns` lists the chapter-05 patterns whose "Maps to:" line names the row's
// clause (tests/data.spec.ts checks the EU rows in both directions).

export type StackLayer = 1 | 2 | 3 | 4 | 5;
export type FrameworkType =
  | 'law'
  | 'standard'
  | 'framework'
  | 'code'
  | 'controls';

export interface Framework {
  /** Short id. */
  id: string;
  /** Framework name. */
  name: string;
  /** Short label for compact UI (e.g. the obligation-matrix row headers). */
  short: string;
  /** What kind of instrument it is. */
  type: FrameworkType;
  /** The body that issues or maintains it. */
  issuer: string;
  /** Canonical URL, only where the chapter or SOURCES.md gives one. */
  url?: string;
  /** One-to-two-sentence summary, faithful to the chapter. */
  summary: string;
}

/**
 * Where an obligation stands on its `reviewed` date.
 * - `in-force`: it applies now.
 * - `applies-later`: enacted, with a future application date that was not moved.
 * - `deferred`: its application date was moved later by an amending act (the
 *   Digital Omnibus for the EU high-risk duties).
 * - `grace`: in force, but enforcement is softened by an announced grace period.
 * - `voluntary`: a standard, framework or code that binds no one by itself.
 * - `pending`: a draft, proposal or initiative that is not final.
 */
export type AppliesStatus =
  | 'in-force'
  | 'applies-later'
  | 'grace'
  | 'deferred'
  | 'voluntary'
  | 'pending';

/** EU AI Act system classes a row applies to (EU AI Act rows only). */
export type SystemClass =
  | 'prohibited'
  | 'high-risk-annex-iii'
  | 'high-risk-annex-i'
  | 'transparency-art50'
  | 'gpai'
  | 'gpai-systemic'
  | 'all-ai-systems';

/** A later dated step in the application of an obligation. */
export interface Milestone {
  /** ISO date, YYYY-MM-DD. */
  date: string;
  /** The EU AI Act system classes the step concerns, where it concerns some only. */
  systemClass?: readonly SystemClass[];
  /** What happens on that date, in chapter 08's terms. */
  note: string;
}

export interface Obligation {
  /** Stable id, `AIGE-OBL-<INSTRUMENT>-<CLAUSE>` (see the rule above). Never reused. */
  id: string;
  /** Id of the instrument in `frameworks` the row belongs to. */
  frameworkId: string;
  /** The framework group the chapter's table sits under (display label). */
  framework: string;
  /** The article, clause, function or instrument the row names, as a short label. */
  clause: string;
  /** The obligation, named (e.g. "EU AI Act Art. 9 risk management system"). */
  obligation: string;
  /** What the obligation asks for, as the chapter's table states it. */
  requirement: string;
  /** The engineering artefact that produces the evidence for it. */
  artefact: string;
  /** The stack layer(s) the artefact lives in. */
  layerN: readonly StackLayer[];
  /** `#slug` of the table's section heading. */
  anchor: string;
  /** Who the obligation binds, where the chapter states it (EU AI Act rows). */
  dutyHolder?: string;
  /** Who is in scope, where the chapter's table states it (US state laws). */
  scope?: string;
  /** Who supervises it, where the chapter states it (EU AI Act rows). */
  authority?: string;
  /** ISO date (YYYY-MM-DD) the row first applies, where a date exists. */
  appliesFrom?: string;
  /** Where the row stands on its `reviewed` date. */
  appliesStatus: AppliesStatus;
  /** The chapter's human wording of when it applies. */
  appliesNote?: string;
  /** Later dated steps, in date order. */
  milestones?: readonly Milestone[];
  /** EU AI Act system classes the row applies to (EU AI Act rows only). */
  systemClass?: readonly SystemClass[];
  /** Ids from src/data/patterns.ts whose "Maps to:" line names the row's clause. */
  patterns?: readonly string[];
  /** ISO date the row was last checked against its sources. */
  reviewed: string;
}

/** The shape every obligation id must match. */
export const OBLIGATION_ID_PATTERN = /^AIGE-OBL-[A-Z0-9]+(?:-[A-Z0-9]+)+$/;

/**
 * Ids of rows that were removed. They stay here so they are never reused; an
 * id in this list must not appear in `obligations`.
 */
export const retiredObligationIds: readonly string[] = [];

/** Human labels for the statuses, for badges and filters. */
export const appliesStatusLabels: Readonly<Record<AppliesStatus, string>> = {
  'in-force': 'In force',
  'applies-later': 'Applies later',
  deferred: 'Deferred',
  grace: 'Grace period',
  voluntary: 'Voluntary',
  pending: 'Draft or proposed',
};

/** Human labels for the EU AI Act system classes. */
export const systemClassLabels: Readonly<Record<SystemClass, string>> = {
  prohibited: 'Prohibited practice',
  'high-risk-annex-iii': 'High-risk (Annex III)',
  'high-risk-annex-i': 'High-risk (Annex I)',
  'transparency-art50': 'Transparency (Art. 50)',
  gpai: 'GPAI model',
  'gpai-systemic': 'GPAI model with systemic risk',
  'all-ai-systems': 'All AI systems',
};

/** The chapter's caveat, in its own words. */
export const disclaimer =
  'Mappings are illustrative, not a claim of conformity.';

const EU_ANCHOR = 'eu-ai-act-post-omnibus';
const GPAI_ANCHOR = 'gpai-code-of-practice';
const ISO_ANCHOR = 'isoiec-42001-42005-and-42006';
const NIST_ANCHOR = 'nist-ai-rmf';
const CSA_ANCHOR = 'csa-aicm-and-star-for-ai';
const OWASP_ANCHOR = 'owasp-genai-security-project';
const US_ANCHOR = 'us-federal-and-state-laws';
const OTHER_ANCHOR = 'other-jurisdictions';
const CHINA_ANCHOR = 'china';

/** The frameworks, standards, codes and laws the chapter maps against. */
export const frameworks: readonly Framework[] = [
  {
    id: 'eu-ai-act',
    name: 'EU AI Act (post-Omnibus)',
    short: 'EU AI Act',
    type: 'law',
    issuer: 'European Union',
    url: 'https://eur-lex.europa.eu/eli/reg/2024/1689/2026-07-27/eng',
    summary:
      "The EU's horizontal, risk-tiered law for AI (Regulation (EU) 2024/1689), amended by the Digital Omnibus (Regulation (EU) 2026/1744). High-risk Annex III obligations apply from 2 December 2027; Annex I embedded systems from 2 August 2028.",
  },
  {
    id: 'gpai-code-of-practice',
    name: 'GPAI Code of Practice',
    short: 'GPAI Code',
    type: 'code',
    issuer: 'European Commission',
    url: 'https://digital-strategy.ec.europa.eu/en/policies/contents-code-gpai',
    summary:
      'The voluntary instrument (published 10 July 2025) providers use to demonstrate compliance with the GPAI obligations until harmonised standards exist. Three chapters: Safety and Security, Transparency and Copyright.',
  },
  {
    id: 'iso-42001',
    name: 'ISO/IEC 42001',
    short: 'ISO 42001',
    type: 'standard',
    issuer: 'ISO/IEC',
    summary:
      'The AI management-system (AIMS) standard (2023); Annex A groups control objectives into nine areas (A.2–A.10). It is a management-system standard, not the Article 17 QMS, and its European adoption confers no presumption of conformity.',
  },
  {
    id: 'iso-42005',
    name: 'ISO/IEC 42005',
    short: 'ISO 42005',
    type: 'standard',
    issuer: 'ISO/IEC',
    url: 'https://www.iso.org/standard/44545.html',
    summary:
      'Guidance for AI system impact assessment (2025); the natural companion to EU AI Act Article 27 (FRIA) and ISO/IEC 42001 Annex A.5.',
  },
  {
    id: 'iso-42006',
    name: 'ISO/IEC 42006:2025',
    short: 'ISO 42006',
    type: 'standard',
    issuer: 'ISO/IEC',
    url: 'https://www.iso.org/standard/42006',
    summary:
      'Requirements for bodies providing audit and certification of AI management systems (2025). It builds on ISO/IEC 17021-1 and sets the competence and consistency a certification body must meet to credibly certify an organisation to ISO/IEC 42001: in short, who may credibly certify you to 42001.',
  },
  {
    id: 'iso-23894',
    name: 'ISO/IEC 23894:2023',
    short: 'ISO 23894',
    type: 'standard',
    issuer: 'ISO/IEC',
    url: 'https://www.iso.org/standard/77304.html',
    summary:
      'Guidance on AI risk management (2023), adapting ISO 31000 to AI. It gives organisations a process for identifying, analysing and treating AI-specific risk; a companion to EU AI Act Article 9 and the NIST AI RMF.',
  },
  {
    id: 'nist-ai-rmf',
    name: 'NIST AI RMF',
    short: 'NIST AI RMF',
    type: 'framework',
    issuer: 'NIST',
    url: 'https://www.nist.gov/itl/ai-risk-management-framework',
    summary:
      'The AI Risk Management Framework 1.0 (January 2023; there is no 2.0). Voluntary and US-origin, it organises risk work into four functions (Govern, Map, Measure, Manage) that map cleanly onto the five-layer stack.',
  },
  {
    id: 'nist-ai-agent-standards',
    name: 'NIST AI Agent Standards Initiative',
    short: 'NIST Agents',
    type: 'framework',
    issuer: 'NIST (CAISI)',
    url: 'https://www.nist.gov/news-events/news/2026/02/announcing-ai-agent-standards-initiative-interoperable-and-secure',
    summary:
      'A NIST Center for AI Standards and Innovation initiative (launched 17 February 2026) to develop interoperable, secure standards for AI agents, spanning agent identity, authentication, authorisation and agent security.',
  },
  {
    id: 'nist-ir-8596',
    name: 'NIST IR 8596 Cyber AI Profile (draft)',
    short: 'NIST IR 8596',
    type: 'framework',
    issuer: 'NIST',
    url: 'https://csrc.nist.gov/pubs/ir/8596/iprd',
    summary:
      'A draft Cybersecurity Framework (CSF 2.0) profile for AI, the Cyber AI Profile, organised around Secure, Defend and Thwart. Initial preliminary draft released 16 December 2025 (comments closed 30 January 2026); still in draft as of 2026-09-24.',
  },
  {
    id: 'nist-ai-800-1',
    name: 'NIST AI 800-1 (draft)',
    short: 'NIST AI 800-1',
    type: 'framework',
    issuer: 'NIST',
    url: 'https://www.nist.gov/news-events/news/2025/01/updated-guidelines-managing-misuse-risk-dual-use-foundation-models',
    summary:
      'Draft voluntary guidance (Managing Misuse Risk for Dual-Use Foundation Models) for identifying, measuring and mitigating the misuse risk of dual-use foundation models across the AI lifecycle. Second public draft January 2025; still in draft as of 2026-09-24.',
  },
  {
    id: 'csa-aicm',
    name: 'CSA AI Controls Matrix (AICM) v1.1',
    short: 'CSA AICM',
    type: 'controls',
    issuer: 'Cloud Security Alliance',
    url: 'https://cloudsecurityalliance.org/artifacts/ai-controls-matrix-v1-1',
    summary:
      'A control framework (published 22 June 2026) defining 247 control objectives across 18 domains, spanning governance, data, model and runtime, with crosswalks to ISO 42001 and NIST AI RMF.',
  },
  {
    id: 'csa-star-for-ai',
    name: 'CSA STAR for AI',
    short: 'CSA STAR',
    type: 'framework',
    issuer: 'Cloud Security Alliance',
    url: 'https://cloudsecurityalliance.org/star/ai',
    summary:
      'The assurance and certification programme built on the AICM, with a self-assessment tier, an automated "Valid-AI-ted" tier and a Level 2 combining third-party ISO/IEC 42001 certification with the validated assessment.',
  },
  {
    id: 'owasp-agentic-top-10',
    name: 'OWASP Top 10 for Agentic Applications 2026',
    short: 'OWASP Agentic',
    type: 'framework',
    issuer: 'OWASP GenAI Security Project',
    url: 'https://genai.owasp.org/resource/owasp-top-10-for-agentic-applications-for-2026/',
    summary:
      'The agent threat catalogue (ASI01 Agent Goal Hijack … ASI10 Rogue Agents) that the runtime controls are built against.',
  },
  {
    id: 'owasp-llm-top-10',
    name: 'OWASP Top 10 for LLM Applications 2026',
    short: 'OWASP LLM',
    type: 'framework',
    issuer: 'OWASP GenAI Security Project',
    url: 'https://genai.owasp.org/resource/owasp-genai-llm-top-10-2026/',
    summary:
      'The LLM threat catalogue, including Excessive Agency at #3, answered by prompt-injection and output-handling controls and an eval gate.',
  },
  {
    id: 'owasp-acs',
    name: 'OWASP Agent Control Standard (ACS)',
    short: 'OWASP ACS',
    type: 'standard',
    issuer: 'OWASP GenAI Security Project',
    url: 'https://genai.owasp.org/resource/agent-control-standard-acs/',
    summary:
      'A standard for expressing agent controls as machine-readable control definitions the stack consumes directly.',
  },
  {
    id: 'owasp-aibom',
    name: 'OWASP AIBOM',
    short: 'OWASP AIBOM',
    type: 'standard',
    issuer: 'OWASP GenAI Security Project',
    url: 'https://genai.owasp.org/initiatives/ai-sbom-initiative/',
    summary:
      'The AI bill-of-materials format and generator, producing CycloneDX ML-BOM and SPDX 3.0 AI output at build.',
  },
  {
    id: 'ca-sb-53',
    name: 'California SB 53 (TFAIA)',
    short: 'California SB 53',
    type: 'law',
    issuer: 'State of California',
    url: 'https://leginfo.legislature.ca.gov/faces/billTextClient.xhtml?bill_id=202520260SB53',
    summary:
      'A frontier-AI transparency law in force 1 January 2026, binding large frontier developers (models above ~10^26 FLOP; developer revenue over USD 500M) to publish a frontier AI framework and report critical safety incidents to the California Office of Emergency Services within 15 days.',
  },
  {
    id: 'ny-raise-act',
    name: 'New York RAISE Act',
    short: 'New York RAISE',
    type: 'law',
    issuer: 'State of New York',
    url: 'https://www.governor.ny.gov/news/governor-hochul-signs-nation-leading-legislation-require-ai-frameworks-ai-frontier-models',
    summary:
      'A frontier-AI safety law (S6953B) binding large frontier developers to publish a safety framework and disclose incidents. Signed 19 December 2025 and effective 1 January 2027 after a March 2026 chapter amendment, with oversight in an office within the New York Department of Financial Services (DFS).',
  },
  {
    id: 'tx-traiga',
    name: 'Texas TRAIGA (HB 149)',
    short: 'Texas TRAIGA',
    type: 'law',
    issuer: 'State of Texas',
    url: 'https://capitol.texas.gov/tlodocs/89R/billtext/pdf/HB00149F.pdf',
    summary:
      'The Texas Responsible Artificial Intelligence Governance Act (HB 149), in force 1 January 2026. Intent-based prohibitions (e.g. social scoring, unlawful discrimination), disclosure duties and a regulatory sandbox, enforced by the Attorney General and preempting local AI rules.',
  },
  {
    id: 'co-ai-act',
    name: 'Colorado AI Act (SB 24-205)',
    short: 'Colorado AI Act',
    type: 'law',
    issuer: 'State of Colorado',
    url: 'https://leg.colorado.gov/bills/sb24-205',
    summary:
      'A duty-of-care regime against algorithmic discrimination in high-risk (consequential) automated decisions. Its 1 February 2026 start was delayed to 30 June 2026, then the Act was replaced by SB 26-189 (signed 14 May 2026), a narrower transparency law effective 1 January 2027.',
  },
  {
    id: 'kr-ai-basic-act',
    name: 'South Korea AI Basic Act',
    short: 'Korea AI Act',
    type: 'law',
    issuer: 'Republic of Korea',
    url: 'https://www.trade.gov/market-intelligence/south-korea-ai-basic-act',
    summary:
      "South Korea's framework Act on AI (Basic Act on the Development of AI and Establishment of Trust), in force 22 January 2026. It sets baseline duties for AI operators and heightened obligations for \"high-impact\" AI in sensitive sectors; the ministry (MSIT) is running a grace period of at least one year in 2026, deferring fact-finding investigations and fines except in serious cases.",
  },
  {
    id: 'uk-duaa',
    name: 'UK Data (Use and Access) Act 2025',
    short: 'UK DUAA',
    type: 'law',
    issuer: 'United Kingdom',
    url: 'https://www.legislation.gov.uk/ukpga/2025/18/section/80',
    summary:
      'The UK has no horizontal AI act; it governs AI through sector regulators and the AI Security Institute. For automated decision-making, the Data (Use and Access) Act 2025 replaced UK GDPR Article 22 with Articles 22A–22D (in force 5 February 2026): a permission-plus-safeguards regime for significant, solely automated decisions.',
  },
  {
    id: 'sg-genai-framework',
    name: 'Singapore Model AI Governance Framework for Generative AI',
    short: 'Singapore GenAI',
    type: 'framework',
    issuer: 'IMDA / AI Verify Foundation',
    url: 'https://aiverifyfoundation.sg/wp-content/uploads/2024/05/Model-AI-Governance-Framework-for-Generative-AI-May-2024-1-1.pdf',
    summary:
      "Singapore's voluntary Model AI Governance Framework for Generative AI (IMDA and the AI Verify Foundation, May 2024). It sets out governance dimensions (testing, transparency, incident reporting, security and content provenance) as guidance, not law.",
  },
  {
    id: 'cn-algo-recommendation',
    name: 'China Provisions on Algorithmic Recommendation (2022)',
    short: 'China Algo. Rec.',
    type: 'law',
    issuer: 'CAC, MIIT, MPS and SAMR (China)',
    url: 'https://www.cac.gov.cn/2022-01/04/c_1642894606364259.htm',
    summary:
      "China's binding Provisions on Algorithmic Recommendation (CAC, MIIT, MPS and SAMR, Order No. 9), in force 1 March 2022. Algorithm filing for services with public-opinion or social-mobilisation capacity, a security assessment, display of the filing number, and a user option to switch off personalised recommendation.",
  },
  {
    id: 'cn-deep-synthesis',
    name: 'China Provisions on Deep Synthesis (2023)',
    short: 'China Deep Synthesis',
    type: 'law',
    issuer: 'CAC, MIIT and MPS (China)',
    url: 'https://www.cac.gov.cn/2022-12/11/c_1672221949354811.htm',
    summary:
      "China's binding Provisions on Deep Synthesis (CAC, MIIT and MPS, Order No. 12), in force 10 January 2023. Conspicuous labels where synthetic content could mislead the public and non-removable technical marks, training-data management, separate consent for face and voice editing, and filing plus a security assessment for opinion-shaping functions.",
  },
  {
    id: 'cn-genai-measures',
    name: 'China Interim Measures for Generative AI Services (2023)',
    short: 'China GenAI Measures',
    type: 'law',
    issuer: 'CAC and six other bodies (China)',
    url: 'https://www.cac.gov.cn/2023-07/13/c_1690898327029107.htm',
    summary:
      "China's binding Interim Measures for Generative AI Services (CAC and six other bodies, Order No. 15), in force 15 August 2023, for services offered to the public within the PRC. Lawful-source training data and foundation models, content labelling under the deep-synthesis rules, a security assessment and algorithm filing for opinion-shaping services, and a duty to stop, remove, retrain and report on illegal content.",
  },
  {
    id: 'cn-content-labelling',
    name: 'China Measures for Labelling AI-Generated Synthetic Content (2025)',
    short: 'China AI Labelling',
    type: 'law',
    issuer: 'CAC, MIIT, MPS and NRTA (China)',
    url: 'https://www.cac.gov.cn/2025-03/14/c_1743654684782215.htm',
    summary:
      "China's binding Measures for Labelling AI-Generated Synthetic Content (CAC, MIIT, MPS and NRTA), in force 1 September 2025 alongside the mandatory standard GB 45438-2025. Explicit labels (text, audio or graphic) and implicit metadata labels carrying the provider's name or code and a content number; distribution platforms verify the metadata and flag suspected AI content.",
  },
  {
    id: 'cn-gbt-45654',
    name: 'GB/T 45654-2025 Basic security requirements for generative AI services',
    short: 'GB/T 45654',
    type: 'standard',
    issuer: 'SAMR / SAC, drafted by TC260 (China)',
    url: 'https://openstd.samr.gov.cn/bzgk/std/newGbInfo?hcno=F67D3F376E0A0A0FF5317FB36B32A30A',
    summary:
      'GB/T 45654-2025 Basic security requirements for generative AI services (SAMR / SAC, drafted by TC260), a recommended (voluntary) national standard implemented 1 November 2025. Training-corpus source and content screening, model-safety requirements and the evaluation methods that underpin the security assessment.',
  },
  {
    id: 'cn-tc260-framework',
    name: 'TC260 AI Safety Governance Framework 3.0',
    short: 'TC260 Framework 3.0',
    type: 'framework',
    issuer: 'TC260 under CAC guidance (China)',
    url: 'https://www.cac.gov.cn/rootimages/uploadimg/1791137114683961/1791137114683961.pdf',
    summary:
      "China's voluntary AI safety governance framework (14 September 2026, building on 1.0 in 2024 and 2.0 in 2025): a three-block risk taxonomy, technological and governance countermeasures and role-based guidelines. Appendix 2 is an agentic AI risk-management framework covering identity, human checkpoints, tool control, runtime guardrails, memory, auditing and decommissioning.",
  },
  {
    id: 'etsi-en-304-223',
    name: 'ETSI EN 304 223',
    short: 'ETSI EN 304 223',
    type: 'standard',
    issuer: 'ETSI',
    url: 'https://www.etsi.org/newsroom/press-releases/2627-etsi-releases-world-leading-standard-for-securing-ai/',
    summary:
      'Securing Artificial Intelligence (SAI); Baseline Cyber Security Requirements for AI Models and Systems (V2.1.1, December 2025). A cross-border European standard setting 13 security principles across the five stages of the AI lifecycle: a cyber-security baseline, not an EU AI Act harmonised standard.',
  },
  {
    id: 'en-18286',
    name: 'EN 18286:2026',
    short: 'EN 18286',
    type: 'standard',
    issuer: 'CEN-CENELEC',
    url: 'https://www.cencenelec.eu/news-events/news/2026/en-in-the-spotlight/2026-07-30-ai-quality-management/',
    summary:
      'The Article 17 QMS standard, published July 2026 (the first JTC 21 AI Act standard to reach publication) but not yet cited in the Official Journal, so it carries no presumption of conformity.',
  },
] as const;

// Review stamps: the debt-and-date pass re-verified the EU AI Act dates, the
// NIST drafts, the OWASP LLM Top 10, the US state dates and the "Other
// jurisdictions" rows on 2026-09-24; the China rows keep chapter 08's stamp of
// 2026-09-20; the rest were last checked for v0.4.0 on 2026-09-19.
const REVIEWED_DEBT_PASS = '2026-09-24';
const REVIEWED_CHINA = '2026-09-20';
const REVIEWED_V040 = '2026-09-19';

const HIGH_RISK: readonly SystemClass[] = ['high-risk-annex-iii', 'high-risk-annex-i'];
const ANNEX_III: readonly SystemClass[] = ['high-risk-annex-iii'];

// The two later high-risk dates chapter 08 states in the section lead.
const ANNEX_I_STEP: Milestone = {
  date: '2028-08-02',
  systemClass: ['high-risk-annex-i'],
  note: 'Applies to Annex I embedded (product safety-component) systems',
};
const PUBLIC_AUTHORITY_STEP: Milestone = {
  date: '2030-08-02',
  note: 'Deadline for legacy high-risk systems intended for use by public authorities (Art. 111(2))',
};
const HIGH_RISK_STEPS: readonly Milestone[] = [ANNEX_I_STEP, PUBLIC_AUTHORITY_STEP];
const ANNEX_III_STEPS: readonly Milestone[] = [PUBLIC_AUTHORITY_STEP];
const GPAI_STEPS: readonly Milestone[] = [
  { date: '2026-08-02', note: 'Commission enforcement powers apply' },
];

const EU = 'EU AI Act';
const EU_ID = 'eu-ai-act';
const MSA = 'National MSA';
const ANNEX_III_NOTE = '2027-12-02 (Annex III)';

/** The obligation → artefact → layer rows, faithful to the chapter's tables. */
export const obligations: readonly Obligation[] = [
  // EU AI Act, post-Omnibus
  {
    id: 'AIGE-OBL-EUAIA-ART4',
    frameworkId: EU_ID,
    framework: EU,
    clause: 'Art. 4',
    obligation: 'EU AI Act Art. 4 AI literacy',
    requirement:
      'AI literacy: take measures to support the development of AI literacy among staff and operators',
    artefact:
      'Literacy programme as code; role-based training records; onboarding gates',
    layerN: [1],
    anchor: EU_ANCHOR,
    dutyHolder: 'Provider + deployer',
    authority: 'Provider/deployer duty; national MSA',
    appliesFrom: '2025-02-02',
    appliesStatus: 'in-force',
    appliesNote: '2025-02-02; reworded 2026-07-27 (in force)',
    milestones: [
      {
        date: '2026-07-27',
        note: 'Omnibus rewording in force: providers and deployers take measures to support AI literacy',
      },
    ],
    systemClass: ['all-ai-systems'],
    reviewed: REVIEWED_DEBT_PASS,
  },
  {
    id: 'AIGE-OBL-EUAIA-ART4A',
    frameworkId: EU_ID,
    framework: EU,
    clause: 'Art. 4a',
    obligation:
      'EU AI Act Art. 4a lawful basis for special-category data in bias detection',
    requirement:
      'Lawful basis to process special-category data for bias detection in high-risk systems, with pseudonymisation and deletion once bias is corrected',
    artefact:
      'Data governance controls; pseudonymisation and retention-as-code; data card noting basis and deletion',
    layerN: [2],
    anchor: EU_ANCHOR,
    dutyHolder: 'Provider',
    authority: 'National MSA / DPAs',
    appliesFrom: '2026-07-27',
    appliesStatus: 'in-force',
    appliesNote: '2026-07-27 (new, in force)',
    systemClass: HIGH_RISK,
    reviewed: REVIEWED_DEBT_PASS,
  },
  {
    id: 'AIGE-OBL-EUAIA-ART5',
    frameworkId: EU_ID,
    framework: EU,
    clause: 'Art. 5',
    obligation: 'EU AI Act Art. 5 prohibited practices (incl. new NCII and CSAM bans)',
    requirement:
      'Prohibited practices; new bans on AI-generated non-consensual intimate imagery (NCII) and CSAM',
    artefact:
      'Policy-as-code blocklist; input/output guardrails; refusal and abuse detection',
    layerN: [1, 4],
    anchor: EU_ANCHOR,
    dutyHolder: 'Provider + deployer',
    authority: MSA,
    appliesFrom: '2025-02-02',
    appliesStatus: 'in-force',
    appliesNote: '2026-12-02 (new bans); earlier prohibitions from 2025-02-02',
    milestones: [
      {
        date: '2026-12-02',
        systemClass: ['prohibited'],
        note: 'New bans on AI-generated NCII and CSAM apply',
      },
    ],
    systemClass: ['prohibited'],
    reviewed: REVIEWED_DEBT_PASS,
  },
  {
    id: 'AIGE-OBL-EUAIA-ART6',
    frameworkId: EU_ID,
    framework: EU,
    clause: 'Art. 6',
    obligation:
      'EU AI Act Art. 6 classification of high-risk AI systems (incl. the Annex III route)',
    requirement:
      'Classification rules for high-risk AI systems, incl. the Annex III (standalone) route and Annex I (safety-component) route',
    artefact:
      'Risk-tiering as code; high-risk classification decision record; register entry flagging Annex III status',
    layerN: [1, 2],
    anchor: EU_ANCHOR,
    dutyHolder: 'Provider',
    authority: MSA,
    appliesFrom: '2027-12-02',
    appliesStatus: 'deferred',
    appliesNote: ANNEX_III_NOTE,
    milestones: [
      {
        date: '2028-08-02',
        systemClass: ['high-risk-annex-i'],
        note: 'The Annex I (safety-component) route applies',
      },
    ],
    systemClass: HIGH_RISK,
    reviewed: REVIEWED_DEBT_PASS,
  },
  {
    id: 'AIGE-OBL-EUAIA-ART9',
    frameworkId: EU_ID,
    framework: EU,
    clause: 'Art. 9',
    obligation: 'EU AI Act Art. 9 risk management system',
    requirement: 'Risk management system across the high-risk lifecycle',
    artefact:
      'Risk register as code; threat models; linkage to FRIA and eval results',
    layerN: [1, 3],
    anchor: EU_ANCHOR,
    dutyHolder: 'Provider',
    authority: MSA,
    appliesFrom: '2027-12-02',
    appliesStatus: 'deferred',
    appliesNote: ANNEX_III_NOTE,
    milestones: HIGH_RISK_STEPS,
    systemClass: HIGH_RISK,
    patterns: [
      'pattern-policy-card',
      'pattern-adversarial-red-team-suite',
      'pattern-fria-as-code',
    ],
    reviewed: REVIEWED_DEBT_PASS,
  },
  {
    id: 'AIGE-OBL-EUAIA-ART10',
    frameworkId: EU_ID,
    framework: EU,
    clause: 'Art. 10',
    obligation: 'EU AI Act Art. 10 data and data governance',
    requirement:
      'Data and data governance; representative, relevant, error-checked datasets',
    artefact: 'Data cards; lineage; bias and quality tests in CI',
    layerN: [2, 3],
    anchor: EU_ANCHOR,
    dutyHolder: 'Provider',
    authority: MSA,
    appliesFrom: '2027-12-02',
    appliesStatus: 'deferred',
    appliesNote: ANNEX_III_NOTE,
    milestones: HIGH_RISK_STEPS,
    systemClass: HIGH_RISK,
    reviewed: REVIEWED_DEBT_PASS,
  },
  {
    id: 'AIGE-OBL-EUAIA-ART11',
    frameworkId: EU_ID,
    framework: EU,
    clause: 'Art. 11',
    obligation: 'EU AI Act Art. 11 technical documentation (Annex IV)',
    requirement: 'Technical documentation (Annex IV) drawn up and kept up to date',
    artefact:
      'AIBOM (CycloneDX ML-BOM, SPDX 3.0 AI); auto-generated technical documentation; model cards',
    layerN: [2],
    anchor: EU_ANCHOR,
    dutyHolder: 'Provider',
    authority: MSA,
    appliesFrom: '2027-12-02',
    appliesStatus: 'deferred',
    appliesNote: ANNEX_III_NOTE,
    milestones: HIGH_RISK_STEPS,
    systemClass: HIGH_RISK,
    patterns: [
      'pattern-agent-registry',
      'pattern-aibom',
      'pattern-model-card-as-control-evidence',
    ],
    reviewed: REVIEWED_DEBT_PASS,
  },
  {
    id: 'AIGE-OBL-EUAIA-ART12',
    frameworkId: EU_ID,
    framework: EU,
    clause: 'Art. 12',
    obligation: 'EU AI Act Art. 12 record-keeping and logging',
    requirement:
      "Record-keeping: automatic logging of events over the system's lifetime",
    artefact:
      'Structured, signed logs; OpenTelemetry traces; tamper-evident event store',
    layerN: [4],
    anchor: EU_ANCHOR,
    dutyHolder: 'Provider',
    authority: MSA,
    appliesFrom: '2027-12-02',
    appliesStatus: 'deferred',
    appliesNote: ANNEX_III_NOTE,
    milestones: HIGH_RISK_STEPS,
    systemClass: HIGH_RISK,
    patterns: [
      'pattern-machine-readable-evidence-oscal',
      'pattern-agent-identity--scoped-credentials',
    ],
    reviewed: REVIEWED_DEBT_PASS,
  },
  {
    id: 'AIGE-OBL-EUAIA-ART13',
    frameworkId: EU_ID,
    framework: EU,
    clause: 'Art. 13',
    obligation: 'EU AI Act Art. 13 transparency and information to deployers',
    requirement: 'Transparency and provision of information to deployers',
    artefact:
      'Instructions for use as code; model and data cards; capability and limitation notes',
    layerN: [2],
    anchor: EU_ANCHOR,
    dutyHolder: 'Provider',
    authority: MSA,
    appliesFrom: '2027-12-02',
    appliesStatus: 'deferred',
    appliesNote: ANNEX_III_NOTE,
    milestones: HIGH_RISK_STEPS,
    systemClass: HIGH_RISK,
    patterns: ['pattern-model-card-as-control-evidence'],
    reviewed: REVIEWED_DEBT_PASS,
  },
  {
    id: 'AIGE-OBL-EUAIA-ART14',
    frameworkId: EU_ID,
    framework: EU,
    clause: 'Art. 14',
    obligation: 'EU AI Act Art. 14 human oversight',
    requirement: 'Human oversight designed into the system',
    artefact:
      'Human-in-the-loop checkpoints; kill switch; override and escalation paths',
    layerN: [4],
    anchor: EU_ANCHOR,
    dutyHolder: 'Provider',
    authority: MSA,
    appliesFrom: '2027-12-02',
    appliesStatus: 'deferred',
    appliesNote: ANNEX_III_NOTE,
    milestones: HIGH_RISK_STEPS,
    systemClass: HIGH_RISK,
    patterns: [
      'pattern-runtime-guardrail',
      'pattern-kill-switch--circuit-breaker',
      'pattern-agent-identity--scoped-credentials',
      'pattern-human-in-the-loop-gate',
    ],
    reviewed: REVIEWED_DEBT_PASS,
  },
  {
    id: 'AIGE-OBL-EUAIA-ART15',
    frameworkId: EU_ID,
    framework: EU,
    clause: 'Art. 15',
    obligation: 'EU AI Act Art. 15 accuracy, robustness and cybersecurity',
    requirement: 'Accuracy, robustness and cybersecurity',
    artefact:
      'Eval gate; adversarial red-team suite; robustness and security controls; regression evals',
    layerN: [3, 4],
    anchor: EU_ANCHOR,
    dutyHolder: 'Provider',
    authority: MSA,
    appliesFrom: '2027-12-02',
    appliesStatus: 'deferred',
    appliesNote: ANNEX_III_NOTE,
    milestones: HIGH_RISK_STEPS,
    systemClass: HIGH_RISK,
    patterns: [
      'pattern-eval-gate-in-ci',
      'pattern-adversarial-red-team-suite',
      'pattern-runtime-guardrail',
      'pattern-kill-switch--circuit-breaker',
      'pattern-agent-identity--scoped-credentials',
    ],
    reviewed: REVIEWED_DEBT_PASS,
  },
  {
    id: 'AIGE-OBL-EUAIA-ART17',
    frameworkId: EU_ID,
    framework: EU,
    clause: 'Art. 17',
    obligation: 'EU AI Act Art. 17 quality management system',
    requirement: 'Quality management system',
    artefact:
      'QMS-as-code; versioned policies; pipeline controls and change management',
    layerN: [1, 5],
    anchor: EU_ANCHOR,
    dutyHolder: 'Provider',
    authority: MSA,
    appliesFrom: '2027-12-02',
    appliesStatus: 'deferred',
    appliesNote: ANNEX_III_NOTE,
    milestones: HIGH_RISK_STEPS,
    systemClass: HIGH_RISK,
    patterns: ['pattern-machine-readable-evidence-oscal'],
    reviewed: REVIEWED_DEBT_PASS,
  },
  {
    id: 'AIGE-OBL-EUAIA-ART25',
    frameworkId: EU_ID,
    framework: EU,
    clause: 'Art. 25',
    obligation: 'EU AI Act Art. 25 responsibilities along the AI value chain',
    requirement:
      'Responsibilities along the AI value chain: when a distributor, importer or deployer becomes a provider, and the information a provider must pass to actors downstream',
    artefact:
      'Value-chain due-diligence gate; provider/deployer responsibility allocation; AIBOM and model/data cards collected from upstream providers',
    layerN: [2, 5],
    anchor: EU_ANCHOR,
    dutyHolder: 'Provider + value-chain actors',
    authority: MSA,
    appliesFrom: '2027-12-02',
    appliesStatus: 'deferred',
    appliesNote: ANNEX_III_NOTE,
    milestones: HIGH_RISK_STEPS,
    systemClass: HIGH_RISK,
    patterns: ['pattern-vendor--model-due-diligence-gate'],
    reviewed: REVIEWED_DEBT_PASS,
  },
  {
    id: 'AIGE-OBL-EUAIA-ART26',
    frameworkId: EU_ID,
    framework: EU,
    clause: 'Art. 26',
    obligation: 'EU AI Act Art. 26 deployer obligations for high-risk systems',
    requirement:
      'Deployer obligations for high-risk systems (use per instructions, monitoring, human oversight)',
    artefact:
      'Deployment registry; monitoring hooks; assigned oversight and logging retention',
    layerN: [2, 4],
    anchor: EU_ANCHOR,
    dutyHolder: 'Deployer',
    authority: MSA,
    appliesFrom: '2027-12-02',
    appliesStatus: 'deferred',
    appliesNote: ANNEX_III_NOTE,
    milestones: HIGH_RISK_STEPS,
    systemClass: HIGH_RISK,
    patterns: ['pattern-vendor--model-due-diligence-gate'],
    reviewed: REVIEWED_DEBT_PASS,
  },
  {
    id: 'AIGE-OBL-EUAIA-ART27',
    frameworkId: EU_ID,
    framework: EU,
    clause: 'Art. 27',
    obligation:
      'EU AI Act Art. 27 Fundamental Rights Impact Assessment (FRIA)',
    requirement:
      'Fundamental Rights Impact Assessment (FRIA) for deployers of Annex III systems',
    artefact:
      'FRIA-as-code from a template; cross-reference to a GDPR Art. 35 DPIA',
    layerN: [1, 2],
    anchor: EU_ANCHOR,
    dutyHolder: 'Deployer',
    authority: MSA,
    appliesFrom: '2027-12-02',
    appliesStatus: 'deferred',
    appliesNote: ANNEX_III_NOTE,
    milestones: ANNEX_III_STEPS,
    systemClass: ANNEX_III,
    patterns: ['pattern-fria-as-code', 'pattern-vendor--model-due-diligence-gate'],
    reviewed: REVIEWED_DEBT_PASS,
  },
  {
    id: 'AIGE-OBL-EUAIA-ART43',
    frameworkId: EU_ID,
    framework: EU,
    clause: 'Art. 43',
    obligation: 'EU AI Act Art. 43 conformity assessment',
    requirement:
      'Conformity assessment before placing on the market (internal control, or a notified body for Annex III point 1 biometrics)',
    artefact:
      'Conformity-assessment workflow; internal-control or notified-body evidence pack; traceability to Annex IV documentation',
    layerN: [1, 5],
    anchor: EU_ANCHOR,
    dutyHolder: 'Provider',
    authority: MSA,
    appliesFrom: '2027-12-02',
    appliesStatus: 'deferred',
    appliesNote: ANNEX_III_NOTE,
    milestones: HIGH_RISK_STEPS,
    systemClass: HIGH_RISK,
    reviewed: REVIEWED_DEBT_PASS,
  },
  {
    id: 'AIGE-OBL-EUAIA-ART47',
    frameworkId: EU_ID,
    framework: EU,
    clause: 'Art. 47',
    obligation: 'EU AI Act Art. 47 EU declaration of conformity',
    requirement: 'EU declaration of conformity drawn up on completing the assessment',
    artefact:
      'Auto-generated EU declaration of conformity from the evidence; CE-marking record',
    layerN: [2, 5],
    anchor: EU_ANCHOR,
    dutyHolder: 'Provider',
    authority: MSA,
    appliesFrom: '2027-12-02',
    appliesStatus: 'deferred',
    appliesNote: ANNEX_III_NOTE,
    milestones: HIGH_RISK_STEPS,
    systemClass: HIGH_RISK,
    reviewed: REVIEWED_DEBT_PASS,
  },
  {
    id: 'AIGE-OBL-EUAIA-ART49-71',
    frameworkId: EU_ID,
    framework: EU,
    clause: 'Art. 49 / Art. 71',
    obligation:
      'EU AI Act Art. 49/71 registration of high-risk systems in the EU database',
    requirement: 'Registration of high-risk systems in the EU database',
    artefact:
      'Agent/model registry with an API that feeds registration; owner and status per entry',
    layerN: [2],
    anchor: EU_ANCHOR,
    dutyHolder: 'Provider; public-authority deployer',
    authority: 'National MSA; Commission (database)',
    appliesFrom: '2027-12-02',
    appliesStatus: 'deferred',
    appliesNote: ANNEX_III_NOTE,
    milestones: ANNEX_III_STEPS,
    systemClass: ANNEX_III,
    patterns: ['pattern-agent-registry', 'pattern-shadow-ai-discovery'],
    reviewed: REVIEWED_DEBT_PASS,
  },
  {
    id: 'AIGE-OBL-EUAIA-ART50',
    frameworkId: EU_ID,
    framework: EU,
    clause: 'Art. 50',
    obligation: 'EU AI Act Art. 50 transparency for certain AI systems',
    requirement:
      'Transparency for certain AI systems: chatbot disclosure; marking and labelling of synthetic content',
    artefact:
      'Content labelling and machine-readable marking (C2PA-style); chatbot disclosure banner',
    layerN: [4, 2],
    anchor: EU_ANCHOR,
    dutyHolder: 'Provider + deployer',
    authority: MSA,
    appliesFrom: '2026-08-02',
    appliesStatus: 'in-force',
    appliesNote: '2026-08-02; marking grace for existing systems to 2026-12-02',
    milestones: [
      { date: '2026-12-02', note: 'Marking grace for existing systems ends' },
    ],
    systemClass: ['transparency-art50'],
    reviewed: REVIEWED_DEBT_PASS,
  },
  {
    id: 'AIGE-OBL-EUAIA-ART53',
    frameworkId: EU_ID,
    framework: EU,
    clause: 'Art. 53',
    obligation: 'EU AI Act Art. 53 GPAI provider obligations',
    requirement:
      'GPAI provider obligations, incl. a public summary of training content on an AI Office template',
    artefact:
      'Model cards; training-content summary; AIBOM and dataset provenance',
    layerN: [2],
    anchor: EU_ANCHOR,
    dutyHolder: 'GPAI provider',
    authority: 'AI Office',
    appliesFrom: '2025-08-02',
    appliesStatus: 'in-force',
    appliesNote: 'Obligations from 2025-08-02; enforcement from 2026-08-02',
    milestones: GPAI_STEPS,
    systemClass: ['gpai'],
    patterns: ['pattern-aibom', 'pattern-vendor--model-due-diligence-gate'],
    reviewed: REVIEWED_DEBT_PASS,
  },
  {
    id: 'AIGE-OBL-EUAIA-ART55',
    frameworkId: EU_ID,
    framework: EU,
    clause: 'Art. 55',
    obligation: 'EU AI Act Art. 55 GPAI models with systemic risk',
    requirement:
      'GPAI models with systemic risk: model evaluation incl. adversarial testing; Union-level risk assessment; serious-incident reporting; cybersecurity of the model',
    artefact:
      'Eval and red-team suite; incident pipeline on the Commission serious-incident reporting template; weight-security controls; threat model',
    layerN: [3, 4, 5],
    anchor: EU_ANCHOR,
    dutyHolder: 'GPAI provider (systemic risk)',
    authority: 'AI Office',
    appliesFrom: '2025-08-02',
    appliesStatus: 'in-force',
    appliesNote: 'Obligations from 2025-08-02; enforcement from 2026-08-02',
    milestones: GPAI_STEPS,
    systemClass: ['gpai-systemic'],
    patterns: [
      'pattern-eval-gate-in-ci',
      'pattern-adversarial-red-team-suite',
      'pattern-incident-pipeline',
    ],
    reviewed: REVIEWED_DEBT_PASS,
  },
  {
    id: 'AIGE-OBL-EUAIA-ART60',
    frameworkId: EU_ID,
    framework: EU,
    clause: 'Art. 60',
    obligation:
      'EU AI Act Art. 60 testing in real-world conditions outside sandboxes',
    requirement:
      'Testing of high-risk (Annex III) AI systems in real-world conditions outside AI regulatory sandboxes',
    artefact:
      'Real-world testing plan; Art. 61 informed-consent records; test monitoring, logging and incident hooks',
    layerN: [3, 4],
    anchor: EU_ANCHOR,
    dutyHolder: 'Provider / prospective provider',
    authority: MSA,
    appliesFrom: '2026-08-02',
    appliesStatus: 'in-force',
    appliesNote: '2026-08-02',
    systemClass: ANNEX_III,
    reviewed: REVIEWED_DEBT_PASS,
  },
  {
    id: 'AIGE-OBL-EUAIA-ART72',
    frameworkId: EU_ID,
    framework: EU,
    clause: 'Art. 72',
    obligation: 'EU AI Act Art. 72 post-market monitoring',
    requirement: 'Post-market monitoring for high-risk systems',
    artefact:
      'Continuous assurance telemetry; monitoring plan; drift and performance signals',
    layerN: [5],
    anchor: EU_ANCHOR,
    dutyHolder: 'Provider',
    authority: MSA,
    appliesFrom: '2027-12-02',
    appliesStatus: 'deferred',
    appliesNote: ANNEX_III_NOTE,
    milestones: HIGH_RISK_STEPS,
    systemClass: HIGH_RISK,
    patterns: [
      'pattern-continuous-assurance-telemetry',
      'pattern-incident-pipeline',
      'pattern-machine-readable-evidence-oscal',
    ],
    reviewed: REVIEWED_DEBT_PASS,
  },
  {
    id: 'AIGE-OBL-EUAIA-ART73',
    frameworkId: EU_ID,
    framework: EU,
    clause: 'Art. 73',
    obligation: 'EU AI Act Art. 73 serious-incident reporting',
    requirement:
      "Serious-incident reporting for high-risk systems, on the deadlines of chapter 08's reporting-clock table",
    artefact:
      'Incident detection and triage pipeline; reporting-clock automation; evidence capture',
    layerN: [5, 4],
    anchor: EU_ANCHOR,
    dutyHolder: 'Provider',
    authority: MSA,
    appliesFrom: '2027-12-02',
    appliesStatus: 'deferred',
    appliesNote: ANNEX_III_NOTE,
    milestones: HIGH_RISK_STEPS,
    systemClass: HIGH_RISK,
    patterns: ['pattern-incident-pipeline'],
    reviewed: REVIEWED_DEBT_PASS,
  },

  // GPAI Code of Practice
  {
    id: 'AIGE-OBL-GPAICOP-SAFETY',
    frameworkId: 'gpai-code-of-practice',
    framework: 'GPAI Code of Practice',
    clause: 'Safety and Security chapter',
    obligation: 'Safety and Security (systemic-risk models only)',
    requirement:
      'A Safety and Security Framework; model evaluations incl. adversarial testing; systemic-risk assessment and mitigation; serious-incident reporting; model and infrastructure security',
    artefact:
      'Eval and red-team suite; adversarial testing harness; incident pipeline; weight-security controls',
    layerN: [3, 4, 5],
    anchor: GPAI_ANCHOR,
    appliesStatus: 'voluntary',
    appliesNote: 'Voluntary; published 2025-07-10',
    reviewed: REVIEWED_V040,
  },
  {
    id: 'AIGE-OBL-GPAICOP-TRANSPARENCY',
    frameworkId: 'gpai-code-of-practice',
    framework: 'GPAI Code of Practice',
    clause: 'Transparency chapter',
    obligation: 'Transparency',
    requirement:
      'Up-to-date model documentation for the AI Office and downstream deployers',
    artefact: 'Model cards; structured model documentation; AIBOM',
    layerN: [2],
    anchor: GPAI_ANCHOR,
    appliesStatus: 'voluntary',
    appliesNote: 'Voluntary; published 2025-07-10',
    reviewed: REVIEWED_V040,
  },
  {
    id: 'AIGE-OBL-GPAICOP-COPYRIGHT',
    frameworkId: 'gpai-code-of-practice',
    framework: 'GPAI Code of Practice',
    clause: 'Copyright chapter',
    obligation: 'Copyright',
    requirement:
      'A policy to comply with Union copyright law, incl. respecting reservations of rights',
    artefact:
      'Training-data provenance and licence records; policy-as-code for source filtering',
    layerN: [1, 2],
    anchor: GPAI_ANCHOR,
    appliesStatus: 'voluntary',
    appliesNote: 'Voluntary; published 2025-07-10',
    reviewed: REVIEWED_V040,
  },

  // ISO/IEC 42001 Annex A
  {
    id: 'AIGE-OBL-ISO42001-A2',
    frameworkId: 'iso-42001',
    framework: 'ISO/IEC 42001',
    clause: 'A.2',
    obligation: 'A.2 Policies related to AI',
    requirement: 'AI policy set and its governance',
    artefact: 'Policy-as-code library; versioned policy repository',
    layerN: [1],
    anchor: ISO_ANCHOR,
    appliesStatus: 'voluntary',
    appliesNote: 'Voluntary management-system standard (2023); no presumption of conformity',
    reviewed: REVIEWED_V040,
  },
  {
    id: 'AIGE-OBL-ISO42001-A3',
    frameworkId: 'iso-42001',
    framework: 'ISO/IEC 42001',
    clause: 'A.3',
    obligation: 'A.3 Internal organization',
    requirement: 'Roles, responsibilities, reporting',
    artefact: 'Operating model; RACI; ownership in the registry',
    layerN: [1, 2],
    anchor: ISO_ANCHOR,
    appliesStatus: 'voluntary',
    appliesNote: 'Voluntary management-system standard (2023); no presumption of conformity',
    reviewed: REVIEWED_V040,
  },
  {
    id: 'AIGE-OBL-ISO42001-A4',
    frameworkId: 'iso-42001',
    framework: 'ISO/IEC 42001',
    clause: 'A.4',
    obligation: 'A.4 Resources for AI systems',
    requirement: 'Data, tooling, compute, human resources documented',
    artefact: 'Resource inventory; AIBOM; environment manifests',
    layerN: [2],
    anchor: ISO_ANCHOR,
    appliesStatus: 'voluntary',
    appliesNote: 'Voluntary management-system standard (2023); no presumption of conformity',
    reviewed: REVIEWED_V040,
  },
  {
    id: 'AIGE-OBL-ISO42001-A5',
    frameworkId: 'iso-42001',
    framework: 'ISO/IEC 42001',
    clause: 'A.5',
    obligation: 'A.5 Assessing impacts of AI systems',
    requirement: 'Impact assessment process',
    artefact: 'Impact assessment as code; FRIA/DPIA linkage (ISO/IEC 42005)',
    layerN: [1, 3],
    anchor: ISO_ANCHOR,
    appliesStatus: 'voluntary',
    appliesNote: 'Voluntary management-system standard (2023); no presumption of conformity',
    reviewed: REVIEWED_V040,
  },
  {
    id: 'AIGE-OBL-ISO42001-A6',
    frameworkId: 'iso-42001',
    framework: 'ISO/IEC 42001',
    clause: 'A.6',
    obligation: 'A.6 AI system life cycle',
    requirement: 'Responsible design, development, deployment',
    artefact: 'Pipeline controls; eval gates; change management',
    layerN: [1, 3, 4],
    anchor: ISO_ANCHOR,
    appliesStatus: 'voluntary',
    appliesNote: 'Voluntary management-system standard (2023); no presumption of conformity',
    reviewed: REVIEWED_V040,
  },
  {
    id: 'AIGE-OBL-ISO42001-A7',
    frameworkId: 'iso-42001',
    framework: 'ISO/IEC 42001',
    clause: 'A.7',
    obligation: 'A.7 Data for AI systems',
    requirement: 'Data quality, provenance, preparation',
    artefact: 'Data cards; lineage; data quality tests',
    layerN: [2, 3],
    anchor: ISO_ANCHOR,
    appliesStatus: 'voluntary',
    appliesNote: 'Voluntary management-system standard (2023); no presumption of conformity',
    reviewed: REVIEWED_V040,
  },
  {
    id: 'AIGE-OBL-ISO42001-A8',
    frameworkId: 'iso-42001',
    framework: 'ISO/IEC 42001',
    clause: 'A.8',
    obligation: 'A.8 Information for interested parties',
    requirement: 'Transparency and reporting to stakeholders',
    artefact: 'Model/data cards; machine-readable disclosures',
    layerN: [2],
    anchor: ISO_ANCHOR,
    appliesStatus: 'voluntary',
    appliesNote: 'Voluntary management-system standard (2023); no presumption of conformity',
    reviewed: REVIEWED_V040,
  },
  {
    id: 'AIGE-OBL-ISO42001-A9',
    frameworkId: 'iso-42001',
    framework: 'ISO/IEC 42001',
    clause: 'A.9',
    obligation: 'A.9 Use of AI systems',
    requirement: 'Responsible-use controls and monitoring',
    artefact: 'Runtime guardrails; usage telemetry',
    layerN: [4],
    anchor: ISO_ANCHOR,
    appliesStatus: 'voluntary',
    appliesNote: 'Voluntary management-system standard (2023); no presumption of conformity',
    reviewed: REVIEWED_V040,
  },
  {
    id: 'AIGE-OBL-ISO42001-A10',
    frameworkId: 'iso-42001',
    framework: 'ISO/IEC 42001',
    clause: 'A.10',
    obligation: 'A.10 Third-party and customer relationships',
    requirement: 'Managing supplier and customer responsibilities',
    artefact: 'Supplier AIBOM; contractual and technical control mapping',
    layerN: [2, 5],
    anchor: ISO_ANCHOR,
    appliesStatus: 'voluntary',
    appliesNote: 'Voluntary management-system standard (2023); no presumption of conformity',
    patterns: ['pattern-vendor--model-due-diligence-gate'],
    reviewed: REVIEWED_V040,
  },
  {
    id: 'AIGE-OBL-ISO42006-CB',
    frameworkId: 'iso-42006',
    framework: 'ISO/IEC 42006',
    clause: 'ISO/IEC 42006:2025',
    obligation:
      'ISO/IEC 42006:2025 requirements for AIMS certification bodies',
    requirement:
      'Requirements for bodies auditing and certifying AI management systems (who may credibly certify you to 42001)',
    artefact:
      'Accredited certification scope; auditor-competence evidence; certificate register',
    layerN: [5],
    anchor: ISO_ANCHOR,
    appliesStatus: 'voluntary',
    appliesNote: 'Voluntary standard (2025)',
    reviewed: REVIEWED_V040,
  },
  {
    id: 'AIGE-OBL-ISO23894-RISK',
    frameworkId: 'iso-23894',
    framework: 'ISO/IEC 23894',
    clause: 'ISO/IEC 23894:2023',
    obligation: 'ISO/IEC 23894:2023 guidance on AI risk management',
    requirement: 'Guidance on AI risk management (companion to ISO 31000)',
    artefact:
      'Risk register as code; AI risk taxonomy; linkage to EU AI Act Art. 9 and the NIST AI RMF',
    layerN: [1, 3],
    anchor: ISO_ANCHOR,
    appliesStatus: 'voluntary',
    appliesNote: 'Voluntary guidance (2023)',
    reviewed: REVIEWED_V040,
  },

  // NIST AI RMF
  {
    id: 'AIGE-OBL-NISTRMF-GOVERN',
    frameworkId: 'nist-ai-rmf',
    framework: 'NIST AI RMF',
    clause: 'GOVERN',
    obligation: 'GOVERN',
    requirement: 'A culture and structure for managing AI risk',
    artefact: 'Policy-as-code; operating model; registry ownership',
    layerN: [1, 2],
    anchor: NIST_ANCHOR,
    appliesStatus: 'voluntary',
    appliesNote: 'Voluntary (AI RMF 1.0, January 2023)',
    patterns: [
      'pattern-policy-card',
      'pattern-continuous-assurance-telemetry',
      'pattern-framework-crosswalk',
      'pattern-machine-readable-evidence-oscal',
      'pattern-vendor--model-due-diligence-gate',
    ],
    reviewed: REVIEWED_V040,
  },
  {
    id: 'AIGE-OBL-NISTRMF-MAP',
    frameworkId: 'nist-ai-rmf',
    framework: 'NIST AI RMF',
    clause: 'MAP',
    obligation: 'MAP',
    requirement: 'Context and risk framing for each AI system',
    artefact: 'Threat models; use-case and impact mapping; data/model cards',
    layerN: [2, 3],
    anchor: NIST_ANCHOR,
    appliesStatus: 'voluntary',
    appliesNote: 'Voluntary (AI RMF 1.0, January 2023)',
    patterns: [
      'pattern-agent-registry',
      'pattern-aibom',
      'pattern-model-card-as-control-evidence',
      'pattern-fria-as-code',
      'pattern-shadow-ai-discovery',
      'pattern-vendor--model-due-diligence-gate',
    ],
    reviewed: REVIEWED_V040,
  },
  {
    id: 'AIGE-OBL-NISTRMF-MEASURE',
    frameworkId: 'nist-ai-rmf',
    framework: 'NIST AI RMF',
    clause: 'MEASURE',
    obligation: 'MEASURE',
    requirement: 'Analyse, benchmark and monitor risk',
    artefact: 'Eval gates; adversarial red-team suite; metrics per failure mode',
    layerN: [3],
    anchor: NIST_ANCHOR,
    appliesStatus: 'voluntary',
    appliesNote: 'Voluntary (AI RMF 1.0, January 2023)',
    patterns: [
      'pattern-eval-gate-in-ci',
      'pattern-adversarial-red-team-suite',
      'pattern-model-card-as-control-evidence',
    ],
    reviewed: REVIEWED_V040,
  },
  {
    id: 'AIGE-OBL-NISTRMF-MANAGE',
    frameworkId: 'nist-ai-rmf',
    framework: 'NIST AI RMF',
    clause: 'MANAGE',
    obligation: 'MANAGE',
    requirement: 'Prioritise, respond and recover',
    artefact: 'Runtime guardrails; incident pipeline; continuous assurance',
    layerN: [4, 5],
    anchor: NIST_ANCHOR,
    appliesStatus: 'voluntary',
    appliesNote: 'Voluntary (AI RMF 1.0, January 2023)',
    patterns: [
      'pattern-continuous-assurance-telemetry',
      'pattern-runtime-guardrail',
      'pattern-kill-switch--circuit-breaker',
      'pattern-incident-pipeline',
      'pattern-machine-readable-evidence-oscal',
      'pattern-agent-identity--scoped-credentials',
      'pattern-human-in-the-loop-gate',
    ],
    reviewed: REVIEWED_V040,
  },
  {
    id: 'AIGE-OBL-NIST-AGENTS',
    frameworkId: 'nist-ai-agent-standards',
    framework: 'NIST (agent, cyber and misuse work)',
    clause: 'AI Agent Standards Initiative',
    obligation: 'NIST AI Agent Standards Initiative (2026)',
    requirement:
      'CAISI initiative on interoperable, secure AI agents: identity, authentication, agent security',
    artefact:
      'Agent registry; non-human-identity controls; agent authentication and authorisation; adversarial agent evals',
    layerN: [3, 4],
    anchor: NIST_ANCHOR,
    appliesStatus: 'pending',
    appliesNote: 'Initiative launched 2026-02-17 by NIST CAISI',
    reviewed: REVIEWED_V040,
  },
  {
    id: 'AIGE-OBL-NIST-IR8596',
    frameworkId: 'nist-ir-8596',
    framework: 'NIST (agent, cyber and misuse work)',
    clause: 'IR 8596',
    obligation: 'NIST IR 8596 Cyber AI Profile (draft)',
    requirement: 'CSF 2.0 profile for AI (Secure / Defend / Thwart)',
    artefact:
      'AI-system security controls; runtime observability; threat detection mapped to CSF 2.0',
    layerN: [3, 4],
    anchor: NIST_ANCHOR,
    appliesStatus: 'pending',
    appliesNote:
      'Draft: initial preliminary draft 2025-12-16, still the current version as of 2026-09-24',
    reviewed: REVIEWED_DEBT_PASS,
  },
  {
    id: 'AIGE-OBL-NIST-AI800-1',
    frameworkId: 'nist-ai-800-1',
    framework: 'NIST (agent, cyber and misuse work)',
    clause: 'AI 800-1',
    obligation:
      'NIST AI 800-1 misuse risk for dual-use foundation models (draft)',
    requirement:
      'Managing Misuse Risk for Dual-Use Foundation Models (voluntary guidance)',
    artefact:
      'Misuse red-team suite; capability and dangerous-capability evals; safety framework',
    layerN: [3],
    anchor: NIST_ANCHOR,
    appliesStatus: 'pending',
    appliesNote:
      'Draft: second public draft January 2025, no final version as of 2026-09-24',
    reviewed: REVIEWED_DEBT_PASS,
  },

  // CSA AICM and STAR for AI
  {
    id: 'AIGE-OBL-CSA-AICM',
    frameworkId: 'csa-aicm',
    framework: 'CSA AICM / STAR for AI',
    clause: 'AICM v1.1',
    obligation: 'AICM v1.1: 247 control objectives across 18 domains',
    requirement:
      '247 control objectives across 18 domains, spanning governance, data, model and runtime',
    artefact:
      'Control catalogue mapped to policy-as-code and evals; crosswalk to ISO 42001 / NIST AI RMF',
    layerN: [1, 3, 5],
    anchor: CSA_ANCHOR,
    appliesStatus: 'voluntary',
    appliesNote: 'Voluntary; v1.1 published 2026-06-22',
    patterns: [
      'pattern-policy-card',
      'pattern-agent-registry',
      'pattern-aibom',
      'pattern-continuous-assurance-telemetry',
      'pattern-kill-switch--circuit-breaker',
      'pattern-framework-crosswalk',
      'pattern-agent-identity--scoped-credentials',
      'pattern-shadow-ai-discovery',
    ],
    reviewed: REVIEWED_V040,
  },
  {
    id: 'AIGE-OBL-CSA-STAR',
    frameworkId: 'csa-star-for-ai',
    framework: 'CSA AICM / STAR for AI',
    clause: 'STAR for AI',
    obligation: 'STAR for AI assurance and certification programme',
    requirement:
      'Assurance and certification programme, incl. proposed agent controls',
    artefact:
      'Machine-readable evidence submission; continuous assurance telemetry',
    layerN: [5],
    anchor: CSA_ANCHOR,
    appliesStatus: 'voluntary',
    appliesNote: 'Voluntary assurance and certification programme',
    reviewed: REVIEWED_V040,
  },
  {
    id: 'AIGE-OBL-CSA-AICM-AGENTIC',
    frameworkId: 'csa-aicm',
    framework: 'CSA AICM / STAR for AI',
    clause: 'Agentic Control Supplement',
    obligation: 'AICM Agentic Control Supplement (proposed agent controls)',
    requirement: 'A proposed set of agent-specific controls extending the AICM',
    artefact:
      'Agent-specific control definitions; policy-as-code for agent scope and tools; runtime guardrails',
    layerN: [1, 4],
    anchor: CSA_ANCHOR,
    appliesStatus: 'pending',
    appliesNote: 'Proposed',
    reviewed: REVIEWED_V040,
  },
  {
    id: 'AIGE-OBL-CSA-AICM-CATASTROPHIC',
    frameworkId: 'csa-aicm',
    framework: 'CSA AICM / STAR for AI',
    clause: 'Catastrophic Risk Annex',
    obligation:
      'AICM Catastrophic Risk Annex (enhanced controls for high-autonomy systems)',
    requirement:
      'Enhanced AICM controls for high-autonomy systems with catastrophic-risk potential',
    artefact:
      'Enhanced controls for high-autonomy systems; kill switch and oversight controls; pilot-audit evidence',
    layerN: [4, 5],
    anchor: CSA_ANCHOR,
    appliesStatus: 'voluntary',
    appliesNote: 'Voluntary; meant to be proven through pilot audits',
    reviewed: REVIEWED_V040,
  },

  // OWASP GenAI Security Project
  {
    id: 'AIGE-OBL-OWASP-AGENTIC',
    frameworkId: 'owasp-agentic-top-10',
    framework: 'OWASP GenAI Security Project',
    clause: 'Top 10 for Agentic Applications 2026',
    obligation: 'Top 10 for Agentic Applications 2026',
    requirement:
      'Agent threat catalogue (ASI01 Agent Goal Hijack … ASI10 Rogue Agents)',
    artefact:
      'Agent threat model; adversarial evals; runtime guardrails; kill switch',
    layerN: [3, 4],
    anchor: OWASP_ANCHOR,
    appliesStatus: 'voluntary',
    appliesNote: 'Voluntary (2026 edition)',
    patterns: [
      'pattern-policy-card',
      'pattern-eval-gate-in-ci',
      'pattern-adversarial-red-team-suite',
      'pattern-agent-registry',
      'pattern-runtime-guardrail',
      'pattern-kill-switch--circuit-breaker',
      'pattern-agent-identity--scoped-credentials',
      'pattern-human-in-the-loop-gate',
      'pattern-shadow-ai-discovery',
    ],
    reviewed: REVIEWED_V040,
  },
  {
    id: 'AIGE-OBL-OWASP-LLM',
    frameworkId: 'owasp-llm-top-10',
    framework: 'OWASP GenAI Security Project',
    clause: 'Top 10 for LLM Applications 2026',
    obligation: 'Top 10 for LLM Applications 2026',
    requirement: 'LLM threat catalogue (incl. Excessive Agency at #3)',
    artefact: 'Prompt-injection and output-handling controls; eval gate',
    layerN: [3, 4],
    anchor: OWASP_ANCHOR,
    appliesStatus: 'voluntary',
    appliesNote: 'Voluntary (2026 edition)',
    reviewed: REVIEWED_DEBT_PASS,
  },
  {
    id: 'AIGE-OBL-OWASP-ACS',
    frameworkId: 'owasp-acs',
    framework: 'OWASP GenAI Security Project',
    clause: 'ACS',
    obligation: 'Agent Control Standard (ACS)',
    requirement: 'A standard for expressing agent controls',
    artefact: 'Machine-readable control definitions for agents',
    layerN: [1, 4],
    anchor: OWASP_ANCHOR,
    appliesStatus: 'voluntary',
    appliesNote: 'Voluntary',
    patterns: ['pattern-framework-crosswalk'],
    reviewed: REVIEWED_V040,
  },
  {
    id: 'AIGE-OBL-OWASP-AIBOM',
    frameworkId: 'owasp-aibom',
    framework: 'OWASP GenAI Security Project',
    clause: 'AIBOM',
    obligation: 'AIBOM',
    requirement: 'AI bill-of-materials format and generator',
    artefact: 'AIBOM at build (CycloneDX ML-BOM, SPDX 3.0 AI)',
    layerN: [2],
    anchor: OWASP_ANCHOR,
    appliesStatus: 'voluntary',
    appliesNote: 'Voluntary',
    reviewed: REVIEWED_V040,
  },

  // US frontier-developer laws
  {
    id: 'AIGE-OBL-USCA-SB53',
    frameworkId: 'ca-sb-53',
    framework: 'US frontier-developer laws',
    clause: 'SB 53',
    obligation: 'California SB 53 (TFAIA)',
    requirement:
      'Publish a frontier AI framework; report critical safety incidents to the Office of Emergency Services within 15 days; whistleblower protection; up to USD 1M per violation, AG-enforced',
    artefact:
      'Published safety framework; incident pipeline reporting to the state; transparency artefacts',
    layerN: [5, 4],
    anchor: US_ANCHOR,
    scope:
      'Large frontier developers (models trained above ~10^26 FLOP; developer revenue over USD 500M)',
    appliesFrom: '2026-01-01',
    appliesStatus: 'in-force',
    appliesNote: 'In force 2026-01-01',
    reviewed: REVIEWED_DEBT_PASS,
  },
  {
    id: 'AIGE-OBL-USNY-RAISE',
    frameworkId: 'ny-raise-act',
    framework: 'US frontier-developer laws',
    clause: 'S6953B',
    obligation: 'New York RAISE Act (signed 2025-12-19; effective 2027-01-01)',
    requirement:
      'Publish a frontier AI safety and security framework; disclose safety incidents within 72 hours. A chapter amendment signed 2026-03-27 sets the effective date at 2027-01-01 and creates an oversight office within the New York Department of Financial Services (DFS)',
    artefact:
      'Published frontier AI safety framework; 72-hour incident and disclosure pipeline reporting to the state; DFS oversight office',
    layerN: [5, 4],
    anchor: US_ANCHOR,
    scope:
      'Large frontier developers (frontier models trained with over 10^26 operations, cost over USD 100M)',
    appliesFrom: '2027-01-01',
    appliesStatus: 'applies-later',
    appliesNote: 'Signed 2025-12-19; effective 2027-01-01',
    reviewed: REVIEWED_DEBT_PASS,
  },

  // US state AI laws (broader than the frontier-developer laws above)
  {
    id: 'AIGE-OBL-USTX-TRAIGA',
    frameworkId: 'tx-traiga',
    framework: 'US state AI laws',
    clause: 'HB 149',
    obligation: 'Texas TRAIGA (HB 149; in force 2026-01-01)',
    requirement:
      'Intent-based prohibitions (social scoring, unlawful discrimination); AI-use disclosure; a regulatory sandbox; Attorney-General enforcement; local AI rules preempted',
    artefact:
      'Prohibited-use policy-as-code; AI-use disclosure controls; complaint and incident handling',
    layerN: [1, 4],
    anchor: US_ANCHOR,
    scope: 'Developers and deployers doing business in Texas',
    appliesFrom: '2026-01-01',
    appliesStatus: 'in-force',
    appliesNote: 'In force 2026-01-01',
    reviewed: REVIEWED_V040,
  },
  {
    id: 'AIGE-OBL-USCO-AIACT',
    frameworkId: 'co-ai-act',
    framework: 'US state AI laws',
    clause: 'SB 24-205 / SB 26-189',
    obligation:
      'Colorado AI Act (SB 24-205; delayed, then replaced by SB 26-189 effective 2027-01-01)',
    requirement:
      'Duty of reasonable care against algorithmic discrimination; risk management and consumer notice. Its 1 Feb 2026 start was delayed to 30 June 2026, then the Act was replaced by SB 26-189 (signed 14 May 2026), a narrower transparency law effective 1 Jan 2027, after a federal court blocked enforcement of the original',
    artefact:
      'High-risk ADM inventory; algorithmic-discrimination impact assessments; consumer disclosure',
    layerN: [1, 2, 5],
    anchor: US_ANCHOR,
    scope: 'Developers and deployers of high-risk (consequential) automated decisions',
    appliesFrom: '2027-01-01',
    appliesStatus: 'applies-later',
    appliesNote:
      'SB 24-205 delayed, then replaced by SB 26-189 (signed 2026-05-14), effective 2027-01-01',
    reviewed: REVIEWED_DEBT_PASS,
  },

  // Other jurisdictions
  {
    id: 'AIGE-OBL-KR-AIBASIC',
    frameworkId: 'kr-ai-basic-act',
    framework: 'Other jurisdictions',
    clause: 'AI Basic Act',
    obligation: 'South Korea AI Basic Act (in force 2026-01-22)',
    requirement:
      'Baseline duties for AI operators, heightened duties for "high-impact" AI in sensitive sectors, and AI-content labelling',
    artefact:
      'Risk register for high-impact AI; AI-use notification; AI-content labelling',
    layerN: [1, 2, 4],
    anchor: OTHER_ANCHOR,
    appliesFrom: '2026-01-22',
    appliesStatus: 'grace',
    appliesNote:
      'In force 2026-01-22; the ministry (MSIT) runs a grace period of at least one year in 2026, deferring fact-finding and fines except in serious cases',
    reviewed: REVIEWED_DEBT_PASS,
  },
  {
    id: 'AIGE-OBL-SG-GENAI',
    frameworkId: 'sg-genai-framework',
    framework: 'Other jurisdictions',
    clause: 'Model AI Governance Framework for Generative AI',
    obligation:
      'Singapore IMDA Model AI Governance Framework for Generative AI (voluntary)',
    requirement:
      'Governance dimensions incl. testing, transparency, incident reporting, security and content provenance',
    artefact:
      'Eval suite; model cards; content provenance and watermarking',
    layerN: [2, 3, 4],
    anchor: OTHER_ANCHOR,
    appliesStatus: 'voluntary',
    appliesNote: 'Voluntary; published May 2024',
    reviewed: REVIEWED_DEBT_PASS,
  },
  {
    id: 'AIGE-OBL-UK-ADM',
    frameworkId: 'uk-duaa',
    framework: 'Other jurisdictions',
    clause: 'UK GDPR Arts. 22A–22D',
    obligation:
      'UK ADM safeguards: Data (Use and Access) Act 2025, UK GDPR Arts. 22A–22D (in force 2026-02-05)',
    requirement:
      'A permission-plus-safeguards model for significant, solely automated decisions, with tighter conditions where special-category data is used',
    artefact:
      'ADM safeguards: meaningful-human-review path, contest and representation channel, decision notice',
    layerN: [4, 2],
    anchor: OTHER_ANCHOR,
    appliesFrom: '2026-02-05',
    appliesStatus: 'in-force',
    appliesNote: 'In force 2026-02-05',
    reviewed: REVIEWED_DEBT_PASS,
  },
  {
    id: 'AIGE-OBL-ETSI-304223',
    frameworkId: 'etsi-en-304-223',
    framework: 'Other jurisdictions',
    clause: 'EN 304 223',
    obligation:
      'ETSI EN 304 223 baseline cyber-security for AI models and systems',
    requirement:
      'Baseline cyber-security requirements across the AI lifecycle (13 principles over five stages)',
    artefact:
      'AI-system security controls across the lifecycle; supply-chain and AIBOM checks; runtime hardening',
    layerN: [4],
    anchor: OTHER_ANCHOR,
    appliesStatus: 'voluntary',
    appliesNote: 'Published (V2.1.1, Dec 2025); a voluntary standard',
    reviewed: REVIEWED_DEBT_PASS,
  },

  // China
  {
    id: 'AIGE-OBL-CN-ALGOREC',
    frameworkId: 'cn-algo-recommendation',
    framework: 'China',
    clause: 'CAC Order No. 9',
    obligation: 'Provisions on Algorithmic Recommendation (in force 2022-03-01)',
    requirement:
      'Algorithm filing for services with public-opinion attributes or social-mobilisation capacity, security assessment, display of the filing number, and a user option to switch off personalised recommendation',
    artefact:
      'Algorithm inventory with filing record and number; security-assessment evidence pack; opt-out control at runtime',
    layerN: [1, 2, 4],
    anchor: CHINA_ANCHOR,
    appliesFrom: '2022-03-01',
    appliesStatus: 'in-force',
    appliesNote: 'Binding; in force 2022-03-01',
    reviewed: REVIEWED_CHINA,
  },
  {
    id: 'AIGE-OBL-CN-DEEPSYN',
    frameworkId: 'cn-deep-synthesis',
    framework: 'China',
    clause: 'CAC Order No. 12',
    obligation: 'Provisions on Deep Synthesis (in force 2023-01-10)',
    requirement:
      'Conspicuous labels where synthetic content could mislead the public and non-removable technical marks; training-data management; separate consent for face and voice editing; filing and security assessment for opinion-shaping functions',
    artefact:
      'Content-provenance pipeline (visible label plus metadata mark); training-data governance record; consent gate; pre-release security assessment',
    layerN: [2, 3, 4],
    anchor: CHINA_ANCHOR,
    appliesFrom: '2023-01-10',
    appliesStatus: 'in-force',
    appliesNote: 'Binding; in force 2023-01-10',
    reviewed: REVIEWED_CHINA,
  },
  {
    id: 'AIGE-OBL-CN-GENAI',
    frameworkId: 'cn-genai-measures',
    framework: 'China',
    clause: 'CAC Order No. 15',
    obligation: 'Interim Measures for Generative AI Services (in force 2023-08-15)',
    requirement:
      'Lawful-source training data and foundation models; content labelling under the deep-synthesis rules; security assessment and algorithm filing for opinion-shaping services; stop, remove, retrain and report on illegal content',
    artefact:
      'Data-lineage and licensing record; eval gate on generated content; incident pipeline with a retraining loop; filing record',
    layerN: [2, 3, 4, 5],
    anchor: CHINA_ANCHOR,
    appliesFrom: '2023-08-15',
    appliesStatus: 'in-force',
    appliesNote:
      'Binding; in force 2023-08-15; applies to services offered to the public within the PRC',
    reviewed: REVIEWED_CHINA,
  },
  {
    id: 'AIGE-OBL-CN-LABEL',
    frameworkId: 'cn-content-labelling',
    framework: 'China',
    clause: 'Labelling Measures + GB 45438-2025',
    obligation:
      'Measures for Labelling AI-Generated Synthetic Content with GB 45438-2025 (in force 2025-09-01)',
    requirement:
      "Explicit labels (text, audio or graphic) and implicit metadata labels carrying the provider's name or code and a content number; distribution platforms verify metadata and flag suspected AI content",
    artefact:
      'Provenance and watermarking pipeline emitting the GB 45438 metadata fields; platform-side detection and flagging',
    layerN: [3, 4],
    anchor: CHINA_ANCHOR,
    appliesFrom: '2025-09-01',
    appliesStatus: 'in-force',
    appliesNote: 'Binding; in force 2025-09-01, the standard implemented the same day',
    reviewed: REVIEWED_CHINA,
  },
  {
    id: 'AIGE-OBL-CN-GBT45654',
    frameworkId: 'cn-gbt-45654',
    framework: 'China',
    clause: 'GB/T 45654-2025',
    obligation:
      'GB/T 45654-2025 Basic security requirements for generative AI services (voluntary; implemented 2025-11-01)',
    requirement:
      'Training-corpus source and content screening, model-safety requirements and the evaluation methods that underpin the security assessment',
    artefact:
      'Corpus-screening record; eval question banks; security-assessment report',
    layerN: [3, 5],
    anchor: CHINA_ANCHOR,
    appliesFrom: '2025-11-01',
    appliesStatus: 'voluntary',
    appliesNote: 'Recommended (voluntary) national standard; implemented 2025-11-01',
    reviewed: REVIEWED_CHINA,
  },
  {
    id: 'AIGE-OBL-CN-TC260-OPS',
    frameworkId: 'cn-tc260-framework',
    framework: 'China',
    clause: 'Framework 3.0 §5.3',
    obligation:
      'TC260 AI Safety Governance Framework 3.0: operators\' guidelines §5.3 (voluntary; 2026-09-14)',
    requirement:
      'A three-block risk taxonomy (inherent, application, secondary), technological and governance countermeasures and role-based guidelines; operators keep logs for at least six months and audit them, monitor risk in real time, keep a traceable chain of responsibility and assess resilience (§5.3)',
    artefact:
      'Risk register keyed to the framework\'s taxonomy; log-retention policy (six months) with audit; real-time risk monitoring; resilience assessment',
    layerN: [1, 4, 5],
    anchor: CHINA_ANCHOR,
    appliesStatus: 'voluntary',
    appliesNote:
      'Voluntary; published 2026-09-14, building on 1.0 (2024) and 2.0 (2025)',
    reviewed: REVIEWED_CHINA,
  },
  {
    id: 'AIGE-OBL-CN-TC260-AGENTS',
    frameworkId: 'cn-tc260-framework',
    framework: 'China',
    clause: 'Framework 3.0 Appendix 2',
    obligation:
      'TC260 Framework 3.0 Appendix 2: agentic AI risk management (voluntary; 2026-09-14)',
    requirement:
      'Unique identity and least-privilege permissions per agent by decision mode; human checkpoints with tamper-proof approval logs and deny-by-default; tool and skill verification; runtime guardrails (alert, restrict, intercept, suspend, terminate); memory isolation with no credentials in memory; mutual authentication; sandbox validation, red teaming and re-validation on major change; controlled decommissioning',
    artefact:
      'Agent registry with identity and scope; approval-log store; tool allow-list with integrity checks; runtime guardrails and kill switch; memory-scope policy; decommissioning runbook',
    layerN: [2, 3, 4, 5],
    anchor: CHINA_ANCHOR,
    appliesStatus: 'voluntary',
    appliesNote: 'Voluntary; published 2026-09-14',
    reviewed: REVIEWED_CHINA,
  },
] as const;

/** The obligation with this stable id, if any (ids are case-insensitive in URLs). */
export function obligationById(id: string): Obligation | undefined {
  const wanted = id.toUpperCase();
  return obligations.find((row) => row.id === wanted);
}

/** URL slug of a row: its id in lower case (ids never change, so neither does the URL). */
export function obligationSlug(row: Pick<Obligation, 'id'>): string {
  return row.id.toLowerCase();
}

/** Site path of a row's page. */
export function obligationPath(row: Pick<Obligation, 'id'>): string {
  return `/obligations/${obligationSlug(row)}`;
}
