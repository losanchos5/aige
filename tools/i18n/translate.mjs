#!/usr/bin/env node
// Machine translation of the Body of Knowledge, the patterns, the Thesis and the
// site UI strings into es, fr, de and pt. See README.md in this directory.
//
//   node tools/i18n/translate.mjs --estimate                      # tokens and USD, no API
//   node tools/i18n/translate.mjs --dry-run --sync                # the plan, no API, no writes
//   I18N_DIR=/tmp/x node tools/i18n/translate.mjs --mock          # pseudo-translation, no API
//   node tools/i18n/translate.mjs --sync --only 'bok/04-*.md' --langs es --max-usd 0.10
//   node tools/i18n/translate.mjs --batch --max-usd 12            # the full pass (Message Batches API)

import { mkdirSync, writeFileSync } from 'node:fs';
import { dirname } from 'node:path';
import { pathToFileURL } from 'node:url';
import { parseArgs } from 'node:util';

import { DEFAULT_MAX_USD, DEFAULT_MODEL, LANGS, resolveDirs } from './lib/config.mjs';
import { run } from './lib/run.mjs';

const HELP = `Usage: node tools/i18n/translate.mjs <mode> [options]

Modes (exactly one):
  --mock            deterministic pseudo-translation, no network (needs I18N_DIR)
  --estimate        token counts and estimated USD per language; no API, no writes
  --sync            Messages API, for small incremental runs
  --batch           Message Batches API (50% cheaper): create, save the id, poll,
                    resume an interrupted batch, apply the results

Options:
  --langs es,fr,de,pt   target languages (default: all four)
  --only <glob>         limit to sources matching a repo-relative glob; repeatable
                        (e.g. 'bok/04-*.md', 'bok/patterns/**', 'THESIS.md')
  --max-usd <n>         HARD cap on estimated plus real spend (default ${DEFAULT_MAX_USD})
  --dry-run             print the plan and the estimate; call no API, write nothing
  --model <id>          model (default ${DEFAULT_MODEL})
  --price-in <n>        USD per million input tokens, for a model without a known price
  --price-out <n>       USD per million output tokens, idem
  --force               re-render files even when their sourceHash matches
  --full                with --estimate: ignore the translation memory and sourceHash
  --concurrency <n>     parallel Messages API requests (default 4)
  --poll-seconds <n>    batch polling interval (default 60)
  --max-wait-minutes <n>  stop waiting for a batch after this long (default 300);
                        the id stays in i18n/.tm/pending-batches.json for the next run
  --no-wait             batch: submit or check once, do not wait
  --cache-ttl 5m|1h|off prompt caching of the fixed system prompt (default 5m)
  --date YYYY-MM-DD     translatedAt (default today, or $I18N_DATE)
  --report <file>       write the run report as JSON
  --summary <file>      write a Markdown summary (the pull request body in CI)

Environment: ANTHROPIC_API_KEY (sync, batch); I18N_DIR (default <repo>/i18n);
I18N_UI_DIR (default site/src/i18n, or <I18N_DIR>/ui when I18N_DIR is set).

Exit status: 0 when the run reported no error; 1 when it failed or reported one
(a file kept out because its structure changed, an API error), after writing
the files that passed, the report and the summary; 2 for bad arguments.`;

function fail(msg, code = 2) {
  console.error(`translate: ${msg}`);
  process.exit(code);
}

/** "a,b" is two globs; the comma inside "{a,b}" belongs to the glob. */
function splitTopLevelCommas(s) {
  const out = [];
  let depth = 0;
  let cur = '';
  for (const c of s) {
    if (c === '{') depth++;
    else if (c === '}') depth = Math.max(0, depth - 1);
    if (c === ',' && depth === 0) {
      out.push(cur);
      cur = '';
    } else {
      cur += c;
    }
  }
  out.push(cur);
  return out;
}

export function parseCli(argv) {
  const { values } = parseArgs({
    args: argv,
    options: {
      mock: { type: 'boolean' },
      estimate: { type: 'boolean' },
      sync: { type: 'boolean' },
      batch: { type: 'boolean' },
      langs: { type: 'string' },
      only: { type: 'string', multiple: true },
      'max-usd': { type: 'string' },
      'dry-run': { type: 'boolean' },
      model: { type: 'string' },
      'price-in': { type: 'string' },
      'price-out': { type: 'string' },
      force: { type: 'boolean' },
      full: { type: 'boolean' },
      concurrency: { type: 'string' },
      'poll-seconds': { type: 'string' },
      'max-wait-minutes': { type: 'string' },
      'no-wait': { type: 'boolean' },
      'cache-ttl': { type: 'string' },
      date: { type: 'string' },
      report: { type: 'string' },
      summary: { type: 'string' },
      help: { type: 'boolean', short: 'h' },
    },
    strict: true,
  });
  if (values.help) return { help: true };
  const modes = ['mock', 'estimate', 'sync', 'batch'].filter((m) => values[m]);
  if (modes.length !== 1) throw new Error('choose exactly one mode: --mock, --estimate, --sync or --batch');
  const mode = modes[0];
  const langs = (values.langs ?? LANGS.join(',')).split(',').map((s) => s.trim()).filter(Boolean);
  for (const l of langs) if (!LANGS.includes(l)) throw new Error(`unknown language ${l} (expected ${LANGS.join(', ')})`);
  const num = (name, v, dflt) => {
    if (v === undefined) return dflt;
    const n = Number(v);
    if (!Number.isFinite(n) || n < 0) throw new Error(`--${name} must be a number >= 0`);
    return n;
  };
  const date = values.date ?? process.env.I18N_DATE;
  if (date !== undefined && !/^\d{4}-\d{2}-\d{2}$/.test(date)) throw new Error('--date must be YYYY-MM-DD');
  if (values.full && mode !== 'estimate' && !values['dry-run']) throw new Error('--full only goes with --estimate or --dry-run');
  if (values['cache-ttl'] !== undefined && !['5m', '1h', 'off'].includes(values['cache-ttl'])) throw new Error('--cache-ttl must be 5m, 1h or off');
  const priceOverride = {};
  if (values['price-in'] !== undefined) priceOverride.input = num('price-in', values['price-in']);
  if (values['price-out'] !== undefined) priceOverride.output = num('price-out', values['price-out']);
  return {
    mode,
    langs: [...new Set(langs)],
    only: (values.only ?? []).flatMap(splitTopLevelCommas).map((s) => s.trim()).filter(Boolean),
    maxUsd: num('max-usd', values['max-usd'], DEFAULT_MAX_USD),
    dryRun: !!values['dry-run'],
    model: values.model ?? DEFAULT_MODEL,
    priceOverride,
    force: !!values.force,
    full: !!values.full,
    concurrency: Math.max(1, Math.floor(num('concurrency', values.concurrency, 4))),
    pollMs: num('poll-seconds', values['poll-seconds'], 60) * 1000,
    maxWaitMs: num('max-wait-minutes', values['max-wait-minutes'], 300) * 60_000,
    wait: !values['no-wait'],
    cacheTtl: values['cache-ttl'] ?? '5m',
    date,
    reportPath: values.report,
    summaryPath: values.summary,
  };
}

/** A Markdown summary of a run (the body of the pull request the workflow opens). */
export function summaryMarkdown(report) {
  const usd = (n) => `USD ${n.toFixed(4)}`;
  const lines = [];
  lines.push(`Machine translation run (${report.mode}, model \`${report.model}\`, ${report.date}).`);
  lines.push('');
  lines.push(`- Languages: ${report.langs.join(', ')}`);
  lines.push(`- Real spend: ${usd(report.spentUsd)} (cap ${usd(report.capUsd)})${report.stoppedByCap ? '; the cap stopped part of the work, run again to continue' : ''}`);
  if (report.pendingBatches.length) lines.push(`- Batches still processing: ${report.pendingBatches.join(', ')} (saved in \`i18n/.tm/pending-batches.json\`; the next batch run resumes them)`);
  lines.push('');
  lines.push('| Language | Files written | Deferred | Segments translated | From memory | English kept (failed twice) |');
  lines.push('|---|---|---|---|---|---|');
  for (const [lang, pl] of Object.entries(report.perLang)) {
    lines.push(`| ${lang} | ${pl.written.length} | ${pl.deferred.length} | ${pl.segments.translated} | ${pl.segments.fromTm} | ${pl.segments.fallback} |`);
  }
  const written = Object.values(report.perLang).flatMap((pl) => pl.written);
  if (written.length) {
    lines.push('');
    lines.push(`<details><summary>${written.length} file(s) written</summary>`);
    lines.push('');
    for (const f of written) lines.push(`- \`${f}\``);
    lines.push('');
    lines.push('</details>');
  }
  if (report.fallbacks.length) {
    lines.push('');
    lines.push(`<details><summary>${report.fallbacks.length} segment(s) kept in English after a retry</summary>`);
    lines.push('');
    for (const f of report.fallbacks.slice(0, 50)) {
      lines.push(`- ${f.lang}: "${f.source.replace(/\s+/g, ' ').slice(0, 100)}" (${(f.errors ?? []).join('; ')})`);
    }
    if (report.fallbacks.length > 50) lines.push(`- and ${report.fallbacks.length - 50} more (see the run log)`);
    lines.push('');
    lines.push('</details>');
  }
  if (report.errors.length) {
    lines.push('');
    lines.push('Errors:');
    for (const e of report.errors.slice(0, 20)) lines.push(`- ${e}`);
  }
  lines.push('');
  lines.push('Review before merging: machine translation, checked automatically for placeholders, citation markers, links, bold markers and the em dash, not by a person.');
  return lines.join('\n') + '\n';
}

async function main() {
  let opts;
  try {
    opts = parseCli(process.argv.slice(2));
  } catch (err) {
    fail(`${err.message}\n\n${HELP}`);
  }
  if (opts.help) {
    console.log(HELP);
    return;
  }
  const dirs = resolveDirs();
  if (opts.mode === 'mock' && !opts.dryRun && dirs.i18nDirIsDefault) {
    fail('--mock writes pseudo-translations: set I18N_DIR to a scratch directory (it never writes into the repository i18n/)');
  }
  let report;
  try {
    report = await run({ ...opts, dirs });
  } catch (err) {
    console.error(`translate: ${err.stack ?? err.message}`);
    if (opts.summaryPath) {
      mkdirSync(dirname(opts.summaryPath), { recursive: true });
      writeFileSync(
        opts.summaryPath,
        `The translation run (${opts.mode}) failed: ${String(err.message).replace(/\u2014/g, ',')}\n\n`
          + 'Segments validated before the failure are kept in the translation memory (i18n/.tm/), so the next run does not pay for them again.\n',
      );
    }
    process.exit(1);
  }
  for (const [lang, pl] of Object.entries(report.perLang)) {
    if (opts.mode === 'estimate' || opts.dryRun) break;
    console.log(`${lang}: wrote ${pl.written.length}, unchanged ${pl.unchanged.length}, deferred ${pl.deferred.length}; translated ${pl.segments.translated}, English kept ${pl.segments.fallback}`);
  }
  if (!(opts.mode === 'estimate' || opts.dryRun)) {
    console.log(`real spend: USD ${report.spentUsd.toFixed(4)} of a USD ${report.capUsd.toFixed(2)} cap${report.stoppedByCap ? ' (the cap stopped part of the work)' : ''}`);
  }
  for (const e of report.errors) console.error(`error: ${e}`);
  if (opts.reportPath) {
    mkdirSync(dirname(opts.reportPath), { recursive: true });
    writeFileSync(opts.reportPath, JSON.stringify(report, null, 2) + '\n');
  }
  if (opts.summaryPath) {
    mkdirSync(dirname(opts.summaryPath), { recursive: true });
    writeFileSync(opts.summaryPath, summaryMarkdown(report));
  }
  // Whatever passed is written; an error still fails the run, so it is seen.
  if (report.errors.length) process.exitCode = 1;
}

if (import.meta.url === pathToFileURL(process.argv[1] ?? '').href) await main();
