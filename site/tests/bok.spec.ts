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

  for (const chapter of chaptersOrdered) {
    const expected = chapter.glance?.length ?? 0;
    test(`/bok/${chapter.slug} ${expected ? 'opens with an At a glance block' : 'has no At a glance block'}`, async ({
      page,
    }) => {
      await page.goto(`/bok/${chapter.slug}`);
      const glance = page.locator('article.prose > .glance');
      if (!expected) {
        await expect(glance).toHaveCount(0);
        return;
      }
      await expect(glance).toHaveCount(1);
      await expect(glance.locator('.glance-item')).toHaveCount(expected);
      // It sits under the header, before the prose and its first H2.
      const order = await page.evaluate(() => {
        const g = document.querySelector('article.prose > .glance');
        const h2 = document.querySelector('article.prose h2');
        return g && h2 ? g.compareDocumentPosition(h2) & Node.DOCUMENT_POSITION_FOLLOWING : 0;
      });
      expect(order).toBeTruthy();
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

test('the thesis renders', async ({ page }) => {
  const response = await page.goto('/thesis');
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

// TC-05: the result rows are built at runtime, so the dialog's styles must
// reach them — display-font titles, no underline, and a token-tinted <mark>
// instead of the browser's yellow. TC-17: one Esc closes, even with text typed.
test('search results are styled and a single Escape closes the dialog', async ({ page }) => {
  await page.goto('/bok/the-stack');
  await page.keyboard.press('Control+k');
  const dialog = page.locator('#search-dialog');
  await expect(dialog).toBeVisible();

  await page.locator('#search-input').fill('policy');
  await expect(page.locator('.search-result').first()).toBeVisible({ timeout: 15000 });

  const styles = await page.evaluate(() => {
    const cs = (sel: string) => {
      const el = document.querySelector(sel);
      return el ? getComputedStyle(el) : null;
    };
    const mark = cs('.search-result-excerpt mark');
    return {
      linkDecoration: cs('.search-result a')?.textDecorationLine,
      titleFont: cs('.search-result-title')?.fontFamily,
      markBg: mark?.backgroundColor ?? null,
    };
  });
  expect(styles.linkDecoration).toBe('none');
  expect(styles.titleFont).toContain('Bricolage');
  expect(styles.markBg, 'a match is highlighted').not.toBeNull();
  expect(styles.markBg).not.toBe('rgb(255, 255, 0)');

  await page.locator('#search-input').press('Escape');
  await expect(dialog).toBeHidden();
  await expect(page.locator('#search-input')).toHaveValue('');
});
