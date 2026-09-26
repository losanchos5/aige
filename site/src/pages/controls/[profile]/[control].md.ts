// /controls/<profile>/<id>.md: the Markdown alternate of a specified control's
// page, with the same sections (the record, the two example observations, the
// related cases, patterns, obligations and threats, the numbered sources) from
// lib/controls-md.ts controlMarkdown, under the header of lib/llms.ts. Seo.astro
// links it from the control page (lib/llms.ts markdownAlternateFor).
import type { APIRoute, GetStaticPaths } from 'astro';
import { controls, controlPagePath, controlSlug, profileCitation, type Control } from '../../../data/controls';
import { controlMarkdown, controlPageMeta, profileOf } from '../../../lib/controls-md';
import { markdownDocument, markdownResponse } from '../../../lib/llms';

export const getStaticPaths: GetStaticPaths = () =>
  controls
    .filter((c) => c.depth === 'specified' && controlPagePath(c) !== null)
    .map((c) => ({ params: { profile: c.profile, control: controlSlug(c) }, props: { control: c } }));

export const GET: APIRoute = ({ props }) => {
  const control = (props as { control: Control }).control;
  const profile = profileOf(control);
  const { description } = controlPageMeta(control);
  return markdownResponse(
    markdownDocument(
      {
        title: control.title,
        description,
        path: controlPagePath(control) as string,
        updated: profile.updated,
        version: profile.version,
        // The profile's own DOI once deposited, else the project concept DOI.
        doi: profileCitation(profile).effectiveDoi,
      },
      controlMarkdown(control),
    ),
  );
};
