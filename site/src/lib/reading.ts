// reading.ts: build-time helpers for the Body of Knowledge — word counts,
// reading-time estimates, and the last-updated date from git history.

import { execSync } from 'node:child_process';

const WORDS_PER_MINUTE = 200;

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

/**
 * Last commit date (YYYY-MM-DD) that touched `file`, read from git at build.
 * Falls back to today's date when git is unavailable (e.g. a shallow CI clone
 * or an unstaged working copy).
 */
export function gitDate(file: string): string {
  try {
    const out = execSync(`git log -1 --format=%cs -- "${file}"`, {
      cwd: process.cwd(),
      encoding: 'utf8',
      stdio: ['ignore', 'pipe', 'ignore'],
    }).trim();
    if (/^\d{4}-\d{2}-\d{2}$/.test(out)) return out;
  } catch {
    // git missing or path outside a repository; fall through to build date.
  }
  return new Date().toISOString().slice(0, 10);
}
