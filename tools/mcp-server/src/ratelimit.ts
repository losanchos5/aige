// ratelimit.ts: a fixed-window request counter per client, in memory.
//
// The client address is never stored as such: it is keyed through an HMAC with
// a random secret drawn at start-up, so the table holds opaque digests that
// cannot be reversed or joined with another process's table. An entry lives
// only until its window closes; a sweep on every window boundary drops the
// expired ones, so nothing about a client outlives the rate-limit window. A
// restart forgets everything.
//
// An IPv6 client is counted by its /64: an end site holds at least a /64 and can
// pick a new source address inside it for every request (RFC 6177), so keying
// the full address would hand it a fresh window each time.

import { createHmac, randomBytes } from 'node:crypto';
import { isIP } from 'node:net';

export interface RateLimitDecision {
  allowed: boolean;
  limit: number;
  remaining: number;
  /** Seconds until the current window closes. */
  resetSeconds: number;
  /** True only for the first refused request of a window (log that one, not every refusal). */
  firstRefusal: boolean;
}

/** `::ffff:192.0.2.1` → `192.0.2.1`; any other value unchanged. */
export function unmapIPv4(address: string): string {
  const mapped = /^::ffff:(\d{1,3}(?:\.\d{1,3}){3})$/i.exec(address);
  return mapped?.[1] ?? address;
}

/**
 * The rate-limit bucket of a client address: an IPv4 address as it is (also
 * when written IPv4-mapped), an IPv6 address by its /64 prefix
 * (`2001:db8:1:2:a:b:c:d` → `2001:0db8:0001:0002::/64`), anything else as it is.
 */
export function clientBucket(address: string): string {
  const plain = unmapIPv4(address);
  if (plain !== address) return plain;
  const bare = address.split('%')[0] ?? address;
  if (isIP(bare) !== 6) return address;
  const groups = (part: string | undefined): string[] =>
    part ? part.split(':').flatMap((group) => (group.includes('.') ? ['0', '0'] : [group])) : [];
  const [head, tail] = bare.includes('::') ? bare.split('::') : [bare, undefined];
  const h = groups(head);
  const t = groups(tail);
  const full = tail === undefined ? h : [...h, ...Array<string>(Math.max(0, 8 - h.length - t.length)).fill('0'), ...t];
  return `${full
    .slice(0, 4)
    .map((group) => group.toLowerCase().padStart(4, '0'))
    .join(':')}::/64`;
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

  /** Count one request from `client` (an address; IPv6 is counted by its /64) and say whether it may proceed. */
  hit(client: string): RateLimitDecision {
    const now = this.now();
    if (now >= this.nextSweep || this.entries.size >= this.maxEntries) this.sweep(now);
    const key = this.key(clientBucket(client));
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
      firstRefusal: entry.count === this.max + 1,
    };
  }
}
