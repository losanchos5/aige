// index.ts: every tool of the server, registered on one McpServer instance.

import type { McpServer } from '@modelcontextprotocol/server';

import { registerBok } from './bok.js';
import type { ToolDeps } from './common.js';
import { registerCrosswalk } from './crosswalk.js';
import { registerGlossary } from './glossary.js';
import { registerObligations } from './obligations.js';
import { registerPatterns } from './patterns.js';
import { registerTemplates } from './templates.js';

/** Tool names in registration order (the discovery document lists them). */
export const TOOL_NAMES = [
  'search_glossary',
  'get_term',
  'get_obligations',
  'get_obligation',
  'map_clause',
  'list_patterns',
  'get_pattern',
  'list_templates',
  'get_template',
  'search_bok',
] as const;

export function registerTools(server: McpServer, deps: ToolDeps): void {
  registerGlossary(server, deps);
  registerObligations(server, deps);
  registerCrosswalk(server, deps);
  registerPatterns(server, deps);
  registerTemplates(server, deps);
  registerBok(server, deps);
}
