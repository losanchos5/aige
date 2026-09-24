// /llms.txt: the plain-text index an LLM reads to find its way around the site,
// in the llmstxt.org format: an H1, a `>` summary, a paragraph of provenance and
// then one `##` section per group of `- [name](url): notes` links. Every title
// and summary comes from data/chapters.ts or from the Markdown sources
// themselves, so this file says exactly what the rendered pages say. The full
// text of everything listed here is at /llms-full.txt.
import type { APIRoute } from 'astro';
import { chaptersOrdered } from '../data/chapters';
import { site } from '../data/site';
import {
  chapterPath,
  docLead,
  document,
  header,
  linkLine,
  originOf,
  textResponse,
} from '../lib/llms';
import { readSource } from '../lib/md-parse';

export const GET: APIRoute = (context) => {
  const origin = originOf(context.site);
  const url = (path: string) => `${origin}${path}`;

  const thesisEn = docLead(readSource('THESIS.md'));
  const thesisEs = docLead(readSource('THESIS.es.md'));

  const section = (heading: string, lines: readonly string[]) =>
    [`## ${heading}`, '', ...lines].join('\n');

  const blocks = [
    header(
      `This file indexes every document on the site; the complete text of all of them is at ${url('/llms-full.txt')}.`,
    ),

    section(
      'Body of Knowledge',
      chaptersOrdered.map((chapter) =>
        linkLine(chapter.title, url(chapterPath(chapter)), chapter.summary),
      ),
    ),

    section('Thesis', [
      linkLine(thesisEn.title, url('/thesis'), thesisEn.summary),
      linkLine(
        thesisEs.title,
        url('/es/thesis'),
        `Spanish translation of the Thesis. ${thesisEs.summary}`,
      ),
    ]),

    section('Resources', [
      linkLine(
        'Topic × framework crosswalk',
        url('/resources/crosswalk'),
        'Each Body of Knowledge topic mapped to the EU AI Act, ISO, NIST and Chinese instruments that govern it, clause by clause. Illustrative, not a claim of conformity.',
      ),
      linkLine(
        'Crosswalk (CSV)',
        url('/resources/crosswalk.csv'),
        'The same mapping as one row per reference, RFC 4180 escaped.',
      ),
      linkLine(
        'Crosswalk (JSON)',
        url('/resources/crosswalk.json'),
        'The same mapping as JSON, with the disclaimer, version and licence in the payload.',
      ),
      linkLine(
        'Discipline map',
        url('/map'),
        'The whole discipline on one page: every chapter, layer, pattern, workflow, obligation, maturity level and learning stage, as a mind map and as a linked list.',
      ),
      linkLine(
        'Resources index',
        url('/resources'),
        'Frameworks, tools, a reading list, a glossary, the topic crosswalk and the discipline map, all extracted from the Body of Knowledge.',
      ),
    ]),

    section('Feeds and citation', [
      linkLine(
        'RSS feed',
        url('/rss.xml'),
        'New and updated chapters and each released version, newest first.',
      ),
      linkLine(
        'Zenodo record',
        `https://doi.org/${site.conceptDoi}`,
        `Archived releases of the Thesis and Body of Knowledge; this concept DOI always resolves to the latest. Current release: https://doi.org/${site.doi}.`,
      ),
      linkLine(
        'Full text',
        url('/llms-full.txt'),
        'Every chapter and the Thesis in full, as Markdown, in one file.',
      ),
    ]),

    section('About', [
      linkLine(
        'About',
        url('/about'),
        `Who writes this, how to contribute and how to get in touch. Licensed ${site.license}.`,
      ),
    ]),
  ];

  return textResponse(document(blocks));
};
