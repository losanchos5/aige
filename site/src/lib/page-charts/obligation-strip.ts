// obligation-strip.ts: the application line of one register row, for
// /obligations/<id>. A compact time axis (2024 to 2031 unless the row's dates
// reach further) with the date the row first applies, drawn in the row's
// status as on the application clock of /obligations (CLOCK_MARK), and each
// later dated step as a square, filled once its date is on or before the as-of
// date, outlined while ahead. Every date carries its own words (the status or
// the system class it concerns, and the chapter's note) in a block joined to
// its mark, so the strip needs no legend. A dashed line marks the as-of date,
// the row's own review date (never the build clock), labelled "As of".
//
// Wide (>= 480): time left to right, the blocks in a row above the axis.
// Narrow: time top to bottom, the blocks right of the axis, pushed down with a
// leader where they would overlap. Text wraps to its block and throws, naming
// it, when it needs more lines than the block allows (the kit's rule: shorten
// the wording, never cut it). Built on the chart kit's shell and helpers
// (src/lib/charts/core.ts); per-item, so nothing is registered in figures.ts.
import {
  assemble,
  besideLine,
  fitText,
  markStyles,
  nonEmpty,
  parseDay,
  r1,
  shape,
  table,
  text,
  textWidth,
  timeScale,
  tip,
  wrapText,
  type ChartBase,
  type ChartOutput,
} from '../charts/core';
import { CLOCK_MARK, type ClockStyle } from './obligation-clock';

export interface StripEvent {
  /** YYYY-MM-DD. */
  date: string;
  style: ClockStyle;
  /** Short heading after the date: the status, or the system class of a step. */
  heading: string;
  /** The chapter's words for the date, wrapped under the heading. */
  detail?: string;
}

export interface ObligationStripInput extends ChartBase {
  events: StripEvent[];
  from: string;
  to: string;
  /** The as-of date the dashed line marks. */
  marker: string;
  /** Column headings of the table (default Date, Step, Detail). */
  columns?: [string, string, string];
}

const L = 12;
const PX = 12.5;
const LINE = 15;
const WIDE_AT = 480;

const chrono = (a: StripEvent, b: StripEvent) =>
  a.date < b.date ? -1 : a.date > b.date ? 1 : a.style < b.style ? -1 : a.style > b.style ? 1 : 0;

export function obligationStrip(input: ObligationStripInput): ChartOutput {
  const where = `obligationStrip ${input.id}`;
  nonEmpty(input.events, 'events', where);
  const W = input.width ?? 720;
  const wide = W >= WIDE_AT;
  const events = [...input.events].sort(chrono);
  const marks = markStyles(input.id);
  const out: string[] = [];
  const asOf = `As of ${input.marker}`;
  parseDay(input.marker, 'strip marker');

  /** The lines of one block: "date · heading", then the detail. */
  const block = (e: StripEvent, bw: number, maxLines: number) => {
    const head = wrapText(`${e.date} · ${e.heading}`, bw, PX, 'body', 2, 'strip heading');
    const detail = e.detail ? wrapText(e.detail, bw, PX, 'body', maxLines - head.length, 'strip detail') : [];
    return { head, detail };
  };
  const drawBlock = (x: number, top: number, b: ReturnType<typeof block>) => {
    b.head.forEach((line, i) => out.push(text(x, top + 12 + i * LINE, line, { size: PX, weight: 600, where: 'strip heading' })));
    b.detail.forEach((line, i) => out.push(text(x, top + 12 + (b.head.length + i) * LINE, line, { size: PX, cls: 'ink2', where: 'strip detail' })));
  };
  const mark = (e: StripEvent, cx: number, cy: number) => {
    const m = CLOCK_MARK[e.style];
    const r = m.shape === 'square' ? 6.2 : 6.6;
    const name = `${e.date} · ${e.heading}${e.detail ? ` · ${e.detail}` : ''}`;
    return shape(m.shape, cx, cy, r, marks.attrs(m.state, 0), tip(name));
  };

  let bottom: number;
  if (wide) {
    const x0 = L + 8;
    const x1 = W - L - 8;
    const ts = timeScale(input.from, input.to, [x0, x1]);
    const xm = ts.map(input.marker);
    const n = events.length;
    const bw = Math.min(n === 1 ? 320 : 280, (W - 2 * L - (n - 1) * 16) / n);
    const blocks = events.map((e) => ({ e, x: ts.map(e.date), b: block(e, bw, 5) }));
    // Left edges: as close to the mark as the neighbours allow.
    const lefts = blocks.map(({ x }) => x - 10);
    for (let i = 0; i < n; i += 1) lefts[i] = Math.max(lefts[i], L, i ? lefts[i - 1] + bw + 16 : L);
    for (let i = n - 1; i >= 0; i -= 1) lefts[i] = Math.min(lefts[i], i < n - 1 ? lefts[i + 1] - 16 - bw : W - L - bw);
    for (let i = 0; i < n; i += 1) lefts[i] = Math.max(lefts[i], L);
    const lines = Math.max(...blocks.map(({ b }) => b.head.length + b.detail.length));
    const top = 6;
    const blocksBottom = top + 12 + (lines - 1) * LINE + 6;
    const axisY = blocksBottom + 30;
    blocks.forEach(({ b }, i) => drawBlock(lefts[i], top, b));
    // Leaders from each mark up to the foot of its block: straight up when
    // the mark sits under its block, else an elbow that runs under all the
    // blocks (a diagonal would cross a neighbour's text), one lane per block.
    const leaders = blocks.map(({ b, x }, i) => {
      const foot = top + 12 + (b.head.length + b.detail.length - 1) * LINE + 6;
      const fx = Math.max(lefts[i] + 4, Math.min(x, lefts[i] + bw - 4));
      if (Math.abs(fx - x) < 0.5) return `M${r1(x)} ${r1(axisY - 9)}V${r1(foot + 4)}`;
      const lane = blocksBottom + 6 + i * 5;
      return `M${r1(x)} ${r1(axisY - 9)}V${r1(lane)}H${r1(fx)}V${r1(foot + 4)}`;
    });
    out.push(`<path class="rule" fill="none" d="${leaders.join('')}"/>`);
    out.push(`<line class="axis" x1="${x0}" y1="${r1(axisY)}" x2="${x1}" y2="${r1(axisY)}"/>`);
    for (const t of ts.ticks) {
      const x = ts.map(t.date);
      out.push(`<line class="tick" x1="${r1(x)}" y1="${r1(axisY)}" x2="${r1(x)}" y2="${r1(axisY + 5)}"/>`);
      out.push(text(x, axisY + 19, t.label, { size: 12, cls: 'num muted', anchor: 'middle', where: 'tick' }));
    }
    out.push(`<line class="today" x1="${r1(xm)}" y1="${r1(axisY - 14)}" x2="${r1(xm)}" y2="${r1(axisY + 26)}"/>`);
    fitText(asOf, W - 2 * L, 12, 'mono', 'as-of label');
    out.push(text(besideLine(xm, textWidth(asOf, 12, 'mono'), W, L), axisY + 38, asOf, { size: 12, cls: 'mono', where: 'as-of label' }));
    for (const { e, x } of blocks) out.push(mark(e, x, axisY));
    bottom = axisY + 38;
  } else {
    // The as-of key over the axis, then time top to bottom.
    out.push(`<line class="today" x1="${L}" y1="14" x2="${L + 22}" y2="14"/>`);
    out.push(text(L + 28, 18, asOf, { size: 12, cls: 'mono', where: 'as-of label' }));
    const axisX = L + 44;
    const labelX = axisX + 22;
    const bw = W - L - labelX;
    const blocks = events.map((e) => ({ e, b: block(e, bw, 6) }));
    const need = blocks.reduce((sum, { b }) => sum + (b.head.length + b.detail.length) * LINE + 10, 0);
    const start = 40;
    const len = Math.max(220, need);
    const ts = timeScale(input.from, input.to, [start, start + len]);
    out.push(`<line class="axis" x1="${axisX}" y1="${start}" x2="${axisX}" y2="${r1(start + len)}"/>`);
    for (const t of ts.ticks) {
      const ty = ts.map(t.date);
      out.push(`<line class="tick" x1="${axisX - 5}" y1="${r1(ty)}" x2="${axisX}" y2="${r1(ty)}"/>`);
      out.push(text(axisX - 8, ty + 4, t.label, { size: 12, cls: 'num muted', anchor: 'end', where: 'tick' }));
    }
    const ym = ts.map(input.marker);
    out.push(`<line class="today" x1="${axisX - 8}" y1="${r1(ym)}" x2="${labelX - 6}" y2="${r1(ym)}"/>`);
    let prev = -Infinity;
    const leaders: string[] = [];
    for (const { e, b } of blocks) {
      const ty = ts.map(e.date);
      const blockTop = Math.max(ty - 12, prev + 10);
      if (blockTop > ty - 10) leaders.push(`M${axisX + 8} ${r1(ty)}L${labelX - 4} ${r1(blockTop + 8)}`);
      drawBlock(labelX, blockTop, b);
      prev = blockTop + 12 + (b.head.length + b.detail.length - 1) * LINE + 4;
    }
    if (leaders.length) out.push(`<path class="rule" fill="none" d="${leaders.join('')}"/>`);
    for (const { e } of blocks) out.push(mark(e, axisX, ts.map(e.date)));
    bottom = Math.max(start + len + 4, prev);
  }
  const [cDate, cStep, cDetail] = input.columns ?? ['Date', 'Step', 'Detail'];
  const { svg, height } = assemble({
    base: input,
    width: W,
    bottom,
    body: out,
    defs: marks.defs(),
    role: 'img',
    cls: wide ? 'ch-obstrip' : 'ch-obstrip ch-vertical',
  });
  return {
    svg,
    table: table(input.tableCaption ?? input.title, [cDate, cStep, cDetail], events.map((e) => [e.date, e.heading, e.detail ?? ''])),
    width: W,
    height,
  };
}
