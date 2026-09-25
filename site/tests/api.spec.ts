// api.spec.ts: the open-data API under /api/v1/ and the obligation register
// pages, checked on the built files (like seo-infra.spec.ts: pure Node reads of
// dist, no browser). Every JSON document must validate against the schema its
// own `schema` field names, the catalogue and the OpenAPI description must point
// only at files that exist, the per-obligation files must match the register,
// the older /resources downloads must carry schema version 2, _headers must open
// CORS on the data without touching the CSP, and the new HTML pages must carry
// no inline script.
import { test, expect } from '@playwright/test';
import { existsSync, readFileSync, readdirSync, statSync } from 'node:fs';
import { join, relative } from 'node:path';
import { validate } from './helpers/json-schema-lite';
import { inlineScriptAllowed } from './helpers/csp';
import { obligations, obligationSlug } from '../src/data/frameworks';

// Mirrors src/data/site.ts on purpose (see seo-schema.spec.ts).
const SITE_ORIGIN = 'https://aigovernanceengineer.com';
const API_DIR = join('dist', 'api', 'v1');
const SCHEMA_PREFIX = `${SITE_ORIGIN}/api/v1/schemas/`;

type Json = Record<string, unknown>;

const readJson = (file: string): Json => JSON.parse(readFileSync(file, 'utf8')) as Json;

/** Every .json under dir, recursively, as paths. */
function jsonFiles(dir: string): string[] {
  return readdirSync(dir).flatMap((name) => {
    const full = join(dir, name);
    if (statSync(full).isDirectory()) return jsonFiles(full);
    return name.endsWith('.json') ? [full] : [];
  });
}

/** The dist file that serves an absolute site URL. */
function distFileOf(url: string): string {
  const path = new URL(url).pathname.replace(/^\/+/, '');
  return join('dist', path);
}

function schemaFor(doc: Json): Json {
  const url = String(doc.schema ?? '');
  expect(url.startsWith(SCHEMA_PREFIX), `schema URL ${url}`).toBe(true);
  const file = distFileOf(url);
  expect(existsSync(file), `schema file ${file}`).toBe(true);
  return readJson(file);
}

const documents = () =>
  jsonFiles(API_DIR).filter(
    (file) => !relative(API_DIR, file).startsWith('schemas') && !file.endsWith('openapi.json'),
  );

test.describe('open-data API', () => {
  test('every document carries the envelope and validates against its schema', () => {
    const files = documents();
    expect(files.length).toBeGreaterThan(obligations.length);
    for (const file of files) {
      const doc = readJson(file);
      expect(String(doc.notice), file).toContain('not a claim of conformity');
      expect(doc.license, file).toBe('CC BY 4.0');
      expect(Number.isInteger(doc.schemaVersion), file).toBe(true);
      expect(String((doc.citation as Json)?.conceptDoi ?? ''), file).toMatch(/^https:\/\/doi\.org\//);
      const errors = validate(schemaFor(doc), doc);
      expect(errors.slice(0, 10), file).toEqual([]);
    }
  });

  test('schemas are draft 2020-12 and their $id is their own URL', () => {
    for (const file of jsonFiles(join(API_DIR, 'schemas'))) {
      const schema = readJson(file);
      expect(schema.$schema).toBe('https://json-schema.org/draft/2020-12/schema');
      const name = file.replace(/\\/g, '/').split('/').pop();
      expect(schema.$id).toBe(`${SCHEMA_PREFIX}${name}`);
    }
  });

  test('the catalogue lists every dataset file, and every link it gives exists', () => {
    const index = readJson(join(API_DIR, 'index.json'));
    const listed = (index.datasets as Json[]).map((d) => `${d.name}.json`).sort();
    const onDisk = readdirSync(API_DIR)
      .filter((name) => name.endsWith('.json') && name !== 'index.json' && name !== 'openapi.json')
      .sort();
    expect(listed).toEqual(onDisk);
    for (const d of index.datasets as Json[]) {
      expect(existsSync(distFileOf(String(d.url))), String(d.url)).toBe(true);
      expect(existsSync(distFileOf(String(d.schema))), String(d.schema)).toBe(true);
    }
    for (const s of index.schemas as Json[]) {
      expect(existsSync(distFileOf(String(s.url))), String(s.url)).toBe(true);
    }
  });

  test('the OpenAPI description is 3.1 and points only at files that exist', () => {
    const doc = readJson(join(API_DIR, 'openapi.json'));
    expect(doc.openapi).toBe('3.1.0');
    const paths = Object.keys(doc.paths as Json);
    for (const path of paths) {
      const concrete = path
        .replace('{id}', obligationSlug(obligations[0]))
        .replace('{name}', 'obligations');
      expect(existsSync(join(API_DIR, concrete.replace(/^\//, ''))), path).toBe(true);
    }
    // Every response schema is a $ref to a published schema.
    const refs = JSON.stringify(doc).match(/"\$ref":"([^"]+)"/g) ?? [];
    expect(refs.length).toBeGreaterThan(10);
    for (const raw of refs) {
      const url = raw.slice('"$ref":"'.length, -1);
      expect(existsSync(distFileOf(url)), url).toBe(true);
    }
  });

  test('one file per obligation, identical to its row in the register', () => {
    const register = readJson(join(API_DIR, 'obligations.json'));
    const rows = register.obligations as Json[];
    expect(rows.map((r) => r.id)).toEqual(obligations.map((o) => o.id));
    for (const row of rows) {
      const file = join(API_DIR, 'obligations', `${String(row.id).toLowerCase()}.json`);
      expect(existsSync(file), file).toBe(true);
      expect(readJson(file).obligation).toEqual(row);
    }
  });

  test('crosswalk references resolve to register ids', () => {
    const crosswalk = readJson(join(API_DIR, 'crosswalk.json'));
    const ids = new Set(obligations.map((o) => o.id));
    const joined = (crosswalk.references as Json[]).filter((r) => r.obligationId !== null);
    expect(joined.length).toBeGreaterThan(10);
    for (const ref of joined) expect(ids.has(String(ref.obligationId))).toBe(true);
  });
});

test.describe('obligation downloads (schema version 2)', () => {
  test('/resources/obligations.json matches the API register', () => {
    const legacy = readJson(join('dist', 'resources', 'obligations.json'));
    expect(legacy.schemaVersion).toBe(2);
    expect(String(legacy.source)).toContain('/resources/frameworks');
    expect(validate(schemaFor(legacy), legacy).slice(0, 10)).toEqual([]);
    const api = readJson(join(API_DIR, 'obligations.json'));
    expect(legacy.obligations).toEqual(api.obligations);
    // appliesFrom is an ISO date or null; the former text moved to appliesNote.
    for (const row of legacy.obligations as Json[]) {
      if (row.appliesFrom !== null) expect(String(row.appliesFrom)).toMatch(/^\d{4}-\d{2}-\d{2}$/);
    }
  });

  test('/resources/obligations.csv keeps its first seven columns and appends the rest', () => {
    const lines = readFileSync(join('dist', 'resources', 'obligations.csv'), 'utf8')
      .split(/\r?\n/)
      .filter(Boolean);
    const header = lines[1].split(',');
    expect(header.slice(0, 7)).toEqual([
      'Framework',
      'Obligation',
      'Artefact',
      'Layers',
      'Duty holder',
      'Applies from',
      'Chapter',
    ]);
    expect(header).toContain('ID');
    expect(header).toContain('Applies note');
    expect(header).toContain('Reviewed');
    expect(lines.length).toBe(obligations.length + 2);
  });
});

test.describe('_headers', () => {
  const blocks = () =>
    readFileSync(join('dist', '_headers'), 'utf8')
      .replace(/\r/g, '')
      .split(/^(?=\/)/m);

  for (const path of ['/api/v1/*', '/resources/obligations.json', '/resources/crosswalk.json', '/glossary.json']) {
    test(`${path} is CORS-open and cached for an hour`, () => {
      const block = blocks().find((b) => b.startsWith(`${path}\n`));
      expect(block, `no ${path} block`).toBeDefined();
      expect(block).toContain('Access-Control-Allow-Origin: *');
      expect(block).toContain('Cache-Control: public, max-age=3600');
    });
  }

  test('the site-wide CSP still forbids inline script', () => {
    const csp = blocks()
      .find((b) => b.startsWith('/*\n'))!
      .split('\n')
      .find((line) => line.includes('Content-Security-Policy'))!;
    const scriptSrc = csp.split(';').find((d) => d.trim().startsWith('script-src'))!;
    expect(scriptSrc).not.toContain("'unsafe-inline'");
  });
});

test.describe('obligation pages', () => {
  const pages = [
    join('dist', 'obligations.html'),
    join('dist', 'resources', 'data.html'),
    ...obligations.map((o) => join('dist', 'obligations', `${obligationSlug(o)}.html`)),
  ];

  test('every page exists and carries no inline script', () => {
    for (const file of pages) {
      expect(existsSync(file), file).toBe(true);
      const html = readFileSync(file, 'utf8');
      const inline = [...html.matchAll(/<script\b([^>]*)>([\s\S]*?)<\/script>/g)].filter(
        ([, attrs, body]) =>
          !/\bsrc=/.test(attrs) &&
          !/type="application\/ld\+json"/.test(attrs) &&
          body.trim() !== '' &&
          // The theme bootstrap, allowed by its sha256 in the CSP.
          !inlineScriptAllowed(body),
      );
      expect(inline.length, file).toBe(0);
    }
  });

  test('an obligation page shows its id, date, status, source, JSON and citation', () => {
    const html = readFileSync(join('dist', 'obligations', 'aige-obl-euaia-art9.html'), 'utf8');
    expect(html).toContain('AIGE-OBL-EUAIA-ART9');
    expect(html).toContain('<time datetime="2027-12-02">');
    expect(html).toContain('Deferred');
    expect(html).toContain('href="/bok/regulatory-map#eu-ai-act-post-omnibus"');
    expect(html).toContain('href="/api/v1/obligations/aige-obl-euaia-art9.json"');
    expect(html).toContain('Cite this obligation');
    expect(html).toContain('not a claim of conformity');
  });

  test('the register links every obligation page once', () => {
    const html = readFileSync(join('dist', 'obligations.html'), 'utf8');
    for (const row of obligations) {
      expect(html).toContain(`href="/obligations/${obligationSlug(row)}"`);
    }
  });

  test('a chapter keeps its original citation block', () => {
    const html = readFileSync(join('dist', 'bok', 'definition.html'), 'utf8');
    expect(html).toContain('Cite this chapter');
    expect(html).toContain('@misc{aige2026bok');
  });
});
