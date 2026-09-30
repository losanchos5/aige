// contract-matrix.ts: the clause x instrument dot matrix at the head of
// /resources/contracts, drawn from data/contracts.ts (each clause's `mapsTo`).
// One row per clause, one column per instrument the clauses map to, a dot where
// a clause maps to an instrument. The columns group EU legislation (filled
// dots) ahead of model clauses and standards (outlined dots), so a reader sees
// which clauses rest on binding law and which only on good practice. Rows are
// ordered by how many instruments a clause answers; a bar at the end of each
// row and a bar over each column give the totals, and the busiest column is
// the one accent. Row labels link to the clause's row in the table below.
//
// Built with the chart kit's helpers (src/lib/charts/core.ts): the accessible
// shell, measured text that throws instead of cutting a label, mark classes of
// both style modes and the Source / As of stamp. From width 860 the grid gets a
// wider pitch and label column; the same call at width 340 gives the phone
// variant: each clause's name on its own line above its dots.
import {
  assemble,
  fitText,
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

export interface MatrixClause {
  id: string;
  clause: string;
  mapsTo: readonly string[];
}

export interface MatrixInstrument {
  /** Reference id as `mapsTo` uses it. */
  ref: string;
  /** EU legislation (filled) or a model clause set, standard or framework (outlined). */
  kind: 'law' | 'soft';
  /** Column label; defaults to the reference's own label. */
  short?: string;
}

/** Column order: EU legislation first, then model clauses and standards. A
 *  reference a clause uses and this list lacks throws at build. */
export const CONTRACT_INSTRUMENTS: readonly MatrixInstrument[] = [
  { ref: 'aia-13', kind: 'law' },
  { ref: 'aia-25-4', kind: 'law' },
  { ref: 'aia-26', kind: 'law' },
  { ref: 'gdpr-28', kind: 'law' },
  { ref: 'gdpr-33', kind: 'law' },
  { ref: 'gdpr-44', kind: 'law' },
  { ref: 'nis2-21', kind: 'law' },
  { ref: 'dora-28', kind: 'law' },
  { ref: 'pld-2024-2853', kind: 'law', short: 'PLD (EU) 2024/2853' },
  { ref: 'mcc-ai', kind: 'soft' },
  { ref: 'iso-42001-a10', kind: 'soft' },
  { ref: 'nist-govern-6', kind: 'soft' },
  { ref: 'nist-manage-3', kind: 'soft' },
];

export const KIND_LABEL = { law: 'EU legislation', soft: 'Model clauses and standards' } as const;

export interface ContractMatrixInput {
  id: string;
  title: string;
  desc: string;
  source?: string;
  asOf?: string;
  mode?: ChartMode;
  width?: number;
  clauses: readonly MatrixClause[];
  references: Readonly<Record<string, { label: string }>>;
  /** Link of a row label (default: none). */
  href?: (clause: MatrixClause) => string;
  tableCaption?: string;
}

const L = 12;
const GROUP_GAP = 10;

/** Clauses in drawing order: most instruments first, then most EU legislation, then data order. */
export function matrixOrder(clauses: readonly MatrixClause[], instruments = CONTRACT_INSTRUMENTS): MatrixClause[] {
  const law = new Set(instruments.filter((i) => i.kind === 'law').map((i) => i.ref));
  const lawCount = (c: MatrixClause) => c.mapsTo.filter((r) => law.has(r)).length;
  return clauses
    .map((c, i) => ({ c, i }))
    .sort((a, b) => b.c.mapsTo.length - a.c.mapsTo.length || lawCount(b.c) - lawCount(a.c) || a.i - b.i)
    .map(({ c }) => c);
}

export function contractMatrix(input: ContractMatrixInput): ChartOutput {
  const where = `contractMatrix ${input.id}`;
  const W = input.width ?? 760;
  const wide = W >= 480;
  const cols = CONTRACT_INSTRUMENTS;
  const known = new Set(cols.map((c) => c.ref));
  for (const c of input.clauses) {
    for (const ref of c.mapsTo) {
      if (!known.has(ref)) throw new Error(`charts(${where}): clause "${c.id}" maps to "${ref}", which CONTRACT_INSTRUMENTS does not place in a column`);
      if (!input.references[ref]) throw new Error(`charts(${where}): "${ref}" is not in references`);
    }
  }
  if (!input.clauses.length) throw new Error(`charts(${where}): no clauses to draw`);
  const rows = matrixOrder(input.clauses, cols);
  const colLabel = (c: MatrixInstrument) => c.short ?? input.references[c.ref].label;
  const lawCols = cols.filter((c) => c.kind === 'law').length;

  // Horizontal frame: label column (wide only), the grid, row totals (wide only).
  const labelFont = 13;
  const roomy = W >= 860;
  const labelCap = roomy ? 330 : 250;
  const LW = wide ? Math.min(labelCap, Math.ceil(Math.max(...rows.map((r) => textWidth(r.clause, labelFont))))) + 12 : 0;
  const totalsW = wide ? 64 : 0;
  const x0 = L + LW;
  const pitch = wide ? (roomy ? 36 : 30) : Math.floor((W - 2 * L - GROUP_GAP) / cols.length);
  if (pitch < 20) throw new Error(`charts(${where}): ${cols.length} columns need ${cols.length * 20 + GROUP_GAP + 2 * L}px; widen the chart`);
  const colX = (i: number) => x0 + i * pitch + (i >= lawCols ? GROUP_GAP : 0) + pitch / 2;
  const gridRight = colX(cols.length - 1) + pitch / 2;
  const width = wide ? Math.max(W, Math.ceil(gridRight + totalsW + L)) : W;
  if (!wide && gridRight > W - L + 0.5) throw new Error(`charts(${where}): the grid is ${Math.ceil(gridRight + L)}px wide, the chart ${W}px`);
  const r = wide ? (roomy ? 8.5 : 7.5) : 6.5;

  const out: string[] = [];
  let y = 4;

  // Group heads over their columns, each with a bracket rule.
  const heads: { kind: 'law' | 'soft'; from: number; to: number }[] = [
    { kind: 'law', from: 0, to: lawCols - 1 },
    { kind: 'soft', from: lawCols, to: cols.length - 1 },
  ];
  const headLines = heads.map((h) => wrapText(KIND_LABEL[h.kind], colX(h.to) - colX(h.from) + pitch - 4, 12.5, 'body', 2, 'group heading'));
  const headH = Math.max(...headLines.map((l) => l.length)) * 15;
  heads.forEach((h, i) => {
    const a = colX(h.from) - pitch / 2 + 2;
    const b = colX(h.to) + pitch / 2 - 2;
    headLines[i].forEach((line, k) => out.push(text(a, y + 13 + k * 15, line, { size: 12.5, weight: 600, where: 'group heading' })));
    out.push(`<path class="axis" d="M${r1(a)} ${r1(y + headH + 8)}V${r1(y + headH + 4)}H${r1(b)}V${r1(y + headH + 8)}"/>`);
  });
  y += headH + 14;

  // Column totals: a bar per instrument, its count above; the busiest is the accent.
  const colTotals = cols.map((c) => rows.filter((row) => row.mapsTo.includes(c.ref)).length);
  const maxCol = Math.max(...colTotals);
  const barH = 36;
  y += 14;
  cols.forEach((c, i) => {
    const h = Math.max(2, (colTotals[i] / maxCol) * barH);
    const x = colX(i);
    const bw = Math.min(14, pitch - 8);
    const cls = colTotals[i] === maxCol ? 'mk mk-hi' : markClass('filled', 0);
    out.push(`<rect x="${r1(x - bw / 2)}" y="${r1(y + barH - h)}" width="${r1(bw)}" height="${r1(h)}" class="${cls}">${tip(`${colLabel(c)}: ${colTotals[i]} clause${colTotals[i] === 1 ? '' : 's'}`)}</rect>`);
    out.push(text(x, y + barH - h - 4, fmt(colTotals[i]), { size: 12, cls: 'num', anchor: 'middle', where: 'column total' }));
  });
  y += barH + 6;

  // Vertical column labels, bottom-aligned on the grid.
  const labelH = Math.ceil(Math.max(...cols.map((c) => textWidth(colLabel(c), 12.5)))) + 4;
  if (labelH > 160) throw new Error(`charts(${where}): a column label needs ${labelH}px of height; shorten it`);
  cols.forEach((c, i) => out.push(text(colX(i) + 4.5, y + labelH, colLabel(c), { size: 12.5, rotate: -90, where: 'column label' })));
  y += labelH + 8;

  // Rows.
  const rowTotals = rows.map((row) => row.mapsTo.length);
  const maxRow = Math.max(...rowTotals);
  const gridTop = y;
  const bands: string[] = [];
  const totalBars: string[] = [];
  const dots: Record<'law' | 'soft', string[]> = { law: [], soft: [] };
  rows.forEach((row, ri) => {
    let lines: string[];
    let dotY: number;
    let rowH: number;
    if (wide) {
      lines = wrapText(row.clause, LW - 12, labelFont, 'body', 2, 'row label');
      rowH = Math.max(roomy ? 32 : 30, lines.length * 15 + 6);
      dotY = y + rowH / 2;
      const els = lines.map((line, k) => text(L, dotY + 4.5 - ((lines.length - 1) * 15) / 2 + k * 15, line, { size: labelFont, where: 'row label' }));
      out.push(input.href ? linkText(els.join(''), row.clause, input.href(row)) : els.join(''));
    } else {
      lines = wrapText(row.clause, W - 2 * L, labelFont, 'body', 2, 'row label');
      const els = lines.map((line, k) => text(L, y + 14 + k * 15, line, { size: labelFont, where: 'row label' }));
      out.push(input.href ? linkText(els.join(''), row.clause, input.href(row)) : els.join(''));
      dotY = y + lines.length * 15 + 14;
      rowH = lines.length * 15 + 28;
    }
    if (ri % 2 === 0) bands.push(`M${L - 4} ${r1(y)}h${r1(width - 2 * L + 8)}v${r1(rowH)}h${r1(-(width - 2 * L + 8))}z`);
    // Dots carry no tooltip of their own (the 12 KB budget): their row and
    // column labels name them, and the table lists every mapping.
    cols.forEach((c, i) => {
      if (row.mapsTo.includes(c.ref)) dots[c.kind].push(`<circle cx="${r1(colX(i))}" cy="${r1(dotY)}" r="${r}"/>`);
    });
    if (wide) {
      const bx = gridRight + 10;
      const bw = (rowTotals[ri] / maxRow) * (totalsW - 30);
      totalBars.push(`M${r1(bx)} ${r1(dotY - 5)}h${r1(bw)}v10h${r1(-bw)}z`);
      out.push(text(bx + bw + 5, dotY + 4.5, fmt(rowTotals[ri]), { size: 12, cls: 'num', where: 'row total' }));
    }
    y += rowH;
  });
  // Row bands, then the column guides over them, both under the dots.
  const guides = cols.map((_, i) => `M${r1(colX(i))} ${r1(gridTop)}V${r1(y)}`).join('');
  out.unshift(`<path class="cell-empty" d="${bands.join('')}"/>`, `<path class="rule" d="${guides}"/>`);
  // Marks inherit fill and stroke from their group's mark class.
  out.push(`<g class="${markClass('filled', 0)}">${dots.law.join('')}</g>`, `<g class="${markClass('outline', 0)}">${dots.soft.join('')}</g>`);
  if (totalBars.length) out.push(`<path class="${markClass('filled', 0)}" d="${totalBars.join('')}"/>`);

  // Legend.
  y += 24;
  const legendItems: [string, 'filled' | 'outline'][] = [
    [`${KIND_LABEL.law}`, 'filled'],
    [`${KIND_LABEL.soft}`, 'outline'],
  ];
  let lx = L;
  for (const [label, state] of legendItems) {
    const w = 18 + textWidth(label, 12.5) + 16;
    if (lx > L && lx + w > width - L) {
      lx = L;
      y += 20;
    }
    fitText(label, width - 2 * L - 18, 12.5, 'body', 'legend');
    out.push(`<circle cx="${r1(lx + 6)}" cy="${r1(y - 4)}" r="6" class="${markClass(state, 0)}"/>`);
    out.push(text(lx + 18, y, label, { size: 12.5, where: 'legend' }));
    lx += w;
  }
  if (wide) {
    const note = 'Bars: instruments per clause, clauses per instrument';
    fitText(note, width - 2 * L, 12, 'body', 'legend');
    y += 20;
    out.push(text(L, y, note, { size: 12, cls: 'ink2', where: 'legend' }));
  }

  const { svg, height } = assemble({
    base: { id: input.id, title: input.title, desc: input.desc, source: input.source, asOf: input.asOf, mode: input.mode },
    width,
    bottom: y,
    body: out,
    role: input.href ? 'group' : 'img',
    cls: 'ch-matrix',
  });
  const kindLabels = (row: MatrixClause, kind: 'law' | 'soft') =>
    cols
      .filter((c) => c.kind === kind && row.mapsTo.includes(c.ref))
      .map((c) => input.references[c.ref].label)
      .join('; ');
  return {
    svg,
    table: table(
      input.tableCaption ?? input.title,
      ['Clause', KIND_LABEL.law, KIND_LABEL.soft, 'Instruments'],
      rows.map((row) => [row.clause, kindLabels(row, 'law') || 'None', kindLabels(row, 'soft') || 'None', row.mapsTo.length]),
    ),
    width,
    height,
  };
}
