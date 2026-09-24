// evidence-chain.ts: the obligation-to-evidence chain, the header figure of
// every /obligations/<id> page, generated at build time from the register row.
// The chain reads left to right (wide) or top to bottom (narrow): the clause,
// who it binds, from when, the artefact that evidences it, the stack layer that
// holds the artefact and, as the terminal node, the evidence record the output
// is filed as (the JSON Schemas under /schemas whose x-evidences names the
// clause, else the common evidence record). Under the chain, the clauses of
// other frameworks filed under the same crosswalk topics.
//
// VISUAL-GUIDE rules: six nodes and five edges; labels cut to four words (the
// text alternative and the fact list below the figure keep the full wording);
// colours only through the .figc token classes (layer chips use --lN/--lN-ink);
// the glyph vocabulary of §1.7 (building = the regulator's clause, person = the
// duty holder, document with a check = the evidence record); "As of" printed in
// the image; nothing the row does not state.
import type { Obligation } from '../data/frameworks';
import { appliesStatusLabels } from '../data/frameworks';
import { layers } from '../data/stack';
import { schemaOrder } from '../data/templates';
import { getSchemas, type SchemaSummary } from './schemas-library';
import { crosswalkFor, euArticles, frameworkOf } from './obligations';

export type ChainKind = 'clause' | 'holder' | 'date' | 'artefact' | 'layer' | 'evidence';

export interface ChainNode {
  kind: ChainKind;
  /** The node's name in the figure ("Clause", "Duty holder"...). */
  kicker: string;
  /** The value, cut for the figure (at most four words per line). */
  lines: string[];
  /** One sentence in the row's own words, for the text alternative. */
  full: string;
}

export interface Chain {
  nodes: ChainNode[];
  layers: number[];
  /** Records whose schema names the clause (empty: the common evidence record). */
  records: SchemaSummary[];
  /** "ISO 42001 A.6"-style labels of the crosswalk siblings, core first. */
  siblings: string[];
  /** The siblings grouped by instrument, in order of first appearance. */
  siblingFrameworks: { name: string; clauses: string[] }[];
  asOf: string;
}

const STOP = new Set(['of', 'and', 'the', 'for', 'with', 'from', 'to', 'a', 'an', 'in', 'on', 'per', 'that', 'by', 'or', 'as']);

/** The first item of a list-like cell (before a ";" or ": "), without
 *  parentheses, cut to four words. */
export function shortLabel(text: string, maxWords = 4): string {
  const first = text.split(/;\s*|:\s/)[0].replace(/\s*\([^)]*\)/g, '').trim();
  const words = first.split(/\s+/).filter(Boolean);
  if (words.length <= maxWords) return first;
  const cut = words.slice(0, maxWords);
  while (cut.length > 1 && STOP.has(cut[cut.length - 1].toLowerCase())) cut.pop();
  return `${cut.join(' ')}…`;
}

/** Greedy word wrap to `max` characters, at most `maxLines` lines. */
export function wrap(text: string, max: number, maxLines: number): string[] {
  const lines: string[] = [];
  let line = '';
  for (const word of text.split(/\s+/).filter(Boolean)) {
    const next = line ? `${line} ${word}` : word;
    if (next.length <= max || !line) line = next;
    else {
      lines.push(line);
      line = word;
    }
  }
  if (line) lines.push(line);
  if (lines.length <= maxLines) return lines;
  const kept = lines.slice(0, maxLines);
  kept[maxLines - 1] = `${kept[maxLines - 1].replace(/…$/, '')}…`;
  return kept;
}

/** The citation keys a row's clause appears under in the schemas' x-evidences. */
function evidenceKeys(row: Obligation): string[] {
  switch (row.frameworkId) {
    case 'eu-ai-act':
      return euArticles(row.clause).map((a) => `EU AI Act Art. ${a}`);
    case 'gpai-code-of-practice':
      return [`GPAI Code of Practice, ${row.clause.replace(/ chapter$/, '')}`];
    case 'iso-42001':
      return [`ISO/IEC 42001 ${row.clause}`];
    case 'iso-23894':
      return ['ISO/IEC 23894'];
    case 'nist-ai-rmf':
      return [`NIST AI RMF ${row.clause}`];
    default:
      return [];
  }
}

/** A key names an evidence entry when the entry starts with it and the next
 *  character does not continue the identifier ("Art. 4" is not "Art. 4a"). */
function names(entry: string, key: string): boolean {
  return entry === key || (entry.startsWith(key) && !/[A-Za-z0-9.]/.test(entry.charAt(key.length)));
}

const words = (text: string) =>
  new Set(
    text
      .toLowerCase()
      .split(/[^a-z0-9]+/)
      .filter((w) => w.length > 2 && !STOP.has(w)),
  );

/**
 * The published record schemas that evidence the row, best first: the record
 * whose title shares most words with the row's artefact ("Risk register as
 * code" files a "Risk register entry"), then one that names the clause itself
 * rather than a paragraph of it, then one that lists the clause earlier in its
 * x-evidences, then the library's reading order.
 */
export function recordsFor(row: Obligation): SchemaSummary[] {
  const keys = evidenceKeys(row);
  const artefact = words(row.artefact);
  const rank = (schema: SchemaSummary) => {
    const hits = schema.evidences
      .map((entry, index) => ({ entry, index }))
      .filter(({ entry }) => keys.some((key) => names(entry, key)));
    if (!hits.length) return null;
    const title = words(schema.title);
    const i = schemaOrder.indexOf(schema.name);
    return [
      -[...title].filter((w) => artefact.has(w)).length,
      hits.some(({ entry }) => keys.includes(entry)) ? 0 : 1,
      hits[0].index,
      i === -1 ? schemaOrder.length : i,
    ];
  };
  return getSchemas()
    .map((schema) => ({ schema, key: rank(schema) }))
    .filter((entry): entry is { schema: SchemaSummary; key: number[] } => entry.key !== null)
    .sort((a, b) => {
      for (let i = 0; i < a.key.length; i += 1) if (a.key[i] !== b.key[i]) return a.key[i] - b.key[i];
      return 0;
    })
    .map((entry) => entry.schema);
}

const layerName = (n: number) => layers.find((layer) => layer.n === n)?.name ?? '';
const layerFull = (n: number) => `Layer 0${n} ${layerName(n)}`;

export function chainFor(row: Obligation): Chain {
  const fw = frameworkOf(row);
  const holder = row.dutyHolder ?? row.scope;
  const records = recordsFor(row);
  const status = appliesStatusLabels[row.appliesStatus];
  const later = (row.milestones ?? []).map((m) => `${m.date} (${m.note})`);
  const siblingRefs = crosswalkFor(row).flatMap((t) => t.siblings);
  const siblings = [...new Set(siblingRefs.map((s) => `${s.frameworkName} ${s.label}`))];
  const byFramework = new Map<string, Set<string>>();
  for (const s of siblingRefs) {
    byFramework.set(s.frameworkName, (byFramework.get(s.frameworkName) ?? new Set()).add(s.label));
  }
  const siblingFrameworks = [...byFramework.entries()].map(([name, clauses]) => ({ name, clauses: [...clauses] }));
  const nodes: ChainNode[] = [
    {
      kind: 'clause',
      kicker: 'Clause',
      lines: [fw.short, shortLabel(row.clause, 4)],
      full: `Clause: ${fw.name}, ${row.clause}. It asks for: ${row.requirement}.`,
    },
    {
      kind: 'holder',
      kicker: 'Duty holder',
      lines: [holder ? shortLabel(holder, 4) : 'Not stated'],
      full: holder
        ? `Duty holder: ${holder}${row.authority ? `; supervised by ${row.authority}` : ''}.`
        : 'Duty holder: the register states none; the instrument binds only those who adopt it.',
    },
    {
      kind: 'date',
      kicker: 'Applies from',
      lines: [row.appliesFrom ?? 'No date', status],
      full: `Applies from: ${row.appliesFrom ?? 'no date'} (${status}${row.appliesNote ? `; ${row.appliesNote}` : ''})${later.length ? `; later dates ${later.join('; ')}` : ''}.`,
    },
    {
      kind: 'artefact',
      kicker: 'Artefact',
      lines: [shortLabel(row.artefact, 4)],
      full: `Artefact that evidences it: ${row.artefact}.`,
    },
    {
      kind: 'layer',
      kicker: row.layerN.length > 1 ? 'Layers' : 'Layer',
      lines: row.layerN.map((n) => (row.layerN.length > 1 ? `Layer 0${n}` : layerFull(n))),
      full: `Stack ${row.layerN.length > 1 ? 'layers' : 'layer'}: ${row.layerN.map(layerFull).join(' and ')}.`,
    },
    {
      kind: 'evidence',
      kicker: 'Evidence record',
      lines: records.length
        ? [shortLabel(records[0].title, 4), ...(records.length > 1 ? [`+${records.length - 1} more`] : [])]
        : ['Evidence record v1'],
      full: records.length
        ? `Evidence record: filed as ${records.map((r) => r.title).join(', ')} (JSON Schemas whose x-evidences names this clause).`
        : 'Evidence record: the common evidence record every control writes, with this clause in its obligation field.',
    },
  ];
  return { nodes, layers: [...row.layerN], records, siblings, siblingFrameworks, asOf: row.reviewed };
}

// ---- SVG ----------------------------------------------------------------------

const esc = (text: string) =>
  text.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');

/** The glyph of a node, drawn in a 24 × 24 box at (x, y) with currentColor. */
function glyph(kind: ChainKind, x: number, y: number): string {
  const t = (d: string, cls = 'glyph') => `<path class="${cls}" d="${d}" transform="translate(${x} ${y})"/>`;
  switch (kind) {
    case 'clause': // the regulator's building
      return t('M2 9 L12 2 L22 9 Z M5 11 v8 M10 11 v8 M14 11 v8 M19 11 v8 M3 21 h18');
    case 'holder': // a person
      return `<circle class="glyph" cx="${x + 12}" cy="${y + 7}" r="4"/>${t('M4 22 c0 -6 3.5 -9 8 -9 s8 3 8 9')}`;
    case 'date': // a calendar
      return t('M3 5 h18 v16 h-18 Z M3 10 h18 M8 2 v5 M16 2 v5');
    case 'artefact': // a build artefact: a package
      return t('M3 7 L12 3 L21 7 V17 L12 21 L3 17 Z M3 7 L12 11 L21 7 M12 11 V21');
    case 'layer': // stacked layers
      return t('M4 5 h16 M4 12 h16 M4 19 h16');
    case 'evidence': // a document with a check
      return `${t('M5 2 h10 l5 5 v15 h-15 Z M15 2 v5 h5')}${t('M8 14 l3 3 l6 -7', 'glyph-check')}`;
  }
}

export interface ChainSvgOptions {
  /** 'row' reads left to right (wide screens); 'column' top to bottom. */
  layout: 'row' | 'column';
  idPrefix: string;
  title: string;
  desc: string;
}

/** The chain as inline SVG markup (class "figc": colours come from the tokens). */
export function chainSvg(chain: Chain, { layout, idPrefix, title, desc }: ChainSvgOptions): string {
  const row = layout === 'row';
  const W = row ? 900 : 340;
  const nodeW = row ? 130 : 324;
  const gap = row ? 20 : 16;
  const x0 = row ? 10 : 8;
  const y0 = 8;
  const single = chain.layers.length === 1;
  // Node heights: fixed across a row; in a column the one-layer node is taller,
  // so the layer's full name gets its own line under the chip.
  const heights = chain.nodes.map((node) => (row ? 124 : node.kind === 'layer' && single ? 78 : 56));
  const tops: number[] = [];
  heights.reduce((top, height, i) => {
    tops[i] = row ? y0 : top;
    return top + height + gap;
  }, y0);
  const out: string[] = [];
  const text = (x: number, y: number, value: string, cls = '', size = 13.5, weight = 400) =>
    out.push(
      `<text x="${x}" y="${y}" font-size="${size}"${weight !== 400 ? ` font-weight="${weight}"` : ''}${cls ? ` class="${cls}"` : ''}>${esc(value)}</text>`,
    );

  chain.nodes.forEach((node, i) => {
    const x = row ? x0 + i * (nodeW + gap) : x0;
    const y = tops[i];
    const terminal = node.kind === 'evidence';
    out.push(
      `<rect class="panel" x="${x}" y="${y}" width="${nodeW}" height="${heights[i]}" rx="8"${terminal ? ' style="stroke:var(--ink);stroke-width:2"' : ''}/>`,
      glyph(node.kind, x + 10, y + (row ? 10 : 16)),
    );
    // Wide: the kicker sits under the glyph; narrow: beside it.
    const kx = x + 42;
    text(row ? x + 10 : kx, row ? y + 50 : y + 23, node.kicker, 'mono muted', 12);
    if (node.kind === 'layer') {
      // One chip per layer, filled with the layer token; one layer also gets
      // its exact name under the chip.
      chain.layers.forEach((n, j) => {
        const cx = row ? x + 10 : kx + j * 82;
        const cy = row ? y + 58 + j * 22 : y + 30;
        out.push(`<rect class="l${n}-bg l${n}-st" x="${cx}" y="${cy}" width="76" height="19" rx="5" stroke-width="1"/>`);
        text(cx + 8, cy + 14, `Layer 0${n}`, `l${n}-tx`, 12.5, 600);
      });
      if (single) {
        const name = layerName(chain.layers[0]);
        const lines = row ? wrap(name, 16, 3) : [name];
        lines.forEach((line, j) => text(row ? x + 10 : kx, row ? y + 93 + j * 14 : y + 68, line, '', 12.5, 600));
      }
      return;
    }
    const lines = row
      ? node.lines.flatMap((l) => wrap(l, 15, 2)).slice(0, 3)
      : wrap(node.lines.join(' · '), 36, 1);
    lines.forEach((line, j) => {
      const secondary = node.kind === 'date' ? j > 0 : node.kind === 'evidence' ? line.startsWith('+') : false;
      text(row ? x + 10 : kx, row ? y + 72 + j * 18 : y + 44, line, secondary ? 'ink2' : '', 13, secondary ? 400 : 600);
    });
  });

  // The edges: one arrow between consecutive nodes.
  for (let i = 0; i < chain.nodes.length - 1; i += 1) {
    if (row) {
      const ax = x0 + (i + 1) * nodeW + i * gap;
      const ay = y0 + heights[i] / 2;
      out.push(
        `<line class="stroke-arrow" x1="${ax + 2}" y1="${ay}" x2="${ax + gap - 7}" y2="${ay}"/>`,
        `<path class="arrow" d="M${ax + gap - 8} ${ay - 5} l7 5 l-7 5 z"/>`,
      );
    } else {
      const ay = tops[i] + heights[i];
      const ax = x0 + 20;
      out.push(
        `<line class="stroke-arrow" x1="${ax}" y1="${ay + 2}" x2="${ax}" y2="${ay + gap - 7}"/>`,
        `<path class="arrow" d="M${ax - 5} ${ay + gap - 8} l5 7 l5 -7 z"/>`,
      );
    }
  }

  // The crosswalk siblings, under a hairline, and the stamp.
  const last = chain.nodes.length - 1;
  let y = (row ? y0 + heights[0] : tops[last] + heights[last]) + 26;
  out.push(`<line class="rule" x1="${x0}" y1="${y - 12}" x2="${W - x0}" y2="${y - 12}"/>`);
  const fws = chain.siblingFrameworks;
  const shown = fws.slice(0, row ? 7 : 5).map((f) => f.name);
  const more = fws.length - shown.length;
  const siblingText = fws.length
    ? `Same topic in ${fws.length === 1 ? 'one other framework' : `${fws.length} frameworks`} (${chain.siblings.length} ${chain.siblings.length === 1 ? 'clause' : 'clauses'}): ${shown.join(', ')}${more > 0 ? ` and ${more} more` : ''}`
    : 'Same topic elsewhere: no crosswalk topic files this clause yet';
  for (const line of wrap(siblingText, row ? 120 : 44, 3)) {
    text(x0, y + 4, line, 'ink2', 13);
    y += 18;
  }
  const stamp = row
    ? [`As of ${chain.asOf} · illustrative, not a claim of conformity`]
    : [`As of ${chain.asOf}`, 'illustrative, not a claim of conformity'];
  for (const line of stamp) {
    text(x0, y + 12, line, 'mono muted', 12);
    y += 16;
  }
  const H = y + 6;

  return [
    `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${W} ${H}" width="${W}" height="${H}" class="figc ob-chain-${layout}" role="img" aria-labelledby="${idPrefix}-t ${idPrefix}-d">`,
    `<title id="${idPrefix}-t">${esc(title)}</title>`,
    `<desc id="${idPrefix}-d">${esc(desc)}</desc>`,
    ...out,
    '</svg>',
  ].join('');
}
