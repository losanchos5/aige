// block-f-es.spec.ts: acceptance checks for Block F4 — the Spanish translation of
// the Thesis at /es/thesis. The page responds, declares Spanish for the body,
// shows a Spanish heading and links back to the English original.
//
// The site uses `trailingSlash: 'never'`, so the canonical URL is /es/thesis.
import { test, expect } from '@playwright/test';

test.describe('Spanish Thesis at /es/thesis', () => {
  test('the page responds 200', async ({ page }) => {
    const res = await page.goto('/es/thesis');
    expect(res?.status()).toBe(200);
  });

  test('the translated body is marked lang="es"', async ({ page }) => {
    await page.goto('/es/thesis');
    // Either the document element or an in-page wrapper carries lang="es".
    const langNodes = page.locator('html[lang="es"], [lang="es"]');
    expect(await langNodes.count()).toBeGreaterThan(0);
  });

  test('the H1 is in Spanish', async ({ page }) => {
    await page.goto('/es/thesis');
    const h1 = page.locator('h1');
    await expect(h1).toHaveCount(1);
    await expect(h1).toContainText(/Ingenier[íi]a de Gobernanza/i);
  });

  test('a link points back to the English Thesis', async ({ page }) => {
    await page.goto('/es/thesis');
    const backLink = page.locator('a[href="/thesis"], a[href="/thesis/"]');
    expect(await backLink.count()).toBeGreaterThan(0);
  });
});
