import { test, expect } from '@playwright/test';
import { mkdirSync } from 'node:fs';
import { join } from 'node:path';

// V1: the verdict ticker (VerdictTicker, a static row of verdict log lines) and
// review shots of the home's first screen. The governance loop that V1 once
// covered is now GovernanceLoop, tested in loop.spec.ts.

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
