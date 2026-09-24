// /llms-full.txt: the whole corpus in one plain-text file, as llmstxt.org
// suggests alongside the /llms.txt index: the same header, then every Body of
// Knowledge chapter in reading order and the Thesis, each opened by its title
// and canonical URL and followed by its Markdown source verbatim.
//
// The sources are plain Markdown: the callouts are labelled blockquotes and the
// diagrams are injected at build time from data/diagrams.ts, not from any custom
// syntax in the files, so nothing has to be stripped beyond each document's own
// H1, which this file re-emits with the URL attached.
import { getCollection, getEntry } from 'astro:content';
import type { APIRoute } from 'astro';
import { chaptersOrdered } from '../data/chapters';
import {
  chapterPath,
  docLead,
  document,
  header,
  originOf,
  textResponse,
  withoutTitle,
} from '../lib/llms';

export const GET: APIRoute = async (context) => {
  const origin = originOf(context.site);
  const url = (path: string) => `${origin}${path}`;

  const bok = await getCollection('bok');
  const bodyById = new Map(bok.map((entry) => [entry.id, entry.body ?? ''] as const));

  /** One document: a `# title`, its canonical URL, then the source Markdown. */
  const doc = (title: string, canonical: string, body: string) =>
    ['---', '', `# ${title}`, '', `Source: ${canonical}`, '', withoutTitle(body)].join('\n');

  const chapters = chaptersOrdered.map((chapter) =>
    doc(chapter.title, url(chapterPath(chapter)), bodyById.get(chapter.id) ?? ''),
  );

  const thesisEntry = await getEntry('thesis', 'thesis');
  if (!thesisEntry) {
    throw new Error('thesis collection entry not found');
  }
  const thesisSource = thesisEntry.body ?? '';
  const thesis = doc(docLead(thesisSource).title, url('/thesis'), thesisSource);

  const blocks = [
    header(
      `This file carries the complete text of the ${chaptersOrdered.length} Body of Knowledge chapters, in reading order, and then the Thesis. The index is at ${url('/llms.txt')}.`,
    ),
    ...chapters,
    thesis,
  ];

  return textResponse(document(blocks));
};
