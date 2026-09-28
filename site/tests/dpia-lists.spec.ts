// dpia-lists.spec.ts: the national DPIA lists (src/data/dpia-lists.ts,
// /resources/dpia-lists, /api/v1/dpia-lists.json), plus the two sources that
// arrived with it: the AI Verify crosswalk column and the IMDA Agentic AI
// cross-references on the controls. Data checks are pure Node; page and API
// checks read the built files in dist and skip without a build.
import { test, expect } from '@playwright/test';
import { existsSync, readFileSync } from 'node:fs';
import { join } from 'node:path';
import { inlineScriptAllowed } from './helpers/csp';
import {
  lists,
  listAnchor,
  itemAnchor,
  listsWith,
  listsWithout,
  annexIIICounts,
  updatedAfter2019,
  tagOrder,
  contributors,
  reviewers,
  dpiaSources,
  annexIII,
  OPINIONS_SEPT_2018,
} from '../src/data/dpia-lists';
import { refs, columns } from '../src/data/crosswalk';
import { controls } from '../src/data/controls';
import { IMDA_AGENTIC } from '../src/lib/sources';
import { imdaAgenticXrefs, IMDA_AGENTIC_FRAMEWORK } from '../src/data/controls/imda-agentic';

const PAGE = join('dist', 'resources', 'dpia-lists.html');
const API = join('dist', 'api', 'v1', 'dpia-lists.json');
const EM_DASH = String.fromCharCode(0x2014);

test.describe('national DPIA lists data', () => {
  test('one row per list, unique ids, https documents, ISO dates', () => {
    expect(lists.length).toBeGreaterThanOrEqual(18);
    expect(new Set(lists.map((l) => l.id)).size).toBe(lists.length);
    for (const list of lists) {
      expect(list.url.startsWith('https://'), list.id).toBe(true);
      expect(list.adopted, list.id).toMatch(/^\d{4}-\d{2}-\d{2}$/);
    }
  });

  test('every list was read: items, a method, an EDPB opinion; AI named in the register implies AI named', () => {
    for (const list of lists) {
      expect(list.items.length, list.id).toBeGreaterThan(0);
      expect(list.itemCount, list.id).toBeGreaterThanOrEqual(list.items.length);
      expect(list.edpbOpinion.url.startsWith('https://www.edpb.europa.eu/'), list.id).toBe(true);
      if (list.aiNamedInRegister) expect(list.aiNamed, list.id).toBe(true);
    }
  });

  test('the findings the page states still hold on the data', () => {
    // 7 name AI (6 in the register versions); only Finland lacks automated decisions.
    expect(listsWith('ai').map((l) => l.id).sort()).toEqual(['cz', 'de', 'gb', 'gr', 'it', 'li', 'pl']);
    expect(lists.filter((l) => l.aiNamedInRegister)).toHaveLength(6);
    expect(listsWith('biometrics')).toHaveLength(lists.length);
    expect(listsWith('profiling-scoring')).toHaveLength(lists.length);
    expect(listsWithout('automated-decision').map((l) => l.id)).toEqual(['fi']);
    expect(annexIIICounts()[0].area).toBe('employment');
    expect(updatedAfter2019().map((l) => l.id).sort()).toEqual(['cz', 'li']);
    for (const l of lists) expect(l.adopted < '2024-07-12', l.id).toBe(true);
    expect(OPINIONS_SEPT_2018).toBe(22);
  });

  test('item anchors are unique on the page', () => {
    const anchors = lists.flatMap((l) => l.items.map((i) => itemAnchor(l, i)));
    expect(new Set(anchors).size).toBe(anchors.length);
  });

  test('credit: the idea is Aurélie Pols; no review is claimed', () => {
    const idea = contributors.find((c) => c.roles.includes('conceptualization'));
    expect(idea?.name).toBe('Aurélie Pols');
    expect(idea?.label).toBe('Idea');
    expect(reviewers).toEqual([]);
  });

  test('no em dash anywhere in the dataset', () => {
    const text = JSON.stringify({ lists, dpiaSources, contributors });
    expect(text.includes(EM_DASH)).toBe(false);
  });
});

test.describe('national DPIA lists outputs (built site)', () => {
  test.skip(!existsSync(PAGE), 'run npm run build first');

  test('the page has a row per list, the credit line and no inline script', () => {
    const html = readFileSync(PAGE, 'utf8');
    for (const list of lists) expect(html, list.id).toContain(`id="${listAnchor(list)}"`);
    expect(html).toContain('Illustrative, not a claim of conformity');
    expect(html).toMatch(/Idea: <a[^>]*>Aurélie Pols<\/a>/);
    expect(html).toMatch(/Research and data: <a[^>]*>Jorge García Aibar<\/a>/);
    expect(html).not.toContain('Suggested by');
    expect(html).not.toContain('Reviewed by');
    const inline = [
      ...html.matchAll(/<script(?![^>]*\bsrc=)(?![^>]*application\/ld\+json)[^>]*>([\s\S]*?)<\/script>/g),
    ];
    expect(inline.map((m) => m[1]).filter((body) => !inlineScriptAllowed(body))).toEqual([]);
  });

  test('the findings count the lists that name AI from the data', () => {
    const html = readFileSync(PAGE, 'utf8').replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ');
    expect(html).toContain(`${listsWith('ai').length} of ${lists.length} lists name AI`);
  });

  test('the API carries every list, the contributors and an empty reviewers list', () => {
    const api = JSON.parse(readFileSync(API, 'utf8')) as {
      lists: { id: string; flags: Record<string, boolean> }[];
      contributors: { name: string; roles: string[] }[];
      reviewers: unknown[];
      license: string;
    };
    expect(api.lists.map((l) => l.id)).toEqual(lists.map((l) => l.id));
    expect(api.license).toBe('CC BY 4.0');
    expect(api.contributors.find((c) => c.name === 'Aurélie Pols')?.roles).toEqual(['conceptualization']);
    expect(api.reviewers).toEqual([]);
  });
});

test.describe('AI Verify column and IMDA cross-references', () => {
  test('AI Verify is a column; thin topics stay empty', () => {
    expect(columns.find((c) => c.id === 'aiverify')?.frameworks).toEqual(['sg-ai-verify']);
    const aiv = refs.filter((r) => r.framework === 'sg-ai-verify');
    expect(aiv.length).toBeGreaterThan(30);
    for (const topic of ['agent-identity-autonomy', 'sandboxes-real-world-testing', 'conformity-assessment', 'prohibited-practices']) {
      expect(aiv.filter((r) => r.topic === topic), topic).toEqual([]);
    }
    for (const r of aiv) {
      expect(r.ref, r.topic).toMatch(/^\d{1,2}\.\d{1,2}\.\d$/);
      expect((r.note ?? '').length, `${r.topic} ${r.ref}`).toBeGreaterThan(20);
    }
  });

  test('every IMDA cross-reference lands on its control, once, with the shared source', () => {
    for (const [id, x] of Object.entries(imdaAgenticXrefs)) {
      const control = controls.find((c) => c.id === id);
      expect(control, id).toBeTruthy();
      const other = (control!.mappings.other ?? []).filter((o) => o.framework === IMDA_AGENTIC_FRAMEWORK);
      expect(other.map((o) => o.ref), id).toEqual([x.ref]);
      expect(control!.references.filter((r) => r.url === IMDA_AGENTIC.url), id).toHaveLength(1);
    }
    // IMDA's own words only: it never says "kill switch".
    for (const x of Object.values(imdaAgenticXrefs)) {
      expect(/kill switch/i.test(x.note) && !/never says "kill switch"/.test(x.note)).toBe(false);
    }
  });
});
