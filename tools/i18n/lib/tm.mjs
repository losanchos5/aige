// Translation memory: i18n/.tm/<lang>.jsonl, one JSON object per line:
// { h: sha256 of the English segment, t: translation, model, at }.
// Only validated translations are stored, so a re-run after an English edit
// pays only for the segments that changed. Later lines win.

import { appendFileSync, existsSync, mkdirSync, readFileSync } from 'node:fs';
import { dirname, join } from 'node:path';

export class TranslationMemory {
  constructor(file) {
    this.file = file;
    this.entries = new Map();
    this.added = 0;
    if (existsSync(file)) {
      const lines = readFileSync(file, 'utf8').split('\n');
      lines.forEach((line, i) => {
        if (!line.trim()) return;
        let e;
        try {
          e = JSON.parse(line);
        } catch {
          throw new Error(`${file}:${i + 1}: not valid JSON`);
        }
        if (typeof e.h !== 'string' || typeof e.t !== 'string') throw new Error(`${file}:${i + 1}: expected { h, t, model, at }`);
        this.entries.set(e.h, e);
      });
    }
  }

  static forLang(tmDir, lang) {
    return new TranslationMemory(join(tmDir, `${lang}.jsonl`));
  }

  get(h) {
    return this.entries.get(h);
  }

  has(h) {
    return this.entries.has(h);
  }

  /** Record validated translations and append them to the file at once (safe to interrupt). */
  addMany(items, { model, at, dryRun = false }) {
    const fresh = [];
    for (const { h, t } of items) {
      const prev = this.entries.get(h);
      if (prev && prev.t === t) continue;
      const e = { h, t, model, at };
      this.entries.set(h, e);
      fresh.push(e);
    }
    if (fresh.length && !dryRun) {
      mkdirSync(dirname(this.file), { recursive: true });
      appendFileSync(this.file, fresh.map((e) => JSON.stringify(e)).join('\n') + '\n', 'utf8');
    }
    this.added += fresh.length;
    return fresh.length;
  }
}
