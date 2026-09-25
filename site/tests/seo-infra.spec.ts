// seo-infra.spec.ts: the SEO gates that live in build output rather than in a
// page's markup: sitemap freshness dates, the redirect-free diagram links, the
// 404 noindex header and the legacy favicon. Request-only, like infra.spec.ts;
// the files are read from dist, which is what the preview server serves.
import { test, expect } from '@playwright/test';
import { execFileSync } from 'node:child_process';
import { existsSync, readFileSync, readdirSync, statSync } from 'node:fs';
import { join } from 'node:path';
import { obligations, obligationPath } from '../src/data/frameworks';
import { NOT_IN_SITEMAP, inSitemap } from '../src/lib/sitemap-policy';

// Every indexable route is every HTML page the build writes, less the ones the
// sitemap filter in astro.config.ts leaves out (the OG cards, the diagram
// viewers, the 404 and the non-canonical pages of src/lib/sitemap-policy.ts,
// through the same `inSitemap`). Counted from dist rather than typed, so
// parallel changes that add pages never fight over one number; a new page
// without a `lastmod` source in SOURCE_BY_PATH still fails the lastmod count below.
function htmlRoutes(dir: string, root = dir): string[] {
  const out: string[] = [];
  for (const name of readdirSync(dir)) {
    const full = join(dir, name);
    if (statSync(full).isDirectory()) out.push(...htmlRoutes(full, root));
    else if (name.endsWith('.html')) {
      const route = full
        .slice(root.length)
        .replace(/\\/g, '/')
        .replace(/\.html$/, '')
        .replace(/\/index$/, '');
      out.push(route === '' ? '/' : route);
    }
  }
  return out;
}
const INDEXABLE_ROUTES = htmlRoutes('dist').filter(inSitemap).length;

test.describe('sitemap', () => {
  test(`every one of the ${INDEXABLE_ROUTES} URLs carries a dated lastmod`, async ({ request }) => {
    const res = await request.get('/sitemap-0.xml');
    expect(res.status()).toBe(200);
    expect(res.headers()['content-type']).toContain('xml');

    const xml = await res.text();
    const locs = xml.match(/<loc>/g) ?? [];
    const lastmods = xml.match(/<lastmod>([^<]+)<\/lastmod>/g) ?? [];
    expect(locs.length).toBe(INDEXABLE_ROUTES);
    expect(lastmods.length).toBe(INDEXABLE_ROUTES);

    // The sitemap library normalises the date to a W3C datetime, so only the
    // leading YYYY-MM-DD is asserted. It must be a real past date, never the
    // build date: a rebuild may not claim that every page changed today.
    // git dates a commit in the committer's time zone (%cs), so a commit made
    // just after local midnight east of UTC is "tomorrow" in UTC: compare with
    // the latest calendar date anywhere (UTC+14), not with the UTC date.
    const today = new Date(Date.now() + 14 * 3600 * 1000).toISOString().slice(0, 10);
    for (const raw of lastmods) {
      const value = raw.replace(/<\/?lastmod>/g, '');
      expect(value).toMatch(/^\d{4}-\d{2}-\d{2}/);
      expect(value.slice(0, 10) <= today).toBe(true);
    }
    // The dates come from git, not the build clock: a page with a single
    // source carries exactly that file's last commit date. (One date across
    // every page is fine after a site-wide commit, so the check is per page,
    // not "the dates must differ".)
    const byPath = new Map(
      [...xml.matchAll(/<loc>([^<]+)<\/loc>\s*<lastmod>([^<]+)<\/lastmod>/g)].map((m) => [
        new URL(m[1]).pathname,
        m[2].slice(0, 10),
      ]),
    );
    const lastmodFor = (path: string) => byPath.get(path);
    const commitDate = (file: string) =>
      execFileSync('git', ['log', '-1', '--format=%cs', '--', file], { encoding: 'utf8' }).trim();
    for (const [path, file] of [
      ['/thesis', '../THESIS.md'],
      ['/es/thesis', '../THESIS.es.md'],
      ['/bok/definition', '../bok/01-definition.md'],
    ] as const) {
      expect(lastmodFor(path), path).toBe(commitDate(file));
    }
    // An obligation page is dated by the review date of its register row, not by git.
    for (const row of obligations) {
      expect(lastmodFor(obligationPath(row)), row.id).toBe(row.reviewed);
    }
  });
});

test('every page left out of the sitemap is built and says why', () => {
  const built = new Set(htmlRoutes('dist'));
  const redirects = readFileSync(join('dist', '_redirects'), 'utf8').replace(/\r/g, '');
  for (const { path, reason } of NOT_IN_SITEMAP) {
    expect(built.has(path), `${path} is built`).toBe(true);
    // Either the host redirects it, or the page names another canonical URL.
    const html = readFileSync(join('dist', `${path}.html`), 'utf8');
    const canonical = html.match(/<link rel="canonical" href="([^"]+)"/)?.[1] ?? '';
    const redirected = new RegExp(`^${path}\\s+\\S+\\s+301$`, 'm').test(redirects);
    expect(
      redirected || new URL(canonical).pathname !== path,
      `${path} (${reason}) must redirect or declare another canonical`,
    ).toBe(true);
  }
});

test('in-content diagram links are extensionless (no 308 on the host)', () => {
  // The Stack chapter carries two diagram figures, each with an "Open
  // interactive diagram" link; /diagrams/<id>.html would redirect to /diagrams/<id>.
  const html = readFileSync(join('dist', 'bok', 'the-stack.html'), 'utf8');
  expect(html).toContain('href="/diagrams/');
  expect(html).not.toMatch(/href="\/diagrams\/[^"]+\.html"/);
});

// The headers Cloudflare Pages would send for a path: every rule whose pattern
// matches (a `*` matches any run of characters) adds its headers, and a
// `! Name` line in a matching rule drops that header coming from the others.
function headersFor(path: string): string[] {
  const blocks = readFileSync(join('dist', '_headers'), 'utf8')
    .replace(/\r/g, '')
    .split(/^(?=\/)/m)
    .map((b) => b.split('\n').filter((line) => line.trim() !== ''))
    .filter((lines) => lines.length > 0);
  const matching = blocks.filter(([pattern]) => {
    const re = new RegExp(`^${pattern.trim().split('*').map((s) => s.replace(/[.+?^${}()|[\]\\]/g, '\\$&')).join('.*')}$`);
    return re.test(path);
  });
  const own = matching.map(([, ...lines]) => lines.map((line) => line.trim()));
  const detached = own.map(
    (lines) => new Set(lines.filter((l) => l.startsWith('!')).map((l) => l.slice(1).trim().toLowerCase())),
  );
  const out: string[] = [];
  own.forEach((lines, i) => {
    for (const line of lines) {
      if (line.startsWith('!')) continue;
      const name = line.slice(0, line.indexOf(':')).trim().toLowerCase();
      if (detached.some((set, j) => j !== i && set.has(name))) continue;
      out.push(line);
    }
  });
  return out;
}

test.describe('_headers: machine files, font preloads, framing', () => {
  // Data endpoints stay crawlable (linked, CORS-open) but out of the index.
  const machine = [
    '/api/v1/obligations.json',
    '/api/v1/schemas/cases.json',
    '/schemas/ai-system-register-entry.v1.json',
    '/resources/obligations.json',
    '/resources/obligations.csv',
    '/resources/crosswalk.json',
    '/resources/crosswalk.csv',
    '/resources/harms.json',
    '/resources/threats.csv',
    '/glossary.json',
  ];
  // Text for machines that must stay indexable (or are sitemaps and feeds).
  const indexableText = ['/llms.txt', '/llms-full.txt', '/rss.xml', '/sitemap-index.xml', '/robots.txt'];
  const PRELOAD = /^Link: <\/fonts\//;

  for (const path of machine) {
    test(`${path} is noindex and carries no font preload`, () => {
      const h = headersFor(path);
      expect(h).toContain('X-Robots-Tag: noindex');
      expect(h.filter((line) => PRELOAD.test(line))).toEqual([]);
    });
  }

  for (const path of indexableText) {
    test(`${path} stays indexable and carries no font preload`, () => {
      const h = headersFor(path);
      expect(h.filter((line) => line.startsWith('X-Robots-Tag'))).toEqual([]);
      expect(h.filter((line) => PRELOAD.test(line))).toEqual([]);
    });
  }

  test('HTML pages keep the font preloads, the CSP and X-Frame-Options', () => {
    for (const path of ['/', '/bok/eu-ai-act', '/resources/crosswalk']) {
      const h = headersFor(path);
      expect(h.filter((line) => PRELOAD.test(line)).length, path).toBeGreaterThanOrEqual(2);
      expect(h.filter((line) => line.startsWith('X-Robots-Tag')), path).toEqual([]);
      expect(h, path).toContain('X-Frame-Options: DENY');
      expect(h.some((line) => line.startsWith('Content-Security-Policy:')), path).toBe(true);
    }
    // The home also preloads the hero serif.
    expect(headersFor('/').filter((line) => PRELOAD.test(line)).length).toBe(4);
  });

  test('figure downloads stay indexable for image search', () => {
    const h = headersFor('/downloads/figures/art73-clock-v0.5.0-light-1600.png');
    expect(h.filter((line) => line.startsWith('X-Robots-Tag'))).toEqual([]);
  });
});

test('_headers keeps the 404 page out of the index', () => {
  const headers = readFileSync(join('dist', '_headers'), 'utf8').replace(/\r/g, '');
  for (const path of ['/404', '/404.html']) {
    // The rule's own block, not a header inherited from another path.
    const block = headers.split(/^(?=\/)/m).find((b) => b.startsWith(`${path}\n`));
    expect(block, `no ${path} block in _headers`).toBeDefined();
    expect(block).toContain('X-Robots-Tag: noindex');
  }
});

test('/favicon.ico is served', () => {
  const ico = join('dist', 'favicon.ico');
  if (existsSync(ico)) {
    // ICONDIR: reserved 0, type 1 (icon), at least one image.
    const buf = readFileSync(ico);
    expect(buf.readUInt16LE(0)).toBe(0);
    expect(buf.readUInt16LE(2)).toBe(1);
    expect(buf.readUInt16LE(4)).toBeGreaterThanOrEqual(1);
    return;
  }
  // Fallback: a host-side rewrite standing in for the missing file.
  const redirects = readFileSync(join('dist', '_redirects'), 'utf8');
  expect(redirects).toMatch(/^\/favicon\.ico\s+\S+\s+200$/m);
});
