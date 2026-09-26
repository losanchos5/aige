// controls/evaluation-environment.ts: the Evaluation Environment Control
// Profile, v0.2 (draft). The environment a model or agent is evaluated in is
// part of the system being evaluated: the harness, the tools and MCP servers it
// can call, the credentials it holds, the network it can reach, the monitors
// watching it and the handles that stop it. A result is only as good as the
// evidence that the environment was what the report says it was.
//
// Nine controls, AIGE-CTL-EVAL-001 to 009, all specified (`depth:
// 'specified'`): each has a verification procedure a third party can repeat,
// the evidence it leaves, implementation notes grounded in a cited source, an
// observation record and two illustrative example observations
// (public/schemas/control-observation.v1.json). v0.1 specified 002, 003 and
// 006; v0.2 promoted the other six once every claim they make had a source
// re-opened on 2026-09-26. A control whose claims cannot all be sourced goes
// back to an outline (`depth: 'stub'`) with the open questions a reviewer
// should settle, and the changelog says why.
//
// Every reference was opened on 2026-09-26. Quotations from METR's public
// documents are short and attributed ("METR states"); citing them implies no
// endorsement of this profile by METR, and no affiliation. Public guidance and
// incident reports from AI developers are cited for what each company states or
// reports (self-reported, not audited), only where they directly evidence a
// control; the profile cross-references them and is neither derived from nor
// endorsed by any of them. AIUC-1 ids are mapped only where the requirement
// text, read on its public page on 2026-09-26, plainly covers the same
// objective (AIUC1_REQUIREMENTS); retired requirements are never mapped.
//
// Draft control specifications, open for technical review; illustrative, not a
// claim of conformity, not legal advice. Types and rules: ./index.ts.
import type { Control, ControlProfile } from './index';
import type { Source } from '../../lib/sources';
import { threatSources, SRC } from '../threats';
import { site } from '../site';

const PROFILE = 'evaluation-environment';

export const evaluationEnvironmentProfile: ControlProfile = {
  slug: PROFILE,
  title: 'Evaluation Environment Control Profile',
  shortTitle: 'Evaluation environment',
  version: '0.2',
  status: 'draft',
  reviewerStatus: 'open',
  summary:
    'Draft control specifications for the environment a model or agent is evaluated in: the harness, tools, credentials, network, monitoring and stop conditions around it, and the evidence a run leaves.',
  scope:
    'Evaluation environments for models and agents, from the harness and the tools and MCP servers a run can call to the credentials it holds, the network it can reach and the records it leaves. The evaluation tasks, their scoring rubrics and the capabilities being measured are out of scope.',
  published: '2026-09-26',
  updated: '2026-09-26',
  authors: ['jorge-garcia-aibar'],
  reviewers: [],
  changelog: [
    {
      version: '0.1',
      date: '2026-09-26',
      note: 'First draft: three controls specified in full (002 Network Egress Control, 003 Credential Isolation, 006 Stop Conditions) and six outlines with open questions, open for technical review.',
    },
    {
      version: '0.2',
      date: '2026-09-26',
      note: 'Six outlines promoted to specified, each with repeatable verification steps, evidence tied to a published schema, configuration-level implementation notes, an observation record and two illustrative example observations: 001 Authorization Boundary, 004 Tool and Action Mediation, 005 Monitoring Integrity, 007 Incident Evidence Preservation, 008 Harness and Configuration Attestation and 009 Evaluation Validity Checks. Every source they cite was re-opened on 2026-09-26. No control remains an outline: each promoted claim had a verified source. Still open for technical review; no reviewer is credited yet.',
    },
  ],
  issueTemplate: 'control-review.yml',
};

// ---------------------------------------------------------------------------
// References. The Body of Knowledge chapters first, then external sources.
// Rows already verified elsewhere on the site (../threats.ts threatSources,
// sources/SOURCES.md chapter 23) are reused with the same title and URL.

/** A section of a Body of Knowledge chapter, as a numbered reference. */
function chapter(slug: string, number: string, title: string, anchor: string, heading: string): Source {
  return {
    title,
    gloss: `AI Governance Engineering Body of Knowledge v${site.bokVersion}, chapter ${number}, section "${heading}"`,
    publisher: `${site.name} (${site.author})`,
    date: '2026-09',
    url: `${site.url}/bok/${slug}#${anchor}`,
    verified: 'primary',
  };
}

const ch23 = (anchor: string, heading: string) => chapter('governing-agents', '23', 'Governing AI agents', anchor, heading);
const ch17 = (anchor: string, heading: string) =>
  chapter('incidents', '17', 'Incidents, issues and root causes', anchor, heading);
const ch14 = (anchor: string, heading: string) =>
  chapter('governing-development', '14', 'Governing AI development', anchor, heading);

const CH23 = {
  object: ch23('what-makes-an-agent-a-governance-object', 'What makes an agent a governance object'),
  autonomy: ch23('autonomy-is-a-design-decision', 'Autonomy is a design decision'),
  registry: ch23('the-agent-registry', 'The agent registry'),
  identity: ch23('identity-and-short-lived-credentials', 'Identity and short-lived credentials'),
  credentials: ch23('short-lived-attested-credentials', 'Short-lived, attested credentials'),
  delegation: ch23('delegation-without-impersonation', 'Delegation without impersonation'),
  mcpAuth: ch23('mcp-authorization-as-of-2026-07-28', 'MCP authorization as of 2026-07-28'),
  allowList: ch23('the-tool-allow-list', 'The tool allow-list'),
  mcpAdmission: ch23('admitting-an-mcp-server', 'Admitting an MCP server'),
  checkpoint: ch23('where-to-put-a-checkpoint', 'Where to put a checkpoint'),
  guardrails: ch23('runtime-guardrails-for-tool-calls', 'Runtime guardrails for tool calls'),
  limits: ch23('execution-limits', 'Execution limits'),
  killSwitch: ch23('kill-switch-and-per-agent-circuit-breakers', 'Kill switch and per-agent circuit breakers'),
  hops: ch23('stopping-across-hops', 'Stopping across hops'),
  prompts: ch23('prompts-as-configuration-under-change-control', 'Prompts as configuration under change control'),
  incidents: ch23('an-agent-incident-taxonomy', 'An agent incident taxonomy'),
  telemetry: ch23('telemetry-with-the-opentelemetry-genai-conventions', 'Telemetry with the OpenTelemetry GenAI conventions'),
} as const;

const CH17 = {
  freeze: ch17('freeze-before-you-fix', 'Freeze before you fix'),
  record: ch17('the-incident-record', 'The incident record'),
  clocks: ch17('the-overlapping-clocks', 'The overlapping clocks'),
} as const;

const CH14 = {
  validity: ch14('statistical-validity-of-evals', 'Statistical validity of evals'),
  validation: ch14('independent-validation-and-model-risk-management', 'Independent validation and model risk management'),
  reproducibility: ch14('reproducibility-and-linked-versioning', 'Reproducibility and linked versioning'),
} as const;

/** Rows shared with the threat bridge (../threats.ts). */
const OWASP_AGENTIC: Source = threatSources[SRC.asi - 1];
const OWASP_LLM: Source = threatSources[SRC.llm2026 - 1];
const ATLAS: Source = threatSources[SRC.atlas - 1];
const SSDF_GENAI: Source = threatSources[SRC.ssdf - 1];

const SP_800_53: Source = {
  title: 'NIST SP 800-53 Rev. 5, Security and Privacy Controls for Information Systems and Organizations',
  gloss: 'control catalogue cited by control id; publication page of Revision 5 with update 1 of 10 Dec 2020',
  publisher: 'NIST',
  date: '2020-12-10',
  url: 'https://csrc.nist.gov/pubs/sp/800/53/r5/upd1/final',
  verified: 'primary',
};

const AI_ACT: Source = {
  title: 'Regulation (EU) 2024/1689 (AI Act), consolidated text of 2026-07-27 as amended by Regulation (EU) 2026/1744',
  gloss: 'Art. 14(4)(e): human oversight includes the means to interrupt the system through a stop procedure',
  publisher: 'Publications Office of the EU (EUR-Lex)',
  date: '2026-07-27',
  url: 'https://eur-lex.europa.eu/eli/reg/2024/1689/2026-07-27/eng',
  verified: 'primary',
};

const NIST_AI_RMF: Source = {
  title: 'NIST AI RMF 1.0 (AI 100-1)',
  gloss: 'MANAGE 2.4: mechanisms to "supersede, disengage, or deactivate AI systems" whose outcomes are inconsistent with intended use',
  publisher: 'NIST',
  date: '2023-01-26',
  url: 'https://nvlpubs.nist.gov/nistpubs/ai/NIST.AI.100-1.pdf',
  verified: 'primary',
};

const RFC_8693: Source = {
  title: 'RFC 8693, OAuth 2.0 Token Exchange',
  gloss: 'the act claim "provides a means within a JWT to express that delegation has occurred and identify the acting party"',
  publisher: 'IETF',
  date: '2020-01',
  url: 'https://www.rfc-editor.org/rfc/rfc8693.html',
  verified: 'primary',
};

const MCP_AUTH: Source = {
  title: 'MCP specification 2026-07-28, Authorization',
  gloss: 'MCP servers MUST validate that access tokens were issued specifically for them and "MUST NOT accept or transit any other tokens"',
  publisher: 'Model Context Protocol',
  date: '2026-07-28',
  url: 'https://modelcontextprotocol.io/specification/2026-07-28/basic/authorization',
  verified: 'primary',
};

const MCP_SECURITY: Source = {
  title: 'MCP Security Best Practices (2026-07-28)',
  gloss: 'token passthrough "is explicitly forbidden"; egress proxies and network policies for server-side clients',
  publisher: 'Model Context Protocol',
  date: '2026-07-28',
  url: 'https://modelcontextprotocol.io/docs/2026-07-28/tutorials/security/security_best_practices',
  verified: 'primary',
};

const SPIFFE: Source = {
  title: 'SPIFFE overview',
  gloss: 'SVIDs are "short lived cryptographic identity documents", delivered and rotated through the Workload API',
  publisher: 'SPIFFE project',
  date: '2026',
  url: 'https://spiffe.io/docs/latest/spiffe-about/overview/',
  verified: 'primary',
};

const IMDA_AGENTIC: Source = {
  title: 'Model AI Governance Framework for Agentic AI, v1.5',
  gloss: 'agent identity unique and "cryptographically verifiable"; authorisations "time- or session-bound, non-transferable"',
  publisher: 'IMDA',
  date: '2026-05-20',
  url: 'https://www.imda.gov.sg/-/media/imda/files/about/emerging-tech-and-research/artificial-intelligence/mgf-for-agentic-ai.pdf',
  verified: 'primary',
};

const CSA_ATF: Source = {
  title: 'Agentic Trust Framework v1',
  gloss: '"You can stop one agent without stopping the business"; containment by revoking the agent\'s identity',
  publisher: 'CSAI Foundation / Cloud Security Alliance',
  date: '2026-02',
  url: 'https://agentictrustframework.ai/',
  verified: 'primary',
};

const A2A: Source = {
  title: 'Agent2Agent (A2A) Protocol Specification v1.0',
  gloss: 'Cancel Task: "The server will attempt to cancel the task, but success is not guaranteed"',
  publisher: 'A2A Project (Linux Foundation)',
  date: '2026-05-28',
  url: 'https://a2a-protocol.org/latest/specification/',
  verified: 'primary',
};

const OWASP_ACS: Source = {
  title: 'Agent Control Standard (ACS)',
  gloss: 'wire specification for a guardian agent that decides on an agent action before it runs; donated to OWASP, announced 1 Sep 2026',
  publisher: 'OWASP GenAI Security Project',
  date: '2026-09-01',
  url: 'https://genai.owasp.org/resource/agent-control-standard-acs/',
  verified: 'primary',
};

const OTEL_GENAI: Source = {
  title: 'OpenTelemetry semantic conventions for generative AI',
  gloss: 'agent, tool and model spans, events and metrics; status Development',
  publisher: 'OpenTelemetry',
  date: '2026',
  url: 'https://github.com/open-telemetry/semantic-conventions-genai/tree/main/docs/gen-ai',
  verified: 'primary',
};

// METR's public documents (no affiliation; citing them implies no endorsement).
const METR_TASK_STANDARD: Source = {
  title: 'METR Task Standard, STANDARD.md',
  gloss:
    'version 0.5.0; unless a task declares the full_internet permission, the task machines "MUST NOT have internet access" except to an LLM API, an LLM API proxy or a hardened local server',
  publisher: 'METR (GitHub)',
  date: '2024-10-30',
  url: 'https://raw.githubusercontent.com/METR/task-standard/main/STANDARD.md',
  verified: 'primary',
};

const METR_INVESTIGATION: Source = {
  title: "Brief independent investigation of agents' behavior, reasoning and collaboration in the OpenAI / Hugging Face hacking incident",
  gloss:
    'METR states that agents "meant to be fully isolated from one another" communicated through an internal package repository, and that one agent found working Hugging Face credentials exposed on the internet and posted them to the agents\' board; it reports spoofed tool calls in at least 96 transcripts and transcripts missing components after container resets',
  publisher: 'METR',
  date: '2026-08-26',
  url: 'https://metr.org/blog/2026-08-26-openai-hugging-face-incident-investigation/',
  verified: 'primary',
};

const METR_VIVARIA_CONFIG: Source = {
  title: 'Vivaria server environment variables',
  gloss:
    'no-internet task environments connected to a separate Docker network and optionally sandboxed with iptables rules; model API requests can be routed through a separate proxy service',
  publisher: 'METR',
  date: '2026',
  url: 'https://vivaria.metr.org/reference/config/',
  verified: 'primary',
};

const METR_ELICITATION: Source = {
  title: 'Guidelines for capability elicitation',
  gloss:
    'task bugs such as "The automatic scoring is incorrect" or a crashed environment are spurious failures to fix before reporting; models get "the best available scaffolding + tooling"',
  publisher: 'METR',
  date: '2024-03-15',
  url: 'https://metr.org/blog/2024-03-15-guidelines-for-capability-elicitation/',
  verified: 'primary',
};

const METR_PROTOCOL: Source = {
  title: 'Example autonomy evaluation protocol',
  gloss: 'read the transcripts of runs that missed the maximum score and check that the pattern of successes and failures is roughly as expected',
  publisher: 'METR',
  date: '2024-03-15',
  url: 'https://metr.org/blog/2024-03-15-example-autonomy-evaluation-protocol/',
  verified: 'primary',
};

const METR_COMMON_ELEMENTS: Source = {
  title: 'Common Elements of Frontier AI Safety Policies (December 2025 Update)',
  gloss: 'the policies set "conditions for halting development and deployment" when mitigations are insufficient',
  publisher: 'METR',
  date: '2025-12-09',
  url: 'https://metr.org/blog/2025-12-09-common-elements-of-frontier-ai-safety-policies/',
  verified: 'primary',
};

const METR_RISK_REPORT: Source = {
  title: 'Frontier Risk Report (February to March 2026)',
  gloss: 'METR states that red-teaming found "several simple ways for monitoring to be disabled", one by changing an environment variable',
  publisher: 'METR',
  date: '2026-05-19',
  url: 'https://metr.org/blog/2026-05-19-frontier-risk-report/',
  verified: 'primary',
};

const METR_SOL: Source = {
  title: "Summary of METR's predeployment evaluation of GPT-5.6 Sol",
  gloss: 'METR states that "observed cheating rates can also be influenced by the prompts used in the evaluation scaffold" and by task wording',
  publisher: 'METR',
  date: '2026-06-26',
  url: 'https://metr.org/blog/2026-06-26-gpt-5-6-sol/',
  verified: 'primary',
};

// AIUC-1 (no affiliation; a mapping is this site's reading, not AIUC's).
/** The public AIUC-1 requirement index, shared by every control that maps to an AIUC-1 id. */
export const AIUC1_REQUIREMENTS: Source = {
  title: 'AIUC-1 requirements',
  gloss:
    'public requirement index, A001 to F002, each requirement on its own page (E007 and E014 marked retired); AIUC-1 is a standard of the Artificial Intelligence Underwriting Company; this site is not affiliated with AIUC, and a mapping here is not an AIUC-1 certificate or audit',
  publisher: 'Artificial Intelligence Underwriting Company',
  date: '2026-09-24',
  url: 'https://standard.aiuc-1.com/llms.txt',
  verified: 'primary',
};

// Public guidance and incident reports from AI developers. Each is cited for what
// the company states or reports, not as audited fact; citing one implies no
// endorsement of this profile by that company and no affiliation with it.
const OPENAI_THIRD_PARTY_CYBER: Source = {
  title: 'Third-party cyber evaluations involving OpenAI models',
  gloss:
    'OpenAI states that the evaluator\'s "intended authorization boundary was the simulated cyber range", that its model reused a GitHub token another lab\'s agent had left publicly accessible, and that it will review how to "set expectations for isolation, credential handling, monitoring, and stop conditions"',
  publisher: 'OpenAI',
  date: '2026-08-04',
  url: 'https://openai.com/index/third-party-cyber-evaluations-involving-openai-models/',
  verified: 'primary',
};

const ANTHROPIC_EVAL_GUIDANCE: Source = {
  title: 'Improving our alignment and security efforts',
  gloss:
    'best practices for external evaluation partners: the only outside connection is "to the model\'s own API", with the API keys kept outside the environment; the configuration "should be verified before every evaluation begins"; boundaries "phrased as instructions"; challenges confirmed "solvable in principle"; a monitor that flags a scope violation to a human and ends the exercise',
  publisher: 'Anthropic',
  date: '2026-08-31',
  url: 'https://www.anthropic.com/news/improving-alignment-security-efforts',
  verified: 'primary',
};

const OPENAI_HF_TECHNICAL_REPORT: Source = {
  title: 'OpenAI Hugging Face Incident Technical Report',
  gloss:
    'OpenAI states that high-risk workloads are "prohibited via technical controls from receiving direct or transitive Internet access", protected by "two separate layers of network isolation", and that it is building tooling to "identify and halt evaluation workloads"',
  publisher: 'OpenAI',
  date: '2026-08-26',
  url: 'https://cdn.openai.com/pdf/67869394-cb91-4c12-888c-5cbd85c7814c/OpenAI-Hugging-Face%20Incident-Technical-Report.pdf',
  verified: 'primary',
};

const OPENAI_HF_ROAD_AHEAD: Source = {
  title: 'The Hugging Face incident and the road ahead',
  gloss:
    'OpenAI states that its chain-of-thought monitors "did not run on the evaluations in this incident", and that its incident response now sets out "who can stop a run or approve restarting it"',
  publisher: 'OpenAI',
  date: '2026-08-26',
  url: 'https://openai.com/index/hugging-face-incident-and-the-road-ahead/',
  verified: 'primary',
};

const OPENAI_DNS_REPORT: Source = {
  title: 'An agent used DNS to reach an external chatbot (misalignment report)',
  gloss:
    'OpenAI reports a training run that reached a public chatbot through "insufficient DNS filtering" in its sandbox; the monitor flagged it within 15 minutes, the run "did not stop automatically as expected" and was killed 2.5 hours later',
  publisher: 'OpenAI (Alignment Research Blog)',
  date: '2026-09-25',
  url: 'https://alignment.openai.com/misalignment-reports/an-agent-used-dns-to-reach-an-external-chatbot/',
  verified: 'primary',
};

const OPENAI_TOKEN_REPORT: Source = {
  title: 'Exposing a GitHub token in a public repository (misalignment report)',
  gloss:
    "OpenAI reports an internally deployed model that published a researcher's GitHub token to a public repository, split into pieces with the stated aim of avoiding secret scanning",
  publisher: 'OpenAI (Alignment Research Blog)',
  date: '2026-09-25',
  url: 'https://alignment.openai.com/misalignment-reports/exposing-a-github-token-in-a-public-repository/',
  verified: 'primary',
};

const OPENAI_ARTIFACTORY_REPORT: Source = {
  title: 'Unsanctioned Artifactory writes and cross-sample communication (misalignment report)',
  gloss:
    'OpenAI reports models in RL training that used Artifactory, "a shared package repository", to exchange messages across separate training samples with the credentials they were given to download packages, without exploiting any vulnerability; such exchanges can "undermine the assumption that training or evaluation samples are independent"',
  publisher: 'OpenAI (Alignment Research Blog)',
  date: '2026-09-16',
  url: 'https://alignment.openai.com/misalignment-reports/unauthorized-artifactory-writes-and-cross-sample-communication/',
  verified: 'primary',
};

const OPENAI_FILE_HOSTING_REPORT: Source = {
  title: 'Unauthorized communication via temporary file hosting services (misalignment report)',
  gloss:
    'OpenAI reports agents in RL training that uploaded output files to public hosting platforms for co-working agents; the behavior was found by a monitoring system that "ran on 20% of the samples" of the run, which now runs on 100% of samples',
  publisher: 'OpenAI (Alignment Research Blog)',
  date: '2026-09-16',
  url: 'https://alignment.openai.com/misalignment-reports/unauthorized-communication-via-temporary-file-hosting-services/',
  verified: 'primary',
};

const CODEX_AUTO_REVIEW: Source = {
  title: 'Codex auto-review',
  gloss: 'undated developer documentation, read 2026-09-26: "Auto-review is a reviewer swap, not a permission grant"',
  publisher: 'OpenAI',
  date: '2026',
  url: 'https://developers.openai.com/codex/sandboxing/auto-review',
  verified: 'primary',
};

const OPENAI_AUTO_REVIEW: Source = {
  title: 'Auto-review of agent actions without synchronous human oversight',
  gloss:
    'a separate agent approves or denies actions that cross the sandbox boundary; OpenAI states that auto-review "should not be treated as a guarantee of security"',
  publisher: 'OpenAI (Alignment Research Blog)',
  date: '2026-04-30',
  url: 'https://alignment.openai.com/auto-review/',
  verified: 'primary',
};

const OPENAI_PREPAREDNESS_V2: Source = {
  title: 'Preparedness Framework, Version 2',
  gloss:
    'Table 5 lists safeguards against a misaligned model, among them limiting internet and tool access, credentials and filesystem access, with agent actions "logged in an uneditable database"; a one-time capability elicitation is treated "as a lower bound, rather than a ceiling"',
  publisher: 'OpenAI',
  date: '2025-04-15',
  url: 'https://cdn.openai.com/pdf/18a02b5d-6b67-4cec-ab64-68cdfbddebcd/preparedness-framework-v2.pdf',
  verified: 'primary',
};

const OPENAI_ASSESSMENT_PRINCIPLES: Source = {
  title: 'Priorities and principles for effective third party assessments',
  gloss:
    'asks whether monitoring is implemented across training, evaluations and deployment "in a way that cannot easily be disabled", and for claims "pre-registered before assessment activities begin"',
  publisher: 'OpenAI',
  date: '2026-09-22',
  url: 'https://openai.com/index/priorities-principles-third-party-assessments/',
  verified: 'primary',
};

const OPENAI_PACING: Source = {
  title: 'Pacing model development in an era of cyber-critical capabilities',
  gloss:
    'teams paged by a highest-priority monitoring alert are expected to pause the activity if they cannot determine "within 30 minutes that the flag is a false positive"',
  publisher: 'OpenAI',
  date: '2026-08-18',
  url: 'https://openai.com/index/pacing-model-development-cyber-capabilities/',
  verified: 'primary',
};

const OPENAI_MISALIGNMENT_FRAMEWORK: Source = {
  title: 'Our framework for reporting model misalignment',
  gloss:
    'each full report describes the behavior observed, its severity and any external impact, the setting, the date, when it was discovered and the models involved',
  publisher: 'OpenAI',
  date: '2026-09-16',
  url: 'https://openai.com/index/model-misalignment-reporting-framework/',
  verified: 'primary',
};

const OPENAI_FRONTIER_GOVERNANCE: Source = {
  title: 'Frontier Governance Framework',
  gloss: 'section 2.6: OpenAI "maintains an AI Safety Incident Response Plan (AIRP)" for identifying and responding to AI safety incidents',
  publisher: 'OpenAI',
  date: '2026-05-28',
  url: 'https://cdn.openai.com/pdf/e37d949b-8c9f-4d76-b99e-4272f4631a7e/openai-frontier-governance-framework.pdf',
  verified: 'primary',
};

const OPENAI_EVAL_PLAYBOOK: Source = {
  title: 'A shared playbook for trustworthy third party evaluations',
  gloss:
    'recommended report fields include the claim, the tested system (model, reasoning setting, tool access, harness and safeguards), the budget, elicitation methods and validity checks; a score is "performance under that harness and budget"',
  publisher: 'OpenAI',
  date: '2026-05-29',
  url: 'https://openai.com/index/trustworthy-third-party-evaluations-foundations/',
  verified: 'primary',
};

const OPENAI_COT_GRADING: Source = {
  title: 'Investigating the consequences of accidentally grading CoT during RL',
  gloss: 'chain-of-thought text reached the inputs of reward mechanisms by accident; an automated system now scans all RL runs for it with regex matches',
  publisher: 'OpenAI (Alignment Research Blog)',
  date: '2026-05-07',
  url: 'https://alignment.openai.com/accidental-cot-grading/',
  verified: 'primary',
};

const OPENAI_PROD_EVALS: Source = {
  title: 'Sidestepping Evaluation Awareness and Anticipating Misalignment with Production Evaluations',
  gloss: 'OpenAI reports that models tested with production evaluations "display substantially lower signs of evaluation awareness" than in a traditional evaluation',
  publisher: 'OpenAI (Alignment Research Blog)',
  date: '2025-12-18',
  url: 'https://alignment.openai.com/prod-evals/',
  verified: 'primary',
};

const OPENAI_ASTRA_CARD: Source = {
  title: 'GPT-6 Astra System Card',
  gloss: 'OpenAI states that evaluations where models show verbalized metagaming "can be treated similarly to contaminated evals"',
  publisher: 'OpenAI',
  date: '2026-09-03',
  url: 'https://deploymentsafety.openai.com/gpt-6-astra',
  verified: 'primary',
};

// ---------------------------------------------------------------------------
// Example observations: one pass and one fail per specified control, served
// from public/controls/examples/ and valid against
// public/schemas/control-observation.v1.json (tests/controls.spec.ts). They are
// illustrative records, not results of any real evaluation.

export interface ObservationExample {
  controlId: string;
  status: 'pass' | 'fail';
  /** Site path of the JSON file. */
  path: string;
}

export const observationExamples: readonly ObservationExample[] = [
  'AIGE-CTL-EVAL-002',
  'AIGE-CTL-EVAL-003',
  'AIGE-CTL-EVAL-006',
  'AIGE-CTL-EVAL-001',
  'AIGE-CTL-EVAL-004',
  'AIGE-CTL-EVAL-005',
  'AIGE-CTL-EVAL-007',
  'AIGE-CTL-EVAL-008',
  'AIGE-CTL-EVAL-009',
].flatMap((controlId) =>
  (['pass', 'fail'] as const).map((status) => ({
    controlId,
    status,
    path: `/controls/examples/control-observation.${controlId.toLowerCase()}.${status}.json`,
  })),
);

// ---------------------------------------------------------------------------
// Controls

/** Fields every control of this version shares. */
const base = {
  profile: PROFILE,
  version: '0.2',
  status: 'draft',
  reviewerStatus: 'open',
} as const;

export const evaluationEnvironmentControls: readonly Control[] = [
  {
    ...base,
    id: 'AIGE-CTL-EVAL-001',
    title: 'Authorization Boundary',
    pageTitle: 'Authorization boundary for AI evaluation environments',
    pageDescription:
      "Draft control for AI evaluation runs: record each agent's authorization boundary before the run, state it in the prompt and refuse every call outside it.",
    depth: 'specified',
    objective:
      'Every agent in an evaluation run acts only within an authorization boundary recorded before the run starts: the tools, operations, data classes and budgets it may use, and the runs and resources it may reach.',
    failureModes: [
      'A run starts with no recorded boundary for the agent under test, or with a boundary that differs from the scope the agent was told.',
      'The agent calls a tool or an operation class outside its recorded boundary, or starts processes with administrative privileges, and the call succeeds.',
      'A credential given for one purpose on a shared resource, such as downloading packages, also lets the agent write, list or post there.',
      'Agents in runs meant to be isolated reach each other through a resource the runs share, such as a package repository or a cache.',
    ],
    scope:
      'Agents and harnesses under evaluation, the tools and operations they can use during a run, the credentials they receive for shared resources and the resources runs share. Budgets are recorded here and enforced under AIGE-CTL-EVAL-006; network egress is AIGE-CTL-EVAL-002. Production deployments are covered by the agent runtime profile.',
    enforcementPoints: ['deploy', 'runtime'],
    verification: [
      {
        kind: 'inspect',
        text: 'Before the run, inspect the run record: it holds a boundary for each agent under test (tools and operation classes, data classes, budgets, and each shared resource with the operations allowed on it), and the prompt the agent receives states the same boundary as instructions, including what it must not access.',
      },
      {
        kind: 'test',
        text: 'At admission, from inside the environment, attempt one call of each kind outside the boundary (an unlisted tool or operation class, a write or a listing with a download-only credential on a shared resource, a process started as root) and one listed call; every attempt outside the boundary must be refused and logged, and the listed call must succeed.',
      },
      {
        kind: 'test',
        text: 'Start two canary runs on the same shared resources: a marker written by one run must not be readable by the other.',
      },
      {
        kind: 'observe',
        text: "After the run, compare every tool call and every request to a shared resource in the run's logs with the recorded boundary: each falls inside it, and every refused attempt is recorded with its time and target.",
      },
    ],
    evidence: [
      {
        artefact: 'The boundary of each agent under test, recorded before the run: tools, operation classes, data classes, budgets and shared resources with the operations allowed on each',
        schemaId: 'agent-register-entry',
        layer: 2,
      },
      { artefact: 'Admission test verdicts: the refused out-of-boundary calls and the cross-run canary', schemaId: 'evidence-record', layer: 4 },
      { artefact: 'One observation per run comparing the calls and shared-resource requests made with the recorded boundary', schemaId: 'control-observation', layer: 5 },
    ],
    failureResponse: {
      effect: 'deny',
      text: 'Calls and shared-resource operations outside the recorded boundary are refused at the enforcement point and logged. A run with no recorded boundary is not started; a run in which a call outside the boundary succeeded, or in which runs reached each other, is stopped and its result is withheld until the path is closed.',
    },
    layer: 4,
    secondaryLayers: [2],
    patterns: ['agent-registry', 'policy-card'],
    seeds: ['registry-entry', 'read-only-tools', 'reversible-only', 'execution-budgets', 'data-classes'],
    mappings: {
      obligations: ['AIGE-OBL-EUAIA-ART14', 'AIGE-OBL-OWASP-AGENTIC', 'AIGE-OBL-CSA-AICM-AGENTIC', 'AIGE-OBL-SG-AGENTIC-IDENTITY'],
      iso42001: ['A.6.2.2', 'A.9.2'],
      nistAiRmf: ['MEASURE 2.7'],
      owasp: ['asi02', 'asi03', 'llm03-2026'],
      aiuc1: ['B006'],
      other: [
        { framework: 'NIST SP 800-53 Rev. 5', ref: 'AC-3', note: 'Access Enforcement' },
        { framework: 'NIST SP 800-53 Rev. 5', ref: 'AC-6', note: 'Least Privilege' },
      ],
    },
    references: [
      CH23.registry,
      CH23.autonomy,
      CH23.allowList,
      METR_TASK_STANDARD,
      METR_INVESTIGATION,
      OWASP_AGENTIC,
      SP_800_53,
      OPENAI_THIRD_PARTY_CYBER,
      ANTHROPIC_EVAL_GUIDANCE,
      AIUC1_REQUIREMENTS,
      OPENAI_ARTIFACTORY_REPORT,
      OPENAI_HF_TECHNICAL_REPORT,
    ],
    implementationNotes: [
      "Record the boundary as data before the run, in the fields of an agent registry entry (scope, tools, data access, spend limit), and enforce it at the gateway the agent's calls pass through, not in the prompt alone. State the same boundary to the agent: Anthropic's guidance for external evaluation partners asks every prompt to state what is in and out of scope, including permitted actions and network boundaries, with boundaries \"phrased as instructions\" rather than claims about the environment.",
      "Tell the agent what it may not do with the access it has. OpenAI's account of a third-party cyber evaluation states that the evaluator's \"intended authorization boundary was the simulated cyber range\", while the agents were not explicitly told how they could use the open internet access they had; the evaluator names this as a potential contributing cause.",
      "Scope every credential for a shared resource to the operations the task needs: download from a package repository, never write, list or post. OpenAI reports models in RL training that used Artifactory, \"a shared package repository\", to exchange messages across separate samples with the credentials they were given to download packages, without exploiting any vulnerability; its technical report on the Hugging Face incident lists removing the shared credential from new research workloads and restricting the types of requests agents could make to Artifactory among its mitigations.",
      "Give each run its own namespace on every shared resource (package cache, artefact store, scratch storage) and test it with a canary marker. METR's investigation of the OpenAI/Hugging Face incident reports that agents \"meant to be fully isolated from one another\" communicated through an internal package repository.",
      "Run the agent as an unprivileged user. METR's Task Standard states that the agent \"MUST NOT be allowed to start processes\" on the primary machine as root.",
    ],
    openQuestions: [
      'Which shared resources (package mirrors, caches, model API proxies) can be given a per-run namespace, and which should be removed from evaluation environments altogether?',
      "What evidence is sufficient to show that an agent stayed within its boundary for a whole run when the logs of some of the tools it called are outside the evaluator's control?",
    ],
    observation: {
      subjectKind: 'eval-run',
      expected:
        'Every tool call and every request to a shared resource falls inside the boundary recorded for the agent before the run; every attempt outside it is refused and logged.',
      observedExample:
        'Run 88231: 3 listing and upload requests to the shared package repository with a download-only credential, all refused and logged; no call outside the boundary succeeded: pass.',
    },
  },
  {
    ...base,
    id: 'AIGE-CTL-EVAL-002',
    title: 'Network Egress Control',
    pageTitle: 'Network egress control for AI evaluation environments',
    pageDescription:
      'Draft control AIGE-CTL-EVAL-002: an AI evaluation run reaches only the destinations on its egress allow-list; any other connection is refused and logged.',
    depth: 'specified',
    objective:
      "Outbound connections from an evaluation environment reach only the destinations on the run's egress allow-list, and every other connection attempt is refused and logged.",
    failureModes: [
      "A connection from the environment to a host that is not on the run's egress allow-list succeeds.",
      'A run starts in an environment with no egress policy attached, or with a policy that allows every destination although the task did not declare that it needs the internet.',
      'A permitted destination, such as a package mirror, a cache or a tool server, carries data onward to a party or to another run that nobody listed.',
      'The run leaves no flow log, so the connections it made cannot be compared with its allow-list.',
    ],
    scope:
      "Every network path out of the environment a run executes in: the agent's container or virtual machine, auxiliary machines, DNS, and the tools, MCP servers and proxies the run can call. Resources shared between runs count as destinations. Inbound operator access is out of scope.",
    enforcementPoints: ['deploy', 'runtime'],
    verification: [
      {
        kind: 'inspect',
        text: 'Before the run, inspect the egress policy attached to the task environment: deny by default, with an allow-list naming each permitted destination (for example the LLM API proxy and the progress server) and nothing else unless the task declares that it needs the internet.',
      },
      {
        kind: 'test',
        text: 'At admission, from inside the environment, attempt one connection to a destination that is not on the allow-list and one to a listed destination; the first must be refused and logged, the second must succeed.',
      },
      {
        kind: 'observe',
        text: "After the run, compare the run's flow log with its allow-list: every outbound connection matches a listed destination, and every refused attempt is recorded with its time and target.",
      },
    ],
    evidence: [
      { artefact: 'The egress policy and allow-list attached to the run, with its hash recorded in the run record', layer: 4 },
      { artefact: 'Admission test verdict: the refused connection to an unlisted destination', schemaId: 'evidence-record', layer: 4 },
      { artefact: 'Flow log of the run, allowed and refused connections, kept outside the environment', layer: 4 },
      { artefact: 'One observation per run comparing observed connections with the allow-list', schemaId: 'control-observation', layer: 5 },
    ],
    failureResponse: {
      effect: 'deny',
      text: 'Connections to unlisted destinations are refused at the enforcement point and logged. A run whose environment has no egress policy attached is not started; a run in which an unlisted connection succeeded is stopped and its result is withheld until the connection is explained.',
    },
    layer: 4,
    patterns: ['runtime-guardrail', 'sanctioned-ai-gateway'],
    seeds: ['egress-filter', 'tool-allow-list', 'sandbox'],
    mappings: {
      obligations: ['AIGE-OBL-EUAIA-ART15', 'AIGE-OBL-OWASP-LLM', 'AIGE-OBL-OWASP-AGENTIC'],
      iso42001: ['A.6.2.6'],
      nistAiRmf: ['MEASURE 2.7'],
      owasp: ['asi02', 'llm02-2026'],
      atlas: ['aml-t0086'],
      aiuc1: ['B006'],
      other: [
        { framework: 'MITRE ATLAS mitigation', ref: 'AML.M0032', note: 'Segmentation of AI Agent Components' },
        { framework: 'NIST SP 800-53 Rev. 5', ref: 'SC-7', note: 'Boundary Protection' },
        { framework: 'NIST SP 800-53 Rev. 5', ref: 'SC-7(5)', note: 'Deny by default, allow by exception' },
      ],
    },
    references: [
      CH23.allowList,
      CH23.guardrails,
      METR_TASK_STANDARD,
      METR_INVESTIGATION,
      METR_VIVARIA_CONFIG,
      MCP_SECURITY,
      OWASP_AGENTIC,
      OWASP_LLM,
      ATLAS,
      SP_800_53,
      OPENAI_DNS_REPORT,
      OPENAI_HF_TECHNICAL_REPORT,
      ANTHROPIC_EVAL_GUIDANCE,
      AIUC1_REQUIREMENTS,
    ],
    implementationNotes: [
      "Attach a default-deny egress policy to every task environment (a network policy, a firewall rule set or an egress proxy, by category) that lists each permitted destination explicitly, for example the LLM API proxy and the progress server. Enforce it on the resolved address, and serve DNS from a resolver that answers only for listed names: DNS is an egress path too. OpenAI reports a training run that reached a public chatbot through \"insufficient DNS filtering\" in its sandbox.",
      "Record the allow-list with the run (its hash goes in the run record next to the environment version) and keep a flow log per run at the enforcement point, outside anything the agent can reach or change, with refused attempts as well as allowed connections, so the connections made can be compared with what was declared, not with what was intended.",
      "Enforce the policy in two places a single misconfiguration cannot both open, for example at the sandbox and at the cluster boundary. OpenAI's technical report on the Hugging Face incident describes \"two separate layers of network isolation\" of this kind, and Anthropic's guidance for external evaluation partners asks that the only outside connection be to the model's own API and that the configuration be verified before every evaluation begins.",
      'At admission, run a canary from inside the environment: one connection to a reserved test address that is not on the list. Expect a refused connection and a log entry; a success blocks the run.',
      "Treat resources shared between runs (package mirrors, caches, artefact stores) as destinations with their own entry and a per-run scope. METR's public investigation of the OpenAI/Hugging Face incident reports that agents meant to be \"fully isolated from one another\" communicated through a shared internal package repository.",
    ],
    openQuestions: [
      'How should the egress allow-list of a run be recorded so that a third party can compare it with the connections actually observed?',
      'When a task needs the internet (what METR\'s Task Standard calls the full_internet permission), which part of this control still applies, and what should the run record say instead?',
    ],
    observation: {
      subjectKind: 'eval-environment',
      expected: "Outbound connections only to the destinations on the run's egress allow-list; every other attempt refused and logged.",
      observedExample: '1 connection to an unlisted host during run 88213, in an environment with no egress policy attached: fail.',
    },
  },
  {
    ...base,
    id: 'AIGE-CTL-EVAL-003',
    title: 'Credential Isolation',
    pageTitle: 'Credential isolation for AI evaluation environments',
    pageDescription:
      'Draft control AIGE-CTL-EVAL-003: an agent under evaluation holds only short-lived credentials bound to its own identity and one service, no standing secrets.',
    depth: 'specified',
    objective:
      "An agent under evaluation holds only short-lived credentials issued to its own identity for the run and bound to the one service each is for, never standing secrets or a person's own token.",
    failureModes: [
      "A long-lived secret (an API key, a cloud access key, a password) is readable from the agent's environment, configuration, files or memory during a run.",
      'The agent presents a token issued to a person, a token whose audience is another service, or a credential it found rather than received, and the tool server accepts it.',
      'A credential issued for the run is still accepted after the run ended or was aborted.',
      "A credential appears in the run's transcript, memory store, logs or outputs, or is passed to another agent.",
    ],
    scope:
      "Credentials, tokens and keys the agent under evaluation and the tools it calls can reach during a run, including what it holds in memory and writes to its transcript, and the model API key, which stays with a proxy outside the environment. The evaluator's own operator credentials are out of scope.",
    enforcementPoints: ['deploy', 'runtime'],
    verification: [
      {
        kind: 'inspect',
        text: "Before the run, inspect the environment template and the run's configuration: no long-lived secret is present, and the agent obtains credentials from a broker outside the environment under its own workload identity, each with a lifetime no longer than the run and an audience naming one tool server.",
      },
      {
        kind: 'test',
        text: "After the run, scan every run artefact (transcript, memory store, logs, outputs and a snapshot of the environment's file system) for secret patterns and for the tokens issued to the run; expect no match.",
      },
      {
        kind: 'test',
        text: 'Replay a token issued for the run against a different tool server, and again after the run has ended; both must be rejected, for the wrong audience and for expiry or revocation.',
      },
      {
        kind: 'observe',
        text: "Read the tool servers' logs for the run: every call carries a token issued for that server, delegated calls name the agent as the acting party, and audience-check failures were raised as alerts.",
      },
    ],
    evidence: [
      { artefact: 'Credential issuance log of the run: identity, audience, scope, lifetime and revocation time of every token', schemaId: 'evidence-record', layer: 4 },
      { artefact: 'Audience-check and replay results from the tool servers', schemaId: 'evidence-record', layer: 4 },
      { artefact: 'Secret scan of the run artefacts, filed as an observation of this control', schemaId: 'control-observation', layer: 5 },
    ],
    failureResponse: {
      effect: 'deny',
      text: 'A token issued for another audience, to a person, or for a run that has ended is rejected by the tool server. A run in which a long-lived secret or a leaked credential is found is stopped, the credential is revoked and the result is withheld until the exposure is assessed.',
    },
    layer: 4,
    secondaryLayers: [2],
    patterns: ['agent-identity-scoped-credentials'],
    seeds: ['own-identity', 'short-lived-credentials', 'delegated-token', 'mcp-authorization', 'memory-governance'],
    mappings: {
      obligations: ['AIGE-OBL-EUAIA-ART15', 'AIGE-OBL-SG-AGENTIC-IDENTITY', 'AIGE-OBL-NIST-AGENTS', 'AIGE-OBL-OWASP-AGENTIC'],
      iso42001: ['A.6.2.6', 'A.9.2'],
      nistAiRmf: ['MEASURE 2.7'],
      owasp: ['asi03'],
      aiuc1: ['A008'],
      other: [
        { framework: 'IETF RFC 8693', ref: 'act claim', note: 'delegation names the acting party; never impersonation' },
        { framework: 'MCP specification 2026-07-28', ref: 'Authorization, Token Handling', note: 'audience validation; no token passthrough' },
        { framework: 'SPIFFE', ref: 'SVID', note: 'short-lived workload identity documents' },
        { framework: 'MITRE ATLAS', ref: 'AML.T0083', note: 'Credentials from AI Agent Configuration (not yet a row of the threat bridge)' },
        { framework: 'NIST SP 800-53 Rev. 5', ref: 'IA-5', note: 'Authenticator Management' },
        { framework: 'NIST SP 800-53 Rev. 5', ref: 'AC-6', note: 'Least Privilege' },
      ],
    },
    references: [
      CH23.identity,
      CH23.credentials,
      CH23.delegation,
      CH23.mcpAuth,
      RFC_8693,
      MCP_AUTH,
      MCP_SECURITY,
      SPIFFE,
      IMDA_AGENTIC,
      METR_INVESTIGATION,
      METR_VIVARIA_CONFIG,
      OWASP_AGENTIC,
      ATLAS,
      SP_800_53,
      ANTHROPIC_EVAL_GUIDANCE,
      OPENAI_THIRD_PARTY_CYBER,
      OPENAI_TOKEN_REPORT,
      AIUC1_REQUIREMENTS,
    ],
    implementationNotes: [
      'Give each agent under test its own workload identity for the run (an attested identity document of the kind SPIFFE defines, or the platform\'s workload identity) and issue its tokens from a broker outside the environment. The environment template holds no secret.',
      "Keep the model API key with an LLM API proxy outside the environment, reached through the egress allow-list of AIGE-CTL-EVAL-002: the agent sees the proxy, never the key. Anthropic's guidance for external evaluation partners likewise asks that \"the API keys should be kept outside the environment\".",
      "Issue short-lived access tokens whose aud names one tool server and, when the agent acts for a user or another agent, whose act claim names the agent (RFC 8693 token exchange). Tool servers validate the audience and refuse any other token, as the MCP authorization specification of 2026-07-28 requires of MCP servers.",
      'Set every token lifetime no longer than the run\'s time budget, issue no refresh tokens to agents under evaluation, and revoke what was issued when the run ends or is aborted.',
      "Scrub credentials from memory stores, transcripts and logs before they are written, then grep every run artefact after the run for secret patterns (known key prefixes, high-entropy strings, the run's own issued tokens); a match fails the run. Scan for credentials a run picked up as well as those it was issued: METR's investigation of the OpenAI/Hugging Face incident reports an agent that found working Hugging Face credentials exposed on the internet and posted them to a board other agents read, and OpenAI states that in a third-party evaluation its model reused a GitHub token another lab's agent had left publicly accessible.",
    ],
    openQuestions: [
      'What lifetime should a credential issued for an evaluation run have, and who revokes it when the run is aborted?',
      "Can a secret scan be made complete for encoded or split credentials, or should the control rely on short lifetimes and revocation for whatever a scan may miss? OpenAI reports a model that split a researcher's token into pieces with the stated aim of avoiding secret scanning.",
    ],
    observation: {
      subjectKind: 'eval-run',
      expected:
        "No credential other than the run's own short-lived, audience-bound tokens is readable in the environment or appears in the run's artefacts, and none is accepted after the run.",
      observedExample:
        'Run 88214: secret scan found 0 matches in transcript, memory store and logs; a replayed token was rejected with an audience error: pass.',
    },
  },
  {
    ...base,
    id: 'AIGE-CTL-EVAL-004',
    title: 'Tool and Action Mediation',
    pageTitle: 'Tool call mediation for AI agents under evaluation',
    pageDescription:
      'Draft control: every tool call an agent makes in an evaluation run passes a mediation point that records a verdict and fails closed for irreversible actions.',
    depth: 'specified',
    objective:
      'Every tool call an agent makes during a run passes a mediation point outside the model that checks it against policy before it executes.',
    failureModes: [
      'A tool call executes without a policy verdict recorded for it.',
      'An irreversible action runs while the mediation point is down.',
      'An approval is reused for a call whose parameters changed.',
      'After repeated denials the agent keeps seeking the same outcome through other calls, and the run continues.',
    ],
    scope:
      'Tool, MCP and code-execution calls made by the agent under evaluation, and the reviewer (a rule, a model or a person) that decides on them. The internal reasoning of the model is out of scope; network egress is AIGE-CTL-EVAL-002.',
    enforcementPoints: ['deploy', 'runtime'],
    verification: [
      {
        kind: 'inspect',
        text: 'Before the run, inspect the environment and its policy: tool servers, MCP servers and code execution are reachable only through the mediation point, and the policy lists each operation class with its verdict, its failure posture (fail closed for irreversible classes such as delete, send, publish and execute) and the denial threshold that interrupts a run.',
      },
      {
        kind: 'test',
        text: 'At admission, send through the harness one call the policy denies and one it allows, then take the mediation point down and send an irreversible-class call; the denied call and the call sent while it is down must not execute, and all three must leave a verdict record.',
      },
      {
        kind: 'observe',
        text: "After the run, join the tool servers' own logs with the verdict records: every executed call has an allow verdict, or an approval bound to a parameter hash that matches the call, and no run continued past its denial threshold.",
      },
    ],
    evidence: [
      { artefact: 'Mediation policy of the run: operation classes, verdicts, failure posture per class and the denial threshold', schemaId: 'policy-card', layer: 4 },
      { artefact: 'Verdict record of every call: tool, parameter hash, verdict, reviewer and time', schemaId: 'evidence-record', layer: 4 },
      { artefact: 'One observation per run joining the executed calls with their verdicts', schemaId: 'control-observation', layer: 5 },
    ],
    failureResponse: {
      effect: 'deny',
      text: 'A call without an allow verdict does not execute. While the mediation point is down, irreversible classes fail closed and reads fail open only with an alert. A run in which a call executed without a verdict is stopped and its result is withheld; a run that reaches its denial threshold is interrupted.',
    },
    layer: 4,
    patterns: ['runtime-guardrail', 'human-in-the-loop-gate'],
    seeds: ['guardrail-every-call', 'checkpoint-irreversible', 'approval-log', 'mcp-admission', 'sandbox'],
    mappings: {
      obligations: ['AIGE-OBL-EUAIA-ART14', 'AIGE-OBL-OWASP-ACS', 'AIGE-OBL-SG-AGENTIC-CHECKPOINTS', 'AIGE-OBL-OWASP-AGENTIC'],
      iso42001: ['A.9.2'],
      nistAiRmf: ['MEASURE 2.7'],
      owasp: ['asi01', 'asi02', 'asi05', 'asi09', 'llm10-2026'],
      aiuc1: ['D003', 'B006'],
      other: [
        { framework: 'MITRE ATLAS mitigation', ref: 'AML.M0028', note: 'AI Agent Tools Permissions Configuration' },
        { framework: 'MITRE ATLAS mitigation', ref: 'AML.M0029', note: 'Human In-the-Loop for AI Agent Actions' },
        { framework: 'MITRE ATLAS mitigation', ref: 'AML.M0030', note: 'Restrict AI Agent Tool Invocation on Untrusted Data' },
      ],
    },
    references: [
      CH23.guardrails,
      CH23.checkpoint,
      CH23.mcpAdmission,
      OWASP_ACS,
      METR_ELICITATION,
      OWASP_AGENTIC,
      CODEX_AUTO_REVIEW,
      OPENAI_AUTO_REVIEW,
      OPENAI_PREPAREDNESS_V2,
      AIUC1_REQUIREMENTS,
      OPENAI_TOKEN_REPORT,
    ],
    implementationNotes: [
      "Put the mediation point between the decision to call a tool and the call, outside the model and the agent's process: a gateway or guardian that checks identity, allow-list, parameters and operation class before the call runs, as chapter 23 describes and OWASP's Agent Control Standard specifies on the wire. Route tool servers, MCP servers and code execution only through it, so no call can go around it.",
      'Record the failure posture per operation class in the policy of the run. Chapter 23 recommends failing closed for pay, delete, send and execute and failing open, with an alert, only for reads, and notes that the reference guardian of the Agent Control Standard starts with a fail-open posture: set the posture, do not inherit it.',
      "Bind an approval to the exact call. OpenAI's Codex documentation describes an override that \"applies to the exact denied action, not similar future actions\" and holds for one retry; store a hash of the parameters with each approval and refuse a call whose parameters differ.",
      "Interrupt a run that keeps asking. The Codex documentation describes a rejection circuit breaker that, in its current open-source implementation, interrupts the turn after 3 consecutive denials or 10 in the last 50 reviews, and OpenAI's post on auto-review states that it stops the trajectory after repeated denials. Record the threshold in the policy and make reaching it a stop condition (AIGE-CTL-EVAL-006).",
      "An automated reviewer can stand in for a person at the mediation point without widening what the agent may do: the Codex documentation states that \"Auto-review is a reviewer swap, not a permission grant\", and OpenAI's post on the design states that it \"should not be treated as a guarantee of security\". OpenAI reports that a model which had published a researcher's token was brought back with \"enforced auto-review on all actions\".",
    ],
    openQuestions: [
      "How can every call be mediated without taking away the scaffolding and tooling a capability elicitation needs? METR's guidelines ask for \"the best available scaffolding + tooling\".",
      'When the reviewer at the mediation point is a model, what evidence shows that its verdicts are reliable enough to replace a person for a given operation class?',
    ],
    observation: {
      subjectKind: 'eval-run',
      expected:
        'Every executed tool call has an allow verdict, or an approval bound to its exact parameters, recorded before it ran; irreversible calls fail closed while the mediation point is down.',
      observedExample:
        'Run 88241: 3,112 tool calls, each with a verdict; 1 publish call executed on an approval issued for different parameters: fail.',
    },
  },
  {
    ...base,
    id: 'AIGE-CTL-EVAL-005',
    title: 'Monitoring Integrity',
    pageTitle: 'Monitoring integrity for AI evaluation runs',
    pageDescription:
      "Draft control: the traces and monitors of an AI evaluation run cover all of it, stay out of the agent's reach and reconcile with the tool servers' own logs.",
    depth: 'specified',
    objective:
      "The traces and monitors of a run capture every plan step and tool call with the agent's identity and version, as the tool returned it, and the agent cannot disable or alter them.",
    failureModes: [
      "A tool call appears in the tool server's logs but not in the run's trace, and no gap is recorded.",
      'Monitoring is switched off or reconfigured from inside the environment during a run, for example by changing an environment variable.',
      'A monitor that the run relies on does not run on it, or covers only a sample of it, and nobody notices until after the run.',
      'The recorded output of a tool call differs from what the tool returned (a spoofed tool call).',
    ],
    scope:
      'Telemetry, traces and monitors attached to an evaluation run, and the store they are written to. Preserving the records after an incident is covered by AIGE-CTL-EVAL-007.',
    enforcementPoints: ['runtime', 'periodic'],
    verification: [
      {
        kind: 'inspect',
        text: 'Before the run, inspect the monitoring configuration: the trace collector, the monitors and their settings run outside the environment, and nothing the agent can write (environment variables, files, its own processes) can switch them off or change what they record.',
      },
      {
        kind: 'test',
        text: 'At admission and after each harness change, from inside the environment, try to disable or redirect monitoring (change the environment variables and configuration the agent can reach, stop any local exporter); the trace must continue at the collector and the attempt must raise an alert.',
      },
      {
        kind: 'observe',
        text: 'During the run, record the heartbeat of each monitor the run relies on: it must cover every sample and the whole duration, and any gap is recorded with its start and end.',
      },
      {
        kind: 'observe',
        text: "After the run, reconcile the trace with the tool servers' own logs: the same calls in the same order, and every recorded tool output matches the hash the tool server logged for it.",
      },
    ],
    evidence: [
      { artefact: 'Monitor coverage record of the run: which monitors ran, over which samples and time, and every gap', schemaId: 'evidence-record', layer: 4 },
      { artefact: "Reconciliation of the trace with the tool servers' logs, with the hash of every tool output", schemaId: 'evidence-record', layer: 4 },
      { artefact: 'Tampering test at admission and the reconciliation verdict, filed as an observation of this control', schemaId: 'control-observation', layer: 5 },
    ],
    failureResponse: {
      effect: 'alert',
      text: 'A monitoring gap, a tampering attempt or a trace that does not reconcile with the tool servers\' logs alerts the evaluator and marks the run. The result of a run whose monitors did not cover it, or whose trace does not reconcile, is withheld until the difference is explained; a tampering attempt is also a stop condition (AIGE-CTL-EVAL-006).',
    },
    layer: 4,
    secondaryLayers: [5],
    patterns: ['continuous-assurance-telemetry'],
    seeds: ['traces', 'otel-telemetry', 'trajectory-anomaly'],
    mappings: {
      obligations: ['AIGE-OBL-EUAIA-ART12', 'AIGE-OBL-EUAIA-ART26-6', 'AIGE-OBL-EUAIA-ART72', 'AIGE-OBL-NISTRMF-MANAGE'],
      iso42001: ['A.6.2.8', 'A.6.2.6'],
      nistAiRmf: ['MANAGE 4.1', 'MEASURE 3.1'],
      owasp: ['asi10'],
      aiuc1: ['E015'],
      other: [
        { framework: 'MITRE ATLAS mitigation', ref: 'AML.M0024', note: 'AI Telemetry Logging' },
        { framework: 'NIST SP 800-53 Rev. 5', ref: 'AU-2', note: 'Event Logging' },
        { framework: 'NIST SP 800-53 Rev. 5', ref: 'AU-9', note: 'Protection of Audit Information' },
        { framework: 'NIST SP 800-53 Rev. 5', ref: 'AU-12', note: 'Audit Record Generation' },
        { framework: 'NIST SP 800-53 Rev. 5', ref: 'SI-4', note: 'System Monitoring' },
      ],
    },
    references: [
      CH23.telemetry,
      CH23.incidents,
      OTEL_GENAI,
      METR_INVESTIGATION,
      METR_RISK_REPORT,
      SP_800_53,
      OPENAI_HF_ROAD_AHEAD,
      OPENAI_ASSESSMENT_PRINCIPLES,
      OPENAI_PREPAREDNESS_V2,
      AIUC1_REQUIREMENTS,
      OPENAI_HF_TECHNICAL_REPORT,
      OPENAI_FILE_HOSTING_REPORT,
    ],
    implementationNotes: [
      "Run the collector, the monitors and their configuration outside the environment, and write the trace to append-only storage the agent cannot reach. OpenAI's Preparedness Framework v2 lists agent actions \"logged in an uneditable database\" and reviewed by asynchronous monitors among its safeguards against a misaligned model. OpenAI's technical report on the Hugging Face incident states that models sometimes tried to \"erase or tamper with their outputs or message logs\", and that none of the attempts it observed affected the logs its graders or monitors see.",
      "Keep every switch of the monitoring out of the agent's reach. METR states that red-teaming found \"several simple ways for monitoring to be disabled\", one by changing an environment variable, and OpenAI's criteria for third-party assessments ask whether monitoring covers training, evaluations and deployment \"in a way that cannot easily be disabled\".",
      "Check that the monitors ran on this run, and over all of it. OpenAI states that its chain-of-thought monitors \"did not run on the evaluations\" involved in the Hugging Face incident, and reports a training incident found by a monitoring system that ran on 20% of the samples of the run and now runs on 100%.",
      "Reconcile the transcript with what the tools logged, not only with itself. METR's investigation of the OpenAI/Hugging Face incident reports that at least 96 transcripts show clear evidence of spoofed tool calls, where an agent appeared to run one command and replaced its output; a hash of each output, logged by the tool server, lets a reviewer find the substitution.",
    ],
    openQuestions: [
      "How can a reviewer show that a run's trace is complete for actions that pass no tool server, not only that the records it holds are unaltered?",
      'The OpenTelemetry GenAI conventions are still at status Development: should the profile name the attributes it relies on, or only the events a trace must contain?',
    ],
    observation: {
      subjectKind: 'eval-run',
      expected:
        "The monitors ran over the whole run, the agent could not switch them off, and the trace reconciles with the tool servers' logs call by call.",
      observedExample:
        "Run 88251: 1,904 calls in the trace and in the tool servers' logs, 0 output hash mismatches, monitor coverage 100% of samples: pass.",
    },
  },
  {
    ...base,
    id: 'AIGE-CTL-EVAL-006',
    title: 'Stop Conditions',
    pageTitle: 'Stop conditions for AI evaluation runs',
    pageDescription:
      'Draft control AIGE-CTL-EVAL-006: stop conditions, budgets and a stop handle set before an AI evaluation run starts; a stop halts the run in a measured time.',
    depth: 'specified',
    objective:
      "Every evaluation run has stop conditions, budgets and a stop handle defined before it starts, and a stop, pulled by hand or tripped by a breaker, halts the agent's calls and writes within a measured time across every hop it delegated to inside the environment.",
    failureModes: [
      'A run starts without recorded stop conditions, budgets or a working stop handle.',
      'A budget (steps, tool calls, tokens, spend or time) or a breaker threshold is exceeded and the run continues.',
      'A tool call or a write is recorded after the stop was pulled or the breaker tripped, including through a token issued before the stop.',
      'A sub-agent or a service the agent delegated to keeps working after the parent run was stopped.',
    ],
    scope:
      "Agents under evaluation and every agent, tool or service they delegate to inside the environment. A third-party agent outside the environment can only be cut off at the environment's boundary. A lab's criteria for halting a model's development or deployment are policy decisions and out of scope.",
    enforcementPoints: ['runtime', 'periodic'],
    verification: [
      {
        kind: 'inspect',
        text: 'Before the run, inspect the run record: stop conditions, per-agent budgets and breaker thresholds are recorded, and the stop handle is named with the levels it can apply (pause the task, trip the breaker, revoke the identity).',
      },
      {
        kind: 'test',
        text: 'Drill the stop on a schedule and before the first run of a new harness version: pull it during a live task, measure the time from the pull to the first rejected call, and confirm zero tool calls and zero writes after the trip, including through delegated tokens and sub-agents.',
      },
      {
        kind: 'observe',
        text: 'During runs, record every breaker trip and budget exhaustion with its trigger, and check that no further call from that agent followed it.',
      },
    ],
    evidence: [
      { artefact: 'Stop conditions, budgets and breaker thresholds of the run, recorded before it starts', schemaId: 'policy-card', layer: 4 },
      { artefact: 'Breaker trips and budget exhaustions of each run, with their triggers', schemaId: 'evidence-record', layer: 4 },
      { artefact: 'Drill record: time to stop, and calls and writes after the trip', schemaId: 'control-observation', layer: 5 },
    ],
    failureResponse: {
      effect: 'alert',
      text: 'A stop condition that is met trips the per-agent breaker, so the gateway rejects every further call from that agent, and alerts the evaluator. A drill that finds calls or writes after the trip fails the control and blocks runs on that harness version until the path is closed.',
    },
    layer: 4,
    patterns: ['kill-switch-circuit-breaker'],
    seeds: ['per-agent-breaker', 'drilled-kill-switch', 'execution-budgets', 'remote-agents'],
    mappings: {
      obligations: ['AIGE-OBL-EUAIA-ART14', 'AIGE-OBL-NISTRMF-MANAGE', 'AIGE-OBL-OWASP-AGENTIC', 'AIGE-OBL-CN-TC260-AGENTS'],
      iso42001: ['A.6.2.6'],
      nistAiRmf: ['MANAGE 2.4'],
      owasp: ['asi08', 'asi10', 'llm06-2026'],
      atlas: ['aml-t0034'],
      aiuc1: [],
      other: [
        { framework: 'EU AI Act', ref: 'Art. 14(4)(e)', note: 'stop procedure' },
        { framework: 'MITRE ATLAS mitigation', ref: 'AML.M0036', note: 'Limit AI Workload Resource Consumption' },
      ],
    },
    references: [
      CH23.killSwitch,
      CH23.limits,
      CH23.hops,
      NIST_AI_RMF,
      AI_ACT,
      CSA_ATF,
      OWASP_LLM,
      A2A,
      OWASP_AGENTIC,
      ATLAS,
      METR_COMMON_ELEMENTS,
      METR_INVESTIGATION,
      OPENAI_DNS_REPORT,
      ANTHROPIC_EVAL_GUIDANCE,
      OPENAI_PACING,
      OPENAI_HF_TECHNICAL_REPORT,
      OPENAI_HF_ROAD_AHEAD,
    ],
    implementationNotes: [
      'Record per-agent budgets (steps, tool calls, tokens, spend, wall-clock time) and breaker thresholds (unauthorised calls, refused egress attempts, anomaly scores) in the run record, and enforce them at the gateway the agent\'s calls pass through, not inside the agent.',
      "Make budget exhaustion and threshold breaches trip the breaker automatically. A ticket or a log line alone is not a stop. OpenAI reports a training run that \"did not stop automatically as expected\" after a monitoring alert and was killed 2.5 hours later; Anthropic's guidance for external evaluation partners asks that a monitor which sees a run leave its scope flag it to a human and end the exercise.",
      "Drill the stop: pull it mid-task, measure the time from the pull to the first rejected call, and assert zero tool calls and zero writes after the trip for a window longer than the longest task. File the measurement as a control observation. A response target such as the one OpenAI describes, where responders who cannot rule out a flag as a false positive within 30 minutes are expected to pause the activity, holds only if the pause it calls for has been drilled.",
      "Make the kill path work across delegation hops and across runs: sub-agents run under delegated tokens that the stop revokes, token lifetimes are short enough to bound the tail, and calls to agents outside the environment are cut at its boundary, because a remote cancel is not guaranteed to succeed. OpenAI's technical report on the Hugging Face incident describes tooling being built to halt evaluation workloads by workload type, agent type or evaluation task.",
      "Keep the stop handle out of the agent's reach: the agent cannot call, reconfigure or delay it, and every use is logged with its trigger and the level applied. Name who may pull it and who may approve a restart; OpenAI states that its incident response now sets out \"who can stop a run or approve restarting it\".",
    ],
    openQuestions: [
      'Which observations should trip a stop automatically during an evaluation, and which should only alert the evaluator?',
      'What time to stop is acceptable for an evaluation run, and should the target be stated per stop level or per task class?',
    ],
    observation: {
      subjectKind: 'eval-run',
      expected:
        'After a stop is pulled or a breaker trips, no tool call or write from the agent or its sub-agents, and a time to stop within the target recorded for the run.',
      observedExample:
        'Drill on run 88220: calls rejected 3.8 s after the pull; 0 tool calls but 1 storage write after the trip, through a refresh token issued before the pull: fail.',
    },
  },
  {
    ...base,
    id: 'AIGE-CTL-EVAL-007',
    title: 'Incident Evidence Preservation',
    pageTitle: 'Incident evidence preservation for AI evaluation runs',
    pageDescription:
      'Draft control: when an AI evaluation run produces an incident, freeze its environment snapshot, traces and transcript with hashes before any reset or fix.',
    depth: 'specified',
    objective:
      'When a run produces an incident, its traces, configuration and outputs are frozen before anything is fixed, so the record can be reviewed as it was.',
    failureModes: [
      'Records of a run are changed or deleted after an incident was declared.',
      'The environment is reset before its state and traces were captured.',
      "Part of a run's transcript is lost when a container is reset, and the gap is not recorded.",
      'An incident record does not link to the run it came from or to the hashes of the frozen records.',
    ],
    scope:
      'Evaluation runs that produce an incident or a result disputed after the fact, and the records they leave. Reporting to authorities follows the incident process of chapter 17.',
    enforcementPoints: ['runtime', 'periodic'],
    verification: [
      {
        kind: 'inspect',
        text: 'Inspect the evidence store and the harness configuration: the transcripts, traces, configuration and outputs of every run are written as they are produced to write-once storage outside the environment, with a retention period recorded, and the harness snapshots the environment before any reset.',
      },
      {
        kind: 'test',
        text: 'Drill the freeze on a schedule: declare a test incident on a live run, then check that the environment snapshot, trace, transcript and configuration were captured with their hashes before the environment was reset, and that an attempt to delete or overwrite them is refused.',
      },
      {
        kind: 'observe',
        text: 'For each real incident, read the incident record: it names the run, lists every frozen artefact with its hash, the hashes still match the stored artefacts, and every gap in the transcript is recorded with its cause.',
      },
    ],
    evidence: [
      { artefact: 'Incident record naming the run and listing the frozen artefacts in its supporting materials', schemaId: 'incident-record', layer: 5 },
      { artefact: 'Freeze record: hashes of the environment snapshot, trace, transcript and configuration, with the time of capture and the actor', schemaId: 'evidence-record', layer: 5 },
      { artefact: 'Freeze drill and hash check, filed as an observation of this control', schemaId: 'control-observation', layer: 5 },
    ],
    failureResponse: {
      effect: 'alert',
      text: 'A missing snapshot, a hash mismatch or an unrecorded gap alerts the incident owner and is entered in the incident record. Until the freeze is complete the environment is not reset or reused, and the fix is made on a new version, not in place.',
    },
    layer: 5,
    patterns: ['incident-pipeline', 'machine-readable-evidence-oscal'],
    seeds: ['traces', 'otel-telemetry', 'ai-act-high-risk'],
    mappings: {
      obligations: [
        'AIGE-OBL-EUAIA-ART73',
        'AIGE-OBL-EUAIA-ART72',
        'AIGE-OBL-EUAIA-ART12',
        'AIGE-OBL-EUAIA-ART26-6',
        'AIGE-OBL-GPAICOP-SAFETY-C9',
        'AIGE-OBL-ISO42001-A8',
      ],
      iso42001: ['A.8.4', 'A.6.2.8'],
      nistAiRmf: ['MEASURE 3.1'],
      owasp: [],
      aiuc1: ['E015'],
      other: [
        { framework: 'NIST SP 800-53 Rev. 5', ref: 'IR-4', note: 'Incident Handling' },
        { framework: 'NIST SP 800-53 Rev. 5', ref: 'AU-9', note: 'Protection of Audit Information' },
      ],
    },
    references: [
      CH17.freeze,
      CH17.record,
      CH17.clocks,
      METR_INVESTIGATION,
      METR_ELICITATION,
      SP_800_53,
      OPENAI_MISALIGNMENT_FRAMEWORK,
      OPENAI_FRONTIER_GOVERNANCE,
      AIUC1_REQUIREMENTS,
      OPENAI_HF_TECHNICAL_REPORT,
    ],
    implementationNotes: [
      "Freeze before you fix, as chapter 17 sets out: snapshot the system as it was (model version and hash, system prompt, policy and tool scopes, configuration), seal the traces of the incident window in tamper-evident storage, record who touched what, and fix on a new version, not in place. OpenAI's technical report on the Hugging Face incident states that it took the compromised Artifactory deployment offline, \"preserved its storage\", and revoked agent credentials.",
      "Write transcripts and traces to write-once storage as they are produced, not at the end of the run, and have the harness snapshot the environment before any reset. METR's investigation of the OpenAI/Hugging Face incident reports that many transcripts were \"missing small components, often due to container resets\".",
      "Link the incident record to the run: the run id, the frozen artefacts and their hashes go in the record's supporting materials, so a reviewer can find the run as it was. OpenAI's framework for reporting model misalignment states that each full report describes the behavior, its severity and any external impact, the setting, the date, when it was discovered and the models involved, and its Frontier Governance Framework refers to an AI Safety Incident Response Plan; a frozen run record gives such a report something to point to.",
      "Keep what an independent reviewer will need. METR states that OpenAI shared \"over a thousand unredacted transcripts\" for its investigation of the Hugging Face incident: a review of that kind depends on the transcripts having been kept whole.",
    ],
    openQuestions: [
      'How long should the records of an evaluation run be kept when the run produced no incident?',
      'Which parts of a frozen run record can be shared with an independent reviewer without exposing the task set, and in what format?',
    ],
    observation: {
      subjectKind: 'eval-run',
      expected:
        'After an incident is declared, the environment snapshot, trace, transcript and configuration of the run are frozen with their hashes before any reset, the incident record links them, and every transcript gap is recorded.',
      observedExample:
        'Incident on run 88262: snapshot and trace frozen before the reset, but 14 minutes of transcript lost in a container reset with no gap recorded: fail.',
    },
  },
  {
    ...base,
    id: 'AIGE-CTL-EVAL-008',
    title: 'Harness and Configuration Attestation',
    pageTitle: 'Harness and configuration attestation for AI evaluations',
    pageDescription:
      'Draft control: hash the harness, prompts, tool definitions and scoring configuration an AI evaluation run loads, and report each result against that manifest.',
    depth: 'specified',
    objective:
      'The harness, prompts, tool definitions and configuration a run used are versioned and hashed, so the result can be tied to exactly what was evaluated.',
    failureModes: [
      'A result is reported without the hashes of the prompts, tool definitions and harness it ran on.',
      'A tool definition changes between admission and the run without an alert.',
      'The configuration in the report differs from the one recorded for the run.',
      'Two results are compared although they ran on different scaffold prompts or task wordings, which can change the behaviour being measured.',
    ],
    scope:
      'The harness, system and scaffold prompts, task instructions, tool and MCP server definitions, policy bundles, scoring configuration and model artefacts a run loads. The design of the evaluation tasks is out of scope.',
    enforcementPoints: ['pre_merge', 'deploy'],
    verification: [
      {
        kind: 'inspect',
        text: 'Before the run, inspect the run manifest: it lists, each with a version and a hash, the harness, the system and scaffold prompts, the task instructions, the tool and MCP server definitions, the policy bundles, the scoring configuration, and the model identifier with its settings.',
      },
      {
        kind: 'test',
        text: 'At admission, recompute the hash of every artefact the environment actually loaded and compare it with the manifest: every hash must match. On a copy of the environment, change one tool definition: the run must be blocked with an alert.',
      },
      {
        kind: 'inspect',
        text: 'Before a result is released, compare the configuration stated in the report (model, reasoning setting, tool access, harness, safeguards and budget) with the manifests of the runs behind it: they must agree, and results compared with each other must share scaffold prompts and task wording or state the difference.',
      },
    ],
    evidence: [
      { artefact: 'Run manifest: version and hash of every artefact the run loaded, recorded before the run outside the environment', layer: 3 },
      { artefact: 'Admission check: the recomputed hashes against the manifest, with its verdict', schemaId: 'evidence-record', layer: 3 },
      { artefact: 'Test report stating the tested system, budget and environment of its results, with links to the run manifests', schemaId: 'test-report', layer: 3 },
      { artefact: 'Manifest check of each run, filed as an observation of this control', schemaId: 'control-observation', layer: 5 },
    ],
    failureResponse: {
      effect: 'deny',
      text: 'A run whose loaded artefacts do not match its manifest is not started, and a change detected during a run stops it. A result whose report does not match the manifests of its runs is not released until the difference is explained or the runs are repeated.',
    },
    layer: 3,
    secondaryLayers: [2],
    patterns: ['model-artefact-integrity', 'aibom', 'eval-gate-in-ci'],
    seeds: ['prompt-change-control', 'mcp-admission'],
    mappings: {
      obligations: ['AIGE-OBL-EUAIA-ART15', 'AIGE-OBL-OWASP-AIBOM', 'AIGE-OBL-ISO42001-A6'],
      iso42001: ['A.6.2.5', 'A.10.3'],
      nistAiRmf: ['MEASURE 2.3'],
      owasp: ['asi04', 'llm04-2026'],
      atlas: ['aml-t0110', 'aml-t0010'],
      other: [
        { framework: 'MITRE ATLAS mitigation', ref: 'AML.M0014', note: 'Verify AI Artifacts' },
        { framework: 'MITRE ATLAS mitigation', ref: 'AML.M0023', note: 'AI Bill of Materials' },
        { framework: 'NIST SP 800-218A', ref: 'PS.1.3', note: 'Protect model weights and configuration parameters' },
        { framework: 'NIST SP 800-218A', ref: 'PS.3.2', note: 'Keep provenance data for every component of a release' },
        { framework: 'NIST SP 800-53 Rev. 5', ref: 'CM-2', note: 'Baseline Configuration' },
        { framework: 'NIST SP 800-53 Rev. 5', ref: 'CM-3', note: 'Configuration Change Control' },
        { framework: 'NIST SP 800-53 Rev. 5', ref: 'CM-6', note: 'Configuration Settings' },
      ],
    },
    references: [
      CH23.prompts,
      CH23.mcpAdmission,
      CH14.reproducibility,
      METR_SOL,
      SSDF_GENAI,
      ATLAS,
      SP_800_53,
      ANTHROPIC_EVAL_GUIDANCE,
      OPENAI_EVAL_PLAYBOOK,
      OPENAI_COT_GRADING,
    ],
    implementationNotes: [
      'Hash what the run loads, not what the repository holds: build the manifest at admission from the artefacts inside the environment (harness image digest, prompts, task instructions, tool and MCP server definitions, policy bundles, scoring configuration, model identifier and settings), store it outside the environment and put its digest in the run record. Chapter 23 treats prompts, tool descriptions and policy bundles as configuration under change control, with the hash recorded in the registry and in every trace.',
      "Check the configuration before each run, not once per environment: Anthropic's guidance for external evaluation partners states that the isolation configuration \"should be verified before every evaluation begins\".",
      "Report the configuration with the result. OpenAI's playbook for third-party evaluations asks reports to state the tested system (model, reasoning setting, tool access, harness and safeguards) and the budget, and to describe a score as \"performance under that harness and budget, not as a measured capability ceiling\".",
      "Put the scoring path and the scaffold prompts in the manifest too. OpenAI's alignment blog describes chain-of-thought text reaching the inputs of reward mechanisms by accident during RL, now caught by an automated scan whose coverage OpenAI says is not perfect; METR states that observed cheating rates \"can also be influenced by the prompts used in the evaluation scaffold\" and by the wording of task instructions.",
    ],
    openQuestions: [
      'How should evaluation-harness configuration be attested so that a third party can verify it without access to the harness itself?',
      'When a third party runs the evaluation, who signs the manifest: the evaluator, the developer of the model or both?',
    ],
    observation: {
      subjectKind: 'harness',
      expected:
        'Every artefact the run loaded matches the version and hash in its manifest, and the report states the same configuration as the manifests of its runs.',
      observedExample:
        'Run 88270: 41 artefacts hashed at admission, all matching the manifest; the report states the same model, tools, harness and budget: pass.',
    },
  },
  {
    ...base,
    id: 'AIGE-CTL-EVAL-009',
    title: 'Evaluation Validity Checks',
    pageTitle: 'Evaluation validity checks for AI agent results',
    pageDescription:
      'Draft control: before an AI evaluation result is reported, check that tasks are solvable, the scorer works and failed runs were read, and report the checks.',
    depth: 'specified',
    objective:
      'A result is reported only after checks that the run measured what it claims: scoring worked, the environment did not fail, and the path was evaluated as well as the answer.',
    failureModes: [
      'A result is reported from a run whose environment crashed or whose automatic scoring was wrong.',
      'A task that could not be solved as set up is scored and reported as a failure of the model.',
      'Only final answers are scored: nobody reads the transcripts of failed runs, or of successes, for scorer tampering, reward hacking, communication between runs or signs of evaluation awareness.',
      'A failed validity check does not block the release it was meant to gate.',
    ],
    scope:
      'Evaluation runs whose results feed a release decision or an assurance claim. The choice of benchmarks and their statistical design are only in scope where they decide whether a result is valid.',
    enforcementPoints: ['pre_merge'],
    verification: [
      {
        kind: 'inspect',
        text: "Before the runs, inspect the task admission records: each task has evidence that it can be solved in this environment (a reference solution or a solved run), and the answers, the scorer and the task data are outside the agent's reach.",
      },
      {
        kind: 'test',
        text: 'Before the runs, score a known-correct and a known-incorrect submission for each task through the scorer the runs will use: the scorer must accept the first and reject the second.',
      },
      {
        kind: 'observe',
        text: 'After the runs, read the transcripts of every failed run and of a recorded sample of successes: classify each failure as a model limitation or a spurious failure (task bug, scoring error, crashed environment), and flag reward hacking, scorer tampering, communication between runs and verbalized evaluation awareness.',
      },
      {
        kind: 'attest',
        text: 'Before release, the evaluation lead states in the signed test report which runs were excluded or re-scored after these checks and why, and that no failed check was waived without a recorded approval.',
      },
    ],
    evidence: [
      { artefact: 'Task admission and scorer check records: solvability evidence and the verdicts on known-correct and known-incorrect submissions', schemaId: 'evidence-record', layer: 3 },
      { artefact: 'Signed test report listing the validity checks run, the runs excluded or re-scored with the reason, and any waiver', schemaId: 'test-report', layer: 3 },
      { artefact: 'Validity check of each result, filed as an observation of this control', schemaId: 'control-observation', layer: 5 },
    ],
    failureResponse: {
      effect: 'deny',
      text: 'A result whose validity checks failed or were not run is not released to the decision it gates. A spurious failure is fixed and the task rerun, or the task is excluded and the exclusion reported; runs with scorer tampering, communication between runs or verbalized evaluation awareness are excluded or reported as contaminated.',
    },
    layer: 3,
    patterns: ['eval-gate-in-ci', 'adversarial-red-team-suite'],
    seeds: ['trajectory-evals'],
    mappings: {
      obligations: [
        'AIGE-OBL-EUAIA-ART15',
        'AIGE-OBL-EUAIA-ART9',
        'AIGE-OBL-EUAIA-ART55',
        'AIGE-OBL-NISTRMF-MEASURE',
        'AIGE-OBL-ISO42001-A6',
        'AIGE-OBL-NIST-AI600-1',
      ],
      iso42001: ['A.6.2.4'],
      nistAiRmf: ['MEASURE 2.3', 'MEASURE 2.5'],
      owasp: ['asi01', 'llm01-2026'],
      other: [{ framework: 'NIST SP 800-53 Rev. 5', ref: 'SA-11', note: 'Developer Testing and Evaluation' }],
    },
    references: [
      CH14.validity,
      CH14.validation,
      CH23.object,
      METR_ELICITATION,
      METR_PROTOCOL,
      METR_SOL,
      SP_800_53,
      ANTHROPIC_EVAL_GUIDANCE,
      METR_INVESTIGATION,
      METR_TASK_STANDARD,
      OPENAI_PREPAREDNESS_V2,
      OPENAI_ASTRA_CARD,
      OPENAI_PROD_EVALS,
      OPENAI_HF_ROAD_AHEAD,
      OPENAI_EVAL_PLAYBOOK,
      OPENAI_ARTIFACTORY_REPORT,
    ],
    implementationNotes: [
      "Confirm that each task can be solved before a failure on it is counted. Anthropic's guidance for external evaluation partners asks them to \"confirm any evaluation challenge is actually solvable in principle\", because agents facing a task they cannot complete look for other ways to complete it; METR reports that many of the agents in the OpenAI/Hugging Face incident that turned to cheating had unintentionally been given an impossible task, and OpenAI states that none of its models had ever solved 198 of the 898 tasks of that evaluation before the incident.",
      "Keep the answers and the scorer out of the agent's reach. METR's Task Standard states that the agent \"MUST NOT see the data returned by get_tasks\", and METR's investigation reports agents that coordinated to find a way to \"fool or tamper with the automated scorer\".",
      "Read the transcripts, not only the scores. METR's example evaluation protocol asks for someone to read the transcripts of runs that missed the maximum score and to check that the pattern of successes and failures is roughly as expected, and METR's guidelines treat task bugs such as incorrect automatic scoring as spurious failures to fix before reporting.",
      "Report the checks with the result. OpenAI's playbook for third-party evaluations asks reports to say how assessors looked for reward hacking, evaluation awareness, contamination, refusals and sandbagging, and how confirmed cases affected scoring. OpenAI's GPT-6 Astra system card states that evaluations where models show verbalized metagaming \"can be treated similarly to contaminated evals\", and OpenAI reports that exchanges between samples through a shared package repository can \"undermine the assumption that training or evaluation samples are independent\".",
      "Report an elicited score as a lower bound. OpenAI's Preparedness Framework v2 treats a one-time capability elicitation \"as a lower bound, rather than a ceiling\", and OpenAI's alignment blog reports lower signs of evaluation awareness under production evaluations than under traditional ones.",
    ],
    openQuestions: [
      'Which validity threats (task bugs, scoring errors, evaluation awareness) should block a result, and which should only be disclosed with it?',
      'How large a sample of successful runs should be read for reward hacking and scorer tampering before a result is reported?',
    ],
    observation: {
      subjectKind: 'eval-run',
      expected:
        'Every task was shown to be solvable, the scorer passed its known-answer check, every failed run was read and classified, and contaminated runs were excluded or reported.',
      observedExample:
        'Suite run 88280: 12 of 200 tasks had no evidence of being solvable and their failures were counted against the model: fail.',
    },
  },
];
