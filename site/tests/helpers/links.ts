// tests/helpers/links.ts: shared link-resolution helpers for the section
// landing-page specs (/stack, /role, /path). Collects the /bok/...#anchor
// back-links a page renders and asserts each fragment resolves to a real id in
// its target chapter page.
import { expect, type Page } from '@playwright/test';

/** Collect every distinct /bok/...#anchor link rendered on a page. */
export async function bokAnchorLinks(page: Page): Promise<string[]> {
  const hrefs = await page
    .locator('a[href^="/bok/"]')
    .evaluateAll((els) => els.map((el) => el.getAttribute('href') ?? ''));
  return [...new Set(hrefs.filter((href) => href.includes('#')))];
}

/** Assert every chapter back-link on `path` points at an id that exists. */
export async function assertChapterLinksResolve(page: Page, path: string): Promise<void> {
  await page.goto(path);
  const links = await bokAnchorLinks(page);
  expect(links.length).toBeGreaterThan(0);

  for (const link of links) {
    const [target, frag] = link.split('#');
    const response = await page.request.get(target);
    expect(response.ok(), `${target} should serve 200`).toBeTruthy();
    const html = await response.text();
    expect(html.includes(`id="${frag}"`), `${link} should resolve`).toBe(true);
  }
}
