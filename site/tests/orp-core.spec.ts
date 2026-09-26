// orp-core.spec.ts: the open-reference core data (src/data/controls, people,
// work, open-questions). Pure Node: the modules are imported and checked; no
// page is needed. Block orp-core (open-reference-project, wave 0).
import { test, expect } from '@playwright/test';
import { readFileSync } from 'node:fs';
import { join } from 'node:path';
import {
  controls,
  profiles,
  controlProblems,
  controlsIn,
  controlById,
  controlHref,
  controlPath,
  controlApiPath,
  profileSources,
  sourceNumber,
} from '../src/data/controls';
import { evaluationEnvironmentProfile } from '../src/data/controls/evaluation-environment';
import { agentRuntimeProfile, agentRuntimeAnchorHeadings } from '../src/data/controls/agent-runtime';
import { agentControls } from '../src/data/tool-agent-controls';
import { people, peopleProblems } from '../src/data/people';
import { work, workProblems } from '../src/data/work';
import { openQuestions, openQuestionProblems } from '../src/data/open-questions';
import { authorNodes } from '../src/lib/jsonld';

const EM_DASH = String.fromCharCode(0x2014);
const ids = (prefix: string, n: number) =>
  Array.from({ length: n }, (_, i) => `AIGE-CTL-${prefix}-${String(i + 1).padStart(3, '0')}`);

test.describe('open control registry', () => {
  test('every reference and rule resolves', () => {
    expect(controlProblems()).toEqual([]);
  });

  test('two profiles, 40 controls, ids in order', () => {
    expect(profiles.map((p) => p.slug)).toEqual(['evaluation-environment', 'agent-runtime']);
    expect(controls).toHaveLength(40);
    expect(controlsIn('evaluation-environment').map((c) => c.id)).toEqual(ids('EVAL', 9));
    expect(controlsIn('agent-runtime').map((c) => c.id)).toEqual(ids('AGENT', 31));
    expect(controls.map((c) => c.id)).toEqual([...ids('EVAL', 9), ...ids('AGENT', 31)]);
  });

  test('each agent runtime control restates one chapter-23 seed, in module order', () => {
    const rows = controlsIn('agent-runtime');
    expect(rows).toHaveLength(agentControls.length);
    rows.forEach((row, i) => {
      expect(row.depth).toBe('derived');
      expect(row.seeds).toEqual([agentControls[i].id]);
      expect(row.objective).toBe(agentControls[i].rule);
    });
  });

  test('evaluation environment controls are outlines in this wave, open for review', () => {
    for (const row of controlsIn('evaluation-environment')) {
      expect(row.depth).toBe('stub');
      expect(row.reviewerStatus).toBe('open');
      expect(row.openQuestions.length).toBeGreaterThan(0);
    }
  });

  test('no profile names a reviewer, so every one stays open', () => {
    for (const p of [evaluationEnvironmentProfile, agentRuntimeProfile]) {
      expect(p.reviewers).toEqual([]);
      expect(p.reviewerStatus).toBe('open');
      expect(p.status).toBe('draft');
    }
  });

  test('paths and lookups', () => {
    const c = controlById('aige-ctl-eval-002');
    expect(c?.id).toBe('AIGE-CTL-EVAL-002');
    expect(controlPath(c!)).toBe('/controls/evaluation-environment#aige-ctl-eval-002');
    expect(controlHref('AIGE-CTL-AGENT-031')).toBe('/controls/agent-runtime#aige-ctl-agent-031');
    expect(controlApiPath(c!)).toBe('/api/v1/controls/aige-ctl-eval-002.json');
    expect(() => controlHref('AIGE-CTL-EVAL-099')).toThrow();
    const sources = profileSources('agent-runtime');
    expect(new Set(sources.map((s) => s.url)).size).toBe(sources.length);
    for (const row of controlsIn('agent-runtime')) {
      for (const src of row.references) expect(sourceNumber(sources, src)).toBeGreaterThan(0);
    }
  });

  test('the chapter-23 headings the derived references name exist in the chapter', () => {
    const md = readFileSync(join('..', 'bok', '23-governing-agents.md'), 'utf8');
    for (const heading of Object.values(agentRuntimeAnchorHeadings)) {
      expect(md, heading).toMatch(new RegExp(`^#{2,3} ${heading.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}$`, 'm'));
    }
  });
});

test.describe('people, open work and open questions', () => {
  test('every list validates', () => {
    expect(peopleProblems()).toEqual([]);
    expect(workProblems()).toEqual([]);
    expect(openQuestionProblems()).toEqual([]);
  });

  test('one person, the author, with the Person @id the site already emits', () => {
    expect(people).toHaveLength(1);
    expect(people[0].id).toBe('jorge-garcia-aibar');
    expect(authorNodes.map((n) => n['@id'])).toContain(people[0].jsonLdId);
  });

  test('five open questions', () => {
    expect(openQuestions).toHaveLength(5);
  });
});

test('no module carries an em dash', () => {
  for (const data of [profiles, controls, people, work, openQuestions]) {
    expect(JSON.stringify(data)).not.toContain(EM_DASH);
  }
});
