// page-visuals-t3-agents.spec.ts: the tanda-3 visuals of block C (OpenSpec
// change page-visuals-2, "Recuentos coherentes"), on the built pages. Every
// expected value is recomputed here from the data modules, never from the
// components or the chart kit, so a visual wired to the wrong records fails:
// 1. AutonomyLadder (/agents, /toolkit/agent-control-profile): one rung per
//    autonomy level in order, with what the person does, the ATF tier and the
//    controls the level adds; the rung links resolve in chapter 23; on the
//    toolkit the chosen level lights (and only with JavaScript);
// 2. /agents threat flow: every OWASP agentic threat reaches exactly its
//    chapter-23 patterns, each named with its stack layer, each pattern takes
//    as many threats as the data gives it, and every threat link lands on its
//    row of the table;
// 3. EvalBoundary (/frontier, the evaluation-environment research note): each
//    of the five inner rings holds the controls the matching item of the
//    note's "Five things inside the boundary" names (read from the note's
//    markdown), every control in exactly one ring with its layer, linked to
//    its section of the profile; in the note the figure sits under that list;
// 4. /frontier #incidents: each evaluation control lists as many cases as
//    name it in their relatedControls, each linked to its case and labelled
//    without a lab's name;
// 5. /frontier #ecosystem: the AIUC-1 waffle holds every requirement of the
//    index in its domain, retired ones as retired, as of the index's read date.
import { test, expect, type Page } from '@playwright/test';
import { readFileSync } from 'node:fs';

import { agentAnchors, agentChapter, agentControls, autonomyLevels } from '../src/data/tool-agent-controls';
import { agentThreats } from '../src/data/agent-threats';
import { patterns as patternDefs } from '../src/data/patterns';
import { controlsIn } from '../src/data/controls';
import { cases } from '../src/data/cases';
import { LAB_NAMES } from '../src/data/frontier';
import { AIUC1_INDEX, aiuc1Domains, aiuc1Requirements, type Aiuc1Domain } from '../src/data/aiuc1';

const NOTE = '/research/the-evaluation-environment-is-part-of-the-system';
const evalControls = controlsIn('evaluation-environment');
const short = (id: string) => id.replace(/^AIGE-CTL-/, '');

/** The table of a Chart figure: its rows as arrays of cell texts. */
async function chartRows(page: Page, figure: string): Promise<string[][]> {
  return page
    .locator(`figure#${figure} table.chart-table tbody tr`)
    .evaluateAll((rows) => rows.map((row) => [...row.children].map((cell) => (cell.textContent ?? '').trim())));
}

/** Hrefs of the links drawn inside a figure's SVGs. */
async function svgLinks(page: Page, figure: string): Promise<string[]> {
  return page
    .locator(`figure#${figure} svg a`)
    .evaluateAll((as) => as.map((a) => a.getAttribute('href') ?? a.getAttribute('xlink:href') ?? ''));
}

// ---- 1. AutonomyLadder --------------------------------------------------------

const titleOf = new Map(agentControls.map((c) => [c.id, c.title]));

async function checkLadder(page: Page, figure: string) {
  const rows = await chartRows(page, figure);
  expect(rows.map((row) => row[1])).toEqual(autonomyLevels.map((level) => level.name));
  autonomyLevels.forEach((level, i) => {
    expect(rows[i][0], level.id).toBe(String(i + 1));
    expect(rows[i][2], level.id).toContain(level.person);
    expect(rows[i][2], level.id).toContain(level.atf);
    expect(rows[i][3].split('; '), level.id).toEqual(level.adds.map((id) => titleOf.get(id)));
  });
  // Both variants carry one hook per level, in order, for the toolkit's script.
  for (const svg of await page.locator(`figure#${figure} svg`).all()) {
    const steps = await svg.locator('g[data-step]').evaluateAll((gs) => gs.map((g) => g.getAttribute('data-step')));
    expect(steps).toEqual(autonomyLevels.map((level) => level.id));
  }
  const hrefs = [...new Set(await svgLinks(page, figure))];
  expect(hrefs).toEqual([`${agentChapter}#${agentAnchors.autonomy}`]);
}

test.describe('AutonomyLadder', () => {
  test('/agents draws the five levels with what each adds, linked to chapter 23', async ({ page }) => {
    await page.goto('/agents');
    await checkLadder(page, 'ag-autonomy');
    // Placed in "Four properties", before the control plane.
    await expect(page.locator('#why figure#ag-autonomy')).toHaveCount(1);
    await page.goto(agentChapter);
    await expect(page.locator(`#${agentAnchors.autonomy}`)).toHaveCount(1);
  });

  test('the toolkit lights the chosen level, and only that one', async ({ page }) => {
    await page.goto('/toolkit/agent-control-profile');
    await checkLadder(page, 'acp-ladder');
    const chosen = () =>
      page.locator('figure#acp-ladder svg').first().locator('g[data-state="chosen"]').evaluateAll((gs) => gs.map((g) => g.getAttribute('data-step')));
    expect(await chosen()).toEqual([]);
    await page.locator('label[for="acp-al-approver"]').click();
    expect(await chosen()).toEqual(['approver']);
    await page.locator('label[for="acp-al-operator"]').click();
    expect(await chosen()).toEqual(['operator']);
  });

  test.describe('without JavaScript', () => {
    test.use({ javaScriptEnabled: false });
    test('the toolkit ladder is whole and neutral', async ({ page }) => {
      await page.goto('/toolkit/agent-control-profile#v=1&al=observer');
      await expect(page.locator('figure#acp-ladder svg').first().locator('g[data-step]')).toHaveCount(autonomyLevels.length);
      await expect(page.locator('figure#acp-ladder g[data-state]')).toHaveCount(0);
    });
  });
});

// ---- 2. /agents threat flow ---------------------------------------------------

test.describe('/agents threat flow', () => {
  test('every threat reaches its chapter-23 pattern, and links its table row', async ({ page }) => {
    await page.goto('/agents');
    const rows = await chartRows(page, 'ag-threat-flow');
    // A pattern is named with its home layer, as the site writes a layer ("Layer 04").
    const layerOf = (title: string) => patternDefs.find((p) => p.title === title)?.layer;
    const patternName = (title: string) => `Layer ${String(layerOf(title)).padStart(2, '0')} · ${title}`;
    for (const t of agentThreats) {
      const holding = rows.filter((row) => row[0].split('; ').some((name) => name.startsWith(`${t.id} `)));
      expect(holding.map((row) => row[1]), t.id).toEqual(t.patterns.map(patternName));
      expect(holding[0][0], t.id).toContain(`${t.id} ${t.name}`);
    }
    const patterns = [...new Set(agentThreats.flatMap((t) => t.patterns))];
    expect([...new Set(rows.map((row) => row[1]))].sort()).toEqual(patterns.map(patternName).sort());
    for (const p of patterns) {
      const drawn = rows.filter((row) => row[1] === patternName(p)).reduce((sum, row) => sum + Number(row[2]), 0);
      expect(drawn, p).toBe(agentThreats.filter((t) => t.patterns.includes(p)).length);
    }
    // Same-page links land on a row of the threat table.
    const anchors = (await svgLinks(page, 'ag-threat-flow')).filter((href) => href.startsWith('#'));
    expect(anchors.length).toBeGreaterThan(0);
    for (const href of new Set(anchors)) await expect(page.locator(`#threats table.ag-table tr${href}`), href).toHaveCount(1);
  });
});

// ---- 3. EvalBoundary ----------------------------------------------------------

/** The note's "Five things inside the boundary": each numbered item's title
 *  ("The harness") and the control ids it names, from the markdown. */
function fiveThings(): { title: string; controls: string[] }[] {
  const md = readFileSync('../research/the-evaluation-environment-is-part-of-the-system.md', 'utf8').replace(/\r\n/g, '\n');
  const section = md.slice(md.indexOf('## Five things inside the boundary'));
  const list = section.slice(0, section.indexOf('\n## ', 1));
  return list
    .split(/\n(?=\d+\. \*\*)/)
    .filter((item) => /^\d+\. \*\*/.test(item))
    .map((item) => ({
      title: /^\d+\. \*\*([^*]+?)\.?\*\*/.exec(item)![1],
      controls: [...new Set([...item.matchAll(/\[(AIGE-CTL-EVAL-\d{3})\]/g)].map((m) => m[1]))],
    }));
}

async function checkBoundary(page: Page, figure: string) {
  const rows = await chartRows(page, figure);
  // Every control once, with its layer.
  expect(rows.map((row) => row[0]).sort()).toEqual(evalControls.map((c) => short(c.id)).sort());
  for (const c of evalControls) expect(rows.find((r) => r[0] === short(c.id))![2], c.id).toBe(`Layer 0${c.layer}`);
  // Each of the note's five things is a ring holding exactly the controls
  // its item names; the ring's label is the item's title ("The harness"
  // reads "Harness").
  const things = fiveThings();
  expect(things).toHaveLength(5);
  for (const thing of things) {
    const ring = rows.filter((r) => thing.controls.map(short).includes(r[0])).map((r) => r[1]);
    expect(new Set(ring).size, thing.title).toBe(1);
    expect(thing.title.replace(/^The /, '').toLowerCase(), thing.title).toBe(ring[0].toLowerCase());
    expect(rows.filter((r) => r[1] === ring[0]).map((r) => r[0]).sort(), thing.title).toEqual(thing.controls.map(short).sort());
  }
  const hrefs = [...new Set(await svgLinks(page, figure))].sort();
  expect(hrefs).toEqual(evalControls.map((c) => `/controls/evaluation-environment#${c.id.toLowerCase()}`).sort());
}

test.describe('EvalBoundary', () => {
  test('/frontier pins each evaluation control in its ring, at the head of #evaluation-environments', async ({ page }) => {
    await page.goto('/frontier');
    await checkBoundary(page, 'fr-eval-boundary');
    await expect(page.locator('#evaluation-environments figure#fr-eval-boundary')).toHaveCount(1);
    await page.goto('/controls/evaluation-environment');
    for (const c of evalControls) await expect(page.locator(`#${c.id.toLowerCase()}`), c.id).toHaveCount(1);
  });

  test('the research note carries the same figure under "Five things inside the boundary"', async ({ page }) => {
    await page.goto(NOTE);
    await checkBoundary(page, 'rn-eval-boundary');
    const order = await page
      .locator('h2, figure#rn-eval-boundary')
      .evaluateAll((els) => els.map((el) => (el.tagName === 'FIGURE' ? 'figure' : el.id)));
    const at = order.indexOf('figure');
    expect(order[at - 1]).toBe('five-things-inside-the-boundary');
    expect(order.filter((x) => x === 'figure')).toHaveLength(1);
  });
});

// ---- 4. /frontier case x control ----------------------------------------------

test.describe('/frontier #incidents case x control', () => {
  test('each evaluation control lists exactly the cases that name it, each linked', async ({ page }) => {
    await page.goto('/frontier');
    const rows = await chartRows(page, 'fr-cases');
    const expected = evalControls.flatMap((c) =>
      cases.filter((k) => (k.relatedControls ?? []).includes(c.id)).map((k) => ({ control: short(c.id), title: c.title, k })),
    );
    expect(rows).toHaveLength(expected.length);
    // The page names no lab (LAB_NAMES), so a case's label never does.
    expected.forEach(({ control, title, k }, i) => {
      expect(rows[i][0], k.id).toBe(control);
      expect(rows[i][1], `${control} ${k.id}`).not.toBe('');
      expect(LAB_NAMES.test(rows[i][1]), `${control} ${k.id}: "${rows[i][1]}"`).toBe(false);
      // The state names the control, so a square's tooltip says which one.
      expect(rows[i][2]).toBe(`Names ${control} ${title}`);
    });
    const named = cases.filter((k) => evalControls.some((c) => (k.relatedControls ?? []).includes(c.id)));
    expect([...new Set(await svgLinks(page, 'fr-cases'))].sort()).toEqual(named.map((k) => `/cases/${k.id}`).sort());
    // The key under the chart links every control.
    for (const c of evalControls) {
      await expect(page.locator(`#incidents a[href="/controls/evaluation-environment#${c.id.toLowerCase()}"]`), c.id).toHaveCount(1);
    }
  });
});

// ---- 5. /frontier AIUC-1 waffle -----------------------------------------------

test.describe('/frontier #ecosystem AIUC-1 waffle', () => {
  test('holds every requirement in its domain, retired ones as retired, as of the index read', async ({ page }) => {
    await page.goto('/frontier');
    const rows = await chartRows(page, 'fr-aiuc');
    const domains = Object.keys(aiuc1Domains) as Aiuc1Domain[];
    const expected = domains.flatMap((d) =>
      aiuc1Requirements
        .filter((r) => r.domain === d)
        .map((r) => [`${d} ${aiuc1Domains[d]}`, `${r.id} ${r.title}`, r.retired ? 'Retired' : 'Listed']),
    );
    expect(rows).toEqual(expected);
    await expect(page.locator('figure#fr-aiuc svg').first()).toContainText(`As of ${AIUC1_INDEX.read}`);
    await expect(page.locator('#ecosystem figure#fr-aiuc')).toHaveCount(1);
  });
});
