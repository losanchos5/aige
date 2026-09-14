// rehype-tables: wrap every <table> in a focusable scroll region so wide tables
// scroll horizontally on narrow viewports without breaking the page layout.

import type { Root, Element } from 'hast';
import { visit, SKIP } from 'unist-util-visit';
import { hasClass } from './hast-utils';

export default function rehypeTables() {
  return (tree: Root): void => {
    visit(tree, 'element', (node, index, parent) => {
      if (node.tagName !== 'table' || !parent || index === undefined) return;
      if (parent.type === 'element' && parent.tagName === 'div' && hasClass(parent, 'table-scroll')) {
        return;
      }

      const wrapper: Element = {
        type: 'element',
        tagName: 'div',
        properties: { className: ['table-scroll'], tabIndex: 0, role: 'region', 'aria-label': 'Table' },
        children: [node],
      };
      parent.children[index] = wrapper;
      return [SKIP, index + 1];
    });
  };
}
