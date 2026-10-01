// lanes.ts: Lanes, a categorical swimlane. Columns are the lanes (for example
// the enforcement points pre_merge, deploy, runtime, periodic), rows are items
// (controls, policy templates); a marker sits in every column where the item
// acts, its shape saying how (for example deny = diamond, require_approval =
// square, alert = circle, allow = triangle) and its state/tone how it is drawn.
//
// Horizontal (default): lanes are columns, their labels wrapped to two lines
// inside the column; row labels wrap to two lines inside the label column.
// Four lanes need about 640 units and short lane labels ("Pull request").
// Vertical (the narrow variant, NARROW_WIDTH by default): the lanes stack top to
// bottom as bands, each headed by its full label on its own line(s), listing
// the items that act in it (marker, then the item label). Same table.
// A label that cannot fit throws, naming it.
import {
  NARROW_WIDTH,
  assemble,
  autoLegend,
  legend,
  legendBlocks,
  linkText,
  markStyles,
  nonEmpty,
  r1,
  shape,
  table,
  text,
  tip,
  words,
  wrapText,
  type ChartBase,
  type ChartOutput,
  type MarkState,
  type Shape,
  type Tone,
} from './core';

export interface LaneMark {
  /** Key of the column the item acts in. */
  column: string;
  shape: Shape;
  state?: MarkState;
  tone?: Tone;
  /** What the marker means, for the table and tooltip ("deny"). */
  status: string;
}

export interface LanesInput extends ChartBase {
  columns: { key: string; label: string }[];
  rows: { label: string; href?: string; marks: LaneMark[] }[];
  /** Table heading of the row-label column ("Control"). */
  rowHeader: string;
  /** Legend entries, usually one per shape (heading: legendHeading); with
   *  none, the auto legend of the marks' layers and states. */
  legend?: { label: string; shape: Shape; state?: MarkState; tone?: Tone }[];
  /** Horizontal: column width (default: the room left after the label column, at least 56). */
  columnWidth?: number;
  /** 'horizontal' (default) or 'vertical' (lanes as stacked bands, narrow). */
  orientation?: 'horizontal' | 'vertical';
}

const L = 12;

export function lanes(input: LanesInput): ChartOutput {
  const where = `lanes ${input.id}`;
  nonEmpty(input.columns, 'columns', where);
  nonEmpty(input.rows, 'rows', where);
  const vertical = input.orientation === 'vertical';
  const W = input.width ?? (vertical ? NARROW_WIDTH : 640);
  const keys = input.columns.map((c) => c.key);
  if (new Set(keys).size !== keys.length) throw new Error(`charts(${where}): duplicate column keys`);
  for (const row of input.rows) {
    for (const m of row.marks) {
      if (!keys.includes(m.column)) throw new Error(`charts(${where}): "${row.label}" names unknown column "${m.column}"`);
    }
  }
  const marks = markStyles(input.id);
  const out: string[] = [];
  let y = 4;
  const lg = input.legend?.length
    ? legend(input.legend, L, y + 14, W - L, marks, input.legendHeading)
    : legendBlocks(autoLegend(input.rows.flatMap((r) => r.marks), input), L, y + 14, W - L, marks);
  if (lg.els.length) {
    out.push(...lg.els);
    y = lg.bottom + 12;
  }
  const markName = (row: { label: string }, col: { label: string }, m: LaneMark) => `${row.label} · ${col.label}: ${m.status}`;
  // A linked row label is named like the marks beside it: every column the
  // row acts in (horizontal), or the one lane it is listed under (vertical).
  const rowName = (row: LanesInput['rows'][number], cols: LanesInput['columns']) => {
    const parts = cols.flatMap((col) => {
      const st = row.marks.filter((m) => m.column === col.key).map((m) => m.status);
      return st.length ? [`${col.label}: ${st.join(', ')}`] : [];
    });
    return parts.length ? `${row.label} · ${parts.join('; ')}` : row.label;
  };
  if (!vertical) {
    const colW = input.columnWidth ?? Math.max(56, Math.min(120, Math.floor((W - 2 * L) * 0.55 / input.columns.length)));
    const gridW = colW * input.columns.length;
    const LW = W - 2 * L - gridW - 8;
    if (LW < 80) throw new Error(`charts(${where}): ${input.columns.length} columns of ${colW}px leave ${LW}px for labels at width ${W}; use orientation 'vertical'`);
    const x0 = L + LW + 8;
    const heads = input.columns.map((c) => wrapText(c.label, colW - 6, 12.5, 'body', 2, 'column label'));
    const headH = Math.max(...heads.map((h) => h.length)) * 15;
    heads.forEach((lines, i) =>
      lines.forEach((line, j) =>
        out.push(text(x0 + i * colW + colW / 2, y + 14 + j * 15 + (headH - lines.length * 15), line, { size: 12.5, weight: 600, anchor: 'middle', where: 'column label' })),
      ),
    );
    y += headH + 12;
    const gridTop = y;
    out.push(`<line class="axis" x1="${L}" y1="${r1(y)}" x2="${W - L}" y2="${r1(y)}"/>`);
    const rows: string[] = [];
    for (const row of input.rows) {
      const lines = wrapText(row.label, LW, 13, 'body', 2, 'row label');
      const h = Math.max(26, lines.length * 15 + 10);
      const els = lines.map((line, i) => text(L, y + h / 2 + 4.5 - ((lines.length - 1) * 15) / 2 + i * 15, line, { size: 13, where: 'row label' }));
      rows.push(row.href ? linkText(els.join(''), rowName(row, input.columns), row.href) : els.join(''));
      input.columns.forEach((col, i) => {
        const here = row.marks.filter((m) => m.column === col.key);
        here.forEach((m, k) => {
          const cx = x0 + i * colW + colW / 2 + (k - (here.length - 1) / 2) * 16;
          rows.push(shape(m.shape, cx, y + h / 2, 6, marks.attrs(m.state, m.tone), tip(markName(row, col, m))));
        });
      });
      y += h;
      rows.push(`<line class="rule" x1="${L}" y1="${r1(y)}" x2="${W - L}" y2="${r1(y)}"/>`);
    }
    input.columns.forEach((_, i) => {
      if (i === 0) return;
      const x = r1(x0 + i * colW);
      out.push(`<line class="rule" x1="${x}" y1="${r1(gridTop - headH - 8)}" x2="${x}" y2="${r1(y)}"/>`);
    });
    out.push(...rows);
  } else {
    // One band per lane: its label, a rule, then the items acting in it.
    input.columns.forEach((col, ci) => {
      if (ci > 0) y += 12;
      for (const line of wrapText(col.label, W - 2 * L, 13, 'body', 2, 'lane label')) {
        y += 16;
        out.push(text(L, y, line, { size: 13, weight: 600, where: 'lane label' }));
      }
      y += 7;
      out.push(`<line class="axis" x1="${L}" y1="${r1(y)}" x2="${W - L}" y2="${r1(y)}"/>`);
      const here = input.rows.filter((row) => row.marks.some((m) => m.column === col.key));
      if (!here.length) {
        y += 19;
        out.push(text(L + 4, y, words(input.lang).none, { size: 12.5, cls: 'ink2', where: 'lane label' }));
        y += 3;
      }
      for (const row of here) {
        const ms = row.marks.filter((m) => m.column === col.key);
        const lx = L + 4 + ms.length * 16 + 6;
        const lines = wrapText(row.label, W - L - lx, 13, 'body', 2, 'row label');
        const h = Math.max(24, lines.length * 15 + 9);
        ms.forEach((m, k) => out.push(shape(m.shape, L + 10 + k * 16, y + 13, 6, marks.attrs(m.state, m.tone), tip(markName(row, col, m)))));
        const els = lines.map((line, i) => text(lx, y + 17.5 + i * 15, line, { size: 13, where: 'row label' }));
        out.push(row.href ? linkText(els.join(''), rowName(row, [col]), row.href) : els.join(''));
        y += h;
      }
    });
  }
  const { svg, height } = assemble({
    base: input,
    width: W,
    bottom: y,
    body: out,
    defs: marks.defs(),
    role: input.rows.some((r) => r.href) ? 'group' : 'img',
    cls: vertical ? 'ch-swimlane ch-vertical' : 'ch-swimlane',
  });
  return {
    svg,
    table: table(
      input.tableCaption ?? input.title,
      [input.rowHeader, ...input.columns.map((c) => c.label)],
      input.rows.map((row) => [
        row.label,
        ...input.columns.map((c) =>
          row.marks
            .filter((m) => m.column === c.key)
            .map((m) => m.status)
            .join(', '),
        ),
      ]),
    ),
    width: W,
    height,
  };
}
