import assert from 'node:assert/strict';
import { test } from 'node:test';

import { clipLine, diffLines, firstDifference, hunks, unifiedDiff } from '../lib/diff.mjs';

function apply(ops) {
  return {
    a: ops.filter((o) => o.op !== '+').map((o) => o.line),
    b: ops.filter((o) => o.op !== '-').map((o) => o.line),
  };
}

test('identical texts produce no diff', () => {
  const d = unifiedDiff('a\nb', 'a\nb');
  assert.equal(d.identical, true);
  assert.equal(d.text, '');
});

test('a one-line change renders a standard unified hunk', () => {
  const oldText = ['1', '2', '3', '4', '5', '6', '7', '8', '9'].join('\n');
  const newText = ['1', '2', '3', '4', 'five', '6', '7', '8', '9'].join('\n');
  const d = unifiedDiff(oldText, newText, { label: 'src' });
  assert.equal(d.text, [
    '--- a/src',
    '+++ b/src',
    '@@ -2,7 +2,7 @@',
    ' 2', ' 3', ' 4', '-5', '+five', ' 6', ' 7', ' 8',
  ].join('\n'));
  assert.equal(d.added, 1);
  assert.equal(d.removed, 1);
  assert.equal(d.truncated, false);
});

test('insertions at the start and deletions at the end', () => {
  const d = unifiedDiff('b\nc', 'a\nb');
  assert.equal(d.text, ['--- a/source', '+++ b/source', '@@ -1,2 +1,2 @@', '+a', ' b', '-c'].join('\n'));
  const fromEmpty = unifiedDiff('', 'x\ny');
  assert.match(fromEmpty.text, /@@ -0,0 \+1,2 @@\n\+x\n\+y/);
});

test('distant changes make separate hunks; close ones merge', () => {
  const a = Array.from({ length: 30 }, (_, i) => `line ${i}`);
  const b = [...a];
  b[2] = 'changed 2';
  b[25] = 'changed 25';
  assert.equal(hunks(diffLines(a, b).ops).length, 2);
  const c = [...a];
  c[2] = 'x';
  c[7] = 'y';
  assert.equal(hunks(diffLines(a, c).ops).length, 1);
});

test('Myers diff ops always reconstruct both inputs (randomised)', () => {
  let seed = 42;
  const rand = () => {
    seed = (seed * 1103515245 + 12345) % 2147483648;
    return seed / 2147483648;
  };
  for (let round = 0; round < 200; round++) {
    const a = Array.from({ length: Math.floor(rand() * 20) }, () => String.fromCharCode(97 + Math.floor(rand() * 5)));
    const b = Array.from({ length: Math.floor(rand() * 20) }, () => String.fromCharCode(97 + Math.floor(rand() * 5)));
    const { ops, coarse } = diffLines(a, b);
    assert.equal(coarse, false);
    assert.deepEqual(apply(ops), { a, b });
  }
});

test('past maxEdits the diff falls back to a coarse listing that still reconstructs', () => {
  const a = Array.from({ length: 50 }, (_, i) => `old ${i}`);
  const b = Array.from({ length: 50 }, (_, i) => `new ${i}`);
  const { ops, coarse } = diffLines(a, b, { maxEdits: 10 });
  assert.equal(coarse, true);
  assert.deepEqual(apply(ops), { a, b });
});

test('a small change in a long text is fast and exact', () => {
  const a = Array.from({ length: 20000 }, (_, i) => `Paragraph ${i} of the consolidated text.`);
  const b = [...a];
  b[12345] = 'Paragraph 12345 as amended by Regulation (EU) 2026/1744.';
  const started = Date.now();
  const d = unifiedDiff(a.join('\n'), b.join('\n'));
  assert.ok(Date.now() - started < 2000);
  assert.equal(d.added, 1);
  assert.equal(d.removed, 1);
  assert.match(d.text, /@@ -12343,7 \+12343,7 @@/);
});

test('the excerpt is truncated by lines and by characters', () => {
  const a = Array.from({ length: 400 }, (_, i) => `a${i}`).join('\n');
  const b = Array.from({ length: 400 }, (_, i) => `b${i}`).join('\n');
  const byLines = unifiedDiff(a, b, { maxLines: 20 });
  assert.equal(byLines.text.split('\n').length, 20);
  assert.equal(byLines.truncated, true);
  assert.ok(byLines.omittedLines > 0);
  const byChars = unifiedDiff(a, b, { maxChars: 100 });
  assert.ok(byChars.text.length <= 100);
  assert.equal(byChars.truncated, true);
});

test('long paragraph lines are clipped around the first difference', () => {
  const base = 'x'.repeat(2000);
  const oldLine = `${base} shall apply from 2 August 2026.`;
  const newLine = `${base} shall apply from 2 December 2027.`;
  const d = unifiedDiff(oldLine, newLine, { lineWidth: 200 });
  const [minus, plus] = d.text.split('\n').slice(3);
  assert.match(minus, /^-\.\.\.x+ shall apply from 2 August 2026\.$/);
  assert.match(plus, /^\+\.\.\.x+ shall apply from 2 December 2027\.$/);
  assert.equal(firstDifference('abcd', 'abXd'), 2);
  assert.equal(clipLine('short'), 'short');
  assert.equal(clipLine('y'.repeat(1000), { width: 10 }), `${'y'.repeat(10)}...`);
});
