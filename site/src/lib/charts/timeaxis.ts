// timeaxis.ts: charts on a time axis. Time runs left to right (horizontal) or
// top to bottom (vertical, for narrow widths); ticks are 1 January of round
// years (month starts on short spans), at most six; an optional dashed "today"
// line with its date. Marks carry their state by shape and fill, never colour
// alone, and each has a native tooltip. Linked marks are pointer targets and
// must keep the 24 px spacing of WCAG 2.5.8 (core.ts targets), else the build
// throws naming both.
//
//   timeStrip   one compact row of dated events (per obligation, per pattern),
//               labels stacked above the axis so they never collide
//   beeswarm    one dot per dated record, dots stacking away from the axis in
//               bins of one dot width (a dot plot), shape by status
//   timeLanes   one lane per series with dated points or start-to-end bars,
//               each labelled next to its mark (labels: 'none' for a dense gantt)
//
// The text-measurement and wrap-to-box idea comes from scripts/lib/posters.mjs
// (measure / wrapTo); the lane grouping itself (posters.mjs timelineModel) is
// domain logic and stays with the caller, who passes lanes already grouped.
import {
  assemble,
  besideLine,
  fitText,
  legend,
  markStyles,
  nonEmpty,
  parseDay,
  r1,
  rect,
  shape,
  shapeBox,
  stateWord,
  table,
  targets,
  text,
  textWidth,
  timeScale,
  words,
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

const statusOf = (p: { status?: string; state?: MarkState }, lang?: 'en' | 'es') =>
  p.status ?? (p.state ? stateWord(p.state, lang) : '');
const nameOf = (p: TimePoint, lang?: 'en' | 'es') => `${p.label} · ${p.date}${statusOf(p, lang) ? ` · ${statusOf(p, lang)}` : ''}`;

/** Chronological order with the label as tie-break, independent of locale. */
function chrono<T extends { label: string }>(items: T[], date: (t: T) => string): T[] {
  return [...items].sort((a, b) => {
    const da = date(a);
    const db = date(b);
    return da < db ? -1 : da > db ? 1 : a.label < b.label ? -1 : a.label > b.label ? 1 : 0;
  });
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

/** "Today <date>", measured against the room it gets. */
function todayText(input: TimeBase, maxPx: number): { label: string; w: number } {
  const label = `${input.todayLabel ?? words(input.lang).today} ${input.today}`;
  fitText(label, maxPx, 12, 'mono', 'today label');
  return { label, w: textWidth(label, 12, 'mono') };
}

/** A today label beside the dashed line at x (horizontal charts). */
function todayBeside(input: TimeBase, out: string[], x: number, y: number, W: number) {
  const { label, w } = todayText(input, W - 2 * L);
  out.push(text(besideLine(x, w, W, L), y, label, { size: 12, cls: 'mono', where: 'today label' }));
}

/** Vertical charts name the today line in a key above the axis, since a label
 *  on the line would sit on the marks. Returns the y under the key. */
function todayKey(input: TimeBase, out: string[], y: number, W: number): number {
  if (!input.today) return y;
  const { label } = todayText(input, W - 2 * L - 28);
  out.push(`<line class="today" x1="${L}" y1="${r1(y + 10)}" x2="${L + 22}" y2="${r1(y + 10)}"/>`);
  out.push(text(L + 28, y + 14, label, { size: 12, cls: 'mono', where: 'today label' }));
  return y + 22;
}

function pointTable(input: TimeBase, points: TimePoint[]) {
  const w = words(input.lang);
  const withStatus = points.some((p) => statusOf(p, input.lang));
  return table(
    input.tableCaption ?? input.title,
    [w.date, w.item, ...(withStatus ? [w.status] : [])],
    points.map((p) => [p.date, p.label, ...(withStatus ? [statusOf(p, input.lang)] : [])]),
  );
}

// -------------------------------------------------------------- beeswarm -- //

export interface BeeswarmInput extends TimeBase {
  points: TimePoint[];
  /** Dot radius (default 5). */
  r?: number;
}

/** One dot per dated record, stacked in bins away from the axis. With links
 *  the bin grows to 24 px (the pointer-target spacing); the dots stay small. */
export function beeswarm(input: BeeswarmInput): ChartOutput {
  const where = `beeswarm ${input.id}`;
  nonEmpty(input.points, 'points', where);
  const vertical = input.orientation === 'vertical';
  const W = input.width ?? (vertical ? 340 : 640);
  const r = input.r ?? 5;
  const linked = input.points.some((p) => p.href);
  const bin = Math.max(2 * r + 2, linked ? 24 : 0);
  const marks = markStyles(input.id);
  const hits = targets(where);
  const out: string[] = [];
  let y = legendBlock(input, W, marks, out, 4);
  if (input.today && !vertical) y += 20;
  if (vertical) y = todayKey(input, out, y, W);
  const axisLen = vertical ? (input.length ?? 480) : W - 2 * L - 16;
  const start = vertical ? y + 16 : L + 8;
  const ts = timeScale(input.from, input.to, [start, start + axisLen]);
  checkToday(input, ts);
  // Bin each point (chronological order) and count the stack height.
  const stacks = new Map<number, number>();
  const placed = chrono(input.points, (p) => p.date).map((p) => {
    const at = ts.map(p.date);
    const col = Math.floor((at - start) / bin);
    const k = stacks.get(col) ?? 0;
    stacks.set(col, k + 1);
    return { p, along: start + col * bin + bin / 2, k };
  });
  const maxStack = Math.max(1, ...stacks.values());
  const dot = (p: TimePoint, cx: number, cy: number) => {
    const kind = p.shape ?? 'circle';
    const attrs = marks.attrs(p.state, p.tone);
    return hits.mark((inner) => shape(kind, cx, cy, r, attrs, inner), nameOf(p, input.lang), shapeBox(kind, cx, cy, r), { href: p.href });
  };
  const dots: string[] = [];
  let bottom: number;
  if (!vertical) {
    const axisY = y + 8 + maxStack * bin;
    for (const { p, along, k } of placed) dots.push(dot(p, along, axisY - bin / 2 - 2 - k * bin));
    out.push(`<line class="axis" x1="${r1(start)}" y1="${r1(axisY)}" x2="${r1(start + axisLen)}" y2="${r1(axisY)}"/>`);
    for (const t of ts.ticks) {
      const x = ts.map(t.date);
      out.push(`<line class="tick" x1="${r1(x)}" y1="${r1(axisY)}" x2="${r1(x)}" y2="${r1(axisY + 5)}"/>`);
      out.push(text(x, axisY + 19, t.label, { size: 12, cls: 'num muted', anchor: 'middle', where: 'tick' }));
    }
    if (input.today) {
      const x = ts.map(input.today);
      out.push(`<line class="today" x1="${r1(x)}" y1="${r1(y)}" x2="${r1(x)}" y2="${r1(axisY + 5)}"/>`);
      const { label, w } = todayText(input, W - 2 * L);
      out.push(text(Math.max(L, Math.min(x - w / 2, W - L - w)), y - 4, label, { size: 12, cls: 'mono', where: 'today label' }));
    }
    bottom = axisY + 19;
  } else {
    const axisX = L + 44;
    const need = axisX + 2 + maxStack * bin;
    if (need > W - L) {
      throw new Error(`charts(${where}): a stack of ${maxStack} dots needs ${Math.ceil(need + L)}px of width; lengthen the axis or shrink r`);
    }
    for (const { p, along, k } of placed) dots.push(dot(p, axisX + 2 + bin / 2 + k * bin, along));
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
    role: linked ? 'group' : 'img',
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
  const where = `timeStrip ${input.id}`;
  nonEmpty(input.events, 'events', where);
  const vertical = input.orientation === 'vertical';
  const W = input.width ?? (vertical ? 340 : 640);
  const marks = markStyles(input.id);
  const hits = targets(where);
  const out: string[] = [];
  let y = legendBlock(input, W, marks, out, 2);
  const events = chrono(input.events, (e) => e.date);
  const R = 5.5;
  const point = (e: TimePoint, cx: number, cy: number) => {
    const kind = e.shape ?? 'circle';
    const attrs = marks.attrs(e.state, e.tone);
    return hits.mark((inner) => shape(kind, cx, cy, R, attrs, inner), nameOf(e, input.lang), shapeBox(kind, cx, cy, R), { href: e.href });
  };
  let bottom: number;
  if (!vertical) {
    const ts = timeScale(input.from, input.to, [L + 8, W - L - 8]);
    checkToday(input, ts);
    // Greedy label rows: each label takes the lowest row where it clears the
    // previous label by 6px; more than three rows is a layout error.
    const ends: number[] = [];
    const placed = events.map((e) => {
      const x = ts.map(e.date);
      fitText(e.label, W - 2 * L, 12.5, 'body', 'event label');
      const w = textWidth(e.label, 12.5);
      const left = Math.max(L, Math.min(x - w / 2, W - L - w));
      let row = ends.findIndex((end) => left >= end + 6);
      if (row === -1) row = ends.length;
      if (row > 2) throw new Error(`charts(${where}): label "${e.label}" collides with its neighbours; shorten the labels`);
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
      todayBeside(input, out, x, axisY + 36, W);
    }
    for (const { e, x, left, row } of placed) {
      const ly = axisY - 18 - row * 17; // row 0 sits just above the axis
      out.push(`<line class="rule" x1="${r1(x)}" y1="${r1(ly + 4)}" x2="${r1(x)}" y2="${r1(axisY - 6)}"/>`);
      out.push(text(left, ly, e.label, { size: 12.5, where: 'event label' }));
      out.push(point(e, x, axisY));
    }
    bottom = axisY + (input.today ? 36 : 19);
  } else {
    const len = input.length ?? Math.max(240, events.length * 36);
    y = todayKey(input, out, y, W);
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
      out.push(point(e, axisX, ty));
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
  /** 'inline' (default): each item's label next to its mark (horizontal: in up
   *  to three rows above the marks of its lane; vertical: right of the mark,
   *  pushed down with a leader when labels would overlap). 'none': marks only,
   *  named by tooltip and table, for a dense gantt. */
  labels?: 'inline' | 'none';
}

/** One lane per series (swimlane / gantt) on a shared time axis. */
export function timeLanes(input: TimeLanesInput): ChartOutput {
  const where = `timeLanes ${input.id}`;
  nonEmpty(input.lanes.flatMap((lane) => lane.items), 'items', where);
  const w = words(input.lang);
  const vertical = input.orientation === 'vertical';
  const inline = (input.labels ?? 'inline') === 'inline';
  const W = input.width ?? (vertical ? 340 : 720);
  const marks = markStyles(input.id);
  const hits = targets(where);
  const out: string[] = [];
  let y = legendBlock(input, W, marks, out, 4);
  const itemName = (lane: string, it: TimeLaneItem) =>
    `${lane} · ${it.label} · ${it.start}${it.end ? ` ${w.to} ${it.end}` : ''}${statusOf(it, input.lang) ? ` · ${statusOf(it, input.lang)}` : ''}`;
  for (const lane of input.lanes) {
    for (const it of lane.items) if (it.end && parseDay(it.end) < parseDay(it.start)) throw new Error(`charts(${where}): "${it.label}" ends before it starts`);
  }
  /** A point or a bar from `a` to `b` along time, at `c` across it. */
  const item = (lane: string, it: TimeLaneItem, a: number, b: number | undefined, c: number, across: 'y' | 'x') => {
    const name = itemName(lane, it);
    const attrs = marks.attrs(it.state, it.tone);
    if (b === undefined) {
      const kind = it.shape ?? 'circle';
      const [cx, cy] = across === 'y' ? [a, c] : [c, a];
      return hits.mark((inner) => shape(kind, cx, cy, 5.5, attrs, inner), name, shapeBox(kind, cx, cy, 5.5), { href: it.href });
    }
    const len = Math.max(2, b - a);
    const box = across === 'y' ? { x: a, y: c - 6, w: len, h: 12 } : { x: c - 6, y: a, w: 12, h: len };
    return hits.mark((inner) => rect(box.x, box.y, box.w, box.h, `rx="2" ${attrs}`, inner), name, box, { href: it.href });
  };
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
      // Item labels: greedy rows (lowest row that clears the previous label by
      // 6px), at most three; a point's label centres on it, a bar's starts at it.
      const ends: number[] = [];
      const labels = inline
        ? chrono(lane.items, (it) => it.start).map((it) => {
            fitText(it.label, W - L - x0, 12.5, 'body', 'item label');
            const lw = textWidth(it.label, 12.5);
            const xa = ts.map(it.start);
            const left = Math.max(x0, Math.min(it.end ? xa : xa - lw / 2, W - L - lw));
            let row = ends.findIndex((end) => left >= end + 6);
            if (row === -1) row = ends.length;
            if (row > 2) throw new Error(`charts(${where}): item label "${it.label}" collides with its neighbours in lane "${lane.label}"; shorten the labels or use labels: 'none'`);
            ends[row] = left + lw;
            return { it, left, row };
          })
        : [];
      const h = Math.max(28, lines.length * 15 + 12, ends.length ? ends.length * 15 + 28 : 0);
      const cy = ends.length ? y + h - 14 : y + h / 2;
      lines.forEach((line, i) => rows.push(text(L, y + h / 2 + 4.5 - ((lines.length - 1) * 15) / 2 + i * 15, line, { size: 13, where: 'lane label' })));
      for (const { it, left, row } of labels) rows.push(text(left, cy - 12 - row * 15, it.label, { size: 12.5, where: 'item label' }));
      for (const it of lane.items) rows.push(item(lane.label, it, ts.map(it.start), it.end ? ts.map(it.end) : undefined, cy, 'y'));
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
      todayBeside(input, rows, x, y + 18, W);
      y += 18;
    }
    out.push(...rows);
    bottom = y;
  } else {
    y = todayKey(input, out, y, W);
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
    let labelsBottom = 0;
    input.lanes.forEach((lane, i) => {
      const x = axisX + 6 + i * colW;
      // Inline: marks at the column's left, labels right of them; else centred.
      const cx = inline ? x + 12 : x + colW / 2;
      if (i > 0) out.push(`<line class="rule" x1="${r1(x)}" y1="${r1(y)}" x2="${r1(x)}" y2="${r1(start + len)}"/>`);
      let prev = -Infinity;
      for (const it of chrono(lane.items, (t) => t.start)) {
        const ya = ts.map(it.start);
        out.push(item(lane.label, it, ya, it.end ? ts.map(it.end) : undefined, cx, 'x'));
        if (!inline) continue;
        const lx = x + 26;
        const lines = wrapText(it.label, x + colW - 4 - lx, 12.5, 'body', 2, 'item label');
        const ly = Math.max(ya + 4, prev + 15);
        if (ly - 4 > ya + 2) out.push(`<path class="rule" fill="none" d="M${r1(cx + 7)} ${r1(ya)}L${r1(lx - 3)} ${r1(ly - 4)}"/>`);
        lines.forEach((line, k) => out.push(text(lx, ly + k * 15, line, { size: 12.5, where: 'item label' })));
        prev = ly + (lines.length - 1) * 15;
        labelsBottom = Math.max(labelsBottom, prev + 4);
      }
    });
    if (input.today) {
      const ty = ts.map(input.today);
      out.push(`<line class="today" x1="${axisX - 5}" y1="${r1(ty)}" x2="${W - L}" y2="${r1(ty)}"/>`);
    }
    bottom = Math.max(start + len + 4, labelsBottom);
  }
  const flat = input.lanes.flatMap((lane) => lane.items.map((it) => ({ lane: lane.label, it })));
  const withStatus = flat.some(({ it }) => statusOf(it, input.lang));
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
      [w.lane, w.item, w.start, w.end, ...(withStatus ? [w.status] : [])],
      flat.map(({ lane, it }) => [lane, it.label, it.start, it.end ?? '', ...(withStatus ? [statusOf(it, input.lang)] : [])]),
    ),
    width: W,
    height,
  };
}
