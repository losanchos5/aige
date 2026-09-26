// profile-release.spec.ts: the DOI of a control profile version on its page,
// its API record and its Markdown twin, and scripts/profile-release.mjs, the
// packager of a profile version for a Zenodo deposit. Everything reads the
// built files in dist (no browser) and skips when there is no build. The
// script runs under a preloaded fetch stub (tests/fixtures/zenodo-fetch-stub.mjs)
// that logs every request: the dry runs must log none, the stubbed deposit
// must go to the sandbox unless --production is passed, and the token never
// goes to a link on another origin. Block orp2-release
// (open-reference-project-2), hardened by orp2-review-fixes.
import { test, expect } from '@playwright/test';
import { existsSync, readdirSync, readFileSync, rmSync } from 'node:fs';
import { join, resolve } from 'node:path';
import { spawnSync } from 'node:child_process';
import { createHash } from 'node:crypto';
import { pathToFileURL } from 'node:url';
import { profiles } from '../src/data/controls';
import { site } from '../src/data/site';

const SLUG = 'evaluation-environment';
const SCRIPT = join('scripts', 'profile-release.mjs');
const STUB = pathToFileURL(resolve('tests', 'fixtures', 'zenodo-fetch-stub.mjs')).href;
const DATASET = join('dist', 'api', 'v1', 'controls.json');
const DATASET_SCHEMA = join('dist', 'api', 'v1', 'schemas', 'controls.json');
const EM_DASH = String.fromCharCode(0x2014);
const TOKEN = 'test-token-not-a-real-one';

type Json = Record<string, any>;
const readJson = (file: string): Json => JSON.parse(readFileSync(file, 'utf8')) as Json;
const profile = profiles.find((p) => p.slug === SLUG)!;
const bundleName = `${SLUG}-v${profile.version}`;
const title = `AIGE Control Profile: ${profile.title} v${profile.version}`;

/** Runs the script with the fetch stub; the token is set only when given. */
function run(args: string[], opts: { token?: string; fetchLog: string; mode?: 'deny' | 'fake'; bucketOrigin?: string }) {
  const env: NodeJS.ProcessEnv = { ...process.env, FETCH_LOG: opts.fetchLog, FETCH_MODE: opts.mode ?? 'deny' };
  delete env.ZENODO_TOKEN;
  delete env.FETCH_BUCKET_ORIGIN;
  if (opts.bucketOrigin) env.FETCH_BUCKET_ORIGIN = opts.bucketOrigin;
  if (opts.token) env.ZENODO_TOKEN = opts.token;
  const res = spawnSync(process.execPath, ['--import', STUB, SCRIPT, ...args], { env, encoding: 'utf8' });
  return { status: res.status, stdout: res.stdout, stderr: res.stderr };
}

const requests = (fetchLog: string): Json[] =>
  existsSync(fetchLog)
    ? readFileSync(fetchLog, 'utf8').trim().split('\n').filter(Boolean).map((l) => JSON.parse(l) as Json)
    : [];

const sha256 = (file: string) => createHash('sha256').update(readFileSync(file)).digest('hex');

test.describe('profile DOI on the built site', () => {
  test.skip(!existsSync(DATASET) && !process.env.CI, 'run npm run build first');

  test('each profile record carries doi and conceptDoi (null until deposited) and its citation', () => {
    const api = readJson(DATASET);
    for (const p of profiles) {
      const row = (api.profiles as Json[]).find((r) => r.slug === p.slug)!;
      expect(row.doi, p.slug).toBe(p.doi ?? null);
      expect(row.conceptDoi, p.slug).toBe(p.conceptDoi ?? null);
      expect(row.citation.doi).toBe(p.doi ?? p.conceptDoi ?? site.conceptDoi);
      expect(row.citation.doiKind).toBe(p.doi ? 'profile' : p.conceptDoi ? 'profile-concept' : 'project-concept');
      expect(row.citation.url).toBe(`${site.url}/controls/${p.slug}`);
      expect(row.citation.text).toContain(`https://doi.org/${row.citation.doi}`);
    }
    // No profile has been deposited yet: nothing is invented.
    const row = (api.profiles as Json[]).find((r) => r.slug === SLUG)!;
    expect(row.doi).toBeNull();
    expect(row.citation.doi).toBe(site.conceptDoi);
    expect(row.citation.doiKind).toBe('project-concept');
  });

  test('the closed dataset schema requires the new profile fields', () => {
    test.skip(!existsSync(DATASET_SCHEMA) && !process.env.CI, 'no dataset schema file in dist');
    const schema = readJson(DATASET_SCHEMA);
    const item = schema.properties.profiles.items;
    expect(item.additionalProperties).toBe(false);
    for (const key of ['doi', 'conceptDoi', 'citation']) expect(item.required).toContain(key);
    expect(item.properties.doi.type).toEqual(['string', 'null']);
    expect(item.properties.citation.required).toEqual(['text', 'doi', 'doiKind', 'url']);
    expect(item.properties.citation.properties.doiKind.enum).toEqual(['profile', 'profile-concept', 'project-concept']);
  });

  test('the Markdown twin names the effective DOI and the profile version', () => {
    const md = readFileSync(join('dist', 'controls', `${SLUG}.md`), 'utf8');
    const front = md.split('---')[1];
    expect(front).toContain(`doi: https://doi.org/${site.conceptDoi}`);
    expect(front).toContain(`version: "${profile.version}"`);
  });

  test('the profile page shows provenance and cites the project concept DOI, labelled', () => {
    const html = readFileSync(join('dist', 'controls', `${SLUG}.html`), 'utf8');
    expect(html).toContain('aria-label="Provenance"');
    expect(html).toContain(`href="https://doi.org/${site.conceptDoi}"`);
    expect(html).toContain(`/edit/main/site/src/data/controls/${SLUG}.ts`);
    expect(html).toContain('issues/new?template=control-review.yml');
    expect(html).toMatch(/id="cite"/);
    expect(html).toMatch(/href="#cite"/);
    expect(html).toContain('data-doi-kind="project-concept"');
    expect(html).toContain('project concept DOI');
    const apa = /<p class="cite-apa[^"]*"[^>]*>([\s\S]*?)<\/p>/.exec(html)?.[1] ?? '';
    expect(apa).toContain(`https://doi.org/${site.conceptDoi}`);
  });
});

test.describe('scripts/profile-release.mjs', () => {
  test.skip(!existsSync(DATASET) && !process.env.CI, 'run npm run build first');

  test('dry run: writes the bundle and prints the Zenodo metadata, with no network request even with a token', () => {
    const out = test.info().outputPath('releases');
    const fetchLog = test.info().outputPath('fetch.log');
    const res = run([SLUG, '--dry-run', '--out', out], { token: TOKEN, fetchLog });
    expect(res.status, res.stderr).toBe(0);
    expect(requests(fetchLog)).toEqual([]);
    expect(res.stderr).toContain('no network request');
    expect(res.stdout + res.stderr).not.toContain(TOKEN);

    const meta = JSON.parse(res.stdout) as Json;
    expect(meta.title).toBe(title);
    expect(meta.version).toBe(profile.version);
    expect(meta.upload_type).toBe('dataset');
    expect(meta.license).toBe('cc-by-4.0');
    expect(meta.language).toBe('eng');
    expect(meta.creators).toEqual([{ name: 'García Aibar, Jorge' }]);
    expect(meta.keywords).toEqual(expect.arrayContaining(['AI governance', 'control profile', 'AI assurance']));
    expect(meta.description).toContain('not a claim of conformity');
    expect(meta.related_identifiers).toContainEqual({ identifier: site.conceptDoi, relation: 'isPartOf', scheme: 'doi' });
    expect(meta.related_identifiers).toContainEqual({
      identifier: `${site.url}/controls/${SLUG}`,
      relation: 'isDocumentedBy',
      scheme: 'url',
    });

    const dir = join(out, bundleName);
    for (const f of [`${SLUG}.json`, `${SLUG}.md`, 'control-observation.v1.json', 'README.md', 'CITATION.cff', 'SHA256SUMS']) {
      expect(existsSync(join(dir, f)), f).toBe(true);
    }
    const api = readJson(DATASET);
    const own = (api.controls as Json[]).filter((c) => c.profile === SLUG);
    const expectedExamples = own.flatMap((c) => (c.examples as Json[]).map((e) => String(e.url).split('/').pop()));
    expect(readdirSync(join(dir, 'examples')).sort()).toEqual([...expectedExamples].sort());

    const record = readJson(join(dir, `${SLUG}.json`));
    expect(record.profile.slug).toBe(SLUG);
    expect((record.controls as Json[]).map((c) => c.id)).toEqual(own.map((c) => c.id));
    expect(readFileSync(join(dir, `${SLUG}.md`), 'utf8')).toBe(readFileSync(join('dist', 'controls', `${SLUG}.md`), 'utf8'));

    const cff = readFileSync(join(dir, 'CITATION.cff'), 'utf8');
    expect(cff).toContain('cff-version: 1.2.0');
    expect(cff).toContain('type: dataset');
    expect(cff).toContain(`title: "${title}"`);
    expect(cff).toContain(`version: "${profile.version}"`);
    expect(cff).toContain('license: CC-BY-4.0');
    expect(cff).toContain('family-names: "García Aibar"');
    expect(cff).toContain(`doi: ${site.conceptDoi}`);

    const readme = readFileSync(join(dir, 'README.md'), 'utf8');
    expect(readme).toContain('not a claim of conformity');
    expect(readme).toContain('CC BY 4.0');
    expect(readme).toContain(`${site.url}/controls/${SLUG}`);

    // SHA256SUMS lists every other file of the bundle, with the right hash.
    const lines = readFileSync(join(dir, 'SHA256SUMS'), 'utf8').trim().split('\n');
    const listed = lines.map((l) => {
      const [hash, file] = l.split(/\s{2}/);
      expect(sha256(join(dir, ...file.split('/'))), file).toBe(hash);
      return file;
    });
    const all = (d: string, prefix = ''): string[] =>
      readdirSync(join(dir, d), { withFileTypes: true }).flatMap((e) =>
        e.isDirectory() ? all(join(d, e.name), `${prefix}${e.name}/`) : [`${prefix}${e.name}`],
      );
    expect(listed.sort()).toEqual(all('').filter((f) => f !== 'SHA256SUMS').sort());

    for (const f of ['README.md', 'CITATION.cff', `${SLUG}.json`]) {
      expect(readFileSync(join(dir, f), 'utf8'), f).not.toContain(EM_DASH);
    }
  });

  test('without a token: a dry run into dist/releases by default, no network request', () => {
    const fetchLog = test.info().outputPath('fetch.log');
    const dir = join('dist', 'releases', bundleName);
    try {
      const res = run([SLUG], { fetchLog });
      expect(res.status, res.stderr).toBe(0);
      expect(requests(fetchLog)).toEqual([]);
      expect(res.stderr).toContain('ZENODO_TOKEN is not set');
      expect(res.stderr).toContain('dist/releases, which must never be deployed');
      expect(existsSync(join(dir, 'CITATION.cff'))).toBe(true);
    } finally {
      rmSync(join('dist', 'releases'), { recursive: true, force: true });
    }
  });

  // The dry runs above prove, through the fetch stub, that no request is made
  // without a token or with --dry-run. The stub only sees fetch, so this checks
  // that the script loads no other network module (static or dynamic import).
  test('the script loads no network module besides fetch', () => {
    const src = readFileSync(SCRIPT, 'utf8');
    const specifiers = [...src.matchAll(/(?:\bfrom\s*|\bimport\s*\(\s*|\brequire\s*\(\s*)['"]([^'"]+)['"]/g)].map((m) => m[1]);
    expect(specifiers.length).toBeGreaterThan(0);
    for (const spec of specifiers) {
      expect(spec, spec).not.toMatch(/^(node:)?(http|https|http2|net|tls|dgram|dns|undici)$/);
    }
  });

  test('with a token: a draft on the sandbox, published only with --publish, the token never printed', () => {
    const out = test.info().outputPath('releases');
    const fetchLog = test.info().outputPath('fetch-sandbox.log');
    const res = run([SLUG, '--out', out], { token: TOKEN, fetchLog, mode: 'fake' });
    expect(res.status, res.stderr).toBe(0);
    const calls = requests(fetchLog);
    const files = readFileSync(join(out, bundleName, 'SHA256SUMS'), 'utf8').trim().split('\n').length + 1;
    expect(calls.length).toBe(1 + files + 1);
    for (const c of calls) {
      expect(new URL(c.url).origin).toBe('https://sandbox.zenodo.org');
      expect(c.bearer).toBe(true);
    }
    expect(calls[0]).toMatchObject({ method: 'POST', url: 'https://sandbox.zenodo.org/api/deposit/depositions' });
    expect(calls.at(-1)).toMatchObject({ method: 'PUT', url: 'https://sandbox.zenodo.org/api/deposit/depositions/4242' });
    expect(calls.some((c) => c.url.includes('/actions/publish'))).toBe(false);
    expect(res.stderr).toContain('deposition id: 4242');
    expect(res.stderr).toContain('reserved DOI: 10.5072/zenodo.4242');
    expect(res.stderr).toContain('https://sandbox.zenodo.org/deposit/4242');
    expect(res.stdout + res.stderr).not.toContain(TOKEN);
    // Nor is the token written into any file of the bundle.
    const all = (d: string): string[] =>
      readdirSync(d, { withFileTypes: true }).flatMap((e) => (e.isDirectory() ? all(join(d, e.name)) : [join(d, e.name)]));
    for (const file of all(join(out, bundleName))) expect(readFileSync(file, 'utf8'), file).not.toContain(TOKEN);
  });

  test('never sends the token to a link on another origin than the API', () => {
    const out = test.info().outputPath('releases');
    const fetchLog = test.info().outputPath('fetch-foreign.log');
    const res = run([SLUG, '--out', out], { token: TOKEN, fetchLog, mode: 'fake', bucketOrigin: 'https://files.example.org' });
    expect(res.status).toBe(1);
    expect(res.stderr).toContain('another origin (https://files.example.org)');
    const calls = requests(fetchLog);
    expect(calls).toHaveLength(1);
    for (const c of calls) expect(new URL(c.url).origin).toBe('https://sandbox.zenodo.org');
    expect(res.stdout + res.stderr).not.toContain(TOKEN);
  });

  test('--production --publish goes to zenodo.org and publishes', () => {
    const out = test.info().outputPath('releases');
    const fetchLog = test.info().outputPath('fetch-production.log');
    const res = run([SLUG, '--out', out, '--production', '--publish'], { token: TOKEN, fetchLog, mode: 'fake' });
    expect(res.status, res.stderr).toBe(0);
    const calls = requests(fetchLog);
    for (const c of calls) expect(new URL(c.url).origin).toBe('https://zenodo.org');
    expect(calls.at(-1)).toMatchObject({ method: 'POST', url: 'https://zenodo.org/api/deposit/depositions/4242/actions/publish' });
    expect(res.stderr).toContain(`doi: '10.5072/zenodo.4242', doiVersion: '${profile.version}'`);
    expect(res.stdout + res.stderr).not.toContain(TOKEN);
  });

  test('fails clearly on an unknown profile and when a request fails', () => {
    const fetchLog = test.info().outputPath('fetch.log');
    const unknown = run(['no-such-profile', '--dry-run', '--out', test.info().outputPath('r')], { fetchLog });
    expect(unknown.status).toBe(1);
    expect(unknown.stderr).toContain('no profile "no-such-profile"');

    // The stub in deny mode throws on the first request: a clear error, exit 1.
    const denied = run([SLUG, '--out', test.info().outputPath('r2')], { token: TOKEN, fetchLog: test.info().outputPath('deny.log') });
    expect(denied.status).toBe(1);
    expect(denied.stderr).toContain('network error');
    expect(denied.stdout + denied.stderr).not.toContain(TOKEN);
  });
});
