// page-visuals-rdc.spec.ts: data parity of the wave-1 page visuals of block
// resources-deadlines-cases (OpenSpec change page-visuals): the corpus isotype
// on /resources, the Omnibus dumbbell on both AI Act deadlines pages and the
// case timeline on /cases (the harm-levels figure on /resources/harms is
// placed by figures.ts pages[], checked in page-visuals-w1e.spec). Each test
// checks that what the chart draws (its marks and its table) equals the
// dataset it comes from, so a count wired to the wrong list, a dropped row or
// a mark that no longer matches its record fails here. Owned elsewhere: the
// chart kit's contract (chart-primitives.spec), the stylesheet ban on /,
// /resources and /cases (perf.spec), axe in both themes (a11y.spec).
import { test, expect } from '@playwright/test';

import { frameworks, obligations } from '../src/data/frameworks';
import { harms } from '../src/data/harms';
import { cases, caseEvidenceLabel } from '../src/data/cases';
import { controls } from '../src/data/controls';
import { clauses } from '../src/data/contracts';
import { allTools } from '../src/data/stack';
import { datasets } from '../src/lib/api';
import { aiActMilestones } from '../src/data/ai-act-timeline';

/** The rows of a chart's table alternative, as text. */
async function tableRows(page: import('@playwright/test').Page, figure: string): Promise<string[][]> {
  return page
    .locator(`${figure} table.chart-table tbody tr`)
    .evaluateAll((trs) => trs.map((tr) => [...tr.children].map((cell) => (cell.textContent ?? '').trim())));
}

test.describe('/resources: the corpus in dots', () => {
  const FIG = '.rc-corpus .chart-fig';

  test('each row counts its dataset, matches its hub card and draws count / unit dots', async ({ page }) => {
    await page.goto('/resources');
    const rows = await tableRows(page, FIG);
    const count = new Map(rows.map(([label, n]) => [label, Number(n)]));

    // Straight from the datasets the rows name.
    expect(count.get('Obligation register')).toBe(obligations.length);
    expect(count.get('Frameworks')).toBe(frameworks.length);
    expect(count.get('Harms atlas')).toBe(harms.length);
    expect(count.get('Cases')).toBe(cases.length);
    expect(count.get('Open control profiles')).toBe(controls.length);
    expect(count.get('Contracts')).toBe(clauses.length);
    expect(count.get('Tools')).toBe(allTools().length);
    expect(count.get('Open data & API')).toBe(datasets.length);
    expect(count.get('AI Act deadlines')).toBe(aiActMilestones.length);

    // Every row equals the record count its card shows (the figures card
    // counts infographics and diagrams, the row both).
    const cards = await page.locator('[data-resource-card]').evaluateAll((els) =>
      els.map((el) => ({
        title: (el.querySelector('.rc-title')?.textContent ?? '').trim(),
        numbers: ((el.querySelector('[data-resource-count]')?.textContent ?? '').match(/\d+/g) ?? []).map(Number),
      })),
    );
    for (const [label, n] of count) {
      const card = cards.find((c) => c.title === label);
      expect(card, `a hub card titled "${label}"`).toBeTruthy();
      expect(n, label).toBe(label === 'Figures' ? card!.numbers[0] + card!.numbers[1] : card!.numbers[0]);
    }

    // The visible wide SVG: one linked row per table row, in the same order,
    // each drawing count / unit dots (dot pitch = the pattern tile).
    // Whole dots are exact; a remainder is never drawn short and is widened
    // by less than half a dot, so a row of one record still shows ink.
    const svg = page.locator(`${FIG} .chart-w svg`);
    const unit = Number((await svg.locator('text').first().textContent())?.match(/= (\d+)/)?.[1]);
    expect(unit).toBeGreaterThan(0);
    const drawn = await svg.evaluate((el) =>
      [...el.querySelectorAll('a')].map((a) => {
        const rect = a.querySelector('rect')!;
        const tile = el.querySelector(rect.getAttribute('fill')!.slice(4, -1))!;
        return {
          name: a.querySelector('title')?.textContent ?? '',
          dots: Number(rect.getAttribute('width')) / Number(tile.getAttribute('width')),
        };
      }),
    );
    expect(drawn.map((d) => d.name.split(':')[0])).toEqual(rows.map((r) => r[0]));
    drawn.forEach((d, i) => {
      const expected = Number(rows[i][1]) / unit;
      expect(Math.floor(d.dots + 1e-6), d.name).toBe(Math.floor(expected));
      expect(d.dots, d.name).toBeGreaterThanOrEqual(expected - 0.05);
      expect(d.dots - expected, d.name).toBeLessThan(0.5);
    });
  });
});

const shifted = aiActMilestones.flatMap((m) => (m.changed ?? []).map((shift) => ({ m, from: shift.from })));

for (const { path, lang } of [
  { path: '/resources/ai-act-deadlines', lang: 'en' },
  { path: '/es/resources/ai-act-deadlines', lang: 'es' },
] as const) {
  test.describe(`${path}: what the Omnibus moved`, () => {
    test('one dumbbell per deferred date, from its original date to the date now, with the delay in months', async ({ page }) => {
      test.skip(!shifted.length, 'the Omnibus moved no date');
      await page.goto(path);
      const fig = page.locator('.chart-fig').filter({ has: page.locator('svg.ch-dumbbell') });
      const rows = await tableRows(page, '.chart-fig:has(svg.ch-dumbbell)');
      expect(rows.map((r) => [r[1], r[2]])).toEqual(shifted.map(({ m, from }) => [from, m.date]));
      // Whole months between two dates that share the day of the month.
      const months = (from: string, to: string) =>
        (Number(to.slice(0, 4)) - Number(from.slice(0, 4))) * 12 + Number(to.slice(5, 7)) - Number(from.slice(5, 7));
      shifted.forEach(({ m, from }, i) => {
        expect(from.slice(8), `${m.id} keeps the day of the month`).toBe(m.date.slice(8));
        expect(rows[i][3]).toMatch(new RegExp(`^\\+${months(from, m.date)} `));
      });
      // Each label links the milestone it moved.
      const hrefs = await fig.locator('.chart-w svg a').evaluateAll((as) => as.map((a) => a.getAttribute('href')));
      expect(hrefs).toEqual(shifted.map(({ m }) => `#m-${m.id}`));
      if (lang === 'es') await expect(fig.locator('.chart-w svg')).toHaveAttribute('lang', 'es');
    });
  });
}

test('the Spanish Omnibus chart prints no English word', async ({ page }) => {
  await page.goto('/es/resources/ai-act-deadlines');
  const fig = page.locator('.chart-fig:has(svg.ch-dumbbell)');
  const words = (
    await fig.evaluate((el) =>
      [...el.querySelectorAll('svg text, svg title, table caption, th, td, summary, figcaption')].map((n) => n.textContent ?? '').join(' '),
    )
  ).split(/[^A-Za-z]+/);
  const english = ['Source', 'As', 'Today', 'Original', 'date', 'now', 'months', 'month', 'Delay', 'Item', 'Note', 'Data', 'table'];
  expect(words.filter((w) => english.includes(w))).toEqual([]);
});

test.describe('/cases: cases by year', () => {
  const FIG = '.chart-fig:has(svg.ch-years)';
  const MARK = { primary: 'circle', secondary: 'rect', reported: 'path' } as const;

  test('one linked glyph per case, in its year, shaped by its evidence, and per-year counts from the data', async ({ page }) => {
    await page.goto('/cases');
    const rows = await tableRows(page, FIG);
    expect(rows.map((r) => r[0]).sort()).toEqual(cases.map((c) => c.short).sort());
    for (const c of cases) {
      const row = rows.find((r) => r[0] === c.short)!;
      expect([row[1], row[2], row[3]], c.id).toEqual([c.year, caseEvidenceLabel[c.evidence], c.sector]);
    }

    for (const variant of ['.chart-w', '.chart-n']) {
      const glyphs = await page.locator(`${FIG} ${variant} svg a`).evaluateAll((as) =>
        as.map((a) => ({ href: a.getAttribute('href'), tag: a.querySelector('circle, rect, path')!.tagName })),
      );
      expect(glyphs.map((g) => g.href).sort(), variant).toEqual(cases.map((c) => `/cases/${c.id}`).sort());
      for (const c of cases) {
        expect(glyphs.find((g) => g.href === `/cases/${c.id}`)!.tag, `${variant} ${c.id}`).toBe(MARK[c.evidence]);
      }
    }

    // The count over each year's column is that year's number of cases.
    const perYear = new Map<string, number>();
    for (const c of cases) perYear.set(c.year, (perYear.get(c.year) ?? 0) + 1);
    const counts = await page
      .locator(`${FIG} .chart-w svg text.disp`)
      .evaluateAll((ts) => ts.map((t) => Number(t.textContent)));
    const years = [...perYear.keys()].sort();
    expect(counts).toEqual(years.map((y) => perYear.get(y)));
  });
});
