// /api/v1/<dataset>.json: one static endpoint per dataset in the registry
// (src/lib/api.ts): obligations, frameworks, crosswalk, glossary, patterns,
// maturity, path, chapters, jurisdictions, harms, cases, contracts and roles.
// Each carries the shared envelope (notice, version, licence, DOIs, source,
// schemaVersion, schema URL) and validates against /api/v1/schemas/<name>.json.
import type { APIRoute, GetStaticPaths } from 'astro';
import { datasets, datasetPayload, jsonResponse, type Dataset } from '../../../lib/api';

export const getStaticPaths = (() =>
  datasets.map((dataset) => ({
    params: { dataset: dataset.name },
    props: { dataset },
  }))) satisfies GetStaticPaths;

export const GET: APIRoute<{ dataset: Dataset }> = ({ props }) =>
  jsonResponse(datasetPayload(props.dataset));
