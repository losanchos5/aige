// case-years.ts: the case timeline at the head of /cases. One column per year,
// left to right, every year of the span drawn (a year with no case stays an
// empty column, so gaps read as gaps); one glyph per case stacked in its
// year, shaped and filled by the strength of its record, each a link to the
// case. The case records carry a year, not a date, so the chart places cases
// by year and never invents a day. Optionally one year is the accent (its
// column on a faint band, its year label in bold; its glyphs keep the fill of
// their evidence class, so the legend reads for every year), and in the wide
// variant the last year's glyphs are named beside their column.
//
// Built on the chart kit's shell and helpers (src/lib/charts/core.ts), in
// 'chart' mode for /cases (tests/perf.spec.ts keeps figures.css off it).
import {
  minText,
  assemble,
  fitText,
  legend,
  markStyles,
  nonEmpty,
  r1,
  shape,
  shapeBox,
  table,
  targets,
  text,
  textWidth,
  type Box,
  type ChartBase,
  type ChartOutput,
  type MarkState,
  type Shape,
} from '../charts/core';

export type CaseEvidenceClass = 'primary' | 'secondary' | 'reported';

export interface YearCase {
  label: string;
  year: number;
  evidence: CaseEvidenceClass;
  sector: string;
  href: string;
}

export interface CaseYearsInput extends ChartBase {
  cases: YearCase[];
  /** First and last year of the axis (every case must fall inside). */
  from: number;
  to: number;
  /** Wording of each evidence class, for the legend, tooltips and table. */
  evidenceLabels: Record<CaseEvidenceClass, string>;
  /** The year the caption is about: its column on a band, its year in bold. */
  highlightYear?: number;
  /** Wide only: name the glyphs of the last year beside its column. */
  nameLastYear?: boolean;
  /** Axis title (default "Cases per year"). */
  axisTitle?: string;
}

const L = 12;
const NAME_PX = 12.5;

/** Evidence class as shape and fill, so it never rests on colour. */
export const EVIDENCE_MARK: Record<CaseEvidenceClass, { shape: Shape; state: MarkState }> = {
  primary: { shape: 'circle', state: 'filled' },
  secondary: { shape: 'square', state: 'outline' },
  reported: { shape: 'triangle', state: 'dashed' },
};
const ORDER: CaseEvidenceClass[] = ['primary', 'secondary', 'reported'];

/** Within a year: strongest record at the base, then by name. */
const inYear = (a: YearCase, b: YearCase) =>
  ORDER.indexOf(a.evidence) - ORDER.indexOf(b.evidence) || (a.label < b.label ? -1 : a.label > b.label ? 1 : 0);

export function caseYears(input: CaseYearsInput): ChartOutput {
  const where = `caseYears ${input.id}`;
  nonEmpty(input.cases, 'cases', where);
  if (input.to < input.from) throw new Error(`charts(${where}): ${input.to} is before ${input.from}`);
  for (const c of input.cases) {
    if (c.year < input.from || c.year > input.to) {
      throw new Error(`charts(${where}): "${c.label}" (${c.year}) falls outside ${input.from} to ${input.to}`);
    }
  }
  const W = input.width ?? 640;
  const sm = minText(W);
  const wide = W >= 480;
  const r = wide ? 10 : 8;
  // Vertical glyph pitch: linked marks keep 24 px apart.
  const PITCH = wide ? 28 : 26;
  const years = Array.from({ length: input.to - input.from + 1 }, (_, i) => input.from + i);
  const byYear = new Map(years.map((year) => [year, input.cases.filter((c) => c.year === year).sort(inYear)]));
  const last = byYear.get(input.to)!;
  const named = wide && input.nameLastYear && last.length > 0;
  const nameW = named ? Math.max(...last.map((c) => textWidth(c.label, NAME_PX))) + 14 : 0;
  const colW = (W - 2 * L - nameW) / years.length;
  if (colW < 2 * r + 6) throw new Error(`charts(${where}): ${years.length} year columns need more than ${W}px`);
  const maxStack = Math.max(1, ...[...byYear.values()].map((list) => list.length));
  const marks = markStyles(input.id);
  const hits = targets(where);
  const out: string[] = [];

  const lg = legend(
    ORDER.filter((e) => input.cases.some((c) => c.evidence === e)).map((e) => ({ label: input.evidenceLabels[e], ...EVIDENCE_MARK[e] })),
    L,
    16,
    W - L,
    marks,
  );
  out.push(...lg.els);
  let y = lg.bottom + 24;
  const axisTitle = input.axisTitle ?? 'Cases per year';
  fitText(axisTitle, W - 2 * L, sm, 'mono', 'axis title');
  out.push(text(L, y, axisTitle, { size: sm, cls: 'mono muted', where: 'axis title' }));
  // Room for the count above the tallest stack.
  const top = y + 28;
  const base = top + maxStack * PITCH + 4;
  const cx = (i: number) => L + (i + 0.5) * colW;
  const glyphs: string[] = [];

  years.forEach((year, i) => {
    const list = byYear.get(year)!;
    const accent = year === input.highlightYear;
    if (accent && list.length) {
      // The band holds the column and, when named, the names beside it.
      const bandW = colW - 4 + (named && year === input.to ? nameW : 0);
      out.push(`<rect x="${r1(cx(i) - colW / 2 + 2)}" y="${r1(base - list.length * PITCH - 30)}" width="${r1(bandW)}" height="${r1(list.length * PITCH + 30)}" rx="6" class="panel"/>`);
    }
    list.forEach((c, k) => {
      const x = cx(i);
      const cy = base - 4 - PITCH / 2 - k * PITCH;
      const mark = EVIDENCE_MARK[c.evidence];
      const cls = marks.attrs(mark.state, 0);
      const name = `${c.label} (${year}; ${input.evidenceLabels[c.evidence]})`;
      const box: Box = shapeBox(mark.shape, x, cy, r);
      const label = named && year === input.to;
      if (label) fitText(c.label, W - L - (x + r + 8), NAME_PX, 'body', 'case name');
      const hit = label ? { x: box.x, y: box.y, w: r + 8 + textWidth(c.label, NAME_PX) + r, h: box.h } : box;
      glyphs.push(
        hits.mark(
          (inner) =>
            shape(mark.shape, x, cy, r, cls, inner) +
            (label ? text(x + r + 8, cy + 4.5, c.label, { size: NAME_PX, where: 'case name' }) : ''),
          name,
          hit,
          { href: c.href },
        ),
      );
    });
    if (list.length) {
      out.push(
        text(cx(i), base - 4 - list.length * PITCH - 8, list.length, { size: 16, cls: 'disp num', anchor: 'middle', where: 'count' }),
      );
    }
    out.push(
      text(cx(i), base + 19, year, { size: sm, cls: accent ? 'num' : 'num muted', anchor: 'middle', weight: accent ? 700 : 400, where: 'year' }),
    );
  });
  out.push(`<line class="axis" x1="${L}" y1="${r1(base)}" x2="${r1(L + years.length * colW)}" y2="${r1(base)}"/>`);
  out.push(...glyphs);

  const rows = years.flatMap((year) =>
    [...byYear.get(year)!].sort((a, b) => (a.label < b.label ? -1 : a.label > b.label ? 1 : 0)).map((c) => [c.label, year, input.evidenceLabels[c.evidence], c.sector]),
  );
  const { svg, height } = assemble({
    base: input,
    width: W,
    bottom: base + 19,
    body: out,
    defs: marks.defs(),
    role: 'group',
    cls: 'ch-years',
  });
  return {
    svg,
    table: table(input.tableCaption ?? input.title, ['Case', 'Year', 'Evidence', 'Sector'], rows),
    width: W,
    height,
  };
}
