// catalogue.ts: lookup over the bundled index of the templates-and-schemas
// library (catalogue.generated.ts). The index names each template and where
// its files live on the site; the files themselves are fetched live.

import { catalogue } from './catalogue.generated.js';
import { slugKey } from './text.js';

export type TemplateFileRole = 'schema' | 'example' | 'template';

export interface TemplateFile {
  role: TemplateFileRole;
  format: string;
  /** Site-relative path (`/schemas/policy-card.v1.json`). */
  path: string;
}

export interface TemplateEntry {
  name: string;
  /** `schema`: a JSON Schema with its example and human template; `kit`: a policy-kit file set. */
  kind: 'schema' | 'kit';
  title: string;
  description: string;
  stage: string | null;
  stageLabel: string | null;
  layers: number[];
  /** Chapter 05 anchor ids (`pattern-policy-card`). */
  patterns: string[];
  evidences: string[];
  files: TemplateFile[];
}

export function templates(): readonly TemplateEntry[] {
  return catalogue;
}

/**
 * Find a template by name, file name, URL or title: `policy-card`,
 * `policy-card.v1.json`, `/templates/raci.csv`, `Policy card`.
 */
export function findTemplate(query: string): TemplateEntry | undefined {
  const raw = query.trim().toLowerCase();
  const last = raw.split(/[/#?]/).filter((part) => part !== '').pop() ?? raw;
  const stem = last.replace(/\.(example\.json|v\d+\.json|json|md|yaml|yml|rego|csv)$/, '');
  const key = slugKey(stem);
  return (
    catalogue.find((entry) => slugKey(entry.title) === slugKey(raw)) ??
    catalogue.find((entry) => entry.name === stem) ??
    catalogue.find((entry) => entry.name === key) ??
    catalogue.find((entry) => slugKey(entry.title) === key)
  );
}
