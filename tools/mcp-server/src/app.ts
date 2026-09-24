// app.ts: the HTTP surface. One Hono app with:
//   POST /mcp      the MCP endpoint (Streamable HTTP, stateless; 2025-era
//                  clients are served by the SDK's stateless legacy leg)
//   GET  /healthz  liveness and cache statistics (no upstream call)
//   GET  /         a small discovery document
// Guards, in order: Host allowlist (DNS-rebinding guard, all routes but
// /healthz), CORS (public, read-only, no credentials), Origin allowlist on /mcp
// when one is configured, per-client rate limit and body-size limit on /mcp.

import { getConnInfo } from '@hono/node-server/conninfo';
import { createMcpHandler, type McpHttpHandler } from '@modelcontextprotocol/server';
import { Hono, type Context } from 'hono';
import { bodyLimit } from 'hono/body-limit';
import { cors } from 'hono/cors';

import type { Config } from './config.js';
import type { DataSource } from './data.js';
import type { Logger } from './log.js';
import { RateLimiter } from './ratelimit.js';
import { createServer, SERVER_NAME, SERVER_VERSION } from './server.js';
import { TOOL_NAMES } from './tools/index.js';

export interface AppDeps {
  config: Config;
  data: DataSource;
  logger: Logger;
}

export interface App {
  app: Hono;
  handler: McpHttpHandler;
  limiter: RateLimiter;
  close(): Promise<void>;
}

const EXPOSED_HEADERS = [
  'MCP-Protocol-Version',
  'Mcp-Session-Id',
  'RateLimit-Limit',
  'RateLimit-Remaining',
  'RateLimit-Reset',
  'Retry-After',
];

/** A value from a client header that is safe to log (tool names, method names, our own URIs). */
function loggable(value: string | undefined): string | undefined {
  if (value === undefined) return undefined;
  return /^[A-Za-z0-9_./:#-]{1,120}$/.test(value) ? value : '[other]';
}

function hostOf(header: string | undefined): string | null {
  if (!header) return null;
  try {
    return new URL(`http://${header}`).hostname.toLowerCase();
  } catch {
    return null;
  }
}

function jsonRpcError(code: number, message: string): { jsonrpc: '2.0'; id: null; error: { code: number; message: string } } {
  return { jsonrpc: '2.0', id: null, error: { code, message } };
}

export function createApp(deps: AppDeps): App {
  const { config, data, logger } = deps;
  const startedAt = Date.now();
  const limiter = new RateLimiter({ max: config.rateLimitMax, windowMs: config.rateLimitWindowMs });
  const handler = createMcpHandler(() => createServer({ data, logger }), {
    maxRequestBodySize: config.maxBodyBytes,
    onerror: (error) => logger.warn('mcp handler error', { error }),
  });
  const anyOrigin = config.allowedOrigins.includes('*');

  const clientOf = (c: Context): string => {
    if (config.trustProxy) {
      const forwarded = c.req.header('x-forwarded-for');
      const last = forwarded?.split(',').map((part) => part.trim()).filter((part) => part !== '').pop();
      if (last) return last;
    }
    try {
      return getConnInfo(c).remote.address ?? 'unknown';
    } catch {
      return 'unknown';
    }
  };

  const app = new Hono();

  // Access log: no IP, no user agent, no body, no arguments.
  app.use('*', async (c, next) => {
    const started = performance.now();
    await next();
    const fields = {
      method: c.req.method,
      path: c.req.path,
      status: c.res.status,
      ms: Math.round(performance.now() - started),
      mcpMethod: loggable(c.req.header('mcp-method')),
      mcpName: loggable(c.req.header('mcp-name')),
      protocol: loggable(c.req.header('mcp-protocol-version')),
    };
    if (c.req.path === '/healthz') logger.debug('request', fields);
    else logger.info('request', fields);
  });

  app.use('*', async (c, next) => {
    c.header('X-Content-Type-Options', 'nosniff');
    c.header('Referrer-Policy', 'no-referrer');
    if (c.req.path === '/healthz' || config.allowedHosts.length === 0) return next();
    const host = hostOf(c.req.header('host'));
    if (host === null || !config.allowedHosts.includes(host)) {
      return c.json({ error: 'Host not allowed.' }, 403);
    }
    return next();
  });

  app.use(
    '*',
    cors({
      origin: anyOrigin ? '*' : (origin) => (config.allowedOrigins.includes(origin.toLowerCase()) ? origin : null),
      allowMethods: ['GET', 'POST', 'OPTIONS'],
      exposeHeaders: EXPOSED_HEADERS,
      maxAge: 86_400,
    }),
  );

  app.use('/mcp', async (c, next) => {
    const origin = c.req.header('origin');
    if (!anyOrigin && origin !== undefined && !config.allowedOrigins.includes(origin.toLowerCase())) {
      return c.json(jsonRpcError(-32600, 'Origin not allowed.'), 403);
    }
    const decision = limiter.hit(clientOf(c));
    c.header('RateLimit-Limit', String(decision.limit));
    c.header('RateLimit-Remaining', String(decision.remaining));
    c.header('RateLimit-Reset', String(decision.resetSeconds));
    if (!decision.allowed) {
      c.header('Retry-After', String(decision.resetSeconds));
      logger.warn('rate limited', { path: c.req.path, resetSeconds: decision.resetSeconds });
      return c.json(jsonRpcError(-32000, `Too many requests; retry in ${decision.resetSeconds} s.`), 429);
    }
    return next();
  });

  app.use(
    '/mcp',
    bodyLimit({
      maxSize: config.maxBodyBytes,
      onError: (c) => c.json(jsonRpcError(-32600, `Request body larger than ${config.maxBodyBytes} bytes.`), 413),
    }),
  );

  app.all('/mcp', async (c) => {
    const response = await handler.fetch(c.req.raw);
    const headers = new Headers(response.headers);
    for (const [key, value] of c.res.headers) {
      if (!headers.has(key)) headers.set(key, value);
    }
    if (!headers.has('cache-control')) headers.set('Cache-Control', 'no-store');
    return new Response(response.body, { status: response.status, statusText: response.statusText, headers });
  });

  app.get('/healthz', (c) =>
    c.json({
      status: 'ok',
      name: SERVER_NAME,
      version: SERVER_VERSION,
      uptimeSeconds: Math.round((Date.now() - startedAt) / 1000),
      upstream: data.upstream.getStats(),
    }),
  );

  app.get('/', (c) =>
    c.json({
      name: SERVER_NAME,
      title: 'AI Governance Engineer MCP server',
      version: SERVER_VERSION,
      description:
        'Read-only Model Context Protocol server over the open data of aigovernanceengineer.com: obligation register, crosswalk, glossary, patterns, templates and the Body of Knowledge.',
      mcp: { endpoint: `${config.publicUrl}/mcp`, transport: 'streamable-http', auth: 'none' },
      tools: TOOL_NAMES,
      data: 'https://aigovernanceengineer.com/resources/data',
      source: 'https://github.com/losanchos5/aige/tree/main/tools/mcp-server',
      license: 'CC BY 4.0',
      notice: 'Illustrative, not legal advice and not a claim of conformity.',
    }),
  );

  app.notFound((c) => c.json({ error: 'Not found. The MCP endpoint is /mcp.' }, 404));

  app.onError((error, c) => {
    logger.error('unhandled error', { path: c.req.path, error });
    return c.json({ error: 'Internal error.' }, 500);
  });

  return {
    app,
    handler,
    limiter,
    close: () => handler.close(),
  };
}
