// chart-primitives.spec.ts: the contract of the build-time chart kit
// (src/lib/charts/) that the page visuals of waves 1 and 2 rely on, checked
// on the modules directly (pure Node, no browser): the same input gives the
// same SVG; the SVG carries the accessible shell (role, <title>, <desc>) and
// its provenance lines, no hex colour and no em dash; every class it emits is
// styled in both style modes (figures.css for .figc, chart.css for .chart);
// the table holds exactly the input data and the SVG draws one titled mark
// per table row; a label that cannot fit (or an empty input) throws, naming
// it; linked marks keep the 24 px pointer-target spacing; scales keep at most
// six round ticks and bars start at zero; lang 'es' leaves no English chrome;
// each narrow variant changes the layout it promises. The pair invariants
// (same table, distinct ids, 12 KB per SVG) are enforced by Chart.astro at
// render time. Runs in `default`.
import { test, expect } from '@playwright/test';
import { readFileSync } from 'node:fs';
import { resolve } from 'node:path';

import {
  beeswarm,
  divergingBars,
  dotMatrix,
  dumbbell,
  heatGrid,
  ladder,
  lanes,
  linearScale,
  lollipop,
  rankedBars,
  stacked100,
  stackedBars,
  timeLanes,
  timeStrip,
  venn3,
  type Cell,
  type ChartOutput,
} from '../src/lib/charts';
import { enforcementLabels } from '../src/data/policy-card';

const base = { source: 'chapter 08 [3]', asOf: '2026-09-30' };
const title = 'A chart';
const desc = 'What the chart shows, in one sentence.';

// ---- fixtures: one input per primitive, with the rows its table must hold --
const dotGroups = [
  { label: 'Agent runtime', items: [{ label: 'AR-1', tone: 4 as const }, { label: 'AR-2', state: 'hatched' as const, status: 'To be specified' }] },
  { label: 'Evals', items: [{ label: 'EV-1', state: 'outline' as const, tone: 3 as const, href: '/controls/ev-1' }] },
];
const heat = {
  rows: [{ label: 'Spain' }, { label: 'France' }],
  columns: [{ label: 'Biometrics' }, { label: 'Education' }, { label: 'Employment' }],
  values: [
    [3, 0, null],
    [1, 6, 2],
  ],
};
const ranked = [
  { label: 'GDPR', value: 15 },
  { label: 'EU AI Act', value: 50, highlight: true },
  { label: 'China', value: 9 },
];
const series = [{ label: 'Open source' }, { label: 'Commercial', state: 'hatched' as const }];
const stackItems = [
  { label: 'Policy engines', values: [5, 3] },
  { label: 'Eval harnesses', values: [7, 0] },
];
const divItems = [
  { label: 'Risk management', left: [3, 1], right: [2, 2], note: 'Strong' },
  { label: 'Data governance', left: [0, 0], right: [4, 1], note: 'EU AI Act only' },
];
const moves = [
  { label: 'Annex III high-risk', from: '2026-08-02', to: '2027-12-02' },
  { label: 'Annex I high-risk', from: '2027-08-02', to: '2028-08-02' },
];
const points = [
  { date: '2026-08-02', label: 'Art. 50', status: 'In force', state: 'filled' as const },
  { date: '2018-05-25', label: 'GDPR', status: 'In force', state: 'filled' as const },
  { date: '2026-08-02', label: 'Art. 26', status: 'Deferred', state: 'hatched' as const, shape: 'diamond' as const },
];
const timeDomain = { from: '2018-01-01', to: '2031-01-01', today: '2026-09-30' };
const timeLaneData = [
  { label: 'Prohibited practices', items: [{ label: 'Art. 5', start: '2025-02-02' }] },
  { label: 'High-risk Annex III', items: [{ label: 'Annex III', start: '2026-08-02', end: '2027-12-02', status: 'Deferred' }] },
];
const laneColumns = [
  { key: 'pre_merge', label: 'Pre merge' },
  { key: 'deploy', label: 'Deploy' },
  { key: 'runtime', label: 'Runtime' },
  { key: 'periodic', label: 'Periodic' },
];
const laneRows = [
  {
    label: 'Registry entry required',
    marks: [
      { column: 'pre_merge', shape: 'diamond' as const, status: 'deny' },
      { column: 'deploy', shape: 'square' as const, status: 'require_approval' },
    ],
  },
  { label: 'Tool call logging', marks: [{ column: 'runtime', shape: 'circle' as const, state: 'outline' as const, status: 'alert' }] },
];
const sets: [{ key: string; label: string }, { key: string; label: string }, { key: string; label: string }] = [
  { key: 'eu', label: 'EU AI Act' },
  { key: 'iso', label: 'ISO 42001' },
  { key: 'nist', label: 'NIST AI RMF' },
];
const vennItems = [
  { label: 'Risk management', sets: ['eu', 'iso', 'nist'] },
  { label: 'CE marking', sets: ['eu'] },
  { label: 'AI policy', sets: ['iso', 'nist'] },
  { label: 'Unfiled topic', sets: [] },
];
const steps = [{ label: 'Minimal risk', detail: 'No new duties' }, { label: 'Transparency', detail: 'Art. 50 duties' }, { label: 'High risk' }];

interface Case {
  name: string;
  make: (id: string) => ChartOutput;
  /** The rows the table must hold (omitted where another export shares the
   *  table code: lollipop with rankedBars, stacked100 with stackedBars). */
  rows?: Cell[][];
  /** Titled marks the SVG draws per table row, where each row is drawn as
   *  its own mark(s). */
  marks?: number;
}

const yesNo = (item: { sets: string[] }) => sets.map((s) => (item.sets.includes(s.key) ? 'Yes' : 'No'));

const CASES: Case[] = [
  {
    name: 'dotMatrix',
    make: (id) => dotMatrix({ ...base, id, title, desc, groups: dotGroups, unit: 'controls' }),
    marks: 1,
    rows: [
      ['Agent runtime', 'AR-1', 'Filled', 'Layer 04'],
      ['Agent runtime', 'AR-2', 'To be specified', ''],
      ['Evals', 'EV-1', 'Outline', 'Layer 03'],
    ],
  },
  {
    name: 'heatGrid',
    make: (id) => heatGrid({ ...base, id, title, desc, rowHeader: 'Country', unit: 'entries', marginals: true, ...heat }),
    rows: [
      ['Spain', 3, 0, 'n/a', 3],
      ['France', 1, 6, 2, 9],
      ['Total', 4, 6, 2, 12],
    ],
  },
  {
    name: 'rankedBars',
    make: (id) => rankedBars({ ...base, id, title, desc, unit: 'clauses', items: ranked }),
    marks: 1,
    rows: [
      ['EU AI Act', 50],
      ['GDPR', 15],
      ['China', 9],
    ],
  },
  {
    name: 'lollipop',
    make: (id) => lollipop({ ...base, id, title, desc, unit: 'clauses', items: ranked, sort: 'none' }),
  },
  {
    name: 'stackedBars',
    make: (id) => stackedBars({ ...base, id, title, desc, unit: 'tools', series, items: stackItems }),
    rows: [
      ['Policy engines', 5, 3, 8],
      ['Eval harnesses', 7, 0, 7],
    ],
  },
  {
    name: 'stacked100',
    make: (id) => stacked100({ ...base, id, title, desc, unit: 'tools', series, items: stackItems }),
  },
  {
    name: 'divergingBars',
    make: (id) =>
      divergingBars({ ...base, id, title, desc, unit: 'clauses', left: { label: 'ISO 42001' }, right: { label: 'EU AI Act' }, segments: ['core', 'related'], items: divItems }),
    rows: [
      ['Risk management', 3, 1, 2, 2, 'Strong'],
      ['Data governance', 0, 0, 4, 1, 'EU AI Act only'],
    ],
  },
  {
    name: 'dumbbell',
    make: (id) => dumbbell({ ...base, id, title, desc, fromLabel: 'Original date', toLabel: 'New date', today: '2026-09-30', items: moves }),
    marks: 2,
    rows: moves.map((m) => [m.label, m.from, m.to]),
  },
  {
    name: 'beeswarm',
    make: (id) => beeswarm({ ...base, ...timeDomain, id, title, desc, points }),
    marks: 1,
    rows: points.map((p) => [p.date, p.label, p.status]),
  },
  {
    name: 'timeStrip',
    make: (id) => timeStrip({ ...base, ...timeDomain, id, title, desc, events: points }),
    marks: 1,
    rows: points.map((p) => [p.date, p.label, p.status]),
  },
  {
    name: 'timeLanes',
    make: (id) => timeLanes({ ...base, ...timeDomain, id, title, desc, lanes: timeLaneData }),
    marks: 1,
    rows: [
      ['Prohibited practices', 'Art. 5', '2025-02-02', '', ''],
      ['High-risk Annex III', 'Annex III', '2026-08-02', '2027-12-02', 'Deferred'],
    ],
  },
  {
    name: 'lanes',
    make: (id) => lanes({ ...base, id, title, desc, rowHeader: 'Control', columns: laneColumns, rows: laneRows }),
    rows: [
      ['Registry entry required', 'deny', 'require_approval', '', ''],
      ['Tool call logging', '', '', 'alert', ''],
    ],
  },
  {
    name: 'venn3',
    make: (id) => venn3({ ...base, id, title, desc, unit: 'topics', sets, items: vennItems, layout: 'venn' }),
    rows: vennItems.map((i) => [i.label, ...yesNo(i)]),
  },
  {
    name: 'ladder',
    make: (id) => ladder({ ...base, id, title, desc, steps, highlight: 2, highlightLabel: 'This system' }),
    rows: [
      [1, 'Minimal risk', 'No new duties', ''],
      [2, 'Transparency', 'Art. 50 duties', ''],
      [3, 'High risk', '', 'This system'],
    ],
  },
];

// ---- helpers ---------------------------------------------------------------
const figuresCss = readFileSync(resolve(process.cwd(), 'src/styles/figures.css'), 'utf8');
const chartCss = readFileSync(resolve(process.cwd(), 'src/styles/chart.css'), 'utf8');
const styledIn = (css: string, root: string, cls: string) => new RegExp(`\\.${root} \\.${cls}(?![\\w-])`).test(css);
/** Classes on every element but the root <svg> (whose classes are hooks). */
const innerClasses = (svg: string) =>
  [...new Set([...svg.replace(/^<svg[^>]*>/, '').matchAll(/\sclass="([^"]+)"/g)].flatMap((m) => m[1].split(/\s+/)))];
const EM = '\u2014';

// ---- 1. the SVG contract, per primitive ------------------------------------
for (const c of CASES) {
  test(`${c.name}: deterministic, accessible, stamped, token-only SVG`, () => {
    const first = c.make('ch-a');
    expect(c.make('ch-a').svg, 'same input, same bytes').toBe(first.svg);
    const root = /^<svg[^>]*>/.exec(first.svg)?.[0] ?? '';
    expect(root).toMatch(/\srole="(img|group)"/);
    const labelledBy = /aria-labelledby="([^"]+)"/.exec(root)?.[1].split(' ') ?? [];
    expect(labelledBy).toEqual(['ch-a-t', 'ch-a-d']);
    expect(first.svg).toContain(`<title id="ch-a-t">${title}</title>`);
    expect(first.svg).toContain(`<desc id="ch-a-d">${desc}</desc>`);
    const ids = [...first.svg.matchAll(/\sid="([^"]+)"/g)].map((m) => m[1]);
    expect(new Set(ids).size, 'ids are unique inside the SVG').toBe(ids.length);
    expect(first.svg).toContain('Source: chapter 08 [3]');
    expect(first.svg).toContain('As of 2026-09-30');
    expect(first.svg.replace(/url\(#[^)]*\)/g, ''), 'no hex colour').not.toMatch(/#[0-9a-fA-F]{3,8}\b/);
    expect(first.svg).not.toContain(EM);
    expect(first.svg, 'text is never dimmed with opacity').not.toMatch(/<text[^>]*opacity/);
  });
}

test('every class a primitive emits is styled for both modes (figures.css .figc, chart.css .chart)', () => {
  const missing: string[] = [];
  for (const c of CASES) {
    for (const cls of innerClasses(c.make('ch-b').svg)) {
      if (!styledIn(figuresCss, 'figc', cls)) missing.push(`${c.name}: .figc .${cls}`);
      if (!styledIn(chartCss, 'chart', cls)) missing.push(`${c.name}: .chart .${cls}`);
    }
  }
  expect(missing).toEqual([]);
});

test("mode 'chart' drops the figc class, so a perf-vetted page needs no figures.css", () => {
  const svg = rankedBars({ ...base, id: 'ch-m', title, desc, unit: 'clauses', items: ranked, mode: 'chart' }).svg;
  expect(/^<svg[^>]*class="([^"]*)"/.exec(svg)?.[1].split(' ')).toContain('chart');
  expect(svg).not.toMatch(/class="[^"]*\bfigc\b/);
});

// ---- 2. the table holds exactly the input data, and the SVG draws it -------
for (const c of CASES.filter((x) => x.rows)) {
  test(`${c.name}: the table rows are the input data`, () => {
    const { table, svg } = c.make('ch-t');
    expect(table.rows).toEqual(c.rows);
    for (const row of table.rows) expect(row).toHaveLength(table.columns.length);
    expect(table.caption).toBe(title);
    if (c.marks) {
      // Mark tooltips are bare <title>s (the chart's own carries an id): a
      // dropped or skipped mark leaves the table and the drawing apart.
      expect((svg.match(/<title>/g) ?? []).length, 'one titled mark per row').toBe(table.rows.length * c.marks);
    }
  });
}

// ---- 3. labels that cannot fit, empty inputs, cramped links throw ----------
const LONG = 'Extraordinarily comprehensive multidisciplinary interinstitutional coordination';
const THROWS: { name: string; run: () => unknown; label: RegExp }[] = [
  {
    name: 'a ranked-bars label past two lines',
    run: () => rankedBars({ ...base, id: 'ch-x', title, desc, unit: 'clauses', width: 340, items: [{ label: `${LONG} ${LONG}`, value: 1 }] }),
    label: /label ".*Extraordinarily/,
  },
  {
    name: 'a heat-grid column label past its box',
    run: () => heatGrid({ ...base, id: 'ch-x', title, desc, rowHeader: 'Country', unit: 'entries', rows: [{ label: 'Spain' }], columns: [{ label: LONG }], values: [[1]] }),
    label: new RegExp(`label "${LONG}"`),
  },
  {
    name: 'a single swimlane column word wider than its column',
    run: () => lanes({ ...base, id: 'ch-x', title, desc, width: 340, rowHeader: 'Control', columns: [{ key: 'a', label: 'Interinstitutional' }, ...laneColumns.slice(1)], rows: laneRows.slice(1) }),
    label: /label "Interinstitutional"/,
  },
  {
    name: 'a Venn set label wider than its side',
    run: () => venn3({ ...base, id: 'ch-x', title, desc, unit: 'topics', layout: 'venn', width: 340, sets: [{ key: 'eu', label: LONG }, sets[1], sets[2]], items: vennItems }),
    label: new RegExp(`label "${LONG}"`),
  },
  {
    name: 'an em dash in a label',
    run: () => ladder({ ...base, id: 'ch-x', title, desc, steps: [{ label: `Low ${EM} minimal` }, { label: 'High' }] }),
    label: new RegExp(`label "Low ${EM} minimal" contains an em dash`),
  },
  {
    name: 'a dated point outside the time domain',
    run: () => beeswarm({ ...base, ...timeDomain, id: 'ch-x', title, desc, points: [{ date: '2035-01-01', label: 'Later' }] }),
    label: /"2035-01-01" falls outside/,
  },
  {
    name: 'a horizontal time-strip label wider than the canvas',
    run: () => timeStrip({ ...base, ...timeDomain, id: 'ch-x', title, desc, width: 340, events: [{ date: '2025-01-01', label: LONG }] }),
    label: new RegExp(`label "${LONG}"`),
  },
  {
    name: 'a ladder highlight label wider than its step',
    run: () =>
      ladder({ ...base, id: 'ch-x', title, desc, width: 340, steps: [...steps, { label: 'Four' }, { label: 'Five' }], highlight: 0, highlightLabel: 'This system sits here today' }),
    label: /label "This system sits here today"/,
  },
  {
    name: 'two linked time marks closer than the 24 px target spacing',
    run: () =>
      timeStrip({ ...base, ...timeDomain, id: 'ch-x', title, desc, events: [{ date: '2020-01-01', label: 'A', href: '/a' }, { date: '2020-02-01', label: 'B', href: '/b' }] }),
    label: /linked marks "A · 2020-01-01" and "B · 2020-02-01"/,
  },
  {
    name: 'a dumbbell with no items (an empty filter result)',
    run: () => dumbbell({ ...base, id: 'ch-x', title, desc, fromLabel: 'From', toLabel: 'To', items: [] }),
    label: /dumbbell ch-x\): no items to draw/,
  },
  {
    name: 'a heat grid with no rows',
    run: () => heatGrid({ ...base, id: 'ch-x', title, desc, rowHeader: 'Country', unit: 'entries', rows: [], columns: heat.columns, values: [] }),
    label: /heatGrid ch-x\): no rows to draw/,
  },
];

for (const t of THROWS) {
  test(`throws, naming the culprit, for ${t.name}`, () => {
    expect(t.run).toThrow(t.label);
  });
}

// ---- 4. pointer targets, words, lazy parts ---------------------------------
test('linked cells default to the 24 px target pitch and are named by their <title>; a tighter pitch throws', () => {
  const items = Array.from({ length: 30 }, (_, i) => ({ label: `C-${i}`, href: `/c/${i}` }));
  const groups = [{ label: 'Controls', items }];
  const { svg } = dotMatrix({ ...base, id: 'ch-p', title, desc, groups });
  // The <title> is the link's accessible name and tooltip, stated once.
  expect(svg).toContain('<a href="/c/0"><title>C-0 (Filled)</title><rect');
  expect(svg).not.toContain('aria-label=');
  expect(() => dotMatrix({ ...base, id: 'ch-p', title, desc, groups, cell: 14, gap: 4 })).toThrow(/linked marks "C-0 \(Filled\)" and "C-1 \(Filled\)"/);
});

test("lang 'es' leaves no English chrome in the SVG or the table", () => {
  const es = { ...base, lang: 'es' as const, title, desc };
  const strip = timeStrip({ ...es, ...timeDomain, id: 'ch-s', events: points });
  expect(strip.table.columns).toEqual(['Fecha', 'Elemento', 'Estado']);
  expect(strip.svg).toContain('>Hoy 2026-09-30<');
  const bell = dumbbell({ ...es, id: 'ch-d', fromLabel: 'Fecha original', toLabel: 'Nueva fecha', today: '2026-09-30', items: moves });
  expect(bell.svg).toContain('>Hoy 2026-09-30<');
  expect(bell.table.columns[0]).toBe('Elemento');
  const grid = heatGrid({ ...es, id: 'ch-h', rowHeader: 'País', unit: 'entradas', marginals: true, ...heat });
  expect(grid.table.rows[0]).toEqual(['Spain', 3, 0, 'no aplica', 3]);
  expect(grid.svg).toContain('<title>Spain: 3 entradas en total</title>');
  expect(grid.svg).not.toMatch(/not applicable|in total|Source:|As of/);
});

test('heatGrid builds its sticky pair only when read, so a stamp that fits the whole SVG never throws for an unused pair', () => {
  const columns = Array.from({ length: 12 }, (_, i) => ({ label: `Area ${i + 1}` }));
  const source =
    'European Data Protection Board register of national DPIA lists, consolidated from the published national lists and their later amendments by country';
  const out = heatGrid({ ...base, source, id: 'ch-l', title, desc, rowHeader: 'Country', unit: 'entries', rows: [{ label: 'Czech Republic plus' }], columns, values: [columns.map(() => 1)] });
  expect(out.svg).toContain('Source: European');
  expect(() => out.sticky).toThrow(/source line/);
});

test('timeLanes labels every mark next to it in both orientations, unless labels is none', () => {
  const shown = (svg: string) => ['Art. 5', 'Annex III'].filter((l) => svg.includes(`>${l}</text>`));
  const make = (o: { orientation?: 'vertical'; labels?: 'none' }) => timeLanes({ ...base, ...timeDomain, id: 'ch-i', title, desc, lanes: timeLaneData, ...o }).svg;
  expect(shown(make({}))).toEqual(['Art. 5', 'Annex III']);
  expect(shown(make({ orientation: 'vertical' }))).toEqual(['Art. 5', 'Annex III']);
  expect(shown(make({ labels: 'none' }))).toEqual([]);
});

// ---- 5. scales -------------------------------------------------------------
test('linear scales keep at most six round ticks that cover the data and include zero', () => {
  const ranges: number[][] = [[0, 7], [0, 93], [3, 1_000_000], [0.1, 0.7], [40, 55], [0, 1], [12, 12]];
  for (const values of ranges) {
    const s = linearScale(values, [0, 100]);
    expect(s.ticks.length, `${values}`).toBeLessThanOrEqual(6);
    expect(s.ticks.length, `${values}`).toBeGreaterThanOrEqual(2);
    expect(s.ticks[0], `${values} starts at zero`).toBe(0);
    expect(s.ticks[s.ticks.length - 1], `${values} covers the max`).toBeGreaterThanOrEqual(Math.max(...values));
    const step = s.ticks[1] - s.ticks[0];
    const mantissa = step / 10 ** Math.floor(Math.log10(step));
    expect([1, 2, 2.5, 5], `${values} step ${step}`).toContainEqual(Math.round(mantissa * 1e6) / 1e6);
  }
});

test('bars start at the zero tick even when every value is far from zero', () => {
  const { svg } = rankedBars({ ...base, id: 'ch-z', title, desc, unit: 'clauses', items: [{ label: 'A', value: 40 }, { label: 'B', value: 55 }] });
  const zeroX = Number(/<text x="([\d.]+)"[^>]*>0<\/text>/.exec(svg)?.[1]);
  const barXs = [...svg.matchAll(/<rect x="([\d.]+)"[^>]*class="mk /g)].map((m) => Number(m[1]));
  expect(barXs).toHaveLength(2);
  for (const x of barXs) expect(x).toBe(zeroX);
});

// The one guard on heatgrid.ts MAX_ALPHA, the cap that keeps the ink numbers
// printed on the darkest cells legible; the contrast itself is measured by the
// axe run of the first page that renders a heat grid (wave 1).
test('heat cells stay at or under 0.38 fill-opacity, so ink numbers on them keep contrast', () => {
  const { svg } = heatGrid({ ...base, id: 'ch-h', title, desc, rowHeader: 'Country', unit: 'entries', ...heat });
  const alphas = [...svg.matchAll(/fill-opacity="([\d.]+)"/g)].map((m) => Number(m[1]));
  expect(alphas.length).toBeGreaterThan(0);
  expect(Math.max(...alphas)).toBeLessThanOrEqual(0.38);
});

// ---- 6. the narrow variants change the layout they promise -----------------
const textAt = (svg: string, label: string) => {
  const m = new RegExp(`<text x="([\\d.]+)" y="([\\d.]+)"[^>]*>${label}</text>`).exec(svg);
  return m ? { x: Number(m[1]), y: Number(m[2]) } : undefined;
};

const TIME_PAIRS: { name: string; wide: () => ChartOutput; narrow: () => ChartOutput }[] = [
  {
    name: 'beeswarm',
    wide: () => beeswarm({ ...base, ...timeDomain, id: 'ch-w', title, desc, points }),
    narrow: () => beeswarm({ ...base, ...timeDomain, id: 'ch-n', title, desc, points, orientation: 'vertical' }),
  },
  {
    name: 'time strip',
    wide: () => timeStrip({ ...base, ...timeDomain, id: 'ch-w', title, desc, events: points }),
    narrow: () => timeStrip({ ...base, ...timeDomain, id: 'ch-n', title, desc, events: points, orientation: 'vertical' }),
  },
  {
    name: 'time lanes',
    wide: () => timeLanes({ ...base, ...timeDomain, id: 'ch-w', title, desc, lanes: timeLaneData }),
    narrow: () => timeLanes({ ...base, ...timeDomain, id: 'ch-n', title, desc, lanes: timeLaneData, orientation: 'vertical' }),
  },
];

for (const p of TIME_PAIRS) {
  test(`${p.name}: time runs left to right on the wide variant, top to bottom on the narrow one`, () => {
    const axis = (svg: string) => /<line class="axis" x1="([\d.]+)" y1="([\d.]+)" x2="([\d.]+)" y2="([\d.]+)"/.exec(svg)!.slice(1).map(Number);
    const [wx1, wy1, wx2, wy2] = axis(p.wide().svg);
    const [nx1, ny1, nx2, ny2] = axis(p.narrow().svg);
    expect(wy1 === wy2 && wx2 > wx1, 'wide axis is horizontal').toBe(true);
    expect(nx1 === nx2 && ny2 > ny1, 'narrow axis is vertical').toBe(true);
  });
}

test('Venn3 upset layout draws bars, not circles', () => {
  const make = (layout: 'venn' | 'upset') => venn3({ ...base, id: 'ch-v', title, desc, unit: 'topics', sets, items: vennItems, layout }).svg;
  expect((make('venn').match(/class="venn"/g) ?? []).length).toBe(3);
  expect(make('upset')).not.toContain('class="venn"');
});

test('vertical ladder stacks the steps top to bottom in one column', () => {
  const { svg } = ladder({ ...base, id: 'ch-n', title, desc, steps, highlight: 1, orientation: 'vertical' });
  const at = ['01 Minimal risk', '02 Transparency', '03 High risk'].map((l) => textAt(svg, l)!);
  expect(new Set(at.map((p) => p.x)).size, 'one column').toBe(1);
  expect(at[0].y < at[1].y && at[1].y < at[2].y, 'top to bottom').toBe(true);
});

test('narrow ranked bars put each label above its bar, wide ones beside it', () => {
  const barTop = (svg: string, label: string) => Number(new RegExp(`<rect x="[\\d.]+" y="([\\d.]+)"[^>]*><title>${label}:`).exec(svg)![1]);
  const wide = rankedBars({ ...base, id: 'ch-w', title, desc, unit: 'clauses', items: ranked }).svg;
  const narrow = rankedBars({ ...base, id: 'ch-n', title, desc, unit: 'clauses', items: ranked, width: 340 }).svg;
  for (const { label } of ranked) {
    expect(textAt(narrow, label)!.y, `${label} above its bar`).toBeLessThan(barTop(narrow, label));
    expect(textAt(wide, label)!.y, `${label} beside its bar`).toBeGreaterThan(barTop(wide, label));
  }
});

test('vertical lanes fit the real enforcement-point labels at 340 and list each item in every lane it acts in', () => {
  const columns = laneColumns.map((c) => ({ key: c.key, label: enforcementLabels[c.key as keyof typeof enforcementLabels] }));
  const narrow = lanes({ ...base, id: 'ch-n', title, desc, rowHeader: 'Control', columns, rows: laneRows, orientation: 'vertical' });
  expect(narrow.width).toBe(340);
  for (const c of laneColumns) {
    // Each lane heads its own band with its full label, from the left edge.
    expect(narrow.svg).toMatch(new RegExp(`<text x="12" y="[\\d.]+" font-size="13" font-weight="600">${c.key}:`));
  }
  expect((narrow.svg.match(/>Registry entry required<\/text>/g) ?? []).length, 'once per lane it acts in').toBe(2);
});
