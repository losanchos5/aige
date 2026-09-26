// work.ts: the open work of the project, stated as it is. Every row names a
// thing that exists in the repository (or, for `planned`, a theme listed as not
// yet written) and the state it is really in: nothing here is reviewed,
// published or adopted until that has happened. The home page, /about and
// /contribute render the list through OpenWork.astro.
//
// Rows point at a page, never at an anchor (`href` has no `#`), so a page can
// move its sections without breaking the list.

// U+2014, built from its code point so this file itself stays free of it.
const EM_DASH = String.fromCharCode(0x2014);

export type WorkStatus = 'draft' | 'in-review' | 'in-progress' | 'planned';

export interface WorkItem {
  /** Stable kebab id. */
  id: string;
  title: string;
  /** Site path of the page the work lives on (no fragment). */
  href: string;
  status: WorkStatus;
  /** One sentence: what it is and what it needs next. */
  note: string;
  /** Version of the artefact, where it has one. */
  version?: string;
  /** YYYY-MM-DD the row last changed. */
  updated: string;
}

export const WORK_STATUS_LABEL: Readonly<Record<WorkStatus, string>> = {
  draft: 'Draft',
  'in-review': 'In review',
  'in-progress': 'In progress',
  planned: 'Planned',
};

export const work: readonly WorkItem[] = [
  {
    id: 'evaluation-environment-profile',
    title: 'Evaluation Environment Control Profile',
    href: '/controls/evaluation-environment',
    status: 'draft',
    note: 'Nine draft control specifications for the environment a model or agent is evaluated in; open for technical review.',
    version: '0.1',
    updated: '2026-09-26',
  },
  {
    id: 'agent-runtime-profile',
    title: 'Agent Runtime Control Profile',
    href: '/controls/agent-runtime',
    status: 'draft',
    note: 'Thirty-one reference controls derived from the agent controls of chapter 23; every control is a draft.',
    version: '0.1',
    updated: '2026-09-26',
  },
  {
    id: 'evaluation-environment-note',
    title: 'The evaluation environment is part of the system',
    href: '/research/the-evaluation-environment-is-part-of-the-system',
    status: 'draft',
    note: 'A research note on why an evaluation that ignores the harness, tools, credentials and network measures only part of the system.',
    version: '0.1.0',
    updated: '2026-09-26',
  },
  {
    id: 'frontier-map',
    title: 'Frontier labs and evaluators route',
    href: '/frontier',
    status: 'draft',
    note: 'Where the controls, patterns and evidence formats on this site apply to evaluating and deploying frontier systems.',
    updated: '2026-09-26',
  },
  {
    id: 'incident-notes',
    title: 'Incident notes on three cases',
    href: '/cases',
    status: 'draft',
    note: 'System boundary, control assumptions and the controls that would have caught each failure, for three incident cases.',
    updated: '2026-09-26',
  },
  {
    id: 'planned-research-notes',
    title: 'Four planned research notes',
    href: '/research',
    status: 'planned',
    note: 'Themes listed on the research index and not yet written.',
    updated: '2026-09-26',
  },
];

/** Every problem in the list; empty when all hold. */
export function workProblems(): string[] {
  const problems: string[] = [];
  const ids = new Set<string>();
  for (const w of work) {
    const at = `work.ts ${w.id}`;
    if (!/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(w.id)) problems.push(`${at}: id must be lower-case kebab`);
    if (ids.has(w.id)) problems.push(`${at}: duplicate id`);
    ids.add(w.id);
    if (!w.title.trim()) problems.push(`${at}: empty title`);
    if (!w.note.trim()) problems.push(`${at}: empty note`);
    if (!(w.status in WORK_STATUS_LABEL)) problems.push(`${at}: unknown status ${w.status}`);
    if (!/^\/[a-z0-9/-]*$/.test(w.href)) problems.push(`${at}: href must be a site path without a fragment`);
    if (!/^\d{4}-\d{2}-\d{2}$/.test(w.updated)) problems.push(`${at}: updated must be YYYY-MM-DD`);
    if (w.version !== undefined && !/^\d+\.\d+(?:\.\d+)?$/.test(w.version)) problems.push(`${at}: bad version`);
    if (JSON.stringify(w).includes(EM_DASH)) problems.push(`${at}: em dash`);
  }
  return problems;
}
