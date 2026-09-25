// tool-agent-controls.ts: the data behind /toolkit/agent-control-profile. The
// reader describes one agent (autonomy, tools and MCP servers with their
// permissions, data classes, memory, external actions, identity model and
// approval points); the client derives the minimum control set of chapter 23
// (bok/23-governing-agents.md) and the agent patterns of chapter 05, an entry
// for the agent register (schema agent-register-entry.v1) and a checklist.
//
// Every control restates the chapter: the minimum controls per autonomy level
// come from its "Autonomy is a design decision" table (the alignment of the
// three scales and the control sets are the book's reading, not the authors'),
// and each conditional control from the section named in `anchor`. Pattern
// links go to /patterns/<slug>; threat ids are the chapter's (OWASP Agentic
// ASI01 to ASI10). The tool adds no control the chapter does not name.
// Mappings are illustrative, not a claim of conformity.

import { patterns } from './patterns';

export const agentChapter = '/bok/governing-agents';

/** Headings of chapter 23 the tool links to (rehype-slug ids). */
export const agentAnchors = {
  object: 'what-makes-an-agent-a-governance-object',
  autonomy: 'autonomy-is-a-design-decision',
  registry: 'the-agent-registry',
  identity: 'identity-and-short-lived-credentials',
  credentials: 'short-lived-attested-credentials',
  delegation: 'delegation-without-impersonation',
  mcpAuth: 'mcp-authorization-as-of-2026-07-28',
  allowList: 'the-tool-allow-list',
  mcpAdmission: 'admitting-an-mcp-server',
  checkpoint: 'where-to-put-a-checkpoint',
  approval: 'what-a-good-approval-looks-like',
  guardrails: 'runtime-guardrails-for-tool-calls',
  limits: 'execution-limits',
  killSwitch: 'kill-switch-and-per-agent-circuit-breakers',
  hops: 'stopping-across-hops',
  memory: 'memory-and-context-governance',
  multiAgent: 'multi-agent-systems-and-delegation-chains',
  accountability: 'accountability-across-hops',
  prompts: 'prompts-as-configuration-under-change-control',
  incidents: 'an-agent-incident-taxonomy',
  telemetry: 'telemetry-with-the-opentelemetry-genai-conventions',
  threats: 'threats-mapped-to-controls',
  euAiAct: 'eu-ai-act-hooks-for-agents',
} as const;

export type AnchorKey = keyof typeof agentAnchors;

export interface AutonomyLevel {
  id: 'operator' | 'collaborator' | 'consultant' | 'approver' | 'observer';
  /** The user's role [Feng, McDonald and Zhang], as the chapter's table names it. */
  name: string;
  /** Nearest IMDA level and ATF tier, as the chapter's table aligns them. */
  imda: string;
  atf: string;
  /** What the person does. */
  person: string;
  /** The minimum controls the chapter adds at this level (cumulative). */
  adds: readonly string[];
  /** agent-register-entry.v1 `autonomy_level` and `human_oversight.mode`: the
   *  tool's reading of the nearest schema values. */
  schemaLevel: 'suggest_only' | 'act_with_approval' | 'act_and_report' | 'act_autonomously';
  schemaMode: 'human_in_the_loop' | 'human_on_the_loop';
}

export const autonomyLevels: readonly AutonomyLevel[] = [
  {
    id: 'operator',
    name: 'Operator',
    imda: 'Agent proposes, human operates',
    atf: 'Intern',
    person: 'Takes every action',
    adds: ['registry-entry', 'own-identity', 'read-only-tools', 'traces'],
    schemaLevel: 'suggest_only',
    schemaMode: 'human_in_the_loop',
  },
  {
    id: 'collaborator',
    name: 'Collaborator',
    imda: 'Agent and human collaborate',
    atf: 'Junior',
    person: 'Approves significant steps',
    adds: ['tool-allow-list', 'checkpoint-before-writes'],
    schemaLevel: 'act_with_approval',
    schemaMode: 'human_in_the_loop',
  },
  {
    id: 'consultant',
    name: 'Consultant',
    imda: 'Between the two',
    atf: 'Junior to Senior',
    person: 'Sets goals, gives feedback',
    adds: ['guardrail-every-call', 'execution-budgets'],
    schemaLevel: 'act_and_report',
    schemaMode: 'human_on_the_loop',
  },
  {
    id: 'approver',
    name: 'Approver',
    imda: 'Agent operates, human approves',
    atf: 'Senior',
    person: 'Approves critical or irreversible steps',
    adds: ['approval-log', 'per-agent-breaker', 'drilled-kill-switch'],
    schemaLevel: 'act_with_approval',
    schemaMode: 'human_in_the_loop',
  },
  {
    id: 'observer',
    name: 'Observer',
    imda: 'Agent operates, human observes',
    atf: 'Principal',
    person: 'Audits after the fact',
    adds: ['trajectory-anomaly', 'trajectory-evals', 'reversible-only'],
    schemaLevel: 'act_autonomously',
    schemaMode: 'human_on_the_loop',
  },
];

/** Operation classes of the chapter's allow-list table; the class drives checkpoints. */
export const operationClasses = [
  { id: 'read', label: 'Read' },
  { id: 'write', label: 'Write' },
  { id: 'delete', label: 'Delete' },
  { id: 'send', label: 'Send' },
  { id: 'execute', label: 'Execute' },
  { id: 'pay', label: 'Pay' },
] as const;

/** The operation classes the chapter fails closed on and gates by default. */
export const irreversibleClasses = ['delete', 'send', 'pay', 'execute'] as const;

export const serverKinds = [
  { id: 'native', label: 'Built into the agent or its platform' },
  { id: 'mcp-remote', label: 'Remote MCP server (HTTP)' },
  { id: 'mcp-local', label: 'Local MCP server (runs on the same machine)' },
  { id: 'api', label: 'Direct API call' },
] as const;

export const dataClassOptions = [
  { id: 'public', label: 'Public' },
  { id: 'internal', label: 'Internal' },
  { id: 'confidential', label: 'Confidential' },
  { id: 'restricted', label: 'Restricted' },
] as const;

export const identityModels = [
  { id: 'workload', label: 'Its own workload identity with short-lived credentials (for example a SPIFFE ID)' },
  { id: 'delegated', label: "A delegated token that names both the user and the agent (token exchange)" },
  { id: 'service-account', label: 'A service account with a long-lived secret' },
  { id: 'static-key', label: 'A static API key in its configuration' },
  { id: 'user-token', label: "The user's own token, passed through" },
] as const;

export const memoryOptions = [
  { id: 'session', label: 'Conversation thread for one session only' },
  { id: 'long-term', label: 'Long-term memory across sessions or users' },
  { id: 'corpus', label: 'A retrieval corpus it reads from' },
  { id: 'shared', label: 'Memory shared with other agents' },
] as const;

export const externalActions = [
  { id: 'messages', label: 'Sends messages, emails or calls to people' },
  { id: 'payments', label: 'Makes or approves payments' },
  { id: 'publishes', label: 'Publishes content' },
  { id: 'deletes', label: 'Deletes records' },
  { id: 'code', label: 'Runs generated code' },
] as const;

export const checkpointClasses = [
  { id: 'high-stakes', label: 'High stakes: a final decision about a person; an edit to a sensitive record' },
  { id: 'irreversible', label: 'Irreversible: a payment, a deletion, an external message, a publication' },
  { id: 'outlier', label: 'Outlier: access outside the usual scope; an unusually long plan' },
  { id: 'user-defined', label: "User-defined: for example a purchase above the user's own limit" },
  { id: 'scope-elevation', label: 'Scope elevation: a step-up request for a new scope' },
] as const;

export interface AgentControl {
  id: string;
  title: string;
  /** The rule, restated from the chapter. */
  rule: string;
  /** Evidence the control leaves. */
  evidence: string;
  /** Section of chapter 23. */
  anchor: AnchorKey;
  /** /patterns/<slug>, where the chapter names one. */
  pattern?: string;
  /** OWASP Agentic ids the chapter maps the control to. */
  threats?: readonly string[];
}

export const agentControls: readonly AgentControl[] = [
  // ---- The autonomy table's minimum controls ----------------------------------------
  {
    id: 'registry-entry',
    title: 'Registry entry',
    rule: 'Register the agent before production, written by the pipeline: identity, owner, purpose, autonomy level, tools and scopes, data classes and memory stores, delegation rights, versions, checkpoints, stop handles, expiry, regulatory role and class.',
    evidence: 'The entry, and every log line that joins to it',
    anchor: 'registry',
    pattern: 'agent-registry',
    threats: ['ASI10'],
  },
  {
    id: 'own-identity',
    title: 'Its own identity',
    rule: 'Give the agent a unique, attributable workload identity under which its actions are logged and its access revoked; channel authentication is not agent identity.',
    evidence: 'Identity in every trace; revocation record',
    anchor: 'identity',
    pattern: 'agent-identity-scoped-credentials',
    threats: ['ASI03'],
  },
  {
    id: 'read-only-tools',
    title: 'Read-only tools',
    rule: 'At the Operator level the person takes every action, so the agent holds read-only tools.',
    evidence: 'Allow-list with read operations only',
    anchor: 'autonomy',
  },
  {
    id: 'traces',
    title: 'Traces',
    rule: 'Trace the trajectory, not only the answer: plans, tool calls and memory operations, each with the agent id and version.',
    evidence: 'Trace per task',
    anchor: 'telemetry',
  },
  {
    id: 'tool-allow-list',
    title: 'Tool allow-list, deny by default',
    rule: 'Grant tools on an allow-list evaluated at the gateway on every call: tool identity with a pinned definition hash, operation class, resource scope, rate and volume, egress, data classes and checkpoint.',
    evidence: 'Allow-list as policy; guardrail configuration diffs',
    anchor: 'allowList',
    pattern: 'runtime-guardrail',
    threats: ['ASI02'],
  },
  {
    id: 'checkpoint-before-writes',
    title: 'Checkpoint before every write',
    rule: 'At the Collaborator level a person approves every write the agent proposes.',
    evidence: 'Approval record per write',
    anchor: 'checkpoint',
    pattern: 'human-in-the-loop-gate',
  },
  {
    id: 'guardrail-every-call',
    title: 'Runtime guardrail on every tool call',
    rule: 'Intercept between the decision to call a tool and the call: identity matches a live registry entry, tool and definition hash on the allow-list, parameters within policy, instruction provenance before write-class calls, output and egress filter, execution budgets.',
    evidence: 'Policy verdict per call',
    anchor: 'guardrails',
    pattern: 'runtime-guardrail',
    threats: ['ASI01', 'ASI02'],
  },
  {
    id: 'execution-budgets',
    title: 'Execution budgets',
    rule: 'Put step, call, token, spend and time budgets in the registry entry, enforce them at the gateway, and make exhaustion trip the breaker rather than raise a ticket.',
    evidence: 'Budget configuration; breaker events',
    anchor: 'limits',
    pattern: 'runtime-guardrail',
    threats: ['ASI08'],
  },
  {
    id: 'approval-log',
    title: 'Approval log, bound to the call',
    rule: 'The gate lives outside the model; the approver sees the raw call first; an approval is single-use and bound to a hash of the parameters; no answer means no action; approval rate, time to decide and override rate are measured.',
    evidence: 'Approval log with parameter hashes; oversight metrics',
    anchor: 'approval',
    pattern: 'human-in-the-loop-gate',
    threats: ['ASI09'],
  },
  {
    id: 'per-agent-breaker',
    title: 'Per-agent circuit breaker',
    rule: 'The gateway can reject every call from this one agent without stopping the rest of the fleet.',
    evidence: 'Breaker events',
    anchor: 'killSwitch',
    pattern: 'kill-switch-circuit-breaker',
    threats: ['ASI08', 'ASI10'],
  },
  {
    id: 'drilled-kill-switch',
    title: 'Drilled kill switch',
    rule: 'Define the stop levels (pause a task, narrow the scope, trip the breaker, revoke the identity, stop a class, degrade) and their triggers in advance; drill on a schedule, measure time to stop and check that the stop held.',
    evidence: 'Drill record: time to stop; no calls or writes after the pull',
    anchor: 'killSwitch',
    pattern: 'kill-switch-circuit-breaker',
    threats: ['ASI10'],
  },
  {
    id: 'trajectory-anomaly',
    title: 'Trajectory anomaly detection',
    rule: 'Monitor behaviour as it unfolds and flag, halt or escalate on anomalies: calls unrelated to the purpose, parameters outside the profile, calls after expiry, spend spikes.',
    evidence: 'Anomaly events and decisions',
    anchor: 'incidents',
  },
  {
    id: 'trajectory-evals',
    title: 'Independent trajectory evals',
    rule: 'Evaluate the path as well as the answer, including task success, injection resistance and trajectory checks, and let a failure block the change.',
    evidence: 'Eval runs per version',
    anchor: 'object',
    pattern: 'eval-gate-in-ci',
  },
  {
    id: 'reversible-only',
    title: 'Reversible, bounded actions only',
    rule: 'At the Observer level the person audits after the fact, so the agent keeps only reversible, bounded actions.',
    evidence: 'Allow-list without irreversible operation classes',
    anchor: 'autonomy',
  },
  // ---- Controls triggered by what the agent can do -----------------------------------
  {
    id: 'checkpoint-irreversible',
    title: 'Checkpoints on irreversible actions, failing closed',
    rule: 'Gate pay, delete, send and execute calls by consequence (high stakes, irreversible, outlier, user-defined, scope elevation) and fail closed for them when the guardian is down; fail open with an alert only for reads.',
    evidence: 'Checkpoint configuration; failure posture in the Policy Card',
    anchor: 'checkpoint',
    pattern: 'human-in-the-loop-gate',
    threats: ['ASI02', 'ASI09'],
  },
  {
    id: 'sandbox',
    title: 'Code runs only in a sandbox',
    rule: 'Execute-class tools run generated code only in a sandbox; anything else is denied.',
    evidence: 'Sandbox policy; violation events',
    anchor: 'guardrails',
    pattern: 'runtime-guardrail',
    threats: ['ASI05'],
  },
  {
    id: 'egress-filter',
    title: 'Output and egress filter',
    rule: 'Filter what leaves after each call (secrets, personal data, destinations), and give every tool, including the ones nobody worries about, a rate and an egress bound.',
    evidence: 'Egress allow-list; redact and block events',
    anchor: 'allowList',
    pattern: 'runtime-guardrail',
    threats: ['ASI02'],
  },
  {
    id: 'mcp-admission',
    title: 'MCP server admission gate',
    rule: 'Admit each server as a supplier: provenance recorded in the AIBOM, tool definitions hashed and pinned with an alert on change, authorisation conformance, testing with poisoned descriptors and injected outputs, an owner and a review date.',
    evidence: 'Admission record per server; definition hashes',
    anchor: 'mcpAdmission',
    pattern: 'aibom',
    threats: ['ASI04'],
  },
  {
    id: 'mcp-local',
    title: 'Local MCP servers sandboxed',
    rule: 'Show the exact install command and get explicit approval before a one-click local server install; run local servers sandboxed with minimal privileges, and reconcile them in discovery sweeps.',
    evidence: 'Install approvals; discovery findings',
    anchor: 'mcpAdmission',
    pattern: 'shadow-ai-discovery',
    threats: ['ASI04', 'ASI10'],
  },
  {
    id: 'mcp-authorization',
    title: 'MCP authorisation (spec 2026-07-28)',
    rule: 'Where a remote server uses authorisation: protected-resource metadata for discovery, the resource parameter on token requests, audience validation with no token passthrough, issuer validation, step-up scopes instead of omnibus ones; record the MCP version each server speaks.',
    evidence: 'Token requests naming the resource; audience-check alerts; MCP version in the registry',
    anchor: 'mcpAuth',
    pattern: 'agent-identity-scoped-credentials',
    threats: ['ASI03'],
  },
  {
    id: 'short-lived-credentials',
    title: 'Replace long-lived secrets with short-lived credentials',
    rule: 'Move the agent from a static key or long-lived secret to short-lived, attested credentials that expire in minutes and are revoked at the end of the task.',
    evidence: 'Credential lifetime in the registry; no secrets in configuration',
    anchor: 'credentials',
    pattern: 'agent-identity-scoped-credentials',
    threats: ['ASI03'],
  },
  {
    id: 'delegated-token',
    title: 'Delegation, never impersonation',
    rule: "Exchange the user's token for a delegated one that names the agent, with a narrower scope and a short expiry; never hand the agent the user's own token.",
    evidence: 'Delegated tokens with an act claim; token-exchange log',
    anchor: 'delegation',
    pattern: 'agent-identity-scoped-credentials',
    threats: ['ASI03'],
  },
  {
    id: 'memory-governance',
    title: 'Memory write gate and rollback',
    rule: 'Writes are events that carry their source; untrusted content cannot write to long-term memory without a gate; memory is isolated per user and per task; retention is code; memory can be rolled back to a known-good snapshot.',
    evidence: 'Memory write events with provenance; retention jobs; rollback drills',
    anchor: 'memory',
    pattern: 'runtime-guardrail',
    threats: ['ASI06'],
  },
  {
    id: 'memory-personal-data',
    title: 'Retention and erasure for personal data in memory',
    rule: "A memory store holding personal data is subject to the GDPR's minimisation and storage-limitation principles and to the right to erasure: retention windows and an erasure path, with no credentials in memory.",
    evidence: 'Retention schedule per memory class; erasure records',
    anchor: 'memory',
  },
  {
    id: 'hop-accountability',
    title: 'Accountability across hops',
    rule: 'Every task carries its originating principal; each agent authenticates as itself; scope narrows or stays equal at each hop; the purpose travels and is checked; depth and fan-out are limited; one trace runs end to end; only registered peers with verified, signed cards are called.',
    evidence: 'Delegation record; nested act claims; peer allow-list; trace ids',
    anchor: 'accountability',
    pattern: 'agent-identity-scoped-credentials',
    threats: ['ASI07', 'ASI08'],
  },
  {
    id: 'remote-agents',
    title: 'Stopping third-party agents at your boundary',
    rule: "You cannot stop someone else's agent: stop your agents from calling it, revoke what you issued to it, and name in a contract who answers for it.",
    evidence: 'Peer allow-list; revocation records; clause reference in the registry',
    anchor: 'hops',
    pattern: 'kill-switch-circuit-breaker',
    threats: ['ASI07'],
  },
  {
    id: 'data-classes',
    title: 'Data classes recorded, with the DPIA linked',
    rule: "Record the data classes and memory stores in the registry entry, link the DPIA and the records of processing, and state per tool which data classes may flow in and out (the chapter's example: no special-category data to external tools).",
    evidence: 'Registry fields; DPIA and records-of-processing links',
    anchor: 'registry',
    pattern: 'agent-registry',
  },
  {
    id: 'prompt-change-control',
    title: 'Prompts under change control',
    rule: 'Version and own the system prompt, tool descriptions and policy bundle; hash them in the registry and every trace; gate every change on the regression suite; canary and keep the previous hash ready; ask whether the purpose changed.',
    evidence: 'Prompt manifest; eval run per change; rollout record',
    anchor: 'prompts',
    pattern: 'eval-gate-in-ci',
  },
  {
    id: 'otel-telemetry',
    title: 'Telemetry on the OpenTelemetry GenAI conventions',
    rule: 'Emit agent and tool spans (execute_tool, gen_ai.agent.id, gen_ai.agent.version) and add registry id, workload identity, policy verdict, approval id and delegation chain in your own namespace; give argument capture its own retention and access rules.',
    evidence: 'Spans per call; the fields in your namespace',
    anchor: 'telemetry',
  },
  {
    id: 'ai-act-high-risk',
    title: 'EU AI Act hooks for a high-risk purpose',
    rule: 'An agent is classified by its intended purpose: for an Annex III purpose, keep event logs over the lifetime (Art. 12), design oversight commensurate with the autonomy level (Art. 14(3)-(4)), assign competent overseers with authority (Art. 26(2)) and keep the logs under your control at least six months (Art. 26(6)).',
    evidence: 'Traces; checkpoints and raw-call approvals; approver roster; log retention',
    anchor: 'euAiAct',
  },
  {
    id: 'ai-disclosure',
    title: 'Tell people they are dealing with an AI system',
    rule: 'People are told they are interacting with an AI system unless that is obvious (Art. 50(1), from 2 Aug 2026): put the disclosure in the messages, calls and chats the agent sends.',
    evidence: 'Disclosure text in message templates',
    anchor: 'euAiAct',
  },
];

/** The chapter's agent incident taxonomy: what to drill, by what the agent can do. */
export const agentIncidentClasses = [
  { id: 'goal-hijack', name: 'Goal hijack', signal: "Tool calls unrelated to the task's purpose", containment: 'Pause the task; quarantine the source', threat: 'ASI01' },
  { id: 'tool-misuse', name: 'Tool misuse', signal: 'Parameters outside the registry profile', containment: 'Narrow the scope; trip the breaker', threat: 'ASI02' },
  { id: 'privilege-abuse', name: 'Privilege abuse', signal: 'Audience or scope failures', containment: 'Revoke the identity', threat: 'ASI03' },
  { id: 'supply-chain', name: 'Supply-chain compromise', signal: 'Definition-hash mismatch', containment: 'Remove the server from allow-lists', threat: 'ASI04' },
  { id: 'code-execution', name: 'Unexpected code execution', signal: 'Sandbox violation', containment: 'Kill the process; revoke', threat: 'ASI05' },
  { id: 'memory-poisoning', name: 'Memory poisoning', signal: 'Memory writes from untrusted sources', containment: 'Freeze and roll back the store', threat: 'ASI06' },
  { id: 'inter-agent-spoofing', name: 'Inter-agent spoofing', signal: 'Unknown identity; unsigned card', containment: 'Block the peer', threat: 'ASI07' },
  { id: 'cascade', name: 'Cascade', signal: 'Correlated failures', containment: 'Break the chain at the shared component', threat: 'ASI08' },
  { id: 'trust-exploitation', name: 'Trust exploitation', signal: 'Mismatch between summary and call', containment: 'Show raw calls; review past approvals', threat: 'ASI09' },
  { id: 'runaway', name: 'Runaway or rogue', signal: 'Calls after expiry; spend spike', containment: 'Revoke; verify the stop held', threat: 'ASI10' },
  { id: 'exfiltration', name: 'Exfiltration through a tool', signal: 'Egress to an unknown destination', containment: 'Block egress; trip the breaker', threat: 'ASI02' },
] as const;

/** Everything the client needs. `anchorTitles` maps each anchor key to its
 *  heading text in chapter 23 (the page reads them from the chapter and fails
 *  the build on a missing one). */
export function agentControlsData(
  siteUrl: string,
  notice: string,
  license: string,
  anchorTitles: Record<AnchorKey, string>,
) {
  const patternTitles: Record<string, string> = {};
  for (const control of agentControls) {
    if (!control.pattern) continue;
    const pattern = patterns.find((entry) => entry.slug === control.pattern);
    if (!pattern) throw new Error(`tool-agent-controls: unknown pattern ${control.pattern}`);
    patternTitles[control.pattern] = pattern.title;
  }
  for (const level of autonomyLevels) {
    for (const id of level.adds) {
      if (!agentControls.some((control) => control.id === id)) {
        throw new Error(`tool-agent-controls: level ${level.id} adds unknown control ${id}`);
      }
    }
  }
  return {
    version: 1,
    notice,
    license,
    siteUrl,
    page: `${siteUrl}/toolkit/agent-control-profile`,
    chapter: `${siteUrl}${agentChapter}`,
    chapterPath: agentChapter,
    schema: `${siteUrl}/schemas/agent-register-entry.v1.json`,
    anchors: agentAnchors,
    anchorTitles,
    patternTitles,
    autonomy: autonomyLevels,
    controls: agentControls,
    checkpoints: checkpointClasses,
    incidents: agentIncidentClasses,
  };
}
