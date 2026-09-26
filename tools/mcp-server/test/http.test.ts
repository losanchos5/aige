// http.test.ts: the HTTP surface: health, discovery, CORS, Host and Origin
// guards, rate limit, body limit, batch refusal, the cap on requests in
// progress, the legacy (2025-era) stateless leg and the privacy of the logs.

import assert from 'node:assert/strict';
import { request } from 'node:http';
import { after, before, describe, it } from 'node:test';

import { createLogger } from '../src/log.js';
import { startApp, startFixtureServer, type FixtureServer, type RunningApp } from './helpers.js';

let fixtures: FixtureServer;
let running: RunningApp;

before(async () => {
  fixtures = await startFixtureServer();
  running = await startApp(fixtures, {
    env: { RATE_LIMIT_MAX: '1000', MAX_BODY_BYTES: '2048', PUBLIC_URL: 'https://mcp.example.test' },
  });
});

after(async () => {
  await running.close();
  await fixtures.close();
});

const LEGACY_INIT = {
  jsonrpc: '2.0',
  id: 1,
  method: 'initialize',
  params: {
    protocolVersion: '2025-06-18',
    capabilities: {},
    clientInfo: { name: 'legacy-client', version: '1.0.0' },
  },
};

function post(url: string, body: unknown, headers: Record<string, string> = {}): Promise<Response> {
  return fetch(url, {
    method: 'POST',
    headers: {
      'content-type': 'application/json',
      accept: 'application/json, text/event-stream',
      ...headers,
    },
    body: typeof body === 'string' ? body : JSON.stringify(body),
  });
}

/** A raw request with a chosen Host header (fetch does not let a caller set Host). */
function withHost(url: string, method: string, host: string, body?: unknown): Promise<number> {
  return new Promise((done, fail) => {
    const payload = body === undefined ? undefined : JSON.stringify(body);
    const req = request(
      url,
      {
        method,
        headers: {
          host,
          'content-type': 'application/json',
          accept: 'application/json, text/event-stream',
          ...(payload ? { 'content-length': Buffer.byteLength(payload) } : {}),
        },
      },
      (res) => {
        res.resume();
        res.on('end', () => done(res.statusCode ?? 0));
      },
    );
    req.on('error', fail);
    req.end(payload);
  });
}

/** A JSON-RPC response from a JSON or single-event SSE body. */
async function rpc(response: Response): Promise<Record<string, any>> {
  const text = await response.text();
  if ((response.headers.get('content-type') ?? '').includes('text/event-stream')) {
    const data = text
      .split('\n')
      .filter((line) => line.startsWith('data:'))
      .map((line) => line.slice(5).trim())
      .pop();
    return JSON.parse(data ?? '{}') as Record<string, any>;
  }
  return JSON.parse(text) as Record<string, any>;
}

describe('health and discovery', () => {
  it('answers /healthz without touching the upstream', async () => {
    const before = fixtures.hits.size;
    const response = await fetch(`${running.url}/healthz`);
    assert.equal(response.status, 200);
    const body = (await response.json()) as Record<string, any>;
    assert.equal(body.status, 'ok');
    assert.equal(body.version, '0.6.0');
    assert.equal(typeof body.upstream.entries, 'number');
    assert.equal(fixtures.hits.size, before);
  });

  it('answers /healthz whatever the Host header (container health checks)', async () => {
    assert.equal(await withHost(`${running.url}/healthz`, 'GET', 'internal.invalid'), 200);
  });

  it('serves a discovery document at /', async () => {
    const response = await fetch(`${running.url}/`);
    const body = (await response.json()) as Record<string, any>;
    assert.equal(body.mcp.endpoint, 'https://mcp.example.test/mcp');
    assert.ok(body.tools.includes('map_clause'));
    assert.match(body.notice, /not legal advice/);
  });

  it('answers unknown paths with a JSON 404', async () => {
    const response = await fetch(`${running.url}/nope`);
    assert.equal(response.status, 404);
    assert.match(((await response.json()) as { error: string }).error, /\/mcp/);
  });
});

describe('guards', () => {
  it('rejects a Host that is not allowed (DNS-rebinding guard)', async () => {
    assert.equal(await withHost(`${running.url}/mcp`, 'POST', 'evil.example', LEGACY_INIT), 403);
    assert.equal(await withHost(`${running.url}/`, 'GET', 'evil.example:8787'), 403);
  });

  it('accepts the public host and the loopback names', async () => {
    assert.equal(await withHost(`${running.url}/mcp`, 'POST', 'mcp.example.test', LEGACY_INIT), 200);
    assert.equal(await withHost(`${running.url}/mcp`, 'POST', 'localhost:8787', LEGACY_INIT), 200);
  });

  it('answers a CORS preflight for the MCP headers', async () => {
    const response = await fetch(`${running.url}/mcp`, {
      method: 'OPTIONS',
      headers: {
        origin: 'https://client.example',
        'access-control-request-method': 'POST',
        'access-control-request-headers': 'content-type, mcp-protocol-version, mcp-method, mcp-name, mcp-param-region',
      },
    });
    assert.equal(response.status, 204);
    assert.equal(response.headers.get('access-control-allow-origin'), '*');
    assert.match(response.headers.get('access-control-allow-methods') ?? '', /POST/);
    assert.match(response.headers.get('access-control-allow-headers') ?? '', /mcp-param-region/);
    assert.equal(response.headers.get('access-control-allow-credentials'), null);
  });

  it('exposes the protocol and rate-limit headers to browsers', async () => {
    const response = await post(`${running.url}/mcp`, LEGACY_INIT, { origin: 'https://client.example' });
    assert.equal(response.headers.get('access-control-allow-origin'), '*');
    assert.match(response.headers.get('access-control-expose-headers') ?? '', /RateLimit-Remaining/);
    assert.ok(response.headers.get('ratelimit-limit'));
    assert.match(response.headers.get('cache-control') ?? '', /no-(store|cache)/);
    await response.text();
  });

  it('answers 413 for an oversized body before parsing it', async () => {
    const big = JSON.stringify({ ...LEGACY_INIT, padding: 'x'.repeat(4096) });
    const response = await post(`${running.url}/mcp`, big);
    assert.equal(response.status, 413);
  });

  it('refuses JSON-RPC batch arrays with 400 and still serves single messages', async () => {
    const call = { jsonrpc: '2.0', method: 'tools/call', params: { name: 'get_term', arguments: { slug: 'abstention-band' } } };
    const batch = await post(`${running.url}/mcp`, [{ ...call, id: 1 }, { ...call, id: 2 }], { 'mcp-protocol-version': '2025-06-18' });
    assert.equal(batch.status, 400);
    const body = (await batch.json()) as Record<string, any>;
    assert.equal(body.error.code, -32600);
    assert.match(body.error.message, /batch/);
    const spaced = await post(`${running.url}/mcp`, ` 
[${JSON.stringify({ ...call, id: 3 })}]`, { 'mcp-protocol-version': '2025-06-18' });
    assert.equal(spaced.status, 400, 'leading whitespace does not hide the array');
    await spaced.text();
    const single = await post(`${running.url}/mcp`, { ...call, id: 4 }, { 'mcp-protocol-version': '2025-06-18' });
    assert.equal(single.status, 200);
    assert.equal((await rpc(single)).result.structuredContent.slug, 'abstention-band');
  });

  it('answers 405 to GET on the MCP endpoint (no standalone stream)', async () => {
    const response = await fetch(`${running.url}/mcp`, { headers: { accept: 'text/event-stream' } });
    assert.equal(response.status, 405);
  });
});

describe('legacy (2025-era) clients', () => {
  it('initialises without a session and lists tools statelessly', async () => {
    const init = await post(`${running.url}/mcp`, LEGACY_INIT);
    assert.equal(init.status, 200);
    assert.equal(init.headers.get('mcp-session-id'), null, 'no session is minted');
    const result = await rpc(init);
    assert.equal(result.result.serverInfo.name, 'aigovernanceengineer');
    assert.match(result.result.instructions, /not legal advice/);

    const list = await post(
      `${running.url}/mcp`,
      { jsonrpc: '2.0', id: 2, method: 'tools/list', params: {} },
      { 'mcp-protocol-version': '2025-06-18' },
    );
    assert.equal(list.status, 200);
    const tools = await rpc(list);
    assert.ok(tools.result.tools.length >= 10);
  });

  it('calls a tool statelessly', async () => {
    const call = await post(
      `${running.url}/mcp`,
      { jsonrpc: '2.0', id: 3, method: 'tools/call', params: { name: 'get_term', arguments: { slug: 'abstention-band' } } },
      { 'mcp-protocol-version': '2025-06-18' },
    );
    const body = await rpc(call);
    assert.equal(body.result.structuredContent.slug, 'abstention-band');
  });
});

describe('rate limit', () => {
  it('answers 429 with Retry-After once the window is spent', async () => {
    const limited = await startApp(fixtures, { env: { RATE_LIMIT_MAX: '2', RATE_LIMIT_WINDOW_MS: '60000' } });
    try {
      const statuses: number[] = [];
      let last: Response | undefined;
      for (let i = 0; i < 3; i += 1) {
        last = await post(`${limited.url}/mcp`, LEGACY_INIT);
        statuses.push(last.status);
        if (i < 2) await last.text();
      }
      assert.deepEqual(statuses, [200, 200, 429]);
      assert.ok(Number(last?.headers.get('retry-after')) > 0);
      const body = (await last?.json()) as Record<string, any>;
      assert.equal(body.error.code, -32000);
      const health = await fetch(`${limited.url}/healthz`);
      assert.equal(health.status, 200, '/healthz is not rate limited');
    } finally {
      await limited.close();
    }
  });

  it('keys clients by the right-most X-Forwarded-For entry behind a trusted proxy', async () => {
    const proxied = await startApp(fixtures, { env: { RATE_LIMIT_MAX: '1', TRUST_PROXY: 'true' } });
    try {
      const a = await post(`${proxied.url}/mcp`, LEGACY_INIT, { 'x-forwarded-for': '198.51.100.7, 203.0.113.1' });
      const b = await post(`${proxied.url}/mcp`, LEGACY_INIT, { 'x-forwarded-for': '203.0.113.2' });
      const c = await post(`${proxied.url}/mcp`, LEGACY_INIT, { 'x-forwarded-for': '198.51.100.9, 203.0.113.1' });
      assert.deepEqual([a.status, b.status, c.status], [200, 200, 429]);
      await Promise.all([a.text(), b.text(), c.text()]);
    } finally {
      await proxied.close();
    }
  });

  it('ignores X-Forwarded-For from a peer that is not a trusted proxy', async () => {
    const guarded = await startApp(fixtures, {
      env: { RATE_LIMIT_MAX: '1', TRUST_PROXY: 'true', TRUSTED_PROXIES: '192.0.2.10' },
    });
    try {
      const a = await post(`${guarded.url}/mcp`, LEGACY_INIT, { 'x-forwarded-for': '203.0.113.2' });
      const b = await post(`${guarded.url}/mcp`, LEGACY_INIT, { 'x-forwarded-for': '203.0.113.3' });
      assert.deepEqual([a.status, b.status], [200, 429], 'both are keyed by the socket address');
      await Promise.all([a.text(), b.text()]);
    } finally {
      await guarded.close();
    }
    const trusted = await startApp(fixtures, {
      env: { RATE_LIMIT_MAX: '1', TRUST_PROXY: 'true', TRUSTED_PROXIES: '127.0.0.1' },
    });
    try {
      const a = await post(`${trusted.url}/mcp`, LEGACY_INIT, { 'x-forwarded-for': '203.0.113.2' });
      const b = await post(`${trusted.url}/mcp`, LEGACY_INIT, { 'x-forwarded-for': '203.0.113.3' });
      assert.deepEqual([a.status, b.status], [200, 200], 'the proxy at 127.0.0.1 is trusted');
      await Promise.all([a.text(), b.text()]);
    } finally {
      await trusted.close();
    }
  });

  it('warns once per client and window, then logs refusals at debug', async () => {
    const lines: string[] = [];
    const quiet = await startApp(fixtures, {
      env: { RATE_LIMIT_MAX: '1', LOG_LEVEL: 'debug' },
      logger: createLogger('debug', (line) => lines.push(line)),
    });
    try {
      for (let i = 0; i < 4; i += 1) await (await post(`${quiet.url}/mcp`, LEGACY_INIT)).text();
      const limited = lines.map((l) => JSON.parse(l) as Record<string, unknown>).filter((l) => l.msg === 'rate limited');
      assert.deepEqual(
        limited.map((l) => l.level),
        ['warn', 'debug', 'debug'],
      );
    } finally {
      await quiet.close();
    }
  });
});

describe('requests in progress', () => {
  it('answers 503 with Retry-After above the cap and frees the slot when the answer ends', async () => {
    const capped = await startApp(fixtures, { env: { MAX_CONCURRENT_REQUESTS: '1', CACHE_TTL_MS: '0' } });
    const call = (id: number): Promise<Response> =>
      post(
        `${capped.url}/mcp`,
        { jsonrpc: '2.0', id, method: 'tools/call', params: { name: 'list_patterns', arguments: {} } },
        { 'mcp-protocol-version': '2025-06-18' },
      );
    fixtures.stall('/api/v1/patterns.json', 400);
    try {
      const slow = call(1);
      await new Promise((done) => setTimeout(done, 150));
      const busy = await call(2);
      assert.equal(busy.status, 503);
      assert.equal(busy.headers.get('retry-after'), '1');
      assert.equal(((await busy.json()) as Record<string, any>).error.code, -32000);
      const first = await slow;
      assert.equal(first.status, 200);
      assert.ok(Array.isArray((await rpc(first)).result.structuredContent.patterns));
      fixtures.stall('/api/v1/patterns.json', null);
      const after = await call(3);
      assert.equal(after.status, 200, 'the slot is free once the first answer ended');
      await after.text();
    } finally {
      fixtures.stall('/api/v1/patterns.json', null);
      await capped.close();
    }
  });
});

describe('origin allowlist', () => {
  it('rejects an Origin outside the list with 403 and accepts one inside it', async () => {
    const strict = await startApp(fixtures, { env: { ALLOWED_ORIGINS: 'https://claude.ai' } });
    try {
      const bad = await post(`${strict.url}/mcp`, LEGACY_INIT, { origin: 'https://evil.example' });
      assert.equal(bad.status, 403);
      await bad.text();
      const good = await post(`${strict.url}/mcp`, LEGACY_INIT, { origin: 'https://claude.ai' });
      assert.equal(good.status, 200);
      assert.equal(good.headers.get('access-control-allow-origin'), 'https://claude.ai');
      await good.text();
      const none = await post(`${strict.url}/mcp`, LEGACY_INIT);
      assert.equal(none.status, 200, 'non-browser clients send no Origin');
      await none.text();
    } finally {
      await strict.close();
    }
  });
});

describe('logs', () => {
  it('are JSON lines without IPs, user agents or tool arguments', async () => {
    await post(
      `${running.url}/mcp`,
      { jsonrpc: '2.0', id: 9, method: 'tools/call', params: { name: 'search_glossary', arguments: { query: 'secret-query-text' } } },
      {
        'mcp-protocol-version': '2025-06-18',
        'mcp-method': 'tools/call',
        'mcp-name': 'search_glossary',
        'user-agent': 'UniqueAgent/9.9',
        'x-forwarded-for': '198.51.100.77',
      },
    ).then((r) => r.text());
    const lines = running.logs.map((line) => JSON.parse(line) as Record<string, unknown>);
    assert.ok(lines.length > 0);
    const all = running.logs.join('\n');
    const allowed = new Set(['ts', 'level', 'msg', 'method', 'path', 'status', 'ms', 'mcpMethod', 'mcpName', 'protocol']);
    for (const line of lines.filter((l) => l.msg === 'request')) {
      for (const key of Object.keys(line)) assert.ok(allowed.has(key), `request log field ${key}`);
    }
    assert.ok(!all.includes('198.51.100.77'), 'no forwarded IP');
    assert.ok(!all.includes('UniqueAgent'), 'no user agent');
    assert.ok(!all.includes('secret-query-text'), 'no tool arguments');
    const request = lines.find((l) => l.msg === 'request' && l.mcpName === 'search_glossary');
    assert.ok(request, 'the request line names the tool');
    assert.equal(request.status, 200);
    assert.equal(typeof request.ms, 'number');
  });
});
