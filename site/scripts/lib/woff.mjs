// woff.mjs: turn a WOFF or WOFF2 web font back into a plain sfnt (TTF/OTF)
// buffer, with nothing but node:zlib. The figure exporter needs it because
// @resvg/resvg-js only loads TrueType/OpenType files, while the site ships its
// faces as @fontsource WOFF/WOFF2 packages (Instrument Sans exists only as a
// variable WOFF2). Decoding at build time keeps the PNG exports on the site's
// own faces on every machine (CI included) without committing font binaries.
//
//   woffToSfnt(buffer) -> Buffer   // accepts wOFF, wOF2 or an sfnt (returned as is)
//
// WOFF 1.0: each table is zlib-compressed on its own. WOFF 2.0: one Brotli
// stream holds every table; `glyf`/`loca` usually arrive in the transformed
// form of the W3C WOFF 2.0 recommendation (section 5.1), which is rebuilt here
// into standard TrueType outlines, and `hmtx` may arrive transformed too
// (section 5.4). Checksums are recomputed; the output always uses long `loca`.
import { brotliDecompressSync, inflateSync } from 'node:zlib';

const KNOWN_TAGS = [
  'cmap', 'head', 'hhea', 'hmtx', 'maxp', 'name', 'OS/2', 'post', 'cvt ', 'fpgm', 'glyf', 'loca',
  'prep', 'CFF ', 'VORG', 'EBDT', 'EBLC', 'gasp', 'hdmx', 'kern', 'LTSH', 'PCLT', 'VDMX', 'vhea',
  'vmtx', 'BASE', 'GDEF', 'GPOS', 'GSUB', 'EBSC', 'JSTF', 'MATH', 'CBDT', 'CBLC', 'COLR', 'CPAL',
  'SVG ', 'sbix', 'acnt', 'avar', 'bdat', 'bloc', 'bsln', 'cvar', 'fdsc', 'feat', 'fmtx', 'fvar',
  'gvar', 'hsty', 'just', 'lcar', 'mort', 'morx', 'opbd', 'prop', 'trak', 'Zapf', 'Silf', 'Glat',
  'Gloc', 'Feat', 'Sill',
];

/** A forward-only big-endian reader over a Buffer. */
class Reader {
  constructor(buf, pos = 0) {
    this.buf = buf;
    this.pos = pos;
  }
  u8() {
    return this.buf.readUInt8(this.pos++);
  }
  u16() {
    const v = this.buf.readUInt16BE(this.pos);
    this.pos += 2;
    return v;
  }
  i16() {
    const v = this.buf.readInt16BE(this.pos);
    this.pos += 2;
    return v;
  }
  u32() {
    const v = this.buf.readUInt32BE(this.pos);
    this.pos += 4;
    return v;
  }
  bytes(n) {
    const out = this.buf.subarray(this.pos, this.pos + n);
    this.pos += n;
    return out;
  }
  /** UIntBase128 (WOFF2 section 4.1). */
  base128() {
    let value = 0;
    for (let i = 0; i < 5; i += 1) {
      const byte = this.u8();
      if (i === 0 && byte === 0x80) throw new Error('woff2: UIntBase128 with a leading zero');
      if (value & 0xfe000000) throw new Error('woff2: UIntBase128 overflow');
      value = (value << 7) | (byte & 0x7f);
      if ((byte & 0x80) === 0) return value >>> 0;
    }
    throw new Error('woff2: UIntBase128 longer than five bytes');
  }
  /** 255UInt16 (WOFF2 section 4.2). */
  u255() {
    const code = this.u8();
    if (code === 253) return this.u16();
    if (code === 255) return this.u8() + 253;
    if (code === 254) return this.u8() + 506;
    return code;
  }
}

const pad4 = (n) => (n + 3) & ~3;

/** OpenType table checksum: the sum of the big-endian uint32 words, mod 2^32. */
function checksum(buf) {
  const padded = buf.length % 4 ? Buffer.concat([buf, Buffer.alloc(4 - (buf.length % 4))]) : buf;
  let sum = 0;
  for (let i = 0; i < padded.length; i += 4) sum = (sum + padded.readUInt32BE(i)) >>> 0;
  return sum;
}

/** Assemble an sfnt from { tag -> Buffer }, tables sorted by tag, 4-byte aligned. */
function buildSfnt(flavor, tables) {
  const tags = Object.keys(tables).sort();
  const numTables = tags.length;
  let entrySelector = 0;
  while (1 << (entrySelector + 1) <= numTables) entrySelector += 1;
  const searchRange = (1 << entrySelector) * 16;
  const header = Buffer.alloc(12 + 16 * numTables);
  header.writeUInt32BE(flavor, 0);
  header.writeUInt16BE(numTables, 4);
  header.writeUInt16BE(searchRange, 6);
  header.writeUInt16BE(entrySelector, 8);
  header.writeUInt16BE(numTables * 16 - searchRange, 10);

  // head.checkSumAdjustment is zeroed before the table checksums are taken.
  if (tables.head && tables.head.length >= 12) {
    tables.head = Buffer.from(tables.head);
    tables.head.writeUInt32BE(0, 8);
  }

  const chunks = [header];
  let offset = header.length;
  tags.forEach((tag, i) => {
    const data = tables[tag];
    const rec = 12 + i * 16;
    header.write(tag.padEnd(4, ' '), rec, 4, 'latin1');
    header.writeUInt32BE(checksum(data), rec + 4);
    header.writeUInt32BE(offset, rec + 8);
    header.writeUInt32BE(data.length, rec + 12);
    chunks.push(data);
    const padding = pad4(data.length) - data.length;
    if (padding) chunks.push(Buffer.alloc(padding));
    offset += pad4(data.length);
  });
  const font = Buffer.concat(chunks);
  if (tables.head) {
    const headOffset = header.readUInt32BE(12 + tags.indexOf('head') * 16 + 8);
    font.writeUInt32BE((0xb1b0afba - checksum(font)) >>> 0, headOffset + 8);
  }
  return font;
}

// ------------------------------------------------------------------ WOFF 1 -- //

function woff1ToSfnt(buf) {
  const r = new Reader(buf, 4);
  const flavor = r.u32();
  r.u32(); // length
  const numTables = r.u16();
  const tables = {};
  for (let i = 0; i < numTables; i += 1) {
    const at = 44 + i * 20;
    const tag = buf.toString('latin1', at, at + 4);
    const offset = buf.readUInt32BE(at + 4);
    const compLength = buf.readUInt32BE(at + 8);
    const origLength = buf.readUInt32BE(at + 12);
    const raw = buf.subarray(offset, offset + compLength);
    tables[tag] = compLength < origLength ? inflateSync(raw) : Buffer.from(raw);
    if (tables[tag].length !== origLength) throw new Error(`woff: table ${tag} length mismatch`);
  }
  return buildSfnt(flavor, tables);
}

// ------------------------------------------------------------------ WOFF 2 -- //

const withSign = (flag, value) => (flag & 1 ? value : -value);

/** Decode one point's (dx, dy) from its flag and the glyph stream (section 5.2). */
function triplet(flag, glyphs) {
  if (flag < 10) return [0, withSign(flag, ((flag & 14) << 7) + glyphs.u8())];
  if (flag < 20) return [withSign(flag, (((flag - 10) & 14) << 7) + glyphs.u8()), 0];
  if (flag < 84) {
    const b0 = flag - 20;
    const b1 = glyphs.u8();
    return [
      withSign(flag, 1 + (b0 & 0x30) + (b1 >> 4)),
      withSign(flag >> 1, 1 + ((b0 & 0x0c) << 2) + (b1 & 0x0f)),
    ];
  }
  if (flag < 120) {
    const b0 = flag - 84;
    const dx = withSign(flag, 1 + (Math.floor(b0 / 12) << 8) + glyphs.u8());
    const dy = withSign(flag >> 1, 1 + (((b0 % 12) >> 2) << 8) + glyphs.u8());
    return [dx, dy];
  }
  if (flag < 124) {
    const b1 = glyphs.u8();
    const b2 = glyphs.u8();
    const b3 = glyphs.u8();
    return [withSign(flag, (b1 << 4) + (b2 >> 4)), withSign(flag >> 1, ((b2 & 0x0f) << 8) + b3)];
  }
  return [withSign(flag, glyphs.u16()), withSign(flag >> 1, glyphs.u16())];
}

/** Encode one simple glyph in plain TrueType form (int16 coordinates, no packing). */
function encodeSimple(endPts, points, instructions, bbox, overlap) {
  const n = points.length;
  const size = 10 + 2 * endPts.length + 2 + instructions.length + n + 4 * n;
  const out = Buffer.alloc(size);
  let p = 0;
  out.writeInt16BE(endPts.length, p);
  out.writeInt16BE(bbox[0], p + 2);
  out.writeInt16BE(bbox[1], p + 4);
  out.writeInt16BE(bbox[2], p + 6);
  out.writeInt16BE(bbox[3], p + 8);
  p += 10;
  for (const e of endPts) {
    out.writeUInt16BE(e, p);
    p += 2;
  }
  out.writeUInt16BE(instructions.length, p);
  p += 2;
  instructions.copy(out, p);
  p += instructions.length;
  points.forEach((pt, i) => {
    out.writeUInt8((pt.on ? 0x01 : 0) | (overlap && i === 0 ? 0x40 : 0), p);
    p += 1;
  });
  let prev = 0;
  for (const pt of points) {
    out.writeInt16BE(pt.x - prev, p);
    prev = pt.x;
    p += 2;
  }
  prev = 0;
  for (const pt of points) {
    out.writeInt16BE(pt.y - prev, p);
    prev = pt.y;
    p += 2;
  }
  return out;
}

/** Rebuild `glyf` and a long-format `loca` from the transformed glyf table (section 5.1). */
function reconstructGlyf(data) {
  const h = new Reader(data);
  h.u16(); // reserved
  const optionFlags = h.u16();
  const numGlyphs = h.u16();
  h.u16(); // indexFormat (the output is always long loca)
  const sizes = Array.from({ length: 7 }, () => h.u32());
  let at = h.pos;
  const stream = (size) => {
    const s = new Reader(data.subarray(at, at + size));
    at += size;
    return s;
  };
  const nContourS = stream(sizes[0]);
  const nPointsS = stream(sizes[1]);
  const flagS = stream(sizes[2]);
  const glyphS = stream(sizes[3]);
  const compositeS = stream(sizes[4]);
  const bboxBitmapLen = 4 * Math.floor((numGlyphs + 31) / 32);
  const bboxBitmap = data.subarray(at, at + bboxBitmapLen);
  const bboxS = new Reader(data.subarray(at + bboxBitmapLen, at + sizes[5]));
  at += sizes[5];
  const instrS = stream(sizes[6]);
  const overlapBitmap = optionFlags & 1 ? data.subarray(at, at + Math.floor((numGlyphs + 7) / 8)) : null;

  const hasBit = (bitmap, i) => Boolean(bitmap[i >> 3] & (0x80 >> (i & 7)));
  const glyphs = [];
  for (let g = 0; g < numGlyphs; g += 1) {
    const nContours = nContourS.i16();
    const explicitBbox = hasBit(bboxBitmap, g);
    if (nContours === 0) {
      glyphs.push(Buffer.alloc(0));
      continue;
    }
    if (nContours === -1) {
      // Composite: copy component records until MORE_COMPONENTS clears.
      const start = compositeS.pos;
      let haveInstructions = false;
      let more = true;
      while (more) {
        const flags = compositeS.u16();
        compositeS.u16(); // glyph index
        compositeS.pos += flags & 0x0001 ? 4 : 2; // ARG_1_AND_2_ARE_WORDS
        if (flags & 0x0008) compositeS.pos += 2; // WE_HAVE_A_SCALE
        else if (flags & 0x0040) compositeS.pos += 4; // WE_HAVE_AN_X_AND_Y_SCALE
        else if (flags & 0x0080) compositeS.pos += 8; // WE_HAVE_A_TWO_BY_TWO
        if (flags & 0x0100) haveInstructions = true;
        more = Boolean(flags & 0x0020);
      }
      const components = compositeS.buf.subarray(start, compositeS.pos);
      if (!explicitBbox) throw new Error(`woff2: composite glyph ${g} without a bbox`);
      const bbox = [bboxS.i16(), bboxS.i16(), bboxS.i16(), bboxS.i16()];
      let instructions = Buffer.alloc(0);
      if (haveInstructions) instructions = instrS.bytes(glyphS.u255());
      const head = Buffer.alloc(10);
      head.writeInt16BE(-1, 0);
      bbox.forEach((v, i) => head.writeInt16BE(v, 2 + i * 2));
      const tail = haveInstructions ? Buffer.alloc(2) : Buffer.alloc(0);
      if (haveInstructions) tail.writeUInt16BE(instructions.length, 0);
      glyphs.push(Buffer.concat([head, components, tail, instructions]));
      continue;
    }
    // Simple glyph.
    const endPts = [];
    let total = 0;
    for (let c = 0; c < nContours; c += 1) {
      total += nPointsS.u255();
      endPts.push(total - 1);
    }
    const points = [];
    let x = 0;
    let y = 0;
    for (let i = 0; i < total; i += 1) {
      const flag = flagS.u8();
      const [dx, dy] = triplet(flag & 0x7f, glyphS);
      x += dx;
      y += dy;
      points.push({ x, y, on: (flag & 0x80) === 0 });
    }
    const instructions = instrS.bytes(glyphS.u255());
    let bbox;
    if (explicitBbox) bbox = [bboxS.i16(), bboxS.i16(), bboxS.i16(), bboxS.i16()];
    else {
      bbox = [Infinity, Infinity, -Infinity, -Infinity];
      for (const pt of points) {
        bbox[0] = Math.min(bbox[0], pt.x);
        bbox[1] = Math.min(bbox[1], pt.y);
        bbox[2] = Math.max(bbox[2], pt.x);
        bbox[3] = Math.max(bbox[3], pt.y);
      }
    }
    const overlap = overlapBitmap ? hasBit(overlapBitmap, g) : false;
    glyphs.push(encodeSimple(endPts, points, instructions, bbox, overlap));
  }

  const loca = Buffer.alloc(4 * (numGlyphs + 1));
  const parts = [];
  let offset = 0;
  glyphs.forEach((glyph, i) => {
    loca.writeUInt32BE(offset, i * 4);
    parts.push(glyph);
    const padding = pad4(glyph.length) - glyph.length;
    if (padding) parts.push(Buffer.alloc(padding));
    offset += pad4(glyph.length);
  });
  loca.writeUInt32BE(offset, numGlyphs * 4);
  return { glyf: Buffer.concat(parts), loca, numGlyphs };
}

/** Rebuild `hmtx` from its transformed form (section 5.4); needs glyf xMin per glyph. */
function reconstructHmtx(data, numGlyphs, numHMetrics, glyf, loca) {
  const r = new Reader(data);
  const flags = r.u8();
  const advances = Array.from({ length: numHMetrics }, () => r.u16());
  const xMin = (g) => {
    const start = loca.readUInt32BE(g * 4);
    const end = loca.readUInt32BE(g * 4 + 4);
    return end > start ? glyf.readInt16BE(start + 2) : 0;
  };
  const lsbs = [];
  for (let g = 0; g < numHMetrics; g += 1) lsbs.push(flags & 1 ? xMin(g) : r.i16());
  for (let g = numHMetrics; g < numGlyphs; g += 1) lsbs.push(flags & 2 ? xMin(g) : r.i16());
  const out = Buffer.alloc(4 * numHMetrics + 2 * (numGlyphs - numHMetrics));
  let p = 0;
  for (let g = 0; g < numGlyphs; g += 1) {
    if (g < numHMetrics) {
      out.writeUInt16BE(advances[g], p);
      out.writeInt16BE(lsbs[g], p + 2);
      p += 4;
    } else {
      out.writeInt16BE(lsbs[g], p);
      p += 2;
    }
  }
  return out;
}

function woff2ToSfnt(buf) {
  const r = new Reader(buf, 4);
  const flavor = r.u32();
  r.u32(); // length
  const numTables = r.u16();
  r.u16(); // reserved
  r.u32(); // totalSfntSize
  const totalCompressedSize = r.u32();
  r.pos = 48; // skip version, metadata and private-data fields
  if (flavor === 0x74746366) throw new Error('woff2: font collections are not supported');

  const directory = [];
  for (let i = 0; i < numTables; i += 1) {
    const flags = r.u8();
    const tagIndex = flags & 0x3f;
    const tag = tagIndex === 0x3f ? r.bytes(4).toString('latin1') : KNOWN_TAGS[tagIndex];
    const version = (flags >> 6) & 0x03;
    const origLength = r.base128();
    // glyf/loca: version 0 is the transform and 3 the null transform; every
    // other table: version 0 is the null transform.
    const transformed = tag === 'glyf' || tag === 'loca' ? version === 0 : version !== 0;
    const length = transformed ? r.base128() : origLength;
    directory.push({ tag, origLength, length, transformed });
  }
  const stream = brotliDecompressSync(buf.subarray(r.pos, r.pos + totalCompressedSize));

  const raw = {};
  let offset = 0;
  for (const entry of directory) {
    raw[entry.tag] = { ...entry, data: stream.subarray(offset, offset + entry.length) };
    offset += entry.length;
  }

  const tables = {};
  let glyfResult = null;
  if (raw.glyf?.transformed) {
    glyfResult = reconstructGlyf(raw.glyf.data);
    tables.glyf = glyfResult.glyf;
    tables.loca = glyfResult.loca;
  }
  for (const entry of directory) {
    if (tables[entry.tag]) continue;
    if (entry.tag === 'hmtx' && entry.transformed) continue; // below, needs glyf
    if (entry.transformed && entry.tag !== 'hmtx') {
      throw new Error(`woff2: unsupported transform on table ${entry.tag}`);
    }
    tables[entry.tag] = Buffer.from(raw[entry.tag].data);
  }
  if (glyfResult && tables.head) tables.head.writeInt16BE(1, 50); // indexToLocFormat: long
  if (raw.hmtx?.transformed) {
    if (!glyfResult) throw new Error('woff2: transformed hmtx without transformed glyf');
    const numHMetrics = tables.hhea.readUInt16BE(34);
    tables.hmtx = reconstructHmtx(
      raw.hmtx.data,
      glyfResult.numGlyphs,
      numHMetrics,
      glyfResult.glyf,
      glyfResult.loca,
    );
  }
  return buildSfnt(flavor, tables);
}

/** Return a TrueType/OpenType buffer for a WOFF, WOFF2 or sfnt input. */
export function woffToSfnt(buf) {
  const signature = buf.toString('latin1', 0, 4);
  if (signature === 'wOFF') return woff1ToSfnt(buf);
  if (signature === 'wOF2') return woff2ToSfnt(buf);
  return buf;
}
