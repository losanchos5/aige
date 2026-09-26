// aigp-coverage.ts: resolves and checks every link of the AIGP coverage map
// (src/data/aigp.ts) against what the site actually builds, and gives each
// link the label the /for/aigp page shows. A link resolves when it is:
//   /bok/<slug>#<anchor>          a heading of that chapter, slugged exactly as
//                                 rehype-slug (github-slugger) slugs it;
//   /patterns/<slug>              a pattern in src/data/patterns.ts;
//   /glossary/<slug>              a term of bok/09-glossary.md;
//   /toolkit/<id>                 a live tool in src/data/toolkit.ts;
//   /resources/templates#schema-<name> | #kit-<id>
//                                 a published JSON Schema or a policy-kit row;
//   /cases/<id>                   a case in src/data/cases.ts;
//   one of KNOWN_ROUTES           a page whose source file exists.
// The /for/aigp page calls `resolvedAigpMap()`, which throws on any problem, so
// a renamed heading or a removed term fails the build with a clear message
// before check-links runs; tests/aigp.spec.ts runs `aigpMapProblems()`.
import { existsSync } from 'node:fs';
import { resolve } from 'node:path';
import GithubSlugger from 'github-slugger';
import { readSource, getHeadings } from './md-parse';
import { getGlossaryEntry } from './glossary';
import { getSchemas } from './schemas-library';
import { getChapterBySlug } from '../data/chapters';
import { getPatternBySlug } from '../data/patterns';
import { tools } from '../data/toolkit';
import { kit } from '../data/templates';
import { caseById } from '../data/cases';
import {
  aigpDomains,
  aigpIndicators,
  type AigpCompetency,
  type AigpDomain,
  type AigpIndicator,
} from '../data/aigp';

export type AigpLinkKind =
  | 'chapter'
  | 'pattern'
  | 'glossary'
  | 'tool'
  | 'template'
  | 'case'
  | 'page';

export interface ResolvedLink {
  href: string;
  label: string;
  kind: AigpLinkKind;
}

/** Pages a mapping may link without a fragment, with the label shown for them
 *  and the source file that must exist (relative to the site folder). */
export const KNOWN_ROUTES: Readonly<Record<string, { label: string; source: string }>> = {
  '/resources/harms': { label: 'Harms atlas', source: 'src/pages/resources/harms.astro' },
  '/resources/contracts': {
    label: 'AI contract and licence clauses',
    source: 'src/pages/resources/contracts.astro',
  },
  '/resources/crosswalk': { label: 'Crosswalk', source: 'src/pages/resources/crosswalk.astro' },
  '/resources/frameworks': { label: 'Frameworks', source: 'src/pages/resources/frameworks.astro' },
  '/resources/templates': {
    label: 'Templates and schemas',
    source: 'src/pages/resources/templates.astro',
  },
  '/obligations': { label: 'Obligation register', source: 'src/pages/obligations/index.astro' },
  '/cases': { label: 'Incidents', source: 'src/pages/cases/index.astro' },
  '/agents': { label: 'Governing AI agents', source: 'src/pages/agents.astro' },
  '/toolkit': { label: 'Toolkit', source: 'src/pages/toolkit/index.astro' },
};

/** Heading text as rehype-slug reads it: the rendered text, no Markdown. */
function plainHeading(text: string): string {
  return text
    .replace(/\[([^\]]+)\]\([^)]*\)/g, '$1')
    .replace(/\*\*|__/g, '')
    .replace(/`/g, '')
    .trim();
}

const headingCache = new Map<string, Map<string, string>>();

/** anchor -> heading text for one chapter file, slugged with one stateful
 *  slugger per document, exactly as rehype-slug numbers repeated headings. */
function chapterHeadings(file: string): Map<string, string> {
  const cached = headingCache.get(file);
  if (cached) return cached;
  const slugger = new GithubSlugger();
  const map = new Map<string, string>();
  for (const heading of getHeadings(readSource(file))) {
    const text = plainHeading(heading.text);
    map.set(slugger.slug(text), text);
  }
  headingCache.set(file, map);
  return map;
}

function fail(href: string, why: string): never {
  throw new Error(`aigp.ts: link "${href}" does not resolve: ${why}`);
}

/** Resolve one href of the map, or throw with the reason. */
export function resolveAigpLink(href: string): ResolvedLink {
  if (!href.startsWith('/')) fail(href, 'links must be internal absolute paths');
  const [path, fragment] = href.split('#');

  if (path.startsWith('/bok/')) {
    const chapter = getChapterBySlug(path.slice('/bok/'.length));
    if (!chapter) fail(href, 'no such chapter');
    if (!fragment) fail(href, 'a chapter link needs the #anchor of the section that teaches it');
    const text = chapterHeadings(`bok/${chapter.id}.md`).get(fragment);
    if (!text) fail(href, `no heading with that anchor in bok/${chapter.id}.md`);
    return { href, kind: 'chapter', label: `Ch. ${chapter.id.slice(0, 2)} · ${text}` };
  }

  if (fragment && path !== '/resources/templates') {
    fail(href, 'only chapter and template links may carry a fragment');
  }

  const [, section, slug, extra] = path.split('/');
  if (section === 'patterns' && slug && !extra) {
    const pattern = getPatternBySlug(slug);
    if (!pattern) fail(href, 'no such pattern in src/data/patterns.ts');
    return { href, kind: 'pattern', label: `Pattern · ${pattern.title}` };
  }
  if (section === 'glossary' && slug && !extra) {
    const entry = getGlossaryEntry(slug);
    if (!entry) fail(href, 'no such term in bok/09-glossary.md');
    return { href, kind: 'glossary', label: `Glossary · ${entry.term}` };
  }
  if (section === 'toolkit' && slug && !extra) {
    const tool = tools.find((entry) => entry.id === slug);
    if (!tool) fail(href, 'no such tool in src/data/toolkit.ts');
    if (tool.status !== 'live') fail(href, 'the tool is not live yet');
    return { href, kind: 'tool', label: `Tool · ${tool.title}` };
  }
  if (section === 'cases' && slug && !extra) {
    const entry = caseById(slug);
    if (!entry) fail(href, 'no such case in src/data/cases.ts');
    return { href, kind: 'case', label: `Case · ${entry.short}` };
  }
  if (path === '/resources/templates' && fragment) {
    if (fragment.startsWith('schema-')) {
      const name = fragment.slice('schema-'.length);
      const schema = getSchemas().find((entry) => entry.name === name);
      if (!schema) fail(href, `no public/schemas/${name}.v1.json`);
      return { href, kind: 'template', label: `Template · ${schema.title}` };
    }
    if (fragment.startsWith('kit-')) {
      const item = kit.find((entry) => entry.id === fragment.slice('kit-'.length));
      if (!item) fail(href, 'no such policy-kit row in src/data/templates.ts');
      return { href, kind: 'template', label: `Template · ${item.title}` };
    }
    fail(href, 'template links point at #schema-<name> or #kit-<id>');
  }

  const route = KNOWN_ROUTES[path];
  if (!route) fail(href, 'not a known route (add it to KNOWN_ROUTES with its source file)');
  if (!existsSync(resolve(process.cwd(), route.source))) {
    fail(href, `the page source ${route.source} does not exist`);
  }
  return { href, kind: 'page', label: route.label };
}

const WORD_LIMIT = 12;
const EM_DASH = String.fromCharCode(0x2014);

/**
 * Every problem with the map, as readable lines: structure (4 domains, 13
 * competencies, 58 indicators, positional ids), paraphrase length, the status
 * rule and every link. An empty list means the map is sound.
 */
export function aigpMapProblems(): string[] {
  const problems: string[] = [];
  const domainCodes = aigpDomains.map((domain) => domain.code).join(',');
  if (domainCodes !== 'I,II,III,IV') problems.push(`domains are ${domainCodes}, expected I,II,III,IV`);

  const competencies = aigpDomains.flatMap((domain) => domain.competencies);
  if (competencies.length !== 13) problems.push(`${competencies.length} competencies, expected 13`);
  const indicators = aigpIndicators();
  if (indicators.length !== 58) problems.push(`${indicators.length} indicators, expected 58`);

  for (const domain of aigpDomains) {
    const { min, max } = domain.questions;
    if (!(min > 0 && min <= max)) problems.push(`${domain.code}: bad question range`);
    const sumMin = domain.competencies.reduce((sum, c) => sum + c.questions.min, 0);
    const sumMax = domain.competencies.reduce((sum, c) => sum + c.questions.max, 0);
    if (sumMin > max || sumMax < min) {
      problems.push(`${domain.code}: competency ranges (${sumMin}-${sumMax}) cannot meet the domain range`);
    }
    domain.competencies.forEach((competency, ci) => {
      const code = `${domain.code}.${String.fromCharCode(65 + ci)}`;
      if (competency.code !== code) problems.push(`${competency.code}: expected positional code ${code}`);
      if (!(competency.questions.min > 0 && competency.questions.min <= competency.questions.max)) {
        problems.push(`${competency.code}: bad question range`);
      }
      if (competency.indicators.length === 0) problems.push(`${competency.code}: no indicators`);
      competency.indicators.forEach((indicator, ii) => {
        const id = `${code}.${ii + 1}`;
        if (indicator.id !== id) problems.push(`${indicator.id}: expected positional id ${id}`);
      });
    });
  }

  const seenIds = new Set<string>();
  for (const { indicator } of indicators) {
    const where = indicator.id;
    if (seenIds.has(where)) problems.push(`${where}: duplicate id`);
    seenIds.add(where);
    const words = indicator.paraphrase.trim().split(/\s+/).length;
    if (words > WORD_LIMIT) problems.push(`${where}: paraphrase has ${words} words (max ${WORD_LIMIT})`);
    for (const text of [indicator.paraphrase, indicator.note ?? '']) {
      if (text.includes(EM_DASH)) problems.push(`${where}: em dash in the text`);
    }
    if (indicator.status === 'partly-taught' && !indicator.note?.trim()) {
      problems.push(`${where}: a partly-taught indicator needs a note saying what is missing`);
    }
    if (indicator.status === 'taught' && indicator.note) {
      problems.push(`${where}: notes are for partly-taught indicators only`);
    }
    if (indicator.links.length < 2) problems.push(`${where}: needs at least two links`);
    if (new Set(indicator.links).size !== indicator.links.length) {
      problems.push(`${where}: repeated link`);
    }
    if (!indicator.links[0]?.startsWith('/bok/')) {
      problems.push(`${where}: the first link must be the chapter section to study first`);
    }
    const kinds = new Set<AigpLinkKind>();
    for (const href of indicator.links) {
      try {
        kinds.add(resolveAigpLink(href).kind);
      } catch (error) {
        problems.push(`${where}: ${(error as Error).message}`);
      }
    }
    if (indicator.status === 'taught' && kinds.size > 0 && [...kinds].every((k) => k === 'chapter')) {
      problems.push(`${where}: "taught" needs a link to an artefact (pattern, template, tool, term or page)`);
    }
  }
  return problems;
}

export interface ResolvedIndicator extends Omit<AigpIndicator, 'links'> {
  links: ResolvedLink[];
}

export interface ResolvedCompetency extends Omit<AigpCompetency, 'indicators'> {
  indicators: ResolvedIndicator[];
}

export interface ResolvedDomain extends Omit<AigpDomain, 'competencies'> {
  competencies: ResolvedCompetency[];
}

/** The map with every link resolved to its label; throws on any problem. */
export function resolvedAigpMap(): ResolvedDomain[] {
  const problems = aigpMapProblems();
  if (problems.length) {
    throw new Error(`AIGP coverage map: ${problems.length} problem(s):\n  ${problems.join('\n  ')}`);
  }
  return aigpDomains.map((domain) => ({
    ...domain,
    competencies: domain.competencies.map((competency) => ({
      ...competency,
      indicators: competency.indicators.map((indicator) => ({
        ...indicator,
        links: indicator.links.map(resolveAigpLink),
      })),
    })),
  }));
}
