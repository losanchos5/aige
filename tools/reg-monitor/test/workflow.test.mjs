// Static checks of the workflow file (no YAML dependency: line-level patterns).
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { dirname, resolve } from 'node:path';
import { test } from 'node:test';
import { fileURLToPath } from 'node:url';

const REPO = resolve(dirname(fileURLToPath(import.meta.url)), '..', '..', '..');
const yml = readFileSync(resolve(REPO, '.github', 'workflows', 'reg-monitor.yml'), 'utf8');

test('runs daily at 06:17 UTC and on demand with a dry-run input', () => {
  assert.match(yml, /^ {4}- cron: '17 6 \* \* \*'/m);
  assert.match(yml, /^ {2}workflow_dispatch:\n {4}inputs:\n {6}dry_run:/m);
  assert.match(yml, /dry_run:[\s\S]*?type: boolean\n {8}default: true/);
});

test('no default permissions; the job alone gets contents and issues write', () => {
  assert.match(yml, /^permissions: \{\}$/m);
  assert.match(yml, /^ {4}permissions:\n {6}contents: write[^\n]*\n {6}issues: write/m);
  assert.doesNotMatch(yml, /pull-requests: write|actions: write|deployments: write/);
});

test('timeout, concurrency and repository guard', () => {
  assert.match(yml, /^ {4}timeout-minutes: 15$/m);
  assert.match(yml, /^concurrency:\n {2}group: reg-monitor\n {2}cancel-in-progress: false$/m);
  assert.match(yml, /if: github\.repository == 'losanchos5\/aige'/);
});

test('every action is pinned to a full commit SHA', () => {
  const uses = [...yml.matchAll(/uses: ([^\s]+)/g)].map((m) => m[1]);
  assert.ok(uses.length >= 2);
  for (const u of uses) assert.match(u, /@[0-9a-f]{40}$/, `${u} is not pinned to a SHA`);
});

test('state goes to the orphan branch, never to main', () => {
  assert.match(yml, /STATE_BRANCH: reg-monitor-state/);
  assert.match(yml, /git push --quiet origin "HEAD:refs\/heads\/\$STATE_BRANCH"/);
  assert.doesNotMatch(yml, /git push[^\n]*\bmain\b/);
  assert.match(yml, /checkout --quiet --orphan "\$STATE_BRANCH"/);
});

test('inputs reach the script through the environment, not by interpolation', () => {
  const runBlocks = [...yml.matchAll(/run: \|\n((?: {10}.*\n?)+)/g)].map((m) => m[1]).join('\n');
  assert.doesNotMatch(runBlocks, /\$\{\{/);
  assert.match(yml, /ONLY: \$\{\{ inputs\.only \}\}/);
});

test('scheduled runs are never dry runs; dry runs never save state', () => {
  assert.match(yml, /DRY_RUN: \$\{\{ github\.event_name == 'workflow_dispatch' && inputs\.dry_run && '1' \|\| '' \}\}/);
  assert.match(yml, /if: \$\{\{ always\(\) && env\.DRY_RUN == '' && env\.STATE_DIR != '' \}\}/);
});
