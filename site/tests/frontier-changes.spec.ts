// frontier-changes.spec.ts: /resources/frontier-framework-changes, the version
// history of the frontier safety frameworks and the changes between versions
// (OpenSpec change frontier-framework-changes). The data module's invariants
// (frontierChangeProblems, which the page build runs) own the data rules; this
// spec covers what a reader and a consumer observe: a change permalink lands on
// that change, the exports hold as many records as the page, nothing needs
// JavaScript, axe and no sideways scroll on a phone.
import { test, expect } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';
import {
  FRONTIER_CHANGES_PATH,
  frontierChanges,
  frontierTransitions,
  frontierVersions,
} from '../src/data/frontier-changes';

const PAGE = FRONTIER_CHANGES_PATH;

/** RFC 4180 parser: quoted fields may hold commas, doubled quotes and newlines. */
function parseCsv(text: string): string[][] {
  const rows: string[][] = [];
  let row: string[] = [];
  let field = '';
  let quoted = false;
  for (let i = 0; i < text.length; i++) {
    const c = text[i];
    if (quoted) {
      if (c === '"' && text[i + 1] === '"') {
        field += '"';
        i++;
      } else if (c === '"') {
        quoted = false;
      } else {
        field += c;
      }
    } else if (c === '"') {
      quoted = true;
    } else if (c === ',') {
      row.push(field);
      field = '';
    } else if (c === '\r' || c === '\n') {
      if (c === '\r' && text[i + 1] === '\n') i++;
      row.push(field);
      rows.push(row);
      row = [];
      field = '';
    } else {
      field += c;
    }
  }
  if (field !== '' || row.length > 0) {
    row.push(field);
    rows.push(row);
  }
  return rows;
}

test.describe('frontier framework changes: page', () => {
  test('a change permalink lands on that change, inside its transition', async ({ page }) => {
    const change = frontierChanges[frontierChanges.length - 1];
    await page.goto(`${PAGE}#${change.id}`);
    const target = page.locator(`[id="${change.id}"]`);
    await expect(target).toBeInViewport();
    await expect(target).toContainText(change.section);
    await expect(target.locator(`xpath=ancestor::article[@id="${change.transition}"]`)).toHaveCount(1);
  });

  test('at 390 px the page does not scroll sideways, hashes included', async ({ page }) => {
    await page.setViewportSize({ width: 390, height: 844 });
    await page.goto(PAGE);
    const { scrollWidth, innerWidth } = await page.evaluate(() => ({
      scrollWidth: document.documentElement.scrollWidth,
      innerWidth: window.innerWidth,
    }));
    expect(scrollWidth).toBeLessThanOrEqual(innerWidth);
  });

  for (const scheme of ['light', 'dark'] as const) {
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

test.describe('frontier framework changes: without JavaScript', () => {
  test.use({ javaScriptEnabled: false });

  test('every version, transition and change is in the HTML', async ({ page }) => {
    await page.goto(PAGE);
    await expect(page.locator('.fc-table tbody tr')).toHaveCount(frontierVersions.length);
    await expect(page.locator('article.fc-trans')).toHaveCount(frontierTransitions.length);
    await expect(page.locator('li.fc-change')).toHaveCount(frontierChanges.length);
    // A transition not compared says so and lists no change.
    const open = frontierTransitions.find((t) => !t.covered);
    if (open) {
      const card = page.locator(`article[id="${open.id}"]`);
      await expect(card).toContainText('Not covered');
      await expect(card.locator('li.fc-change')).toHaveCount(0);
    }
  });
});

test.describe('frontier framework changes: exports', () => {
  test('JSON and CSV hold as many records as the page', async ({ request }) => {
    const jsonRes = await request.get(`${PAGE}.json`);
    expect(jsonRes.status()).toBe(200);
    const json = JSON.parse(await jsonRes.text());
    expect(json.schemaVersion).toBe(1);
    expect(json.notice).toContain("not a claim about any lab's conduct");
    expect(json.versions).toHaveLength(frontierVersions.length);
    expect(json.transitions).toHaveLength(frontierTransitions.length);
    expect(json.changes).toHaveLength(frontierChanges.length);

    const csvRes = await request.get(`${PAGE}.csv`);
    expect(csvRes.status()).toBe(200);
    const rows = parseCsv(await csvRes.text());
    // A notice row, a header row, then one row per change.
    expect(rows).toHaveLength(frontierChanges.length + 2);
    expect(rows[0]).toHaveLength(1);
    const [, header, ...data] = rows;
    for (const r of data) expect(r).toHaveLength(header.length);
  });
});
