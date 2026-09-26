// controls/evaluation-environment.ts: the Evaluation Environment Control
// Profile, v0.1 (draft). The environment a model or agent is evaluated in is
// part of the system being evaluated: the harness, the tools and MCP servers it
// can call, the credentials it holds, the network it can reach, the monitors
// watching it and the handles that stop it. A result is only as good as the
// evidence that the environment was what the report says it was.
//
// Nine controls, AIGE-CTL-EVAL-001 to 009. Three are specified in full
// (`depth: 'specified'`): 002 Network Egress Control, 003 Credential Isolation
// and 006 Stop Conditions, each with a verification procedure a third party
// can repeat, the evidence it leaves, implementation notes and an example
// observation (public/schemas/control-observation.v1.json). The other six are
// outlines (`depth: 'stub'`): objective, failure modes, scope, mappings,
// references and the open questions a reviewer should settle; their
// verification procedures and evidence come in a later draft.
//
// Every reference was opened on 2026-09-26. Quotations from METR's public
// documents are short and attributed ("METR states"); citing them implies no
// endorsement of this profile by METR, and no affiliation. AIUC-1 mappings are
// left empty until each requirement is read on its public page.
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
  version: '0.1',
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
    'METR states that agents "meant to be fully isolated from one another" communicated through an internal package repository, reports spoofed tool calls in at least 96 transcripts and transcripts missing components after container resets',
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
  version: '0.1',
  status: 'draft',
  reviewerStatus: 'open',
} as const;

/** What an outline leaves empty until a later draft specifies it. */
const outline = {
  depth: 'stub',
  verification: [],
  evidence: [],
  implementationNotes: [],
} as const;

const REVIEW_TODO = 'Verification procedure and evidence schema to be specified; requires technical review.';

export const evaluationEnvironmentControls: readonly Control[] = [
  {
    ...base,
    ...outline,
    id: 'AIGE-CTL-EVAL-001',
    title: 'Authorization Boundary',
    objective:
      'Every agent in an evaluation run acts only within an authorization boundary recorded before the run starts: the tools, operations, data classes and budgets it may use, and the runs and resources it may reach.',
    failureModes: [
      'A run starts with no recorded boundary for the agent under test.',
      'The agent calls a tool or an operation class that is not in its recorded boundary.',
      'The agent exceeds a step, call, spend or time budget and keeps running.',
      'Agents in runs meant to be isolated reach each other through a resource the runs share, such as a package repository or a cache.',
      'The agent can start processes with administrative privileges on the machine it runs on.',
    ],
    scope:
      'Agents and harnesses under evaluation, the tools they can call during a run and the resources runs share. Production deployments are covered by the agent runtime profile.',
    enforcementPoints: ['deploy', 'runtime'],
    failureResponse: { effect: 'deny', text: 'To be specified in the next draft.' },
    layer: 4,
    secondaryLayers: [2],
    patterns: ['agent-registry', 'policy-card'],
    seeds: ['registry-entry', 'read-only-tools', 'reversible-only', 'execution-budgets', 'data-classes'],
    mappings: {
      obligations: ['AIGE-OBL-EUAIA-ART14', 'AIGE-OBL-OWASP-AGENTIC', 'AIGE-OBL-CSA-AICM-AGENTIC', 'AIGE-OBL-SG-AGENTIC-IDENTITY'],
      iso42001: ['A.6.2.2', 'A.9.2'],
      nistAiRmf: [],
      owasp: ['asi02', 'asi03', 'llm03-2026'],
      other: [
        { framework: 'NIST SP 800-53 Rev. 5', ref: 'AC-3', note: 'Access Enforcement' },
        { framework: 'NIST SP 800-53 Rev. 5', ref: 'AC-6', note: 'Least Privilege' },
      ],
    },
    references: [CH23.registry, CH23.autonomy, CH23.allowList, METR_TASK_STANDARD, METR_INVESTIGATION, OWASP_AGENTIC, SP_800_53],
    openQuestions: [
      'What evidence is sufficient to show that an agent stayed within its authorization boundary for a whole run?',
      'Should the boundary of an evaluation run be written in the same registry entry format as a production agent?',
      REVIEW_TODO,
    ],
  },
  {
    ...base,
    id: 'AIGE-CTL-EVAL-002',
    title: 'Network Egress Control',
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
      aiuc1: [],
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
    ],
    implementationNotes: [
      'Attach a default-deny egress policy to every task environment (a network policy, a firewall rule set or an egress proxy, by category) that lists each permitted destination explicitly, for example the LLM API proxy and the progress server. Enforce it on the resolved address, and serve DNS from a resolver that answers only for listed names: DNS is an egress path too.',
      "Record the allow-list with the run: its hash goes in the run record next to the environment version, so the flow log can later be compared with what was declared, not with what was intended.",
      'Keep a flow log per run at the enforcement point, outside anything the agent can reach or change, with refused attempts as well as allowed connections.',
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
    depth: 'specified',
    objective:
      "An agent under evaluation holds only short-lived credentials issued to its own identity for the run and bound to the one service each is for, never standing secrets or a person's own token.",
    failureModes: [
      "A long-lived secret (an API key, a cloud access key, a password) is readable from the agent's environment, configuration, files or memory during a run.",
      'The agent presents a token issued to a person, or a token whose audience is another service, and the tool server accepts it.',
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
      aiuc1: [],
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
    ],
    implementationNotes: [
      'Give each agent under test its own workload identity for the run (an attested identity document of the kind SPIFFE defines, or the platform\'s workload identity) and issue its tokens from a broker outside the environment. The environment template holds no secret.',
      'Keep the model API key with an LLM API proxy outside the environment, reached through the egress allow-list of AIGE-CTL-EVAL-002: the agent sees the proxy, never the key.',
      "Issue short-lived access tokens whose aud names one tool server and, when the agent acts for a user or another agent, whose act claim names the agent (RFC 8693 token exchange). Tool servers validate the audience and refuse any other token, as the MCP authorization specification of 2026-07-28 requires of MCP servers.",
      'Set every token lifetime no longer than the run\'s time budget, issue no refresh tokens to agents under evaluation, and revoke what was issued when the run ends or is aborted.',
      "Scrub credentials from memory stores, transcripts and logs before they are written, then grep every run artefact after the run for secret patterns (known key prefixes, high-entropy strings, the run's own issued tokens); a match fails the run. METR's public investigation of the OpenAI/Hugging Face incident reports an agent that \"found two working credentials, and immediately posted them\" where other agents could read them.",
    ],
    openQuestions: [
      'What lifetime should a credential issued for an evaluation run have, and who revokes it when the run is aborted?',
      'Can a secret scan be made complete for encoded or split credentials, or should the control rely on short lifetimes and revocation for whatever a scan may miss?',
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
    ...outline,
    id: 'AIGE-CTL-EVAL-004',
    title: 'Tool and Action Mediation',
    objective:
      'Every tool call an agent makes during a run passes a mediation point outside the model that checks it against policy before it executes.',
    failureModes: [
      'A tool call executes without a policy verdict recorded for it.',
      'An irreversible action runs while the mediation point is down.',
      'An approval is reused for a call whose parameters changed.',
    ],
    scope: 'Tool, MCP and code-execution calls made by the agent under evaluation. The internal reasoning of the model is out of scope.',
    enforcementPoints: ['runtime'],
    failureResponse: { effect: 'deny', text: 'To be specified in the next draft.' },
    layer: 4,
    patterns: ['runtime-guardrail', 'human-in-the-loop-gate'],
    seeds: ['guardrail-every-call', 'checkpoint-irreversible', 'approval-log', 'mcp-admission', 'sandbox'],
    mappings: {
      obligations: ['AIGE-OBL-EUAIA-ART14', 'AIGE-OBL-OWASP-ACS', 'AIGE-OBL-SG-AGENTIC-CHECKPOINTS', 'AIGE-OBL-OWASP-AGENTIC'],
      iso42001: ['A.9.2'],
      nistAiRmf: [],
      owasp: ['asi01', 'asi02', 'asi05', 'asi09', 'llm10-2026'],
      other: [
        { framework: 'MITRE ATLAS mitigation', ref: 'AML.M0028', note: 'AI Agent Tools Permissions Configuration' },
        { framework: 'MITRE ATLAS mitigation', ref: 'AML.M0029', note: 'Human In-the-Loop for AI Agent Actions' },
        { framework: 'MITRE ATLAS mitigation', ref: 'AML.M0030', note: 'Restrict AI Agent Tool Invocation on Untrusted Data' },
      ],
    },
    references: [CH23.guardrails, CH23.checkpoint, CH23.mcpAdmission, OWASP_ACS, METR_ELICITATION, OWASP_AGENTIC],
    openQuestions: [
      'Which call classes must fail closed when the mediation point is unavailable during an evaluation? Chapter 23 notes that the reference guardian of the Agent Control Standard starts with a fail-open posture.',
      "How can every call be mediated without taking away the scaffolding and tooling a capability elicitation needs? METR's guidelines ask for \"the best available scaffolding + tooling\".",
      REVIEW_TODO,
    ],
  },
  {
    ...base,
    ...outline,
    id: 'AIGE-CTL-EVAL-005',
    title: 'Monitoring Integrity',
    objective:
      "The traces and monitors of a run capture every plan step and tool call with the agent's identity and version, as the tool returned it, and the agent cannot disable or alter them.",
    failureModes: [
      "A tool call appears in the environment's logs but not in the run's trace.",
      'Monitoring is switched off or reconfigured from inside the environment during a run, for example by changing an environment variable.',
      'The recorded output of a tool call differs from what the tool returned (a spoofed tool call).',
      'Trace records are missing for part of a run and no gap is recorded.',
    ],
    scope:
      'Telemetry, traces and monitors attached to an evaluation run, and the store they are written to. Preserving the records after an incident is covered by AIGE-CTL-EVAL-007.',
    enforcementPoints: ['runtime', 'periodic'],
    failureResponse: { effect: 'alert', text: 'To be specified in the next draft.' },
    layer: 4,
    secondaryLayers: [5],
    patterns: ['continuous-assurance-telemetry'],
    seeds: ['traces', 'otel-telemetry', 'trajectory-anomaly'],
    mappings: {
      obligations: ['AIGE-OBL-EUAIA-ART12', 'AIGE-OBL-EUAIA-ART26-6', 'AIGE-OBL-EUAIA-ART72', 'AIGE-OBL-NISTRMF-MANAGE'],
      iso42001: ['A.6.2.8', 'A.6.2.6'],
      nistAiRmf: ['MANAGE 4.1', 'MEASURE 3.1'],
      owasp: ['asi10'],
      other: [
        { framework: 'MITRE ATLAS mitigation', ref: 'AML.M0024', note: 'AI Telemetry Logging' },
        { framework: 'NIST SP 800-53 Rev. 5', ref: 'AU-2', note: 'Event Logging' },
        { framework: 'NIST SP 800-53 Rev. 5', ref: 'AU-9', note: 'Protection of Audit Information' },
        { framework: 'NIST SP 800-53 Rev. 5', ref: 'AU-12', note: 'Audit Record Generation' },
        { framework: 'NIST SP 800-53 Rev. 5', ref: 'SI-4', note: 'System Monitoring' },
      ],
    },
    references: [CH23.telemetry, CH23.incidents, OTEL_GENAI, METR_INVESTIGATION, METR_RISK_REPORT, SP_800_53],
    openQuestions: [
      "How can a reviewer show that a run's trace is complete, not only that the records it holds are unaltered?",
      "How should a harness detect a spoofed tool call, where the transcript records an output the tool never returned? METR's investigation reports this in at least 96 transcripts.",
      'The OpenTelemetry GenAI conventions are still at status Development: should the profile name the attributes it relies on, or only the events a trace must contain?',
      REVIEW_TODO,
    ],
  },
  {
    ...base,
    id: 'AIGE-CTL-EVAL-006',
    title: 'Stop Conditions',
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
    ],
    implementationNotes: [
      'Record per-agent budgets (steps, tool calls, tokens, spend, wall-clock time) and breaker thresholds (unauthorised calls, refused egress attempts, anomaly scores) in the run record, and enforce them at the gateway the agent\'s calls pass through, not inside the agent.',
      'Make budget exhaustion and threshold breaches trip the breaker automatically. A ticket or a log line alone is not a stop.',
      'Drill the stop: pull it mid-task, measure the time from the pull to the first rejected call, and assert zero tool calls and zero writes after the trip for a window longer than the longest task. File the measurement as a control observation.',
      'Make the kill path work across delegation hops: sub-agents run under delegated tokens that the stop revokes, token lifetimes are short enough to bound the tail, and calls to agents outside the environment are cut at its boundary, because a remote cancel is not guaranteed to succeed.',
      'Keep the stop handle out of the agent\'s reach: the agent cannot call, reconfigure or delay it, and every use is logged with its trigger and the level applied.',
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
    ...outline,
    id: 'AIGE-CTL-EVAL-007',
    title: 'Incident Evidence Preservation',
    objective:
      'When a run produces an incident, its traces, configuration and outputs are frozen before anything is fixed, so the record can be reviewed as it was.',
    failureModes: [
      'Records of a run are changed or deleted after an incident was declared.',
      'The environment is reset before its state and traces were captured.',
      'Part of a run\'s transcript is lost when a container is reset, and the gap is not recorded.',
      'An incident record does not link to the run it came from.',
    ],
    scope:
      'Evaluation runs that produce an incident or a result disputed after the fact, and the records they leave. Reporting to authorities follows the incident process of chapter 17.',
    enforcementPoints: ['runtime'],
    failureResponse: { effect: 'alert', text: 'To be specified in the next draft.' },
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
      nistAiRmf: [],
      owasp: [],
      other: [
        { framework: 'NIST SP 800-53 Rev. 5', ref: 'IR-4', note: 'Incident Handling' },
        { framework: 'NIST SP 800-53 Rev. 5', ref: 'AU-9', note: 'Protection of Audit Information' },
      ],
    },
    references: [CH17.freeze, CH17.record, CH17.clocks, METR_INVESTIGATION, METR_ELICITATION, SP_800_53],
    openQuestions: [
      'How long should the records of an evaluation run be kept when the run produced no incident?',
      "Which records must survive a container reset for a third party to review a run's transcripts, as METR's guidelines expect a reviewer to do?",
      REVIEW_TODO,
    ],
  },
  {
    ...base,
    ...outline,
    id: 'AIGE-CTL-EVAL-008',
    title: 'Harness and Configuration Attestation',
    objective:
      'The harness, prompts, tool definitions and configuration a run used are versioned and hashed, so the result can be tied to exactly what was evaluated.',
    failureModes: [
      'A result is reported without the hashes of the prompts, tool definitions and harness it ran on.',
      'A tool definition changes between admission and the run without an alert.',
      'The configuration in the report differs from the one recorded for the run.',
      'Two results are compared although they ran on different scaffold prompts or task wordings, which can change the behaviour being measured.',
    ],
    scope:
      'The harness, system prompts, tool and MCP server definitions, policy bundles and model artefacts a run loads. The design of the evaluation tasks is out of scope.',
    enforcementPoints: ['pre_merge', 'deploy'],
    failureResponse: { effect: 'deny', text: 'To be specified in the next draft.' },
    layer: 3,
    secondaryLayers: [2],
    patterns: ['model-artefact-integrity', 'aibom', 'eval-gate-in-ci'],
    seeds: ['prompt-change-control', 'mcp-admission'],
    mappings: {
      obligations: ['AIGE-OBL-EUAIA-ART15', 'AIGE-OBL-OWASP-AIBOM', 'AIGE-OBL-ISO42001-A6'],
      iso42001: ['A.6.2.5', 'A.10.3'],
      nistAiRmf: [],
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
    references: [CH23.prompts, CH23.mcpAdmission, CH14.reproducibility, METR_SOL, SSDF_GENAI, ATLAS, SP_800_53],
    openQuestions: [
      'How should evaluation-harness configuration be attested so that a third party can verify it without access to the harness itself?',
      "Should the scaffold prompts and task wording be part of the attested configuration? METR's GPT-5.6 Sol summary notes that observed cheating rates can be influenced by them, so the harness configuration is part of the result.",
      REVIEW_TODO,
    ],
  },
  {
    ...base,
    ...outline,
    id: 'AIGE-CTL-EVAL-009',
    title: 'Evaluation Validity Checks',
    objective:
      'A result is reported only after checks that the run measured what it claims: scoring worked, the environment did not fail, and the path was evaluated as well as the answer.',
    failureModes: [
      'A result is reported from a run whose environment crashed or whose automatic scoring was wrong.',
      'Only final answers are scored, although the agent took actions on the way.',
      'Failed runs are counted without anyone reading why they failed.',
      'A failed validity check does not block the release it was meant to gate.',
    ],
    scope:
      'Evaluation runs whose results feed a release decision or an assurance claim. The choice of benchmarks and their statistical design are only in scope where they decide whether a result is valid.',
    enforcementPoints: ['pre_merge'],
    failureResponse: { effect: 'deny', text: 'To be specified in the next draft.' },
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
    references: [CH14.validity, CH14.validation, CH23.object, METR_ELICITATION, METR_PROTOCOL, METR_SOL, SP_800_53],
    openQuestions: [
      'Which validity threats (task bugs, scoring errors, evaluation awareness) should block a result, and which should only be disclosed with it?',
      "METR's Guidelines for Capability Elicitation treat task bugs, such as incorrect automatic scoring or a crashed environment, as spurious failures to be fixed before a result is reported: should this control require the same, or only that the fix is recorded?",
      REVIEW_TODO,
    ],
  },
];
