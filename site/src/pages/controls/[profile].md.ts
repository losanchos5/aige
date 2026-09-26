// /controls/<profile>.md: the Markdown alternate of an open control profile,
// with the same sections, one H2 per control and the numbered sources of the
// page (lib/controls-md.ts), under the header of lib/llms.ts. Seo.astro links
// it from the profile page (lib/llms.ts markdownAlternateFor).
import type { APIRoute, GetStaticPaths } from 'astro';
import { profiles, profilePath, type ControlProfile } from '../../data/controls';
import { controlsMarkdown, profilePageMeta } from '../../lib/controls-md';
import { markdownDocument, markdownResponse } from '../../lib/llms';

export const getStaticPaths: GetStaticPaths = () =>
  profiles.map((profile) => ({ params: { profile: profile.slug }, props: { profile } }));

export const GET: APIRoute = ({ props }) => {
  const profile = (props as { profile: ControlProfile }).profile;
  const { description } = profilePageMeta(profile.slug);
  return markdownResponse(
    markdownDocument(
      { title: profile.title, description, path: profilePath(profile), updated: profile.updated },
      controlsMarkdown(profile),
    ),
  );
};
