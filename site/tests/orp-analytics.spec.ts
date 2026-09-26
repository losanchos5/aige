// orp-analytics.spec.ts: the declarative Umami events of the open reference
// project (OpenSpec change open-reference-project, block orp-analytics-cta).
// Reads the built HTML in dist: no script is involved, Umami reads the
// data-umami-event attributes on click. Every event name on the site stays
// kebab-case and within Umami's 50-character limit, and only links and buttons
// carry one; the control, schema, reference, API and MCP links of /controls,
// both profiles and /frontier carry theirs; the review call (ContributeCta)
// sits on both profiles, the research notes, /frontier, /cases and every case
// with an incident note; the /contribute issue forms carry `contribute`.
import { test, expect } from '@playwright/test';
import { existsSync, readdirSync, readFileSync, statSync } from 'node:fs';
import { join } from 'node:path';
import { profiles, controlsIn, controlApiPath, profilePath } from '../src/data/controls';
import { researchPath, writtenThemes } from '../src/data/research';
import { cases, hasIncidentNote } from '../src/data/cases';

const DIST = 'dist';
const hasDist = existsSync(join(DIST, 'controls.html'));

/** The dist file of a route (build.format 'file'): /a/b -> dist/a/b.html. */
const fileOf = (route: string): string => join(DIST, `${route.replace(/^\//, '')}.html`);
const read = (route: string): string => readFileSync(fileOf(route), 'utf8');
/** The page's <main>: the footer's site map links the datasets on every page with its own `download` event. */
const mainOf = (route: string): string => {
  const html = read(route);
  const start = html.indexOf('<main');
  const end = html.indexOf('</main>');
  expect(start, route).toBeGreaterThanOrEqual(0);
  expect(end, route).toBeGreaterThan(start);
  return html.slice(start, end);
};

interface Tag {
  name: string;
  attrs: Record<string, string>;
}

// Opening tags with their attributes; quoted values may hold '>'.
const TAG = /<([a-zA-Z][\w-]*)((?:\s+[^\s"'=<>/]+(?:\s*=\s*(?:"[^"]*"|'[^']*'|[^\s"'=<>`]+))?)*)\s*\/?>/g;
const ATTR = /([^\s"'=<>/]+)(?:\s*=\s*(?:"([^"]*)"|'([^']*)'|([^\s"'=<>`]+)))?/g;

const decode = (v: string): string =>
  v.replace(/&amp;/g, '&').replace(/&quot;/g, '"').replace(/&#39;/g, "'").replace(/&lt;/g, '<').replace(/&gt;/g, '>');

function tagsOf(html: string): Tag[] {
  const body = html.replace(/<!--[\s\S]*?-->/g, '').replace(/<(script|style)\b[\s\S]*?<\/\1>/gi, '');
  const out: Tag[] = [];
  for (const m of body.matchAll(TAG)) {
    const attrs: Record<string, string> = {};
    for (const a of (m[2] ?? '').matchAll(ATTR)) {
      attrs[a[1].toLowerCase()] = decode(a[2] ?? a[3] ?? a[4] ?? '');
    }
    out.push({ name: m[1].toLowerCase(), attrs });
  }
  return out;
}

const eventTags = (route: string): Tag[] => tagsOf(mainOf(route)).filter((t) => 'data-umami-event' in t.attrs);
const linksTo = (tags: Tag[], href: string): Tag[] => tags.filter((t) => t.name === 'a' && t.attrs.href === href);

function htmlFiles(dir: string): string[] {
  const out: string[] = [];
  for (const entry of readdirSync(dir)) {
    const full = join(dir, entry);
    if (statSync(full).isDirectory()) out.push(...htmlFiles(full));
    else if (entry.endsWith('.html')) out.push(full);
  }
  return out;
}

/** Every event name of the change, as the pages set it. */
const EVENTS = [
  'control-download',
  'schema-download',
  'control-ref-click',
  'api-docs-click',
  'mcp-docs-click',
  'contribute',
] as const;

test.describe('Umami events in dist', () => {
  test.skip(!hasDist, 'dist not built');

  test('every event name is kebab-case, within 50 characters, and only on a link or a button', () => {
    const files = htmlFiles(DIST);
    expect(files.length).toBeGreaterThan(50);
    const offenders: string[] = [];
    for (const file of files) {
      for (const tag of tagsOf(readFileSync(file, 'utf8'))) {
        const name = tag.attrs['data-umami-event'];
        if (name === undefined) continue;
        if (!/^[a-z][a-z0-9]*(?:-[a-z0-9]+)*$/.test(name) || name.length > 50) {
          offenders.push(`${file}: name "${name}"`);
        }
        if (tag.name !== 'a' && tag.name !== 'button') offenders.push(`${file}: <${tag.name}> carries "${name}"`);
      }
    }
    expect(offenders).toEqual([]);
    for (const name of EVENTS) expect(name.length).toBeLessThanOrEqual(50);
  });

  test('/controls: dataset, schemas, API and MCP links carry their events', () => {
    const tags = eventTags('/controls');

    const dataset = linksTo(tags, '/api/v1/controls.json');
    expect(dataset.length).toBeGreaterThan(0);
    for (const t of dataset) {
      expect(t.attrs['data-umami-event']).toBe('control-download');
      expect(t.attrs['data-umami-event-id']).toBe('all');
      expect(t.attrs['data-umami-event-format']).toBe('json');
    }

    const schemas: [string, string][] = [
      ['/api/v1/schemas/controls.json', 'controls'],
      ['/schemas/control-observation.v1.json', 'control-observation'],
      ['/schemas/examples/control-observation.example.json', 'control-observation'],
      ['/templates/control-observation.md', 'control-observation'],
    ];
    for (const [href, schema] of schemas) {
      const links = linksTo(tags, href);
      expect(links.length, href).toBeGreaterThan(0);
      for (const t of links) {
        expect(t.attrs['data-umami-event'], href).toBe('schema-download');
        expect(t.attrs['data-umami-event-schema'], href).toBe(schema);
        expect(t.attrs['data-umami-event-file'], href).toBe(href);
      }
    }

    const api = linksTo(tags, '/resources/data');
    expect(api.length).toBeGreaterThan(0);
    for (const t of api) {
      expect(t.attrs['data-umami-event']).toBe('api-docs-click');
      expect(t.attrs['data-umami-event-from']).toBe('/controls');
    }
    const mcp = linksTo(tags, '/mcp');
    expect(mcp.length).toBeGreaterThan(0);
    for (const t of mcp) {
      expect(t.attrs['data-umami-event']).toBe('mcp-docs-click');
      expect(t.attrs['data-umami-event-from']).toBe('/controls');
    }

    expect(tags.some((t) => t.attrs['data-umami-event'] === 'contribute')).toBe(true);
  });

  for (const profile of profiles) {
    const path = profilePath(profile);

    test(`${path}: every control download, the twin, references, API and review carry their events`, () => {
      const tags = eventTags(path);
      const rows = controlsIn(profile.slug);

      for (const c of rows) {
        const links = linksTo(tags, controlApiPath(c));
        expect(links.length, c.id).toBeGreaterThan(0);
        for (const t of links) {
          expect(t.attrs['data-umami-event'], c.id).toBe('control-download');
          expect(t.attrs['data-umami-event-id'], c.id).toBe(c.id);
          expect(t.attrs['data-umami-event-format'], c.id).toBe('json');
        }
      }

      const twin = linksTo(tags, `${path}.md`);
      expect(twin).toHaveLength(1);
      expect(twin[0].attrs['data-umami-event']).toBe('control-download');
      expect(twin[0].attrs['data-umami-event-id']).toBe(profile.slug);
      expect(twin[0].attrs['data-umami-event-format']).toBe('md');

      const all = tagsOf(mainOf(path));
      const cites = all.filter((t) => t.name === 'a' && /\bcite\b/.test(t.attrs.class ?? '') && /^#src-\d+$/.test(t.attrs.href ?? ''));
      for (const t of cites) {
        expect(t.attrs['data-umami-event'], t.attrs.href).toBe('control-ref-click');
        expect(rows.map((c) => c.id), t.attrs.href).toContain(t.attrs['data-umami-event-control']);
      }
      const referenced = rows.filter((c) => c.references.length > 0);
      if (referenced.length > 0) expect(cites.length).toBeGreaterThan(0);

      const api = linksTo(tags, '/resources/data');
      expect(api.length).toBeGreaterThan(0);
      for (const t of api) expect(t.attrs['data-umami-event-from']).toBe(path);

      const contribute = tags.filter((t) => t.attrs['data-umami-event'] === 'contribute');
      expect(contribute.length).toBeGreaterThanOrEqual(rows.length + 1);
      for (const t of contribute) expect(t.attrs['data-umami-event-kind']).toBe('control');
    });
  }

  test('/frontier: open data, API index and MCP rows carry their events, and the review call', () => {
    const tags = eventTags('/frontier');
    for (const href of ['/resources/data', '/api/v1/index.json']) {
      const links = linksTo(tags, href);
      expect(links.length, href).toBeGreaterThan(0);
      for (const t of links) {
        expect(t.attrs['data-umami-event'], href).toBe('api-docs-click');
        expect(t.attrs['data-umami-event-from'], href).toBe('/frontier');
      }
    }
    const mcp = linksTo(tags, '/mcp');
    expect(mcp.length).toBeGreaterThan(0);
    for (const t of mcp) {
      expect(t.attrs['data-umami-event']).toBe('mcp-docs-click');
      expect(t.attrs['data-umami-event-from']).toBe('/frontier');
    }
    expect(tags.filter((t) => t.attrs['data-umami-event'] === 'contribute').length).toBeGreaterThan(0);
  });

  test('the review call sits on every research note, /cases and every case with an incident note', () => {
    const routes: [string, string][] = [
      ...writtenThemes().map((t): [string, string] => [researchPath(t), 'note']),
      ['/cases', 'incident'],
      ...cases.filter(hasIncidentNote).map((c): [string, string] => [`/cases/${c.id}`, 'incident']),
    ];
    expect(routes.length).toBeGreaterThan(2);
    for (const [route, kind] of routes) {
      const cta = eventTags(route).filter((t) => t.attrs['data-umami-event'] === 'contribute');
      expect(cta.length, route).toBeGreaterThan(0);
      for (const t of cta) expect(t.attrs['data-umami-event-kind'], route).toBe(kind);
    }
  });

  test('/contribute: every issue-form path carries contribute and its kind', () => {
    const forms = eventTags('/contribute').filter((t) => /\/issues\/new\?template=/.test(t.attrs.href ?? ''));
    expect(forms.length).toBeGreaterThanOrEqual(9);
    for (const t of forms) {
      expect(t.attrs['data-umami-event']).toBe('contribute');
      expect(t.attrs['data-umami-event-kind']).toMatch(/^[a-z][a-z-]{0,49}$/);
    }
  });
});
