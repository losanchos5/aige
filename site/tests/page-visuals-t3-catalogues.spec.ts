// page-visuals-t3-catalogues.spec.ts: the wave-3 catalogue visuals (OpenSpec
// page-visuals-2, "Recuentos coherentes") draw their datasets' own numbers.
// Read from dist, like page-visuals-crosswalk.spec.ts: each chart's data table
// (the same data the SVG draws, Chart.astro enforces that) is checked against
// values recomputed here from the data modules and the published schema
// files, never from lib/page-visuals or the chart kit, so a chart wired to
// the wrong counts, stages, ranges or links fails:
// - /resources/frameworks: one tile per instrument with obligation rows, its
//   size the rows filed under it, grouped by type; the rest named under it;
// - /resources/templates: every schema once in its lifecycle stage with its
//   fields and share required; the record x instrument matrix counts every
//   x-evidences mark of each schema file under the instrument it cites;
// - /for/aigp: each competency sized by its range midpoint with its share
//   taught; each domain's ribbons count the indicators that link a chapter;
// and every in-page link a chart draws lands on an element of the page.
import { test, expect } from '@playwright/test';
import { existsSync, readFileSync, readdirSync } from 'node:fs';
import { join } from 'node:path';
import { frameworks, obligations } from '../src/data/frameworks';
import { stages } from '../src/data/templates';
import { aigpDomains } from '../src/data/aigp';
import { chapters } from '../src/data/chapters';

function html(route: string): string {
  const base = join('dist', ...route.split('/').filter(Boolean));
  const file = [`${base}.html`, join(base, 'index.html')].find((f) => existsSync(f));
  if (!file) throw new Error(`no built page for ${route}`);
  return readFileSync(file, 'utf8');
}

const decode = (s: string) =>
  s
    .replace(/<[^>]+>/g, '')
    .replace(/&amp;/g, '&')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&quot;/g, '"')
    .replace(/&#39;|&#x27;/g, "'")
    .trim();

/** The chart figure whose figcaption title is `title`: its SVGs and its table. */
function chart(page: string, title: string) {
  const marker = page.indexOf(`>${title}</span>`);
  expect(marker, `no chart titled "${title}"`).toBeGreaterThan(-1);
  const start = page.lastIndexOf('<figure', marker);
  const figure = page.slice(start, page.indexOf('</figure>', marker));
  const body = figure.slice(figure.indexOf('<tbody'), figure.indexOf('</tbody>'));
  const rows = [...body.matchAll(/<tr[^>]*>([\s\S]*?)<\/tr>/g)].map((tr) =>
    [...tr[1].matchAll(/<t[hd][^>]*>([\s\S]*?)<\/t[hd]>/g)].map((cell) => decode(cell[1])),
  );
  const head = figure.slice(figure.indexOf('<thead'), figure.indexOf('</thead>'));
  const columns = [...head.matchAll(/<th[^>]*>([\s\S]*?)<\/th>/g)].map((cell) => decode(cell[1]));
  const svgs = figure.slice(0, figure.indexOf('<figcaption'));
  return { rows, columns, svgs };
}

/** Every in-page link the chart's SVGs draw resolves to an id on the page. */
function expectAnchorsResolve(page: string, svgs: string) {
  const targets = [...new Set([...svgs.matchAll(/href="#([^"]+)"/g)].map((m) => m[1]))];
  expect(targets.length).toBeGreaterThan(0);
  for (const id of targets) expect(page.includes(`id="${id}"`), `#${id}`).toBe(true);
}

test.describe('/resources/frameworks instrument mosaic', () => {
  const rowsOf = (id: string) => obligations.filter((o) => o.frameworkId === id).length;

  test('one tile per instrument with obligation rows, sized by them, grouped by type', () => {
    const page = html('/resources/frameworks');
    const { rows, svgs } = chart(page, 'Where the obligations sit');
    const byName = new Map(frameworks.map((fw) => [fw.name, fw]));
    const drawn = rows.map(([group, name, value]) => ({ group, fw: byName.get(name), value: Number(value) }));
    for (const row of drawn) expect(row.fw, `unknown instrument in the table`).toBeDefined();
    expect(drawn.map((r) => r.fw!.id).sort()).toEqual(frameworks.filter((fw) => rowsOf(fw.id) > 0).map((fw) => fw.id).sort());
    for (const row of drawn) expect(row.value, row.fw!.name).toBe(rowsOf(row.fw!.id));
    // A group holds one type, and no type is split over two groups.
    const typeOfGroup = new Map<string, string>();
    for (const row of drawn) {
      expect(typeOfGroup.get(row.group) ?? row.fw!.type, row.fw!.name).toBe(row.fw!.type);
      typeOfGroup.set(row.group, row.fw!.type);
    }
    expect(new Set(typeOfGroup.values()).size).toBe(typeOfGroup.size);
    expectAnchorsResolve(page, svgs);
  });

  test('instruments without obligation rows are named under the chart, not drawn', () => {
    const page = html('/resources/frameworks');
    const none = frameworks.filter((fw) => rowsOf(fw.id) === 0);
    const at = page.indexOf('class="fw-unmapped"');
    if (!none.length) {
      expect(at).toBe(-1);
      return;
    }
    const note = page.slice(at, page.indexOf('</p>', at));
    expect([...note.matchAll(/href="#fw-([^"]+)"/g)].map((m) => m[1])).toEqual(none.map((fw) => fw.id));
  });
});

test.describe('/resources/templates records ring and evidence matrix', () => {
  // The schema files themselves, read here without the site's loader.
  const ENVELOPE = new Set(['$schema', 'extensions']);
  const DIR = join('public', 'schemas');
  const files = readdirSync(DIR)
    .filter((f) => f.endsWith('.v1.json'))
    .map((f) => JSON.parse(readFileSync(join(DIR, f), 'utf8')) as Record<string, any>);
  const byTitle = new Map(files.map((s) => [String(s.title), s]));
  const marksIn = (node: unknown): string[] =>
    node && typeof node === 'object'
      ? Object.entries(node as Record<string, unknown>).flatMap(([k, v]) =>
          k === 'x-evidences' ? (v as string[]) : marksIn(v),
        )
      : [];

  test('every schema once, in its lifecycle stage, with its fields and share required', () => {
    const { rows } = chart(html('/resources/templates'), 'The records ring');
    expect(rows.map((r) => r[1]).sort()).toEqual([...byTitle.keys()].sort());
    for (const [stage, title, fields, required] of rows) {
      const s = byTitle.get(title)!;
      expect(stage, title).toBe(stages.find((st) => st.id === s['x-lifecycle-stage'])!.label);
      const own = Object.keys(s.properties).filter((k) => !ENVELOPE.has(k));
      const req = (s.required as string[]).filter((k) => !ENVELOPE.has(k));
      expect(Number(fields), title).toBe(own.length);
      expect(Number(required), title).toBe(Math.round((req.length / own.length) * 100));
    }
  });

  test('the matrix counts every x-evidences mark of a schema under the instrument it cites', () => {
    const page = html('/resources/templates');
    const { rows, columns, svgs } = chart(page, 'Evidence marks, record by instrument');
    const instruments = columns.slice(1, -1);
    // Each column is an instrument of the frameworks index, by its short name.
    for (const label of instruments) expect(frameworks.some((fw) => fw.short === label), label).toBe(true);
    // A mark's instrument: the longest column label the mark starts with,
    // reading "ISO/IEC" as the index's "ISO".
    const instrumentOf = (mark: string) =>
      instruments.filter((label) => mark.replace(/^ISO\/IEC /, 'ISO ').startsWith(label)).sort((a, b) => b.length - a.length)[0];
    const records = rows.slice(0, -1);
    expect(records.map((r) => r[0]).sort()).toEqual([...byTitle.keys()].sort());
    for (const row of records) {
      const marks = marksIn(byTitle.get(row[0]));
      expect(Number(row.at(-1)), `${row[0]} total`).toBe(marks.length);
      instruments.forEach((label, i) => {
        expect(Number(row[i + 1]), `${row[0]} x ${label}`).toBe(marks.filter((m) => instrumentOf(m) === label).length);
      });
    }
    const totals = rows.at(-1)!;
    expect(Number(totals.at(-1))).toBe(files.reduce((n, s) => n + marksIn(s).length, 0));
    expectAnchorsResolve(page, svgs);
  });
});

test.describe('/for/aigp exam weight and domains to chapters', () => {
  const competencies = aigpDomains.flatMap((d) => d.competencies.map((c) => ({ d, c })));

  test('each competency sized by the midpoint of its question range, with its share taught', () => {
    const page = html('/for/aigp');
    const { rows, svgs } = chart(page, 'Where the exam weighs');
    expect(rows).toHaveLength(competencies.length);
    for (const { d, c } of competencies) {
      const row = rows.find((r) => r[1].startsWith(`${c.code} `));
      expect(row, c.code).toBeDefined();
      const [group, , size, taught] = row!;
      expect(group, `${c.code} in domain ${d.code}`).toBe(`Domain ${d.code}`);
      expect(Number(size), c.code).toBe((c.questions.min + c.questions.max) / 2);
      const share = c.indicators.filter((i) => i.status === 'taught').length / c.indicators.length;
      expect(Number(taught), c.code).toBe(Math.round(share * 100));
    }
    expectAnchorsResolve(page, svgs);
  });

  test("each domain's ribbons count its indicators that link a chapter, the tail as Other", () => {
    const page = html('/for/aigp');
    const { rows, svgs } = chart(page, 'From the domains to the chapters');
    const bySlug = new Map(chapters.map((c) => [c.slug, c]));
    const byTitle = new Map(chapters.map((c) => [c.title, c]));
    const chaptersOf = (links: readonly string[]) =>
      new Set(links.map((l) => bySlug.get(/^\/bok\/([^/#?]+)/.exec(l)?.[1] ?? '')).filter(Boolean));
    const targets = [...new Set(rows.map((r) => r[1]))];
    expect(targets.length).toBeLessThanOrEqual(9);
    const other = targets.find((t) => t.startsWith('Other'));
    const drawn = targets.filter((t) => t !== other).map((t) => byTitle.get(t));
    for (const c of drawn) expect(c, 'a chapter title in the table').toBeDefined();
    const reached = new Set(aigpDomains.flatMap((d) => d.competencies.flatMap((c) => c.indicators.flatMap((i) => [...chaptersOf(i.links)]))));
    const rest = [...reached].filter((c) => !drawn.includes(c));
    // Every chapter an indicator links is drawn, or named in Other.
    if (rest.length) {
      expect(other, 'an Other node for the chapters not drawn').toBeDefined();
      expect(other!.match(/\d{2}/g)!.sort()).toEqual(rest.map((c) => c!.id.slice(0, 2)).sort());
    }
    for (const d of aigpDomains) {
      const indicators = d.competencies.flatMap((c) => c.indicators);
      const expected = new Map<string, number>();
      for (const c of drawn) {
        const n = indicators.filter((i) => chaptersOf(i.links).has(c)).length;
        if (n) expected.set(c!.title, n);
      }
      const inRest = indicators.filter((i) => rest.some((c) => chaptersOf(i.links).has(c))).length;
      if (inRest) expected.set(other!, inRest);
      const got = new Map(rows.filter((r) => r[0] === `Domain ${d.code}: ${d.title}`).map((r) => [r[1], Number(r[2])]));
      expect(got, `domain ${d.code}`).toEqual(expected);
    }
    expectAnchorsResolve(page, svgs);
  });
});
