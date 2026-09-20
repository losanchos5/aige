import { test, expect } from '@playwright/test';
import { mkdirSync } from 'node:fs';
import { join } from 'node:path';
import { frameworks, obligations } from '../src/data/frameworks';

// An independent copy of ObligationMatrix's obligation → framework-id join, used
// only as a test oracle: it lets us compute, straight from the data, exactly
// which frameworks the matrix's inclusion rule (a framework gets a row iff at
// least one obligation resolves to it) should select. If the component's join and
// this one ever drift, the row-count assertion below fails.
function resolveFwId(framework: string, obligation: string): string {
  const f = framework;
  const t = obligation;
  if (f === 'EU AI Act') return 'eu-ai-act';
  if (f === 'GPAI Code of Practice') return 'gpai-code-of-practice';
  if (f === 'ISO/IEC 42001') return 'iso-42001';
  if (f === 'ISO/IEC 42006') return 'iso-42006';
  if (f === 'ISO/IEC 23894') return 'iso-23894';
  if (f === 'NIST AI RMF') return 'nist-ai-rmf';
  if (f === 'NIST (agent, cyber and misuse work)') {
    if (/agent standards/i.test(t)) return 'nist-ai-agent-standards';
    if (/8596/.test(t)) return 'nist-ir-8596';
    return 'nist-ai-800-1';
  }
  if (f === 'CSA AICM / STAR for AI')
    return /star/i.test(t) ? 'csa-star-for-ai' : 'csa-aicm';
  if (f === 'OWASP GenAI Security Project') {
    if (/agentic/i.test(t)) return 'owasp-agentic-top-10';
    if (/llm/i.test(t)) return 'owasp-llm-top-10';
    if (/acs|agent control/i.test(t)) return 'owasp-acs';
    if (/aibom/i.test(t)) return 'owasp-aibom';
    return 'owasp-llm-top-10';
  }
  if (f === 'US frontier-developer laws')
    return /raise/i.test(t) ? 'ny-raise-act' : 'ca-sb-53';
  if (f === 'US state AI laws')
    return /texas|traiga/i.test(t) ? 'tx-traiga' : 'co-ai-act';
  if (f === 'Other jurisdictions') {
    if (/korea/i.test(t)) return 'kr-ai-basic-act';
    if (/singapore|imda/i.test(t)) return 'sg-genai-framework';
    if (/etsi|304 223/i.test(t)) return 'etsi-en-304-223';
    return 'uk-duaa';
  }
  return f;
}

const includedFwIds = new Set(
  obligations.map((o) => resolveFwId(o.framework, o.obligation)),
);

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

  // The rows are derived from frameworks.ts, so every framework the inclusion
  // rule selects gets a row — including the ones the old hard-coded id map dropped
  // (ISO/IEC 42006, ISO/IEC 23894, the newer NIST work, US state laws, and the
  // other-jurisdiction instruments).
  test('derives one row per framework with obligations, incl. new frameworks', async ({ page }) => {
    await page.goto(FRAMEWORKS);

    // A row for ISO/IEC 42006 and for at least one US state law (Texas TRAIGA).
    await expect(page.locator('.mx-rowh[data-mx-fw="iso-42006"]')).toHaveCount(1);
    await expect(page.locator('.mx-rowh[data-mx-fw="tx-traiga"]')).toHaveCount(1);

    // One row per framework the inclusion rule selects — no more, no fewer.
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
