// chart-primitives.spec.ts: the contract of the build-time chart kit
// (src/lib/charts/) that the page visuals of waves 1 and 2 rely on, checked
// on the modules directly (pure Node; only the pointer-target sizes are
// measured in a browser, from the SVG alone): the same input gives the
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
  bookSpine,
  bowTie,
  concentricRings,
  controlChain,
  divergingBars,
  dotMatrix,
  dumbbell,
  flow,
  heatGrid,
  ladder,
  lanes,
  lifecycleRing,
  linearScale,
  lollipop,
  NARROW_WIDTH,
  progressRing,
  rankedBars,
  relationRadial,
  stacked100,
  stackedBars,
  timeLanes,
  timeStrip,
  treemap,
  venn3,
  type Cell,
  type ChartOutput,
  type RelationFamily,
  type SpinePart,
  type TreemapGroup,
} from '../src/lib/charts';
import { enforcementLabels } from '../src/data/policy-card';
import { harms, levelLabel, levelOrder, mitDomains } from '../src/data/harms';
import { frameworks, obligations, type FrameworkType } from '../src/data/frameworks';
import { chapterParts, chaptersOrdered } from '../src/data/chapters';

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
const families: RelationFamily[] = [
  {
    label: 'Patterns',
    layered: true,
    items: [
      { label: 'Policy card', tone: 1, strength: 'related' },
      { label: 'Eval gate in CI', tone: 3, href: '/patterns/eval-gate-in-ci' },
    ],
  },
  { label: 'ISO 42001', items: [{ label: 'A.6.2.4', strength: 'related' }, { label: 'A.6.2.6' }] },
  { label: 'Cases', items: [{ label: 'Chatbot refund', name: 'Chatbot refund policy case', href: '/cases/chatbot' }] },
];
const bow = {
  preventive: [{ label: 'Eval gate in CI', href: '/patterns/eval-gate-in-ci' }],
  event: [{ label: 'Chatbot invents a refund policy' }],
  detective: [{ label: 'Output monitoring' }],
  responsive: [],
  harms: [{ label: 'Financial loss' }],
  evidence: [
    { label: 'Eval report', layer: 3 as const },
    { label: 'Incident record', layer: 5 as const },
  ],
};
const anatomy = {
  failureModes: [{ label: 'Unsigned model deployed' }],
  enforcement: ['deploy', 'runtime'] as ('deploy' | 'runtime')[],
  verification: [{ label: 'Test' }],
  decision: { label: 'To be specified', state: 'hatched' as const },
  evidence: [{ label: 'Admission record', layer: 4 as const, href: '/resources/templates#schema-admission' }],
};

// Flow, rings, treemap and spine (wave 3).
const flowColumns = [
  { key: 'p', label: 'Profile' },
  { key: 'f', label: 'Framework' },
];
const flowNodes = [
  { id: 'ar', column: 'p', label: 'Agent runtime', href: '/controls/agent-runtime' },
  { id: 'ev', column: 'p', label: 'Evals' },
  { id: 'eu', column: 'f', label: 'EU AI Act' },
  { id: 'iso', column: 'f', label: 'ISO 42001', name: 'ISO/IEC 42001 Annex A' },
  { id: 'asi', column: 'f', label: 'OWASP ASI' },
];
const flowLinks = [
  { from: 'ar', to: 'eu', value: 5 },
  { from: 'ar', to: 'asi', value: 9 },
  { from: 'ev', to: 'eu', value: 3 },
  { from: 'ev', to: 'iso', value: 4 },
];
const flowInput = { columns: flowColumns, nodes: flowNodes, links: flowLinks, unit: 'pairs', order: 'input' as const };
const flowRows = [
  ['Agent runtime', 'EU AI Act', 5],
  ['Agent runtime', 'OWASP ASI', 9],
  ['Evals', 'EU AI Act', 3],
  ['Evals', 'ISO/IEC 42001 Annex A', 4],
];
const ringInput = {
  rings: [
    { key: 'individual', label: 'Individual' },
    { key: 'organisation', label: 'Organisation', href: '/resources/harms#organisation' },
    { key: 'society', label: 'Society' },
  ],
  sectors: [
    { key: 'privacy', label: 'Privacy' },
    { key: 'misuse', label: 'Misuse' },
    { key: 'safety', label: 'System safety' },
  ],
  marks: [
    { label: 'Re-identification', ring: 'individual', sector: 'privacy', tone: 2 as const, href: '/resources/harms#harm-reid' },
    { label: 'Data breach', ring: 'organisation', sector: 'privacy', tone: 2 as const },
    { label: 'Model theft', ring: 'organisation', sector: 'privacy', tone: 4 as const, state: 'hatched' as const, status: 'To be specified' },
    { label: 'Fraud at scale', ring: 'society', sector: 'misuse', tone: 4 as const },
    { label: 'Outage', ring: 'organisation', sector: 'safety', shape: 'square' as const, tone: 3 as const },
  ],
  centre: { label: 'Harm' },
};
const ringRows = ringInput.marks.map((m) => [
  m.label,
  ringInput.rings.find((r) => r.key === m.ring)!.label,
  ringInput.sectors.find((s) => s.key === m.sector)!.label,
  `Layer 0${m.tone}`,
  m.status ?? '',
]);
const lifecycleInput = {
  stages: [
    { key: 'build', label: 'Build' },
    { key: 'test', label: 'Test' },
    { key: 'operate', label: 'Operate', href: '/resources/templates#operate' },
  ],
  nodes: [
    { label: 'model-card', stage: 'build', size: 40, fill: 0.25, href: '/resources/templates#schema-model-card' },
    { label: 'eval-report', stage: 'test', size: 10, fill: 1 },
    { label: 'incident-record', stage: 'operate', size: 22, fill: 0.5 },
  ],
  centre: { label: 'Whole organisation', nodes: [{ label: 'policy-card', size: 16, fill: 0 }] },
  sizeLabel: 'Fields',
  fillLabel: 'Required (%)',
};
const lifecycleRows = [
  ['Build', 'model-card', 40, 25],
  ['Test', 'eval-report', 10, 100],
  ['Operate', 'incident-record', 22, 50],
  ['Whole organisation', 'policy-card', 16, 0],
];
const progressItems = [
  { key: 'foundations', label: 'Foundations', done: 3, total: 8 },
  { key: 'proof', label: 'Proof', done: 0, total: 0 },
  { key: 'total', label: 'Total', done: 5, total: 12 },
];
const pctOf = (p: { done: number; total: number }) => (p.total ? Math.round((100 * p.done) / p.total) : 0);
const tmGroups: TreemapGroup[] = [
  {
    label: 'Law',
    href: '/resources/frameworks#law',
    items: [
      { label: 'EU AI Act', value: 50, href: '/resources/frameworks#fw-eu-ai-act' },
      { label: 'GDPR', value: 15, state: 'hatched', status: 'Draft' },
    ],
  },
  { label: 'Standard', items: [{ label: 'ISO 42001', value: 20, fill: 0.5 }] },
];
const tmRows = [
  ['Law', 'EU AI Act', 50, '', ''],
  ['Law', 'GDPR', 15, '', 'Draft'],
  ['Standard', 'ISO 42001', 20, 50, ''],
];
const spineParts: SpinePart[] = [
  {
    label: 'The discipline',
    chapters: [
      { num: 0, label: 'Preface', value: 6, href: '/bok/preface', marks: [{ shape: 'circle', label: 'Infographic', count: 2 }] },
      { num: 1, label: 'Definition', value: 11, marks: [{ shape: 'square', label: 'Data-viz', count: 1 }], highlight: true },
    ],
  },
  { label: 'Reference', chapters: [{ num: 8, label: 'Regulatory Map', value: 24, href: '/bok/regulatory-map' }] },
];
const spineBarRows = [
  ['The discipline', '00 Preface', 6, 'No'],
  ['The discipline', '01 Definition', 11, 'Yes'],
  ['Reference', '08 Regulatory Map', 24, 'No'],
];
const spineDotRows = [
  ['The discipline', '00 Preface', 2, 0, 2, 'No'],
  ['The discipline', '01 Definition', 0, 1, 1, 'Yes'],
  ['Reference', '08 Regulatory Map', 0, 0, 0, 'No'],
];
const spineMiniRows = spineBarRows.map((r) => [r[0], r[1], r[3]]);

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
  {
    name: 'relationRadial',
    make: (id) => relationRadial({ ...base, id, title, desc, centre: { label: 'Art. 15 Accuracy' }, families })!,
    marks: 1,
    // Core before related, then by label, inside each family.
    rows: [
      ['Patterns', 'Eval gate in CI', 'Core'],
      ['Patterns', 'Policy card', 'Related'],
      ['ISO 42001', 'A.6.2.6', 'Core'],
      ['ISO 42001', 'A.6.2.4', 'Related'],
      ['Cases', 'Chatbot refund policy case', 'Core'],
    ],
  },
  {
    name: 'bowTie',
    make: (id) => bowTie({ ...base, id, title, desc, ...bow }),
    // The empty responsive stage is left out.
    rows: [
      ['Preventive', 'Eval gate in CI', ''],
      ['Failure mode', 'Chatbot invents a refund policy', ''],
      ['Detective', 'Output monitoring', ''],
      ['Harms', 'Financial loss', ''],
      ['Evidence', 'Eval report', 'Layer 03'],
      ['Evidence', 'Incident record', 'Layer 05'],
    ],
  },
  {
    name: 'controlChain',
    make: (id) => controlChain({ ...base, id, title, desc, ...anatomy }),
    rows: [
      ['Failure modes', 'Unsigned model deployed', ''],
      ['Enforcement', 'deploy', ''],
      ['Enforcement', 'runtime', ''],
      ['Verification', 'Test', ''],
      ['Decision', 'To be specified', ''],
      ['Evidence', 'Admission record', 'Layer 04'],
    ],
  },
  {
    name: 'flow',
    make: (id) => flow({ ...base, id, title, desc, ...flowInput }),
    rows: flowRows,
  },
  {
    name: 'flow (narrow)',
    make: (id) => flow({ ...base, id, title, desc, ...flowInput, layout: 'narrow' }),
    rows: flowRows,
  },
  {
    name: 'concentricRings',
    make: (id) => concentricRings({ ...base, id, title, desc, ...ringInput }),
    marks: 1,
    rows: ringRows,
  },
  {
    name: 'concentricRings (narrow)',
    make: (id) => concentricRings({ ...base, id, title, desc, ...ringInput, layout: 'narrow' }),
    marks: 1,
    rows: ringRows,
  },
  {
    name: 'lifecycleRing',
    make: (id) => lifecycleRing({ ...base, id, title, desc, ...lifecycleInput }),
    marks: 1,
    rows: lifecycleRows,
  },
  {
    name: 'lifecycleRing (list)',
    make: (id) => lifecycleRing({ ...base, id, title, desc, ...lifecycleInput, layout: 'list' }),
    marks: 1,
    rows: lifecycleRows,
  },
  {
    name: 'progressRing',
    make: (id) => progressRing({ ...base, id, title, desc, items: progressItems }),
    rows: progressItems.map((p) => [p.label, p.done, p.total, pctOf(p)]),
  },
  {
    name: 'treemap',
    make: (id) => treemap({ ...base, id, title, desc, groups: tmGroups, unit: 'obligations' }),
    rows: tmRows,
  },
  {
    name: 'treemap (narrow)',
    make: (id) => treemap({ ...base, id, title, desc, groups: tmGroups, unit: 'obligations', layout: 'narrow' }),
    rows: tmRows,
  },
  {
    name: 'bookSpine',
    make: (id) => bookSpine({ ...base, id, title, desc, parts: spineParts, encoding: 'bars', unit: 'min' }),
    marks: 1,
    rows: spineBarRows,
  },
  {
    name: 'bookSpine (vertical)',
    make: (id) => bookSpine({ ...base, id, title, desc, parts: spineParts, encoding: 'bars', unit: 'min', orientation: 'vertical' }),
    marks: 1,
    rows: spineBarRows,
  },
  {
    name: 'bookSpine (dots)',
    make: (id) => bookSpine({ ...base, id, title, desc, parts: spineParts, encoding: 'dots', unit: 'figures' }),
    marks: 1,
    rows: spineDotRows,
  },
  {
    name: 'bookSpine (mini)',
    make: (id) => bookSpine({ ...base, id, title, desc, parts: spineParts, unit: 'figures', mini: true }),
    marks: 1,
    rows: spineMiniRows,
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
    name: 'a radial node label wider than its row',
    run: () => relationRadial({ ...base, id: 'ch-x', title, desc, width: 340, centre: { label: 'Centre' }, families: [{ label: 'Cases', items: [{ label: LONG }, { label: 'B' }, { label: 'C' }] }] }),
    label: new RegExp(`label "${LONG}"`),
  },
  {
    name: 'a layer tone in a family that is not layered',
    run: () => relationRadial({ ...base, id: 'ch-x', title, desc, centre: { label: 'Centre' }, families: [{ label: 'Cases', items: [{ label: 'A', tone: 2 }, { label: 'B' }, { label: 'C' }] }] }),
    label: /family "Cases" is not layered/,
  },
  {
    name: 'a bow-tie item past two lines',
    run: () => bowTie({ ...base, id: 'ch-x', title, desc, ...bow, event: [{ label: `${LONG} ${LONG}` }] }),
    label: /label ".*Extraordinarily/,
  },
  {
    name: 'a flow column of ten nodes (the caller groups the tail)',
    run: () =>
      flow({
        ...base,
        id: 'ch-x',
        title,
        desc,
        ...flowInput,
        nodes: [...flowNodes, ...Array.from({ length: 7 }, (_, i) => ({ id: `x${i}`, column: 'f', label: `Clause ${i}` }))],
        links: [...flowLinks, ...Array.from({ length: 7 }, (_, i) => ({ from: 'ev', to: `x${i}`, value: 1 }))],
      }),
    label: /column "Framework" has 10 nodes, at most 9 fit/,
  },
  {
    name: 'a ring cell that cannot hold its marks',
    run: () =>
      concentricRings({
        ...base,
        id: 'ch-x',
        title,
        desc,
        ...ringInput,
        layout: 'narrow',
        marks: Array.from({ length: 40 }, (_, i) => ({ label: `Harm ${i}`, ring: 'individual', sector: 'privacy' })),
      }),
    label: /40 marks do not fit ring "Individual", sector "Privacy"/,
  },
  {
    name: 'a treemap item without a positive value',
    run: () => treemap({ ...base, id: 'ch-x', title, desc, unit: 'obligations', groups: [{ label: 'Law', items: [{ label: 'GDPR', value: 0 }] }] }),
    label: /item "GDPR" has value 0/,
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
  expect(strip.svg).toContain('>A fecha de 2026-09-30<');
  const bell = dumbbell({ ...es, id: 'ch-d', fromLabel: 'Fecha original', toLabel: 'Nueva fecha', today: '2026-09-30', items: moves });
  expect(bell.svg).toContain('>A fecha de 2026-09-30<');
  expect(bell.table.columns[0]).toBe('Elemento');
  const grid = heatGrid({ ...es, id: 'ch-h', rowHeader: 'País', unit: 'entradas', marginals: true, ...heat });
  expect(grid.table.rows[0]).toEqual(['Spain', 3, 0, 'no aplica', 3]);
  expect(grid.svg).toContain('<title>Spain: 3 entradas en total</title>');
  expect(grid.svg).not.toMatch(/not applicable|in total|Source:|As of/);
  expect(flow({ ...es, id: 'ch-f', ...flowInput }).table.columns.slice(0, 2)).toEqual(['Origen', 'Destino']);
  expect(concentricRings({ ...es, id: 'ch-g', ...ringInput }).table.columns).toEqual(['Elemento', 'Anillo', 'Sector', 'Capa', 'Estado']);
  expect(bookSpine({ ...es, id: 'ch-k', parts: spineParts, unit: 'min' }).table.columns).toEqual(['Parte', 'Capítulo', 'Min', 'Destacado']);
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

// ---- the as-of mark: one helper for every time chart ------------------------
test('timeStrip, beeswarm, timeLanes and dumbbell draw the same as-of mark from the input date, in both orientations and languages', () => {
  // A date unlike the stamp's (base.asOf) and far from the build clock, so
  // the mark can only come from the input.
  const asOf = '2021-03-15';
  const dom = { from: timeDomain.from, to: timeDomain.to, today: asOf };
  for (const lang of ['en', 'es'] as const) {
    const common = { ...base, lang, title, desc };
    const charts: [string, ChartOutput][] = [
      ['timeStrip', timeStrip({ ...common, ...dom, id: 'ch-s', events: points })],
      ['timeStrip vertical', timeStrip({ ...common, ...dom, id: 'ch-s', events: points, orientation: 'vertical' })],
      ['beeswarm', beeswarm({ ...common, ...dom, id: 'ch-b', points })],
      ['beeswarm vertical', beeswarm({ ...common, ...dom, id: 'ch-b', points, orientation: 'vertical' })],
      ['timeLanes', timeLanes({ ...common, ...dom, id: 'ch-l', lanes: timeLaneData })],
      ['timeLanes vertical', timeLanes({ ...common, ...dom, id: 'ch-l', lanes: timeLaneData, orientation: 'vertical' })],
      ['dumbbell', dumbbell({ ...common, id: 'ch-d', fromLabel: 'From', toLabel: 'To', domain: [dom.from, dom.to] as [string, string], today: asOf, items: moves })],
      ['dumbbell narrow', dumbbell({ ...common, id: 'ch-d', fromLabel: 'From', toLabel: 'To', domain: [dom.from, dom.to] as [string, string], today: asOf, items: moves, width: NARROW_WIDTH })],
    ];
    const label = `${lang === 'es' ? 'A fecha de' : 'As of'} ${asOf}`;
    for (const [name, chart] of charts) {
      const els = parseSvg(chart.svg);
      const marks = els.filter((e) => e.tag === 'text' && e.text === label);
      expect(marks.map((e) => e.attr.class), `${name} (${lang}): one "${label}" in mono`).toEqual(['mono']);
      expect(els.some((e) => (e.tag === 'line' || e.tag === 'path') && e.attr.class === 'today'), `${name} (${lang}): a dashed today line`).toBe(true);
    }
  }
});

test('Venn3 upset layout draws bars, not circles', () => {
  const make = (layout: 'venn' | 'upset') => venn3({ ...base, id: 'ch-v', title, desc, unit: 'topics', sets, items: vennItems, layout }).svg;
  expect((make('venn').match(/class="venn"/g) ?? []).length).toBe(3);
  expect(make('upset')).not.toContain('class="venn"');
});

test('Venn3 euler layout nests strictly nested sets with no empty region, and is the Venn otherwise', () => {
  const make = (layout: 'venn' | 'euler', items: { label: string; sets: string[] }[]) =>
    venn3({ ...base, id: 'ch-v', title, desc, unit: 'topics', sets, items, layout }).svg;
  // ISO inside NIST inside the EU AI Act, each ring holding one topic.
  const nested = [
    { label: 'Risk management', sets: ['eu', 'iso', 'nist'] },
    { label: 'Measurement', sets: ['eu', 'nist'] },
    { label: 'CE marking', sets: ['eu'] },
    { label: 'Unfiled topic', sets: [] },
  ];
  const svg = make('euler', nested);
  expect((svg.match(/<ellipse class="venn"/g) ?? []).length).toBe(3);
  expect(svg).not.toContain('<circle class="venn"');
  const counts = [...svg.matchAll(/class="disp num">(\d+)<title>([^<:]+):/g)].map((m) => [m[2], Number(m[1])]);
  expect(counts).toEqual([
    ['EU AI Act only', 1],
    ['EU AI Act and NIST AI RMF only', 1],
    ['All three', 1],
  ]);
  // Not nested, or two sets alike (an empty ring): the Venn, unchanged.
  const alike = nested.map((i) => (i.label === 'Measurement' ? { ...i, sets: ['eu', 'iso', 'nist'] } : i));
  for (const items of [vennItems, alike]) {
    expect(make('euler', items)).toBe(make('venn', items));
  }
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

test('vertical lanes fit the real enforcement-point labels at the narrow width and list each item in every lane it acts in', () => {
  const columns = laneColumns.map((c) => ({ key: c.key, label: enforcementLabels[c.key as keyof typeof enforcementLabels] }));
  const narrow = lanes({ ...base, id: 'ch-n', title, desc, rowHeader: 'Control', columns, rows: laneRows, orientation: 'vertical' });
  expect(narrow.width).toBe(NARROW_WIDTH);
  for (const c of laneColumns) {
    // Each lane heads its own band with its full label, from the left edge.
    expect(narrow.svg).toMatch(new RegExp(`<text x="12" y="[\\d.]+" font-size="13" font-weight="600">${c.key}:`));
  }
  expect((narrow.svg.match(/>Registry entry required<\/text>/g) ?? []).length, 'once per lane it acts in').toBe(2);
});

// ---- 7. the per-item primitives: radial and chains ------------------------
test('relationRadial draws nothing under three relations, so the page keeps its lists', () => {
  const make = (n: number) =>
    relationRadial({ ...base, id: 'ch-r', title, desc, centre: { label: 'Centre' }, families: [{ label: 'Cases', items: families[1].items.concat(families[2].items).slice(0, n) }] });
  expect(make(2)).toBeNull();
  expect(make(3)).not.toBeNull();
});

/** One element of an SVG: tag, attributes, parent (index, -1 at the root)
 *  and its own text. */
interface SvgEl {
  tag: string;
  attr: Record<string, string>;
  parent: number;
  text: string;
}
const unescape = (t: string) => t.replace(/&lt;/g, '<').replace(/&gt;/g, '>').replace(/&quot;/g, '"').replace(/&#39;/g, "'").replace(/&amp;/g, '&');
/** The SVG's elements in document order, parsed once, so the checks below
 *  read elements, classes and parents, not the order of the serialisation. */
function parseSvg(svg: string): SvgEl[] {
  const els: SvgEl[] = [];
  const open: number[] = [];
  for (const m of svg.matchAll(/<(\/?)([a-zA-Z]+)((?:\s+[^\s=>/]+="[^"]*")*)\s*(\/?)>|([^<]+)/g)) {
    if (m[5] !== undefined) {
      if (open.length) els[open[open.length - 1]].text += unescape(m[5]);
    } else if (m[1]) {
      open.pop();
    } else {
      const attr = Object.fromEntries([...m[3].matchAll(/([^\s=]+)="([^"]*)"/g)].map((a) => [a[1], unescape(a[2])]));
      els.push({ tag: m[2], attr, parent: open.length ? open[open.length - 1] : -1, text: '' });
      if (!m[4]) open.push(els.length - 1);
    }
  }
  return els;
}
const titleOf = (els: SvgEl[], i: number) => els.find((e) => e.parent === i && e.tag === 'title')?.text;

/** Each node's drawing, keyed by its <title> (linked nodes carry it on the <a>). */
const radialNodes = (svg: string) => {
  const els = parseSvg(svg);
  const nodes = new Map<string, { state: string; tone: number }>();
  els.forEach((e, i) => {
    const m = e.tag === 'circle' ? /^mk mk-(\w+)-(\d)$/.exec(e.attr.class ?? '') : null;
    const name = m && (titleOf(els, i) ?? (els[e.parent]?.tag === 'a' ? titleOf(els, e.parent) : undefined));
    if (m && name) nodes.set(name, { state: m[1], tone: Number(m[2]) });
  });
  return nodes;
};
/** Straight segments drawn by the edge path of class `cls`. */
const edges = (svg: string, cls: string) =>
  (parseSvg(svg).find((e) => e.tag === 'path' && e.attr.class === cls)?.attr.d.match(/L/g) ?? []).length;
/** Closed four-point paths shaped as a rhombus (top, right, bottom, left). */
const diamondsIn = (svg: string) =>
  parseSvg(svg).filter((e) => {
    if (e.tag !== 'path' || !/Z\s*$/.test(e.attr.d ?? '') || /[CQAHV]/i.test(e.attr.d)) return false;
    const pts = [...e.attr.d.matchAll(/[ML]\s*([\d.]+)[\s,]+([\d.]+)/g)].map((m) => [Number(m[1]), Number(m[2])]);
    return pts.length === 4 && pts[0][0] === pts[2][0] && pts[1][1] === pts[3][1] && pts[1][0] > pts[3][0] && pts[2][1] > pts[0][1];
  }).length;

for (const layout of ['radial', 'list'] as const) {
  test(`relationRadial (${layout}): core relations are solid edges to filled nodes, related ones dashed to outlined nodes, layer tone only in a layered family`, () => {
    const { svg } = relationRadial({ ...base, id: 'ch-r', title, desc, centre: { label: 'Centre' }, families, layout })!;
    const nodes = radialNodes(svg);
    const all = families.flatMap((f) => f.items.map((item) => ({ f, item })));
    for (const { f, item } of all) {
      const related = item.strength === 'related';
      const drawn = nodes.get(`${item.name ?? item.label} · ${related ? 'Related' : 'Core'}`);
      expect(drawn, item.label).toEqual({ state: related ? 'line' : 'fill', tone: f.layered ? (item.tone ?? 0) : 0 });
    }
    expect(edges(svg, 'edge edge-dash'), 'one dashed edge per related relation').toBe(all.filter((x) => x.item.strength === 'related').length);
    expect(edges(svg, 'edge'), 'one solid edge per core relation').toBe(all.filter((x) => x.item.strength !== 'related').length);
  });
}

test('relationRadial: the wide variant sets the sectors either side of the centre, the narrow one stacks them in one column at 12 px or more', () => {
  const nodeXs = (svg: string) => new Set([...svg.matchAll(/<circle cx="([\d.]+)"[^>]*r="5.5"/g)].map((m) => m[1]));
  const wide = relationRadial({ ...base, id: 'ch-w', title, desc, centre: { label: 'Centre' }, families })!;
  const narrow = relationRadial({ ...base, id: 'ch-n', title, desc, width: 340, centre: { label: 'Centre' }, families })!;
  expect(nodeXs(wide.svg).size, 'two sides').toBe(2);
  expect(nodeXs(narrow.svg).size, 'one column').toBe(1);
  expect(narrow.width).toBe(340);
  const sizes = [...narrow.svg.matchAll(/font-size="([\d.]+)"/g)].map((m) => Number(m[1]));
  expect(Math.min(...sizes)).toBeGreaterThanOrEqual(12);
  expect(narrow.table).toEqual(wide.table);
});

const CHAINS: { name: string; make: (id: string, orientation: 'row' | 'column') => ChartOutput; layer: number; kickers: string[] }[] = [
  {
    name: 'bowTie',
    make: (id, orientation) => bowTie({ ...base, id, title, desc, ...bow, orientation }),
    layer: bow.evidence[0].layer,
    kickers: ['Preventive', 'Failure mode', 'Detective', 'Harms', 'Evidence'],
  },
  {
    name: 'controlChain',
    make: (id, orientation) => controlChain({ ...base, id, title, desc, ...anatomy, orientation }),
    layer: anatomy.evidence[0].layer,
    kickers: ['Failure modes', 'Enforcement', 'Verification', 'Decision', 'Evidence'],
  },
];

for (const c of CHAINS) {
  test(`${c.name}: the evidence is the terminal panel, with the document-with-check glyph in its layer colour, and the figure has one diamond`, () => {
    for (const orientation of ['row', 'column'] as const) {
      const { svg } = c.make('ch-e', orientation);
      const panels = [...svg.matchAll(/<rect class="(panel|panel-end)" x="([\d.]+)" y="([\d.]+)" width="([\d.]+)" height="([\d.]+)"/g)].map((m) => ({
        cls: m[1],
        x: Number(m[2]),
        y: Number(m[3]),
        w: Number(m[4]),
        h: Number(m[5]),
      }));
      const last = panels[panels.length - 1];
      expect(panels.filter((p) => p.cls === 'panel-end'), orientation).toEqual([last]);
      expect(orientation === 'row' ? Math.max(...panels.map((p) => p.x)) : Math.max(...panels.map((p) => p.y)), 'last in reading order').toBe(orientation === 'row' ? last.x : last.y);
      const check = new RegExp(String.raw`<path class="glyph-check l${c.layer}-st" d="[^"]+" transform="translate\(([\d.]+) ([\d.]+)\)"`).exec(svg);
      expect(check, 'layer-coloured check').not.toBeNull();
      const [gx, gy] = [Number(check![1]), Number(check![2])];
      expect(gx >= last.x && gx + 24 <= last.x + last.w && gy >= last.y && gy + 24 <= last.y + last.h, 'glyph inside the terminal panel').toBe(true);
      expect(diamondsIn(svg), 'the gate is the only diamond').toBe(1);
      // Every hatch the chart uses has its pattern in the chart's own <defs>.
      for (const m of svg.matchAll(/url\(#([^)]+)\)/g)) expect(svg).toContain(`<pattern id="${m[1]}"`);
    }
  });

  test(`${c.name}: the row reads left to right, the column (narrow) top to bottom`, () => {
    const row = c.make('ch-w', 'row');
    const column = c.make('ch-n', 'column');
    expect(column.width).toBe(NARROW_WIDTH);
    const at = (svg: string) => c.kickers.map((k) => textAt(svg, k)!);
    const r = at(row.svg);
    const col = at(column.svg);
    expect(new Set(r.map((p) => p.y)).size, 'one row').toBe(1);
    expect(r.every((p, i) => i === 0 || p.x > r[i - 1].x), 'left to right').toBe(true);
    expect(new Set(col.map((p) => p.x)).size, 'one column').toBe(1);
    expect(col.every((p, i) => i === 0 || p.y > col[i - 1].y), 'top to bottom').toBe(true);
    expect(column.table).toEqual(row.table);
  });
}

test('controlChain lights exactly the enforcement points it is given on the four-stage track', () => {
  const { svg } = controlChain({ ...base, id: 'ch-p', title, desc, ...anatomy });
  const els = parseSvg(svg);
  const STAGES = ['pre_merge', 'deploy', 'runtime', 'periodic'];
  // Each stage label and the mark drawn just before it in the same group.
  const stages = els.flatMap((e, i) => {
    if (e.tag !== 'text' || !STAGES.includes(e.text)) return [];
    const mark = els.slice(0, i).reverse().find((o) => o.parent === e.parent && o.tag !== 'title');
    return [{ stage: e.text, cls: mark?.attr.class ?? '' }];
  });
  expect(stages.map((x) => x.stage)).toEqual(STAGES);
  expect(stages.filter((x) => /(^| )mk-fill-/.test(x.cls)).map((x) => x.stage)).toEqual(anatomy.enforcement);
  expect(stages.filter((x) => /(^| )mk-line-/.test(x.cls)).map((x) => x.stage)).toEqual(STAGES.filter((k) => !anatomy.enforcement.includes(k as never)));
});

// ---- 8. flow, rings, treemap, spine and the cumulative ladder -------------
/** The <title> naming element i: its own, or its parent link's. */
const nameOf = (els: SvgEl[], i: number) => titleOf(els, i) ?? (els[els[i].parent]?.tag === 'a' ? titleOf(els, els[i].parent) : undefined);
const linkedEl = (els: SvgEl[], i: number) => els[els[i].parent]?.tag === 'a';

test("flow: each ribbon's thickness is its value on one scale and each node's ribbons tile its block, so the drawn sums per node are the table's", () => {
  const nodes3 = [...flowNodes, { id: 'pf', column: 't', label: 'promptfoo' }, { id: 'ga', column: 't', label: 'garak' }];
  const links3 = [
    ...flowLinks,
    { from: 'eu', to: 'pf', value: 6 },
    { from: 'eu', to: 'ga', value: 1 },
    { from: 'asi', to: 'ga', value: 9 },
    { from: 'iso', to: 'pf', value: 2 },
  ];
  const inputs = [flowInput, { ...flowInput, columns: [...flowColumns, { key: 't', label: 'Tool' }], nodes: nodes3, links: links3, order: 'barycentre' as const }];
  for (const input of inputs) {
    const { svg, table } = flow({ ...base, id: 'ch-f', title, desc, ...input });
    const els = parseSvg(svg);
    // Ribbon d: M x0 ya C xm ya xm yb x1 yb V yb2 C xm yb2 xm ya2 x0 ya2 Z.
    const ribbons = els.flatMap((e, i) => {
      if (e.tag !== 'path' || !/C/.test(e.attr.d ?? '')) return [];
      const m = /^(.+) to (.+): (\d+) /.exec(nameOf(els, i) ?? '')!;
      const n = e.attr.d.match(/-?[\d.]+/g)!.map(Number);
      return [{ from: m[1], to: m[2], value: Number(m[3]), x0: n[0], ya: n[1], x1: n[6], yb: n[7], t: n[8] - n[7], ya2: n[12] }];
    });
    expect(ribbons.map((r) => [r.from, r.to, r.value]).sort()).toEqual([...table.rows].sort());
    const k = ribbons.reduce((a, r) => a + r.t, 0) / ribbons.reduce((a, r) => a + r.value, 0);
    for (const r of ribbons) expect(Math.abs(r.t - r.value * k), `${r.from} to ${r.to}`).toBeLessThanOrEqual(0.15);
    const blocks = new Map(
      els.flatMap((e, i) => (e.tag === 'rect' && /panel|sk-node/.test(e.attr.class ?? '') ? [[nameOf(els, i)!.split(': ')[0], ['x', 'y', 'width', 'height'].map((a) => Number(e.attr[a]))]] : [])),
    );
    const sums = (side: 0 | 1) => {
      const out = new Map<string, number>();
      for (const row of table.rows) out.set(String(row[side]), (out.get(String(row[side])) ?? 0) + Number(row[2]));
      return out;
    };
    for (const [side, total] of [[0, sums(0)], [1, sums(1)]] as const) {
      for (const [node, sum] of total) {
        const [x, y, w, h] = blocks.get(node)!;
        const own = ribbons.filter((r) => (side ? r.to : r.from) === node).sort((a, b) => (side ? a.yb - b.yb : a.ya - b.ya));
        const spans = own.map((r) => (side ? [r.yb, r.yb + r.t] : [r.ya, r.ya2]));
        for (const r of own) expect(side ? r.x1 : r.x0, `${node} edge`).toBeCloseTo(side ? x : x + w, 0);
        expect(spans[0][0], `${node} inside its block`).toBeGreaterThanOrEqual(y - 0.15);
        expect(spans[spans.length - 1][1], `${node} inside its block`).toBeLessThanOrEqual(y + h + 0.15);
        spans.slice(1).forEach(([start], i) => expect(Math.abs(start - spans[i][1]), `${node} ribbons contiguous`).toBeLessThanOrEqual(0.15));
        expect(Math.abs(spans[spans.length - 1][1] - spans[0][0] - sum * k), `${node} sum`).toBeLessThanOrEqual(0.3);
      }
    }
  }
});

test('flow (narrow) lists each source with a bar per destination and draws no ribbon', () => {
  const { svg } = flow({ ...base, id: 'ch-n', title, desc, ...flowInput, layout: 'narrow' });
  const els = parseSvg(svg);
  expect(els.some((e) => e.tag === 'path' && /C/.test(e.attr.d ?? ''))).toBe(false);
  expect(els.filter((e) => e.tag === 'rect' && /^mk mk-fill-/.test(e.attr.class ?? ''))).toHaveLength(flowLinks.length);
});

test('concentricRings: every harm sits inside its level ring and its MIT domain sector, clear of every other mark, wide and narrow', () => {
  const rings = levelOrder.map((l) => ({ key: l, label: levelLabel[l] }));
  const sectors = Object.entries(mitDomains).map(([key, label]) => ({ key, label }));
  const domainOf = (h: (typeof harms)[number]) => h.mitTaxonomy[0].split('.')[0];
  const marks = harms.map((h) => ({ label: h.harmType, ring: h.level, sector: domainOf(h), tone: h.layerN[0], href: `/resources/harms#harm-${h.id}` }));
  for (const layout of ['wide', 'narrow'] as const) {
    const { svg } = concentricRings({ ...base, id: 'ch-g', title, desc, rings, sectors, marks, centre: { label: 'Harm' }, layout, width: layout === 'wide' ? 720 : undefined });
    const els = parseSvg(svg);
    const centre = els.find((e) => e.tag === 'circle' && e.attr.class === 'mk-hi')!;
    const [cx, cy, c0] = ['cx', 'cy', 'r'].map((a) => Number(centre.attr[a]));
    const edges = [c0, ...els.filter((e) => e.tag === 'circle' && /^rg-/.test(e.attr.class ?? '')).map((e) => Number(e.attr.r)).sort((a, b) => a - b)];
    const angle = (x: number, y: number) => (Math.atan2(x - cx, cy - y) + 2 * Math.PI) % (2 * Math.PI);
    const rule = els.find((e) => e.tag === 'path' && e.attr.class === 'rule')!;
    const bounds = [...rule.attr.d.matchAll(/L([\d.]+) ([\d.]+)/g)].map((m) => angle(Number(m[1]), Number(m[2])));
    const drawn = els.flatMap((e, i) => {
      if (!/^mk mk-/.test(e.attr.class ?? '')) return [];
      const x = e.tag === 'circle' ? Number(e.attr.cx) : Number(e.attr.x) + Number(e.attr.width) / 2;
      const y = e.tag === 'circle' ? Number(e.attr.cy) : Number(e.attr.y) + Number(e.attr.height) / 2;
      return [{ label: nameOf(els, i)!.split(' · ')[0], x, y }];
    });
    expect(drawn.map((d) => d.label).sort(), layout).toEqual(harms.map((h) => h.harmType).sort());
    for (const d of drawn) {
      const h = harms.find((x) => x.harmType === d.label)!;
      const ri = levelOrder.indexOf(h.level);
      const si = sectors.findIndex((x) => x.key === domainOf(h));
      const r = Math.hypot(d.x - cx, d.y - cy);
      const a = angle(d.x, d.y);
      expect(r > edges[ri] && r < edges[ri + 1], `${d.label} in ring ${h.level} (${layout})`).toBe(true);
      expect(a > bounds[si] && a < bounds[si + 1], `${d.label} in sector ${si + 1} (${layout})`).toBe(true);
    }
    for (const [i, p] of drawn.entries()) {
      for (const q of drawn.slice(i + 1)) expect(Math.hypot(p.x - q.x, p.y - q.y), `${p.label} / ${q.label}`).toBeGreaterThan(10);
    }
    // Drawn (so tabbed) from the inside out, then clockwise from the top.
    const order = drawn.map((d) => [levelOrder.indexOf(harms.find((x) => x.harmType === d.label)!.level), angle(d.x, d.y)]);
    order.slice(1).forEach(([ri, a], i) => {
      const [pr, pa] = order[i];
      expect(ri > pr || (ri === pr && a > pa), `${drawn[i + 1].label} after ${drawn[i].label} (${layout})`).toBe(true);
    });
  }
});

test("lifecycleRing: a record's circle area is its size and its inner disc the filled share, in the ring and the list", () => {
  const records = [...lifecycleInput.nodes, ...lifecycleInput.centre.nodes];
  for (const layout of ['ring', 'list'] as const) {
    const els = parseSvg(lifecycleRing({ ...base, id: 'ch-y', title, desc, ...lifecycleInput, layout }).svg);
    const glyphs = els.flatMap((e, i) => {
      const name = e.tag === 'circle' && e.attr.class === 'mk mk-line-0' ? nameOf(els, i) : undefined;
      if (!name) return [];
      const disc = els.find((o, j) => j > i && o.tag === 'circle' && o.attr.class === 'mk-hi' && o.attr.cx === e.attr.cx && o.attr.cy === e.attr.cy);
      return [{ label: name.split(':')[0], r: Number(e.attr.r), inner: disc ? Number(disc.attr.r) : 0 }];
    });
    expect(glyphs.map((g) => g.label)).toEqual(records.map((r) => r.label));
    const k = glyphs[0].r ** 2 / records[0].size;
    glyphs.forEach((g, i) => {
      expect(Math.abs(g.r ** 2 / records[i].size / k - 1), `${g.label} area`).toBeLessThan(0.05);
      expect(Math.abs((g.inner / g.r) ** 2 - records[i].fill), `${g.label} fill`).toBeLessThan(0.03);
    });
  }
});

test('progressRing: each arc and label carries the hooks a page script updates, set at build to the share done', () => {
  const els = parseSvg(progressRing({ ...base, id: 'ch-q', title, desc, items: progressItems }).svg);
  for (const p of progressItems) {
    const arcs = els.filter((e) => e.attr['data-ring'] === p.key);
    expect(arcs, p.key).toHaveLength(1);
    expect(arcs[0].attr.pathLength).toBe('100');
    expect(arcs[0].attr['stroke-dasharray']).toBe(`${pctOf(p)} 100`);
    expect(els.find((e) => e.attr['data-ring-label'] === p.key)?.text).toBe(`${pctOf(p)}%`);
    expect(els.find((e) => e.attr['data-ring-count'] === p.key)?.text).toBe(`${p.done}/${p.total}`);
  }
});

test('treemap: tile areas are proportional to the obligations per instrument, no tile overlaps, every tile and group header is labelled, and small or unlabelled tiles merge into an unlinked-or-full "+N"', () => {
  const counts = new Map<string, number>();
  for (const o of obligations) counts.set(o.frameworkId, (counts.get(o.frameworkId) ?? 0) + 1);
  // The page's group names and sizes (/resources/frameworks): "Control sets"
  // is the narrow group whose header once cut to its total.
  const NAME: Record<FrameworkType, string> = { law: 'Laws', standard: 'Standards', framework: 'Frameworks', code: 'Codes', controls: 'Control sets' };
  const groups = [...new Set(frameworks.map((f) => f.type))]
    .map((type) => ({
      label: NAME[type],
      href: `/resources/frameworks#type-${type}`,
      items: frameworks.filter((f) => f.type === type && counts.get(f.id)).map((f) => ({ label: f.short, name: f.id, value: counts.get(f.id)!, href: `/resources/frameworks#fw-${f.id}` })),
    }))
    .filter((g) => g.items.length);
  const valueOf = new Map(groups.flatMap((g) => g.items.map((it) => [it.name, it.value])));
  const shortOf = new Map(groups.flatMap((g) => g.items.map((it) => [it.name, it.label])));
  const groupOf = new Map(groups.flatMap((g) => g.items.map((it) => [it.name, g.label])));
  const total = (g: (typeof groups)[number]) => g.items.reduce((a, it) => a + it.value, 0);
  const LAYOUTS = [
    { layout: 'wide' as const, width: 760, plotHeight: 520 },
    { layout: 'narrow' as const, width: NARROW_WIDTH, plotHeight: 560 },
  ];
  for (const { layout, width, plotHeight } of LAYOUTS) {
    const els = parseSvg(treemap({ ...base, id: 'ch-t', title, desc, groups, unit: 'obligations', layout, width, plotHeight, minTile: 40 }).svg);
    const box = (e: SvgEl) => ['x', 'y', 'width', 'height'].map((a) => Number(e.attr[a]));
    const texts = els.filter((e) => e.tag === 'text').map((e) => ({ x: Number(e.attr.x), y: Number(e.attr.y), text: e.text }));
    const tiles = els.flatMap((e, i) => {
      if (e.tag !== 'rect' || !/^(tm( |$)|tm-hatch$)/.test(e.attr.class ?? '')) return [];
      const name = nameOf(els, i)!;
      const merged = /^\+(\d+), (\d+) \w+: (.+)$/.exec(name);
      const members = merged ? merged[3].split(', ') : [name.split(': ')[0]];
      return [{ members, merged: !!merged, value: merged ? Number(merged[2]) : valueOf.get(members[0])!, linked: linkedEl(els, i), b: box(e) }];
    });
    expect(tiles.flatMap((t) => t.members).sort(), `every instrument once (${layout})`).toEqual([...valueOf.keys()].sort());
    for (const t of tiles.filter((x) => x.merged)) expect(t.value).toBe(t.members.reduce((a, m) => a + valueOf.get(m)!, 0));
    // No mute tile: each prints its instrument's short name, or "+N".
    for (const t of tiles) {
      const [x, y, w, h] = t.b;
      const want = t.merged ? `+${t.members.length}` : shortOf.get(t.members[0]);
      const inside = texts.filter((p) => p.x > x && p.x < x + w && p.y > y && p.y < y + h).map((p) => p.text);
      expect(inside.join(' '), `${want} labelled (${layout})`).toContain(want!);
    }
    // One area scale, except a narrow band too thin to label (drawn 24 high).
    const bandOf = (label: string) => {
      const own = tiles.filter((t) => groupOf.get(t.members[0]) === label).map((t) => t.b);
      const y0 = Math.min(...own.map((b) => b[1]));
      return { h: Math.max(...own.map((b) => b[1] + b[3])) - y0, w: Math.max(...own.map((b) => b[0] + b[2])) - Math.min(...own.map((b) => b[0])) };
    };
    const floored = new Set(layout === 'narrow' ? groups.filter((g) => Math.abs(bandOf(g.label).h - 24) < 0.2).map((g) => g.label) : []);
    const scaled = tiles.filter((t) => !floored.has(groupOf.get(t.members[0])!));
    const k = scaled.reduce((a, t) => a + t.b[2] * t.b[3], 0) / scaled.reduce((a, t) => a + t.value, 0);
    for (const t of scaled) {
      const [, , w, h] = t.b;
      expect(t.value * k, `${t.members[0]} area (${layout})`).toBeGreaterThanOrEqual((w - 1) * (h - 1));
      expect(t.value * k, `${t.members[0]} area (${layout})`).toBeLessThanOrEqual((w + 1) * (h + 1));
    }
    for (const label of floored) expect((total(groups.find((g) => g.label === label)!) * k) / bandOf(label).w, `${label} needed the floor`).toBeLessThan(24);
    for (const t of tiles) {
      const [, , w, h] = t.b;
      if (w < 23.95 || h < 23.95) expect(t.linked, `${t.members[0]} is small, so unlinked`).toBe(false);
    }
    const heads = els.filter((e) => e.tag === 'rect' && e.attr.class === 'tm-gh').map(box);
    const rects = [...tiles.map((t) => t.b), ...heads];
    rects.forEach((a, i) =>
      rects.slice(i + 1).forEach((b) => {
        const ix = Math.min(a[0] + a[2], b[0] + b[2]) - Math.max(a[0], b[0]);
        const iy = Math.min(a[1] + a[3], b[1] + b[3]) - Math.max(a[1], b[1]);
        expect(ix <= 0.2 || iy <= 0.2, `overlap (${layout})`).toBe(true);
      }),
    );
    // Every group header names its group (stacked over lines when narrow).
    const mono = els.filter((e) => e.tag === 'text' && e.attr.class === 'mono').map((e) => e.text).join(' ');
    for (const g of groups) expect(mono, `${g.label} header (${layout})`).toContain(`${g.label} (${total(g)})`);
    for (const g of groups) {
      const own = tiles.filter((t) => !t.merged && groupOf.get(t.members[0]) === g.label);
      const smallOwn = own.filter((t) => t.b[2] < 40 || t.b[3] < 40).length;
      expect(smallOwn, `${g.label}: small tiles merge (${layout})`).toBeLessThanOrEqual(own.length === 1 && !tiles.some((t) => t.merged && groupOf.get(t.members[0]) === g.label) ? 1 : 0);
    }
  }
});

test('bookSpine: the chapters in book order grouped by part, one neutral tint per part alternating, and no layer class', () => {
  const parts: SpinePart[] = chapterParts.map((p) => ({
    label: p.title,
    chapters: chaptersOrdered
      .filter((c) => c.part === p.id)
      .map((c) => ({ num: c.order, label: c.shortTitle, href: `/bok/${c.slug}`, value: c.order + 1, marks: [{ shape: 'circle' as const, label: 'Figure', count: c.order % 3 }] })),
  }));
  const expected = parts.flatMap((p) => p.chapters.map((c) => `${String(c.num).padStart(2, '0')} ${c.label}`));
  const LAYER = /^(mk-(fill|line|dash|hatch)-[1-5]|l[1-5]-(bg|st)|heat-[1-5]|hatch-[1-5]|tm-[1-5]|sk-[1-5])$/;
  for (const encoding of ['bars', 'dots'] as const) {
    for (const orientation of ['horizontal', 'vertical'] as const) {
      const { svg } = bookSpine({ ...base, id: 'ch-s', title, desc, parts, encoding, unit: 'min', orientation });
      const els = parseSvg(svg);
      const cols = els.flatMap((e, i) => {
        if (e.tag !== 'a') return [];
        const first = els.find((o, j) => j > i && o.parent === i && o.tag === 'rect')!;
        return [{ name: titleOf(els, i)!.split(':')[0], x: Number(first.attr.x), y: Number(first.attr.y), cls: first.attr.class }];
      });
      const where = `${encoding}, ${orientation}`;
      expect(cols.map((c) => c.name), where).toEqual(expected);
      const along = cols.map((c) => (orientation === 'horizontal' ? c.x : c.y));
      along.slice(1).forEach((v, i) => expect(v, where).toBeGreaterThan(along[i]));
      expect(innerClasses(svg).filter((c) => LAYER.test(c)), where).toEqual([]);
      if (encoding === 'bars') {
        let at = 0;
        const tints = parts.map((p) => {
          const own = new Set(cols.slice(at, (at += p.chapters.length)).map((c) => c.cls));
          expect(own.size, `${p.label}: one tint`).toBe(1);
          return [...own][0];
        });
        tints.slice(1).forEach((t, i) => expect(t, `${parts[i + 1].label} differs from ${parts[i].label}`).not.toBe(tints[i]));
      }
    }
  }
});

test('ladder: cumulative steps list what each adds, every step after the first opening with "Previous, plus:"', () => {
  const adding = [
    { label: 'Operator', key: 'operator', adds: ['Kill switch'] },
    { label: 'Collaborator', key: 'collaborator', adds: ['Tool allowlist', 'Audit log'] },
    { label: 'Observer', key: 'observer', adds: ['Rollback plan'] },
  ];
  for (const orientation of ['horizontal', 'vertical'] as const) {
    const { svg, table } = ladder({ ...base, id: 'ch-c', title, desc, steps: adding, cumulative: true, orientation });
    const els = parseSvg(svg);
    const textIn = (key: string) => {
      const g = els.findIndex((e) => e.tag === 'g' && e.attr['data-step'] === key);
      const inside = (i: number) => {
        for (let p = els[i].parent; p >= 0; p = els[p].parent) if (p === g) return true;
        return false;
      };
      return els.filter((e, i) => e.tag === 'text' && inside(i)).map((e) => e.text);
    };
    adding.forEach((step, i) => {
      const lines = textIn(step.key);
      for (const add of step.adds) expect(lines, `${step.label} (${orientation})`).toContain(`+ ${add}`);
      expect(lines.includes('Previous, plus:'), `${step.label} (${orientation})`).toBe(i > 0);
    });
    expect(table.columns).toEqual(['Level', 'Step', 'Adds']);
    expect(table.rows).toEqual(adding.map((s, i) => [i + 1, s.label, s.adds.join('; ')]));
  }
});

// WCAG 2.5.8 measured where it applies: the links' boxes in a browser (with
// figures.css, which sizes the full-width row targets), the SVG drawn at the width a 320 px phone gives a narrow chart (274 px, the
// 0.98 scale of Chart.astro CANVAS_320) or at 1:1 for a wide one.
const TARGET_CASES: { name: string; px: number; make: () => ChartOutput }[] = [
  {
    name: 'lifecycleRing list, every stage and record linked',
    px: 274,
    make: () =>
      lifecycleRing({
        ...base,
        id: 'ch-y',
        title,
        desc,
        ...lifecycleInput,
        stages: lifecycleInput.stages.map((s) => ({ ...s, href: `#stage-${s.key}` })),
        nodes: lifecycleInput.nodes.map((n) => ({ ...n, href: `#schema-${n.label}` })),
        layout: 'list',
      }),
  },
  {
    name: 'lifecycleRing ring, every stage and record linked',
    px: 640,
    make: () =>
      lifecycleRing({
        ...base,
        id: 'ch-y',
        title,
        desc,
        ...lifecycleInput,
        stages: lifecycleInput.stages.map((s) => ({ ...s, href: `#stage-${s.key}` })),
        nodes: lifecycleInput.nodes.map((n) => ({ ...n, href: `#schema-${n.label}` })),
        layout: 'ring',
      }),
  },
  ...([640, NARROW_WIDTH] as const).map((width) => ({
    name: `lollipop ${width}, one- and two-line labels linked`,
    px: width === NARROW_WIDTH ? 274 : 640,
    make: () =>
      lollipop({
        ...base,
        id: 'ch-l',
        title,
        desc,
        width,
        labelWidth: width === 640 ? 260 : undefined,
        unit: 'controls',
        items: [
          { label: 'OWASP Agentic Top 10: Top 10 for Agentic Applications 2026', value: 31, href: '#a' },
          { label: 'EU AI Act Art. 14 human oversight', value: 17, href: '#b' },
          { label: 'ISO 42001 Annex A A.6.2.5: AI system deployment', value: 14, href: '#c' },
          { label: 'NIST AI RMF: MANAGE', value: 9, href: '#d' },
        ],
      }),
  })),
  {
    name: 'flow narrow, every node linked',
    px: 274,
    make: () => flow({ ...base, id: 'ch-f', title, desc, ...flowInput, nodes: flowNodes.map((n) => ({ ...n, href: `#node-${n.id}` })), layout: 'narrow' }),
  },
  {
    name: 'concentricRings narrow, linked ring key',
    px: 274,
    make: () => concentricRings({ ...base, id: 'ch-g', title, desc, ...ringInput, rings: ringInput.rings.map((r) => ({ ...r, href: `#ring-${r.key}` })), layout: 'narrow' }),
  },
];
for (const c of TARGET_CASES) {
  test(`${c.name}: every link is a pointer target 24 px or more, none overlapping (WCAG 2.5.8)`, async ({ page }) => {
    await page.setContent(`<style>${figuresCss}</style><div style="width:${c.px}px">${c.make().svg.replace('<svg ', '<svg style="display:block;width:100%;height:auto" ')}</div>`);
    const boxes = await page.$$eval('svg a', (links) => links.map((a) => a.getBoundingClientRect()).map((r) => ({ x: r.x, y: r.y, w: r.width, h: r.height })));
    expect(boxes.length).toBeGreaterThan(2);
    boxes.forEach((b, i) => {
      expect(Math.min(b.w, b.h), `link ${i}`).toBeGreaterThanOrEqual(24);
      boxes.slice(i + 1).forEach((o, j) => {
        const ix = Math.min(b.x + b.w, o.x + o.w) - Math.max(b.x, o.x);
        const iy = Math.min(b.y + b.h, o.y + o.h) - Math.max(b.y, o.y);
        expect(ix <= 0.5 || iy <= 0.5, `links ${i} and ${i + j + 1} overlap`).toBe(true);
      });
    });
  });
}

test('flow: a ribbon thinner than 2 units keeps its exact thickness and is the one class the sheets stroke 2 wide', () => {
  const links = [
    { from: 'ar', to: 'eu', value: 200 },
    { from: 'ar', to: 'iso', value: 1 },
    { from: 'ev', to: 'iso', value: 2 },
  ];
  const { svg } = flow({ ...base, id: 'ch-f', title, desc, ...flowInput, nodes: flowNodes.filter((n) => n.id !== 'asi'), links });
  const ribbons = parseSvg(svg).flatMap((e) => {
    if (e.tag !== 'path' || !/C/.test(e.attr.d ?? '')) return [];
    const n = e.attr.d.match(/-?[\d.]+/g)!.map(Number);
    return [{ t: n[8] - n[7], thin: e.attr.class === 'sk-thin' }];
  });
  const k = ribbons[0].t / 200;
  expect(ribbons.map((r) => r.t / k)).toEqual([200, 1, 2].map((v) => expect.closeTo(v, 0)));
  expect(ribbons.filter((r) => r.thin).length).toBeGreaterThan(0);
  for (const r of ribbons) expect(r.thin, `thin iff under 2 (${r.t})`).toBe(r.t < 2);
});

test('ranked bars and lollipops keep each value label clear of the gridlines', () => {
  const values = [31, 28, 23, 17, 14, 14, 13, 11, 11, 9, 9, 8, 8];
  for (const make of [rankedBars, lollipop]) {
    for (const width of [640, NARROW_WIDTH]) {
      const els = parseSvg(make({ ...base, id: 'ch-v', title, desc, width, unit: 'controls', items: values.map((value, i) => ({ label: `Clause ${i + 1}`, value })) }).svg);
      const grid = els.filter((e) => e.tag === 'line' && e.attr.class === 'rule').map((e) => Number(e.attr.x1));
      const labels = els.filter((e) => e.tag === 'text' && e.attr.class === 'num' && e.attr['text-anchor'] === undefined && Number(e.attr['font-size']) === 12.5);
      expect(labels.map((e) => Number(e.text))).toEqual(values);
      for (const l of labels) {
        const x = Number(l.attr.x);
        const w = l.text.length * 12.5 * 0.6;
        for (const g of grid) expect(g <= x - 1 || g >= x + w + 1, `${make.name} ${width}: "${l.text}" at ${x} on the gridline at ${g}`).toBe(true);
      }
    }
  }
});
