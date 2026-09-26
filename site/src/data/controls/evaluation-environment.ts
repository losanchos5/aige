// controls/evaluation-environment.ts: the Evaluation Environment Control
// Profile, v0.1 (draft). The environment a model or agent is evaluated in is
// part of the system being evaluated: the harness, the tools and MCP servers it
// can call, the credentials it holds, the network it can reach, the monitors
// watching it and the handles that stop it. A result is only as good as the
// evidence that the environment was what the report says it was.
//
// Nine controls, AIGE-CTL-EVAL-001 to 009. In this version all nine are
// outlines (`depth: 'stub'`): a title, an objective, the failures the control
// exists to catch, where it is enforced, its layer, the patterns and chapter-23
// seeds it builds on, the mappings already verified in ./frameworks.ts and
// ./threats.ts, and the open questions a reviewer should settle. References,
// verification procedures and evidence schemas come in the next draft.
//
// Draft control specifications, open for technical review; illustrative, not a
// claim of conformity, not legal advice. Types and rules: ./index.ts.
import type { Control, ControlProfile } from './index';

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
      note: 'First draft: nine control outlines with open questions, open for technical review.',
    },
  ],
  issueTemplate: 'control-review.yml',
};

/** Fields every control of this version shares. */
const base = {
  profile: PROFILE,
  version: '0.1',
  status: 'draft',
  reviewerStatus: 'open',
  depth: 'stub',
  verification: [],
  evidence: [],
  references: [],
  implementationNotes: [],
} as const;

export const evaluationEnvironmentControls: readonly Control[] = [
  {
    ...base,
    id: 'AIGE-CTL-EVAL-001',
    title: 'Authorization Boundary',
    objective:
      'Every agent in an evaluation run acts only within an authorization boundary recorded before the run starts: the tools, operations, data classes and budgets it may use.',
    failureModes: [
      'A run starts with no recorded boundary for the agent under test.',
      'The agent calls a tool or an operation class that is not in its recorded boundary.',
      'The agent exceeds a step, call, spend or time budget and keeps running.',
    ],
    scope: 'Agents and harnesses under evaluation and the tools they can call during a run. Production deployments are covered by the agent runtime profile.',
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
    },
    openQuestions: [
      'What evidence is sufficient to show that an agent stayed within its authorization boundary for a whole run?',
      'Should the boundary of an evaluation run be written in the same registry entry format as a production agent?',
    ],
  },
  {
    ...base,
    id: 'AIGE-CTL-EVAL-002',
    title: 'Network Egress Control',
    objective:
      'Outbound connections from the evaluation environment reach only the destinations on the run\'s egress allow-list; everything else is denied by default.',
    failureModes: [
      'A connection to a host that is not on the run\'s egress allow-list succeeds.',
      'The run starts without an egress policy attached to the environment.',
      'Data leaves through a permitted tool to a destination nobody listed.',
    ],
    scope: 'Every network path out of the environment a run executes in: the agent\'s sandbox, the tools and MCP servers it calls and any auxiliary machines. Inbound access for operators is out of scope.',
    enforcementPoints: ['deploy', 'runtime'],
    failureResponse: { effect: 'deny', text: 'To be specified in the next draft.' },
    layer: 4,
    patterns: ['runtime-guardrail', 'sanctioned-ai-gateway'],
    seeds: ['egress-filter', 'tool-allow-list', 'sandbox'],
    mappings: {
      obligations: ['AIGE-OBL-EUAIA-ART15', 'AIGE-OBL-OWASP-LLM', 'AIGE-OBL-OWASP-AGENTIC'],
      iso42001: ['A.6.2.6'],
      nistAiRmf: [],
      owasp: ['asi02', 'llm02-2026'],
    },
    openQuestions: [
      'How should the egress allow-list of a run be recorded so that a third party can compare it with the connections actually observed?',
    ],
  },
  {
    ...base,
    id: 'AIGE-CTL-EVAL-003',
    title: 'Credential Isolation',
    objective:
      'An agent under evaluation holds only short-lived credentials issued to its own identity for the run, never standing secrets or a person\'s own token.',
    failureModes: [
      'A long-lived secret is present in the agent\'s configuration or environment.',
      'The agent acts with a token issued to a person rather than a delegated one that names the agent.',
      'A credential issued for the run is still valid after the run ends.',
    ],
    scope: 'Credentials, tokens and keys the agent and its tools can reach during a run, including those held in memory. The evaluator\'s own operator credentials are out of scope.',
    enforcementPoints: ['deploy', 'runtime'],
    failureResponse: { effect: 'deny', text: 'To be specified in the next draft.' },
    layer: 4,
    secondaryLayers: [2],
    patterns: ['agent-identity-scoped-credentials'],
    seeds: ['own-identity', 'short-lived-credentials', 'delegated-token', 'mcp-authorization', 'memory-governance'],
    mappings: {
      obligations: ['AIGE-OBL-EUAIA-ART15', 'AIGE-OBL-SG-AGENTIC-IDENTITY', 'AIGE-OBL-NIST-AGENTS', 'AIGE-OBL-OWASP-AGENTIC'],
      iso42001: ['A.6.2.6', 'A.9.2'],
      nistAiRmf: [],
      owasp: ['asi03'],
    },
    openQuestions: [
      'What lifetime should a credential issued for an evaluation run have, and who revokes it when the run is aborted?',
    ],
  },
  {
    ...base,
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
    },
    openQuestions: [
      'Which call classes must fail closed when the mediation point is unavailable during an evaluation?',
    ],
  },
  {
    ...base,
    id: 'AIGE-CTL-EVAL-005',
    title: 'Monitoring Integrity',
    objective:
      'The traces and monitors of a run capture every plan step and tool call with the agent\'s identity and version, and the agent cannot disable or alter them.',
    failureModes: [
      'A tool call appears in the environment\'s logs but not in the run\'s trace.',
      'Monitoring is switched off or reconfigured from inside the environment during a run.',
      'Trace records are missing for part of a run and no gap is recorded.',
    ],
    scope: 'Telemetry, traces and monitors attached to an evaluation run, and the store they are written to. Preserving the records after an incident is covered by AIGE-CTL-EVAL-007.',
    enforcementPoints: ['runtime', 'periodic'],
    failureResponse: { effect: 'alert', text: 'To be specified in the next draft.' },
    layer: 4,
    secondaryLayers: [5],
    patterns: ['continuous-assurance-telemetry'],
    seeds: ['traces', 'otel-telemetry', 'trajectory-anomaly'],
    mappings: {
      obligations: ['AIGE-OBL-EUAIA-ART12', 'AIGE-OBL-EUAIA-ART26-6', 'AIGE-OBL-EUAIA-ART72', 'AIGE-OBL-NISTRMF-MANAGE'],
      iso42001: ['A.6.2.8', 'A.6.2.6'],
      nistAiRmf: [],
      owasp: ['asi10'],
    },
    openQuestions: [
      'How can a reviewer show that a run\'s trace is complete, not only that the records it holds are unaltered?',
    ],
  },
  {
    ...base,
    id: 'AIGE-CTL-EVAL-006',
    title: 'Stop Conditions',
    objective:
      'Every run has stop conditions and stop levels defined before it starts, and pulling a stop halts the agent\'s calls and writes within a measured time.',
    failureModes: [
      'A run starts without defined stop conditions or a stop handle.',
      'The agent makes a call or a write after a stop was pulled.',
      'A budget is exhausted and the run continues instead of tripping the breaker.',
    ],
    scope: 'Agents under evaluation and every agent or service they delegate to within the environment. Third-party agents outside the environment can only be cut off at its boundary.',
    enforcementPoints: ['runtime', 'periodic'],
    failureResponse: { effect: 'alert', text: 'To be specified in the next draft.' },
    layer: 4,
    patterns: ['kill-switch-circuit-breaker'],
    seeds: ['per-agent-breaker', 'drilled-kill-switch', 'execution-budgets', 'remote-agents'],
    mappings: {
      obligations: ['AIGE-OBL-EUAIA-ART14', 'AIGE-OBL-NISTRMF-MANAGE', 'AIGE-OBL-OWASP-AGENTIC', 'AIGE-OBL-CN-TC260-AGENTS'],
      iso42001: ['A.6.2.6'],
      nistAiRmf: [],
      owasp: ['asi08', 'asi10', 'llm06-2026'],
    },
    openQuestions: [
      'Which observations should trip a stop automatically during an evaluation, and which should only alert the evaluator?',
    ],
  },
  {
    ...base,
    id: 'AIGE-CTL-EVAL-007',
    title: 'Incident Evidence Preservation',
    objective:
      'When a run produces an incident, its traces, configuration and outputs are frozen before anything is fixed, so the record can be reviewed as it was.',
    failureModes: [
      'Records of a run are changed or deleted after an incident was declared.',
      'The environment is reset before its state and traces were captured.',
      'An incident record does not link to the run it came from.',
    ],
    scope: 'Evaluation runs that produce an incident or a result disputed after the fact, and the records they leave. Reporting to authorities follows the incident process of chapter 17.',
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
    },
    openQuestions: [
      'How long should the records of an evaluation run be kept when the run produced no incident?',
    ],
  },
  {
    ...base,
    id: 'AIGE-CTL-EVAL-008',
    title: 'Harness and Configuration Attestation',
    objective:
      'The harness, prompts, tool definitions and configuration a run used are versioned and hashed, so the result can be tied to exactly what was evaluated.',
    failureModes: [
      'A result is reported without the hashes of the prompts, tool definitions and harness it ran on.',
      'A tool definition changes between admission and the run without an alert.',
      'The configuration in the report differs from the one recorded for the run.',
    ],
    scope: 'The harness, system prompts, tool and MCP server definitions, policy bundles and model artefacts a run loads. The design of the evaluation tasks is out of scope.',
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
    },
    openQuestions: [
      'How should evaluation-harness configuration be attested so that a third party can verify it without access to the harness itself?',
    ],
  },
  {
    ...base,
    id: 'AIGE-CTL-EVAL-009',
    title: 'Evaluation Validity Checks',
    objective:
      'A result is reported only after checks that the run measured what it claims: scoring worked, the environment did not fail, and the path was evaluated as well as the answer.',
    failureModes: [
      'A result is reported from a run whose environment crashed or whose automatic scoring was wrong.',
      'Only final answers are scored, although the agent took actions on the way.',
      'A failed validity check does not block the release it was meant to gate.',
    ],
    scope: 'Evaluation runs whose results feed a release decision or an assurance claim. The choice of benchmarks and their statistical design are only in scope where they decide whether a result is valid.',
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
      nistAiRmf: [],
      owasp: ['asi01', 'llm01-2026'],
    },
    openQuestions: [
      'Which validity threats (task bugs, scoring errors, evaluation awareness) should block a result, and which should only be disclosed with it?',
    ],
  },
];
