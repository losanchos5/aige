// Segmentation: the parser round-trips every real source byte for byte, keeps
// the structure when segments change (checked against the site's own mdast
// parser, an independent implementation), and rejects what it cannot keep.

import assert from 'node:assert/strict';
import { test } from 'node:test';

import { splitFrontmatter } from '../lib/frontmatter.mjs';
import {
  escapeLeading, MarkdownError, parseMarkdown, renderMarkdown, structureSignature, wrapText,
} from '../lib/markdown.mjs';
import { mockTranslate } from '../lib/mock.mjs';
import { protect, restore } from '../lib/protect.mjs';
import { glossary, loadMdast, realDocs } from './helpers.mjs';

const bodyOf = (doc) => splitFrontmatter(doc.text).body;

test('every real source renders back byte for byte when nothing is translated', () => {
  const docs = realDocs().filter((d) => d.src.kind !== 'ui');
  assert.ok(docs.length >= 58, `expected the 24 chapters, the patterns and the Thesis, got ${docs.length}`);
  for (const d of docs) {
    const body = bodyOf(d);
    assert.equal(renderMarkdown(d.parsed, () => undefined), body, d.src.rel);
  }
});

test('segmentation finds headings, paragraphs, list items, cells and callouts', () => {
  const md = [
    '# 99. Title',
    '',
    '> One-line summary.',
    '',
    '## Section',
    'Prose with `code`, a [link](/bok/x#y) and a citation [1].',
    '',
    '- Item one',
    '  continued.',
    '  - Nested item',
    '1. Ordered',
    '',
    '| A | B |',
    '|---|---|',
    '| cell one | `Art. 3` |',
    '',
    '> **In practice**',
    '> A grounded example.',
    '> **Anti-pattern** Paper controls.',
    '',
    '**Maps to:** `EU AI Act Art. 9` · NIST AI RMF (Measure).',
    '',
    '```yaml',
    'key: value',
    '```',
    '',
    '## Sources',
    '',
    '[1] A source. Publisher. 2026. https://example.org (verified: primary)',
    '',
  ].join('\n');
  const p = parseMarkdown(md);
  const kinds = p.segments.map((s) => `${s.kind}:${s.source}`);
  assert.deepEqual(kinds, [
    'h1:99. Title',
    'p:One-line summary.',
    'h2:Section',
    'p:Prose with `code`, a [link](/bok/x#y) and a citation [1].',
    'p:Item one continued.',
    'p:Nested item',
    'p:Ordered',
    'td:A',
    'td:B',
    'td:cell one',
    'td:`Art. 3`',
    'p:A grounded example.',
    'p:Paper controls.',
    'p:`EU AI Act Art. 9` · NIST AI RMF (Measure).',
  ]);
  assert.equal(renderMarkdown(p, () => undefined), md);
});

test('labels stay in English unless mapped, and the Sources section is never a segment', () => {
  const md = '> **In practice (illustrative)**\n> Text.\n\n## Sources\n\n[1] Kept verbatim.\n';
  const p = parseMarkdown(md);
  assert.deepEqual(p.segments.map((s) => s.source), ['Text.']);
  const out = renderMarkdown(p, (s) => `T(${s.source})`, (l) => (l === '**In practice (illustrative)**' ? '**En la práctica (ilustrativo)**' : undefined));
  assert.equal(out, '> **En la práctica (ilustrativo)**\n> T(Text.)\n\n## Sources\n\n[1] Kept verbatim.\n');
});

test('unsupported constructs fail loudly with the line number', () => {
  assert.throws(() => parseMarkdown('Title\n=====\n', { file: 'x.md' }), (e) => e instanceof MarkdownError && /x\.md:2: setext/.test(e.message));
  assert.throws(() => parseMarkdown('Text\n---\n', { file: 'x.md' }), /x\.md:2: setext/);
  assert.throws(() => parseMarkdown('A hard  \nbreak\n', { file: 'x.md' }), /x\.md:1: hard line breaks/);
  assert.throws(() => parseMarkdown('a\r\nb'), /CR characters/);
});

test('a translated line never opens another block', () => {
  assert.equal(escapeLeading('# not a heading'), '\\# not a heading');
  assert.equal(escapeLeading('- not a list'), '\\- not a list');
  assert.equal(escapeLeading('1. not a list'), '1\\. not a list');
  assert.equal(escapeLeading('> not a quote'), '\\> not a quote');
  assert.equal(escapeLeading('Plain text'), 'Plain text');
  const p = parseMarkdown('A paragraph.\n');
  const out = renderMarkdown(p, () => '1. Starts like a list');
  assert.deepEqual(structureSignature(parseMarkdown(out).blocks), structureSignature(p.blocks));
});

test('wrapping keeps bold, links and code whole and never starts a line with a block marker', () => {
  const words = Array.from({ length: 40 }, (_, i) => `word${i}`).join(' ');
  const text = `${words} **a bold phrase that is long** then [a link text here](https://example.org/a-long/path) and \`some code\` - 1. + end`;
  const lines = wrapText(text, 40);
  assert.ok(lines.length > 3);
  assert.equal(lines.join(' '), text);
  for (const l of lines.slice(1)) assert.doesNotMatch(l, /^(?:[-+*]\s|\d+\.\s|#|>)/);
  const joined = lines.join('\n');
  assert.match(joined, /\*\*a bold phrase that is long\*\*/);
  assert.match(joined, /\[a link text here\]\(https:\/\/example\.org\/a-long\/path\)/);
  assert.match(joined, /`some code`/);
  const labelled = wrapText('text '.repeat(30).trim(), 30, '**In practice (illustrative)**');
  assert.ok(labelled[0].startsWith('**In practice (illustrative)**'), 'the label is never split');
});

test('table cells: pipes in a translation are escaped, the shape is kept', () => {
  const md = '| A | B |\n|---|---|\n| x | y |\n';
  const p = parseMarkdown(md);
  const out = renderMarkdown(p, (s) => (s.source === 'x' ? 'one | two' : `${s.source}!`));
  assert.equal(out, '| A! | B! |\n|---|---|\n| one \\| two | y! |\n');
  assert.deepEqual(structureSignature(parseMarkdown(out).blocks), structureSignature(p.blocks));
});

test('placeholders round-trip on every segment of every real source', () => {
  let n = 0;
  for (const d of realDocs()) {
    for (const s of d.segments) {
      const p = protect(s.source);
      assert.equal(restore(p.text, p.map), s.source, `${d.src.rel}: ${s.source.slice(0, 60)}`);
      // An unmatched backtick is literal text (e.g. a code span cut in two by a
      // line CommonMark reads as a list item); only closed spans are code.
      assert.doesNotMatch(p.text, /`[^`]+`|https?:\/\//, `${d.src.rel}: unprotected code or URL in ${p.text.slice(0, 80)}`);
      n++;
    }
  }
  assert.ok(n > 10_000, `${n} segments`);
});

test('protect: code, links, citations, URLs, braces and escapes', () => {
  const src = 'See `a|b` and [the text](https://x.org/a_(b)) [3][4], https://y.org/p. Also {7} and \\* and &amp;.';
  const p = protect(src);
  assert.equal(p.text, 'See {1} and [the text]({2}) {3}, {4}. Also {5} and {6} and {7}.');
  assert.deepEqual(p.map, ['`a|b`', 'https://x.org/a_(b)', '[3][4]', 'https://y.org/p', '{7}', '\\*', '&amp;']);
  assert.deepEqual(p.linkTargets, [2]);
  assert.equal(restore(p.text, p.map), src);
  // Code and citations inside link text are protected too.
  const q = protect('[`x` and [2]](/a)');
  assert.equal(q.text, '[{1} and {2}]({3})');
});

/** The structure an independent parser (mdast, the site's own) sees. */
function mdastShape(tree) {
  const shape = [];
  const links = [];
  const code = [];
  const walk = (node, depth) => {
    switch (node.type) {
      case 'heading':
        shape.push(`${depth}h${node.depth}`);
        break;
      case 'list':
        shape.push(`${depth}${node.ordered ? 'ol' : 'ul'}:${node.children.length}`);
        break;
      case 'table':
        shape.push(`${depth}table:${node.children.map((r) => r.children.length).join(',')}`);
        break;
      case 'blockquote':
        shape.push(`${depth}quote`);
        break;
      case 'code':
        code.push(node.value);
        break;
      case 'inlineCode':
        // A line break inside a code span renders as a space.
        code.push(node.value.replace(/\s+/g, ' '));
        break;
      case 'link':
        links.push(node.url);
        break;
      case 'paragraph':
        shape.push(`${depth}p`);
        break;
      default:
        break;
    }
    for (const c of node.children ?? []) walk(c, depth + 1);
  };
  walk(tree, 0);
  return { shape, links, code };
}

test('mdast oracle: a mock translation of every real source keeps the same blocks, links and code', async (t) => {
  const parse = await loadMdast();
  if (!parse) {
    t.skip('site dependencies not installed (mdast-util-from-markdown); the oracle check needs them');
    return;
  }
  const g = glossary();
  for (const d of realDocs().filter((x) => x.src.kind !== 'ui')) {
    const body = bodyOf(d);
    const translated = renderMarkdown(d.parsed, (s) => {
      const p = protect(s.source);
      return restore(mockTranslate(p.text, 'de', g), p.map);
    });
    const a = mdastShape(parse(body));
    const b = mdastShape(parse(translated));
    assert.deepEqual(b.shape, a.shape, `${d.src.rel}: block structure`);
    assert.deepEqual(b.links, a.links, `${d.src.rel}: link targets`);
    assert.deepEqual(b.code, a.code, `${d.src.rel}: code`);
    // And our own parser agrees with itself on the output.
    assert.deepEqual(structureSignature(parseMarkdown(translated).blocks), structureSignature(d.parsed.blocks), d.src.rel);
  }
});
