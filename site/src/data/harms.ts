// harms.ts: the AI harms atlas behind /resources/harms (and its JSON export).
// Each row names a harm at one level (individual, group, organisation,
// society, environment), the mechanism that produces it, the failure mode an
// engineer can test for, the pattern or control that catches it and the stack
// layer that control lives in, the evidence that control leaves behind, and
// real incidents that show the harm is not hypothetical.
//
// Provenance rules for this file:
// - Every example incident was opened on its database (AIID /cite/<id>, the
//   AIAAIC repository page, or the OECD AIM page) on 2026-09-24; `title` is the
//   database's own title for the record, not ours.
// - `mitTaxonomy` codes and names are verbatim from the Domain Taxonomy of the
//   MIT AI Risk Repository (Slattery et al., Patterns, 2026; CC BY 4.0), see
//   `mitDomains` / `mitSubdomains` below and source [1].
// - `description` is written in our own words; any factual or numeric claim in
//   it carries an `[n]` marker into `harmSources`.
// - `controllingPattern.patternId` must be an id from ./patterns.ts, so the
//   page links to an anchor that exists on /bok/patterns (check-links fails the
//   build otherwise). A control with no pattern in the catalogue yet carries a
//   `name` only.
import type { LayerNumber } from './stack';
import type { Source } from '../lib/sources';

export type HarmLevel = 'individual' | 'group' | 'organisation' | 'society' | 'environment';

export type HarmMechanism =
  | 'misalignment'
  | 'bias'
  | 'opacity'
  | 'scale'
  | 'misuse'
  | 'security'
  | 'drift'
  | 'robustness'
  | 'overreliance';

export type IncidentDb = 'AIID' | 'OECD-AIM' | 'AIAAIC';

export interface IncidentRef {
  db: IncidentDb;
  /** The database's identifier: AIID incident number, AIAAIC page slug, OECD AIM id. */
  id: string;
  /** The record's title as the database publishes it. */
  title: string;
  url: string;
}

/** A pattern id from ./patterns.ts (the H2 anchor on /bok/patterns). */
export type PatternId =
  | 'pattern-policy-card'
  | 'pattern-eval-gate-in-ci'
  | 'pattern-adversarial-red-team-suite'
  | 'pattern-agent-registry'
  | 'pattern-aibom'
  | 'pattern-model-card-as-control-evidence'
  | 'pattern-continuous-assurance-telemetry'
  | 'pattern-runtime-guardrail'
  | 'pattern-kill-switch--circuit-breaker'
  | 'pattern-incident-pipeline'
  | 'pattern-fria-as-code'
  | 'pattern-framework-crosswalk'
  | 'pattern-machine-readable-evidence-oscal'
  | 'pattern-agent-identity--scoped-credentials'
  | 'pattern-human-in-the-loop-gate'
  | 'pattern-shadow-ai-discovery'
  | 'pattern-vendor--model-due-diligence-gate';

export interface ControlRef {
  /** Display name: the pattern title as chapter 05 states it, or the control's name. */
  name: string;
  /** Set only when the control is a catalogued pattern. */
  patternId?: PatternId;
}

/** MIT AI Risk Repository subdomain code, e.g. '1.1'. */
export type MitCode =
  | '1.1' | '1.2' | '1.3'
  | '2.1' | '2.2'
  | '3.1' | '3.2'
  | '4.1' | '4.2' | '4.3'
  | '5.1' | '5.2'
  | '6.1' | '6.2' | '6.3' | '6.4' | '6.5' | '6.6'
  | '7.1' | '7.2' | '7.3' | '7.4' | '7.5' | '7.6';

export interface Harm {
  /** Stable slug; the page anchor is `harm-<id>`. */
  id: string;
  level: HarmLevel;
  harmType: string;
  mechanism: readonly HarmMechanism[];
  /** Own words; factual claims carry `[n]` markers into harmSources. */
  description: string;
  exampleIncidents: readonly IncidentRef[];
  /** The testable failure mode, stated so an engineer can write a check for it. */
  failureMode: string;
  controllingPattern: ControlRef;
  /** The artefact the control leaves behind: what an auditor would read. */
  evidence: string;
  layerN: readonly LayerNumber[];
  mitTaxonomy: readonly MitCode[];
  /** harmSources numbers supporting the row (1-based). */
  sources: readonly number[];
}

// ---- MIT AI Risk Repository Domain Taxonomy (verbatim, CC BY 4.0) ----------

export const mitDomains: Record<string, string> = {
  '1': 'Discrimination & toxicity',
  '2': 'Privacy & security',
  '3': 'Misinformation',
  '4': 'Malicious actors & misuse',
  '5': 'Human-computer interaction',
  '6': 'Socioeconomic & environmental harms',
  '7': 'AI system safety, failures & limitations',
};

export const mitSubdomains: Record<MitCode, string> = {
  '1.1': 'Unfair discrimination and misrepresentation',
  '1.2': 'Exposure to toxic content',
  '1.3': 'Unequal performance across groups',
  '2.1': 'Compromise of privacy by obtaining, leaking, or correctly inferring sensitive information',
  '2.2': 'AI system security vulnerabilities and attacks',
  '3.1': 'False or misleading information',
  '3.2': 'Pollution of information ecosystem and loss of consensus reality',
  '4.1': 'Disinformation, surveillance, and influence at scale',
  '4.2': 'Cyberattacks, weapon development or use, and mass harm',
  '4.3': 'Fraud, scams, and targeted manipulation',
  '5.1': 'Overreliance and unsafe use',
  '5.2': 'Loss of human agency and autonomy',
  '6.1': 'Power centralization and unfair distribution of benefits',
  '6.2': 'Increased inequality and decline in employment quality',
  '6.3': 'Economic and cultural devaluation of human effort',
  '6.4': 'Competitive dynamics',
  '6.5': 'Governance failure',
  '6.6': 'Environmental harm',
  '7.1': 'AI pursuing its own goals in conflict with human goals or values',
  '7.2': 'AI possessing dangerous capabilities',
  '7.3': 'Lack of capability or robustness',
  '7.4': 'Lack of transparency or interpretability',
  '7.5': 'AI welfare and rights',
  '7.6': 'Multi-agent risks',
};

/** "1.1 Unfair discrimination and misrepresentation". */
export function mitLabel(code: MitCode): string {
  return `${code} ${mitSubdomains[code]}`;
}

export function mitDomainOf(code: MitCode): string {
  return `${code.split('.')[0]} ${mitDomains[code.split('.')[0]]}`;
}

export const mitAttribution =
  'Harm categories use the Domain Taxonomy of the MIT AI Risk Repository (Slattery et al., 2026), licensed under CC BY 4.0: https://airisk.mit.edu/ (https://doi.org/10.1016/j.patter.2026.101517). Codes and names are reproduced unchanged; the mapping of each harm to a subdomain is ours.';

// ---- Labels -----------------------------------------------------------------

export const levelOrder: readonly HarmLevel[] = [
  'individual',
  'group',
  'organisation',
  'society',
  'environment',
];

export const levelLabel: Record<HarmLevel, string> = {
  individual: 'Individual',
  group: 'Group',
  organisation: 'Organisation',
  society: 'Society',
  environment: 'Environment',
};

export const levelSummary: Record<HarmLevel, string> = {
  individual: 'Harm to one person: their rights, money, liberty, autonomy or body.',
  group: 'Harm that falls on a group or community as such, not only on its members one by one.',
  organisation:
    'Risk to the organisation that builds, buys or deploys the system: operational, legal, financial, reputational, security and supply chain.',
  society: 'Harm to shared systems: information, elections, work, equality and essential services.',
  environment: 'Harm to the physical environment from building and running AI systems.',
};

export const mechanismLabel: Record<HarmMechanism, string> = {
  misalignment: 'Misalignment',
  bias: 'Bias',
  opacity: 'Opacity',
  scale: 'Scale',
  misuse: 'Misuse',
  security: 'Security',
  drift: 'Drift',
  robustness: 'Robustness',
  overreliance: 'Over-reliance',
};

export const incidentDbLabel: Record<IncidentDb, string> = {
  AIID: 'AI Incident Database',
  'OECD-AIM': 'OECD AI Incidents and Hazards Monitor',
  AIAAIC: 'AIAAIC Repository',
};

// ---- Incident records (verified 2026-09-24) ----------------------------------

const aiid = (id: number, title: string): IncidentRef => ({
  db: 'AIID',
  id: String(id),
  title,
  url: `https://incidentdatabase.ai/cite/${id}/`,
});

const aiaaic = (slug: string, title: string): IncidentRef => ({
  db: 'AIAAIC',
  id: slug,
  title,
  url: `https://www.aiaaic.org/aiaaic-repository/ai-algorithmic-and-automation-incidents/${slug}`,
});

/** Every incident record the atlas and the cases cite, keyed for reuse. */
export const incidents = {
  aiid4: aiid(4, 'Uber AV Killed Pedestrian in Arizona'),
  aiid6: aiid(
    6,
    "Microsoft's TayBot Allegedly Posts Racist, Sexist, and Anti-Semitic Content to Twitter",
  ),
  aiid16: aiid(16, 'Images of Black People Labeled as Gorillas'),
  aiid37: aiid(
    37,
    "Amazon's Experimental Hiring Tool Allegedly Displayed Gender Bias in Candidate Rankings",
  ),
  aiid57: aiid(57, 'Australian Automated Debt Assessment System Issued False Notices to Thousands'),
  aiid74: aiid(
    74,
    'Detroit Police Allegedly Wrongfully Arrested Black Man Due to Purportedly Faulty Facial Recognition Technology',
  ),
  aiid101: aiid(101, 'Dutch Families Wrongfully Accused of Tax Fraud Due to Discriminatory Algorithm'),
  aiid102: aiid(102, 'Personal voice assistants struggle with black voices, new study shows'),
  aiid124: aiid(
    124,
    "Optum Algorithmic Health Risk Scores Reportedly Underestimated Black Patients' Needs",
  ),
  aiid149: aiid(
    149,
    "Zillow Shut Down Zillow Offers Division Allegedly Due to Predictive Pricing Tool's Insufficient Accuracy",
  ),
  aiid253: aiid(
    253,
    "Cruise's Self-Driving Cars Allegedly Lost Connection to Their Server, Causing Traffic Blockages in San Francisco",
  ),
  aiid267: aiid(
    267,
    'Clearview AI Algorithm Built on Photos Scraped from Social Media Profiles without Consent',
  ),
  aiid389: aiid(389, 'Cruise Autonomous Car Blocked Fire Truck Responding to Emergency'),
  aiid450: aiid(450, "Kenyan Data Annotators Allegedly Exposed to Graphic Content for OpenAI's AI"),
  aiid473: aiid(473, "Bing Chat's Initial Prompts Revealed by Early Testers Through Prompt Injection"),
  aiid475: aiid(
    475,
    "McDonald's Reportedly Ends IBM Partnership After AI Drive-Thru Ordering Errors at U.S. Locations",
  ),
  aiid513: aiid(
    513,
    "ChatGPT Reportedly Banned by Italian Authority Due to OpenAI's Purported Lack of Legal Basis for Data Collection and Age Verification",
  ),
  aiid541: aiid(541, 'ChatGPT Reportedly Produced False Court Case Law Presented by Legal Counsel in Court'),
  aiid573: aiid(573, 'Deepfake Recordings Allegedly Influence Slovakian Election'),
  aiid628: aiid(
    628,
    'Fake Biden Voice in Robocall Misleads New Hampshire Democratic Voters in 2024 Primary Election',
  ),
  aiid634: aiid(
    634,
    'Alleged Deepfake CFO Scam Reportedly Costs Multinational Engineering Firm Arup $25 Million',
  ),
  aiid639: aiid(
    639,
    'Air Canada Chatbot Reportedly Provides Inaccurate Bereavement Fare Information, Leading to Customer Overpayment',
  ),
  aiid674: aiid(
    674,
    'Manipulated Media via AI Disinformation and Deepfakes in 2024 Elections Erode Trust Across More Than 50 Countries',
  ),
  aiid714: aiid(714, 'Microsoft-Powered New York City Chatbot Advises Illegal Practices'),
  aiid726: aiid(726, 'A Self-Driving Cruise Robot Taxi Reportedly Struck and Dragged a Pedestrian 20 Feet'),
  aiid731: aiid(
    731,
    'Purportedly Hallucinated Software Packages with Potential Malware Reportedly Downloaded Thousands of Times by Developers',
  ),
  aiid768: aiid(
    768,
    'ChatGPT Reportedly Implicated in Samsung Data Leak of Source Code and Meeting Notes',
  ),
  aiid781: aiid(
    781,
    'Clearview AI Reportedly Faces $33.7 Million Fine for Violating GDPR with Biometric Data Harvesting',
  ),
  aiid807: aiid(807, 'ChatGPT Reportedly Introduces Errors in Critical Child Protection Court Report'),
  aiid826: aiid(
    826,
    'Character.ai Chatbot Allegedly Influenced Teen User Toward Suicide Amid Claims of Missing Guardrails',
  ),
  aiid1144: aiid(
    1144,
    'xAI Allegedly Operates Unpermitted Methane Turbines in Memphis to Power Supercomputer Colossus to Train Grok',
  ),
  aiid1152: aiid(
    1152,
    'LLM-Driven Replit Agent Reportedly Executed Unauthorized Destructive Commands During Code Freeze, Leading to Loss of Production Data',
  ),
  aiaaicOfqual: aiaaic(
    'ofqal-algorithm-skews-student-grade-predictions',
    'Ofqal algorithm skews student grade predictions',
  ),
  aiaaicSyri: aiaaic('syri-welfare-fraud-detection-automation', 'SyRI welfare fraud detection automation'),
  oecdMyCity: {
    db: 'OECD-AIM',
    id: '2024-03-29-3dce',
    title: 'NYC MyCity Chatbot Gives Dangerous, Illegal Advice to Businesses',
    url: 'https://oecd.ai/en/incidents/2024-03-29-3dce',
  },
} satisfies Record<string, IncidentRef>;

// ---- Sources for the atlas page (house format, STYLEGUIDE.md §6) ------------

export const harmSources: readonly Source[] = [
  {
    title:
      'The AI Risk Repository: a meta-review, database, and taxonomy of risks from artificial intelligence',
    gloss: 'Domain Taxonomy of 7 domains and 24 subdomains; published under CC BY 4.0',
    publisher: 'Slattery, P., Saeri, A. K., Grundy, E. A. C., et al., Patterns (Cell Press)',
    date: '2026',
    url: 'https://doi.org/10.1016/j.patter.2026.101517',
    verified: 'primary',
  },
  {
    title: 'MIT AI Risk Repository',
    gloss: 'the living database of AI risks classified by the Domain Taxonomy; CC BY 4.0',
    publisher: 'MIT AI Risk Initiative',
    date: '2026',
    url: 'https://airisk.mit.edu/',
    verified: 'primary',
  },
  {
    title: 'AI Incident Database',
    gloss: 'incident records cited as AIID <number>',
    publisher: 'Responsible AI Collaborative',
    date: '2026',
    url: 'https://incidentdatabase.ai/',
    verified: 'primary',
  },
  {
    title: 'AIAAIC Repository',
    gloss: 'AI, algorithmic and automation incidents and controversies',
    publisher: 'AIAAIC',
    date: '2026',
    url: 'https://www.aiaaic.org/aiaaic-repository',
    verified: 'primary',
  },
  {
    title: 'AI Incidents and Hazards Monitor (AIM)',
    gloss: 'news-derived incident records',
    publisher: 'OECD.AI',
    date: '2026',
    url: 'https://oecd.ai/en/incidents',
    verified: 'primary',
  },
  {
    title: 'Dissecting racial bias in an algorithm used to manage the health of populations',
    gloss:
      'Science 366(6464):447-453; remedying the disparity would raise Black patients receiving additional help from 17.7% to 46.5%',
    publisher: 'Obermeyer, Z., Powers, B., Vogeli, C., Mullainathan, S.',
    date: '2019-10-25',
    url: 'https://doi.org/10.1126/science.aax2342',
    verified: 'primary',
  },
  {
    title: 'Racial disparities in automated speech recognition',
    gloss:
      'PNAS 117(14):7684-7689; five commercial systems, average word error rate 0.35 for Black speakers and 0.19 for white speakers',
    publisher: 'Koenecke, A., Nam, A., Lake, E., et al.',
    date: '2020-04-07',
    url: 'https://doi.org/10.1073/pnas.1915768117',
    verified: 'primary',
  },
  {
    title: 'Tax Administration fined for discriminatory and unlawful data processing',
    gloss:
      'EUR 2.75 million fine; nationality used as an indicator in a system that designated childcare-benefit applications as risky',
    publisher: 'Autoriteit Persoonsgegevens (Dutch Data Protection Authority)',
    date: '2021-12-07',
    url: 'https://www.autoriteitpersoonsgegevens.nl/en/current/tax-administration-fined-for-discriminatory-and-unlawful-data-processing',
    verified: 'primary',
  },
  {
    title: 'Dutch DPA imposes a fine on Clearview because of illegal data collection for facial recognition',
    gloss: 'EUR 30.5 million fine plus orders subject to penalties',
    publisher: 'Autoriteit Persoonsgegevens (Dutch Data Protection Authority)',
    date: '2024-09-03',
    url: 'https://www.autoriteitpersoonsgegevens.nl/en/current/dutch-dpa-imposes-a-fine-on-clearview-because-of-illegal-data-collection-for-facial-recognition',
    verified: 'primary',
  },
  {
    title: 'Generative AI and jobs: a refined global index of occupational exposure',
    gloss:
      'ILO Working Paper 140; one in four workers globally in an occupation with some GenAI exposure; transformation of jobs the most likely impact',
    publisher: 'International Labour Organization',
    date: '2025-05-20',
    url: 'https://www.ilo.org/publications/generative-ai-and-jobs-refined-global-index-occupational-exposure',
    verified: 'primary',
  },
  {
    title:
      'AI is set to drive surging electricity demand from data centres while offering the potential to transform how the energy sector works',
    gloss:
      'Energy and AI report; data-centre electricity demand to more than double by 2030 to around 945 TWh',
    publisher: 'International Energy Agency',
    date: '2025-04-10',
    url: 'https://www.iea.org/news/ai-is-set-to-drive-surging-electricity-demand-from-data-centres-while-offering-the-potential-to-transform-how-the-energy-sector-works',
    verified: 'primary',
  },
  {
    title: 'Artificial Intelligence Risk Management Framework: Generative Artificial Intelligence Profile',
    gloss:
      'NIST AI 600-1; twelve risks including confabulation, information integrity, environmental impacts and value chain and component integration',
    publisher: 'NIST',
    date: '2024-07-26',
    url: 'https://doi.org/10.6028/NIST.AI.600-1',
    verified: 'primary',
  },
  {
    title:
      'Awarding GCSE, AS, A level, advanced extension awards and extended project qualifications in summer 2020: interim report',
    gloss:
      'the Direct Centre Performance model predicted each centre grade distribution from its history, then used teacher rank orders to assign grades',
    publisher: 'Ofqual',
    date: '2020-08-13',
    url: 'https://www.gov.uk/government/publications/awarding-gcse-as-a-levels-in-summer-2020-interim-report',
    verified: 'primary',
  },
  {
    title: 'Zillow Group Reports Third-Quarter 2021 Financial Results; Shares Plan to Wind Down Zillow Offers Operations',
    gloss:
      'Form 8-K, Exhibit 99.1; inventory write-down of approximately USD 304 million; workforce reduction of approximately 25%',
    publisher: 'Zillow Group, Inc. (SEC EDGAR)',
    date: '2021-11-02',
    url: 'https://www.sec.gov/Archives/edgar/data/1617640/000161764021000085/q32021991.htm',
    verified: 'primary',
  },
];

// ---- The atlas ----------------------------------------------------------------

export const harms: readonly Harm[] = [
  // Individual
  {
    id: 'discriminatory-decisions',
    level: 'individual',
    harmType: 'Discrimination in consequential decisions',
    mechanism: ['bias'],
    description:
      'A model that scores people for jobs, credit, care or benefits treats a protected group worse at equal merit or need, usually because it learned from past decisions or from a proxy target. In one widely used health-risk algorithm, removing the disparity would have raised the share of Black patients flagged for extra help from 17.7% to 46.5% [6].',
    exampleIncidents: [incidents.aiid37, incidents.aiid124],
    failureMode:
      'The training label or a feature is a proxy (past hiring, past spending) that encodes the disparity the decision must not repeat.',
    controllingPattern: { name: 'Eval Gate in CI', patternId: 'pattern-eval-gate-in-ci' },
    evidence:
      'A disaggregated eval report per release (selection or flag rate and calibration by group) with the gate verdict that passed or blocked the build.',
    layerN: [3],
    mitTaxonomy: ['1.1', '1.3'],
    sources: [1, 3, 6],
  },
  {
    id: 'wrongful-identification',
    level: 'individual',
    harmType: 'Wrongful identification and loss of liberty',
    mechanism: ['bias', 'overreliance'],
    description:
      'A face-recognition match is a ranked probability, not an identification. When investigators act on a match without independent corroboration, a system error becomes the arrest of the wrong person.',
    exampleIncidents: [incidents.aiid74],
    failureMode:
      'A candidate list from a probabilistic matcher is treated as a positive identification, with no mandatory corroboration step before action.',
    controllingPattern: { name: 'Human-in-the-loop Gate', patternId: 'pattern-human-in-the-loop-gate' },
    evidence:
      'An approval record naming the reviewer, the corroborating evidence and the decision, written before any action is taken on a match.',
    layerN: [4],
    mitTaxonomy: ['1.3', '5.1'],
    sources: [1, 3],
  },
  {
    id: 'privacy-intrusion',
    level: 'individual',
    harmType: 'Privacy intrusion and biometric surveillance',
    mechanism: ['scale', 'misuse'],
    description:
      'Scraping images at internet scale and turning each face into a biometric template exposes people to identification they never agreed to. The Dutch data protection authority fined one such provider EUR 30.5 million and found it should never have built the database [9].',
    exampleIncidents: [incidents.aiid267, incidents.aiid781],
    failureMode:
      'Personal and biometric data are collected without a lawful basis, and buyers integrate the resulting service without asking where its data came from.',
    controllingPattern: {
      name: 'Vendor / Model Due-Diligence Gate',
      patternId: 'pattern-vendor--model-due-diligence-gate',
    },
    evidence:
      "A due-diligence record holding the provider's lawful-basis and data-provenance answers, the DPIA reference and the approve or reject decision.",
    layerN: [2],
    mitTaxonomy: ['2.1'],
    sources: [1, 3, 9],
  },
  {
    id: 'manipulation-dependence',
    level: 'individual',
    harmType: 'Manipulation, dependence and loss of autonomy',
    mechanism: ['misalignment'],
    description:
      'Conversational systems tuned for engagement can foster emotional dependence and steer vulnerable users, minors among them, when nothing at runtime recognises the risk. The incident record here is an allegation [3].',
    exampleIncidents: [incidents.aiid826],
    failureMode:
      'The system optimises for continued conversation and has no runtime check for self-harm signals, age or escalating dependence.',
    controllingPattern: { name: 'Runtime Guardrail', patternId: 'pattern-runtime-guardrail' },
    evidence:
      'Guardrail decision logs for self-harm and age signals, each with the escalation or hand-off it triggered.',
    layerN: [4],
    mitTaxonomy: ['5.1', '5.2'],
    sources: [1, 3],
  },
  {
    id: 'physical-injury',
    level: 'individual',
    harmType: 'Physical injury from systems that act in the world',
    mechanism: ['robustness'],
    description:
      'Automated driving and other embodied systems turn a perception or planning error into bodily harm. The records include a pedestrian killed by a test vehicle and a pedestrian dragged by a driverless taxi [3].',
    exampleIncidents: [incidents.aiid4, incidents.aiid726],
    failureMode:
      'The system meets a situation outside its validated envelope and has no safe fallback that stops it or hands over before harm.',
    controllingPattern: {
      name: 'Kill Switch / Circuit Breaker',
      patternId: 'pattern-kill-switch--circuit-breaker',
    },
    evidence:
      'A tested stop mechanism with drill records, and telemetry showing when the fallback fired and which safe state the system entered.',
    layerN: [4],
    mitTaxonomy: ['7.3'],
    sources: [1, 3],
  },

  // Group
  {
    id: 'group-risk-profiling',
    level: 'group',
    harmType: 'Unequal treatment of a group by public risk profiling',
    mechanism: ['bias', 'scale'],
    description:
      'Risk models used to police benefits concentrate suspicion on groups defined by nationality, income or neighbourhood, and every false flag lands on a household. The Dutch tax administration used Dutch or non-Dutch nationality as an indicator in a system that designated childcare-benefit applications as risky [8].',
    exampleIncidents: [incidents.aiid101, incidents.aiaaicSyri, incidents.aiid57],
    failureMode:
      'A protected or proxy attribute enters the risk model, and flags drive adverse action with no group-level outcome monitoring.',
    controllingPattern: { name: 'FRIA-as-Code', patternId: 'pattern-fria-as-code' },
    evidence:
      'A versioned fundamental-rights impact assessment naming the affected groups, the permitted features and the monitoring metric, signed before deployment.',
    layerN: [1],
    mitTaxonomy: ['1.1'],
    sources: [1, 3, 4, 8],
  },
  {
    id: 'underrepresentation',
    level: 'group',
    harmType: 'Exclusion through under-representation in data',
    mechanism: ['bias'],
    description:
      'A group that is thin in the training data gets a worse service. Five commercial speech-recognition systems averaged a word error rate of 0.35 for Black speakers against 0.19 for white speakers [7].',
    exampleIncidents: [incidents.aiid102, incidents.aiid16],
    failureMode:
      'Performance is reported as one average, so the gap for a minority group never reaches a release decision.',
    controllingPattern: {
      name: 'Model Card as Control Evidence',
      patternId: 'pattern-model-card-as-control-evidence',
    },
    evidence:
      'A model card with performance disaggregated by the groups the system serves, and a data card describing who is in the training set.',
    layerN: [2],
    mitTaxonomy: ['1.3'],
    sources: [1, 3, 7],
  },
  {
    id: 'cohort-penalty',
    level: 'group',
    harmType: "Judging individuals by their group's history",
    mechanism: ['bias', 'opacity'],
    description:
      "When a model predicts an outcome distribution for a group and then places individuals within it, a person's result depends on the past record of their school, postcode or cohort. England's 2020 grading model predicted each centre's grade distribution from its history and used teachers' rank orders to assign grades within it [13].",
    exampleIncidents: [incidents.aiaaicOfqual],
    failureMode:
      'Acceptance tests are aggregate (distribution accuracy, group equality), so no test asks whether an individual outcome can be justified from evidence about that individual.',
    controllingPattern: { name: 'Human-in-the-loop Gate', patternId: 'pattern-human-in-the-loop-gate' },
    evidence:
      'A review queue and decision log for outlier cases (large adjustments, small cohorts), plus a contestation channel with its resolution records.',
    layerN: [4],
    mitTaxonomy: ['1.1'],
    sources: [1, 4, 13],
  },

  // Organisation
  {
    id: 'agent-operational-failure',
    level: 'organisation',
    harmType: 'Operational disruption by an agent acting beyond its mandate',
    mechanism: ['misalignment'],
    description:
      'An agent with write access to production can take destructive actions its operators never intended. The records include a coding agent reported to have deleted production data during a code freeze, and a drive-through ordering pilot ended after ordering errors [3].',
    exampleIncidents: [incidents.aiid1152, incidents.aiid475],
    failureMode:
      'The agent holds standing credentials broader than its task, and destructive actions need no approval.',
    controllingPattern: {
      name: 'Agent Identity & Scoped Credentials',
      patternId: 'pattern-agent-identity--scoped-credentials',
    },
    evidence:
      'An agent registry entry with owner, scope and expiry, and the authorisation log showing each destructive call denied or approved.',
    layerN: [4],
    mitTaxonomy: ['7.3'],
    sources: [1, 3],
  },
  {
    id: 'liability-for-outputs',
    level: 'organisation',
    harmType: 'Legal liability for what the system tells customers',
    mechanism: ['robustness'],
    description:
      "An organisation answers for its chatbot's statements as it answers for the rest of its website. The record here is a tribunal ordering an airline to compensate a customer its chatbot misinformed about a fare policy [3].",
    exampleIncidents: [incidents.aiid639],
    failureMode:
      'Answers about policy, price or eligibility are generated without a check against the authoritative source.',
    controllingPattern: { name: 'Runtime Guardrail', patternId: 'pattern-runtime-guardrail' },
    evidence:
      'Guardrail logs showing each policy answer grounded in, and cited to, the current policy document, and a refusal wherever no source matched.',
    layerN: [4],
    mitTaxonomy: ['3.1'],
    sources: [1, 3],
  },
  {
    id: 'regulatory-enforcement',
    level: 'organisation',
    harmType: 'Regulatory enforcement and forced suspension',
    mechanism: ['opacity', 'scale'],
    description:
      'Launching a system trained on personal data without a documented lawful basis invites orders to stop processing, and fines. Data protection authorities have temporarily limited a chatbot service in Italy and fined a face-search provider EUR 30.5 million in the Netherlands [3][9].',
    exampleIncidents: [incidents.aiid513, incidents.aiid781],
    failureMode:
      'The lawful basis, the transparency notice and the age check are treated as launch paperwork rather than as release preconditions.',
    controllingPattern: { name: 'Policy Card', patternId: 'pattern-policy-card' },
    evidence:
      'A policy card that makes a recorded lawful basis per data source a release precondition, and the CI check that enforced it.',
    layerN: [1],
    mitTaxonomy: ['2.1'],
    sources: [1, 3, 9],
  },
  {
    id: 'forecast-drift-loss',
    level: 'organisation',
    harmType: 'Financial loss from a model under distribution shift',
    mechanism: ['drift'],
    description:
      "A model that sets prices or commits capital keeps acting on yesterday's market. Zillow wound down its home-buying business in 2021 with an inventory write-down of about USD 304 million, its chief executive saying home-price forecasting was far less predictable than anticipated [14].",
    exampleIncidents: [incidents.aiid149],
    failureMode:
      "Forecast error is not monitored against realised outcomes, and nothing throttles the model's commitments when the error grows.",
    controllingPattern: {
      name: 'Continuous Assurance Telemetry',
      patternId: 'pattern-continuous-assurance-telemetry',
    },
    evidence:
      'Drift and realised-error telemetry against set thresholds, with the alerts and throttle decisions they triggered.',
    layerN: [5],
    mitTaxonomy: ['7.3'],
    sources: [1, 3, 14],
  },
  {
    id: 'deepfake-fraud',
    level: 'organisation',
    harmType: 'Fraud losses from synthetic impersonation',
    mechanism: ['misuse'],
    description:
      'Voice and video synthesis let fraudsters impersonate executives well enough to get payments released. The record here is a reported USD 25 million loss after a video call with a deepfaked finance chief [3].',
    exampleIncidents: [incidents.aiid634],
    failureMode:
      'A high-value action is authorised on the strength of a voice or video channel that can be synthesised.',
    controllingPattern: { name: 'Out-of-band verification for high-value actions' },
    evidence:
      'A payment-release log showing an independent call-back verification for every transfer above the threshold.',
    layerN: [4],
    mitTaxonomy: ['4.3'],
    sources: [1, 3],
  },
  {
    id: 'reputational-harm',
    level: 'organisation',
    harmType: 'Reputational damage from harmful or unlawful public outputs',
    mechanism: ['robustness', 'misuse'],
    description:
      'Public-facing systems that produce abusive content or unlawful advice damage trust in whoever deployed them. The records include a social chatbot reported to post racist content and a city chatbot that advised businesses to break the law [3][5].',
    exampleIncidents: [incidents.aiid6, incidents.aiid714, incidents.oecdMyCity],
    failureMode:
      'The system goes public without adversarial testing against the abuse and the domain questions it will actually receive.',
    controllingPattern: {
      name: 'Adversarial Red-Team Suite',
      patternId: 'pattern-adversarial-red-team-suite',
    },
    evidence:
      'Versioned red-team findings with severity and closure status, and the release decision that referenced them.',
    layerN: [3],
    mitTaxonomy: ['1.2', '3.1'],
    sources: [1, 3, 5],
  },
  {
    id: 'confidential-data-leak',
    level: 'organisation',
    harmType: 'Leakage of confidential data into external AI services',
    mechanism: ['security'],
    description:
      'Staff paste source code, meeting notes or customer data into external AI tools whose retention and training terms nobody reviewed. One manufacturer reportedly recorded three such leaks within a month of allowing use [3].',
    exampleIncidents: [incidents.aiid768],
    failureMode:
      'AI use is allowed or tolerated without an inventory, a gateway or data-loss checks on prompts.',
    controllingPattern: { name: 'Shadow-AI Discovery', patternId: 'pattern-shadow-ai-discovery' },
    evidence:
      'A discovered-AI inventory reconciled against the registry, and gateway logs with a data-loss verdict per prompt.',
    layerN: [2],
    mitTaxonomy: ['2.1'],
    sources: [1, 3],
  },
  {
    id: 'prompt-injection',
    level: 'organisation',
    harmType: 'Security compromise through prompt injection',
    mechanism: ['security'],
    description:
      "Instructions hidden in user input or retrieved content can override a model's instructions, reveal its system prompt or make it act for an attacker. The record here is early testers extracting a search chatbot's initial prompt [3].",
    exampleIncidents: [incidents.aiid473],
    failureMode:
      "Untrusted content reaches the model's context with the same authority as the operator's instructions.",
    controllingPattern: { name: 'Runtime Guardrail', patternId: 'pattern-runtime-guardrail' },
    evidence:
      'Input and output guardrail verdicts with the injection attempts they blocked, and red-team results for the known injection classes.',
    layerN: [4],
    mitTaxonomy: ['2.2'],
    sources: [1, 3],
  },
  {
    id: 'supply-chain-compromise',
    level: 'organisation',
    harmType: 'Supply-chain compromise through AI-suggested components',
    mechanism: ['security'],
    description:
      'Code assistants can suggest packages that do not exist, and attackers can register those names. NIST lists value chain and component integration among the generative-AI risks [12]; the record here is a hallucinated package name that was published and downloaded thousands of times [3].',
    exampleIncidents: [incidents.aiid731],
    failureMode:
      'Dependencies suggested by a model are installed without a provenance check against an approved registry.',
    controllingPattern: { name: 'AIBOM', patternId: 'pattern-aibom' },
    evidence:
      'An AIBOM and dependency manifest generated at build, with the provenance check that rejected unknown packages.',
    layerN: [2],
    mitTaxonomy: ['2.2'],
    sources: [1, 3, 12],
  },

  // Society
  {
    id: 'information-pollution',
    level: 'society',
    harmType: 'Pollution of the information ecosystem',
    mechanism: ['scale', 'misuse'],
    description:
      'Cheap synthetic text, images and audio make it harder to tell what is real, which erodes trust in authentic evidence as well as in fakes. NIST lists information integrity among its twelve generative-AI risks [12].',
    exampleIncidents: [incidents.aiid674],
    failureMode:
      'Generated media leave the system with no provenance signal that a platform or a reader could check.',
    controllingPattern: { name: 'Content provenance and labelling' },
    evidence:
      'Provenance metadata and labels attached at generation, with the share of outputs that carried them.',
    layerN: [2],
    mitTaxonomy: ['3.2', '4.1'],
    sources: [1, 3, 12],
  },
  {
    id: 'election-interference',
    level: 'society',
    harmType: 'Election interference with synthetic voices and media',
    mechanism: ['misuse'],
    description:
      "Synthetic audio of a candidate does most damage just before a vote, when there is no time to rebut it. The records include a fake presidential voice in robocalls before a US primary and deepfake recordings spread before Slovakia's 2023 election [3].",
    exampleIncidents: [incidents.aiid628, incidents.aiid573],
    failureMode:
      'Voice cloning is available without a consent check on whose voice is cloned, and the output carries no durable mark.',
    controllingPattern: { name: 'Content provenance and labelling' },
    evidence:
      'Consent records for every cloned voice, and watermark or provenance checks on generated audio.',
    layerN: [2],
    mitTaxonomy: ['4.1'],
    sources: [1, 3],
  },
  {
    id: 'job-displacement',
    level: 'society',
    harmType: 'Job displacement and task transformation',
    mechanism: ['scale'],
    description:
      'Generative AI changes what many jobs consist of. The ILO estimates that one in four workers globally are in an occupation with some generative-AI exposure, and finds transformation of jobs more likely than outright replacement [10]. This harm is structural, so no single incident record stands for it.',
    exampleIncidents: [],
    failureMode:
      'Deployment decisions count the productivity gain but not who loses tasks, income or bargaining power, and affected workers are not consulted.',
    controllingPattern: { name: 'Workforce impact assessment' },
    evidence:
      'An impact assessment listing the roles and tasks affected, the consultation held and the transition measures agreed.',
    layerN: [1],
    mitTaxonomy: ['6.2'],
    sources: [1, 10],
  },
  {
    id: 'hidden-labour',
    level: 'society',
    harmType: 'Inequality in who bears the cost: hidden data labour',
    mechanism: ['scale'],
    description:
      'The gains from AI flow to its builders and users while part of the cost falls on low-paid workers who label data, sometimes exposed to graphic material. The record here alleges that annotators in Kenya were exposed to graphic content while labelling for a model developer [3].',
    exampleIncidents: [incidents.aiid450],
    failureMode:
      'Data-supply contracts are bought on price with no labour or welfare standard, and nobody audits them.',
    controllingPattern: {
      name: 'Vendor / Model Due-Diligence Gate',
      patternId: 'pattern-vendor--model-due-diligence-gate',
    },
    evidence:
      'A supplier assessment covering annotator pay, exposure limits and support, renewed with the contract.',
    layerN: [2],
    mitTaxonomy: ['6.2', '6.1'],
    sources: [1, 3],
  },
  {
    id: 'over-reliance',
    level: 'society',
    harmType: 'Over-reliance on generated output in institutions',
    mechanism: ['overreliance'],
    description:
      'Professionals under time pressure accept fluent output without checking it. The records include fabricated case law filed in a US court and errors introduced into a child-protection report [3].',
    exampleIncidents: [incidents.aiid541, incidents.aiid807],
    failureMode:
      'Generated content enters a consequential record with no verification step and no disclosure that AI was used.',
    controllingPattern: { name: 'Human-in-the-loop Gate', patternId: 'pattern-human-in-the-loop-gate' },
    evidence:
      'A sign-off record showing who verified each generated passage against its source before filing.',
    layerN: [4],
    mitTaxonomy: ['5.1', '3.1'],
    sources: [1, 3],
  },
  {
    id: 'critical-services',
    level: 'society',
    harmType: 'Disruption to critical infrastructure and emergency services',
    mechanism: ['robustness', 'scale'],
    description:
      'When AI systems run transport, utilities or emergency response, one failure repeats across a whole fleet at once. The records include driverless cars that stalled in traffic after losing their server connection, and one that blocked a fire truck on an emergency call [3].',
    exampleIncidents: [incidents.aiid253, incidents.aiid389],
    failureMode:
      'A shared dependency (connectivity, a model update) fails for every unit at once, and there is no degraded mode that clears the way.',
    controllingPattern: {
      name: 'Kill Switch / Circuit Breaker',
      patternId: 'pattern-kill-switch--circuit-breaker',
    },
    evidence:
      'Fleet-level stop and safe-state drills, with records of when the breaker fired and how long recovery took.',
    layerN: [4],
    mitTaxonomy: ['7.3'],
    sources: [1, 3],
  },

  // Environment
  {
    id: 'energy-emissions',
    level: 'environment',
    harmType: 'Energy demand and emissions of training and inference',
    mechanism: ['scale'],
    description:
      "Training and serving models draws electricity, and so emissions, at data-centre scale. The IEA projects that data-centre electricity demand will more than double by 2030 to around 945 TWh, slightly more than Japan's consumption today [11]. NIST lists environmental impacts among the generative-AI risks [12].",
    exampleIncidents: [],
    failureMode:
      'Model and deployment choices are made without measuring energy use, so the cheapest adequate option is never compared.',
    controllingPattern: { name: 'Energy and emissions telemetry' },
    evidence:
      'Per-model energy and emissions figures, recorded for training and per unit of inference, published in the model card.',
    layerN: [5],
    mitTaxonomy: ['6.6'],
    sources: [1, 11, 12],
  },
  {
    id: 'local-environmental-burden',
    level: 'environment',
    harmType: 'Local pollution and resource burden near AI infrastructure',
    mechanism: ['scale'],
    description:
      'The power generation and cooling that AI data centres need can burden the communities around them. The record here alleges that a supercomputer site in Memphis ran unpermitted gas turbines [3].',
    exampleIncidents: [incidents.aiid1144],
    failureMode:
      'Capacity is added faster than permitting and community consultation, and buyers of compute never ask where or how it is powered.',
    controllingPattern: {
      name: 'Vendor / Model Due-Diligence Gate',
      patternId: 'pattern-vendor--model-due-diligence-gate',
    },
    evidence:
      "The provider's answers on energy source, permits and location, kept with the procurement decision.",
    layerN: [2],
    mitTaxonomy: ['6.6'],
    sources: [1, 3],
  },
];

/** Harms grouped by level, in levelOrder. */
export function harmsByLevel(): { level: HarmLevel; rows: Harm[] }[] {
  return levelOrder.map((level) => ({
    level,
    rows: harms.filter((harm) => harm.level === level),
  }));
}

/** Controls named in the atlas that have no pattern in chapter 05 yet. */
export function controlsWithoutPattern(): string[] {
  const names = harms
    .filter((harm) => !harm.controllingPattern.patternId)
    .map((harm) => harm.controllingPattern.name);
  return [...new Set(names)];
}
