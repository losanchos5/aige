// posters.mjs: the reference posters, generated at build from the typed data
// modules by scripts/figures-build.mjs (VISUAL-GUIDE.md §5, kind 'poster'):
//
//   eu-ai-act-timeline        the post-Omnibus timeline, one lane per obligation
//                             family (frameworks.ts appliesFrom and milestones)
//   eu-ai-act-operator-roles  the operator-role questions, the role cards and the
//                             Art. 25 loop (roles.ts and chapter 18)
//   eu-ai-act-risk-ladder     the risk ladder with the Art. 6(3) filter, the GPAI
//                             track and side notes from chapter 21 (dates from
//                             frameworks.ts)
//   deployment-option-matrix  the model-type by deployment-option matrix
//                             (deployment-options.ts, chapter 15)
//
// The first three also come in Spanish (ids ending in -es): the same layout and
// data, the text translated, the root <svg> marked lang="es" and the stamp
// "A fecha de <asOf>". Every poster is portrait at the A-series ratio 1 : √2
// (1000 × 1414 user units), prints "As of <asOf>" inside the image and carries
// no links, so its role is "img". Colour comes only from the site's classes
// (figures.css); nothing here is a hex value. Text is measured with the
// per-character table of svg-text.mjs, and a label that cannot fit its box
// throws at build, like map-build does: the fix is shorter wording, never a
// smaller font. The smallest font is 16 units, so a poster shown at 760 px (its
// minimum width in a chapter) keeps text at 12 px or more.
//
// A figure states only what its chapter states: every date comes from the data
// module or from the chapter table named next to it below.
import { esc, textW } from './svg-text.mjs';

export const POSTER_W = 1000;
/** 1000 × √2, rounded: the A-series portrait ratio (VISUAL-GUIDE.md §5). */
export const POSTER_H = 1414;
const M = 40; // outer margin
const MIN_FONT = 16;

const r1 = (n) => Math.round(n * 10) / 10;

// ------------------------------------------------------------------ text -- //

/** Face of a text class list: mono, display or body. */
const faceOf = (cls = '') =>
  /\bmono\b/.test(cls) ? 'mono' : /\bdisp\b/.test(cls) ? 'disp' : 'body';

/** Approximate advance width of `s` at `px` in the given face. */
export function measure(s, px, face = 'body') {
  if (face === 'mono') return [...String(s)].length * px * 0.6;
  return textW(s, px) * (face === 'disp' ? 1.12 : 1);
}

/** Greedy wrap to `maxPx`; throws when a single word cannot fit. */
export function wrapTo(s, maxPx, px, face = 'body') {
  // Tokens joined by a space, except that a word too wide for the box may
  // break after one of its own hyphens ("safety-" / "erosion").
  const tokens = [];
  // Keep an article reference on one line: "Art." / "Arts." glue to the next word.
  const words = [];
  for (const word of String(s).split(/\s+/).filter(Boolean)) {
    const prev = words.at(-1);
    if (prev !== undefined && /^\(?[Aa]rts?\.$/.test(prev)) words[words.length - 1] = `${prev} ${word}`;
    else words.push(word);
  }
  for (const word of words) {
    if (measure(word, px, face) > maxPx && word.includes('-')) {
      const parts = word.split(/(?<=-)/);
      parts.forEach((part, i) => tokens.push({ t: part, sep: i === 0 ? ' ' : '' }));
    } else {
      tokens.push({ t: word, sep: ' ' });
    }
  }
  const lines = [];
  let line = '';
  for (const { t: word, sep } of tokens) {
    const candidate = line ? `${line}${sep}${word}` : word;
    if (line && measure(candidate, px, face) > maxPx) {
      lines.push(line);
      line = word;
    } else {
      line = candidate;
    }
  }
  if (line) lines.push(line);
  for (const l of lines) {
    if (measure(l, px, face) > maxPx + 0.5) {
      throw new Error(`posters: "${l}" is wider than its ${maxPx}px box; shorten the wording`);
    }
  }
  return lines;
}

/** One <text> element. */
function text(x, y, s, { size = 17, cls = '', anchor } = {}) {
  if (size < MIN_FONT) throw new Error(`posters: font ${size} below the ${MIN_FONT} minimum`);
  const c = cls ? ` class="${cls}"` : '';
  const a = anchor ? ` text-anchor="${anchor}"` : '';
  return `<text${c} x="${r1(x)}" y="${r1(y)}" font-size="${size}"${a}>${esc(s)}</text>`;
}

/**
 * A wrapped paragraph whose first baseline sits at `y`. Returns the elements
 * and the y of the last baseline.
 */
function para(x, y, s, maxPx, { size = 17, cls = '', lh, anchor } = {}) {
  const lineH = lh ?? Math.round(size * 1.3);
  const ls = wrapTo(s, maxPx, size, faceOf(cls));
  return {
    els: ls.map((l, i) => text(x, y + i * lineH, l, { size, cls, anchor })),
    last: y + (ls.length - 1) * lineH,
    lines: ls.length,
  };
}

const line = (x1, y1, x2, y2, cls = 'rule', extra = '') =>
  `<line class="${cls}" x1="${r1(x1)}" y1="${r1(y1)}" x2="${r1(x2)}" y2="${r1(y2)}"${extra}/>`;

const rect = (x, y, w, h, cls, rx = 0, extra = '') =>
  `<rect class="${cls}" x="${r1(x)}" y="${r1(y)}" width="${r1(w)}" height="${r1(h)}"${rx ? ` rx="${rx}"` : ''}${extra}/>`;

/** Filled arrowhead pointing in direction `dir` ('r', 'l', 'd', 'u') with its tip at (x, y). */
function arrowHead(x, y, dir) {
  const s = 7;
  const pts = {
    r: [[x, y], [x - s * 1.4, y - s], [x - s * 1.4, y + s]],
    l: [[x, y], [x + s * 1.4, y - s], [x + s * 1.4, y + s]],
    d: [[x, y], [x - s, y - s * 1.4], [x + s, y - s * 1.4]],
    u: [[x, y], [x - s, y + s * 1.4], [x + s, y + s * 1.4]],
  }[dir];
  return `<path class="arrow" d="M${pts.map(([a, b]) => `${r1(a)} ${r1(b)}`).join(' L')} Z"/>`;
}

/** Gate glyph (diamond), centred at (cx, cy). */
const diamond = (cx, cy, r = 11) =>
  `<path class="glyph" d="M${cx} ${cy - r} L${cx + r} ${cy} L${cx} ${cy + r} L${cx - r} ${cy} Z"/>`;

/** Evidence glyph (document with a check), top-left at (x, y). */
const evidenceGlyph = (x, y) =>
  `<path class="glyph" d="M${x} ${y} h9 l5 5 v13 h-14 z"/>` +
  `<path class="glyph-check" d="M${x + 3} ${y + 10} l3 3 l5 -6"/>`;

/** Registry glyph (cylinder), centred horizontally on cx, top at y. */
const cylinder = (cx, y, w = 26, h = 30) => {
  const rx = w / 2;
  const ry = 5;
  return (
    `<path class="glyph" d="M${cx - rx} ${y + ry} v${h - 2 * ry} a${rx} ${ry} 0 0 0 ${w} 0 v-${h - 2 * ry}"/>` +
    `<ellipse class="glyph" cx="${cx}" cy="${y + ry}" rx="${rx}" ry="${ry}"/>`
  );
};

/** Open the poster <svg> with the a11y contract. Spanish posters carry lang="es";
 *  their <title>/<desc> stay in English (the site's language) and say so. */
function open(fig, lang) {
  const id = fig.id;
  const rootLang = lang === 'en' ? '' : ` lang="${lang}"`;
  const partLang = lang === 'en' ? '' : ' lang="en"';
  return (
    `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${POSTER_W} ${POSTER_H}" class="figc"${rootLang} ` +
    `role="img" aria-labelledby="fig-${id}-t fig-${id}-d">\n` +
    `  <title id="fig-${id}-t"${partLang}>${esc(fig.title)}</title>\n` +
    `  <desc id="fig-${id}-d"${partLang}>${esc(fig.alt)}</desc>\n`
  );
}

const close = (els) => `${els.map((e) => `  ${e}`).join('\n')}\n</svg>\n`;

/** Kicker, title and intro; returns the elements and the y of the rule under them. */
function header({ kicker, title, intro }) {
  const els = [];
  const k = para(M, 56, kicker, POSTER_W - 2 * M, { size: 17, cls: 'mono muted', lh: 24 });
  els.push(...k.els);
  const t = para(M, k.last + 52, title, POSTER_W - 2 * M, { size: 40, cls: 'disp', lh: 46 });
  els.push(...t.els);
  let last = t.last + 4;
  if (intro) {
    const i = para(M, t.last + 38, intro, POSTER_W - 2 * M, { size: 19, cls: 'ink2', lh: 26 });
    els.push(...i.els);
    last = i.last;
  }
  const y = last + 24;
  els.push(line(M, y, POSTER_W - M, y));
  return { els, bottom: y };
}

/**
 * Footer lines, bottom-up from the foot of the poster: the stamp line last. The
 * stamp carries "As of <date>" (or "A fecha de <date>" in Spanish) so every
 * download keeps its date. Returns the elements and the y of the rule above.
 */
function footer(linesTopDown) {
  const els = [];
  const blocks = linesTopDown.map((s) => wrapTo(s, POSTER_W - 2 * M, 16, 'mono'));
  let y = POSTER_H - 30;
  const out = [];
  for (let b = blocks.length - 1; b >= 0; b -= 1) {
    for (let i = blocks[b].length - 1; i >= 0; i -= 1) {
      out.unshift(text(M, y, blocks[b][i], { size: 16, cls: 'mono muted' }));
      y -= 23;
    }
    y -= 4;
  }
  const top = y + 2;
  els.push(line(M, top, POSTER_W - M, top));
  els.push(...out);
  return { els, top };
}

/** Build-time strictness; a preview harness may relax it to see an overflow. */
export const layoutOptions = { strict: true };

/** Throw when content ran into the footer (layout overflow is a build error). */
function assertFits(id, bottom, footerTop) {
  if (bottom > footerTop - 8) {
    if (!layoutOptions.strict) {
      console.warn(`posters: ${id} overflows by ${Math.round(bottom - footerTop + 8)} units`);
      return;
    }
    throw new Error(
      `posters: ${id} content ends at y=${Math.round(bottom)}, below the footer at ${Math.round(footerTop)}; shorten it`,
    );
  }
}

// ------------------------------------------------------ article lists -- //

/** "Arts. 6, 9 to 15, 17" from the clause labels of some obligation rows. */
export function articleList(rows, lang) {
  const nums = new Set();
  for (const row of rows) {
    for (const m of String(row.clause).matchAll(/Art\.\s*(\d+)([a-z]?)/g)) nums.add(`${m[1]}${m[2]}`);
  }
  const sorted = [...nums].sort((a, b) => parseInt(a, 10) - parseInt(b, 10) || a.localeCompare(b));
  const plain = (s) => /^\d+$/.test(s);
  const parts = [];
  let i = 0;
  while (i < sorted.length) {
    let j = i;
    while (
      j + 1 < sorted.length &&
      plain(sorted[j]) &&
      plain(sorted[j + 1]) &&
      Number(sorted[j + 1]) === Number(sorted[j]) + 1
    ) {
      j += 1;
    }
    if (j - i >= 2) parts.push(`${sorted[i]} ${lang === 'es' ? 'a' : 'to'} ${sorted[j]}`);
    else parts.push(...sorted.slice(i, j + 1));
    i = j + 1;
  }
  return `${sorted.length > 1 ? 'Arts.' : 'Art.'} ${parts.join(', ')}`;
}

// ============================================================ timeline == //

const has = (row, cls) => Boolean(row.systemClass?.includes(cls));

/** Lanes, top to bottom. */
const LANE_ORDER = ['prohibited', 'literacy', 'gpai', 'transparency', 'annex-iii', 'annex-i', 'legacy'];

/** Which lane an EU AI Act row belongs to; the first test that matches wins. */
const LANE_PRECEDENCE = [
  ['literacy', (o) => o.id === 'AIGE-OBL-EUAIA-ART4' || o.id === 'AIGE-OBL-EUAIA-ART4A'],
  ['prohibited', (o) => has(o, 'prohibited')],
  ['gpai', (o) => has(o, 'gpai') || has(o, 'gpai-systemic')],
  ['transparency', (o) => has(o, 'transparency-art50')],
  ['annex-iii', (o) => has(o, 'high-risk-annex-iii')],
  ['annex-i', (o) => has(o, 'high-risk-annex-i')],
];

/**
 * Dated markers chapter 18 states ("The post-Omnibus timeline") that no
 * obligation row carries; they frame the axis. Every dated duty, including the
 * Art. 111(3) step for GPAI models placed before 2025-08-02, comes from the
 * register rows' appliesFrom and milestones.
 */
const CH18_MARKERS = { actInForce: '2024-08-01', omnibusInForce: '2026-07-27' };

/** Build the lanes and their events from the frameworks.ts obligation rows. */
export function timelineModel(obligations) {
  const lanes = new Map(LANE_ORDER.map((id) => [id, { id, rows: [], events: new Map() }]));
  const addRow = (laneId, row) => {
    const lane = lanes.get(laneId);
    if (!lane.rows.includes(row)) lane.rows.push(row);
  };
  const addEvent = (laneId, date, source, kind, note) => {
    const lane = lanes.get(laneId);
    const event = lane.events.get(date) ?? { date, ids: new Set(), from: 0, notes: [] };
    event.ids.add(source);
    if (kind === 'from') event.from += 1;
    if (note && !event.notes.includes(note)) event.notes.push(note);
    lane.events.set(date, event);
  };
  for (const row of obligations.filter((o) => o.frameworkId === 'eu-ai-act')) {
    const hit = LANE_PRECEDENCE.find(([, test]) => test(row));
    if (!hit) continue;
    const laneId = hit[0];
    addRow(laneId, row);
    if (row.appliesFrom) addEvent(laneId, row.appliesFrom, row.id, 'from', row.obligation);
    for (const m of row.milestones ?? []) {
      let target = laneId;
      if (/111\(2\)/.test(m.note)) target = 'legacy';
      else if (m.systemClass?.includes('high-risk-annex-i') && !m.systemClass?.includes('high-risk-annex-iii')) {
        target = 'annex-i';
      }
      if (target !== 'legacy') addRow(target, row);
      addEvent(target, m.date, row.id, 'step', m.note);
    }
  }
  return LANE_ORDER.map((id) => {
    const lane = lanes.get(id);
    const events = [...lane.events.values()].sort((a, b) => a.date.localeCompare(b.date));
    // The family's main date: where most rows start to apply (ties: earliest);
    // a lane with no start date takes its busiest step.
    const score = (e) => (events.some((x) => x.from > 0) ? e.from : e.ids.size);
    let main = events[0];
    for (const e of events) if (score(e) > score(main)) main = e;
    return { id, rows: lane.rows, events, main: main?.date };
  }).filter((lane) => lane.events.length > 0);
}

const TIMELINE = {
  en: {
    kicker: 'EU AI Act · Regulation (EU) 2024/1689 as amended by Regulation (EU) 2026/1744',
    title: 'When each duty applies, 2024 to 2030',
    intro:
      'One lane per obligation family on one time axis, with the Digital Omnibus changes in force since 2026-07-27.',
    actInForce: (d) => `Act in force ${d}`,
    omnibus: (d) => `Omnibus in force ${d}`,
    lanes: {
      prohibited: 'Prohibited practices',
      literacy: 'AI literacy and bias-detection data',
      gpai: 'General-purpose AI models',
      transparency: 'Transparency for certain AI systems',
      'annex-iii': 'High-risk through use (Annex III)',
      'annex-i': 'High-risk through products (Annex I)',
      legacy: 'Legacy high-risk systems for public authorities',
    },
    legacyArticles: 'Art. 111(2)',
    events: {
      'prohibited:2025-02-02': 'Original prohibitions apply',
      'prohibited:2026-12-02': 'New bans on NCII and CSAM',
      'literacy:2025-02-02': 'AI literacy applies (Art. 4)',
      'literacy:2026-07-27': 'Art. 4 reworded; new Art. 4a',
      'gpai:2025-08-02': 'GPAI provider obligations apply',
      'gpai:2026-08-02': 'Commission enforcement powers apply',
      'gpai:2027-08-02': 'Models placed before 2025-08-02 comply',
      'transparency:2026-08-02': 'Disclosure and marking apply (Art. 50)',
      'transparency:2026-12-02': 'Marking grace ends for existing systems',
      'annex-iii:2026-08-02': 'Real-world testing rules (Art. 60)',
      'annex-iii:2027-12-02': 'Annex III duties apply; deferred from 2026-08-02',
      'annex-i:2028-08-02': 'Annex I duties apply; deferred from 2027-08-02',
      'legacy:2030-08-02': 'Systems already on the market must comply',
    },
    legend: ['Duties apply', 'Another dated step', 'In application', 'Omnibus in force'],
    source:
      'Source: chapter 18, The post-Omnibus timeline, and chapter 08, EU AI Act, post-Omnibus. Commission, notified-body and Annex X dates are in the chapter 18 table, not drawn.',
    stamp: (d) => `As of ${d} · a reading aid, not legal advice`,
  },
  es: {
    kicker: 'Reglamento (UE) 2024/1689, modificado por el Reglamento (UE) 2026/1744',
    title: 'Cuándo se aplica cada obligación',
    intro:
      'Un carril por familia de obligaciones sobre un mismo eje temporal, con los cambios del Ómnibus digital en vigor desde 2026-07-27.',
    actInForce: (d) => `En vigor ${d}`,
    omnibus: (d) => `Ómnibus en vigor ${d}`,
    lanes: {
      prohibited: 'Prácticas de IA prohibidas',
      literacy: 'Alfabetización en materia de IA y datos para detectar sesgos',
      gpai: 'Modelos de IA de uso general',
      transparency: 'Transparencia de determinados sistemas de IA',
      'annex-iii': 'Alto riesgo por su uso (anexo III)',
      'annex-i': 'Alto riesgo por producto (anexo I)',
      legacy: 'Alto riesgo ya en el mercado, autoridades públicas',
    },
    legacyArticles: 'Art. 111(2)',
    events: {
      'prohibited:2025-02-02': 'Se aplican las prohibiciones',
      'prohibited:2026-12-02': 'Nuevos vetos: NCII y CSAM',
      'literacy:2025-02-02': 'Se aplica el art. 4',
      'literacy:2026-07-27': 'Art. 4 reformulado; nuevo art. 4a',
      'gpai:2025-08-02': 'Obligaciones de los proveedores',
      'gpai:2026-08-02': 'La Comisión puede multar (art. 101)',
      'gpai:2027-08-02': 'Deben cumplir los modelos introducidos antes de 2025-08-02',
      'transparency:2026-08-02': 'Informar y marcar (art. 50)',
      'transparency:2026-12-02': 'Fin de la gracia del marcado para sistemas existentes',
      'annex-iii:2026-08-02': 'Pruebas en condiciones reales (art. 60)',
      'annex-iii:2027-12-02': 'Se aplican las obligaciones; aplazadas desde 2026-08-02',
      'annex-i:2028-08-02': 'Se aplican las obligaciones; aplazadas desde 2027-08-02',
      'legacy:2030-08-02': 'Deben cumplir los sistemas ya en el mercado',
    },
    legend: ['Se aplican las obligaciones', 'Otro hito con fecha', 'En aplicación', 'Ómnibus en vigor'],
    source:
      'Fuente: capítulo 18 (The post-Omnibus timeline) y capítulo 08 (EU AI Act, post-Omnibus). Las fechas de la Comisión, de organismos notificados y del anexo X: tabla del capítulo 18.',
    stamp: (d) => `A fecha de ${d} · una ayuda de lectura, no asesoramiento jurídico`,
  },
};

const DAY0 = Date.parse('2024-06-01T00:00:00Z');
const DAY1 = Date.parse('2030-12-31T00:00:00Z');

/** The timeline poster. `fig` is its figures.ts entry; `asOf` its date. */
export function buildTimelinePoster(obligations, fig, lang = 'en') {
  const S = TIMELINE[lang];
  const lanes = timelineModel(obligations);
  const X0 = M + 8;
  const X1 = POSTER_W - M - 8;
  const xOf = (iso) => X0 + ((Date.parse(`${iso}T00:00:00Z`) - DAY0) / (DAY1 - DAY0)) * (X1 - X0);

  const els = [];
  const h = header(S);
  els.push(...h.els);

  const f = footer([S.source, S.stamp(fig.asOf)]);

  // Legend row, just above the footer.
  const legendY = f.top - 22;
  const legend = [];
  {
    let x = M;
    const item = (glyph, label) => {
      legend.push(glyph(x));
      legend.push(text(x + 30, legendY + 5, label, { size: 16, cls: 'ink2' }));
      x += 30 + measure(label, 16) + 28;
    };
    item((gx) => `<circle class="dot-on" cx="${gx + 10}" cy="${legendY}" r="8"/>`, S.legend[0]);
    item((gx) => `<circle class="dot-off" cx="${gx + 10}" cy="${legendY}" r="7"/>`, S.legend[1]);
    item((gx) => rect(gx, legendY - 3, 22, 6, 'glyph-fill'), S.legend[2]);
    item((gx) => line(gx + 10, legendY - 11, gx + 10, legendY + 11, 'stroke-arrow', ' stroke-dasharray="5 4"'), S.legend[3]);
    if (x - 28 > POSTER_W - M) throw new Error('posters: timeline legend is wider than the poster');
  }
  const lanesBottomLimit = legendY - 30;

  // Axis: marker labels, then year labels.
  const markerY = h.bottom + 34;
  const yearY = markerY + 30;
  const actX = xOf(CH18_MARKERS.actInForce);
  const omniX = xOf(CH18_MARKERS.omnibusInForce);
  const axisEls = [
    text(actX - 4, markerY, S.actInForce(CH18_MARKERS.actInForce), { size: 16, cls: 'mono' }),
    text(omniX - 4, markerY, S.omnibus(CH18_MARKERS.omnibusInForce), { size: 16, cls: 'mono' }),
  ];
  const years = [];
  const yearEls = [];
  for (let yr = 2024; yr <= 2030; yr += 1) {
    const a = Math.max(DAY0, Date.parse(`${yr}-01-01T00:00:00Z`));
    const b = Math.min(DAY1, Date.parse(`${yr + 1}-01-01T00:00:00Z`));
    const xa = X0 + ((a - DAY0) / (DAY1 - DAY0)) * (X1 - X0);
    const xb = X0 + ((b - DAY0) / (DAY1 - DAY0)) * (X1 - X0);
    years.push({ yr, xa, xb });
    const cx = (xa + xb) / 2;
    yearEls.push(rect(cx - 24, yearY - 16, 48, 22, 'dot-mask'));
    yearEls.push(text(cx, yearY, String(yr), { size: 16, cls: 'mono muted', anchor: 'middle' }));
  }

  // Lanes.
  const WIDTHS = [236, 176, 128]; // candidate label widths, widest first
  const laneEls = [];
  let y = yearY + 14;
  for (const lane of lanes) {
    const top = y;
    laneEls.push(line(M, top, POSTER_W - M, top));
    const title = S.lanes[lane.id] ?? lane.id;
    const arts = lane.id === 'legacy' ? S.legacyArticles : articleList(lane.rows, lang);
    const titleW = measure(title, 20, 'disp');
    const artsW = measure(arts, 16, 'mono');
    let trackY;
    // Titles sit on the gridlines: a ground-colour mask keeps them legible.
    laneEls.push(rect(M - 4, top + 6, titleW + 10, 26, 'dot-mask'));
    laneEls.push(text(M, top + 25, title, { size: 20, cls: 'disp' }));
    if (M + titleW + 16 + artsW <= POSTER_W - M) {
      laneEls.push(rect(POSTER_W - M - artsW - 6, top + 8, artsW + 10, 24, 'dot-mask'));
      laneEls.push(text(POSTER_W - M, top + 25, arts, { size: 16, cls: 'mono muted', anchor: 'end' }));
      trackY = top + 44;
    } else {
      const a = para(M, top + 46, arts, POSTER_W - 2 * M, { size: 16, cls: 'mono muted', lh: 21 });
      const aw = Math.max(...wrapTo(arts, POSTER_W - 2 * M, 16, 'mono').map((l) => measure(l, 16, 'mono')));
      laneEls.push(rect(M - 4, top + 31, aw + 10, (a.lines - 1) * 21 + 22, 'dot-mask'));
      laneEls.push(...a.els);
      trackY = a.last + 20;
    }

    // Labels: a date line and the wrapped text under the track. Each label
    // picks a width, a side of its dot and a row so that none overlap and the
    // lane is as short as it can be (exhaustive: a lane has a handful of dates).
    const labels = lane.events.map((e) => {
      const key = `${lane.id}:${e.date}`;
      let words = S.events[key];
      if (!words) {
        words = e.notes[0] ?? e.date;
        console.warn(`figures-build: warning: ${fig.id}: no ${lang} label for ${key}; using the data note.`);
      }
      const dateW = measure(e.date, 16, 'mono');
      const variants = WIDTHS.map((maxW) => {
        const ls = wrapTo(words, maxW, 16);
        const w = Math.max(dateW, ...ls.map((l) => measure(l, 16)));
        return { ls, w, h: 24 + ls.length * 20 };
      });
      return { e, x: xOf(e.date), variants };
    });
    const options = [];
    for (let v = 0; v < WIDTHS.length; v += 1) {
      for (const row of [0, 1]) for (const side of ['r', 'l']) options.push({ v, row, side });
    }
    const boxOf = (lab, o) => {
      const w = lab.variants[o.v].w;
      return o.side === 'r' ? [lab.x - 8, lab.x - 8 + w] : [lab.x + 8 - w, lab.x + 8];
    };
    let best = null;
    const n = labels.length;
    const total = options.length ** n;
    for (let code = 0; code < total; code += 1) {
      const pick = [];
      let c = code;
      for (let i = 0; i < n; i += 1) {
        pick.push(options[c % options.length]);
        c = Math.floor(c / options.length);
      }
      let ok = true;
      for (let i = 0; i < n && ok; i += 1) {
        const [a0, a1] = boxOf(labels[i], pick[i]);
        if (a0 < M || a1 > POSTER_W - M) ok = false;
        for (let j = 0; j < n && ok; j += 1) {
          if (j === i) continue;
          const [b0, b1] = boxOf(labels[j], pick[j]);
          // Same row: boxes keep a gap. A second-row label's leader must not
          // cross a first-row box.
          if (pick[j].row === pick[i].row && j < i && a0 < b1 + 14 && b0 < a1 + 14) ok = false;
          if (pick[i].row === 1 && pick[j].row === 0 && labels[i].x > b0 - 6 && labels[i].x < b1 + 6) {
            ok = false;
          }
        }
      }
      if (!ok) continue;
      const h0 = Math.max(0, ...labels.map((l, i) => (pick[i].row === 0 ? l.variants[pick[i].v].h : 0)));
      const h1 = Math.max(0, ...labels.map((l, i) => (pick[i].row === 1 ? l.variants[pick[i].v].h : 0)));
      const height = h0 + (h1 ? 10 + h1 : 0);
      const lefts = pick.filter((p) => p.side === 'l').length;
      const narrow = pick.reduce((s, p) => s + p.v, 0);
      const score = height * 100 + narrow * 3 + lefts;
      if (!best || score < best.score) best = { score, pick, h0 };
    }
    if (!best) throw new Error(`posters: ${fig.id}: labels of lane ${lane.id} cannot be placed`);
    const rowTop = [trackY + 18, trackY + 18 + best.h0 + 10];

    // Track: dashed before the family's main date, a solid bar from it.
    const xMain = xOf(lane.main);
    laneEls.push(line(X0, trackY, xMain, trackY, 'stroke-arrow', ' stroke-dasharray="4 5"'));
    laneEls.push(rect(xMain, trackY - 3, X1 - xMain, 6, 'glyph-fill'));

    let bottom = trackY;
    labels.forEach((lab, i) => {
      const o = best.pick[i];
      const v = lab.variants[o.v];
      const top0 = rowTop[o.row];
      const anchor = o.side === 'r' ? undefined : 'end';
      const tx = o.side === 'r' ? lab.x - 8 : lab.x + 8;
      const [b0] = boxOf(lab, o);
      laneEls.push(line(lab.x, trackY + 9, lab.x, top0 + 2));
      // Mask the gridlines behind the label so the text reads cleanly.
      laneEls.push(rect(b0 - 3, top0 + 3, v.w + 6, v.h - 4, 'dot-mask'));
      laneEls.push(text(tx, top0 + 17, lab.e.date, { size: 16, cls: 'mono', anchor }));
      v.ls.forEach((l, k) => laneEls.push(text(tx, top0 + 38 + k * 20, l, { size: 16, cls: 'ink2', anchor })));
      bottom = Math.max(bottom, top0 + 38 + (v.ls.length - 1) * 20);
    });
    for (const lab of labels) {
      const main = lab.e.date === lane.main;
      laneEls.push(
        main
          ? `<circle class="dot-on" cx="${r1(lab.x)}" cy="${trackY}" r="8"/>`
          : `<circle class="dot-off" cx="${r1(lab.x)}" cy="${trackY}" r="7"/>`,
      );
    }
    y = bottom + 16;
  }
  const lanesBottom = y;
  laneEls.push(line(M, lanesBottom, POSTER_W - M, lanesBottom));
  assertFits(fig.id, lanesBottom, lanesBottomLimit + 30);

  // Year gridlines and the two markers, behind the lanes.
  const grid = [];
  for (const { xa } of years.slice(1)) grid.push(line(xa, yearY + 10, xa, lanesBottom));
  grid.push(line(actX, markerY + 8, actX, lanesBottom, 'axis'));
  grid.push(line(omniX, markerY + 8, omniX, lanesBottom, 'stroke-arrow', ' stroke-dasharray="5 4"'));

  els.push(...axisEls, ...grid, ...yearEls, ...laneEls, ...legend, ...f.els);
  return open(fig, lang) + close(els);
}

// =============================================================== roles == //

/** Display text per EU role id: chapter 18's table ("Who you are in the value chain"). */
const ROLE_TEXT = {
  en: {
    'eu-gpai-provider': {
      q: 'Do you place a general-purpose AI model on the market?',
      name: 'GPAI provider',
      duties: 'Arts. 53 to 55',
      evidence: 'Model documentation, training summary, copyright policy',
    },
    'eu-provider': {
      q: 'Do you develop an AI system, or have it developed, and place it on the market or into service under your own name?',
      name: 'Provider',
      duties: 'Arts. 8 to 17, 43 to 49, 72, 73; 50(1), 50(2)',
      evidence: 'Technical documentation, QMS records, eval results, declaration',
    },
    'eu-product-manufacturer': {
      q: 'Do you place a high-risk AI safety component on the market with your Annex I, Section A product, under your name?',
      name: 'Product manufacturer',
      duties: 'Provider duties (Art. 16)',
      evidence: 'As a provider',
    },
    'eu-importer': {
      q: "Are you established in the EU and placing on the market a system that bears a non-EU provider's name?",
      name: 'Importer',
      duties: 'Art. 23: verify; keep copies 10 years',
      evidence: 'Import verification record',
    },
    'eu-distributor': {
      q: 'Do you make the system available on the EU market without being its provider or importer?',
      name: 'Distributor',
      duties: 'Art. 24: verify marking and documents',
      evidence: 'Distribution check record',
    },
    'eu-authorised-representative': {
      q: 'Are you established in the EU and acting under a written mandate from a non-EU provider?',
      name: 'Authorised representative',
      duties: 'Arts. 22, 54: verify; keep documents 10 years',
      evidence: 'Mandate; document copies',
    },
    'eu-deployer': {
      q: 'Do you use the system under your own authority, other than for purely personal, non-professional use?',
      name: 'Deployer',
      duties: 'Arts. 26, 27, 50(3), 50(4), 86',
      evidence: 'Use logs, oversight roster, FRIA, notices',
    },
  },
  es: {
    'eu-gpai-provider': {
      q: '¿Introduce en el mercado un modelo de IA de uso general?',
      name: 'Proveedor de modelos de uso general',
      duties: 'Arts. 53 a 55',
      evidence: 'Documentación del modelo, resumen del entrenamiento, política de derechos de autor',
    },
    'eu-provider': {
      q: '¿Desarrolla un sistema de IA, o lo encarga, y lo introduce en el mercado o lo pone en servicio con su propio nombre?',
      name: 'Proveedor',
      duties: 'Arts. 8 a 17, 43 a 49, 72, 73; 50(1), 50(2)',
      evidence: 'Documentación técnica, registros de calidad, evaluaciones, declaración',
    },
    'eu-product-manufacturer': {
      q: '¿Introduce en el mercado, con su nombre, un componente de seguridad de IA de alto riesgo junto con su producto del anexo I, sección A?',
      name: 'Fabricante del producto',
      duties: 'Obligaciones del proveedor (art. 16)',
      evidence: 'Como un proveedor',
    },
    'eu-importer': {
      q: '¿Está establecido en la UE e introduce en el mercado un sistema con el nombre de un proveedor de fuera de la UE?',
      name: 'Importador',
      duties: 'Art. 23: verificar; conservar copias 10 años',
      evidence: 'Registro de verificación de la importación',
    },
    'eu-distributor': {
      q: '¿Comercializa el sistema en la UE sin ser su proveedor ni su importador?',
      name: 'Distribuidor',
      duties: 'Art. 24: verificar marcado y documentos',
      evidence: 'Registro de comprobación de la distribución',
    },
    'eu-authorised-representative': {
      q: '¿Está establecido en la UE y actúa con un mandato escrito de un proveedor de fuera de la UE?',
      name: 'Representante autorizado',
      duties: 'Arts. 22, 54: verificar; conservar documentos 10 años',
      evidence: 'Mandato; copias de los documentos',
    },
    'eu-deployer': {
      q: '¿Usa el sistema bajo su propia autoridad, salvo para una actividad personal de carácter no profesional?',
      name: 'Responsable del despliegue',
      duties: 'Arts. 26, 27, 50(3), 50(4), 86',
      evidence: 'Registros de uso, turnos de supervisión, evaluación de impacto (art. 27), avisos',
    },
  },
};

/** Question order, top to bottom: who makes it, who moves it, who uses it. */
const ROLE_ORDER = [
  'eu-provider',
  'eu-gpai-provider',
  'eu-product-manufacturer',
  'eu-importer',
  'eu-distributor',
  'eu-authorised-representative',
  'eu-deployer',
];

const ROLES_STR = {
  en: {
    kicker: 'EU AI Act · operators under Art. 3(8), for one system',
    title: 'Which role do you hold for this system?',
    intro: 'Ask every question: roles name tasks, not organisations, so you can hold several for one system.',
    yes: 'yes',
    art25: 'Art. 25',
    triggersHead:
      'Art. 25(1): a distributor, importer, deployer or other third party becomes the provider of a high-risk system, with all Art. 16 duties, when it:',
    triggers: {
      a: 'puts its name or trademark on a high-risk system already on the market;',
      b: 'makes a substantial modification to a high-risk system that stays high-risk;',
      c: 'changes the intended purpose of a system, including a general-purpose AI system, so that it becomes high-risk.',
    },
    cooperate:
      'The initial provider must cooperate (Art. 25(2)); a written agreement fixes the information and access (Art. 25(4)).',
    registry: 'Registry entry per system: its roles as a list, such as ["provider", "deployer"]',
    none: 'No role applies: not an operator for this system. An affected person holds protections, not duties (Art. 2(1)(g)).',
    source: 'Source: chapter 18, Who you are in the value chain (role table and Article 25).',
    stamp: (d) => `As of ${d} · a reading aid, not legal advice; illustrative, not a claim of conformity`,
  },
  es: {
    kicker: 'Reglamento de IA de la UE · operadores del art. 3(8), para un sistema',
    title: '¿Qué rol tiene en este sistema?',
    intro: 'Responda a todas: los roles nombran tareas, no organizaciones, y puede tener varios en un sistema.',
    yes: 'sí',
    art25: 'Art. 25',
    triggersHead:
      'Art. 25(1): un distribuidor, importador, responsable del despliegue u otro tercero pasa a ser el proveedor de un sistema de alto riesgo, con todas las obligaciones del art. 16, cuando:',
    triggers: {
      a: 'pone su nombre o marca en un sistema de alto riesgo ya introducido en el mercado;',
      b: 'hace una modificación sustancial de un sistema de alto riesgo que sigue siéndolo;',
      c: 'cambia la finalidad prevista de un sistema, incluido un sistema de IA de uso general, de modo que pasa a ser de alto riesgo.',
    },
    cooperate:
      'El proveedor inicial debe cooperar (art. 25(2)); un acuerdo escrito fija la información y el acceso (art. 25(4)).',
    registry: 'Registro por sistema: sus roles como lista, p. ej. ["provider", "deployer"]',
    none: 'Ningún rol: no es operador de este sistema. La persona afectada tiene protecciones, no obligaciones (art. 2(1)(g)).',
    source: 'Fuente: capítulo 18, Who you are in the value chain (tabla de roles y artículo 25).',
    stamp: (d) => `A fecha de ${d} · orientativo: no es asesoramiento jurídico ni declaración de conformidad`,
  },
};

/** The operator-role poster, from roles.ts (EU rows) and chapter 18. */
export function buildRolesPoster(roles, fig, lang = 'en') {
  const S = ROLES_STR[lang];
  const T = ROLE_TEXT[lang];
  const eu = roles.filter((r) => r.regime === 'eu-ai-act');
  for (const r of eu) {
    if (!ROLE_ORDER.includes(r.id) && r.id !== 'eu-downstream-provider') {
      console.warn(`figures-build: warning: ${fig.id}: roles.ts has "${r.id}", not drawn on the poster.`);
    }
  }
  const order = ROLE_ORDER.filter((id) => eu.some((r) => r.id === id));
  const byId = (id) => eu.find((r) => r.id === id);
  const refOf = (r) => {
    const refs = [...String(r.sourceRef).matchAll(/Art\.\s*[\dA-Za-z().]+/g)].map((m) => m[0]);
    const last = refs.at(-1) ?? r.sourceRef;
    return lang === 'es' ? last.replace(/^Art\./, 'art.') : last;
  };

  const els = [];
  const h = header(S);
  els.push(...h.els);
  const f = footer([S.source, S.stamp(fig.asOf)]);

  const SPINE = M + 14; // x of the question spine
  const QX = SPINE + 30; // question text left
  const QW = 344; // question text width
  const CX0 = QX + QW + 46; // card left
  const CX1 = POSTER_W - M - 76; // card right
  const LX = POSTER_W - M - 30; // Art. 25 loop x
  const CW = CX1 - CX0;
  const PAD = 12;

  /** Baselines of a card's lines, relative to its top, and its height. */
  const cardLayout = (name, nameFits, duties, evidence) => {
    const nameY = PAD + 17;
    const refY = nameFits ? nameY + (name.length - 1) * 24 : nameY + (name.length - 1) * 24 + 22;
    const dutiesY = refY + 23;
    const evidenceY = dutiesY + (duties.length - 1) * 20 + 24;
    const height = evidenceY + (evidence.length - 1) * 20 + PAD + 2;
    return { nameY, refY, dutiesY, evidenceY, height };
  };

  let y = h.bottom + 26;
  const rows = [];
  for (const id of order) {
    const role = byId(id);
    const t = T[id];
    const q = wrapTo(t.q, QW, 17);
    const name = wrapTo(t.name, CW - 2 * PAD, 19, 'disp');
    const ref = refOf(role);
    const refW = measure(ref, 16, 'mono');
    // The article reference shares the name's last line when it fits.
    const nameFits = measure(name.at(-1), 19, 'disp') + refW + 12 <= CW - 2 * PAD;
    const duties = wrapTo(t.duties, CW - 2 * PAD, 16);
    const evidence = wrapTo(t.evidence, CW - 2 * PAD - 24, 16);
    const layout = cardLayout(name, nameFits, duties, evidence);
    const qH = q.length * 22;
    const rowH = Math.max(layout.height, qH + 8);
    rows.push({ id, role, q, name, ref, nameFits, duties, evidence, layout, cardH: layout.height, top: y, rowH });
    y += rowH + 8;
  }

  const spineTop = rows[0].top + rows[0].rowH / 2;
  const regY = y + 8;
  const loopRoles = rows.filter((row) =>
    (row.role.becomesProviderWhen ?? []).some((s) => /Art\. 25\(1\)/.test(s)),
  );
  const provider = rows.find((row) => row.id === 'eu-provider');

  // Spine, from the first question to the registry.
  els.push(line(SPINE, spineTop, SPINE, regY - 4, 'stroke-arrow'));
  els.push(arrowHead(SPINE, regY + 2, 'd'));

  for (const row of rows) {
    const cy = row.top + row.rowH / 2;
    // Question: gate glyph on the spine, text to its right.
    els.push(`<rect class="dot-mask" x="${SPINE - 13}" y="${cy - 13}" width="26" height="26"/>`);
    els.push(diamond(SPINE, cy));
    const qTop = cy - (row.q.length * 22) / 2 + 16;
    row.q.forEach((l, i) => els.push(text(QX, qTop + i * 22, l, { size: 17 })));
    // Yes edge to the card.
    const ex0 = QX + QW + 8;
    els.push(line(ex0, cy, CX0 - 6, cy, 'stroke-arrow'));
    els.push(arrowHead(CX0 - 2, cy, 'r'));
    els.push(text((ex0 + CX0) / 2, cy - 8, S.yes, { size: 16, cls: 'mono muted', anchor: 'middle' }));
    // Card.
    const top = cy - row.cardH / 2;
    const L = row.layout;
    els.push(rect(CX0, top, CW, row.cardH, 'panel', 8));
    row.name.forEach((l, i) => els.push(text(CX0 + PAD, top + L.nameY + i * 24, l, { size: 19, cls: 'disp' })));
    if (row.nameFits) {
      els.push(text(CX1 - PAD, top + L.refY, row.ref, { size: 16, cls: 'mono muted', anchor: 'end' }));
    } else {
      els.push(text(CX0 + PAD, top + L.refY, row.ref, { size: 16, cls: 'mono muted' }));
    }
    row.duties.forEach((l, i) => els.push(text(CX0 + PAD, top + L.dutiesY + i * 20, l, { size: 16 })));
    els.push(evidenceGlyph(CX0 + PAD, top + L.evidenceY - 14));
    row.evidence.forEach((l, i) =>
      els.push(text(CX0 + PAD + 24, top + L.evidenceY + i * 20, l, { size: 16, cls: 'ink2' })),
    );
    row.cy = cy;
  }

  // Terminal: the registry entry (evidence), and what "no role" means.
  els.push(cylinder(SPINE, regY + 6));
  const reg = para(QX, regY + 24, S.registry, POSTER_W - M - QX - 80, { size: 17, cls: 'disp', lh: 24 });
  els.push(...reg.els);
  const none = para(QX, reg.last + 26, S.none, POSTER_W - M - QX - 80, { size: 16, cls: 'ink2', lh: 21 });
  els.push(...none.els);

  // Art. 25 box.
  const boxTop = none.last + 26;
  const inner = POSTER_W - 2 * M - 2 * PAD;
  const head = wrapTo(S.triggersHead, inner, 17);
  const trig = ['a', 'b', 'c'].map((k) => wrapTo(S.triggers[k], inner - 40, 16));
  const coop = wrapTo(S.cooperate, inner, 16);
  const boxH =
    PAD + head.length * 22 + 6 + trig.reduce((s, t) => s + t.length * 20 + 4, 0) + 6 + coop.length * 20 + PAD;
  els.push(rect(M, boxTop, POSTER_W - 2 * M, boxH, 'panel', 8, ' stroke-dasharray="6 4"'));
  let by = boxTop + PAD + 16;
  head.forEach((l, i) => els.push(text(M + PAD, by + i * 22, l, { size: 17 })));
  by += head.length * 22 + 4;
  trig.forEach((t, k) => {
    els.push(text(M + PAD + 8, by, `(${'abc'[k]})`, { size: 16, cls: 'mono' }));
    t.forEach((l, i) => els.push(text(M + PAD + 40, by + i * 20, l, { size: 16 })));
    by += t.length * 20 + 4;
  });
  by += 4;
  coop.forEach((l, i) => els.push(text(M + PAD, by + i * 20, l, { size: 16, cls: 'ink2' })));
  assertFits(fig.id, boxTop + boxH, f.top);

  // The Art. 25 loop: from each role that can become the provider, into the
  // provider card; the loop's foot runs down to the box that lists the triggers.
  if (provider && loopRoles.length) {
    els.push(line(LX, provider.cy, LX, boxTop, 'stroke-arrow'));
    for (const row of loopRoles) els.push(line(CX1, row.cy, LX, row.cy, 'stroke-arrow'));
    els.push(line(LX, provider.cy, CX1 + 8, provider.cy, 'stroke-arrow'));
    els.push(arrowHead(CX1 + 2, provider.cy, 'l'));
    const labW = measure(S.art25, 16, 'mono') + 12;
    // Label the loop in the gap under the provider card, clear of the stubs.
    const labY = provider.top + provider.rowH + 5;
    els.push(rect(LX - labW / 2, labY - 15, labW, 26, 'dot-mask', 4));
    els.push(text(LX, labY + 4, S.art25, { size: 16, cls: 'mono', anchor: 'middle' }));
  }

  els.push(...f.els);
  return open(fig, lang) + close(els);
}

// ============================================================== ladder == //

const LADDER_STR = {
  en: {
    kicker: 'EU AI Act · four rungs for AI systems by intended purpose; GPAI models on a separate track',
    title: 'Which rung is the system on?',
    intro: '',
    colMain: 'The ladder (chapter 18)',
    colSide: 'Other regimes, not equivalents',
    test: 'Test',
    then: 'Then',
    from: 'From',
    prohibited: {
      name: 'Prohibited',
      arts: 'Art. 5',
      test: 'The practice is on the Art. 5 list, now ten points.',
      then: 'It may not be placed on the market, put into service or used.',
      from: (a, b) => `${a}; new points ${b}`,
    },
    high: {
      name: 'High-risk',
      arts: 'Arts. 6 to 49',
      then: 'Requirements of Arts. 8 to 15, provider and deployer duties, conformity assessment.',
      annexI: {
        name: 'Through products, Art. 6(1)',
        text: 'A safety component of an Annex I product, or the product itself, that needs a third-party conformity assessment.',
        note: 'The Omnibus narrowed "safety component".',
      },
      annexIII: {
        name: 'Through use, Art. 6(2)',
        text: 'The intended purpose falls in one of the eight Annex III areas.',
        filter: 'Filter, Art. 6(3)',
        filterText:
          'No significant risk of harm, and one of four conditions: a narrow procedural task; it improves a completed human activity; it detects patterns without replacing human review; a preparatory task.',
        out: 'Filtered out: document the assessment, register it (Arts. 6(4), 49(2)).',
        override: 'Override: an Annex III system that profiles natural persons is always high-risk.',
      },
      from: (d) => d,
    },
    transparency: {
      name: 'Transparency',
      arts: 'Art. 50',
      test: 'It interacts with people, generates synthetic content, recognises emotions, categorises biometrically or produces deep fakes.',
      then: 'Disclose, mark, label, whatever else the system is: an Annex III chatbot sits on two rungs.',
      from: (d) => d,
    },
    minimal: {
      name: 'Minimal',
      arts: 'Arts. 4, 95',
      test: 'Everything else.',
      then: 'No specific duties beyond AI literacy (Art. 4); voluntary codes (Art. 95). A legal category, not a risk verdict.',
      from: (a, b) => `${a}; Art. 4 reworded ${b}`,
    },
    gpai: {
      name: 'Separate track: GPAI models',
      arts: 'Arts. 51 to 56',
      test: 'Model generality; systemic risk by capability, compute or designation.',
      then: 'Model-level duties. A system built on the model is an AI system (Art. 3(66)) and sits on the ladder.',
      from: (a, b) => `${a}; Commission enforcement ${b}`,
    },
    side: {
      texas: {
        name: 'Texas TRAIGA (HB 149)',
        text: 'Intent-based prohibitions: behaviour manipulation, government social scoring, unlawful discrimination, certain sexual content. In force 2026-01-01.',
      },
      korea: {
        name: 'Korea AI Basic Act',
        text: 'High-impact AI: a listed Art. 2(4) area, such as hiring and loan screening, that may significantly affect, or pose a risk to, life, physical safety or fundamental rights. The operator reviews it in advance; MSIT may confirm (Art. 33).',
      },
      colorado: {
        name: 'Colorado SB 26-189',
        text: 'A transparency note: deployers of ADMT in consequential decisions give notice of its use and a plain-language explanation within 30 days of an adverse outcome. From 2027-01-01.',
      },
      california: {
        name: 'California SB 53',
        text: 'Frontier developers: models trained above 10^26 operations; large frontier developers above USD 500M revenue. In force 2026-01-01.',
      },
    },
    source: 'Source: chapter 18, The risk ladder; chapter 21 (other regimes); dates from chapter 08.',
    stamp: (d) => `As of ${d} · a reading aid, not legal advice; illustrative, not a claim of conformity`,
  },
  es: {
    kicker: 'Reglamento de IA · cuatro peldaños por finalidad prevista; modelos de uso general aparte',
    title: '¿En qué peldaño está el sistema?',
    intro: '',
    colMain: 'La escalera (capítulo 18)',
    colSide: 'Otros regímenes, no equivalentes',
    test: 'Prueba',
    then: 'Efecto',
    from: 'Desde',
    prohibited: {
      name: 'Prohibido',
      arts: 'Art. 5',
      test: 'La práctica está en la lista del art. 5, que ahora tiene diez puntos.',
      then: 'No puede introducirse en el mercado, ponerse en servicio ni usarse.',
      from: (a, b) => `${a}; nuevos puntos ${b}`,
    },
    high: {
      name: 'Alto riesgo',
      arts: 'Arts. 6 a 49',
      then: 'Requisitos de los arts. 8 a 15, obligaciones de proveedores y responsables del despliegue, evaluación de la conformidad.',
      annexI: {
        name: 'Por producto, art. 6(1)',
        text: 'Componente de seguridad de un producto del anexo I, o el propio producto, con evaluación de la conformidad por terceros.',
        note: 'El Ómnibus acotó el «componente de seguridad».',
      },
      annexIII: {
        name: 'Por su uso, art. 6(2)',
        text: 'La finalidad prevista está en uno de los ocho ámbitos del anexo III.',
        filter: 'Filtro, art. 6(3)',
        filterText:
          'Sin riesgo importante y con una de cuatro condiciones: tarea de procedimiento limitada; mejora una actividad humana previa; detecta patrones sin sustituir la revisión humana; tarea preparatoria.',
        out: 'Si se filtra: se documenta y se registra (arts. 6(4), 49(2)).',
        override: 'Excepción: un sistema del anexo III que elabora perfiles de personas físicas siempre es de alto riesgo.',
      },
      from: (d) => d,
    },
    transparency: {
      name: 'Transparencia',
      arts: 'Art. 50',
      test: 'Interactúa con personas, genera contenido sintético, reconoce emociones, categoriza biométricamente o produce ultrasuplantaciones.',
      then: 'Informar, marcar y etiquetar, sea cual sea el resto: un chatbot del anexo III está en dos peldaños.',
      from: (d) => d,
    },
    minimal: {
      name: 'Mínimo',
      arts: 'Arts. 4, 95',
      test: 'Todo lo demás.',
      then: 'Sin obligaciones específicas salvo la alfabetización en IA (art. 4); códigos voluntarios (art. 95). Categoría jurídica, no veredicto de riesgo.',
      from: (a, b) => `${a}; art. 4 reformulado ${b}`,
    },
    gpai: {
      name: 'Vía aparte: modelos de uso general',
      arts: 'Arts. 51 a 56',
      test: 'Generalidad del modelo; riesgo sistémico por capacidad, cómputo o designación.',
      then: 'Obligaciones del modelo. Un sistema basado en el modelo es un sistema de IA (art. 3(66)) y va en la escalera.',
      from: (a, b) => `${a}; ejecución por la Comisión ${b}`,
    },
    side: {
      texas: {
        name: 'Texas, TRAIGA (HB 149)',
        text: 'Prohibiciones según la intención: manipulación de la conducta, puntuación social por el gobierno, discriminación ilícita, cierto contenido sexual. En vigor desde 2026-01-01.',
      },
      korea: {
        name: 'Corea, Ley Básica de IA',
        text: 'IA de alto impacto: un ámbito de la lista del art. 2(4), como la contratación o la concesión de préstamos, que puede afectar de forma significativa a la vida, la seguridad física o los derechos fundamentales, o ponerlos en riesgo. El operador lo revisa antes; el MSIT puede confirmarlo (art. 33).',
      },
      colorado: {
        name: 'Colorado SB 26-189',
        text: 'Nota de transparencia: quien despliega ADMT en decisiones trascendentes avisa de su uso y explica con claridad, en 30 días, un resultado adverso. Desde 2027-01-01.',
      },
      california: {
        name: 'California SB 53',
        text: 'Desarrolladores de frontera: modelos entrenados con más de 10^26 operaciones; grandes desarrolladores de frontera con ingresos de más de 500 M USD. En vigor desde 2026-01-01.',
      },
    },
    source: 'Fuente: capítulo 18 (The risk ladder), capítulo 21 (otros regímenes), fechas del 08.',
    stamp: (d) => `A fecha de ${d} · orientativo: no es asesoramiento jurídico ni declaración de conformidad`,
  },
};

/** The dates the ladder prints, read from the frameworks.ts rows (stable ids). */
export function ladderDates(obligations) {
  const row = (id) => {
    const found = obligations.find((o) => o.id === id);
    if (!found) throw new Error(`posters: risk ladder needs obligation ${id} in frameworks.ts`);
    return found;
  };
  const step = (id, test) => row(id).milestones?.find(test)?.date;
  const art5 = row('AIGE-OBL-EUAIA-ART5');
  const art6 = row('AIGE-OBL-EUAIA-ART6');
  const art4 = row('AIGE-OBL-EUAIA-ART4');
  const art50 = row('AIGE-OBL-EUAIA-ART50');
  const art53 = row('AIGE-OBL-EUAIA-ART53');
  const dates = {
    prohibited: [art5.appliesFrom, step(art5.id, (m) => m.systemClass?.includes('prohibited'))],
    annexIII: art6.appliesFrom,
    annexI: step(art6.id, (m) => m.systemClass?.includes('high-risk-annex-i')),
    transparency: art50.appliesFrom,
    minimal: [art4.appliesFrom, art4.milestones?.[0]?.date],
    gpai: [art53.appliesFrom, art53.milestones?.[0]?.date],
  };
  for (const [key, value] of Object.entries(dates)) {
    for (const d of [value].flat()) {
      if (!d) throw new Error(`posters: risk ladder date "${key}" missing in frameworks.ts`);
    }
  }
  return dates;
}

/** The risk-ladder poster. */
export function buildLadderPoster(obligations, fig, lang = 'en') {
  const S = LADDER_STR[lang];
  const D = ladderDates(obligations);
  const els = [];
  const h = header(S);
  els.push(...h.els);
  const f = footer([S.source, S.stamp(fig.asOf)]);

  const RAIL_A = M + 2;
  const RAIL_B = M + 16;
  const MX0 = M + 28; // rung left
  const MX1 = 628; // rung right
  const SX0 = 648; // side-note left
  const SX1 = POSTER_W - M;
  const MW = MX1 - MX0;
  const SW = SX1 - SX0;
  const IN = 12; // rung padding
  const TW = MW - 2 * IN; // text width inside a rung

  let y = h.bottom + 30;
  els.push(text(MX0, y, S.colMain, { size: 16, cls: 'mono muted' }));
  const sideHead = para(SX0, y, S.colSide, SW, { size: 16, cls: 'mono muted', lh: 20 });
  els.push(...sideHead.els);
  y = sideHead.last + 16;
  const railTop = y;
  let sideY = y; // the side column fills top-down, never above its rung

  /** Side note box at `top`; returns its elements and bottom. */
  const sideNote = (rungTop, note) => {
    const top = Math.max(rungTop, sideY);
    const name = para(SX0 + 12, top + 24, note.name, SW - 24, { size: 17, cls: 'disp', lh: 22 });
    const body = para(SX0 + 12, name.last + 23, note.text, SW - 24, { size: 16, cls: 'ink2', lh: 20 });
    const bottom = body.last + 14;
    sideY = bottom + 12;
    return [rect(SX0, top, SW, bottom - top, 'panel', 6), ...name.els, ...body.els];
  };

  /** Rung header: name and articles on the left; returns elements and next baseline. */
  const rungHead = (top, R, inverse) => {
    const out = [];
    if (inverse) out.push(rect(MX0, top, MW, 38, 'glyph-fill', 6));
    out.push(text(MX0 + IN, top + 27, R.name, { size: 22, cls: inverse ? 'disp inv-tx' : 'disp' }));
    out.push(
      text(MX1 - IN, top + 26, R.arts, { size: 16, cls: inverse ? 'mono inv-tx' : 'mono muted', anchor: 'end' }),
    );
    return out;
  };

  /** A plain rung: header, the dates, the test and what follows. */
  const rung = (top, R, fromText, { inverse = false, dashed = false } = {}) => {
    const out = rungHead(top, R, inverse);
    let yy = top + 38 + 24;
    out.push(text(MX0 + IN, yy, `${S.from} ${fromText}`, { size: 16, cls: 'mono' }));
    const a = para(MX0 + IN, yy + 23, R.test, TW, { size: 16, lh: 20 });
    out.push(...a.els);
    const b = para(MX0 + IN, a.last + 22, R.then, TW, { size: 16, cls: 'ink2', lh: 20 });
    out.push(...b.els);
    const bottom = b.last + 16;
    out.unshift(rect(MX0, top, MW, bottom - top, 'panel', 8, dashed ? ' stroke-dasharray="6 4"' : ''));
    return { els: out, bottom };
  };

  const rungTops = [];
  // 1. Prohibited (an ink band: nothing makes it lawful), with the Texas note.
  rungTops.push(y);
  let r = rung(y, S.prohibited, S.prohibited.from(...D.prohibited), { inverse: true });
  els.push(...r.els, ...sideNote(y, S.side.texas));
  y = r.bottom + 10;

  // 2. High-risk: what follows, then the two routes stacked, the Annex III
  //    route with its Art. 6(3) filter (the gate) and the profiling override.
  rungTops.push(y);
  {
    const H = S.high;
    const top = y;
    const out = rungHead(top, H, false);
    const t = para(MX0 + IN, top + 38 + 22, H.then, TW, { size: 16, cls: 'ink2', lh: 20 });
    out.push(...t.els);
    const bx0 = MX0 + IN;
    const bw = TW;
    const bin = bx0 + 12;
    const btw = bw - 24;
    // Annex I route.
    const i0 = t.last + 16;
    const i1 = para(bin, i0 + 46, H.annexI.text, btw, { size: 16, lh: 20 });
    const i2 = para(bin, i1.last + 20, H.annexI.note, btw, { size: 16, cls: 'ink2', lh: 20 });
    const i3 = i2.last + 14;
    out.push(rect(bx0, i0, bw, i3 - i0, 'cell-empty cell', 6));
    out.push(text(bin, i0 + 24, H.annexI.name, { size: 17, cls: 'disp' }));
    out.push(text(bx0 + bw - 12, i0 + 24, `${S.from} ${D.annexI}`, { size: 16, cls: 'mono', anchor: 'end' }));
    out.push(...i1.els, ...i2.els);
    // Annex III route.
    const a0 = i3 + 10;
    const a1 = para(bin, a0 + 46, H.annexIII.text, btw, { size: 16, lh: 20 });
    const gateY = a1.last + 24;
    const a2 = para(bin + 30, gateY + 5, H.annexIII.filter, btw - 30, { size: 16, cls: 'mono', lh: 20 });
    const a3 = para(bin + 30, a2.last + 21, H.annexIII.filterText, btw - 30, { size: 16, cls: 'ink2', lh: 20 });
    const a4 = para(bin + 30, a3.last + 22, H.annexIII.out, btw - 30, { size: 16, lh: 20 });
    const a5 = para(bin, a4.last + 24, H.annexIII.override, btw, { size: 16, cls: 'disp', lh: 20 });
    const a6 = a5.last + 14;
    out.push(rect(bx0, a0, bw, a6 - a0, 'cell-empty cell', 6));
    out.push(text(bin, a0 + 24, H.annexIII.name, { size: 17, cls: 'disp' }));
    out.push(text(bx0 + bw - 12, a0 + 24, `${S.from} ${D.annexIII}`, { size: 16, cls: 'mono', anchor: 'end' }));
    out.push(...a1.els);
    out.push(diamond(bin + 10, gateY));
    out.push(line(bin + 10, gateY + 11, bin + 10, a4.last + 2, 'stroke-arrow'));
    out.push(...a2.els, ...a3.els, ...a4.els, ...a5.els);
    const bottom = a6 + 12;
    out.unshift(rect(MX0, top, MW, bottom - top, 'panel', 8));
    // The high-risk rung is the heavy one: an ink outline over the panel.
    out.push(rect(MX0, top, MW, bottom - top, 'glyph', 8));
    els.push(...out, ...sideNote(top, S.side.korea));
    y = bottom + 10;
  }

  // 3. Transparency, with the Colorado transparency note.
  rungTops.push(y);
  r = rung(y, S.transparency, S.transparency.from(D.transparency));
  els.push(...r.els, ...sideNote(y, S.side.colorado));
  y = r.bottom + 10;

  // 4. Minimal (no side note; the note above may run beside it).
  rungTops.push(y);
  r = rung(y, S.minimal, S.minimal.from(...D.minimal));
  els.push(...r.els);
  const railBottom = r.bottom;
  y = r.bottom + 16;

  // The GPAI track, beside the ladder rather than on it: dashed, off the rails.
  const gTop = Math.max(y, sideY - 12);
  r = rung(gTop, S.gpai, S.gpai.from(...D.gpai), { dashed: true });
  els.push(...r.els, ...sideNote(gTop, S.side.california));
  const end = Math.max(r.bottom, sideY - 12);
  assertFits(fig.id, end, f.top);

  // Rails and rungs of the ladder, behind the content.
  const rails = [line(RAIL_A, railTop, RAIL_A, railBottom, 'axis'), line(RAIL_B, railTop, RAIL_B, railBottom, 'axis')];
  for (const t of rungTops) rails.push(line(RAIL_A, t + 19, RAIL_B, t + 19, 'axis'));
  rails.push(line(RAIL_A, railBottom, RAIL_B, railBottom, 'axis'));

  return open(fig, lang) + close([...rails, ...els, ...f.els]);
}

// ============================================================== matrix == //

const MATRIX_STR = {
  kicker: 'Chapter 15 · Governing deployment and use',
  title: 'What each combination adds',
  intro:
    'Read each cell as the one control the combination adds on top of its row and its column. Illustrative, not a claim of conformity: the controls a real deployment needs follow from its risk tier, its obligations and its failure modes.',
  across: 'Model type',
  groups: { hosting: 'Where it runs', adaptation: 'How it is adapted' },
  note: 'Model types run across and deployment options down: the chapter prints the same matrix turned a quarter. Hybrid hosting, prompting only and distillation have their own rows in the chapter tables, not a cell here.',
  source: 'Source: chapter 15, Governing deployment and use: The model-type by deployment-option matrix.',
  stamp: (d) => `As of ${d} · illustrative, not a claim of conformity`,
};

/**
 * The model-type by deployment-option matrix poster (English only). Chapter 15
 * prints model types as rows; the portrait page turns it a quarter: the six
 * options run down the page in their two groups (where it runs, how it is
 * adapted) and the five model types run across, so each cell is wide enough to
 * read. Every cell is the chapter's own wording from deployment-options.ts.
 */
export function buildMatrixPoster(deployment, fig) {
  const { matrixRows, matrixColumns, matrix, options } = deployment;
  const S = MATRIX_STR;
  const els = [];
  const h = header(S);
  els.push(...h.els);
  const f = footer([S.source, S.stamp(fig.asOf)]);

  const RW = 124; // option-label column
  const GX0 = M + RW + 10;
  const GAP = 8;
  const n = matrixRows.length;
  const colW = (POSTER_W - M - GX0 - GAP * (n - 1)) / n;
  const colX = (i) => GX0 + i * (colW + GAP);
  const PADC = 10;
  const FS = 17;
  const LH = 21;

  let y = h.bottom + 36;
  // Column headers: the model types.
  const heads = matrixRows.map((r) => wrapTo(r.label, colW - 4, 18, 'disp'));
  const headLines = Math.max(...heads.map((l) => l.length));
  els.push(text(M, y, S.across, { size: 16, cls: 'mono muted' }));
  heads.forEach((ls, i) => ls.forEach((l, k) => els.push(text(colX(i), y + k * 22, l, { size: 18, cls: 'disp' }))));
  y += (headLines - 1) * 22 + 16;

  // Option rows, in their groups (the option's dimension in deployment-options.ts).
  const dimOf = (id) => options.find((o) => o.id === id)?.dimension ?? 'hosting';
  let group = null;
  for (const option of matrixColumns) {
    const dim = dimOf(option.id);
    if (dim !== group) {
      group = dim;
      y += 30;
      els.push(text(M, y, S.groups[dim] ?? dim, { size: 16, cls: 'mono muted' }));
      els.push(line(M, y + 9, POSTER_W - M, y + 9, 'axis'));
      y += 12;
    }
    const label = wrapTo(option.label, RW - 6, 18, 'disp');
    const cells = matrixRows.map((row) => {
      const cell = matrix.find((m) => m.row === row.id && m.column === option.id);
      return wrapTo(cell ? cell.control : '', colW - 2 * PADC, FS);
    });
    const lines = Math.max(...cells.map((c) => c.length));
    const rowH = lines * LH + 2 * PADC + 4;
    label.forEach((l, k) => els.push(text(M, y + 8 + PADC + 16 + k * 22, l, { size: 18, cls: 'disp' })));
    cells.forEach((ls, i) => {
      els.push(rect(colX(i), y + 8, colW, rowH, 'panel', 5));
      ls.forEach((l, k) => els.push(text(colX(i) + PADC, y + 8 + PADC + 15 + k * LH, l, { size: FS })));
    });
    y += rowH + 8;
  }
  const note = para(M, y + 34, S.note, POSTER_W - 2 * M, { size: 16, cls: 'ink2', lh: 21 });
  els.push(line(M, y + 8, POSTER_W - M, y + 8));
  els.push(...note.els);
  assertFits(fig.id, note.last, f.top);

  els.push(...f.els);
  return open(fig, 'en') + close(els);
}

/** Every poster the build generates: [figure id, builder(data, fig)]. */
export const POSTERS = [
  ['eu-ai-act-timeline', (d, fig) => buildTimelinePoster(d.obligations, fig, 'en')],
  ['eu-ai-act-operator-roles', (d, fig) => buildRolesPoster(d.roles, fig, 'en')],
  ['eu-ai-act-risk-ladder', (d, fig) => buildLadderPoster(d.obligations, fig, 'en')],
  ['deployment-option-matrix', (d, fig) => buildMatrixPoster(d.deployment, fig)],
  ['eu-ai-act-timeline-es', (d, fig) => buildTimelinePoster(d.obligations, fig, 'es')],
  ['eu-ai-act-operator-roles-es', (d, fig) => buildRolesPoster(d.roles, fig, 'es')],
  ['eu-ai-act-risk-ladder-es', (d, fig) => buildLadderPoster(d.obligations, fig, 'es')],
];
