import { pathToFileURL } from 'node:url';
import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';
import { i18nDir } from './lib/i18n-content';

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

// Translations (openspec/changes/i18n-site-rendering). The pipeline writes them
// into I18N_DIR (default <repo>/i18n; the tests point it at pseudo-localised
// fixtures): <lang>/bok/<chapter-id>.md, <lang>/patterns/<slug>.md and
// <lang>/THESIS.md. Every file opens with the translation frontmatter below;
// lib/i18n-pages.ts cross-checks it against the file's place and its English
// source, and a route exists only for a file that exists. An empty or missing
// folder yields empty collections (and no translated route at all).
const i18nBase = pathToFileURL(`${i18nDir()}/`);
// The entry id is the path without `.md` (`es/bok/03-values-principles`), so the
// language and the source id can be read back from it.
const i18nId = ({ entry }: { entry: string }) => entry.replace(/\.md$/, '');
const translationMeta = {
  /** The file's language; must be the folder it sits in. */
  lang: z.enum(['es', 'fr', 'de', 'pt']),
  /** Repo-relative path of the English file (`bok/03-values-principles.md`). */
  source: z.string().min(1),
  /** sha256 (hex) of the English file with LF line endings, when it was translated. */
  sourceHash: z.string().regex(/^[0-9a-f]{64}$/, 'sourceHash must be 64 lower-case hex digits'),
  /** "machine: <model id>". */
  translatedBy: z.string().regex(/^machine: \S+/, 'translatedBy must read "machine: <model id>"'),
  /** ISO date (a YAML date or a string), kept as `YYYY-MM-DD...`. */
  translatedAt: z
    .union([z.date(), z.string().regex(/^\d{4}-\d{2}-\d{2}/)])
    .transform((value) => (value instanceof Date ? value.toISOString().slice(0, 10) : value)),
};

const bokI18n = defineCollection({
  loader: glob({
    pattern: '{es,fr,de,pt}/bok/[0-9][0-9]-*.md',
    base: i18nBase,
    generateId: i18nId,
  }),
  // A chapter has no frontmatter of its own today; `passthrough` keeps any field
  // a future chapter gains (the contract keeps the source's other fields), and
  // `glance` lets a translation carry the chapter's "At a glance" items.
  schema: z
    .object({ ...translationMeta, glance: z.array(z.string().min(1)).optional() })
    .passthrough(),
});

const patternsI18n = defineCollection({
  loader: glob({ pattern: '{es,fr,de,pt}/patterns/*.md', base: i18nBase, generateId: i18nId }),
  // The pattern frontmatter with title and summary translated; the ids, layers
  // and order must equal the English file's (checked in lib/i18n-pages.ts).
  schema: z
    .object({
      ...translationMeta,
      id: z.string().regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/),
      title: z.string().min(2),
      layer,
      secondaryLayer: layer.optional(),
      summary: z.string().min(20).max(400),
      order: z.number().int().min(1),
    })
    .strict(),
});

// fr, de and pt only: the Spanish Thesis is the hand translation (THESIS.es.md).
const thesisI18n = defineCollection({
  loader: glob({ pattern: '{fr,de,pt}/THESIS.md', base: i18nBase, generateId: i18nId }),
  schema: z.object(translationMeta).passthrough(),
});

export const collections = { bok, patterns, thesis, meta, bokI18n, patternsI18n, thesisI18n };
