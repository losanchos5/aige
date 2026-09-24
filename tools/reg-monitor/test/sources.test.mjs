import assert from 'node:assert/strict';
import { readdirSync, readFileSync } from 'node:fs';
import { dirname, join, resolve } from 'node:path';
import { test } from 'node:test';
import { fileURLToPath } from 'node:url';

import { checkSources } from '../monitor.mjs';
import { loadSources, validateSources } from '../lib/sources.mjs';

const HERE = dirname(fileURLToPath(import.meta.url));
const ROOT = resolve(HERE, '..');
const REPO = resolve(ROOT, '..', '..');
const sources = loadSources(join(ROOT, 'sources.json'));

test('sources.json is valid', () => {
  assert.ok(sources.length >= 20);
});

test('every monitored URL is cited by a tracked file of the site', () => {
  assert.deepEqual(checkSources(sources, REPO), []);
});

test('the list covers the jurisdictions and families the brief names', () => {
  const urls = sources.map((s) => s.url).join('\n');
  for (const needle of [
    'eur-lex.europa.eu/eli/reg/2024/1689', 'eur-lex.europa.eu/eli/reg/2026/1744', 'ai-act-service-desk.ec.europa.eu',
    'contents-code-gpai', 'ai-act-standardisation', 'cencenelec.eu', 'nist.gov/itl/ai-risk-management-framework',
    'airc.nist.gov', 'csrc.nist.gov/pubs/ir/8596', 'genai.owasp.org', 'law.go.kr', 'leginfo.legislature.ca.gov',
    'nysenate.gov', 'leg.colorado.gov', 'capitol.texas.gov', 'edpb.europa.eu', 'ico.org.uk', 'cnil.fr',
    'iapp.org/certify/aigp', 'internationalaisafetyreport.org',
  ]) {
    assert.ok(urls.includes(needle), `missing a source for ${needle}`);
  }
});

test('validation rejects typos, bad selectors, bad regexes and duplicates', () => {
  const base = { id: 'abc', name: 'A', url: 'https://example.org/a', jurisdiction: 'EU', category: 'law' };
  assert.deepEqual(validateSources({ sources: [base] }), []);
  const errors = validateSources({
    sources: [
      { ...base, selct: ['main'] },
      { ...base, id: 'abc', url: 'https://example.org/b' },
      { ...base, id: 'Bad Id', url: 'http://example.org/c' },
      { ...base, id: 'sel', url: 'https://example.org/d', hints: { select: ['main p'] } },
      { ...base, id: 'rgx', url: 'https://example.org/e', hints: { dropLines: ['('] } },
      { ...base, id: 'cat', url: 'https://example.org/f', category: 'blog' },
      { ...base, id: 'hnt', url: 'https://example.org/g', hints: { minChars: 0, colour: 'red' } },
      { ...base, id: 'trn', url: 'https://example.org/h', transport: 'wget' },
      { ...base, id: 'att', url: 'https://example.org/i', hints: { attributes: ['#no-attr'] } },
    ],
  });
  const joined = errors.join('\n');
  for (const expected of [
    'unknown key "selct"', 'duplicate id', 'id must match', 'url must be an https URL',
    'Unsupported selector syntax', 'invalid regular expression', 'category must be one of',
    'minChars must be a positive integer', 'unknown hint "colour"', 'transport must be one of',
    'Attribute spec must be',
  ]) {
    assert.ok(joined.includes(expected), `expected an error containing: ${expected}\n${joined}`);
  }
  assert.deepEqual(validateSources({ sources: [] }), ['"sources" must be a non-empty array']);
});

test('no file of the monitor contains an em dash', () => {
  const files = [
    join(ROOT, 'README.md'), join(ROOT, 'sources.json'), join(ROOT, 'monitor.mjs'),
    ...readdirSync(join(ROOT, 'lib')).map((f) => join(ROOT, 'lib', f)),
    ...readdirSync(HERE).map((f) => join(HERE, f)),
    join(REPO, '.github', 'workflows', 'reg-monitor.yml'),
  ];
  for (const f of files) assert.ok(!readFileSync(f, 'utf8').includes('\u2014'), `${f} contains U+2014`);
});
