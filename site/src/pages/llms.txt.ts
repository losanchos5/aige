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
import { obligations, obligationPath } from '../data/frameworks';
import { figures } from '../data/figures';
import { tools as toolkitTools, toolNotice } from '../data/toolkit';
import { audiences, audiencePath } from '../data/audiences';
import { liveSiblingHubs } from '../lib/audiences';
import { getGlossary } from '../lib/glossary';
import { hasFigureArt } from '../lib/figure-reuse';
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

/** The planned public endpoint of tools/mcp-server (README, "Connect"). */
const MCP_ENDPOINT = 'https://mcp.aigovernanceengineer.com/mcp';

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

    section('Practice', [
      linkLine(
        'Toolkit',
        url('/toolkit'),
        `Browser tools built from the book that produce documents you keep. ${toolNotice}`,
      ),
      ...toolkitTools
        .filter((tool) => tool.status === 'live')
        .map((tool) => linkLine(`Toolkit: ${tool.title}`, url(tool.href), tool.summary)),
      linkLine(
        'Governing AI agents',
        url('/agents'),
        'The agent control plane in one place: registry, identity and short-lived credentials, tool permissions, human checkpoints, guardrails, kill switches, the patterns and the threats they answer, routed into chapter 23.',
      ),
    ]),

    section('Routes by audience', [
      linkLine(
        'Routes by audience',
        url('/for'),
        'Six routes through the site, one per audience, each with what to do this week, the obligations that bind that audience and the questions it asks.',
      ),
      ...audiences.map((audience) =>
        linkLine(audience.navLabel, url(audiencePath(audience)), audience.summary),
      ),
      ...liveSiblingHubs().map((hub) => linkLine(hub.label, url(`/for/${hub.slug}`), hub.summary)),
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
        'Frameworks',
        url('/resources/frameworks'),
        'The laws, standards, codes and control sets the Body of Knowledge maps against, with the obligation, artefact and stack-layer matrix. Illustrative, not a claim of conformity.',
      ),
      linkLine(
        'Obligation register',
        url('/obligations'),
        `The ${obligations.length} obligations the book maps, one page each, with a stable id (AIGE-OBL-<instrument>-<clause>), the duty holder, the date it applies from, its status, the artefact that evidences it and its stack layer. Illustrative, not a claim of conformity.`,
      ),
      linkLine(
        'Open data and API',
        url('/resources/data'),
        'How to reuse the registers behind the site: static JSON under /api/v1 with a JSON Schema per dataset, an OpenAPI description, stable ids, the versioning promise and the CC BY 4.0 licence.',
      ),
      linkLine(
        'API catalogue (JSON)',
        url('/api/v1/index.json'),
        'The machine-readable list of every /api/v1 dataset with its schema and page.',
      ),
      linkLine(
        'Remote MCP server (read-only)',
        MCP_ENDPOINT,
        'A Model Context Protocol server (Streamable HTTP, no authentication) over the same /api/v1 data: the obligation register, the crosswalk, the glossary, the patterns, the templates and schemas, and the chapters; every answer names its source page. As of 2026-09-24 it is not deployed yet; its code and self-hosting guide are in tools/mcp-server of the repository.',
      ),
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
        'Figures',
        url('/figures'),
        `The ${figures.length} infographics and the interactive diagrams of the Body of Knowledge, each infographic with its own page, a text alternative, SVG and PNG downloads and a citation.`,
      ),
      linkLine(
        'Glossary',
        url('/bok/glossary'),
        `Chapter 09: ${getGlossary().length} terms, each defined once with its source, and each with its own page under /glossary/ (listed below under Optional).`,
      ),
      linkLine(
        'Glossary (JSON)',
        url('/glossary.json'),
        'Every term with its definition, chapter references and page URL, as JSON.',
      ),
      linkLine(
        'Tool categories',
        url('/resources/tools'),
        'Tool categories for each stack layer, every tool with its licence and access model: examples, not endorsements.',
      ),
      linkLine(
        'Reading list',
        url('/bok/reading-list'),
        `Chapter 10, the canonical annotated bibliography; ${url('/resources/reading-list')} is the same list with audience and jurisdiction filters.`,
      ),
      linkLine(
        'Discipline map',
        url('/map'),
        'The whole discipline on one page: every chapter, layer, pattern, workflow, obligation, maturity level and learning stage, as a mind map and as a linked list.',
      ),
      linkLine(
        'Resources index',
        url('/resources'),
        'Frameworks, the obligation register, the crosswalk, harms, cases, contracts, templates, figures, tools, the toolkit, the reading list, the glossary, the open data and the discipline map, all extracted from the Body of Knowledge.',
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
      linkLine(
        'Methodology',
        url('/about/methodology'),
        'How sources are chosen and tagged, how dated claims are re-verified, how corrections and reviews work, and how releases are versioned with DOIs.',
      ),
    ]),

    // llmstxt.org: the "Optional" section holds the URLs a reader with a short
    // context can skip. Here: one page per obligation, per figure and per term.
    section('Optional', [
      ...obligations.map((row) =>
        linkLine(`Obligation ${row.id}: ${row.obligation}`, url(obligationPath(row))),
      ),
      ...figures.filter((figure) => hasFigureArt(figure.id)).map((figure) =>
        linkLine(`Figure: ${figure.title}`, url(`/figures/${figure.id}`), figure.alt),
      ),
      ...getGlossary().map((entry) => linkLine(`Term: ${entry.term}`, url(entry.url))),
    ]),
  ];

  return textResponse(document(blocks));
};
