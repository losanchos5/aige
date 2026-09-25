// seo-md-twins.spec.ts: the HTTP headers of the Markdown twins, the scoped
// /.well-known rule and the IndexNow wiring (SEO round 2, block mdidx: TECHNICAL
// T7, GEO N2/N5/N8, CONTENT N3).
//
// The preview server does not apply _headers, so the rules are replayed here the
// way Cloudflare Pages documents them (developers.cloudflare.com/pages/
// configuration/headers): a URL pattern starts with "/" or "https://"; a splat
// "*" greedily matches any characters (one per rule) and a ":name" placeholder
// matches anything but "/"; every matching rule applies, in file order; a
// "! Name" line removes that header as set by the rules before it; a header set
// again by a later rule is joined to it; ":splat" and ":name" in a value are
// replaced by what they matched. Request-only, like seo-infra.spec.ts: dist is
// read from disk, which is what the preview server serves.
import { test, expect } from '@playwright/test';
import { existsSync, readFileSync, readdirSync, statSync } from 'node:fs';
import { join } from 'node:path';

const ORIGIN = 'https://aigovernanceengineer.com';
const PRELOAD = /^<\/fonts\//;

interface Rule {
  pattern: string;
  re: RegExp;
  set: [string, string][];
  unset: string[];
}

function compile(pattern: string): RegExp {
  const escape = (s: string) => s.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  const source = pattern
    .split('*')
    .map(escape)
    .join('(?<splat>.*)')
    .replace(/:([A-Za-z]\w*)/g, '(?<$1>[^/]+)');
  return new RegExp(`^${source}$`);
}

function parseRules(text: string): Rule[] {
  const rules: Rule[] = [];
  for (const raw of text.replace(/\r/g, '').split('\n')) {
    const line = raw.trim();
    if (line === '' || line.startsWith('#')) continue;
    if (line.startsWith('/') || line.startsWith('https://')) {
      rules.push({ pattern: line, re: compile(line), set: [], unset: [] });
      continue;
    }
    const rule = rules.at(-1);
    if (!rule) throw new Error(`header line before any rule: ${line}`);
    if (line.startsWith('!')) rule.unset.push(line.slice(1).trim().toLowerCase());
    else {
      const i = line.indexOf(':');
      rule.set.push([line.slice(0, i).trim().toLowerCase(), line.slice(i + 1).trim()]);
    }
  }
  return rules;
}

const HEADERS_TEXT = readFileSync(join('dist', '_headers'), 'utf8');
const RULES = parseRules(HEADERS_TEXT);

/** The headers _headers adds to a path, lower-case name to values, and the rules that matched. */
function headersFor(path: string): { headers: Map<string, string[]>; matched: Rule[] } {
  const headers = new Map<string, string[]>();
  const seen = new Set<string>();
  const matched: Rule[] = [];
  for (const rule of RULES) {
    const m = rule.re.exec(path);
    if (!m) continue;
    matched.push(rule);
    for (const name of rule.unset) headers.delete(name);
    for (const [name, value] of rule.set) {
      let v = value;
      for (const [key, sub] of Object.entries(m.groups ?? {})) v = v.split(`:${key}`).join(sub ?? '');
      headers.set(name, seen.has(name) ? [...(headers.get(name) ?? []), v] : [v]);
      seen.add(name);
    }
  }
  return { headers, matched };
}

// A twin rule is one that sends a canonical Link: only those may carry one.
const isTwinRule = (rule: Rule) => rule.set.some(([name, value]) => name === 'link' && /rel="canonical"/.test(value));

function filesUnder(dir: string, ext: string, root = dir): string[] {
  const out: string[] = [];
  for (const name of readdirSync(dir)) {
    const full = join(dir, name);
    if (statSync(full).isDirectory()) out.push(...filesUnder(full, ext, root));
    else if (name.endsWith(ext)) out.push(full.slice(root.length).replace(/\\/g, '/'));
  }
  return out;
}

const htmlFor = (route: string) => existsSync(join('dist', `${route}.html`)) || existsSync(join('dist', route, 'index.html'));
const MD_FILES = filesUnder('dist', '.md');
// A twin is a .md with an HTML page at the same path minus the extension.
const TWINS = MD_FILES.filter((p) => htmlFor(p.replace(/\.md$/, '')));
const NOT_TWINS = MD_FILES.filter((p) => !TWINS.includes(p));
const HTML_ROUTES = filesUnder('dist', '.html').map((p) => p.replace(/\.html$/, '').replace(/\/index$/, '') || '/');

test.describe('_headers: Cloudflare limits', () => {
  test('at most 100 rules, lines under 2,000 characters, one splat per pattern', () => {
    expect(RULES.length).toBeLessThanOrEqual(100);
    for (const line of HEADERS_TEXT.replace(/\r/g, '').split('\n')) expect(line.length).toBeLessThan(2000);
    for (const rule of RULES) expect((rule.pattern.match(/\*/g) ?? []).length, rule.pattern).toBeLessThanOrEqual(1);
  });
});

test.describe('_headers: Markdown twins', () => {
  test('the twins cover every section that serves one', () => {
    expect(TWINS.length).toBeGreaterThanOrEqual(300);
    for (const prefix of ['/bok/', '/patterns/', '/cases/', '/glossary/']) {
      expect(TWINS.some((p) => p.startsWith(prefix)), prefix).toBe(true);
    }
    expect(TWINS).toContain('/thesis.md');
  });

  test(`every twin is noindex, canonical to its HTML page and has no font preload`, () => {
    for (const twin of TWINS) {
      const { headers } = headersFor(twin);
      expect(headers.get('x-robots-tag'), twin).toEqual(['noindex']);
      const page = twin.replace(/\.md$/, '');
      expect(headers.get('link'), twin).toEqual([`<${ORIGIN}${page}>; rel="canonical"`]);
    }
  });

  test('Markdown files that are not twins (template downloads) get no canonical', () => {
    for (const path of NOT_TWINS) {
      const { headers, matched } = headersFor(path);
      expect(matched.filter(isTwinRule).map((r) => r.pattern), path).toEqual([]);
      expect((headers.get('link') ?? []).filter((v) => v.includes('rel="canonical"')), path).toEqual([]);
      expect(headers.get('x-robots-tag') ?? [], path).toEqual([]);
    }
  });

  test('no HTML page, clean or .html, matches a twin rule', () => {
    expect(HTML_ROUTES.length).toBeGreaterThan(500);
    for (const route of HTML_ROUTES) {
      for (const path of route === '/' ? ['/', '/index.html'] : [route, `${route}.html`]) {
        const { headers, matched } = headersFor(path);
        expect(matched.filter(isTwinRule).map((r) => r.pattern), path).toEqual([]);
        expect((headers.get('link') ?? []).filter((v) => v.includes('rel="canonical"')), path).toEqual([]);
      }
    }
  });

  for (const path of [
    '/',
    '/bok/definition',
    '/bok/definition.html',
    '/ai-governance',
    '/patterns/x',
    '/patterns/x.html',
    '/cases/zillow-offers',
    '/glossary/fria',
    '/thesis',
    '/es/thesis',
  ]) {
    test(`${path} stays indexable and keeps its font preloads`, () => {
      const { headers } = headersFor(path);
      expect(headers.get('x-robots-tag') ?? []).toEqual([]);
      expect((headers.get('link') ?? []).join(', ').split(', ').filter((v) => PRELOAD.test(v)).length).toBeGreaterThanOrEqual(2);
    });
  }
});

test.describe('_headers: /.well-known', () => {
  for (const path of ['/.well-known/mcp.json', '/.well-known/mcp/server-card.json']) {
    test(`${path} is served as JSON, CORS-open`, () => {
      expect(existsSync(join('dist', path))).toBe(true);
      const { headers } = headersFor(path);
      expect(headers.get('content-type')).toEqual(['application/json; charset=utf-8']);
      expect(headers.get('access-control-allow-origin')).toEqual(['*']);
    });
  }

  for (const path of ['/.well-known/llms.txt', '/.well-known/security.txt', '/.well-known/missing/x']) {
    test(`${path} (a 404) is not labelled JSON`, () => {
      expect(headersFor(path).headers.get('content-type') ?? []).toEqual([]);
    });
  }
});

test.describe('IndexNow', () => {
  const keys = readdirSync('dist').filter((name) => /^[0-9a-f]{32}\.txt$/.test(name));

  test('one key file at the root whose content is its own name', async ({ request }) => {
    expect(keys).toHaveLength(1);
    const key = keys[0].replace(/\.txt$/, '');
    expect(readFileSync(join('dist', keys[0]), 'utf8').trim()).toBe(key);
    const res = await request.get(`/${key}.txt`);
    expect(res.status()).toBe(200);
    expect((await res.text()).trim()).toBe(key);
  });

  test('deploy.yml submits the sitemap after the deploy, on push to main, without failing it', () => {
    const key = keys[0]?.replace(/\.txt$/, '');
    const yml = readFileSync(join('..', '.github', 'workflows', 'deploy.yml'), 'utf8').replace(/\r/g, '');
    const steps = yml.split(/\n(?= {6}- )/);
    const deploy = steps.findIndex((s) => s.includes('- name: Deploy\n'));
    const ping = steps.findIndex((s) => s.includes('api.indexnow.org/indexnow'));
    expect(deploy).toBeGreaterThan(0);
    expect(ping).toBeGreaterThan(deploy);
    const step = steps[ping];
    expect(step).toContain(`INDEXNOW_KEY: ${key}`);
    expect(step).toContain('INDEXNOW_HOST: aigovernanceengineer.com');
    expect(step).toContain('keyLocation');
    expect(step).toContain('dist/sitemap-0.xml');
    expect(step).toContain('.slice(0, 10000)');
    expect(step).toContain('continue-on-error: true');
    expect(step).toContain("if: github.event_name == 'push' && github.ref == 'refs/heads/main'");
  });
});
