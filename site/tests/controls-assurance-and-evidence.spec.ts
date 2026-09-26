// controls-assurance-and-evidence.spec.ts: the Assurance and Evidence Control
// Profile v0.1 (src/data/controls/assurance-and-evidence.ts), a profile derived
// from site material. Pure Node over the data, plus reads of dist (pattern
// pages, the profile page) after the build. Block orp2-assure
// (open-reference-project-2, wave 1).
import { test, expect } from '@playwright/test';
import { existsSync, readFileSync } from 'node:fs';
import { join } from 'node:path';
import GithubSlugger from 'github-slugger';
import { controlById, controlProblems, controlsIn, profileSources } from '../src/data/controls';
import { assuranceAndEvidenceProfile, VERIFICATION_TODO } from '../src/data/controls/assurance-and-evidence';
import { chapters } from '../src/data/chapters';

const EM_DASH = String.fromCharCode(0x2014);
const PROFILE = 'assurance-and-evidence';
const rows = controlsIn(PROFILE);
const SITE = 'https://aigovernanceengineer.com';

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

/** The bok/ file of a chapter slug ("14-governing-development.md"). */
function chapterFile(slug: string): string {
  const ch = chapters.find((c) => c.slug === slug);
  if (!ch) throw new Error(`unknown chapter ${slug}`);
  return `${String(ch.order).padStart(2, '0')}-${slug}.md`;
}

test.describe('assurance and evidence profile data', () => {
  test('8 to 12 controls, ids contiguous from 001', () => {
    expect(rows.length).toBeGreaterThanOrEqual(8);
    expect(rows.length).toBeLessThanOrEqual(12);
    expect(rows.map((c) => c.id)).toEqual(
      rows.map((_, i) => `AIGE-CTL-ASSURE-${String(i + 1).padStart(3, '0')}`),
    );
  });

  test('the registry validates', () => {
    expect(controlProblems()).toEqual([]);
  });

  test('every control is a derived draft, open for review, with no seed and no invented verification', () => {
    for (const row of rows) {
      expect(row.depth, row.id).toBe('derived');
      expect(row.status, row.id).toBe('draft');
      expect(row.reviewerStatus, row.id).toBe('open');
      expect(row.version, row.id).toBe('0.1');
      expect(row.seeds, row.id).toEqual([]);
      expect(row.verification, row.id).toEqual([]);
      expect(row.openQuestions[0], row.id).toBe(VERIFICATION_TODO);
      expect(row.openQuestions.length, row.id).toBeGreaterThanOrEqual(2);
      expect(row.failureModes.length, row.id).toBeGreaterThan(0);
      expect(row.evidence.length, row.id).toBeGreaterThan(0);
      expect(row.observation, row.id).toBeUndefined();
    }
  });

  test('every control derives from a pattern or record schema that is published', () => {
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
      // A pattern the control derives from is also one it names.
      for (const src of row.derivedFrom ?? []) {
        if (src.kind === 'pattern') expect(row.patterns, row.id).toContain(src.ref);
      }
    }
  });

  test('evidence names a published record schema wherever the source uses one', () => {
    for (const row of rows) {
      const schemas = row.evidence.flatMap((e) => (e.schemaId ? [e.schemaId] : []));
      expect(schemas.length, row.id).toBeGreaterThan(0);
      for (const id of schemas) expect(existsSync(join('public', 'schemas', `${id}.v1.json`)), `${row.id}: ${id}`).toBe(true);
    }
  });

  test('references: https, site pages and chapter anchors that exist, no repeated source', () => {
    for (const row of rows) {
      expect(row.references.length, row.id).toBeGreaterThan(0);
      for (const src of row.references) {
        expect(src.url, row.id).toMatch(/^https:\/\//);
        if (src.url.startsWith(`${SITE}/patterns/`)) {
          const slug = src.url.slice(`${SITE}/patterns/`.length);
          expect(existsSync(join('dist', 'patterns', `${slug}.html`)), `${row.id}: ${src.url}`).toBe(true);
        }
        const bok = /^https:\/\/aigovernanceengineer\.com\/bok\/([a-z0-9-]+)#(.+)$/.exec(src.url);
        if (bok) {
          expect(headingAnchors(chapterFile(bok[1])).has(bok[2]), `${row.id}: ${src.url}`).toBe(true);
        }
      }
      expect(new Set(row.references.map((s) => s.url)).size, row.id).toBe(row.references.length);
    }
    const sources = profileSources(PROFILE);
    expect(new Set(sources.map((s) => s.url)).size).toBe(sources.length);
  });

  test('mapped frameworks carry their source; AIUC-1 mappings cite the public index', () => {
    for (const row of rows) {
      const urls = row.references.map((s) => s.url);
      if ((row.mappings.aiuc1 ?? []).length > 0) expect(urls, row.id).toContain('https://standard.aiuc-1.com/llms.txt');
      if (row.mappings.nistAiRmf.length > 0) expect(urls, row.id).toContain('https://nvlpubs.nist.gov/nistpubs/ai/NIST.AI.100-1.pdf');
      const iso = row.mappings.iso42001.length > 0 || (row.mappings.other ?? []).some((o) => o.framework.startsWith('ISO/IEC 42001'));
      if (iso) expect(urls, row.id).toContain('https://www.iso.org/standard/81230.html');
      for (const id of row.mappings.nistAiRmf) expect(id, row.id).toMatch(/^(MEASURE|MANAGE) /);
    }
  });

  test('cross-references name the controls they mean', () => {
    const named = new Set<string>();
    for (const row of rows) {
      for (const m of JSON.stringify(row).matchAll(/AIGE-CTL-[A-Z]+-\d{3}/g)) named.add(m[0]);
    }
    for (const id of named) expect(controlById(id), id).toBeDefined();
    expect(controlById('AIGE-CTL-AGENT-013')?.seeds).toEqual(['trajectory-evals']);
    expect(controlById('AIGE-CTL-AGENT-018')?.seeds).toEqual(['mcp-admission']);
    expect(controlById('AIGE-CTL-EVAL-008')?.title).toBe('Harness and Configuration Attestation');
    expect(controlById('AIGE-CTL-EVAL-009')?.title).toBe('Evaluation Validity Checks');
  });

  test('the profile is an honest draft with no reviewer', () => {
    expect(assuranceAndEvidenceProfile.version).toBe('0.1');
    expect(assuranceAndEvidenceProfile.status).toBe('draft');
    expect(assuranceAndEvidenceProfile.reviewerStatus).toBe('open');
    expect(assuranceAndEvidenceProfile.reviewers).toEqual([]);
    expect(assuranceAndEvidenceProfile.changelog).toEqual([
      expect.objectContaining({ version: '0.1', date: '2026-09-26' }),
    ]);
  });

  test('no em dash, and no claim of standing', () => {
    const text = JSON.stringify([assuranceAndEvidenceProfile, rows]);
    expect(text).not.toContain(EM_DASH);
    expect(text).not.toMatch(/\bcertif(ied|ication)\b|\bcompliant\b|\bendorse/i);
  });
});

test('the profile page carries an anchor for every control', () => {
  const html = readFileSync(join('dist', 'controls', `${PROFILE}.html`), 'utf8');
  for (const row of rows) expect(html, row.id).toContain(`id="${row.id.toLowerCase()}"`);
});
