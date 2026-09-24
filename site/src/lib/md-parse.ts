// md-parse.ts: small build-time helpers for reading the Body of Knowledge
// Markdown at the repo root and turning it into typed data. Kept dependency-
// light and pure so the data modules and the tests can share one slugger and
// one set of parsers.

import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, resolve } from 'node:path';
// `github-slugger` is what rehype-slug uses to generate heading ids, so using
// it here guarantees our anchors match the ids the built pages actually emit.
import { slug } from 'github-slugger';

// This module lives at <repo>/site/src/lib; the Markdown sources sit at the
// repo root. Resolve against the module location so reads work no matter what
// the process cwd is (build, test or otherwise).
const HERE = dirname(fileURLToPath(import.meta.url));
const REPO_ROOT = resolve(HERE, '../../..');

/** Absolute path to a source file, given its path relative to the repo root. */
export function sourcePath(relativeToRoot: string): string {
  return resolve(REPO_ROOT, relativeToRoot);
}

/** Read a UTF-8 source file, given its path relative to the repo root. */
export function readSource(relativeToRoot: string): string {
  return readFileSync(sourcePath(relativeToRoot), 'utf8');
}

/**
 * Slugify a heading exactly as rehype-slug (github-slugger) would, so a value
 * computed here can be compared to, or used as, an on-page `#anchor`.
 */
export function slugify(text: string): string {
  return slug(text);
}

export interface Heading {
  /** Number of leading `#` characters (1-6). */
  depth: number;
  /** Heading text, trimmed, with any trailing `#` run removed. */
  text: string;
}

/** Extract every ATX heading from a Markdown string, skipping fenced code. */
export function getHeadings(markdown: string): Heading[] {
  const headings: Heading[] = [];
  let inFence = false;
  for (const line of markdown.split(/\r?\n/)) {
    if (/^\s*```/.test(line)) {
      inFence = !inFence;
      continue;
    }
    if (inFence) continue;
    const match = /^(#{1,6})\s+(.*?)\s*#*\s*$/.exec(line);
    if (match) headings.push({ depth: match[1].length, text: match[2].trim() });
  }
  return headings;
}

export interface Section {
  /** The heading text at the requested depth. */
  heading: string;
  /** Everything between this heading and the next heading of the same depth. */
  body: string;
}

/** Split Markdown into sections at the given heading depth (default H2). */
export function splitSections(markdown: string, depth = 2): Section[] {
  const heading = new RegExp(`^#{${depth}}\\s+(.*)$`);
  const sections: { heading: string; lines: string[] }[] = [];
  let current: { heading: string; lines: string[] } | undefined;
  let inFence = false;
  for (const line of markdown.split(/\r?\n/)) {
    if (/^\s*```/.test(line)) inFence = !inFence;
    const match = inFence ? null : heading.exec(line);
    if (match) {
      current = { heading: match[1].trim(), lines: [] };
      sections.push(current);
    } else if (current) {
      current.lines.push(line);
    }
  }
  return sections.map((section) => ({
    heading: section.heading,
    body: section.lines.join('\n'),
  }));
}

/** Remove inline Markdown noise (`**`, backticks, `[n]` citations) from text. */
export function stripInline(text: string): string {
  return text
    .replace(/\*\*/g, '')
    .replace(/`/g, '')
    .replace(/\s*\[\d+\]/g, '')
    .replace(/\s{2,}/g, ' ')
    .trim();
}

export interface Definition {
  /** The bold term, without its trailing period. */
  term: string;
  /** The definition prose, citations and the chapter pointer removed. */
  definition: string;
  /** Zero-padded chapter numbers the term is cross-referenced to. */
  chapterRefs: string[];
  /** Uppercase first character of the term, for alphabetical grouping. */
  letter: string;
}

/**
 * Parse paragraphs of the form `**Term.** definition … (ch. 04, 06)` up to the
 * `## Sources` block. Used for the glossary; wrapped lines are re-joined first.
 */
export function parseDefinitions(markdown: string): Definition[] {
  const body = markdown.split(/^##\s+Sources\s*$/m)[0];
  const paragraphs = body.split(/\n\s*\n/);
  const definitions: Definition[] = [];
  for (const paragraph of paragraphs) {
    const joined = paragraph.replace(/\s*\r?\n\s*/g, ' ').trim();
    const match = /^\*\*(.+?)\.\*\*\s+(.+)$/.exec(joined);
    if (!match) continue;
    const term = match[1].trim();
    const rest = match[2];
    const refMatch = /\(ch\.\s*([0-9,\s]+)\)\s*$/.exec(rest);
    const chapterRefs = refMatch
      ? refMatch[1].split(',').map((n) => n.trim()).filter(Boolean)
      : [];
    const definition = stripInline(rest.replace(/\(ch\.\s*[0-9,\s]+\)\s*$/, ''));
    definitions.push({
      term,
      definition,
      chapterRefs,
      letter: term.charAt(0).toUpperCase(),
    });
  }
  return definitions;
}

export interface AnnotatedItem {
  /** The bold title at the head of the bullet. */
  title: string;
  /** The one-line annotation between the title and the URL. */
  note: string;
  /** The backtick-wrapped URL, if present. */
  url?: string;
  /** The `(verified: …)` tag, if present. */
  verified?: string;
}

/**
 * Parse a bullet list whose items read `- **Title** — note. \`url\` (verified: tag)`.
 * Continuation lines (indented wraps) are folded into their bullet; a blank
 * line ends the list so trailing prose (e.g. a `**Maps to:**` line) is ignored.
 */
export function parseAnnotatedList(body: string): AnnotatedItem[] {
  const chunks: string[] = [];
  let current: string | undefined;
  for (const line of body.split(/\r?\n/)) {
    if (/^\s*-\s+/.test(line)) {
      current = line.trim();
      chunks.push(current);
    } else if (line.trim() === '') {
      current = undefined;
    } else if (current !== undefined) {
      chunks[chunks.length - 1] += ` ${line.trim()}`;
    }
  }

  const items: AnnotatedItem[] = [];
  for (const chunk of chunks) {
    const titleMatch = /^-\s+\*\*(.+?)\*\*/.exec(chunk);
    if (!titleMatch) continue;
    const title = stripInline(titleMatch[1]);
    // The URL is the backtick token that starts with http; a note may itself
    // contain backticked terms (e.g. `OSCAL`), so match the URL specifically.
    const urlMatch = /`(https?:\/\/[^`]+)`/.exec(chunk);
    const verifiedMatch = /\(verified:\s*([^)]+)\)/.exec(chunk);
    const note = stripInline(
      chunk
        .slice(titleMatch[0].length)
        .replace(/`https?:\/\/[^`]+`/g, '')
        .replace(/\(verified:[^)]*\)/g, ''),
    )
      .replace(/^[:—–-]\s*/, '')
      .replace(/\s*[.;]\s*$/, '')
      .trim();
    items.push({
      title,
      note,
      url: urlMatch ? urlMatch[1].trim() : undefined,
      verified: verifiedMatch ? verifiedMatch[1].trim() : undefined,
    });
  }
  return items;
}
