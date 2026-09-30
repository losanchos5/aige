// ai-act-deadlines.spec.ts: the AI Act deadlines pages (/resources/ai-act-deadlines
// and the hand-written /es/resources/ai-act-deadlines) and their exports.
//
// What this spec owns: the dataset is sound, it cannot go stale silently (the
// maintenance gate runs against the real date, like obligation-status-dates),
// every date the obligation register uses is on it,
// the pages render every milestone in their own language, and the JSON and ICS
// exports carry what the page promises. Owned elsewhere: 200 (smoke.spec), JSON-LD (seo-schema.spec), the hreflang pair, sitemap and
// translation notice (i18n.spec, over HAND_TRANSLATED_ES), axe in both themes
// at 1440 and 390 (the a11y sweep over every built route), the unqualified
// "Spanish AI law" rule (content-lint, at build time), llms.txt listing
// (llms.txt.ts renders it from the same data).
import { test, expect } from '@playwright/test';

import {
  AI_ACT_TIMELINE_AS_OF,
  aiActMilestones,
  nextMilestones,
  registerDates,
  timelineProblems,
} from '../src/data/ai-act-timeline';

/** Today in UTC, YYYY-MM-DD: an application date is a calendar day. */
const today = new Date().toISOString().slice(0, 10);

const upcoming = aiActMilestones.filter((m) => m.status === 'upcoming');

test.describe('AI Act timeline data', () => {
  test('the dataset has no internal problem', () => {
    const problems = timelineProblems();
    expect(problems, problems.join('\n')).toEqual([]);
  });

  test('no milestone is left "upcoming" or unreviewed once its date has passed', () => {
    const stale = aiActMilestones
      .filter((m) => m.date <= today && (m.status !== 'applied' || m.reviewed < m.date))
      .map((m) => `${m.id}: date ${m.date} has passed (today ${today}); status ${m.status}, reviewed ${m.reviewed}`);
    expect(stale, stale.join('\n')).toEqual([]);
  });

  test('every EU AI Act date in the obligation register is a milestone', () => {
    const dates = new Set(aiActMilestones.map((m) => m.date));
    const missing = [...registerDates()].filter((date) => !dates.has(date)).sort();
    expect(missing).toEqual([]);
  });

});

const PAGES = [
  {
    path: '/resources/ai-act-deadlines',
    lang: 'en',
    h1: 'EU AI Act deadlines after the Digital Omnibus: what applies when',
    other: '/es/resources/ai-act-deadlines',
  },
  {
    path: '/es/resources/ai-act-deadlines',
    lang: 'es',
    h1: 'Plazos del AI Act tras el Digital Omnibus: qué se aplica y cuándo',
    other: '/resources/ai-act-deadlines',
  },
] as const;

for (const { path, lang, h1, other } of PAGES) {
  test.describe(`deadlines page ${path}`, () => {
    test('is in its language, lists every milestone and links its twin', async ({ page }) => {
      await page.goto(path);
      await expect(page.locator('html')).toHaveAttribute('lang', lang);
      await expect(page.locator('h1')).toHaveText(h1);

      const dates = await page
        .locator('.aad-timeline > li > .aad-m-head time[datetime]')
        .evaluateAll((els) => els.map((el) => el.getAttribute('datetime')));
      expect(dates).toEqual(aiActMilestones.map((m) => m.date));

      await expect(page.locator(`main a[href="${other}"][hreflang]`)).toHaveCount(1);
    });

    test('the next deadline is the first milestone after the as-of date', async ({ page }) => {
      await page.goto(path);
      const next = nextMilestones(AI_ACT_TIMELINE_AS_OF, 1)[0];
      test.skip(!next, 'every milestone has passed');
      await expect(page.locator('.aad-next time')).toHaveAttribute('datetime', next.date);
    });

  });
}

test.describe('AI Act deadlines exports', () => {
  test('the JSON carries every milestone and Spanish entry in both languages', async ({ request }) => {
    const res = await request.get('/resources/ai-act-deadlines.json');
    expect(res.status()).toBe(200);
    const body = await res.json();
    expect(body.asOf).toBe(AI_ACT_TIMELINE_AS_OF);
    expect(body.milestones.map((m: { date: string }) => m.date)).toEqual(aiActMilestones.map((m) => m.date));
    expect(body.spain.map((e: { status: string }) => e.status)).toContain('bill');
  });

  for (const lang of ['en', 'es'] as const) {
    const path = lang === 'en' ? '/resources/ai-act-deadlines.ics' : '/es/resources/ai-act-deadlines.ics';
    test(`the ${lang} calendar has one all-day event per upcoming milestone, in valid lines`, async ({
      request,
    }) => {
      const res = await request.get(path);
      expect(res.status()).toBe(200);
      expect(res.headers()['content-type']).toContain('text/calendar');
      const raw = await res.text();

      // RFC 5545: CRLF line endings, content lines of at most 75 octets.
      expect(raw.endsWith('\r\n')).toBe(true);
      const lines = raw.split('\r\n').slice(0, -1);
      for (const line of lines) {
        expect(line.includes('\n'), 'bare LF').toBe(false);
        expect(Buffer.byteLength(line, 'utf8'), line).toBeLessThanOrEqual(75);
      }
      const unfolded = raw.replace(/\r\n /g, '').split('\r\n');
      expect(unfolded[0]).toBe('BEGIN:VCALENDAR');
      expect(unfolded.filter((l) => l === 'BEGIN:VEVENT')).toHaveLength(upcoming.length);
      const starts = unfolded.filter((l) => l.startsWith('DTSTART;VALUE=DATE:')).map((l) => l.slice(-8));
      expect(starts).toEqual(upcoming.map((m) => m.date.replace(/-/g, '')));
      const uids = unfolded.filter((l) => l.startsWith('UID:'));
      expect(new Set(uids).size).toBe(upcoming.length);
      const summaries = unfolded.filter((l) => l.startsWith('SUMMARY:'));
      expect(summaries[0]).toContain(upcoming[0].title[lang].replace(/,/g, '\\,'));
    });
  }
});

test.describe('AI Act deadlines discovery', () => {
  test('the home links the page from a tile and from the "What applies now" band', async ({ page }) => {
    await page.goto('/');
    await expect(page.locator('.tiles a[href="/resources/ai-act-deadlines"]')).toHaveCount(1);
    await expect(page.locator('section#what-applies-now a[href="/resources/ai-act-deadlines"]')).toHaveCount(1);
  });

});
