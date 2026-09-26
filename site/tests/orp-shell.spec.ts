// orp-shell.spec.ts: the shell of the open reference project (OpenSpec change
// open-reference-project, block orp-shell). The /incidents redirects and the
// Markdown-twin header rules of the new sections ship in dist, the new routes
// have their Open Graph cards, /llms.txt lists every new route, the navigation
// model carries each new destination in its group without a new group, and
// every new route answers 200 with a visible h1. It does not check the page
// bodies: the blocks of wave 1 replace the stubs.
import { test, expect } from '@playwright/test';
import { readFileSync } from 'node:fs';
import { join } from 'node:path';
import { nav } from '../src/data/nav';
import { researchPath, researchProblems, writtenThemes } from '../src/data/research';

const ORIGIN = 'https://aigovernanceengineer.com';

const NEW_ROUTES = [
  '/controls',
  '/controls/evaluation-environment',
  '/controls/agent-runtime',
  '/frontier',
  '/research',
  ...writtenThemes().map(researchPath),
  '/contribute',
];

/** Big-endian PNG width from the IHDR chunk (bytes 16..20). */
function pngWidth(buf: Buffer): number {
  expect(buf.subarray(0, 8).toString('hex')).toBe('89504e470d0a1a0a');
  return buf.readUInt32BE(16);
}

const hrefsOf = (id: string) => nav.find((g) => g.id === id)!.items.map((i) => i.href);

test.describe('host rules in dist', () => {
  test('_redirects sends /incidents and everything under it to /cases', () => {
    const text = readFileSync(join('dist', '_redirects'), 'utf8').replace(/\r/g, '');
    expect(text).toMatch(/^\/incidents\s+\/cases\s+301$/m);
    expect(text).toMatch(/^\/incidents\/\*\s+\/cases\/:splat\s+301$/m);
  });

  test('_headers makes the /controls and /research Markdown twins canonical to their pages', () => {
    const text = readFileSync(join('dist', '_headers'), 'utf8').replace(/\r/g, '');
    for (const section of ['controls', 'research']) {
      const rule = new RegExp(
        `^/${section}/\\*\\.md\\n  ! Link\\n  Link: <${ORIGIN}/${section}/:splat>; rel="canonical"$`,
        'm',
      );
      expect(text, section).toMatch(rule);
    }
  });
});

test.describe('Open Graph cards', () => {
  for (const slug of ['controls', 'frontier', 'research', 'contribute']) {
    test(`/og/${slug}.png is a 1200px-wide PNG`, async ({ request }) => {
      const res = await request.get(`/og/${slug}.png`);
      expect(res.status()).toBe(200);
      expect(res.headers()['content-type']).toContain('image/png');
      expect(pngWidth(await res.body())).toBe(1200);
    });
  }
});

test('/llms.txt lists every new route', async ({ request }) => {
  const text = await (await request.get('/llms.txt')).text();
  expect(text).toContain('## Controls and research');
  expect(text).toContain('## Incidents, harms and threats');
  for (const path of NEW_ROUTES) expect(text, path).toContain(`](${ORIGIN}${path})`);
});

test.describe('navigation model', () => {
  test('each new destination sits in its group, and no group is added', () => {
    expect(nav.map((g) => g.id)).toEqual(['thesis', 'bok', 'practice', 'for-you', 'reference', 'map', 'about']);
    expect(hrefsOf('practice')).toContain('/controls');
    expect(hrefsOf('for-you')).toContain('/frontier');
    expect(hrefsOf('reference')).toContain('/research');
    expect(hrefsOf('about')).toContain('/contribute');
    const reference = nav.find((g) => g.id === 'reference')!;
    expect(reference.items.find((i) => i.href === '/cases')?.label).toBe('Incidents');
    expect(reference.items.some((i) => i.label === 'Cases')).toBe(false);
  });

  test('the research register is sound and has exactly one written note', () => {
    expect(researchProblems()).toEqual([]);
    expect(writtenThemes().map((t) => t.slug)).toEqual(['the-evaluation-environment-is-part-of-the-system']);
  });
});

test.describe('new routes', () => {
  for (const path of NEW_ROUTES) {
    test(`${path} answers 200 with a visible h1`, async ({ page }) => {
      const res = await page.goto(path);
      expect(res?.status()).toBe(200);
      await expect(page.locator('h1')).toHaveCount(1);
      await expect(page.locator('h1')).toBeVisible();
    });
  }

  test('/cases carries the from-incident-to-control section', async ({ page }) => {
    await page.goto('/cases');
    await expect(page.locator('#from-incident-to-control h2')).toBeVisible();
  });
});
