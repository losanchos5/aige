import { test, expect } from '@playwright/test';

test.describe('home page', () => {
  test('hero shows the headline and both CTAs', async ({ page }) => {
    await page.goto('/');
    await expect(page.locator('h1')).toHaveText('Governance you can run, not just read.');
    await expect(
      page.getByRole('link', { name: 'Read the Thesis', exact: true }),
    ).toBeVisible();
    await expect(
      page.getByRole('link', { name: 'Open the Body of Knowledge', exact: true }),
    ).toBeVisible();
  });

  test('the hero embeds both governance-loop diagrams', async ({ page }) => {
    await page.goto('/');
    await expect(page.locator('.hero figure.diagram[data-diagram="hero-loop"]')).toHaveCount(1);
    await expect(page.locator('.hero figure.diagram[data-diagram="hero-loop-tall"]')).toHaveCount(1);
  });

  test('at desktop the wide loop shows and the tall one is hidden', async ({ page }) => {
    await page.setViewportSize({ width: 1440, height: 900 });
    await page.goto('/');
    await expect(page.locator('.hero-art-wide figure[data-diagram="hero-loop"]')).toBeVisible();
    await expect(page.locator('.hero-art-tall figure[data-diagram="hero-loop-tall"]')).toBeHidden();
  });

  test('at phone width the tall loop shows and the wide one is hidden', async ({ page }) => {
    await page.setViewportSize({ width: 390, height: 900 });
    await page.goto('/');
    await expect(page.locator('.hero-art-tall figure[data-diagram="hero-loop-tall"]')).toBeVisible();
    await expect(page.locator('.hero-art-wide figure[data-diagram="hero-loop"]')).toBeHidden();
  });

  test('the verdict stamp is visible in the static state', async ({ page }) => {
    await page.emulateMedia({ reducedMotion: 'reduce' });
    await page.goto('/');
    await expect(page.locator('.hero-stamp')).toBeVisible();
  });

  test('the stack renders five register rows', async ({ page }) => {
    await page.goto('/');
    await expect(page.locator('[data-testid="stack-row"]')).toHaveCount(5);
  });

  test('values render eight over/under pairs', async ({ page }) => {
    await page.goto('/');
    await expect(page.locator('[data-testid="value-pair"]')).toHaveCount(8);
  });

  test('the Body of Knowledge renders eleven chapter cards', async ({ page }) => {
    await page.goto('/');
    await expect(page.locator('[data-testid="chapter-card"]')).toHaveCount(11);
  });

  test('every market stat tile carries a source', async ({ page }) => {
    await page.goto('/');
    const tiles = page.locator('.stats-row .tile');
    const count = await tiles.count();
    expect(count).toBeGreaterThan(0);
    await expect(page.locator('.stats-row .tile .source')).toHaveCount(count);
    for (let i = 0; i < count; i++) {
      await expect(tiles.nth(i).locator('.source')).not.toBeEmpty();
    }
  });
});

// Design-review shots for Block B (the new hero): the home page at four widths
// (including 1900 to check the hero no longer bleeds to the viewport edge) in
// both colour schemes, written to tests/__screenshots__/I/.
const widths = [390, 834, 1440, 1900];
const schemes = ['light', 'dark'] as const;

for (const scheme of schemes) {
  for (const width of widths) {
    test(`screenshot home ${width} ${scheme}`, async ({ page }) => {
      // reduced-motion gives the resting (revealed) state deterministically:
      // the reveal-on-scroll observer never fires for below-fold sections
      // during a full-page capture, so without this they'd read as blank.
      await page.emulateMedia({ colorScheme: scheme, reducedMotion: 'reduce' });
      await page.setViewportSize({ width, height: 1200 });
      await page.goto('/');
      await page.waitForLoadState('networkidle');
      await page.screenshot({
        path: `tests/__screenshots__/I/home-${width}-${scheme}.png`,
        fullPage: true,
      });
    });
  }
}
