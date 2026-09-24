// block-f-share.spec.ts: acceptance checks for Block F2, the frictionless
// signature (a one-click edit link to CONTRIBUTORS.md and the SignNote on the
// Body of Knowledge index) and the share/cite row on a chapter page (a LinkedIn
// share link carrying the encoded page URL, and a copyable BibTeX entry).
import { test, expect } from '@playwright/test';

const EDIT_URL = 'https://github.com/losanchos5/aige/edit/main/bok/CONTRIBUTORS.md';

test('the thesis Sign link opens the one-click edit of CONTRIBUTORS.md', async ({ page }) => {
  await page.goto('/thesis');
  const link = page.locator(`a[href="${EDIT_URL}"]`);
  await expect(link.first()).toBeVisible();
});

test('the Body of Knowledge index carries the sign note once', async ({ page }) => {
  await page.goto('/bok');
  const note = page.locator('aside.sign-note');
  await expect(note).toHaveCount(1);
  await expect(note.getByRole('link', { name: 'Sign it' })).toHaveAttribute('href', EDIT_URL);
});

test.describe('share and cite on a chapter page', () => {
  const slug = 'the-stack';
  const canonical = `https://aigovernanceengineer.com/bok/${slug}`;

  test('a LinkedIn share link carries the encoded page URL', async ({ page }) => {
    await page.goto(`/bok/${slug}`);
    const share = page.locator('a.share-link');
    await expect(share).toHaveCount(1);
    const href = await share.getAttribute('href');
    expect(href).toContain('linkedin.com/sharing/share-offsite/?url=');
    expect(href).toContain(encodeURIComponent(canonical));
  });

  test('a copyable BibTeX entry is offered', async ({ page }) => {
    await page.goto(`/bok/${slug}`);
    const bib = page.locator('button.bibtex-copy');
    await expect(bib).toHaveCount(1);
    const data = await bib.getAttribute('data-copy-cite');
    expect(data).toContain('@misc{aige2026bok');
  });
});
