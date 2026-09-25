// perf.spec.ts: the load-performance guarantees of the SEO audit fix pass
// (2026-09-25, block perf). The theme script and the _headers rules have their
// own checks in infra.spec.ts and seo-infra.spec.ts; this file covers the rest:
// the toolkit's CSS stays on the toolkit, the home hero image is sized and
// capped, the frameworks link is a full tap target, the crosswalk's topic
// sections skip rendering until needed, and each figure page shows its PNG in an
// <img> and uses it as the social card. Pure reads of dist first, then the
// preview server.
import { test, expect } from '@playwright/test';
import { existsSync, readFileSync } from 'node:fs';
import { join } from 'node:path';
import { figures } from '../src/data/figures';

const SITE_ORIGIN = 'https://aigovernanceengineer.com';
const read = (file: string) => readFileSync(join('dist', file), 'utf8');
const stylesheets = (html: string) =>
  [...html.matchAll(/<link\b[^>]*rel="?stylesheet"?[^>]*href="([^"]+)"/g)].map((m) => m[1]);

/** Big-endian PNG size from the IHDR chunk. */
function pngSize(file: string): [number, number] {
  const buf = readFileSync(file);
  expect(buf.subarray(0, 8).toString('hex')).toBe('89504e470d0a1a0a');
  return [buf.readUInt32BE(16), buf.readUInt32BE(20)];
}

test.describe('the toolkit stylesheet ships only with the toolkit', () => {
  // The shared chunk Astro names after agent-control-profile is the site's own
  // global CSS (tokens, base, prose, header, footer); the tool forms' rules
  // (.tool-*, src/components/toolkit/tool-docs.css) must not ride along.
  const TOOL_RULE = /\.tool-(form|field|input|result|options|guide)\b/;

  test('the agent control profile page links the tool CSS', () => {
    const css = stylesheets(read('toolkit/agent-control-profile.html'));
    expect(css.some((href) => TOOL_RULE.test(read(href.replace(/^\//, ''))))).toBe(true);
  });

  for (const file of ['index.html', 'bok.html', 'bok/eu-ai-act.html', 'bok/regulatory-map.html', 'resources/crosswalk.html']) {
    test(`dist/${file} links no tool CSS`, () => {
      for (const href of stylesheets(read(file))) {
        expect(TOOL_RULE.test(read(href.replace(/^\//, ''))), `${file} -> ${href}`).toBe(false);
      }
    });
  }
});

test.describe('home hero image', () => {
  test('carries its intrinsic size and the same capped sizes as its preload', () => {
    const html = read('index.html');
    const img = html.match(/<img\b[^>]*class="hero-art-img"[^>]*>/)?.[0] ?? '';
    expect(img).toContain('width="2400"');
    expect(img).toContain('height="1937"');
    const sizes = img.match(/\bsizes="([^"]+)"/)?.[1];
    expect(sizes).toBe('(min-width: 1200px) and (min-resolution: 2dppx) 50vw, 100vw');
    const preload = html.match(/<link\b[^>]*rel="preload"[^>]*as="image"[^>]*>/)?.[0] ?? '';
    expect(preload).toContain(`imagesizes="${sizes}"`);
  });

  for (const scale of [1, 2]) {
    test(`a 1440px window at DPR ${scale} takes the 1600w file`, async ({ browser }) => {
      const context = await browser.newContext({
        viewport: { width: 1440, height: 900 },
        deviceScaleFactor: scale,
      });
      const page = await context.newPage();
      await page.goto('/');
      const src = await page
        .locator('img.hero-art-img')
        .evaluate(async (el: HTMLImageElement) => {
          if (!el.complete) await new Promise((r) => el.addEventListener('load', r, { once: true }));
          return el.currentSrc;
        });
      expect(src).toContain('monet-seine-giverny-1897-1600.webp');
      await context.close();
    });
  }
});

test.describe('home frameworks link', () => {
  for (const width of [390, 1440]) {
    test(`is at least 44px tall at ${width}px`, async ({ page }) => {
      await page.setViewportSize({ width, height: 900 });
      await page.goto('/');
      const box = await page.locator('a.strip-kicker--link').boundingBox();
      expect(box).not.toBeNull();
      expect(box!.height).toBeGreaterThanOrEqual(44);
    });
  }
});

test.describe('crosswalk load work', () => {
  test('the topic sections skip rendering until they near the viewport', async ({ page }) => {
    await page.goto('/resources/crosswalk');
    const cv = await page
      .locator('article.cw-topic')
      .first()
      .evaluate((el) => getComputedStyle(el).getPropertyValue('content-visibility'));
    expect(cv).toBe('auto');
  });

  test('a grid cell opens the drawer through the delegated listener, and triggers gain aria-haspopup', async ({
    page,
  }) => {
    await page.goto('/resources/crosswalk');
    const trigger = page.locator('a.cw-cell[data-cw-open]').first();
    await expect(trigger).toHaveAttribute('aria-haspopup', 'dialog');
    await trigger.click();
    await expect(page.locator('#cw-drawer')).toBeVisible();
    await expect(page).not.toHaveURL(/#topic-/);
  });
});

test.describe('figure pages show their PNG', () => {
  const built = figures.filter((f) => existsSync(join('dist', 'figures', `${f.id}.html`)));

  test('there are figure pages to check', () => {
    expect(built.length).toBeGreaterThan(0);
  });

  for (const figure of built) {
    test(`/figures/${figure.id}: a lazy <img> of the light PNG, also the og:image`, () => {
      const html = read(`figures/${figure.id}.html`);
      const img = html.match(/<img\b[^>]*src="(\/downloads\/figures\/[^"]+-light-1600\.png)"[^>]*>/);
      expect(img, 'no <img> of the light 1600 PNG').not.toBeNull();
      const [tag, src] = img!;
      expect(tag).toContain('loading="lazy"');
      expect(tag).toMatch(/\balt="[^"]+"/);
      const [w, h] = pngSize(join('dist', src));
      expect(tag).toContain(`width="${w}"`);
      expect(tag).toContain(`height="${h}"`);
      expect(html).toContain(`<meta property="og:image" content="${SITE_ORIGIN}${src}"`);
    });
  }
});
