// obligation-lookup.spec.ts: the "Look up an article" box (OpenSpec change
// obligation-lookup). The ranking runs in Node on the same index the build
// writes, so the spec cases hold without a browser; the page checks drive the
// built site (preview server) and cover the keyboard, the shareable ?q= link,
// #lookup, the no-JS fallback and the axe sweep with results open. The last
// block checks the exact-clause join that links more crosswalk refs to their
// obligation pages.
import { test, expect } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';
import { existsSync, readFileSync } from 'node:fs';
import { join } from 'node:path';
import { lookupIndex, unknownAliasKeys } from '../src/lib/obligation-lookup';
import { rank, clauseKey, clauseKeys, parseQuery } from '../src/lib/obligation-lookup-core.js';
import { obligations, obligationById } from '../src/data/frameworks';
import { refs, refObligation } from '../src/data/crosswalk';

const index = lookupIndex();
const top = (q: string) => rank(index, q)[0]?.p;
const EM_DASH = String.fromCharCode(0x2014);

test.describe('lookup logic', () => {
  test('clause keys drop reading prefixes, keep digit dots, expand ranges and lists', () => {
    expect(clauseKey('Art. 14')).toBe('14');
    expect(clauseKey('Artículo 50')).toBe('50');
    expect(clauseKey('A.6')).toBe('a6');
    expect(clauseKey('6.1.2')).toBe('6.1.2');
    expect(clauseKey('principle 1.4')).toBe('1.4');
    expect(clauseKeys('Arts. 35–36')).toEqual(expect.arrayContaining(['35', '36']));
    expect(clauseKeys('Art. 5(1)(c) and 25')).toEqual(expect.arrayContaining(['5(1)(c)', '5', '25']));
  });

  test('the instrument alias is read from either end of the query', () => {
    expect(parseQuery('AI Act 14', index.aliases)).toEqual({ framework: 'eu-ai-act', clause: '14' });
    expect(parseQuery('Artículo 50 AI Act', index.aliases).framework).toBe('eu-ai-act');
    expect(parseQuery('iso42001 a6', index.aliases).framework).toBe('iso-42001');
    expect(parseQuery('Art. 14', index.aliases).framework).toBeNull();
  });

  test('the spec cases land on the right page', () => {
    expect(top('AI Act 14')).toBe('/obligations/aige-obl-euaia-art14');
    expect(top('EU AI Act Article 14')).toBe('/obligations/aige-obl-euaia-art14');
    expect(top('rgpd 35')).toBe('/obligations/aige-obl-gdpr-art35-36');
    expect(top('GDPR 35')).toBe('/obligations/aige-obl-gdpr-art35-36');
    expect(top('42001 A.6')).toBe('/obligations/aige-obl-iso42001-a6');
    expect(top('iso42001 a6')).toBe('/obligations/aige-obl-iso42001-a6');
    expect(top('nist govern')).toBe('/obligations/aige-obl-nistrmf-govern');
    expect(top('ai act 50')).toBe('/obligations/aige-obl-euaia-art50');
    expect(top('AI Act 6(3)')).toBe('/obligations/aige-obl-euaia-art6-3');
    expect(top('42001 6.1.2')).toMatch(/^\/resources\/crosswalk#topic-/);
  });

  test('a bare number searches every instrument, EU AI Act first, and 1.4 is not 14', () => {
    const hits = rank(index, 'Art. 14');
    expect(hits[0].p).toBe('/obligations/aige-obl-euaia-art14');
    expect(hits.some((h) => h.f === 'eu-cra')).toBe(true);
    expect(hits.some((h) => h.c.includes('1.4'))).toBe(false);
  });

  test('a sub-clause with no entry falls back to its parent; nonsense finds nothing', () => {
    expect(top('42001 A.6.2')).toBe('/obligations/aige-obl-iso42001-a6');
    expect(top('nist map 1')).toBe('/obligations/aige-obl-nistrmf-map');
    expect(top('GDPR 35-36')).toBe('/obligations/aige-obl-gdpr-art35-36');
    expect(rank(index, 'a99')).toEqual([]);
    expect(rank(index, 'xyzzy')).toEqual([]);
    expect(rank(index, 'AI Act 999')).toEqual([]);
  });

  test('an instrument alone lists its obligations', () => {
    const hits = rank(index, 'GDPR');
    expect(hits.length).toBeGreaterThan(3);
    expect(hits.every((h) => h.f === 'gdpr')).toBe(true);
  });
});

test.describe('lookup index', () => {
  test('one obligation entry per register row, aliases all known, nothing ambiguous', () => {
    const rows = index.entries.filter((e) => e.k === 'o');
    expect(rows).toHaveLength(obligations.length);
    expect(unknownAliasKeys()).toEqual([]);
    const aliases = index.aliases.map(([a]) => a.join(' '));
    expect(new Set(aliases).size).toBe(aliases.length);
    for (const generic of ['act', 'code', 'law', 'art', 'article']) {
      expect(aliases, generic).not.toContain(generic);
    }
  });

  test('every path resolves: obligation pages exist, topic anchors name a topic', () => {
    for (const e of index.entries) {
      if (e.k === 'o') {
        const id = e.p.replace('/obligations/', '');
        expect(obligationById(id), e.p).toBeTruthy();
      } else {
        expect(e.p, e.c).toMatch(/^\/resources\/crosswalk#topic-[a-z0-9-]+$/);
      }
    }
  });

  test('the built index matches the source, stays small and has no em dash', () => {
    const file = join('dist', 'obligations', 'lookup.json');
    test.skip(!existsSync(file), 'needs npm run build');
    const text = readFileSync(file, 'utf8');
    expect(JSON.parse(text).entries).toHaveLength(index.entries.length);
    expect(text.length).toBeLessThan(120_000);
    expect(text.includes(EM_DASH)).toBe(false);
    // content-lint does not read .js, so the two served scripts are checked here.
    for (const js of ['obligation-lookup-core.js', 'obligation-lookup.js']) {
      const path = join('dist', js);
      expect(existsSync(path), js).toBe(true);
      expect(readFileSync(path, 'utf8').includes(EM_DASH), js).toBe(false);
    }
    expect(readFileSync(join('dist', 'obligation-lookup-core.js'), 'utf8')).toContain('export function rank');
  });
});

test.describe('exact-clause join in the crosswalk', () => {
  test('410 or more refs reach an obligation page; the join is exact', () => {
    expect(refs.filter((r) => refObligation(r)).length).toBeGreaterThanOrEqual(410);
    const art87 = refs.find((r) => r.framework === 'eu-ai-act' && r.ref === 'Art. 87');
    expect(art87?.obligationId).toBe('AIGE-OBL-EUAIA-ART87');
    const iso612 = refs.find((r) => r.framework === 'iso-42001' && r.ref === '6.1.2');
    expect(iso612?.obligationId).toBeUndefined();
    for (const r of refs) {
      if (r.obligationId) expect(obligationById(r.obligationId), r.obligationId).toBeTruthy();
    }
  });
});

test.describe('lookup box on the site', () => {
  test('typing and Enter open the obligation page', async ({ page }) => {
    await page.goto('/obligations');
    const input = page.locator('#lookup');
    await input.fill('GDPR 22');
    await expect(page.locator('#olk-results .olk-row').first()).toContainText('GDPR Art. 22');
    await expect(input).toHaveAttribute('aria-expanded', 'true');
    await input.press('Enter');
    await expect(page).toHaveURL(/\/obligations\/aige-obl-gdpr-art22$/);
  });

  test('arrows move the active option; Esc clears', async ({ page }) => {
    await page.goto('/obligations');
    const input = page.locator('#lookup');
    await input.fill('Art. 14');
    const rows = page.locator('#olk-results [role="option"]');
    await expect(rows.nth(1)).toBeVisible();
    await input.press('ArrowDown');
    await input.press('ArrowDown');
    await expect(rows.nth(1)).toHaveAttribute('aria-selected', 'true');
    await expect(input).toHaveAttribute('aria-activedescendant', 'olk-opt-1');
    await input.press('Escape');
    await expect(rows).toHaveCount(0);
    await expect(input).toHaveValue('Art. 14');
    await input.press('Escape');
    await expect(input).toHaveValue('');
  });

  test('?q= prefills the box and shows the result; typing keeps the address shareable', async ({ page }) => {
    await page.goto('/obligations?q=ai+act+50');
    await expect(page.locator('#lookup')).toHaveValue('ai act 50');
    await expect(page.locator('#olk-results .olk-row a').first()).toHaveAttribute(
      'href',
      '/obligations/aige-obl-euaia-art50',
    );
    await page.locator('#lookup').fill('rgpd 35');
    await expect(page).toHaveURL(/[?&]q=rgpd\+35/);
  });

  test('#lookup focuses the box; no match offers the site search', async ({ page }) => {
    await page.goto('/obligations#lookup');
    // activeElement, not toBeFocused: a background worker's window reports
    // "inactive" even when the input holds focus. The focus is the browser's
    // own fragment focus (the input is the #lookup target), not a script's.
    await expect
      .poll(() => page.evaluate(() => document.activeElement?.id))
      .toBe('lookup');
    await page.locator('#lookup').fill('xyzzy');
    await expect(page.locator('.olk-empty')).toBeVisible();
    await page.locator('.olk-site').click();
    await expect(page.locator('#search-dialog')).toBeVisible();
  });

  test('the crosswalk carries the box before the matrix and it reaches obligation pages', async ({ page }) => {
    await page.goto('/resources/crosswalk');
    await expect(page.locator('form[role="search"].olk')).toHaveCount(1);
    const boxFirst = await page.evaluate(() => {
      const box = document.getElementById('olk');
      const matrix = document.querySelector('.cw-row');
      return !!box && !!matrix && !!(box.compareDocumentPosition(matrix) & Node.DOCUMENT_POSITION_FOLLOWING);
    });
    expect(boxFirst).toBe(true);
    await page.locator('#lookup').fill('AI Act 9');
    await expect(page.locator('#olk-results .olk-row').first()).toContainText('EU AI Act Art. 9');
    await page.locator('#lookup').press('Enter');
    await expect(page).toHaveURL(/\/obligations\/aige-obl-euaia-art9$/);
  });

  test('the topic panel links Art. 87 to its obligation page', async ({ page }) => {
    await page.goto('/resources/crosswalk');
    const link = page.locator('#topic-governance-accountability a.cw-ref-oblig[href="/obligations/aige-obl-euaia-art87"]');
    await expect(link).toHaveCount(1);
  });

  test('no axe violations with the results open', async ({ page }) => {
    await page.goto('/obligations');
    await page.locator('#lookup').fill('Art. 14');
    await expect(page.locator('#olk-results .olk-row').first()).toBeVisible();
    const results = await new AxeBuilder({ page }).include('#olk').analyze();
    expect(results.violations.map((v) => `${v.id}: ${v.help}`)).toEqual([]);
  });

  test('the home tile points at the box and Open controls stays second', async ({ page }) => {
    await page.goto('/');
    const tiles = page.locator('.tiles a');
    await expect(page.locator('.tiles a[href="/obligations#lookup"]')).toHaveCount(1);
    await expect(tiles.nth(1)).toHaveAttribute('href', '/controls');
  });
});

test.describe('lookup box without JavaScript', () => {
  test.use({ javaScriptEnabled: false });

  test('the examples are links to real pages and the register is listed', async ({ page }) => {
    await page.goto('/obligations');
    const examples = page.locator('#olk .olk-example');
    expect(await examples.count()).toBeGreaterThanOrEqual(3);
    for (const href of await examples.evaluateAll((els) => els.map((a) => a.getAttribute('href')))) {
      expect(href).toMatch(/^\/obligations\/aige-obl-/);
    }
    expect(await page.locator('.obx-rows .obx-row').count()).toBe(obligations.length);
  });
});
