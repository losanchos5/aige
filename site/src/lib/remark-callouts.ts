// remark-callouts: turn labelled blockquotes into <aside class="callout"> and
// tag "Maps to:" paragraphs.
//
// A blockquote whose first paragraph opens with strong text matching one of the
// callout labels (`**In practice**`, `**Example (illustrative)**`,
// `**Anti-pattern**`, `**Postings …**`, `**Note**`, `**Warning**`,
// `**In short**`) becomes an <aside>:
//
//   <aside class="callout" data-kind="practice|example|anti|note|summary">
//     <p class="callout-title">In practice</p>
//     <p>…body…</p>
//   </aside>
//
// The chapters often pack two labels into one blockquote (an "In practice"
// example followed by its "Anti-pattern"), separated only by a soft line break.
// So we split each labelled blockquote into one <aside> per label rather than
// classifying the whole quote by its first label.
//
// `**In short**` is the chapter's self-contained answer paragraph, placed right
// after the abstract (kind `summary`).
//
// Paragraphs that open with `**Maps to:**` get `class="maps-to"`.
// Kinds are styled by prose.css; this plugin only produces the markup.

import type { Root, Blockquote, Paragraph, PhrasingContent } from 'mdast';
import type { VFile } from 'vfile';
import { visit, SKIP } from 'unist-util-visit';
import { toString } from 'mdast-util-to-string';
import { englishLabelFor } from '../i18n/callouts';
import type { TranslatedLocale } from '../i18n/locales';
import { classifyFile } from './i18n-content';

// Recognised in mdast Data by mdast-util-to-hast for the rehype stage.
import type {} from 'mdast-util-to-hast';

type CalloutKind = 'practice' | 'example' | 'anti' | 'note' | 'summary';

const KIND_RE = /^(In practice|In short|Example|Anti-pattern|Postings|Note|Warning)/i;

interface Segment {
  label: string;
  blocks: Blockquote['children'];
}

function kindFor(label: string): CalloutKind {
  const lower = label.toLowerCase();
  if (lower.startsWith('in practice')) return 'practice';
  if (lower.startsWith('in short')) return 'summary';
  if (lower.startsWith('example')) return 'example';
  if (lower.startsWith('anti-pattern')) return 'anti';
  return 'note';
}

// A translation (I18N_DIR/<lang>/...) may carry the label that callouts.json
// maps the English one to (src/i18n/callouts.ts); its kind is the English
// label's. An English file only ever matches the English labels.
function englishLabel(text: string, lang: TranslatedLocale | undefined): string | undefined {
  if (KIND_RE.test(text)) return text;
  const english = lang ? englishLabelFor(text, lang) : undefined;
  return english && KIND_RE.test(english) ? english : undefined;
}

function isLabel(node: PhrasingContent, lang?: TranslatedLocale): boolean {
  return node.type === 'strong' && englishLabel(toString(node).trim(), lang) !== undefined;
}

function isMapsTo(text: string, lang: TranslatedLocale | undefined): boolean {
  if (/^Maps to\b/i.test(text)) return true;
  const english = lang ? englishLabelFor(text, lang) : undefined;
  return english !== undefined && /^Maps to\b/i.test(english);
}

function trimLeadingWhitespace(nodes: PhrasingContent[]): PhrasingContent[] {
  const out = [...nodes];
  while (out.length > 0 && out[0].type === 'text') {
    const first = out[0];
    first.value = first.value.replace(/^\s+/, '');
    if (first.value === '') out.shift();
    else break;
  }
  return out;
}

function toAside(segment: Segment, lang?: TranslatedLocale): Blockquote {
  const title = segment.label.replace(/\.\s*$/, '');
  const titlePara: Paragraph = {
    type: 'paragraph',
    data: { hProperties: { className: ['callout-title'] } },
    children: [{ type: 'text', value: title }],
  };
  return {
    type: 'blockquote',
    data: {
      hName: 'aside',
      hProperties: {
        className: ['callout'],
        'data-kind': kindFor(englishLabel(segment.label, lang) ?? segment.label),
      },
    },
    children: [titlePara, ...segment.blocks],
  };
}

export default function remarkCallouts() {
  return (tree: Root, file?: VFile): void => {
    const lang = classifyFile(file?.path ?? file?.history.at(-1))?.lang;
    visit(tree, 'blockquote', (node: Blockquote, index, parent) => {
      if (index === undefined || !parent) return;
      const first = node.children[0];
      if (!first || first.type !== 'paragraph' || !isLabel(first.children[0], lang)) return;

      const segments: Segment[] = [];
      let current: Segment | undefined;

      const flushInline = (inline: PhrasingContent[]): void => {
        const trimmed = trimLeadingWhitespace(inline);
        if (current && trimmed.length > 0) {
          current.blocks.push({ type: 'paragraph', children: trimmed });
        }
      };

      for (const block of node.children) {
        if (block.type === 'paragraph') {
          let inline: PhrasingContent[] = [];
          for (const child of block.children) {
            if (isLabel(child, lang)) {
              flushInline(inline);
              inline = [];
              current = { label: toString(child).trim(), blocks: [] };
              segments.push(current);
            } else {
              inline.push(child);
            }
          }
          flushInline(inline);
        } else if (current) {
          current.blocks.push(block);
        }
      }

      if (segments.length === 0) return;
      const asides = segments.map((segment) => toAside(segment, lang));
      parent.children.splice(index, 1, ...asides);
      return [SKIP, index + asides.length];
    });

    visit(tree, 'paragraph', (node: Paragraph) => {
      const lead = node.children[0];
      if (!lead || lead.type !== 'strong') return;
      if (!isMapsTo(toString(lead).trim(), lang)) return;
      node.data = {
        ...node.data,
        hProperties: { ...node.data?.hProperties, className: ['maps-to'] },
      };
    });
  };
}
