import { test, expect } from '@playwright/test';

// Doc reading-layout regression guard. The owner reported the reading well
// spilling under the "On this page" TOC (and the chapter rail growing a
// horizontal scrollbar) at ~1517px. These assertions hold the well inside its
// column and forbid any horizontal scroll — page-wide or in the rail — across
// the band from 1517px down to 900px, on both a wide-content chapter
// (/bok/why-now, which carries a bare URL) and a narrower one (/bok/the-stack).

const VIEWPORTS = [
  { w: 1517, h: 1210 },
  { w: 1440, h: 900 },
  { w: 1280, h: 800 },
  { w: 1100, h: 800 },
  { w: 1024, h: 768 },
  { w: 900, h: 800 },
];

const CHAPTER_PAGES = ['/bok/why-now', '/bok/the-stack'];
const OTHER_PAGES = ['/thesis', '/about', '/resources/glossary', '/map'];

async function measure(page: import('@playwright/test').Page) {
  return page.evaluate(() => {
    const se = document.scrollingElement as Element;
    const pick = (sel: string) => document.querySelector(sel);
    const right = (el: Element | null) =>
      el ? Math.round(el.getBoundingClientRect().right) : null;

    const sidebar = pick('.doc-sidebar');
    const nav = pick('.sidebar-nav');
    const prose = pick('.prose');
    const toc = pick('.doc-toc');
    const tocRect = toc ? toc.getBoundingClientRect() : null;
    const tocVisible = !!tocRect && tocRect.width > 0;

    return {
      pageScrollW: se.scrollWidth,
      pageClientW: se.clientWidth,
      sidebar: sidebar ? { sw: sidebar.scrollWidth, cw: sidebar.clientWidth } : null,
      nav: nav ? { sw: nav.scrollWidth, cw: nav.clientWidth } : null,
      proseRight: right(prose),
      tocLeft: tocVisible ? Math.round(tocRect!.left) : null,
    };
  });
}

for (const path of CHAPTER_PAGES) {
  for (const { w, h } of VIEWPORTS) {
    test(`doc layout holds on ${path} at ${w}x${h}`, async ({ page }) => {
      await page.setViewportSize({ width: w, height: h });
      await page.goto(path);
      await page.waitForLoadState('networkidle');
      const m = await measure(page);

      // No page-level horizontal scroll.
      expect(m.pageScrollW).toBe(m.pageClientW);

      // The chapter rail never scrolls sideways (its rows' negative margins used
      // to bleed 8px past the box and trip overflow-y:auto into a scrollbar).
      expect(m.sidebar).not.toBeNull();
      expect(m.sidebar!.sw).toBe(m.sidebar!.cw);
      expect(m.nav).not.toBeNull();
      expect(m.nav!.sw).toBe(m.nav!.cw);

      // Where the TOC is present (>=1100px) the well clears it with a >=24px gap.
      if (m.tocLeft !== null) {
        expect(m.proseRight).not.toBeNull();
        expect(m.proseRight!).toBeLessThanOrEqual(m.tocLeft - 24);
      }
    });
  }
}

for (const path of OTHER_PAGES) {
  for (const { w, h } of VIEWPORTS) {
    test(`no horizontal scroll on ${path} at ${w}x${h}`, async ({ page }) => {
      await page.setViewportSize({ width: w, height: h });
      await page.goto(path);
      await page.waitForLoadState('networkidle');
      const m = await measure(page);

      expect(m.pageScrollW).toBe(m.pageClientW);
      if (m.sidebar) expect(m.sidebar.sw).toBe(m.sidebar.cw);
      if (m.nav) expect(m.nav.sw).toBe(m.nav.cw);
    });
  }
}

// The owner's report shot, at their reported viewport, into H/.
test('screenshot why-now 1517 light', async ({ page }) => {
  await page.emulateMedia({ colorScheme: 'light' });
  await page.setViewportSize({ width: 1517, height: 1210 });
  await page.goto('/bok/why-now');
  await page.waitForLoadState('networkidle');
  await page.screenshot({
    path: 'tests/__screenshots__/H/why-now-1517-light.png',
    fullPage: true,
  });
});
