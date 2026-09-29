import { test, type Page } from '@playwright/test';

// ---- Review screenshots into tests/__screenshots__/V4/ ----

const DIR = 'tests/__screenshots__/V4';

async function midTermHover(page: Page) {
  const terms = page.locator('a.term');
  const count = await terms.count();
  const target = terms.nth(Math.min(count - 1, Math.floor(count / 2)));
  await target.scrollIntoViewIfNeeded();
  await target.hover();
  await page.locator('#term-card').waitFor();
  // Let the 160ms opacity fade settle so the review shot is fully opaque.
  await page.waitForTimeout(250);
}

for (const scheme of ['light', 'dark'] as const) {
  test(`screenshot the-stack 1440 ${scheme} (tooltip + progress)`, async ({ page }) => {
    await page.emulateMedia({ colorScheme: scheme });
    await page.setViewportSize({ width: 1440, height: 900 });
    await page.goto('/bok/the-stack');
    await page.waitForLoadState('networkidle');
    await midTermHover(page);
    await page.screenshot({ path: `${DIR}/the-stack-1440-${scheme}.png` });
  });
}

test('screenshot the-stack 390 light', async ({ page }) => {
  await page.emulateMedia({ colorScheme: 'light' });
  await page.setViewportSize({ width: 390, height: 780 });
  await page.goto('/bok/the-stack');
  await page.waitForLoadState('networkidle');
  await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight / 3));
  await page.waitForTimeout(200);
  await page.screenshot({ path: `${DIR}/the-stack-390-light.png` });
});
