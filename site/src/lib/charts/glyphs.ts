// glyphs.ts: the glyph vocabulary of VISUAL-GUIDE §1.7, one 24 x 24 icon per
// concept, drawn with the .glyph classes (currentColor strokes, so both themes
// follow the tokens). Shared by the chain primitives (flow.ts) and the
// obligation evidence chain (src/lib/evidence-chain.ts), so the same concept
// keeps the same glyph in every figure: building = the regulator's clause,
// person = a human role, document with a check = the evidence record, diamond
// = the gate (the only diamond in a figure), card = a policy or control.
// No runtime imports.
import { r1, type Tone } from './core';

export type GlyphKind =
  | 'building'
  | 'person'
  | 'calendar'
  | 'package'
  | 'layers'
  | 'evidence'
  | 'card'
  | 'gate'
  | 'warning'
  | 'pipeline'
  | 'magnifier';

export interface GlyphOptions {
  /** 'evidence' only: fill the document with the layer pastel and draw its
   *  outline and check in the layer ink (--lN, --lN-ink). Without it the
   *  document is outlined in ink with the Layer 05 check. */
  tone?: Tone;
}

/** The glyph of `kind` in a 24 x 24 box whose top-left corner is (x, y). */
export function glyph(kind: GlyphKind, x: number, y: number, o: GlyphOptions = {}): string {
  const t = (d: string, cls = 'glyph') => `<path class="${cls}" d="${d}" transform="translate(${r1(x)} ${r1(y)})"/>`;
  switch (kind) {
    case 'building': // the regulator's building
      return t('M2 9 L12 2 L22 9 Z M5 11 v8 M10 11 v8 M14 11 v8 M19 11 v8 M3 21 h18');
    case 'person': // a human role
      return `<circle class="glyph" cx="${r1(x + 12)}" cy="${r1(y + 7)}" r="4"/>${t('M4 22 c0 -6 3.5 -9 8 -9 s8 3 8 9')}`;
    case 'calendar':
      return t('M3 5 h18 v16 h-18 Z M3 10 h18 M8 2 v5 M16 2 v5');
    case 'package': // a build artefact
      return t('M3 7 L12 3 L21 7 V17 L12 21 L3 17 Z M3 7 L12 11 L21 7 M12 11 V21');
    case 'layers': // stacked layers
      return t('M4 5 h16 M4 12 h16 M4 19 h16');
    case 'evidence': {
      // a document with a check
      const doc = 'M5 2 h10 l5 5 v15 h-15 Z M15 2 v5 h5';
      const check = 'M8 14 l3 3 l6 -7';
      if (!o.tone) return `${t(doc)}${t(check, 'glyph-check')}`;
      return `${t(doc, `glyph l${o.tone}-bg l${o.tone}-st`)}${t(check, `glyph-check l${o.tone}-st`)}`;
    }
    case 'card': // a policy or control card
      return t('M4 3 h16 v18 h-16 Z M8 8 h8 M8 12 h8 M8 16 h5');
    case 'gate': // the gate: the one diamond of a figure
      return t('M12 2 L22 12 L12 22 L2 12 Z');
    case 'warning': // a failure or a harm
      return t('M12 3 L22 21 H2 Z M12 10 v5 M12 18 v0.5');
    case 'pipeline': // stages on a track
      return t('M2 12 H22 M4 9 h4 v6 h-4 Z M10 9 h4 v6 h-4 Z M16 9 h4 v6 h-4 Z');
    case 'magnifier': // inspection, a test or an observation
      return `<circle class="glyph" cx="${r1(x + 10)}" cy="${r1(y + 10)}" r="6.5"/>${t('M15 15 L21 21')}`;
  }
}
