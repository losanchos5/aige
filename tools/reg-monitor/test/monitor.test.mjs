import assert from 'node:assert/strict';
import { existsSync, mkdtempSync, readFileSync, rmSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { afterEach, beforeEach, test } from 'node:test';

import { runMonitor, summaryMarkdown } from '../monitor.mjs';
import { FetchError } from '../lib/fetcher.mjs';
import { marker } from '../lib/issue.mjs';

const FILLER = 'Providers of high-risk AI systems shall keep the documentation. '.repeat(5);
const htmlSource = { id: 'ec-page', name: 'EC page', url: 'https://example.europa.eu/page', jurisdiction: 'EU', category: 'guidance', hints: { select: ['main'] } };
const pdfSource = { id: 'tx-pdf', name: 'TX PDF', url: 'https://example.gov/bill.pdf', jurisdiction: 'US-TX', category: 'law' };

let stateDir;
beforeEach(() => {
  stateDir = mkdtempSync(join(tmpdir(), 'reg-monitor-state-'));
});
afterEach(() => {
  rmSync(stateDir, { recursive: true, force: true });
});

function page(extra) {
  return Buffer.from(`<html><body><nav>menu</nav><main><p>${FILLER}</p><p>${extra}</p></main><script>n=${Math.random()}</script></body></html>`);
}

// A fake fetcher whose answers the test sets per URL.
function fakeFetcher(answers) {
  const calls = [];
  return {
    calls,
    async get(url, opts) {
      calls.push({ url, opts });
      const a = answers[url];
      if (a instanceof Error) throw a;
      return { status: 200, notModified: false, contentType: 'text/html', etag: null, lastModified: null, finalUrl: url, attempts: 1, ...a };
    },
  };
}

function fakeGitHub({ open = null, failOn = null } = {}) {
  const calls = [];
  let next = 100;
  return {
    calls,
    async ensureLabel() {
      calls.push(['label']);
    },
    async findOpenIssue(id) {
      calls.push(['find', id]);
      return open && open[id] ? { number: open[id], url: `u/${open[id]}` } : null;
    },
    async createIssue({ title, body }) {
      if (failOn === 'create') throw new Error('HTTP 403');
      calls.push(['create', title, body]);
      return { number: next++, url: 'u' };
    },
    async addComment(n, body) {
      calls.push(['comment', n, body]);
      return { url: 'u' };
    },
  };
}

const base = (extra) => ({ stateDir, repoRoot: process.cwd(), log: () => {}, findCiting: () => [{ file: 'bok/08-regulatory-map.md', lines: [1] }], now: () => Date.parse('2026-09-24T06:17:00Z'), ...extra });
const state = () => JSON.parse(readFileSync(join(stateDir, 'state.json'), 'utf8'));

test('first run only initialises: no issue, state and text written', async () => {
  const gh = fakeGitHub();
  const { results, exitCode } = await runMonitor(base({ sources: [htmlSource], fetcher: fakeFetcher({ [htmlSource.url]: { bytes: page('v1') } }), github: gh }));
  assert.equal(exitCode, 0);
  assert.deepEqual(results.map((r) => r.status), ['initialised']);
  assert.deepEqual(gh.calls, []);
  const s = state().sources['ec-page'];
  assert.equal(s.kind, 'html');
  assert.equal(s.observedAt, '2026-09-24T06:17:00Z');
  assert.match(readFileSync(join(stateDir, 'text', 'ec-page.txt'), 'utf8'), /v1\n$/);
  assert.ok(existsSync(join(stateDir, 'README.md')));
});

test('unchanged content makes no call and no state change', async () => {
  const gh = fakeGitHub();
  await runMonitor(base({ sources: [htmlSource], fetcher: fakeFetcher({ [htmlSource.url]: { bytes: page('v1') } }), github: gh }));
  const before = readFileSync(join(stateDir, 'state.json'), 'utf8');
  const { results } = await runMonitor(base({ sources: [htmlSource], fetcher: fakeFetcher({ [htmlSource.url]: { bytes: page('v1') } }), github: gh, now: () => Date.parse('2026-09-25T06:17:00Z') }));
  assert.deepEqual(results.map((r) => r.status), ['unchanged']);
  assert.deepEqual(gh.calls, []);
  assert.equal(readFileSync(join(stateDir, 'state.json'), 'utf8'), before);
});

test('a change opens an issue with the diff, then a further change comments on the open issue', async () => {
  const gh = fakeGitHub();
  await runMonitor(base({ sources: [htmlSource], fetcher: fakeFetcher({ [htmlSource.url]: { bytes: page('Applies from 2 August 2026.') } }), github: gh }));
  const r1 = await runMonitor(base({ sources: [htmlSource], fetcher: fakeFetcher({ [htmlSource.url]: { bytes: page('Applies from 2 December 2027.') } }), github: gh }));
  assert.equal(r1.results[0].status, 'changed');
  const create = gh.calls.find((c) => c[0] === 'create');
  assert.equal(create[1], 'Regulatory change: EC page');
  assert.ok(create[2].startsWith(marker('ec-page')));
  assert.match(create[2], /-Applies from 2 August 2026\.\n\+Applies from 2 December 2027\./);
  assert.match(create[2], /bok\/08-regulatory-map\.md/);
  const s = state().sources['ec-page'];
  assert.ok(s.previousSha256);
  assert.equal(s.changedAt, '2026-09-24T06:17:00Z');
  assert.match(readFileSync(join(stateDir, 'text', 'ec-page.txt'), 'utf8'), /2 December 2027/);

  const gh2 = fakeGitHub({ open: { 'ec-page': 42 } });
  const r2 = await runMonitor(base({ sources: [htmlSource], fetcher: fakeFetcher({ [htmlSource.url]: { bytes: page('Applies from 2 August 2028.') } }), github: gh2 }));
  assert.match(r2.results[0].detail, /commented on #42/);
  const comment = gh2.calls.find((c) => c[0] === 'comment');
  assert.equal(comment[1], 42);
  assert.match(comment[2], /\+Applies from 2 August 2028\./);
  assert.ok(!gh2.calls.some((c) => c[0] === 'create'));
});

test('dry run prints the issue and writes nothing', async () => {
  await runMonitor(base({ sources: [htmlSource], fetcher: fakeFetcher({ [htmlSource.url]: { bytes: page('v1') } }), github: fakeGitHub() }));
  const before = readFileSync(join(stateDir, 'state.json'), 'utf8');
  const printed = [];
  const { results } = await runMonitor(base({ sources: [htmlSource], dryRun: true, github: null, log: (m) => printed.push(m), fetcher: fakeFetcher({ [htmlSource.url]: { bytes: page('v2') } }) }));
  assert.equal(results[0].status, 'changed');
  assert.match(results[0].detail, /dry run/);
  assert.match(printed.join('\n'), /\[dry run\] change on ec-page[\s\S]*-v1\n\+v2/);
  assert.equal(readFileSync(join(stateDir, 'state.json'), 'utf8'), before);
});

test('a dry run against an empty state initialises nothing on disk', async () => {
  const { results } = await runMonitor(base({ sources: [htmlSource], dryRun: true, fetcher: fakeFetcher({ [htmlSource.url]: { bytes: page('v1') } }) }));
  assert.equal(results[0].status, 'initialised');
  assert.ok(!existsSync(join(stateDir, 'state.json')));
});

test('a real run without a GitHub client is refused', async () => {
  await assert.rejects(runMonitor(base({ sources: [htmlSource], fetcher: fakeFetcher({}) })), /GitHub client is required/);
});

test('a failed notification leaves the state untouched so the next run retries', async () => {
  await runMonitor(base({ sources: [htmlSource], fetcher: fakeFetcher({ [htmlSource.url]: { bytes: page('v1') } }), github: fakeGitHub() }));
  const before = readFileSync(join(stateDir, 'state.json'), 'utf8');
  const { results, exitCode } = await runMonitor(base({ sources: [htmlSource], fetcher: fakeFetcher({ [htmlSource.url]: { bytes: page('v2') } }), github: fakeGitHub({ failOn: 'create' }) }));
  assert.equal(exitCode, 1);
  assert.equal(results[0].status, 'error');
  assert.equal(readFileSync(join(stateDir, 'state.json'), 'utf8'), before);
});

test('three failed runs in a row report the source once; success resets the counter', async () => {
  await runMonitor(base({ sources: [htmlSource], fetcher: fakeFetcher({ [htmlSource.url]: { bytes: page('v1') } }), github: fakeGitHub() }));
  const gh = fakeGitHub();
  const failing = () => fakeFetcher({ [htmlSource.url]: new FetchError('http', 'HTTP 404', 404) });
  for (let i = 1; i <= 4; i++) {
    const { results } = await runMonitor(base({ sources: [htmlSource], fetcher: failing(), github: gh }));
    assert.equal(results[0].status, 'failed');
    assert.match(results[0].detail, new RegExp(`\\(${i} in a row\\)`));
  }
  const creates = gh.calls.filter((c) => c[0] === 'create');
  assert.equal(creates.length, 1);
  assert.match(creates[0][1], /^Regulatory monitor: source unreachable: EC page$/);
  assert.equal(state().sources['ec-page'].failures, 4);
  assert.ok(state().sources['ec-page'].sha256, 'the last good hash is kept');
  const back = await runMonitor(base({ sources: [htmlSource], fetcher: fakeFetcher({ [htmlSource.url]: { bytes: page('v1') } }), github: gh }));
  assert.equal(back.results[0].status, 'unchanged');
  assert.equal(state().sources['ec-page'].failures, 0);
});

test('bot challenges and too-short pages count as failures, not changes', async () => {
  await runMonitor(base({ sources: [htmlSource], fetcher: fakeFetcher({ [htmlSource.url]: { bytes: page('v1') } }), github: fakeGitHub() }));
  const gh = fakeGitHub();
  const { results } = await runMonitor(base({ sources: [htmlSource], fetcher: fakeFetcher({ [htmlSource.url]: { bytes: Buffer.from('<title>Just a moment...</title>') } }), github: gh }));
  assert.equal(results[0].status, 'failed');
  assert.deepEqual(gh.calls, []);
});

test('changing the hints re-baselines silently', async () => {
  await runMonitor(base({ sources: [htmlSource], fetcher: fakeFetcher({ [htmlSource.url]: { bytes: page('v1') } }), github: fakeGitHub() }));
  const gh = fakeGitHub();
  const tuned = { ...htmlSource, hints: { select: ['main'], dropLines: ['^menu$'] } };
  const { results } = await runMonitor(base({ sources: [tuned], fetcher: fakeFetcher({ [htmlSource.url]: { bytes: page('v2') } }), github: gh }));
  assert.equal(results[0].status, 'rebaselined');
  assert.deepEqual(gh.calls, []);
});

test('PDFs: conditional request once known, 304 is unchanged, new bytes open an issue', async () => {
  const pdf = (v) => Buffer.from(`%PDF-1.7 ${v}`);
  await runMonitor(base({ sources: [pdfSource], fetcher: fakeFetcher({ [pdfSource.url]: { bytes: pdf('a'), contentType: 'application/pdf', etag: '"e1"', lastModified: 'Mon, 01 Sep 2026 00:00:00 GMT' } }), github: fakeGitHub() }));
  assert.equal(state().sources['tx-pdf'].etag, '"e1"');
  const f304 = fakeFetcher({ [pdfSource.url]: { notModified: true, status: 304 } });
  const r304 = await runMonitor(base({ sources: [pdfSource], fetcher: f304, github: fakeGitHub() }));
  assert.equal(r304.results[0].status, 'unchanged');
  assert.equal(f304.calls[0].opts.etag, '"e1"');
  const gh = fakeGitHub();
  const r = await runMonitor(base({ sources: [pdfSource], fetcher: fakeFetcher({ [pdfSource.url]: { bytes: pdf('b'), contentType: 'application/pdf', etag: '"e2"' } }), github: gh }));
  assert.equal(r.results[0].status, 'changed');
  const body = gh.calls.find((c) => c[0] === 'create')[2];
  assert.match(body, /\| ETag \| "e1" to "e2" \|/);
  assert.ok(!existsSync(join(stateDir, 'text', 'tx-pdf.txt')));
});

test('more than the per-run cap of changes are deferred, not reported or saved', async () => {
  const many = Array.from({ length: 3 }, (_, i) => ({ ...htmlSource, id: `src-${i}`, url: `https://example.org/${i}` }));
  const answers = (v) => Object.fromEntries(many.map((s) => [s.url, { bytes: page(v) }]));
  await runMonitor(base({ sources: many, fetcher: fakeFetcher(answers('v1')), github: fakeGitHub() }));
  const gh = fakeGitHub();
  const { results } = await runMonitor(base({ sources: many, fetcher: fakeFetcher(answers('v2')), github: gh, maxNotifications: 2 }));
  assert.deepEqual(results.map((r) => r.status), ['changed', 'changed', 'deferred']);
  assert.equal(gh.calls.filter((c) => c[0] === 'create').length, 2);
  const again = await runMonitor(base({ sources: many, fetcher: fakeFetcher(answers('v2')), github: gh, maxNotifications: 2 }));
  assert.deepEqual(again.results.map((r) => r.status), ['unchanged', 'unchanged', 'changed']);
});

test('sources removed from sources.json are pruned from the state on a full run', async () => {
  const other = { ...htmlSource, id: 'gone', url: 'https://example.org/gone' };
  await runMonitor(base({ sources: [htmlSource, other], fetcher: fakeFetcher({ [htmlSource.url]: { bytes: page('v1') }, [other.url]: { bytes: page('v1') } }), github: fakeGitHub() }));
  const { results } = await runMonitor(base({ sources: [htmlSource], prune: true, fetcher: fakeFetcher({ [htmlSource.url]: { bytes: page('v1') } }), github: fakeGitHub() }));
  assert.deepEqual(results.map((r) => `${r.id}:${r.status}`), ['ec-page:unchanged', 'gone:pruned']);
  assert.deepEqual(Object.keys(state().sources), ['ec-page']);
  assert.ok(!existsSync(join(stateDir, 'text', 'gone.txt')));
});

test('an unexpected error in one source is contained; the others still run', async () => {
  const other = { ...htmlSource, id: 'other', url: 'https://example.org/other' };
  const answers = (v) => ({ [htmlSource.url]: { bytes: page(v) }, [other.url]: { bytes: page(v) } });
  await runMonitor(base({ sources: [htmlSource, other], fetcher: fakeFetcher(answers('v1')), github: fakeGitHub() }));
  const gh = fakeGitHub();
  let calls = 0;
  const findCiting = () => {
    calls++;
    if (calls === 1) throw new Error('git not found');
    return [];
  };
  const { results, exitCode } = await runMonitor(base({ sources: [htmlSource, other], fetcher: fakeFetcher(answers('v2')), github: gh, findCiting }));
  assert.equal(exitCode, 1);
  assert.deepEqual(results.map((r) => r.status), ['error', 'changed']);
  assert.match(results[0].detail, /unexpected error: git not found/);
});

test('the run summary is a Markdown table', () => {
  const md = summaryMarkdown([{ id: 'a', status: 'changed', detail: 'x | y' }, { id: 'b', status: 'unchanged', detail: 'z' }], { dryRun: true });
  assert.match(md, /^## Regulatory monitor \(dry run\)/);
  assert.match(md, /changed: 1 · unchanged: 1/);
  assert.match(md, /\| `a` \| changed \| x \\\| y \|/);
});
