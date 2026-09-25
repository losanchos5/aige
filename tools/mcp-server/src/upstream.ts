// upstream.ts: a read-through cache in front of the site's static files.
//
// Every document (a dataset under /api/v1, a schema, a template, llms-full.txt)
// is fetched once and kept in memory. Within the TTL it is served from memory;
// after it the next reader revalidates with If-None-Match / If-Modified-Since,
// and a 304 extends the entry without a new download. Concurrent readers of the
// same URL share one request. When the upstream fails and a copy is held, the
// stale copy is served and the failure is logged (stale-if-error), and the next
// attempt waits for the retry delay (one minute, or the TTL if shorter), so a
// site that is down or hanging costs one request per document per minute, not
// one per tool call; with no copy the error reaches the caller. Parsed JSON is
// cached next to the text so a dataset is parsed once per download, not once
// per tool call.

import type { Logger } from './log.js';

export class UpstreamError extends Error {
  constructor(
    message: string,
    readonly url: string,
    readonly status?: number,
  ) {
    super(message);
    this.name = 'UpstreamError';
  }
}

export interface UpstreamOptions {
  ttlMs: number;
  timeoutMs: number;
  maxBytes: number;
  logger: Logger;
  fetch?: typeof fetch;
  now?: () => number;
  userAgent?: string;
}

interface Entry {
  text: string;
  etag: string | null;
  lastModified: string | null;
  fetchedAt: number;
  /** Set after a failed revalidation: serve this stale copy without asking again until then. */
  retryAt?: number;
  json?: unknown;
}

/** Longest wait before a failed revalidation is tried again. */
export const RETRY_AFTER_FAILURE_MS = 60_000;

export interface UpstreamStats {
  entries: number;
  requests: number;
  notModified: number;
  errors: number;
  lastSuccessAt: string | null;
  lastErrorAt: string | null;
}

export class Upstream {
  private readonly cache = new Map<string, Entry>();
  private readonly inflight = new Map<string, Promise<Entry>>();
  private readonly doFetch: typeof fetch;
  private readonly now: () => number;
  private readonly stats: Omit<UpstreamStats, 'entries'> = {
    requests: 0,
    notModified: 0,
    errors: 0,
    lastSuccessAt: null,
    lastErrorAt: null,
  };

  constructor(private readonly options: UpstreamOptions) {
    this.doFetch = options.fetch ?? fetch;
    this.now = options.now ?? Date.now;
  }

  getStats(): UpstreamStats {
    return { entries: this.cache.size, ...this.stats };
  }

  /** Drop every cached document (tests, or a manual refresh). */
  clear(): void {
    this.cache.clear();
  }

  async text(url: string): Promise<string> {
    return (await this.entry(url)).text;
  }

  async json<T = unknown>(url: string): Promise<T> {
    const entry = await this.entry(url);
    if (entry.json === undefined) {
      try {
        entry.json = JSON.parse(entry.text) as unknown;
      } catch {
        throw new UpstreamError('upstream document is not valid JSON', url);
      }
    }
    return entry.json as T;
  }

  private async entry(url: string): Promise<Entry> {
    const cached = this.cache.get(url);
    const now = this.now();
    if (cached && (now - cached.fetchedAt < this.options.ttlMs || (cached.retryAt ?? 0) > now)) return cached;
    const pending = this.inflight.get(url);
    if (pending) return pending;
    const request = this.revalidate(url, cached).finally(() => this.inflight.delete(url));
    this.inflight.set(url, request);
    return request;
  }

  private async revalidate(url: string, cached: Entry | undefined): Promise<Entry> {
    try {
      const entry = await this.download(url, cached);
      this.cache.set(url, entry);
      this.stats.lastSuccessAt = new Date(this.now()).toISOString();
      return entry;
    } catch (error) {
      this.stats.errors += 1;
      this.stats.lastErrorAt = new Date(this.now()).toISOString();
      if (cached) {
        const retryInMs = Math.min(this.options.ttlMs, RETRY_AFTER_FAILURE_MS);
        this.options.logger.warn('upstream failed, serving the stale copy', {
          url,
          error,
          ageMs: this.now() - cached.fetchedAt,
          retryInMs,
        });
        const held: Entry = { ...cached, retryAt: this.now() + retryInMs };
        this.cache.set(url, held);
        return held;
      }
      throw error instanceof UpstreamError
        ? error
        : new UpstreamError(`upstream request failed: ${(error as Error).message}`, url);
    }
  }

  private async download(url: string, cached: Entry | undefined): Promise<Entry> {
    const headers: Record<string, string> = { accept: 'application/json, text/plain;q=0.9, */*;q=0.1' };
    if (this.options.userAgent) headers['user-agent'] = this.options.userAgent;
    if (cached?.etag) headers['if-none-match'] = cached.etag;
    if (cached?.lastModified) headers['if-modified-since'] = cached.lastModified;
    this.stats.requests += 1;
    const started = this.now();
    const response = await this.doFetch(url, {
      headers,
      redirect: 'follow',
      signal: AbortSignal.timeout(this.options.timeoutMs),
    });
    if (response.status === 304 && cached) {
      this.stats.notModified += 1;
      await response.body?.cancel();
      this.options.logger.debug('upstream not modified', { url, ms: this.now() - started });
      return { ...cached, fetchedAt: this.now(), retryAt: undefined };
    }
    if (!response.ok) {
      await response.body?.cancel();
      throw new UpstreamError(`upstream answered HTTP ${response.status}`, url, response.status);
    }
    const text = await readLimited(response, this.options.maxBytes, url);
    this.options.logger.debug('upstream fetched', { url, bytes: text.length, ms: this.now() - started });
    return {
      text,
      etag: response.headers.get('etag'),
      lastModified: response.headers.get('last-modified'),
      fetchedAt: this.now(),
    };
  }
}

async function readLimited(response: Response, maxBytes: number, url: string): Promise<string> {
  const declared = Number(response.headers.get('content-length'));
  if (Number.isFinite(declared) && declared > maxBytes) {
    await response.body?.cancel();
    throw new UpstreamError(`upstream document larger than ${maxBytes} bytes`, url);
  }
  if (!response.body) return '';
  const reader = response.body.getReader();
  const chunks: Uint8Array[] = [];
  let size = 0;
  for (;;) {
    const { done, value } = await reader.read();
    if (done) break;
    size += value.byteLength;
    if (size > maxBytes) {
      await reader.cancel();
      throw new UpstreamError(`upstream document larger than ${maxBytes} bytes`, url);
    }
    chunks.push(value);
  }
  return new TextDecoder('utf-8').decode(Buffer.concat(chunks));
}
