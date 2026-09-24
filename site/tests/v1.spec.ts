import { test, expect } from '@playwright/test';
import { mkdirSync } from 'node:fs';
import { join } from 'node:path';

// V1 — the hero "governance loop" (two archify diagrams driven by public/hero.js)
// and the verdict ticker (VerdictTicker, a static row of verdict log lines). The
// diagram is fully legible without JS; motion users get one pulse that walks the
// loop from obligation to auditor, then the figure rests.

test.describe('hero loop', () => {
  test('renders the loop diagram with its seven nodes', async ({ page }) => {
    await page.setViewportSize({ width: 1440, height: 900 });
    await page.emulateMedia({ reducedMotion: 'reduce' });
    await page.goto('/');
    // The landscape variant is the one visible at desktop width.
    await expect(page.locator('.hero-art-wide [data-node-id]')).toHaveCount(7);
  });

  // Rendered size of every visible text in the visible variant (node labels,
  // tags, lane heads, edge labels): the font size in user units times the SVG's
  // screen scale, which includes the edge labels' CSS scale. 1280 is the
  // narrowest two-column layout (the figure in the 7/12 column), 1024 the
  // single-column landscape figure, 390 and 320 the portrait one.
  for (const { width, min } of [
    { width: 1440, min: 12 },
    { width: 1280, min: 12 },
    { width: 1024, min: 12 },
    { width: 390, min: 12 },
    { width: 320, min: 11 },
  ]) {
    test(`every visible diagram label renders at ${min}px or more at ${width}`, async ({ page }) => {
      await page.setViewportSize({ width, height: 900 });
      await page.emulateMedia({ reducedMotion: 'reduce' });
      await page.goto('/');
      await page.evaluate(() => document.fonts.ready);
      const sizes = await page.evaluate(() => {
        const fig = [...document.querySelectorAll('.hero-art-wide figure, .hero-art-tall figure')].find(
          (f) => (f as HTMLElement).offsetParent !== null,
        );
        return [...(fig?.querySelectorAll('svg text') ?? [])]
          .filter((t) => (t.textContent ?? '').trim() && t.getBoundingClientRect().width > 0)
          .map((t) => {
            const el = t as SVGTextElement;
            return {
              text: (el.textContent ?? '').trim(),
              node: el.hasAttribute('data-node-label'),
              px: parseFloat(getComputedStyle(el).fontSize) * (el.getScreenCTM()?.a ?? 0),
            };
          });
      });
      expect(sizes.filter((s) => s.node)).toHaveLength(7);
      for (const { text, px } of sizes) expect(px, text).toBeGreaterThanOrEqual(min);
    });
  }

  test('stays static under reduced motion (no pulse)', async ({ page }) => {
    await page.setViewportSize({ width: 1440, height: 900 });
    await page.emulateMedia({ reducedMotion: 'reduce' });
    await page.goto('/');
    // hero.js bails out under reduced motion, so nothing is ever lit.
    await page.waitForTimeout(1200);
    await expect(page.locator('.hero-art-wide [data-node-id].is-lit')).toHaveCount(0);
  });

  test('walks one pulse around the loop when motion is allowed, then rests', async ({ page }) => {
    await page.setViewportSize({ width: 1440, height: 900 });
    await page.emulateMedia({ reducedMotion: 'no-preference' });
    await page.goto('/');
    const lit = page.locator('.hero-art-wide [data-node-id].is-lit');
    // The pass starts after the draw-on settles (~1.4s) then lights a node
    // every ~0.7s; at least one node is lit well inside the window.
    await expect.poll(async () => lit.count(), { timeout: 6000 }).toBeGreaterThanOrEqual(1);
    // One pass (~4.2s) and a short hold later the trail clears for good.
    await expect.poll(async () => lit.count(), { timeout: 10000 }).toBe(0);
    await expect(page.locator('.hero-packet')).toBeHidden();
    // Nothing in the figure loops forever.
    const infinite = await page.locator('.hero-art').evaluate(
      (art) =>
        art
          .getAnimations({ subtree: true })
          .filter((a) => a.effect?.getComputedTiming().iterations === Infinity).length,
    );
    expect(infinite).toBe(0);
  });
});

test.describe('verdict ticker', () => {
  test('renders at least eight verdict items in a single static list', async ({ page }) => {
    await page.goto('/');
    // One list, no duplicated copy for a seamless loop.
    await expect(page.locator('.vt-list')).toHaveCount(1);
    const items = page.locator('.vt-list .vt-item');
    expect(await items.count()).toBeGreaterThanOrEqual(8);
  });

  test('does not loop, even when motion is allowed', async ({ page }) => {
    await page.emulateMedia({ reducedMotion: 'no-preference' });
    await page.goto('/');
    await page.locator('.vt').scrollIntoViewIfNeeded();
    // No infinite (marquee) animation anywhere in the strip; the one-shot
    // reveal on the items is finite.
    const infinite = await page.locator('.vt').evaluate(
      (strip) =>
        strip
          .getAnimations({ subtree: true })
          .filter((a) => a.effect?.getComputedTiming().iterations === Infinity).length,
    );
    expect(infinite).toBe(0);
  });

  test('verdict words are plain text in their semantic ink', async ({ page }) => {
    await page.goto('/');
    const words = await page.locator('.vt-verdict').evaluateAll((els) =>
      els.map((el) => {
        const cs = getComputedStyle(el);
        return {
          text: (el.textContent || '').trim(),
          color: cs.color,
          bg: cs.backgroundColor,
          border: cs.borderTopWidth,
        };
      }),
    );
    expect(words.length).toBeGreaterThanOrEqual(8);
    // No chip: no fill, no frame.
    for (const w of words) {
      expect(w.bg).toBe('rgba(0, 0, 0, 0)');
      expect(w.border).toBe('0px');
    }
    // PASS and BLOCK still read apart by colour.
    const pass = words.find((w) => w.text === 'PASS');
    const block = words.find((w) => w.text === 'BLOCK');
    expect(pass).toBeDefined();
    expect(block).toBeDefined();
    expect(pass!.color).not.toBe(block!.color);
  });
});

// Design-review shots for V1, written to tests/__screenshots__/V1/. Skipped in
// the default acceptance run; capture them with:
//   V1_SHOTS=1 npx playwright test --project=default tests/v1.spec.ts -g "review shot"
const DIR = join('tests', '__screenshots__', 'V1');
const shot = process.env.V1_SHOTS ? test : test.skip;
const frames = [
  { t: 500, tag: 't0500' },
  { t: 2500, tag: 't2500' },
  { t: 5000, tag: 't5000' },
];

test.describe('V1 review shots', () => {
  test.beforeAll(() => mkdirSync(DIR, { recursive: true }));

  for (const scheme of ['light', 'dark'] as const) {
    for (const frame of frames) {
      shot(`review shot hero 1440 ${scheme} ${frame.tag}`, async ({ page }) => {
        await page.emulateMedia({ colorScheme: scheme, reducedMotion: 'no-preference' });
        await page.setViewportSize({ width: 1440, height: 900 });
        await page.goto('/');
        await page.waitForTimeout(frame.t);
        await page.screenshot({ path: join(DIR, `hero-1440-${scheme}-${frame.tag}.png`) });
      });
    }
  }

  shot('review shot hero 390 light', async ({ page }) => {
    await page.emulateMedia({ colorScheme: 'light', reducedMotion: 'no-preference' });
    await page.setViewportSize({ width: 390, height: 900 });
    await page.goto('/');
    await page.waitForTimeout(2500);
    await page.screenshot({ path: join(DIR, 'hero-390-light.png') });
  });

  shot('review shot verdict band 1440 light', async ({ page }) => {
    await page.emulateMedia({ colorScheme: 'light', reducedMotion: 'no-preference' });
    await page.setViewportSize({ width: 1440, height: 900 });
    await page.goto('/');
    const band = page.locator('.verdict-beat');
    await band.scrollIntoViewIfNeeded();
    await page.waitForTimeout(600);
    await band.screenshot({ path: join(DIR, 'verdict-band-1440-light.png') });
  });

  shot('review shot verdict band 1440 dark', async ({ page }) => {
    await page.emulateMedia({ colorScheme: 'dark', reducedMotion: 'no-preference' });
    await page.setViewportSize({ width: 1440, height: 900 });
    await page.goto('/');
    const band = page.locator('.verdict-beat');
    await band.scrollIntoViewIfNeeded();
    await page.waitForTimeout(600);
    await band.screenshot({ path: join(DIR, 'verdict-band-1440-dark.png') });
  });
});
