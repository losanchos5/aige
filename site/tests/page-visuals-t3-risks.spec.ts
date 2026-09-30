// page-visuals-t3-risks.spec.ts: the wave-3 visuals of /resources/threats and
// /resources/harms (OpenSpec page-visuals-2, "Recuentos coherentes") draw the
// counts of their data modules. Read from dist, like
// page-visuals-crosswalk.spec.ts; every expected value is recomputed here from
// the raw rows (src/data/threats.ts, src/data/harms.ts), never from the page
// or lib/page-visuals/risk-visuals.ts, so a chart wired to the wrong field,
// a dropped second layer or mechanism, or a count of eval rows instead of
// tools fails:
// - the threat flow: catalogue -> layer counts (threat, layer) pairs, layer ->
//   tool counts the threats of a layer that name a check in the tool;
// - the framework grids: each catalogue x id cell counts the rows naming the
//   id, and every id of the lookup table is either a column or listed under
//   "No row names" (so all 18 CSA AICM domains are accounted for);
// - the harms target: each harm in its level's ring and its first MIT code's
//   domain, in its control's layer, its mark linking to its card;
// - the harms flow: mechanism -> level counts (harm, mechanism) pairs, level
//   -> layer counts (harm, layer) pairs;
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

/** Links as [from, to, count] from a key -> count map, for comparing with a table. */
function links(counts: Map<string, number>, name: (key: string) => string): string[][] {
  return [...counts].map(([key, n]) => {
    const [from, to] = key.split('\u0000');
    return [name(from), name(to), String(n)];
  });
}
function count(keys: string[]): Map<string, number> {
  const out = new Map<string, number>();
  for (const k of keys) out.set(k, (out.get(k) ?? 0) + 1);
  return out;
}
const pair = (a: string, b: string) => `${a}\u0000${b}`;

test.describe('/resources/threats charts', () => {
  test('the flow counts threat-layer pairs per catalogue and, per layer, the threats each tool tests', () => {
    const toolName = (tool: string) => (tool === 'custom' ? 'Write your own' : tool);
    const names = new Map<string, string>([
      ...taxonomies.map((t) => [`c:${t.id}`, t.name] as const),
      ...[1, 2, 3, 4, 5].map((n) => [`l:${n}`, layerName(n)] as const),
      ...threats.flatMap((t) => t.evals.map((e) => [`t:${e.tool}`, toolName(e.tool)] as const)),
    ]);
    const stage1 = count(threats.flatMap((t) => t.layers.map((n) => pair(`c:${t.taxonomy}`, `l:${n}`))));
    const stage2 = count(
      threats.flatMap((t) => t.layers.flatMap((n) => [...new Set(t.evals.map((e) => e.tool))].map((tool) => pair(`l:${n}`, `t:${tool}`)))),
    );
    const expected = [...links(stage1, (k) => names.get(k)!), ...links(stage2, (k) => names.get(k)!)].sort(byLink);
    const { head, rows } = tableOf(figure(html('/resources/threats'), 'tb-flow-w'));
    expect(head).toEqual(['From', 'To', 'Pairs']);
    expect([...rows].sort(byLink)).toEqual(expected);
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

  test('the flow counts harm-mechanism pairs per level and harm-layer pairs per level', () => {
    const names = (key: string) => {
      const [kind, id] = key.split(':');
      if (kind === 'm') return mechanismLabel[id as keyof typeof mechanismLabel];
      if (kind === 'v') return levelLabel[id as keyof typeof levelLabel];
      return layerName(Number(id));
    };
    const stage1 = count(harms.flatMap((h) => h.mechanism.map((m) => pair(`m:${m}`, `v:${h.level}`))));
    const stage2 = count(harms.flatMap((h) => h.layerN.map((n) => pair(`v:${h.level}`, `l:${n}`))));
    const { head, rows } = tableOf(figure(html('/resources/harms'), 'hm-flow-w'));
    expect(head).toEqual(['From', 'To', 'Pairs']);
    expect([...rows].sort(byLink)).toEqual([...links(stage1, names), ...links(stage2, names)].sort(byLink));
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
