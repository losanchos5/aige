#!/usr/bin/env node
// schemas-check: fail the build if the templates-and-schemas library drifts.
// No dependencies: it parses every JSON Schema in public/schemas, checks each
// one's $id against its file name, lints the keywords it uses, and validates
// each filled example in public/schemas/examples against its schema with a
// minimal validator for the draft 2020-12 subset the library uses (type,
// required, properties, additionalProperties, enum, const, items, minItems,
// maxItems, minLength, maxLength, pattern, minimum, maximum, format, local
// $ref). A schema that uses any other validation keyword fails the lint, so
// the subset stays honest: nothing is silently left unchecked.
//
// It also checks that every schema has a human template in public/templates
// naming each top-level field, that the CSV templates are rectangular, that no
// file in the library carries an em dash (house style), and that the
// illustrative JSON shapes published in the pattern catalogue (chapter 05,
// bok/05-patterns.md, and its pattern pages, bok/patterns/*.md) still validate
// against the schemas that extend them (compatibility with the book).
//
//   node scripts/schemas-check.mjs          # from site/, as the build runs it
import { readdirSync, readFileSync, existsSync, statSync } from 'node:fs';
import { join, dirname, resolve, relative } from 'node:path';
import { fileURLToPath } from 'node:url';

const SITE = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const SCHEMAS = join(SITE, 'public', 'schemas');
const EXAMPLES = join(SCHEMAS, 'examples');
const TEMPLATES = join(SITE, 'public', 'templates');
const PATTERNS_MD = resolve(SITE, '..', 'bok', '05-patterns.md');
// Since v0.5.0 each pattern's full text, including its illustrative JSON shape,
// lives in its own page under bok/patterns/.
const PATTERN_PAGES = resolve(SITE, '..', 'bok', 'patterns');

const BASE_ID = 'https://aigovernanceengineer.com/schemas/';
const PATTERN_BASE = 'https://aigovernanceengineer.com/bok/patterns#pattern-';
const DRAFT = 'https://json-schema.org/draft/2020-12/schema';

// Keywords the minimal validator enforces, and keywords that only annotate.
const VALIDATION = new Set([
  'type', 'required', 'properties', 'additionalProperties', 'enum', 'const', 'items',
  'minItems', 'maxItems', 'minLength', 'maxLength', 'pattern', 'minimum', 'maximum',
  'format', '$ref',
]);
const ANNOTATION = new Set([
  '$schema', '$id', '$comment', '$defs', 'title', 'description', 'default', 'examples',
  'deprecated', 'readOnly', 'writeOnly',
]);
const FORMATS = new Set(['date', 'date-time', 'uri', 'email']);
// Must match the stages in src/data/templates.ts, or the page would not list the schema.
const STAGES = new Set(['intake', 'build', 'test', 'release', 'operate', 'retire', 'organisation']);
// U+2014, built from its code point so this file itself stays free of it.
const EM_DASH = String.fromCharCode(0x2014);

const errors = [];
const warnings = [];
const fail = (file, message) => errors.push(`${file}: ${message}`);
const rel = (file) => relative(SITE, file).replace(/\\/g, '/');

function readJson(file) {
  try {
    return JSON.parse(readFileSync(file, 'utf8'));
  } catch (error) {
    fail(rel(file), `not valid JSON (${error.message})`);
    return undefined;
  }
}

const isObject = (v) => v !== null && typeof v === 'object' && !Array.isArray(v);

// ---- Schema lint ------------------------------------------------------------

function lintSchema(node, where, file, isProperty) {
  if (!isObject(node)) {
    fail(file, `${where || '/'} is not a schema object`);
    return;
  }
  for (const key of Object.keys(node)) {
    if (!VALIDATION.has(key) && !ANNOTATION.has(key) && !key.startsWith('x-')) {
      fail(file, `${where || '/'} uses "${key}", which the minimal validator does not implement`);
    }
  }
  if (isProperty && typeof node.description !== 'string' && !node.$ref) {
    fail(file, `${where} has no description (the human template is built from it)`);
  }
  if (node.format !== undefined && !FORMATS.has(node.format)) {
    fail(file, `${where} uses unknown format "${node.format}"`);
  }
  if (node['x-evidences'] !== undefined) {
    const ev = node['x-evidences'];
    if (!Array.isArray(ev) || !ev.length || ev.some((r) => typeof r !== 'string' || !r.trim())) {
      fail(file, `${where || '/'} has an x-evidences that is not a non-empty list of strings`);
    }
  }
  if (node.pattern !== undefined) {
    try {
      new RegExp(node.pattern, 'u');
    } catch (error) {
      fail(file, `${where} has an invalid pattern (${error.message})`);
    }
  }
  if (node.required !== undefined) {
    if (!Array.isArray(node.required)) fail(file, `${where || '/'} required is not an array`);
    else {
      for (const name of node.required) {
        if (!node.properties || !(name in node.properties)) {
          fail(file, `${where || '/'} requires "${name}" but does not define it`);
        }
      }
    }
  }
  if (isObject(node.properties)) {
    for (const [name, child] of Object.entries(node.properties)) {
      lintSchema(child, `${where}/properties/${name}`, file, true);
    }
  }
  if (isObject(node.items)) lintSchema(node.items, `${where}/items`, file, false);
  if (isObject(node.additionalProperties)) {
    lintSchema(node.additionalProperties, `${where}/additionalProperties`, file, false);
  }
  if (isObject(node.$defs)) {
    for (const [name, child] of Object.entries(node.$defs)) {
      lintSchema(child, `${where}/$defs/${name}`, file, false);
    }
  }
}

// ---- Minimal validator --------------------------------------------------------

function resolveRef(root, ref) {
  if (!ref.startsWith('#/')) return undefined;
  return ref
    .slice(2)
    .split('/')
    .map((part) => part.replace(/~1/g, '/').replace(/~0/g, '~'))
    .reduce((node, part) => (node === undefined ? undefined : node[part]), root);
}

function typeOk(type, value) {
  switch (type) {
    case 'object': return isObject(value);
    case 'array': return Array.isArray(value);
    case 'string': return typeof value === 'string';
    case 'integer': return Number.isInteger(value);
    case 'number': return typeof value === 'number' && Number.isFinite(value);
    case 'boolean': return typeof value === 'boolean';
    case 'null': return value === null;
    default: return false;
  }
}

function validDate(text) {
  const m = /^(\d{4})-(\d{2})-(\d{2})$/.exec(text);
  if (!m) return false;
  const [y, mo, d] = [Number(m[1]), Number(m[2]), Number(m[3])];
  const date = new Date(Date.UTC(y, mo - 1, d));
  return date.getUTCFullYear() === y && date.getUTCMonth() === mo - 1 && date.getUTCDate() === d;
}

function formatOk(format, value) {
  switch (format) {
    case 'date': return validDate(value);
    case 'date-time':
      return (
        /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}(\.\d+)?(Z|[+-]\d{2}:\d{2})$/.test(value) &&
        validDate(value.slice(0, 10)) &&
        !Number.isNaN(Date.parse(value))
      );
    case 'uri': return /^[a-z][a-z0-9+.-]*:\S+$/i.test(value);
    case 'email': return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
    default: return true;
  }
}

const same = (a, b) => JSON.stringify(a) === JSON.stringify(b);

function validate(schema, value, path, root, out) {
  if (schema.$ref) {
    const target = resolveRef(root, schema.$ref);
    if (!target) {
      out.push(`${path || '/'}: unresolvable $ref ${schema.$ref}`);
      return;
    }
    validate(target, value, path, root, out);
  }
  if (schema.type !== undefined) {
    const types = Array.isArray(schema.type) ? schema.type : [schema.type];
    if (!types.some((t) => typeOk(t, value))) {
      out.push(`${path || '/'}: expected ${types.join(' or ')}, got ${JSON.stringify(value)}`);
      return;
    }
  }
  if (schema.enum !== undefined && !schema.enum.some((option) => same(option, value))) {
    out.push(`${path || '/'}: ${JSON.stringify(value)} is not one of ${schema.enum.join(', ')}`);
  }
  if (schema.const !== undefined && !same(schema.const, value)) {
    out.push(`${path || '/'}: must equal ${JSON.stringify(schema.const)}`);
  }
  if (typeof value === 'string') {
    const length = [...value].length;
    if (schema.minLength !== undefined && length < schema.minLength) {
      out.push(`${path}: shorter than ${schema.minLength} characters`);
    }
    if (schema.maxLength !== undefined && length > schema.maxLength) {
      out.push(`${path}: longer than ${schema.maxLength} characters`);
    }
    if (schema.pattern !== undefined && !new RegExp(schema.pattern, 'u').test(value)) {
      out.push(`${path}: ${JSON.stringify(value)} does not match ${schema.pattern}`);
    }
    if (schema.format !== undefined && !formatOk(schema.format, value)) {
      out.push(`${path}: ${JSON.stringify(value)} is not a valid ${schema.format}`);
    }
  }
  if (typeof value === 'number') {
    if (schema.minimum !== undefined && value < schema.minimum) {
      out.push(`${path}: ${value} is below the minimum ${schema.minimum}`);
    }
    if (schema.maximum !== undefined && value > schema.maximum) {
      out.push(`${path}: ${value} is above the maximum ${schema.maximum}`);
    }
  }
  if (Array.isArray(value)) {
    if (schema.minItems !== undefined && value.length < schema.minItems) {
      out.push(`${path}: fewer than ${schema.minItems} items`);
    }
    if (schema.maxItems !== undefined && value.length > schema.maxItems) {
      out.push(`${path}: more than ${schema.maxItems} items`);
    }
    if (isObject(schema.items)) {
      value.forEach((item, i) => validate(schema.items, item, `${path}/${i}`, root, out));
    }
  }
  if (isObject(value)) {
    for (const name of schema.required ?? []) {
      if (!(name in value)) out.push(`${path || '/'}: missing required "${name}"`);
    }
    const props = schema.properties ?? {};
    for (const [name, child] of Object.entries(value)) {
      if (name in props) validate(props[name], child, `${path}/${name}`, root, out);
      else if (schema.additionalProperties === false) {
        out.push(`${path || '/'}: unexpected field "${name}"`);
      } else if (isObject(schema.additionalProperties)) {
        validate(schema.additionalProperties, child, `${path}/${name}`, root, out);
      }
    }
  }
}

// ---- CSV shape ----------------------------------------------------------------

function csvRows(text) {
  const rows = [];
  let row = [];
  let field = '';
  let quoted = false;
  for (let i = 0; i < text.length; i++) {
    const c = text[i];
    if (quoted) {
      if (c === '"' && text[i + 1] === '"') {
        field += '"';
        i++;
      } else if (c === '"') quoted = false;
      else field += c;
    } else if (c === '"') quoted = true;
    else if (c === ',') {
      row.push(field);
      field = '';
    } else if (c === '\n' || c === '\r') {
      if (c === '\r' && text[i + 1] === '\n') i++;
      row.push(field);
      rows.push(row);
      row = [];
      field = '';
    } else field += c;
  }
  if (field || row.length) {
    row.push(field);
    rows.push(row);
  }
  return { rows: rows.filter((r) => r.length > 1 || r[0] !== ''), unterminated: quoted };
}

// ---- Run ----------------------------------------------------------------------

function listFiles(dir) {
  return existsSync(dir)
    ? readdirSync(dir).filter((name) => statSync(join(dir, name)).isFile())
    : [];
}

function main() {
  if (!existsSync(SCHEMAS)) {
    console.error(`schemas-check: ${rel(SCHEMAS)} not found`);
    process.exit(1);
  }

  const schemaFiles = listFiles(SCHEMAS).filter((name) => name.endsWith('.json'));
  const schemas = new Map();

  for (const name of schemaFiles) {
    const file = join(SCHEMAS, name);
    const where = rel(file);
    const m = /^([a-z0-9]+(?:-[a-z0-9]+)*)\.v(\d+)\.json$/.exec(name);
    if (!m) {
      fail(where, 'schema file names follow <name>.v<major>.json');
      continue;
    }
    const schema = readJson(file);
    if (!schema) continue;
    const stem = m[1];
    if (schema.$schema !== DRAFT) fail(where, `$schema must be ${DRAFT}`);
    if (schema.$id !== `${BASE_ID}${name}`) fail(where, `$id must be ${BASE_ID}${name}`);
    for (const key of ['title', 'description']) {
      if (typeof schema[key] !== 'string' || !schema[key].trim()) fail(where, `missing ${key}`);
    }
    if (schema.type !== 'object') fail(where, 'the root type must be object');
    if (!Array.isArray(schema.required) || !schema.required.length) {
      fail(where, 'the root must name its required fields');
    }
    if (!Array.isArray(schema['x-evidences']) || !schema['x-evidences'].length) {
      fail(where, 'the root must carry x-evidences');
    }
    const layers = schema['x-layer'];
    if (!Array.isArray(layers) || !layers.length || layers.some((n) => !Number.isInteger(n) || n < 1 || n > 5)) {
      fail(where, 'x-layer must list stack layers 1 to 5');
    }
    const patterns = schema['x-pattern'];
    if (!Array.isArray(patterns) || !patterns.length || patterns.some((p) => !String(p).startsWith(PATTERN_BASE))) {
      fail(where, `x-pattern must list pattern URLs under ${PATTERN_BASE}`);
    }
    if (!STAGES.has(schema['x-lifecycle-stage'])) {
      fail(where, `x-lifecycle-stage must be one of ${[...STAGES].join(', ')}`);
    }
    const self = schema.properties?.$schema;
    if (!self || self.const !== schema.$id) {
      fail(where, 'properties.$schema must be a const equal to the $id');
    }
    lintSchema(schema, '', where, false);
    schemas.set(stem, { file, schema, name });
  }

  let validated = 0;
  for (const [stem, { schema }] of schemas) {
    const exampleFile = join(EXAMPLES, `${stem}.example.json`);
    if (!existsSync(exampleFile)) {
      fail(rel(exampleFile), `missing example for ${stem}`);
    } else {
      const example = readJson(exampleFile);
      if (example !== undefined) {
        if (!isObject(example) || example.$schema !== schema.$id) {
          fail(rel(exampleFile), `"$schema" must be ${schema.$id}`);
        }
        const out = [];
        validate(schema, example, '', schema, out);
        out.forEach((message) => fail(rel(exampleFile), message));
        if (!out.length) validated++;
      }
    }

    const templateFile = join(TEMPLATES, `${stem}.md`);
    if (!existsSync(templateFile)) {
      fail(rel(templateFile), `missing human template for ${stem}`);
    } else {
      const md = readFileSync(templateFile, 'utf8');
      if (!md.includes(schema.$id)) fail(rel(templateFile), `does not link ${schema.$id}`);
      for (const field of Object.keys(schema.properties ?? {})) {
        if (field === '$schema') continue;
        if (!md.includes(`\`${field}\``)) fail(rel(templateFile), `does not name the field \`${field}\``);
      }
    }
  }

  for (const name of listFiles(EXAMPLES)) {
    const stem = name.replace(/\.example\.json$/, '');
    if (!name.endsWith('.example.json') || !schemas.has(stem)) {
      fail(rel(join(EXAMPLES, name)), 'example without a matching schema');
    }
  }

  for (const name of listFiles(TEMPLATES).filter((n) => n.endsWith('.csv'))) {
    const file = join(TEMPLATES, name);
    const { rows, unterminated } = csvRows(readFileSync(file, 'utf8'));
    if (unterminated) fail(rel(file), 'unterminated quoted field');
    if (rows.length < 2) fail(rel(file), 'needs a header and at least one row');
    const width = rows[0]?.length ?? 0;
    rows.forEach((row, i) => {
      if (row.length !== width) fail(rel(file), `row ${i + 1} has ${row.length} columns, the header has ${width}`);
    });
  }

  // House style: no em dash anywhere in the library.
  for (const dir of [SCHEMAS, EXAMPLES, TEMPLATES]) {
    for (const name of listFiles(dir)) {
      const text = readFileSync(join(dir, name), 'utf8');
      const count = text.split(EM_DASH).length - 1;
      if (count) fail(rel(join(dir, name)), `${count} em dash(es); use , : ; . ( ) instead`);
    }
  }

  // Compatibility with the illustrative shapes in chapter 05.
  const compat = [
    ['Illustrative schema for the verdict:', 'policy-card', '#/$defs/verdict'],
    ['Illustrative schema for the result:', 'eval-result', ''],
    ['Illustrative schema for a registry entry:', 'agent-register-entry', ''],
    ['Illustrative schema for a registry entry:', 'ai-system-register-entry', ''],
    ['Illustrative schema for the evidence record:', 'evidence-record', ''],
  ];
  let compatChecked = 0;
  if (!existsSync(PATTERNS_MD)) {
    warnings.push(`${rel(PATTERNS_MD)} not found; skipped the chapter 05 compatibility check`);
  } else {
    // The catalogue followed by every pattern page, in file-name order: each
    // compatibility lead below appears once across them.
    const pageFiles = existsSync(PATTERN_PAGES)
      ? readdirSync(PATTERN_PAGES).filter((name) => name.endsWith('.md')).sort()
      : [];
    const chapter = [
      readFileSync(PATTERNS_MD, 'utf8'),
      ...pageFiles.map((name) => readFileSync(join(PATTERN_PAGES, name), 'utf8')),
    ].join('\n');
    for (const [lead, stem, pointer] of compat) {
      const at = chapter.indexOf(lead);
      const block = at === -1 ? null : /```json\s*\n([\s\S]*?)```/.exec(chapter.slice(at, at + 1200));
      const entry = schemas.get(stem);
      if (!block || !entry) {
        warnings.push(`chapter 05 block "${lead}" or schema ${stem} not found; compatibility not checked`);
        continue;
      }
      let instance;
      try {
        instance = JSON.parse(block[1]);
      } catch (error) {
        warnings.push(`chapter 05 block "${lead}" is not valid JSON (${error.message})`);
        continue;
      }
      const target = pointer ? resolveRef(entry.schema, pointer) : entry.schema;
      const out = [];
      validate(target, instance, '', entry.schema, out);
      out.forEach((message) => fail(`chapter 05 patterns ("${lead}") vs ${stem}`, message));
      compatChecked++;
    }
  }

  warnings.forEach((w) => console.warn(`schemas-check: warning: ${w}`));
  if (errors.length) {
    console.error(`schemas-check: ${errors.length} problem(s):\n`);
    errors.forEach((e) => console.error(`  ${e}`));
    process.exit(1);
  }
  console.log(
    `schemas-check: ${schemas.size} schema(s) OK, ${validated} example(s) valid, ` +
      `${compatChecked} chapter 05 shape(s) compatible.`,
  );
}

main();
