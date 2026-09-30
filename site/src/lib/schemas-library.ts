// schemas-library.ts: read the published JSON Schemas (public/schemas/*.v1.json)
// at build time and summarise each for /resources/templates. The schema files
// are the single source of truth for a record's title, purpose, obligations,
// layers, patterns and lifecycle stage; scripts/schemas-check.mjs guarantees
// their shape, so this reader only narrows types and fails loudly on drift.
import { readdirSync, readFileSync } from 'node:fs';
import { resolve } from 'node:path';
import type { LifecycleStage } from '../data/templates';

const SCHEMAS_DIR = resolve(process.cwd(), 'public/schemas');
const PATTERN_PREFIX = 'https://aigovernanceengineer.com/bok/patterns#';

export interface SchemaSummary {
  /** File stem, e.g. "incident-record". */
  name: string;
  /** The schema's $id (its canonical URL). */
  id: string;
  title: string;
  /** First sentence of the schema description. */
  purpose: string;
  evidences: string[];
  /** Every x-evidences mark in the schema, the record's own first, then each
   *  field's (nested fields included), in file order: one entry per mark. */
  evidenceMarks: string[];
  layers: number[];
  /** Anchor ids of the chapter-05 patterns (`pattern-*`). */
  patterns: string[];
  stage: LifecycleStage;
  requiredCount: number;
  fieldCount: number;
  schemaHref: string;
  exampleHref: string;
  templateHref: string;
}

function firstSentence(text: string): string {
  const match = /^(.+?\.)(\s|$)/.exec(text);
  return match ? match[1] : text;
}

const asStrings = (value: unknown, where: string): string[] => {
  if (!Array.isArray(value) || value.some((v) => typeof v !== 'string')) {
    throw new Error(`schemas-library: ${where} is not a list of strings`);
  }
  return value as string[];
};

/** Every x-evidences list in `node`, its own first, then its children's in key order. */
function collectMarks(node: unknown, where: string, into: string[] = []): string[] {
  if (node === null || typeof node !== 'object') return into;
  const record = node as Record<string, unknown>;
  if ('x-evidences' in record) into.push(...asStrings(record['x-evidences'], `${where} x-evidences`));
  for (const [key, value] of Object.entries(record)) {
    if (key !== 'x-evidences') collectMarks(value, `${where}/${key}`, into);
  }
  return into;
}

// `$schema` and `extensions` are envelope, not record fields.
const ENVELOPE = new Set(['$schema', 'extensions']);

let cache: SchemaSummary[] | undefined;

/** Every published schema, sorted by file name. */
export function getSchemas(): SchemaSummary[] {
  if (cache) return cache;
  const files = readdirSync(SCHEMAS_DIR)
    .filter((file) => /\.v1\.json$/.test(file))
    .sort();
  cache = files.map((file) => {
    const raw = JSON.parse(readFileSync(resolve(SCHEMAS_DIR, file), 'utf8')) as Record<
      string,
      unknown
    >;
    const name = file.replace(/\.v1\.json$/, '');
    const properties = (raw.properties ?? {}) as Record<string, unknown>;
    const layers = raw['x-layer'];
    if (!Array.isArray(layers) || layers.some((n) => typeof n !== 'number')) {
      throw new Error(`schemas-library: ${file} x-layer is not a list of numbers`);
    }
    return {
      name,
      id: String(raw.$id),
      title: String(raw.title),
      purpose: firstSentence(String(raw.description)),
      evidences: asStrings(raw['x-evidences'], `${file} x-evidences`),
      evidenceMarks: collectMarks(raw, file),
      layers: layers as number[],
      patterns: asStrings(raw['x-pattern'], `${file} x-pattern`).map((url) =>
        url.replace(PATTERN_PREFIX, ''),
      ),
      stage: String(raw['x-lifecycle-stage']) as LifecycleStage,
      requiredCount: asStrings(raw.required, `${file} required`).filter((k) => !ENVELOPE.has(k))
        .length,
      fieldCount: Object.keys(properties).filter((k) => !ENVELOPE.has(k)).length,
      schemaHref: `/schemas/${file}`,
      exampleHref: `/schemas/examples/${name}.example.json`,
      templateHref: `/templates/${name}.md`,
    };
  });
  return cache;
}
