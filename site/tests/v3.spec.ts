import { test, expect } from '@playwright/test';
import { frameworks, obligations } from '../src/data/frameworks';

// The matrix joins each obligation to its catalogue framework through the row's
// own `frameworkId` (schema version 2), so the inclusion rule (a framework gets a
// row iff at least one obligation names it) can be computed straight from the
// data. Before schema version 2 the component guessed the join from the group
// name and the obligation text; that guess could not follow the v0.5.0 rows,
// which sit under new chapter-08 headings.
const frameworkIdSet = new Set(frameworks.map((fw) => fw.id));
const includedFwIds = new Set(obligations.map((o) => o.frameworkId));

test('every obligation frameworkId names a framework the matrix can draw', () => {
  for (const o of obligations) {
    expect(frameworkIdSet.has(o.frameworkId), o.id).toBe(true);
  }
});

// Block V3: the obligation heat matrix (/resources/frameworks), StatTile
// count-up and the MaturityLadder draw-on (/role). Acceptance assertions; the
// review screenshots live in v3.screenshots.spec.ts (the `visual` project).

const FRAMEWORKS = '/resources/frameworks';
const ROLE = '/role';

test.describe('obligation matrix', () => {
  test('has five layer columns and at least eight framework rows', async ({ page }) => {
    await page.goto(FRAMEWORKS);
    await expect(page.locator('[data-mx-grid] .mx-colh')).toHaveCount(5);
    const rows = page.locator('[data-mx-grid] tbody tr.mx-row');
    expect(await rows.count()).toBeGreaterThanOrEqual(8);
  });

  // The rows are derived from frameworks.ts, so every framework the inclusion
  // rule selects gets a row, including the ones the old hard-coded id map dropped
  // (ISO/IEC 42006, ISO/IEC 23894, the newer NIST work, US state laws, and the
  // other-jurisdiction instruments).
  test('derives one row per framework with obligations, incl. new frameworks', async ({ page }) => {
    await page.goto(FRAMEWORKS);

    // A row for ISO/IEC 42006 and for at least one US state law (Texas TRAIGA).
    await expect(page.locator('.mx-rowh[data-mx-fw="iso-42006"]')).toHaveCount(1);
    await expect(page.locator('.mx-rowh[data-mx-fw="tx-traiga"]')).toHaveCount(1);

    // One row per framework the inclusion rule selects, no more, no fewer.
    const rowHeads = page.locator('[data-mx-grid] tbody tr.mx-row .mx-rowh');
    expect(await rowHeads.count()).toBe(includedFwIds.size);

    // Every framework id shown is a real id from frameworks.ts.
    const ids = new Set(frameworks.map((fw) => fw.id));
    const shown = await rowHeads.evaluateAll((els) =>
      els.map((el) => el.getAttribute('data-mx-fw')),
    );
    for (const id of shown) {
      expect(ids.has(id as string)).toBe(true);
    }
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
