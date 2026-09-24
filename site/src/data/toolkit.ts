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
  // Block w2-tool-planner: the obligations and deadlines planner over the EU AI
  // Act and GPAI rows of the obligation register.
  {
    id: 'obligations-planner',
    title: 'Obligations and deadlines planner',
    summary:
      'Pick your roles in the EU AI Act value chain and what the system is: the register rows that bind you, with the artefact that evidences each, its layer, the date it applies and its status.',
    audience: ['AI governance engineers', 'Compliance and legal leads', 'Product and platform owners'],
    inputs: [
      'Your roles: provider, deployer, importer, distributor, authorised representative, GPAI model provider (with or without systemic risk)',
      'The system classes: Annex III, Annex I, Article 50',
      'An optional reference date',
    ],
    outputs: [
      'The obligations that bind you, with artefact, layer, date, status and patterns',
      'Timeline of the dates, drawn',
      'Checklist in Markdown',
      'Open-data JSON and a CSV',
      'Calendar file (.ics), one all-day event per date',
    ],
    status: 'live',
    href: '/toolkit/obligations-planner',
    chapter: { label: '08. Regulatory map', href: '/bok/regulatory-map' },
  // Block w2-tool-triage: the EU AI Act role and risk-class triage, built from
  // chapter 18; question graph in src/data/triage.ts.
  {
    id: 'ai-act-triage',
    title: 'EU AI Act role and risk-class triage',
    summary:
      'Walk an AI system or model through the EU AI Act as amended by the Digital Omnibus: indicative roles and risk classes with the reason behind each answer, and a classification decision record to file.',
    audience: [
      'AI governance engineers',
      'Product and platform owners at intake',
      'Privacy and legal partners reviewing a classification',
    ],
    inputs: [
      'The system or model and its intended purpose',
      'Up to 20 questions on definition, reach, role, prohibited practices, high-risk, transparency and GPAI',
      'Reviewer, date, legal-review state and re-review triggers',
    ],
    outputs: [
      'Indicative scope, EU roles and risk classes, each with its reason and article',
      'The reason behind every answer',
      'Classification decision record in JSON and YAML, with its JSON Schema',
      'Markdown report',
      'A link that opens the obligations planner with these roles and classes',
    ],
    status: 'live',
    href: '/toolkit/ai-act-triage',
    chapter: { label: '18. The EU AI Act in one pass', href: '/bok/eu-ai-act' },
  },
];

/** The registry entry for `id`; throws at build time on an unknown id so a
 *  page can never render with the wrong entry. */
export function toolById(id: string): ToolEntry {
  const tool = tools.find((entry) => entry.id === id);
  if (!tool) throw new Error(`toolkit.ts: no tool with id "${id}"`);
  return tool;
}
