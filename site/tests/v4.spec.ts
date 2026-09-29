import { test, expect } from '@playwright/test';

// V4: glossary hover cards + reading progress register. Assertions run in the
// `default` project; the review shots into V4/ live in v4.screenshots.spec.ts.

test.describe('glossary term links', () => {
  test('the-stack links >= 5 terms to their pages and book-index anchors', async ({ page }) => {
    await page.goto('/bok/the-stack');

    const links = await page.locator('a.term').evaluateAll((els) =>
      els.map((el) => ({
        href: el.getAttribute('href') ?? '',
        term: el.getAttribute('data-term') ?? '',
      })),
    );
    expect(links.length).toBeGreaterThanOrEqual(5);

    // Each term links to its own page (/glossary/<slug>); data-term is its t- id.
    for (const link of links) {
      expect(link.href).toBe(`/glossary/${link.term.replace(/^t-/, '')}`);
    }

    // The t- ids are anchors in the book index, /bok/glossary.
    await page.goto('/bok/glossary');
    const ids = await page.locator('[id]').evaluateAll((els) => els.map((el) => el.id));
    for (const link of links) {
      expect(ids).toContain(link.term);
    }
  });

  test('hovering a term shows a role=tooltip card', async ({ page }) => {
    await page.setViewportSize({ width: 1440, height: 1000 });
    await page.goto('/bok/the-stack');

    await page.locator('a.term').first().hover();

    const tip = page.locator('#term-card[role="tooltip"]');
    await expect(tip).toBeVisible();
    await expect(tip.locator('.tc-term')).not.toBeEmpty();
    await expect(tip.locator('.tc-link')).toHaveAttribute('href', /^\/glossary\/[a-z0-9-]+$/);
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
    expect(entry.url).toBe(`/glossary/${entry.slug.replace(/^t-/, '')}`);
    expect(entry.anchor).toBe(`/bok/glossary#${entry.slug}`);
  }
});
