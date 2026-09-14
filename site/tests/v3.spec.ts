import { test, expect } from '@playwright/test';
import { mkdirSync } from 'node:fs';
import { join } from 'node:path';

// Block V3 — the obligation heat matrix (/resources/frameworks), StatTile
// count-up and the MaturityLadder draw-on (/role). Acceptance assertions plus
// the review screenshots written to tests/__screenshots__/V3/.
const DIR = join('tests', '__screenshots__', 'V3');
test.beforeAll(() => mkdirSync(DIR, { recursive: true }));

const FRAMEWORKS = '/resources/frameworks';
const ROLE = '/role';

test.describe('obligation matrix', () => {
  test('has five layer columns and at least eight framework rows', async ({ page }) => {
    await page.goto(FRAMEWORKS);
    await expect(page.locator('[data-mx-grid] .mx-colh')).toHaveCount(5);
    const rows = page.locator('[data-mx-grid] tbody tr.mx-row');
    expect(await rows.count()).toBeGreaterThanOrEqual(8);
  });

  test('clicking a cell filters the table and shows the status line', async ({ page }) => {
    await page.goto(FRAMEWORKS);
    const allRows = page.locator('[data-obligation-row]');
    const total = await allRows.count();
    expect(total).toBeGreaterThan(0);

    const cell = page.locator('.mx-cell[data-mx-fw="eu-ai-act"][data-mx-layer="1"]');
    await cell.scrollIntoViewIfNeeded();
    await cell.click();

    const status = page.locator('[data-mx-status]');
    await expect(status).toBeVisible();
    await expect(status).toContainText('Showing');
    await expect(status).toContainText('EU AI Act');
    await expect(status).toContainText('Layer 01');
    await expect(cell).toHaveAttribute('aria-pressed', 'true');

    const visible = page.locator('[data-obligation-row]:not(.mx-hidden)');
    const shown = await visible.count();
    expect(shown).toBeGreaterThan(0);
    expect(shown).toBeLessThan(total);

    // Clear restores every row.
    await page.locator('[data-mx-clear]').click();
    await expect(status).toBeHidden();
    await expect(page.locator('[data-obligation-row]:not(.mx-hidden)')).toHaveCount(total);
  });

  test('Escape clears an active filter', async ({ page }) => {
    await page.goto(FRAMEWORKS);
    const rowHead = page.locator('.mx-rowh[data-mx-fw="owasp-llm-top-10"]');
    await rowHead.scrollIntoViewIfNeeded();
    await rowHead.click();
    await expect(page.locator('[data-mx-status]')).toBeVisible();
    await page.keyboard.press('Escape');
    await expect(page.locator('[data-mx-status]')).toBeHidden();
  });
});

test.describe('stat tiles and ladder', () => {
  test('StatTile server HTML carries the final value and data-countup', async ({ request }) => {
    const res = await request.get(ROLE);
    const html = await res.text();
    expect(html).toContain('data-countup');
    expect(html).toContain('USD 221k');
  });

  test('the maturity ladder has five steps', async ({ page }) => {
    await page.goto(ROLE);
    await expect(page.locator('.ladder[data-ladder] .maturity-step')).toHaveCount(5);
  });
});

// Review screenshots. These run in the default project (motion enabled) and are
// captured at fixed points in the animations for the design pass.
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
