// control-pages.spec.ts: the page of each specified control (OpenSpec change
// open-reference-project-2, block orp2-pages). Every control with depth
// `specified` has /controls/<profile>/<id> and its Markdown twin in dist, and
// no derived or outline control has either. Each page is canonical to itself,
// carries one ld+json graph with one TechArticle part of its profile's
// TechArticle, announces its twin, has a <title> and description of its own
// (the control's pageTitle and pageDescription), renders and links both of its
// example observations and is linked from its profile page's <main>. The
// host rule of public/_headers makes each twin canonical to its page.
// Everything iterates the registry, so a new profile or a newly specified
// control is covered without editing this file.
import { test, expect } from '@playwright/test';
import { existsSync, readdirSync, readFileSync } from 'node:fs';
import { join } from 'node:path';
import {
  CONTROL_PAGES_ENABLED,
  controls,
  controlsIn,
  controlPagePath,
  controlSlug,
  observationExamples,
  profiles,
  profilePath,
  profileArticleId,
  statusLabels,
  type Control,
} from '../src/data/controls';

// Hardcoded on purpose (as in seo-basics.spec.ts): a test importing the
// constants it asserts on would pass however they drifted.
const ORIGIN = 'https://aigovernanceengineer.com';
const SUFFIX = ' · AI Governance Engineer';
const MAX_SUFFIXED_TITLE = 60;
const MAX_TITLE = 70;
const EM_DASH = String.fromCharCode(0x2014);

const specified = controls.filter((c) => c.depth === 'specified');
const others = controls.filter((c) => c.depth !== 'specified');
const pathOf = (c: Control): string => `${profilePath(c.profile)}/${controlSlug(c)}`;

/** The document title Doc renders for a pageTitle: the suffix only when the whole fits (lib/seo-title.ts). */
const documentTitle = (pageTitle: string): string =>
  `${pageTitle}${SUFFIX}`.length <= MAX_SUFFIXED_TITLE ? `${pageTitle}${SUFFIX}` : pageTitle;

type JsonLdNode = Record<string, unknown> & { '@type'?: string | string[] };

const isType = (node: JsonLdNode, type: string): boolean =>
  Array.isArray(node['@type']) ? node['@type'].includes(type) : node['@type'] === type;

/** Built files of one profile's directory under dist/controls, by extension. */
function builtIn(slug: string, ext: '.html' | '.md'): string[] {
  const dir = join('dist', 'controls', slug);
  if (!existsSync(dir)) return [];
  return readdirSync(dir)
    .filter((name) => name.endsWith(ext))
    .map((name) => name.slice(0, -ext.length))
    .sort();
}

test('control pages are switched on and the registry has specified controls', () => {
  expect(CONTROL_PAGES_ENABLED).toBe(true);
  expect(specified.length).toBeGreaterThan(0);
  for (const c of specified) expect(controlPagePath(c), c.id).toBe(pathOf(c));
  for (const c of others) expect(controlPagePath(c), c.id).toBeNull();
});

test('dist has one page and one twin per specified control, and none for derived or outline controls', () => {
  for (const profile of profiles) {
    const want = controlsIn(profile.slug)
      .filter((c) => c.depth === 'specified')
      .map(controlSlug)
      .sort();
    expect(builtIn(profile.slug, '.html'), `${profile.slug} pages`).toEqual(want);
    expect(builtIn(profile.slug, '.md'), `${profile.slug} twins`).toEqual(want);
  }
});

test('titles and descriptions are unique and within their limits', () => {
  const titles = specified.map((c) => documentTitle(c.pageTitle ?? ''));
  const descriptions = specified.map((c) => c.pageDescription ?? '');
  for (const [i, c] of specified.entries()) {
    expect(c.pageTitle, c.id).toBeTruthy();
    expect(c.pageTitle!.length, c.id).toBeLessThanOrEqual(MAX_TITLE);
    expect(titles[i].length, c.id).toBeLessThanOrEqual(MAX_TITLE);
    expect(descriptions[i].length, c.id).toBeGreaterThanOrEqual(70);
    expect(descriptions[i].length, c.id).toBeLessThanOrEqual(160);
  }
  expect(new Set(titles.map((t) => t.toLowerCase())).size).toBe(titles.length);
  expect(new Set(descriptions.map((d) => d.toLowerCase())).size).toBe(descriptions.length);
});

test('the sitemap and llms.txt list every control page, and llms.txt its twin', () => {
  const sitemaps = readdirSync('dist')
    .filter((name) => /^sitemap-\d+\.xml$/.test(name))
    .map((name) => readFileSync(join('dist', name), 'utf8'))
    .join('\n');
  const llms = readFileSync(join('dist', 'llms.txt'), 'utf8');
  for (const c of specified) {
    const path = pathOf(c);
    expect(sitemaps, c.id).toContain(`<loc>${ORIGIN}${path}</loc>`);
    expect(llms, c.id).toContain(`${ORIGIN}${path})`);
    expect(llms, c.id).toContain(`${ORIGIN}${path}.md`);
  }
  for (const c of others) expect(sitemaps, c.id).not.toContain(`${ORIGIN}${pathOf(c)}<`);
});

test('_headers makes each control twin canonical to its page (Cloudflare splat semantics)', () => {
  // Cloudflare Pages `_headers`: `*` matches greedily, `/` included, and the
  // rule's `:splat` stands for what it matched; every matching rule applies,
  // and `! <header>` detaches what the broader rules set for that header.
  const text = readFileSync(join('dist', '_headers'), 'utf8').replace(/\r/g, '');
  const rules: { pattern: string; headers: string[] }[] = [];
  for (const line of text.split('\n')) {
    if (line.startsWith('/')) rules.push({ pattern: line.trim(), headers: [] });
    else if (/^\s+\S/.test(line) && rules.length > 0) rules[rules.length - 1].headers.push(line.trim());
  }
  const escape = (s: string) => s.replace(/[.+?^${}()|[\]\\]/g, '\\$&');
  for (const c of specified) {
    const twin = `${pathOf(c)}.md`;
    const links: string[] = [];
    for (const rule of rules) {
      const match = new RegExp(`^${escape(rule.pattern).replace(/\*/g, '(.*)').replace(/:[a-z]+/g, '([^/]+)')}$`).exec(twin);
      if (!match) continue;
      for (const header of rule.headers) {
        // `! Link` detaches the Link values of the broader rules (the font preloads).
        if (header === '! Link') links.length = 0;
        else if (header.startsWith('Link:')) links.push(header.slice('Link:'.length).trim().replace(':splat', match[1] ?? ''));
      }
    }
    expect(links, twin).toEqual([`<${ORIGIN}${pathOf(c)}>; rel="canonical"`]);
  }
});

for (const profile of profiles) {
  test(`${profilePath(profile)} links each of its control pages from <main>, and no other`, async ({ page }) => {
    await page.goto(profilePath(profile));
    for (const c of controlsIn(profile.slug)) {
      const links = page.locator(`main a[href="${pathOf(c)}"]`);
      if (c.depth === 'specified') await expect(links.first(), c.id).toHaveCount(1);
      else await expect(links, c.id).toHaveCount(0);
    }
  });
}

for (const c of specified) {
  const path = pathOf(c);
  const profile = profiles.find((p) => p.slug === c.profile)!;

  test.describe(path, () => {
    test('head: self canonical, its own title and description, one TechArticle part of the profile, the twin announced', async ({ page }) => {
      const res = await page.goto(path);
      expect(res?.status()).toBe(200);

      await expect(page).toHaveTitle(documentTitle(c.pageTitle!));
      await expect(page.locator('head > link[rel="canonical"]')).toHaveAttribute('href', `${ORIGIN}${path}`);
      await expect(page.locator('meta[name="description"]')).toHaveAttribute('content', c.pageDescription!);
      await expect(page.locator('link[rel="alternate"][type="text/markdown"]')).toHaveAttribute('href', `${path}.md`);

      const scripts = page.locator('script[type="application/ld+json"]');
      await expect(scripts).toHaveCount(1);
      const data = JSON.parse((await scripts.first().textContent()) ?? '{}');
      const graph = (data['@graph'] ?? [data]) as JsonLdNode[];
      const articles = graph.filter((n) => isType(n, 'TechArticle'));
      expect(articles).toHaveLength(1);
      const article = articles[0];
      expect(article.isPartOf).toEqual({ '@id': profileArticleId(profile) });
      expect(article.url).toBe(`${ORIGIN}${path}`);
      expect(article.headline).toBe(c.pageTitle);
      expect(article.version).toBe(profile.version);
      expect(article.creativeWorkStatus).toBe(statusLabels[profile.status]);
      expect(article.datePublished).toBe(profile.published);
      expect(article.dateModified).toBe(profile.updated);
    });

    test('body: the control title as H1, the record, both examples, the review call, JSON and twin links', async ({ page }) => {
      await page.goto(path);
      await expect(page.locator('h1')).toHaveCount(1);
      await expect(page.locator('h1')).toHaveText(c.title);

      const main = page.locator('main');
      await expect(main.locator(`a[href="${profilePath(profile)}"]`).first()).toHaveCount(1);
      await expect(main.locator('h2#record')).toHaveCount(1);
      await expect(main.locator('h2#examples')).toHaveCount(1);
      await expect(main.locator(`a[href="/api/v1/controls/${controlSlug(c)}.json"]`).first()).toHaveCount(1);
      await expect(main.locator(`a[href="${path}.md"]`)).toHaveCount(1);
      await expect(main.locator('a[href*="template=control-review.yml"]').first()).toHaveCount(1);

      const examples = observationExamples.filter((e) => e.controlId === c.id);
      expect(examples.map((e) => e.status).sort()).toEqual(['fail', 'pass']);
      for (const e of examples) {
        const link = main.locator(`a[href="${e.path}"][download]`);
        await expect(link, e.path).toHaveCount(1);
        await expect(link).toHaveAttribute('data-umami-event', 'control-download');
        expect(existsSync(join('dist', e.path)), e.path).toBe(true);
        await expect(main.locator(`section.cx[data-status="${e.status}"]`)).toHaveCount(1);
      }

      const text = (await main.textContent()) ?? '';
      expect(text).toContain('not a claim of conformity');
      expect(text).toContain('Open for technical review');
      expect(text.toLowerCase()).not.toContain('certified');
      expect(text.toLowerCase()).not.toContain('compliant');
      expect(await page.content()).not.toContain(EM_DASH);
    });

    test('Markdown twin: canonical front matter, the record and both examples', () => {
      const file = join('dist', `${path}.md`);
      expect(existsSync(file)).toBe(true);
      const md = readFileSync(file, 'utf8');
      expect(md).toContain(`canonical: ${ORIGIN}${path}\n`);
      expect(md).toContain(`\n# ${c.title}\n`);
      expect(md).toContain('## The control record');
      for (const e of observationExamples.filter((x) => x.controlId === c.id)) expect(md).toContain(`${ORIGIN}${e.path}`);
      expect(md).not.toContain(EM_DASH);
    });
  });
}
