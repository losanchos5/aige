// chart-tip.spec.ts: the chart tooltip island (public/chart-tip.js, OpenSpec
// chart-tooltips, design D9), one test per contract on a fixed sample of
// built pages. What a tooltip must say is the mark's accessible name read
// from the page's static HTML (fetched and parsed apart, so before the island
// has touched it), in the order of design D1 (data-tip, aria-label, the
// <title> child, the title attribute); on the /controls mosaic it is checked
// against the control data itself. Kit charts (Chart.astro) carry data-ctip
// already; the HTML grids (mosaic, lanes, coverage map, isotype, crosswalk
// matrix) are roots once they render <ChartTipScript /> and data-ctip.
import { test, expect, type Page } from '@playwright/test';
import { readdirSync, readFileSync, statSync } from 'node:fs';
import { join, relative, sep } from 'node:path';
import { controlPath, controls } from '../src/data/controls';

const DIST = 'dist';
/** A kit mark: any SVG element of a chart named by its own <title> or, for
 *  a linked label or row, by aria-label. */
const KIT_MARK = 'figure[data-ctip] svg :not(svg):is(:has(> title), [aria-label])';
/** A kit mark named by its own <title> (the native tooltip the island hides). */
const KIT_TITLED = 'figure[data-ctip] svg :not(svg):has(> title)';
/** A kit link: a mark or label that navigates. */
const KIT_LINK = 'figure[data-ctip] svg a[href]';
/** Kit charts on these pages (wide at 1440, narrow on a phone). */
const KIT_ROUTES = ['/agents', '/path', '/controls/crosswalk', '/resources'];

interface Mark {
  i: number;
  name: string;
  x: number;
  y: number;
  box: { left: number; right: number; top: number; bottom: number };
}

/** The visible elements matching `sel`, each with its name from the static
 *  HTML (same document order) and a point where it, or a child, is hit. */
async function marksOf(page: Page, sel: string): Promise<Mark[]> {
  const html = await (await page.request.get(page.url())).text();
  return page.evaluate(
    ([sel, html]) => {
      const name = (el: Element) => {
        const t = [...el.children].find((c) => c.localName === 'title');
        return (el.getAttribute('data-tip') || el.getAttribute('aria-label') || t?.textContent || el.getAttribute('title') || '').trim();
      };
      const still = [...new DOMParser().parseFromString(html, 'text/html').querySelectorAll(sel)];
      const live = [...document.querySelectorAll(sel)];
      const out: Mark[] = [];
      live.forEach((el, i) => {
        const r = el.getBoundingClientRect();
        if (!r.width || !r.height || r.bottom < 0 || r.top > innerHeight) return;
        // A point inside the box that hits this element (shapes are not boxes).
        for (let k = 0; k < 81; k++) {
          const x = r.left + ((k % 9) + 0.5) * (r.width / 9);
          const y = r.top + (Math.floor(k / 9) + 0.5) * (r.height / 9);
          const hit = document.elementFromPoint(x, y);
          if (hit && (hit === el || el.contains(hit))) {
            out.push({ i, name: name(still[i]), x, y, box: { left: r.left, right: r.right, top: r.top, bottom: r.bottom } });
            return;
          }
        }
      });
      return out;
    },
    [sel, html] as const,
  );
}

/** Scroll the first element matching `sel` into view, then list the marks. */
async function marksInView(page: Page, sel: string): Promise<Mark[]> {
  await page.evaluate((s) => {
    const all = [...document.querySelectorAll(s)].filter((el) => el.getBoundingClientRect().width > 0);
    all[0]?.scrollIntoView({ block: 'center', behavior: 'instant' });
  }, sel);
  return marksOf(page, sel);
}

const tip = (page: Page) => page.locator('.ctip');

async function tipBox(page: Page) {
  return page.evaluate(() => {
    const r = document.querySelector('.ctip')!.getBoundingClientRect();
    return { left: r.left, right: r.right, top: r.top, bottom: r.bottom, vw: document.documentElement.clientWidth, vh: document.documentElement.clientHeight };
  });
}

/** Up to three marks spread over the list: first, middle, last. */
const spread = <T,>(list: T[]) => [...new Set([0, Math.floor(list.length / 2), list.length - 1])].filter((i) => i >= 0 && i < list.length).map((i) => list[i]);

// ---- 1. hover, focus and tap show the mark's name ---------------------------
for (const route of KIT_ROUTES) {
  test(`${route}: hover shows each kit mark's name at once`, async ({ page }) => {
    await page.setViewportSize({ width: 1440, height: 900 });
    await page.goto(route);
    const marks = await marksInView(page, KIT_MARK);
    expect(marks.length, 'kit marks in view').toBeGreaterThan(0);
    for (const m of spread(marks)) {
      await page.mouse.move(m.x, m.y);
      await expect(tip(page)).toBeVisible();
      await expect(tip(page)).toHaveText(m.name);
    }
  });
}

test('keyboard focus on a kit link shows its name beside it', async ({ page }) => {
  await page.setViewportSize({ width: 1440, height: 900 });
  await page.goto('/agents');
  const links = await marksInView(page, KIT_LINK);
  expect(links.length).toBeGreaterThan(0);
  await page.keyboard.press('Tab');
  for (const m of spread(links)) {
    await page.locator(KIT_LINK).nth(m.i).focus();
    await expect(tip(page)).toHaveText(m.name);
  }
});

test('a tap on a kit mark shows its name', async ({ browser }) => {
  const context = await browser.newContext({ viewport: { width: 390, height: 800 }, hasTouch: true, isMobile: true });
  const page = await context.newPage();
  for (const route of KIT_ROUTES) {
    await page.goto(route);
    const marks = await marksInView(page, KIT_MARK);
    expect(marks.length, `${route}: kit marks in view`).toBeGreaterThan(0);
    const m = marks[0];
    await page.touchscreen.tap(m.x, m.y);
    await expect(tip(page), route).toHaveText(m.name);
  }
  await context.close();
});

// ---- 2. inside the viewport at 320, 390 and 1440 -----------------------------
for (const width of [320, 390, 1440]) {
  test(`at ${width} px the tooltip of the leftmost and rightmost marks stays inside the screen`, async ({ browser }) => {
    const touch = width < 1000;
    const context = await browser.newContext({ viewport: { width, height: 800 }, hasTouch: touch, isMobile: touch });
    const page = await context.newPage();
    for (const route of ['/controls/crosswalk', '/agents']) {
      await page.goto(route);
      const marks = await marksInView(page, KIT_MARK);
      expect(marks.length, `${route}: kit marks in view`).toBeGreaterThan(0);
      const byX = [...marks].sort((a, b) => a.box.left - b.box.left);
      for (const m of [byX[0], byX[byX.length - 1]]) {
        if (touch) await page.touchscreen.tap(m.x, m.y);
        else await page.mouse.move(m.x, m.y);
        await expect(tip(page)).toHaveText(m.name);
        const b = await tipBox(page);
        expect(b.left, `${route} ${m.name}: left edge`).toBeGreaterThanOrEqual(0);
        expect(b.right, `${route} ${m.name}: right edge`).toBeLessThanOrEqual(b.vw);
        expect(b.top, `${route} ${m.name}: top edge`).toBeGreaterThanOrEqual(0);
        expect(b.bottom, `${route} ${m.name}: bottom edge`).toBeLessThanOrEqual(b.vh);
      }
    }
    await context.close();
  });
}

// ---- 3. Escape closes and focus stays ----------------------------------------
test('Escape closes the tooltip and leaves focus on the mark', async ({ page }) => {
  await page.setViewportSize({ width: 1440, height: 900 });
  await page.goto('/controls/crosswalk');
  const links = await marksInView(page, KIT_LINK);
  await page.keyboard.press('Tab');
  const link = page.locator(KIT_LINK).nth(links[0].i);
  await link.focus();
  await expect(tip(page)).toHaveText(links[0].name);
  await page.keyboard.press('Escape');
  await expect(tip(page)).toBeHidden();
  expect(await link.evaluate((el) => el === document.activeElement)).toBe(true);
});

// ---- 4. touch: first tap names, second follows; drawers still open -----------
test('the first tap on a kit link shows its name without leaving, the second follows it', async ({ browser }) => {
  const context = await browser.newContext({ viewport: { width: 390, height: 800 }, hasTouch: true, isMobile: true });
  const page = await context.newPage();
  await page.goto('/agents');
  const links = await marksInView(page, KIT_LINK);
  expect(links.length).toBeGreaterThan(0);
  const m = links[0];
  const href = await page.locator(KIT_LINK).nth(m.i).getAttribute('href');
  const before = page.url();
  await page.touchscreen.tap(m.x, m.y);
  await expect(tip(page)).toHaveText(m.name);
  await page.waitForTimeout(300);
  expect(page.url(), 'first tap stays').toBe(before);
  await page.touchscreen.tap(m.x, m.y);
  await page.waitForURL(new URL(href!, before).href);
  await context.close();
});

test('a tap on a crosswalk matrix cell still opens its drawer', async ({ browser }) => {
  const context = await browser.newContext({ viewport: { width: 390, height: 800 }, hasTouch: true, isMobile: true });
  const page = await context.newPage();
  await page.goto('/resources/crosswalk');
  const cells = await marksInView(page, '[data-ctip] [data-cw-open]');
  expect(cells.length, 'cells in a chart-tip root').toBeGreaterThan(0);
  await page.touchscreen.tap(cells[0].x, cells[0].y);
  await expect(page.locator('#cw-drawer')).toBeVisible();
  await context.close();
});

// ---- 5. no native tooltip while open, <title> back after ---------------------
test('while open a mark lends its <title> and gets it back on close', async ({ page }) => {
  await page.setViewportSize({ width: 1440, height: 900 });
  await page.goto('/agents');
  const marks = await marksInView(page, KIT_TITLED);
  const m = marks[0];
  const mark = page.locator(KIT_TITLED).nth(m.i);
  const before = await mark.evaluate((el) => el.outerHTML);
  await page.mouse.move(m.x, m.y);
  await expect(tip(page)).toHaveText(m.name);
  // Nothing from the pointer up to the figure is a native tooltip source now.
  const native = await page.evaluate(([x, y]) => {
    let el = document.elementFromPoint(x, y);
    const out: string[] = [];
    for (; el && !el.matches('figure'); el = el.parentElement) {
      if ([...el.children].some((c) => c.localName === 'title') && el.localName !== 'svg') out.push(el.localName);
      if (el.hasAttribute('title')) out.push(`${el.localName}[title]`);
    }
    return out;
  }, [m.x, m.y] as const);
  expect(native, 'no native tooltip source above the pointer').toEqual([]);
  await page.mouse.move(1, 1);
  await expect(tip(page)).toBeHidden();
  expect(await page.locator(KIT_TITLED).nth(m.i).evaluate((el) => el.outerHTML)).toBe(before);
});

// ---- 6. without JavaScript nothing breaks ------------------------------------
test('with JavaScript off the sample pages log no errors and the marks keep their <title>', async ({ browser }) => {
  const context = await browser.newContext({ javaScriptEnabled: false });
  const page = await context.newPage();
  const errors: string[] = [];
  page.on('console', (msg) => {
    if (msg.type() === 'error') errors.push(`${page.url()}: ${msg.text()}`);
  });
  page.on('pageerror', (err) => errors.push(`${page.url()}: ${err.message}`));
  for (const route of KIT_ROUTES) {
    await page.goto(route);
    expect(await page.locator(KIT_TITLED).count(), `${route}: titled marks`).toBeGreaterThan(0);
  }
  expect(errors).toEqual([]);
  await context.close();
});

// ---- 7. loaded once where a root is, nowhere else ----------------------------
test('in dist every page with a chart-tip root loads /chart-tip.js once and no other page loads it', () => {
  const files = (dir: string): string[] =>
    readdirSync(dir).flatMap((n) => {
      const p = join(dir, n);
      return statSync(p).isDirectory() ? files(p) : n.endsWith('.html') ? [p] : [];
    });
  const wrong: string[] = [];
  let roots = 0;
  for (const file of files(DIST)) {
    const html = readFileSync(file, 'utf8');
    const root = /\sdata-ctip(?![-\w])/.test(html);
    const loads = (html.match(/<script[^>]*\ssrc="\/chart-tip\.js"/g) ?? []).length;
    if (root) roots += 1;
    if (loads !== (root ? 1 : 0)) wrong.push(`${relative(DIST, file).split(sep).join('/')}: root ${root}, loads ${loads}`);
  }
  expect(roots).toBeGreaterThan(10);
  expect(wrong).toEqual([]);
});

// ---- HTML chart grids (roots once they render ChartTipScript) -----------------
test('/controls mosaic: hovering a tile names its control by id and title', async ({ page }) => {
  await page.setViewportSize({ width: 1440, height: 900 });
  await page.goto('/controls');
  const sel = '[data-ctip] .cmo-cells a';
  const tiles = await marksInView(page, sel);
  expect(tiles.length, 'mosaic tiles in a chart-tip root').toBeGreaterThan(0);
  for (const m of spread(tiles)) {
    const href = await page.locator(sel).nth(m.i).getAttribute('href');
    const c = controls.find((x) => controlPath(x) === href)!;
    expect(c, href ?? '').toBeTruthy();
    await page.mouse.move(m.x, m.y);
    await expect(tip(page)).toContainText(c.id);
    await expect(tip(page)).toContainText(c.title);
    // The tile's title attribute steps aside while open.
    expect(await page.locator(sel).nth(m.i).getAttribute('title')).toBeNull();
  }
  await page.mouse.move(1, 1);
  await expect(tip(page)).toBeHidden();
  const first = page.locator(sel).nth(tiles[0].i);
  expect(await first.getAttribute('title')).toBe(tiles[0].name);
});

for (const { route, sel } of [
  { route: '/controls', sel: '[data-ctip] .clx-marks a' },
  { route: '/resources/frontier-safety-crosswalk', sel: '[data-ctip] [data-cw-open]' },
  { route: '/obligations', sel: '[data-ctip] .obi-sq' },
  { route: '/resources/crosswalk', sel: '[data-ctip] [data-cw-open]' },
]) {
  test(`${route} grid: hover shows the cell's name`, async ({ page }) => {
    await page.setViewportSize({ width: 1440, height: 900 });
    await page.goto(route);
    const cells = (await marksInView(page, sel)).filter((m) => m.name);
    expect(cells.length, `named cells in a chart-tip root (${sel})`).toBeGreaterThan(0);
    for (const m of spread(cells)) {
      await page.mouse.move(m.x, m.y);
      await expect(tip(page)).toHaveText(m.name);
    }
  });
}
