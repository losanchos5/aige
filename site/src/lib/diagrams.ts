// diagrams.ts (lib): build-time rendering of an interactive diagram figure from
// the generated SVG (src/generated/diagrams/<id>.svg) and its manifest entry,
// plus the optional per-node notes sidecar (site/diagrams/<id>.notes.json).
//
// `renderDiagramFigure(id)` returns a self-contained <figure> string: the inline
// SVG in a canvas, an empty aria-live note panel that public/diagram.js fills,
// a caption with the title/caption and a link to the full interactive viewer,
// and a JSON payload of per-node { label, sublabel?, note? } the script reads.
// The SVG carries no styles of its own — src/styles/diagrams.css maps the
// archify semantic classes to the site tokens.

import { existsSync, readFileSync } from 'node:fs';
import { resolve } from 'node:path';
import { getDiagram } from '../data/diagrams';

// Resolve from the site directory (the build cwd), not import.meta.url: this
// module runs both at markdown-compile time (rehype, from source) and at page
// render time (bundled into dist/chunks), and only the cwd is stable across
// both. The generated assets live under site/src/generated and site/diagrams.
const GENERATED_DIR = resolve(process.cwd(), 'src/generated/diagrams');
const DIAGRAMS_SRC = resolve(process.cwd(), 'diagrams');
const MANIFEST_PATH = resolve(GENERATED_DIR, 'manifest.json');

interface ManifestNode {
  id: string;
  label: string;
  kind?: string;
  sublabel?: string;
  detail?: string;
  description?: string;
}

interface ManifestEntry {
  id: string;
  type: string;
  title: string;
  nodes: ManifestNode[];
  viewBox: string | null;
}

interface NotePayload {
  label: string;
  sublabel?: string;
  note?: string;
}

let manifestCache: ManifestEntry[] | undefined;

function loadManifest(): ManifestEntry[] {
  if (manifestCache) return manifestCache;
  if (!existsSync(MANIFEST_PATH)) {
    throw new Error(
      `diagrams: manifest not found at ${MANIFEST_PATH}. Run \`npm run diagrams:build\` first.`,
    );
  }
  manifestCache = JSON.parse(readFileSync(MANIFEST_PATH, 'utf8')) as ManifestEntry[];
  return manifestCache;
}

/** Ids of every diagram present in the generated manifest, in manifest order. */
export function diagramIds(): string[] {
  return loadManifest().map((entry) => entry.id);
}

function escapeHtml(value: string): string {
  return value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;');
}

/** Escape for use inside a double-quoted HTML attribute value. */
function escapeAttr(value: string): string {
  return escapeHtml(value).replace(/"/g, '&quot;');
}

// Per-node notes sidecar. The canonical name is `<id>.notes.json`, but some
// diagrams carry the type in the name (`<id>.<type>.notes.json`), so try both.
function loadNotes(id: string, type: string): Record<string, string> {
  const candidates = [
    resolve(DIAGRAMS_SRC, `${id}.notes.json`),
    resolve(DIAGRAMS_SRC, `${id}.${type}.notes.json`),
  ];
  for (const path of candidates) {
    if (!existsSync(path)) continue;
    try {
      const parsed = JSON.parse(readFileSync(path, 'utf8')) as Record<string, unknown>;
      const notes: Record<string, string> = {};
      for (const [key, value] of Object.entries(parsed)) {
        if (typeof value === 'string') notes[key] = value;
      }
      return notes;
    } catch (error) {
      throw new Error(`diagrams: could not parse notes file ${path}: ${String(error)}`);
    }
  }
  return {};
}

/**
 * Render the <figure> for diagram `id` at build time. Throws a clear, actionable
 * error when the generated SVG is missing (regenerate with the build script).
 *
 * With `opts.bare`, the figure gets the extra `diagram--bare` class and emits
 * only the canvas, the note panel and the notes payload — no figcaption and no
 * enlarge dialog. It is the frame-only variant used where the surrounding page
 * supplies its own chrome (e.g. the homepage hero). public/diagram.js still
 * wires the hover/note highlight and the draw-on; it already guards the missing
 * figcaption/enlarge/dialog.
 */
export function renderDiagramFigure(id: string, opts?: { bare?: boolean }): string {
  const bare = opts?.bare === true;
  const entry = loadManifest().find((item) => item.id === id);
  const svgPath = resolve(GENERATED_DIR, `${id}.svg`);
  if (!entry || !existsSync(svgPath)) {
    throw new Error(
      `diagrams: no generated SVG for "${id}" (looked in ${svgPath}). Run \`npm run diagrams:build\`.`,
    );
  }

  // The archify root carries role="img" (a leaf/static role), but the diagram's
  // nodes are focusable role="button" groups. "img with focusable descendants"
  // is an axe nested-interactive violation, so relabel the interactive canvas as
  // role="group" (it keeps its aria-labelledby title/description).
  const svg = readFileSync(svgPath, 'utf8')
    .trim()
    .replace(/<svg\b[^>]*>/, (tag) => tag.replace('role="img"', 'role="group"'));
  const def = getDiagram(id);
  const title = def?.title ?? entry.title;
  const caption = def?.caption ?? '';

  // viewBox width (the third token of "minX minY width height"), exposed as the
  // --vb-w custom property so the enlarge dialog can scale the SVG to its natural
  // pixel width (src/styles/diagrams.css) instead of the shrunk prose-column fit.
  const viewBox = entry.viewBox ?? svg.match(/viewBox="([^"]+)"/)?.[1] ?? null;
  const vbParts = viewBox ? viewBox.trim().split(/[\s,]+/).map(Number) : [];
  const vbWidth = vbParts.length === 4 && Number.isFinite(vbParts[2]) ? vbParts[2] : null;
  const vbStyle = vbWidth ? ` style="--vb-w:${vbWidth}"` : '';

  const notes = loadNotes(id, entry.type);

  // Per-node payload: the label and sublabel from the manifest, plus a note
  // resolved by priority notes.json > detail > description > sublabel.
  const payload: Record<string, NotePayload> = {};
  for (const node of entry.nodes) {
    const note = notes[node.id] ?? node.detail ?? node.description ?? node.sublabel;
    const entryPayload: NotePayload = { label: node.label };
    if (node.sublabel) entryPayload.sublabel = node.sublabel;
    if (note) entryPayload.note = note;
    payload[node.id] = entryPayload;
  }

  // Escape `<` (covers `</script>`) so the JSON stays inside the script element.
  const notesJson = JSON.stringify(payload).replace(/</g, '\\u003c');

  const openTag = `<figure class="diagram${bare ? ' diagram--bare' : ''}" data-diagram="${id}"${vbStyle}>`;
  const canvas = `<div class="diagram-canvas">${svg}</div>`;
  const notePanel = `<div class="diagram-note" aria-live="polite" hidden></div>`;
  const notesScript = `<script type="application/json" data-diagram-notes>${notesJson}</script>`;

  // Enlarge is a no-op without JS (a bare button with no target), so it ships
  // hidden; public/diagram.js reveals it and moves the canvas (button and all)
  // into the dialog, where diagrams.css hides the button again. It overlays the
  // canvas top-right, so it lives inside .diagram-canvas — the frame-only `bare`
  // variant leaves it out and lets the host page own the enlarge chrome.
  const enlargeBtn =
    `<button type="button" class="diagram-enlarge" aria-haspopup="dialog" hidden>` +
    `<span class="diagram-enlarge-icon" aria-hidden="true">⤢</span> Enlarge` +
    `</button>`;
  const canvasWithEnlarge = `<div class="diagram-canvas">${svg}${enlargeBtn}</div>`;

  // Bare: frame only — canvas, note panel and the notes payload, no figcaption
  // and no enlarge dialog. The host page owns the caption/enlarge chrome.
  if (bare) {
    return openTag + canvas + notePanel + notesScript + `</figure>`;
  }

  return (
    openTag +
    canvasWithEnlarge +
    notePanel +
    `<figcaption class="diagram-figcaption">` +
    `<span class="diagram-fig-title">${escapeHtml(title)}</span>` +
    `<span class="diagram-fig-desc">${escapeHtml(caption)}</span>` +
    `<a class="diagram-open" href="/diagrams/${id}.html" target="_blank" rel="noopener">` +
    `Open interactive diagram<span class="diagram-open-hint"> (opens in a new tab)</span>` +
    `</a>` +
    `</figcaption>` +
    notesScript +
    // Empty enlarge dialog; diagram.js relocates .diagram-canvas and .diagram-note
    // into it on open and returns them to the figure on close.
    `<dialog class="diagram-dialog" aria-label="${escapeAttr(title)} (enlarged)"></dialog>` +
    `</figure>`
  );
}
