// term-footprint.ts: a glossary term's footprint in the Body of Knowledge, the
// head figure of "Where it is used" on /glossary/<slug>. One slot per chapter
// in reading order; a bar's height is the number of mentions of the term in
// that chapter (zero base, linear, the count printed over it), each bar a link
// to the first section that uses the term. The chapters the glossary entry
// cross-references are drawn solid, the others outlined; a cross-referenced
// chapter that never names the term keeps a dashed stub on the baseline, so
// the three states never rest on colour. Ink only: chapters are not layers.
//
// Wide (from 480 units): columns left to right, the chapter number under each.
// Narrow (the 340 phone variant): one row per chapter that names or
// cross-references the term, bars left to right, and a closing line counting
// the chapters with neither. Both variants return the same table: every
// chapter, its mentions and whether the entry cross-references it.
//
// Built on the chart kit's shell and helpers (src/lib/charts/core.ts), like
// the other page charts; no runtime imports.
import {
  assemble,
  fitText,
  legend,
  markStyles,
  nonEmpty,
  r1,
  table,
  targets,
  text,
  textWidth,
  tip,
  type ChartBase,
  type ChartOutput,
  type MarkState,
} from '../charts/core';

export interface FootprintChapter {
  /** Zero-padded chapter number ("04"). */
  number: string;
  /** Short chapter title ("The Stack"). */
  title: string;
  /** Mentions of the term in the chapter. */
  count: number;
  /** The first section that uses the term (only when count > 0). */
  href?: string;
  /** The glossary entry cross-references this chapter. */
  referenced: boolean;
}

export interface TermFootprintInput extends ChartBase {
  chapters: FootprintChapter[];
}

const L = 12;
const COUNT_PX = 12;
const BAR_H = 110;
const ROW = 24;

const LEGEND = {
  filled: 'Cross-referenced chapter',
  outline: 'Other chapter',
  dashed: 'Cross-referenced, not named',
} as const;

const stateOf = (c: FootprintChapter): MarkState | undefined =>
  c.count > 0 ? (c.referenced ? 'filled' : 'outline') : c.referenced ? 'dashed' : undefined;

export function termFootprint(input: TermFootprintInput): ChartOutput {
  const where = `termFootprint ${input.id}`;
  nonEmpty(input.chapters, 'chapters', where);
  if (!input.chapters.some((c) => c.count > 0)) throw new Error(`charts(${where}): no chapter names the term; draw no footprint`);
  const W = input.width ?? 600;
  const wide = W >= 480;
  const marks = markStyles(input.id);
  const hits = targets(where);
  const out: string[] = [];
  const max = Math.max(...input.chapters.map((c) => c.count));
  const present = (['filled', 'outline', 'dashed'] as const).filter((s) => input.chapters.some((c) => stateOf(c) === s));
  const lg = legend(
    present.map((s) => ({ label: LEGEND[s], state: s, swatch: 'bar' as const })),
    L,
    18,
    W - L,
    marks,
  );
  out.push(`<g class="fp-legend">${lg.els.join('')}</g>`);
  let bottom: number;

  if (wide) {
    const n = input.chapters.length;
    const pitch = (W - 2 * L) / n;
    const barW = Math.min(14, pitch - 8);
    if (barW < 8) throw new Error(`charts(${where}): ${n} chapters need more than ${W}px`);
    const top = lg.bottom + 30;
    const base = top + BAR_H;
    out.push(`<line class="axis" x1="${L}" y1="${r1(base)}" x2="${r1(W - L)}" y2="${r1(base)}"/>`);
    input.chapters.forEach((c, i) => {
      const cx = L + (i + 0.5) * pitch;
      const state = stateOf(c);
      const num = text(cx, base + 17, c.number, {
        size: 12,
        cls: c.referenced ? 'mono' : 'mono muted',
        anchor: 'middle',
        weight: c.referenced ? 700 : 400,
        where: 'chapter number',
      });
      if (c.count === 0) {
        const stub = state === 'dashed' ? `<rect x="${r1(cx - barW / 2)}" y="${r1(base - 6)}" width="${r1(barW)}" height="6" ${marks.attrs('dashed', 0)}/>` : '';
        out.push(stub + num);
        return;
      }
      const h = Math.max(2, (c.count / max) * BAR_H);
      const y = base - h;
      const els = (inner: string) =>
        `<rect x="${r1(cx - barW / 2)}" y="${r1(y)}" width="${r1(barW)}" height="${r1(h)}" ${marks.attrs(state, 0)}>${inner}</rect>` +
        text(cx, y - 5, c.count, { size: COUNT_PX, cls: 'num', anchor: 'middle', where: 'count' }) +
        num;
      const name = `${c.number} ${c.title}: ${c.count} ${c.count === 1 ? 'mention' : 'mentions'}`;
      const box = { x: cx - barW / 2, y: y - 18, w: barW, h: h + 18 + 22 };
      out.push(c.href ? hits.mark(() => els(''), name, box, { href: c.href }) : els(tip(name)));
    });
    bottom = base + 17;
  } else {
    // Rows: every chapter that names or cross-references the term.
    const rows = input.chapters.filter((c) => stateOf(c));
    const labels = rows.map((c) => `${c.number} ${c.title}`);
    const labelW = Math.max(...labels.map((l) => textWidth(l, 12.5)));
    const countW = textWidth(String(max), COUNT_PX, 'mono');
    const x0 = L + labelW + 10;
    const span = W - L - countW - 6 - x0;
    if (span < 60) throw new Error(`charts(${where}): width ${W} leaves ${Math.floor(span)}px for the bars`);
    let y = lg.bottom + 16;
    rows.forEach((c, i) => {
      fitText(labels[i], W - 2 * L, 12.5, 'body', 'chapter label');
      const cy = y + ROW / 2;
      const state = stateOf(c)!;
      const label = text(L, cy + 4.5, labels[i], { size: 12.5, weight: c.referenced ? 600 : 400, where: 'chapter label' });
      if (c.count === 0) {
        out.push(label, `<rect x="${r1(x0)}" y="${r1(cy - 6)}" width="6" height="12" ${marks.attrs(state, 0)}/>`);
        out.push(text(x0 + 12, cy + 4.5, 0, { size: COUNT_PX, cls: 'num', where: 'count' }));
      } else {
        const w = Math.max(2, (c.count / max) * span);
        const els = (inner: string) =>
          label +
          `<rect x="${r1(x0)}" y="${r1(cy - 6)}" width="${r1(w)}" height="12" ${marks.attrs(state, 0)}>${inner}</rect>` +
          text(x0 + w + 6, cy + 4.5, c.count, { size: COUNT_PX, cls: 'num', where: 'count' });
        const name = `${c.number} ${c.title}: ${c.count} ${c.count === 1 ? 'mention' : 'mentions'}`;
        const box = { x: L, y: cy - ROW / 2, w: x0 + w + 6 + countW - L, h: ROW };
        out.push(c.href ? hits.mark(() => els(''), name, box, { href: c.href }) : els(tip(name)));
      }
      y += ROW;
    });
    const rest = input.chapters.length - rows.length;
    if (rest > 0) {
      y += 18;
      const line = `No mentions in the other ${rest} ${rest === 1 ? 'chapter' : 'chapters'}`;
      fitText(line, W - 2 * L, 12.5, 'body', 'closing line');
      out.push(text(L, y, line, { size: 12.5, cls: 'ink2', where: 'closing line' }));
    }
    bottom = y;
  }

  const rows = input.chapters.map((c) => [`${c.number} ${c.title}`, c.count, c.referenced ? 'Yes' : 'No']);
  const { svg, height } = assemble({
    base: input,
    width: W,
    bottom,
    body: out,
    defs: marks.defs(),
    role: input.chapters.some((c) => c.href && c.count > 0) ? 'group' : 'img',
    cls: `ch-footprint ${wide ? 'ch-cols' : 'ch-rows'}`,
  });
  return {
    svg,
    table: table(input.tableCaption ?? input.title, ['Chapter', 'Mentions', 'Cross-referenced'], rows),
    width: W,
    height,
  };
}
