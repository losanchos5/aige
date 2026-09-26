// contribute.spec.ts: the /contribute page (OpenSpec change
// open-reference-project, block orp-contribute). The page keeps the title,
// description and anchors the shell fixed, carries one CollectionPage JSON-LD,
// lists ten contribution paths whose links are issue forms that exist in
// .github/ISSUE_TEMPLATE/, the contributing guide or the issue chooser, and
// links the review model and the surfaces open for review. The six issue forms
// of the change pass a minimal structural check and carry no em dash. The head
// and the forms are read from disk (dist and the repo); the body from the
// served page.
import { test, expect } from '@playwright/test';
import { existsSync, readFileSync } from 'node:fs';
import { join } from 'node:path';

const GITHUB = 'https://github.com/losanchos5/aige';
const TEMPLATES = join('..', '.github', 'ISSUE_TEMPLATE');
const NEW_FORMS = [
  'control-review.yml',
  'failure-mode-proposal.yml',
  'implementation-example.yml',
  'framework-mapping.yml',
  'technical-correction.yml',
  'research-review.yml',
];
const BODY_TYPES = new Set(['markdown', 'input', 'textarea', 'dropdown', 'checkboxes']);
const ISSUE_FORM = /\/issues\/new\?template=([a-z-]+\.yml)$/;
const EM_DASH = '—';

const built = () => readFileSync(join('dist', 'contribute.html'), 'utf8');

/** Every node of every ld+json block, flattening arrays and @graph. */
function jsonLdNodes(html: string): Record<string, unknown>[] {
  const blocks = [...html.matchAll(/<script type="application\/ld\+json"[^>]*>([\s\S]*?)<\/script>/g)];
  return blocks.flatMap(([, raw]) => {
    const data = JSON.parse(raw);
    const top = Array.isArray(data) ? data : [data];
    return top.flatMap((node) => (Array.isArray(node['@graph']) ? node['@graph'] : [node]));
  });
}

test.describe('/contribute head', () => {
  test('keeps the fixed title and a description within 70 to 160 characters', () => {
    const html = built();
    expect(html).toContain('<title>Contribute to open AI controls · AI Governance Engineer</title>');
    const description = html.match(/<meta name="description" content="([^"]*)"/)?.[1] ?? '';
    expect(description.length).toBeGreaterThanOrEqual(70);
    expect(description.length).toBeLessThanOrEqual(160);
  });

  test('has one ld+json block with a CollectionPage of the ten paths', () => {
    const html = built();
    expect(html.match(/<script type="application\/ld\+json"/g) ?? []).toHaveLength(1);
    const page = jsonLdNodes(html).find((node) => node['@type'] === 'CollectionPage') as
      | { mainEntity?: { itemListElement?: unknown[] } }
      | undefined;
    expect(page).toBeDefined();
    expect(page?.mainEntity?.itemListElement ?? []).toHaveLength(10);
  });

  test('is no longer the stub and has no em dash', () => {
    const html = built();
    expect(html).not.toContain('orp-stub');
    expect(html).not.toContain(EM_DASH);
  });
});

test.describe('/contribute body', () => {
  test('lists ten paths, each an existing issue form, the contributing guide or the issue chooser', async ({
    page,
  }) => {
    await page.goto('/contribute');
    const links = page.locator('#paths ol.register > li a');
    await expect(links).toHaveCount(10);
    const hrefs = await links.evaluateAll((els) => els.map((el) => el.getAttribute('href') ?? ''));
    for (const href of hrefs) {
      const ok =
        ISSUE_FORM.test(href) ||
        href === `${GITHUB}/blob/main/CONTRIBUTING.md` ||
        href === `${GITHUB}/issues/new/choose`;
      expect(ok, href).toBe(true);
      const file = href.match(ISSUE_FORM)?.[1];
      if (file) expect(existsSync(join(TEMPLATES, file)), `${file} exists`).toBe(true);
    }
    // The six forms of the change are all offered.
    for (const file of NEW_FORMS) expect(hrefs).toContain(`${GITHUB}/issues/new?template=${file}`);
  });

  test('has the good-review and provenance sections and links the review model', async ({ page }) => {
    await page.goto('/contribute');
    await expect(page.locator('h1')).toHaveText('Help improve the engineering model');
    await expect(page.locator('#good-review h2')).toHaveText('What a good control review contains');
    await expect(page.locator('#good-review ol.register > li')).toHaveCount(6);
    await expect(page.locator('#provenance nav.prov')).toHaveCount(1);
    const main = page.locator('main');
    for (const href of ['/about/methodology', '/controls', '/research', '/cases', '/about/changelog']) {
      await expect(main.locator(`a[href="${href}"]`).first(), href).toBeAttached();
    }
    await expect(main.locator('a[href="/ai-governance"]')).toHaveCount(1);
    await expect(page.locator('a[href="/controls/evaluation-environment"]').first()).toBeAttached();
  });

  test('each issue-form path carries the contribute Umami event', async ({ page }) => {
    await page.goto('/contribute');
    const forms = page.locator('#paths ol.register > li a[href*="/issues/new?template="]');
    await expect(forms).toHaveCount(9);
    const attrs = await forms.evaluateAll((els) =>
      els.map((el) => ({
        event: el.getAttribute('data-umami-event'),
        kind: el.getAttribute('data-umami-event-kind') ?? '',
      })),
    );
    for (const { event, kind } of attrs) {
      expect(event).toBe('contribute');
      expect(kind.length).toBeGreaterThan(0);
      expect(kind.length).toBeLessThanOrEqual(50);
    }
  });
});

test.describe('issue forms of the change', () => {
  for (const file of NEW_FORMS) {
    test(`${file} is a well-formed issue form with no em dash`, () => {
      const text = readFileSync(join(TEMPLATES, file), 'utf8').replace(/\r/g, '');
      expect(text).toMatch(/^name: \S/m);
      expect(text).toMatch(/^body:\s*$/m);
      const types = [...text.matchAll(/^\s*- type: *(\S+)/gm)].map((m) => m[1]);
      expect(types.length).toBeGreaterThan(0);
      for (const type of types) expect(BODY_TYPES.has(type), type).toBe(true);
      expect(text).toMatch(/^\s*required: true\s*$/m);
      expect(text).not.toContain(EM_DASH);
    });
  }
});
