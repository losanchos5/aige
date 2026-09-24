// resolve.ts: turn what a person types for a framework ("EU AI Act",
// "eu-ai-act", "ISO 42001", "nist", "GDPR") into framework ids. The names come
// from frameworks.json (id, short, name) and from the crosswalk columns and
// references, which also cover frameworks the obligation register does not
// list (GDPR, OECD, Council of Europe and others).

import type { CrosswalkDoc, FrameworksDoc } from '../types.js';
import { normalise } from '../text.js';

export interface FrameworkName {
  id: string;
  label: string;
  /** Normalised id, short name, name and single-framework column label. */
  names: string[];
  /** Weaker names: the prefixes of crosswalk labels ("GenAI" in "GenAI Art. 17"). */
  aliases: string[];
}

/** Every framework id with the names it answers to. */
export function frameworkNames(frameworks: FrameworksDoc | null, crosswalk: CrosswalkDoc | null): FrameworkName[] {
  const byId = new Map<string, FrameworkName>();
  const add = (id: string, label: string, ...names: string[]): void => {
    const entry = byId.get(id) ?? { id, label, names: [], aliases: [] };
    for (const name of [id, label, ...names]) {
      const n = normalise(name);
      if (n !== '' && !entry.names.includes(n)) entry.names.push(n);
    }
    byId.set(id, entry);
  };
  const alias = (id: string, name: string): void => {
    const entry = byId.get(id);
    const n = normalise(name);
    if (entry && n !== '' && !entry.names.includes(n) && !entry.aliases.includes(n)) entry.aliases.push(n);
  };
  for (const fw of frameworks?.frameworks ?? []) add(fw.id, fw.short, fw.name);
  for (const column of crosswalk?.columns ?? []) {
    // A column with one framework names it ("GDPR"); a shared column only adds its id as an alias.
    if (column.frameworks.length === 1 && column.frameworks[0]) add(column.frameworks[0], column.label, column.label);
  }
  for (const ref of crosswalk?.references ?? []) {
    if (!byId.has(ref.framework)) add(ref.framework, ref.framework);
    // "GenAI Art. 17" → the label prefix "GenAI" names the framework too.
    const prefix = ref.label !== ref.reference && ref.label.endsWith(ref.reference)
      ? ref.label.slice(0, -ref.reference.length).trim()
      : '';
    if (prefix !== '') alias(ref.framework, prefix);
  }
  return [...byId.values()];
}

/**
 * Resolve a framework query to ids: an exact id or name wins; then every
 * framework with a name word that starts with the query ("nist" → the NIST
 * frameworks, "iso" → the ISO/IEC standards); then a crosswalk column id
 * ("intl", "cen"); last, a crosswalk label prefix ("UK GDPR").
 */
export function resolveFrameworks(query: string, names: FrameworkName[], crosswalk?: CrosswalkDoc | null): string[] {
  const q = normalise(query);
  if (q === '') return [];
  const compact = q.replace(/ /g, '');
  const exact = names.filter((n) => n.names.includes(q) || n.names.some((name) => name.replace(/ /g, '') === compact));
  if (exact.length > 0) return exact.map((n) => n.id);
  const partial = names.filter((n) =>
    n.names.some((name) => name.startsWith(q) || name.includes(` ${q}`) || name.replace(/ /g, '').startsWith(compact)),
  );
  if (partial.length > 0) return partial.map((n) => n.id);
  const column = crosswalk?.columns.find((c) => normalise(c.id) === q);
  if (column) return [...column.frameworks];
  return names.filter((n) => n.aliases.some((a) => a === q || a.replace(/ /g, '') === compact)).map((n) => n.id);
}
