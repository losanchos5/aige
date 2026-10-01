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
//   width    viewBox width; NARROW_WIDTH (280) gives the phone variant, whose
//            text is at least NARROW_TEXT (12.5; minText(W) picks the size)
//   lang     'es' prints every fixed word in Spanish ("A fecha de", "Fuente:",
//            table headings such as "Fecha", "Total", "no aplica")
// and returns ChartOutput { svg, table, width, height } where table is
// { caption, columns, rows } holding exactly the data drawn.
//
// Encodings shared by all: Tone 0 = ink, 1-5 = stack layer (use a layer tone
// only when the category IS a layer); MarkState 'filled' | 'outline' |
// 'dashed' | 'hatched' carries status by shape, never colour alone; Shape
// 'circle' | 'square' | 'diamond' | 'triangle'. Any label that does not fit
// its box throws at build, naming the label: shorten the wording. An em dash
// (U+2014) in any label throws too, and so does an empty input (no items).
// Legends: every primitive that colours marks by layer or draws them in more
// than one state adds an auto legend (core autoLegend) of exactly the layers
// and states drawn: layer swatches named as in data/stack ("03 Evals"), state
// swatches named by the marks' own status words, each block opening with the
// question it answers (ChartBase legendTitles: { layer, state }, with
// defaults "Colour: stack layer" and "Drawing: status"). An explicit `legend`
// list replaces it (its question in legendHeading); autoLegend: false drops
// it when the page shows its own key.
// concentricRings heads its keys (ringsTitle, sectorsTitle); treemap says what
// the area counts (areaKey), what "+N" is and what the foot bar measures
// (fillKey); lifecycleRing names its channels ("Circle area: Fields"); the
// chains name the evidence chips' layers and the enforcement track's states.
// Every mark is named (its <title>, or aria-label on a link) by what it
// stands for, and a linked label or row carries the same name as its mark
// ("Label: 12 units"); /chart-tip.js shows that name as the tooltip on hover,
// focus and tap. Names come from the input only; an optional `name` gives the
// full name where the printed label is a code (concentricRings marks,
// heatGrid rows and columns, radial items, flow and treemap nodes).
// Marks with an href are links named by their <title>; linked marks must keep
// the 24 px pointer-target spacing of WCAG 2.5.8 (the primitives default to a
// 24 px pitch when marks link), else the build throws naming both marks.
// Chart.astro enforces the rest at the page: a wide chart over 360 units needs
// a narrow variant or scroll, a pair must share one table, ids are unique on
// the page, every rendered SVG stays within 12 KB (VISUAL-GUIDE §1.12), and
// the SVG a phone shows keeps its smallest text at 12 px or more on a 320 px
// screen (the narrow one at NARROW_WIDTH with text of 12.5 passes).
//
// Primitives (see each module's interface for every option):
//
//   dotMatrix({ groups: [{ label, items: [{ label, state?, tone?, status?, href? }] }],
//               unit?, cell?, gap?, legend?, focusable? })
//     Waffle / isotype: one cell per record, grouped. /controls mosaic,
//     /resources corpus, /obligations status isotype.
//
//   heatGrid({ rowHeader, rows: [{ label, name?, href? }], columns: [{ label, name? }],
//              values: (number|null)[][], unit, unitOne?, tone?, showValues?, marginals? })
//     Count heatmap, neutral fill-opacity ramp, null = hatched n/a; returns
//     `sticky` { head, body } for a sticky label column (Chart scroll).
//     Use for clause x standard dot matrices as well (showValues: false).
//     `name` is the full name in cell tooltips when the label is a code
//     (columns [{ label: 'A.6.2.4', name: 'A.6.2.4 AI system ...' }]).
//     `unitOne` is the singular for a value of 1 ("1 threat", as flow has).
//
//   rankedBars / lollipop({ items: [{ label, name?, value, tone?, state?, highlight?, href? }],
//                          unit, percent?, sort? })
//     A linked item is one whole-row target (label, mark, value), 24 high or
//     more; value labels step past a gridline they would sit on. `name` is
//     the full name in the mark's tooltip and the row link when `label` (the
//     drawn text and the table cell) is shortened.
//   stackedBars / stacked100({ series: [{ label, name?, tone?, state? }],
//                              items: [{ label, values: number[] }], unit, countUnit?, unitOne? })
//     Segment names read "Item · Series: 13 topics (52%)": a series `name`
//     drops what its label adds (a count), `countUnit` is the noun of a raw
//     count when `unit` names a share, `unitOne` its singular.
//   divergingBars({ left: { label }, right: { label },
//                   items: [{ label, left, right, note? }], segments?, unit })
//     Butterfly; left/right may be [core, related] with segments: ['core','related'].
//   dumbbell({ items: [{ label, from, to }], fromLabel, toLabel, domain?, today?, labelWidth? })
//     Date to date (YYYY-MM-DD), e.g. the AI Act Omnibus deferrals; the wide
//     label column defaults to 40 % of the width (at most 260).
//
//   timeStrip({ from, to, events: TimePoint[], today?, orientation? })
//     `today` (here and in dumbbell) is the data's as-of date, drawn by
//     asOfMark: a dashed line.today labelled "As of YYYY-MM-DD".
//   beeswarm({ from, to, points: TimePoint[], today?, orientation?, legend? })
//   timeLanes({ from, to, lanes: [{ label, items: [{ label, start, end?, ... }] }], today?,
//               labels?: 'inline' (default, label next to each mark) | 'none' })
//     TimePoint = { date, label, shape?, state?, tone?, status?, href? };
//     orientation 'vertical' is the narrow variant (time top to bottom).
//
//   lanes({ columns: [{ key, label }], rowHeader,
//           rows: [{ label, href?, marks: [{ column, shape, state?, tone?, status }] }],
//           legend?, orientation? })
//     Swimlane: columns = enforcement points, rows = items, shape = effect;
//     'vertical' (narrow) stacks the lanes as bands, each listing its items.
//
//   venn3({ sets: [A, B, C], items: [{ label, sets: string[] }], layout: 'venn' | 'euler' | 'upset',
//           unit, callouts? })
//     Three-set overlap, each set's shape named "Set: N unit"; 'upset' is the
//     narrow variant (same table, a key
//     saying filled dot = in the set, hollow = not). 'euler'
//     draws nested ellipses when nestedChain(sets, items) finds the sets
//     strictly nested (no empty region), and the Venn otherwise.
//
//   ladder({ steps: [{ label, detail?, href?, key?, adds? }], highlight?, highlightLabel?,
//            orientation?, cumulative? })
//     Ascending steps; 'vertical' is the narrow variant. A linked step is
//     named "label: detail" when it has a detail.
//     A step key wraps its marks in <g data-step> for a page script to light.
//     `adds` lists what a step adds ("+ item" lines, and an Adds table
//     column); `cumulative` opens each later step's list with "Previous,
//     plus:" (AutonomyLadder).
//
//   relationRadial({ centre: { label }, families: [{ label, layered?, relationLabels?,
//                    items: [{ label, name?, href?, strength?: 'core' | 'related', tone? }] }],
//                    relationLabels?, maxPerFamily?, layout?: 'radial' | 'list' }): ChartOutput | null
//     Ego network for per-item pages: the item at the centre, up to six
//     families as sectors, solid edge + filled node = core, dashed + outlined =
//     related; layer tone only in a layered family. Returns null under three
//     relations (RADIAL_MIN_RELATIONS): skip the figure, keep the lists.
//     'list' (default under 480 wide) is the narrow variant. Table: Family |
//     Item | Relation, every relation (a family draws at most 6, then "+N more",
//     named after the full names of the items it hides).
//     radialLabelWidth(width, layout, centre) is the room a node label gets,
//     for callers that shorten their labels to fit.
//
//   bowTie({ preventive, event, detective?, responsive?, harms, evidence, kickers?,
//            orientation?: 'row' | 'column', maxItems? })
//   controlChain({ failureModes, enforcement: ('pre_merge'|'deploy'|'runtime'|'periodic')[],
//                  stageLabels?, verification, decision: { label, state? }, evidence, kickers?,
//                  orientation?, maxItems? })
//     Chains on the evidence-chain engine: one panel per stage, 'row' (900
//     wide) or 'column' (NARROW_WIDTH, narrow); items are { label, name?, href?, detail? }
//     and evidence items add layer (1-5). The terminal panel is always the
//     evidence (document-with-check glyph in the layer colour); the one
//     diamond is the gate: the bow-tie's event, the control's decision (its
//     state from the caller: hatched for "to be specified", decided by
//     isResponseToSpecify). Table: Step | Item | Detail.
//
//   flow({ columns: [{ key, label }] (2 or 3), nodes: [{ id, column, label, name?, tone?, href? }],
//          links: [{ from, to, value }], unit, unitOne?, layout?: 'wide' | 'narrow', rowNames?,
//          order?: 'barycentre' | 'input', plotHeight? })
//     Sankey / alluvial laid out at build: node blocks sized by max(in, out),
//     24 high at least, 8 apart, label and count inside; cubic ribbons
//     between consecutive columns (fill-opacity, no text on them; one under
//     2 units stroked up to 2 so it stays visible), a <g> per
//     node with its outgoing ribbons for the CSS hover. At most 9 nodes a
//     column (FLOW_MAX_NODES; group the tail as "Other (N)"). 'narrow' (280,
//     default under 480 wide) lists each source with bars of its
//     destinations; a linked destination row is named as its wide ribbon,
//     "Source to Destination: n units" (rowNames 'short': by the printed
//     labels, "Source to Destination: n", where full names pass the budget).
//     Table: From | To | value, one row per link.
//
//   concentricRings({ rings: [{ key, label, href? }] (inside out), sectors?: [{ key, label }],
//                     marks: [{ label, name?, ring, sector?, shape?, state?, tone?, status?, href? }],
//                     centre: { label }, layout?: 'wide' | 'narrow', keyMarks?, legend? })
//     Containment target (harm levels x MIT domains; EvalBoundary): marks
//     spread in their ring x sector cell without overlap (24 px pitch when
//     linked), ring numbers in the top gap with a numbered key, sector labels
//     around the circle or lettered with a key. 'narrow' (280) keeps the
//     rings and both keys; marks there do not link. A mark's `name` (default
//     its label) heads its tooltip; each ring band is named "Ring 2: <label>".
//     Table: Item | Ring | Sector | Layer | Status (the last three when used).
//   lifecycleRing({ stages: [{ key, label, href? }], nodes: [{ label, stage, size?, fill?, href? }],
//                   centre: { label, nodes? }, layout?: 'ring' | 'list', sizeLabel?, fillLabel? })
//     Cycle of stages (the records ring): numbered arcs, each stage's records
//     beside the ring, the centre's inside; circle area = size, inner disc =
//     fill (0 to 1), the legend showing both on a scale; a linked row is one
//     26-high target. 'list' (280, narrow) is one list per stage. Table:
//     Stage | Record | size | fill (%).
//   progressRing({ items: [{ key, label, done, total }] })
//     Share done per item; a page script updates it in place (no animation):
//     <circle data-ring="key" pathLength="100" stroke-dasharray="pct 100">,
//     <text data-ring-label="key">pct%</text>, <text data-ring-count="key">,
//     and each ring named by <title data-ring-title="key">"label: 3 of 7
//     done (43%)"</title> (Spanish: "3 de 7 hechos (43 %)").
//
//   treemap({ groups: [{ label, href?, items: [{ label, value, name?, state?, tone?, status?,
//             fill?, href? }] }], unit, unitOne?, layout?: 'wide' | 'narrow', plotHeight?,
//             fillHeader?, minTile? })
//     Squarified (Bruls) by group, then within the group under a header
//     strip (stacked over up to three lines when narrow); tile area = value x
//     one scale. Tiles under 24 x 24, or too small for their label, merge
//     into "+N" (linked to the group href when a full target), so every tile
//     is labelled; state by pattern; fill = a bar along the foot. 'narrow'
//     (280) stacks the groups as bands, each at least 24 high. `minTile` (default 24) merges a long tail
//     sooner when the SVG would pass 12 KB (every framework linked: 36).
//     Table: Group | Item | value | fill | status.
//
//   bookSpine({ parts: [{ label, chapters: [{ num, label, href?, value?, marks?: [{ shape,
//               count, label, state? }], highlight? }] }], encoding?: 'bars' | 'dots', unit,
//               mini?, orientation?: 'horizontal' | 'vertical' })
//     The chapters in order grouped by part, in neutral part tints (never
//     layer colours): bars (reading minutes) or dots (one per figure, shape =
//     kind); 'vertical' (280, narrow) stacks the chapters as rows; `mini` is
//     a compact strip with the highlighted chapters listed as links under it.
//     Table: Part | Chapter | value, or one column per kind and Total.
//
//   glyph(kind, x, y, { tone? }): the §1.7 glyph vocabulary in a 24 px box
//     (building, person, calendar, package, layers, evidence, card, gate,
//     warning, pipeline, magnifier), shared with lib/evidence-chain.ts.
//
// Helpers for new primitives: linearScale, timeScale, textWidth, fitText,
// wrapText, open, close, assemble, markStyles, shape, targets, hitRect (a
// whole-row pointer target inside a link), words, minText,
// and asOfMark(scale, asOf, lang, { width, axis }) for the as-of line of any
// time chart (asOfLabel for one drawn without a scale).
export type {
  AsOfMark,
  Box,
  Cell,
  ChartBase,
  ChartMode,
  ChartOutput,
  ChartTable,
  Face,
  MarkState,
  Shape,
  Tone,
  LinearScale,
  TimeScale,
  Words,
} from './core';
export {
  AS_OF_KEY_H,
  NARROW_TEXT,
  NARROW_WIDTH,
  asOfLabel,
  asOfMark,
  assemble,
  claimIds,
  close,
  esc,
  fitText,
  hitRect,
  linearScale,
  markClass,
  markStyles,
  minText,
  open,
  parseDay,
  shape,
  stampLines,
  targets,
  textWidth,
  timeScale,
  words,
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
export { venn3, nestedChain, type Venn3Input, type VennSet } from './venn';
export { ladder, type LadderInput, type LadderStep } from './ladder';
export { relationRadial, radialLabelWidth, RADIAL_MIN_RELATIONS, type RelationFamily, type RelationItem, type RelationRadialInput, type RelationStrength } from './radial';
export {
  bowTie,
  controlChain,
  type BowTieInput,
  type BowTieStage,
  type ControlChainInput,
  type ControlChainStage,
  type EvidenceItem,
  type FlowBase,
  type FlowItem,
  type PipelineStage,
} from './flow';
export { glyph, type GlyphKind, type GlyphOptions } from './glyphs';
export { flow, FLOW_MAX_NODES, type SankeyColumn, type SankeyInput, type SankeyLink, type SankeyNode } from './sankey';
export {
  concentricRings,
  lifecycleRing,
  progressRing,
  type ConcentricRingsInput,
  type LifecycleNode,
  type LifecycleRecord,
  type LifecycleRingInput,
  type ProgressItem,
  type ProgressRingInput,
  type RingDef,
  type RingMark,
  type RingSector,
} from './rings';
export { treemap, type TreemapGroup, type TreemapInput, type TreemapItem } from './treemap';
export { bookSpine, type BookSpineInput, type SpineChapter, type SpineMark, type SpinePart } from './spine';
