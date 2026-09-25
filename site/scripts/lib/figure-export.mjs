// figure-export.mjs: turn one inline figure SVG (src/figures/<id>.svg, styled
// by the site's classes) into the standalone files a reader can download and
// reuse: an SVG that follows the viewer's colour scheme, a light and a dark SVG,
// and the PNGs rendered from them with @resvg/resvg-js. Used by
// scripts/figures-build.mjs; see VISUAL-GUIDE.md §5 for the rules it enforces.
//
// Colour: the web figures carry class names only (figures.css maps them to the
// tokens in tokens.css). This module reads both stylesheets, keeps the static
// `.figc` rules (no :hover/:focus), resolves every var() and color-mix() to a
// hex value per theme, and writes the result into the file's own <style>. So an
// edit to a token or to figures.css reaches the exports on the next build.
//
// Type: the SVG declares the site's three faces (@font-face with local() first,
// then the site's WOFF2 by absolute URL) with system fallbacks. The PNGs are
// drawn with those same faces, decoded from the installed @fontsource packages
// (scripts/lib/woff.mjs), so they match the site on any machine.
import { readFileSync } from 'node:fs';
import { join } from 'node:path';
import { renderAsync } from '@resvg/resvg-js';

const esc = (s) =>
  String(s)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');

// ------------------------------------------------------------------ fonts -- //

/** Font stacks used in every export; the first name is the face resvg loads. */
export const FONT_STACKS = {
  body: "'Instrument Sans','Instrument Sans Variable',system-ui,sans-serif",
  display: "'Bricolage Grotesque','Bricolage Grotesque Variable',system-ui,sans-serif",
  mono: "'JetBrains Mono','JetBrains Mono Variable',ui-monospace,monospace",
};

/** The @fontsource files decoded for the PNG renderer (family, weight, path). */
export const RENDER_FONTS = [
  ['@fontsource-variable/instrument-sans', 'instrument-sans-latin-wght-normal.woff2'],
  ['@fontsource/bricolage-grotesque', 'bricolage-grotesque-latin-700-normal.woff'],
  ['@fontsource/bricolage-grotesque', 'bricolage-grotesque-latin-400-normal.woff'],
  ['@fontsource/jetbrains-mono', 'jetbrains-mono-latin-400-normal.woff'],
  ['@fontsource/jetbrains-mono', 'jetbrains-mono-latin-700-normal.woff'],
];

/**
 * System faces tried as glyph fallback for characters the site's @fontsource
 * subsets do not carry (the Latin subsets have no "→", U+2192, which the
 * discipline map uses). The browser falls back the same way on the site. The
 * first one present per platform is enough; CI (Ubuntu) has DejaVu Sans.
 */
export const FALLBACK_FONT_CANDIDATES = [
  '/usr/share/fonts/truetype/dejavu/DejaVuSans.ttf',
  '/usr/share/fonts/dejavu/DejaVuSans.ttf',
  '/usr/share/fonts/truetype/liberation/LiberationSans-Regular.ttf',
  'C:/Windows/Fonts/segoeui.ttf',
  'C:/Windows/Fonts/arial.ttf',
  '/System/Library/Fonts/Supplemental/Arial.ttf',
  '/Library/Fonts/Arial.ttf',
];

/**
 * The code points a TrueType/OpenType font maps (cmap formats 4 and 12), as a
 * `has(codePoint)` predicate. Used to warn before a PNG would draw a missing
 * glyph box.
 */
export function cmapCoverage(font) {
  const ranges = [];
  const numTables = font.readUInt16BE(4);
  let cmap = -1;
  for (let i = 0; i < numTables; i += 1) {
    const rec = 12 + i * 16;
    if (font.toString('latin1', rec, rec + 4) === 'cmap') cmap = font.readUInt32BE(rec + 8);
  }
  if (cmap >= 0) {
    const count = font.readUInt16BE(cmap + 2);
    for (let i = 0; i < count; i += 1) {
      const rec = cmap + 4 + i * 8;
      const platform = font.readUInt16BE(rec);
      const encoding = font.readUInt16BE(rec + 2);
      if (!(platform === 0 || (platform === 3 && (encoding === 1 || encoding === 10)))) continue;
      const sub = cmap + font.readUInt32BE(rec + 4);
      const format = font.readUInt16BE(sub);
      if (format === 4) {
        const segs = font.readUInt16BE(sub + 6) / 2;
        const ends = sub + 14;
        const starts = ends + segs * 2 + 2;
        for (let s = 0; s < segs; s += 1) {
          ranges.push([font.readUInt16BE(starts + s * 2), font.readUInt16BE(ends + s * 2)]);
        }
      } else if (format === 12) {
        const groups = font.readUInt32BE(sub + 12);
        for (let g = 0; g < groups; g += 1) {
          const at = sub + 16 + g * 12;
          ranges.push([font.readUInt32BE(at), font.readUInt32BE(at + 4)]);
        }
      }
    }
  }
  return (cp) => ranges.some(([lo, hi]) => cp >= lo && cp <= hi && cp !== 0xffff);
}

function fontFaces(siteUrl) {
  const face = (family, weights, file) =>
    `@font-face{font-family:'${family}';font-style:normal;font-weight:${weights};` +
    `src:local('${family}'),url('${siteUrl}/fonts/${file}') format('woff2')}`;
  return [
    face('Instrument Sans', '400 700', 'instrument-sans-latin-wght-normal.woff2'),
    face('Bricolage Grotesque', '200 800', 'bricolage-grotesque-latin-wght-normal.woff2'),
    face('JetBrains Mono', '100 800', 'jetbrains-mono-latin-wght-normal.woff2'),
  ].join('');
}

// ----------------------------------------------------------------- tokens -- //

const stripComments = (css) => css.replace(/\/\*[\s\S]*?\*\//g, '');

/** Body text of the first `{…}` block whose selector matches `re`. */
function blockAfter(css, re) {
  const m = re.exec(css);
  if (!m) return null;
  let depth = 0;
  const start = css.indexOf('{', m.index);
  for (let i = start; i < css.length; i += 1) {
    if (css[i] === '{') depth += 1;
    else if (css[i] === '}') {
      depth -= 1;
      if (depth === 0) return css.slice(start + 1, i);
    }
  }
  return null;
}

/** Split declarations on top-level semicolons (values may hold parentheses). */
function declarations(body) {
  const out = [];
  let depth = 0;
  let cur = '';
  for (const ch of body) {
    if (ch === '(') depth += 1;
    if (ch === ')') depth -= 1;
    if (ch === ';' && depth === 0) {
      out.push(cur);
      cur = '';
    } else cur += ch;
  }
  if (cur.trim()) out.push(cur);
  return out
    .map((d) => {
      const i = d.indexOf(':');
      return i < 0 ? null : [d.slice(0, i).trim(), d.slice(i + 1).replace(/\s+/g, ' ').trim()];
    })
    .filter(Boolean);
}

/** The light and dark token maps from tokens.css (dark = light + overrides). */
export function readTokens(tokensCss) {
  const css = stripComments(tokensCss);
  const light = new Map(declarations(blockAfter(css, /:root\s*\{/) ?? ''));
  const darkBody = blockAfter(css, /:root\[data-theme=['"]dark['"]\]\s*\{/);
  if (!light.size || !darkBody) throw new Error('figure-export: could not read tokens.css');
  const dark = new Map([...light, ...declarations(darkBody)]);
  for (const map of [light, dark]) {
    map.set('--font-body', FONT_STACKS.body);
    map.set('--font-display', FONT_STACKS.display);
    map.set('--font-mono', FONT_STACKS.mono);
  }
  return { light, dark };
}

function parseColor(value) {
  const v = value.trim().toLowerCase();
  if (v === 'transparent') return [0, 0, 0, 0];
  let m = /^#([0-9a-f]{3})$/.exec(v);
  if (m) return [...m[1]].map((c) => parseInt(c + c, 16)).concat(1);
  m = /^#([0-9a-f]{6})$/.exec(v);
  if (m) return [0, 2, 4].map((i) => parseInt(m[1].slice(i, i + 2), 16)).concat(1);
  return null;
}

function formatColor([r, g, b, a]) {
  if (a >= 1) {
    return `#${[r, g, b].map((c) => Math.round(c).toString(16).padStart(2, '0')).join('').toUpperCase()}`;
  }
  return `rgba(${[r, g, b].map((c) => Math.round(c)).join(',')},${Number(a.toFixed(3))})`;
}

/** color-mix(in srgb, A p%, B): premultiplied mix in gamma-encoded sRGB. */
function mix(a, p, b) {
  const pa = p / 100;
  const pb = 1 - pa;
  const alpha = a[3] * pa + b[3] * pb;
  if (alpha === 0) return [0, 0, 0, 0];
  const ch = (i) => (a[i] * a[3] * pa + b[i] * b[3] * pb) / alpha;
  return [ch(0), ch(1), ch(2), alpha];
}

/** Resolve var() and color-mix() in one CSS value against a token map. */
export function resolveValue(value, tokens, depth = 0) {
  if (depth > 12) throw new Error(`figure-export: var() cycle in "${value}"`);
  let out = value.replace(/var\(\s*(--[\w-]+)\s*(?:,\s*([^()]*))?\)/g, (_, name, fallback) => {
    const hit = tokens.get(name) ?? fallback;
    if (hit === undefined) throw new Error(`figure-export: unknown token ${name}`);
    return resolveValue(hit, tokens, depth + 1);
  });
  const MIX =
    /color-mix\(\s*in srgb\s*,\s*([^,()]+?)\s+(\d+(?:\.\d+)?)%\s*,\s*([^,()]+?)(?:\s+(\d+(?:\.\d+)?)%)?\s*\)/;
  for (let m = MIX.exec(out); m; m = MIX.exec(out)) {
    const a = parseColor(m[1]);
    const b = parseColor(m[3]);
    if (!a || !b) throw new Error(`figure-export: cannot mix "${m[0]}"`);
    out = out.replace(m[0], formatColor(mix(a, Number(m[2]), b)));
  }
  return out;
}

// ------------------------------------------------------------------ rules -- //

const DROP_PROPS = /^(transition|outline|cursor|animation|will-change)/;

/** Static `.figc` rules from figures.css as [selector, [[prop, rawValue]]]. */
export function readFigureRules(figuresCss) {
  const css = stripComments(figuresCss);
  const rules = [];
  let i = 0;
  while (i < css.length) {
    const open = css.indexOf('{', i);
    if (open < 0) break;
    const selector = css.slice(i, open).trim();
    // Find the matching close brace (at-rules nest one level).
    let depth = 0;
    let close = open;
    for (; close < css.length; close += 1) {
      if (css[close] === '{') depth += 1;
      else if (css[close] === '}') {
        depth -= 1;
        if (depth === 0) break;
      }
    }
    const body = css.slice(open + 1, close);
    i = close + 1;
    if (selector.startsWith('@')) continue; // media queries: layout only
    const kept = selector
      .split(',')
      .map((s) => s.trim().replace(/\s+/g, ' '))
      .filter((s) => s.startsWith('.figc') && !s.includes(':'));
    if (!kept.length) continue;
    const decls = declarations(body).filter(([prop]) => !DROP_PROPS.test(prop));
    if (decls.length) rules.push([kept.join(','), decls]);
  }
  return rules;
}

/** Rules for one theme with every value resolved to plain CSS. */
function themedRules(rules, tokens) {
  return rules.map(([selector, decls]) => [
    selector,
    decls.map(([prop, value]) => [prop, resolveValue(value, tokens)]),
  ]);
}

const ruleText = ([selector, decls]) =>
  `${selector}{${decls.map(([p, v]) => `${p}:${v}`).join(';')}}`;

/** Band and ground rules (outside the .figc group) for one token map. */
function frameRules(tokens) {
  const v = (name) => resolveValue(`var(${name})`, tokens);
  return [
    ['.x-bg', [['fill', v('--bg')]]],
    ['.x-rule', [['stroke', v('--line')], ['stroke-width', '1']]],
    ['.x-credit', [['fill', v('--muted')], ['font-family', FONT_STACKS.mono]]],
  ];
}

/**
 * The <style> text for one theme: 'light', 'dark', or 'auto' (light, with the
 * dark values under prefers-color-scheme). `faces` adds the @font-face block.
 */
export function exportCss(theme, { rules, tokens, siteUrl, faces = true }) {
  const light = [...frameRules(tokens.light), ...themedRules(rules, tokens.light)];
  const dark = [...frameRules(tokens.dark), ...themedRules(rules, tokens.dark)];
  const head = faces ? fontFaces(siteUrl) : '';
  if (theme === 'light') return head + light.map(ruleText).join('');
  if (theme === 'dark') return head + dark.map(ruleText).join('');
  // auto: only the dark rules whose values differ from light.
  const lightText = new Set(light.map(ruleText));
  const darkOnly = dark.map(ruleText).filter((text) => !lightText.has(text));
  return (
    head +
    light.map(ruleText).join('') +
    `@media (prefers-color-scheme:dark){${darkOnly.join('')}}`
  );
}

// -------------------------------------------------------------- standalone -- //

/** Rough advance width for the monospace credit line (0.6em per glyph). */
const monoW = (text, px) => [...text].length * px * 0.6;

/**
 * Build the standalone SVG for one figure and one theme.
 * @param {object} o
 * @param {string} o.svg       the inline figure SVG (src/figures/<id>.svg)
 * @param {object} o.figure    its FigureDef
 * @param {string} o.theme     'auto' | 'light' | 'dark'
 * @param {string} o.css       the <style> text from exportCss
 * @param {string} o.siteUrl   e.g. https://aigovernanceengineer.com
 * @param {string} o.version   book version, e.g. 0.5.0
 * @param {string} o.license   licence label, e.g. CC BY 4.0
 * @param {string} o.licenseUrl
 * @param {string} o.author    attribution name
 * @param {string} o.fragmentBase  site path that owns the figure's #anchors
 */
export function standaloneSvg(o) {
  const rootMatch = /<svg\b[^>]*>/.exec(o.svg);
  const end = o.svg.lastIndexOf('</svg>');
  if (!rootMatch || end < 0) throw new Error(`figure-export: ${o.figure.id}: no <svg> root`);
  const root = rootMatch[0];
  const vb = /viewBox="\s*([\d.-]+)[\s,]+([\d.-]+)[\s,]+([\d.]+)[\s,]+([\d.]+)\s*"/.exec(root);
  if (!vb) throw new Error(`figure-export: ${o.figure.id}: root <svg> has no viewBox`);
  const [minX, minY, W, H] = vb.slice(1).map(Number);
  const rootClass = /\bclass="([^"]*)"/.exec(root)?.[1] ?? 'figc';

  let inner = o.svg.slice(root.length + rootMatch.index, end);
  inner = inner
    .replace(/<!--[\s\S]*?-->/g, '')
    .replace(/<title\b[^>]*>[\s\S]*?<\/title>/, '')
    .replace(/<desc\b[^>]*>[\s\S]*?<\/desc>/, '')
    // Absolute links: a standalone file has no page to resolve #anchors or
    // site-relative paths against.
    .replace(/\b(href|xlink:href)="#([^"]*)"/g, (_, attr, frag) => `${attr}="${o.siteUrl}${o.fragmentBase}#${frag}"`)
    .replace(/\b(href|xlink:href)="\/(?!\/)([^"]*)"/g, (_, attr, path) => `${attr}="${o.siteUrl}/${path}"`)
    .replace(/\n{2,}/g, '\n')
    .trim();

  const PAD = 16;
  const fs = Math.min(16, Math.max(10.5, Math.round((W / 34) * 2) / 2));
  const credit = `aigovernanceengineer.com · ${o.license} · v${o.version}`;
  if (monoW(credit, fs) > W) {
    throw new Error(`figure-export: ${o.figure.id}: attribution band wider than the figure`);
  }
  const bandTop = PAD + H + 10;
  const width = W + 2 * PAD;
  const height = Math.round(bandTop + fs * 2.4);
  const id = o.figure.id;
  const permalink = `${o.siteUrl}/figures/${id}`;

  const metadata =
    `<metadata><rdf:RDF xmlns:rdf="http://www.w3.org/1999/02/22-rdf-syntax-ns#" ` +
    `xmlns:cc="http://creativecommons.org/ns#" xmlns:dc="http://purl.org/dc/elements/1.1/">` +
    `<cc:Work rdf:about="${esc(permalink)}"><dc:title>${esc(o.figure.title)}</dc:title>` +
    `<dc:creator>${esc(o.author)}</dc:creator>` +
    (o.figure.asOf ? `<dc:date>${esc(o.figure.asOf)}</dc:date>` : '') +
    `<dc:source rdf:resource="${esc(permalink)}"/>` +
    `<cc:attributionName>${esc(o.author)}</cc:attributionName>` +
    `<cc:attributionURL rdf:resource="${esc(permalink)}"/>` +
    `<cc:license rdf:resource="${esc(o.licenseUrl)}"/></cc:Work></rdf:RDF></metadata>`;

  return (
    `<?xml version="1.0" encoding="UTF-8"?>\n` +
    `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${width} ${height}" width="${width}" height="${height}" ` +
    `role="img" aria-labelledby="fig-${id}-t fig-${id}-d" lang="en" data-theme="${o.theme}">\n` +
    `<title id="fig-${id}-t">${esc(o.figure.title)}</title>\n` +
    `<desc id="fig-${id}-d">${esc(o.figure.alt)} ${esc(`By ${o.author}, ${permalink}, ${o.license}.`)}</desc>\n` +
    `${metadata}\n` +
    `<style>${o.css}</style>\n` +
    `<rect class="x-bg" x="0" y="0" width="${width}" height="${height}"/>\n` +
    `<g class="${esc(rootClass)}" transform="translate(${PAD - minX} ${PAD - minY})">\n${inner}\n</g>\n` +
    `<g class="x-band">` +
    `<line class="x-rule" x1="${PAD}" y1="${bandTop}" x2="${width - PAD}" y2="${bandTop}"/>` +
    `<text class="x-credit" x="${PAD}" y="${Math.round(bandTop + fs * 1.55)}" font-size="${fs}">${esc(credit)}</text>` +
    `</g>\n</svg>\n`
  );
}

/** Pixel height of an export rendered `width` px wide from its viewBox. */
export function renderedHeight(svg, width) {
  const vb = /viewBox="0 0 ([\d.]+) ([\d.]+)"/.exec(svg);
  return vb ? Math.round((width * Number(vb[2])) / Number(vb[1])) : 0;
}

// -------------------------------------------------------------------- PNG -- //

const CRC_TABLE = Array.from({ length: 256 }, (_, n) => {
  let c = n;
  for (let k = 0; k < 8; k += 1) c = c & 1 ? 0xedb88320 ^ (c >>> 1) : c >>> 1;
  return c >>> 0;
});

function crc32(buf) {
  let c = 0xffffffff;
  for (const byte of buf) c = CRC_TABLE[(c ^ byte) & 0xff] ^ (c >>> 8);
  return (c ^ 0xffffffff) >>> 0;
}

/** One iTXt chunk (UTF-8 text, uncompressed). */
function itxt(keyword, text) {
  const data = Buffer.concat([
    Buffer.from(keyword, 'latin1'),
    Buffer.from([0, 0, 0]), // keyword NUL, compression flag, method
    Buffer.from([0, 0]), // empty language tag, empty translated keyword
    Buffer.from(text, 'utf8'),
  ]);
  const type = Buffer.from('iTXt', 'latin1');
  const len = Buffer.alloc(4);
  len.writeUInt32BE(data.length, 0);
  const crc = Buffer.alloc(4);
  crc.writeUInt32BE(crc32(Buffer.concat([type, data])), 0);
  return Buffer.concat([len, type, data, crc]);
}

/** Insert text chunks right after IHDR (8-byte signature + 25-byte IHDR). */
export function withPngText(png, entries) {
  const at = 8 + 25;
  if (png.toString('latin1', 12, 16) !== 'IHDR') throw new Error('figure-export: not a PNG');
  const chunks = entries.map(([k, v]) => itxt(k, v));
  return Buffer.concat([png.subarray(0, at), ...chunks, png.subarray(at)]);
}

/** Render an SVG string to PNG `width` px wide with the given TTF files. */
export async function renderPng(svg, width, fontFiles) {
  const image = await renderAsync(svg, {
    fitTo: { mode: 'width', value: width },
    font: {
      loadSystemFonts: false,
      fontFiles,
      defaultFontFamily: 'Instrument Sans',
      sansSerifFamily: 'Instrument Sans',
      monospaceFamily: 'JetBrains Mono',
    },
    shapeRendering: 2,
    textRendering: 1,
    logLevel: 'error',
  });
  return image.asPng();
}

/** Read the two stylesheets the exports are coloured from. */
export function readSiteStyles(siteRoot) {
  const tokens = readTokens(readFileSync(join(siteRoot, 'src/styles/tokens.css'), 'utf8'));
  const rules = readFigureRules(readFileSync(join(siteRoot, 'src/styles/figures.css'), 'utf8'));
  return { tokens, rules };
}
