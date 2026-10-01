// obligation-clock.ts: "the application clock", the hero of /obligations. One
// dot per date the register states: the date each row first applies, drawn in
// its status, and each later dated step (milestone), drawn as a square that is
// filled once the step's date is on or before the as-of date and outlined while
// it is still ahead. Dots stack away from the axis in bins one dot wide (a dot
// plot), so the waves read as towers: the GDPR in 2018, the deferred EU
// high-risk duties at the end of 2027. A dashed line marks the as-of date (the
// register's latest review date, never the build clock), with the count of
// dates on either side; dates before the axis start stack in an "Earlier"
// column; rows without a date are counted in a line under the legend.
//
// Every dot is ink: the categories are statuses and instruments, not stack
// layers. A status is a shape and a drawing (filled, outlined, dashed,
// hatched), never a colour. 221 titled dots would pass the 12 KB budget of an
// inline chart, so a run of dots of one style in one bin is one rect filled
// with a pattern of that dot (the corpus-isotype technique), titled with its
// dates, count and style. The dots are not links (221 links at the 24 px pointer
// spacing would need a chart ten times taller); the tallest towers carry a
// label that links to their instrument's group in the list below.
//
// Wide (>= 480): time left to right. Narrow: one row per year, top to bottom,
// the dots of a year wrapping inside its row, the as-of line a dashed divider
// inside its year. Built on the chart kit's shell and helpers
// (src/lib/charts/core.ts); the classes are the kit's, so it renders in both
// style modes.
import {
  asOfLabel,
  asOfMark,
  minText,
  assemble,
  fitText,
  legend,
  markStyles,
  nonEmpty,
  parseDay,
  r1,
  shape,
  table,
  targets,
  text,
  textWidth,
  timeScale,
  tip,
  wrapText,
  type ChartBase,
  type ChartOutput,
  type MarkState,
  type Shape,
} from '../charts/core';
import { appliesStatusMark } from '../../data/frameworks';

/** How a dot is drawn: the row's status on its first date, or a later step. */
export type ClockStyle =
  | 'in-force'
  | 'grace'
  | 'applies-later'
  | 'deferred'
  | 'voluntary'
  | 'pending'
  | 'step-reached'
  | 'step-ahead';

/** Legend, stack and table order. */
export const CLOCK_STYLES: readonly ClockStyle[] = [
  'in-force',
  'grace',
  'applies-later',
  'deferred',
  'voluntary',
  'pending',
  'step-reached',
  'step-ahead',
];

/** Shape and drawing of each style: a first date in the site-wide status
 *  encoding (appliesStatusMark in data/frameworks.ts); a later step a square,
 *  filled once reached. */
export const CLOCK_MARK: Readonly<Record<ClockStyle, { shape: Shape; state: MarkState }>> = {
  ...appliesStatusMark,
  'step-reached': { shape: 'square', state: 'filled' },
  'step-ahead': { shape: 'square', state: 'outline' },
};

export interface ClockPoint {
  /** YYYY-MM-DD. */
  date: string;
  style: ClockStyle;
  /** The instrument group the row sits under (the tower labels name it). */
  group: string;
  /** In-page link to the group (the tower label's target). */
  groupHref?: string;
}

export interface ObligationClockInput extends ChartBase {
  points: ClockPoint[];
  /** Axis start and end, YYYY-MM-DD; earlier dates stack in the Earlier column. */
  from: string;
  to: string;
  /** The as-of date the dashed line marks (inside the domain). */
  marker: string;
  styleLabels: Record<ClockStyle, string>;
  /** Rows with no date, per style (drawn as a line of text, and a table row). */
  undated?: Partial<Record<ClockStyle, number>>;
  /** Towers with at least this many dots get a label (default 10), at most `peaks` (default 4). */
  peakMin?: number;
  peaks?: number;
}

const L = 12;
const PITCH = 10;
const R = 4.2;
const WIDE_AT = 480;

const byCode = (a: string, b: string) => (a < b ? -1 : a > b ? 1 : 0);

/** "2027-12-02" or "2026-01-01 to 2026-01-22" (first to last of a run). */
function span(dates: string[]): string {
  const sorted = [...new Set(dates)].sort(byCode);
  return sorted.length === 1 ? sorted[0] : `${sorted[0]} to ${sorted[sorted.length - 1]}`;
}

interface Run {
  style: ClockStyle;
  points: ClockPoint[];
}

/** Points of one bin as runs, in style order. */
function runsOf(points: ClockPoint[]): Run[] {
  return CLOCK_STYLES.map((style) => ({ style, points: points.filter((p) => p.style === style) })).filter((run) => run.points.length);
}

export function obligationClock(input: ObligationClockInput): ChartOutput {
  const where = `obligationClock ${input.id}`;
  nonEmpty(input.points, 'points', where);
  const W = input.width ?? 880;
  const wide = W >= WIDE_AT;
  const sm = minText(W);
  const t0 = parseDay(input.from, 'clock from');
  const t1 = parseDay(input.to, 'clock to');
  const tm = parseDay(input.marker, 'clock marker');
  if (tm < t0 || tm > t1) throw new Error(`charts(${where}): marker ${input.marker} falls outside ${input.from} to ${input.to}`);
  for (const p of input.points) {
    if (parseDay(p.date) > t1) throw new Error(`charts(${where}): ${p.date} falls after ${input.to}`);
  }
  const earlier = input.points.filter((p) => parseDay(p.date) < t0);
  const onAxis = input.points.filter((p) => parseDay(p.date) >= t0);
  const behind = input.points.filter((p) => parseDay(p.date) <= tm).length;
  const ahead = input.points.length - behind;
  const fromYear = Number(input.from.slice(0, 4));

  const marks = markStyles(input.id);
  const hits = targets(where);
  const used = CLOCK_STYLES.filter((s) => input.points.some((p) => p.style === s));
  // One pattern tile per style: the dot centred in a PITCH square.
  const pat = (s: ClockStyle) => `${input.id}-${s}`;
  // A hatched dot is only 8 px across: its hatch is denser than the kit's
  // (a 3 px period), so it reads as hatched and not as an outline.
  const dense = `${input.id}-dh`;
  const tiles = used.map((s) => {
    const m = CLOCK_MARK[s];
    const attrs = m.state === 'hatched' ? `class="mk mk-hatch-0" fill="url(#${dense})"` : marks.attrs(m.state, 0);
    return `<pattern id="${pat(s)}" width="${PITCH}" height="${PITCH}" patternUnits="userSpaceOnUse">${shape(m.shape, PITCH / 2, PITCH / 2, R, attrs)}</pattern>`;
  });
  if (used.some((s) => CLOCK_MARK[s].state === 'hatched')) {
    tiles.push(
      `<pattern id="${dense}" width="3" height="3" patternUnits="userSpaceOnUse" patternTransform="rotate(45)">` +
        `<rect class="hatch-bg" width="3" height="3"/><line class="hatch-0" x1="0" y1="0" x2="0" y2="3"/></pattern>`,
    );
  }

  const out: string[] = [];
  // Legend, then the undated line.
  const lg = legend(
    used.map((s) => ({ label: input.styleLabels[s], ...CLOCK_MARK[s] })),
    L,
    16,
    W - L,
    marks,
  );
  out.push(...lg.els);
  let y = lg.bottom + 8;
  const undated = CLOCK_STYLES.filter((s) => (input.undated?.[s] ?? 0) > 0);
  if (undated.length) {
    const n = undated.reduce((sum, s) => sum + (input.undated?.[s] ?? 0), 0);
    const note = `Not on the axis: ${n} rows with no date (${undated.map((s) => `${input.undated?.[s]} ${input.styleLabels[s].toLowerCase()}`).join(', ')})`;
    for (const line of wrapText(note, W - 2 * L, 12.5, 'body', 2, 'undated line')) {
      y += 17;
      out.push(text(L, y, line, { size: 12.5, cls: 'ink2', where: 'undated line' }));
    }
  }

  /** A run of `n` dots in one style drawn from (x, y) along one line. */
  const strip = (s: ClockStyle, x: number, top: number, w: number, h: number) =>
    `<g transform="translate(${r1(x)} ${r1(top)})"><rect width="${r1(w)}" height="${r1(h)}" fill="url(#${pat(s)})"/></g>`;
  // A run's name: its dates, how many and their style ("2018-05-25 · 15 dates
  // · In force"); the instrument groups would pass the 12 KB budget, and the
  // tower labels and the list below name them.
  const runName = (run: Run) =>
    `${span(run.points.map((p) => p.date))} · ${run.points.length} ${run.points.length === 1 ? 'date' : 'dates'} · ${input.styleLabels[run.style]}`;

  let bottom: number;
  if (wide) {
    const x0 = earlier.length ? L + 64 : L + 8;
    const x1 = W - L - 8;
    const ts = timeScale(input.from, input.to, [x0, x1]);
    // Bins one dot wide along time; the earlier column is its own bin.
    const bins = new Map<number, ClockPoint[]>();
    for (const p of onAxis) {
      const col = Math.min(Math.floor((ts.map(p.date) - x0) / PITCH), Math.floor((x1 - x0) / PITCH) - 1);
      bins.set(col, [...(bins.get(col) ?? []), p]);
    }
    const columns = [...bins.entries()]
      .sort((a, b) => a[0] - b[0])
      .map(([col, points]) => ({ cx: x0 + col * PITCH + PITCH / 2, points }));
    if (earlier.length) columns.unshift({ cx: L + 26, points: earlier });
    const maxStack = Math.max(...columns.map((c) => c.points.length));

    // Header: the as-of label over its line, the counts either side of it.
    const asOf = asOfMark(ts, input.marker, input.lang, { width: W, axis: 'x', pad: L });
    const xm = asOf.at;
    y += 26;
    out.push(asOf.centred(y));
    y += 18;
    const left = `${behind} dates on or before`;
    const right = `${ahead} dates after`;
    fitText(left, xm - 8 - L, 12.5, 'body', 'as-of count');
    fitText(right, W - L - (xm + 8), 12.5, 'body', 'as-of count');
    out.push(text(xm - 8, y, left, { size: 12.5, anchor: 'end', where: 'as-of count' }));
    out.push(text(xm + 8, y, right, { size: 12.5, where: 'as-of count' }));
    // Room above the tallest tower for its label.
    const plotTop = y + 12;
    const axisY = plotTop + 62 + maxStack * PITCH;
    out.push(asOf.line([[plotTop - 6, axisY + 5]]));

    const dots: string[] = [];
    // Obstacles for the tower labels: every tower, and the as-of line.
    const boxes: { x: number; y: number; w: number; h: number }[] = [{ x: xm - 2, y: plotTop - 6, w: 4, h: axisY - plotTop + 6 }];
    for (const c of columns) {
      let top = axisY - 1;
      const parts: string[] = [];
      for (const run of runsOf(c.points)) {
        const h = run.points.length * PITCH;
        top -= h;
        parts.push(`<g>${tip(runName(run))}${strip(run.style, c.cx - PITCH / 2, top, PITCH, h)}</g>`);
      }
      dots.push(...parts);
      boxes.push({ x: c.cx - PITCH / 2, y: top, w: PITCH, h: axisY - top });
    }

    // Axis, ticks, the earlier column's break and label.
    out.push(`<line class="axis" x1="${r1(x0)}" y1="${r1(axisY)}" x2="${r1(x1)}" y2="${r1(axisY)}"/>`);
    // A short tick every year, a long one with its label at the kit's ticks.
    const minor: string[] = [];
    for (let year = fromYear + 1; year <= Number(input.to.slice(0, 4)); year += 1) {
      const x = ts.map(`${year}-01-01`);
      minor.push(`M${r1(x)} ${r1(axisY)}v3`);
    }
    out.push(`<path class="tick" d="${minor.join('')}"/>`);
    for (const t of ts.ticks) {
      const x = ts.map(t.date);
      out.push(`<line class="tick" x1="${r1(x)}" y1="${r1(axisY)}" x2="${r1(x)}" y2="${r1(axisY + 6)}"/>`);
      out.push(text(x, axisY + 19, t.label, { size: sm, cls: 'num muted', anchor: 'middle', where: 'tick' }));
    }
    if (earlier.length) {
      const ex = L + 26;
      out.push(`<line class="axis" x1="${ex - 10}" y1="${r1(axisY)}" x2="${ex + 10}" y2="${r1(axisY)}"/>`);
      out.push(`<path class="rule" fill="none" d="M${x0 - 16} ${r1(axisY + 5)}l6 -10M${x0 - 11} ${r1(axisY + 5)}l6 -10"/>`);
      out.push(text(ex, axisY + 19, 'Earlier', { size: sm, cls: 'num muted', anchor: 'middle', where: 'tick' }));
    }

    // Tower labels: the tallest columns. Where one instrument holds most of a
    // tower, the label counts that instrument's dates and names it and their
    // dates (linking to its group in the list); else it counts the tower and
    // gives its dates. Right of the tower top, else left of it, else above it;
    // a label that fits nowhere is left out (the tooltips and table hold it).
    const peakMin = input.peakMin ?? 10;
    const placed: { x: number; y: number; w: number; h: number }[] = [];
    const clear = (b: { x: number; y: number; w: number; h: number }) =>
      b.x >= L &&
      b.x + b.w <= W - L &&
      b.y >= plotTop - 4 &&
      ![...boxes, ...placed].some((o) => b.x < o.x + o.w + 3 && o.x < b.x + b.w + 3 && b.y < o.y + o.h + 3 && o.y < b.y + b.h + 3);
    const peaks = columns
      .map((c, i) => ({ c, box: boxes[i + 1] }))
      .filter(({ c }) => c.points.length >= peakMin)
      .sort((a, b) => b.c.points.length - a.c.points.length || a.c.cx - b.c.cx)
      .slice(0, input.peaks ?? 5);
    for (const { c, box } of peaks) {
      const groups = new Map<string, ClockPoint[]>();
      for (const p of c.points) groups.set(p.group, [...(groups.get(p.group) ?? []), p]);
      const [group, members] = [...groups.entries()].sort((a, b) => b[1].length - a[1].length || byCode(a[0], b[0]))[0];
      const dominant = members.length * 2 > c.points.length;
      const counted = dominant ? members : c.points;
      const lines = [...(dominant ? [group] : []), span(counted.map((p) => p.date))];
      const w = Math.max(textWidth(String(counted.length), 18, 'disp'), ...lines.map((l) => textWidth(l, 12.5)));
      const h = 20 + lines.length * 15;
      const spots = [
        { x: box.x + box.w + 6, y: box.y },
        { x: box.x - 6 - w, y: box.y },
        { x: Math.max(L, Math.min(c.cx - w / 2, W - L - w)), y: box.y - h - 4 },
      ];
      const spot = spots.find((s) => clear({ x: s.x, y: s.y, w, h }));
      if (!spot) continue;
      placed.push({ x: spot.x, y: spot.y, w, h });
      const els =
        text(spot.x, spot.y + 16, counted.length, { size: 18, cls: 'disp num', where: 'tower count' }) +
        lines.map((l, i) => text(spot.x, spot.y + 16 + 15 * (i + 1), l, { size: 12.5, where: 'tower label' })).join('');
      const href = dominant ? members[0].groupHref : undefined;
      if (href) {
        const name = `${counted.length} dates, ${lines.join(', ')}: go to ${group} in the list`;
        out.push(hits.mark(() => els, name, { x: spot.x, y: spot.y, w: Math.max(w, 24), h: Math.max(h, 24) }, { href }));
      } else {
        out.push(els);
      }
    }
    out.push(...dots);
    bottom = axisY + 19;
  } else {
    // One row per year: the year, the dots wrapping, the year's count. The
    // label column is as wide as its widest label ("Earlier" is wider than a
    // year), so no label runs under the first dot.
    const lastYear = Math.max(...onAxis.map((p) => Number(p.date.slice(0, 4))), fromYear);
    const buckets: { label: string; points: ClockPoint[] }[] = [];
    if (earlier.length) buckets.push({ label: 'Earlier', points: earlier });
    for (let year = fromYear; year <= lastYear; year += 1) {
      buckets.push({ label: String(year), points: onAxis.filter((p) => Number(p.date.slice(0, 4)) === year) });
    }
    const yearW = Math.max(44, ...buckets.map((b) => Math.ceil(textWidth(b.label, sm, 'mono')) + 8));
    const countW = 30;
    const dx = L + yearW;
    const perLine = Math.floor((W - L - countW - dx) / PITCH);
    const markerYear = input.marker.slice(0, 4);
    y += 24;
    const asOfLine = `${asOfLabel(input.marker, input.lang)} (dashed line)`;
    fitText(asOfLine, W - 2 * L, sm, 'mono', 'as-of label');
    out.push(text(L, y, asOfLine, { size: sm, cls: 'mono', where: 'as-of label' }));
    y += 17;
    const counts = `${behind} dates on or before, ${ahead} after`;
    fitText(counts, W - 2 * L, 12.5, 'body', 'as-of count');
    out.push(text(L, y, counts, { size: 12.5, where: 'as-of count' }));
    y += 12;
    out.push(`<line class="rule" x1="${L}" y1="${r1(y)}" x2="${W - L}" y2="${r1(y)}"/>`);
    for (const b of buckets) {
      // Dots on or before the as-of date first, then those after it; in the
      // as-of year a divider takes one slot between the two.
      const past = b.points.filter((p) => parseDay(p.date) <= tm);
      const later = b.points.filter((p) => parseDay(p.date) > tm);
      const divider = b.label === markerYear;
      const slots = b.points.length + (divider ? 1 : 0);
      const lines = Math.max(1, Math.ceil(slots / perLine));
      const top = y + 6;
      const rowH = lines * PITCH;
      fitText(b.label, yearW - 6, sm, 'mono', 'year');
      out.push(text(L, top + 9.5, b.label, { size: sm, cls: 'num muted', where: 'year' }));
      out.push(text(W - L, top + 9.5, b.points.length, { size: sm, cls: 'num', anchor: 'end', where: 'year count' }));
      let k = 0;
      const place = (runs: Run[]) => {
        for (const run of runs) {
          const segs: string[] = [];
          let left = run.points.length;
          while (left > 0) {
            const col = k % perLine;
            const line = Math.floor(k / perLine);
            const n = Math.min(left, perLine - col);
            segs.push(strip(run.style, dx + col * PITCH, top + line * PITCH, n * PITCH, PITCH));
            k += n;
            left -= n;
          }
          out.push(`<g>${tip(runName(run))}${segs.join('')}</g>`);
        }
      };
      place(runsOf(past));
      if (divider) {
        const col = k % perLine;
        const line = Math.floor(k / perLine);
        const x = dx + col * PITCH + PITCH / 2;
        out.push(`<line class="today" x1="${r1(x)}" y1="${r1(top + line * PITCH - 2)}" x2="${r1(x)}" y2="${r1(top + (line + 1) * PITCH + 2)}"/>`);
        k += 1;
      }
      place(runsOf(later));
      y = top + rowH + 6;
      out.push(`<line class="rule" x1="${L}" y1="${r1(y)}" x2="${W - L}" y2="${r1(y)}"/>`);
    }
    bottom = y;
  }

  // Table: one row per year bucket (and the undated rows), a column per style drawn.
  const cols = CLOCK_STYLES.filter((s) => used.includes(s) || undated.includes(s));
  const bucketOf = (p: ClockPoint) => (parseDay(p.date) < t0 ? 'Earlier' : p.date.slice(0, 4));
  const keys = [...new Set(input.points.map(bucketOf))].sort((a, b) => (a === 'Earlier' ? -1 : b === 'Earlier' ? 1 : byCode(a, b)));
  const rows = keys.map((key) => {
    const ps = input.points.filter((p) => bucketOf(p) === key);
    return [key === 'Earlier' ? `Before ${fromYear}` : key, ...cols.map((s) => ps.filter((p) => p.style === s).length), ps.length];
  });
  if (undated.length) {
    rows.push(['No date', ...cols.map((s) => input.undated?.[s] ?? 0), undated.reduce((sum, s) => sum + (input.undated?.[s] ?? 0), 0)]);
  }
  const { svg, height } = assemble({
    base: input,
    width: W,
    bottom,
    body: out,
    defs: `${marks.defs().replace('</defs>', '') || '<defs>'}${tiles.join('')}</defs>`,
    role: out.some((el) => el.startsWith('<a ')) ? 'group' : 'img',
    cls: wide ? 'ch-obclock' : 'ch-obclock ch-vertical',
  });
  return {
    svg,
    table: table(input.tableCaption ?? input.title, ['Year', ...cols.map((s) => input.styleLabels[s]), 'Total'], rows),
    width: W,
    height,
  };
}

