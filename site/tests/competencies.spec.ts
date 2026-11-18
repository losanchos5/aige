// competencies.spec.ts: /role/competencies, the competency matrix (OpenSpec
// change competency-matrix, design D11). competencyProblems(), which the page
// build runs, owns the data rules; this spec covers what a reader and a
// consumer observe: a cell permalink lands on that cell, nothing needs
// JavaScript, axe, no sideways scroll on a phone, and the API dataset carries
// the same cells as the page.
import { test, expect, type Page } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';
import {
  COMPETENCIES_PATH,
  competencyCellId,
  competencyCells,
  functionStatements,
  rungs,
} from '../src/data/competencies';
import { workflows } from '../src/data/role';

const PAGE = COMPETENCIES_PATH;

test.describe('competency matrix: page', () => {
  test('a cell permalink lands below the sticky header and names its workflow and rung', async ({ page }) => {
    // Reduced motion turns off the site's smooth scroll, so the jump is instant.
    await page.emulateMedia({ reducedMotion: 'reduce' });
    const cell = competencyCells[competencyCells.length - 6];
    const workflow = workflows.find((w) => w.id === cell.workflow)!;
    const rung = rungs.find((r) => r.n === cell.rung)!;
    const id = competencyCellId(cell.workflow, cell.rung);
    await page.goto(`${PAGE}#${id}`);
    const target = page.locator(`[id="${id}"]`);
    const header = (await page.locator('.site-header').boundingBox())!;
    const headerBottom = header.y + header.height;
    const viewportHeight = page.viewportSize()!.height;
    await expect
      .poll(async () => {
        const box = await target.boundingBox();
        return box !== null && box.y >= headerBottom && box.y < viewportHeight;
      })
      .toBe(true);
    await expect(target).toContainText(workflow.name);
    await expect(target).toContainText(rung.name);
  });

  test('at 390 px the page does not scroll sideways', async ({ page }) => {
    await page.setViewportSize({ width: 390, height: 844 });
    await page.goto(PAGE);
    const { scrollWidth, innerWidth } = await page.evaluate(() => ({
      scrollWidth: document.documentElement.scrollWidth,
      innerWidth: window.innerWidth,
    }));
    expect(scrollWidth).toBeLessThanOrEqual(innerWidth);
  });

  for (const scheme of ['light', 'dark'] as const) {
    // Stays beside a11y.spec.ts: that one is stricter (any impact) and runs on the default project only.
    test(`axe WCAG 2.1 AA, ${scheme}`, async ({ page }) => {
      await page.emulateMedia({ colorScheme: scheme, reducedMotion: 'reduce' });
      await page.goto(PAGE);
      const result = await new AxeBuilder({ page })
        .withTags(['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa'])
        .analyze();
      expect(result.violations.map((v) => `${v.id}: ${v.help} (${v.nodes.length})`)).toEqual([]);
    });
  }
});

test.describe('competency matrix: roadmap', () => {
  const roadmap = (page: Page) => page.getByRole('table', { name: /Competency roadmap/ });

  test('every node links to a section on the page, and the fifth rung to the function band', async ({ page }) => {
    await page.goto(PAGE);
    const hrefs = await roadmap(page).getByRole('link').evaluateAll((links) => links.map((a) => a.getAttribute('href') ?? ''));
    for (const cell of competencyCells) expect(hrefs).toContain(`#${competencyCellId(cell.workflow, cell.rung)}`);
    expect(hrefs).toContain('#function');
  });

  // At 390 px the table is restyled to display:block, where only the explicit ARIA roles keep it a table.
  test('on a phone the table keeps its row, column and cell roles and the fifth rung follows it', async ({ page }) => {
    await page.setViewportSize({ width: 390, height: 844 });
    await page.goto(PAGE);
    const table = roadmap(page);
    const stations = rungs.filter((r) => r.n <= 4);
    await expect(table.getByRole('columnheader')).toContainText(['Workflow', ...stations.map((r) => `Rung ${r.n}`)]);
    await expect(table.getByRole('rowheader')).toContainText(workflows.map((w) => w.name));
    await expect(table.getByRole('cell')).toHaveCount(competencyCells.length);
    const top = rungs[rungs.length - 1];
    const fifth = page.getByRole('link', { name: new RegExp(`Rung ${top.n}.*${top.name}`) });
    await expect(fifth).toBeVisible();
    await expect(fifth).toHaveAttribute('href', '#function');
  });
});

test.describe('competency matrix: without JavaScript', () => {
  test.use({ javaScriptEnabled: false });

  test('the table, all 28 cells and the function band are in the HTML', async ({ page }) => {
    await page.goto(PAGE);
    await expect(page.locator('table').first()).toBeVisible();
    for (const cell of competencyCells) {
      await expect(page.locator(`[id="${competencyCellId(cell.workflow, cell.rung)}"]`), `${cell.workflow} r${cell.rung}`).toHaveCount(1);
    }
    const body = (await page.locator('main').textContent()) ?? '';
    for (const f of functionStatements) expect(body).toContain(f.can);
  });
});

test.describe('competency matrix: API dataset', () => {
  test('every cell url and function statement resolves on the page', async ({ request, page }) => {
    const res = await request.get('/api/v1/competencies.json');
    expect(res.status()).toBe(200);
    const api = JSON.parse(await res.text());
    expect(api.disclaimer).toContain('not an industry standard');
    expect(api.cells).toHaveLength(competencyCells.length);
    expect(api.function).toHaveLength(functionStatements.length);
    await page.goto(PAGE);
    for (const c of api.cells as { url: string }[]) {
      const id = new URL(c.url).hash.slice(1);
      await expect(page.locator(`[id="${id}"]`), c.url).toHaveCount(1);
    }
    const body = (await page.locator('main').textContent()) ?? '';
    for (const f of api.function as { can: string }[]) expect(body).toContain(f.can);
  });
});
