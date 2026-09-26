// shell-parts.spec.ts: the Body of Knowledge as a book in parts across the site
// shell (the /bok index, the chapter rail), the newsletter at the
// end of each chapter, the declarative Umami events and the methodology page.
import { test, expect } from '@playwright/test';
import { chaptersOrdered } from '../src/data/chapters';
import { bookParts, formatRange } from '../src/data/parts';
import { site } from '../src/data/site';

test('part ranges collapse runs and keep en dashes', () => {
  expect(formatRange([14, 15, 16, 17, 23])).toBe('14–17, 23');
  expect(formatRange([0, 1, 2])).toBe('00–02');
  expect(formatRange([8])).toBe('08');
  // Every chapter sits in exactly one part.
  const inParts = bookParts.flatMap((part) => part.chapters.map((c) => c.id));
  expect([...inParts].sort()).toEqual(chaptersOrdered.map((c) => c.id).sort());
  for (const part of bookParts) expect(part.intro.length).toBeGreaterThan(20);
});

test.describe('/bok index by part', () => {
  test('one section per part, each heading anchored and followed by its chapters', async ({
    page,
  }) => {
    await page.goto('/bok');
    const jump = page.getByRole('navigation', { name: 'Parts of the book' });
    await expect(jump.locator('a')).toHaveCount(bookParts.length);

    for (const part of bookParts) {
      await expect(jump.locator(`a[href="#part-${part.id}"]`)).toHaveCount(1);
      const heading = page.locator(`h2#part-${part.id}`);
      await expect(heading).toHaveText(part.title);
      const section = page.locator('section.bok-part', { has: heading });
      await expect(section.locator('.part-intro')).toHaveText(part.intro);
      await expect(section.locator('[data-testid="bok-chapter-card"]')).toHaveCount(
        part.chapters.length,
      );
    }
    await expect(page.locator('[data-testid="bok-chapter-card"]')).toHaveCount(
      chaptersOrdered.length,
    );
  });

  test('the reading paths stay three and reach the newer parts', async ({ page }) => {
    await page.goto('/bok');
    const paths = page.locator('.reading-paths');
    await expect(paths.locator('.rp-col')).toHaveCount(3);
    const hrefs = await paths.locator('.rp-list a').evaluateAll((els) =>
      els.map((el) => el.getAttribute('href')),
    );
    for (const id of ['foundations', 'lifecycle', 'law']) {
      const part = bookParts.find((p) => p.id === id)!;
      const slugs = part.chapters.map((c) => `/bok/${c.slug}`);
      expect(
        hrefs.some((href) => slugs.includes(href ?? '')),
        `a reading path reaches ${part.title}`,
      ).toBe(true);
    }
  });
});

// The drawer's chapters by part: tests/mobile-nav.spec.ts.

test('the chapter rail groups its rows by part', async ({ page }) => {
  await page.setViewportSize({ width: 1440, height: 900 });
  await page.goto('/bok/the-stack');
  const rail = page.locator('nav.sidebar-nav');
  for (const part of bookParts) {
    const name = `${part.title} ${part.range}`;
    await expect(rail.getByRole('list', { name, exact: true }), name).toHaveCount(1);
  }
  await expect(rail.locator('a[data-chapter-slug]')).toHaveCount(chaptersOrdered.length);
  await expect(rail.locator('a[aria-current="page"]')).toHaveAttribute(
    'href',
    '/bok/the-stack',
  );
});

test('every chapter closes on the newsletter form, outside the search index', async ({ page }) => {
  await page.goto('/bok/the-stack');
  const wrap = page.locator('.chapter-newsletter');
  await expect(wrap).toHaveAttribute('data-pagefind-ignore', '');
  const form = wrap.locator('form.newsletter');
  await expect(form).toHaveAttribute('action', site.newsletter.action);
  await expect(form.locator('input[type="email"]')).toHaveAttribute('id', 'nl-email-chapter');
  await expect(form.locator('button[type="submit"]')).toHaveAttribute(
    'data-umami-event-location',
    'chapter',
  );
  // It follows the chapter's sources.
  const after = await page.evaluate(() => {
    const sources = document.querySelector('.prose ol.sources');
    const nl = document.querySelector('.chapter-newsletter');
    return Boolean(
      sources && nl && sources.compareDocumentPosition(nl) & Node.DOCUMENT_POSITION_FOLLOWING,
    );
  });
  expect(after).toBe(true);
});

test.describe('declarative Umami events', () => {
  test('search openers carry search-open with their location', async ({ page }) => {
    await page.goto('/bok/the-stack');
    for (const location of ['header', 'drawer', 'sidebar']) {
      await expect(
        page.locator(`[data-search-open][data-umami-event-location="${location}"]`),
        location,
      ).toHaveAttribute('data-umami-event', 'search-open');
    }
  });

  test('citation copy buttons carry cite-copy with their kind', async ({ page }) => {
    await page.goto('/bok/the-stack');
    for (const kind of ['reference', 'bibtex', 'link']) {
      const button = page.locator(`button[data-copy-cite][data-umami-event-kind="${kind}"]`);
      await expect(button, kind).toHaveAttribute('data-umami-event', 'cite-copy');
      await expect(button, kind).toHaveAttribute('data-umami-event-chapter', 'the-stack');
    }
  });

  test('dataset links in the footer carry download with the file', async ({ page }) => {
    await page.goto('/');
    const links = page.locator('nav[aria-label="Site map"] a[data-umami-event="download"]');
    expect(await links.count()).toBeGreaterThanOrEqual(5);
    for (const href of await links.evaluateAll((els) => els.map((el) => el.getAttribute('href')))) {
      await expect(
        page.locator(`nav[aria-label="Site map"] a[href="${href}"]`),
      ).toHaveAttribute('data-umami-event-file', href!);
    }
  });

  test('event names stay within Umami\'s 50-character limit', async ({ page }) => {
    for (const path of ['/', '/bok/the-stack', '/about']) {
      await page.goto(path);
      const names = await page
        .locator('[data-umami-event]')
        .evaluateAll((els) => els.map((el) => el.getAttribute('data-umami-event') ?? ''));
      for (const name of names) {
        expect(name).toMatch(/^[a-z][a-z-]{0,49}$/);
      }
    }
  });
});

test.describe('methodology page', () => {
  test('is linked from About and states version, DOI and forms', async ({ page }) => {
    await page.goto('/about');
    await expect(page.locator('main a[href="/about/methodology"]')).toHaveCount(1);

    await page.goto('/about/methodology');
    await expect(page.locator('h1')).toHaveText('Methodology');
    const main = page.locator('main');
    await expect(main).toContainText(`v${site.bokVersion}`);
    await expect(main.locator(`a[href="https://doi.org/${site.doi}"]`)).toHaveCount(1);
    for (const form of [
      'report-an-error.yml',
      'suggest-a-source.yml',
      'propose-an-obligation.yml',
      'propose-a-glossary-term.yml',
      'propose-a-case.yml',
    ]) {
      await expect(
        main.locator(`a[href="${site.github}/issues/new?template=${form}"]`),
        form,
      ).toHaveCount(1);
    }
    await expect(main.locator('a[href="/about/changelog"]').first()).toBeVisible();
    // No independence, funding or sponsorship claims on the page.
    await expect(main).not.toContainText(/sponsor|funded|funding|independen/i);
    // Every citation marker resolves to a numbered source on the page.
    const targets = await main
      .locator('a.cite')
      .evaluateAll((els) => els.map((el) => el.getAttribute('href')));
    for (const target of targets) {
      await expect(page.locator(target!)).toHaveCount(1);
    }
  });
});
