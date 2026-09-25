// perf.spec.ts: the load-performance guarantees of the SEO audit fix pass
// (2026-09-25, block perf). The theme script and the _headers rules have their
// own checks in infra.spec.ts and seo-infra.spec.ts; this file covers the rest:
// the toolkit's CSS stays on the toolkit, the home hero image is sized and
// capped, the frameworks link is a full tap target, the crosswalk's topic
// sections skip rendering until needed, and each figure page shows its PNG in an
// <img> and uses it as the social card. Round 2 (block imgperf): the figure PNG
// comes with AVIF/WebP previews in a <picture>, the hero has a 1920w file,
// prose/diagrams/figures CSS ships only with the pages that use it, the shared
// stylesheet is named site.[hash].css and /theme.js is no longer served. Pure
// reads of dist first, then the preview server.
import { test, expect } from '@playwright/test';
import { existsSync, readFileSync, readdirSync, statSync } from 'node:fs';
import { join, relative } from 'node:path';
import { figures } from '../src/data/figures';

const SITE_ORIGIN = 'https://aigovernanceengineer.com';
const read = (file: string) => readFileSync(join('dist', file), 'utf8');
const stylesheets = (html: string) =>
  [...html.matchAll(/<link\b[^>]*rel="?stylesheet"?[^>]*href="([^"]+)"/g)].map((m) => m[1]);

/** Big-endian PNG size from the IHDR chunk. */
function pngSize(file: string): [number, number] {
  const buf = readFileSync(file);
  expect(buf.subarray(0, 8).toString('hex')).toBe('89504e470d0a1a0a');
  return [buf.readUInt32BE(16), buf.readUInt32BE(20)];
}

test.describe('the toolkit stylesheet ships only with the toolkit', () => {
  // The shared chunk Astro names after agent-control-profile is the site's own
  // global CSS (tokens, base, prose, header, footer); the tool forms' rules
  // (.tool-*, src/components/toolkit/tool-docs.css) must not ride along.
  const TOOL_RULE = /\.tool-(form|field|input|result|options|guide)\b/;

  test('the agent control profile page links the tool CSS', () => {
    const css = stylesheets(read('toolkit/agent-control-profile.html'));
    expect(css.some((href) => TOOL_RULE.test(read(href.replace(/^\//, ''))))).toBe(true);
  });

  for (const file of ['index.html', 'bok.html', 'bok/eu-ai-act.html', 'bok/regulatory-map.html', 'resources/crosswalk.html']) {
    test(`dist/${file} links no tool CSS`, () => {
      for (const href of stylesheets(read(file))) {
        expect(TOOL_RULE.test(read(href.replace(/^\//, ''))), `${file} -> ${href}`).toBe(false);
      }
    });
  }
});

test.describe('home hero image', () => {
  test('carries its intrinsic size and the same capped sizes as its preload', () => {
    const html = read('index.html');
    const img = html.match(/<img\b[^>]*class="hero-art-img"[^>]*>/)?.[0] ?? '';
    expect(img).toContain('width="2400"');
    expect(img).toContain('height="1937"');
    const sizes = img.match(/\bsizes="([^"]+)"/)?.[1];
    expect(sizes).toBe('(min-width: 1200px) and (min-resolution: 2dppx) 50vw, 100vw');
    const preload = html.match(/<link\b[^>]*rel="preload"[^>]*as="image"[^>]*>/)?.[0] ?? '';
    expect(preload).toContain(`imagesizes="${sizes}"`);
    // Every srcset candidate is served, and a 1920w one sits between the 1600
    // and the 2400, so a 1920px desktop at DPR 1 does not take the 2400.
    const srcset = img.match(/\bsrcset="([^"]+)"/)?.[1] ?? '';
    const widths = srcset.split(',').map((candidate) => {
      const [url, w] = candidate.trim().split(/\s+/);
      expect(existsSync(join('dist', url)), url).toBe(true);
      return Number(w.replace('w', ''));
    });
    expect(widths).toEqual([1200, 1600, 1920, 2400]);
  });

  test('a 1920px window at DPR 1 takes the 1920w file, not the 2400w', async ({ browser }) => {
    const context = await browser.newContext({ viewport: { width: 1920, height: 1080 } });
    const page = await context.newPage();
    await page.goto('/');
    const src = await page.locator('img.hero-art-img').evaluate(async (el: HTMLImageElement) => {
      if (!el.complete) await new Promise((r) => el.addEventListener('load', r, { once: true }));
      return el.currentSrc;
    });
    expect(src).toContain('monet-seine-giverny-1897-1920.webp');
    await context.close();
  });

  for (const scale of [1, 2]) {
    test(`a 1440px window at DPR ${scale} takes the 1600w file`, async ({ browser }) => {
      const context = await browser.newContext({
        viewport: { width: 1440, height: 900 },
        deviceScaleFactor: scale,
      });
      const page = await context.newPage();
      await page.goto('/');
      const src = await page
        .locator('img.hero-art-img')
        .evaluate(async (el: HTMLImageElement) => {
          if (!el.complete) await new Promise((r) => el.addEventListener('load', r, { once: true }));
          return el.currentSrc;
        });
      expect(src).toContain('monet-seine-giverny-1897-1600.webp');
      await context.close();
    });
  }
});

test.describe('home frameworks link', () => {
  for (const width of [390, 1440]) {
    test(`is at least 44px tall at ${width}px`, async ({ page }) => {
      await page.setViewportSize({ width, height: 900 });
      await page.goto('/');
      const box = await page.locator('a.strip-kicker--link').boundingBox();
      expect(box).not.toBeNull();
      expect(box!.height).toBeGreaterThanOrEqual(44);
    });
  }
});

test.describe('crosswalk load work', () => {
  test('the topic sections skip rendering until they near the viewport', async ({ page }) => {
    await page.goto('/resources/crosswalk');
    const cv = await page
      .locator('article.cw-topic')
      .first()
      .evaluate((el) => getComputedStyle(el).getPropertyValue('content-visibility'));
    expect(cv).toBe('auto');
  });

  test('a grid cell opens the drawer through the delegated listener, and triggers gain aria-haspopup', async ({
    page,
  }) => {
    await page.goto('/resources/crosswalk');
    const trigger = page.locator('a.cw-cell[data-cw-open]').first();
    await expect(trigger).toHaveAttribute('aria-haspopup', 'dialog');
    await trigger.click();
    await expect(page.locator('#cw-drawer')).toBeVisible();
    await expect(page).not.toHaveURL(/#topic-/);
  });
});

test.describe('figure pages show their PNG', () => {
  const built = figures.filter((f) => existsSync(join('dist', 'figures', `${f.id}.html`)));

  test('there are figure pages to check', () => {
    expect(built.length).toBeGreaterThan(0);
  });

  for (const figure of built) {
    test(`/figures/${figure.id}: a lazy <img> of the light PNG, also the og:image`, () => {
      const html = read(`figures/${figure.id}.html`);
      const img = html.match(/<img\b[^>]*src="(\/downloads\/figures\/[^"]+-light-1600\.png)"[^>]*>/);
      expect(img, 'no <img> of the light 1600 PNG').not.toBeNull();
      const [tag, src] = img!;
      expect(tag).toContain('loading="lazy"');
      expect(tag).toMatch(/\balt="[^"]+"/);
      const [w, h] = pngSize(join('dist', src));
      expect(tag).toContain(`width="${w}"`);
      expect(tag).toContain(`height="${h}"`);
      expect(html).toContain(`<meta property="og:image" content="${SITE_ORIGIN}${src}"`);
    });
  }
});

test.describe('figure pages show light previews of their PNG', () => {
  const built = figures.filter((f) => existsSync(join('dist', 'figures', `${f.id}.html`)));

  for (const figure of built) {
    test(`/figures/${figure.id}: AVIF and WebP sources at 800w and 1600w, lighter than the PNG`, () => {
      const html = read(`figures/${figure.id}.html`);
      const picture = html.match(/<picture\b[^>]*>([\s\S]*?)<\/picture>/)?.[1] ?? '';
      const png = picture.match(/<img\b[^>]*src="([^"]+-light-1600\.png)"/)?.[1];
      expect(png, 'the <img> in the <picture> is the light PNG').toBeTruthy();
      const pngBytes = statSync(join('dist', png!)).size;
      const sources = [...picture.matchAll(/<source\b([^>]*)>/g)].map((m) => m[1]);
      expect(sources.map((attrs) => attrs.match(/type="([^"]+)"/)?.[1])).toEqual(['image/avif', 'image/webp']);
      for (const attrs of sources) {
        expect(attrs).toContain('sizes="(min-width: 26rem) 24rem, 100vw"');
        const ext = attrs.includes('image/avif') ? 'avif' : 'webp';
        const candidates = (attrs.match(/srcset="([^"]+)"/)?.[1] ?? '')
          .split(',')
          .map((candidate) => candidate.trim().split(/\s+/));
        expect(candidates.map(([, w]) => w)).toEqual(['800w', '1600w']);
        for (const [url, w] of candidates) {
          expect(url).toBe(png!.replace(/-1600\.png$/, `-${w.replace('w', '')}.${ext}`));
          expect(statSync(join('dist', url)).size, url).toBeLessThan(pngBytes);
        }
      }
    });
  }
});

test.describe('prose, diagram and figure CSS ships only where it is used', () => {
  // Each stylesheet's root rule as it opens a rule in the minified CSS (print.css
  // names .prose too, but only inside a selector list), and the classes whose
  // presence on a page needs that stylesheet (all three ship in reading.css).
  const SHEETS = [
    { name: 'prose.css', rule: /(?:^|[}\n])\.prose\{/, uses: (c: string) => c === 'prose' },
    {
      name: 'diagrams.css',
      rule: /(?:^|[}\n])\.diagram\{/,
      uses: (c: string) => /^diagram(-canvas|-note|-figcaption|-open|-enlarge|-dialog|--bare)?$/.test(c),
    },
    {
      name: 'figures.css',
      rule: /(?:^|[}\n])\.figc\{/,
      uses: (c: string) =>
        /^figure(--infographic|--poster|-canvas|-figcaption|-alt|-permalink)$/.test(c) ||
        ['figc', 'map-svg', 'reading-paths'].includes(c),
    },
  ];
  const pages = (dir: string): string[] =>
    readdirSync(dir).flatMap((name) => {
      const path = join(dir, name);
      if (statSync(path).isDirectory()) return name === '_astro' ? [] : pages(path);
      return name.endsWith('.html') ? [path] : [];
    });
  const css = new Map<string, string>();
  const cssOf = (html: string) =>
    stylesheets(html)
      .map((href) => {
        if (!css.has(href)) css.set(href, read(href.replace(/^\//, '')));
        return css.get(href)!;
      })
      .join('\n') + [...html.matchAll(/<style[^>]*>([\s\S]*?)<\/style>/g)].map((m) => m[1]).join('\n');

  test('every page that uses one of them links it', () => {
    const missing: string[] = [];
    for (const file of pages('dist')) {
      const html = readFileSync(file, 'utf8');
      const classes = [...html.matchAll(/\sclass="([^"]*)"/g)].flatMap((m) => m[1].split(/\s+/));
      const styles = cssOf(html);
      for (const sheet of SHEETS) {
        if (classes.some(sheet.uses) && !sheet.rule.test(styles)) {
          missing.push(`${relative('dist', file)} needs ${sheet.name}`);
        }
      }
    }
    expect(missing).toEqual([]);
  });

  for (const file of ['index.html', 'resources.html', 'resources/crosswalk.html', 'cases.html', 'patterns.html']) {
    test(`dist/${file}, which uses none of them, links none of them`, () => {
      const styles = cssOf(read(file));
      for (const sheet of SHEETS) expect(sheet.rule.test(styles), `${file} carries ${sheet.name}`).toBe(false);
    });
  }

  test('the stylesheet every page shares is named site.[hash].css and keeps the print rules', () => {
    for (const file of ['index.html', 'bok/eu-ai-act.html', 'resources/crosswalk.html', 'figures/pattern-map.html', '404.html']) {
      const shared = stylesheets(read(file)).filter((href) => /^\/_astro\/site\.[\w-]+\.css$/.test(href));
      expect(shared, file).toHaveLength(1);
      const body = read(shared[0].slice(1));
      expect(body).toContain('--l1-ink:');
      expect(body).toMatch(/@media print\{[^]*\.site-header/);
    }
  });
});

test('/theme.js is not served: the theme script only ships inline', () => {
  expect(existsSync(join('dist', 'theme.js'))).toBe(false);
});
