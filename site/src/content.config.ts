import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

// Files carry no frontmatter; passthrough keeps validation permissive.
const schema = z.object({}).passthrough();

// The chapter files only: `[0-9][0-9]-*.md` does not descend into bok/patterns.
const bok = defineCollection({
  loader: glob({ pattern: '[0-9][0-9]-*.md', base: '../bok' }),
  schema,
});

// One file per pattern of the chapter 05 catalogue (bok/patterns/<id>.md),
// rendered at /patterns/<id>. Unlike the chapters, a pattern file carries typed
// frontmatter; the contract is documented in
// openspec/changes/patterns-as-pages/proposal.md and enforced here and in
// src/lib/pattern-pages.ts (which cross-checks it against data/patterns.ts).
const layer = z.number().int().min(1).max(5);
const patterns = defineCollection({
  loader: glob({ pattern: '*.md', base: '../bok/patterns' }),
  schema: z
    .object({
      /** URL id: /patterns/<id>. Must equal the file name without `.md`. */
      id: z.string().regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/),
      /** Pattern name without the "Pattern: " prefix; the H1 is "Pattern: <title>". */
      title: z.string().min(2),
      /** Home layer (1 Govern-as-Code ... 5 Assurance & Continuous Compliance). */
      layer,
      /** Second layer, for a pattern that straddles two. */
      secondaryLayer: layer.optional(),
      /** One sentence, 50-160 characters: the page lede and meta description. */
      summary: z.string().min(50).max(160),
      /** Position in the catalogue (1-based, unique): drives prev/next and lists. */
      order: z.number().int().min(1),
    })
    .strict()
    .refine((data) => data.secondaryLayer === undefined || data.secondaryLayer !== data.layer, {
      message: 'secondaryLayer must differ from layer',
    }),
});

const thesis = defineCollection({
  loader: glob({ pattern: 'THESIS.md', base: '..' }),
  schema,
});

const meta = defineCollection({
  loader: glob({ pattern: '{CONTRIBUTORS,CHANGELOG}.md', base: '../bok' }),
  schema,
});

export const collections = { bok, patterns, thesis, meta };
