// crosswalk-explorer.spec.ts: the clause-to-clause explorer on
// /resources/crosswalk#explore (public/crosswalk-explorer.js). Checks the
// default view, the shareable fragment, the topic and verified-only filters,
// the gap view, and the three downloads, including the shape of the OSCAL
// 1.2.3 mapping collection (required fields per the NIST metaschema:
// uuid, metadata{title,last-modified,version,oscal-version}, provenance
// {method,matching-rationale,status,mapping-description}, mappings[] with
// source-resource, target-resource and maps[] of relationship/sources/targets).
import { test, expect, type Page, type Download } from '@playwright/test';
import { readFileSync } from 'node:fs';
import { topics } from '../src/data/crosswalk';

const UUID = /^[0-9A-Fa-f]{8}-[0-9A-Fa-f]{4}-[45][0-9A-Fa-f]{3}-[89ABab][0-9A-Fa-f]{3}-[0-9A-Fa-f]{12}$/;
const TOKEN = /^(\p{L}|_)(\p{L}|\p{N}|[.\-_])*$/u;
const NOTICE = 'not a claim of conformity';

async function openExplorer(page: Page, hash = '#explore'): Promise<void> {
  await page.goto(`/resources/crosswalk${hash}`);
  await expect(page.locator('[data-cwx-form]')).toBeVisible();
  await expect(page.locator('[data-cwx-status]')).toContainText('clause pair');
}

async function saved(download: Download): Promise<string> {
  const path = await download.path();
  return readFileSync(path as string, 'utf8');
}

test('default view pairs EU AI Act clauses with ISO/IEC 42001 side by side', async ({ page }) => {
  await openExplorer(page);
  const rows = page.locator('.cwx-row');
  expect(await rows.count()).toBeGreaterThan(5);
  const first = rows.first();
  await expect(first.locator('.cwx-side--src .cw-chip').first()).toBeVisible();
  await expect(first.locator('.cwx-side--tgt')).toBeVisible();
  // The target cannot also be a source.
  await expect(page.locator('input[name="cwx-src"][value="iso-42001"]')).toBeDisabled();
});

test('choices are written to a shareable fragment and restored from it', async ({ page }) => {
  await openExplorer(page);
  await page.locator('input[name="cwx-src"][value="gdpr"]').check();
  await page.locator('select[name="cwx-tgt"]').selectOption('nist-ai-rmf');
  await expect(page).toHaveURL(/#explore\?src=eu-ai-act,gdpr&tgt=nist-ai-rmf/);

  const shared = new URL(page.url()).hash;
  const other = await page.context().newPage();
  await openExplorer(other, shared);
  await expect(other.locator('input[name="cwx-src"][value="gdpr"]')).toBeChecked();
  await expect(other.locator('select[name="cwx-tgt"]')).toHaveValue('nist-ai-rmf');
  await other.close();
});

test('topic filter narrows to one topic; verified-only hides unverified chips', async ({
  page,
}) => {
  await openExplorer(page, '#explore?src=eu-ai-act&tgt=iso-42001');
  const topic = topics.find((t) => t.id === 'ai-literacy')!;
  await page.locator('select[name="cwx-topic"]').selectOption(topic.id);
  await expect(page.locator('.cwx-row')).toHaveCount(1);
  await expect(page.locator('.cwx-row h3')).toHaveText(topic.name);

  await page.locator('select[name="cwx-topic"]').selectOption('all');
  await page.locator('input[name="cwx-verified"]').check();
  await expect(page.locator('.cwx-out .cw-chip.is-unverified')).toHaveCount(0);
  await expect(page).toHaveURL(/verified=1/);
});

test('gap view lists target clauses no chosen source reaches', async ({ page }) => {
  await openExplorer(page, '#explore?src=kr-ai-basic-act&tgt=iso-42001&view=gaps');
  await expect(page.locator('input[name="cwx-view"][value="gaps"]')).toBeChecked();
  const gaps = page.locator('.cwx-gaps > li');
  expect(await gaps.count()).toBeGreaterThan(0);
  await expect(gaps.first()).toContainText('Topics:');
  await expect(page.locator('[data-cwx-status]')).toContainText('have no mapping');
});

test('CSV and JSON downloads carry the notice and the selection', async ({ page }) => {
  await openExplorer(page, '#explore?src=eu-ai-act&tgt=nist-ai-rmf');

  const [csvDl] = await Promise.all([
    page.waitForEvent('download'),
    page.locator('[data-cwx-action="csv"]').click(),
  ]);
  const csv = await saved(csvDl);
  expect(csv.split('\r\n')[0]).toContain(NOTICE);
  expect(csv.split('\r\n')[1].startsWith('Relationship,Confidence,Source framework')).toBe(true);
  expect(csv).toContain('intersects-with');

  const [jsonDl] = await Promise.all([
    page.waitForEvent('download'),
    page.locator('[data-cwx-action="json"]').click(),
  ]);
  const json = JSON.parse(await saved(jsonDl));
  expect(json.notice).toContain(NOTICE);
  expect(json.selection).toMatchObject({ sources: ['eu-ai-act'], target: 'nist-ai-rmf' });
  expect(json.pairs.length).toBeGreaterThan(0);
  expect(json.pairs[0].relationship).toBe('intersects-with');
});

test('OSCAL download is a 1.2.3 mapping collection marked illustrative', async ({ page }) => {
  await openExplorer(page, '#explore?src=eu-ai-act,csa-aicm&tgt=iso-42001');
  const [dl] = await Promise.all([
    page.waitForEvent('download'),
    page.locator('[data-cwx-action="oscal"]').click(),
  ]);
  expect(dl.suggestedFilename()).toMatch(/\.oscal\.json$/);
  const doc = JSON.parse(await saved(dl));
  const mc = doc['mapping-collection'];
  expect(Object.keys(doc)).toEqual(['mapping-collection']);
  expect(mc.uuid).toMatch(UUID);

  expect(mc.metadata['oscal-version']).toBe('1.2.3');
  expect(mc.metadata.title).toContain(NOTICE);
  expect(mc.metadata.remarks).toContain(NOTICE);
  expect(Number.isNaN(Date.parse(mc.metadata['last-modified']))).toBe(false);
  expect(typeof mc.metadata.version).toBe('string');

  expect(mc.provenance).toMatchObject({
    method: 'hybrid',
    'matching-rationale': 'semantic',
    status: 'draft',
  });
  expect(mc.provenance['mapping-description']).toContain(NOTICE);

  // One mapping per source framework with at least one pair.
  expect(mc.mappings).toHaveLength(2);
  for (const mapping of mc.mappings) {
    expect(mapping.uuid).toMatch(UUID);
    expect(mapping['source-resource'].type).toBe('catalog');
    expect(mapping['target-resource'].type).toBe('catalog');
    expect(mapping['source-resource'].href).toMatch(/^https:\/\//);
    expect(mapping.maps.length).toBeGreaterThan(0);
    for (const map of mapping.maps) {
      expect(map.uuid).toMatch(UUID);
      expect(map.relationship).toBe('intersects-with');
      expect(['medium', 'low']).toContain(map['confidence-score'].category);
      for (const item of [...map.sources, ...map.targets]) {
        expect(item.type).toBe('control');
        expect(item['id-ref']).toMatch(TOKEN);
      }
    }
    for (const key of ['source-gap-summary', 'target-gap-summary']) {
      if (!mapping[key]) continue;
      expect(mapping[key].uuid).toMatch(UUID);
      for (const sel of mapping[key]['unmapped-controls']) {
        for (const id of sel['with-ids']) expect(id).toMatch(TOKEN);
      }
    }
  }
  // CSA AICM id-refs follow CSA's own OSCAL catalog ids (A&A-01 -> A_A-01).
  const csa = mc.mappings.find(
    (m: { 'source-resource': { props: { value: string }[] } }) =>
      m['source-resource'].props[0].value === 'csa-aicm',
  );
  for (const map of csa.maps) expect(map.sources[0]['id-ref']).not.toContain('&');
});

test('with no source chosen, the downloads that need pairs are disabled', async ({ page }) => {
  await openExplorer(page, '#explore?src=eu-ai-act&tgt=iso-42001');
  await page.locator('input[name="cwx-src"][value="eu-ai-act"]').uncheck();
  await expect(page.locator('.cwx-out')).toContainText('Choose at least one source framework');
  await expect(page.locator('[data-cwx-action="oscal"]')).toBeDisabled();
});
