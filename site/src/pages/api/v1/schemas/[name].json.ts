// /api/v1/schemas/<name>.json: the JSON Schema (draft 2020-12) of each API
// document: one per dataset, plus `obligation` (a single register row) and
// `index` (the catalogue). Generated from the same registry as the payloads.
import type { APIRoute, GetStaticPaths } from 'astro';
import { allSchemas, jsonResponse, type JsonSchema } from '../../../../lib/api';

export const getStaticPaths = (() =>
  Object.entries(allSchemas()).map(([name, schema]) => ({
    params: { name },
    props: { schema },
  }))) satisfies GetStaticPaths;

export const GET: APIRoute<{ schema: JsonSchema }> = ({ props }) =>
  jsonResponse(props.schema, 'application/schema+json; charset=utf-8');
