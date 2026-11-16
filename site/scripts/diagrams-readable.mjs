// diagrams-readable: the column-first inline SVG for every archify diagram.
//
// Archify bakes labels at 7 to 12 units into 900 to 1300 unit canvases, so in
// the ~44rem reading column they render well under 12px. This lays the same
// nodes and edges out on a narrow grid (rows are stages, time steps or levels;
// columns are lanes) with every label at >= MIN_FONT units, and declares a
// min width (--min-w) at which the smallest label is exactly 12px; below it the
// figure frame scrolls (src/styles/diagrams.css). The standalone viewer
// (public/diagrams/<id>.html) still comes from archify.
//
// Font sizes live in diagrams.css (classes t1/t2/t3/h/el/gl); FS below must
// match it. Text is measured with a per-glyph advance table for the site
// fonts, so the build fails when a label would overflow its node
// (checkLayout) without needing a browser.

export const MIN_FONT = 13;
const FS = { t1: 14.5, t2: 13, mono: 13 }; // keep in step with diagrams.css
const LH = { t1: 18, t2: 17, mono: 17 };
const PX = 12; // node inner padding, horizontal
const PY = 11; // node inner padding, vertical
const GAP_X = 28; // gutter between columns (room for a routed vertical)
const MAX_DIRECT = 200; // widest edge label a column gap may grow to hold
const TARGET_W = 716; // widest canvas whose 13-unit text is >= 12px in the 662px frame of a 704px column
const MIN_NW = 128;
const MAX_NW = 236;
const SW = 14; // layer swatch: 10px square + 4px gap
const CH_TOP = 22; // channel: node bottom to the first horizontal track
const CH_STEP = 10; // channel: distance between tracks
const CH_BOT = 22; // channel: last track to the next row (or its header)
const HEAD_H = 30; // row header band: text, hairline, gap
const GPAD = 6; // group frame padding around its nodes
const SAFETY = 1.05; // measured advances ignore kerning and hinting
const TRANSPOSE_COST = 20; // a third of an upward edge; no other diagram is within it

// Advance widths (1/1000 em) measured once in Chromium from
// public/fonts/instrument-sans-latin-wght-normal.woff2 at weights 400 and 600.
// JetBrains Mono is 600 for every glyph it carries.
const CHARS = ' !"#$%&\'()*+,-./0123456789:;<=>?@ABCDEFGHIJKLMNOPQRSTUVWXYZ[\\]^_`abcdefghijklmnopqrstuvwxyz{|}~';
const S400 = '204,273,384,716,608,786,755,232,406,406,408,531,255,506,255,443,666,391,545,574,600,574,599,532,582,610,255,255,531,531,531,567,853,728,636,741,752,638,602,765,736,254,455,692,588,906,736,786,656,787,656,608,648,712,728,1089,688,676,623,406,443,406,531,426,354,533,606,533,606,564,354,606,599,240,240,535,240,922,599,584,606,606,375,473,377,589,523,767,551,523,496,406,242,406,531';
const S600 = '209,295,449,727,637,786,768,256,439,439,430,544,275,493,275,444,677,387,557,579,615,581,615,561,598,619,275,275,544,544,544,580,867,733,645,747,755,630,594,764,725,254,427,712,589,898,725,794,667,806,664,637,664,704,733,1087,707,700,631,439,444,439,544,466,354,558,621,552,621,571,370,621,612,260,260,558,260,941,612,597,621,621,390,494,406,604,536,800,587,536,513,439,234,439,544';
const table = (csv) => new Map(csv.split(',').map((w, i) => [CHARS[i], Number(w)]));
const ADV = { t2: table(S400), t1: table(S600) };

// Width in SVG units. Glyphs outside the table (arrows, middle dot, dashes)
// count as a full em, which over-measures: the safe direction.
export function textWidth(s, font) {
  let em = 0;
  for (const c of String(s)) {
    if (font === 'mono') em += c.charCodeAt(0) < 0x2000 ? 0.6 : 1;
    else em += (ADV[font].get(c) ?? 1000) / 1000;
  }
  return em * FS[font] * SAFETY + 1;
}

// Greedy word wrap; null when a single word is wider than `width`.
function wrap(text, font, width) {
  const lines = [];
  let cur = '';
  for (const w of String(text).split(/\s+/).filter(Boolean)) {
    if (textWidth(w, font) > width) return null;
    const next = cur ? `${cur} ${w}` : w;
    if (cur && textWidth(next, font) > width) {
      lines.push(cur);
      cur = w;
    } else cur = next;
  }
  if (cur) lines.push(cur);
  return lines;
}

const esc = (s) => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
const r1 = (v) => Math.round(v * 10) / 10;
const layerOf = (...texts) => {
  for (const t of texts) {
    const m = /\bLayer 0?([1-5])\b/.exec(t ?? '');
    if (m) return Number(m[1]);
  }
  return 0;
};
const swatch = (x, y, l) => `<rect class="sw sw-l${l}" x="${r1(x)}" y="${r1(y)}" width="10" height="10" rx="2"/>`;
const EDGE_CLASS = { emphasis: 'e e-em', dashed: 'e e-d', return: 'e e-d', security: 'e e-s' };
const edgeClass = (v) => EDGE_CLASS[v] ?? 'e';
const marker = (v) => (v === 'emphasis' ? 'url(#ahe)' : 'url(#ah)');
const DEFS =
  '<defs><marker id="ah" markerWidth="9" markerHeight="7" refX="8.5" refY="3.5" orient="auto"><path d="M0 0L9 3.5L0 7Z" class="m"/></marker>' +
  '<marker id="ahe" markerWidth="9" markerHeight="7" refX="8.5" refY="3.5" orient="auto"><path d="M0 0L9 3.5L0 7Z" class="m m-em"/></marker></defs>';

const overlap = (a, b, pad = 0) =>
  a.x < b.x + b.w + pad && b.x < a.x + a.w + pad && a.y < b.y + b.h + pad && b.y < a.y + a.h + pad;

// ------------------------------------------------------------------ nodes --
// Lines of a node at width `w`, or null when a word does not fit.
function nodeText(n, w) {
  const inner = w - 2 * PX - (n.layer ? SW : 0);
  const label = wrap(n.label, 't1', inner);
  const sub = n.sub ? wrap(n.sub, 't2', inner) : [];
  const tag = n.tag ? wrap(n.tag, 'mono', inner) : [];
  if (!label || !sub || !tag || label.length > 3 || sub.length > 3 || tag.length > 2) return null;
  return { inner, label, sub, tag, h: PY * 2 + label.length * LH.t1 + sub.length * LH.t2 + tag.length * LH.mono - 3 };
}

function nodeSvg(n) {
  const out = [];
  let y = n.y + PY + 12;
  const x = n.x + PX;
  for (const l of n.text.label) { out.push(`<text class="t1" x="${r1(x)}" y="${r1(y)}">${esc(l)}</text>`); y += LH.t1; }
  y += 1;
  for (const l of n.text.sub) { out.push(`<text class="t2" x="${r1(x)}" y="${r1(y)}">${esc(l)}</text>`); y += LH.t2; }
  for (const l of n.text.tag) { out.push(`<text class="t3" x="${r1(x)}" y="${r1(y)}">${esc(l)}</text>`); y += LH.mono; }
  const sw = n.layer ? swatch(n.x + n.w - PX - 10, n.y + PY + 2, n.layer) : '';
  const aria = [n.label, n.sub].filter(Boolean).join(', ');
  return `<g data-node-id="${esc(n.id)}"${n.em ? ' class="em"' : ''} tabindex="0" role="button" aria-pressed="false" aria-label="${esc(aria)}"><rect class="n" x="${r1(n.x)}" y="${r1(n.y)}" width="${r1(n.w)}" height="${r1(n.h)}" rx="6"/>${sw}${out.join('')}</g>`;
}

// Header text (mono, muted) on a paper backing so edges pass behind it, with an
// optional layer swatch and accent number. Returns the markup and its box.
function headSvg(h, x, baseline) {
  const sw = h.layer ? swatch(x, baseline - 10, h.layer) : '';
  const tx = x + (h.layer ? SW : 0);
  const body = h.n ? `<tspan class="hn">${esc(h.n)}</tspan> / ${esc(h.text)}` : esc(h.text);
  const w = textWidth(h.n ? `${h.n} / ${h.text}` : h.text, 'mono') + (h.layer ? SW : 0);
  const box = { x: x - 3, y: baseline - 13, w: w + 6, h: 18 };
  return { svg: `<rect class="bk" x="${r1(box.x)}" y="${r1(box.y)}" width="${r1(box.w)}" height="${box.h}"/>${sw}<text class="h" x="${r1(tx)}" y="${r1(baseline)}">${body}</text>`, box };
}

// ------------------------------------------------------------------- grid --
// model: { title, rows:[{head?}], cols:[{head?}], nodes:[{id,label,sub,tag,r,c,em,layer}],
//          edges:[{id,from,to,label,variant}], groups:[{label,c0,c1,r0,r1}], fixed }
// head: { text, n?, layer? }
// Several nodes in one cell (archify stacks them inside a lane): split that
// row into as many sub-rows as its fullest cell needs, in authored order. The
// row header stays on the first sub-row; groups stretch over the sub-rows.
function uncollide(m) {
  const nR = m.rows.length;
  const count = {};
  const slot = new Map();
  for (const n of m.nodes) {
    const key = `${n.r},${n.c}`;
    slot.set(n, (count[key] = (count[key] ?? 0) + 1) - 1);
  }
  const k = Array.from({ length: nR }, (_, r) => Math.max(1, ...m.nodes.filter((n) => n.r === r).map((n) => slot.get(n) + 1)));
  if (k.every((v) => v === 1)) return m;
  const base = k.map((_, r) => sum(k.slice(0, r)));
  return {
    ...m,
    rows: m.rows.flatMap((row, r) => [row, ...Array.from({ length: k[r] - 1 }, () => ({}))]),
    nodes: m.nodes.map((n) => ({ ...n, r: base[n.r] + slot.get(n) })),
    groups: m.groups.map((g) => ({ ...g, r0: base[g.r0], r1: base[g.r1] + k[g.r1] - 1 })),
  };
}

function transpose(m) {
  return {
    ...m,
    rows: m.cols,
    cols: m.rows,
    nodes: m.nodes.map((n) => ({ ...n, r: n.c, c: n.r })),
    groups: m.groups.map((g) => ({ ...g, c0: g.r0, c1: g.r1, r0: g.c0, r1: g.c1 })),
  };
}

const sum = (a) => a.reduce((x, y) => x + y, 0);
const groupWidth = (g, cw, gaps) => sum(cw.slice(g.c0, g.c1 + 1)) + sum(gaps.slice(g.c0, g.c1)) - 2 * GPAD;
const directW = (e) => textWidth(e.label, 'mono') + 8;
// An edge between neighbours in one row runs straight across the gap when its
// label fits there; the gap widens to hold it.
const isDirect = (e, s, t) => s.r === t.r && Math.abs(s.c - t.c) === 1 && (!e.label || directW(e) <= MAX_DIRECT);

function gapWidths(m) {
  const gaps = Array.from({ length: Math.max(0, m.cols.length - 1) }, () => GAP_X);
  const byId = Object.fromEntries(m.nodes.map((nd) => [nd.id, nd]));
  for (const e of m.edges) {
    const s = byId[e.from];
    const t = byId[e.to];
    if (s && t && e.label && isDirect(e, s, t)) gaps[Math.min(s.c, t.c)] = Math.max(gaps[Math.min(s.c, t.c)], directW(e) + 20);
  }
  return gaps;
}
const twoLines = (lines) => lines !== null && lines.length <= 2;

// Per-column widths: each column is as narrow as its own nodes and header
// allow; slack up to TARGET_W is then shared out so short grids are not cramped.
function columnWidths(m, gaps) {
  const n = m.cols.length;
  const cw = m.cols.map((col, c) => {
    let w = MIN_NW;
    const fits = (x) =>
      m.nodes.every((nd) => nd.c !== c || nodeText(nd, x)) &&
      (!col.head || twoLines(wrap(col.head.text, 'mono', x - (col.head.layer ? SW : 0))));
    while (!fits(w) && w < MAX_NW) w += 4;
    if (!fits(w)) throw new Error(`diagrams-readable: "${m.title}": column ${c} does not fit at width ${MAX_NW}`);
    return w;
  });
  for (const g of m.groups) {
    while (!twoLines(wrap(g.label, 'mono', groupWidth(g, cw, gaps) - (headLayer(g.label) ? SW : 0)))) for (let c = g.c0; c <= g.c1; c++) cw[c] += 4;
  }
  const total = () => sum(cw) + sum(gaps);
  while (total() + n <= TARGET_W && Math.min(...cw) < 210) cw[cw.indexOf(Math.min(...cw))] += 1;
  return cw;
}

// Logical routes: points whose coordinates resolve once rows have heights.
// Channels sit below each row; gutters between columns.
function routeGrid(m) {
  const n = m.cols.length;
  const byId = Object.fromEntries(m.nodes.map((nd) => [nd.id, nd]));
  const clear = (c, r0, r1) => !m.nodes.some((nd) => nd.c === c && nd.r > r0 && nd.r < r1);
  const fwd = (e) => byId[e.to].r === byId[e.from].r + 1;
  const indeg = (id) => m.edges.filter((e) => e.to === id && fwd(e)).length;
  const outdeg = (id) => m.edges.filter((e) => e.from === id && fwd(e)).length;
  const chKeys = {}; // channel -> key -> [xmin, xmax] in column units
  const gutKeys = {}; // gutter -> key -> [rmin, rmax]
  const useCh = (k, key, a, b) => {
    const keys = (chKeys[k] ??= {});
    const cur = keys[key] ?? [Infinity, -Infinity];
    keys[key] = [Math.min(cur[0], a, b), Math.max(cur[1], a, b)];
  };
  const useGut = (g, key, a, b) => ((gutKeys[g] ??= {})[key] = [Math.min(a, b), Math.max(a, b)]);
  const cx = (c, dx = 0) => ({ k: 'cx', c, dx });
  const gx = (g, key) => ({ k: 'gx', g, key });
  const side = (c, k) => ({ k, c });
  const routes = m.edges.map((e) => {
    const s = byId[e.from];
    const t = byId[e.to];
    if (!s || !t) throw new Error(`diagrams-readable: edge "${e.id}" references a missing node`);
    const dir = Math.sign(t.c - s.c);
    if (isDirect(e, s, t)) {
      const y = { k: 'mid', r: s.r, ids: [s.id, t.id] };
      return [{ x: side(s.c, dir > 0 ? 'cr' : 'cl'), y }, { x: side(t.c, dir > 0 ? 'cl' : 'cr'), y }];
    }
    if (s.r === t.r) {
      const q = 0.25 * dir;
      const key = `x:${e.id}`;
      useCh(s.r, key, s.c + q, t.c - q);
      return [
        { x: cx(s.c, q), y: { k: 'bot', id: s.id } },
        { x: cx(s.c, q), y: { k: 'ch', ch: s.r, key } },
        { x: cx(t.c, -q), y: { k: 'ch', ch: s.r, key } },
        { x: cx(t.c, -q), y: { k: 'bot', id: t.id } },
      ];
    }
    if (t.r > s.r) {
      if (s.c === t.c && clear(s.c, s.r, t.r)) return [{ x: cx(s.c), y: { k: 'bot', id: s.id } }, { x: cx(t.c), y: { k: 'top', id: t.id } }];
      const busIn = t.r === s.r + 1 && indeg(t.id) > 1 && outdeg(s.id) === 1;
      const via = (ch, key) => {
        useCh(ch, key, s.c, t.c);
        return [{ x: cx(s.c), y: { k: 'bot', id: s.id } }, { x: cx(s.c), y: { k: 'ch', ch, key } }, { x: cx(t.c), y: { k: 'ch', ch, key } }, { x: cx(t.c), y: { k: 'top', id: t.id } }];
      };
      if (clear(t.c, s.r, t.r) && !busIn) return via(s.r, `s:${s.id}`);
      if (clear(s.c, s.r, t.r)) return via(t.r - 1, `t:${t.id}`);
      // Both columns blocked: down a gutter beside the target column.
      const g = dir > 0 ? t.c : dir < 0 ? t.c + 1 : t.c < n - 1 ? t.c + 1 : t.c;
      const k1 = `s:${s.id}`;
      const k2 = `t:${t.id}`;
      const gk = `g:${e.id}`;
      useCh(s.r, k1, s.c, g - 0.5);
      useCh(t.r - 1, k2, g - 0.5, t.c);
      useGut(g, gk, s.r, t.r);
      return [
        { x: cx(s.c), y: { k: 'bot', id: s.id } },
        { x: cx(s.c), y: { k: 'ch', ch: s.r, key: k1 } },
        { x: gx(g, gk), y: { k: 'ch', ch: s.r, key: k1 } },
        { x: gx(g, gk), y: { k: 'ch', ch: t.r - 1, key: k2 } },
        { x: cx(t.c), y: { k: 'ch', ch: t.r - 1, key: k2 } },
        { x: cx(t.c), y: { k: 'top', id: t.id } },
      ];
    }
    // Back edge: out the side, up a gutter, into the target from below.
    const right = s.c < n - 1;
    const g = right ? s.c + 1 : s.c;
    const gk = `g:${e.id}`;
    const key = `b:${e.id}`;
    useGut(g, gk, t.r, s.r);
    useCh(t.r, key, g - 0.5, t.c + 0.25);
    return [
      { x: side(s.c, right ? 'cr' : 'cl'), y: { k: 'mid', ids: [s.id] } },
      { x: gx(g, gk), y: { k: 'mid', ids: [s.id] } },
      { x: gx(g, gk), y: { k: 'ch', ch: t.r, key } },
      { x: cx(t.c, 0.25), y: { k: 'ch', ch: t.r, key } },
      { x: cx(t.c, 0.25), y: { k: 'bot', id: t.id } },
    ];
  });
  // Track assignment (interval colouring): source buses take the upper tracks.
  const assign = (keys, gap) => {
    const order = Object.entries(keys).sort(([a, ia], [b, ib]) => (b[0] === 's') - (a[0] === 's') || ia[0] - ib[0]);
    const tracks = [];
    const out = {};
    for (const [key, iv] of order) {
      let t = tracks.findIndex((ivs) => ivs.every((o) => iv[1] + gap < o[0] || o[1] + gap < iv[0]));
      if (t < 0) { t = tracks.length; tracks.push([]); }
      tracks[t].push(iv);
      out[key] = t;
    }
    return { out, count: tracks.length };
  };
  const chTrack = {};
  const chCount = {};
  for (const [k, keys] of Object.entries(chKeys)) { const a = assign(keys, 0.2); chTrack[k] = a.out; chCount[k] = a.count; }
  const gutTrack = {};
  for (const [g, keys] of Object.entries(gutKeys)) gutTrack[g] = assign(keys, 0).out;
  return { routes, chTrack, chCount, gutTrack };
}

function layoutGrid(m, extra) {
  const gaps = gapWidths(m);
  const cw = columnWidths(m, gaps);
  const nC = m.cols.length;
  const nR = m.rows.length;
  for (const nd of m.nodes) { nd.w = cw[nd.c]; nd.text = nodeText(nd, nd.w); }
  const colX = (c) => sum(cw.slice(0, c)) + sum(gaps.slice(0, c));
  const W = colX(nC - 1) + cw[nC - 1];
  const { routes, chTrack, chCount, gutTrack } = routeGrid(m);
  const groups = m.groups.map((g) => ({ ...g, lines: wrap(g.label, 'mono', groupWidth(g, cw, gaps) - (headLayer(g.label) ? SW : 0)) }));
  const band = Array.from({ length: nR }, (_, r) => Math.max(0, ...groups.filter((g) => g.r0 === r).map((g) => g.lines.length * LH.mono + 8)));
  const chH = (k) => CH_TOP + Math.max(0, (chCount[k] ?? 1) - 1) * CH_STEP + CH_BOT + (extra[k] ?? 0);

  const parts = [];
  const frames = [];
  const obstacles = [];
  const heads = [];
  let y = 0;
  const colHeadLines = m.cols.map((c, j) => (c.head ? wrap(c.head.text, 'mono', cw[j] - (c.head.layer ? SW : 0)) : []));
  const colHeadH = Math.max(0, ...colHeadLines.map((l) => l.length)) * LH.mono;
  if (colHeadH) {
    m.cols.forEach((c, j) => {
      if (!c.head) return;
      colHeadLines[j].forEach((l, k) => {
        const hd = headSvg({ text: l, layer: k === 0 ? c.head.layer : 0 }, colX(j) + (k && c.head.layer ? SW : 0), 13 + k * LH.mono);
        heads.push(hd.svg);
        obstacles.push(hd.box);
      });
      parts.push(`<line class="hr" x1="${colX(j)}" y1="${colHeadH + 3}" x2="${colX(j) + cw[j]}" y2="${colHeadH + 3}"/>`);
    });
    y = colHeadH + 16;
  }
  const rowTop = [];
  const rowBot = [];
  const bandTop = [];
  for (let r = 0; r < nR; r++) {
    if (r > 0) y += chH(r - 1);
    const head = m.rows[r]?.head;
    if (head) {
      const hd = headSvg(head, 0, y + 13);
      heads.push(hd.svg);
      obstacles.push(hd.box);
      parts.push(`<line class="hr" x1="0" y1="${r1(y + 21)}" x2="${W}" y2="${r1(y + 21)}"/>`);
      y += HEAD_H;
    }
    bandTop[r] = y;
    y += band[r];
    const inRow = m.nodes.filter((nd) => nd.r === r);
    const h = Math.max(0, ...inRow.map((nd) => nd.text.h));
    for (const nd of inRow) Object.assign(nd, { x: colX(nd.c), y, h: nd.text.h }); // top-aligned, natural height
    rowTop[r] = y;
    y += h;
    rowBot[r] = y;
  }
  const byId = Object.fromEntries(m.nodes.map((nd) => [nd.id, nd]));
  const frameBottom = Math.max(0, ...groups.map((g) => rowBot[g.r1] + GPAD + 3));
  const H = Math.ceil(Math.max(y + (chCount[nR - 1] ? chH(nR - 1) : 0) + 2, frameBottom));

  // Group frames: a dashed frame around the cells, its label in its own band.
  for (const g of groups) {
    const x = colX(g.c0) - GPAD;
    const gy = bandTop[g.r0] - 4;
    const w = colX(g.c1) + cw[g.c1] - colX(g.c0) + 2 * GPAD;
    const h = rowBot[g.r1] + GPAD + 2 - gy;
    frames.push(`<rect class="gf" x="${r1(x)}" y="${r1(gy)}" width="${r1(w)}" height="${r1(h)}" rx="8"/>`);
    const layer = headLayer(g.label);
    g.lines.forEach((l, k) => {
      const bx = x + 8 + (layer ? SW : 0);
      const by = gy + 16 + k * LH.mono;
      const tw = textWidth(l, 'mono');
      const sw = layer && k === 0 ? swatch(bx - SW, by - 10, layer) : '';
      heads.push(`<rect class="bk" x="${r1(bx - 3 - (layer ? SW : 0))}" y="${r1(by - 13)}" width="${r1(tw + 6 + (layer ? SW : 0))}" height="18"/>${sw}<text class="gl" x="${r1(bx)}" y="${r1(by)}">${esc(l)}</text>`);
      obstacles.push({ x: bx - 3 - (layer ? SW : 0), y: by - 13, w: tw + 6 + (layer ? SW : 0), h: 18 });
    });
  }

  const gutOff = (t) => (t === 0 ? 0 : (t % 2 ? 1 : -1) * Math.ceil(t / 2) * 5);
  const X = (p) => {
    if (p.k === 'cx') return colX(p.c) + cw[p.c] / 2 + p.dx * cw[p.c];
    if (p.k === 'cl') return colX(p.c);
    if (p.k === 'cr') return colX(p.c) + cw[p.c];
    // Gutter 0 has no gap to its left (a one-column grid): the left margin.
    return (p.g === 0 ? 0 : colX(p.g) - gaps[p.g - 1] / 2) + gutOff(gutTrack[p.g][p.key]);
  };
  const Y = (p) => {
    if (p.k === 'top') return byId[p.id].y;
    if (p.k === 'bot') return byId[p.id].y + byId[p.id].h;
    if (p.k === 'mid') return byId[p.ids[0]].y + Math.min(...p.ids.map((id) => byId[id].h)) / 2;
    return rowBot[p.ch] + CH_TOP + (extra[p.ch] ?? 0) / 2 + chTrack[p.ch][p.key] * CH_STEP;
  };
  const paths = routes.map((rt) => rt.map((p) => [r1(X(p.x)), r1(Y(p.y))]));
  return { W, H, parts: [...frames, ...parts], heads, obstacles, paths };
}

// Edge labels go on a free stretch of their own edge: never over a node, a
// header, a group label, an arrowhead or another label, and inside the canvas.
// Fewer crossings of other edges and an unshared segment score better.
function placeLabels(edges, paths, nodes, obstacles, W, H) {
  const hard = [...nodes.map((n) => ({ x: n.x - 2, y: n.y - 2, w: n.w + 4, h: n.h + 4 })), ...obstacles];
  for (const p of paths) { const [x, y] = p[p.length - 1]; hard.push({ x: x - 6, y: y - 6, w: 12, h: 12 }); }
  const segs = paths.flatMap((p, i) => p.slice(1).map((q, k) => ({ i, a: p[k], b: q })));
  const segBox = (s) => ({ x: Math.min(s.a[0], s.b[0]), y: Math.min(s.a[1], s.b[1]), w: Math.abs(s.a[0] - s.b[0]), h: Math.abs(s.a[1] - s.b[1]) });
  const crosses = (box, i) => segs.filter((s) => s.i !== i && overlap(box, segBox(s), -0.5)).length;
  const shared = (a, b, i) => segs.some((s) => s.i !== i && overlap(segBox({ a, b }), segBox(s), 0.01) &&
    ((a[0] === b[0] && s.a[0] === s.b[0] && s.a[0] === a[0]) || (a[1] === b[1] && s.a[1] === s.b[1] && s.a[1] === a[1])));
  const placed = [];
  const failed = [];
  edges.forEach((e, i) => {
    if (!e.label) return placed.push(null);
    const lines = wrap(e.label, 'mono', 220) ?? [e.label];
    const w = Math.max(...lines.map((l) => textWidth(l, 'mono'))) + 8;
    const h = lines.length * LH.mono + 1;
    let best = null;
    const p = paths[i];
    p.slice(1).forEach((b, k) => {
      const a = p[k];
      const vertical = a[0] === b[0];
      const len = Math.abs(vertical ? b[1] - a[1] : b[0] - a[0]);
      const pen0 = (shared(a, b, i) ? 8 : 0) + (k === 0 || k === p.length - 2 ? 0 : 2);
      for (const f of [0.5, 0.35, 0.65, 0.2, 0.8]) {
        const mx = a[0] + (b[0] - a[0]) * f;
        const my = a[1] + (b[1] - a[1]) * f;
        const boxes = vertical
          ? [{ x: mx + 5, y: my - h / 2, pen: 0 }, { x: mx - 5 - w, y: my - h / 2, pen: 0.5 }]
          : [
              { x: mx - w / 2, y: my - h - 3, pen: 0 },
              { x: mx - w / 2, y: my + 3, pen: 0.5 },
              { x: mx - w / 2, y: my - h / 2, pen: 1 },
              { x: Math.min(a[0], b[0]), y: my + 3, pen: 1 },
              { x: Math.max(a[0], b[0]) - w, y: my + 3, pen: 1 },
              { x: Math.min(a[0], b[0]), y: my - h - 3, pen: 1 },
              { x: Math.max(a[0], b[0]) - w, y: my - h - 3, pen: 1 },
            ];
        for (const bx of boxes) {
          const box = { x: bx.x, y: bx.y, w, h };
          if (box.x < 0 || box.y < 0 || box.x + w > W || box.y + h > H) continue;
          if (hard.some((o) => overlap(box, o)) || placed.some((o) => o && overlap(box, o, 3))) continue;
          const score = crosses(box, i) * 10 + pen0 + bx.pen + Math.abs(f - 0.5) * 4 - Math.min(len, 200) / 100;
          if (!best || score < best.score) best = { ...box, score, lines };
        }
      }
    });
    if (!best) failed.push(i);
    placed.push(best);
  });
  return { placed, failed };
}

function labelSvg(e, b) {
  const txt = b.lines.map((l, k) => `<text class="el" x="${r1(b.x + 4)}" y="${r1(b.y + 12.5 + k * LH.mono)}">${esc(l)}</text>`).join('');
  return `<g data-edge-id="${esc(e.id)}" data-edge-from="${esc(e.from)}" data-edge-to="${esc(e.to)}"><rect class="bk" x="${r1(b.x)}" y="${r1(b.y)}" width="${r1(b.w)}" height="${r1(b.h)}" rx="3"/>${txt}</g>`;
}

function pathD(pts) {
  let d = `M${pts[0][0]} ${pts[0][1]}`;
  for (let k = 1; k < pts.length; k++) {
    const [x, y] = pts[k];
    const [px, py] = pts[k - 1];
    if (x === px && y === py) continue;
    d += x === px ? `V${y}` : y === py ? `H${x}` : `L${x} ${y}`;
  }
  return d;
}

const edgePath = (e, d) =>
  `<path class="${edgeClass(e.variant)}" data-edge-id="${esc(e.id)}" data-edge-from="${esc(e.from)}" data-edge-to="${esc(e.to)}" d="${d}" marker-end="${marker(e.variant)}"/>`;

function renderGrid(m0) {
  // Lay the grid out both ways (unless fixed) and keep the one with fewer
  // upward edges, then the one that needs less scrolling in the column. The
  // authored orientation wins a near tie (TRANSPOSE_COST): a few units of width
  // must not swap lanes and phases (vendor-due-diligence-gate did, by 2).
  const candidates = (m0.fixed ? [m0] : [m0, { ...transpose(m0), transposed: true }]).map(uncollide);
  const score = (m, L) => {
    const r = Object.fromEntries(m.nodes.map((n) => [n.id, n.r]));
    const back = m.edges.filter((e) => r[e.to] < r[e.from]).length;
    return back * 60 + Math.max(0, L.W - TARGET_W) / 4 + L.W / 50 + (m.transposed ? TRANSPOSE_COST : 0);
  };
  let best = null;
  const errors = [];
  for (const m of candidates) {
    const extra = {};
    for (let attempt = 0; ; attempt++) {
      const mm = { ...m, nodes: m.nodes.map((n) => ({ ...n })) };
      const L = layoutGrid(mm, extra);
      const { placed, failed } = placeLabels(mm.edges, L.paths, mm.nodes, L.obstacles, L.W, L.H);
      if (failed.length && attempt < 8) {
        // Open the channels next to the unlabelled edges' rows, then retry.
        for (const i of failed) {
          for (const id of [mm.edges[i].from, mm.edges[i].to]) {
            const r = mm.nodes.find((n) => n.id === id).r;
            extra[r] = (extra[r] ?? 0) + 18;
            if (r > 0) extra[r - 1] = (extra[r - 1] ?? 0) + 18;
          }
        }
        continue;
      }
      if (failed.length) {
        errors.push(`no free place for edge label(s) ${failed.map((i) => mm.edges[i].id).join(', ')}`);
        break;
      }
      const sc = score(mm, L);
      if (!best || sc < best.sc) best = { m: mm, L, placed, sc };
      break;
    }
  }
  if (!best) throw new Error(`diagrams-readable: "${m0.title}": ${errors.join('; ')}`);
  const { m, L, placed } = best;
  const edges = m.edges.map((e, i) => edgePath(e, pathD(L.paths[i]))).join('');
  const labels = m.edges.map((e, i) => (placed[i] ? labelSvg(e, placed[i]) : '')).join('');
  const svg = wrapSvg(m.title, L.W, L.H, `${L.parts.join('')}${edges}${L.heads.join('')}${m.nodes.map(nodeSvg).join('')}${labels}`);
  checkLayout(m.title, svg, m.nodes, placed, L);
  return svg;
}

// lang="en": the diagram IRs are written in English only, on every edition.
function wrapSvg(title, W, H, body) {
  return `<svg viewBox="0 0 ${Math.ceil(W)} ${Math.ceil(H)}" role="img" lang="en" aria-labelledby="t" data-min-font="${MIN_FONT}" style="--min-w:${Math.ceil((W * 12) / MIN_FONT)}px"><title id="t">${esc(title)}</title>${DEFS}${body}</svg>`;
}

// Build-time guard: every text line inside its node, labels clear of nodes and
// of each other and inside the canvas, smallest font 12px at the declared min width.
function checkLayout(title, svg, nodes, placed, L) {
  const errs = [];
  for (const n of nodes) {
    for (const [lines, font] of [[n.text.label, 't1'], [n.text.sub, 't2'], [n.text.tag, 'mono']]) {
      for (const l of lines) if (textWidth(l, font) > n.text.inner) errs.push(`"${l}" overflows node ${n.id}`);
    }
    if (n.text.h > n.h + 0.01) errs.push(`node ${n.id} is shorter than its text`);
    if (n.x < 0 || n.y < 0 || n.x + n.w > L.W + 0.01 || n.y + n.h > L.H + 0.01) errs.push(`node ${n.id} leaves the canvas`);
    for (const o of nodes) if (o !== n && overlap(n, o)) errs.push(`nodes ${n.id} and ${o.id} overlap`);
  }
  for (const [x, y] of (L.paths ?? []).flat()) {
    if (!Number.isFinite(x) || !Number.isFinite(y) || x < 0 || y < 0 || x > L.W + 0.01 || y > L.H + 0.01) errs.push(`an edge point (${x}, ${y}) is off the canvas`);
  }
  const boxes = placed.filter(Boolean);
  boxes.forEach((b, i) => {
    if (b.x < 0 || b.y < 0 || b.x + b.w > L.W + 0.01 || b.y + b.h > L.H + 0.01) errs.push(`edge label "${b.lines.join(' ')}" leaves the canvas`);
    if (nodes.some((n) => overlap(b, n))) errs.push(`edge label "${b.lines.join(' ')}" overlaps a node`);
    if (boxes.some((o, j) => j !== i && overlap(b, o))) errs.push(`edge label "${b.lines.join(' ')}" overlaps another label`);
  });
  const minW = Number(/--min-w:(\d+)px/.exec(svg)[1]);
  if ((MIN_FONT * minW) / L.W < 12 - 1e-9) errs.push('smallest text under 12px at the declared min width');
  if (errs.length) throw new Error(`diagrams-readable: "${title}":\n  - ${[...new Set(errs)].join('\n  - ')}`);
}

// --------------------------------------------------------------- per type --
const node = (n, extra) => ({ id: n.id, label: n.label, sub: n.sublabel, tag: n.tag, layer: layerOf(n.label, n.sublabel, n.tag), ...extra });
// A header names a layer as "Layer 0N ..." or, in a by-layer grid, as "0N Name".
const headLayer = (label) => layerOf(label) || Number(/^0([1-5]) [A-Z]/.exec(label)?.[1] ?? 0);
const laneHead = (label) => ({ text: label, layer: headLayer(label) });

function fromDataflow(ir, em) {
  const rows = ir.stages.map((s, i) => ({ head: { n: String(i + 1).padStart(2, '0'), text: s.label, layer: layerOf(s.label) } }));
  const nCols = Math.max(...ir.nodes.map((n) => n.row ?? 0)) + 1;
  const nodes = ir.nodes.map((n) => node(n, { r: n.stage, c: n.row ?? 0, em: n.id === em }));
  return { title: ir.meta.title, rows, cols: Array.from({ length: nCols }, () => ({})), nodes, edges: ir.flows, groups: [], fixed: true };
}

// Workflow: lanes are columns (headed once at the top), time steps run down
// the page, each phase name heads the step where the phase starts.
function fromWorkflow(ir, em) {
  const laneIdx = Object.fromEntries(ir.lanes.map((l, i) => [l.id, i]));
  const nRows = Math.max(...ir.nodes.map((n) => n.col)) + 1;
  const rows = Array.from({ length: nRows }, (_, i) => {
    const ph = (ir.phases ?? []).find((p) => p.fromCol === i);
    return ph ? { head: { text: ph.label } } : {};
  });
  const cols = ir.lanes.map((l) => ({ head: laneHead(l.label) }));
  const nodes = ir.nodes.map((n) => node(n, { r: n.col, c: laneIdx[n.lane], em: n.id === em }));
  const groups = (ir.groups ?? []).map((g) => ({ label: g.label, c0: laneIdx[g.lane], c1: laneIdx[g.lane], r0: g.fromCol, r1: g.toCol }));
  return { title: ir.meta.title, rows, cols, nodes, edges: ir.edges, groups, fixed: false };
}

// Lifecycle: lanes are columns, the shared col grid runs down the page.
function fromLifecycle(ir, em) {
  const laneIdx = Object.fromEntries(ir.lanes.map((l, i) => [l.id, i]));
  const nRows = Math.max(...ir.states.map((s) => s.col)) + 1;
  const cols = ir.lanes.map((l) => ({ head: laneHead(l.label) }));
  const nodes = ir.states.map((s) => node(s, { r: s.col, c: laneIdx[s.lane], tag: [s.step, s.tag].filter(Boolean).join(' · ') || undefined, em: s.id === em }));
  return { title: ir.meta.title, rows: Array.from({ length: nRows }, () => ({})), cols, nodes, edges: ir.transitions, groups: [], fixed: false };
}

// Architecture: authored positions snap to a grid (centres clustered per
// axis); a boundary that wraps whole rows or whole columns becomes their
// header, any other boundary a group frame.
function cluster(values, tol) {
  const groups = [];
  for (const v of [...new Set(values)].sort((a, b) => a - b)) {
    const last = groups[groups.length - 1];
    if (last && v - last.hi <= tol) last.hi = v;
    else groups.push({ lo: v, hi: v });
  }
  return (v) => groups.findIndex((g) => v >= g.lo && v <= g.hi);
}

function fromArchitecture(ir, em) {
  const comps = ir.components;
  const cxs = comps.map((c) => c.pos[0] + c.size[0] / 2);
  const cys = comps.map((c) => c.pos[1] + c.size[1] / 2);
  const colOf = cluster(cxs, 70);
  const rowOf = cluster(cys, 40);
  const nodes = comps.map((c, i) => node(c, { c: colOf(cxs[i]), r: rowOf(cys[i]), em: c.id === em }));
  const nR = Math.max(...nodes.map((n) => n.r)) + 1;
  const nC = Math.max(...nodes.map((n) => n.c)) + 1;
  const rows = Array.from({ length: nR }, () => ({}));
  const cols = Array.from({ length: nC }, () => ({}));
  const groups = [];
  for (const b of ir.boundaries ?? []) {
    const members = nodes.filter((n) => b.wraps.includes(n.id));
    const rs = [...new Set(members.map((n) => n.r))];
    const cs = [...new Set(members.map((n) => n.c))];
    const whole = (key, v) => nodes.filter((n) => n[key] === v).every((n) => b.wraps.includes(n.id));
    const head = laneHead(b.label);
    if (rs.length === 1 && whole('r', rs[0]) && !rows[rs[0]].head) rows[rs[0]].head = head;
    else if (cs.length === 1 && whole('c', cs[0]) && !cols[cs[0]].head) cols[cs[0]].head = head;
    else groups.push({ label: b.label, c0: Math.min(...cs), c1: Math.max(...cs), r0: Math.min(...rs), r1: Math.max(...rs) });
  }
  return { title: ir.meta.title, rows, cols, nodes, edges: ir.connections, groups, fixed: false };
}

// Sequence: participants as columns with lifelines, one message per row in
// authored order, segment names as row headers.
function renderSequence(ir, em) {
  const ps = ir.participants;
  const n = ps.length;
  let cw = Math.max(MIN_NW, Math.floor(TARGET_W / n));
  while (!ps.every((p) => nodeText(node(p), cw - 12)) && cw < MAX_NW) cw += 4;
  const heads = ps.map((p, i) => {
    const nd = node(p, { em: p.id === em });
    nd.text = nodeText(nd, cw - 12);
    if (!nd.text) throw new Error(`diagrams-readable: "${ir.meta.title}": participant ${p.id} does not fit`);
    return Object.assign(nd, { x: i * cw + 6, y: 0, w: cw - 12 });
  });
  const hh = Math.max(...heads.map((p) => p.text.h));
  heads.forEach((p) => (p.h = hh));
  const W = n * cw;
  const cx = Object.fromEntries(heads.map((p) => [p.id, p.x + p.w / 2]));
  const msgs = [...ir.messages].sort((a, b) => a.y - b.y);
  const segs = [...(ir.segments ?? [])].sort((a, b) => a.from - b.from);
  let y = hh + 18;
  const rules = [];
  const arrows = [];
  const labels = [];
  const boxes = [];
  let seg = 0;
  for (const m of msgs) {
    while (seg < segs.length && m.y >= segs[seg].from) {
      const hd = headSvg({ text: segs[seg].label, layer: layerOf(segs[seg].label) }, 0, y + 13);
      labels.push(hd.svg);
      rules.push(`<line class="hr" x1="0" y1="${r1(y + 21)}" x2="${W}" y2="${r1(y + 21)}"/>`);
      y += HEAD_H + 4;
      seg++;
    }
    const x0 = cx[m.from];
    const x1 = cx[m.to];
    if (x0 === undefined || x1 === undefined) throw new Error(`diagrams-readable: message "${m.id}" references a missing participant`);
    const lines = m.label ? wrap(m.label, 'mono', Math.max(Math.abs(x1 - x0) - 16, 200)) : [];
    if (lines.length) {
      const w = Math.max(...lines.map((l) => textWidth(l, 'mono'))) + 8;
      const b = { x: Math.min(Math.min(x0, x1) + 6, W - w), y, w, h: lines.length * LH.mono + 1, lines };
      boxes.push(b);
      labels.push(labelSvg(m, b));
      y += b.h + 7;
    }
    arrows.push(edgePath(m, `M${r1(x0)} ${r1(y)}H${r1(x1 + (x1 > x0 ? -1 : 1))}`));
    y += 24;
  }
  const H = Math.ceil(y);
  const lifelines = heads.map((p) => `<line class="ll" x1="${r1(cx[p.id])}" y1="${hh}" x2="${r1(cx[p.id])}" y2="${H}"/>`);
  const svg = wrapSvg(ir.meta.title, W, H, `${lifelines.join('')}${rules.join('')}${arrows.join('')}${heads.map(nodeSvg).join('')}${labels.join('')}`);
  checkLayout(ir.meta.title, svg, heads, boxes, { W, H });
  return svg;
}

// Edges and messages may omit an id; diagram.js keys highlighting on it, so
// each gets a stable one from its endpoints (suffixed when a pair repeats).
const EDGE_KEY = { dataflow: 'flows', workflow: 'edges', lifecycle: 'transitions', architecture: 'connections', sequence: 'messages' };
function withEdgeIds(ir, key) {
  // Authored ids are taken first, so a generated one can never repeat them.
  const taken = new Set((ir[key] ?? []).map((e) => e.id).filter(Boolean));
  const edges = (ir[key] ?? []).map((e) => {
    if (e.id) return e;
    const base = `${e.from}-${e.to}`;
    let id = base;
    for (let k = 2; taken.has(id); k++) id = `${base}-${k}`;
    taken.add(id);
    return { ...e, id };
  });
  return { ...ir, [key]: edges };
}

export function renderReadable(ir0, type, emphasis) {
  const ir = withEdgeIds(ir0, EDGE_KEY[type]);
  if (type === 'sequence') return renderSequence(ir, emphasis);
  const from = { dataflow: fromDataflow, workflow: fromWorkflow, lifecycle: fromLifecycle, architecture: fromArchitecture }[type];
  if (!from) throw new Error(`diagrams-readable: unknown diagram type "${type}"`);
  return renderGrid(from(ir, emphasis));
}
