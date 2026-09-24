import { test, expect, type Page } from '@playwright/test';

// V4: glossary hover cards + reading progress register. Assertions run in the
// `default` project; the screenshots below are review shots into V4/.

test.describe('glossary term links', () => {
  test('the-stack links >= 5 terms that resolve to glossary ids', async ({ page }) => {
    await page.goto('/bok/the-stack');

    const hrefs = await page
      .locator('a.term')
      .evaluateAll((els) => els.map((el) => el.getAttribute('href') ?? ''));
    expect(hrefs.length).toBeGreaterThanOrEqual(5);

    for (const href of hrefs) {
      expect(href.startsWith('/resources/glossary#')).toBe(true);
    }

    const fragments = [...new Set(hrefs.map((h) => h.split('#')[1]).filter(Boolean))];

    await page.goto('/resources/glossary');
    const ids = await page.locator('[id]').evaluateAll((els) => els.map((el) => el.id));
    for (const fragment of fragments) {
      expect(ids).toContain(fragment);
    }
  });

  test('hovering a term shows a role=tooltip card', async ({ page }) => {
    await page.setViewportSize({ width: 1440, height: 1000 });
    await page.goto('/bok/the-stack');

    await page.locator('a.term').first().hover();

    const tip = page.locator('#term-card[role="tooltip"]');
    await expect(tip).toBeVisible();
    await expect(tip.locator('.tc-term')).not.toBeEmpty();
    await expect(tip.locator('.tc-link')).toHaveAttribute('href', /\/resources\/glossary#/);
  });
});

test.describe('reading progress', () => {
  test('scrolling to the bottom fills the hairline and marks the chapter read', async ({
    page,
  }) => {
    await page.setViewportSize({ width: 1440, height: 900 });
    await page.goto('/bok/the-stack');

    await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
    await page.waitForTimeout(250);

    const scaleX = await page.locator('[data-doc-progress]').evaluate((el) => {
      const t = getComputedStyle(el).transform;
      if (!t || t === 'none') return 0;
      const m = t.match(/matrix\(([^)]+)\)/);
      return m ? parseFloat(m[1].split(',')[0]) : 0;
    });
    expect(scaleX).toBeGreaterThan(0.95);

    const read = await page.evaluate(() => localStorage.getItem('aige.read'));
    expect(read ?? '').toContain('the-stack');
  });
});

test('glossary.json is valid with >= 50 entries', async ({ page }) => {
  const res = await page.request.get('/glossary.json');
  expect(res.ok()).toBeTruthy();

  const entries = await res.json();
  expect(Array.isArray(entries)).toBe(true);
  expect(entries.length).toBeGreaterThanOrEqual(50);

  for (const entry of entries) {
    expect(typeof entry.term).toBe('string');
    expect(typeof entry.slug).toBe('string');
    expect(typeof entry.definition).toBe('string');
    expect(entry.definition.length).toBeLessThanOrEqual(241);
    expect(entry.url).toBe(`/resources/glossary#${entry.slug}`);
  }
});

// ---- Review screenshots into tests/__screenshots__/V4/ ----

const DIR = 'tests/__screenshots__/V4';

async function midTermHover(page: Page) {
  const terms = page.locator('a.term');
  const count = await terms.count();
  const target = terms.nth(Math.min(count - 1, Math.floor(count / 2)));
  await target.scrollIntoViewIfNeeded();
  await target.hover();
  await expect(page.locator('#term-card')).toBeVisible();
  // Let the 160ms opacity fade settle so the review shot is fully opaque.
  await page.waitForTimeout(250);
}

for (const scheme of ['light', 'dark'] as const) {
  test(`screenshot the-stack 1440 ${scheme} (tooltip + progress)`, async ({ page }) => {
    await page.emulateMedia({ colorScheme: scheme });
    await page.setViewportSize({ width: 1440, height: 900 });
    await page.goto('/bok/the-stack');
    await page.waitForLoadState('networkidle');
    await midTermHover(page);
    await page.screenshot({ path: `${DIR}/the-stack-1440-${scheme}.png` });
  });
}

test('screenshot the-stack 390 light', async ({ page }) => {
  await page.emulateMedia({ colorScheme: 'light' });
  await page.setViewportSize({ width: 390, height: 780 });
  await page.goto('/bok/the-stack');
  await page.waitForLoadState('networkidle');
  await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight / 3));
  await page.waitForTimeout(200);
  await page.screenshot({ path: `${DIR}/the-stack-390-light.png` });
});
