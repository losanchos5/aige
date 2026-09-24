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
  {
    id: 'policy-card',
    title: 'Policy Card builder',
    summary:
      'Turn one governance rule into a Policy Card for people and machines, an OPA/Rego module with unit tests, a Cedar stub and the CI hook that runs it.',
    audience: ['AI governance engineers', 'Platform and security leads', 'Policy owners'],
    inputs: [
      'A rule from six templates, or your own condition on one input field',
      'Owner, scope, review date and the obligation ids the rule answers',
    ],
    outputs: [
      'Policy Card in Markdown, YAML and JSON, valid against the policy-card schema',
      'OPA/Rego module with a verdict rule and unit tests',
      'Cedar stub with tests',
      'Example input and a GitHub Actions CI hook',
    ],
    status: 'live',
    href: '/toolkit/policy-card',
    chapter: { label: '05. Patterns: Policy Card', href: '/patterns/policy-card' },
  },
];

/** The registry entry for `id`; throws at build time on an unknown id so a
 *  page can never render with the wrong entry. */
export function toolById(id: string): ToolEntry {
  const tool = tools.find((entry) => entry.id === id);
  if (!tool) throw new Error(`toolkit.ts: no tool with id "${id}"`);
  return tool;
}
