// timeaxis.ts: charts on a time axis. Time runs left to right (horizontal) or
// top to bottom (vertical, for narrow widths); ticks are 1 January of round
// years (month starts on short spans), at most six; an optional dashed "today"
// line with its date. Marks carry their state by shape and fill, never colour
// alone, and each has a native tooltip.
//
//   timeStrip   one compact row of dated events (per obligation, per pattern),
//               labels stacked above the axis so they never collide
//   beeswarm    one dot per dated record, dots stacking away from the axis in
//               bins of one dot width (a dot plot), shape by status
//   timeLanes   one lane per series with dated points or start-to-end bars
//
// The text-measurement and wrap-to-box idea comes from scripts/lib/posters.mjs
// (measure / wrapTo); the lane grouping itself (posters.mjs timelineModel) is
// domain logic and stays with the caller, who passes lanes already grouped.
import {
  assemble,
  legend,
  markStyles,
  parseDay,
  r1,
  shape,
  stateWords,
  table,
  text,
  textWidth,
  timeScale,
  tip,
  wrapMark,
  wrapText,
  type ChartBase,
  type ChartOutput,
  type MarkState,
  type Shape,
  type TimeScale,
  type Tone,
} from './core';

const L = 12;

export interface TimeBase extends ChartBase {
  /** Domain, YYYY-MM-DD; every date drawn must fall inside it. */
  from: string;
  to: string;
  /** A dashed "today" line (inside the domain), labelled "Today <date>". */
  today?: string;
  todayLabel?: string;
  /** 'horizontal' (default) or 'vertical' (time top to bottom). */
  orientation?: 'horizontal' | 'vertical';
  /** Vertical only: length of the time axis in px (default 480). */
  length?: number;
  /** Legend entries (shape and state swatches). */
  legend?: { label: string; shape?: Shape; state?: MarkState; tone?: Tone }[];
}

export interface TimePoint {
  date: string;
  label: string;
  shape?: Shape;
  state?: MarkState;
  tone?: Tone;
  /** Wording of the status for the table and tooltip ("Deferred"). */
  status?: string;
  href?: string;
}

const statusOf = (p: { status?: string; state?: MarkState }) => p.status ?? (p.state ? stateWords[p.state] : '');
const nameOf = (p: TimePoint) => `${p.label} · ${p.date}${statusOf(p) ? ` · ${statusOf(p)}` : ''}`;

/** Chronological order with the label as tie-break, independent of locale. */
function chrono<T extends { date: string; label: string }>(items: T[]): T[] {
  return [...items].sort((a, b) => (a.date < b.date ? -1 : a.date > b.date ? 1 : a.label < b.label ? -1 : a.label > b.label ? 1 : 0));
}

function legendBlock(input: TimeBase, W: number, marks: ReturnType<typeof markStyles>, out: string[], y: number): number {
  if (!input.legend?.length) return y;
  const lg = legend(input.legend, L, y + 14, W - L, marks);
  out.push(...lg.els);
  return lg.bottom + 12;
}

function checkToday(input: TimeBase, ts: TimeScale) {
  if (input.today) ts.map(input.today); // throws when outside the domain
}

const todayText = (input: TimeBase) => `${input.todayLabel ?? (input.lang === 'es' ? 'Hoy' : 'Today')} ${input.today}`;

/** Vertical charts name the today line in a key above the axis, since a label
 *  on the line would sit on the marks. Returns the y under the key. */
function todayKey(input: TimeBase, out: string[], y: number): number {
  if (!input.today) return y;
  out.push(`<line class="today" x1="${L}" y1="${r1(y + 10)}" x2="${L + 22}" y2="${r1(y + 10)}"/>`);
  out.push(text(L + 28, y + 14, todayText(input), { size: 12, cls: 'mono', where: 'today label' }));
  return y + 22;
}

function pointTable(input: TimeBase, points: TimePoint[]) {
  const withStatus = points.some((p) => statusOf(p));
  return table(
    input.tableCaption ?? input.title,
    ['Date', 'Item', ...(withStatus ? ['Status'] : [])],
    points.map((p) => [p.date, p.label, ...(withStatus ? [statusOf(p)] : [])]),
  );
}

// -------------------------------------------------------------- beeswarm -- //

export interface BeeswarmInput extends TimeBase {
  points: TimePoint[];
  /** Dot radius (default 5). */
  r?: number;
}

/** One dot per dated record, stacked in bins away from the axis. */
export function beeswarm(input: BeeswarmInput): ChartOutput {
  const vertical = input.orientation === 'vertical';
  const W = input.width ?? (vertical ? 340 : 640);
  const r = input.r ?? 5;
  const bin = 2 * r + 2;
  const marks = markStyles(input.id);
  const out: string[] = [];
  let y = legendBlock(input, W, marks, out, 4);
  if (input.today && !vertical) y += 20;
  if (vertical) y = todayKey(input, out, y);
  const axisLen = vertical ? (input.length ?? 480) : W - 2 * L - 16;
  const start = vertical ? y + 16 : L + 8;
  const ts = timeScale(input.from, input.to, [start, start + axisLen]);
  checkToday(input, ts);
  // Bin each point (chronological order) and count the stack height.
  const stacks = new Map<number, number>();
  const placed = chrono(input.points).map((p) => {
    const at = ts.map(p.date);
    const col = Math.floor((at - start) / bin);
    const k = stacks.get(col) ?? 0;
    stacks.set(col, k + 1);
    return { p, along: start + col * bin + bin / 2, k };
  });
  const maxStack = Math.max(1, ...stacks.values());
  const dots: string[] = [];
  let bottom: number;
  if (!vertical) {
    const axisY = y + 8 + maxStack * bin;
    for (const { p, along, k } of placed) {
      const cy = axisY - r - 3 - k * bin;
      dots.push(wrapMark(shape(p.shape ?? 'circle', along, cy, r, marks.attrs(p.state, p.tone), tip(nameOf(p))), nameOf(p), { href: p.href }));
    }
    out.push(`<line class="axis" x1="${r1(start)}" y1="${r1(axisY)}" x2="${r1(start + axisLen)}" y2="${r1(axisY)}"/>`);
    for (const t of ts.ticks) {
      const x = ts.map(t.date);
      out.push(`<line class="tick" x1="${r1(x)}" y1="${r1(axisY)}" x2="${r1(x)}" y2="${r1(axisY + 5)}"/>`);
      out.push(text(x, axisY + 19, t.label, { size: 12, cls: 'num muted', anchor: 'middle', where: 'tick' }));
    }
    if (input.today) {
      const x = ts.map(input.today);
      out.push(`<line class="today" x1="${r1(x)}" y1="${r1(y)}" x2="${r1(x)}" y2="${r1(axisY + 5)}"/>`);
      const label = todayText(input);
      const w = textWidth(label, 12, 'mono');
      const anchor = x + w / 2 > W - L ? 'end' : x - w / 2 < L ? 'start' : 'middle';
      out.push(text(x, y - 4, label, { size: 12, cls: 'mono', anchor, where: 'today label' }));
    }
    bottom = axisY + 19;
  } else {
    const axisX = L + 44;
    const need = axisX + 4 + maxStack * bin;
    if (need > W - L) {
      throw new Error(`charts(beeswarm ${input.id}): a stack of ${maxStack} dots needs ${Math.ceil(need + L)}px of width; lengthen the axis or shrink r`);
    }
    for (const { p, along, k } of placed) {
      const cx = axisX + r + 4 + k * bin;
      dots.push(wrapMark(shape(p.shape ?? 'circle', cx, along, r, marks.attrs(p.state, p.tone), tip(nameOf(p))), nameOf(p), { href: p.href }));
    }
    out.push(`<line class="axis" x1="${axisX}" y1="${r1(start)}" x2="${axisX}" y2="${r1(start + axisLen)}"/>`);
    for (const t of ts.ticks) {
      const ty = ts.map(t.date);
      out.push(`<line class="tick" x1="${axisX - 5}" y1="${r1(ty)}" x2="${axisX}" y2="${r1(ty)}"/>`);
      out.push(text(axisX - 8, ty + 4, t.label, { size: 12, cls: 'num muted', anchor: 'end', where: 'tick' }));
    }
    if (input.today) {
      const ty = ts.map(input.today);
      out.push(`<line class="today" x1="${axisX - 5}" y1="${r1(ty)}" x2="${W - L}" y2="${r1(ty)}"/>`);
    }
    bottom = start + axisLen + 4;
  }
  out.push(...dots);
  const { svg, height } = assemble({
    base: input,
    width: W,
    bottom,
    body: out,
    defs: marks.defs(),
    role: input.points.some((p) => p.href) ? 'group' : 'img',
    cls: vertical ? 'ch-swarm ch-vertical' : 'ch-swarm',
  });
  return { svg, table: pointTable(input, input.points), width: W, height };
}

// ------------------------------------------------------------------ strip -- //

export interface TimeStripInput extends TimeBase {
  /** Dated events; `label` is printed next to the mark. */
  events: TimePoint[];
}

/** A compact one-row timeline; labels take up to three rows above the axis. */
export function timeStrip(input: TimeStripInput): ChartOutput {
  const vertical = input.orientation === 'vertical';
  const W = input.width ?? (vertical ? 340 : 640);
  const marks = markStyles(input.id);
  const out: string[] = [];
  let y = legendBlock(input, W, marks, out, 2);
  const events = chrono(input.events);
  let bottom: number;
  if (!vertical) {
    const ts = timeScale(input.from, input.to, [L + 8, W - L - 8]);
    checkToday(input, ts);
    // Greedy label rows: each label takes the lowest row where it clears the
    // previous label by 6px; more than three rows is a layout error.
    const ends: number[] = [];
    const placed = events.map((e) => {
      const x = ts.map(e.date);
      const w = textWidth(e.label, 12.5);
      let left = x - w / 2;
      left = Math.max(L, Math.min(left, W - L - w));
      let row = ends.findIndex((end) => left >= end + 6);
      if (row === -1) row = ends.length;
      if (row > 2) throw new Error(`charts(timeStrip ${input.id}): label "${e.label}" collides with its neighbours; shorten the labels`);
      ends[row] = left + w;
      return { e, x, left, row };
    });
    const rows = Math.max(1, ends.length);
    const axisY = y + 14 + rows * 17 + 10;
    out.push(`<line class="axis" x1="${L + 8}" y1="${r1(axisY)}" x2="${W - L - 8}" y2="${r1(axisY)}"/>`);
    for (const t of ts.ticks) {
      const x = ts.map(t.date);
      out.push(`<line class="tick" x1="${r1(x)}" y1="${r1(axisY)}" x2="${r1(x)}" y2="${r1(axisY + 5)}"/>`);
      out.push(text(x, axisY + 19, t.label, { size: 12, cls: 'num muted', anchor: 'middle', where: 'tick' }));
    }
    if (input.today) {
      const x = ts.map(input.today);
      out.push(`<line class="today" x1="${r1(x)}" y1="${r1(axisY - 12)}" x2="${r1(x)}" y2="${r1(axisY + 24)}"/>`);
      const label = todayText(input);
      const anchor = x + textWidth(label, 12, 'mono') > W - L ? 'end' : 'start';
      out.push(text(anchor === 'end' ? x - 4 : x + 4, axisY + 36, label, { size: 12, cls: 'mono', anchor, where: 'today label' }));
    }
    for (const { e, x, left, row } of placed) {
      const ly = axisY - 18 - row * 17; // row 0 sits just above the axis
      out.push(`<line class="rule" x1="${r1(x)}" y1="${r1(ly + 4)}" x2="${r1(x)}" y2="${r1(axisY - 6)}"/>`);
      out.push(text(left, ly, e.label, { size: 12.5, where: 'event label' }));
      out.push(wrapMark(shape(e.shape ?? 'circle', x, axisY, 5.5, marks.attrs(e.state, e.tone), tip(nameOf(e))), nameOf(e), { href: e.href }));
    }
    bottom = axisY + (input.today ? 36 : 19);
  } else {
    const len = input.length ?? Math.max(240, events.length * 36);
    y = todayKey(input, out, y);
    const start = y + 18;
    const ts = timeScale(input.from, input.to, [start, start + len]);
    checkToday(input, ts);
    const axisX = L + 44;
    out.push(`<line class="axis" x1="${axisX}" y1="${r1(start)}" x2="${axisX}" y2="${r1(start + len)}"/>`);
    for (const t of ts.ticks) {
      const ty = ts.map(t.date);
      out.push(`<line class="tick" x1="${axisX - 5}" y1="${r1(ty)}" x2="${axisX}" y2="${r1(ty)}"/>`);
      out.push(text(axisX - 8, ty + 4, t.label, { size: 12, cls: 'num muted', anchor: 'end', where: 'tick' }));
    }
    if (input.today) {
      const ty = ts.map(input.today);
      out.push(`<line class="today" x1="${axisX - 5}" y1="${r1(ty)}" x2="${W - L}" y2="${r1(ty)}"/>`);
    }
    // Labels to the right; pushed down (with a leader) when they would overlap.
    let prev = -Infinity;
    const labelX = axisX + 22;
    for (const e of events) {
      const ty = ts.map(e.date);
      const lines = wrapText(e.label, W - L - labelX, 12.5, 'body', 2, 'event label');
      const ly = Math.max(ty + 4, prev + 15);
      if (ly - 4 > ty + 2) out.push(`<path class="rule" fill="none" d="M${axisX + 6} ${r1(ty)}L${labelX - 4} ${r1(ly - 4)}"/>`);
      lines.forEach((line, i) => out.push(text(labelX, ly + i * 15, line, { size: 12.5, where: 'event label' })));
      prev = ly + (lines.length - 1) * 15;
      out.push(wrapMark(shape(e.shape ?? 'circle', axisX, ty, 5.5, marks.attrs(e.state, e.tone), tip(nameOf(e))), nameOf(e), { href: e.href }));
    }
    bottom = Math.max(start + len + 4, prev + 4);
  }
  const { svg, height } = assemble({
    base: input,
    width: W,
    bottom,
    body: out,
    defs: marks.defs(),
    role: input.events.some((e) => e.href) ? 'group' : 'img',
    cls: vertical ? 'ch-strip ch-vertical' : 'ch-strip',
  });
  return { svg, table: pointTable(input, input.events), width: W, height };
}

// ------------------------------------------------------------------ lanes -- //

export interface TimeLaneItem {
  label: string;
  /** YYYY-MM-DD; with `end`, a bar from start to end, else a point mark. */
  start: string;
  end?: string;
  shape?: Shape;
  state?: MarkState;
  tone?: Tone;
  status?: string;
  href?: string;
}

export interface TimeLanesInput extends TimeBase {
  lanes: { label: string; items: TimeLaneItem[] }[];
  /** Horizontal: lane label column width (default 30 % of the width, at most 180). */
  labelWidth?: number;
}

/** One lane per series (swimlane / gantt) on a shared time axis. */
export function timeLanes(input: TimeLanesInput): ChartOutput {
  const vertical = input.orientation === 'vertical';
  const W = input.width ?? (vertical ? 340 : 720);
  const marks = markStyles(input.id);
  const out: string[] = [];
  let y = legendBlock(input, W, marks, out, 4);
  const itemName = (lane: string, it: TimeLaneItem) =>
    `${lane} · ${it.label} · ${it.start}${it.end ? ` to ${it.end}` : ''}${statusOf(it) ? ` · ${statusOf(it)}` : ''}`;
  for (const lane of input.lanes) {
    for (const it of lane.items) if (it.end && parseDay(it.end) < parseDay(it.start)) throw new Error(`charts(timeLanes ${input.id}): "${it.label}" ends before it starts`);
  }
  let bottom: number;
  if (!vertical) {
    const LW = input.labelWidth ?? Math.min(180, Math.round(W * 0.3));
    const x0 = L + LW + 8;
    const ts = timeScale(input.from, input.to, [x0 + 6, W - L - 6]);
    checkToday(input, ts);
    y += 16;
    for (const t of ts.ticks) out.push(text(ts.map(t.date), y, t.label, { size: 12, cls: 'num muted', anchor: 'middle', where: 'tick' }));
    y += 8;
    const gridTop = y;
    out.push(`<line class="axis" x1="${x0}" y1="${r1(y)}" x2="${W - L}" y2="${r1(y)}"/>`);
    const rows: string[] = [];
    for (const lane of input.lanes) {
      const lines = wrapText(lane.label, LW, 13, 'body', 2, 'lane label');
      const h = Math.max(28, lines.length * 15 + 12);
      lines.forEach((line, i) => rows.push(text(L, y + h / 2 + 4.5 - ((lines.length - 1) * 15) / 2 + i * 15, line, { size: 13, where: 'lane label' })));
      const cy = y + h / 2;
      for (const it of lane.items) {
        const name = itemName(lane.label, it);
        const xa = ts.map(it.start);
        const mark = it.end
          ? `<rect x="${r1(xa)}" y="${r1(cy - 6)}" width="${r1(Math.max(2, ts.map(it.end) - xa))}" height="12" rx="2" ${marks.attrs(it.state, it.tone)}>${tip(name)}</rect>`
          : shape(it.shape ?? 'circle', xa, cy, 5.5, marks.attrs(it.state, it.tone), tip(name));
        rows.push(wrapMark(mark, name, { href: it.href }));
      }
      y += h;
      rows.push(`<line class="rule" x1="${L}" y1="${r1(y)}" x2="${W - L}" y2="${r1(y)}"/>`);
    }
    for (const t of ts.ticks) {
      const x = r1(ts.map(t.date));
      out.push(`<line class="rule" x1="${x}" y1="${r1(gridTop)}" x2="${x}" y2="${r1(y)}"/>`);
    }
    if (input.today) {
      const x = ts.map(input.today);
      out.push(`<line class="today" x1="${r1(x)}" y1="${r1(gridTop - 4)}" x2="${r1(x)}" y2="${r1(y + 4)}"/>`);
      const label = todayText(input);
      const anchor = x + textWidth(label, 12, 'mono') > W - L ? 'end' : 'start';
      rows.push(text(anchor === 'end' ? x - 4 : x + 4, y + 18, label, { size: 12, cls: 'mono', anchor, where: 'today label' }));
      y += 18;
    }
    out.push(...rows);
    bottom = y;
  } else {
    y = todayKey(input, out, y);
    const axisX = L + 44;
    const colW = (W - L - axisX - 6) / Math.max(1, input.lanes.length);
    // Lane labels head their columns, up to three lines each.
    const heads = input.lanes.map((lane) => wrapText(lane.label, colW - 6, 12.5, 'body', 3, 'lane label'));
    const headH = Math.max(...heads.map((h) => h.length)) * 15;
    heads.forEach((lines, i) =>
      lines.forEach((line, j) => out.push(text(axisX + 6 + i * colW + colW / 2, y + 14 + j * 15, line, { size: 12.5, anchor: 'middle', where: 'lane label' }))),
    );
    const start = y + headH + 16;
    const len = input.length ?? 480;
    const ts = timeScale(input.from, input.to, [start, start + len]);
    checkToday(input, ts);
    out.push(`<line class="axis" x1="${axisX}" y1="${r1(start)}" x2="${axisX}" y2="${r1(start + len)}"/>`);
    for (const t of ts.ticks) {
      const ty = ts.map(t.date);
      out.push(`<line class="rule" x1="${axisX - 5}" y1="${r1(ty)}" x2="${W - L}" y2="${r1(ty)}"/>`);
      out.push(text(axisX - 8, ty + 4, t.label, { size: 12, cls: 'num muted', anchor: 'end', where: 'tick' }));
    }
    input.lanes.forEach((lane, i) => {
      const cx = axisX + 6 + i * colW + colW / 2;
      if (i > 0) out.push(`<line class="rule" x1="${r1(axisX + 6 + i * colW)}" y1="${r1(y)}" x2="${r1(axisX + 6 + i * colW)}" y2="${r1(start + len)}"/>`);
      for (const it of lane.items) {
        const name = itemName(lane.label, it);
        const ya = ts.map(it.start);
        const mark = it.end
          ? `<rect x="${r1(cx - 6)}" y="${r1(ya)}" width="12" height="${r1(Math.max(2, ts.map(it.end) - ya))}" rx="2" ${marks.attrs(it.state, it.tone)}>${tip(name)}</rect>`
          : shape(it.shape ?? 'circle', cx, ya, 5.5, marks.attrs(it.state, it.tone), tip(name));
        out.push(wrapMark(mark, name, { href: it.href }));
      }
    });
    if (input.today) {
      const ty = ts.map(input.today);
      out.push(`<line class="today" x1="${axisX - 5}" y1="${r1(ty)}" x2="${W - L}" y2="${r1(ty)}"/>`);
    }
    bottom = start + len + 4;
  }
  const flat = input.lanes.flatMap((lane) => lane.items.map((it) => ({ lane: lane.label, it })));
  const withStatus = flat.some(({ it }) => statusOf(it));
  const { svg, height } = assemble({
    base: input,
    width: W,
    bottom,
    body: out,
    defs: marks.defs(),
    role: flat.some(({ it }) => it.href) ? 'group' : 'img',
    cls: vertical ? 'ch-lanes ch-vertical' : 'ch-lanes',
  });
  return {
    svg,
    table: table(
      input.tableCaption ?? input.title,
      ['Lane', 'Item', 'Start', 'End', ...(withStatus ? ['Status'] : [])],
      flat.map(({ lane, it }) => [lane, it.label, it.start, it.end ?? '', ...(withStatus ? [statusOf(it)] : [])]),
    ),
    width: W,
    height,
  };
}

