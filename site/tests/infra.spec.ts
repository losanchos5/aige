// infra.spec.ts: Block F1 infrastructure — OG images, the RSS changelog feed,
// site-wide search, and the content linter. Uses the preview server (dist) from
// playwright.config; no browser is needed for the request-only checks.
import { test, expect } from '@playwright/test';
import { execFileSync } from 'node:child_process';
import { mkdtempSync, mkdirSync, writeFileSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join } from 'node:path';

const SHOT_DIR = join('tests', '__screenshots__', 'F');

/** Big-endian PNG width from the IHDR chunk (bytes 16..20). */
function pngWidth(buf: Buffer): number {
  expect(buf.subarray(0, 8).toString('hex')).toBe('89504e470d0a1a0a'); // PNG magic
  return buf.readUInt32BE(16);
}

test.describe('OG images', () => {
  test.beforeAll(() => mkdirSync(SHOT_DIR, { recursive: true }));

  for (const slug of ['default', 'bok-the-stack']) {
    test(`/og/${slug}.png is a 1200px-wide PNG`, async ({ request }) => {
      const res = await request.get(`/og/${slug}.png`);
      expect(res.status()).toBe(200);
      expect(res.headers()['content-type']).toContain('image/png');
      const body = await res.body();
      expect(pngWidth(body)).toBe(1200);
      // Keep a copy for visual review of Block F.
      writeFileSync(join(SHOT_DIR, `${slug}.png`), body);
    });
  }
});

test('/rss.xml is well-formed XML with at least one item', async ({ request, page }) => {
  const res = await request.get('/rss.xml');
  expect(res.status()).toBe(200);
  expect(res.headers()['content-type']).toContain('xml');

  const xml = await res.text();
  const items = (xml.match(/<item>/g) ?? []).length;
  expect(items).toBeGreaterThanOrEqual(1);

  const wellFormed = await page.evaluate((source) => {
    const doc = new DOMParser().parseFromString(source, 'application/xml');
    return doc.getElementsByTagName('parsererror').length === 0;
  }, xml);
  expect(wellFormed).toBe(true);
});

test.describe('site-wide search', () => {
  // Home is a Marketing page and Manifesto is a Doc page: both must open the
  // dialog from the header button, proving the dialog now lives in Base. The
  // Resources landing page is owned by a parallel block, so it is checked only
  // when it exists in this build.
  for (const path of ['/', '/manifesto', '/resources']) {
    test(`the header search button opens the dialog on ${path}`, async ({ page }) => {
      const res = await page.goto(path);
      test.skip(!res || res.status() === 404, `${path} is not built in this run`);
      expect(res?.status()).toBe(200);

      const dialog = page.locator('#search-dialog');
      await expect(dialog).toBeHidden();
      await page.locator('header.site-header [data-search-open]').click();
      await expect(dialog).toBeVisible();
    });
  }
});

test.describe('content-lint', () => {
  test('passes on the built dist', () => {
    // Exits 0 (no throw) when dist is clean.
    execFileSync('node', ['scripts/content-lint.mjs'], { stdio: 'pipe' });
  });

  test('fails on an HTML fixture containing a forbidden claim', () => {
    const dir = mkdtempSync(join(tmpdir(), 'content-lint-'));
    writeFileSync(join(dir, 'bad.html'), '<html><body><p>Raised €47M in funding.</p></body></html>');
    expect(() => execFileSync('node', ['scripts/content-lint.mjs', dir], { stdio: 'pipe' })).toThrow();
  });
});
