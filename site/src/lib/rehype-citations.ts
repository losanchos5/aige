// rehype-citations: link inline [n] markers to the source list and give each
// source an anchor.
//
// The Markdown carries citations as `[n]` (and occasionally `[n][m]`) in prose,
// pointing at a `## Sources` block where each source sits on its own line as
// `[n] … (verified: …)`. That block is a single paragraph, not a list, so this
// plugin:
//
//   1. rebuilds the Sources paragraph into `<ol class="sources">` with one
//      `<li id="src-n">` per source, wrapping the trailing `(verified: …)`
//      fragment in `<span class="verified">`;
//   2. wraps every inline `[n]` in `<sup><a class="cite" href="#src-n">n</a></sup>`,
//      never touching code, links or the Sources list itself.

import type { Root, Element, ElementContent, Text } from 'hast';
import { visitParents, SKIP } from 'unist-util-visit-parents';
import { toString } from 'hast-util-to-string';
import { hasClass } from './hast-utils';

const CITE_RE = /\[(\d+)\]/g;

interface SourceEntry {
  num: string;
  nodes: ElementContent[];
}

function text(value: string): Text {
  return { type: 'text', value };
}

function splitSourceEntries(children: ElementContent[]): SourceEntry[] {
  const entries: SourceEntry[] = [];
  let current: SourceEntry | undefined;

  for (const node of children) {
    if (node.type === 'text') {
      const parts = node.value.split('\n');
      parts.forEach((part, i) => {
        const match = part.match(/^\s*\[(\d+)\]\s?/);
        if ((i > 0 || current === undefined) && match) {
          current = { num: match[1], nodes: [] };
          entries.push(current);
          const rest = part.slice(match[0].length);
          if (rest) current.nodes.push(text(rest));
        } else if (current) {
          if (i > 0) current.nodes.push(text(' '));
          if (part) current.nodes.push(text(part));
        }
      });
    } else if (current) {
      current.nodes.push(node);
    }
  }

  return entries;
}

function wrapVerified(nodes: ElementContent[]): ElementContent[] {
  for (let i = nodes.length - 1; i >= 0; i--) {
    const node = nodes[i];
    if (node.type !== 'text') break;
    const match = node.value.match(/\(verified:[^)]*\)\s*$/);
    if (match && match.index !== undefined) {
      const before = node.value.slice(0, match.index);
      const span: Element = {
        type: 'element',
        tagName: 'span',
        properties: { className: ['verified'] },
        children: [text(match[0].trim())],
      };
      const replacement: ElementContent[] = before ? [text(before), span] : [span];
      return [...nodes.slice(0, i), ...replacement, ...nodes.slice(i + 1)];
    }
    if (node.value.trim() !== '') break;
  }
  return nodes;
}

function buildEntry(entry: SourceEntry): Element {
  return {
    type: 'element',
    tagName: 'li',
    properties: { id: `src-${entry.num}` },
    children: [
      {
        type: 'element',
        tagName: 'span',
        properties: { className: ['src-num'] },
        children: [text(`[${entry.num}]`)],
      },
      text(' '),
      ...wrapVerified(entry.nodes),
    ],
  };
}

// Heading labels that open the back-matter source list. The Spanish translation
// of the Thesis heads it "Fuentes"; the entries themselves are identical.
const SOURCES_HEADINGS = new Set(['sources', 'fuentes']);

function transformSources(tree: Root): void {
  const kids = tree.children;
  const headingIndex = kids.findIndex(
    (node): node is Element =>
      node.type === 'element' &&
      node.tagName === 'h2' &&
      SOURCES_HEADINGS.has(toString(node).trim().toLowerCase()),
  );
  if (headingIndex === -1) return;

  let paragraphIndex = -1;
  for (let i = headingIndex + 1; i < kids.length; i++) {
    const node = kids[i];
    if (node.type !== 'element') continue;
    if (node.tagName === 'p') paragraphIndex = i;
    break;
  }
  if (paragraphIndex === -1) return;

  const paragraph = kids[paragraphIndex] as Element;
  const entries = splitSourceEntries(paragraph.children);
  if (entries.length === 0) return;

  kids[paragraphIndex] = {
    type: 'element',
    tagName: 'ol',
    properties: { className: ['sources'] },
    children: entries.map(buildEntry),
  };
}

// Closing punctuation that should sit tight against a citation marker. When a
// marker is immediately followed by one of these, the whitespace *before* the
// marker is dropped so the number hugs the preceding word and the punctuation
// stays tight after it ("text³." rather than "text ³ .").
const CITE_TIGHT = /[.,;:)]/;

function citeAnchor(n: string): Element {
  return {
    type: 'element',
    tagName: 'a',
    properties: { className: ['cite'], href: `#src-${n}`, 'aria-label': `Source ${n}` },
    children: [text(n)],
  };
}

function buildCiteNodes(value: string): ElementContent[] {
  const matches = [...value.matchAll(/\[(\d+)\]/g)];
  if (matches.length === 0) return [text(value)];

  const out: ElementContent[] = [];
  let last = 0;
  let i = 0;
  while (i < matches.length) {
    const start = matches[i];
    const startIndex = start.index ?? 0;

    // Fold a run of adjacent markers ([1][2][3]) into one <sup> so they read as
    // a single grouped citation, not a stack of chips.
    const nums = [start[1]];
    let runEnd = startIndex + start[0].length;
    let j = i + 1;
    while (j < matches.length && matches[j].index === runEnd) {
      nums.push(matches[j][1]);
      runEnd += matches[j][0].length;
      j++;
    }

    // Text before the run; trim only the whitespace immediately preceding the
    // marker, and only when a closing punctuation mark follows it.
    let before = value.slice(last, startIndex);
    if (CITE_TIGHT.test(value[runEnd] ?? '')) before = before.replace(/\s+$/, '');
    if (before) out.push(text(before));

    out.push({ type: 'element', tagName: 'sup', properties: {}, children: nums.map(citeAnchor) });

    last = runEnd;
    i = j;
  }
  if (last < value.length) out.push(text(value.slice(last)));
  return out;
}

function linkCitations(tree: Root): void {
  visitParents(tree, 'text', (node: Text, ancestors) => {
    const blocked = ancestors.some(
      (ancestor) =>
        ancestor.type === 'element' &&
        (ancestor.tagName === 'a' ||
          ancestor.tagName === 'code' ||
          ancestor.tagName === 'pre' ||
          (ancestor.tagName === 'ol' && hasClass(ancestor, 'sources'))),
    );
    if (blocked) return;

    CITE_RE.lastIndex = 0;
    if (!CITE_RE.test(node.value)) return;

    const parent = ancestors[ancestors.length - 1];
    if (parent.type !== 'element') return;
    const index = parent.children.indexOf(node);
    if (index === -1) return;

    const replacement = buildCiteNodes(node.value);
    parent.children.splice(index, 1, ...replacement);
    return [SKIP, index + replacement.length];
  });
}

function isCiteSup(node: ElementContent): node is Element {
  return (
    node.type === 'element' &&
    node.tagName === 'sup' &&
    node.children.some((c) => c.type === 'element' && c.tagName === 'a' && hasClass(c, 'cite'))
  );
}

const PUNCT_HEAD = /^[.,;:)]/;

// After citations are linked, drop the space that sits between a word and a
// citation marker when the marker is immediately followed by closing
// punctuation, so prose reads "word¹." not "word ¹ .". SmartyPants splits a
// paragraph into several text nodes, so the space and the punctuation can end
// up in the siblings on either side of the <sup>; work at the element level to
// reach them.
function tightenCitations(tree: Root): void {
  visitParents(tree, 'element', (node: Element) => {
    const kids = node.children;
    for (let i = 0; i < kids.length; i++) {
      if (!isCiteSup(kids[i])) continue;
      const next = kids[i + 1];
      const followedByPunct = next?.type === 'text' && PUNCT_HEAD.test(next.value);
      if (!followedByPunct) continue;
      const prev = kids[i - 1];
      if (prev?.type === 'text') prev.value = prev.value.replace(/\s+$/, '');
    }
  });
}

export default function rehypeCitations() {
  return (tree: Root): void => {
    transformSources(tree);
    linkCitations(tree);
    tightenCitations(tree);
  };
}
