// threats.spec.ts: the threat bridge (src/data/threats.ts, /resources/threats,
// /api/v1/threats.json, /resources/threats.csv). The data checks are pure Node;
// the page checks read the built HTML in dist (no browser needed) and one
// browser test exercises the CSS-only filters. Block w2-threats, v0.5.0.
import { test, expect } from '@playwright/test';
import { existsSync, readFileSync } from 'node:fs';
import { join } from 'node:path';
import { inlineScriptAllowed } from './helpers/csp';
import {
  threats,
  taxonomies,
  threatSources,
  threatProblems,
  threatAnchor,
  threatsIn,
  relatedOf,
  sourcesOf,
} from '../src/data/threats';

const PAGE = join('dist', 'resources', 'threats.html');
const API = join('dist', 'api', 'v1', 'threats.json');
const CSV = join('dist', 'resources', 'threats.csv');

test.describe('threat bridge data', () => {
  test('every reference resolves', () => {
    expect(threatProblems()).toEqual([]);
  });

  test('the OWASP lists are complete and each id appears once', () => {
    const llm = threatsIn('owasp-llm').map((r) => r.externalId);
    expect(llm).toEqual(Array.from({ length: 10 }, (_, i) => `LLM${String(i + 1).padStart(2, '0')}:2026`));
    const asi = threatsIn('owasp-asi').map((r) => r.externalId);
    expect(asi).toEqual(Array.from({ length: 10 }, (_, i) => `ASI${String(i + 1).padStart(2, '0')}`));
    const ids = threats.map((r) => r.externalId);
    expect(new Set(ids).size).toBe(ids.length);
  });

  test('external ids follow each catalogue\'s own form', () => {
    for (const row of threats) {
      const re = {
        'owasp-llm': /^LLM(0[1-9]|10):2026$/,
        'owasp-asi': /^ASI(0[1-9]|10)$/,
        'mitre-atlas': /^AML\.T\d{4}$/,
        'nist-aml': /^NISTAML\.\d{2,3}$/,
      }[row.taxonomy];
      expect(row.externalId, row.id).toMatch(re);
    }
  });

  test('related links hold in both directions and rows cite their catalogue', () => {
    for (const row of threats) {
      for (const other of relatedOf(row)) {
        expect(relatedOf(other).map((r) => r.id), `${other.id} -> ${row.id}`).toContain(row.id);
      }
      const sources = sourcesOf(row);
      const own = taxonomies.find((t) => t.id === row.taxonomy)!.source;
      expect(sources, row.id).toContain(own);
      for (const n of sources) expect(n >= 1 && n <= threatSources.length, `${row.id} [${n}]`).toBe(true);
    }
  });

  test('no em dash anywhere in the dataset', () => {
    const text = JSON.stringify({ threats, taxonomies, threatSources });
    expect(text.includes(String.fromCharCode(0x2014))).toBe(false);
  });
});

test.describe('threat bridge outputs (built site)', () => {
  test.skip(!existsSync(PAGE), 'run npm run build first');

  test('the page has one card per row, anchored, with no inline script', () => {
    const html = readFileSync(PAGE, 'utf8');
    for (const row of threats) expect(html, row.id).toContain(`id="${threatAnchor(row)}"`);
    // No inline script but the theme bootstrap, allowed by its sha256 in the CSP.
    const inline = [
      ...html.matchAll(/<script(?![^>]*\bsrc=)(?![^>]*application\/ld\+json)[^>]*>([\s\S]*?)<\/script>/g),
    ];
    expect(inline.map((m) => m[1]).filter((body) => !inlineScriptAllowed(body))).toEqual([]);
    expect(html).toContain('Illustrative, not a claim of conformity');
  });

  test('the API and the CSV carry every row', () => {
    const api = JSON.parse(readFileSync(API, 'utf8')) as { threats: { id: string }[]; notice: string };
    expect(api.threats.map((r) => r.id)).toEqual(threats.map((r) => r.id));
    expect(api.notice).toContain('not a claim of conformity');
    const lines = readFileSync(CSV, 'utf8').trim().split(/\r\n/);
    expect(lines.length).toBe(threats.length + 2);
  });
});

test('the catalogue and layer filters narrow the cards without script', async ({ page }) => {
  await page.goto('/resources/threats');
  const cards = page.locator('.tb-card');
  await expect(cards).toHaveCount(threats.length);
  await page.locator('label[for="tb-t-owasp-asi"]').click();
  await expect(page.locator('.tb-card:visible')).toHaveCount(threatsIn('owasp-asi').length);
  await page.locator('label[for="tb-l-2"]').click();
  const expected = threatsIn('owasp-asi').filter((r) => r.layers.includes(2)).length;
  await expect(page.locator('.tb-card:visible')).toHaveCount(expected);
});
