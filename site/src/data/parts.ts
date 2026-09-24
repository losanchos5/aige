// The five parts of the Body of Knowledge, ready to render: each part of
// `chapterParts` (chapters.ts) with a one-sentence introduction, its chapters
// in reading order and its chapter-number range, computed from the data so no
// page ever hard-codes a count. The navigation (nav.ts), the home and the /bok
// index all read from here.
//
// The introductions are editorial, written for the site from the chapters' own
// summaries. They could move into `chapterParts` itself (chapters.ts) later;
// until then this is their single source.
import { chapterParts, chaptersOrdered, type Chapter, type ChapterPart } from './chapters';

export interface BookPart {
  id: ChapterPart;
  /** Part title, from chapterParts. */
  title: string;
  /** One sentence on what the part covers. */
  intro: string;
  /** The part's chapters in reading (numeric) order. */
  chapters: readonly Chapter[];
  /** Chapter-number range, e.g. `00–07` or `14–17, 23` (en dash, no spaces). */
  range: string;
}

const intros: Record<ChapterPart, string> = {
  discipline:
    'What AI governance engineering is, why it is forming now, and how it is built, staffed and measured.',
  reference:
    'The indexes the rest of the book points into: the regulatory map, the glossary and the reading list.',
  foundations:
    'What counts as an AI system, how an organisation runs its governance program and where risk management sits.',
  lifecycle:
    'Governing a system from use case to retirement: development, deployment, fairness, incidents and agents.',
  law: 'The EU AI Act, data protection, the law that already applies, AI laws worldwide, and the principles and standards.',
};

/** Two-digit chapter number, as the book prints it. */
export const chapterNum = (order: number): string => String(order).padStart(2, '0');

/**
 * Collapse chapter numbers into runs: [14, 15, 16, 17, 23] -> `14–17, 23`.
 * A run of one prints the single number; the separator is an en dash.
 */
export function formatRange(orders: readonly number[]): string {
  const sorted = [...orders].sort((a, b) => a - b);
  const runs: string[] = [];
  let start = sorted[0];
  let prev = sorted[0];
  for (const n of [...sorted.slice(1), Number.NaN]) {
    if (n === prev + 1) {
      prev = n;
      continue;
    }
    if (start !== undefined) {
      runs.push(start === prev ? chapterNum(start) : `${chapterNum(start)}–${chapterNum(prev)}`);
    }
    start = n;
    prev = n;
  }
  return runs.join(', ');
}

export const bookParts: readonly BookPart[] = chapterParts.map((part) => {
  const chapters = chaptersOrdered.filter((chapter) => chapter.part === part.id);
  return {
    id: part.id,
    title: part.title,
    intro: intros[part.id],
    chapters,
    range: formatRange(chapters.map((chapter) => chapter.order)),
  };
});

/** The whole book's chapter range, e.g. `00–23`. */
export const bookRange: string = formatRange(chaptersOrdered.map((chapter) => chapter.order));

const WORDS = ['zero', 'one', 'two', 'three', 'four', 'five', 'six', 'seven', 'eight', 'nine'];

/**
 * A count as the style guide writes it in prose: one to nine spelled out,
 * 10 and above as figures (STYLEGUIDE §2, Numbers).
 */
export function countWord(n: number): string {
  return n >= 0 && n < WORDS.length ? WORDS[n] : String(n);
}
