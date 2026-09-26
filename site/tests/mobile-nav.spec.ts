// mobile-nav.spec.ts: the phone menu (MobileNav.astro + /nav.js). Every group
// is one labelled row and all of them fit on the first screen; a group with
// items is an accordion button (aria-expanded + a region), one open at a time;
// the group holding the current page starts open with the page marked
// aria-current; every link is a whole-row target >= 44px tall; the bar with
// search and close stays in reach; Escape closes and hands focus back. Also
// the desktop bar's links keep a >= 24px hit area (WCAG 2.5.8).
import { test, expect, type Page } from '@playwright/test';
import { nav } from '../src/data/nav';
import { chaptersOrdered } from '../src/data/chapters';
import { bookParts } from '../src/data/parts';

const PHONE = { width: 390, height: 844 };

// Groups whose rows are accordion buttons (every group with header items);
// the rest (the Thesis, the map) are direct links.
const panelItems = (id: string) =>
  nav.find((g) => g.id === id)!.items.filter((i) => i.placement !== 'footer');
const toggleGroups = nav.filter((g) => panelItems(g.id).length > 0);
const directGroups = nav.filter((g) => panelItems(g.id).length === 0);

async function openMenu(page: Page, path: string) {
  await page.setViewportSize(PHONE);
  await page.emulateMedia({ reducedMotion: 'reduce' });
  await page.goto(path);
  await page.locator('.burger').click();
  const drawer = page.locator('#nav-drawer');
  await expect(drawer).toHaveJSProperty('open', true);
  return drawer;
}

const toggleOf = (page: Page, id: string) => page.locator(`#mnav-${id}-b`);
const regionOf = (page: Page, id: string) => page.locator(`#mnav-${id}-r`);

test('every group is one labelled row, and all of them fit on the first screen', async ({ page }) => {
  const drawer = await openMenu(page, '/');
  const rows = drawer.locator('.mnav-group > .mnav-row');
  await expect(rows).toHaveCount(nav.length);
  for (const group of toggleGroups) {
    const toggle = drawer.getByRole('button', { name: group.label, exact: true });
    await expect(toggle, group.id).toHaveAttribute('aria-expanded', 'false');
  }
  for (const group of directGroups) {
    await expect(drawer.getByRole('link', { name: group.label, exact: true }), group.id).toHaveAttribute(
      'href',
      group.href!,
    );
  }
  // No eyebrow repeating a heading, no intro sentences: one hint line per row.
  await expect(drawer.locator('.mnav-hint')).toHaveCount(nav.length);
  const bottom = await rows.last().evaluate((el) => el.getBoundingClientRect().bottom);
  expect(bottom, 'the last group row sits inside the first screen').toBeLessThanOrEqual(PHONE.height);
});

test('group rows are accordion buttons over a region, one open at a time', async ({ page }) => {
  await openMenu(page, '/');
  for (const group of toggleGroups) {
    const toggle = toggleOf(page, group.id);
    await expect(toggle).toHaveJSProperty('tagName', 'BUTTON');
    await expect(toggle).toHaveAttribute('aria-controls', `mnav-${group.id}-r`);
    await expect(regionOf(page, group.id)).toHaveAttribute('role', 'region');
    await expect(regionOf(page, group.id)).toBeHidden();
  }
  await toggleOf(page, 'practice').click();
  await expect(toggleOf(page, 'practice')).toHaveAttribute('aria-expanded', 'true');
  await expect(regionOf(page, 'practice')).toBeVisible();
  await expect(regionOf(page, 'practice').getByRole('link', { name: 'The Stack' })).toBeVisible();

  await toggleOf(page, 'reference').click();
  await expect(toggleOf(page, 'reference')).toHaveAttribute('aria-expanded', 'true');
  await expect(toggleOf(page, 'practice')).toHaveAttribute('aria-expanded', 'false');
  await expect(regionOf(page, 'practice')).toBeHidden();

  await toggleOf(page, 'reference').click();
  await expect(toggleOf(page, 'reference')).toHaveAttribute('aria-expanded', 'false');
  await expect(regionOf(page, 'reference')).toBeHidden();
});

test('every menu link is a whole row at least 44px tall', async ({ page }) => {
  const drawer = await openMenu(page, '/');
  const measure = async (scope: string) => {
    const boxes = await drawer.locator(`${scope} a[href]`).evaluateAll((els) =>
      els
        .filter((el) => (el as HTMLElement).offsetParent !== null)
        .map((el) => ({ href: el.getAttribute('href'), h: el.getBoundingClientRect().height })),
    );
    expect(boxes.length, `${scope} has visible links`).toBeGreaterThan(0);
    for (const box of boxes) expect(box.h, `${box.href} height`).toBeGreaterThanOrEqual(44);
  };
  await measure('.mnav-groups');
  await measure('.mnav-foot');
  for (const group of toggleGroups) {
    await toggleOf(page, group.id).click();
    await measure(`#mnav-${group.id}-r`);
  }
  // Buttons too: the group rows, search and close.
  const buttons = await drawer.locator('button').evaluateAll((els) =>
    els.map((el) => el.getBoundingClientRect().height),
  );
  for (const h of buttons) expect(h).toBeGreaterThanOrEqual(44);
});

test('the current page opens its group and is marked aria-current', async ({ page }) => {
  await openMenu(page, '/resources/crosswalk');
  await expect(toggleOf(page, 'reference')).toHaveAttribute('aria-expanded', 'true');
  const region = regionOf(page, 'reference');
  await expect(region).toBeVisible();
  const link = region.locator('a[aria-current="page"]');
  await expect(link).toHaveCount(1);
  await expect(link).toHaveAttribute('href', '/resources/crosswalk');
  await expect(link).toBeVisible();
  for (const group of toggleGroups.filter((g) => g.id !== 'reference')) {
    await expect(toggleOf(page, group.id), group.id).toHaveAttribute('aria-expanded', 'false');
  }
  await expect(page.locator('#nav-drawer a[aria-current="page"]')).toHaveCount(1);
});

test('a chapter opens the Body of Knowledge on its own row; a direct group is marked on its row', async ({
  page,
}) => {
  await openMenu(page, '/bok/the-stack');
  await expect(toggleOf(page, 'bok')).toHaveAttribute('aria-expanded', 'true');
  await expect(regionOf(page, 'bok').locator('a[aria-current="page"]')).toHaveAttribute(
    'href',
    '/bok/the-stack',
  );

  await openMenu(page, '/thesis');
  const thesis = page.locator('#nav-drawer .mnav-group > a.mnav-row[href="/thesis"]');
  await expect(thesis).toHaveAttribute('aria-current', 'page');
  for (const group of toggleGroups) {
    await expect(toggleOf(page, group.id), group.id).toHaveAttribute('aria-expanded', 'false');
  }
});

test('the Body of Knowledge folds its chapters under one caption per part', async ({ page }) => {
  await openMenu(page, '/');
  await toggleOf(page, 'bok').click();
  const region = regionOf(page, 'bok');
  await expect(region.locator('a[href="/bok"]')).toBeVisible();
  for (const part of bookParts) {
    const name = `${part.title} ${part.range}`;
    await expect(region.getByRole('list', { name, exact: true }), name).toBeVisible();
  }
  await expect(region.locator('.mnav-chapters a')).toHaveCount(chaptersOrdered.length);
});

test('search and close stay in reach at the bottom of a long open group', async ({ page }) => {
  const drawer = await openMenu(page, '/');
  await toggleOf(page, 'bok').click();
  await drawer.evaluate((el) => el.scrollTo(0, el.scrollHeight));
  const close = drawer.getByRole('button', { name: 'Close menu' });
  await expect(close).toBeInViewport();
  await expect(drawer.locator('[data-search-open]')).toBeInViewport();
  // The open group's row sticks under the bar, so it folds from down here.
  await expect(toggleOf(page, 'bok')).toBeInViewport();
  await toggleOf(page, 'bok').click();
  await expect(regionOf(page, 'bok')).toBeHidden();
  await expect(toggleOf(page, 'bok')).toBeInViewport();
  await close.click();
  await expect(drawer).toHaveJSProperty('open', false);
  await expect(page.locator('.burger')).toBeFocused();
});

test('Escape closes the menu, unlocks the page and returns focus to the burger', async ({ page }) => {
  const drawer = await openMenu(page, '/');
  await expect(page.locator('html')).toHaveClass(/nav-locked/);
  await toggleOf(page, 'practice').focus();
  await page.keyboard.press('Enter');
  await expect(regionOf(page, 'practice')).toBeVisible();
  await page.keyboard.press('Escape');
  await expect(drawer).toHaveJSProperty('open', false);
  await expect(page.locator('html')).not.toHaveClass(/nav-locked/);
  await expect(page.locator('.burger')).toHaveAttribute('aria-expanded', 'false');
  await expect(page.locator('.burger')).toBeFocused();
});

test('the desktop bar links and triggers have a hit area of at least 24px', async ({ page }) => {
  await page.setViewportSize({ width: 1440, height: 900 });
  await page.goto('/');
  const heights = await page
    .locator('header.site-header .nav-top > li > .nav-link, header.site-header .nav-top > li > .nav-trigger')
    .evaluateAll((els) =>
      els.map((el) => ({ name: el.textContent?.trim(), h: el.getBoundingClientRect().height })),
    );
  expect(heights).toHaveLength(nav.length);
  for (const { name, h } of heights) expect(h, `${name} height`).toBeGreaterThanOrEqual(24);
});
