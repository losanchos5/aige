#!/usr/bin/env node
// figures-build: generate the data-driven conceptual infographics from the typed
// data modules, so they stay in sync with the Body of Knowledge:
//   - src/figures/values-principles.svg  (from src/data/values.ts)
//   - src/figures/maturity-grid.svg      (from src/data/maturity.ts + stack.ts)
//   - src/figures/pattern-map.svg        (from src/data/patterns.ts + stack.ts)
//   - src/figures/discipline-map.svg     (the whole discipline map; see map-build.mjs)
// The other figures under src/figures are hand-authored. All figures are inlined
// into the chapters by src/lib/rehype-diagrams.ts and declared in
// src/data/figures.ts.
//
//   node scripts/figures-build.mjs           # (re)write the generated SVGs
//   node scripts/figures-build.mjs --check   # verify they are up to date (no writes)
//
// The data modules are TypeScript; they carry no runtime imports (only type-only
// imports, which erase), so scripts/lib/load-ts.mjs transpiles each with the
// installed `typescript` and imports it from a data: URL — no extra tooling.
import { existsSync, readFileSync, writeFileSync, mkdirSync, renameSync, rmSync } from 'node:fs';
import { resolve, dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { loadTs } from './lib/load-ts.mjs';
import { loadMap, renderMap } from './map-build.mjs';

const HERE = dirname(fileURLToPath(import.meta.url));
const SITE = resolve(HERE, '..');
const DATA = join(SITE, 'src', 'data');
const OUT = join(SITE, 'src', 'figures');
const CHECK = process.argv.slice(2).includes('--check');

const esc = (s) =>
  String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');

// Greedy word-wrap by an approximate character budget (SVG cannot measure text).
function wrap(text, maxChars) {
  const words = String(text).split(/\s+/);
  const lines = [];
  let line = '';
  for (const w of words) {
    const cand = line ? `${line} ${w}` : w;
    if (cand.length > maxChars && line) {
      lines.push(line);
      line = w;
    } else {
      line = cand;
    }
  }
  if (line) lines.push(line);
  return lines;
}

const pad2 = (n) => String(n).padStart(2, '0');
// Approximate advance width in px for a proportional label at a given size.
const textW = (s, size) => s.length * size * 0.53;

/** Open a figure SVG with the shared a11y contract (role img/group + title/desc). */
function open(width, height, role, id, title, desc, extraClass = '') {
  const cls = extraClass ? `figc ${extraClass}` : 'figc';
  return (
    `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${width} ${height}" class="${cls}" ` +
    `role="${role}" aria-labelledby="fig-${id}-t fig-${id}-d">\n` +
    `  <title id="fig-${id}-t">${esc(title)}</title>\n` +
    `  <desc id="fig-${id}-d">${esc(desc)}</desc>\n`
  );
}

/** The whole discipline map (web variant), wrapped with the a11y contract. */
function buildDisciplineMap(map, fig) {
  const r = renderMap(map, 'web');
  return (
    open(r.width, r.height, 'group', 'discipline-map', fig.title, fig.alt, 'map-svg') +
    r.body +
    `\n</svg>\n`
  );
}

// ---------------------------------------------------------------- values -- //
function buildValuesPrinciples(values, principles, fig) {
  const W = 360;
  const parts = [];
  let y = 20;
  parts.push(`  <text class="mono muted" x="16" y="${y}" font-size="13.5">Eight values · six principles</text>`);
  y += 20;

  const group = (label) => {
    y += 14;
    parts.push(`  <text class="disp" x="16" y="${y}" font-size="15">${esc(label)}</text>`);
    y += 8;
    parts.push(`  <line class="rule" x1="16" y1="${y}" x2="344" y2="${y}"/>`);
    y += 8;
  };

  const rows = (items) => {
    for (const item of items) {
      const lines = wrap(item.title, 40);
      const top = y + 13;
      parts.push(`  <text class="mono muted" x="16" y="${top}" font-size="13.5">${pad2(item.n)}</text>`);
      lines.forEach((ln, i) => {
        parts.push(`  <text x="44" y="${top + i * 17}" font-size="14">${esc(ln)}</text>`);
      });
      y = top + (lines.length - 1) * 17 + 12;
    }
  };

  group('Eight values: which way to lean');
  rows(values);
  group('Six principles: what to do on Monday');
  rows(principles);

  const H = y + 8;
  return (
    open(W, H, 'img', 'values-principles', fig.title, fig.alt) + parts.join('\n') + `\n</svg>\n`
  );
}

// -------------------------------------------------------------- maturity -- //
function buildMaturityGrid(layers, levels, fig) {
  const W = 360;
  // Illustrative profile — anchored to chapter 07's own example: inventory at
  // Level 4, evals at Level 2, assurance at Level 3, identity/runtime at Level 4;
  // Govern-as-Code shown at Level 4 to dramatise that a strong layer does not
  // lift the floor. Labelled "illustrative"; the weakest layer sets the level.
  const profile = { 1: 4, 2: 4, 3: 2, 4: 4, 5: 3 };
  const OVERALL = 2; // the weakest layer's level (Evals, Level 2)

  const parts = [];
  parts.push(`  <text class="mono muted" x="16" y="18" font-size="13.5">Your level is the weakest layer</text>`);
  parts.push(`  <text class="mono muted" x="16" y="36" font-size="13">Illustrative fill</text>`);

  const colX = (c) => 52 + (c - 1) * 54; // cell left for level c (1..5)
  const CW = 46;
  const rowY = (r) => 70 + (r - 1) * 38; // cell top for layer row r (1..5)
  const RH = 30;

  // Column headers (level numbers) + overall highlight behind the floor column.
  parts.push(
    `  <rect x="${colX(OVERALL) - 3}" y="64" width="${CW + 6}" height="192" rx="6" fill="none" stroke="currentColor" stroke-width="1.5" stroke-dasharray="4 3"/>`,
  );
  for (let c = 1; c <= 5; c += 1) {
    parts.push(`  <text class="mono muted" x="${colX(c) + CW / 2}" y="58" font-size="13.5" text-anchor="middle">${c}</text>`);
  }
  parts.push(`  <text class="mono" x="${colX(OVERALL) + CW / 2}" y="268" font-size="13" text-anchor="middle">Overall</text>`);

  // Grid cells, row per layer in canonical order.
  for (let r = 1; r <= 5; r += 1) {
    const reached = profile[r];
    parts.push(`  <text class="mono" x="30" y="${rowY(r) + 20}" font-size="13.5" text-anchor="middle">${pad2(r)}</text>`);
    for (let c = 1; c <= 5; c += 1) {
      const cls = c <= reached ? `l${r}-bg cell` : `cell-empty cell`;
      parts.push(`  <rect class="${cls}" x="${colX(c)}" y="${rowY(r)}" width="${CW}" height="${RH}" rx="3"/>`);
      if (c === reached) {
        parts.push(`  <rect class="l${r}-st" x="${colX(c)}" y="${rowY(r)}" width="${CW}" height="${RH}" rx="3" fill="none" stroke-width="2"/>`);
      }
    }
  }

  // Callout.
  let y = 292;
  parts.push(`  <text class="disp" x="16" y="${y}" font-size="14.5">Overall = Level ${OVERALL} · ${esc(levels[OVERALL - 1].name)}</text>`);
  for (const line of wrap('The weakest layer sets the level; assess each layer, then read the floor.', 50)) {
    y += 18;
    parts.push(`  <text class="ink2" x="16" y="${y}" font-size="13">${esc(line)}</text>`);
  }

  // Level legend (two lines).
  y += 26;
  const half = levels.slice(0, 3).map((l) => `${l.n} ${l.name}`).join('   ');
  const rest = levels.slice(3).map((l) => `${l.n} ${l.name}`).join('   ');
  parts.push(`  <text class="mono muted" x="16" y="${y}" font-size="13">${esc(half)}</text>`);
  y += 18;
  parts.push(`  <text class="mono muted" x="16" y="${y}" font-size="13">${esc(rest)}</text>`);

  // Layer legend (one row per layer, with a colour swatch).
  y += 12;
  for (const layer of layers) {
    y += 20;
    parts.push(`  <rect class="l${layer.n}-bg" x="16" y="${y - 11}" width="12" height="12" rx="2"/>`);
    parts.push(`  <text class="ink2 mono" x="34" y="${y}" font-size="13">${pad2(layer.n)} ${esc(layer.name)}</text>`);
  }

  const H = y + 10;
  return open(W, H, 'img', 'maturity-grid', fig.title, fig.alt) + parts.join('\n') + `\n</svg>\n`;
}

// ------------------------------------------------------------ pattern-map -- //
function buildPatternMap(patterns, layers, fig) {
  const W = 360;
  const parts = [];
  parts.push(`  <text class="mono muted" x="16" y="20" font-size="13.5">The pattern catalogue, by layer</text>`);

  const FS = 13.5;
  const CHIP_H = 24;
  const CHIP_GAP = 8;
  const ROW_GAP = 30;
  const INNER_L = 16;
  const INNER_R = 344;
  let y = 30;

  for (const layer of layers) {
    const inLayer = patterns.filter((p) => p.layer === layer.n);
    // Band header.
    parts.push(`  <rect class="l${layer.n}-band" x="8" y="${y}" width="344" height="26" rx="6" stroke-width="1"/>`);
    parts.push(`  <text class="l${layer.n}-tx disp" x="16" y="${y + 18}" font-size="13.5">Layer ${pad2(layer.n)} ${esc(layer.name)}</text>`);
    y += 26 + 8;

    // Chips flow left→right, wrapping within the band.
    let x = INNER_L;
    let rowStart = y;
    for (const p of inLayer) {
      const markW = p.secondaryLayer ? textW(`· ${pad2(p.secondaryLayer)}`, FS) + 6 : 0;
      const w = Math.ceil(textW(p.title, FS) + 20 + markW);
      if (x !== INNER_L && x + w > INNER_R) {
        x = INNER_L;
        rowStart += ROW_GAP;
      }
      const cy = rowStart + CHIP_H / 2 + 5;
      parts.push(`  <a href="#${esc(p.id)}">`);
      parts.push(`    <rect class="l${layer.n}-bg" x="${x}" y="${rowStart}" width="${w}" height="${CHIP_H}" rx="6"/>`);
      parts.push(`    <text class="l${layer.n}-tx" x="${x + 10}" y="${cy}" font-size="${FS}">${esc(p.title)}</text>`);
      if (p.secondaryLayer) {
        const mx = x + 10 + textW(p.title, FS) + 6;
        parts.push(`    <text class="l${p.secondaryLayer}-tx mono" x="${Math.round(mx)}" y="${cy}" font-size="12.5">· ${pad2(p.secondaryLayer)}</text>`);
      }
      parts.push(`  </a>`);
      x += w + CHIP_GAP;
    }
    y = rowStart + ROW_GAP + 6;
  }

  const H = y + 4;
  return open(W, H, 'group', 'pattern-map', fig.title, fig.alt) + parts.join('\n') + `\n</svg>\n`;
}

function emit(name, svg, budgetKb = 12) {
  const dest = join(OUT, name);
  if (CHECK) {
    if (!existsSync(dest)) {
      console.error(`figures-build --check: missing ${dest}`);
      return 1;
    }
    if (readFileSync(dest, 'utf8') !== svg) {
      console.error(`figures-build --check: stale ${dest} (regenerate with npm run figures:build)`);
      return 1;
    }
    return 0;
  }
  const size = Buffer.byteLength(svg, 'utf8');
  if (size > budgetKb * 1024) {
    console.error(`figures-build: ${name} is ${(size / 1024).toFixed(1)} KB, over the ${budgetKb} KB budget.`);
    process.exit(1);
  }
  const changed = !existsSync(dest) || readFileSync(dest, 'utf8') !== svg;
  const tmp = `${dest}.tmp-${process.pid}`;
  writeFileSync(tmp, svg, 'utf8');
  renameSync(tmp, dest);
  console.log(`figures-build: ${name} (${(size / 1024).toFixed(1)} KB)`);
  return changed ? 1 : 0;
}

async function main() {
  if (!CHECK) mkdirSync(OUT, { recursive: true });

  const [{ values, principles }, { layers }, { levels }, { patterns }, { figures }, { map }] =
    await Promise.all([
      loadTs('src/data/values.ts', SITE),
      loadTs('src/data/stack.ts', SITE),
      loadTs('src/data/maturity.ts', SITE),
      loadTs('src/data/patterns.ts', SITE),
      loadTs('src/data/figures.ts', SITE),
      loadMap(SITE),
    ]);
  const fig = (id) => figures.find((f) => f.id === id);

  const outputs = [
    ['values-principles.svg', buildValuesPrinciples(values, principles, fig('values-principles')), 12],
    ['maturity-grid.svg', buildMaturityGrid(layers, levels, fig('maturity-grid')), 12],
    ['pattern-map.svg', buildPatternMap(patterns, layers, fig('pattern-map')), 12],
    ['discipline-map.svg', buildDisciplineMap(map, fig('discipline-map')), 48],
  ];

  let problems = 0;
  let changed = 0;
  for (const [name, svg, budget] of outputs) {
    const r = emit(name, svg, budget);
    if (CHECK) problems += r;
    else changed += r;
  }

  if (CHECK) {
    if (problems) {
      console.error(`figures-build --check: ${problems} figure(s) missing or stale.`);
      process.exit(1);
    }
    console.log('figures-build --check: generated figures up to date.');
    return;
  }

  // Astro caches compiled Markdown keyed on the source, not on the figure SVGs
  // that rehype-diagrams inlines, so drop the cache when a figure changed to
  // force a recompile (mirrors scripts/diagrams-build.mjs).
  if (changed > 0) {
    for (const stale of [join(SITE, '.astro', 'data-store.json'), join(SITE, 'node_modules', '.astro')]) {
      if (existsSync(stale)) rmSync(stale, { recursive: true, force: true });
    }
  }
}

main().catch((err) => {
  console.error(err.message ?? err);
  process.exit(1);
});
