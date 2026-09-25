// cross-links.ts: the reverse relations the reference templates render (audit
// CONTENT C8, 2026-09-25). Every link is a join over data that already exists;
// nothing here adds a fact:
// - `obligationsEvidencedBy`: register rows (src/data/frameworks.ts) whose
//   `patterns` list names the pattern, the inverse of "Patterns that build it"
//   on an obligation page.
// - `casesCallingFor`: incident cases (src/data/cases.ts) that name the pattern
//   as a control that would have caught the incident.
// - `patternsUsingTerm`: pattern pages (bok/patterns/<slug>.md) whose prose uses
//   a glossary term, found with the same whole-word matchers that list the
//   chapters that use it (lib/glossary.ts termMatchers).
import { obligations, type Obligation } from '../data/frameworks';
import { cases, type IncidentCase } from '../data/cases';
import { patterns, type PatternDef } from '../data/patterns';
import { termMatchers } from './glossary';
import { readSource } from './md-parse';

/** Register rows whose "Patterns that build it" list names the pattern, in register order. */
export function obligationsEvidencedBy(patternId: string): Obligation[] {
  return obligations.filter((row) => row.patterns?.includes(patternId));
}

/** Incident cases that name the pattern as the control that would have caught them. */
export function casesCallingFor(patternId: string): IncidentCase[] {
  return cases.filter((c) => c.control.controls.some((ctl) => ctl.patternId === patternId));
}

/** The pattern a catalogue id names, for a `/patterns/<slug>` link. */
export function patternById(patternId: string): PatternDef | undefined {
  return patterns.find((pattern) => pattern.id === patternId);
}

export interface TermInPattern {
  pattern: PatternDef;
  /** Whole-word mentions in the pattern's prose. */
  count: number;
}

/** A pattern file's prose: no front matter, code, link targets or Sources list. */
function patternProse(slug: string): string {
  let markdown: string;
  try {
    markdown = readSource(`bok/patterns/${slug}.md`);
  } catch {
    return '';
  }
  return markdown
    .replace(/^---[\s\S]*?\n---\s*\n/, '')
    .split(/^## Sources\s*$/m)[0]
    .replace(/```[\s\S]*?```/g, ' ')
    .replace(/!?\[([^\]]*)\]\([^)]*\)/g, '$1');
}

let usage: Map<string, TermInPattern[]> | undefined;

/** Pattern pages that use the glossary term `slug`, most mentions first. */
export function patternsUsingTerm(slug: string): TermInPattern[] {
  if (!usage) {
    const prose = patterns.map((pattern) => ({ pattern, text: patternProse(pattern.slug) }));
    usage = new Map();
    for (const matcher of termMatchers()) {
      const globals = matcher.patterns.map((p) => new RegExp(p.source, `${p.flags}g`));
      const found: TermInPattern[] = [];
      for (const { pattern, text } of prose) {
        let count = 0;
        for (const re of globals) count += text.match(re)?.length ?? 0;
        if (count > 0) found.push({ pattern, count });
      }
      usage.set(
        matcher.slug,
        found.sort((a, b) => b.count - a.count || patterns.indexOf(a.pattern) - patterns.indexOf(b.pattern)),
      );
    }
  }
  return usage.get(slug) ?? [];
}
