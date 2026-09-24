// doc-builders.spec.ts: the three document builders of /toolkit (block
// w2-builders-a): the AI register entry, the impact assessment and the model
// card. Three layers of checks:
// 1. data (pure Node): every form field exists in the published schema with a
//    matching type; the crosswalk and the checklist point at real fields and
//    real obligations; the published examples validate with the builders'
//    validator (the same subset scripts/schemas-check.mjs enforces);
// 2. the pure modules in public/toolkit (Node): YAML, CSV, the register round
//    trip, the assessment export per type, the Hugging Face card and the
//    CycloneDX 1.7 ML-BOM (keys checked against the official schema's lists);
// 3. the pages in a browser: no-JS worksheet, validation with a focused error
//    summary, the exports (and that they validate), imports, drafts kept in the
//    browser, no network use with what the reader enters, and reflow at 390px.
import { test, expect } from '@playwright/test';
import type { Download, Page } from '@playwright/test';
import { readFileSync, readdirSync } from 'node:fs';
import { join } from 'node:path';

import {
  aiSystemSections,
  agentSections,
  iaSections,
  modelCardSections,
  registerCrosswalk,
  modelCardChecklist,
  checklistGroups,
  iso42005Clauses,
  art27Elements,
  dpiaElements,
  reopenTriggers,
  patternOptions,
  registerSources,
  impactSources,
  modelCardSources,
} from '../src/data/doc-builders';
import type { FieldSpec, SectionSpec } from '../src/data/doc-builders';
import { patterns } from '../src/data/patterns';
import { obligationById } from '../src/data/frameworks';
import { tools } from '../src/data/toolkit';
import {
  validate,
  schemaAt,
  toYaml,
  parseCsv,
  flattenRecord,
  unflattenRow,
  prune,
  uuidV4,
  orderBySchema,
} from '../public/toolkit/builders.js';
import { toCsv } from '../public/toolkit/lib.js';
import {
  entriesFromJson,
  entriesFromCsv,
  registerCsvRows,
  publicSummaryMarkdown,
  crosswalkFor,
  detectKind,
} from '../public/toolkit/ai-register-entry-core.js';
import {
  checkAssessment,
  exportAssessment,
  riskMatrix,
  linkageWarnings,
  elementCoverage,
  assessmentMarkdown,
} from '../public/toolkit/impact-assessment-core.js';
import {
  checkCard,
  evaluateChecklist,
  hfModelCard,
  cycloneDx,
  CDX_KEYS,
} from '../public/toolkit/model-card-core.js';

const NOTICE =
  'Indicative, not legal advice and not a conformity claim. Nothing you enter leaves your browser.';
const EM_DASH = String.fromCharCode(0x2014);
const SCHEMAS = join(process.cwd(), 'public', 'schemas');
const readJson = (file: string) => JSON.parse(readFileSync(file, 'utf8'));
const schema = (name: string) => readJson(join(SCHEMAS, `${name}.v1.json`));
const example = (name: string) => readJson(join(SCHEMAS, 'examples', `${name}.example.json`));

const S = {
  system: schema('ai-system-register-entry'),
  agent: schema('agent-register-entry'),
  ia: schema('impact-assessment'),
  card: schema('model-card'),
};

/** js-yaml ships with Astro; loaded by name so the type checker does not need its types. */
async function parseYaml(text: string): Promise<unknown> {
  const mod = (await import('js-yaml' as string)) as { load: (t: string) => unknown };
  return mod.load(text);
}

// ---- 1. Data ------------------------------------------------------------------------------

/** Every leaf field of a form, with its full path ("risks.0.likelihood" for group items). */
function leaves(sections: readonly SectionSpec[]): { path: string; spec: FieldSpec }[] {
  const out: { path: string; spec: FieldSpec }[] = [];
  for (const section of sections) {
    for (const field of section.fields) {
      out.push({ path: field.path, spec: field });
      if (field.kind === 'group') {
        for (const sub of field.item ?? []) out.push({ path: `${field.path}.0.${sub.path}`, spec: sub });
      }
    }
  }
  return out;
}

function typeFor(kind: FieldSpec['kind']): string | undefined {
  return (
    {
      text: 'string',
      textarea: 'string',
      date: 'string',
      datetime: 'string',
      url: 'string',
      email: 'string',
      bool: 'boolean',
      int: 'integer',
      number: 'number',
      lines: 'array',
      group: 'array',
      checks: 'array',
      refs: 'array',
      clauses: 'array',
    } as Record<string, string>
  )[kind];
}

test.describe('doc builders: data', () => {
  const forms = [
    ['ai-system-register-entry', aiSystemSections, S.system],
    ['agent-register-entry', agentSections, S.agent],
    ['impact-assessment', iaSections, S.ia],
    ['model-card', modelCardSections, S.card],
  ] as const;

  for (const [name, sections, sch] of forms) {
    test(`${name}: every form field exists in the schema with a matching type`, () => {
      for (const { path, spec } of leaves(sections)) {
        const node = schemaAt(sch, path);
        expect(node, `${name}: ${path}`).toBeTruthy();
        const want = typeFor(spec.kind);
        if (spec.kind === 'select') {
          const allowed = (node.enum ?? []).map(String);
          for (const [value] of spec.options ?? []) {
            if (node.enum) expect(allowed, `${name}: ${path} option ${value}`).toContain(value);
          }
        } else if (want) {
          expect(node.type, `${name}: ${path}`).toBe(want);
        }
        if (spec.kind === 'date') expect(node.format, path).toBe('date');
        if (spec.kind === 'datetime') expect(node.format, path).toBe('date-time');
        if (spec.kind === 'url') expect(node.format, path).toBe('uri');
        if (spec.kind === 'email') expect(node.format, path).toBe('email');
      }
    });

    test(`${name}: every field the schema requires is on the form`, () => {
      const paths = new Set(leaves(sections).map((leaf) => leaf.path));
      // The assessment `type` is set by the instrument selector, not by a form field.
      const bySelector = name === 'impact-assessment' ? ['type'] : [];
      for (const required of (sch.required as string[]).filter((r) => !bySelector.includes(r))) {
        expect(paths.has(required), `${name}: ${required}`).toBe(true);
      }
    });
  }

  test('the published examples validate with the builders validator, and a broken one does not', () => {
    const names = readdirSync(SCHEMAS)
      .filter((file) => file.endsWith('.v1.json'))
      .map((file) => file.replace('.v1.json', ''));
    expect(names).toContain('model-card');
    for (const name of names) {
      expect(validate(schema(name), example(name)), name).toEqual([]);
    }
    const broken = { ...example('impact-assessment'), outcome: 'maybe', extra: 1 };
    const codes = validate(S.ia, broken).map((e: { code: string }) => e.code);
    expect(codes).toContain('enum');
    expect(codes).toContain('additional');
  });

  test('the crosswalk points at real register fields and carries no em dash', () => {
    expect(registerCrosswalk.length).toBeGreaterThanOrEqual(25);
    for (const row of registerCrosswalk) {
      for (const path of row.paths) {
        expect(schemaAt(S.system, path) ?? schemaAt(S.agent, path), path).toBeTruthy();
      }
      const cells = [row.label, row.atrs, row.aia, row.euDb, row.card, row.soa].join(' ');
      expect(cells).not.toContain(EM_DASH);
    }
    // The four ATRS v4.0 Tier 1 fields are all mapped.
    const atrs = registerCrosswalk.map((row) => row.atrs).join(' ');
    for (const field of ['1.1 Name', '1.2 Description', '1.3 Website URL', '1.4 Contact email']) {
      expect(atrs).toContain(field);
    }
    // Annex VIII Section A points 1 to 13 all appear somewhere.
    const eu = registerCrosswalk.map((row) => row.euDb).join(' ');
    for (let n = 1; n <= 13; n++) expect(eu, `A.${n}`).toMatch(new RegExp(`A\\.${n}\\b`));
  });

  test('the checklist reads real card fields and real obligations', () => {
    const groups = new Set(checklistGroups.map((g) => g.id));
    for (const item of modelCardChecklist) {
      expect(groups.has(item.group as never), item.id).toBe(true);
      expect(obligationById(item.obligation), item.obligation).toBeTruthy();
      for (const field of item.fields) {
        expect(schemaAt(S.card, field.replace('[].', '.0.')), `${item.id}: ${field}`).toBeTruthy();
      }
    }
    const refs = modelCardChecklist.map((i) => i.ref);
    for (const ref of ['Annex IV 1(a)', 'Annex IV 9', 'Art. 13(3)(a)', 'Art. 13(3)(f)', 'Art. 53(1)(d)', 'A.4', 'MAP 1.1', 'MEASURE 2.11']) {
      expect(refs).toContain(ref);
    }
    expect(new Set(modelCardChecklist.map((i) => i.id)).size).toBe(modelCardChecklist.length);
  });

  test('clauses, elements, triggers and patterns are consistent', () => {
    expect(new Set(iso42005Clauses.map((c) => c.clause)).size).toBe(iso42005Clauses.length);
    expect(art27Elements.map((e) => e.point)).toEqual(['(a)', '(b)', '(c)', '(d)', '(e)', '(f)']);
    expect(dpiaElements.map((e) => e.point)).toEqual(['(a)', '(b)', '(c)', '(d)']);
    for (const t of reopenTriggers) expect(t.for.length).toBeGreaterThan(0);
    expect(patternOptions.map(([, title]) => title)).toEqual(patterns.map((p) => p.title));
    for (const [url] of patternOptions) expect(url).toMatch(/^https:\/\/aigovernanceengineer\.com\/patterns\/[a-z0-9-]+$/);
  });

  test('sources follow the house format and never cite a secondary site as the EU primary', () => {
    for (const source of [...registerSources, ...impactSources, ...modelCardSources]) {
      expect(source.url).toMatch(/^https:\/\//);
      expect(source.text).not.toContain(EM_DASH);
      expect(source.url).not.toContain('artificialintelligenceact.eu');
    }
  });

  test('the registry lists the three builders as live', () => {
    for (const id of ['ai-register-entry', 'impact-assessment', 'model-card']) {
      const tool = tools.find((t) => t.id === id);
      expect(tool?.status, id).toBe('live');
      expect(tool?.href).toBe(`/toolkit/${id}`);
    }
  });
});

// ---- 2. Pure modules ------------------------------------------------------------------------

test.describe('doc builders: pure modules', () => {
  test('YAML reads back as the same JSON, whatever the strings hold', async () => {
    const value = {
      $schema: 'https://x.example/s.json',
      a: 'yes',
      b: '2026-09-24',
      c: 'null',
      d: '# not a comment',
      e: 'line one\nline two: "quoted"',
      f: [{ g: 1, h: ['x', 'y'] }, 'z', []],
      i: {},
      j: true,
      k: 0,
    };
    const yaml = toYaml(value, { header: ['A comment line'] });
    expect(yaml.startsWith('# A comment line\n')).toBe(true);
    expect(await parseYaml(yaml)).toEqual(value);
  });

  test('CSV parsing follows RFC 4180 and the flatten round trip keeps types', () => {
    const { rows } = parseCsv('﻿a,b\r\n"x, y","he said ""hi"""\r\n"two\nlines",2\r\n');
    expect(rows).toEqual([
      ['a', 'b'],
      ['x, y', 'he said "hi"'],
      ['two\nlines', '2'],
    ]);
    const record = example('ai-system-register-entry');
    const flat = flattenRecord(record);
    expect(flat['risk_classification.internal_tier']).toBe('high');
    expect(flat.scope).toBe('credit:affordability-score; applications:read');
    const header = Object.keys(flat);
    const back = unflattenRow(header, header.map((key) => String(flat[key])), S.system);
    expect(back).toEqual(record);
  });

  test('prune, order and UUIDs', () => {
    expect(prune({ a: ' ', b: [], c: { d: '' }, e: false, f: 0, g: [' x '] })).toEqual({ e: false, f: 0, g: ['x'] });
    expect(Object.keys(orderBySchema({ version: '1', id: 'a', $schema: 's' }, S.system))).toEqual(['$schema', 'id', 'version']);
    expect(uuidV4()).toMatch(/^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/);
  });

  test('a register goes to CSV and back unchanged, both kinds', () => {
    const schemas = { system: S.system, agent: S.agent };
    const { entries } = entriesFromJson([example('ai-system-register-entry'), example('agent-register-entry')], schemas);
    expect(entries.map((e: { kind: string }) => e.kind)).toEqual(['system', 'agent']);
    expect(entries.every((e: { errors: unknown[] }) => !e.errors.length)).toBe(true);
    const csv = toCsv(registerCsvRows(entries));
    expect(csv.split('\r\n')[0].startsWith('kind,id,version,name,owner,expiry,scope')).toBe(true);
    const back = entriesFromCsv(csv, schemas);
    expect(back.problems).toEqual([]);
    expect(back.entries.map((e: { doc: unknown }) => e.doc)).toEqual(entries.map((e: { doc: unknown }) => e.doc));
    expect(detectKind({ workload_identity: {} })).toBe('agent');
  });

  test('the public summary leaves internal fields out; the crosswalk carries the values', () => {
    const schemas = { system: S.system, agent: S.agent };
    const record = { ...example('ai-system-register-entry'), public_record: { organisation: 'Example Bank', contact_email: 'ai@bank.example.org' } };
    const { entries } = entriesFromJson([record], schemas);
    expect(entries[0].errors).toEqual([]);
    const md = publicSummaryMarkdown(entries, { notice: NOTICE, page: 'https://aigovernanceengineer.com/toolkit/ai-register-entry', date: '2026-09-24' });
    expect(md).toContain('## Consumer loan affordability model');
    expect(md).toContain('| Organisation | Example Bank |');
    expect(md).not.toContain('credit:affordability-score');
    expect(md).not.toContain(EM_DASH);
    const row = crosswalkFor(entries[0], registerCrosswalk).find((r: { paths: readonly string[] }) => r.paths[0] === 'public_record.contact_email');
    expect(row.value).toBe('ai@bank.example.org');
    expect(row.atrs).toBe('1.4 Contact email');
  });

  test('an assessment exports per type, and the matrix finds loose ends', async () => {
    const fria = example('impact-assessment');
    const { record, errors } = checkAssessment(fria, 'fria', iaSections, S.ia);
    expect(errors).toEqual([]);
    expect(record).toEqual(fria);
    // As a DPIA addendum, the FRIA-only fields fall away.
    const dpia = exportAssessment(fria, 'dpia_addendum', iaSections, S.ia);
    expect(dpia.type).toBe('dpia_addendum');
    for (const key of ['processes', 'period_and_frequency', 'human_oversight_measures', 'authority_notification']) {
      expect(dpia[key], key).toBeUndefined();
    }
    const withIds = {
      ...fria,
      risks: [{ ...fria.risks[0], id: 'R1' }, { ...fria.risks[1], id: 'R2' }],
      mitigations: [{ measure: 'Gate', addresses: ['R1', 'R9'], status: 'planned' }],
    };
    const matrix = riskMatrix(withIds);
    expect(matrix.unaddressed).toEqual(['R2']);
    expect(matrix.dangling).toEqual(['R9']);
    expect(linkageWarnings(matrix).join(' ')).toContain('No measure addresses risk R2');
    const coverage = elementCoverage(record, 'fria', { art27Elements, dpiaElements, iso42005Clauses });
    expect(coverage.every((row: { filled: boolean }) => row.filled)).toBe(true);
    const md = assessmentMarkdown(record, 'fria', { art27Elements, dpiaElements, iso42005Clauses }, {
      notice: NOTICE,
      page: 'p',
      date: '2026-09-24',
      typeLabel: 'Fundamental rights impact assessment (FRIA)',
    });
    expect(md).toContain('## Art. 27(1) elements');
    expect(md).toContain('## Re-open triggers');
    expect(md).not.toContain(EM_DASH);
  });

  test('the model card renders a Hub card and a CycloneDX 1.7 BOM from the same record', async () => {
    const { record, errors } = checkCard(example('model-card'), S.card);
    expect(errors).toEqual([]);
    const results = evaluateChecklist(record, modelCardChecklist);
    const state = (id: string) => results.find((r: { id: string }) => r.id === id)?.state;
    expect(state('iv-1a')).toBe('covered');
    expect(state('iv-8')).toBe('not-linked');
    expect(state('13-b-v')).toBe('covered');
    expect(state('53-c')).toBe('not-applicable');

    const card = hfModelCard(record, results, {
      notice: NOTICE,
      page: 'https://aigovernanceengineer.com/toolkit/model-card',
      date: '2026-09-24',
      groups: checklistGroups,
      site: 'https://aigovernanceengineer.com',
    });
    const match = /^---\n([\s\S]*?)\n---\n/.exec(card);
    expect(match).toBeTruthy();
    expect(await parseYaml(match![1])).toEqual({
      license: 'other',
      language: ['es', 'pt'],
      library_name: 'lightgbm',
      tags: ['credit', 'affordability', 'tabular'],
      datasets: ['loan-apps-2019-2025', 'loan-apps-holdout-2025'],
      metrics: ['AUC', 'approval-rate ratio'],
    });
    for (const heading of ['# Model Card for Consumer loan affordability model', '## Model Details', '## Uses', '### Out-of-Scope Use', '## Bias, Risks, and Limitations', '## Training Details', '## Evaluation', '## Environmental Impact', '## Model Card Contact', '## Governance Coverage (indicative)']) {
      expect(card).toContain(heading);
    }
    expect(card).not.toContain(EM_DASH);

    const bom = cycloneDx(record, { page: 'https://aigovernanceengineer.com/toolkit/model-card', serial: '1bb93880-d94e-4b61-a471-e30403450a50', timestamp: '2026-09-24T10:00:00Z' });
    expect(bom.bomFormat).toBe('CycloneDX');
    expect(bom.specVersion).toBe('1.7');
    expect(bom.serialNumber).toMatch(/^urn:uuid:[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/);
    for (const key of Object.keys(bom)) expect(CDX_KEYS.bom).toContain(key);
    const [component] = bom.components;
    expect(CDX_KEYS.componentTypes).toContain(component.type);
    expect(component.type).toBe('machine-learning-model');
    expect(component.name).toBe('Consumer loan affordability model');
    for (const key of Object.keys(component)) expect(CDX_KEYS.component, key).toContain(key);
    for (const key of Object.keys(component.modelCard)) expect(CDX_KEYS.modelCard, key).toContain(key);
    for (const key of Object.keys(component.modelCard.modelParameters)) expect(CDX_KEYS.modelParameters, key).toContain(key);
    for (const key of Object.keys(component.modelCard.considerations)) expect(CDX_KEYS.considerations, key).toContain(key);
    expect(CDX_KEYS.approachTypes).toContain(component.modelCard.modelParameters.approach.type);
    for (const metric of component.modelCard.quantitativeAnalysis.performanceMetrics) {
      for (const key of Object.keys(metric)) expect(CDX_KEYS.performanceMetric).toContain(key);
    }
    for (const dataset of component.modelCard.modelParameters.datasets) {
      expect(CDX_KEYS.dataTypes).toContain(dataset.type);
      expect(typeof dataset.name).toBe('string');
    }
    for (const license of component.licenses) expect(Object.keys(license.license)).toEqual(['name']);
    expect(JSON.stringify(bom)).not.toMatch(/"(undefined|null)"|: null/);
  });
});

// ---- 3. Pages ---------------------------------------------------------------------------------

const PAGES = ['/toolkit/ai-register-entry', '/toolkit/impact-assessment', '/toolkit/model-card'];

async function saved(download: Download): Promise<Buffer> {
  const path = await download.path();
  expect(path).toBeTruthy();
  return readFileSync(path as string);
}

async function download(page: Page, name: string): Promise<{ name: string; body: string }> {
  const [file] = await Promise.all([
    page.waitForEvent('download'),
    page.getByRole('button', { name, exact: true }).click(),
  ]);
  return { name: file.suggestedFilename(), body: (await saved(file)).toString('utf8') };
}

test.describe('doc builders: pages', () => {
  test('/toolkit links the three builders', async ({ page }) => {
    await page.goto('/toolkit');
    for (const id of ['ai-register-entry', 'impact-assessment', 'model-card']) {
      await expect(page.locator(`[data-tool-card="${id}"] a`)).toHaveAttribute('href', `/toolkit/${id}`);
    }
  });

  for (const path of PAGES) {
    test(`${path}: head metadata and a WebApplication node`, async ({ page }) => {
      await page.goto(path);
      await expect(page.locator('h1')).toHaveCount(1);
      const title = (await page.locator('head > title').textContent()) ?? '';
      expect(title.length).toBeLessThanOrEqual(70);
      const description = (await page.locator('meta[name="description"]').getAttribute('content')) ?? '';
      expect(description.length).toBeGreaterThanOrEqual(50);
      expect(description.length).toBeLessThanOrEqual(160);
      await expect(page.locator('link[rel="canonical"]')).toHaveAttribute('href', `https://aigovernanceengineer.com${path}`);
      const raw = await page.locator('script[type="application/ld+json"]').first().textContent();
      const types = (JSON.parse(raw ?? '{}')['@graph'] as { '@type': string }[]).map((n) => n['@type']);
      expect(types).toContain('WebApplication');
    });

    test(`${path}: no horizontal scroll at 390px`, async ({ page }) => {
      await page.setViewportSize({ width: 390, height: 844 });
      await page.goto(path);
      await expect(page.locator('[data-bld-form] fieldset').first()).toBeVisible();
      const overflow = await page.evaluate(() => document.documentElement.scrollWidth - document.documentElement.clientWidth);
      expect(overflow).toBeLessThanOrEqual(0);
    });
  }

  test.describe('without JavaScript', () => {
    test.use({ javaScriptEnabled: false });
    test('each builder still teaches: notice, worksheet tables, no dead controls', async ({ page }) => {
      await page.goto('/toolkit/ai-register-entry');
      await expect(page.locator('#tool-notice')).toHaveText(NOTICE);
      await expect(page.locator('[data-tool-nojs]')).toBeVisible();
      await expect(page.locator('#reg-crosswalk')).toBeVisible();
      await expect(
        page
          .locator('table', { has: page.locator('caption', { hasText: 'Register field to regime field' }) })
          .locator('tbody tr'),
      ).toHaveCount(registerCrosswalk.length);
      await expect(page.locator('[data-bld-form-el]')).toBeHidden();

      await page.goto('/toolkit/impact-assessment');
      await expect(page.locator('#ia-fria')).toBeVisible();
      await expect(
        page.locator('table', { has: page.locator('caption', { hasText: 'Clause 6' }) }).locator('tbody tr'),
      ).toHaveCount(iso42005Clauses.length);
      await expect(page.locator('[data-bld-result]')).toBeHidden();

      await page.goto('/toolkit/model-card');
      await expect(page.locator('#mc-checklist')).toBeVisible();
      await expect(page.locator('a[href="/obligations/aige-obl-euaia-art11"]').first()).toBeVisible();
      await expect(page.getByRole('button', { name: 'Check the card', exact: true })).toBeHidden();
    });
  });

  test('register: errors first, then a valid entry, a register and a CSV round trip', async ({ page }) => {
    await page.goto('/toolkit/ai-register-entry');
    await expect(page.locator('[data-tool-nojs]')).toBeHidden();

    await page.getByRole('button', { name: 'Check the entry', exact: true }).click();
    const summary = page.locator('#reg-errors');
    await expect(summary).toBeVisible();
    await expect(summary).toBeFocused();
    await expect(summary.locator('li')).toHaveCount(5);
    await expect(summary.locator('a[href="#reg-owner"]')).toHaveText('Accountable owner (team or role) is required.');
    await expect(page.locator('#reg-owner')).toHaveAttribute('aria-invalid', 'true');
    await expect(page.locator('#reg-owner')).toHaveAttribute('aria-describedby', /reg-owner-error/);

    await page.locator('#reg-id').fill('credit-afford-03');
    await page.locator('#reg-version').fill('3.2.0');
    await page.locator('#reg-owner').fill('team-retail-credit-models');
    await page.locator('#reg-scope').fill('credit:affordability-score\napplications:read');
    await page.locator('#reg-expiry').fill('2027-03-31');
    await page.locator('#reg-name').fill('Consumer loan affordability model');
    await page.locator('#reg-public-record-contact-email').fill('ai@bank.example.org');
    await page.locator('#reg-public-record-organisation').fill('Example Bank');
    await page.getByRole('button', { name: 'Check the entry', exact: true }).click();
    await expect(summary).toBeHidden();
    await expect(page.locator('#reg-result-title')).toBeFocused();
    await expect(page.locator('[data-bld-validity]')).toHaveText('Valid against ai-system-register-entry.v1.');
    await expect(page.locator('[data-bld-xwalk-rows] tr', { hasText: 'Contact email' })).toContainText('ai@bank.example.org');

    const entry = await download(page, 'Download entry (JSON)');
    expect(entry.name).toBe('register-entry-credit-afford-03.json');
    const record = JSON.parse(entry.body);
    expect(record.$schema).toBe('https://aigovernanceengineer.com/schemas/ai-system-register-entry.v1.json');
    expect(validate(S.system, record)).toEqual([]);

    await page.getByRole('button', { name: 'Add to the register', exact: true }).click();
    await expect(page.locator('[data-bld-register-rows] tr')).toHaveCount(1);

    // An agent in the same register.
    await page.locator('label[for="reg-kind-agent"]').click();
    await page.getByRole('button', { name: 'Start a new entry', exact: true }).click();
    await page.locator('#reg-id').fill('csa-01');
    await page.locator('#reg-version').fill('2026-09-18');
    await page.locator('#reg-owner').fill('team-customer-service');
    await page.locator('#reg-scope').fill('refunds:write');
    await page.locator('#reg-expiry').fill('2026-12-31');
    await page.getByRole('button', { name: 'Add to the register', exact: true }).click();
    await expect(page.locator('[data-bld-register-rows] tr')).toHaveCount(2);
    await expect(page.locator('[data-bld-register-rows] tr').nth(1)).toContainText('Agent');
    await expect(page.locator('[data-bld-register-rows] tr').nth(1)).toContainText('Valid');

    const csv = await download(page, 'Download register (CSV)');
    expect(csv.body.split('\r\n')[0]).toMatch(/^kind,id,version,name,owner,expiry,scope/);
    const reg = await download(page, 'Download register (JSON)');
    const list = JSON.parse(reg.body);
    expect(list).toHaveLength(2);
    expect(validate(S.system, list[0])).toEqual([]);
    expect(validate(S.agent, list[1])).toEqual([]);
    const md = await download(page, 'Download public summary of the register (Markdown)');
    expect(md.body).toContain('## Consumer loan affordability model');
    expect(md.body).not.toContain('credit:affordability-score');

    // Clear, then import the CSV back: two entries, both valid.
    page.once('dialog', (dialog) => dialog.accept());
    await page.getByRole('button', { name: 'Clear the register', exact: true }).click();
    await expect(page.locator('[data-bld-register-rows] tr')).toHaveCount(0);
    await page.locator('#reg-import').setInputFiles({ name: 'register.csv', mimeType: 'text/csv', buffer: Buffer.from(csv.body) });
    await expect(page.locator('[data-bld-register-rows] tr')).toHaveCount(2);
    await expect(page.locator('[data-bld-import-list] li').first()).toContainText('2 valid, 0 with problems');

    // A broken JSON row is imported and reported, not silently fixed.
    await page.locator('#reg-import').setInputFiles({
      name: 'bad.json',
      mimeType: 'application/json',
      buffer: Buffer.from(JSON.stringify([{ id: 'x', version: '1', owner: 'o', scope: ['s'], expiry: '2026-02-30' }])),
    });
    await expect(page.locator('[data-bld-register-rows] tr')).toHaveCount(3);
    await expect(page.locator('[data-bld-import-list]')).toContainText('expiry must be a date');

    // The register survives a reload (local storage), the link carries nothing.
    await page.reload();
    await expect(page.locator('[data-bld-register-rows] tr')).toHaveCount(3);
    expect(new URL(page.url()).hash).not.toContain('csa-01');
  });

  test('impact assessment: a FRIA with linked risks, exported three ways', async ({ page }) => {
    await page.goto('/toolkit/impact-assessment#type=fria');
    await expect(page.locator('#ia-type-fria')).toBeChecked();
    await page.locator('#ia-assessment-id').fill('fria-2026-004');
    await page.locator('#ia-subject').fill('credit-afford-03@3.2.0');
    await page.locator('#ia-assessor').fill('ai-governance-lead');
    await page.locator('#ia-processes').fill('Consumer loan origination.');

    await page.getByRole('button', { name: 'Add a risk', exact: true }).click();
    await expect(page.locator('#ia-risks-0-id')).toHaveValue('R1');
    await expect(page.locator('#ia-risks-0-right-or-interest')).toBeFocused();
    await page.locator('#ia-risks-0-right-or-interest').fill('non-discrimination');
    await page.locator('#ia-risks-0-description').fill('Age-correlated features decline older applicants more often.');
    await page.locator('#ia-risks-0-likelihood').selectOption('2');
    await page.locator('#ia-risks-0-severity').selectOption('4');

    await page.getByRole('button', { name: 'Add a measure', exact: true }).click();
    await page.locator('#ia-mitigations-0-measure').fill('Fairness eval gate on age bands');
    await expect(page.locator('[data-ia-warnings]')).toContainText('No measure addresses risk R1');
    await page.locator('label[for="ia-mitigations-0-addresses-R1"]').click();
    await page.locator('#ia-mitigations-0-pattern').selectOption({ label: 'Eval Gate in CI' });
    await page.locator('#ia-mitigations-0-status').selectOption('verified');
    await expect(page.locator('[data-ia-warnings]')).toBeHidden();
    await expect(page.locator('[data-ia-matrix] tr').first()).toContainText('8 (2 x 4)');
    await expect(page.locator('[data-ia-matrix] a')).toHaveAttribute('href', 'https://aigovernanceengineer.com/patterns/eval-gate-in-ci');

    await page.locator('#ia-outcome').selectOption('proceed_with_mitigations');
    await page.getByRole('button', { name: 'Add an approval', exact: true }).click();
    await page.locator('#ia-approvals-0-role').fill('head-of-retail-credit');
    await page.locator('#ia-approvals-0-decision').selectOption('approve');
    await page.locator('#ia-approvals-0-timestamp').fill('2026-08-19T16:00');
    await page.locator('label[for="ia-review-triggers-0"]').click();

    await page.getByRole('button', { name: 'Check the record', exact: true }).click();
    await expect(page.locator('#ia-result-title')).toBeFocused();
    await expect(page.locator('[data-bld-validity]')).toContainText('valid against impact-assessment.v1');

    const json = await download(page, 'Download JSON');
    expect(json.name).toBe('impact-assessment-fria-2026-004.json');
    const record = JSON.parse(json.body);
    expect(validate(S.ia, record)).toEqual([]);
    expect(record.type).toBe('fria');
    expect(record.risks[0].id).toBe('R1');
    expect(record.mitigations[0]).toMatchObject({ addresses: ['R1'], pattern: 'https://aigovernanceengineer.com/patterns/eval-gate-in-ci' });
    expect(record.review_triggers[0]).toContain('Art. 27(2)');
    expect(record.approvals[0].timestamp).toMatch(/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}Z$/);

    const yaml = await download(page, 'Download YAML');
    expect(await parseYaml(yaml.body)).toEqual(record);
    const md = await download(page, 'Download report (Markdown)');
    expect(md.body).toContain('# Fundamental rights impact assessment (FRIA): credit-afford-03@3.2.0');
    expect(md.body).toContain('[Eval Gate in CI](https://aigovernanceengineer.com/patterns/eval-gate-in-ci)');

    // Switching to the AIIA keeps the shared fields and shows the clause boxes.
    await page.locator('label[for="ia-type-aiia"]').click();
    expect(new URL(page.url()).hash).toBe('#type=aiia');
    await expect(page.locator('#ia-iso42005-sections-6-3-4')).toBeVisible();
    await expect(page.locator('#ia-assessment-id')).toHaveValue('fria-2026-004');
    await expect(page.locator('#ia-processes')).toHaveCount(0);

    // Opening the published example replaces the form.
    await page.locator('#ia-import').setInputFiles({
      name: 'example.json',
      mimeType: 'application/json',
      buffer: Buffer.from(JSON.stringify(example('impact-assessment'))),
    });
    await expect(page.locator('#ia-type-fria')).toBeChecked();
    await expect(page.locator('#ia-period-and-frequency')).toHaveValue(/1,500 applications a day/);
  });

  test('model card: checklist, Hub card and CycloneDX from the form', async ({ page }) => {
    await page.goto('/toolkit/model-card');
    await page.getByRole('button', { name: 'Check the card', exact: true }).click();
    await expect(page.locator('#mc-errors li')).toHaveCount(3);

    await page.locator('#mc-applicability-high-risk').selectOption('true');
    await page.locator('#mc-name').fill('Affordability model');
    await page.locator('#mc-version').fill('3.2.0');
    await page.locator('#mc-developer').fill('Example Bank');
    await page.locator('#mc-intended-uses').fill('Support the analyst');
    await page.locator('#mc-learning-approach').selectOption('supervised');
    await page.getByRole('button', { name: 'Add a result', exact: true }).click();
    await page.locator('#mc-metrics-0-type').fill('AUC');
    await page.locator('#mc-metrics-0-value').fill('0.81');
    await page.locator('#mc-metrics-0-slice').fill('applicants over 60');

    await page.getByRole('button', { name: 'Check the card', exact: true }).click();
    await expect(page.locator('#mc-result-title')).toBeFocused();
    await expect(page.locator('[data-item="iv-1a"]')).toContainText('Covered');
    await expect(page.locator('[data-item="iv-8"]')).toContainText('Not linked');
    await expect(page.locator('[data-item="13-b-v"]')).toContainText('Covered');
    await expect(page.locator('[data-mc-checklist]')).toContainText('not applicable to this card');

    const json = await download(page, 'Download record (JSON)');
    expect(validate(S.card, JSON.parse(json.body))).toEqual([]);
    const hf = await download(page, 'Download card (Hugging Face Markdown)');
    expect(hf.name).toBe('model-card-affordability-model-3-2-0.README.md');
    expect(hf.body.startsWith('---\n')).toBe(true);
    expect(hf.body).toContain('# Model Card for Affordability model');
    expect(hf.body).toContain('[More Information Needed]');
    const cdx = await download(page, 'Download ML-BOM (CycloneDX JSON)');
    const bom = JSON.parse(cdx.body);
    expect(bom.specVersion).toBe('1.7');
    expect(bom.components[0].type).toBe('machine-learning-model');
    expect(bom.components[0].modelCard.quantitativeAnalysis.performanceMetrics[0]).toEqual({ type: 'AUC', value: '0.81', slice: 'applicants over 60' });
    const csv = await download(page, 'Download checklist (CSV)');
    expect(csv.body.split('\r\n')[0]).toBe('Group,Reference,Requirement,State,Card fields,Filled,Obligation');

    // The draft is still there after a reload.
    await page.reload();
    await expect(page.locator('#mc-name')).toHaveValue('Affordability model');
  });

  test('sends nothing the reader enters', async ({ page }) => {
    const requests: { url: string; method: string }[] = [];
    for (const path of PAGES) {
      await page.goto(path);
      await page.waitForLoadState('networkidle');
      page.on('request', (request) => requests.push({ url: request.url(), method: request.method() }));
      const first = page.locator('[data-bld-form] input[type="text"]').first();
      await first.fill('Secret system name');
      await page.locator('[data-bld-form-el] button[type="submit"]').click();
      await Promise.all([page.waitForEvent('download'), page.locator('[data-action="json"], [data-action="entry-json"]').first().click()]);
      page.removeAllListeners('request');
    }
    const origin = new URL(page.url()).origin;
    for (const request of requests) {
      if (/^(blob|data):/.test(request.url)) continue;
      expect(request.method, request.url).toBe('GET');
      expect(new URL(request.url).origin, request.url).toBe(origin);
      expect(request.url).not.toContain('Secret');
    }
  });

  test('prints the result without the form controls', async ({ page }) => {
    await page.goto('/toolkit/impact-assessment');
    await page.emulateMedia({ media: 'print' });
    await expect(page.locator('.site-header')).toBeHidden();
    await expect(page.locator('[data-bld-result] .tool-actions')).toBeHidden();
    await expect(page.locator('#tool-notice')).toBeVisible();
    await expect(page.locator('[data-bld-result]')).toBeVisible();
  });
});
