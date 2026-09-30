// frontier-crosswalk.spec.ts: /resources/frontier-safety-crosswalk, the three
// frontier labs' safety policies mapped to NIST AI RMF and ISO/IEC 42001
// (OpenSpec change frontier-safety-crosswalk). The data module's own
// invariants (frontierProblems, which the page build runs) own the reference
// rules, NIST and ISO titles included; this spec covers the page behaviour the
// shared grid, drawer and crosswalk.js must keep on this page: all five columns
// always on, the drawer, the no-JS jump targets, the exports, a11y with the
// drawer open and no sideways page scroll; and the coverage map above the grid
// (OpenSpec change frontier-coverage-map): its cells open the same drawer, its
// lenses and their URL fragment, and axe with a lens on.
// The static page is also in the a11y sweep (a11y.spec.ts),
// seo-schema.spec.ts and the resources hub list; not repeated here.
import { test, expect } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';
import {
  FRONTIER_CROSSWALK_PATH,
  dimensions,
  frontierColumns,
  frontierDocs,
  frontierGaps,
  frontierRefs,
} from '../src/data/frontier-crosswalk';

const PAGE = FRONTIER_CROSSWALK_PATH;

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

test.describe('frontier crosswalk: page', () => {
  test('at 1440 px every column shows, one row per dimension, no chooser, stale choice ignored', async ({
    page,
  }) => {
    // The general crosswalk remembers its column choice; it must not leak here.
    await page.addInitScript(() => {
      window.localStorage.setItem('aige.crosswalk.columns.v2', JSON.stringify(['eu']));
    });
    await page.setViewportSize({ width: 1440, height: 900 });
    await page.goto(PAGE);
    await page.waitForLoadState('load');

    await expect(page.locator('[data-cw-cols]')).toHaveCount(0);
    await expect(page.locator('th.cw-colh:visible')).toHaveCount(frontierColumns.length);
    await expect(page.locator('tr.cw-row')).toHaveCount(dimensions.length);
    await expect(page.locator('tr.cw-row').first().locator('td:visible')).toHaveCount(
      frontierColumns.length,
    );
  });

  test('hero, the three lab version cards and the link to /frontier', async ({ page }) => {
    await page.goto(PAGE);
    await expect(page.locator('h1')).toHaveCount(1);

    const cards = page.locator('.fs-doc');
    await expect(cards).toHaveCount(3);
    const labs = frontierDocs.filter((d) => !['nist-ai-rmf', 'iso-42001'].includes(d.frameworkId));
    for (const doc of labs) {
      await expect(cards.filter({ hasText: doc.issuer }).first()).toContainText(doc.version);
    }
    await expect(page.locator('main a[href="/frontier"]').first()).toBeVisible();
  });

  test('a cell opens the drawer on its dimension; Esc closes it and returns focus', async ({
    page,
  }) => {
    await page.setViewportSize({ width: 1440, height: 900 });
    await page.goto(PAGE);
    const cell = page.locator('.cw-cell').first();
    const name = (
      await cell.locator('xpath=ancestor::tr[1]').locator('.cw-rowh').textContent()
    )?.trim() as string;
    await cell.click();

    const drawer = page.locator('#cw-drawer');
    await expect(drawer).toBeVisible();
    await expect(page.locator('#cw-drawer-title')).toHaveText(name);
    expect(
      await page.evaluate(() => !!document.getElementById('cw-drawer')?.contains(document.activeElement)),
    ).toBe(true);
    await expect(drawer.locator('[data-drawer-body] li[data-fw]').first()).toBeVisible();

    await page.keyboard.press('Escape');
    await expect(drawer).toBeHidden();
    await expect(cell).toBeFocused();
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

  // The route sweep (a11y.spec.ts) never opens the drawer, never turns a map
  // lens on and gates only serious/critical; this checks both states against
  // WCAG 2.1 AA. The gaps lens is the one that recolours cells (muted cells off
  // the lens, tinted gap cells).
  for (const scheme of ['light', 'dark'] as const) {
    test(`axe WCAG 2.1 AA with the gaps lens on, then the drawer open, ${scheme}`, async ({
      page,
    }) => {
      await page.emulateMedia({ colorScheme: scheme, reducedMotion: 'reduce' });
      await page.setViewportSize({ width: 1440, height: 900 });
      await page.goto(`${PAGE}#coverage?lens=gaps`);
      await expect(page.locator('[data-coverage-map]')).toHaveAttribute('data-lens', 'gaps');
      const axe = () =>
        new AxeBuilder({ page }).withTags(['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa']).analyze();
      const summary = (r: Awaited<ReturnType<typeof axe>>) =>
        r.violations.map((v) => `${v.id}: ${v.help} (${v.nodes.length})`);

      expect(summary(await axe())).toEqual([]);

      await page.locator('.cw-cell').first().click();
      await expect(page.locator('#cw-drawer')).toBeVisible();
      expect(summary(await axe())).toEqual([]);
    });
  }
});

test.describe('frontier crosswalk: coverage map', () => {
  const colOf = (framework: string) =>
    frontierColumns.find((c) => c.frameworks.includes(framework))?.id as string;

  test('a map cell opens the drawer on its dimension with its column highlighted', async ({
    page,
  }) => {
    await page.setViewportSize({ width: 1440, height: 900 });
    await page.goto(PAGE);
    const dim = dimensions[0];
    const col = frontierColumns.find((c) => c.id === 'pf') as (typeof frontierColumns)[number];
    const cell = page.locator(`.cov-row[data-topic="${dim.id}"] .cov-cell[data-cw-col="${col.id}"]`);
    await cell.click();

    const drawer = page.locator('#cw-drawer');
    await expect(drawer).toBeVisible();
    await expect(page.locator('#cw-drawer-title')).toHaveText(dim.name);
    const active = drawer.locator('[data-drawer-body] [data-fw][data-active]');
    await expect(active.first()).toBeVisible();
    const fws = await active.evaluateAll((els) => els.map((el) => el.getAttribute('data-fw')));
    expect(new Set(fws)).toEqual(new Set(col.frameworks));

    await page.keyboard.press('Escape');
    await expect(drawer).toBeHidden();
    await expect(cell).toBeFocused();
  });

  test('a shared #coverage?lens=gaps link opens on the gaps lens, which marks exactly the documented gaps; switching lenses rewrites the fragment', async ({
    page,
  }) => {
    await page.setViewportSize({ width: 1440, height: 900 });
    await page.goto(`${PAGE}#coverage?lens=gaps`);
    const map = page.locator('[data-coverage-map]');
    await expect(map).toHaveAttribute('data-lens', 'gaps');
    await expect(page.getByRole('radio', { name: 'Gaps only' })).toBeChecked();

    const marked = await map
      .locator('.cov-cell[data-state="gap"]')
      .evaluateAll((els) =>
        els.map((a) => `${a.getAttribute('data-cw-open')}|${a.getAttribute('data-cw-col')}`),
      );
    expect(marked.sort()).toEqual(frontierGaps.map((g) => `${g.topic}|${colOf(g.framework)}`).sort());

    await page.getByRole('radio', { name: 'Labs vs standards' }).check();
    await expect(map).toHaveAttribute('data-lens', 'labs-vs-standards');
    expect(new URL(page.url()).hash).toBe('#coverage?lens=labs-vs-standards');

    await page.getByRole('radio', { name: 'All' }).check();
    expect(new URL(page.url()).hash).toBe('#coverage');
  });
});

test.describe('frontier crosswalk: without JavaScript', () => {
  test.use({ javaScriptEnabled: false });

  test('every matrix and coverage-map link lands on exactly one dimension section; the map lenses stay hidden', async ({
    page,
  }) => {
    await page.goto(PAGE);
    await expect(page.locator('[data-cov-lenses]')).toBeHidden();
    await expect(page.locator('.cov-cell')).toHaveCount(dimensions.length * frontierColumns.length);
    const hrefs = await page
      .locator('.cw-rowh, .cw-cell, .cov-label, .cov-cell')
      .evaluateAll((els) => els.map((a) => a.getAttribute('href')));
    expect(hrefs.length).toBeGreaterThan(0);
    for (const href of new Set(hrefs)) {
      expect(href).toMatch(/^#topic-/);
      await expect(page.locator(href as string)).toHaveCount(1);
    }
  });

});

test.describe('frontier crosswalk: exports', () => {
  test('JSON and CSV carry the notice and one record per reference', async ({ request }) => {
    const jsonRes = await request.get(`${PAGE}.json`);
    expect(jsonRes.status()).toBe(200);
    const json = JSON.parse(await jsonRes.text());
    expect(json.schemaVersion).toBe(1);
    expect(json.notice).toContain('not a claim of conformity');
    expect(json.references).toHaveLength(frontierRefs.length);

    const csvRes = await request.get(`${PAGE}.csv`);
    expect(csvRes.status()).toBe(200);
    const rows = parseCsv(await csvRes.text());
    expect(rows[0]).toHaveLength(1);
    expect(rows[0][0]).toContain('not a claim of conformity');
    const [header, ...data] = rows.slice(1);
    expect(header).toContain('Dimension ID');
    expect(data).toHaveLength(frontierRefs.length);
    for (const r of data) expect(r).toHaveLength(header.length);
  });
});
