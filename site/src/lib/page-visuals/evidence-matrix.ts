// evidence-matrix.ts: a compact count matrix (rows x columns) for grids whose
// every cell would not fit the 12 KB SVG budget with a tooltip and a mark of
// its own. Used by /resources/templates (record schema x instrument, the
// x-evidences marks). The kit's heatGrid draws each of the 24 x 7 cells as a
// rect with a tooltip (about 39 KB) and countGrid a dot plus a label per
// non-empty cell (about 18 KB); here only the non-empty cells are drawn, as
// one path per shade (the ink at a fill-opacity that grows with the count,
// capped at 0.38 like heatGrid so the number keeps full ink contrast), with
// the count printed on each, so no value rests on shade alone. Empty cells
// stay blank over the row bands and column guides. Column totals are bars
// over the vertical column labels (matrix-frame.ts), row totals a bar and a
// number (wide) or a number (narrow). Row labels may link.
//
// From 480 wide the labels sit beside the grid; at NARROW_WIDTH each label
// sits on its own line above its row of cells, so the phone variant keeps
// text at the narrow minimum. Both return the same table: row header, one
// column per column, Total, and a Total row.
import {
  assemble,
  checkCopy,
  esc,
  fitText,
  fmt,
  markClass,
  minText,
  r1,
  table,
  text,
  textWidth,
  type ChartMode,
  type ChartOutput,
} from '../charts/core';
import { bandPath, columnHeads, rowBarPath, underlay } from './matrix-frame';

export interface EvidenceMatrixInput {
  id: string;
  title: string;
  desc: string;
  source?: string;
  asOf?: string;
  mode?: ChartMode;
  width?: number;
  /** Table heading of the row-label column ("Record"). */
  rowHeader: string;
  rows: { label: string; href?: string; values: number[] }[];
  /** Column labels, drawn vertically and used in the table. */
  columns: string[];
  /** Noun of a count ("marks"), for the column-total tooltips, and its
   *  singular for a total of 1 (default: the noun). */
  unit: string;
  unitOne?: string;
  tableCaption?: string;
}

const L = 12;
const MAX_ALPHA = 0.38;

export function evidenceMatrix(input: EvidenceMatrixInput): ChartOutput {
  const where = `evidenceMatrix ${input.id}`;
  const { rows, columns } = input;
  if (!rows.length || !columns.length) throw new Error(`charts(${where}): no rows or columns to draw`);
  for (const row of rows) {
    if (row.values.length !== columns.length || row.values.some((v) => !Number.isInteger(v) || v < 0)) {
      throw new Error(`charts(${where}): row "${row.label}" needs ${columns.length} counts`);
    }
  }
  const W = input.width ?? 640;
  const wide = W >= 480;
  const sm = minText(W);
  const labelFont = wide ? 13 : 12.5;
  const totalsW = wide ? 72 : 32;
  const LW = wide ? Math.ceil(Math.max(...rows.map((r) => textWidth(r.label, labelFont)))) + 14 : 0;
  const pitch = wide ? 44 : Math.floor((W - 2 * L - totalsW) / columns.length);
  if (pitch < 28) throw new Error(`charts(${where}): ${columns.length} columns do not fit ${W}px`);
  const LABEL_H = wide ? 0 : 16;
  const rowH = (wide ? 30 : 26) + LABEL_H;
  const x0 = L + LW;
  const colX = (i: number) => x0 + i * pitch + pitch / 2;
  const gridRight = x0 + columns.length * pitch;
  const width = wide ? Math.max(W, Math.ceil(gridRight + totalsW + L)) : W;
  const max = Math.max(1, ...rows.flatMap((r) => r.values));
  const alpha = (v: number) => Math.round((0.06 + (MAX_ALPHA - 0.06) * (v / max)) * 100) / 100;
  const cellW = pitch - 6;
  const cellH = rowH - LABEL_H - 6;

  const colTotals = columns.map((_, c) => rows.reduce((s, r) => s + r.values[c], 0));
  const heads = columnHeads({
    totalPx: sm,
    where,
    columns: columns.map((label, c) => ({ label, total: colTotals[c], tip: `${label}: ${colTotals[c]} ${colTotals[c] === 1 && input.unitOne ? input.unitOne : input.unit}` })),
    colX,
    pitch,
    y: 8,
    barH: 40,
    barMaxW: 16,
    gapAfterBars: 8,
    maxLabelH: 170,
  });
  const out: string[] = [...heads.marks];
  let y = heads.y;
  const gridTop = y;
  const rowTotals = rows.map((r) => r.values.reduce((a, b) => a + b, 0));
  const rowMax = Math.max(1, ...rowTotals);
  const bands: string[] = [];
  const shades = new Map<number, string[]>();
  const nums: string[] = [];
  const labels: string[] = [];
  const totals: string[] = [];
  const bars: string[] = [];
  rows.forEach((row, ri) => {
    const cy = y + LABEL_H + (rowH - LABEL_H) / 2;
    if (ri % 2 === 0) bands.push(bandPath(L, y, rowH, width));
    fitText(row.label, wide ? LW - 10 : W - 2 * L - totalsW, labelFont, 'body', 'row label');
    checkCopy(row.label, 'row label');
    // The visible text names the link, so no aria-label repeats it.
    const label = `<text x="${L}" y="${r1(wide ? cy + 4.5 : y + 14)}">${esc(row.label)}</text>`;
    labels.push(row.href ? `<a href="${esc(row.href)}">${label}</a>` : label);
    row.values.forEach((v, c) => {
      if (!v) return;
      const a = alpha(v);
      const list = shades.get(a) ?? [];
      list.push(`M${r1(colX(c) - cellW / 2)} ${r1(cy - cellH / 2)}h${r1(cellW)}v${r1(cellH)}h${r1(-cellW)}z`);
      shades.set(a, list);
      nums.push(`<text x="${r1(colX(c))}" y="${r1(cy + 4.2)}">${esc(fmt(v))}</text>`);
    });
    if (wide) {
      const bw = (rowTotals[ri] / rowMax) * (totalsW - 32);
      if (bw > 0) bars.push(rowBarPath(gridRight + 10, cy, bw));
      totals.push(`<text x="${r1(gridRight + 14 + bw)}" y="${r1(cy + 4.5)}">${fmt(rowTotals[ri])}</text>`);
    } else {
      totals.push(`<text x="${width - L}" y="${r1(cy + 4.5)}">${fmt(rowTotals[ri])}</text>`);
    }
    y += rowH;
  });
  out.unshift(...underlay(bands, columns.map((_, c) => colX(c)), gridTop, y));
  for (const [a, d] of [...shades].sort((p, q) => p[0] - q[0])) {
    out.push(`<path class="heat-0" fill-opacity="${a}" d="${d.join('')}"/>`);
  }
  // Labels, counts and row totals each share one group's size, face and
  // anchor (the texts inherit them): the bytes go to the data.
  out.push(`<g font-size="${labelFont}">${labels.join('')}</g>`);
  out.push(`<g font-size="${sm}" class="num" text-anchor="middle">${nums.join('')}</g>`);
  out.push(`<g font-size="${sm}" class="num"${wide ? '' : ' text-anchor="end"'}>${totals.join('')}</g>`);
  if (bars.length) out.push(`<path class="${markClass('filled', 0)}" d="${bars.join('')}"/>`);
  out.push(text(wide ? gridRight + 10 : width - L, gridTop - 6, 'Total', { size: sm, cls: 'ink2', anchor: wide ? 'start' : 'end', where: 'total heading' }));

  const { svg, height } = assemble({
    base: { id: input.id, title: input.title, desc: input.desc, source: input.source, asOf: input.asOf, mode: input.mode },
    width,
    bottom: y,
    body: out,
    role: rows.some((r) => r.href) ? 'group' : 'img',
    cls: 'ch-matrix',
  });
  return {
    svg,
    table: table(
      input.tableCaption ?? input.title,
      [input.rowHeader, ...columns, 'Total'],
      [...rows.map((r, i) => [r.label, ...r.values, rowTotals[i]]), ['Total', ...colTotals, rowTotals.reduce((a, b) => a + b, 0)]],
    ),
    width,
    height,
  };
}
