// rehype-glossary: at build, wrap the first in-prose occurrence of each glossary
// term in a link to its term page (/glossary/<slug>), so hover cards
// (public/glossary-cards.js) can surface the definition without leaving the
// chapter and a click lands on the term's canonical page.
//
// Rules (per the V4 brief, extended in v0.5.0):
//   - one wrap per term per page (first occurrence only);
//   - whole-word; a term's surface forms come from glossary.ts `termMatchers`
//     (the term, its head and acronym, explicit aliases), acronyms matched
//     case-sensitively, other forms case-insensitively, longest first so
//     "agent registry" wins over "registry" at the same spot;
//   - never inside headings, existing links, code, callout titles or sources;
//   - at most ~25 links per page.
//
// The glossary chapter itself is not auto-linked. Instead each `**Term.**`
// paragraph gets the term's `t-…` id (so /bok/glossary#t-… anchors resolve,
// including links that reach it through the /resources/glossary redirect) and
// its bold name becomes a link to the term page.

import type { Root, Element, ElementContent, Text } from 'hast';
import { visit } from 'unist-util-visit';
import { visitParents, SKIP } from 'unist-util-visit-parents';
import { toString } from 'hast-util-to-string';
import { termId, termSlug, termMatchers } from './glossary';
import { hasClass } from './hast-utils';
import { classifyFile } from './i18n-content';

const MAX_PER_PAGE = 25;

/**
 * The `t-` id of a glossary term (the hover cards' `data-term` key and the
 * anchor on /bok/glossary). An alias of glossary.ts `termId`, kept for callers.
 */
export function glossarySlug(term: string): string {
  return termId(term);
}

const BLOCKED_TAGS = new Set(['a', 'code', 'pre', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6']);

function text(value: string): Text {
  return { type: 'text', value };
}

function termAnchor(id: string, slug: string, label: string): Element {
  return {
    type: 'element',
    tagName: 'a',
    properties: { className: ['term'], href: `/glossary/${slug}`, 'data-term': id },
    children: [text(label)],
  };
}

interface VFileLike {
  path?: string;
  data?: { astro?: { frontmatter?: { title?: string } } };
}

function isGlossaryFile(file: VFileLike | undefined): boolean {
  const path = (file?.path ?? '').replace(/\\/g, '/');
  if (/(^|\/)09-glossary\.md$/i.test(path)) return true;
  const title = file?.data?.astro?.frontmatter?.title ?? '';
  return /^0?9\.\s*glossary$/i.test(title.trim());
}

/** In the glossary chapter: anchor each term paragraph and link its bold name. */
function anchorGlossaryTerms(tree: Root): void {
  visit(tree, 'element', (node: Element) => {
    if (node.tagName !== 'p') return;
    const first = node.children.find(
      (child) => child.type !== 'text' || child.value.trim() !== '',
    );
    if (!first || first.type !== 'element' || first.tagName !== 'strong') return;
    const label = toString(first).trim();
    if (!label.endsWith('.')) return;
    const term = label.slice(0, -1);
    node.properties = { ...node.properties, id: termId(term) };
    first.children = [
      {
        type: 'element',
        tagName: 'a',
        properties: { href: `/glossary/${termSlug(term)}` },
        children: [text(term)],
      },
      text('.'),
    ];
  });
}

export default function rehypeGlossary() {
  return (tree: Root, file: VFileLike): void => {
    // A translated glossary chapter gets its term anchors from rehype-i18n (by
    // position against the English terms); its bold names are not English.
    const translation = classifyFile(file?.path);
    if (translation?.kind === 'chapter' && translation.id === '09-glossary') return;
    if (isGlossaryFile(file)) {
      anchorGlossaryTerms(tree);
      return;
    }
    const terms = termMatchers();
    if (terms.length === 0) return;

    const used = new Set<string>();
    let count = 0;

    // Wrap every term that starts inside this one text node, left to right.
    function wrap(value: string): ElementContent[] | null {
      const candidates: { start: number; len: number; id: string; slug: string }[] = [];
      for (const term of terms) {
        if (used.has(term.id)) continue;
        let best: RegExpExecArray | null = null;
        for (const pattern of term.patterns) {
          const match = pattern.exec(value);
          if (match && (!best || match.index < best.index)) best = match;
        }
        if (best) {
          candidates.push({
            start: best.index,
            len: best[0].length,
            id: term.id,
            slug: term.slug,
          });
        }
      }
      if (candidates.length === 0) return null;
      // Earliest start wins; at a tie the longer phrase wins.
      candidates.sort((a, b) => a.start - b.start || b.len - a.len);

      const out: ElementContent[] = [];
      let pos = 0;
      for (const candidate of candidates) {
        if (count >= MAX_PER_PAGE) break;
        if (used.has(candidate.id) || candidate.start < pos) continue;
        if (candidate.start > pos) out.push(text(value.slice(pos, candidate.start)));
        const end = candidate.start + candidate.len;
        out.push(termAnchor(candidate.id, candidate.slug, value.slice(candidate.start, end)));
        used.add(candidate.id);
        count += 1;
        pos = end;
      }
      if (pos === 0) return null;
      if (pos < value.length) out.push(text(value.slice(pos)));
      return out;
    }

    visitParents(tree, 'text', (node: Text, ancestors) => {
      if (count >= MAX_PER_PAGE) return;

      const blocked = ancestors.some(
        (ancestor) =>
          ancestor.type === 'element' &&
          (BLOCKED_TAGS.has(ancestor.tagName) ||
            hasClass(ancestor, 'callout-title') ||
            (ancestor.tagName === 'ol' && hasClass(ancestor, 'sources'))),
      );
      if (blocked) return;

      const replacement = wrap(node.value);
      if (!replacement) return;

      const parent = ancestors[ancestors.length - 1];
      if (parent.type !== 'element') return;
      const index = parent.children.indexOf(node);
      if (index === -1) return;

      parent.children.splice(index, 1, ...replacement);
      return [SKIP, index + replacement.length];
    });
  };
}
