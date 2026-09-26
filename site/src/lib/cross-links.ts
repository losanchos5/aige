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
// - `controlsForPattern`, `controlsForThreat`, `controlsForObligation`: the open
//   control profiles (src/data/controls) that name a pattern, a threat row or an
//   obligation, for the "Related controls" furniture of those pages.
// - `casesForControl`: incident cases whose note lists the control among its
//   related controls. The join lives here, not in src/data/controls, so the
//   registry never imports cases.ts (cases.ts validates its control ids against
//   the registry, and the reverse import would be a cycle).
import { obligations, type Obligation } from '../data/frameworks';
import { cases, type IncidentCase } from '../data/cases';
import { patterns, type PatternDef } from '../data/patterns';
import { controls, type Control } from '../data/controls';
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

/** Open controls that list the pattern (by slug, as /patterns/<slug>), in registry order. */
export function controlsForPattern(slug: string): Control[] {
  return controls.filter((c) => c.patterns.includes(slug));
}

/** Open controls mapped to a threat row (lower-case ids of data/threats.ts: OWASP or MITRE ATLAS). */
export function controlsForThreat(threatId: string): Control[] {
  const wanted = threatId.toLowerCase();
  return controls.filter(
    (c) => c.mappings.owasp.includes(wanted) || (c.mappings.atlas ?? []).includes(wanted),
  );
}

/** Open controls whose evidence the register row `obligationId` (AIGE-OBL-...) names, in registry order. */
export function controlsForObligation(obligationId: string): Control[] {
  const wanted = obligationId.toUpperCase();
  return controls.filter((c) => c.mappings.obligations.includes(wanted));
}

/** Incident cases whose note lists the control (AIGE-CTL-...) among its related controls. */
export function casesForControl(controlId: string): IncidentCase[] {
  const wanted = controlId.toUpperCase();
  return cases.filter((c) => (c.relatedControls ?? []).some((id) => id.toUpperCase() === wanted));
}
