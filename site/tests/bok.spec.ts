import { test, expect } from '@playwright/test';
import { chaptersOrdered } from '../src/data/chapters';

test.describe('Body of Knowledge chapters', () => {
  for (const chapter of chaptersOrdered) {
    test(`/bok/${chapter.slug} renders an H1 and at least one H2`, async ({ page }) => {
      const response = await page.goto(`/bok/${chapter.slug}`);
      expect(response?.status()).toBe(200);
      await expect(page.locator('h1').first()).toBeVisible();
      expect(await page.locator('.prose h2').count()).toBeGreaterThanOrEqual(1);
    });
  }
});

test.describe('the-stack pipeline output', () => {
  test('has callouts and a src anchor for every citation', async ({ page }) => {
    await page.goto('/bok/the-stack');

    expect(await page.locator('.callout').count()).toBeGreaterThanOrEqual(1);

    const hrefs = await page
      .locator('a.cite')
      .evaluateAll((els) => els.map((el) => el.getAttribute('href') ?? ''));
    expect(hrefs.length).toBeGreaterThanOrEqual(1);

    const ids = await page
      .locator('[id^="src-"]')
      .evaluateAll((els) => els.map((el) => el.id));

    for (const href of hrefs) {
      expect(href.startsWith('#src-')).toBe(true);
      expect(ids).toContain(href.slice(1));
    }
  });

  test('wraps tables in a scroll region', async ({ page }) => {
    await page.goto('/bok/maturity-model');
    const scroll = page.locator('.table-scroll').first();
    await expect(scroll).toBeVisible();
    await expect(scroll).toHaveAttribute('role', 'region');
    expect(await scroll.locator('table').count()).toBeGreaterThanOrEqual(1);
  });
});

test('the manifesto renders', async ({ page }) => {
  const response = await page.goto('/manifesto');
  expect(response?.status()).toBe(200);
  await expect(page.locator('h1').first()).toBeVisible();
  await expect(page.getByText('Sign it')).toBeVisible();
});

test('the TOC is present on a wide viewport', async ({ page }) => {
  await page.setViewportSize({ width: 1440, height: 1000 });
  await page.goto('/bok/the-stack');
  await expect(page.locator('nav.toc')).toBeVisible();
  expect(await page.locator('nav.toc a').count()).toBeGreaterThanOrEqual(1);
});

test('the chapter drawer opens on a phone viewport', async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 780 });
  await page.goto('/bok/the-stack');

  const sidebar = page.locator('#doc-sidebar');
  await expect(sidebar).not.toBeInViewport();

  await page.locator('[data-drawer-open]').click();
  await expect(sidebar).toBeInViewport();
});

test('search opens with Ctrl+K and returns results for "policy"', async ({ page }) => {
  await page.goto('/bok/the-stack');
  await page.keyboard.press('Control+k');

  const dialog = page.locator('#search-dialog');
  await expect(dialog).toBeVisible();

  await page.locator('#search-input').fill('policy');
  await expect(page.locator('.search-result').first()).toBeVisible({ timeout: 15000 });
});
