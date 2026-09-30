// page-visuals-toolkit.spec.ts: the wave-1 page visuals of the toolkit block
// (OpenSpec change page-visuals), checked on the built pages:
// 1. /toolkit/policy-card: the lanes chart draws every curated rule template
//    at exactly its enforcement points, with its effect, and each row links
//    the template's entry in the guide;
// 2. /toolkit/ai-act-triage: the risk ladder and the GPAI track are complete
//    and neutral without JavaScript and carry the dates of classLabels; with
//    JavaScript, the rungs light up from the engine's outcome (classes stack,
//    out of scope shows what would follow) and a live edit is announced;
// 3. the operator-roles poster keeps its legible width inside a scroll region
//    on a phone (where each embedded figure appears is checked, for every
//    page, by page-visuals-w1e.spec.ts).
import { test, expect, type Page } from '@playwright/test';

import { policyCardTemplates, type EnforcementPoint } from '../src/data/policy-card';
import { classLabels, classOrder, triageModel } from '../src/data/triage';
import { evaluate, cleanMeta, stateToParams } from '../public/toolkit/ai-act-triage-engine.js';
import { encodeFragment } from '../public/toolkit/lib.js';

const POINTS: EnforcementPoint[] = ['pre_merge', 'deploy', 'runtime', 'periodic'];

/** The table of a Chart figure: its rows as arrays of cell texts. */
async function chartRows(page: Page, figure: string): Promise<string[][]> {
  return page
    .locator(`figure#${figure} table.chart-table tbody tr`)
    .evaluateAll((rows) => rows.map((row) => [...row.children].map((cell) => (cell.textContent ?? '').trim())));
}

// ---- 1. Policy card ---------------------------------------------------------

test.describe('/toolkit/policy-card lanes', () => {
  test('every curated template sits at exactly its enforcement points, with its effect, and links its guide entry', async ({ page }) => {
    const curated = policyCardTemplates.filter((template) => template.id !== 'custom');
    await page.goto('/toolkit/policy-card');

    // The table: one row per curated template, the effect under each point it is enforced at.
    const rows = await chartRows(page, 'pc-lanes');
    expect(rows.map((row) => row[0])).toEqual(curated.map((template) => template.title));
    curated.forEach((template, i) => {
      const expected = POINTS.map((point) => (template.enforcementPoints.includes(point) ? template.effect : ''));
      expect(rows[i].slice(1), template.id).toEqual(expected);
    });

    // The SVGs draw one titled marker per (template, point), in both variants.
    const marks = curated.reduce((n, template) => n + template.enforcementPoints.length, 0);
    for (const svg of ['#pc-lanes-w-t', '#pc-lanes-n-t']) {
      const root = page.locator(`svg:has(> title${svg})`);
      const titles = await root.locator('title').allTextContents();
      expect(titles.filter((t) => /: (deny|allow|require_approval|alert)$/.test(t)), svg).toHaveLength(marks);
    }

    // The row labels link the templates' entries in "The six rule templates",
    // and every target is on the page.
    const hrefs = await page.locator('#pc-lanes svg a').evaluateAll((as) => as.map((a) => a.getAttribute('href')));
    expect([...new Set(hrefs)].sort()).toEqual(curated.map((template) => `#pc-g-${template.id}`).sort());
    for (const template of curated) await expect(page.locator(`#pc-g-${template.id}`)).toHaveCount(1);
  });
});

// ---- 2. Triage risk ladder --------------------------------------------------

const TRIAGE = '/toolkit/ai-act-triage';
const model = {
  ...triageModel((heading: string) => `/bok/eu-ai-act#${heading}`),
  notice: '',
  page: `https://aigovernanceengineer.com${TRIAGE}`,
  chapter: 'https://aigovernanceengineer.com/bok/eu-ai-act',
  planner: { href: '/toolkit/obligations-planner', live: false },
  registerHref: '/obligations',
};
/** The chapter 18 worked example (tests/ai-act-triage.spec.ts): Annex III point 4. */
const CV_SCREEN = {
  object: 'system',
  inference: 'yes',
  reach: ['eu-market', 'eu-established'],
  exclusions: ['none'],
  activity: ['develop', 'use'],
  art25: ['none'],
  art5: ['none'],
  generation: 'no',
  annex1: 'no',
  annex3: ['employment'],
  'art6-3': ['preparatory-task'],
  profiling: 'yes',
  art50: ['none'],
};
const GPAI_SYSTEMIC = {
  object: 'model',
  reach: ['eu-market'],
  exclusions: ['none'],
  activity: ['develop'],
  gpai: 'yes',
  'gpai-compute': 'above',
  'gpai-origin': 'trained',
  'gpai-open': 'yes',
};
const RUNGS = ['minimal', 'transparency', 'high-risk', 'prohibited', 'gpai', 'gpai-systemic'];

function linkFor(raw: Record<string, unknown>) {
  const evaluation = evaluate(model, raw, { decidedAt: '2026-09-24' });
  const meta = cleanMeta(model, {
    name: 'Screening assistant',
    purpose: 'Rank job applications for recruiters.',
    reviewer: 'ai-governance',
    decidedAt: '2026-09-24',
  });
  return `${TRIAGE}#${encodeFragment(stateToParams(model, evaluation.answers, meta))}`;
}

test.describe('/toolkit/ai-act-triage ladder without JavaScript', () => {
  test.use({ javaScriptEnabled: false });

  test('the written-out rules show the whole ladder and GPAI track, neutral, with the dates of classLabels', async ({ page }) => {
    await page.goto(TRIAGE);
    await expect(page.locator('#tri-ladder-guide')).toBeVisible();
    await expect(page.locator('#tri-gpai-guide')).toBeVisible();
    const keys = await page
      .locator('#tri-ladder-guide svg, #tri-gpai-guide svg')
      .locator('g[data-step]')
      .evaluateAll((groups) => [...new Set(groups.map((g) => g.getAttribute('data-step')))]);
    expect(keys.sort()).toEqual([...RUNGS].sort());
    await expect(page.locator('#tri-ladder-guide g[data-state], #tri-gpai-guide g[data-state]')).toHaveCount(0);

    // Every class's application date is on its rung, in the table the chart draws.
    const cells = [...(await chartRows(page, 'tri-ladder-guide')), ...(await chartRows(page, 'tri-gpai-guide'))]
      .map((row) => row.join(' '))
      .join('\n');
    for (const id of classOrder) {
      for (const date of classLabels[id].appliesNote.match(/\d{4}-\d{2}-\d{2}/g) ?? []) {
        expect(cells, `${id} ${date}`).toContain(date);
      }
    }
  });
});

test.describe('/toolkit/ai-act-triage ladder', () => {
  const cases: { name: string; raw: Record<string, unknown>; given: string[]; would: string[] }[] = [
    { name: 'Annex III system', raw: CV_SCREEN, given: ['high-risk'], would: [] },
    { name: 'classes stack', raw: { ...CV_SCREEN, art50: ['interacts'] }, given: ['transparency', 'high-risk'], would: [] },
    { name: 'out of scope', raw: { ...CV_SCREEN, reach: ['none'] }, given: [], would: ['high-risk'] },
    { name: 'GPAI model with systemic risk', raw: GPAI_SYSTEMIC, given: ['gpai', 'gpai-systemic'], would: [] },
  ];
  for (const c of cases) {
    test(`lights the rungs the engine gives: ${c.name}`, async ({ page }) => {
      await page.goto(linkFor(c.raw));
      const box = page.locator('[data-tri-ladder]');
      await expect(box).toBeVisible();
      for (const key of RUNGS) {
        const state = c.given.includes(key) ? 'given' : c.would.includes(key) ? 'if' : 'not';
        const groups = box.locator(`g[data-step="${key}"]`);
        await expect(groups.first(), key).toHaveAttribute('data-state', state);
        expect(await groups.evaluateAll((gs) => gs.map((g) => g.getAttribute('data-state'))), key).toEqual(
          Array(await groups.count()).fill(state),
        );
      }
    });
  }

  test('a live edit relights the ladder and says so in its polite region', async ({ page }) => {
    await page.goto(linkFor(CV_SCREEN));
    const box = page.locator('[data-tri-ladder]');
    await expect(box.locator('g[data-step="high-risk"]').first()).toHaveAttribute('data-state', 'given');
    await expect(box.locator('[data-tri-lad-live]')).toHaveAttribute('aria-live', 'polite');
    // Adding an Art. 50 case stacks the transparency rung on the high-risk one.
    await page.locator('label[for="tri-art50-interacts"]').click();
    await expect(box.locator('g[data-step="transparency"]').first()).toHaveAttribute('data-state', 'given');
    const reading = box.locator('[data-tri-lad-reading]');
    await expect(box.locator('[data-tri-lad-live]')).toHaveText(await reading.textContent() ?? '');
    await expect(reading).toContainText(classLabels['transparency-art50'].label);
  });
});

// ---- 3. The operator-roles poster on a phone ---------------------------------

test.describe('the operator-roles poster on the triage tool', () => {
  // Placement of every embedded figure (pages[] and the permalink's back
  // link) is owned by the generic checks of page-visuals-w1e.spec.ts.
  test('on a phone the operator-roles poster keeps its width inside a scroll region, not the page', async ({ page }) => {
    await page.setViewportSize({ width: 390, height: 844 });
    await page.goto(TRIAGE);
    const region = page.locator('figure#figure-eu-ai-act-operator-roles .figure-canvas--poster[role="region"]');
    await expect(region).toHaveAttribute('tabindex', '0');
    const svgWidth = await region.locator('svg').evaluate((svg) => svg.getBoundingClientRect().width);
    expect(svgWidth).toBeGreaterThanOrEqual(760);
    const overflow = await page.evaluate(() => document.documentElement.scrollWidth - document.documentElement.clientWidth);
    expect(overflow).toBeLessThanOrEqual(0);
  });
});
