// rehype-glossary: at build, wrap the first in-prose occurrence of each glossary
// term in a link to its glossary entry, so hover cards (public/glossary-cards.js)
// can surface the definition without leaving the chapter.
//
// Rules (per the V4 brief):
//   - one wrap per term per page (first occurrence only);
//   - whole-word, case-insensitive; longest terms matched first so "agent
//     registry" wins over "registry" at the same spot;
//   - never inside headings, existing links, code, or callout titles;
//   - skip the glossary chapter itself;
//   - at most ~25 links per page.
//
// The slug matches GlossaryIndex's `termId` exactly, so `#<slug>` resolves to the
// `<dt>` anchor on /resources/glossary. `glossarySlug` is the single source of
// truth, re-used by src/pages/glossary.json.ts.

import type { Root, Element, ElementContent, Text } from 'hast';
import { visitParents, SKIP } from 'unist-util-visit-parents';
import { getGlossary } from './glossary';
import { hasClass } from './hast-utils';

const MAX_PER_PAGE = 25;

/** Slug for a glossary term. Must stay identical to GlossaryIndex's `termId`. */
export function glossarySlug(term: string): string {
  return `t-${term
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '')}`;
}

function escapeRegExp(literal: string): string {
  return literal.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

interface Term {
  slug: string;
  regex: RegExp;
}

// Built once: every glossary term as a whole-word, case-insensitive matcher,
// longest term first so specific phrases beat their component words.
const TERMS: Term[] = [...getGlossary()]
  .map((entry) => entry.term)
  .filter((term) => term.length >= 2)
  .sort((a, b) => b.length - a.length)
  .map((term) => ({
    slug: glossarySlug(term),
    regex: new RegExp(`(?<![A-Za-z0-9])${escapeRegExp(term)}(?![A-Za-z0-9])`, 'i'),
  }));

const BLOCKED_TAGS = new Set(['a', 'code', 'pre', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6']);

function text(value: string): Text {
  return { type: 'text', value };
}

function termAnchor(slug: string, label: string): Element {
  return {
    type: 'element',
    tagName: 'a',
    properties: { className: ['term'], href: `/resources/glossary#${slug}`, 'data-term': slug },
    children: [text(label)],
  };
}

interface VFileLike {
  path?: string;
  data?: { astro?: { frontmatter?: { title?: string } } };
}

function isGlossaryFile(file: VFileLike | undefined): boolean {
  const title = file?.data?.astro?.frontmatter?.title ?? '';
  if (/glossary/i.test(title)) return true;
  const path = file?.path ?? '';
  return /09-glossary|glossary\.md/i.test(path);
}

export default function rehypeGlossary() {
  return (tree: Root, file: VFileLike): void => {
    if (TERMS.length === 0 || isGlossaryFile(file)) return;

    const used = new Set<string>();
    let count = 0;

    // Wrap every term that starts inside this one text node, left to right.
    function wrap(value: string): ElementContent[] | null {
      const candidates: { start: number; len: number; slug: string }[] = [];
      for (const term of TERMS) {
        if (used.has(term.slug)) continue;
        term.regex.lastIndex = 0;
        const match = term.regex.exec(value);
        if (match && match.index !== undefined) {
          candidates.push({ start: match.index, len: match[0].length, slug: term.slug });
        }
      }
      if (candidates.length === 0) return null;
      // Earliest start wins; at a tie the longer phrase wins.
      candidates.sort((a, b) => a.start - b.start || b.len - a.len);

      const out: ElementContent[] = [];
      let pos = 0;
      for (const candidate of candidates) {
        if (count >= MAX_PER_PAGE) break;
        if (used.has(candidate.slug) || candidate.start < pos) continue;
        if (candidate.start > pos) out.push(text(value.slice(pos, candidate.start)));
        const end = candidate.start + candidate.len;
        out.push(termAnchor(candidate.slug, value.slice(candidate.start, end)));
        used.add(candidate.slug);
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
