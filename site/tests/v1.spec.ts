import { test, expect } from '@playwright/test';
import { mkdirSync } from 'node:fs';
import { join } from 'node:path';

// V1 — the hero "evidence chain" (HeroChain) and the verdict ticker
// (VerdictTicker). The finished PASS state is server-rendered; motion users get
// the looping state machine driven by public/hero.js.

test.describe('hero chain', () => {
  test('renders five layer rows with a server-rendered verdict stamp', async ({ page }) => {
    await page.emulateMedia({ reducedMotion: 'reduce' });
    await page.goto('/');
    await expect(page.locator('.hc .hc-row')).toHaveCount(5);
    const stamp = page.locator('.hc .hc-stamp');
    await expect(stamp).toBeVisible();
    await expect(stamp).toHaveText(/PASS|BLOCK/);
  });

  test('stays at the final step under reduced motion', async ({ page }) => {
    await page.emulateMedia({ reducedMotion: 'reduce' });
    await page.goto('/');
    const hc = page.locator('.hc');
    // hero.js bails out under reduced motion, leaving the rendered final state.
    await page.waitForTimeout(1200);
    await expect(hc).toHaveAttribute('data-step', '5');
    await expect(hc).not.toHaveClass(/is-live/);
  });

  test('advances the step within 3s when motion is allowed', async ({ page }) => {
    await page.emulateMedia({ reducedMotion: 'no-preference' });
    await page.goto('/');
    const hc = page.locator('.hc');
    await expect(hc).toHaveClass(/is-live/, { timeout: 3000 });
    // From the step-0 reset the machine climbs; it reaches the eval row (3) well
    // inside 3s.
    await expect
      .poll(async () => Number(await hc.getAttribute('data-step')), { timeout: 3000 })
      .toBeGreaterThanOrEqual(3);
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
