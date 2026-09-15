import { test, expect } from '@playwright/test';

test('header shows the primary nav', async ({ page }) => {
  await page.goto('/');
  const header = page.locator('header.site-header');
  await expect(header).toBeVisible();
  await expect(header.getByRole('link', { name: 'Body of Knowledge' })).toBeVisible();
  await expect(header.getByRole('link', { name: 'The Thesis' })).toBeVisible();
});

test('theme toggle flips data-theme and back', async ({ page }) => {
  await page.goto('/');
  const html = page.locator('html');
  const toggle = page.locator('[data-theme-toggle]');
  await expect(toggle).toBeVisible();

  await toggle.click();
  const first = await html.getAttribute('data-theme');
  expect(first === 'dark' || first === 'light').toBeTruthy();

  await toggle.click();
  const second = await html.getAttribute('data-theme');
  expect(second === 'dark' || second === 'light').toBeTruthy();
  expect(second).not.toBe(first);
});

test('404 renders the BLOCK verdict', async ({ page }) => {
  const res = await page.goto('/does-not-exist');
  expect(res?.status()).toBe(404);
  await expect(page.getByText('BLOCK', { exact: false })).toBeVisible();
  await expect(page.getByText('Route not registered.')).toBeVisible();
});

test.describe('mobile', () => {
  test.use({ viewport: { width: 390, height: 800 } });

  test('nav collapses into a disclosure that opens', async ({ page }) => {
    await page.goto('/');
    const burger = page.locator('.burger');
    await expect(burger).toBeVisible();

    const navLink = page.locator('.nav-panel a', { hasText: 'Body of Knowledge' });
    await expect(navLink).toBeHidden();

    await burger.click();
    await expect(navLink).toBeVisible();
  });
});
