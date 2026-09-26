// frontier.ts: the copy, link lists and numbered sources of /frontier (Frontier
// labs & evaluators), the audience route that shows where the controls,
// patterns and evidence formats of this site apply to frontier AI evaluation,
// runtime safeguards, assurance and incidents (OpenSpec change
// open-reference-project, block orp-frontier). src/pages/frontier.astro renders
// it; tests/frontier.spec.ts checks the page against it.
//
// Rules frontierProblems() enforces (the page throws on any):
// - every [n] marker in a paragraph has a source and every source is cited;
// - no em dash anywhere in the copy;
// - no lab is named in the copy: METR's investigation is described by what
//   it reports, and developers appear only in the source list (the title of the
//   investigation, and as publishers of the guidance cited in #ecosystem).
//
// Sources were opened on 2026-09-26. The EU AI Act, OWASP Agentic, MCP
// Authorization, NIST AI RMF, OpenTelemetry GenAI, the GPAI Code of Practice
// and ISO rows are copied from src/data/audiences.ts and the chapter 23 and
// pillar rows of sources/SOURCES.md. METR pages are cited for what METR
// states, never as audited fact, and nothing here implies that METR, AIUC, an
// AI Safety Institute or any developer endorses or works with this site. The
// two developer posts in #ecosystem ([14], [15]) are cited for the terms they
// use, as convergent terminology the profiles cross-reference.

import type { LayerNumber } from './stack';
import type { Source } from '../lib/sources';

export interface FrontierLink {
  title: string;
  description: string;
  href: string;
  layer?: LayerNumber;
}

export interface FrontierBlock {
  id: string;
  title: string;
  lede?: string;
  /** Prose with [n] markers into `frontierSources`. */
  paragraphs: readonly string[];
  links: readonly FrontierLink[];
}

export interface FrontierChainStep {
  label: string;
  sub: string;
  href: string;
  layer?: LayerNumber;
}

const CH23 = '/bok/governing-agents';

// ---------------------------------------------------------------------------
// Sources, in order of first citation on the page.

export const frontierSources: readonly Source[] = [
  {
    title: 'Regulation (EU) 2024/1689 (Artificial Intelligence Act), consolidated text of 27 July 2026',
    gloss: 'Art. 53 obligations of providers of general-purpose AI models; Art. 55 model evaluation and adversarial testing for models with systemic risk',
    publisher: 'Publications Office of the EU (EUR-Lex)',
    date: '2026-07-27',
    url: 'https://eur-lex.europa.eu/eli/reg/2024/1689/2026-07-27/eng',
    verified: 'primary',
  },
  {
    title: 'GPAI Code of Practice, Safety and Security chapter',
    gloss: 'Appendix 1.3 capabilities to operate autonomously and to use tools; affordances such as access to tools and the level of human oversight',
    publisher: 'European Commission',
    date: '2025-07-10',
    url: 'https://ec.europa.eu/newsroom/dae/redirection/document/118119',
    verified: 'primary',
  },
  {
    title: 'METR Task Standard, version 0.5.0',
    gloss: 'task machines "MUST NOT have internet access" except to a small set of destinations, unless the task declares full_internet; STANDARD.md last changed 2024-10-30',
    publisher: 'METR',
    date: '2024-10-30',
    url: 'https://raw.githubusercontent.com/METR/task-standard/main/STANDARD.md',
    verified: 'primary',
  },
  {
    title: 'Guidelines for capability elicitation',
    gloss: 'task bugs such as incorrect automatic scoring or a crashed environment treated as spurious failures, fixed before results are reported',
    publisher: 'METR',
    date: '2024-03-15',
    url: 'https://metr.org/blog/2024-03-15-guidelines-for-capability-elicitation/',
    verified: 'primary',
  },
  {
    title: 'OWASP Top 10 for Agentic Applications 2026',
    gloss: 'ASI01 to ASI10, from agent goal hijack to rogue agents',
    publisher: 'OWASP GenAI Security Project',
    date: '2025-12-09',
    url: 'https://genai.owasp.org/resource/owasp-top-10-for-agentic-applications-for-2026/',
    verified: 'primary',
  },
  {
    title: 'MCP specification 2026-07-28, Authorization',
    gloss: 'OAuth 2.1 resource server; audience validation; servers "MUST NOT accept or transit any other tokens"',
    publisher: 'Model Context Protocol',
    date: '2026-07-28',
    url: 'https://modelcontextprotocol.io/specification/2026-07-28/basic/authorization',
    verified: 'primary',
  },
  {
    title:
      "Brief independent investigation of agents' behavior, reasoning and collaboration in the OpenAI / Hugging Face hacking incident",
    gloss: 'by Hjalmar Wijk and Ajeya Cotra (METR) and Ryan Greenblatt (Redwood Research, contracting with METR): agents "meant to be fully isolated from one another"; spoofed tool calls in at least 96 transcripts; gaps from container resets',
    publisher: 'METR',
    date: '2026-08-26',
    url: 'https://metr.org/blog/2026-08-26-openai-hugging-face-incident-investigation/',
    verified: 'primary',
  },
  {
    title: 'NIST AI RMF 1.0 (AI 100-1)',
    gloss: 'MANAGE 2.4: mechanisms to supersede, disengage or deactivate AI systems',
    publisher: 'NIST',
    date: '2023-01-26',
    url: 'https://nvlpubs.nist.gov/nistpubs/ai/NIST.AI.100-1.pdf',
    verified: 'primary',
  },
  {
    title: 'OpenTelemetry semantic conventions for generative AI',
    gloss: 'agent, workflow, execute_tool and memory operations; status Development',
    publisher: 'OpenTelemetry',
    date: '2026',
    url: 'https://github.com/open-telemetry/semantic-conventions-genai/tree/main/docs/gen-ai',
    verified: 'primary',
  },
  {
    title: 'AIUC-1 standard',
    gloss: 'requirements A001 to F002 in six domains, two marked retired; most recent version released 15 Jul 2026',
    publisher: 'Artificial Intelligence Underwriting Company',
    date: '2026-07-15',
    url: 'https://standard.aiuc-1.com/',
    verified: 'primary',
  },
  {
    title: 'Accredited AIUC-1 auditors',
    gloss: 'certificates issued centrally; accredited auditors prepare the audit report',
    publisher: 'Artificial Intelligence Underwriting Company',
    date: '2026',
    url: 'https://standard.aiuc-1.com/accredited-auditors',
    verified: 'primary',
  },
  {
    title: 'ISO/IEC 42001:2023, AI management systems',
    gloss: 'referenced by identifier only; requirements for an AI management system',
    publisher: 'ISO/IEC',
    date: '2023',
    url: 'https://www.iso.org/standard/81230.html',
    verified: 'secondary',
  },
  {
    title: 'ISO/IEC 42006:2025, Requirements for bodies providing audit and certification of AI management systems',
    gloss: 'builds on ISO/IEC 17021-1',
    publisher: 'ISO/IEC',
    date: '2025-07',
    url: 'https://www.iso.org/standard/44546.html',
    verified: 'primary',
  },
  {
    title: 'Third-party cyber evaluations involving OpenAI models',
    gloss: 'the evaluator's "intended authorization boundary"; OpenAI will review how to "set expectations for isolation, credential handling, monitoring, and stop conditions"',
    publisher: 'OpenAI',
    date: '2026-08-04',
    url: 'https://openai.com/index/third-party-cyber-evaluations-involving-openai-models/',
    verified: 'primary',
  },
  {
    title: 'Improving our alignment and security efforts',
    gloss: 'best practices for external evaluation partners: sandbox and network isolation, API keys kept outside the environment, configuration verified before every evaluation, challenges confirmed solvable, explicit scope, real-time monitoring that ends an out-of-scope run',
    publisher: 'Anthropic',
    date: '2026-08-31',
    url: 'https://www.anthropic.com/news/improving-alignment-security-efforts',
    verified: 'primary',
  },
];

// ---------------------------------------------------------------------------
// Hero and #who.

export const frontierHero = {
  title: 'Engineering assurance for frontier AI',
  lede: 'For the teams that evaluate, deploy and assure frontier systems: where the controls, patterns and evidence formats on this site apply to that work, and where the open questions are.',
} as const;

/** The opening of the route, as the proposal words it. */
export const frontierOpening: readonly string[] = [
  'Frontier AI systems no longer act only through prompts and responses. They use tools, credentials, networks, external services and delegated authority. The environment around the model is therefore part of the system being governed.',
  'This route is for the engineers who build and run that environment and for the people who have to vouch for what it recorded: the evaluation harness, the sandbox and its egress, the credentials an agent holds, the stop handles, the telemetry and the evidence an assessor reads afterwards. Frontier work is one domain where AI governance engineering applies, not a separate discipline.',
];

export const frontierNot =
  'It does not tell a lab how to do safety research, which capabilities to test for or where to set a threshold. It covers the engineering around those decisions: what the environment must enforce, what it must record and how the record becomes evidence.';

export const frontierRoles: readonly string[] = [
  'Evaluation and red-team engineers',
  'Safety case and assurance teams',
  'Agent platform and infrastructure engineers',
  'Third-party evaluators and auditors',
];

/** The seven-step chain drawn in #who. */
export const frontierChain: readonly FrontierChainStep[] = [
  { label: 'Model / agent', sub: 'The system under evaluation', href: '#who' },
  { label: 'Harness & tools', sub: 'What it can call', href: `${CH23}#the-tool-allow-list`, layer: 4 },
  { label: 'Authorization', sub: 'Whose authority it holds', href: `${CH23}#identity-and-short-lived-credentials`, layer: 4 },
  { label: 'Runtime controls', sub: 'Limits and stop handles', href: '#runtime-safeguards', layer: 4 },
  { label: 'Monitoring', sub: 'Traces of every step', href: `${CH23}#telemetry-with-the-opentelemetry-genai-conventions`, layer: 4 },
  { label: 'Evidence', sub: 'Records a machine can check', href: '/patterns/machine-readable-evidence-oscal', layer: 5 },
  { label: 'Assurance', sub: 'What a reviewer relies on', href: '#assurance', layer: 5 },
];

// ---------------------------------------------------------------------------
// The four application sections and the ecosystem note.

export const frontierBlocks: readonly FrontierBlock[] = [
  {
    id: 'evaluation-environments',
    title: 'Evaluation environments',
    lede: 'An evaluation result is only as good as the environment that produced it.',
    paragraphs: [
      'The EU AI Act asks every provider of a general-purpose AI model to keep technical documentation of it (Art. 53) and, for models with systemic risk, to evaluate them, including conducting and documenting adversarial testing (Art. 55) [1]. The GPAI Code of Practice lists the capability to use tools, and affordances such as access to tools and the level of human oversight, among the model characteristics that bear on systemic risk [2]. Neither says what the environment around the model must enforce while it is being tested.',
      "Public evaluation practice gives a starting point. METR's Task Standard (v0.5.0) states that, unless a task declares the full_internet permission, the task machines \"MUST NOT have internet access\" except to a small set of destinations such as an LLM API proxy [3]. METR's Guidelines for Capability Elicitation treat task bugs, such as incorrect automatic scoring or a crashed environment, as spurious failures to be fixed before a result is reported [4]. The evaluation environment profile turns such practices into numbered draft controls: egress, credentials, isolation, stop conditions and the run record, each with the point where it is enforced; three of them are specified in full, with a verification procedure and the evidence they leave.",
    ],
    links: [
      { title: 'Evaluation environment control profile', description: 'AIGE-CTL-EVAL-001 to 009, draft v0.1, open for technical review.', href: '/controls/evaluation-environment', layer: 3 },
      { title: 'Eval gate in CI', description: 'Pattern: a model or agent ships only above a documented threshold; the run is the evidence.', href: '/patterns/eval-gate-in-ci', layer: 3 },
      { title: 'Adversarial red-team suite', description: 'Pattern: a versioned suite built from a threat taxonomy, run in CI or on a schedule.', href: '/patterns/adversarial-red-team-suite', layer: 3 },
      { title: 'Layer 03: evals and red teaming as evidence', description: 'Chapter 04 on what an evaluation must record to count as evidence.', href: '/bok/the-stack#layer-03-evals--red-teaming-as-evidence', layer: 3 },
      { title: 'Threats mapped to controls', description: 'OWASP LLM and Agentic, and MITRE ATLAS, each tied to patterns and evals.', href: '/resources/threats' },
    ],
  },
  {
    id: 'runtime-safeguards',
    title: 'Runtime safeguards',
    lede: 'The same controls hold whether the agent is under evaluation or in production.',
    paragraphs: [
      'The OWASP Top 10 for Agentic Applications sets out the failure classes an agent platform has to hold against, from goal hijack to rogue agents [5]. For tool servers, the MCP authorization specification makes the server validate the audience of each token and forbids passing a token through to another service [6]. Chapter 23 turns both into rules: a unique identity per agent, short-lived credentials, a tool allow-list, execution limits and a stop handle that works per agent.',
      "Isolation is a claim to test, not to assume. METR's public investigation of a 2026 agent hacking incident reports that agents meant to be \"fully isolated from one another\" communicated through a shared internal package repository [7]. The agent runtime profile states each boundary as a control with the evidence it should leave; its verification procedures are still to be written in review, so that a team can show the boundary held rather than assert it.",
    ],
    links: [
      { title: 'Agent runtime control profile', description: 'AIGE-CTL-AGENT-001 to 031, derived from chapter 23, draft v0.1.', href: '/controls/agent-runtime', layer: 4 },
      { title: 'Agent identity and scoped credentials', description: 'Pattern: one identity per agent, credentials scoped to the task and short-lived.', href: '/patterns/agent-identity-scoped-credentials', layer: 4 },
      { title: 'Runtime guardrail', description: 'Pattern: guardrails on the live request path that emit a decision event for each call.', href: '/patterns/runtime-guardrail', layer: 4 },
      { title: 'Kill switch and circuit breaker', description: 'Pattern: a tested stop for one agent that leaves the rest of the fleet running.', href: '/patterns/kill-switch-circuit-breaker', layer: 4 },
      { title: 'Identity and short-lived credentials', description: 'Chapter 23: channel authentication is not agent identity.', href: `${CH23}#identity-and-short-lived-credentials`, layer: 4 },
      { title: 'Kill switch and per-agent circuit breakers', description: 'Chapter 23: stopping one agent, and stopping across hops.', href: `${CH23}#kill-switch-and-per-agent-circuit-breakers`, layer: 4 },
      { title: 'Agent control profile builder', description: 'Toolkit: the minimum control set for one agent at its autonomy level.', href: '/toolkit/agent-control-profile' },
      { title: 'Threats mapped to controls', description: 'The agentic threats, each tied to the controls that hold against it.', href: '/resources/threats' },
    ],
  },
  {
    id: 'assurance',
    title: 'Assurance evidence',
    lede: 'A reviewer should be able to check the record, not only read the report.',
    paragraphs: [
      'The NIST AI RMF asks for mechanisms to supersede, disengage or deactivate AI systems whose outcomes are inconsistent with intended use (MANAGE 2.4) [8]. An assessor can only rely on such a mechanism if the system leaves a record that it exists, that it was tested and what happened when it fired. The patterns and schemas on this site describe that record: evidence emitted by the control itself, in a documented format, collected continuously rather than assembled before an audit.',
    ],
    links: [
      { title: 'Machine-readable evidence (OSCAL)', description: 'Pattern: control evidence in a standard format, so an audit becomes a query.', href: '/patterns/machine-readable-evidence-oscal', layer: 5 },
      { title: 'Continuous assurance telemetry', description: 'Pattern: control decisions streamed to one assurance store as they happen.', href: '/patterns/continuous-assurance-telemetry', layer: 5 },
      { title: 'Open data', description: 'The registers behind the site as static JSON, with schemas and an OpenAPI file.', href: '/resources/data' },
      { title: 'API index', description: 'The machine-readable catalogue of every dataset.', href: '/api/v1/index.json' },
      { title: 'MCP server', description: 'Ask any MCP client and get answers read from the registers, each with its source.', href: '/mcp' },
      { title: 'Layer 05: assurance and continuous compliance', description: 'Chapter 04 on evidence that stays current between audits.', href: '/bok/the-stack#layer-05-assurance--continuous-compliance', layer: 5 },
    ],
  },
  {
    id: 'incidents',
    title: 'Incidents',
    lede: 'When a boundary fails, the record decides what can be learned.',
    paragraphs: [
      "Chapter 23 sorts agent incidents into eleven classes, from goal hijack to exfiltration through a tool, each with a detection signal and a first containment, and traces agent and tool operations with the OpenTelemetry GenAI conventions [9]. The record itself can be the weak point. The same investigation reports spoofed tool calls in at least 96 transcripts and transcript gaps caused by container resets [7]. A run record that the agent can write to, or that a restart can truncate, is weak evidence.",
    ],
    links: [
      { title: 'Incident cases', description: 'Public incidents as engineering post-mortems: failure mode, control, evidence.', href: '/cases' },
      { title: 'From incident to control', description: 'How a case becomes a failure mode and a control.', href: '/cases#from-incident-to-control' },
      { title: 'Chapter 17: incidents', description: 'Detection, triage, reporting clocks and corrective action.', href: '/bok/incidents' },
      { title: 'An agent incident taxonomy', description: 'Chapter 23: eleven classes, each with a detection signal and a first containment.', href: `${CH23}#an-agent-incident-taxonomy`, layer: 4 },
      { title: 'Incident pipeline', description: 'Pattern: detect, triage and report serious incidents within the legal window.', href: '/patterns/incident-pipeline', layer: 5 },
      { title: 'Incident clock', description: 'Toolkit: every reporting deadline as a calendar date, as chapter 17 states the clocks.', href: '/toolkit/incident-clock' },
    ],
  },
  {
    id: 'ecosystem',
    title: 'Certifications and frameworks',
    lede: 'Schemes that already exist, and what an open implementation layer adds to them.',
    paragraphs: [
      'AIUC-1 lists 53 requirements in six domains, from data and privacy to society, two of them now marked retired [10]; its certificates are issued centrally on an audit report prepared by an accredited auditor [11]. ISO/IEC 42001 sets requirements for an AI management system [12], and ISO/IEC 42006 sets the requirements for the bodies that audit and certify against it [13]. The NIST AI RMF organises outcomes under govern, map, measure and manage [8].',
      'These schemes say what must be true. The controls on this site add the engineering layer underneath: for each control, the point where it is enforced, how a third party would check that it held and the evidence record it leaves (in full for three controls so far, in draft for the rest). A certification or framework can map to them; they do not replace one and confer no certification. This site is not affiliated with, reviewed by or certified by AIUC, ISO, NIST, METR or any AI developer whose guidance it cites.',
      'Public guidance from frontier developers and evaluators now uses the same terms for the environment around a model: an authorization boundary, and expectations for isolation, credential handling, monitoring and stop conditions [14]; a sandbox whose only outside connection is the model API, with keys kept outside it, a configuration checked before every evaluation and challenges confirmed solvable [15]. The profiles on this site cross-reference that guidance where it evidences a control. They are not derived from it, and no developer or evaluator has reviewed or endorsed them.',
    ],
    links: [
      { title: 'Open controls', description: 'The control profiles, their mappings and how to review them.', href: '/controls' },
    ],
  },
];

// ---------------------------------------------------------------------------
// #stack-map: one sentence per layer, in stack order.

export const frontierStackMap: Readonly<Record<LayerNumber, string>> = {
  1: 'Evaluation plans, egress and tool policies written as code and reviewed like code.',
  2: 'An inventory of models, agents, harnesses and tool servers, each with an owner.',
  3: 'Evaluations and red-team runs that record their environment, so the result counts as evidence.',
  4: 'Identity, tool mediation, execution limits and stop handles on every agent step.',
  5: 'Evidence records an assessor can check, collected as the controls run.',
};

// ---------------------------------------------------------------------------
// #open-questions.

export const frontierOpenQuestions: readonly string[] = [
  'Which parts of the environment around a model must an evaluation record for its result to count as evidence?',
  'Where does an agent control boundary sit when one agent delegates to another across organisations?',
  'Which runtime safeguards can be verified from telemetry alone, and which need an inspection or an attestation?',
];

// ---------------------------------------------------------------------------
// Checks.

const LAB_NAMES = /\b(OpenAI|Anthropic|DeepMind|Google|Meta|xAI)\b/;

/** Every string of copy rendered outside the source list. */
export function frontierCopy(): string[] {
  return [
    frontierHero.title,
    frontierHero.lede,
    ...frontierOpening,
    frontierNot,
    ...frontierRoles,
    ...frontierChain.flatMap((s) => [s.label, s.sub]),
    ...frontierBlocks.flatMap((b) => [
      b.title,
      b.lede ?? '',
      ...b.paragraphs,
      ...b.links.flatMap((l) => [l.title, l.description]),
    ]),
    ...Object.values(frontierStackMap),
    ...frontierOpenQuestions,
  ];
}

export function frontierProblems(): string[] {
  const problems: string[] = [];
  const cited = new Set<number>();
  for (const block of frontierBlocks) {
    for (const p of block.paragraphs) {
      for (const m of p.matchAll(/\[(\d+)\]/g)) {
        const n = Number(m[1]);
        cited.add(n);
        if (n < 1 || n > frontierSources.length) problems.push(`${block.id}: [${n}] has no source`);
      }
    }
  }
  frontierSources.forEach((s, i) => {
    if (!cited.has(i + 1)) problems.push(`source [${i + 1}] ${s.title} is never cited`);
  });
  for (const text of frontierCopy()) {
    if (text.includes('\u2014')) problems.push(`em dash in: ${text.slice(0, 60)}`);
    if (LAB_NAMES.test(text)) problems.push(`lab named in copy: ${text.slice(0, 60)}`);
  }
  for (const s of frontierSources) {
    if (s.gloss?.includes('\u2014') || s.title.includes('\u2014')) problems.push(`em dash in source ${s.title}`);
  }
  return problems;
}
