import assert from 'node:assert/strict';
import { execFileSync } from 'node:child_process';
import { mkdirSync, mkdtempSync, rmSync, writeFileSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { test } from 'node:test';

import { findCitingFiles, lineCitesUrl } from '../lib/cites.mjs';

const OJ = 'https://eur-lex.europa.eu/eli/reg/2024/1689/oj/eng';
const OWASP = 'https://genai.owasp.org/';

test('a citation followed by prose, punctuation, quotes or a fragment counts', () => {
  assert.equal(lineCitesUrl(`[1] AI Act. EUR-Lex. 2024. ${OJ} (verified: primary)`, OJ), true);
  assert.equal(lineCitesUrl(`see ${OJ}.`, OJ), true);
  assert.equal(lineCitesUrl(`see ${OJ}, then`, OJ), true);
  assert.equal(lineCitesUrl(`    url: '${OJ}',`, OJ), true);
  assert.equal(lineCitesUrl(`[text](${OJ})`, OJ), true);
  assert.equal(lineCitesUrl(`| ${OJ} | primary |`, OJ), true);
  assert.equal(lineCitesUrl(`${OJ}#art_5`, OJ), true);
  assert.equal(lineCitesUrl(`\`${OJ}\``, OJ), true);
});

test('a longer URL that starts with the same text does not count', () => {
  assert.equal(lineCitesUrl(`${OJ}.pdf`, OJ), false);
  assert.equal(lineCitesUrl(`${OJ}/art_5`, OJ), false);
  assert.equal(lineCitesUrl(`${OJ}?locale=en`, OJ), false);
  assert.equal(lineCitesUrl('https://genai.owasp.org/llm-top-10/', OWASP), false);
  assert.equal(lineCitesUrl('https://leginfo.legislature.ca.gov/faces/billNavClient.xhtml?bill_id=202520260SB530', 'https://leginfo.legislature.ca.gov/faces/billNavClient.xhtml?bill_id=202520260SB53'), false);
});

test('trailing slashes are tolerated both ways', () => {
  assert.equal(lineCitesUrl('home https://genai.owasp.org/ and more', OWASP), true);
  assert.equal(lineCitesUrl('home https://genai.owasp.org and more', OWASP), true);
  assert.equal(lineCitesUrl('https://iapp.org/certify/aigp/', 'https://iapp.org/certify/aigp'), true);
});

test('a second occurrence on the same line is found after a longer first one', () => {
  assert.equal(lineCitesUrl(`${OJ}.pdf and ${OJ} too`, OJ), true);
});

test('findCitingFiles lists tracked files and lines, skipping the monitor itself', () => {
  const dir = mkdtempSync(join(tmpdir(), 'reg-monitor-cites-'));
  try {
    execFileSync('git', ['init', '-q'], { cwd: dir });
    mkdirSync(join(dir, 'bok'));
    mkdirSync(join(dir, 'tools', 'reg-monitor'), { recursive: true });
    writeFileSync(join(dir, 'bok', 'a.md'), `intro\n[1] ${OJ} (verified: primary)\n${OJ}.pdf\n`);
    writeFileSync(join(dir, 'bok', 'b.md'), `nothing here\r\nsee ${OJ}#art_73\r\n`);
    writeFileSync(join(dir, 'tools', 'reg-monitor', 'sources.json'), `"url": "${OJ}"\n`);
    writeFileSync(join(dir, 'untracked.md'), `${OJ}\n`);
    execFileSync('git', ['add', 'bok', 'tools'], { cwd: dir });
    assert.deepEqual(findCitingFiles(OJ, { cwd: dir }), [
      { file: 'bok/a.md', lines: [2] },
      { file: 'bok/b.md', lines: [2] },
    ]);
    assert.deepEqual(findCitingFiles('https://example.org/none', { cwd: dir }), []);
  } finally {
    rmSync(dir, { recursive: true, force: true });
  }
});
