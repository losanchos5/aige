// The chart kit: build-time SVG primitives for page and per-item visuals.
// Import from here, render with src/components/Chart.astro.
//
// Every primitive takes one input object that extends ChartBase:
//   id       unique on the page, [a-z][a-z0-9-]* (a wide/narrow pair needs two)
//   title    SVG <title>; desc: one-sentence SVG <desc>
//   source   printed "Source: ..." inside the image; asOf: "As of YYYY-MM-DD"
//   mode     'figc' (default; page must load figures.css, e.g. via reading.css)
//            or 'chart' (chart.css only; required on /, /resources,
//            /resources/crosswalk, /cases and /patterns, see tests/perf.spec.ts)
//   width    viewBox width; 340 gives the phone variant (1:1 text at 390 px)
//   lang     'es' prints "A fecha de" / "Fuente:" and Spanish region words
// and returns ChartOutput { svg, table, width, height } where table is
// { caption, columns, rows } holding exactly the data drawn.
//
// Encodings shared by all: Tone 0 = ink, 1-5 = stack layer (use a layer tone
// only when the category IS a layer); MarkState 'filled' | 'outline' |
// 'dashed' | 'hatched' carries status by shape, never colour alone; Shape
// 'circle' | 'square' | 'diamond' | 'triangle'. Any label that does not fit
// its box throws at build, naming the label: shorten the wording. An em dash
// (U+2014) in any label throws too.
//
// Primitives (see each module's interface for every option):
//
//   dotMatrix({ groups: [{ label, items: [{ label, state?, tone?, status?, href? }] }],
//               unit?, cell?, legend?, focusable? })
//     Waffle / isotype: one cell per record, grouped. /controls mosaic,
//     /resources corpus, /obligations status isotype.
//
//   heatGrid({ rowHeader, rows: [{ label, href? }], columns: [{ label }],
//              values: (number|null)[][], unit, tone?, showValues?, marginals? })
//     Count heatmap, neutral fill-opacity ramp, null = hatched n/a; returns
//     `sticky` { head, body } for a sticky label column (Chart scroll).
//     Use for clause x standard dot matrices as well (showValues: false).
//
//   rankedBars / lollipop({ items: [{ label, value, tone?, state?, highlight?, href? }],
//                          unit, percent?, sort? })
//   stackedBars / stacked100({ series: [{ label, tone?, state? }],
//                              items: [{ label, values: number[] }], unit })
//   divergingBars({ left: { label }, right: { label },
//                   items: [{ label, left, right, note? }], segments?, unit })
//     Butterfly; left/right may be [core, related] with segments: ['core','related'].
//   dumbbell({ items: [{ label, from, to }], fromLabel, toLabel, domain?, today? })
//     Date to date (YYYY-MM-DD), e.g. the AI Act Omnibus deferrals.
//
//   timeStrip({ from, to, events: TimePoint[], today?, orientation? })
//   beeswarm({ from, to, points: TimePoint[], today?, orientation?, legend? })
//   timeLanes({ from, to, lanes: [{ label, items: [{ label, start, end?, ... }] }], today? })
//     TimePoint = { date, label, shape?, state?, tone?, status?, href? };
//     orientation 'vertical' is the narrow variant (time top to bottom).
//
//   lanes({ columns: [{ key, label }], rowHeader,
//           rows: [{ label, href?, marks: [{ column, shape, state?, tone?, status }] }],
//           legend? })
//     Swimlane: columns = enforcement points, rows = items, shape = effect.
//
//   venn3({ sets: [A, B, C], items: [{ label, sets: string[] }], layout: 'venn' | 'upset',
//           unit, callouts? })
//     Three-set overlap; 'upset' is the narrow variant (same table).
//
//   ladder({ steps: [{ label, detail?, href? }], highlight?, highlightLabel?, orientation? })
//     Ascending steps; 'vertical' is the narrow variant.
//
// Helpers for new primitives: linearScale, bandScale, timeScale, textWidth,
// fitText, wrapText, open, close, assemble, markStyles, shape.
export type {
  Cell,
  ChartBase,
  ChartMode,
  ChartOutput,
  ChartTable,
  Face,
  MarkState,
  Shape,
  Tone,
  BandScale,
  LinearScale,
  TimeScale,
} from './core';
export {
  assemble,
  bandScale,
  close,
  esc,
  fitText,
  linearScale,
  markClass,
  markStyles,
  open,
  parseDay,
  shape,
  stampLines,
  textWidth,
  timeScale,
  wrapText,
} from './core';
export { dotMatrix, type DotGroup, type DotItem, type DotMatrixInput } from './dotmatrix';
export { heatGrid, type HeatGridInput } from './heatgrid';
export {
  divergingBars,
  dumbbell,
  lollipop,
  rankedBars,
  stacked100,
  stackedBars,
  type BarItem,
  type DivergingBarsInput,
  type DumbbellInput,
  type RankedBarsInput,
  type StackSeries,
  type StackedBarsInput,
} from './bars';
export {
  beeswarm,
  timeLanes,
  timeStrip,
  type BeeswarmInput,
  type TimeBase,
  type TimeLaneItem,
  type TimeLanesInput,
  type TimePoint,
  type TimeStripInput,
} from './timeaxis';
export { lanes, type LaneMark, type LanesInput } from './lanes';
export { venn3, type Venn3Input, type VennSet } from './venn';
export { ladder, type LadderInput, type LadderStep } from './ladder';
