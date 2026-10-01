// flow.ts: the chain primitives, a mechanism read in one direction and ending
// in the evidence it leaves (VISUAL-GUIDE §1.5), on the engine of the
// obligation evidence chain (src/lib/evidence-chain.ts): one panel per stage,
// each with its glyph (glyphs.ts, §1.7), a kicker and its items, one arrow
// between consecutive panels; 'row' reads left to right (wide), 'column' top
// to bottom (narrow, NARROW_WIDTH). The terminal panel is always the evidence: a
// heavier outline, the document-with-check glyph in the layer colour of the
// first artefact, and a layer chip before each artefact. The one diamond of
// the figure is its gate: the event of a bow-tie, the decision of a control.
//
//   bowTie: preventive controls -> event (failure mode) -> detective controls
//           -> responsive controls -> harms -> evidence artefacts
//   controlChain: failure modes -> enforcement points on the four-stage
//           pipeline -> verification -> decision -> evidence artefacts
//
// An empty control stage of a bow-tie is left out (a case without an incident
// note has preventive controls only); the event and the evidence must not be
// empty. Each panel draws at most `maxItems` items (default 3) and a "+N more"
// line; the table lists every item. Item labels wrap to two lines and throw,
// naming the label, when they still do not fit; linked items keep the 24 px
// pointer-target spacing. No runtime imports.
import {
  assemble,
  markStyles,
  minText,
  NARROW_WIDTH,
  nonEmpty,
  r1,
  shape,
  table,
  targets,
  text,
  textWidth,
  words,
  wrapText,
  layerWord,
  type Cell,
  type ChartBase,
  type ChartOutput,
  type MarkState,
  type Tone,
} from './core';
import { glyph, type GlyphKind } from './glyphs';

export interface FlowItem {
  /** Drawn label (wrapped to two lines inside the panel). */
  label: string;
  /** Full name for the table and the link's name (default: the label). */
  name?: string;
  href?: string;
  /** Third table column ("deny", a date...). */
  detail?: string;
}

export interface EvidenceItem extends FlowItem {
  /** The stack layer that holds the artefact (1 to 5). */
  layer: 1 | 2 | 3 | 4 | 5;
}

export interface FlowBase extends ChartBase {
  /** 'row' (default, 900 wide) or 'column' (the narrow variant, NARROW_WIDTH wide). */
  orientation?: 'row' | 'column';
  /** Items drawn per panel before a "+N more" line (default 3). */
  maxItems?: number;
}

export type BowTieStage = 'preventive' | 'event' | 'detective' | 'responsive' | 'harms' | 'evidence';

export interface BowTieInput extends FlowBase {
  preventive: FlowItem[];
  /** The top event: the failure mode (drawn with the gate diamond). */
  event: FlowItem[];
  detective?: FlowItem[];
  responsive?: FlowItem[];
  harms: FlowItem[];
  evidence: EvidenceItem[];
  /** Panel kickers (defaults: Preventive, Failure mode, Detective,
   *  Responsive, Harms, Evidence). */
  kickers?: Partial<Record<BowTieStage, string>>;
}

export type PipelineStage = 'pre_merge' | 'deploy' | 'runtime' | 'periodic';
export type ControlChainStage = 'failure' | 'enforcement' | 'verification' | 'decision' | 'evidence';

export interface ControlChainInput extends FlowBase {
  failureModes: FlowItem[];
  /** The enforcement points the control acts at, lit on the four-stage track. */
  enforcement: readonly PipelineStage[];
  /** Printed names of the four stages (default: the keys, in mono). */
  stageLabels?: Partial<Record<PipelineStage, string>>;
  /** Verification procedures ("Inspect", "Test"); empty prints "None". */
  verification: FlowItem[];
  /** The response on failure, drawn as the gate diamond in `state`: the
   *  caller maps the effect (for example deny 'filled', alert 'outline',
   *  to be specified 'hatched', decided by isResponseToSpecify). */
  decision: FlowItem & { state?: MarkState };
  evidence: EvidenceItem[];
  kickers?: Partial<Record<ControlChainStage, string>>;
}

const PIPELINE: readonly PipelineStage[] = ['pre_merge', 'deploy', 'runtime', 'periodic'];

const FLOW_WORDS = {
  en: {
    preventive: 'Preventive',
    event: 'Failure mode',
    detective: 'Detective',
    responsive: 'Responsive',
    harms: 'Harms',
    evidence: 'Evidence',
    failure: 'Failure modes',
    enforcement: 'Enforcement',
    verification: 'Verification',
    decision: 'Decision',
    more: 'more',
  },
  es: {
    preventive: 'Preventivos',
    event: 'Modo de fallo',
    detective: 'Detectivos',
    responsive: 'De respuesta',
    harms: 'Daños',
    evidence: 'Evidencia',
    failure: 'Modos de fallo',
    enforcement: 'Aplicación',
    verification: 'Verificación',
    decision: 'Decisión',
    more: 'más',
  },
};

// ---- the shared engine -------------------------------------------------------

interface Panel {
  kicker: string;
  /** Draws the glyph; `marks` are the chart's own, so a hatch it uses gets
   *  its pattern in the chart's <defs>. */
  glyph: (x: number, y: number, marks: ReturnType<typeof markStyles>) => string;
  items: FlowItem[];
  /** Layer chip before each item (the evidence panel). */
  tones?: Tone[];
  terminal?: boolean;
  /** A drawn body instead of items (the pipeline track). */
  track?: { label: string; on: boolean }[];
  /** Table rows of the panel (default: one per item). */
  rows?: Cell[][];
}

const L = 12;
const LINE = 16;
const TRACK = 18;

function flow(input: FlowBase, panels: Panel[], cls: string, where: string): ChartOutput {
  const row = input.orientation !== 'column';
  const W = input.width ?? (row ? 900 : NARROW_WIDTH);
  const sm = minText(W);
  const w = words(input.lang);
  const more = FLOW_WORDS[input.lang === 'es' ? 'es' : 'en'].more;
  const max = input.maxItems ?? 3;
  const n = panels.length;
  const gap = row ? 26 : 22;
  const panelW = row ? (W - 2 * L - (n - 1) * gap) / n : W - 2 * L;
  // Row: glyph, kicker under it, items under the kicker. Column: glyph at the
  // left, kicker and items beside it.
  const inset = row ? 10 : 44;
  const innerW = panelW - inset - 10;
  if (innerW < 80) throw new Error(`charts(${where}): ${n} panels leave ${Math.floor(innerW)}px per panel at width ${W}; widen the chart or use orientation 'column'`);
  const hits = targets(where);
  const marks = markStyles(input.id);

  // Measure every panel first: in a row all panels share the tallest height.
  const laid = panels.map((p) => {
    const kicker = wrapText(p.kicker, innerW, sm, 'mono', 2, 'kicker');
    const chip = p.tones ? 14 : 0;
    const shown = p.items.slice(0, max);
    const blocks = shown.map((item) => {
      const lines = wrapText(item.label, innerW - chip, 13, 'body', 2, `${p.kicker} item`);
      return { item, lines, h: Math.max(item.href ? 24 : 0, lines.length * LINE + 6) };
    });
    const extra = p.items.length - shown.length;
    // Top of the panel to the first item (mirrors the kicker placement below).
    const headH = row ? 46 + kicker.length * 14 : 22 + kicker.length * 14;
    const bodyH = p.track
      ? p.track.length * TRACK + 4
      : blocks.reduce((s, b) => s + b.h, 0) + (extra > 0 ? 20 : 0) + (p.items.length ? 0 : 20);
    return { p, kicker, blocks, extra, headH, h: headH + bodyH + 6 };
  });
  const top = 8;
  const rowH = Math.max(...laid.map((x) => x.h));
  const out: string[] = [];
  let cursor = top;
  const boxes: { x: number; y: number; h: number }[] = [];

  laid.forEach((x, i) => {
    const px = row ? L + i * (panelW + gap) : L;
    const py = row ? top : cursor;
    const ph = row ? rowH : x.h;
    cursor = py + ph + gap;
    boxes.push({ x: px, y: py, h: ph });
    out.push(
      `<rect class="${x.p.terminal ? 'panel-end' : 'panel'}" x="${r1(px)}" y="${r1(py)}" width="${r1(panelW)}" height="${r1(ph)}" rx="8"/>`,
      x.p.glyph(px + 10, py + 10, marks),
    );
    const kx = row ? px + 10 : px + inset;
    let ty = row ? py + 50 : py + 24;
    x.kicker.forEach((line, j) => out.push(text(kx, ty + j * 14, line, { size: sm, cls: 'mono muted', where: 'kicker' })));
    ty += (x.kicker.length - 1) * 14 + (row ? 10 : 12);
    const ix = kx;
    if (x.p.track) {
      // The four stages on a track: lit ones solid, the others outlined.
      const first = ty + 6;
      out.push(`<line class="rule" x1="${r1(ix + 5)}" y1="${r1(first)}" x2="${r1(ix + 5)}" y2="${r1(first + (x.p.track.length - 1) * TRACK)}"/>`);
      x.p.track.forEach((stage, j) => {
        const cy = first + j * TRACK;
        out.push(
          `<rect x="${r1(ix)}" y="${r1(cy - 5)}" width="10" height="10" rx="2" ${marks.attrs(stage.on ? 'filled' : 'outline', 0)}/>`,
          text(ix + 16, cy + 4, stage.label, { size: sm, cls: stage.on ? 'mono' : 'mono ink2', weight: stage.on ? 600 : 400, where: 'stage label' }),
        );
      });
      return;
    }
    if (!x.p.items.length) {
      out.push(text(ix, ty + 12, w.none, { size: 12.5, cls: 'ink2', where: 'none' }));
      return;
    }
    x.blocks.forEach((b, j) => {
      const chip = x.p.tones ? 14 : 0;
      const els: string[] = [];
      if (x.p.tones) {
        els.push(`<rect x="${r1(ix)}" y="${r1(ty + 4)}" width="8" height="8" rx="1.5" ${marks.attrs('filled', x.p.tones[j])}/>`);
      }
      b.lines.forEach((line, k) => els.push(text(ix + chip, ty + 12 + k * LINE, line, { size: 13, weight: 600, where: 'item' })));
      const name = b.item.name ?? b.item.label;
      const tw = Math.max(...b.lines.map((l) => textWidth(l, 13))) + chip;
      const box = { x: ix, y: ty, w: Math.max(tw, 1), h: b.lines.length * LINE };
      out.push(b.item.href ? hits.mark((inner) => `${inner}${els.join('')}`, name, box, { href: b.item.href }) : els.join(''));
      ty += b.h;
    });
    if (x.extra > 0) out.push(text(ix, ty + 12, `+${x.extra} ${more}`, { size: 12.5, cls: 'ink2', where: 'more' }));
  });
  const bottom = row ? top + rowH : boxes[boxes.length - 1].y + boxes[boxes.length - 1].h;

  // One arrow between consecutive panels.
  for (let i = 0; i < n - 1; i += 1) {
    if (row) {
      const ax = boxes[i].x + panelW;
      const ay = top + rowH / 2;
      out.push(
        `<line class="stroke-arrow" x1="${r1(ax + 2)}" y1="${r1(ay)}" x2="${r1(ax + gap - 7)}" y2="${r1(ay)}"/>`,
        `<path class="arrow" d="M${r1(ax + gap - 8)} ${r1(ay - 5)} l7 5 l-7 5 z"/>`,
      );
    } else {
      const ay = boxes[i].y + boxes[i].h;
      const ax = L + 22;
      out.push(
        `<line class="stroke-arrow" x1="${ax}" y1="${r1(ay + 2)}" x2="${ax}" y2="${r1(ay + gap - 7)}"/>`,
        `<path class="arrow" d="M${ax - 5} ${r1(ay + gap - 8)} l5 7 l5 -7 z"/>`,
      );
    }
  }

  const rows = panels.flatMap(
    (p): Cell[][] =>
      p.rows ?? (p.items.length ? p.items.map((item) => [p.kicker, item.name ?? item.label, item.detail ?? '']) : [[p.kicker, w.none, '']]),
  );
  const { svg, height } = assemble({
    base: input,
    width: W,
    bottom,
    body: out,
    defs: marks.defs(),
    role: panels.some((p) => p.items.some((i) => i.href)) ? 'group' : 'img',
    cls: `ch-flow ${row ? 'ch-row' : 'ch-column'} ${cls}`,
  });
  return {
    svg,
    table: table(input.tableCaption ?? input.title, [w.step, w.item, w.detail], rows),
    width: W,
    height,
  };
}

function evidencePanel(kicker: string, evidence: EvidenceItem[], lang: ChartBase['lang']): Panel {
  return {
    kicker,
    glyph: (x, y) => glyph('evidence', x, y, { tone: evidence[0].layer }),
    items: evidence,
    tones: evidence.map((e) => e.layer),
    terminal: true,
    rows: evidence.map((e) => [kicker, e.name ?? e.label, e.detail ?? layerWord(e.layer, lang)]),
  };
}

// ---- bowTie -------------------------------------------------------------------

/**
 * A bow-tie: preventive controls, the event (the failure mode, drawn with the
 * gate diamond), detective and responsive controls, the harms, and the
 * evidence artefacts as the terminal panel. Table: Step | Item | Detail (the
 * evidence detail defaults to "Layer 0N").
 */
export function bowTie(input: BowTieInput): ChartOutput {
  const where = `bowTie ${input.id}`;
  nonEmpty(input.event, 'event', where);
  nonEmpty(input.evidence, 'evidence', where);
  const k = { ...FLOW_WORDS[input.lang === 'es' ? 'es' : 'en'], ...input.kickers };
  const controls = (key: 'preventive' | 'detective' | 'responsive', items: FlowItem[] = []): Panel[] =>
    items.length ? [{ kicker: k[key], glyph: (x, y) => glyph('card', x, y), items }] : [];
  const panels: Panel[] = [
    ...controls('preventive', input.preventive),
    { kicker: k.event, glyph: (x, y) => glyph('gate', x, y), items: input.event },
    ...controls('detective', input.detective),
    ...controls('responsive', input.responsive),
    ...(input.harms.length ? [{ kicker: k.harms, glyph: (x: number, y: number) => glyph('warning', x, y), items: input.harms }] : []),
    evidencePanel(k.evidence, input.evidence, input.lang),
  ];
  if (panels.length < 3) throw new Error(`charts(${where}): a bow-tie needs at least one control or harm besides the event and the evidence`);
  return flow(input, panels, 'ch-bowtie', where);
}

// ---- controlChain -------------------------------------------------------------

/**
 * A control's anatomy: failure modes, the enforcement points lit on the
 * four-stage pipeline (pre_merge, deploy, runtime, periodic), verification,
 * the decision (the gate diamond, drawn in the caller's state) and the
 * evidence artefacts as the terminal panel. Table: Step | Item | Detail, with
 * one row per lit enforcement point.
 */
export function controlChain(input: ControlChainInput): ChartOutput {
  const where = `controlChain ${input.id}`;
  nonEmpty(input.failureModes, 'failure modes', where);
  nonEmpty(input.enforcement, 'enforcement points', where);
  nonEmpty(input.evidence, 'evidence', where);
  for (const point of input.enforcement) {
    if (!PIPELINE.includes(point)) throw new Error(`charts(${where}): "${point}" is not an enforcement point`);
  }
  const k = { ...FLOW_WORDS[input.lang === 'es' ? 'es' : 'en'], ...input.kickers };
  const label = (s: PipelineStage) => input.stageLabels?.[s] ?? s;
  const d = input.decision;
  const panels: Panel[] = [
    { kicker: k.failure, glyph: (x, y) => glyph('warning', x, y), items: input.failureModes },
    {
      kicker: k.enforcement,
      glyph: (x, y) => glyph('pipeline', x, y),
      items: [],
      track: PIPELINE.map((s) => ({ label: label(s), on: input.enforcement.includes(s) })),
      rows: PIPELINE.filter((s) => input.enforcement.includes(s)).map((s) => [k.enforcement, label(s), '']),
    },
    { kicker: k.verification, glyph: (x, y) => glyph('magnifier', x, y), items: input.verification },
    {
      kicker: k.decision,
      // The gate: a diamond mark whose fill carries the state of the response.
      glyph: (x, y, marks) => shape('diamond', x + 12, y + 12, 9, marks.attrs(d.state, 0)),
      items: [d],
    },
    evidencePanel(k.evidence, input.evidence, input.lang),
  ];
  return flow(input, panels, 'ch-anatomy', where);
}
