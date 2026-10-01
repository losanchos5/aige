// agent-threats.ts: the ten OWASP agentic threats as /agents shows them, each
// with the one control and the one pattern chapter 23 assigns to it. Keep in
// step with the chapter's "Threats mapped to controls" table
// (bok/23-governing-agents.md). The full catalogue row of each threat, with
// every pattern that helps and the evals, lives in ./threats.ts (taxonomy
// 'owasp-asi'); this is the chapter's assignment the /agents table and its
// flow draw (one pattern per threat, two for ASI10 Rogue Agents).

/** When the assignments were last reviewed against the chapter. */
export const AGENT_THREATS_AS_OF = '2026-09-24';

/** OWASP Top 10 for Agentic Applications 2026 (official entry names). */
export interface AgentThreat {
  id: string;
  name: string;
  control: string;
  /** Pattern titles, exactly as data/patterns.ts states them, in the
   *  chapter's order. */
  patterns: readonly string[];
}

export const agentThreats: readonly AgentThreat[] = [
  {
    id: 'ASI01',
    name: 'Agent Goal Hijack',
    control: 'Instruction provenance; checkpoints before writes; trajectory evals',
    patterns: ['Runtime Guardrail'],
  },
  {
    id: 'ASI02',
    name: 'Tool Misuse and Exploitation',
    control: 'Tool allow-list; per-tool rate, egress and budgets',
    patterns: ['Runtime Guardrail'],
  },
  {
    id: 'ASI03',
    name: 'Identity and Privilege Abuse',
    control: 'Workload identity; short-lived delegated tokens; audience checks',
    patterns: ['Agent Identity & Scoped Credentials'],
  },
  {
    id: 'ASI04',
    name: 'Agentic Supply Chain Vulnerabilities',
    control: 'MCP server admission; pinned tool definitions',
    patterns: ['AIBOM'],
  },
  {
    id: 'ASI05',
    name: 'Unexpected Code Execution (RCE)',
    control: 'Sandboxed execution; deny by default',
    patterns: ['Runtime Guardrail'],
  },
  {
    id: 'ASI06',
    name: 'Memory & Context Poisoning',
    control: 'Memory write gate; isolation; rollback',
    patterns: ['Runtime Guardrail'],
  },
  {
    id: 'ASI07',
    name: 'Insecure Inter-Agent Communication',
    control: 'Mutual authentication; signed Agent Cards; peer allow-list',
    patterns: ['Agent Identity & Scoped Credentials'],
  },
  {
    id: 'ASI08',
    name: 'Cascading Failures',
    control: 'Depth and fan-out limits; per-agent breakers',
    patterns: ['Kill Switch / Circuit Breaker'],
  },
  {
    id: 'ASI09',
    name: 'Human-Agent Trust Exploitation',
    control: 'Approvals that show the raw call; oversight metrics',
    patterns: ['Human-in-the-loop Gate'],
  },
  {
    id: 'ASI10',
    name: 'Rogue Agents',
    control: 'Registry with expiry; discovery; drilled kill switch',
    patterns: ['Agent Registry', 'Shadow-AI Discovery'],
  },
];
