// radial.ts: RelationRadial, an ego network. The item sits at the centre as a
// solid-ink box; its relations are grouped by family (patterns, obligations,
// controls, cases, framework clauses, terms: at most six families), each
// family a sector headed by its name and count. An edge runs from the centre
// to every node: solid for a core (direct) relation, dashed for a related
// (partial) one, and the node repeats it (filled or outlined), so strength
// never rests on the line alone. Nodes take their layer colour only in a
// layered family (patterns); elsewhere they are ink.
//
// Layout (deterministic: fixed sides, items sorted core first, then by label
// in code-unit order, never by locale): 'radial' (wide, 640 by default) puts
// the sectors in two columns either side of the centre, each family on the
// side with fewer rows so far (ties to the right), one node per 24 px row, so
// linked nodes keep the WCAG 2.5.8 spacing and labels never collide; 'list'
// (narrow, NARROW_WIDTH by default and whenever the width is under 480) stacks the
// sectors under the centre as branches off one spine, text at 1:1 on a phone.
// Node labels are one line and throw, naming the label, when they do not fit.
// A family draws at most `maxPerFamily` nodes (default 6) and a "+N more"
// line; the table lists every relation: Family | Item | Relation.
//
// Fewer than three relations draw nothing: relationRadial returns null and the
// page keeps its lists (spec per-item-visuals, "Pocas relaciones").
// No runtime imports.
import {
  assemble,
  fitText,
  markStyles,
  minText,
  r1,
  table,
  targets,
  text,
  textWidth,
  tip,
  wrapText,
  type ChartBase,
  type ChartOutput,
  type Tone,
} from './core';

export type RelationStrength = 'core' | 'related';

export interface RelationItem {
  /** Drawn label: one short line (throws when it does not fit). */
  label: string;
  /** Full name for the table and the node's <title> (default: the label). */
  name?: string;
  href?: string;
  /** 'core' (default: solid edge, filled node) or 'related' (dashed, outlined). */
  strength?: RelationStrength;
  /** Stack layer of the node; only in a family with `layered: true`. */
  tone?: Tone;
}

export interface RelationFamily {
  /** The family's name, printed over its sector ("Patterns"). */
  label: string;
  /** Nodes take their layer colour (patterns); otherwise every node is ink. */
  layered?: boolean;
  items: RelationItem[];
  /** Words for the two strengths in this family's table rows and titles
   *  (IMDA fit: { core: 'Direct', related: 'Partial' }). */
  relationLabels?: { core: string; related: string };
}

export interface RelationRadialInput extends ChartBase {
  /** The item the page is about; `label` wraps to at most three lines. */
  centre: { label: string };
  /** At most six families, in the order the page lists them; empty ones are skipped. */
  families: RelationFamily[];
  /** Default words for the two strengths (Core, Related). */
  relationLabels?: { core: string; related: string };
  /** Nodes drawn per family before a "+N more" line (default 6). */
  maxPerFamily?: number;
  /** 'radial' (default from 480 wide) or 'list' (default under 480). */
  layout?: 'radial' | 'list';
}

/** Below this many relations relationRadial returns null. */
export const RADIAL_MIN_RELATIONS = 3;

const RADIAL_WORDS = {
  en: { family: 'Family', item: 'Item', relation: 'Relation', core: 'Core', related: 'Related', more: 'more' },
  es: { family: 'Familia', item: 'Elemento', relation: 'Relación', core: 'Principal', related: 'Relacionada', more: 'más' },
};

const L = 12;
const PITCH = 24;
const HEAD = 22;
const FAMILY_GAP = 10;
/** Code-unit order, so the layout never depends on the build machine's locale. */
const byCode = (a: string, b: string) => (a < b ? -1 : a > b ? 1 : 0);
/** Radial layout: the edge span from the centre box to the dots. */
const SPAN = 48;
/** List layout: the dots' x from the left margin. */
const LIST_DOT = 40;

/** Width of the radial centre box: it fits the label's longest word (an id
 *  such as AIGE-CTL-AR-012), between 132 and 200. */
const centreBoxW = (label: string): number =>
  Math.round(Math.min(200, Math.max(132, Math.max(...label.split(/\s+/).map((word) => textWidth(word, 13.5))) + 20)));

/** The room a node label gets in a relationRadial of this width, layout and
 *  centre label: callers that shorten labels to fit cut them to it (a longer
 *  one throws). */
export function radialLabelWidth(width: number, layout: 'radial' | 'list', centre: string): number {
  if (layout === 'list') return width - L - (L + LIST_DOT + 10);
  return width / 2 - centreBoxW(centre) / 2 - SPAN - 10 - L;
}

/**
 * The ego network of one item, or null when it has fewer than three
 * relations (callers then keep their lists only).
 */
export function relationRadial(input: RelationRadialInput): ChartOutput | null {
  const where = `relationRadial ${input.id}`;
  if (input.families.length > 6) throw new Error(`charts(${where}): ${input.families.length} families, at most 6 fit`);
  const total = input.families.reduce((s, f) => s + f.items.length, 0);
  if (total < RADIAL_MIN_RELATIONS) return null;
  for (const f of input.families) {
    if (!f.layered && f.items.some((i) => i.tone)) {
      throw new Error(`charts(${where}): family "${f.label}" is not layered, so its nodes take no layer tone`);
    }
  }
  const W = input.width ?? 640;
  const list = (input.layout ?? (W < 480 ? 'list' : 'radial')) === 'list';
  const lw = RADIAL_WORDS[input.lang === 'es' ? 'es' : 'en'];
  const max = input.maxPerFamily ?? 6;
  const marks = markStyles(input.id);
  const hits = targets(where);
  const families = input.families
    .filter((f) => f.items.length)
    .map((f) => {
      const words = { ...lw, ...input.relationLabels, ...f.relationLabels };
      const items = [...f.items].sort(
        (a, b) => (a.strength === 'related' ? 1 : 0) - (b.strength === 'related' ? 1 : 0) || byCode(a.label, b.label),
      );
      const shown = items.slice(0, max);
      return { f, words, items, shown, extra: items.length - shown.length };
    });
  type Fam = (typeof families)[number];
  // Only the edge styles drawn: items hidden behind "+N more" draw no edge.
  const strengths = new Set(families.flatMap((x) => x.shown.map((i) => i.strength ?? 'core')));
  const out: string[] = [];
  const solid: string[] = [];
  const dashed: string[] = [];

  // Legend: the two edge styles, only those drawn.
  let y = 6;
  let lx = L;
  for (const s of ['core', 'related'] as const) {
    if (!strengths.has(s)) continue;
    const word = s === 'core' ? (input.relationLabels?.core ?? lw.core) : (input.relationLabels?.related ?? lw.related);
    (s === 'core' ? solid : dashed).push(`M${lx} ${y + 10}h18`);
    out.push(`<circle cx="${lx + 24}" cy="${y + 10}" r="4.5" ${marks.attrs(s === 'core' ? 'filled' : 'outline', 0)}/>`);
    out.push(text(lx + 34, y + 14.5, word, { size: 12.5, where: 'legend' }));
    lx += 34 + textWidth(word, 12.5) + 18;
  }
  y += 30;

  const rowsOf = (x: Fam) => x.shown.length + (x.extra > 0 ? 1 : 0);
  const node = (x: Fam, item: RelationItem, dotX: number, cy: number, labelX: number, anchor: 'start' | 'end', labelW: number) => {
    const core = item.strength !== 'related';
    fitText(item.label, labelW, 13, 'body', 'node label');
    const tone = x.f.layered ? (item.tone ?? 0) : 0;
    const tw = textWidth(item.label, 13);
    const name = `${item.name ?? item.label} · ${core ? x.words.core : x.words.related}`;
    const draw = (inner: string) =>
      `<circle cx="${r1(dotX)}" cy="${r1(cy)}" r="5.5" ${marks.attrs(core ? 'filled' : 'outline', tone)}${inner ? `>${inner}</circle>` : '/>'}` +
      text(labelX, cy + 4.5, item.label, { size: 13, anchor, where: 'node label' });
    const x0 = anchor === 'start' ? dotX - 6 : labelX - tw;
    const w = anchor === 'start' ? labelX + tw - x0 : dotX + 6 - x0;
    const box = { x: x0, y: cy - PITCH / 2, w: Math.max(w, PITCH), h: PITCH };
    if (item.href) return hits.mark(() => draw(''), name, box, { href: item.href });
    return draw(tip(name));
  };
  const edge = (item: RelationItem, x1: number, y1: number, x2: number, y2: number) => {
    (item.strength === 'related' ? dashed : solid).push(`M${r1(x1)} ${r1(y1)}L${r1(x2)} ${r1(y2)}`);
  };
  const more = (x: Fam, tx: number, cy: number, anchor: 'start' | 'end') =>
    text(tx, cy + 4.5, `+${x.extra} ${lw.more}`, { size: 12.5, cls: 'ink2', anchor, where: 'more' });

  let bottom: number;
  if (!list) {
    // Two columns of sectors either side of the centre box.
    // The centre box fits its longest word (an id such as AIGE-CTL-AR-012),
    // between 132 and 200 wide; the label columns take the rest.
    const boxW = centreBoxW(input.centre.label);
    const cx = W / 2;
    const dotR = cx + boxW / 2 + SPAN;
    const dotL = cx - boxW / 2 - SPAN;
    const labelW = dotL - 10 - L;
    if (labelW < 100) throw new Error(`charts(${where}): width ${W} leaves ${Math.floor(labelW)}px per label column; use layout 'list'`);
    const sides: { fams: Fam[]; rows: number }[] = [
      { fams: [], rows: 0 },
      { fams: [], rows: 0 },
    ];
    for (const x of families) {
      const side = sides[1].rows < sides[0].rows ? 1 : 0; // 0 = right, 1 = left
      sides[side].fams.push(x);
      sides[side].rows += rowsOf(x);
    }
    const heightOf = (fams: Fam[]) => fams.reduce((s, x) => s + HEAD + rowsOf(x) * PITCH, 0) + Math.max(0, fams.length - 1) * FAMILY_GAP;
    const lines = wrapText(input.centre.label, boxW - 16, 13.5, 'body', 3, 'centre label');
    const boxH = lines.length * 17 + 16;
    const H = Math.max(boxH, ...sides.map((s) => heightOf(s.fams)));
    const cy = y + H / 2;
    sides.forEach((side, s) => {
      const right = s === 0;
      const dotX = right ? dotR : dotL;
      const anchor = right ? 'start' : 'end';
      const labelX = right ? dotX + 10 : dotX - 10;
      const fromX = right ? cx + boxW / 2 : cx - boxW / 2;
      let ty = y + (H - heightOf(side.fams)) / 2;
      side.fams.forEach((x, i) => {
        if (i) ty += FAMILY_GAP;
        const head = `${x.f.label} (${x.items.length})`;
        fitText(head, labelW + 16, minText(W), 'mono', 'family label');
        out.push(text(right ? dotX - 6 : dotX + 6, ty + 15, head, { size: minText(W), cls: 'mono muted', anchor, where: 'family label' }));
        ty += HEAD;
        for (const item of x.shown) {
          const ny = ty + PITCH / 2;
          out.push(node(x, item, dotX, ny, labelX, anchor, labelW));
          edge(item, fromX, cy, dotX + (right ? -5.5 : 5.5), ny);
          ty += PITCH;
        }
        if (x.extra > 0) {
          out.push(more(x, labelX, ty + PITCH / 2, anchor));
          ty += PITCH;
        }
      });
    });
    const by = cy - boxH / 2;
    out.push(`<rect x="${r1(cx - boxW / 2)}" y="${r1(by)}" width="${boxW}" height="${r1(boxH)}" rx="8" class="mk mk-hi"/>`);
    lines.forEach((line, i) =>
      out.push(text(cx, by + 8 + 13 + i * 17, line, { size: 13.5, weight: 600, cls: 'on-ink', anchor: 'middle', where: 'centre label' })),
    );
    bottom = y + H;
  } else {
    // The centre on top, then each family as branches off one spine.
    const lines = wrapText(input.centre.label, W - 2 * L - 16, 13.5, 'body', 3, 'centre label');
    const boxH = lines.length * 17 + 16;
    out.push(`<rect x="${L}" y="${r1(y)}" width="${W - 2 * L}" height="${r1(boxH)}" rx="8" class="mk mk-hi"/>`);
    lines.forEach((line, i) => out.push(text(L + 8, y + 8 + 13 + i * 17, line, { size: 13.5, weight: 600, cls: 'on-ink', where: 'centre label' })));
    const spineX = L + 10;
    const dotX = L + LIST_DOT;
    const labelX = dotX + 10;
    const labelW = W - L - labelX;
    let ty = y + boxH + 6;
    let last = ty;
    families.forEach((x, i) => {
      if (i) ty += FAMILY_GAP;
      const head = `${x.f.label} (${x.items.length})`;
      fitText(head, W - L - (spineX + 14), minText(W), 'mono', 'family label');
      out.push(text(spineX + 14, ty + 15, head, { size: minText(W), cls: 'mono muted', where: 'family label' }));
      ty += HEAD;
      for (const item of x.shown) {
        const ny = ty + PITCH / 2;
        out.push(node(x, item, dotX, ny, labelX, 'start', labelW));
        edge(item, spineX, ny, dotX - 5.5, ny);
        last = ny;
        ty += PITCH;
      }
      if (x.extra > 0) {
        out.push(more(x, labelX, ty + PITCH / 2, 'start'));
        ty += PITCH;
      }
    });
    solid.push(`M${spineX} ${r1(y + boxH)}V${r1(last)}`);
    bottom = ty;
  }
  const paths = [
    solid.length ? `<path class="edge" d="${solid.join('')}"/>` : '',
    dashed.length ? `<path class="edge edge-dash" d="${dashed.join('')}"/>` : '',
  ].join('');
  const rows = families.flatMap((x) => x.items.map((i) => [x.f.label, i.name ?? i.label, i.strength === 'related' ? x.words.related : x.words.core]));
  const { svg, height } = assemble({
    base: input,
    width: W,
    bottom,
    // Edges first, under the nodes and the centre box.
    body: [paths, ...out],
    defs: marks.defs(),
    role: families.some((x) => x.shown.some((i) => i.href)) ? 'group' : 'img',
    cls: list ? 'ch-radial ch-list' : 'ch-radial',
  });
  return {
    svg,
    table: table(input.tableCaption ?? input.title, [lw.family, lw.item, lw.relation], rows),
    width: W,
    height,
  };
}
