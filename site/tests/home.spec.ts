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

  test('the hero figure carries no simulated run telemetry', async ({ page }) => {
    await page.goto('/');
    // No run bar, no PASS stamp, no attestation number around the diagram.
    await expect(page.locator('.hero .hero-panel-bar')).toHaveCount(0);
    await expect(page.locator('.hero .stamp')).toHaveCount(0);
    await expect(page.locator('.hero-caption')).not.toContainText(/#\d|run|attestation/i);
    // The nodes' example run values (sublabels) are not drawn in the hero.
    await expect(page.locator('.hero-art-wide text[data-detail="context"]').first()).toBeHidden();
  });

  test('the hero figure links to the chapter that explains the loop', async ({ page }) => {
    await page.goto('/');
    const link = page
      .locator('.hero figcaption')
      .getByRole('link', { name: 'Read how the governance loop works', exact: true });
    await expect(link).toBeVisible();
    await expect(link).toHaveAttribute('href', '/bok/the-stack#how-to-read-the-stack');
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

  test('value cards are flat: no resting shadow and no lift (they are not links)', async ({ page }) => {
    await page.goto('/');
    const cards = page.locator('.pair-bento');
    await expect(cards).toHaveCount(8);
    const styles = await cards.evaluateAll((els) =>
      els.map((el) => ({ shadow: getComputedStyle(el).boxShadow, lift: el.classList.contains('lift') })),
    );
    for (const s of styles) {
      expect(s.shadow).toBe('none');
      expect(s.lift).toBe(false);
    }
  });

  test('the verdict ticker carries no run numbers', async ({ page }) => {
    await page.goto('/');
    await expect(page.locator('.vt-list')).not.toContainText(/#\d/);
  });

  test('in the dark theme the verdict beat and the closing band are dark, visible bands', async ({
    page,
  }) => {
    await page.emulateMedia({ colorScheme: 'dark' });
    await page.goto('/');
    const lum = (sel: string) =>
      page.locator(sel).first().evaluate((el) => {
        // The dark fills are color-mix() results, which compute to color(srgb …):
        // resolve through a canvas pixel to get plain 0–255 channels.
        const cx = document.createElement('canvas').getContext('2d')!;
        cx.fillStyle = getComputedStyle(el).backgroundColor;
        cx.fillRect(0, 0, 1, 1);
        const [r, g, b] = cx.getImageData(0, 0, 1, 1).data;
        const f = (c: number) => {
          c /= 255;
          return c <= 0.03928 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4;
        };
        return 0.2126 * f(r) + 0.7152 * f(g) + 0.0722 * f(b);
      });
    const page0 = await lum('body');
    const verdict = await lum('.verdict-beat');
    const band = await lum('.band');
    // Not the cream slab: the closing band stays a dark ground.
    expect(band).toBeLessThan(0.1);
    // Both bands read apart from the #121417 page (> 1.1:1).
    expect((verdict + 0.05) / (page0 + 0.05)).toBeGreaterThan(1.1);
    expect((band + 0.05) / (page0 + 0.05)).toBeGreaterThan(1.1);
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
