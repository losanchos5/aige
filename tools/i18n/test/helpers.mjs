// Shared test helpers: the real sources, scratch directories, a fake API client.

import { cpSync, mkdtempSync, mkdirSync, rmSync } from 'node:fs';
import { createRequire } from 'node:module';
import { tmpdir } from 'node:os';
import { dirname, join } from 'node:path';
import { pathToFileURL } from 'node:url';

import { REPO, resolveDirs } from '../lib/config.mjs';
import { discoverSources, loadSource } from '../lib/document.mjs';
import { loadGlossary } from '../lib/glossary.mjs';
import { mockTranslate } from '../lib/mock.mjs';

export { REPO };

export const glossary = () => loadGlossary(join(REPO, 'i18n', 'glossary-lock.json'));

/** The real English sources, loaded once. */
let docsCache;
export function realDocs() {
  docsCache ??= discoverSources(REPO).map((s) => loadSource(s, REPO));
  return docsCache;
}

export function scratch(prefix = 'i18n-test-') {
  const dir = mkdtempSync(join(tmpdir(), prefix));
  return { dir, cleanup: () => rmSync(dir, { recursive: true, force: true }) };
}

/** Directories for a run whose outputs go to a scratch directory. */
export function scratchDirs(dir, extra = {}) {
  return resolveDirs({ I18N_DIR: join(dir, 'i18n'), I18N_CALLOUTS: join(dir, 'no-callouts.json'), ...extra });
}

/** A small source tree (copies of real files) for tests that edit the English. */
export function fixtureTree(dir, rels) {
  const root = join(dir, 'src');
  for (const rel of rels) {
    mkdirSync(dirname(join(root, rel)), { recursive: true });
    cpSync(join(REPO, rel), join(root, rel));
  }
  return root;
}

/** The segments of a request, read back from its user message. */
export function segmentsOf(params) {
  const content = params.messages[0].content;
  const lang = /^Target language: (\w+)/.exec(content)[1];
  const items = JSON.parse(content.slice(content.indexOf('\n[') + 1));
  return { lang, items };
}

/**
 * A fake Claude API client with the four methods the pipeline uses.
 * `answer(item, lang, callNo)` returns the translation of one segment (default: the mock).
 */
export function fakeClient({ answer, usage = { input_tokens: 1000, output_tokens: 500 }, ended = true } = {}) {
  const g = glossary();
  const calls = [];
  const batches = new Map();
  let n = 0;
  const reply = (params) => {
    const { lang, items } = segmentsOf(params);
    n++;
    const segs = items.map((it) => ({ id: it.id, t: answer ? answer(it, lang, n) : mockTranslate(it.text, lang, g) })).filter((x) => x.t !== undefined);
    return {
      type: 'message',
      role: 'assistant',
      stop_reason: 'end_turn',
      content: [{ type: 'text', text: JSON.stringify({ segments: segs }) }],
      usage: typeof usage === 'function' ? usage(params) : usage,
    };
  };
  return {
    calls,
    batches,
    ended,
    async create(params) {
      calls.push(params);
      return reply(params);
    },
    async batchCreate(requests) {
      const id = `msgbatch_fake${batches.size + 1}`;
      batches.set(id, requests);
      return { id, processing_status: 'in_progress' };
    },
    async batchRetrieve(id) {
      return { id, processing_status: this.ended ? 'ended' : 'in_progress' };
    },
    async *batchResults(id) {
      for (const r of batches.get(id) ?? []) {
        yield { custom_id: r.custom_id, result: { type: 'succeeded', message: reply(r.params) } };
      }
    },
    isFatal: (err) => !!err?.fatal,
  };
}

/** mdast parser from the site's own dependencies, when they are installed. */
export async function loadMdast() {
  try {
    const req = createRequire(join(REPO, 'site', 'package.json'));
    const imp = (name) => import(pathToFileURL(req.resolve(name)).href);
    const [{ fromMarkdown }, { gfm }, { gfmFromMarkdown }] = await Promise.all([
      imp('mdast-util-from-markdown'),
      imp('micromark-extension-gfm'),
      imp('mdast-util-gfm'),
    ]);
    return (text) => fromMarkdown(text, { extensions: [gfm()], mdastExtensions: [gfmFromMarkdown()] });
  } catch {
    return null;
  }
}

export const silent = () => {};
