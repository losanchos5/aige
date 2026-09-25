// llms-routes.ts: the static pages of the site, read from src/pages at build
// time, so /llms.txt can list every one of them without a hand-kept list. The
// dynamic routes (chapters, patterns, terms, cases, obligations, figures,
// audience hubs) come from their datasets in llms.txt.ts; this module covers
// the single-file pages, filtered through the same `inSitemap` the sitemap
// uses (src/lib/sitemap-policy.ts), so the index and the sitemap agree.
//
// A page that llms.txt.ts does not describe by hand still gets listed, with
// the title and description read from its source (the `title="..."` and
// `description="..."` literals most pages pass to Base, or a
// `const description = '...'`), so a new page is never left out.

import { readFileSync, readdirSync, statSync } from 'node:fs';
import { join, relative } from 'node:path';
import { inSitemap } from './sitemap-policy';

// Paths are relative to site/, the build and test cwd (as in lib/reading.ts).
const PAGES_DIR = join(process.cwd(), 'src', 'pages');
const PAGE_FILE = /\.(astro|md|mdx)$/;

export interface StaticRoute {
  /** Clean pathname, e.g. /resources/threats ('/' for the home). */
  path: string;
  /** Absolute path of the page source. */
  file: string;
}

function walk(dir: string): string[] {
  const out: string[] = [];
  for (const name of readdirSync(dir)) {
    // Astro skips `_`-prefixed files; `[...]` segments are dynamic routes.
    if (name.startsWith('_') || name.includes('[')) continue;
    const full = join(dir, name);
    if (statSync(full).isDirectory()) out.push(...walk(full));
    else if (PAGE_FILE.test(name)) out.push(full);
  }
  return out;
}

let cache: StaticRoute[] | undefined;

/** Every static HTML page the sitemap lists, sorted by path. */
export function staticRoutes(): StaticRoute[] {
  if (cache) return cache;
  cache = walk(PAGES_DIR)
    .map((file) => {
      const rel = relative(PAGES_DIR, file).replace(/\\/g, '/').replace(PAGE_FILE, '');
      const path = `/${rel}`.replace(/\/index$/, '') || '/';
      return { path, file };
    })
    .filter((route) => inSitemap(route.path))
    .sort((a, b) => a.path.localeCompare(b.path));
  return cache;
}

/** True when a static page exists at the path. */
export function hasStaticRoute(path: string): boolean {
  return staticRoutes().some((route) => route.path === path);
}

const TITLE_RES = [
  /<Base\b[^>]*?\btitle="([^"]+)"/s,
  /\bconst title\s*=\s*(['"`])([^'"`$]+)\1/,
  /^title:\s*["']?(.+?)["']?\s*$/m,
];
const DESCRIPTION_RES = [
  /<Base\b[^>]*?\bdescription="([^"]+)"/s,
  /\bconst description\s*=\s*(['"`])([^'"`$]+)\1/,
  /^description:\s*["']?(.+?)["']?\s*$/m,
];

function firstMatch(source: string, patterns: readonly RegExp[]): string {
  for (const re of patterns) {
    const match = re.exec(source);
    if (match) return (match[2] ?? match[1]).replace(/\s+/g, ' ').trim();
  }
  return '';
}

/**
 * Title and description of a static page, read from its source. Either may be
 * '' when the page computes it; the caller then falls back to the path.
 */
export function pageMeta(route: StaticRoute): { title: string; description: string } {
  const source = readFileSync(route.file, 'utf8');
  return { title: firstMatch(source, TITLE_RES), description: firstMatch(source, DESCRIPTION_RES) };
}
