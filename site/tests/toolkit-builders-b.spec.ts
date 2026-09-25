// toolkit-builders-b.spec.ts: the four document-building tools of block
// w2-builders-b: /toolkit/vendor-due-diligence, /toolkit/incident-clock,
// /toolkit/agent-control-profile and /toolkit/fairness-metric-chooser.
// Three layers of checks:
// 1. data (pure Node): the tools restate their chapters and registries cell by
//    cell (chapter 17's clock table and severity scale, chapter 23's autonomy
//    table and agent incident taxonomy, chapter 16's use-case table), every
//    anchor, pattern, crosswalk topic, CSA AICM id and contract clause exists;
// 2. logic (pure Node): the clocks, tiers, control sets and metric choices for
//    known inputs, and every JSON export validates against its schema;
// 3. the pages in a browser: no-JS worksheet, validation and focus, result,
//    link state, exports, re-import, no network use with what the reader
//    types, print and 390px reflow.
import { test, expect } from '@playwright/test';
import type { Download, Page } from '@playwright/test';
import { readFileSync } from 'node:fs';

import { readSource, slugify, getHeadings, splitSections } from '../src/lib/md-parse';
import { tools, toolById } from '../src/data/toolkit';
import { patterns } from '../src/data/patterns';
import { topics, refs } from '../src/data/crosswalk';
import { clauses } from '../src/data/contracts';
import {
  incidentClockData,
  incidentAnchors,
  regimes,
  severityScale,
  clockNumbers,
} from '../src/data/tool-incident-clock';
import { vendorDdData, vendorQuestions, clauseRules } from '../src/data/tool-vendor-dd';
import {
  agentControlsData,
  agentAnchors,
  autonomyLevels,
  agentControls,
  agentIncidentClasses,
} from '../src/data/tool-agent-controls';
import {
  fairnessChooserData,
  fairnessAnchors,
  useCaseRows,
  treeQuestions,
} from '../src/data/tool-fairness-chooser';
import { validateAgainst } from './helpers/schema-library';
import {
  computeClocks,
  buildRecord,
  recordGaps,
  inputFromParams,
} from '../public/toolkit/incident-clock.js';
import {
  computeRequest,
  computeTier,
  buildResponse,
  responseGaps,
  requestRows,
} from '../public/toolkit/vendor-due-diligence.js';
import { computeProfile, buildEntry, checklistRows } from '../public/toolkit/agent-control-profile.js';
import { choose, buildChoice, missing } from '../public/toolkit/fairness-metric-chooser.js';
import { addMonths, readForm } from '../public/toolkit/form-kit.js';
import { toCsv } from '../public/toolkit/lib.js';

const SITE = 'https://aigovernanceengineer.com';
const NOTICE =
  'Indicative, not legal advice and not a conformity claim. Nothing you enter leaves your browser.';
const EM_DASH = String.fromCharCode(0x2014);

/** Collapse whitespace and drop Markdown syntax, backticks and [n] citations. */
function plain(markdown: string): string {
  return markdown
    .replace(/\[([^\]]+)\]\([^)]+\)/g, '$1')
    .replace(/\*\*/g, '')
    .replace(/`/g, '')
    .replace(/\s*(\[\d+\])+/g, '')
    .replace(/\s+/g, ' ')
    .trim();
}

/** The rows (cells, plain) of the first table in the section headed `heading`
 *  in `file`. A depth-3 section runs on past the next H2 in splitSections, so
 *  the scan stops at a shallower heading and at the end of the first table. */
function tableRows(file: string, heading: string, depth = 2): string[][] {
  const section = splitSections(readSource(file), depth).find((s) => s.heading === heading);
  if (!section) throw new Error(`${file}: no section "${heading}"`);
  const shallower = new RegExp(`^#{1,${Math.max(1, depth - 1)}}\\s`);
  const table: string[] = [];
  for (const line of section.body.split('\n')) {
    if (depth > 1 && shallower.test(line)) break;
    if (line.startsWith('|')) table.push(line);
    else if (table.length) break;
  }
  return table
    .filter((line) => !/^\|\s*-/.test(line))
    .slice(1)
    .map((line) =>
      line
        .split('|')
        .slice(1, -1)
        .map((cell) => plain(cell)),
    );
}

function anchorsOf(file: string): Set<string> {
  return new Set(getHeadings(readSource(file)).map((heading) => slugify(heading.text)));
}

const titlesFor = <K extends string>(anchors: Record<K, string>) =>
  Object.fromEntries(Object.keys(anchors).map((k) => [k, k])) as Record<K, string>;

const incidentModel = incidentClockData(SITE, NOTICE, 'CC BY 4.0');
const vendorModel = vendorDdData(SITE, NOTICE, 'CC BY 4.0');
const agentModel = agentControlsData(SITE, NOTICE, 'CC BY 4.0', titlesFor(agentAnchors));
const fairnessModel = fairnessChooserData(SITE, NOTICE, 'CC BY 4.0', titlesFor(fairnessAnchors));

const AWARE = '2026-09-18T15:02:00Z';
const awareMs = Date.parse(AWARE);
const iso = (ms: number | null) => (ms === null ? null : new Date(ms).toISOString().replace('.000Z', 'Z'));
const clock = (result: ReturnType<typeof computeClocks>, regime: string) =>
  result.clocks.find((c: { regime: string }) => c.regime === regime);

// ---- 1. Data -----------------------------------------------------------------

test.describe('builders-b data', () => {
  test('the four tools are live in the registry', () => {
    for (const id of ['vendor-due-diligence', 'incident-clock', 'agent-control-profile', 'fairness-metric-chooser']) {
      const tool = toolById(id);
      expect(tool.status).toBe('live');
      expect(tool.chapter?.href).toMatch(/^\/bok\//);
    }
    expect(tools.filter((t) => t.status === 'live').length).toBeGreaterThanOrEqual(5);
  });

  test('every chapter anchor the tools link to exists', () => {
    const cases: [string, Record<string, string>][] = [
      ['bok/17-incidents.md', incidentAnchors],
      ['bok/23-governing-agents.md', agentAnchors],
      ['bok/16-fairness-explainability.md', fairnessAnchors],
    ];
    for (const [file, anchors] of cases) {
      const present = anchorsOf(file);
      for (const anchor of Object.values(anchors)) expect(present.has(anchor), `${file}#${anchor}`).toBe(true);
    }
  });

  test("the clocks restate chapter 17's table cell by cell", () => {
    const rows = tableRows('bok/17-incidents.md', 'The overlapping clocks');
    for (const regime of regimes) {
      const row = rows.find((cells) => cells[0] === regime.label);
      expect(row, regime.label).toBeTruthy();
      const [, who, trigger, first, followUp, to] = row as string[];
      expect(regime.who).toBe(who);
      expect(regime.trigger).toBe(trigger);
      expect(regime.first).toBe(first);
      expect(regime.followUp).toBe(followUp);
      expect(regime.to).toBe(to);
    }
    // The numbers the tool computes with are the ones the texts state.
    const art73 = regimes.find((r) => r.id === 'ai_act_art73')!.first;
    for (const [cls, days] of Object.entries(clockNumbers.art73Days)) {
      expect(art73, cls).toContain(`${days} days`);
    }
    const gpai = regimes.find((r) => r.id === 'ai_act_art55')!;
    for (const days of Object.values(clockNumbers.gpaiDays)) expect(gpai.first).toContain(`${days} days`);
    expect(gpai.followUp).toContain('every four weeks');
    expect(gpai.followUp).toContain(`${clockNumbers.gpaiFinalDaysAfterResolution} days`);
    expect(regimes.find((r) => r.id === 'gdpr_art33')!.first).toContain(`${clockNumbers.gdprHours} hours`);
    const nis2 = regimes.find((r) => r.id === 'nis2_art23')!;
    expect(nis2.first).toContain(`${clockNumbers.nis2EarlyWarningHours} hours`);
    expect(nis2.first).toContain(`${clockNumbers.nis2NotificationHours} hours`);
    expect(nis2.followUp).toContain('one month');
    const dora = regimes.find((r) => r.id === 'dora_art19')!;
    expect(dora.first).toContain(`${clockNumbers.doraAfterClassificationHours} hours of classification`);
    expect(dora.first).toContain(`${clockNumbers.doraAfterAwarenessHours} hours from awareness`);
    expect(dora.followUp).toContain(`${clockNumbers.doraIntermediateHours} hours`);
  });

  test("the severity scale restates chapter 17's table", () => {
    const rows = tableRows('bok/17-incidents.md', 'A severity scale mapped to the clocks');
    expect(rows).toHaveLength(severityScale.length);
    severityScale.forEach((level, i) => {
      const [name, harm, , oecd, response] = rows[i];
      expect(name).toBe(level.id === 'ISSUE' ? 'Issue' : `${level.id} ${level.name}`);
      expect(level.harmTest).toBe(harm);
      expect(level.response).toBe(response);
      const first = oecd.split(';')[0].trim().toLowerCase().replace(/\s+/g, '_');
      expect(level.oecd).toBe(first === 'not_an_event' ? 'other' : first);
    });
  });

  test('vendor requests map only to crosswalk topics, crosswalk CSA AICM ids and real clauses', () => {
    const topicIds = new Set(topics.map((t) => t.id));
    const aicm = new Set(refs.filter((r) => r.framework === 'csa-aicm').map((r) => r.ref));
    const clauseIds = new Set(clauses.map((c) => c.id));
    const ids = vendorQuestions.map((q) => q.id);
    expect(new Set(ids).size).toBe(ids.length);
    expect(vendorQuestions.length).toBeGreaterThanOrEqual(30);
    expect(vendorQuestions.length).toBeLessThanOrEqual(40);
    for (const q of vendorQuestions) {
      expect(q.id).toMatch(/^VDD-\d{2}$/);
      for (const t of q.topics) expect(topicIds.has(t), `${q.id} topic ${t}`).toBe(true);
      for (const c of q.aicm) expect(aicm.has(c), `${q.id} AICM ${c}`).toBe(true);
      for (const c of q.clauses ?? []) expect(clauseIds.has(c), `${q.id} clause ${c}`).toBe(true);
      expect(q.ask.endsWith('.')).toBe(true);
    }
    for (const id of Object.keys(clauseRules)) expect(clauseIds.has(id), id).toBe(true);
    // The artefacts the brief names are all asked for somewhere.
    const text = vendorQuestions.map((q) => `${q.ask} ${q.artefact}`).join(' ').toLowerCase();
    for (const artefact of ['model or system card', 'bill of materials', 'evaluation reports', 'red-team', 'in hours', 'training-content summary', 'public summary of the content', 'copyright policy', 'sub-processors']) {
      expect(text, artefact).toContain(artefact);
    }
  });

  test("the autonomy levels restate chapter 23's table", () => {
    const rows = tableRows('bok/23-governing-agents.md', 'Autonomy is a design decision', 3);
    expect(rows).toHaveLength(autonomyLevels.length);
    const keywords: Record<string, string> = {
      'registry-entry': 'Registry entry',
      'own-identity': 'own identity',
      'read-only-tools': 'read-only tools',
      traces: 'traces',
      'tool-allow-list': 'tool allow-list',
      'checkpoint-before-writes': 'checkpoint before every write',
      'guardrail-every-call': 'runtime guardrail on every tool call',
      'execution-budgets': 'execution budgets',
      'approval-log': 'approval log',
      'per-agent-breaker': 'per-agent circuit breaker',
      'drilled-kill-switch': 'drilled kill switch',
      'trajectory-anomaly': 'trajectory anomaly detection',
      'trajectory-evals': 'independent trajectory evals',
      'reversible-only': 'reversible, bounded actions only',
    };
    autonomyLevels.forEach((level, i) => {
      const [name, imda, atf, person, minimum] = rows[i];
      expect(name).toBe(level.name);
      expect(imda).toBe(level.imda);
      expect(atf).toBe(level.atf);
      expect(person).toBe(level.person);
      for (const id of level.adds) expect(minimum, `${level.id} ${id}`).toContain(keywords[id]);
    });
  });

  test("the agent incident classes restate chapter 23's taxonomy", () => {
    const rows = tableRows('bok/23-governing-agents.md', 'An agent incident taxonomy', 3);
    expect(rows).toHaveLength(agentIncidentClasses.length);
    agentIncidentClasses.forEach((c, i) => {
      const [name, , signal, containment, ids] = rows[i];
      expect(c.name).toBe(name);
      expect(c.signal).toBe(signal);
      expect(c.containment).toBe(containment);
      expect(ids.split(';')[0].trim()).toBe(c.threat);
    });
  });

  test('every agent control links to a real pattern and section', () => {
    const slugs = new Set(patterns.map((p) => p.slug));
    for (const control of agentControls) {
      if (control.pattern) expect(slugs.has(control.pattern), control.id).toBe(true);
      expect(Object.keys(agentAnchors)).toContain(control.anchor);
      for (const threat of control.threats ?? []) expect(threat).toMatch(/^ASI(0[1-9]|10)$/);
    }
  });

  test("the fairness use-case rows restate chapter 16's table", () => {
    const rows = tableRows('bok/16-fairness-explainability.md', 'Choosing a fairness metric by use case');
    expect(rows).toHaveLength(useCaseRows.length);
    useCaseRows.forEach((row, i) => {
      expect([row.useCase, row.harm, row.costliest, row.primary, row.secondary, row.legal]).toEqual(rows[i]);
    });
    for (const question of treeQuestions) expect(Object.keys(fairnessAnchors)).toContain(question.anchor);
  });
});

// ---- 2. Logic ------------------------------------------------------------------

test.describe('builders-b logic', () => {
  test("incident clock: the chapter's csa-01 replay", () => {
    // A non-high-risk assistant discloses one customer's address: GDPR Art. 33
    // runs 72 hours from awareness; Art. 34 not triggered; AI Act not applicable.
    const result = computeClocks(incidentModel, {
      awareMs,
      roles: ['provider', 'deployer', 'controller', 'nis2'],
      tier: 'not-high-risk',
      facts: ['breach'],
      determinations: [],
      conditions: [],
    });
    expect(result.severity.id).toBe('SEV-3');
    expect(clock(result, 'gdpr_art33').status).toBe('due');
    expect(iso(clock(result, 'gdpr_art33').steps[0].dueMs)).toBe('2026-09-21T15:02:00Z');
    expect(clock(result, 'gdpr_art34').status).toBe('not-triggered');
    expect(clock(result, 'ai_act_art73').status).toBe('not-applicable');
    expect(clock(result, 'nis2_art23').status).toBe('assess');
    expect(iso(clock(result, 'nis2_art23').steps[0].dueMs)).toBe('2026-09-19T15:02:00Z');
    expect(iso(clock(result, 'nis2_art23').steps[1].dueMs)).toBe('2026-09-21T15:02:00Z');
    expect(iso(clock(result, 'nis2_art23').steps[3].dueMs)).toBe('2026-10-21T15:02:00Z');
    expect(result.open.map((c: { regime: string }) => c.regime)).toEqual(['nis2_art23', 'gdpr_art33']);
  });

  test('incident clock: Art. 73 takes the shortest limit and waits for the Omnibus dates', () => {
    const base = { roles: ['provider'], tier: 'annex-iii', determinations: ['causal-link'], conditions: [] };
    const early = computeClocks(incidentModel, { ...base, awareMs, facts: ['fundamental-rights', 'death'] });
    const art73 = clock(early, 'ai_act_art73');
    expect(art73.status).toBe('pending');
    expect(art73.rationale).toContain('2027-12-02');
    expect(iso(art73.steps[0].dueMs)).toBe('2026-09-28T15:02:00Z'); // 10 days (death)
    const later = Date.parse('2028-01-10T09:00:00Z');
    const two = computeClocks(incidentModel, { ...base, awareMs: later, facts: ['critical-infrastructure', 'death'] });
    expect(clock(two, 'ai_act_art73').status).toBe('due');
    expect(iso(clock(two, 'ai_act_art73').steps[0].dueMs)).toBe('2028-01-12T09:00:00Z'); // 2 days
    const fifteen = computeClocks(incidentModel, { ...base, awareMs: later, facts: ['health'] });
    expect(iso(clock(fifteen, 'ai_act_art73').steps[0].dueMs)).toBe('2028-01-25T09:00:00Z');
    // Equivalent sectoral reporting limits Art. 73 to Art. 3(49)(c).
    const limited = computeClocks(incidentModel, { ...base, awareMs: later, facts: ['health'], conditions: ['equivalent-reporting'] });
    expect(clock(limited, 'ai_act_art73').status).toBe('not-triggered');
    // A deployer who cannot reach the provider inherits the clock.
    const deployer = computeClocks(incidentModel, { ...base, roles: ['deployer'], awareMs: later, facts: ['health'], conditions: ['provider-unreachable'] });
    expect(clock(deployer, 'ai_act_art73').status).toBe('due');
    expect(clock(deployer, 'ai_act_art26_5').steps[0].text).toBe('Immediately');
    const annexI = computeClocks(incidentModel, { ...base, tier: 'annex-i', awareMs: Date.parse('2028-03-01T00:00:00Z'), facts: ['health'] });
    expect(clock(annexI, 'ai_act_art73').status).toBe('pending');
  });

  test('incident clock: GPAI, DORA and processor paths', () => {
    const later = Date.parse('2028-01-10T09:00:00Z');
    const result = computeClocks(incidentModel, {
      awareMs: later,
      classifiedMs: Date.parse('2028-01-10T12:00:00Z'),
      roles: ['gpai-provider', 'dora', 'processor'],
      tier: 'not-high-risk',
      facts: ['model-cyber', 'breach'],
      determinations: ['dora-major'],
      conditions: [],
    });
    const gpai = clock(result, 'ai_act_art55');
    expect(iso(gpai.steps[0].dueMs)).toBe('2028-01-15T09:00:00Z'); // 5 days, cyber
    expect(iso(gpai.steps[1].dueMs)).toBe('2028-02-12T09:00:00Z'); // + 4 weeks
    const dora = clock(result, 'dora_art19');
    expect(iso(dora.steps[0].dueMs)).toBe('2028-01-10T16:00:00Z'); // 4 h after classification
    expect(iso(dora.steps[1].dueMs)).toBe('2028-01-13T16:00:00Z');
    expect(iso(dora.steps[2].dueMs)).toBe('2028-02-13T16:00:00Z');
    const processor = clock(result, 'gdpr_art33');
    expect(processor.to).toBe('The controller');
    expect(processor.steps[0].text).toBe('Without undue delay');
    // Without a classification time, DORA's outer limit is 24 hours.
    const outer = computeClocks(incidentModel, { awareMs: later, roles: ['dora'], tier: 'not-high-risk', facts: ['limited'], determinations: [], conditions: [] });
    expect(iso(clock(outer, 'dora_art19').steps[0].dueMs)).toBe('2028-01-11T09:00:00Z');
    expect(new Date(addMonths(Date.parse('2027-01-31T10:00:00Z'), 1)).toISOString()).toBe('2027-02-28T10:00:00.000Z');
  });

  test('incident clock: the record skeleton validates against incident-record.v1', () => {
    const params = {
      v: '1',
      at: AWARE,
      cl: '2026-09-18T18:00:00Z',
      r: 'provider,controller,nis2',
      t: 'annex-iii',
      f: 'fundamental-rights,high-risk-breach',
      d: 'causal-link',
      rsy: 'csa 01',
      rsv: '2026-09-18',
      ror: 'Example Retail',
      rev: 'https://evidence.example.org/traces/1, not a url',
      rco: 'ES, PT',
      rre: 'direct_cause',
    };
    const result = computeClocks(incidentModel, inputFromParams(params));
    const record = buildRecord(incidentModel, params, result, { now: new Date('2026-09-18T16:00:00Z') });
    expect(validateAgainst('incident-record', record)).toEqual([]);
    expect(record.ai_systems).toEqual(['csa-01@2026-09-18']);
    expect(record.supporting_materials).toEqual(['https://evidence.example.org/traces/1']);
    expect(record.severity).toBe('serious_incident');
    expect(record.reporting.obligations).toHaveLength(7);
    const clockExt = record.extensions['aige.incident-clock'] as unknown as { kind: string; inputs: Record<string, string> };
    expect(clockExt.kind).toBe('aige.incident-clock');
    expect(clockExt.inputs.at).toBe(AWARE);
    expect(JSON.stringify(record)).not.toContain(EM_DASH);
    expect(recordGaps({})).toHaveLength(3);
    expect(recordGaps(params)).toEqual([]);
  });

  test('vendor due diligence: tiers, request sizes and a valid response record', () => {
    const low = { vn: 'V', pn: 'P', s: 'saas', u: 'internal', dc: 'public', a: 'none', j: 'us' };
    const high = { vn: 'V', pn: 'P', s: 'model-api', u: 'people', dc: 'personal', a: 'reads', j: 'eu' };
    const critical = { vn: 'V', pn: 'P', s: 'agent', u: 'people', dc: 'special', a: 'external', j: 'eu,us', sc: 'dora,gpai' };
    const open = { vn: 'V', pn: 'P', s: 'open-weights', u: 'customer', dc: 'confidential', a: 'none', j: 'eu', sc: 'nis2' };
    const sizes = [low, high, critical, open].map((p) => computeRequest(vendorModel, p));
    expect(sizes.map((r) => r.tier.tier)).toEqual(['low', 'high', 'critical', 'medium']);
    for (const r of sizes) {
      expect(r.questions.length).toBeGreaterThanOrEqual(20);
      expect(r.questions.length).toBeLessThanOrEqual(40);
    }
    expect(sizes[1].questions.map((q: { id: string }) => q.id)).toEqual(expect.arrayContaining(['VDD-07', 'VDD-12', 'VDD-13', 'VDD-17', 'VDD-31']));
    expect(sizes[0].questions.map((q: { id: string }) => q.id)).not.toContain('VDD-12');
    expect(sizes[3].licences.length).toBeGreaterThan(0);
    expect(sizes[3].questions.map((q: { id: string }) => q.id)).toContain('VDD-35');
    expect(computeTier(vendorModel, { use: 'safety', data: 'public', autonomy: 'none', jurisdiction: [], sector: [] }).tier).toBe('critical');

    const answered = {
      ...high,
      rq: 'Claims platform',
      xr: 'VDD-01,VDD-04',
      xd: '2026-09-20',
      xp: 'gpai_provider',
      xc: 'gpai',
      xt: 'no',
      xo: 'yes',
      xh: '48',
      xn: '90',
      xa: 'yes',
      xe: 'approve_with_conditions',
      xk: 'Pin the model version\nNotice window of 24 hours',
      xv: 'AI governance lead',
      xw: '2026-09-24',
      xb: '2027-03-24',
    };
    expect(responseGaps({})).toHaveLength(8);
    expect(responseGaps(answered)).toEqual([]);
    const record = buildResponse(vendorModel, answered, sizes[1], { now: new Date('2026-09-24T10:00:00Z') });
    expect(validateAgainst('vendor-due-diligence-response', record)).toEqual([]);
    expect(record.assessment.risk_tier).toBe('high');
    expect(record.assessment.conditions).toEqual(['Pin the model version', 'Notice window of 24 hours']);
    expect(record.open_questions.length).toBe(sizes[1].questions.length - 2);
    expect(record.extensions['aige.vendor-due-diligence'].version).toBe(1);
    const csv = toCsv(requestRows(sizes[1], answered));
    expect(csv.split('\r\n')[0]).toBe('type,id,area,request,artefact,crosswalk_topics,csa_aicm,response_field,contract_clauses,received_with_evidence');
    expect(csv).toContain('request,VDD-01,');
    expect(csv).toContain('clause,no-training,');
  });

  test('agent control profile: controls, gaps and a valid register entry', () => {
    const params = {
      aid: 'Refunds Agent',
      own: 'support-platform',
      exp: '2026-12-17',
      al: 'approver',
      idm: 'static-key',
      t1: 'orders.read',
      s1: 'mcp-remote',
      o1: 'read',
      c1: 'orders:read',
      d1: 'confidential',
      t2: 'refunds.create',
      s2: 'api',
      o2: 'pay',
      c2: 'refunds:write',
      k2: 'amount_eur > 200',
      mem: 'session,long-term',
      pd: 'yes',
      ma: 'internal',
      ext: 'messages',
      cp: 'irreversible',
      kso: 'platform-on-call',
      ksd: '2026-09-10',
      sa: '5000',
      scur: 'EUR',
      sper: 'per_day',
      wid: 'spiffe://corp.example/agents/refunds-agent',
      ttl: '300',
      hr: 'no',
    };
    const profile = computeProfile(agentModel, params);
    const ids = profile.controls.map((c: { id: string }) => c.id);
    expect(ids).toEqual(expect.arrayContaining([
      'registry-entry', 'own-identity', 'traces', 'tool-allow-list', 'guardrail-every-call',
      'execution-budgets', 'approval-log', 'per-agent-breaker', 'drilled-kill-switch',
      'checkpoint-irreversible', 'egress-filter', 'mcp-admission', 'mcp-authorization',
      'short-lived-credentials', 'memory-governance', 'memory-personal-data', 'hop-accountability',
      'prompt-change-control', 'otel-telemetry', 'ai-disclosure',
    ]));
    expect(ids).not.toContain('read-only-tools');
    expect(ids).not.toContain('checkpoint-before-writes');
    expect(ids).not.toContain('ai-act-high-risk');
    expect(profile.gaps.join(' ')).toContain('AML.T0083');
    const entry = buildEntry(agentModel, params, profile, { now: new Date('2026-09-24T10:00:00Z') }) as unknown as {
      id: string;
      autonomy_level: string;
      scope: string[];
      tools: { requires_approval: boolean }[];
      kill_switch: { last_drill: string };
    };
    expect(validateAgainst('agent-register-entry', entry)).toEqual([]);
    expect(entry.id).toBe('refunds-agent');
    expect(entry.autonomy_level).toBe('act_with_approval');
    expect(entry.scope).toEqual(['orders:read', 'refunds:write']);
    expect(entry.tools[1].requires_approval).toBe(true);
    expect(entry.kill_switch.last_drill).toBe('2026-09-10');

    // An Operator with write tools and the user's token: two gaps.
    const operator = computeProfile(agentModel, { ...params, al: 'operator', idm: 'user-token', cp: '' });
    expect(operator.controls.map((c: { id: string }) => c.id)).toContain('read-only-tools');
    expect(operator.gaps.length).toBe(2);
    expect(validateAgainst('agent-register-entry', buildEntry(agentModel, { aid: 'x', own: 'o', exp: '2026-12-31', al: 'operator', idm: 'workload', t1: 'search', o1: 'read' }, computeProfile(agentModel, { aid: 'x', own: 'o', exp: '2026-12-31', al: 'operator', idm: 'workload', t1: 'search', o1: 'read' })))).toEqual([]);
    const rows = checklistRows(agentModel, profile);
    expect(rows[0][0]).toBe('type');
    expect(rows.length).toBe(1 + profile.controls.length + profile.gaps.length);
  });

  test('fairness chooser: the tree follows the chapter', () => {
    const r1 = choose(fairnessModel, { harm: 'allocation', truth: 'labels', error: 'miss', frame: 'us-employment', attribute: 'available' });
    expect(r1.primary.map((m: { id: string }) => m.id)).toEqual(['equal-opportunity', 'demographic-parity']);
    expect(r1.row.id).toBe('cv');
    expect(r1.notes.map((n: { id: string }) => n.id)).toEqual(expect.arrayContaining(['four-fifths', 'us-employment', 'impossibility', 'record-first']));
    const r2 = choose(fairnessModel, { harm: 'allocation', truth: 'proxy', error: 'score', frame: 'clinical', attribute: 'restricted' });
    expect(r2.primary.find((m: { id: string }) => m.id === 'calibration').stage).toBe('after-label-review');
    expect(r2.primary.find((m: { id: string }) => m.id === 'demographic-parity').stage).toBe('now');
    expect(r2.notes[0].id).toBe('label-first');
    const r3 = choose(fairnessModel, { harm: 'generative', truth: 'none', frame: 'general', attribute: 'unavailable' });
    expect(r3.primary.map((m: { id: string }) => m.id)).toEqual(['counterfactual-flip', 'quality-floor']);
    expect(r3.row.id).toBe('generative');
    const r4 = choose(fairnessModel, { harm: 'allocation', truth: 'none', error: 'wrongful', frame: 'benefits', attribute: 'available' });
    expect(r4.primary.find((m: { id: string }) => m.id === 'fpr-parity').stage).toBe('once-outcomes-arrive');
    expect(missing({ harm: 'allocation' })).toHaveLength(4);
    expect(missing({ harm: 'quality', truth: 'labels', frame: 'general', attribute: 'available' })).toEqual([]);
    const json = buildChoice(fairnessModel, { harm: 'allocation', truth: 'labels', error: 'both', frame: 'credit', attribute: 'available' }, choose(fairnessModel, { harm: 'allocation', truth: 'labels', error: 'both', frame: 'credit', attribute: 'available' }));
    expect(json.kind).toBe('aige.fairness-metric-choice');
    expect(json.primary.map((m: { metric: string }) => m.metric)).toEqual(['equalised-odds', 'calibration', 'demographic-parity']);
    for (const m of json.primary) expect(m.section).toMatch(/^https:\/\/aigovernanceengineer\.com\/bok\/fairness-and-explainability#/);
  });

  test('no em dash in the data or the client modules', () => {
    for (const file of [
      'src/data/tool-incident-clock.ts',
      'src/data/tool-vendor-dd.ts',
      'src/data/tool-agent-controls.ts',
      'src/data/tool-fairness-chooser.ts',
      'public/toolkit/form-kit.js',
      'public/toolkit/incident-clock.js',
      'public/toolkit/vendor-due-diligence.js',
      'public/toolkit/agent-control-profile.js',
      'public/toolkit/fairness-metric-chooser.js',
    ]) {
      expect(readFileSync(file, 'utf8'), file).not.toContain(EM_DASH);
    }
    expect(typeof readForm).toBe('function');
  });
});

// ---- 3. Pages -------------------------------------------------------------------

async function saved(download: Download): Promise<Buffer> {
  const path = await download.path();
  expect(path).toBeTruthy();
  return readFileSync(path as string);
}

async function download(page: Page, name: string): Promise<{ file: Download; body: string }> {
  const [file] = await Promise.all([
    page.waitForEvent('download'),
    page.getByRole('button', { name, exact: true }).click(),
  ]);
  return { file, body: (await saved(file)).toString('utf8') };
}

const PAGES = [
  '/toolkit/vendor-due-diligence',
  '/toolkit/incident-clock',
  '/toolkit/agent-control-profile',
  '/toolkit/fairness-metric-chooser',
];

test.describe('builders-b pages without JavaScript', () => {
  test.use({ javaScriptEnabled: false });

  for (const path of PAGES) {
    test(`${path} teaches without JavaScript`, async ({ page }) => {
      await page.goto(path);
      await expect(page.locator('#tool-notice')).toHaveText(NOTICE);
      await expect(page.locator('[data-tool-nojs]')).toBeVisible();
      await expect(page.locator('.tool-guide h2').first()).toBeVisible();
      await expect(page.locator('.tool-sources li').first()).toBeVisible();
      await expect(page.locator('.tool-buttons button[type="submit"]').first()).toBeHidden();
    });
  }

  test('the incident clock shows the verify notice and the whole clock table', async ({ page }) => {
    await page.goto('/toolkit/incident-clock');
    await expect(page.locator('#ic-verify')).toContainText('Verify with counsel or the authority');
    await expect(page.locator('#ic-table ~ .tool-table-wrap tbody tr, .tool-guide table').first()).toBeVisible();
    await expect(page.getByRole('cell', { name: 'Early warning within 24 hours; incident notification within 72 hours' })).toBeVisible();
  });

  test('the vendor page lists the whole question bank', async ({ page }) => {
    await page.goto('/toolkit/vendor-due-diligence');
    await expect(page.locator('.tool-guide [id^="vdd-q-VDD-"]')).toHaveCount(vendorQuestions.length);
  });
});

test.describe('/toolkit/incident-clock', () => {
  const TOOL = '/toolkit/incident-clock';
  const LINK = `${TOOL}#v=1&at=${encodeURIComponent(AWARE)}&r=provider,controller,nis2&t=not-high-risk&f=breach&rsy=csa-01&ror=Example%20Retail&rev=${encodeURIComponent('https://evidence.example.org/t/1')}`;

  test('validates, then shows the clocks and writes the link', async ({ page }) => {
    await page.goto(TOOL);
    await page.getByRole('button', { name: 'Show the clocks', exact: true }).click();
    const summary = page.locator('#ic-errors');
    await expect(summary).toBeFocused();
    await expect(summary.locator('li')).toHaveCount(4);
    await expect(page.locator('#ic-at')).toHaveAttribute('aria-invalid', 'true');

    await page.locator('#ic-at').fill('2026-09-18T15:02');
    await page.locator('label[for="ic-r-controller"]').click();
    await page.locator('label[for="ic-t-not-high-risk"]').click();
    await page.locator('label[for="ic-f-breach"]').click();
    await page.getByRole('button', { name: 'Show the clocks', exact: true }).click();
    await expect(page.locator('#ic-result-title')).toBeFocused();
    await expect(page.locator('[data-ic-class]')).toContainText('SEV-3 Moderate');
    await expect(page.locator('[data-ic-rows] tr[data-regime="gdpr_art33"]')).toHaveCount(1);
    expect(new URL(page.url()).hash).toContain('f=breach');
  });

  test('reproduces the result from the link and exports what it promises', async ({ page }) => {
    await page.goto(LINK);
    await expect(page.locator('[data-ic-result]')).toBeVisible();
    await expect(page.locator('[data-ic-rows] tr')).toHaveCount(5); // NIS2 (4 steps) + GDPR Art. 33

    const ics = await download(page, 'Download reminders (.ics)');
    expect(ics.file.suggestedFilename()).toMatch(/^incident-clock-csa-01-2026-09-18\.ics$/);
    expect(ics.body.startsWith('BEGIN:VCALENDAR\r\n')).toBe(true);
    expect(ics.body.match(/BEGIN:VEVENT/g)?.length).toBe(4);
    expect(ics.body).toContain('GDPR Art. 33');
    // Timed events at the deadline (UTC), busy, each with a display alarm, and
    // one UID per event (RFC 5545 sections 3.6.6 and 3.8.4.7).
    const icsLines = ics.body.replace(/\r\n /g, '').split('\r\n');
    expect(icsLines).toContain('DTSTART:20260919T150200Z'); // NIS2 early warning, 24 h
    expect(icsLines.some((l) => l.startsWith('DTSTART;VALUE=DATE'))).toBe(false);
    expect(icsLines.filter((l) => l === 'TRANSP:OPAQUE')).toHaveLength(4);
    expect(icsLines.filter((l) => l === 'TRIGGER:-PT1H')).toHaveLength(4);
    const icsUids = icsLines.filter((l) => l.startsWith('UID:'));
    expect(new Set(icsUids).size).toBe(4);

    const json = await download(page, 'Download record skeleton (JSON)');
    const record = JSON.parse(json.body);
    expect(validateAgainst('incident-record', record)).toEqual([]);
    expect(record.reporting.became_aware_at).toBe(AWARE);

    const md = await download(page, 'Download summary (Markdown)');
    expect(md.body).toContain(`> ${NOTICE}`);
    expect(md.body).toContain('**Verify with counsel or the authority.**');
    expect(md.body).not.toContain(EM_DASH);

    // Round trip: the record reopens and restores the inputs.
    await page.goto(TOOL);
    await page.locator('#ic-import').setInputFiles({ name: 'record.json', mimeType: 'application/json', buffer: Buffer.from(json.body) });
    await expect(page.locator('[data-ic-result]')).toBeVisible();
    await expect(page.locator('#ic-rsy')).toHaveValue('csa-01');
  });

  test('refuses a record export without evidence and names the gap', async ({ page }) => {
    await page.goto(LINK.replace(/&rev=[^&]+/, ''));
    await expect(page.locator('[data-ic-result]')).toBeVisible();
    await page.getByRole('button', { name: 'Download record skeleton (JSON)', exact: true }).click();
    await expect(page.locator('#ic-errors')).toBeFocused();
    await expect(page.locator('#ic-rev-error')).toBeVisible();
  });
});

test.describe('/toolkit/vendor-due-diligence', () => {
  const TOOL = '/toolkit/vendor-due-diligence';
  const LINK = `${TOOL}#v=1&vn=Acme%20AI&pn=Claims%20Assistant&s=model-api&u=people&dc=personal&a=reads&j=eu`;

  test('builds the request and records a valid response', async ({ page }) => {
    await page.goto(TOOL);
    await page.getByRole('button', { name: 'Build the request', exact: true }).click();
    await expect(page.locator('#vdd-errors')).toBeFocused();
    await expect(page.locator('#vdd-errors li')).toHaveCount(7);

    await page.goto(LINK);
    await expect(page.locator('[data-vdd-result]')).toBeVisible();
    await expect(page.locator('[data-vdd-tier]')).toContainText('Risk tier: high');
    const count = await page.locator('[data-vdd-questions] [data-question]').count();
    expect(count).toBeGreaterThanOrEqual(20);
    expect(count).toBeLessThanOrEqual(40);
    await expect(page.locator('[data-vdd-questions] a[href^="/resources/crosswalk#topic-"]').first()).toBeVisible();
    await expect(page.locator('[data-vdd-clauses] a[href^="/resources/contracts#clause-"]').first()).toBeVisible();

    const md = await download(page, 'Download request (Markdown)');
    expect(md.body).toContain('# AI due-diligence request: Claims Assistant (Acme AI)');
    expect(md.body).toContain(`> ${NOTICE}`);
    const csv = await download(page, 'Download requests and clauses (CSV)');
    expect(csv.body.split('\r\n')[0]).toContain('csa_aicm');

    // The JSON needs the answers first.
    await page.getByRole('button', { name: 'Download response record (JSON)', exact: true }).click();
    await expect(page.locator('#vdd-response-errors')).toBeFocused();
    await page.locator('label[for="vdd-rx-VDD-01"]').click();
    await page.locator('#vdd-xd').fill('2026-09-20');
    await page.locator('#vdd-xp').selectOption('provider');
    await page.locator('#vdd-xt').selectOption('no');
    await page.locator('#vdd-xh').fill('48');
    await page.locator('#vdd-xe').selectOption('approve_with_conditions');
    await page.locator('#vdd-xv').fill('AI governance lead');
    await page.locator('#vdd-xw').fill('2026-09-24');
    await page.locator('#vdd-xb').fill('2027-03-24');
    const json = await download(page, 'Download response record (JSON)');
    const record = JSON.parse(json.body);
    expect(validateAgainst('vendor-due-diligence-response', record)).toEqual([]);
    expect(record.vendor.name).toBe('Acme AI');
    expect(record.open_questions).toHaveLength(count - 1);
    expect(new URL(page.url()).hash).toContain('xr=VDD-01');
  });
});

test.describe('/toolkit/agent-control-profile', () => {
  const TOOL = '/toolkit/agent-control-profile';
  const LINK = `${TOOL}#v=1&aid=refunds-agent&own=support-platform&exp=2026-12-17&al=approver&idm=static-key&t1=orders.read&s1=mcp-remote&o1=read&c1=orders:read&t2=refunds.create&s2=api&o2=pay&c2=refunds:write&k2=amount_eur%20%3E%20200&cp=irreversible&kso=platform-on-call`;

  test('validates, derives the controls and exports a valid register entry', async ({ page }) => {
    await page.goto(TOOL);
    await expect(page.locator('[data-acp-tool]:visible')).toHaveCount(2);
    await page.getByRole('button', { name: 'Build the profile', exact: true }).click();
    await expect(page.locator('#acp-errors')).toBeFocused();
    await expect(page.locator('#acp-errors li')).toHaveCount(6);

    await page.goto(LINK);
    await expect(page.locator('[data-acp-result]')).toBeVisible();
    await expect(page.locator('[data-acp-controls] [data-control="mcp-admission"]')).toHaveCount(1);
    await expect(page.locator('[data-acp-controls] [data-control="checkpoint-irreversible"]')).toHaveCount(1);
    await expect(page.locator('[data-acp-gaps]')).toContainText('static API key');
    await expect(page.locator('[data-acp-controls] a[href="/patterns/runtime-guardrail"]').first()).toBeVisible();
    await expect(page.locator('[data-acp-tool]:visible')).toHaveCount(3);

    const json = await download(page, 'Download register entry (JSON)');
    const entry = JSON.parse(json.body);
    expect(validateAgainst('agent-register-entry', entry)).toEqual([]);
    expect(entry.extensions['aige.agent-control-profile'].autonomy_level).toBe('approver');
    const md = await download(page, 'Download checklist (Markdown)');
    expect(md.body).toContain('# Agent control profile: refunds-agent');
    expect(md.body).toContain('- [ ] **Registry entry.**');
    const csv = await download(page, 'Download checklist (CSV)');
    expect(csv.body.split('\r\n')[0]).toBe('type,id,title,why,rule,evidence,pattern,chapter_section,threats,done');
  });
});

test.describe('/toolkit/fairness-metric-chooser', () => {
  const TOOL = '/toolkit/fairness-metric-chooser';

  test('walks the tree and links every result to chapter 16', async ({ page }) => {
    await page.goto(TOOL);
    await expect(page.locator('#fmc-error')).toBeHidden();
    await page.getByRole('button', { name: 'Choose the metrics', exact: true }).click();
    await expect(page.locator('#fmc-errors')).toBeFocused();
    await expect(page.locator('#fmc-errors li')).toHaveCount(4);

    await page.locator('label[for="fmc-harm-allocation"]').click();
    await expect(page.locator('#fmc-error')).toBeVisible();
    await page.locator('label[for="fmc-truth-labels"]').click();
    await page.locator('label[for="fmc-error-miss"]').click();
    await page.locator('label[for="fmc-frame-us-employment"]').click();
    await page.locator('label[for="fmc-attribute-available"]').click();
    await page.getByRole('button', { name: 'Choose the metrics', exact: true }).click();
    await expect(page.locator('#fmc-result-title')).toBeFocused();
    await expect(page.locator('[data-fmc-primary] [data-metric]')).toHaveCount(2);
    await expect(page.locator('[data-fmc-notes] [data-note="four-fifths"]')).toHaveCount(1);
    const links = page.locator('[data-fmc-result] a[href^="/bok/fairness-and-explainability#"]');
    expect(await links.count()).toBeGreaterThan(5);

    const json = await download(page, 'Download choice (JSON)');
    const choice = JSON.parse(json.body);
    expect(choice.kind).toBe('aige.fairness-metric-choice');
    expect(choice.primary[0].metric).toBe('equal-opportunity');
    const md = await download(page, 'Download choice (Markdown)');
    expect(md.body).toContain('## For the Policy Card');

    // The link reproduces the answers; a harm without allocation drops the error question.
    await page.goto(`${TOOL}#v=1&harm=generative&truth=none&frame=general&attribute=unavailable`);
    await expect(page.locator('[data-fmc-primary] [data-metric="counterfactual-flip"]')).toHaveCount(1);
    await expect(page.locator('#fmc-error')).toBeHidden();
  });
});

test.describe('builders-b pages in the browser', () => {
  test('send nothing the reader types', async ({ page }) => {
    const requests: string[] = [];
    await page.goto('/toolkit/vendor-due-diligence');
    await page.waitForLoadState('networkidle');
    page.on('request', (request) => requests.push(request.url()));
    await page.locator('#vdd-vn').fill('Secretvendor');
    await page.locator('#vdd-pn').fill('Hiddenproduct');
    for (const id of ['vdd-supply-saas', 'vdd-use-internal', 'vdd-data-public', 'vdd-autonomy-none', 'vdd-j-eu']) {
      await page.locator(`label[for="${id}"]`).click();
    }
    await page.getByRole('button', { name: 'Build the request', exact: true }).click();
    await expect(page.locator('[data-vdd-result]')).toBeVisible();
    await download(page, 'Download request (Markdown)');
    const origin = new URL(page.url()).origin;
    for (const url of requests) {
      if (/^(blob|data):/.test(url)) continue;
      expect(new URL(url).origin, url).toBe(origin);
      expect(url).not.toContain('Secretvendor');
      expect(url).not.toContain('Hiddenproduct');
    }
  });

  test('prints the incident result without controls', async ({ page }) => {
    await page.goto(`/toolkit/incident-clock#v=1&at=${encodeURIComponent(AWARE)}&r=controller&t=not-high-risk&f=breach`);
    await expect(page.locator('[data-ic-result]')).toBeVisible();
    await page.emulateMedia({ media: 'print' });
    await expect(page.locator('[data-ic-result] .tool-actions')).toBeHidden();
    await expect(page.locator('[data-ic-form]')).toBeHidden();
    await expect(page.locator('#tool-notice')).toBeVisible();
    await expect(page.locator('#ic-verify')).toBeVisible();
  });

  for (const path of PAGES) {
    test(`no horizontal scroll at 390px on ${path}`, async ({ page }) => {
      await page.setViewportSize({ width: 390, height: 844 });
      await page.goto(path);
      const overflow = await page.evaluate(
        () => document.documentElement.scrollWidth - document.documentElement.clientWidth,
      );
      expect(overflow).toBeLessThanOrEqual(0);
    });
  }
});
