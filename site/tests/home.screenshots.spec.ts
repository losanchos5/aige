import { test } from '@playwright/test';

// Design-review shots for Block B (the new hero): the home page at four widths
// (including 1900 to check the hero no longer bleeds to the viewport edge) in
// both colour schemes, written to tests/__screenshots__/I/.
const widths = [390, 834, 1440, 1900];
const schemes = ['light', 'dark'] as const;

for (const scheme of schemes) {
  for (const width of widths) {
    test(`screenshot home ${width} ${scheme}`, async ({ page }) => {
      // reduced-motion gives the resting (revealed) state deterministically:
      // the reveal-on-scroll observer never fires for below-fold sections
      // during a full-page capture, so without this they'd read as blank.
      await page.emulateMedia({ colorScheme: scheme, reducedMotion: 'reduce' });
      await page.setViewportSize({ width, height: 1200 });
      await page.goto('/');
      await page.waitForLoadState('networkidle');
      await page.screenshot({
        path: `tests/__screenshots__/I/home-${width}-${scheme}.png`,
        fullPage: true,
      });
    });
  }
}
