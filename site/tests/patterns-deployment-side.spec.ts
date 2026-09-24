// patterns-deployment-side.spec.ts: data checks for the eight deployment-side
// patterns (block w2-patterns-b, v0.5.0). Pure Node, no browser: the files, the
// index, the catalogue, the diagram placements and notes, the illustrative JSON
// artefacts that claim a published schema, and the chapter sentences that link
// each pattern. The generic page checks for every pattern live in
// patterns.spec.ts. Runs in the `default` project.
import { test, expect } from '@playwright/test';
import { existsSync, readFileSync, readdirSync } from 'node:fs';
import { resolve } from 'node:path';
import { readSource, getHeadings } from '../src/lib/md-parse';
import { patterns } from '../src/data/patterns';
import { diagrams } from '../src/data/diagrams';

const SLUGS = [
  'decision-notice-contest-path',
  'rights-requests-against-models',
  'sanctioned-ai-gateway',
  'staged-rollout-rollback-criteria',
  'drift-fairness-monitor',
  'downstream-use-register',
  'disclosure-notification-pipeline',
  'deactivation-localisation-retirement-runbook',
] as const;

// The top-level array that holds a diagram's nodes, by archify diagram type.
const NODE_KEY: Record<string, string> = {
  architecture: 'components',
  workflow: 'nodes',
  sequence: 'participants',
  dataflow: 'nodes',
  lifecycle: 'states',
};

// Pattern -> the published schema its illustrative artefact is an instance of.
const SCHEMA_BACKED: Record<string, string> = {
  'sanctioned-ai-gateway': 'evidence-record',
  'drift-fairness-monitor': 'post-market-monitoring-plan',
  'deactivation-localisation-retirement-runbook': 'decommissioning-runbook',
};

// Chapter sentences that describe a practice and now link its pattern page.
const CHAPTER_LINKS: ReadonlyArray<{ file: string; slug: string }> = [
  { file: 'bok/11-ai-defined.md', slug: 'drift-fairness-monitor' },
  { file: 'bok/12-governance-program.md', slug: 'sanctioned-ai-gateway' },
  { file: 'bok/12-governance-program.md', slug: 'rights-requests-against-models' },
  { file: 'bok/12-governance-program.md', slug: 'deactivation-localisation-retirement-runbook' },
  { file: 'bok/13-risk-management.md', slug: 'decision-notice-contest-path' },
  { file: 'bok/14-governing-development.md', slug: 'staged-rollout-rollback-criteria' },
  { file: 'bok/15-governing-deployment.md', slug: 'staged-rollout-rollback-criteria' },
  { file: 'bok/15-governing-deployment.md', slug: 'drift-fairness-monitor' },
  { file: 'bok/15-governing-deployment.md', slug: 'rights-requests-against-models' },
  { file: 'bok/15-governing-deployment.md', slug: 'downstream-use-register' },
  { file: 'bok/15-governing-deployment.md', slug: 'disclosure-notification-pipeline' },
  { file: 'bok/15-governing-deployment.md', slug: 'deactivation-localisation-retirement-runbook' },
  { file: 'bok/16-fairness-explainability.md', slug: 'decision-notice-contest-path' },
  { file: 'bok/16-fairness-explainability.md', slug: 'drift-fairness-monitor' },
  { file: 'bok/17-incidents.md', slug: 'disclosure-notification-pipeline' },
  { file: 'bok/18-eu-ai-act.md', slug: 'decision-notice-contest-path' },
  { file: 'bok/19-privacy-and-ai.md', slug: 'decision-notice-contest-path' },
  { file: 'bok/19-privacy-and-ai.md', slug: 'rights-requests-against-models' },
  { file: 'bok/22-principles-and-standards.md', slug: 'decision-notice-contest-path' },
  { file: 'bok/23-governing-agents.md', slug: 'deactivation-localisation-retirement-runbook' },
];

type Json = null | boolean | number | string | Json[] | { [key: string]: Json };
type Schema = { [key: string]: Json };

/**
 * A small validator for the JSON Schema keywords the published library uses
 * (type, const, enum, required, properties, additionalProperties: false, items,
 * minItems, minLength, pattern, minimum, maximum). The full check, including
 * formats and $ref, is scripts/schemas-check.mjs; this one keeps the three
 * pattern artefacts honest without a dependency.
 */
function validate(schema: Schema, value: Json, path: string, out: string[]): void {
  const type = schema.type as string | undefined;
  const isObject = value !== null && typeof value === 'object' && !Array.isArray(value);
  if (type === 'object' && !isObject) out.push(`${path}: expected an object`);
  if (type === 'array' && !Array.isArray(value)) out.push(`${path}: expected an array`);
  if (type === 'string' && typeof value !== 'string') out.push(`${path}: expected a string`);
  if ((type === 'number' || type === 'integer') && typeof value !== 'number') {
    out.push(`${path}: expected a number`);
  }
  if (type === 'boolean' && typeof value !== 'boolean') out.push(`${path}: expected a boolean`);
  if (schema.const !== undefined && value !== schema.const) out.push(`${path}: must equal the const`);
  if (Array.isArray(schema.enum) && !schema.enum.includes(value)) {
    out.push(`${path}: ${JSON.stringify(value)} is not in the enum`);
  }
  if (typeof value === 'string') {
    if (typeof schema.minLength === 'number' && value.length < schema.minLength) out.push(`${path}: too short`);
    if (typeof schema.pattern === 'string' && !new RegExp(schema.pattern, 'u').test(value)) {
      out.push(`${path}: does not match ${schema.pattern}`);
    }
  }
  if (typeof value === 'number') {
    if (typeof schema.minimum === 'number' && value < schema.minimum) out.push(`${path}: below minimum`);
    if (typeof schema.maximum === 'number' && value > schema.maximum) out.push(`${path}: above maximum`);
  }
  if (Array.isArray(value)) {
    if (typeof schema.minItems === 'number' && value.length < schema.minItems) out.push(`${path}: too few items`);
    const items = schema.items as Schema | undefined;
    if (items) value.forEach((item, i) => validate(items, item, `${path}[${i}]`, out));
  }
  if (isObject) {
    const record = value as { [key: string]: Json };
    const properties = (schema.properties ?? {}) as { [key: string]: Schema };
    for (const key of (schema.required ?? []) as string[]) {
      if (!(key in record)) out.push(`${path}: missing required "${key}"`);
    }
    for (const [key, child] of Object.entries(record)) {
      if (properties[key]) validate(properties[key], child, `${path}.${key}`, out);
      else if (schema.additionalProperties === false) out.push(`${path}: unknown property "${key}"`);
    }
  }
}

/** The body of a pattern file, without its frontmatter. */
function patternBody(slug: string): string {
  const text = readSource(`bok/patterns/${slug}.md`);
  return text.replace(/^---\r?\n[\s\S]*?\r?\n---\r?\n/, '');
}

test.describe('deployment-side patterns', () => {
  for (const slug of SLUGS) {
    test(`${slug}: file, index, catalogue and template`, () => {
      const def = patterns.find((pattern) => pattern.slug === slug);
      expect(def, `${slug} in patterns.ts`).toBeTruthy();
      const body = patternBody(slug);
      const headings = getHeadings(body);
      expect(headings[0]).toEqual({ depth: 1, text: `Pattern: ${def!.title}` });
      const h3 = headings.filter((h) => h.depth === 3).map((h) => h.text);
      expect(h3, `${slug} has "### Forces"`).toContain('Forces');
      expect(body).toContain('> **Example (illustrative)**');
      expect(body).toMatch(/```json\n/);
      expect(body.includes('—'), `${slug} has no em dash`).toBe(false);

      const catalogue = readSource('bok/05-patterns.md');
      const section = catalogue.split(/^## /m).find((s) => s.startsWith(`Pattern: ${def!.title}\n`));
      expect(section, `catalogue section for ${def!.title}`).toBeTruthy();
      expect(section).toContain(`](/patterns/${slug})`);
    });

    test(`${slug}: one diagram on its page, with a note per node`, () => {
      const placed = diagrams.filter((d) => d.placements.some((p) => p.pattern === slug));
      expect(placed, `${slug} has one diagram`).toHaveLength(1);
      const diagram = placed[0];
      const ir = resolve(process.cwd(), 'diagrams', `${diagram.id}.${diagram.type}.json`);
      expect(existsSync(ir), `${ir} exists`).toBe(true);
      const spec = JSON.parse(readFileSync(ir, 'utf8')) as { [key: string]: Json };
      expect((spec.meta as { [key: string]: Json }).quality_profile).toBe('showcase');
      const ids = (spec[NODE_KEY[diagram.type]] as Array<{ id: string }>).map((node) => node.id);
      const notes = JSON.parse(
        readFileSync(resolve(process.cwd(), 'diagrams', `${diagram.id}.notes.json`), 'utf8'),
      ) as Record<string, string>;
      expect(Object.keys(notes).sort()).toEqual([...ids].sort());
      expect(diagram.caption.endsWith('Generated from the Body of Knowledge.')).toBe(true);
    });
  }

  for (const [slug, stem] of Object.entries(SCHEMA_BACKED)) {
    test(`${slug}: its JSON artefact validates against ${stem}`, () => {
      const schemaFile = readdirSync(resolve(process.cwd(), 'public', 'schemas')).find((name) =>
        name.startsWith(`${stem}.v`),
      );
      expect(schemaFile, `schema for ${stem}`).toBeTruthy();
      const schema = JSON.parse(
        readFileSync(resolve(process.cwd(), 'public', 'schemas', schemaFile!), 'utf8'),
      ) as Schema;
      const block = /```json\n([\s\S]*?)```/.exec(patternBody(slug));
      expect(block, `${slug} has a JSON block`).toBeTruthy();
      const instance = JSON.parse(block![1]) as { [key: string]: Json };
      expect(instance.$schema).toBe(schema.$id);
      const problems: string[] = [];
      validate(schema, instance, stem, problems);
      expect(problems, `${slug} vs ${stem}`).toEqual([]);
    });
  }

  test('the chapters that describe each practice link its pattern page', () => {
    for (const { file, slug } of CHAPTER_LINKS) {
      expect(readSource(file), `${file} links /patterns/${slug}`).toContain(`](/patterns/${slug})`);
    }
  });
});
