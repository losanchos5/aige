#!/usr/bin/env node
// profile-release: package one version of an open control profile for a DOI
// deposit on Zenodo, and optionally deposit it. No dependencies (Node 20+:
// fetch, fs, path, crypto). Block orp2-release (open-reference-project-2).
//
// It reads the BUILT site (run `npm run build` first):
//   dist/api/v1/controls.json               the profile record, its controls
//                                           and the crosswalk rows of its controls
//   dist/controls/<slug>.md                 the Markdown twin of the profile page
//   dist/schemas/control-observation.v1.json
//   dist/controls/examples/*.json           the profile's example observations
// and writes dist/releases/<slug>-v<version>/ with <slug>.json, <slug>.md,
// control-observation.v1.json, examples/, README.md, CITATION.cff and
// SHA256SUMS. It prints the Zenodo deposition metadata as JSON on stdout;
// everything else goes to stderr.
//
//   node scripts/profile-release.mjs <slug> [--out dir] [--dry-run]
//   node scripts/profile-release.mjs <slug> [--production] [--publish]
//
// Without ZENODO_TOKEN in the environment, or with --dry-run, it makes no
// network request at all. With a token it creates a draft deposition on the
// Zenodo sandbox (https://sandbox.zenodo.org) unless --production is given,
// uploads the files, sets the metadata and publishes only with --publish. The
// token is read from the environment at run time and is never printed,
// logged or written to disk.
//
// A control profile is a set of draft control specifications, illustrative,
// not a claim of conformity.
import { cpSync, existsSync, mkdirSync, readdirSync, readFileSync, rmSync, statSync, writeFileSync } from 'node:fs';
import { basename, dirname, join, relative, resolve, sep } from 'node:path';
import { fileURLToPath } from 'node:url';
import { createHash } from 'node:crypto';

const SITE = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const ROOT = resolve(SITE, '..');
const DIST = join(SITE, 'dist');
const DATASET = join(DIST, 'api', 'v1', 'controls.json');
const SCHEMA = join(DIST, 'schemas', 'control-observation.v1.json');
const ROOT_CFF = join(ROOT, 'CITATION.cff');

const SANDBOX_API = 'https://sandbox.zenodo.org/api';
const PRODUCTION_API = 'https://zenodo.org/api';
const LICENSE_URL = 'https://creativecommons.org/licenses/by/4.0/';
const DISCLAIMER = 'Draft control specifications, illustrative, not a claim of conformity.';

const USAGE = `Usage: node scripts/profile-release.mjs <slug> [--out dir] [--dry-run] [--production] [--publish]

  <slug>          profile slug, e.g. evaluation-environment
  --out dir       parent directory of the bundle (default: dist/releases)
  --dry-run       build the bundle and print the metadata; no network request
  --production    deposit on zenodo.org instead of sandbox.zenodo.org
  --publish       publish the deposition (default: leave it as a draft)

The Zenodo token is read from the ZENODO_TOKEN environment variable. Without
it the script runs as a dry run.`;

class ReleaseError extends Error {}

function parseArgs(argv) {
  const opts = { slug: undefined, out: undefined, dryRun: false, production: false, publish: false, help: false };
  for (let i = 0; i < argv.length; i++) {
    const arg = argv[i];
    if (arg === '--help' || arg === '-h') opts.help = true;
    else if (arg === '--dry-run') opts.dryRun = true;
    else if (arg === '--production') opts.production = true;
    else if (arg === '--publish') opts.publish = true;
    else if (arg === '--out') {
      const value = argv[++i];
      if (!value || value.startsWith('--')) throw new ReleaseError('--out needs a directory');
      opts.out = value;
    } else if (arg.startsWith('--out=')) opts.out = arg.slice('--out='.length);
    else if (arg.startsWith('-')) throw new ReleaseError(`unknown option ${arg}`);
    else if (opts.slug === undefined) opts.slug = arg;
    else throw new ReleaseError(`unexpected argument ${arg}`);
  }
  return opts;
}

const log = (line) => process.stderr.write(`${line}\n`);
const readJson = (file) => JSON.parse(readFileSync(file, 'utf8'));
const writeJson = (file, value) => writeFileSync(file, `${JSON.stringify(value, null, 2)}\n`, 'utf8');

function requireFile(file, what) {
  if (!existsSync(file)) {
    throw new ReleaseError(`${what} not found: ${relative(SITE, file)}. Run the build first (npm run build in site/).`);
  }
}

// ---------------------------------------------------------------------------
// Inputs.

/** The profile record, its controls and the crosswalk rows of its controls. */
function loadProfile(slug) {
  if (!existsSync(DIST)) {
    throw new ReleaseError('site/dist is missing. Run the build first (npm run build in site/).');
  }
  requireFile(DATASET, 'The controls dataset');
  const data = readJson(DATASET);
  const profiles = Array.isArray(data.profiles) ? data.profiles : [];
  const profile = profiles.find((p) => p.slug === slug);
  if (!profile) {
    const known = profiles.map((p) => p.slug).join(', ') || 'none';
    throw new ReleaseError(`no profile "${slug}" in api/v1/controls.json (profiles: ${known})`);
  }
  const ids = new Set(profile.controls);
  const controls = (data.controls ?? []).filter((c) => ids.has(c.id));
  if (controls.length !== ids.size) {
    throw new ReleaseError(`profile ${slug}: ${ids.size} control ids but ${controls.length} control records`);
  }
  return { data, profile, controls, crosswalk: crosswalkFor(data.crosswalk, ids) };
}

/** The crosswalk restricted to the given controls; undefined when the dataset has none. */
function crosswalkFor(crosswalk, ids) {
  if (!crosswalk || !Array.isArray(crosswalk.frameworks)) return undefined;
  const frameworks = crosswalk.frameworks
    .map((f) => ({
      ...f,
      rows: (f.rows ?? [])
        .map((r) => ({ ...r, controls: (r.controls ?? []).filter((id) => ids.has(id)) }))
        .filter((r) => r.controls.length > 0),
    }))
    .filter((f) => f.rows.length > 0);
  return { ...crosswalk, frameworks };
}

/** The dist file behind an absolute site URL (the example observations). */
function distFileOf(url) {
  const path = decodeURIComponent(new URL(url).pathname).replace(/^\/+/, '');
  return join(DIST, ...path.split('/'));
}

/**
 * The authors of the root CITATION.cff, as key/value maps (family-names,
 * given-names, orcid, affiliation...). A deliberately small reader for the
 * flat list the file uses; it is only a lookup for ORCID and affiliation.
 */
function rootCffAuthors() {
  if (!existsSync(ROOT_CFF)) return [];
  const lines = readFileSync(ROOT_CFF, 'utf8').split(/\r?\n/);
  const start = lines.findIndex((l) => /^authors:\s*$/.test(l));
  if (start === -1) return [];
  const authors = [];
  for (const line of lines.slice(start + 1)) {
    if (/^\S/.test(line)) break;
    const m = /^\s*(-\s+)?([\w-]+):\s*(.*?)\s*$/.exec(line);
    if (!m) continue;
    if (m[1]) authors.push({});
    const current = authors[authors.length - 1];
    if (current) current[m[2]] = m[3].replace(/\s+#.*$/, '').replace(/^"(.*)"$/, '$1').replace(/^'(.*)'$/, '$1');
  }
  return authors;
}

/** The root CITATION.cff value of a top-level key (title, repository-code...). */
function rootCffValue(key) {
  if (!existsSync(ROOT_CFF)) return undefined;
  const re = new RegExp(`^${key}:\\s*(.+?)\\s*$`, 'm');
  const m = re.exec(readFileSync(ROOT_CFF, 'utf8'));
  return m ? m[1].replace(/\s+#.*$/, '').replace(/^"(.*)"$/, '$1') : undefined;
}

/** Each author name of the profile, matched to its root CITATION.cff entry when there is one. */
function authorsOf(profile) {
  const cff = rootCffAuthors();
  return profile.authors.map((name) => {
    const entry = cff.find((a) => `${a['given-names'] ?? ''} ${a['family-names'] ?? ''}`.trim() === name);
    return { name, cff: entry };
  });
}

// ---------------------------------------------------------------------------
// Outputs.

const yaml = (value) => JSON.stringify(String(value));

function citationCff({ profile, authors, title, date, conceptDoi }) {
  const repository = rootCffValue('repository-code');
  const projectTitle = rootCffValue('title');
  const personLines = (a, indent) => {
    if (!a.cff) return [`${indent}- name: ${yaml(a.name)}`];
    const keys = ['family-names', 'given-names', 'orcid', 'affiliation'].filter((k) => a.cff[k]);
    return keys.map((k, i) => `${indent}${i === 0 ? '- ' : '  '}${k}: ${yaml(a.cff[k])}`);
  };
  const lines = [
    'cff-version: 1.2.0',
    'message: "If you use this control profile, please cite it using the metadata below."',
    'type: dataset',
    `title: ${yaml(title)}`,
    `abstract: ${yaml(`${profile.summary} ${DISCLAIMER}`)}`,
    'authors:',
    ...authors.flatMap((a) => personLines(a, '  ')),
    `version: ${yaml(profile.version)}`,
    `date-released: ${yaml(date)}`,
    `url: ${yaml(profile.url)}`,
    ...(repository ? [`repository-code: ${yaml(repository)}`] : []),
    'license: CC-BY-4.0',
    ...(profile.doi ? [`doi: ${profile.doi}`] : []),
    ...(profile.doi || profile.conceptDoi
      ? [
          'identifiers:',
          ...(profile.doi
            ? ['  - type: doi', `    value: ${profile.doi}`, `    description: ${yaml(`Version DOI: v${profile.version}`)}`]
            : []),
          ...(profile.conceptDoi
            ? ['  - type: doi', `    value: ${profile.conceptDoi}`, '    description: "Concept DOI of this profile: resolves to its latest version"']
            : []),
        ]
      : []),
    'keywords:',
    ...keywordsOf(profile).map((k) => `  - ${yaml(k)}`),
    '# The profile is part of the project below (its concept DOI).',
    'references:',
    '  - type: dataset',
    `    title: ${yaml(projectTitle ?? 'AI Governance Engineering: The Thesis & Body of Knowledge')}`,
    '    authors:',
    ...authors.flatMap((a) => personLines(a, '      ')),
    `    doi: ${conceptDoi}`,
    ...(repository ? [`    repository-code: ${yaml(repository)}`] : []),
  ];
  return `${lines.join('\n')}\n`;
}

function keywordsOf(profile) {
  return ['AI governance', 'control profile', 'AI assurance', profile.shortTitle];
}

function readme({ profile, controls, crosswalk, title, examples, slug, conceptDoi, source }) {
  const doiLine = profile.doi
    ? `DOI of this version: https://doi.org/${profile.doi}`
    : `This version has no DOI of its own yet; it is cited with the project concept DOI, https://doi.org/${conceptDoi}.`;
  return `# ${title}

${profile.summary}

${DISCLAIMER} Not legal advice, not a standard and binding on no one. Nothing here is marked
reviewed until a named reviewer has reviewed it.

- Page: ${profile.url}
- Version: ${profile.version} (${profile.status}), updated ${profile.updated}
- Controls: ${controls.length}, ${controls[0].id} to ${controls[controls.length - 1].id}
- ${doiLine}

## Contents

- \`${slug}.json\`: the profile record and its controls${crosswalk ? ', with the crosswalk rows that name them' : ''}, as served by ${source}.
- \`${slug}.md\`: the Markdown version of the profile page.
- \`control-observation.v1.json\`: the JSON Schema of a control observation record.
- \`examples/\`: ${examples.length} illustrative example observation${examples.length === 1 ? '' : 's'}, valid against that schema.
- \`CITATION.cff\`: citation metadata for this version.
- \`SHA256SUMS\`: SHA-256 checksums of every other file (\`sha256sum -c SHA256SUMS\`). On Zenodo
  the files of \`examples/\` are stored at the top level.

## Cite

${profile.citation.text}

## Licence

CC BY 4.0 (${LICENSE_URL}). Part of the AI Governance Engineer project, concept DOI
https://doi.org/${conceptDoi}.
`;
}

function sha256(file) {
  return createHash('sha256').update(readFileSync(file)).digest('hex');
}

/** Every file under dir, as sorted forward-slash paths relative to dir. */
function listFiles(dir, prefix = '') {
  return readdirSync(dir, { withFileTypes: true })
    .flatMap((e) => (e.isDirectory() ? listFiles(join(dir, e.name), `${prefix}${e.name}/`) : [`${prefix}${e.name}`]))
    .sort();
}

function escapeHtml(text) {
  return String(text).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
}

function zenodoMetadata({ profile, authors, title, date, conceptDoi }) {
  return {
    title,
    upload_type: 'dataset',
    description: [
      `<p>${escapeHtml(profile.summary)}</p>`,
      `<p>${escapeHtml(DISCLAIMER)}</p>`,
      `<p>Profile page: <a href="${escapeHtml(profile.url)}">${escapeHtml(profile.url)}</a></p>`,
    ].join(''),
    creators: authors.map((a) => {
      if (!a.cff || !a.cff['family-names']) return { name: a.name };
      return {
        name: `${a.cff['family-names']}, ${a.cff['given-names'] ?? ''}`.replace(/,\s*$/, ''),
        ...(a.cff.orcid ? { orcid: a.cff.orcid.replace(/^https?:\/\/orcid\.org\//, '') } : {}),
        ...(a.cff.affiliation ? { affiliation: a.cff.affiliation } : {}),
      };
    }),
    license: 'cc-by-4.0',
    access_right: 'open',
    keywords: keywordsOf(profile),
    version: profile.version,
    publication_date: date,
    related_identifiers: [
      { identifier: conceptDoi, relation: 'isPartOf', scheme: 'doi' },
      { identifier: profile.url, relation: 'isDocumentedBy', scheme: 'url' },
    ],
    language: 'eng',
  };
}

/** The project concept DOI, from the citation block of the dataset envelope. */
function projectConceptDoi(data) {
  const raw = data.citation?.conceptDoi;
  if (!raw) throw new ReleaseError('api/v1/controls.json has no citation.conceptDoi');
  return String(raw).replace(/^https?:\/\/doi\.org\//, '');
}

function buildBundle(opts) {
  const { data, profile, controls, crosswalk } = loadProfile(opts.slug);
  requireFile(SCHEMA, 'The observation schema');
  const twin = join(DIST, 'controls', `${profile.slug}.md`);
  requireFile(twin, 'The Markdown twin');

  const conceptDoi = projectConceptDoi(data);
  const title = `AIGE Control Profile: ${profile.title} v${profile.version}`;
  const date = profile.changelog?.find((e) => e.version === profile.version)?.date ?? profile.updated;
  const authors = authorsOf(profile);

  const outParent = opts.out ? resolve(process.cwd(), opts.out) : join(DIST, 'releases');
  const dir = join(outParent, `${profile.slug}-v${profile.version}`);
  rmSync(dir, { recursive: true, force: true });
  mkdirSync(join(dir, 'examples'), { recursive: true });

  const record = {
    notice: data.notice,
    license: data.license,
    licenseUrl: data.licenseUrl,
    source: data.self,
    citation: profile.citation,
    profile,
    controls,
    ...(crosswalk ? { crosswalk } : {}),
  };
  writeJson(join(dir, `${profile.slug}.json`), record);
  cpSync(twin, join(dir, `${profile.slug}.md`));
  cpSync(SCHEMA, join(dir, 'control-observation.v1.json'));

  const examples = controls.flatMap((c) => (c.examples ?? []).map((e) => e.url));
  const names = new Set();
  for (const url of examples) {
    const file = distFileOf(url);
    requireFile(file, `The example observation ${url}`);
    const name = basename(file);
    if (names.has(name)) throw new ReleaseError(`two example observations are named ${name}`);
    names.add(name);
    cpSync(file, join(dir, 'examples', name));
  }

  writeFileSync(join(dir, 'README.md'), readme({ profile, controls, crosswalk, title, examples, slug: profile.slug, conceptDoi, source: data.self }), 'utf8');
  writeFileSync(join(dir, 'CITATION.cff'), citationCff({ profile, authors, title, date, conceptDoi }), 'utf8');

  const files = listFiles(dir).filter((f) => f !== 'SHA256SUMS');
  const sums = files.map((f) => `${sha256(join(dir, ...f.split('/')))}  ${f}`).join('\n');
  writeFileSync(join(dir, 'SHA256SUMS'), `${sums}\n`, 'utf8');

  return { dir, profile, files: [...files, 'SHA256SUMS'], metadata: zenodoMetadata({ profile, authors, title, date, conceptDoi }) };
}

// ---------------------------------------------------------------------------
// Zenodo. Reached only with a token and without --dry-run.

async function zenodo(api, token, method, path, { json, body, contentType } = {}) {
  const url = path.startsWith('https://') ? path : `${api}${path}`;
  let res;
  try {
    res = await fetch(url, {
      method,
      headers: {
        Authorization: `Bearer ${token}`,
        ...(json !== undefined ? { 'Content-Type': 'application/json' } : { 'Content-Type': contentType ?? 'application/octet-stream' }),
      },
      body: json !== undefined ? JSON.stringify(json) : body,
    });
  } catch (err) {
    throw new ReleaseError(`Zenodo ${method} ${new URL(url).pathname}: network error (${err?.message ?? err})`);
  }
  const text = await res.text();
  let payload;
  try {
    payload = text ? JSON.parse(text) : {};
  } catch {
    payload = { message: text.slice(0, 300) };
  }
  if (!res.ok) {
    const details = Array.isArray(payload.errors)
      ? payload.errors.map((e) => `${e.field ?? ''} ${e.message ?? (Array.isArray(e.messages) ? e.messages.join('; ') : '')}`.trim()).join('; ')
      : '';
    const hint =
      res.status === 401 || res.status === 403
        ? ' Check that ZENODO_TOKEN has the deposit:write scope (and deposit:actions to publish) and belongs to this host (sandbox and production tokens differ).'
        : '';
    throw new ReleaseError(
      `Zenodo ${method} ${new URL(url).pathname} failed: HTTP ${res.status} ${payload.message ?? ''}${details ? ` (${details})` : ''}.${hint}`,
    );
  }
  return payload;
}

async function deposit(bundle, opts, token) {
  const api = opts.production ? PRODUCTION_API : SANDBOX_API;
  log(`Zenodo: ${opts.production ? 'PRODUCTION (zenodo.org)' : 'sandbox (sandbox.zenodo.org)'}`);

  const created = await zenodo(api, token, 'POST', '/deposit/depositions', { json: {} });
  const id = created.id;
  const bucket = created.links?.bucket;
  if (!id || !bucket) throw new ReleaseError('Zenodo: the new deposition has no id or bucket link');
  log(`Zenodo: draft deposition ${id} created`);

  for (const file of bundle.files) {
    const local = join(bundle.dir, ...file.split('/'));
    // Zenodo keeps files flat: examples/<name> is uploaded as <name>.
    const key = basename(file);
    await zenodo(api, token, 'PUT', `${bucket}/${encodeURIComponent(key)}`, {
      body: readFileSync(local),
      contentType: 'application/octet-stream',
    });
    log(`Zenodo: uploaded ${key} (${statSync(local).size} bytes)`);
  }

  const updated = await zenodo(api, token, 'PUT', `/deposit/depositions/${id}`, { json: { metadata: bundle.metadata } });
  const reserved = updated.metadata?.prereserve_doi?.doi ?? created.metadata?.prereserve_doi?.doi ?? null;
  log(`Zenodo: metadata set`);
  log(`deposition id: ${id}`);
  log(`reserved DOI: ${reserved ?? '(none returned)'}`);
  log(`draft: ${updated.links?.html ?? created.links?.html ?? '(no link returned)'}`);

  if (!opts.publish) {
    log('Not published (pass --publish to publish). Review the draft on Zenodo first.');
    return;
  }
  const published = await zenodo(api, token, 'POST', `/deposit/depositions/${id}/actions/publish`);
  log(`published: DOI ${published.doi ?? reserved}, concept DOI ${published.conceptdoi ?? '(not returned)'}`);
  log(`record: ${published.links?.record_html ?? published.links?.html ?? '(no link returned)'}`);
}

// ---------------------------------------------------------------------------

async function main() {
  const opts = parseArgs(process.argv.slice(2));
  if (opts.help) {
    process.stdout.write(`${USAGE}\n`);
    return 0;
  }
  if (!opts.slug) throw new ReleaseError(`missing profile slug\n\n${USAGE}`);

  const bundle = buildBundle(opts);
  log(`bundle: ${relative(process.cwd(), bundle.dir).split(sep).join('/') || '.'} (${bundle.files.length} files)`);
  process.stdout.write(`${JSON.stringify(bundle.metadata, null, 2)}\n`);

  // The only door to the network: a token AND no --dry-run.
  const token = (process.env.ZENODO_TOKEN ?? '').trim();
  if (opts.dryRun || !token) {
    log(`dry run: no network request made (${opts.dryRun ? '--dry-run' : 'ZENODO_TOKEN is not set'}).`);
    return 0;
  }
  if (bundle.profile.conceptDoi) {
    throw new ReleaseError(
      `profile ${bundle.profile.slug} already has a concept DOI (${bundle.profile.conceptDoi}): a new version must be created from the existing Zenodo record ("New version"), which this script does not do. Nothing was deposited.`,
    );
  }
  await deposit(bundle, opts, token);
  return 0;
}

main().then(
  (code) => process.exit(code),
  (err) => {
    log(`profile-release: ${err instanceof ReleaseError ? err.message : err?.stack ?? err}`);
    process.exit(1);
  },
);
