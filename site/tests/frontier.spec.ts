// frontier.spec.ts: the /frontier audience route (OpenSpec change
// open-reference-project, block orp-frontier). The data module is clean, the
// page renders its sections in the agreed order, the seven-step chain lays out
// as a row on a wide screen and as a column on a phone without horizontal
// scroll, every citation chip has its source row, no lab is named outside the
// source list, the key cross-links are present, and the head carries the final
// title, a description in range and one ld+json block with an audience.
import { test, expect } from '@playwright/test';
import { frontierProblems, frontierSources } from '../src/data/frontier';

const SECTION_ORDER = [
  'who',
  'evaluation-environments',
  'runtime-safeguards',
  'assurance',
  'incidents',
  'ecosystem',
  'stack-map',
  'open-questions',
  'sources',
];

const KEY_LINKS = [
  '/controls/evaluation-environment',
  '/controls/agent-runtime',
  '/bok/governing-agents#kill-switch-and-per-agent-circuit-breakers',
  '/resources/threats',
  '/cases#from-incident-to-control',
];

const LAB_NAMES = /\b(OpenAI|Anthropic|DeepMind|Google|Meta|xAI)\b/;

test.describe('frontier data', () => {
  test('frontierProblems() is empty', () => {
    expect(frontierProblems()).toEqual([]);
  });
});

test.describe('/frontier page', () => {
  test('renders the hero and its sections in order', async ({ page }) => {
    const response = await page.goto('/frontier');
    expect(response?.status()).toBe(200);
    await expect(page.locator('h1')).toHaveText('Engineering assurance for frontier AI');
    const ids = await page
      .locator('main section[id]')
      .evaluateAll((sections) => sections.map((s) => s.id));
    expect(ids.filter((id) => SECTION_ORDER.includes(id))).toEqual(SECTION_ORDER);
  });

  test('the chain has seven steps in a labelled list', async ({ page }) => {
    await page.goto('/frontier');
    await expect(page.locator('#frontier-chain .flow-step')).toHaveCount(7);
    await expect(page.locator('#frontier-chain ol[aria-label]')).toHaveCount(1);
  });

  test('the chain is a row at 1440px', async ({ page }) => {
    await page.setViewportSize({ width: 1440, height: 900 });
    await page.goto('/frontier');
    const tops = await page
      .locator('#frontier-chain .flow-node')
      .evaluateAll((nodes) => nodes.map((n) => Math.round(n.getBoundingClientRect().top)));
    expect(tops).toHaveLength(7);
    for (const top of tops) expect(Math.abs(top - tops[0])).toBeLessThanOrEqual(1);
  });

  test('the chain is a column at 390px with no horizontal scroll', async ({ page }) => {
    await page.setViewportSize({ width: 390, height: 844 });
    await page.goto('/frontier');
    const boxes = await page
      .locator('#frontier-chain .flow-node')
      .evaluateAll((nodes) =>
        nodes.map((n) => {
          const r = n.getBoundingClientRect();
          return { top: r.top, bottom: r.bottom };
        }),
      );
    expect(boxes).toHaveLength(7);
    for (let i = 1; i < boxes.length; i++) {
      expect(boxes[i].top, `step ${i + 1}`).toBeGreaterThan(boxes[i - 1].bottom);
    }
    const overflow = await page.evaluate(
      () => document.documentElement.scrollWidth - document.documentElement.clientWidth,
    );
    expect(overflow).toBeLessThanOrEqual(0);
  });

  test('every citation chip has its source row, and every source is listed', async ({ page }) => {
    await page.goto('/frontier');
    const cited = await page
      .locator('main a.cite')
      .evaluateAll((links) => [...new Set(links.map((l) => l.getAttribute('href')))]);
    expect(cited.length).toBeGreaterThan(0);
    for (const href of cited) {
      await expect(page.locator(`#sources li${href}`), `${href} has no source`).toHaveCount(1);
    }
    await expect(page.locator('#sources ol.sources > li')).toHaveCount(frontierSources.length);
  });

  test('no em dash, and no lab named outside the source list', async ({ page }) => {
    await page.goto('/frontier');
    expect(await page.content()).not.toContain('\u2014');
    const text = await page.locator('main').evaluate((main) => {
      const copy = main.cloneNode(true) as HTMLElement;
      copy.querySelectorAll('ol.sources').forEach((list) => list.remove());
      return copy.textContent ?? '';
    });
    expect(text).not.toMatch(LAB_NAMES);
  });

  test('links to the controls, chapter 23, threats and the incident method', async ({ page }) => {
    await page.goto('/frontier');
    for (const href of KEY_LINKS) {
      await expect(page.locator(`main a[href="${href}"]`).first(), href).toBeVisible();
    }
  });

  test('head: title, description and one ld+json with an audience', async ({ page }) => {
    await page.goto('/frontier');
    await expect(page).toHaveTitle('Frontier AI evaluation assurance · AI Governance Engineer');
    const description = await page.locator('meta[name="description"]').getAttribute('content');
    expect(description?.length ?? 0).toBeGreaterThanOrEqual(70);
    expect(description?.length ?? 0).toBeLessThanOrEqual(160);
    const blocks = page.locator('script[type="application/ld+json"]');
    await expect(blocks).toHaveCount(1);
    const json = (await blocks.textContent()) ?? '';
    expect(json).toContain('"audience"');
    expect(json).toContain('"Audience"');
  });

  test('/for lists the frontier route', async ({ page }) => {
    await page.goto('/for');
    await expect(page.locator('#elsewhere a[href="/frontier"]')).toHaveCount(1);
  });
});
