// frontier-crosswalk.ts: the frontier safety frameworks crosswalk behind
// /resources/frontier-safety-crosswalk. It maps the three frontier labs' own
// safety policies (Anthropic's Responsible Scaling Policy, OpenAI's
// Preparedness Framework, Google DeepMind's Frontier Safety Framework) against
// the NIST AI RMF and ISO/IEC 42001, one row per governance dimension.
//
// The shape mirrors crosswalk.ts on purpose: dimensions are `Topic`s, columns
// are `CrosswalkColumn`s and references are `CrosswalkRef`s, so the page
// reuses CrosswalkMatrix, CrosswalkDrawer and public/crosswalk.js unchanged.
//
// The three lab policies are NOT entries of frameworks.ts: the register's tests
// require every instrument there to carry obligation rows and a family on the
// discipline map, and a voluntary lab policy has no obligations to invent. They
// live here as `Framework`-shaped objects; NIST AI RMF and ISO/IEC 42001 resolve
// from frameworks.ts as everywhere else.
//
// Cells are coverage, not conformity: a section in a cell deals with the
// dimension; it says nothing about whether the lab meets it, or whether the
// policy meets NIST or ISO. Lab cells cite the section heading as the current
// version prints it, with its number or PDF page, a URL (with #page= for a PDF)
// and, optionally, a verbatim quote of at most 25 words. NIST cells use the
// subcategory ids and statements of nist-ai-rmf.ts; ISO cells reuse the clause
// ids and titles of the general crosswalk's verified ISO/IEC 42001 references
// and never quote ISO text. Where a document has nothing on a dimension, a
// `gap` says so instead of a stretched cell.

import type { Framework } from './frameworks';
import type { CrosswalkColumn, CrosswalkRef, RefStrength, Topic } from './crosswalk';
import { frameworkById, refs as generalRefs } from './crosswalk';
import { nistAiRmfSubcategoryById } from './nist-ai-rmf';
import { citedNumbers, type Source } from '../lib/sources';

/** Date of the last pass over every document and reference. */
export const FRONTIER_CROSSWALK_AS_OF = '2026-09-30';

/** Schema version of frontier-safety-crosswalk.json / .csv. */
export const frontierCrosswalkSchemaVersion = 1;

/** Page route, shared by the page, the exports and the wiring. */
export const FRONTIER_CROSSWALK_PATH = '/resources/frontier-safety-crosswalk';

export interface FrontierDoc {
  /** Framework id used by the refs and the column. */
  frameworkId: string;
  name: string;
  short: string;
  issuer: string;
  /** Version as the document states it. */
  version: string;
  /** Effective or last-updated date as the document states it (YYYY-MM-DD). */
  effective: string;
  /** Landing page. */
  url: string;
  /** The document itself, where it is a PDF. */
  pdfUrl?: string;
  /** Source number [n] of the document in `frontierCrosswalkSources`. */
  source: number;
  /** A related compliance document (e.g. the SB 53 frontier AI framework). */
  companion?: { name: string; date: string; url: string; note: string; source: number };
}

export interface FrontierRef extends CrosswalkRef {
  /** Verbatim quote from the section, at most 25 words. */
  quote?: string;
}

export interface FrontierGap {
  topic: string;
  framework: string;
  /** One neutral sentence: why no section maps. */
  note: string;
}

export interface FrontierDimension extends Topic {
  /** The question the row answers. */
  question: string;
}

/** Sources [1]-[3] are the three lab policies, [4] NIST AI RMF, [5] ISO/IEC 42001. */
export const frontierDocs: readonly FrontierDoc[] = [
  {
    frameworkId: 'anthropic-rsp',
    name: 'Responsible Scaling Policy',
    short: 'Anthropic RSP',
    issuer: 'Anthropic',
    version: 'Version 3.4',
    effective: '2026-07-08',
    url: 'https://www.anthropic.com/responsible-scaling-policy',
    pdfUrl: 'https://www-cdn.anthropic.com/files/4zrzovbb/website/0bacdc8440ea96e62a8766d99ebe1d4eea6d5f3a.pdf',
    source: 1,
    companion: {
      name: 'Frontier Compliance Framework',
      date: '2025-12-19',
      url: 'https://www.anthropic.com/news/compliance-framework-SB53',
      note: "Anthropic's framework under California SB 53; the announcement says the RSP remains its voluntary safety policy. Read through the announcement only.",
      source: 6,
    },
  },
  {
    frameworkId: 'openai-preparedness',
    name: 'Preparedness Framework',
    short: 'OpenAI PF',
    issuer: 'OpenAI',
    version: 'Version 2',
    effective: '2025-04-15',
    url: 'https://openai.com/index/updating-our-preparedness-framework/',
    pdfUrl: 'https://cdn.openai.com/pdf/18a02b5d-6b67-4cec-ab64-68cdfbddebcd/preparedness-framework-v2.pdf',
    source: 2,
    companion: {
      name: 'Frontier Governance Framework',
      date: '2026-05-28',
      url: 'https://openai.com/index/openai-frontier-governance-framework/',
      note: "OpenAI's framework under California SB 53 and its public summary under the EU GPAI Code of Practice; OpenAI says the Preparedness Framework remains the foundation.",
      source: 7,
    },
  },
  {
    frameworkId: 'deepmind-fsf',
    name: 'Frontier Safety Framework',
    short: 'DeepMind FSF',
    issuer: 'Google DeepMind',
    version: 'Version 3.1',
    effective: '2026-04-17',
    url: 'https://deepmind.google/frontier-safety/',
    pdfUrl: 'https://storage.googleapis.com/deepmind-media/DeepMind.com/Blog/strengthening-our-frontier-safety-framework/frontier-safety-framework_3-1.pdf',
    source: 3,
  },
  {
    frameworkId: 'nist-ai-rmf',
    name: 'AI Risk Management Framework (AI RMF 1.0)',
    short: 'NIST AI RMF',
    issuer: 'NIST',
    version: 'AI RMF 1.0 (NIST AI 100-1)',
    effective: '2023-01-26',
    url: 'https://www.nist.gov/itl/ai-risk-management-framework',
    pdfUrl: 'https://nvlpubs.nist.gov/nistpubs/ai/NIST.AI.100-1.pdf',
    source: 4,
  },
  {
    frameworkId: 'iso-42001',
    name: 'ISO/IEC 42001:2023 AI management system',
    short: 'ISO 42001',
    issuer: 'ISO/IEC',
    version: 'ISO/IEC 42001:2023',
    effective: '2023-12-18',
    url: 'https://www.iso.org/standard/42001',
    source: 5,
  },
];

/** Numbered sources, in the house format (STYLEGUIDE.md §6). */
export const frontierCrosswalkSources: readonly Source[] = [
  {
    title: 'Responsible Scaling Policy, Version 3.4',
    gloss: 'effective 2026-07-08; threshold table, Risk Reports, governance, external review, change log',
    publisher: 'Anthropic',
    date: '2026-07-08',
    url: 'https://www-cdn.anthropic.com/files/4zrzovbb/website/0bacdc8440ea96e62a8766d99ebe1d4eea6d5f3a.pdf',
    verified: 'primary',
  },
  {
    title: 'Preparedness Framework, Version 2',
    gloss: 'last updated 2025-04-15; Tracked and Research Categories, High and Critical thresholds, Safeguards Reports, Safety Advisory Group',
    publisher: 'OpenAI',
    date: '2025-04-15',
    url: 'https://cdn.openai.com/pdf/18a02b5d-6b67-4cec-ab64-68cdfbddebcd/preparedness-framework-v2.pdf',
    verified: 'primary',
  },
  {
    title: 'Frontier Safety Framework, Version 3.1',
    gloss: 'Critical and Tracked Capability Levels, security and deployment mitigations, governance, updates',
    publisher: 'Google DeepMind',
    date: '2026-04-17',
    url: 'https://storage.googleapis.com/deepmind-media/DeepMind.com/Blog/strengthening-our-frontier-safety-framework/frontier-safety-framework_3-1.pdf',
    verified: 'primary',
  },
  {
    title: 'Artificial Intelligence Risk Management Framework (AI RMF 1.0), NIST AI 100-1',
    gloss: 'subcategory statements as printed in Tables 1 to 4',
    publisher: 'NIST',
    date: '2023-01',
    url: 'https://nvlpubs.nist.gov/nistpubs/ai/NIST.AI.100-1.pdf',
    verified: 'primary',
  },
  {
    title: 'ISO/IEC 42001:2023 Information technology, Artificial intelligence, Management system',
    gloss: "catalogue page; clause numbers and titles as in the site's topic crosswalk, text not quoted",
    publisher: 'ISO/IEC',
    date: '2023-12',
    url: 'https://www.iso.org/standard/42001',
    verified: 'primary',
  },
  {
    title: "Anthropic's Frontier Compliance Framework (announcement)",
    gloss: 'the framework Anthropic publishes under California SB 53',
    publisher: 'Anthropic',
    date: '2025-12-19',
    url: 'https://www.anthropic.com/news/compliance-framework-SB53',
    verified: 'primary',
  },
  {
    title: 'OpenAI Frontier Governance Framework',
    gloss: "OpenAI's framework under California SB 53 and public summary under the EU GPAI Code of Practice",
    publisher: 'OpenAI',
    date: '2026-05-28',
    url: 'https://openai.com/index/openai-frontier-governance-framework/',
    verified: 'primary',
  },
  {
    title: 'Path to Astra: critical capabilities and frontier safeguards',
    gloss: 'says a model meets the Critical cybersecurity threshold under the Preparedness Framework',
    publisher: 'OpenAI',
    date: '2026-09-01',
    url: 'https://openai.com/index/path-to-astra/',
    verified: 'primary',
  },
];

/** The dimensions (rows), in display order. */
export const dimensions: readonly FrontierDimension[] = [
  {
    id: 'scope',
    name: 'Risk domains covered',
    question: 'Which catastrophic-risk domains does the policy track, and which are research categories only?',
    summary:
      'Anthropic\'s threshold table has four rows: two for chemical and biological weapons, one for misaligned AI in high-stakes settings and one for automated R&D [1]. OpenAI tracks biological and chemical, cybersecurity and AI self-improvement, and keeps other areas, nuclear and radiological among them, as research categories [2]. Google DeepMind sets levels for CBRN, cyber, harmful manipulation (labelled exploratory), machine learning R&D and misalignment [3]. NIST and ISO ask an organisation to identify its risks without naming a domain [4][5].',
  },
  {
    id: 'thresholds',
    name: 'Capability thresholds',
    question: 'How does the policy define the capability levels that change what the lab must do?',
    summary:
      'Anthropic sets thresholds in a table of capabilities, planned mitigations and industry-wide recommendations, and keeps AI Safety Levels only to describe present mitigations [1]. OpenAI defines High and Critical thresholds for each tracked category [2]. Google DeepMind defines Critical Capability Levels and, in version 3.1, lower Tracked Capability Levels [3]. NIST\'s risk tolerance subcategory and ISO\'s risk assessment and treatment clauses are the closest generic counterparts; neither defines capability levels [4][5].',
  },
  {
    id: 'triggers',
    name: 'Evaluation triggers and cadence',
    question: 'When must a model be evaluated: before deployment, on a schedule, or when its capability changes?',
    summary:
      'Anthropic ties evaluation to Risk Reports on a fixed cadence, with an off-cycle analysis when a model is significantly more capable than those already analysed [1]. OpenAI evaluates every covered model before deployment and lists what counts as a covered deployment [2]. Google DeepMind requires an assessment before first external deployment and checks later checkpoints for material capability change against alert thresholds [3]. Neither Anthropic\'s nor OpenAI\'s current text sets a compute-based trigger. NIST and ISO place evaluation inside the ongoing risk process [4][5].',
  },
  {
    id: 'methods',
    name: 'Evaluation method and validity',
    question: 'How are capabilities elicited, and how is the result\'s validity argued?',
    summary:
      'Anthropic does not prespecify evaluations; it asks for analysis and arguments that make a strong case for safety, and notes that models may detect testing [1]. OpenAI aims elicitation at the high end of what threat actors could achieve and treats sandbagging as a research category [2]. Google DeepMind describes early-warning evaluations with scaffolding and extra inference compute, and a safety buffer below each level [3]. NIST\'s MEASURE function is the generic counterpart; ISO\'s monitoring and measurement clause touches it [4][5].',
  },
  {
    id: 'deployment-safeguards',
    name: 'Deployment safeguards',
    question: 'What must be in place before a model that reaches a threshold is deployed?',
    summary:
      'Anthropic plans to keep ASL-3 protections for its chemical and biological thresholds and describes implemented mitigations in each Risk Report [1]. OpenAI requires a Safeguards Report and safeguards that sufficiently minimise the risk before a model at High capability is deployed [2]. Google DeepMind sets a develop, review and update process, with a safety case at a Critical Capability Level [3]. NIST\'s MANAGE function and ISO\'s risk treatment clauses hold the same decision in generic form [4][5].',
  },
  {
    id: 'security',
    name: 'Security of model weights',
    question: 'What protection of model weights and infrastructure does the policy require or recommend?',
    summary:
      'Anthropic recommends, as an industry-wide measure, weight protection likely in line with RAND SL4 at the novel chemical and biological threshold, and protection against state actors and insiders for automated R&D [1]. OpenAI lists the security practices required for High capability models [2]. Google DeepMind aligns its recommended security levels with the RAND framework for model weight security [3]. NIST covers security and resilience in MEASURE 2.7; the ISO/IEC 42001 clauses in this crosswalk do not address it [4][5].',
  },
  {
    id: 'go-no-go',
    name: 'Deploy, pause or stop decision',
    question: 'Who decides whether to deploy, restrict, pause or stop, and by which rule?',
    summary:
      'Anthropic\'s CEO and Responsible Scaling Officer approve each Risk Report and decide on deployment and development plans; its commitments to delay depend on what competitors do [1]. OpenAI\'s Safety Advisory Group recommends and OpenAI Leadership decides; for Critical thresholds the guideline is to halt further development until safeguards are specified [2]. Google DeepMind proceeds only when the appropriate governance function finds the residual risk acceptable [3]. NIST asks whether development or deployment should proceed (MANAGE 1.1) [4][5].',
  },
  {
    id: 'governance',
    name: 'Roles and accountability',
    question: 'Which roles or bodies own the policy and approve decisions under it?',
    summary:
      'Anthropic names a Responsible Scaling Officer and gives its Board, with the Long-Term Benefit Trust, a role in decisions and policy changes [1]. OpenAI sets out the Safety Advisory Group, Leadership as final decision maker and oversight by a committee of its Board [2]. Google DeepMind allocates responsibilities across legal, compliance and safety reviews without naming a body [3]. NIST GOVERN 2 and ISO clause 5 cover roles and leadership in any organisation [4][5].',
  },
  {
    id: 'transparency',
    name: 'Public reporting',
    question: 'What does the policy commit the lab to publish?',
    summary:
      'Anthropic publishes a public version of each Risk Report and lists its grounds for redaction [1]. OpenAI commits to publishing Preparedness results for major deployments, possibly redacted or summarised [2]. Google DeepMind\'s framework aims to share information with government authorities in defined cases; its per-model reports are separate documents, not a commitment in the framework text [3]. NIST and ISO touch transparency as information for users and interested parties [4][5].',
  },
  {
    id: 'external-review',
    name: 'External review',
    question: 'What external or third-party review of the models or of the policy does the lab seek?',
    summary:
      'Anthropic specifies external review of Risk Reports and a yearly third-party review of procedural compliance [1]. OpenAI covers third-party evaluations, stress tests of safeguards and independent security audits [2]. Google DeepMind lists involving external parties where appropriate among its aims [3]. NIST asks for independent assessors; the ISO/IEC 42001 clauses in this crosswalk do not cover external review [4][5].',
  },
  {
    id: 'reporting',
    name: 'Internal reporting and non-compliance',
    question: 'How are non-compliance, concerns and incidents reported inside the lab?',
    summary:
      'Anthropic and OpenAI both describe a route for staff to report potential noncompliance, which is investigated; Anthropic adds anti-retaliation protection [1][2]. Google DeepMind mentions escalation procedures and incident reporting in post-market monitoring, without a channel for staff [3]. NIST\'s incident communication subcategory and ISO\'s nonconformity and corrective action clause are the generic counterparts [4][5].',
  },
  {
    id: 'change',
    name: 'Policy versioning and updates',
    question: 'How is the policy itself reviewed, changed and versioned?',
    summary:
      'All three are versioned documents with a change log. Anthropic\'s Board approves changes in consultation with the Long-Term Benefit Trust [1]; OpenAI reviews its framework at least once a year through its decision process [2]; Google DeepMind reviews its framework at least once a year [3]. NIST and ISO ask for periodic review of policies and control of documented information [4][5].',
  },
  {
    id: 'regulatory',
    name: 'Link to regulation',
    question: 'How does the policy relate to law, such as California SB 53 or the EU GPAI Code of Practice?',
    summary:
      'Anthropic says the RSP is not designed to meet every regulatory requirement and handles statutory definitions, such as those of California SB 53, in separate compliance frameworks [1][6]. OpenAI\'s Preparedness Framework does not refer to a law; its Frontier Governance Framework serves as its SB 53 framework and EU GPAI Code summary [2][7]. Google DeepMind\'s framework aims to share information with governments but names no law [3]. NIST GOVERN 1.1 asks that legal requirements be understood; the ISO/IEC 42001 clauses here do not address them [4][5].',
  },
];

/** "Three readings": one paragraph per audience, with `[n]` markers. */
export const frontierReadings: readonly {
  title: string;
  text: string;
  links: readonly { label: string; href: string }[];
}[] = [
  {
    title: 'For policy teams',
    text: 'Read a row across to see how three labs answer the same governance question, then check the version strip: each policy changes on its own schedule [1][2][3]. Where binding law meets these policies, start from the regulatory row and the companion compliance documents [6][7].',
    links: [
      { label: 'The topic crosswalk of laws and standards', href: '/resources/crosswalk' },
      { label: 'Frontier-developer laws in chapter 08', href: '/bok/regulatory-map' },
    ],
  },
  {
    title: 'For engineers',
    text: 'The thresholds, triggers and methods rows describe the evaluation work these policies assume: repeatable capability evaluations, elicitation that is argued rather than assumed, and records a reviewer can check [1][2][3]. The site turns that work into controls you can run.',
    links: [
      { label: 'Frontier AI evaluation assurance', href: '/frontier' },
      { label: 'The open controls and their profiles', href: '/controls' },
    ],
  },
  {
    title: 'For auditors',
    text: 'An organisation that runs an ISO/IEC 42001 management system can use the ISO column to see where a policy of this kind would sit in it, and the documented gaps in that column to see what a frontier policy adds on top [5]. NIST subcategories give the same view for an AI RMF profile [4].',
    links: [
      { label: 'The obligation register', href: '/obligations' },
      { label: 'The Framework Crosswalk pattern', href: '/bok/patterns#pattern-framework-crosswalk' },
    ],
  },
];

/** "Limits and method": one bullet each, with `[n]` markers. */
export const frontierLimits: readonly string[] = [
  'Only the three policies are mapped. System cards, per-model reports, safety cases and research papers are left out, although the policies refer to them [1][2][3].',
  "Policy text can lag practice. OpenAI's Version 2 still says no model has reached Critical capability, while OpenAI said on 1 Sep 2026 that a model meets the Critical cybersecurity threshold under that framework [2][8]. This page maps the text as published.",
  "Anthropic's companion compliance framework was read through its announcement only; its own version and date were not checked [6].",
  "Page numbers are PDF pages, the ones the #page= links open. In OpenAI's PDF they run one ahead of the printed numbers.",
  'The page is updated when any of the three labs publishes a new version: the as-of date, the version strip and every cell change together.',
];

/** Every dimension -> section reference, by dimension then column. */
export const frontierRefs: readonly FrontierRef[] = [
  {
    topic: 'scope',
    framework: 'anthropic-rsp',
    ref: '§1 p. 6',
    title: '1. Our Recommendations for Industry-Wide Safety',
    url: 'https://www-cdn.anthropic.com/files/4zrzovbb/website/0bacdc8440ea96e62a8766d99ebe1d4eea6d5f3a.pdf#page=6',
    strength: 'core',
    verified: true,
    note: 'The threshold table has four rows: non-novel chemical/biological weapons production, novel chemical/biological weapons production, misaligned AI systems in high-stakes settings, and automated R&D in key domains; cyber and persuasion have no row.',
  },
  {
    topic: 'scope',
    framework: 'anthropic-rsp',
    ref: '§1 p. 8',
    title: '1. Our Recommendations for Industry-Wide Safety',
    url: 'https://www-cdn.anthropic.com/files/4zrzovbb/website/0bacdc8440ea96e62a8766d99ebe1d4eea6d5f3a.pdf#page=8',
    strength: 'related',
    verified: true,
    note: 'The automated R&D row names energy, robotics, weapons development and AI itself as domains, and states that evaluations currently focus on AI R&D.',
    quote: 'For now, our evaluations will focus specifically on AI R&D, as this domain likely plays to AI systems\' current strengths',
  },
  {
    topic: 'scope',
    framework: 'anthropic-rsp',
    ref: 'Intro p. 3',
    title: 'Introduction',
    url: 'https://www-cdn.anthropic.com/files/4zrzovbb/website/0bacdc8440ea96e62a8766d99ebe1d4eea6d5f3a.pdf#page=3',
    strength: 'related',
    verified: true,
    note: 'The policy is limited to catastrophic risks; other risks are handled through the Usage Policy and societal impacts research.',
    quote: 'although this policy focuses on catastrophic risks, they are not the only risks we consider important',
  },
  {
    topic: 'scope',
    framework: 'openai-preparedness',
    ref: '§2.2',
    title: 'Tracked Categories',
    url: 'https://cdn.openai.com/pdf/18a02b5d-6b67-4cec-ab64-68cdfbddebcd/preparedness-framework-v2.pdf#page=5',
    strength: 'core',
    verified: true,
    note: 'Defines three Tracked Categories (Biological and Chemical, Cybersecurity, AI Self-improvement), each with a threat model approved by the SAG.',
  },
  {
    topic: 'scope',
    framework: 'openai-preparedness',
    ref: '§2.3',
    title: 'Research Categories',
    url: 'https://cdn.openai.com/pdf/18a02b5d-6b67-4cec-ab64-68cdfbddebcd/preparedness-framework-v2.pdf#page=7',
    strength: 'core',
    verified: true,
    note: 'Lists Research Categories that do not yet meet the tracking criteria: Long-range Autonomy, Sandbagging, Autonomous Replication and Adaptation, Undermining Safeguards, Nuclear and Radiological.',
  },
  {
    topic: 'scope',
    framework: 'openai-preparedness',
    ref: '§2.3 (box)',
    title: 'Changes to Tracked Categories in version 2',
    url: 'https://cdn.openai.com/pdf/18a02b5d-6b67-4cec-ab64-68cdfbddebcd/preparedness-framework-v2.pdf#page=8',
    strength: 'related',
    verified: true,
    note: 'Explains the split of former Model Autonomy, the move of Nuclear and Radiological to a Research Category, and that Persuasion is handled outside the Framework (text continues on PDF page 9).',
    quote: 'Persuasion category risks do not fit the criteria for inclusion.',
  },
  {
    topic: 'scope',
    framework: 'deepmind-fsf',
    ref: '§1.2',
    title: '1.2 Critical Capability Levels and Tracked Capability Levels',
    url: 'https://storage.googleapis.com/deepmind-media/DeepMind.com/Blog/strengthening-our-frontier-safety-framework/frontier-safety-framework_3-1.pdf#page=4',
    strength: 'core',
    verified: true,
    note: 'Defines CCLs for misuse risk in three domains (CBRN, cyber, harmful manipulation) and for machine learning R&D and misalignment risk.',
    quote: 'For misuse risk, we define CCLs in the following risk domains where the misuse of model capabilities',
  },
  {
    topic: 'scope',
    framework: 'deepmind-fsf',
    ref: '§1.3.1',
    title: '1.3.1 Risk Identification',
    url: 'https://storage.googleapis.com/deepmind-media/DeepMind.com/Blog/strengthening-our-frontier-safety-framework/frontier-safety-framework_3-1.pdf#page=5',
    strength: 'core',
    verified: true,
    note: 'Names the four identified risk domains and states that other domains continue to be assessed and the approach will be updated as appropriate.',
    quote: 'CBRN, cyber, harmful manipulation, as well as machine learning R&D and misalignment.',
  },
  {
    topic: 'scope',
    framework: 'deepmind-fsf',
    ref: '§2.2.3',
    title: '2.2.3 Harmful Manipulation',
    url: 'https://storage.googleapis.com/deepmind-media/DeepMind.com/Blog/strengthening-our-frontier-safety-framework/frontier-safety-framework_3-1.pdf#page=12',
    strength: 'related',
    verified: true,
    note: 'Labels the harmful manipulation CCL and its risk assessment as exploratory and subject to further research.',
    quote: 'The CCL and our assessment of the risk in this domain is exploratory and subject to further research',
  },
  {
    topic: 'scope',
    framework: 'nist-ai-rmf',
    ref: 'MAP 5.1',
    title: 'MAP 5.1: Likelihood and magnitude of each identified impact (both potentially beneficial and harmful) based on expected use, past uses of AI systems in similar contexts, public incident reports, feedback from those external to the team that developed or deployed the AI system, or other data are identified and documented.',
    url: 'https://nvlpubs.nist.gov/nistpubs/ai/NIST.AI.100-1.pdf',
    strength: 'core',
    verified: true,
    note: 'Asks for the likelihood and magnitude of each identified impact to be documented, the generic counterpart of naming the risk domains a policy tracks.',
  },
  {
    topic: 'scope',
    framework: 'nist-ai-rmf',
    ref: 'MEASURE 3.1',
    title: 'MEASURE 3.1: Approaches, personnel, and documentation are in place to regularly identify and track existing, unanticipated, and emergent AI risks based on factors such as intended and actual performance in deployed contexts.',
    url: 'https://nvlpubs.nist.gov/nistpubs/ai/NIST.AI.100-1.pdf',
    strength: 'related',
    verified: true,
    note: 'Covers identifying and tracking existing, unanticipated and emergent risks, which touches how new risk domains enter scope.',
  },
  {
    topic: 'scope',
    framework: 'iso-42001',
    ref: '6.1.2',
    title: 'AI risk assessment',
    url: 'https://www.iso.org/standard/42001',
    strength: 'core',
    verified: true,
    note: 'The AI risk assessment clause is where an organization identifies the AI risks it tracks; it names no catastrophic-risk categories.',
  },
  {
    topic: 'scope',
    framework: 'iso-42001',
    ref: '6.1.4',
    title: 'AI system impact assessment',
    url: 'https://www.iso.org/standard/42001',
    strength: 'related',
    verified: true,
    note: 'Covers assessing potential consequences of AI systems for individuals, groups and societies, which touches which harm domains are considered.',
  },
  {
    topic: 'thresholds',
    framework: 'anthropic-rsp',
    ref: '§1 p. 4',
    title: '1. Our Recommendations for Industry-Wide Safety',
    url: 'https://www-cdn.anthropic.com/files/4zrzovbb/website/0bacdc8440ea96e62a8766d99ebe1d4eea6d5f3a.pdf#page=4',
    strength: 'core',
    verified: true,
    note: 'Thresholds are set out in a three-column table: capability thresholds, the company\'s planned mitigations, and industry-wide recommendations.',
    quote: 'The left column identifies capability thresholds that would call for heightened mitigations.',
  },
  {
    topic: 'thresholds',
    framework: 'anthropic-rsp',
    ref: '§1 p. 9',
    title: '1. Our Recommendations for Industry-Wide Safety',
    url: 'https://www-cdn.anthropic.com/files/4zrzovbb/website/0bacdc8440ea96e62a8766d99ebe1d4eea6d5f3a.pdf#page=9',
    strength: 'core',
    verified: true,
    note: 'The automated R&D threshold is operationalized as full substitution for research staff at competitive cost or a defined dramatic acceleration of AI progress.',
    quote: 'our models would be able to fully substitute for our entire set of Research Scientists and Research Engineers, at competitive costs',
  },
  {
    topic: 'thresholds',
    framework: 'anthropic-rsp',
    ref: 'App. B p. 17',
    title: 'Appendix B: Notes on ASLs',
    url: 'https://www-cdn.anthropic.com/files/4zrzovbb/website/0bacdc8440ea96e62a8766d99ebe1d4eea6d5f3a.pdf#page=17',
    strength: 'related',
    verified: true,
    note: 'AI Safety Levels are retained only to describe present levels of mitigation, not to define required controls for future capability levels.',
    quote: 'Earlier editions of our RSP defined "AI Safety Levels" with specific lists of required controls.',
  },
  {
    topic: 'thresholds',
    framework: 'openai-preparedness',
    ref: '§2.2',
    title: 'Tracked Categories',
    url: 'https://cdn.openai.com/pdf/18a02b5d-6b67-4cec-ab64-68cdfbddebcd/preparedness-framework-v2.pdf#page=5',
    strength: 'core',
    verified: true,
    note: 'Defines High and Critical capability thresholds and what each requires (safeguards before deployment; safeguards during development for Critical).',
    quote: 'High capability thresholds mean capabilities that significantly increase existing risk vectors for severe harm.',
  },
  {
    topic: 'thresholds',
    framework: 'openai-preparedness',
    ref: '§2.2 Table 1',
    title: 'Table 1: Tracked Categories',
    url: 'https://cdn.openai.com/pdf/18a02b5d-6b67-4cec-ab64-68cdfbddebcd/preparedness-framework-v2.pdf#page=6',
    strength: 'core',
    verified: true,
    note: 'Gives the High and Critical threshold text, associated risk and risk-specific safeguard guidelines for each Tracked Category (table spans PDF pages 6 to 7).',
  },
  {
    topic: 'thresholds',
    framework: 'deepmind-fsf',
    ref: '§1.2',
    title: '1.2 Critical Capability Levels and Tracked Capability Levels',
    url: 'https://storage.googleapis.com/deepmind-media/DeepMind.com/Blog/strengthening-our-frontier-safety-framework/frontier-safety-framework_3-1.pdf#page=4',
    strength: 'core',
    verified: true,
    note: 'Defines Critical Capability Levels (severe harm) and introduces Tracked Capability Levels for significant risks at a lower capability threshold.',
    quote: 'TCLs are meant to capture significant risks that may manifest at a lower capability threshold than our CCLs',
  },
  {
    topic: 'thresholds',
    framework: 'deepmind-fsf',
    ref: '§2.2',
    title: '2.2 Misuse Capability Levels',
    url: 'https://storage.googleapis.com/deepmind-media/DeepMind.com/Blog/strengthening-our-frontier-safety-framework/frontier-safety-framework_3-1.pdf#page=11',
    strength: 'core',
    verified: true,
    note: 'Sets out the CBRN, cyber and harmful manipulation CCLs and the CBRN TCL, each CCL with a recommended security level (Tables 2.2.1.a to 2.2.3.a, pp. 11 to 12).',
  },
  {
    topic: 'thresholds',
    framework: 'deepmind-fsf',
    ref: '§3.2',
    title: '3.2 ML R&D and Misalignment Capability Levels',
    url: 'https://storage.googleapis.com/deepmind-media/DeepMind.com/Blog/strengthening-our-frontier-safety-framework/frontier-safety-framework_3-1.pdf#page=14',
    strength: 'core',
    verified: true,
    note: 'Sets a Stealth and Situational Awareness TCL and ML R&D acceleration and automation CCLs (Table 3.2.2.a, p. 15).',
  },
  {
    topic: 'thresholds',
    framework: 'nist-ai-rmf',
    ref: 'MAP 1.5',
    title: 'MAP 1.5: Organizational risk tolerances are determined and documented.',
    url: 'https://nvlpubs.nist.gov/nistpubs/ai/NIST.AI.100-1.pdf',
    strength: 'core',
    verified: true,
    note: 'Requires organizational risk tolerances to be determined and documented, the generic analogue of a capability threshold.',
  },
  {
    topic: 'thresholds',
    framework: 'nist-ai-rmf',
    ref: 'GOVERN 1.3',
    title: 'GOVERN 1.3: Processes, procedures, and practices are in place to determine the needed level of risk management activities based on the organization’s risk tolerance.',
    url: 'https://nvlpubs.nist.gov/nistpubs/ai/NIST.AI.100-1.pdf',
    strength: 'related',
    verified: true,
    note: 'Ties the level of risk management activity to the risk tolerance of the organization, as tiered safeguard levels do.',
  },
  {
    topic: 'thresholds',
    framework: 'iso-42001',
    ref: '6.1.2',
    title: 'AI risk assessment',
    url: 'https://www.iso.org/standard/42001',
    strength: 'related',
    verified: true,
    note: 'Covers analysing AI risks and evaluating them against risk criteria, the generic analogue of a threshold; it defines no capability levels.',
  },
  {
    topic: 'thresholds',
    framework: 'iso-42001',
    ref: '6.1.3',
    title: 'AI risk treatment',
    url: 'https://www.iso.org/standard/42001',
    strength: 'related',
    verified: true,
    note: 'Covers selecting treatment options and controls for assessed risks, which touches tying safeguards to a risk level.',
  },
  {
    topic: 'triggers',
    framework: 'anthropic-rsp',
    ref: '§3.1 p. 11',
    title: '3.1. Scope and Timing',
    url: 'https://www-cdn.anthropic.com/files/4zrzovbb/website/0bacdc8440ea96e62a8766d99ebe1d4eea6d5f3a.pdf#page=11',
    strength: 'core',
    verified: true,
    note: 'Risk Reports are published on a fixed cadence and cover publicly deployed models plus internally deployed models that exceed prior risk levels for misalignment or automated R&D.',
    quote: 'We will publish a Risk Report every 3-6 months.',
  },
  {
    topic: 'triggers',
    framework: 'anthropic-rsp',
    ref: '§3.1 off-cycle',
    title: '3.1. Scope and Timing',
    url: 'https://www-cdn.anthropic.com/files/4zrzovbb/website/0bacdc8440ea96e62a8766d99ebe1d4eea6d5f3a.pdf#page=11',
    strength: 'core',
    verified: true,
    note: 'An off-cycle risk analysis is required when a publicly deployed model is significantly more capable than previously analyzed models, and within 30 days for such an internally deployed model.',
  },
  {
    topic: 'triggers',
    framework: 'openai-preparedness',
    ref: '§3.2',
    title: 'Testing scope',
    url: 'https://cdn.openai.com/pdf/18a02b5d-6b67-4cec-ab64-68cdfbddebcd/preparedness-framework-v2.pdf#page=10',
    strength: 'core',
    verified: true,
    note: 'Lists covered deployments (frontier models to be deployed externally, significant internal agents, changed deployment conditions, unexpectedly capable updates) and allows a development checkpoint to be covered; no compute-based trigger or fixed calendar cadence is stated.',
  },
  {
    topic: 'triggers',
    framework: 'openai-preparedness',
    ref: '§3.3',
    title: 'Capability threshold determinations',
    url: 'https://cdn.openai.com/pdf/18a02b5d-6b67-4cec-ab64-68cdfbddebcd/preparedness-framework-v2.pdf#page=10',
    strength: 'core',
    verified: true,
    note: 'Every covered model undergoes the Scalable Evaluations prior to deployment and the results go to the SAG in a Capabilities Report.',
    quote: 'Prior to deployment, every covered model undergoes the suite of Scalable Evaluations.',
  },
  {
    topic: 'triggers',
    framework: 'deepmind-fsf',
    ref: '§1.3.2',
    title: '1.3.2 Inherent Risk Assessment',
    url: 'https://storage.googleapis.com/deepmind-media/DeepMind.com/Blog/strengthening-our-frontier-safety-framework/frontier-safety-framework_3-1.pdf#page=5',
    strength: 'core',
    verified: true,
    note: 'Requires a critical capability assessment before first external deployment, uses material capability change assessments on post-training checkpoints to decide whether later versions need one, and sets alert thresholds to flag a CCL before the next assessment.',
    quote: 'We conduct a critical capability assessment prior to the first external deployment',
  },
  {
    topic: 'triggers',
    framework: 'deepmind-fsf',
    ref: '§1.3',
    title: '1.3 Risk Management Process',
    url: 'https://storage.googleapis.com/deepmind-media/DeepMind.com/Blog/strengthening-our-frontier-safety-framework/frontier-safety-framework_3-1.pdf#page=5',
    strength: 'related',
    verified: true,
    note: 'States that the risk management process runs throughout model development, on checkpoints or versions, before and after deployment.',
    quote: 'throughout the model development process, on various checkpoints or versions of a model, both before and after deployment.',
  },
  {
    topic: 'triggers',
    framework: 'deepmind-fsf',
    ref: '§3.2.1',
    title: '3.2.1 Stealth and Situational Awareness Tracked Capability Level',
    url: 'https://storage.googleapis.com/deepmind-media/DeepMind.com/Blog/strengthening-our-frontier-safety-framework/frontier-safety-framework_3-1.pdf#page=14',
    strength: 'related',
    verified: true,
    note: 'Once this TCL is reached, periodic residual risk assessments of misalignment risk are carried out, including for high-risk internal deployments.',
    quote: 'When a model has reached this TCL, we will carry out periodic residual risk assessments of the misalignment risk posed.',
  },
  {
    topic: 'triggers',
    framework: 'nist-ai-rmf',
    ref: 'MEASURE 2.6',
    title: 'MEASURE 2.6: The AI system is evaluated regularly for safety risks – as identified in the MAP function. The AI system to be deployed is demonstrated to be safe, its residual negative risk does not exceed the risk tolerance, and it can fail safely, particularly if made to operate beyond its knowledge limits. Safety metrics reflect system reliability and robustness, real-time monitoring, and response times for AI system failures.',
    url: 'https://nvlpubs.nist.gov/nistpubs/ai/NIST.AI.100-1.pdf',
    strength: 'core',
    verified: true,
    note: 'Requires the AI system to be evaluated regularly for safety risks and shown to be within risk tolerance before deployment.',
  },
  {
    topic: 'triggers',
    framework: 'nist-ai-rmf',
    ref: 'MEASURE 3.1',
    title: 'MEASURE 3.1: Approaches, personnel, and documentation are in place to regularly identify and track existing, unanticipated, and emergent AI risks based on factors such as intended and actual performance in deployed contexts.',
    url: 'https://nvlpubs.nist.gov/nistpubs/ai/NIST.AI.100-1.pdf',
    strength: 'related',
    verified: true,
    note: 'Asks for approaches to regularly identify and track emergent risks, touching evaluation cadence.',
  },
  {
    topic: 'triggers',
    framework: 'iso-42001',
    ref: '8.2',
    title: 'AI risk assessment (operation)',
    url: 'https://www.iso.org/standard/42001',
    strength: 'core',
    verified: true,
    note: 'The operational clause on performing AI risk assessments at planned intervals and on significant change is the closest match to evaluation triggers.',
  },
  {
    topic: 'triggers',
    framework: 'iso-42001',
    ref: '8.4',
    title: 'AI system impact assessment (operation)',
    url: 'https://www.iso.org/standard/42001',
    strength: 'related',
    verified: true,
    note: 'The operational clause on performing AI system impact assessments at planned intervals touches assessment cadence.',
  },
  {
    topic: 'methods',
    framework: 'anthropic-rsp',
    ref: '§1 p. 4',
    title: '1. Our Recommendations for Industry-Wide Safety',
    url: 'https://www-cdn.anthropic.com/files/4zrzovbb/website/0bacdc8440ea96e62a8766d99ebe1d4eea6d5f3a.pdf#page=4',
    strength: 'core',
    verified: true,
    note: 'The policy states that it does not prespecify evaluations and instead requires analysis and arguments making a strong case for safety.',
    quote: 'we cannot presently give highly specific advance detail on what evaluations will determine whether risk thresholds have been passed',
  },
  {
    topic: 'methods',
    framework: 'anthropic-rsp',
    ref: '§3.3 p. 12',
    title: '3.3. Contents',
    url: 'https://www-cdn.anthropic.com/files/4zrzovbb/website/0bacdc8440ea96e62a8766d99ebe1d4eea6d5f3a.pdf#page=12',
    strength: 'related',
    verified: true,
    note: 'Each Risk Report must document capability and alignment evaluations for in-scope models, including evaluations by external parties where appropriate, and their results.',
    quote: 'capability and alignment evaluations (conducted internally and by external parties as appropriate), their results',
  },
  {
    topic: 'methods',
    framework: 'anthropic-rsp',
    ref: '§1 p. 8',
    title: '1. Our Recommendations for Industry-Wide Safety',
    url: 'https://www-cdn.anthropic.com/files/4zrzovbb/website/0bacdc8440ea96e62a8766d99ebe1d4eea6d5f3a.pdf#page=8',
    strength: 'related',
    verified: true,
    note: 'The misalignment row notes that models may increasingly be able to detect and manipulate testing, which limits the guarantees the company gives.',
    quote: 'an evolving technology that may increasingly have the ability to detect and manipulate testing.',
  },
  {
    topic: 'methods',
    framework: 'openai-preparedness',
    ref: '§3.1',
    title: 'Evaluation approach',
    url: 'https://cdn.openai.com/pdf/18a02b5d-6b67-4cec-ab64-68cdfbddebcd/preparedness-framework-v2.pdf#page=9',
    strength: 'core',
    verified: true,
    note: 'Describes elicitation aimed at the high end of expected threat-actor elicitation, Scalable Evaluations with indicative thresholds, and Deep Dives that validate them.',
    quote: 'we regard any one-time capability elicitation in a frontier model as a lower bound, rather than a ceiling, on capabilities',
  },
  {
    topic: 'methods',
    framework: 'openai-preparedness',
    ref: '§2.3 Table 2',
    title: 'Table 2: Research Categories',
    url: 'https://cdn.openai.com/pdf/18a02b5d-6b67-4cec-ab64-68cdfbddebcd/preparedness-framework-v2.pdf#page=8',
    strength: 'related',
    verified: true,
    note: 'The Sandbagging row sets the response when evaluation behaviour may diverge from performance under real conditions.',
    quote: 'Adopt elicitation approach that overcomes sandbagging, or use a conservative upper bound of the model\'s non-sandbagged evaluation results',
  },
  {
    topic: 'methods',
    framework: 'deepmind-fsf',
    ref: '§1.3.2',
    title: '1.3.2 Inherent Risk Assessment',
    url: 'https://storage.googleapis.com/deepmind-media/DeepMind.com/Blog/strengthening-our-frontier-safety-framework/frontier-safety-framework_3-1.pdf#page=5',
    strength: 'core',
    verified: true,
    note: 'Describes early warning evaluations and applying scaffolding, inference compute and other augmentations; continues on p. 6 with more frequent evaluation or adjusted alert thresholds if the safety buffer is no longer adequate.',
    quote: 'we seek to apply appropriate scaffolding, inference compute, and other augmentations',
  },
  {
    topic: 'methods',
    framework: 'deepmind-fsf',
    ref: '§1.3.2 note',
    title: 'Note on Machine Learning R&D CCLs',
    url: 'https://storage.googleapis.com/deepmind-media/DeepMind.com/Blog/strengthening-our-frontier-safety-framework/frontier-safety-framework_3-1.pdf#page=6',
    strength: 'related',
    verified: true,
    note: 'Notes that other actors may put more effort into elicitation than the assessment does, requiring conservatism, and allows internal ML R&D progress data to inform the ML R&D CCL assessment.',
    quote: 'other actors may put significantly more effort into eliciting capabilities than we put into assessing risk, thus requiring conservatism',
  },
  {
    topic: 'methods',
    framework: 'nist-ai-rmf',
    ref: 'MEASURE 2.5',
    title: 'MEASURE 2.5: The AI system to be deployed is demonstrated to be valid and reliable. Limitations of the generalizability beyond the conditions under which the technology was developed are documented.',
    url: 'https://nvlpubs.nist.gov/nistpubs/ai/NIST.AI.100-1.pdf',
    strength: 'core',
    verified: true,
    note: 'Requires the system to be demonstrated valid and reliable and the limits of generalizability to be documented.',
  },
  {
    topic: 'methods',
    framework: 'nist-ai-rmf',
    ref: 'MAP 2.3',
    title: 'MAP 2.3: Scientific integrity and TEVV considerations are identified and documented, including those related to experimental design, data collection and selection (e.g., availability, representativeness, suitability), system trustworthiness, and construct validation.',
    url: 'https://nvlpubs.nist.gov/nistpubs/ai/NIST.AI.100-1.pdf',
    strength: 'related',
    verified: true,
    note: 'Covers scientific integrity and TEVV considerations, including experimental design and construct validation.',
  },
  {
    topic: 'methods',
    framework: 'nist-ai-rmf',
    ref: 'MEASURE 2.13',
    title: 'MEASURE 2.13: Effectiveness of the employed TEVV metrics and processes in the MEASURE function are evaluated and documented.',
    url: 'https://nvlpubs.nist.gov/nistpubs/ai/NIST.AI.100-1.pdf',
    strength: 'related',
    verified: true,
    note: 'Asks for the effectiveness of the TEVV metrics and processes themselves to be evaluated.',
  },
  {
    topic: 'methods',
    framework: 'iso-42001',
    ref: '9.1',
    title: 'Monitoring, measurement, analysis and evaluation',
    url: 'https://www.iso.org/standard/42001',
    strength: 'related',
    verified: true,
    note: 'Covers determining methods for monitoring, measurement, analysis and evaluation so results are valid; it is not specific to capability elicitation.',
  },
  {
    topic: 'methods',
    framework: 'iso-42001',
    ref: 'A.6',
    title: 'AI system life cycle',
    url: 'https://www.iso.org/standard/42001',
    strength: 'related',
    verified: true,
    note: 'The life cycle control objective includes verification and validation of AI systems.',
  },
  {
    topic: 'deployment-safeguards',
    framework: 'anthropic-rsp',
    ref: '§1 p. 6',
    title: '1. Our Recommendations for Industry-Wide Safety',
    url: 'https://www-cdn.anthropic.com/files/4zrzovbb/website/0bacdc8440ea96e62a8766d99ebe1d4eea6d5f3a.pdf#page=6',
    strength: 'core',
    verified: true,
    note: 'For chemical/biological thresholds the company plans to maintain ASL-3 protections, extended to more use cases for the novel weapons threshold.',
    quote: 'classifier guards at least as robust as our initial Constitutional Classifiers; access controls for trusted users with exemptions to classifier guards',
  },
  {
    topic: 'deployment-safeguards',
    framework: 'anthropic-rsp',
    ref: '§3.3 p. 12',
    title: '3.3. Contents',
    url: 'https://www-cdn.anthropic.com/files/4zrzovbb/website/0bacdc8440ea96e62a8766d99ebe1d4eea6d5f3a.pdf#page=12',
    strength: 'related',
    verified: true,
    note: 'Risk Reports must describe implemented mitigations across security, deployment safeguards and alignment, with discussion of their effectiveness.',
  },
  {
    topic: 'deployment-safeguards',
    framework: 'openai-preparedness',
    ref: '§4.2',
    title: 'Safeguard sufficiency',
    url: 'https://cdn.openai.com/pdf/18a02b5d-6b67-4cec-ab64-68cdfbddebcd/preparedness-framework-v2.pdf#page=11',
    strength: 'core',
    verified: true,
    note: 'Defines the Safeguards Report (risk pathways mapped to safeguards, efficacy, residual risk, limitations) and requires safeguards that sufficiently minimize risk before deploying High capability systems (PDF pages 11 to 12).',
    quote: 'Covered systems that reach High capability must have safeguards that sufficiently minimize the associated risk of severe harm before they are deployed.',
  },
  {
    topic: 'deployment-safeguards',
    framework: 'openai-preparedness',
    ref: '§4.1',
    title: 'Safeguard selection',
    url: 'https://cdn.openai.com/pdf/18a02b5d-6b67-4cec-ab64-68cdfbddebcd/preparedness-framework-v2.pdf#page=11',
    strength: 'core',
    verified: true,
    note: 'Sets the selection process per threshold and separates safeguards against malicious users from safeguards against a misaligned model (Table 3).',
  },
  {
    topic: 'deployment-safeguards',
    framework: 'openai-preparedness',
    ref: 'App. C.1, C.2',
    title: 'C Illustrative safeguards, controls, and efficacy assessments',
    url: 'https://cdn.openai.com/pdf/18a02b5d-6b67-4cec-ab64-68cdfbddebcd/preparedness-framework-v2.pdf#page=17',
    strength: 'related',
    verified: true,
    note: 'Gives illustrative, non-exhaustive safeguards and efficacy assessments against malicious users (C.1) and a misaligned model (C.2, from PDF page 19).',
  },
  {
    topic: 'deployment-safeguards',
    framework: 'deepmind-fsf',
    ref: '§2.1.2',
    title: '2.1.2 Deployment Mitigations',
    url: 'https://storage.googleapis.com/deepmind-media/DeepMind.com/Blog/strengthening-our-frontier-safety-framework/frontier-safety-framework_3-1.pdf#page=10',
    strength: 'core',
    verified: true,
    note: 'Sets a three-step process for external deployments of models at a misuse T/CCL: develop and assess safeguards (with a safety case at a CCL), pre-deployment review, post-deployment updates.',
    quote: 'Where the model has reached a CCL, the residual risk assessment will be supplemented with a safety case.',
  },
  {
    topic: 'deployment-safeguards',
    framework: 'deepmind-fsf',
    ref: '§3.1.2',
    title: '3.1.2 Deployment Mitigations',
    url: 'https://storage.googleapis.com/deepmind-media/DeepMind.com/Blog/strengthening-our-frontier-safety-framework/frontier-safety-framework_3-1.pdf#page=13',
    strength: 'core',
    verified: true,
    note: 'Applies the same process to ML R&D and misalignment T/CCLs, adding high-risk internal deployments and measures such as limiting affordances, monitoring and escalation, auditing and alignment training.',
    quote: 'limiting affordances, monitoring and escalation, auditing, and alignment training',
  },
  {
    topic: 'deployment-safeguards',
    framework: 'deepmind-fsf',
    ref: '§1.3.3',
    title: '1.3.3 Risk Mitigation',
    url: 'https://storage.googleapis.com/deepmind-media/DeepMind.com/Blog/strengthening-our-frontier-safety-framework/frontier-safety-framework_3-1.pdf#page=6',
    strength: 'related',
    verified: true,
    note: 'Distinguishes security mitigations from deployment mitigations and states that specific mitigations may be determined when a T/CCL is reached.',
  },
  {
    topic: 'deployment-safeguards',
    framework: 'nist-ai-rmf',
    ref: 'MANAGE 1.3',
    title: 'MANAGE 1.3: Responses to the AI risks deemed high priority, as identified by the MAP function, are developed, planned, and documented. Risk response options can include mitigating, transferring, avoiding, or accepting.',
    url: 'https://nvlpubs.nist.gov/nistpubs/ai/NIST.AI.100-1.pdf',
    strength: 'core',
    verified: true,
    note: 'Requires responses to high priority AI risks, including mitigation, to be developed, planned and documented.',
  },
  {
    topic: 'deployment-safeguards',
    framework: 'nist-ai-rmf',
    ref: 'MANAGE 4.1',
    title: 'MANAGE 4.1: Post-deployment AI system monitoring plans are implemented, including mechanisms for capturing and evaluating input from users and other relevant AI actors, appeal and override, decommissioning, incident response, recovery, and change management.',
    url: 'https://nvlpubs.nist.gov/nistpubs/ai/NIST.AI.100-1.pdf',
    strength: 'related',
    verified: true,
    note: 'Covers post-deployment monitoring plans, incident response and override mechanisms.',
  },
  {
    topic: 'deployment-safeguards',
    framework: 'iso-42001',
    ref: '8.3',
    title: 'AI risk treatment (operation)',
    url: 'https://www.iso.org/standard/42001',
    strength: 'core',
    verified: true,
    note: 'The operational clause on implementing the AI risk treatment plan is the closest match to applying required safeguards.',
  },
  {
    topic: 'deployment-safeguards',
    framework: 'iso-42001',
    ref: '6.1.3',
    title: 'AI risk treatment',
    url: 'https://www.iso.org/standard/42001',
    strength: 'related',
    verified: true,
    note: 'Covers choosing risk treatment options and the controls needed to implement them.',
  },
  {
    topic: 'deployment-safeguards',
    framework: 'iso-42001',
    ref: 'A.6',
    title: 'AI system life cycle',
    url: 'https://www.iso.org/standard/42001',
    strength: 'related',
    verified: true,
    note: 'The life cycle control objective includes deployment, operation and monitoring of AI systems.',
  },
  {
    topic: 'security',
    framework: 'anthropic-rsp',
    ref: '§1 p. 7',
    title: '1. Our Recommendations for Industry-Wide Safety',
    url: 'https://www-cdn.anthropic.com/files/4zrzovbb/website/0bacdc8440ea96e62a8766d99ebe1d4eea6d5f3a.pdf#page=7',
    strength: 'core',
    verified: true,
    note: 'The industry-wide recommendation for this threshold includes protection against theft or modification of model weights, likely at a level in line with RAND SL4.',
    quote: 'This would likely mean security roughly in line with RAND SL4',
  },
  {
    topic: 'security',
    framework: 'anthropic-rsp',
    ref: '§1 p. 9',
    title: '1. Our Recommendations for Industry-Wide Safety',
    url: 'https://www-cdn.anthropic.com/files/4zrzovbb/website/0bacdc8440ea96e62a8766d99ebe1d4eea6d5f3a.pdf#page=9',
    strength: 'core',
    verified: true,
    note: 'The automated R&D recommendation extends security to top-tier state actors and to insiders, including the CEO and privileged technical staff.',
    quote: 'Even malicious employees and other insiders with maximal levels of access will not be significantly enabled to cause catastrophic harm.',
  },
  {
    topic: 'security',
    framework: 'openai-preparedness',
    ref: 'App. C.3',
    title: 'C.3 Security controls',
    url: 'https://cdn.openai.com/pdf/18a02b5d-6b67-4cec-ab64-68cdfbddebcd/preparedness-framework-v2.pdf#page=21',
    strength: 'core',
    verified: true,
    note: 'Lists security practices required for High capability models: threat modeling, defense in depth, least privilege, secure development and supply chain, operational security, independent audits.',
    quote: 'We will require the following practices for High capability models:',
  },
  {
    topic: 'security',
    framework: 'openai-preparedness',
    ref: '§4.4',
    title: 'Increasing safeguards before internal use and further development',
    url: 'https://cdn.openai.com/pdf/18a02b5d-6b67-4cec-ab64-68cdfbddebcd/preparedness-framework-v2.pdf#page=13',
    strength: 'related',
    verified: true,
    note: 'Critical capability models require safety and security controls during development, robust to internal and external malicious actors and to misalignment.',
  },
  {
    topic: 'security',
    framework: 'deepmind-fsf',
    ref: '§2.1.1',
    title: '2.1.1 Security Mitigations',
    url: 'https://storage.googleapis.com/deepmind-media/DeepMind.com/Blog/strengthening-our-frontier-safety-framework/frontier-safety-framework_3-1.pdf#page=9',
    strength: 'core',
    verified: true,
    note: 'Aligns security levels with the RAND model weight security framework and defines Security Level 2+ with added measures against insider threats and well-resourced non-state actors.',
    quote: 'We also define and recommend "Security Level 2+," which uses RAND Security Level 2 (SL2) as a baseline',
  },
  {
    topic: 'security',
    framework: 'deepmind-fsf',
    ref: '§3.1.1',
    title: '3.1.1 Security Mitigations',
    url: 'https://storage.googleapis.com/deepmind-media/DeepMind.com/Blog/strengthening-our-frontier-safety-framework/frontier-safety-framework_3-1.pdf#page=13',
    strength: 'core',
    verified: true,
    note: 'Covers exfiltration and unauthorized modification for ML R&D CCLs, including the model exfiltrating itself; Table 3.2.2.a (p. 15) recommends Security level 3 and 4.',
    quote: 'Security mitigations also protect against the risk of the model exfiltrating itself.',
  },
  {
    topic: 'security',
    framework: 'deepmind-fsf',
    ref: '§2.2',
    title: '2.2 Misuse Capability Levels',
    url: 'https://storage.googleapis.com/deepmind-media/DeepMind.com/Blog/strengthening-our-frontier-safety-framework/frontier-safety-framework_3-1.pdf#page=11',
    strength: 'related',
    verified: true,
    note: 'Presents recommended security levels as the minimum the frontier AI field should apply and states they are effective only if the whole field applies them.',
    quote: 'we believe these recommendations will only be effective if the entire frontier AI field applies them',
  },
  {
    topic: 'security',
    framework: 'nist-ai-rmf',
    ref: 'MEASURE 2.7',
    title: 'MEASURE 2.7: AI system security and resilience – as identified in the MAP function – are evaluated and documented.',
    url: 'https://nvlpubs.nist.gov/nistpubs/ai/NIST.AI.100-1.pdf',
    strength: 'core',
    verified: true,
    note: 'Requires AI system security and resilience to be evaluated and documented; it does not name model weights specifically.',
  },
  {
    topic: 'go-no-go',
    framework: 'anthropic-rsp',
    ref: '§3.4 p. 13',
    title: '3.4. Procedures',
    url: 'https://www-cdn.anthropic.com/files/4zrzovbb/website/0bacdc8440ea96e62a8766d99ebe1d4eea6d5f3a.pdf#page=13',
    strength: 'core',
    verified: true,
    note: 'The CEO and the RSO approve each Risk Report and decide on downstream deployment or development plans, then notify the Board and LTBT.',
    quote: 'The CEO and RSO will make the ultimate determination regarding the adequacy of the risk assessment and any downstream deployment or development plans.',
  },
  {
    topic: 'go-no-go',
    framework: 'anthropic-rsp',
    ref: '§3.4 item 5',
    title: '3.4. Procedures',
    url: 'https://www-cdn.anthropic.com/files/4zrzovbb/website/0bacdc8440ea96e62a8766d99ebe1d4eea6d5f3a.pdf#page=14',
    strength: 'core',
    verified: true,
    note: 'When marginal risk analysis plays a major role in a decision to move forward, the Board and LTBT must explicitly approve the Risk Report.',
  },
  {
    topic: 'go-no-go',
    framework: 'anthropic-rsp',
    ref: 'App. A p. 17',
    title: 'Appendix A: Commitments Related to Competitors',
    url: 'https://www-cdn.anthropic.com/files/4zrzovbb/website/0bacdc8440ea96e62a8766d99ebe1d4eea6d5f3a.pdf#page=17',
    strength: 'related',
    verified: true,
    note: 'Delay commitments are contingent on competitor scenarios, and the appendix states that pausing may be considered in other cases.',
    quote: 'we would strongly consider pausing development and/or deployment to improve the safety profiles of our models even in cases not covered below.',
  },
  {
    topic: 'go-no-go',
    framework: 'openai-preparedness',
    ref: '§4.2',
    title: 'Safeguard sufficiency',
    url: 'https://cdn.openai.com/pdf/18a02b5d-6b67-4cec-ab64-68cdfbddebcd/preparedness-framework-v2.pdf#page=12',
    strength: 'core',
    verified: true,
    note: 'Sets the SAG decision points (recommend deployment, request further evaluation, or recommend alternative conditions or additional safeguards), with recommendations going to OpenAI Leadership.',
  },
  {
    topic: 'go-no-go',
    framework: 'openai-preparedness',
    ref: '§2.2 Table 1',
    title: 'Table 1: Tracked Categories',
    url: 'https://cdn.openai.com/pdf/18a02b5d-6b67-4cec-ab64-68cdfbddebcd/preparedness-framework-v2.pdf#page=6',
    strength: 'core',
    verified: true,
    note: 'For each Critical threshold the safeguard guideline is to halt further development until Critical-standard safeguards and security controls are specified (quote from the Biological and Chemical row; the Cybersecurity row reads "security controls standards").',
    quote: 'Until we have specified safeguards and security controls that would meet a Critical standard, halt further development',
  },
  {
    topic: 'go-no-go',
    framework: 'openai-preparedness',
    ref: '§1',
    title: 'Introduction',
    url: 'https://cdn.openai.com/pdf/18a02b5d-6b67-4cec-ab64-68cdfbddebcd/preparedness-framework-v2.pdf#page=4',
    strength: 'related',
    verified: true,
    note: 'States the deployment rule for High thresholds and the development requirement for Critical thresholds.',
    quote: 'We do not deploy models that reach a High capability threshold until the associated risks that they pose are sufficiently minimized.',
  },
  {
    topic: 'go-no-go',
    framework: 'deepmind-fsf',
    ref: '§1.3.5',
    title: '1.3.5 Risk Acceptance Determination',
    url: 'https://storage.googleapis.com/deepmind-media/DeepMind.com/Blog/strengthening-our-frontier-safety-framework/frontier-safety-framework_3-1.pdf#page=7',
    strength: 'core',
    verified: true,
    note: 'Sets the conditions under which a model at a misuse T/CCL, an ML R&D CCL or the ML R&D and misalignment TCL is deemed acceptable for further development or deployment (continues on p. 8).',
  },
  {
    topic: 'go-no-go',
    framework: 'deepmind-fsf',
    ref: '§2.1.2',
    title: '2.1.2 Deployment Mitigations',
    url: 'https://storage.googleapis.com/deepmind-media/DeepMind.com/Blog/strengthening-our-frontier-safety-framework/frontier-safety-framework_3-1.pdf#page=10',
    strength: 'core',
    verified: true,
    note: 'External deployment proceeds only after the appropriate governance function determines residual risk acceptable; §3.1.2 (p. 14) extends this to high-risk internal deployments.',
    quote: 'external deployments of a model take place only after the appropriate governance function determines the residual risk to be acceptable',
  },
  {
    topic: 'go-no-go',
    framework: 'nist-ai-rmf',
    ref: 'MANAGE 1.1',
    title: 'MANAGE 1.1: A determination is made as to whether the AI system achieves its intended purposes and stated objectives and whether its development or deployment should proceed.',
    url: 'https://nvlpubs.nist.gov/nistpubs/ai/NIST.AI.100-1.pdf',
    strength: 'core',
    verified: true,
    note: 'Requires a determination of whether development or deployment of the AI system should proceed.',
  },
  {
    topic: 'go-no-go',
    framework: 'nist-ai-rmf',
    ref: 'MANAGE 2.4',
    title: 'MANAGE 2.4: Mechanisms are in place and applied, and responsibilities are assigned and understood, to supersede, disengage, or deactivate AI systems that demonstrate performance or outcomes inconsistent with intended use.',
    url: 'https://nvlpubs.nist.gov/nistpubs/ai/NIST.AI.100-1.pdf',
    strength: 'related',
    verified: true,
    note: 'Covers mechanisms and assigned responsibilities to supersede, disengage or deactivate AI systems.',
  },
  {
    topic: 'go-no-go',
    framework: 'nist-ai-rmf',
    ref: 'GOVERN 2.3',
    title: 'GOVERN 2.3: Executive leadership of the organization takes responsibility for decisions about risks associated with AI system development and deployment.',
    url: 'https://nvlpubs.nist.gov/nistpubs/ai/NIST.AI.100-1.pdf',
    strength: 'related',
    verified: true,
    note: 'Places responsibility for decisions about AI development and deployment risks with executive leadership.',
  },
  {
    topic: 'go-no-go',
    framework: 'iso-42001',
    ref: '6.1.3',
    title: 'AI risk treatment',
    url: 'https://www.iso.org/standard/42001',
    strength: 'related',
    verified: true,
    note: 'Risk treatment option selection touches the decision to proceed, restrict or avoid; it sets no pause or stop rule.',
  },
  {
    topic: 'go-no-go',
    framework: 'iso-42001',
    ref: 'A.6',
    title: 'AI system life cycle',
    url: 'https://www.iso.org/standard/42001',
    strength: 'related',
    verified: true,
    note: 'The life cycle control objective covers the deployment stage at which a deploy decision is taken.',
  },
  {
    topic: 'governance',
    framework: 'anthropic-rsp',
    ref: '§4 item 1',
    title: '4. Governance',
    url: 'https://www-cdn.anthropic.com/files/4zrzovbb/website/0bacdc8440ea96e62a8766d99ebe1d4eea6d5f3a.pdf#page=16',
    strength: 'core',
    verified: true,
    note: 'The Responsible Scaling Officer is responsible for implementing the policy, with six listed duties including approving development or deployment decisions.',
    quote: 'a designated member of staff who is responsible for the implementation of this policy',
  },
  {
    topic: 'governance',
    framework: 'anthropic-rsp',
    ref: '§4 items 2, 8',
    title: '4. Governance',
    url: 'https://www-cdn.anthropic.com/files/4zrzovbb/website/0bacdc8440ea96e62a8766d99ebe1d4eea6d5f3a.pdf#page=16',
    strength: 'core',
    verified: true,
    note: 'The LTBT is regularly briefed on Risk Report matters, and the Board approves policy changes in consultation with the LTBT.',
  },
  {
    topic: 'governance',
    framework: 'anthropic-rsp',
    ref: '§3.4 item 4',
    title: '3.4. Procedures',
    url: 'https://www-cdn.anthropic.com/files/4zrzovbb/website/0bacdc8440ea96e62a8766d99ebe1d4eea6d5f3a.pdf#page=13',
    strength: 'related',
    verified: true,
    note: 'After approval, the CEO and RSO share decisions, the Risk Report and internal feedback with the Board and LTBT.',
  },
  {
    topic: 'governance',
    framework: 'openai-preparedness',
    ref: 'App. B',
    title: 'B Decision-making practices',
    url: 'https://cdn.openai.com/pdf/18a02b5d-6b67-4cec-ab64-68cdfbddebcd/preparedness-framework-v2.pdf#page=16',
    strength: 'core',
    verified: true,
    note: 'Sets SAG responsibilities and membership, OpenAI Leadership (CEO or designee) as final decision maker, and oversight by the Board\'s Safety and Security Committee, with the Board able to reverse a decision.',
    quote: 'Making all final decisions, including accepting any residual risks and making deployment go/no-go decisions, informed by SAG\'s recommendations.',
  },
  {
    topic: 'governance',
    framework: 'openai-preparedness',
    ref: '§5.1',
    title: 'Internal governance',
    url: 'https://cdn.openai.com/pdf/18a02b5d-6b67-4cec-ab64-68cdfbddebcd/preparedness-framework-v2.pdf#page=13',
    strength: 'related',
    verified: true,
    note: 'Refers to the decision-making practices in Appendix B and commits to documenting reports to the SAG and its decisions and reasoning.',
  },
  {
    topic: 'governance',
    framework: 'deepmind-fsf',
    ref: '§4.1',
    title: '4.1 Governance structure',
    url: 'https://storage.googleapis.com/deepmind-media/DeepMind.com/Blog/strengthening-our-frontier-safety-framework/frontier-safety-framework_3-1.pdf#page=16',
    strength: 'core',
    verified: true,
    note: 'States that responsibilities are allocated across the organization with legal, compliance and safety reviews and escalation procedures; it names no specific body or role.',
    quote: 'This includes legal, compliance, and safety reviews with escalation procedures to ensure appropriate oversight.',
  },
  {
    topic: 'governance',
    framework: 'deepmind-fsf',
    ref: '§5.1',
    title: '5.1 Updates',
    url: 'https://storage.googleapis.com/deepmind-media/DeepMind.com/Blog/strengthening-our-frontier-safety-framework/frontier-safety-framework_3-1.pdf#page=17',
    strength: 'related',
    verified: true,
    note: 'States that the updated Framework and the framework assessment are reviewed by the appropriate corporate governance bodies.',
    quote: 'The updated version and framework assessment will be reviewed by the appropriate corporate governance bodies.',
  },
  {
    topic: 'governance',
    framework: 'nist-ai-rmf',
    ref: 'GOVERN 2.1',
    title: 'GOVERN 2.1: Roles and responsibilities and lines of communication related to mapping, measuring, and managing AI risks are documented and are clear to individuals and teams throughout the organization.',
    url: 'https://nvlpubs.nist.gov/nistpubs/ai/NIST.AI.100-1.pdf',
    strength: 'core',
    verified: true,
    note: 'Requires roles, responsibilities and lines of communication for AI risk management to be documented and clear.',
  },
  {
    topic: 'governance',
    framework: 'nist-ai-rmf',
    ref: 'GOVERN 2.3',
    title: 'GOVERN 2.3: Executive leadership of the organization takes responsibility for decisions about risks associated with AI system development and deployment.',
    url: 'https://nvlpubs.nist.gov/nistpubs/ai/NIST.AI.100-1.pdf',
    strength: 'core',
    verified: true,
    note: 'Assigns executive leadership responsibility for decisions about AI risks in development and deployment.',
  },
  {
    topic: 'governance',
    framework: 'iso-42001',
    ref: '5.3',
    title: 'Roles, responsibilities and authorities',
    url: 'https://www.iso.org/standard/42001',
    strength: 'core',
    verified: true,
    note: 'Requires top management to assign and communicate responsibilities and authorities for relevant roles.',
  },
  {
    topic: 'governance',
    framework: 'iso-42001',
    ref: '5.1',
    title: 'Leadership and commitment',
    url: 'https://www.iso.org/standard/42001',
    strength: 'related',
    verified: true,
    note: 'Covers top management leadership and commitment to the AI management system.',
  },
  {
    topic: 'governance',
    framework: 'iso-42001',
    ref: 'A.3',
    title: 'Internal organization',
    url: 'https://www.iso.org/standard/42001',
    strength: 'related',
    verified: true,
    note: 'The internal organization control objective covers AI roles and responsibilities within the organization.',
  },
  {
    topic: 'transparency',
    framework: 'anthropic-rsp',
    ref: '§3.5 p. 14',
    title: '3.5. Publication and Redactions',
    url: 'https://www-cdn.anthropic.com/files/4zrzovbb/website/0bacdc8440ea96e62a8766d99ebe1d4eea6d5f3a.pdf#page=14',
    strength: 'core',
    verified: true,
    note: 'A public version of each Risk Report is published, with listed grounds for redaction and disclosure of the existence of each redaction.',
    quote: 'We will publish a public version of our Risk Report.',
  },
  {
    topic: 'transparency',
    framework: 'anthropic-rsp',
    ref: '§2 p. 11',
    title: '2. Frontier Safety Roadmap',
    url: 'https://www-cdn.anthropic.com/files/4zrzovbb/website/0bacdc8440ea96e62a8766d99ebe1d4eea6d5f3a.pdf#page=11',
    strength: 'related',
    verified: true,
    note: 'The Frontier Safety Roadmap is published in redacted form with updates on whether its goals are achieved.',
  },
  {
    topic: 'transparency',
    framework: 'anthropic-rsp',
    ref: '§4 item 3',
    title: '4. Governance',
    url: 'https://www-cdn.anthropic.com/files/4zrzovbb/website/0bacdc8440ea96e62a8766d99ebe1d4eea6d5f3a.pdf#page=16',
    strength: 'related',
    verified: true,
    note: 'Unredacted Risk Reports go to at least 200 employees and minimally redacted versions to all regular-clearance staff.',
  },
  {
    topic: 'transparency',
    framework: 'openai-preparedness',
    ref: '§5.2',
    title: 'Transparency and external participation',
    url: 'https://cdn.openai.com/pdf/18a02b5d-6b67-4cec-ab64-68cdfbddebcd/preparedness-framework-v2.pdf#page=13',
    strength: 'core',
    verified: true,
    note: 'Commits to public disclosure of Preparedness results for major deployments, including safeguards information above a High threshold, possibly redacted or summarized.',
    quote: 'This published information will include the scope of testing performed, capability evaluations for each Tracked Category, our reasoning for the deployment decision',
  },
  {
    topic: 'transparency',
    framework: 'openai-preparedness',
    ref: '§4.3',
    title: 'Marginal risk',
    url: 'https://cdn.openai.com/pdf/18a02b5d-6b67-4cec-ab64-68cdfbddebcd/preparedness-framework-v2.pdf#page=13',
    strength: 'related',
    verified: true,
    note: 'Any reduction of safeguards in response to another developer\'s release requires public acknowledgment of the adjustment.',
  },
  {
    topic: 'transparency',
    framework: 'deepmind-fsf',
    ref: '§5.2',
    title: '5.2 Disclosures',
    url: 'https://storage.googleapis.com/deepmind-media/DeepMind.com/Blog/strengthening-our-frontier-safety-framework/frontier-safety-framework_3-1.pdf#page=17',
    strength: 'related',
    verified: true,
    note: 'Describes aiming to share model information, evaluation results and mitigation plans with government authorities when a CCL poses unmitigated material risk to public safety; it does not commit to public reports.',
    quote: 'we aim to share relevant information with appropriate government authorities where it will facilitate safety of frontier AI.',
  },
  {
    topic: 'transparency',
    framework: 'nist-ai-rmf',
    ref: 'GOVERN 4.2',
    title: 'GOVERN 4.2: Organizational teams document the risks and potential impacts of the AI technology they design, develop, deploy, evaluate, and use, and they communicate about the impacts more broadly.',
    url: 'https://nvlpubs.nist.gov/nistpubs/ai/NIST.AI.100-1.pdf',
    strength: 'related',
    verified: true,
    note: 'Asks teams to document AI risks and impacts and communicate about the impacts more broadly; it does not prescribe public reports.',
  },
  {
    topic: 'transparency',
    framework: 'nist-ai-rmf',
    ref: 'MEASURE 2.8',
    title: 'MEASURE 2.8: Risks associated with transparency and accountability – as identified in the MAP function – are examined and documented.',
    url: 'https://nvlpubs.nist.gov/nistpubs/ai/NIST.AI.100-1.pdf',
    strength: 'related',
    verified: true,
    note: 'Covers examining and documenting risks associated with transparency and accountability.',
  },
  {
    topic: 'transparency',
    framework: 'iso-42001',
    ref: 'A.8',
    title: 'Information for interested parties',
    url: 'https://www.iso.org/standard/42001',
    strength: 'core',
    verified: true,
    note: 'The control objective on information for interested parties is the closest match to reporting; it does not prescribe public capability or risk reports.',
  },
  {
    topic: 'external-review',
    framework: 'anthropic-rsp',
    ref: '§3.6 p. 14',
    title: '3.6. External Review',
    url: 'https://www-cdn.anthropic.com/files/4zrzovbb/website/0bacdc8440ea96e62a8766d99ebe1d4eea6d5f3a.pdf#page=14',
    strength: 'core',
    verified: true,
    note: 'External review of Risk Reports by third parties is described as a practice being worked toward, with a mandatory minimum for significantly redacted reports on highly capable models and on LTBT request.',
    quote: 'We will work toward a practice of seeking comprehensive, public external review on our Risk Reports.',
  },
  {
    topic: 'external-review',
    framework: 'anthropic-rsp',
    ref: '§3.6.1 to 3.6.3 p. 15',
    title: '3.6.1. Selecting external reviewers',
    url: 'https://www-cdn.anthropic.com/files/4zrzovbb/website/0bacdc8440ea96e62a8766d99ebe1d4eea6d5f3a.pdf#page=15',
    strength: 'core',
    verified: true,
    note: 'Reviewer selection criteria, conflict-of-interest limits, LTBT approval, timing, access and the contents of the public review report are specified.',
  },
  {
    topic: 'external-review',
    framework: 'anthropic-rsp',
    ref: '§4 item 7',
    title: '4. Governance',
    url: 'https://www-cdn.anthropic.com/files/4zrzovbb/website/0bacdc8440ea96e62a8766d99ebe1d4eea6d5f3a.pdf#page=16',
    strength: 'core',
    verified: true,
    note: 'A third-party procedural compliance review is commissioned about once a year, limited to procedure rather than substantive outcomes.',
    quote: 'On approximately an annual basis, we will commission a third-party review that assesses whether we adhered to this policy\'s main procedural commitments.',
  },
  {
    topic: 'external-review',
    framework: 'openai-preparedness',
    ref: '§5.2',
    title: 'Transparency and external participation',
    url: 'https://cdn.openai.com/pdf/18a02b5d-6b67-4cec-ab64-68cdfbddebcd/preparedness-framework-v2.pdf#page=14',
    strength: 'core',
    verified: true,
    note: 'Covers third-party evaluation of tracked capabilities, third-party stress testing of safeguards, and independent expert opinions on evidence produced to the SAG.',
    quote: 'when available and feasible, OpenAI will work with third-parties to independently evaluate models.',
  },
  {
    topic: 'external-review',
    framework: 'openai-preparedness',
    ref: '§3.1',
    title: 'Evaluation approach',
    url: 'https://cdn.openai.com/pdf/18a02b5d-6b67-4cec-ab64-68cdfbddebcd/preparedness-framework-v2.pdf#page=9',
    strength: 'related',
    verified: true,
    note: 'Deep Dives may include resource-intensive third party evaluations and assessments by independent third party evaluators.',
  },
  {
    topic: 'external-review',
    framework: 'openai-preparedness',
    ref: 'App. C.3',
    title: 'C.3 Security controls',
    url: 'https://cdn.openai.com/pdf/18a02b5d-6b67-4cec-ab64-68cdfbddebcd/preparedness-framework-v2.pdf#page=22',
    strength: 'related',
    verified: true,
    note: 'Independent Security Audits: security controls validated regularly by third-party auditors.',
  },
  {
    topic: 'external-review',
    framework: 'deepmind-fsf',
    ref: 'Overview',
    title: 'Overview',
    url: 'https://storage.googleapis.com/deepmind-media/DeepMind.com/Blog/strengthening-our-frontier-safety-framework/frontier-safety-framework_3-1.pdf#page=2',
    strength: 'related',
    verified: true,
    note: 'Lists involving external parties, where required or appropriate, as one of the Framework\'s aims.',
    quote: 'Where required or appropriate, involve external parties to help inform and guide the approach.',
  },
  {
    topic: 'external-review',
    framework: 'deepmind-fsf',
    ref: '§1.3.2',
    title: '1.3.2 Inherent Risk Assessment',
    url: 'https://storage.googleapis.com/deepmind-media/DeepMind.com/Blog/strengthening-our-frontier-safety-framework/frontier-safety-framework_3-1.pdf#page=6',
    strength: 'related',
    verified: true,
    note: 'Refers to reviewing external evaluations and engaging external actors, including governments, where appropriate; §1.3.3 (p. 6) involves internal and external experts when an alert threshold is reached.',
    quote: 'Where appropriate, we may engage relevant external actors, including governments, to inform our responsible development and deployment practices.',
  },
  {
    topic: 'external-review',
    framework: 'nist-ai-rmf',
    ref: 'MEASURE 1.3',
    title: 'MEASURE 1.3: Internal experts who did not serve as front-line developers for the system and/or independent assessors are involved in regular assessments and updates. Domain experts, users, AI actors external to the team that developed or deployed the AI system, and affected communities are consulted in support of assessments as necessary per organizational risk tolerance.',
    url: 'https://nvlpubs.nist.gov/nistpubs/ai/NIST.AI.100-1.pdf',
    strength: 'core',
    verified: true,
    note: 'Calls for independent assessors and AI actors external to the development team to be involved in assessments.',
  },
  {
    topic: 'external-review',
    framework: 'nist-ai-rmf',
    ref: 'GOVERN 5.1',
    title: 'GOVERN 5.1: Organizational policies and practices are in place to collect, consider, prioritize, and integrate feedback from those external to the team that developed or deployed the AI system regarding the potential individual and societal impacts related to AI risks.',
    url: 'https://nvlpubs.nist.gov/nistpubs/ai/NIST.AI.100-1.pdf',
    strength: 'related',
    verified: true,
    note: 'Covers collecting and integrating feedback from those external to the team that developed or deployed the system.',
  },
  {
    topic: 'reporting',
    framework: 'anthropic-rsp',
    ref: '§4 item 4',
    title: '4. Governance',
    url: 'https://www-cdn.anthropic.com/files/4zrzovbb/website/0bacdc8440ea96e62a8766d99ebe1d4eea6d5f3a.pdf#page=16',
    strength: 'core',
    verified: true,
    note: 'Staff can report potential noncompliance to more than one recipient; substantiated reports involving material safety risk go to the Board, with anti-retaliation protection.',
    quote: 'We will maintain a process for Anthropic staff to submit anonymous or identified reports regarding potential noncompliance with this policy.',
  },
  {
    topic: 'reporting',
    framework: 'anthropic-rsp',
    ref: '§4 item 5',
    title: '4. Governance',
    url: 'https://www-cdn.anthropic.com/files/4zrzovbb/website/0bacdc8440ea96e62a8766d99ebe1d4eea6d5f3a.pdf#page=16',
    strength: 'related',
    verified: true,
    note: 'Non-disparagement agreements may not impede employees from publicly raising safety concerns.',
  },
  {
    topic: 'reporting',
    framework: 'anthropic-rsp',
    ref: '§3.3 p. 13',
    title: '3.3. Contents',
    url: 'https://www-cdn.anthropic.com/files/4zrzovbb/website/0bacdc8440ea96e62a8766d99ebe1d4eea6d5f3a.pdf#page=13',
    strength: 'related',
    verified: true,
    note: 'Risk Reports must address deviations from previously described mitigation practices and missed Roadmap goals.',
  },
  {
    topic: 'reporting',
    framework: 'openai-preparedness',
    ref: '§5.1',
    title: 'Internal governance',
    url: 'https://cdn.openai.com/pdf/18a02b5d-6b67-4cec-ab64-68cdfbddebcd/preparedness-framework-v2.pdf#page=13',
    strength: 'core',
    verified: true,
    note: 'Noncompliance: employees can raise concerns via the Raising Concerns Policy; potential noncompliance is tracked, investigated and, if substantiated, corrected.',
    quote: 'Any employee can raise concerns about potential violations of this policy, or about its implementation, via our Raising Concerns Policy.',
  },
  {
    topic: 'reporting',
    framework: 'openai-preparedness',
    ref: 'App. C.3',
    title: 'C.3 Security controls',
    url: 'https://cdn.openai.com/pdf/18a02b5d-6b67-4cec-ab64-68cdfbddebcd/preparedness-framework-v2.pdf#page=22',
    strength: 'related',
    verified: true,
    note: 'Operational Security includes continuous log monitoring and incident response by 24x7 on-call staff.',
  },
  {
    topic: 'reporting',
    framework: 'openai-preparedness',
    ref: 'App. B',
    title: 'B Decision-making practices',
    url: 'https://cdn.openai.com/pdf/18a02b5d-6b67-4cec-ab64-68cdfbddebcd/preparedness-framework-v2.pdf#page=16',
    strength: 'related',
    verified: true,
    note: 'Fast-track: a rapidly developing risk of severe harm can be sent to the SAG for urgent processing, coordinated with OpenAI Leadership.',
  },
  {
    topic: 'reporting',
    framework: 'deepmind-fsf',
    ref: '§4.1',
    title: '4.1 Governance structure',
    url: 'https://storage.googleapis.com/deepmind-media/DeepMind.com/Blog/strengthening-our-frontier-safety-framework/frontier-safety-framework_3-1.pdf#page=16',
    strength: 'related',
    verified: true,
    note: 'Mentions escalation procedures within legal, compliance and safety reviews, without describing a channel for staff to report noncompliance.',
    quote: 'escalation procedures',
  },
  {
    topic: 'reporting',
    framework: 'deepmind-fsf',
    ref: '§1.3.2',
    title: '1.3.2 Inherent Risk Assessment',
    url: 'https://storage.googleapis.com/deepmind-media/DeepMind.com/Blog/strengthening-our-frontier-safety-framework/frontier-safety-framework_3-1.pdf#page=6',
    strength: 'related',
    verified: true,
    note: 'Refers to post-market monitoring, including detection, response and reporting of incidents in the frontier safety risk domains; §2.1.2 and §3.1.2 route material safety case updates to the governance function.',
    quote: 'reporting of incidents relating to our frontier safety risk domains',
  },
  {
    topic: 'reporting',
    framework: 'nist-ai-rmf',
    ref: 'GOVERN 4.3',
    title: 'GOVERN 4.3: Organizational practices are in place to enable AI testing, identification of incidents, and information sharing.',
    url: 'https://nvlpubs.nist.gov/nistpubs/ai/NIST.AI.100-1.pdf',
    strength: 'core',
    verified: true,
    note: 'Requires organizational practices that enable identification of incidents and information sharing.',
  },
  {
    topic: 'reporting',
    framework: 'nist-ai-rmf',
    ref: 'MANAGE 4.3',
    title: 'MANAGE 4.3: Incidents and errors are communicated to relevant AI actors, including affected communities. Processes for tracking, responding to, and recovering from incidents and errors are followed and documented.',
    url: 'https://nvlpubs.nist.gov/nistpubs/ai/NIST.AI.100-1.pdf',
    strength: 'related',
    verified: true,
    note: 'Requires incidents and errors to be communicated and processes for tracking and responding to them to be followed.',
  },
  {
    topic: 'reporting',
    framework: 'nist-ai-rmf',
    ref: 'GOVERN 2.1',
    title: 'GOVERN 2.1: Roles and responsibilities and lines of communication related to mapping, measuring, and managing AI risks are documented and are clear to individuals and teams throughout the organization.',
    url: 'https://nvlpubs.nist.gov/nistpubs/ai/NIST.AI.100-1.pdf',
    strength: 'related',
    verified: true,
    note: 'Covers documented lines of communication for AI risk management across the organization.',
  },
  {
    topic: 'reporting',
    framework: 'iso-42001',
    ref: '10.2',
    title: 'Nonconformity and corrective action',
    url: 'https://www.iso.org/standard/42001',
    strength: 'core',
    verified: true,
    note: 'Covers reacting to nonconformities and taking corrective action.',
  },
  {
    topic: 'reporting',
    framework: 'iso-42001',
    ref: 'A.3',
    title: 'Internal organization',
    url: 'https://www.iso.org/standard/42001',
    strength: 'related',
    verified: true,
    note: 'The internal organization control objective includes a process for reporting concerns about the role of the organization with respect to AI systems.',
  },
  {
    topic: 'change',
    framework: 'anthropic-rsp',
    ref: '§4 item 8',
    title: '4. Governance',
    url: 'https://www-cdn.anthropic.com/files/4zrzovbb/website/0bacdc8440ea96e62a8766d99ebe1d4eea6d5f3a.pdf#page=16',
    strength: 'core',
    verified: true,
    note: 'Changes are proposed by the CEO and RSO, approved by the Board in consultation with the LTBT, published by the effective date and recorded in the Change Log.',
    quote: 'Changes to the RSP will be proposed by the CEO and RSO, and approved by the Board in consultation with the LTBT.',
  },
  {
    topic: 'change',
    framework: 'anthropic-rsp',
    ref: 'Changelog',
    title: 'Changelog',
    url: 'https://www-cdn.anthropic.com/files/4zrzovbb/website/0bacdc8440ea96e62a8766d99ebe1d4eea6d5f3a.pdf#page=18',
    strength: 'core',
    verified: true,
    note: 'The Changelog records each version from v1.0 (2023-09-19) to v3.4 (2026-07-08) with a summary of changes.',
  },
  {
    topic: 'change',
    framework: 'anthropic-rsp',
    ref: 'Intro p. 3',
    title: 'Introduction',
    url: 'https://www-cdn.anthropic.com/files/4zrzovbb/website/0bacdc8440ea96e62a8766d99ebe1d4eea6d5f3a.pdf#page=3',
    strength: 'related',
    verified: true,
    note: 'The policy describes itself as a living document to be updated as understanding improves.',
    quote: 'We have always intended for our RSP to be a living document.',
  },
  {
    topic: 'change',
    framework: 'openai-preparedness',
    ref: 'App. B',
    title: 'B Decision-making practices',
    url: 'https://cdn.openai.com/pdf/18a02b5d-6b67-4cec-ab64-68cdfbddebcd/preparedness-framework-v2.pdf#page=16',
    strength: 'core',
    verified: true,
    note: 'Updates to the Preparedness Framework: the SAG reviews proposed changes and recommends through the standard decision process; review at least annually.',
    quote: 'We will review and potentially update the Preparedness Framework for continued sufficiency at least once a year.',
  },
  {
    topic: 'change',
    framework: 'openai-preparedness',
    ref: 'App. A',
    title: 'A Change log',
    url: 'https://cdn.openai.com/pdf/18a02b5d-6b67-4cec-ab64-68cdfbddebcd/preparedness-framework-v2.pdf#page=15',
    strength: 'related',
    verified: true,
    note: 'Lists the twelve key changes introduced in version 2.',
  },
  {
    topic: 'change',
    framework: 'openai-preparedness',
    ref: '§4.4',
    title: 'Increasing safeguards before internal use and further development',
    url: 'https://cdn.openai.com/pdf/18a02b5d-6b67-4cec-ab64-68cdfbddebcd/preparedness-framework-v2.pdf#page=13',
    strength: 'related',
    verified: true,
    note: 'States an expectation to update the Framework before any model reaches Critical capability.',
    quote: 'we expect to further update this Preparedness Framework before reaching such a level with any model.',
  },
  {
    topic: 'change',
    framework: 'deepmind-fsf',
    ref: '§5.1',
    title: '5.1 Updates',
    url: 'https://storage.googleapis.com/deepmind-media/DeepMind.com/Blog/strengthening-our-frontier-safety-framework/frontier-safety-framework_3-1.pdf#page=17',
    strength: 'core',
    verified: true,
    note: 'Requires review at least once a year (more often if adequacy or adherence is materially undermined), covering appropriateness and adherence, with possible updates to risk domains, T/CCLs and methods.',
    quote: 'an assessment of our adherence to the Framework.',
  },
  {
    topic: 'change',
    framework: 'deepmind-fsf',
    ref: '§5.3',
    title: '5.3 Past Updates and Changes',
    url: 'https://storage.googleapis.com/deepmind-media/DeepMind.com/Blog/strengthening-our-frontier-safety-framework/frontier-safety-framework_3-1.pdf#page=17',
    strength: 'related',
    verified: true,
    note: 'Lists versions 1.0 (2024-05-17), 2.0 (2025-02-04), 3.0 (2025-09-22) and 3.1 (2026-04-17) with the 3.1 changes.',
    quote: 'Version 3.1 (April 17, 2026)',
  },
  {
    topic: 'change',
    framework: 'nist-ai-rmf',
    ref: 'GOVERN 1.5',
    title: 'GOVERN 1.5: Ongoing monitoring and periodic review of the risk management process and its outcomes are planned and organizational roles and responsibilities clearly defined, including determining the frequency of periodic review.',
    url: 'https://nvlpubs.nist.gov/nistpubs/ai/NIST.AI.100-1.pdf',
    strength: 'core',
    verified: true,
    note: 'Requires periodic review of the risk management process, with defined roles and review frequency.',
  },
  {
    topic: 'change',
    framework: 'nist-ai-rmf',
    ref: 'MANAGE 4.2',
    title: 'MANAGE 4.2: Measurable activities for continual improvements are integrated into AI system updates and include regular engagement with interested parties, including relevant AI actors.',
    url: 'https://nvlpubs.nist.gov/nistpubs/ai/NIST.AI.100-1.pdf',
    strength: 'related',
    verified: true,
    note: 'Covers integrating continual improvement activities into AI system updates; it addresses systems rather than the policy itself.',
  },
  {
    topic: 'change',
    framework: 'iso-42001',
    ref: '7.5',
    title: 'Documented information',
    url: 'https://www.iso.org/standard/42001',
    strength: 'core',
    verified: true,
    note: 'Covers creating, updating and controlling documented information, including version control.',
  },
  {
    topic: 'change',
    framework: 'iso-42001',
    ref: '5.2',
    title: 'AI policy',
    url: 'https://www.iso.org/standard/42001',
    strength: 'related',
    verified: true,
    note: 'Covers the AI policy that top management establishes, which the frontier policies are the counterpart of.',
  },
  {
    topic: 'regulatory',
    framework: 'anthropic-rsp',
    ref: 'Intro p. 4',
    title: 'Introduction',
    url: 'https://www-cdn.anthropic.com/files/4zrzovbb/website/0bacdc8440ea96e62a8766d99ebe1d4eea6d5f3a.pdf#page=4',
    strength: 'core',
    verified: true,
    note: 'The RSP may serve some regulatory requirements but is not designed to be comprehensive; other obligations are handled in separate documents.',
    quote: 'Where regulatory requirements exceed or differ from what the RSP covers, we will address them through separate documents.',
  },
  {
    topic: 'regulatory',
    framework: 'anthropic-rsp',
    ref: 'Intro fn. 1',
    title: 'Introduction',
    url: 'https://www-cdn.anthropic.com/files/4zrzovbb/website/0bacdc8440ea96e62a8766d99ebe1d4eea6d5f3a.pdf#page=4',
    strength: 'core',
    verified: true,
    note: 'Statutory definitions of catastrophic risk, such as those in California SB 53, are addressed in separate compliance frameworks (footnote 1 to the Introduction, printed at the foot of p. 4).',
    quote: 'Where laws such as California SB 53 define this or similar terms with specific thresholds, we address those requirements in separate compliance frameworks.',
  },
  {
    topic: 'regulatory',
    framework: 'anthropic-rsp',
    ref: '§1 p. 5',
    title: '1. Our Recommendations for Industry-Wide Safety',
    url: 'https://www-cdn.anthropic.com/files/4zrzovbb/website/0bacdc8440ea96e62a8766d99ebe1d4eea6d5f3a.pdf#page=5',
    strength: 'related',
    verified: true,
    note: 'The policy recommends third-party governance of frontier developers and harmonized national regulation, including standards of evidence.',
  },
  {
    topic: 'regulatory',
    framework: 'deepmind-fsf',
    ref: '§5.2',
    title: '5.2 Disclosures',
    url: 'https://storage.googleapis.com/deepmind-media/DeepMind.com/Blog/strengthening-our-frontier-safety-framework/frontier-safety-framework_3-1.pdf#page=17',
    strength: 'related',
    verified: true,
    note: 'Apart from engaging governments where appropriate (§1.3.2), the link to public authorities is the aim to share information with government authorities when a CCL poses unmitigated material risk; the text names no law, and SB 53 appears only in footnote 1, as the address of Anthropic\'s compliance framework among other examples of frontier safety frameworks.',
    quote: 'If we assess that a model has reached a CCL that poses an unmitigated and material risk to overall public safety',
  },
  {
    topic: 'regulatory',
    framework: 'nist-ai-rmf',
    ref: 'GOVERN 1.1',
    title: 'GOVERN 1.1: Legal and regulatory requirements involving AI are understood, managed, and documented.',
    url: 'https://nvlpubs.nist.gov/nistpubs/ai/NIST.AI.100-1.pdf',
    strength: 'core',
    verified: true,
    note: 'Requires legal and regulatory requirements involving AI to be understood, managed and documented.',
  },
];

/** Cells where a document has nothing on the dimension, said so in one sentence. */
export const frontierGaps: readonly FrontierGap[] = [
  { topic: 'regulatory', framework: 'openai-preparedness', note: 'The Preparedness Framework does not map itself to SB 53, the EU GPAI Code of Practice or government notification; §2.1 only lists legal and policy mandates as an input to risk assessment, and the regulatory mapping is in the separate Frontier Governance Framework (companion).' },
  { topic: 'security', framework: 'iso-42001', note: 'No ISO/IEC 42001 clause present in the crosswalk data addresses security of model weights or infrastructure.' },
  { topic: 'external-review', framework: 'iso-42001', note: 'No ISO/IEC 42001 clause present in the crosswalk data covers external or third-party review of models or of the policy; A.10 is about supplier and customer relationships and 9.2 is internal audit.' },
  { topic: 'regulatory', framework: 'iso-42001', note: 'No ISO/IEC 42001 clause present in the crosswalk data addresses legal or regulatory requirements, and the standard is not tied to SB 53 or the GPAI Code.' },
];

/** Framework objects for the three lab columns, shaped like frameworks.ts. */
export const frontierLabFrameworks: readonly Framework[] = frontierDocs
  .filter((d) => d.frameworkId !== 'nist-ai-rmf' && d.frameworkId !== 'iso-42001')
  .map((d) => ({
    id: d.frameworkId,
    name: d.name,
    short: d.short,
    type: 'framework' as const,
    issuer: d.issuer,
    url: d.url,
    summary: `${d.name}, ${d.version}, dated ${d.effective}. Voluntary; published by ${d.issuer}.`,
  }));

const LAB_IDS = new Set(frontierLabFrameworks.map((f) => f.id));

/** A framework of this crosswalk: the lab policies here, NIST and ISO from frameworks.ts. */
export function frontierFrameworkById(id: string): Framework | undefined {
  return frontierLabFrameworks.find((f) => f.id === id) ?? frameworkById(id);
}

/** The document behind a column's framework. */
export function frontierDocById(id: string): FrontierDoc | undefined {
  return frontierDocs.find((d) => d.frameworkId === id);
}

export const frontierColumns: readonly CrosswalkColumn[] = [
  { id: 'rsp', label: 'Anthropic RSP', frameworks: ['anthropic-rsp'], group: 'labs', defaultVisible: true },
  { id: 'pf', label: 'OpenAI Preparedness', frameworks: ['openai-preparedness'], group: 'labs', defaultVisible: true },
  { id: 'fsf', label: 'Google DeepMind FSF', frameworks: ['deepmind-fsf'], group: 'labs', defaultVisible: true },
  { id: 'nist', label: 'NIST AI RMF', frameworks: ['nist-ai-rmf'], group: 'codes', defaultVisible: true },
  { id: 'iso', label: 'ISO/IEC 42001', frameworks: ['iso-42001'], group: 'standards', defaultVisible: true },
];

const strengthRank: Record<RefStrength, number> = { core: 0, related: 1 };

/** The grid, in the same shape as crosswalk.ts `topicMatrix()`. */
export function frontierMatrix(): {
  columns: (CrosswalkColumn & { fws: Framework[] })[];
  rows: { topic: FrontierDimension; cells: FrontierRef[][] }[];
} {
  const columns = frontierColumns.map((column) => ({
    ...column,
    fws: column.frameworks
      .map((id) => frontierFrameworkById(id))
      .filter((f): f is Framework => f !== undefined),
  }));
  const rows = dimensions.map((topic) => ({
    topic,
    cells: frontierColumns.map((column) =>
      frontierRefs
        .filter((r) => r.topic === topic.id && column.frameworks.includes(r.framework))
        .sort((a, b) => strengthRank[a.strength] - strengthRank[b.strength]),
    ),
  }));
  return { columns, rows };
}

/** Gaps for one dimension, in column order. */
export function gapsFor(topicId: string): FrontierGap[] {
  const order = frontierColumns.flatMap((c) => c.frameworks);
  return frontierGaps
    .filter((g) => g.topic === topicId)
    .sort((a, b) => order.indexOf(a.framework) - order.indexOf(b.framework));
}

const wordCount = (s: string): number => s.trim().split(/\s+/).filter(Boolean).length;

/** Every prose string that may carry `[n]` markers. */
function citingTexts(): string[] {
  return [
    ...dimensions.flatMap((d) => [d.summary, d.question]),
    ...frontierReadings.map((r) => r.text),
    ...frontierLimits,
  ];
}

/**
 * Build-time invariants. The page throws when the list is not empty and the
 * spec asserts it is empty, so a broken reference fails before it ships.
 */
export function frontierProblems(): string[] {
  const problems: string[] = [];
  const dimIds = new Set(dimensions.map((d) => d.id));
  const colFws = new Set(frontierColumns.flatMap((c) => c.frameworks));
  const isoIds = new Set(
    generalRefs.filter((r) => r.framework === 'iso-42001' && r.verified !== false).map((r) => r.ref),
  );

  if (new Set(dimensions.map((d) => d.id)).size !== dimensions.length) problems.push('duplicate dimension id');
  for (const fw of colFws) {
    if (!frontierFrameworkById(fw)) problems.push(`column framework ${fw} does not resolve`);
    if (!frontierDocById(fw)) problems.push(`column framework ${fw} has no document`);
  }

  for (const r of frontierRefs) {
    const at = `${r.framework} ${r.ref} (${r.topic})`;
    if (!dimIds.has(r.topic)) problems.push(`${at}: unknown dimension`);
    if (!colFws.has(r.framework)) problems.push(`${at}: framework is not a column`);
    if (!r.url || !r.url.startsWith('https://')) problems.push(`${at}: url missing or not https`);
    if (!r.title.trim()) problems.push(`${at}: empty title`);
    if (r.verified === false && !r.note) problems.push(`${at}: unverified without a note`);
    if (r.quote !== undefined && wordCount(r.quote) > 25) problems.push(`${at}: quote over 25 words`);
    if (LAB_IDS.has(r.framework)) {
      if (!r.ref.trim()) problems.push(`${at}: lab ref without a section or page`);
      if (r.url?.includes('.pdf') && !/#page=\d+$/.test(r.url)) problems.push(`${at}: PDF url without #page=`);
    }
    if (r.framework === 'nist-ai-rmf' && !nistAiRmfSubcategoryById(r.ref)) {
      problems.push(`${at}: not a NIST AI RMF subcategory in nist-ai-rmf.ts`);
    }
    if (r.framework === 'iso-42001') {
      if (!isoIds.has(r.ref)) problems.push(`${at}: ISO clause not among the general crosswalk's verified ones`);
      if (r.quote) problems.push(`${at}: ISO text must not be quoted`);
    }
  }
  const seen = new Set<string>();
  for (const r of frontierRefs) {
    const key = `${r.topic}|${r.framework}|${r.ref}`;
    if (seen.has(key)) problems.push(`duplicate ref ${key}`);
    seen.add(key);
  }

  for (const g of frontierGaps) {
    if (!dimIds.has(g.topic)) problems.push(`gap ${g.framework} ${g.topic}: unknown dimension`);
    if (!colFws.has(g.framework)) problems.push(`gap ${g.framework} ${g.topic}: framework is not a column`);
    if (!g.note.trim()) problems.push(`gap ${g.framework} ${g.topic}: empty note`);
    if (frontierRefs.some((r) => r.topic === g.topic && r.framework === g.framework)) {
      problems.push(`gap ${g.framework} ${g.topic}: the cell also has refs`);
    }
  }
  // Every dimension: each column has a ref or a documented gap.
  for (const d of dimensions) {
    for (const fw of colFws) {
      const has = frontierRefs.some((r) => r.topic === d.id && r.framework === fw);
      const gap = frontierGaps.some((g) => g.topic === d.id && g.framework === fw);
      if (!has && !gap) problems.push(`${d.id} × ${fw}: no reference and no documented gap`);
    }
  }

  // Sources: every [n] cited resolves, every source is cited somewhere.
  const n = frontierCrosswalkSources.length;
  const cited = citedNumbers(citingTexts());
  for (const doc of frontierDocs) {
    cited.add(doc.source);
    if (doc.companion) cited.add(doc.companion.source);
  }
  for (const c of cited) if (c < 1 || c > n) problems.push(`[${c}] cited but no such source`);
  for (let i = 1; i <= n; i++) if (!cited.has(i)) problems.push(`source [${i}] is never cited`);
  for (const s of frontierCrosswalkSources) {
    if (!s.url.startsWith('https://')) problems.push(`source ${s.title}: url not https`);
  }

  // House style: no em dashes anywhere in the data.
  const blob = JSON.stringify({ frontierDocs, dimensions, frontierRefs, frontierGaps, frontierReadings, frontierLimits });
  if (blob.includes(String.fromCharCode(0x2014))) problems.push('em dash in the frontier crosswalk data');
  return problems;
}

/** The notice every export carries, so the disclaimer cannot be stripped. */
export function frontierNotice(bokVersion: string): string {
  return `Illustrative coverage mapping from the AI Governance Engineer Body of Knowledge v${bokVersion} (not a claim of conformity); frontier safety crosswalk schema ${frontierCrosswalkSchemaVersion}, as of ${FRONTIER_CROSSWALK_AS_OF}`;
}

/** One flat record per reference: the rows of the CSV and the JSON `references`. */
export function frontierExportRows(): {
  dimension: string;
  dimensionName: string;
  framework: string;
  frameworkName: string;
  column: string;
  reference: string;
  title: string;
  strength: RefStrength;
  verified: boolean;
  quote: string | null;
  note: string | null;
  url: string | null;
}[] {
  const dimName = new Map(dimensions.map((d) => [d.id, d.name] as const));
  const colOf = new Map(frontierColumns.flatMap((c) => c.frameworks.map((f) => [f, c.id] as const)));
  return frontierRefs.map((r) => ({
    dimension: r.topic,
    dimensionName: dimName.get(r.topic) ?? r.topic,
    framework: r.framework,
    frameworkName: frontierFrameworkById(r.framework)?.name ?? r.framework,
    column: colOf.get(r.framework) ?? '',
    reference: r.ref,
    title: r.title,
    strength: r.strength,
    verified: r.verified !== false,
    quote: r.quote ?? null,
    note: r.note ?? null,
    url: r.url ?? null,
  }));
}
