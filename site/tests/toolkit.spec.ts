// toolkit.spec.ts: the /toolkit foundation and its first tool, the maturity
// self-check. Three layers of checks:
// 1. data (pure Node): the criteria in maturity.ts match chapter 07's table,
//    checklist and metrics; every pattern exists; the registry is consistent;
// 2. the shared helpers in public/toolkit/lib.js (pure Node): CSV per RFC 4180,
//    iCalendar per RFC 5545, fragment codec, escaping;
// 3. the pages in a browser: registry, no-JS worksheet, validation, result,
//    link state, exports (JSON, Markdown, SVG, PNG), re-import, comparison,
//    no network use with what the reader enters, print and reflow.
import { test, expect } from '@playwright/test';
import type { Download, Page } from '@playwright/test';
import { existsSync, readFileSync } from 'node:fs';
import { join } from 'node:path';

import { readSource, slugify, getHeadings, splitSections } from '../src/lib/md-parse';
import {
  levels,
  layerCriteria,
  stepMetrics,
  levelChecklist,
  levelFailures,
  maturityAnchors,
  maturityFloor,
} from '../src/data/maturity';
import { patterns } from '../src/data/patterns';
import { tools, toolNotice, toolById } from '../src/data/toolkit';
import {
  toCsv,
  toIcs,
  icsUid,
  foldLine,
  icsText,
  encodeFragment,
  decodeFragment,
  slug,
  mdCell,
  xml,
} from '../public/toolkit/lib.js';

const CHAPTER = 'bok/07-maturity-model.md';
const TOOL = '/toolkit/maturity-self-check';
const NOTICE =
  'Indicative, not legal advice and not a conformity claim. Nothing you enter leaves your browser.';

/** Collapse whitespace and drop Markdown link syntax and bold markers. */
function plain(markdown: string): string {
  return markdown
    .replace(/\[([^\]]+)\]\([^)]+\)/g, '$1')
    .replace(/\*\*/g, '')
    .replace(/\s+/g, ' ')
    .trim();
}

/** The chapter's "Observable criteria" table: 5 rows x 5 raw cells. */
function chapterTable(): string[][] {
  const section = splitSections(readSource(CHAPTER)).find(
    (s) => slugify(s.heading) === maturityAnchors.criteria,
  );
  if (!section) throw new Error('criteria section not found in chapter 07');
  return section.body
    .split('\n')
    .filter((line) => /^\|\s*\*\*\d/.test(line))
    .map((line) =>
      line
        .split('|')
        .slice(2, -1)
        .map((cell) => cell.trim()),
    );
}

// ---- 1. Data ---------------------------------------------------------------

test.describe('toolkit data', () => {
  test('the criteria match chapter 07 cell by cell, with the chapter links kept', () => {
    const table = chapterTable();
    expect(table).toHaveLength(5);
    expect(layerCriteria).toHaveLength(5);
    layerCriteria.forEach((row, i) => {
      expect(row.layer).toBe(i + 1);
      expect(row.cells.map((cell) => cell.level)).toEqual([1, 2, 3, 4, 5]);
      row.cells.forEach((cell, j) => {
        const raw = table[i][j];
        expect(cell.text, `layer ${row.layer} level ${cell.level}`).toBe(plain(raw));
        // The chapter links a pattern by its page (/patterns/<slug>) or, in
        // older text, by its catalogue anchor (/bok/patterns#<id>).
        const bySlug = /\(\/patterns\/([^)#]+)\)/.exec(raw)?.[1];
        const linked = bySlug
          ? patterns.find((pattern) => pattern.slug === bySlug)?.id
          : /\(\/bok\/patterns#([^)]+)\)/.exec(raw)?.[1];
        if (cell.patternSource === 'chapter') expect(linked).toBe(cell.pattern);
        else expect(linked, `cell ${row.layer}.${cell.level} links a pattern`).toBeUndefined();
      });
    });
  });

  test('every pattern a next move links to exists in the catalogue', () => {
    const ids = new Set(patterns.map((pattern) => pattern.id));
    for (const row of layerCriteria) {
      for (const cell of row.cells) expect(ids.has(cell.pattern), cell.pattern).toBe(true);
    }
  });

  test('the anchors the tool links to exist in chapter 07', () => {
    const slugs = new Set(getHeadings(readSource(CHAPTER)).map((h) => slugify(h.text)));
    for (const anchor of Object.values(maturityAnchors))
      expect(slugs.has(anchor), anchor).toBe(true);
  });

  test('checklist, metrics and failures are the chapter text', () => {
    const chapter = plain(readSource(CHAPTER)).toLowerCase();
    for (const level of levels) {
      expect(levelChecklist[level.n].length).toBeGreaterThan(0);
      for (const question of levelChecklist[level.n]) {
        expect(chapter, question).toContain(question.toLowerCase());
      }
      // The chapter writes "Typical failure: <text>"; compare case-insensitively.
      expect(chapter, `failure ${level.n}`).toContain(levelFailures[level.n].toLowerCase());
    }
    for (const to of [2, 3, 4, 5] as const) {
      expect(stepMetrics[to].length).toBeGreaterThan(0);
      for (const metric of stepMetrics[to]) {
        // The first clause of each metric is verbatim (a trailing citation is dropped).
        const head = metric.split(' (')[0].toLowerCase();
        expect(chapter, metric).toContain(head);
      }
    }
  });

  test('the floor is the weakest layer, ties in build order', () => {
    expect(maturityFloor({ 1: 3, 2: 2, 3: 4, 4: 3, 5: 2 })).toEqual({ level: 2, layers: [2, 5] });
    expect(maturityFloor({ 1: 0, 2: 5, 3: 5, 4: 5, 5: 5 })).toEqual({ level: 0, layers: [1] });
    expect(maturityFloor({ 1: 5, 2: 5, 3: 5, 4: 5, 5: 5 }).level).toBe(5);
  });

  test('the registry is consistent and every live tool has a page and a module', () => {
    expect(toolNotice).toBe(NOTICE);
    const ids = tools.map((tool) => tool.id);
    expect(new Set(ids).size).toBe(ids.length);
    for (const tool of tools) {
      expect(tool.id).toMatch(/^[a-z0-9]+(?:-[a-z0-9]+)*$/);
      expect(tool.href).toBe(`/toolkit/${tool.id}`);
      expect(tool.summary.length).toBeGreaterThan(20);
      expect(tool.inputs.length).toBeGreaterThan(0);
      expect(tool.outputs.length).toBeGreaterThan(0);
      if (tool.status === 'live') {
        expect(existsSync(join('src', 'pages', 'toolkit', `${tool.id}.astro`)), tool.id).toBe(true);
        expect(existsSync(join('public', 'toolkit', `${tool.id}.js`)), tool.id).toBe(true);
      }
    }
    expect(toolById('maturity-self-check').status).toBe('live');
  });

  test('no badge, seal or certificate wording in the tool', () => {
    const sources = [
      readFileSync(join('src', 'pages', 'toolkit', 'maturity-self-check.astro'), 'utf8'),
      readFileSync(join('public', 'toolkit', 'maturity-self-check.js'), 'utf8'),
    ].join('\n');
    expect(sources).not.toMatch(/\b(badge|seal|certified|certificate of|your score)\b/i);
    expect(sources).not.toContain('—');
  });
});

// ---- 2. Shared helpers -----------------------------------------------------

test.describe('toolkit lib.js', () => {
  test('CSV follows RFC 4180 and guards formulas', () => {
    expect(
      toCsv([
        ['a', 'b,c', 'say "hi"'],
        ['line\nbreak', 3, '=SUM(A1)'],
      ]),
    ).toBe('a,"b,c","say ""hi"""\r\n"line\nbreak",3,\'=SUM(A1)\r\n');
    expect(toCsv([['=x', null]], { guardFormulas: false })).toBe('=x,\r\n');
  });

  test('iCalendar follows RFC 5545: required properties, all-day dates, escaping, folding', () => {
    const now = new Date(Date.UTC(2026, 8, 24, 10, 5, 7));
    const ics = toIcs({
      name: 'Deadlines',
      now,
      events: [
        { id: 'gpai-legacy', date: '2027-08-02', summary: `Ärzte; a, b \\ c\nd ${'ü'.repeat(60)}` },
        { uid: 'fixed@example.org', date: '2026-12-30', endDate: '2027-01-01', summary: 'Span' },
      ],
    });
    const lines = ics.split('\r\n');
    expect(ics.endsWith('\r\n')).toBe(true);
    expect(/[^\r]\n/.test(ics)).toBe(false);
    for (const line of lines) expect(new TextEncoder().encode(line).length).toBeLessThanOrEqual(75);
    expect(lines.slice(0, 2)).toEqual(['BEGIN:VCALENDAR', 'VERSION:2.0']);
    expect(lines.filter((l) => l.startsWith('PRODID:'))).toHaveLength(1);
    expect(lines.filter((l) => l === 'DTSTAMP:20260924T100507Z')).toHaveLength(2);
    expect(lines).toContain(`UID:${icsUid('gpai-legacy')}`);
    expect(icsUid('gpai-legacy')).toMatch(/^gpai-legacy-[0-9a-f]{8}@aigovernanceengineer\.com$/);
    expect(lines).toContain('UID:fixed@example.org');
    expect(lines).toContain('DTSTART;VALUE=DATE:20270802');
    expect(lines).toContain('DTEND;VALUE=DATE:20270803');
    expect(lines).toContain('DTSTART;VALUE=DATE:20261230');
    expect(lines).toContain('DTEND;VALUE=DATE:20270102');
    expect(ics.replace(/\r\n /g, '')).toContain('SUMMARY:Ärzte\\; a\\, b \\\\ c\\nd ');
    expect(() => toIcs({ events: [{ date: '2026-02-30', summary: 'x' }] })).toThrow();
    expect(icsText('a;b,c\\d\r\ne')).toBe('a\\;b\\,c\\\\d\\ne');
    const folded = foldLine(`X:${'€'.repeat(40)}`);
    expect(folded.replace(/\r\n /g, '')).toBe(`X:${'€'.repeat(40)}`);
  });

  test('iCalendar UIDs stay unique past the slug length (RFC 5545 section 3.8.4.7)', () => {
    // Seven incident-clock steps under a 48-character record id: the ids
    // share their first 60 characters within a regime, so a truncated slug
    // alone collided (3 distinct UIDs for 7 events).
    const record = 'INC-2026-0925-customer-support-assistant-eu-prod';
    const steps = [
      'nis2_art23-early-warning', 'nis2_art23-notification', 'nis2_art23-final',
      'dora_art19-initial', 'dora_art19-intermediate', 'dora_art19-final', 'gdpr_art33-notify',
    ];
    const events = steps.map((step, i) => ({
      id: `${record}-${step}`,
      date: `2026-10-0${i + 1}`,
      summary: step,
    }));
    const uids = toIcs({ events }).split('\r\n').filter((l) => l.startsWith('UID:'));
    expect(uids).toHaveLength(7);
    expect(new Set(uids).size).toBe(7);
    // Stable: the same id always gives the same UID, so a re-import updates.
    expect(icsUid(`${record}-dora-final`)).toBe(icsUid(`${record}-dora-final`));
    // Two events with one UID are refused rather than silently merged.
    expect(() =>
      toIcs({ events: [{ id: 'a', date: '2026-10-01', summary: 'x' }, { id: 'a', date: '2026-10-02', summary: 'y' }] }),
    ).toThrow(/share the UID/);
  });

  test('iCalendar timed events: UTC start, busy, display alarms (RFC 5545 sections 3.3.5, 3.6.6)', () => {
    const due = Date.UTC(2026, 8, 19, 15, 2, 0);
    const ics = toIcs({
      now: new Date(Date.UTC(2026, 8, 18, 15, 2, 0)),
      events: [
        { id: 'nis2-early-warning', start: due, alarms: [1440, 60], summary: 'NIS2: early warning, due 17:02' },
        { id: 'dora-initial', start: due, durationMinutes: 15, summary: 'DORA: initial' },
      ],
    });
    const lines = ics.split('\r\n');
    expect(lines.filter((l) => l === 'DTSTART:20260919T150200Z')).toHaveLength(2);
    expect(lines).toContain('DTEND:20260919T153200Z');
    expect(lines).toContain('DTEND:20260919T151700Z');
    expect(lines.filter((l) => l === 'TRANSP:OPAQUE')).toHaveLength(2);
    expect(lines.some((l) => l.startsWith('DTSTART;VALUE=DATE'))).toBe(false);
    expect(lines.filter((l) => l === 'BEGIN:VALARM')).toHaveLength(2);
    expect(lines.filter((l) => l === 'ACTION:DISPLAY')).toHaveLength(2);
    expect(lines).toContain('TRIGGER:-P1D');
    expect(lines).toContain('TRIGGER:-PT1H');
    expect(lines).toContain('DESCRIPTION:NIS2: early warning\\, due 17:02');
    // Each alarm closes inside its event.
    expect(lines.indexOf('END:VALARM')).toBeLessThan(lines.indexOf('END:VEVENT'));
    expect(() => toIcs({ events: [{ start: Number.NaN, summary: 'x' }] })).toThrow();
    expect(() => toIcs({ events: [{ start: due, durationMinutes: 0, summary: 'x' }] })).toThrow();
  });

  test('fragment codec, slugs and escaping', () => {
    expect(encodeFragment({ v: 1, l: '32432', n: 'Payments & risk', e: '' })).toBe(
      'v=1&l=32432&n=Payments+%26+risk',
    );
    expect(decodeFragment('#v=1&l=32432&n=Payments+%26+risk')).toEqual({
      v: '1',
      l: '32432',
      n: 'Payments & risk',
    });
    expect(decodeFragment('#main')).toEqual({});
    expect(slug('Équipe Paiements / Q3 2026!')).toBe('equipe-paiements-q3-2026');
    expect(mdCell('a|b\nc')).toBe('a\\|b c');
    expect(xml('<a & "b">')).toBe('&lt;a &amp; &quot;b&quot;&gt;');
  });
});

// ---- 3. Pages --------------------------------------------------------------

/** Pick a level for each layer by clicking its label (the row is the target). */
async function answer(page: Page, levelsByLayer: number[]) {
  for (const [i, level] of levelsByLayer.entries()) {
    await page.locator(`label[for="msc-l${i + 1}-${level}"]`).click();
  }
}

async function saved(download: Download): Promise<Buffer> {
  const path = await download.path();
  expect(path).toBeTruthy();
  return readFileSync(path as string);
}

test.describe('/toolkit', () => {
  test('lists the registry and links the live tool', async ({ page }) => {
    await page.goto('/toolkit');
    await expect(page.locator('h1')).toHaveCount(1);
    // The first notice is the tool disclaimer; the second points to the MCP server.
    await expect(page.locator('.tool-notice').first()).toHaveText(NOTICE);
    const cards = page.locator('[data-tool-card]');
    await expect(cards).toHaveCount(tools.length);
    const live = page.locator('[data-tool-card="maturity-self-check"] a');
    await expect(live).toHaveAttribute('href', TOOL);
    for (const tool of tools.filter((t) => t.status === 'planned')) {
      await expect(page.locator(`[data-tool-card="${tool.id}"] a`)).toHaveCount(0);
    }
  });

  for (const [path, type] of [
    ['/toolkit', 'CollectionPage'],
    [TOOL, 'WebApplication'],
  ] as const) {
    test(`${path}: head metadata and a ${type} node in the graph`, async ({ page }) => {
      await page.goto(path);
      const title = (await page.locator('head > title').textContent()) ?? '';
      expect(title.length).toBeLessThanOrEqual(70);
      const description =
        (await page.locator('meta[name="description"]').getAttribute('content')) ?? '';
      expect(description.length).toBeGreaterThanOrEqual(50);
      expect(description.length).toBeLessThanOrEqual(160);
      await expect(page.locator('link[rel="canonical"]')).toHaveAttribute(
        'href',
        `https://aigovernanceengineer.com${path}`,
      );
      const raw = await page.locator('script[type="application/ld+json"]').first().textContent();
      const graph = JSON.parse(raw ?? '{}')['@graph'] as { '@type': string }[];
      const types = graph.map((node) => node['@type']);
      expect(types).toContain(type);
      expect(types).toContain('BreadcrumbList');
    });
  }
});

test.describe('maturity self-check without JavaScript', () => {
  test.use({ javaScriptEnabled: false });

  test('still teaches: notice, criteria, metrics, checklist; no dead controls', async ({
    page,
  }) => {
    await page.goto(TOOL);
    await expect(page.locator('#tool-notice')).toHaveText(NOTICE);
    await expect(page.locator('[data-tool-nojs]')).toBeVisible();
    await expect(page.locator('input[type="radio"]')).toHaveCount(30);
    // The five layer fieldsets; the compare section's pair picker stays hidden.
    await expect(page.locator('fieldset legend:visible')).toHaveCount(5);
    await expect(page.getByText('Registry reconciled against production')).toBeVisible();
    await expect(page.locator('#msc-metrics')).toBeVisible();
    await expect(page.locator('#msc-checklist')).toBeVisible();
    await expect(page.locator('#msc-by-hand')).toBeVisible();
    await expect(page.locator('[data-msc-result]')).toBeHidden();
    await expect(page.locator('#msc-compare')).toBeHidden();
    await expect(page.getByRole('button', { name: 'Show my profile', exact: true })).toBeHidden();
  });
});

test.describe('maturity self-check', () => {
  test('asks for every layer, then shows the profile, floor and next move', async ({ page }) => {
    await page.goto(TOOL);
    await expect(page.locator('[data-tool-nojs]')).toBeHidden();

    await page.getByRole('button', { name: 'Show my profile', exact: true }).click();
    const summary = page.locator('[data-msc-errors]');
    await expect(summary).toBeVisible();
    await expect(summary).toBeFocused();
    await expect(summary.locator('li')).toHaveCount(5);
    await expect(page.locator('#msc-layer-3-error')).toBeVisible();
    await expect(page.locator('#msc-layer-3')).toHaveAttribute(
      'aria-describedby',
      /msc-layer-3-error/,
    );

    await page.locator('#msc-label').fill('Payments team');
    await answer(page, [3, 2, 4, 3, 2]);
    await expect(page.locator('#msc-layer-3-error')).toBeHidden();
    await page.getByRole('button', { name: 'Show my profile', exact: true }).click();

    const result = page.locator('[data-msc-result]');
    await expect(result).toBeVisible();
    await expect(page.locator('#msc-result-title')).toBeFocused();
    await expect(result.locator('svg[role="img"]')).toHaveCount(1);
    await expect(result.locator('[data-msc-rows] tr')).toHaveCount(5);
    await expect(page.locator('[data-msc-floor]')).toHaveText(
      'Level 2, Inventoried. Set by Inventory & Transparency and Assurance & Continuous Compliance.',
    );
    const next = page.locator('[data-msc-next]');
    await expect(next).toContainText(
      'Raise Inventory & Transparency from Level 2 (Inventoried) to Level 3 (Tested)',
    );
    await expect(next).toContainText('Registry reconciled against production');
    await expect(next.locator('a')).toHaveAttribute(
      'href',
      /\/bok\/patterns#pattern-shadow-ai-discovery$/,
    );
    await expect(next).toContainText('Assurance & Continuous Compliance shares the floor');

    // State in the fragment, and the result follows later edits live.
    expect(new URL(page.url()).hash).toContain('l=32432');
    expect(new URL(page.url()).hash).toContain('n=Payments+team');
    await page.locator('label[for="msc-l2-4"]').click();
    await page.locator('label[for="msc-l5-3"]').click();
    await expect(page.locator('[data-msc-floor]')).toContainText('Level 3, Tested');
    expect(new URL(page.url()).hash).toContain('l=34433');
  });

  test('a link reproduces the result; the ends of the ladder read correctly', async ({ page }) => {
    await page.goto(`${TOOL}#v=1&l=32432&n=Shared`);
    await expect(page.locator('[data-msc-result]')).toBeVisible();
    await expect(page.locator('#msc-l3-4')).toBeChecked();
    await expect(page.locator('#msc-label')).toHaveValue('Shared');

    await page.goto(`${TOOL}#v=1&l=01111`);
    await expect(page.locator('[data-msc-floor]')).toContainText('No level yet: Govern-as-Code');
    await expect(page.locator('[data-msc-next]')).toContainText('Bring Govern-as-Code to Level 1');

    await page.goto(`${TOOL}#v=1&l=55555`);
    await expect(page.locator('[data-msc-next]')).toContainText('Every layer reads Level 5');

    // A plain anchor is not state (fresh load: a same-document hash change
    // keeps whatever result is already on screen).
    await page.goto('/toolkit');
    await page.goto(`${TOOL}#msc-how`);
    await expect(page.locator('[data-msc-result]')).toBeHidden();
  });

  test('exports JSON, Markdown, SVG and PNG, and the JSON imports back', async ({ page }) => {
    await page.goto(`${TOOL}#v=1&l=32432&n=Payments%20team`);
    await expect(page.locator('[data-msc-result]')).toBeVisible();

    const [json] = await Promise.all([
      page.waitForEvent('download'),
      page.getByRole('button', { name: 'Download JSON', exact: true }).click(),
    ]);
    expect(json.suggestedFilename()).toBe('maturity-profile-payments-team.json');
    const jsonBody = await saved(json);
    const profile = JSON.parse(jsonBody.toString('utf8'));
    expect(profile.kind).toBe('aige.maturity-profile');
    expect(profile.version).toBe(1);
    expect(profile.label).toBe('Payments team');
    expect(profile.layers.map((l: { level: number }) => l.level)).toEqual([3, 2, 4, 3, 2]);
    expect(profile.floor).toEqual({ level: 2, levelName: 'Inventoried', layers: [2, 5] });
    expect(profile.nextMove.pattern).toMatch(/#pattern-shadow-ai-discovery$/);
    expect(profile.notice).toBe(NOTICE);

    const [md] = await Promise.all([
      page.waitForEvent('download'),
      page.getByRole('button', { name: 'Download report (Markdown)', exact: true }).click(),
    ]);
    const report = (await saved(md)).toString('utf8');
    expect(report).toContain('# Maturity self-check: Payments team');
    expect(report).toContain('> Indicative, not legal advice and not a conformity claim.');
    expect(report).toContain(
      '| 2 Inventory & Transparency | 2 Inventoried | Registry fed by deploy; owner + scope per system |',
    );
    expect(report).toContain('Profile link: ');
    expect(report).not.toContain('—');

    const [svg] = await Promise.all([
      page.waitForEvent('download'),
      page.getByRole('button', { name: 'Download image (SVG)', exact: true }).click(),
    ]);
    const svgText = (await saved(svg)).toString('utf8');
    expect(svgText.startsWith('<?xml')).toBe(true);
    expect(svgText).toContain('xmlns="http://www.w3.org/2000/svg"');
    expect(svgText).toContain('Maturity profile: Payments team');
    expect(svgText).not.toContain('var(--');

    const [png] = await Promise.all([
      page.waitForEvent('download'),
      page.getByRole('button', { name: 'Download image (PNG)', exact: true }).click(),
    ]);
    expect(png.suggestedFilename()).toBe('maturity-profile-payments-team.png');
    const pngBytes = await saved(png);
    expect([...pngBytes.subarray(0, 8)]).toEqual([0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a]);

    // Round trip: the exported file imports as a saved profile.
    await page.locator('#msc-import').setInputFiles({
      name: 'profile.json',
      mimeType: 'application/json',
      buffer: jsonBody,
    });
    await expect(page.locator('[data-msc-saved] li')).toHaveCount(1);
    await expect(page.locator('[data-msc-saved] li')).toContainText('Payments team');
    await expect(page.locator('[data-msc-saved] li')).toContainText('levels 3 2 4 3 2');

    // A wrong file is refused with a reason next to the control.
    await page.locator('#msc-import').setInputFiles({
      name: 'bad.json',
      mimeType: 'application/json',
      buffer: Buffer.from(
        JSON.stringify({
          kind: 'aige.maturity-profile',
          version: 1,
          layers: [{ layer: 1, level: 9 }],
        }),
      ),
    });
    await expect(page.locator('#msc-import-error')).toBeVisible();
    await expect(page.locator('#msc-import')).toHaveAttribute('aria-invalid', 'true');
    await expect(page.locator('[data-msc-saved] li')).toHaveCount(1);
  });

  test('copies a link that carries the answers', async ({ page, context }) => {
    await context.grantPermissions(['clipboard-read', 'clipboard-write']);
    await page.goto(`${TOOL}#v=1&l=32432`);
    await page.getByRole('button', { name: 'Copy link', exact: true }).click();
    await expect(page.locator('[data-msc-status]')).toContainText('Link copied');
    const copied = await page.evaluate(() => navigator.clipboard.readText());
    expect(copied).toContain(`${TOOL}#v=1&l=32432`);
  });

  test('compares a saved profile with the current answers', async ({ page }) => {
    await page.goto(`${TOOL}#v=1&l=21121&n=Q2`);
    await expect(page.locator('[data-msc-result]')).toBeVisible();
    await page.getByRole('button', { name: 'Save in this browser', exact: true }).click();
    await expect(page.locator('[data-msc-status]')).toContainText('Saved as "Q2"');

    await page.locator('#msc-label').fill('Q3');
    await answer(page, [3, 2, 2, 2, 1]);
    await page.locator('#msc-before').selectOption({ label: 'Q2 (2 1 1 2 1)' });
    await page.locator('#msc-after').selectOption('current');
    await page.getByRole('button', { name: 'Compare', exact: true }).click();

    const box = page.locator('[data-msc-comparison]');
    await expect(box).toBeVisible();
    await expect(page.locator('#msc-comparison-title')).toBeFocused();
    const rows = box.locator('[data-msc-cmp-rows] tr');
    await expect(rows).toHaveCount(5);
    await expect(rows.nth(0)).toContainText('Up 1');
    await expect(rows.nth(3)).toContainText('No change');
    await expect(box.locator('[data-msc-cmp-floor]')).toHaveText(
      'Floor unchanged at Level 1 (Documented).',
    );
    expect(new URL(page.url()).hash).toContain('ca=21121');
    expect(new URL(page.url()).hash).toContain('cb=32221');

    // The same pair twice is refused.
    await page.locator('#msc-before').selectOption('current');
    await page.getByRole('button', { name: 'Compare', exact: true }).click();
    await expect(page.locator('#msc-pair-error')).toHaveText('Choose two different profiles.');
  });

  test('sends nothing the reader enters', async ({ page }) => {
    const requests: { url: string; method: string }[] = [];
    await page.goto(TOOL);
    await page.waitForLoadState('networkidle');
    page.on('request', (request) =>
      requests.push({ url: request.url(), method: request.method() }),
    );

    await page.locator('#msc-label').fill('Secret platform');
    await answer(page, [1, 2, 3, 4, 5]);
    await page.getByRole('button', { name: 'Show my profile', exact: true }).click();
    await expect(page.locator('[data-msc-result]')).toBeVisible();
    await Promise.all([
      page.waitForEvent('download'),
      page.getByRole('button', { name: 'Download JSON', exact: true }).click(),
    ]);
    await page.getByRole('button', { name: 'Save in this browser', exact: true }).click();

    const origin = new URL(page.url()).origin;
    for (const request of requests) {
      // Blob and data URLs are the downloads themselves, made in the page.
      if (/^(blob|data):/.test(request.url)) continue;
      expect(request.method, request.url).toBe('GET');
      expect(new URL(request.url).origin, request.url).toBe(origin);
      expect(request.url).not.toContain('Secret');
      expect(request.url).not.toContain('l=12345');
    }
  });

  test('prints the result without chrome or controls', async ({ page }) => {
    await page.goto(`${TOOL}#v=1&l=32432`);
    await expect(page.locator('[data-msc-result]')).toBeVisible();
    await page.emulateMedia({ media: 'print' });
    await expect(page.locator('.site-header')).toBeHidden();
    await expect(page.locator('[data-msc-result] .tool-actions')).toBeHidden();
    await expect(page.locator('[data-msc-form]')).toBeHidden();
    await expect(page.locator('#tool-notice')).toBeVisible();
    await expect(page.locator('[data-msc-result]')).toBeVisible();
  });

  for (const route of ['/toolkit', TOOL]) {
    test(`no horizontal scroll at 390px on ${route}`, async ({ page }) => {
      await page.setViewportSize({ width: 390, height: 844 });
      await page.goto(route === TOOL ? `${TOOL}#v=1&l=32432` : route);
      const overflow = await page.evaluate(
        () => document.documentElement.scrollWidth - document.documentElement.clientWidth,
      );
      expect(overflow).toBeLessThanOrEqual(0);
    });
  }
});
