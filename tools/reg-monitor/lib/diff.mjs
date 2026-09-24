// Line diff (Myers, O((N+M)D)) and a unified-diff renderer with truncation.
// The common prefix and suffix are trimmed first, so the usual case (a few
// lines changed in a long legal text) costs almost nothing. Past `maxEdits`
// the diff falls back to "all old lines removed, all new lines added" and says
// so; the issue then carries a truncated excerpt either way.

export function diffLines(a, b, { maxEdits = 2000 } = {}) {
  let start = 0;
  while (start < a.length && start < b.length && a[start] === b[start]) start++;
  let endA = a.length;
  let endB = b.length;
  while (endA > start && endB > start && a[endA - 1] === b[endB - 1]) {
    endA--;
    endB--;
  }
  const midA = a.slice(start, endA);
  const midB = b.slice(start, endB);
  let core = myers(midA, midB, maxEdits);
  let coarse = false;
  if (core === null) {
    coarse = true;
    core = [...midA.map((line) => ({ op: '-', line })), ...midB.map((line) => ({ op: '+', line }))];
  }
  const ops = [
    ...a.slice(0, start).map((line) => ({ op: ' ', line })),
    ...core,
    ...a.slice(endA).map((line) => ({ op: ' ', line })),
  ];
  return { ops, coarse };
}

function myers(a, b, maxEdits) {
  const n = a.length;
  const m = b.length;
  if (n === 0) return b.map((line) => ({ op: '+', line }));
  if (m === 0) return a.map((line) => ({ op: '-', line }));
  const max = Math.min(n + m, maxEdits);
  const offset = max + 1;
  let v = new Int32Array(2 * max + 3);
  const trace = [];
  for (let d = 0; d <= max; d++) {
    trace.push(v.slice());
    for (let k = -d; k <= d; k += 2) {
      let x;
      if (k === -d || (k !== d && v[offset + k - 1] < v[offset + k + 1])) x = v[offset + k + 1];
      else x = v[offset + k - 1] + 1;
      let y = x - k;
      while (x < n && y < m && a[x] === b[y]) {
        x++;
        y++;
      }
      v[offset + k] = x;
      if (x >= n && y >= m) return backtrack(trace, v, a, b, d, offset);
    }
  }
  return null;
}

function backtrack(trace, vLast, a, b, dFinal, offset) {
  const ops = [];
  let x = a.length;
  let y = b.length;
  for (let d = dFinal; d > 0; d--) {
    const v = trace[d];
    const k = x - y;
    let prevK;
    if (k === -d || (k !== d && v[offset + k - 1] < v[offset + k + 1])) prevK = k + 1;
    else prevK = k - 1;
    const prevX = v[offset + prevK];
    const prevY = prevX - prevK;
    while (x > prevX && y > prevY) {
      ops.push({ op: ' ', line: a[x - 1] });
      x--;
      y--;
    }
    if (x === prevX) ops.push({ op: '+', line: b[y - 1] });
    else ops.push({ op: '-', line: a[x - 1] });
    x = prevX;
    y = prevY;
  }
  while (x > 0 && y > 0) {
    ops.push({ op: ' ', line: a[x - 1] });
    x--;
    y--;
  }
  void vLast;
  return ops.reverse();
}

// Group ops into hunks with `context` unchanged lines around each change.
export function hunks(ops, context = 3) {
  const out = [];
  let oldLine = 1;
  let newLine = 1;
  const positions = ops.map((o) => {
    const p = { ...o, oldLine, newLine };
    if (o.op !== '+') oldLine++;
    if (o.op !== '-') newLine++;
    return p;
  });
  const changed = positions.map((p, i) => (p.op !== ' ' ? i : -1)).filter((i) => i >= 0);
  if (changed.length === 0) return out;
  let from = Math.max(0, changed[0] - context);
  let to = Math.min(positions.length - 1, changed[0] + context);
  for (const i of changed.slice(1)) {
    if (i - context <= to + 1) to = Math.min(positions.length - 1, i + context);
    else {
      out.push(positions.slice(from, to + 1));
      from = Math.max(0, i - context);
      to = Math.min(positions.length - 1, i + context);
    }
  }
  out.push(positions.slice(from, to + 1));
  return out;
}

// Long single-line paragraphs (EUR-Lex prints each paragraph as one line) are
// clipped around the first character that differs from their counterpart, so a
// one-word amendment stays visible in the excerpt.
export function clipLine(line, { around = null, width = 480 } = {}) {
  if (line.length <= width) return line;
  const lead = 160;
  let startAt = 0;
  if (around !== null && around > lead) startAt = Math.min(around - lead, line.length - width);
  const head = startAt > 0 ? '...' : '';
  const tail = startAt + width < line.length ? '...' : '';
  return head + line.slice(startAt, startAt + width) + tail;
}

export function firstDifference(a, b) {
  const len = Math.min(a.length, b.length);
  let i = 0;
  while (i < len && a[i] === b[i]) i++;
  return i;
}

function renderHunk(h, width) {
  const first = h[0];
  const oldCount = h.filter((p) => p.op !== '+').length;
  const newCount = h.filter((p) => p.op !== '-').length;
  const oldStart = oldCount === 0 ? first.oldLine - 1 : first.oldLine;
  const newStart = newCount === 0 ? first.newLine - 1 : first.newLine;
  const lines = [`@@ -${oldStart},${oldCount} +${newStart},${newCount} @@`];
  // Pair each run of removals with the run of additions that follows it.
  let i = 0;
  while (i < h.length) {
    if (h[i].op === ' ') {
      lines.push(' ' + clipLine(h[i].line, { width }));
      i++;
      continue;
    }
    const dels = [];
    const adds = [];
    while (i < h.length && h[i].op === '-') dels.push(h[i++].line);
    while (i < h.length && h[i].op === '+') adds.push(h[i++].line);
    dels.forEach((line, j) => {
      const around = adds[j] !== undefined ? firstDifference(line, adds[j]) : null;
      lines.push('-' + clipLine(line, { around, width }));
    });
    adds.forEach((line, j) => {
      const around = dels[j] !== undefined ? firstDifference(line, dels[j]) : null;
      lines.push('+' + clipLine(line, { around, width }));
    });
  }
  return lines;
}

// Unified diff of two normalised texts. Returns
// { text, added, removed, truncated, omittedLines, coarse, identical }.
export function unifiedDiff(oldText, newText, {
  label = 'source',
  context = 3,
  maxLines = 150,
  maxChars = 12000,
  lineWidth = 480,
  maxEdits = 2000,
} = {}) {
  const a = oldText === '' ? [] : oldText.split('\n');
  const b = newText === '' ? [] : newText.split('\n');
  const { ops, coarse } = diffLines(a, b, { maxEdits });
  const added = ops.filter((o) => o.op === '+').length;
  const removed = ops.filter((o) => o.op === '-').length;
  if (added === 0 && removed === 0) {
    return { text: '', added, removed, truncated: false, omittedLines: 0, coarse, identical: true };
  }
  const all = [`--- a/${label}`, `+++ b/${label}`];
  for (const h of hunks(ops, context)) all.push(...renderHunk(h, lineWidth));
  const kept = [];
  let chars = 0;
  for (const line of all) {
    if (kept.length >= maxLines || chars + line.length + 1 > maxChars) break;
    kept.push(line);
    chars += line.length + 1;
  }
  const omittedLines = all.length - kept.length;
  return {
    text: kept.join('\n'),
    added,
    removed,
    truncated: omittedLines > 0,
    omittedLines,
    coarse,
    identical: false,
  };
}
