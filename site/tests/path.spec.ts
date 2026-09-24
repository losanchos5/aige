// path.spec.ts: Block C — the /path learning-path page. Structural counts
// (four stages, one node <li> per data node), chapter back-link resolution,
// the keyboard-driven drawer (open on Enter, focus trapped inside, Escape
// closes and restores focus), per-node progress persisted to
// localStorage['aige.path'], the stage + total meters, the two-step reset, an
// axe sweep with the drawer open, the no-JS <details> fallback, the on-demand
// cross-stage connectors (hidden until a node is engaged), and the "Builds on"
// drawer link opening its target node. Runs in the default Playwright project
// against the preview server (baseURL from config).

import { test, expect } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';
import { assertChapterLinksResolve } from './helpers/links';
import { nodes } from '../src/data/path';

const KEY = 'aige.path';

test.beforeEach(async ({ page }) => {
  await page.goto('/path');
  await page.evaluate(() => {
    try {
      localStorage.clear();
    } catch {
      /* ignore */
    }
  });
});

test('renders four stages and one node per data node', async ({ page }) => {
  await expect(page.locator('section.path-stage')).toHaveCount(4);
  await expect(page.locator('li.path-node')).toHaveCount(nodes.length);
});

test('every chapter link resolves to a real anchor', async ({ page }) => {
  await assertChapterLinksResolve(page, '/path');
});

test('keyboard: Enter opens the drawer, traps focus, Escape closes and restores', async ({
  page,
}) => {
  const firstBtn = page.locator('.pn-btn').first();
  await firstBtn.focus();
  await expect(firstBtn).toBeFocused();

  await page.keyboard.press('Enter');

  const drawer = page.locator('#path-drawer[role="dialog"]');
  await expect(drawer).toBeVisible();

  // Focus must have moved into the open dialog.
  const focusInDrawer = await page.evaluate(() => {
    const el = document.getElementById('path-drawer');
    return !!el && el.contains(document.activeElement);
  });
  expect(focusInDrawer).toBe(true);

  await page.keyboard.press('Escape');
  await expect(drawer).toBeHidden();
  await expect(firstBtn).toBeFocused();
});

test('drawer: page behind is inert while open, scrim closes, focus returns', async ({ page }) => {
  await page.setViewportSize({ width: 1440, height: 900 });
  const opener = page.locator('.pn-btn').first();
  await opener.click();

  const drawer = page.locator('#path-drawer[role="dialog"]');
  await expect(drawer).toBeVisible();

  // Same close as the crosswalk drawer: a "×" button named "Close", focused.
  const close = drawer.getByRole('button', { name: 'Close', exact: true });
  await expect(close).toBeFocused();
  await expect(close).toHaveText('×');

  // Header, footer and the map behind are inert; the drawer and scrim are not.
  const inert = await page.evaluate(() => {
    const isInert = (sel: string) => !!document.querySelector(sel)?.closest('[inert]');
    return {
      header: isInert('header.site-header'),
      footer: isInert('.site-footer'),
      map: isInert('[data-path]'),
      drawer: isInert('#path-drawer'),
      scrim: isInert('.path-scrim'),
    };
  });
  expect(inert).toEqual({ header: true, footer: true, map: true, drawer: false, scrim: false });

  // A click on the scrim (left of the panel) closes it and lifts inert.
  await page.locator('.path-scrim').click({ position: { x: 200, y: 450 } });
  await expect(drawer).toBeHidden();
  await expect(page.locator('[inert]')).toHaveCount(0);
  await expect(opener).toBeFocused();
});

test('marking a node done persists to localStorage and survives reload', async ({ page }) => {
  const firstNode = page.locator('li.path-node').first();
  const nodeId = await firstNode.getAttribute('data-node');
  expect(nodeId).toBeTruthy();

  await firstNode.locator('.pn-btn').click();
  const drawer = page.locator('#path-drawer[role="dialog"]');
  await expect(drawer).toBeVisible();

  await drawer.locator('[data-path-state="done"]').click();
  await expect(firstNode).toHaveAttribute('data-state', 'done');

  const stored = await page.evaluate((k) => localStorage.getItem(k), KEY);
  expect(stored).toBeTruthy();
  expect(JSON.parse(stored as string)[nodeId as string]).toBe('done');

  await page.reload();
  await expect(page.locator(`li[data-node="${nodeId}"]`)).toHaveAttribute('data-state', 'done');
});

test('stage and total meters advance when a node is marked done', async ({ page }) => {
  const firstNode = page.locator('li.path-node').first();
  const stageId = await firstNode.evaluate((el) =>
    el.closest('.path-stage')?.getAttribute('data-stage'),
  );
  expect(stageId).toBeTruthy();

  const total = page.locator('[data-path-total]');
  const stageProgress = page.locator(`[data-stage-progress="${stageId}"]`);

  expect(Number(await total.getAttribute('aria-valuenow'))).toBe(0);
  await expect(stageProgress).toHaveText('0%');

  await firstNode.locator('.pn-btn').click();
  await page.locator('#path-drawer [data-path-state="done"]').click();
  await expect(firstNode).toHaveAttribute('data-state', 'done');

  expect(Number(await total.getAttribute('aria-valuenow'))).toBeGreaterThan(0);
  await expect(stageProgress).not.toHaveText('0%');
});

test('two-step reset clears stored progress and node state', async ({ page }) => {
  const firstNode = page.locator('li.path-node').first();
  const nodeId = await firstNode.getAttribute('data-node');

  await firstNode.locator('.pn-btn').click();
  const drawer = page.locator('#path-drawer[role="dialog"]');
  await expect(drawer).toBeVisible();
  await drawer.locator('[data-path-state="done"]').click();
  await expect(firstNode).toHaveAttribute('data-state', 'done');

  // Close the drawer so the sticky toolbar (and its scrim) does not intercept.
  await page.keyboard.press('Escape');
  await expect(drawer).toBeHidden();

  const reset = page.locator('[data-path-reset]');
  await reset.click();
  await expect(reset).toHaveText(/confirm reset/i);
  await reset.click();

  await expect(firstNode).toHaveAttribute('data-state', '');
  const stored = await page.evaluate((k) => localStorage.getItem(k), KEY);
  const parsed = stored ? JSON.parse(stored) : {};
  expect(parsed[nodeId as string]).toBeUndefined();
});

test('axe: no serious or critical violations with the drawer open', async ({ page }) => {
  await page.locator('.pn-btn').first().click();
  await expect(page.locator('#path-drawer[role="dialog"]')).toBeVisible();

  const results = await new AxeBuilder({ page }).analyze();
  const serious = results.violations.filter(
    (v) => v.impact === 'serious' || v.impact === 'critical',
  );
  const detail = serious
    .map((v) => `${v.id} [${v.impact}] ${v.help} — ${v.nodes.length} node(s)`)
    .join('\n');
  expect(serious, `serious/critical a11y violations with drawer open:\n${detail}`).toEqual([]);
});

test('no-JS: the <details> fallback is visible and expandable', async ({ browser, baseURL }) => {
  const context = await browser.newContext({ javaScriptEnabled: false, baseURL });
  const page = await context.newPage();
  try {
    await page.goto('/path');
    const details = page.locator('details.pn-details').first();
    await expect(details).toBeVisible();

    const body = details.locator('.pn-body');
    await expect(body).toBeHidden();
    await details.locator('summary').click();
    await expect(body).toBeVisible();
  } finally {
    await context.close();
  }
});

test('cross-stage edges appear only for the hovered node and clear on mouse-out', async ({
  page,
}) => {
  await page.setViewportSize({ width: 1440, height: 900 });

  // eval-gate-ci depends on gates-admission, which lives in an earlier stage,
  // so the pair is drawn as a cross-stage connector.
  const node = page.locator('li[data-node="eval-gate-ci"]');
  const prereq = page.locator('li[data-node="gates-admission"]');
  const visibleEdges = page.locator('[data-path-edges] path:visible');

  // Quiet by default: nothing drawn until a node is engaged.
  await expect(visibleEdges).toHaveCount(0);
  await expect(prereq).not.toHaveAttribute('data-related', /.+/);

  await node.locator('.pn-btn').hover();

  await expect(visibleEdges.first()).toBeVisible();
  await expect(prereq).toHaveAttribute('data-related', 'prereq');

  // Pointer well away from every node: the connectors and marks clear again.
  await page.mouse.move(2, 2);
  await expect(visibleEdges).toHaveCount(0);
  await expect(prereq).not.toHaveAttribute('data-related', /.+/);
});

test('drawer: a "Builds on" link opens that node and resets the previous opener', async ({
  page,
}) => {
  await page.setViewportSize({ width: 1440, height: 900 });

  const opener = page.locator('li[data-node="eval-gate-ci"] .pn-btn');
  await opener.click();

  const drawer = page.locator('#path-drawer[role="dialog"]');
  await expect(drawer).toBeVisible();

  const title = page.locator('#path-drawer-title');
  await expect(title).toHaveText('Eval gate in CI');
  await expect(opener).toHaveAttribute('aria-expanded', 'true');

  // Follow the cross-stage prereq from inside the drawer.
  await drawer.locator('a[href="/path#node-gates-admission"]').click();

  await expect(title).toHaveText('Gates and admission control');
  await expect(opener).toHaveAttribute('aria-expanded', 'false');
  await expect(page.locator('li[data-node="gates-admission"] .pn-btn')).toHaveAttribute(
    'aria-expanded',
    'true',
  );
});
