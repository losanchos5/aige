// book-spine.ts: the data of the three BookSpine visuals (OpenSpec
// page-visuals-2, block E), drawn with the kit's bookSpine:
//
//   bokSpineParts      /bok: reading minutes per chapter (bars), the minutes
//                      the page already prints on each chapter card
//   figureAtlasParts   /figures: one mark per figure (shape by kind) and per
//                      archify diagram, in the chapter the gallery files it
//                      under (its first placement), linked to that group
//   figureSpineParts   /figures/<id>: the chapters the figure appears in,
//                      highlighted and linked to the figure in the chapter
//
// The parts and their order are the book's (chapters.ts chapterParts); part
// tints are the kit's neutral inks, never a layer colour. Nothing adds a fact.
import { chapterParts, chaptersOrdered, type Chapter } from '../../data/chapters';
import { diagrams } from '../../data/diagrams';
import { figureKind, figures, type FigureDef, type FigureKind } from '../../data/figures';
import { figurePlaces, hasFigureArt } from '../figure-reuse';
import type { SpineMark, SpinePart } from '../charts';

const partsOf = (chapter: (c: Chapter) => SpinePart['chapters'][number]): SpinePart[] =>
  chapterParts.map((part) => ({
    label: part.title,
    chapters: chaptersOrdered.filter((c) => c.part === part.id).map(chapter),
  }));

/** /bok: reading minutes per chapter; `minutes` is keyed by chapter id. */
export function bokSpineParts(minutes: ReadonlyMap<string, number>): SpinePart[] {
  return partsOf((c) => ({
    num: c.order,
    label: c.shortTitle,
    href: `/bok/${c.slug}`,
    value: minutes.get(c.id) ?? 1,
  }));
}

/** The gallery's anchor for a chapter's group of cards. */
export const galleryGroupId = (slug: string) => `fg-ch-${slug}`;

const KIND_MARKS: readonly { kind: FigureKind; label: string; shape: SpineMark['shape'] }[] = [
  { kind: 'infographic', label: 'Infographic', shape: 'circle' },
  { kind: 'data-viz', label: 'Data visualisation', shape: 'square' },
  { kind: 'poster', label: 'Poster', shape: 'diamond' },
];
const firstChapter = (placements: readonly { chapter: string }[]) => placements[0]?.chapter;

/** The figures the gallery shows (those with their art in this build). */
export const galleryFigures = (): FigureDef[] => figures.filter((f) => hasFigureArt(f.id));

/** /figures: figures by kind and diagrams per chapter, filed as the gallery files them. */
export function figureAtlasParts(): SpinePart[] {
  const built = galleryFigures();
  return partsOf((c) => {
    const figs = built.filter((f) => firstChapter(f.placements) === c.slug);
    const diags = diagrams.filter((d) => firstChapter(d.placements) === c.slug);
    return {
      num: c.order,
      label: c.shortTitle,
      href: figs.length || diags.length ? `#${galleryGroupId(c.slug)}` : undefined,
      marks: [
        ...KIND_MARKS.map((k) => ({
          shape: k.shape,
          label: k.label,
          count: figs.filter((f) => figureKind(f) === k.kind).length,
        })),
        { shape: 'triangle' as const, label: 'Interactive diagram', count: diags.length },
      ],
    };
  });
}

/** /figures/<id>: the chapters the figure appears in; null when it sits in none. */
export function figureSpineParts(figure: FigureDef): SpinePart[] | null {
  const places = figurePlaces(figure).filter((place) => place.chapter);
  if (!places.length) return null;
  return partsOf((c) => {
    const place = places.find((p) => p.chapter!.id === c.id);
    return { num: c.order, label: c.shortTitle, highlight: Boolean(place), href: place?.href };
  });
}
