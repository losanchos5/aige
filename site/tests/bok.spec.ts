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

  test('every chapter but the glossary names five to ten key terms', () => {
    for (const chapter of chaptersOrdered) {
      const count = chapter.keyTerms?.length ?? 0;
      if (chapter.slug === 'glossary') {
        expect(count, chapter.id).toBe(0);
        continue;
      }
      expect(count, chapter.id).toBeGreaterThanOrEqual(5);
      expect(count, chapter.id).toBeLessThanOrEqual(10);
      expect(new Set(chapter.keyTerms).size, chapter.id).toBe(count);
    }
  });

  for (const chapter of chaptersOrdered) {
    const keyTerms = chapter.keyTerms ?? [];
    if (keyTerms.length === 0) continue;
    test(`/bok/${chapter.slug} lists its key terms as glossary links before the first H2`, async ({
      page,
    }) => {
      await page.goto(`/bok/${chapter.slug}`);
      const row = page.locator('article.prose > .key-terms');
      await expect(row).toHaveCount(1);
      await expect(row.locator('.key-terms-label')).toHaveText('Key terms in this chapter');
      const hrefs = await row
        .locator('a.term')
        .evaluateAll((els) => els.map((el) => el.getAttribute('href') ?? ''));
      expect(hrefs).toEqual(keyTerms.map((slug) => `/glossary/${slug}`));
      const order = await page.evaluate(() => {
        const k = document.querySelector('article.prose > .key-terms');
        const h2 = document.querySelector('article.prose h2');
        return k && h2 ? k.compareDocumentPosition(h2) & Node.DOCUMENT_POSITION_FOLLOWING : 0;
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

  // TC-15, as on /path and the crosswalk: header, footer and the chapter
  // behind are inert while the drawer is open; the drawer and scrim are not.
  const inert = await page.evaluate(() => {
    const isInert = (sel: string) => !!document.querySelector(sel)?.closest('[inert]');
    return {
      header: isInert('header.site-header'),
      footer: isInert('.site-footer'),
      main: isInert('.doc-main'),
      drawer: isInert('#doc-sidebar'),
      scrim: isInert('.doc-scrim'),
    };
  });
  expect(inert).toEqual({ header: true, footer: true, main: true, drawer: false, scrim: false });

  await page.keyboard.press('Escape');
  await expect(toggle).toBeFocused();
  await expect(toggle).toHaveAttribute('aria-expanded', 'false');
  await expect(sidebar).not.toHaveAttribute('role', 'dialog');
  await expect(sidebar).not.toHaveAttribute('aria-modal', 'true');
  await expect(page.locator('[inert]')).toHaveCount(0);
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

// TC-05: the result rows are built at runtime, so the dialog's styles must
// reach them: display-font titles, no underline, and a token-tinted <mark>
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

// SL-04 / SL-06: the chapter header opens on its H1 (the crumb above already says
// "Body of Knowledge › 04 · The Stack"), and no chapter header takes a layer
// colour unless the chapter is about one layer (none is today).
test('chapter headers carry no eyebrow and stay neutral', async ({ page }) => {
  for (const chapter of chaptersOrdered) {
    await page.goto(`/bok/${chapter.slug}`);
    const band = page.locator('.chapter-header .ch-band');
    await expect(band).toHaveCount(1);
    await expect(band.locator('.ch-kicker, .ch-kicker-num')).toHaveCount(0);
    expect(await band.getAttribute('data-layer')).toBe(chapter.layer ? `l${chapter.layer}` : null);
  }
});
