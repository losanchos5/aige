// block-c.spec.ts: acceptance checks for Block C, surfacing the duty holders in
// the obligation table, the Patterns nav item, the build-time obligation export
// endpoints, and the collapsible on-this-page TOC on narrow viewports.
import { test, expect } from '@playwright/test';

test.describe('duty holders in the obligation table', () => {
  test('the duty columns and filter render only in the EU AI Act group', async ({ page }) => {
    await page.goto('/resources/frameworks');

    // The two extra columns exist exactly once: in the EU AI Act group.
    await expect(page.locator('thead th', { hasText: 'Duty holder' })).toHaveCount(1);
    await expect(page.locator('thead th', { hasText: 'Applies from' })).toHaveCount(1);

    const eu = page
      .locator('.ob-group')
      .filter({ has: page.locator('h3', { hasText: 'EU AI Act' }) });
    await expect(eu.locator('thead th', { hasText: 'Duty holder' })).toHaveCount(1);
    await expect(eu.locator('thead th', { hasText: 'Applies from' })).toHaveCount(1);

    // A voluntary framework binds no one, so it carries neither column.
    const gpai = page
      .locator('.ob-group')
      .filter({ has: page.locator('h3', { hasText: 'GPAI Code of Practice' }) });
    await expect(gpai).toHaveCount(1);
    await expect(gpai.locator('thead th', { hasText: 'Duty holder' })).toHaveCount(0);
    await expect(gpai.locator('thead th', { hasText: 'Applies from' })).toHaveCount(0);

    // The four duty-holder filter chips exist.
    for (const id of ['df-all', 'df-provider', 'df-deployer', 'df-gpai']) {
      await expect(page.locator(`#${id}`)).toHaveCount(1);
    }
  });

  test('the duty-holder filter narrows the EU rows with pure CSS', async ({ page }) => {
    await page.goto('/resources/frameworks');

    const providerRow = page.locator('[data-obligation-row]', {
      hasText: 'Art. 9 risk management system',
    });
    const gpaiRow = page.locator('[data-obligation-row]', {
      hasText: 'Art. 53 GPAI provider obligations',
    });
    await expect(providerRow).toBeVisible();
    await expect(gpaiRow).toBeVisible();

    // Selecting "GPAI provider" hides the provider-only row and keeps the GPAI row.
    await page.locator('label[for="df-gpai"]').click();
    await expect(gpaiRow).toBeVisible();
    await expect(providerRow).toBeHidden();
  });
});

test('the artefact cell links to the matching pattern where a 1:1 map exists', async ({ page }) => {
  await page.goto('/resources/frameworks');
  const row = page.locator('[data-obligation-row]', {
    hasText: 'Art. 15 accuracy, robustness and cybersecurity',
  });
  const link = row.locator('a[href="/bok/patterns#pattern-eval-gate-in-ci"]');
  await expect(link).toHaveCount(1);
});

test.describe('obligation export endpoints', () => {
  test('the CSV carries the disclaimer as its first line', async ({ request }) => {
    const res = await request.get('/resources/obligations.csv');
    expect(res.status()).toBe(200);
    expect(res.headers()['content-type']).toContain('text/csv');

    const text = await res.text();
    const firstLine = text.split(/\r?\n/)[0];
    expect(firstLine).toMatch(
      /^Illustrative mapping from the AI Governance Engineer Body of Knowledge v[\d.]+ \(not a claim of conformity\)$/,
    );
    // A header row and at least one obligation row follow.
    const lines = text.split(/\r?\n/).filter(Boolean);
    expect(lines[1]).toContain('Framework,Obligation,Artefact');
    expect(lines[1]).toContain(',ID,');
    expect(lines.length).toBeGreaterThan(40);
  });

  test('the JSON carries the notice, version, licence and source', async ({ request }) => {
    const res = await request.get('/resources/obligations.json');
    expect(res.status()).toBe(200);
    expect(res.headers()['content-type']).toContain('application/json');

    const body = await res.json();
    expect(body.notice).toContain('not a claim of conformity');
    expect(body.version).toBeTruthy();
    expect(body.license).toBe('CC BY 4.0');
    expect(body.source).toContain('/resources/frameworks');
    expect(Array.isArray(body.obligations)).toBe(true);
    expect(body.obligations.length).toBeGreaterThan(40);
    // Schema version 2 (v0.5.0): stable ids, ISO appliesFrom, the old text in appliesNote.
    expect(body.schemaVersion).toBe(2);
    const art9 = body.obligations.find(
      (row: { id: string }) => row.id === 'AIGE-OBL-EUAIA-ART9',
    );
    expect(art9.appliesFrom).toBe('2027-12-02');
    expect(art9.appliesNote).toBe('2027-12-02 (Annex III)');
    expect(art9.url).toBe('https://aigovernanceengineer.com/obligations/aige-obl-euaia-art9');
  });
});

test('the header exposes the Patterns nav item', async ({ page }) => {
  await page.setViewportSize({ width: 1280, height: 900 });
  await page.goto('/');
  const header = page.locator('header.site-header');
  // Patterns now lives inside the Practice disclosure panel: open it first.
  await header.getByRole('button', { name: 'Practice' }).click();
  const practice = header.locator('[data-nav-group="practice"]');
  const patterns = practice.getByRole('link', { name: 'Patterns' });
  await expect(patterns).toBeVisible();
  await expect(patterns).toHaveAttribute('href', '/bok/patterns');

  const res = await page.goto('/bok/patterns');
  expect(res?.status()).toBe(200);
});

test.describe('mobile on-this-page TOC', () => {
  test.use({ viewport: { width: 390, height: 800 } });

  test('a collapsible on-this-page TOC appears on a phone viewport', async ({ page }) => {
    await page.goto('/bok/patterns');

    const toc = page.locator('[data-toc-mobile]');
    await expect(toc).toBeVisible();
    await expect(toc.locator('summary')).toHaveText('On this page');

    // Collapsed by default; opening the disclosure reveals the heading links.
    const firstLink = toc.locator('a').first();
    await expect(firstLink).toBeHidden();
    await toc.locator('summary').click();
    await expect(firstLink).toBeVisible();
  });

  test('the desktop sidebar TOC stays hidden on a phone viewport', async ({ page }) => {
    await page.goto('/bok/patterns');
    await expect(page.locator('nav.toc')).toBeHidden();
  });
});
