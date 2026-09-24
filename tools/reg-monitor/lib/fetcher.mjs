// Polite HTTP client: one request start per `minIntervalMs` across the whole
// run, a per-attempt timeout, bounded retries with backoff (honouring
// Retry-After), a size cap and an identifying User-Agent.
//
// Two transports: Node's fetch (default) and curl, for the few servers whose
// firewall answers 403 to Node's HTTP client but serves curl (observed on
// nysenate.gov on 2026-09-24). curl ships on the GitHub-hosted Ubuntu runners.

import { execFile } from 'node:child_process';
import { mkdtemp, readFile, rm } from 'node:fs/promises';
import { tmpdir } from 'node:os';
import { join } from 'node:path';

export const USER_AGENT =
  'aige-reg-monitor/1.0 (+https://aigovernanceengineer.com; https://github.com/losanchos5/aige/tree/main/tools/reg-monitor)';

const RETRY_STATUS = new Set([408, 425, 429, 500, 502, 503, 504]);

export class FetchError extends Error {
  constructor(code, message, status = null) {
    super(message);
    this.code = code;
    this.status = status;
  }
}

function retryAfterMs(header, now) {
  if (!header) return null;
  const secs = Number(header);
  if (Number.isFinite(secs)) return secs * 1000;
  const at = Date.parse(header);
  return Number.isFinite(at) ? Math.max(0, at - now) : null;
}

async function readCapped(res, maxBytes) {
  const declared = Number(res.headers.get('content-length'));
  if (Number.isFinite(declared) && declared > maxBytes) {
    throw new FetchError('too-large', `Response declares ${declared} bytes, above the ${maxBytes}-byte cap`);
  }
  if (!res.body) return Buffer.alloc(0);
  const chunks = [];
  let total = 0;
  for await (const chunk of res.body) {
    total += chunk.length;
    if (total > maxBytes) throw new FetchError('too-large', `Response exceeds the ${maxBytes}-byte cap`);
    chunks.push(Buffer.from(chunk));
  }
  return Buffer.concat(chunks);
}

// A fetch-shaped wrapper around the curl binary. Returns a Response whose
// `url` is the final URL after redirects. HTTPS only, at most five redirects.
export async function curlFetch(url, { headers = {}, timeoutMs = 30000, maxBytes = null, curlBin = 'curl' } = {}) {
  const dir = await mkdtemp(join(tmpdir(), 'reg-monitor-'));
  const bodyFile = join(dir, 'body');
  const headFile = join(dir, 'head');
  const args = [
    '--silent', '--show-error', '--location', '--max-redirs', '5',
    '--max-time', String(Math.ceil(timeoutMs / 1000)), '--compressed',
    '--proto', '=https', '--proto-redir', '=https',
    '--dump-header', headFile, '--output', bodyFile, '--write-out', '%{http_code} %{url_effective}',
  ];
  if (maxBytes) args.push('--max-filesize', String(maxBytes));
  for (const [k, v] of Object.entries(headers)) args.push('--header', `${k}: ${v}`);
  args.push(url);
  try {
    const stdout = await new Promise((resolveRun, rejectRun) => {
      execFile(curlBin, args, { timeout: timeoutMs + 5000, maxBuffer: 1024 * 1024 }, (err, out, errOut) => {
        if (!err) return resolveRun(out);
        const e = new Error(`curl: ${String(errOut || err.message).trim()}`);
        if (err.code === 28 || err.killed) e.name = 'TimeoutError';
        return rejectRun(e);
      });
    });
    const [codeText, effective] = stdout.trim().split(' ');
    const status = Number(codeText);
    const rawHead = await readFile(headFile, 'utf8').catch(() => '');
    // With --location the dump holds one block per response; keep the last.
    const blocks = rawHead.split(/\r?\n\r?\n/).filter((b) => /^HTTP\//.test(b.trim()));
    const h = new Headers();
    for (const line of (blocks.at(-1) ?? '').trim().split(/\r?\n/).slice(1)) {
      const i = line.indexOf(':');
      if (i > 0) h.append(line.slice(0, i).trim(), line.slice(i + 1).trim());
    }
    h.delete('content-length'); // compressed length; the body is already decoded
    const nullBody = [101, 204, 205, 304].includes(status);
    const body = nullBody ? null : await readFile(bodyFile).catch(() => Buffer.alloc(0));
    const res = new Response(body, { status, headers: h });
    Object.defineProperty(res, 'url', { value: effective || url });
    return res;
  } finally {
    await rm(dir, { recursive: true, force: true });
  }
}

export function createFetcher({
  userAgent = USER_AGENT,
  minIntervalMs = 1000,
  timeoutMs = 30000,
  retries = 2,
  retryBaseMs = 2000,
  maxRetryAfterMs = 60000,
  maxBytes = 25 * 1024 * 1024,
  fetchImpl = globalThis.fetch,
  curlImpl = curlFetch,
  sleep = (ms) => new Promise((r) => setTimeout(r, ms)),
  now = () => Date.now(),
} = {}) {
  let lastStart = -Infinity;

  async function pace() {
    const wait = lastStart + minIntervalMs - now();
    if (wait > 0) await sleep(wait);
    lastStart = now();
  }

  // Returns { status, notModified, bytes, contentType, etag, lastModified, finalUrl, attempts }.
  async function get(url, { etag = null, lastModified = null, transport = 'fetch' } = {}) {
    let lastError = null;
    for (let attempt = 1; attempt <= retries + 1; attempt++) {
      await pace();
      const headers = {
        'User-Agent': userAgent,
        Accept: 'text/html,application/xhtml+xml,application/pdf;q=0.9,*/*;q=0.8',
        'Accept-Language': 'en;q=1.0, *;q=0.5',
      };
      if (etag) headers['If-None-Match'] = etag;
      if (lastModified) headers['If-Modified-Since'] = lastModified;
      let res;
      try {
        res = transport === 'curl'
          ? await curlImpl(url, { headers, timeoutMs, maxBytes })
          : await fetchImpl(url, { headers, redirect: 'follow', signal: AbortSignal.timeout(timeoutMs) });
      } catch (err) {
        const timedOut = err?.name === 'TimeoutError' || err?.name === 'AbortError';
        lastError = new FetchError(timedOut ? 'timeout' : 'network', timedOut ? `Timed out after ${timeoutMs} ms` : `Network error: ${err?.cause?.code ?? err?.message ?? err}`);
        if (attempt <= retries) await sleep(retryBaseMs * 2 ** (attempt - 1));
        continue;
      }
      if (res.status === 304) {
        return { status: 304, notModified: true, bytes: null, contentType: null, etag, lastModified, finalUrl: res.url || url, attempts: attempt };
      }
      if (RETRY_STATUS.has(res.status)) {
        lastError = new FetchError('http', `HTTP ${res.status}`, res.status);
        await res.body?.cancel?.().catch(() => {});
        if (attempt <= retries) {
          const hinted = retryAfterMs(res.headers.get('retry-after'), now());
          const backoff = retryBaseMs * 2 ** (attempt - 1);
          await sleep(Math.min(maxRetryAfterMs, hinted ?? backoff));
        }
        continue;
      }
      if (res.status < 200 || res.status >= 300) {
        await res.body?.cancel?.().catch(() => {});
        throw new FetchError('http', `HTTP ${res.status}`, res.status);
      }
      try {
        const bytes = await readCapped(res, maxBytes);
        return {
          status: res.status,
          notModified: false,
          bytes,
          contentType: res.headers.get('content-type') ?? '',
          etag: res.headers.get('etag'),
          lastModified: res.headers.get('last-modified'),
          finalUrl: res.url || url,
          attempts: attempt,
        };
      } catch (err) {
        if (err instanceof FetchError) throw err;
        lastError = new FetchError('network', `Body read failed: ${err?.message ?? err}`);
        if (attempt <= retries) await sleep(retryBaseMs * 2 ** (attempt - 1));
      }
    }
    throw lastError ?? new FetchError('network', 'Unknown fetch failure');
  }

  return { get };
}
