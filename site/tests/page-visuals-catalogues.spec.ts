// page-visuals-catalogues.spec.ts: data parity of the wave-1 catalogue
// visuals (OpenSpec page-visuals) against the datasets they are drawn from:
// the controls mosaic on /controls (data/controls), the clause x instrument
// matrix on /resources/contracts (data/contracts.ts) and the three charts on
// /resources/dpia-lists (data/dpia-lists.ts). Expected values are computed
// here from the data modules, never read back from the chart code, so a chart
// that drops, adds or miscounts a record fails. Runs in `default` on a build.
import { test, expect, type Page } from '@playwright/test';
import { controls, profiles, controlPath } from '../src/data/controls';
import { clauses, references } from '../src/data/contracts';
import { lists, annexIIIOrder, annexIIICounts, methodLabel } from '../src/data/dpia-lists';

/** The data table of the chart whose figcaption title is `title`. */
async function chartTable(page: Page, title: string): Promise<string[][]> {
  const figure = page.locator('figure.chart-fig', { has: page.locator('.chart-title', { hasText: title }) });
  await expect(figure).toHaveCount(1);
  return figure.locator('.chart-table tbody tr').evaluateAll((rows) =>
    rows.map((row) => [...row.querySelectorAll('th, td')].map((cell) => (cell.textContent ?? '').trim())),
  );
}

test.describe('/controls mosaic', () => {
  // A failure response the source material does not state is its own hatched
  // state, never an alert. Each profile words that default its own way (agent
  // runtime "To be specified.", assurance and evidence "To be specified: the
  // source material states no ..."); both begin with the same words.
  const stateOf = (control: (typeof controls)[number]) =>
    control.failureResponse.text.trim().startsWith('To be specified')
      ? 'tbs'
      : control.failureResponse.effect === 'alert'
        ? 'alert'
        : 'hold';

  test('one square per control, linked to it, in its profile, layer and failure-response state', async ({ page }) => {
    await page.goto('/controls');
    const cells = await page.locator('.cmo-cell').evaluateAll((els) =>
      els.map((el) => ({
        href: el.getAttribute('href') ?? '',
        cls: el.className,
        profile: el.closest('ul')?.getAttribute('aria-label') ?? '',
      })),
    );
    expect(cells).toHaveLength(controls.length);
    const byHref = new Map(cells.map((c) => [c.href, c]));
    expect(byHref.size).toBe(controls.length);
    for (const control of controls) {
      const cell = byHref.get(controlPath(control));
      expect(cell, control.id).toBeDefined();
      const profile = profiles.find((p) => p.slug === control.profile)!;
      expect(cell!.profile.startsWith(`${profile.shortTitle}:`), control.id).toBe(true);
      expect(cell!.cls, control.id).toContain(`cmo-l${control.layer}`);
      expect(cell!.cls.split(/\s+/), control.id).toContain(`cmo-${stateOf(control)}`);
    }
  });

  test('the headline and the legend count each failure-response state of the data', async ({ page }) => {
    await page.goto('/controls');
    const count = (state: string) => controls.filter((c) => stateOf(c) === state).length;
    const kpi = page.locator('.cmo-kpis > div', { has: page.locator('dt', { hasText: 'Response to be specified' }) });
    await expect(kpi.locator('dd')).toHaveText(String(count('tbs')));
    const legend = page.locator('ul[aria-label="Drawing: failure response"] li');
    await expect(legend).toHaveCount(3);
    const drawn = await legend.evaluateAll((items) =>
      items.map((li) => ({
        state: [...(li.querySelector('.cmo-swatch')?.classList ?? [])].find((c) => /^cmo-(hold|alert|tbs)$/.test(c)) ?? '',
        n: Number(li.querySelector('.cmo-key-n')?.textContent),
      })),
    );
    expect(drawn).toEqual(['hold', 'alert', 'tbs'].map((state) => ({ state: `cmo-${state}`, n: count(state) })));
  });
});

test.describe('/resources/contracts matrix', () => {
  test('draws one dot per clause mapping and tables every mapping', async ({ page }) => {
    await page.goto('/resources/contracts');
    const total = clauses.reduce((sum, c) => sum + c.mapsTo.length, 0);
    // The wide SVG: the mapping dots sit in the two mark groups (the legend's
    // swatches are outside them).
    const dots = await page.locator('svg[aria-labelledby^="ct-matrix-w-"] g.mk > circle').count();
    expect(dots).toBe(total);
    const rows = await chartTable(page, 'Which instruments each clause answers');
    expect(rows).toHaveLength(clauses.length);
    for (const clause of clauses) {
      const row = rows.find((r) => r[0] === clause.clause);
      expect(row, clause.id).toBeDefined();
      const drawn = [row![1], row![2]]
        .flatMap((cell) => (cell === 'None' ? [] : cell.split('; ')))
        .sort();
      expect(drawn, clause.id).toEqual(clause.mapsTo.map((ref) => references[ref].label).sort());
      expect(Number(row![3]), clause.id).toBe(clause.mapsTo.length);
    }
  });
});

test.describe('/resources/dpia-lists charts', () => {
  test('the Annex III grid counts each list’s overlapping items per area', async ({ page }) => {
    await page.goto('/resources/dpia-lists');
    const rows = await chartTable(page, 'Annex III overlaps, list by list');
    expect(rows).toHaveLength(lists.length + 1);
    for (const list of lists) {
      const row = rows.find((r) => r[0] === list.country);
      expect(row, list.id).toBeDefined();
      const expected = annexIIIOrder.map((area) => list.items.filter((i) => i.annexIII.includes(area)).length);
      expect(row!.slice(1, -1).map(Number), list.id).toEqual(expected);
      // The total counts items, not overlaps: an item that touches two areas
      // is in both columns but once in its list's total.
      expect(Number(row!.at(-1)), list.id).toBe(list.items.filter((i) => i.annexIII.length > 0).length);
    }
    const totals = rows[rows.length - 1];
    for (const { area, items } of annexIIICounts()) {
      expect(Number(totals[1 + annexIIIOrder.indexOf(area)]), area).toBe(items);
    }
    expect(Number(totals.at(-1))).toBe(lists.flatMap((l) => l.items).filter((i) => i.annexIII.length > 0).length);
  });

  test('the timeline dates every adoption and EDPB opinion of the data', async ({ page }) => {
    await page.goto('/resources/dpia-lists');
    const rows = await chartTable(page, 'The lists predate the AI Act');
    const adopted = rows.filter((r) => r[2] === 'Adopted').map((r) => `${r[1]} ${r[0]}`).sort();
    expect(adopted).toEqual(lists.map((l) => `${l.country}: list adopted ${l.adopted}`).sort());
    const opinions = rows.filter((r) => r[2] === 'EDPB opinion on the draft').map((r) => r[0]).sort();
    expect(opinions).toEqual(lists.flatMap((l) => (l.edpbOpinion.date ? [l.edpbOpinion.date] : [])).sort());
  });

  test('the size bars give each list its item count under its method', async ({ page }) => {
    await page.goto('/resources/dpia-lists');
    const rows = await chartTable(page, 'List size and method');
    expect(rows).toHaveLength(lists.length);
    const methods = (['enumerated', 'scored', 'mixed'] as const).map((m) => methodLabel[m]);
    for (const list of lists) {
      const row = rows.find((r) => r[0] === list.country);
      expect(row, list.id).toBeDefined();
      const values = row!.slice(1, 4).map(Number);
      expect(values[methods.indexOf(methodLabel[list.method])], list.id).toBe(list.itemCount);
      expect(Number(row![4]), list.id).toBe(list.itemCount);
    }
  });
});
