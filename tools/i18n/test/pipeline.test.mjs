// The pipeline end to end, offline: mock mode into a scratch I18N_DIR on the
// real content, the translation memory and sourceHash skipping, the hard spend
// cap and the retry-then-fallback rule with a fake client, and batch resume.

import assert from 'node:assert/strict';
import { existsSync, readFileSync, readdirSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';
import { test } from 'node:test';

import { priceFor, usageCost } from '../lib/cost.mjs';
import { splitFrontmatter } from '../lib/frontmatter.mjs';
import { mockTranslate } from '../lib/mock.mjs';
import { countCitations } from '../lib/protect.mjs';
import { run } from '../lib/run.mjs';
import { sourceHash } from '../lib/segment.mjs';
import { fakeClient, fixtureTree, glossary, REPO, scratch, scratchDirs, silent } from './helpers.mjs';

const DATE = '2026-09-25';

test('mock mode end to end on the real content, into a scratch I18N_DIR', async () => {
  const s = scratch();
  try {
    const dirs = scratchDirs(s.dir);
    const report = await run({ mode: 'mock', dirs, date: DATE, log: silent });
    assert.deepEqual(report.errors, []);
    assert.equal(report.fallbacks.length, 0);
    const thesisEs = readFileSync(join(REPO, 'THESIS.es.md'), 'utf8');
    for (const lang of ['es', 'fr', 'de', 'pt']) {
      const bok = readdirSync(join(dirs.i18nDir, lang, 'bok'));
      assert.equal(bok.length, 24, `${lang}: 24 chapters`);
      assert.equal(readdirSync(join(dirs.i18nDir, lang, 'patterns')).length, readdirSync(join(REPO, 'bok', 'patterns')).length);
      assert.equal(existsSync(join(dirs.i18nDir, lang, 'THESIS.md')), lang !== 'es', `${lang}: Thesis only for fr, de, pt`);
      assert.ok(existsSync(join(dirs.tmDir, `${lang}.jsonl`)));
    }
    assert.equal(readFileSync(join(REPO, 'THESIS.es.md'), 'utf8'), thesisEs, 'the hand-translated Spanish Thesis is untouched');

    for (const [rel, out] of [
      ['bok/04-the-stack.md', 'es/bok/04-the-stack.md'],
      ['bok/08-regulatory-map.md', 'de/bok/08-regulatory-map.md'],
      ['bok/patterns/aibom.md', 'pt/patterns/aibom.md'],
      ['THESIS.md', 'fr/THESIS.md'],
    ]) {
      const en = readFileSync(join(REPO, rel), 'utf8').replace(/\r\n/g, '\n');
      const tr = readFileSync(join(dirs.i18nDir, out), 'utf8');
      const { frontmatter, body } = splitFrontmatter(tr);
      const fm = Object.fromEntries(frontmatter.map((f) => [f.key, f.value]));
      assert.equal(fm.lang, out.slice(0, 2));
      assert.equal(fm.source, rel);
      assert.equal(fm.sourceHash, sourceHash(en));
      assert.equal(fm.translatedBy, 'machine: mock');
      assert.equal(fm.translatedAt, DATE);
      assert.ok(!tr.includes('\u2014'), `${out}: em dash`);
      // The Sources section is English, verbatim.
      const enSources = en.slice(en.indexOf('\n## Sources'));
      assert.ok(body.endsWith(enSources), `${out}: Sources section kept verbatim`);
      assert.equal(countCitations(body), countCitations(splitFrontmatter(en).body), `${out}: [n] markers`);
      // Code blocks are untouched.
      const fences = (t) => t.match(/^```[\s\S]*?^```/gm) ?? [];
      assert.deepEqual(fences(body), fences(en), `${out}: code blocks`);
    }
    // Pattern frontmatter: ids and numbers kept, the summary translated, the (locked) title kept.
    const pat = splitFrontmatter(readFileSync(join(dirs.i18nDir, 'es', 'patterns', 'agent-registry.md'), 'utf8')).frontmatter;
    const f = Object.fromEntries(pat.map((x) => [x.key, x.value]));
    assert.equal(f.id, 'agent-registry');
    assert.equal(f.title, 'Agent Registry');
    assert.equal(f.layer, '2');
    assert.notEqual(f.summary, undefined);
    assert.match(f.summary, /[áéíóú]/);

    // A second run pays for nothing: every file is skipped by its sourceHash.
    const again = await run({ mode: 'mock', dirs, date: DATE, log: silent });
    for (const pl of Object.values(again.perLang)) {
      assert.equal(pl.skipped.length, pl.files);
      assert.equal(pl.segments.toTranslate, 0);
      assert.equal(pl.written.length, 0);
    }
  } finally {
    s.cleanup();
  }
});

test('after an English edit only the changed segments are translated again', async () => {
  const s = scratch();
  try {
    const root = fixtureTree(s.dir, ['bok/04-the-stack.md', 'bok/patterns/aibom.md']);
    const dirs = scratchDirs(s.dir, { I18N_SOURCE_ROOT: root });
    const first = await run({ mode: 'mock', dirs, langs: ['es'], date: DATE, log: silent });
    const all = first.perLang.es.segments.toTranslate;
    assert.ok(all > 100);
    const path = join(root, 'bok', '04-the-stack.md');
    const text = readFileSync(path, 'utf8');
    writeFileSync(path, text.replace('The stack is not an org chart and not a maturity ladder.', 'The stack is not an org chart, nor a maturity ladder.'));
    const second = await run({ mode: 'mock', dirs, langs: ['es'], date: DATE, log: silent });
    const pl = second.perLang.es;
    assert.equal(pl.segments.toTranslate, 1, 'one paragraph changed');
    assert.deepEqual(pl.skipped, ['bok/patterns/aibom.md']);
    assert.deepEqual(pl.written, ['es/bok/04-the-stack.md'], 'paths outside the repository are relative to I18N_DIR');
    const out = readFileSync(join(dirs.i18nDir, 'es', 'bok', '04-the-stack.md'), 'utf8');
    assert.match(out, /nór á mátúríty láddér/);
  } finally {
    s.cleanup();
  }
});

test('sync: the hard cap stops before a request would pass it, and real usage is tracked', async () => {
  const s = scratch();
  try {
    const root = fixtureTree(s.dir, ['bok/04-the-stack.md', 'bok/05-patterns.md']);
    const dirs = scratchDirs(s.dir, { I18N_SOURCE_ROOT: root });
    const usage = { input_tokens: 2000, output_tokens: 3000, cache_read_input_tokens: 5000 };
    const client = fakeClient({ usage });
    const price = priceFor('claude-haiku-4-5-20251001');
    const cap = 0.06;
    const report = await run({ mode: 'sync', dirs, langs: ['es'], maxUsd: cap, client, concurrency: 1, date: DATE, log: silent });
    assert.ok(report.stoppedByCap, 'the cap stopped the run');
    assert.ok(client.calls.length >= 1);
    const perCall = usageCost(usage, price);
    assert.ok(Math.abs(report.spentUsd - perCall * client.calls.length) < 1e-9, 'spend = sum of real usage');
    assert.ok(report.spentUsd <= cap, `spent ${report.spentUsd} <= cap ${cap}`);
    // Files with untranslated segments are not written (nothing half done is stamped with a sourceHash).
    assert.ok(report.perLang.es.deferred.length >= 1);
    assert.equal(report.fallbacks.length, 0, 'segments cut by the cap are deferred, not given up');
    // A cap of zero sends nothing at all.
    const none = fakeClient();
    const r0 = await run({ mode: 'sync', dirs: scratchDirs(join(s.dir, 'z'), { I18N_SOURCE_ROOT: root }), langs: ['es'], maxUsd: 0, client: none, date: DATE, log: silent });
    assert.equal(none.calls.length, 0);
    assert.equal(r0.spentUsd, 0);
  } finally {
    s.cleanup();
  }
});

test('sync: an invalid answer is retried once, then the English is kept and logged', async () => {
  const s = scratch();
  try {
    const root = fixtureTree(s.dir, ['bok/patterns/aibom.md']);
    const dirs = scratchDirs(s.dir, { I18N_SOURCE_ROOT: root });
    // One segment always comes back identical to the English (invalid every
    // time); another loses its bold markers the first time only.
    const target = 'Model owners, downstream deployers, auditors, procurement.';
    const g = glossary();
    const seen = new Map();
    const client = fakeClient({
      answer: (it, lang) => {
        const n = (seen.get(it.text) ?? 0) + 1;
        seen.set(it.text, n);
        if (it.text === target) return it.text;
        if (it.text.startsWith('**Summary:**') && n === 1) return 'broken';
        return mockTranslate(it.text, lang, g);
      },
    });
    const report = await run({ mode: 'sync', dirs, langs: ['es'], maxUsd: 1, client, date: DATE, log: silent });
    assert.equal(seen.get(target), 2, 'the identical answer was retried exactly once');
    assert.equal(seen.get([...seen.keys()].find((k) => k.startsWith('**Summary:**'))), 2, 'retried once and then accepted');
    assert.equal(report.fallbacks.length, 1);
    assert.equal(report.fallbacks[0].source, target);
    assert.match(report.fallbacks[0].errors.join(), /identical/);
    const out = readFileSync(join(dirs.i18nDir, 'es', 'patterns', 'aibom.md'), 'utf8');
    assert.ok(out.includes(target), 'the English segment is kept in the written file');
    assert.ok(!out.includes('broken'));
  } finally {
    s.cleanup();
  }
});

test('batch: the id is saved before polling, an interrupted run resumes and applies results', async () => {
  const s = scratch();
  try {
    const root = fixtureTree(s.dir, ['bok/patterns/aibom.md', 'bok/patterns/policy-card.md']);
    const dirs = scratchDirs(s.dir, { I18N_SOURCE_ROOT: root });
    const client = fakeClient({ ended: false });
    // First run: the batch is created and still processing when the run gives up waiting.
    const r1 = await run({ mode: 'batch', dirs, langs: ['es', 'fr'], maxUsd: 1, client, wait: false, date: DATE, log: silent });
    assert.equal(client.batches.size, 1);
    const pendingPath = join(dirs.tmDir, 'pending-batches.json');
    assert.ok(existsSync(pendingPath), 'the batch id is persisted');
    const pending = JSON.parse(readFileSync(pendingPath, 'utf8'));
    assert.equal(pending.batches[0].id, 'msgbatch_fake1');
    assert.deepEqual(r1.pendingBatches, ['msgbatch_fake1']);
    assert.equal(r1.perLang.es.written.length, 0, 'nothing written while the batch is pending');
    const customIds = Object.keys(pending.batches[0].requests);
    assert.ok(customIds.every((id) => /^(es|fr)-[a-z0-9]+-\d+$/.test(id)));

    // Second run, batch still processing: no duplicate batch is created.
    await run({ mode: 'batch', dirs, langs: ['es', 'fr'], maxUsd: 1, client, wait: false, date: DATE, log: silent });
    assert.equal(client.batches.size, 1, 'segments already in a pending batch are not resubmitted');

    // Third run after the batch ended: results applied, pending file removed, files written.
    client.ended = true;
    const r3 = await run({ mode: 'batch', dirs, langs: ['es', 'fr'], maxUsd: 1, client, date: DATE, log: silent });
    assert.equal(client.batches.size, 1, 'no new batch: everything came from the resumed one');
    assert.ok(!existsSync(pendingPath));
    assert.deepEqual(r3.pendingBatches, []);
    assert.equal(r3.perLang.es.written.length, 2);
    assert.equal(r3.perLang.fr.written.length, 2);
    assert.ok(r3.spentUsd > 0, 'real batch usage is recorded');
    assert.equal(client.calls.length, 0, 'no Messages API call was needed');
  } finally {
    s.cleanup();
  }
});

test('batch: requests that would pass the cap are left out of the batch', async () => {
  const s = scratch();
  try {
    const root = fixtureTree(s.dir, ['bok/04-the-stack.md', 'bok/13-risk-management.md']);
    const dirs = scratchDirs(s.dir, { I18N_SOURCE_ROOT: root });
    const client = fakeClient();
    const report = await run({ mode: 'batch', dirs, langs: ['es'], maxUsd: 0.05, client, date: DATE, log: silent });
    const sent = [...client.batches.values()][0] ?? [];
    assert.ok(report.perLang.es.requests > sent.length, `${sent.length} of ${report.perLang.es.requests} requests fit the cap`);
    assert.ok(report.stoppedByCap);
    assert.ok(report.spentUsd <= 0.05);
  } finally {
    s.cleanup();
  }
});

test('dry run and estimate call no API and write nothing', async () => {
  const s = scratch();
  try {
    const dirs = scratchDirs(s.dir);
    const client = fakeClient();
    const r = await run({ mode: 'sync', dryRun: true, dirs, client, date: DATE, log: silent });
    assert.equal(client.calls.length, 0);
    assert.ok(!existsSync(dirs.i18nDir));
    assert.ok(r.estimate.total.requests > 400);
    const e = await run({ mode: 'estimate', dirs, date: DATE, log: silent });
    assert.ok(e.estimate.total.usd.batch < e.estimate.total.usd.sync);
    assert.ok(!existsSync(dirs.i18nDir));
  } finally {
    s.cleanup();
  }
});
