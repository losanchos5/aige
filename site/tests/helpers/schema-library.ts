// tests/helpers/schema-library.ts: validate a document against one of the
// templates-and-schemas library's JSON Schemas (site/public/schemas/*.v1.json)
// with the same draft 2020-12 subset scripts/schemas-check.mjs enforces at
// build time: type, required, properties, additionalProperties, enum, const,
// items, minItems, maxItems, minLength, maxLength, pattern, minimum, maximum,
// format (date, date-time, uri, email) and local $ref. Returns a list of
// errors; empty means valid.
import { readFileSync } from 'node:fs';
import { join } from 'node:path';

type Schema = Record<string, unknown>;

const isObject = (v: unknown): v is Record<string, unknown> =>
  v !== null && typeof v === 'object' && !Array.isArray(v);

function typeOk(type: string, value: unknown): boolean {
  switch (type) {
    case 'object':
      return isObject(value);
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

function validDate(text: string): boolean {
  const m = /^(\d{4})-(\d{2})-(\d{2})$/.exec(text);
  if (!m) return false;
  const [y, mo, d] = [Number(m[1]), Number(m[2]), Number(m[3])];
  const date = new Date(Date.UTC(y, mo - 1, d));
  return date.getUTCFullYear() === y && date.getUTCMonth() === mo - 1 && date.getUTCDate() === d;
}

function formatOk(format: string, value: string): boolean {
  switch (format) {
    case 'date':
      return validDate(value);
    case 'date-time':
      return (
        /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}(\.\d+)?(Z|[+-]\d{2}:\d{2})$/.test(value) &&
        validDate(value.slice(0, 10)) &&
        !Number.isNaN(Date.parse(value))
      );
    case 'uri':
      return /^[a-z][a-z0-9+.-]*:\S+$/i.test(value);
    case 'email':
      return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
    default:
      return true;
  }
}

function resolveRef(root: Schema, ref: string): Schema | undefined {
  if (!ref.startsWith('#/')) return undefined;
  let node: unknown = root;
  for (const part of ref.slice(2).split('/')) {
    if (!isObject(node)) return undefined;
    node = node[part.replace(/~1/g, '/').replace(/~0/g, '~')];
  }
  return isObject(node) ? node : undefined;
}

const same = (a: unknown, b: unknown) => JSON.stringify(a) === JSON.stringify(b);

function check(schema: Schema, value: unknown, path: string, root: Schema, out: string[]): void {
  if (typeof schema.$ref === 'string') {
    const target = resolveRef(root, schema.$ref);
    if (!target) out.push(`${path || '/'}: unresolvable $ref ${schema.$ref}`);
    else check(target, value, path, root, out);
  }
  if (schema.type !== undefined) {
    const types = (Array.isArray(schema.type) ? schema.type : [schema.type]) as string[];
    if (!types.some((t) => typeOk(t, value))) {
      out.push(`${path || '/'}: expected ${types.join(' or ')}, got ${JSON.stringify(value)}`);
      return;
    }
  }
  if (Array.isArray(schema.enum) && !schema.enum.some((option) => same(option, value))) {
    out.push(`${path || '/'}: ${JSON.stringify(value)} is not one of ${schema.enum.join(', ')}`);
  }
  if (schema.const !== undefined && !same(schema.const, value)) {
    out.push(`${path || '/'}: must equal ${JSON.stringify(schema.const)}`);
  }
  if (typeof value === 'string') {
    const length = [...value].length;
    if (typeof schema.minLength === 'number' && length < schema.minLength) out.push(`${path}: too short`);
    if (typeof schema.maxLength === 'number' && length > schema.maxLength) out.push(`${path}: too long`);
    if (typeof schema.pattern === 'string' && !new RegExp(schema.pattern, 'u').test(value)) {
      out.push(`${path}: ${JSON.stringify(value)} does not match ${schema.pattern}`);
    }
    if (typeof schema.format === 'string' && !formatOk(schema.format, value)) {
      out.push(`${path}: ${JSON.stringify(value)} is not a valid ${schema.format}`);
    }
  }
  if (typeof value === 'number') {
    if (typeof schema.minimum === 'number' && value < schema.minimum) out.push(`${path}: below minimum`);
    if (typeof schema.maximum === 'number' && value > schema.maximum) out.push(`${path}: above maximum`);
  }
  if (Array.isArray(value)) {
    if (typeof schema.minItems === 'number' && value.length < schema.minItems) out.push(`${path}: too few items`);
    if (typeof schema.maxItems === 'number' && value.length > schema.maxItems) out.push(`${path}: too many items`);
    if (isObject(schema.items)) {
      value.forEach((item, i) => check(schema.items as Schema, item, `${path}/${i}`, root, out));
    }
  }
  if (isObject(value)) {
    for (const name of (schema.required as string[] | undefined) ?? []) {
      if (!(name in value)) out.push(`${path || '/'}: missing required "${name}"`);
    }
    const props = (schema.properties as Record<string, Schema> | undefined) ?? {};
    for (const [name, child] of Object.entries(value)) {
      if (name in props) check(props[name], child, `${path}/${name}`, root, out);
      else if (schema.additionalProperties === false) out.push(`${path || '/'}: unexpected field "${name}"`);
      else if (isObject(schema.additionalProperties)) {
        check(schema.additionalProperties as Schema, child, `${path}/${name}`, root, out);
      }
    }
  }
}

/** Load public/schemas/<name>.v1.json (run from site/). */
export function librarySchema(name: string): Schema {
  return JSON.parse(readFileSync(join('public', 'schemas', `${name}.v1.json`), 'utf8')) as Schema;
}

/** Errors of `doc` against the library schema `name`; empty = valid. */
export function validateAgainst(name: string, doc: unknown): string[] {
  const schema = librarySchema(name);
  const out: string[] = [];
  check(schema, doc, '', schema, out);
  return out;
}
