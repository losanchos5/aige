// lib.js: the shared client helpers of the /toolkit tools. An ES module with no
// dependencies and no third-party code, served from the site's own origin, so it
// runs under the CSP (`script-src 'self'`, `img-src 'self' data:`, no `blob:` in
// img-src). Every tool imports from here instead of re-implementing state in the
// link, storage, downloads, the clipboard or image export.
//
// Nothing in this module sends data anywhere: there is no fetch, no beacon and
// no form submission. Importing it has no side effects (no DOM access at load),
// so tests/toolkit.spec.ts can unit-test the pure helpers in Node.
//
// Formats: JSON (RFC 8259, UTF-8), CSV (RFC 4180: CRLF records, fields with a
// comma, a double quote or a line break wrapped in double quotes, inner quotes
// doubled), iCalendar (RFC 5545: CRLF lines folded at 75 octets, TEXT escaping,
// UID + DTSTAMP on every VEVENT, all-day events with an exclusive DTEND).

// ---- Tool data island -------------------------------------------------------

/** Parse the tool's non-executable JSON island
 *  (`<script type="application/json" data-tool-data>`), or null. */
export function readToolData(root = document) {
  const el = root.querySelector('script[type="application/json"][data-tool-data]');
  if (!el) return null;
  try {
    return JSON.parse(el.textContent || '');
  } catch {
    return null;
  }
}

/** Switch a ToolShell page to its scripted mode: hide the no-JS notes, reveal
 *  the parts that only work with JavaScript and flag the root as ready. */
export function mountTool(root) {
  for (const el of document.querySelectorAll('[data-tool-nojs]')) el.hidden = true;
  for (const el of document.querySelectorAll('[data-tool-js]')) el.hidden = false;
  if (root) root.setAttribute('data-tool-ready', 'true');
}

// ---- State in the URL fragment ----------------------------------------------
// The browser does not send the fragment when it requests the page (RFC 3986,
// section 3.5), so it is the right place for a tool's answers: a copied link
// reproduces the result without anything being stored on a server.

/** `#a=1&b=x` -> { a: '1', b: 'x' }. A fragment without `=` (an in-page anchor
 *  such as `#main`) decodes to an empty object.
 *  @param {string | null | undefined} hash
 *  @returns {Record<string, string>} */
export function decodeFragment(hash) {
  const raw = String(hash ?? '').replace(/^#/, '');
  const out = {};
  if (!raw.includes('=')) return out;
  for (const [key, value] of new URLSearchParams(raw)) out[key] = value;
  return out;
}

/** { a: 1, b: '' } -> 'a=1' (empty, null and undefined values are dropped).
 *  @param {Record<string, string | number | null | undefined>} params
 *  @returns {string} */
export function encodeFragment(params) {
  const search = new URLSearchParams();
  for (const [key, value] of Object.entries(params ?? {})) {
    if (value === undefined || value === null || value === '') continue;
    search.set(key, String(value));
  }
  return search.toString();
}

export function readFragment() {
  return decodeFragment(window.location.hash);
}

/** Replace the fragment without adding a history entry, scrolling or firing
 *  `hashchange`. Returns the encoded fragment. */
export function writeFragment(params) {
  const encoded = encodeFragment(params);
  const { pathname, search } = window.location;
  try {
    window.history.replaceState(
      window.history.state,
      '',
      `${pathname}${search}${encoded ? `#${encoded}` : ''}`,
    );
  } catch {
    /* a sandboxed frame may refuse; the state still lives in the form */
  }
  return encoded;
}

/** The absolute link that reproduces `params`. */
export function shareUrl(params) {
  const encoded = encodeFragment(params);
  const { origin, pathname } = window.location;
  return `${origin}${pathname}${encoded ? `#${encoded}` : ''}`;
}

// ---- Safe localStorage -------------------------------------------------------
// Private windows, blocked storage and full quotas throw; every call here
// returns a fallback instead. Keys are namespaced under `aige.toolkit.`.

const PREFIX = 'aige.toolkit.';

export const store = {
  available() {
    try {
      const probe = `${PREFIX}__probe`;
      window.localStorage.setItem(probe, '1');
      window.localStorage.removeItem(probe);
      return true;
    } catch {
      return false;
    }
  },
  get(key, fallback = null) {
    try {
      const raw = window.localStorage.getItem(PREFIX + key);
      return raw === null ? fallback : JSON.parse(raw);
    } catch {
      return fallback;
    }
  },
  set(key, value) {
    try {
      window.localStorage.setItem(PREFIX + key, JSON.stringify(value));
      return true;
    } catch {
      return false;
    }
  },
  remove(key) {
    try {
      window.localStorage.removeItem(PREFIX + key);
      return true;
    } catch {
      return false;
    }
  },
};

// ---- Names and dates ---------------------------------------------------------

/** A file-name-safe slug: ASCII, lower case, hyphens, at most 60 chars.
 *  @param {unknown} text
 *  @returns {string} */
export function slug(text) {
  return String(text ?? '')
    .normalize('NFKD')
    .replace(/[̀-ͯ]/g, '')
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
    .slice(0, 60)
    .replace(/-+$/g, '');
}

/** Today (or `date`) as YYYY-MM-DD in the reader's own time zone. */
export function isoDate(date = new Date()) {
  const pad = (n) => String(n).padStart(2, '0');
  return `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(date.getDate())}`;
}

// ---- Downloads ---------------------------------------------------------------

function clickDownload(filename, href) {
  const link = document.createElement('a');
  link.href = href;
  link.download = filename;
  link.rel = 'noopener';
  link.hidden = true;
  document.body.append(link);
  link.click();
  link.remove();
}

/** Save a Blob through an object URL and `<a download>`. A download is a
 *  navigation, not an image load, so `img-src` does not apply. */
export function downloadBlob(filename, blob) {
  const url = URL.createObjectURL(blob);
  clickDownload(filename, url);
  window.setTimeout(() => URL.revokeObjectURL(url), 30_000);
}

export function downloadText(filename, text, mime = 'text/plain;charset=utf-8') {
  downloadBlob(filename, new Blob([text], { type: mime }));
}

export function downloadJson(filename, data) {
  downloadText(filename, `${JSON.stringify(data, null, 2)}\n`, 'application/json;charset=utf-8');
}

export function downloadMarkdown(filename, text) {
  downloadText(filename, text.endsWith('\n') ? text : `${text}\n`, 'text/markdown;charset=utf-8');
}

// ---- CSV (RFC 4180) ----------------------------------------------------------

/** One CSV field. Strings that a spreadsheet would run as a formula (leading
 *  =, +, -, @, tab or CR) get a leading apostrophe unless `guardFormulas` is
 *  false; numbers are written as they are. */
/** @param {unknown} value
 *  @param {boolean} [guardFormulas]
 *  @returns {string} */
export function csvField(value, guardFormulas = true) {
  if (value === null || value === undefined) return '';
  let text = String(value);
  if (guardFormulas && typeof value === 'string' && /^[=+\-@\t\r]/.test(text)) text = `'${text}`;
  return /[",\r\n]/.test(text) ? `"${text.replace(/"/g, '""')}"` : text;
}

/** Rows (arrays of cells) -> CSV text: CRLF between records and after the last.
 *  @param {ReadonlyArray<ReadonlyArray<unknown>>} rows
 *  @param {{ guardFormulas?: boolean }} [options]
 *  @returns {string} */
export function toCsv(rows, { guardFormulas = true } = {}) {
  return (
    rows.map((row) => row.map((cell) => csvField(cell, guardFormulas)).join(',')).join('\r\n') +
    '\r\n'
  );
}

export function downloadCsv(filename, rows, options) {
  downloadText(filename, toCsv(rows, options), 'text/csv;charset=utf-8;header=present');
}

// ---- iCalendar (RFC 5545) ----------------------------------------------------

const encoder = new TextEncoder();

/** Escape a TEXT value: backslash, semicolon, comma and line breaks.
 *  @param {unknown} value
 *  @returns {string} */
export function icsText(value) {
  return String(value ?? '')
    .replace(/\\/g, '\\\\')
    .replace(/;/g, '\\;')
    .replace(/,/g, '\\,')
    .replace(/\r\n|\r|\n/g, '\\n');
}

/** Fold a content line so no physical line exceeds 75 octets (UTF-8), never
 *  splitting a character: CRLF plus one space starts each continuation.
 *  @param {string} line
 *  @returns {string} */
export function foldLine(line) {
  if (encoder.encode(line).length <= 75) return line;
  const parts = [];
  let current = '';
  let octets = 0;
  let limit = 75;
  for (const char of line) {
    const size = encoder.encode(char).length;
    if (octets + size > limit) {
      parts.push(current);
      current = char;
      octets = size;
      limit = 74; // the leading space of a continuation line counts
    } else {
      current += char;
      octets += size;
    }
  }
  parts.push(current);
  return parts.join('\r\n ');
}

const DATE_RE = /^(\d{4})-(\d{2})-(\d{2})$/;

function parseDate(value) {
  const match = DATE_RE.exec(String(value));
  if (!match) throw new Error(`toIcs: "${value}" is not a YYYY-MM-DD date`);
  const [, y, m, d] = match.map(Number);
  const date = new Date(Date.UTC(y, m - 1, d));
  if (date.getUTCFullYear() !== y || date.getUTCMonth() !== m - 1 || date.getUTCDate() !== d) {
    throw new Error(`toIcs: "${value}" is not a real date`);
  }
  return date;
}

const icsDate = (date) => date.toISOString().slice(0, 10).replace(/-/g, '');
const icsStamp = (date) =>
  date
    .toISOString()
    .replace(/[-:]/g, '')
    .replace(/\.\d{3}Z$/, 'Z');

/**
 * Build an iCalendar file of all-day events.
 * events: [{ uid?, id?, date: 'YYYY-MM-DD', endDate?: 'YYYY-MM-DD' (inclusive),
 *            summary, description?, url? }]
 * A missing `uid` is derived from `id` (or the date and summary), so exporting
 * the same event twice yields the same UID and a calendar updates instead of
 * duplicating it.
 * @param {{ events: Array<{ uid?: string, id?: string, date: string, endDate?: string, summary: string, description?: string, url?: string }>, name?: string, prodId?: string, now?: Date }} calendar
 * @returns {string}
 */
export function toIcs({
  events,
  name,
  prodId = '-//aigovernanceengineer.com//Toolkit//EN',
  now = new Date(),
}) {
  const lines = [
    'BEGIN:VCALENDAR',
    'VERSION:2.0',
    `PRODID:${prodId}`,
    'CALSCALE:GREGORIAN',
    'METHOD:PUBLISH',
  ];
  if (name) lines.push(`X-WR-CALNAME:${icsText(name)}`);
  const stamp = icsStamp(now);
  for (const event of events ?? []) {
    const start = parseDate(event.date);
    const last = parseDate(event.endDate ?? event.date);
    if (last < start) throw new Error(`toIcs: endDate ${event.endDate} is before ${event.date}`);
    // DTEND of a DATE event is exclusive: the day after the last day.
    const end = new Date(last.getTime() + 86_400_000);
    const uid =
      event.uid ?? `${slug(event.id ?? `${event.date}-${event.summary}`)}@aigovernanceengineer.com`;
    lines.push(
      'BEGIN:VEVENT',
      `UID:${uid}`,
      `DTSTAMP:${stamp}`,
      `DTSTART;VALUE=DATE:${icsDate(start)}`,
      `DTEND;VALUE=DATE:${icsDate(end)}`,
      `SUMMARY:${icsText(event.summary)}`,
    );
    if (event.description) lines.push(`DESCRIPTION:${icsText(event.description)}`);
    if (event.url) lines.push(`URL:${String(event.url).replace(/[\r\n]/g, '')}`);
    lines.push('TRANSP:TRANSPARENT', 'END:VEVENT');
  }
  lines.push('END:VCALENDAR');
  return `${lines.map(foldLine).join('\r\n')}\r\n`;
}

export function downloadIcs(filename, calendar) {
  downloadText(filename, toIcs(calendar), 'text/calendar;charset=utf-8');
}

// ---- Markdown ------------------------------------------------------------------

/** Make text safe inside a Markdown table cell.
 *  @param {unknown} text
 *  @returns {string} */
export function mdCell(text) {
  return String(text ?? '')
    .replace(/\\/g, '\\\\')
    .replace(/\|/g, '\\|')
    .replace(/\r?\n/g, ' ');
}

// ---- Clipboard ---------------------------------------------------------------

/** Copy text; falls back to a hidden textarea where the async API is missing.
 *  Resolves true on success. Focus returns to where it was. */
export async function copyText(text) {
  try {
    if (navigator.clipboard && window.isSecureContext) {
      await navigator.clipboard.writeText(text);
      return true;
    }
  } catch {
    /* fall through to the legacy path */
  }
  const active = document.activeElement;
  const area = document.createElement('textarea');
  area.value = text;
  area.setAttribute('readonly', '');
  area.setAttribute('aria-hidden', 'true');
  area.style.position = 'fixed';
  area.style.top = '-1000px';
  document.body.append(area);
  area.select();
  let ok = false;
  try {
    ok = document.execCommand('copy');
  } catch {
    ok = false;
  }
  area.remove();
  if (active instanceof HTMLElement) active.focus();
  return ok;
}

// ---- SVG and PNG export ------------------------------------------------------

/** Escape text for SVG/XML content and attribute values.
 *  @param {unknown} text
 *  @returns {string} */
export function xml(text) {
  return String(text ?? '')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;');
}

/** An `<svg>` element or SVG markup -> a standalone SVG document string.
 *  @param {string | Element} svg
 *  @returns {string} */
export function svgDocument(svg) {
  let markup = typeof svg === 'string' ? svg : new XMLSerializer().serializeToString(svg);
  if (!/xmlns="http:\/\/www\.w3\.org\/2000\/svg"/.test(markup)) {
    markup = markup.replace(/<svg\b/, '<svg xmlns="http://www.w3.org/2000/svg"');
  }
  return markup.startsWith('<?xml') ? markup : `<?xml version="1.0" encoding="UTF-8"?>\n${markup}`;
}

export function svgDataUrl(svg) {
  return `data:image/svg+xml;charset=utf-8,${encodeURIComponent(svgDocument(svg))}`;
}

export function downloadSvg(filename, svg) {
  downloadText(filename, `${svgDocument(svg)}\n`, 'image/svg+xml;charset=utf-8');
}

/** Rasterise an SVG to a PNG `data:` URL: the SVG loads as a `data:` image
 *  (allowed by img-src), is drawn on a canvas at `scale`, and the canvas is
 *  read back as `data:image/png`. The SVG must carry width and height. Web
 *  fonts do not reach an SVG drawn as an image, so text uses the font stack's
 *  system fallback. */
export async function svgToPngDataUrl(svg, { scale = 2, background } = {}) {
  const image = new Image();
  image.decoding = 'async';
  const loaded = new Promise((resolve, reject) => {
    image.onload = () => resolve();
    image.onerror = () => reject(new Error('The image could not be drawn.'));
  });
  image.src = svgDataUrl(svg);
  await loaded;
  const width = image.naturalWidth || 800;
  const height = image.naturalHeight || 600;
  const canvas = document.createElement('canvas');
  canvas.width = Math.round(width * scale);
  canvas.height = Math.round(height * scale);
  const context = canvas.getContext('2d');
  if (!context) throw new Error('This browser cannot draw to a canvas.');
  if (background) {
    context.fillStyle = background;
    context.fillRect(0, 0, canvas.width, canvas.height);
  }
  context.drawImage(image, 0, 0, canvas.width, canvas.height);
  return canvas.toDataURL('image/png');
}

export async function downloadPng(filename, svg, options) {
  clickDownload(filename, await svgToPngDataUrl(svg, options));
}

// ---- Files -------------------------------------------------------------------

/** Read a user-picked file as JSON, in the browser. Rejects with a message
 *  written for the reader. */
export function readJsonFile(file, { maxBytes = 512 * 1024 } = {}) {
  return new Promise((resolve, reject) => {
    if (!file) {
      reject(new Error('Choose a file first.'));
      return;
    }
    if (file.size > maxBytes) {
      reject(
        new Error(`That file is ${Math.ceil(file.size / 1024)} KB; a profile is a few KB at most.`),
      );
      return;
    }
    const reader = new FileReader();
    reader.onerror = () => reject(new Error('The file could not be read.'));
    reader.onload = () => {
      try {
        resolve(JSON.parse(String(reader.result ?? '')));
      } catch {
        reject(new Error('That file is not valid JSON.'));
      }
    };
    reader.readAsText(file);
  });
}

// ---- DOM and accessibility -----------------------------------------------------

/** Create an element: `h('p', { class: 'x', text: 'Hi' }, child, 'text')`.
 *  Text always goes in as text, never as HTML. */
export function h(tag, attrs = {}, ...children) {
  const el = document.createElement(tag);
  for (const [key, value] of Object.entries(attrs ?? {})) {
    if (value === false || value === null || value === undefined) continue;
    if (key === 'class') el.className = String(value);
    else if (key === 'text') el.textContent = String(value);
    else if (key.startsWith('on') && typeof value === 'function')
      el.addEventListener(key.slice(2), value);
    else el.setAttribute(key, value === true ? '' : String(value));
  }
  for (const child of children.flat()) {
    if (child === null || child === undefined || child === false) continue;
    el.append(child instanceof Node ? child : String(child));
  }
  return el;
}

/** Put a message in a live region (`role="status"`). Cleared first, then set
 *  on the next tick, so repeating the same message is announced again. */
export function announce(region, message) {
  if (!region) return;
  region.textContent = '';
  window.setTimeout(() => {
    region.textContent = message;
  }, 40);
}

/** Move focus to a heading or container that is not focusable by default. */
export function focusOn(el) {
  if (!el) return;
  if (!el.hasAttribute('tabindex')) el.setAttribute('tabindex', '-1');
  el.focus();
}

export function prefersReducedMotion() {
  try {
    return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  } catch {
    return false;
  }
}
