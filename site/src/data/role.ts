// role.ts: the AI governance engineer as a concrete role, faithful to
// bok/06-the-role.md. Workflows, skills, the analyst-vs-engineer contrast,
// the three ways in and the employer mistakes are the chapter's own lists.
//
// Numbers policy: `market` carries only figures the chapter attributes to a
// primary source (the IAPP Salary & Jobs Report medians), each `primary: true`.
// The LinkedIn "+150%" demand signal is kept but flagged `primary: false` and
// must never be shown as a headline stat tile. Employer names from the
// postings footnote, and every forbidden claim, are deliberately omitted.

export type WorkflowLayer = 1 | 2 | 3 | 4 | 5 | 'all';

export interface Workflow {
  /** Short id. */
  id: string;
  /** Workflow name, as the chapter's H3. */
  name: string;
  /** The stack layer the workflow maps to ('all' for regulatory translation). */
  layerN: WorkflowLayer;
  /** One-to-two-sentence summary, faithful to the chapter. */
  summary: string;
  /** `#slug` of the workflow's H3 heading. */
  anchor: string;
}

export interface SkillArea {
  /** The workflow (or cross-cutting theme) the skills serve. */
  area: string;
  /** Core, load-bearing skills. */
  core: readonly string[];
  /** Supporting skills. */
  supporting: readonly string[];
}

export interface AnalystEngineerRow {
  /** The dimension being contrasted. */
  dimension: string;
  /** What the analyst does on this dimension. */
  analyst: string;
  /** What the engineer does on this dimension. */
  engineer: string;
}

export interface WayIn {
  /** The adjacent discipline someone converts from. */
  title: string;
  /** Edge, gap and where to start, in one to two sentences. */
  summary: string;
}

export interface MarketStat {
  /** The figure, formatted for display. */
  value: string;
  /** What the figure measures. */
  label: string;
  /** The source that reported it. */
  source: string;
  /** The source URL, where available. */
  sourceUrl?: string;
  /** True only for figures a primary source attributes; false must not be a tile. */
  primary: boolean;
}

/** The chapter's one-line capability statement for the role. */
export const capabilityStatement =
  'The person, on whatever org chart, who holds the capability of AI governance engineering and is accountable for the three questions in production: what AI is running, what it is allowed to do, and what evidence proves it.';

/** The one line that separates the engineer from the analyst. */
export const analystDistinction =
  'The AI governance analyst describes the system from the outside and files the description; the AI governance engineer reads the system directly and ships the control that changes what it does.';

/** The seven workflows the role owns, each mapped to a stack layer. */
export const workflows: readonly Workflow[] = [
  {
    id: 'intake-and-classification',
    name: 'Intake and classification',
    layerN: 2,
    summary:
      'Every AI system, model and agent enters through an intake that classifies it by risk tier, regulatory exposure, data sensitivity and autonomy. The engineer builds intake as a form-plus-code path that scaffolds a registry entry, triggers the right impact assessment and routes the system to the controls its class requires.',
    anchor: 'intake-and-classification',
  },
  {
    id: 'inventory-and-registry',
    name: 'Inventory and registry',
    layerN: 2,
    summary:
      'The engineer owns the inventory of models and the agent registry — every non-human actor with an owner, a declared scope, a status and a kill switch. What distinguishes the engineer is the runtime data path: the registry is fed by the deployment pipeline and by discovery against production, not typed into a spreadsheet.',
    anchor: 'inventory-and-registry',
  },
  {
    id: 'evals-and-red-teaming',
    name: 'Evals and red teaming as evidence',
    layerN: 3,
    summary:
      'The engineer builds and maintains the eval suites — capability, safety and adversarial — and wires them into an eval gate so a failing eval blocks the release. This is the workflow that most sharply separates the engineer from the analyst: the engineer writes the test the model must pass and owns the harness that runs it.',
    anchor: 'evals-and-red-teaming-as-evidence',
  },
  {
    id: 'policy-as-code-and-gates',
    name: 'Policy-as-code and gates',
    layerN: 1,
    summary:
      'The engineer expresses governance rules as executable policy that evaluates in CI/CD and at admission, and maintains the gates that enforce them. The output is a merge that is blocked or allowed, with a logged reason — not a recommendation in a review.',
    anchor: 'policy-as-code-and-gates',
  },
  {
    id: 'runtime-monitoring-and-incidents',
    name: 'Runtime monitoring and incidents',
    layerN: 4,
    summary:
      'The engineer instruments runtime: guardrail decisions, tool-call mediation, drift signals and agent behaviour stream into observability. They own the detection-to-report path for serious incidents, including the Article 73 clock for high-risk systems, and the tested kill switch for agents.',
    anchor: 'runtime-monitoring-and-incidents',
  },
  {
    id: 'assurance-and-audit-evidence',
    name: 'Assurance and audit evidence',
    layerN: 5,
    summary:
      'The engineer emits audit-ready evidence as a by-product of the build — OSCAL component and assessment artefacts, signed logs, structured eval results — so the audit is a query, not a project. This is continuous assurance: the control status is a live signal, not a point-in-time attestation.',
    anchor: 'assurance-and-audit-evidence',
  },
  {
    id: 'regulatory-translation',
    name: 'Regulatory translation',
    layerN: 'all',
    summary:
      'The engineer reads the obligation well enough to build the control that meets it — turning an AI Act article, an ISO/IEC 42001 control or a NIST AI RMF subcategory into a gate, a registry field or an evidence artefact, and back, so an auditor can trace the control to the obligation. This is translation, not legal advice.',
    anchor: 'regulatory-translation',
  },
] as const;

/** Skills grouped by the workflow they serve, plus the two cross-cutting ones. */
export const skills: readonly SkillArea[] = [
  {
    area: 'Intake & classification',
    core: [
      'Risk taxonomy design',
      'Reading the EU AI Act risk tiers',
      'Requirements analysis',
    ],
    supporting: ['Form/workflow tooling', 'Light data modelling'],
  },
  {
    area: 'Inventory & registry',
    core: [
      'Non-human identity and scoped access',
      'API integration to CI/CD',
      'Data modelling',
    ],
    supporting: ['Cloud IAM', 'Discovery tooling', 'SPIFFE/SPIRE concepts'],
  },
  {
    area: 'Evals & red teaming',
    core: [
      'Eval harness engineering',
      'Adversarial prompting',
      'Statistical literacy',
      'Python',
    ],
    supporting: [
      'LLM/agent internals',
      'Benchmark design',
      'Threat modelling (STRIDE/PASTA)',
    ],
  },
  {
    area: 'Policy-as-code & gates',
    core: ['OPA/Rego or Cedar', 'CI/CD pipeline engineering', 'Git'],
    supporting: ['Policy schema design (Policy Cards)', 'Admission control'],
  },
  {
    area: 'Runtime monitoring & incidents',
    core: [
      'Observability/OpenTelemetry',
      'Guardrail configuration',
      'Incident response',
    ],
    supporting: ['Detection engineering', 'MCP and agent-protocol security'],
  },
  {
    area: 'Assurance & audit evidence',
    core: [
      'OSCAL and machine-readable evidence',
      'Logging and signing',
      'Audit fluency',
    ],
    supporting: ['Cryptographic attestation', 'Evidence-store design'],
  },
  {
    area: 'Regulatory translation',
    core: [
      'Reading regulation and standards (AI Act, ISO/IEC 42001, NIST AI RMF)',
      'Mapping',
    ],
    supporting: ['Legal English', 'DPIA/FRIA methodology'],
  },
  {
    area: 'Cross-cutting (under all seven workflows)',
    core: [
      'Python — enough to glue systems together',
      'Law-reading — enough to parse an article without mistaking it for advice',
    ],
    supporting: [],
  },
] as const;

/** The analyst-vs-engineer contrast: cadence and artefact, not competence. */
export const analystVsEngineer: readonly AnalystEngineerRow[] = [
  {
    dimension: 'Evidence artefact',
    analyst:
      'A point-in-time artefact — an attestation, a questionnaire, an exported report — compiled for a review',
    engineer:
      'A continuously emitted artefact — a query result, an eval run, a signed log — produced as the pipeline runs',
  },
  {
    dimension: 'Primary source',
    analyst:
      "Works from the system's reported description: documentation, summaries and vendor answers",
    engineer:
      'Works from the running system: the registry and production telemetry, the same signals the build emits',
  },
  {
    dimension: 'Toolset',
    analyst: 'Spreadsheets, a GRC/AI-governance platform, ticketing',
    engineer:
      'Python, OPA/Rego, Git, CI/CD, eval harnesses, OSCAL — plus the platform',
  },
  {
    dimension: 'Cadence',
    analyst: 'Periodic: quarterly reviews, annual assessments',
    engineer: 'Continuous: every commit, deploy and runtime call',
  },
  {
    dimension: 'Output',
    analyst: 'A report, a mapping matrix, a risk rating',
    engineer:
      'A merged-or-blocked build, a registered agent, a machine-readable evidence artefact',
  },
  {
    dimension: 'Success metric',
    analyst: 'Audit passed, framework coverage complete',
    engineer:
      'Control failures caught before the auditor arrives, and realised risk measurably reduced',
  },
] as const;

/** The three ways into the role, each from an adjacent discipline. */
export const waysIn: readonly WayIn[] = [
  {
    title: 'From Legal or privacy',
    summary:
      'Your edge is regulatory translation; your gap is the build. Turn one assessment into a versioned, executable artefact and learn enough pipeline to see where the control fires — start at policy-as-code and intake.',
  },
  {
    title: 'From Security or GRC',
    summary:
      'Your edge is the control mindset; your gap is the model layer. Add the AI-specific objects — evals as controls, agent identity and scope, and the model and agent failure modes of the OWASP Agentic Top 10 — starting at evals-as-evidence and the agent registry.',
  },
  {
    title: 'From MLOps or ML engineering',
    summary:
      'Your edge is the runtime data path everyone else lacks; your gap is the obligation. Add the eval gate rather than the eval report, the registry field for owner and scope, and the evidence artefact the audit needs — start at eval gates in CI and runtime monitoring.',
  },
] as const;

/** What employers get wrong in the job description, read against the workflows. */
export const employerMistakes: readonly string[] = [
  'Certifications as a proxy for capability: descriptions list AIGP, CIPP, CISSP and CISM as if a certificate produced a control, while under-specifying the load-bearing skills — eval harnesses, policy-as-code, the runtime data path.',
  'Analyst work under an engineer title: many "AI Governance Engineer" postings describe intake, mapping and reporting at engineer pay; the tell is the absence of any build — no eval gate, no registry integration, no evidence pipeline.',
  'Everything, in one hire: a single posting asks for policy-as-code, red teaming, identity, observability, incident response, regulatory translation and stakeholder management. That is a function, not a person; a first hire owns two or three workflows and builds the paved path for the rest.',
] as const;

/** Market figures. Only primary-sourced medians are `primary: true` (tile-safe). */
export const market: readonly MarketStat[] = [
  {
    value: 'USD 221k',
    label: 'Median technical AI-governance salary, tech sector (highest band)',
    source: 'IAPP Salary & Jobs Report 2025-26',
    sourceUrl: 'https://iapp.org/resources/article/salary-survey-summary/',
    primary: true,
  },
  {
    value: 'USD 151.8k',
    label: 'Median AI-governance salary (work generally)',
    source: 'IAPP Salary & Jobs Report 2025-26',
    sourceUrl: 'https://iapp.org/resources/article/salary-survey-summary/',
    primary: true,
  },
  {
    value: 'USD 169.7k',
    label: 'Median combined privacy-and-AI-governance salary',
    source: 'IAPP Salary & Jobs Report 2025-26',
    sourceUrl: 'https://iapp.org/resources/article/salary-survey-summary/',
    primary: true,
  },
  {
    value: '+150%',
    label: 'AI governance, year over year (reported demand signal — not a stat tile)',
    source: 'LinkedIn 2026 Skills on the Rise (reported via EdTech Innovation Hub)',
    sourceUrl:
      'https://www.edtechinnovationhub.com/news/linkedins-2026-skills-on-the-rise-shows-global-ai-driving-hiring-shifts',
    primary: false,
  },
] as const;
