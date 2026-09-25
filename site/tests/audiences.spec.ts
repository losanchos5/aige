// audiences.spec.ts: the audience hubs under /for and the home page's "What
// applies now" band (OpenSpec change audience-hubs). Two layers:
// 1. data (pure Node): the hubs validate, every hub is in SOURCE_BY_PATH,
//    tools that are not live never render, dates come from the register, and
//    the band's computation for a fixed date;
// 2. the built pages: structure, links to the register, sources, no script,
//    and the band on the home page. Request and DOM checks only.
import { test, expect } from '@playwright/test';
import { readFileSync } from 'node:fs';
import { join } from 'node:path';

import { audiences, audiencePath, PARALLEL_TOOL_IDS } from '../src/data/audiences';
import {
  validateAudiences,
  resolveRoute,
  pendingTools,
  fillDates,
  resolveObligations,
} from '../src/lib/audiences';
import { nextDates, inForce, formatDate, euRows } from '../src/lib/applies-now';
import { obligationById } from '../src/data/frameworks';
import { tools } from '../src/data/toolkit';

const SLUGS = [
  'engineers',
  'ciso-risk',
  'legal-dpo',
  'executives-board',
  'public-sector',
  'smes',
];

test.describe('audience hubs: data', () => {
  test('the six hubs exist and validate', () => {
    expect(audiences.map((a) => a.slug)).toEqual(SLUGS);
    expect(() => validateAudiences()).not.toThrow();
  });

  test('every hub is dated in SOURCE_BY_PATH', () => {
    const config = readFileSync(join(process.cwd(), 'astro.config.ts'), 'utf8');
    expect(config).toContain("'/for',");
    for (const slug of SLUGS) expect(config, `${slug} missing`).toContain(`'${slug}'`);
  });

  test('a tool step renders only while the toolkit lists it as live', () => {
    const live = new Set(tools.filter((t) => t.status === 'live').map((t) => t.id));
    for (const a of audiences) {
      const hrefs = resolveRoute(a).flatMap((phase) => phase.steps.map((s) => s.href));
      for (const id of pendingTools(a)) {
        expect(live.has(id)).toBe(false);
        expect(hrefs, `${a.id} links ${id}`).not.toContain(`/toolkit/${id}`);
      }
    }
    // Every tool a hub may name is known to the registry or to the parallel list.
    const known = new Set([...tools.map((t) => t.id), ...PARALLEL_TOOL_IDS]);
    for (const a of audiences) {
      for (const phase of a.route) {
        for (const step of phase.steps) {
          if (step.kind === 'tool') expect(known.has(step.id), step.id).toBe(true);
        }
      }
    }
  });

  test('routes are numbered 01.. without gaps', () => {
    for (const a of audiences) {
      const indexes = resolveRoute(a).flatMap((phase) => phase.steps.map((s) => s.index));
      indexes.forEach((index, i) => expect(index).toBe(String(i + 1).padStart(2, '0')));
    }
  });

  test('date tokens render the register dates', () => {
    const row = obligationById('AIGE-OBL-EUAIA-ART9');
    expect(row?.appliesFrom).toBeTruthy();
    expect(fillDates('from {date:AIGE-OBL-EUAIA-ART9}')).toBe(
      `from ${formatDate(row!.appliesFrom!)}`,
    );
    expect(() => fillDates('{date:AIGE-OBL-NOPE}')).toThrow();
    for (const a of audiences) {
      for (const q of a.questions) expect(fillDates(q.answer)).not.toContain('{date:');
    }
  });

  test('obligations resolve to their register pages', () => {
    for (const a of audiences) {
      for (const o of resolveObligations(a)) {
        expect(o.href).toBe(`/obligations/${o.row.id.toLowerCase()}`);
      }
    }
  });

  test('no hub contains an em dash', () => {
    expect(JSON.stringify(audiences)).not.toContain('—');
  });
});

test.describe('what applies now: computation', () => {
  test('formats dates in the house prose style', () => {
    expect(formatDate('2026-12-02')).toBe('2 Dec 2026');
    expect(formatDate('2030-08-02')).toBe('2 Aug 2030');
  });

  test('for 2026-09-24: in force, then the next three dates in order', () => {
    const today = '2026-09-24';
    const now = inForce(today);
    expect(now.length).toBeGreaterThan(0);
    for (const row of now) expect(row.appliesFrom! <= today).toBe(true);

    const dates = nextDates(today, 3);
    // 2027-08-02 is the Art. 111(3) step of the GPAI rows (models placed before
    // 2025-08-02 comply), a milestone of the register since v0.5.0.
    expect(dates.map((d) => d.date)).toEqual(['2026-12-02', '2027-08-02', '2027-12-02']);
    for (const d of dates) {
      expect(d.items.length).toBeGreaterThan(0);
      for (const item of d.items) {
        expect(item.note.length).toBeGreaterThan(0);
        expect(item.rows.length).toBeGreaterThan(0);
      }
    }
    const gpai = dates[1].items.flatMap((item) => item.rows.map((r) => r.id));
    expect(gpai).toContain('AIGE-OBL-EUAIA-ART53');
    // Annex III switches on in one item that carries Arts. 9 and 26.
    const annexIII = dates[2].items.flatMap((item) => item.rows.map((r) => r.id));
    expect(annexIII).toContain('AIGE-OBL-EUAIA-ART9');
    expect(annexIII).toContain('AIGE-OBL-EUAIA-ART26');
  });

  test('a date that has passed drops out', () => {
    const after = nextDates('2026-12-02', 3).map((d) => d.date);
    expect(after[0]).toBe('2027-08-02');
    expect(after).not.toContain('2026-12-02');
  });

  test('reads only EU AI Act rows', () => {
    for (const row of euRows()) expect(row.frameworkId).toBe('eu-ai-act');
  });
});

test.describe('audience hubs: pages', () => {
  test('/for lists every hub and the questions table', async ({ page }) => {
    await page.goto('/for');
    await expect(page.locator('h1')).toHaveCount(1);
    for (const a of audiences) {
      await expect(page.locator(`#routes a[href="${audiencePath(a)}"]`)).toHaveCount(1);
    }
    await expect(page.locator('#questions tbody tr')).toHaveCount(audiences.length);
  });

  for (const a of audiences) {
    test(`${audiencePath(a)} renders its sections in order`, async ({ page }) => {
      const response = await page.goto(audiencePath(a));
      expect(response?.status()).toBe(200);
      await expect(page.locator('h1')).toHaveText(a.title);

      const ids = await page
        .locator('main section[id]')
        .evaluateAll((sections) => sections.map((s) => s.id));
      const expected = ['who', 'questions', 'route', 'this-week', 'obligations', 'sources'];
      expect(ids.filter((id) => expected.includes(id))).toEqual(expected);

      await expect(page.locator('#questions .au-q')).toHaveCount(3);
      await expect(page.locator('#this-week li')).toHaveCount(a.thisWeek.length);
      await expect(page.locator('#obligations tbody tr')).toHaveCount(a.obligations.length);
      for (const id of a.obligations) {
        await expect(
          page.locator(`#obligations a[href="/obligations/${id.toLowerCase()}"]`),
        ).toHaveCount(1);
      }
      await expect(page.locator('#obligations')).toContainText(
        'Illustrative, not a claim of conformity',
      );

      // Every citation chip points at a rendered source.
      const cited = await page
        .locator('#questions a.cite')
        .evaluateAll((links) => [...new Set(links.map((l) => l.getAttribute('href')))]);
      for (const href of cited) {
        await expect(page.locator(`#sources li${href}`), `${href} has no source`).toHaveCount(1);
      }
      await expect(page.locator('#sources ol.sources > li')).toHaveCount(a.sources.length);

      // Tools that are not live are never linked.
      for (const id of pendingTools(a)) {
        await expect(page.locator(`a[href="/toolkit/${id}"]`)).toHaveCount(0);
      }

      const html = await page.content();
      expect(html).not.toContain('—');
    });
  }
});

test.describe('what applies now: home band', () => {
  test('the home page shows the band with three dates linked to the register', async ({
    page,
  }) => {
    await page.goto('/');
    const band = page.locator('section#what-applies-now');
    await expect(band).toHaveCount(1);
    await expect(band.locator('.wan-date')).toHaveCount(3);
    await expect(band.locator('.wan-date time[datetime]')).toHaveCount(3);
    const hrefs = await band
      .locator('.wan-refs a')
      .evaluateAll((links) => links.map((l) => l.getAttribute('href') ?? ''));
    expect(hrefs.length).toBeGreaterThan(0);
    for (const href of hrefs) expect(href).toMatch(/^\/obligations\/aige-obl-euaia-/);
    await expect(band).toContainText('Indicative, not legal advice');
  });
});
