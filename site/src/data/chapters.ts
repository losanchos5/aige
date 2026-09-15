// Typed manifest of the eleven Body of Knowledge chapters.
// `id` is the collection entry id Astro's glob loader produces from each
// file name (github-slugger over the path segment, e.g. `00-preface.md`
// -> `00-preface`). Titles are the file H1; summaries are the opening
// blockquote, trimmed to <=160 chars, faithful to the source.

export interface Chapter {
  /** Collection entry id (matches the glob loader id). */
  id: string;
  /** Zero-based reading order. */
  order: number;
  /** URL slug under /bok/. */
  slug: string;
  /** Full title, from the file H1. */
  title: string;
  /** Short label for navigation and cards. */
  shortTitle: string;
  /** One-line summary, <=160 chars, from the opening blockquote. */
  summary: string;
}

export const chapters: readonly Chapter[] = [
  {
    id: '00-preface',
    order: 0,
    slug: 'preface',
    title: '00. Preface',
    shortTitle: 'Preface',
    summary: 'Why this book exists, who it is for, and how to use it.',
  },
  {
    id: '01-definition',
    order: 1,
    slug: 'definition',
    title: '01. The definition',
    shortTitle: 'Definition',
    summary:
      'AI governance engineering is the application of engineering practice — systems thinking, product thinking and code — to the governance of AI systems.',
  },
  {
    id: '02-why-now',
    order: 2,
    slug: 'why-now',
    title: '02. Why now',
    shortTitle: 'Why Now',
    summary:
      'AI governance engineering is forming now because the thing being governed changed shape, the market renamed the role before the profession named itself…',
  },
  {
    id: '03-values-principles',
    order: 3,
    slug: 'values-and-principles',
    title: '03. Values and principles',
    shortTitle: 'Values & Principles',
    summary:
      'The eight values and six principles of the Thesis, each expanded with what it means in practice and the anti-pattern it rejects.',
  },
  {
    id: '04-the-stack',
    order: 4,
    slug: 'the-stack',
    title: '04. The stack (five layers)',
    shortTitle: 'The Stack',
    summary:
      'The reference architecture of AI governance engineering: five layers that answer the three questions, where evidence is produced at the bottom…',
  },
  {
    id: '05-patterns',
    order: 5,
    slug: 'patterns',
    title: '05. Patterns',
    shortTitle: 'Patterns',
    summary:
      'A catalogue of reusable AI governance engineering patterns, each named to a layer of the stack, in the CSIRO Responsible AI Pattern Catalogue structure.',
  },
  {
    id: '06-the-role',
    order: 6,
    slug: 'the-role',
    title: '06. The role',
    shortTitle: 'The Role',
    summary:
      'The AI governance engineer as a concrete role: a capability first and a job title second, defined by the workflows it owns and the evidence it produces…',
  },
  {
    id: '07-maturity-model',
    order: 7,
    slug: 'maturity-model',
    title: '07. Maturity model (five levels)',
    shortTitle: 'Maturity Model',
    summary:
      'A ladder from paper to production — Documented, Inventoried, Tested, Enforced, Continuous — where each level is proven by what the running systems show…',
  },
  {
    id: '08-regulatory-map',
    order: 8,
    slug: 'regulatory-map',
    title: '08. Regulatory map (obligation → artefact → layer)',
    shortTitle: 'Regulatory Map',
    summary:
      'The reverse index of every "Maps to" line in the book: for each obligation it names the engineering artefact that satisfies or supports it…',
  },
  {
    id: '09-glossary',
    order: 9,
    slug: 'glossary',
    title: '09. Glossary',
    shortTitle: 'Glossary',
    summary:
      'The canonical definitions for the book: every term defined once, alphabetically, and cross-referenced to the chapter that treats it in full.',
  },
  {
    id: '10-reading-list',
    order: 10,
    slug: 'reading-list',
    title: '10. Reading list',
    shortTitle: 'Reading List',
    summary:
      'The sources that formed the discipline, curated and annotated — each with a verified URL and a one-line note on why it matters.',
  },
];

/** Chapters in reading order. */
export const chaptersOrdered: readonly Chapter[] = [...chapters].sort(
  (a, b) => a.order - b.order,
);

/** Look up a chapter by its collection entry id. */
export function getChapter(id: string): Chapter | undefined {
  return chapters.find((chapter) => chapter.id === id);
}

/** Look up a chapter by its URL slug. */
export function getChapterBySlug(slug: string): Chapter | undefined {
  return chapters.find((chapter) => chapter.slug === slug);
}
