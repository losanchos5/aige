// seo-infra.spec.ts: the SEO gates that live in build output rather than in a
// page's markup: sitemap freshness dates, the redirect-free diagram links, the
// 404 noindex header and the legacy favicon. Request-only, like infra.spec.ts;
// the files are read from dist, which is what the preview server serves.
import { test, expect } from '@playwright/test';
import { execFileSync } from 'node:child_process';
import { existsSync, readFileSync } from 'node:fs';
import { join } from 'node:path';
import { obligations, obligationPath } from '../src/data/frameworks';

// Several blocks add routes in parallel, so the check is not a fixed count but
// "every URL carries a lastmod": a new page without a `lastmod` source in
// astro.config.ts (SOURCE_BY_PATH, or REVIEWED_BY_PATH for the obligation
// pages) still fails it. The floor catches a sitemap that lost whole sections:
// the chapters, the Thesis pages, the hand-built pages and one page per
// obligation.
const MIN_INDEXABLE_ROUTES = 28 + obligations.length;

test.describe('sitemap', () => {
  test('every URL carries a dated lastmod', async ({ request }) => {
    const res = await request.get('/sitemap-0.xml');
    expect(res.status()).toBe(200);
    expect(res.headers()['content-type']).toContain('xml');

    const xml = await res.text();
    const locs = xml.match(/<loc>/g) ?? [];
    const lastmods = xml.match(/<lastmod>([^<]+)<\/lastmod>/g) ?? [];
    expect(locs.length).toBeGreaterThanOrEqual(MIN_INDEXABLE_ROUTES);
    expect(lastmods.length).toBe(locs.length);

    // The sitemap library normalises the date to a W3C datetime, so only the
    // leading YYYY-MM-DD is asserted. It must be a real past date, never the
    // build date: a rebuild may not claim that every page changed today.
    const today = new Date().toISOString().slice(0, 10);
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

test('in-content diagram links are extensionless (no 308 on the host)', () => {
  // The Stack chapter carries two diagram figures, each with an "Open
  // interactive diagram" link; /diagrams/<id>.html would redirect to /diagrams/<id>.
  const html = readFileSync(join('dist', 'bok', 'the-stack.html'), 'utf8');
  expect(html).toContain('href="/diagrams/');
  expect(html).not.toMatch(/href="\/diagrams\/[^"]+\.html"/);
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
