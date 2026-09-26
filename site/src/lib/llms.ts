// llms.ts: the pieces the plain-text endpoints share, /llms.txt (the index),
// /llms-full.txt and its slices (the corpus in full, lib/llms-corpus.ts), and
// the Markdown alternates of the content pages (/bok/<slug>.md and the like).
// The text files follow the llmstxt.org convention: an H1 with the site name, a
// `>` blockquote summary, a short paragraph, then `##` sections of
// `- [name](url): notes` links.
//
// Everything is derived from data/site.ts, data/chapters.ts, data/patterns.ts
// and the Markdown sources, so the files cannot drift from what the site
// renders.

import { chaptersOrdered, type Chapter } from '../data/chapters';
import { cases, type IncidentCase } from '../data/cases';
import { comparisons, comparisonPath } from '../data/comparisons';
import { profiles, profilePath } from '../data/controls';
import { patterns, patternPath } from '../data/patterns';
import { researchPath, writtenThemes } from '../data/research';
import { site } from '../data/site';
import { getGlossary } from './glossary';
import { stripInline } from './md-parse';

/**
 * Absolute origin without a trailing slash, resolved the same way rss.xml.ts
 * resolves it: the configured `site` at build time, the constant otherwise.
 */
export function originOf(contextSite: URL | undefined): string {
  return (contextSite?.toString() ?? site.url).replace(/\/+$/, '');
}

/** Canonical path of a Body of Knowledge chapter (`trailingSlash: 'never'`). */
export function chapterPath(chapter: Pick<Chapter, 'slug'>): string {
  return `/bok/${chapter.slug}`;
}

/** The chapter whose position the pattern pages follow in reading order. */
export const PATTERNS_CHAPTER_ID = '05-patterns';

/** One link line in the spec's format; the notes are optional. */
export function linkLine(name: string, url: string, notes?: string): string {
  return notes ? `- [${name}](${url}): ${notes}` : `- [${name}](${url})`;
}

export interface DocLead {
  /** The document H1, inline Markdown stripped. */
  title: string;
  /** The one-line abstract, inline Markdown stripped; '' when there is none. */
  summary: string;
}

// The labels remark-callouts recognises: a blockquote opening with one of them
// is a callout, not the abstract.
const CALLOUT_RE = /^\*\*(?:In practice|Example|Anti-pattern|Postings|Note|Warning)/i;

/**
 * The title and abstract of a Markdown source: the same two pieces remark-lead
 * hands the Doc layout. The abstract is the opening blockquote (every chapter
 * has one); the Thesis opens with a bold lead sentence instead, so that is the
 * fallback.
 */
export function docLead(markdown: string): DocLead {
  const lines = markdown.split(/\r?\n/);
  const titleIndex = lines.findIndex((line) => /^#\s+/.test(line));
  if (titleIndex === -1) return { title: '', summary: '' };

  const title = stripInline(lines[titleIndex].replace(/^#\s+/, ''));
  const rest = lines.slice(titleIndex + 1);

  const quote: string[] = [];
  for (const line of rest) {
    if (/^\s*>/.test(line)) {
      const text = line.replace(/^\s*>\s?/, '').trim();
      if (quote.length === 0 && CALLOUT_RE.test(text)) break;
      quote.push(text);
    } else if (quote.length > 0) {
      break; // a blank or plain line ends the first blockquote
    }
  }
  if (quote.length > 0) return { title, summary: stripInline(quote.join(' ')) };

  const bold = /\*\*([\s\S]+?)\*\*/.exec(rest.join('\n'));
  return { title, summary: bold ? stripInline(bold[1].replace(/\s+/g, ' ')) : '' };
}

/** Drop the leading H1 from a source body; the caller emits its own. */
export function withoutTitle(markdown: string): string {
  return markdown.replace(/^\s*#\s+.*(?:\r?\n)?/, '').replace(/^\s+/, '');
}

/**
 * The header both files open with: `# <site name>`, the `>` summary and one
 * paragraph of provenance followed by the caller's own orientation line.
 */
export function header(orientation: string): string {
  const provenance =
    `Body of Knowledge v${site.bokVersion} by ${site.authors.join(', ')}, licensed ${site.license}.`;
  return [`# ${site.name}`, '', `> ${site.description}`, '', `${provenance} ${orientation}`].join(
    '\n',
  );
}

/** Join blocks of lines into the final document, one blank line between them. */
export function document(blocks: readonly string[]): string {
  return `${blocks.filter((block) => block !== '').join('\n\n')}\n`;
}

/** The response the text endpoints return: UTF-8 plain text. */
export function textResponse(body: string): Response {
  return new Response(body, {
    headers: { 'content-type': 'text/plain; charset=utf-8' },
  });
}

/**
 * A rough token count for a text, stated beside each llms-full slice so a
 * reader can tell whether it fits its context: about four characters per token
 * for English prose, rounded to the nearest thousand.
 */
export function approxTokens(text: string): string {
  const thousands = Math.max(1, Math.round(text.length / 4 / 1000));
  return `about ${thousands}k tokens`;
}

// ---- Markdown alternates ----------------------------------------------------
//
// Every English content page with a Markdown source (the pillar page
// /ai-governance, the chapters, the pattern pages, the glossary terms, the
// incident cases, the framework comparisons under /resources/crosswalk, the
// role landing /role, the Thesis and the research notes) is also served as
// clean Markdown at its URL plus `.md` (/bok/definition.md), for agents and
// assistants that read Markdown better than HTML. Seo.astro advertises it with
// <link rel="alternate" type="text/markdown">; /llms.txt lists it.

/** Canonical path of the pillar page, "What is AI governance?" (guides/ai-governance.md). */
export const PILLAR_PATH = '/ai-governance';

/** Canonical path of the role landing, "What an AI Governance Engineer does" (pages/role.astro). */
export const ROLE_PATH = '/role';

/** Canonical path of an incident case. */
export function casePath(entry: Pick<IncidentCase, 'id'>): string {
  return `/cases/${entry.id}`;
}

/** The fields each Markdown alternate opens with, as YAML frontmatter. */
export interface MarkdownMeta {
  title: string;
  /** One-line abstract; omitted when empty. */
  description?: string;
  /** Canonical path of the HTML page, e.g. /bok/definition. */
  path: string;
  /** YYYY-MM-DD of the last commit to the page's source. */
  updated: string;
  /** The document's own version (a research note's); default: the Body of Knowledge version. */
  version?: string;
  /** The DOI the document cites (a research note: the concept DOI); default: site.doi. */
  doi?: string;
}

/**
 * A Markdown alternate: YAML frontmatter (title, canonical URL, author, licence,
 * DOI, version, last updated), then `# title`, then the body. String values are
 * JSON-quoted, which is valid YAML and survives colons and quotes in titles.
 */
export function markdownDocument(meta: MarkdownMeta, body: string): string {
  const lines = [
    '---',
    `title: ${JSON.stringify(meta.title)}`,
    ...(meta.description ? [`description: ${JSON.stringify(meta.description)}`] : []),
    `canonical: ${site.url}${meta.path}`,
    `author: ${JSON.stringify(site.authors.join(', '))}`,
    `license: ${JSON.stringify(`${site.license} (${site.licenseUrl})`)}`,
    `doi: https://doi.org/${meta.doi ?? site.doi}`,
    `version: ${JSON.stringify(meta.version ?? site.bokVersion)}`,
    `updated: ${meta.updated}`,
    '---',
    '',
    `# ${meta.title}`,
    '',
    body.trim(),
  ];
  return `${lines.join('\n')}\n`;
}

/** The response of a Markdown alternate: UTF-8 Markdown. */
export function markdownResponse(body: string): Response {
  return new Response(body, {
    headers: { 'content-type': 'text/markdown; charset=utf-8' },
  });
}

let markdownPaths: Set<string> | undefined;

/**
 * The path of a page's Markdown alternate, or null when it has none. Takes the
 * pathname as Astro reports it (`build.format: 'file'` adds `.html`) or clean.
 * Only English pages have one: a translated chapter's path never matches.
 */
export function markdownAlternateFor(pathname: string): string | null {
  markdownPaths ??= new Set([
    PILLAR_PATH,
    ...chaptersOrdered.map((chapter) => chapterPath(chapter)),
    ...patterns.map((pattern) => patternPath(pattern)),
    ...getGlossary().map((entry) => entry.url),
    ...cases.map((entry) => casePath(entry)),
    ...comparisons.map((c) => comparisonPath(c)),
    ...profiles.map(profilePath),
    ROLE_PATH,
    '/thesis',
    ...writtenThemes().map(researchPath),
  ]);
  const clean = pathname.replace(/\.html$/, '').replace(/\/index$/, '').replace(/\/+$/, '');
  return markdownPaths.has(clean) ? `${clean}.md` : null;
}
