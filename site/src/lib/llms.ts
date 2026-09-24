// llms.ts: the pieces the two plain-text endpoints share, /llms.txt (the index)
// and /llms-full.txt (every chapter and the Thesis in full). Both follow the
// llmstxt.org convention: an H1 with the site name, a `>` blockquote summary, a
// short paragraph, then `##` sections of `- [name](url): notes` links.
//
// Everything is derived from data/site.ts, data/chapters.ts, data/patterns.ts
// and the Markdown sources, so the two files cannot drift from what the site
// renders.

import type { Chapter } from '../data/chapters';
import { site } from '../data/site';
import { stripInline } from './md-parse';

/**
 * Absolute origin without a trailing slash, resolved the same way rss.xml.ts
 * resolves it: the configured `site` at build time, the constant otherwise.
 */
export function originOf(contextSite: URL | undefined): string {
  return (contextSite?.toString() ?? site.url).replace(/\/+$/, '');
}

/** Canonical path of a Body of Knowledge chapter (`trailingSlash: 'never'`). */
export function chapterPath(chapter: Chapter): string {
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

/** The response both endpoints return: UTF-8 plain text. */
export function textResponse(body: string): Response {
  return new Response(body, {
    headers: { 'content-type': 'text/plain; charset=utf-8' },
  });
}
