// data.ts: typed access to the site's open data through the upstream cache.
//
// Dataset documents are read from `${apiBase}/<name>.json`, not from the
// absolute URLs inside index.json, so API_BASE can point the server at a local
// build (site/dist behind any static server) while every answer still cites
// the canonical public URLs the documents carry (`self`, `url`, `page`).
// Derived indexes (by id, by slug) are rebuilt only when a new download
// replaces the parsed document.

import { parseCorpus, type CorpusDocument } from './corpus.js';
import type { Config } from './config.js';
import type { Upstream } from './upstream.js';
import type {
  ChaptersDoc,
  ControlsDoc,
  CrosswalkDoc,
  Envelope,
  FrameworksDoc,
  GlossaryDoc,
  IndexDoc,
  ObligationsDoc,
  PatternsDoc,
} from './types.js';

/** The datasets /api/v1/index.json lists, in its order (test/resources.test.ts keeps this in sync). */
export const DATASETS = [
  { name: 'obligations', title: 'Obligation register' },
  { name: 'frameworks', title: 'Frameworks' },
  { name: 'crosswalk', title: 'Topic crosswalk' },
  { name: 'glossary', title: 'Glossary' },
  { name: 'patterns', title: 'Pattern catalogue index' },
  { name: 'maturity', title: 'Maturity model' },
  { name: 'path', title: 'Learning path' },
  { name: 'chapters', title: 'Body of Knowledge chapters' },
  { name: 'jurisdictions', title: 'AI laws by jurisdiction' },
  { name: 'harms', title: 'AI harms atlas' },
  { name: 'cases', title: 'Incident cases' },
  { name: 'contracts', title: 'Contract clauses and licence families' },
  { name: 'roles', title: 'Value-chain roles' },
  { name: 'threats', title: 'Threat bridge' },
  { name: 'controls', title: 'Open control profiles' },
] as const;

export type DatasetName = (typeof DATASETS)[number]['name'];

/** Canonical public origin of the site; answers cite it whatever API_BASE is. */
export const CANONICAL_SITE = 'https://aigovernanceengineer.com';
export const CANONICAL_API = `${CANONICAL_SITE}/api/v1`;

export class DataSource {
  private corpusCache: { text: string; docs: CorpusDocument[] } | null = null;

  constructor(
    readonly upstream: Upstream,
    private readonly config: Pick<Config, 'apiBase' | 'siteBase'>,
  ) {}

  datasetUrl(name: string): string {
    return `${this.config.apiBase}/${name}.json`;
  }

  siteUrl(path: string): string {
    return `${this.config.siteBase}${path.startsWith('/') ? path : `/${path}`}`;
  }

  /** Raw text of a dataset, for MCP resources. */
  datasetText(name: string): Promise<string> {
    return this.upstream.text(this.datasetUrl(name));
  }

  obligationItemText(id: string): Promise<string> {
    return this.upstream.text(`${this.config.apiBase}/obligations/${id.toLowerCase()}.json`);
  }

  controlItemText(id: string): Promise<string> {
    return this.upstream.text(`${this.config.apiBase}/controls/${id.toLowerCase()}.json`);
  }

  index(): Promise<IndexDoc> {
    return this.upstream.json<IndexDoc>(this.datasetUrl('index'));
  }

  glossary(): Promise<GlossaryDoc> {
    return this.upstream.json<GlossaryDoc>(this.datasetUrl('glossary'));
  }

  obligations(): Promise<ObligationsDoc> {
    return this.upstream.json<ObligationsDoc>(this.datasetUrl('obligations'));
  }

  frameworks(): Promise<FrameworksDoc> {
    return this.upstream.json<FrameworksDoc>(this.datasetUrl('frameworks'));
  }

  crosswalk(): Promise<CrosswalkDoc> {
    return this.upstream.json<CrosswalkDoc>(this.datasetUrl('crosswalk'));
  }

  patterns(): Promise<PatternsDoc> {
    return this.upstream.json<PatternsDoc>(this.datasetUrl('patterns'));
  }

  chapters(): Promise<ChaptersDoc> {
    return this.upstream.json<ChaptersDoc>(this.datasetUrl('chapters'));
  }

  controls(): Promise<ControlsDoc> {
    return this.upstream.json<ControlsDoc>(this.datasetUrl('controls'));
  }

  /** A file of the site (schema, example, template) as text. */
  siteText(path: string): Promise<string> {
    return this.upstream.text(this.siteUrl(path));
  }

  /** The chapter and pattern texts from /llms-full.txt, parsed once per download. */
  async corpus(): Promise<CorpusDocument[]> {
    const text = await this.upstream.text(this.siteUrl('/llms-full.txt'));
    if (this.corpusCache?.text !== text) this.corpusCache = { text, docs: parseCorpus(text) };
    return this.corpusCache.docs;
  }

  /** Like corpus(), but an unavailable corpus yields an empty list (the tools degrade to the datasets). */
  async corpusOrEmpty(): Promise<CorpusDocument[]> {
    try {
      return await this.corpus();
    } catch {
      return [];
    }
  }
}

/** The envelope fields an answer repeats (version, licence, citation). */
export function provenance(doc: Envelope): { dataVersion: string; license: string; licenseUrl: string; dataset: string } {
  return { dataVersion: doc.version, license: doc.license, licenseUrl: doc.licenseUrl, dataset: doc.self };
}
