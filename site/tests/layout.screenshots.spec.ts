import { test } from '@playwright/test';

// The owner's report shot, at their reported viewport, into H/.
test('screenshot why-now 1517 light', async ({ page }) => {
  await page.emulateMedia({ colorScheme: 'light' });
  await page.setViewportSize({ width: 1517, height: 1210 });
  await page.goto('/bok/why-now');
  await page.waitForLoadState('networkidle');
  await page.screenshot({
    path: 'tests/__screenshots__/H/why-now-1517-light.png',
    fullPage: true,
  });
});
