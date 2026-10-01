// sankey.ts: Flow, a Sankey (or alluvial) diagram of two or three columns,
// laid out at build time (design D1). Each node is a block whose height is
// proportional to max(inflow, outflow), with its label and count inside; the
// ribbons between consecutive columns are cubic bands whose thickness is the
// link value, drawn as fills at a fill-opacity with no text on them. A node
// takes its layer colour (and its ribbons too) only when it carries a tone:
// use a tone only when the column IS the stack layer.
//
// Layout, deterministic and without a library: nodes start in input order,
// then two barycentre sweeps (left to right, then back) reorder each column by
// the value-weighted mean rank of its neighbours, ties kept in input order
// (`order: 'input'` skips the sweeps, e.g. for layers L1 to L5). Node blocks
// are at least 24 high (a linked block is a full pointer target), 8 apart.
// A ribbon under 2 units keeps its geometry and is stroked 2 wide in its own
// colour (.sk-thin), so a one-row link never vanishes.
// Each node is one <g>: a source node's group holds its outgoing ribbons, so
// CSS (:hover, :focus-within, no script) lights one node's flows and dims the
// rest. More than nine nodes in a column throws, naming the column: the caller
// groups the tail as "Other (N)".
//
// Narrow ('narrow', 280 wide by default, and whenever the width is under
// 480): no ribbons, since a Sankey does not read at 280. One list per stage,
// each source node heading the bars of its destinations, text at 12.5 or
// more; a linked heading or destination row is one full-width target 26 or
// more high (WCAG 2.5.8 on a 320 phone). Both layouts return the same table: From | To | value, one row per
// link, stage by stage in the drawn order.
import {
  NARROW_WIDTH,
  assemble,
  fitText,
  fmt,
  hitRect,
  linkText,
  markClass,
  nonEmpty,
  r1,
  table,
  targets,
  text,
  textWidth,
  tip,
  words,
  wrapText,
  type ChartBase,
  type ChartOutput,
  type Tone,
} from './core';

export interface SankeyColumn {
  key: string;
  /** Printed over the column (wide) or in the stage heading (narrow). */
  label: string;
}

export interface SankeyNode {
  /** Unique across the chart. */
  id: string;
  /** Key of its column. */
  column: string;
  /** Drawn label: one line inside the block (throws when it does not fit). */
  label: string;
  /** Full name for the table and tooltips (default: the label). */
  name?: string;
  /** Stack layer of the node and its outgoing ribbons (only when the column is the layer). */
  tone?: Tone;
  href?: string;
}

export interface SankeyLink {
  /** Node ids; `to` sits in the column right after `from`'s. */
  from: string;
  to: string;
  /** A positive count; one link per pair. */
  value: number;
}

export interface SankeyInput extends ChartBase {
  /** Two or three columns, left to right. */
  columns: SankeyColumn[];
  /** At most nine per column (FLOW_MAX_NODES). */
  nodes: SankeyNode[];
  links: SankeyLink[];
  /** Plural noun of a value ("pairs") and its singular ("pair"). */
  unit: string;
  unitOne?: string;
  /** 'wide' (default from 480 wide) or 'narrow' (default under 480). */
  layout?: 'wide' | 'narrow';
  /** 'barycentre' (default: fewer crossings) or 'input' (keep the input order). */
  order?: 'barycentre' | 'input';
  /** Wide only: height of the node area (default max(200, 44 per node of the tallest column)). */
  plotHeight?: number;
  /** Narrow only: how a linked destination row is named. 'full' (default):
   *  as its wide ribbon, "Source name to Destination name: 3 units". 'short':
   *  as printed under its source as printed, "Source label to Destination
   *  label: 3" (a label cut with an ellipsis gives way to the full name), for
   *  a chart whose full names do not fit the 12 KB budget. */
  rowNames?: 'full' | 'short';
  /** Table headings (default From, To and the unit). */
  fromHeader?: string;
  toHeader?: string;
  valueHeader?: string;
}

/** A column holding more nodes than this throws. */
export const FLOW_MAX_NODES = 9;

const FLOW_WORDS = {
  en: { from: 'From', to: 'To' },
  es: { from: 'Origen', to: 'Destino' },
};

const L = 12;
const MIN_H = 24;
const GAP = 8;
const SPAN_MIN = 64;
const MIN_RIBBON = 2;
/** Height of a linked block in the narrow list: 24 px at a 320 phone's 0.98. */
const NARROW_TARGET = 26;

interface Placed {
  node: SankeyNode;
  col: number;
  x: number;
  y: number;
  h: number;
  inSum: number;
  outSum: number;
}

export function flow(input: SankeyInput): ChartOutput {
  const where = `flow ${input.id}`;
  const { columns, nodes, links } = input;
  if (columns.length < 2 || columns.length > 3) throw new Error(`charts(${where}): a flow has two or three columns, not ${columns.length}`);
  if (new Set(columns.map((c) => c.key)).size !== columns.length) throw new Error(`charts(${where}): column keys must differ`);
  nonEmpty(links, 'links', where);
  const colOf = new Map(columns.map((c, i) => [c.key, i]));
  const byId = new Map<string, SankeyNode>();
  const inputIdx = new Map<string, number>();
  nodes.forEach((n, i) => {
    if (byId.has(n.id)) throw new Error(`charts(${where}): node id "${n.id}" appears twice`);
    if (!colOf.has(n.column)) throw new Error(`charts(${where}): node "${n.label}" names unknown column "${n.column}"`);
    byId.set(n.id, n);
    inputIdx.set(n.id, i);
  });
  const byCol: SankeyNode[][] = columns.map((c) => nodes.filter((n) => n.column === c.key));
  byCol.forEach((list, c) => {
    if (list.length > FLOW_MAX_NODES) {
      throw new Error(
        `charts(${where}): column "${columns[c].label}" has ${list.length} nodes, at most ${FLOW_MAX_NODES} fit; group the rest as "Other (N)"`,
      );
    }
  });
  const pairs = new Set<string>();
  const inSum = new Map<string, number>();
  const outSum = new Map<string, number>();
  for (const l of links) {
    const a = byId.get(l.from);
    const b = byId.get(l.to);
    if (!a || !b) throw new Error(`charts(${where}): link "${l.from}" to "${l.to}" names an unknown node`);
    if (colOf.get(b.column) !== colOf.get(a.column)! + 1) {
      throw new Error(`charts(${where}): link "${a.label}" to "${b.label}" must run to the next column`);
    }
    if (!Number.isFinite(l.value) || l.value <= 0) throw new Error(`charts(${where}): link "${a.label}" to "${b.label}" has value ${l.value}; values are positive`);
    const key = `${l.from}\u0000${l.to}`;
    if (pairs.has(key)) throw new Error(`charts(${where}): link "${a.label}" to "${b.label}" appears twice`);
    pairs.add(key);
    outSum.set(l.from, (outSum.get(l.from) ?? 0) + l.value);
    inSum.set(l.to, (inSum.get(l.to) ?? 0) + l.value);
  }
  for (const n of nodes) {
    if (!inSum.has(n.id) && !outSum.has(n.id)) throw new Error(`charts(${where}): node "${n.label}" has no links; drop it`);
  }

  // Order: input order, then two barycentre sweeps.
  if ((input.order ?? 'barycentre') === 'barycentre') {
    const rank = new Map<string, number>();
    const setRanks = (c: number) => byCol[c].forEach((n, i) => rank.set(n.id, i));
    byCol.forEach((_, c) => setRanks(c));
    const sweep = (c: number, ref: number) => {
      const centre = (n: SankeyNode) => {
        let sum = 0;
        let weight = 0;
        for (const l of links) {
          const other = ref < c ? (l.to === n.id ? l.from : null) : l.from === n.id ? l.to : null;
          if (other === null) continue;
          sum += rank.get(other)! * l.value;
          weight += l.value;
        }
        return weight ? sum / weight : rank.get(n.id)!;
      };
      byCol[c] = byCol[c]
        .map((n) => ({ n, b: centre(n) }))
        .sort((p, q) => p.b - q.b || inputIdx.get(p.n.id)! - inputIdx.get(q.n.id)!)
        .map((p) => p.n);
      setRanks(c);
    };
    for (let c = 1; c < columns.length; c++) sweep(c, c - 1);
    for (let c = columns.length - 2; c >= 0; c--) sweep(c, c + 1);
  }
  const pos = new Map<string, number>();
  byCol.forEach((list) => list.forEach((n, i) => pos.set(n.id, i)));
  const colIdx = (id: string) => colOf.get(byId.get(id)!.column)!;
  // Links in drawn order: stage, then source, then target position.
  const ordered = [...links].sort(
    (a, b) => colIdx(a.from) - colIdx(b.from) || pos.get(a.from)! - pos.get(b.from)! || pos.get(a.to)! - pos.get(b.to)!,
  );

  const w = words(input.lang);
  const fw = FLOW_WORDS[input.lang === 'es' ? 'es' : 'en'];
  const unitOf = (v: number) => (v === 1 && input.unitOne ? input.unitOne : input.unit);
  const nameOf = (n: SankeyNode) => n.name ?? n.label;
  /** The drawn label, unless it was cut with an ellipsis. */
  const shortOf = (n: SankeyNode) => (n.label.includes('…') ? nameOf(n) : n.label);
  const narrow = (input.layout ?? ((input.width ?? 640) < 480 ? 'narrow' : 'wide')) === 'narrow';
  const W = input.width ?? (narrow ? NARROW_WIDTH : 640);
  const hits = targets(where);
  const out: string[] = [];
  let bottom: number;

  if (!narrow) {
    // Block widths: each column fits its widest "label count", within an
    // equal share of the width that leaves every ribbon span 64 or more.
    const n = columns.length;
    const share = (W - 2 * L - (n - 1) * SPAN_MIN) / n;
    const countOf = (node: SankeyNode) => fmt(Math.max(inSum.get(node.id) ?? 0, outSum.get(node.id) ?? 0));
    const bw = byCol.map((list) =>
      Math.ceil(
        Math.max(
          ...list.map((node) => {
            const cw = textWidth(countOf(node), 12, 'mono');
            fitText(node.label, share - 24 - cw, 13, 'body', 'node label');
            return textWidth(node.label, 13) + cw + 24;
          }),
        ),
      ),
    );
    const span = (W - 2 * L - bw.reduce((s, x) => s + x, 0)) / (n - 1);
    const xs: number[] = [];
    bw.forEach((_, c) => xs.push(c ? xs[c - 1] + bw[c - 1] + span : L));
    columns.forEach((col, c) => {
      const room = c < n - 1 ? bw[c] + span - 8 : W - L - xs[c];
      fitText(col.label, room, 12, 'mono', 'column label');
      out.push(text(xs[c], 16, col.label, { size: 12, cls: 'mono muted', where: 'column label' }));
    });

    // Scale: the largest k (px per unit) for which every column, with blocks
    // at least MIN_H high, fits the plot height. Bisection: deterministic.
    const maxN = Math.max(...byCol.map((l) => l.length));
    const plotH = input.plotHeight ?? Math.max(200, 44 * maxN);
    const size = (id: string) => Math.max(inSum.get(id) ?? 0, outSum.get(id) ?? 0);
    const colH = (c: number, k: number) => byCol[c].reduce((s, node) => s + Math.max(MIN_H, size(node.id) * k), 0) + GAP * (byCol[c].length - 1);
    const fits = (k: number) => byCol.every((_, c) => colH(c, k) <= plotH);
    if (!fits(0)) throw new Error(`charts(${where}): plotHeight ${plotH} cannot hold ${maxN} nodes of ${MIN_H}px; raise it`);
    let lo = 0;
    let hi = plotH / Math.min(...nodes.map((node) => size(node.id)));
    for (let i = 0; i < 60; i++) {
      const mid = (lo + hi) / 2;
      if (fits(mid)) lo = mid;
      else hi = mid;
    }
    const k = lo;
    const top = 28;
    const placed = new Map<string, Placed>();
    byCol.forEach((list, c) => {
      let y = top + (plotH - colH(c, k)) / 2;
      for (const node of list) {
        const h = Math.max(MIN_H, size(node.id) * k);
        placed.set(node.id, { node, col: c, x: xs[c], y, h, inSum: inSum.get(node.id) ?? 0, outSum: outSum.get(node.id) ?? 0 });
        y += h + GAP;
      }
    });
    // Ribbon ends: stacked in drawn order, centred on the block.
    const outAt = new Map<string, number>();
    const inAt = new Map<string, number>();
    for (const p of placed.values()) {
      outAt.set(p.node.id, p.y + (p.h - p.outSum * k) / 2);
      inAt.set(p.node.id, p.y + (p.h - p.inSum * k) / 2);
    }
    const ribbons = new Map<string, string[]>();
    for (const l of ordered) {
      const a = placed.get(l.from)!;
      const b = placed.get(l.to)!;
      const t = l.value * k;
      const ya = outAt.get(l.from)!;
      const yb = inAt.get(l.to)!;
      outAt.set(l.from, ya + t);
      inAt.set(l.to, yb + t);
      const x0 = r1(a.x + bw[a.col]);
      const x1 = r1(b.x);
      const xm = r1((x0 + x1) / 2);
      const d =
        `M${x0} ${r1(ya)}C${xm} ${r1(ya)} ${xm} ${r1(yb)} ${x1} ${r1(yb)}V${r1(yb + t)}` +
        `C${xm} ${r1(yb + t)} ${xm} ${r1(ya + t)} ${x0} ${r1(ya + t)}Z`;
      const list = ribbons.get(l.from) ?? [];
      // Under 2 units a ribbon keeps its exact thickness (the sums hold) and
      // .sk-thin strokes it 2 wide in its colour, so it shows at 2 or more.
      const thin = t < MIN_RIBBON ? ' class="sk-thin"' : '';
      list.push(`<path d="${d}"${thin}>${tip(`${nameOf(a.node)} ${w.to} ${nameOf(b.node)}: ${fmt(l.value)} ${unitOf(l.value)}`)}</path>`);
      ribbons.set(l.from, list);
    }
    byCol.forEach((list) => {
      for (const node of list) {
        const p = placed.get(node.id)!;
        const tone = node.tone ?? 0;
        const count = countOf(node);
        const total = Math.max(p.inSum, p.outSum);
        const name = `${nameOf(node)}: ${count} ${unitOf(total)}`;
        const cls = tone ? `sk-node l${tone}-bg l${tone}-st` : 'panel';
        const b = bw[p.col];
        const ty = p.y + p.h / 2 + 4.5;
        const draw = (inner: string) =>
          `<rect x="${r1(p.x)}" y="${r1(p.y)}" width="${b}" height="${r1(p.h)}" class="${cls}"${inner ? `>${inner}</rect>` : '/>'}` +
          text(p.x + 8, ty, node.label, { size: 13, where: 'node label' }) +
          text(p.x + b - 8, ty, count, { size: 12, cls: 'num', anchor: 'end', where: 'node count' });
        const mark = node.href
          ? hits.mark(() => draw(''), name, { x: p.x, y: p.y, w: b, h: p.h }, { href: node.href })
          : draw(tip(name));
        const own = ribbons.get(node.id);
        out.push(own ? `<g class="sk-g sk-${tone}">${own.join('')}${mark}</g>` : `<g>${mark}</g>`);
      }
    });
    bottom = top + plotH;
  } else {
    // One list per stage: each source heads the bars of its destinations.
    const maxV = Math.max(...links.map((l) => l.value));
    const barX = L + 12;
    const barW = W - L - barX;
    let y = 4;
    for (let s = 0; s < columns.length - 1; s++) {
      const head = `${columns[s].label} ${w.to} ${columns[s + 1].label}`;
      for (const line of wrapText(head, W - 2 * L, 12.5, 'mono', 2, 'stage heading')) {
        y += 17;
        out.push(text(L, y, line, { size: 12.5, cls: 'mono muted', where: 'stage heading' }));
      }
      y += 4;
      for (const src of byCol[s]) {
        const own = ordered.filter((l) => l.from === src.id);
        if (!own.length) continue;
        const total = own.reduce((sum, l) => sum + l.value, 0);
        const tone = src.tone ?? 0;
        const tx = tone ? L + 16 : L;
        const lines = wrapText(`${src.label} (${fmt(total)})`, W - L - tx, 13.5, 'body', 2, 'node label');
        y += 4;
        // The source heading and each destination row are separate blocks,
        // each 26 high or more; a linked one is a single target that high and
        // the full width, so neighbours keep the 24 px of WCAG 2.5.8.
        const headH = Math.max(NARROW_TARGET, 9 + lines.length * 17);
        if (tone) out.push(`<rect x="${L}" y="${r1(y + 9)}" width="10" height="10" rx="2" class="${markClass('filled', tone)}"/>`);
        const els = lines.map((line, i) => text(tx, y + 18 + i * 17, line, { size: 13.5, weight: 600, where: 'node label' }));
        // Linked heading and rows are named with the full node names: the
        // heading "Source name (12)", each row as its wide ribbon is,
        // "Source name to Destination name: 3 units", since one destination
        // repeats under several sources ('short' rowNames: as printed).
        out.push(src.href ? linkText(hitRect(y, headH) + els.join(''), `${nameOf(src)} (${fmt(total)})`, src.href) : els.join(''));
        y += headH;
        for (const l of own) {
          const dst = byId.get(l.to)!;
          const rows = wrapText(`${dst.label}: ${fmt(l.value)}`, barW, 12.5, 'body', 2, 'destination label');
          const rowH = 16 + rows.length * 16;
          const bw = Math.max(1, (l.value / maxV) * barW);
          const els2 =
            rows.map((line, i) => text(barX, y + 14 + i * 16, line, { size: 12.5, where: 'destination label' })).join('') +
            `<rect x="${barX}" y="${r1(y + 4 + rows.length * 16)}" width="${r1(bw)}" height="6" class="${markClass('filled', dst.tone ?? 0)}"/>`;
          const rowName =
            input.rowNames === 'short'
              ? `${shortOf(src)} ${w.to} ${shortOf(dst)}: ${fmt(l.value)}`
              : `${nameOf(src)} ${w.to} ${nameOf(dst)}: ${fmt(l.value)} ${unitOf(l.value)}`;
          out.push(dst.href ? linkText(hitRect(y, rowH) + els2, rowName, dst.href) : els2);
          y += rowH;
        }
      }
      y += 10;
    }
    bottom = y - 10;
  }

  const { svg, height } = assemble({
    base: input,
    width: W,
    bottom,
    body: out,
    role: nodes.some((n) => n.href) ? 'group' : 'img',
    cls: narrow ? 'ch-sankey ch-list' : 'ch-sankey',
  });
  const cap = input.unit.charAt(0).toUpperCase() + input.unit.slice(1);
  return {
    svg,
    table: table(
      input.tableCaption ?? input.title,
      [input.fromHeader ?? fw.from, input.toHeader ?? fw.to, input.valueHeader ?? cap],
      ordered.map((l) => [nameOf(byId.get(l.from)!), nameOf(byId.get(l.to)!), l.value]),
    ),
    width: W,
    height,
  };
}
