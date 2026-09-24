// config.ts: every runtime setting of the MCP server comes from the environment,
// with defaults that suit the production deployment (the public API at
// aigovernanceengineer.com, one container behind Caddy). Invalid values fail
// at start-up, not at the first request.

export type LogLevel = 'debug' | 'info' | 'warn' | 'error';

export interface Config {
  /** TCP port the HTTP server listens on. */
  port: number;
  /** Interface to bind: 0.0.0.0 in a container, 127.0.0.1 for local runs. */
  host: string;
  /** Base URL of the open-data API, without a trailing slash (…/api/v1). */
  apiBase: string;
  /** Base URL of the site the API belongs to (schemas, templates, llms-full.txt). */
  siteBase: string;
  /** Public URL of this server, used in the discovery document at `/`. */
  publicUrl: string;
  /** How long a fetched document is served from memory before revalidation. */
  cacheTtlMs: number;
  /** Timeout of one upstream request. */
  fetchTimeoutMs: number;
  /** Largest upstream document accepted, in bytes. */
  maxUpstreamBytes: number;
  /** Largest request body accepted on /mcp, in bytes. */
  maxBodyBytes: number;
  /** Requests allowed per client IP per window on /mcp. */
  rateLimitMax: number;
  /** Length of the rate-limit window. */
  rateLimitWindowMs: number;
  /**
   * Host header values accepted on every route but /healthz (lower case, no
   * port). This is the DNS-rebinding guard. Default: the host of PUBLIC_URL
   * plus the loopback names; ALLOWED_HOSTS=* accepts any host (empty list).
   */
  allowedHosts: string[];
  /** Origins allowed by CORS: ['*'] for any origin (the default: public, read-only, no credentials). */
  allowedOrigins: string[];
  /** Take the client IP from the right-most X-Forwarded-For entry (set by the reverse proxy). */
  trustProxy: boolean;
  logLevel: LogLevel;
}

type Env = Record<string, string | undefined>;

const DEFAULT_API_BASE = 'https://aigovernanceengineer.com/api/v1';

function int(env: Env, name: string, fallback: number, min: number, max: number): number {
  const raw = env[name];
  if (raw === undefined || raw.trim() === '') return fallback;
  const value = Number(raw);
  if (!Number.isInteger(value) || value < min || value > max) {
    throw new Error(`config: ${name} must be an integer between ${min} and ${max} (got "${raw}")`);
  }
  return value;
}

function httpUrl(name: string, raw: string): string {
  let url: URL;
  try {
    url = new URL(raw);
  } catch {
    throw new Error(`config: ${name} is not a URL (got "${raw}")`);
  }
  if (url.protocol !== 'https:' && url.protocol !== 'http:') {
    throw new Error(`config: ${name} must be an http(s) URL (got "${raw}")`);
  }
  if (url.search || url.hash || url.username || url.password) {
    throw new Error(`config: ${name} must not carry a query, fragment or credentials`);
  }
  return url.href.replace(/\/+$/, '');
}

function list(raw: string | undefined, fallback: string[]): string[] {
  if (raw === undefined) return fallback;
  return raw
    .split(',')
    .map((item) => item.trim().toLowerCase())
    .filter((item) => item !== '');
}

const LOOPBACK_HOSTS = ['localhost', '127.0.0.1', '[::1]'];

function hosts(raw: string | undefined, publicUrl: string): string[] {
  if (raw !== undefined && raw.trim() === '*') return [];
  const fallback = [...new Set([new URL(publicUrl).hostname.toLowerCase(), ...LOOPBACK_HOSTS])];
  const given = list(raw, fallback);
  return given.length > 0 ? given : fallback;
}

function flag(raw: string | undefined, fallback: boolean): boolean {
  if (raw === undefined || raw.trim() === '') return fallback;
  return ['1', 'true', 'yes', 'on'].includes(raw.trim().toLowerCase());
}

/** The site base of an API base: `…/api/v1` stripped, else the origin. */
export function siteBaseOf(apiBase: string): string {
  const stripped = apiBase.replace(/\/api\/v1$/, '');
  return stripped === apiBase ? new URL(apiBase).origin : stripped;
}

export function loadConfig(env: Env = process.env): Config {
  const apiBase = httpUrl('API_BASE', env.API_BASE ?? DEFAULT_API_BASE);
  const siteBase = env.SITE_BASE ? httpUrl('SITE_BASE', env.SITE_BASE) : siteBaseOf(apiBase);
  const port = int(env, 'PORT', 8787, 1, 65535);
  const publicUrl = env.PUBLIC_URL ? httpUrl('PUBLIC_URL', env.PUBLIC_URL) : `http://localhost:${port}`;
  const level = (env.LOG_LEVEL ?? 'info').trim().toLowerCase();
  if (!['debug', 'info', 'warn', 'error'].includes(level)) {
    throw new Error(`config: LOG_LEVEL must be debug, info, warn or error (got "${env.LOG_LEVEL}")`);
  }
  return {
    port,
    host: env.HOST?.trim() || '0.0.0.0',
    apiBase,
    siteBase,
    publicUrl,
    cacheTtlMs: int(env, 'CACHE_TTL_MS', 60 * 60 * 1000, 0, 7 * 24 * 60 * 60 * 1000),
    fetchTimeoutMs: int(env, 'FETCH_TIMEOUT_MS', 10_000, 100, 120_000),
    maxUpstreamBytes: int(env, 'MAX_UPSTREAM_BYTES', 16 * 1024 * 1024, 1024, 256 * 1024 * 1024),
    maxBodyBytes: int(env, 'MAX_BODY_BYTES', 64 * 1024, 1024, 4 * 1024 * 1024),
    rateLimitMax: int(env, 'RATE_LIMIT_MAX', 120, 1, 1_000_000),
    rateLimitWindowMs: int(env, 'RATE_LIMIT_WINDOW_MS', 60_000, 1000, 24 * 60 * 60 * 1000),
    allowedHosts: hosts(env.ALLOWED_HOSTS, publicUrl),
    allowedOrigins: list(env.ALLOWED_ORIGINS, ['*']),
    trustProxy: flag(env.TRUST_PROXY, false),
    logLevel: level as LogLevel,
  };
}
