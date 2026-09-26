// controls-deployment-and-monitoring.spec.ts: the Deployment and Monitoring
// Control Profile v0.1 (src/data/controls/deployment-and-monitoring.ts). Pure
// Node over the data, plus reads of dist/ for the pattern pages and the profile
// page anchors (run after the build). Block orp2-deploy
// (open-reference-project-2, wave 1).
import { test, expect } from '@playwright/test';
import { existsSync, readFileSync } from 'node:fs';
import { join } from 'node:path';
import GithubSlugger from 'github-slugger';
import { controlProblems, controlsIn, profileBySlug, profileSources } from '../src/data/controls';
import { deploymentAndMonitoringProfile, observationExamples } from '../src/data/controls/deployment-and-monitoring';
import { chapters } from '../src/data/chapters';

const EM_DASH = String.fromCharCode(0x2014);
const SLUG = 'deployment-and-monitoring';
const rows = controlsIn(SLUG);
const MIN = 10;
const MAX = 15;

/** rehype-slug ids of every heading in a chapter file (github-slugger, as the site renders them). */
function headingAnchors(file: string): Set<string> {
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

test.describe('deployment and monitoring profile data', () => {
  test('the profile is registered, with 10 to 15 controls and contiguous ids', () => {
    expect(profileBySlug(SLUG)).toBe(deploymentAndMonitoringProfile);
    expect(rows.length).toBeGreaterThanOrEqual(MIN);
    expect(rows.length).toBeLessThanOrEqual(MAX);
    expect(rows.map((c) => c.id)).toEqual(
      rows.map((_, i) => `AIGE-CTL-DEPLOY-${String(i + 1).padStart(3, '0')}`),
    );
  });

  test('the registry validates', () => {
    expect(controlProblems()).toEqual([]);
  });

  test('every control is a derived draft, open for review, with no invented verification', () => {
    for (const row of rows) {
      expect(row.depth, row.id).toBe('derived');
      expect(row.status, row.id).toBe('draft');
      expect(row.reviewerStatus, row.id).toBe('open');
      expect(row.seeds, row.id).toEqual([]);
      expect(row.verification, row.id).toEqual([]);
      expect(row.failureModes.length, row.id).toBeGreaterThan(0);
      expect(row.enforcementPoints.length, row.id).toBeGreaterThan(0);
      expect(row.openQuestions.length, row.id).toBeGreaterThan(1);
      expect(row.evidence[0].layer, row.id).toBe(row.layer);
    }
    expect(observationExamples).toEqual([]);
  });

  test('every control restates a pattern or record schema that resolves', () => {
    for (const row of rows) {
      const sources = row.derivedFrom ?? [];
      const primary = sources.filter((s) => s.kind === 'pattern' || s.kind === 'schema');
      expect(primary.length, `${row.id} names no pattern or schema`).toBeGreaterThan(0);
      for (const src of primary) {
        if (src.kind === 'pattern') {
          expect(existsSync(join('dist', 'patterns', `${src.ref}.html`)), `${row.id}: /patterns/${src.ref}`).toBe(true);
          expect(row.patterns, `${row.id} lists its source pattern`).toContain(src.ref);
        } else {
          expect(existsSync(join('public', 'schemas', `${src.ref}.v1.json`)), `${row.id}: /schemas/${src.ref}.v1.json`).toBe(true);
        }
      }
      for (const src of sources.filter((s) => s.kind === 'chapter')) {
        expect(chapters.some((ch) => ch.slug === src.ref), `${row.id}: chapter ${src.ref}`).toBe(true);
      }
    }
  });

  test('evidence names the record schema the source uses, where it names one', () => {
    for (const row of rows) {
      for (const ev of row.evidence) {
        if (ev.schemaId) expect(existsSync(join('public', 'schemas', `${ev.schemaId}.v1.json`)), `${row.id}: ${ev.schemaId}`).toBe(true);
      }
    }
  });

  test('references: https, no duplicates, chapter and pattern anchors that exist', () => {
    const files: Record<string, string> = {
      'governing-deployment': '15-governing-deployment.md',
      'fairness-and-explainability': '16-fairness-explainability.md',
      incidents: '17-incidents.md',
    };
    const anchors = Object.fromEntries(Object.entries(files).map(([slug, file]) => [slug, headingAnchors(file)]));
    for (const row of rows) {
      expect(row.references.length, row.id).toBeGreaterThan(0);
      for (const src of row.references) {
        expect(src.url, row.id).toMatch(/^https:\/\//);
        const bok = /^https:\/\/aigovernanceengineer\.com\/bok\/([a-z0-9-]+)#(.+)$/.exec(src.url);
        if (bok) {
          expect(Object.hasOwn(anchors, bok[1]), `${row.id}: chapter ${bok[1]}`).toBe(true);
          expect(anchors[bok[1]].has(bok[2]), `${row.id}: #${bok[2]} not in ${bok[1]}`).toBe(true);
        }
        const pattern = /^https:\/\/aigovernanceengineer\.com\/patterns\/([a-z0-9-]+)$/.exec(src.url);
        if (pattern) expect(existsSync(join('dist', 'patterns', `${pattern[1]}.html`)), src.url).toBe(true);
      }
      expect(new Set(row.references.map((s) => s.url)).size, row.id).toBe(row.references.length);
      if ((row.mappings.aiuc1 ?? []).length > 0) {
        expect(row.references.map((s) => s.url), row.id).toContain('https://standard.aiuc-1.com/llms.txt');
      }
    }
    const sources = profileSources(SLUG);
    expect(new Set(sources.map((s) => s.url)).size).toBe(sources.length);
  });

  test('the profile is an honest draft with no reviewer', () => {
    expect(deploymentAndMonitoringProfile.title).toBe('Deployment and Monitoring Control Profile');
    expect(deploymentAndMonitoringProfile.version).toBe('0.1');
    expect(deploymentAndMonitoringProfile.reviewers).toEqual([]);
    expect(deploymentAndMonitoringProfile.changelog).toEqual([
      expect.objectContaining({ version: '0.1', date: '2026-09-26' }),
    ]);
  });

  test('no em dash, and no claim of standing', () => {
    const text = JSON.stringify([deploymentAndMonitoringProfile, rows]);
    expect(text).not.toContain(EM_DASH);
    expect(text).not.toMatch(/\bcertif(ied|ication)\b|\bcompliant\b|\bendorse/i);
  });
});

test('the profile page carries an anchor for every control', () => {
  const html = readFileSync(join('dist', 'controls', `${SLUG}.html`), 'utf8');
  for (const row of rows) expect(html, row.id).toContain(`id="${row.id.toLowerCase()}"`);
});
