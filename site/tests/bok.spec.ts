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

test('the closed chapter drawer takes no tab stops on a phone viewport', async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 780 });
  await page.goto('/bok/the-stack');

  // Tab from the top of the page well into the prose: no stop may land inside
  // the off-canvas rail while it is closed.
  for (let i = 0; i < 30; i++) {
    await page.keyboard.press('Tab');
    const inSidebar = await page.evaluate(
      () => !!document.activeElement?.closest('#doc-sidebar'),
    );
    expect(inSidebar, `tab stop ${i + 1} landed in the closed drawer`).toBe(false);
  }
});

test('the open chapter drawer is a modal dialog and Escape hands focus back', async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 780 });
  await page.goto('/bok/the-stack');

  const sidebar = page.locator('#doc-sidebar');
  const toggle = page.locator('[data-drawer-open]');
  await toggle.click();

  await expect(sidebar).toHaveAttribute('role', 'dialog');
  await expect(sidebar).toHaveAttribute('aria-modal', 'true');
  await expect(sidebar).toHaveAttribute('aria-label', 'Chapters');
  expect(await sidebar.evaluate((el) => el.contains(document.activeElement))).toBe(true);

  await page.keyboard.press('Escape');
  await expect(toggle).toBeFocused();
  await expect(toggle).toHaveAttribute('aria-expanded', 'false');
  await expect(sidebar).not.toHaveAttribute('role', 'dialog');
  await expect(sidebar).not.toHaveAttribute('aria-modal', 'true');
});

test('the chapter rail and the TOC stay in view deep into a chapter', async ({ page }) => {
  await page.setViewportSize({ width: 1440, height: 900 });
  await page.goto('/bok/the-stack');
  await page.evaluate(() => window.scrollTo(0, 5000));

  for (const selector of ['.doc-sidebar', '.doc-toc']) {
    await expect
      .poll(() =>
        page.evaluate((sel) => {
          const r = document.querySelector(sel)!.getBoundingClientRect();
          return r.top >= 0 && r.top < window.innerHeight && r.bottom > 0;
        }, selector),
        { message: `${selector} scrolled out of view` },
      )
      .toBe(true);
  }

  // Deep in the chapter the TOC shows where the reader is: one current entry
  // and the entries before it marked as read.
  await expect(page.locator('nav.toc a[aria-current]')).toHaveCount(1);
  expect(await page.locator('nav.toc a.is-past').count()).toBeGreaterThanOrEqual(1);
});

test('opening "Cite this chapter" on a phone adds no horizontal scroll', async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 780 });
  await page.goto('/bok/the-stack');

  await page.locator('.cite-box > summary').click();
  await expect(page.locator('.cite-bibtex')).toBeVisible();

  const { scrollW, clientW } = await page.evaluate(() => ({
    scrollW: document.documentElement.scrollWidth,
    clientW: document.documentElement.clientWidth,
  }));
  expect(scrollW).toBeLessThanOrEqual(clientW);
});

test('the chapter breadcrumb names the chapter number once', async ({ page }) => {
  await page.goto('/bok/the-stack');
  await expect(page.locator('.doc-crumbs [aria-current="page"]')).toHaveText('04 · The Stack');
});

test('chapter summaries end on a full sentence, never an ellipsis', () => {
  for (const chapter of chaptersOrdered) {
    expect(chapter.summary.trim(), chapter.slug).not.toMatch(/(…|\.\.\.)$/);
  }
});

test('search opens with Ctrl+K and returns results for "policy"', async ({ page }) => {
  await page.goto('/bok/the-stack');
  await page.keyboard.press('Control+k');

  const dialog = page.locator('#search-dialog');
  await expect(dialog).toBeVisible();

  await page.locator('#search-input').fill('policy');
  await expect(page.locator('.search-result').first()).toBeVisible({ timeout: 15000 });
});
