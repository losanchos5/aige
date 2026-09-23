// llms.spec.ts: acceptance checks for the two plain-text endpoints — /llms.txt,
// the llmstxt.org index of every document on the site, and /llms-full.txt, the
// same corpus in full.
import { test, expect } from '@playwright/test';
import { chaptersOrdered } from '../src/data/chapters';

test.describe('the site publishes an llms.txt index', () => {
  test('/llms.txt is plain text and links every chapter', async ({ request }) => {
    const res = await request.get('/llms.txt');
    expect(res.status()).toBe(200);
    expect(res.headers()['content-type']).toContain('text/plain');

    const text = await res.text();

    // The spec opens with an H1, then a `>` one-line summary.
    expect(text.startsWith('# ')).toBe(true);
    expect(text).toContain('\n> ');

    // Every chapter is listed by its canonical, absolute URL.
    for (const chapter of chaptersOrdered) {
      expect(text).toContain(`https://aigovernanceengineer.com/bok/${chapter.slug}`);
    }

    // The sections the index promises.
    for (const heading of ['## Body of Knowledge', '## Thesis', '## Resources']) {
      expect(text).toContain(heading);
    }
  });

  test('/llms-full.txt carries the whole corpus', async ({ request }) => {
    const index = await request.get('/llms.txt');
    const full = await request.get('/llms-full.txt');
    expect(full.status()).toBe(200);

    const indexText = await index.text();
    const fullText = await full.text();

    expect(fullText.length).toBeGreaterThan(indexText.length);
    expect(fullText).toContain(chaptersOrdered[0].title);
  });
});
