// data.spec.ts: verifies the typed data layer against the source Markdown.
// Runs in the Playwright test runner but uses no browser: pure Node reads and
// assertions. It checks structure (layer/level counts, unique colours), that
// every `anchor` resolves to a real heading in its chapter (slugified exactly
// as rehype-slug would), and that no forbidden claim leaks into any module.

import { test, expect } from '@playwright/test';

import { readSource, slugify, getHeadings } from '../src/lib/md-parse';
import {
  layers,
  minimumViableStack,
  toolsByCategory,
  toolCatalogue,
  allTools,
  toolAccessLabels,
  TOOLS_LAST_CHECKED,
} from '../src/data/stack';
import { workflows, market } from '../src/data/role';
import { levels } from '../src/data/maturity';
import {
  frameworks,
  obligations,
  disclaimer,
  retiredObligationIds,
  OBLIGATION_ID_PATTERN,
} from '../src/data/frameworks';
import { patterns } from '../src/data/patterns';
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
import { getReadingList, AUDIENCES } from '../src/lib/reading-list';
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

// ── The tool catalogue (src/data/stack.ts, v0.5.0) ───────────────────────
test('every catalogued tool carries checked metadata', () => {
  const access = new Set(Object.keys(toolAccessLabels));
  const tools = allTools();
  expect(tools.length).toBeGreaterThanOrEqual(80);
  for (const { tool, category, layers: toolLayerList } of tools) {
    const label = `${category.category} / ${tool.name}`;
    expect(tool.url.startsWith('https://'), `${label} url`).toBe(true);
    expect(tool.licence.trim().length, `${label} licence`).toBeGreaterThan(0);
    expect(access.has(tool.access), `${label} access`).toBe(true);
    expect(tool.lastChecked, `${label} lastChecked`).toMatch(/^\d{4}-\d{2}-\d{2}$/);
    expect(tool.lastChecked <= TOOLS_LAST_CHECKED, `${label} lastChecked`).toBe(true);
    expect(toolLayerList.length, `${label} layers`).toBeGreaterThan(0);
    for (const n of toolLayerList) expect([1, 2, 3, 4, 5]).toContain(n);
    if (tool.oecd !== undefined) {
      expect(tool.oecd.startsWith('https://oecd.ai/en/catalogue/tools/'), `${label} oecd`).toBe(
        true,
      );
    }
  }
  // Category ids are unique (they are the page's #cat-<id> anchors), and no
  // name repeats inside a category.
  const ids = toolCatalogue.map((def) => def.id);
  expect(new Set(ids).size).toBe(ids.length);
  for (const def of toolCatalogue) {
    const names = def.tools.map((tool) => tool.name);
    expect(new Set(names).size, def.category).toBe(names.length);
    expect(def.summary.trim().length, def.category).toBeGreaterThan(0);
  }
});

test('the categories the v0.5.0 chapters cite are catalogued', () => {
  const ids = new Set(toolCatalogue.map((def) => def.id));
  for (const id of [
    'data-validation',
    'versioning',
    'fairness',
    'explainability',
    'monitoring',
    'progressive-delivery',
    'signing',
  ]) {
    expect(ids.has(id), id).toBe(true);
  }
});

test('every catalogue chapter link resolves to a chapter heading', () => {
  for (const def of toolCatalogue) {
    const match = /^\/bok\/([a-z0-9-]+)(?:#(.+))?$/.exec(def.chapter.href);
    expect(match, `${def.category}: ${def.chapter.href}`).not.toBeNull();
    const chapter = getChapterBySlug(match![1]);
    expect(chapter, `${def.chapter.href} is a chapter`).toBeDefined();
    if (match![2]) {
      const slugs = headingSlugs(`bok/${chapter!.id}.md`);
      expect(slugs.has(match![2]), `${def.chapter.href} anchor`).toBe(true);
    }
  }
});

test('the per-layer tool categories are derived from the catalogue', () => {
  for (const layer of layers) {
    const expected = toolCatalogue
      .filter((def) => def.layers.includes(layer.n))
      .map((def) => def.category);
    expect(layer.toolCategories.map((tc) => tc.category)).toEqual(expected);
  }
});

test('every tool the learning path links is in the catalogue', () => {
  // A path resource titled "garak (LLM vulnerability scanner)" matches the
  // catalogue's "Garak": every word of 3+ letters in the tool name appears in
  // the resource title.
  const names = allTools().map(({ tool }) => tool.name);
  const words = (text: string) =>
    text
      .toLowerCase()
      .split(/[^a-z0-9]+/)
      .filter((word) => word.length >= 3 && word !== 'the');
  const pathTools = nodes.flatMap((node) => node.resources).filter((r) => r.type === 'tool');
  expect(pathTools.length).toBeGreaterThan(0);
  for (const resource of pathTools) {
    const title = words(resource.title);
    const found = names.some((name) => {
      const needed = words(name);
      return needed.length > 0 && needed.every((word) => title.includes(word));
    });
    expect(found, `/path tool "${resource.title}" is catalogued`).toBe(true);
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

test('reading list: unique urls, audience and jurisdiction tags on every entry', () => {
  const groups = getReadingList();
  const items = groups.flatMap((group) => group.items);
  expect(items.length).toBeGreaterThanOrEqual(150);

  const urls = items.map((item) => item.url);
  expect(new Set(urls).size, 'no url listed twice').toBe(urls.length);

  const audiences = new Set<string>(AUDIENCES);
  for (const item of items) {
    expect(item.audience.length, `${item.title} audience`).toBeGreaterThan(0);
    for (const audience of item.audience) expect(audiences.has(audience)).toBe(true);
    expect(item.jurisdiction.length, `${item.title} jurisdiction`).toBeGreaterThan(0);
    expect(item.note.includes('audience:'), `${item.title} note`).toBe(false);
    expect(item.note.includes('jurisdiction:'), `${item.title} note`).toBe(false);
  }
});

test('reading list keeps its v0.4 sections and carries the canonical papers', () => {
  const groups = getReadingList();
  const headings = groups.map((group) => group.group);
  // Existing H2s are anchors: they must not be renamed.
  for (const heading of [
    'Foundational texts (the form and the method)',
    'Regulation and standards',
    "Frontier safety frameworks (the labs' own commitments)",
    'Papers (machine-readable evidence and agent governance)',
    'Reports (the market and the profession)',
    'Incident and risk repositories (the empirical record)',
    'Tools (illustrative categories, not endorsements)',
    'Communities and newsletters',
  ]) {
    expect(headings, heading).toContain(heading);
  }
  for (const heading of ['Books', 'Courses']) expect(headings).toContain(heading);

  const urls = new Set(groups.flatMap((group) => group.items.map((item) => item.url)));
  for (const url of [
    'https://arxiv.org/abs/1803.09010', // Datasheets for Datasets
    'https://arxiv.org/abs/1810.03993', // Model Cards for Model Reporting
    'https://arxiv.org/abs/2001.00973', // Raji et al. 2020, internal algorithmic auditing
    'https://hai.stanford.edu/ai-index/2026-ai-index-report', // The AI Index
    'https://internationalaisafetyreport.org/publication/international-ai-safety-report-2026',
  ]) {
    expect(urls.has(url), url).toBe(true);
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
  ]);

  const nodeIds = new Set(nodes.map((node) => node.id));
  const stageOrder = new Map(
    nodes.map((node) => [node.id, stages.find((s) => s.id === node.stage)!.n]),
  );
  const glossaryIds = new Set(getGlossary().map((entry) => termId(entry.term)));
  const glossarySlugs = new Set(getGlossary().map((entry) => entry.slug));

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
        } else if (target.startsWith('/glossary/')) {
          // A term's own page (v0.5.0); the slug must be a glossary term.
          expect(frag, `${link.href} should carry no fragment`).toBeFalsy();
          expect(target, link.href).toMatch(/^\/glossary\/[a-z0-9-]+$/);
          expect(glossarySlugs.has(target.slice('/glossary/'.length)), `${link.href} should resolve`).toBe(true);
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

  test('every obligation join names a register row by its stable id', () => {
    const ids = new Set(obligations.map((o) => o.id));
    const obligationTexts = new Set(obligations.map((o) => o.obligation));
    for (const ref of refs) {
      if (ref.obligationId !== undefined) {
        expect(ids.has(ref.obligationId), `${ref.topic} ${ref.ref}: ${ref.obligationId}`).toBe(true);
      }
      // A legacy text join (v0.4) must still resolve to a row.
      if (ref.obligation !== undefined) {
        expect(obligationTexts.has(ref.obligation), ref.obligation).toBe(true);
      }
    }
    // The v0.5.0 crosswalk joins by id only.
    expect(refs.filter((ref) => ref.obligation !== undefined)).toEqual([]);
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

// ── The obligation register (schema version 2, src/data/frameworks.ts) ─────
test.describe('obligation register', () => {
  const EU = 'eu-ai-act';
  const isIsoDate = (value: string) =>
    /^\d{4}-\d{2}-\d{2}$/.test(value) &&
    new Date(`${value}T00:00:00Z`).toISOString().slice(0, 10) === value;
  const today = new Date().toISOString().slice(0, 10);
  const articlesOf = (clause: string) =>
    [...clause.matchAll(/Art\.\s*(\d+[a-z]?)/g)].map((m) => m[1]);
  /** Does an EU "Maps to" entry of a pattern name article `a`? */
  const namesArticle = (entry: string, a: string) =>
    entry.startsWith('EU AI Act') && new RegExp(`Art\\. ${a}(?![0-9a-z])`).test(entry);

  test('ids are well formed, unique, never retired, and obligation texts are unique', () => {
    const ids = obligations.map((o) => o.id);
    for (const id of ids) expect(id, id).toMatch(OBLIGATION_ID_PATTERN);
    expect(new Set(ids).size).toBe(ids.length);
    for (const retired of retiredObligationIds) expect(ids.includes(retired), retired).toBe(false);
    const texts = obligations.map((o) => o.obligation);
    expect(new Set(texts).size).toBe(texts.length);
  });

  test('every row names a real instrument, a clause and a requirement', () => {
    const frameworkIds = new Set(frameworks.map((f) => f.id));
    for (const row of obligations) {
      expect(frameworkIds.has(row.frameworkId), `${row.id} frameworkId`).toBe(true);
      expect(row.clause.trim().length, `${row.id} clause`).toBeGreaterThan(0);
      expect(row.requirement.trim().length, `${row.id} requirement`).toBeGreaterThan(0);
    }
  });

  test('dates are real ISO dates; milestones follow appliesFrom in order; reviewed is past', () => {
    for (const row of obligations) {
      expect(isIsoDate(row.reviewed), `${row.id} reviewed`).toBe(true);
      expect(row.reviewed <= today, `${row.id} reviewed`).toBe(true);
      if (row.appliesFrom !== undefined) {
        expect(isIsoDate(row.appliesFrom), `${row.id} appliesFrom`).toBe(true);
      }
      let previous = row.appliesFrom ?? '';
      for (const step of row.milestones ?? []) {
        expect(isIsoDate(step.date), `${row.id} milestone`).toBe(true);
        expect(step.date > previous, `${row.id} milestone order`).toBe(true);
        previous = step.date;
      }
    }
  });

  test('the status agrees with the dates on the review date', () => {
    for (const row of obligations) {
      const from = row.appliesFrom;
      switch (row.appliesStatus) {
        case 'in-force':
        case 'grace':
          expect(from !== undefined && from <= row.reviewed, `${row.id} ${row.appliesStatus}`).toBe(true);
          break;
        case 'applies-later':
        case 'deferred':
          expect(from !== undefined && from > row.reviewed, `${row.id} ${row.appliesStatus}`).toBe(true);
          break;
        default:
          // voluntary / pending: a date is optional.
          break;
      }
    }
  });

  test('duty holder, authority and system class stay on the EU AI Act rows', () => {
    for (const row of obligations) {
      if (row.frameworkId === EU) {
        expect(row.dutyHolder, `${row.id} dutyHolder`).toBeTruthy();
        expect(row.authority, `${row.id} authority`).toBeTruthy();
        expect((row.systemClass ?? []).length, `${row.id} systemClass`).toBeGreaterThan(0);
        expect(row.appliesFrom, `${row.id} appliesFrom`).toBeTruthy();
      } else {
        // ObligationTable's duty-holder filter reads dutyHolder as an EU AI Act field.
        expect(row.dutyHolder, `${row.id} dutyHolder`).toBe(undefined);
        expect(row.systemClass, `${row.id} systemClass`).toBe(undefined);
      }
    }
  });

  test('every EU AI Act date is one chapter 08 states', () => {
    const chapter = readSource('bok/08-regulatory-map.md');
    const months = [
      'January', 'February', 'March', 'April', 'May', 'June',
      'July', 'August', 'September', 'October', 'November', 'December',
    ];
    const stated = (iso: string) => {
      const [y, m, d] = iso.split('-');
      return chapter.includes(iso) || chapter.includes(`${Number(d)} ${months[Number(m) - 1]} ${y}`);
    };
    for (const row of obligations.filter((o) => o.frameworkId === EU)) {
      for (const date of [row.appliesFrom!, ...(row.milestones ?? []).map((m) => m.date)]) {
        expect(stated(date), `${row.id} ${date}`).toBe(true);
      }
    }
  });

  test('the high-risk rows carry the Annex I and public-authority dates', () => {
    for (const row of obligations.filter((o) => o.frameworkId === EU)) {
      const classes = row.systemClass ?? [];
      const dates = (row.milestones ?? []).map((m) => m.date);
      if (row.appliesStatus === 'deferred') expect(row.appliesFrom).toBe('2027-12-02');
      // A deferred high-risk duty that reaches Annex I systems reaches them later.
      if (row.appliesStatus === 'deferred' && classes.includes('high-risk-annex-i')) {
        expect(dates.includes('2028-08-02'), `${row.id} Annex I`).toBe(true);
        // Art. 6 is the classification rule, not a duty on a deployed system, so the
        // Art. 111(2) public-authority deadline is not stamped on it.
        if (row.id !== 'AIGE-OBL-EUAIA-ART6') {
          expect(dates.includes('2030-08-02'), `${row.id} public authorities`).toBe(true);
        }
      }
    }
    const art4 = obligations.find((o) => o.id === 'AIGE-OBL-EUAIA-ART4')!;
    expect(art4.appliesFrom).toBe('2025-02-02');
    expect(art4.appliesStatus).toBe('in-force');
  });

  test('patterns exist; EU rows list exactly the patterns whose "Maps to" names the article', () => {
    const patternIds = new Set(patterns.map((p) => p.id));
    for (const row of obligations) {
      for (const id of row.patterns ?? []) expect(patternIds.has(id), `${row.id} ${id}`).toBe(true);
    }
    for (const row of obligations.filter((o) => o.frameworkId === EU)) {
      const articles = articlesOf(row.clause);
      expect(articles.length, `${row.id} clause`).toBeGreaterThan(0);
      const expected = patterns
        .filter((p) => p.mapsTo.some((entry) => articles.some((a) => namesArticle(entry, a))))
        .map((p) => p.id)
        .sort();
      expect([...(row.patterns ?? [])].sort(), row.id).toEqual(expected);
    }
  });
});
