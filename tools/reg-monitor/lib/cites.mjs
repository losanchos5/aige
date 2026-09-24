// Which tracked files cite a URL. `git grep -F` finds candidate lines fast;
// `lineCitesUrl` then checks that the match is the whole URL and not the
// prefix of a longer one (https://genai.owasp.org/ must not match every
// https://genai.owasp.org/... link). A fragment (#art_73) still counts.

import { execFileSync } from 'node:child_process';

// Characters that continue a URL path or query. A match followed by one of
// these is a longer URL, not a citation of this one.
const URL_CONTINUES = /[A-Za-z0-9\-_~%/=&+@$]/;
// Punctuation that either ends a sentence after a URL or continues the URL.
const MAYBE_END = /[.,;:!?]/;
// Characters that close a URL in Markdown, TypeScript strings, tables and prose.
const CLOSES = /[\s)\]"'`>|*<]/;

export function stripTrailingSlash(url) {
  return url.endsWith('/') ? url.slice(0, -1) : url;
}

export function lineCitesUrl(line, url) {
  const base = stripTrailingSlash(url);
  let from = 0;
  for (;;) {
    const at = line.indexOf(base, from);
    if (at < 0) return false;
    let end = at + base.length;
    if (line[end] === '/') end++; // same URL with a trailing slash
    const next = line[end];
    if (next === undefined || next === '#') return true;
    if (MAYBE_END.test(next)) {
      // ".../eng." ends a sentence; ".../eng.pdf" or "...?uri=x" is a longer URL.
      const after = line[end + 1];
      if (after === undefined || CLOSES.test(after)) return true;
    } else if (!URL_CONTINUES.test(next)) {
      return true;
    }
    from = at + 1;
  }
}

// Returns [{ file, lines: [n, ...] }] sorted by path. Paths under `exclude`
// (the monitor's own files) are left out.
export function findCitingFiles(url, { cwd = process.cwd(), exclude = ['tools/reg-monitor/'] } = {}) {
  const base = stripTrailingSlash(url);
  let out = '';
  try {
    out = execFileSync('git', ['grep', '-n', '-I', '--no-color', '-F', '-e', base], {
      cwd,
      encoding: 'utf8',
      maxBuffer: 32 * 1024 * 1024,
      stdio: ['ignore', 'pipe', 'ignore'],
    });
  } catch (err) {
    if (err.status === 1) return []; // git grep: no match
    throw err;
  }
  const byFile = new Map();
  // Split on CRLF as well: a checkout with core.autocrlf keeps \r in the lines.
  for (const row of out.split(/\r?\n/)) {
    const m = /^(.+?):(\d+):(.*)$/.exec(row);
    if (!m) continue;
    const [, file, lineNo, text] = m;
    if (exclude.some((prefix) => file.startsWith(prefix))) continue;
    if (!lineCitesUrl(text, url)) continue;
    if (!byFile.has(file)) byFile.set(file, []);
    byFile.get(file).push(Number(lineNo));
  }
  return [...byFile.entries()]
    .sort(([a], [b]) => a.localeCompare(b))
    .map(([file, lines]) => ({ file, lines }));
}
