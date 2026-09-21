// map.ts: the data model of "the map of the discipline" — a two-sided mind map
// with a central node (AI Governance Engineer) and eight branches, each with its
// second-level leaves and, where the design calls for it, third-level chips.
//
// This module is PURE: it carries no runtime imports (only `import type`, which
// erases), so scripts/figures-build.mjs and scripts/map-build.mjs can transpile
// it and import it from a data: URL, exactly like the other generated-figure
// data modules. `buildMap(sources)` is fed the already-verified arrays from the
// site's data modules (values, stack, patterns, role, maturity, frameworks,
// crosswalk, path, site); Astro and the build script each load those modules on
// their own and pass them in. Labels are therefore verbatim from the modules
// that are already checked against bok/*.md; the handful of labels written here
// (section headings, disambiguation neighbours, framework families) are declared
// in HAND_WRITTEN and checked against the Markdown by tests/map.spec.ts.

import type { Value, Principle, Problem } from './values';
import type { Layer, MinimumViableStack } from './stack';
import type { PatternDef } from './patterns';
import type { Workflow, WayIn } from './role';
import type { MaturityLevel } from './maturity';
import type { Framework } from './frameworks';
import type { Topic, CrosswalkColumn } from './crosswalk';
import type { PathStage, PathNode } from './path';
import type { SiteConfig } from './site';

// ------------------------------------------------------------------ types -- //

/** A stack-layer colour token; the eight branches borrow this palette. */
export type MapColor = '--l1' | '--l2' | '--l3' | '--l4' | '--l5';

/** Which half of the map a branch sits on. */
export type MapSide = 'left' | 'right';

/** The eight branch ids, in canonical order (left side first). */
export type MapBranchId =
  | 'foundations'
  | 'values'
  | 'stack'
  | 'patterns'
  | 'role'
  | 'obligations'
  | 'maturity'
  | 'path';

/**
 * A node in the map. `children` are either flow-wrapped chips in the SVG (when
 * `inlineChildren` is true) or index-only entries surfaced in the text list.
 * `color` overrides the branch colour (used by Stack and Patterns leaves, which
 * take their real layer colour). Every node's `href` resolves to a page or an
 * on-page anchor of the built site.
 */
export interface MapNode {
  id: string;
  label: string;
  short?: string;
  href: string;
  color?: MapColor;
  /** A count shown as a small badge on the leaf (e.g. 8 values, 31 frameworks). */
  badge?: number;
  children?: MapNode[];
  /** When true, `children` render as chips inside the leaf's column. */
  inlineChildren?: boolean;
}

/** A page link surfaced under a branch's "Resources" index group. */
export interface MapRoute {
  label: string;
  href: string;
}

/** One of the eight branches: a labelled group of leaves on one side. */
export interface MapBranch {
  id: MapBranchId;
  label: string;
  short: string;
  color: MapColor;
  side: MapSide;
  href: string;
  /** Chapter slugs (src/data/chapters.ts `slug`) this branch draws from. */
  chapters: string[];
  /** Section pages this branch also lives on. */
  routes: MapRoute[];
  leaves: MapNode[];
}

/** The central hub. */
export interface MapCenter {
  label: string;
  short: string;
  href: string;
}

/** The whole map: a centre and eight branches. */
export interface MapDef {
  center: MapCenter;
  branches: MapBranch[];
}

/** A label written by hand here, with the Markdown file it is quoted from. */
export interface HandWritten {
  label: string;
  file: string;
}

/** A family of frameworks, keyed to a chapter-08 heading anchor. */
export interface FrameworkFamily {
  anchor: string;
  label: string;
  short: string;
  ids: string[];
}

/**
 * Everything `buildMap` needs, pulled from the site's data modules. Each caller
 * loads the modules itself and assembles this object.
 */
export interface MapSources {
  site: Pick<SiteConfig, 'name' | 'url'>;
  values: readonly Value[];
  principles: readonly Principle[];
  problems: readonly Problem[];
  layers: readonly Layer[];
  minimumViableStack: MinimumViableStack;
  patterns: readonly PatternDef[];
  workflows: readonly Workflow[];
  waysIn: readonly WayIn[];
  levels: readonly MaturityLevel[];
  frameworks: readonly Framework[];
  topics: readonly Topic[];
  columns: readonly CrosswalkColumn[];
  stages: readonly PathStage[];
  nodes: readonly PathNode[];
}

// -------------------------------------------------------------- utilities -- //

/**
 * Slugify ASCII heading text exactly as rehype-slug (github-slugger) does for
 * the strings this map uses: lower-case, drop punctuation (keeping word
 * characters and hyphens), and turn runs of whitespace into single hyphens.
 * Kept free of the `github-slugger` import so this module stays pure.
 */
export function slug(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^\w\s-]/g, '')
    .replace(/\s+/g, '-');
}

const pad2 = (n: number): string => String(n).padStart(2, '0');

// The five problems of legacy governance carry sentence-length titles; the map
// chips show a leading substring (still verbatim) and the full title in the list.
const PROBLEM_SHORT: Record<number, string> = {
  1: 'Governance written',
  2: 'Point-in-time review',
  3: 'Governance as a gate',
  4: 'Framework theatre',
  5: 'No runtime data path',
};

// ----------------------------------------------------------- hand-written -- //

/**
 * Labels written by hand in this module (as opposed to taken from a data field),
 * each with the `bok/*.md` file that must contain it verbatim. tests/map.spec.ts
 * asserts every one appears in its source, so the map can never drift from the
 * chapters it names.
 */
export const HAND_WRITTEN: readonly HandWritten[] = [
  // chapter 01 — foundations
  { label: 'The definition', file: 'bok/01-definition.md' },
  { label: 'The three questions', file: 'bok/01-definition.md' },
  { label: 'The disambiguation cluster', file: 'bok/01-definition.md' },
  { label: 'AI safety research', file: 'bok/01-definition.md' },
  { label: 'MLOps / LLMOps', file: 'bok/01-definition.md' },
  { label: 'Model risk management (SR 11-7 style)', file: 'bok/01-definition.md' },
  { label: 'AI compliance / legal', file: 'bok/01-definition.md' },
  { label: 'Responsible AI / AI ethics', file: 'bok/01-definition.md' },
  { label: 'GRC engineering', file: 'bok/01-definition.md' },
  { label: 'AI security engineering', file: 'bok/01-definition.md' },
  // chapter 02 — why now
  { label: 'The five problems, with the evidence', file: 'bok/02-why-now.md' },
  // chapter 04 — the stack
  { label: 'The minimum viable stack for a team of one', file: 'bok/04-the-stack.md' },
  // chapter 06 — the role
  { label: 'The career ladder', file: 'bok/06-the-role.md' },
  { label: 'Three ways in', file: 'bok/06-the-role.md' },
  // chapter 07 — maturity
  { label: 'Self-assessment checklist', file: 'bok/07-maturity-model.md' },
  { label: 'Metrics per level', file: 'bok/07-maturity-model.md' },
  // chapter 08 — regulatory map (framework families, verbatim H2s)
  { label: 'EU AI Act, post-Omnibus', file: 'bok/08-regulatory-map.md' },
  { label: 'GPAI Code of Practice', file: 'bok/08-regulatory-map.md' },
  { label: 'ISO/IEC 42001, 42005 and 42006', file: 'bok/08-regulatory-map.md' },
  { label: 'NIST AI RMF', file: 'bok/08-regulatory-map.md' },
  { label: 'CSA AICM and STAR for AI', file: 'bok/08-regulatory-map.md' },
  { label: 'OWASP GenAI Security Project', file: 'bok/08-regulatory-map.md' },
  { label: 'US federal and state laws', file: 'bok/08-regulatory-map.md' },
  { label: 'Other jurisdictions', file: 'bok/08-regulatory-map.md' },
];

/**
 * The eight chapter-08 H2 families, each `anchor` a real heading slug and each
 * `ids` a subset of frameworks.ts ids. Together the families partition all 31
 * framework ids (checked in tests/map.spec.ts).
 */
export const FRAMEWORK_FAMILIES: readonly FrameworkFamily[] = [
  {
    anchor: 'eu-ai-act-post-omnibus',
    label: 'EU AI Act, post-Omnibus',
    short: 'EU AI Act',
    ids: ['eu-ai-act'],
  },
  {
    anchor: 'gpai-code-of-practice',
    label: 'GPAI Code of Practice',
    short: 'GPAI Code',
    ids: ['gpai-code-of-practice'],
  },
  {
    anchor: 'isoiec-42001-42005-and-42006',
    label: 'ISO/IEC 42001, 42005 and 42006',
    short: 'ISO/IEC 42001',
    ids: ['iso-42001', 'iso-42005', 'iso-42006', 'iso-23894'],
  },
  {
    anchor: 'nist-ai-rmf',
    label: 'NIST AI RMF',
    short: 'NIST AI RMF',
    ids: ['nist-ai-rmf', 'nist-ai-agent-standards', 'nist-ir-8596', 'nist-ai-800-1'],
  },
  {
    anchor: 'csa-aicm-and-star-for-ai',
    label: 'CSA AICM and STAR for AI',
    short: 'CSA AICM',
    ids: ['csa-aicm', 'csa-star-for-ai'],
  },
  {
    anchor: 'owasp-genai-security-project',
    label: 'OWASP GenAI Security Project',
    short: 'OWASP GenAI',
    ids: ['owasp-agentic-top-10', 'owasp-llm-top-10', 'owasp-acs', 'owasp-aibom'],
  },
  {
    anchor: 'us-federal-and-state-laws',
    label: 'US federal and state laws',
    short: 'US federal',
    ids: ['ca-sb-53', 'ny-raise-act', 'tx-traiga', 'co-ai-act'],
  },
  {
    anchor: 'other-jurisdictions',
    label: 'Other jurisdictions',
    short: 'Other',
    ids: [
      'kr-ai-basic-act',
      'uk-duaa',
      'sg-genai-framework',
      'cn-algo-recommendation',
      'cn-deep-synthesis',
      'cn-genai-measures',
      'cn-content-labelling',
      'cn-gbt-45654',
      'cn-tc260-framework',
      'etsi-en-304-223',
      'en-18286',
    ],
  },
];

// -------------------------------------------------------------- buildMap -- //

const BOK = (chapterSlug: string, anchor: string): string =>
  `/bok/${chapterSlug}#${anchor}`;

/**
 * Assemble the whole map from the site's data modules. Pure and deterministic:
 * the same sources always produce the same MapDef.
 */
export function buildMap(src: MapSources): MapDef {
  const branches: MapBranch[] = [
    foundationsBranch(src),
    valuesBranch(src),
    stackBranch(src),
    patternsBranch(src),
    roleBranch(src),
    obligationsBranch(src),
    maturityBranch(src),
    pathBranch(src),
  ];

  return {
    center: { label: src.site.name, short: 'AIGE', href: '/thesis' },
    branches,
  };
}

// -- left side ------------------------------------------------------------- //

function foundationsBranch(src: MapSources): MapBranch {
  const neighbours: { label: string; short?: string }[] = [
    { label: 'AI safety research' },
    { label: 'MLOps / LLMOps' },
    { label: 'Model risk management (SR 11-7 style)', short: 'Model risk management' },
    { label: 'AI compliance / legal' },
    { label: 'Responsible AI / AI ethics' },
    { label: 'GRC engineering' },
    { label: 'AI security engineering' },
  ];

  return {
    id: 'foundations',
    label: 'Foundations',
    short: 'Foundations',
    color: '--l1',
    side: 'left',
    href: '/bok/definition',
    chapters: ['definition', 'why-now'],
    routes: [],
    leaves: [
      {
        id: 'foundations:definition',
        label: 'The definition',
        href: BOK('definition', 'the-definition'),
      },
      {
        id: 'foundations:three-questions',
        label: 'The three questions',
        href: BOK('definition', 'the-three-questions'),
      },
      {
        id: 'foundations:disambiguation',
        label: 'The disambiguation cluster',
        href: BOK('definition', 'the-disambiguation-cluster'),
        inlineChildren: true,
        children: neighbours.map((n) => ({
          id: `foundations:disambiguation:${slug(n.short ?? n.label)}`,
          label: n.label,
          short: n.short,
          href: BOK('definition', 'the-disambiguation-cluster'),
        })),
      },
      {
        id: 'foundations:problems',
        label: 'The five problems, with the evidence',
        short: 'The five problems',
        href: BOK('why-now', 'the-five-problems-with-the-evidence'),
        inlineChildren: true,
        children: src.problems.map((p) => ({
          id: `foundations:problem:${p.n}`,
          label: p.title,
          short: PROBLEM_SHORT[p.n],
          href: BOK('why-now', `${p.n}-${slug(p.title)}`),
        })),
      },
    ],
  };
}

function valuesBranch(src: MapSources): MapBranch {
  return {
    id: 'values',
    label: 'Values & principles',
    short: 'Values',
    color: '--l2',
    side: 'left',
    href: '/bok/values-and-principles',
    chapters: ['values-and-principles'],
    routes: [],
    leaves: [
      {
        id: 'values:values',
        label: 'The eight values',
        href: BOK('values-and-principles', 'the-eight-values'),
        badge: src.values.length,
        children: src.values.map((v) => ({
          id: `values:value:${v.n}`,
          label: v.title,
          href: BOK('values-and-principles', `${v.n}-${slug(v.title)}`),
        })),
      },
      {
        id: 'values:principles',
        label: 'The six principles',
        href: BOK('values-and-principles', 'the-six-principles'),
        badge: src.principles.length,
        // Principle titles diverge from their H3 headings (e.g. "Give every
        // control teeth, or call it a signal" vs "Give every control teeth"),
        // so the index links each to the principles section rather than a
        // per-principle anchor that would not resolve.
        children: src.principles.map((p) => ({
          id: `values:principle:${p.n}`,
          label: p.title,
          href: BOK('values-and-principles', 'the-six-principles'),
        })),
      },
    ],
  };
}

function stackBranch(src: MapSources): MapBranch {
  const layerLeaves: MapNode[] = src.layers.map((layer) => ({
    id: `stack:layer:${layer.n}`,
    label: `Layer ${pad2(layer.n)} ${layer.name}`,
    short: layer.name,
    href: BOK('the-stack', layer.chapterAnchor),
    color: layer.colorVar as MapColor,
    children: layer.toolCategories.map((tc) => ({
      id: `stack:layer:${layer.n}:${slug(tc.category)}`,
      label: tc.category,
      href: '/resources/tools',
    })),
  }));

  return {
    id: 'stack',
    label: 'The Stack',
    short: 'Stack',
    color: '--l3',
    side: 'left',
    href: '/bok/the-stack',
    chapters: ['the-stack'],
    routes: [
      { label: 'The Stack', href: '/stack' },
      { label: 'Tools', href: '/resources/tools' },
    ],
    leaves: [
      ...layerLeaves,
      {
        id: 'stack:mvs',
        label: 'The minimum viable stack for a team of one',
        short: 'The minimum viable stack',
        href: BOK('the-stack', src.minimumViableStack.anchor),
      },
    ],
  };
}

function patternsBranch(src: MapSources): MapBranch {
  const leaves: MapNode[] = src.layers.map((layer) => {
    const inLayer = src.patterns.filter((p) => p.layer === layer.n);
    return {
      id: `patterns:layer:${layer.n}`,
      label: `Layer ${pad2(layer.n)} ${layer.name}`,
      short: layer.name,
      href: '/bok/patterns',
      color: layer.colorVar as MapColor,
      badge: inLayer.length,
      inlineChildren: true,
      children: inLayer.map((p) => ({
        id: `patterns:${p.id}`,
        label: p.title,
        href: BOK('patterns', p.id),
        color: layer.colorVar as MapColor,
      })),
    };
  });

  return {
    id: 'patterns',
    label: 'Patterns',
    short: 'Patterns',
    color: '--l4',
    side: 'left',
    href: '/bok/patterns',
    chapters: ['patterns'],
    routes: [],
    leaves,
  };
}

// -- right side ------------------------------------------------------------ //

function roleBranch(src: MapSources): MapBranch {
  const workflowLeaves: MapNode[] = src.workflows.map((w, i) => ({
    id: `role:workflow:${i + 1}`,
    label: w.name,
    href: BOK('the-role', w.anchor),
  }));

  return {
    id: 'role',
    label: 'The Role',
    short: 'Role',
    color: '--l3',
    side: 'right',
    href: '/bok/the-role',
    chapters: ['the-role'],
    routes: [{ label: 'The Role', href: '/role' }],
    leaves: [
      ...workflowLeaves,
      {
        id: 'role:career-ladder',
        label: 'The career ladder',
        href: BOK('the-role', 'the-career-ladder'),
      },
      {
        id: 'role:ways-in',
        label: 'Three ways in',
        href: BOK('the-role', 'three-ways-in'),
        inlineChildren: true,
        children: src.waysIn.map((w, i) => ({
          id: `role:way-in:${i + 1}`,
          label: w.title,
          href: BOK('the-role', 'three-ways-in'),
        })),
      },
    ],
  };
}

function obligationsBranch(src: MapSources): MapBranch {
  // Risk management is the first crosswalk topic and the thread GRC readers look for first;
  // it is promoted to a second-level leaf so it shows in the portrait variant too.
  const riskTopic = src.topics.find((t) => t.id === 'risk-management');
  if (!riskTopic) throw new Error('map: crosswalk topic "risk-management" is missing');
  const familyChips: MapNode[] = FRAMEWORK_FAMILIES.map((family) => ({
    id: `obligations:family:${family.anchor}`,
    label: family.label,
    short: family.short,
    href: BOK('regulatory-map', family.anchor),
    children: family.ids.map((id) => {
      const fw = src.frameworks.find((f) => f.id === id);
      return {
        id: `obligations:framework:${id}`,
        label: fw ? fw.short : id,
        href: `/resources/frameworks#fw-${id}`,
      };
    }),
  }));

  return {
    id: 'obligations',
    label: 'Obligations',
    short: 'Obligations',
    color: '--l5',
    side: 'right',
    href: '/bok/regulatory-map',
    chapters: ['regulatory-map'],
    routes: [
      { label: 'Frameworks', href: '/resources/frameworks' },
      { label: 'Topic crosswalk', href: '/resources/crosswalk' },
    ],
    leaves: [
      {
        id: 'obligations:risk-management',
        label: riskTopic.name,
        href: `/resources/crosswalk#topic-${riskTopic.id}`,
      },
      {
        id: 'obligations:crosswalk',
        label: 'Topic crosswalk',
        href: '/resources/crosswalk',
        badge: src.topics.length,
        inlineChildren: true,
        children: src.topics.map((t) => ({
          id: `obligations:topic:${t.id}`,
          label: t.name,
          href: `/resources/crosswalk#topic-${t.id}`,
        })),
      },
      {
        id: 'obligations:frameworks',
        label: 'Frameworks',
        href: '/resources/frameworks#fw-heading',
        badge: src.frameworks.length,
        inlineChildren: true,
        children: familyChips,
      },
      {
        id: 'obligations:reverse-index',
        label: 'Obligation → artefact → layer',
        short: 'Obligation',
        href: '/resources/frameworks#ob-heading',
        children: src.columns.map((c) => ({
          id: `obligations:column:${c.id}`,
          label: c.label,
          href: '/resources/crosswalk',
        })),
      },
    ],
  };
}

function maturityBranch(src: MapSources): MapBranch {
  const levelLeaves: MapNode[] = src.levels.map((level) => ({
    id: `maturity:level:${level.n}`,
    label: `${level.n} ${level.name}`,
    short: level.name,
    href: BOK('maturity-model', level.anchor),
  }));

  return {
    id: 'maturity',
    label: 'Maturity',
    short: 'Maturity',
    color: '--l4',
    side: 'right',
    href: '/bok/maturity-model',
    chapters: ['maturity-model'],
    routes: [],
    leaves: [
      ...levelLeaves,
      {
        id: 'maturity:self-assessment',
        label: 'Self-assessment checklist',
        short: 'Self-assessment',
        href: BOK('maturity-model', 'self-assessment-checklist'),
      },
      {
        id: 'maturity:metrics',
        label: 'Metrics per level',
        href: BOK('maturity-model', 'metrics-per-level'),
      },
    ],
  };
}

function pathBranch(src: MapSources): MapBranch {
  const leaves: MapNode[] = src.stages.map((stage) => ({
    id: `path:stage:${stage.id}`,
    label: stage.title,
    href: `/path#stage-${stage.id}`,
    badge: src.nodes.filter((n) => n.stage === stage.id).length,
    children: src.nodes
      .filter((n) => n.stage === stage.id)
      .map((n) => ({
        id: `path:node:${n.id}`,
        label: n.title,
        href: `/path#node-${n.id}`,
      })),
  }));

  return {
    id: 'path',
    label: 'Learning path',
    short: 'Learning',
    color: '--l2',
    side: 'right',
    href: '/path',
    chapters: [],
    routes: [{ label: 'Learning path', href: '/path' }],
    leaves,
  };
}
