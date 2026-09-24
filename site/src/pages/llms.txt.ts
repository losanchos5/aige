// /llms.txt: the plain-text index an LLM reads to find its way around the site,
// in the llmstxt.org format: an H1, a `>` summary, a paragraph of provenance and
// then one `##` section per group of `- [name](url): notes` links. Every title
// and summary comes from data/chapters.ts, the pattern files' frontmatter or
// the Markdown sources themselves, so this file says exactly what the rendered
// pages say. The full text of every chapter, pattern and Thesis listed here is
// at /llms-full.txt.
import type { APIRoute } from 'astro';
import { chaptersOrdered } from '../data/chapters';
import { patternPath } from '../data/patterns';
import { site } from '../data/site';
import { loadPatternPages } from '../lib/pattern-pages';
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

export const GET: APIRoute = async (context) => {
  const origin = originOf(context.site);
  const url = (path: string) => `${origin}${path}`;

  const patternPages = await loadPatternPages();
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

    section('Patterns', [
      linkLine(
        'Pattern catalogue',
        url('/patterns'),
        `The ${patternPages.length} patterns below, grouped by the five stack layers. Chapter 05 (${url('/bok/patterns')}) keeps the template and a summary of each.`,
      ),
      ...patternPages.map(({ entry, def }) =>
        linkLine(`Pattern: ${def.title}`, url(patternPath(def)), entry.data.summary),
      ),
    ]),

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
        'Harms atlas',
        url('/resources/harms'),
        'The harms AI systems cause to individuals, groups, organisations, society and the environment: each with its failure mode, the control that catches it, the evidence it leaves and real incidents.',
      ),
      linkLine(
        'Harms atlas (JSON)',
        url('/resources/harms.json'),
        'The same atlas as JSON.',
      ),
      linkLine(
        'Cases',
        url('/cases'),
        'Publicly documented AI incidents written as engineering post-mortems: what happened, the failure mode, the control that would have caught it, the evidence it would have left and the obligations it touches.',
      ),
      linkLine(
        'Templates and schemas',
        url('/resources/templates'),
        'JSON Schemas, filled examples and human templates for the records AI governance produces, each field tagged with the obligations it helps evidence. Illustrative, not a claim of conformity.',
      ),
      linkLine(
        'AI contract and licence clauses',
        url('/resources/contracts'),
        'The clauses to check before you deploy a third-party AI system: what each governs, the red flag, a fallback position and the evidence to keep. An engineering checklist, not legal advice.',
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
        'Every chapter, every pattern and the Thesis in full, as Markdown, in one file.',
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
