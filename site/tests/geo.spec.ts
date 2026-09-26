// geo.spec.ts: the surfaces AI search engines and agents read, beyond the HTML
// (seo-integral, GEO block): the Markdown alternate of every content page, the
// /llms.txt coverage of the sitemap, the /llms-full slices, the MCP server card
// and the AI crawler groups of robots.txt. Request-only, plus reads of dist
// (what the preview server serves) and of the MCP server's source.
import { test, expect } from '@playwright/test';
import { existsSync, readFileSync } from 'node:fs';
import { join } from 'node:path';
import { chaptersOrdered } from '../src/data/chapters';
import { patterns } from '../src/data/patterns';
import { cases } from '../src/data/cases';
import { obligations, obligationPath } from '../src/data/frameworks';
import { getGlossary } from '../src/lib/glossary';
import { researchPath, writtenThemes } from '../src/data/research';
import { profiles, profilePath } from '../src/data/controls';

const ORIGIN = 'https://aigovernanceengineer.com';

// ---- Markdown alternates ------------------------------------------------------

const MARKDOWN_PAGES = [
  ...chaptersOrdered.map((c) => `/bok/${c.slug}`),
  ...patterns.map((p) => `/patterns/${p.slug}`),
  ...getGlossary().map((e) => e.url),
  ...cases.map((c) => `/cases/${c.id}`),
  ...profiles.map((p) => profilePath(p)),
  '/thesis',
  ...writtenThemes().map((t) => researchPath(t)),
];

test.describe('Markdown alternates', () => {
  test(`all ${MARKDOWN_PAGES.length} content pages have a .md twin in dist`, () => {
    const missing = MARKDOWN_PAGES.filter((path) => !existsSync(join('dist', `${path}.md`)));
    expect(missing).toEqual([]);
  });

  for (const path of ['/bok/definition', '/patterns/policy-card', getGlossary()[0].url, `/cases/${cases[0].id}`, '/thesis']) {
    test(`${path}.md is Markdown with the provenance header, and ${path} links it`, async ({ request, page }) => {
      const res = await request.get(`${path}.md`);
      expect(res.status()).toBe(200);
      expect(res.headers()['content-type']).toContain('text/markdown');
      const text = await res.text();
      expect(text.startsWith('---\ntitle: ')).toBe(true);
      expect(text).toContain(`\ncanonical: ${ORIGIN}${path}\n`);
      expect(text).toContain('\nauthor: "Jorge García Aibar"\n');
      expect(text).toContain('\nlicense: "CC BY 4.0 (https://creativecommons.org/licenses/by/4.0/)"\n');
      expect(text).toMatch(/\ndoi: https:\/\/doi\.org\/10\.5281\/zenodo\.\d+\n/);
      expect(text).toMatch(/\nupdated: \d{4}-\d{2}-\d{2}\n---\n\n# \S/);
      // Clean Markdown, not a rendered page.
      expect(text).not.toContain('<html');
      expect(text).not.toContain('\u2014');

      await page.goto(path);
      const link = page.locator('head link[rel="alternate"][type="text/markdown"]');
      await expect(link).toHaveCount(1);
      await expect(link).toHaveAttribute('href', `${path}.md`);
    });
  }

  test('pages without a Markdown source do not advertise one', async ({ page }) => {
    for (const path of ['/', '/about', '/obligations', '/es/thesis']) {
      await page.goto(path);
      await expect(page.locator('head link[type="text/markdown"]'), path).toHaveCount(0);
    }
  });

  test('every page declares the CC BY 4.0 licence in its head', async ({ page }) => {
    await page.goto('/bok/definition');
    await expect(page.locator('head link[rel="license"]')).toHaveAttribute(
      'href',
      'https://creativecommons.org/licenses/by/4.0/',
    );
  });

  test('a case keeps its sections and numbered sources in Markdown', async ({ request }) => {
    const entry = cases[0];
    const text = await (await request.get(`/cases/${entry.id}.md`)).text();
    for (const heading of [
      '## What happened',
      '## Failure mode',
      '## Which control would have caught it',
      '## The evidence that would have existed',
      '## Obligations it touches today',
      '## Sources',
    ]) {
      expect(text).toContain(`\n${heading}\n`);
    }
    expect(text).toContain(`[${entry.sources.length}] `);
    expect(text).toContain(entry.sources[0].url);
  });

  test('the sitemap lists no .md alternate', async ({ request }) => {
    const xml = await (await request.get('/sitemap-0.xml')).text();
    expect(xml).not.toMatch(/\.md<\/loc>/);
  });
});

// ---- llms.txt coverage ----------------------------------------------------------

// The translated trees (/es, /fr, /de, /pt) are not indexed in llms.txt; the
// hand-translated Spanish Thesis is, and is not excluded here.
const TRANSLATED = /^\/(es|fr|de|pt)(\/|$)/;
const LISTED_TRANSLATIONS = new Set(['/es/thesis']);

/** Clean pathname of an absolute site URL. */
function pathOf(href: string): string {
  const path = new URL(href).pathname;
  return path.length > 1 ? path.replace(/\/$/, '') : path;
}

test.describe('llms.txt covers the sitemap', () => {
  test('every sitemap URL appears in /llms.txt', async ({ request }) => {
    const xml = await (await request.get('/sitemap-0.xml')).text();
    const locs = [...xml.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => pathOf(m[1]));
    expect(locs.length).toBeGreaterThan(500);

    const text = await (await request.get('/llms.txt')).text();
    const escaped = ORIGIN.replace(/[.]/g, '\\.');
    const listed = new Set(
      [...text.matchAll(new RegExp(`${escaped}[^\\s)\\]]*`, 'g'))].map((m) =>
        pathOf(m[0].replace(/[.,;:]+$/, '')),
      ),
    );

    const missing = locs.filter(
      (path) => !listed.has(path) && (!TRANSLATED.test(path) || LISTED_TRANSLATIONS.has(path)),
    );
    expect(missing).toEqual([]);
  });

  test('the pillar page, when it exists, is the first link', async ({ request }) => {
    const xml = await (await request.get('/sitemap-0.xml')).text();
    const text = await (await request.get('/llms.txt')).text();
    const first = /^- \[[^\]]+\]\(([^)]+)\)/m.exec(text)?.[1];
    if (xml.includes(`<loc>${ORIGIN}/ai-governance</loc>`)) {
      expect(first).toBe(`${ORIGIN}/ai-governance`);
    } else {
      expect(first).toBe(`${ORIGIN}/bok/definition`);
    }
  });

  test('content lines point to their Markdown alternates', async ({ request }) => {
    const text = await (await request.get('/llms.txt')).text();
    for (const path of ['/bok/definition', '/patterns/policy-card', `/cases/${cases[0].id}`, '/thesis']) {
      expect(text, path).toContain(`(${ORIGIN}${path}): `);
      expect(text, path).toContain(`Markdown: ${ORIGIN}${path}.md`);
    }
  });

  test('every glossary term and obligation line carries a one-line description', async ({ request }) => {
    const text = await (await request.get('/llms.txt')).text();
    const optional = text.slice(text.indexOf('## Optional'));
    for (const entry of getGlossary()) {
      expect(optional, entry.term).toMatch(
        new RegExp(`\\(${ORIGIN.replace(/[.]/g, '\\.')}${entry.url}\\): \\S`),
      );
    }
    for (const row of obligations.slice(0, 20)) {
      expect(optional, row.id).toContain(`(${ORIGIN}${obligationPath(row)}): `);
    }
  });

  // GEO G9: the Marketing-layout pages pass `title={seoTitle}` and a literal
  // description, which lib/llms-routes.ts once did not read.
  test('pages on the Marketing layout are listed with their own title and description', async ({ request }) => {
    const text = await (await request.get('/llms.txt')).text();
    for (const path of ['/role', '/stack', '/path']) {
      const source = readFileSync(join('src', 'pages', `${path.slice(1)}.astro`), 'utf8');
      const title = /const seoTitle = '([^']+)'/.exec(source)?.[1];
      // A literal prop, or `description={description}` with the string in a
      // `const description = '...'`, as /role passes it (llms-routes reads both).
      const description =
        /<Marketing\b[^>]*?\bdescription="([^"]+)"/s.exec(source)?.[1] ??
        /\bconst description\s*=\s*'([^']+)'/.exec(source)?.[1];
      expect(title, `${path} seoTitle`).toBeTruthy();
      expect(description, `${path} description`).toBeTruthy();
      expect(text, path).toContain(`- [${title}](${ORIGIN}${path}): ${description}`);
    }
  });
});

// ---- llms-full slices ------------------------------------------------------------

const SLICES = ['bok', 'foundations', 'lifecycle', 'law', 'regulatory', 'obligations', 'patterns', 'glossary', 'cases'];
// About 200k tokens at four characters per token: a common context window.
const MAX_SLICE_CHARS = 800_000;

test.describe('llms-full slices', () => {
  test('each slice is listed in llms.txt with a token size and fits a common context window', async ({ request }) => {
    const index = await (await request.get('/llms.txt')).text();
    const full = await request.get('/llms-full.txt');
    expect(full.status()).toBe(200);
    const fullLength = (await full.text()).length;
    expect(index).toMatch(new RegExp(`\\(${ORIGIN.replace(/[.]/g, '\\.')}/llms-full\\.txt\\): .*about \\d+k tokens`));
    for (const id of SLICES) {
      const path = `/llms-full-${id}.txt`;
      expect(index, path).toMatch(new RegExp(`\\(${ORIGIN.replace(/[.]/g, '\\.')}${path.replace(/[.]/g, '\\.')}\\): .*about \\d+k tokens`));
      const res = await request.get(path);
      expect(res.status(), path).toBe(200);
      expect(res.headers()['content-type'], path).toContain('text/plain');
      const text = await res.text();
      expect(text.startsWith('# '), path).toBe(true);
      expect(text.length, path).toBeLessThan(Math.min(fullLength, MAX_SLICE_CHARS));
    }
  });

  test('cases, harms and obligations are in the corpus', async ({ request }) => {
    const full = await (await request.get('/llms-full.txt')).text();
    const casesSlice = await (await request.get('/llms-full-cases.txt')).text();
    // The register has had its own slice since the 2026-09-26 audit (GEO N7).
    const register = await (await request.get('/llms-full-obligations.txt')).text();
    const glossary = await (await request.get('/llms-full-glossary.txt')).text();
    for (const entry of cases) {
      expect(full, entry.id).toContain(`Source: ${ORIGIN}/cases/${entry.id}\n`);
      expect(casesSlice, entry.id).toContain(`Source: ${ORIGIN}/cases/${entry.id}\n`);
    }
    expect(full).toContain(`Source: ${ORIGIN}/resources/harms\n`);
    expect(casesSlice).toContain(`Source: ${ORIGIN}/resources/harms\n`);
    for (const row of obligations) {
      expect(register, row.id).toContain(`Source: ${ORIGIN}${obligationPath(row)}\n`);
      expect(full, row.id).toContain(`Source: ${ORIGIN}${obligationPath(row)}\n`);
    }
    for (const entry of getGlossary()) {
      expect(glossary, entry.term).toContain(`Source: ${ORIGIN}${entry.url}\n`);
    }
  });
});

// ---- MCP server card ---------------------------------------------------------------

const MCP_SRC = join('..', 'tools', 'mcp-server', 'src');

test.describe('MCP server card', () => {
  test('/.well-known/mcp.json describes the live server and its tools', async ({ request }) => {
    const res = await request.get('/.well-known/mcp.json');
    expect(res.status()).toBe(200);
    expect(res.headers()['content-type']).toContain('json');
    const card = await res.json();

    // The same card at the path SEP-1649 clients probe.
    const alt = await request.get('/.well-known/mcp/server-card.json');
    expect(alt.status()).toBe(200);
    expect(await alt.json()).toEqual(card);

    // In step with the server's own source: its version and every tool it registers.
    const index = readFileSync(join(MCP_SRC, 'tools', 'index.ts'), 'utf8');
    const names = [...(/TOOL_NAMES = \[([\s\S]*?)\]/.exec(index)?.[1] ?? '').matchAll(/'([a-z_]+)'/g)].map(
      (m) => m[1],
    );
    expect(names.length).toBeGreaterThan(0);
    expect(card.tools.map((tool: { name: string }) => tool.name)).toEqual(names);
    const server = readFileSync(join(MCP_SRC, 'server.ts'), 'utf8');
    expect(card.version).toBe(/SERVER_VERSION = '([^']+)'/.exec(server)?.[1]);

    expect(card.remotes).toEqual([{ type: 'streamable-http', url: 'https://mcp.aigovernanceengineer.com/mcp' }]);
    expect(card.documentation).toBe(`${ORIGIN}/mcp`);
    for (const tool of card.tools) expect(tool.annotations.readOnlyHint, tool.name).toBe(true);
  });

  test('/mcp and /llms.txt link the server card', async ({ request, page }) => {
    await page.goto('/mcp');
    await expect(page.locator('a[href="/.well-known/mcp.json"]')).toHaveCount(1);
    const text = await (await request.get('/llms.txt')).text();
    expect(text).toContain(`(${ORIGIN}/.well-known/mcp.json)`);
  });
});

// ---- robots.txt ---------------------------------------------------------------------

test('robots.txt names the AI search crawlers and blocks nothing', async ({ request }) => {
  const text = await (await request.get('/robots.txt')).text();
  expect(text).not.toMatch(/^Disallow:\s*\S/m);
  for (const bot of ['OAI-SearchBot', 'ChatGPT-User', 'Claude-SearchBot', 'PerplexityBot', 'Google-Extended']) {
    expect(text, bot).toContain(`User-agent: ${bot}\n`);
  }
  expect(text).toContain(`Sitemap: ${ORIGIN}/sitemap-index.xml`);
});
