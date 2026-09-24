// tools.test.ts: every tool, called through a real MCP client over Streamable
// HTTP against the app, which reads the fixture copy of the site's open data.

import assert from 'node:assert/strict';
import { after, before, describe, it } from 'node:test';

import type { Client } from '@modelcontextprotocol/client';

import { NOTICE } from '../src/tools/common.js';
import { TOOL_NAMES } from '../src/tools/index.js';
import { connect, startApp, startFixtureServer, textOf, type FixtureServer, type RunningApp } from './helpers.js';

let fixtures: FixtureServer;
let running: RunningApp;
let client: Client;

type Structured = Record<string, any>;

async function call(name: string, args: Record<string, unknown>): Promise<{ text: string; data: Structured; isError: boolean }> {
  const result = await client.callTool({ name, arguments: args });
  return {
    text: textOf(result),
    data: (result.structuredContent ?? {}) as Structured,
    isError: result.isError === true,
  };
}

function assertProvenance(data: Structured, text: string): void {
  assert.equal(data.notice, NOTICE);
  assert.equal(data.license, 'CC BY 4.0');
  assert.match(data.source, /^https:\/\/aigovernanceengineer\.com\//);
  assert.match(data.dataset, /^https:\/\/aigovernanceengineer\.com\//);
  assert.match(data.dataVersion, /^\d+\.\d+\.\d+$/);
  assert.ok(text.includes(`Source: ${data.source}`), 'the text names the source URL');
  assert.ok(text.includes(NOTICE), 'the text carries the notice');
}

before(async () => {
  fixtures = await startFixtureServer();
  running = await startApp(fixtures);
  client = await connect(running.url);
});

after(async () => {
  await client.close();
  await running.close();
  await fixtures.close();
});

describe('tools/list', () => {
  it('lists every tool, read-only, with input and output schemas', async () => {
    const { tools } = await client.listTools();
    assert.deepEqual(tools.map((t) => t.name).sort(), [...TOOL_NAMES].sort());
    for (const tool of tools) {
      assert.ok(tool.description && tool.description.length > 40, `${tool.name} has a description`);
      assert.equal(tool.inputSchema.type, 'object');
      assert.equal(tool.outputSchema?.type, 'object', `${tool.name} declares an output schema`);
      assert.equal(tool.annotations?.readOnlyHint, true);
      assert.equal(tool.annotations?.destructiveHint, false);
    }
  });
});

describe('search_glossary', () => {
  it('finds a term by name and ranks the exact name first', async () => {
    const { text, data, isError } = await call('search_glossary', { query: 'abstention band' });
    assert.equal(isError, false);
    assert.ok(data.total >= 1);
    assert.equal(data.results[0].slug, 'abstention-band');
    assert.equal(data.results[0].url, 'https://aigovernanceengineer.com/glossary/abstention-band');
    assert.match(data.results[0].definition, /human reviewer/);
    assertProvenance(data, text);
  });

  it('finds acronyms in brackets and respects the limit', async () => {
    const { data } = await call('search_glossary', { query: 'model', limit: 3 });
    assert.equal(data.results.length, 3);
    assert.ok(data.total > 3);
  });

  it('answers an empty result without an error', async () => {
    const { text, data, isError } = await call('search_glossary', { query: 'zzqx unobtainium' });
    assert.equal(isError, false);
    assert.equal(data.total, 0);
    assert.match(text, /No glossary term matches/);
  });

  it('rejects a one-character query', async () => {
    const result = await client.callTool({ name: 'search_glossary', arguments: { query: 'a' } });
    assert.equal(result.isError, true);
  });
});

describe('get_term', () => {
  it('gets a term by slug, id, URL and name', async () => {
    for (const wanted of [
      'abstention-band',
      't-abstention-band',
      'https://aigovernanceengineer.com/glossary/abstention-band',
      'Abstention band',
    ]) {
      const { data, isError } = await call('get_term', { slug: wanted });
      assert.equal(isError, false, wanted);
      assert.equal(data.slug, 'abstention-band', wanted);
    }
  });

  it('carries the chapters, the page and the provenance', async () => {
    const { text, data } = await call('get_term', { slug: 'abstention-band' });
    assert.ok(data.chapters.length >= 1);
    assert.equal(data.glossaryUrl, 'https://aigovernanceengineer.com/resources/glossary#t-abstention-band');
    assert.equal(data.source, 'https://aigovernanceengineer.com/glossary/abstention-band');
    assertProvenance(data, text);
  });

  it('suggests close slugs for an unknown term', async () => {
    const { text, isError } = await call('get_term', { slug: 'abstension-band' });
    assert.equal(isError, true);
    assert.match(text, /abstention-band/);
    assert.ok(text.includes(NOTICE));
  });
});

describe('get_obligations', () => {
  it('filters by framework name', async () => {
    const { text, data } = await call('get_obligations', { framework: 'EU AI Act', limit: 100 });
    assert.deepEqual(data.frameworkIds, ['eu-ai-act']);
    assert.ok(data.total >= 20);
    assert.ok(data.obligations.every((o: Structured) => o.frameworkId === 'eu-ai-act'));
    assertProvenance(data, text);
  });

  it('combines role, system class and date', async () => {
    const { data } = await call('get_obligations', {
      framework: 'eu-ai-act',
      role: 'deployer',
      systemClass: 'high-risk-annex-iii',
      appliesBefore: '2027-12-31',
    });
    assert.ok(data.total >= 1);
    for (const o of data.obligations) {
      assert.match(o.dutyHolder, /deployer/i);
      assert.ok(o.systemClass.includes('high-risk-annex-iii'));
      assert.ok(o.appliesFrom <= '2027-12-31');
    }
    assert.ok(data.obligations.some((o: Structured) => o.id === 'AIGE-OBL-EUAIA-ART26'));
  });

  it('keeps only rows that apply by a date', async () => {
    const { data } = await call('get_obligations', { framework: 'eu-ai-act', appliesBefore: '2025-12-31', limit: 100 });
    const ids = data.obligations.map((o: Structured) => o.id);
    assert.ok(ids.includes('AIGE-OBL-EUAIA-ART5'));
    assert.ok(!ids.includes('AIGE-OBL-EUAIA-ART9'));
  });

  it('filters by layer and status and caps the list', async () => {
    const { data } = await call('get_obligations', { layer: 3, status: 'voluntary', limit: 2 });
    assert.equal(data.returned, data.obligations.length);
    assert.ok(data.returned <= 2);
    for (const o of data.obligations) {
      assert.ok(o.layers.includes(3));
      assert.equal(o.appliesStatus, 'voluntary');
    }
  });

  it('resolves a family name to several frameworks', async () => {
    const { data } = await call('get_obligations', { framework: 'nist', limit: 100 });
    assert.ok(data.frameworkIds.length > 1);
    assert.ok(data.frameworkIds.every((id: string) => id.startsWith('nist-')));
  });

  it('rejects an unknown framework or class with the valid values', async () => {
    const fw = await call('get_obligations', { framework: 'Atlantis AI Code' });
    assert.equal(fw.isError, true);
    assert.match(fw.text, /eu-ai-act/);
    const cls = await call('get_obligations', { systemClass: 'medium-risk' });
    assert.equal(cls.isError, true);
    assert.match(cls.text, /high-risk-annex-iii/);
  });

  it('rejects a malformed date', async () => {
    const result = await client.callTool({ name: 'get_obligations', arguments: { appliesBefore: '31/12/2027' } });
    assert.equal(result.isError, true);
  });
});

describe('get_obligation', () => {
  it('gets one row with framework, patterns and crosswalk', async () => {
    const { text, data, isError } = await call('get_obligation', { id: 'aige-obl-euaia-art9' });
    assert.equal(isError, false);
    assert.equal(data.id, 'AIGE-OBL-EUAIA-ART9');
    assert.equal(data.appliesFrom, '2027-12-02');
    assert.ok(data.milestones.some((m: Structured) => m.date === '2028-08-02'));
    assert.equal(data.frameworkInfo.id, 'eu-ai-act');
    assert.ok(data.crosswalk.some((r: Structured) => r.topic === 'risk-management'));
    assert.ok(data.patterns.length >= 1);
    assert.ok(data.patterns.every((p: Structured) => p.url.startsWith('https://aigovernanceengineer.com/patterns/')));
    assert.equal(data.source, 'https://aigovernanceengineer.com/obligations/aige-obl-euaia-art9');
    assert.match(text, /Layer 01 Govern-as-Code/);
    assertProvenance(data, text);
  });

  it('accepts the page URL', async () => {
    const { data } = await call('get_obligation', { id: 'https://aigovernanceengineer.com/obligations/aige-obl-iso42001-a2' });
    assert.equal(data.id, 'AIGE-OBL-ISO42001-A2');
    assert.equal(data.dutyHolder, null);
  });

  it('suggests ids for an unknown one', async () => {
    const { text, isError } = await call('get_obligation', { id: 'AIGE-OBL-EUAIA-ART99' });
    assert.equal(isError, true);
    assert.match(text, /AIGE-OBL-EUAIA-ART9/);
  });
});

describe('map_clause', () => {
  it('maps an EU AI Act article to the other frameworks on its topics', async () => {
    const { text, data, isError } = await call('map_clause', { framework: 'EU AI Act', ref: 'Article 9' });
    assert.equal(isError, false);
    assert.equal(data.via, 'crosswalk');
    const risk = data.matches.find((m: Structured) => m.topic.id === 'risk-management');
    assert.ok(risk, 'Art. 9 sits in risk management');
    assert.equal(risk.match, 'exact');
    assert.equal(risk.obligationId, 'AIGE-OBL-EUAIA-ART9');
    assert.ok(risk.equivalents.some((e: Structured) => e.framework === 'iso-42001' && e.reference === '6.1.2'));
    assert.ok(risk.equivalents.every((e: Structured) => e.framework !== 'eu-ai-act'));
    assertProvenance(data, text);
  });

  it('matches ISO clause numbers exactly and NIST functions by prefix', async () => {
    const iso = await call('map_clause', { framework: 'ISO/IEC 42001', ref: '6.1.2' });
    assert.equal(iso.isError, false);
    assert.ok(iso.data.matches.every((m: Structured) => m.reference === '6.1.2'));
    const nist = await call('map_clause', { framework: 'nist-ai-rmf', ref: 'govern 1' });
    assert.equal(nist.isError, false);
    assert.ok(nist.data.matches.length >= 1);
  });

  it('falls back to a broader clause when the narrower one is not listed', async () => {
    const { data, isError } = await call('map_clause', { framework: 'eu-ai-act', ref: 'Art. 9(2)(a)' });
    assert.equal(isError, false);
    assert.ok(data.matches.length >= 1);
    assert.ok(data.matches.every((m: Structured) => m.match === 'broader' || m.match === 'exact'));
  });

  it('does not confuse Art. 9 with Art. 90', async () => {
    const { data } = await call('map_clause', { framework: 'eu-ai-act', ref: 'Art. 9' });
    assert.ok(data.matches.every((m: Structured) => /^Art\. 9(\D|$)/.test(m.reference)));
  });

  it('lists the clauses it knows for an unknown one', async () => {
    const { text, isError } = await call('map_clause', { framework: 'GDPR', ref: 'Art. 999' });
    assert.equal(isError, true);
    assert.match(text, /Art\. 35/);
  });
});

describe('list_patterns', () => {
  it('lists all patterns with summaries and page URLs', async () => {
    const { text, data } = await call('list_patterns', {});
    assert.equal(data.total, 17);
    const card = data.patterns.find((p: Structured) => p.slug === 'policy-card');
    assert.equal(card.url, 'https://aigovernanceengineer.com/patterns/policy-card');
    assert.match(card.summary, /machine-readable artefact/);
    assertProvenance(data, text);
  });

  it('filters by primary or secondary layer', async () => {
    const { data } = await call('list_patterns', { layer: 5 });
    assert.equal(data.layerName, 'Assurance & Continuous Compliance');
    for (const p of data.patterns) assert.ok(p.layer === 5 || p.secondaryLayer === 5);
    assert.ok(data.patterns.some((p: Structured) => p.id === 'pattern-framework-crosswalk'), 'secondary layer 5');
  });
});

describe('get_pattern', () => {
  it('gets a pattern with its page sections', async () => {
    const { text, data, isError } = await call('get_pattern', { slug: 'policy-card' });
    assert.equal(isError, false);
    assert.equal(data.id, 'pattern-policy-card');
    assert.equal(data.layerName, 'Govern-as-Code');
    const headings = data.sections.map((s: Structured) => s.heading);
    for (const h of ['Objectives', 'Problem', 'Solution', 'Consequences']) assert.ok(headings.includes(h), h);
    const solution = data.sections.find((s: Structured) => s.heading === 'Solution');
    assert.equal(solution.url, 'https://aigovernanceengineer.com/patterns/policy-card#solution');
    assert.ok(data.obligationDetails.some((o: Structured) => o.id === 'AIGE-OBL-EUAIA-ART9'));
    assert.match(text, /## Problem/);
    assert.ok(!/\]\(\/patterns\//.test(text), 'site-relative links are made absolute');
    assertProvenance(data, text);
  });

  it('accepts the double-hyphen id, the collapsed slug and the title', async () => {
    for (const wanted of ['pattern-kill-switch--circuit-breaker', 'kill-switch-circuit-breaker', 'Kill Switch / Circuit Breaker']) {
      const { data, isError } = await call('get_pattern', { slug: wanted });
      assert.equal(isError, false, wanted);
      assert.equal(data.slug, 'kill-switch-circuit-breaker', wanted);
    }
  });

  it('suggests slugs for an unknown pattern', async () => {
    const { text, isError } = await call('get_pattern', { slug: 'policy-cards' });
    assert.equal(isError, true);
    assert.match(text, /policy-card/);
  });
});

describe('list_templates and get_template', () => {
  it('lists the library and filters by stage', async () => {
    const all = await call('list_templates', {});
    assert.ok(all.data.total >= 20);
    assertProvenance(all.data, all.text);
    const org = await call('list_templates', { stage: 'organisation' });
    assert.ok(org.data.templates.every((t: Structured) => t.stage === 'organisation'));
    assert.ok(org.data.templates.some((t: Structured) => t.name === 'raci'));
  });

  it('returns a schema, its example and its template', async () => {
    const { text, data, isError } = await call('get_template', { name: 'policy-card' });
    assert.equal(isError, false);
    assert.equal(data.kind, 'schema');
    assert.deepEqual(data.files.map((f: Structured) => f.role).sort(), ['example', 'schema', 'template']);
    const schema = data.files.find((f: Structured) => f.role === 'schema');
    assert.equal(JSON.parse(schema.content).$id, 'https://aigovernanceengineer.com/schemas/policy-card.v1.json');
    assert.equal(data.source, 'https://aigovernanceengineer.com/schemas/policy-card.v1.json');
    assertProvenance(data, text);
  });

  it('returns one part only, by file name', async () => {
    const { data } = await call('get_template', { name: 'policy-card.v1.json', part: 'template' });
    assert.equal(data.files.length, 1);
    assert.equal(data.files[0].mediaType, 'text/markdown');
  });

  it('serves the policy kit', async () => {
    const { data, isError } = await call('get_template', { name: 'ai-policy' });
    assert.equal(isError, false);
    assert.equal(data.kind, 'kit');
    assert.deepEqual(data.files.map((f: Structured) => f.format).sort(), ['markdown', 'rego', 'yaml']);
  });

  it('serves a schema published after the catalogue sync', async () => {
    fixtures.override('/schemas/brand-new-record.v1.json', JSON.stringify({ title: 'Brand new record', description: 'A test.' }));
    try {
      const { data, isError } = await call('get_template', { name: 'brand-new-record', part: 'schema' });
      assert.equal(isError, false);
      assert.equal(data.title, 'Brand new record');
    } finally {
      fixtures.override('/schemas/brand-new-record.v1.json', null);
    }
  });

  it('explains a missing part and an unknown name', async () => {
    const part = await call('get_template', { name: 'raci', part: 'schema' });
    assert.equal(part.isError, true);
    assert.match(part.text, /no schema file/);
    const unknown = await call('get_template', { name: 'polcy-card' });
    assert.equal(unknown.isError, true);
    assert.match(unknown.text, /policy-card/);
  });
});

describe('search_bok', () => {
  it('finds chapters by title and summary', async () => {
    const { text, data } = await call('search_bok', { query: 'EU AI Act', kind: 'chapter' });
    assert.ok(data.total >= 1);
    assert.equal(data.results[0].url, 'https://aigovernanceengineer.com/bok/eu-ai-act');
    assertProvenance(data, text);
  });

  it('finds sections by heading, with anchor URLs', async () => {
    const { data } = await call('search_bok', { query: 'who wrote it', kind: 'section' });
    assert.equal(data.headingsSearched, true);
    const hit = data.results.find((r: Structured) => r.url === 'https://aigovernanceengineer.com/bok/preface#who-wrote-it-and-from-what');
    assert.ok(hit, 'the preface section is found with its anchor');
  });

  it('finds pattern pages', async () => {
    const { data } = await call('search_bok', { query: 'circuit breaker', kind: 'pattern' });
    assert.equal(data.results[0].url, 'https://aigovernanceengineer.com/patterns/kill-switch-circuit-breaker');
  });

  it('degrades to chapters.json when the full text is unavailable', async () => {
    running.data.upstream.clear();
    fixtures.failWith('/llms-full.txt', 503);
    try {
      const { data, isError } = await call('search_bok', { query: 'maturity' });
      assert.equal(isError, false);
      assert.equal(data.headingsSearched, false);
      assert.ok(data.results.every((r: Structured) => r.kind === 'chapter'));
    } finally {
      fixtures.failWith('/llms-full.txt', null);
      running.data.upstream.clear();
    }
  });
});

describe('upstream failure', () => {
  it('turns an unavailable dataset into a readable tool error', async () => {
    running.data.upstream.clear();
    fixtures.failWith('/api/v1/glossary.json', 503);
    try {
      const { text, isError } = await call('get_term', { slug: 'abstention-band' });
      assert.equal(isError, true);
      assert.match(text, /could not be read right now/);
      assert.match(text, /HTTP 503/);
    } finally {
      fixtures.failWith('/api/v1/glossary.json', null);
    }
  });
});
