// frontier-cases.spec.ts: the frontier incident notes on /cases (OpenSpec
// change open-reference-project, block orp-frontier-cases). Six cases from
// self-reported or independently investigated 2026 incidents in AI training and
// evaluation environments, each with a full incident note, and /frontier
// linking every one of them. Data checks read src/data; dist checks read the
// built pages (skipped when dist is missing).
import { test, expect } from '@playwright/test';
import { existsSync, readFileSync } from 'node:fs';
import { join } from 'node:path';
import { cases, caseById, caseNoteProblems, type IncidentCase } from '../src/data/cases';
import { controlById, controlHref } from '../src/data/controls';
import { frontierBlocks, frontierProblems } from '../src/data/frontier';
import { citedNumbers } from '../src/lib/sources';
import { IN_SHORT_MAX, IN_SHORT_MIN, extractorWords, spaceWords } from './helpers/in-short';

const DIST = 'dist';
const read = (...parts: string[]): string => readFileSync(join(DIST, ...parts), 'utf8');
const hasDist = existsSync(join(DIST, 'cases.html'));

const NEW_IDS = [
  'openai-agent-dns-covert-channel-2026',
  'openai-agent-github-token-exposure-2026',
  'openai-agents-temp-file-hosting-2026',
  'openai-agents-artifactory-cross-sample-2026',
  'anthropic-third-party-eval-environment-incidents-2026',
  'uk-aisi-cyber-range-unsanctioned-actions-2026',
] as const;

const NOTE_SECTIONS = [
  'system-boundary',
  'control-assumptions',
  'controls-by-moment',
  'evidence-requirements',
  'related-controls',
  'open-questions',
] as const;

const EM_DASH = String.fromCharCode(0x2014);

const entry = (id: string): IncidentCase => {
  const found = caseById(id);
  if (!found) throw new Error(`missing case ${id}`);
  return found;
};

/** Every prose field the case page checks for [n] markers. */
const prose = (c: IncidentCase): string[] => [
  ...c.happened,
  ...c.failureMode,
  ...c.control.text,
  ...c.obligations.map((o) => o.why),
  ...(c.systemBoundary ? [c.systemBoundary] : []),
  ...(c.controlAssumptions ?? []),
  ...(c.evidenceRequirements ?? []),
  ...(c.openQuestions ?? []),
];

const incidentLinks = (): string[] =>
  frontierBlocks.find((b) => b.id === 'incidents')?.links.map((l) => l.href) ?? [];

test.describe('frontier cases: data', () => {
  test('the new cases exist, each with every incident-note field', () => {
    for (const id of NEW_IDS) {
      const c = entry(id);
      expect(c.year, id).toBe('2026');
      expect(c.systemBoundary, id).toBeTruthy();
      for (const list of [
        c.controlAssumptions,
        c.preventiveControls,
        c.detectiveControls,
        c.responsiveControls,
        c.evidenceRequirements,
        c.relatedControls,
        c.openQuestions,
      ]) {
        expect(list?.length ?? 0, id).toBeGreaterThan(0);
      }
    }
  });

  test('caseNoteProblems() is empty', () => {
    expect(caseNoteProblems()).toEqual([]);
  });

  test('every [n] marker has a source and every source is cited', () => {
    for (const id of NEW_IDS) {
      const c = entry(id);
      const cited = citedNumbers(prose(c));
      for (const n of cited) {
        expect(n, `${id} cites [${n}]`).toBeGreaterThanOrEqual(1);
        expect(n, `${id} cites [${n}]`).toBeLessThanOrEqual(c.sources.length);
      }
      c.sources.forEach((s, i) => expect(cited.has(i + 1), `${id} source [${i + 1}] ${s.title}`).toBe(true));
    }
  });

  test(`"In short" runs ${IN_SHORT_MIN}-${IN_SHORT_MAX} words and names every control`, () => {
    for (const id of NEW_IDS) {
      const c = entry(id);
      expect(spaceWords(c.inShort), id).toBeGreaterThanOrEqual(IN_SHORT_MIN);
      expect(spaceWords(c.inShort), id).toBeLessThanOrEqual(IN_SHORT_MAX);
      expect(extractorWords(c.inShort), id).toBeLessThanOrEqual(IN_SHORT_MAX);
      expect(c.inShort, id).not.toMatch(/\[\d+\]/);
      for (const ctl of c.control.controls) expect(c.inShort, `${id}: ${ctl.name}`).toContain(ctl.name);
    }
    // The precision fix on the METR-based case: one agent posted the credentials.
    const hf = entry('openai-hugging-face-agent-incident-2026');
    expect(hf.inShort).not.toContain('Agents posted working Hugging Face credentials');
    expect(spaceWords(hf.inShort)).toBeLessThanOrEqual(IN_SHORT_MAX);
  });

  test('self-reports read as reports, never as audited fact', () => {
    for (const id of NEW_IDS) {
      expect(entry(id).inShort, id).toMatch(/\b(OpenAI|Anthropic|AISI\)?) reports\b/);
    }
  });

  test('every related control resolves in the control registry', () => {
    for (const id of NEW_IDS) {
      for (const ctl of entry(id).relatedControls ?? []) {
        expect(controlById(ctl), `${id}: ${ctl}`).toBeTruthy();
      }
    }
  });

  test('titles and short names are unique across all cases, and no case has an em dash', () => {
    expect(new Set(cases.map((c) => c.title)).size).toBe(cases.length);
    expect(new Set(cases.map((c) => c.short)).size).toBe(cases.length);
    for (const id of NEW_IDS) {
      const c = entry(id);
      expect(`${c.short}: AI incident case study`.length, id).toBeLessThanOrEqual(60);
      expect(c.summary.length, id).toBeLessThanOrEqual(160);
      expect(JSON.stringify(c).includes(EM_DASH), id).toBe(false);
    }
  });

  test('/frontier #incidents links every new case, with the copy still clean', () => {
    const links = incidentLinks();
    for (const id of NEW_IDS) expect(links, id).toContain(`/cases/${id}`);
    expect(frontierProblems()).toEqual([]);
  });
});

test.describe('frontier cases: dist', () => {
  test.skip(!hasDist && !process.env.CI, 'dist not built');

  test('each case page renders the note sections, the "On this page" list and its related controls', () => {
    for (const id of NEW_IDS) {
      const page = read('cases', `${id}.html`);
      expect(page, `${id} cs-toc`).toContain('class="cs-toc"');
      for (const section of NOTE_SECTIONS) expect(page, `${id} #${section}`).toContain(`id="${section}"`);
      for (const ctl of entry(id).relatedControls ?? []) {
        expect(page, `${id} links ${ctl}`).toContain(`href="${controlHref(ctl)}"`);
      }
      expect(page.includes(EM_DASH), id).toBe(false);
    }
  });

  test('/frontier links each new case', () => {
    const page = read('frontier.html');
    for (const id of NEW_IDS) expect(page, id).toContain(`href="/cases/${id}"`);
  });
});
