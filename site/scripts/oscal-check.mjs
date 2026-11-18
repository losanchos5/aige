#!/usr/bin/env node
// oscal-check: fail the build if a file under dist/oscal/ is not valid OSCAL or
// names a control the catalog lacks (design D7 of openspec/changes/
// oscal-catalog-export). Each JSON file is validated with Ajv against the NIST
// schema of its root key (catalog, profile, mapping-collection), copied in
// scripts/oscal/ (see its README). Then: the catalog repeats no control id,
// every profile selects and every mapping sources only catalog ids, and the
// union of the profiles is the catalog.
//
//   node scripts/oscal-check.mjs [dir]      # from site/; dir defaults to dist/oscal
import { readdirSync, readFileSync, existsSync, statSync } from 'node:fs';
import { join, dirname, resolve, relative } from 'node:path';
import { fileURLToPath } from 'node:url';
import Ajv from 'ajv';

const SITE = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const SCHEMAS = join(SITE, 'scripts', 'oscal');
const DIR = resolve(process.cwd(), process.argv[2] ?? join(SITE, 'dist', 'oscal'));
const SCHEMA_FILE = {
  catalog: 'oscal_catalog_schema.json',
  profile: 'oscal_profile_schema.json',
  'mapping-collection': 'oscal_mapping_schema.json',
};

const errors = [];
const fail = (file, path, rule) => errors.push(`${file}: ${path || '/'}: ${rule.replace(/\n/g, '\\n')}`);
const rel = (file) => relative(DIR, file).replace(/\\/g, '/');

function finish() {
  if (errors.length) {
    console.error(`oscal-check: ${errors.length} problem(s) in ${DIR}:\n`);
    errors.forEach((e) => console.error(`  ${e}`));
    process.exit(1);
  }
}

function jsonFiles(dir) {
  return readdirSync(dir).flatMap((name) => {
    const path = join(dir, name);
    if (statSync(path).isDirectory()) return jsonFiles(path);
    return name.endsWith('.json') ? [path] : [];
  });
}

function main() {
  if (!existsSync(DIR) || !statSync(DIR).isDirectory()) {
    fail(DIR, '', 'directory missing (run astro build first)');
    finish();
  }
  const files = jsonFiles(DIR);
  const names = files.map(rel);
  for (const required of ['catalog.json', 'mappings/controls.json']) {
    if (!names.includes(required)) fail(required, '', 'file missing');
  }
  if (!names.some((n) => /^profiles\/[^/]+\.json$/.test(n))) fail('profiles/*.json', '', 'no profile file');

  // Options as in scripts/oscal/README.md: the OSCAL datatypes carry their own patterns.
  const ajv = new Ajv({ strict: false, validateFormats: false });
  const validators = {};
  const validatorFor = (root) =>
    (validators[root] ??= ajv.compile(JSON.parse(readFileSync(join(SCHEMAS, SCHEMA_FILE[root]), 'utf8'))));

  const docs = {};
  for (const file of files) {
    const name = rel(file);
    let doc;
    try {
      doc = JSON.parse(readFileSync(file, 'utf8'));
    } catch (error) {
      fail(name, '', `not valid JSON (${error.message})`);
      continue;
    }
    const roots = Object.keys(doc ?? {}).filter((k) => k !== '$schema');
    const root = roots.length === 1 && SCHEMA_FILE[roots[0]] ? roots[0] : null;
    if (!root) {
      fail(name, '', `root key must be one of ${Object.keys(SCHEMA_FILE).join(', ')} (found ${roots.join(', ') || 'none'})`);
      continue;
    }
    const validate = validatorFor(root);
    if (!validate(doc)) {
      for (const e of validate.errors) fail(name, e.instancePath, `${e.keyword}: ${e.message} (schema ${e.schemaPath})`);
      continue;
    }
    docs[name] = { root, body: doc[root] };
  }

  const catalog = docs['catalog.json'];
  let controls = 0;
  let pairs = 0;
  let profileCount = 0;
  if (catalog?.root === 'catalog') {
    const ids = new Map();
    const walk = (list, path) =>
      (list ?? []).forEach((c, i) => {
        const at = `${path}/${i}`;
        if (ids.has(c.id)) fail('catalog.json', `${at}/id`, `duplicate control id ${c.id} (first at ${ids.get(c.id)})`);
        else ids.set(c.id, `${at}/id`);
        walk(c.controls, `${at}/controls`);
      });
    walk(catalog.body.controls, '/catalog/controls');
    (catalog.body.groups ?? []).forEach((g, i) => walk(g.controls, `/catalog/groups/${i}/controls`));
    controls = ids.size;

    const selected = new Set();
    for (const [name, doc] of Object.entries(docs)) {
      if (doc.root === 'profile') {
        profileCount++;
        const href = doc.body.imports[0]?.href ?? '';
        if (!href.endsWith('/oscal/catalog.json')) {
          fail(name, '/profile/imports/0/href', `must import the catalog (ends with /oscal/catalog.json), found ${href}`);
        }
        doc.body.imports.forEach((imp, i) =>
          (imp['include-controls'] ?? []).forEach((sel, j) =>
            (sel['with-ids'] ?? []).forEach((id, k) => {
              selected.add(id);
              if (!ids.has(id)) {
                fail(name, `/profile/imports/${i}/include-controls/${j}/with-ids/${k}`, `control id ${id} not in the catalog`);
              }
            }),
          ),
        );
      }
      if (doc.root === 'mapping-collection') {
        doc.body.mappings.forEach((m, i) =>
          m.maps.forEach((map, j) => {
            pairs++;
            map.sources.forEach((s, k) => {
              if (!ids.has(s['id-ref'])) {
                fail(name, `/mapping-collection/mappings/${i}/maps/${j}/sources/${k}/id-ref`, `control id ${s['id-ref']} not in the catalog`);
              }
            });
          }),
        );
      }
    }
    for (const id of ids.keys()) {
      if (!selected.has(id)) fail('profiles/*.json', '', `catalog control ${id} is selected by no profile`);
    }
  }
  finish();
  console.log(`oscal-check: ${files.length} file(s) valid OSCAL, ${controls} control(s), ${profileCount} profile(s), ${pairs} mapping pair(s).`);
}

main();
