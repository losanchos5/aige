#!/usr/bin/env node
// favicon-build: render public/favicon.svg to the legacy public/favicon.ico.
//
// Modern browsers use the SVG icon declared in the document head, but a bare
// request for /favicon.ico still arrives from crawlers, feed readers and older
// clients, and the site has no file to answer it with. The .ico holds a single
// 32x32 PNG image (PNG-in-ICO, understood by every current browser and by
// Windows Vista and later), so the icon stays one source of truth.
//
// The output is committed; this is a manual step, not part of the build, and
// only needs re-running when public/favicon.svg changes:
//
//   node scripts/favicon-build.mjs
import { readFileSync, writeFileSync } from 'node:fs';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import { Resvg } from '@resvg/resvg-js';

const HERE = dirname(fileURLToPath(import.meta.url));
const SITE = resolve(HERE, '..');
const SVG = resolve(SITE, 'public', 'favicon.svg');
const ICO = resolve(SITE, 'public', 'favicon.ico');
const SIZE = 32;

/** Wrap one square PNG in a single-image ICO container. */
function icoFromPng(png, size) {
  const header = Buffer.alloc(6);
  header.writeUInt16LE(0, 0); // reserved
  header.writeUInt16LE(1, 2); // type: 1 = icon
  header.writeUInt16LE(1, 4); // image count

  const entry = Buffer.alloc(16);
  entry.writeUInt8(size < 256 ? size : 0, 0); // width (0 means 256)
  entry.writeUInt8(size < 256 ? size : 0, 1); // height
  entry.writeUInt8(0, 2); // palette size: 0 for truecolour
  entry.writeUInt8(0, 3); // reserved
  entry.writeUInt16LE(1, 4); // colour planes
  entry.writeUInt16LE(32, 6); // bits per pixel
  entry.writeUInt32LE(png.length, 8); // image byte length
  entry.writeUInt32LE(header.length + entry.length, 12); // offset of the image

  return Buffer.concat([header, entry, png]);
}

const svg = readFileSync(SVG);
const png = new Resvg(svg, {
  fitTo: { mode: 'width', value: SIZE },
  background: 'rgba(0,0,0,0)',
})
  .render()
  .asPng();

writeFileSync(ICO, icoFromPng(png, SIZE));
console.log(`favicon-build: public/favicon.ico (${SIZE}x${SIZE}, ${png.length} B PNG)`);
