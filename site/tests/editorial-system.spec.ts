// editorial-system.spec.ts: the shared ground and type of the editorial
// restraint rework (openspec/changes/editorial-restraint/specs/editorial-system).
// One paper ground with a decorative grain and no mesh or tinted band;
// Newsreader for h1, Instrument Sans for reading, no Bricolage request; and no
// rendered text under 12px on phones.
import { test, expect } from '@playwright/test';

const SAMPLE = ['/', '/bok/why-now'];

test.describe('one paper ground', () => {
  for (const path of [...SAMPLE, '/role', '/stack', '/resources/frameworks']) {
    test(`${path} paints no mesh layer and no tinted band`, async ({ page }) => {
      await page.goto(path);
      await expect(page.locator('.bg-mesh')).toHaveCount(0);
      await expect(page.locator('section:is(.sec--tint, .sec--mesh, [data-hue])')).toHaveCount(0);
    });
  }

  for (const path of SAMPLE) {
    test(`${path} carries a grain layer that covers the viewport and stays decorative`, async ({ page }) => {
      await page.goto(path);
      const grain = page.locator('.page-grain');
      await expect(grain).toHaveCount(1);
      await expect(grain).toHaveAttribute('aria-hidden', 'true');
      const g = await grain.evaluate((el) => {
        const cs = getComputedStyle(el);
        const r = el.getBoundingClientRect();
        return {
          pointerEvents: cs.pointerEvents,
          image: cs.backgroundImage,
          covers: r.left <= 0 && r.top <= 0 && r.right >= innerWidth && r.bottom >= innerHeight,
        };
      });
      expect(g.pointerEvents).toBe('none');
      expect(g.image).not.toBe('none');
      expect(g.covers).toBe(true);
    });
  }
});

test('/bok/why-now sets the h1 in Newsreader and the prose in Instrument Sans, and never requests Bricolage', async ({
  page,
}) => {
  const fonts: string[] = [];
  page.on('request', (r) => {
    if (r.url().includes('/fonts/')) fonts.push(r.url());
  });
  await page.goto('/bok/why-now');
  await page.evaluate(() => document.fonts.ready);
  const fam = await page.evaluate(() => ({
    h1: getComputedStyle(document.querySelector('main h1')!).fontFamily,
    p: getComputedStyle(document.querySelector('main .prose p')!).fontFamily,
  }));
  expect(fam.h1).toMatch(/^"?Newsreader Display"?/);
  expect(fam.p).toMatch(/^"?Instrument Sans Variable"?/);
  expect(fonts.some((u) => u.includes('newsreader'))).toBe(true);
  expect(fonts.filter((u) => /bricolage/i.test(u))).toEqual([]);
});

test.describe('no text under 12px at 390px', () => {
  test.use({ viewport: { width: 390, height: 844 } });

  for (const path of SAMPLE) {
    test(`${path}`, async ({ page }) => {
      await page.goto(path);
      await page.evaluate(() => document.fonts.ready);
      const small = await page.evaluate(() => {
        const out: string[] = [];
        const walker = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT);
        const range = document.createRange();
        for (let n = walker.nextNode(); n; n = walker.nextNode()) {
          const text = n.textContent?.trim();
          const el = n.parentElement;
          if (!text || !el || !el.checkVisibility({ checkOpacity: true, checkVisibilityCSS: true })) continue;
          range.selectNodeContents(n);
          const box = range.getBoundingClientRect();
          // Visually hidden text (1px clip boxes) is for screen readers only.
          if (box.width < 2 || box.height < 2) continue;
          let px = parseFloat(getComputedStyle(el).fontSize);
          // SVG text is set in user units: scale to the rendered size.
          const svgText = el.closest('text');
          if (svgText instanceof SVGGraphicsElement) {
            const m = svgText.getScreenCTM();
            if (m) px *= Math.hypot(m.a, m.b);
          }
          if (px < 11.95) {
            out.push(`${el.tagName.toLowerCase()}.${[...el.classList].join('.')} ${px.toFixed(1)}px "${text.slice(0, 30)}"`);
          }
        }
        return out;
      });
      expect(small).toEqual([]);
    });
  }
});
