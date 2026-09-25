// obligations-planner.spec.ts: the obligations and deadlines planner
// (/toolkit/obligations-planner) and the obligation-to-evidence chain on the
// /obligations/<id> pages. Three layers of checks:
// 1. data (pure Node): every EU AI Act and GPAI row is mapped to roles; the
//    per-class dates come from the register; the importer, distributor and
//    authorised-representative duties are register rows, so none sits outside
//    it; the registry entry, budgets and house style hold;
// 2. the pure core (public/toolkit/obligations-planner-core.js) run in Node on
//    the model the built page ships in its JSON island: matching, dates,
//    statuses, link codec and every export (Markdown, CSV, JSON against its
//    published schema, iCalendar);
// 3. the pages in a browser: no-JS worksheet, validation, result, link state,
//    downloads, no network use with what the reader enters, print, reflow, the
//    chain figure and the Open Graph cards.
import { test, expect } from '@playwright/test';
import type { APIRequestContext, Download, Page } from '@playwright/test';
import { existsSync, readFileSync } from 'node:fs';
import { join } from 'node:path';
import { gzipSync } from 'node:zlib';

import { obligations } from '../src/data/frameworks';
import {
  plannerRoles,
  plannerClasses,
  plannerDuties,
  plannerRows,
  rowTimeline,
  outsideDuties,
} from '../src/data/obligations-planner';
import { tools, toolById } from '../src/data/toolkit';
import { chainFor, shortLabel, wrap } from '../src/lib/evidence-chain';
import { validate } from './helpers/json-schema-lite';
import { toCsv, toIcs } from '../public/toolkit/lib.js';
import {
  encodeState,
  decodeState,
  planFor,
  planDates,
  planMarkdown,
  planCsvRows,
  planJson,
  planIcsEvents,
  timelineSvg,
  statusOn,
  isIsoDate,
  CSV_HEADER,
  PLAN_KIND,
} from '../public/toolkit/obligations-planner-core.js';

const TOOL = '/toolkit/obligations-planner';
const SCHEMA = '/toolkit/obligations-plan.v1.schema.json';
const NOTICE =
  'Indicative, not legal advice and not a conformity claim. Nothing you enter leaves your browser.';
const AID = 'A reading aid, not legal advice. Mappings are illustrative, not a claim of conformity.';
const FILES = [
  join('src', 'pages', 'toolkit', 'obligations-planner.astro'),
  join('src', 'data', 'obligations-planner.ts'),
  join('src', 'lib', 'evidence-chain.ts'),
  join('src', 'lib', 'obligations-plan-schema.ts'),
  join('src', 'components', 'obligations', 'EvidenceChain.astro'),
  join('public', 'toolkit', 'obligations-planner.js'),
  join('public', 'toolkit', 'obligations-planner-core.js'),
];

// ---- 1. Data ---------------------------------------------------------------

test.describe('planner data', () => {
  test('every EU AI Act and GPAI row is mapped, and every mapping names a real row', () => {
    const rows = plannerRows();
    const eu = obligations.filter((o) => ['eu-ai-act', 'gpai-code-of-practice'].includes(o.frameworkId));
    expect(rows.map((r) => r.id)).toEqual(eu.map((r) => r.id));
    const roleIds = new Set(plannerRoles.map((r) => r.id));
    for (const [id, duty] of Object.entries(plannerDuties)) {
      expect(duty.roles.length, id).toBeGreaterThan(0);
      for (const role of duty.roles) expect(roleIds.has(role), `${id} ${role}`).toBe(true);
      for (const role of Object.keys(duty.notes ?? {})) {
        expect(duty.roles.includes(role as never), `${id} note for unmapped role ${role}`).toBe(true);
      }
    }
  });

  test('the mapping follows the duty holder the register states', () => {
    for (const row of plannerRows()) {
      const roles = plannerDuties[row.id].roles;
      const holder = row.dutyHolder ?? '';
      if (/^GPAI provider \(systemic risk\)$/.test(holder)) expect(roles).toEqual(['gpai-systemic']);
      else if (/^GPAI provider$/.test(holder)) expect(roles).toEqual(['gpai-provider', 'gpai-systemic']);
      else if (/^Deployer$/.test(holder)) expect(roles).toEqual(['deployer']);
      if (/provider/i.test(holder) && !/GPAI/.test(holder)) expect(roles, row.id).toContain('provider');
      if (/deployer/i.test(holder)) expect(roles, row.id).toContain('deployer');
    }
  });

  test('codes are unique two-letter codes', () => {
    const codes = [...plannerRoles, ...plannerClasses].map((e) => e.code);
    for (const code of codes) expect(code).toMatch(/^[a-z0-9]{2}$/);
    expect(new Set(codes).size).toBe(codes.length);
  });

  test('per-class starts: Annex I starts on its milestone; the new Art. 5 bans stay a step', () => {
    const byId = (id: string) => obligations.find((o) => o.id === id)!;
    const art9 = rowTimeline(byId('AIGE-OBL-EUAIA-ART9'));
    expect(art9.starts).toEqual({ 'high-risk-annex-iii': '2027-12-02', 'high-risk-annex-i': '2028-08-02' });
    expect(art9.steps.find((s) => s.date === '2028-08-02')?.startFor).toEqual(['high-risk-annex-i']);
    expect(art9.steps.find((s) => s.date === '2030-08-02')?.startFor).toEqual([]);
    const art5 = rowTimeline(byId('AIGE-OBL-EUAIA-ART5'));
    expect(art5.starts).toEqual({ prohibited: '2025-02-02' });
    expect(art5.steps.map((s) => [s.date, s.startFor])).toEqual([['2026-12-02', []]]);
  });

  test('the importer, distributor and representative duties are register rows', () => {
    // Arts. 22, 23, 24 and 54 were duties outside the register until v0.5.0.
    expect(outsideDuties()).toEqual([]);
    expect(plannerDuties['AIGE-OBL-EUAIA-ART22'].roles).toEqual(['provider', 'authorised-representative']);
    expect(plannerDuties['AIGE-OBL-EUAIA-ART23'].roles).toEqual(['importer']);
    expect(plannerDuties['AIGE-OBL-EUAIA-ART24'].roles).toEqual(['distributor']);
    const art54 = plannerDuties['AIGE-OBL-EUAIA-ART54'];
    expect(art54.roles).toEqual(['gpai-provider', 'gpai-systemic', 'authorised-representative']);
    // The mandate, not a ticked class, says the model is a GPAI model.
    expect(art54.anyClass).toEqual(['authorised-representative']);
    const art9 = rowTimeline(obligations.find((o) => o.id === 'AIGE-OBL-EUAIA-ART9')!);
    for (const id of ['AIGE-OBL-EUAIA-ART22', 'AIGE-OBL-EUAIA-ART23', 'AIGE-OBL-EUAIA-ART24']) {
      expect(rowTimeline(obligations.find((o) => o.id === id)!).starts, id).toEqual(art9.starts);
    }
  });

  test('the registry entry is live with its page and modules', () => {
    const tool = toolById('obligations-planner');
    expect(tool.status).toBe('live');
    expect(tool.href).toBe(TOOL);
    expect(tools.filter((t) => t.id === 'obligations-planner')).toHaveLength(1);
    for (const file of FILES) expect(existsSync(file), file).toBe(true);
  });

  test('house style: no em dash, no badge or certificate wording, the notices present', () => {
    const text = FILES.map((file) => readFileSync(file, 'utf8')).join('\n');
    expect(text).not.toContain('—');
    expect(text).not.toMatch(/\b(badge|seal|certified|certificate of|your score|makes you compliant|guarantees compliance)\b/i);
    expect(text).toContain(AID);
    expect(text).toContain('not affiliated with or endorsed by IAPP');
  });

  test('each client script gzips to 15 KB or less (VISUAL-GUIDE §6.6)', () => {
    for (const name of ['obligations-planner.js', 'obligations-planner-core.js']) {
      const size = gzipSync(readFileSync(join('public', 'toolkit', name))).length;
      expect(size, name).toBeLessThanOrEqual(15 * 1024);
    }
  });

  test('chain labels: four words at most, wrapped lines within budget', () => {
    expect(shortLabel('Risk register as code; threat models; linkage to FRIA and eval results')).toBe(
      'Risk register as code',
    );
    expect(shortLabel('Auto-generated EU declaration of conformity from the evidence')).toBe(
      'Auto-generated EU declaration…',
    );
    expect(shortLabel('AIBOM (CycloneDX ML-BOM, SPDX 3.0 AI); auto-generated technical documentation')).toBe('AIBOM');
    expect(wrap('Evals & Red Teaming as Evidence', 15, 3)).toEqual(['Evals & Red', 'Teaming as', 'Evidence']);
    expect(wrap('one two three four five six', 7, 2)).toEqual(['one two', 'three…']);
  });

  test('every register row has a six-node chain ending in the evidence record', () => {
    for (const row of obligations) {
      const chain = chainFor(row);
      expect(chain.nodes.map((n) => n.kind), row.id).toEqual([
        'clause',
        'holder',
        'date',
        'artefact',
        'layer',
        'evidence',
      ]);
      expect(chain.asOf).toBe(row.reviewed);
      for (const node of chain.nodes) expect(node.full.length, `${row.id} ${node.kind}`).toBeGreaterThan(10);
    }
    const art9 = chainFor(obligations.find((o) => o.id === 'AIGE-OBL-EUAIA-ART9')!);
    expect(art9.records.map((r) => r.name)).toContain('risk-register-entry');
    // "Art. 4" must not pick up the records filed under "Art. 4a" or "Art. 43".
    const art4 = chainFor(obligations.find((o) => o.id === 'AIGE-OBL-EUAIA-ART4')!);
    expect(art4.records.map((r) => r.name)).toEqual(['training-record']);
  });
});

// ---- 2. The pure core on the shipped model ----------------------------------

type Dated = { date: string; kind: string; note: string };
type Model = Record<string, unknown> & { rows: { id: string }[]; asOf: string };

async function shippedModel(request: APIRequestContext): Promise<Model> {
  const html = await (await request.get(TOOL)).text();
  const island = /<script type="application\/json" data-tool-data>([\s\S]*?)<\/script>/.exec(html);
  expect(island, 'JSON island').toBeTruthy();
  return JSON.parse(island![1]) as Model;
}

const ids = (plan: { items: { row: { id: string } }[] }) => plan.items.map((i) => i.row.id);

test.describe('planner core', () => {
  test('provider and deployer of an Annex III system', async ({ request }) => {
    const model = await shippedModel(request);
    const plan = planFor(model, { roles: ['provider', 'deployer'], classes: ['high-risk-annex-iii'], ref: '2026-09-24' });
    const got = ids(plan);
    for (const id of ['AIGE-OBL-EUAIA-ART4', 'AIGE-OBL-EUAIA-ART5', 'AIGE-OBL-EUAIA-ART9', 'AIGE-OBL-EUAIA-ART26', 'AIGE-OBL-EUAIA-ART27', 'AIGE-OBL-EUAIA-ART49-71', 'AIGE-OBL-EUAIA-ART60']) {
      expect(got, id).toContain(id);
    }
    for (const id of ['AIGE-OBL-EUAIA-ART50', 'AIGE-OBL-EUAIA-ART53', 'AIGE-OBL-EUAIA-ART55', 'AIGE-OBL-GPAICOP-SAFETY']) {
      expect(got, id).not.toContain(id);
    }
    const art9 = plan.items.find((i) => i.row.id === 'AIGE-OBL-EUAIA-ART9')!;
    expect(art9.start).toBe('2027-12-02');
    expect(art9.status).toEqual({ key: 'later', label: 'Applies from 2027-12-02', days: 434 });
    expect(art9.dates.map((d: Dated) => d.date)).toEqual(['2027-12-02', '2030-08-02']);
    const art4 = plan.items.find((i) => i.row.id === 'AIGE-OBL-EUAIA-ART4')!;
    expect(art4.status.key).toBe('applies');
    const art27 = plan.items.find((i) => i.row.id === 'AIGE-OBL-EUAIA-ART27')!;
    expect(art27.notes.join(' ')).toContain('Art. 27(1)');
    // In date order.
    const starts = plan.items.map((i) => i.start ?? '9999');
    expect(starts).toEqual([...starts].sort());
    expect(plan.outside).toEqual([]);
  });

  test('an Annex I system starts on the Annex I date, without a duplicate step', async ({ request }) => {
    const model = await shippedModel(request);
    const plan = planFor(model, { roles: ['provider'], classes: ['high-risk-annex-i'], ref: '2026-09-24' });
    const art9 = plan.items.find((i) => i.row.id === 'AIGE-OBL-EUAIA-ART9')!;
    expect(art9.start).toBe('2028-08-02');
    expect(art9.dates.map((d: Dated) => d.date)).toEqual(['2028-08-02', '2030-08-02']);
    // Art. 27 and the registration row are Annex III only.
    expect(ids(plan)).not.toContain('AIGE-OBL-EUAIA-ART27');
    expect(ids(plan)).not.toContain('AIGE-OBL-EUAIA-ART49-71');
    const both = planFor(model, { roles: ['provider'], classes: ['high-risk-annex-iii', 'high-risk-annex-i'], ref: '2026-09-24' });
    const art9b = both.items.find((i) => i.row.id === 'AIGE-OBL-EUAIA-ART9')!;
    expect(art9b.dates.map((d: Dated) => [d.date, d.kind])).toEqual([
      ['2027-12-02', 'start'],
      ['2028-08-02', 'step'],
      ['2030-08-02', 'step'],
    ]);
  });

  test('GPAI roles carry the GPAI rows, the systemic ones only for systemic risk', async ({ request }) => {
    const model = await shippedModel(request);
    const plain = ids(planFor(model, { roles: ['gpai-provider'], classes: [], ref: '2026-09-24' }));
    expect(plain).toEqual([
      'AIGE-OBL-EUAIA-ART53',
      'AIGE-OBL-EUAIA-ART53-1C',
      'AIGE-OBL-EUAIA-ART54',
      'AIGE-OBL-EUAIA-ART87',
      'AIGE-OBL-GPAICOP-TRANSPARENCY',
      'AIGE-OBL-GPAICOP-COPYRIGHT',
    ]);
    const systemic = ids(planFor(model, { roles: ['gpai-systemic'], classes: [], ref: '2026-09-24' }));
    expect(systemic).toEqual([
      'AIGE-OBL-EUAIA-ART52',
      'AIGE-OBL-EUAIA-ART53',
      'AIGE-OBL-EUAIA-ART53-1C',
      'AIGE-OBL-EUAIA-ART54',
      'AIGE-OBL-EUAIA-ART55',
      'AIGE-OBL-EUAIA-ART87',
      'AIGE-OBL-GPAICOP-SAFETY',
      'AIGE-OBL-GPAICOP-TRANSPARENCY',
      'AIGE-OBL-GPAICOP-COPYRIGHT',
      'AIGE-OBL-GPAICOP-SAFETY-C9',
      'AIGE-OBL-GPAICOP-SAFETY-APP1',
    ]);
    const plan = planFor(model, { roles: ['gpai-systemic'], classes: [], ref: '2026-09-24' });
    expect(plan.items.find((i) => i.row.id === 'AIGE-OBL-GPAICOP-SAFETY')!.status.key).toBe('voluntary');
  });

  test('importers, distributors and representatives get their own rows and Art. 25', async ({ request }) => {
    const model = await shippedModel(request);
    const importer = planFor(model, { roles: ['importer'], classes: ['high-risk-annex-iii'], ref: '2026-09-24' });
    expect(ids(importer)).toEqual(['AIGE-OBL-EUAIA-ART87', 'AIGE-OBL-EUAIA-ART23', 'AIGE-OBL-EUAIA-ART25']);
    expect(importer.items.find((i) => i.row.id === 'AIGE-OBL-EUAIA-ART23')!.start).toBe('2027-12-02');
    expect(importer.items.find((i) => i.row.id === 'AIGE-OBL-EUAIA-ART25')!.notes[0]).toContain('Art. 25(1)');
    expect(importer.outside).toEqual([]);
    // With no class ticked, a distributor keeps only the duty every legal entity has.
    const none = planFor(model, { roles: ['distributor'], classes: [], ref: '2026-09-24' });
    expect(ids(none)).toEqual(['AIGE-OBL-EUAIA-ART87']);
    expect(none.outside).toEqual([]);
    const rep = planFor(model, { roles: ['authorised-representative'], classes: ['high-risk-annex-i'], ref: '2026-09-24' });
    expect(rep.items.map((i) => [i.row.id, i.start])).toEqual([
      ['AIGE-OBL-EUAIA-ART54', '2025-08-02'],
      ['AIGE-OBL-EUAIA-ART87', '2026-08-02'],
      ['AIGE-OBL-EUAIA-ART22', '2028-08-02'],
    ]);
    expect(rep.items[0].status.key).toBe('applies');
    expect(rep.items[0].notes[0]).toContain('Art. 54(6)');
  });

  test('statuses are read on the reference date, not copied', async ({ request }) => {
    const model = await shippedModel(request);
    const past = planFor(model, { roles: ['provider'], classes: ['transparency-art50'], ref: '2025-06-01' });
    const art50 = past.items.find((i) => i.row.id === 'AIGE-OBL-EUAIA-ART50')!;
    expect(art50.status).toEqual({ key: 'later', label: 'Applies from 2026-08-02', days: 427 });
    const future = planFor(model, { roles: ['provider'], classes: ['high-risk-annex-iii'], ref: '2028-01-01' });
    expect(future.items.find((i) => i.row.id === 'AIGE-OBL-EUAIA-ART9')!.status.key).toBe('applies');
    expect(statusOn('voluntary', 'Voluntary', null, '2026-09-24')).toEqual({ key: 'voluntary', label: 'Voluntary', days: null });
    expect(statusOn('grace', 'Grace period', '2026-01-22', '2026-09-24').label).toBe('Applies (grace period)');
  });

  test('link codec round-trips and ignores what it does not know', async ({ request }) => {
    const model = await shippedModel(request);
    const state = encodeState(model, { roles: ['provider', 'deployer'], classes: ['high-risk-annex-iii'], ref: '2027-01-01' });
    expect(state).toEqual({ v: 1, r: 'pr.de', c: 'h3', d: '2027-01-01' });
    expect(decodeState(model, { v: '1', r: 'pr.de.zz', c: 'h3.xx', d: '2027-02-30' })).toEqual({
      roles: ['provider', 'deployer'],
      classes: ['high-risk-annex-iii'],
      ref: null,
    });
    expect(decodeState(model, { v: '1', r: 'zz' })).toBeNull();
    expect(decodeState(model, {})).toBeNull();
    expect(isIsoDate('2028-02-29')).toBe(true);
    expect(isIsoDate('2027-02-29')).toBe(false);
  });

  test('exports: Markdown, CSV, JSON (valid against its schema) and iCalendar', async ({ request }) => {
    const model = await shippedModel(request);
    const plan = planFor(model, { roles: ['provider', 'deployer', 'importer'], classes: ['high-risk-annex-iii', 'high-risk-annex-i', 'transparency-art50'], ref: '2026-09-24' });
    const link = 'https://aigovernanceengineer.com/toolkit/obligations-planner#v=1&r=pr.de.im&c=h3.h1.tr';

    const md = planMarkdown(model, plan, { link, today: '2026-09-24' });
    expect(md).toContain(`> ${NOTICE}`);
    expect(md).toContain(`> ${AID}`);
    expect(md).toContain('- [ ] **EU AI Act Art. 9 risk management system** (`AIGE-OBL-EUAIA-ART9`)');
    expect(md).toContain('(`AIGE-OBL-EUAIA-ART23`)');
    expect(md).not.toContain('## Duties outside the register');
    expect(md).toContain(`Plan link: ${link}`);
    expect(md).not.toContain('—');

    const csv = toCsv(planCsvRows(model, plan));
    const lines = csv.split('\r\n');
    expect(lines[0]).toBe(CSV_HEADER.join(','));
    expect(lines.length - 2).toBe(plan.items.length + plan.outside.length);

    const json = planJson(model, plan, { link, today: '2026-09-24' });
    expect(json.kind).toBe(PLAN_KIND);
    expect(json.self).toBe(link);
    expect(json.obligations.length).toBe(plan.items.length);
    const schema = await (await request.get(SCHEMA)).json();
    expect(schema.$id).toBe('https://aigovernanceengineer.com/toolkit/obligations-plan.v1.schema.json');
    expect(validate(schema, json)).toEqual([]);
    // The envelope keys are the open-data API's.
    const api = await (await request.get('/api/v1/obligations.json')).json();
    for (const key of ['notice', 'version', 'license', 'licenseUrl', 'citation']) expect(json[key]).toEqual(api[key]);
    // Each obligation is the API record plus the plan.
    const art9 = json.obligations.find((o: { id: string }) => o.id === 'AIGE-OBL-EUAIA-ART9');
    const { plan: _plan, ...record } = art9;
    expect(record).toEqual(api.obligations.find((o: { id: string }) => o.id === 'AIGE-OBL-EUAIA-ART9'));

    const events = planIcsEvents(model, plan, { link });
    expect(events.length).toBe(planDates(plan).length);
    const ics = toIcs({ events, now: new Date(Date.UTC(2026, 8, 24)) });
    const icsLines = ics.split('\r\n');
    expect(icsLines.filter((l) => l === 'BEGIN:VEVENT')).toHaveLength(events.length);
    expect(icsLines).toContain('DTSTART;VALUE=DATE:20271202');
    expect(icsLines).toContain('DTEND;VALUE=DATE:20271203');
    const uids = icsLines.filter((l) => l.startsWith('UID:'));
    expect(new Set(uids).size).toBe(uids.length);
    for (const line of icsLines) expect(new TextEncoder().encode(line).length).toBeLessThanOrEqual(75);
    // Another plan on the same dates keeps its own UIDs, so importing both
    // does not overwrite one with the other (RFC 5545 section 3.8.4.7).
    const other = planFor(model, { roles: ['provider', 'deployer', 'importer'], classes: ['high-risk-annex-iii', 'high-risk-annex-i'], ref: '2026-09-24' });
    const otherUids = toIcs({ events: planIcsEvents(model, other, { link }) })
      .replace(/\r\n /g, '')
      .split('\r\n')
      .filter((l) => l.startsWith('UID:'));
    const unfolded = ics.replace(/\r\n /g, '').split('\r\n').filter((l) => l.startsWith('UID:'));
    expect(unfolded.filter((u) => otherUids.includes(u))).toEqual([]);
  });

  test('the timeline is labelled, dated and within the figure budget', async ({ request }) => {
    const model = await shippedModel(request);
    const plan = planFor(model, { roles: ['provider', 'deployer'], classes: ['high-risk-annex-iii', 'high-risk-annex-i', 'transparency-art50'], ref: '2026-09-24' });
    for (const narrow of [false, true]) {
      const svg = timelineSvg(planDates(plan), { narrow, ref: '2026-09-24', asOf: model.asOf, title: 'Dates' });
      expect(svg).toContain('role="img"');
      expect(svg).toContain(`As of ${model.asOf}`);
      expect(svg).toContain('reference date 2026-09-24');
      expect(svg).not.toMatch(/#[0-9a-f]{6}/i);
      expect(Buffer.byteLength(svg)).toBeLessThanOrEqual(12 * 1024);
    }
  });
});

// ---- 3. Pages ----------------------------------------------------------------

async function saved(download: Download): Promise<string> {
  const path = await download.path();
  expect(path).toBeTruthy();
  return readFileSync(path as string, 'utf8');
}

async function tick(page: Page, codes: string[]) {
  for (const code of codes) await page.locator(`label[for="opl-${code}"]`).click();
}

test.describe('planner without JavaScript', () => {
  test.use({ javaScriptEnabled: false });

  test('works as a worksheet: notice, every row, the roles; no dead controls', async ({ page }) => {
    await page.goto(TOOL);
    await expect(page.locator('#tool-notice')).toHaveText(NOTICE);
    await expect(page.locator('[data-tool-nojs]')).toBeVisible();
    await expect(page.locator('input[name="role"]')).toHaveCount(plannerRoles.length);
    await expect(page.locator('input[name="class"]')).toHaveCount(plannerClasses.length);
    await expect(page.locator('.opl-worksheet tbody tr')).toHaveCount(plannerRows().length);
    await expect(page.locator('#opl-by-hand')).toBeVisible();
    // No duty sits outside the register, so the guide to them is not drawn.
    await expect(page.locator('#opl-outside-guide')).toHaveCount(0);
    await expect(page.locator('[data-opl-result]')).toBeHidden();
    await expect(page.getByRole('button', { name: 'Show my obligations', exact: true })).toBeHidden();
  });
});

test.describe('planner', () => {
  test('asks for a role, then shows the plan, the timeline and the tables', async ({ page }) => {
    await page.goto(TOOL);
    await expect(page.locator('[data-tool-nojs]')).toBeHidden();
    await page.getByRole('button', { name: 'Show my obligations', exact: true }).click();
    const summary = page.locator('[data-opl-errors]');
    await expect(summary).toBeVisible();
    await expect(summary).toBeFocused();
    await expect(page.locator('#opl-roles-error')).toHaveText('Tick at least one role.');
    await expect(page.locator('#opl-roles')).toHaveAttribute('aria-describedby', /opl-roles-error/);

    await tick(page, ['role-pr', 'role-de', 'class-h3']);
    await page.locator('#opl-date').fill('2026-09-24');
    await page.getByRole('button', { name: 'Show my obligations', exact: true }).click();

    const result = page.locator('[data-opl-result]');
    await expect(result).toBeVisible();
    await expect(page.locator('#opl-result-title')).toBeFocused();
    await expect(page.locator('[data-opl-summary]')).toContainText('Provider and Deployer');
    await expect(page.locator('[data-opl-summary]')).toContainText('reference date 2026-09-24');
    await expect(result.locator('[data-opl-chart] svg[role="img"]')).toHaveCount(1);
    await expect(result.locator('[data-opl-row="AIGE-OBL-EUAIA-ART9"]')).toContainText('Applies from 2027-12-02 (in 434 days)');
    await expect(result.locator('[data-opl-row="AIGE-OBL-EUAIA-ART4"] [data-opl-status]')).toHaveText('Applies');
    await expect(result.locator('[data-opl-row="AIGE-OBL-EUAIA-ART27"]')).toContainText('Art. 27(1)');
    await expect(result.locator('[data-opl-row="AIGE-OBL-EUAIA-ART9"] a').first()).toHaveAttribute(
      'href',
      '/obligations/aige-obl-euaia-art9',
    );
    await expect(result.locator('[data-opl-row="AIGE-OBL-EUAIA-ART9"] a[href^="/patterns/"]').first()).toBeVisible();
    await expect(result.locator('.opl-aid')).toContainText(AID);
    expect(page.url()).toContain('#v=1&r=pr.de&c=h3&d=2026-09-24');

    // A change after the first result redraws at once and updates the link.
    await tick(page, ['class-tr']);
    await expect(result.locator('[data-opl-row="AIGE-OBL-EUAIA-ART50"]')).toBeVisible();
    expect(page.url()).toContain('c=h3.tr');
  });

  test('restores a plan from the link, including the importer rows', async ({ page }) => {
    await page.goto(`${TOOL}#v=1&r=im&c=h3&d=2026-09-24`);
    const result = page.locator('[data-opl-result]');
    await expect(result).toBeVisible();
    await expect(page.locator('#opl-role-im')).toBeChecked();
    await expect(result.locator('[data-opl-rows] tr')).toHaveCount(3);
    await expect(result.locator('[data-opl-row="AIGE-OBL-EUAIA-ART23"]')).toContainText('importers');
    await expect(result.locator('[data-opl-outside]')).toBeHidden();

    await page.goto(`${TOOL}#v=1&r=gs`);
    await expect(result.locator('[data-opl-row="AIGE-OBL-EUAIA-ART55"]')).toBeVisible();
    await expect(result.locator('[data-opl-row="AIGE-OBL-GPAICOP-SAFETY"] [data-opl-status]')).toHaveText('Voluntary');
  });

  test('downloads the checklist, CSV, JSON and calendar', async ({ page, request }) => {
    await page.goto(`${TOOL}#v=1&r=pr.de&c=h3.h1&d=2026-09-24`);
    await expect(page.locator('[data-opl-result]')).toBeVisible();
    const grab = async (name: string) => {
      const [download] = await Promise.all([
        page.waitForEvent('download'),
        page.getByRole('button', { name, exact: true }).click(),
      ]);
      return download;
    };

    const md = await grab('Download checklist (Markdown)');
    expect(md.suggestedFilename()).toBe('obligations-plan-2026-09-24.md');
    const report = await saved(md);
    expect(report).toContain('# Obligations plan: EU AI Act and GPAI');
    expect(report).toContain(`> ${NOTICE}`);
    expect(report).toContain('Plan link: ');
    expect(report).not.toContain('—');

    const csv = await saved(await grab('Download CSV'));
    expect(csv.split('\r\n')[0]).toBe(CSV_HEADER.join(','));
    expect(csv).toContain('AIGE-OBL-EUAIA-ART26');

    const json = JSON.parse(await saved(await grab('Download JSON')));
    expect(json.kind).toBe(PLAN_KIND);
    expect(json.referenceDate).toBe('2026-09-24');
    expect(json.inputs).toEqual({ roles: ['provider', 'deployer'], systemClasses: ['high-risk-annex-iii', 'high-risk-annex-i'] });
    const schema = await (await request.get(SCHEMA)).json();
    expect(validate(schema, json)).toEqual([]);

    const icsDownload = await grab('Download calendar (.ics)');
    expect(icsDownload.suggestedFilename()).toBe('obligations-plan-2026-09-24.ics');
    const ics = await saved(icsDownload);
    expect(ics.startsWith('BEGIN:VCALENDAR\r\nVERSION:2.0\r\n')).toBe(true);
    expect(ics.match(/BEGIN:VEVENT/g)?.length).toBe(json.dates.length);
    expect(ics).toContain('DTSTART;VALUE=DATE:20280802');
  });

  test('sends nothing the reader enters', async ({ page }) => {
    const requests: { url: string; method: string }[] = [];
    await page.goto(TOOL);
    await page.waitForLoadState('networkidle');
    page.on('request', (request) => requests.push({ url: request.url(), method: request.method() }));
    await tick(page, ['role-ar', 'class-h1']);
    await page.locator('#opl-date').fill('2029-03-03');
    await page.getByRole('button', { name: 'Show my obligations', exact: true }).click();
    await expect(page.locator('[data-opl-result]')).toBeVisible();
    await Promise.all([
      page.waitForEvent('download'),
      page.getByRole('button', { name: 'Download JSON', exact: true }).click(),
    ]);
    const origin = new URL(page.url()).origin;
    for (const request of requests) {
      if (/^(blob|data):/.test(request.url)) continue;
      expect(request.method, request.url).toBe('GET');
      expect(new URL(request.url).origin, request.url).toBe(origin);
      expect(request.url).not.toContain('2029-03-03');
      expect(request.url).not.toContain('r=ar');
    }
  });

  test('prints the plan without chrome or controls', async ({ page }) => {
    await page.goto(`${TOOL}#v=1&r=pr&c=h3`);
    await expect(page.locator('[data-opl-result]')).toBeVisible();
    await page.emulateMedia({ media: 'print' });
    await expect(page.locator('.site-header')).toBeHidden();
    await expect(page.locator('[data-opl-result] .tool-actions')).toBeHidden();
    await expect(page.locator('[data-opl-form]')).toBeHidden();
    await expect(page.locator('#tool-notice')).toBeVisible();
  });

  test('no horizontal scroll at 390px with a full plan', async ({ page }) => {
    await page.setViewportSize({ width: 390, height: 844 });
    await page.goto(`${TOOL}#v=1&r=pr.de.im.di.ar.gp.gs&c=h3.h1.tr`);
    await expect(page.locator('[data-opl-result]')).toBeVisible();
    const overflow = await page.evaluate(
      () => document.documentElement.scrollWidth - document.documentElement.clientWidth,
    );
    expect(overflow).toBeLessThanOrEqual(0);
  });

  test('/toolkit links the planner and its head metadata is complete', async ({ page }) => {
    await page.goto('/toolkit');
    await expect(page.locator('[data-tool-card="obligations-planner"] a')).toHaveAttribute('href', TOOL);
    await page.goto(TOOL);
    const title = (await page.locator('head > title').textContent()) ?? '';
    expect(title.length).toBeLessThanOrEqual(70);
    const description = (await page.locator('meta[name="description"]').getAttribute('content')) ?? '';
    expect(description.length).toBeGreaterThanOrEqual(50);
    expect(description.length).toBeLessThanOrEqual(160);
    await expect(page.locator('meta[property="og:image"]')).toHaveAttribute(
      'content',
      'https://aigovernanceengineer.com/og/toolkit/obligations-planner.png',
    );
  });
});

test.describe('obligation page chain figure', () => {
  const PAGE = '/obligations/aige-obl-euaia-art9';

  test('the header figure reads left to right on a wide screen', async ({ page }) => {
    await page.setViewportSize({ width: 1440, height: 900 });
    await page.goto(PAGE);
    const figure = page.locator('figure.ob-chain');
    await expect(figure).toBeVisible();
    await expect(figure.locator('svg.ob-chain-row')).toBeVisible();
    await expect(figure.locator('svg.ob-chain-column')).toBeHidden();
    await expect(figure.locator('svg.ob-chain-row title')).toHaveText('From clause to evidence');
    // Labels wrap into separate <text> lines on the wide layout.
    await expect(figure.locator('svg.ob-chain-row text', { hasText: 'Risk register' }).first()).toBeVisible();
    await expect(figure.locator('svg.ob-chain-row text', { hasText: 'Evidence record' })).toHaveCount(1);
    await expect(figure.locator('svg.ob-chain-column text', { hasText: 'Risk register as code' })).toHaveCount(1);
    await expect(figure.locator('svg.ob-chain-row')).toContainText('As of');
    await expect(figure).toContainText('Drawn from chapter 08.');
    await figure.locator('summary').click();
    await expect(figure.locator('.ob-chain-alt a[href="/schemas/risk-register-entry.v1.json"]')).toBeVisible();
  });

  test('the header figure reads top to bottom at 390px, without horizontal scroll', async ({ page }) => {
    await page.setViewportSize({ width: 390, height: 844 });
    await page.goto(PAGE);
    const figure = page.locator('figure.ob-chain');
    await expect(figure.locator('svg.ob-chain-column')).toBeVisible();
    await expect(figure.locator('svg.ob-chain-row')).toBeHidden();
    const overflow = await page.evaluate(
      () => document.documentElement.scrollWidth - document.documentElement.clientWidth,
    );
    expect(overflow).toBeLessThanOrEqual(0);
  });

  test('each obligation page carries its own 1200px Open Graph card', async ({ page, request }) => {
    await page.goto(PAGE);
    await expect(page.locator('meta[property="og:image"]')).toHaveAttribute(
      'content',
      'https://aigovernanceengineer.com/og/obligations/aige-obl-euaia-art9.png',
    );
    for (const path of ['/og/obligations/aige-obl-euaia-art9.png', '/og/toolkit/obligations-planner.png']) {
      const res = await request.get(path);
      expect(res.status(), path).toBe(200);
      const png = await res.body();
      expect([...png.subarray(0, 8)]).toEqual([0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a]);
      expect(png.readUInt32BE(16), `${path} width`).toBe(1200);
      expect(png.readUInt32BE(20), `${path} height`).toBe(630);
    }
  });
});
