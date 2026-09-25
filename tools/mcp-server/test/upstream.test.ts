// upstream.test.ts: the read-through cache: TTL, conditional revalidation,
// request coalescing, stale-if-error and the size limit.

import assert from 'node:assert/strict';
import { after, before, describe, it } from 'node:test';

import { silentLogger } from '../src/log.js';
import { RETRY_AFTER_FAILURE_MS, Upstream, UpstreamError } from '../src/upstream.js';
import { startFixtureServer, type FixtureServer } from './helpers.js';

let fixtures: FixtureServer;

before(async () => {
  fixtures = await startFixtureServer();
});

after(async () => {
  await fixtures.close();
});

function upstream(ttlMs: number, now: () => number = Date.now, maxBytes = 16 * 1024 * 1024): Upstream {
  return new Upstream({ ttlMs, timeoutMs: 5000, maxBytes, logger: silentLogger, now });
}

describe('upstream cache', () => {
  it('serves from memory within the TTL', async () => {
    const path = '/api/v1/patterns.json';
    const u = upstream(60_000);
    const first = await u.json<{ patterns: unknown[] }>(`${fixtures.url}${path}`);
    const second = await u.json<{ patterns: unknown[] }>(`${fixtures.url}${path}`);
    assert.equal(first, second, 'the parsed document is reused');
    assert.equal(fixtures.hits.get(path)?.total, 1);
  });

  it('revalidates with If-None-Match after the TTL and keeps the body on 304', async () => {
    const path = '/api/v1/chapters.json';
    let now = 0;
    const u = upstream(1000, () => now);
    const first = await u.json(`${fixtures.url}${path}`);
    now = 5000;
    const second = await u.json(`${fixtures.url}${path}`);
    assert.equal(first, second);
    const hit = fixtures.hits.get(path);
    assert.equal(hit?.total, 2);
    assert.equal(hit?.conditional, 1);
    assert.equal(hit?.notModified, 1);
    assert.equal(u.getStats().notModified, 1);
  });

  it('downloads again when the document changed', async () => {
    const path = '/changing.json';
    let now = 0;
    const u = upstream(1000, () => now);
    fixtures.override(path, '{"v":1}');
    assert.deepEqual(await u.json(`${fixtures.url}${path}`), { v: 1 });
    fixtures.override(path, '{"v":2}');
    now = 5000;
    assert.deepEqual(await u.json(`${fixtures.url}${path}`), { v: 2 });
    fixtures.override(path, null);
  });

  it('coalesces concurrent readers into one request', async () => {
    const path = '/api/v1/frameworks.json';
    const u = upstream(60_000);
    await Promise.all([1, 2, 3, 4, 5].map(() => u.text(`${fixtures.url}${path}`)));
    assert.equal(fixtures.hits.get(path)?.total, 1);
  });

  it('serves the stale copy when the upstream fails', async () => {
    const path = '/api/v1/index.json';
    let now = 0;
    const u = upstream(1000, () => now);
    const first = await u.text(`${fixtures.url}${path}`);
    fixtures.failWith(path, 503);
    now = 5000;
    try {
      assert.equal(await u.text(`${fixtures.url}${path}`), first);
      assert.equal(u.getStats().errors, 1);
    } finally {
      fixtures.failWith(path, null);
    }
  });

  it('waits before asking a failing upstream again, then retries', async () => {
    const path = '/api/v1/crosswalk.json';
    let now = 0;
    const u = upstream(10 * 60_000, () => now);
    const first = await u.text(`${fixtures.url}${path}`);
    fixtures.failWith(path, 503);
    try {
      now = 11 * 60_000;
      for (let i = 0; i < 5; i += 1) assert.equal(await u.text(`${fixtures.url}${path}`), first);
      assert.equal(fixtures.hits.get(path)?.total, 2, 'one failed revalidation, then the stale copy from memory');
      assert.equal(u.getStats().errors, 1);
      now += RETRY_AFTER_FAILURE_MS + 1;
      assert.equal(await u.text(`${fixtures.url}${path}`), first);
      assert.equal(fixtures.hits.get(path)?.total, 3, 'retried once the delay passed');
    } finally {
      fixtures.failWith(path, null);
    }
    now += RETRY_AFTER_FAILURE_MS + 1;
    assert.equal(await u.text(`${fixtures.url}${path}`), first);
    now += 1000;
    await u.text(`${fixtures.url}${path}`);
    assert.equal(fixtures.hits.get(path)?.total, 4, 'a successful revalidation restores the TTL');
  });

  it('reports the status when there is no copy', async () => {
    const u = upstream(60_000);
    await assert.rejects(u.text(`${fixtures.url}/api/v1/missing.json`), (error: unknown) => {
      assert.ok(error instanceof UpstreamError);
      assert.equal(error.status, 404);
      return true;
    });
  });

  it('refuses a document above the size limit', async () => {
    const u = upstream(60_000, Date.now, 1024);
    await assert.rejects(u.text(`${fixtures.url}/api/v1/glossary.json`), /larger than 1024 bytes/);
  });

  it('refuses invalid JSON', async () => {
    const u = upstream(60_000);
    await assert.rejects(u.json(`${fixtures.url}/templates/raci.csv`), /not valid JSON/);
  });
});
