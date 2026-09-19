// frameworks.ts: the regulatory map, faithful to bok/08-regulatory-map.md —
// the reverse index that names, for each obligation, the engineering artefact
// that evidences it and the stack layer the artefact lives in.
//
// `obligations` reproduces the chapter's obligation → artefact → layer tables
// (EU AI Act, GPAI Code of Practice, ISO/IEC 42001/42005/42006 and 23894, NIST
// AI RMF and newer NIST AI work, CSA, OWASP, US federal/state laws and other
// jurisdictions). `layerN` is an array because many rows map to more than one
// layer. Every anchor is the `#slug` of the table's H2. Mappings are
// illustrative, not a claim of conformity.

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
  /** What kind of instrument it is. */
  type: FrameworkType;
  /** The body that issues or maintains it. */
  issuer: string;
  /** Canonical URL, only where the chapter or SOURCES.md gives one. */
  url?: string;
  /** One-to-two-sentence summary, faithful to the chapter. */
  summary: string;
}

export interface Obligation {
  /** The framework this obligation belongs to. */
  framework: string;
  /** The obligation, named (e.g. "EU AI Act Art. 9 risk management"). */
  obligation: string;
  /** The engineering artefact that produces the evidence for it. */
  artefact: string;
  /** The stack layer(s) the artefact lives in. */
  layerN: readonly StackLayer[];
  /** `#slug` of the table's section heading. */
  anchor: string;
  /** Who the obligation binds, where the chapter states it. */
  dutyHolder?: string;
  /** When it applies (post-Omnibus), where the chapter states it. */
  applies?: string;
}

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

/** The frameworks, standards, codes and laws the chapter maps against. */
export const frameworks: readonly Framework[] = [
  {
    id: 'eu-ai-act',
    name: 'EU AI Act (post-Omnibus)',
    type: 'law',
    issuer: 'European Union',
    url: 'https://artificialintelligenceact.eu/ai-act-explorer/digital-omnibus/',
    summary:
      "The EU's horizontal, risk-tiered law for AI (Regulation (EU) 2024/1689), amended by the Digital Omnibus (Regulation (EU) 2026/1744). High-risk Annex III obligations apply from 2 December 2027; Annex I embedded systems from 2 August 2028.",
  },
  {
    id: 'gpai-code-of-practice',
    name: 'GPAI Code of Practice',
    type: 'code',
    issuer: 'European Commission',
    url: 'https://digital-strategy.ec.europa.eu/en/policies/contents-code-gpai',
    summary:
      'The voluntary instrument (published 10 July 2025) providers use to demonstrate compliance with the GPAI obligations until harmonised standards exist. Three chapters: Safety and Security, Transparency and Copyright.',
  },
  {
    id: 'iso-42001',
    name: 'ISO/IEC 42001',
    type: 'standard',
    issuer: 'ISO/IEC',
    summary:
      'The AI management-system (AIMS) standard (2023); Annex A groups control objectives into nine areas (A.2–A.10). It is a management-system standard, not the Article 17 QMS, and its European adoption confers no presumption of conformity.',
  },
  {
    id: 'iso-42005',
    name: 'ISO/IEC 42005',
    type: 'standard',
    issuer: 'ISO/IEC',
    url: 'https://www.iso.org/standard/44545.html',
    summary:
      'Guidance for AI system impact assessment (2025); the natural companion to EU AI Act Article 27 (FRIA) and ISO/IEC 42001 Annex A.5.',
  },
  {
    id: 'iso-42006',
    name: 'ISO/IEC 42006:2025',
    type: 'standard',
    issuer: 'ISO/IEC',
    url: 'https://www.iso.org/standard/42006',
    summary:
      'Requirements for bodies providing audit and certification of AI management systems (2025). It builds on ISO/IEC 17021-1 and sets the competence and consistency a certification body must meet to credibly certify an organisation to ISO/IEC 42001 — in short, who may credibly certify you to 42001.',
  },
  {
    id: 'iso-23894',
    name: 'ISO/IEC 23894:2023',
    type: 'standard',
    issuer: 'ISO/IEC',
    url: 'https://www.iso.org/standard/77304.html',
    summary:
      'Guidance on AI risk management (2023), adapting ISO 31000 to AI. It gives organisations a process for identifying, analysing and treating AI-specific risk; a companion to EU AI Act Article 9 and the NIST AI RMF.',
  },
  {
    id: 'nist-ai-rmf',
    name: 'NIST AI RMF',
    type: 'framework',
    issuer: 'NIST',
    url: 'https://www.nist.gov/itl/ai-risk-management-framework',
    summary:
      'The AI Risk Management Framework 1.0 (January 2023; there is no 2.0). Voluntary and US-origin, it organises risk work into four functions — Govern, Map, Measure, Manage — that map cleanly onto the five-layer stack.',
  },
  {
    id: 'nist-ai-agent-standards',
    name: 'NIST AI Agent Standards Initiative',
    type: 'framework',
    issuer: 'NIST (CAISI)',
    url: 'https://www.nist.gov/news-events/news/2026/02/announcing-ai-agent-standards-initiative-interoperable-and-secure',
    summary:
      'A NIST Center for AI Standards and Innovation initiative (launched 17 February 2026) to develop interoperable, secure standards for AI agents, spanning agent identity, authentication, authorisation and agent security.',
  },
  {
    id: 'nist-ir-8596',
    name: 'NIST IR 8596 Cyber AI Profile (draft)',
    type: 'framework',
    issuer: 'NIST',
    url: 'https://csrc.nist.gov/pubs/ir/8596/iprd',
    summary:
      'A draft Cybersecurity Framework (CSF 2.0) profile for AI — the Cyber AI Profile — organised around Secure, Defend and Thwart. Initial public draft released 16 December 2025; still in draft.',
  },
  {
    id: 'nist-ai-800-1',
    name: 'NIST AI 800-1 (draft)',
    type: 'framework',
    issuer: 'NIST',
    url: 'https://www.nist.gov/news-events/news/2025/01/updated-guidelines-managing-misuse-risk-dual-use-foundation-models',
    summary:
      'Draft voluntary guidance (Managing Misuse Risk for Dual-Use Foundation Models) for identifying, measuring and mitigating the misuse risk of dual-use foundation models across the AI lifecycle. Second public draft January 2025; still in draft.',
  },
  {
    id: 'csa-aicm',
    name: 'CSA AI Controls Matrix (AICM) v1.1',
    type: 'controls',
    issuer: 'Cloud Security Alliance',
    url: 'https://cloudsecurityalliance.org/artifacts/ai-controls-matrix-v1-1',
    summary:
      'A control framework (published 22 June 2026) defining 247 control objectives across 18 domains, spanning governance, data, model and runtime, with crosswalks to ISO 42001 and NIST AI RMF.',
  },
  {
    id: 'csa-star-for-ai',
    name: 'CSA STAR for AI',
    type: 'framework',
    issuer: 'Cloud Security Alliance',
    url: 'https://cloudsecurityalliance.org/star/ai',
    summary:
      'The assurance and certification programme built on the AICM, with a self-assessment tier, an automated "Valid-AI-ted" tier and a Level 2 combining third-party ISO/IEC 42001 certification with the validated assessment.',
  },
  {
    id: 'owasp-agentic-top-10',
    name: 'OWASP Top 10 for Agentic Applications 2026',
    type: 'framework',
    issuer: 'OWASP GenAI Security Project',
    url: 'https://genai.owasp.org/resource/owasp-top-10-for-agentic-applications-for-2026/',
    summary:
      'The agent threat catalogue (ASI01 Agent Goal Hijack … ASI10 Rogue Agents) that the runtime controls are built against.',
  },
  {
    id: 'owasp-llm-top-10',
    name: 'OWASP Top 10 for LLM Applications 2026',
    type: 'framework',
    issuer: 'OWASP GenAI Security Project',
    url: 'https://genai.owasp.org/',
    summary:
      'The LLM threat catalogue, including Excessive Agency at #3, answered by prompt-injection and output-handling controls and an eval gate.',
  },
  {
    id: 'owasp-acs',
    name: 'OWASP Agent Control Standard (ACS)',
    type: 'standard',
    issuer: 'OWASP GenAI Security Project',
    url: 'https://genai.owasp.org/',
    summary:
      'A standard for expressing agent controls as machine-readable control definitions the stack consumes directly.',
  },
  {
    id: 'owasp-aibom',
    name: 'OWASP AIBOM',
    type: 'standard',
    issuer: 'OWASP GenAI Security Project',
    url: 'https://genai.owasp.org/',
    summary:
      'The AI bill-of-materials format and generator, producing CycloneDX ML-BOM and SPDX 3.0 AI output at build.',
  },
  {
    id: 'ca-sb-53',
    name: 'California SB 53 (TFAIA)',
    type: 'law',
    issuer: 'State of California',
    url: 'https://fpf.org/blog/californias-sb-53-the-first-frontier-ai-law-explained/',
    summary:
      'A frontier-AI transparency law in force 1 January 2026, binding large frontier developers (models above ~10^26 FLOP; developer revenue over USD 500M) to publish a safety framework and report critical incidents to the state.',
  },
  {
    id: 'ny-raise-act',
    name: 'New York RAISE Act',
    type: 'law',
    issuer: 'State of New York',
    url: 'https://www.governor.ny.gov/news/governor-hochul-signs-nation-leading-legislation-require-ai-frameworks-ai-frontier-models',
    summary:
      'A frontier-AI safety law (S6953B) binding large frontier developers to publish a safety framework and disclose incidents. Signed 19 December 2025 and effective 1 January 2027 after a March 2026 chapter amendment, with oversight in an office within the New York Department of Financial Services (DFS).',
  },
  {
    id: 'tx-traiga',
    name: 'Texas TRAIGA (HB 149)',
    type: 'law',
    issuer: 'State of Texas',
    url: 'https://capitol.texas.gov/tlodocs/89R/billtext/pdf/HB00149F.pdf',
    summary:
      'The Texas Responsible Artificial Intelligence Governance Act (HB 149), in force 1 January 2026. Intent-based prohibitions (e.g. social scoring, unlawful discrimination), disclosure duties and a regulatory sandbox, enforced by the Attorney General and preempting local AI rules.',
  },
  {
    id: 'co-ai-act',
    name: 'Colorado AI Act (SB 24-205)',
    type: 'law',
    issuer: 'State of Colorado',
    url: 'https://leg.colorado.gov/bills/sb24-205',
    summary:
      'A duty-of-care regime against algorithmic discrimination in high-risk (consequential) automated decisions. Its 1 February 2026 start was delayed to 30 June 2026, then the Act was replaced by SB 26-189 (signed 14 May 2026), a narrower transparency law effective 1 January 2027.',
  },
  {
    id: 'kr-ai-basic-act',
    name: 'South Korea AI Basic Act',
    type: 'law',
    issuer: 'Republic of Korea',
    url: 'https://www.trade.gov/market-intelligence/south-korea-ai-basic-act',
    summary:
      "South Korea's framework Act on AI (Basic Act on the Development of AI and Establishment of Trust), in force 22 January 2026. It sets baseline duties for AI operators and heightened obligations for \"high-impact\" AI in sensitive sectors; the ministry is running a grace period through 2026.",
  },
  {
    id: 'uk-duaa',
    name: 'UK Data (Use and Access) Act 2025',
    type: 'law',
    issuer: 'United Kingdom',
    url: 'https://www.legislation.gov.uk/ukpga/2025/18/section/80',
    summary:
      'The UK has no horizontal AI act; it governs AI through sector regulators and the AI Security Institute. For automated decision-making, the Data (Use and Access) Act 2025 replaced UK GDPR Article 22 with Articles 22A–22D (in force 5 February 2026): a permission-plus-safeguards regime for significant, solely automated decisions.',
  },
  {
    id: 'sg-genai-framework',
    name: 'Singapore Model AI Governance Framework for Generative AI',
    type: 'framework',
    issuer: 'IMDA / AI Verify Foundation',
    url: 'https://aiverifyfoundation.sg/wp-content/uploads/2024/05/Model-AI-Governance-Framework-for-Generative-AI-May-2024-1-1.pdf',
    summary:
      "Singapore's voluntary Model AI Governance Framework for Generative AI (IMDA and the AI Verify Foundation, May 2024). It sets out governance dimensions — testing, transparency, incident reporting, security and content provenance — as guidance, not law.",
  },
  {
    id: 'etsi-en-304-223',
    name: 'ETSI EN 304 223',
    type: 'standard',
    issuer: 'ETSI',
    url: 'https://www.etsi.org/newsroom/press-releases/2627-etsi-releases-world-leading-standard-for-securing-ai/',
    summary:
      'Securing Artificial Intelligence (SAI); Baseline Cyber Security Requirements for AI Models and Systems (V2.1.1, December 2025). A cross-border European standard setting 13 security principles across the five stages of the AI lifecycle — a cyber-security baseline, not an EU AI Act harmonised standard.',
  },
  {
    id: 'en-18286',
    name: 'EN 18286:2026',
    type: 'standard',
    issuer: 'CEN-CENELEC',
    url: 'https://www.cencenelec.eu/news-events/news/2026/en-in-the-spotlight/2026-07-30-ai-quality-management/',
    summary:
      'The Article 17 QMS standard, published July 2026 — the first JTC 21 AI Act standard to reach publication — but not yet cited in the Official Journal, so it carries no presumption of conformity.',
  },
] as const;

/** The obligation → artefact → layer rows, faithful to the chapter's tables. */
export const obligations: readonly Obligation[] = [
  // EU AI Act, post-Omnibus
  {
    framework: 'EU AI Act',
    obligation: 'EU AI Act Art. 4 AI literacy',
    artefact:
      'Literacy programme as code; role-based training records; onboarding gates',
    layerN: [1],
    anchor: EU_ANCHOR,
    dutyHolder: 'Provider + deployer',
    applies: '2026-07-27 (reworded, in force)',
  },
  {
    framework: 'EU AI Act',
    obligation:
      'EU AI Act Art. 4a lawful basis for special-category data in bias detection',
    artefact:
      'Data governance controls; pseudonymisation and retention-as-code; data card noting basis and deletion',
    layerN: [2],
    anchor: EU_ANCHOR,
    dutyHolder: 'Provider',
    applies: '2026-07-27 (new, in force)',
  },
  {
    framework: 'EU AI Act',
    obligation: 'EU AI Act Art. 5 prohibited practices (incl. new NCII and CSAM bans)',
    artefact:
      'Policy-as-code blocklist; input/output guardrails; refusal and abuse detection',
    layerN: [1, 4],
    anchor: EU_ANCHOR,
    dutyHolder: 'Provider + deployer',
    applies: '2026-12-02 (new bans); earlier prohibitions from 2025-02-02',
  },
  {
    framework: 'EU AI Act',
    obligation:
      'EU AI Act Art. 6 classification of high-risk AI systems (incl. the Annex III route)',
    artefact:
      'Risk-tiering as code; high-risk classification decision record; register entry flagging Annex III status',
    layerN: [1, 2],
    anchor: EU_ANCHOR,
    dutyHolder: 'Provider',
    applies: '2027-12-02 (Annex III)',
  },
  {
    framework: 'EU AI Act',
    obligation: 'EU AI Act Art. 9 risk management system',
    artefact:
      'Risk register as code; threat models; linkage to FRIA and eval results',
    layerN: [1, 3],
    anchor: EU_ANCHOR,
    dutyHolder: 'Provider',
    applies: '2027-12-02 (Annex III)',
  },
  {
    framework: 'EU AI Act',
    obligation: 'EU AI Act Art. 10 data and data governance',
    artefact: 'Data cards; lineage; bias and quality tests in CI',
    layerN: [2, 3],
    anchor: EU_ANCHOR,
    dutyHolder: 'Provider',
    applies: '2027-12-02 (Annex III)',
  },
  {
    framework: 'EU AI Act',
    obligation: 'EU AI Act Art. 11 technical documentation (Annex IV)',
    artefact:
      'AIBOM (CycloneDX ML-BOM, SPDX 3.0 AI); auto-generated technical documentation; model cards',
    layerN: [2],
    anchor: EU_ANCHOR,
    dutyHolder: 'Provider',
    applies: '2027-12-02 (Annex III)',
  },
  {
    framework: 'EU AI Act',
    obligation: 'EU AI Act Art. 12 record-keeping and logging',
    artefact:
      'Structured, signed logs; OpenTelemetry traces; tamper-evident event store',
    layerN: [4],
    anchor: EU_ANCHOR,
    dutyHolder: 'Provider',
    applies: '2027-12-02 (Annex III)',
  },
  {
    framework: 'EU AI Act',
    obligation: 'EU AI Act Art. 13 transparency and information to deployers',
    artefact:
      'Instructions for use as code; model and data cards; capability and limitation notes',
    layerN: [2],
    anchor: EU_ANCHOR,
    dutyHolder: 'Provider',
    applies: '2027-12-02 (Annex III)',
  },
  {
    framework: 'EU AI Act',
    obligation: 'EU AI Act Art. 14 human oversight',
    artefact:
      'Human-in-the-loop checkpoints; kill switch; override and escalation paths',
    layerN: [4],
    anchor: EU_ANCHOR,
    dutyHolder: 'Provider',
    applies: '2027-12-02 (Annex III)',
  },
  {
    framework: 'EU AI Act',
    obligation: 'EU AI Act Art. 15 accuracy, robustness and cybersecurity',
    artefact:
      'Eval gate; adversarial red-team suite; robustness and security controls; regression evals',
    layerN: [3, 4],
    anchor: EU_ANCHOR,
    dutyHolder: 'Provider',
    applies: '2027-12-02 (Annex III)',
  },
  {
    framework: 'EU AI Act',
    obligation: 'EU AI Act Art. 17 quality management system',
    artefact:
      'QMS-as-code; versioned policies; pipeline controls and change management',
    layerN: [1, 5],
    anchor: EU_ANCHOR,
    dutyHolder: 'Provider',
    applies: '2027-12-02 (Annex III)',
  },
  {
    framework: 'EU AI Act',
    obligation: 'EU AI Act Art. 25 responsibilities along the AI value chain',
    artefact:
      'Value-chain due-diligence gate; provider/deployer responsibility allocation; AIBOM and model/data cards collected from upstream providers',
    layerN: [2, 5],
    anchor: EU_ANCHOR,
    dutyHolder: 'Provider + value-chain actors',
    applies: '2027-12-02 (Annex III)',
  },
  {
    framework: 'EU AI Act',
    obligation: 'EU AI Act Art. 26 deployer obligations for high-risk systems',
    artefact:
      'Deployment registry; monitoring hooks; assigned oversight and logging retention',
    layerN: [2, 4],
    anchor: EU_ANCHOR,
    dutyHolder: 'Deployer',
    applies: '2027-12-02 (Annex III)',
  },
  {
    framework: 'EU AI Act',
    obligation:
      'EU AI Act Art. 27 Fundamental Rights Impact Assessment (FRIA)',
    artefact:
      'FRIA-as-code from a template; cross-reference to a GDPR Art. 35 DPIA',
    layerN: [1, 2],
    anchor: EU_ANCHOR,
    dutyHolder: 'Deployer',
    applies: '2027-12-02 (Annex III)',
  },
  {
    framework: 'EU AI Act',
    obligation: 'EU AI Act Art. 43 conformity assessment',
    artefact:
      'Conformity-assessment workflow; internal-control or notified-body evidence pack; traceability to Annex IV documentation',
    layerN: [1, 5],
    anchor: EU_ANCHOR,
    dutyHolder: 'Provider',
    applies: '2027-12-02 (Annex III)',
  },
  {
    framework: 'EU AI Act',
    obligation: 'EU AI Act Art. 47 EU declaration of conformity',
    artefact:
      'Auto-generated EU declaration of conformity from the evidence; CE-marking record',
    layerN: [2, 5],
    anchor: EU_ANCHOR,
    dutyHolder: 'Provider',
    applies: '2027-12-02 (Annex III)',
  },
  {
    framework: 'EU AI Act',
    obligation:
      'EU AI Act Art. 49/71 registration of high-risk systems in the EU database',
    artefact:
      'Agent/model registry with an API that feeds registration; owner and status per entry',
    layerN: [2],
    anchor: EU_ANCHOR,
    dutyHolder: 'Provider; public-authority deployer',
    applies: '2027-12-02 (Annex III)',
  },
  {
    framework: 'EU AI Act',
    obligation: 'EU AI Act Art. 50 transparency for certain AI systems',
    artefact:
      'Content labelling and machine-readable marking (C2PA-style); chatbot disclosure banner',
    layerN: [4, 2],
    anchor: EU_ANCHOR,
    dutyHolder: 'Provider + deployer',
    applies: '2026-08-02; marking grace for existing systems to 2026-12-02',
  },
  {
    framework: 'EU AI Act',
    obligation: 'EU AI Act Art. 53 GPAI provider obligations',
    artefact:
      'Model cards; training-content summary; AIBOM and dataset provenance',
    layerN: [2],
    anchor: EU_ANCHOR,
    dutyHolder: 'GPAI provider',
    applies: 'Obligations from 2025-08-02; enforcement from 2026-08-02',
  },
  {
    framework: 'EU AI Act',
    obligation: 'EU AI Act Art. 55 GPAI models with systemic risk',
    artefact:
      'Eval and red-team suite; incident pipeline on the Commission serious-incident reporting template; weight-security controls; threat model',
    layerN: [3, 4, 5],
    anchor: EU_ANCHOR,
    dutyHolder: 'GPAI provider (systemic risk)',
    applies: 'Obligations from 2025-08-02; enforcement from 2026-08-02',
  },
  {
    framework: 'EU AI Act',
    obligation:
      'EU AI Act Art. 60 testing in real-world conditions outside sandboxes',
    artefact:
      'Real-world testing plan; Art. 61 informed-consent records; test monitoring, logging and incident hooks',
    layerN: [3, 4],
    anchor: EU_ANCHOR,
    dutyHolder: 'Provider / prospective provider',
    applies: '2026-08-02',
  },
  {
    framework: 'EU AI Act',
    obligation: 'EU AI Act Art. 72 post-market monitoring',
    artefact:
      'Continuous assurance telemetry; monitoring plan; drift and performance signals',
    layerN: [5],
    anchor: EU_ANCHOR,
    dutyHolder: 'Provider',
    applies: '2027-12-02 (Annex III)',
  },
  {
    framework: 'EU AI Act',
    obligation: 'EU AI Act Art. 73 serious-incident reporting',
    artefact:
      'Incident detection and triage pipeline; reporting-clock automation; evidence capture',
    layerN: [5, 4],
    anchor: EU_ANCHOR,
    dutyHolder: 'Provider',
    applies: '2027-12-02 (Annex III)',
  },

  // GPAI Code of Practice
  {
    framework: 'GPAI Code of Practice',
    obligation: 'Safety and Security (systemic-risk models only)',
    artefact:
      'Eval and red-team suite; adversarial testing harness; incident pipeline; weight-security controls',
    layerN: [3, 4, 5],
    anchor: GPAI_ANCHOR,
  },
  {
    framework: 'GPAI Code of Practice',
    obligation: 'Transparency',
    artefact: 'Model cards; structured model documentation; AIBOM',
    layerN: [2],
    anchor: GPAI_ANCHOR,
  },
  {
    framework: 'GPAI Code of Practice',
    obligation: 'Copyright',
    artefact:
      'Training-data provenance and licence records; policy-as-code for source filtering',
    layerN: [1, 2],
    anchor: GPAI_ANCHOR,
  },

  // ISO/IEC 42001 Annex A
  {
    framework: 'ISO/IEC 42001',
    obligation: 'A.2 Policies related to AI',
    artefact: 'Policy-as-code library; versioned policy repository',
    layerN: [1],
    anchor: ISO_ANCHOR,
  },
  {
    framework: 'ISO/IEC 42001',
    obligation: 'A.3 Internal organization',
    artefact: 'Operating model; RACI; ownership in the registry',
    layerN: [1, 2],
    anchor: ISO_ANCHOR,
  },
  {
    framework: 'ISO/IEC 42001',
    obligation: 'A.4 Resources for AI systems',
    artefact: 'Resource inventory; AIBOM; environment manifests',
    layerN: [2],
    anchor: ISO_ANCHOR,
  },
  {
    framework: 'ISO/IEC 42001',
    obligation: 'A.5 Assessing impacts of AI systems',
    artefact: 'Impact assessment as code; FRIA/DPIA linkage (ISO/IEC 42005)',
    layerN: [1, 3],
    anchor: ISO_ANCHOR,
  },
  {
    framework: 'ISO/IEC 42001',
    obligation: 'A.6 AI system life cycle',
    artefact: 'Pipeline controls; eval gates; change management',
    layerN: [1, 3, 4],
    anchor: ISO_ANCHOR,
  },
  {
    framework: 'ISO/IEC 42001',
    obligation: 'A.7 Data for AI systems',
    artefact: 'Data cards; lineage; data quality tests',
    layerN: [2, 3],
    anchor: ISO_ANCHOR,
  },
  {
    framework: 'ISO/IEC 42001',
    obligation: 'A.8 Information for interested parties',
    artefact: 'Model/data cards; machine-readable disclosures',
    layerN: [2],
    anchor: ISO_ANCHOR,
  },
  {
    framework: 'ISO/IEC 42001',
    obligation: 'A.9 Use of AI systems',
    artefact: 'Runtime guardrails; usage telemetry',
    layerN: [4],
    anchor: ISO_ANCHOR,
  },
  {
    framework: 'ISO/IEC 42001',
    obligation: 'A.10 Third-party and customer relationships',
    artefact: 'Supplier AIBOM; contractual and technical control mapping',
    layerN: [2, 5],
    anchor: ISO_ANCHOR,
  },
  {
    framework: 'ISO/IEC 42006',
    obligation:
      'ISO/IEC 42006:2025 — requirements for AIMS certification bodies',
    artefact:
      'Accredited certification scope; auditor-competence evidence; certificate register',
    layerN: [5],
    anchor: ISO_ANCHOR,
  },
  {
    framework: 'ISO/IEC 23894',
    obligation: 'ISO/IEC 23894:2023 — guidance on AI risk management',
    artefact:
      'Risk register as code; AI risk taxonomy; linkage to EU AI Act Art. 9 and the NIST AI RMF',
    layerN: [1, 3],
    anchor: ISO_ANCHOR,
  },

  // NIST AI RMF
  {
    framework: 'NIST AI RMF',
    obligation: 'GOVERN',
    artefact: 'Policy-as-code; operating model; registry ownership',
    layerN: [1, 2],
    anchor: NIST_ANCHOR,
  },
  {
    framework: 'NIST AI RMF',
    obligation: 'MAP',
    artefact: 'Threat models; use-case and impact mapping; data/model cards',
    layerN: [2, 3],
    anchor: NIST_ANCHOR,
  },
  {
    framework: 'NIST AI RMF',
    obligation: 'MEASURE',
    artefact: 'Eval gates; adversarial red-team suite; metrics per failure mode',
    layerN: [3],
    anchor: NIST_ANCHOR,
  },
  {
    framework: 'NIST AI RMF',
    obligation: 'MANAGE',
    artefact: 'Runtime guardrails; incident pipeline; continuous assurance',
    layerN: [4, 5],
    anchor: NIST_ANCHOR,
  },
  {
    framework: 'NIST (agent, cyber and misuse work)',
    obligation: 'NIST AI Agent Standards Initiative (2026)',
    artefact:
      'Agent registry; non-human-identity controls; agent authentication and authorisation; adversarial agent evals',
    layerN: [3, 4],
    anchor: NIST_ANCHOR,
  },
  {
    framework: 'NIST (agent, cyber and misuse work)',
    obligation: 'NIST IR 8596 Cyber AI Profile (draft)',
    artefact:
      'AI-system security controls; runtime observability; threat detection mapped to CSF 2.0',
    layerN: [3, 4],
    anchor: NIST_ANCHOR,
  },
  {
    framework: 'NIST (agent, cyber and misuse work)',
    obligation:
      'NIST AI 800-1 misuse risk for dual-use foundation models (draft)',
    artefact:
      'Misuse red-team suite; capability and dangerous-capability evals; safety framework',
    layerN: [3],
    anchor: NIST_ANCHOR,
  },

  // CSA AICM and STAR for AI
  {
    framework: 'CSA AICM / STAR for AI',
    obligation: 'AICM v1.1 — 247 control objectives across 18 domains',
    artefact:
      'Control catalogue mapped to policy-as-code and evals; crosswalk to ISO 42001 / NIST AI RMF',
    layerN: [1, 3, 5],
    anchor: CSA_ANCHOR,
  },
  {
    framework: 'CSA AICM / STAR for AI',
    obligation: 'STAR for AI — assurance and certification programme',
    artefact:
      'Machine-readable evidence submission; continuous assurance telemetry',
    layerN: [5],
    anchor: CSA_ANCHOR,
  },
  {
    framework: 'CSA AICM / STAR for AI',
    obligation: 'AICM Agentic Control Supplement (proposed agent controls)',
    artefact:
      'Agent-specific control definitions; policy-as-code for agent scope and tools; runtime guardrails',
    layerN: [1, 4],
    anchor: CSA_ANCHOR,
  },
  {
    framework: 'CSA AICM / STAR for AI',
    obligation:
      'AICM Catastrophic Risk Annex (enhanced controls for high-autonomy systems)',
    artefact:
      'Enhanced controls for high-autonomy systems; kill switch and oversight controls; pilot-audit evidence',
    layerN: [4, 5],
    anchor: CSA_ANCHOR,
  },

  // OWASP GenAI Security Project
  {
    framework: 'OWASP GenAI Security Project',
    obligation: 'Top 10 for Agentic Applications 2026',
    artefact:
      'Agent threat model; adversarial evals; runtime guardrails; kill switch',
    layerN: [3, 4],
    anchor: OWASP_ANCHOR,
  },
  {
    framework: 'OWASP GenAI Security Project',
    obligation: 'Top 10 for LLM Applications 2026',
    artefact: 'Prompt-injection and output-handling controls; eval gate',
    layerN: [3, 4],
    anchor: OWASP_ANCHOR,
  },
  {
    framework: 'OWASP GenAI Security Project',
    obligation: 'Agent Control Standard (ACS)',
    artefact: 'Machine-readable control definitions for agents',
    layerN: [1, 4],
    anchor: OWASP_ANCHOR,
  },
  {
    framework: 'OWASP GenAI Security Project',
    obligation: 'AIBOM',
    artefact: 'AIBOM at build (CycloneDX ML-BOM, SPDX 3.0 AI)',
    layerN: [2],
    anchor: OWASP_ANCHOR,
  },

  // US frontier-developer laws
  {
    framework: 'US frontier-developer laws',
    obligation: 'California SB 53 (TFAIA)',
    artefact:
      'Published safety framework; incident pipeline reporting to the state; transparency artefacts',
    layerN: [5, 4],
    anchor: US_ANCHOR,
  },
  {
    framework: 'US frontier-developer laws',
    obligation: 'New York RAISE Act (signed 2025-12-19; effective 2027-01-01)',
    artefact:
      'Published frontier AI safety framework; 72-hour incident and disclosure pipeline reporting to the state; DFS oversight office',
    layerN: [5, 4],
    anchor: US_ANCHOR,
  },

  // US state AI laws (broader than the frontier-developer laws above)
  {
    framework: 'US state AI laws',
    obligation: 'Texas TRAIGA (HB 149; in force 2026-01-01)',
    artefact:
      'Prohibited-use policy-as-code; AI-use disclosure controls; complaint and incident handling',
    layerN: [1, 4],
    anchor: US_ANCHOR,
  },
  {
    framework: 'US state AI laws',
    obligation:
      'Colorado AI Act (SB 24-205; delayed, then replaced by SB 26-189 effective 2027-01-01)',
    artefact:
      'High-risk ADM inventory; algorithmic-discrimination impact assessments; consumer disclosure',
    layerN: [1, 2, 5],
    anchor: US_ANCHOR,
  },

  // Other jurisdictions
  {
    framework: 'Other jurisdictions',
    obligation: 'South Korea AI Basic Act (in force 2026-01-22)',
    artefact:
      'Risk register for high-impact AI; AI-use notification; AI-content labelling',
    layerN: [1, 2, 4],
    anchor: OTHER_ANCHOR,
  },
  {
    framework: 'Other jurisdictions',
    obligation:
      'Singapore IMDA Model AI Governance Framework for Generative AI (voluntary)',
    artefact:
      'Eval suite; model cards; content provenance and watermarking',
    layerN: [2, 3, 4],
    anchor: OTHER_ANCHOR,
  },
  {
    framework: 'Other jurisdictions',
    obligation:
      'UK ADM safeguards — Data (Use and Access) Act 2025, UK GDPR Arts. 22A–22D (in force 2026-02-05)',
    artefact:
      'ADM safeguards: meaningful-human-review path, contest and representation channel, decision notice',
    layerN: [4, 2],
    anchor: OTHER_ANCHOR,
  },
  {
    framework: 'Other jurisdictions',
    obligation:
      'ETSI EN 304 223 baseline cyber-security for AI models and systems',
    artefact:
      'AI-system security controls across the lifecycle; supply-chain and AIBOM checks; runtime hardening',
    layerN: [4],
    anchor: OTHER_ANCHOR,
  },
] as const;
