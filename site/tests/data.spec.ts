// data.spec.ts: verifies the typed data layer against the source Markdown.
// Runs in the Playwright test runner but uses no browser — pure Node reads and
// assertions. It checks structure (layer/level counts, unique colours), that
// every `anchor` resolves to a real heading in its chapter (slugified exactly
// as rehype-slug would), and that no forbidden claim leaks into any module.

import { test, expect } from '@playwright/test';

import { readSource, slugify, getHeadings } from '../src/lib/md-parse';
import { layers, minimumViableStack, toolsByCategory } from '../src/data/stack';
import { workflows, market } from '../src/data/role';
import { levels } from '../src/data/maturity';
import { frameworks, obligations, disclaimer } from '../src/data/frameworks';
import { getGlossary } from '../src/lib/glossary';
import { getReadingList } from '../src/lib/reading-list';

/** Slugs of every heading in a chapter, as rehype-slug would emit them. */
function headingSlugs(relativeToRoot: string): Set<string> {
  return new Set(
    getHeadings(readSource(relativeToRoot)).map((heading) => slugify(heading.text)),
  );
}

test('stack has five layers, 1..5, with unique colour variables', () => {
  expect(layers).toHaveLength(5);
  expect(layers.map((layer) => layer.n)).toEqual([1, 2, 3, 4, 5]);

  const colorVars = layers.map((layer) => layer.colorVar);
  expect(new Set(colorVars).size).toBe(5);
  for (const colorVar of colorVars) {
    expect(colorVar).toMatch(/^--l[1-5]$/);
  }

  // Ids are the expected set; inherited flags encode 3 inherited (01/02/05).
  expect(layers.filter((layer) => layer.inherited).map((layer) => layer.n)).toEqual([
    1, 2, 5,
  ]);
});

test('every stack anchor exists as a heading in chapter 04', () => {
  const slugs = headingSlugs('bok/04-the-stack.md');
  for (const layer of layers) {
    expect(slugs.has(layer.chapterAnchor)).toBe(true);
  }
  expect(slugs.has(minimumViableStack.anchor)).toBe(true);
});

test('toolsByCategory flattens and deduplicates with layer references', () => {
  const flattened = toolsByCategory();
  expect(flattened.length).toBeGreaterThan(0);
  for (const group of flattened) {
    expect(group.examples.length).toBe(new Set(group.examples).size);
    expect(group.layers.length).toBeGreaterThan(0);
  }
});

test('every role workflow anchor exists as a heading in chapter 06', () => {
  const slugs = headingSlugs('bok/06-the-role.md');
  expect(workflows).toHaveLength(7);
  for (const workflow of workflows) {
    expect(slugs.has(workflow.anchor)).toBe(true);
  }
});

test('every market stat has a non-empty source', () => {
  expect(market.length).toBeGreaterThan(0);
  for (const stat of market) {
    expect(stat.source.trim().length).toBeGreaterThan(0);
  }
});

test('maturity has five levels, 1..5, whose anchors exist in chapter 07', () => {
  const slugs = headingSlugs('bok/07-maturity-model.md');
  expect(levels).toHaveLength(5);
  expect(levels.map((level) => level.n)).toEqual([1, 2, 3, 4, 5]);
  for (const level of levels) {
    expect(slugs.has(level.anchor)).toBe(true);
    expect(level.signals.length).toBeGreaterThan(0);
  }
});

test('every obligation anchor exists as a heading in chapter 08', () => {
  const slugs = headingSlugs('bok/08-regulatory-map.md');
  expect(obligations.length).toBeGreaterThan(0);
  for (const obligation of obligations) {
    expect(slugs.has(obligation.anchor)).toBe(true);
    expect(obligation.layerN.length).toBeGreaterThan(0);
  }
  expect(disclaimer.trim().length).toBeGreaterThan(0);
});

test('framework urls, where present, are https', () => {
  expect(frameworks.length).toBeGreaterThan(0);
  for (const framework of frameworks) {
    if (framework.url !== undefined) {
      expect(framework.url.startsWith('https://')).toBe(true);
    }
  }
});

test('glossary has 50+ terms, each with a definition', () => {
  const glossary = getGlossary();
  expect(glossary.length).toBeGreaterThanOrEqual(50);
  for (const entry of glossary) {
    expect(entry.term.trim().length).toBeGreaterThan(0);
    expect(entry.definition.trim().length).toBeGreaterThan(0);
    expect(entry.letter).toMatch(/^[A-Z]$/);
  }
  // Spot-check a known term parsed correctly.
  expect(glossary.some((entry) => entry.term === 'OSCAL')).toBe(true);
});

test('reading list has 3+ groups and every url is https', () => {
  const groups = getReadingList();
  expect(groups.length).toBeGreaterThanOrEqual(3);
  for (const group of groups) {
    expect(group.items.length).toBeGreaterThan(0);
    for (const item of group.items) {
      expect(item.url).toBeDefined();
      expect(item.url?.startsWith('https://')).toBe(true);
    }
  }
});

test('no forbidden claim appears in any data module', () => {
  const modules = [
    'site/src/data/stack.ts',
    'site/src/data/role.ts',
    'site/src/data/maturity.ts',
    'site/src/data/frameworks.ts',
    'site/src/data/values.ts',
    'site/src/lib/md-parse.ts',
    'site/src/lib/glossary.ts',
    'site/src/lib/reading-list.ts',
  ]
    .map((path) => readSource(path))
    .join('\n');

  const forbidden = [
    '€47M',
    '+340%',
    '4,000 AIGP',
    '14,000 open roles',
    'IAPP 2026',
    'Spanish AI law',
    'State Street',
    'Dalio',
    'Bright Vision',
  ];
  for (const needle of forbidden) {
    expect(modules.includes(needle)).toBe(false);
  }
});
