// theme-script.ts: the theme bootstrap that Base.astro inlines in <head>.
//
// src/scripts/theme.js is the one source. It used to load as <script src>, a
// parser-blocking request ahead of every stylesheet on every page; inlined, the
// persisted theme still lands before first paint with no request at all. The
// site CSP (public/_headers) has no 'unsafe-inline', so the inline script runs
// only because script-src lists the sha256 of these exact bytes. The build
// fails here when the two disagree, and tests/infra.spec.ts re-checks the
// built HTML against dist/_headers, so an edit to theme.js cannot silently
// ship a page whose theme script the browser refuses. It lives under src/, not
// public/, so no dead copy of it is served as /theme.js.
//
// Pages render from the site directory (the build cwd), like src/lib/og.ts.
import { createHash } from 'node:crypto';
import { readFileSync } from 'node:fs';
import { resolve } from 'node:path';

let cached: { source: string; hash: string } | null = null;

/** Comments dropped, lines trimmed: the bytes that ship and that are hashed. */
function minify(text: string): string {
  return text
    .replace(/\/\*[\s\S]*?\*\//g, '')
    .split(/\r?\n/)
    .map((line) => line.trim())
    .filter(Boolean)
    .join('\n');
}

/** The CSP source for a script body, e.g. 'sha256-AbC…='. */
export function cspHash(body: string): string {
  return `'sha256-${createHash('sha256').update(body, 'utf8').digest('base64')}'`;
}

/**
 * The inline theme script and its CSP hash. Throws when public/_headers does
 * not allow that hash, so the build stops instead of shipping a blocked script.
 */
export function themeScript(): { source: string; hash: string } {
  if (cached) return cached;
  const source = minify(readFileSync(resolve(process.cwd(), 'src/scripts/theme.js'), 'utf8'));
  const hash = cspHash(source);
  const headers = readFileSync(resolve(process.cwd(), 'public/_headers'), 'utf8');
  if (!headers.includes(hash)) {
    throw new Error(
      `public/_headers: the site-wide script-src must list ${hash}, the hash of the inline theme script (src/scripts/theme.js).`,
    );
  }
  cached = { source, hash };
  return cached;
}
