// frameworks.ts: the regulatory map, faithful to bok/08-regulatory-map.md —
// the reverse index that names, for each obligation, the engineering artefact
// that evidences it and the stack layer the artefact lives in.
//
// `obligations` reproduces the chapter's obligation → artefact → layer tables
// (EU AI Act, GPAI Code of Practice, ISO/IEC 42001 Annex A, NIST AI RMF, CSA,
// OWASP, US frontier laws). `layerN` is an array because many rows map to more
// than one layer. Every anchor is the `#slug` of the table's H2. Mappings are
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
const ISO_ANCHOR = 'isoiec-42001-and-42005';
const NIST_ANCHOR = 'nist-ai-rmf';
const CSA_ANCHOR = 'csa-aicm-and-star-for-ai';
const OWASP_ANCHOR = 'owasp-genai-security-project';
const US_ANCHOR = 'us-frontier-developer-laws';

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
    id: 'nist-ai-rmf',
    name: 'NIST AI RMF',
    type: 'framework',
    issuer: 'NIST',
    url: 'https://www.nist.gov/itl/ai-risk-management-framework',
    summary:
      'The AI Risk Management Framework 1.0 (January 2023; there is no 2.0). Voluntary and US-origin, it organises risk work into four functions — Govern, Map, Measure, Manage — that map cleanly onto the five-layer stack.',
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
      'Eval and red-team suite; incident pipeline; weight-security controls; threat model',
    layerN: [3, 4, 5],
    anchor: EU_ANCHOR,
    dutyHolder: 'GPAI provider (systemic risk)',
    applies: 'Obligations from 2025-08-02; enforcement from 2026-08-02',
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
] as const;
