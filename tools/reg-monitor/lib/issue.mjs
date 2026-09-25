// Issue and comment bodies. Pure functions, so the tests can pin the format.
// External text (the diff) only ever appears inside a code fence that is
// longer than any backtick run it contains, so page content cannot break out
// of the fence, and GitHub does not turn @mentions or #refs inside code into
// notifications or links.

export const LABEL = {
  name: 'regulatory-change',
  color: 'b60205',
  description: 'A page the site cites changed; opened by tools/reg-monitor, handled by a person',
};

// GitHub caps an issue or comment body at 65,536 characters.
export const MAX_BODY_CHARS = 60000;

export function marker(sourceId) {
  return `<!-- reg-monitor:source=${sourceId} -->`;
}

export function issueTitle(source, kind = 'change') {
  return kind === 'unreachable'
    ? `Regulatory monitor: source unreachable: ${source.name}`
    : `Regulatory change: ${source.name}`;
}

export function fence(text, lang = '') {
  const longest = Math.max(0, ...[...String(text).matchAll(/`+/g)].map((m) => m[0].length));
  const ticks = '`'.repeat(Math.max(3, longest + 1));
  return `${ticks}${lang}\n${text}\n${ticks}`;
}

function cell(value) {
  return String(value ?? '').replace(/\|/g, '\\|').replace(/\r?\n/g, ' ');
}

function shortHash(h) {
  return h ? h.slice(0, 12) : 'none';
}

function citingList(citing, repoUrl, ref) {
  if (!citing || citing.length === 0) {
    return ['No tracked file cites this exact URL any more; check whether `sources.json` should drop it.'];
  }
  return citing.map(({ file, lines }) => {
    const shown = lines.slice(0, 8);
    const more = lines.length > shown.length ? `, +${lines.length - shown.length} more` : '';
    const link = repoUrl ? `[\`${file}\`](${repoUrl}/blob/${ref}/${file}#L${shown[0]})` : `\`${file}\``;
    return `- ${link} (line${lines.length > 1 ? 's' : ''} ${shown.join(', ')}${more})`;
  });
}

function detailsTable(change) {
  const { source, previous, current } = change;
  const rows = [
    ['Source', `${cell(source.name)} (\`${source.id}\`)`],
    ['URL', source.url],
    ['Jurisdiction', cell(source.jurisdiction)],
    ['Detected', change.detectedAt],
    ['Previous version first seen', previous?.observedAt ?? 'unknown'],
    ['SHA-256', `\`${shortHash(previous?.sha256)}\` to \`${shortHash(current.sha256)}\``],
  ];
  if (current.kind === 'pdf') {
    rows.push(['Size (bytes)', `${previous?.bytes ?? 'unknown'} to ${current.bytes ?? 'unknown'}`]);
    rows.push(['ETag', `${cell(previous?.etag ?? 'none')} to ${cell(current.etag ?? 'none')}`]);
    rows.push(['Last-Modified', `${cell(previous?.lastModified ?? 'none')} to ${cell(current.lastModified ?? 'none')}`]);
  }
  if (change.runUrl) rows.push(['Run', change.runUrl]);
  return ['| Field | Value |', '|---|---|', ...rows.map(([k, v]) => `| ${k} | ${v} |`)];
}

function diffSection(change) {
  const { current, diff } = change;
  if (current.kind === 'pdf') {
    return [
      '### What changed',
      '',
      'The PDF bytes changed (the monitor hashes PDFs; it does not extract their text). Open the',
      'document and compare it with the version the site cites.',
    ];
  }
  const out = ['### Diff excerpt (normalised text)', ''];
  if (!change.selectMatched) {
    out.push('> The configured `select` hint no longer matches this page, so the whole body was read.');
    out.push('> The page layout probably changed: update the hint in `tools/reg-monitor/sources.json`.');
    out.push('');
  }
  out.push(`${diff.removed} line(s) removed, ${diff.added} line(s) added.`);
  if (diff.coarse) out.push('The change is too large for a line-by-line diff; the excerpt lists removed then added lines.');
  out.push('', fence(diff.text, 'diff'));
  if (diff.truncated) out.push('', `Excerpt truncated: ${diff.omittedLines} more diff line(s) not shown.`);
  return out;
}

const CHECKLIST = [
  '### What to do',
  '',
  '- [ ] Read the change on the official page (the excerpt is normalised text, not the source).',
  '- [ ] Decide whether any claim, date or status on the site depends on it.',
  '- [ ] If it does, edit the files listed above, re-verify the citation and update its "as of" date.',
  '- [ ] Close this issue. The monitor never edits the site; a further change on this page adds a',
  '      comment here while the issue is open, or opens a new issue once it is closed.',
];

function clamp(body) {
  if (body.length <= MAX_BODY_CHARS) return body;
  return `${body.slice(0, MAX_BODY_CHARS - 80)}\n\n(Body truncated to fit the GitHub size limit.)`;
}

// change: { source, previous, current, diff, citing, detectedAt, runUrl, repoUrl, ref, selectMatched }
export function formatIssueBody(change) {
  return clamp([
    marker(change.source.id),
    'The regulatory monitor detected a change on an official page that the site cites. Nothing was',
    'published: a person reviews the change and decides what, if anything, to edit.',
    '',
    ...detailsTable(change),
    '',
    ...diffSection(change),
    '',
    '### Files that cite this URL',
    '',
    ...citingList(change.citing, change.repoUrl, change.ref ?? 'main'),
    '',
    ...CHECKLIST,
  ].join('\n'));
}

export function formatCommentBody(change) {
  return clamp([
    `**Further change detected on ${change.detectedAt}.**`,
    '',
    ...detailsTable(change),
    '',
    ...diffSection(change),
    '',
    '### Files that cite this URL',
    '',
    ...citingList(change.citing, change.repoUrl, change.ref ?? 'main'),
  ].join('\n'));
}

// failure: { source, error, failures, since, detectedAt, runUrl, citing, repoUrl, ref }
export function formatUnreachableBody(failure, { asComment = false } = {}) {
  const lines = [];
  if (!asComment) {
    lines.push(marker(failure.source.id));
    lines.push('The regulatory monitor could not read an official page that the site cites for');
    lines.push(`${failure.failures} consecutive runs. The page may have moved, been withdrawn or started`);
    lines.push('blocking automated readers. A moved or withdrawn page is itself a regulatory signal.');
  } else {
    lines.push(`**Source unreachable for ${failure.failures} consecutive runs (${failure.detectedAt}).**`);
  }
  lines.push(
    '',
    '| Field | Value |',
    '|---|---|',
    `| Source | ${cell(failure.source.name)} (\`${failure.source.id}\`) |`,
    `| URL | ${failure.source.url} |`,
    `| Last error | ${cell(failure.error)} |`,
    `| Failing since | ${failure.since ?? 'unknown'} |`,
  );
  if (failure.runUrl) lines.push(`| Run | ${failure.runUrl} |`);
  lines.push('', '### Files that cite this URL', '', ...citingList(failure.citing, failure.repoUrl, failure.ref ?? 'main'));
  if (!asComment) {
    lines.push(
      '',
      '### What to do',
      '',
      '- [ ] Open the URL in a browser. If it moved, update the citations and `sources.json`.',
      '- [ ] If it only blocks automated readers, add a note to the source in `sources.json` or drop it.',
    );
  }
  return clamp(lines.join('\n'));
}
