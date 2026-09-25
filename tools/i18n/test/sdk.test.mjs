// The real SDK path, offline: the official client with a fake `fetch` that
// answers like the Claude API. Checks the request shapes the pipeline sends
// (model, cached system prompt, structured output, batch requests) and that
// responses, batch results (JSONL) and errors are read correctly.

import assert from 'node:assert/strict';
import { existsSync, readFileSync } from 'node:fs';
import { join } from 'node:path';
import { test } from 'node:test';

import { createApiClient } from '../lib/client.mjs';
import { mockTranslate } from '../lib/mock.mjs';
import { run } from '../lib/run.mjs';
import { fixtureTree, glossary, scratch, scratchDirs, segmentsOf, silent } from './helpers.mjs';

const G = glossary();
const json = (status, body) => new Response(JSON.stringify(body), { status, headers: { 'content-type': 'application/json', 'request-id': 'req_test' } });

function message(params, usage = { input_tokens: 900, output_tokens: 700, cache_read_input_tokens: 5000, cache_creation_input_tokens: 0 }) {
  const { lang, items } = segmentsOf(params);
  return {
    id: 'msg_test', type: 'message', role: 'assistant', model: params.model, stop_reason: 'end_turn', stop_sequence: null,
    content: [{ type: 'text', text: JSON.stringify({ segments: items.map((it) => ({ id: it.id, t: mockTranslate(it.text, lang, G) })) }) }],
    usage,
  };
}

/** A fake Claude API: /v1/messages, /v1/messages/batches, retrieve and JSONL results. */
function fakeApi({ status = 200 } = {}) {
  const seen = [];
  const batches = new Map();
  const fetch = async (url, init = {}) => {
    const u = new URL(String(url));
    const body = init.body ? JSON.parse(init.body) : null;
    const headers = new Headers(init.headers);
    seen.push({ method: init.method ?? 'GET', path: u.pathname, body, headers });
    if (status !== 200) return json(status, { type: 'error', error: { type: 'authentication_error', message: 'invalid x-api-key' } });
    if (u.pathname === '/v1/messages' && init.method === 'POST') return json(200, message(body));
    if (u.pathname === '/v1/messages/batches' && init.method === 'POST') {
      const id = `msgbatch_${batches.size + 1}`;
      batches.set(id, body.requests);
      return json(200, { id, type: 'message_batch', processing_status: 'in_progress', request_counts: { processing: body.requests.length, succeeded: 0, errored: 0, canceled: 0, expired: 0 }, results_url: null, created_at: '2026-09-25T00:00:00Z', expires_at: '2026-09-26T00:00:00Z', ended_at: null, cancel_initiated_at: null, archived_at: null });
    }
    const m = /^\/v1\/messages\/batches\/([^/]+)(\/results)?$/.exec(u.pathname);
    if (m && !m[2]) {
      return json(200, { id: m[1], type: 'message_batch', processing_status: 'ended', request_counts: { processing: 0, succeeded: batches.get(m[1]).length, errored: 0, canceled: 0, expired: 0 }, results_url: `https://api.anthropic.com/v1/messages/batches/${m[1]}/results`, created_at: '2026-09-25T00:00:00Z', expires_at: '2026-09-26T00:00:00Z', ended_at: '2026-09-25T00:10:00Z', cancel_initiated_at: null, archived_at: null });
    }
    if (m && m[2]) {
      const lines = batches.get(m[1]).map((r) => JSON.stringify({ custom_id: r.custom_id, result: { type: 'succeeded', message: message(r.params, { input_tokens: 900, output_tokens: 700 }) } }));
      return new Response(lines.join('\n') + '\n', { status: 200, headers: { 'content-type': 'application/binary' } });
    }
    return json(404, { type: 'error', error: { type: 'not_found_error', message: u.pathname } });
  };
  return { fetch, seen };
}

test('sync through the official SDK: request shape and real usage', async () => {
  const s = scratch();
  try {
    const root = fixtureTree(s.dir, ['bok/patterns/aibom.md']);
    const dirs = scratchDirs(s.dir, { I18N_SOURCE_ROOT: root });
    const api = fakeApi();
    const client = await createApiClient({ fetch: api.fetch, apiKey: 'sk-ant-test', maxRetries: 0 });
    const report = await run({ mode: 'sync', dirs, langs: ['de'], maxUsd: 0.5, client, date: '2026-09-25', log: silent });
    const calls = api.seen.filter((c) => c.path === '/v1/messages');
    assert.ok(calls.length >= 1);
    const b = calls[0].body;
    assert.equal(b.model, 'claude-haiku-4-5-20251001');
    assert.equal(b.temperature, 0.2);
    assert.deepEqual(b.system[0].cache_control, { type: 'ephemeral' });
    assert.equal(b.output_config.format.type, 'json_schema');
    assert.ok(b.max_tokens > 0 && b.max_tokens <= 16000);
    assert.equal(calls[0].headers.get('x-api-key'), 'sk-ant-test');
    assert.equal(report.perLang.de.written.length, 1);
    // 900 input + 5000 cache reads at 0.1 + 700 output at 5, per call.
    const perCall = (900 + 500) * 1e-6 + 700 * 5e-6;
    assert.ok(Math.abs(report.spentUsd - perCall * calls.length) < 1e-9);
  } finally {
    s.cleanup();
  }
});

test('batch through the official SDK: create, retrieve, JSONL results, pending file cleared', async () => {
  const s = scratch();
  try {
    const root = fixtureTree(s.dir, ['bok/patterns/aibom.md', 'bok/patterns/policy-card.md']);
    const dirs = scratchDirs(s.dir, { I18N_SOURCE_ROOT: root });
    const api = fakeApi();
    const client = await createApiClient({ fetch: api.fetch, apiKey: 'sk-ant-test', maxRetries: 0 });
    const report = await run({ mode: 'batch', dirs, langs: ['fr', 'pt'], maxUsd: 1, client, pollMs: 0, date: '2026-09-25', log: silent });
    const create = api.seen.find((c) => c.path === '/v1/messages/batches' && c.method === 'POST');
    assert.ok(create);
    for (const r of create.body.requests) {
      assert.match(r.custom_id, /^[a-zA-Z0-9_-]{1,64}$/);
      assert.equal(r.params.model, 'claude-haiku-4-5-20251001');
      assert.equal(r.params.output_config.format.type, 'json_schema');
    }
    assert.ok(api.seen.some((c) => c.path.endsWith('/results')));
    assert.ok(!existsSync(join(dirs.tmDir, 'pending-batches.json')));
    assert.equal(report.perLang.fr.written.length, 2);
    assert.equal(report.perLang.pt.written.length, 2);
    // Batch usage is billed at half price.
    const perRequest = (900 * 1e-6 + 700 * 5e-6) / 2;
    assert.ok(Math.abs(report.spentUsd - perRequest * create.body.requests.length) < 1e-9);
    const fr = readFileSync(join(dirs.i18nDir, 'fr', 'patterns', 'aibom.md'), 'utf8');
    assert.match(fr, /translatedBy: "machine: claude-haiku-4-5-20251001"/);
  } finally {
    s.cleanup();
  }
});

test('an authentication error stops the run at once and writes nothing', async () => {
  const s = scratch();
  try {
    const root = fixtureTree(s.dir, ['bok/patterns/aibom.md']);
    const dirs = scratchDirs(s.dir, { I18N_SOURCE_ROOT: root });
    const api = fakeApi({ status: 401 });
    const client = await createApiClient({ fetch: api.fetch, apiKey: 'sk-ant-bad', maxRetries: 0 });
    await assert.rejects(run({ mode: 'sync', dirs, langs: ['es'], maxUsd: 1, client, concurrency: 1, date: '2026-09-25', log: silent }), (e) => e.status === 401);
    assert.ok(!existsSync(join(dirs.i18nDir, 'es')));
  } finally {
    s.cleanup();
  }
});
