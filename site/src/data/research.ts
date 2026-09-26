// research.ts: the themes of the research notes under /research. One row per
// theme: the note's slug, its title, the question it answers and whether the
// note is written. Only a `written` theme has a page (/research/<slug>, from
// ../research/<slug>.md once the research collection lands); a `planned` theme
// is listed on /research as not yet written, never linked. Nothing here claims
// a note exists before it does.
//
// Provenance: the themes come from the approved plan of the open reference
// project (openspec/changes/open-reference-project, 2026-09-26). The one
// written note is a draft (v0.1, open for technical review).

export type ResearchStatus = 'planned' | 'written';

export interface ResearchTheme {
  /** Kebab-case slug: the note's file name and its URL segment. */
  slug: string;
  /** The note's title, as its H1 and <title> will read. */
  title: string;
  /** The open question the note answers, one sentence ending in "?". */
  question: string;
  status: ResearchStatus;
}

/** The index of the research notes. */
export const RESEARCH_PATH = '/research';

export const researchThemes: readonly ResearchTheme[] = [
  {
    slug: 'the-evaluation-environment-is-part-of-the-system',
    title: 'The evaluation environment is part of the system',
    question:
      'Which parts of the environment around a model must an evaluation record for its result to count as evidence?',
    status: 'written',
  },
  {
    slug: 'control-boundaries-for-agents',
    title: 'Control boundaries for agents',
    question:
      'Where should the limit on what an agent may do be enforced: at the tool, the credential, the network or the orchestrator?',
    status: 'planned',
  },
  {
    slug: 'from-model-evaluation-to-assurance-evidence',
    title: 'From model evaluation to assurance evidence',
    question:
      'What does an evaluation result need to carry before an assessor can rely on it as evidence that a control works?',
    status: 'planned',
  },
  {
    slug: 'stop-conditions-across-agent-hops',
    title: 'Stop conditions across agent hops',
    question:
      'How does a stop signal reach every agent in a delegation chain, and how is it shown afterwards that it did?',
    status: 'planned',
  },
  {
    slug: 'mapping-open-controls-to-certification-schemes',
    title: 'Mapping open controls to certification schemes',
    question:
      'How can one open control be mapped to several certification schemes without implying conformity to any of them?',
    status: 'planned',
  },
];

/** The URL of a theme's note: /research/<slug>. */
export function researchPath(theme: Pick<ResearchTheme, 'slug'> | string): string {
  const slug = typeof theme === 'string' ? theme : theme.slug;
  return `${RESEARCH_PATH}/${slug}`;
}

/** The themes whose note is written, in register order: the only ones with a page. */
export function writtenThemes(): ResearchTheme[] {
  return researchThemes.filter((theme) => theme.status === 'written');
}

/** The theme with this slug, or undefined. */
export function researchThemeBySlug(slug: string): ResearchTheme | undefined {
  return researchThemes.find((theme) => theme.slug === slug);
}

const SLUG = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;
const EM_DASH = String.fromCharCode(0x2014);

/**
 * Every problem in the register, empty when it is sound: slugs kebab-case and
 * unique, titles unique and 10 to 120 characters, each question one sentence
 * ending in "?", a known status, at least one written note, no em dash.
 */
export function researchProblems(): string[] {
  const problems: string[] = [];
  const slugs = new Set<string>();
  const titles = new Set<string>();
  for (const theme of researchThemes) {
    const at = theme.slug || '(no slug)';
    if (!SLUG.test(theme.slug)) problems.push(`${at}: slug is not kebab-case`);
    if (slugs.has(theme.slug)) problems.push(`${at}: duplicate slug`);
    slugs.add(theme.slug);
    if (titles.has(theme.title)) problems.push(`${at}: duplicate title`);
    titles.add(theme.title);
    if (theme.title.length < 10 || theme.title.length > 120) {
      problems.push(`${at}: title must be 10 to 120 characters`);
    }
    if (!theme.question.trim().endsWith('?')) problems.push(`${at}: question must end with "?"`);
    if (theme.status !== 'planned' && theme.status !== 'written') {
      problems.push(`${at}: unknown status ${String(theme.status)}`);
    }
    if (JSON.stringify(theme).includes(EM_DASH)) problems.push(`${at}: contains an em dash`);
  }
  if (writtenThemes().length === 0) problems.push('no written theme');
  return problems;
}
