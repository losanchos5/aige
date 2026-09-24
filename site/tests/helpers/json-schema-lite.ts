// tests/helpers/json-schema-lite.ts: a dependency-free validator for the JSON
// Schema subset the open-data API publishes (src/lib/api.ts): type (a name or a
// list of names), required, properties, additionalProperties: false, items,
// enum, const, pattern, format (date, uri), minimum and maximum. Any other
// validation keyword makes the schema itself fail, so the subset stays honest:
// nothing is silently left unchecked. Returns a list of errors (empty = valid).

type Schema = Record<string, unknown>;

const VALIDATION = new Set([
  'type',
  'required',
  'properties',
  'additionalProperties',
  'items',
  'enum',
  'const',
  'pattern',
  'format',
  'minimum',
  'maximum',
]);
const ANNOTATION = new Set(['$schema', '$id', 'title', 'description']);

const isObject = (v: unknown): v is Record<string, unknown> =>
  v !== null && typeof v === 'object' && !Array.isArray(v);

function typeOf(value: unknown): string {
  if (value === null) return 'null';
  if (Array.isArray(value)) return 'array';
  if (typeof value === 'number') return Number.isInteger(value) ? 'integer' : 'number';
  return typeof value;
}

function matchesType(value: unknown, type: string): boolean {
  const actual = typeOf(value);
  if (type === 'number') return actual === 'number' || actual === 'integer';
  return actual === type;
}

const ISO_DATE = /^\d{4}-\d{2}-\d{2}$/;

function validDate(value: string): boolean {
  if (!ISO_DATE.test(value)) return false;
  const d = new Date(`${value}T00:00:00Z`);
  return !Number.isNaN(d.getTime()) && d.toISOString().slice(0, 10) === value;
}

export function validate(schema: Schema, value: unknown, path = '$'): string[] {
  const errors: string[] = [];
  for (const key of Object.keys(schema)) {
    if (!VALIDATION.has(key) && !ANNOTATION.has(key)) {
      errors.push(`${path}: schema uses unsupported keyword "${key}"`);
    }
  }

  if (schema.type !== undefined) {
    const types = Array.isArray(schema.type) ? (schema.type as string[]) : [schema.type as string];
    if (!types.some((t) => matchesType(value, t))) {
      errors.push(`${path}: expected ${types.join('|')}, got ${typeOf(value)}`);
      return errors;
    }
  }
  if (schema.const !== undefined && value !== schema.const) {
    errors.push(`${path}: expected const ${JSON.stringify(schema.const)}`);
  }
  if (Array.isArray(schema.enum) && !schema.enum.includes(value as never)) {
    errors.push(`${path}: ${JSON.stringify(value)} not in enum`);
  }
  if (typeof value === 'string') {
    if (typeof schema.pattern === 'string' && !new RegExp(schema.pattern, 'u').test(value)) {
      errors.push(`${path}: "${value}" does not match ${schema.pattern}`);
    }
    if (schema.format === 'date' && !validDate(value)) {
      errors.push(`${path}: "${value}" is not a YYYY-MM-DD date`);
    }
    if (schema.format === 'uri' && !/^https?:\/\/\S+$/.test(value)) {
      errors.push(`${path}: "${value}" is not an absolute http(s) URI`);
    }
  }
  if (typeof value === 'number') {
    if (typeof schema.minimum === 'number' && value < schema.minimum) {
      errors.push(`${path}: ${value} < minimum ${schema.minimum}`);
    }
    if (typeof schema.maximum === 'number' && value > schema.maximum) {
      errors.push(`${path}: ${value} > maximum ${schema.maximum}`);
    }
  }
  if (Array.isArray(value) && isObject(schema.items)) {
    value.forEach((item, i) => errors.push(...validate(schema.items as Schema, item, `${path}[${i}]`)));
  }
  if (isObject(value)) {
    const properties = isObject(schema.properties) ? schema.properties : {};
    for (const name of (schema.required as string[] | undefined) ?? []) {
      if (!(name in value)) errors.push(`${path}: missing required "${name}"`);
    }
    for (const [name, child] of Object.entries(value)) {
      if (name in properties) {
        errors.push(...validate(properties[name] as Schema, child, `${path}.${name}`));
      } else if (schema.additionalProperties === false) {
        errors.push(`${path}: unexpected property "${name}"`);
      }
    }
  }
  return errors;
}
