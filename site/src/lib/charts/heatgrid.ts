// heatgrid.ts: HeatGrid, a count heatmap (rows x columns). Each cell's fill is
// the ink (or a layer ink) at a fill-opacity that grows with the value, capped
// at 0.38 so the number printed in the cell keeps full ink contrast in both
// themes (text is never dimmed; the fill is). Zero is an empty cell, null a
// hatched "not applicable" cell. Optional marginal bars show the row totals
// (right) and the column totals (above the column labels). Column labels are
// set vertically and measured against the header height.
//
// Besides the whole SVG, the result carries `sticky`: the row-label column and
// the grid as two SVGs, so Chart.astro can keep the labels in view while the
// grid scrolls inside a focusable region at narrow widths.
import {
  assemble,
  close,
  esc,
  fitText,
  fmt,
  markClass,
  markStyles,
  open,
  r1,
  stampLines,
  table,
  text,
  textWidth,
  tip,
  wrapMark,
  type ChartBase,
  type ChartOutput,
  type Tone,
} from './core';

export interface HeatGridInput extends ChartBase {
  /** Table heading of the row-label column ("Country"). */
  rowHeader: string;
  rows: { label: string; href?: string }[];
  columns: { label: string }[];
  /** values[row][column]; null = not applicable (hatched). */
  values: (number | null)[][];
  /** Unit of a cell value, for tooltips ("clauses"). */
  unit: string;
  /** 0 = ink ramp (default); 1-5 = the layer's ink. */
  tone?: Tone;
  /** Print the value in each non-empty cell (default true). */
  showValues?: boolean;
  /** Row totals (right) and column totals (top) as bars (default false). */
  marginals?: boolean;
  /** Cell size (default 28); caps on the row-label column width (default
   *  180) and on the vertical column-label box (default 160). The boxes fit
   *  the longest label; a label past its cap throws. */
  cell?: number;
  labelWidth?: number;
  headerHeight?: number;
}

const L = 12;
const MAX_ALPHA = 0.38;
const MARGIN_W = 64; // row-total bars
const MARGIN_H = 40; // column-total bars

export function heatGrid(input: HeatGridInput): ChartOutput {
  const { rows, columns, values } = input;
  if (values.length !== rows.length || values.some((r) => r.length !== columns.length)) {
    throw new Error(`charts(heatGrid ${input.id}): values must be ${rows.length} rows of ${columns.length} cells`);
  }
  for (const v of values.flat()) {
    if (v !== null && (!Number.isFinite(v) || v < 0)) throw new Error(`charts(heatGrid ${input.id}): value ${v} is not a count`);
  }
  const cell = input.cell ?? 28;
  // Label boxes fit the longest label, up to the caps; a longer label throws.
  const LW_CAP = input.labelWidth ?? 180;
  const HH_CAP = input.headerHeight ?? 160;
  for (const row of rows) fitText(row.label, LW_CAP - L - 8, 13, 'body', 'row label');
  for (const col of columns) fitText(col.label, HH_CAP, 12.5, 'body', 'column label');
  const LW = Math.ceil(Math.max(...rows.map((r) => textWidth(r.label, 13)))) + L + 10;
  const HH = Math.ceil(Math.max(...columns.map((c) => textWidth(c.label, 12.5)))) + 4;
  const tone = input.tone ?? 0;
  const showValues = input.showValues ?? true;
  const marks = markStyles(input.id);
  const max = Math.max(1, ...values.flat().map((v) => v ?? 0));
  const rowTotals = values.map((r) => r.reduce<number>((s, v) => s + (v ?? 0), 0));
  const colTotals = columns.map((_, c) => values.reduce<number>((s, r) => s + (r[c] ?? 0), 0));
  const interactive = rows.some((r) => r.href);

  // Grid coordinates start at x = 0; the label column is drawn separately.
  // Column-total bars (with their value above) sit over the column labels.
  const mTop = 22;
  const top = input.marginals ? mTop + MARGIN_H + 8 : 8;
  const gridTop = top + HH + 8;
  const gridW = columns.length * cell;
  const grid: string[] = [];
  const labels: string[] = [];

  if (input.marginals) {
    const cmax = Math.max(1, ...colTotals);
    colTotals.forEach((t, c) => {
      const h = (t / cmax) * MARGIN_H;
      const x = c * cell + cell * 0.2;
      grid.push(
        `<rect x="${r1(x)}" y="${r1(mTop + MARGIN_H - h)}" width="${r1(cell * 0.6)}" height="${r1(h)}" class="${markClass('filled', tone)}">${tip(`${columns[c].label}: ${fmt(t)} ${input.unit} in total`)}</rect>`,
      );
      grid.push(text(c * cell + cell / 2, mTop + MARGIN_H - h - 4, fmt(t), { size: 12, cls: 'num', anchor: 'middle', where: 'column total' }));
    });
  }
  columns.forEach((col, c) => {
    grid.push(text(c * cell + cell / 2 + 4, top + HH, col.label, { size: 12.5, rotate: -90, where: 'column label' }));
  });
  rows.forEach((row, r) => {
    const y = gridTop + r * cell;
    labels.push(text(L, y + cell / 2 + 4.5, row.label, { size: 13, where: 'row label' }));
    columns.forEach((col, c) => {
      const v = values[r][c];
      const x = c * cell;
      const name = `${row.label} · ${col.label}: ${v === null ? 'not applicable' : `${fmt(v)} ${input.unit}`}`;
      let mark: string;
      if (v === null) {
        mark = `<rect x="${x + 1}" y="${y + 1}" width="${cell - 2}" height="${cell - 2}" ${marks.attrs('hatched', 0)}>${tip(name)}</rect>`;
      } else if (v === 0) {
        mark = `<rect x="${x + 1}" y="${y + 1}" width="${cell - 2}" height="${cell - 2}" class="cell cell-empty">${tip(name)}</rect>`;
      } else {
        const a = Math.round((0.06 + (MAX_ALPHA - 0.06) * (v / max)) * 100) / 100;
        mark = `<rect x="${x + 1}" y="${y + 1}" width="${cell - 2}" height="${cell - 2}" class="heat-${tone}" fill-opacity="${a}">${tip(name)}</rect>`;
      }
      grid.push(mark);
      if (showValues && v !== null && v > 0) {
        fitText(fmt(v), cell - 4, 12, 'mono', 'cell value');
        grid.push(text(x + cell / 2, y + cell / 2 + 4, fmt(v), { size: 12, cls: 'num', anchor: 'middle', where: 'cell value' }));
      }
    });
    if (input.marginals) {
      const rmax = Math.max(1, ...rowTotals);
      const w = (rowTotals[r] / rmax) * (MARGIN_W - 28);
      grid.push(
        `<rect x="${r1(gridW + 8)}" y="${r1(y + cell * 0.25)}" width="${r1(w)}" height="${r1(cell * 0.5)}" class="${markClass('filled', tone)}">${tip(`${row.label}: ${fmt(rowTotals[r])} ${input.unit} in total`)}</rect>`,
      );
      grid.push(text(gridW + 12 + w, y + cell / 2 + 4, fmt(rowTotals[r]), { size: 12, cls: 'num', where: 'row total' }));
    }
    if (row.href) {
      // The row label links to the row's page (grid coordinates are separate).
      labels[labels.length - 1] = wrapMark(labels[labels.length - 1], row.label, { href: row.href });
    }
  });
  const gridBottom = gridTop + rows.length * cell;
  grid.push(`<line class="rule" x1="0" y1="${r1(gridBottom + 0.5)}" x2="${gridW}" y2="${r1(gridBottom + 0.5)}"/>`);
  const extraW = input.marginals ? MARGIN_W : 0;
  const W = Math.max(LW + gridW + extraW + L, 300);

  const whole = assemble({
    base: input,
    width: W,
    bottom: gridBottom,
    body: [...labels, `<g transform="translate(${LW} 0)">${grid.join('')}</g>`],
    defs: marks.defs(),
    role: interactive ? 'group' : 'img',
    cls: 'ch-heat',
  });

  // The sticky pair: the labels alone (hidden from assistive tech, since the
  // grid SVG names the chart, unless they are links) and the grid with the
  // stamp.
  const bodyW = Math.max(gridW + extraW + L, 300);
  const stamp = stampLines(input, bodyW - L);
  const headH = Math.max(whole.height, Math.ceil(gridBottom + (stamp.length ? 22 + (stamp.length - 1) * 16 : 0) + 12));
  const head =
    `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${LW} ${headH}" width="${LW}" height="${headH}" class="${input.mode ?? 'figc'} ch-heat-head" ${interactive ? `role="group" aria-label="${esc(input.rowHeader)}"` : 'aria-hidden="true"'}>` +
    `${labels.join('')}${close()}`;
  const stampEls = stamp.map((line, i) => text(4, gridBottom + 22 + i * 16, line, { size: 12, cls: 'mono muted', where: 'stamp' }));
  const body =
    open({ id: `${input.id}-s`, title: input.title, desc: input.desc, width: bodyW, height: headH, mode: input.mode, role: 'img', cls: 'ch-heat', lang: input.lang }) +
    marks.defs() +
    `<g transform="translate(4 0)">${grid.join('')}</g>` +
    stampEls.join('') +
    close();

  const columnsOut = [input.rowHeader, ...columns.map((c) => c.label), ...(input.marginals ? ['Total'] : [])];
  const rowsOut = rows.map((row, r) => [
    row.label,
    ...values[r].map((v) => (v === null ? 'n/a' : v)),
    ...(input.marginals ? [rowTotals[r]] : []),
  ]);
  if (input.marginals) rowsOut.push(['Total', ...colTotals, rowTotals.reduce((a, b) => a + b, 0)]);
  return {
    svg: whole.svg,
    table: table(input.tableCaption ?? input.title, columnsOut, rowsOut),
    width: W,
    height: whole.height,
    sticky: { head, body },
  };
}
