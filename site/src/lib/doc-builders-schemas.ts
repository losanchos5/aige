// doc-builders-schemas.ts: read a published JSON Schema (public/schemas/*.json)
// at build time, so a /toolkit builder can hand it to its client script in the
// JSON island and validate in the browser against the exact file the site
// serves. scripts/schemas-check.mjs guarantees the files' shape.
import { readFileSync } from 'node:fs';
import { resolve } from 'node:path';

const SCHEMAS_DIR = resolve(process.cwd(), 'public/schemas');

export function loadPublicSchema(file: string): Record<string, unknown> {
  if (!/^[a-z0-9-]+\.v\d+\.json$/.test(file)) {
    throw new Error(`doc-builders-schemas: "${file}" is not a schema file name`);
  }
  const raw: unknown = JSON.parse(readFileSync(resolve(SCHEMAS_DIR, file), 'utf8'));
  if (!raw || typeof raw !== 'object' || Array.isArray(raw)) {
    throw new Error(`doc-builders-schemas: ${file} is not a JSON object`);
  }
  return raw as Record<string, unknown>;
}
