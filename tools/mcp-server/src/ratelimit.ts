// ratelimit.ts: a fixed-window request counter per client, in memory.
//
// The client address is never stored as such: it is keyed through an HMAC with
// a random secret drawn at start-up, so the table holds opaque digests that
// cannot be reversed or joined with another process's table. An entry lives
// only until its window closes; a sweep on every window boundary drops the
// expired ones, so nothing about a client outlives the rate-limit window. A
// restart forgets everything.

import { createHmac, randomBytes } from 'node:crypto';

export interface RateLimitDecision {
  allowed: boolean;
  limit: number;
  remaining: number;
  /** Seconds until the current window closes. */
  resetSeconds: number;
}

interface Entry {
  count: number;
  windowEnds: number;
}

export interface RateLimiterOptions {
  max: number;
  windowMs: number;
  /** Upper bound on tracked clients; beyond it the oldest windows are dropped first. */
  maxEntries?: number;
  now?: () => number;
}

export class RateLimiter {
  private readonly entries = new Map<string, Entry>();
  private readonly secret = randomBytes(32);
  private readonly max: number;
  private readonly windowMs: number;
  private readonly maxEntries: number;
  private readonly now: () => number;
  private nextSweep: number;

  constructor(options: RateLimiterOptions) {
    this.max = options.max;
    this.windowMs = options.windowMs;
    this.maxEntries = options.maxEntries ?? 100_000;
    this.now = options.now ?? Date.now;
    this.nextSweep = this.now() + this.windowMs;
  }

  /** Number of clients currently tracked (for tests and health output). */
  get size(): number {
    return this.entries.size;
  }

  private key(client: string): string {
    return createHmac('sha256', this.secret).update(client).digest('base64url').slice(0, 22);
  }

  private sweep(now: number): void {
    for (const [key, entry] of this.entries) {
      if (entry.windowEnds <= now) this.entries.delete(key);
    }
    // Still full: drop in insertion order (oldest windows first).
    while (this.entries.size >= this.maxEntries) {
      const oldest = this.entries.keys().next();
      if (oldest.done) break;
      this.entries.delete(oldest.value);
    }
    this.nextSweep = now + this.windowMs;
  }

  /** Count one request from `client` and say whether it may proceed. */
  hit(client: string): RateLimitDecision {
    const now = this.now();
    if (now >= this.nextSweep || this.entries.size >= this.maxEntries) this.sweep(now);
    const key = this.key(client);
    let entry = this.entries.get(key);
    if (!entry || entry.windowEnds <= now) {
      entry = { count: 0, windowEnds: now + this.windowMs };
      this.entries.delete(key);
      this.entries.set(key, entry);
    }
    entry.count += 1;
    const resetSeconds = Math.max(1, Math.ceil((entry.windowEnds - now) / 1000));
    return {
      allowed: entry.count <= this.max,
      limit: this.max,
      remaining: Math.max(0, this.max - entry.count),
      resetSeconds,
    };
  }
}
