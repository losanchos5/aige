// controls-crosswalk.spec.ts: /controls/crosswalk, its Markdown twin and the
// `crosswalk` key of /api/v1/controls.json (lib/controls-crosswalk.ts). Pure
// Node over the data and the built files in dist (run after the build), like
// api.spec.ts. Every control link resolves, the (framework, id, control) pairs
// of the page, of the registry mappings and of the JSON are the same set, the
// JSON validates against its published schema, no framework without mappings
// gets a table, and the language holds: "not a claim of conformity", never
// "compliant", "certified" or U+2014. Block orp2-crosswalk
// (open-reference-project-2, wave 1). Also the `derivedFrom` sources the
// controls dataset publishes per control: each url resolves in dist.
import { test, expect } from '@playwright/test';
import { existsSync, readFileSync } from 'node:fs';
import { join } from 'node:path';
import { validate } from './helpers/json-schema-lite';
import { controls, controlPath, type Control } from '../src/data/controls';
import { obligationById } from '../src/data/frameworks';
import { threatById } from '../src/data/threats';
import { patterns } from '../src/data/patterns';
import { chapters } from '../src/data/chapters';
import { schemaOrder } from '../src/data/templates';
import { controlRecord } from '../src/lib/api';
import {
  buildControlsCrosswalk,
  crosswalkPairKeys,
  crosswalkPairs,
  profileCrosswalk,
  crosswalkProfiles,
  CONTROLS_CROSSWALK_PATH,
  CROSSWALK_DESCRIPTION,
  CROSSWALK_TITLE,
} from '../src/lib/controls-crosswalk';

// Mirrors src/data/site.ts on purpose (see api.spec.ts).
const SITE_ORIGIN = 'https://aigovernanceengineer.com';
const EM_DASH = String.fromCharCode(0x2014);
const BANNED = /\bcompliant\b|\bcertified\b/i;
const DIST = 'dist';
const PAGE = join(DIST, 'controls', 'crosswalk.html');
const TWIN = join(DIST, 'controls', 'crosswalk.md');
const DATASET = join(DIST, 'api', 'v1', 'controls.json');
const SCHEMA = join(DIST, 'api', 'v1', 'schemas', 'controls.json');
const hasDist = existsSync(PAGE);

type Json = Record<string, unknown>;
interface JsonFramework {
  id: string;
  rows: { ref: string; controls: string[] }[];
}

const read = (file: string): string => readFileSync(file, 'utf8');
const readJson = (file: string): Json => JSON.parse(read(file)) as Json;
const decode = (text: string): string =>
  text.replace(/&amp;/g, '&').replace(/&quot;/g, '"').replace(/&#39;/g, "'").replace(/&lt;/g, '<').replace(/&gt;/g, '>');

/** The page's <main>, where the page's own content lives (not the site chrome). */
function mainOf(html: string): string {
  const start = html.indexOf('<main');
  const end = html.indexOf('</main>');
  expect(start).toBeGreaterThanOrEqual(0);
  expect(end).toBeGreaterThan(start);
  return html.slice(start, end);
}

const kebab = (text: string): string =>
  text
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');

/**
 * The pairs the registry's mappings make, written out from the contract of
 * lib/controls-crosswalk.ts: obligations by instrument, OWASP and ATLAS rows by
 * the id their catalogue prints, NIST SP 800-53 by control family, any other
 * "other" framework by its name.
 */
function registryPairs(rows: readonly Control[]): Set<string> {
  const out = new Set<string>();
  for (const c of rows) {
    if (c.status === 'retired') continue;
    const m = c.mappings;
    const add = (framework: string, ref: string) => out.add(`${framework}|${ref}|${c.id}`);
    for (const id of m.obligations) add(`obligations-${obligationById(id)?.frameworkId}`, id);
    for (const id of m.iso42001) add('iso42001', id);
    for (const id of m.nistAiRmf) add('nist-ai-rmf', id);
    for (const id of [...m.owasp, ...(m.atlas ?? [])]) {
      const t = threatById(id);
      expect(t, `${c.id} ${id}`).toBeDefined();
      if (t) add(t.taxonomy, t.externalId);
    }
    for (const id of m.csaAicm ?? []) add('csa-aicm', id);
    for (const id of m.aiuc1 ?? []) add('aiuc1', id);
    for (const o of m.other ?? []) {
      if (/^NIST SP 800-53\b/.test(o.framework)) add('nist-sp-800-53', o.ref.split('-')[0]);
      else if (o.framework === 'MITRE ATLAS') add('mitre-atlas', o.ref);
      else add(`other-${kebab(o.framework)}`, o.ref);
    }
  }
  return out;
}

function jsonPairs(crosswalk: { frameworks: JsonFramework[] }): string[] {
  return crosswalk.frameworks
    .flatMap((fw) => fw.rows.flatMap((r) => r.controls.map((id) => `${fw.id}|${r.ref}|${id}`)))
    .sort();
}

test.describe('controls crosswalk data', () => {
  test('the crosswalk holds exactly the pairs of the registry mappings', () => {
    const crosswalk = buildControlsCrosswalk();
    const expected = [...registryPairs(controls)].sort();
    expect(expected.length).toBeGreaterThan(0);
    expect(crosswalkPairKeys(crosswalk)).toEqual(expected);
    expect(crosswalkPairs(crosswalk)).toBe(expected.length);
  });

  test('no framework without mappings, no empty row, no repeated control in a row', () => {
    const crosswalk = buildControlsCrosswalk();
    const ids = crosswalk.frameworks.map((fw) => fw.id);
    expect(new Set(ids).size).toBe(ids.length);
    for (const fw of crosswalk.frameworks) {
      expect(fw.rows.length, fw.id).toBeGreaterThan(0);
      const refs = fw.rows.map((r) => r.ref);
      expect(new Set(refs).size, fw.id).toBe(refs.length);
      for (const r of fw.rows) {
        expect(r.controls.length, `${fw.id} ${r.ref}`).toBeGreaterThan(0);
        expect(new Set(r.controls).size, `${fw.id} ${r.ref}`).toBe(r.controls.length);
        expect(r.name.trim(), `${fw.id} ${r.ref}`).not.toBe('');
      }
    }
    // A framework no control maps to disappears: drop every AIUC-1 mapping.
    const withoutAiuc = controls.map((c) => ({ ...c, mappings: { ...c.mappings, aiuc1: [] } }));
    expect(buildControlsCrosswalk(withoutAiuc).frameworks.some((fw) => fw.id === 'aiuc1')).toBe(false);
    if (!controls.some((c) => (c.mappings.csaAicm ?? []).length > 0)) {
      expect(ids).not.toContain('csa-aicm');
    }
  });

  test('the fixed framework order: obligations first, AIUC-1 before the remaining "other" frameworks', () => {
    const ids = buildControlsCrosswalk().frameworks.map((fw) => fw.id);
    const firstNonObligation = ids.findIndex((id) => !id.startsWith('obligations-'));
    expect(ids.slice(firstNonObligation).some((id) => id.startsWith('obligations-'))).toBe(false);
    if (ids.includes('obligations-eu-ai-act')) expect(ids[0]).toBe('obligations-eu-ai-act');
    const order = ['iso42001', 'nist-ai-rmf', 'owasp-llm', 'owasp-asi', 'mitre-atlas', 'csa-aicm', 'nist-sp-800-53', 'aiuc1'];
    const present = order.filter((id) => ids.includes(id));
    expect(ids.filter((id) => order.includes(id))).toEqual(present);
    const aiuc = ids.indexOf('aiuc1');
    if (aiuc >= 0) expect(ids.slice(0, aiuc).some((id) => id.startsWith('other-'))).toBe(false);
  });

  test('the reverse view covers every live control of every profile', () => {
    for (const profile of crosswalkProfiles()) {
      const rows = profileCrosswalk(profile.slug);
      expect(rows.map((r) => r.control.id)).toEqual(
        controls.filter((c) => c.profile === profile.slug && c.status !== 'retired').map((c) => c.id),
      );
    }
  });
});

test.describe('controls crosswalk in dist', () => {
  test.skip(!hasDist && !process.env.CI, 'dist not built');

  test('every control link resolves to a page or an anchor that exists', () => {
    const main = mainOf(read(PAGE));
    const hrefs = [...main.matchAll(/href="(\/controls\/[^"#?]+)(#[^"]*)?"/g)]
      .map((m) => ({ path: m[1], anchor: m[2] ? m[2].slice(1) : '' }))
      .filter((h) => !h.path.endsWith('.md'));
    expect(hrefs.length).toBeGreaterThan(0);
    for (const { path, anchor } of hrefs) {
      const file = join(DIST, `${path.replace(/^\//, '')}.html`);
      expect(existsSync(file), `${path} is built`).toBe(true);
      if (anchor) expect(read(file).includes(`id="${anchor}"`), `${path}#${anchor}`).toBe(true);
    }
    // Every control with a mapping is linked by its canonical path.
    for (const c of controls.filter((row) => registryPairs([row]).size > 0)) {
      expect(main.includes(`href="${controlPath(c)}"`), c.id).toBe(true);
    }
    // In-page anchors (the framework index, the reverse view) land on a heading.
    for (const m of main.matchAll(/href="#([^"]+)"/g)) {
      expect(main.includes(`id="${m[1]}"`), `#${m[1]}`).toBe(true);
    }
  });

  test('pairs on the page = pairs of the registry = pairs of the JSON crosswalk', () => {
    const main = mainOf(read(PAGE));
    const page = [...main.matchAll(/data-pair="([^"]+)"/g)].map((m) => decode(m[1])).sort();
    const registry = [...registryPairs(controls)].sort();
    const doc = readJson(DATASET);
    const json = jsonPairs(doc.crosswalk as { frameworks: JsonFramework[] });
    expect(new Set(page).size).toBe(page.length);
    expect(page).toEqual(registry);
    expect(json).toEqual(registry);
    // One table per framework of the JSON, none for a framework without mappings.
    const sections = [...main.matchAll(/data-crosswalk-framework="([^"]+)"/g)].map((m) => decode(m[1]));
    expect(sections).toEqual((doc.crosswalk as { frameworks: JsonFramework[] }).frameworks.map((fw) => fw.id));
  });

  test('the JSON validates against its published schema', () => {
    const doc = readJson(DATASET);
    const schema = readJson(SCHEMA);
    expect(doc.schema).toBe(`${SITE_ORIGIN}/api/v1/schemas/controls.json`);
    expect(validate(schema, doc).slice(0, 10)).toEqual([]);
    const crosswalkSchema = (schema.properties as Json).crosswalk as Json;
    expect(crosswalkSchema.additionalProperties).toBe(false);
    // A key the schema does not name fails validation.
    const broken = { ...doc, crosswalk: { ...(doc.crosswalk as Json), extra: true } };
    expect(validate(schema, broken).length).toBeGreaterThan(0);
  });

  test('language: not a claim of conformity; no "compliant", "certified" or em dash', () => {
    const html = read(PAGE);
    const main = mainOf(html);
    const twin = read(TWIN);
    const doc = readJson(DATASET);
    const json = JSON.stringify({ notice: doc.notice, crosswalk: doc.crosswalk });
    for (const [name, text] of [
      ['page', html],
      ['twin', twin],
      ['json', json],
    ] as const) {
      expect(text.includes(EM_DASH), name).toBe(false);
      expect(text, name).toContain('not a claim of conformity');
    }
    for (const [name, text] of [
      ['page main', main],
      ['twin', twin],
      ['json', json],
    ] as const) {
      expect(text, name).not.toMatch(BANNED);
    }
    expect(main).toContain('Each mapping is illustrative, not a claim of conformity');
    expect(main).toContain('not affiliated with AIUC');
    // No client script of the page's own: the layout's deferred files follow the article.
    const article = main.slice(main.indexOf('<article'), main.indexOf('</article>'));
    expect(article.length).toBeGreaterThan(0);
    expect(article).not.toMatch(/<script/i);
  });

  test('metadata: title, description, one CollectionPage, twin with canonical', () => {
    const html = read(PAGE);
    const title = /<title>([^<]*)<\/title>/.exec(html)?.[1] ?? '';
    expect(decode(title).startsWith(CROSSWALK_TITLE)).toBe(true);
    expect(CROSSWALK_DESCRIPTION.length).toBeGreaterThanOrEqual(110);
    expect(CROSSWALK_DESCRIPTION.length).toBeLessThanOrEqual(158);
    const description = /<meta name="description" content="([^"]*)"/.exec(html)?.[1] ?? '';
    expect(decode(description)).toBe(CROSSWALK_DESCRIPTION);

    const blocks = [...html.matchAll(/<script type="application\/ld\+json"[^>]*>([\s\S]*?)<\/script>/g)];
    expect(blocks).toHaveLength(1);
    const graph = JSON.parse(blocks[0][1]) as Json;
    const nodes = (Array.isArray(graph['@graph']) ? graph['@graph'] : [graph]) as Json[];
    const collections = nodes.filter((n) => n['@type'] === 'CollectionPage');
    expect(collections).toHaveLength(1);
    expect(collections[0].url).toBe(`${SITE_ORIGIN}${CONTROLS_CROSSWALK_PATH}`);

    const twin = read(TWIN);
    expect(twin).toContain(`canonical: ${SITE_ORIGIN}${CONTROLS_CROSSWALK_PATH}`);
    expect(twin).toContain(`# ${CROSSWALK_TITLE}`);
    expect(html).toMatch(/<link[^>]+rel="alternate"[^>]+crosswalk\.md"/);
  });

  test('/controls links the crosswalk; llms.txt and the sitemap list it', () => {
    expect(mainOf(read(join(DIST, 'controls.html')))).toContain(`href="${CONTROLS_CROSSWALK_PATH}"`);
    expect(read(join(DIST, 'llms.txt'))).toContain(`${SITE_ORIGIN}${CONTROLS_CROSSWALK_PATH})`);
    const sitemap = read(join(DIST, 'sitemap-0.xml'));
    expect(sitemap).toMatch(
      new RegExp(`<loc>${SITE_ORIGIN}${CONTROLS_CROSSWALK_PATH}</loc>\\s*<lastmod>\\d{4}-\\d{2}-\\d{2}`),
    );
  });
});

test.describe('derivedFrom in the controls dataset', () => {
  test.skip(!hasDist && !process.env.CI, 'dist not built');

  /** The dist file behind an absolute site URL (build.format 'file'). */
  const distFileOf = (url: string): string => {
    const path = new URL(url).pathname.replace(/^\/+/, '');
    return join(DIST, path.endsWith('.json') ? path : `${path}.html`);
  };

  test('every control carries derivedFrom, and every url resolves in dist', () => {
    const doc = readJson(DATASET);
    for (const c of doc.controls as Json[]) {
      const sources = c.derivedFrom as { kind: string; ref: string; url: string }[];
      expect(Array.isArray(sources), String(c.id)).toBe(true);
      for (const src of sources) {
        expect(existsSync(distFileOf(src.url)), `${c.id} ${src.kind} ${src.ref}: ${src.url}`).toBe(true);
      }
    }
  });

  test('each kind of source maps to a url that exists (pattern page, schema file, chapter page)', () => {
    const row = {
      ...controls[0],
      derivedFrom: [
        { kind: 'pattern' as const, ref: patterns[0].slug },
        { kind: 'schema' as const, ref: schemaOrder[0] },
        { kind: 'chapter' as const, ref: chapters[0].slug },
      ],
    };
    const record = controlRecord(row);
    expect(record.derivedFrom.map((d) => d.kind)).toEqual(['pattern', 'schema', 'chapter']);
    expect(record.derivedFrom[1].url).toBe(`${SITE_ORIGIN}/schemas/${schemaOrder[0]}.v1.json`);
    for (const src of record.derivedFrom) expect(existsSync(distFileOf(src.url)), src.url).toBe(true);
    expect(controlRecord({ ...controls[0], derivedFrom: undefined }).derivedFrom).toEqual([]);
  });
});

// Block orp2-seo-qa: axe's landmark-unique. OWASP's lists sit both in the
// obligation register and among the threat catalogues under one name, so each
// scrollable table region must still get a name of its own.
test('every table region of the crosswalk has a unique accessible name', () => {
  test.skip(!hasDist && !process.env.CI, 'dist not built');
  const main = mainOf(read(PAGE));
  const headings = new Map(
    [...main.matchAll(/<h[23][^>]*\bid="([^"]+)"[^>]*>([\s\S]*?)<\/h[23]>/g)].map((m) => [
      m[1],
      decode(m[2].replace(/<[^>]+>/g, '')).replace(/\s+/g, ' ').trim(),
    ]),
  );
  const names = [...main.matchAll(/role="region"[^>]*aria-labelledby="([^"]+)"/g)].map((m) =>
    m[1]
      .split(' ')
      .map((id) => {
        expect(headings.has(id), id).toBe(true);
        return headings.get(id);
      })
      .join(' '),
  );
  expect(names.length).toBeGreaterThan(5);
  const dupes = names.filter((name, i) => names.indexOf(name) !== i);
  expect(dupes, dupes.join('\n')).toEqual([]);
});
