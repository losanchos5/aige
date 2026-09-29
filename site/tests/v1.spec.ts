import { test, expect } from '@playwright/test';

// V1: the verdict ticker (VerdictTicker, a static row of verdict log lines).
// The governance loop that V1 once covered is now GovernanceLoop, tested in
// loop.spec.ts.

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
