// data.spec.ts: verifies the typed data layer against the source Markdown.
// Runs in the Playwright test runner but uses no browser: pure Node reads and
// assertions. It checks structure (layer/level counts, unique colours), that
// every `anchor` resolves to a real heading in its chapter (slugified exactly
// as rehype-slug would), and that no forbidden claim leaks into any module.

import { test, expect } from '@playwright/test';

import { readSource, slugify, getHeadings } from '../src/lib/md-parse';
import { layers, minimumViableStack, toolsByCategory } from '../src/data/stack';
import { workflows, market } from '../src/data/role';
import { levels } from '../src/data/maturity';
import { frameworks, obligations, disclaimer } from '../src/data/frameworks';
import {
  topics,
  columns,
  refs,
  chipLabel,
  chipPrefix,
  cnChipPrefix,
  clauseId,
  columnOf,
  crosswalkInstruments,
  crosswalkAsOf,
  crosswalkSchemaVersion,
  topicMatrix,
  frameworkById,
} from '../src/data/crosswalk';
import { values } from '../src/data/values';
import { getGlossary, termId } from '../src/lib/glossary';
import { getReadingList } from '../src/lib/reading-list';
import { getChapterBySlug } from '../src/data/chapters';
import {
  stages,
  nodes,
  entries,
  nodesByStage,
  crossStageEdges,
} from '../src/data/path';
import type { PathKind, PathStageId } from '../src/data/path';

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
    'site/src/data/crosswalk.ts',
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

test('the eight values are numbered 1..8 and match the H3s of chapter 03', () => {
  const slugs = headingSlugs('bok/03-values-principles.md');
  expect(values).toHaveLength(8);
  expect(values.map((value) => value.n)).toEqual([1, 2, 3, 4, 5, 6, 7, 8]);
  for (const value of values) {
    expect(value.n, `${value.title} n`).toBeGreaterThanOrEqual(1);
    expect(value.n, `${value.title} n`).toBeLessThanOrEqual(8);
    // Each affirmation is a numbered H3 in the chapter: "### <n>. <title>".
    expect(
      slugs.has(slugify(`${value.n}. ${value.title}`)),
      `value ${value.n} "${value.title}" resolves to an H3`,
    ).toBe(true);
    expect(value.summary.trim().length, `${value.title} summary`).toBeGreaterThan(0);
  }
});

// ── The learning path data (src/data/path.ts) ──────────────────────────────
test.describe('path data', () => {
  const KINDS = new Set<PathKind>(['core', 'alternative', 'optional']);
  const STAGE_IDS = new Set<PathStageId>([
    'foundations',
    'see-and-rule',
    'test-and-contain',
    'prove-and-specialise',
  ]);
  const RESOURCE_TYPES = new Set([
    'article',
    'video',
    'course',
    'official',
    'tool',
    'template',
  ]);
  const RESOURCE_COSTS = new Set(['free', 'paid']);
  // The two capstones may carry 0-1 resources; every other node carries 2-4.
  const CAPSTONES = new Set(['maturity-self-assessment', 'minimum-viable-stack']);
  // A fragment-less internal href must point at one of these known routes.
  const KNOWN_ROUTES = new Set([
    '/thesis',
    '/role',
    '/stack',
    '/resources/frameworks',
    '/resources/tools',
    '/resources/reading-list',
    '/resources/glossary',
  ]);

  const nodeIds = new Set(nodes.map((node) => node.id));
  const stageOrder = new Map(
    nodes.map((node) => [node.id, stages.find((s) => s.id === node.stage)!.n]),
  );
  const glossaryIds = new Set(getGlossary().map((entry) => termId(entry.term)));

  test('has four stages, 1..4, whose ids partition every node', () => {
    expect(stages).toHaveLength(4);
    expect(stages.map((stage) => stage.n)).toEqual([1, 2, 3, 4]);
    for (const stage of stages) {
      expect(STAGE_IDS.has(stage.id)).toBe(true);
    }
    const counted = [...STAGE_IDS].reduce(
      (sum, id) => sum + nodesByStage(id).length,
      0,
    );
    expect(counted).toBe(nodes.length);
  });

  test('node ids are unique', () => {
    expect(nodeIds.size).toBe(nodes.length);
    expect(nodes.length).toBeGreaterThanOrEqual(34);
  });

  test('every node has a valid kind, stage, layer and summary', () => {
    for (const node of nodes) {
      expect(KINDS.has(node.kind), `${node.id} kind`).toBe(true);
      expect(STAGE_IDS.has(node.stage), `${node.id} stage`).toBe(true);
      if (node.layerN !== undefined) {
        expect(node.layerN, `${node.id} layerN`).toBeGreaterThanOrEqual(1);
        expect(node.layerN, `${node.id} layerN`).toBeLessThanOrEqual(5);
      }
      expect(node.links.length, `${node.id} links`).toBeGreaterThanOrEqual(1);
      expect(node.summary.trim().length, `${node.id} summary`).toBeGreaterThan(0);
    }
  });

  test('resource counts, types, costs and https urls hold', () => {
    for (const node of nodes) {
      const count = node.resources.length;
      if (CAPSTONES.has(node.id)) {
        expect(count, `${node.id} capstone resources`).toBeLessThanOrEqual(1);
      } else {
        expect(count, `${node.id} resources`).toBeGreaterThanOrEqual(2);
        expect(count, `${node.id} resources`).toBeLessThanOrEqual(4);
      }
      for (const resource of node.resources) {
        expect(resource.url.startsWith('https://'), `${node.id} ${resource.url}`).toBe(
          true,
        );
        expect(RESOURCE_TYPES.has(resource.type), `${node.id} ${resource.type}`).toBe(
          true,
        );
        expect(RESOURCE_COSTS.has(resource.cost), `${node.id} ${resource.cost}`).toBe(
          true,
        );
        expect(resource.title.trim().length, `${node.id} resource title`).toBeGreaterThan(
          0,
        );
      }
    }
  });

  test('every internal link resolves to a real anchor or known route', () => {
    const slugCache = new Map<string, Set<string>>();
    const slugsForChapter = (slugName: string): Set<string> => {
      const chapter = getChapterBySlug(slugName);
      expect(chapter, `chapter for /bok/${slugName}`).toBeTruthy();
      const file = `bok/${chapter!.id}.md`;
      if (!slugCache.has(file)) slugCache.set(file, headingSlugs(file));
      return slugCache.get(file)!;
    };

    for (const node of nodes) {
      for (const link of node.links) {
        const [target, frag] = link.href.split('#');
        if (target.startsWith('/bok/')) {
          expect(frag, `${link.href} needs a fragment`).toBeTruthy();
          const slugName = target.slice('/bok/'.length);
          expect(slugsForChapter(slugName).has(frag), `${link.href} should resolve`).toBe(
            true,
          );
        } else if (target === '/resources/glossary') {
          expect(frag, `${link.href} needs a term`).toBeTruthy();
          expect(glossaryIds.has(frag), `${link.href} should resolve`).toBe(true);
        } else {
          expect(frag, `${link.href} should carry no fragment`).toBeFalsy();
          expect(KNOWN_ROUTES.has(target), `${link.href} is a known route`).toBe(true);
        }
      }
    }
  });

  test('prereqs reference existing nodes in the same or an earlier stage', () => {
    for (const node of nodes) {
      for (const prereq of node.prereqs ?? []) {
        expect(nodeIds.has(prereq), `${node.id} prereq ${prereq}`).toBe(true);
        expect(
          stageOrder.get(prereq)!,
          `${node.id} prereq ${prereq} stage order`,
        ).toBeLessThanOrEqual(stageOrder.get(node.id)!);
      }
    }
  });

  test('entry start points exist as nodes', () => {
    expect(entries.length).toBeGreaterThan(0);
    for (const entry of entries) {
      expect(entry.startAt.length).toBeGreaterThan(0);
      for (const id of entry.startAt) {
        expect(nodeIds.has(id), `${entry.id} startAt ${id}`).toBe(true);
      }
    }
  });

  test('crossStageEdges only connects nodes in different stages', () => {
    const edges = crossStageEdges();
    expect(edges.length).toBeGreaterThan(0);
    for (const edge of edges) {
      expect(nodeIds.has(edge.from), `edge from ${edge.from}`).toBe(true);
      expect(nodeIds.has(edge.to), `edge to ${edge.to}`).toBe(true);
      expect(stageOrder.get(edge.from)).not.toBe(stageOrder.get(edge.to));
    }
  });

  test('no forbidden tool name appears in the path data', () => {
    const serialized = JSON.stringify({ stages, nodes, entries });
    expect(serialized.includes('LiteLLM')).toBe(false);
  });
});

// ── The topic crosswalk data (src/data/crosswalk.ts) ───────────────────────
test.describe('crosswalk data', () => {
  const cnIds = columns.find((column) => column.id === 'cn')!.frameworks;
  const knownFrameworkIds = new Set([
    ...frameworks.map((framework) => framework.id),
    ...crosswalkInstruments.map((framework) => framework.id),
  ]);

  // The v0.4 topic ids are anchors (#topic-<id>) used by the map, the path and
  // published links: v2 may add topics but never rename or drop these.
  const V04_TOPIC_IDS = [
    'risk-management',
    'governance-accountability',
    'impact-assessment',
    'data-governance',
    'documentation-transparency',
    'inventory-registration',
    'logging-traceability',
    'human-oversight',
    'runtime-guardrails',
    'robustness-security-evals',
    'incident-monitoring',
    'supply-chain',
  ];

  test('refs reference known topics; topic ids are unique; v0.4 topic ids are kept', () => {
    const topicIds = topics.map((topic) => topic.id);
    expect(new Set(topicIds).size).toBe(topicIds.length);
    expect(topicIds.slice(0, V04_TOPIC_IDS.length)).toEqual(V04_TOPIC_IDS);
    expect(topics.length).toBeGreaterThanOrEqual(25);
    const topicIdSet = new Set(topicIds);
    for (const ref of refs) {
      expect(topicIdSet.has(ref.topic), ref.topic).toBe(true);
    }
    expect(refs.length).toBeGreaterThan(400);
  });

  test('every ref.framework exists in frameworks.ts or the crosswalk instruments', () => {
    for (const ref of refs) {
      expect(knownFrameworkIds.has(ref.framework), ref.framework).toBe(true);
      expect(frameworkById(ref.framework), ref.framework).toBeTruthy();
    }
    // The China block lands all cn-* ids together: if one is in frameworks.ts,
    // they all must be.
    const frameworkIds = new Set(frameworks.map((framework) => framework.id));
    const present = cnIds.filter((id) => frameworkIds.has(id));
    if (present.length > 0) {
      expect(present.length).toBe(cnIds.length);
    }
    // frameworks.ts wins over a crosswalk instrument with the same id.
    for (const framework of frameworks) {
      expect(frameworkById(framework.id)).toBe(framework);
    }
  });

  test('columns: v0.4 ids kept as the default view; every framework in exactly one column', () => {
    const ids = columns.map((column) => column.id);
    expect(new Set(ids).size).toBe(ids.length);
    expect(columns.filter((column) => column.defaultVisible).map((column) => column.id)).toEqual([
      'eu',
      'iso',
      'nist',
      'cn',
    ]);
    const all = columns.flatMap((column) => column.frameworks);
    expect(new Set(all).size).toBe(all.length);
    for (const column of columns) {
      expect(['law', 'codes', 'standards']).toContain(column.group);
      for (const id of column.frameworks) expect(columnOf(id)?.id).toBe(column.id);
    }
    for (const instrument of crosswalkInstruments) {
      expect(columnOf(instrument.id), instrument.id).toBeTruthy();
    }
  });

  test('each column framework is referenced; topics span 2+ columns with a core ref', () => {
    const referenced = new Set(refs.map((ref) => ref.framework));
    for (const column of columns) {
      for (const frameworkId of column.frameworks) {
        expect(referenced.has(frameworkId), frameworkId).toBe(true);
      }
    }

    for (const topic of topics) {
      const topicRefs = refs.filter((ref) => ref.topic === topic.id);
      const spannedColumns = columns.filter((column) =>
        topicRefs.some((ref) => column.frameworks.includes(ref.framework)),
      );
      expect(spannedColumns.length, `${topic.id} columns`).toBeGreaterThanOrEqual(2);
      expect(
        topicRefs.some((ref) => ref.strength === 'core'),
        `${topic.id} core`,
      ).toBe(true);
    }
  });

  test('no clause is listed twice under the same topic', () => {
    const seen = new Set<string>();
    for (const ref of refs) {
      const key = `${ref.topic}|${ref.framework}|${ref.ref}`;
      expect(seen.has(key), key).toBe(false);
      seen.add(key);
    }
  });

  test('every obligation join exists verbatim in the obligation matrix', () => {
    const obligationTexts = new Set(obligations.map((o) => o.obligation));
    for (const ref of refs) {
      if (ref.obligation !== undefined) {
        expect(obligationTexts.has(ref.obligation), ref.obligation).toBe(true);
      }
    }
  });

  test('urls are https; unverified refs carry a note; chips prefix multi-instrument columns only', () => {
    const multi = new Set(
      columns.filter((column) => column.frameworks.length > 1).flatMap((c) => c.frameworks),
    );
    for (const ref of refs) {
      if (ref.url !== undefined) {
        expect(ref.url.startsWith('https://'), ref.url).toBe(true);
      }
      if (ref.verified === false) {
        expect((ref.note ?? '').trim().length, `${ref.framework} ${ref.ref}`).toBeGreaterThan(
          0,
        );
      }
      const label = chipLabel(ref);
      expect(label.endsWith(ref.ref), `${ref.framework} ${ref.ref}`).toBe(true);
      if (!multi.has(ref.framework)) expect(label).toBe(ref.ref);
      // The China chips always name their instrument.
      if (cnIds.includes(ref.framework)) expect(label).not.toBe(ref.ref);
    }
    // chipPrefix covers exactly the multi-instrument columns; the cn block
    // keeps its own record of the six China ids.
    expect(new Set(Object.keys(chipPrefix))).toEqual(multi);
    expect(new Set(Object.keys(cnChipPrefix))).toEqual(new Set(cnIds));
  });

  test('EU AI Act links point at the consolidated EUR-Lex text', () => {
    for (const ref of refs) {
      if (ref.framework !== 'eu-ai-act' || ref.url === undefined) continue;
      expect(ref.url, `${ref.ref}`).toMatch(
        /^https:\/\/eur-lex\.europa\.eu\/eli\/reg\/2024\/1689\/2026-07-27\/eng#(art|anx)_/,
      );
    }
  });

  test('clause ids are OSCAL tokens, unique within their framework', () => {
    const token = /^(\p{L}|_)(\p{L}|\p{N}|[.\-_])*$/u;
    const byClause = new Map<string, string>();
    for (const ref of refs) {
      const id = clauseId(ref);
      expect(token.test(id), `${ref.framework} ${ref.ref} -> ${id}`).toBe(true);
      const key = `${ref.framework}|${id}`;
      const prior = byClause.get(key);
      if (prior !== undefined) expect(prior, key).toBe(ref.ref);
      byClause.set(key, ref.ref);
    }
    // CSA AICM ids follow CSA's own OSCAL catalog.
    expect(clauseId({ framework: 'csa-aicm', ref: 'A&A-02' })).toBe('A_A-02');
    expect(clauseId({ framework: 'iso-42001', ref: '6.1.2' })).toBe('_6.1.2');
    expect(clauseId({ framework: 'eu-ai-act', ref: 'Art. 10(2)(f)–(g)' })).toBe('art-10-2-f-g');
  });

  test('every Body-of-Knowledge link (see, read) resolves to a chapter heading', () => {
    const hrefs = [
      ...refs.flatMap((ref) => (ref.see ? [ref.see] : [])),
      ...topics.flatMap((topic) => (topic.read ?? []).map((r) => r.href)),
    ];
    expect(hrefs.length).toBeGreaterThan(10);
    for (const href of hrefs) {
      const [target, frag] = href.split('#');
      expect(target.startsWith('/bok/'), href).toBe(true);
      const chapter = getChapterBySlug(target.slice('/bok/'.length));
      expect(chapter, href).toBeTruthy();
      if (frag) expect(headingSlugs(`bok/${chapter!.id}.md`).has(frag), href).toBe(true);
    }
  });

  test('topicMatrix is topics x columns with cells sorted core-first', () => {
    const matrix = topicMatrix();
    expect(matrix.rows).toHaveLength(topics.length);
    expect(matrix.columns).toHaveLength(columns.length);
    for (const column of matrix.columns) {
      // Every column framework resolves (frameworks.ts or crosswalk instruments).
      expect(column.fws.length, column.id).toBe(column.frameworks.length);
    }
    for (const row of matrix.rows) {
      expect(row.cells, row.topic.id).toHaveLength(columns.length);
      for (const cell of row.cells) {
        const ranks = cell.map((ref) => (ref.strength === 'core' ? 0 : 1));
        const sorted = [...ranks].sort((a, b) => a - b);
        expect(ranks, row.topic.id).toEqual(sorted);
      }
    }
  });

  test('frameworkById resolves the cn ids; TC260 3.0 is never called binding', () => {
    for (const id of cnIds) {
      const framework = frameworkById(id);
      expect(framework, id).toBeTruthy();
      expect(framework!.id).toBe(id);
      expect(framework!.name.trim().length, id).toBeGreaterThan(0);
    }
    expect(frameworkById('cn-tc260-framework')!.summary.includes('binding')).toBe(false);
  });

  test('schema version and verification date are published with the data', () => {
    expect(crosswalkSchemaVersion).toBe(2);
    expect(crosswalkAsOf).toMatch(/^\d{4}-\d{2}-\d{2}$/);
  });
});
