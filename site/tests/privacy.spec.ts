// privacy.spec.ts: /privacy names every third party the site may talk to.
// Each external host the site-wide Content-Security-Policy in public/_headers
// allows, in any directive, must appear, by its registrable domain, in the
// visible text of the built page. Adding a host to the CSP without declaring
// it on /privacy fails here. Read from dist, like seo-titles.spec.ts.
import { test, expect } from '@playwright/test';
import { existsSync, readFileSync } from 'node:fs';
import { join } from 'node:path';

/** Registrable domains of the external hosts the site-wide CSP allows. */
function cspThirdParties(): string[] {
  const block = readFileSync(join('public', '_headers'), 'utf8')
    .replace(/\r/g, '')
    .split(/^(?=\/)/m)
    .find((b) => b.startsWith('/*\n'));
  const csp = block?.split('\n').find((line) => line.includes('Content-Security-Policy:')) ?? '';
  const hosts = (csp.match(/https:\/\/[^\s;]+/g) ?? []).map((s) => new URL(s).hostname.split('.').slice(-2).join('.'));
  return [...new Set(hosts)];
}

/** The visible text of the built page's <main>: tags, and so attributes, removed. */
function privacyText(): string {
  const file = ['dist/privacy.html', 'dist/privacy/index.html'].find((f) => existsSync(f));
  if (!file) throw new Error('no built page for /privacy');
  const page = readFileSync(file, 'utf8');
  const main = page.slice(page.indexOf('<main'), page.indexOf('</main>'));
  return main.replace(/<(script|style)[\s\S]*?<\/\1>/g, ' ').replace(/<[^>]+>/g, ' ');
}

test('/privacy names every external host the CSP allows', () => {
  const domains = cspThirdParties();
  expect(domains.length, 'no external host parsed from the CSP').toBeGreaterThan(0);
  const text = privacyText();
  const missing = domains.filter((domain) => !text.includes(domain));
  expect(missing, 'CSP hosts not named on /privacy').toEqual([]);
});
