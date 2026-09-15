import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

// Files carry no frontmatter; passthrough keeps validation permissive.
const schema = z.object({}).passthrough();

const bok = defineCollection({
  loader: glob({ pattern: '[0-9][0-9]-*.md', base: '../bok' }),
  schema,
});

const thesis = defineCollection({
  loader: glob({ pattern: 'THESIS.md', base: '..' }),
  schema,
});

const meta = defineCollection({
  loader: glob({ pattern: '{CONTRIBUTORS,CHANGELOG}.md', base: '../bok' }),
  schema,
});

export const collections = { bok, thesis, meta };
