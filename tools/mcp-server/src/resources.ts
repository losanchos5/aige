// resources.ts: the open datasets as MCP resources. Each resource URI is the
// canonical public URL of the document (https://aigovernanceengineer.com/...),
// so a client that can fetch the web may also read it directly; the server
// reads it through the same cache as the tools (from API_BASE). Two resource
// templates serve the per-obligation and per-control documents.

import { ResourceTemplate, type McpServer } from '@modelcontextprotocol/server';

import { CANONICAL_API, CANONICAL_SITE, DATASETS, type DataSource } from './data.js';

const ATTRIBUTION = 'CC BY 4.0, Jorge García Aibar. Illustrative, not legal advice and not a claim of conformity.';

export function registerResources(server: McpServer, data: DataSource): void {
  server.registerResource(
    'index',
    `${CANONICAL_API}/index.json`,
    {
      title: 'Open data catalogue',
      description: `The catalogue of the AI Governance Engineer open data API: every dataset with its schema, version and page. ${ATTRIBUTION}`,
      mimeType: 'application/json',
    },
    async (uri) => ({
      contents: [{ uri: uri.href, mimeType: 'application/json', text: await data.datasetText('index') }],
    }),
  );

  for (const dataset of DATASETS) {
    server.registerResource(
      dataset.name,
      `${CANONICAL_API}/${dataset.name}.json`,
      {
        title: dataset.title,
        description: `${dataset.title} dataset of the AI Governance Engineer open data API (/api/v1/${dataset.name}.json). ${ATTRIBUTION}`,
        mimeType: 'application/json',
      },
      async (uri) => ({
        contents: [{ uri: uri.href, mimeType: 'application/json', text: await data.datasetText(dataset.name) }],
      }),
    );
  }

  server.registerResource(
    'obligation',
    new ResourceTemplate(`${CANONICAL_API}/obligations/{id}.json`, { list: undefined }),
    {
      title: 'One obligation',
      description: `One row of the obligation register by its lower-case id, e.g. aige-obl-euaia-art9. ${ATTRIBUTION}`,
      mimeType: 'application/json',
    },
    async (uri, variables) => {
      const raw = variables.id;
      const id = (Array.isArray(raw) ? raw[0] : raw)?.toLowerCase() ?? '';
      if (!/^aige-obl-[a-z0-9]+(-[a-z0-9]+)+$/.test(id)) {
        throw new Error(`Not an obligation id: "${id}". Ids look like aige-obl-euaia-art9.`);
      }
      return { contents: [{ uri: uri.href, mimeType: 'application/json', text: await data.obligationItemText(id) }] };
    },
  );

  server.registerResource(
    'control',
    new ResourceTemplate(`${CANONICAL_API}/controls/{id}.json`, { list: undefined }),
    {
      title: 'One control',
      description: `One reference control of the open control profiles by its lower-case id, e.g. aige-ctl-eval-002. A draft control specification, open for technical review. ${ATTRIBUTION}`,
      mimeType: 'application/json',
    },
    async (uri, variables) => {
      const raw = variables.id;
      const id = (Array.isArray(raw) ? raw[0] : raw)?.toLowerCase() ?? '';
      if (!/^aige-ctl-[a-z0-9]+-[0-9]{3}$/.test(id)) {
        throw new Error(`Not a control id: "${id}". Ids look like aige-ctl-eval-002.`);
      }
      return { contents: [{ uri: uri.href, mimeType: 'application/json', text: await data.controlItemText(id) }] };
    },
  );

  server.registerResource(
    'bok-full-text',
    `${CANONICAL_SITE}/llms-full.txt`,
    {
      title: 'Body of Knowledge, full text',
      description: `The complete text of the Body of Knowledge chapters and pattern pages, then the Thesis, as one Markdown file (about 1.4 MB). ${ATTRIBUTION}`,
      mimeType: 'text/markdown',
    },
    async (uri) => ({
      contents: [{ uri: uri.href, mimeType: 'text/markdown', text: await data.siteText('/llms-full.txt') }],
    }),
  );
}
