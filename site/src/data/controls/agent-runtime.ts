// controls/agent-runtime.ts: the Agent Runtime Control Profile, v0.1 (draft).
// Thirty-one reference controls, AIGE-CTL-AGENT-001 to 031, one per agent
// control of chapter 23 (bok/23-governing-agents.md) as ../tool-agent-controls.ts
// restates them, in the same order. Each record is derived mechanically and
// adds nothing the chapter does not say:
//
//   rule      -> objective (verbatim)
//   evidence  -> evidence[0].artefact, on the layer below
//   pattern   -> patterns
//   threats   -> mappings.owasp (the OWASP Agentic rows of ../threats.ts, lower
//                case), failureModes (those rows' summaries) and
//                mappings.obligations (only the obligations ../threats.ts
//                already links to those rows)
//   anchor    -> references (the chapter-23 section, plus the OWASP Agentic
//                source when the control maps to a threat)
//
// Layer: 4 (runtime), except registry and identity seeds (2), trajectory evals
// (3) and telemetry and evidence seeds (5). Enforcement point: runtime, except
// the registry entry, prompt change control and MCP admission (deploy) and
// trajectory evals (pre_merge). Failure response: an alert, to be specified,
// except the per-agent breaker and the kill switch (deny). No verification
// procedure yet: every control is a draft that needs technical review, and
// says so in its open questions.
//
// Draft control specifications, open for technical review; illustrative, not a
// claim of conformity, not legal advice. Types and rules: ./index.ts.
import type { Control, ControlProfile } from './index';
import type { LayerNumber } from '../stack';
import type { EnforcementPoint } from '../policy-card';
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
    'Reference controls for AI agents at runtime, derived from the 31 agent controls of chapter 23; every control is a draft that restates the chapter and awaits technical review.',
  scope:
    'Agents that act through tools, memory and delegated authority in production, from registration to retirement. The environment an agent is evaluated in is covered by the evaluation environment profile.',
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

/** Layer per seed, where it is not 4 (runtime). */
const LAYER_BY_SEED: Readonly<Record<string, LayerNumber>> = {
  'registry-entry': 2,
  'own-identity': 2,
  'data-classes': 2,
  'trajectory-evals': 3,
  traces: 5,
  'otel-telemetry': 5,
  'ai-act-high-risk': 5,
};

/** Enforcement point per seed, where it is not runtime. */
const ENFORCEMENT_BY_SEED: Readonly<Record<string, EnforcementPoint>> = {
  'registry-entry': 'deploy',
  'prompt-change-control': 'deploy',
  'mcp-admission': 'deploy',
  'trajectory-evals': 'pre_merge',
};

/** Failure responses the chapter states: the breaker and the kill switch deny. */
const DENY_BY_SEED: Readonly<Record<string, string>> = {
  'per-agent-breaker': 'The gateway rejects every call from this one agent without stopping the rest of the fleet.',
  'drilled-kill-switch': 'The agent is stopped at the predefined level; no calls or writes follow the pull.',
};

/** Schema of the record the evidence is written in, where the chapter names one. */
const SCHEMA_BY_SEED: Readonly<Record<string, string>> = {
  'registry-entry': 'agent-register-entry',
  'data-classes': 'agent-register-entry',
};

const VERIFICATION_TODO = 'Verification procedure and evidence schema to be specified; requires technical review.';
const FAILURE_TODO =
  'TODO: failure mode to be specified. Chapter 23 maps this control to no OWASP Agentic threat, so no failure mode is derived.';

const ASI_SOURCE: Source = threatSources[SRC.asi - 1];

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

function unique<T>(items: readonly T[]): T[] {
  return [...new Set(items)];
}

function derive(seed: AgentControl, index: number): Control {
  const threatRows = (seed.threats ?? []).map((id) => {
    const row = threatById(id.toLowerCase());
    if (!row) throw new Error(`agent-runtime.ts: ${seed.id} maps to unknown threat ${id}`);
    return row;
  });
  const layer = LAYER_BY_SEED[seed.id] ?? 4;
  const deny = DENY_BY_SEED[seed.id];
  const schemaId = SCHEMA_BY_SEED[seed.id];
  return {
    id: `AIGE-CTL-AGENT-${String(index + 1).padStart(3, '0')}`,
    profile: PROFILE,
    title: seed.title,
    version: '0.1',
    status: 'draft',
    reviewerStatus: 'open',
    depth: 'derived',
    objective: seed.rule,
    failureModes: threatRows.map((t) => `${t.externalId}: ${t.summary}`),
    scope: `Agents that act through tools in production, as chapter 23 describes them in "${anchorHeadings[seed.anchor]}".`,
    enforcementPoints: [ENFORCEMENT_BY_SEED[seed.id] ?? 'runtime'],
    verification: [],
    evidence: [{ artefact: seed.evidence, layer, ...(schemaId ? { schemaId } : {}) }],
    failureResponse: deny ? { effect: 'deny', text: deny } : { effect: 'alert', text: 'To be specified.' },
    layer,
    patterns: seed.pattern ? [seed.pattern] : [],
    seeds: [seed.id],
    mappings: {
      obligations: unique(threatRows.flatMap((t) => t.obligations)),
      iso42001: [],
      nistAiRmf: [],
      owasp: threatRows.map((t) => t.id),
    },
    references: threatRows.length > 0 ? [chapterSource(seed.anchor), ASI_SOURCE] : [chapterSource(seed.anchor)],
    implementationNotes: [],
    openQuestions: threatRows.length > 0 ? [VERIFICATION_TODO] : [VERIFICATION_TODO, FAILURE_TODO],
  };
}

export const agentRuntimeControls: readonly Control[] = agentControls.map(derive);
