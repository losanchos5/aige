import { test, expect } from '@playwright/test';

const paths = ['/', '/bok', '/bok/the-stack', '/thesis'];

for (const path of paths) {
  test(`${path} returns 200 and renders an <h1>`, async ({ page }) => {
    const response = await page.goto(path);
    expect(response?.status()).toBe(200);
    await expect(page.locator('h1').first()).toBeVisible();
  });
}
