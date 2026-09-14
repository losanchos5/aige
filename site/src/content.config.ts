import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

// Files carry no frontmatter; passthrough keeps validation permissive.
const schema = z.object({}).passthrough();

const bok = defineCollection({
  loader: glob({ pattern: '[0-9][0-9]-*.md', base: '../bok' }),
  schema,
});

const manifesto = defineCollection({
  loader: glob({ pattern: 'MANIFESTO.md', base: '..' }),
  schema,
});

const meta = defineCollection({
  loader: glob({ pattern: '{CONTRIBUTORS,CHANGELOG}.md', base: '../bok' }),
  schema,
});

export const collections = { bok, manifesto, meta };
