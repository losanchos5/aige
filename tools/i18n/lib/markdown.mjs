// A line-based Markdown block parser tailored to the content of this
// repository (GitHub-flavoured Markdown as STYLEGUIDE.md allows it): ATX
// headings, paragraphs, bullet and ordered lists (nested), blockquotes and
// callouts, GFM tables, fenced and indented code, HTML blocks, thematic breaks.
// Each block keeps the raw lines it came from, so a document whose segments are
// left untranslated renders back byte for byte. Translatable text is exposed as
// segments (one per heading, paragraph run, list-item paragraph, table cell);
// everything else is verbatim. Constructs the content does not use (setext
// headings, hard line breaks) are rejected with the line number, so a future
// edit fails loudly instead of producing a broken translation.

const FENCE_RE = /^( {0,3})(`{3,}|~{3,})(.*)$/;
const ATX_RE = /^ {0,3}(#{1,6})(?:[ \t]+(.*?))?(?:[ \t]+#+)?[ \t]*$/;
const THEMATIC_RE = /^ {0,3}(?:(?:\*[ \t]*){3,}|(?:-[ \t]*){3,}|(?:_[ \t]*){3,})$/;
const QUOTE_RE = /^( {0,3}> ?)(.*)$/;
const LIST_RE = /^( {0,3})([-+*]|\d{1,9}[.)])(?:([ \t]+)(.*))?$/;
const HTML_START_RE = /^ {0,3}<(?:[A-Za-z][A-Za-z0-9-]*[\s/>]|\/[A-Za-z]|!--|\?|![A-Z])/;
const DELIM_ROW_RE = /^ {0,3}\|?[ \t]*:?-+:?[ \t]*(?:\|[ \t]*:?-+:?[ \t]*)*\|?[ \t]*$/;
const LABEL_RE = /^(\*\*(?:In practice|Example|Anti-pattern|Postings|Note|Warning)\b[^*\n]*\*\*)(?:[ \t]+(.*))?$/;
const MAPS_TO_RE = /^(\*\*Maps to:\*\*)(?:[ \t]+(.*))?$/;

export class MarkdownError extends Error {}

const isBlank = (l) => /^[ \t]*$/.test(l);
const indentOf = (l) => /^[ \t]*/.exec(l)[0].replace(/\t/g, '    ').length;

function listMarker(line) {
  const m = LIST_RE.exec(line);
  if (!m) return null;
  const [, indent, marker, spaces = '', rest = ''] = m;
  if (spaces === '' && rest === '' && !line.endsWith(marker)) return null;
  const ordered = /\d/.test(marker[0]);
  const empty = rest.trim() === '';
  // 1-4 spaces after the marker set the content indent; 5+ means "marker + 1".
  const sp = empty ? 1 : spaces.replace(/\t/g, '    ').length;
  const width = indent.length + marker.length + (sp >= 5 ? 1 : sp);
  return {
    indent: indent.length,
    marker,
    ordered,
    start: ordered ? Number(marker.slice(0, -1)) : null,
    delim: ordered ? marker.slice(-1) : marker,
    width,
    empty,
    prefix: line.slice(0, Math.min(line.length, indent.length + marker.length + (sp >= 5 ? 1 : spaces.length))),
  };
}

function isTableStart(lines, i) {
  return i + 1 < lines.length && lines[i].includes('|') && DELIM_ROW_RE.test(lines[i + 1]) && lines[i + 1].includes('|')
    && splitRow(lines[i]).cells.length === splitRow(lines[i + 1]).cells.length;
}

/** Does this line open a block that interrupts a paragraph? */
function interruptsParagraph(lines, i) {
  const l = lines[i];
  if (ATX_RE.test(l) || FENCE_RE.test(l) || QUOTE_RE.test(l) || THEMATIC_RE.test(l)) return true;
  if (HTML_START_RE.test(l)) return true;
  const lm = listMarker(l);
  if (lm && !lm.empty && (!lm.ordered || lm.start === 1)) return true;
  if (isTableStart(lines, i)) return true;
  return false;
}

/** Split a table row into cells, keeping the exact whitespace around each cell. */
export function splitRow(line) {
  const parts = [];
  let cur = '';
  for (let i = 0; i < line.length; i++) {
    const c = line[i];
    if (c === '\\' && i + 1 < line.length) {
      cur += c + line[i + 1];
      i++;
      continue;
    }
    if (c === '|') {
      parts.push(cur);
      cur = '';
      continue;
    }
    cur += c;
  }
  parts.push(cur);
  const lead = /^\s*\|/.test(line);
  const trail = /\|\s*$/.test(line) && !/\\\|\s*$/.test(line);
  let cells = parts;
  let head = '';
  let tail = '';
  if (lead) {
    head = cells[0];
    cells = cells.slice(1);
  }
  if (trail) {
    tail = cells[cells.length - 1];
    cells = cells.slice(0, -1);
  }
  return {
    lead,
    trail,
    head,
    tail,
    cells: cells.map((raw) => {
      const m = /^(\s*)([\s\S]*?)(\s*)$/.exec(raw);
      return { before: m[1], text: m[2], after: m[3] };
    }),
  };
}

/**
 * Parse Markdown text (LF line endings, no frontmatter) into blocks.
 * @returns {{ blocks: object[], segments: object[], eofNewline: boolean }}
 */
export function parseMarkdown(text, { file = '<text>' } = {}) {
  if (text.includes('\r')) throw new MarkdownError(`${file}: CR characters; normalise line endings to LF first`);
  const eofNewline = text.endsWith('\n');
  const body = eofNewline ? text.slice(0, -1) : text;
  const lines = body === '' ? [] : body.split('\n');
  const ctx = { file };
  const blocks = parseBlocks(lines, ctx, { quote: false, offsets: lines.map((_, i) => i + 1) });
  markSources(blocks);
  return { blocks, segments: collectSegments(blocks), eofNewline };
}

function fail(ctx, lineNo, msg) {
  throw new MarkdownError(`${ctx.file}:${lineNo}: ${msg}`);
}

/**
 * @param lines   the container's inner lines (prefixes already stripped)
 * @param opts.quote   inside a blockquote (callout labels are recognised)
 * @param opts.offsets line numbers in the original file, for error messages
 */
function parseBlocks(lines, ctx, opts) {
  const blocks = [];
  let i = 0;
  const lineNo = (k) => opts.offsets[k] ?? 0;

  while (i < lines.length) {
    const line = lines[i];

    if (isBlank(line)) {
      const start = i;
      while (i < lines.length && isBlank(lines[i])) i++;
      blocks.push({ type: 'blank', lines: lines.slice(start, i) });
      continue;
    }

    const fence = FENCE_RE.exec(line);
    if (fence && !(fence[2][0] === '`' && fence[3].includes('`'))) {
      const ch = fence[2][0];
      const len = fence[2].length;
      const closeRe = new RegExp(`^ {0,3}${ch === '`' ? '`' : '~'}{${len},}[ \\t]*$`);
      let j = i + 1;
      while (j < lines.length && !closeRe.test(lines[j])) j++;
      const end = j < lines.length ? j + 1 : j;
      blocks.push({ type: 'code', lines: lines.slice(i, end) });
      i = end;
      continue;
    }

    const atx = ATX_RE.exec(line);
    if (atx) {
      const level = atx[1].length;
      const text = (atx[2] ?? '').trim();
      const openEnd = line.indexOf(atx[1]) + atx[1].length;
      const open = line.slice(0, openEnd) + (text ? line.slice(openEnd).match(/^[ \t]+/)[0] : '');
      const close = text ? line.slice(line.lastIndexOf(text) + text.length) : '';
      blocks.push({
        type: 'heading',
        level,
        lines: [line],
        open,
        close,
        seg: text ? { kind: `h${level}`, source: text } : null,
      });
      i++;
      continue;
    }

    if (THEMATIC_RE.test(line)) {
      blocks.push({ type: 'thematic', lines: [line] });
      i++;
      continue;
    }

    if (QUOTE_RE.test(line)) {
      const inner = [];
      const prefixes = [];
      const offsets = [];
      let j = i;
      let lastWasParagraph = false;
      while (j < lines.length) {
        const q = QUOTE_RE.exec(lines[j]);
        if (q) {
          prefixes.push(q[1]);
          inner.push(q[2]);
          offsets.push(lineNo(j));
          lastWasParagraph = !isBlank(q[2]) && !FENCE_RE.test(q[2]);
          j++;
          continue;
        }
        // Lazy continuation of a paragraph inside the quote.
        if (lastWasParagraph && !isBlank(lines[j]) && !interruptsParagraph(lines, j)) {
          prefixes.push('');
          inner.push(lines[j]);
          offsets.push(lineNo(j));
          j++;
          continue;
        }
        break;
      }
      const children = parseBlocks(inner, ctx, { quote: true, offsets });
      blocks.push({ type: 'blockquote', lines: lines.slice(i, j), prefixes, inner, children });
      i = j;
      continue;
    }

    const lm = listMarker(line);
    if (lm) {
      const list = { type: 'list', ordered: lm.ordered, delim: lm.delim, items: [], lines: [] };
      const listStart = i;
      let j = i;
      while (j < lines.length) {
        const m = listMarker(lines[j]);
        if (!m || m.ordered !== lm.ordered || m.delim !== lm.delim || m.indent >= lm.width) break;
        // One item: its first line, then continuation lines.
        const itemStart = j;
        const inner = [lines[j].slice(m.prefix.length)];
        const prefixes = [m.prefix];
        const offsets = [lineNo(j)];
        let k = j + 1;
        let lastWasParagraph = !m.empty;
        while (k < lines.length) {
          const l = lines[k];
          if (isBlank(l)) {
            // Blank lines stay in the item only if indented content follows.
            let b = k;
            while (b < lines.length && isBlank(lines[b])) b++;
            if (b < lines.length && indentOf(lines[b]) >= m.width) {
              for (let x = k; x < b; x++) {
                prefixes.push(lines[x]);
                inner.push('');
                offsets.push(lineNo(x));
              }
              k = b;
              lastWasParagraph = false;
              continue;
            }
            break;
          }
          if (indentOf(l) >= m.width) {
            const cut = sliceIndent(l, m.width);
            prefixes.push(l.slice(0, l.length - cut.length));
            inner.push(cut);
            offsets.push(lineNo(k));
            lastWasParagraph = !FENCE_RE.test(cut) && !isBlank(cut);
            k++;
            continue;
          }
          // Lazy continuation: a paragraph line that opens no other block.
          if (lastWasParagraph && !interruptsParagraph(lines, k) && !listMarker(l)) {
            const lead = /^[ \t]*/.exec(l)[0];
            prefixes.push(lead);
            inner.push(l.slice(lead.length));
            offsets.push(lineNo(k));
            k++;
            continue;
          }
          break;
        }
        const children = parseBlocks(inner, ctx, { quote: opts.quote, offsets });
        list.items.push({ marker: m, lines: lines.slice(itemStart, k), prefixes, inner, children });
        j = k;
        // Blank lines between items belong to the list when another item follows.
        let b = j;
        while (b < lines.length && isBlank(lines[b])) b++;
        if (b > j && b < lines.length) {
          const next = listMarker(lines[b]);
          if (next && next.ordered === lm.ordered && next.delim === lm.delim && next.indent < lm.width) {
            list.items[list.items.length - 1].trailingBlank = lines.slice(j, b);
            j = b;
            continue;
          }
        }
      }
      list.lines = lines.slice(listStart, j);
      blocks.push(list);
      i = j;
      continue;
    }

    if (isTableStart(lines, i)) {
      let j = i;
      const rows = [];
      while (j < lines.length && !isBlank(lines[j]) && (j <= i + 1 || !interruptsTableRow(lines, j))) {
        const r = splitRow(lines[j]);
        rows.push({
          line: lines[j],
          delimiter: j === i + 1,
          ...r,
          cells: r.cells.map((c) => ({ ...c, seg: j === i + 1 || c.text === '' ? null : { kind: 'td', source: c.text } })),
        });
        j++;
      }
      blocks.push({ type: 'table', lines: lines.slice(i, j), rows });
      i = j;
      continue;
    }

    if (HTML_START_RE.test(line)) {
      let j = i;
      while (j < lines.length && !isBlank(lines[j])) j++;
      blocks.push({ type: 'html', lines: lines.slice(i, j) });
      i = j;
      continue;
    }

    if (indentOf(line) >= 4) {
      // Indented code: runs until a non-blank line with less indentation.
      let j = i;
      while (j < lines.length && (isBlank(lines[j]) || indentOf(lines[j]) >= 4)) j++;
      while (j > i && isBlank(lines[j - 1])) j--;
      blocks.push({ type: 'code', lines: lines.slice(i, j) });
      i = j;
      continue;
    }

    // Paragraph.
    let j = i + 1;
    while (j < lines.length && !isBlank(lines[j]) && !interruptsParagraph(lines, j)) {
      if (/^ {0,3}(?:=+|-+)[ \t]*$/.test(lines[j])) fail(ctx, lineNo(j), 'setext headings are not supported; use "#"');
      j++;
    }
    if (j < lines.length && /^ {0,3}-+[ \t]*$/.test(lines[j])) {
      fail(ctx, lineNo(j), 'setext heading (a "---" line right under text); add a blank line or use "#"');
    }
    const plines = lines.slice(i, j);
    for (let k = 0; k < plines.length - 1; k++) {
      if (/(?: {2,}|\\)$/.test(plines[k])) fail(ctx, lineNo(i + k), 'hard line breaks are not supported');
    }
    blocks.push(paragraph(plines, opts));
    i = j;
  }
  return blocks;
}

function interruptsTableRow(lines, j) {
  const l = lines[j];
  return ATX_RE.test(l) || FENCE_RE.test(l) || QUOTE_RE.test(l) || THEMATIC_RE.test(l) || HTML_START_RE.test(l) || !!listMarker(l);
}

function sliceIndent(line, width) {
  let col = 0;
  let i = 0;
  while (i < line.length && col < width) {
    if (line[i] === ' ') col++;
    else if (line[i] === '\t') col += 4 - (col % 4);
    else break;
    i++;
  }
  return line.slice(i);
}

/**
 * A paragraph split into runs: each run is an optional label (a callout label
 * inside a quote, or the "**Maps to:**" lead) and the text that follows it.
 */
function paragraph(plines, opts) {
  const runs = [];
  let cur = null;
  plines.forEach((raw, idx) => {
    const l = raw.replace(/^[ \t]+/, '').replace(/[ \t]+$/, '');
    const label = (opts.quote && LABEL_RE.exec(l)) || (idx === 0 && MAPS_TO_RE.exec(l));
    if (label) {
      cur = { label: label[1], labelOwnLine: label[2] === undefined, parts: label[2] !== undefined ? [label[2]] : [] };
      runs.push(cur);
      return;
    }
    if (!cur) {
      cur = { label: null, labelOwnLine: false, parts: [] };
      runs.push(cur);
    }
    cur.parts.push(l);
  });
  for (const r of runs) {
    const source = r.parts.join(' ').trim();
    r.seg = source ? { kind: 'p', source } : null;
  }
  return { type: 'paragraph', lines: plines, runs };
}

/** Everything from a top-level "## Sources" heading to the next H1/H2 stays verbatim. */
function markSources(blocks) {
  let inSources = false;
  for (const b of blocks) {
    if (b.type === 'heading' && b.level <= 2) {
      inSources = b.level === 2 && b.seg && b.seg.source === 'Sources';
    }
    if (inSources) b.verbatim = true;
  }
}

/** Segments in document order; each gets a stable index `n`. */
function collectSegments(blocks) {
  const out = [];
  const walk = (list, verbatim) => {
    for (const b of list) {
      const v = verbatim || !!b.verbatim;
      if (v) continue;
      if (b.type === 'heading') {
        if (b.seg) out.push(b.seg);
      } else if (b.type === 'paragraph') {
        for (const r of b.runs) {
          if (r.seg) out.push(r.seg);
        }
      } else if (b.type === 'table') {
        for (const row of b.rows) {
          for (const c of row.cells) {
            if (c.seg) out.push(c.seg);
          }
        }
      } else if (b.type === 'blockquote') {
        walk(b.children, v);
      } else if (b.type === 'list') {
        for (const it of b.items) walk(it.children, v);
      }
    }
  };
  walk(blocks, false);
  out.forEach((s, n) => {
    s.n = n;
  });
  return out;
}

// ---------------------------------------------------------------------------
// Rendering

const LEADING_BLOCK_RE = /^(?:#{1,6}(?=\s|$)|>|[-+*](?=\s|$)|\d{1,9}[.)](?=\s|$)|=+(?=\s|$)|-{3,}|\||<|~{3,}|`{3,})/;

/** Escape a translated line that would otherwise open a different block. */
export function escapeLeading(text) {
  const m = LEADING_BLOCK_RE.exec(text);
  if (!m) return text;
  const tok = m[0];
  if (/^\d/.test(tok)) return tok.slice(0, -1) + '\\' + tok.slice(-1) + text.slice(tok.length);
  return '\\' + text;
}

const oneLine = (s) => s.replace(/\s*\n\s*/g, ' ').trim();

/** Translated prose is re-wrapped at this width (STYLEGUIDE: ~100 characters). */
export const WRAP_WIDTH = 100;

/** Character ranges a line break must not split: bold, links, inline code. */
function unbreakableRanges(text) {
  const ranges = [];
  for (const re of [/`+[^`]*?`+/g, /\*\*[^*]+?\*\*/g, /!?\[[^\]]*\]\([^)\s]*\)/g]) {
    for (const m of text.matchAll(re)) ranges.push([m.index, m.index + m[0].length]);
  }
  return ranges;
}

/**
 * Wrap one paragraph of inline Markdown into lines of at most `width`
 * characters where possible. Never breaks inside bold, a link or inline code,
 * and never starts a line with something that would open another block.
 * `lead` (a callout label) stays whole on the first line.
 */
export function wrapText(text, width, lead = '') {
  const full = lead ? (text ? `${lead} ${text}` : lead) : text;
  const protectedUntil = lead.length;
  const ranges = unbreakableRanges(full);
  const breakable = (i) => i >= protectedUntil && !ranges.some(([a, b]) => i > a && i < b);
  const lines = [];
  let lineStart = 0;
  let lastBreak = -1;
  for (let i = 0; i <= full.length; i++) {
    if (i < full.length && full[i] !== ' ') continue;
    // i is a space (a candidate break) or the end of the text.
    if (i - lineStart > width && lastBreak > lineStart) {
      lines.push(full.slice(lineStart, lastBreak));
      lineStart = lastBreak + 1;
    }
    if (i < full.length && breakable(i) && !LEADING_BLOCK_RE.test(full.slice(i + 1))) lastBreak = i;
  }
  lines.push(full.slice(lineStart));
  return lines.map((l, k) => (k === 0 ? (lead ? l : escapeLeading(l)) : l));
}

/**
 * Render blocks back to Markdown lines.
 * @param translate (seg) => translated inline text, or undefined to keep the source
 * @param labelMap  (label) => localized label ("**...**"), or undefined to keep it
 * @param width     wrap width for translated paragraphs
 */
export function renderBlocks(blocks, translate, labelMap = () => undefined, width = WRAP_WIDTH) {
  const out = [];
  for (const b of blocks) out.push(...renderBlock(b, translate, labelMap, !!b.verbatim, width));
  return out;
}

function changed(seg, translate) {
  if (!seg) return undefined;
  const t = translate(seg);
  if (t === undefined || t === null) return undefined;
  return t === seg.source ? undefined : oneLine(t);
}

function renderBlock(b, translate, labelMap, verbatim, width) {
  if (verbatim) return b.lines;
  switch (b.type) {
    case 'heading': {
      const t = changed(b.seg, translate);
      return t === undefined ? b.lines : [`${b.open}${t}${b.close}`];
    }
    case 'paragraph': {
      const ts = b.runs.map((r) => changed(r.seg, translate));
      const labels = b.runs.map((r) => (r.label ? labelMap(r.label) : undefined));
      if (ts.every((t) => t === undefined) && labels.every((l) => l === undefined)) return b.lines;
      const lines = [];
      b.runs.forEach((r, k) => {
        const text = ts[k] ?? (r.seg ? r.seg.source : '');
        const label = labels[k] ?? r.label;
        if (r.label && r.labelOwnLine) {
          lines.push(label);
          if (text) lines.push(...wrapText(text, width));
        } else if (r.label) {
          lines.push(...wrapText(text, width, label));
        } else if (text) {
          lines.push(...wrapText(text, width));
        }
      });
      return lines;
    }
    case 'table': {
      return b.rows.map((row) => {
        if (row.delimiter) return row.line;
        const ts = row.cells.map((c) => changed(c.seg, translate));
        if (ts.every((t) => t === undefined)) return row.line;
        const cells = row.cells.map((c, k) => `${c.before}${ts[k] !== undefined ? escapePipes(ts[k]) : c.text}${c.after}`);
        return `${row.lead ? `${row.head}|` : ''}${cells.join('|')}${row.trail ? `|${row.tail}` : ''}`;
      });
    }
    case 'blockquote': {
      const lines = [];
      let pos = 0;
      for (const child of b.children) {
        const n = child.lines.length;
        const rendered = renderBlock(child, translate, labelMap, !!child.verbatim, width - 2);
        if (sameLines(rendered, child.lines)) {
          for (let k = 0; k < n; k++) lines.push(b.prefixes[pos + k] + b.inner[pos + k]);
        } else {
          for (const l of rendered) lines.push(l === '' ? '>' : `> ${l}`);
        }
        pos += n;
      }
      return lines;
    }
    case 'list': {
      const lines = [];
      for (const it of b.items) {
        const pad = ' '.repeat(it.marker.width);
        let pos = 0;
        let first = true;
        for (const child of it.children) {
          const n = child.lines.length;
          const rendered = renderBlock(child, translate, labelMap, !!child.verbatim, width - it.marker.width);
          if (sameLines(rendered, child.lines)) {
            for (let k = 0; k < n; k++) lines.push(it.prefixes[pos + k] + it.inner[pos + k]);
          } else {
            rendered.forEach((l, k) => {
              if (first && k === 0) lines.push(it.marker.prefix + l);
              else lines.push(l === '' ? '' : pad + l);
            });
          }
          if (n > 0) first = false;
          pos += n;
        }
        if (it.trailingBlank) lines.push(...it.trailingBlank);
      }
      return lines;
    }
    default:
      return b.lines;
  }
}

function sameLines(a, b) {
  return a.length === b.length && a.every((l, i) => l === b[i]);
}

function escapePipes(s) {
  return s.replace(/(^|[^\\])\|/g, '$1\\|').replace(/(^|[^\\])\|/g, '$1\\|');
}

export function renderMarkdown(parsed, translate, labelMap, width = WRAP_WIDTH) {
  const lines = renderBlocks(parsed.blocks, translate, labelMap, width);
  return lines.join('\n') + (parsed.eofNewline ? '\n' : '');
}

// ---------------------------------------------------------------------------
// Structure signature: what must survive translation one to one.

export function structureSignature(blocks) {
  const sig = [];
  const walk = (list, depth) => {
    for (const b of list) {
      switch (b.type) {
        case 'heading':
          sig.push(`${depth}h${b.level}`);
          break;
        case 'paragraph':
          sig.push(`${depth}p${b.runs.filter((r) => r.label).length ? `:${b.runs.map((r) => (r.label ? 'L' : 't')).join('')}` : ''}`);
          break;
        case 'table':
          sig.push(`${depth}table:${b.rows.map((r) => r.cells.length).join(',')}`);
          break;
        case 'code':
          sig.push(`${depth}code:${b.lines.join('\n').length}`);
          break;
        case 'blockquote':
          sig.push(`${depth}quote[`);
          walk(b.children, depth + 1);
          sig.push(`${depth}]`);
          break;
        case 'list':
          sig.push(`${depth}${b.ordered ? 'ol' : 'ul'}:${b.items.length}[`);
          for (const it of b.items) {
            sig.push(`${depth + 1}li[`);
            walk(it.children, depth + 2);
            sig.push(`${depth + 1}]`);
          }
          sig.push(`${depth}]`);
          break;
        case 'thematic':
        case 'html':
          sig.push(`${depth}${b.type}`);
          break;
        default:
          break;
      }
    }
  };
  walk(blocks, 0);
  return sig;
}
