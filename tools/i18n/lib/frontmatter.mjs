// Flat YAML frontmatter: the only shape the content uses (pattern files carry
// `key: scalar` lines, nothing nested). Anything else is rejected loudly, so a
// future change to the content schema fails the pipeline instead of producing
// a broken translation.

const LINE_RE = /^([A-Za-z_][A-Za-z0-9_-]*):(?:[ \t]+(.*?))?[ \t]*$/;

/** Split a document into its frontmatter block (if any) and the body. */
export function splitFrontmatter(text) {
  if (!text.startsWith('---\n')) return { frontmatter: null, body: text };
  const end = text.indexOf('\n---\n', 3);
  const endAtEof = text.endsWith('\n---') ? text.length - 4 : -1;
  const stop = end !== -1 ? end : endAtEof;
  if (stop === -1) throw new Error('frontmatter: opening "---" without a closing "---"');
  const raw = text.slice(4, stop);
  const body = end !== -1 ? text.slice(stop + 5) : '';
  return { frontmatter: parseFrontmatter(raw), body };
}

/** Parse flat `key: scalar` lines into an ordered list of fields. */
export function parseFrontmatter(raw) {
  const fields = [];
  const lines = raw === '' ? [] : raw.split('\n');
  for (const [i, line] of lines.entries()) {
    if (line.trim() === '' || line.trimStart().startsWith('#')) {
      throw new Error(`frontmatter line ${i + 1}: blank lines and comments are not supported`);
    }
    const m = LINE_RE.exec(line);
    if (!m) throw new Error(`frontmatter line ${i + 1}: expected "key: value", got ${JSON.stringify(line)}`);
    const [, key, rawValue = ''] = m;
    fields.push({ key, value: parseScalar(rawValue, i + 1), raw: rawValue });
  }
  return fields;
}

function parseScalar(raw, lineNo) {
  if (raw === '') return '';
  if (raw.startsWith('"')) {
    if (!raw.endsWith('"') || raw.length < 2) throw new Error(`frontmatter line ${lineNo}: unterminated double-quoted string`);
    // A YAML double-quoted scalar with JSON-compatible escapes.
    try {
      return JSON.parse(raw);
    } catch {
      throw new Error(`frontmatter line ${lineNo}: unsupported escape in double-quoted string`);
    }
  }
  if (raw.startsWith("'")) {
    if (!raw.endsWith("'") || raw.length < 2) throw new Error(`frontmatter line ${lineNo}: unterminated single-quoted string`);
    return raw.slice(1, -1).replace(/''/g, "'");
  }
  if (/^[[{|>&*!%@`]/.test(raw)) throw new Error(`frontmatter line ${lineNo}: only plain or quoted scalars are supported`);
  return raw;
}

/** A value as a YAML scalar: plain when that is unambiguous, else double-quoted. */
export function formatScalar(value) {
  const s = String(value);
  // Plain only for simple words and paths that no YAML loader reads as a
  // number, a date, a boolean or null; everything else is quoted.
  const plainSafe = /^[A-Za-z][A-Za-z0-9._/-]*$/.test(s)
    && !/^(true|false|yes|no|on|off|y|n|null)$/i.test(s);
  if (plainSafe) return s;
  // JSON strings are valid YAML double-quoted scalars.
  return JSON.stringify(s);
}

/** Render an ordered list of fields back to a frontmatter block (with fences). */
export function renderFrontmatter(fields) {
  const lines = fields.map(({ key, value, raw }) => `${key}: ${raw !== undefined ? raw : formatScalar(value)}`);
  return `---\n${lines.join('\n')}\n---\n`;
}
