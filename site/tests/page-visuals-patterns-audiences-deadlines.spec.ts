// page-visuals-patterns-audiences-deadlines.spec.ts: data parity of the
// wave-2 visuals of block patterns-audiences-deadlines (OpenSpec change
// page-visuals): the regulatory clock on every /patterns/<slug> and
// /for/<slug> page, the pattern neighbourhood on every pattern page, and the
// AI Act axis on both deadlines pages. Each test checks what the chart draws
// (its table, its marks, its links, its as-of date) against the data modules
// it comes from, so a dropped row or step, a mark drawn in the wrong state, a
// wrong as-of date or a stale link fails here. Owned elsewhere: the chart
// kit's contract (chart-primitives.spec), the per-SVG byte budget and unique
// ids (Chart.astro fails the build), axe in both themes (a11y.spec).
import { test, expect, type Page } from '@playwright/test';

import { appliesStatusLabels, obligationPath, obligations, registerAsOf, type Obligation } from '../src/data/frameworks';
import { patterns } from '../src/data/patterns';
import { audiences } from '../src/data/audiences';
import { controlHref, controls } from '../src/data/controls';
import { cases } from '../src/data/cases';
import { AI_ACT_TIMELINE_AS_OF, aiActMilestones, nextMilestones } from '../src/data/ai-act-timeline';

/** The rows of a chart's table alternative, as text. */
async function tableRows(page: Page, figure: string): Promise<string[][]> {
  return page
    .locator(`${figure} table.chart-table tbody tr`)
    .evaluateAll((trs) => trs.map((tr) => [...tr.children].map((cell) => (cell.textContent ?? '').trim())));
}

const firstDate = (r: Obligation) => r.appliesFrom ?? [...(r.milestones ?? [])].map((m) => m.date).sort()[0];

/**
 * The clock of `rows` on the page at `path`: one table row per first date
 * and per later step with the register's date, step and status (undated rows
 * as "No date"); every chip linked to its row and drawn in the mark the
 * legend gives its status; later steps solid only once their date is on or
 * before the as-of date (the square's meaning on /obligations too); the as-of
 * date is the newest review date of the rows; the two counts split the dated
 * rows at that date.
 */
async function checkClock(page: Page, path: string, rows: readonly Obligation[]) {
  const FIG = '.chart-fig:has(svg.ch-clock)';
  await page.goto(path);
  const dated = rows.filter((r) => firstDate(r));
  if (!dated.length) {
    await expect(page.locator(FIG)).toHaveCount(0);
    return;
  }
  await expect(page.locator(FIG)).toHaveCount(1);

  const expected = [
    ...rows.flatMap((r) => [
      ...(r.appliesFrom ? [[r.appliesFrom, 'Applies from', appliesStatusLabels[r.appliesStatus]]] : []),
      ...(r.milestones ?? []).map((m) => [m.date, `Later step: ${m.note}`, appliesStatusLabels[r.appliesStatus]]),
    ]),
    ...rows.filter((r) => !firstDate(r)).map((r) => ['No date', '', appliesStatusLabels[r.appliesStatus]]),
  ];
  const drawn = (await tableRows(page, FIG)).map((row) => [row[0], row[2], row[3]]);
  const key = (t: string[]) => t.join(' | ');
  expect(drawn.map(key).sort(), path).toEqual(expected.map(key).sort());

  const asOf = registerAsOf(rows);
  const now = dated.filter((r) => firstDate(r)! <= asOf).length;
  const byHref = new Map(rows.map((r) => [obligationPath(r), r]));
  for (const variant of ['.chart-w', '.chart-n']) {
    const svg = page.locator(`${FIG} ${variant} svg`);
    const texts = await svg.locator('text').allTextContents();
    expect(texts, `${path} ${variant}: as-of date`).toContain(`As of ${asOf}`);
    const counts = texts.join(' ');
    if (now) expect(counts, `${path} ${variant}`).toContain(`${now} ${now === 1 ? 'already applies' : 'already apply'}`);
    if (dated.length - now) expect(counts, `${path} ${variant}`).toContain(`${dated.length - now} still to come`);

    // The legend: each entry's label and the look (element and class) of its swatch.
    const legend = await svg.evaluate((el) => {
      const out: Record<string, string> = {};
      const labels = [...el.querySelectorAll(':scope > text')];
      for (const t of labels) {
        const prev = t.previousElementSibling;
        if (prev && prev.matches('[class~="mk"]')) out[t.textContent ?? ''] = `${prev.tagName} ${(prev.getAttribute('class') ?? '').replace(/-\d$/, '')}`;
      }
      return out;
    });
    const chips = await svg.locator('a').evaluateAll((as) =>
      as.map((a) => {
        const mark = a.querySelector('[class~="mk"]');
        return { href: a.getAttribute('href') ?? '', cls: mark ? `${mark.tagName} ${(mark.getAttribute('class') ?? '').replace(/-\d$/, '')}` : '' };
      }),
    );
    expect(chips.length, `${path} ${variant}: chips`).toBeGreaterThan(0);
    for (const chip of chips) {
      const row = byHref.get(chip.href);
      expect(row, `${path} ${variant}: chip ${chip.href} links a row of the clock`).toBeTruthy();
      expect(chip.cls, `${path} ${variant}: ${row!.id} drawn as its status`).toBe(legend[appliesStatusLabels[row!.appliesStatus]]);
    }
    // No two statuses share a swatch.
    const statusLooks = Object.values(appliesStatusLabels).filter((l) => legend[l]).map((l) => legend[l]);
    expect(new Set(statusLooks).size, `${path} ${variant}: distinct status marks`).toBe(statusLooks.length);

    // Later steps: solid once reached, outlined while ahead. Squares are the
    // steps' marks (and the two step swatches of the legend); a station of
    // more than six chips hides some behind "+N more".
    const steps = rows.flatMap((r) => r.milestones ?? []);
    const reached = steps.filter((m) => m.date <= asOf).length;
    const ahead = steps.length - reached;
    const squares = await svg.evaluate((el) => {
      const all = [...el.querySelectorAll('rect[class~="mk"]')].map((r) => r.getAttribute('class') ?? '');
      return { fill: all.filter((c) => c.includes('mk-fill-')).length, line: all.filter((c) => c.includes('mk-line-')).length };
    });
    const events = rows.flatMap((r) => [...(r.appliesFrom ? [r.appliesFrom] : []), ...(r.milestones ?? []).map((m) => m.date)]);
    const station = (d: string) => (d < '2024-01-01' ? 'before' : d);
    const crowded = [...new Set(events.map(station))].some((st) => events.filter((d) => station(d) === st).length > 6);
    const drawnReached = squares.fill - (reached ? 1 : 0);
    const drawnAhead = squares.line - (ahead ? 1 : 0);
    if (crowded) {
      expect(drawnReached, `${path} ${variant}: reached steps`).toBeLessThanOrEqual(reached);
      expect(drawnAhead, `${path} ${variant}: steps ahead`).toBeLessThanOrEqual(ahead);
    } else {
      expect(drawnReached, `${path} ${variant}: reached steps`).toBe(reached);
      expect(drawnAhead, `${path} ${variant}: steps ahead`).toBe(ahead);
    }
  }
}

test.describe('regulatory clock on pattern pages', () => {
  for (const p of patterns) {
    test(`/patterns/${p.slug}: the obligations it evidences, on their dates`, async ({ page }) => {
      await checkClock(page, `/patterns/${p.slug}`, obligations.filter((r) => r.patterns?.includes(p.id)));
    });
  }

  test('dates before 2024 share one station and keep the axis on the AI Act window', async ({ page }) => {
    // The pattern whose evidenced rows reach furthest back.
    const oldest = patterns
      .map((p) => ({ p, first: obligations.filter((r) => r.patterns?.includes(p.id) && r.appliesFrom).map((r) => r.appliesFrom!).sort()[0] }))
      .filter((x) => x.first && x.first < '2024-01-01')
      .sort((a, b) => (a.first < b.first ? -1 : 1))[0];
    test.skip(!oldest, 'no pattern evidences a row applying before 2024');
    await page.goto(`/patterns/${oldest.p.slug}`);
    const svg = page.locator('.chart-fig:has(svg.ch-clock) .chart-w svg');
    const texts = await svg.locator('text').allTextContents();
    expect(texts).toContain('Before 2024');
    const ticks = (await svg.locator('text.num.muted').allTextContents()).map(Number);
    expect(ticks.length).toBeGreaterThan(1);
    expect(Math.min(...ticks)).toBeGreaterThanOrEqual(2024);
    // The table still gives the real date.
    expect((await tableRows(page, '.chart-fig:has(svg.ch-clock)')).map((r) => r[0])).toContain(oldest.first);
  });
});

test.describe('regulatory clock on audience pages', () => {
  for (const a of audiences) {
    test(`/for/${a.slug}: the route's obligations, on their dates`, async ({ page }) => {
      await checkClock(page, `/for/${a.slug}`, a.obligations.map((id) => obligations.find((r) => r.id === id)!));
    });
  }
});

test.describe('pattern neighbourhood', () => {
  const REL = { core: 'Names this pattern', related: 'Related pattern' };
  for (const p of patterns) {
    test(`/patterns/${p.slug}: related patterns, obligations, controls and cases`, async ({ page }) => {
      await page.goto(`/patterns/${p.slug}`);
      // The related patterns the page's own prose links under "Related
      // patterns" (the list the figure summarises), read from the page.
      const linked = await page.evaluate(() => {
        const head = [...document.querySelectorAll('h2')].find((h) => (h.textContent ?? '').trim() === 'Related patterns');
        const hrefs: string[] = [];
        for (let el = head?.nextElementSibling; el && el.tagName !== 'H2'; el = el.nextElementSibling) {
          if (!el.matches('p, ul, ol')) continue;
          for (const a of el.querySelectorAll('a[href^="/patterns/"]')) hrefs.push(a.getAttribute('href') ?? '');
        }
        return hrefs;
      });
      const related = [...new Set(linked.map((href) => href.replace(/^\/patterns\//, '').replace(/[/#].*$/, '')))]
        .map((slug) => patterns.find((q) => q.slug === slug)!)
        .filter((q) => q && q.slug !== p.slug);
      const evid = obligations.filter((r) => r.patterns?.includes(p.id));
      const ctl = controls.filter((c) => c.patterns.includes(p.slug));
      const cs = cases.filter((c) => c.control.controls.some((x) => x.patternId === p.id));
      const total = related.length + evid.length + ctl.length + cs.length;
      const FIG = '.pp-hood .chart-fig';
      if (total < 3) {
        await expect(page.locator(FIG)).toHaveCount(0);
        return;
      }
      const rows = await tableRows(page, FIG);
      const family = (label: string) => rows.filter((r) => r[0] === label);
      expect(family('Related patterns').map((r) => [r[1], r[2]]).sort()).toEqual(related.map((q) => [q.title, REL.related]).sort());
      expect(family('Obligations').map((r) => r[2])).toEqual(evid.map(() => REL.core));
      expect(family('Controls').map((r) => r[1]).sort()).toEqual(ctl.map((c) => `${c.id} ${c.title}`).sort());
      expect(family('Cases').map((r) => r[1]).sort()).toEqual(cs.map((c) => c.title).sort());
      expect(rows).toHaveLength(total);
      // Related-pattern nodes take their pattern's layer colour, outlined.
      const nodes = await page.locator(`${FIG} .chart-w svg a`).evaluateAll((as) =>
        as.map((a) => ({ href: a.getAttribute('href') ?? '', cls: a.querySelector('circle')?.getAttribute('class') ?? '' })),
      );
      for (const q of related) {
        const node = nodes.find((n) => n.href === `/patterns/${q.slug}`);
        if (node) expect(node.cls, q.slug).toBe(`mk mk-line-${q.layer}`);
      }
      // Every other node links a page of its own family.
      const known = new Set([
        ...related.map((q) => `/patterns/${q.slug}`),
        ...evid.map(obligationPath),
        ...ctl.map((c) => controlHref(c.id)),
        ...cs.map((c) => `/cases/${c.id}`),
      ]);
      for (const n of nodes) expect(known.has(n.href), n.href).toBe(true);
    });
  }
});

for (const { path, lang } of [
  { path: '/resources/ai-act-deadlines', lang: 'en' },
  { path: '/es/resources/ai-act-deadlines', lang: 'es' },
] as const) {
  test.describe(`${path}: the AI Act on one axis`, () => {
    const FIG = '.chart-fig:has(svg.ch-miles)';

    test('every milestone at its date, its status as in the list, linked to its entry', async ({ page }) => {
      await page.goto(path);
      const rows = await tableRows(page, FIG);
      expect(rows.map((r) => [r[0], r[1]])).toEqual(aiActMilestones.map((m) => [m.date, m.title[lang]]));
      // The status word equals the badge of the same milestone in the list.
      for (const [i, m] of aiActMilestones.entries()) {
        const badge = (await page.locator(`#m-${m.id} .aad-badge`).textContent())?.trim();
        expect(rows[i][2], m.id).toBe(badge);
      }
      for (const variant of ['.chart-w', '.chart-n']) {
        const svg = page.locator(`${FIG} ${variant} svg`);
        // Links: one per milestone, to its anchor, which exists.
        const hrefs = await svg.locator('a').evaluateAll((as) => as.map((a) => a.getAttribute('href')));
        expect(hrefs.sort(), variant).toEqual(aiActMilestones.map((m) => `#m-${m.id}`).sort());
        // Marks: solid once applied, outlined while upcoming.
        const marks = await svg.evaluate((el) =>
          [...el.querySelectorAll(':scope > circle, :scope > rect.mk, :scope > rect[class*="mk-"]')]
            .filter((m) => m.querySelector('title'))
            .map((m) => ({ title: m.querySelector('title')!.textContent ?? '', cls: m.getAttribute('class') ?? '' })),
        );
        for (const m of aiActMilestones) {
          const mark = marks.find((k) => k.title.startsWith(`${m.date} · `));
          expect(mark, `${variant} ${m.id}: a mark`).toBeTruthy();
          expect(mark!.cls, `${variant} ${m.id}`).toBe(m.status === 'applied' ? 'mk mk-fill-0' : 'mk mk-line-0');
        }
        // The as-of date is the dataset's; the next milestone is the one in bold.
        const texts = await svg.locator('text').allTextContents();
        expect(texts, variant).toContain(`${lang === 'es' ? 'A fecha de' : 'As of'} ${AI_ACT_TIMELINE_AS_OF}`);
        const next = nextMilestones(AI_ACT_TIMELINE_AS_OF, 1)[0];
        const bold = await svg.locator('text[font-weight="700"]').allTextContents();
        expect(bold.length, variant).toBe(next ? 1 : 0);
        if (next) {
          const boldHref = await svg.locator('a:has(text[font-weight="700"])').getAttribute('href');
          expect(boldHref, variant).toBe(`#m-${next.id}`);
        }
      }
      if (lang === 'es') await expect(page.locator(`${FIG} .chart-w svg`)).toHaveAttribute('lang', 'es');
    });
  });
}

test('the Spanish axis prints no English word', async ({ page }) => {
  await page.goto('/es/resources/ai-act-deadlines');
  const fig = page.locator('.chart-fig:has(svg.ch-miles)');
  const words = (
    await fig.evaluate((el) =>
      [...el.querySelectorAll('svg text, svg title, table caption, th, td, summary, figcaption')].map((n) => n.textContent ?? '').join(' '),
    )
  ).split(/[^A-Za-z]+/);
  const english = ['Source', 'As', 'Today', 'Applies', 'Upcoming', 'Date', 'Milestone', 'Status', 'Basis', 'Set', 'moved', 'Data', 'table', 'Entry', 'force'];
  expect(words.filter((w) => english.includes(w))).toEqual([]);
});

test('forced colours redraw the clock and the axis in system colours, keeping solid apart from outlined', async ({ page }) => {
  await page.emulateMedia({ forcedColors: 'active' });
  const colours = async (svg: string) =>
    page.locator(svg).evaluate((el) => {
      const system = (name: string) => {
        const probe = document.createElement('span');
        probe.style.color = name;
        document.body.append(probe);
        const value = getComputedStyle(probe).color;
        probe.remove();
        return value;
      };
      const fill = (sel: string) => {
        const m = el.querySelector(sel);
        return m ? getComputedStyle(m).fill : null;
      };
      return {
        canvasText: system('CanvasText'),
        canvas: system('Canvas'),
        filled: fill('[class~="mk-fill-0"]'),
        outline: fill('[class~="mk-line-0"]'),
        text: fill(':scope > text'),
      };
    });
  for (const [path, svg] of [
    ['/for/engineers', '.chart-fig:has(svg.ch-clock) .chart-w svg'],
    ['/resources/ai-act-deadlines', '.chart-fig:has(svg.ch-miles) .chart-w svg'],
  ]) {
    await page.goto(path);
    const c = await colours(svg);
    expect(c.canvasText, path).not.toBe(c.canvas);
    expect(c.filled, `${path}: solid mark`).toBe(c.canvasText);
    expect(c.outline, `${path}: outlined mark`).toBe(c.canvas);
    expect(c.text, `${path}: text`).toBe(c.canvasText);
  }
});
