// Validation of translated segments, the em dash post-processor, the mock and
// the glossary lock.

import assert from 'node:assert/strict';
import { readdirSync, readFileSync } from 'node:fs';
import { join } from 'node:path';
import { test } from 'node:test';

import { approxTokens, minCacheable } from '../lib/cost.mjs';
import { DEFAULT_MODEL } from '../lib/config.mjs';
import { splitFrontmatter } from '../lib/frontmatter.mjs';
import { localizeLabel } from '../lib/glossary.mjs';
import { mockTranslate } from '../lib/mock.mjs';
import { buildSystemPrompt, parseResponse } from '../lib/prompt.mjs';
import { postProcess, prepareSegment, validateTranslation } from '../lib/segment.mjs';
import { glossary, REPO } from './helpers.mjs';

const G = glossary();
const prep = (source, kind = 'p') => prepareSegment({ kind, source }, G);

test('a faithful translation passes and is restored to Markdown', () => {
  const p = prep('The **provider** keeps logs (see [chapter 18](/bok/eu-ai-act#x)) and `Art. 12` [3][4].');
  assert.equal(p.protected, 'The **provider** keeps logs (see [chapter 18]({1})) and {2} {3}.');
  const v = validateTranslation(p, 'El **proveedor** conserva registros (véase [el capítulo 18]({1})) y {2} {3}.', { glossary: G, lang: 'es' });
  assert.ok(v.ok, v.errors.join('; '));
  assert.equal(v.text, 'El **proveedor** conserva registros (véase [el capítulo 18](/bok/eu-ai-act#x)) y `Art. 12` [3][4].');
});

test('placeholders: missing, repeated, unknown, and a link target outside a link', () => {
  const p = prep('Use `a` and [b](/c) [1].');
  const check = (out) => validateTranslation(p, out, { glossary: G, lang: 'es' }).errors.join('; ');
  assert.match(check('Usa y [b]({2}) {3}.'), /placeholder \{1\} missing/);
  assert.match(check('Usa {1} {1} y [b]({2}) {3}.'), /placeholder \{1\} repeated/);
  assert.match(check('Usa {1} y [b]({2}) {3} {9}.'), /unknown placeholder \{9\}/);
  assert.match(check('Usa {1} y b {2} {3}.'), /link target \{2\} is no longer a link/);
});

test('[n] markers must keep their count; bold markers too', () => {
  const p = prep('A claim [2].');
  assert.match(validateTranslation(p, 'Una afirmación {1} [5].', { glossary: G, lang: 'es' }).errors.join(), /\[n\] markers: 1 in the source, 2/);
  const b = prep('A **bold** word.');
  assert.match(validateTranslation(b, 'Una palabra bold.', { glossary: G, lang: 'es' }).errors.join(), /bold markers/);
});

test('em dashes are rewritten, never kept', () => {
  assert.equal(postProcess('Uno \u2014 dos \u2014 tres.'), 'Uno, dos, tres.');
  assert.equal(postProcess('Fin\u2014.'), 'Fin.');
  assert.equal(postProcess('(\u2014 nota)'), '(nota)');
  const p = prep('One thing, then another.');
  const v = validateTranslation(p, 'Una cosa \u2014 y luego otra.', { glossary: G, lang: 'es' });
  assert.ok(v.ok);
  assert.ok(!v.text.includes('\u2014'));
});

test('empty and identical translations fail unless there is nothing to translate', () => {
  const p = prep('A sentence to translate.');
  assert.match(validateTranslation(p, '   ', {}).errors.join(), /empty/);
  assert.match(validateTranslation(p, 'A sentence to translate.', { glossary: G, lang: 'es' }).errors.join(), /identical/);
  // Codes, numbers, acronyms and locked names are untranslatable.
  for (const s of ['`Art. 3(1)`', '2025-02-02 [63]', 'NIST AI RMF', 'Govern-as-Code', 'ISO/IEC 42001', 'Agent Registry']) {
    assert.ok(prep(s).untranslatable, s);
  }
  assert.ok(!prep('Provider + deployer').untranslatable);
  // A short name coming back unchanged is accepted.
  const name = prep('Anthropic');
  assert.ok(validateTranslation(name, 'Anthropic', { glossary: G, lang: 'es' }).ok);
});

test('the mock keeps placeholders and locked names, applies locked terms and passes validation', () => {
  const p = prep('Each AI system has a provider; the Agent Registry pattern and Govern-as-Code stay; see `x` [1].');
  const out = mockTranslate(p.protected, 'es', G);
  assert.match(out, /sistema de IA/);
  assert.match(out, /proveedor/);
  assert.match(out, /Agent Registry/);
  assert.match(out, /Govern-as-Code/);
  const v = validateTranslation(p, out, { glossary: G, lang: 'es' });
  assert.ok(v.ok, v.errors.join('; '));
  assert.equal(mockTranslate('abc', 'fr', G), mockTranslate('abc', 'fr', G), 'deterministic');
});

test('the glossary lock names every pattern, the five layers and no em dash', () => {
  const titles = readdirSync(join(REPO, 'bok', 'patterns'))
    .filter((f) => f.endsWith('.md'))
    .map((f) => splitFrontmatter(readFileSync(join(REPO, 'bok', 'patterns', f), 'utf8').replace(/\r\n/g, '\n')).frontmatter.find((x) => x.key === 'title').value);
  assert.ok(titles.length >= 33);
  for (const t of titles) assert.ok(G.doNotTranslate.includes(t), `pattern name ${t} is not locked`);
  for (const l of ['Govern-as-Code', 'Inventory & Transparency', 'Evals & Red Teaming as Evidence', 'Runtime Controls & Observability', 'Assurance & Continuous Compliance']) {
    assert.ok(G.doNotTranslate.includes(l), l);
  }
  assert.equal(G.terms.deployer.es, 'responsable del despliegue');
  assert.equal(G.terms['high-risk AI system'].pt, 'sistema de IA de risco elevado');
  assert.ok(!readFileSync(join(REPO, 'i18n', 'glossary-lock.json'), 'utf8').includes('\u2014'));
});

test('the system prompt is fixed, cacheable on the default model and free of em dashes', () => {
  const a = buildSystemPrompt(G);
  assert.equal(a, buildSystemPrompt(G), 'byte-identical across calls');
  assert.ok(!a.includes('\u2014'));
  assert.ok(approxTokens(a) >= minCacheable(DEFAULT_MODEL), `~${approxTokens(a)} tokens`);
  assert.match(a, /responsable del despliegue/);
  assert.match(a, /pt-PT/);
});

test('callout labels: localized only when the site maps them', () => {
  const callouts = { map: { 'In practice': { es: 'En la práctica' }, 'Maps to': { es: 'Correspondencias' } }, present: true };
  assert.equal(localizeLabel(callouts, '**In practice**', 'es'), '**En la práctica**');
  assert.equal(localizeLabel(callouts, '**Maps to:**', 'es'), '**Correspondencias:**');
  assert.equal(localizeLabel(callouts, '**In practice**', 'fr'), undefined);
  assert.equal(localizeLabel(callouts, '**Anti-pattern**', 'es'), undefined);
});

test('parseResponse: JSON answers, truncation and refusals', () => {
  const msg = (text, stop = 'end_turn') => ({ stop_reason: stop, content: [{ type: 'text', text }] });
  const ok = parseResponse(msg('{"segments":[{"id":"1","t":"uno"},{"id":"2","t":"dos"},{"id":"9","t":"x"}]}'), 2);
  assert.ok(ok.ok);
  assert.deepEqual([...ok.byIndex], [[1, 'uno'], [2, 'dos']]);
  assert.equal(parseResponse(msg('{"segm', 'max_tokens'), 2).ok, false);
  assert.equal(parseResponse(msg('', 'refusal'), 2).error, 'refusal');
  assert.equal(parseResponse(msg('not json'), 1).ok, false);
});
