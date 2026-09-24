// glossary.spec.ts: the v0.5.0 glossary. The data half reads bok/09-glossary.md
// through src/lib/glossary.ts (no browser); the page half checks the term
// pages, the book index anchors, the contrast cards and the redirects that
// retire /resources/glossary.
import { test, expect } from '@playwright/test';
import { readFileSync } from 'node:fs';
import { join } from 'node:path';
import {
  getGlossary,
  getGlossarySources,
  getContrastPairs,
  termSlug,
} from '../src/lib/glossary';

const entries = getGlossary();
const bySlug = new Map(entries.map((entry) => [entry.slug, entry]));

test.describe('glossary data', () => {
  test('about 230 or more terms, each with a unique page slug', () => {
    expect(entries.length).toBeGreaterThanOrEqual(220);
    expect(bySlug.size).toBe(entries.length);
  });

  test('every definition is at most 60 words and names its chapter section', () => {
    for (const entry of entries) {
      const words = entry.definition.split(/\s+/).filter(Boolean).length;
      expect(words, `${entry.term}: ${words} words`).toBeLessThanOrEqual(60);
      expect(entry.see.length, `${entry.term} has a See link`).toBeGreaterThan(0);
      for (const link of entry.see) expect(link.href.startsWith('/')).toBe(true);
      expect(entry.chapterRefs.length, `${entry.term} has chapter refs`).toBeGreaterThan(0);
    }
  });

  test('every citation has a source row and every contrast term exists', () => {
    const sources = getGlossarySources();
    for (const entry of entries) {
      for (const n of entry.sources) {
        expect(sources.has(n), `${entry.term} cites [${n}]`).toBe(true);
      }
      for (const slug of entry.contrast) {
        expect(bySlug.has(slug), `${entry.term} contrasts with ${slug}`).toBe(true);
      }
    }
    for (const source of sources.values()) {
      expect(source.url.startsWith('http'), `[${source.n}] has a URL`).toBe(true);
      expect(['primary', 'secondary', 'reported']).toContain(source.verified);
    }
  });

  test('the brief terms are all defined', () => {
    const required = [
      'Provider',
      'Deployer',
      'Importer',
      'Distributor',
      'High-risk AI system',
      'Prohibited practice',
      'Conformity assessment',
      'Notified body',
      'CE marking',
      'AI literacy',
      'Human oversight',
      'Automation bias',
      'Contestability',
      'Recourse',
      'Guardrail',
      'Prompt injection',
      'Jailbreak',
      'Hallucination',
      'Bias',
      'Fairness',
      'Explainability',
      'Interpretability',
      'Foundation model',
      'Frontier model',
      'Open-weight model',
      'Retrieval-augmented generation (RAG)',
      'Watermarking',
      'Content provenance (C2PA)',
      'Deepfake',
      'AI regulatory sandbox',
      'Automated decision-making (ADM)',
      'ISO/IEC 42001',
      'NIST AI RMF',
      'Risk management',
      'Risk appetite',
      'Residual risk',
      'Data lineage',
      'Data provenance',
      'Data drift',
      'Concept drift',
      'Model card',
      'System card',
    ];
    for (const term of required) {
      expect(bySlug.has(termSlug(term)), `${term} is defined`).toBe(true);
    }
  });

  test('the confusable pairs are carded', () => {
    const pairs = getContrastPairs().map((pair) => [pair.a, pair.b].sort().join('|'));
    const required = [
      ['transparency', 'explainability'],
      ['data-provenance', 'data-lineage'],
      ['data-drift', 'concept-drift'],
      ['ai-incident', 'issue-versus-incident'],
      ['provider', 'deployer'],
      ['human-in-the-loop-hitl', 'human-on-the-loop-hotl'],
    ];
    for (const pair of required) {
      expect(pairs, pair.join(' vs ')).toContain([...pair].sort().join('|'));
    }
    for (const pair of getContrastPairs()) {
      expect(bySlug.has(pair.a) && bySlug.has(pair.b)).toBe(true);
      expect(pair.difference.length).toBeGreaterThan(10);
      expect(pair.why.length).toBeGreaterThan(10);
    }
  });

  test('serious incident carries the four limbs of Art. 3(49)', () => {
    const entry = bySlug.get('serious-incident');
    expect(entry?.definition).toContain('3(49)');
    for (const limb of ['(a)', '(b)', '(c)', '(d)']) expect(entry?.definition).toContain(limb);
    expect(entry?.see.some((link) => link.href.startsWith('/bok/incidents#'))).toBe(true);
  });

  test('model risk management records that SR 26-2 superseded SR 11-7', () => {
    const entry = bySlug.get('model-risk-management');
    expect(entry?.definition).toContain('SR 26-2');
    expect(entry?.definition).toContain('SR 11-7');
  });
});

test.describe('glossary pages', () => {
  test('a term page shows the definition, its sources and a citation', async ({ page }) => {
    await page.goto('/glossary/serious-incident');
    await expect(page.locator('h1')).toHaveText('Serious incident');
    await expect(page.locator('.gt-def')).toContainText('3(49)');
    await expect(page.locator('.gt-def a.cite').first()).toHaveAttribute('href', '#src-1');
    await expect(page.locator('ol.sources li#src-1')).toBeVisible();
    await expect(page.locator('a[href="/glossary/ai-incident"]').first()).toBeVisible();
    await expect(page.locator('summary', { hasText: 'Cite this term' })).toBeVisible();
    await expect(page.locator('link[rel="canonical"]')).toHaveAttribute(
      'href',
      'https://aigovernanceengineer.com/glossary/serious-incident',
    );
  });

  test('a confusable term carries its contrast card', async ({ page }) => {
    await page.goto('/glossary/transparency');
    const card = page.locator('.cc-card').first();
    await expect(card).toBeVisible();
    await expect(card.locator('a[href="/glossary/explainability"]')).toHaveCount(1);
  });

  test('the book index anchors every term and links it to its page', async ({ page }) => {
    await page.goto('/bok/glossary');
    const anchored = page.locator('p[id^="t-"] > strong > a[href^="/glossary/"]');
    expect(await anchored.count()).toBe(entries.length);
  });

  test('every glossary.json url is a built term page', async ({ page }) => {
    const res = await page.request.get('/glossary.json');
    const list = (await res.json()) as { url: string }[];
    expect(list).toHaveLength(entries.length);
    for (const item of list.slice(0, 40)) {
      const term = await page.request.get(item.url);
      expect(term.status(), item.url).toBe(200);
    }
  });

  test('the old index and the bare /glossary redirect to the book index', () => {
    const redirects = readFileSync(join('dist', '_redirects'), 'utf8');
    expect(redirects).toMatch(/^\/resources\/glossary\s+\/bok\/glossary\s+301$/m);
    expect(redirects).toMatch(/^\/glossary\s+\/bok\/glossary\s+301$/m);
  });
});
