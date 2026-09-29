// v2.spec.ts: Block V2, the /stack interactive layer-flow diagram and the
// home "The stack" evidence pulse. Structural/interaction assertions; the
// review screenshots live in v2.screenshots.spec.ts (the `visual` project).
import { test, expect } from '@playwright/test';

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
