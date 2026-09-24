// helpers.ts: test scaffolding. A static server over test/fixtures that
// behaves like the site's host (ETag, Last-Modified, 304), and a running
// instance of the MCP app pointed at it, with a captured log.

import { createHash } from 'node:crypto';
import { readFileSync, statSync } from 'node:fs';
import { createServer, type Server } from 'node:http';
import type { AddressInfo } from 'node:net';
import { dirname, extname, join, normalize, resolve, sep } from 'node:path';
import { fileURLToPath } from 'node:url';

import { serve } from '@hono/node-server';
import { Client, StreamableHTTPClientTransport } from '@modelcontextprotocol/client';

import { createApp, type App } from '../src/app.js';
import { loadConfig, type Config } from '../src/config.js';
import { DataSource } from '../src/data.js';
import { createLogger, type Logger } from '../src/log.js';
import { Upstream } from '../src/upstream.js';

const here = dirname(fileURLToPath(import.meta.url));
/** tools/mcp-server/test/fixtures (tests run from .test-dist/test). */
export const FIXTURES = resolve(here, '..', '..', 'test', 'fixtures');
/** tools/mcp-server. */
export const PACKAGE_ROOT = resolve(here, '..', '..');

const TYPES: Record<string, string> = {
  '.json': 'application/json',
  '.txt': 'text/plain; charset=utf-8',
  '.md': 'text/markdown; charset=utf-8',
  '.yaml': 'application/yaml',
  '.rego': 'text/plain; charset=utf-8',
  '.csv': 'text/csv; charset=utf-8',
};

export interface FixtureServer {
  url: string;
  /** Requests per path, and how many carried a validator. */
  hits: Map<string, { total: number; conditional: number; notModified: number }>;
  /** Make a path answer with this status (or restore it with null). */
  failWith(path: string, status: number | null): void;
  /** Serve this body for a path instead of the file (or restore it with null). */
  override(path: string, body: string | null): void;
  close(): Promise<void>;
}

export async function startFixtureServer(): Promise<FixtureServer> {
  const hits = new Map<string, { total: number; conditional: number; notModified: number }>();
  const failures = new Map<string, number>();
  const overrides = new Map<string, string>();
  const server: Server = createServer((req, res) => {
    const path = decodeURIComponent(new URL(req.url ?? '/', 'http://x').pathname);
    const hit = hits.get(path) ?? { total: 0, conditional: 0, notModified: 0 };
    hit.total += 1;
    if (req.headers['if-none-match'] || req.headers['if-modified-since']) hit.conditional += 1;
    hits.set(path, hit);
    const failure = failures.get(path);
    if (failure !== undefined) {
      res.writeHead(failure, { 'content-type': 'text/plain' }).end('failure');
      return;
    }
    let body: Buffer;
    let modified: Date;
    const override = overrides.get(path);
    if (override !== undefined) {
      body = Buffer.from(override);
      modified = new Date(0);
    } else {
      const file = normalize(join(FIXTURES, path));
      if (!file.startsWith(FIXTURES + sep)) {
        res.writeHead(400).end();
        return;
      }
      try {
        body = readFileSync(file);
        modified = statSync(file).mtime;
      } catch {
        res.writeHead(404, { 'content-type': 'text/plain' }).end('not found');
        return;
      }
    }
    const etag = `"${createHash('sha1').update(body).digest('hex')}"`;
    if (req.headers['if-none-match'] === etag) {
      hit.notModified += 1;
      res.writeHead(304, { etag }).end();
      return;
    }
    res
      .writeHead(200, {
        'content-type': TYPES[extname(path)] ?? 'application/octet-stream',
        'content-length': body.length,
        etag,
        'last-modified': modified.toUTCString(),
      })
      .end(body);
  });
  await new Promise<void>((done) => server.listen(0, '127.0.0.1', done));
  const { port } = server.address() as AddressInfo;
  return {
    url: `http://127.0.0.1:${port}`,
    hits,
    failWith: (path, status) => (status === null ? failures.delete(path) : failures.set(path, status)),
    override: (path, body) => (body === null ? overrides.delete(path) : overrides.set(path, body)),
    close: () => new Promise<void>((done) => server.close(() => done())),
  };
}

export interface RunningApp {
  url: string;
  config: Config;
  logs: string[];
  app: App;
  data: DataSource;
  close(): Promise<void>;
}

export interface AppOptions {
  env?: Record<string, string>;
  logger?: Logger;
}

export async function startApp(fixtures: FixtureServer, options: AppOptions = {}): Promise<RunningApp> {
  const logs: string[] = [];
  const config = loadConfig({
    API_BASE: `${fixtures.url}/api/v1`,
    HOST: '127.0.0.1',
    LOG_LEVEL: 'debug',
    ...options.env,
  });
  const logger = options.logger ?? createLogger('debug', (line) => logs.push(line));
  const upstream = new Upstream({
    ttlMs: config.cacheTtlMs,
    timeoutMs: config.fetchTimeoutMs,
    maxBytes: config.maxUpstreamBytes,
    logger,
  });
  const data = new DataSource(upstream, config);
  const app = createApp({ config, data, logger });
  const server = await new Promise<ReturnType<typeof serve>>((done) => {
    const s = serve({ fetch: app.app.fetch, port: 0, hostname: '127.0.0.1' }, () => done(s));
  });
  const { port } = server.address() as AddressInfo;
  return {
    url: `http://127.0.0.1:${port}`,
    config,
    logs,
    app,
    data,
    close: async () => {
      await app.close();
      await new Promise<void>((done) => server.close(() => done()));
    },
  };
}

export async function connect(url: string): Promise<Client> {
  const client = new Client({ name: 'aige-mcp-tests', version: '1.0.0' });
  await client.connect(new StreamableHTTPClientTransport(new URL(`${url}/mcp`)));
  return client;
}

/** The text of a tool result's first content block. */
export function textOf(result: { content?: unknown }): string {
  const content = result.content as { type: string; text?: string }[] | undefined;
  return content?.find((block) => block.type === 'text')?.text ?? '';
}

export function readFixture(path: string): string {
  return readFileSync(join(FIXTURES, path), 'utf8');
}
