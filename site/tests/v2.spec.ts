// v2.spec.ts: Block V2 — the /stack interactive layer-flow diagram and the
// home "The stack" evidence pulse. Structural/interaction assertions run in the
// default project; the review screenshots (motion on for the pulse, both colour
// schemes) are written to tests/__screenshots__/V2b/.
import { test, expect } from '@playwright/test';
import { mkdirSync } from 'node:fs';
import { join } from 'node:path';

const DIR = join('tests', '__screenshots__', 'V2b');

test.describe('/stack layer-flow diagram', () => {
  test('renders five bands with role=button, all tabbable', async ({ page }) => {
    await page.goto('/stack');
    const bands = page.locator('.flow-svg [role="button"]');
    await expect(bands).toHaveCount(5);
    for (let i = 0; i < 5; i++) {
      await expect(bands.nth(i)).toHaveAttribute('tabindex', '0');
    }
  });

  test('activating band 03 shows its panel and hides the others', async ({ page }) => {
    await page.goto('/stack');
    const band3 = page.locator('.flow-svg [data-layer="3"]');
    await band3.click();

    await expect(band3).toHaveAttribute('aria-pressed', 'true');
    await expect(page.locator('.flow-panel[data-panel="3"]')).toBeVisible();
    for (const n of [1, 2, 4, 5]) {
      await expect(page.locator(`.flow-panel[data-panel="${n}"]`)).toBeHidden();
    }
  });

  test('keyboard activation (focus + Enter) works', async ({ page }) => {
    await page.goto('/stack');
    const band2 = page.locator('.flow-svg [data-layer="2"]');
    await band2.focus();
    await page.keyboard.press('Enter');

    await expect(band2).toHaveAttribute('aria-pressed', 'true');
    await expect(page.locator('.flow-panel[data-panel="2"]')).toBeVisible();
  });

  test('default (first paint) shows layer 01 panel only', async ({ page }) => {
    await page.goto('/stack');
    await expect(page.locator('.flow-panel[data-panel="1"]')).toBeVisible();
    for (const n of [2, 3, 4, 5]) {
      await expect(page.locator(`.flow-panel[data-panel="${n}"]`)).toBeHidden();
    }
  });
});

test.describe('home "The stack" evidence pulse', () => {
  test('the interactive register carries a pulse element', async ({ page }) => {
    await page.goto('/');
    await expect(page.locator('.diagram-int [data-testid="stack-pulse"]')).toHaveCount(1);
    await expect(page.locator('[data-testid="stack-row"]')).toHaveCount(5);
  });
});

// ---- Review screenshots ----------------------------------------------------
test.describe('V2 review shots', () => {
  test.beforeAll(() => mkdirSync(DIR, { recursive: true }));

  const schemes = ['light', 'dark'] as const;

  for (const scheme of schemes) {
    test(`stack diagram 1440 ${scheme} (default + layer 03)`, async ({ page }) => {
      await page.emulateMedia({ colorScheme: scheme, reducedMotion: 'reduce' });
      await page.setViewportSize({ width: 1440, height: 1000 });
      await page.goto('/stack');
      await page.waitForLoadState('networkidle');

      const flow = page.locator('[data-flow]');
      await flow.scrollIntoViewIfNeeded();
      await expect(flow).toBeVisible();
      await flow.screenshot({ path: join(DIR, `stack-diagram-1440-${scheme}.png`) });

      await page.locator('.flow-svg [data-layer="3"]').click();
      await expect(page.locator('.flow-panel[data-panel="3"]')).toBeVisible();
      await flow.screenshot({ path: join(DIR, `stack-diagram-1440-${scheme}-l3.png`) });
    });

    test(`home stack mid-pulse 1440 ${scheme}`, async ({ page }) => {
      // Motion ON so the pulse is visible; wait for it to reach mid-travel.
      await page.emulateMedia({ colorScheme: scheme, reducedMotion: 'no-preference' });
      await page.setViewportSize({ width: 1440, height: 1000 });
      await page.goto('/');
      const reg = page.locator('.diagram-int');
      await reg.scrollIntoViewIfNeeded();
      await expect(reg).toBeVisible();
      await page.waitForTimeout(1900);
      await reg.screenshot({ path: join(DIR, `home-stack-pulse-1440-${scheme}.png`) });
    });
  }

  test('stack diagram 390 light', async ({ page }) => {
    await page.emulateMedia({ colorScheme: 'light', reducedMotion: 'reduce' });
    await page.setViewportSize({ width: 390, height: 900 });
    await page.goto('/stack');
    await page.waitForLoadState('networkidle');
    const flow = page.locator('[data-flow]');
    await flow.scrollIntoViewIfNeeded();
    await flow.screenshot({ path: join(DIR, 'stack-diagram-390-light.png') });
  });

  test('home stack 390 light', async ({ page }) => {
    await page.emulateMedia({ colorScheme: 'light', reducedMotion: 'no-preference' });
    await page.setViewportSize({ width: 390, height: 900 });
    await page.goto('/');
    const reg = page.locator('.diagram-int');
    await reg.scrollIntoViewIfNeeded();
    await page.waitForTimeout(1900);
    await reg.screenshot({ path: join(DIR, 'home-stack-390-light.png') });
  });
});
