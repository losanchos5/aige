// types.ts: the shapes of the /api/v1 documents this server reads, as published
// by site/src/lib/api.ts (see /api/v1/schemas/*.json for the normative JSON
// Schemas). Only the fields the tools use are typed; everything else passes
// through untouched.

export interface Citation {
  title: string;
  authors: string[];
  parentDoi?: string;
  conceptDoi?: string;
}

/** The envelope every /api/v1 document carries. */
export interface Envelope {
  notice: string;
  version: string;
  license: string;
  licenseUrl: string;
  schemaVersion: number;
  schema: string;
  self: string;
  source: string;
  citation: Citation;
}

export interface DatasetEntry {
  name: string;
  title: string;
  description: string;
  schemaVersion: number;
  url: string;
  schema: string;
  page: string;
}

export interface IndexDoc extends Envelope {
  api: { version: string; openapi: string; documentation: string; itemTemplates?: Record<string, string> };
  datasets: DatasetEntry[];
  schemas: { name: string; url: string }[];
}

export interface GlossaryTerm {
  id: string;
  term: string;
  definition: string;
  letter: string;
  /** From v0.5.0 the term's own page; up to v0.4.0 its anchor in the glossary. */
  url: string;
  /** The term in the glossary chapter, /bok/glossary#<id> (v0.5.0 and later). */
  anchor?: string;
  chapters: { number: string; url: string | null }[];
}

export interface GlossaryDoc extends Envelope {
  terms: GlossaryTerm[];
}

export interface Milestone {
  date: string;
  systemClass: string[];
  note: string;
}

export interface PatternRef {
  id: string;
  title: string;
  url: string;
}

export interface Obligation {
  id: string;
  url: string;
  json: string;
  framework: string;
  frameworkId: string;
  clause: string;
  obligation: string;
  requirement: string;
  artefact: string;
  layers: number[];
  dutyHolder: string | null;
  scope: string | null;
  authority: string | null;
  appliesFrom: string | null;
  appliesStatus: string;
  appliesNote: string | null;
  milestones: Milestone[];
  systemClass: string[];
  patterns: PatternRef[];
  crosswalkTopics: string[];
  reviewed: string;
  chapter: string;
}

export interface ObligationsDoc extends Envelope {
  obligations: Obligation[];
}

export interface Framework {
  id: string;
  name: string;
  short: string;
  type: string;
  issuer: string;
  url: string | null;
  summary: string;
  page: string;
  obligations: string[];
}

export interface FrameworksDoc extends Envelope {
  frameworks: Framework[];
}

export interface CrosswalkTopic {
  id: string;
  name: string;
  summary: string;
  layers: number[];
}

export interface CrosswalkColumn {
  id: string;
  label: string;
  frameworks: string[];
}

export interface CrosswalkReference {
  topic: string;
  framework: string;
  reference: string;
  label: string;
  title: string;
  strength: string;
  verified: boolean;
  note: string | null;
  url: string | null;
  obligationId: string | null;
}

export interface CrosswalkDoc extends Envelope {
  topics: CrosswalkTopic[];
  columns: CrosswalkColumn[];
  references: CrosswalkReference[];
}

export interface PatternRow {
  id: string;
  /** Page slug (/patterns/<slug>); published from v0.5.0, not always derivable from the id. */
  slug?: string;
  title: string;
  layer: number;
  secondaryLayer: number | null;
  mapsTo: string[];
  /** From v0.5.0 the pattern's own page; up to v0.4.0 its chapter 05 anchor. */
  url: string;
  /** The pattern's summary in the chapter 05 catalogue (v0.5.0 and later). */
  section?: string;
  obligations: string[];
}

export interface PatternsDoc extends Envelope {
  patterns: PatternRow[];
}

export interface Chapter {
  id: string;
  order: number;
  part: string;
  slug: string;
  title: string;
  shortTitle: string;
  summary: string;
  glance: string[];
  url: string;
}

export interface ChaptersDoc extends Envelope {
  parts: { id: string; title: string }[];
  chapters: Chapter[];
}

// Open control profiles (/api/v1/controls.json, schema version 1): draft
// control specifications with stable ids, AIGE-CTL-<PROFILE>-<NNN>.

export interface ControlProfile {
  slug: string;
  title: string;
  shortTitle: string;
  url: string;
  version: string;
  status: string;
  reviewerStatus: string;
  summary: string;
  scope: string;
  published: string;
  updated: string;
  authors: string[];
  reviewers: string[];
  changelog: { version: string; date: string; note: string }[];
  reviewForm: string;
  controls: string[];
}

export interface ControlThreatRef {
  id: string;
  externalId: string;
  name: string;
  url: string;
}

export interface ControlMappings {
  obligations: { id: string; name: string; url: string }[];
  iso42001: { id: string; title: string }[];
  nistAiRmf: { id: string; title: string }[];
  owasp: ControlThreatRef[];
  atlas: ControlThreatRef[];
  aiuc1: string[];
  csaAicm: string[];
  other: { framework: string; ref: string; note: string | null }[];
}

export interface ControlRecord {
  id: string;
  profile: string;
  url: string;
  json: string;
  title: string;
  version: string;
  status: string;
  reviewerStatus: string;
  depth: string;
  objective: string;
  failureModes: string[];
  scope: string;
  enforcementPoints: string[];
  verification: { kind: string; text: string }[];
  evidence: { artefact: string; schemaId: string | null; schema: string | null; layer: number }[];
  failureResponse: { effect: string; text: string };
  layer: number;
  secondaryLayers: number[];
  patterns: { slug: string; title: string; url: string }[];
  seeds: { id: string; title: string; url: string }[];
  mappings: ControlMappings;
  references: { n: number; title: string; text: string; url: string; verified: string }[];
  implementationNotes: string[];
  openQuestions: string[];
  observation: { subjectKind: string; expected: string; observedExample: string } | null;
  observationSchema: string;
  examples: { status: string; url: string }[];
}

export interface ControlsDoc extends Envelope {
  asOf: string;
  profiles: ControlProfile[];
  controls: ControlRecord[];
}
