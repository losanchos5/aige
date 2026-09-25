// llms-routes.ts: the static pages of the site, read from src/pages at build
// time, so /llms.txt can list every one of them without a hand-kept list. The
// dynamic routes (chapters, patterns, terms, cases, obligations, figures,
// audience hubs) come from their datasets in llms.txt.ts; this module covers
// the single-file pages, filtered through the same `inSitemap` the sitemap
// uses (src/lib/sitemap-policy.ts), so the index and the sitemap agree.
//
// A page that llms.txt.ts does not describe by hand still gets listed, with
// the title and description read from its source (the `title` and
// `description` props it passes to its layout, Base, Doc or Marketing, as a
// literal or as a string constant, or a `const description = '...'`), so a new
// page is never left out.

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

// The layouts an indexable page renders through; each takes `title` and
// `description` props.
const LAYOUT = '(?:Base|Doc|Marketing)';

/** `<Layout ... name="literal">` or `<Layout ... name={identifier}>`. */
const layoutProp = (name: string): RegExp =>
  new RegExp(String.raw`<${LAYOUT}\b[^>]*?\b${name}=(?:"([^"]+)"|\{\s*([A-Za-z_]\w*)\s*\})`, 's');

/** `const <name> = '...'` (a single string literal, no interpolation). */
const constLiteral = (name: string): RegExp =>
  new RegExp(String.raw`\bconst ${name}\s*(?::\s*string\s*)?=\s*(['"\x60])([^'"\x60$]+)\1`);

/** `<name>: ...` in a Markdown page's frontmatter. */
const frontmatter = (name: string): RegExp => new RegExp(String.raw`^${name}:\s*["']?(.+?)["']?\s*$`, 'm');

const clean = (text: string): string => text.replace(/\s+/g, ' ').trim();

/**
 * One prop of the page's layout: the literal it passes, or the string constant
 * it passes by name (`title={seoTitle}` with `const seoTitle = '...'`); then a
 * `const <name> = '...'`; then a Markdown page's frontmatter. '' when the page
 * computes it.
 */
function propOf(source: string, name: string): string {
  const prop = layoutProp(name).exec(source);
  if (prop?.[1]) return clean(prop[1]);
  if (prop?.[2]) {
    const value = constLiteral(prop[2]).exec(source);
    if (value) return clean(value[2]);
  }
  const own = constLiteral(name).exec(source);
  if (own) return clean(own[2]);
  const front = frontmatter(name).exec(source);
  return front ? clean(front[1]) : '';
}

/**
 * Title and description of a static page, read from its source. Either may be
 * '' when the page computes it; the caller then falls back to the path.
 */
export function pageMeta(route: StaticRoute): { title: string; description: string } {
  const source = readFileSync(route.file, 'utf8');
  return { title: propOf(source, 'title'), description: propOf(source, 'description') };
}
