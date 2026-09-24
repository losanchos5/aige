// map.spec.ts: acceptance checks for the discipline map, the pure data model
// (src/data/map.ts) and the generated SVGs (scripts/map-build.mjs +
// figures-build.mjs). All pure-Node assertions (no browser); runs in the
// `default` project. The page-side checks (getBBox fit, cluster index, keyboard)
// live in tests/map-page.spec.ts, which the /map page brings with it.
import { test, expect } from '@playwright/test';
import { execFileSync } from 'node:child_process';
import { existsSync, readFileSync } from 'node:fs';
import { resolve } from 'node:path';

import { buildMap, HAND_WRITTEN, FRAMEWORK_FAMILIES } from '../src/data/map';
import type { MapDef, MapNode } from '../src/data/map';
import { readSource, slugify, getHeadings } from '../src/lib/md-parse';
import { getChapterBySlug } from '../src/data/chapters';
import { values, principles, problems } from '../src/data/values';
import { layers, minimumViableStack } from '../src/data/stack';
import { patterns } from '../src/data/patterns';
import { workflows, waysIn } from '../src/data/role';
import { levels } from '../src/data/maturity';
import { frameworks } from '../src/data/frameworks';
import { topics, columns } from '../src/data/crosswalk';
import { stages, nodes } from '../src/data/path';
import { site } from '../src/data/site';

const map: MapDef = buildMap({
  site: { name: site.name, url: site.url },
  values,
  principles,
  problems,
  layers,
  minimumViableStack,
  patterns,
  workflows,
  waysIn,
  levels,
  frameworks,
  topics,
  columns,
  stages,
  nodes,
});

/** Every node in the tree (leaves and their children), depth-first. */
function allNodes(m: MapDef): MapNode[] {
  const out: MapNode[] = [];
  const walk = (n: MapNode) => {
    out.push(n);
    for (const c of n.children ?? []) walk(c);
  };
  for (const b of m.branches) for (const leaf of b.leaves) walk(leaf);
  return out;
}

/** Slugs of every heading in a chapter, as rehype-slug would emit them. */
function headingSlugs(chapterId: string): Set<string> {
  return new Set(
    getHeadings(readSource(`bok/${chapterId}.md`)).map((h) => slugify(h.text)),
  );
}

const NODES = allNodes(map);
const topicIds = new Set<string>(topics.map((t) => t.id));
const stageIds = new Set<string>(stages.map((s) => s.id));
const nodeIds = new Set<string>(nodes.map((n) => n.id));
const frameworkIds = new Set<string>(frameworks.map((f) => f.id));

// --- 1. Structure ------------------------------------------------------------
test('the map has eight branches, four per side, with unique colours per side', () => {
  expect(map.branches).toHaveLength(8);
  const left = map.branches.filter((b) => b.side === 'left');
  const right = map.branches.filter((b) => b.side === 'right');
  expect(left).toHaveLength(4);
  expect(right).toHaveLength(4);
  expect(new Set(left.map((b) => b.color)).size).toBe(4);
  expect(new Set(right.map((b) => b.color)).size).toBe(4);
});

test('the centre is the site, linking the Thesis', () => {
  expect(map.center.label).toBe(site.name);
  expect(map.center.label).toBe('AI Governance Engineer');
  expect(map.center.short).toBe('AIGE');
  expect(map.center.href).toBe('/thesis');
});

test('node ids are unique and every node has a non-empty label and href', () => {
  const ids = [...map.branches.map((b) => b.id), ...NODES.map((n) => n.id)];
  expect(new Set(ids).size).toBe(ids.length);
  for (const b of map.branches) {
    expect(b.label.trim().length, `${b.id} label`).toBeGreaterThan(0);
    expect(b.href.trim().length, `${b.id} href`).toBeGreaterThan(0);
  }
  for (const n of NODES) {
    expect(n.label.trim().length, `${n.id} label`).toBeGreaterThan(0);
    expect(n.href.trim().length, `${n.id} href`).toBeGreaterThan(0);
  }
});

test('every short is a substring of its label', () => {
  for (const b of map.branches) {
    expect(b.label.includes(b.short), `${b.id}: "${b.short}" ⊂ "${b.label}"`).toBe(true);
  }
  for (const n of NODES) {
    if (n.short !== undefined) {
      expect(n.label.includes(n.short), `${n.id}: "${n.short}" ⊂ "${n.label}"`).toBe(true);
    }
  }
});

// --- 2. Hand-written labels exist in the source Markdown ----------------------
test('every hand-written label appears verbatim in its source chapter', () => {
  const cache = new Map<string, string>();
  for (const { label, file } of HAND_WRITTEN) {
    if (!cache.has(file)) cache.set(file, readSource(file));
    expect(cache.get(file)!.includes(label), `"${label}" in ${file}`).toBe(true);
  }
});

// --- 3. Every href resolves against the built site ---------------------------
test('every href resolves to a real anchor, id or known route', () => {
  const KNOWN_ROUTES = new Set([
    '/thesis',
    '/path',
    '/role',
    '/stack',
    '/resources/tools',
    '/resources/frameworks',
    '/resources/crosswalk',
  ]);
  const slugCache = new Map<string, Set<string>>();
  const chapterSlugs = (slugName: string): Set<string> => {
    const chapter = getChapterBySlug(slugName);
    expect(chapter, `chapter for /bok/${slugName}`).toBeTruthy();
    if (!slugCache.has(chapter!.id)) slugCache.set(chapter!.id, headingSlugs(chapter!.id));
    return slugCache.get(chapter!.id)!;
  };

  const hrefs = [
    map.center.href,
    ...map.branches.flatMap((b) => [b.href, ...b.routes.map((r) => r.href)]),
    ...NODES.map((n) => n.href),
  ];

  for (const href of hrefs) {
    const [target, frag] = href.split('#');
    if (target.startsWith('/bok/')) {
      const slugs = chapterSlugs(target.slice('/bok/'.length));
      if (frag) expect(slugs.has(frag), `${href} anchor`).toBe(true);
    } else if (target === '/resources/crosswalk') {
      if (frag) {
        expect(frag.startsWith('topic-'), `${href}`).toBe(true);
        expect(topicIds.has(frag.slice('topic-'.length)), `${href}`).toBe(true);
      }
    } else if (target === '/resources/frameworks') {
      if (frag) {
        const ok =
          frag === 'fw-heading' ||
          frag === 'ob-heading' ||
          (frag.startsWith('fw-') && frameworkIds.has(frag.slice('fw-'.length)));
        expect(ok, `${href}`).toBe(true);
      }
    } else if (target === '/path') {
      if (frag) {
        const ok =
          (frag.startsWith('stage-') && stageIds.has(frag.slice('stage-'.length))) ||
          (frag.startsWith('node-') && nodeIds.has(frag.slice('node-'.length)));
        expect(ok, `${href}`).toBe(true);
      }
    } else {
      expect(frag, `${href} should carry no fragment`).toBeFalsy();
      expect(KNOWN_ROUTES.has(target), `${href} is a known route`).toBe(true);
    }
  }
});

// --- 4. Framework families partition every framework -------------------------
test('FRAMEWORK_FAMILIES cover every framework id exactly once', () => {
  const famIds = FRAMEWORK_FAMILIES.flatMap((f) => f.ids);
  expect(new Set(famIds).size, 'no id in two families').toBe(famIds.length);
  expect([...famIds].sort()).toEqual([...frameworkIds].sort());
});

test('every framework family anchor is a chapter-08 heading slug', () => {
  const ch08 = headingSlugs(getChapterBySlug('regulatory-map')!.id);
  for (const family of FRAMEWORK_FAMILIES) {
    expect(ch08.has(family.anchor), `${family.anchor} is an H2 in chapter 08`).toBe(true);
  }
});

// --- 5. The generated web SVG ------------------------------------------------
test('discipline-map.svg is a valid, budgeted, token-only figure', () => {
  const file = resolve(process.cwd(), 'src/figures/discipline-map.svg');
  expect(existsSync(file)).toBe(true);
  const svg = readFileSync(file, 'utf8');

  expect(Buffer.byteLength(svg, 'utf8')).toBeLessThanOrEqual(48 * 1024);
  expect(svg).not.toMatch(/fill="#/);
  expect(svg).not.toMatch(/stroke="#/);
  expect(svg).toContain('role="group"');
  expect(svg).toContain('class="figc map-svg"');

  // One <a> per rendered node: centre + branches + leaves + inline chips.
  let expected = 1;
  for (const b of map.branches) {
    expected += 1;
    for (const leaf of b.leaves) {
      expected += 1;
      if (leaf.inlineChildren && leaf.children) expected += leaf.children.length;
    }
  }
  const aCount = (svg.match(/<a href/g) ?? []).length;
  expect(aCount).toBe(expected);
});

// --- 6. figures-build --check stays green ------------------------------------
test('figures-build --check reports the generated figures up to date', () => {
  expect(() =>
    execFileSync('node', ['scripts/figures-build.mjs', '--check'], {
      cwd: process.cwd(),
      stdio: 'pipe',
    }),
  ).not.toThrow();
});

// --- 7. The portrait variant -------------------------------------------------
test('the portrait variant is a standalone light-theme SVG with matching meta', () => {
  const svgOut = 'test-results/map-portrait.svg';
  const metaOut = 'test-results/map-portrait.json';
  execFileSync(
    'node',
    ['scripts/map-build.mjs', '--portrait', '--out', svgOut, '--meta', metaOut],
    { cwd: process.cwd(), stdio: 'pipe' },
  );

  const svg = readFileSync(resolve(process.cwd(), svgOut), 'utf8');
  expect(svg).toContain('role="img"');
  expect(svg).not.toMatch(/var\(--/);
  expect(svg).toContain('#CBD8F0'); // --l1
  expect(svg).toContain('#1F3A63'); // --l1-ink
  expect(svg).toContain('viewBox="0 0 1200 ');

  const meta = JSON.parse(readFileSync(resolve(process.cwd(), metaOut), 'utf8'));
  expect(meta.bokVersion).toBe(site.bokVersion);
  expect(meta.viewBox).toBe(`0 0 1200 ${meta.height}`);
  expect(meta.counts.branches).toBe(8);
  expect((svg.match(/<text/g) ?? []).length).toBe(meta.counts.texts);

  // Patterns branch shows every pattern name (or its short), not the layer
  // headers, which The Stack branch already carries exactly once.
  const patternNodes = map.branches
    .find((b) => b.id === 'patterns')!
    .leaves.flatMap((leaf) => leaf.children ?? []);
  expect(patternNodes).toHaveLength(patterns.length); // every pattern in patterns.ts
  // The generator XML-escapes labels (scripts/lib/svg-text.mjs esc), so compare escaped text.
  const escXml = (s: string) =>
    s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;').replace(/'/g, '&#39;');
  for (const node of patternNodes) {
    const shown = svg.includes(escXml(node.label)) || (node.short != null && svg.includes(escXml(node.short)));
    expect(shown, `pattern "${node.label}" (or its short) is in the portrait`).toBe(true);
  }
  expect((svg.match(/Layer 01 Govern-as-Code/g) ?? []).length).toBe(1);
});
