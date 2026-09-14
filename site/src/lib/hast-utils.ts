// hast-utils: small shared helpers for the rehype plugins.

import type { Element } from 'hast';

/** True when a hast element carries the given class name. */
export function hasClass(node: Element, name: string): boolean {
  const value = node.properties?.className;
  return Array.isArray(value) && value.includes(name);
}
