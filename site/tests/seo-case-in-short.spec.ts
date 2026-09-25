// seo-case-in-short.spec.ts: every case page opens with one self-contained
// "In short" passage (GEO audit 2026-09-25, N4: the chapters and patterns had
// one, the 11 cases did not), and every toolkit page carries the visible byline
// the other reference pages have (CONTENT C4). Pure reads of src data and dist.
import { test, expect } from '@playwright/test';
import { existsSync, readFileSync } from 'node:fs';
import { join } from 'node:path';
import { cases } from '../src/data/cases';
import { tools } from '../src/data/toolkit';

const MIN_WORDS = 130;
const MAX_WORDS = 170;

const words = (text: string) => text.split(/\s+/).filter(Boolean).length;
const plain = (html: string) =>
  html
    .replace(/<[^>]+>/g, ' ')
    .replace(/&#39;|&#x27;/g, "'")
    .replace(/&quot;|&#34;/g, '"')
    .replace(/&amp;/g, '&')
    .replace(/\s+/g, ' ')
    .trim();
const norm = (s: string) => s.toLowerCase().replace(/,/g, '');

test.describe('case "In short": data', () => {
  for (const entry of cases) {
    test(`${entry.id}: ${MIN_WORDS}-${MAX_WORDS} plain words naming its controls and an obligation`, () => {
      const n = words(entry.inShort);
      expect(n, `${n} words`).toBeGreaterThanOrEqual(MIN_WORDS);
      expect(n, `${n} words`).toBeLessThanOrEqual(MAX_WORDS);
      // Plain prose: no citation markers, no em dash, no page-relative phrasing.
      expect(entry.inShort).not.toMatch(/\[\d+\]/);
      expect(entry.inShort).not.toContain('—');
      expect(entry.inShort).not.toMatch(/\bthis (page|case study)\b/i);
      for (const ctl of entry.control.controls) expect(entry.inShort, ctl.name).toContain(ctl.name);
      const text = norm(entry.inShort);
      expect(
        entry.obligations.some((o) => text.includes(norm(o.instrument)) || text.includes(norm(o.ref))),
        'names at least one obligation it touches',
      ).toBe(true);
    });
  }
});

test.describe('case "In short": rendered', () => {
  for (const entry of cases) {
    test(`/cases/${entry.id} shows one In short callout before the first H2`, () => {
      const html = readFileSync(join('dist', 'cases', `${entry.id}.html`), 'utf8');
      const asides = [...html.matchAll(/<aside\b[^>]*data-kind="summary"[^>]*>([\s\S]*?)<\/aside>/g)];
      expect(asides).toHaveLength(1);
      const [whole, inner] = asides[0];
      expect(whole).toMatch(/<aside\b[^>]*class="callout\b/);
      const paras = [...inner.matchAll(/<p\b([^>]*)>([\s\S]*?)<\/p>/g)];
      expect(paras).toHaveLength(2);
      expect(paras[0][1]).toContain('callout-title');
      expect(plain(paras[0][2])).toBe('In short');
      expect(plain(paras[1][2])).toBe(entry.inShort);
      // Inside the prose wrapper that styles it, and before the first section.
      const at = html.indexOf(whole);
      expect(html.lastIndexOf('class="prose', at)).toBeGreaterThan(html.lastIndexOf('data-pagefind-body', at));
      expect(at).toBeLessThan(html.indexOf('<h2'));
    });
  }
});

test.describe('toolkit byline', () => {
  const pages = tools.filter((tool) => existsSync(join('dist', `${tool.href}.html`)));

  test('every live tool page is checked', () => {
    expect(pages.length).toBeGreaterThanOrEqual(10);
  });

  for (const tool of pages) {
    test(`${tool.href} names the author and the date its JSON-LD states`, () => {
      const html = readFileSync(join('dist', `${tool.href}.html`), 'utf8');
      const byline = html.match(/<p\b[^>]*class="byline"[^>]*data-byline[^>]*>([\s\S]*?)<\/p>/);
      expect(byline, 'byline').not.toBeNull();
      expect(byline![1]).toMatch(/<a\b[^>]*rel="author"[^>]*href="\/about"/);
      const date = byline![1].match(/<time\b[^>]*datetime="(\d{4}-\d{2}-\d{2})"/)?.[1];
      expect(date, 'visible <time datetime>').toBeTruthy();
      const app = html.match(/"@type":"WebApplication"[^]*?"dateModified":"(\d{4}-\d{2}-\d{2})"/)?.[1];
      expect(app, 'WebApplication dateModified').toBe(date);
      // In the hero, above the tool.
      expect(html.indexOf(byline![0])).toBeLessThan(html.indexOf('data-tool-page'));
    });
  }
});
