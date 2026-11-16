#!/usr/bin/env node
// paintings-build: the Monet paintings of the editorial-restraint design as
// responsive WebP files in public/paintings/.
//
// Each original is downloaded once from Wikimedia Commons (the file page and
// its licence tag are recorded in public/paintings/CREDITS.md and
// src/data/paintings.ts), then encoded with sharp at the widths the layout
// renders at DPR 1 and 2, never wider than the original. The thin frames (the
// author byline and the cite card) get a tight crop of a coloured, brushy
// region instead of the whole painting, so the strokes stay legible and the
// file stays small. The output is committed; this is a manual step, not part
// of the build:
//
//   node scripts/paintings-build.mjs [cache-dir]
//
// It prints, per file, the intrinsic size and bytes, and per painting the
// dominant colour used as the placeholder background in src/data/paintings.ts.
import { existsSync, mkdirSync, statSync, writeFileSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { dirname, join, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import sharp from 'sharp';

const HERE = dirname(fileURLToPath(import.meta.url));
const SITE = resolve(HERE, '..');
const OUT = resolve(SITE, 'public', 'paintings');
const CACHE = resolve(process.argv[2] ?? join(tmpdir(), 'aige-paintings-src'));
const UA = 'aige-site-paintings/1.0 (https://aigovernanceengineer.com; asset build script)';
const UPLOAD = 'https://upload.wikimedia.org/wikipedia/commons/';

// Widths per role: mats and the strip span the 1200px container, cards and the
// feature half of it; the crops fill a frame about 300px wide.
const WIDE = [1200, 1600, 2400];
const HALF = [640, 1280];

// rect: the crop in fractions of the original (left, top, right, bottom),
// taken from the mockup's object-position, scale and transform-origin.
// soften: a gaussian sigma for the two grainy scans (Vetheuil, misty Pourville):
// their scan noise doubles the bytes, and 0.7 px removes it without touching
// the brushwork.
const PAINTINGS = [
  { slug: 'charing-cross-bridge-1899', src: '2/2f/Charing_Cross_Bridge%2C_Monet.jpg', widths: WIDE },
  { slug: 'pourville-misty-morning-1882', src: 'e/ec/Le_Matin_temps_brumeux_Pourville_%281882%29_Claude_Monet_-_Birmingham_Museum_of_Art_%28W_711%29.jpg', widths: WIDE, soften: 0.7 },
  { slug: 'ice-floes-1893', src: '5/51/Ice_Floes_MET_DT2158.jpg', widths: WIDE },
  { slug: 'pourville-cliff-morning-1897', src: 'b/bb/MBAM_Monet_-_Falaise_de_Pourville%2C_le_matin.jpg', widths: HALF },
  { slug: 'vetheuil-fog-1879', src: '9/9b/Monet%2C_Claude_-_Vetheuil_in_the_Fog.jpg', widths: HALF, soften: 0.7 },
  { slug: 'vernon-church-fog-1894', src: '8/8b/Monet_-_Kirche_von_Vernon_im_Nebel_-_1894.jpg', widths: HALF },
  { slug: 'antibes-morning-1888', src: 'b/b4/Morning_at_Antibes_%28Claude_Monet%2C_1888%29.jpg', widths: HALF },
  {
    slug: 'morning-seine-giverny-1897',
    src: '2/2f/Morning_on_the_Seine_near_Giverny_MET_DT1903.jpg',
    widths: HALF,
    crops: [
      // The blue-green water with yellow and rose flecks (mockup: scale 2.2 at 62% 66%).
      { name: 'byline', rect: [0.34, 0.44, 0.8, 0.6], widths: [320, 640] },
      // The cite card: the upper river and trees (mockup: scale 1.3 at 60% 30%).
      { name: 'cite', rect: [0.24, 0.07, 0.79, 0.84], widths: [320, 640] },
    ],
  },
];

// Byte budget per file by width (crops: 30 KB); the encoder steps the WebP
// quality down from 76 until the file fits, but never below 50.
const budget = (width, crop) => (crop ? 30e3 : width <= 700 ? 60e3 : width <= 1300 ? 160e3 : width <= 1600 ? 240e3 : 450e3);
const QUALITIES = [76, 70, 64, 58, 52, 50];

async function original(src) {
  mkdirSync(CACHE, { recursive: true });
  const file = join(CACHE, src.split('/').pop());
  if (!existsSync(file)) {
    const res = await fetch(UPLOAD + src, { headers: { 'User-Agent': UA } });
    if (!res.ok) throw new Error(`${src}: HTTP ${res.status}`);
    writeFileSync(file, Buffer.from(await res.arrayBuffer()));
  }
  return file;
}

async function encode(input, width, name, crop = false, soften = 0) {
  const file = join(OUT, `${name}-${width}.webp`);
  let out;
  for (const quality of QUALITIES) {
    // sharp drops EXIF, ICC and XMP unless asked to keep them.
    const sized = input.clone().resize({ width });
    out = await (soften ? sized.blur(soften) : sized).webp({ quality, effort: 6 }).toBuffer({ resolveWithObject: true });
    if (out.data.length <= budget(width, crop)) break;
  }
  writeFileSync(file, out.data);
  console.log(`${name}-${width}.webp ${out.info.width}x${out.info.height} ${out.data.length} B`);
}

// The placeholder colour: the mean of the whole image (a 1x1 resize).
async function colour(img) {
  const { data } = await img.clone().resize(1, 1).removeAlpha().raw().toBuffer({ resolveWithObject: true });
  return '#' + [...data].map((v) => v.toString(16).padStart(2, '0')).join('');
}

mkdirSync(OUT, { recursive: true });
for (const p of PAINTINGS) {
  const file = await original(p.src);
  const base = sharp(file);
  const { width: W, height: H } = await base.metadata();
  console.log(`# monet-${p.slug} original ${W}x${H} colour ${await colour(base)}`);
  // Never upscale: a width above the original becomes the original's width.
  const widths = [...new Set(p.widths.map((w) => Math.min(w, W)))];
  for (const w of widths) await encode(base, w, `monet-${p.slug}`, false, p.soften);
  for (const c of p.crops ?? []) {
    const [l, t, r, b] = c.rect;
    const region = { left: Math.round(l * W), top: Math.round(t * H), width: Math.round((r - l) * W), height: Math.round((b - t) * H) };
    const cropped = sharp(await base.clone().extract(region).toBuffer());
    console.log(`# crop ${c.name} ${region.width}x${region.height} colour ${await colour(cropped)}`);
    for (const w of c.widths.filter((w) => w <= region.width)) await encode(cropped, w, `monet-${p.slug}-crop-${c.name}`, true);
  }
}

// The hero painting already ships in public/hero/; only its colour is read.
console.log(`# monet-seine-giverny-1897 (public/hero) colour ${await colour(sharp(resolve(SITE, 'public', 'hero', 'monet-seine-giverny-1897-1200.webp')))}`);
