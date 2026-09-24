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

  test('refs reference known topics; topic ids are unique; 40+ refs', () => {
    const topicIds = topics.map((topic) => topic.id);
    expect(new Set(topicIds).size).toBe(topicIds.length);
    const topicIdSet = new Set(topicIds);
    for (const ref of refs) {
      expect(topicIdSet.has(ref.topic), ref.topic).toBe(true);
    }
    expect(refs.length).toBeGreaterThan(40);
  });

  test('every ref.framework is a known framework or a cn column id', () => {
    const frameworkIds = new Set(frameworks.map((framework) => framework.id));
    const allowed = new Set([...frameworkIds, ...cnIds]);
    for (const ref of refs) {
      expect(allowed.has(ref.framework), ref.framework).toBe(true);
    }
    // The China block lands all cn-* ids together: if one is in frameworks.ts,
    // they all must be.
    const present = cnIds.filter((id) => frameworkIds.has(id));
    if (present.length > 0) {
      expect(present.length).toBe(cnIds.length);
    }
  });

  // Active now that frameworks.ts carries the cn-* ids the China block added.
  test(
    'every ref.framework exists in frameworks.ts (cn-* entries land with the China block)',
    () => {
      const frameworkIds = new Set(frameworks.map((framework) => framework.id));
      for (const ref of refs) {
        expect(frameworkIds.has(ref.framework), ref.framework).toBe(true);
      }
    },
  );

  test('columns are eu/iso/nist/cn; each is referenced; topics span 2+ columns', () => {
    expect(columns.map((column) => column.id)).toEqual(['eu', 'iso', 'nist', 'cn']);

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

  test('every obligation join exists verbatim in the obligation matrix', () => {
    const obligationTexts = new Set(obligations.map((o) => o.obligation));
    for (const ref of refs) {
      if (ref.obligation !== undefined) {
        expect(obligationTexts.has(ref.obligation), ref.obligation).toBe(true);
      }
    }
  });

  test('urls are https; unverified refs carry a note; chips prefix only cn refs', () => {
    const cnIdSet = new Set(cnIds);
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
      if (cnIdSet.has(ref.framework)) {
        expect(label, `${ref.framework} ${ref.ref}`).not.toBe(ref.ref);
        expect(label.endsWith(ref.ref)).toBe(true);
      } else {
        expect(label).toBe(ref.ref);
      }
    }
    // chipPrefix holds exactly the cn column ids.
    expect(new Set(Object.keys(chipPrefix))).toEqual(cnIdSet);
  });

  test('topicMatrix is 12 rows x 4 columns with cells sorted core-first', () => {
    const matrix = topicMatrix();
    expect(matrix.rows).toHaveLength(12);
    expect(matrix.columns).toHaveLength(4);
    for (const column of matrix.columns) {
      // Every column framework resolves, via the cn fallback where needed.
      expect(column.fws.length, column.id).toBe(column.frameworks.length);
    }
    for (const row of matrix.rows) {
      expect(row.cells, row.topic.id).toHaveLength(4);
      for (const cell of row.cells) {
        const ranks = cell.map((ref) => (ref.strength === 'core' ? 0 : 1));
        const sorted = [...ranks].sort((a, b) => a - b);
        expect(ranks, row.topic.id).toEqual(sorted);
      }
    }
  });

  test('frameworkById resolves cn stub ids even before frameworks.ts has them', () => {
    for (const id of cnIds) {
      const framework = frameworkById(id);
      expect(framework, id).toBeTruthy();
      expect(framework!.id).toBe(id);
      expect(framework!.name.trim().length, id).toBeGreaterThan(0);
    }
    // Never claim TC260 3.0 is a binding rule.
    expect(frameworkById('cn-tc260-framework')!.summary.includes('binding')).toBe(false);
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
