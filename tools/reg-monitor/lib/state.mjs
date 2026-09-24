// Monitor state: one JSON index plus the last normalised text of each HTML
// source (needed to diff the next version). It lives in a checkout of the
// orphan branch `reg-monitor-state`, never on main, because every push to main
// deploys the site. The workflow commits and pushes this directory.

import { existsSync, mkdirSync, readFileSync, readdirSync, renameSync, rmSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';

const STATE_FILE = 'state.json';
const TEXT_DIR = 'text';

const BRANCH_README = `# reg-monitor-state

Machine-written state of the regulatory change monitor (\`tools/reg-monitor\` on \`main\`).
This orphan branch shares no history with \`main\` and is never merged: every push to \`main\`
deploys the site, so the daily state must not land there. Do not edit by hand.

- \`state.json\`: per source, the SHA-256 of the normalised content, when that version was first
  seen, and the fetch-failure counter.
- \`text/<id>.txt\`: the last normalised text of each HTML source, used to diff the next version.
`;

export function loadState(dir) {
  const file = join(dir, STATE_FILE);
  if (!existsSync(file)) return { schema: 1, sources: {} };
  const parsed = JSON.parse(readFileSync(file, 'utf8'));
  return { schema: parsed.schema ?? 1, sources: parsed.sources ?? {} };
}

export function readText(dir, id) {
  const file = join(dir, TEXT_DIR, `${id}.txt`);
  return existsSync(file) ? readFileSync(file, 'utf8') : null;
}

function writeAtomic(file, content) {
  const tmp = `${file}.tmp`;
  writeFileSync(tmp, content);
  renameSync(tmp, file);
}

function sorted(obj) {
  return Object.fromEntries(Object.keys(obj).sort().map((k) => [k, obj[k]]));
}

// Persist one source right away, so a crash later in the run keeps what was
// already notified.
export function saveSource(dir, state, id, record, text) {
  mkdirSync(join(dir, TEXT_DIR), { recursive: true });
  state.sources[id] = record;
  if (typeof text === 'string') writeAtomic(join(dir, TEXT_DIR, `${id}.txt`), `${text}\n`);
  else if (text === null) rmSync(join(dir, TEXT_DIR, `${id}.txt`), { force: true });
  writeState(dir, state);
}

export function writeState(dir, state) {
  mkdirSync(dir, { recursive: true });
  const readme = join(dir, 'README.md');
  if (!existsSync(readme)) writeFileSync(readme, BRANCH_README);
  writeAtomic(join(dir, STATE_FILE), `${JSON.stringify({ schema: 1, sources: sorted(state.sources) }, null, 2)}\n`);
}

// Drop records and texts of sources no longer listed in sources.json.
export function pruneState(dir, state, keepIds) {
  const keep = new Set(keepIds);
  const removed = Object.keys(state.sources).filter((id) => !keep.has(id));
  for (const id of removed) delete state.sources[id];
  const textDir = join(dir, TEXT_DIR);
  if (existsSync(textDir)) {
    for (const name of readdirSync(textDir)) {
      const id = name.replace(/\.txt$/, '');
      if (!keep.has(id)) {
        rmSync(join(textDir, name), { force: true });
        if (!removed.includes(id)) removed.push(id);
      }
    }
  }
  if (removed.length) writeState(dir, state);
  return removed;
}

// Normalised text as stored (saveSource appends one trailing newline).
export function storedText(raw) {
  return raw === null ? null : raw.replace(/\n$/, '');
}
