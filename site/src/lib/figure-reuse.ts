// figure-reuse.ts: build-time helpers behind the /figures gallery and the
// /figures/<id> permalink pages. Everything a reader needs to cite or reuse a
// figure is derived here from one place: the figure entry (src/data/figures.ts),
// the exports scripts/figures-build.mjs wrote to public/downloads/figures (file
// names from figureExports), and the chapters the figure is placed in.
//
// The inline art comes from src/figures/<id>.svg, the same file the chapters
// inline, so the permalink shows exactly what the chapter shows. Pages run from
// the site directory (the build cwd), like src/lib/diagrams.ts.
import { existsSync, readFileSync, statSync } from 'node:fs';
import { resolve } from 'node:path';
import GithubSlugger from 'github-slugger';
import { site } from '../data/site';
import { getChapterBySlug, type Chapter } from '../data/chapters';
import type { DiagramPlacement } from '../data/diagrams';
import {
  FIGURE_EXPORT_DIR,
  figureExports,
  figureLicense,
  type FigureDef,
  type FigureExport,
} from '../data/figures';
import { getHeadings, readSource, stripInline } from './md-parse';

const FIGURES_DIR = resolve(process.cwd(), 'src/figures');
const PUBLIC_DIR = resolve(process.cwd(), 'public');

/** Attribution name used in every credit line (the site's author). */
export const FIGURE_AUTHOR = site.authors[0];

/** Absolute permalink of a figure. */
export function figureUrl(id: string): string {
  return `${site.url}/figures/${id}`;
}

/** Whether the figure's art exists on disk (a figure may be declared first). */
export function hasFigureArt(id: string): boolean {
  return existsSync(resolve(FIGURES_DIR, `${id}.svg`));
}

function readArt(id: string): string {
  return readFileSync(resolve(FIGURES_DIR, `${id}.svg`), 'utf8');
}

/** Site path whose page owns the figure's in-SVG #anchors. */
function fragmentBase(figure: FigureDef): string {
  const chapter = figure.placements[0]?.chapter;
  if (chapter) return `/bok/${chapter}`;
  return figure.pages?.[0] ?? `/figures/${figure.id}`;
}

/**
 * The figure SVG for its permalink page: identical to the chapter's, except
 * that same-page #anchors (the pattern map's chips) point at the chapter that
 * holds them, so every link still resolves off the chapter.
 */
export function permalinkSvg(figure: FigureDef): string {
  const base = fragmentBase(figure);
  return readArt(figure.id)
    .replace(/<!--[\s\S]*?-->/g, '')
    .replace(/\bhref="#([^"]*)"/g, (_, frag: string) => `href="${base}#${frag}"`);
}

/**
 * A decorative thumbnail for the gallery card: the same art with its links,
 * ids, title and description removed and aria-hidden, so the card's own
 * heading link is the only focus stop and the page carries no duplicate ids.
 */
export function thumbnailSvg(figure: FigureDef): string {
  return readArt(figure.id)
    .replace(/<!--[\s\S]*?-->/g, '')
    .replace(/<title\b[^>]*>[\s\S]*?<\/title>/g, '')
    .replace(/<desc\b[^>]*>[\s\S]*?<\/desc>/g, '')
    .replace(/<a\b[^>]*>/g, '<g>')
    .replace(/<\/a>/g, '</g>')
    .replace(/\s(?:id|role|aria-labelledby|aria-describedby|tabindex)="[^"]*"/g, '')
    .replace(/<svg\b/, '<svg aria-hidden="true" focusable="false"');
}

// ------------------------------------------------------------- downloads -- //

export interface FigureDownload extends FigureExport {
  /** Site path, e.g. /downloads/figures/art73-clock-v0.5.0-light-1600.png. */
  href: string;
  /** Absolute URL. */
  url: string;
  /** Human label, e.g. "PNG, light, 1600 px wide". */
  label: string;
  /** Size on disk. */
  bytes: number;
  /** Size for people, e.g. "134 KB". */
  size: string;
  /** Pixel size (PNG) or intrinsic size (SVG). */
  pixelWidth: number;
  pixelHeight: number;
}

const human = (bytes: number): string =>
  bytes >= 1024 * 1024 ? `${(bytes / (1024 * 1024)).toFixed(1)} MB` : `${Math.max(1, Math.round(bytes / 1024))} KB`;

function labelOf(entry: FigureExport): string {
  if (entry.format === 'svg') {
    return entry.theme === 'auto' ? 'SVG, follows light or dark' : `SVG, ${entry.theme}`;
  }
  return `PNG, ${entry.theme}, ${entry.width} px wide`;
}

/**
 * The downloads that exist for this build, in figureExports order. A missing
 * file (e.g. `astro dev` before the prebuild ran) is left out, never linked.
 */
export function figureDownloads(figure: FigureDef): FigureDownload[] {
  const out: FigureDownload[] = [];
  let ratio = 0;
  let svgWidth = 0;
  for (const entry of figureExports(figure.id, site.bokVersion)) {
    const href = `${FIGURE_EXPORT_DIR}/${entry.file}`;
    const path = resolve(PUBLIC_DIR, href.replace(/^\/+/, ''));
    if (!existsSync(path)) continue;
    if (entry.format === 'svg' && !ratio) {
      const vb = /viewBox="0 0 ([\d.]+) ([\d.]+)"/.exec(readFileSync(path, 'utf8'));
      if (vb) {
        svgWidth = Number(vb[1]);
        ratio = Number(vb[2]) / svgWidth;
      }
    }
    const bytes = statSync(path).size;
    const pixelWidth = entry.width ?? svgWidth;
    out.push({
      ...entry,
      href,
      url: `${site.url}${href}`,
      label: labelOf(entry),
      bytes,
      size: human(bytes),
      pixelWidth,
      pixelHeight: Math.round(pixelWidth * ratio),
    });
  }
  return out;
}

/** The light PNG at a given width, when it was built. */
export function pngDownload(
  downloads: readonly FigureDownload[],
  theme: 'light' | 'dark',
  width: number,
): FigureDownload | undefined {
  return downloads.find((d) => d.format === 'png' && d.theme === theme && d.width === width);
}

// ------------------------------------------------------------ placements -- //

export interface FigurePlace {
  label: string;
  href: string;
  chapter?: Chapter;
}

const anchorCache = new Map<string, Map<string, string>>();

/** heading text (inline markup stripped) -> the id rehype-slug gives it. */
function chapterAnchors(chapter: Chapter): Map<string, string> {
  const cached = anchorCache.get(chapter.id);
  if (cached) return cached;
  const slugger = new GithubSlugger();
  const map = new Map<string, string>();
  for (const heading of getHeadings(readSource(`bok/${chapter.id}.md`))) {
    if (heading.depth === 1) continue; // the H1 is rendered by the chapter header
    const text = stripInline(heading.text);
    const id = slugger.slug(text);
    if (!map.has(text)) map.set(text, id);
  }
  anchorCache.set(chapter.id, map);
  return map;
}

/** Link and label for one chapter placement (figure or archify diagram). */
export function placementPlace(
  placement: DiagramPlacement,
  figureId?: string,
): FigurePlace | undefined {
  const chapter = getChapterBySlug(placement.chapter);
  if (!chapter) return undefined;
  const heading = placement.at === 'lead' ? undefined : (placement.sub ?? placement.section);
  const anchor = heading ? chapterAnchors(chapter).get(heading) : undefined;
  // An infographic carries id="figure-<id>" in the chapter (rehype-diagrams), so
  // its places deep-link the figure itself; a diagram links its section.
  const target = figureId ? `figure-${figureId}` : anchor;
  return {
    chapter,
    label: heading ? `${chapter.title}, “${heading}”` : `${chapter.title}, opening`,
    href: target ? `/bok/${chapter.slug}#${target}` : `/bok/${chapter.slug}`,
  };
}

/** Every place the figure appears: chapter placements, then site pages. */
export function figurePlaces(figure: FigureDef): FigurePlace[] {
  const places = figure.placements
    .map((placement) => placementPlace(placement, figure.id))
    .filter((place): place is FigurePlace => Boolean(place));
  for (const page of figure.pages ?? []) places.push({ label: `The page ${page}`, href: page });
  return places;
}

// ----------------------------------------------------------- attribution -- //

export interface FigureCredit {
  /** One line of plain-text credit (TASL: title, author, source, licence). */
  text: string;
  /** Ready-to-paste HTML: <figure> with <img> and a <figcaption> credit. */
  html: string;
  /** Ready-to-paste Markdown: image plus an italic credit line. */
  markdown: string;
}

const escHtml = (s: string): string =>
  s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');

/** The credit line and the two embed snippets for a figure. */
export function figureCredit(figure: FigureDef, downloads: readonly FigureDownload[]): FigureCredit {
  const license = figureLicense(figure);
  const page = figureUrl(figure.id);
  const dated = figure.asOf ? `, as of ${figure.asOf}` : '';
  const version = `v${site.bokVersion}`;
  const text =
    `“${figure.title}” by ${FIGURE_AUTHOR}, aigovernanceengineer.com (${page}), ${version}${dated}. ` +
    `Licensed under ${license} (${site.licenseUrl}).`;

  const image = pngDownload(downloads, 'light', 1600) ?? downloads.find((d) => d.format === 'png');
  const src = image?.url ?? `${page}`;
  const width = image ? Math.round(image.pixelWidth / 2) : 800;
  const height = image ? Math.round(image.pixelHeight / 2) : 0;
  const html = [
    '<figure>',
    `  <img src="${src}" alt="${escHtml(figure.alt)}" width="${width}"${height ? ` height="${height}"` : ''} loading="lazy">`,
    '  <figcaption>',
    `    <a href="${page}">${escHtml(figure.title)}</a> by ${escHtml(FIGURE_AUTHOR)},`,
    `    aigovernanceengineer.com, ${version}${dated}.`,
    `    Licensed under <a href="${site.licenseUrl}">${escHtml(license)}</a>.`,
    '  </figcaption>',
    '</figure>',
  ].join('\n');
  const markdown =
    `![${figure.alt.replace(/[[\]]/g, '')}](${src})\n\n` +
    `*[${figure.title}](${page}) by ${FIGURE_AUTHOR}, aigovernanceengineer.com, ${version}${dated}. ` +
    `Licensed under [${license}](${site.licenseUrl}).*`;
  return { text, html, markdown };
}

/**
 * Meta description for a permalink: the one-sentence alt when it fits the
 * 50–160 character snippet window, else the caption's first sentence.
 */
export function figureMetaDescription(figure: FigureDef): string {
  const fits = (s: string) => s.length >= 50 && s.length <= 160;
  if (fits(figure.alt)) return figure.alt;
  const first = /^.*?\.(?=\s|$)/.exec(figure.caption)?.[0] ?? figure.caption;
  if (fits(first)) return first;
  throw new Error(
    `figure-reuse: "${figure.id}" has no alt or first caption sentence of 50–160 characters for its meta description.`,
  );
}
