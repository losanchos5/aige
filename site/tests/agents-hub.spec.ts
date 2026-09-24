// agents-hub.spec.ts: acceptance checks for chapter 23 (Governing AI agents)
// and the /agents hub (OpenSpec change bok-ch23-governing-agents). Request and
// DOM checks only; no screenshots.
import { test, expect } from '@playwright/test';

const CHAPTER = '/bok/governing-agents';

// The chapter's H2 anchors the hub, the handoff and other chapters link to.
// Renaming one of these headings breaks published links.
const CHAPTER_ANCHORS = [
  'what-makes-an-agent-a-governance-object',
  'the-agent-registry',
  'identity-and-short-lived-credentials',
  'tool-and-mcp-server-permissions',
  'human-checkpoints-and-approval-design',
  'runtime-guardrails-for-tool-calls',
  'kill-switch-and-per-agent-circuit-breakers',
  'memory-and-context-governance',
  'multi-agent-systems-and-delegation-chains',
  'prompts-as-configuration-under-change-control',
  'agent-incidents-and-telemetry',
  'threats-mapped-to-controls',
  'frameworks-written-for-agents',
  'eu-ai-act-hooks-for-agents',
  'what-you-can-do-this-week',
  'sources',
];

test.describe('chapter 23: Governing AI agents', () => {
  test('keeps its H1 and every stable H2 anchor', async ({ page }) => {
    await page.goto(CHAPTER);
    await expect(page.locator('h1')).toHaveText(/Governing AI agents/);
    for (const id of CHAPTER_ANCHORS) {
      await expect(page.locator(`h2#${id}`), `missing #${id}`).toHaveCount(1);
    }
  });

  test('renders its callouts and a numbered source for every citation', async ({ page }) => {
    await page.goto(CHAPTER);
    const prose = page.locator('.prose').first();
    await expect(prose.locator('aside.callout[data-kind="practice"]')).toHaveCount(3);
    await expect(prose.locator('p.maps-to')).toHaveCount(1);

    const sources = await page.locator('ol.sources > li[id^="src-"]').count();
    expect(sources).toBeGreaterThanOrEqual(20);
    const cited = await page
      .locator('a.cite')
      .evaluateAll((links) => [...new Set(links.map((a) => a.getAttribute('href')))]);
    for (const href of cited) {
      await expect(page.locator(`li${href}`), `${href} has no source`).toHaveCount(1);
    }
  });

  test('the threat table covers ASI01 to ASI10 and links existing patterns', async ({ page }) => {
    await page.goto(CHAPTER);
    const table = page.locator('table', { hasText: 'ASI10' }).filter({ hasText: 'AML.T0103' });
    for (let n = 1; n <= 10; n++) {
      await expect(table).toContainText(`ASI${String(n).padStart(2, '0')}`);
    }
    // Chapter prose links a pattern's own page (/patterns/<slug>); the catalogue
    // anchors (/bok/patterns#pattern-…) stay valid, so either form counts.
    const hrefs = await table
      .locator('a[href^="/patterns/"], a[href^="/bok/patterns#pattern-"]')
      .evaluateAll((links) => links.map((a) => a.getAttribute('href')));
    expect(hrefs.length).toBeGreaterThanOrEqual(10);
  });
});

test.describe('/agents hub', () => {
  test('has one H1, a snippet-sized description and links to chapter 23', async ({ page }) => {
    const res = await page.goto('/agents');
    expect(res?.status()).toBe(200);
    await expect(page.locator('h1')).toHaveCount(1);

    const description = await page.locator('meta[name="description"]').getAttribute('content');
    expect(description?.length ?? 0).toBeGreaterThanOrEqual(50);
    expect(description?.length ?? 0).toBeLessThanOrEqual(160);

    await expect(page.locator(`a[href="${CHAPTER}"]`).first()).toBeVisible();
  });

  test('lists the ten control-plane components, each linked to its chapter section', async ({
    page,
  }) => {
    await page.goto('/agents');
    const items = page.locator('#control-plane ol.register > li');
    await expect(items).toHaveCount(10);
    const hrefs = await items
      .locator('a')
      .evaluateAll((links) => links.map((a) => a.getAttribute('href') ?? ''));
    for (const href of hrefs) {
      expect(href.startsWith(`${CHAPTER}#`), href).toBe(true);
    }
  });

  test('shows the six agent patterns and the ten agentic threats', async ({ page }) => {
    await page.goto('/agents');
    await expect(page.locator('#patterns [data-resource-card]')).toHaveCount(6);

    const rows = page.locator('#threats tbody tr');
    await expect(rows).toHaveCount(10);
    await expect(rows.first()).toContainText('ASI01');
    await expect(rows.last()).toContainText('ASI10');
    for (let i = 0; i < 10; i++) {
      await expect(rows.nth(i).locator('a[href^="/bok/patterns#pattern-"]')).toHaveCount(1);
    }
    await expect(page.locator('#threats')).toContainText('not a claim of conformity');
  });

  test('reads the tool categories from the stack data and links the tools page', async ({
    page,
  }) => {
    await page.goto('/agents');
    await expect(page.locator('#tools tbody tr')).toHaveCount(6);
    await expect(page.locator('#tools a[href="/resources/tools"]')).toHaveCount(1);
  });
});
