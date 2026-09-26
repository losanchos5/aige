// /api/v1/controls/<id>.json: one reference control per file, keyed by its
// stable id in lower case (e.g. aige-ctl-eval-002). Same record as in
// /api/v1/controls.json, wrapped in the shared envelope; it validates against
// /api/v1/schemas/control.json. Draft control specifications, open for
// technical review; not a claim of conformity.
import type { APIRoute, GetStaticPaths } from 'astro';
import { controls, controlSlug, type Control } from '../../../../data/controls';
import { controlDocument, jsonResponse } from '../../../../lib/api';

export const getStaticPaths = (() =>
  controls.map((row) => ({
    params: { id: controlSlug(row) },
    props: { row },
  }))) satisfies GetStaticPaths;

export const GET: APIRoute<{ row: Control }> = ({ props }) =>
  jsonResponse(controlDocument(props.row));
