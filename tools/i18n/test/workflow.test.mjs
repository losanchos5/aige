// Static checks of .github/workflows/i18n.yml (no YAML dependency: line-level
// patterns, as tools/reg-monitor/test/workflow.test.mjs does) and of the CLI.

import assert from 'node:assert/strict';
import { spawnSync } from 'node:child_process';
import { existsSync, readdirSync, readFileSync, statSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';
import { test } from 'node:test';

import { parseCli, summaryMarkdown } from '../translate.mjs';
import { fixtureTree, REPO, scratch } from './helpers.mjs';

const yml = readFileSync(join(REPO, '.github', 'workflows', 'i18n.yml'), 'utf8');

test('manual runs choose languages, mode and cap; pushes to main run a small sync pass', () => {
  assert.match(yml, /^ {2}workflow_dispatch:\n {4}inputs:\n {6}langs:/m);
  assert.match(yml, /mode:[\s\S]*?type: choice\n {8}options:\n {10}- batch\n {10}- sync\n {8}default: batch/);
  assert.match(yml, /max_usd:[\s\S]*?default: '1\.00'/);
  assert.match(yml, /^ {2}push:\n {4}branches: \[main\]\n {4}paths:\n {6}- 'bok\/\*\*'\n {6}- 'THESIS\.md'\n {6}- 'site\/src\/i18n\/ui\.en\.json'$/m);
  assert.match(yml, /MODE: \$\{\{ github\.event_name == 'workflow_dispatch' && inputs\.mode \|\| 'sync' \}\}/);
  assert.match(yml, /MAX_USD: \$\{\{ github\.event_name == 'workflow_dispatch' && inputs\.max_usd \|\| '0\.50' \}\}/);
});

test('permissions: none by default; the job gets contents and pull-requests write only', () => {
  assert.match(yml, /^permissions: \{\}$/m);
  const perms = /^ {4}permissions:\n((?: {6}.*\n)+)/m.exec(yml);
  assert.ok(perms);
  const keys = perms[1].trim().split('\n').map((l) => l.trim().replace(/ #.*$/, ''));
  assert.deepEqual(keys, ['contents: write', 'pull-requests: write']);
  assert.doesNotMatch(yml, /actions: write|deployments: write|id-token: write|issues: write/);
  assert.match(yml, /persist-credentials: false/);
  assert.match(yml, /if: github\.repository == 'losanchos5\/aige'/);
});

test('every action is pinned to a full commit SHA; one run at a time', () => {
  const uses = [...yml.matchAll(/uses: ([^\s]+)/g)].map((m) => m[1]);
  assert.ok(uses.length >= 2);
  for (const u of uses) assert.match(u, /@[0-9a-f]{40}$/, `${u} is not pinned to a SHA`);
  assert.match(yml, /^concurrency:\n {2}group: i18n\n {2}cancel-in-progress: false$/m);
});

test('the API key reaches only the translate step; tests run first', () => {
  const secretUses = yml.match(/secrets\.ANTHROPIC_API_KEY/g) ?? [];
  assert.equal(secretUses.length, 1);
  const translate = /- name: Translate\n([\s\S]*?)\n {6}- name:/.exec(yml)[1];
  assert.match(translate, /ANTHROPIC_API_KEY: \$\{\{ secrets\.ANTHROPIC_API_KEY \}\}/);
  assert.match(translate, /--max-usd "\$MAX_USD"/);
  assert.ok(yml.indexOf('npm test') < yml.indexOf('- name: Translate'));
});

test('never pushes to main: a new i18n/auto-<run id> branch and a pull request', () => {
  assert.match(yml, /branch="i18n\/auto-\$RUN_ID"/);
  assert.match(yml, /push -q origin "HEAD:refs\/heads\/\$branch"/);
  assert.doesNotMatch(yml, /git(?: -c [^\n]*)? push[^\n]*\bmain\b/);
  assert.match(yml, /gh pr create --base "\$base" --head "\$branch"/);
  assert.match(yml, /if: \$\{\{ always\(\) && steps\.translate\.outcome != 'skipped' \}\}/);
  // Only the pipeline's outputs are committed.
  assert.match(yml, /git add -A -- i18n\n/);
});

test('inputs reach the scripts through the environment, never by interpolation', () => {
  const runBlocks = [...yml.matchAll(/run: \|\n((?: {10}.*\n?|\n)+)/g)].map((m) => m[1]).join('\n');
  assert.ok(runBlocks.length > 200);
  assert.doesNotMatch(runBlocks, /\$\{\{/);
});

test('no em dash anywhere in the pipeline, its data, its workflow or its docs', () => {
  const walk = (p) => (statSync(p).isDirectory() ? (p.endsWith('node_modules') ? [] : readdirSync(p).flatMap((f) => walk(join(p, f)))) : [p]);
  const files = [join(REPO, 'tools', 'i18n'), join(REPO, 'i18n'), join(REPO, '.github', 'workflows', 'i18n.yml')].flatMap(walk);
  assert.ok(files.length > 20);
  for (const f of files) assert.doesNotMatch(readFileSync(f, 'utf8'), /[\u2014\u2015]/, f);
});

test('deploy.yml does not depend on this workflow', () => {
  const deploy = readFileSync(join(REPO, '.github', 'workflows', 'deploy.yml'), 'utf8');
  assert.doesNotMatch(deploy, /workflow_run|i18n/i);
});

test('CLI: one mode, known languages, numeric cap', () => {
  assert.throws(() => parseCli([]), /exactly one mode/);
  assert.throws(() => parseCli(['--sync', '--batch']), /exactly one mode/);
  assert.throws(() => parseCli(['--sync', '--langs', 'it']), /unknown language it/);
  assert.throws(() => parseCli(['--sync', '--max-usd', 'lots']), /--max-usd must be a number/);
  assert.throws(() => parseCli(['--sync', '--full']), /--full only goes with --estimate/);
  const o = parseCli(['--batch', '--langs', 'fr,de', '--max-usd', '12', '--only', 'bok/0*.md,THESIS.md']);
  assert.equal(o.mode, 'batch');
  assert.deepEqual(o.langs, ['fr', 'de']);
  assert.equal(o.maxUsd, 12);
  assert.deepEqual(o.only, ['bok/0*.md', 'THESIS.md']);
  assert.deepEqual(parseCli(['--sync', '--only', '{THESIS.md,bok/05-*.md},bok/patterns/**']).only, ['{THESIS.md,bok/05-*.md}', 'bok/patterns/**']);
  assert.equal(parseCli(['--sync']).maxUsd, 1, 'a default cap of USD 1');
});

test('CLI: --mock refuses to write into the repository i18n/', () => {
  const env = { ...process.env };
  delete env.I18N_DIR;
  const r = spawnSync(process.execPath, [join(REPO, 'tools', 'i18n', 'translate.mjs'), '--mock'], { env, encoding: 'utf8' });
  assert.equal(r.status, 2);
  assert.match(r.stderr, /set I18N_DIR/);
});

test('CLI: exit 0 on a clean mock run with the real callout labels, 1 when a file is kept out', () => {
  const s = scratch();
  try {
    const root = fixtureTree(s.dir, ['bok/03-values-principles.md']);
    const cli = (callouts, out) => spawnSync(process.execPath, [join(REPO, 'tools', 'i18n', 'translate.mjs'), '--mock', '--langs', 'es'], {
      env: { ...process.env, I18N_DIR: join(s.dir, out), I18N_SOURCE_ROOT: root, I18N_CALLOUTS: callouts },
      encoding: 'utf8',
    });
    const ok = cli(join(REPO, 'site', 'src', 'i18n', 'callouts.json'), 'ok');
    assert.equal(ok.status, 0, ok.stderr);
    assert.doesNotMatch(ok.stderr, /error:/);
    assert.match(readFileSync(join(s.dir, 'ok', 'es', 'bok', '03-values-principles.md'), 'utf8'), /^> \*\*En la práctica\*\* /m);
    // A label the parser cannot read back as one (bold inside the label) changes
    // the structure: the file is kept out and the run fails visibly.
    const bad = join(s.dir, 'bad-callouts.json');
    writeFileSync(bad, JSON.stringify({ 'In practice': { es: 'En *la* práctica' } }));
    const ko = cli(bad, 'ko');
    assert.equal(ko.status, 1);
    assert.match(ko.stderr, /error: bok\/03-values-principles\.md \(es\): structure changed at block \d+: 1p:LL became 1p:tL/);
    assert.ok(!existsSync(join(s.dir, 'ko', 'es', 'bok', '03-values-principles.md')));
  } finally {
    s.cleanup();
  }
});

test('the pull request summary carries languages, files, segments and spend, and no em dash', () => {
  const md = summaryMarkdown({
    mode: 'batch', model: 'claude-haiku-4-5-20251001', date: '2026-09-25', langs: ['es'], spentUsd: 1.23456, capUsd: 12,
    stoppedByCap: false, pendingBatches: [], errors: [],
    perLang: { es: { written: ['i18n/es/bok/04-the-stack.md'], deferred: [], segments: { translated: 10, fromTm: 2, fallback: 1 } } },
    fallbacks: [{ lang: 'es', source: 'Kept', errors: ['identical to the source'] }],
  });
  assert.match(md, /Real spend: USD 1\.2346 \(cap USD 12\.0000\)/);
  assert.match(md, /\| es \| 1 \| 0 \| 10 \| 2 \| 1 \|/);
  assert.match(md, /i18n\/es\/bok\/04-the-stack\.md/);
  assert.ok(!md.includes('\u2014'));
});
