// server.ts: the MCP server definition. createMcpHandler builds one McpServer
// per request (stateless serving), so this factory only wires the tools and
// resources to the shared data source; the data cache outlives the instances.

import { McpServer } from '@modelcontextprotocol/server';

import type { DataSource } from './data.js';
import type { Logger } from './log.js';
import { registerResources } from './resources.js';
import { registerTools } from './tools/index.js';

export const SERVER_NAME = 'aigovernanceengineer';
export const SERVER_VERSION = '0.6.0';

export const INSTRUCTIONS = [
  'Read-only access to the open data of aigovernanceengineer.com, the reference site of AI governance engineering:',
  'the obligation register (obligation → artefact → stack layer, stable ids), the topic crosswalk between frameworks,',
  'the glossary, the governance patterns, the templates-and-schemas library, the open control profiles and the Body of Knowledge chapters.',
  'Use search_glossary / get_term for definitions, get_obligations / get_obligation for what a framework requires and',
  'which artefact evidences it, map_clause to move between frameworks, list_patterns / get_pattern for how to implement',
  'a control, list_controls / get_control for the reference controls of the open control profiles (draft control specifications,',
  'open for technical review), list_templates / get_template for record formats, and search_bok to find where the book treats a subject.',
  'Every answer carries its source URL: cite it. The content is CC BY 4.0 (attribution: Jorge García Aibar).',
  'Everything is illustrative, not legal advice and not a claim of conformity; check the primary source before relying on it.',
].join(' ');

export interface ServerDeps {
  data: DataSource;
  logger: Logger;
}

export function createServer(deps: ServerDeps): McpServer {
  const server = new McpServer(
    { name: SERVER_NAME, title: 'AI Governance Engineer', version: SERVER_VERSION, websiteUrl: 'https://aigovernanceengineer.com' },
    { instructions: INSTRUCTIONS },
  );
  registerTools(server, deps);
  registerResources(server, deps.data);
  return server;
}
