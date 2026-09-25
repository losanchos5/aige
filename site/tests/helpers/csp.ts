// tests/helpers/csp.ts: the one inline script the site CSP allows. script-src
// has no 'unsafe-inline', so an inline <script> runs only when its sha256 is
// listed in the site-wide Content-Security-Policy of dist/_headers (today the
// theme bootstrap Base.astro inlines, src/lib/theme-script.ts). The specs that
// forbid inline JS use this to let exactly that script through, by its bytes,
// never by a marker a stray script could copy.
import { createHash } from 'node:crypto';
import { readFileSync } from 'node:fs';
import { join } from 'node:path';

let hashes: Set<string> | null = null;

/** The 'sha256-…' sources of the site-wide script-src in dist/_headers. */
export function cspScriptHashes(): Set<string> {
  if (hashes) return hashes;
  const block = readFileSync(join('dist', '_headers'), 'utf8')
    .replace(/\r/g, '')
    .split(/^(?=\/)/m)
    .find((b) => b.startsWith('/*\n'));
  const csp = block?.split('\n').find((line) => line.includes('Content-Security-Policy:')) ?? '';
  const scriptSrc = csp.split(';').find((d) => d.trim().startsWith('script-src')) ?? '';
  hashes = new Set(scriptSrc.match(/'sha256-[A-Za-z0-9+/=]+'/g) ?? []);
  return hashes;
}

/** The CSP source for an inline script body. */
export function cspHashOf(body: string): string {
  return `'sha256-${createHash('sha256').update(body, 'utf8').digest('base64')}'`;
}

/** Whether the site CSP lets this inline script body run. */
export function inlineScriptAllowed(body: string): boolean {
  return cspScriptHashes().has(cspHashOf(body));
}
