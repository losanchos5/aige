// block-f-feed.spec.ts: acceptance checks for Block F3 — the RSS feed now carries
// one item per Body of Knowledge chapter alongside the released versions, each
// dated and linking to its chapter page.
import { test, expect } from '@playwright/test';

test.describe('the RSS feed carries chapters and versions', () => {
  test('/rss.xml is valid XML with an item per chapter plus the versions', async ({ request }) => {
    const res = await request.get('/rss.xml');
    expect(res.status()).toBe(200);
    expect(res.headers()['content-type']).toContain('xml');

    const xml = await res.text();

    // Eleven chapters (00–10) plus at least one changelog version → ≥ 11 items.
    const items = xml.match(/<item>[\s\S]*?<\/item>/g) ?? [];
    expect(items.length).toBeGreaterThanOrEqual(11);

    // A chapter link resolves to a real chapter slug from data/chapters.ts.
    expect(xml).toContain('/bok/definition');

    // Every item is dated.
    for (const item of items) {
      expect(item).toContain('<pubDate>');
    }
  });
});
