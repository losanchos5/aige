// controls-runtime.spec.ts: the Agent Runtime Control Profile v0.1
// (src/data/controls/agent-runtime.ts). Pure Node over the data, plus one read
// of dist/controls/agent-runtime.html for the control anchors (run after the
// build). Block orp-controls-runtime (open-reference-project, wave 1).
import { test, expect } from '@playwright/test';
import { readFileSync } from 'node:fs';
import { join } from 'node:path';
import GithubSlugger from 'github-slugger';
import { controlProblems, controlsIn, profileSources } from '../src/data/controls';
import { agentRuntimeProfile, KEPT_VERBATIM } from '../src/data/controls/agent-runtime';
import { agentControls, agentChapter } from '../src/data/tool-agent-controls';

const EM_DASH = String.fromCharCode(0x2014);
const rows = controlsIn('agent-runtime');
const ids = Array.from({ length: 31 }, (_, i) => `AIGE-CTL-AGENT-${String(i + 1).padStart(3, '0')}`);

/** rehype-slug ids of every heading in chapter 23 (github-slugger, as the site renders them). */
function chapterAnchors(): Set<string> {
  const md = readFileSync(join('..', 'bok', '23-governing-agents.md'), 'utf8').replace(/\r/g, '');
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

test.describe('agent runtime profile data', () => {
  test('31 controls, ids in order', () => {
    expect(rows.map((c) => c.id)).toEqual(ids);
  });

  test('each control restates one distinct chapter-23 seed, in module order', () => {
    expect(agentControls).toHaveLength(31);
    const seen = new Set<string>();
    rows.forEach((row, i) => {
      expect(row.seeds, row.id).toEqual([agentControls[i].id]);
      expect(seen.has(row.seeds[0]), `${row.id} repeats a seed`).toBe(false);
      seen.add(row.seeds[0]);
    });
  });

  test('every control is a derived draft, open for review, with no invented verification', () => {
    for (const row of rows) {
      expect(row.depth, row.id).toBe('derived');
      expect(row.status, row.id).toBe('draft');
      expect(row.reviewerStatus, row.id).toBe('open');
      expect(row.verification, row.id).toEqual([]);
      expect(row.openQuestions.length, row.id).toBeGreaterThan(0);
      expect(row.openQuestions[0], row.id).toMatch(/^Verification procedure and evidence schema to be specified/);
    }
  });

  test('the registry validates', () => {
    expect(controlProblems()).toEqual([]);
  });

  test('objectives: kept word for word where the rule is an outcome, restated otherwise', () => {
    rows.forEach((row, i) => {
      const seed = agentControls[i];
      if (KEPT_VERBATIM.has(seed.id)) expect(row.objective, row.id).toBe(seed.rule);
      else expect(row.objective, row.id).not.toBe(seed.rule);
    });
  });

  test('failure modes: every control names one; mapped threats come first', () => {
    rows.forEach((row, i) => {
      expect(row.failureModes.length, row.id).toBeGreaterThan(0);
      const threats = agentControls[i].threats ?? [];
      expect(row.mappings.owasp, row.id).toEqual(threats.map((t) => t.toLowerCase()));
      threats.forEach((t, n) => expect(row.failureModes[n], row.id).toMatch(new RegExp(`^${t}: `)));
      expect(row.openQuestions.some((q) => q.startsWith('TODO')), row.id).toBe(false);
    });
  });

  test('layers and enforcement points follow the derivation rules', () => {
    const bySeed = new Map(rows.map((r) => [r.seeds[0], r]));
    expect(bySeed.get('registry-entry')?.layer).toBe(2);
    expect(bySeed.get('own-identity')?.layer).toBe(2);
    expect(bySeed.get('trajectory-evals')?.layer).toBe(3);
    expect(bySeed.get('otel-telemetry')?.layer).toBe(5);
    expect(bySeed.get('registry-entry')?.enforcementPoints).toEqual(['deploy']);
    expect(bySeed.get('mcp-admission')?.enforcementPoints).toEqual(['deploy']);
    expect(bySeed.get('prompt-change-control')?.enforcementPoints).toContain('deploy');
    expect(bySeed.get('trajectory-evals')?.enforcementPoints).toEqual(['pre_merge']);
    for (const row of rows) expect(row.evidence[0].layer, row.id).toBe(row.layer);
  });

  test('references: https, chapter anchors that exist, the OWASP Agentic source where a threat is mapped', () => {
    const anchors = chapterAnchors();
    const chapterPrefix = `https://aigovernanceengineer.com${agentChapter}#`;
    for (const row of rows) {
      expect(row.references.length, row.id).toBeGreaterThan(0);
      expect(row.references[0].url.startsWith(chapterPrefix), row.id).toBe(true);
      for (const src of row.references) {
        expect(src.url, row.id).toMatch(/^https:\/\//);
        if (src.url.startsWith(chapterPrefix)) {
          expect(src.verified, row.id).toBe('primary');
          const anchor = src.url.slice(chapterPrefix.length);
          expect(anchors.has(anchor), `${row.id}: #${anchor} not in chapter 23`).toBe(true);
        }
      }
      if (row.mappings.owasp.length > 0) {
        expect(row.references.map((s) => s.url), row.id).toContain(
          'https://genai.owasp.org/resource/owasp-top-10-for-agentic-applications-for-2026/',
        );
      }
    }
    const sources = profileSources('agent-runtime');
    expect(new Set(sources.map((s) => s.url)).size).toBe(sources.length);
  });

  test('the profile is an honest draft with no reviewer', () => {
    expect(agentRuntimeProfile.title).toBe('Agent Runtime Control Profile');
    expect(agentRuntimeProfile.version).toBe('0.1');
    expect(agentRuntimeProfile.reviewers).toEqual([]);
    expect(agentRuntimeProfile.changelog).toEqual([
      expect.objectContaining({ version: '0.1', date: '2026-09-26' }),
    ]);
    expect(agentRuntimeProfile.summary).toMatch(/chapter 23/);
    expect(agentRuntimeProfile.scope).toMatch(/evaluation harness/);
  });

  test('no em dash, and no claim of standing', () => {
    const text = JSON.stringify([agentRuntimeProfile, rows]);
    expect(text).not.toContain(EM_DASH);
    expect(text).not.toMatch(/\bcertif(ied|ication)\b|\bcompliant\b|\bendorse/i);
  });
});

test('the profile page carries an anchor for every control', () => {
  const html = readFileSync(join('dist', 'controls', 'agent-runtime.html'), 'utf8');
  for (const id of ids) expect(html, id).toContain(`id="${id.toLowerCase()}"`);
});
