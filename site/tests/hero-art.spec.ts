// hero-art.spec.ts: the home hero while index.astro's HERO_ART is on: Monet's
// "The Seine at Giverny" under veils of the page ground, the serif headline
// and one CTA over it, the frameworks strip along its foot and the floating
// header above. Covers the image (it loads, is revealed, and is the request
// the head preloads), the text contrast over the painting in both themes at
// desktop and phone widths, the strip's motion and its pause control, and
// the page's width with real scrollbars. The file skips while HERO_ART is off
// (tests/hero-field.spec.ts covers the field).

import { createRequire } from 'node:module';

import { test, expect, chromium, type Page } from '@playwright/test';

// sharp through a plain require: imported as ESM under Playwright's loader, its
// semver dependency's require cycle throws (Node 22, 'Unexpected module status').
const sharp = createRequire(import.meta.url)('sharp') as typeof import('sharp');

const SIZES = [
  { width: 1440, height: 900 },
  { width: 390, height: 844 },
];

// The painting's files: one webp per srcset width.
const ART = /\/hero\/monet-seine-giverny-1897-(\d+)\.webp$/;

test.beforeEach(async ({ page }) => {
  await page.goto('/');
  test.skip(!(await page.locator('.hero--art').count()), 'HERO_ART is off');
});

test.describe('the painting', () => {
  // At DPR 1 with sizes="100vw", a 1440px window takes the 1600 and a phone
  // the 1200. A fresh context, so the count sees every request.
  for (const { size, width } of [
    { size: SIZES[0], width: 1600 },
    { size: SIZES[1], width: 1200 },
  ]) {
    test(`loads once, is revealed and takes the ${width} at ${size.width}`, async ({ browser }) => {
      const ctx = await browser.newContext({ viewport: size });
      const page = await ctx.newPage();
      const requests: string[] = [];
      page.on('request', (req) => {
        if (ART.test(new URL(req.url()).pathname)) requests.push(req.url());
      });
      await page.goto('/');
      const img = page.locator('img.hero-art-img');
      await expect(img).toHaveAttribute('data-loaded', '');
      const got = await img.evaluate((el: HTMLImageElement) => ({
        complete: el.complete,
        natural: el.naturalWidth,
        current: el.currentSrc,
        alt: el.getAttribute('alt'),
      }));
      expect(got.complete).toBe(true);
      expect(got.natural).toBeGreaterThan(0);
      expect(got.current).toMatch(ART);
      expect(Number(ART.exec(got.current)![1])).toBe(width);
      // Decorative: the painting says nothing the page needs.
      expect(got.alt).toBe('');
      await expect.poll(() => img.evaluate((el) => getComputedStyle(el).opacity)).toBe('1');
      // The preload and the image are one request, not two.
      expect(requests).toHaveLength(1);
      await ctx.close();
    });
  }

  test("the head preloads it from the image's own srcset, at high priority", async ({ page }) => {
    const link = page.locator('head link[rel="preload"][as="image"]');
    await expect(link).toHaveCount(1);
    const attrs = (el: Element, names: string[]) =>
      Object.fromEntries(names.map((n) => [n, el.getAttribute(n)]));
    const l = await link.evaluate(attrs, ['href', 'imagesrcset', 'imagesizes', 'fetchpriority']);
    const i = await page
      .locator('img.hero-art-img')
      .evaluate(attrs, ['src', 'srcset', 'sizes', 'fetchpriority']);
    expect(l.imagesrcset).toContain('/hero/monet-seine-giverny-1897-1600.webp 1600w');
    expect(l.imagesrcset).toContain('/hero/monet-seine-giverny-1897-2400.webp 2400w');
    // Any drift between the two would fetch the painting twice.
    expect(l.imagesrcset).toBe(i.srcset);
    expect(l.imagesizes).toBe(i.sizes);
    expect(l.href).toBe(i.src);
    // The plain src is the fallback for a browser without srcset: the 1600w,
    // never the 518 KB 2400w (audit ONPAGE R4).
    expect(i.src).toBe('/hero/monet-seine-giverny-1897-1600.webp');
    expect(l.fetchpriority).toBe('high');
    expect(i.fetchpriority).toBe('high');
  });
});

// --- Contrast over the painting ----------------------------------------------
// The glyphs are made transparent, the first viewport is captured once the
// painting is decoded, and every pixel under the text is checked against the
// ink the text is drawn in (its computed colour): each headline line's box,
// the <em>, the header's wordmark and links, and the strip's text. The
// thresholds sit a hair under today's worst pixels (headline 2.84, at the top
// of the "G" in the dark theme at 1440; <em> 3.25; header 4.76 worst and 5.20
// mean; strip 5.30), so the guard holds now and trips when a veil is thinned
// or an ink drifts. The capture is deterministic to a level or two per channel.

type Box = { x: number; y: number; w: number; h: number };
type Target = { name: string; boxes: Box[]; ink: [number, number, number]; opaque: boolean };
type Sampled = { name: string; worst: number; mean: number };

const channel = (v: number) => {
  const s = v / 255;
  return s <= 0.04045 ? s / 12.92 : Math.pow((s + 0.055) / 1.055, 2.4);
};
const luminance = (r: number, g: number, b: number) =>
  0.2126 * channel(r) + 0.7152 * channel(g) + 0.0722 * channel(b);

async function measure(page: Page) {
  const geo = await page.evaluate(() => {
    const vw = window.innerWidth;
    const vh = window.innerHeight;
    const onScreen = (r: DOMRect) =>
      r.width > 0 && r.height > 0 && r.left >= 0 && r.top >= 0 && r.right <= vw && r.bottom <= vh;
    const box = (r: DOMRect) => ({ x: r.left, y: r.top, w: r.width, h: r.height });
    // Inks go through a canvas pixel: color-mix() results compute to
    // color(srgb …), which is awkward to parse.
    const cx = document.createElement('canvas').getContext('2d', { willReadFrequently: true })!;
    const ink = (el: Element) => {
      cx.clearRect(0, 0, 1, 1);
      cx.fillStyle = getComputedStyle(el).color;
      cx.fillRect(0, 0, 1, 1);
      const [r, g, b, a] = cx.getImageData(0, 0, 1, 1).data;
      return { ink: [r, g, b] as [number, number, number], opaque: a === 255 };
    };
    const target = (name: string, el: Element, rects: DOMRect[]) => ({
      name,
      boxes: rects.filter(onScreen).map(box),
      ...ink(el),
    });
    const lines = [...document.querySelectorAll('.hero-line')].map((el, n) =>
      target(`headline line ${n + 1}`, el, [el.getBoundingClientRect()]),
    );
    const em = document.querySelector('.hero-title em')!;
    const nav = [
      ...document.querySelectorAll('header.site-header .bar :is(.wordmark, .nav-link, .nav-trigger)'),
    ]
      .filter((el) => el.checkVisibility())
      .map((el) => target(`header "${el.textContent!.trim()}"`, el, [el.getBoundingClientRect()]));
    // The strip's text: its leaf elements, the moving copy left out.
    const strip = [...document.querySelectorAll('.hero-facts:not([aria-hidden]) *')]
      .filter(
        (el) =>
          !el.closest('.facts-copy') &&
          el.children.length === 0 &&
          el.textContent!.trim() !== '' &&
          el.checkVisibility(),
      )
      .map((el) => target(`strip "${el.textContent!.trim()}"`, el, [...el.getClientRects()]));
    return { lines, em: target('em "run"', em, [...em.getClientRects()]), nav, strip };
  });

  // Transparent ink, with transitions off: base.css's reduced-motion rule
  // gives every element a 0.01ms transition, which would leave the colour
  // mid-change.
  await page.evaluate(() => {
    for (const el of document.querySelectorAll<HTMLElement>(
      '.hero-title, .hero-title *, header.site-header .bar, header.site-header .bar *, .hero-facts, .hero-facts *',
    )) {
      el.style.setProperty('transition', 'none', 'important');
      el.style.setProperty('color', 'transparent', 'important');
    }
  });
  const { data, info } = await sharp(await page.screenshot())
    .removeAlpha()
    .raw()
    .toBuffer({ resolveWithObject: true });

  const sample = (t: Target): Sampled => {
    expect(t.opaque, `${t.name}: the ink is opaque`).toBe(true);
    expect(t.boxes.length, `${t.name}: on screen`).toBeGreaterThan(0);
    const li = luminance(...t.ink);
    let worst = Infinity;
    let sum = 0;
    let n = 0;
    for (const b of t.boxes) {
      const x0 = Math.max(0, Math.floor(b.x));
      const y0 = Math.max(0, Math.floor(b.y));
      const x1 = Math.min(info.width, Math.ceil(b.x + b.w));
      const y1 = Math.min(info.height, Math.ceil(b.y + b.h));
      for (let y = y0; y < y1; y++) {
        for (let x = x0; x < x1; x++) {
          const i = (y * info.width + x) * info.channels;
          const lb = luminance(data[i], data[i + 1], data[i + 2]);
          const ratio = (Math.max(lb, li) + 0.05) / (Math.min(lb, li) + 0.05);
          worst = Math.min(worst, ratio);
          sum += ratio;
          n++;
        }
      }
    }
    return { name: t.name, worst, mean: sum / n };
  };

  return {
    lines: geo.lines.map(sample),
    em: sample(geo.em),
    nav: geo.nav.map(sample),
    strip: geo.strip.map(sample),
  };
}

for (const scheme of ['light', 'dark'] as const) {
  for (const size of SIZES) {
    test(`text over the painting holds its contrast (${scheme}, ${size.width})`, async ({
      page,
    }) => {
      const at = `(${scheme}, ${size.width})`;
      await page.emulateMedia({ colorScheme: scheme, reducedMotion: 'reduce' });
      await page.setViewportSize(size);
      await page.goto('/');
      const img = page.locator('img.hero-art-img');
      await expect(img).toHaveAttribute('data-loaded', '');
      // Loaded is not yet painted: a capture before the decode can still show
      // the placeholder under the text.
      await img.evaluate((el: HTMLImageElement) => el.decode());
      await page.evaluate(() => document.fonts.ready);
      const m = await measure(page);

      expect(m.lines).toHaveLength(2);
      for (const line of m.lines) {
        expect(line.worst, `${line.name} ${at}`).toBeGreaterThanOrEqual(2.8);
      }
      expect(m.em.worst, `${m.em.name} ${at}`).toBeGreaterThanOrEqual(3);
      // The wordmark always; the links only on the desktop bar (a phone keeps
      // them in the drawer).
      expect(m.nav.length).toBeGreaterThan(size.width >= 1024 ? 1 : 0);
      for (const link of m.nav) {
        expect(link.mean, `${link.name} mean ${at}`).toBeGreaterThanOrEqual(4.5);
        expect(link.worst, `${link.name} worst ${at}`).toBeGreaterThanOrEqual(4.3);
      }
      expect(m.strip.length).toBeGreaterThan(0);
      for (const item of m.strip) {
        expect(item.worst, `${item.name} ${at}`).toBeGreaterThanOrEqual(4.3);
      }
    });
  }
}

// --- The strip ----------------------------------------------------------------

test.describe('the strip', () => {
  test('scrolls when motion is allowed', async ({ page }) => {
    await page.emulateMedia({ reducedMotion: 'no-preference' });
    await page.goto('/');
    await expect(page.locator('.facts-copy')).toBeVisible();
    const track = page.locator('.facts-track');
    expect(await track.evaluate((el) => getComputedStyle(el).animationName)).toBe('facts-scroll');
    const at = () => track.evaluate((el) => getComputedStyle(el).transform);
    const first = await at();
    await expect.poll(at).not.toBe(first);
  });

  test('is still under reduced motion, with no toggle', async ({ page }) => {
    await page.emulateMedia({ reducedMotion: 'reduce' });
    await page.goto('/');
    await expect(page.locator('.facts-copy')).toBeHidden();
    await expect(page.locator('.motion-toggle')).toBeHidden();
    expect(
      await page.locator('.facts-track').evaluate((el) => getComputedStyle(el).animationName),
    ).toBe('none');
  });

  test('the keyboard reaches the pause control from the CTA', async ({ page }) => {
    await page.setViewportSize(SIZES[0]);
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
    await expect(toggle).toHaveAttribute('aria-pressed', 'false');

    const state = () =>
      page.locator('.facts-track').evaluate((el) => getComputedStyle(el).animationPlayState);
    await page.keyboard.press('Enter');
    await expect(toggle).toHaveAttribute('aria-pressed', 'true');
    await expect(page.locator('.hero-facts')).toHaveAttribute('data-paused', '');
    expect(await state()).toBe('paused');

    await page.keyboard.press('Enter');
    await expect(toggle).toHaveAttribute('aria-pressed', 'false');
    await expect(page.locator('.hero-facts')).not.toHaveAttribute('data-paused', /.*/);
    expect(await state()).toBe('running');
  });

  test('a tap on the strip pauses and resumes it on a phone', async ({ browser }) => {
    const ctx = await browser.newContext({
      viewport: SIZES[1],
      hasTouch: true,
      isMobile: true,
      reducedMotion: 'no-preference',
    });
    const page = await ctx.newPage();
    await page.goto('/');
    const strip = page.locator('.hero-facts');
    const toggle = page.locator('.motion-toggle');
    await expect(toggle).toHaveAttribute('aria-pressed', 'false');
    await page.locator('.facts-window').tap();
    await expect(strip).toHaveAttribute('data-paused', '');
    await expect(toggle).toHaveAttribute('aria-pressed', 'true');
    await page.locator('.facts-window').tap();
    await expect(strip).not.toHaveAttribute('data-paused', /.*/);
    await expect(toggle).toHaveAttribute('aria-pressed', 'false');
    await ctx.close();
  });
});

// --- Width ----------------------------------------------------------------------
// Headless Chromium hides scrollbars, which masks a page wider than the space
// left beside a real vertical scrollbar (100vw counts the scrollbar). This
// browser keeps them.

test('the page shows no horizontal scrollbar at 1440 with real scrollbars', async () => {
  const browser = await chromium.launch({ ignoreDefaultArgs: ['--hide-scrollbars'] });
  try {
    const page = await browser.newPage({
      viewport: SIZES[0],
      baseURL: test.info().project.use.baseURL,
    });
    await page.goto('/');
    await expect(page.locator('img.hero-art-img')).toHaveAttribute('data-loaded', '');
    const m = await page.evaluate(() => ({
      vertical: window.innerWidth - document.documentElement.clientWidth,
      horizontal: window.innerHeight - document.documentElement.clientHeight,
    }));
    // The vertical scrollbar is really there, so the check below means something.
    expect(m.vertical).toBeGreaterThan(0);
    expect(m.horizontal).toBe(0);
  } finally {
    await browser.close();
  }
});
