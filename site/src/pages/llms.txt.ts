// /llms.txt: the plain-text index an LLM reads to find its way around the site,
// in the llmstxt.org format: an H1, a `>` summary, a paragraph of provenance and
// then one `##` section per group of `- [name](url): notes` links. Every title
// and summary comes from data/chapters.ts, the pattern files' frontmatter, the
// datasets or the Markdown sources themselves, so this file says exactly what
// the rendered pages say.
//
// Coverage is derived, not typed: the dynamic pages come from their datasets
// and every static page from src/pages through lib/llms-routes.ts (filtered by
// the sitemap's own `inSitemap`), and a static page no section below describes
// still lands under "More pages". tests/geo.spec.ts fails when a sitemap URL is
// missing here. The content pages link their Markdown alternates (<url>.md),
// and the full text is at /llms-full.txt, also split into the slices of
// lib/llms-corpus.ts.
import type { APIRoute } from 'astro';
import { chaptersOrdered, chapterParts } from '../data/chapters';
import { patternPath } from '../data/patterns';
import { site } from '../data/site';
import { obligations, obligationPath } from '../data/frameworks';
import { figures } from '../data/figures';
import { cases } from '../data/cases';
import { tools as toolkitTools, toolNotice } from '../data/toolkit';
import { audiences, audiencePath } from '../data/audiences';
import { liveSiblingHubs } from '../lib/audiences';
import { firstSentence, getGlossary } from '../lib/glossary';
import { hasFigureArt } from '../lib/figure-reuse';
import { loadPatternPages } from '../lib/pattern-pages';
import { llmsFullText, llmsSlices } from '../lib/llms-corpus';
import { hasStaticRoute, pageMeta, staticRoutes } from '../lib/llms-routes';
import {
  approxTokens,
  casePath,
  chapterPath,
  docLead,
  document,
  header,
  linkLine,
  markdownAlternateFor,
  originOf,
  textResponse,
} from '../lib/llms';
import { readSource } from '../lib/md-parse';

/** The public endpoint of tools/mcp-server (README, "Connect a client"). */
const MCP_ENDPOINT = 'https://mcp.aigovernanceengineer.com/mcp';

/** The pillar page ("What is AI governance?"), listed first once it exists. */
const PILLAR_PATH = '/ai-governance';

export const GET: APIRoute = async (context) => {
  const origin = originOf(context.site);
  const url = (path: string) => `${origin}${path}`;

  const patternPages = await loadPatternPages();
  const thesisEn = docLead(readSource('THESIS.md'));
  const thesisEs = docLead(readSource('THESIS.es.md'));

  // Every same-site path a section links, so the pages no section describes
  // can be listed at the end instead of being silently left out.
  const listed = new Set<string>();

  /** A link to a page of this site, with its Markdown alternate when it has one. */
  const page = (name: string, path: string, notes?: string) => {
    listed.add(path);
    const markdown = markdownAlternateFor(path);
    const withMarkdown = markdown
      ? [notes, `Markdown: ${url(markdown)}`].filter(Boolean).join(' ')
      : notes;
    return linkLine(name, url(path), withMarkdown);
  };

  /** A static page described by its own source, when it has no hand-written line. */
  const described = (path: string, fallbackName: string, fallbackNotes?: string) => {
    const route = staticRoutes().find((r) => r.path === path);
    const meta = route ? pageMeta(route) : { title: '', description: '' };
    return page(meta.title || fallbackName, path, meta.description || fallbackNotes);
  };

  const section = (heading: string, lines: readonly string[]) =>
    [`## ${heading}`, '', ...lines].join('\n');

  const definition = chaptersOrdered.find((chapter) => chapter.slug === 'definition');

  const sliceLines = await Promise.all(
    llmsSlices.map(async (slice) => {
      const text = await llmsFullText(slice.id);
      return linkLine(slice.title, url(slice.path), `${slice.summary} (${approxTokens(text)})`);
    }),
  );
  const fullText = await llmsFullText('full');

  const blocks = [
    header(
      `This file indexes every page of the English site. Each chapter, pattern, glossary term, incident case and the Thesis also has a clean Markdown version at its URL plus .md (linked on its line below, except the glossary terms, where the rule applies as is). The full text is at ${url('/llms-full.txt')}, and in smaller slices listed under "Full text".`,
    ),

    section('Start here', [
      ...(hasStaticRoute(PILLAR_PATH)
        ? [
            described(
              PILLAR_PATH,
              'What is AI governance?',
              'What AI governance is and how it is engineered, with links into the Body of Knowledge.',
            ),
          ]
        : []),
      ...(definition
        ? [page(definition.title, chapterPath(definition), definition.summary)]
        : []),
      page(
        'Body of Knowledge',
        '/bok',
        `The index of the ${chaptersOrdered.length} chapters in ${chapterParts.length} parts, from the definition to the law.`,
      ),
      page('Home', '/', site.description),
    ]),

    section(
      'Body of Knowledge',
      chaptersOrdered.map((chapter) => page(chapter.title, chapterPath(chapter), chapter.summary)),
    ),

    section('Patterns', [
      page(
        'Pattern catalogue',
        '/patterns',
        `The ${patternPages.length} patterns below, grouped by the five stack layers. Chapter 05 (${url('/bok/patterns')}) keeps the template and a summary of each.`,
      ),
      ...patternPages.map(({ entry, def }) =>
        page(`Pattern: ${def.title}`, patternPath(def), entry.data.summary),
      ),
    ]),

    section('Law, obligations and crosswalk', [
      page(
        'Obligation register',
        '/obligations',
        `The ${obligations.length} obligations the book maps, one page each (listed under Optional), with a stable id (AIGE-OBL-<instrument>-<clause>), the duty holder, the date it applies from, its status, the artefact that evidences it and its stack layer. Illustrative, not a claim of conformity.`,
      ),
      page(
        'Obligation register (CSV)',
        '/resources/obligations.csv',
        'The same register as one row per obligation.',
      ),
      page('Obligation register (JSON)', '/resources/obligations.json', 'The same register as JSON.'),
      page(
        'Frameworks',
        '/resources/frameworks',
        'The laws, standards, codes and control sets the Body of Knowledge maps against, with the obligation, artefact and stack-layer matrix. Illustrative, not a claim of conformity.',
      ),
      page(
        'Topic × framework crosswalk',
        '/resources/crosswalk',
        'Each Body of Knowledge topic mapped to the EU AI Act, ISO, NIST and Chinese instruments that govern it, clause by clause. Illustrative, not a claim of conformity.',
      ),
      page(
        'Crosswalk (CSV)',
        '/resources/crosswalk.csv',
        'The same mapping as one row per reference, RFC 4180 escaped.',
      ),
      page(
        'Crosswalk (JSON)',
        '/resources/crosswalk.json',
        'The same mapping as JSON, with the disclaimer, version and licence in the payload.',
      ),
      page(
        'AI contract and licence clauses',
        '/resources/contracts',
        'The clauses to check before you deploy a third-party AI system: what each governs, the red flag, a fallback position and the evidence to keep. An engineering checklist, not legal advice.',
      ),
    ]),

    section('Toolkit', [
      page('Toolkit', '/toolkit', `Browser tools built from the book that produce documents you keep. ${toolNotice}`),
      ...toolkitTools
        .filter((tool) => tool.status === 'live')
        .map((tool) => page(`Toolkit: ${tool.title}`, tool.href, tool.summary)),
    ]),

    section('Data, API and MCP', [
      page(
        'Open data and API',
        '/resources/data',
        'How to reuse the registers behind the site: static JSON under /api/v1 with a JSON Schema per dataset, an OpenAPI description, stable ids, the versioning promise and the CC BY 4.0 licence.',
      ),
      page(
        'API catalogue (JSON)',
        '/api/v1/index.json',
        'The machine-readable list of every /api/v1 dataset with its schema and page.',
      ),
      page('OpenAPI description', '/api/v1/openapi.json', 'The /api/v1 datasets described as OpenAPI.'),
      page(
        'Glossary (JSON)',
        '/glossary.json',
        'Every term with its definition, chapter references and page URL, as JSON.',
      ),
      page(
        'MCP server: how to connect',
        '/mcp',
        'How to connect Claude, Claude Code or any MCP client to the public read-only server, and the ten tools it offers.',
      ),
      linkLine(
        'Remote MCP server (read-only)',
        MCP_ENDPOINT,
        'A Model Context Protocol server (Streamable HTTP, no authentication) over the same /api/v1 data: the obligation register, the crosswalk, the glossary, the patterns, the templates and schemas, and the chapters; every answer names its source page. Live since 2026-09-25; its code and self-hosting guide are in tools/mcp-server of the repository.',
      ),
      page(
        'MCP server card',
        '/.well-known/mcp.json',
        'The machine-readable description of the MCP server: endpoint, transport, authentication, version and tools.',
      ),
    ]),

    section('Cases, harms and threats', [
      page(
        'Cases',
        '/cases',
        'Publicly documented AI incidents written as engineering post-mortems: what happened, the failure mode, the control that would have caught it, the evidence it would have left and the obligations it touches.',
      ),
      ...cases.map((entry) => page(`Case: ${entry.title}`, casePath(entry), entry.summary)),
      page(
        'Harms atlas',
        '/resources/harms',
        'The harms AI systems cause to individuals, groups, organisations, society and the environment: each with its failure mode, the control that catches it, the evidence it leaves and real incidents.',
      ),
      page('Harms atlas (JSON)', '/resources/harms.json', 'The same atlas as JSON.'),
      described('/resources/threats', 'AI threat bridge'),
      page('Threat bridge (CSV)', '/resources/threats.csv', 'The same threat bridge as CSV.'),
    ]),

    section('Interactive views', [
      described('/stack', 'The stack'),
      described('/role', 'The role'),
      described('/path', 'The learning path'),
      page(
        'Discipline map',
        '/map',
        'The whole discipline on one page: every chapter, layer, pattern, workflow, obligation, maturity level and learning stage, as a mind map and as a linked list.',
      ),
      page(
        'Governing AI agents',
        '/agents',
        'The agent control plane in one place: registry, identity and short-lived credentials, tool permissions, human checkpoints, guardrails, kill switches, the patterns and the threats they answer, routed into chapter 23.',
      ),
    ]),

    section('Routes by audience', [
      page(
        'Routes by audience',
        '/for',
        'Six routes through the site, one per audience, each with what to do this week, the obligations that bind that audience and the questions it asks.',
      ),
      ...audiences.map((audience) => page(audience.navLabel, audiencePath(audience), audience.summary)),
      ...liveSiblingHubs().map((hub) => page(hub.label, `/for/${hub.slug}`, hub.summary)),
    ]),

    section('Thesis', [
      page(thesisEn.title, '/thesis', thesisEn.summary),
      page(thesisEs.title, '/es/thesis', `Spanish translation of the Thesis. ${thesisEs.summary}`),
    ]),

    section('Resources', [
      page(
        'Templates and schemas',
        '/resources/templates',
        'JSON Schemas, filled examples and human templates for the records AI governance produces, each field tagged with the obligations it helps evidence. Illustrative, not a claim of conformity.',
      ),
      page(
        'Figures',
        '/figures',
        `The ${figures.length} infographics and the interactive diagrams of the Body of Knowledge, each infographic with its own page, a text alternative, SVG and PNG downloads and a citation.`,
      ),
      page(
        'Glossary',
        '/bok/glossary',
        `Chapter 09: ${getGlossary().length} terms, each defined once with its source, and each with its own page under /glossary/ (listed with its definition under Optional) and a Markdown version at /glossary/<slug>.md.`,
      ),
      page(
        'Tool categories',
        '/resources/tools',
        'Tool categories for each stack layer, every tool with its licence and access model: examples, not endorsements.',
      ),
      page(
        'Reading list',
        '/bok/reading-list',
        `Chapter 10, the canonical annotated bibliography; ${url('/resources/reading-list')} is the same list with audience and jurisdiction filters.`,
      ),
      page(
        'Resources index',
        '/resources',
        'Frameworks, the obligation register, the crosswalk, harms, cases, contracts, templates, figures, tools, the toolkit, the reading list, the glossary, the open data and the discipline map, all extracted from the Body of Knowledge.',
      ),
    ]),

    section('Full text', [
      linkLine(
        'Full text: everything',
        url('/llms-full.txt'),
        `Every chapter, every pattern, the Thesis, the obligation register, the frameworks, the crosswalk, the incident cases and the harms atlas, as Markdown, in one file (${approxTokens(fullText)}). Too large for most context windows: prefer the slices below.`,
      ),
      ...sliceLines,
    ]),

    section('Feeds and citation', [
      page('RSS feed', '/rss.xml', 'New and updated chapters and each released version, newest first.'),
      linkLine(
        'Zenodo record',
        `https://doi.org/${site.conceptDoi}`,
        site.doi !== site.conceptDoi
          ? `Archived releases of the Thesis and Body of Knowledge; this concept DOI always resolves to the latest. Current release: https://doi.org/${site.doi}.`
          : 'Archived releases of the Thesis and Body of Knowledge; this concept DOI always resolves to the latest.',
      ),
    ]),

    section('About', [
      page('About', '/about', `Who writes this, how to contribute and how to get in touch. Licensed ${site.license}.`),
      page(
        'Methodology',
        '/about/methodology',
        'How sources are chosen and tagged, how dated claims are re-verified, how corrections and reviews work, and how releases are versioned with DOIs.',
      ),
      described('/about/changelog', 'Changelog'),
      described('/about/contributors', 'Contributors'),
    ]),
  ];

  // Any static page no section above names: listed with its own title and
  // description, so a new page is indexed the day it ships.
  const unlisted = staticRoutes().filter((route) => !listed.has(route.path));
  if (unlisted.length > 0) {
    blocks.push(
      section(
        'More pages',
        unlisted.map((route) => {
          const meta = pageMeta(route);
          return page(meta.title || route.path, route.path, meta.description || undefined);
        }),
      ),
    );
  }

  // llmstxt.org: the "Optional" section holds the URLs a reader with a short
  // context can skip. Here: one page per obligation, per figure and per term,
  // each with its first sentence so the line itself answers "what is it".
  blocks.push(
    section('Optional', [
      ...obligations.map((row) =>
        page(`Obligation ${row.id}: ${row.obligation}`, obligationPath(row), firstSentence(row.requirement)),
      ),
      ...figures
        .filter((figure) => hasFigureArt(figure.id))
        .map((figure) => page(`Figure: ${figure.title}`, `/figures/${figure.id}`, figure.alt)),
      ...getGlossary().map((entry) =>
        linkLine(`Term: ${entry.term}`, url(entry.url), firstSentence(entry.definition)),
      ),
    ]),
  );

  return textResponse(document(blocks));
};
