// rehype-tables: wrap every <table> in a focusable scroll region so wide tables
// scroll horizontally on narrow viewports without breaking the page layout.
//
// Each region gets its own accessible name, taken from the nearest heading above
// the table ("Table: <heading>"), or "Table N" when no heading precedes it. A
// repeated name gets a " (2)", " (3)" suffix, so no two regions on a page share
// one: axe's landmark-unique rule fails when they do (/bok/the-role and
// /bok/regulatory-map carried several regions all named "Table").

import type { Root, Element } from 'hast';
import { toString } from 'hast-util-to-string';
import { visit, SKIP } from 'unist-util-visit';
import { hasClass } from './hast-utils';

const HEADING = /^h[1-6]$/;

export default function rehypeTables() {
  return (tree: Root): void => {
    let heading = '';
    let count = 0;
    const used = new Map<string, number>();

    // One pass in document order: a heading always comes before the tables
    // under it, so the last heading seen names the next table.
    visit(tree, 'element', (node, index, parent) => {
      if (HEADING.test(node.tagName)) {
        heading = toString(node).replace(/\s+/g, ' ').trim();
        return;
      }
      if (node.tagName !== 'table' || !parent || index === undefined) return;
      if (parent.type === 'element' && parent.tagName === 'div' && hasClass(parent, 'table-scroll')) {
        return;
      }

      count += 1;
      const base = heading ? `Table: ${heading}` : `Table ${count}`;
      const seen = used.get(base) ?? 0;
      used.set(base, seen + 1);
      const label = seen === 0 ? base : `${base} (${seen + 1})`;

      const wrapper: Element = {
        type: 'element',
        tagName: 'div',
        properties: { className: ['table-scroll'], tabIndex: 0, role: 'region', 'aria-label': label },
        children: [node],
      };
      parent.children[index] = wrapper;
      return [SKIP, index + 1];
    });
  };
}
