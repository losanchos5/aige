#!/usr/bin/env node
// Regulatory change monitor. Fetches the official pages listed in
// sources.json, normalises them, compares a SHA-256 of the normalised content
// with the stored state and, on a change, opens (or comments on) a GitHub issue
// labelled "regulatory-change". It never edits or publishes the site.
//
//   node tools/reg-monitor/monitor.mjs --state-dir <dir>           # the scheduled run
//   node tools/reg-monitor/monitor.mjs --state-dir <dir> --dry-run # print, write nothing
//   node tools/reg-monitor/monitor.mjs --preview --only <id>       # show normalised text
//   node tools/reg-monitor/monitor.mjs --check                     # validate sources.json
//
// See README.md in this directory.

import { execFileSync } from 'node:child_process';
import { appendFileSync, existsSync } from 'node:fs';
import { dirname, join, resolve } from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';
import { parseArgs } from 'node:util';

import { findCitingFiles } from './lib/cites.mjs';
import { unifiedDiff } from './lib/diff.mjs';
import { createFetcher, USER_AGENT } from './lib/fetcher.mjs';
import { createGitHub } from './lib/github.mjs';
import {
  formatCommentBody, formatIssueBody, formatUnreachableBody, issueTitle,
} from './lib/issue.mjs';
import { hintsFingerprint, normalise, NormaliseError } from './lib/normalise.mjs';
import { loadSources } from './lib/sources.mjs';
import { loadState, pruneState, readText, saveSource, storedText } from './lib/state.mjs';

const HERE = dirname(fileURLToPath(import.meta.url));

// Consecutive failed runs before a source is reported as unreachable.
export const FAILURE_THRESHOLD = 3;
// More changes than this in one run are deferred to the next run: a flood
// usually means a systemic cause (a site redesign, a normaliser bug), and a
// person should look before dozens of issues open.
export const MAX_NOTIFICATIONS_PER_RUN = 10;

function nowIso(now) {
  return new Date(now()).toISOString().replace(/\.\d{3}Z$/, 'Z');
}

// Core loop, injectable for tests. Returns { results, exitCode }.
export async function runMonitor({
  sources,
  stateDir,
  repoRoot,
  dryRun = false,
  preview = false,
  fetcher,
  github = null,
  log = console.log,
  now = () => Date.now(),
  runUrl = null,
  repoUrl = 'https://github.com/losanchos5/aige',
  ref = 'main',
  findCiting = findCitingFiles,
  failureThreshold = FAILURE_THRESHOLD,
  maxNotifications = MAX_NOTIFICATIONS_PER_RUN,
  prune = false,
}) {
  const write = !dryRun && !preview;
  if (write && !github) throw new Error('A GitHub client is required unless --dry-run or --preview is set');
  const state = loadState(stateDir);
  const results = [];
  let exitCode = 0;
  let notifications = 0;

  const notify = async (sourceId, title, issueBody, commentBody) => {
    await github.ensureLabel();
    const open = await github.findOpenIssue(sourceId);
    if (open) {
      await github.addComment(open.number, commentBody);
      return `commented on #${open.number}`;
    }
    const made = await github.createIssue({ title, body: issueBody });
    return `opened #${made.number}`;
  };

  // One source; any unexpected error is contained so the other sources still run.
  const checkSource = async (source) => {
    const { id } = source;
    const prev = state.sources[id] ?? null;
    const fingerprint = hintsFingerprint(source.hints);
    const at = nowIso(now);
    const sameShape = prev && prev.url === source.url && prev.fingerprint === fingerprint;

    const failed = async (err) => {
      const failures = (prev?.failures ?? 0) + 1;
      const record = {
        ...(prev ?? { url: source.url, fingerprint, kind: null, sha256: null }),
        failures,
        failingSince: prev?.failingSince ?? at,
        lastError: err.message,
      };
      let detail = err.message;
      if (failures === failureThreshold) {
        const failure = {
          source, error: err.message, failures, since: record.failingSince, detectedAt: at, runUrl,
          citing: findCiting(source.url, { cwd: repoRoot }), repoUrl, ref,
        };
        if (!write) {
          log(`\n=== [dry run] would report ${id} as unreachable ===\n${issueTitle(source, 'unreachable')}\n\n${formatUnreachableBody(failure)}\n`);
        } else {
          try {
            detail += `; ${await notify(id, issueTitle(source, 'unreachable'), formatUnreachableBody(failure), formatUnreachableBody(failure, { asComment: true }))}`;
          } catch (ghErr) {
            exitCode = 1;
            results.push({ id, status: 'error', detail: `unreachable, and the notification failed: ${ghErr.message}` });
            return; // not saved: the next run retries the notification
          }
        }
      }
      if (write) saveSource(stateDir, state, id, record, undefined);
      results.push({ id, status: 'failed', detail: `${detail} (${failures} in a row)` });
    };

    let resp;
    try {
      const conditional = sameShape && prev.kind === 'pdf' && prev.sha256
        ? { etag: prev.etag ?? null, lastModified: prev.lastModified ?? null }
        : {};
      resp = await fetcher.get(source.url, { ...conditional, transport: source.transport ?? 'fetch' });
    } catch (err) {
      await failed(err);
      return;
    }

    if (resp.notModified) {
      if (write && (prev.failures ?? 0) > 0) saveSource(stateDir, state, id, { ...prev, failures: 0, failingSince: null, lastError: null }, undefined);
      results.push({ id, status: 'unchanged', detail: 'HTTP 304 Not Modified' });
      return;
    }

    let current;
    try {
      current = normalise({ bytes: resp.bytes, contentType: resp.contentType }, source.hints);
    } catch (err) {
      if (!(err instanceof NormaliseError)) throw err;
      await failed(err);
      return;
    }

    if (preview) {
      const lines = current.text ? current.text.split('\n') : [];
      log(`\n=== ${id}: ${current.kind}, ${current.kind === 'pdf' ? `${current.bytes} bytes` : `${current.text.length} chars, ${lines.length} lines`}, sha256 ${current.sha256.slice(0, 12)}${current.selectMatched ? '' : ', SELECT HINT DID NOT MATCH'} ===`);
      if (lines.length) log(lines.slice(0, 40).join('\n'));
      if (lines.length > 40) log(`... (${lines.length - 40} more lines)`);
      results.push({ id, status: 'preview', detail: `${current.kind} ${current.sha256.slice(0, 12)}` });
      return;
    }

    const record = {
      url: source.url,
      fingerprint,
      kind: current.kind,
      sha256: current.sha256,
      observedAt: at,
      previousSha256: prev?.previousSha256 ?? null,
      changedAt: prev?.changedAt ?? null,
      failures: 0,
      failingSince: null,
      lastError: null,
      ...(current.kind === 'pdf' ? { bytes: current.bytes, etag: resp.etag ?? null, lastModified: resp.lastModified ?? null } : {}),
    };
    const text = current.kind === 'html' ? current.text : null;

    if (!prev || !prev.sha256) {
      if (write) saveSource(stateDir, state, id, record, text);
      results.push({ id, status: 'initialised', detail: `${current.kind} ${current.sha256.slice(0, 12)}` });
      return;
    }
    if (!sameShape) {
      if (write) saveSource(stateDir, state, id, record, text);
      results.push({ id, status: 'rebaselined', detail: 'URL, hints or normaliser changed; new baseline stored without an issue' });
      return;
    }
    if (prev.sha256 === current.sha256) {
      const refreshed = { ...prev, failures: 0, failingSince: null, lastError: null };
      if (current.kind === 'pdf') Object.assign(refreshed, { etag: resp.etag ?? null, lastModified: resp.lastModified ?? null });
      if (write && JSON.stringify(refreshed) !== JSON.stringify(prev)) saveSource(stateDir, state, id, refreshed, undefined);
      results.push({ id, status: 'unchanged', detail: current.sha256.slice(0, 12) });
      return;
    }

    // A change.
    if (notifications >= maxNotifications) {
      results.push({ id, status: 'deferred', detail: `more than ${maxNotifications} changes in one run; left for the next run` });
      return;
    }
    const oldText = current.kind === 'html' ? storedText(readText(stateDir, id)) : null;
    const diff = current.kind === 'html' ? unifiedDiff(oldText ?? '', current.text, { label: id }) : null;
    const change = {
      source,
      previous: prev,
      current: { ...current, etag: resp.etag ?? null, lastModified: resp.lastModified ?? null },
      diff,
      citing: findCiting(source.url, { cwd: repoRoot }),
      detectedAt: at,
      runUrl,
      repoUrl,
      ref,
      selectMatched: current.selectMatched,
    };
    notifications++;
    const summary = diff ? `+${diff.added} -${diff.removed} lines` : 'PDF bytes changed';
    if (!write) {
      log(`\n=== [dry run] change on ${id}: would open or update an issue ===\n${issueTitle(source)}\n\n${formatIssueBody(change)}\n`);
      results.push({ id, status: 'changed', detail: `${summary} (dry run: no issue, no state)` });
      return;
    }
    try {
      const outcome = await notify(id, issueTitle(source), formatIssueBody(change), formatCommentBody(change));
      saveSource(stateDir, state, id, { ...record, previousSha256: prev.sha256, changedAt: at }, text);
      results.push({ id, status: 'changed', detail: `${summary}; ${outcome}` });
    } catch (err) {
      exitCode = 1;
      results.push({ id, status: 'error', detail: `change detected but the notification failed: ${err.message}` });
    }
  };

  for (const source of sources) {
    try {
      await checkSource(source);
    } catch (err) {
      exitCode = 1;
      results.push({ id: source.id, status: 'error', detail: `unexpected error: ${err?.message ?? err}` });
    }
  }

  if (prune && write) {
    const removed = pruneState(stateDir, state, sources.map((s) => s.id));
    for (const id of removed) results.push({ id, status: 'pruned', detail: 'no longer in sources.json' });
  }
  return { results, exitCode };
}

export function summaryMarkdown(results, { dryRun }) {
  const counts = results.reduce((acc, r) => ({ ...acc, [r.status]: (acc[r.status] ?? 0) + 1 }), {});
  const lines = [
    `## Regulatory monitor${dryRun ? ' (dry run)' : ''}`,
    '',
    Object.entries(counts).map(([k, v]) => `${k}: ${v}`).join(' · '),
    '',
    '| Source | Status | Detail |',
    '|---|---|---|',
    ...results.map((r) => `| \`${r.id}\` | ${r.status} | ${String(r.detail).replace(/\|/g, '\\|')} |`),
  ];
  return `${lines.join('\n')}\n`;
}

// --check: sources.json is valid and every URL is cited by a tracked file.
export function checkSources(sources, repoRoot, findCiting = findCitingFiles) {
  const problems = [];
  for (const s of sources) {
    const citing = findCiting(s.url, { cwd: repoRoot });
    if (citing.length === 0) problems.push(`${s.id}: ${s.url} is not cited by any tracked file`);
  }
  return problems;
}

function gitTopLevel(from) {
  try {
    return execFileSync('git', ['rev-parse', '--show-toplevel'], { cwd: from, encoding: 'utf8' }).trim();
  } catch {
    return resolve(from, '..', '..');
  }
}

async function main(argv) {
  const { values } = parseArgs({
    args: argv,
    options: {
      'dry-run': { type: 'boolean', default: false },
      preview: { type: 'boolean', default: false },
      check: { type: 'boolean', default: false },
      list: { type: 'boolean', default: false },
      only: { type: 'string' },
      'state-dir': { type: 'string' },
      sources: { type: 'string' },
      'repo-root': { type: 'string' },
      help: { type: 'boolean', short: 'h', default: false },
    },
    strict: true,
  });
  if (values.help) {
    console.log('Usage: monitor.mjs [--state-dir DIR] [--dry-run | --preview | --check | --list] [--only id,id] [--sources FILE] [--repo-root DIR]');
    return 0;
  }
  const repoRoot = resolve(values['repo-root'] ?? gitTopLevel(HERE));
  const sourcesFile = resolve(values.sources ?? join(HERE, 'sources.json'));
  let sources = loadSources(sourcesFile);

  if (values.list) {
    for (const s of sources) console.log(`${s.id}\t${s.jurisdiction}\t${s.category}\t${s.url}`);
    return 0;
  }
  if (values.check) {
    const problems = checkSources(sources, repoRoot);
    if (problems.length) {
      console.error(`reg-monitor --check: ${problems.length} problem(s)\n- ${problems.join('\n- ')}`);
      return 1;
    }
    console.log(`reg-monitor --check: ${sources.length} sources valid, each cited by a tracked file`);
    return 0;
  }

  let prune = true;
  if (values.only) {
    const wanted = values.only.split(',').map((x) => x.trim()).filter(Boolean);
    const unknown = wanted.filter((id) => !sources.some((s) => s.id === id));
    if (unknown.length) {
      console.error(`reg-monitor: unknown source id(s): ${unknown.join(', ')}`);
      return 2;
    }
    sources = sources.filter((s) => wanted.includes(s.id));
    prune = false;
  }

  const dryRun = values['dry-run'];
  const preview = values.preview;
  const stateDir = resolve(values['state-dir'] ?? process.env.REG_MONITOR_STATE_DIR ?? join(repoRoot, '.reg-state'));
  if (!dryRun && !preview && !existsSync(stateDir)) {
    console.error(`reg-monitor: state directory ${stateDir} does not exist (the workflow checks out the reg-monitor-state branch there)`);
    return 2;
  }

  const env = process.env;
  const server = env.GITHUB_SERVER_URL ?? 'https://github.com';
  const repo = env.GITHUB_REPOSITORY ?? 'losanchos5/aige';
  const github = dryRun || preview
    ? null
    : createGitHub({ token: env.GITHUB_TOKEN, repo, apiUrl: env.GITHUB_API_URL ?? 'https://api.github.com', userAgent: USER_AGENT });

  const { results, exitCode } = await runMonitor({
    sources,
    stateDir,
    repoRoot,
    dryRun,
    preview,
    fetcher: createFetcher(),
    github,
    runUrl: env.GITHUB_RUN_ID ? `${server}/${repo}/actions/runs/${env.GITHUB_RUN_ID}` : null,
    repoUrl: `${server}/${repo}`,
    ref: env.GITHUB_SHA ?? 'main',
    prune,
  });

  const table = summaryMarkdown(results, { dryRun: dryRun || preview });
  console.log(`\n${table}`);
  if (env.GITHUB_STEP_SUMMARY) appendFileSync(env.GITHUB_STEP_SUMMARY, table);
  return exitCode;
}

if (import.meta.url === pathToFileURL(process.argv[1] ?? '').href) {
  main(process.argv.slice(2)).then(
    (code) => {
      process.exitCode = code;
    },
    (err) => {
      console.error(`reg-monitor: ${err.stack ?? err}`);
      process.exitCode = 2;
    },
  );
}
