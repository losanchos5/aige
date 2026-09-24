// /api/v1/obligations/<id>.json: one obligation-register row per file, keyed by
// its stable id in lower case (e.g. aige-obl-euaia-art9). Same record as in
// /api/v1/obligations.json, wrapped in the shared envelope; it validates against
// /api/v1/schemas/obligation.json.
import type { APIRoute, GetStaticPaths } from 'astro';
import { obligations, obligationSlug, type Obligation } from '../../../../data/frameworks';
import { obligationDocument, jsonResponse } from '../../../../lib/api';

export const getStaticPaths = (() =>
  obligations.map((row) => ({
    params: { id: obligationSlug(row) },
    props: { row },
  }))) satisfies GetStaticPaths;

export const GET: APIRoute<{ row: Obligation }> = ({ props }) =>
  jsonResponse(obligationDocument(props.row));
