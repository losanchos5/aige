// controls-pages.spec.ts: the open control profile pages (OpenSpec change
// open-reference-project, block orp-controls-pages). /controls lists every
// profile, the stack layers and how to adopt one; each /controls/<profile>
// page keeps its title, renders every control of the registry at its anchor
// (inside .prose, so the TOC lists it), carries the draft notices, one graph
// with a TechArticle and a DefinedTermSet of its controls, the JSON download
// and review links, and a Markdown twin. No page is a stub, none says it is
// certified and none carries an em dash.
import { test, expect } from '@playwright/test';
import { profiles, controlsIn, controlAnchor, profilePath } from '../src/data/controls';

const ORIGIN = 'https://aigovernanceengineer.com';
const EM_DASH = String.fromCharCode(0x2014);

const TITLES: Record<string, string> = {
  'evaluation-environment': 'AI evaluation environment controls',
  'agent-runtime': 'AI agent runtime controls',
};

type JsonLdNode = Record<string, unknown> & { '@type'?: string | string[] };

async function graphOf(page: import('@playwright/test').Page): Promise<JsonLdNode[]> {
  const scripts = page.locator('script[type="application/ld+json"]');
  await expect(scripts).toHaveCount(1);
  const data = JSON.parse((await scripts.first().textContent()) ?? '{}');
  return (data['@graph'] ?? [data]) as JsonLdNode[];
}

test('the registry has the two profiles this spec expects', () => {
  expect(profiles.map((p) => p.slug)).toEqual(['evaluation-environment', 'agent-runtime']);
  expect(controlsIn('evaluation-environment')).toHaveLength(9);
  expect(controlsIn('agent-runtime')).toHaveLength(31);
});

for (const profile of profiles) {
  const path = profilePath(profile);
  const rows = controlsIn(profile.slug);

  test.describe(path, () => {
    test('keeps its title, renders every control at its anchor and carries the draft notices', async ({ page }) => {
      await page.goto(path);
      await expect(page).toHaveTitle(new RegExp(`^${TITLES[profile.slug]}\\b`));
      await expect(page.locator('h1')).toHaveCount(1);

      const prose = page.locator('article.prose');
      for (const c of rows) {
        await expect(prose.locator(`h2#${controlAnchor(c)}`), c.id).toHaveCount(1);
      }
      for (const id of ['scope', 'how-to-read-a-control', 'mappings', 'open-questions', 'changelog', 'sources', 'machine-readable', 'review']) {
        await expect(prose.locator(`#${id}`), id).toHaveCount(1);
      }

      const text = (await page.locator('main').textContent()) ?? '';
      expect(text).toContain('Open for technical review');
      expect(text).toContain('not a claim of conformity');
      expect(text).toContain('draft control specifications');
      expect(text.toLowerCase()).not.toContain('certified');

      const html = await page.content();
      expect(html).not.toContain('orp-stub');
      expect(html).not.toContain(EM_DASH);
      expect(html).toContain('data-umami-event="control-download"');
      expect(html).toContain('template=control-review.yml');
    });

    test('one graph with a TechArticle and a DefinedTermSet of its controls', async ({ page }) => {
      await page.goto(path);
      const graph = await graphOf(page);
      const article = graph.find((n) => n['@type'] === 'TechArticle');
      expect(article?.['@id']).toBe(`${ORIGIN}${path}#article`);
      expect(article?.creativeWorkStatus).toBe('Draft');
      const set = graph.find((n) => n['@type'] === 'DefinedTermSet');
      expect(set?.['@id']).toBe(`${ORIGIN}${path}#profile`);
      const terms = (set?.hasDefinedTerm ?? []) as JsonLdNode[];
      expect(terms).toHaveLength(rows.length);
      expect(terms.map((t) => t.termCode)).toEqual(rows.map((c) => c.id));
      expect(graph.filter((n) => n['@type'] === 'BreadcrumbList')).toHaveLength(1);
    });

    test('the TOC lists every control', async ({ page }) => {
      await page.goto(path);
      const prefix = rows[0].id.toLowerCase().replace(/\d{3}$/, '');
      await expect(page.locator(`.doc-toc [data-toc-link^="${prefix}"]`)).toHaveCount(rows.length);
    });

    test('has a Markdown twin canonical to the page', async ({ page, request }) => {
      const res = await request.get(`${path}.md`);
      expect(res.status()).toBe(200);
      expect(res.headers()['content-type']).toContain('text/markdown');
      const md = await res.text();
      expect(md.startsWith('---\ntitle: ')).toBe(true);
      expect(md).toContain(`\ncanonical: ${ORIGIN}${path}\n`);
      expect(md).toContain(`\n# ${profile.title}\n`);
      for (const c of rows) expect(md).toContain(`\n## ${c.id} ${c.title}\n`);
      for (const h of ['## Scope', '## How to read a control', '## Mappings', '## Open questions', '## Changelog', '## Sources', '## Review']) {
        expect(md).toContain(`\n${h}\n`);
      }
      expect(md).not.toContain(EM_DASH);
      expect(md).not.toContain('<html');

      await page.goto(path);
      const link = page.locator('head link[rel="alternate"][type="text/markdown"]');
      await expect(link).toHaveCount(1);
      await expect(link).toHaveAttribute('href', `${path}.md`);
    });

    test('no horizontal scroll at 390px', async ({ page }) => {
      await page.setViewportSize({ width: 390, height: 844 });
      await page.goto(path);
      const overflow = await page.evaluate(() => document.documentElement.scrollWidth - window.innerWidth);
      expect(overflow).toBeLessThanOrEqual(0);
    });
  });
}

test('the evaluation environment TOC has the nine EVAL controls', async ({ page }) => {
  await page.goto('/controls/evaluation-environment');
  await expect(page.locator('[data-toc-link^="aige-ctl-eval-"]')).toHaveCount(9);
});

test.describe('/controls', () => {
  test('lists both profiles, the controls by layer and how to adopt one', async ({ page }) => {
    await page.goto('/controls');
    await expect(page).toHaveTitle(/^Open AI governance controls\b/);
    const main = page.locator('main');
    for (const profile of profiles) {
      await expect(main.locator(`#profiles a[href="${profilePath(profile)}"]`)).toHaveCount(1);
    }
    const total = profiles.reduce((n, p) => n + controlsIn(p.slug).length, 0);
    await expect(main.locator('#profiles')).toContainText(`${total} reference controls across ${profiles.length} profiles`);

    for (const id of ['intro', 'chain', 'properties', 'profiles', 'by-layer', 'ecosystem', 'adoption', 'how-to-review']) {
      await expect(main.locator(`#${id}`), id).toHaveCount(1);
    }
    await expect(main.locator('#by-layer h3[id^="layer-"]')).toHaveCount(5);
    for (let n = 1; n <= 5; n++) await expect(main.locator(`#by-layer h3#layer-${n}`)).toHaveCount(1);
    await expect(main.locator('#chain .flow-step')).toHaveCount(5);
    await expect(main.locator('#adoption a[href="/bok/maturity-model"]')).toHaveCount(1);

    const html = await page.content();
    expect(html).toContain('template=control-review.yml');
    expect(html).not.toContain('orp-stub');
    expect(html).not.toContain(EM_DASH);
    const text = (await main.textContent()) ?? '';
    expect(text).toContain('not a claim of conformity');
    expect(text.toLowerCase()).not.toContain('certified');

    const graph = await graphOf(page);
    const collection = graph.find((n) => n['@type'] === 'CollectionPage');
    expect(collection?.['@id']).toBe(`${ORIGIN}/controls#page`);
  });

  test('no horizontal scroll at 390px', async ({ page }) => {
    await page.setViewportSize({ width: 390, height: 844 });
    await page.goto('/controls');
    const overflow = await page.evaluate(() => document.documentElement.scrollWidth - window.innerWidth);
    expect(overflow).toBeLessThanOrEqual(0);
  });
});
