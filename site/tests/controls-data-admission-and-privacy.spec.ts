// controls-data-admission-and-privacy.spec.ts: the Data Admission and Privacy
// Control Profile v0.1 (src/data/controls/data-admission-and-privacy.ts). Pure
// Node over the data, plus reads of dist/ for the pattern pages and the profile
// page anchors (run after the build). Block orp2-data (open-reference-project-2,
// wave 1).
import { test, expect } from '@playwright/test';
import { existsSync, readFileSync } from 'node:fs';
import { join } from 'node:path';
import GithubSlugger from 'github-slugger';
import { controlProblems, controlsIn, profileSources } from '../src/data/controls';
import { dataAdmissionAndPrivacyProfile, observationExamples } from '../src/data/controls/data-admission-and-privacy';

const EM_DASH = String.fromCharCode(0x2014);
const SLUG = 'data-admission-and-privacy';
const rows = controlsIn(SLUG);

/** rehype-slug ids of every heading in a BoK chapter file (github-slugger, as the site renders them). */
function chapterAnchors(file: string): Set<string> {
  const md = readFileSync(join('..', 'bok', file), 'utf8').replace(/\r/g, '');
  const slugger = new GithubSlugger();
  const out = new Set<string>();
  let fenced = false;
  for (const line of md.split('\n')) {
    if (line.startsWith('```')) fenced = !fenced;
    const m = !fenced && /^(#{1,6})\s+(.+?)\s*$/.exec(line);
    if (m) out.add(slugger.slug(m[2].replace(/`/g, '')));
  }
  return out;
}

test.describe('data admission and privacy profile data', () => {
  test('8 to 12 controls, ids contiguous from 001 in order', () => {
    expect(rows.length).toBeGreaterThanOrEqual(8);
    expect(rows.length).toBeLessThanOrEqual(12);
    expect(rows.map((c) => c.id)).toEqual(
      rows.map((_, i) => `AIGE-CTL-DATA-${String(i + 1).padStart(3, '0')}`),
    );
  });

  test('every control is a derived draft, open for review, with evidence and an open question', () => {
    for (const row of rows) {
      expect(row.depth, row.id).toBe('derived');
      expect(row.status, row.id).toBe('draft');
      expect(row.reviewerStatus, row.id).toBe('open');
      expect(row.seeds, row.id).toEqual([]);
      expect(row.evidence.length, row.id).toBeGreaterThan(0);
      expect(row.failureModes.length, row.id).toBeGreaterThan(0);
      expect(row.openQuestions.length, row.id).toBeGreaterThan(0);
      expect(row.observation, row.id).toBeUndefined();
    }
    // Every example observation belongs to a specified control of this profile
    // (none while all its controls are derived).
    for (const e of observationExamples) {
      expect(rows.find((c) => c.id === e.controlId)?.depth, e.path).toBe('specified');
    }
  });

  test('every control derives from a pattern page or a published record schema that exists', () => {
    for (const row of rows) {
      const sources = (row.derivedFrom ?? []).filter((s) => s.kind === 'pattern' || s.kind === 'schema');
      expect(sources.length, row.id).toBeGreaterThan(0);
      for (const src of sources) {
        const file =
          src.kind === 'pattern'
            ? join('dist', 'patterns', `${src.ref}.html`)
            : join('public', 'schemas', `${src.ref}.v1.json`);
        expect(existsSync(file), `${row.id}: ${file}`).toBe(true);
      }
    }
  });

  test('the training-record schema (AI literacy training) is never used as evidence of a model training run', () => {
    for (const row of rows) {
      expect(row.evidence.map((e) => e.schemaId), row.id).not.toContain('training-record');
      expect((row.derivedFrom ?? []).map((s) => s.ref), row.id).not.toContain('training-record');
    }
  });

  test('the registry validates', () => {
    expect(controlProblems()).toEqual([]);
  });

  test('references: https, chapter anchors that exist in chapters 14 and 19, no duplicate sources', () => {
    const anchors: Record<string, Set<string>> = {
      'governing-development': chapterAnchors('14-governing-development.md'),
      'privacy-and-ai': chapterAnchors('19-privacy-and-ai.md'),
    };
    for (const row of rows) {
      expect(row.references.length, row.id).toBeGreaterThan(0);
      for (const src of row.references) {
        expect(src.url, row.id).toMatch(/^https:\/\//);
        const m = /^https:\/\/aigovernanceengineer\.com\/bok\/([a-z0-9-]+)#(.+)$/.exec(src.url);
        if (m) {
          expect(Object.keys(anchors), `${row.id}: ${src.url}`).toContain(m[1]);
          expect(anchors[m[1]].has(m[2]), `${row.id}: #${m[2]} not in ${m[1]}`).toBe(true);
        }
        const p = /^https:\/\/aigovernanceengineer\.com\/patterns\/([a-z0-9-]+)$/.exec(src.url);
        if (p) expect(existsSync(join('dist', 'patterns', `${p[1]}.html`)), `${row.id}: ${src.url}`).toBe(true);
      }
    }
    const sources = profileSources(SLUG);
    expect(new Set(sources.map((s) => s.url)).size).toBe(sources.length);
  });

  test('the profile is an honest draft with no reviewer', () => {
    const p = dataAdmissionAndPrivacyProfile;
    expect(p.version).toBe('0.1');
    expect(p.status).toBe('draft');
    expect(p.reviewers).toEqual([]);
    expect(p.changelog).toEqual([expect.objectContaining({ version: '0.1' })]);
    expect(rows.every((c) => c.version === p.version)).toBe(true);
  });

  test('no em dash, and no claim of standing', () => {
    const text = JSON.stringify([dataAdmissionAndPrivacyProfile, rows]);
    expect(text).not.toContain(EM_DASH);
    expect(text).not.toMatch(/\bcertif(ied|ication)\b|\bcompliant\b|\bendorse/i);
  });
});

test('the profile page carries an anchor for every control', () => {
  const html = readFileSync(join('dist', 'controls', `${SLUG}.html`), 'utf8');
  for (const row of rows) expect(html, row.id).toContain(`id="${row.id.toLowerCase()}"`);
});
