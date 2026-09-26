// seo-font-cls.spec.ts: the JetBrains Mono layout-shift fix of the SEO audit
// round 5 (2026-09-26, block ui). Lighthouse measured CLS 0.13 to 0.22 on the
// glossary terms and on long chapters, all of it from the mono web font
// swapping in after the first paint. Three guarantees: every page preloads the
// mono like the two other text faces; --font-mono names metric-matched local
// fallbacks, so the swap keeps every line width; and the breadcrumb's current
// crumb truncates on one line instead of wrapping, so a trail that just fits
// cannot gain a line when the font lands. Reads dist first, then the preview
// server, with the mono font held back to force the late swap.
import { test, expect, type Page } from '@playwright/test';
import { existsSync, readFileSync } from 'node:fs';
import { join } from 'node:path';

const MONO = '/fonts/jetbrains-mono-latin-wght-normal.woff2';
const read = (file: string) => readFileSync(join('dist', file), 'utf8');
const preloads = (html: string) =>
  [...html.matchAll(/<link\b[^>]*rel="preload"[^>]*>/g)].map((m) => m[0]);

// The pages the audit measured, plus the home and a comparison page.
const PAGES = [
  'index.html',
  'bok/eu-ai-act.html',
  'bok/glossary.html',
  'glossary/agent-registry.html',
  'glossary/ai-governance.html',
  'resources/crosswalk/iso-42001-vs-eu-ai-act.html',
];

test.describe('the mono font is preloaded', () => {
  test('the preloaded file is the one fonts.css serves', () => {
    expect(existsSync(join('dist', MONO))).toBe(true);
  });

  for (const file of PAGES) {
    test(`dist/${file} preloads JetBrains Mono as a CORS font`, () => {
      const link = preloads(read(file)).find((tag) => tag.includes(`href="${MONO}"`));
      expect(link, `${file} has no preload for ${MONO}`).toBeTruthy();
      // Fonts are fetched in CORS mode: a preload without crossorigin, or of
      // another type, is a second request the font never uses.
      expect(link).toContain('as="font"');
      expect(link).toContain('type="font/woff2"');
      expect(link).toMatch(/\scrossorigin(\s|=|\/?>)/);
    });
  }
});

/** Hold the mono font back so it lands well after the first paint. */
async function delayMono(page: Page, ms: number) {
  await page.route(`**${MONO}`, async (route) => {
    await new Promise((r) => setTimeout(r, ms));
    await route.continue();
  });
}

/** Sum of the layout shifts not caused by input, from navigation onwards. */
async function trackCls(page: Page) {
  await page.addInitScript(() => {
    (window as unknown as { __cls: number }).__cls = 0;
    new PerformanceObserver((list) => {
      for (const e of list.getEntries() as unknown as { value: number; hadRecentInput: boolean }[]) {
        if (!e.hadRecentInput) (window as unknown as { __cls: number }).__cls += e.value;
      }
    }).observe({ type: 'layout-shift', buffered: true });
  });
}

test.describe('--font-mono falls back to metric-matched faces', () => {
  test('the stack names the fallbacks ahead of the generic monospace', async ({ page }) => {
    await page.goto('/glossary/ai-governance');
    const stack = await page.evaluate(() =>
      getComputedStyle(document.documentElement).getPropertyValue('--font-mono'),
    );
    const families = stack.split(',').map((f) => f.trim().replace(/^['"]|['"]$/g, ''));
    expect(families[0]).toBe('JetBrains Mono Variable');
    const fallbacks = families.filter((f) => f.startsWith('JetBrains Mono Fallback'));
    expect(fallbacks.length).toBeGreaterThanOrEqual(3);
    expect(families.indexOf('monospace')).toBeGreaterThan(families.indexOf(fallbacks.at(-1)!));
  });

  test('mono text is as wide in the fallback as in JetBrains Mono', async ({ page }) => {
    const probe = () =>
      page.evaluate(() => {
        const s = document.createElement('span');
        s.style.cssText =
          'position:absolute;white-space:nowrap;font-size:100px;font-family:var(--font-mono)';
        s.textContent = 'BODY OF KNOWLEDGE › GLOSSARY › 0123456789';
        document.body.appendChild(s);
        const width = s.getBoundingClientRect().width;
        s.remove();
        return width;
      });

    await page.route(`**${MONO}`, (route) => route.abort());
    await page.goto('/glossary/ai-governance');
    await page.evaluate(() => document.fonts.ready);
    // Only meaningful where one of the local fonts exists (Windows, macOS and
    // most Linux images do); a bare system falls through to plain monospace.
    const localFallback = await page.evaluate(() =>
      [...document.fonts].some(
        (f) => f.family.replace(/['"]/g, '').startsWith('JetBrains Mono Fallback') && f.status === 'loaded',
      ),
    );
    test.skip(!localFallback, 'no local monospace font matched a fallback face');
    const fallbackWidth = await probe();

    await page.unroute(`**${MONO}`);
    await page.goto('/glossary/ai-governance');
    await page.evaluate(() => document.fonts.load(`12px "JetBrains Mono Variable"`));
    const monoWidth = await probe();

    // 41 glyphs at 100px: 0.5% is about a fifth of one glyph.
    expect(Math.abs(fallbackWidth - monoWidth) / monoWidth).toBeLessThan(0.005);
  });
});

test.describe('the breadcrumb keeps one line', () => {
  for (const width of [320, 390, 412]) {
    test.describe(`at ${width}px`, () => {
      test.use({ viewport: { width, height: 844 } });

      for (const slug of ['ai-governance', 'agent-registry', 'algorithmic-transparency-recording-standard-atrs']) {
        test(`/glossary/${slug}: the current crumb truncates instead of wrapping`, async ({ page }) => {
          const res = await page.goto(`/glossary/${slug}`);
          test.skip(res?.status() !== 200, `no glossary term ${slug}`);
          await page.evaluate(() => document.fonts.ready);
          const trail = page.locator('.hero .crumbs ol');
          const current = trail.locator('[aria-current="page"]');
          // One line: the tallest crumb (the current one, line-height 1.3).
          const box = await trail.boundingBox();
          const crumb = await current.boundingBox();
          expect(box!.height).toBeLessThanOrEqual(crumb!.height + 1);
          // The full term stays in the DOM (and in the <h1> below it).
          await expect(current).toHaveText((await page.locator('h1').textContent())!.trim());
        });
      }
    });
  }
});

// The measured pages, with the mono font held back 1.2s: whatever the network,
// its late arrival must not move the page. Without the fix these read 0.22
// (glossary terms at 390 and 412px) and 0.14 (/bok/glossary at 1350px).
test.describe('a late mono font does not shift the page', () => {
  const URLS = ['/glossary/agent-registry', '/glossary/ai-governance', '/bok/eu-ai-act', '/bok/glossary'];
  for (const [width, height] of [
    [412, 823],
    [1350, 940],
  ]) {
    test.describe(`at ${width}px`, () => {
      test.use({ viewport: { width, height } });
      for (const url of URLS) {
        test(`${url} CLS < 0.1`, async ({ page }) => {
          await delayMono(page, 1200);
          await trackCls(page);
          await page.goto(url, { waitUntil: 'load' });
          await page.evaluate(() => document.fonts.ready);
          await page.waitForTimeout(300);
          const cls = await page.evaluate(() => (window as unknown as { __cls: number }).__cls);
          expect(cls).toBeLessThan(0.1);
        });
      }
    });
  }
});
