// page-visuals-cases-glossary.spec.ts: data parity of the wave-2 per-item
// visuals of block cases-glossary (OpenSpec change page-visuals): the incident
// bow-tie on every /cases/<id> page, and the footprint and neighbourhood on
// /glossary/<slug>. Each test derives what the chart must draw from the data
// modules (cases.ts, harms.ts, patterns.ts, chapters.ts and the glossary
// index), never from the builders, so a stage wired to the wrong list, a
// dropped item, a wrong layer or state, or a lost link fails here. The
// breakout tests guard the one layout contract these pages add: the wide
// variants show at 1:1 on a desktop without a sideways page scroll.
// Owned elsewhere: the primitives' contract (chart-primitives.spec), phone
// overflow on /cases/clearview-ai and /glossary/serious-incident
// (layout.spec), axe in both themes (a11y.spec).
import { test, expect, type Page } from '@playwright/test';

import { cases, type IncidentCase } from '../src/data/cases';
import { harms, levelLabel, type ControlRef } from '../src/data/harms';
import { patterns, patternPath } from '../src/data/patterns';
import { chaptersOrdered } from '../src/data/chapters';
import { getGlossary, relatedTerms, termUsage, type GlossaryEntry } from '../src/lib/glossary';
import { patternsUsingTerm } from '../src/lib/cross-links';

/** The rows of a chart's table alternative, as text. */
async function tableRows(page: Page, figure: string): Promise<string[][]> {
  return page
    .locator(`${figure} table.chart-table tbody tr`)
    .evaluateAll((trs) => trs.map((tr) => [...tr.children].map((cell) => (cell.textContent ?? '').trim())));
}

/** The tone of every mark of `state` ('fill', 'line'...) in an SVG, in document order. */
async function toneOf(page: Page, svg: string, state: string, within = ''): Promise<number[]> {
  return page
    .locator(`${svg} ${within}[class~="mk"]`)
    .evaluateAll(
      (els, s) =>
        els.flatMap((el) => {
          const m = new RegExp(`\\bmk-${s}-(\\d)\\b`).exec(el.getAttribute('class') ?? '');
          return m ? [Number(m[1])] : [];
        }),
      state,
    );
}

const patternOf = (ref: ControlRef) => patterns.find((p) => p.id === ref.patternId);

// ---- /cases/<id>: the incident bow-tie ------------------------------------------

test.describe('/cases/<id>: the incident bow-tie', () => {
  const FIG = '.cs-bowtie .chart-fig';

  /** Step | Item per stage, from the case record: its controls by moment when
   *  it has an incident note, else the patterns that would have caught it. */
  function expectedStages(c: IncidentCase): string[][] {
    const byMoment = [c.preventiveControls, c.detectiveControls, c.responsiveControls].some((m) => m !== undefined);
    const controls = (step: string, refs: readonly ControlRef[] = []) => refs.map((r) => [step, r.name]);
    return [
      ...(byMoment ? controls('Preventive', c.preventiveControls) : controls('Would have caught it', c.control.controls)),
      ['Incident', c.short],
      ...(byMoment ? [...controls('Detective', c.detectiveControls), ...controls('Responsive', c.responsiveControls)] : []),
      ...c.harms.map((id) => ['Harms', harms.find((h) => h.id === id)!.harmType]),
      ...c.evidenceArtefacts.map((a) => ['Evidence', a.artefact]),
    ];
  }

  test('every case draws its controls, the incident, its harms and its evidence, linked and layered from its record', async ({ page }) => {
    await page.setViewportSize({ width: 1440, height: 900 });
    for (const c of cases) {
      await page.goto(`/cases/${c.id}`);
      const rows = await tableRows(page, FIG);
      expect(rows.map((r) => [r[0], r[1]]), c.id).toEqual(expectedStages(c));

      // Details: a control names its pattern's layer, a harm its level, an
      // artefact the layer that produces it.
      for (const row of rows) {
        const refs = [...(c.preventiveControls ?? []), ...(c.detectiveControls ?? []), ...(c.responsiveControls ?? []), ...c.control.controls];
        const ref = refs.find((r) => r.name === row[1]);
        const harm = harms.find((h) => h.harmType === row[1] && c.harms.includes(h.id));
        const artefact = c.evidenceArtefacts.find((a) => a.artefact === row[1]);
        if (row[0] === 'Evidence') expect(row[2], `${c.id} ${row[1]}`).toBe(`Layer 0${artefact!.layerN}`);
        else if (row[0] === 'Harms') expect(row[2], `${c.id} ${row[1]}`).toBe(levelLabel[harm!.level]);
        else if (ref) expect(row[2], `${c.id} ${row[1]}`).toBe(patternOf(ref) ? `Layer 0${patternOf(ref)!.layer}` : '');
      }

      // The visible row links each catalogued control to its pattern page and
      // each harm to its card, and nothing else.
      const svg = `${FIG} .chart-w svg`;
      await expect(page.locator(svg), c.id).toBeVisible();
      const hrefs = await page.locator(`${svg} a`).evaluateAll((as) => as.map((a) => a.getAttribute('href')));
      const drawn = (refs: readonly ControlRef[] | undefined) => refs ?? [];
      const byMoment = [c.preventiveControls, c.detectiveControls, c.responsiveControls].some((m) => m !== undefined);
      const controlRefs = byMoment ? [...drawn(c.preventiveControls), ...drawn(c.detectiveControls), ...drawn(c.responsiveControls)] : c.control.controls;
      const expected = [
        ...controlRefs.flatMap((r) => (patternOf(r) ? [patternPath(patternOf(r)!)] : [])),
        ...c.harms.map((id) => `/resources/harms#harm-${id}`),
      ];
      expect([...hrefs].sort(), c.id).toEqual([...expected].sort());

      // The evidence is the terminal panel: one layer chip per artefact, in
      // the artefact's layer colour, in record order.
      expect(await toneOf(page, svg, 'fill'), c.id).toEqual(c.evidenceArtefacts.map((a) => a.layerN));
    }
  });
});

// ---- /glossary/<slug>: footprint and neighbourhood ------------------------------

const glossary = getGlossary();
/** The chapters the usage index reads: every chapter but the glossary. */
const slots = chaptersOrdered.filter((c) => c.slug !== 'glossary').map((c) => ({ n: String(c.order).padStart(2, '0'), title: c.shortTitle }));
const used = glossary.filter((e) => termUsage(e.slug).length > 0);
const widest = used.reduce((a, b) => (termUsage(b.slug).length > termUsage(a.slug).length ? b : a));
const single = used.find((e) => termUsage(e.slug).length === 1)!;
const unused = glossary.find((e) => termUsage(e.slug).length === 0)!;
const bySlug = new Map(glossary.map((e) => [e.slug, e]));

test.describe('/glossary/<slug>: mentions per chapter', () => {
  const FIG = '.chart-fig.gt-footprint';

  for (const entry of [widest, single, bySlug.get('serious-incident')!]) {
    test(`${entry.slug}: one slot per chapter, bar height = mentions, cross-referenced chapters solid, each bar links its section`, async ({ page }) => {
      await page.setViewportSize({ width: 1440, height: 900 });
      await page.goto(entry.url);
      const usage = termUsage(entry.slug);
      const count = (n: string) => usage.find((u) => u.chapter === n)?.count ?? 0;
      const rows = await tableRows(page, FIG);
      expect(rows).toEqual(slots.map((s) => [`${s.n} ${s.title}`, String(count(s.n)), entry.chapterRefs.includes(s.n) ? 'Yes' : 'No']));

      // The visible bars: one link per chapter that names the term, in reading
      // order, to the first section that does; solid when cross-referenced.
      const bars = await page.locator(`${FIG} .chart-w svg a`).evaluateAll((as) =>
        as.map((a) => {
          const rect = a.querySelector('rect')!;
          return { href: a.getAttribute('href'), cls: rect.getAttribute('class') ?? '', h: Number(rect.getAttribute('height')) };
        }),
      );
      expect(bars.map((b) => b.href)).toEqual(usage.map((u) => u.href));
      usage.forEach((u, i) => {
        expect(bars[i].cls, u.chapter).toContain(entry.chapterRefs.includes(u.chapter) ? 'mk-fill-0' : 'mk-line-0');
      });
      // Zero base, linear: every bar is its count over the tallest one's (a
      // bar is never drawn under 2 units, so a one-mention bar stays visible).
      const max = Math.max(...usage.map((u) => u.count));
      const tallest = Math.max(...bars.map((b) => b.h));
      usage.forEach((u, i) => {
        expect(bars[i].h, u.chapter).toBeCloseTo(Math.max(2, (u.count / max) * tallest), 0);
      });
    });
  }

  test('a term no chapter names draws no footprint and keeps its sentence', async ({ page }) => {
    await page.goto(unused.url);
    await expect(page.locator(FIG)).toHaveCount(0);
    await expect(page.locator('#where-used').locator('xpath=..')).toContainText('not used under this name');
  });
});

test.describe('/glossary/<slug>: the term neighbourhood', () => {
  const FIG = '.gt-neighbourhood .chart-fig';
  const TOP_PATTERNS = 6;
  const relatedOf = (e: GlossaryEntry) => relatedTerms(e.slug).filter((r) => !e.contrast.includes(r.slug));
  const relations = (e: GlossaryEntry) => relatedOf(e).length + e.contrast.length + Math.min(TOP_PATTERNS, patternsUsingTerm(e.slug).length);
  const richest = glossary.reduce((a, b) => (relations(b) > relations(a) ? b : a));
  const withContrast = glossary.find((e) => e.contrast.length > 0 && relations(e) >= 3)!;
  const sparse = glossary.find((e) => relations(e) > 0 && relations(e) < 3)!;

  for (const entry of [richest, withContrast]) {
    test(`${entry.slug}: related terms solid, contrast terms dashed, top patterns in their layer, every node a link`, async ({ page }) => {
      await page.setViewportSize({ width: 1440, height: 900 });
      await page.goto(entry.url);
      const uses = patternsUsingTerm(entry.slug);
      const top = uses.slice(0, TOP_PATTERNS);
      const patternFamily = uses.length > TOP_PATTERNS ? 'Patterns using it most' : 'Patterns using it';
      const contrast = entry.contrast.map((s) => bySlug.get(s)!);
      // Every relation once (the kit orders the nodes inside a family).
      const rows = await tableRows(page, FIG);
      const key = (r: string[]) => r.join(' | ');
      expect(rows.map(key).sort()).toEqual(
        [
          ...relatedOf(entry).map((r) => ['Related terms', r.term, 'Related']),
          ...contrast.map((r) => ['Contrast with', r.term, 'Contrast']),
          ...top.map((u) => [patternFamily, `${u.pattern.title}, ${u.count} ${u.count === 1 ? 'mention' : 'mentions'}`, 'Uses the term']),
        ]
          .map(key)
          .sort(),
      );

      const svg = `${FIG} .chart-w svg`;
      const hrefs = await page.locator(`${svg} a`).evaluateAll((as) => as.map((a) => a.getAttribute('href')));
      expect([...hrefs].sort()).toEqual([...relatedOf(entry).map((r) => r.url), ...contrast.map((r) => r.url), ...top.map((u) => patternPath(u.pattern))].sort());
      // Contrast is the only outlined (dashed-edge) relation; related terms
      // are ink, patterns carry their own layer.
      expect(await toneOf(page, svg, 'line', 'a ')).toEqual(contrast.map(() => 0));
      expect((await toneOf(page, svg, 'fill', 'a ')).sort()).toEqual(
        [...relatedOf(entry).map(() => 0), ...top.map((u) => u.pattern.layer)].sort(),
      );
    });
  }

  test('a term with fewer than three relations draws no neighbourhood and keeps its list', async ({ page }) => {
    await page.goto(sparse.url);
    await expect(page.locator(FIG)).toHaveCount(0);
    await expect(page.locator('.gt-related > li')).toHaveCount(relatedOf(sparse).length);
  });
});

// ---- the breakout: wide variants at 1:1 on a desktop ----------------------------

for (const { path, fig } of [
  { path: `/cases/${cases.reduce((a, b) => (b.evidenceArtefacts.length > a.evidenceArtefacts.length ? b : a)).id}`, fig: '.cs-bowtie .chart-fig' },
  { path: '/glossary/serious-incident', fig: '.gt-neighbourhood .chart-fig' },
]) {
  test(`${path}: the wide variant leaves the reading column at 1:1 without a sideways page scroll`, async ({ page }) => {
    await page.setViewportSize({ width: 1440, height: 900 });
    await page.goto(path);
    const svg = page.locator(`${fig} .chart-w svg`);
    await expect(svg).toBeVisible();
    const { drawn, units, scroll, client } = await svg.evaluate((el) => ({
      drawn: el.getBoundingClientRect().width,
      units: Number(el.getAttribute('viewBox')!.split(' ')[2]),
      scroll: document.documentElement.scrollWidth,
      client: document.documentElement.clientWidth,
    }));
    expect(drawn).toBeCloseTo(units, 0);
    expect(scroll).toBe(client);
  });
}
