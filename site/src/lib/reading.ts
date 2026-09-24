// reading.ts: build-time helpers for the Body of Knowledge, word counts,
// reading-time estimates, and the last-updated date from git history.

import { execFileSync } from 'node:child_process';
import { readFileSync } from 'node:fs';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const WORDS_PER_MINUTE = 200;

const HERE = dirname(fileURLToPath(import.meta.url));
// site/src/lib → repo root is three levels up.
const CHANGELOG = resolve(HERE, '..', '..', '..', 'bok', 'CHANGELOG.md');

/** Count words in a raw Markdown string, ignoring code fences and syntax noise. */
export function wordCount(markdown: string): number {
  const stripped = markdown
    .replace(/```[\s\S]*?```/g, ' ')
    .replace(/`[^`]*`/g, ' ')
    .replace(/[#>*_~|\-]+/g, ' ');
  const words = stripped.trim().match(/\S+/g);
  return words ? words.length : 0;
}

/** Reading time in whole minutes (minimum 1) for a raw Markdown string. */
export function readingTime(markdown: string): number {
  return Math.max(1, Math.round(wordCount(markdown) / WORDS_PER_MINUTE));
}

let changelogDateCache: string | undefined;

/**
 * The date (YYYY-MM-DD) of the latest entry in bok/CHANGELOG.md, whose headings
 * read `## [0.2] - 2026-09-10`. Read once and memoised. Returns undefined only
 * if the file is missing or has no dated entry.
 */
function changelogDate(): string | undefined {
  if (changelogDateCache !== undefined) return changelogDateCache || undefined;
  try {
    const text = readFileSync(CHANGELOG, 'utf8');
    // First `## [version] - YYYY-MM-DD` heading (em/en dash or hyphen).
    const match = text.match(/^##\s*\[[^\]]+\]\s*[\u2014–-]\s*(\d{4}-\d{2}-\d{2})/m);
    changelogDateCache = match ? match[1] : '';
  } catch {
    changelogDateCache = '';
  }
  return changelogDateCache || undefined;
}

/**
 * Last commit date (YYYY-MM-DD) that touched `file`, read from git at build.
 * When git returns nothing (a shallow clone with no history for the file, or
 * git being unavailable), falls back to the date of the latest CHANGELOG entry
 * rather than the build date, so pages stay stable across environments. Never
 * throws.
 */
export function gitDate(file: string): string {
  try {
    const out = execFileSync('git', ['log', '-1', '--format=%cs', '--', file], {
      cwd: process.cwd(),
      encoding: 'utf8',
      stdio: ['ignore', 'pipe', 'ignore'],
    }).trim();
    if (/^\d{4}-\d{2}-\d{2}$/.test(out)) return out;
  } catch {
    // git missing or path outside a repository; fall through to the changelog.
  }
  return changelogDate() ?? new Date().toISOString().slice(0, 10);
}

/**
 * Date (YYYY-MM-DD) of the commit that first added `file`, read from git at
 * build: the `datePublished` of the pages built from it. Falls back to
 * `gitDate(file)` when git has no add commit for the path (a shallow clone, a
 * rename, or git being unavailable). Never throws.
 */
export function gitCreated(file: string): string {
  try {
    const out = execFileSync('git', ['log', '--diff-filter=A', '--format=%cs', '--', file], {
      cwd: process.cwd(),
      encoding: 'utf8',
      stdio: ['ignore', 'pipe', 'ignore'],
    }).trim();
    // Oldest add last: git logs newest first.
    const first = out.split(/\r?\n/).filter(Boolean).pop();
    if (first && /^\d{4}-\d{2}-\d{2}$/.test(first)) return first;
  } catch {
    // git missing or path outside a repository; fall through to gitDate.
  }
  return gitDate(file);
}
