// sync-fixtures.mjs: refresh test/fixtures from a local build of the site
// (site/dist, produced by `npm run build` in site/). The tests serve these
// files over HTTP exactly as the site does, so they exercise the real shapes.
//
//   npm run fixtures          (after a site build)
//
// The datasets the tools read are copied whole (minified); the full text
// (llms-full.txt, about 1.4 MB) is trimmed: every document keeps its title,
// Source line, summary and headings with the first line under each heading,
// and a few documents are kept whole so the pattern tool has real sections.

import { mkdirSync, readFileSync, writeFileSync } from 'node:fs';
import { dirname, join, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const here = dirname(fileURLToPath(import.meta.url));
const dist = resolve(here, '..', '..', '..', 'site', 'dist');
const out = resolve(here, '..', 'test', 'fixtures');

const DATASETS = ['index', 'glossary', 'obligations', 'frameworks', 'crosswalk', 'patterns', 'chapters', 'controls'];
const OBLIGATION_ITEMS = ['aige-obl-euaia-art9', 'aige-obl-iso42001-a2'];
const CONTROL_ITEMS = ['aige-ctl-eval-002'];
const SITE_FILES = [
  'schemas/policy-card.v1.json',
  'schemas/examples/policy-card.example.json',
  'templates/policy-card.md',
  'templates/ai-policy.yaml',
  'templates/ai-policy.md',
  'templates/ai-policy.rego',
  'templates/raci.csv',
];
const KEEP_WHOLE = new Set([
  'https://aigovernanceengineer.com/bok/preface',
  'https://aigovernanceengineer.com/patterns/policy-card',
  'https://aigovernanceengineer.com/patterns/kill-switch-circuit-breaker',
  // Its page slug is not derived from its id (pattern-staged-rollout-with-rollback-criteria).
  'https://aigovernanceengineer.com/patterns/staged-rollout-rollback-criteria',
]);

function write(path, text) {
  const target = join(out, path);
  mkdirSync(dirname(target), { recursive: true });
  writeFileSync(target, text);
}

for (const name of DATASETS) {
  write(`api/v1/${name}.json`, JSON.stringify(JSON.parse(readFileSync(join(dist, 'api', 'v1', `${name}.json`), 'utf8'))));
}
for (const id of OBLIGATION_ITEMS) {
  write(`api/v1/obligations/${id}.json`, readFileSync(join(dist, 'api', 'v1', 'obligations', `${id}.json`), 'utf8'));
}
for (const id of CONTROL_ITEMS) {
  write(`api/v1/controls/${id}.json`, readFileSync(join(dist, 'api', 'v1', 'controls', `${id}.json`), 'utf8'));
}
for (const file of SITE_FILES) write(file, readFileSync(join(dist, file), 'utf8'));

// Trim llms-full.txt.
const lines = readFileSync(join(dist, 'llms-full.txt'), 'utf8').replace(/\r\n?/g, '\n').split('\n');
const kept = [];
let fence = null;
let whole = false;
let inDoc = false;
let takeNext = false;
for (let i = 0; i < lines.length; i += 1) {
  const line = lines[i];
  const fenceMatch = /^\s{0,3}(`{3,}|~{3,})/.exec(line);
  const next = lines.slice(i + 1).find((l) => l.trim() !== '') ?? '';
  if (fence === null && /^# \S/.test(line) && /^Source:\s*https?:\/\//.test(next)) {
    inDoc = true;
    whole = KEEP_WHOLE.has(next.replace(/^Source:\s*/, '').trim());
    kept.push('---', '', line, '', next, '');
    i = lines.indexOf(next, i + 1);
    continue;
  }
  if (!inDoc) {
    if (!/^---\s*$/.test(line)) kept.push(line);
    continue;
  }
  if (whole) {
    if (!/^---\s*$/.test(line) || fence !== null) kept.push(line);
    if (fenceMatch) fence = fence === null ? fenceMatch[1] : null;
    continue;
  }
  if (fenceMatch) {
    fence = fence === null ? fenceMatch[1] : null;
    continue;
  }
  if (fence !== null) continue;
  if (/^#{2,6}\s/.test(line)) {
    kept.push('', line);
    takeNext = true;
    continue;
  }
  if (/^\s*>/.test(line) || /^\*\*Summary:\*\*/.test(line)) {
    kept.push(line);
    continue;
  }
  if (takeNext && line.trim() !== '' && !/^[|>*-]/.test(line.trim())) {
    kept.push(line);
    takeNext = false;
  }
}
write('llms-full.txt', `${kept.join('\n').replace(/\n{3,}/g, '\n\n').trim()}\n`);
process.stdout.write(`fixtures: ${DATASETS.length} datasets, ${OBLIGATION_ITEMS.length} obligation items, ${CONTROL_ITEMS.length} control item(s), ${SITE_FILES.length} site files, llms-full.txt trimmed\n`);
