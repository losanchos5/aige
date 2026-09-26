// orp-a11y.spec.ts: keyboard, focus, motion, landmark and phone-width checks
// for the routes of the open reference project (OpenSpec change
// open-reference-project, block orp-qa). The axe sweep of a11y.spec.ts covers
// colour contrast and ARIA on every built route; this file covers what axe
// does not see: the order and visibility of keyboard focus through the new
// components (FlowDiagram, ControlRecord, the case TOC, ContributeCta, the
// home hero), that those components never move, that a page repeating the
// Contribute call keeps one Contribute landmark, and that nothing is wider
// than a 390px phone. It lives in the `a11y` Playwright project (the file name
// matches its pattern), so `npm run test:a11y` runs it.
import { test, expect, type Locator, type Page } from '@playwright/test';
import { researchPath, writtenThemes } from '../src/data/research';

const NOTE = researchPath(writtenThemes()[0]);
const CASE = '/cases/openai-hugging-face-agent-incident-2026';

const ROUTES = [
  '/',
  '/controls',
  '/controls/evaluation-environment',
  '/controls/agent-runtime',
  '/frontier',
  '/research',
  NOTE,
  '/contribute',
  '/cases',
  CASE,
  '/about',
  '/about/methodology',
];

/**
 * Puts the page in keyboard modality (one Tab), then focuses `el` and reports
 * whether it shows a focus indicator: :focus-visible matches and it draws an
 * outline (or a box-shadow ring) of at least 1px.
 */
async function focusRing(page: Page, selector: string, nth = 0) {
  await page.keyboard.press('Tab');
  return page.locator(selector).nth(nth).evaluate((el: HTMLElement) => {
    el.focus();
    const cs = getComputedStyle(el);
    return {
      focused: document.activeElement === el,
      visible: el.matches(':focus-visible'),
      outline: cs.outlineStyle !== 'none' && parseFloat(cs.outlineWidth) >= 1,
      shadow: cs.boxShadow !== 'none',
    };
  });
}

function expectRing(r: Awaited<ReturnType<typeof focusRing>>, what: string) {
  expect(r.focused, `${what}: takes focus`).toBe(true);
  expect(r.visible, `${what}: :focus-visible`).toBe(true);
  expect(r.outline || r.shadow, `${what}: draws a focus ring`).toBe(true);
}

/** Tab from the first of `items` through `count` of them: they are reached in DOM order. */
async function expectTabOrder(page: Page, items: Locator, count: number, what: string) {
  const n = Math.min(count, await items.count());
  expect(n, `${what}: present`).toBeGreaterThan(1);
  await page.keyboard.press('Tab');
  await items.first().focus();
  for (let i = 1; i < n; i++) {
    await page.keyboard.press('Tab');
    await expect(items.nth(i), `${what} #${i + 1} after Tab`).toBeFocused();
  }
}

test.describe('keyboard focus', () => {
  test('FlowDiagram nodes are reached in order, each with a ring', async ({ page }) => {
    for (const route of ['/controls', '/frontier']) {
      await page.goto(route);
      const nodes = page.locator('figure.flow:has(a.flow-node)').first().locator('a.flow-node');
      expect(await nodes.count(), `${route}: a linked flow`).toBeGreaterThan(1);
      await expectTabOrder(page, nodes, 7, `${route} flow nodes`);
      expectRing(await focusRing(page, 'figure.flow a.flow-node', 1), `${route} flow node`);
    }
  });

  test('ControlRecord links and the per-control review button show focus', async ({ page }) => {
    await page.goto('/controls/evaluation-environment');
    const record = 'section.ctl:has(#aige-ctl-eval-002)';
    expectRing(await focusRing(page, `${record} dd a`), 'EVAL-002 record link');
    expectRing(await focusRing(page, `${record} .contrib a.btn-primary`), 'EVAL-002 review button');
    expectRing(await focusRing(page, `${record} .contrib a.contrib-link`), 'EVAL-002 review link');
  });

  test('the case TOC is reached in order and shows focus', async ({ page }) => {
    await page.goto(CASE);
    await expectTabOrder(page, page.locator('nav.cs-toc a'), 4, 'case TOC');
    expectRing(await focusRing(page, 'nav.cs-toc a', 0), 'case TOC link');
  });

  test('ContributeCta shows focus on both links, in both themes, inside the prose', async ({
    page,
  }) => {
    for (const scheme of ['light', 'dark'] as const) {
      await page.emulateMedia({ colorScheme: scheme });
      for (const route of [NOTE, '/controls/agent-runtime', '/frontier', '/cases']) {
        await page.goto(route);
        const cta = 'aside.contrib';
        expectRing(await focusRing(page, `${cta} a.btn-primary`), `${route} ${scheme} button`);
        expectRing(await focusRing(page, `${cta} a.contrib-link`), `${route} ${scheme} link`);
      }
    }
  });

  test('the home hero CTAs and links are reached in order, each with a ring', async ({ page }) => {
    await page.setViewportSize({ width: 1440, height: 900 });
    await page.goto('/');
    await expectTabOrder(page, page.locator('.hero-center a'), 4, 'hero');
    for (let i = 0; i < 4; i++) {
      expectRing(await focusRing(page, '.hero-center a', i), `hero link ${i + 1}`);
    }
  });
});

test.describe('the review button inside the prose', () => {
  // `.prose a` once painted the button's label in --ink on its --ink fill.
  for (const scheme of ['light', 'dark'] as const) {
    test(`its label is the ground colour on the ink fill (${scheme})`, async ({ page }) => {
      await page.emulateMedia({ colorScheme: scheme });
      for (const route of [NOTE, '/controls/evaluation-environment']) {
        await page.goto(route);
        const got = await page
          .locator('.prose .contrib a.btn-primary')
          .first()
          .evaluate((el) => {
            const cs = getComputedStyle(el);
            return { color: cs.color, bg: cs.backgroundColor, line: cs.textDecorationLine };
          });
        expect(got.color, `${route} ${scheme}`).not.toBe(got.bg);
        expect(got.line, `${route} ${scheme}`).toBe('none');
      }
    });
  }
});

test.describe('motion and landmarks', () => {
  test('the new components never animate', async ({ page }) => {
    await page.emulateMedia({ reducedMotion: 'no-preference' });
    for (const route of ['/controls', '/controls/evaluation-environment', '/frontier', NOTE]) {
      await page.goto(route);
      const moving = await page.evaluate(() =>
        document
          .getAnimations()
          .map((a) => (a.effect as KeyframeEffect | null)?.target as Element | null)
          .filter((el) => el?.closest('.flow, .contrib, .ctl, .status-line, .work-list'))
          .map((el) => el!.className),
      );
      expect(moving, route).toEqual([]);
    }
  });

  test('a page keeps at most one Contribute landmark', async ({ page }) => {
    for (const route of ROUTES) {
      await page.goto(route);
      expect(await page.locator('aside[aria-label="Contribute"]').count(), route).toBeLessThanOrEqual(1);
    }
  });
});

test.describe('phone width', () => {
  test('no route is wider than a 390px phone', async ({ page }) => {
    await page.setViewportSize({ width: 390, height: 844 });
    for (const scheme of ['light', 'dark'] as const) {
      await page.emulateMedia({ colorScheme: scheme, reducedMotion: 'reduce' });
      for (const route of ROUTES) {
        await page.goto(route);
        const m = await page.evaluate(() => ({
          scroll: document.documentElement.scrollWidth,
          client: document.documentElement.clientWidth,
        }));
        expect(m.scroll, `${route} ${scheme}`).toBeLessThanOrEqual(m.client);
      }
    }
  });

  test('the mappings table stacks its cells under their labels', async ({ page }) => {
    await page.setViewportSize({ width: 390, height: 844 });
    await page.goto('/controls/agent-runtime');
    const cell = page.locator('.cp-table td[data-label="ISO/IEC 42001"]').first();
    const got = await cell.evaluate((el) => ({
      display: getComputedStyle(el).display,
      label: getComputedStyle(el, '::before').content,
      right: el.getBoundingClientRect().right,
      vw: document.documentElement.clientWidth,
    }));
    expect(got.display, 'a stacked cell, not a table column').not.toBe('table-cell');
    expect(got.label).toContain('ISO/IEC 42001');
    expect(got.right).toBeLessThanOrEqual(got.vw);
  });

  test('the 40-record profile TOC reaches a record near the end', async ({ page }) => {
    await page.setViewportSize({ width: 390, height: 844 });
    await page.goto('/controls/agent-runtime');
    const last = page.locator('section.ctl h2[id]').last();
    const id = await last.getAttribute('id');
    const link = page.locator(`a[href="#${id}"]`).first();
    await expect(link).toBeAttached();
    // On a phone the TOC may sit in a closed <details>: open it first.
    await link.evaluate((el) => el.closest('details')?.setAttribute('open', ''));
    await link.click();
    await expect(page).toHaveURL(new RegExp(`#${id}$`));
    await expect(last).toBeInViewport();
  });
});
