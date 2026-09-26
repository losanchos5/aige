// glossary-dates.ts: the date each glossary term last changed, read from the
// git history of bok/09-glossary.md at build time (audit 2026-09-26 CONTENT
// C-1). The glossary is one file, so its last commit would date all 300+ term
// pages alike and an edit to one term would re-date every page; here each term
// is dated by the last commit that changed what its page shows:
//
//   - its paragraph, whitespace-normalised (re-wrapping lines is not a change);
//   - the text of each source it cites, not the number (renumbering the Sources
//     list is not a change; correcting a cited source is);
//   - the rows of the "Commonly confused pairs" table that name it.
//
// Every version of the file in history is fingerprinted term by term. A commit
// dates a term when its version of the term equals the current one and none of
// its parents' versions does (git log's rewritten parents, so side branches and
// merges are handled and a revert dates the revert). The newest such commit
// wins. Two git processes per build, memoised. When git has no history (git
// missing, a shallow clone reduced to one commit) or the term's current text is
// not committed yet, the term falls back to the file's own date (gitDate), the
// behaviour before this module. The term page's visible date, its JSON-LD
// dateModified and its sitemap lastmod all read termDate().

import { execFileSync } from 'node:child_process';
import { readSource } from './md-parse';
import { gitDate } from './reading';
import { termSlug } from './glossary';

const SOURCE = 'bok/09-glossary.md';

/** One version of the glossary in history. */
export interface GlossaryVersion {
  sha: string;
  /** Rewritten parents: the nearest ancestors that also changed the file. */
  parents: string[];
  /** Commit date, YYYY-MM-DD. */
  date: string;
  markdown: string;
}

/**
 * slug -> what the term's page shows from the chapter, as one comparable
 * string: the paragraph with each `[n]` replaced by its source's text, and the
 * contrast-table rows that link the term. Same paragraph rule as lib/glossary.ts.
 */
export function termFingerprints(markdown: string): Map<string, string> {
  const text = markdown.replace(/\r\n/g, '\n');
  const [body, sourceBlock = ''] = text.split(/^##\s+Sources\s*$/m);

  const sources = new Map<string, string>();
  for (const line of sourceBlock.split('\n')) {
    const m = /^\[(\d+)\]\s+(.*)$/.exec(line.trim());
    if (m) sources.set(m[1], m[2].trim());
  }

  const rows = new Map<string, string[]>();
  for (const row of body.split('\n')) {
    if (!row.startsWith('|')) continue;
    for (const m of row.matchAll(/\]\(\/glossary\/([a-z0-9-]+)\)/g)) {
      rows.set(m[1], [...(rows.get(m[1]) ?? []), row.trim()]);
    }
  }

  const out = new Map<string, string>();
  for (const paragraph of body.split(/\n\s*\n/)) {
    const joined = paragraph.replace(/\s+/g, ' ').trim();
    const match = /^\*\*(.+?)\.\*\*\s+(.+)$/.exec(joined);
    if (!match) continue;
    const slug = termSlug(match[1].trim());
    const cited = joined.replace(/\[(\d+)\]/g, (whole, n: string) =>
      sources.has(n) ? `[${sources.get(n)}]` : whole,
    );
    out.set(slug, [cited, ...(rows.get(slug) ?? [])].join('\n'));
  }
  return out;
}

/**
 * The date of each current term: the newest commit whose version of the term
 * equals `current`'s while none of its parents' versions does. A term no
 * commit introduced in its current form (uncommitted, or no history) is absent.
 */
export function termDatesFromHistory(
  versions: readonly GlossaryVersion[],
  current: string,
): Map<string, string> {
  const target = termFingerprints(current);
  const prints = new Map(versions.map((v) => [v.sha, termFingerprints(v.markdown)]));
  const dates = new Map<string, string>();
  for (const version of versions) {
    const mine = prints.get(version.sha)!;
    for (const [slug, print] of target) {
      if (mine.get(slug) !== print) continue;
      const inherited = version.parents.some((p) => prints.get(p)?.get(slug) === print);
      if (inherited) continue;
      const seen = dates.get(slug);
      if (seen === undefined || version.date > seen) dates.set(slug, version.date);
    }
  }
  return dates;
}

/** Every committed version of the glossary, newest first; [] without git history. */
function history(): GlossaryVersion[] {
  try {
    const git = (args: string[], input?: string): Buffer =>
      execFileSync('git', args, {
        cwd: process.cwd(),
        input,
        maxBuffer: 512 * 1024 * 1024,
        stdio: ['pipe', 'pipe', 'ignore'],
      });
    // With --parents, `%P` lists the rewritten parents: the nearest ancestors
    // that changed the file, not the commits' real parents.
    const log = git(['log', '--parents', '--format=%H %P%x09%cs', '--', `:/${SOURCE}`])
      .toString('utf8')
      .split(/\r?\n/)
      .filter(Boolean)
      .map((line) => {
        const [ids, date] = line.split('\t');
        const [sha, ...parents] = ids.trim().split(/\s+/);
        return { sha, parents, date };
      })
      .filter((c) => /^[0-9a-f]{40}$/.test(c.sha) && /^\d{4}-\d{2}-\d{2}$/.test(c.date));
    if (log.length === 0) return [];

    // One `git cat-file --batch` for every version: "<oid> blob <size>\n<bytes>\n".
    const out = git(['cat-file', '--batch'], log.map((c) => `${c.sha}:${SOURCE}\n`).join(''));
    const versions: GlossaryVersion[] = [];
    let at = 0;
    for (const commit of log) {
      const eol = out.indexOf(10, at);
      if (eol < 0) break;
      const header = out.subarray(at, eol).toString('utf8');
      const m = /^[0-9a-f]+ blob (\d+)$/.exec(header);
      if (!m) {
        // "<name> missing": the file did not exist at that commit (a deletion).
        at = eol + 1;
        continue;
      }
      const size = Number(m[1]);
      versions.push({ ...commit, markdown: out.subarray(eol + 1, eol + 1 + size).toString('utf8') });
      at = eol + 1 + size + 1;
    }
    return versions;
  } catch {
    // git missing or not a repository: every term takes the file date.
    return [];
  }
}

let dates: Map<string, string> | undefined;
let fileDate: string | undefined;

/** Last-changed date (YYYY-MM-DD) of the glossary term with page slug `slug`. */
export function termDate(slug: string): string {
  if (!dates) dates = termDatesFromHistory(history(), readSource(SOURCE));
  const date = dates.get(slug);
  if (date !== undefined) return date;
  fileDate ??= gitDate(`../${SOURCE}`);
  return fileDate;
}
