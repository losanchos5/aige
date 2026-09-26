import { test, expect } from '@playwright/test';
import { chaptersOrdered } from '../src/data/chapters';
import { bookParts, countWord } from '../src/data/parts';
import { work } from '../src/data/work';

test.describe('home page', () => {
  test('hero shows the headline and its CTA; the loop section links the BoK', async ({ page }) => {
    await page.goto('/');
    await expect(page.locator('h1')).toHaveText('Governance you can run, not just read.');
    await expect(
      page.getByRole('link', { name: 'Read the Thesis', exact: true }),
    ).toBeVisible();
    await expect(
      page.locator('.loop-sec').getByRole('link', { name: 'Open the Body of Knowledge →' }),
    ).toHaveAttribute('href', '/bok');
    await expect(
      page.locator('.loop-sec .sec-link a[href="/controls"]'),
    ).toHaveCount(1);
  });

  test('the hero carries its lede, two CTAs and two text links', async ({ page }) => {
    await page.goto('/');
    const hero = page.locator('.hero--field');
    await expect(hero.locator('.hero-lede')).toHaveText(
      'An open reference architecture for turning AI safety, risk and policy claims into eval gates, runtime controls and machine-verifiable evidence.',
    );
    const ctas = hero.locator('.hero-ctas a');
    await expect(ctas).toHaveCount(2);
    await expect(ctas.nth(0)).toHaveText('Explore the Stack');
    await expect(ctas.nth(0)).toHaveAttribute('href', '/stack');
    await expect(ctas.nth(0)).toHaveClass(/\bbtn-primary\b/);
    await expect(ctas.nth(1)).toHaveText('Open controls');
    await expect(ctas.nth(1)).toHaveAttribute('href', '/controls');
    await expect(ctas.nth(1)).toHaveClass(/\bhero-btn-quiet\b/);
    const links = hero.locator('.hero-links a');
    await expect(links).toHaveCount(2);
    // The arrows are aria-hidden, so the accessible names stay the bare labels.
    await expect(
      hero.getByRole('link', { name: 'Read the Thesis', exact: true }),
    ).toHaveAttribute('href', '/thesis');
    await expect(
      hero.getByRole('link', { name: 'Frontier labs & evaluators', exact: true }),
    ).toHaveAttribute('href', '/frontier');
  });

  test('"Where it operates" follows the stack with three surfaces and their links', async ({
    page,
  }) => {
    await page.goto('/');
    const band = page.locator('#where-it-operates');
    await expect(band.locator('.sec-title')).toHaveText('Where AI Governance Engineering operates.');
    await expect(band.locator('.card')).toHaveCount(3);
    await expect(band.locator('.card .title')).toHaveText(['Evals', 'Runtime', 'Assurance']);
    // Link cards only take .lift; these cards are not links.
    await expect(band.locator('.card.lift')).toHaveCount(0);
    await expect(band.locator('a[href="/controls/evaluation-environment"]')).toHaveCount(1);
    await expect(band.locator('a[href="/controls/agent-runtime"]')).toHaveCount(1);
    await expect(band.locator('.sec-link a[href="/controls"]')).toHaveCount(1);
    await expect(band.locator('.sec-link a[href="/frontier"]')).toHaveCount(1);
    // It sits between the stack and the values.
    const titles = await page.locator('main section.sec .sec-title').allTextContents();
    const at = titles.findIndex((t) => t.startsWith('Where AI Governance Engineering'));
    expect(titles[at - 1]).toMatch(/^A build order/);
    expect(titles[at + 1]).toMatch(/^Eight values/);
  });

  test('the loop section, under the hero, holds the governance loop', async ({ page }) => {
    await page.goto('/');
    await expect(page.locator('.hero--field + .loop-sec')).toHaveCount(1);
    await expect(page.locator('.hero--field [data-loop]')).toHaveCount(0);
    await expect(page.locator('.loop-sec figure[data-loop] .loop-step')).toHaveCount(7);
    // The archify figure it replaced is gone.
    await expect(page.locator('.loop-sec figure.diagram')).toHaveCount(0);
    await expect(page.locator('.loop-sec .sec-lede')).toContainText(
      'AI governance engineering is the application of engineering practice',
    );
  });

  test('at desktop the loop draws its canvas; at phone width it is a list', async ({ page }) => {
    await page.setViewportSize({ width: 1440, height: 900 });
    await page.goto('/');
    await expect(page.locator('.loop-sec .loop-wires')).toBeVisible();
    await expect(page.locator('.loop-sec .loop-pills')).toBeVisible();
    await page.setViewportSize({ width: 390, height: 900 });
    await expect(page.locator('.loop-sec .loop-wires')).toBeHidden();
    await expect(page.locator('.loop-sec .loop-pills')).toBeHidden();
    await expect(page.locator('.loop-sec .loop-return')).toBeVisible();
  });

  test('the loop figure carries no simulated run telemetry', async ({ page }) => {
    await page.goto('/');
    // No run bar, no PASS stamp, no attestation number around the figure.
    await expect(page.locator('.loop-sec .stamp')).toHaveCount(0);
    await expect(page.locator('.loop-sec figcaption')).not.toContainText(/#\d|run|attestation/i);
  });

  test('the hero figure links to the chapter that explains the loop', async ({ page }) => {
    await page.goto('/');
    const link = page
      .locator('.loop-sec figcaption')
      .getByRole('link', { name: 'Read how the governance loop works', exact: true });
    await expect(link).toBeVisible();
    await expect(link).toHaveAttribute('href', '/bok/the-stack#how-to-read-the-stack');
  });

  test('the stack renders five register rows', async ({ page }) => {
    await page.goto('/');
    await expect(page.locator('[data-testid="stack-row"]')).toHaveCount(5);
  });

  test('values render eight over/under pairs', async ({ page }) => {
    await page.goto('/');
    await expect(page.locator('[data-testid="value-pair"]')).toHaveCount(8);
  });

  test('the Body of Knowledge renders one card per part and links every chapter', async ({
    page,
  }) => {
    await page.goto('/');
    const section = page.locator('.parts-sec');
    // The title counts the chapters from the data; no hard-coded "Eleven".
    await expect(section.locator('.sec-title')).toHaveText(
      `${chaptersOrdered.length} chapters in ${countWord(bookParts.length)} parts, versioned and open.`,
    );
    await expect(section.locator('[data-testid="part-card"]')).toHaveCount(bookParts.length);
    await expect(section.locator('[data-testid="chapter-link"]')).toHaveCount(
      chaptersOrdered.length,
    );
    for (const chapter of chaptersOrdered) {
      await expect(section.locator(`a[href="/bok/${chapter.slug}"]`)).toHaveCount(1);
    }
    // Each part title opens that part on the /bok index.
    for (const part of bookParts) {
      await expect(
        section.getByRole('link', { name: part.title, exact: true }),
      ).toHaveAttribute('href', `/bok#part-${part.id}`);
    }
    // The newer parts are named in the lede.
    for (const id of ['foundations', 'lifecycle', 'law']) {
      const title = bookParts.find((p) => p.id === id)!.title;
      await expect(section.locator('.sec-lede')).toContainText(title);
    }
  });

  test('the resource tiles include the topic crosswalk, the map, the controls and the research notes', async ({
    page,
  }) => {
    await page.goto('/');
    const tiles = page.locator('.tiles');
    await expect(tiles.locator('a[href="/resources/crosswalk"]')).toHaveCount(1);
    await expect(tiles.locator('a[href="/map"]')).toHaveCount(1);
    await expect(tiles.locator('a[href="/controls"]')).toHaveCount(1);
    await expect(tiles.locator('a[href="/research"]')).toHaveCount(1);
    const hrefs = await tiles.locator('a').evaluateAll((els) => els.map((a) => a.getAttribute('href')));
    // Open controls second; Research notes right before the Reading list.
    expect(hrefs[1]).toBe('/controls');
    expect(hrefs.indexOf('/research')).toBe(hrefs.indexOf('/bok/reading-list') - 1);
  });

  test('the newsletter form sits before the closing band, with its Umami event', async ({
    page,
  }) => {
    await page.goto('/');
    const form = page.locator('.nl-sec form.newsletter');
    await expect(form).toHaveCount(1);
    await expect(form).toHaveAttribute('action', /buttondown\.com/);
    await expect(form.locator('input[type="email"]')).toHaveAttribute('id', 'nl-email-home');
    const submit = form.locator('button[type="submit"]');
    await expect(submit).toHaveAttribute('data-umami-event', 'newsletter-subscribe');
    await expect(submit).toHaveAttribute('data-umami-event-location', 'home');
    // Section order: resources, newsletter, then the closing band.
    await expect(page.locator('.nl-sec + .band')).toHaveCount(1);
  });

  test('the newsletter band lists the open work and links /contribute', async ({ page }) => {
    await page.goto('/');
    await expect(page.locator('.nl-sec .work-list > li')).toHaveCount(work.length);
    for (const item of work) {
      await expect(page.locator(`.nl-sec .work-list a[href="${item.href}"]`).first()).toBeVisible();
    }
    await expect(page.locator('.nl-sec .sec-link a[href="/contribute"]')).toHaveCount(1);
  });

  test('value cards are flat: no resting shadow and no lift (they are not links)', async ({ page }) => {
    await page.goto('/');
    const cards = page.locator('.pair-bento');
    await expect(cards).toHaveCount(8);
    const styles = await cards.evaluateAll((els) =>
      els.map((el) => ({ shadow: getComputedStyle(el).boxShadow, lift: el.classList.contains('lift') })),
    );
    for (const s of styles) {
      expect(s.shadow).toBe('none');
      expect(s.lift).toBe(false);
    }
  });

  test('the verdict ticker carries no run numbers', async ({ page }) => {
    await page.goto('/');
    await expect(page.locator('.vt-list')).not.toContainText(/#\d/);
  });

  test('in the dark theme the verdict beat and the closing band are dark, visible bands', async ({
    page,
  }) => {
    await page.emulateMedia({ colorScheme: 'dark' });
    await page.goto('/');
    const lum = (sel: string) =>
      page.locator(sel).first().evaluate((el) => {
        // The dark fills are color-mix() results, which compute to color(srgb …):
        // resolve through a canvas pixel to get plain 0–255 channels.
        const cx = document.createElement('canvas').getContext('2d')!;
        cx.fillStyle = getComputedStyle(el).backgroundColor;
        cx.fillRect(0, 0, 1, 1);
        const [r, g, b] = cx.getImageData(0, 0, 1, 1).data;
        const f = (c: number) => {
          c /= 255;
          return c <= 0.03928 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4;
        };
        return 0.2126 * f(r) + 0.7152 * f(g) + 0.0722 * f(b);
      });
    const page0 = await lum('body');
    const verdict = await lum('.verdict-beat');
    const band = await lum('.band');
    // Not the cream slab: the closing band stays a dark ground.
    expect(band).toBeLessThan(0.1);
    // Both bands read apart from the #121417 page (> 1.1:1).
    expect((verdict + 0.05) / (page0 + 0.05)).toBeGreaterThan(1.1);
    expect((band + 0.05) / (page0 + 0.05)).toBeGreaterThan(1.1);
  });

  test('every market stat tile carries a source', async ({ page }) => {
    await page.goto('/');
    const tiles = page.locator('.stats-row .tile');
    const count = await tiles.count();
    expect(count).toBeGreaterThan(0);
    await expect(page.locator('.stats-row .tile .source')).toHaveCount(count);
    for (let i = 0; i < count; i++) {
      await expect(tiles.nth(i).locator('.source')).not.toBeEmpty();
    }
  });
});

// Design-review shots for Block B (the new hero): the home page at four widths
// (including 1900 to check the hero no longer bleeds to the viewport edge) in
// both colour schemes, written to tests/__screenshots__/I/.
const widths = [390, 834, 1440, 1900];
const schemes = ['light', 'dark'] as const;

for (const scheme of schemes) {
  for (const width of widths) {
    test(`screenshot home ${width} ${scheme}`, async ({ page }) => {
      // reduced-motion gives the resting (revealed) state deterministically:
      // the reveal-on-scroll observer never fires for below-fold sections
      // during a full-page capture, so without this they'd read as blank.
      await page.emulateMedia({ colorScheme: scheme, reducedMotion: 'reduce' });
      await page.setViewportSize({ width, height: 1200 });
      await page.goto('/');
      await page.waitForLoadState('networkidle');
      await page.screenshot({
        path: `tests/__screenshots__/I/home-${width}-${scheme}.png`,
        fullPage: true,
      });
    });
  }
}
