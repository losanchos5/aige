// common.ts: what every tool answer shares: the notice, the provenance
// fields, the text footer, error results and the stack-layer names.

import type { CallToolResult, McpServer } from '@modelcontextprotocol/server';
import * as z from 'zod';

import type { DataSource } from '../data.js';
import type { Logger } from '../log.js';
import { UpstreamError } from '../upstream.js';

export const NOTICE =
  'Illustrative, not legal advice and not a claim of conformity. Check the primary source before relying on it.';

export const ATTRIBUTION = 'AI Governance Engineer Body of Knowledge, Jorge García Aibar, CC BY 4.0';

/** The five layers of the stack (chapter 04), by number. */
export const LAYERS: Record<number, string> = {
  1: 'Govern-as-Code',
  2: 'Inventory & Transparency',
  3: 'Evals & Red Teaming as Evidence',
  4: 'Runtime Controls & Observability',
  5: 'Assurance & Continuous Compliance',
};

export function layerName(layer: number | null | undefined): string | null {
  if (layer === null || layer === undefined) return null;
  return LAYERS[layer] ?? null;
}

export function layerLabel(layer: number): string {
  return `Layer 0${layer} ${LAYERS[layer] ?? ''}`.trim();
}

export interface ToolDeps {
  data: DataSource;
  logger: Logger;
}

export type Register = (server: McpServer, deps: ToolDeps) => void;

/** Output-schema fields every answer carries. */
export const provenanceShape = {
  source: z.string().describe('Canonical URL of the page this answer comes from; cite it.'),
  dataset: z.string().describe('URL of the open-data document the answer was read from.'),
  dataVersion: z.string().describe('Body of Knowledge version of the data.'),
  license: z.string().describe('Licence of the data (CC BY 4.0, attribution required).'),
  notice: z.string().describe('Illustrative, not legal advice and not a claim of conformity.'),
};

export interface Provenance {
  source: string;
  dataset: string;
  dataVersion: string;
  license: string;
  notice: string;
}

export function provenanceOf(source: string, dataset: string, dataVersion: string): Provenance {
  return { source, dataset, dataVersion, license: 'CC BY 4.0', notice: NOTICE };
}

export function footer(p: Provenance): string {
  return [
    '',
    `Source: ${p.source}`,
    `Data: ${p.dataset} (Body of Knowledge v${p.dataVersion}; ${ATTRIBUTION}).`,
    p.notice,
  ].join('\n');
}

export const READ_ONLY = {
  readOnlyHint: true,
  destructiveHint: false,
  idempotentHint: true,
  openWorldHint: false,
} as const;

export function ok(text: string, structured: object): CallToolResult {
  return {
    content: [{ type: 'text', text }],
    structuredContent: structured as Record<string, unknown>,
  };
}

export function fail(message: string): CallToolResult {
  return { isError: true, content: [{ type: 'text', text: `${message}\n\n${NOTICE}` }] };
}

/** Run a tool body; upstream and unexpected failures become tool errors the model can read. */
export async function guarded(
  deps: ToolDeps,
  tool: string,
  body: () => Promise<CallToolResult>,
): Promise<CallToolResult> {
  try {
    return await body();
  } catch (error) {
    if (error instanceof UpstreamError) {
      deps.logger.warn('tool upstream failure', { tool, url: error.url, status: error.status, error });
      return fail(
        `The site's open data could not be read right now (${error.message}). Try again later, or read ${error.url} directly.`,
      );
    }
    deps.logger.error('tool failure', { tool, error });
    return fail('The tool failed unexpectedly. Try again, or use the open data at https://aigovernanceengineer.com/resources/data.');
  }
}

/** Markdown links reduced to their text, whitespace flattened (snippets and one-line summaries). */
export function flatten(markdown: string): string {
  return markdown
    .replace(/!\[([^\]]*)\]\([^)]*\)/g, '$1')
    .replace(/\[([^\]]*)\]\([^)]*\)/g, '$1')
    .replace(/\s+/g, ' ')
    .trim();
}

/** Site-relative links in Markdown made absolute, so a client can follow them. */
export function absoluteLinks(markdown: string, origin: string): string {
  return markdown.replace(/\]\((\/[^)\s]*)\)/g, `](${origin}$1)`);
}

/** Page slug of a chapter 05 pattern id: `pattern-kill-switch--circuit-breaker` → `kill-switch-circuit-breaker`. */
export function patternSlug(id: string): string {
  return id.replace(/^pattern-/, '').replace(/-{2,}/g, '-');
}
