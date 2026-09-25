// seo-templates.spec.ts: the content-template fixes of the 2026-09-25 SEO audit
// (CONTENT C4/C7/C8/C9/C10, ONPAGE F4/F5/F14, SXO-08, visual V2), checked on the
// built files (pure Node reads of dist, like api.spec.ts) plus a few rendered
// pages:
// - a visible byline (author linked to /about with rel="author", and a dated
//   <time>) on one page of each content type, and none on the co-authored Thesis;
// - case pages link patterns to /patterns/<slug>, never to /bok/patterns#;
// - obligation titles carry no stutter, stay within budget, are unique, and
//   the obligation H1s never repeat a glossary term's H1;
// - pattern pages list the obligations whose register row names the pattern,
//   and the cases that call for it;
// - obligation pages render no "(verify)" working marker and do not repeat the
//   requirement inside the chain figure.
import { test, expect } from '@playwright/test';
import { existsSync, readFileSync, readdirSync } from 'node:fs';
import { join } from 'node:path';
import { obligations, obligationSlug } from '../src/data/frameworks';
import { patterns } from '../src/data/patterns';
import { cases } from '../src/data/cases';
import { getGlossary } from '../src/lib/glossary';

// Mirrors src/data/site.ts on purpose: a test that imported the constant it
// asserts on would pass however the value drifted.
const AUTHOR = 'Jorge García Aibar';
const SITE_SUFFIX = ' · AI Governance Engineer';

const html = (...parts: string[]): string => readFileSync(join('dist', ...parts), 'utf8');

const decode = (text: string): string =>
  text
    .replace(/&#(\d+);/g, (_, n: string) => String.fromCodePoint(Number(n)))
    .replace(/&#x([0-9a-f]+);/gi, (_, n: string) => String.fromCodePoint(parseInt(n, 16)))
    .replace(/&amp;/g, '&')
    .replace(/&quot;/g, '"')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/<[^>]+>/g, '')
    .trim();

const titleOf = (page: string): string => decode(/<title>([\s\S]*?)<\/title>/.exec(page)?.[1] ?? '');
/** The page's own title: Seo appends the site name only while the whole fits 60. */
const ownTitle = (page: string): string => titleOf(page).replace(SITE_SUFFIX, '');
const h1Of = (page: string): string => decode(/<h1\b[^>]*>([\s\S]*?)<\/h1>/.exec(page)?.[1] ?? '');
/** The page without its head and without script blocks: what a reader sees. */
const bodyOf = (page: string): string =>
  page.slice(page.indexOf('</head>')).replace(/<script\b[\s\S]*?<\/script>/g, '');

test.describe('visible byline', () => {
  const PAGES = [
    { kind: 'chapter', path: '/bok/the-stack' },
    { kind: 'pattern', path: '/patterns/policy-card' },
    { kind: 'glossary term', path: `/glossary/${getGlossary()[0].slug}` },
    { kind: 'obligation', path: '/obligations/aige-obl-euaia-art9' },
    { kind: 'case', path: '/cases/clearview-ai' },
  ];

  for (const { kind, path } of PAGES) {
    test(`a ${kind} page names its author under the H1, with a date`, async ({ page }) => {
      await page.goto(path);
      const author = page.locator('main a[rel="author"]');
      await expect(author).toHaveCount(1);
      await expect(author).toHaveText(AUTHOR);
      await expect(author).toHaveAttribute('href', '/about');
      await expect(author).toBeVisible();
      // The author sits in the same header as the H1, next to a machine-readable date.
      const header = page.locator('header:has(h1):has(a[rel="author"])');
      await expect(header).toHaveCount(1);
      await expect(header.locator('time[datetime]').first()).toHaveAttribute(
        'datetime',
        /^\d{4}-\d{2}-\d{2}$/,
      );
    });
  }

  test('the co-authored Thesis carries no single-author byline', async ({ page }) => {
    await page.goto('/thesis');
    await expect(page.locator('.ch-meta a[rel="author"]')).toHaveCount(0);
  });
});

test.describe('case pages', () => {
  test('patterns link their own pages, never the chapter 05 anchor', () => {
    for (const c of cases) {
      const page = html('cases', `${c.id}.html`);
      expect(page, c.id).not.toContain('href="/bok/patterns#');
      for (const ctl of c.control.controls) {
        if (!ctl.patternId) continue;
        const pattern = patterns.find((p) => p.id === ctl.patternId);
        expect(pattern, `${c.id}: ${ctl.patternId}`).toBeTruthy();
        expect(page, `${c.id} links /patterns/${pattern?.slug}`).toContain(
          `href="/patterns/${pattern?.slug}"`,
        );
      }
    }
  });

  test('every register row a case names exists and is linked', () => {
    const ids = new Set(obligations.map((o) => o.id));
    for (const c of cases) {
      const page = html('cases', `${c.id}.html`);
      for (const o of c.obligations) {
        if (!o.obligationId) continue;
        expect(ids.has(o.obligationId), `${c.id}: ${o.obligationId}`).toBe(true);
        expect(page).toContain(`href="/obligations/${o.obligationId.toLowerCase()}"`);
      }
    }
  });

  test('titles are short: the case name, not the headline', () => {
    for (const c of cases) {
      const title = ownTitle(html('cases', `${c.id}.html`));
      expect(title.length, title).toBeLessThanOrEqual(60);
      expect(title, c.id).toContain('AI incident case study');
      expect(h1Of(html('cases', `${c.id}.html`)), c.id).toBe(c.title);
    }
  });
});

test.describe('obligation titles and headings', () => {
  const pages = obligations.map((row) => ({ row, page: html('obligations', `${obligationSlug(row)}.html`) }));

  test('no title repeats a word back to back, and each stays within budget', () => {
    for (const { row, page } of pages) {
      const title = ownTitle(page);
      const words = title.toLowerCase().split(/\s+/);
      for (let i = 1; i < words.length; i++) {
        expect(words[i], `${row.id} stutters: ${title}`).not.toBe(words[i - 1]);
      }
      expect(title.length, title).toBeLessThanOrEqual(60);
      expect(title, `${row.id} ends on a dangling mark`).not.toMatch(/[:;,]…?$/);
    }
  });

  test('the two known look-alikes keep their correct titles', () => {
    const art10 = pages.find((p) => p.row.id === 'AIGE-OBL-EUAIA-ART10');
    const sb226 = pages.find((p) => p.row.id === 'AIGE-OBL-USUT-SB226');
    expect(titleOf(art10?.page ?? '')).toContain('EU AI Act Art. 10 data and data governance');
    expect(titleOf(sb226?.page ?? '')).toContain('Utah AI disclosure duties');
  });

  test('titles are unique', () => {
    const titles = pages.map((p) => titleOf(p.page));
    expect(new Set(titles).size).toBe(titles.length);
  });

  test('no obligation H1 repeats a glossary term H1', () => {
    const terms = new Set(getGlossary().map((e) => e.term.toLowerCase()));
    for (const { row, page } of pages) {
      const h1 = h1Of(page);
      expect(h1.length, row.id).toBeGreaterThan(0);
      expect(terms.has(h1.toLowerCase()), `${row.id} H1 "${h1}" is a glossary term`).toBe(false);
    }
    expect(h1Of(html('obligations', 'aige-obl-owasp-aibom.html'))).toBe('OWASP AIBOM');
  });

  test('the meta description is a concise lead, not the whole requirement', () => {
    for (const { row, page } of pages) {
      const description = decode(/<meta name="description" content="([^"]*)"/.exec(page)?.[1] ?? '');
      expect(description.length, row.id).toBeGreaterThanOrEqual(50);
      expect(description.length, `${row.id}: ${description}`).toBeLessThanOrEqual(155);
    }
  });

  test('no "(verify)" working marker reaches the page', () => {
    for (const { row, page } of pages) {
      expect(bodyOf(page), row.id).not.toMatch(/\bverify\)/);
    }
  });
});

test.describe('glossary term pages', () => {
  test('the meta description is the definition lead, within 155 characters', () => {
    for (const entry of getGlossary()) {
      const file = join('dist', 'glossary', `${entry.slug}.html`);
      if (!existsSync(file)) continue;
      const page = readFileSync(file, 'utf8');
      const description = decode(/<meta name="description" content="([^"]*)"/.exec(page)?.[1] ?? '');
      expect(description.length, `${entry.slug}: ${description}`).toBeLessThanOrEqual(155);
      expect(description, entry.slug).not.toMatch(/\[\d+\]/);
    }
  });

  test('a term used in pattern prose links those pattern pages', async ({ page }) => {
    // Find a term page that renders the section, then check its links resolve.
    const files = readdirSync(join('dist', 'glossary')).filter((f) => f.endsWith('.html'));
    const withPatterns = files.find((f) =>
      readFileSync(join('dist', 'glossary', f), 'utf8').includes('id="in-patterns"'),
    );
    expect(withPatterns, 'at least one term page lists patterns').toBeTruthy();
    await page.goto(`/glossary/${withPatterns?.replace(/\.html$/, '')}`);
    const links = page.locator('section[aria-labelledby="in-patterns"] a[href^="/patterns/"]');
    expect(await links.count()).toBeGreaterThan(0);
    expect(await links.count()).toBeLessThanOrEqual(10);
  });
});

test.describe('pattern pages: reverse relations', () => {
  test('each pattern lists the obligations whose row names it', () => {
    let checked = 0;
    for (const pattern of patterns) {
      const page = html('patterns', `${pattern.slug}.html`);
      const rows = obligations.filter((row) => row.patterns?.includes(pattern.id));
      if (rows.length === 0) {
        expect(page, pattern.slug).not.toContain('id="obligations-evidenced"');
        continue;
      }
      checked++;
      expect(page, pattern.slug).toContain('id="obligations-evidenced"');
      for (const row of rows) {
        expect(page, `${pattern.slug} -> ${row.id}`).toContain(`href="/obligations/${obligationSlug(row)}"`);
      }
    }
    expect(checked, 'some patterns have register mappings').toBeGreaterThan(0);
  });

  test('each pattern lists the cases that name it as the missing control', () => {
    for (const pattern of patterns) {
      const page = html('patterns', `${pattern.slug}.html`);
      const named = cases.filter((c) => c.control.controls.some((ctl) => ctl.patternId === pattern.id));
      for (const c of named) {
        expect(page, `${pattern.slug} -> ${c.id}`).toContain(`href="/cases/${c.id}"`);
      }
    }
  });

  test('the reverse sections are in the on-this-page TOC', async ({ page }) => {
    const pattern = patterns.find((p) => obligations.some((row) => row.patterns?.includes(p.id)));
    await page.goto(`/patterns/${pattern?.slug}`);
    await expect(page.locator('#obligations-evidenced')).toHaveText('Obligations this pattern evidences');
    await expect(page.locator('a[href="#obligations-evidenced"]').first()).toBeAttached();
  });
});

test.describe('obligation chain figure', () => {
  test('the figure does not restate the requirement the lede already gives', async ({ page }) => {
    const row = obligations.find((o) => o.id === 'AIGE-OBL-EUAIA-ART9');
    await page.goto('/obligations/aige-obl-euaia-art9');
    const figure = page.locator('figure.ob-chain');
    const probe = (row?.requirement ?? '').slice(0, 40);
    expect(probe.length).toBeGreaterThan(20);
    await expect(figure).not.toContainText(probe);
    await expect(page.locator('.hero-lede')).toContainText(probe);
  });
});
