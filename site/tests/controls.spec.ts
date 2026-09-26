// controls.spec.ts: the Evaluation Environment Control Profile content
// (src/data/controls/evaluation-environment.ts), the controls dataset of the
// open-data API (/api/v1/controls.json and /api/v1/controls/<id>.json) and the
// control-observation record (public/schemas/control-observation.v1.json, its
// examples). The data checks are pure Node; the output checks read the built
// files in dist (no browser) and skip when there is no build. The profile page
// itself is covered by tests/controls-pages.spec.ts; here only the anchors the
// page guarantees are checked. Block orp-controls-content (open-reference-project).
import { test, expect } from '@playwright/test';
import { existsSync, readFileSync } from 'node:fs';
import { join } from 'node:path';
import { validateAgainst } from './helpers/schema-library';
import {
  controls,
  profiles,
  controlProblems,
  controlsIn,
  controlSlug,
  controlAnchor,
} from '../src/data/controls';
import { observationExamples } from '../src/data/controls/evaluation-environment';

const EM_DASH = String.fromCharCode(0x2014);
const API_DIR = join('dist', 'api', 'v1');
const DATASET = join(API_DIR, 'controls.json');
const PAGE = join('dist', 'controls', 'evaluation-environment.html');
const SCHEMA_ID = 'https://aigovernanceengineer.com/schemas/control-observation.v1.json';
const SPECIFIED = ['AIGE-CTL-EVAL-002', 'AIGE-CTL-EVAL-003', 'AIGE-CTL-EVAL-006'];

type Json = Record<string, unknown>;
const readJson = (file: string): Json => JSON.parse(readFileSync(file, 'utf8')) as Json;
const ids = (prefix: string, n: number) =>
  Array.from({ length: n }, (_, i) => `AIGE-CTL-${prefix}-${String(i + 1).padStart(3, '0')}`);
const evalControls = () => controlsIn('evaluation-environment');
/** The public file behind a site path. */
const publicFile = (path: string) => join('public', path.replace(/^\/+/, ''));

test.describe('open control profiles: data', () => {
  test('every reference and rule resolves', () => {
    expect(controlProblems()).toEqual([]);
  });

  test('ids run in order in both profiles, and titles are unique', () => {
    expect(evalControls().map((c) => c.id)).toEqual(ids('EVAL', 9));
    expect(controlsIn('agent-runtime').map((c) => c.id)).toEqual(ids('AGENT', 31));
    const titles = controls.map((c) => c.title.toLowerCase());
    expect(new Set(titles).size).toBe(titles.length);
  });

  test('exactly 002, 003 and 006 are specified', () => {
    expect(controls.filter((c) => c.depth === 'specified').map((c) => c.id)).toEqual(SPECIFIED);
  });

  test('a specified control is complete: failure modes, verification, evidence, notes, sources, observation', () => {
    for (const c of controls.filter((row) => row.depth === 'specified')) {
      expect(c.failureModes.length, c.id).toBeGreaterThanOrEqual(3);
      expect(c.failureModes.length, c.id).toBeLessThanOrEqual(4);
      expect(c.verification.length, c.id).toBeGreaterThanOrEqual(2);
      expect(c.verification.length, c.id).toBeLessThanOrEqual(4);
      expect(new Set(c.verification.map((v) => v.kind)).size, c.id).toBeGreaterThanOrEqual(2);
      expect(c.evidence.length, c.id).toBeGreaterThan(0);
      expect(c.evidence.some((e) => e.schemaId === 'control-observation'), c.id).toBe(true);
      expect(c.implementationNotes.length, c.id).toBeGreaterThanOrEqual(3);
      expect(c.implementationNotes.length, c.id).toBeLessThanOrEqual(5);
      expect(c.openQuestions.length, c.id).toBeGreaterThanOrEqual(1);
      expect(c.openQuestions.length, c.id).toBeLessThanOrEqual(2);
      expect(c.references.length, c.id).toBeGreaterThan(0);
      expect(c.observation, c.id).toBeDefined();
      expect(c.failureResponse.text, c.id).not.toContain('To be specified');
      expect(c.mappings.nistAiRmf.length, c.id).toBeGreaterThan(0);
    }
    const effect = (id: string) => controls.find((c) => c.id === id)!.failureResponse.effect;
    expect([effect('AIGE-CTL-EVAL-002'), effect('AIGE-CTL-EVAL-003'), effect('AIGE-CTL-EVAL-006')]).toEqual([
      'deny',
      'deny',
      'alert',
    ]);
  });

  test('AIUC-1 ids are read from the public index: never a retired requirement, and the index is cited', () => {
    // Read on standard.aiuc-1.com on 2026-09-26: A001 to F002, E007 and E014 marked retired.
    const RETIRED = ['E007', 'E014'];
    const INDEX = 'https://standard.aiuc-1.com/llms.txt';
    const mapped = controls.filter((c) => (c.mappings.aiuc1 ?? []).length > 0);
    expect(mapped.length).toBeGreaterThan(0);
    for (const c of controls) {
      const ids = c.mappings.aiuc1 ?? [];
      for (const id of ids) {
        expect(id, c.id).toMatch(/^[A-F]\d{3}$/);
        expect(RETIRED, c.id).not.toContain(id);
      }
      expect(new Set(ids).size, c.id).toBe(ids.length);
      expect(c.references.some((s) => s.url === INDEX), c.id).toBe(ids.length > 0);
    }
    const index = controls.flatMap((c) => c.references).find((s) => s.url === INDEX);
    expect(index?.gloss ?? '').toContain('not affiliated with');
  });

  test('stubs and derived controls keep explicit open questions and stay open for review', () => {
    for (const c of controls.filter((row) => row.depth !== 'specified')) {
      expect(c.openQuestions.length, c.id).toBeGreaterThan(0);
      expect(c.reviewerStatus, c.id).toBe('open');
    }
    for (const c of evalControls().filter((row) => row.depth === 'stub')) {
      expect(c.openQuestions.some((q) => q.includes('requires technical review')), c.id).toBe(true);
      expect(c.references.length, c.id).toBeGreaterThan(0);
      expect(c.observation, c.id).toBeUndefined();
    }
  });

  test('no reviewer is named, so every profile and control stays open', () => {
    for (const p of profiles) {
      expect(p.reviewers).toEqual([]);
      expect(p.reviewerStatus).toBe('open');
    }
    for (const c of controls) expect(c.reviewerStatus, c.id).toBe('open');
  });

  test('house language: no em dash, no certification or endorsement claims', () => {
    const text = JSON.stringify({ profiles, controls, observationExamples });
    expect(text.includes(EM_DASH)).toBe(false);
    const own = JSON.stringify(
      evalControls().map((c) => ({ ...c, references: [] })),
    );
    expect(own).not.toMatch(/\bcertified\b|\bendorse/i);
  });

  test('every reference is an https URL with a verification tag', () => {
    for (const c of evalControls()) {
      for (const src of c.references) {
        expect(src.url, `${c.id} ${src.title}`).toMatch(/^https:\/\//);
        expect(['primary', 'secondary', 'reported']).toContain(src.verified);
      }
    }
  });
});

test.describe('control-observation record', () => {
  test('the library example validates and names a control that exists', () => {
    const doc = readJson(join('public', 'schemas', 'examples', 'control-observation.example.json'));
    expect(doc.$schema).toBe(SCHEMA_ID);
    expect(validateAgainst('control-observation', doc)).toEqual([]);
    expect(controls.map((c) => c.id)).toContain(doc.control_id);
  });

  test('one pass and one fail example per specified control, each valid', () => {
    for (const id of SPECIFIED) {
      expect(
        observationExamples.filter((e) => e.controlId === id).map((e) => e.status).sort(),
        id,
      ).toEqual(['fail', 'pass']);
    }
    for (const example of observationExamples) {
      const file = publicFile(example.path);
      expect(existsSync(file), file).toBe(true);
      const doc = readJson(file);
      expect(doc.$schema, file).toBe(SCHEMA_ID);
      expect(validateAgainst('control-observation', doc), file).toEqual([]);
      expect(doc.control_id, file).toBe(example.controlId);
      expect(doc.status, file).toBe(example.status);
      const row = controls.find((c) => c.id === example.controlId)!;
      expect(doc.subject_kind, file).toBe(row.observation!.subjectKind);
      expect(readFileSync(file, 'utf8').includes(EM_DASH), file).toBe(false);
    }
  });

  test('a record without evidence or with a malformed control id is rejected', () => {
    const doc = readJson(join('public', 'schemas', 'examples', 'control-observation.example.json'));
    expect(validateAgainst('control-observation', { ...doc, evidence: [] }).length).toBeGreaterThan(0);
    expect(validateAgainst('control-observation', { ...doc, control_id: 'EVAL-2' }).length).toBeGreaterThan(0);
    expect(validateAgainst('control-observation', { ...doc, status: 'passed' }).length).toBeGreaterThan(0);
  });
});

test.describe('open control profiles: built outputs', () => {
  test.skip(!existsSync(DATASET), 'run npm run build first');

  test('the dataset lists every control in order, with its profiles and the notice', () => {
    const api = readJson(DATASET);
    expect(String(api.notice)).toContain('not a claim of conformity');
    expect((api.controls as Json[]).map((r) => r.id)).toEqual(controls.map((c) => c.id));
    expect((api.profiles as Json[]).map((p) => p.slug)).toEqual(profiles.map((p) => p.slug));
    for (const p of api.profiles as Json[]) expect(p.reviewers).toEqual([]);
  });

  test('one file per control, identical to its row in the dataset', () => {
    const rows = readJson(DATASET).controls as Json[];
    for (const row of rows) {
      const file = join(API_DIR, 'controls', `${String(row.id).toLowerCase()}.json`);
      expect(existsSync(file), file).toBe(true);
      const doc = readJson(file);
      expect(String(doc.notice), file).toContain('not a claim of conformity');
      expect(doc.control, file).toEqual(row);
    }
  });

  test('specified controls link their example observations, and the files are served', () => {
    const rows = readJson(DATASET).controls as Json[];
    for (const row of rows) {
      const examples = row.examples as Json[];
      if (SPECIFIED.includes(String(row.id))) {
        expect(examples.map((e) => e.status).sort(), String(row.id)).toEqual(['fail', 'pass']);
        expect(row.observation, String(row.id)).not.toBeNull();
      } else {
        expect(examples, String(row.id)).toEqual([]);
      }
      for (const e of examples) {
        const path = new URL(String(e.url)).pathname;
        expect(existsSync(join('dist', path)), path).toBe(true);
      }
    }
  });

  test('the catalogue names the item template and the schemas are published', () => {
    const index = readJson(join(API_DIR, 'index.json'));
    expect(((index.api as Json).itemTemplates as Json).control).toBe(
      'https://aigovernanceengineer.com/api/v1/controls/{id}.json',
    );
    expect(readJson(join(API_DIR, 'schemas', 'control.json')).$id).toBe(
      'https://aigovernanceengineer.com/api/v1/schemas/control.json',
    );
    expect(readJson(join('dist', 'schemas', 'control-observation.v1.json')).$id).toBe(SCHEMA_ID);
  });

  test('the profile page carries an anchor per control', () => {
    test.skip(!existsSync(PAGE), 'no profile page in this build');
    const html = readFileSync(PAGE, 'utf8');
    for (const c of evalControls()) {
      expect(html, c.id).toContain(`id="${controlAnchor(c)}"`);
      expect(controlSlug(c)).toBe(controlAnchor(c));
    }
  });
});
