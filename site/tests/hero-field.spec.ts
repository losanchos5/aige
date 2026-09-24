// hero-field.spec.ts: the home hero — a full-viewport gradient field
// (public/hero-field.js) under a floating, transparent header, the serif
// headline centred on it, one CTA and a strip of figures. Covers the layout,
// the header's overlay mode, the motion rules (reduced motion, pause control,
// no-JS fallback, forced colours), the strip's data and the text contrast
// over the field in both themes, sampled at several points of the blobs'
// paths, at desktop and phone widths and after a theme switch.

import { test, expect, type Page } from '@playwright/test';

import { layers } from '../src/data/stack';
import { workflows } from '../src/data/role';
import { chaptersOrdered } from '../src/data/chapters';
import { values } from '../src/data/values';
import { frameworks } from '../src/data/frameworks';
import { patterns } from '../src/data/patterns';
import { site } from '../src/data/site';

const HEADLINE = 'Governance you can run, not just read.';

test.describe('layout', () => {
  for (const { width, height } of [
    { width: 1440, height: 900 },
    { width: 390, height: 844 },
  ]) {
    test(`the hero fills the first viewport under the header at ${width}`, async ({ page }) => {
      await page.setViewportSize({ width, height });
      await page.goto('/');
      const m = await page.evaluate(() => {
        const hero = document.querySelector('.hero--field') as HTMLElement;
        const header = document.querySelector('header.site-header') as HTMLElement;
        const r = hero.getBoundingClientRect();
        return {
          top: r.top,
          height: r.height,
          vh: window.innerHeight,
          headerPos: getComputedStyle(header).position,
          headerBottom: header.getBoundingClientRect().bottom,
          titleTop: (document.querySelector('.hero-title') as HTMLElement).getBoundingClientRect()
            .top,
          scrollW: document.scrollingElement!.scrollWidth,
          clientW: document.scrollingElement!.clientWidth,
        };
      });
      expect(m.top).toBe(0);
      expect(m.height).toBeGreaterThanOrEqual(m.vh - 1);
      expect(m.headerPos).toBe('fixed');
      expect(m.titleTop).toBeGreaterThan(m.headerBottom);
      expect(m.scrollW).toBe(m.clientW);
    });
  }

  test('the headline is the serif display cut, centred, with "run" in italic', async ({ page }) => {
    await page.goto('/');
    const h1 = page.locator('.hero--field h1');
    await expect(h1).toHaveText(HEADLINE);
    await expect(h1.locator('em')).toHaveText('run');
    const s = await h1.evaluate((el) => {
      const cs = getComputedStyle(el);
      const em = getComputedStyle(el.querySelector('em')!);
      return { family: cs.fontFamily, align: cs.textAlign, emStyle: em.fontStyle };
    });
    expect(s.family).toMatch(/^"?Newsreader Display"?/);
    expect(s.align).toBe('center');
    expect(s.emStyle).toBe('italic');
    await page.evaluate(() => document.fonts.ready);
    expect(
      await page.evaluate(() => document.fonts.check('400 64px "Newsreader Display"')),
    ).toBe(true);
  });

  test('the hero carries exactly one CTA, to the Thesis', async ({ page }) => {
    await page.goto('/');
    const links = page.locator('.hero--field .hero-center a');
    await expect(links).toHaveCount(1);
    await expect(links).toHaveAttribute('href', '/thesis');
    await expect(links).toHaveText('Read the Thesis');
  });
});

test.describe('header overlay', () => {
  test('is transparent over the hero and takes its ground once scrolled', async ({ page }) => {
    await page.setViewportSize({ width: 1440, height: 900 });
    await page.goto('/');
    const header = page.locator('header.site-header');
    await expect(header).toHaveAttribute('data-overlay', '');
    const top = await header.evaluate((el) => {
      const cs = getComputedStyle(el);
      return { bg: cs.backgroundColor, blur: cs.backdropFilter, shadow: cs.boxShadow };
    });
    expect(top.bg).toBe('rgba(0, 0, 0, 0)');
    expect(top.blur).toBe('none');
    expect(top.shadow).toBe('none');

    await page.evaluate(() => window.scrollTo(0, 400));
    await expect(header).toHaveClass(/is-scrolled/);
    await expect
      .poll(() => header.evaluate((el) => getComputedStyle(el).backgroundColor))
      .not.toBe('rgba(0, 0, 0, 0)');
  });

  test('other pages keep the sticky bar', async ({ page }) => {
    await page.goto('/thesis');
    const header = page.locator('header.site-header');
    await expect(header).not.toHaveAttribute('data-overlay', /.*/);
    expect(await header.evaluate((el) => getComputedStyle(el).position)).toBe('sticky');
  });
});

test.describe('motion', () => {
  test('the field runs and the strip scrolls when motion is allowed', async ({ page }) => {
    await page.emulateMedia({ reducedMotion: 'no-preference' });
    await page.goto('/');
    await expect(page.locator('.hero-field')).toHaveAttribute('data-ready', '');
    await expect(page.locator('.hero-canvas')).toHaveAttribute('data-state', 'running');
    await expect(page.locator('.hero--field')).toHaveClass(/is-live/);
    await expect(page.locator('.facts-copy')).toBeVisible();
    const anim = await page
      .locator('.facts-track')
      .evaluate((el) => getComputedStyle(el).animationName);
    expect(anim).toBe('facts-scroll');
  });

  test('reduced motion: one still frame and a static strip', async ({ page }) => {
    await page.emulateMedia({ reducedMotion: 'reduce' });
    await page.goto('/');
    await expect(page.locator('.hero-field')).toHaveAttribute('data-ready', '');
    await expect(page.locator('.hero-canvas')).toHaveAttribute('data-state', 'static');
    await expect(page.locator('.hero--field')).not.toHaveClass(/is-live/);
    await expect(page.locator('.facts-copy')).toBeHidden();
    await expect(page.locator('.motion-toggle')).toBeHidden();
    const anim = await page
      .locator('.facts-track')
      .evaluate((el) => getComputedStyle(el).animationName);
    expect(anim).toBe('none');
  });

  test('the keyboard pause control stops the field and the strip', async ({ page }) => {
    await page.setViewportSize({ width: 1440, height: 900 });
    await page.emulateMedia({ reducedMotion: 'no-preference' });
    await page.goto('/');
    const toggle = page.locator('.motion-toggle');
    // Off screen (clipped by the hero) until keyboard focus reaches it.
    await expect(toggle).not.toBeInViewport();
    await page.locator('.hero-center a').focus();
    await page.keyboard.press('Tab');
    await expect(toggle).toBeFocused();
    await expect(toggle).toBeInViewport();
    await expect(toggle).toHaveAccessibleName('Pause motion');

    await page.keyboard.press('Enter');
    await expect(toggle).toHaveAttribute('aria-pressed', 'true');
    await expect(page.locator('.hero--field')).toHaveAttribute('data-paused', '');
    await expect(page.locator('.hero-canvas')).toHaveAttribute('data-state', 'paused');
    expect(
      await page.locator('.facts-track').evaluate((el) => getComputedStyle(el).animationPlayState),
    ).toBe('paused');

    await page.keyboard.press('Enter');
    await expect(toggle).toHaveAttribute('aria-pressed', 'false');
    await expect(page.locator('.hero-canvas')).toHaveAttribute('data-state', 'running');
  });

  test('a tap on the strip pauses and resumes the motion', async ({ browser }) => {
    const ctx = await browser.newContext({
      viewport: { width: 390, height: 844 },
      hasTouch: true,
      isMobile: true,
      reducedMotion: 'no-preference',
    });
    const page = await ctx.newPage();
    await page.goto('/');
    await expect(page.locator('.hero-canvas')).toHaveAttribute('data-state', 'running');
    await page.locator('.facts-window').tap();
    await expect(page.locator('.hero--field')).toHaveAttribute('data-paused', '');
    await expect(page.locator('.hero-canvas')).toHaveAttribute('data-state', 'paused');
    await expect(page.locator('.motion-toggle')).toHaveAttribute('aria-pressed', 'true');
    await page.locator('.facts-window').tap();
    await expect(page.locator('.hero-canvas')).toHaveAttribute('data-state', 'running');
    await ctx.close();
  });

  test('forced colours skip the canvas', async ({ browser }) => {
    const ctx = await browser.newContext({ forcedColors: 'active' });
    const page = await ctx.newPage();
    await page.goto('/');
    await expect(page.locator('.hero-canvas')).toHaveAttribute('data-state', 'off');
    await expect(page.locator('.hero-canvas')).toBeHidden();
    await ctx.close();
  });
});

test.describe('without JavaScript', () => {
  test.use({ javaScriptEnabled: false });

  test('the static fallback paints the field and the strip wraps', async ({ page }) => {
    await page.goto('/');
    const bg = await page
      .locator('.hero-field')
      .evaluate((el) => getComputedStyle(el).backgroundImage);
    expect(bg).toContain('radial-gradient');
    expect(
      await page.locator('.hero-canvas').evaluate((el) => getComputedStyle(el).visibility),
    ).toBe('hidden');
    await expect(page.locator('.facts-copy')).toBeHidden();
    await expect(page.locator('.facts').first()).toBeVisible();
  });
});

test.describe('figures strip', () => {
  test('every figure is read off the content modules', async ({ page }) => {
    await page.goto('/');
    const expected = [
      ['Stack layers', String(layers.length)],
      ['Workflows', String(workflows.length)],
      ['Chapters', String(chaptersOrdered.length)],
      ['Values', String(values.length)],
      ['Frameworks mapped', String(frameworks.length)],
      ['Patterns', String(patterns.length)],
      ['Body of Knowledge', `v${site.bokVersion}`],
      ['License', site.license],
    ];
    const got = await page.locator('.facts:not(.facts-copy) .fact').evaluateAll((items) =>
      items.map((li) => [
        li.querySelector('.fact-label')!.textContent!.trim(),
        li.querySelector('.fact-value')!.textContent!.trim(),
      ]),
    );
    expect(got).toEqual(expected);
    await expect(page.locator('.facts:not(.facts-copy)')).toHaveAttribute(
      'aria-label',
      'The discipline in figures',
    );
    const copy = page.locator('.facts-copy');
    await expect(copy).toHaveAttribute('aria-hidden', 'true');
    await expect(copy).toHaveAttribute('inert', '');
  });
});

// --- Contrast over the field ------------------------------------------------
// The text is hidden, the hero is captured, and every pixel under the
// headline's box and under the header bar is checked against the ink drawn
// there (the headline's colour; --ink-2, the bar's weakest text ink). The
// field is sampled as still frames (reduced motion) at points along the blobs'
// paths through a data-t0 injected into the page, plus the no-JS fallback.

type Region = { x: number; y: number; w: number; h: number };
type Sampled = { title: number; bar: number; facts: number };

async function worstContrast(page: Page): Promise<Sampled> {
  const geo = await page.evaluate(() => {
    const t = (document.querySelector('.hero-title') as HTMLElement).getBoundingClientRect();
    // The strip's labels and values, inset past their borders: their text sits
    // on the plate, which lets the field show through at 20%.
    const vw = window.innerWidth;
    const facts = [
      ...document.querySelectorAll<HTMLElement>('.facts:not(.facts-copy) .fact > span'),
    ]
      .map((el) => el.getBoundingClientRect())
      .filter((r) => r.width > 0 && r.left >= 0 && r.right <= vw)
      .map((r) => ({ x: r.left + 2, y: r.top + 2, w: r.width - 4, h: r.height - 4 }));
    const header = document.querySelector('header.site-header') as HTMLElement;
    const probe = document.createElement('span');
    probe.style.color = 'var(--ink-2)';
    document.body.appendChild(probe);
    const barInk = getComputedStyle(probe).color;
    probe.remove();
    return {
      title: { x: t.left, y: t.top, w: t.width, h: t.height },
      bar: { x: 0, y: 0, w: window.innerWidth, h: header.offsetHeight },
      facts,
      titleInk: getComputedStyle(document.querySelector('.hero-title')!).color,
      barInk,
    };
  });
  // Inline styles rather than addStyleTag, which never settles without JS; set
  // on every descendant with transitions off, since base.css's reduced-motion
  // rule gives every element a 0.01ms transition on all properties and the
  // inherited visibility change would otherwise sit mid-transition.
  await page.evaluate(() => {
    for (const root of document.querySelectorAll<HTMLElement>(
      '.hero-center, header.site-header .bar',
    )) {
      for (const el of [root, ...root.querySelectorAll<HTMLElement>('*')]) {
        el.style.setProperty('transition', 'none', 'important');
        el.style.setProperty('visibility', 'hidden', 'important');
      }
    }
    for (const el of document.querySelectorAll<HTMLElement>('.hero-facts, .hero-facts *')) {
      el.style.setProperty('transition', 'none', 'important');
      el.style.setProperty('color', 'transparent', 'important');
    }
  });
  const png = (await page.screenshot()).toString('base64');
  return page.evaluate(
    async ({ png, geo }) => {
      const img = new Image();
      img.src = `data:image/png;base64,${png}`;
      await img.decode();
      const c = document.createElement('canvas');
      c.width = img.width;
      c.height = img.height;
      const ctx = c.getContext('2d')!;
      ctx.drawImage(img, 0, 0);
      const ch = (v: number) => {
        const s = v / 255;
        return s <= 0.04045 ? s / 12.92 : Math.pow((s + 0.055) / 1.055, 2.4);
      };
      const lum = (r: number, g: number, b: number) =>
        0.2126 * ch(r) + 0.7152 * ch(g) + 0.0722 * ch(b);
      const inkLum = (str: string) => {
        const n = (str.match(/[\d.]+/g) || []).map(Number);
        return lum(n[0], n[1], n[2]);
      };
      const worst = (r: Region, ink: string) => {
        const li = inkLum(ink);
        const d = ctx.getImageData(Math.floor(r.x), Math.floor(r.y), Math.ceil(r.w), Math.ceil(r.h))
          .data;
        let min = Infinity;
        for (let i = 0; i < d.length; i += 4) {
          const lb = lum(d[i], d[i + 1], d[i + 2]);
          const ratio = (Math.max(lb, li) + 0.05) / (Math.min(lb, li) + 0.05);
          if (ratio < min) min = ratio;
        }
        return min;
      };
      return {
        title: worst(geo.title, geo.titleInk),
        bar: worst(geo.bar, geo.barInk),
        facts: Math.min(...geo.facts.map((r) => worst(r, geo.barInk))),
      };
    },
    { png, geo },
  );
}

async function withT0(page: Page, t0: number) {
  await page.route('**/', async (route) => {
    const res = await route.fetch();
    const html = (await res.text()).replace(
      'class="hero-canvas"',
      `class="hero-canvas" data-t0="${t0}"`,
    );
    await route.fulfill({ response: res, body: html });
  });
}

const WIDTHS = [
  { width: 1440, height: 900 },
  { width: 390, height: 844 },
];

function expectAA(c: Sampled, where: string) {
  expect(c.title, `headline ${where}`).toBeGreaterThanOrEqual(4.5);
  expect(c.bar, `header bar ${where}`).toBeGreaterThanOrEqual(4.5);
  expect(c.facts, `figures strip ${where}`).toBeGreaterThanOrEqual(4.5);
}

for (const scheme of ['light', 'dark'] as const) {
  for (const size of WIDTHS) {
    test(`text over the field holds AA along the blobs' paths (${scheme}, ${size.width})`, async ({
      page,
    }) => {
      test.slow();
      await page.setViewportSize(size);
      for (const t0 of [0, 40, 80, 120, 160, 200, 350, 500]) {
        await page.unrouteAll();
        await withT0(page, t0);
        await page.emulateMedia({ colorScheme: scheme, reducedMotion: 'reduce' });
        await page.goto('/');
        await expect(page.locator('.hero-canvas')).toHaveAttribute('data-state', 'static');
        await page.evaluate(() => document.fonts.ready);
        expectAA(await worstContrast(page), `at t=${t0}`);
      }
    });
  }

  test(`text holds AA after switching the theme to ${scheme} mid-session`, async ({ page }) => {
    const from = scheme === 'dark' ? 'light' : 'dark';
    await page.setViewportSize({ width: 1440, height: 900 });
    await page.emulateMedia({ colorScheme: from, reducedMotion: 'reduce' });
    await page.goto('/');
    await expect(page.locator('.hero-canvas')).toHaveAttribute('data-state', 'static');
    await page.evaluate((t) => {
      document.documentElement.setAttribute('data-theme', t);
    }, scheme);
    await page.waitForTimeout(200);
    const c = await worstContrast(page);
    expectAA(c, 'after the switch');
    // The field under the headline keeps its colour: the clear-to-ground veil
    // only lifts what it must, it does not wipe the box flat.
    const flat = await page.evaluate(() => {
      const cv = document.querySelector('.hero-canvas') as HTMLCanvasElement;
      const gl = cv.getContext('webgl')!;
      const px = new Uint8Array(4);
      gl.readPixels(Math.floor(cv.width * 0.72), Math.floor(cv.height * 0.5), 1, 1, gl.RGBA,
        gl.UNSIGNED_BYTE, px);
      return Array.from(px.slice(0, 3));
    });
    const ground = scheme === 'dark' ? [18, 20, 23] : [246, 244, 238];
    const dist = Math.max(...flat.map((v, i) => Math.abs(v - ground[i])));
    expect(dist, 'the field shows colour right of the headline').toBeGreaterThan(8);
  });

  test(`text over the static fallback holds AA (${scheme})`, async ({ browser }) => {
    const ctx = await browser.newContext({
      javaScriptEnabled: false,
      colorScheme: scheme,
      viewport: { width: 1440, height: 900 },
    });
    const page = await ctx.newPage();
    await page.goto('/', { waitUntil: 'networkidle' });
    // The pills' boxes are measured before the capture: let the web fonts
    // settle first, or a late swap moves the strip under the sample.
    await page.evaluate(() => document.fonts.ready);
    expectAA(await worstContrast(page), 'on the fallback');
    await ctx.close();
  });
}
