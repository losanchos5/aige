// builders.js: the pure helpers shared by the /toolkit document builders (the
// AI register entry, the impact assessment and the model card). No DOM access
// and no side effects at import, so tests/doc-builders.spec.ts runs every
// function here in Node.
//
// - Paths: `a.b.0.c` addresses a value inside a document; get, set and delete.
//   They only walk the document's own properties, and a path with a
//   `__proto__`, `constructor` or `prototype` segment is refused (CWE-1321):
//   an imported CSV header must not reach Object.prototype.
// - prune: drop empty strings, empty arrays and empty objects before export,
//   so an unanswered optional field is absent rather than blank.
// - validate: the draft 2020-12 subset the site's schemas use (the same subset
//   scripts/schemas-check.mjs enforces on every build), returning structured
//   errors a form can place next to the control that caused them.
// - YAML: a conservative YAML 1.2 block emitter for JSON data (every string
//   double-quoted with JSON escapes, which YAML 1.2 reads as the same string).
// - CSV: an RFC 4180 reader (the writer lives in lib.js) plus flatten and
//   unflatten between a nested record and one row of dotted column names.
// - uuidV4: a random RFC 9562 version 4 UUID for CycloneDX serial numbers.
//
// Nothing in this module sends data anywhere.

// ---- Paths --------------------------------------------------------------------

// Segments that lead to a prototype instead of a field of the document.
const UNSAFE_KEYS = new Set(['__proto__', 'constructor', 'prototype']);

/** 'a.b.0' -> ['a', 'b', 0]. Numeric segments become array indices.
 *  @param {string | ReadonlyArray<string | number>} path
 *  @returns {Array<string | number>} */
export function splitPath(path) {
  if (Array.isArray(path)) return [...path];
  return String(path)
    .split('.')
    .filter((part) => part !== '')
    .map((part) => (/^\d+$/.test(part) ? Number(part) : part));
}

/** True when a path has a `__proto__`, `constructor` or `prototype` segment,
 *  which no field of a record can have.
 *  @param {string | ReadonlyArray<string | number>} path */
export function isUnsafePath(path) {
  return splitPath(path).some((key) => UNSAFE_KEYS.has(String(key)));
}

/** The value at `path`, read through own properties only.
 *  @param {unknown} doc @param {string | ReadonlyArray<string | number>} path */
export function getPath(doc, path) {
  let node = doc;
  for (const key of splitPath(path)) {
    if (node === null || typeof node !== 'object') return undefined;
    if (UNSAFE_KEYS.has(String(key)) || !Object.hasOwn(node, key)) return undefined;
    node = /** @type {Record<string, unknown>} */ (node)[/** @type {string} */ (key)];
  }
  return node;
}

/** Set a value, creating objects (or arrays, for numeric keys) on the way.
 *  Only own properties are walked; an unsafe path throws.
 *  Returns the document. @param {Record<string, unknown>} doc */
export function setPath(doc, path, value) {
  const keys = splitPath(path);
  if (!keys.length) return doc;
  if (keys.some((key) => UNSAFE_KEYS.has(String(key)))) {
    throw new Error(`Unsupported field name: ${keys.join('.')}`);
  }
  /** @type {any} */
  let node = doc;
  keys.forEach((key, i) => {
    if (i === keys.length - 1) {
      node[key] = value;
      return;
    }
    if (!Object.hasOwn(node, key) || node[key] === null || typeof node[key] !== 'object') {
      node[key] = typeof keys[i + 1] === 'number' ? [] : {};
    }
    node = node[key];
  });
  return doc;
}

/** Remove a value (an array element is spliced out). Returns the document. */
export function deletePath(doc, path) {
  if (isUnsafePath(path)) return doc;
  const keys = splitPath(path);
  const last = keys.pop();
  const parent = keys.length ? getPath(doc, keys) : doc;
  if (parent === null || typeof parent !== 'object' || last === undefined) return doc;
  if (Array.isArray(parent) && typeof last === 'number') parent.splice(last, 1);
  else delete /** @type {Record<string, unknown>} */ (parent)[/** @type {string} */ (last)];
  return doc;
}

const isPlainObject = (value) =>
  value !== null && typeof value === 'object' && !Array.isArray(value);

/** Deep copy of JSON data. */
export function clone(value) {
  return value === undefined ? undefined : JSON.parse(JSON.stringify(value));
}

/** A copy without empty strings, null, empty arrays and empty objects (after
 *  their own children are pruned). Strings are trimmed. `false` and `0` stay. */
/** @param {unknown} value @returns {any} */
export function prune(value) {
  if (typeof value === 'string') {
    const text = value.trim();
    return text === '' ? undefined : text;
  }
  if (value === null || value === undefined) return undefined;
  if (typeof value === 'number') return Number.isFinite(value) ? value : undefined;
  if (Array.isArray(value)) {
    const items = value.map(prune).filter((item) => item !== undefined);
    return items.length ? items : undefined;
  }
  if (isPlainObject(value)) {
    const out = {};
    for (const [key, child] of Object.entries(value)) {
      // An own "__proto__" key (JSON.parse makes one) would set the copy's
      // prototype instead of a field.
      if (key === '__proto__') continue;
      const kept = prune(child);
      if (kept !== undefined) out[key] = kept;
    }
    return Object.keys(out).length ? out : undefined;
  }
  return value;
}

// ---- Validation (draft 2020-12 subset) ------------------------------------------

function resolveRef(root, ref) {
  if (typeof ref !== 'string' || !ref.startsWith('#/')) return undefined;
  return ref
    .slice(2)
    .split('/')
    .map((part) => part.replace(/~1/g, '/').replace(/~0/g, '~'))
    .reduce((node, part) => (node === undefined ? undefined : node[part]), root);
}

function typeOk(type, value) {
  switch (type) {
    case 'object':
      return isPlainObject(value);
    case 'array':
      return Array.isArray(value);
    case 'string':
      return typeof value === 'string';
    case 'integer':
      return Number.isInteger(value);
    case 'number':
      return typeof value === 'number' && Number.isFinite(value);
    case 'boolean':
      return typeof value === 'boolean';
    case 'null':
      return value === null;
    default:
      return false;
  }
}

/** A real calendar date in YYYY-MM-DD. @param {string} text */
export function isDate(text) {
  const m = /^(\d{4})-(\d{2})-(\d{2})$/.exec(String(text));
  if (!m) return false;
  const [y, mo, d] = [Number(m[1]), Number(m[2]), Number(m[3])];
  const date = new Date(Date.UTC(y, mo - 1, d));
  return date.getUTCFullYear() === y && date.getUTCMonth() === mo - 1 && date.getUTCDate() === d;
}

/** RFC 3339 date-time with a time zone. @param {string} text */
export function isDateTime(text) {
  const value = String(text);
  return (
    /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}(\.\d+)?(Z|[+-]\d{2}:\d{2})$/.test(value) &&
    isDate(value.slice(0, 10)) &&
    !Number.isNaN(Date.parse(value))
  );
}

function formatOk(format, value) {
  switch (format) {
    case 'date':
      return isDate(value);
    case 'date-time':
      return isDateTime(value);
    case 'uri':
      return /^[a-z][a-z0-9+.-]*:\S+$/i.test(value);
    case 'email':
      return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
    default:
      return true;
  }
}

const same = (a, b) => JSON.stringify(a) === JSON.stringify(b);

/**
 * Validate `value` against `schema` (the keyword subset of the site's schema
 * library: type, required, properties, additionalProperties, enum, const,
 * items, minItems, maxItems, minLength, maxLength, pattern, minimum, maximum,
 * format, local $ref). Returns a list of errors; an empty list means valid.
 * @param {Record<string, any>} schema
 * @param {unknown} value
 * @returns {Array<{ path: Array<string | number>, code: string, message: string, param?: unknown }>}
 */
export function validate(schema, value, root = schema, path = [], out = []) {
  const push = (code, message, param, at = path) =>
    out.push({ path: [...at], code, message, ...(param === undefined ? {} : { param }) });
  if (schema.$ref) {
    const target = resolveRef(root, schema.$ref);
    if (!target) push('ref', `unresolvable $ref ${schema.$ref}`);
    else validate(target, value, root, path, out);
  }
  if (schema.type !== undefined) {
    const types = Array.isArray(schema.type) ? schema.type : [schema.type];
    if (!types.some((t) => typeOk(t, value))) {
      push('type', `expected ${types.join(' or ')}`, types.join(' or '));
      return out;
    }
  }
  if (schema.enum !== undefined && !schema.enum.some((option) => same(option, value))) {
    push('enum', `must be one of ${schema.enum.join(', ')}`, schema.enum);
  }
  if (schema.const !== undefined && !same(schema.const, value)) {
    push('const', `must equal ${JSON.stringify(schema.const)}`, schema.const);
  }
  if (typeof value === 'string') {
    const length = [...value].length;
    if (schema.minLength !== undefined && length < schema.minLength) {
      push('minLength', `shorter than ${schema.minLength} characters`, schema.minLength);
    }
    if (schema.maxLength !== undefined && length > schema.maxLength) {
      push('maxLength', `longer than ${schema.maxLength} characters`, schema.maxLength);
    }
    if (schema.pattern !== undefined && !new RegExp(schema.pattern, 'u').test(value)) {
      push('pattern', `does not match ${schema.pattern}`, schema.pattern);
    }
    if (schema.format !== undefined && !formatOk(schema.format, value)) {
      push('format', `is not a valid ${schema.format}`, schema.format);
    }
  }
  if (typeof value === 'number') {
    if (schema.minimum !== undefined && value < schema.minimum) {
      push('minimum', `is below the minimum ${schema.minimum}`, schema.minimum);
    }
    if (schema.maximum !== undefined && value > schema.maximum) {
      push('maximum', `is above the maximum ${schema.maximum}`, schema.maximum);
    }
  }
  if (Array.isArray(value)) {
    if (schema.minItems !== undefined && value.length < schema.minItems) {
      push('minItems', `needs at least ${schema.minItems}`, schema.minItems);
    }
    if (schema.maxItems !== undefined && value.length > schema.maxItems) {
      push('maxItems', `takes at most ${schema.maxItems}`, schema.maxItems);
    }
    if (isPlainObject(schema.items)) {
      value.forEach((item, i) => validate(schema.items, item, root, [...path, i], out));
    }
  }
  if (isPlainObject(value)) {
    for (const name of schema.required ?? []) {
      if (!(name in value)) push('required', 'is required', undefined, [...path, name]);
    }
    const props = schema.properties ?? {};
    for (const [name, child] of Object.entries(value)) {
      if (name in props) validate(props[name], child, root, [...path, name], out);
      else if (schema.additionalProperties === false) {
        push('additional', `"${name}" is not a field of this record`, name, [...path, name]);
      } else if (isPlainObject(schema.additionalProperties)) {
        validate(schema.additionalProperties, child, root, [...path, name], out);
      }
    }
  }
  return out;
}

/** A copy with object keys in the order the schema lists its properties (so an
 *  export reads like the published example); unknown keys keep their order at
 *  the end. `$schema` always comes first. */
/** @param {any} value @param {any} schema @param {any} [root] @returns {any} */
export function orderBySchema(value, schema, root = schema) {
  let node = schema;
  if (node && node.$ref) node = resolveRef(root, node.$ref);
  if (Array.isArray(value)) return value.map((item) => orderBySchema(item, node?.items, root));
  if (!isPlainObject(value)) return value;
  const props = node?.properties ?? {};
  const keys = Object.keys(value);
  const known = Object.keys(props).filter((key) => keys.includes(key));
  const rest = keys.filter((key) => !(key in props));
  const ordered = [...(keys.includes('$schema') ? ['$schema'] : []), ...known.filter((k) => k !== '$schema'), ...rest.filter((k) => k !== '$schema')];
  const out = {};
  for (const key of ordered) out[key] = orderBySchema(value[key], props[key], root);
  return out;
}

/** The sub-schema that describes `path` (following properties and items). */
/** @param {any} schema @param {string | Array<string | number>} path @param {any} [root] @returns {any} */
export function schemaAt(schema, path, root = schema) {
  let node = schema;
  for (const key of splitPath(path)) {
    if (!node) return undefined;
    if (node.$ref) node = resolveRef(root, node.$ref);
    if (!node) return undefined;
    if (typeof key === 'number') node = node.items;
    else node = node.properties?.[key];
  }
  if (node && node.$ref) node = resolveRef(root, node.$ref);
  return node;
}

const FORMAT_WORDS = {
  date: 'a date in the form YYYY-MM-DD',
  'date-time': 'a date and time with a time zone (for example 2026-09-24T10:00:00Z)',
  uri: 'a full link, starting with https://',
  email: 'an email address',
};

/** One validation error as a sentence a reader can act on. `label` names the
 *  field as the form shows it. */
export function describeError(error, label) {
  const name = label || error.path.join('.') || 'The record';
  switch (error.code) {
    case 'required':
      return `${name} is required.`;
    case 'type': {
      const t = String(error.param);
      if (t === 'integer') return `${name} must be a whole number.`;
      if (t === 'number') return `${name} must be a number.`;
      if (t === 'boolean') return `${name} must be yes or no.`;
      if (t === 'array') return `${name} must be a list.`;
      return `${name} must be ${t === 'string' ? 'text' : `a ${t}`}.`;
    }
    case 'enum':
      return `${name} must be one of: ${/** @type {unknown[]} */ (error.param).join(', ')}.`;
    case 'format':
      return `${name} must be ${FORMAT_WORDS[String(error.param)] ?? `a valid ${error.param}`}.`;
    case 'minLength':
      return `${name} cannot be empty.`;
    case 'minItems':
      return `${name} needs at least ${error.param}.`;
    case 'maxItems':
      return `${name} takes at most ${error.param}.`;
    case 'minimum':
      return `${name} must be at least ${error.param}.`;
    case 'maximum':
      return `${name} must be at most ${error.param}.`;
    case 'pattern':
      return `${name} is not in the expected form.`;
    case 'additional':
      return `${name} is not a field of this record.`;
    default:
      return `${name} ${error.message}.`;
  }
}

// ---- YAML ---------------------------------------------------------------------------

const PLAIN_KEY = /^[A-Za-z_][A-Za-z0-9_-]*$/;
const yamlKey = (key) => (PLAIN_KEY.test(key) ? key : JSON.stringify(key));

function yamlScalar(value) {
  if (value === null || value === undefined) return 'null';
  if (typeof value === 'boolean') return value ? 'true' : 'false';
  if (typeof value === 'number') return Number.isFinite(value) ? String(value) : 'null';
  // JSON's string escapes are valid in a YAML 1.2 double-quoted scalar.
  return JSON.stringify(String(value));
}

function yamlLines(value, indent) {
  const pad = ' '.repeat(indent);
  if (Array.isArray(value)) {
    if (!value.length) return [`${pad}[]`];
    const lines = [];
    for (const item of value) {
      if (isPlainObject(item) && Object.keys(item).length) {
        const inner = yamlLines(item, indent + 2);
        lines.push(`${pad}- ${inner[0].trimStart()}`, ...inner.slice(1));
      } else if (Array.isArray(item) && item.length) {
        lines.push(`${pad}-`, ...yamlLines(item, indent + 2));
      } else {
        lines.push(`${pad}- ${isPlainObject(item) ? '{}' : Array.isArray(item) ? '[]' : yamlScalar(item)}`);
      }
    }
    return lines;
  }
  if (isPlainObject(value)) {
    const entries = Object.entries(value);
    if (!entries.length) return [`${pad}{}`];
    const lines = [];
    for (const [key, child] of entries) {
      if ((Array.isArray(child) && child.length) || (isPlainObject(child) && Object.keys(child).length)) {
        lines.push(`${pad}${yamlKey(key)}:`, ...yamlLines(child, Array.isArray(child) ? indent : indent + 2));
      } else {
        const scalar = Array.isArray(child) ? '[]' : isPlainObject(child) ? '{}' : yamlScalar(child);
        lines.push(`${pad}${yamlKey(key)}: ${scalar}`);
      }
    }
    return lines;
  }
  return [`${pad}${yamlScalar(value)}`];
}

/** JSON data -> YAML 1.2 block text (ends with a newline). Every string is
 *  double-quoted, so no value is ever read back as a number, a boolean, a date
 *  or a null by a YAML 1.1 parser. `header` lines become `#` comments. */
/** @param {unknown} value @param {{ header?: string[] }} [options] @returns {string} */
export function toYaml(value, { header = [] } = {}) {
  const comments = header.map((line) => `# ${String(line).replace(/\r?\n/g, ' ')}`);
  return `${[...comments, ...yamlLines(value, 0)].join('\n')}\n`;
}

// ---- CSV ----------------------------------------------------------------------------

/** RFC 4180 text -> rows of cells. Accepts CRLF or LF, a UTF-8 BOM, quoted
 *  fields with doubled quotes and line breaks. Blank lines are dropped.
 *  @param {string} text
 *  @returns {{ rows: string[][], error?: string }} */
export function parseCsv(text) {
  const src = String(text ?? '').replace(/^﻿/, '');
  const rows = [];
  let row = [];
  let field = '';
  let quoted = false;
  let wasQuoted = false;
  for (let i = 0; i < src.length; i++) {
    const c = src[i];
    if (quoted) {
      if (c === '"' && src[i + 1] === '"') {
        field += '"';
        i++;
      } else if (c === '"') quoted = false;
      else field += c;
    } else if (c === '"' && field === '') {
      quoted = true;
      wasQuoted = true;
    } else if (c === ',') {
      row.push(field);
      field = '';
      wasQuoted = false;
    } else if (c === '\n' || c === '\r') {
      if (c === '\r' && src[i + 1] === '\n') i++;
      row.push(field);
      rows.push(row);
      row = [];
      field = '';
      wasQuoted = false;
    } else field += c;
  }
  if (field !== '' || row.length || wasQuoted) {
    row.push(field);
    rows.push(row);
  }
  const kept = rows.filter((r) => r.length > 1 || r[0] !== '');
  return quoted ? { rows: kept, error: 'The file ends inside a quoted field.' } : { rows: kept };
}

/** Undo lib.js csvField's formula guard: a leading apostrophe before = + - @. */
export function unguard(cell) {
  return /^'[=+\-@\t\r]/.test(cell) ? cell.slice(1) : cell;
}

/** A nested record -> { 'dotted.key': value } for one CSV row. Arrays of
 *  scalars join with "; "; arrays of objects (and anything deeper) are
 *  written as JSON text in one cell. */
/** @param {Record<string, unknown> | undefined} record @param {string} [prefix] @param {Record<string, unknown>} [out] @returns {Record<string, unknown>} */
export function flattenRecord(record, prefix = '', out = {}) {
  for (const [key, value] of Object.entries(record ?? {})) {
    const name = prefix ? `${prefix}.${key}` : key;
    if (Array.isArray(value)) {
      out[name] = value.every((item) => item === null || typeof item !== 'object')
        ? value.join('; ')
        : JSON.stringify(value);
    } else if (isPlainObject(value)) {
      flattenRecord(value, name, out);
    } else if (value !== undefined && value !== null) {
      out[name] = value;
    }
  }
  return out;
}

/** One CSV row -> a nested record, typed by `schema`: numbers, booleans,
 *  "; "-separated lists and JSON cells are parsed back. Unknown columns are
 *  kept as text so validation can name them; a column whose name has a
 *  `__proto__`, `constructor` or `prototype` segment is skipped (see
 *  isUnsafePath; the importer reports it). */
/** @param {string[]} header @param {string[]} cells @param {any} schema @returns {Record<string, any>} */
export function unflattenRow(header, cells, schema) {
  /** @type {Record<string, any>} */
  const record = {};
  header.forEach((rawName, i) => {
    const name = String(rawName).trim();
    const raw = unguard(String(cells[i] ?? '')).trim();
    if (!name || raw === '' || name === 'kind' || isUnsafePath(name)) return;
    const node = schema ? schemaAt(schema, name) : undefined;
    const type = node ? (Array.isArray(node.type) ? node.type[0] : node.type) : 'string';
    let value = raw;
    if (type === 'array') {
      if (raw.startsWith('[')) {
        try {
          value = JSON.parse(raw);
        } catch {
          value = raw;
        }
      } else {
        value = raw
          .split(';')
          .map((part) => part.trim())
          .filter(Boolean);
      }
    } else if (type === 'boolean') {
      if (/^(true|yes|y|1)$/i.test(raw)) value = true;
      else if (/^(false|no|n|0)$/i.test(raw)) value = false;
    } else if (type === 'integer' || type === 'number') {
      const n = Number(raw);
      value = raw !== '' && Number.isFinite(n) ? n : raw;
    } else if (type === 'object' && raw.startsWith('{')) {
      try {
        value = JSON.parse(raw);
      } catch {
        value = raw;
      }
    }
    setPath(record, name, value);
  });
  return record;
}

// ---- Ids ------------------------------------------------------------------------------

/** A random version 4 UUID (RFC 9562), from crypto.getRandomValues when the
 *  runtime has it. */
export function uuidV4() {
  const bytes = new Uint8Array(16);
  const cryptoObj = typeof globalThis !== 'undefined' ? globalThis.crypto : undefined;
  if (cryptoObj && typeof cryptoObj.getRandomValues === 'function') cryptoObj.getRandomValues(bytes);
  else for (let i = 0; i < 16; i++) bytes[i] = Math.floor(Math.random() * 256);
  bytes[6] = (bytes[6] & 0x0f) | 0x40;
  bytes[8] = (bytes[8] & 0x3f) | 0x80;
  const hex = [...bytes].map((b) => b.toString(16).padStart(2, '0')).join('');
  return `${hex.slice(0, 8)}-${hex.slice(8, 12)}-${hex.slice(12, 16)}-${hex.slice(16, 20)}-${hex.slice(20)}`;
}

/** The current time as RFC 3339 UTC without milliseconds. */
export function nowUtc(date = new Date()) {
  return date.toISOString().replace(/\.\d{3}Z$/, 'Z');
}

// ---- Markdown -----------------------------------------------------------------------------

/** Text for a Markdown paragraph: line breaks kept, a leading character that
 *  would start a heading, list, quote or table escaped. */
export function mdText(text) {
  return String(text ?? '')
    .split(/\r?\n/)
    .map((line) =>
      line.replace(/^(\s*)([#>|+*-])(\s)/, '$1\\$2$3').replace(/^(\s*)(\d+)\.(\s)/, '$1$2\\.$3'),
    )
    .join('\n');
}
