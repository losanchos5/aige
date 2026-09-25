// i18n.spec.ts: the translated pages (openspec/changes/i18n-site-rendering).
//
// It checks whatever build is in dist against the translations the test process
// can see, so it passes on both builds the change cares about:
//
//   - the committed build: the machine translations are switched off
//     (PUBLISHED_TRANSLATED_LOCALES in src/i18n/locales.ts is empty since
//     2026-09-25; their files stay in i18n/<lang>/): no translated route at
//     all, /es/thesis still the hand translation linked from /thesis, no
//     language switcher anywhere, no new alternates, and public/_redirects
//     sends the old translated URLs to the English pages;
//   - a fixture build, with pseudo-localised translations (two chapters and one
//     pattern in es and de, the Thesis in de), with the switch on:
//
//       node tests/fixtures/i18n/generate.mjs <tmp>
//       I18N_DIR=<tmp> npm run build
//       I18N_DIR=<tmp> npx playwright test tests/i18n.spec.ts
//
//     or a full mock run of the pipeline (every chapter, pattern and Thesis):
//       I18N_DIR=<tmp> node ../tools/i18n/translate.mjs --mock
//
// The UI strings are read from <I18N_DIR>/ui when I18N_DIR is set (or from
// I18N_UI_DIR when that is set), the same folder the pipeline writes to.
// The test process must see the same I18N_DIR (and I18N_UI_DIR) as the build:
// the expected routes come from src/lib/i18n-content.ts, which scans it.
import { test, expect, type Page } from '@playwright/test';
import { existsSync, readFileSync, readdirSync, statSync } from 'node:fs';
import { join, relative } from 'node:path';
import {
  alternatesFor,
  classifyRelative,
  headingMismatch,
  i18nDir,
  indexOf,
  localizeHref,
  translationIndex,
  translationsOnDisk,
  type TranslationFile,
} from '../src/lib/i18n-content';
import { placeholders, t, uiProblems } from '../src/i18n/ui';
import { calloutMap, englishLabelFor } from '../src/i18n/callouts';
import { I18N_PUBLISHED, TRANSLATED_LOCALES, isPublishedLocale } from '../src/i18n/locales';
import { nav } from '../src/data/nav';
import { chapterParts, chaptersOrdered } from '../src/data/chapters';

const DIST = 'dist';
const SITE = 'https://aigovernanceengineer.com';
const index = translationIndex();
const hasTranslations = index.files.length > 0;
const fixturePath = join(i18nDir(), 'FIXTURE.json');
const fixture: { langs: string[]; model: string } | undefined = existsSync(fixturePath)
  ? JSON.parse(readFileSync(fixturePath, 'utf8'))
  : undefined;

const uiEn: Record<string, string> = JSON.parse(readFileSync('src/i18n/ui.en.json', 'utf8'));

/** A fake translation, for the pure helpers. */
function fake(rel: string): TranslationFile {
  const file = classifyRelative(rel);
  if (!file) throw new Error(`not a translation path: ${rel}`);
  return file;
}

// ── Pure helpers ─────────────────────────────────────────────────────────

test.describe('i18n helpers', () => {
  test('ui.en.json names the nav groups and the book parts exactly as the data does', () => {
    for (const group of nav) expect(uiEn[`nav.${group.id}`], group.id).toBe(group.label);
    for (const part of chapterParts) expect(uiEn[`part.${part.id}`], part.id).toBe(part.title);
    for (const [key, value] of Object.entries(uiEn)) {
      expect(value.includes('\u2014'), `${key} has an em dash`).toBe(false);
    }
  });

  test('a translated UI file must keep every placeholder and carry no em dash', () => {
    expect(uiProblems({ 'notice.machine': 'Traduit par {model}.' })).toEqual([]);
    expect(uiProblems({ 'notice.machine': 'Traduit automatiquement.' })[0]).toContain('placeholders');
    expect(uiProblems({ 'header.search': 'Suche \u2014 jetzt' })[0]).toContain('em dash');
    expect(uiProblems({ 'no.such.key': 'x' })[0]).toContain('not a key');
    expect(uiProblems(['x'])[0]).toContain('flat JSON object');
    expect(placeholders('{b} and {a}')).toEqual(['a', 'b']);
  });

  test('t() fills placeholders and falls back to English', () => {
    expect(t('notice.machine', 'en', { model: 'm-1' })).toBe(
      'Machine translation by m-1; the English version is the reference.',
    );
    expect(t('header.search', 'xx')).toBe('Search');
    // The hand-written Spanish of /es/thesis's meta line predates the pipeline.
    expect(t('chapter.updated', 'es')).toBe('Actualizado');
  });

  test('callouts.json maps every callout label the book uses, for every language', () => {
    const map = calloutMap();
    const used = new Set<string>();
    const sources = [
      ...readdirSync('../bok').filter((f) => f.endsWith('.md')).map((f) => `../bok/${f}`),
      ...readdirSync('../bok/patterns').map((f) => `../bok/patterns/${f}`),
      '../THESIS.md',
    ];
    for (const file of sources) {
      const text = readFileSync(file, 'utf8');
      for (const m of text.matchAll(/^> \*\*((?:In practice|In short|Example|Anti-pattern|Postings|Note|Warning)[^*]*)\*\*/gm)) {
        used.add(m[1]);
      }
      for (const m of text.matchAll(/\*\*(Maps to:?)\*\*/g)) used.add(m[1]);
    }
    expect(used.size).toBeGreaterThan(0);
    for (const label of used) {
      for (const lang of TRANSLATED_LOCALES) {
        const translated = map[label]?.[lang];
        expect(translated, `callouts.json: "${label}" in ${lang}`).toBeTruthy();
        expect(translated!.includes('\u2014')).toBe(false);
        // "Maps to" and "Maps to:" share one translation; compare without the colon.
        const bare = (text: string | undefined) => text?.replace(/:$/, '');
        expect(bare(englishLabelFor(translated!, lang)), `${lang} "${translated}"`).toBe(bare(label));
        // As rendered: smartypants curls the apostrophe of "Offres d'emploi (note)."
        const curled = translated!.replace(/'/g, '\u2019');
        expect(bare(englishLabelFor(curled, lang)), `${lang} "${curled}"`).toBe(bare(label));
      }
    }
  });

  test('only real translation files are recognised', () => {
    expect(fake('es/bok/03-values-principles.md').path).toBe('/es/bok/values-and-principles');
    expect(fake('de/patterns/policy-card.md').path).toBe('/de/patterns/policy-card');
    expect(fake('fr/THESIS.md').path).toBe('/fr/thesis');
    // The hand-translated Spanish Thesis always wins; English is never a translation.
    expect(classifyRelative('es/THESIS.md')).toBeUndefined();
    expect(classifyRelative('en/bok/03-values-principles.md')).toBeUndefined();
    expect(classifyRelative('it/bok/03-values-principles.md')).toBeUndefined();
    expect(classifyRelative('es/bok/99-no-such-chapter.md')).toBeUndefined();
    expect(classifyRelative('es/patterns/no-such-pattern.md')).toBeUndefined();
    expect(classifyRelative('README.md')).toBeUndefined();
  });

  test('alternates name every language a page exists in, English first, then x-default', () => {
    const idx = indexOf([
      fake('es/bok/03-values-principles.md'),
      fake('de/bok/03-values-principles.md'),
      fake('fr/THESIS.md'),
    ]);
    const chapter = alternatesFor('/de/bok/values-and-principles', idx);
    expect(chapter).toEqual([
      { hreflang: 'en', href: `${SITE}/bok/values-and-principles` },
      { hreflang: 'es', href: `${SITE}/es/bok/values-and-principles` },
      { hreflang: 'de', href: `${SITE}/de/bok/values-and-principles` },
      { hreflang: 'x-default', href: `${SITE}/bok/values-and-principles` },
    ]);
    expect(alternatesFor('/bok/values-and-principles', idx)).toEqual(chapter);
    expect(alternatesFor('/bok/definition', idx)).toBeUndefined();
    expect(alternatesFor('/stack', idx)).toBeUndefined();
    // The home and the language landings are not translations of each other.
    expect(alternatesFor('/', idx)).toBeUndefined();
    expect(alternatesFor('/es', idx)).toBeUndefined();
    // The Thesis always has the hand-translated Spanish.
    expect(alternatesFor('/thesis', indexOf([]))?.map((a) => a.hreflang)).toEqual([
      'en',
      'es',
      'x-default',
    ]);
    expect(alternatesFor('/es/thesis', idx)?.map((a) => a.hreflang)).toEqual([
      'en',
      'es',
      'fr',
      'x-default',
    ]);
    expect(alternatesFor('/bok', idx)?.map((a) => a.href)).toEqual([
      `${SITE}/bok`,
      `${SITE}/es/bok`,
      `${SITE}/de/bok`,
      `${SITE}/bok`,
    ]);
  });

  test('internal links stay in the language only when the target exists in it', () => {
    const idx = indexOf([fake('es/bok/12-governance-program.md'), fake('es/patterns/policy-card.md')]);
    expect(localizeHref('/bok/governance-program#governance-culture', 'es', idx)).toBe(
      '/es/bok/governance-program#governance-culture',
    );
    expect(localizeHref('/bok/risk-management#x', 'es', idx)).toBe('/bok/risk-management#x');
    expect(localizeHref('/patterns/policy-card', 'es', idx)).toBe('/es/patterns/policy-card');
    expect(localizeHref('/bok', 'es', idx)).toBe('/es/bok');
    expect(localizeHref('/bok/governance-program', 'de', idx)).toBe('/bok/governance-program');
    // The hand translation has headings of its own: an anchored link stays English.
    expect(localizeHref('/thesis', 'es', idx)).toBe('/es/thesis');
    expect(localizeHref('/thesis#values', 'es', idx)).toBe('/thesis#values');
    expect(localizeHref('/stack#layer-1', 'es', idx)).toBe('/stack#layer-1');
    expect(localizeHref('https://example.org/bok/x', 'es', idx)).toBe('https://example.org/bok/x');
    expect(localizeHref('#sources', 'es', idx)).toBe('#sources');
  });

  test('a heading structure that differs from the English names the first difference', () => {
    const en = [
      { depth: 2, text: 'The eight values' },
      { depth: 3, text: '1. Governance is code' },
    ];
    expect(headingMismatch(en, [{ depth: 2, text: 'Los ocho' }, { depth: 3, text: '1. Código' }])).toBeUndefined();
    expect(headingMismatch(en, [{ depth: 2, text: 'Los ocho' }, { depth: 2, text: '1. Código' }])).toContain(
      'heading 2 "1. Código" is an h2, but its English counterpart "1. Governance is code" is an h3',
    );
    expect(headingMismatch(en, [{ depth: 2, text: 'Los ocho' }])).toContain('is missing from the translation');
    expect(headingMismatch([], [{ depth: 2, text: 'Extra' }])).toContain('has no English counterpart');
  });
});

// ── The build in dist ────────────────────────────────────────────────────

function htmlRoutes(dir: string): string[] {
  const out: string[] = [];
  const walk = (current: string) => {
    for (const name of readdirSync(current)) {
      const full = join(current, name);
      if (statSync(full).isDirectory()) walk(full);
      else if (name.endsWith('.html')) out.push(`/${relative(DIST, full).replace(/\\/g, '/').replace(/\.html$/, '')}`);
    }
  };
  walk(dir);
  return out;
}

/** Every built route under a translated language (/es, /es/..., ...). */
function translatedRoutesInDist(): string[] {
  const out: string[] = [];
  for (const lang of TRANSLATED_LOCALES) {
    if (existsSync(join(DIST, `${lang}.html`))) out.push(`/${lang}`);
    if (existsSync(join(DIST, lang))) out.push(...htmlRoutes(join(DIST, lang)));
  }
  return out.sort();
}

/** The routes the translations in I18N_DIR should produce, plus the hand Thesis. */
function expectedTranslatedRoutes(): string[] {
  return [
    '/es/thesis',
    ...index.files.map((file) => file.path),
    ...[...index.bokLangs].map((lang) => `/${lang}/bok`),
    ...[...index.langs].map((lang) => `/${lang}`),
  ].sort();
}

interface SitemapUrl {
  loc: string;
  links: { hreflang: string; href: string }[];
}

function sitemapUrls(): SitemapUrl[] {
  const xml = readdirSync(DIST)
    .filter((name) => /^sitemap-\d+\.xml$/.test(name))
    .map((name) => readFileSync(join(DIST, name), 'utf8'))
    .join('');
  return [...xml.matchAll(/<url>([\s\S]*?)<\/url>/g)].map((m) => ({
    loc: /<loc>([^<]+)<\/loc>/.exec(m[1])![1],
    links: [...m[1].matchAll(/<xhtml:link\b[^>]*\/?>/g)].map((link) => ({
      hreflang: /hreflang="([^"]+)"/.exec(link[0])![1],
      href: /href="([^"]+)"/.exec(link[0])![1],
    })),
  }));
}

async function alternatesOn(page: Page) {
  return page.$$eval('link[rel="alternate"][hreflang]', (links) =>
    links.map((link) => ({
      hreflang: link.getAttribute('hreflang')!,
      href: link.getAttribute('href')!,
    })),
  );
}

test.describe('translated routes in the build', () => {
  test('exactly the translations on disk are built, plus the hand-translated /es/thesis', () => {
    expect(translatedRoutesInDist()).toEqual(expectedTranslatedRoutes());
  });

  test('the sitemap lists the translated routes with the same alternates as the pages', () => {
    const urls = sitemapUrls();
    const locs = new Set(urls.map((u) => u.loc));
    for (const route of expectedTranslatedRoutes()) {
      expect(locs.has(`${SITE}${route}`), `sitemap lists ${route}`).toBe(true);
    }
    const langPrefix = new RegExp(`^${SITE}/(${TRANSLATED_LOCALES.join('|')})(/|$)`);
    const inSitemap = urls.filter((u) => langPrefix.test(u.loc)).map((u) => u.loc.slice(SITE.length));
    expect(inSitemap.sort()).toEqual(expectedTranslatedRoutes());
    for (const url of urls) {
      const path = url.loc.slice(SITE.length) || '/';
      const want = alternatesFor(path) ?? [];
      expect(url.links, `sitemap alternates of ${path}`).toEqual(
        want.map((alt) => ({ hreflang: alt.hreflang, href: alt.href })),
      );
    }
  });

  test('/es/thesis is still the hand translation, paired with /thesis', async ({ page }) => {
    await page.goto('/es/thesis');
    await expect(page.locator('html')).toHaveAttribute('lang', 'es');
    await expect(page.locator('h1')).toContainText('Tesis');
    await expect(page.locator('[data-i18n-notice]')).toHaveCount(0);
    expect(await alternatesOn(page)).toEqual(alternatesFor('/es/thesis'));
    await page.goto('/thesis');
    expect(await alternatesOn(page)).toEqual(alternatesFor('/thesis'));
    // Both languages exist: the page links its Spanish version in plain text,
    // and the switcher offers it too when machine translations are published.
    await expect(page.locator('main a[href="/es/thesis"][hreflang="es"]')).toHaveText('Leer en español');
    const switcher = page.locator('header.site-header [data-lang-switcher]');
    await expect(switcher).toHaveCount(I18N_PUBLISHED ? 1 : 0);
    if (I18N_PUBLISHED) {
      await expect(switcher.locator('a[hreflang="es"]')).toHaveAttribute('href', '/es/thesis');
    }
    await page.goto('/es/thesis');
    await expect(page.locator('main a[href="/thesis"][hreflang="en"]')).toHaveText('Read in English');
  });

  test('on a phone the switcher moves into the menu drawer', async ({ page }) => {
    test.skip(!I18N_PUBLISHED, 'machine translations are switched off: no switcher');
    await page.setViewportSize({ width: 390, height: 844 });
    await page.goto('/thesis');
    await expect(page.locator('header.site-header [data-lang-switcher]')).toBeHidden();
    await page.locator('header.site-header [data-nav-open]').click();
    const row = page.locator('#nav-drawer [data-lang-switcher-drawer]');
    await expect(row).toBeVisible();
    await expect(row.locator('a[hreflang="es"]')).toHaveAttribute('href', '/es/thesis');
    await expect(row.locator('a[aria-current="true"]')).toHaveAttribute('hreflang', 'en');
    // The bar keeps one row: brand and buttons share the header's top line.
    const brand = await page.locator('header.site-header .brand').boundingBox();
    const burger = await page.locator('header.site-header [data-nav-open]').boundingBox();
    expect(Math.abs(brand!.y + brand!.height / 2 - (burger!.y + burger!.height / 2))).toBeLessThan(8);
  });

  test('a page that exists only in English has no switcher and no alternates', async ({ page }) => {
    await page.goto('/stack');
    await expect(page.locator('[data-lang-switcher]')).toHaveCount(0);
    expect(await alternatesOn(page)).toEqual([]);
    await page.goto('/bok/definition');
    expect(await alternatesOn(page)).toEqual(alternatesFor('/bok/definition') ?? []);
  });

  test('with no translations, nothing translated is built and the chrome stays English', async ({ page }) => {
    test.skip(hasTranslations, 'the build has translations');
    expect(translatedRoutesInDist()).toEqual(['/es/thesis']);
    await page.goto('/bok/values-and-principles');
    await expect(page.locator('[data-lang-switcher]')).toHaveCount(0);
    await expect(page.locator('nav[aria-label="Site map"] [data-footer-langs]')).toHaveCount(0);
    await expect(page.locator('header.site-header [data-search-open]')).toHaveAttribute('aria-label', 'Search');
  });
});

// ── The switch off ───────────────────────────────────────────────────────

/** Every built HTML file under dist, as a site path with its `.html`. */
function htmlFilesInDist(): string[] {
  return htmlRoutes(DIST).map((route) => `${route}.html`);
}

/** The host's path redirect rules (public/_redirects, copied to dist). */
function redirectRules(): { from: string; to: string; status: string }[] {
  return readFileSync(join(DIST, '_redirects'), 'utf8')
    .split(/\r?\n/)
    .map((line) => line.trim())
    .filter((line) => line.startsWith('/'))
    .map((line) => {
      const [from, to, status] = line.split(/\s+/);
      return { from, to, status };
    });
}

/** True when a Cloudflare Pages source pattern (a trailing `*` splat) matches `path`. */
function ruleMatches(from: string, path: string): boolean {
  return from.endsWith('*') ? path.startsWith(from.slice(0, -1)) : path === from;
}

test.describe('machine translations switched off', () => {
  test.skip(I18N_PUBLISHED, 'machine translations are published (PUBLISHED_TRANSLATED_LOCALES)');

  test('the translation files stay on disk, but nothing but /es/thesis is built or listed', () => {
    // The committed i18n/ holds the translations; a scratch I18N_DIR may be empty.
    if (!process.env.I18N_DIR) expect(translationsOnDisk().length).toBeGreaterThan(0);
    expect(index.files).toEqual([]);
    expect(translatedRoutesInDist()).toEqual(['/es/thesis']);
    const langPrefix = new RegExp(`^${SITE}/(${TRANSLATED_LOCALES.join('|')})(/|$)`);
    const listed = sitemapUrls().filter((u) => langPrefix.test(u.loc)).map((u) => u.loc.slice(SITE.length));
    expect(listed).toEqual(['/es/thesis']);
  });

  test('no page carries the language switcher, the footer languages or a translation notice', () => {
    const files = htmlFilesInDist();
    expect(files.length).toBeGreaterThan(100);
    for (const file of files) {
      const html = readFileSync(join(DIST, file), 'utf8');
      expect(html, file).not.toMatch(/data-lang-switcher|data-footer-langs|data-i18n-notice/);
    }
  });

  test('no hreflang points at a hidden translation; /thesis and /es/thesis stay paired', () => {
    // Any alternate under /es, /fr, /de or /pt other than the hand translation.
    const langPrefix = new RegExp(`^${SITE}/(${TRANSLATED_LOCALES.join('|')})(/|$)`);
    const isHidden = (href: string) => href !== `${SITE}/es/thesis` && langPrefix.test(href);
    const pair = [
      { hreflang: 'en', href: `${SITE}/thesis` },
      { hreflang: 'es', href: `${SITE}/es/thesis` },
      { hreflang: 'x-default', href: `${SITE}/thesis` },
    ];
    for (const url of sitemapUrls()) {
      const path = url.loc.slice(SITE.length);
      if (path === '/thesis' || path === '/es/thesis') expect(url.links, path).toEqual(pair);
      for (const link of url.links) expect(isHidden(link.href), `sitemap ${path}: ${link.href}`).toBe(false);
    }
    for (const file of htmlFilesInDist()) {
      const html = readFileSync(join(DIST, file), 'utf8');
      const tags = [...html.matchAll(/<link\b[^>]*\brel="alternate"[^>]*\bhreflang="([^"]+)"[^>]*>/g)].map((m) => ({
        hreflang: m[1],
        href: /\bhref="([^"]+)"/.exec(m[0])?.[1] ?? '',
      }));
      if (file === '/thesis.html' || file === '/es/thesis.html') expect(tags, file).toEqual(pair);
      for (const tag of tags) expect(isHidden(tag.href), `${file}: ${tag.href}`).toBe(false);
    }
  });
});

test.describe('redirects of the hidden translations', () => {
  const oldUrls = (lang: string): [string, string][] => [
    [`/${lang}`, '/'],
    [`/${lang}/`, '/'],
    [`/${lang}/bok`, '/bok'],
    [`/${lang}/bok/values-and-principles`, '/bok/values-and-principles'],
    [`/${lang}/patterns/policy-card`, '/patterns/policy-card'],
    ...(lang === 'es' ? [] : ([[`/${lang}/thesis`, '/thesis']] as [string, string][])),
  ];

  test('a hidden language sends its old URLs to the English page with a 302; a published one has no rule', () => {
    const rules = redirectRules();
    for (const lang of TRANSLATED_LOCALES) {
      for (const [from, to] of oldUrls(lang)) {
        const rule = rules.find((r) => ruleMatches(r.from, from));
        if (isPublishedLocale(lang)) {
          expect(rule, `${from} must not be redirected while ${lang} is published`).toBeUndefined();
          continue;
        }
        expect(rule, `a rule for ${from}`).toBeDefined();
        expect(rule!.status, from).toBe('302');
        const splat = rule!.from.endsWith('*') ? from.slice(rule!.from.length - 1) : '';
        expect(rule!.to.replace(':splat', splat), from).toBe(to);
      }
    }
  });

  test('no rule catches the hand-translated /es/thesis', () => {
    for (const rule of redirectRules()) {
      expect(ruleMatches(rule.from, '/es/thesis'), rule.from).toBe(false);
    }
  });
});

// ── Each translated page ─────────────────────────────────────────────────

/** Heading ids of the article, in order. */
async function headingIds(page: Page) {
  return page.$$eval('article.prose :is(h2, h3, h4, h5, h6)[id]', (hs) => hs.map((h) => h.id));
}

/** Each figure or diagram of the article with the id of the heading it follows. */
async function placements(page: Page) {
  return page.$$eval('article.prose figure[data-figure], article.prose figure[data-diagram]', (figs) =>
    figs.map((fig) => {
      const all = [...document.querySelectorAll('article.prose :is(h2, h3, h4)[id]')];
      const before = all.filter(
        (h) => h.compareDocumentPosition(fig) & Node.DOCUMENT_POSITION_FOLLOWING,
      );
      return `${fig.getAttribute('data-figure') ?? fig.getAttribute('data-diagram')}@${before.at(-1)?.id ?? 'top'}`;
    }),
  );
}

/** The article's callouts by kind and its "Maps to" lines, in document order. */
async function callouts(page: Page) {
  return page.$$eval('article.prose aside.callout, article.prose p.maps-to', (els) =>
    els.map((el) => (el.matches('p.maps-to') ? 'maps-to' : el.getAttribute('data-kind'))),
  );
}

test.describe('each translated page', () => {
  test.skip(!hasTranslations, 'no translations in I18N_DIR');

  for (const file of index.files) {
    test(`${file.path} keeps the contract`, async ({ page }) => {
      await page.goto(file.englishPath);
      const englishIds = await headingIds(page);
      const englishPlacements = await placements(page);
      const englishCallouts = await callouts(page);

      const res = await page.goto(file.path);
      expect(res?.status()).toBe(200);
      await expect(page.locator('html')).toHaveAttribute('lang', file.lang);

      // The notice: the model, the English page, a way to report an error.
      const notice = page.locator('article [data-i18n-notice]');
      await expect(notice).toHaveCount(1);
      if (fixture) await expect(notice).toContainText(fixture.model);
      await expect(notice.locator('a[data-i18n-english]')).toHaveAttribute('href', file.englishPath);
      await expect(notice.locator('a[data-i18n-report]')).toHaveAttribute('href', /issues\/new/);

      // Canonical to itself; the alternates of every language it exists in.
      await expect(page.locator('link[rel="canonical"]')).toHaveAttribute('href', `${SITE}${file.path}`);
      const alternates = alternatesFor(file.path)!;
      expect(await alternatesOn(page)).toEqual(alternates);

      // The switcher lists exactly those languages, the current one marked.
      const switcher = page.locator('header.site-header [data-lang-switcher]');
      const offered = await switcher.locator('a[hreflang]').evaluateAll((as) =>
        as.map((a) => [a.getAttribute('hreflang'), a.getAttribute('href'), a.getAttribute('aria-current')]),
      );
      expect(offered).toEqual(
        alternates
          .filter((alt) => alt.hreflang !== 'x-default')
          .map((alt) => [alt.hreflang, new URL(alt.href).pathname, alt.hreflang === file.lang ? 'true' : null]),
      );

      // The English page's anchors, and its figures in the same sections.
      expect(await headingIds(page)).toEqual(englishIds);
      expect(await placements(page)).toEqual(englishPlacements);
      // Every callout keeps its kind and every "Maps to" line its style, whatever
      // the localized label (callouts.json) became once rendered.
      expect(await callouts(page)).toEqual(englishCallouts);

      // No link in the text leaves the language when the target exists in it.
      const links = await page.$$eval('article.prose a[href^="/"]:not([data-i18n-notice] a)', (as) =>
        as.map((a) => a.getAttribute('href')!),
      );
      for (const href of links) {
        const clean = href.split(/[?#]/)[0];
        const target = alternatesFor(clean)?.find((alt) => alt.hreflang === file.lang);
        if (target && !(file.lang === 'es' && clean === '/thesis' && href.includes('#'))) {
          expect(new URL(target.href).pathname, `${file.path} links ${href}`).toBe(clean);
        }
      }
    });
  }

  test('every language with translations has its landing, linked from the footer', async ({ page }) => {
    for (const lang of index.langs) {
      const res = await page.goto(`/${lang}`);
      expect(res?.status()).toBe(200);
      await expect(page.locator('html')).toHaveAttribute('lang', lang);
      expect(await alternatesOn(page)).toEqual([]);
      await expect(page.locator(`footer [data-footer-langs] a[href="/${lang}"]`)).toHaveCount(1);
    }
  });

  test('the book index lists every chapter, English where not translated', async ({ page }) => {
    for (const lang of index.bokLangs) {
      await page.goto(`/${lang}/bok`);
      const own = index.files.filter((f) => f.kind === 'chapter' && f.lang === lang);
      for (const file of own) {
        await expect(page.locator(`main a[href="${file.path}"]`)).toHaveCount(1);
      }
      await expect(page.locator('main a[hreflang="en"][href^="/bok/"]')).toHaveCount(chaptersOrdered.length - own.length);
    }
  });
});

// ── The pseudo-localised fixtures ────────────────────────────────────────

test.describe('fixture build', () => {
  test.skip(!fixture, 'no fixture build (I18N_DIR/FIXTURE.json)');
  test.skip(!I18N_PUBLISHED, 'machine translations are switched off (PUBLISHED_TRANSLATED_LOCALES)');

  test('links between translated pages stay in the language and their anchors resolve', async ({ page }) => {
    await page.goto('/es/bok/values-and-principles');
    const local = page.locator('article.prose a[href="/es/bok/governance-program#governance-culture"]');
    await expect(local).toHaveCount(1);
    await page.goto('/es/bok/governance-program#governance-culture');
    await expect(page.locator('#governance-culture')).toHaveCount(1);
    await page.goto('/es/patterns/sanctioned-ai-gateway');
    await expect(
      page.locator('article.prose a[href="/es/bok/governance-program#acceptable-use-of-ai-by-staff"]'),
    ).toHaveCount(1);
  });

  test('translated callout labels keep their kind', async ({ page }) => {
    await page.goto('/de/bok/governance-program');
    const practice = page.locator('aside.callout[data-kind="practice"] .callout-title');
    await expect(practice.first()).toHaveText(/^In der Praxis/);
    await expect(page.locator('article.prose p.maps-to').first()).toContainText('Zuordnung');
  });

  test('the chrome speaks the page language', async ({ page }) => {
    await page.goto('/es/bok/values-and-principles');
    const search = page.locator('header.site-header button[data-search-open]');
    await expect(search).toHaveAttribute('aria-label', t('header.search', 'es'));
    expect(t('header.search', 'es')).not.toBe('Search');
    await expect(page.locator('.doc-toc .toc-label')).toHaveText(t('doc.onThisPage', 'es'));
    await expect(page.locator('#search-dialog')).toHaveAttribute('data-msg-none', t('search.none', 'es'));
    await page.goto('/de/thesis');
    await expect(page.locator('html')).toHaveAttribute('lang', 'de');
    await expect(page.locator('[data-i18n-notice]')).toHaveCount(1);
  });

  test('search looks in the page language only', async ({ page }) => {
    const entry = JSON.parse(readFileSync(join(DIST, 'pagefind', 'pagefind-entry.json'), 'utf8'));
    expect(Object.keys(entry.languages)).toEqual(expect.arrayContaining(['en', 'es', 'de']));
    const search = (term: string) =>
      page.evaluate(async (query) => {
        // A variable specifier, so the type checker does not resolve the path.
        const src = '/pagefind/pagefind.js';
        const pagefind = await import(/* @vite-ignore */ src);
        await pagefind.options({});
        const found = await pagefind.search(query);
        return Promise.all(found.results.slice(0, 20).map(async (r: { data: () => Promise<{ url: string }> }) => (await r.data()).url));
      }, term);

    await page.goto('/de/bok/values-and-principles');
    const german = await search('välües');
    expect(german.length).toBeGreaterThan(0);
    for (const url of german) expect(url).toMatch(/^\/de\//);

    await page.goto('/bok/values-and-principles');
    const english = await search('values');
    expect(english.length).toBeGreaterThan(0);
    for (const url of english) expect(url).not.toMatch(/^\/(es|fr|de|pt)\//);
  });
});
