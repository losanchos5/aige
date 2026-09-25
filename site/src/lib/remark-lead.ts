// remark-lead: lift the leading H1 and its abstract out of the Markdown tree.
//
// Every chapter opens with an H1 followed (in the BoK chapters) by a one-line
// blockquote abstract. The Doc layout renders its own header, so this plugin
// removes both from the rendered body and stores them as
// `file.data.astro.frontmatter.title` / `.summary` (plain text), which Astro
// surfaces through `remarkPluginFrontmatter` on `render(entry)`.
//
// A blockquote that is really a callout (starts with `**In practice**` etc.) is
// never mistaken for an abstract. Files without an abstract just yield a title.

import type { Root, Blockquote, Paragraph } from 'mdast';
import type { VFile } from 'vfile';
import { toString } from 'mdast-util-to-string';
import { englishLabelFor } from '../i18n/callouts';
import type { TranslatedLocale } from '../i18n/locales';
import { classifyFile } from './i18n-content';

const CALLOUT_RE = /^(In practice|Example|Anti-pattern|Postings|Note|Warning)/i;

interface AstroFrontmatter {
  title?: string;
  summary?: string;
  [key: string]: unknown;
}

interface AstroData {
  frontmatter?: AstroFrontmatter;
}

// A translation's callout may carry its language's label (src/i18n/callouts.ts).
function isCalloutBlockquote(node: Blockquote, lang?: TranslatedLocale): boolean {
  const first = node.children[0];
  if (!first || first.type !== 'paragraph') return false;
  const lead = (first as Paragraph).children[0];
  if (!lead || lead.type !== 'strong') return false;
  const label = toString(lead).trim();
  if (CALLOUT_RE.test(label)) return true;
  const english = lang ? englishLabelFor(label, lang) : undefined;
  return english !== undefined && CALLOUT_RE.test(english);
}

export default function remarkLead() {
  return (tree: Root, file: VFile): void => {
    const children = tree.children;
    if (children.length === 0) return;

    const head = children[0];
    if (head.type !== 'heading' || head.depth !== 1) return;

    const title = toString(head).trim();
    children.shift();

    let summary: string | undefined;
    const next = children[0];
    const lang = classifyFile(file.path ?? file.history.at(-1))?.lang;
    if (next && next.type === 'blockquote' && !isCalloutBlockquote(next, lang)) {
      summary = toString(next).replace(/\s+/g, ' ').trim();
      children.shift();
    }

    const data = file.data as { astro?: AstroData };
    data.astro ??= {};
    data.astro.frontmatter ??= {};
    data.astro.frontmatter.title = title;
    if (summary) data.astro.frontmatter.summary = summary;
  };
}
