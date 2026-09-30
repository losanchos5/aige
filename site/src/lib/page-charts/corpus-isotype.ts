// corpus-isotype.ts: "The corpus in dots", the opening band of /resources.
// One row per resource, largest first: the resource name (a link to it), a
// run of dots where one dot stands for `unit` records, and the count. The dots
// are one rect per row filled with a dot pattern, so a remainder shows as a
// partial dot (the Isotype convention) and the SVG stays small whatever the
// counts. Each row's tone is the swatch of its card on the hub.
//
// Built on the chart kit's shell and helpers (src/lib/charts/core.ts); the
// classes are the kit's, so it renders in 'chart' mode on /resources, which
// tests/perf.spec.ts keeps free of figures.css. Wide (>= 480) puts the name in
// a column left of the dots; narrow puts the name and count on one line and
// the dots under it.
import {
  assemble,
  esc,
  fitText,
  markClass,
  nonEmpty,
  r1,
  table,
  text,
  textWidth,
  tip,
  type ChartBase,
  type ChartOutput,
  type Tone,
} from '../charts/core';

export interface CorpusRow {
  /** Resource name, as on its hub card. */
  label: string;
  count: number;
  /** What one record is ("obligations", "terms"). */
  noun: string;
  tone: Tone;
  href: string;
}

export interface CorpusIsotypeInput extends ChartBase {
  rows: CorpusRow[];
  /** Records per dot. */
  unit: number;
  /** Legend word for a record in general (default "records"). */
  recordWord?: string;
  resourceHeader?: string;
  countHeader?: string;
  nounHeader?: string;
}

const L = 12;
const WIDE_AT = 480;
const LABEL_PX = 13;
const COUNT_PX = 12;
/** Largest dot pitch; smaller when the longest row needs it. */
const MAX_PITCH = 14;
/** Below this pitch the dots stop reading as dots: raise the unit. */
const MIN_PITCH = 6;

/** Largest first; equal counts by name, independent of locale. */
const byWeight = (a: CorpusRow, b: CorpusRow) => b.count - a.count || (a.label < b.label ? -1 : a.label > b.label ? 1 : 0);

export function corpusIsotype(input: CorpusIsotypeInput): ChartOutput {
  const where = `corpusIsotype ${input.id}`;
  nonEmpty(input.rows, 'rows', where);
  if (!(input.unit > 0)) throw new Error(`charts(${where}): unit must be positive`);
  for (const row of input.rows) {
    if (!Number.isInteger(row.count) || row.count <= 0) {
      throw new Error(`charts(${where}): "${row.label}" has count ${row.count}; every row needs a positive whole count`);
    }
  }
  const W = input.width ?? 640;
  const wide = W >= WIDE_AT;
  const rows = [...input.rows].sort(byWeight);
  const countText = (row: CorpusRow) => `${row.count} ${row.noun}`;
  const countW = Math.max(...rows.map((row) => textWidth(countText(row), COUNT_PX, 'mono')));
  const maxDots = rows[0].count / input.unit;

  // Horizontal budget: wide = name column, dots, count; narrow = dots alone.
  const labelW = wide ? Math.max(...rows.map((row) => textWidth(row.label, LABEL_PX))) : 0;
  const dotsX = wide ? L + labelW + 14 : L;
  const room = wide ? W - L - countW - 10 - dotsX : W - 2 * L;
  const pitch = Math.floor(Math.min(MAX_PITCH, room / maxDots) * 10) / 10;
  if (pitch < MIN_PITCH) {
    throw new Error(
      `charts(${where}): ${rows[0].count} records at ${input.unit} per dot need a ${r1(room / maxDots)}px pitch, under ${MIN_PITCH}px; raise the unit`,
    );
  }
  const r = pitch * 0.4;
  const tones = [...new Set(rows.map((row) => row.tone))].sort((a, b) => a - b);
  const pat = (tone: Tone) => `${input.id}-p${tone}`;
  const defs =
    '<defs>' +
    tones
      .map(
        (tone) =>
          `<pattern id="${pat(tone)}" width="${pitch}" height="${pitch}" patternUnits="userSpaceOnUse">` +
          `<circle cx="${r1(pitch / 2)}" cy="${r1(pitch / 2)}" r="${r1(r)}" class="${markClass('filled', tone)}"/></pattern>`,
      )
      .join('') +
    '</defs>';

  const body: string[] = [];
  // Legend: one sample dot and what it stands for.
  const key = `1 dot = ${input.unit} ${input.recordWord ?? 'records'}`;
  fitText(key, W - 2 * L - 20, 12.5, 'body', 'legend');
  body.push(`<circle cx="${L + 5}" cy="14" r="${r1(r)}" class="${markClass('filled', 0)}"/>`);
  body.push(text(L + 16, 18, key, { size: 12.5, where: 'legend' }));

  let y = 34;
  for (const row of rows) {
    const name = `${row.label}: ${countText(row)}`;
    const dotsW = (row.count / input.unit) * pitch;
    fitText(row.label, wide ? labelW : W - 2 * L - countW - 12, LABEL_PX, 'body', 'resource name');
    const parts: string[] = [];
    let dotsY: number;
    if (wide) {
      // Row of 26: name and count share the dots' centre line.
      const mid = y + 13;
      dotsY = mid - pitch / 2;
      parts.push(text(L, mid + 4.5, row.label, { size: LABEL_PX, where: 'resource name' }));
      parts.push(text(dotsX + dotsW + 10, mid + 4, countText(row), { size: COUNT_PX, cls: 'mono', where: 'count' }));
      y += 26;
    } else {
      parts.push(text(L, y + 13, row.label, { size: LABEL_PX, where: 'resource name' }));
      parts.push(text(W - L, y + 13, countText(row), { size: COUNT_PX, cls: 'mono', anchor: 'end', where: 'count' }));
      dotsY = y + 20;
      y = dotsY + pitch + 9;
    }
    // The pattern tiles from the group's origin, so every row starts on a
    // whole dot and a remainder cuts the last one.
    parts.push(
      `<g transform="translate(${r1(dotsX)} ${r1(dotsY)})"><rect width="${r1(dotsW)}" height="${r1(pitch)}" fill="url(#${pat(row.tone)})"/></g>`,
    );
    body.push(`<a href="${esc(row.href)}">${tip(name)}${parts.join('')}</a>`);
  }

  const { svg, height } = assemble({
    base: input,
    width: W,
    bottom: y,
    body,
    defs,
    role: 'group',
    cls: 'ch-corpus',
  });
  return {
    svg,
    table: table(
      input.tableCaption ?? input.title,
      [input.resourceHeader ?? 'Resource', input.countHeader ?? 'Records', input.nounHeader ?? 'Counted as'],
      rows.map((row) => [row.label, row.count, row.noun]),
    ),
    width: W,
    height,
  };
}
