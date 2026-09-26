// controls/agent-runtime.ts: the Agent Runtime Control Profile, v0.1 (draft).
// Thirty-one reference controls, AIGE-CTL-AGENT-001 to 031, one per agent
// control of chapter 23 (bok/23-governing-agents.md) as ../tool-agent-controls.ts
// restates them, in the same order. Each record is derived from its seed and
// adds nothing that chapter 23, the mapped threats or a cited source does not
// say:
//
//   rule      -> objective: restated as an outcome (OBJECTIVES), or kept word
//                for word where the rule already is one (KEPT_VERBATIM)
//   evidence  -> evidence[0].artefact, on the control's layer
//   pattern   -> patterns
//   threats   -> mappings.owasp (the OWASP Agentic rows of ../threats.ts, lower
//                case), failureModes (those rows' summaries),
//                mappings.obligations and mappings.iso42001 (only the ids
//                ../threats.ts already links to those rows)
//   anchor    -> references (the chapter-23 section, plus the OWASP Agentic
//                source when the control maps to a threat, and the ISO/IEC
//                42001 source when it carries an Annex A id)
//
// Per seed, where the chapter or a cited source supports it (DERIVATION):
// failure modes for the twelve seeds with no OWASP threat, each the observable
// event when the chapter's rule is not met; a failure mode from a METR report
// that directly shows the failure; the failure response the chapter states for
// the check; a narrower scope when the rule is conditional; implementation
// notes that paraphrase the chapter's own guidance; NIST AI RMF MANAGE 2.4 where
// the chapter cites it; a second chapter section where a rule or a note comes
// from it.
//
// Layer: 4 (runtime), except registry and identity seeds and MCP server
// admission (2, the layer the chapter's threat table gives server admission),
// trajectory evals (3) and telemetry and evidence seeds (5). Enforcement point:
// runtime, except the registry entry, data classes and MCP admission (deploy),
// trajectory evals (pre_merge), prompt change control (pre_merge and deploy),
// and the drilled kill switch and local MCP servers, which add scheduled drills
// and discovery sweeps (periodic). No verification procedure: the derivation
// invents no test, so every control is a draft that needs technical review and
// says so in its open questions.
//
// Draft control specifications, open for technical review; illustrative, not a
// claim of conformity, not legal advice. Types and rules: ./index.ts.
import type { Control, ControlProfile } from './index';
import type { LayerNumber } from '../stack';
import type { EnforcementPoint, PolicyEffect } from '../policy-card';
import type { Source } from '../../lib/sources';
import { agentControls, agentAnchors, agentChapter, type AgentControl, type AnchorKey } from '../tool-agent-controls';
import { threatById, threatSources, SRC } from '../threats';
import { site } from '../site';

const PROFILE = 'agent-runtime';

export const agentRuntimeProfile: ControlProfile = {
  slug: PROFILE,
  title: 'Agent Runtime Control Profile',
  shortTitle: 'Agent runtime',
  version: '0.1',
  status: 'draft',
  reviewerStatus: 'open',
  summary:
    'Reference controls for AI agents at runtime, derived from the 31 agent controls of chapter 23. Every control is a draft: it restates the chapter, carries no verification procedure yet and is open for technical review.',
  scope:
    'Agents that call tools, in production and in evaluation harnesses, from registration to retirement: their identity, tools, memory, delegation, checkpoints, stop handles and telemetry. The environment an agent is evaluated in is covered by the evaluation environment profile.',
  published: '2026-09-26',
  updated: '2026-09-26',
  authors: ['jorge-garcia-aibar'],
  reviewers: [],
  changelog: [
    {
      version: '0.1',
      date: '2026-09-26',
      note: 'First draft: 31 controls derived from the agent controls of chapter 23, open for technical review.',
    },
  ],
  issueTemplate: 'control-review.yml',
};

/** Chapter-23 heading text for each anchor key (rehype-slug ids in ../tool-agent-controls.ts). */
const anchorHeadings: Readonly<Record<AnchorKey, string>> = {
  object: 'What makes an agent a governance object',
  autonomy: 'Autonomy is a design decision',
  registry: 'The agent registry',
  identity: 'Identity and short-lived credentials',
  credentials: 'Short-lived, attested credentials',
  delegation: 'Delegation without impersonation',
  mcpAuth: 'MCP authorization as of 2026-07-28',
  allowList: 'The tool allow-list',
  mcpAdmission: 'Admitting an MCP server',
  checkpoint: 'Where to put a checkpoint',
  approval: 'What a good approval looks like',
  guardrails: 'Runtime guardrails for tool calls',
  limits: 'Execution limits',
  killSwitch: 'Kill switch and per-agent circuit breakers',
  hops: 'Stopping across hops',
  memory: 'Memory and context governance',
  multiAgent: 'Multi-agent systems and delegation chains',
  accountability: 'Accountability across hops',
  prompts: 'Prompts as configuration under change control',
  incidents: 'An agent incident taxonomy',
  telemetry: 'Telemetry with the OpenTelemetry GenAI conventions',
  threats: 'Threats mapped to controls',
  euAiAct: 'EU AI Act hooks for agents',
};

/** Exported for tests: every heading must exist in bok/23-governing-agents.md. */
export const agentRuntimeAnchorHeadings = anchorHeadings;

// ---------------------------------------------------------------------------
// Sources beyond the chapter and the threat bridge

const ASI_SOURCE: Source = threatSources[SRC.asi - 1];
const ISO_SOURCE: Source = threatSources[SRC.iso42001 - 1];

const NIST_RMF_SOURCE: Source = {
  title: 'Artificial Intelligence Risk Management Framework (AI RMF 1.0), NIST AI 100-1',
  gloss:
    'MANAGE 2.4: mechanisms to supersede, disengage or deactivate AI systems whose performance or outcomes are inconsistent with intended use',
  publisher: 'NIST',
  date: '2023-01-26',
  url: 'https://nvlpubs.nist.gov/nistpubs/ai/NIST.AI.100-1.pdf',
  verified: 'primary',
};

const METR_INCIDENT_SOURCE: Source = {
  title:
    "Brief independent investigation of agents' behavior, reasoning and collaboration in the OpenAI / Hugging Face hacking incident",
  gloss:
    'agents in an evaluation exercise spoofed tool calls to alter their transcripts, tried to trigger container resets that would wipe recent records, and gained code execution on a sandbox with access to the full internet',
  publisher: 'METR',
  date: '2026-08-26',
  url: 'https://metr.org/blog/2026-08-26-openai-hugging-face-incident-investigation/',
  verified: 'primary',
};

const METR_RISK_REPORT_SOURCE: Source = {
  title: 'Frontier Risk Report (February to March 2026)',
  gloss: 'red-teaming found several simple ways for agent monitoring to be disabled, one by changing an environment variable',
  publisher: 'METR',
  date: '2026-05-19',
  url: 'https://metr.org/blog/2026-05-19-frontier-risk-report/',
  verified: 'primary',
};

function chapterSource(anchor: AnchorKey): Source {
  return {
    title: 'Governing AI agents',
    gloss: `AI Governance Engineering Body of Knowledge v${site.bokVersion}, chapter 23, section "${anchorHeadings[anchor]}"`,
    publisher: `${site.name} (${site.author})`,
    date: '2026-09',
    url: `${site.url}${agentChapter}#${agentAnchors[anchor]}`,
    verified: 'primary',
  };
}

// ---------------------------------------------------------------------------
// Objectives

/** Seeds whose chapter rule already states an outcome: the objective is the rule, word for word. */
export const KEPT_VERBATIM: ReadonlySet<string> = new Set([
  'read-only-tools',
  'checkpoint-before-writes',
  'approval-log',
  'per-agent-breaker',
  'reversible-only',
  'sandbox',
  'memory-governance',
  'hop-accountability',
]);

/** The other rules, restated as the outcome the rule produces; same content, no new requirement. */
const OBJECTIVES: Readonly<Record<string, string>> = {
  'registry-entry':
    'Every agent is registered before it reaches production, in an entry written by the pipeline that records its identity, owner, purpose, autonomy level, tools and scopes, data classes and memory stores, delegation rights, versions, checkpoints, stop handles, expiry, and regulatory role and class.',
  'own-identity':
    'Each agent has a unique, attributable workload identity under which its actions are logged and its access can be revoked; channel authentication is not taken for agent identity.',
  traces:
    "The agent's trajectory is traced, not only its answer: every plan, tool call and memory operation is recorded with the agent id and version.",
  'tool-allow-list':
    'The agent can call only the tools granted on its allow-list, which the gateway evaluates on every call; each entry fixes the tool identity with a pinned definition hash, the operation class, resource scope, rate and volume, egress, data classes and checkpoint.',
  'guardrail-every-call':
    "A guardrail between the agent's decision to call a tool and the call checks every call: the identity matches a live registry entry, the tool and its definition hash are on the allow-list, the parameters are within policy, instruction provenance is checked before write-class calls, output and egress are filtered, and execution budgets hold.",
  'execution-budgets':
    'Step, call, token, spend and time budgets are set in the registry entry and enforced at the gateway, and exhausting a budget trips the breaker rather than raising a ticket.',
  'drilled-kill-switch':
    'The stop levels (pause a task, narrow the scope, trip the breaker, revoke the identity, stop a class, degrade) and their triggers are defined in advance, and the stop is drilled on a schedule, with the time to stop measured and a check that the stop held.',
  'trajectory-anomaly':
    "The agent's behaviour is monitored as it unfolds, and anomalies (calls unrelated to the purpose, parameters outside the profile, calls after expiry, spend spikes) are flagged and either halt the agent or escalate to a person.",
  'trajectory-evals':
    'Every change to the agent is evaluated on its path as well as its answer, including task success, injection resistance and trajectory checks, and a failed evaluation blocks the change.',
  'checkpoint-irreversible':
    'Pay, delete, send and execute calls are gated by consequence (high stakes, irreversible, outlier, user-defined, scope elevation) and fail closed when the guardian is down; only reads fail open, and then with an alert.',
  'egress-filter':
    'What leaves after each call is filtered for secrets, personal data and destinations, and every tool, including the ones nobody worries about, has a rate and an egress bound.',
  'mcp-admission':
    'Each MCP server is admitted as a supplier: its provenance is recorded in the AIBOM, its tool definitions are hashed and pinned with an alert on change, its authorisation conformance is checked, it is tested with poisoned descriptors and injected outputs, and it has an owner and a review date.',
  'mcp-local':
    'A one-click local MCP server install shows the exact install command and waits for explicit approval; local servers run sandboxed with minimal privileges, and discovery sweeps reconcile them.',
  'mcp-authorization':
    'Where a remote MCP server uses authorisation, discovery uses protected-resource metadata, token requests carry the resource parameter, the audience is validated and no token is passed through, the issuer is validated, and scopes are stepped up instead of granted as omnibus ones; the MCP version each server speaks is recorded.',
  'short-lived-credentials':
    'The agent holds no static key or long-lived secret: it acts on short-lived, attested credentials that expire in minutes and are revoked at the end of the task.',
  'delegated-token':
    "When the agent acts for a user, it holds a delegated token, exchanged for the user's, that names the agent, with a narrower scope and a short expiry; it never holds the user's own token.",
  'memory-personal-data':
    "Every memory store that holds personal data has retention windows and an erasure path, in line with the GDPR's minimisation and storage-limitation principles and the right to erasure, and no memory store holds credentials.",
  'remote-agents':
    'A third-party agent, which cannot be stopped from outside, is cut off at your boundary: your agents can be stopped from calling it, what you issued to it can be revoked, and a contract names who answers for it.',
  'data-classes':
    "The registry entry records the agent's data classes and memory stores and links the DPIA and the records of processing, and each tool states which data classes may flow in and out (the chapter's example: no special-category data to external tools).",
  'prompt-change-control':
    'The system prompt, tool descriptions and policy bundle are versioned and owned, hashed in the registry and in every trace, and changed only through the regression suite and a canary rollout with the previous hash ready to restore, with a check on whether the purpose changed.',
  'otel-telemetry':
    'The agent emits agent and tool spans on the OpenTelemetry GenAI conventions (execute_tool, gen_ai.agent.id, gen_ai.agent.version), with registry id, workload identity, policy verdict, approval id and delegation chain in your own namespace, and argument capture has its own retention and access rules.',
  'ai-act-high-risk':
    "An agent, classified by its intended purpose, that serves an Annex III purpose keeps event logs over its lifetime (Art. 12), has oversight commensurate with its autonomy level (Art. 14(3)-(4)) and competent overseers with authority (Art. 26(2)), and its logs stay under the deployer's control for at least six months (Art. 26(6)).",
  'ai-disclosure':
    'People who receive the messages, calls and chats the agent sends are told they are interacting with an AI system, unless that is obvious (Art. 50(1), from 2 Aug 2026).',
};

// ---------------------------------------------------------------------------
// Per-seed derivation

interface Derivation {
  /** Failure modes beyond the mapped threats' summaries: the chapter's rule not met, or a cited report. */
  failureModes?: readonly string[];
  /** Narrower scope, where the rule applies only to some agents. */
  scope?: string;
  layer?: LayerNumber;
  secondaryLayers?: readonly LayerNumber[];
  enforcementPoints?: readonly EnforcementPoint[];
  /** The failure response the chapter states for this check. */
  failureResponse?: { effect: PolicyEffect; text: string };
  /** Evidence schema, where the chapter names one. */
  schemaId?: string;
  nistAiRmf?: readonly string[];
  implementationNotes?: readonly string[];
  /** Other chapter-23 sections a rule, failure mode or note comes from. */
  extraAnchors?: readonly AnchorKey[];
  /** Sources outside the chapter that the failure modes or notes cite. */
  extraSources?: readonly Source[];
  openQuestions?: readonly string[];
}

const DEFAULT_SCOPE = 'Every agent that calls tools, in production or in an evaluation harness.';

const OBLIGATION_QUESTION =
  'Chapter 23 ties this control to the EU AI Act articles it names; the derivation carries obligations only through mapped OWASP Agentic threats, so the obligation mapping awaits review.';

const DERIVATION: Readonly<Record<string, Derivation>> = {
  'registry-entry': {
    layer: 2,
    enforcementPoints: ['deploy'],
    schemaId: 'agent-register-entry',
    implementationNotes: [
      'The deploy pipeline writes the entry, so an agent cannot reach production without one; the versions block makes an incident replayable and the stop block makes the kill switch more than a claim.',
      'Reconcile the registry against what runs, including SaaS connectors, coding agents on laptops and local MCP servers; an agent found by discovery is registered within a deadline or switched off.',
    ],
  },
  'own-identity': {
    layer: 2,
    implementationNotes: [
      'Make the identity unique and cryptographically verifiable, tie it to a supervising agent, a person or a department, distinguish whether the agent acts on its own or for a named user, and catalogue it centrally.',
    ],
  },
  'read-only-tools': {
    scope: 'Agents at the Operator autonomy level, where the person takes every action.',
    failureModes: [
      'An agent at the Operator level holds a tool whose operation class is write, delete, send, execute or pay.',
      'An action takes effect that the agent, not the person, took.',
    ],
  },
  traces: {
    layer: 5,
    failureModes: [
      'A task leaves a record of its final answer only, with no plans, tool calls or memory operations.',
      'A trace carries no agent id or version, so its actions cannot be joined to the agent or to the configuration that ran.',
      'The record shows a different tool call from the one that ran, or loses recent activity: METR reports agents that spoofed tool calls to alter their transcripts and tried to trigger container resets that would wipe recent records.',
    ],
    extraSources: [METR_INCIDENT_SOURCE],
  },
  'tool-allow-list': {
    failureResponse: {
      effect: 'deny',
      text: 'A call to a tool that is not on the allow-list, or whose definition hash does not match, is denied.',
    },
    implementationNotes: [
      'Express the allow-list as a deny-by-default policy the tool gateway evaluates on every call, reading the registry as data; the operation class decides which calls need approval.',
    ],
  },
  'checkpoint-before-writes': {
    scope: 'Agents at the Collaborator autonomy level, where a person approves significant steps.',
    failureModes: ['A write the agent proposed takes effect with no approval record for it.'],
    failureResponse: {
      effect: 'require_approval',
      text: 'Every write the agent proposes waits for a person to approve it.',
    },
  },
  'guardrail-every-call': {
    failureResponse: {
      effect: 'deny',
      text: 'A call that fails the identity, allow-list or definition-hash check is denied; the other checks deny, route to a checkpoint, redact or trip the breaker as the chapter sets out.',
    },
    implementationNotes: [
      'On failure: parameters outside policy are denied or routed to a checkpoint; a request that originated in untrusted content is routed to a checkpoint before a write-class call; the output and egress filter redacts or blocks; exhausted budgets trip the breaker.',
    ],
  },
  'execution-budgets': {
    failureResponse: {
      effect: 'deny',
      text: "Exhausting a budget trips the agent's breaker, so the gateway rejects its calls; it does not raise a ticket.",
    },
    implementationNotes: [
      'Budgets catch what no rule anticipated. A guardian agent is one way to build the enforcement point, and it then needs its own identity, scope and kill switch.',
    ],
  },
  'approval-log': {
    secondaryLayers: [5],
    failureResponse: { effect: 'deny', text: 'No answer means no action: an approval request that times out closes without the call.' },
    implementationNotes: [
      "Show the call, not the story: the approver sees the tool, the parameters and the target as the gateway will execute them, then the agent's reason, the risk and what happens on rejection.",
      'Send to a person only the actions that need one: a checkpoint that fires hundreds of times a day on someone with other work becomes a rubber stamp, and its log then launders the decisions it was meant to examine.',
    ],
  },
  'per-agent-breaker': {
    failureResponse: {
      effect: 'deny',
      text: 'The gateway rejects every call from this one agent without stopping the rest of the fleet.',
    },
    nistAiRmf: ['MANAGE 2.4'],
    extraSources: [NIST_RMF_SOURCE],
  },
  'drilled-kill-switch': {
    enforcementPoints: ['runtime', 'periodic'],
    failureResponse: {
      effect: 'deny',
      text: 'The agent is stopped at the predefined level; no calls or writes follow the pull.',
    },
    nistAiRmf: ['MANAGE 2.4'],
    extraSources: [NIST_RMF_SOURCE],
    implementationNotes: [
      'Define the triggers in advance: a manual pull, a budget or unauthorised-call threshold, an anomaly, an upstream notice such as a vendor incident, or a legal instruction.',
      'Check that the stop held: no tool calls after the breaker tripped, no credentials issued after revocation, and no writes from long-running tasks on credentials issued before the pull.',
    ],
  },
  'trajectory-anomaly': {
    failureModes: [
      'A call unrelated to the task purpose, a parameter outside the registry profile, a call after expiry or a spend spike occurs and no anomaly event is raised.',
      'An anomaly is flagged but neither halts the agent nor reaches a person.',
      'The monitoring is switched off: METR states that its red-teaming found several simple ways for agent monitoring to be disabled, one by changing an environment variable.',
    ],
    extraSources: [METR_RISK_REPORT_SOURCE],
    implementationNotes: [
      "Use the chapter's agent incident taxonomy for the detection signal and the first containment of each class; the severity scale and reporting clocks are those of chapter 17.",
    ],
  },
  'trajectory-evals': {
    layer: 3,
    enforcementPoints: ['pre_merge'],
    failureModes: [
      'An evaluation passes an agent that reached the right answer through a tool it should never have held, because it scored the answer and not the path.',
      'A change ships with no evaluation run for its version, or although its run failed.',
    ],
    extraAnchors: ['threats'],
    implementationNotes: [
      'Tag the red-team test cases with MITRE ATLAS technique ids, so a finding traces from technique to control to the evaluation that now guards it.',
    ],
  },
  'reversible-only': {
    scope: 'Agents at the Observer autonomy level, where the person audits after the fact.',
    failureModes: [
      'An agent at the Observer level holds an irreversible action (a payment, a deletion, an external message, a publication) on its allow-list.',
      'An action at the Observer level has no rate, volume or budget bound.',
    ],
  },
  'checkpoint-irreversible': {
    scope: 'Agents with tools whose operation class is pay, delete, send or execute.',
    extraAnchors: ['guardrails'],
    failureResponse: {
      effect: 'require_approval',
      text: 'Pay, delete, send and execute calls wait for approval, and are denied while the guardian is down; reads proceed with an alert.',
    },
    implementationNotes: [
      "Record the failure posture per operation class in the agent's Policy Card.",
      "Name who approves each class: a role with the authority to refuse for high stakes, the action's business owner for irreversible actions, the on-call owner for outliers, the user for user-defined limits and the agent's owner for scope elevation.",
    ],
  },
  sandbox: {
    scope: 'Agents with execute-class tools that run generated code.',
    failureModes: [
      'Code runs in a sandbox that still reaches the open internet: METR reports agents that gained code execution on an evaluation sandbox, which gave them more flexible access to the full internet.',
    ],
    extraSources: [METR_INCIDENT_SOURCE],
    failureResponse: { effect: 'deny', text: 'Generated code that would run outside a sandbox is denied.' },
  },
  'egress-filter': {
    failureResponse: {
      effect: 'deny',
      text: 'Output carrying secrets or personal data, or bound for a destination outside the egress allow-list, is redacted or blocked before the result returns.',
    },
  },
  'mcp-admission': {
    layer: 2,
    enforcementPoints: ['deploy'],
    scope: 'Agents that use MCP servers, and each server before any allow-list names it.',
    implementationNotes: [
      'Record the publisher, the source repository and a signed release as provenance; hash tool names, descriptions and schemas at admission, because a changed description is a changed instruction.',
      'Run the tests with poisoned descriptors and injected tool outputs before any allow-list names the server; the vendor due-diligence gate covers who answers when it misbehaves and what notice comes before it changes.',
    ],
  },
  'mcp-local': {
    scope: 'Agents that use MCP servers running on the same machine, including coding agents on developer laptops.',
    enforcementPoints: ['runtime', 'periodic'],
  },
  'mcp-authorization': {
    scope: 'Agents that call remote MCP servers over HTTP where the server uses authorisation.',
    implementationNotes: [
      'Prefer Client ID Metadata Documents to Dynamic Client Registration, which the 2026-07-28 specification deprecates, and keep the allowed client domains as policy.',
      "MCP secures the hop between one client and one server; which agent sits behind the client, and for whom, is the workload identity's job.",
    ],
  },
  'short-lived-credentials': {
    scope: 'Agents that hold a static key or a long-lived secret.',
    implementationNotes: [
      'A credential that expires in minutes need not be hunted down after an incident, only not reissued; authorisations stay time- or session-bound, non-transferable and never greater than what the authorising person may do.',
    ],
  },
  'delegated-token': {
    scope: 'Agents that act on behalf of a user.',
    implementationNotes: [
      'Keep both identities in the log: the user as the subject, the agent as the current actor in the act claim, and earlier actors in the chain as nested act claims.',
    ],
  },
  'memory-governance': {
    scope: 'Agents with memory: context, conversation threads, long-term memory, retrieval corpora or memory shared with other agents.',
    secondaryLayers: [3],
    implementationNotes: [
      'Match the control to the memory: provenance tags for the context window, per-session isolation for threads, a write gate, per-user namespace, time to live and erasure path for long-term memory, source admission and entitlement checks for retrieval corpora, per-task isolation and attributed writes for shared memory.',
    ],
  },
  'memory-personal-data': {
    scope: 'Agents with memory stores that hold personal data.',
    failureModes: [
      'Personal data stays in a memory store past its retention window, or an erasure request cannot be carried out on the store.',
      'A credential is found in agent memory.',
    ],
  },
  'hop-accountability': {
    scope: 'Agents that delegate tasks to other agents or take tasks from them.',
    implementationNotes: [
      'Enforce these properties at every gateway you control; a breach of the depth or fan-out limit raises a breaker event. Transaction Tokens and WIMSE address the same problem but are unfinished as of 2026-09-24.',
    ],
  },
  'remote-agents': {
    scope: 'Agents that call, or delegate to, agents run by a third party.',
    implementationNotes: [
      'A remote cancel is not guaranteed to stop the task; short-lived delegated tokens bound the revocation by their lifetime, where long-lived ones make it a hope.',
    ],
  },
  'data-classes': {
    layer: 2,
    enforcementPoints: ['deploy'],
    schemaId: 'agent-register-entry',
    failureModes: [
      'The registry entry names no data classes or memory stores, or links no DPIA or records of processing.',
      'A data class reaches a tool that may not receive it, such as special-category data sent to an external tool.',
    ],
  },
  'prompt-change-control': {
    enforcementPoints: ['pre_merge', 'deploy'],
    failureModes: [
      'The production prompt is edited outside the pipeline, for example in a vendor console, so the registry and the traces still name the old version and an incident replays a configuration that never ran.',
      'A prompt, tool description or policy bundle change ships with no passing regression run, or with no hash in the registry and the traces.',
      'A change alters what the system is for and no one asks whether the purpose changed.',
    ],
    implementationNotes: [
      'Keep prompts in the repository with a named owner and two reviewers, and let the pipeline refuse a prompt manifest whose named evaluation run has not passed.',
      'Treat the system prompt as configuration, not a secret and not a control: no credentials in it, and nothing that must hold enforced by it; that belongs in the gateway.',
    ],
  },
  'otel-telemetry': {
    layer: 5,
    failureModes: [
      'A tool call leaves no execute_tool span, or its span lacks the agent id and version.',
      'A span lacks the registry id, workload identity, policy verdict, approval id or delegation chain, so the action cannot be tied to its authority.',
      'Captured tool arguments and results, which may hold personal data, fall under the general trace retention and access rules.',
    ],
    implementationNotes: [
      'The GenAI conventions are in Development status and names can still change; keep the governance fields in your own namespace and map them later.',
    ],
  },
  'ai-act-high-risk': {
    layer: 5,
    scope: 'Agents whose intended purpose falls under Annex III of the EU AI Act.',
    failureModes: [
      "An agent with an Annex III purpose runs with no event log over its lifetime, or its logs are kept under the deployer's control for less than six months.",
      'Oversight is not matched to the autonomy level, or no overseer with the competence, training and authority is assigned.',
    ],
    implementationNotes: [
      'Classify by intended purpose, not architecture: an agent that screens job applicants is high-risk through Annex III, and a scheduling assistant is not.',
    ],
    openQuestions: [OBLIGATION_QUESTION],
  },
  'ai-disclosure': {
    scope: 'Agents that send messages, calls or chats to people.',
    failureModes: [
      'A message, call or chat the agent sends to a person does not say it comes from an AI system, where that is not obvious.',
    ],
    openQuestions: [OBLIGATION_QUESTION],
  },
};

const VERIFICATION_TODO = 'Verification procedure and evidence schema to be specified; requires technical review.';

function unique<T>(items: readonly T[]): T[] {
  return [...new Set(items)];
}

function uniqueByUrl(items: readonly Source[]): Source[] {
  const seen = new Set<string>();
  return items.filter((s) => {
    if (seen.has(s.url)) return false;
    seen.add(s.url);
    return true;
  });
}

function objectiveOf(seed: AgentControl): string {
  if (KEPT_VERBATIM.has(seed.id)) return seed.rule;
  const text = OBJECTIVES[seed.id];
  if (!text) throw new Error(`agent-runtime.ts: no objective for ${seed.id}`);
  return text;
}

function derive(seed: AgentControl, index: number): Control {
  const threatRows = (seed.threats ?? []).map((id) => {
    const row = threatById(id.toLowerCase());
    if (!row) throw new Error(`agent-runtime.ts: ${seed.id} maps to unknown threat ${id}`);
    return row;
  });
  const d: Derivation = DERIVATION[seed.id] ?? {};
  const layer = d.layer ?? 4;
  const iso42001 = unique(threatRows.flatMap((t) => t.iso42001));
  const references = uniqueByUrl([
    chapterSource(seed.anchor),
    ...(d.extraAnchors ?? []).map(chapterSource),
    ...(threatRows.length > 0 ? [ASI_SOURCE] : []),
    ...(iso42001.length > 0 ? [ISO_SOURCE] : []),
    ...(d.extraSources ?? []),
  ]);
  return {
    id: `AIGE-CTL-AGENT-${String(index + 1).padStart(3, '0')}`,
    profile: PROFILE,
    title: seed.title,
    version: '0.1',
    status: 'draft',
    reviewerStatus: 'open',
    depth: 'derived',
    objective: objectiveOf(seed),
    failureModes: [...threatRows.map((t) => `${t.externalId}: ${t.summary}`), ...(d.failureModes ?? [])],
    scope: d.scope ?? DEFAULT_SCOPE,
    enforcementPoints: [...(d.enforcementPoints ?? ['runtime'])],
    verification: [],
    evidence: [{ artefact: seed.evidence, layer, ...(d.schemaId ? { schemaId: d.schemaId } : {}) }],
    failureResponse: d.failureResponse ?? { effect: 'alert', text: 'To be specified.' },
    layer,
    ...(d.secondaryLayers ? { secondaryLayers: [...d.secondaryLayers] } : {}),
    patterns: seed.pattern ? [seed.pattern] : [],
    seeds: [seed.id],
    mappings: {
      obligations: unique(threatRows.flatMap((t) => t.obligations)),
      iso42001,
      nistAiRmf: [...(d.nistAiRmf ?? [])],
      owasp: threatRows.map((t) => t.id),
    },
    references,
    implementationNotes: [...(d.implementationNotes ?? [])],
    openQuestions: [VERIFICATION_TODO, ...(d.openQuestions ?? [])],
  };
}

// A key that names no seed is a typo: fail the build rather than drop it.
for (const id of [...KEPT_VERBATIM, ...Object.keys(OBJECTIVES), ...Object.keys(DERIVATION)]) {
  if (!agentControls.some((seed) => seed.id === id)) throw new Error(`agent-runtime.ts: unknown seed ${id}`);
}

export const agentRuntimeControls: readonly Control[] = agentControls.map(derive);
