// api.ts: the static open-data API under /api/v1/. One registry (`datasets`)
// drives everything the API publishes: each dataset's JSON endpoint
// (src/pages/api/v1/[dataset].json.ts), its JSON Schema
// (src/pages/api/v1/schemas/[name].json.ts), the catalogue (index.json), the
// OpenAPI 3.1 description (openapi.json) and the table on /resources/data.
//
// Every payload carries the same envelope as the /resources/*.json downloads:
// the notice (so "not a claim of conformity" cannot be stripped in transit),
// the BoK version, the licence and its deed, the DOIs and the source page, plus
// `schemaVersion` and the URL of the schema the payload validates against.
//
// Records are mapped field by field (never passed through), so a field added to
// a data module does not leak into the API until it is added here and to the
// schema; tests/api.spec.ts validates every payload against its schema.
//
// Versioning: /api/v1/ is stable. Within v1, fields may be added (the schema
// gains them and schemaVersion stays); a field is never removed, renamed or
// retyped without a new schemaVersion, announced in bok/CHANGELOG.md. Ids
// (obligation ids, pattern ids, term ids, case ids) are never reused.
import { site } from '../data/site';
import {
  frameworks,
  obligations,
  disclaimer,
  appliesStatusLabels,
  systemClassLabels,
  type AppliesStatus,
  type Obligation,
  type SystemClass,
  obligationPath,
} from '../data/frameworks';
import { patterns } from '../data/patterns';
import { topics, columns, refs, chipLabel } from '../data/crosswalk';
import { levels } from '../data/maturity';
import { stages, nodes, entries } from '../data/path';
import { chapters, chapterParts, chaptersOrdered } from '../data/chapters';
import { jurisdictions, statusLabels as jurisdictionStatusLabels } from '../data/jurisdictions';
import {
  harms,
  harmSources,
  mitAttribution,
  mitDomainOf,
  mitSubdomains,
} from '../data/harms';
import { cases, casesForHarm } from '../data/cases';
import { clauses, licenceTypes, references as contractReferences } from '../data/contracts';
import { regimes, roles, rolesChapterPath } from '../data/roles';
import { layers } from '../data/stack';
// Block w2-threats (v0.5.0): the threat bridge dataset.
import {
  threats,
  taxonomies as threatTaxonomies,
  threatSources,
  threatAnchor,
  relatedOf as threatRelatedOf,
  sourcesOf as threatSourcesOf,
  iso42001Controls,
  aicmDomains,
  ssdfTasks,
  cosaisUseCases,
  atlasMitigationNames,
  THREATS_AS_OF,
} from '../data/threats';
import { getPatternBySlug, patternPath } from '../data/patterns';
import { obligationById } from '../data/frameworks';
import { getGlossary, termId } from './glossary';
import { sourceText } from './sources';
import { obligationByText, obligationApiPath } from './obligations';

// ---------------------------------------------------------------------------
// URLs

export const API_PATH = '/api/v1';
export const API_BASE = `${site.url}${API_PATH}`;
export const SCHEMA_BASE = `${API_BASE}/schemas`;
export const JSON_SCHEMA_DIALECT = 'https://json-schema.org/draft/2020-12/schema';

const abs = (path: string): string => new URL(path, site.url).href;

// ---------------------------------------------------------------------------
// JSON Schema builders (the subset tests/api.spec.ts validates: type,
// required, properties, additionalProperties, items, enum, const, pattern,
// format, minimum, maximum).

export type JsonSchema = Record<string, unknown>;

const s = {
  str: (description: string): JsonSchema => ({ type: 'string', description }),
  strOrNull: (description: string): JsonSchema => ({ type: ['string', 'null'], description }),
  int: (description: string, minimum?: number, maximum?: number): JsonSchema => ({
    type: 'integer',
    description,
    ...(minimum !== undefined ? { minimum } : {}),
    ...(maximum !== undefined ? { maximum } : {}),
  }),
  intOrNull: (description: string, minimum?: number, maximum?: number): JsonSchema => ({
    type: ['integer', 'null'],
    description,
    ...(minimum !== undefined ? { minimum } : {}),
    ...(maximum !== undefined ? { maximum } : {}),
  }),
  bool: (description: string): JsonSchema => ({ type: 'boolean', description }),
  date: (description: string): JsonSchema => ({ type: 'string', format: 'date', description }),
  dateOrNull: (description: string): JsonSchema => ({
    type: ['string', 'null'],
    format: 'date',
    description,
  }),
  uri: (description: string): JsonSchema => ({ type: 'string', format: 'uri', description }),
  uriOrNull: (description: string): JsonSchema => ({
    type: ['string', 'null'],
    format: 'uri',
    description,
  }),
  enumOf: (values: readonly string[], description: string): JsonSchema => ({
    type: 'string',
    enum: [...values],
    description,
  }),
  arr: (items: JsonSchema, description: string): JsonSchema => ({
    type: 'array',
    items,
    description,
  }),
  /** A closed object: every property is required (absent values are null). */
  obj: (properties: Record<string, JsonSchema>, description?: string): JsonSchema => ({
    type: 'object',
    ...(description ? { description } : {}),
    additionalProperties: false,
    required: Object.keys(properties),
    properties,
  }),
};

const layer = s.int('Stack layer, 1 Govern-as-Code … 5 Assurance & Continuous Compliance.', 1, 5);
const layerList = s.arr(layer, 'Stack layers (1-5).');

// ---------------------------------------------------------------------------
// The envelope every payload shares.

const CITATION_TITLE = 'AI Governance Engineering: The Thesis & Body of Knowledge';

export const NOTICE = `Illustrative mapping from the AI Governance Engineer Body of Knowledge v${site.bokVersion} (not a claim of conformity)`;

function citation() {
  return {
    title: CITATION_TITLE,
    authors: [...site.authors],
    parentDoi: `https://doi.org/${site.doi}`,
    conceptDoi: `https://doi.org/${site.conceptDoi}`,
  };
}

const citationSchema = s.obj(
  {
    title: s.str('Title of the parent work.'),
    authors: s.arr(s.str('Author name.'), 'Authors of the parent work.'),
    parentDoi: s.uri('DOI of the archived release this version belongs to.'),
    conceptDoi: s.uri('Concept DOI: always resolves to the latest archived release.'),
  },
  'How to cite: the dataset is part of the archived Body of Knowledge, not a separate deposit.',
);

const envelopeSchema: Record<string, JsonSchema> = {
  notice: s.str('The disclaimer that travels with the data: an illustrative mapping, not a claim of conformity.'),
  version: s.str('Body of Knowledge version the data was built from.'),
  license: { const: site.license, type: 'string', description: 'Licence label.' },
  licenseUrl: s.uri('Licence deed.'),
  schemaVersion: s.int('Version of this payload shape; bumped only on a breaking change.', 1),
  schema: s.uri('JSON Schema this payload validates against.'),
  self: s.uri('Canonical URL of this payload.'),
  source: s.uri('The human page that renders or documents the data.'),
  citation: citationSchema,
};

// ---------------------------------------------------------------------------
// Obligations (schema version 2): shared with /resources/obligations.json.

const APPLIES_STATUSES = Object.keys(appliesStatusLabels) as AppliesStatus[];
const SYSTEM_CLASSES = Object.keys(systemClassLabels) as SystemClass[];

/** One register row as the API and the /resources download publish it. */
export function obligationRecord(row: Obligation) {
  const patternRefs = patterns.filter((p) => (row.patterns ?? []).includes(p.id));
  return {
    id: row.id,
    url: abs(obligationPath(row)),
    json: abs(obligationApiPath(row)),
    framework: row.framework,
    frameworkId: row.frameworkId,
    clause: row.clause,
    obligation: row.obligation,
    requirement: row.requirement,
    artefact: row.artefact,
    layers: [...row.layerN],
    dutyHolder: row.dutyHolder ?? null,
    scope: row.scope ?? null,
    authority: row.authority ?? null,
    appliesFrom: row.appliesFrom ?? null,
    appliesStatus: row.appliesStatus,
    appliesNote: row.appliesNote ?? null,
    milestones: (row.milestones ?? []).map((m) => ({
      date: m.date,
      systemClass: [...(m.systemClass ?? [])],
      note: m.note,
    })),
    systemClass: [...(row.systemClass ?? [])],
    patterns: patternRefs.map((p) => ({
      id: p.id,
      title: p.title,
      url: abs(`/bok/patterns#${p.id}`),
    })),
    crosswalkTopics: [
      ...new Set(refs.filter((r) => r.obligation === row.obligation).map((r) => r.topic)),
    ],
    reviewed: row.reviewed,
    chapter: abs(`/bok/regulatory-map#${row.anchor}`),
  };
}

export const obligationSchema = s.obj(
  {
    id: {
      type: 'string',
      pattern: '^AIGE-OBL-[A-Z0-9]+(-[A-Z0-9]+)+$',
      description: 'Stable id, AIGE-OBL-<INSTRUMENT>-<CLAUSE>. Never changed, never reused.',
    },
    url: s.uri('The obligation page.'),
    json: s.uri('This record on its own, in the API.'),
    framework: s.str('Framework heading the row sits under in chapter 08.'),
    frameworkId: s.str('Id of the instrument in frameworks.json.'),
    clause: s.str('Article, clause, function or instrument the row names.'),
    obligation: s.str('The obligation, named.'),
    requirement: s.str('What it asks for, as chapter 08 states it.'),
    artefact: s.str('The engineering artefact that produces the evidence.'),
    layers: layerList,
    dutyHolder: s.strOrNull('Who the obligation binds (EU AI Act rows).'),
    scope: s.strOrNull('Who is in scope (US state laws).'),
    authority: s.strOrNull('Who supervises it (EU AI Act rows).'),
    appliesFrom: s.dateOrNull('ISO date the row first applies; null for voluntary instruments without one.'),
    appliesStatus: s.enumOf(APPLIES_STATUSES, 'Where the row stands on its reviewed date.'),
    appliesNote: s.strOrNull("Chapter 08's human wording of when it applies (the schema-1 appliesFrom text)."),
    milestones: s.arr(
      s.obj({
        date: s.date('Date of the step.'),
        systemClass: s.arr(s.enumOf(SYSTEM_CLASSES, 'EU AI Act system class.'), 'Classes the step concerns; empty when it concerns all.'),
        note: s.str('What happens on that date.'),
      }),
      'Later dated steps, in date order.',
    ),
    systemClass: s.arr(s.enumOf(SYSTEM_CLASSES, 'EU AI Act system class.'), 'EU AI Act system classes (empty for other instruments).'),
    patterns: s.arr(
      s.obj({
        id: s.str('Pattern id (the anchor on /bok/patterns).'),
        title: s.str('Pattern name.'),
        url: s.uri('Pattern section.'),
      }),
      'Chapter-05 patterns whose "Maps to" line names this clause.',
    ),
    crosswalkTopics: s.arr(s.str('Topic id in crosswalk.json.'), 'Crosswalk topics the row is filed under.'),
    reviewed: s.date('Date the row was last checked against its sources.'),
    chapter: s.uri('Section of chapter 08 the row comes from.'),
  },
  'One obligation → artefact → layer row.',
);

// ---------------------------------------------------------------------------
// The dataset registry.

export interface Dataset {
  /** File name under /api/v1/ without `.json`; also the schema name. */
  name: string;
  title: string;
  description: string;
  schemaVersion: number;
  /** The human page that renders or documents the data. */
  page: string;
  /** Extra envelope fields some datasets must carry (e.g. an attribution). */
  extra?: () => Record<string, unknown>;
  extraSchema?: Record<string, JsonSchema>;
  /** The data keys of the payload. */
  build: () => Record<string, unknown>;
  /** JSON Schema of each data key. */
  properties: Record<string, JsonSchema>;
}

const chapterUrl = (slug: string) => abs(`/bok/${slug}`);

/** Glossary chapter refs ("04") resolved to chapter pages. */
function chapterRef(number: string) {
  const chapter = chapters.find((c) => c.id.startsWith(`${number}-`));
  return { number, url: chapter ? chapterUrl(chapter.slug) : null };
}

export const datasets: readonly Dataset[] = [
  {
    name: 'obligations',
    title: 'Obligation register',
    description:
      'Every obligation → artefact → stack-layer row of the regulatory map, with stable ids, ISO application dates, status, system classes, patterns and review dates.',
    schemaVersion: 2,
    page: '/obligations',
    build: () => ({ obligations: obligations.map(obligationRecord) }),
    properties: { obligations: s.arr(obligationSchema, 'The register rows.') },
  },
  {
    name: 'frameworks',
    title: 'Frameworks',
    description:
      'The laws, standards, codes and control sets the regulatory map covers, with the ids of their obligation rows.',
    schemaVersion: 1,
    page: '/resources/frameworks',
    build: () => ({
      frameworks: frameworks.map((fw) => ({
        id: fw.id,
        name: fw.name,
        short: fw.short,
        type: fw.type,
        issuer: fw.issuer,
        url: fw.url ?? null,
        summary: fw.summary,
        page: abs(`/resources/frameworks#fw-${fw.id}`),
        obligations: obligations.filter((o) => o.frameworkId === fw.id).map((o) => o.id),
      })),
    }),
    properties: {
      frameworks: s.arr(
        s.obj({
          id: s.str('Instrument id.'),
          name: s.str('Instrument name.'),
          short: s.str('Short label.'),
          type: s.enumOf(['law', 'standard', 'framework', 'code', 'controls'], 'Kind of instrument.'),
          issuer: s.str('Issuing body.'),
          url: s.uriOrNull('Canonical source.'),
          summary: s.str('One-to-two-sentence summary.'),
          page: s.uri('Row on the frameworks page.'),
          obligations: s.arr(s.str('Obligation id.'), 'Ids of the register rows for this instrument.'),
        }),
        'The instruments.',
      ),
    },
  },
  {
    name: 'crosswalk',
    title: 'Topic crosswalk',
    description:
      'Twelve governance topics against the clauses of the EU AI Act, ISO/IEC 42001, the NIST AI RMF and the Chinese instruments, joined to the obligation register.',
    schemaVersion: 1,
    page: '/resources/crosswalk',
    build: () => ({
      topics: topics.map((t) => ({
        id: t.id,
        name: t.name,
        summary: t.summary,
        layers: [...(t.layerN ?? [])],
      })),
      columns: columns.map((c) => ({ id: c.id, label: c.label, frameworks: [...c.frameworks] })),
      references: refs.map((r) => ({
        topic: r.topic,
        framework: r.framework,
        reference: r.ref,
        label: chipLabel(r),
        title: r.title,
        strength: r.strength,
        verified: r.verified !== false,
        note: r.note ?? null,
        url: r.url ?? null,
        obligationId: r.obligation ? (obligationByText(r.obligation)?.id ?? null) : null,
      })),
    }),
    properties: {
      topics: s.arr(
        s.obj({
          id: s.str('Topic id.'),
          name: s.str('Topic name.'),
          summary: s.str('What the topic covers.'),
          layers: layerList,
        }),
        'The topics.',
      ),
      columns: s.arr(
        s.obj({
          id: s.str('Column id.'),
          label: s.str('Column label.'),
          frameworks: s.arr(s.str('Framework id.'), 'Instruments sharing the column.'),
        }),
        'The framework columns.',
      ),
      references: s.arr(
        s.obj({
          topic: s.str('Topic id.'),
          framework: s.str('Framework id.'),
          reference: s.str('Clause id within its instrument.'),
          label: s.str('Display label.'),
          title: s.str("The clause's own short title."),
          strength: s.enumOf(['core', 'related'], 'core: primarily about the topic; related: touches it.'),
          verified: s.bool('False when the clause could not be checked against the source.'),
          note: s.strOrNull('Why the clause belongs to the topic, or a caveat.'),
          url: s.uriOrNull('Canonical source of the clause.'),
          obligationId: s.strOrNull('Obligation id of the register row the clause joins, if any.'),
        }),
        'Topic × clause references.',
      ),
    },
  },
  {
    name: 'glossary',
    title: 'Glossary',
    description: 'The canonical terms of the discipline, parsed from chapter 09, with their chapter references.',
    schemaVersion: 1,
    page: '/resources/glossary',
    build: () => ({
      terms: getGlossary().map((entry) => ({
        id: termId(entry.term),
        term: entry.term,
        definition: entry.definition,
        letter: entry.letter,
        url: abs(`/resources/glossary#${termId(entry.term)}`),
        chapters: entry.chapterRefs.map(chapterRef),
      })),
    }),
    properties: {
      terms: s.arr(
        s.obj({
          id: s.str('Term id (the anchor on the glossary page).'),
          term: s.str('The term.'),
          definition: s.str('Definition, faithful to chapter 09.'),
          letter: s.str('A–Z group.'),
          url: s.uri('The term on the glossary page.'),
          chapters: s.arr(
            s.obj({
              number: s.str('Zero-padded chapter number.'),
              url: s.uriOrNull('Chapter page.'),
            }),
            'Chapters the term is cross-referenced to.',
          ),
        }),
        'The terms, alphabetical.',
      ),
    },
  },
  {
    name: 'patterns',
    title: 'Pattern catalogue index',
    description:
      'The reusable patterns of chapter 05, with their home layer, the frameworks their "Maps to" line names and the obligation rows that list them.',
    schemaVersion: 1,
    page: '/bok/patterns',
    build: () => ({
      patterns: patterns.map((p) => ({
        id: p.id,
        title: p.title,
        layer: p.layer,
        secondaryLayer: p.secondaryLayer ?? null,
        mapsTo: [...p.mapsTo],
        url: abs(`/bok/patterns#${p.id}`),
        obligations: obligations.filter((o) => (o.patterns ?? []).includes(p.id)).map((o) => o.id),
      })),
    }),
    properties: {
      patterns: s.arr(
        s.obj({
          id: s.str('Pattern id (the anchor on /bok/patterns).'),
          title: s.str('Pattern name.'),
          layer: layer,
          secondaryLayer: s.intOrNull('Second layer for dual-layer patterns.', 1, 5),
          mapsTo: s.arr(s.str('Framework reference.'), 'What the "Maps to" line names.'),
          url: s.uri('Pattern section.'),
          obligations: s.arr(s.str('Obligation id.'), 'Register rows that list the pattern.'),
        }),
        'The patterns, in catalogue order.',
      ),
    },
  },
  {
    name: 'maturity',
    title: 'Maturity model',
    description: 'The five-level maturity model of chapter 07, Documented → Continuous, with its typical evidence.',
    schemaVersion: 1,
    page: '/bok/maturity-model',
    build: () => ({
      levels: levels.map((level) => ({
        n: level.n,
        name: level.name,
        summary: level.summary,
        signals: [...level.signals],
        url: abs(`/bok/maturity-model#${level.anchor}`),
      })),
    }),
    properties: {
      levels: s.arr(
        s.obj({
          n: s.int('Level number.', 1, 5),
          name: s.str('Level name.'),
          summary: s.str('State of the level.'),
          signals: s.arr(s.str('Typical evidence.'), 'Typical evidence at this level.'),
          url: s.uri('Section of chapter 07.'),
        }),
        'The five levels.',
      ),
    },
  },
  {
    name: 'path',
    title: 'Learning path',
    description: 'The four-stage learning path: nodes, prerequisites, internal links and external resources.',
    schemaVersion: 1,
    page: '/path',
    build: () => ({
      stages: stages.map((st) => ({
        id: st.id,
        n: st.n,
        title: st.title,
        tagline: st.tagline,
        summary: st.summary,
      })),
      nodes: nodes.map((node) => ({
        id: node.id,
        title: node.title,
        stage: node.stage,
        kind: node.kind,
        layer: node.layerN ?? null,
        summary: node.summary,
        links: node.links.map((link) => ({ label: link.label, url: abs(link.href) })),
        resources: node.resources.map((r) => ({
          title: r.title,
          url: r.url,
          type: r.type,
          cost: r.cost,
          note: r.note ?? null,
        })),
        prereqs: [...(node.prereqs ?? [])],
      })),
      entries: entries.map((entry) => ({
        id: entry.id,
        title: entry.title,
        startAt: [...entry.startAt],
      })),
    }),
    properties: {
      stages: s.arr(
        s.obj({
          id: s.str('Stage id.'),
          n: s.int('Stage number.', 1, 4),
          title: s.str('Stage title.'),
          tagline: s.str('Short tagline.'),
          summary: s.str('What the stage covers.'),
        }),
        'The four stages.',
      ),
      nodes: s.arr(
        s.obj({
          id: s.str('Node id.'),
          title: s.str('Node title.'),
          stage: s.str('Stage id.'),
          kind: s.enumOf(['core', 'alternative', 'optional'], 'Track.'),
          layer: s.intOrNull('Stack layer the node colours with; null when cross-cutting.', 1, 5),
          summary: s.str('What the node teaches.'),
          links: s.arr(
            s.obj({ label: s.str('Link label.'), url: s.uri('Internal page.') }),
            'Links into the Body of Knowledge.',
          ),
          resources: s.arr(
            s.obj({
              title: s.str('Resource title.'),
              url: s.uri('Resource URL.'),
              type: s.enumOf(['article', 'video', 'course', 'official', 'tool', 'template'], 'Medium.'),
              cost: s.enumOf(['free', 'paid'], 'Cost.'),
              note: s.strOrNull('Why it matters.'),
            }),
            'External resources.',
          ),
          prereqs: s.arr(s.str('Node id.'), 'Prerequisite nodes.'),
        }),
        'The nodes.',
      ),
      entries: s.arr(
        s.obj({
          id: s.str('Entry id.'),
          title: s.str('The discipline someone converts from.'),
          startAt: s.arr(s.str('Node id.'), 'Nodes to start at.'),
        }),
        'Ways in.',
      ),
    },
  },
  {
    name: 'chapters',
    title: 'Body of Knowledge chapters',
    description: 'The chapters of the Body of Knowledge in reading order, with their part, summary and takeaways.',
    schemaVersion: 1,
    page: '/bok',
    build: () => ({
      parts: chapterParts.map((part) => ({ id: part.id, title: part.title })),
      chapters: chaptersOrdered.map((c) => ({
        id: c.id,
        order: c.order,
        part: c.part,
        slug: c.slug,
        title: c.title,
        shortTitle: c.shortTitle,
        summary: c.summary,
        glance: [...(c.glance ?? [])],
        url: chapterUrl(c.slug),
      })),
    }),
    properties: {
      parts: s.arr(
        s.obj({ id: s.str('Part id.'), title: s.str('Part title.') }),
        'The parts of the book, in reading order.',
      ),
      chapters: s.arr(
        s.obj({
          id: s.str('Chapter id (file name without extension).'),
          order: s.int('Reading order.', 0),
          part: s.str('Part id.'),
          slug: s.str('URL slug under /bok/.'),
          title: s.str('Full title.'),
          shortTitle: s.str('Short label.'),
          summary: s.str('One-line summary.'),
          glance: s.arr(s.str('Takeaway.'), 'At-a-glance takeaways (empty where the chapter has none).'),
          url: s.uri('Chapter page.'),
        }),
        'The chapters.',
      ),
    },
  },
  {
    name: 'jurisdictions',
    title: 'AI laws by jurisdiction',
    description:
      'The AI-specific legal landscape by jurisdiction: how binding each regime is and the instruments behind it, each dated.',
    schemaVersion: 1,
    page: '/bok/ai-laws-worldwide',
    build: () => ({
      jurisdictions: jurisdictions.map((j) => ({
        code: j.code,
        name: j.name,
        status: j.status,
        statusLabel: jurisdictionStatusLabels[j.status],
        summary: j.summary,
        asOf: j.asOf,
        url: abs(j.anchor),
        instruments: j.instruments.map((i) => ({
          name: i.name,
          date: i.date,
          status: i.status,
          url: i.url,
          verified: i.verified,
          note: i.note ?? null,
        })),
      })),
    }),
    properties: {
      jurisdictions: s.arr(
        s.obj({
          code: s.str('ISO 3166 code, US-NYC or EU.'),
          name: s.str('Display name.'),
          status: s.enumOf(['binding-horizontal', 'binding-targeted', 'voluntary', 'bill'], 'How binding the regime is.'),
          statusLabel: s.str('Human label of the status.'),
          summary: s.str('One or two sentences.'),
          asOf: s.date('Date the entry was checked.'),
          url: s.uri('Chapter section.'),
          instruments: s.arr(
            s.obj({
              name: s.str('Instrument name.'),
              date: {
                type: 'string',
                pattern: '^\\d{4}-\\d{2}(-\\d{2})?$',
                description: 'Key date, YYYY-MM-DD or YYYY-MM.',
              },
              status: s.enumOf(['in-force', 'adopted', 'bill', 'voluntary', 'draft', 'lapsed'], 'Status on asOf.'),
              url: s.uri('Official or best available source.'),
              verified: s.enumOf(['primary', 'secondary', 'reported'], 'Verification tag.'),
              note: s.strOrNull('Caveat on the date or status.'),
            }),
            'Instruments behind the status.',
          ),
        }),
        'The jurisdictions.',
      ),
    },
  },
  {
    name: 'harms',
    title: 'AI harms atlas',
    description:
      'Harms by level with the failure mode, the controlling pattern, the evidence it leaves, the stack layers, the MIT AI Risk Repository taxonomy codes and real incidents.',
    schemaVersion: 1,
    page: '/resources/harms',
    extra: () => ({ attribution: mitAttribution }),
    extraSchema: { attribution: s.str('Attribution the MIT AI Risk Repository taxonomy (CC BY 4.0) requires.') },
    build: () => ({
      harms: harms.map((harm) => ({
        id: harm.id,
        url: abs(`/resources/harms#harm-${harm.id}`),
        level: harm.level,
        harmType: harm.harmType,
        mechanism: [...harm.mechanism],
        description: harm.description,
        failureMode: harm.failureMode,
        controllingPattern: {
          name: harm.controllingPattern.name,
          patternId: harm.controllingPattern.patternId ?? null,
        },
        evidence: harm.evidence,
        layers: [...harm.layerN],
        mitTaxonomy: harm.mitTaxonomy.map((code) => ({
          code,
          subdomain: mitSubdomains[code],
          domain: mitDomainOf(code),
        })),
        exampleIncidents: harm.exampleIncidents.map((i) => ({
          db: i.db,
          id: i.id,
          title: i.title,
          url: i.url,
        })),
        cases: casesForHarm(harm.id).map((c) => c.id),
        sources: [...harm.sources],
      })),
      sources: harmSources.map((source, i) => ({
        n: i + 1,
        text: sourceText(source),
        url: source.url,
        verified: source.verified,
      })),
    }),
    properties: {
      harms: s.arr(
        s.obj({
          id: s.str('Harm id (anchor harm-<id> on the atlas).'),
          url: s.uri('Row on the atlas page.'),
          level: s.enumOf(['individual', 'group', 'organisation', 'society', 'environment'], 'Level harmed.'),
          harmType: s.str('Harm type.'),
          mechanism: s.arr(s.str('Mechanism id.'), 'Mechanisms that produce it.'),
          description: s.str('Description; [n] markers point into sources.'),
          failureMode: s.str('The testable failure mode.'),
          controllingPattern: s.obj({
            name: s.str('Pattern or control name.'),
            patternId: s.strOrNull('Pattern id in patterns.json, when catalogued.'),
          }),
          evidence: s.str('The artefact the control leaves behind.'),
          layers: layerList,
          mitTaxonomy: s.arr(
            s.obj({
              code: s.str('MIT subdomain code.'),
              subdomain: s.str('Subdomain name.'),
              domain: s.str('Domain name.'),
            }),
            'MIT AI Risk Repository taxonomy codes.',
          ),
          exampleIncidents: s.arr(
            s.obj({
              db: s.enumOf(['AIID', 'OECD-AIM', 'AIAAIC'], 'Incident database.'),
              id: s.str("The database's identifier."),
              title: s.str("The record's title as the database publishes it."),
              url: s.uri('Incident record.'),
            }),
            'Real incidents that show the harm.',
          ),
          cases: s.arr(s.str('Case id in cases.json.'), 'Cases that illustrate the harm.'),
          sources: s.arr(s.int('Source number.', 1), 'Numbers of the supporting sources.'),
        }),
        'The harms.',
      ),
      sources: s.arr(
        s.obj({
          n: s.int('Source number.', 1),
          text: s.str('Source in the house format.'),
          url: s.uri('Source URL.'),
          verified: s.enumOf(['primary', 'secondary', 'reported'], 'Verification tag.'),
        }),
        'Numbered sources.',
      ),
    },
  },
  {
    name: 'cases',
    title: 'Incident cases',
    description:
      'Publicly documented AI incidents written as engineering post-mortems, with the control that would have caught them, the evidence it would have left and the obligations they touch.',
    schemaVersion: 1,
    page: '/cases',
    build: () => ({
      cases: cases.map((c) => ({
        id: c.id,
        url: abs(`/cases/${c.id}`),
        title: c.title,
        short: c.short,
        year: c.year,
        jurisdiction: c.jurisdiction,
        sector: c.sector,
        evidence: c.evidence,
        summary: c.summary,
        happened: [...c.happened],
        failureMode: [...c.failureMode],
        control: [...c.control.text],
        controls: c.control.controls.map((ctl) => ({
          name: ctl.name,
          patternId: ctl.patternId ?? null,
        })),
        evidenceArtefacts: c.evidenceArtefacts.map((e) => ({
          artefact: e.artefact,
          layer: e.layerN,
        })),
        obligations: c.obligations.map((o) => ({
          instrument: o.instrument,
          ref: o.ref,
          why: o.why,
        })),
        harms: [...c.harms],
        incidents: c.incidents.map((i) => ({ db: i.db, id: i.id, title: i.title, url: i.url })),
        sources: c.sources.map((source, i) => ({
          n: i + 1,
          text: sourceText(source),
          url: source.url,
          verified: source.verified,
        })),
      })),
    }),
    properties: {
      cases: s.arr(
        s.obj({
          id: s.str('Case id (URL slug).'),
          url: s.uri('Case page.'),
          title: s.str('Title.'),
          short: s.str('Short label.'),
          year: s.str('Year or range.'),
          jurisdiction: s.str('Jurisdiction.'),
          sector: s.str('Sector.'),
          evidence: s.enumOf(['primary', 'secondary', 'reported'], 'Evidence base.'),
          summary: s.str('One plain sentence.'),
          happened: s.arr(s.str('Paragraph; [n] markers point into sources.'), 'What happened.'),
          failureMode: s.arr(s.str('Paragraph.'), 'The failure mode.'),
          control: s.arr(s.str('Paragraph.'), 'Which control would have caught it.'),
          controls: s.arr(
            s.obj({ name: s.str('Control name.'), patternId: s.strOrNull('Pattern id, when catalogued.') }),
            'The controls, named.',
          ),
          evidenceArtefacts: s.arr(
            s.obj({ artefact: s.str('What an auditor could have read.'), layer: layer }),
            'The evidence that would have existed.',
          ),
          obligations: s.arr(
            s.obj({
              instrument: s.str('Instrument.'),
              ref: s.str('Article, annex point or section.'),
              why: s.str('How the case touches it; [n] markers point into sources.'),
            }),
            'Obligations it touches, as of the case date stamp.',
          ),
          harms: s.arr(s.str('Harm id in harms.json.'), 'Harms it illustrates.'),
          incidents: s.arr(
            s.obj({
              db: s.enumOf(['AIID', 'OECD-AIM', 'AIAAIC'], 'Incident database.'),
              id: s.str("The database's identifier."),
              title: s.str("The record's title."),
              url: s.uri('Incident record.'),
            }),
            'Incident records.',
          ),
          sources: s.arr(
            s.obj({
              n: s.int('Source number.', 1),
              text: s.str('Source in the house format.'),
              url: s.uri('Source URL.'),
              verified: s.enumOf(['primary', 'secondary', 'reported'], 'Verification tag.'),
            }),
            'Numbered sources.',
          ),
        }),
        'The cases.',
      ),
    },
  },
  {
    name: 'contracts',
    title: 'Contract clauses and licence families',
    description:
      'The AI vendor-contract clauses to check (what each governs, the red flag, a fallback and the evidence to keep) and the model-licence families.',
    schemaVersion: 1,
    page: '/resources/contracts',
    build: () => ({
      clauses: clauses.map((c) => ({
        id: c.id,
        clause: c.clause,
        governs: c.governs,
        risk: c.risk,
        redFlag: c.redFlag,
        fallback: c.fallback,
        evidence: c.evidence,
        url: abs(`/resources/contracts#clause-${c.id}`),
        mapsTo: c.mapsTo.map((id) => ({
          id,
          label: contractReferences[id].label,
          url: contractReferences[id].url,
        })),
      })),
      licenceTypes: licenceTypes.map((l) => ({
        id: l.id,
        family: l.family,
        examples: l.examples,
        obligations: l.obligations,
        watch: l.watch,
        aibomFields: l.aibomFields,
      })),
    }),
    properties: {
      clauses: s.arr(
        s.obj({
          id: s.str('Clause id.'),
          clause: s.str('The clause, named.'),
          governs: s.str('What it governs.'),
          risk: s.str('The risk it addresses.'),
          redFlag: s.str('The red-flag pattern, paraphrased.'),
          fallback: s.str('A fallback position.'),
          evidence: s.str('The evidence the governance function keeps.'),
          url: s.uri('Row on the contracts page.'),
          mapsTo: s.arr(
            s.obj({ id: s.str('Reference id.'), label: s.str('Label.'), url: s.uri('Source.') }),
            'Instruments the clause maps to.',
          ),
        }),
        'The clauses.',
      ),
      licenceTypes: s.arr(
        s.obj({
          id: s.enumOf(
            ['permissive', 'copyleft', 'network-copyleft', 'responsible-ai', 'custom-community', 'non-commercial'],
            'Licence family id.',
          ),
          family: s.str('Family name.'),
          examples: s.str('Examples, named as categories.'),
          obligations: s.str('What the licence asks of a deployer.'),
          watch: s.str('What to watch for in AI use.'),
          aibomFields: s.str('Fields to capture in the AIBOM entry.'),
        }),
        'Model-licence families.',
      ),
    },
  },
  {
    name: 'roles',
    title: 'Value-chain roles',
    description:
      'Operator roles across regimes (EU AI Act, Colorado, Texas, Korea, ISO/IEC 22989), with duties, the nearest EU AI Act role and the events that make an actor a provider.',
    schemaVersion: 1,
    page: rolesChapterPath,
    build: () => ({
      regimes: regimes.map((r) => ({
        id: r.id,
        name: r.name,
        status: r.status,
        sourceUrl: r.sourceUrl,
      })),
      roles: roles.map((r) => ({
        id: r.id,
        regime: r.regime,
        role: r.role,
        definition: r.definition,
        sourceRef: r.sourceRef,
        duties: r.duties,
        nearestEuRole: r.nearestEuRole ?? null,
        becomesProviderWhen: [...(r.becomesProviderWhen ?? [])],
        url: abs(`${rolesChapterPath}#${r.anchor}`),
        verify: r.verify === true,
      })),
    }),
    properties: {
      regimes: s.arr(
        s.obj({
          id: s.str('Regime id.'),
          name: s.str('Display name.'),
          status: s.str('Legal status in one line, dated.'),
          sourceUrl: s.uri('Primary source for the role definitions.'),
        }),
        'The regimes.',
      ),
      roles: s.arr(
        s.obj({
          id: s.str('Role id.'),
          regime: s.str('Regime id.'),
          role: s.str('Role name.'),
          definition: s.str('What the role covers, in our words.'),
          sourceRef: s.str('Where the regime defines it.'),
          duties: s.str('Summary of the duties.'),
          nearestEuRole: s.strOrNull('Nearest EU AI Act role (illustrative).'),
          becomesProviderWhen: s.arr(s.str('Event.'), 'Events that make the actor a provider.'),
          url: s.uri('Chapter section.'),
          verify: s.bool('True while a detail is still marked "(verify)" in the chapter.'),
        }),
        'The roles.',
      ),
    },
  },
  // Block w2-threats (v0.5.0): the threat bridge. One record per external
  // threat id (OWASP LLM 2026, OWASP Agentic 2026, MITRE ATLAS, NIST AI 100-2),
  // with the patterns that control it, example evals, the obligations its
  // evidence helps satisfy and the control-framework ids beside it.
  {
    name: 'threats',
    title: 'Threat bridge',
    description:
      'External AI threat ids (OWASP LLM 2026, OWASP Agentic 2026, MITRE ATLAS, NIST AI 100-2) mapped to the controlling patterns, example evals, obligation ids, ISO/IEC 42001 Annex A, CSA AICM domains, NIST SP 800-218A tasks and COSAiS use cases.',
    schemaVersion: 1,
    page: '/resources/threats',
    build: () => ({
      asOf: THREATS_AS_OF,
      taxonomies: threatTaxonomies.map((t) => ({
        id: t.id,
        name: t.name,
        short: t.short,
        version: t.version,
        issuer: t.issuer,
        url: t.url,
        scope: t.scope,
      })),
      threats: threats.map((row) => ({
        id: row.id,
        taxonomy: row.taxonomy,
        externalId: row.externalId,
        name: row.name,
        formerly: row.formerly ?? null,
        url: row.url,
        page: abs(`/resources/threats#${threatAnchor(row)}`),
        summary: row.summary,
        control: row.control,
        patterns: row.patterns.map((slug) => {
          const p = getPatternBySlug(slug);
          return { slug, title: p?.title ?? slug, url: abs(p ? patternPath(p) : '/patterns') };
        }),
        evals: row.evals.map((e) => ({ tool: e.tool, check: e.check, note: e.note })),
        obligations: row.obligations.map((id) => {
          const o = obligationById(id);
          return { id, name: o?.obligation ?? id, url: abs(`/obligations/${id.toLowerCase()}`) };
        }),
        iso42001: row.iso42001.map((id) => ({ id, title: iso42001Controls[id] ?? id })),
        aicmDomains: row.aicm.map((id) => ({ id, title: aicmDomains[id] })),
        ssdfTasks: row.ssdf.map((id) => ({ id, title: ssdfTasks[id] ?? id })),
        cosaisUseCases: row.cosais.map((id) => ({ id, title: cosaisUseCases[id] })),
        atlasMitigations: row.atlasMitigations.map((id) => ({ id, name: atlasMitigationNames[id] ?? id })),
        related: threatRelatedOf(row).map((r) => r.id),
        layers: [...row.layers],
        sources: threatSourcesOf(row).map((n) => {
          const src = threatSources[n - 1];
          return { title: src.title, url: src.url, verified: src.verified };
        }),
      })),
    }),
    properties: {
      asOf: s.date('Date the catalogue versions and eval names were checked.'),
      taxonomies: s.arr(
        s.obj({
          id: s.enumOf(['owasp-llm', 'owasp-asi', 'mitre-atlas', 'nist-aml'], 'Catalogue id.'),
          name: s.str('Catalogue name.'),
          short: s.str('Short label.'),
          version: s.str('Version the rows are pinned to.'),
          issuer: s.str('Issuing body.'),
          url: s.uri('Catalogue home.'),
          scope: s.str('What the catalogue covers.'),
        }),
        'The external threat catalogues.',
      ),
      threats: s.arr(
        s.obj({
          id: s.str('Stable row id (lower case).'),
          taxonomy: s.enumOf(['owasp-llm', 'owasp-asi', 'mitre-atlas', 'nist-aml'], 'Catalogue id.'),
          externalId: s.str('The id as the catalogue prints it.'),
          name: s.str("The catalogue's name for the threat."),
          formerly: s.strOrNull('Id in the previous edition (OWASP LLM rows).'),
          url: s.uri('Public page or canonical source of the id.'),
          page: s.uri('Card on the threat bridge page.'),
          summary: s.str('What the threat is, in our words.'),
          control: s.str('The control that stops it.'),
          patterns: s.arr(
            s.obj({ slug: s.str('Pattern slug.'), title: s.str('Pattern title.'), url: s.uri('Pattern page.') }),
            'Patterns that implement the control.',
          ),
          evals: s.arr(
            s.obj({
              tool: s.enumOf(['Inspect', 'promptfoo', 'garak', 'custom'], 'Harness, or custom when none ships a named check.'),
              check: s.str('Named check (task, plugin or probe).'),
              note: s.str('What it does.'),
            }),
            'Example evals.',
          ),
          obligations: s.arr(
            s.obj({ id: s.str('Obligation id.'), name: s.str('Obligation.'), url: s.uri('Obligation page.') }),
            'Obligations the evidence helps satisfy.',
          ),
          iso42001: s.arr(s.obj({ id: s.str('Annex A id.'), title: s.str('Short title.') }), 'ISO/IEC 42001 Annex A controls.'),
          aicmDomains: s.arr(s.obj({ id: s.str('Domain id.'), title: s.str('Domain title.') }), 'CSA AICM v1.1 domains.'),
          ssdfTasks: s.arr(s.obj({ id: s.str('Task id.'), title: s.str('What it asks.') }), 'NIST SP 800-218A tasks.'),
          cosaisUseCases: s.arr(s.obj({ id: s.str('Use case id.'), title: s.str('Label.') }), 'NIST COSAiS proposed use cases.'),
          atlasMitigations: s.arr(s.obj({ id: s.str('ATLAS mitigation id.'), name: s.str('Name.') }), 'ATLAS mitigations (ATLAS rows).'),
          related: s.arr(s.str('Row id.'), 'Rows in other catalogues that describe the same threat.'),
          layers: layerList,
          sources: s.arr(
            s.obj({
              title: s.str('Source title.'),
              url: s.uri('Source URL.'),
              verified: s.enumOf(['primary', 'secondary', 'reported'], 'Verification tag.'),
            }),
            'Sources the row rests on.',
          ),
        }),
        'The rows.',
      ),
    },
  },
];

// ---------------------------------------------------------------------------
// Payloads and schemas.

export function datasetByName(name: string): Dataset | undefined {
  return datasets.find((d) => d.name === name);
}

export const datasetUrl = (d: Pick<Dataset, 'name'>) => `${API_BASE}/${d.name}.json`;
export const schemaUrl = (name: string) => `${SCHEMA_BASE}/${name}.json`;

/** The shared envelope for a dataset (or any API document). */
export function envelope(
  name: string,
  schemaVersion: number,
  self: string,
  sourcePage: string,
): Record<string, unknown> {
  return {
    notice: NOTICE,
    version: site.bokVersion,
    license: site.license,
    licenseUrl: site.licenseUrl,
    schemaVersion,
    schema: schemaUrl(name),
    self,
    source: abs(sourcePage),
    citation: citation(),
  };
}

/** The full payload of a dataset endpoint. */
export function datasetPayload(d: Dataset): Record<string, unknown> {
  return {
    ...envelope(d.name, d.schemaVersion, datasetUrl(d), d.page),
    ...(d.extra ? d.extra() : {}),
    ...d.build(),
  };
}

/** The JSON Schema of a dataset endpoint. */
export function datasetSchema(d: Dataset): JsonSchema {
  const properties = { ...envelopeSchema, ...(d.extraSchema ?? {}), ...d.properties };
  return {
    $schema: JSON_SCHEMA_DIALECT,
    $id: schemaUrl(d.name),
    title: `${d.title} (AI Governance Engineer open data, schema version ${d.schemaVersion})`,
    description: `${d.description} ${disclaimer}`,
    type: 'object',
    additionalProperties: false,
    required: Object.keys(properties),
    properties,
  };
}

/** Schema of a single obligation document (/api/v1/obligations/<id>.json). */
export function obligationDocumentSchema(): JsonSchema {
  const properties = { ...envelopeSchema, obligation: obligationSchema };
  return {
    $schema: JSON_SCHEMA_DIALECT,
    $id: schemaUrl('obligation'),
    title: 'One obligation (AI Governance Engineer open data, schema version 2)',
    description: `One row of the obligation register, with the shared envelope. ${disclaimer}`,
    type: 'object',
    additionalProperties: false,
    required: Object.keys(properties),
    properties,
  };
}

export function obligationDocument(row: Obligation): Record<string, unknown> {
  return {
    ...envelope('obligation', 2, abs(obligationApiPath(row)), obligationPath(row)),
    obligation: obligationRecord(row),
  };
}

/** Catalogue entry for one dataset. */
function catalogueEntry(d: Dataset) {
  return {
    name: d.name,
    title: d.title,
    description: d.description,
    schemaVersion: d.schemaVersion,
    url: datasetUrl(d),
    schema: schemaUrl(d.name),
    page: abs(d.page),
  };
}

export function indexPayload(): Record<string, unknown> {
  return {
    ...envelope('index', 1, `${API_BASE}/index.json`, '/resources/data'),
    api: {
      version: 'v1',
      openapi: `${API_BASE}/openapi.json`,
      documentation: abs('/resources/data'),
      itemTemplates: {
        obligation: `${API_BASE}/obligations/{id}.json`,
      },
    },
    datasets: datasets.map(catalogueEntry),
    schemas: [
      ...datasets.map((d) => ({ name: d.name, url: schemaUrl(d.name) })),
      { name: 'obligation', url: schemaUrl('obligation') },
      { name: 'index', url: schemaUrl('index') },
    ],
  };
}

export function indexSchema(): JsonSchema {
  const properties = {
    ...envelopeSchema,
    api: s.obj({
      version: s.str('API version.'),
      openapi: s.uri('OpenAPI 3.1 description.'),
      documentation: s.uri('Human documentation.'),
      itemTemplates: s.obj({
        obligation: s.str('URL template of a single obligation; {id} is the lower-case obligation id.'),
      }),
    }),
    datasets: s.arr(
      s.obj({
        name: s.str('Dataset name.'),
        title: s.str('Title.'),
        description: s.str('What it holds.'),
        schemaVersion: s.int('Payload shape version.', 1),
        url: s.uri('Endpoint.'),
        schema: s.uri('JSON Schema.'),
        page: s.uri('Human page.'),
      }),
      'The datasets.',
    ),
    schemas: s.arr(
      s.obj({ name: s.str('Schema name.'), url: s.uri('Schema URL.') }),
      'Every JSON Schema the API publishes.',
    ),
  };
  return {
    $schema: JSON_SCHEMA_DIALECT,
    $id: schemaUrl('index'),
    title: 'API catalogue (AI Governance Engineer open data)',
    description: 'The catalogue of the static open-data API: datasets, schemas and the OpenAPI description.',
    type: 'object',
    additionalProperties: false,
    required: Object.keys(properties),
    properties,
  };
}

/** Every schema the API publishes, by name. */
export function allSchemas(): Record<string, JsonSchema> {
  return {
    ...Object.fromEntries(datasets.map((d) => [d.name, datasetSchema(d)])),
    obligation: obligationDocumentSchema(),
    index: indexSchema(),
  };
}

/** OpenAPI 3.1 description of the static GETs. */
export function openApiDocument(): Record<string, unknown> {
  const okJson = (description: string, schema: string) => ({
    '200': {
      description,
      content: { 'application/json': { schema: { $ref: schemaUrl(schema) } } },
    },
  });
  const paths: Record<string, unknown> = {
    '/index.json': {
      get: {
        operationId: 'getIndex',
        summary: 'The API catalogue',
        responses: okJson('The datasets, schemas and this description.', 'index'),
      },
    },
    ...Object.fromEntries(
      datasets.map((d) => [
        `/${d.name}.json`,
        {
          get: {
            operationId: `get${d.name.charAt(0).toUpperCase()}${d.name.slice(1)}`,
            summary: d.title,
            description: d.description,
            responses: okJson(`${d.title} (schema version ${d.schemaVersion}).`, d.name),
          },
        },
      ]),
    ),
    '/obligations/{id}.json': {
      get: {
        operationId: 'getObligation',
        summary: 'One obligation',
        parameters: [
          {
            name: 'id',
            in: 'path',
            required: true,
            description: 'Obligation id in lower case, e.g. aige-obl-euaia-art9.',
            schema: { type: 'string', pattern: '^aige-obl-[a-z0-9]+(-[a-z0-9]+)+$' },
          },
        ],
        responses: {
          ...okJson('The obligation with the shared envelope.', 'obligation'),
          '404': { description: 'No obligation has that id.' },
        },
      },
    },
    '/schemas/{name}.json': {
      get: {
        operationId: 'getSchema',
        summary: 'A JSON Schema (draft 2020-12)',
        parameters: [
          {
            name: 'name',
            in: 'path',
            required: true,
            description: 'Schema name: a dataset name, obligation or index.',
            schema: { type: 'string', enum: Object.keys(allSchemas()) },
          },
        ],
        responses: {
          '200': {
            description: 'The schema.',
            content: { 'application/schema+json': { schema: { type: 'object' } } },
          },
        },
      },
    },
  };
  return {
    openapi: '3.1.0',
    jsonSchemaDialect: JSON_SCHEMA_DIALECT,
    info: {
      title: 'AI Governance Engineer open data API',
      version: '1.0.0',
      summary: 'Static, read-only JSON datasets from the AI Governance Engineer Body of Knowledge.',
      description: `Static files regenerated on every release of the site; no authentication, no rate limit beyond the host's, CORS open. ${NOTICE}.`,
      license: { name: site.license, url: site.licenseUrl },
      contact: { name: site.authors.join(', '), url: abs('/resources/data') },
    },
    externalDocs: { description: 'Documentation, stability promise and citation', url: abs('/resources/data') },
    servers: [{ url: API_BASE }],
    paths,
  };
}

/** A pretty-printed JSON response with the right content type. */
export function jsonResponse(payload: unknown, contentType = 'application/json; charset=utf-8'): Response {
  return new Response(`${JSON.stringify(payload, null, 2)}\n`, {
    headers: { 'content-type': contentType },
  });
}

/** Layer name for a layer number, for pages that document the data. */
export function layerName(n: number): string {
  return layers.find((l) => l.n === n)?.name ?? `Layer ${n}`;
}
