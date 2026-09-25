import assert from 'node:assert/strict';
import { test } from 'node:test';

import { createFetcher, FetchError, USER_AGENT } from '../lib/fetcher.mjs';

// A fake clock: sleep advances time instead of waiting.
function clock() {
  let t = 1_000_000;
  const sleeps = [];
  return {
    now: () => t,
    sleep: async (ms) => {
      sleeps.push(ms);
      t += ms;
    },
    sleeps,
    advance: (ms) => {
      t += ms;
    },
  };
}

function respond(status, body = '', headers = {}) {
  return new Response(status === 304 ? null : body, { status, headers });
}

test('identifies itself and paces requests to one start per second', async () => {
  const c = clock();
  const seen = [];
  const fetchImpl = async (url, init) => {
    seen.push({ url, ua: init.headers['User-Agent'], at: c.now() });
    c.advance(100); // the request itself takes 100 ms
    return respond(200, 'ok', { 'content-type': 'text/html' });
  };
  const f = createFetcher({ fetchImpl, now: c.now, sleep: c.sleep });
  await f.get('https://a.example/1');
  await f.get('https://a.example/2');
  await f.get('https://a.example/3');
  assert.deepEqual(seen.map((s) => s.at - seen[0].at), [0, 1000, 2000]);
  assert.ok(seen.every((s) => s.ua === USER_AGENT));
  assert.match(USER_AGENT, /aigovernanceengineer\.com/);
});

test('retries 503 with backoff, honours Retry-After, then succeeds', async () => {
  const c = clock();
  const answers = [respond(503, '', { 'retry-after': '7' }), respond(502), respond(200, 'body')];
  const f = createFetcher({ fetchImpl: async () => answers.shift(), now: c.now, sleep: c.sleep, minIntervalMs: 0 });
  const res = await f.get('https://a.example/');
  assert.equal(res.status, 200);
  assert.equal(res.attempts, 3);
  assert.equal(res.bytes.toString(), 'body');
  assert.deepEqual(c.sleeps, [7000, 4000]);
});

test('gives up after the retries with the last error', async () => {
  const c = clock();
  const f = createFetcher({ fetchImpl: async () => respond(500), now: c.now, sleep: c.sleep, minIntervalMs: 0, retries: 2 });
  await assert.rejects(f.get('https://a.example/'), (err) => err instanceof FetchError && err.status === 500);
});

test('does not retry a 404', async () => {
  let calls = 0;
  const f = createFetcher({ fetchImpl: async () => { calls++; return respond(404); }, sleep: async () => {}, minIntervalMs: 0 });
  await assert.rejects(f.get('https://a.example/'), (err) => err.status === 404 && err.message === 'HTTP 404');
  assert.equal(calls, 1);
});

test('maps timeouts and network errors, retrying them', async () => {
  const errs = [Object.assign(new Error('t'), { name: 'TimeoutError' }), Object.assign(new TypeError('fetch failed'), { cause: { code: 'ECONNRESET' } })];
  const f = createFetcher({ fetchImpl: async () => { throw errs.shift(); }, sleep: async () => {}, minIntervalMs: 0, retries: 1 });
  await assert.rejects(f.get('https://a.example/'), (err) => err.code === 'network' && /ECONNRESET/.test(err.message));
});

test('sends conditional headers and reports 304 as not modified', async () => {
  let headers;
  const f = createFetcher({ fetchImpl: async (u, init) => { headers = init.headers; return respond(304); }, sleep: async () => {}, minIntervalMs: 0 });
  const res = await f.get('https://a.example/doc.pdf', { etag: '"v1"', lastModified: 'Mon, 01 Sep 2026 00:00:00 GMT' });
  assert.equal(res.notModified, true);
  assert.equal(headers['If-None-Match'], '"v1"');
  assert.equal(headers['If-Modified-Since'], 'Mon, 01 Sep 2026 00:00:00 GMT');
});

test('refuses bodies above the size cap', async () => {
  const f = createFetcher({ fetchImpl: async () => respond(200, 'x'.repeat(2000)), sleep: async () => {}, minIntervalMs: 0, maxBytes: 1000 });
  await assert.rejects(f.get('https://a.example/'), (err) => err.code === 'too-large');
});

test('the curl transport goes through curlImpl with the same headers', async () => {
  let got;
  const curlImpl = async (url, opts) => {
    got = { url, opts };
    return respond(200, 'from curl', { etag: '"c"' });
  };
  const f = createFetcher({ fetchImpl: async () => assert.fail('fetch must not be used'), curlImpl, sleep: async () => {}, minIntervalMs: 0 });
  const res = await f.get('https://www.nysenate.gov/x', { transport: 'curl' });
  assert.equal(res.bytes.toString(), 'from curl');
  assert.equal(res.etag, '"c"');
  assert.equal(got.opts.headers['User-Agent'], USER_AGENT);
  assert.equal(got.opts.timeoutMs, 30000);
});
