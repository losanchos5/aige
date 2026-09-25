// Small units: frontmatter, glob, prices and the cap, the translation memory,
// the UI strings file.

import assert from 'node:assert/strict';
import { mkdirSync, readFileSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';
import { test } from 'node:test';

import { Budget, priceFor, projectedMaxCost, usageCost } from '../lib/cost.mjs';
import { formatScalar, parseFrontmatter, renderFrontmatter, splitFrontmatter } from '../lib/frontmatter.mjs';
import { globToRegExp } from '../lib/glob.mjs';
import { run } from '../lib/run.mjs';
import { TranslationMemory } from '../lib/tm.mjs';
import { scratch, scratchDirs, silent } from './helpers.mjs';

test('frontmatter: flat scalars parse, render back and reject anything nested', () => {
  const text = `---\nid: aibom\ntitle: "Agent Identity & Scoped Credentials"\nlayer: 2\nsummary: 'It''s fine'\n---\n# Body\n`;
  const { frontmatter, body } = splitFrontmatter(text);
  assert.deepEqual(frontmatter.map((f) => [f.key, f.value]), [['id', 'aibom'], ['title', 'Agent Identity & Scoped Credentials'], ['layer', '2'], ['summary', "It's fine"]]);
  assert.equal(body, '# Body\n');
  assert.equal(renderFrontmatter(frontmatter), text.slice(0, text.indexOf('# Body')));
  assert.throws(() => parseFrontmatter('tags:\n  - a'), /expected "key: value"|only plain/);
  assert.throws(() => parseFrontmatter('tags: [a, b]'), /only plain or quoted/);
  assert.equal(formatScalar('es'), 'es');
  assert.equal(formatScalar('2026-09-25'), '"2026-09-25"');
  assert.equal(formatScalar('1e5abc'), '"1e5abc"');
  assert.equal(formatScalar('yes'), '"yes"');
  assert.equal(formatScalar('Título: con dos puntos'), '"Título: con dos puntos"');
});

test('glob: *, ** and {a,b} against repo-relative paths', () => {
  const m = (g, p) => globToRegExp(g).test(p);
  assert.ok(m('bok/0*.md', 'bok/04-the-stack.md'));
  assert.ok(!m('bok/0*.md', 'bok/patterns/aibom.md'));
  assert.ok(m('bok/**', 'bok/patterns/aibom.md'));
  assert.ok(m('bok/**/*.md', 'bok/04-the-stack.md'));
  assert.ok(m('{THESIS.md,bok/05-*.md}', 'THESIS.md'));
  assert.ok(!m('THESIS.md', 'THESIS.es.md'));
});

test('prices, usage cost and the worst case of a request', () => {
  const p = priceFor('claude-haiku-4-5-20251001');
  assert.deepEqual(p, { input: 1, output: 5 });
  assert.throws(() => priceFor('claude-unknown-9'), /--price-in/);
  assert.deepEqual(priceFor('claude-unknown-9', { input: 2, output: 8 }), { input: 2, output: 8 });
  const u = { input_tokens: 1_000_000, output_tokens: 1_000_000, cache_read_input_tokens: 1_000_000, cache_creation: { ephemeral_5m_input_tokens: 1_000_000, ephemeral_1h_input_tokens: 0 } };
  assert.ok(Math.abs(usageCost(u, p) - (1 + 5 + 0.1 + 1.25)) < 1e-9);
  assert.ok(Math.abs(usageCost(u, p, { batch: true }) - (1 + 5 + 0.1 + 1.25) / 2) < 1e-9);
  const worst = projectedMaxCost({ systemTokens: 1000, userTokens: 1000, maxTokens: 1000 }, p);
  assert.ok(worst > usageCost({ input_tokens: 2000, output_tokens: 1000 }, p));
});

test('Budget: reserve refuses past the cap; settle swaps in the real cost', () => {
  const b = new Budget(1);
  const a = b.reserve(0.6);
  assert.ok(a);
  assert.equal(b.reserve(0.5), null, 'in flight counts against the cap');
  b.settle(a, 0.2);
  assert.ok(b.reserve(0.5));
  assert.equal(b.spent, 0.2);
  assert.throws(() => new Budget(-1));
});

test('translation memory: append-only JSONL, later lines win, unchanged entries not rewritten', () => {
  const s = scratch();
  try {
    const tm = TranslationMemory.forLang(s.dir, 'es');
    assert.equal(tm.addMany([{ h: 'a', t: 'uno' }, { h: 'b', t: 'dos' }], { model: 'm', at: '2026-09-25' }), 2);
    assert.equal(tm.addMany([{ h: 'a', t: 'uno' }], { model: 'm', at: '2026-09-25' }), 0);
    tm.addMany([{ h: 'a', t: 'UNO' }], { model: 'm', at: '2026-09-26' });
    const again = TranslationMemory.forLang(s.dir, 'es');
    assert.equal(again.get('a').t, 'UNO');
    const lines = readFileSync(join(s.dir, 'es.jsonl'), 'utf8').trim().split('\n');
    assert.equal(lines.length, 3);
    assert.deepEqual(Object.keys(JSON.parse(lines[0])), ['h', 't', 'model', 'at']);
  } finally {
    s.cleanup();
  }
});

test('UI strings: ui.en.json becomes ui.<lang>.json with the same keys, interpolations kept', async () => {
  const s = scratch();
  try {
    const root = join(s.dir, 'src');
    mkdirSync(join(root, 'site', 'src', 'i18n'), { recursive: true });
    const en = { 'nav.home': 'Home', 'search.results': '{count} results for {query}', 'brand.name': 'AIGE', empty: '' };
    writeFileSync(join(root, 'site', 'src', 'i18n', 'ui.en.json'), JSON.stringify(en, null, 2));
    const dirs = scratchDirs(s.dir, { I18N_SOURCE_ROOT: root });
    const report = await run({ mode: 'mock', dirs, date: '2026-09-25', log: silent });
    assert.deepEqual(report.errors, []);
    for (const lang of ['es', 'fr', 'de', 'pt']) {
      const out = JSON.parse(readFileSync(join(dirs.uiDir, `ui.${lang}.json`), 'utf8'));
      assert.deepEqual(Object.keys(out), Object.keys(en));
      assert.match(out['search.results'], /\{count\}.*\{query\}/);
      assert.notEqual(out['nav.home'], 'Home');
      assert.equal(out['brand.name'], 'AIGE');
      assert.equal(out.empty, '');
    }
    assert.ok(dirs.uiDir.startsWith(dirs.i18nDir), 'a scratch run never writes into site/src/i18n');
  } finally {
    s.cleanup();
  }
});
