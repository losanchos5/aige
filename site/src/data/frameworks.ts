// frameworks.ts: the regulatory map, faithful to bok/08-regulatory-map.md:
// the reverse index that names, for each obligation, the engineering artefact
// that evidences it and the stack layer the artefact lives in.
//
// `obligations` reproduces the chapter's obligation → artefact → layer tables
// (EU AI Act, GPAI Code of Practice, data protection and other EU law, ISO/IEC
// 42001/42005/42006, 23894 and 22989, NIST AI RMF and newer NIST AI work, CSA,
// OWASP, US federal and state laws, other jurisdictions, treaty and soft law, and
// the CEN-CENELEC JTC 21 deliverables). `layerN` is an array because many rows map
// to more than one layer. Every anchor is the `#slug` of the chapter-08 heading
// (H2 or H3) whose table carries the row: the rows the v0.5.0 chapters proposed
// were added to chapter 08's own tables, so the chapter stays the one reverse
// index and every anchor resolves there. Mappings are illustrative, not a claim of
// conformity.
//
// STABLE IDS (schema version 2, v0.5.0). Every obligation row carries an `id`
// that other sites, datasets and citations may rely on. The rule:
//
//   AIGE-OBL-<INSTRUMENT>-<CLAUSE>
//
// - Upper-case ASCII letters, digits and hyphens only (OBLIGATION_ID_PATTERN).
// - <INSTRUMENT> is a fixed code per instrument or jurisdiction: EUAIA (EU AI
//   Act), GPAICOP (GPAI Code of Practice), GDPR, NIS2, DORA, CRA, PLD, DSM, DSA,
//   UCPD, PWD (Platform Work Directive), CCD2 (Consumer Credit Directive),
//   ISO42001, ISO42005, ISO42006, ISO23894, ISO22989, NISTRMF (NIST AI RMF
//   functions), NIST (other NIST work), CSA, OWASP, CEN (CEN-CENELEC JTC 21),
//   USCA, USNY, USTX, USCO, USIL, USUT, USVA, USMN, USWA (US states), USNYC (New
//   York City), USFED (US federal), KR, SG, UK, CAN (Canada), BR (Brazil), ETSI,
//   CN (China), COE (Council of Europe), OECD and G7.
// - <CLAUSE> is the article, clause, function or document number the row names
//   (ART9, ART4A, ART49-71, A5, GOVERN, IR8596); a paragraph or point joins it
//   with a hyphen (Art. 26(2) -> ART26-2, Art. 17(1)(m) -> ART17-1M). Where the
//   row stands for the instrument as a whole, it is a short mnemonic (SB53,
//   AIBASIC, TC260-OPS, CB). Every id has both parts, so it has at least four
//   hyphen-separated segments.
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
const OTHER_ANCHOR = 'other-jurisdictions';
const CHINA_ANCHOR = 'china';
// v0.5.0: the sections chapter 08 gained for the rows the new chapters proposed.
const GDPR_ANCHOR = 'the-gdpr';
const EU_CYBER_ANCHOR = 'cyber-security-and-incident-reporting-law';
const EU_LAW_ANCHOR = 'liability-copyright-consumer-and-sector-law';
const NIST_NEWER_ANCHOR = 'newer-nist-ai-work';
const US_FRONTIER_ANCHOR = 'frontier-developer-laws';
const US_STATE_ANCHOR = 'other-state-ai-laws';
const US_PRIVACY_ANCHOR = 'state-privacy-and-sector-laws';
const US_FEDERAL_ANCHOR = 'federal-law-that-already-reaches-ai';
const KOREA_ANCHOR = 'south-korea-article-by-article';
const UK_ANCHOR = 'united-kingdom';
const INTL_ANCHOR = 'treaty-and-international-soft-law';
const CEN_ANCHOR = 'what-is-not-harmonised-yet';

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
    id: 'gdpr',
    name: 'General Data Protection Regulation (EU) 2016/679',
    short: 'GDPR',
    type: 'law',
    issuer: 'European Union',
    url: 'https://eur-lex.europa.eu/eli/reg/2016/679/oj/eng',
    summary:
      'The EU data-protection regulation, applying since 25 May 2018. It applies alongside the AI Act whenever an AI system processes personal data: lawful basis, minimisation, DPIA, automated decisions, data subject rights and breach notification.',
  },
  {
    id: 'eu-nis2',
    name: 'NIS2 Directive (EU) 2022/2555',
    short: 'NIS2',
    type: 'law',
    issuer: 'European Union',
    url: 'https://eur-lex.europa.eu/eli/dir/2022/2555/oj/eng',
    summary:
      'The EU cyber-security directive for essential and important entities: risk-management measures (incl. business continuity and supply-chain security) and significant-incident reporting on a 24-hour, 72-hour and one-month clock. Member States apply their measures from 18 October 2024.',
  },
  {
    id: 'eu-dora',
    name: 'Digital Operational Resilience Act (EU) 2022/2554',
    short: 'DORA',
    type: 'law',
    issuer: 'European Union',
    url: 'https://eur-lex.europa.eu/eli/reg/2022/2554/oj/eng',
    summary:
      'The EU regulation on the digital operational resilience of financial entities, applying since 17 January 2025: ICT risk management, major ICT-related incident reporting and the management of ICT third-party risk, including AI and model services.',
  },
  {
    id: 'eu-cra',
    name: 'Cyber Resilience Act (EU) 2024/2847',
    short: 'CRA',
    type: 'law',
    issuer: 'European Union',
    url: 'https://eur-lex.europa.eu/eli/reg/2024/2847/oj/eng',
    summary:
      'The EU regulation on cyber-security requirements for products with digital elements. Its reporting of actively exploited vulnerabilities and severe incidents (Article 14) applies from 11 September 2026; the rest from 11 December 2027.',
  },
  {
    id: 'eu-pld',
    name: 'Product Liability Directive (EU) 2024/2853',
    short: 'EU PLD',
    type: 'law',
    issuer: 'European Union',
    url: 'https://eur-lex.europa.eu/eli/dir/2024/2853/oj/eng',
    summary:
      'The revised EU strict-liability regime for defective products. Software, including AI systems, is a product; it applies to products placed on the market or put into service after 9 December 2026, the transposition deadline.',
  },
  {
    id: 'eu-dsm',
    name: 'Directive (EU) 2019/790 on copyright in the Digital Single Market',
    short: 'DSM Directive',
    type: 'law',
    issuer: 'European Union',
    url: 'https://eur-lex.europa.eu/eli/dir/2019/790/oj/eng',
    summary:
      'The EU copyright directive whose Article 4 text-and-data-mining exception applies only where rightholders have not reserved their works, for online content by machine-readable means. The AI Act points GPAI providers to it (Art. 53(1)(c)).',
  },
  {
    id: 'eu-dsa',
    name: 'Digital Services Act (EU) 2022/2065',
    short: 'DSA',
    type: 'law',
    issuer: 'European Union',
    url: 'https://eur-lex.europa.eu/eli/reg/2022/2065/oj/eng',
    summary:
      'The EU regulation on intermediary services, applying in full since 17 February 2024. For online platforms it bans deceptive or manipulative interface design and requires the main parameters of recommender systems to be explained.',
  },
  {
    id: 'eu-ucpd',
    name: 'Unfair Commercial Practices Directive 2005/29/EC',
    short: 'UCPD',
    type: 'law',
    issuer: 'European Union',
    url: 'https://eur-lex.europa.eu/eli/dir/2005/29/oj/eng',
    summary:
      'The EU consumer-protection directive against unfair, misleading and aggressive commercial practices, whose blacklist was extended to fake and unverified consumer reviews by Directive (EU) 2019/2161. It reaches AI-generated claims, reviews and chatbot answers.',
  },
  {
    id: 'eu-platform-work',
    name: 'Platform Work Directive (EU) 2024/2831',
    short: 'Platform Work Directive',
    type: 'law',
    issuer: 'European Union',
    url: 'https://eur-lex.europa.eu/eli/dir/2024/2831/oj/eng',
    summary:
      'The EU directive on platform work, including the first EU rules on algorithmic management: limits on data processing, transparency, human oversight and human review of automated monitoring and decision-making systems. Transposition by 2 December 2026.',
  },
  {
    id: 'eu-ccd2',
    name: 'Consumer Credit Directive (EU) 2023/2225',
    short: 'CCD2',
    type: 'law',
    issuer: 'European Union',
    url: 'https://eur-lex.europa.eu/eli/dir/2023/2225/oj/eng',
    summary:
      'The revised EU consumer credit directive. Its creditworthiness rules give consumers a right to human intervention, an explanation and a review where the assessment involves automated processing; Member States apply it from 20 November 2026.',
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
    id: 'iso-22989',
    name: 'ISO/IEC 22989:2022',
    short: 'ISO 22989',
    type: 'standard',
    issuer: 'ISO/IEC',
    url: 'https://www.iso.org/standard/74296.html',
    summary:
      'AI concepts and terminology (2022): the shared vocabulary for AI systems, the AI system life cycle and AI stakeholder roles that the other SC 42 standards and many registries reuse.',
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
    id: 'nist-ai-600-1',
    name: 'NIST AI 600-1 Generative AI Profile',
    short: 'NIST AI 600-1',
    type: 'framework',
    issuer: 'NIST',
    url: 'https://doi.org/10.6028/NIST.AI.600-1',
    summary:
      'The AI RMF profile for generative AI (26 July 2024): 12 risks that generative AI creates or exacerbates and suggested actions coded to the Govern, Map, Measure and Manage functions. Voluntary.',
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
    id: 'ca-ab-2013',
    name: 'California AB 2013 (training-data transparency)',
    short: 'California AB 2013',
    type: 'law',
    issuer: 'State of California',
    url: 'https://leginfo.legislature.ca.gov/faces/billNavClient.xhtml?bill_id=202320240AB2013',
    summary:
      'A California law (chaptered 28 September 2024) requiring developers of generative AI systems made available to Californians to post a summary of their training datasets on or before 1 January 2026 and on each substantial modification.',
  },
  {
    id: 'ca-sb-942',
    name: 'California AI Transparency Act (SB 942 as amended by AB 853)',
    short: 'California SB 942',
    type: 'law',
    issuer: 'State of California',
    url: 'https://leginfo.legislature.ca.gov/faces/billNavClient.xhtml?bill_id=202520260AB853',
    summary:
      'A California provenance law: covered providers of public generative AI systems offer a free detection tool and embed latent disclosures in generated image, video and audio from 2 August 2026; large online platforms follow from 1 January 2027 and capture devices from 1 January 2028.',
  },
  {
    id: 'ca-sb-243',
    name: 'California SB 243 (companion chatbots)',
    short: 'California SB 243',
    type: 'law',
    issuer: 'State of California',
    url: 'https://leginfo.legislature.ca.gov/faces/billNavClient.xhtml?bill_id=202520260SB243',
    summary:
      'A California law on companion chatbots (chaptered 13 October 2025): AI disclosure, three-hourly reminders and content limits for known minors, a suicide and self-harm protocol, annual reports from 1 July 2027 and a private right of action.',
  },
  {
    id: 'ca-cppa-regs',
    name: 'California CPPA regulations (ADMT, risk assessments, cybersecurity audits)',
    short: 'California CPPA',
    type: 'law',
    issuer: 'State of California',
    url: 'https://cppa.ca.gov/announcements/2025/20250923.html',
    summary:
      'Regulations under the California Consumer Privacy Act, approved on 23 September 2025 and effective 1 January 2026: automated decisionmaking technology duties for significant decisions from 1 January 2027, risk assessments, and cybersecurity audits phased from 2028.',
  },
  {
    id: 'ny-gbl-47',
    name: 'New York General Business Law Article 47 (AI companion models)',
    short: 'New York GBL Art. 47',
    type: 'law',
    issuer: 'State of New York',
    url: 'https://www.nysenate.gov/legislation/laws/GBS/A47',
    summary:
      'A New York law on AI companion models: a protocol to detect suicidal ideation and self-harm and refer users to crisis services, and a notice that the user is not talking to a human at the start and at least every three hours, enforced by the Attorney General.',
  },
  {
    id: 'il-hb-3773',
    name: 'Illinois HB 3773 (AI in employment)',
    short: 'Illinois HB 3773',
    type: 'law',
    issuer: 'State of Illinois',
    url:
      'https://www.hinshawlaw.com/en/insights/blogs/employment-law-observer/illinois-adopts-new-ai-in-employment-regulations-what-employers-need-to-know-for-2026',
    summary:
      'An amendment to the Illinois Human Rights Act, effective 1 January 2026 as reported: employers may not use AI with a discriminatory effect on protected classes, nor ZIP codes as a proxy, and must notify employees and applicants.',
  },
  {
    id: 'nyc-ll-144',
    name: 'New York City Local Law 144 (automated employment decision tools)',
    short: 'NYC LL 144',
    type: 'law',
    issuer: 'City of New York',
    url: 'https://www.nyc.gov/site/dca/about/automated-employment-decision-tools.page',
    summary:
      'A New York City law, enforced since 5 July 2023: an independent bias audit of an automated employment decision tool within one year before use, a published summary of the results and notices to candidates and employees.',
  },
  {
    id: 'ut-ai-disclosure',
    name: 'Utah AI disclosure law (AI Policy Act as amended by SB 226)',
    short: 'Utah AI disclosure',
    type: 'law',
    issuer: 'State of Utah',
    url: 'https://le.utah.gov/Session/2025/bills/enrolled/SB0226.pdf',
    summary:
      "Utah's generative-AI disclosure duties, re-enacted by SB 226 with effect from 7 May 2025: disclosure when a person clearly asks, prominent disclosure in high-risk interactions by regulated occupations, and a safe harbour for clear disclosure; the AI Policy Act itself is repealed on 1 July 2027.",
  },
  {
    id: 'co-sb21-169',
    name: "Colorado SB21-169 (insurers' use of external consumer data)",
    short: 'Colorado SB21-169',
    type: 'law',
    issuer: 'State of Colorado',
    url: 'https://leg.colorado.gov/bills/sb21-169',
    summary:
      'A Colorado law (effective 7 September 2021) barring insurers from unfair discrimination through external consumer data, algorithms and predictive models, with a risk-management framework, testing and a chief-risk-officer attestation under rules adopted per line of insurance.',
  },
  {
    id: 'va-cdpa',
    name: 'Virginia Consumer Data Protection Act',
    short: 'Virginia CDPA',
    type: 'law',
    issuer: 'Commonwealth of Virginia',
    url: 'https://law.lis.virginia.gov/vacode/title59.1/chapter53/section59.1-580/',
    summary:
      "Virginia's consumer privacy law. Controllers document data protection assessments for targeted advertising, sale, risky profiling and sensitive data for processing created after 1 January 2023, available to the Attorney General on request.",
  },
  {
    id: 'co-privacy-act',
    name: 'Colorado Privacy Act (SB21-190)',
    short: 'Colorado Privacy Act',
    type: 'law',
    issuer: 'State of Colorado',
    url: 'https://leg.colorado.gov/bills/sb21-190',
    summary:
      "Colorado's consumer privacy law, effective 1 July 2023: opt-outs incl. profiling in furtherance of significant decisions, data protection assessments and a universal opt-out mechanism.",
  },
  {
    id: 'mn-cdpa',
    name: 'Minnesota Consumer Data Privacy Act',
    short: 'Minnesota CDPA',
    type: 'law',
    issuer: 'State of Minnesota',
    url: 'https://www.revisor.mn.gov/statutes/cite/325M.14',
    summary:
      "Minnesota's consumer privacy law, effective 31 July 2025, whose consumer rights include questioning the result of profiling, learning the reason, reviewing and correcting the data and having the decision re-evaluated.",
  },
  {
    id: 'il-bipa',
    name: 'Illinois Biometric Information Privacy Act (BIPA)',
    short: 'Illinois BIPA',
    type: 'law',
    issuer: 'State of Illinois',
    url: 'https://en.wikipedia.org/wiki/Biometric_Information_Privacy_Act',
    summary:
      'The Illinois biometric privacy statute (2008, as reported): informed written consent before collecting biometric identifiers, a retention and destruction schedule and a private right of action with statutory damages.',
  },
  {
    id: 'wa-mhmda',
    name: 'Washington My Health My Data Act',
    short: 'Washington MHMDA',
    type: 'law',
    issuer: 'State of Washington',
    url: 'https://app.leg.wa.gov/RCW/default.aspx?cite=19.373&full=true',
    summary:
      "Washington's consumer health data law (from 31 March 2024): consent to collect and separate consent to share consumer health data, including data derived by algorithms or machine learning, and a signed authorisation for any sale.",
  },
  {
    id: 'us-omb-m-25-21',
    name: 'OMB Memorandum M-25-21 (federal use of AI)',
    short: 'OMB M-25-21',
    type: 'framework',
    issuer: 'United States (federal)',
    url:
      'https://www.whitehouse.gov/wp-content/uploads/2025/02/M-25-21-Accelerating-Federal-Use-of-AI-through-Innovation-Governance-and-Public-Trust.pdf',
    summary:
      'The OMB memorandum of 3 April 2025 that binds US federal agencies: a definition of high-impact AI and minimum risk-management practices for it, documented within 365 days. It rescinded M-24-10.',
  },
  {
    id: 'us-omb-m-26-04',
    name: 'OMB Memorandum M-26-04 (unbiased AI principles in procurement)',
    short: 'OMB M-26-04',
    type: 'framework',
    issuer: 'United States (federal)',
    url:
      'https://www.whitehouse.gov/wp-content/uploads/2025/12/M-26-04-Increasing-Public-Trust-in-Artificial-Intelligence-Through-Unbiased-AI-Principles-1.pdf',
    summary:
      'The OMB memorandum of 11 December 2025 implementing EO 14319: agencies updated procurement policies by 11 March 2026, and solicitations for large language models request minimum transparency from vendors.',
  },
  {
    id: 'us-ecoa-reg-b',
    name: 'Equal Credit Opportunity Act, Regulation B (12 CFR 1002)',
    short: 'ECOA / Reg. B',
    type: 'law',
    issuer: 'United States (federal)',
    url: 'https://www.law.cornell.edu/cfr/text/12/1002.9',
    summary:
      'The US fair-lending rule that requires a creditor taking adverse action to give the specific principal reasons, whatever the complexity of the model behind the decision.',
  },
  {
    id: 'us-fcra',
    name: 'Fair Credit Reporting Act (15 U.S.C. 1681m)',
    short: 'FCRA',
    type: 'law',
    issuer: 'United States (federal)',
    url: 'https://www.law.cornell.edu/uscode/text/15/1681m',
    summary:
      'The US consumer-report statute whose adverse-action notice includes, since 21 July 2011, the numerical credit score used and its key factors.',
  },
  {
    id: 'us-title-vii-ugesp',
    name: 'Title VII and the Uniform Guidelines on Employee Selection Procedures',
    short: 'Title VII / UGESP',
    type: 'law',
    issuer: 'United States (federal)',
    url: 'https://www.law.cornell.edu/uscode/text/42/2000e-2',
    summary:
      'US employment-discrimination law: disparate impact under Title VII s. 703(k) (Civil Rights Act of 1991) and the four-fifths rule of 29 CFR 1607.4(D), which apply to AI selection tools as to any other selection procedure.',
  },
  {
    id: 'us-ftc-act',
    name: 'FTC Act s. 5 (15 U.S.C. 45)',
    short: 'FTC Act s. 5',
    type: 'law',
    issuer: 'United States (federal)',
    url: 'https://www.law.cornell.edu/uscode/text/15/45',
    summary:
      "The US prohibition of unfair or deceptive acts or practices, under which the Federal Trade Commission requires competent and reliable evidence for claims about an AI system's accuracy or performance.",
  },
  {
    id: 'us-take-it-down',
    name: 'TAKE IT DOWN Act (Public Law 119-12)',
    short: 'TAKE IT DOWN Act',
    type: 'law',
    issuer: 'United States (federal)',
    url: 'https://www.govinfo.gov/content/pkg/PLAW-119publ12/html/PLAW-119publ12.htm',
    summary:
      'A US federal law enacted on 19 May 2025 that criminalises knowing publication of non-consensual intimate images, including digital forgeries, and requires covered platforms to run a notice-and-removal process by 19 May 2026, removing reported images within 48 hours.',
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
    name: 'Colorado ADMT law (SB 26-189, replacing SB 24-205)',
    short: 'Colorado ADMT',
    type: 'law',
    issuer: 'State of Colorado',
    url: 'https://leg.colorado.gov/bills/sb26-189',
    summary:
      "Colorado's law on automated decision-making technology in consequential decisions, SB 26-189 (signed 14 May 2026, effective 1 January 2027): developer documentation, deployer notice, an explanation within 30 days of an adverse outcome, human review and three-year records. It repealed and re-enacted SB 24-205, the Colorado AI Act, whose duty of care against algorithmic discrimination had been delayed to 30 June 2026.",
  },
  {
    id: 'kr-ai-basic-act',
    name: 'South Korea AI Basic Act',
    short: 'Korea AI Act',
    type: 'law',
    issuer: 'Republic of Korea',
    url: 'https://www.law.go.kr/LSW/lsInfoP.do?lsiSeq=268543',
    summary:
      "South Korea's framework Act on AI (Basic Act on the Development of AI and the Establishment of a Foundation for Trust, Act No. 20676), in force 22 January 2026 with its Enforcement Decree. It sets baseline duties for AI operators and heightened obligations for \"high-impact\" AI in sensitive sectors; the ministry (MSIT) announced a guidance period of at least one year in which fact-finding and fines are held back except in exceptional cases, while the duties apply.",
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
    id: 'uk-dmcc',
    name: 'UK Digital Markets, Competition and Consumers Act 2024',
    short: 'UK DMCC Act',
    type: 'law',
    issuer: 'United Kingdom',
    url: 'https://www.legislation.gov.uk/ukpga/2024/13/section/225',
    summary:
      'The UK consumer-protection regime in force since 6 April 2025: unfair commercial practices are prohibited, and Schedule 20 bans fake and concealed-incentive consumer reviews, however they are produced.',
  },
  {
    id: 'uk-atrs',
    name: 'UK Algorithmic Transparency Recording Standard (ATRS) v4.0',
    short: 'UK ATRS',
    type: 'standard',
    issuer: 'UK Government Digital Service',
    url:
      'https://www.gov.uk/government/collections/algorithmic-transparency-recording-standard-hub',
    summary:
      "A two-tier record template for public-sector algorithmic tools, mandatory for government departments and for arm's-length bodies that deliver public or frontline services under the December 2024 scope policy, and recommended across the wider public sector (as of 2026-09-24).",
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
    id: 'sg-agentic-framework',
    name: 'Singapore Model AI Governance Framework for Agentic AI',
    short: 'Singapore Agentic',
    type: 'framework',
    issuer: 'IMDA',
    url:
      'https://www.imda.gov.sg/-/media/imda/files/about/emerging-tech-and-research/artificial-intelligence/mgf-for-agentic-ai.pdf',
    summary:
      'Voluntary guidance launched on 22 Jan 2026; version 1.5 (20 May 2026, updated 5 Jun 2026) has four dimensions: assess and bound the risks upfront, make humans meaningfully accountable, implement technical controls and processes, enable end-user responsibility.',
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
    id: 'cn-pipl',
    name: 'China Personal Information Protection Law (PIPL)',
    short: 'China PIPL',
    type: 'law',
    issuer: 'NPC Standing Committee (China)',
    summary:
      "China's personal-information law, in force 1 November 2021: legal bases, separate consent for sensitive data, rules for automated decision-making (Art. 24) and a personal information protection impact assessment kept at least three years (Arts. 55 and 56).",
  },
  {
    id: 'cn-anthropomorphic',
    name: 'China Interim Measures for Anthropomorphic Interaction Services (2026)',
    short: 'China Anthropomorphic',
    type: 'law',
    issuer: 'CAC, NDRC, MIIT, MPS and SAMR (China)',
    url: 'https://www.cac.gov.cn/2026-04/10/c_1777558395078289.htm',
    summary:
      "China's binding measures for AI services that offer sustained emotional interaction, in force 15 July 2026: a minors' mode, AI signals and a two-hour reminder, an easy exit, a security assessment at 1 million registered or 100,000 monthly active users, and filing.",
  },
  {
    id: 'canada-dadm',
    name: 'Canada Directive on Automated Decision-Making',
    short: 'Canada DADM',
    type: 'law',
    issuer: 'Government of Canada (Treasury Board)',
    url: 'https://www.tbs-sct.canada.ca/pol/doc-eng.aspx?id=32592',
    summary:
      "The Treasury Board directive that binds Canadian federal institutions' automated decision systems (in effect since 1 April 2019; modified 24 June 2025): a published algorithmic impact assessment, impact-level requirements, notice, explanation, peer review and recourse.",
  },
  {
    id: 'br-lgpd',
    name: 'Brazil General Data Protection Law (LGPD, Lei 13.709/2018)',
    short: 'Brazil LGPD',
    type: 'law',
    issuer: 'Federative Republic of Brazil',
    url: 'https://www.planalto.gov.br/ccivil_03/_ato2015-2018/2018/lei/l13709compilado.htm',
    summary:
      "Brazil's data-protection law. Its Article 20 gives data subjects a right to request review of decisions taken solely on automated processing, with clear information on the criteria and procedures used.",
  },
  {
    id: 'coe-cets-225',
    name: 'Council of Europe Framework Convention on AI (CETS No. 225)',
    short: 'CoE Convention',
    type: 'law',
    issuer: 'Council of Europe',
    url: 'https://rm.coe.int/1680afae3c',
    summary:
      'A treaty on AI and human rights, democracy and the rule of law, binding on Parties once in force; not in force as of 2026-09-24. The EU implements it through the AI Act.',
  },
  {
    id: 'oecd-ai-principles',
    name: 'OECD AI Principles (Recommendation on AI, OECD/LEGAL/0449)',
    short: 'OECD AI Principles',
    type: 'framework',
    issuer: 'OECD',
    url: 'https://legalinstruments.oecd.org/en/instruments/OECD-LEGAL-0449',
    summary:
      'Five values-based principles for AI actors and five recommendations to governments, revised on 3 May 2024; a non-binding intergovernmental standard.',
  },
  {
    id: 'g7-hiroshima-coc',
    name: 'G7 Hiroshima Process International Code of Conduct for Advanced AI Systems',
    short: 'G7 Code',
    type: 'code',
    issuer: 'G7',
    url:
      'https://digital-strategy.ec.europa.eu/en/library/hiroshima-process-international-code-conduct-advanced-ai-systems',
    summary:
      'Eleven voluntary actions for organisations developing advanced AI systems, from lifecycle risk management to content provenance and data protection.',
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
  {
    id: 'pren-18228',
    name: 'prEN 18228 AI risk management (draft)',
    short: 'prEN 18228',
    type: 'standard',
    issuer: 'CEN-CENELEC JTC 21',
    url: 'https://genorma.com/en/standards/pren-18228',
    summary:
      'Draft harmonised standard supporting AI Act Art. 9; its Enquiry vote closed on 30 Jul 2026, as reported by Genorma on 2026-09-24.',
  },
  {
    id: 'pren-18229-1',
    name: 'prEN 18229-1 AI trustworthiness framework, Part 1: logging (draft)',
    short: 'prEN 18229-1',
    type: 'standard',
    issuer: 'CEN-CENELEC JTC 21',
    url: 'https://jtc21.eu/working-groups/',
    summary:
      'Draft harmonised standard supporting AI Act Art. 12; its Enquiry vote closed on 20 Aug 2026, as reported by Genorma on 2026-09-24.',
  },
] as const;

// Review stamps: the debt-and-date pass re-verified the EU AI Act dates, the
// NIST drafts, the OWASP LLM Top 10, the US state dates and the "Other
// jurisdictions" rows on 2026-09-24; the China rows keep chapter 08's stamp of
// 2026-09-20; the rest were last checked for v0.4.0 on 2026-09-19. The rows added
// for v0.5.0 (and the rows they corrected) carry REVIEWED_V050.
const REVIEWED_DEBT_PASS = '2026-09-24';
const REVIEWED_V050 = '2026-09-24';
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
  {
    date: '2027-08-02',
    note: 'GPAI models placed on the market before 2025-08-02 comply by this date (Art. 111(3))',
  },
];

const EU = 'EU AI Act';
const EU_ID = 'eu-ai-act';
const MSA = 'National MSA';
const ANNEX_III_NOTE = '2027-12-02 (Annex III)';

/** The obligation → artefact → layer rows, faithful to the chapter's tables. */
export const obligations: readonly Obligation[] = [
  // EU AI Act, post-Omnibus
  {
    id: 'AIGE-OBL-EUAIA-ART3-1',
    frameworkId: EU_ID,
    framework: EU,
    clause: 'Art. 3(1)',
    obligation: 'EU AI Act Art. 3(1) AI system definition (scope of the Act)',
    requirement:
      'Scope: decide, system by system, whether it is an AI system under the Art. 3(1) definition before any other duty is assessed',
    artefact:
      'Definitional decision record in the registry: definition applied, elements found, excluded family if any, reason, decider, date',
    layerN: [2],
    anchor: EU_ANCHOR,
    dutyHolder: 'Provider + deployer (scoping)',
    authority: MSA,
    appliesFrom: '2025-02-02',
    appliesStatus: 'in-force',
    appliesNote: '2025-02-02 (Chapter I)',
    systemClass: ['all-ai-systems'],
    reviewed: REVIEWED_V050,
  },
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
    id: 'AIGE-OBL-EUAIA-ART6-3',
    frameworkId: EU_ID,
    framework: EU,
    clause: 'Art. 6(3)–(4)',
    obligation: 'EU AI Act Art. 6(3)–(4) documented non-high-risk assessment and registration',
    requirement:
      'A provider that finds an Annex III system not high-risk under the Art. 6(3) filter documents the assessment before placing it on the market and registers it under Art. 49(2); a system that profiles natural persons is always high-risk',
    artefact:
      'Classification decision record (Annex III point, Art. 6(3) condition, explicit profiling flag); Art. 49(2) registration entry pushed from the registry',
    layerN: [1, 2],
    anchor: EU_ANCHOR,
    dutyHolder: 'Provider',
    authority: MSA,
    appliesFrom: '2027-12-02',
    appliesStatus: 'deferred',
    appliesNote: ANNEX_III_NOTE,
    systemClass: ANNEX_III,
    reviewed: REVIEWED_V050,
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
    id: 'AIGE-OBL-EUAIA-ART15-4',
    frameworkId: EU_ID,
    framework: EU,
    clause: 'Art. 15(4)',
    obligation: 'EU AI Act Art. 15(4) feedback loops in systems that continue to learn',
    requirement:
      'Systems that continue to learn after placing on the market are built to eliminate or reduce the risk of biased outputs feeding future inputs (feedback loops), with mitigation measures',
    artefact:
      'Feedback-loop fairness monitor; retraining-data bias check; agent memory write gate with provenance and rollback to a known-good snapshot',
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
    reviewed: REVIEWED_V050,
  },
  {
    id: 'AIGE-OBL-EUAIA-ART16-L',
    frameworkId: EU_ID,
    framework: EU,
    clause: 'Art. 16(l)',
    obligation: 'EU AI Act Art. 16(l) accessibility requirements for high-risk AI systems',
    requirement:
      'Providers ensure the high-risk system complies with the accessibility requirements of Directives (EU) 2016/2102 and (EU) 2019/882',
    artefact:
      'Accessibility test results for every notice, instruction and explanation shown to people, run in the pipeline; accessible explanation templates',
    layerN: [2, 3],
    anchor: EU_ANCHOR,
    dutyHolder: 'Provider',
    authority: MSA,
    appliesFrom: '2027-12-02',
    appliesStatus: 'deferred',
    appliesNote: ANNEX_III_NOTE,
    milestones: HIGH_RISK_STEPS,
    systemClass: HIGH_RISK,
    reviewed: REVIEWED_V050,
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
    id: 'AIGE-OBL-EUAIA-ART17-1M',
    frameworkId: EU_ID,
    framework: EU,
    clause: 'Art. 17(1)(m)',
    obligation:
      'EU AI Act Art. 17(1)(m) accountability framework within the quality management system',
    requirement:
      'The QMS includes an accountability framework setting out the responsibilities of management and other staff for every aspect of the QMS',
    artefact:
      'RACI as code compiled into registry owner fields and code-owner rules; committee decision records',
    layerN: [1, 2],
    anchor: EU_ANCHOR,
    dutyHolder: 'Provider',
    authority: MSA,
    appliesFrom: '2027-12-02',
    appliesStatus: 'deferred',
    appliesNote: ANNEX_III_NOTE,
    milestones: HIGH_RISK_STEPS,
    systemClass: HIGH_RISK,
    patterns: ['pattern-machine-readable-evidence-oscal'],
    reviewed: REVIEWED_V050,
  },
  {
    id: 'AIGE-OBL-EUAIA-ART18',
    frameworkId: EU_ID,
    framework: EU,
    clause: 'Art. 18',
    obligation: 'EU AI Act Art. 18 documentation keeping',
    requirement:
      'Keep the technical documentation, the QMS documentation, notified-body changes and decisions and the EU declaration at the disposal of national authorities for 10 years after placing on the market',
    artefact:
      'Retention-as-code for the technical file, QMS records, notified-body decisions and the EU declaration (10 years); write-once evidence store',
    layerN: [2, 5],
    anchor: EU_ANCHOR,
    dutyHolder: 'Provider',
    authority: MSA,
    appliesFrom: '2027-12-02',
    appliesStatus: 'deferred',
    appliesNote: ANNEX_III_NOTE,
    milestones: HIGH_RISK_STEPS,
    systemClass: HIGH_RISK,
    reviewed: REVIEWED_V050,
  },
  {
    id: 'AIGE-OBL-EUAIA-ART19',
    frameworkId: EU_ID,
    framework: EU,
    clause: 'Art. 19',
    obligation: 'EU AI Act Art. 19 automatically generated logs kept by the provider',
    requirement:
      "Keep the automatically generated logs under the provider's control for a period appropriate to the intended purpose, at least six months unless other law provides otherwise",
    artefact:
      'Log-retention policy as code (at least six months, set by intended purpose); tamper-evident log store',
    layerN: [4, 5],
    anchor: EU_ANCHOR,
    dutyHolder: 'Provider',
    authority: MSA,
    appliesFrom: '2027-12-02',
    appliesStatus: 'deferred',
    appliesNote: ANNEX_III_NOTE,
    milestones: HIGH_RISK_STEPS,
    systemClass: HIGH_RISK,
    reviewed: REVIEWED_V050,
  },
  {
    id: 'AIGE-OBL-EUAIA-ART20',
    frameworkId: EU_ID,
    framework: EU,
    clause: 'Art. 20',
    obligation: 'EU AI Act Art. 20 corrective actions and duty of information',
    requirement:
      'A provider with reason to consider a high-risk system non-conforming immediately brings it into conformity, withdraws, disables or recalls it and informs distributors and deployers; where the system presents a risk, it investigates and informs the market-surveillance authority',
    artefact:
      'CAPA record; withdraw, disable or recall runbook; notification of distributors and deployers',
    layerN: [1, 5],
    anchor: EU_ANCHOR,
    dutyHolder: 'Provider',
    authority: MSA,
    appliesFrom: '2027-12-02',
    appliesStatus: 'deferred',
    appliesNote: ANNEX_III_NOTE,
    milestones: HIGH_RISK_STEPS,
    systemClass: HIGH_RISK,
    reviewed: REVIEWED_V050,
  },
  {
    id: 'AIGE-OBL-EUAIA-ART22',
    frameworkId: EU_ID,
    framework: EU,
    clause: 'Art. 22',
    obligation: 'EU AI Act Art. 22 authorised representative of non-EU high-risk providers',
    requirement:
      'A provider established outside the Union appoints, by written mandate, an authorised representative in the Union before making the system available; the representative keeps the declaration, documentation and certificate for 10 years',
    artefact:
      'Written mandate; 10-year copies of the declaration, technical documentation and certificate; authority contact route',
    layerN: [5],
    anchor: EU_ANCHOR,
    dutyHolder: 'Non-EU provider + authorised representative',
    authority: MSA,
    appliesFrom: '2027-12-02',
    appliesStatus: 'deferred',
    appliesNote: ANNEX_III_NOTE,
    milestones: HIGH_RISK_STEPS,
    systemClass: HIGH_RISK,
    reviewed: REVIEWED_V050,
  },
  {
    id: 'AIGE-OBL-EUAIA-ART23',
    frameworkId: EU_ID,
    framework: EU,
    clause: 'Art. 23',
    obligation: 'EU AI Act Art. 23 obligations of importers',
    requirement:
      'Before placing a high-risk system on the market, the importer verifies the conformity assessment, the Annex IV documentation, the CE marking, the declaration and instructions and the authorised representative, and keeps copies for 10 years',
    artefact:
      'Import verification record against each check; 10-year document copies',
    layerN: [2, 5],
    anchor: EU_ANCHOR,
    dutyHolder: 'Importer',
    authority: MSA,
    appliesFrom: '2027-12-02',
    appliesStatus: 'deferred',
    appliesNote: ANNEX_III_NOTE,
    milestones: HIGH_RISK_STEPS,
    systemClass: HIGH_RISK,
    reviewed: REVIEWED_V050,
  },
  {
    id: 'AIGE-OBL-EUAIA-ART24',
    frameworkId: EU_ID,
    framework: EU,
    clause: 'Art. 24',
    obligation: 'EU AI Act Art. 24 obligations of distributors',
    requirement:
      'Before making a high-risk system available, the distributor verifies the CE marking, the declaration and the instructions, and holds back, withdraws or recalls a system it considers non-conforming',
    artefact:
      'Distribution check record; hold, withdraw or recall workflow',
    layerN: [2, 5],
    anchor: EU_ANCHOR,
    dutyHolder: 'Distributor',
    authority: MSA,
    appliesFrom: '2027-12-02',
    appliesStatus: 'deferred',
    appliesNote: ANNEX_III_NOTE,
    milestones: HIGH_RISK_STEPS,
    systemClass: HIGH_RISK,
    reviewed: REVIEWED_V050,
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
      'Deployer obligations for high-risk systems: use per the instructions for use (Art. 26(1)); the paragraph rows below break out oversight, input data, monitoring, logs and notices',
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
    id: 'AIGE-OBL-EUAIA-ART26-2',
    frameworkId: EU_ID,
    framework: EU,
    clause: 'Art. 26(2)',
    obligation:
      'EU AI Act Art. 26(2) human oversight assigned to persons with competence, training and authority',
    requirement:
      'Deployers assign human oversight to natural persons with the necessary competence, training and authority, and the necessary support',
    artefact:
      'Oversight assignment in the registry; role-based training records with expiry; approver roster per checkpoint class with authority to pause or refuse',
    layerN: [1, 4],
    anchor: EU_ANCHOR,
    dutyHolder: 'Deployer',
    authority: MSA,
    appliesFrom: '2027-12-02',
    appliesStatus: 'deferred',
    appliesNote: ANNEX_III_NOTE,
    milestones: HIGH_RISK_STEPS,
    systemClass: HIGH_RISK,
    patterns: ['pattern-vendor--model-due-diligence-gate'],
    reviewed: REVIEWED_V050,
  },
  {
    id: 'AIGE-OBL-EUAIA-ART26-4',
    frameworkId: EU_ID,
    framework: EU,
    clause: 'Art. 26(4)',
    obligation: 'EU AI Act Art. 26(4) input data relevant and sufficiently representative',
    requirement:
      'To the extent the deployer controls the input data, it ensures the data are relevant and sufficiently representative for the intended purpose',
    artefact:
      'Input-data checks against the population in the deployment record; drift monitors on inputs',
    layerN: [2, 3],
    anchor: EU_ANCHOR,
    dutyHolder: 'Deployer',
    authority: MSA,
    appliesFrom: '2027-12-02',
    appliesStatus: 'deferred',
    appliesNote: ANNEX_III_NOTE,
    milestones: HIGH_RISK_STEPS,
    systemClass: HIGH_RISK,
    patterns: ['pattern-vendor--model-due-diligence-gate'],
    reviewed: REVIEWED_V050,
  },
  {
    id: 'AIGE-OBL-EUAIA-ART26-5',
    frameworkId: EU_ID,
    framework: EU,
    clause: 'Art. 26(5)',
    obligation: 'EU AI Act Art. 26(5) deployer monitoring, suspension and informing the provider',
    requirement:
      'Deployers monitor operation per the instructions; on reason to consider a risk they inform the provider or distributor and the authority and suspend use; a serious incident goes to the provider first, and Art. 73 applies to the deployer if the provider cannot be reached',
    artefact:
      'Monitoring plan with signal owners; tested suspension path (feature flag, traffic switch); provider incident contact in the registry; pre-filled risk and serious-incident notices',
    layerN: [2, 4, 5],
    anchor: EU_ANCHOR,
    dutyHolder: 'Deployer',
    authority: MSA,
    appliesFrom: '2027-12-02',
    appliesStatus: 'deferred',
    appliesNote: ANNEX_III_NOTE,
    milestones: HIGH_RISK_STEPS,
    systemClass: HIGH_RISK,
    patterns: ['pattern-vendor--model-due-diligence-gate'],
    reviewed: REVIEWED_V050,
  },
  {
    id: 'AIGE-OBL-EUAIA-ART26-6',
    frameworkId: EU_ID,
    framework: EU,
    clause: 'Art. 26(6)',
    obligation: 'EU AI Act Art. 26(6) deployer retention of automatically generated logs',
    requirement:
      'Deployers keep the logs under their control for a period appropriate to the intended purpose, at least six months unless other law provides otherwise',
    artefact:
      'Retention-as-code schedule; tamper-evident log store; legal hold while an incident is open',
    layerN: [4, 5],
    anchor: EU_ANCHOR,
    dutyHolder: 'Deployer',
    authority: MSA,
    appliesFrom: '2027-12-02',
    appliesStatus: 'deferred',
    appliesNote: ANNEX_III_NOTE,
    milestones: HIGH_RISK_STEPS,
    systemClass: HIGH_RISK,
    patterns: ['pattern-vendor--model-due-diligence-gate'],
    reviewed: REVIEWED_V050,
  },
  {
    id: 'AIGE-OBL-EUAIA-ART26-7',
    frameworkId: EU_ID,
    framework: EU,
    clause: 'Art. 26(7)',
    obligation: 'EU AI Act Art. 26(7) informing workers before workplace use',
    requirement:
      "Before putting a high-risk system into service at the workplace, deployers who are employers inform workers' representatives and the affected workers",
    artefact:
      'Worker-information record dated before first use and linked to the registry entry; HR intake trigger for Annex III point 4 systems',
    layerN: [2],
    anchor: EU_ANCHOR,
    dutyHolder: 'Deployer (employer)',
    authority: MSA,
    appliesFrom: '2027-12-02',
    appliesStatus: 'deferred',
    appliesNote: ANNEX_III_NOTE,
    milestones: HIGH_RISK_STEPS,
    systemClass: HIGH_RISK,
    patterns: ['pattern-vendor--model-due-diligence-gate'],
    reviewed: REVIEWED_V050,
  },
  {
    id: 'AIGE-OBL-EUAIA-ART26-11',
    frameworkId: EU_ID,
    framework: EU,
    clause: 'Art. 26(11)',
    obligation: 'EU AI Act Art. 26(11) informing people subject to Annex III decisions',
    requirement:
      'Deployers of Annex III systems that make or assist decisions about natural persons inform those persons that they are subject to the system',
    artefact:
      'AI-use notice at the decision point; notice templates versioned as code; notice delivery log',
    layerN: [2, 4],
    anchor: EU_ANCHOR,
    dutyHolder: 'Deployer',
    authority: MSA,
    appliesFrom: '2027-12-02',
    appliesStatus: 'deferred',
    appliesNote: ANNEX_III_NOTE,
    milestones: ANNEX_III_STEPS,
    systemClass: ANNEX_III,
    patterns: ['pattern-vendor--model-due-diligence-gate'],
    reviewed: REVIEWED_V050,
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
    id: 'AIGE-OBL-EUAIA-ART43-4',
    frameworkId: EU_ID,
    framework: EU,
    clause: 'Art. 43(4)',
    obligation: 'EU AI Act Art. 43(4) new conformity assessment on substantial modification',
    requirement:
      'A system already assessed undergoes a new conformity assessment on substantial modification; changes pre-determined in the technical documentation of a system that continues to learn are not substantial modifications',
    artefact:
      'Change-classification policy on merge; pre-determined change envelope as code; reassessment trigger in the registry',
    layerN: [1, 5],
    anchor: EU_ANCHOR,
    dutyHolder: 'Provider',
    authority: MSA,
    appliesFrom: '2027-12-02',
    appliesStatus: 'deferred',
    appliesNote: ANNEX_III_NOTE,
    milestones: HIGH_RISK_STEPS,
    systemClass: HIGH_RISK,
    reviewed: REVIEWED_V050,
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
    id: 'AIGE-OBL-EUAIA-ART48',
    frameworkId: EU_ID,
    framework: EU,
    clause: 'Art. 48',
    obligation: 'EU AI Act Art. 48 CE marking',
    requirement:
      "Affix the CE marking visibly, legibly and indelibly (a digital marking for digitally provided systems), followed by the notified body's number where applicable",
    artefact:
      'CE-marking record (physical or digital) generated with the EU declaration; notified-body number where applicable',
    layerN: [2, 5],
    anchor: EU_ANCHOR,
    dutyHolder: 'Provider',
    authority: MSA,
    appliesFrom: '2027-12-02',
    appliesStatus: 'deferred',
    appliesNote: ANNEX_III_NOTE,
    milestones: HIGH_RISK_STEPS,
    systemClass: HIGH_RISK,
    reviewed: REVIEWED_V050,
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
      'Content labelling and machine-readable marking (e.g. C2PA-style); chatbot disclosure banner',
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
    id: 'AIGE-OBL-EUAIA-ART52',
    frameworkId: EU_ID,
    framework: EU,
    clause: 'Art. 52',
    obligation:
      'EU AI Act Art. 52 notification of a GPAI model meeting the systemic-risk threshold',
    requirement:
      'Notify the Commission without delay, and within two weeks, once a GPAI model meets the Art. 51(1)(a) condition or it becomes known that it will',
    artefact:
      'Compute ledger per model lineage with a planned-compute threshold alert; notification record filed within two weeks',
    layerN: [2, 5],
    anchor: EU_ANCHOR,
    dutyHolder: 'GPAI provider',
    authority: 'AI Office',
    appliesFrom: '2025-08-02',
    appliesStatus: 'in-force',
    appliesNote: 'Obligations from 2025-08-02; enforcement from 2026-08-02',
    milestones: GPAI_STEPS,
    systemClass: ['gpai-systemic'],
    reviewed: REVIEWED_V050,
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
    id: 'AIGE-OBL-EUAIA-ART53-1C',
    frameworkId: EU_ID,
    framework: EU,
    clause: 'Art. 53(1)(c)',
    obligation:
      'EU AI Act Art. 53(1)(c) copyright policy honouring text-and-data-mining reservations',
    requirement:
      'GPAI providers put in place a policy to comply with Union copyright law, incl. identifying and complying with reservations of rights under Art. 4(3) of Directive (EU) 2019/790',
    artefact:
      'Versioned copyright policy; crawler decision logs; training-data rights ledger with the reservation-check result',
    layerN: [1, 2, 5],
    anchor: EU_ANCHOR,
    dutyHolder: 'GPAI provider',
    authority: 'AI Office',
    appliesFrom: '2025-08-02',
    appliesStatus: 'in-force',
    appliesNote: 'Obligations from 2025-08-02; enforcement from 2026-08-02',
    milestones: GPAI_STEPS,
    systemClass: ['gpai'],
    patterns: ['pattern-aibom', 'pattern-vendor--model-due-diligence-gate'],
    reviewed: REVIEWED_V050,
  },
  {
    id: 'AIGE-OBL-EUAIA-ART54',
    frameworkId: EU_ID,
    framework: EU,
    clause: 'Art. 54',
    obligation: 'EU AI Act Art. 54 authorised representative of non-EU GPAI providers',
    requirement:
      'A GPAI provider established outside the Union appoints, by written mandate, an authorised representative before placing the model on the Union market; the representative keeps the Annex XI documentation for 10 years',
    artefact:
      'Written mandate; Annex XI documentation copy kept 10 years; AI Office contact route',
    layerN: [5],
    anchor: EU_ANCHOR,
    dutyHolder: 'Non-EU GPAI provider + authorised representative',
    authority: 'AI Office',
    appliesFrom: '2025-08-02',
    appliesStatus: 'in-force',
    appliesNote: 'Obligations from 2025-08-02; enforcement from 2026-08-02',
    milestones: GPAI_STEPS,
    systemClass: ['gpai'],
    reviewed: REVIEWED_V050,
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
  {
    id: 'AIGE-OBL-EUAIA-ART73-6',
    frameworkId: EU_ID,
    framework: EU,
    clause: 'Art. 73(6)',
    obligation: 'EU AI Act Art. 73(6) incident investigation without altering the system',
    requirement:
      'After reporting a serious incident the provider investigates without delay (risk assessment, corrective action) and does not alter the system in a way that may affect the evaluation of causes before informing the authorities',
    artefact:
      'Evidence-preservation step: model, prompt, policy and retrieval-index snapshots; sealed traces; fix shipped on a new version',
    layerN: [4, 5],
    anchor: EU_ANCHOR,
    dutyHolder: 'Provider',
    authority: MSA,
    appliesFrom: '2027-12-02',
    appliesStatus: 'deferred',
    appliesNote: ANNEX_III_NOTE,
    milestones: HIGH_RISK_STEPS,
    systemClass: HIGH_RISK,
    patterns: ['pattern-incident-pipeline'],
    reviewed: REVIEWED_V050,
  },
  {
    id: 'AIGE-OBL-EUAIA-ART75-1A',
    frameworkId: EU_ID,
    framework: EU,
    clause: 'Art. 75(1a)',
    obligation: 'EU AI Act Art. 75(1a) serious incidents reported to the AI Office',
    requirement:
      "Providers of high-risk systems under the AI Office's exclusive competence (systems built on their own GPAI model, and systems in designated very large online platforms or search engines) report serious incidents to the AI Office, with Art. 73(2) to (9) applying mutatis mutandis",
    artefact:
      'Incident pipeline routing by a registry competence flag (national MSA or AI Office)',
    layerN: [2, 5],
    anchor: EU_ANCHOR,
    dutyHolder: 'Provider (systems under AI Office competence)',
    authority: 'AI Office',
    appliesFrom: '2027-12-02',
    appliesStatus: 'deferred',
    appliesNote: '2027-12-02 (Annex III); new by the Omnibus (reading, verify)',
    milestones: HIGH_RISK_STEPS,
    systemClass: HIGH_RISK,
    reviewed: REVIEWED_V050,
  },
  {
    id: 'AIGE-OBL-EUAIA-ART86',
    frameworkId: EU_ID,
    framework: EU,
    clause: 'Art. 86',
    obligation: 'EU AI Act Art. 86 right to explanation of individual decision-making',
    requirement:
      "A person subject to a deployer's decision based on an Annex III system (except point 2) with legal or similarly significant adverse effects may obtain clear and meaningful explanations of the system's role and the main elements of the decision, where Union law does not already give the right",
    artefact:
      'Explanation record per decision (system and model version, reason codes, determinative or advisory role, human decider); request-handling workflow and response log',
    layerN: [2, 4, 5],
    anchor: EU_ANCHOR,
    dutyHolder: 'Deployer',
    authority: MSA,
    appliesFrom: '2027-12-02',
    appliesStatus: 'deferred',
    appliesNote: '2027-12-02 (Annex III); Chapter IX applies from 2026-08-02, but the right needs a classified Annex III system (reading, verify)',
    milestones: ANNEX_III_STEPS,
    systemClass: ANNEX_III,
    reviewed: REVIEWED_V050,
  },
  {
    id: 'AIGE-OBL-EUAIA-ART87',
    frameworkId: EU_ID,
    framework: EU,
    clause: 'Art. 87',
    obligation: 'EU AI Act Art. 87 reporting of infringements and protection of reporting persons',
    requirement:
      'Directive (EU) 2019/1937 applies to reports of AI Act infringements and to the protection of the people who make them',
    artefact:
      "Internal reporting channel run as a case system with the directive's clocks encoded; sealed reporter identity; retaliation monitoring; routing to the incident pipeline",
    layerN: [1, 5],
    anchor: EU_ANCHOR,
    dutyHolder: 'Legal entities with internal reporting channels under Directive (EU) 2019/1937',
    authority: 'Authorities designated under Directive (EU) 2019/1937',
    appliesFrom: '2026-08-02',
    appliesStatus: 'in-force',
    appliesNote: '2026-08-02 (general application date)',
    systemClass: ['all-ai-systems'],
    reviewed: REVIEWED_V050,
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
  {
    id: 'AIGE-OBL-GPAICOP-SAFETY-C9',
    frameworkId: 'gpai-code-of-practice',
    framework: 'GPAI Code of Practice',
    clause: 'Safety and Security, Commitment 9',
    obligation: 'Safety and Security Commitment 9: serious-incident reporting',
    requirement:
      'Report serious incidents to the AI Office within 2, 5, 10 or 15 days by incident class, with intermediate reports at least every four weeks while unresolved and a final report within 60 days of resolution; keep the records at least five years',
    artefact:
      'Incident pipeline on the Commission template fields; per-class clocks; five-year retention policy; downstream reporting channel',
    layerN: [4, 5],
    anchor: GPAI_ANCHOR,
    scope: 'Signatory providers of GPAI models with systemic risk',
    appliesStatus: 'voluntary',
    appliesNote: 'Voluntary; published 2025-07-10',
    reviewed: REVIEWED_V050,
  },
  {
    id: 'AIGE-OBL-GPAICOP-SAFETY-APP1',
    frameworkId: 'gpai-code-of-practice',
    framework: 'GPAI Code of Practice',
    clause: 'Safety and Security, Appendix 1.3 and 1.4',
    obligation:
      'Safety and Security Appendix 1.3 and 1.4: autonomy, tool use and loss of control as systemic risks',
    requirement:
      'Sources of systemic risk to consider include the capability to operate autonomously, propensities such as colluding with other AI systems, and affordances such as access to tools and physical systems and the level of human oversight; loss of control is a specified systemic risk',
    artefact:
      'Provider evaluations of autonomy and tool use, requested at the vendor due-diligence gate and filed with the agent registry entry',
    layerN: [3, 5],
    anchor: GPAI_ANCHOR,
    scope: 'Signatory providers of GPAI models with systemic risk (deployers request the evidence)',
    appliesStatus: 'voluntary',
    appliesNote: 'Voluntary; published 2025-07-10',
    reviewed: REVIEWED_V050,
  },

  // Data protection and other EU law: the GDPR
  {
    id: 'AIGE-OBL-GDPR-ART5-1B',
    frameworkId: 'gdpr',
    framework: 'GDPR',
    clause: 'Art. 5(1)(b) and 6(4)',
    obligation: 'GDPR Art. 5(1)(b) and 6(4) purpose limitation',
    requirement:
      'Personal data are collected for specified, explicit and legitimate purposes and not further processed incompatibly; Art. 6(4) sets the compatibility test for reuse, such as training on data collected for another purpose',
    artefact:
      'Purpose tags on datasets; purpose-match policy in training and indexing pipelines; compatibility assessment record',
    layerN: [1, 2],
    anchor: GDPR_ANCHOR,
    scope: 'Controller',
    authority: 'National data protection authority',
    appliesFrom: '2018-05-25',
    appliesStatus: 'in-force',
    appliesNote: 'In force; applies from 2018-05-25',
    reviewed: REVIEWED_V050,
  },
  {
    id: 'AIGE-OBL-GDPR-ART6',
    frameworkId: 'gdpr',
    framework: 'GDPR',
    clause: 'Art. 6',
    obligation: 'GDPR Art. 6 lawful basis per processing moment',
    requirement:
      'A lawful basis for each processing operation, assessed separately for training, fine-tuning, retrieval and inference',
    artefact:
      'Basis registry per dataset and stage; versioned legitimate-interest assessment',
    layerN: [2],
    anchor: GDPR_ANCHOR,
    scope: 'Controller',
    authority: 'National data protection authority',
    appliesFrom: '2018-05-25',
    appliesStatus: 'in-force',
    appliesNote: 'In force; applies from 2018-05-25',
    reviewed: REVIEWED_V050,
  },
  {
    id: 'AIGE-OBL-GDPR-ART7',
    frameworkId: 'gdpr',
    framework: 'GDPR',
    clause: 'Art. 7',
    obligation: 'GDPR Art. 7 conditions for consent and its withdrawal',
    requirement:
      'Where consent is the basis, the controller can demonstrate it, and withdrawing consent is as easy as giving it',
    artefact:
      'Consent-purpose log joined to datasets and model versions; withdrawal propagated to the pipelines',
    layerN: [2, 5],
    anchor: GDPR_ANCHOR,
    scope: 'Controller',
    authority: 'National data protection authority',
    appliesFrom: '2018-05-25',
    appliesStatus: 'in-force',
    appliesNote: 'In force; applies from 2018-05-25',
    reviewed: REVIEWED_V050,
  },
  {
    id: 'AIGE-OBL-GDPR-ART9',
    frameworkId: 'gdpr',
    framework: 'GDPR',
    clause: 'Art. 9',
    obligation: 'GDPR Art. 9 special categories, incl. inferred sensitive data',
    requirement:
      'Processing special-category data, incl. biometric data for unique identification, is prohibited unless an Art. 9(2) condition applies, which reaches sensitive data a model infers',
    artefact:
      'Proxy test in CI; inference policy with a runtime output classifier; Art. 9(2) condition record',
    layerN: [1, 3, 4],
    anchor: GDPR_ANCHOR,
    scope: 'Controller',
    authority: 'National data protection authority',
    appliesFrom: '2018-05-25',
    appliesStatus: 'in-force',
    appliesNote: 'In force; applies from 2018-05-25',
    reviewed: REVIEWED_V050,
  },
  {
    id: 'AIGE-OBL-GDPR-ART13-14',
    frameworkId: 'gdpr',
    framework: 'GDPR',
    clause: 'Arts. 13–14',
    obligation: 'GDPR Arts. 13–14 transparency to data subjects',
    requirement:
      'Inform data subjects of purposes, bases, recipients and retention and, for automated decision-making, give meaningful information about the logic involved (Arts. 13(2)(f), 14(2)(g))',
    artefact:
      'Notice generated from the registry entry; model card; automated-decision notice per system',
    layerN: [2],
    anchor: GDPR_ANCHOR,
    scope: 'Controller',
    authority: 'National data protection authority',
    appliesFrom: '2018-05-25',
    appliesStatus: 'in-force',
    appliesNote: 'In force; applies from 2018-05-25',
    reviewed: REVIEWED_V050,
  },
  {
    id: 'AIGE-OBL-GDPR-ART15-1H',
    frameworkId: 'gdpr',
    framework: 'GDPR',
    clause: 'Art. 15(1)(h)',
    obligation: 'GDPR Art. 15(1)(h) access to meaningful information about the logic involved',
    requirement:
      'On request, confirm automated decision-making and give meaningful information about the logic involved and its significance and envisaged consequences',
    artefact:
      'Per-request explanation generated from the decision record; system-level automated-decision notice',
    layerN: [4, 5],
    anchor: GDPR_ANCHOR,
    scope: 'Controller',
    authority: 'National data protection authority',
    appliesFrom: '2018-05-25',
    appliesStatus: 'in-force',
    appliesNote: 'In force; applies from 2018-05-25',
    reviewed: REVIEWED_V050,
  },
  {
    id: 'AIGE-OBL-GDPR-ART15-17-21',
    frameworkId: 'gdpr',
    framework: 'GDPR',
    clause: 'Arts. 15–17 and 21',
    obligation: 'GDPR Arts. 15–17 and 21 data subject rights against trained models',
    requirement:
      'Access, rectification, erasure and objection requests reach every place the data lives: corpus, snapshots, retrieval index, logs and, where it holds personal data, the model',
    artefact:
      'Request workflow across corpus, snapshots, retrieval index, logs and weights; fulfilment record',
    layerN: [4, 5],
    anchor: GDPR_ANCHOR,
    scope: 'Controller',
    authority: 'National data protection authority',
    appliesFrom: '2018-05-25',
    appliesStatus: 'in-force',
    appliesNote: 'In force; applies from 2018-05-25',
    reviewed: REVIEWED_V050,
  },
  {
    id: 'AIGE-OBL-GDPR-ART22',
    frameworkId: 'gdpr',
    framework: 'GDPR',
    clause: 'Art. 22',
    obligation: 'GDPR Art. 22 solely automated decisions and their safeguards',
    requirement:
      'A right not to be subject to a decision based solely on automated processing with legal or similarly significant effects, except on contract, law or explicit consent; then human intervention, the right to express a view and to contest (Art. 22(3))',
    artefact:
      'Decision record with reason codes; contest channel and human review log; appeal outcomes by group',
    layerN: [4, 5],
    anchor: GDPR_ANCHOR,
    scope: 'Controller',
    authority: 'National data protection authority',
    appliesFrom: '2018-05-25',
    appliesStatus: 'in-force',
    appliesNote: 'In force; applies from 2018-05-25',
    reviewed: REVIEWED_V050,
  },
  {
    id: 'AIGE-OBL-GDPR-ART25',
    frameworkId: 'gdpr',
    framework: 'GDPR',
    clause: 'Art. 5(1)(c) and 25',
    obligation:
      'GDPR Art. 5(1)(c) and 25 minimisation and data protection by design and by default',
    requirement:
      'Adequate, relevant and limited data, with technical and organisational measures built in at design and set by default',
    artefact:
      'Feature justification record; PII and special-category filters; retention as code',
    layerN: [1, 3],
    anchor: GDPR_ANCHOR,
    scope: 'Controller',
    authority: 'National data protection authority',
    appliesFrom: '2018-05-25',
    appliesStatus: 'in-force',
    appliesNote: 'In force; applies from 2018-05-25',
    reviewed: REVIEWED_V050,
  },
  {
    id: 'AIGE-OBL-GDPR-ART5-2',
    frameworkId: 'gdpr',
    framework: 'GDPR',
    clause: 'Art. 5(2)',
    obligation: 'GDPR Art. 5(2) accountability for a model anonymity claim',
    requirement:
      'A controller that claims a trained model holds no personal data must be able to demonstrate it; the EDPB sets an anonymity test and the evidence it expects',
    artefact:
      'Anonymity evidence pack; membership-inference and extraction evals in the eval gate',
    layerN: [3, 5],
    anchor: GDPR_ANCHOR,
    scope: 'Controller (model developer)',
    authority: 'National data protection authority',
    appliesFrom: '2018-05-25',
    appliesStatus: 'in-force',
    appliesNote: 'In force; applies from 2018-05-25',
    reviewed: REVIEWED_V050,
  },
  {
    id: 'AIGE-OBL-GDPR-ART28',
    frameworkId: 'gdpr',
    framework: 'GDPR',
    clause: 'Art. 28',
    obligation: 'GDPR Art. 28 processors, incl. AI vendors',
    requirement:
      'Use only processors with sufficient guarantees, under a contract that fixes instructions, sub-processors, security, assistance and deletion',
    artefact:
      'AI vendor clause checklist in the due-diligence gate (no training, retention, region, sub-processors, change notice)',
    layerN: [2, 5],
    anchor: GDPR_ANCHOR,
    scope: 'Controller; processor',
    authority: 'National data protection authority',
    appliesFrom: '2018-05-25',
    appliesStatus: 'in-force',
    appliesNote: 'In force; applies from 2018-05-25',
    reviewed: REVIEWED_V050,
  },
  {
    id: 'AIGE-OBL-GDPR-ART30',
    frameworkId: 'gdpr',
    framework: 'GDPR',
    clause: 'Art. 30',
    obligation: 'GDPR Art. 30 records of processing activities',
    requirement:
      'Controllers and processors keep a record of the processing activities under their responsibility',
    artefact:
      'Records generated per processing moment from the registry and data cards',
    layerN: [2, 5],
    anchor: GDPR_ANCHOR,
    scope: 'Controller; processor',
    authority: 'National data protection authority',
    appliesFrom: '2018-05-25',
    appliesStatus: 'in-force',
    appliesNote: 'In force; applies from 2018-05-25',
    reviewed: REVIEWED_V050,
  },
  {
    id: 'AIGE-OBL-GDPR-ART33-34',
    frameworkId: 'gdpr',
    framework: 'GDPR',
    clause: 'Arts. 33–34',
    obligation: 'GDPR Arts. 33–34 personal data breach notification',
    requirement:
      'Notify the supervisory authority without undue delay and, where feasible, within 72 hours of awareness; tell data subjects without undue delay when the breach is likely to result in a high risk',
    artefact:
      'Personal-data-breach branch of the incident pipeline with its own 72-hour timer; data-subject notice template',
    layerN: [4, 5],
    anchor: GDPR_ANCHOR,
    scope: 'Controller (the processor notifies the controller)',
    authority: 'National data protection authority',
    appliesFrom: '2018-05-25',
    appliesStatus: 'in-force',
    appliesNote: 'In force; applies from 2018-05-25',
    reviewed: REVIEWED_V050,
  },
  {
    id: 'AIGE-OBL-GDPR-ART35-36',
    frameworkId: 'gdpr',
    framework: 'GDPR',
    clause: 'Arts. 35–36',
    obligation: 'GDPR Arts. 35–36 DPIA and prior consultation',
    requirement:
      'Assess the impact before processing likely to result in a high risk, and consult the supervisory authority where the residual risk stays high',
    artefact:
      'AI DPIA template with AI-specific fields, cross-referenced by the FRIA; recorded decision when no DPIA is needed',
    layerN: [1, 2],
    anchor: GDPR_ANCHOR,
    scope: 'Controller',
    authority: 'National data protection authority',
    appliesFrom: '2018-05-25',
    appliesStatus: 'in-force',
    appliesNote: 'In force; applies from 2018-05-25',
    patterns: ['pattern-fria-as-code'],
    reviewed: REVIEWED_V050,
  },
  {
    id: 'AIGE-OBL-GDPR-ART44-49',
    frameworkId: 'gdpr',
    framework: 'GDPR',
    clause: 'Arts. 44–49',
    obligation: 'GDPR Arts. 44–49 international transfers, incl. remote inference',
    requirement:
      'Transfers outside the EEA only on an adequacy decision, appropriate safeguards (such as standard contractual clauses or binding corporate rules) or a narrow derogation; sending personal data to a model hosted outside the EEA can be a transfer',
    artefact:
      'Transfer register; residency and routing policy as code; transfer impact assessment',
    layerN: [1, 4, 5],
    anchor: GDPR_ANCHOR,
    scope: 'Controller; processor',
    authority: 'National data protection authority',
    appliesFrom: '2018-05-25',
    appliesStatus: 'in-force',
    appliesNote: 'In force; applies from 2018-05-25',
    reviewed: REVIEWED_V050,
  },

  // Cyber-security and incident-reporting law (NIS2, DORA, CRA)
  {
    id: 'AIGE-OBL-NIS2-ART21-2',
    frameworkId: 'eu-nis2',
    framework: 'NIS2',
    clause: 'Art. 21(2)(c)–(d)',
    obligation: 'NIS2 Art. 21(2)(c)–(d) business continuity and supply-chain security',
    requirement:
      'Risk-management measures include business continuity (backup, disaster recovery, crisis management) and supply-chain security with direct suppliers and service providers, which covers AI and model services',
    artefact:
      'Continuity plan for AI dependencies with tested fallbacks; supplier assessments for model and platform providers',
    layerN: [4, 5],
    anchor: EU_CYBER_ANCHOR,
    scope: 'Essential and important entities',
    authority: 'National competent authority (NIS2)',
    appliesFrom: '2024-10-18',
    appliesStatus: 'in-force',
    appliesNote: 'Member States apply their measures from 2024-10-18; binds through national law',
    reviewed: REVIEWED_V050,
  },
  {
    id: 'AIGE-OBL-NIS2-ART23',
    frameworkId: 'eu-nis2',
    framework: 'NIS2',
    clause: 'Art. 23',
    obligation: 'NIS2 Art. 23 significant-incident reporting',
    requirement:
      'An early warning within 24 hours of becoming aware of a significant incident, an incident notification within 72 hours and a final report within one month of the notification, incl. the root cause',
    artefact:
      'Per-regime clock on the incident record; significance determination with an owner; cause coding reused in the final report',
    layerN: [5],
    anchor: EU_CYBER_ANCHOR,
    scope: 'Essential and important entities',
    authority: 'CSIRT or competent authority',
    appliesFrom: '2024-10-18',
    appliesStatus: 'in-force',
    appliesNote: 'Member States apply their measures from 2024-10-18; binds through national law',
    reviewed: REVIEWED_V050,
  },
  {
    id: 'AIGE-OBL-DORA-ART19',
    frameworkId: 'eu-dora',
    framework: 'DORA',
    clause: 'Art. 19',
    obligation: 'DORA Art. 19 major ICT-related incident reporting',
    requirement:
      'Report major ICT-related incidents: initial notification within 4 hours of classification as major and no later than 24 hours from awareness, intermediate report within 72 hours of the initial notification, final report within one month of the latest intermediate report',
    artefact:
      'Classification record with a timestamp; per-regime clock; consistent cause coding for recurring-incident aggregation',
    layerN: [5],
    anchor: EU_CYBER_ANCHOR,
    scope: 'Financial entities',
    authority: 'Financial competent authority',
    appliesFrom: '2025-01-17',
    appliesStatus: 'in-force',
    appliesNote: 'Applies from 2025-01-17; time limits in Delegated Regulation (EU) 2025/301',
    reviewed: REVIEWED_V050,
  },
  {
    id: 'AIGE-OBL-DORA-ART28',
    frameworkId: 'eu-dora',
    framework: 'DORA',
    clause: 'Art. 28(3) and 28(8)',
    obligation:
      'DORA Art. 28(3) and 28(8) register of ICT third-party arrangements and exit strategies',
    requirement:
      'Keep a register of information on all contractual arrangements for ICT services from third-party providers, and exit strategies for ICT services that support critical or important functions',
    artefact:
      'Register entries for AI and model services; exit plan and exit-drill record',
    layerN: [2, 5],
    anchor: EU_CYBER_ANCHOR,
    scope: 'Financial entities',
    authority: 'Financial competent authority',
    appliesFrom: '2025-01-17',
    appliesStatus: 'in-force',
    appliesNote: 'Applies from 2025-01-17',
    reviewed: REVIEWED_V050,
  },
  {
    id: 'AIGE-OBL-CRA-ART14',
    frameworkId: 'eu-cra',
    framework: 'Cyber Resilience Act',
    clause: 'Art. 14',
    obligation:
      'Cyber Resilience Act Art. 14 reporting of actively exploited vulnerabilities and severe incidents',
    requirement:
      'Notify actively exploited vulnerabilities and severe incidents through the single reporting platform: early warning within 24 hours, notification within 72 hours, final report 14 days after a fix is available (vulnerability) or one month after the notification (incident)',
    artefact:
      'Vulnerability and incident clocks on the incident record; submission through the single reporting platform',
    layerN: [4, 5],
    anchor: EU_CYBER_ANCHOR,
    scope: 'Manufacturers of products with digital elements',
    authority: 'Coordinating CSIRT and ENISA',
    appliesFrom: '2026-09-11',
    appliesStatus: 'in-force',
    appliesNote: 'Art. 14 applies from 2026-09-11; the rest of the Regulation from 2027-12-11',
    milestones: [
      { date: '2027-12-11', note: 'The rest of the Regulation applies' },
    ],
    reviewed: REVIEWED_V050,
  },

  // Liability, copyright, consumer and sector law
  {
    id: 'AIGE-OBL-PLD-ART4',
    frameworkId: 'eu-pld',
    framework: 'EU Product Liability Directive',
    clause: 'Art. 4(1)',
    obligation: 'EU Product Liability Directive Art. 4(1) software, incl. AI systems, as a product',
    requirement:
      'Software is a product, so the manufacturer of an AI system is strictly liable for damage caused by a defect in a product placed on the market or put into service after 2026-12-09',
    artefact:
      'Defect-liability review at design; contractual recourse; residual risk in the register',
    layerN: [1, 5],
    anchor: EU_LAW_ANCHOR,
    scope: 'Manufacturers and other economic operators',
    authority: 'National courts',
    appliesFrom: '2026-12-09',
    appliesStatus: 'applies-later',
    appliesNote:
      'Products placed on the market or put into service after 2026-12-09 (Art. 2(1)); transposition by 2026-12-09',
    reviewed: REVIEWED_V050,
  },
  {
    id: 'AIGE-OBL-PLD-ART9-10',
    frameworkId: 'eu-pld',
    framework: 'EU Product Liability Directive',
    clause: 'Arts. 9–10',
    obligation:
      'EU Product Liability Directive Arts. 9–10 disclosure of evidence and presumption of defect',
    requirement:
      'A court can order the defendant to disclose relevant evidence at its disposal; failing to disclose it is one of the conditions under which the product is presumed defective',
    artefact:
      'Defence file per release: AIBOM with hashes, eval history, failure-mode analysis, signed logs, instructions for use, kept for the liability period',
    layerN: [2, 3, 5],
    anchor: EU_LAW_ANCHOR,
    scope: 'Manufacturers, incl. providers of AI systems and substantial modifiers',
    authority: 'National courts',
    appliesFrom: '2026-12-09',
    appliesStatus: 'applies-later',
    appliesNote: 'Products placed on the market or put into service after 2026-12-09',
    reviewed: REVIEWED_V050,
  },
  {
    id: 'AIGE-OBL-PLD-ART11-2',
    frameworkId: 'eu-pld',
    framework: 'EU Product Liability Directive',
    clause: 'Art. 11(2)',
    obligation:
      "EU Product Liability Directive Art. 11(2) no later-defect defence for software updates within the manufacturer's control",
    requirement:
      'The manufacturer cannot rely on the defect arising after placing on the market where it is due to software, incl. its updates or upgrades, or to missing safety updates, that remain within its control',
    artefact:
      'Change log; regression evals per release; patch decision records; versioned warnings',
    layerN: [3, 4, 5],
    anchor: EU_LAW_ANCHOR,
    scope: 'Manufacturers',
    authority: 'National courts',
    appliesFrom: '2026-12-09',
    appliesStatus: 'applies-later',
    appliesNote: 'Products placed on the market or put into service after 2026-12-09',
    reviewed: REVIEWED_V050,
  },
  {
    id: 'AIGE-OBL-DSM-ART4-3',
    frameworkId: 'eu-dsm',
    framework: 'DSM Directive',
    clause: 'Art. 4(3)',
    obligation: 'DSM Directive Art. 4(3) text-and-data-mining reservations',
    requirement:
      'The general text-and-data-mining exception applies only where rightholders have not expressly reserved use in an appropriate manner, such as machine-readable means for content made publicly available online',
    artefact:
      'Crawler policy-as-code honouring reservations; training-data rights ledger with the reservation-check result, method and date',
    layerN: [1, 2],
    anchor: EU_LAW_ANCHOR,
    scope: 'Anyone mining works, incl. model developers',
    authority: 'National courts',
    appliesFrom: '2021-06-07',
    appliesStatus: 'in-force',
    appliesNote: 'Transposition deadline 2021-06-07',
    reviewed: REVIEWED_V050,
  },
  {
    id: 'AIGE-OBL-DSA-ART25',
    frameworkId: 'eu-dsa',
    framework: 'Digital Services Act',
    clause: 'Art. 25',
    obligation: 'Digital Services Act Art. 25 no deceptive or manipulative interface design',
    requirement:
      'Online platforms do not design, organise or operate their interfaces in a way that deceives or manipulates users or impairs their free and informed decisions',
    artefact:
      'Interface review record; red-team eval for manipulative outputs',
    layerN: [3, 5],
    anchor: EU_LAW_ANCHOR,
    scope: 'Providers of online platforms',
    authority: 'Digital Services Coordinator; the Commission for very large platforms',
    appliesFrom: '2024-02-17',
    appliesStatus: 'in-force',
    appliesNote: 'Applies from 2024-02-17',
    reviewed: REVIEWED_V050,
  },
  {
    id: 'AIGE-OBL-DSA-ART27',
    frameworkId: 'eu-dsa',
    framework: 'Digital Services Act',
    clause: 'Art. 27',
    obligation: 'Digital Services Act Art. 27 recommender system transparency',
    requirement:
      'Online platforms set out in their terms the main parameters of their recommender systems and any options users have to modify them',
    artefact:
      'Recommender parameter card generated from the ranking configuration; log of the options offered to users',
    layerN: [2, 4],
    anchor: EU_LAW_ANCHOR,
    scope: 'Providers of online platforms',
    authority: 'Digital Services Coordinator; the Commission for very large platforms',
    appliesFrom: '2024-02-17',
    appliesStatus: 'in-force',
    appliesNote: 'Applies from 2024-02-17',
    reviewed: REVIEWED_V050,
  },
  {
    id: 'AIGE-OBL-UCPD-ART5-7',
    frameworkId: 'eu-ucpd',
    framework: 'UCPD',
    clause: 'Arts. 5–7 and Annex I',
    obligation: 'UCPD Arts. 5–7 unfair and misleading commercial practices, incl. fake reviews',
    requirement:
      "No commercial practice contrary to professional diligence, or misleading, that distorts the average consumer's decisions, incl. AI-generated claims and chatbot answers; stating that reviews are genuine without reasonable checks, and false reviews, are blacklisted (Annex I points 23b and 23c)",
    artefact:
      'Claims register linked to eval results; review-provenance checks; chatbot answer evals on product claims',
    layerN: [1, 3, 4],
    anchor: EU_LAW_ANCHOR,
    scope: 'Traders dealing with consumers',
    authority: 'National consumer-protection authorities',
    appliesFrom: '2007-12-12',
    appliesStatus: 'in-force',
    appliesNote: 'Applies from 2007-12-12; review points added by Directive (EU) 2019/2161',
    reviewed: REVIEWED_V050,
  },
  {
    id: 'AIGE-OBL-PWD-ART7-11',
    frameworkId: 'eu-platform-work',
    framework: 'Platform Work Directive',
    clause: 'Arts. 7 and 9–11',
    obligation:
      'Platform Work Directive Arts. 7 and 9–11 automated monitoring and decision-making systems',
    requirement:
      'Limits on the personal data platforms may process through automated systems, transparency about those systems, human oversight with an impact evaluation at least every two years, and explanation and human review of decisions',
    artefact:
      'Registry of automated systems with their main parameters; data-category deny list; two-yearly impact evaluation; explanation and human review log',
    layerN: [1, 2, 3, 5],
    anchor: EU_LAW_ANCHOR,
    scope: 'Digital labour platforms',
    authority: 'National labour and data protection authorities',
    appliesFrom: '2026-12-02',
    appliesStatus: 'applies-later',
    appliesNote: 'Transposition by 2026-12-02 (Art. 29)',
    reviewed: REVIEWED_V050,
  },
  {
    id: 'AIGE-OBL-CCD2-ART18-8',
    frameworkId: 'eu-ccd2',
    framework: 'Consumer Credit Directive',
    clause: 'Art. 18(8)',
    obligation:
      'Consumer Credit Directive Art. 18(8) human intervention in automated creditworthiness assessment',
    requirement:
      'Where the creditworthiness assessment involves automated processing, the consumer may request human intervention, a clear explanation of the assessment and its logic, and a review of the decision',
    artefact:
      'Explanation artefact per model version; review path and log',
    layerN: [3, 4, 5],
    anchor: EU_LAW_ANCHOR,
    scope: 'Creditors',
    authority: 'National competent authorities',
    appliesFrom: '2026-11-20',
    appliesStatus: 'applies-later',
    appliesNote: 'Member States apply their measures from 2026-11-20 (Art. 48)',
    reviewed: REVIEWED_V050,
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
  {
    id: 'AIGE-OBL-ISO42005-IA',
    frameworkId: 'iso-42005',
    framework: 'ISO/IEC 42005',
    clause: 'ISO/IEC 42005:2025',
    obligation: 'ISO/IEC 42005:2025 guidance for AI system impact assessment',
    requirement:
      'Guidance for assessing the impacts of an AI system on individuals, groups and society across its life cycle (companion to Art. 27 and Annex A.5)',
    artefact:
      'Impact assessment as code from a template; FRIA and DPIA cross-references; re-assessment triggers',
    layerN: [1, 3],
    anchor: ISO_ANCHOR,
    appliesStatus: 'voluntary',
    appliesNote: 'Voluntary guidance (2025)',
    patterns: ['pattern-model-card-as-control-evidence', 'pattern-fria-as-code'],
    reviewed: REVIEWED_V050,
  },
  {
    id: 'AIGE-OBL-ISO22989-CONCEPTS',
    frameworkId: 'iso-22989',
    framework: 'ISO/IEC 22989',
    clause: 'ISO/IEC 22989:2022',
    obligation: 'ISO/IEC 22989:2022 AI concepts, terminology and stakeholder roles',
    requirement:
      'A shared vocabulary for AI concepts, the AI system life cycle and AI stakeholder roles',
    artefact:
      "Registry field names and role vocabulary aligned to the standard's terms; glossary cross-references",
    layerN: [2],
    anchor: ISO_ANCHOR,
    appliesStatus: 'voluntary',
    appliesNote: 'Voluntary standard (2022)',
    reviewed: REVIEWED_V050,
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
  {
    id: 'AIGE-OBL-NIST-AI600-1',
    frameworkId: 'nist-ai-600-1',
    framework: 'NIST AI RMF',
    clause: 'AI 600-1',
    obligation: 'NIST AI 600-1 Generative AI Profile',
    requirement:
      'Suggested actions for 12 risks that generative AI creates or exacerbates, coded to the Govern, Map, Measure and Manage functions',
    artefact:
      "Generative-AI eval suites named after the profile's action ids (e.g. confabulation, information integrity); a risk-register entry per profile risk",
    layerN: [1, 3],
    anchor: NIST_NEWER_ANCHOR,
    appliesStatus: 'voluntary',
    appliesNote: 'Voluntary; published 2024-07-26',
    reviewed: REVIEWED_V050,
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
      'Assurance and certification programme on the AICM: Level 1 self-assessment, Level 1 Valid-AI-ted (automated validation) and Level 2 (ISO/IEC 42001 certification plus the validated assessment)',
    artefact:
      'Machine-readable evidence submission; continuous assurance telemetry',
    layerN: [5],
    anchor: CSA_ANCHOR,
    appliesStatus: 'voluntary',
    appliesNote: 'Voluntary assurance and certification programme',
    reviewed: REVIEWED_V050,
  },
  {
    id: 'AIGE-OBL-CSA-AICM-AGENTIC',
    frameworkId: 'csa-aicm',
    framework: 'CSA AICM / STAR for AI',
    clause: 'Agent controls (AICM v1.1, ATF, AARM)',
    obligation:
      'AICM agent controls with the CSA Agentic Trust Framework and AARM specification',
    requirement:
      'Agent-specific AICM controls (e.g. IAM-18 Agent Access Restriction, AIS-11 Agents Security Boundaries), with the Agentic Trust Framework v1 (earned autonomy tiers) and the AARM runtime-interception specification',
    artefact:
      'Agent-specific control definitions; policy-as-code for agent scope and tools; runtime guardrails',
    layerN: [1, 4],
    anchor: CSA_ANCHOR,
    appliesStatus: 'voluntary',
    appliesNote:
      'Voluntary; AICM v1.1 published 2026-06-22, Agentic Trust Framework v1 in February 2026; the "Agentic Control Supplement" of earlier editions could not be matched to a CSA primary document as of 2026-09-24 (verify)',
    reviewed: REVIEWED_V050,
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
    anchor: US_FRONTIER_ANCHOR,
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
    anchor: US_FRONTIER_ANCHOR,
    scope:
      'Large frontier developers (frontier models trained with over 10^26 operations, cost over USD 100M)',
    appliesFrom: '2027-01-01',
    appliesStatus: 'applies-later',
    appliesNote: 'Signed 2025-12-19; effective 2027-01-01',
    reviewed: REVIEWED_DEBT_PASS,
  },
  {
    id: 'AIGE-OBL-USCA-SB53-WHISTLE',
    frameworkId: 'ca-sb-53',
    framework: 'US frontier-developer laws',
    clause: 'SB 53 (Labor Code 1107–1107.2)',
    obligation: 'California SB 53 whistleblower protections for covered employees',
    requirement:
      'No rule, policy or contract that prevents covered employees from disclosing catastrophic-risk concerns, and no retaliation; notice of rights; large frontier developers run an anonymous internal process with monthly updates to the reporter, shared with officers and directors at least quarterly',
    artefact:
      'Anonymous internal reporting channel with status updates; notice acknowledgment records; quarterly summary to officers and directors',
    layerN: [1, 5],
    anchor: US_FRONTIER_ANCHOR,
    scope: 'Frontier developers; the anonymous process binds large frontier developers',
    appliesFrom: '2026-01-01',
    appliesStatus: 'in-force',
    appliesNote: 'In force 2026-01-01',
    reviewed: REVIEWED_V050,
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
    anchor: US_STATE_ANCHOR,
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
    clause: 'SB 26-189 (replacing SB 24-205)',
    obligation:
      'Colorado SB 26-189 automated decision-making technology (replaces the Colorado AI Act, SB 24-205; effective 2027-01-01)',
    requirement:
      'Developer documentation to deployers and notice of material updates; deployer notice of ADMT use; a plain-language explanation within 30 days of an adverse outcome; correction, human review and reconsideration; records kept at least three years. SB 26-189 (signed 2026-05-14) repealed and re-enacted SB 24-205, whose duty of care against algorithmic discrimination had been delayed to 2026-06-30 and whose enforcement a federal court had blocked',
    artefact:
      'ADMT inventory; developer documentation pack; notice and adverse-outcome explanation templates; human-review queue; three-year record store',
    layerN: [2, 4, 5],
    anchor: US_STATE_ANCHOR,
    scope: 'Developers and deployers of ADMT in consequential decisions',
    authority: 'Attorney General (Consumer Protection Act)',
    appliesFrom: '2027-01-01',
    appliesStatus: 'applies-later',
    appliesNote:
      'SB 26-189 signed 2026-05-14, effective 2027-01-01; it replaces SB 24-205',
    reviewed: REVIEWED_V050,
  },
  {
    id: 'AIGE-OBL-USCA-AB2013',
    frameworkId: 'ca-ab-2013',
    framework: 'US state AI laws',
    clause: 'AB 2013',
    obligation: 'California AB 2013 training-data transparency for generative AI',
    requirement:
      'Developers post a summary of the datasets used to train a generative AI system made available to Californians (sources, size, data types, IP and personal information, synthetic data) on or before 2026-01-01 and on each substantial modification',
    artefact:
      'Data card per dataset, published at release; training-data rights ledger',
    layerN: [2],
    anchor: US_STATE_ANCHOR,
    scope: 'Developers of generative AI systems released since 2022-01-01',
    appliesFrom: '2026-01-01',
    appliesStatus: 'in-force',
    appliesNote: 'Documentation due on or before 2026-01-01 and on each substantial modification',
    reviewed: REVIEWED_V050,
  },
  {
    id: 'AIGE-OBL-USCA-SB942',
    frameworkId: 'ca-sb-942',
    framework: 'US state AI laws',
    clause: 'SB 942 as amended by AB 853',
    obligation: 'California AI Transparency Act (SB 942 as amended by AB 853)',
    requirement:
      'Covered providers offer a free AI-detection tool and embed latent disclosures, with an optional manifest disclosure, in generated image, video and audio; large online platforms and capture devices follow later',
    artefact:
      'Provenance pipeline writing latent metadata; public detection endpoint; platform-side provenance display',
    layerN: [3, 4],
    anchor: US_STATE_ANCHOR,
    scope:
      'Covered providers of public generative AI systems; large online platforms; capture-device makers',
    appliesFrom: '2026-08-02',
    appliesStatus: 'in-force',
    appliesNote: 'Operative 2026-08-02; platform duties 2027-01-01; capture devices 2028-01-01',
    milestones: [
      { date: '2027-01-01', note: 'Large online platform duties apply' },
      { date: '2028-01-01', note: 'Capture-device duties apply' },
    ],
    reviewed: REVIEWED_V050,
  },
  {
    id: 'AIGE-OBL-USCA-SB243',
    frameworkId: 'ca-sb-243',
    framework: 'US state AI laws',
    clause: 'SB 243',
    obligation: 'California SB 243 companion chatbots',
    requirement:
      'Disclose AI where a reasonable person could be misled; for known minors, remind at least every three hours and prevent sexually explicit content; run a suicide and self-harm protocol with crisis referral; annual reports from 2027-07-01',
    artefact:
      'Companion-mode policy; reminder timer; crisis-referral classifier and log; annual report',
    layerN: [1, 4, 5],
    anchor: US_STATE_ANCHOR,
    scope: 'Operators of companion chatbots',
    authority: 'Private right of action',
    appliesFrom: '2026-01-01',
    appliesStatus: 'in-force',
    appliesNote:
      'Chaptered 2025-10-13; in force 2026-01-01 as a non-urgency statute (verify); annual reports from 2027-07-01',
    milestones: [
      { date: '2027-07-01', note: 'Annual reports to the Office of Suicide Prevention begin' },
    ],
    reviewed: REVIEWED_V050,
  },
  {
    id: 'AIGE-OBL-USNY-GBL47',
    frameworkId: 'ny-gbl-47',
    framework: 'US state AI laws',
    clause: 'GBL Art. 47 (§§ 1700–1704)',
    obligation: 'New York GBL Article 47 AI companion models',
    requirement:
      'Detect suicidal ideation and self-harm and refer users to crisis services; tell users they are not talking to a human at the start and at least every three hours',
    artefact:
      'Crisis-referral classifier and log; notice timer',
    layerN: [4, 5],
    anchor: US_STATE_ANCHOR,
    scope: 'Operators of AI companions',
    authority: 'Attorney General (civil penalties up to USD 15,000 per day)',
    appliesFrom: '2025-11-05',
    appliesStatus: 'in-force',
    appliesNote: 'In force 2025-11-05, as reported (verify)',
    reviewed: REVIEWED_V050,
  },
  {
    id: 'AIGE-OBL-USIL-HB3773',
    frameworkId: 'il-hb-3773',
    framework: 'US state AI laws',
    clause: 'HB 3773',
    obligation: 'Illinois HB 3773 AI in employment decisions',
    requirement:
      'Employers may not use AI with a discriminatory effect on protected classes in recruitment, hiring, promotion, discipline or other terms of employment, nor ZIP codes as a proxy, and must notify employees and applicants',
    artefact:
      'AI-in-HR inventory; adverse-impact eval per protected class; notice record',
    layerN: [2, 3, 4],
    anchor: US_STATE_ANCHOR,
    scope: 'Employers',
    authority: 'Illinois Department of Human Rights',
    appliesFrom: '2026-01-01',
    appliesStatus: 'in-force',
    appliesNote: 'Effective 2026-01-01, as reported; implementing rules in draft',
    reviewed: REVIEWED_V050,
  },
  {
    id: 'AIGE-OBL-USNYC-LL144',
    frameworkId: 'nyc-ll-144',
    framework: 'US state AI laws',
    clause: 'Local Law 144 of 2021',
    obligation: 'NYC Local Law 144 automated employment decision tools',
    requirement:
      'An independent bias audit within one year before use, a published summary of the results, and notice to candidates and employees 10 business days before use',
    artefact:
      'Impact-ratio eval by sex, race/ethnicity and intersectional category; published audit summary; notice record',
    layerN: [3, 5],
    anchor: US_STATE_ANCHOR,
    scope: 'Employers and employment agencies using AEDTs for New York City roles',
    authority: 'Department of Consumer and Worker Protection',
    appliesFrom: '2023-07-05',
    appliesStatus: 'in-force',
    appliesNote: 'Enforced since 2023-07-05',
    reviewed: REVIEWED_V050,
  },
  {
    id: 'AIGE-OBL-USUT-SB226',
    frameworkId: 'ut-ai-disclosure',
    framework: 'US state AI laws',
    clause: 'Utah Code 13-75 (SB 226)',
    obligation: 'Utah AI disclosure duties (SB 226 amendments to the AI Policy Act)',
    requirement:
      'Disclose generative AI when a person clearly and unambiguously asks; regulated occupations disclose it prominently in a high-risk AI interaction; clear disclosure at the outset is a safe harbour',
    artefact:
      'Disclosure component with an interaction-risk flag; conversation log showing the disclosure',
    layerN: [4],
    anchor: US_STATE_ANCHOR,
    scope: 'Suppliers using generative AI in consumer transactions; regulated occupations',
    authority: 'Division of Consumer Protection',
    appliesFrom: '2025-05-07',
    appliesStatus: 'in-force',
    appliesNote:
      'Effective 2025-05-07; the AI Policy Act (Title 13, Chapter 72) is repealed on 2027-07-01',
    milestones: [
      { date: '2027-07-01', note: 'The AI Policy Act (Title 13, Chapter 72) is repealed' },
    ],
    reviewed: REVIEWED_V050,
  },

  // US state privacy and sector laws
  {
    id: 'AIGE-OBL-USCA-CPPA-ADMT',
    frameworkId: 'ca-cppa-regs',
    framework: 'US state privacy and sector laws',
    clause: 'CCPA regulations (ADMT)',
    obligation: 'California CPPA regulations on automated decisionmaking technology',
    requirement:
      'Businesses using ADMT for significant decisions give a pre-use notice, an opt-out or a human appeal, and access to information about the ADMT',
    artefact:
      'ADMT register; pre-use notice; opt-out or appeal workflow; ADMT access response',
    layerN: [2, 4, 5],
    anchor: US_PRIVACY_ANCHOR,
    scope: 'Businesses subject to the CCPA',
    authority: 'California Privacy Protection Agency',
    appliesFrom: '2027-01-01',
    appliesStatus: 'applies-later',
    appliesNote: 'Regulations effective 2026-01-01; ADMT duties from 2027-01-01',
    reviewed: REVIEWED_V050,
  },
  {
    id: 'AIGE-OBL-USCA-CPPA-RA',
    frameworkId: 'ca-cppa-regs',
    framework: 'US state privacy and sector laws',
    clause: 'CCPA regulations (risk assessments)',
    obligation: 'California CPPA regulations on risk assessments',
    requirement:
      'A risk assessment before processing that presents significant risk, incl. using ADMT for significant decisions; attestations and summaries submitted to the Agency',
    artefact:
      'Risk assessment per triggering activity; submission record',
    layerN: [5],
    anchor: US_PRIVACY_ANCHOR,
    scope: 'Businesses subject to the CCPA',
    authority: 'California Privacy Protection Agency',
    appliesFrom: '2026-01-01',
    appliesStatus: 'in-force',
    appliesNote: 'Effective 2026-01-01; attestations and summaries due 2028-04-01',
    milestones: [
      { date: '2028-04-01', note: 'Attestations and summaries due to the Agency' },
    ],
    reviewed: REVIEWED_V050,
  },
  {
    id: 'AIGE-OBL-USVA-CDPA',
    frameworkId: 'va-cdpa',
    framework: 'US state privacy and sector laws',
    clause: '§ 59.1-580',
    obligation: 'Virginia CDPA data protection assessments, incl. risky profiling',
    requirement:
      'Controllers document data protection assessments for targeted advertising, sale, profiling that presents a reasonably foreseeable risk, and sensitive data, for processing created after 2023-01-01, and give them to the Attorney General on request',
    artefact:
      'Assessment template per processing activity; profiling register',
    layerN: [1, 5],
    anchor: US_PRIVACY_ANCHOR,
    scope: 'Controllers',
    authority: 'Attorney General',
    appliesFrom: '2023-01-01',
    appliesStatus: 'in-force',
    appliesNote: 'Processing created after 2023-01-01',
    reviewed: REVIEWED_V050,
  },
  {
    id: 'AIGE-OBL-USCO-CPA',
    frameworkId: 'co-privacy-act',
    framework: 'US state privacy and sector laws',
    clause: 'SB21-190',
    obligation: 'Colorado Privacy Act profiling opt-out and data protection assessments',
    requirement:
      'Consumers may opt out of profiling in furtherance of decisions with legal or similarly significant effects, incl. through a universal opt-out mechanism; controllers run data protection assessments for processing that presents a heightened risk',
    artefact:
      'Opt-out flag honoured at inference; assessment template; intake data-class flags',
    layerN: [1, 2, 4, 5],
    anchor: US_PRIVACY_ANCHOR,
    scope: 'Controllers',
    authority: 'Attorney General and district attorneys',
    appliesFrom: '2023-07-01',
    appliesStatus: 'in-force',
    appliesNote: 'Effective 2023-07-01',
    reviewed: REVIEWED_V050,
  },
  {
    id: 'AIGE-OBL-USMN-MCDPA',
    frameworkId: 'mn-cdpa',
    framework: 'US state privacy and sector laws',
    clause: '§ 325M.14, subd. 1(g)',
    obligation: 'Minnesota CDPA right to question the result of profiling',
    requirement:
      'A consumer may question the result of profiling, be told the reason, review the personal data used, correct it and have the decision re-evaluated',
    artefact:
      'Reason-and-review workflow with re-evaluation on corrected data',
    layerN: [4, 5],
    anchor: US_PRIVACY_ANCHOR,
    scope: 'Controllers',
    authority: 'Attorney General',
    appliesFrom: '2025-07-31',
    appliesStatus: 'in-force',
    appliesNote: 'Effective 2025-07-31',
    reviewed: REVIEWED_V050,
  },
  {
    id: 'AIGE-OBL-USIL-BIPA',
    frameworkId: 'il-bipa',
    framework: 'US state privacy and sector laws',
    clause: '740 ILCS 14',
    obligation: 'Illinois BIPA consent and retention for biometric identifiers',
    requirement:
      'Informed written consent before collecting biometric identifiers, a retention and destruction schedule, and secure storage; a private right of action with statutory damages',
    artefact:
      'Written-consent capture; retention schedule as code; destruction log',
    layerN: [1, 2],
    anchor: US_PRIVACY_ANCHOR,
    scope: 'Private entities',
    authority: 'Private right of action',
    appliesFrom: '2008-10-03',
    appliesStatus: 'in-force',
    appliesNote: 'Signed 2008-10-03, as reported (verify)',
    reviewed: REVIEWED_V050,
  },
  {
    id: 'AIGE-OBL-USWA-MHMDA',
    frameworkId: 'wa-mhmda',
    framework: 'US state privacy and sector laws',
    clause: 'RCW 19.373',
    obligation: 'Washington My Health My Data Act consent for consumer health data',
    requirement:
      'Consent to collect and separate consent to share consumer health data, incl. data derived or extrapolated by algorithms or machine learning, and a signed authorisation for any sale',
    artefact:
      'Separate consent records for collection and sharing; signed sale authorisation; intake flags for derived health data',
    layerN: [1, 2],
    anchor: US_PRIVACY_ANCHOR,
    scope: 'Regulated entities',
    authority: 'Attorney General (Consumer Protection Act)',
    appliesFrom: '2024-03-31',
    appliesStatus: 'in-force',
    appliesNote: 'From 2024-03-31; small businesses from 2024-06-30',
    reviewed: REVIEWED_V050,
  },
  {
    id: 'AIGE-OBL-USCO-SB21-169',
    frameworkId: 'co-sb21-169',
    framework: 'US state privacy and sector laws',
    clause: 'SB21-169',
    obligation: "Colorado SB21-169 insurers' use of external consumer data and predictive models",
    requirement:
      'Insurers may not unfairly discriminate through external consumer data, algorithms or predictive models; they keep a risk-management framework, test for unfair discrimination and file a chief-risk-officer attestation under rules adopted per line of insurance',
    artefact:
      'Inventory of external data sources and models; disparity testing; chief-risk-officer attestation record',
    layerN: [2, 3, 5],
    anchor: US_PRIVACY_ANCHOR,
    scope: 'Insurers',
    authority: 'Colorado Commissioner of Insurance',
    appliesFrom: '2021-09-07',
    appliesStatus: 'in-force',
    appliesNote:
      'Act effective 2021-09-07; duties bind through rules per line of insurance, none effective before 2023-01-01',
    reviewed: REVIEWED_V050,
  },

  // US federal law that already reaches AI
  {
    id: 'AIGE-OBL-USFED-OMB-M25-21',
    frameworkId: 'us-omb-m-25-21',
    framework: 'US federal law',
    clause: 'M-25-21 §4(b)',
    obligation: 'OMB M-25-21 minimum practices for high-impact AI',
    requirement:
      'Federal agencies apply minimum practices to high-impact AI: pre-deployment testing, an AI impact assessment, ongoing monitoring, operator training, human oversight with a fail-safe where practicable, remedies or appeals, and consultation of end users, documented within 365 days',
    artefact:
      'Use-case inventory entry; pre-deployment test report; AI impact assessment; monitoring plan; appeal path',
    layerN: [2, 3, 4, 5],
    anchor: US_FEDERAL_ANCHOR,
    scope: 'US federal agencies (their AI vendors by contract)',
    authority: 'OMB; agency Chief AI Officers',
    appliesFrom: '2025-04-03',
    appliesStatus: 'in-force',
    appliesNote: 'Issued 2025-04-03; practices documented within 365 days',
    reviewed: REVIEWED_V050,
  },
  {
    id: 'AIGE-OBL-USFED-OMB-M26-04',
    frameworkId: 'us-omb-m-26-04',
    framework: 'US federal law',
    clause: 'M-26-04',
    obligation: 'OMB M-26-04 minimum LLM transparency in federal procurement',
    requirement:
      "Solicitations for large language models request, as a minimum, the vendor's acceptable use policy, model, system or data cards, end-user resources and a feedback mechanism",
    artefact:
      'Acceptable use policy; model, system or data cards; end-user resources; feedback channel',
    layerN: [2, 5],
    anchor: US_FEDERAL_ANCHOR,
    scope: 'US federal agencies and LLM vendors',
    authority: 'OMB',
    appliesFrom: '2025-12-11',
    appliesStatus: 'in-force',
    appliesNote: 'Issued 2025-12-11; agency policies updated by 2026-03-11',
    milestones: [
      { date: '2026-03-11', note: 'Agency procurement policies updated' },
    ],
    reviewed: REVIEWED_V050,
  },
  {
    id: 'AIGE-OBL-USFED-REGB-1002-9',
    frameworkId: 'us-ecoa-reg-b',
    framework: 'US federal law',
    clause: '12 CFR 1002.9',
    obligation: 'ECOA Regulation B adverse-action notice with specific principal reasons',
    requirement:
      'A creditor that takes adverse action gives a statement of specific principal reasons, or the right to one within 30 days; citing internal standards or a failed score is insufficient, whatever model made the decision',
    artefact:
      'Reason-code service versioned with the model; reason-code fidelity eval; notice template',
    layerN: [3, 4, 5],
    anchor: US_FEDERAL_ANCHOR,
    scope: 'Creditors',
    authority: 'CFPB and the prudential regulators',
    appliesFrom: '2011-12-21',
    appliesStatus: 'in-force',
    appliesNote:
      "Long-standing duty; the CFPB's Regulation B text dates from 2011-12-21 (76 FR 79445)",
    reviewed: REVIEWED_V050,
  },
  {
    id: 'AIGE-OBL-USFED-FCRA-1681M',
    frameworkId: 'us-fcra',
    framework: 'US federal law',
    clause: '15 U.S.C. 1681m(a)',
    obligation: 'FCRA adverse-action notice with the credit score used',
    requirement:
      'A user of a consumer report that takes adverse action gives notice, discloses the numerical credit score used and its key factors, names the reporting agency and states the right to a free report and to dispute',
    artefact:
      'Score and key-factor record per adverse decision; notice template',
    layerN: [4],
    anchor: US_FEDERAL_ANCHOR,
    scope: 'Users of consumer reports',
    authority: 'CFPB and FTC',
    appliesFrom: '2011-07-21',
    appliesStatus: 'in-force',
    appliesNote: 'Credit-score disclosure in force since the designated transfer date, 2011-07-21',
    reviewed: REVIEWED_V050,
  },
  {
    id: 'AIGE-OBL-USFED-TITLE7-703K',
    frameworkId: 'us-title-vii-ugesp',
    framework: 'US federal law',
    clause: 'Title VII s. 703(k); 29 CFR 1607.4(D)',
    obligation: 'Title VII disparate impact and the UGESP four-fifths rule',
    requirement:
      "A selection procedure with disparate impact is unlawful unless job-related and consistent with business necessity, and a less discriminatory alternative can still be required; a selection rate under four-fifths of the highest group's rate is generally regarded as evidence of adverse impact",
    artefact:
      'Adverse-impact-ratio eval per group with counts and confidence intervals; job-relatedness validation; alternatives search log',
    layerN: [3, 5],
    anchor: US_FEDERAL_ANCHOR,
    scope: 'Employers',
    authority: 'EEOC; courts',
    appliesFrom: '1978-08-25',
    appliesStatus: 'in-force',
    appliesNote: 'UGESP adopted 1978-08-25 (43 FR 38295); s. 703(k) since 1991-11-21',
    reviewed: REVIEWED_V050,
  },
  {
    id: 'AIGE-OBL-USFED-FTC-S5',
    frameworkId: 'us-ftc-act',
    framework: 'US federal law',
    clause: 'FTC Act s. 5 (15 U.S.C. 45)',
    obligation: 'FTC Act s. 5 substantiation of AI performance claims',
    requirement:
      "Deceptive acts or practices are unlawful: claims about an AI system's accuracy, performance or fairness need competent and reliable evidence before they are made",
    artefact:
      'Claims register linked to current eval runs; substantiation gate on release copy',
    layerN: [1, 3, 5],
    anchor: US_FEDERAL_ANCHOR,
    scope: 'Businesses making AI claims',
    authority: 'Federal Trade Commission',
    appliesFrom: '1938-03-21',
    appliesStatus: 'in-force',
    appliesNote:
      'Deception prong since the Wheeler-Lea Act of 1938-03-21; applied to AI accuracy claims in 2025',
    reviewed: REVIEWED_V050,
  },
  {
    id: 'AIGE-OBL-USFED-TAKEITDOWN',
    frameworkId: 'us-take-it-down',
    framework: 'US federal law',
    clause: 'Pub. L. 119-12, s. 3',
    obligation: 'TAKE IT DOWN Act notice and removal of intimate images, incl. digital forgeries',
    requirement:
      'Covered platforms run a notice-and-removal process and remove reported non-consensual intimate images, incl. AI-generated forgeries, and known identical copies within 48 hours of a valid request',
    artefact:
      'Takedown pipeline with a 48-hour clock, owner and log; matching of identical copies',
    layerN: [4, 5],
    anchor: US_FEDERAL_ANCHOR,
    scope: 'Covered platforms',
    authority: 'Federal Trade Commission',
    appliesFrom: '2026-05-19',
    appliesStatus: 'in-force',
    appliesNote: 'Enacted 2025-05-19; the notice-and-removal process was due by 2026-05-19',
    reviewed: REVIEWED_V050,
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
      'In force 2026-01-22; MSIT announced a guidance period of at least one year that holds back fact-finding and fines except in exceptional cases, while the duties apply',
    reviewed: REVIEWED_V050,
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
    anchor: UK_ANCHOR,
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
  {
    id: 'AIGE-OBL-SG-AGENTIC-IDENTITY',
    frameworkId: 'sg-agentic-framework',
    framework: 'Other jurisdictions',
    clause: 'Agentic AI framework v1.5: identity and authorisations',
    obligation:
      'Singapore IMDA Model AI Governance Framework for Agentic AI: agent identity and scoped authorisations (voluntary)',
    requirement:
      'Each agent has a unique, accounted-for identity, catalogued and centrally managed; authorisations are scoped, time- or session-bound, non-transferable and bounded by the authorising human',
    artefact:
      'Agent registry with a workload identity per agent; delegated, short-lived credentials never broader than the user',
    layerN: [2, 4],
    anchor: OTHER_ANCHOR,
    scope: 'Organisations deploying agents',
    appliesStatus: 'voluntary',
    appliesNote: 'Voluntary; version 1.5 published 2026-05-20',
    reviewed: REVIEWED_V050,
  },
  {
    id: 'AIGE-OBL-SG-AGENTIC-CHECKPOINTS',
    frameworkId: 'sg-agentic-framework',
    framework: 'Other jurisdictions',
    clause: 'Agentic AI framework v1.5: human checkpoints',
    obligation:
      'Singapore IMDA Model AI Governance Framework for Agentic AI: human checkpoints for significant actions (voluntary)',
    requirement:
      'Significant checkpoints for high-stakes, irreversible, outlier and user-defined actions, with approvals that are contextual and digestible and enforced through system-level controls',
    artefact:
      'Checkpoint classes in the tool gateway; approval log; oversight metrics',
    layerN: [4, 5],
    anchor: OTHER_ANCHOR,
    scope: 'Organisations deploying agents',
    appliesStatus: 'voluntary',
    appliesNote: 'Voluntary; version 1.5 published 2026-05-20',
    reviewed: REVIEWED_V050,
  },
  {
    id: 'AIGE-OBL-CAN-DADM',
    frameworkId: 'canada-dadm',
    framework: 'Other jurisdictions',
    clause: 'Directive on Automated Decision-Making',
    obligation: 'Canada Directive on Automated Decision-Making (federal institutions)',
    requirement:
      'Complete, approve and publish an algorithmic impact assessment before production; apply the Appendix C requirements for the impact level (notice, explanation, peer review, human intervention); offer recourse and report on effectiveness',
    artefact:
      'Published AIA rendered from a shared impact fact base; notice and explanation templates; peer-review record; recourse path; re-assessment triggers as code',
    layerN: [1, 2, 5],
    anchor: OTHER_ANCHOR,
    scope: 'Canadian federal institutions',
    authority: 'Treasury Board of Canada Secretariat',
    appliesFrom: '2019-04-01',
    appliesStatus: 'in-force',
    appliesNote:
      'In effect since 2019-04-01; modified 2025-06-24; earlier systems complied by 2026-06-24',
    milestones: [
      { date: '2025-06-24', note: 'Current version of the directive' },
      { date: '2026-06-24', note: 'Systems procured before 2025-06-24 meet the updated requirements' },
    ],
    reviewed: REVIEWED_V050,
  },
  {
    id: 'AIGE-OBL-BR-LGPD-ART20',
    frameworkId: 'br-lgpd',
    framework: 'Other jurisdictions',
    clause: 'LGPD Art. 20',
    obligation: 'Brazil LGPD Art. 20 review of automated decisions',
    requirement:
      'A data subject may request review of decisions taken solely on automated processing that affect their interests, incl. profiling, and the controller gives clear information on the criteria and procedures used',
    artefact:
      'Review workflow; statement of criteria and procedures per system',
    layerN: [4, 5],
    anchor: OTHER_ANCHOR,
    scope: 'Controllers',
    authority: 'ANPD (national data protection authority)',
    appliesFrom: '2020-09-18',
    appliesStatus: 'in-force',
    appliesNote: 'In force 2020-09-18 (verify); administrative sanctions from 2021-08-01',
    milestones: [
      { date: '2021-08-01', note: 'Administrative sanctions (Arts. 52 to 54) apply' },
    ],
    reviewed: REVIEWED_V050,
  },

  // South Korea, article by article
  {
    id: 'AIGE-OBL-KR-ART31-1',
    frameworkId: 'kr-ai-basic-act',
    framework: 'South Korea AI Basic Act',
    clause: 'Art. 31(1)',
    obligation: 'Korea AI Basic Act Art. 31(1) prior notice of high-impact or generative AI',
    requirement:
      'Tell users in advance that a product or service runs on high-impact or generative AI, in the product, the terms, the screen or the place of supply (Decree Art. 23(1)); a missing notice is finable (Art. 43)',
    artefact:
      'Notice component in UI, terms and contracts; notice inventory per user surface',
    layerN: [2, 4],
    anchor: KOREA_ANCHOR,
    scope: 'AI business operators',
    authority: 'MSIT',
    appliesFrom: '2026-01-22',
    appliesStatus: 'grace',
    appliesNote:
      'In force 2026-01-22; MSIT holds back fact-finding and fines for a guidance period of at least one year, while the duty applies',
    reviewed: REVIEWED_V050,
  },
  {
    id: 'AIGE-OBL-KR-ART31-2',
    frameworkId: 'kr-ai-basic-act',
    framework: 'South Korea AI Basic Act',
    clause: 'Art. 31(2)–(3)',
    obligation:
      'Korea AI Basic Act Art. 31(2)–(3) generative-AI output labels and realistic-content notice',
    requirement:
      'Indicate that outputs are AI-generated, and notify or label realistic synthetic sound, images or video so users can recognise them; a machine-readable mark alone needs at least one text or voice notice (Decree Art. 23(2)–(3))',
    artefact:
      'Provenance pipeline: visible label or machine-readable mark plus at least one text or voice notice',
    layerN: [3, 4],
    anchor: KOREA_ANCHOR,
    scope: 'Operators providing generative AI',
    authority: 'MSIT',
    appliesFrom: '2026-01-22',
    appliesStatus: 'grace',
    appliesNote:
      'In force 2026-01-22; MSIT holds back fact-finding and fines for a guidance period of at least one year, while the duty applies',
    reviewed: REVIEWED_V050,
  },
  {
    id: 'AIGE-OBL-KR-ART32',
    frameworkId: 'kr-ai-basic-act',
    framework: 'South Korea AI Basic Act',
    clause: 'Art. 32',
    obligation: 'Korea AI Basic Act Art. 32 safety duties for high-compute systems',
    requirement:
      'Systems with at least 10^26 FLOP of cumulative training compute, built with the most advanced technology and posing broad and serious risk (Decree Art. 24), identify, assess and mitigate risks across the lifecycle and report the results to MSIT',
    artefact:
      'Lifecycle risk register; safety-incident monitoring; results report to MSIT',
    layerN: [3, 4, 5],
    anchor: KOREA_ANCHOR,
    scope: 'Operators of qualifying high-compute systems',
    authority: 'MSIT',
    appliesFrom: '2026-01-22',
    appliesStatus: 'grace',
    appliesNote:
      'In force 2026-01-22; MSIT holds back fact-finding and fines for a guidance period of at least one year, while the duty applies',
    reviewed: REVIEWED_V050,
  },
  {
    id: 'AIGE-OBL-KR-ART33',
    frameworkId: 'kr-ai-basic-act',
    framework: 'South Korea AI Basic Act',
    clause: 'Art. 33',
    obligation: 'Korea AI Basic Act Art. 33 high-impact self-review and confirmation',
    requirement:
      'Review in advance whether a system is high-impact AI and optionally ask MSIT to confirm; MSIT replies within 30 days, extendable once (Decree Art. 25)',
    artefact:
      'Classification decision record per system: Art. 2(4) area, risk rationale, training-data overview, MSIT reply',
    layerN: [1, 2],
    anchor: KOREA_ANCHOR,
    scope: 'AI business operators',
    authority: 'MSIT',
    appliesFrom: '2026-01-22',
    appliesStatus: 'grace',
    appliesNote:
      'In force 2026-01-22; MSIT holds back fact-finding and fines for a guidance period of at least one year, while the duty applies',
    reviewed: REVIEWED_V050,
  },
  {
    id: 'AIGE-OBL-KR-ART34',
    frameworkId: 'kr-ai-basic-act',
    framework: 'South Korea AI Basic Act',
    clause: 'Art. 34',
    obligation: 'Korea AI Basic Act Art. 34 measures for high-impact AI',
    requirement:
      'A risk management plan, an explanation plan, a user-protection plan, human management and supervision, and documents showing the measures; publish the main content and keep the evidence for five years (Decree Art. 27)',
    artefact:
      'Risk management, explanation and user-protection plans; named human overseer; published summary; five-year evidence store',
    layerN: [1, 2, 4, 5],
    anchor: KOREA_ANCHOR,
    scope: 'Operators of high-impact AI',
    authority: 'MSIT',
    appliesFrom: '2026-01-22',
    appliesStatus: 'grace',
    appliesNote:
      'In force 2026-01-22; MSIT holds back fact-finding and fines for a guidance period of at least one year, while the duty applies',
    reviewed: REVIEWED_V050,
  },
  {
    id: 'AIGE-OBL-KR-ART35',
    frameworkId: 'kr-ai-basic-act',
    framework: 'South Korea AI Basic Act',
    clause: 'Art. 35',
    obligation: 'Korea AI Basic Act Art. 35 fundamental-rights impact assessment (best effort)',
    requirement:
      'Endeavour to assess the effect on fundamental rights before providing high-impact AI, covering the seven elements of Decree Art. 28',
    artefact:
      'Impact assessment carrying the seven decree elements',
    layerN: [1, 5],
    anchor: KOREA_ANCHOR,
    scope: 'Operators of high-impact AI',
    authority: 'MSIT',
    appliesFrom: '2026-01-22',
    appliesStatus: 'grace',
    appliesNote:
      'In force 2026-01-22; MSIT holds back fact-finding and fines for a guidance period of at least one year, while the duty applies',
    reviewed: REVIEWED_V050,
  },
  {
    id: 'AIGE-OBL-KR-ART36',
    frameworkId: 'kr-ai-basic-act',
    framework: 'South Korea AI Basic Act',
    clause: 'Art. 36',
    obligation: 'Korea AI Basic Act Art. 36 domestic representative',
    requirement:
      'An operator with no address or establishment in Korea that meets a decree threshold (revenue, AI-service revenue, daily users or a past fine; Decree Art. 29) designates a domestic representative in writing and reports it to MSIT',
    artefact:
      'Designation filed with MSIT; evidence-access runbook for the representative',
    layerN: [5],
    anchor: KOREA_ANCHOR,
    scope: 'Foreign AI business operators above a threshold',
    authority: 'MSIT',
    appliesFrom: '2026-01-22',
    appliesStatus: 'grace',
    appliesNote:
      'In force 2026-01-22; MSIT holds back fact-finding and fines for a guidance period of at least one year, while the duty applies',
    reviewed: REVIEWED_V050,
  },

  // United Kingdom
  {
    id: 'AIGE-OBL-UK-DMCC-S225',
    frameworkId: 'uk-dmcc',
    framework: 'Other jurisdictions',
    clause: 'DMCC Act 2024 s. 225; Sch. 20 para. 13',
    obligation: 'UK DMCC Act 2024 banned practices: fake and concealed-incentive reviews',
    requirement:
      'Unfair commercial practices are prohibited, and Schedule 20 bans submitting or commissioning fake consumer reviews and concealed-incentive reviews, which reaches reviews generated by AI',
    artefact:
      'Policy blocking review generation; review-provenance log',
    layerN: [1, 4],
    anchor: UK_ANCHOR,
    scope: 'Traders',
    authority: 'Competition and Markets Authority',
    appliesFrom: '2025-04-06',
    appliesStatus: 'in-force',
    appliesNote: 'In force 2025-04-06',
    reviewed: REVIEWED_V050,
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
  {
    id: 'AIGE-OBL-CN-PIPL-ART24',
    frameworkId: 'cn-pipl',
    framework: 'China',
    clause: 'PIPL Arts. 24, 55–56',
    obligation: 'China PIPL Art. 24 automated decision-making and Arts. 55–56 impact assessment',
    requirement:
      'Automated decisions stay transparent and fair, with no unreasonable differential treatment in prices or terms; targeted pushes offer a non-personalised option or an easy refusal; individuals may request an explanation and refuse solely automated decisions with a significant impact; an impact assessment beforehand, kept at least three years',
    artefact:
      'Explanation service and manual-decision route; non-personalised option at runtime; impact assessment record kept three years',
    layerN: [2, 4, 5],
    anchor: CHINA_ANCHOR,
    scope: 'Personal information processors',
    authority: 'CAC and other departments',
    appliesFrom: '2021-11-01',
    appliesStatus: 'in-force',
    appliesNote: 'Binding; in force 2021-11-01',
    reviewed: REVIEWED_V050,
  },
  {
    id: 'AIGE-OBL-CN-ANTHRO',
    frameworkId: 'cn-anthropomorphic',
    framework: 'China',
    clause: 'CAC anthropomorphic interaction measures',
    obligation: 'Interim Measures for Anthropomorphic Interaction Services (in force 2026-07-15)',
    requirement:
      "A minors' mode; AI signals and a reminder after two hours of continuous use; an easy exit; a security assessment at 1 million registered or 100,000 monthly active users; filing",
    artefact:
      "Minors'-mode configuration; reminder timer; user-count threshold monitor; security-assessment report; filing record",
    layerN: [1, 2, 4, 5],
    anchor: CHINA_ANCHOR,
    scope: 'Providers of emotional-interaction AI services to the public in China',
    authority: 'CAC',
    appliesFrom: '2026-07-15',
    appliesStatus: 'in-force',
    appliesNote: 'Binding; in force 2026-07-15',
    reviewed: REVIEWED_V050,
  },

  // Treaty and international soft law
  {
    id: 'AIGE-OBL-COE-ART14-2',
    frameworkId: 'coe-cets-225',
    framework: 'Treaty and international soft law',
    clause: 'Art. 14(2)(a)–(b)',
    obligation: 'Council of Europe Convention Art. 14(2)(a)–(b) documentation to contest decisions',
    requirement:
      'Document relevant information about systems that can significantly affect human rights, sufficient for affected people to contest the decisions',
    artefact:
      'Decision record per consequential output; contest path with the record attached',
    layerN: [2, 5],
    anchor: INTL_ANCHOR,
    scope: 'Parties (states and the EU); private actors through national measures',
    appliesStatus: 'pending',
    appliesNote:
      'Not in force as of 2026-09-24; binds Parties once in force, and the EU implements it through the AI Act',
    reviewed: REVIEWED_V050,
  },
  {
    id: 'AIGE-OBL-COE-ART15-2',
    frameworkId: 'coe-cets-225',
    framework: 'Treaty and international soft law',
    clause: 'Art. 15(2)',
    obligation: 'Council of Europe Convention Art. 15(2) notice of interaction with an AI system',
    requirement:
      'Notify people that they are interacting with an AI system, as appropriate',
    artefact:
      'Interaction disclosure enforced at runtime',
    layerN: [4],
    anchor: INTL_ANCHOR,
    scope: 'Parties (states and the EU); private actors through national measures',
    appliesStatus: 'pending',
    appliesNote:
      'Not in force as of 2026-09-24; binds Parties once in force, and the EU implements it through the AI Act',
    reviewed: REVIEWED_V050,
  },
  {
    id: 'AIGE-OBL-COE-ART16',
    frameworkId: 'coe-cets-225',
    framework: 'Treaty and international soft law',
    clause: 'Art. 16(1)–(2)(a)–(f)',
    obligation: 'Council of Europe Convention Art. 16 risk and impact management',
    requirement:
      'Iterative, graduated risk and impact management: context, severity and probability, stakeholder views, monitoring and documentation',
    artefact:
      'Risk register as code; impact assessment linked to the registry; monitoring against a baseline',
    layerN: [1, 2, 4],
    anchor: INTL_ANCHOR,
    scope: 'Parties (states and the EU); private actors through national measures',
    appliesStatus: 'pending',
    appliesNote:
      'Not in force as of 2026-09-24; binds Parties once in force, and the EU implements it through the AI Act',
    reviewed: REVIEWED_V050,
  },
  {
    id: 'AIGE-OBL-COE-ART16-2G',
    frameworkId: 'coe-cets-225',
    framework: 'Treaty and international soft law',
    clause: 'Art. 16(2)(g)',
    obligation:
      'Council of Europe Convention Art. 16(2)(g) testing before first use and on significant modification',
    requirement:
      'Test systems before first use and when they are significantly modified, where appropriate',
    artefact:
      'Eval gate on release and on material change',
    layerN: [3],
    anchor: INTL_ANCHOR,
    scope: 'Parties (states and the EU); private actors through national measures',
    appliesStatus: 'pending',
    appliesNote:
      'Not in force as of 2026-09-24; binds Parties once in force, and the EU implements it through the AI Act',
    reviewed: REVIEWED_V050,
  },
  {
    id: 'AIGE-OBL-OECD-P1-4B',
    frameworkId: 'oecd-ai-principles',
    framework: 'Treaty and international soft law',
    clause: 'principle 1.4(b)',
    obligation: 'OECD AI Principle 1.4(b) override, repair or decommission safely',
    requirement:
      'Mechanisms let AI systems that risk undue harm be overridden, repaired and/or decommissioned safely',
    artefact:
      'Tested kill switch; decommissioning record in the registry',
    layerN: [2, 4],
    anchor: INTL_ANCHOR,
    scope: 'AI actors (a commitment of adhering governments)',
    appliesStatus: 'voluntary',
    appliesNote: 'Non-binding; revised 2024-05-03',
    reviewed: REVIEWED_V050,
  },
  {
    id: 'AIGE-OBL-OECD-P1-5',
    frameworkId: 'oecd-ai-principles',
    framework: 'Treaty and international soft law',
    clause: 'principle 1.5(b)–(c)',
    obligation: 'OECD AI Principle 1.5(b)–(c) traceability and systematic risk management',
    requirement:
      'Traceability of datasets, processes and decisions, and systematic risk management at each phase of the lifecycle',
    artefact:
      'Evidence store keyed to registry ids; risk register as code; supplier records',
    layerN: [1, 5],
    anchor: INTL_ANCHOR,
    scope: 'AI actors (a commitment of adhering governments)',
    appliesStatus: 'voluntary',
    appliesNote: 'Non-binding; revised 2024-05-03',
    reviewed: REVIEWED_V050,
  },
  {
    id: 'AIGE-OBL-G7-A1',
    frameworkId: 'g7-hiroshima-coc',
    framework: 'Treaty and international soft law',
    clause: 'Action 1',
    obligation: 'G7 Hiroshima Code action 1: lifecycle risk management and pre-deployment testing',
    requirement:
      'Identify, evaluate and mitigate risks across the lifecycle, incl. testing before deployment',
    artefact:
      'Adversarial red-team suite; eval gate',
    layerN: [3],
    anchor: INTL_ANCHOR,
    scope: 'Organisations developing advanced AI systems',
    appliesStatus: 'voluntary',
    appliesNote: 'Voluntary; agreed 2023-10-30',
    reviewed: REVIEWED_V050,
  },
  {
    id: 'AIGE-OBL-G7-A2-4',
    frameworkId: 'g7-hiroshima-coc',
    framework: 'Treaty and international soft law',
    clause: 'Actions 2 and 4',
    obligation:
      'G7 Hiroshima Code actions 2 and 4: post-deployment monitoring and incident sharing',
    requirement:
      'Identify and mitigate vulnerabilities, incidents and misuse after deployment, and share information and report incidents responsibly',
    artefact:
      'Runtime monitoring; incident pipeline with an external-sharing branch',
    layerN: [4, 5],
    anchor: INTL_ANCHOR,
    scope: 'Organisations developing advanced AI systems',
    appliesStatus: 'voluntary',
    appliesNote: 'Voluntary; agreed 2023-10-30',
    reviewed: REVIEWED_V050,
  },
  {
    id: 'AIGE-OBL-G7-A3',
    frameworkId: 'g7-hiroshima-coc',
    framework: 'Treaty and international soft law',
    clause: 'Action 3',
    obligation: 'G7 Hiroshima Code action 3: public reporting of capabilities and limitations',
    requirement:
      'Publicly report capabilities, limitations and appropriate and inappropriate uses; the OECD reporting framework has collected such reports since 2025',
    artefact:
      'Model card published from the registry',
    layerN: [2],
    anchor: INTL_ANCHOR,
    scope: 'Organisations developing advanced AI systems',
    appliesStatus: 'voluntary',
    appliesNote: 'Voluntary; agreed 2023-10-30',
    reviewed: REVIEWED_V050,
  },
  {
    id: 'AIGE-OBL-G7-A7',
    frameworkId: 'g7-hiroshima-coc',
    framework: 'Treaty and international soft law',
    clause: 'Action 7',
    obligation: 'G7 Hiroshima Code action 7: content authentication and provenance',
    requirement:
      'Deploy content authentication and provenance mechanisms where feasible',
    artefact:
      'Provenance marking at output; verification test',
    layerN: [4],
    anchor: INTL_ANCHOR,
    scope: 'Organisations developing advanced AI systems',
    appliesStatus: 'voluntary',
    appliesNote: 'Voluntary; agreed 2023-10-30',
    reviewed: REVIEWED_V050,
  },

  // CEN-CENELEC JTC 21 deliverables (What is NOT harmonised yet)
  {
    id: 'AIGE-OBL-CEN-EN18286',
    frameworkId: 'en-18286',
    framework: 'CEN-CENELEC JTC 21',
    clause: 'EN 18286:2026',
    obligation: 'EN 18286:2026 quality management system for EU AI Act purposes',
    requirement:
      'Quality-management-system requirements supporting Art. 17; published but not cited in the Official Journal, so it carries no presumption of conformity',
    artefact:
      'QMS processes run as pipeline stages; design and change-control evidence',
    layerN: [1, 5],
    anchor: CEN_ANCHOR,
    appliesStatus: 'voluntary',
    appliesNote: 'Published July 2026; not cited in the Official Journal as of 2026-09-24',
    reviewed: REVIEWED_V050,
  },
  {
    id: 'AIGE-OBL-CEN-PREN18228',
    frameworkId: 'pren-18228',
    framework: 'CEN-CENELEC JTC 21',
    clause: 'prEN 18228',
    obligation: 'prEN 18228 AI risk management (draft)',
    requirement:
      'Draft harmonised standard for the risk management system of Art. 9',
    artefact:
      'Provider risk file per system; acceptability criteria as code; control monitoring',
    layerN: [1, 3, 5],
    anchor: CEN_ANCHOR,
    appliesStatus: 'pending',
    appliesNote: 'Draft; Enquiry vote closed 2026-07-30, as reported',
    reviewed: REVIEWED_V050,
  },
  {
    id: 'AIGE-OBL-CEN-PREN18229-1',
    frameworkId: 'pren-18229-1',
    framework: 'CEN-CENELEC JTC 21',
    clause: 'prEN 18229-1',
    obligation: 'prEN 18229-1 AI trustworthiness framework, Part 1: logging (draft)',
    requirement:
      'Draft harmonised standard for the record-keeping of Art. 12',
    artefact:
      'Logging specification per system; structured, signed event logs mapped to the draft',
    layerN: [4],
    anchor: CEN_ANCHOR,
    appliesStatus: 'pending',
    appliesNote: 'Draft; Enquiry vote closed 2026-08-20, as reported',
    reviewed: REVIEWED_V050,
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
