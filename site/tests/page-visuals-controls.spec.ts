// page-visuals-controls.spec.ts: data parity of the wave-2 control visuals
// (OpenSpec page-visuals, block controls) against the registry they are
// drawn from (src/data/controls and the registers it points at): the lanes
// on /controls, the periodic table and the framework coverage grid on each
// profile page, and the anatomy chain, the pass/fail comparison and the
// traceability constellation on each control page. Expected values are
// computed here from the data modules (a response still to be specified by
// the registry's own isResponseToSpecify), never read back from the
// components, so a visual that drops, adds, misplaces or miscounts a control
// or a relation fails. Runs in `default` on a build.
import { test, expect, type Page } from '@playwright/test';
import { readFileSync } from 'node:fs';
import {
  controls,
  profiles,
  controlsIn,
  controlAnchor,
  controlPagePath,
  isResponseToSpecify,
  observationExamples,
  type Control,
} from '../src/data/controls';
import { imdaAgenticXrefs, IMDA_AGENTIC_FRAMEWORK } from '../src/data/controls/imda-agentic';
import { enforcementLabels, type EnforcementPoint } from '../src/data/policy-card';
import { threatById } from '../src/data/threats';
import { getPatternBySlug } from '../src/data/patterns';
import { casesForControl } from '../src/lib/cross-links';

/** The pipeline order the legends state (pull request, deploy, runtime, periodic). */
const PIPELINE: EnforcementPoint[] = ['pre_merge', 'deploy', 'runtime', 'periodic'];

/** A control's failure response as the registry states it: its effect, or
 *  still to be specified (the registry's own predicate). */
const responseKey = (c: Control) => (isResponseToSpecify(c.failureResponse) ? 'to be specified' : c.failureResponse.effect);

/** The response marks encode the response: every control with one response
 *  gets one drawing (its response class), and no two responses share one.
 *  `drawn` pairs a control with the class list of its mark. */
function expectResponseEncoding(drawn: { c: Control; cls: string[] }[], where: string) {
  const markOf = (cls: string[]) => cls.filter((k) => /^cvm-/.test(k) && !/^cvm-l\d$/.test(k)).sort().join(' ');
  const byResponse = new Map<string, Set<string>>();
  for (const { c, cls } of drawn) byResponse.set(responseKey(c), (byResponse.get(responseKey(c)) ?? new Set()).add(markOf(cls)));
  for (const [response, marks] of byResponse) expect([...marks], `${where}: ${response} drawn one way`).toHaveLength(1);
  const looks = [...byResponse.values()].map((m) => [...m][0]);
  expect(new Set(looks).size, `${where}: responses drawn apart`).toBe(looks.length);
}

/** Every id a control maps to, per mappings key, less the IMDA entry that
 *  withImdaAgentic appends to `other` (its own family and column). */
const mappedIds = (c: Control): [key: string, ids: string[]][] =>
  Object.entries(c.mappings).map(([key, list]) => [
    key,
    (list as readonly (string | { framework: string; ref: string })[])
      .filter((x) => typeof x === 'string' || x.framework !== IMDA_AGENTIC_FRAMEWORK)
      .map((x) => (typeof x === 'string' ? x : `${x.framework} ${x.ref}`)),
  ]);

const specified = controls.filter((c) => controlPagePath(c) !== null);

/** The table rows of the Chart whose figcaption title is `title`. */
async function chartRows(page: Page, title: string): Promise<string[][]> {
  const figure = page.locator('figure.chart-fig', { has: page.locator('.chart-title', { hasText: title }) });
  await expect(figure).toHaveCount(1);
  return figure.locator('.chart-table tbody tr').evaluateAll((rows) =>
    rows.map((row) => [...row.querySelectorAll('th, td')].map((cell) => (cell.textContent ?? '').trim())),
  );
}

test.describe('/controls lanes', () => {
  test('each profile lane holds exactly the controls enforced there, in layer and response', async ({ page }) => {
    await page.goto('/controls');
    const lanes = page.locator('figure.clx');
    const keys = await lanes.locator('.clx-stage-key').allTextContents();
    expect(keys.map((k) => k.trim()).sort()).toEqual([...PIPELINE].sort());
    // The pipeline head: how many controls act at each point.
    const heads = await lanes.locator('.clx-stage-n').allTextContents();
    keys.forEach((key, i) => {
      expect(parseInt(heads[i], 10), key).toBe(controls.filter((c) => c.enforcementPoints.includes(key.trim() as EnforcementPoint)).length);
    });
    const rows = lanes.locator('.clx-row');
    await expect(rows).toHaveCount(profiles.length);
    const encoding: { c: Control; cls: string[] }[] = [];
    for (const [r, profile] of profiles.entries()) {
      const row = rows.nth(r);
      await expect(row.locator('.clx-name a')).toHaveText(profile.shortTitle);
      const cells = row.locator('.clx-cell');
      await expect(cells).toHaveCount(keys.length);
      for (const [i, key] of keys.entries()) {
        const drawn = await cells
          .nth(i)
          .locator('.cvm')
          .evaluateAll((marks) => marks.map((m) => ({ id: (m.getAttribute('title') ?? '').split(' ')[0], cls: m.className })));
        const expected = controlsIn(profile.slug).filter((c) => c.enforcementPoints.includes(key.trim() as EnforcementPoint));
        expect(drawn.map((d) => d.id).sort(), `${profile.slug} ${key}`).toEqual(expected.map((c) => c.id).sort());
        for (const c of expected) {
          const cls = drawn.find((d) => d.id === c.id)!.cls.split(/\s+/);
          expect(cls, c.id).toContain(`cvm-l${c.layer}`);
          encoding.push({ c, cls });
        }
      }
    }
    expectResponseEncoding(encoding, '/controls lanes');
  });
});

test.describe('/controls/<profile> visuals', () => {
  for (const profile of profiles) {
    test(`${profile.slug}: one tile per control, in its layer, depth, enforcement points and response`, async ({ page }) => {
      await page.goto(`/controls/${profile.slug}`);
      const rows = controlsIn(profile.slug);
      const tiles = page.locator('figure.cpt .cpt-tile');
      await expect(tiles).toHaveCount(rows.length);
      const encoding: { c: Control; cls: string[] }[] = [];
      for (const c of rows) {
        const tile = page.locator(`figure.cpt .cpt-tile[href="#${controlAnchor(c)}"]`);
        await expect(tile, c.id).toHaveCount(1);
        const cls = ((await tile.getAttribute('class')) ?? '').split(/\s+/);
        expect(cls, c.id).toContain(`cvm-l${c.layer}`);
        expect(cls, c.id).toContain(`cpt-${c.depth}`);
        const pips = await tile.locator('.cpt-pip').evaluateAll((els) => els.map((el) => el.classList.contains('cpt-on')));
        expect(pips, c.id).toEqual(PIPELINE.map((k) => c.enforcementPoints.includes(k)));
        encoding.push({ c, cls: ((await tile.locator('.cvm').getAttribute('class')) ?? '').split(/\s+/) });
      }
      expectResponseEncoding(encoding, profile.slug);
    });

    test(`${profile.slug}: the coverage grid counts every mapping and the IMDA fit`, async ({ page }) => {
      await page.goto(`/controls/${profile.slug}`);
      const grid = page.locator('figure.ccv table');
      const heads = (await grid.locator('thead th').allTextContents()).map((h) => h.trim()).slice(1);
      // "Other" gathers every mapping without a column of its own.
      const keyOf: Record<string, keyof Control['mappings'] | 'imda' | 'rest'> = {
        Obligations: 'obligations',
        'ISO 42001': 'iso42001',
        'NIST AI RMF': 'nistAiRmf',
        OWASP: 'owasp',
        ATLAS: 'atlas',
        'AIUC-1': 'aiuc1',
        Other: 'rest',
        'IMDA agentic': 'imda',
      };
      const columned = new Set<string>(Object.values(keyOf));
      const idsIn = (c: Control, key: string) =>
        key === 'rest' ? mappedIds(c).filter(([k]) => !columned.has(k)).flatMap(([, ids]) => ids).length : (mappedIds(c).find(([k]) => k === key)?.[1].length ?? 0);
      expect(heads.sort()).toEqual(Object.keys(keyOf).sort());
      const ordered = (await grid.locator('thead th').allTextContents()).map((h) => keyOf[h.trim()]).slice(1);
      const rows = controlsIn(profile.slug);
      const body = await grid.locator('tbody tr').evaluateAll((trs) =>
        trs.map((tr) => [...tr.querySelectorAll('th, td')].map((cell) => (cell.textContent ?? '').trim())),
      );
      expect(body).toHaveLength(rows.length);
      const fitWord = { direct: 'Direct fit', partial: 'Partial fit' } as const;
      rows.forEach((c, r) => {
        expect(body[r][0], c.id).toContain(c.id.slice(-3));
        ordered.forEach((key, i) => {
          const cell = body[r][i + 1];
          if (key === 'imda') {
            const fit = imdaAgenticXrefs[c.id]?.fit;
            expect(cell, `${c.id} IMDA`).toBe(fit ? fitWord[fit] : 'None');
          } else {
            expect(Number(cell), `${c.id} ${key}`).toBe(idsIn(c, key));
          }
        });
      });
      // The foot: controls with at least one id, then all the ids, per column.
      const foot = await grid.locator('tfoot tr').evaluateAll((trs) =>
        trs.map((tr) => [...tr.querySelectorAll('td')].map((cell) => parseInt(cell.textContent ?? '', 10))),
      );
      ordered.forEach((key, i) => {
        if (key === 'imda') {
          expect(foot[0][i], 'IMDA').toBe(rows.filter((c) => imdaAgenticXrefs[c.id]).length);
          return;
        }
        const counts = rows.map((c) => idsIn(c, key));
        expect(foot[0][i], key).toBe(counts.filter((n) => n > 0).length);
        expect(foot[1][i], key).toBe(counts.reduce((s, n) => s + n, 0));
      });
    });
  }
});

test.describe('/controls/<profile>/<id> visuals', () => {
  for (const c of specified) {
    const path = controlPagePath(c)!;

    test(`${c.id}: the anatomy states every failure mode, enforcement point, check, the response and every artefact`, async ({ page }) => {
      await page.goto(path);
      const rows = await chartRows(page, 'From failure to evidence');
      const step = (name: string) => rows.filter((r) => r[0] === name);
      expect(step('Failure modes').map((r) => r[1])).toEqual([...c.failureModes]);
      // A drawn stage names its enforcement point in the register's own words.
      const lit = step('Enforcement').map((r) => PIPELINE.filter((k) => enforcementLabels[k].toLowerCase().includes(r[1].toLowerCase())));
      expect(lit.every((keys) => keys.length === 1)).toBe(true);
      expect(lit.flat().sort()).toEqual([...c.enforcementPoints].sort());
      const checks = step('Verification').map((r) => r[2]).join(' ');
      expect(step('Verification')).toHaveLength(new Set(c.verification.map((v) => v.kind)).size);
      for (const v of c.verification) expect(checks, v.kind).toContain(v.text);
      expect(step('Decision').map((r) => r[2])).toEqual([c.failureResponse.text]);
      // The evidence is the last step, every artefact in order.
      expect(rows.at(-1)![0]).toBe('Evidence');
      expect(step('Evidence').map((r) => r[1])).toEqual(c.evidence.map((e) => e.artefact));
    });

    test(`${c.id}: pass and fail sit side by side with their own observations`, async ({ page }) => {
      await page.goto(path);
      const records = observationExamples
        .filter((e) => e.controlId === c.id)
        .map((e) => JSON.parse(readFileSync(`public${e.path}`, 'utf8')))
        .sort((a, b) => (a.status === 'pass' ? -1 : b.status === 'pass' ? 1 : 0));
      const cols = page.locator('figure.cvx .cvx-col');
      await expect(cols).toHaveCount(records.length);
      for (const [i, record] of records.entries()) {
        await expect(cols.nth(i).locator('.stamp')).toHaveText(record.status.toUpperCase());
        await expect(cols.nth(i).locator('.cvx-obs')).toHaveText(record.observed);
        await expect(cols.nth(i).locator('.cvx-subject code')).toHaveText(record.subject);
        const hashes = (record.evidence ?? []).filter((ev: { hash?: string }) => ev.hash).length;
        await expect(cols.nth(i).locator('.cvx-hash')).toHaveCount(hashes);
      }
      if (records.every((r) => r.expected === records[0].expected)) {
        await expect(page.locator('figure.cvx .cvx-exp-text')).toHaveText(records[0].expected);
      }
    });

    test(`${c.id}: the constellation lists every relation of the control`, async ({ page }) => {
      await page.goto(path);
      const rows = await chartRows(page, 'What this control traces to');
      const family = (name: string) => rows.filter((r) => r[0] === name).map((r) => r[1]);
      const m = c.mappings;
      expect(family('Cases').sort()).toEqual(casesForControl(c.id).map((k) => k.title).sort());
      expect(family('Patterns').sort()).toEqual(c.patterns.map((slug) => getPatternBySlug(slug)!.title).sort());
      expect(family('Obligations').map((name) => /\(([A-Z0-9-]+)\)$/.exec(name)?.[1]).sort()).toEqual([...m.obligations].sort());
      const threats = [...m.owasp, ...(m.atlas ?? [])].map((id) => threatById(id)!);
      expect(family('Threats').sort()).toEqual(threats.map((t) => `${t.externalId} ${t.name}`).sort());
      // Standards: every mapping no other family draws, so a key added to the
      // registry and left undrawn fails here.
      const OWNED = new Set(['obligations', 'owasp', 'atlas']);
      const standards = mappedIds(c)
        .filter(([key]) => !OWNED.has(key))
        .flatMap(([, ids]) => ids);
      const drawn = family('Standards');
      expect(drawn).toHaveLength(standards.length);
      for (const id of standards) expect(drawn.filter((d) => d === id || d.includes(` ${id}`) || d.startsWith(`${id}`)).length, id).toBeGreaterThan(0);
      const imda = imdaAgenticXrefs[c.id];
      const imdaRows = rows.filter((r) => r[0] === 'IMDA agentic');
      expect(imdaRows.map((r) => r[2])).toEqual(imda ? [imda.fit === 'direct' ? 'Direct fit' : 'Partial fit'] : []);
    });
  }

  test('control pages keep a phone free of sideways scroll', async ({ page }) => {
    await page.setViewportSize({ width: 390, height: 844 });
    for (const c of specified) {
      await page.goto(controlPagePath(c)!);
      const overflow = await page.evaluate(() => document.documentElement.scrollWidth - window.innerWidth);
      expect(overflow, c.id).toBeLessThanOrEqual(0);
    }
  });
});
