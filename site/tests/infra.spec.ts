// infra.spec.ts: Block F1 infrastructure. OG images, the RSS changelog feed,
// site-wide search, and the content linter. Uses the preview server (dist) from
// playwright.config; no browser is needed for the request-only checks.
import { test, expect } from '@playwright/test';
import { execFileSync } from 'node:child_process';
import { mkdtempSync, mkdirSync, readdirSync, readFileSync, writeFileSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { gzipSync } from 'node:zlib';
import { cspHashOf, cspScriptHashes, inlineScriptAllowed } from './helpers/csp';

const SHOT_DIR = join('tests', '__screenshots__', 'F');

/** Big-endian PNG width from the IHDR chunk (bytes 16..20). */
function pngWidth(buf: Buffer): number {
  expect(buf.subarray(0, 8).toString('hex')).toBe('89504e470d0a1a0a'); // PNG magic
  return buf.readUInt32BE(16);
}

test.describe('OG images', () => {
  test.beforeAll(() => mkdirSync(SHOT_DIR, { recursive: true }));

  for (const slug of ['default', 'thesis', 'bok-the-stack', 'path']) {
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
  // Home is a Marketing page and the Thesis is a Doc page: both must open the
  // dialog from the header button, proving the dialog now lives in Base. The
  // Resources landing page is owned by a parallel block, so it is checked only
  // when it exists in this build.
  for (const path of ['/', '/thesis', '/resources']) {
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

test.describe('same-origin scripts and CSP', () => {
  // script-src is 'self' with no 'unsafe-inline': an inline script would be
  // blocked in production, so every executable <script> must carry a src,
  // except the theme bootstrap, which the CSP allows by its sha256
  // (tests/helpers/csp.ts). JSON data blocks (ld+json, the diagram notes, the
  // page indexes) never execute.
  const JSON_DATA = /\btype\s*=\s*["']?application\/(ld\+)?json\b/i;

  /** Executable inline scripts of a built page: [opening tag, body]. */
  const inlineScripts = (html: string) =>
    [...html.matchAll(/(<script\b[^>]*>)([\s\S]*?)<\/script>/gi)]
      .map((m) => [m[1], m[2]] as const)
      .filter(([tag]) => !/\bsrc\s*=/i.test(tag) && !JSON_DATA.test(tag));

  for (const file of ['index.html', 'bok/the-stack.html']) {
    test(`dist/${file} has no inline <script> but the hashed theme one, and loads Motion from /_astro/`, () => {
      const html = readFileSync(join('dist', file), 'utf8');
      const blocked = inlineScripts(html).filter(([, body]) => !inlineScriptAllowed(body));
      expect(blocked).toEqual([]);
      expect(html).toMatch(/<script type="module" src="\/_astro\/motion-ui\.[\w-]+\.js">/);
    });
  }

  // The theme bootstrap (public/theme.js) is inlined in <head> so it costs no
  // request ahead of the stylesheets. The hash is recomputed from the bytes that
  // shipped, so an edit to theme.js without a new hash in _headers fails here
  // (the build already refuses it, src/lib/theme-script.ts).
  for (const file of ['index.html', 'bok/the-stack.html', 'resources/crosswalk.html', 'figures.html', '404.html']) {
    test(`dist/${file} inlines the theme script that the CSP hash allows`, () => {
      const html = readFileSync(join('dist', file), 'utf8');
      const head = html.slice(0, html.indexOf('</head>'));
      expect(head).not.toContain('src="/theme.js"');
      const theme = inlineScripts(head).filter(([, body]) => body.includes('__setTheme'));
      expect(theme.length).toBe(1);
      const [, body] = theme[0];
      expect([...cspScriptHashes()]).toContain(cspHashOf(body));
      // It runs before any stylesheet is parsed, as the external file did.
      const firstCss = head.search(/<link\b[^>]*rel="?stylesheet/);
      if (firstCss !== -1) expect(head.indexOf(body)).toBeLessThan(firstCss);
    });
  }

  test('the site CSP lists exactly one script hash, the one of public/theme.js as inlined', () => {
    const body = readFileSync(join('public', 'theme.js'), 'utf8')
      .replace(/\/\*[\s\S]*?\*\//g, '')
      .split(/\r?\n/)
      .map((line) => line.trim())
      .filter(Boolean)
      .join('\n');
    expect([...cspScriptHashes()]).toEqual([cspHashOf(body)]);
  });

  test('the persisted theme applies on load and __setTheme is exposed', async ({ page }) => {
    await page.addInitScript(() => {
      try {
        localStorage.setItem('theme', 'dark');
      } catch {
        /* storage blocked in this context */
      }
    });
    await page.goto('/');
    expect(await page.evaluate(() => document.documentElement.getAttribute('data-theme'))).toBe('dark');
    const setter = await page.evaluate(
      () => typeof (window as unknown as { __setTheme?: unknown }).__setTheme,
    );
    expect(setter).toBe('function');
  });

  // The shared motion runtime rides on every page: keep its gzip within 8 KiB.
  test('dist/_astro/motion-ui*.js gzips to 8192 bytes or less', () => {
    const dir = join('dist', '_astro');
    const bundles = readdirSync(dir).filter((name) => /^motion-ui\.[\w-]+\.js$/.test(name));
    expect(bundles.length).toBeGreaterThan(0);
    for (const name of bundles) {
      expect(gzipSync(readFileSync(join(dir, name))).length, name).toBeLessThanOrEqual(8192);
    }
  });

  test('dist/_headers carries the CSP of public/_headers verbatim', () => {
    const cspLines = (text: string) =>
      text.split(/\r?\n/).filter((line) => /^\s*Content-Security-Policy:/.test(line));
    const source = cspLines(readFileSync(join('public', '_headers'), 'utf8'));
    expect(source.length).toBeGreaterThan(0);
    expect(cspLines(readFileSync(join('dist', '_headers'), 'utf8'))).toEqual(source);
  });
});
