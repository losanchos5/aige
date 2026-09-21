#!/usr/bin/env node
// map-build.mjs: generate "the map of the discipline" as a deterministic
// two-sided tree, in two variants from one layout:
//   - web:      colour by site tokens (classes only, no hex); inlined into /map
//               and re-emitted by figures-build.mjs as src/figures/discipline-map.svg.
//   - portrait: a standalone SVG for the LinkedIn infographic — role="img",
//               light-theme hex inline, viewBox 1200 wide, no <style> except the
//               three font families, no background rect, no title/footer, links
//               absolute against site.url. Written where the CLI says.
//
//   node scripts/map-build.mjs --web      --out <path>              # debug web SVG
//   node scripts/map-build.mjs --portrait --out <path> [--meta <path.json>]
//
// The map data lives in src/data/map.ts (pure); this script loads it and the
// source data modules via the shared TS loader and calls buildMap().
import { writeFileSync, mkdirSync } from 'node:fs';
import { resolve, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import { loadTs } from './lib/load-ts.mjs';
import { esc, textW, wrap } from './lib/svg-text.mjs';

const HERE = dirname(fileURLToPath(import.meta.url));
const SITE = resolve(HERE, '..');

// Light-theme hex, mirroring src/styles/tokens.css, for the portrait variant.
const HEX = {
  bg: '#F6F4EE',
  ink: '#15171C',
  muted: '#676C75',
  line: '#E3DFD5',
  panel: '#F1EEE6',
  '--l1': '#CBD8F0',
  '--l2': '#CFDCD3',
  '--l3': '#EDD4D8',
  '--l4': '#F1DAB4',
  '--l5': '#D1E4BC',
  '--l1-ink': '#1F3A63',
  '--l2-ink': '#25463F',
  '--l3-ink': '#5C2B3B',
  '--l4-ink': '#5A3D15',
  '--l5-ink': '#2E4A22',
};

export const WEB_OPTS = {
  variant: 'web',
  W: 1248,
  margin: 8,
  centerW: 200,
  branchW: 170,
  leafW: 270,
  gapA: 36,
  gapB: 36,
  fsCenter: 20,
  fsBranch: 15,
  fsLeaf: 13,
  fsChip: 12,
  pillH: 28,
  chipH: 20,
  leafGap: 8,
  branchGap: 36,
  showChips: true,
};

// Portrait dims are tuned so the five columns fit exactly inside 1200px (the
// brief's nominal figures do not, since a centred two-sided tree needs the
// centre plus two branch and two leaf columns to fit the fixed 1200 width).
export const PORTRAIT_OPTS = {
  variant: 'portrait',
  W: 1200,
  margin: 24,
  centerW: 210,
  branchW: 180,
  leafW: 235,
  gapA: 26,
  gapB: 30,
  fsCenter: 24,
  fsBranch: 17,
  fsLeaf: 15,
  fsChip: 12,
  pillH: 34,
  chipH: 20,
  leafGap: 10,
  branchGap: 40,
  showChips: false,
};

const MARGIN_V = 28;
const PAD_X = 11;
const BADGE_W = 22;
const CHIP_PAD_X = 8;
const CHIP_GAP = 6;
const CHIP_ROW = 24;

const round = (n) => Math.round(n * 10) / 10;
const clsOf = (colorVar) => (colorVar ? colorVar.slice(2) : ''); // '--l3' -> 'l3'

// -------------------------------------------------------------- load map -- //

/** Load the data modules and build the MapDef; returns { map, site }. */
export async function loadMap(siteRoot = SITE) {
  const [
    valuesM,
    stackM,
    patternsM,
    roleM,
    maturityM,
    frameworksM,
    crosswalkM,
    pathM,
    siteM,
    mapM,
  ] = await Promise.all([
    loadTs('src/data/values.ts', siteRoot),
    loadTs('src/data/stack.ts', siteRoot),
    loadTs('src/data/patterns.ts', siteRoot),
    loadTs('src/data/role.ts', siteRoot),
    loadTs('src/data/maturity.ts', siteRoot),
    loadTs('src/data/frameworks.ts', siteRoot),
    loadTs('src/data/crosswalk.ts', siteRoot),
    loadTs('src/data/path.ts', siteRoot),
    loadTs('src/data/site.ts', siteRoot),
    loadTs('src/data/map.ts', siteRoot),
  ]);

  const sources = {
    site: { name: siteM.site.name, url: siteM.site.url },
    values: valuesM.values,
    principles: valuesM.principles,
    problems: valuesM.problems,
    layers: stackM.layers,
    minimumViableStack: stackM.minimumViableStack,
    patterns: patternsM.patterns,
    workflows: roleM.workflows,
    waysIn: roleM.waysIn,
    levels: maturityM.levels,
    frameworks: frameworksM.frameworks,
    topics: crosswalkM.topics,
    columns: crosswalkM.columns,
    stages: pathM.stages,
    nodes: pathM.nodes,
  };
  return { map: mapM.buildMap(sources), site: sources.site };
}

// ----------------------------------------------------------------- layout -- //

function columns(opts) {
  const { W, centerW, branchW, leafW, gapA, gapB } = opts;
  const cx = W / 2;
  const centerLeft = cx - centerW / 2;
  const centerRight = cx + centerW / 2;
  const rightBranchLeft = centerRight + gapB;
  const rightLeafLeft = rightBranchLeft + branchW + gapA;
  const leftBranchRight = centerLeft - gapB;
  const leftBranchLeft = leftBranchRight - branchW;
  const leftLeafRight = leftBranchLeft - gapA;
  const leftLeafLeft = leftLeafRight - leafW;
  return {
    cx,
    centerLeft,
    centerRight,
    rightBranchLeft,
    rightLeafLeft,
    leftBranchLeft,
    leftBranchRight,
    leftLeafLeft,
    leftLeafRight,
  };
}

/** Wrap a label to fit `usableW`, falling back to `short`; throw if it cannot. */
function fitLines(node, usableW, fontPx) {
  let lines = wrap(node.label, usableW, fontPx);
  if (lines.length > 2 && node.short) lines = wrap(node.short, usableW, fontPx);
  const tooWide = lines.some((l) => textW(l, fontPx) > usableW + 0.5);
  if (lines.length > 2 || tooWide) {
    throw new Error(`map-build: label too long for column: ${node.id}`);
  }
  return lines;
}

/** Lay out a leaf's inline chips within the column; returns chips + row count. */
function layoutChips(children, opts) {
  const chips = [];
  let x = 0;
  let row = 0;
  for (const child of children) {
    let text = child.label;
    let w = textW(text, opts.fsChip) + CHIP_PAD_X * 2;
    if (w > opts.leafW && child.short) {
      text = child.short;
      w = textW(text, opts.fsChip) + CHIP_PAD_X * 2;
    }
    if (w > opts.leafW) {
      throw new Error(`map-build: label too long for column: ${child.id}`);
    }
    if (x > 0 && x + w > opts.leafW) {
      x = 0;
      row += 1;
    }
    chips.push({ node: child, text, dx: x, row, w });
    x += w + CHIP_GAP;
  }
  return { chips, rows: children.length ? row + 1 : 0 };
}

/** Measure one leaf: its pill lines, height and (web) chips. */
function measureLeaf(node, opts) {
  const usableW = opts.leafW - 2 * PAD_X - (node.badge != null ? BADGE_W : 0);
  const lines = fitLines(node, usableW, opts.fsLeaf);
  const pillH = lines.length >= 2 ? opts.pillH + 16 : opts.pillH;
  let chips = [];
  let chipsH = 0;
  if (opts.showChips && node.inlineChildren && node.children?.length) {
    const laid = layoutChips(node.children, opts);
    chips = laid.chips;
    chipsH = laid.rows > 0 ? laid.rows * CHIP_ROW + 6 : 0;
  }
  return { node, lines, pillH, chips, chipsH, blockH: pillH + chipsH };
}

/** Measure a branch pill (short label, up to two lines). */
function measureBranchPill(branch, opts) {
  const usableW = opts.branchW - 2 * PAD_X;
  const lines = fitLines(branch, usableW, opts.fsBranch);
  const h = lines.length >= 2 ? opts.pillH + 16 : opts.pillH;
  return { lines, h };
}

/** Lay out one side (top-down stack of branch blocks); returns blocks + height. */
function sideLayout(branches, opts) {
  const blocks = [];
  let y = 0;
  for (const branch of branches) {
    const leaves = branch.leaves.map((leaf) => measureLeaf(leaf, opts));
    const blockH =
      leaves.reduce((s, l) => s + l.blockH, 0) + opts.leafGap * (leaves.length - 1);
    const pill = measureBranchPill(branch, opts);
    blocks.push({ branch, leaves, blockH, top: y, pill });
    y += blockH + opts.branchGap;
  }
  return { blocks, totalH: Math.max(0, y - opts.branchGap) };
}

/**
 * Compute absolute geometry for the whole map. Pure: no markup, no colour.
 * Returns { W, H, center, branches:[{branch, pill, leaves:[{node,x,y,w,h,lines,
 * chips:[{node,x,y,w,text}]}], edges:[{x1,y1,x2,y2,color,weight}]}] }.
 */
export function layoutMap(map, opts) {
  const cols = columns(opts);
  const left = sideLayout(
    map.branches.filter((b) => b.side === 'left'),
    opts,
  );
  const right = sideLayout(
    map.branches.filter((b) => b.side === 'right'),
    opts,
  );
  const maxSide = Math.max(left.totalH, right.totalH);
  const H = Math.round(maxSide + 2 * MARGIN_V);
  const cy = H / 2;

  // Centre pill, vertically centred.
  const centerUsable = opts.centerW - 2 * PAD_X;
  const centerLines = wrap(map.center.label, centerUsable, opts.fsCenter);
  const usedCenter = centerLines.length > 2 ? [map.center.short] : centerLines;
  const centerH = usedCenter.length >= 2 ? opts.pillH + 28 : opts.pillH + 12;
  const center = {
    node: map.center,
    x: cols.centerLeft,
    y: cy - centerH / 2,
    w: opts.centerW,
    h: centerH,
    lines: usedCenter,
  };

  const place = (side, sideCols) => {
    const offset = MARGIN_V + (maxSide - side.totalH) / 2;
    const isLeft = sideCols.leafLeft < cols.cx;
    return side.blocks.map((block) => {
      const branchTop = offset + block.top;
      const branchPillY = branchTop + block.blockH / 2 - block.pill.h / 2;
      const branchPill = {
        x: sideCols.branchLeft,
        y: branchPillY,
        w: opts.branchW,
        h: block.pill.h,
        lines: block.pill.lines,
      };

      const edges = [];
      // centre -> branch
      const branchMidY = branchPillY + block.pill.h / 2;
      edges.push({
        x1: isLeft ? cols.centerLeft : cols.centerRight,
        y1: cy,
        x2: isLeft ? sideCols.branchLeft + opts.branchW : sideCols.branchLeft,
        y2: branchMidY,
        color: block.branch.color,
        weight: 2.5,
      });

      let ly = branchTop;
      const leaves = block.leaves.map((leaf) => {
        const box = {
          node: leaf.node,
          x: sideCols.leafLeft,
          y: ly,
          w: opts.leafW,
          h: leaf.pillH,
          lines: leaf.lines,
          badge: leaf.node.badge,
          chips: leaf.chips.map((chip) => ({
            node: chip.node,
            text: chip.text,
            x: sideCols.leafLeft + chip.dx,
            y: ly + leaf.pillH + 6 + chip.row * CHIP_ROW,
            w: chip.w,
            color: chip.node.color ?? block.branch.color,
          })),
        };
        // branch -> leaf
        edges.push({
          x1: isLeft ? sideCols.branchLeft : sideCols.branchLeft + opts.branchW,
          y1: branchMidY,
          x2: isLeft ? sideCols.leafLeft + opts.leafW : sideCols.leafLeft,
          y2: ly + leaf.pillH / 2,
          color: leaf.node.color ?? block.branch.color,
          weight: 1.5,
        });
        ly += leaf.blockH + opts.leafGap;
        return box;
      });

      return { branch: block.branch, pill: branchPill, leaves, edges };
    });
  };

  const branches = [
    ...place(left, {
      leafLeft: cols.leftLeafLeft,
      branchLeft: cols.leftBranchLeft,
    }),
    ...place(right, {
      leafLeft: cols.rightLeafLeft,
      branchLeft: cols.rightBranchLeft,
    }),
  ];

  return { W: opts.W, H, center, branches };
}

// -------------------------------------------------------------- serialize -- //

const href = (variant, site, h) =>
  variant === 'portrait' ? `${site.url}${h}` : h;

function textEl(variant, x, y, colorVar, lines, fontPx, { disp, mono } = {}) {
  const lineH = round(fontPx * 1.15);
  const y0 = round(y - ((lines.length - 1) * lineH) / 2 + fontPx * 0.34);
  const classes = [disp ? 'disp' : '', mono ? 'mono' : ''].filter(Boolean).join(' ');
  const cls = variant === 'web'
    ? [colorVar ? `${clsOf(colorVar)}-tx` : '', classes].filter(Boolean).join(' ')
    : classes;
  const fill =
    variant === 'portrait'
      ? ` fill="${colorVar ? HEX[`${colorVar}-ink`] : HEX.ink}"`
      : '';
  const clsAttr = cls ? ` class="${cls}"` : '';
  const tspans = lines
    .map(
      (ln, i) =>
        `<tspan x="${round(x)}" dy="${i === 0 ? 0 : lineH}">${esc(ln)}</tspan>`,
    )
    .join('');
  return `<text${clsAttr}${fill} x="${round(x)}" y="${y0}" font-size="${fontPx}">${tspans}</text>`;
}

function rectEl(variant, box, colorVar, kind, rx) {
  const geo = `x="${round(box.x)}" y="${round(box.y)}" width="${round(box.w)}" height="${round(box.h)}" rx="${rx}"`;
  if (variant === 'web') {
    const cls =
      kind === 'panel' ? 'panel' : kind === 'band' ? `${clsOf(colorVar)}-band` : `${clsOf(colorVar)}-bg`;
    return `<rect class="${cls}" ${geo}/>`;
  }
  if (kind === 'panel') {
    return `<rect fill="${HEX.panel}" stroke="${HEX.line}" ${geo}/>`;
  }
  if (kind === 'band') {
    return `<rect fill="none" stroke="${HEX[`${colorVar}-ink`]}" ${geo}/>`;
  }
  return `<rect fill="${HEX[colorVar]}" ${geo}/>`;
}

function pillEl(variant, site, box, colorVar, fontPx, { disp, panel } = {}) {
  const parts = [`<a href="${esc(href(variant, site, box.node.href))}">`];
  parts.push(rectEl(variant, box, colorVar, panel ? 'panel' : 'bg', 8));
  const cx = box.x + PAD_X;
  parts.push(textEl(variant, cx, box.y + box.h / 2, panel ? null : colorVar, box.lines, fontPx, { disp }));
  if (box.badge != null) {
    const bx = round(box.x + box.w - 6);
    const by = round(box.y + 14);
    const bfill = variant === 'portrait' ? ` fill="${colorVar ? HEX[`${colorVar}-ink`] : HEX.muted}"` : '';
    const bcls = variant === 'web' ? ` class="${colorVar ? `${clsOf(colorVar)}-tx` : 'muted'} mono"` : ' class="mono"';
    parts.push(`<text${bcls}${bfill} x="${bx}" y="${by}" font-size="11" text-anchor="end" aria-hidden="true">${box.badge}</text>`);
  }
  parts.push('</a>');
  return parts.join('');
}

function chipEl(variant, site, chip, opts) {
  const box = { x: chip.x, y: chip.y, w: chip.w, h: opts.chipH };
  const parts = [`<a href="${esc(href(variant, site, chip.node.href))}">`];
  parts.push(rectEl(variant, box, chip.color, 'band', 6));
  parts.push(
    textEl(variant, chip.x + CHIP_PAD_X, chip.y + opts.chipH / 2, chip.color, [chip.text], opts.fsChip),
  );
  parts.push('</a>');
  return parts.join('');
}

function edgeEl(variant, e) {
  const d = (e.x2 - e.x1) / 2;
  const path = `M ${round(e.x1)} ${round(e.y1)} C ${round(e.x1 + d)} ${round(e.y1)}, ${round(e.x2 - d)} ${round(e.y2)}, ${round(e.x2)} ${round(e.y2)}`;
  if (variant === 'web') {
    return `<path class="edge ${clsOf(e.color)}-st" fill="none" stroke-width="${e.weight}" d="${path}"/>`;
  }
  return `<path fill="none" stroke="${HEX[`${e.color}-ink`]}" stroke-width="${e.weight}" d="${path}"/>`;
}

/**
 * Render the map to SVG inner markup for a variant. Returns { body, width,
 * height, counts:{ branches, leaves, texts, links } }.
 */
export function renderMap(map, variant, { site } = {}) {
  const opts = variant === 'portrait' ? PORTRAIT_OPTS : WEB_OPTS;
  const s = site ?? map.__site ?? { url: '' };
  const layout = layoutMap(map, opts);
  const out = [];
  let leaves = 0;

  for (const b of layout.branches) {
    out.push(`<g class="branch" data-branch="${b.branch.id}">`);
    out.push('<g class="edges" aria-hidden="true">');
    for (const e of b.edges) out.push(edgeEl(variant, e));
    out.push('</g>');
    out.push(pillEl(variant, s, b.pill.node ? b.pill : { ...b.pill, node: { href: b.branch.href } }, b.branch.color, opts.fsBranch, { disp: true }));
    for (const leaf of b.leaves) {
      leaves += 1;
      out.push(pillEl(variant, s, leaf, leaf.node.color ?? b.branch.color, opts.fsLeaf));
      for (const chip of leaf.chips) out.push(chipEl(variant, s, chip, opts));
    }
    out.push('</g>');
  }
  // Centre last, on top.
  out.push(pillEl(variant, s, layout.center, null, opts.fsCenter, { disp: true, panel: true }));

  const body = out.join('\n');
  const texts = (body.match(/<text/g) ?? []).length;
  const links = (body.match(/<a /g) ?? []).length;
  return {
    body,
    width: layout.W,
    height: layout.H,
    counts: { branches: map.branches.length, leaves, texts, links },
  };
}

// -------------------------------------------------------------- portrait -- //

const PORTRAIT_STYLE =
  `text{font-family:'Instrument Sans','Instrument Sans Variable',system-ui,sans-serif}` +
  `.disp{font-family:'Bricolage Grotesque','Bricolage Grotesque Variable',Georgia,serif;font-weight:700}` +
  `.mono{font-family:'JetBrains Mono','JetBrains Mono Variable',ui-monospace,monospace}`;

/** Build the standalone portrait SVG string and its metadata. */
export function renderPortrait(map, site) {
  const r = renderMap(map, 'portrait', { site });
  const title = 'The map of the discipline';
  const desc =
    'A two-sided mind map: a central AI Governance Engineer node with eight branches — Foundations, Values and principles, The Stack, Patterns, The Role, Obligations, Maturity and the Learning path — each with its second-level topics.';
  const svg =
    `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${r.width} ${r.height}" role="img" aria-labelledby="map-t map-d">\n` +
    `<title id="map-t">${esc(title)}</title>\n` +
    `<desc id="map-d">${esc(desc)}</desc>\n` +
    `<style>${PORTRAIT_STYLE}</style>\n` +
    `${r.body}\n</svg>\n`;
  return { svg, width: r.width, height: r.height, counts: r.counts };
}

// ------------------------------------------------------------------- CLI -- //

function arg(name) {
  const i = process.argv.indexOf(name);
  return i >= 0 ? process.argv[i + 1] : undefined;
}

async function main() {
  const args = process.argv.slice(2);
  const out = arg('--out');
  if (!out) {
    console.error('map-build: --out <path> is required');
    process.exit(1);
  }
  const { map, site } = await loadMap();
  mkdirSync(dirname(resolve(SITE, out)), { recursive: true });

  if (args.includes('--portrait')) {
    const { svg, width, height, counts } = renderPortrait(map, site);
    writeFileSync(resolve(SITE, out), svg, 'utf8');
    const metaPath = arg('--meta');
    if (metaPath) {
      const meta = {
        bokVersion: undefined,
        viewBox: `0 0 ${width} ${height}`,
        width,
        height,
        counts,
      };
      // bokVersion comes from site.ts via loadMap's site (name/url only); read
      // it directly so the meta is self-contained.
      const siteM = await loadTs('src/data/site.ts', SITE);
      meta.bokVersion = siteM.site.bokVersion;
      mkdirSync(dirname(resolve(SITE, metaPath)), { recursive: true });
      writeFileSync(resolve(SITE, metaPath), `${JSON.stringify(meta, null, 2)}\n`, 'utf8');
    }
    console.log(`map-build: portrait ${out} (viewBox 0 0 ${width} ${height})`);
    return;
  }

  // --web debug output: wrap the body in a figc/map-svg root (no external CSS,
  // so colours only show when viewed with tokens.css + figures.css).
  const r = renderMap(map, 'web', { site });
  const svg =
    `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${r.width} ${r.height}" class="figc map-svg" role="group" aria-labelledby="map-t map-d">\n` +
    `<title id="map-t">The map of the discipline</title>\n` +
    `<desc id="map-d">A two-sided mind map of the eight branches of the discipline.</desc>\n` +
    `${r.body}\n</svg>\n`;
  writeFileSync(resolve(SITE, out), svg, 'utf8');
  console.log(`map-build: web ${out} (${r.width}x${r.height}, ${r.counts.links} links)`);
}

// Run as a CLI only (not when imported).
if (import.meta.url === `file://${process.argv[1]}` || process.argv[1]?.endsWith('map-build.mjs')) {
  main().catch((err) => {
    console.error(err.message ?? err);
    process.exit(1);
  });
}
