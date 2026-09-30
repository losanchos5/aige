// chart-primitives.spec.ts: the contract of the build-time chart kit
// (src/lib/charts/) that the page visuals of waves 1 and 2 rely on, checked
// on the modules directly (pure Node, no browser): the same input gives the
// same SVG; the SVG carries the accessible shell (role, <title>, <desc>) and
// its provenance lines, no hex colour and no em dash; every class it emits is
// styled in both style modes (figures.css for .figc, chart.css for .chart);
// the table holds exactly the input data; a label that cannot fit throws,
// naming it; scales keep at most six round ticks and bars start at zero; the
// narrow variant is a different drawing of the same data. Runs in `default`.
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
  rows: Cell[][];
}

const yesNo = (item: { sets: string[] }) => sets.map((s) => (item.sets.includes(s.key) ? 'Yes' : 'No'));

const CASES: Case[] = [
  {
    name: 'dotMatrix',
    make: (id) => dotMatrix({ ...base, id, title, desc, groups: dotGroups, unit: 'controls' }),
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
    rows: [
      ['EU AI Act', 50],
      ['GDPR', 15],
      ['China', 9],
    ],
  },
  {
    name: 'lollipop',
    make: (id) => lollipop({ ...base, id, title, desc, unit: 'clauses', items: ranked, sort: 'none' }),
    rows: ranked.map((i) => [i.label, i.value]),
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
    rows: [
      ['Policy engines', 5, 3, 8],
      ['Eval harnesses', 7, 0, 7],
    ],
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
    rows: moves.map((m) => [m.label, m.from, m.to]),
  },
  {
    name: 'beeswarm',
    make: (id) => beeswarm({ ...base, ...timeDomain, id, title, desc, points }),
    rows: points.map((p) => [p.date, p.label, p.status]),
  },
  {
    name: 'timeStrip',
    make: (id) => timeStrip({ ...base, ...timeDomain, id, title, desc, events: points }),
    rows: points.map((p) => [p.date, p.label, p.status]),
  },
  {
    name: 'timeLanes',
    make: (id) => timeLanes({ ...base, ...timeDomain, id, title, desc, lanes: timeLaneData }),
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
    expect(first.svg).not.toContain('—');
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

// ---- 2. the table holds exactly the input data -----------------------------
for (const c of CASES) {
  test(`${c.name}: the table rows are the input data`, () => {
    const { table } = c.make('ch-t');
    expect(table.rows).toEqual(c.rows);
    for (const row of table.rows) expect(row).toHaveLength(table.columns.length);
    expect(table.caption).toBe(title);
  });
}

// ---- 3. labels that cannot fit (or break the copy rules) throw -------------
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
    run: () => ladder({ ...base, id: 'ch-x', title, desc, steps: [{ label: 'Low — minimal' }, { label: 'High' }] }),
    label: /label "Low — minimal" contains an em dash/,
  },
  {
    name: 'a dated point outside the time domain',
    run: () => beeswarm({ ...base, ...timeDomain, id: 'ch-x', title, desc, points: [{ date: '2035-01-01', label: 'Later' }] }),
    label: /"2035-01-01" falls outside/,
  },
];

for (const t of THROWS) {
  test(`throws, naming the culprit, for ${t.name}`, () => {
    expect(t.run).toThrow(t.label);
  });
}

// ---- 4. scales -------------------------------------------------------------
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

test('heat cells stay at or under 0.38 fill-opacity, so ink numbers on them keep contrast', () => {
  const { svg } = heatGrid({ ...base, id: 'ch-h', title, desc, rowHeader: 'Country', unit: 'entries', ...heat });
  const alphas = [...svg.matchAll(/fill-opacity="([\d.]+)"/g)].map((m) => Number(m[1]));
  expect(alphas.length).toBeGreaterThan(0);
  expect(Math.max(...alphas)).toBeLessThanOrEqual(0.38);
});

// ---- 5. the narrow variant: another drawing of the same data ---------------
const PAIRS: { name: string; wide: () => ChartOutput; narrow: () => ChartOutput; time?: true }[] = [
  {
    name: 'beeswarm (vertical)',
    time: true,
    wide: () => beeswarm({ ...base, ...timeDomain, id: 'ch-w', title, desc, points }),
    narrow: () => beeswarm({ ...base, ...timeDomain, id: 'ch-n', title, desc, points, orientation: 'vertical' }),
  },
  {
    name: 'time strip (vertical)',
    time: true,
    wide: () => timeStrip({ ...base, ...timeDomain, id: 'ch-w', title, desc, events: points }),
    narrow: () => timeStrip({ ...base, ...timeDomain, id: 'ch-n', title, desc, events: points, orientation: 'vertical' }),
  },
  {
    name: 'time lanes (vertical)',
    time: true,
    wide: () => timeLanes({ ...base, ...timeDomain, id: 'ch-w', title, desc, lanes: timeLaneData }),
    narrow: () => timeLanes({ ...base, ...timeDomain, id: 'ch-n', title, desc, lanes: timeLaneData, orientation: 'vertical' }),
  },
  {
    name: 'Venn3 (UpSet)',
    wide: () => venn3({ ...base, id: 'ch-w', title, desc, unit: 'topics', sets, items: vennItems, layout: 'venn' }),
    narrow: () => venn3({ ...base, id: 'ch-n', title, desc, unit: 'topics', sets, items: vennItems, layout: 'upset' }),
  },
  {
    name: 'ladder (vertical)',
    wide: () => ladder({ ...base, id: 'ch-w', title, desc, steps, highlight: 1 }),
    narrow: () => ladder({ ...base, id: 'ch-n', title, desc, steps, highlight: 1, orientation: 'vertical' }),
  },
  {
    name: 'ranked bars (labels above the bars)',
    wide: () => rankedBars({ ...base, id: 'ch-w', title, desc, unit: 'clauses', items: ranked }),
    narrow: () => rankedBars({ ...base, id: 'ch-n', title, desc, unit: 'clauses', items: ranked, width: 340 }),
  },
];

for (const p of PAIRS) {
  test(`${p.name}: the narrow variant redraws the same data within 340 units`, () => {
    const wide = p.wide();
    const narrow = p.narrow();
    expect(narrow.table).toEqual(wide.table);
    expect(narrow.width).toBeLessThanOrEqual(340);
    const body = (svg: string) => svg.replace(/^<svg[^>]*>/, '').replace(/ch-[wn]/g, 'ch-x');
    expect(body(narrow.svg), 'a different drawing').not.toBe(body(wide.svg));
    if (p.time) {
      // Time runs left to right on the wide variant, top to bottom on the narrow.
      const axis = (svg: string) => /<line class="axis" x1="([\d.]+)" y1="([\d.]+)" x2="([\d.]+)" y2="([\d.]+)"/.exec(svg)!.slice(1).map(Number);
      const [wx1, wy1, wx2, wy2] = axis(wide.svg);
      const [nx1, ny1, nx2, ny2] = axis(narrow.svg);
      expect(wy1 === wy2 && wx2 > wx1, 'wide axis is horizontal').toBe(true);
      expect(nx1 === nx2 && ny2 > ny1, 'narrow axis is vertical').toBe(true);
    }
  });
}
