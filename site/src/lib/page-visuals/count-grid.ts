// count-grid.ts: a sized-dot count grid with marginal totals, for grids too
// dense for the kit's heatGrid within the 12 KB budget (heatGrid gives every
// cell, empty or not, its own rect and tooltip). Only non-empty cells are
// drawn: a solid ink dot whose area grows with the count, the count printed
// on it in the ground colour, so no value rests on shade alone. Empty cells
// stay blank over the row bands and column guides. Column totals are bars
// over the column labels (the largest is the one accent, solid ink), row
// totals are bars (wide) or numbers (narrow) at the end of each row. Row
// labels may link. Used by /resources/dpia-lists (country x Annex III area).
//
// Built on the chart kit's helpers (src/lib/charts/core.ts): measured labels
// that throw instead of cutting, token classes of both style modes, the
// accessible shell and the Source / As of stamp. Width 340 is the phone
// variant (narrower cells, row totals as numbers).
import {
  assemble,
  fmt,
  linkText,
  markClass,
  r1,
  table,
  text,
  textWidth,
  tip,
  wrapText,
  type ChartMode,
  type ChartOutput,
} from '../charts/core';

export interface CountGridInput {
  id: string;
  title: string;
  desc: string;
  source?: string;
  asOf?: string;
  mode?: ChartMode;
  width?: number;
  /** Table heading of the row-label column ("Country"). */
  rowHeader: string;
  rows: { label: string; href?: string; values: number[] }[];
  /** Column labels as drawn (set vertically). */
  columns: string[];
  /** Full column names for the table, when the drawn labels are shortened. */
  columnNames?: string[];
  /** Noun of a count ("items"), for the totals' tooltips. */
  unit: string;
  tableCaption?: string;
}

const L = 12;

export function countGrid(input: CountGridInput): ChartOutput {
  const where = `countGrid ${input.id}`;
  const { rows, columns } = input;
  if (!rows.length || !columns.length) throw new Error(`charts(${where}): no rows or columns to draw`);
  for (const row of rows) {
    if (row.values.length !== columns.length || row.values.some((v) => !Number.isInteger(v) || v < 0)) {
      throw new Error(`charts(${where}): row "${row.label}" needs ${columns.length} counts`);
    }
  }
  const W = input.width ?? 640;
  const wide = W >= 480;
  const labelFont = wide ? 13 : 12.5;
  const LW = Math.ceil(Math.max(...rows.map((r) => textWidth(r.label, labelFont)))) + 12;
  if (LW > (wide ? 200 : 120)) throw new Error(`charts(${where}): a row label needs ${LW}px; shorten it`);
  const totalsW = wide ? 72 : 30;
  const pitch = wide ? 44 : Math.floor((W - 2 * L - LW - totalsW) / columns.length);
  if (pitch < 22) throw new Error(`charts(${where}): ${columns.length} columns do not fit ${W}px`);
  const rowH = wide ? 30 : 26;
  const x0 = L + LW;
  const colX = (i: number) => x0 + i * pitch + pitch / 2;
  const gridRight = x0 + columns.length * pitch;
  const width = wide ? Math.max(W, Math.ceil(gridRight + totalsW + L)) : W;
  const max = Math.max(1, ...rows.flatMap((r) => r.values));
  const rMax = Math.min(pitch, rowH) / 2 - 2;
  const rMin = Math.min(7, rMax);
  // Area grows with the count: r = sqrt(v / max) * rMax, never under rMin.
  const radius = (v: number) => Math.max(rMin, Math.sqrt(v / max) * rMax);

  const out: string[] = [];
  let y = 8;

  // Column totals: bars with their value above; the largest is the accent.
  const colTotals = columns.map((_, c) => rows.reduce((s, r) => s + r.values[c], 0));
  const colMax = Math.max(1, ...colTotals);
  const barH = 40;
  y += 14;
  columns.forEach((col, c) => {
    const h = colTotals[c] ? Math.max(2, (colTotals[c] / colMax) * barH) : 0;
    const bw = Math.min(16, pitch - 8);
    const name = `${(input.columnNames ?? columns)[c]}: ${colTotals[c]} ${input.unit}`;
    if (h) {
      const cls = colTotals[c] === colMax ? 'mk mk-hi' : markClass('filled', 0);
      out.push(`<rect x="${r1(colX(c) - bw / 2)}" y="${r1(y + barH - h)}" width="${r1(bw)}" height="${r1(h)}" class="${cls}">${tip(name)}</rect>`);
    } else {
      out.push(`<line class="axis" x1="${r1(colX(c) - bw / 2)}" y1="${r1(y + barH)}" x2="${r1(colX(c) + bw / 2)}" y2="${r1(y + barH)}"/>`);
    }
    out.push(text(colX(c), y + barH - h - 4, fmt(colTotals[c]), { size: 12, cls: 'num', anchor: 'middle', where: 'column total' }));
  });
  y += barH + 8;

  const labelH = Math.ceil(Math.max(...columns.map((c) => textWidth(c, 12.5)))) + 4;
  if (labelH > 170) throw new Error(`charts(${where}): a column label needs ${labelH}px of height; shorten it`);
  columns.forEach((col, c) => out.push(text(colX(c) + 4.5, y + labelH, col, { size: 12.5, rotate: -90, where: 'column label' })));
  y += labelH + 8;

  const gridTop = y;
  const rowTotals = rows.map((r) => r.values.reduce((a, b) => a + b, 0));
  const rowMax = Math.max(1, ...rowTotals);
  const bands: string[] = [];
  const dots: string[] = [];
  const nums: string[] = [];
  const bars: string[] = [];
  rows.forEach((row, ri) => {
    const cy = y + rowH / 2;
    if (ri % 2 === 0) bands.push(`M${L - 4} ${r1(y)}h${r1(width - 2 * L + 8)}v${rowH}h${r1(-(width - 2 * L + 8))}z`);
    wrapText(row.label, LW - 10, labelFont, 'body', 1, 'row label');
    const label = text(L, cy + 4.5, row.label, { size: labelFont, where: 'row label' });
    out.push(row.href ? linkText(label, row.label, row.href) : label);
    row.values.forEach((v, c) => {
      if (!v) return;
      dots.push(`<circle cx="${r1(colX(c))}" cy="${r1(cy)}" r="${r1(radius(v))}"/>`);
      nums.push(text(colX(c), cy + 4.2, fmt(v), { size: 12, cls: 'num on-ink', anchor: 'middle', where: 'cell value' }));
    });
    if (wide) {
      const bw = (rowTotals[ri] / rowMax) * (totalsW - 32);
      if (bw > 0) bars.push(`M${r1(gridRight + 10)} ${r1(cy - 5)}h${r1(bw)}v10h${r1(-bw)}z`);
      out.push(text(gridRight + 14 + bw, cy + 4.5, fmt(rowTotals[ri]), { size: 12, cls: 'num', where: 'row total' }));
    } else {
      out.push(text(width - L, cy + 4.5, fmt(rowTotals[ri]), { size: 12, cls: 'num', anchor: 'end', where: 'row total' }));
    }
    y += rowH;
  });
  const guides = columns.map((_, c) => `M${r1(colX(c))} ${r1(gridTop)}V${r1(y)}`).join('');
  out.unshift(`<path class="cell-empty" d="${bands.join('')}"/>`, `<path class="rule" d="${guides}"/>`);
  // Dots inherit the accent fill from their group; the counts sit on top.
  out.push(`<g class="mk mk-hi">${dots.join('')}</g>`, ...nums);
  if (bars.length) out.push(`<path class="${markClass('filled', 0)}" d="${bars.join('')}"/>`);
  out.push(text(wide ? gridRight + 10 : width - L, gridTop - 6, 'Total', { size: 12, cls: 'ink2', anchor: wide ? 'start' : 'end', where: 'total heading' }));

  const { svg, height } = assemble({
    base: { id: input.id, title: input.title, desc: input.desc, source: input.source, asOf: input.asOf, mode: input.mode },
    width,
    bottom: y,
    body: out,
    role: rows.some((r) => r.href) ? 'group' : 'img',
    cls: 'ch-matrix',
  });
  const names = input.columnNames ?? columns;
  return {
    svg,
    table: table(
      input.tableCaption ?? input.title,
      [input.rowHeader, ...names, 'Total'],
      [...rows.map((r, i) => [r.label, ...r.values, rowTotals[i]]), ['Total', ...colTotals, rowTotals.reduce((a, b) => a + b, 0)]],
    ),
    width,
    height,
  };
}
