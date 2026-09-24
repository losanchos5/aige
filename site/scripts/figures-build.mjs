#!/usr/bin/env node
// figures-build: generate the data-driven conceptual infographics from the typed
// data modules, so they stay in sync with the Body of Knowledge:
//   - src/figures/values-principles.svg  (from src/data/values.ts)
//   - src/figures/values-principles-wide.svg (the same, two columns, from 834 px)
//   - src/figures/maturity-grid.svg      (from src/data/maturity.ts + stack.ts)
//   - src/figures/pattern-map.svg        (from src/data/patterns.ts + stack.ts)
//   - src/figures/discipline-map.svg     (the whole discipline map; see map-build.mjs)
// The other figures under src/figures are hand-authored. All figures are inlined
// into the chapters by src/lib/rehype-diagrams.ts and declared in
// src/data/figures.ts.
//
// Then, for EVERY figure in figures.ts, it writes the reusable exports under
// public/downloads/figures/ (git-ignored, rebuilt on every build): a standalone
// SVG that follows the viewer's colour scheme, a light and a dark SVG, and light
// and dark PNGs at 1600 and 3200 px, each with the attribution band
// "aigovernanceengineer.com · <licence> · v<bokVersion>" (see
// scripts/lib/figure-export.mjs and VISUAL-GUIDE.md §5). File names come from
// figureExports() in figures.ts, which the /figures pages link. PNGs are cached
// by content hash in .figures-cache/ so an unchanged figure is not re-rendered.
// It also validates every entry: size budget by kind, asOf/reviewBy dates, the
// "As of <date>" stamp inside a dated figure, and the data-viz table fallback.
//
//   node scripts/figures-build.mjs           # (re)write generated SVGs + exports
//   node scripts/figures-build.mjs --check   # verify they are up to date (no writes)
//   node scripts/figures-build.mjs --no-export  # generated SVGs only, no exports
//
// The data modules are TypeScript; they carry no runtime imports (only type-only
// imports, which erase), so scripts/lib/load-ts.mjs transpiles each with the
// installed `typescript` and imports it from a data: URL, no extra tooling.
import { createHash } from 'node:crypto';
import {
  existsSync,
  readFileSync,
  readdirSync,
  writeFileSync,
  mkdirSync,
  renameSync,
  rmSync,
} from 'node:fs';
import { resolve, dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { loadTs } from './lib/load-ts.mjs';
import { loadMap, renderMap } from './map-build.mjs';
import { woffToSfnt } from './lib/woff.mjs';
import {
  FALLBACK_FONT_CANDIDATES,
  RENDER_FONTS,
  cmapCoverage,
  exportCss,
  readSiteStyles,
  renderPng,
  standaloneSvg,
  withPngText,
} from './lib/figure-export.mjs';

const HERE = dirname(fileURLToPath(import.meta.url));
const SITE = resolve(HERE, '..');
const OUT = join(SITE, 'src', 'figures');
const EXPORT_DIR = join(SITE, 'public', 'downloads', 'figures');
const CACHE_DIR = join(SITE, '.figures-cache');
const ARGS = process.argv.slice(2);
const CHECK = ARGS.includes('--check');
const NO_EXPORT = ARGS.includes('--no-export');
// Bump when the export layout changes, so every cached PNG is re-rendered.
const EXPORT_REV = '1';

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

// The same figure as two columns (values left, principles right) for wide wells.
// rehype-diagrams inlines it next to the stacked SVG when src/figures/<id>-wide.svg
// exists, and figures.css shows exactly one of the two: the stacked figure below
// 834 px, the two-column one from 834 px (VISUAL-GUIDE.md §2.3). It is not a
// figure of its own: no figures.ts entry, no permalink and no exports.
function buildValuesPrinciplesWide(values, principles, fig) {
  const W = 720;
  const COL = 360; // x of the second column; each keeps the stacked figure's 328-px text width
  const parts = [];
  parts.push(`  <text class="mono muted" x="16" y="20" font-size="13.5">Eight values · six principles</text>`);

  const column = (x0, label, items) => {
    let y = 54;
    parts.push(`  <text class="disp" x="${x0 + 16}" y="${y}" font-size="15">${esc(label)}</text>`);
    y += 8;
    parts.push(`  <line class="rule" x1="${x0 + 16}" y1="${y}" x2="${x0 + 344}" y2="${y}"/>`);
    y += 8;
    for (const item of items) {
      const lines = wrap(item.title, 40);
      const top = y + 13;
      parts.push(`  <text class="mono muted" x="${x0 + 16}" y="${top}" font-size="13.5">${pad2(item.n)}</text>`);
      lines.forEach((ln, i) => {
        parts.push(`  <text x="${x0 + 44}" y="${top + i * 17}" font-size="14">${esc(ln)}</text>`);
      });
      y = top + (lines.length - 1) * 17 + 12;
    }
    return y;
  };

  const yValues = column(0, 'Eight values: which way to lean', values);
  const yPrinciples = column(COL, 'Six principles: what to do on Monday', principles);
  const H = Math.max(yValues, yPrinciples) + 8;
  return (
    open(W, H, 'img', 'values-principles-wide', fig.title, fig.alt, 'figc--wide') +
    parts.join('\n') +
    `\n</svg>\n`
  );
}

// -------------------------------------------------------------- maturity -- //
function buildMaturityGrid(layers, levels, fig) {
  const W = 360;
  // Illustrative profile, anchored to chapter 07's own example: inventory at
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

// ------------------------------------------------------------- validation -- //

const ISO_DATE = /^\d{4}-\d{2}-\d{2}$/;
const isIsoDate = (value) =>
  ISO_DATE.test(value) && new Date(`${value}T00:00:00Z`).toISOString().slice(0, 10) === value;

/** Visible text of an SVG (tags stripped, entities for & < > decoded). */
const svgText = (svg) =>
  svg
    .replace(/<!--[\s\S]*?-->/g, ' ')
    .replace(/<[^>]+>/g, ' ')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&amp;/g, '&')
    .replace(/\s+/g, ' ');

/**
 * Check every figure entry against the rules the exports and pages rely on.
 * Returns the list of problems (the build fails on any) and prints warnings.
 */
function validateFigures(figuresMod) {
  const { figures, figureBudgetKb, figureKind } = figuresMod;
  const problems = [];
  const today = new Date().toISOString().slice(0, 10);
  const seen = new Set();
  for (const figure of figures) {
    const where = `figures.ts "${figure.id}"`;
    if (seen.has(figure.id)) problems.push(`${where}: duplicate id`);
    seen.add(figure.id);
    const kind = figureKind(figure);
    if (!(kind in figureBudgetKb)) problems.push(`${where}: unknown kind "${kind}"`);
    for (const key of ['asOf', 'reviewBy']) {
      if (figure[key] !== undefined && !isIsoDate(figure[key])) {
        problems.push(`${where}: ${key} "${figure[key]}" is not a YYYY-MM-DD date`);
      }
    }
    if (figure.reviewBy && !figure.asOf) problems.push(`${where}: reviewBy without asOf`);
    if (figure.asOf && figure.reviewBy && figure.reviewBy <= figure.asOf) {
      problems.push(`${where}: reviewBy must be after asOf`);
    }
    if (figure.reviewBy && figure.reviewBy < today) {
      console.warn(
        `figures-build: warning: ${where} passed its reviewBy date ${figure.reviewBy}; re-check it against its chapter.`,
      );
    }
    if (figure.license !== undefined && !String(figure.license).trim()) {
      problems.push(`${where}: empty license`);
    }
    for (const page of figure.pages ?? []) {
      if (!page.startsWith('/')) problems.push(`${where}: page "${page}" must be a site path`);
    }
    if (kind === 'data-viz') {
      const table = figure.data;
      if (!table || !table.rows?.length) {
        problems.push(`${where}: a data-viz figure needs its data table fallback (data.rows)`);
      } else {
        table.rows.forEach((row, i) => {
          if (row.length !== table.columns.length) {
            problems.push(
              `${where}: data row ${i + 1} has ${row.length} cells for ${table.columns.length} columns`,
            );
          }
        });
        if (!table.source?.trim()) problems.push(`${where}: data table needs a source line`);
      }
    }

    const file = join(OUT, `${figure.id}.svg`);
    if (!existsSync(file)) continue; // not authored yet: rehype-diagrams skips it too
    const svg = readFileSync(file, 'utf8');
    const kb = Buffer.byteLength(svg, 'utf8') / 1024;
    const budget = figureBudgetKb[kind] ?? 12;
    if (kb > budget) {
      problems.push(
        `${where}: ${figure.id}.svg is ${kb.toFixed(1)} KB, over the ${budget} KB ${kind} budget`,
      );
    }
    if (figure.asOf && !svgText(svg).toLowerCase().includes(`as of ${figure.asOf}`)) {
      problems.push(`${where}: dated figure must print "As of ${figure.asOf}" inside ${figure.id}.svg`);
    }
  }
  return problems;
}

// ---------------------------------------------------------------- exports -- //

const sha = (...parts) => {
  const hash = createHash('sha256');
  for (const part of parts) hash.update(part);
  return hash.digest('hex');
};

function readJson(path) {
  try {
    return JSON.parse(readFileSync(path, 'utf8'));
  } catch {
    return null;
  }
}

/** Write `data` atomically, only when it differs from what is on disk. */
function writeIfChanged(dest, data) {
  const buf = Buffer.isBuffer(data) ? data : Buffer.from(data, 'utf8');
  if (existsSync(dest) && readFileSync(dest).equals(buf)) return false;
  const tmp = `${dest}.tmp-${process.pid}`;
  writeFileSync(tmp, buf);
  renameSync(tmp, dest);
  return true;
}

/**
 * Decode the site's WOFF/WOFF2 faces to TTF under .figures-cache/fonts, for
 * resvg (which reads only TrueType/OpenType). Returns the files and a hash.
 */
function renderFonts() {
  const dir = join(CACHE_DIR, 'fonts');
  mkdirSync(dir, { recursive: true });
  const files = [];
  const hash = createHash('sha256');
  const covers = [];
  for (const [pkg, file] of RENDER_FONTS) {
    const src = join(SITE, 'node_modules', pkg, 'files', file);
    if (!existsSync(src)) throw new Error(`figures-build: font ${pkg}/${file} is not installed`);
    const raw = readFileSync(src);
    hash.update(raw);
    const ttf = woffToSfnt(raw);
    const dest = join(dir, `${file.replace(/\.woff2?$/, '')}.ttf`);
    writeIfChanged(dest, ttf);
    files.push(dest);
    covers.push(cmapCoverage(ttf));
  }
  // Glyph fallback for characters outside the Latin subsets (e.g. U+2192).
  const fallback = FALLBACK_FONT_CANDIDATES.find((path) => existsSync(path));
  let fallbackCovers = () => false;
  if (fallback) {
    const ttf = readFileSync(fallback);
    hash.update(ttf);
    files.push(fallback);
    fallbackCovers = cmapCoverage(ttf);
  }
  return {
    files,
    hash: hash.digest('hex'),
    covers: (cp) => covers.some((has) => has(cp)),
    fallbackCovers,
  };
}

/** Warn for every character of a figure that no loaded face can draw in a PNG. */
function warnMissingGlyphs(figure, svg, fonts) {
  const missing = new Set();
  for (const ch of svgText(svg)) {
    const cp = ch.codePointAt(0);
    if (cp > 0x20 && !fonts.covers(cp) && !fonts.fallbackCovers(cp)) missing.add(ch);
  }
  if (missing.size) {
    const list = [...missing].map((ch) => `U+${ch.codePointAt(0).toString(16).toUpperCase()}`);
    console.warn(
      `figures-build: warning: "${figure.id}" PNGs cannot draw ${list.join(', ')}: no site or fallback face has it.`,
    );
  }
}

/** Site path whose page holds the figure's #anchors (first placement, else page). */
function fragmentBase(figure) {
  const chapter = figure.placements[0]?.chapter;
  if (chapter) return `/bok/${chapter}`;
  return figure.pages?.[0] ?? `/figures/${figure.id}`;
}

async function exportFigures(figuresMod, site) {
  const { figures, figureExports, figureLicense } = figuresMod;
  mkdirSync(EXPORT_DIR, { recursive: true });
  const styles = readSiteStyles(SITE);
  const fonts = renderFonts();
  const cachePath = join(CACHE_DIR, 'renders.json');
  const cache = readJson(cachePath) ?? {};
  const nextCache = {};
  const expected = new Set();
  const jobs = [];
  const author = site.authors[0];
  const started = Date.now();
  let written = 0;

  for (const figure of figures) {
    const src = join(OUT, `${figure.id}.svg`);
    if (!existsSync(src)) {
      console.warn(`figures-build: warning: no src/figures/${figure.id}.svg yet; no exports for it.`);
      continue;
    }
    const license = figureLicense(figure);
    const sourceSvg = readFileSync(src, 'utf8');
    warnMissingGlyphs(figure, sourceSvg, fonts);
    const common = {
      svg: sourceSvg,
      figure,
      siteUrl: site.url,
      version: site.bokVersion,
      license,
      licenseUrl: site.licenseUrl,
      author,
      fragmentBase: fragmentBase(figure),
    };
    const cssFor = (theme, faces) =>
      exportCss(theme, { rules: styles.rules, tokens: styles.tokens, siteUrl: site.url, faces });

    for (const entry of figureExports(figure.id, site.bokVersion)) {
      expected.add(entry.file);
      const dest = join(EXPORT_DIR, entry.file);
      if (entry.format === 'svg') {
        const out = standaloneSvg({ ...common, theme: entry.theme, css: cssFor(entry.theme, true) });
        if (writeIfChanged(dest, out)) written += 1;
        continue;
      }
      // PNG: drawn from a single-theme SVG without @font-face; resvg gets the
      // decoded faces directly.
      const renderSvg = standaloneSvg({
        ...common,
        theme: entry.theme,
        css: cssFor(entry.theme, false),
      });
      const key = sha(EXPORT_REV, fonts.hash, String(entry.width), renderSvg);
      nextCache[entry.file] = key;
      if (cache[entry.file] === key && existsSync(dest)) continue;
      jobs.push(
        renderPng(renderSvg, entry.width, fonts.files).then((png) => {
          const tagged = withPngText(png, [
            ['Title', figure.title],
            ['Author', author],
            ['Description', figure.alt],
            ['Copyright', `${author}. ${license} (${site.licenseUrl}).`],
            ['Source', `${site.url}/figures/${figure.id}`],
          ]);
          writeIfChanged(dest, tagged);
          written += 1;
        }),
      );
    }
  }
  await Promise.all(jobs);

  // Drop exports no figure produces any more (an old version, a removed id).
  for (const name of readdirSync(EXPORT_DIR)) {
    if (!expected.has(name)) rmSync(join(EXPORT_DIR, name), { force: true });
  }
  writeFileSync(cachePath, `${JSON.stringify(nextCache, null, 2)}\n`, 'utf8');
  const secs = ((Date.now() - started) / 1000).toFixed(1);
  console.log(
    `figures-build: ${expected.size} export(s) for v${site.bokVersion} in public/downloads/figures ` +
      `(${written} written, ${jobs.length} PNG rendered, ${secs}s)`,
  );
}

/**
 * Astro caches compiled Markdown keyed on the source, not on the figure SVGs
 * that rehype-diagrams inlines, so drop its data store whenever any figure SVG
 * changed since the last run, generated or hand-authored. With ASTRO_CACHE_DIR
 * set (parallel worktrees) only that cache is touched.
 */
function purgeAstroCacheIfFiguresChanged(changedGenerated) {
  const names = existsSync(OUT)
    ? readdirSync(OUT)
        .filter((name) => name.endsWith('.svg'))
        .sort()
    : [];
  const digest = sha(...names.map((name) => `${name}\n${readFileSync(join(OUT, name), 'utf8')}`));
  const statePath = join(CACHE_DIR, 'sources.json');
  const previous = readJson(statePath)?.digest;
  mkdirSync(CACHE_DIR, { recursive: true });
  writeFileSync(statePath, `${JSON.stringify({ digest }, null, 2)}\n`, 'utf8');
  if (!changedGenerated && previous === digest) return;
  const cacheDir = process.env.ASTRO_CACHE_DIR;
  const stale = cacheDir
    ? [join(resolve(SITE, cacheDir), 'data-store.json')]
    : [join(SITE, '.astro', 'data-store.json'), join(SITE, 'node_modules', '.astro')];
  for (const path of stale) {
    if (existsSync(path)) rmSync(path, { recursive: true, force: true });
  }
}

async function main() {
  if (!CHECK) mkdirSync(OUT, { recursive: true });

  const [{ values, principles }, { layers }, { levels }, { patterns }, figuresMod, { map }, { site }] =
    await Promise.all([
      loadTs('src/data/values.ts', SITE),
      loadTs('src/data/stack.ts', SITE),
      loadTs('src/data/maturity.ts', SITE),
      loadTs('src/data/patterns.ts', SITE),
      loadTs('src/data/figures.ts', SITE),
      loadMap(SITE),
      loadTs('src/data/site.ts', SITE),
    ]);
  const { figures, figureBudgetKb, figureKind } = figuresMod;
  const fig = (id) => figures.find((f) => f.id === id);
  const budget = (id) => figureBudgetKb[figureKind(fig(id))];

  const outputs = [
    ['values-principles.svg', buildValuesPrinciples(values, principles, fig('values-principles'))],
    [
      'values-principles-wide.svg',
      buildValuesPrinciplesWide(values, principles, fig('values-principles')),
    ],
    ['maturity-grid.svg', buildMaturityGrid(layers, levels, fig('maturity-grid'))],
    ['pattern-map.svg', buildPatternMap(patterns, layers, fig('pattern-map'))],
    ['discipline-map.svg', buildDisciplineMap(map, fig('discipline-map'))],
  ];

  let problems = 0;
  let changed = 0;
  for (const [name, svg] of outputs) {
    // A wide variant (<id>-wide.svg) shares its figure's budget.
    const r = emit(name, svg, budget(name.replace(/(-wide)?\.svg$/, '')));
    if (CHECK) problems += r;
    else changed += r;
  }

  const invalid = validateFigures(figuresMod);
  if (invalid.length) {
    console.error(`figures-build: ${invalid.length} figure problem(s):`);
    for (const line of invalid) console.error(`  ${line}`);
    process.exit(1);
  }

  if (CHECK) {
    if (problems) {
      console.error(`figures-build --check: ${problems} figure(s) missing or stale.`);
      process.exit(1);
    }
    console.log('figures-build --check: generated figures up to date.');
    return;
  }

  purgeAstroCacheIfFiguresChanged(changed > 0);
  if (!NO_EXPORT) await exportFigures(figuresMod, site);
}

main().catch((err) => {
  console.error(err.message ?? err);
  process.exit(1);
});
