// templates.ts: list_templates and get_template over the templates-and-schemas
// library: the JSON Schemas under /schemas, their filled examples under
// /schemas/examples and the human templates and policy kit under /templates.
// The list is bundled (catalogue.generated.ts); the files are fetched live. A
// name the bundled list does not know is still tried as /schemas/<name>.v1.json,
// so a schema published after the last catalogue sync is served too.

import * as z from 'zod';

import { findTemplate, templates, type TemplateEntry, type TemplateFileRole } from '../catalogue.js';
import { CANONICAL_SITE } from '../data.js';
import { suggest } from '../text.js';
import { UpstreamError } from '../upstream.js';
import { READ_ONLY, fail, footer, guarded, layerLabel, ok, provenanceOf, provenanceShape, type Register } from './common.js';

const LIBRARY_PAGE = `${CANONICAL_SITE}/resources/templates`;

const entryShape = z.object({
  name: z.string(),
  kind: z.enum(['schema', 'kit']).describe('schema: JSON Schema with example and template; kit: policy-kit files.'),
  title: z.string(),
  description: z.string(),
  stage: z.string().nullable(),
  stageLabel: z.string().nullable(),
  layers: z.array(z.number().int()),
  patterns: z.array(z.string()),
  evidences: z.array(z.string()).describe('Clauses the record helps evidence (illustrative mapping).'),
});

function entryOut(entry: TemplateEntry): z.infer<typeof entryShape> {
  return {
    name: entry.name,
    kind: entry.kind,
    title: entry.title,
    description: entry.description,
    stage: entry.stage,
    stageLabel: entry.stageLabel,
    layers: entry.layers,
    patterns: entry.patterns,
    evidences: entry.evidences,
  };
}

const MEDIA: Record<string, string> = {
  json: 'application/json',
  markdown: 'text/markdown',
  yaml: 'application/yaml',
  rego: 'text/plain',
  csv: 'text/csv',
};

/** An entry for a schema the bundled catalogue does not list yet, built from the schema itself. */
async function liveEntry(name: string, read: (path: string) => Promise<string>): Promise<TemplateEntry | null> {
  if (!/^[a-z0-9]+(-[a-z0-9]+)*$/.test(name)) return null;
  let schema: Record<string, unknown>;
  try {
    schema = JSON.parse(await read(`/schemas/${name}.v1.json`)) as Record<string, unknown>;
  } catch (error) {
    if (error instanceof UpstreamError && error.status === 404) return null;
    if (error instanceof SyntaxError) return null;
    throw error;
  }
  const files: TemplateEntry['files'] = [{ role: 'schema', format: 'json', path: `/schemas/${name}.v1.json` }];
  for (const [role, format, path] of [
    ['example', 'json', `/schemas/examples/${name}.example.json`],
    ['template', 'markdown', `/templates/${name}.md`],
  ] as const) {
    try {
      await read(path);
      files.push({ role, format, path });
    } catch (error) {
      if (!(error instanceof UpstreamError)) throw error;
    }
  }
  const strings = (value: unknown): string[] => (Array.isArray(value) ? value.map(String) : []);
  return {
    name,
    kind: 'schema',
    title: typeof schema.title === 'string' ? schema.title : name,
    description: typeof schema.description === 'string' ? schema.description : '',
    stage: typeof schema['x-lifecycle-stage'] === 'string' ? schema['x-lifecycle-stage'] : null,
    stageLabel: null,
    layers: Array.isArray(schema['x-layer']) ? schema['x-layer'].map(Number) : [],
    patterns: strings(schema['x-pattern']).map((url) => url.split('#')[1] ?? url),
    evidences: strings(schema['x-evidences']),
    files,
  };
}

export const registerTemplates: Register = (server, deps) => {
  server.registerTool(
    'list_templates',
    {
      title: 'List templates and schemas',
      description:
        'List the templates-and-schemas library: JSON Schemas (with a filled example and a human Markdown template) for the records a governed AI lifecycle produces, from the use-case record to the decommissioning runbook, and the organisation-wide policy kit (AI policy in YAML, prose and Rego, committee charter, RACI, literacy curriculum, contract checklist). Optionally filter by lifecycle stage (intake, build, test, release, operate, retire, organisation). Returns names for get_template.',
      inputSchema: z.object({
        stage: z.string().max(40).optional().describe('Lifecycle stage id.'),
      }),
      outputSchema: z.object({
        total: z.number().int(),
        templates: z.array(entryShape),
        ...provenanceShape,
      }),
      annotations: { title: 'List templates and schemas', ...READ_ONLY },
    },
    async ({ stage }) =>
      guarded(deps, 'list_templates', async () => {
        const all = templates();
        const stages = [...new Set(all.map((e) => e.stage).filter((s): s is string => s !== null))];
        if (stage && !stages.includes(stage.trim().toLowerCase())) {
          return fail(`Unknown stage "${stage}". Stages: ${stages.join(', ')}.`);
        }
        const rows = stage ? all.filter((e) => e.stage === stage.trim().toLowerCase()) : all;
        const index = await deps.data.index();
        const p = provenanceOf(LIBRARY_PAGE, LIBRARY_PAGE, index.version);
        const text = [
          `${rows.length} template(s)${stage ? ` in stage ${stage}` : ''}:`,
          '',
          ...rows.map((e) => `- ${e.name}: ${e.title} (${e.kind}${e.stageLabel ? `, ${e.stageLabel}` : ''})`),
          footer(p),
        ].join('\n');
        return ok(text, { total: rows.length, templates: rows.map(entryOut), ...p });
      }),
  );

  server.registerTool(
    'get_template',
    {
      title: 'Get a template or schema',
      description:
        'Get one entry of the templates-and-schemas library by name ("policy-card", "impact-assessment", "incident-record", "ai-policy", "raci"), file name or URL: what it records, its lifecycle stage and stack layers, the clauses it helps evidence, and the content of its files. part picks what to return: "schema" (the JSON Schema), "example" (a filled example that validates against it), "template" (the human Markdown template, or the kit files) or "all" (default).',
      inputSchema: z.object({
        name: z.string().min(2).max(200).describe('Template name, file name or URL.'),
        part: z.enum(['all', 'schema', 'example', 'template']).default('all').describe('Which files to return.'),
      }),
      outputSchema: entryShape.extend({
        files: z.array(
          z.object({
            role: z.enum(['schema', 'example', 'template']),
            format: z.string(),
            mediaType: z.string(),
            url: z.string(),
            content: z.string(),
          }),
        ),
        ...provenanceShape,
      }),
      annotations: { title: 'Get a template or schema', ...READ_ONLY },
    },
    async ({ name, part }) =>
      guarded(deps, 'get_template', async () => {
        const entry =
          findTemplate(name) ?? (await liveEntry(name.trim().toLowerCase(), (path) => deps.data.siteText(path)));
        if (!entry) {
          const close = suggest(name, templates().map((e) => e.name));
          return fail(
            `No template "${name}".${close.length > 0 ? ` Closest names: ${close.join(', ')}.` : ''} Use list_templates to see the library.`,
          );
        }
        const wanted = entry.files.filter((f) => part === 'all' || f.role === (part as TemplateFileRole));
        if (wanted.length === 0) {
          return fail(
            `"${entry.name}" has no ${part} file. It has: ${entry.files.map((f) => `${f.role} (${f.path})`).join(', ')}.`,
          );
        }
        const files = await Promise.all(
          wanted.map(async (f) => ({
            role: f.role,
            format: f.format,
            mediaType: MEDIA[f.format] ?? 'text/plain',
            url: `${CANONICAL_SITE}${f.path}`,
            content: await deps.data.siteText(f.path),
          })),
        );
        const primary = files.find((f) => f.role === 'schema') ?? files[0];
        const index = await deps.data.index();
        const p = provenanceOf(primary?.url ?? LIBRARY_PAGE, LIBRARY_PAGE, index.version);
        const fence = (format: string): string => (format === 'markdown' ? 'markdown' : format);
        const text = [
          `${entry.title} (${entry.name}; ${entry.kind === 'schema' ? 'JSON Schema' : 'policy kit'})`,
          '',
          entry.description,
          '',
          entry.stageLabel ? `Stage: ${entry.stageLabel}` : '',
          entry.layers.length > 0 ? `Layers: ${entry.layers.map(layerLabel).join('; ')}` : '',
          entry.evidences.length > 0 ? `Helps evidence (illustrative): ${entry.evidences.join(' · ')}` : '',
          '',
          ...files.map((f) => `### ${f.role}: ${f.url}\n\n\`\`\`\`${fence(f.format)}\n${f.content.trimEnd()}\n\`\`\`\`\n`),
          footer(p),
        ]
          .join('\n')
          .replace(/\n{3,}/g, '\n\n');
        return ok(text, { ...entryOut(entry), files, ...p });
      }),
  );
};
