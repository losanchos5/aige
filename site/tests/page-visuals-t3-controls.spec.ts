// page-visuals-t3-controls.spec.ts: the wave-3 visuals of /controls and
// /controls/crosswalk (OpenSpec page-visuals-2, "Recuentos coherentes" and
// "Anclas conservadas") draw the registry's own numbers. Read from dist, like
// page-visuals-crosswalk.spec.ts; every expected value is recomputed here from
// the control registry (src/data/controls) and its crosswalk
// (buildControlsCrosswalk, the data source of the page, its Markdown twin and
// the JSON), never from lib/page-visuals/controls-flows.ts or the chart kit,
// so a visual wired to the wrong field, direction, profile or framework fails:
// - /controls, the evidence flow: one link per (home layer, evidence layer)
//   with its number of artefacts, and each drawn node's total;
// - /controls/crosswalk, the profile flow: the named frameworks are the ones
//   with the most mappings, each with its per-profile counts, the rest summed
//   in "Other (N)", nothing lost; each named framework links to its table;
// - the heat index: one row per framework in crosswalk order, linked to its
//   table, with its mappings per profile and in total;
// - the most covered clauses: the largest counts, each linked to a clause
//   row that lists exactly that many controls.
import { test, expect } from '@playwright/test';
import { existsSync, readFileSync } from 'node:fs';
import { join } from 'node:path';
import { controls, controlById } from '../src/data/controls';
import { layers } from '../src/data/stack';
import { buildControlsCrosswalk, crosswalkPairs, crosswalkProfiles, isObligationFramework } from '../src/lib/controls-crosswalk';

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
    .replace(/&#39;|&#x27;/g, "'")
    .trim();

/** The <figure> whose caption title is `title`. */
function figure(page: string, title: string): string {
  const at = page.indexOf(`>${title}</span>`);
  expect(at, `no figure titled ${title}`).toBeGreaterThan(-1);
  return page.slice(page.lastIndexOf('<figure', at), page.indexOf('</figure>', at));
}

/** The data table rows of a Chart figure: [row header, ...cells]. */
function tableRows(fig: string): string[][] {
  const body = fig.slice(fig.indexOf('<tbody'), fig.indexOf('</tbody>'));
  return [...body.matchAll(/<tr[^>]*>([\s\S]*?)<\/tr>/g)].map((row) =>
    [...row[1].matchAll(/<t[hd][^>]*>([\s\S]*?)<\/t[hd]>/g)].map((cell) => decode(cell[1].replace(/<[^>]+>/g, ''))),
  );
}

/** The wide SVG of a Chart pair (the first <svg> in the .chart-w block). */
const wideSvg = (fig: string) => fig.slice(fig.indexOf('class="chart-w"'), fig.indexOf('</svg>', fig.indexOf('class="chart-w"')));

const sum = (values: number[]) => values.reduce((a, b) => a + b, 0);

test.describe('/controls: the evidence climbs the stack', () => {
  const layerName = (n: number) => `Layer ${n}: ${layers.find((l) => l.n === n)!.name}`;
  // (home layer, evidence layer) -> artefacts, straight from the registry.
  const expected = new Map<string, number>();
  for (const c of controls) {
    for (const e of c.evidence) {
      const key = `${layerName(c.layer)} > ${layerName(e.layer)}`;
      expected.set(key, (expected.get(key) ?? 0) + 1);
    }
  }
  const fig = figure(html('/controls'), 'The evidence climbs the stack');

  test('one row per home layer and evidence layer, with its artefacts', () => {
    const drawn = new Map(tableRows(fig).map(([from, to, n]) => [`${from} > ${to}`, Number(n)]));
    expect(drawn).toEqual(expected);
    expect(sum([...drawn.values()])).toBe(sum(controls.map((c) => c.evidence.length)));
  });

  test("each drawn layer node totals its controls' artefacts, as source and as keeper", () => {
    const svg = wideSvg(fig);
    for (const l of layers) {
      const out = controls.filter((c) => c.layer === l.n).reduce((n, c) => n + c.evidence.length, 0);
      const kept = controls.reduce((n, c) => n + c.evidence.filter((e) => e.layer === l.n).length, 0);
      const titles = [...svg.matchAll(/<title>([^<]+)<\/title>/g)].map((m) => decode(m[1])).filter((t) => t.startsWith(`${layerName(l.n)}: `));
      // The source node first (left column), then the keeper (right column).
      expect(titles, layerName(l.n)).toEqual([`${layerName(l.n)}: ${out} artefacts`, `${layerName(l.n)}: ${kept} artefacts`]);
    }
  });

  test('the home-layer lists keep their anchors, folded under the chart', () => {
    const page = html('/controls');
    const section = page.slice(page.indexOf('id="by-layer"'), page.indexOf('id="ecosystem"'));
    const details = section.slice(section.indexOf('<details class="cp-layers'), section.indexOf('</details>', section.indexOf('<details class="cp-layers')));
    for (const l of layers) {
      expect(details.includes(`id="layer-${l.n}"`), `#layer-${l.n}`).toBe(true);
      // The flow's source node links to its list.
      expect(wideSvg(fig).includes(`href="#layer-${l.n}"`) || !controls.some((c) => c.layer === l.n), `node to #layer-${l.n}`).toBe(true);
    }
  });
});

test.describe('/controls/crosswalk: profiles, frameworks and clauses', () => {
  const crosswalk = buildControlsCrosswalk();
  const profiles = crosswalkProfiles();
  /** Mappings (clause and control pairs) of one framework from one profile. */
  const pairs = (fwId: string, slug: string) =>
    crosswalk.frameworks
      .find((fw) => fw.id === fwId)!
      .rows.reduce((n, r) => n + r.controls.filter((id) => controlById(id)!.profile === slug).length, 0);
  const totalOf = (fwId: string) => sum(profiles.map((p) => pairs(fwId, p.slug)));
  const page = html('/controls/crosswalk');

  test('the profile flow names the largest frameworks with their mappings and sums the rest', () => {
    const fig = figure(page, 'From the profiles to the frameworks');
    const rows = tableRows(fig).map(([profile, framework, n]) => ({ profile, framework, n: Number(n) }));
    // The table names a register instrument with its group, since OWASP's
    // agentic list is both a register instrument and a threat catalogue.
    const byName = new Map(crosswalk.frameworks.map((fw) => [isObligationFramework(fw) ? `${fw.name} (obligation register)` : fw.name, fw.id]));
    expect(byName.size).toBe(crosswalk.frameworks.length);
    const named = [...new Set(rows.map((r) => r.framework))].filter((name) => byName.has(name)).map((name) => byName.get(name)!);
    const other = rows.filter((r) => /^Other frameworks \(\d+\)$/.test(r.framework));
    const rest = crosswalk.frameworks.filter((fw) => !named.includes(fw.id));
    // Every row is a named framework or the "Other" group, and nothing is lost.
    expect(named.length + (other.length > 0 ? 1 : 0)).toBe(new Set(rows.map((r) => r.framework)).size);
    expect(sum(rows.map((r) => r.n))).toBe(crosswalkPairs(crosswalk));
    // The named ones are the largest: none of the rest has more mappings.
    const smallestNamed = Math.min(...named.map(totalOf));
    for (const fw of rest) expect(totalOf(fw.id), fw.name).toBeLessThanOrEqual(smallestNamed);
    for (const p of profiles) {
      const label = p.shortTitle;
      for (const id of named) {
        const row = rows.find((r) => r.profile === label && byName.get(r.framework) === id);
        expect(row?.n ?? 0, `${label} to ${id}`).toBe(pairs(id, p.slug));
      }
      const grouped = sum(rest.map((fw) => pairs(fw.id, p.slug)));
      expect(other.find((r) => r.profile === label)?.n ?? 0, `${label} to Other`).toBe(grouped);
    }
    if (rest.length > 0) expect(other[0].framework).toBe(`Other frameworks (${rest.length})`);
    // Each named framework node links to its table.
    const svg = wideSvg(fig);
    for (const id of named) expect(svg.includes(`href="#${id}"`), `#${id}`).toBe(true);
  });

  test('the heat index has one linked row per framework with its mappings per profile', () => {
    const index = page.slice(page.indexOf('id="frameworks"'), page.indexOf('id="obligations"'));
    const table = index.slice(index.indexOf('<table class="cwx-table'), index.indexOf('</table>'));
    const rows = [...table.matchAll(/<tr[^>]*data-framework="([^"]+)"[^>]*>([\s\S]*?)<\/tr>/g)].map((m) => ({
      id: m[1],
      row: m[2],
      counts: [...m[2].matchAll(/<td[^>]*>([\s\S]*?)<\/td>/g)].map((c) => Number(decode(c[1].replace(/<[^>]+>/g, '')))),
    }));
    expect(rows.map((r) => r.id)).toEqual(crosswalk.frameworks.map((fw) => fw.id));
    for (const r of rows) {
      expect(r.row.includes(`href="#${r.id}"`), `row links #${r.id}`).toBe(true);
      const expected = profiles.map((p) => pairs(r.id, p.slug));
      expect(r.counts, r.id).toEqual([...expected, sum(expected)]);
    }
    // The register's instruments stay grouped under a link to #obligations.
    expect(table.includes('href="#obligations"')).toBe(true);
  });

  test('the most covered clauses are the largest, each linked to its clause row', () => {
    const fig = figure(page, 'The most covered clauses');
    const values = tableRows(fig).map(([, n]) => Number(n));
    const all = crosswalk.frameworks.flatMap((fw) => fw.rows.map((r) => r.controls.length)).sort((a, b) => b - a);
    expect(values).toEqual(all.slice(0, 15));
    // Each lollipop links a clause row of the framework tables that lists
    // exactly its number of controls.
    const svg = wideSvg(fig);
    const links = [...svg.matchAll(/href="#([^"]+)"/g)].map((m) => m[1]);
    expect(links).toHaveLength(15);
    links.forEach((id, i) => {
      const at = page.indexOf(`<tr id="${id}"`);
      expect(at, `#${id} is a clause row`).toBeGreaterThan(-1);
      const row = page.slice(at, page.indexOf('</tr>', at));
      expect((row.match(/data-pair="/g) ?? []).length, `#${id}`).toBe(values[i]);
    });
  });
});
