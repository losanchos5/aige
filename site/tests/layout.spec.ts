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

// Phone width for the Resources section. /resources/frameworks used to measure
// 408px here: the visually hidden table head kept `position: sticky` and its th
// escaped the 1px clip (TC-03). A mobile-emulated context (isMobile) widens the
// layout viewport to fit the content and hides this, so the check runs in a
// plain 390px desktop viewport against documentElement.clientWidth.
const PHONE = { w: 390, h: 844 };
const PHONE_PAGES = [
  '/resources',
  '/resources/frameworks',
  '/resources/crosswalk',
  '/resources/glossary',
];

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
      pageClientW: document.documentElement.clientWidth,
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

for (const path of PHONE_PAGES) {
  test(`no horizontal scroll on ${path} at ${PHONE.w}x${PHONE.h}`, async ({ page }) => {
    await page.setViewportSize({ width: PHONE.w, height: PHONE.h });
    await page.goto(path);
    await page.waitForLoadState('networkidle');
    const m = await measure(page);

    expect(m.pageClientW).toBe(PHONE.w);
    expect(m.pageScrollW).toBe(m.pageClientW);
  });
}

// TC-02: WCAG 1.4.10 reflow at 320px. The header (wordmark + three 44px
// buttons) overflowed by 13px and clipped the menu button; below 360px the bar
// now keeps only the mark, and the brand link stays named by its aria-label.
// /map is guarded too: it was reported 33px wide at 320 on its own content.
// Its cluster index could not shrink below one label + chips row; it now
// shrinks and wraps (map.css), which the 200% text check below also covers.
const REFLOW_PAGES = ['/about', '/thesis', '/bok/the-stack', '/resources/glossary', '/map'];

for (const path of REFLOW_PAGES) {
  test(`header reflows without horizontal scroll on ${path} at 320px`, async ({ page }) => {
    await page.setViewportSize({ width: 320, height: 640 });
    await page.goto(path);
    await page.waitForLoadState('networkidle');
    const m = await page.evaluate(() => {
      const se = document.scrollingElement as Element;
      const burger = document.querySelector('.site-header .burger') as Element;
      return {
        pageScrollW: se.scrollWidth,
        pageClientW: se.clientWidth,
        burgerRight: burger.getBoundingClientRect().right,
      };
    });

    expect(m.pageScrollW).toBe(m.pageClientW);
    expect(m.burgerRight).toBeLessThanOrEqual(m.pageClientW);
    await expect(
      page.locator('header.site-header').getByRole('link', { name: 'AI Governance Engineer, home' }),
    ).toBeVisible();
  });
}

// WCAG 1.4.4 at a phone width: with text at 200% (the root font size doubled,
// which every rem-sized token follows) the header's wordmark alone was wider
// than the bar, so the page scrolled sideways to ~435px at 390 and the menu
// button left the viewport. The bar now wraps; nothing in it may overflow.
const TEXT200_PAGES = ['/', '/thesis', '/bok/the-stack', '/role', '/resources/glossary', '/404'];

for (const path of TEXT200_PAGES) {
  test(`header holds with text at 200% on ${path} at 390px`, async ({ page }) => {
    await page.setViewportSize({ width: 390, height: 844 });
    await page.goto(path);
    await page.waitForLoadState('networkidle');
    await page.addStyleTag({ content: 'html { font-size: 200% !important; }' });
    const m = await page.evaluate(() => {
      const se = document.scrollingElement as Element;
      const header = document.querySelector('header.site-header') as Element;
      const burger = header.querySelector('.burger') as Element;
      const widest = Math.max(
        ...Array.from(header.querySelectorAll('*')).map((el) => el.getBoundingClientRect().right),
      );
      return {
        pageScrollW: se.scrollWidth,
        pageClientW: se.clientWidth,
        headerRight: Math.round(widest),
        burgerRight: burger.getBoundingClientRect().right,
      };
    });

    expect(m.pageScrollW).toBe(m.pageClientW);
    expect(m.headerRight).toBeLessThanOrEqual(m.pageClientW);
    expect(m.burgerRight).toBeLessThanOrEqual(m.pageClientW);
    await expect(page.locator('header.site-header .burger')).toBeVisible();
  });
}

// ...and the wrap is only for enlarged text: at normal size the brand and the
// buttons share one row on a phone and on the desktop breakpoints.
for (const width of [390, 360, 840, 1440]) {
  test(`header keeps one row at ${width}px with normal text`, async ({ page }) => {
    await page.setViewportSize({ width, height: 800 });
    await page.goto('/thesis');
    await page.waitForLoadState('networkidle');
    const rows = await page.evaluate(() => {
      const box = (sel: string) =>
        (document.querySelector(`header.site-header ${sel}`) as Element).getBoundingClientRect();
      const brand = box('.brand');
      const right = box('.right');
      return { brandTop: brand.top, brandBottom: brand.bottom, rightTop: right.top, rightBottom: right.bottom };
    });
    // Same row: the two boxes overlap vertically.
    expect(rows.rightTop).toBeLessThan(rows.brandBottom);
    expect(rows.brandTop).toBeLessThan(rows.rightBottom);
  });
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
