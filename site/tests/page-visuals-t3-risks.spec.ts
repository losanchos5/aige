// page-visuals-t3-risks.spec.ts: the wave-3 visuals of /resources/threats and
// /resources/harms (OpenSpec page-visuals-2, "Recuentos coherentes") draw the
// counts of their data modules. Read from dist, like
// page-visuals-crosswalk.spec.ts; every expected value comes from the raw rows
// (src/data/threats.ts, src/data/harms.ts) or from the page's own filter
// chips, never from lib/page-visuals/risk-visuals.ts, and the flows are
// checked by invariants a reader can check against the page, not by
// recounting their links the way the generator does:
// - the threat flow: each column carries every threat once; a catalogue's
//   block reads the count its filter chip prints; the layer sets that hold a
//   layer add up to the threats of that layer; the "only a test you write"
//   route holds the rows whose every eval is custom, the number the caption
//   states;
// - the framework grids: each catalogue x id cell counts the rows naming the
//   id, and every id of the lookup table is either a column or listed under
//   "No row names" (so all 18 CSA AICM domains are accounted for);
// - the harms target: each harm in its level's ring and its first MIT code's
//   domain, in its control's layer, its mark linking to its card;
// - the harms flow: each mechanism sends as many ribbons' worth as the harms
//   that name it, and each layer receives the harms its controls catch;
// - every in-page link the four charts draw lands on an id of the page.
import { test, expect } from '@playwright/test';
import { existsSync, readFileSync } from 'node:fs';
import { join } from 'node:path';
import { threats, taxonomies, aicmDomains, iso42001Controls, type Threat } from '../src/data/threats';
import { harms, levelLabel, mechanismLabel, mitDomains } from '../src/data/harms';
import { layers } from '../src/data/stack';

function html(route: string): string {
  const base = join('dist', ...route.split('/').filter(Boolean));
  const file = [`${base}.html`, join(base, 'index.html')].find((f) => existsSync(f));
  if (!file) throw new Error(`no built page for ${route}`);
  return readFileSync(file, 'utf8');
}

const decode = (s: string) =>
  s
    .replace(/&amp;/g, '&')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&quot;/g, '"')
    .replace(/&#39;|&#x27;/g, "'");

/** The <figure> that holds the chart whose SVG ids start with `id`. */
function figure(page: string, id: string): string {
  const at = page.indexOf(`id="${id}-`);
  expect(at, `no chart ${id}`).toBeGreaterThan(-1);
  const start = page.lastIndexOf('<figure', at);
  return page.slice(start, page.indexOf('</figure>', at));
}

/** The figure's data table: header cells and body rows, as text. */
function tableOf(fig: string): { head: string[]; rows: string[][] } {
  const cells = (row: string) => [...row.matchAll(/<t[hd][^>]*>([^<]*)<\/t[hd]>/g)].map((c) => decode(c[1]));
  const head = cells(fig.slice(fig.indexOf('<thead'), fig.indexOf('</thead>')));
  const body = fig.slice(fig.indexOf('<tbody'), fig.indexOf('</tbody>'));
  return { head, rows: [...body.matchAll(/<tr[^>]*>([\s\S]*?)<\/tr>/g)].map((m) => cells(m[1])) };
}

const layerName = (n: number) => `L${n} ${layers.find((l) => l.n === n)!.name}`;
const byLink = (a: string[], b: string[]) => (a[0] + a[1]).localeCompare(b[0] + b[1]);

/** Sum of the table's link values, grouped by the column `at` (0 From, 1 To). */
function sums(rows: string[][], at: 0 | 1): Map<string, number> {
  const out = new Map<string, number>();
  for (const row of rows) out.set(row[at], (out.get(row[at]) ?? 0) + Number(row[2]));
  return out;
}

test.describe('/resources/threats charts', () => {
  test('the flow counts each threat once: blocks match the filter chips, the layers and the caption', () => {
    const page = html('/resources/threats');
    const fig = figure(page, 'tb-flow-w');
    const { head, rows } = tableOf(fig);
    expect(head).toEqual(['From', 'To', 'Threats']);
    const catalogueNames = new Set(taxonomies.map((t) => t.short));
    const stage1 = rows.filter((r) => catalogueNames.has(r[0]));
    const stage2 = rows.filter((r) => !catalogueNames.has(r[0]));
    // Every column carries every threat once.
    for (const stage of [stage1, stage2]) expect(stage.reduce((n, r) => n + Number(r[2]), 0)).toBe(threats.length);
    // A catalogue's ribbons and its block read what its filter chip prints.
    const out = sums(stage1, 0);
    for (const t of taxonomies) {
      const chip = new RegExp(String.raw`for="tb-t-${t.id}"[^>]*>[^<]*<span class="tb-count"[^>]*>\((\d+)\)`).exec(page)?.[1];
      expect(chip, `chip of ${t.short}`).toBe(String(threats.filter((r) => r.taxonomy === t.id).length));
      expect(out.get(t.short), t.short).toBe(Number(chip));
      expect(decode(fig), `${t.short} block`).toContain(`${t.short}: ${chip} threats`);
    }
    // The layer sets that hold a layer add up to the threats of that layer; a
    // set is named by its layers' short names ("L2 Inventory + L3 Evals").
    const into = sums(stage1, 1);
    const layerShort = (n: number) => `L${n} ${layers.find((l) => l.n === n)!.name.split(' & ')[0]}`;
    for (const n of [1, 2, 3, 4, 5]) {
      const drawn = [...into].filter(([set]) => set.split(' + ').includes(layerShort(n))).reduce((sum, [, v]) => sum + v, 0);
      expect(drawn, `L${n}`).toBe(threats.filter((r) => r.layers.includes(n as Threat['layers'][number])).length);
    }
    // The own-test route holds the rows whose every eval is custom, and the
    // caption states that number.
    const ownOnly = threats.filter((r) => r.evals.every((e) => e.tool === 'custom')).length;
    const routes = sums(stage2, 1);
    expect(routes.get('Only a test you write')).toBe(ownOnly);
    expect(decode(fig)).toContain(`${ownOnly} of the ${threats.length} threats rely only on a test you write`);
  });

  for (const fw of [
    { key: 'aicm', ids: Object.keys(aicmDomains), named: (t: Threat) => t.aicm as readonly string[] },
    { key: 'iso', ids: Object.keys(iso42001Controls), named: (t: Threat) => t.iso42001 },
  ]) {
    test(`the ${fw.key} grid counts, per catalogue, the rows naming each id, and lists every id it leaves out`, () => {
      const page = html('/resources/threats');
      const drawn = fw.ids.filter((id) => threats.some((t) => fw.named(t).includes(id)));
      const { head, rows } = tableOf(figure(page, `tb-grid-${fw.key}`));
      expect(head).toEqual(['Catalogue', ...drawn]);
      expect(rows).toEqual(
        taxonomies.map((tax) => [tax.short, ...drawn.map((id) => String(threats.filter((t) => t.taxonomy === tax.id && fw.named(t).includes(id)).length))]),
      );
      // The ids no row names are listed under the grid, so every id of the
      // lookup table (all 18 AICM domains) appears once, drawn or listed.
      const from = page.indexOf(`data-fw="${fw.key}"`);
      const next = page.indexOf('data-fw="', from + 1);
      const panel = page.slice(from, next > -1 ? next : page.indexOf('</section>', from));
      const note = /No row names:([\s\S]*?)<\/p>/.exec(panel)?.[1] ?? '';
      const listed = [...note.matchAll(/<code[^>]*>([^<]+)<\/code>/g)].map((m) => decode(m[1]));
      expect(listed).toEqual(fw.ids.filter((id) => !drawn.includes(id)));
    });
  }
});

test.describe('/resources/harms charts', () => {
  const domainOf = (h: (typeof harms)[number]) => mitDomains[h.mitTaxonomy[0].split('.')[0]];

  test('the target puts each harm in its level ring, its first MIT domain and its layer, linking to its card', () => {
    const page = html('/resources/harms');
    const fig = figure(page, 'hm-target-n');
    const { rows } = tableOf(fig);
    const expected = harms.map((h) => [h.harmType, levelLabel[h.level], domainOf(h), `Layer 0${h.layerN[0]}`]);
    expect([...rows].sort(byLink)).toEqual([...expected].sort(byLink));
    const wide = fig.slice(fig.indexOf('id="hm-target-w-t"'));
    const marks = new Map([...wide.matchAll(/<a href="#harm-([^"]+)"><title>([^<]*)<\/title>/g)].map((m) => [m[1], decode(m[2])]));
    expect(new Map(harms.map((h) => [h.id, `${h.harmType} · ${levelLabel[h.level]} · ${domainOf(h)}`]))).toEqual(marks);
  });

  test('each mechanism sends as many harms as name it, and each layer receives the harms it catches', () => {
    const { head, rows } = tableOf(figure(html('/resources/harms'), 'hm-flow-w'));
    expect(head).toEqual(['From', 'To', 'Pairs']);
    const mechanisms = new Map(Object.entries(mechanismLabel).map(([id, label]) => [label, id]));
    const out = sums(rows.filter((r) => mechanisms.has(r[0])), 0);
    for (const [label, id] of mechanisms) {
      const n = harms.filter((h) => h.mechanism.includes(id as (typeof h.mechanism)[number])).length;
      expect(out.get(label) ?? 0, label).toBe(n);
    }
    const into = sums(rows.filter((r) => !mechanisms.has(r[0])), 1);
    for (const n of [1, 2, 3, 4, 5]) {
      expect(into.get(layerName(n)) ?? 0, `L${n}`).toBe(harms.filter((h) => h.layerN.includes(n as (typeof h.layerN)[number])).length);
    }
  });
});

test('every in-page link the charts draw lands on an id of its page', () => {
  for (const [route, ids] of [
    ['/resources/threats', ['tb-flow-w', 'tb-flow-n', 'tb-grid-aicm', 'tb-grid-iso']],
    ['/resources/harms', ['hm-target-w', 'hm-target-n', 'hm-flow-w', 'hm-flow-n']],
  ] as const) {
    const page = html(route);
    const hrefs = new Set(ids.flatMap((id) => [...figure(page, id).matchAll(/<svg[\s\S]*?<\/svg>/g)].flatMap((svg) => [...svg[0].matchAll(/href="#([^"]+)"/g)].map((m) => m[1]))));
    expect(hrefs.size, route).toBeGreaterThan(0);
    for (const id of hrefs) expect(page, `${route}#${id}`).toContain(`id="${id}"`);
  }
});
