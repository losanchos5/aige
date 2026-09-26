// nist-ai-rmf.ts: the subcategories of the NIST AI Risk Management Framework
// 1.0 (NIST AI 100-1, January 2023), the index the open control profiles map
// against (src/data/controls, mappings.nistAiRmf) and validate with
// controlProblems().
//
// PROVENANCE. Every `text` below is the subcategory as Tables 1 to 4 of the
// primary document print it (GOVERN, MAP, MEASURE, MANAGE; 72 subcategories),
// read on 2026-09-26 from
// https://nvlpubs.nist.gov/nistpubs/ai/NIST.AI.100-1.pdf. The only changes are
// the line-end hyphenation of the PDF undone and the typography of the source
// (curly quotes, en dashes) kept as printed. No subcategory is paraphrased in
// `text`; nothing here is NIST's endorsement of any control on this site.
//
// `nistAiRmfSubcategories` is the id -> short title map the pages, the API and
// the Markdown twins print next to an id. The eight ids the profiles already
// cited keep their short titles (SHORT_TITLES); every other id uses the first
// sentence of its official text.
export type NistAiRmfFunction = 'GOVERN' | 'MAP' | 'MEASURE' | 'MANAGE';

export interface NistAiRmfSubcategory {
  /** "MEASURE 2.7": function, category and subcategory number. */
  id: string;
  fn: NistAiRmfFunction;
  /** The subcategory as NIST AI 100-1 prints it. */
  text: string;
}

/** The primary document the index was read from, and when. */
export const NIST_AI_RMF_SOURCE = {
  title: 'NIST AI 100-1, Artificial Intelligence Risk Management Framework (AI RMF 1.0)',
  url: 'https://nvlpubs.nist.gov/nistpubs/ai/NIST.AI.100-1.pdf',
  published: '2023-01',
  read: '2026-09-26',
} as const;

export const nistAiRmfSubcategoryIndex: readonly NistAiRmfSubcategory[] = [
  { id: 'GOVERN 1.1', fn: 'GOVERN', text: 'Legal and regulatory requirements involving AI are understood, managed, and documented.' },
  { id: 'GOVERN 1.2', fn: 'GOVERN', text: 'The characteristics of trustworthy AI are integrated into organizational policies, processes, procedures, and practices.' },
  { id: 'GOVERN 1.3', fn: 'GOVERN', text: 'Processes, procedures, and practices are in place to determine the needed level of risk management activities based on the organization’s risk tolerance.' },
  { id: 'GOVERN 1.4', fn: 'GOVERN', text: 'The risk management process and its outcomes are established through transparent policies, procedures, and other controls based on organizational risk priorities.' },
  { id: 'GOVERN 1.5', fn: 'GOVERN', text: 'Ongoing monitoring and periodic review of the risk management process and its outcomes are planned and organizational roles and responsibilities clearly defined, including determining the frequency of periodic review.' },
  { id: 'GOVERN 1.6', fn: 'GOVERN', text: 'Mechanisms are in place to inventory AI systems and are resourced according to organizational risk priorities.' },
  { id: 'GOVERN 1.7', fn: 'GOVERN', text: 'Processes and procedures are in place for decommissioning and phasing out AI systems safely and in a manner that does not increase risks or decrease the organization’s trustworthiness.' },
  { id: 'GOVERN 2.1', fn: 'GOVERN', text: 'Roles and responsibilities and lines of communication related to mapping, measuring, and managing AI risks are documented and are clear to individuals and teams throughout the organization.' },
  { id: 'GOVERN 2.2', fn: 'GOVERN', text: 'The organization’s personnel and partners receive AI risk management training to enable them to perform their duties and responsibilities consistent with related policies, procedures, and agreements.' },
  { id: 'GOVERN 2.3', fn: 'GOVERN', text: 'Executive leadership of the organization takes responsibility for decisions about risks associated with AI system development and deployment.' },
  { id: 'GOVERN 3.1', fn: 'GOVERN', text: 'Decision-making related to mapping, measuring, and managing AI risks throughout the lifecycle is informed by a diverse team (e.g., diversity of demographics, disciplines, experience, expertise, and backgrounds).' },
  { id: 'GOVERN 3.2', fn: 'GOVERN', text: 'Policies and procedures are in place to define and differentiate roles and responsibilities for human-AI configurations and oversight of AI systems.' },
  { id: 'GOVERN 4.1', fn: 'GOVERN', text: 'Organizational policies and practices are in place to foster a critical thinking and safety-first mindset in the design, development, deployment, and uses of AI systems to minimize potential negative impacts.' },
  { id: 'GOVERN 4.2', fn: 'GOVERN', text: 'Organizational teams document the risks and potential impacts of the AI technology they design, develop, deploy, evaluate, and use, and they communicate about the impacts more broadly.' },
  { id: 'GOVERN 4.3', fn: 'GOVERN', text: 'Organizational practices are in place to enable AI testing, identification of incidents, and information sharing.' },
  { id: 'GOVERN 5.1', fn: 'GOVERN', text: 'Organizational policies and practices are in place to collect, consider, prioritize, and integrate feedback from those external to the team that developed or deployed the AI system regarding the potential individual and societal impacts related to AI risks.' },
  { id: 'GOVERN 5.2', fn: 'GOVERN', text: 'Mechanisms are established to enable the team that developed or deployed AI systems to regularly incorporate adjudicated feedback from relevant AI actors into system design and implementation.' },
  { id: 'GOVERN 6.1', fn: 'GOVERN', text: 'Policies and procedures are in place that address AI risks associated with third-party entities, including risks of infringement of a third-party’s intellectual property or other rights.' },
  { id: 'GOVERN 6.2', fn: 'GOVERN', text: 'Contingency processes are in place to handle failures or incidents in third-party data or AI systems deemed to be high-risk.' },
  { id: 'MAP 1.1', fn: 'MAP', text: 'Intended purposes, potentially beneficial uses, context-specific laws, norms and expectations, and prospective settings in which the AI system will be deployed are understood and documented. Considerations include: the specific set or types of users along with their expectations; potential positive and negative impacts of system uses to individuals, communities, organizations, society, and the planet; assumptions and related limitations about AI system purposes, uses, and risks across the development or product AI lifecycle; and related TEVV and system metrics.' },
  { id: 'MAP 1.2', fn: 'MAP', text: 'Interdisciplinary AI actors, competencies, skills, and capacities for establishing context reflect demographic diversity and broad domain and user experience expertise, and their participation is documented. Opportunities for interdisciplinary collaboration are prioritized.' },
  { id: 'MAP 1.3', fn: 'MAP', text: 'The organization’s mission and relevant goals for AI technology are understood and documented.' },
  { id: 'MAP 1.4', fn: 'MAP', text: 'The business value or context of business use has been clearly defined or – in the case of assessing existing AI systems – re-evaluated.' },
  { id: 'MAP 1.5', fn: 'MAP', text: 'Organizational risk tolerances are determined and documented.' },
  { id: 'MAP 1.6', fn: 'MAP', text: 'System requirements (e.g., “the system shall respect the privacy of its users”) are elicited from and understood by relevant AI actors. Design decisions take socio-technical implications into account to address AI risks.' },
  { id: 'MAP 2.1', fn: 'MAP', text: 'The specific tasks and methods used to implement the tasks that the AI system will support are defined (e.g., classifiers, generative models, recommenders).' },
  { id: 'MAP 2.2', fn: 'MAP', text: 'Information about the AI system’s knowledge limits and how system output may be utilized and overseen by humans is documented. Documentation provides sufficient information to assist relevant AI actors when making decisions and taking subsequent actions.' },
  { id: 'MAP 2.3', fn: 'MAP', text: 'Scientific integrity and TEVV considerations are identified and documented, including those related to experimental design, data collection and selection (e.g., availability, representativeness, suitability), system trustworthiness, and construct validation.' },
  { id: 'MAP 3.1', fn: 'MAP', text: 'Potential benefits of intended AI system functionality and performance are examined and documented.' },
  { id: 'MAP 3.2', fn: 'MAP', text: 'Potential costs, including non-monetary costs, which result from expected or realized AI errors or system functionality and trustworthiness – as connected to organizational risk tolerance – are examined and documented.' },
  { id: 'MAP 3.3', fn: 'MAP', text: 'Targeted application scope is specified and documented based on the system’s capability, established context, and AI system categorization.' },
  { id: 'MAP 3.4', fn: 'MAP', text: 'Processes for operator and practitioner proficiency with AI system performance and trustworthiness – and relevant technical standards and certifications – are defined, assessed, and documented.' },
  { id: 'MAP 3.5', fn: 'MAP', text: 'Processes for human oversight are defined, assessed, and documented in accordance with organizational policies from the GOVERN function.' },
  { id: 'MAP 4.1', fn: 'MAP', text: 'Approaches for mapping AI technology and legal risks of its components – including the use of third-party data or software – are in place, followed, and documented, as are risks of infringement of a third party’s intellectual property or other rights.' },
  { id: 'MAP 4.2', fn: 'MAP', text: 'Internal risk controls for components of the AI system, including third-party AI technologies, are identified and documented.' },
  { id: 'MAP 5.1', fn: 'MAP', text: 'Likelihood and magnitude of each identified impact (both potentially beneficial and harmful) based on expected use, past uses of AI systems in similar contexts, public incident reports, feedback from those external to the team that developed or deployed the AI system, or other data are identified and documented.' },
  { id: 'MAP 5.2', fn: 'MAP', text: 'Practices and personnel for supporting regular engagement with relevant AI actors and integrating feedback about positive, negative, and unanticipated impacts are in place and documented.' },
  { id: 'MEASURE 1.1', fn: 'MEASURE', text: 'Approaches and metrics for measurement of AI risks enumerated during the MAP function are selected for implementation starting with the most significant AI risks. The risks or trustworthiness characteristics that will not – or cannot – be measured are properly documented.' },
  { id: 'MEASURE 1.2', fn: 'MEASURE', text: 'Appropriateness of AI metrics and effectiveness of existing controls are regularly assessed and updated, including reports of errors and potential impacts on affected communities.' },
  { id: 'MEASURE 1.3', fn: 'MEASURE', text: 'Internal experts who did not serve as front-line developers for the system and/or independent assessors are involved in regular assessments and updates. Domain experts, users, AI actors external to the team that developed or deployed the AI system, and affected communities are consulted in support of assessments as necessary per organizational risk tolerance.' },
  { id: 'MEASURE 2.1', fn: 'MEASURE', text: 'Test sets, metrics, and details about the tools used during TEVV are documented.' },
  { id: 'MEASURE 2.2', fn: 'MEASURE', text: 'Evaluations involving human subjects meet applicable requirements (including human subject protection) and are representative of the relevant population.' },
  { id: 'MEASURE 2.3', fn: 'MEASURE', text: 'AI system performance or assurance criteria are measured qualitatively or quantitatively and demonstrated for conditions similar to deployment setting(s). Measures are documented.' },
  { id: 'MEASURE 2.4', fn: 'MEASURE', text: 'The functionality and behavior of the AI system and its components – as identified in the MAP function – are monitored when in production.' },
  { id: 'MEASURE 2.5', fn: 'MEASURE', text: 'The AI system to be deployed is demonstrated to be valid and reliable. Limitations of the generalizability beyond the conditions under which the technology was developed are documented.' },
  { id: 'MEASURE 2.6', fn: 'MEASURE', text: 'The AI system is evaluated regularly for safety risks – as identified in the MAP function. The AI system to be deployed is demonstrated to be safe, its residual negative risk does not exceed the risk tolerance, and it can fail safely, particularly if made to operate beyond its knowledge limits. Safety metrics reflect system reliability and robustness, real-time monitoring, and response times for AI system failures.' },
  { id: 'MEASURE 2.7', fn: 'MEASURE', text: 'AI system security and resilience – as identified in the MAP function – are evaluated and documented.' },
  { id: 'MEASURE 2.8', fn: 'MEASURE', text: 'Risks associated with transparency and accountability – as identified in the MAP function – are examined and documented.' },
  { id: 'MEASURE 2.9', fn: 'MEASURE', text: 'The AI model is explained, validated, and documented, and AI system output is interpreted within its context – as identified in the MAP function – to inform responsible use and governance.' },
  { id: 'MEASURE 2.10', fn: 'MEASURE', text: 'Privacy risk of the AI system – as identified in the MAP function – is examined and documented.' },
  { id: 'MEASURE 2.11', fn: 'MEASURE', text: 'Fairness and bias – as identified in the MAP function – are evaluated and results are documented.' },
  { id: 'MEASURE 2.12', fn: 'MEASURE', text: 'Environmental impact and sustainability of AI model training and management activities – as identified in the MAP function – are assessed and documented.' },
  { id: 'MEASURE 2.13', fn: 'MEASURE', text: 'Effectiveness of the employed TEVV metrics and processes in the MEASURE function are evaluated and documented.' },
  { id: 'MEASURE 3.1', fn: 'MEASURE', text: 'Approaches, personnel, and documentation are in place to regularly identify and track existing, unanticipated, and emergent AI risks based on factors such as intended and actual performance in deployed contexts.' },
  { id: 'MEASURE 3.2', fn: 'MEASURE', text: 'Risk tracking approaches are considered for settings where AI risks are difficult to assess using currently available measurement techniques or where metrics are not yet available.' },
  { id: 'MEASURE 3.3', fn: 'MEASURE', text: 'Feedback processes for end users and impacted communities to report problems and appeal system outcomes are established and integrated into AI system evaluation metrics.' },
  { id: 'MEASURE 4.1', fn: 'MEASURE', text: 'Measurement approaches for identifying AI risks are connected to deployment context(s) and informed through consultation with domain experts and other end users. Approaches are documented.' },
  { id: 'MEASURE 4.2', fn: 'MEASURE', text: 'Measurement results regarding AI system trustworthiness in deployment context(s) and across the AI lifecycle are informed by input from domain experts and relevant AI actors to validate whether the system is performing consistently as intended. Results are documented.' },
  { id: 'MEASURE 4.3', fn: 'MEASURE', text: 'Measurable performance improvements or declines based on consultations with relevant AI actors, including affected communities, and field data about context-relevant risks and trustworthiness characteristics are identified and documented.' },
  { id: 'MANAGE 1.1', fn: 'MANAGE', text: 'A determination is made as to whether the AI system achieves its intended purposes and stated objectives and whether its development or deployment should proceed.' },
  { id: 'MANAGE 1.2', fn: 'MANAGE', text: 'Treatment of documented AI risks is prioritized based on impact, likelihood, and available resources or methods.' },
  { id: 'MANAGE 1.3', fn: 'MANAGE', text: 'Responses to the AI risks deemed high priority, as identified by the MAP function, are developed, planned, and documented. Risk response options can include mitigating, transferring, avoiding, or accepting.' },
  { id: 'MANAGE 1.4', fn: 'MANAGE', text: 'Negative residual risks (defined as the sum of all unmitigated risks) to both downstream acquirers of AI systems and end users are documented.' },
  { id: 'MANAGE 2.1', fn: 'MANAGE', text: 'Resources required to manage AI risks are taken into account – along with viable non-AI alternative systems, approaches, or methods – to reduce the magnitude or likelihood of potential impacts.' },
  { id: 'MANAGE 2.2', fn: 'MANAGE', text: 'Mechanisms are in place and applied to sustain the value of deployed AI systems.' },
  { id: 'MANAGE 2.3', fn: 'MANAGE', text: 'Procedures are followed to respond to and recover from a previously unknown risk when it is identified.' },
  { id: 'MANAGE 2.4', fn: 'MANAGE', text: 'Mechanisms are in place and applied, and responsibilities are assigned and understood, to supersede, disengage, or deactivate AI systems that demonstrate performance or outcomes inconsistent with intended use.' },
  { id: 'MANAGE 3.1', fn: 'MANAGE', text: 'AI risks and benefits from third-party resources are regularly monitored, and risk controls are applied and documented.' },
  { id: 'MANAGE 3.2', fn: 'MANAGE', text: 'Pre-trained models which are used for development are monitored as part of AI system regular monitoring and maintenance.' },
  { id: 'MANAGE 4.1', fn: 'MANAGE', text: 'Post-deployment AI system monitoring plans are implemented, including mechanisms for capturing and evaluating input from users and other relevant AI actors, appeal and override, decommissioning, incident response, recovery, and change management.' },
  { id: 'MANAGE 4.2', fn: 'MANAGE', text: 'Measurable activities for continual improvements are integrated into AI system updates and include regular engagement with interested parties, including relevant AI actors.' },
  { id: 'MANAGE 4.3', fn: 'MANAGE', text: 'Incidents and errors are communicated to relevant AI actors, including affected communities. Processes for tracking, responding to, and recovering from incidents and errors are followed and documented.' },
];

/** Short titles of the ids the profiles cited before the full index existed. */
const SHORT_TITLES: Readonly<Record<string, string>> = {
  'GOVERN 1.7': 'Decommissioning and phasing out AI systems safely',
  'MEASURE 2.3': 'Performance or assurance criteria measured for deployment-like conditions',
  'MEASURE 2.5': 'The system is demonstrated to be valid and reliable',
  'MEASURE 2.6': 'The system is evaluated regularly for safety risks',
  'MEASURE 2.7': 'Security and resilience are evaluated and documented',
  'MEASURE 3.1': 'Existing, unanticipated and emergent risks are tracked',
  'MANAGE 2.4': 'Mechanisms to supersede, disengage or deactivate AI systems',
  'MANAGE 4.1': 'Post-deployment monitoring plans are implemented',
};

/** The first sentence of an official text (the whole text when it has one sentence). */
function firstSentence(text: string): string {
  return /^(.*?\.)(?:\s|$)/.exec(text)?.[1] ?? text;
}

/** NIST AI RMF 1.0 subcategories: id -> short title (every id of the index). */
export const nistAiRmfSubcategories: Readonly<Record<string, string>> = Object.fromEntries(
  nistAiRmfSubcategoryIndex.map((s) => [s.id, SHORT_TITLES[s.id] ?? firstSentence(s.text)]),
);

/** The subcategory with this id, if the index has it. */
export function nistAiRmfSubcategoryById(id: string): NistAiRmfSubcategory | undefined {
  return nistAiRmfSubcategoryIndex.find((s) => s.id === id);
}
