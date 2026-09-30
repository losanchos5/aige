// lanes.ts: Lanes, a categorical swimlane. Columns are the lanes (for example
// the enforcement points pre_merge, deploy, runtime, periodic), rows are items
// (controls, policy templates); a marker sits in every column where the item
// acts, its shape saying how (for example deny = diamond, require_approval =
// square, alert = circle, allow = triangle) and its state/tone how it is drawn.
// Column labels wrap to two lines inside their column; row labels to two lines
// inside the label column; a label that cannot fit throws. The same call at
// width 340 gives the narrow variant (a narrower label column, same grid).
import {
  assemble,
  legend,
  markStyles,
  r1,
  shape,
  table,
  text,
  tip,
  wrapMark,
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
  /** Legend entries, usually one per shape. */
  legend?: { label: string; shape: Shape; state?: MarkState; tone?: Tone }[];
  /** Column width (default: the room left after the label column, at least 56). */
  columnWidth?: number;
}

const L = 12;

export function lanes(input: LanesInput): ChartOutput {
  const W = input.width ?? 640;
  const keys = input.columns.map((c) => c.key);
  if (new Set(keys).size !== keys.length) throw new Error(`charts(lanes ${input.id}): duplicate column keys`);
  for (const row of input.rows) {
    for (const m of row.marks) {
      if (!keys.includes(m.column)) throw new Error(`charts(lanes ${input.id}): "${row.label}" names unknown column "${m.column}"`);
    }
  }
  const colW = input.columnWidth ?? Math.max(56, Math.min(120, Math.floor((W - 2 * L) * 0.55 / input.columns.length)));
  const gridW = colW * input.columns.length;
  const LW = W - 2 * L - gridW - 8;
  if (LW < 80) throw new Error(`charts(lanes ${input.id}): ${input.columns.length} columns of ${colW}px leave ${LW}px for labels at width ${W}`);
  const x0 = L + LW + 8;
  const marks = markStyles(input.id);
  const out: string[] = [];
  let y = 4;
  if (input.legend?.length) {
    const lg = legend(input.legend, L, y + 14, W - L, marks);
    out.push(...lg.els);
    y = lg.bottom + 12;
  }
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
    rows.push(row.href ? wrapMark(els.join(''), row.label, { href: row.href }) : els.join(''));
    input.columns.forEach((col, i) => {
      const here = row.marks.filter((m) => m.column === col.key);
      here.forEach((m, k) => {
        const cx = x0 + i * colW + colW / 2 + (k - (here.length - 1) / 2) * 16;
        const name = `${row.label} · ${col.label}: ${m.status}`;
        rows.push(shape(m.shape, cx, y + h / 2, 6, marks.attrs(m.state, m.tone), tip(name)));
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
  const { svg, height } = assemble({
    base: input,
    width: W,
    bottom: y,
    body: out,
    defs: marks.defs(),
    role: input.rows.some((r) => r.href) ? 'group' : 'img',
    cls: 'ch-swimlane',
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
