// incident-notes.spec.ts: the incident notes on /cases (OpenSpec change
// open-reference-project, block orp-incidents). Some cases carry an optional
// engineering note (system boundary, control assumptions, controls by moment,
// evidence requirements, related open controls, open questions); /cases
// explains how a post-mortem becomes a control requirement and an evidence
// requirement. Data checks read src/data; dist checks read the built pages
// (skipped when dist is missing).
import { test, expect } from '@playwright/test';
import { existsSync, readFileSync } from 'node:fs';
import { join } from 'node:path';
import { cases, caseNoteProblems, hasIncidentNote, type IncidentCase } from '../src/data/cases';
import { controlById, controlHref } from '../src/data/controls';
import { patterns } from '../src/data/patterns';
import { nav } from '../src/data/nav';
import { citedNumbers } from '../src/lib/sources';

const DIST = 'dist';
const read = (...parts: string[]): string => readFileSync(join(DIST, ...parts), 'utf8');
const hasDist = existsSync(join(DIST, 'cases.html'));

const NOTE_SECTIONS: readonly { id: string; present: (c: IncidentCase) => boolean }[] = [
  { id: 'system-boundary', present: (c) => c.systemBoundary !== undefined },
  { id: 'control-assumptions', present: (c) => c.controlAssumptions !== undefined },
  {
    id: 'controls-by-moment',
    present: (c) =>
      c.preventiveControls !== undefined ||
      c.detectiveControls !== undefined ||
      c.responsiveControls !== undefined,
  },
  { id: 'evidence-requirements', present: (c) => c.evidenceRequirements !== undefined },
  { id: 'related-controls', present: (c) => c.relatedControls !== undefined },
  { id: 'open-questions', present: (c) => c.openQuestions !== undefined },
];

const NOTE_KEYS = [
  'systemBoundary',
  'controlAssumptions',
  'preventiveControls',
  'detectiveControls',
  'responsiveControls',
  'evidenceRequirements',
  'relatedControls',
  'openQuestions',
] as const;

const noted = cases.filter(hasIncidentNote);

const noteProse = (c: IncidentCase): string[] => [
  ...(c.systemBoundary ? [c.systemBoundary] : []),
  ...(c.controlAssumptions ?? []),
  ...(c.evidenceRequirements ?? []),
  ...(c.openQuestions ?? []),
];

test.describe('incident notes: data', () => {
  test('caseNoteProblems() is empty', () => {
    expect(caseNoteProblems()).toEqual([]);
  });

  test('at least two cases carry a system boundary', () => {
    expect(cases.filter((c) => c.systemBoundary !== undefined).length).toBeGreaterThanOrEqual(2);
  });

  test('every related control and every pattern named by moment resolves', () => {
    const patternIds = new Set(patterns.map((p) => p.id));
    for (const c of noted) {
      for (const id of c.relatedControls ?? []) {
        expect(controlById(id), `${c.id}: ${id}`).toBeTruthy();
      }
      const refs = [
        ...(c.preventiveControls ?? []),
        ...(c.detectiveControls ?? []),
        ...(c.responsiveControls ?? []),
      ];
      for (const ref of refs) {
        if (ref.patternId) expect(patternIds.has(ref.patternId), `${c.id}: ${ref.patternId}`).toBe(true);
      }
    }
  });

  test('[n] markers in a note point into the case\'s own sources', () => {
    for (const c of noted) {
      for (const n of citedNumbers(noteProse(c))) {
        expect(n, `${c.id} cites [${n}]`).toBeGreaterThanOrEqual(1);
        expect(n, `${c.id} cites [${n}]`).toBeLessThanOrEqual(c.sources.length);
      }
    }
  });

  test('no em dash in any note', () => {
    for (const c of noted) {
      const text = JSON.stringify(NOTE_KEYS.map((key) => c[key] ?? null));
      expect(text.includes(String.fromCharCode(0x2014)), c.id).toBe(false);
    }
  });
});

test.describe('incident notes: dist', () => {
  test.skip(!hasDist, 'dist not built');

  test('noted cases render their sections and an "On this page" list; the others do not', () => {
    for (const c of cases) {
      const page = read('cases', `${c.id}.html`);
      const note = hasIncidentNote(c);
      expect(page.includes('class="cs-toc"'), `${c.id} cs-toc`).toBe(note);
      if (note) expect(page).toContain('aria-label="On this page"');
      for (const section of NOTE_SECTIONS) {
        expect(page.includes(`id="${section.id}"`), `${c.id} #${section.id}`).toBe(note && section.present(c));
      }
      // Every case page ends with a call to propose a failure mode.
      expect(page, c.id).toContain('template=failure-mode-proposal.yml');
    }
  });

  test('related controls link their anchor on a built profile page', () => {
    for (const c of noted) {
      const page = read('cases', `${c.id}.html`);
      for (const id of c.relatedControls ?? []) {
        const href = controlHref(id);
        expect(page, `${c.id} links ${href}`).toContain(`href="${href}"`);
        const [path, anchor] = href.split('#');
        const target = read(`${path.slice(1)}.html`);
        expect(target, `${href} resolves`).toContain(`id="${anchor}"`);
      }
    }
  });

  test('the Markdown twin carries "## System boundary" only where the case has one', () => {
    for (const c of cases) {
      const twin = read('cases', `${c.id}.md`);
      expect(twin.includes('\n## System boundary\n'), c.id).toBe(c.systemBoundary !== undefined);
    }
  });

  test('/api/v1/cases.json carries every note key, null where not written', () => {
    const json = JSON.parse(read('api', 'v1', 'cases.json'));
    const rows = json.data?.cases ?? json.cases;
    expect(Array.isArray(rows)).toBe(true);
    expect(rows).toHaveLength(cases.length);
    for (const row of rows) {
      const c = cases.find((entry) => entry.id === row.id)!;
      for (const key of NOTE_KEYS) {
        expect(key in row, `${row.id}.${key}`).toBe(true);
        expect(row[key] === null, `${row.id}.${key} null`).toBe(c[key] === undefined);
      }
    }
  });

  test('/cases explains the path from incident to control in five linked steps', () => {
    const page = read('cases.html');
    const start = page.indexOf('id="from-incident-to-control"');
    expect(start).toBeGreaterThan(-1);
    const section = page.slice(start, page.indexOf('</section>', start));
    expect(section.match(/class="flow-step"/g) ?? []).toHaveLength(5);
    for (const href of [
      '/bok/incidents#the-incident-record',
      '/bok/incidents#ai-specific-failure-modes',
      '/patterns/incident-pipeline',
      '/controls',
      '/resources/templates#schema-incident-record',
      '/toolkit/incident-clock',
      '/bok/incidents#capa-from-incident-to-risk-register-and-eval-suite',
    ]) {
      expect(section, href).toContain(`href="${href}"`);
    }
    expect(section).toContain('template=failure-mode-proposal.yml');
    expect(page).not.toContain('orp-stub');
  });

  test('the anchors the section links exist in the built pages', () => {
    const incidents = read('bok', 'incidents.html');
    for (const anchor of ['the-incident-record', 'ai-specific-failure-modes', 'capa-from-incident-to-risk-register-and-eval-suite']) {
      expect(incidents, anchor).toContain(`id="${anchor}"`);
    }
    expect(read('resources', 'templates.html')).toContain('id="schema-incident-record"');
  });

  test('the navigation calls /cases "Incidents" and the footer never says "Cases"', () => {
    const reference = nav.find((g) => g.id === 'reference')!;
    expect(reference.items.find((i) => i.href === '/cases')?.label).toBe('Incidents');
    const page = read('cases.html');
    const footer = page.slice(page.lastIndexOf('<footer'));
    expect(footer).not.toContain('>Cases<');
  });
});
