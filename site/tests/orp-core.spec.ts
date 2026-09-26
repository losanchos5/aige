// orp-core.spec.ts: the open-reference core data (src/data/controls, people,
// work, open-questions) and the indexes the control mappings resolve against
// (src/data/aiuc1.ts, src/data/nist-ai-rmf.ts). Pure Node: the modules are
// imported and checked; no page is needed. Counts are read from the registry,
// so a new profile or control needs no edit here. Block orp-core
// (open-reference-project, wave 0), extended by orp2-core
// (open-reference-project-2, wave 0).
import { test, expect } from '@playwright/test';
import { readFileSync } from 'node:fs';
import { join } from 'node:path';
import {
  controls,
  profiles,
  observationExamples,
  controlProblems,
  controlRegistryProblems,
  controlIdSequenceProblems,
  controlsIn,
  controlById,
  controlHref,
  controlPath,
  controlAnchorPath,
  controlPagePath,
  controlApiPath,
  controlsUpdated,
  profileArticleId,
  profileCitation,
  profileIdRange,
  profileSources,
  sourceNumber,
  nistAiRmfSubcategories,
  CONTROL_PAGES_ENABLED,
  RESERVED_PROFILE_SLUGS,
  type Control,
  type ControlProfile,
  type ControlRegistry,
} from '../src/data/controls';
import { agentRuntimeAnchorHeadings, KEPT_VERBATIM } from '../src/data/controls/agent-runtime';
import { aiuc1Requirements, aiuc1ById } from '../src/data/aiuc1';
import { nistAiRmfSubcategoryIndex } from '../src/data/nist-ai-rmf';
import { site } from '../src/data/site';
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

  test('every profile runs 001 up with a prefix of its own, in profile order', () => {
    // The first two profiles keep their place; later profiles are appended.
    expect(profiles.slice(0, 2).map((p) => p.slug)).toEqual(['evaluation-environment', 'agent-runtime']);
    const prefixes = new Set<string>();
    const inOrder: string[] = [];
    for (const p of profiles) {
      const rows = controlsIn(p.slug);
      expect(rows.length, p.slug).toBeGreaterThan(0);
      const prefix = rows[0].id.split('-')[2];
      expect(prefixes.has(prefix), `${p.slug} reuses ${prefix}`).toBe(false);
      prefixes.add(prefix);
      expect(rows.map((c) => c.id), p.slug).toEqual(ids(prefix, rows.length));
      inOrder.push(...rows.map((c) => c.id));
    }
    expect(controls.map((c) => c.id)).toEqual(inOrder);
    expect(controlsIn('evaluation-environment').map((c) => c.id)).toEqual(ids('EVAL', 9));
    expect(controlsIn('agent-runtime').map((c) => c.id)).toEqual(ids('AGENT', agentControls.length));
    expect(profiles.every((p) => !RESERVED_PROFILE_SLUGS.includes(p.slug))).toBe(true);
  });

  test('a deleted id listed as retired is an occupied slot, not a gap', () => {
    const live = ids('EVAL', 9).filter((id) => id !== 'AIGE-CTL-EVAL-004');
    expect(controlIdSequenceProblems('t', 'EVAL', live, [])).not.toEqual([]);
    expect(controlIdSequenceProblems('t', 'EVAL', live, ['AIGE-CTL-EVAL-004'])).toEqual([]);
    expect(controlIdSequenceProblems('t', 'EVAL', ids('EVAL', 9), ['AIGE-CTL-EVAL-010'])).toEqual([]);
    expect(controlIdSequenceProblems('t', 'EVAL', ids('EVAL', 9), ['AIGE-CTL-EVAL-011'])).not.toEqual([]);
  });

  test('each agent runtime control restates one chapter-23 seed, in module order', () => {
    const rows = controlsIn('agent-runtime');
    expect(rows).toHaveLength(agentControls.length);
    rows.forEach((row, i) => {
      expect(row.depth).toBe('derived');
      expect(row.seeds).toEqual([agentControls[i].id]);
      // Objectives are restated as outcomes (orp-controls-runtime); rules that already
      // state one are kept word for word.
      expect(row.objective.trim()).not.toBe('');
      if (KEPT_VERBATIM.has(agentControls[i].id)) expect(row.objective).toBe(agentControls[i].rule);
    });
  });

  test('evaluation environment controls: 002, 003 and 006 stay specified, the rest specified or outlines, all open for review', () => {
    const specified = ['AIGE-CTL-EVAL-002', 'AIGE-CTL-EVAL-003', 'AIGE-CTL-EVAL-006'];
    for (const row of controlsIn('evaluation-environment')) {
      if (specified.includes(row.id)) expect(row.depth, row.id).toBe('specified');
      else expect(['specified', 'stub'], row.id).toContain(row.depth);
      expect(row.reviewerStatus).toBe('open');
      expect(row.openQuestions.length).toBeGreaterThan(0);
    }
  });

  test('no profile names a reviewer, so every one stays open', () => {
    for (const p of profiles) {
      expect(p.reviewers, p.slug).toEqual([]);
      expect(p.reviewerStatus, p.slug).toBe('open');
      expect(p.status, p.slug).toBe('draft');
    }
  });

  test('paths and lookups', () => {
    const c = controlById('aige-ctl-eval-002');
    expect(c?.id).toBe('AIGE-CTL-EVAL-002');
    // A specified control gets its own page once control pages are on; its
    // anchor on the profile page stays either way.
    expect(controlAnchorPath(c!)).toBe('/controls/evaluation-environment#aige-ctl-eval-002');
    expect(controlPagePath(c!)).toBe(CONTROL_PAGES_ENABLED ? '/controls/evaluation-environment/aige-ctl-eval-002' : null);
    expect(controlPath(c!)).toBe(controlPagePath(c!) ?? controlAnchorPath(c!));
    // Any other control never has a page: its canonical URL is the anchor.
    const derived = controlById('AIGE-CTL-AGENT-031')!;
    expect(controlPagePath(derived)).toBeNull();
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

test.describe('profile helpers', () => {
  test('the TechArticle @id, the citation and the dates come from the profile', () => {
    const p = profiles[0];
    expect(profileArticleId(p)).toBe(`${site.url}/controls/${p.slug}#article`);
    const cite = profileCitation(p);
    expect(cite.url).toBe(`${site.url}/controls/${p.slug}`);
    expect(cite.doi).toBe(p.doi ?? null);
    expect(cite.conceptDoi).toBe(p.conceptDoi ?? null);
    expect(cite.effectiveDoi).toBe(p.doi ?? p.conceptDoi ?? site.conceptDoi);
    expect(cite.text).toContain(p.title);
    expect(cite.text).toContain(`https://doi.org/${cite.effectiveDoi}`);
    const withDoi = profileCitation({ ...p, doi: '10.5281/zenodo.1', doiVersion: p.version, conceptDoi: '10.5281/zenodo.2' });
    expect([withDoi.doi, withDoi.conceptDoi, withDoi.effectiveDoi]).toEqual(['10.5281/zenodo.1', '10.5281/zenodo.2', '10.5281/zenodo.1']);
    expect(withDoi.doiKind).toBe('profile');
    // No version DOI: the profile's concept DOI, then the project's, each labelled.
    const conceptOnly = profileCitation({ ...p, doi: undefined, doiVersion: undefined, conceptDoi: '10.5281/zenodo.2' });
    expect([conceptOnly.effectiveDoi, conceptOnly.doiKind]).toEqual(['10.5281/zenodo.2', 'profile-concept']);
    expect(conceptOnly.text).toContain('https://doi.org/10.5281/zenodo.2');
    const none = profileCitation({ ...p, doi: undefined, doiVersion: undefined, conceptDoi: undefined });
    expect([none.effectiveDoi, none.doiKind]).toEqual([site.conceptDoi, 'project-concept']);
    expect(controlsUpdated()).toBe([...profiles.map((q) => q.updated)].sort().at(-1));
  });

  test('the id range of a profile is read from its controls', () => {
    const rows = controlsIn('agent-runtime');
    expect(profileIdRange('agent-runtime')).toBe(`AIGE-CTL-AGENT-001 to ${String(rows.length).padStart(3, '0')}`);
    expect(profileIdRange('evaluation-environment')).toBe('AIGE-CTL-EVAL-001 to 009');
    expect(() => profileIdRange('no-such-profile')).toThrow();
  });
});

test.describe('mapping indexes', () => {
  test('AIUC-1: every requirement of the public index, two retired, every mapped id verified on its page', () => {
    expect(aiuc1Requirements).toHaveLength(53);
    expect(new Set(aiuc1Requirements.map((r) => r.id)).size).toBe(53);
    expect(aiuc1Requirements.filter((r) => r.retired).map((r) => r.id)).toEqual(['E007', 'E014']);
    for (const r of aiuc1Requirements) {
      expect(r.id, r.id).toMatch(/^[A-F]\d{3}$/);
      expect(r.id.startsWith(r.domain), r.id).toBe(true);
      expect(r.url, r.id).toMatch(/^https:\/\/standard\.aiuc-1\.com\//);
    }
    const mapped = new Set(controls.flatMap((c) => c.mappings.aiuc1 ?? []));
    expect(mapped.size).toBeGreaterThan(0);
    for (const id of mapped) {
      expect(aiuc1ById(id)?.retired, id).toBeUndefined();
      expect(aiuc1ById(id)?.verified, id).toMatch(/^\d{4}-\d{2}-\d{2}$/);
    }
  });

  test('NIST AI RMF: the 72 subcategories of AI 100-1, and every mapped id resolves', () => {
    const count = (fn: string) => nistAiRmfSubcategoryIndex.filter((s) => s.fn === fn).length;
    expect([count('GOVERN'), count('MAP'), count('MEASURE'), count('MANAGE')]).toEqual([19, 18, 22, 13]);
    expect(Object.keys(nistAiRmfSubcategories)).toHaveLength(72);
    for (const s of nistAiRmfSubcategoryIndex) {
      expect(s.id.startsWith(`${s.fn} `), s.id).toBe(true);
      expect(s.text.trim(), s.id).not.toBe('');
    }
    for (const id of controls.flatMap((c) => c.mappings.nistAiRmf)) expect(nistAiRmfSubcategories[id], id).toBeTruthy();
    // The short titles the pages already printed are kept.
    expect(nistAiRmfSubcategories['MEASURE 2.7']).toBe('Security and resilience are evaluated and documented');
  });
});

test.describe('registry rules: negative cases', () => {
  const registry = (): ControlRegistry => ({ profiles, controls, observationExamples });
  /** The registry with one control patched. */
  const patched = (id: string, patch: Partial<Control>): ControlRegistry => ({
    ...registry(),
    controls: controls.map((c) => (c.id === id ? { ...c, ...patch } : c)),
  });
  /** The registry with one profile patched. */
  const patchedProfile = (slug: string, patch: Partial<ControlProfile>): ControlRegistry => ({
    ...registry(),
    profiles: profiles.map((p) => (p.slug === slug ? { ...p, ...patch } : p)),
  });
  const problems = (reg: ControlRegistry) => controlRegistryProblems(reg);
  const flags = (reg: ControlRegistry, text: string) => problems(reg).some((p) => p.includes(text));
  const SPEC = 'AIGE-CTL-EVAL-002';
  const DERIVED = 'AIGE-CTL-AGENT-001';

  test('the registry as published passes', () => {
    expect(problems(registry())).toEqual([]);
  });

  test('derivedFrom names a pattern, a record schema or a chapter that exists', () => {
    const ok = patched(DERIVED, {
      derivedFrom: [
        { kind: 'pattern', ref: 'eval-gate-in-ci' },
        { kind: 'schema', ref: 'dataset-card' },
        { kind: 'chapter', ref: 'incidents' },
      ],
    });
    expect(problems(ok)).toEqual([]);
    expect(flags(patched(DERIVED, { derivedFrom: [{ kind: 'pattern', ref: 'no-such-pattern' }] }), 'unknown pattern no-such-pattern')).toBe(true);
    expect(flags(patched(DERIVED, { derivedFrom: [{ kind: 'schema', ref: 'no-such-schema' }] }), 'unknown record schema no-such-schema')).toBe(true);
    expect(flags(patched(DERIVED, { derivedFrom: [{ kind: 'chapter', ref: 'no-such-chapter' }] }), 'unknown chapter')).toBe(true);
    const twice = { kind: 'pattern', ref: 'eval-gate-in-ci' } as const;
    expect(flags(patched(DERIVED, { derivedFrom: [twice, twice] }), 'repeated derivedFrom')).toBe(true);
  });

  test('a derived control needs a seed or a derivedFrom source', () => {
    expect(flags(patched(DERIVED, { seeds: [] }), 'derived control with no seed and no derivedFrom source')).toBe(true);
    expect(problems(patched(DERIVED, { seeds: [], derivedFrom: [{ kind: 'pattern', ref: 'eval-gate-in-ci' }] }))).toEqual([]);
  });

  test('an AIUC-1 id must be in the public index and not retired', () => {
    expect(flags(patched(SPEC, { mappings: { ...controlById(SPEC)!.mappings, aiuc1: ['E007'] } }), 'is retired')).toBe(true);
    expect(flags(patched(SPEC, { mappings: { ...controlById(SPEC)!.mappings, aiuc1: ['A099'] } }), 'not in the public index')).toBe(true);
    expect(flags(patched(SPEC, { mappings: { ...controlById(SPEC)!.mappings, aiuc1: ['G001'] } }), 'malformed AIUC-1 id')).toBe(true);
  });

  test('a specified control: 2 to 4 verification steps, page title and description, one pass and one fail example', () => {
    const c = controlById(SPEC)!;
    expect(flags(patched(SPEC, { verification: c.verification.slice(0, 1) }), '2 to 4 verification steps')).toBe(true);
    const five = [...c.verification, ...c.verification, ...c.verification].slice(0, 5);
    expect(flags(patched(SPEC, { verification: five }), '2 to 4 verification steps')).toBe(true);
    expect(flags(patched(SPEC, { pageTitle: undefined }), 'no pageTitle')).toBe(true);
    expect(flags(patched(SPEC, { pageDescription: undefined }), 'no pageDescription')).toBe(true);
    expect(flags(patched(SPEC, { pageTitle: 'x'.repeat(71) }), 'pageTitle longer than 70')).toBe(true);
    expect(flags(patched(SPEC, { pageDescription: 'Too short to describe a page.' }), 'pageDescription is')).toBe(true);
    expect(flags(patched(SPEC, { pageDescription: 'y'.repeat(161) }), 'pageDescription is')).toBe(true);
    const other = controlById('AIGE-CTL-EVAL-003')!;
    expect(flags(patched(SPEC, { pageTitle: other.pageTitle }), 'duplicate pageTitle')).toBe(true);
    expect(flags(patched(SPEC, { pageDescription: other.pageDescription }), 'duplicate pageDescription')).toBe(true);
    const noFail = { ...registry(), observationExamples: observationExamples.filter((e) => !(e.controlId === SPEC && e.status === 'fail')) };
    expect(flags(noFail, 'exactly one pass and one fail')).toBe(true);
    const onStub = {
      ...registry(),
      observationExamples: [...observationExamples, { controlId: 'AIGE-CTL-EVAL-001', status: 'pass' as const, path: '/controls/examples/control-observation.aige-ctl-eval-001.pass.json' }],
    };
    const stubbed = controlById('AIGE-CTL-EVAL-001')!.depth !== 'specified';
    expect(flags(onStub, 'is not a specified control')).toBe(stubbed);
  });

  test('profile slugs crosswalk, examples and index are reserved, DOIs are well formed, prefixes are unique', () => {
    const eval_ = profiles[0];
    expect(RESERVED_PROFILE_SLUGS).toEqual(expect.arrayContaining(['crosswalk', 'examples', 'index']));
    for (const slug of RESERVED_PROFILE_SLUGS) {
      const reg: ControlRegistry = {
        ...registry(),
        profiles: [...profiles, { ...eval_, slug }],
      };
      expect(flags(reg, `slug ${slug} is reserved`), slug).toBe(true);
    }
    expect(flags(patchedProfile(eval_.slug, { doi: 'zenodo.22956197' }), 'malformed doi')).toBe(true);
    expect(flags(patchedProfile(eval_.slug, { conceptDoi: 'https://doi.org/10.5281/zenodo.1' }), 'malformed conceptDoi')).toBe(true);
    expect(
      problems(patchedProfile(eval_.slug, { doi: '10.5281/zenodo.22956197', doiVersion: eval_.version, conceptDoi: '10.5281/zenodo.22857084' })),
    ).toEqual([]);
    // A version DOI records the version it was minted for: none, or an older
    // one after a version bump, fails; so does a doiVersion with no doi.
    expect(flags(patchedProfile(eval_.slug, { doi: '10.5281/zenodo.22956197' }), 'doi was minted for v(no doiVersion)')).toBe(true);
    expect(flags(patchedProfile(eval_.slug, { doi: '10.5281/zenodo.22956197', doiVersion: '0.0.1' }), 'doi was minted for v0.0.1')).toBe(true);
    expect(flags(patchedProfile(eval_.slug, { doiVersion: eval_.version }), 'doiVersion without a doi')).toBe(true);
    // A second profile whose ids reuse the EVAL prefix.
    const copy: ControlProfile = { ...eval_, slug: 'eval-copy' };
    const copied = controlsIn(eval_.slug).map((c) => ({ ...c, profile: 'eval-copy' }));
    const reg: ControlRegistry = { ...registry(), profiles: [...profiles, copy], controls: [...controls, ...copied] };
    expect(flags(reg, 'id prefix EVAL already used by evaluation-environment')).toBe(true);
  });

  test('an "other" framework name gives a non-empty crosswalk id, and one id comes from one name', () => {
    const m = controlById(SPEC)!.mappings;
    const withOther = (other: { framework: string; ref: string }[]) => patched(SPEC, { mappings: { ...m, other: [...(m.other ?? []), ...other] } });
    expect(flags(withOther([{ framework: '---', ref: 'X-1' }]), 'has an empty id')).toBe(true);
    // "NIST SP 800-53 Rev. 5" is already used; this spelling has the same kebab id.
    expect(flags(withOther([{ framework: 'nist sp 800 53 rev 5', ref: 'AC-3' }]), 'has the id nist-sp-800-53-rev-5 of NIST SP 800-53 Rev. 5')).toBe(true);
    expect(problems(withOther([{ framework: 'NIST SP 800-53 Rev. 5', ref: 'AC-3' }]))).toEqual([]);
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
