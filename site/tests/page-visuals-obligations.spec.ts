// page-visuals-obligations.spec.ts: data parity of the wave-2 obligation
// visuals (OpenSpec change page-visuals, block obligations): the application
// clock and the status isotype on /obligations, and the application strip and
// the constellation on /obligations/<id>. Every expectation is worked out here
// from the data modules (src/data/frameworks.ts, patterns.ts, controls, the
// crosswalk joins of lib/obligations.ts), never read back from the component,
// so a dropped row, a status drawn as another, a date moved, a relation wired
// to the wrong list or an as-of date taken from the build clock fails here.
// Owned elsewhere: the chart kit's contract and relationRadial's drawing
// (chart-primitives.spec), the stylesheet budget (perf.spec), axe in both
// themes (a11y.spec).
import { test, expect, type Page } from '@playwright/test';

import { obligations, obligationPath, appliesStatusLabels, type Obligation } from '../src/data/frameworks';
import { patterns, patternPath } from '../src/data/patterns';
import { controls } from '../src/data/controls';
import { casesFor, crosswalkFor } from '../src/lib/obligations';

/** The rows of a chart's table alternative, as text. */
async function tableRows(page: Page, figure: string): Promise<string[][]> {
  return page
    .locator(`${figure} table.chart-table tbody tr`)
    .evaluateAll((trs) => trs.map((tr) => [...tr.children].map((cell) => (cell.textContent ?? '').trim())));
}

/** The register's as-of date: the latest date a row was checked. */
const asOf = obligations.map((row) => row.reviewed).sort().at(-1)!;
const STEP_REACHED = 'Later step, reached';
const STEP_AHEAD = 'Later step, ahead';

/** Every dated point of the register as [year bucket, status word]. */
const points = obligations.flatMap((row) => [
  ...(row.appliesFrom ? [{ date: row.appliesFrom, word: appliesStatusLabels[row.appliesStatus] }] : []),
  ...(row.milestones ?? []).map((m) => ({ date: m.date, word: m.date <= asOf ? STEP_REACHED : STEP_AHEAD })),
]);
const bucket = (date: string) => (date < '2018-01-01' ? 'Before 2018' : date.slice(0, 4));

test.describe('/obligations: the application clock', () => {
  const FIG = '.chart-fig.obc';

  test('its table counts every dated row and later step by year and status, and the undated rows apart', async ({ page }) => {
    await page.goto('/obligations');
    const rows = await tableRows(page, FIG);
    const columns = await page.locator(`${FIG} table.chart-table thead th`).allTextContents();
    const cell = (row: string[], word: string) => Number(row[columns.indexOf(word)]);

    const years = [...new Set(points.map((p) => bucket(p.date)))];
    const undated = obligations.filter((row) => !row.appliesFrom);
    const order = (y: string) => (y === 'Before 2018' ? '0000' : y);
    expect(rows.map((r) => r[0])).toEqual([...years.sort((a, b) => (order(a) < order(b) ? -1 : 1)), ...(undated.length ? ['No date'] : [])]);
    for (const row of rows) {
      const inBucket = row[0] === 'No date' ? [] : points.filter((p) => bucket(p.date) === row[0]);
      const words = new Set([...points.map((p) => p.word), ...undated.map((r) => appliesStatusLabels[r.appliesStatus])]);
      for (const word of words) {
        const expected =
          row[0] === 'No date'
            ? undated.filter((r) => appliesStatusLabels[r.appliesStatus] === word).length
            : inBucket.filter((p) => p.word === word).length;
        expect(cell(row, word), `${row[0]} · ${word}`).toBe(expected);
      }
      expect(cell(row, 'Total'), `${row[0]} total`).toBe(row[0] === 'No date' ? undated.length : inBucket.length);
    }
  });

  test('both variants draw every dated point in its status, against the register as-of date', async ({ page }) => {
    await page.goto('/obligations');
    const expected = new Map<string, number>();
    for (const p of points) expected.set(p.word, (expected.get(p.word) ?? 0) + 1);
    for (const variant of ['.chart-w', '.chart-n']) {
      const svg = page.locator(`${FIG} ${variant} svg`);
      // A run of dots is titled "<dates> · <count> · <status>".
      const titles = await svg.locator('g > title').allTextContents();
      const drawn = new Map<string, number>();
      for (const t of titles) {
        const m = /· (\d+) · (.+)$/.exec(t);
        if (m) drawn.set(m[2], (drawn.get(m[2]) ?? 0) + Number(m[1]));
      }
      expect(drawn, variant).toEqual(expected);
      await expect(svg.locator('text', { hasText: `As of ${asOf}` }), variant).toHaveCount(1);
    }
  });

  test('each tower label links to a group of the list on the same page', async ({ page }) => {
    await page.goto('/obligations');
    const hrefs = await page.locator(`${FIG} .chart-w svg a`).evaluateAll((as) => as.map((a) => a.getAttribute('href') ?? ''));
    expect(hrefs.length).toBeGreaterThan(0);
    for (const href of hrefs) {
      expect(href, href).toMatch(/^#group-/);
      await expect(page.locator(href), href).toHaveCount(1);
    }
  });
});

test.describe('/obligations: the status isotype', () => {
  test('one square per row, in its status, under its instrument group', async ({ page }) => {
    await page.goto('/obligations');
    const groups = await page.locator('.obi-group').evaluateAll((els) =>
      els.map((el) => ({
        name: (el.querySelector('.obi-name span')?.textContent ?? '').trim(),
        href: el.querySelector('.obi-name')?.getAttribute('href') ?? '',
        squares: [...el.querySelectorAll('.obi-sq')].map((sq) => [...sq.classList].find((c) => c.startsWith('st-'))!.slice(3)),
      })),
    );
    const byGroup = new Map<string, Obligation[]>();
    for (const row of obligations) byGroup.set(row.framework, [...(byGroup.get(row.framework) ?? []), row]);
    expect(groups.map((g) => g.name)).toEqual([...byGroup.keys()]);
    for (const g of groups) {
      const rows = byGroup.get(g.name)!;
      expect([...g.squares].sort(), g.name).toEqual(rows.map((r) => r.appliesStatus).sort());
      await expect(page.locator(g.href), g.href).toHaveCount(1);
    }
  });

  test('the status filter shrinks the squares it leaves out', async ({ page }) => {
    await page.goto('/obligations');
    await page.locator('label[for="obx-st-deferred"]').click();
    const scale = (sel: string) =>
      page.locator(sel).first().evaluate((el) => new DOMMatrix(getComputedStyle(el).transform).a);
    await expect.poll(() => scale('.obi-sq:not(.st-deferred)')).toBeLessThan(0.5);
    expect(await scale('.obi-sq.st-deferred')).toBe(1);
  });
});

// Representative rows, picked from the data: the most dates, a date before the
// strip's 2024 default, and no date at all.
const dated = obligations.filter((row) => row.appliesFrom);
const mostDates = [...dated].sort((a, b) => (b.milestones?.length ?? 0) - (a.milestones?.length ?? 0))[0];
const early = dated.find((row) => row.appliesFrom! < '2024-01-01')!;
const undatedRow = obligations.find((row) => !row.appliesFrom)!;

test.describe('/obligations/<id>: the application strip', () => {
  for (const row of [mostDates, early]) {
    test(`${row.id} draws its first date and every later step, against its review date`, async ({ page }) => {
      await page.goto(obligationPath(row));
      const rows = await tableRows(page, '.chart-fig.obs');
      const expected = [row.appliesFrom!, ...(row.milestones ?? []).map((m) => m.date)].sort();
      expect(rows.map((r) => r[0])).toEqual(expected);
      expect(rows.find((r) => r[0] === row.appliesFrom)![1]).toBe(appliesStatusLabels[row.appliesStatus]);
      for (const m of row.milestones ?? []) expect(rows.find((r) => r[0] === m.date)![2]).toBe(m.note);
      for (const variant of ['.chart-w', '.chart-n']) {
        await expect(page.locator(`.chart-fig.obs ${variant} svg text`, { hasText: `As of ${row.reviewed}` })).toHaveCount(1);
      }
    });
  }

  test(`${undatedRow.id} has no date, so no strip`, async ({ page }) => {
    await page.goto(obligationPath(undatedRow));
    await expect(page.locator('h1')).toBeVisible();
    await expect(page.locator('.chart-fig.obs')).toHaveCount(0);
  });
});

/** The relations the constellation should draw for a row, from the data. */
function relationsOf(row: Obligation) {
  const rowPatterns = patterns.filter((p) => row.patterns?.includes(p.id));
  const rowControls = controls.filter((c) => c.mappings.obligations.includes(row.id));
  const rowCases = casesFor(row);
  const frameworks = new Set(crosswalkFor(row).flatMap((t) => t.siblings.map((s) => s.frameworkName)));
  return {
    Patterns: rowPatterns,
    'Open controls': rowControls,
    Cases: rowCases,
    'Same crosswalk topic': [...frameworks],
    total: rowPatterns.length + rowControls.length + rowCases.length + frameworks.size,
  };
}

const byRelations = [...obligations].sort((a, b) => relationsOf(b).total - relationsOf(a).total);
const richest = byRelations[0];
const typical = byRelations.find((row) => relationsOf(row).total >= 3 && relationsOf(row).total <= 8)!;
const sparse = byRelations.find((row) => relationsOf(row).total > 0 && relationsOf(row).total < 3)!;

test.describe('/obligations/<id>: the constellation', () => {
  for (const row of [richest, typical]) {
    test(`${row.id} draws every relation in its family, patterns in their layer colour`, async ({ page }) => {
      await page.goto(obligationPath(row));
      const rel = relationsOf(row);
      const rows = await tableRows(page, '.chart-fig.obn');
      for (const family of ['Patterns', 'Open controls', 'Cases', 'Same crosswalk topic'] as const) {
        expect(rows.filter((r) => r[0] === family).length, family).toBe(rel[family].length);
      }
      // Cases only cite the same article: the looser relation.
      for (const r of rows.filter((r) => r[0] === 'Cases')) expect(r[2]).toBe('Cites the article');

      // Every drawn pattern node links its page and takes its layer's fill.
      const nodes = await page.locator('.chart-fig.obn .chart-w svg a').evaluateAll((as) =>
        as.map((a) => ({ href: a.getAttribute('href') ?? '', cls: a.querySelector('circle')?.getAttribute('class') ?? '' })),
      );
      for (const p of rel.Patterns) {
        const node = nodes.find((n) => n.href === patternPath(p));
        if (!node) continue; // beyond the six a family draws; the table has it
        expect(node.cls, p.id).toContain(`mk-fill-${p.layer}`);
      }
      expect(nodes.filter((n) => n.href.startsWith('/patterns/')).length).toBe(Math.min(6, rel.Patterns.length));
    });
  }

  test(`${sparse.id} has fewer than three relations: no constellation, the lists stay`, async ({ page }) => {
    await page.goto(obligationPath(sparse));
    await expect(page.locator('.chart-fig.obn')).toHaveCount(0);
    await expect(page.locator('#patterns')).toBeVisible();
  });
});
