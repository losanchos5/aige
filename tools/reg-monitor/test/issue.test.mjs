import assert from 'node:assert/strict';
import { test } from 'node:test';

import { unifiedDiff } from '../lib/diff.mjs';
import {
  fence, formatCommentBody, formatIssueBody, formatUnreachableBody, issueTitle, LABEL, marker,
  MAX_BODY_CHARS,
} from '../lib/issue.mjs';

const source = {
  id: 'ec-ai-act-standardisation',
  name: 'European Commission: Standardisation of the AI Act | harmonised standards',
  url: 'https://digital-strategy.ec.europa.eu/en/policies/ai-act-standardisation',
  jurisdiction: 'EU',
};

function change(overrides = {}) {
  return {
    source,
    previous: { sha256: 'a'.repeat(64), observedAt: '2026-09-01T06:17:00Z' },
    current: { kind: 'html', sha256: 'b'.repeat(64) },
    diff: unifiedDiff('No harmonised standard has been cited.', 'EN 18286 has been cited in the Official Journal.', { label: source.id }),
    citing: [
      { file: 'bok/08-regulatory-map.md', lines: [381] },
      { file: 'bok/02-why-now.md', lines: [208, 210] },
    ],
    detectedAt: '2026-09-25T06:18:00Z',
    runUrl: 'https://github.com/losanchos5/aige/actions/runs/1',
    repoUrl: 'https://github.com/losanchos5/aige',
    ref: 'abc123',
    selectMatched: true,
    ...overrides,
  };
}

test('title and marker identify the source', () => {
  assert.equal(issueTitle(source), `Regulatory change: ${source.name}`);
  assert.match(issueTitle(source, 'unreachable'), /^Regulatory monitor: source unreachable: /);
  assert.equal(marker('x-y'), '<!-- reg-monitor:source=x-y -->');
  assert.equal(LABEL.name, 'regulatory-change');
});

test('issue body: marker first, details, fenced diff, citing files with links, checklist', () => {
  const body = formatIssueBody(change());
  assert.ok(body.startsWith(marker(source.id)));
  assert.match(body, /\| URL \| https:\/\/digital-strategy\.ec\.europa\.eu\/en\/policies\/ai-act-standardisation \|/);
  assert.match(body, /Standardisation of the AI Act \\\| harmonised standards/); // pipe escaped in the table
  assert.match(body, /`aaaaaaaaaaaa` to `bbbbbbbbbbbb`/);
  assert.match(body, /```diff\n--- a\/ec-ai-act-standardisation\n\+\+\+ b\/ec-ai-act-standardisation\n@@ -1,1 \+1,1 @@\n-No harmonised standard has been cited\.\n\+EN 18286 has been cited in the Official Journal\.\n```/);
  assert.match(body, /\[`bok\/02-why-now\.md`\]\(https:\/\/github\.com\/losanchos5\/aige\/blob\/abc123\/bok\/02-why-now\.md#L208\) \(lines 208, 210\)/);
  assert.match(body, /- \[ \] Close this issue\./);
  assert.match(body, /Nothing was\npublished/);
});

test('the fence is longer than any backtick run in page content', () => {
  assert.equal(fence('plain'), '```\nplain\n```');
  assert.equal(fence('a ```` b', 'diff'), '`````diff\na ```` b\n`````');
  const body = formatIssueBody(change({ diff: unifiedDiff('x', 'y ``` @maintainer #1', { label: 'x' }) }));
  assert.match(body, /````diff\n[\s\S]*@maintainer #1\n````/);
});

test('truncated and coarse diffs say so; a stale selector is flagged', () => {
  const big = unifiedDiff(Array.from({ length: 300 }, (_, i) => `a${i}`).join('\n'), Array.from({ length: 300 }, (_, i) => `b${i}`).join('\n'), { maxLines: 10 });
  const body = formatIssueBody(change({ diff: { ...big, coarse: true }, selectMatched: false }));
  assert.match(body, /Excerpt truncated: \d+ more diff line\(s\) not shown\./);
  assert.match(body, /too large for a line-by-line diff/);
  assert.match(body, /`select` hint no longer matches/);
});

test('PDF changes list size, ETag and Last-Modified instead of a text diff', () => {
  const body = formatIssueBody(change({
    previous: { sha256: 'a'.repeat(64), bytes: 1000, etag: '"v1"', lastModified: 'Mon, 01 Sep 2026 00:00:00 GMT' },
    current: { kind: 'pdf', sha256: 'c'.repeat(64), bytes: 1200, etag: '"v2"', lastModified: 'Wed, 24 Sep 2026 00:00:00 GMT' },
    diff: null,
  }));
  assert.match(body, /\| Size \(bytes\) \| 1000 to 1200 \|/);
  assert.match(body, /\| ETag \| "v1" to "v2" \|/);
  assert.match(body, /The PDF bytes changed/);
  assert.doesNotMatch(body, /```diff/);
});

test('no citing file is called out', () => {
  assert.match(formatIssueBody(change({ citing: [] })), /No tracked file cites this exact URL any more/);
});

test('comment body carries the diff but not the marker or the checklist', () => {
  const body = formatCommentBody(change());
  assert.ok(!body.includes(marker(source.id)));
  assert.match(body, /^\*\*Further change detected on 2026-09-25T06:18:00Z\.\*\*/);
  assert.match(body, /```diff/);
  assert.doesNotMatch(body, /What to do/);
});

test('unreachable body and comment', () => {
  const failure = {
    source, error: 'HTTP 404', failures: 3, since: '2026-09-22T06:17:00Z', detectedAt: '2026-09-24T06:17:00Z',
    runUrl: null, citing: [], repoUrl: 'https://github.com/losanchos5/aige', ref: 'main',
  };
  const body = formatUnreachableBody(failure);
  assert.ok(body.startsWith(marker(source.id)));
  assert.match(body, /3 consecutive runs/);
  assert.match(body, /\| Last error \| HTTP 404 \|/);
  const comment = formatUnreachableBody(failure, { asComment: true });
  assert.ok(!comment.includes(marker(source.id)));
});

test('bodies are clamped under the GitHub size limit', () => {
  const huge = { text: 'x'.repeat(100000), added: 1, removed: 1, truncated: false, omittedLines: 0, coarse: false, identical: false };
  const body = formatIssueBody(change({ diff: huge }));
  assert.ok(body.length <= MAX_BODY_CHARS);
  assert.match(body, /\(Body truncated to fit the GitHub size limit\.\)$/);
});

test('generated text never contains an em dash', () => {
  const texts = [formatIssueBody(change()), formatCommentBody(change()), formatUnreachableBody({ source, error: 'e', failures: 3, citing: [] })];
  for (const t of texts) assert.ok(!t.includes('\u2014'));
});
