// spine.ts: BookSpine, the chapters of the book in order, grouped by part
// (design D4). Parts take neutral ink tints that alternate part by part,
// never a layer colour (audit SL-06): a part is not a stack layer. Encodings:
//  - 'bars': one bar per chapter, its length the chapter's value (reading
//    minutes on /bok), the value printed at its end;
//  - 'dots': one mark per item (a figure, a diagram) stacked on the chapter,
//    its shape the item's kind (the atlas of /figures), with a shape legend;
//  - mini: a compact strip with the highlighted chapters in solid ink and,
//    under it, one link per highlighted chapter (/figures/[id]).
// Horizontal (default from 480 wide, 720 by default): chapters left to right,
// each column a link named by its <title>, the part label over its columns,
// the chapter number under each. Vertical (narrow, 280, and under 480 wide):
// the chapters stacked top to bottom under part headings, each row a link
// with its bar or marks under the title, text at 12.5 or more. Every variant
// returns the same table: Part | Chapter | the value (bars) or one column per
// kind and a total (dots) | Highlighted (when any chapter is).
import {
  assemble,
  fitText,
  fmt,
  legend,
  linkText,
  markStyles,
  nonEmpty,
  r1,
  shape,
  table,
  targets,
  text,
  textWidth,
  tip,
  words,
  wrapText,
  type Cell,
  type ChartBase,
  type ChartOutput,
  type MarkState,
  type Shape,
} from './core';

export interface SpineMark {
  shape: Shape;
  /** How many items of this kind the chapter holds. */
  count: number;
  /** The kind, for the legend, tooltip and table ("Infographic"). */
  label: string;
  /** Default filled in the part's tint. */
  state?: MarkState;
}

export interface SpineChapter {
  /** Chapter number (a number prints as two digits, "07"). */
  num: number | string;
  label: string;
  href?: string;
  /** 'bars': the bar's value (0 or more). */
  value?: number;
  /** 'dots': the chapter's items by kind (list kinds in one order throughout). */
  marks?: SpineMark[];
  /** Drawn in solid ink (and listed under a mini strip). */
  highlight?: boolean;
}

export interface SpinePart {
  label: string;
  chapters: SpineChapter[];
}

export interface BookSpineInput extends ChartBase {
  parts: SpinePart[];
  /** 'bars' (default) or 'dots'; a mini strip ignores it. */
  encoding?: 'bars' | 'dots';
  /** Plural noun of a value or an item ("min", "figures") and its singular. */
  unit: string;
  unitOne?: string;
  /** The compact strip with highlighted chapters listed under it (280 by default). */
  mini?: boolean;
  /** 'horizontal' (default from 480 wide) or 'vertical' (narrow). */
  orientation?: 'horizontal' | 'vertical';
  partHeader?: string;
  chapterHeader?: string;
  valueHeader?: string;
}

const L = 12;
const NARROW_W = 280;
const SPINE_WORDS = {
  en: { part: 'Part', chapter: 'Chapter' },
  es: { part: 'Parte', chapter: 'Capítulo' },
};
const numOf = (c: SpineChapter) => (typeof c.num === 'number' ? String(c.num).padStart(2, '0') : c.num);

export function bookSpine(input: BookSpineInput): ChartOutput {
  const where = `bookSpine ${input.id}`;
  const { parts } = input;
  nonEmpty(parts, 'parts', where);
  for (const p of parts) if (!p.chapters.length) throw new Error(`charts(${where}): part "${p.label}" has no chapters`);
  const encoding = input.mini ? 'mini' : (input.encoding ?? 'bars');
  const all = parts.flatMap((p, pi) => p.chapters.map((c) => ({ c, pi })));
  for (const { c } of all) {
    if (encoding === 'bars' && !(Number.isFinite(c.value) && c.value! >= 0)) {
      throw new Error(`charts(${where}): chapter "${c.label}" needs a value of 0 or more`);
    }
    for (const m of c.marks ?? []) {
      if (!(Number.isInteger(m.count) && m.count >= 0)) throw new Error(`charts(${where}): chapter "${c.label}" has ${m.count} "${m.label}"; counts are whole`);
    }
  }
  const kinds: SpineMark[] = [];
  for (const { c } of all) for (const m of c.marks ?? []) if (!kinds.some((k) => k.label === m.label)) kinds.push(m);
  const countOf = (c: SpineChapter) => (c.marks ?? []).reduce((s, m) => s + m.count, 0);
  const valueOf = (c: SpineChapter) => (encoding === 'bars' ? c.value! : countOf(c));
  const unitOf = (v: number) => (v === 1 && input.unitOne ? input.unitOne : input.unit);
  const w = words(input.lang);
  const sw = SPINE_WORDS[input.lang === 'es' ? 'es' : 'en'];
  const vertical = !input.mini && (input.orientation ?? ((input.width ?? 720) < 480 ? 'vertical' : 'horizontal')) === 'vertical';
  const W = input.width ?? (input.mini || vertical ? NARROW_W : 720);
  const marks = markStyles(input.id);
  const hits = targets(where);
  const tint = (pi: number, c: SpineChapter) => (c.highlight ? 'mk-hi' : `sp-p${pi % 2}`);
  const nameOf = (c: SpineChapter) => {
    const head = `${numOf(c)} ${c.label}`;
    if (encoding === 'mini') return c.highlight ? `${head} (${w.highlighted.toLowerCase()})` : head;
    const v = valueOf(c);
    const kindsText = encoding === 'dots' ? (c.marks ?? []).filter((m) => m.count).map((m) => `${m.count} ${m.label}`) : [];
    return `${head}: ${fmt(v)} ${unitOf(v)}${kindsText.length ? ` (${kindsText.join(', ')})` : ''}`;
  };
  // The marks of one chapter's dots, in rows of `perRow` from (x, y) along +x
  // and -y (horizontal columns grow upwards) or +y (vertical rows).
  const dots = (pi: number, c: SpineChapter, x: number, y: number, perRow: number, up: boolean) => {
    const els: string[] = [];
    let i = 0;
    for (const m of c.marks ?? []) {
      const attrs = m.state && m.state !== 'filled' ? marks.attrs(m.state, 0) : `class="mk ${tint(pi, c)}"`;
      for (let n = 0; n < m.count; n++, i++) {
        const col = i % perRow;
        const row = Math.floor(i / perRow);
        els.push(shape(m.shape, x + col * 10, up ? y - row * 10 : y + row * 10, 4, attrs));
      }
    }
    return els.join('');
  };
  const out: string[] = [];
  let bottom: number;

  if (encoding === 'mini') {
    // The strip: one cell per chapter, a gap between parts; then the links.
    const G = 6;
    const p = (W - 2 * L - G * (parts.length - 1)) / all.length;
    if (p < 6) throw new Error(`charts(${where}): width ${W} leaves ${p.toFixed(1)}px per chapter; widen the strip`);
    let x = L;
    all.forEach(({ c, pi }, i) => {
      if (i && all[i - 1].pi !== pi) x += G;
      out.push(`<rect x="${r1(x + 1)}" y="8" width="${r1(p - 2)}" height="18" rx="1.5" class="${c.highlight ? 'mk-hi' : 'sp-off'}">${tip(nameOf(c))}</rect>`);
      x += p;
    });
    out.push(text(L, 42, numOf(all[0].c), { size: 12.5, cls: 'mono muted', where: 'first chapter' }));
    out.push(text(W - L, 42, numOf(all[all.length - 1].c), { size: 12.5, cls: 'mono muted', anchor: 'end', where: 'last chapter' }));
    let y = 42;
    for (const { c } of all.filter((x) => x.c.highlight)) {
      const lines = wrapText(`${numOf(c)} ${c.label}`, W - 2 * L, 12.5, 'body', 2, 'chapter label');
      const els = lines.map((line, i) => text(L, y + 24 + i * 16, line, { size: 12.5, weight: 600, where: 'chapter label' }));
      out.push(c.href ? linkText(els.join(''), `${numOf(c)} ${c.label}`, c.href) : els.join(''));
      y += 24 + (lines.length - 1) * 16;
    }
    bottom = y;
  } else if (!vertical) {
    const G = 10;
    const p = (W - 2 * L - G * (parts.length - 1)) / all.length;
    const linked = all.some(({ c }) => c.href);
    if (p < (linked ? 24 : 16)) throw new Error(`charts(${where}): width ${W} leaves ${p.toFixed(1)}px per chapter; ${linked ? 'linked chapters need 24' : 'widen the chart'}`);
    // Part labels over their columns.
    const xs: number[] = [];
    let x = L;
    all.forEach(({ pi }, i) => {
      if (i && all[i - 1].pi !== pi) x += G;
      xs.push(x);
      x += p;
    });
    const spans = parts.map((_, pi) => {
      const idx = all.map((a, i) => (a.pi === pi ? i : -1)).filter((i) => i >= 0);
      return { x0: xs[idx[0]], x1: xs[idx[idx.length - 1]] + p };
    });
    const partLines = parts.map((part, pi) => wrapText(part.label, spans[pi].x1 - spans[pi].x0, 12.5, 'body', 3, 'part label'));
    const headH = Math.max(...partLines.map((l) => l.length)) * 15 + 8;
    parts.forEach((_, pi) => {
      const n = partLines[pi].length;
      partLines[pi].forEach((line, i) =>
        out.push(text(spans[pi].x0, headH - 8 - (n - 1 - i) * 15, line, { size: 12.5, weight: 600, where: 'part label' })),
      );
    });
    out.push(`<path class="rule" d="${spans.map((s) => `M${r1(s.x0)} ${headH}H${r1(s.x1)}`).join('')}"/>`);
    const maxV = Math.max(1, ...all.map(({ c }) => valueOf(c)));
    const plotH = encoding === 'bars' ? 140 : Math.max(40, maxV * 10);
    const top = headH + (encoding === 'bars' ? 22 : 10);
    const base = top + plotH;
    for (const [i, { c, pi }] of all.entries()) {
      const cx = xs[i];
      const num = numOf(c);
      fitText(num, p, 12, 'mono', 'chapter number');
      const draw = (inner: string) => {
        let body: string;
        if (encoding === 'bars') {
          const h = (valueOf(c) / maxV) * plotH;
          const v = fmt(valueOf(c));
          fitText(v, p, 12, 'mono', 'chapter value');
          body =
            `<rect x="${r1(cx + 3)}" y="${r1(base - h)}" width="${r1(p - 6)}" height="${r1(h)}" class="mk ${tint(pi, c)}"${inner ? `>${inner}</rect>` : '/>'}` +
            text(cx + p / 2, base - h - 5, v, { size: 12, cls: 'num', anchor: 'middle', where: 'chapter value' });
        } else {
          const perRow = Math.max(1, Math.floor((p - 4) / 10));
          body =
            `<rect x="${r1(cx)}" y="${r1(top)}" width="${r1(p)}" height="${r1(plotH)}" class="sp-col"${inner ? `>${inner}</rect>` : '/>'}` +
            dots(pi, c, cx + p / 2 - ((Math.min(perRow, countOf(c)) - 1) * 10) / 2, base - 6, perRow, true);
        }
        return body + text(cx + p / 2, base + 17, num, { size: 12, cls: c.highlight ? 'mono' : 'mono muted', weight: c.highlight ? 700 : 400, anchor: 'middle', where: 'chapter number' });
      };
      const box = { x: cx, y: top - 16, w: p, h: plotH + 38 };
      out.push(c.href ? hits.mark(() => draw(''), nameOf(c), box, { href: c.href }) : draw(tip(nameOf(c))));
    }
    out.push(`<line class="axis" x1="${L}" y1="${r1(base)}" x2="${W - L}" y2="${r1(base)}"/>`);
    bottom = base + 17;
  } else {
    // Vertical: part headings, then one row per chapter.
    const maxV = Math.max(1, ...all.map(({ c }) => valueOf(c)));
    let y = 0;
    parts.forEach((part, pi) => {
      for (const line of wrapText(part.label, W - 2 * L, 12.5, 'mono', 2, 'part label')) {
        y += 18;
        out.push(text(L, y, line, { size: 12.5, cls: 'mono muted', where: 'part label' }));
      }
      y += 4;
      for (const c of part.chapters) {
        const lines = wrapText(`${numOf(c)} ${c.label}`, W - 2 * L, 12.5, 'body', 2, 'chapter label');
        const rowTop = y;
        const draw = (inner: string) => {
          const els = lines.map((line, i) => text(L, rowTop + 15 + i * 16, line, { size: 12.5, weight: c.highlight ? 700 : 400, where: 'chapter label' }));
          const by = rowTop + 21 + (lines.length - 1) * 16;
          if (encoding === 'bars') {
            const v = fmt(valueOf(c));
            const room = W - 2 * L - textWidth(v, 12.5, 'mono') - 8;
            const bw = Math.max(1, (valueOf(c) / maxV) * room);
            els.push(`<rect x="${L}" y="${r1(by)}" width="${r1(bw)}" height="8" class="mk ${tint(pi, c)}"${inner ? `>${inner}</rect>` : '/>'}`);
            els.push(text(L + bw + 6, by + 8, v, { size: 12.5, cls: 'num', where: 'chapter value' }));
          } else {
            const perRow = Math.floor((W - 2 * L) / 10);
            const n = countOf(c);
            els.push(`<rect x="${L}" y="${r1(by - 2)}" width="${W - 2 * L}" height="${r1(Math.max(1, Math.ceil(n / perRow)) * 10 + 2)}" class="sp-col"${inner ? `>${inner}</rect>` : '/>'}`);
            els.push(dots(pi, c, L + 5, by + 4, perRow, false));
          }
          return els.join('');
        };
        const dotRows = encoding === 'dots' ? Math.max(1, Math.ceil(countOf(c) / Math.floor((W - 2 * L) / 10))) : 1;
        const h = 21 + (lines.length - 1) * 16 + (encoding === 'bars' ? 8 : dotRows * 10) + 8;
        const box = { x: L, y: rowTop, w: W - 2 * L, h };
        out.push(c.href ? hits.mark(() => draw(''), nameOf(c), box, { href: c.href }) : draw(tip(nameOf(c))));
        y += h;
      }
      y += 6;
    });
    bottom = y - 6;
  }
  if (encoding === 'dots' && kinds.length) {
    const lg = legend(
      kinds.map((k) => ({ label: k.label, shape: k.shape, state: k.state })),
      L,
      bottom + 26,
      W - L,
      marks,
    );
    out.push(...lg.els);
    bottom = lg.bottom;
  }

  const hi = all.some(({ c }) => c.highlight);
  const cap = input.unit.charAt(0).toUpperCase() + input.unit.slice(1);
  const columns = [
    input.partHeader ?? sw.part,
    input.chapterHeader ?? sw.chapter,
    ...(encoding === 'bars' ? [input.valueHeader ?? cap] : encoding === 'dots' ? [...kinds.map((k) => k.label), w.total] : []),
    ...(hi ? [w.highlighted] : []),
  ];
  const rows: Cell[][] = all.map(({ c, pi }) => [
    parts[pi].label,
    `${numOf(c)} ${c.label}`,
    ...(encoding === 'bars'
      ? [c.value!]
      : encoding === 'dots'
        ? [...kinds.map((k) => (c.marks ?? []).filter((m) => m.label === k.label).reduce((s, m) => s + m.count, 0)), countOf(c)]
        : []),
    ...(hi ? [c.highlight ? w.yes : w.no] : []),
  ]);
  const { svg, height } = assemble({
    base: input,
    width: W,
    bottom,
    body: out,
    defs: marks.defs(),
    role: all.some(({ c }) => c.href) ? 'group' : 'img',
    cls: input.mini ? 'ch-spine ch-mini' : vertical ? 'ch-spine ch-list' : 'ch-spine',
  });
  return { svg, table: table(input.tableCaption ?? input.title, columns, rows), width: W, height };
}
