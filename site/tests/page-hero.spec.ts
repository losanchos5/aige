// page-hero.spec.ts: the shared full-bleed PageHero and the Breadcrumb trail.
// (a) the hero's inert background layers (mesh + dot texture) reach both viewport
// edges with no page-level horizontal scroll; (b) breadcrumbs render the right
// trail, mark the current page and emit exactly one BreadcrumbList JSON-LD where
// the page owns it; (c) the landings' related-chapter link, and that /path no
// longer attributes itself to chapter 06.
import { test, expect } from '@playwright/test';

/** Geometry of a hero background layer plus the document's scroll/client width. */
async function layer(page: import('@playwright/test').Page, selector: string) {
  return page.evaluate((sel) => {
    const el = document.querySelector(sel);
    if (!el) return null;
    const r = el.getBoundingClientRect();
    return {
      left: Math.round(r.left),
      width: Math.round(r.width),
      clientWidth: document.documentElement.clientWidth,
      scrollW: (document.scrollingElement as Element).scrollWidth,
    };
  }, selector);
}

// ---- (a) full-bleed background layers --------------------------------------

test('resources sub-page hero mesh spans the viewport at 1440x900', async ({ page }) => {
  await page.setViewportSize({ width: 1440, height: 900 });
  await page.goto('/resources/frameworks');
  const m = await layer(page, '.hero .bg-mesh');
  expect(m).not.toBeNull();
  expect(m!.left).toBe(0);
  expect(m!.width).toBe(m!.clientWidth);
  // No page-level horizontal scroll (the 100vw trap layout.spec also guards).
  expect(m!.scrollW).toBe(m!.clientWidth);
});

test('glossary hero keeps the dot texture full-bleed and has no mesh', async ({ page }) => {
  await page.setViewportSize({ width: 1440, height: 900 });
  await page.goto('/resources/glossary');
  await expect(page.locator('.hero .bg-mesh')).toHaveCount(0);
  const t = await layer(page, '.hero .hero-tex');
  expect(t).not.toBeNull();
  expect(t!.left).toBe(0);
  expect(t!.width).toBe(t!.clientWidth);
  expect(t!.scrollW).toBe(t!.clientWidth);
});

test('landing hero texture spans the viewport on /role', async ({ page }) => {
  await page.setViewportSize({ width: 1440, height: 900 });
  await page.goto('/role');
  const t = await layer(page, '.hero .hero-tex');
  expect(t).not.toBeNull();
  expect(t!.left).toBe(0);
  expect(t!.width).toBe(t!.clientWidth);
  expect(t!.scrollW).toBe(t!.clientWidth);
});

// ---- (b) breadcrumbs -------------------------------------------------------

test('frameworks breadcrumbs: two crumbs, current page and one JSON-LD', async ({ page }) => {
  await page.goto('/resources/frameworks');
  const nav = page.locator('nav[aria-label="Breadcrumb"]');
  await expect(nav).toHaveCount(1);

  const items = nav.locator('li');
  await expect(items).toHaveCount(2);

  await expect(nav.locator('li').first().locator('a')).toHaveAttribute('href', '/resources');

  const current = nav.locator('[aria-current="page"]');
  await expect(current).toHaveText('Frameworks');

  const scripts = await page.locator('script[type="application/ld+json"]').allTextContents();
  const breadcrumbLists = scripts.filter((t) => t.includes('BreadcrumbList'));
  expect(breadcrumbLists).toHaveLength(1);
});

test('chapter breadcrumbs link back to /bok', async ({ page }) => {
  await page.goto('/bok/the-stack');
  const nav = page.locator('nav[aria-label="Breadcrumb"]').first();
  await expect(nav).toBeVisible();
  await expect(nav.locator('li').first().locator('a')).toHaveAttribute('href', '/bok');
});

test('about sub-page breadcrumbs read About > Changelog', async ({ page }) => {
  await page.goto('/about/changelog');
  const nav = page.locator('nav[aria-label="Breadcrumb"]');
  await expect(nav).toHaveCount(1);
  await expect(nav.locator('li').first().locator('a')).toHaveAttribute('href', '/about');
  await expect(nav.locator('[aria-current="page"]')).toHaveText('Changelog');
});

test('no breadcrumbs on /thesis or /about', async ({ page }) => {
  await page.goto('/thesis');
  await expect(page.locator('nav[aria-label="Breadcrumb"]')).toHaveCount(0);
  await page.goto('/about');
  await expect(page.locator('nav[aria-label="Breadcrumb"]')).toHaveCount(0);
});

// ---- (c) related chapter link ----------------------------------------------

test('/role links to its chapter via the related line', async ({ page }) => {
  await page.goto('/role');
  const link = page.getByRole('link', {
    name: 'Chapter 06 · Body of Knowledge',
    exact: true,
  });
  await expect(link).toBeVisible();
  await expect(link).toHaveAttribute('href', '/bok/the-role');
});

test('/path does not attribute the page to Chapter 06', async ({ page }) => {
  await page.goto('/path');
  await expect(page.locator('.hero')).not.toContainText(/chapter 06/i);
});
