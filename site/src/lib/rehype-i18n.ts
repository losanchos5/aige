// rehype-i18n: make a translated Markdown file (I18N_DIR/<lang>/...) render
// with the English page's anchors. It runs right after rehype-slug and does
// nothing to an English file.
//
//   1. Heading ids. The English source is rendered once with the same Markdown
//      defaults and heading plugins (GFM, smartypants, remark-lead, rehype-slug),
//      and each translated heading, in document order, takes the id of the
//      English heading at the same position. So /es/bok/x#some-section works for
//      every #anchor that works on /bok/x, and the TOC, deep links and search
//      results point at the same sections in both languages. The two heading
//      lists must match one to one (same count, same level at every position);
//      if they do not, the build fails naming the file and the first heading
//      that differs. Each heading also keeps its English text in
//      `node.data.sourceHeading`, which rehype-diagrams matches figure
//      placements against (placements name English headings).
//   2. Internal links. A link to a chapter, pattern, the Thesis or /bok goes to
//      the same-language page when that page exists, else stays on English
//      (lib/i18n-content.ts `localizeHref`).
//   3. The glossary chapter. Each `**Term.**` paragraph takes the id and the
//      term-page link of the English term at the same position, so
//      /de/bok/glossary#t-agent-registry resolves and the term links reach the
//      existing /glossary/<slug> pages. rehype-glossary leaves translated files
//      alone.

import type { Element, ElementContent, Root } from 'hast';
import type { VFile } from 'vfile';
import { readFileSync } from 'node:fs';
import { resolve } from 'node:path';
import { createMarkdownProcessor, type MarkdownProcessor } from '@astrojs/markdown-remark';
import { fromHtml } from 'hast-util-from-html';
import { toString } from 'hast-util-to-string';
import rehypeSlug from 'rehype-slug';
import { visit } from 'unist-util-visit';
import remarkLead from './remark-lead';
import remarkCallouts from './remark-callouts';
import {
  classifyFile,
  headingMismatch,
  localizeHref,
  normalise,
  repoRoot,
  type HeadingShape,
  type TranslationFile,
} from './i18n-content';
import { termId, termSlug } from './glossary';

export interface SourceHeading extends HeadingShape {
  slug: string;
}

let processor: Promise<MarkdownProcessor> | undefined;

interface EnglishRender {
  headings: SourceHeading[];
  html: string;
}

const renders = new Map<string, Promise<EnglishRender>>();

/** The English source rendered with the heading-relevant plugins, memoised per file. */
function renderEnglish(source: string): Promise<EnglishRender> {
  const cached = renders.get(source);
  if (cached) return cached;
  const job = (async () => {
    const file = resolve(repoRoot(), source);
    // Frontmatter is not Markdown: Astro strips it before rendering, so do the same.
    const body = readFileSync(file, 'utf8')
      .replace(/\r\n?/g, '\n')
      .replace(/^---\n[\s\S]*?\n---\n/, '');
    processor ??= createMarkdownProcessor({
      syntaxHighlight: false,
      remarkPlugins: [remarkLead, remarkCallouts],
      rehypePlugins: [rehypeSlug],
    });
    // No file path: the plugins then treat it as the English file it is.
    const result = await (await processor).render(body);
    return {
      headings: result.metadata.headings.map((h) => ({ depth: h.depth, slug: h.slug, text: h.text })),
      html: result.code,
    };
  })();
  renders.set(source, job);
  return job;
}

/** The English headings of a source file (repo-relative path), in document order. */
export async function englishHeadings(source: string): Promise<SourceHeading[]> {
  return (await renderEnglish(source)).headings;
}

const HEADING = /^h[1-6]$/;

function headingsOf(tree: Root): Element[] {
  const out: Element[] = [];
  visit(tree, 'element', (node: Element) => {
    if (HEADING.test(node.tagName)) out.push(node);
  });
  return out;
}

/** A glossary term paragraph: `<p><strong>Term.</strong> ...`; returns its strong. */
function termLead(node: Element): Element | undefined {
  if (node.tagName !== 'p') return undefined;
  const first = node.children.find((child) => child.type !== 'text' || child.value.trim() !== '');
  if (!first || first.type !== 'element' || first.tagName !== 'strong') return undefined;
  return toString(first).trim().endsWith('.') ? first : undefined;
}

function termParagraphs(tree: Root): Element[] {
  const out: Element[] = [];
  visit(tree, 'element', (node: Element) => {
    if (termLead(node)) out.push(node);
  });
  return out;
}

async function anchorTranslatedGlossary(tree: Root, translation: TranslationFile, where: string) {
  const englishTree = fromHtml((await renderEnglish(translation.source)).html, { fragment: true });
  const englishTerms = termParagraphs(englishTree as Root).map((p) =>
    toString(termLead(p)!).trim().slice(0, -1),
  );
  const paragraphs = termParagraphs(tree);
  if (paragraphs.length !== englishTerms.length) {
    throw new Error(
      `i18n: ${where}: the glossary has ${paragraphs.length} "**Term.**" paragraph(s), the English source ${englishTerms.length}; they must match one to one`,
    );
  }
  paragraphs.forEach((paragraph, i) => {
    const lead = termLead(paragraph)!;
    const english = englishTerms[i];
    const label = toString(lead).trim().slice(0, -1);
    paragraph.properties = { ...paragraph.properties, id: termId(english) };
    const link: ElementContent = {
      type: 'element',
      tagName: 'a',
      properties: { href: `/glossary/${termSlug(english)}` },
      children: [{ type: 'text', value: label }],
    };
    lead.children = [link, { type: 'text', value: '.' }];
  });
}

export default function rehypeI18n() {
  return async (tree: Root, file: VFile): Promise<void> => {
    const path = file.path ?? file.history.at(-1);
    const translation = classifyFile(path);
    if (!translation) return;
    const where = `${translation.lang}/${translation.kind === 'thesis' ? 'THESIS' : translation.kind === 'chapter' ? `bok/${translation.id}` : `patterns/${translation.id}`}.md`;

    // 1. Heading ids by position against the English source.
    const english = await englishHeadings(translation.source);
    const nodes = headingsOf(tree);
    const problem = headingMismatch(
      english,
      nodes.map((node) => ({ depth: Number(node.tagName.slice(1)), text: toString(node) })),
    );
    if (problem) {
      throw new Error(
        `i18n: ${where} does not match the heading structure of ${translation.source}: ${problem}. A translation keeps every heading of its source, in order and at the same level.`,
      );
    }
    nodes.forEach((node, i) => {
      node.properties = { ...node.properties, id: english[i].slug };
      node.data = { ...node.data, sourceHeading: normalise(english[i].text) } as Element['data'];
    });

    // 2. Internal links stay in the page's language when they can.
    visit(tree, 'element', (node: Element) => {
      if (node.tagName !== 'a') return;
      const href = node.properties?.href;
      if (typeof href === 'string') node.properties.href = localizeHref(href, translation.lang);
    });

    // 3. The glossary chapter's term anchors, by position.
    if (translation.kind === 'chapter' && translation.id === '09-glossary') {
      await anchorTranslatedGlossary(tree, translation, where);
    }
  };
}
