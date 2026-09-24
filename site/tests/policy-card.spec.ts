// policy-card.spec.ts: the Policy Card builder (/toolkit/policy-card). Two
// layers of checks:
// 1. the generators (pure Node): every template has an engine; its defaults
//    pass the form checks; every card validates against the policy card schema
//    and reads back from YAML as the same JSON; the Rego, Cedar and CI files
//    carry what the page promises; the custom rule covers every operator and
//    effect; unsafe values are refused; the link state round-trips; the
//    committed samples in public/templates/policy-cards/ match the generator
//    (regenerate with scripts/policy-card-samples.mjs);
// 2. the page in a browser: worksheet without JavaScript, validation and focus,
//    the result and its files, the custom rule, downloads, the link state, no
//    network use with what the reader enters, print and reflow.
// The Rego and Cedar files themselves are checked with `opa check --strict`,
// `opa test` and `cedar run-tests` outside this suite (see the samples README).
import { test, expect } from '@playwright/test';
import { existsSync, readFileSync, readdirSync } from 'node:fs';
import { createRequire } from 'node:module';
import { join } from 'node:path';

import { policyCardTemplates, customOperators } from '../src/data/policy-card';
import { obligations, appliesStatusLabels } from '../src/data/frameworks';
import { patterns } from '../src/data/patterns';
import { tools, toolById } from '../src/data/toolkit';
import { encodeFragment, decodeFragment } from '../public/toolkit/lib.js';
import {
  defaultValues,
  checkValues,
  buildArtefacts,
  validateSchema,
  valuesToState,
  stateToValues,
  engineIds,
  toYaml,
  SCHEMA_ID,
} from '../public/toolkit/policy-card-core.js';

const TOOL = '/toolkit/policy-card';
const NOTICE =
  'Indicative, not legal advice and not a conformity claim. Nothing you enter leaves your browser.';
const SAMPLE_DATE = '2026-10-01';
const SAMPLES = join('public', 'templates', 'policy-cards');
const schema = JSON.parse(
  readFileSync(join('public', 'schemas', 'policy-card.v1.json'), 'utf8'),
) as Record<string, unknown>;
const ids = obligations.map((row) => row.id);
const EM_DASH = String.fromCharCode(0x2014);
// js-yaml ships with Astro but without type declarations; load it untyped.
const yaml = createRequire(import.meta.url)('js-yaml') as { load(text: string): unknown };

function ctxFor(template: (typeof policyCardTemplates)[number]) {
  return {
    obligations: Object.fromEntries(
      obligations.map((row) => [
        row.id,
        { obligation: row.obligation, status: appliesStatusLabels[row.appliesStatus] },
      ]),
    ),
    patternTitle: patterns.find((pattern) => pattern.slug === template.pattern)?.title,
  };
}

function buildDefault(id: string, overrides: Record<string, unknown> = {}) {
  const template = policyCardTemplates.find((entry) => entry.id === id);
  if (!template) throw new Error(id);
  const raw = { ...defaultValues(template, { today: SAMPLE_DATE }), ...overrides };
  const checked = checkValues(template, raw, { obligationIds: ids });
  return { template, raw, checked };
}

const fileText = (built: { files: { id: string; text: string }[] }, id: string) =>
  built.files.find((file) => file.id === id)?.text ?? '';

// ---- 1. Generators ----------------------------------------------------------

test.describe('policy card generators', () => {
  test('every template has an engine, known obligations and a known pattern', () => {
    expect([...engineIds].sort()).toEqual(policyCardTemplates.map((t) => t.id).sort());
    const curated = policyCardTemplates.filter((t) => t.id !== 'custom');
    expect(curated).toHaveLength(6);
    const slugs = new Set(patterns.map((pattern) => pattern.slug));
    for (const template of policyCardTemplates) {
      expect(slugs.has(template.pattern), template.pattern).toBe(true);
      expect(template.obligations.length, template.id).toBeGreaterThan(0);
      for (const id of template.obligations) expect(ids, `${template.id} ${id}`).toContain(id);
      expect(template.statement.length, template.id).toBeGreaterThan(20);
      expect(template.failureMode.length, template.id).toBeGreaterThan(20);
    }
  });

  test('defaults build a card that validates and reads back from YAML', () => {
    for (const template of policyCardTemplates) {
      const { checked } = buildDefault(template.id);
      expect(checked.errors, template.id).toEqual([]);
      const built = buildArtefacts(template, checked.values, ctxFor(template));
      expect(validateSchema(schema, built.card), template.id).toEqual([]);
      expect(built.card.$schema).toBe(SCHEMA_ID);
      expect(built.files.map((file: { id: string }) => file.id)).toEqual([
        'md',
        'yaml',
        'json',
        'rego',
        'rego-test',
        'cedar',
        'cedar-tests',
        'input',
        'ci',
      ]);
      expect(yaml.load(fileText(built, 'yaml'))).toEqual(built.card);
      expect(JSON.parse(fileText(built, 'json'))).toEqual(built.card);
      for (const file of built.files) {
        expect(file.text, `${template.id} ${file.name}`).not.toContain(EM_DASH);
      }
    }
  });

  test('the Rego module, its tests, the Cedar stub and the CI hook carry the rule', () => {
    for (const template of policyCardTemplates) {
      const { checked } = buildDefault(template.id);
      const built = buildArtefacts(template, checked.values, ctxFor(template));
      const { ruleId, effect } = checked.values;
      const rego = fileText(built, 'rego');
      expect(rego).toContain(`package aige.cards.${built.pkg}\n`);
      expect(rego).toContain('import rego.v1');
      expect(rego).toContain(`rule_id := "${ruleId}"`);
      expect(rego).toContain('blocks if decision == "deny"');
      for (const key of ['"rule_id"', '"decision"', '"input_hash"', '"timestamp"']) {
        expect(rego).toContain(key);
      }
      expect(rego).toContain('Illustrative, review before use.');
      const tests = fileText(built, 'rego-test');
      expect(tests).toContain(`package aige.cards.${built.pkg}_test`);
      // One test per case, plus the verdict, the compliant input not blocking CI and, where a
      // case is denied, the denied input blocking it.
      const denies = built.cases.some((c: { expect: string }) => c.expect === 'deny') ? 1 : 0;
      expect((tests.match(/^test_[a-z0-9_]+ if \{/gm) ?? []).length).toBe(
        built.cases.length + 2 + denies,
      );
      const cedar = fileText(built, 'cedar');
      expect(cedar).toContain(`@id("${ruleId}")`);
      expect(cedar).toContain(`@effect("${effect}")`);
      const cedarTests = JSON.parse(fileText(built, 'cedar-tests')) as { decision: string }[];
      expect(cedarTests.length).toBeGreaterThanOrEqual(3);
      expect(new Set(cedarTests.map((c) => c.decision))).toEqual(new Set(['allow', 'deny']));
      const ci = yaml.load(fileText(built, 'ci')) as {
        jobs: { 'policy-card': { steps: { uses?: string; run?: string }[] } };
      };
      const steps = ci.jobs['policy-card'].steps;
      expect(steps.map((step) => step.uses).filter(Boolean)).toEqual(
        expect.arrayContaining(['actions/checkout@v7', 'open-policy-agent/setup-opa@v2']),
      );
      const runs = steps.map((step) => step.run ?? '').join('\n');
      expect(runs).toContain('opa check --strict');
      expect(runs).toContain('opa test');
      const gated = checked.values.enforcement.some((point: string) => point !== 'runtime');
      expect(runs.includes('--fail-defined'), template.id).toBe(gated && (effect === 'deny' || effect === 'allow'));
      const input = JSON.parse(fileText(built, 'input'));
      expect(input.action, template.id).toBeTruthy();
    }
  });

  test('the custom rule covers every operator and effect', () => {
    const values: Record<string, string> = {
      missing: '',
      equals: 'high',
      not_equals: '3',
      lt: '0.5',
      gt: '10',
      one_of: 'a, b',
      not_one_of: 'true',
    };
    expect(customOperators.map((op) => op.id).sort()).toEqual(Object.keys(values).sort());
    for (const effect of ['deny', 'require_approval', 'alert', 'allow']) {
      for (const [operator, value] of Object.entries(values)) {
        const template = policyCardTemplates.find((t) => t.id === 'custom')!;
        const raw = defaultValues(template, { today: SAMPLE_DATE });
        raw.params = { action: 'tool_call', field: 'call.args.band', operator, value };
        raw.effect = effect;
        raw.enforcement = ['pre_merge', 'runtime'];
        const checked = checkValues(template, raw, { obligationIds: ids });
        expect(checked.errors, `${effect} ${operator}`).toEqual([]);
        const built = buildArtefacts(template, checked.values, ctxFor(template));
        expect(validateSchema(schema, built.card), `${effect} ${operator}`).toEqual([]);
        const rego = fileText(built, 'rego');
        if (effect === 'allow') expect(rego).toContain('default allow := false');
        else expect(rego).toContain(`${effect} contains msg if {`);
        const cedar = fileText(built, 'cedar');
        expect(cedar).toContain(effect === 'allow' ? 'permit (' : 'forbid (');
        expect(cedar.includes('.baseline'), `${effect} ${operator}`).toBe(effect !== 'allow');
      }
    }
  });

  test('values that would break the generated code are refused', () => {
    const bad: [string, Record<string, unknown>][] = [
      ['cardId', { cardId: 'Pc Card' }],
      ['cardId', { cardId: 'default' }],
      ['ruleId', { ruleId: 'rule"; drop' }],
      ['version', { version: '1.0 beta' }],
      ['owner', { owner: 'x"y' }],
      ['appliesTo', { appliesTo: '' }],
      ['reviewBy', { reviewBy: '2026-09-30' }],
      ['effectiveFrom', { effectiveFrom: '2026-02-30' }],
      ['obligations', { obligations: [], otherRefs: '' }],
    ];
    for (const [field, overrides] of bad) {
      const { checked } = buildDefault('eval-score-gate', overrides);
      expect(checked.ok, field).toBe(false);
      expect(checked.errors.map((e: { field: string }) => e.field), field).toContain(field);
    }
    const params: [string, string, Record<string, string>][] = [
      ['eval-score-gate', 'param-min_score', { suite_id: 'safety-core', min_score: '0.12345' }],
      ['eval-score-gate', 'param-suite_id', { suite_id: 'safety "core"', min_score: '0.9' }],
      ['expired-exception-blocks-build', 'param-max_days', { max_days: '0' }],
      ['custom', 'param-field', { action: 'deploy', field: 'system.in', operator: 'equals', value: 'x' }],
      ['custom', 'param-value', { action: 'deploy', field: 'system.tier', operator: 'lt', value: 'high' }],
    ];
    for (const [id, field, values] of params) {
      const { checked } = buildDefault(id, { params: values });
      expect(checked.errors.map((e: { field: string }) => e.field), `${id} ${field}`).toContain(field);
    }
    // Line breaks in free text are collapsed, so they cannot break out of a comment.
    const { template, checked } = buildDefault('approval-for-tool', {
      title: 'Refunds\n}\npackage evil',
    });
    expect(checked.ok).toBe(true);
    const rego = fileText(buildArtefacts(template, checked.values, ctxFor(template)), 'rego');
    expect(rego).not.toContain('\npackage evil');
  });

  test('the link state round-trips through the fragment', () => {
    for (const template of policyCardTemplates) {
      const raw = defaultValues(template, { today: SAMPLE_DATE });
      raw.approver = '';
      raw.otherRefs = 'AUP-4.2, SEC-11';
      const state = decodeFragment(`#${encodeFragment(valuesToState(raw))}`);
      const back = stateToValues(state, policyCardTemplates, { today: '2030-01-01' });
      const a = checkValues(template, raw, { obligationIds: ids });
      const b = checkValues(template, back, { obligationIds: ids });
      expect(b.values, template.id).toEqual(a.values);
    }
    expect(stateToValues(decodeFragment('#main'), policyCardTemplates, { today: SAMPLE_DATE })).toBeNull();
  });

  test('YAML output quotes what a YAML reader could misread', () => {
    const doc = { a: 'yes', b: '2026-10-01', c: '1.0', d: 'x: y', e: [], f: {}, g: ['on', 'plain'] };
    expect(yaml.load(toYaml(doc))).toEqual(doc);
  });

  test('the committed samples match the generator', () => {
    for (const template of policyCardTemplates) {
      const { checked } = buildDefault(template.id);
      const built = buildArtefacts(template, checked.values, ctxFor(template));
      const dir = join(SAMPLES, template.id);
      expect(existsSync(dir), dir).toBe(true);
      const names = readdirSync(dir).sort();
      expect(names).toEqual(built.files.map((file: { name: string }) => file.name).sort());
      for (const file of built.files) {
        expect(readFileSync(join(dir, file.name), 'utf8'), `${template.id}/${file.name}`).toBe(
          file.text,
        );
      }
    }
    expect(existsSync(join(SAMPLES, 'README.md'))).toBe(true);
  });

  test('the registry lists the tool as live, with its page and modules', () => {
    const tool = toolById('policy-card');
    expect(tool.status).toBe('live');
    expect(tool.href).toBe(TOOL);
    expect(tools.filter((entry) => entry.id === 'policy-card')).toHaveLength(1);
    for (const file of [
      join('src', 'pages', 'toolkit', 'policy-card.astro'),
      join('public', 'toolkit', 'policy-card.js'),
      join('public', 'toolkit', 'policy-card-core.js'),
    ]) {
      expect(existsSync(file), file).toBe(true);
      const text = readFileSync(file, 'utf8');
      expect(text).not.toContain(EM_DASH);
      expect(text).not.toMatch(/\b(fetch|sendBeacon|XMLHttpRequest)\s*\(/);
    }
  });
});

// ---- 2. The page ------------------------------------------------------------

test.describe('policy card builder without JavaScript', () => {
  test.use({ javaScriptEnabled: false });

  test('reads as a worksheet: notice, every rule and its parameters, the guide', async ({
    page,
  }) => {
    await page.goto(TOOL);
    await expect(page.locator('#tool-notice')).toHaveText(NOTICE);
    await expect(page.locator('.tool-nojs')).toBeVisible();
    await expect(page.locator('input[name="template"]')).toHaveCount(7);
    await expect(page.locator('[data-pc-params]')).toHaveCount(7);
    for (const group of await page.locator('[data-pc-params]').all()) {
      await expect(group).toBeVisible();
    }
    await expect(page.locator('#pc-templates')).toBeVisible();
    await expect(page.locator('.pc-guide-item')).toHaveCount(6);
    await expect(page.locator('#pc-use')).toBeVisible();
    await expect(page.locator('[data-pc-result]')).toBeHidden();
    await expect(page.getByRole('button', { name: 'Build the card', exact: true })).toBeHidden();
  });
});

test.describe('policy card builder', () => {
  test('builds the default card, with every file and a valid record', async ({ page }) => {
    await page.goto(TOOL);
    await expect(page.locator('.tool-nojs')).toBeHidden();
    await expect(page.locator('#pc-template-registered-agents-only')).toBeChecked();
    await expect(page.locator('[data-pc-params="registered-agents-only"]')).toBeVisible();
    await expect(page.locator('[data-pc-params="eval-score-gate"]')).toBeHidden();

    await page.getByRole('button', { name: 'Build the card', exact: true }).click();
    const result = page.locator('[data-pc-result]');
    await expect(result).toBeVisible();
    await expect(page.locator('#pc-result-title')).toBeFocused();
    await expect(page.locator('[data-pc-valid]')).toContainText('validates against');
    await expect(page.locator('[data-pc-file]')).toHaveCount(9);
    await expect(page.locator('[data-pc-code="rego"]')).toContainText(
      'package aige.cards.pc_registered_agents_only',
    );
    await expect(page.locator('[data-pc-code="md"]')).toContainText('AIGE-OBL-EUAIA-ART49-71');
    await expect(page.locator('[data-pc-status]')).toContainText('Policy Card built');
    expect(page.url()).toContain('t=registered-agents-only');
  });

  test('switching rules fills their defaults; bad values are named and focused', async ({
    page,
  }) => {
    await page.goto(TOOL);
    await page.locator('label[for="pc-template-eval-score-gate"]').click();
    await expect(page.locator('[data-pc-params="eval-score-gate"]')).toBeVisible();
    await expect(page.locator('#pc-cardId')).toHaveValue('pc-eval-score-gate');
    await expect(page.locator('#pc-ob-aige-obl-euaia-art15')).toBeChecked();

    await page.locator('#pc-eval-score-gate-min_score').fill('ninety');
    await page.locator('#pc-cardId').fill('Bad Id');
    await page.getByRole('button', { name: 'Build the card', exact: true }).click();
    const summary = page.locator('[data-pc-errors]');
    await expect(summary).toBeVisible();
    await expect(summary).toBeFocused();
    await expect(summary.locator('li')).toHaveCount(2);
    await expect(page.locator('#pc-eval-score-gate-min_score')).toHaveAttribute(
      'aria-invalid',
      'true',
    );
    await expect(page.locator('[data-pc-result]')).toBeHidden();

    await page.locator('#pc-eval-score-gate-min_score').fill('0.85');
    await page.locator('#pc-cardId').fill('pc-eval-gate');
    await page.getByRole('button', { name: 'Build the card', exact: true }).click();
    await expect(summary).toBeHidden();
    await expect(page.locator('[data-pc-code="rego"]')).toContainText('min_score := 0.85');
    await expect(page.locator('[data-pc-code="cedar"]')).toContainText('decimal("0.85")');
  });

  test('writes a custom rule with the allow effect', async ({ page }) => {
    await page.goto(TOOL);
    await page.locator('label[for="pc-template-custom"]').click();
    await page.locator('#pc-custom-action').fill('tool_call');
    await page.locator('#pc-custom-field').fill('call.tool');
    await page.locator('#pc-custom-operator').selectOption('one_of');
    await page.locator('#pc-custom-value').fill('search, calendar');
    await page.locator('label[for="pc-effect-allow"]').click();
    await page.getByRole('button', { name: 'Build the card', exact: true }).click();
    await expect(page.locator('[data-pc-code="rego"]')).toContainText('default allow := false');
    await expect(page.locator('[data-pc-code="rego"]')).toContainText(
      'input.call.tool in {"search", "calendar"}',
    );
    await expect(page.locator('[data-pc-code="cedar"]')).toContainText('permit (');
    await expect(page.locator('[data-pc-code="json"]')).toContainText('"effect": "allow"');
  });

  test('downloads a file and the bundle; a link rebuilds the card', async ({ page }) => {
    await page.goto(TOOL);
    await page.locator('label[for="pc-template-approval-for-tool"]').click();
    await page.locator('#pc-approval-for-tool-tool').fill('payments-api');
    await page.getByRole('button', { name: 'Build the card', exact: true }).click();
    const [rego] = await Promise.all([
      page.waitForEvent('download'),
      page.locator('[data-action="download-file"][data-file="rego"]').click(),
    ]);
    expect(rego.suggestedFilename()).toBe('pc-approval-for-tool.rego');
    const [bundle] = await Promise.all([
      page.waitForEvent('download'),
      page.getByRole('button', { name: 'Download all (one Markdown file)', exact: true }).click(),
    ]);
    expect(bundle.suggestedFilename()).toBe('pc-approval-for-tool.bundle.md');
    const text = readFileSync((await bundle.path()) as string, 'utf8');
    expect(text).toContain('## policies/pc-approval-for-tool.rego');
    expect(text).toContain('payments-api');

    const link = page.url();
    await page.goto('/toolkit');
    await page.goto(link);
    await expect(page.locator('[data-pc-result]')).toBeVisible();
    await expect(page.locator('#pc-template-approval-for-tool')).toBeChecked();
    await expect(page.locator('[data-pc-code="rego"]')).toContainText('tool := "payments-api"');
  });

  test('sends nothing the reader enters', async ({ page }) => {
    const requests: { url: string; method: string }[] = [];
    await page.goto(TOOL);
    await page.waitForLoadState('networkidle');
    page.on('request', (request) =>
      requests.push({ url: request.url(), method: request.method() }),
    );
    await page.locator('#pc-owner').fill('secret-team');
    await page.getByRole('button', { name: 'Build the card', exact: true }).click();
    await expect(page.locator('[data-pc-result]')).toBeVisible();
    await Promise.all([
      page.waitForEvent('download'),
      page.locator('[data-action="download-file"][data-file="json"]').click(),
    ]);
    const origin = new URL(page.url()).origin;
    for (const request of requests) {
      if (/^(blob|data):/.test(request.url)) continue;
      expect(request.method, request.url).toBe('GET');
      expect(new URL(request.url).origin, request.url).toBe(origin);
      expect(request.url).not.toContain('secret');
    }
  });

  test('prints the card and its files, not the form', async ({ page }) => {
    await page.goto(TOOL);
    await page.getByRole('button', { name: 'Build the card', exact: true }).click();
    await expect(page.locator('[data-pc-result]')).toBeVisible();
    await page.emulateMedia({ media: 'print' });
    await expect(page.locator('#tool-notice')).toBeVisible();
    await expect(page.locator('[data-pc-form]')).toBeHidden();
    await expect(page.locator('[data-pc-result] .tool-actions')).toBeHidden();
    await expect(page.locator('[data-pc-code="md"]')).toBeVisible();
  });

  test('no horizontal scroll at 390px, with a result', async ({ page }) => {
    await page.setViewportSize({ width: 390, height: 844 });
    await page.goto(TOOL);
    await page.getByRole('button', { name: 'Build the card', exact: true }).click();
    await expect(page.locator('[data-pc-result]')).toBeVisible();
    const overflow = await page.evaluate(
      () => document.documentElement.scrollWidth - document.documentElement.clientWidth,
    );
    expect(overflow).toBeLessThanOrEqual(0);
  });
});
