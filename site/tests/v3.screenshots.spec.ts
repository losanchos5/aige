// Block V3 review shots, captured at fixed points in the animations for the
// design pass and written to tests/__screenshots__/V3/. Behaviour is
// asserted in v3.spec.ts.
import { test } from '@playwright/test';
import { mkdirSync } from 'node:fs';
import { join } from 'node:path';

const DIR = join('tests', '__screenshots__', 'V3');
test.beforeAll(() => mkdirSync(DIR, { recursive: true }));

const FRAMEWORKS = '/resources/frameworks';
const ROLE = '/role';

test.describe('screenshots', () => {
  const shot = (name: string) => join(DIR, `${name}.png`);

  for (const scheme of ['light', 'dark'] as const) {
    test(`matrix 1440 ${scheme} default and filtered`, async ({ page }) => {
      await page.emulateMedia({ colorScheme: scheme });
      await page.setViewportSize({ width: 1440, height: 1400 });
      await page.goto(FRAMEWORKS);
      await page.waitForLoadState('networkidle');
      const grid = page.locator('.mx');
      await grid.scrollIntoViewIfNeeded();
      await page.waitForTimeout(500);
      await grid.screenshot({ path: shot(`matrix-1440-${scheme}-default`) });

      const cell = page.locator('.mx-cell[data-mx-fw="eu-ai-act"][data-mx-layer="1"]');
      await cell.click();
      await page.waitForTimeout(200);
      await page.screenshot({ path: shot(`matrix-1440-${scheme}-filtered`), fullPage: false });
    });
  }

  test('role stats mid-count 1440', async ({ page }) => {
    await page.setViewportSize({ width: 1440, height: 900 });
    await page.goto(ROLE);
    await page.locator('.stats').scrollIntoViewIfNeeded();
    await page.waitForTimeout(320);
    await page.screenshot({ path: shot('role-stats-midcount') });
  });

  test('maturity ladder after draw 1440', async ({ page }) => {
    await page.setViewportSize({ width: 1440, height: 900 });
    await page.goto(ROLE);
    const ladder = page.locator('.ladder[data-ladder]');
    await ladder.scrollIntoViewIfNeeded();
    await page.waitForTimeout(1400);
    await ladder.screenshot({ path: shot('ladder-drawn') });
  });

  test('matrix 390 light', async ({ page }) => {
    await page.emulateMedia({ colorScheme: 'light' });
    await page.setViewportSize({ width: 390, height: 1600 });
    await page.goto(FRAMEWORKS);
    await page.waitForLoadState('networkidle');
    const grid = page.locator('.mx');
    await grid.scrollIntoViewIfNeeded();
    await page.waitForTimeout(500);
    await grid.screenshot({ path: shot('matrix-390-light') });
  });
});
