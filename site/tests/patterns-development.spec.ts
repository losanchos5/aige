// patterns-development.spec.ts: acceptance checks for the eight development-side
// patterns of block w2-patterns-a (catalogue order 18 to 25). The generic
// per-pattern checks (frontmatter, H1, sources, pager, cite block) live in
// patterns.spec.ts and already loop over these pages; this file checks what is
// specific to the block: the catalogue order and layers, the CSIRO template with
// forces and an illustrative example, the artefacts that reuse a published JSON
// Schema, one diagram with a complete notes sidecar per pattern, and the links
// from the chapters that describe each practice. Runs in the `default` project.
import { test, expect } from '@playwright/test';
import { readdirSync } from 'node:fs';
import { readSource, sourcePath, splitSections } from '../src/lib/md-parse';
import { patterns } from '../src/data/patterns';
import { diagrams } from '../src/data/diagrams';

// slug -> [home layer, second layer]; the array order is the catalogue order.
const BLOCK: ReadonlyArray<[string, number, number | undefined]> = [
  ['use-case-intake-risk-tiering', 1, 2],
  ['ai-threat-model', 1, 3],
  ['training-data-rights-ledger', 2, undefined],
  ['dataset-admission-gate', 1, 2],
  ['fairness-eval-suite', 3, undefined],
  ['explanation-artefact', 4, 5],
  ['model-artefact-integrity', 2, 4],
  ['claims-substantiation-gate', 5, 3],
];

// Pattern pages whose illustrative artefact is an instance of a published schema.
const SCHEMA_OF: Readonly<Record<string, string>> = {
  'use-case-intake-risk-tiering': 'use-case-record.v1.json',
  'dataset-admission-gate': 'dataset-admission-record.v1.json',
  'fairness-eval-suite': 'eval-result.v1.json',
  'model-artefact-integrity': 'evidence-record.v1.json',
};

interface JsonSchema {
  required?: string[];
  properties?: Record<string, { enum?: unknown[]; type?: string }>;
  additionalProperties?: boolean;
}

function body(slug: string): string {
  return readSource(`bok/patterns/${slug}.md`).replace(/^---\r?\n[\s\S]*?\r?\n---\r?\n/, '');
}

function jsonBlocks(markdown: string): unknown[] {
  return [...markdown.matchAll(/```json\s*\n([\s\S]*?)```/g)].map((m) => JSON.parse(m[1]));
}

test.describe('development-side patterns: data', () => {
  test('the eight patterns follow the existing catalogue in order, with their layers', () => {
    expect(patterns.length).toBeGreaterThanOrEqual(25);
    BLOCK.forEach(([slug, layer, second], i) => {
      const def = patterns.find((p) => p.slug === slug);
      expect(def, slug).toBeTruthy();
      expect(def!.layer, slug).toBe(layer);
      expect(def!.secondaryLayer, slug).toBe(second);
      // Relative order holds even if another block appends patterns later.
      if (i > 0) {
        const prev = patterns.findIndex((p) => p.slug === BLOCK[i - 1][0]);
        expect(patterns.findIndex((p) => p.slug === slug), slug).toBeGreaterThan(prev);
      }
    });
  });

  for (const [slug] of BLOCK) {
    test(`${slug}: CSIRO template with forces, failure mode and an illustrative example`, () => {
      const text = body(slug);
      const sections = new Map(splitSections(text, 2).map((s) => [s.heading, s.body]));
      for (const field of [
        'Objectives',
        'Target users',
        'Impacted stakeholders',
        'Relevant principles',
        'Context',
        'Problem',
        'Solution',
        'Consequences',
        'Related patterns',
        'Sources',
      ]) {
        expect(sections.has(field), `${slug} has "## ${field}"`).toBe(true);
      }
      expect(sections.get('Problem')).toContain('**Forces.**');
      expect(sections.get('Problem')).toContain('**Failure mode.**');
      expect(sections.get('Solution')).toContain('```json');
      expect(sections.get('Solution')).toContain('(illustrative)');
      expect(text).toContain('Mappings are illustrative, not a claim of conformity.');
      expect(text).not.toContain('—');
    });
  }

  for (const [slug, schemaFile] of Object.entries(SCHEMA_OF)) {
    test(`${slug}: the artefact is an instance of ${schemaFile}`, () => {
      const schema = JSON.parse(readSource(`site/public/schemas/${schemaFile}`)) as JsonSchema & {
        $id: string;
      };
      const instances = jsonBlocks(body(slug)).filter(
        (block): block is Record<string, unknown> =>
          typeof block === 'object' && block !== null && '$schema' in block,
      );
      expect(instances.length, `${slug} declares $schema`).toBe(1);
      const instance = instances[0];
      expect(instance.$schema).toBe(schema.$id);
      for (const key of schema.required ?? []) expect(instance, `${slug}: ${key}`).toHaveProperty(key);
      if (schema.additionalProperties === false) {
        for (const key of Object.keys(instance)) {
          expect(Object.keys(schema.properties ?? {}), `${slug}: unknown field ${key}`).toContain(key);
        }
      }
      for (const [key, prop] of Object.entries(schema.properties ?? {})) {
        if (prop.enum && key in instance) expect(prop.enum, `${slug}: ${key}`).toContain(instance[key]);
      }
    });
  }

  test('each pattern has one lead diagram with a notes sidecar for every node', () => {
    const files = readdirSync(sourcePath('site/diagrams'));
    for (const [slug] of BLOCK) {
      const placed = diagrams.filter((d) =>
        d.placements.some((p) => p.pattern === slug && p.at === 'lead'),
      );
      expect(placed, slug).toHaveLength(1);
      const { id, type } = placed[0];
      expect(files).toContain(`${id}.${type}.json`);
      expect(files).toContain(`${id}.notes.json`);
      const ir = JSON.parse(readSource(`site/diagrams/${id}.${type}.json`)) as {
        nodes: { id: string }[];
      };
      const notes = JSON.parse(readSource(`site/diagrams/${id}.notes.json`)) as Record<string, string>;
      expect(Object.keys(notes).sort(), id).toEqual(ir.nodes.map((n) => n.id).sort());
    }
  });

  test('the chapters that describe each practice link to its page', () => {
    const chapters = readdirSync(sourcePath('bok'))
      .filter((name) => /^(1[1-9]|2[0-3])-.*\.md$/.test(name))
      .map((name) => readSource(`bok/${name}`))
      .join('\n');
    for (const [slug] of BLOCK) {
      expect(chapters, `a chapter links /patterns/${slug}`).toContain(`](/patterns/${slug})`);
    }
    expect(readSource('bok/20-existing-law.md')).not.toContain('Training-Data Rights Ledger (proposed)');
  });
});

test.describe('development-side patterns: pages', () => {
  for (const [slug] of BLOCK) {
    test(`/patterns/${slug} opens with its diagram, before "Objectives"`, async ({ page }) => {
      const res = await page.goto(`/patterns/${slug}`);
      expect(res?.status()).toBe(200);
      const id = diagrams.find((d) => d.placements.some((p) => p.pattern === slug))!.id;
      const ok = await page.evaluate((diagramId) => {
        const article = document.querySelector('article.prose');
        const fig = article?.querySelector(`figure.diagram[data-diagram="${diagramId}"]`);
        const firstH2 = article?.querySelector('h2');
        if (!fig || !firstH2) return false;
        return (
          (firstH2.textContent ?? '').trim() === 'Objectives' &&
          Boolean(fig.compareDocumentPosition(firstH2) & Node.DOCUMENT_POSITION_FOLLOWING)
        );
      }, id);
      expect(ok).toBe(true);
    });
  }

  test('chapter 20 links the claims gate and the rights ledger', async ({ page }) => {
    await page.goto('/bok/existing-law');
    await expect(
      page.locator('article a[href="/patterns/claims-substantiation-gate"]').first(),
    ).toBeVisible();
    await expect(
      page.locator('article a[href="/patterns/training-data-rights-ledger"]').first(),
    ).toBeAttached();
  });
});
