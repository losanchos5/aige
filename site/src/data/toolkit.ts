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
  // Block w2-builders-a: three document builders whose records validate
  // against the published schemas (public/schemas); data in doc-builders.ts.
  {
    id: 'ai-register-entry',
    title: 'AI register entry builder',
    summary:
      'Build AI system and agent register entries that validate against the published schemas, keep a register in the browser and map each field to the UK ATRS, a Canada AIA, the EU database, a model card and an ISO/IEC 42001 SoA.',
    audience: ['AI governance engineers', 'System and agent owners', 'Privacy and transparency leads'],
    inputs: [
      'One AI system or agent: identity, owner, scope, expiry, classification',
      'Optionally, the public-record fields',
      'Or a register file (JSON or CSV)',
    ],
    outputs: [
      'Entry checked against its schema, problems linked to the fields',
      'Register in JSON and CSV (re-importable)',
      'Markdown public summary',
      'Field crosswalk in CSV and Markdown',
    ],
    status: 'live',
    href: '/toolkit/ai-register-entry',
    chapter: {
      label: '04. The stack (five layers)',
      href: '/bok/the-stack#layer-02-inventory--transparency',
    },
  },
  {
    id: 'impact-assessment',
    title: 'Impact assessment builder',
    summary:
      'Write a FRIA, an AI system impact assessment or an AI addendum to a DPIA as one record: the elements each instrument asks for, every risk linked to the measure and pattern that mitigate it, and the triggers that reopen it.',
    audience: ['Deployers of high-risk systems', 'AI governance engineers', 'Privacy offices and DPOs'],
    inputs: [
      'The assessment type (FRIA, AIIA or DPIA addendum)',
      'The elements of that instrument',
      'Risks, measures, outcome, approvals and re-open triggers',
    ],
    outputs: [
      'Record checked against the impact-assessment schema',
      'Element coverage and a risk-to-measure matrix',
      'JSON, YAML and Markdown exports',
    ],
    status: 'live',
    href: '/toolkit/impact-assessment',
    chapter: {
      label: '14. Governing AI development',
      href: '/bok/governing-development#impact-assessments-compared',
    },
  },
  {
    id: 'model-card',
    title: 'Model card builder',
    summary:
      'Write a model or system card once and export it as a Hugging Face style card and a CycloneDX 1.7 ML-BOM component, with a checklist of what it covers under Annex IV, Art. 13, Art. 53, ISO/IEC 42001 and the NIST AI RMF.',
    audience: ['Model owners and ML engineers', 'Model validation', 'AI governance engineers'],
    inputs: [
      'Model details, uses, data, evaluation, limits and oversight',
      'Whether it is part of a high-risk system or a GPAI model',
    ],
    outputs: [
      'Record checked against the model-card schema',
      'Obligation coverage checklist',
      'Hugging Face style Markdown with YAML front matter',
      'CycloneDX 1.7 ML-BOM JSON',
    ],
    status: 'live',
    href: '/toolkit/model-card',
    chapter: {
      label: '14. Governing AI development',
      href: '/bok/governing-development#the-technical-file',
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
