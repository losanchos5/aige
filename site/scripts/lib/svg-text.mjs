// svg-text.mjs: text helpers for the SVG generators. SVG cannot measure text,
// so textW approximates the advance width of a string in Instrument Sans with a
// per-character-class width table (calibrated against the real font, +6%). wrap
// greedily breaks a label into lines that fit a pixel budget. Shared by the map
// generator; kept dependency-free.

/** Escape the five XML-significant characters for text nodes and attributes. */
export const esc = (s) =>
  String(s)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');

/** Zero-pad a small number to two digits. */
export const pad2 = (n) => String(n).padStart(2, '0');

const NARROW = new Set("iljtfr.,:;'!|I".split(''));
const WIDE = new Set('mwMW'.split(''));

/** Approximate advance-width factor for one character (× fontPx later). */
function charFactor(ch) {
  if (NARROW.has(ch)) return 0.29;
  if (WIDE.has(ch)) return 0.86;
  if (ch >= 'A' && ch <= 'Z') return 0.64;
  if (ch >= '0' && ch <= '9') return 0.57;
  if (ch === ' ') return 0.25;
  if (ch === '&') return 0.7;
  if (ch === '—') return 0.8; // em dash
  return 0.52;
}

/** Approximate advance width in px of `text` at `fontPx` in Instrument Sans. */
export function textW(text, fontPx) {
  let sum = 0;
  for (const ch of String(text)) sum += charFactor(ch);
  return sum * fontPx * 1.06;
}

/**
 * Greedily wrap `text` into lines no wider than `maxPx` at `fontPx`. Returns one
 * or more lines; a single word wider than the budget is left on its own line
 * (the caller decides whether that overflow is fatal).
 */
export function wrap(text, maxPx, fontPx) {
  const words = String(text).split(/\s+/).filter(Boolean);
  const lines = [];
  let line = '';
  for (const word of words) {
    const candidate = line ? `${line} ${word}` : word;
    if (line && textW(candidate, fontPx) > maxPx) {
      lines.push(line);
      line = word;
    } else {
      line = candidate;
    }
  }
  if (line) lines.push(line);
  return lines;
}
