import { test, expect } from '@playwright/test';

test.describe('desktop grouped nav', () => {
  test.use({ viewport: { width: 1280, height: 900 } });

  test('the bar shows the group triggers and the direct links', async ({ page }) => {
    await page.goto('/');
    const header = page.locator('header.site-header');
    for (const name of ['Body of Knowledge', 'Practice', 'Reference', 'About']) {
      await expect(header.getByRole('button', { name })).toBeVisible();
    }
    await expect(header.getByRole('link', { name: 'The Thesis' })).toBeVisible();
    await expect(header.getByRole('link', { name: 'The map' })).toBeVisible();
  });

  test('exactly one theme toggle and one search button live in the header', async ({ page }) => {
    await page.goto('/');
    const header = page.locator('header.site-header');
    await expect(header.locator('[data-theme-toggle]')).toHaveCount(1);
    await expect(header.locator('[data-search-open]')).toHaveCount(1);
  });

  test('clicking a trigger opens its panel and reveals the links', async ({ page }) => {
    await page.goto('/');
    const header = page.locator('header.site-header');
    const trigger = header.getByRole('button', { name: 'Body of Knowledge' });
    const menu = page.locator('#nav-menu-bok');

    await expect(menu).toBeHidden();
    await trigger.click();
    await expect(trigger).toHaveAttribute('aria-expanded', 'true');
    await expect(menu).toBeVisible();
    await expect(menu.getByRole('link', { name: 'Body of Knowledge' })).toBeVisible();
    await expect(menu.getByRole('link', { name: 'The Stack' })).toBeVisible();
  });

  test('only one panel is open at a time', async ({ page }) => {
    await page.goto('/');
    const header = page.locator('header.site-header');
    await header.getByRole('button', { name: 'Practice' }).click();
    await expect(page.locator('#nav-menu-practice')).toBeVisible();
    await header.getByRole('button', { name: 'Reference' }).click();
    await expect(page.locator('#nav-menu-practice')).toBeHidden();
    await expect(page.locator('#nav-menu-reference')).toBeVisible();
  });

  test('Escape closes the panel and returns focus to the trigger', async ({ page }) => {
    await page.goto('/');
    const trigger = page.locator('header.site-header').getByRole('button', { name: 'Practice' });
    await trigger.click();
    await expect(page.locator('#nav-menu-practice')).toBeVisible();
    await page.keyboard.press('Escape');
    await expect(page.locator('#nav-menu-practice')).toBeHidden();
    await expect(trigger).toBeFocused();
  });

  test('a pointer press outside the bar closes the panel', async ({ page }) => {
    await page.goto('/');
    await page.locator('header.site-header').getByRole('button', { name: 'Reference' }).click();
    await expect(page.locator('#nav-menu-reference')).toBeVisible();
    // Click a non-interactive line in the footer, well below the panel.
    await page.locator('.site-footer .meta').click();
    await expect(page.locator('#nav-menu-reference')).toBeHidden();
  });

  test('moving focus out of the bar closes the panel', async ({ page }) => {
    await page.goto('/');
    await page.locator('header.site-header').getByRole('button', { name: 'About' }).click();
    await expect(page.locator('#nav-menu-about')).toBeVisible();
    await page.locator('header.site-header [data-search-open]').focus();
    await expect(page.locator('#nav-menu-about')).toBeHidden();
  });

  test('the panel does not add horizontal scroll', async ({ page }) => {
    for (const width of [1517, 1200, 900]) {
      await page.setViewportSize({ width, height: 800 });
      await page.goto('/');
      await page.locator('header.site-header').getByRole('button', { name: 'Body of Knowledge' }).click();
      await expect(page.locator('#nav-menu-bok')).toBeVisible();
      const m = await page.evaluate(() => {
        const se = document.scrollingElement as Element;
        return { sw: se.scrollWidth, cw: se.clientWidth };
      });
      expect(m.sw, `no horizontal scroll with a panel open at ${width}px`).toBe(m.cw);
    }
  });

  test('the current reference subpage lights Reference and its Tools link', async ({ page }) => {
    await page.goto('/resources/tools');
    const header = page.locator('header.site-header');
    await expect(header.locator('[data-nav-group="reference"]')).toHaveAttribute('data-current', '');
    await expect(header.locator('#nav-menu-reference a[href="/resources/tools"]')).toHaveAttribute(
      'aria-current',
      'page',
    );
  });

  test('a chapter surfaced by Practice lights Practice, not Body of Knowledge', async ({ page }) => {
    await page.goto('/bok/patterns');
    const header = page.locator('header.site-header');
    await expect(header.locator('[data-nav-group="practice"]')).toHaveAttribute('data-current', '');
    await expect(header.locator('[data-nav-group="bok"]')).not.toHaveAttribute('data-current', '');
    await expect(
      header.locator('#nav-menu-practice a[href="/bok/patterns"]'),
    ).toHaveAttribute('aria-current', 'page');
  });
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

test.describe('mobile drawer', () => {
  test.use({ viewport: { width: 390, height: 800 } });

  test('the burger opens the modal drawer and locks the page', async ({ page }) => {
    await page.goto('/');
    const burger = page.locator('.burger');
    const drawer = page.locator('#nav-drawer');
    await expect(burger).toBeVisible();

    const navLink = page.locator('.nav-panel a', { hasText: 'Body of Knowledge' });
    await expect(navLink).toBeHidden();

    await burger.click();
    await expect(drawer).toHaveJSProperty('open', true);
    await expect(page.locator('html')).toHaveClass(/nav-locked/);
    await expect(navLink).toBeVisible();

    await page.keyboard.press('Escape');
    await expect(drawer).toHaveJSProperty('open', false);
    await expect(page.locator('html')).not.toHaveClass(/nav-locked/);
    await expect(burger).toHaveAttribute('aria-expanded', 'false');
    await expect(burger).toBeFocused();
  });
});
