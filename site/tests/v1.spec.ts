import { test, expect } from '@playwright/test';
import { mkdirSync } from 'node:fs';
import { join } from 'node:path';

// V1 — the hero "governance loop" (two archify diagrams driven by public/hero.js)
// and the verdict ticker (VerdictTicker). The diagram is fully legible without
// JS; motion users get a pulse that walks the loop and pops the PASS stamp.

test.describe('hero loop', () => {
  test('renders the loop diagram with its seven nodes and the verdict stamp', async ({ page }) => {
    await page.setViewportSize({ width: 1440, height: 900 });
    await page.emulateMedia({ reducedMotion: 'reduce' });
    await page.goto('/');
    // The landscape variant is the one visible at desktop width.
    await expect(page.locator('.hero-art-wide [data-node-id]')).toHaveCount(7);
    const stamp = page.locator('.hero-stamp');
    await expect(stamp).toBeVisible();
    await expect(stamp).toContainText(/PASS/);
  });

  test('stays static under reduced motion (no pulse)', async ({ page }) => {
    await page.setViewportSize({ width: 1440, height: 900 });
    await page.emulateMedia({ reducedMotion: 'reduce' });
    await page.goto('/');
    // hero.js bails out under reduced motion, so nothing is ever lit.
    await page.waitForTimeout(1200);
    await expect(page.locator('.hero-art-wide [data-node-id].is-lit')).toHaveCount(0);
  });

  test('walks a pulse around the loop when motion is allowed', async ({ page }) => {
    await page.setViewportSize({ width: 1440, height: 900 });
    await page.emulateMedia({ reducedMotion: 'no-preference' });
    await page.goto('/');
    // The loop starts after the draw-on settles (~1.4s) then lights a node
    // every ~0.9s; at least one node is lit well inside the window.
    await expect
      .poll(async () => page.locator('.hero-art-wide [data-node-id].is-lit').count(), {
        timeout: 6000,
      })
      .toBeGreaterThanOrEqual(1);
  });
});

test.describe('verdict ticker', () => {
  test('renders at least eight verdict items', async ({ page }) => {
    await page.goto('/');
    const items = page.locator('.vt-list[data-copy="0"] .vt-item');
    expect(await items.count()).toBeGreaterThanOrEqual(8);
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
