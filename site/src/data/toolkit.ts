// toolkit.ts: the registry of browser tools under /toolkit. One entry per
// tool; the /toolkit index renders this list and ToolShell reads the entry of
// the page it wraps. The contract every tool follows (registry entry, ToolShell,
// the shared client helpers in public/toolkit/lib.js) is written up in
// openspec/changes/toolkit-foundation-self-check/proposal.md.
//
// Adding a tool: append an entry with `status: 'planned'` (the index lists it
// without a link, so the link checker stays green), then flip it to 'live' in
// the same change that adds src/pages/toolkit/<id>.astro and
// public/toolkit/<id>.js.

export type ToolStatus = 'live' | 'planned';

export interface ToolEntry {
  /** Kebab-case id; equals the route segment (/toolkit/<id>) and the client
   *  script name (/toolkit/<id>.js). */
  id: string;
  /** Tool name, sentence case, as the index card and the page title show it. */
  title: string;
  /** One sentence: what the tool gives back. */
  summary: string;
  /** Who it is for: roles, not job titles. */
  audience: readonly string[];
  /** What the reader enters, one short phrase each. */
  inputs: readonly string[];
  /** What the reader gets back and can export, one short phrase each. */
  outputs: readonly string[];
  status: ToolStatus;
  /** Always `/toolkit/<id>`; only linked when `status` is 'live'. */
  href: string;
  /** The Body of Knowledge chapter the tool is built from. */
  chapter?: { label: string; href: string };
}

/** The fixed notice every tool shows above its form, and every export repeats. */
export const toolNotice =
  'Indicative, not legal advice and not a conformity claim. Nothing you enter leaves your browser.';

export const tools: readonly ToolEntry[] = [
  {
    id: 'maturity-self-check',
    title: 'Maturity self-check',
    summary:
      'Read your governance function layer by layer against the observable criteria of the maturity model: the ragged profile, the floor it sets and the one move that raises it.',
    audience: ['AI governance engineers', 'Heads of AI governance', 'Platform and security leads'],
    inputs: ['For each of the five stack layers, the highest observable criterion met today'],
    outputs: [
      'Per-layer profile, drawn',
      'Floor and the single next move, with its pattern',
      'JSON profile you can re-import',
      'Markdown report',
      'SVG and PNG image',
      'Before-and-after comparison of two profiles',
    ],
    status: 'live',
    href: '/toolkit/maturity-self-check',
    chapter: { label: '07. Maturity model', href: '/bok/maturity-model' },
  },
  // Block w2-builders-b: four tools that turn a questionnaire into a document.
  {
    id: 'vendor-due-diligence',
    title: 'Vendor due-diligence request',
    summary:
      'Build a tiered, evidence-first due-diligence request for an AI vendor or model: the artefacts to ask for, cross-referenced to crosswalk topics and CSA AICM controls, and the contract clauses to check.',
    audience: ['AI governance engineers', 'Procurement and vendor risk', 'Security and privacy leads'],
    inputs: [
      'Supply type, use tier, data sensitivity, autonomy and tool access',
      'Jurisdictions and sector',
      'Optionally, the answers received',
    ],
    outputs: [
      'Risk tier with its reasons',
      '20 to 38 artefact requests',
      'Contract-clause checklist',
      'Markdown request and CSV',
      'Response record (JSON, vendor-due-diligence-response.v1)',
    ],
    status: 'live',
    href: '/toolkit/vendor-due-diligence',
    chapter: { label: '15. Governing deployment', href: '/bok/governing-deployment' },
  },
  {
    id: 'incident-clock',
    title: 'Incident clock',
    summary:
      'From the awareness time, your role, the system tier and the facts: the incident class, who reports to whom and every deadline as a calendar date, as chapter 17 states the clocks.',
    audience: ['Incident commanders', 'AI governance engineers', 'DPOs and legal'],
    inputs: [
      'Awareness time, and classification or causal-link times if known',
      'Your roles and the system tier',
      'What happened, read as severely as the evidence allows',
    ],
    outputs: [
      'Incident class and severity',
      'Clocks per regime with calendar dates',
      'Calendar reminders (.ics)',
      'Incident record skeleton (JSON, incident-record.v1)',
      'Markdown summary',
    ],
    status: 'live',
    href: '/toolkit/incident-clock',
    chapter: { label: '17. Incidents, issues and root causes', href: '/bok/incidents' },
  },
  {
    id: 'agent-control-profile',
    title: 'Agent control profile',
    summary:
      'Describe one agent and get the minimum control set chapter 23 asks for at its autonomy level, the controls its tools, memory and identity add, an agent register entry and a checklist.',
    audience: ['AI governance engineers', 'Platform and security engineers', 'Agent owners'],
    inputs: [
      'Autonomy level and approval points',
      'Tools and MCP servers with operation class and scope',
      'Data classes, memory, external actions and identity model',
    ],
    outputs: [
      'Minimum control set with patterns',
      'Gaps to close',
      'Agent register entry (JSON, agent-register-entry.v1)',
      'Checklist (Markdown and CSV)',
    ],
    status: 'live',
    href: '/toolkit/agent-control-profile',
    chapter: { label: '23. Governing AI agents', href: '/bok/governing-agents' },
  },
  {
    id: 'fairness-metric-chooser',
    title: 'Fairness metric chooser',
    summary:
      'Walk the questions chapter 16 says decide the fairness metric (ground truth, costlier error, allocation or quality of service, legal frame) and get the metric families to use, with their caveats.',
    audience: ['Data scientists and ML engineers', 'AI governance engineers', 'Legal and compliance'],
    inputs: [
      'Harm type and ground truth',
      'Costlier error',
      'Legal frame and access to the protected attribute',
    ],
    outputs: [
      'Primary metric families and secondary checks',
      'Warnings and legal notes, linked to the chapter',
      'Markdown and JSON record of the choice',
    ],
    status: 'live',
    href: '/toolkit/fairness-metric-chooser',
    chapter: {
      label: '16. Fairness and explainability',
      href: '/bok/fairness-and-explainability',
    },
  },
];

/** The registry entry for `id`; throws at build time on an unknown id so a
 *  page can never render with the wrong entry. */
export function toolById(id: string): ToolEntry {
  const tool = tools.find((entry) => entry.id === id);
  if (!tool) throw new Error(`toolkit.ts: no tool with id "${id}"`);
  return tool;
}
