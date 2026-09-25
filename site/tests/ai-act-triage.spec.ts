// ai-act-triage.spec.ts: the EU AI Act role and risk-class triage
// (/toolkit/ai-act-triage). Three layers of checks:
// 1. data (pure Node): the versioned question graph in src/data/triage.ts is
//    well formed, covers the brief's topics, cites only text chapter 18 states,
//    and its labels match roles.ts and frameworks.ts;
// 2. the engine (pure Node, public/toolkit/ai-act-triage-engine.js): outcomes
//    for worked cases, hidden questions, the record against its JSON Schema,
//    YAML, link state, re-opening and the planner hand-off;
// 3. the page in a browser: worksheet without JavaScript, validation, result,
//    link state, exports, re-import, no network use, print and reflow.
import { test, expect } from '@playwright/test';
import type { Download, Page } from '@playwright/test';
import { existsSync, readFileSync } from 'node:fs';
import { join } from 'node:path';

import { readSource, slugify, getHeadings } from '../src/lib/md-parse';
import {
  questionSet,
  questions,
  steps,
  classRules,
  roleRules,
  scopeRules,
  noteRules,
  reReviewTriggers,
  roleLabels,
  classLabels,
  classOrder,
  reservedFragmentKeys,
  basisItems,
  plainChapterText,
  triageModel,
} from '../src/data/triage';
import type { Condition } from '../src/data/triage';
import { roles } from '../src/data/roles';
import { systemClassLabels } from '../src/data/frameworks';
import { tools, toolById } from '../src/data/toolkit';
import {
  evaluate,
  resolveAnswers,
  cleanMeta,
  buildRecord,
  toYaml,
  stateToParams,
  paramsToState,
  plannerParams,
  recordToState,
  RECORD_KIND,
  RECORD_SCHEMA,
} from '../public/toolkit/ai-act-triage-engine.js';
import { encodeFragment, decodeFragment } from '../public/toolkit/lib.js';

const TOOL = '/toolkit/ai-act-triage';
const NOTICE =
  'Indicative, not legal advice and not a conformity claim. Nothing you enter leaves your browser.';
const CHAPTER_FILE = questionSet.chapterFile;
const SCHEMA_FILE = join('public', 'schemas', 'classification-decision-record.v1.json');
const EXAMPLE_FILE = join('public', 'schemas', 'examples', 'classification-decision-record.example.json');
const EM_DASH = String.fromCharCode(0x2014);

const chapterMd = readSource(CHAPTER_FILE);
const headingSlug = new Map(getHeadings(chapterMd).map((h) => [h.text, slugify(h.text)]));
const model = {
  ...triageModel((heading) => `/bok/eu-ai-act#${headingSlug.get(heading)}`),
  notice: NOTICE,
  page: `https://aigovernanceengineer.com${TOOL}`,
  chapter: 'https://aigovernanceengineer.com/bok/eu-ai-act',
  planner: { href: '/toolkit/obligations-planner', live: false },
  registerHref: '/obligations',
};

/** The chapter 18 worked example: a CV screening system in Annex III point 4
 *  that claims the preparatory-task condition and profiles applicants. */
const CV_SCREEN = {
  object: 'system',
  inference: 'yes',
  reach: ['eu-market', 'eu-established'],
  exclusions: ['none'],
  activity: ['develop', 'use'],
  art25: ['none'],
  art5: ['none'],
  generation: 'no',
  annex1: 'no',
  annex3: ['employment'],
  'art6-3': ['preparatory-task'],
  profiling: 'yes',
  art50: ['none'],
};

// ---- A minimal validator for the schema subset (as schemas-check enforces it) ----

type Json = unknown;
function validate(schema: Record<string, any>, value: Json, path = ''): string[] {
  const out: string[] = [];
  const isObj = (v: Json) => v !== null && typeof v === 'object' && !Array.isArray(v);
  if (schema.type) {
    const types = Array.isArray(schema.type) ? schema.type : [schema.type];
    const ok = types.some((t: string) =>
      t === 'object'
        ? isObj(value)
        : t === 'array'
          ? Array.isArray(value)
          : t === 'integer'
            ? Number.isInteger(value)
            : t === 'null'
              ? value === null
              : typeof value === t,
    );
    if (!ok) return [`${path || '/'}: type`];
  }
  if (schema.const !== undefined && JSON.stringify(schema.const) !== JSON.stringify(value)) {
    out.push(`${path}: const`);
  }
  if (schema.enum && !schema.enum.includes(value)) out.push(`${path}: enum ${String(value)}`);
  if (typeof value === 'string') {
    if (schema.minLength !== undefined && value.length < schema.minLength) out.push(`${path}: min`);
    if (schema.maxLength !== undefined && value.length > schema.maxLength) out.push(`${path}: max`);
    if (schema.pattern && !new RegExp(schema.pattern, 'u').test(value)) out.push(`${path}: pattern`);
    if (schema.format === 'date' && !/^\d{4}-\d{2}-\d{2}$/.test(value)) out.push(`${path}: date`);
    if (schema.format === 'uri' && !/^[a-z][a-z0-9+.-]*:\S+$/i.test(value)) out.push(`${path}: uri`);
  }
  if (Array.isArray(value)) {
    if (schema.minItems !== undefined && value.length < schema.minItems) out.push(`${path}: items`);
    if (schema.items) value.forEach((item, i) => out.push(...validate(schema.items, item, `${path}/${i}`)));
  }
  if (isObj(value)) {
    const obj = value as Record<string, Json>;
    for (const key of schema.required ?? []) if (!(key in obj)) out.push(`${path}: missing ${key}`);
    for (const [key, child] of Object.entries(obj)) {
      if (schema.properties?.[key]) out.push(...validate(schema.properties[key], child, `${path}/${key}`));
      else if (schema.additionalProperties === false) out.push(`${path}: extra ${key}`);
    }
  }
  return out;
}

const schema = JSON.parse(readFileSync(SCHEMA_FILE, 'utf8'));

function recordFor(raw: Record<string, unknown>, extra: Record<string, unknown> = {}) {
  const evaluation = evaluate(model, raw, { decidedAt: '2026-09-24' });
  const meta = cleanMeta(model, {
    name: 'CV screening assistant',
    registryId: 'cv-screen-02',
    purpose: 'Rank job applications for recruiters.',
    reviewer: 'ai-governance',
    decidedAt: '2026-09-24',
    triggers: evaluation.suggestedTriggers,
    ...extra,
  });
  const link = `${model.page}#${encodeFragment(stateToParams(model, evaluation.answers, meta))}`;
  return {
    evaluation,
    meta,
    record: buildRecord(model, evaluation, meta, { page: model.page, notice: NOTICE, link }),
  };
}

// ---- 1. Data ------------------------------------------------------------------------

/** Every question id and option value a condition names. */
function conditionRefs(condition: Condition, out: { q: string; values: readonly string[] }[] = []) {
  if ('all' in condition) condition.all.forEach((c) => conditionRefs(c, out));
  else if ('any' in condition) condition.any.forEach((c) => conditionRefs(c, out));
  else if ('not' in condition) conditionRefs(condition.not, out);
  else if ('q' in condition) out.push({ q: condition.q, values: condition.in });
  return out;
}

test.describe('triage data', () => {
  test('the question set is versioned and has 15 to 25 well-formed questions', () => {
    expect(questionSet.version).toMatch(/^\d+\.\d+\.\d+$/);
    expect(questionSet.asOf).toBe('2026-09-24');
    expect(questions.length).toBeGreaterThanOrEqual(15);
    expect(questions.length).toBeLessThanOrEqual(25);
    const ids = questions.map((q) => q.id);
    expect(new Set(ids).size).toBe(ids.length);
    const stepIds = new Set(steps.map((s) => s.id));
    for (const question of questions) {
      expect(question.id).toMatch(/^[a-z0-9]+(?:-[a-z0-9]+)*$/);
      expect(reservedFragmentKeys as readonly string[]).not.toContain(question.id);
      expect(stepIds.has(question.step), question.id).toBe(true);
      expect(question.article, question.id).toMatch(/^(Art\.|Arts\.|Annex)/);
      expect(question.eurLex, question.id).toMatch(/^(art_\d+|anx_[IVX]+)$/);
      expect(question.basis.length, question.id).toBeGreaterThan(0);
      const values = question.options.map((o) => o.value);
      expect(new Set(values).size, question.id).toBe(values.length);
      for (const option of question.options) {
        expect(option.value).toMatch(/^[a-z0-9]+(?:-[a-z0-9]+)*$/);
        expect(option.means.length, `${question.id}.${option.value}`).toBeGreaterThan(5);
      }
      if (question.showIf) expect(question.askWhen, question.id).toBeTruthy();
    }
  });

  test('every condition names an earlier question and a real option', () => {
    const order = new Map(questions.map((q, i) => [q.id, i]));
    const byId = new Map(questions.map((q) => [q.id, q]));
    const check = (where: string, condition: Condition, before?: number) => {
      for (const ref of conditionRefs(condition)) {
        const question = byId.get(ref.q);
        expect(question, `${where} names ${ref.q}`).toBeTruthy();
        if (before !== undefined) expect(order.get(ref.q)!, where).toBeLessThan(before);
        for (const value of ref.values) {
          expect(
            question!.options.some((o) => o.value === value),
            `${where}: ${ref.q}=${value}`,
          ).toBe(true);
        }
      }
    };
    questions.forEach((q, i) => q.showIf && check(`question ${q.id}`, q.showIf, i));
    for (const rule of [...classRules, ...roleRules, ...scopeRules, ...noteRules]) {
      check(`rule ${rule.id}`, rule.when);
    }
    for (const trigger of reReviewTriggers) {
      if (trigger.suggestWhen) check(`trigger ${trigger.id}`, trigger.suggestWhen);
    }
  });

  test('the graph covers the brief: reach, definition, exclusions, Art. 25, Art. 5, Annex I and III, Art. 6(3), Art. 50, GPAI', () => {
    const articles = questions.map((q) => q.article).join(' | ');
    for (const needle of [
      'Art. 2(1)',
      'Art. 3(1)',
      'Art. 2(3)',
      'Art. 25(1)',
      'Art. 5(1)',
      'Art. 5(1)(ba), (bb)',
      'Art. 6(1)',
      'Annex III',
      'Art. 6(3)',
      'Art. 50',
      'Art. 3(63)',
      'Art. 51',
    ]) {
      expect(articles, needle).toContain(needle);
    }
    const dates = classRules.map((r) => r.appliesFrom);
    for (const date of ['2025-02-02', '2026-12-02', '2027-12-02', '2028-08-02', '2026-08-02', '2025-08-02']) {
      expect(dates, date).toContain(date);
    }
  });

  test('the tool cites only text chapter 18 states, under headings that exist', () => {
    const plain = plainChapterText(chapterMd);
    for (const item of basisItems()) {
      expect(headingSlug.has(item.section), `${item.where}: ${item.section}`).toBe(true);
      for (const fragment of item.basis) {
        expect(plain.includes(plainChapterText(fragment)), `${item.where}: ${fragment}`).toBe(true);
      }
    }
  });

  test('role and class labels match roles.ts and frameworks.ts', () => {
    for (const [id, entry] of Object.entries(roleLabels)) {
      const row = roles.find((role) => role.id === id);
      expect(row?.role, id).toBe(entry.label);
    }
    for (const id of classOrder) {
      if (id === 'minimal') continue;
      expect(systemClassLabels[id], id).toBe(classLabels[id].label);
    }
  });

  test('the registry lists the tool live, with its page, module and engine', () => {
    const entry = toolById('ai-act-triage');
    expect(entry.status).toBe('live');
    expect(entry.href).toBe(TOOL);
    expect(entry.chapter?.href).toBe('/bok/eu-ai-act');
    for (const file of [
      join('src', 'pages', 'toolkit', 'ai-act-triage.astro'),
      join('public', 'toolkit', 'ai-act-triage.js'),
      join('public', 'toolkit', 'ai-act-triage-engine.js'),
    ]) {
      expect(existsSync(file), file).toBe(true);
    }
  });

  test('the planner hand-off codes are those of the planner, once it is on the branch', () => {
    const file = join('src', 'data', 'obligations-planner.ts');
    test.skip(!existsSync(file), 'the obligations planner is not on this branch yet');
    const text = readFileSync(file, 'utf8');
    const codes = new Map(
      [...text.matchAll(/id: '([a-z0-9-]+)',\s*code: '([a-z0-9]+)'/g)].map((m) => [m[1], m[2]]),
    );
    const handoff = model.plannerHandoff;
    const expectedRole: Record<string, string> = {
      'eu-provider': 'provider',
      'eu-downstream-provider': 'provider',
      'eu-product-manufacturer': 'provider',
      'eu-deployer': 'deployer',
      'eu-importer': 'importer',
      'eu-distributor': 'distributor',
      'eu-authorised-representative': 'authorised-representative',
      'eu-gpai-provider': 'gpai-provider',
    };
    for (const [role, code] of Object.entries(handoff.roleCodes)) {
      expect(codes.get(expectedRole[role]), role).toBe(code);
    }
    expect(codes.get('gpai-systemic')).toBe(handoff.systemicGpaiRoleCode);
    for (const [cls, code] of Object.entries(handoff.classCodes)) {
      expect(codes.get(cls), cls).toBe(code);
    }
  });

  test('no verdict, badge or seal wording and no em dash in the tool', () => {
    const sources = [
      readFileSync(join('src', 'pages', 'toolkit', 'ai-act-triage.astro'), 'utf8'),
      readFileSync(join('public', 'toolkit', 'ai-act-triage.js'), 'utf8'),
      readFileSync(join('public', 'toolkit', 'ai-act-triage-engine.js'), 'utf8'),
      readFileSync(join('src', 'data', 'triage.ts'), 'utf8'),
    ].join('\n');
    expect(sources).not.toMatch(/\b(compliant|badge|seal|certified|certificate of|your score)\b/i);
    expect(sources).not.toContain(EM_DASH);
  });
});

// ---- 2. Engine -----------------------------------------------------------------------

test.describe('triage engine', () => {
  test('the chapter 18 example: profiling defeats the claimed filter', () => {
    const evaluation = evaluate(model, CV_SCREEN, { decidedAt: '2026-09-24' });
    expect(evaluation.complete).toBe(true);
    expect(evaluation.scope.status).toBe('in-scope');
    expect(evaluation.roles.map((r: { id: string }) => r.id)).toEqual(['eu-provider', 'eu-deployer']);
    expect(evaluation.classes.map((c: { id: string }) => c.id)).toEqual(['high-risk-annex-iii']);
    const hr = evaluation.classes[0];
    expect(hr.appliesFrom).toBe('2027-12-02');
    expect(hr.timing).toBe('applies-later');
    expect(hr.reasons[0].reason).toContain('the override beats all four');
    expect(evaluation.notes.map((n: { id: string }) => n.id)).toContain('fria');
    expect(evaluation.answerRows).toHaveLength(13);
  });

  test('without profiling, the Art. 6(3) filter takes it off the high-risk rung', () => {
    const evaluation = evaluate(model, { ...CV_SCREEN, profiling: 'no' });
    const ids = evaluation.classes.map((c: { id: string }) => c.id);
    expect(ids).not.toContain('high-risk-annex-iii');
    expect(ids).toContain('minimal');
    expect(evaluation.notes.map((n: { id: string }) => n.id)).toContain('annex-iii-filtered');
  });

  test('hidden questions do not count: no Annex III area, no filter questions', () => {
    const { visible, answers } = resolveAnswers(model, {
      ...CV_SCREEN,
      annex3: ['none'],
      gpai: 'yes',
    });
    expect(visible).not.toContain('art6-3');
    expect(visible).not.toContain('profiling');
    expect(visible).not.toContain('gpai');
    expect(answers['art6-3']).toBeUndefined();
    expect(answers.gpai).toBeUndefined();
    // "None of these" beside a real option: the real option wins.
    expect(resolveAnswers(model, { ...CV_SCREEN, art5: ['none', 'c'] }).answers.art5).toEqual(['c']);
  });

  test('out of scope assigns nothing, keeps what would follow, and hands nothing off', () => {
    const evaluation = evaluate(model, { ...CV_SCREEN, reach: ['none'] });
    expect(evaluation.scope.status).toBe('out-of-scope');
    expect(evaluation.scope.reasons[0].article).toBe('Art. 2(1)');
    expect(evaluation.roles).toEqual([]);
    expect(evaluation.classes).toEqual([]);
    expect(evaluation.ifInScope?.classes.map((c: { id: string }) => c.id)).toEqual(['high-risk-annex-iii']);
    expect(evaluation.notes.map((n: { id: string }) => n.id)).not.toContain('fria');
    expect(plannerParams(model, evaluation, '2026-09-24')).toBeNull();
  });

  test('Art. 25(1)(c): a deployer that repurposes a system into Annex III becomes its provider', () => {
    const evaluation = evaluate(model, {
      ...CV_SCREEN,
      activity: ['use'],
      art25: ['purpose'],
      'art6-3': ['none'],
      profiling: 'no',
    });
    const roleIds = evaluation.roles.map((r: { id: string }) => r.id);
    expect(roleIds).toEqual(['eu-provider', 'eu-deployer']);
    expect(evaluation.roles[0].reasons[0].article).toBe('Art. 25(1)');
    expect(evaluation.notes.map((n: { id: string }) => n.id)).toContain('article-25-cooperation');
    // The same trigger without a high-risk class is an open point, not a role.
    const loose = evaluate(model, { ...CV_SCREEN, activity: ['use'], art25: ['purpose'], annex3: ['none'] });
    expect(loose.roles.map((r: { id: string }) => r.id)).toEqual(['eu-deployer']);
    expect(loose.notes.find((n: { id: string }) => n.id === 'article-25-not-high-risk')?.kind).toBe('open');
  });

  test('the Omnibus prohibitions apply from 2026-12-02; the other points since 2025-02-02', () => {
    const generator = evaluate(model, { ...CV_SCREEN, generation: 'unsafe' }, { decidedAt: '2026-09-24' });
    const prohibited = generator.classes.find((c: { id: string }) => c.id === 'prohibited');
    expect(prohibited.appliesFrom).toBe('2026-12-02');
    expect(prohibited.timing).toBe('applies-later');
    const scoring = evaluate(model, { ...CV_SCREEN, art5: ['c'] }, { decidedAt: '2026-09-24' });
    expect(scoring.classes[0].id).toBe('prohibited');
    expect(scoring.classes[0].timing).toBe('applies');
    // A carve-out point with the carve-out confirmed is not prohibited.
    const carved = evaluate(model, { ...CV_SCREEN, art5: ['f'], 'art5-carveout': 'applies' });
    expect(carved.classes.map((c: { id: string }) => c.id)).not.toContain('prohibited');
    const safeguarded = evaluate(model, { ...CV_SCREEN, generation: 'safeguarded' });
    expect(safeguarded.notes.map((n: { id: string }) => n.id)).toContain('generation-safeguard');
  });

  test('a GPAI model above 10^25 FLOP carries the systemic-risk class; open source does not exempt it', () => {
    const evaluation = evaluate(model, {
      object: 'model',
      reach: ['eu-market'],
      exclusions: ['none'],
      activity: ['develop'],
      gpai: 'yes',
      'gpai-compute': 'above',
      'gpai-origin': 'trained',
      'gpai-open': 'yes',
    });
    expect(evaluation.complete).toBe(true);
    expect(evaluation.classes.map((c: { id: string }) => c.id)).toEqual(['gpai', 'gpai-systemic']);
    expect(evaluation.roles.map((r: { id: string }) => r.id)).toEqual(['eu-gpai-provider']);
    const notes = evaluation.notes.map((n: { id: string }) => n.id);
    expect(notes).toContain('gpai-open-source-systemic');
    expect(notes).not.toContain('gpai-open-source-exempt');
    // Not GPAI: the model alone is out of scope.
    const plain = evaluate(model, { object: 'model', reach: ['eu-market'], exclusions: ['none'], activity: ['develop'], gpai: 'no' });
    expect(plain.scope.status).toBe('out-of-scope');
  });

  test('the open-source exclusion does not cover a transparency case', () => {
    const chatbot = evaluate(model, { ...CV_SCREEN, annex3: ['none'], exclusions: ['open-source'], art50: ['interacts'] });
    expect(chatbot.scope.status).toBe('in-scope');
    expect(chatbot.notes.map((n: { id: string }) => n.id)).toContain('open-source-not-excluded');
    const quiet = evaluate(model, { ...CV_SCREEN, annex3: ['none'], exclusions: ['open-source'] });
    expect(quiet.scope.status).toBe('out-of-scope');
  });

  test('the record validates against its schema, and so does the published example', () => {
    const { record } = recordFor(CV_SCREEN);
    expect(record.$schema).toBe(RECORD_SCHEMA);
    expect(record.kind).toBe(RECORD_KIND);
    expect(validate(schema, record)).toEqual([]);
    expect(record.outcome.high_risk_screen).toEqual({
      annex_i: 'no',
      annex_iii_areas: ['employment'],
      art_6_3_conditions: ['preparatory-task'],
      profiling: true,
      high_risk: true,
    });
    const example = JSON.parse(readFileSync(EXAMPLE_FILE, 'utf8'));
    expect(validate(schema, example)).toEqual([]);
    expect(example.question_set.version).toBe(questionSet.version);
    // The example is what the engine produces for its own answers.
    const again = evaluate(model, recordToState(model, example).answers, { decidedAt: example.decided_at });
    expect(again.classes.map((c: { id: string }) => c.id)).toEqual(
      example.outcome.classes.map((c: { class: string }) => c.class),
    );
    // Out of scope also validates.
    expect(validate(schema, recordFor({ ...CV_SCREEN, reach: ['none'] }).record)).toEqual([]);
  });

  test('YAML is block style with every string quoted', () => {
    const { record } = recordFor(CV_SCREEN);
    const yaml = toYaml(record);
    const lines = yaml.trimEnd().split('\n');
    expect(lines[0]).toBe(`$schema: "${RECORD_SCHEMA}"`);
    expect(lines).toContain(`kind: "${RECORD_KIND}"`);
    expect(lines).toContain('version: 1');
    expect(lines).toContain('    profiling: true');
    for (const line of lines) {
      // key: scalar | key: | - scalar | - key: scalar ; scalars are quoted, numbers, booleans, null or [] {}
      expect(line, line).toMatch(
        /^( *)(- )?(("[^"\\]*(\\.[^"\\]*)*"|[A-Za-z_$][A-Za-z0-9_$-]*):( .+)?|"[^"\\]*(\\.[^"\\]*)*"|\[\]|\{\})$/,
      );
    }
    expect(yaml).not.toContain(EM_DASH);
  });

  test('link state round-trips, and the planner fragment carries roles and classes', () => {
    const { evaluation, meta } = recordFor(CV_SCREEN, { note: 'Counsel, see ticket 42.' });
    const params = stateToParams(model, evaluation.answers, meta);
    const decoded = decodeFragment(`#${encodeFragment(params)}`);
    const state = paramsToState(model, decoded);
    expect(state?.answers).toEqual(evaluation.answers);
    expect(state?.meta.name).toBe('CV screening assistant');
    expect(state?.meta.note).toBe('Counsel, see ticket 42.');
    expect(paramsToState(model, decodeFragment('#tri-how'))).toBeNull();
    expect(plannerParams(model, evaluation, '2026-09-24')).toEqual({
      v: 1,
      r: 'pr.de',
      c: 'h3',
      d: '2026-09-24',
      from: 'ai-act-triage',
      qs: questionSet.version,
    });
    // A systemic-risk GPAI provider hands off the planner's systemic role code.
    const gpai = evaluate(model, {
      object: 'model',
      reach: ['eu-market'],
      exclusions: ['none'],
      activity: ['develop'],
      gpai: 'yes',
      'gpai-compute': 'designated',
      'gpai-origin': 'trained',
      'gpai-open': 'no',
    });
    expect(plannerParams(model, gpai, '2026-09-24')?.r).toBe('gs');
  });

  test('re-opening checks kind, version and question set; another version warns', () => {
    const { record } = recordFor(CV_SCREEN);
    const back = recordToState(model, JSON.parse(JSON.stringify(record)));
    expect(back.warnings).toEqual([]);
    expect(evaluate(model, back.answers).classes.map((c: { id: string }) => c.id)).toEqual([
      'high-risk-annex-iii',
    ]);
    expect(() => recordToState(model, { ...record, kind: 'aige.maturity-profile' })).toThrow(/kind/);
    expect(() => recordToState(model, { ...record, version: 2 })).toThrow(/version 2/);
    const older = recordToState(model, {
      ...record,
      question_set: { ...record.question_set, version: '0.9.0' },
      answers: [...record.answers, { question: 'retired-question', article: 'Art. 1', values: ['x'] }],
    });
    expect(older.warnings.join(' ')).toContain('question set 0.9.0');
    expect(older.warnings.join(' ')).toContain('retired-question');
  });
});

// ---- 3. Page ------------------------------------------------------------------------------

/** Answer by clicking each option's label (the row is the target). */
async function answer(page: Page, raw: Record<string, string | string[]>) {
  for (const [id, value] of Object.entries(raw)) {
    for (const v of Array.isArray(value) ? value : [value]) {
      await page.locator(`label[for="tri-${id}-${v}"]`).click();
    }
  }
}

async function fillSystem(page: Page) {
  await page.locator('#tri-name').fill('CV screening assistant');
  await page.locator('#tri-registry-id').fill('cv-screen-02');
  await page.locator('#tri-purpose').fill('Rank job applications for recruiters, who decide.');
}

async function saved(download: Download): Promise<Buffer> {
  const path = await download.path();
  expect(path).toBeTruthy();
  return readFileSync(path as string);
}

const plannerLive = tools.find((t) => t.id === 'obligations-planner')?.status === 'live';

test.describe('/toolkit and the triage page head', () => {
  test('the index links the triage', async ({ page }) => {
    await page.goto('/toolkit');
    await expect(page.locator('[data-tool-card="ai-act-triage"] a')).toHaveAttribute('href', TOOL);
  });

  test('head metadata and a WebApplication node', async ({ page }) => {
    await page.goto(TOOL);
    const title = (await page.locator('head > title').textContent()) ?? '';
    expect(title.length).toBeLessThanOrEqual(70);
    const description =
      (await page.locator('meta[name="description"]').getAttribute('content')) ?? '';
    expect(description.length).toBeGreaterThanOrEqual(50);
    expect(description.length).toBeLessThanOrEqual(160);
    await expect(page.locator('link[rel="canonical"]')).toHaveAttribute(
      'href',
      `https://aigovernanceengineer.com${TOOL}`,
    );
    const raw = await page.locator('script[type="application/ld+json"]').first().textContent();
    const types = (JSON.parse(raw ?? '{}')['@graph'] as { '@type': string }[]).map((n) => n['@type']);
    expect(types).toContain('WebApplication');
    expect(types).toContain('BreadcrumbList');
  });
});

test.describe('triage without JavaScript', () => {
  test.use({ javaScriptEnabled: false });

  test('works as a worksheet: every question, what each answer means, the rules', async ({ page }) => {
    await page.goto(TOOL);
    await expect(page.locator('#tool-notice')).toHaveText(NOTICE);
    await expect(page.locator('[data-tool-nojs]')).toBeVisible();
    await expect(page.locator('[data-tri-q]')).toHaveCount(questions.length);
    await expect(page.locator('[data-tri-q="profiling"]')).toBeVisible();
    await expect(page.locator('details.tri-means')).toHaveCount(questions.length);
    await expect(page.locator('#tri-rules-classes')).toBeVisible();
    await expect(page.locator('#tri-handoff')).toBeVisible();
    await expect(page.locator('[data-tri-result]')).toBeHidden();
    await expect(page.getByRole('button', { name: 'Show the triage', exact: true })).toBeHidden();
    await expect(page.locator(`a[href="${questionSet.consolidatedText}#art_6"]`).first()).toBeVisible();
  });
});

test.describe('triage', () => {
  test('asks only what applies, validates, then shows the outcome with its reasons', async ({ page }) => {
    await page.goto(TOOL);
    await expect(page.locator('[data-tool-nojs]')).toBeHidden();
    // The graph: before "object" is answered, the system and model questions are skipped.
    await expect(page.locator('[data-tri-q="inference"]')).toBeHidden();
    await expect(page.locator('[data-tri-step="gpai"]')).toBeHidden();

    await page.getByRole('button', { name: 'Show the triage', exact: true }).click();
    const summary = page.locator('[data-tri-errors]');
    await expect(summary).toBeVisible();
    await expect(summary).toBeFocused();
    await expect(summary).toContainText('Name the system');
    await expect(page.locator('#tri-q-object-error')).toBeVisible();

    await fillSystem(page);
    await answer(page, { object: 'system' });
    await expect(page.locator('[data-tri-q="inference"]')).toBeVisible();
    await expect(page.locator('[data-tri-q="art6-3"]')).toBeHidden();
    await answer(page, CV_SCREEN as Record<string, string | string[]>);
    await expect(page.locator('[data-tri-q="profiling"]')).toBeVisible();
    await expect(page.locator('[data-tri-step="gpai"]')).toBeHidden();
    await page.getByRole('button', { name: 'Show the triage', exact: true }).click();

    const result = page.locator('[data-tri-result]');
    await expect(result).toBeVisible();
    await expect(page.locator('#tri-result-title')).toBeFocused();
    await expect(result.locator('[data-tri-scope-status]')).toHaveText('In scope (indicative)');
    await expect(result.locator('[data-tri-roles] > li')).toHaveCount(2);
    await expect(result.locator('[data-tri-roles]')).toContainText('Provider');
    await expect(result.locator('[data-tri-roles]')).toContainText('Deployer');
    const hr = result.locator('[data-class="high-risk-annex-iii"]');
    await expect(hr).toHaveAttribute('data-state', 'given');
    await expect(hr).toContainText('Applies from 2027-12-02');
    await expect(hr).toContainText('the override beats all four');
    await expect(result.locator('[data-class="prohibited"]')).toHaveAttribute('data-state', 'not');
    await expect(result.locator('[data-tri-classes] > li')).toHaveCount(classOrder.length);
    await expect(result.locator('[data-tri-answers] tr')).toHaveCount(13);
    await expect(result.locator('[data-tri-notes]')).toContainText('FRIA');
    await expect(result).not.toContainText(/compliant/i);

    // Hand-off: a link only when the planner is live, the register otherwise.
    if (plannerLive) {
      const link = result.locator('[data-tri-planner]');
      await expect(link).toHaveAttribute('href', /^\/toolkit\/obligations-planner#v=1&r=pr\.de&c=h3&d=/);
    } else {
      await expect(result.locator('a[href^="/toolkit/obligations-planner"]')).toHaveCount(0);
      await expect(result.locator('[data-tri-handoff] a[href="/obligations"]')).toBeVisible();
    }

    // Suggested re-review triggers are ticked; state is in the link; edits update live.
    await expect(page.locator('#tri-trigger-intended-purpose-change')).toBeChecked();
    expect(new URL(page.url()).hash).toContain('annex3=employment');
    await page.locator('label[for="tri-profiling-no"]').click();
    await expect(hr).toHaveAttribute('data-state', 'not');
    await expect(result.locator('[data-tri-notes]')).toContainText('Filtered out');
  });

  test('a copied link reproduces the result; a plain anchor is not state', async ({ page }) => {
    const { evaluation, meta } = recordFor(CV_SCREEN);
    const fragment = encodeFragment(stateToParams(model, evaluation.answers, meta));
    await page.goto(`${TOOL}#${fragment}`);
    await expect(page.locator('[data-tri-result]')).toBeVisible();
    await expect(page.locator('#tri-profiling-yes')).toBeChecked();
    await expect(page.locator('#tri-name')).toHaveValue('CV screening assistant');
    await expect(page.locator('[data-class="high-risk-annex-iii"]')).toHaveAttribute('data-state', 'given');

    await page.goto('/toolkit');
    await page.goto(`${TOOL}#tri-how`);
    await expect(page.locator('[data-tri-result]')).toBeHidden();
  });

  test('exports need a reviewer, then give JSON, YAML and Markdown; the JSON re-opens', async ({ page }) => {
    const { evaluation, meta } = recordFor(CV_SCREEN, { reviewer: '' });
    await page.goto(`${TOOL}#${encodeFragment(stateToParams(model, evaluation.answers, meta))}`);
    await expect(page.locator('[data-tri-result]')).toBeVisible();

    await page.getByRole('button', { name: 'Download record (JSON)', exact: true }).click();
    await expect(page.locator('#tri-reviewer-error')).toBeVisible();
    await expect(page.locator('#tri-reviewer')).toBeFocused();
    await page.locator('#tri-reviewer').fill('ai-governance');

    const [json] = await Promise.all([
      page.waitForEvent('download'),
      page.getByRole('button', { name: 'Download record (JSON)', exact: true }).click(),
    ]);
    expect(json.suggestedFilename()).toMatch(/^classification-decision-cv-screen-02-\d{4}-\d{2}-\d{2}\.json$/);
    const body = await saved(json);
    const record = JSON.parse(body.toString('utf8'));
    expect(validate(schema, record)).toEqual([]);
    expect(record.reviewer).toBe('ai-governance');
    expect(record.notice).toBe(NOTICE);
    expect(record.outcome.classes.map((c: { class: string }) => c.class)).toEqual(['high-risk-annex-iii']);

    const [yaml] = await Promise.all([
      page.waitForEvent('download'),
      page.getByRole('button', { name: 'Download record (YAML)', exact: true }).click(),
    ]);
    const yamlText = (await saved(yaml)).toString('utf8');
    expect(yamlText).toContain(`kind: "${RECORD_KIND}"`);
    expect(yamlText).toContain('reviewer: "ai-governance"');

    const [md] = await Promise.all([
      page.waitForEvent('download'),
      page.getByRole('button', { name: 'Download report (Markdown)', exact: true }).click(),
    ]);
    const report = (await saved(md)).toString('utf8');
    expect(report).toContain('# Classification decision: CV screening assistant');
    expect(report).toContain('> Indicative, not legal advice and not a conformity claim.');
    expect(report).not.toContain(EM_DASH);

    // Re-open: clear the form, import the JSON, get the same outcome back.
    await page.getByRole('button', { name: 'Clear answers', exact: true }).click();
    await expect(page.locator('[data-tri-result]')).toBeHidden();
    await page.locator('#tri-import').setInputFiles({
      name: 'record.json',
      mimeType: 'application/json',
      buffer: body,
    });
    await expect(page.locator('[data-tri-result]')).toBeVisible();
    await expect(page.locator('[data-class="high-risk-annex-iii"]')).toHaveAttribute('data-state', 'given');
    await expect(page.locator('#tri-reviewer')).toHaveValue('ai-governance');

    // A file of another kind is refused next to the control.
    await page.locator('#tri-import').setInputFiles({
      name: 'bad.json',
      mimeType: 'application/json',
      buffer: Buffer.from(JSON.stringify({ kind: 'aige.maturity-profile', version: 1 })),
    });
    await expect(page.locator('#tri-import-error')).toBeVisible();
    await expect(page.locator('#tri-import')).toHaveAttribute('aria-invalid', 'true');
  });

  test('sends nothing the reader enters', async ({ page }) => {
    const requests: { url: string; method: string }[] = [];
    await page.goto(TOOL);
    await page.waitForLoadState('networkidle');
    page.on('request', (request) => requests.push({ url: request.url(), method: request.method() }));

    await page.locator('#tri-name').fill('Secret platform');
    await page.locator('#tri-purpose').fill('Confidential purpose');
    await page.locator('#tri-reviewer').fill('ai-governance');
    await answer(page, CV_SCREEN as Record<string, string | string[]>);
    await page.getByRole('button', { name: 'Show the triage', exact: true }).click();
    await expect(page.locator('[data-tri-result]')).toBeVisible();
    await Promise.all([
      page.waitForEvent('download'),
      page.getByRole('button', { name: 'Download record (JSON)', exact: true }).click(),
    ]);

    const origin = new URL(page.url()).origin;
    for (const request of requests) {
      if (/^(blob|data):/.test(request.url)) continue;
      expect(request.method, request.url).toBe('GET');
      expect(new URL(request.url).origin, request.url).toBe(origin);
      expect(request.url).not.toContain('Secret');
      expect(request.url).not.toContain('Confidential');
    }
  });

  test('prints the result without chrome or controls', async ({ page }) => {
    const { evaluation, meta } = recordFor(CV_SCREEN);
    await page.goto(`${TOOL}#${encodeFragment(stateToParams(model, evaluation.answers, meta))}`);
    await expect(page.locator('[data-tri-result]')).toBeVisible();
    await page.emulateMedia({ media: 'print' });
    await expect(page.locator('.site-header')).toBeHidden();
    await expect(page.locator('[data-tri-result] .tool-actions')).toBeHidden();
    await expect(page.locator('[data-tri-form]')).toBeHidden();
    await expect(page.locator('#tool-notice')).toBeVisible();
    await expect(page.locator('[data-tri-result]')).toBeVisible();
  });

  test('no horizontal scroll at 390px', async ({ page }) => {
    await page.setViewportSize({ width: 390, height: 844 });
    const { evaluation, meta } = recordFor(CV_SCREEN);
    await page.goto(`${TOOL}#${encodeFragment(stateToParams(model, evaluation.answers, meta))}`);
    await expect(page.locator('[data-tri-result]')).toBeVisible();
    const overflow = await page.evaluate(
      () => document.documentElement.scrollWidth - document.documentElement.clientWidth,
    );
    expect(overflow).toBeLessThanOrEqual(0);
  });
});
