// stack-role.spec.ts: Block D — the /stack and /role landing pages.
// Structural assertions (panel/row/workflow/step counts, sourced stat tiles),
// a check that every chapter back-link resolves to a real #id in its target
// /bok page, and reading-comfort screenshots into tests/__screenshots__/D/.

import { test, expect } from '@playwright/test';
import { assertChapterLinksResolve } from './helpers/links';

test.describe('/stack', () => {
  test('shows five layer panels', async ({ page }) => {
    await page.goto('/stack');
    await expect(page.locator('.layer-panel')).toHaveCount(5);
  });

  test('has a tools table with at least 15 rows', async ({ page }) => {
    await page.goto('/stack');
    const table = page.locator('table.tools-table');
    await expect(table).toBeVisible();
    expect(await table.locator('tbody tr').count()).toBeGreaterThanOrEqual(15);
  });

  test('every chapter link resolves to a real anchor', async ({ page }) => {
    await assertChapterLinksResolve(page, '/stack');
  });
});

test.describe('/role', () => {
  test('shows seven workflow items', async ({ page }) => {
    await page.goto('/role');
    await expect(page.locator('.workflow-item')).toHaveCount(7);
  });

  test('has a contrast table', async ({ page }) => {
    await page.goto('/role');
    await expect(page.locator('.contrast')).toBeVisible();
  });

  test('shows five maturity steps', async ({ page }) => {
    await page.goto('/role');
    await expect(page.locator('.maturity-step')).toHaveCount(5);
  });

  test('every stat tile carries a source', async ({ page }) => {
    await page.goto('/role');
    const tiles = page.locator('.stats .tile');
    const count = await tiles.count();
    expect(count).toBeGreaterThan(0);
    for (let i = 0; i < count; i++) {
      const source = await tiles.nth(i).locator('.source').innerText();
      expect(source.trim().length).toBeGreaterThan(0);
    }
  });

  test('every chapter link resolves to a real anchor', async ({ page }) => {
    await assertChapterLinksResolve(page, '/role');
  });
});

// Reading-comfort review shots for Block D, three widths in both schemes.
const shots = [
  { name: 'stack', path: '/stack' },
  { name: 'role', path: '/role' },
];
const widths = [390, 834, 1440];
const schemes = ['light', 'dark'] as const;

for (const scheme of schemes) {
  for (const shot of shots) {
    for (const width of widths) {
      test(`screenshot ${shot.name} ${width} ${scheme}`, async ({ page }) => {
        // Reduced motion keeps the reveal-on-scroll content fully painted, so a
        // full-page capture shows every section rather than the pre-reveal state.
        await page.emulateMedia({ colorScheme: scheme, reducedMotion: 'reduce' });
        await page.setViewportSize({ width, height: 1200 });
        await page.goto(shot.path);
        await page.waitForLoadState('networkidle');
        await page.screenshot({
          path: `tests/__screenshots__/D/${shot.name}-${width}-${scheme}.png`,
          fullPage: true,
        });
      });
    }
  }
}
