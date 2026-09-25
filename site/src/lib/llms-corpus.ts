// llms-corpus.ts: the documents behind /llms-full.txt, its slices
// (/llms-full-<slice>.txt) and the Markdown alternates of the content pages
// (/bok/<slug>.md, /patterns/<slug>.md, /glossary/<slug>.md, /cases/<id>.md,
// /thesis.md). One builder per kind of page, so the three surfaces serialise a
// page the same way:
//
//   - chapters, pattern pages and the Thesis are their Markdown sources, H1
//     dropped (the caller re-emits it) and a chapter's "At a glance" points
//     placed after its abstract, as the page shows them;
//   - glossary terms, incident cases, the obligation register, the crosswalk,
//     the frameworks and the harms atlas are written out from their datasets,
//     with the same headings, fields and numbered sources as their pages.
//
// Links in the generated documents are absolute, so a document still resolves
// once it is copied out of the file it came in.

import { getCollection, getEntry } from 'astro:content';
import { chaptersOrdered, type Chapter } from '../data/chapters';
import { cases, caseEvidenceLabel, casesDisclaimer, type IncidentCase } from '../data/cases';
import {
  appliesStatusLabels,
  disclaimer,
  frameworks,
  obligations,
  obligationPath,
  systemClassLabels,
  type Obligation,
} from '../data/frameworks';
import { chipLabel, crosswalkAsOf, frameworkById, refs, topics } from '../data/crosswalk';
import {
  harmSources,
  harms,
  harmsByLevel,
  incidentDbLabel,
  levelLabel,
  mechanismLabel,
  mitAttribution,
  mitLabel,
} from '../data/harms';
import { patternPath } from '../data/patterns';
import { site } from '../data/site';
import { layers } from '../data/stack';
import {
  contrastPairsFor,
  firstSentence,
  getGlossary,
  localCitations,
  type GlossaryEntry,
} from './glossary';
import { PATTERNS_CHAPTER_ID, casePath, chapterPath, docLead, document, header, withoutTitle } from './llms';
import { loadPatternPages } from './pattern-pages';
import { gitDate } from './reading';
import { sourceText, type Source } from './sources';

/** One page of the corpus: its title, canonical path and Markdown body (no H1). */
export interface CorpusDoc {
  title: string;
  /** Canonical path of the HTML page, e.g. /bok/definition. */
  path: string;
  /** One-line abstract, when the page has one. */
  description?: string;
  /** YYYY-MM-DD of the last commit to the page's source. */
  updated: string;
  body: string;
}

const abs = (path: string) => `${site.url}${path}`;

// gitDate shells out to `git log`; several documents share one source file.
const dateCache = new Map<string, string>();
function updatedOf(file: string): string {
  let date = dateCache.get(file);
  if (date === undefined) {
    date = gitDate(file);
    dateCache.set(file, date);
  }
  return date;
}

const layerName = (n: number) => layers.find((layer) => layer.n === n)?.name ?? `Layer ${n}`;
const layerLabel = (n: number) => `Layer ${n} (${layerName(n)})`;

/** A numbered source row in the house format of STYLEGUIDE.md §6. */
function sourceLine(n: number, source: Source): string {
  return `[${n}] ${sourceText(source)} ${source.url} (verified: ${source.verified})`;
}

/**
 * A chapter body with its "At a glance" points placed after the opening
 * blockquote (the abstract), where the chapter page renders them.
 */
function withGlance(body: string, glance: readonly string[] | undefined): string {
  if (!glance || glance.length === 0) return body;
  const block = ['**At a glance**', '', ...glance.map((point) => `- ${point}`)].join('\n');
  const lines = body.split(/\r?\n/);
  let end = 0;
  while (end < lines.length && /^\s*>/.test(lines[end])) end++;
  if (end === 0) return `${block}\n\n${body}`;
  return [...lines.slice(0, end), '', block, ...lines.slice(end)].join('\n');
}

// ---- Documents with a Markdown source ----------------------------------------

let chapterCache: CorpusDoc[] | undefined;

/** Every chapter in reading order. */
export async function chapterDocs(): Promise<CorpusDoc[]> {
  if (chapterCache) return chapterCache;
  const bok = await getCollection('bok');
  const bodyById = new Map(bok.map((entry) => [entry.id, entry.body ?? ''] as const));
  chapterCache = chaptersOrdered.map((chapter: Chapter) => ({
    title: chapter.title,
    path: chapterPath(chapter),
    description: chapter.summary,
    updated: updatedOf(`../bok/${chapter.id}.md`),
    body: withGlance(withoutTitle(bodyById.get(chapter.id) ?? ''), chapter.glance),
  }));
  return chapterCache;
}

let patternCache: CorpusDoc[] | undefined;

/** Every pattern page in catalogue order; the frontmatter is not part of `body`. */
export async function patternDocs(): Promise<CorpusDoc[]> {
  if (patternCache) return patternCache;
  const pages = await loadPatternPages();
  patternCache = pages.map(({ entry, def }) => ({
    title: `Pattern: ${def.title}`,
    path: patternPath(def),
    description: entry.data.summary,
    updated: updatedOf(`../bok/patterns/${def.slug}.md`),
    body: withoutTitle(entry.body ?? ''),
  }));
  return patternCache;
}

/** The Thesis. */
export async function thesisDoc(): Promise<CorpusDoc> {
  const entry = await getEntry('thesis', 'thesis');
  if (!entry) throw new Error('thesis collection entry not found');
  const source = entry.body ?? '';
  const lead = docLead(source);
  return {
    title: lead.title,
    path: '/thesis',
    description: lead.summary,
    updated: updatedOf('../THESIS.md'),
    body: withoutTitle(source),
  };
}

// ---- Documents written out from a dataset ------------------------------------

/** One glossary term, as its /glossary/<slug> page states it. */
export function glossaryDoc(entry: GlossaryEntry): CorpusDoc {
  const bySlug = new Map(getGlossary().map((other) => [other.slug, other] as const));
  const { text, sources } = localCitations(entry);
  const facts: string[] = [];
  if (entry.see.length > 0) {
    facts.push(`- Developed in: ${entry.see.map((l) => `[${l.label}](${abs(l.href)})`).join('; ')}`);
  }
  const chapters = entry.chapterRefs
    .map((ref) => chaptersOrdered.find((c) => c.order === Number(ref)))
    .filter((c): c is Chapter => c !== undefined);
  if (chapters.length > 0) {
    const list = chapters.map(
      (c) => `[ch. ${String(c.order).padStart(2, '0')}, ${c.shortTitle}](${abs(chapterPath(c))})`,
    );
    facts.push(`- Chapters: ${list.join(' · ')}`);
  }
  const contrast = entry.contrast
    .map((slug) => bySlug.get(slug))
    .filter((other): other is GlossaryEntry => other !== undefined);
  if (contrast.length > 0) {
    facts.push(`- Contrast with: ${contrast.map((o) => `[${o.term}](${abs(o.url)})`).join(' · ')}`);
  }
  facts.push(`- In the glossary chapter: ${abs(`/bok/glossary#${entry.id}`)}`);

  const pairs = contrastPairsFor(entry.slug).map((pair) => {
    const a = bySlug.get(pair.a)?.term ?? pair.a;
    const b = bySlug.get(pair.b)?.term ?? pair.b;
    return `- **${a}** vs **${b}**: ${pair.difference} ${pair.why}`;
  });

  const body = [
    text,
    facts.join('\n'),
    ...(pairs.length > 0 ? ['## Commonly confused', pairs.join('\n')] : []),
    '## Sources',
    sources.length > 0
      ? sources.map((s, i) => `[${i + 1}] ${s.text} ${s.url} (verified: ${s.verified})`).join('\n')
      : 'Defined by this Body of Knowledge: the section it is developed in is the source.',
  ].join('\n\n');

  return {
    title: entry.term,
    path: entry.url,
    description: firstSentence(entry.definition),
    updated: updatedOf('../bok/09-glossary.md'),
    body,
  };
}

/** Every glossary term, in the chapter's alphabetical order. */
export function glossaryDocs(): CorpusDoc[] {
  return getGlossary().map(glossaryDoc);
}

/** One incident case, as its /cases/<id> page states it. */
export function caseDoc(entry: IncidentCase): CorpusDoc {
  const incidentsLine = entry.incidents
    .map((ref) => `[${ref.db === 'AIID' ? `AIID ${ref.id}` : incidentDbLabel[ref.db]}](${ref.url})`)
    .join(' · ');
  const harmLinks = entry.harms
    .map((id) => harms.find((h) => h.id === id))
    .filter((h) => h !== undefined)
    .map((h) => `[${h.harmType}](${abs(`/resources/harms#harm-${h.id}`)})`)
    .join(' · ');
  const controls = entry.control.controls
    .map((ctl) => (ctl.patternId ? `[${ctl.name}](${abs(`/bok/patterns#${ctl.patternId}`)})` : ctl.name))
    .join(' · ');
  const obligationLines = entry.obligations.map((o) => {
    const ref = o.obligationId ? `[${o.ref}](${abs(obligationPath({ id: o.obligationId }))})` : o.ref;
    return `- ${o.instrument} ${ref}: ${o.why}`;
  });

  const body = [
    `> ${entry.summary}`,
    [
      `- Year: ${entry.year}`,
      `- Jurisdiction: ${entry.jurisdiction}`,
      `- Sector: ${entry.sector}`,
      `- Evidence base: ${caseEvidenceLabel[entry.evidence]}`,
      ...(incidentsLine ? [`- Incident record: ${incidentsLine}`] : []),
      ...(harmLinks ? [`- Harm: ${harmLinks}`] : []),
    ].join('\n'),
    '## What happened',
    ...entry.happened,
    '## Failure mode',
    ...entry.failureMode,
    '## Which control would have caught it',
    ...entry.control.text,
    `Patterns: ${controls}`,
    '## The evidence that would have existed',
    'What an auditor could have read, and the stack layer that produces it.',
    entry.evidenceArtefacts.map((item) => `- ${layerLabel(item.layerN)}: ${item.artefact}`).join('\n'),
    '## Obligations it touches today',
    'As of 2026-09-24. Mappings are illustrative, not a claim of conformity.',
    obligationLines.join('\n'),
    '## How to read this case',
    casesDisclaimer,
    '## Sources',
    entry.sources.map((s, i) => sourceLine(i + 1, s)).join('\n'),
  ].join('\n\n');

  return {
    title: entry.title,
    path: casePath(entry),
    description: entry.summary,
    updated: updatedOf('src/data/cases.ts'),
    body,
  };
}

/** Every incident case, in the order of /cases. */
export function caseDocs(): CorpusDoc[] {
  return cases.map(caseDoc);
}

/** One obligation-register row, as its /obligations/<id> page states it. */
function obligationBlock(row: Obligation): string {
  const fields = [
    `- Framework: ${row.framework}`,
    `- Clause: ${row.clause}`,
    `- Requirement: ${row.requirement}`,
    `- Evidence artefact: ${row.artefact}`,
    `- Stack layer: ${row.layerN.map(layerLabel).join(', ')}`,
    ...(row.dutyHolder ? [`- Duty holder: ${row.dutyHolder}`] : []),
    ...(row.scope ? [`- Scope: ${row.scope}`] : []),
    ...(row.authority ? [`- Supervised by: ${row.authority}`] : []),
    ...(row.systemClass?.length
      ? [`- System class: ${row.systemClass.map((c) => systemClassLabels[c]).join(', ')}`]
      : []),
    `- Status: ${appliesStatusLabels[row.appliesStatus]}${row.appliesFrom ? `, applies from ${row.appliesFrom}` : ''}${row.appliesNote ? ` (${row.appliesNote})` : ''}`,
    ...(row.milestones ?? []).map((m) => `- Milestone ${m.date}: ${m.note}`),
    `- Reviewed: ${row.reviewed}`,
    `- In chapter 08: ${abs(`/bok/regulatory-map#${row.anchor}`)}`,
  ];
  return [`## ${row.id}: ${row.obligation}`, `Source: ${abs(obligationPath(row))}`, fields.join('\n')].join(
    '\n\n',
  );
}

/** The obligation register, one section per row. */
export function obligationsDoc(): CorpusDoc {
  return {
    title: 'Obligation register',
    path: '/obligations',
    description: `The ${obligations.length} obligations the Body of Knowledge maps, each with a stable id, the artefact that evidences it and its stack layer.`,
    updated: updatedOf('src/data/frameworks.ts'),
    body: [
      `${disclaimer} Each row has a stable id (AIGE-OBL-<instrument>-<clause>) and its own page; the rows are also published as JSON at ${abs('/api/v1/obligations.json')}.`,
      ...obligations.map(obligationBlock),
    ].join('\n\n'),
  };
}

/** The laws, standards, codes and control sets the book maps against. */
export function frameworksDoc(): CorpusDoc {
  return {
    title: 'Frameworks',
    path: '/resources/frameworks',
    description: 'The laws, standards, codes and control sets the Body of Knowledge maps against.',
    updated: updatedOf('src/data/frameworks.ts'),
    body: [
      `${disclaimer}`,
      ...frameworks.map((f) =>
        [
          `## ${f.name}`,
          [
            `- Type: ${f.type}`,
            `- Issuer: ${f.issuer}`,
            ...(f.url ? [`- Source: ${f.url}`] : []),
          ].join('\n'),
          f.summary,
        ].join('\n\n'),
      ),
    ].join('\n\n'),
  };
}

/** The topic × framework crosswalk, one section per topic. */
export function crosswalkDoc(): CorpusDoc {
  const sections = topics.map((topic) => {
    const rows = refs
      .filter((r) => r.topic === topic.id)
      .map((r) => {
        const framework = frameworkById(r.framework)?.name ?? r.framework;
        const tags = [r.strength, ...(r.verified === false ? ['not verified'] : [])].join(', ');
        const note = r.note ? ` ${r.note}` : '';
        const url = r.url ? ` ${r.url}` : '';
        return `- ${framework} ${chipLabel(r)}, ${r.title} (${tags}).${note}${url}`;
      });
    const read = topic.read?.length
      ? [`Read: ${topic.read.map((l) => `[${l.label}](${abs(l.href)})`).join(' · ')}`]
      : [];
    return [`## ${topic.name}`, topic.summary, ...read, rows.join('\n')].join('\n\n');
  });
  return {
    title: 'Topic × framework crosswalk',
    path: '/resources/crosswalk',
    description:
      'Each Body of Knowledge topic mapped to the clauses of the laws, standards and codes that govern it.',
    updated: updatedOf('src/data/crosswalk.ts'),
    body: [
      `${disclaimer} References checked as of ${crosswalkAsOf}. The same mapping is published as ${abs('/resources/crosswalk.csv')} and ${abs('/resources/crosswalk.json')}.`,
      ...sections,
    ].join('\n\n'),
  };
}

/** The harms atlas, grouped by level, with its numbered sources. */
export function harmsDoc(): CorpusDoc {
  const groups = harmsByLevel().map(({ level, rows }) =>
    [
      `## ${levelLabel[level]}`,
      ...rows.map((harm) => {
        const control = harm.controllingPattern.patternId
          ? `[${harm.controllingPattern.name}](${abs(`/bok/patterns#${harm.controllingPattern.patternId}`)})`
          : harm.controllingPattern.name;
        const examples = harm.exampleIncidents
          .map((ref) => `[${ref.title}](${ref.url}) (${incidentDbLabel[ref.db]})`)
          .join('; ');
        return [
          `### ${harm.harmType}`,
          `Source: ${abs(`/resources/harms#harm-${harm.id}`)}`,
          harm.description,
          [
            `- Mechanism: ${harm.mechanism.map((m) => mechanismLabel[m]).join(', ')}`,
            `- Failure mode: ${harm.failureMode}`,
            `- Control: ${control}`,
            `- Evidence: ${harm.evidence}`,
            `- Stack layer: ${harm.layerN.map(layerLabel).join(', ')}`,
            `- MIT AI Risk Repository: ${harm.mitTaxonomy.map((code) => `${code} ${mitLabel(code)}`).join('; ')}`,
            ...(examples ? [`- Example incidents: ${examples}`] : []),
            `- Sources: ${harm.sources.map((n) => `[${n}]`).join('')}`,
          ].join('\n'),
        ].join('\n\n');
      }),
    ].join('\n\n'),
  );
  return {
    title: 'Harms atlas',
    path: '/resources/harms',
    description:
      'The harms AI systems cause, each with its failure mode, the control that catches it, the evidence it leaves and real incidents.',
    updated: updatedOf('src/data/harms.ts'),
    body: [
      ...groups,
      '## Sources',
      harmSources.map((s, i) => sourceLine(i + 1, s)).join('\n'),
      mitAttribution,
    ].join('\n\n'),
  };
}

// ---- The full-text files -----------------------------------------------------

/** One document inside a full-text file: a rule, `# title`, its URL, the body. */
export function fullTextBlock(doc: CorpusDoc): string {
  return ['---', '', `# ${doc.title}`, '', `Source: ${abs(doc.path)}`, '', doc.body].join('\n');
}

export type SliceId =
  | 'bok'
  | 'foundations'
  | 'lifecycle'
  | 'law'
  | 'regulatory'
  | 'patterns'
  | 'glossary'
  | 'cases';

export interface LlmsSlice {
  id: SliceId;
  /** Published path, /llms-full-<id>.txt. */
  path: string;
  /** Link name in /llms.txt. */
  title: string;
  /** What the slice carries, one sentence. */
  summary: string;
  docs(): Promise<CorpusDoc[]>;
}

const PATTERNS_CHAPTER_PATH = chapterPath(
  chaptersOrdered.find((c) => c.id === PATTERNS_CHAPTER_ID) ?? { slug: 'patterns' },
);

/** The chapter documents whose chapter passes `keep`, in reading order. */
async function chaptersWhere(keep: (chapter: Chapter) => boolean): Promise<CorpusDoc[]> {
  const paths = new Set(chaptersOrdered.filter(keep).map(chapterPath));
  return (await chapterDocs()).filter((doc) => paths.has(doc.path));
}

// The slices follow the parts of the book, with chapter 08 (the regulatory map)
// beside the register it tabulates, so each stays well under the ~200k-token
// window of common models. Chapter 09 is in no slice: the glossary slice
// carries every one of its terms, term by term.
/** The slices of /llms-full.txt, each small enough for a common context window. */
export const llmsSlices: readonly LlmsSlice[] = [
  {
    id: 'bok',
    path: '/llms-full-bok.txt',
    title: 'Full text: the discipline and the Thesis',
    summary:
      'The chapters of part one, The discipline (00 to 07: definition, why now, values, the stack, the pattern catalogue, the role, the maturity model), chapter 10, the reading list, and the Thesis.',
    docs: async () => [
      ...(await chaptersWhere((c) => c.part === 'discipline' || c.slug === 'reading-list')),
      await thesisDoc(),
    ],
  },
  {
    id: 'foundations',
    path: '/llms-full-foundations.txt',
    title: 'Full text: foundations',
    summary:
      'The Foundations chapters (11 to 13): what counts as AI, the governance programme and risk management.',
    docs: () => chaptersWhere((c) => c.part === 'foundations'),
  },
  {
    id: 'lifecycle',
    path: '/llms-full-lifecycle.txt',
    title: 'Full text: the lifecycle',
    summary:
      'The lifecycle chapters (14 to 17 and 23): governing development and deployment, fairness and explainability, incidents and governing agents.',
    docs: () => chaptersWhere((c) => c.part === 'lifecycle'),
  },
  {
    id: 'law',
    path: '/llms-full-law.txt',
    title: 'Full text: law and standards',
    summary:
      'The Law and standards chapters (18 to 22): the EU AI Act, privacy and data protection, existing law, AI laws worldwide, principles and standards.',
    docs: () => chaptersWhere((c) => c.part === 'law'),
  },
  {
    id: 'regulatory',
    path: '/llms-full-regulatory.txt',
    title: 'Full text: regulatory map, obligations and crosswalk',
    summary:
      'Chapter 08, the regulatory map, then the obligation register row by row, the frameworks and the topic × framework crosswalk.',
    docs: async () => [
      ...(await chaptersWhere((c) => c.slug === 'regulatory-map')),
      obligationsDoc(),
      frameworksDoc(),
      crosswalkDoc(),
    ],
  },
  {
    id: 'patterns',
    path: '/llms-full-patterns.txt',
    title: 'Full text: patterns',
    summary: 'Chapter 05, the pattern catalogue, followed by every pattern page in catalogue order.',
    docs: async () => [
      ...(await chapterDocs()).filter((doc) => doc.path === PATTERNS_CHAPTER_PATH),
      ...(await patternDocs()),
    ],
  },
  {
    id: 'glossary',
    path: '/llms-full-glossary.txt',
    title: 'Full text: glossary',
    summary: `Every glossary term (${getGlossary().length}) with its definition, sources, chapters and the terms it is contrasted with.`,
    docs: async () => glossaryDocs(),
  },
  {
    id: 'cases',
    path: '/llms-full-cases.txt',
    title: 'Full text: incident cases and harms',
    summary: `The ${cases.length} incident cases written as engineering post-mortems, then the harms atlas.`,
    docs: async () => [...caseDocs(), harmsDoc()],
  },
];

/** Every document of the complete corpus, in the order of /llms-full.txt. */
async function fullDocs(): Promise<CorpusDoc[]> {
  const patterns = await patternDocs();
  const chapters = (await chapterDocs()).flatMap((doc) => [
    doc,
    ...(doc.path === PATTERNS_CHAPTER_PATH ? patterns : []),
  ]);
  return [
    ...chapters,
    await thesisDoc(),
    obligationsDoc(),
    frameworksDoc(),
    crosswalkDoc(),
    ...caseDocs(),
    harmsDoc(),
  ];
}

const textCache = new Map<string, string>();

/** The text of /llms-full.txt (id 'full') or of one slice, built once per build. */
export async function llmsFullText(id: SliceId | 'full'): Promise<string> {
  const cached = textCache.get(id);
  if (cached !== undefined) return cached;
  const index = abs('/llms.txt');
  let text: string;
  if (id === 'full') {
    const docs = await fullDocs();
    const chapters = chaptersOrdered.length;
    const patterns = (await patternDocs()).length;
    text = document([
      header(
        `This file carries the complete text of the ${chapters} Body of Knowledge chapters, in reading order, with the ${patterns} pattern pages after chapter 05, then the Thesis, the obligation register, the frameworks, the crosswalk, the ${cases.length} incident cases and the harms atlas. It is large; the same corpus is split into smaller files listed in ${index}.`,
      ),
      ...docs.map(fullTextBlock),
    ]);
  } else {
    const slice = llmsSlices.find((s) => s.id === id);
    if (!slice) throw new Error(`unknown llms-full slice "${id}"`);
    const docs = await slice.docs();
    text = document([
      header(
        `This file is one slice of the corpus: ${slice.summary} The index is at ${index}; the complete corpus in one file is at ${abs('/llms-full.txt')}.`,
      ),
      ...docs.map(fullTextBlock),
    ]);
  }
  textCache.set(id, text);
  return text;
}
