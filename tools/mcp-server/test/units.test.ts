// units.test.ts: configuration, text matching, clause keys, the corpus parser
// and the rate limiter, without a network.

import assert from 'node:assert/strict';
import { describe, it } from 'node:test';

import { loadConfig, siteBaseOf } from '../src/config.js';
import { parseCorpus, plainHeading } from '../src/corpus.js';
import { RateLimiter } from '../src/ratelimit.js';
import { LAYERS, patternSlug } from '../src/tools/common.js';
import { refKey } from '../src/tools/crosswalk.js';
import { normalise, score, snippet, suggest, tokens } from '../src/text.js';
import { readFixture } from './helpers.js';

describe('config', () => {
  it('has production defaults', () => {
    const c = loadConfig({});
    assert.equal(c.port, 8787);
    assert.equal(c.apiBase, 'https://aigovernanceengineer.com/api/v1');
    assert.equal(c.siteBase, 'https://aigovernanceengineer.com');
    assert.equal(c.cacheTtlMs, 3_600_000);
    assert.deepEqual(c.allowedOrigins, ['*']);
    assert.deepEqual(c.allowedHosts, ['localhost', '127.0.0.1', '[::1]']);
    assert.equal(c.trustProxy, false);
  });

  it('derives the site base and the host allowlist', () => {
    const c = loadConfig({ API_BASE: 'http://127.0.0.1:9000/api/v1/', PUBLIC_URL: 'https://mcp.aigovernanceengineer.com' });
    assert.equal(c.apiBase, 'http://127.0.0.1:9000/api/v1');
    assert.equal(c.siteBase, 'http://127.0.0.1:9000');
    assert.ok(c.allowedHosts.includes('mcp.aigovernanceengineer.com'));
    assert.equal(siteBaseOf('https://data.example/v1'), 'https://data.example');
    assert.deepEqual(loadConfig({ ALLOWED_HOSTS: '*' }).allowedHosts, []);
    assert.deepEqual(loadConfig({ ALLOWED_HOSTS: 'A.example, b.example' }).allowedHosts, ['a.example', 'b.example']);
  });

  it('fails at start-up on invalid values', () => {
    assert.throws(() => loadConfig({ PORT: 'eighty' }), /PORT/);
    assert.throws(() => loadConfig({ PORT: '70000' }), /PORT/);
    assert.throws(() => loadConfig({ API_BASE: 'ftp://x/api/v1' }), /API_BASE/);
    assert.throws(() => loadConfig({ API_BASE: 'https://user:pw@x/api/v1' }), /API_BASE/);
    assert.throws(() => loadConfig({ LOG_LEVEL: 'loud' }), /LOG_LEVEL/);
    assert.throws(() => loadConfig({ RATE_LIMIT_MAX: '0' }), /RATE_LIMIT_MAX/);
  });
});

describe('text', () => {
  it('normalises case, diacritics and punctuation', () => {
    assert.equal(normalise('  Évaluation & Red-Teaming! '), 'evaluation and red teaming');
    assert.deepEqual(tokens('What is the model card?'), ['model', 'card']);
    assert.deepEqual(tokens('the'), ['the']);
  });

  it('ranks an exact title above a mention and requires every word', () => {
    const exact = score('model card', 'Model card', [{ text: 'A document.', weight: 2 }]);
    const mention = score('model card', 'Datasheet', [{ text: 'Like a model card for data.', weight: 2 }]);
    assert.ok(exact > mention && mention > 0);
    assert.equal(score('model zebra', 'Model card', [{ text: 'A document.', weight: 2 }]), 0);
    assert.equal(score('odel', 'Model card', []), 0, 'matches start at word boundaries');
  });

  it('cuts snippets around the first query word', () => {
    const text = `${'lorem ipsum '.repeat(40)}the eval gate blocks a release ${'dolor sit '.repeat(40)}`;
    const s = snippet(text, 'eval gate', 80);
    assert.ok(s.includes('eval gate'));
    assert.ok(s.startsWith('… ') && s.endsWith(' …'));
  });

  it('suggests near misses', () => {
    assert.deepEqual(suggest('polcy-card', ['policy-card', 'raci', 'go-no-go']), ['policy-card']);
  });
});

describe('clause keys', () => {
  it('treats article spellings alike and keeps clause numbers apart', () => {
    assert.equal(refKey('Art. 9'), 'art9');
    assert.equal(refKey('Article 9'), 'art9');
    assert.equal(refKey('art 9(2)(a)'), 'art9(2)(a)');
    assert.equal(refKey('Arts. 13–14'), 'art13–14');
    assert.equal(refKey('6.1.2'), '6.1.2');
    assert.notEqual(refKey('6.1.2'), refKey('6.12'));
    assert.equal(refKey('GOVERN 1.2'), 'govern1.2');
  });

  it('turns pattern ids into page slugs', () => {
    assert.equal(patternSlug('pattern-kill-switch--circuit-breaker'), 'kill-switch-circuit-breaker');
    assert.equal(patternSlug('pattern-aibom'), 'aibom');
  });
});

describe('corpus', () => {
  const sample = [
    '# Site header',
    '',
    '---',
    '',
    '# 04. The stack',
    '',
    'Source: https://aigovernanceengineer.com/bok/the-stack',
    '',
    '> Five layers.',
    '',
    '## Layer 01: Govern-as-Code',
    'Text one with a [link](/bok/preface).',
    '',
    '```yaml',
    '# not a document title',
    '## not a heading',
    '```',
    '',
    '## Layer 01: Govern-as-Code',
    'Duplicate heading.',
    '### The `policy` engine *(illustrative)*',
    'Body.',
    '',
    '---',
    '',
    '# Pattern: Kill Switch / Circuit Breaker',
    '',
    'Source: https://aigovernanceengineer.com/patterns/kill-switch-circuit-breaker',
    '',
    '**Summary:** Stop an AI system',
    'safely and fast.',
    '',
    '## Problem',
    'Things go wrong.',
  ].join('\n');

  it('splits documents on titles followed by a Source line, ignoring fenced lines', () => {
    const docs = parseCorpus(sample);
    assert.equal(docs.length, 2);
    const [stack, pattern] = docs;
    assert.equal(stack?.kind, 'chapter');
    assert.equal(stack?.slug, 'the-stack');
    assert.equal(stack?.summary, 'Five layers.');
    assert.deepEqual(
      stack?.headings.map((h) => h.anchor),
      ['layer-01-govern-as-code', 'layer-01-govern-as-code-1', 'the-policy-engine-illustrative'],
    );
    assert.ok(stack?.sections[0]?.body.includes('# not a document title'));
    assert.equal(pattern?.kind, 'pattern');
    assert.equal(pattern?.title, 'Pattern: Kill Switch / Circuit Breaker');
    assert.equal(pattern?.summary, 'Stop an AI system safely and fast.');
    assert.equal(pattern?.sections[0]?.heading.url, 'https://aigovernanceengineer.com/patterns/kill-switch-circuit-breaker#problem');
  });

  it('reduces inline Markdown in headings to text', () => {
    assert.equal(plainHeading('The `x` **bold** [link](/a) <em>y</em>'), 'The x bold link y');
  });

  it('parses the published file: 24 chapters, one page per pattern of the index, the Thesis', () => {
    const docs = parseCorpus(readFixture('llms-full.txt'));
    const index = JSON.parse(readFixture('api/v1/patterns.json')) as { patterns: { slug: string }[] };
    assert.equal(docs.filter((d) => d.kind === 'chapter').length, 24);
    assert.deepEqual(
      docs.filter((d) => d.kind === 'pattern').map((d) => d.slug).sort(),
      index.patterns.map((p) => p.slug).sort(),
      'every pattern of patterns.json has its page, under its published slug',
    );
    assert.equal(docs.filter((d) => d.kind === 'thesis').length, 1);
    for (const d of docs) assert.ok(d.headings.length > 0, `${d.url} has headings`);
  });

  it('matches the layer names of chapter 04', () => {
    const stack = parseCorpus(readFixture('llms-full.txt')).find((d) => d.slug === 'the-stack');
    for (const [n, name] of Object.entries(LAYERS)) {
      assert.ok(
        stack?.headings.some((h) => h.text === `Layer 0${n}: ${name}`),
        `chapter 04 has the heading "Layer 0${n}: ${name}"`,
      );
    }
  });
});

describe('rate limiter', () => {
  it('counts per client within a window and forgets clients after it', () => {
    let now = 0;
    const limiter = new RateLimiter({ max: 2, windowMs: 1000, now: () => now });
    assert.equal(limiter.hit('a').allowed, true);
    assert.equal(limiter.hit('a').allowed, true);
    const third = limiter.hit('a');
    assert.equal(third.allowed, false);
    assert.equal(third.remaining, 0);
    assert.equal(third.resetSeconds, 1);
    assert.equal(limiter.hit('b').allowed, true, 'another client has its own window');
    now = 1500;
    assert.equal(limiter.hit('a').allowed, true, 'a new window');
    assert.equal(limiter.size, 1, 'the expired entry of b was swept');
  });

  it('bounds the table', () => {
    const limiter = new RateLimiter({ max: 5, windowMs: 60_000, maxEntries: 10 });
    for (let i = 0; i < 50; i += 1) limiter.hit(`client-${i}`);
    assert.ok(limiter.size <= 10);
  });
});
