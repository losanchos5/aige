import { test, expect, type Page } from '@playwright/test';
import { chaptersOrdered } from '../src/data/chapters';
import { bookParts, countWord } from '../src/data/parts';
import { paintings } from '../src/data/paintings';
import { work } from '../src/data/work';

test.describe('home page', () => {
  test('hero shows the headline and its CTA; the loop section links the BoK', async ({ page }) => {
    await page.goto('/');
    await expect(page.locator('h1')).toHaveText('Governance you can run, not just read.');
    await expect(
      page.getByRole('link', { name: 'Read the Thesis', exact: true }),
    ).toBeVisible();
    await expect(
      page.locator('.loop-sec').getByRole('link', { name: 'Open the Body of Knowledge', exact: true }),
    ).toHaveAttribute('href', '/bok');
    await expect(page.locator('.loop-sec a[href="/controls"]')).toHaveCount(1);
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

  test('"Where it operates" follows the stack rows with three surfaces and their links', async ({
    page,
  }) => {
    await page.goto('/');
    const block = page.locator('#where-it-operates');
    await expect(block.locator('.subhead')).toHaveText('Where AI Governance Engineering operates.');
    await expect(block.locator('.rows > li')).toHaveCount(3);
    await expect(block.locator('.row-t')).toHaveText(['Evals', 'Runtime', 'Assurance']);
    await expect(block.locator('a[href="/controls/evaluation-environment"]')).toHaveCount(1);
    await expect(block.locator('a[href="/controls/agent-runtime"]')).toHaveCount(1);
    await expect(block.locator('a[href="/controls"]')).toHaveCount(1);
    await expect(block.locator('a[href="/frontier"]')).toHaveCount(1);
    // Inside the stack section, right after the five layer rows.
    await expect(
      page.locator('#stack .split:has([data-testid="stack-row"]) + #where-it-operates'),
    ).toHaveCount(1);
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
    // No run bar, no PASS stamp, no attestation number around the figure
    // ("the running system" in the caption is a lane name, not a run).
    await expect(page.locator('.loop-sec .stamp')).toHaveCount(0);
    await expect(page.locator('.loop-sec figcaption')).not.toContainText(/#\d|\brun\b|attestation/i);
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

  test('the Body of Knowledge renders one group per part and links every chapter', async ({
    page,
  }) => {
    await page.goto('/');
    const section = page.locator('.parts-sec');
    // The title counts the chapters from the data; no hard-coded "Eleven".
    await expect(section.locator('.sec-title')).toHaveText(
      `${chaptersOrdered.length} chapters in ${countWord(bookParts.length)} parts, versioned and open.`,
    );
    await expect(section.locator('[data-testid="book-part"]')).toHaveCount(bookParts.length);
    await expect(section.locator('[data-testid="chapter-link"]')).toHaveCount(
      chaptersOrdered.length,
    );
    for (const chapter of chaptersOrdered) {
      await expect(section.locator(`a[href="/bok/${chapter.slug}"]`)).toHaveCount(1);
    }
    for (const part of bookParts) {
      // Each part title opens that part on the /bok index, beside its range.
      await expect(
        section.getByRole('link', { name: part.title, exact: true }),
      ).toHaveAttribute('href', `/bok#part-${part.id}`);
      await expect(section.locator(`[data-part="${part.id}"] .part-r`)).toHaveText(part.range);
    }
    // The newer parts are named in the lede.
    for (const id of ['foundations', 'lifecycle', 'law']) {
      const title = bookParts.find((p) => p.id === id)!.title;
      await expect(section.locator('.sec-lede')).toContainText(title);
    }
  });

  test('the resources show four painting cards, then rows, with the controls and the research notes', async ({
    page,
  }) => {
    await page.goto('/');
    await expect(page.locator('.res-sec .pcard')).toHaveCount(4);
    await expect(page.locator('.res-sec .pcard .paint img')).toHaveCount(4);
    const tiles = page.locator('.tiles');
    await expect(tiles.locator('a[href="/resources/crosswalk"]')).toHaveCount(1);
    await expect(tiles.locator('a[href="/map"]')).toHaveCount(1);
    await expect(tiles.locator('a[href="/controls"]')).toHaveCount(1);
    await expect(tiles.locator('a[href="/research"]')).toHaveCount(1);
    const hrefs = await tiles.locator('a').evaluateAll((els) => els.map((a) => a.getAttribute('href')));
    // Open controls second; Research notes last.
    expect(hrefs[1]).toBe('/controls');
    expect(hrefs.at(-1)).toBe('/research');
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

  test('the newsletter section lists the open work and links /contribute', async ({ page }) => {
    await page.goto('/');
    await expect(page.locator('.nl-sec .work-list > li')).toHaveCount(work.length);
    for (const item of work) {
      await expect(page.locator(`.nl-sec .work-list a[href="${item.href}"]`).first()).toBeVisible();
    }
    await expect(page.locator('.nl-sec a[href="/contribute"]')).toHaveCount(1);
  });

  test('in the dark theme the closing band is a dark, visible band', async ({ page }) => {
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
    const band = await lum('.band');
    // Not the cream slab: the closing band stays a dark ground.
    expect(band).toBeLessThan(0.1);
    // It reads apart from the #121417 page (> 1.1:1).
    expect((band + 0.05) / (page0 + 0.05)).toBeGreaterThan(1.1);
  });
});

// Scroll a painting into view and wait for it, so a lazy image has loaded.
async function loaded(page: Page, selector: string) {
  const img = page.locator(selector).first();
  await img.scrollIntoViewIfNeeded();
  await expect
    .poll(() => img.evaluate((el: HTMLImageElement) => el.complete && el.naturalWidth > 0))
    .toBe(true);
}

test.describe('home paintings', () => {
  test('the loop panel floats on its painting, the mat showing on all four sides', async ({ page }) => {
    await page.setViewportSize({ width: 1440, height: 900 });
    await page.goto('/');
    await loaded(page, '.loop-sec .loop-frame > img');
    const gap = await page.locator('.loop-sec .loop-frame').evaluate((frame) => {
      const f = frame.getBoundingClientRect();
      const p = frame.querySelector('.loop-panel')!.getBoundingClientRect();
      return [p.top - f.top, f.right - p.right, f.bottom - p.bottom, p.left - f.left];
    });
    for (const side of gap) expect(side).toBeGreaterThanOrEqual(8);
  });

  test('between two painting blocks under the hero there is always a rows block', async ({ page }) => {
    await page.goto('/');
    // The content blocks of each section under the hero, in document order:
    // the section's children, looking through its inner container. A block
    // with a painting is "painting", one with list or table rows is "rows".
    const kinds = await page.evaluate(() => {
      const blocks: Element[] = [];
      const hero = document.querySelector('main section.hero')!;
      for (const section of [...hero.parentElement!.children].filter((el) => el.tagName === 'SECTION' && el !== hero)) {
        for (const child of section.children) {
          if (child.matches('.sec-inner, .container')) blocks.push(...child.children);
          else blocks.push(child);
        }
      }
      return blocks
        .map((b) => (b.matches('img.painting') || b.querySelector('img.painting') ? 'painting' : b.querySelector('li, tr') ? 'rows' : null))
        .filter(Boolean);
    });
    expect(kinds.filter((k) => k === 'painting').length).toBeGreaterThanOrEqual(6);
    for (let i = 1; i < kinds.length; i++) {
      expect(`block ${i}: ${kinds[i - 1]} then ${kinds[i]}`).not.toMatch(/painting then painting/);
    }
  });

  for (const scheme of ['light', 'dark'] as const) {
    test(`the closing band text holds 4.5:1 over its painting (${scheme})`, async ({ page }) => {
      await page.emulateMedia({ colorScheme: scheme, reducedMotion: 'reduce' });
      await page.setViewportSize({ width: 1440, height: 900 });
      await page.goto('/');
      await loaded(page, '.band .art img');
      const band = page.locator('.band');
      await band.scrollIntoViewIfNeeded();
      const targets = ['.title', '.sub', '.link'];
      const inks: string[] = [];
      const clips = [];
      for (const sel of targets) {
        const el = band.locator(sel);
        inks.push(await el.evaluate((e) => getComputedStyle(e).color));
        clips.push((await el.boundingBox())!);
      }
      // Shoot the ground behind each text with the copy hidden, then take its
      // lightest pixel: the worst case for the light band ink.
      await band.evaluate((b) => {
        for (const el of b.querySelectorAll<HTMLElement>('.copy, .actions')) el.style.visibility = 'hidden';
      });
      // Let the hidden copy repaint before the shots.
      await page.evaluate(() => new Promise((r) => requestAnimationFrame(() => requestAnimationFrame(r))));
      for (const [i, sel] of targets.entries()) {
        const shot = (await page.screenshot({ clip: clips[i] })).toString('base64');
        const contrast = await page.evaluate(
          async ({ b64, ink }) => {
            const img = new Image();
            img.src = `data:image/png;base64,${b64}`;
            await img.decode();
            const canvas = Object.assign(document.createElement('canvas'), {
              width: img.width,
              height: img.height,
            });
            const cx = canvas.getContext('2d')!;
            cx.drawImage(img, 0, 0);
            const px = cx.getImageData(0, 0, img.width, img.height).data;
            const lin = (c: number) => {
              c /= 255;
              return c <= 0.03928 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4;
            };
            const lum = (r: number, g: number, b: number) =>
              0.2126 * lin(r) + 0.7152 * lin(g) + 0.0722 * lin(b);
            let ground = 0;
            for (let j = 0; j < px.length; j += 4) ground = Math.max(ground, lum(px[j], px[j + 1], px[j + 2]));
            cx.fillStyle = ink;
            cx.fillRect(0, 0, 1, 1);
            const [r, g, b] = cx.getImageData(0, 0, 1, 1).data;
            const text = lum(r, g, b);
            return (Math.max(text, ground) + 0.05) / (Math.min(text, ground) + 0.05);
          },
          { b64: shot, ink: inks[i] },
        );
        console.log(`[band contrast] ${scheme} ${sel}: ${contrast.toFixed(2)}`);
        expect(contrast, sel).toBeGreaterThanOrEqual(4.5);
      }
    });
  }

  test('the footer colophon credits every painting as public domain', async ({ page }) => {
    await page.goto('/');
    const colophon = page.locator('footer [data-testid="colophon"]');
    await expect(colophon).toContainText('public domain');
    await expect(colophon.locator('a')).toHaveAttribute('href', /\/site\/public\/paintings\/CREDITS\.md$/);
    // One "Title (year)" entry per painting record.
    const entries = (await colophon.innerText()).match(/\(\d{4}\)/g) ?? [];
    expect(entries).toHaveLength(Object.keys(paintings).length);
  });
});
