// bars.ts: horizontal bar charts. Every bar starts at zero, the axis carries
// its unit and at most six round ticks, gridlines are hairlines, values are
// labelled directly at the bar end (VISUAL-GUIDE §4.2, §4.3).
//
//   rankedBars    one bar per item, sorted (default: largest first)
//   lollipop      the same data as a stem and a dot
//   stackedBars   one bar per item split into series (state or layer per series)
//   stacked100    the same, each bar scaled to 100 %
//   divergingBars a butterfly: left and right values per item around a centre
//                 label column (optionally split into parts, e.g. core/related)
//   dumbbell      a date-to-date move per item (outline = from, filled = to)
//
// Wide (width >= 480) puts the item label in a column left of the bars; narrow
// puts it on its own line above the bar, so the same call at NARROW_WIDTH
// gives the phone variant.
import {
  asOfMark,
  assemble,
  fitText,
  fmt,
  hitRect,
  legend,
  linearScale,
  linkText,
  markClass,
  markStyles,
  minText,
  nonEmpty,
  r1,
  shape,
  table,
  text,
  textWidth,
  timeScale,
  tip,
  words,
  wrapText,
  type ChartBase,
  type ChartOutput,
  type MarkState,
  type Tone,
} from './core';

const L = 12;
const VALUE_W = 52; // room for the value label after the longest bar
const WIDE_AT = 480;

export interface BarItem {
  label: string;
  value: number;
  tone?: Tone;
  state?: MarkState;
  /** The one value the caption is about: drawn in solid ink (the accent). */
  highlight?: boolean;
  href?: string;
}

export interface RankedBarsInput extends ChartBase {
  items: BarItem[];
  /** Axis quantity and unit ("clauses", "share of rows, %"). */
  unit: string;
  /** Append % to every value label. */
  percent?: boolean;
  /** 'desc' (default), 'asc' or 'none' (keep the input order). */
  sort?: 'desc' | 'asc' | 'none';
  /** Table heading of the label column (default "Item"). */
  itemHeader?: string;
  /** Wide label column width (default 30 % of the width, at most 200). */
  labelWidth?: number;
}

interface Frame {
  wide: boolean;
  x0: number; // zero of the value axis
  x1: number; // end of the value axis
  labelW: number;
  sm: number; // smallest text (core minText)
}

function frame(W: number, labelWidth: number | undefined): Frame {
  const wide = W >= WIDE_AT;
  const labelW = wide ? (labelWidth ?? Math.min(200, Math.round(W * 0.3))) : W - 2 * L - 6;
  const x0 = wide ? L + labelW + 8 : L;
  return { wide, x0, x1: W - L - VALUE_W, labelW, sm: minText(W) };
}

/** Axis title, tick labels and the gridlines' top; returns the first row y. */
function axisTop(out: string[], f: Frame, ticks: { at: number; label: string }[], unit: string, y: number): number {
  out.push(text(f.x0, y, unit, { size: f.sm, cls: 'mono muted', where: 'axis title' }));
  y += 17;
  for (const t of ticks) out.push(text(t.at, y, t.label, { size: f.sm, cls: 'num muted', anchor: 'middle', where: 'tick' }));
  return y + 8;
}

/** Item label: beside the bar (wide) or above it (narrow), up to `maxLines`. */
function itemLabel(out: string[], f: Frame, label: string, y: number, barH: number, href?: string, maxLines = 2): { rowTop: number; barY: number } {
  const lines = wrapText(label, f.labelW, 13, 'body', maxLines, 'item label');
  const els = lines.map((line, i) =>
    f.wide
      ? text(L, y + barH / 2 + 4.5 - ((lines.length - 1) * 15) / 2 + i * 15, line, { size: 13, where: 'item label' })
      : text(f.x0 + 6, y + 13 + i * 15, line, { size: 13, where: 'item label' }),
  );
  out.push(href ? linkText(els.join(''), label, href) : els.join(''));
  if (f.wide) return { rowTop: y, barY: y + Math.max(0, ((lines.length - 1) * 15) / 2) };
  return { rowTop: y, barY: y + lines.length * 15 + 5 };
}

/** x of a value label that starts at `x`: moved just past any gridline
 *  (other than zero) it would sit on, so the line never runs through it. */
function clearOfGrid(x: number, label: string, ticks: number[], map: (v: number) => number): number {
  const w = textWidth(label, 12.5, 'mono');
  for (const t of ticks) {
    const g = map(t);
    if (t !== 0 && g > x - 3 && g < x + w + 3) return g + 4;
  }
  return x;
}

function gridlines(out: string[], ticks: number[], map: (v: number) => number, y0: number, y1: number) {
  for (const t of ticks) {
    const x = r1(map(t));
    out.push(`<line class="${t === 0 ? 'axis' : 'rule'}" x1="${x}" y1="${r1(y0)}" x2="${x}" y2="${r1(y1)}"/>`);
  }
}

function sorted(items: BarItem[], sort: RankedBarsInput['sort']): BarItem[] {
  const copy = [...items];
  if (sort === 'none') return copy;
  return copy.sort((a, b) => (sort === 'asc' ? a.value - b.value : b.value - a.value));
}

function rankedCore(input: RankedBarsInput, style: 'bar' | 'lollipop'): ChartOutput {
  nonEmpty(input.items, 'items', `bars ${input.id}`);
  const W = input.width ?? 640;
  const f = frame(W, input.labelWidth);
  const items = sorted(input.items, input.sort ?? 'desc');
  for (const i of items) if (!(i.value >= 0)) throw new Error(`charts(bars ${input.id}): "${i.label}" has value ${i.value}; bars start at zero`);
  const s = linearScale(items.map((i) => i.value), [f.x0, f.x1], { integer: items.every((i) => Number.isInteger(i.value)) });
  const marks = markStyles(input.id);
  const out: string[] = [];
  const unitSuffix = input.percent ? '%' : '';
  let y = axisTop(out, f, s.ticks.map((t) => ({ at: s.map(t), label: `${fmt(t)}${unitSuffix}` })), input.unit, 16);
  const gridTop = y - 2;
  const rows: string[] = [];
  const BAR_H = 16;
  for (const item of items) {
    // A linked item is one target, the whole row (label, bar and value) and
    // at least 24 high: its label alone is one 16 px line (WCAG 2.5.8).
    const own: string[] = [];
    const { barY } = itemLabel(own, f, item.label, y, BAR_H);
    const w = s.map(item.value) - s.map(0);
    const name = `${item.label}: ${fmt(item.value)}${unitSuffix} ${input.percent ? '' : input.unit}`.trim();
    const attrs = item.highlight ? 'class="mk mk-hi"' : marks.attrs(item.state, item.tone);
    if (style === 'bar') {
      own.push(`<rect x="${r1(s.map(0))}" y="${r1(barY)}" width="${r1(w)}" height="${BAR_H}" ${attrs}>${tip(name)}</rect>`);
    } else {
      own.push(`<line class="stem" x1="${r1(s.map(0))}" y1="${r1(barY + BAR_H / 2)}" x2="${r1(s.map(item.value))}" y2="${r1(barY + BAR_H / 2)}"/>`);
      own.push(shape('circle', s.map(item.value), barY + BAR_H / 2, 6, attrs, tip(name)));
    }
    const valueText = `${fmt(item.value)}${unitSuffix}`;
    const valueEl = text(clearOfGrid(s.map(item.value) + (style === 'bar' ? 6 : 11), valueText, s.ticks, s.map), barY + BAR_H / 2 + 4.5, valueText, {
      size: 12.5,
      cls: 'num',
      where: 'value label',
    });
    const next = barY + BAR_H + 10;
    // The value sits outside the <a> (over its row target) so the link's
    // underline marks the label, not the number.
    rows.push((item.href ? linkText(hitRect(y - 8, next - y) + own.join(''), item.label, item.href) : own.join('')) + valueEl);
    y = next;
  }
  gridlines(out, s.ticks, s.map, gridTop, y - 4);
  out.push(...rows);
  const { svg, height } = assemble({
    base: input,
    width: W,
    bottom: y - 4,
    body: out,
    defs: marks.defs(),
    role: items.some((i) => i.href) ? 'group' : 'img',
    cls: style === 'bar' ? 'ch-bars' : 'ch-lollipop',
  });
  return {
    svg,
    table: table(input.tableCaption ?? input.title, [input.itemHeader ?? words(input.lang).item, input.unit], items.map((i) => [i.label, i.value])),
    width: W,
    height,
  };
}

/** Ranked horizontal bars from zero. */
export const rankedBars = (input: RankedBarsInput): ChartOutput => rankedCore(input, 'bar');
/** Ranked lollipops (stem + dot) from zero. */
export const lollipop = (input: RankedBarsInput): ChartOutput => rankedCore(input, 'lollipop');

// ---------------------------------------------------------------- stacked -- //

export interface StackSeries {
  label: string;
  tone?: Tone;
  state?: MarkState;
}

export interface StackedBarsInput extends ChartBase {
  /** One entry per part of a bar, drawn left to right, shown in a legend. */
  series: StackSeries[];
  /** values[i] belongs to series[i]. */
  items: { label: string; values: number[]; href?: string }[];
  unit: string;
  itemHeader?: string;
  labelWidth?: number;
}

function stackedCore(input: StackedBarsInput, percent: boolean): ChartOutput {
  nonEmpty(input.items, 'items', `stacked ${input.id}`);
  nonEmpty(input.series, 'series', `stacked ${input.id}`);
  const w = words(input.lang);
  const W = input.width ?? 640;
  const f = frame(W, input.labelWidth);
  for (const item of input.items) {
    if (item.values.length !== input.series.length || item.values.some((v) => !(v >= 0))) {
      throw new Error(`charts(stacked ${input.id}): "${item.label}" needs ${input.series.length} values of zero or more`);
    }
  }
  const totals = input.items.map((i) => i.values.reduce((a, b) => a + b, 0));
  const s = percent
    ? linearScale([0, 100], [f.x0, f.x1], { integer: true, maxTicks: 5 })
    : linearScale(totals, [f.x0, f.x1], { integer: input.items.every((i) => i.values.every(Number.isInteger)) });
  const marks = markStyles(input.id);
  const out: string[] = [];
  const lg = legend(
    input.series.map((sr) => ({ label: sr.label, state: sr.state, tone: sr.tone, swatch: 'bar' as const })),
    L,
    16,
    W - L,
    marks,
  );
  out.push(...lg.els);
  let y = axisTop(
    out,
    f,
    s.ticks.map((t) => ({ at: s.map(t), label: `${fmt(t)}${percent ? '%' : ''}` })),
    percent ? `${input.unit}, %` : input.unit,
    lg.bottom + 24,
  );
  const gridTop = y - 2;
  const rows: string[] = [];
  const BAR_H = 18;
  input.items.forEach((item, i) => {
    const { barY } = itemLabel(rows, f, item.label, y, BAR_H, item.href);
    let acc = 0;
    item.values.forEach((v, k) => {
      const share = percent ? (totals[i] ? (v / totals[i]) * 100 : 0) : v;
      const xa = s.map(acc);
      const xb = s.map(acc + share);
      acc += share;
      if (v === 0) return;
      const sr = input.series[k];
      const name = `${item.label} · ${sr.label}: ${fmt(v)} ${input.unit}${percent ? ` (${fmt(share)}%)` : ''}`;
      rows.push(`<rect x="${r1(xa)}" y="${r1(barY)}" width="${r1(xb - xa)}" height="${BAR_H}" ${marks.attrs(sr.state, sr.tone)}>${tip(name)}</rect>`);
    });
    if (!percent) {
      rows.push(text(s.map(totals[i]) + 6, barY + BAR_H / 2 + 4.5, fmt(totals[i]), { size: 12.5, cls: 'num', where: 'total label' }));
    }
    y = barY + BAR_H + 10;
  });
  gridlines(out, s.ticks, s.map, gridTop, y - 4);
  out.push(...rows);
  const { svg, height } = assemble({
    base: input,
    width: W,
    bottom: y - 4,
    body: out,
    defs: marks.defs(),
    role: input.items.some((i) => i.href) ? 'group' : 'img',
    cls: percent ? 'ch-stack100' : 'ch-stack',
  });
  return {
    svg,
    table: table(
      input.tableCaption ?? input.title,
      [input.itemHeader ?? w.item, ...input.series.map((sr) => sr.label), w.total],
      input.items.map((item, i) => [item.label, ...item.values, totals[i]]),
    ),
    width: W,
    height,
  };
}

/** Stacked horizontal bars from zero, one part per series. */
export const stackedBars = (input: StackedBarsInput): ChartOutput => stackedCore(input, false);
/** Stacked bars scaled to 100 % each (the table keeps the raw counts). */
export const stacked100 = (input: StackedBarsInput): ChartOutput => stackedCore(input, true);

// -------------------------------------------------------------- diverging -- //

export interface DivergingBarsInput extends ChartBase {
  left: { label: string; tone?: Tone };
  right: { label: string; tone?: Tone };
  /** A number, or one number per part when `segments` names the parts. */
  items: { label: string; left: number | number[]; right: number | number[]; note?: string; href?: string }[];
  /** Part names: part 0 filled, part 1 hatched, part 2 outline. */
  segments?: string[];
  unit: string;
  itemHeader?: string;
  /** Centre label column width in the wide layout (default 170). */
  labelWidth?: number;
}

const PART_STATES: MarkState[] = ['filled', 'hatched', 'outline', 'dashed'];

/** A butterfly chart: left values grow left, right values grow right. */
export function divergingBars(input: DivergingBarsInput): ChartOutput {
  nonEmpty(input.items, 'items', `diverging ${input.id}`);
  const w = words(input.lang);
  const W = input.width ?? 720;
  const wide = W >= WIDE_AT;
  const parts = input.segments ?? [''];
  const partsOf = (v: number | number[], label: string): number[] => {
    const arr = Array.isArray(v) ? v : [v];
    if (arr.length !== parts.length || arr.some((n) => !(n >= 0))) {
      throw new Error(`charts(diverging ${input.id}): "${label}" needs ${parts.length} values of zero or more per side`);
    }
    return arr;
  };
  const items = input.items.map((i) => ({ ...i, l: partsOf(i.left, i.label), r: partsOf(i.right, i.label) }));
  const sum = (a: number[]) => a.reduce((x, y) => x + y, 0);
  const LW = wide ? (input.labelWidth ?? 170) : W - 2 * L;
  const cx = W / 2;
  const half = wide ? cx - LW / 2 - 6 - L - 30 : cx - L - 30;
  const s = linearScale(items.flatMap((i) => [sum(i.l), sum(i.r)]), [0, half], { integer: true, maxTicks: 4 });
  const lz = wide ? cx - LW / 2 - 6 : cx; // zero of the left bars
  const rz = wide ? cx + LW / 2 + 6 : cx; // zero of the right bars
  const marks = markStyles(input.id);
  const out: string[] = [];
  let y = 16;
  fitText(input.left.label, half, 13, 'body', 'side label');
  fitText(input.right.label, half, 13, 'body', 'side label');
  out.push(text(wide ? lz : cx - 8, y, input.left.label, { size: 13, weight: 600, anchor: 'end', where: 'side label' }));
  out.push(text(wide ? rz : cx + 8, y, input.right.label, { size: 13, weight: 600, where: 'side label' }));
  if (input.segments) {
    const lg = legend(
      parts.map((p, k) => ({ label: p, state: PART_STATES[k], tone: 0 as Tone, swatch: 'bar' as const })),
      L,
      y + 22,
      W - L,
      marks,
    );
    out.push(...lg.els);
    y = lg.bottom;
  }
  y += 22;
  const sm = minText(W);
  out.push(text(L, y, input.unit, { size: sm, cls: 'mono muted', where: 'axis title' }));
  y += 17;
  for (const t of s.ticks) {
    out.push(text(lz - s.map(t), y, fmt(t), { size: sm, cls: 'num muted', anchor: 'middle', where: 'tick' }));
    if (wide || t !== 0) out.push(text(rz + s.map(t), y, fmt(t), { size: sm, cls: 'num muted', anchor: 'middle', where: 'tick' }));
  }
  y += 8;
  const gridTop = y - 2;
  const rows: string[] = [];
  const BAR_H = 16;
  for (const item of items) {
    const lines = wrapText(item.label, LW, 13, 'body', 2, 'item label');
    const all = item.note ? [...lines, item.note] : lines;
    if (item.note) fitText(item.note, LW, sm, 'body', 'item note');
    const labelEls = all.map((line, i) => {
      const isNote = item.note !== undefined && i === all.length - 1;
      const ly = wide ? y + BAR_H / 2 + 4.5 - ((all.length - 1) * 15) / 2 + i * 15 : y + 13 + i * 15;
      return text(cx, ly, line, { size: isNote ? sm : 13, cls: isNote ? 'ink2' : '', anchor: 'middle', where: 'item label' });
    });
    rows.push(item.href ? linkText(labelEls.join(''), item.label, item.href) : labelEls.join(''));
    const barY = wide ? y + Math.max(0, ((all.length - 1) * 15) / 2) : y + all.length * 15 + 5;
    const side = (vals: number[], dir: -1 | 1, zero: number, tone: Tone | undefined, who: string) => {
      let acc = 0;
      vals.forEach((v, k) => {
        if (v === 0) return;
        const a = zero + dir * s.map(acc);
        const b = zero + dir * s.map(acc + v);
        acc += v;
        const name = `${item.label} · ${who}${parts[k] ? ` (${parts[k]})` : ''}: ${fmt(v)} ${input.unit}`;
        rows.push(
          `<rect x="${r1(Math.min(a, b))}" y="${r1(barY)}" width="${r1(Math.abs(b - a))}" height="${BAR_H}" ${marks.attrs(PART_STATES[k], tone)}>${tip(name)}</rect>`,
        );
      });
      const end = zero + dir * s.map(acc);
      rows.push(text(end + dir * 5, barY + BAR_H / 2 + 4.5, fmt(acc), { size: 12.5, cls: 'num', anchor: dir < 0 ? 'end' : 'start', where: 'value label' }));
    };
    side(item.l, -1, lz, input.left.tone, input.left.label);
    side(item.r, 1, rz, input.right.tone, input.right.label);
    y = barY + BAR_H + 12;
  }
  for (const t of s.ticks) {
    const cls = t === 0 ? 'axis' : 'rule';
    out.push(`<line class="${cls}" x1="${r1(lz - s.map(t))}" y1="${r1(gridTop)}" x2="${r1(lz - s.map(t))}" y2="${r1(y - 6)}"/>`);
    if (wide || t !== 0) out.push(`<line class="${cls}" x1="${r1(rz + s.map(t))}" y1="${r1(gridTop)}" x2="${r1(rz + s.map(t))}" y2="${r1(y - 6)}"/>`);
  }
  out.push(...rows);
  const named = input.segments !== undefined;
  const columns = [
    input.itemHeader ?? w.item,
    ...parts.map((p) => (named ? `${input.left.label} (${p})` : input.left.label)),
    ...parts.map((p) => (named ? `${input.right.label} (${p})` : input.right.label)),
    ...(items.some((i) => i.note) ? [w.note] : []),
  ];
  const tableRows = items.map((i) => [i.label, ...i.l, ...i.r, ...(items.some((x) => x.note) ? [i.note ?? ''] : [])]);
  const { svg, height } = assemble({
    base: input,
    width: W,
    bottom: y - 6,
    body: out,
    defs: marks.defs(),
    role: items.some((i) => i.href) ? 'group' : 'img',
    cls: 'ch-diverging',
  });
  return { svg, table: table(input.tableCaption ?? input.title, columns, tableRows), width: W, height };
}

// --------------------------------------------------------------- dumbbell -- //

export interface DumbbellInput extends ChartBase {
  /** from and to are YYYY-MM-DD dates. */
  /** `note` (optional) is printed beside the later dot, e.g. the delay
   *  ("+16 months"), and fills a table column headed `noteHeader`. */
  items: { label: string; from: string; to: string; href?: string; note?: string }[];
  /** Legend and table words for the two ends ("Original date", "New date"). */
  fromLabel: string;
  toLabel: string;
  /** Time domain (default: 1 January of the first year to 1 January after the last). */
  domain?: [string, string];
  /** The data's as-of date (YYYY-MM-DD, inside the domain): a dashed line
   *  labelled "As of <date>" (core asOfMark), never the build clock. */
  today?: string;
  itemHeader?: string;
  /** Table heading of the note column (default "Note"); used only when an
   *  item has a note. */
  noteHeader?: string;
  /** Wide label column width (default 40 % of the width, at most 260: the
   *  dates need less room than a value axis). Labels take up to three lines. */
  labelWidth?: number;
}

/** Date-to-date moves: an outline dot at `from`, a filled dot at `to`. */
export function dumbbell(input: DumbbellInput): ChartOutput {
  nonEmpty(input.items, 'items', `dumbbell ${input.id}`);
  const w = words(input.lang);
  const W = input.width ?? 640;
  const f = frame(W, input.labelWidth ?? Math.min(260, Math.round(W * 0.4)));
  const dates = input.items.flatMap((i) => [i.from, i.to]).sort();
  const domain = input.domain ?? [`${dates[0].slice(0, 4)}-01-01`, `${Number(dates[dates.length - 1].slice(0, 4)) + 1}-01-01`];
  const ts = timeScale(domain[0], domain[1], [f.x0 + 8, f.x1 + VALUE_W - 8]);
  const marks = markStyles(input.id);
  const out: string[] = [];
  const lg = legend(
    [
      { label: input.fromLabel, shape: 'circle', state: 'outline' },
      { label: input.toLabel, shape: 'circle', state: 'filled' },
    ],
    L,
    16,
    W - L,
    marks,
  );
  out.push(...lg.els);
  let y = lg.bottom + 22;
  const mark = input.today ? asOfMark(ts, input.today, input.lang, { width: W, axis: 'x', pad: L }) : undefined;
  for (const t of ts.ticks) out.push(text(ts.map(t.date), y, t.label, { size: f.sm, cls: 'num muted', anchor: 'middle', where: 'tick' }));
  y += 8;
  const gridTop = y - 2;
  const rows: string[] = [];
  const H = 16;
  // Narrow: the mark band of each row, for an as-of line that skips the labels.
  const markBands: [number, number][] = [];
  for (const item of input.items) {
    const { barY } = itemLabel(rows, f, item.label, y, H, item.href, 3);
    const cy = barY + H / 2;
    markBands.push([barY - 3, barY + H + 3]);
    const xa = ts.map(item.from);
    const xb = ts.map(item.to);
    if (Math.abs(xb - xa) > 12) {
      const dir = xb > xa ? 1 : -1;
      rows.push(`<line class="stem" x1="${r1(xa + dir * 6)}" y1="${r1(cy)}" x2="${r1(xb - dir * 9)}" y2="${r1(cy)}"/>`);
      rows.push(`<path class="arrow" d="M${r1(xb - dir * 7)} ${r1(cy)}l${-dir * 6} -4v8z"/>`);
    }
    rows.push(shape('circle', xa, cy, 5.5, `class="${markClass('outline', 0)}"`, tip(`${item.label} · ${input.fromLabel}: ${item.from}`)));
    rows.push(shape('circle', xb, cy, 5.5, `class="${markClass('filled', 0)}"`, tip(`${item.label} · ${input.toLabel}: ${item.to}`)));
    if (item.note) {
      // Beside the later dot when it fits, else before the earlier one.
      const nw = textWidth(item.note, f.sm, 'mono');
      const after = Math.max(xa, xb) + 10;
      const before = Math.min(xa, xb) - 10 - nw;
      if (after + nw > W - L && before < f.x0) {
        throw new Error(`charts(dumbbell ${input.id}): note "${item.note}" fits neither after nor before "${item.label}"; shorten the wording`);
      }
      const nx = after + nw <= W - L ? after : before;
      rows.push(text(nx, cy + 4, item.note, { size: f.sm, cls: 'mono', weight: 600, where: 'dumbbell note' }));
    }
    y = barY + H + 10;
  }
  for (const t of ts.ticks) {
    const x = r1(ts.map(t.date));
    out.push(`<line class="rule" x1="${x}" y1="${r1(gridTop)}" x2="${x}" y2="${r1(y - 4)}"/>`);
  }
  if (mark) {
    // Narrow: the labels sit above their rows across the plot, so the line
    // is drawn only across each row's marks, never through a label.
    out.push(mark.line(f.wide ? [[gridTop - 4, y - 4]] : markBands), mark.beside(y + 10));
    y += 14;
  }
  out.push(...rows);
  const { svg, height } = assemble({
    base: input,
    width: W,
    bottom: y - 4,
    body: out,
    defs: marks.defs(),
    role: input.items.some((i) => i.href) ? 'group' : 'img',
    cls: 'ch-dumbbell',
  });
  const noted = input.items.some((i) => i.note);
  return {
    svg,
    table: table(
      input.tableCaption ?? input.title,
      [input.itemHeader ?? w.item, input.fromLabel, input.toLabel, ...(noted ? [input.noteHeader ?? w.note] : [])],
      input.items.map((i) => [i.label, i.from, i.to, ...(noted ? [i.note ?? ''] : [])]),
    ),
    width: W,
    height,
  };
}
