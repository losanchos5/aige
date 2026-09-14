// og.ts: build-time Open Graph image template. Renders a 1200x630 card with
// satori (HTML/CSS -> SVG) and @resvg/resvg-js (SVG -> PNG). Flat and matte to
// match the brand: warm off-white ground, ink text, the five-bar register mark
// in the layer pastels, a mono kicker and a display title. No gradients.
//
// Fonts must be TTF/OTF/WOFF (satori cannot read WOFF2), so we read the static
// weights shipped by the non-variable @fontsource packages (devDependencies).
import satori from 'satori';
import { Resvg } from '@resvg/resvg-js';
import { readFileSync } from 'node:fs';
import { resolve } from 'node:path';
import { site } from '../data/site';

// Fonts are read from node_modules at build time. `astro build`/`astro dev`
// always run from the site root, so resolve against the working directory
// (the module itself gets bundled into dist/, so a module-relative path would
// point at the wrong tree).
function fontFile(pkg: string, file: string): Buffer {
  return readFileSync(resolve(process.cwd(), 'node_modules/@fontsource', pkg, 'files', file));
}

const FONTS = [
  {
    name: 'Bricolage Grotesque',
    data: fontFile('bricolage-grotesque', 'bricolage-grotesque-latin-700-normal.woff'),
    weight: 700 as const,
    style: 'normal' as const,
  },
  {
    name: 'Bricolage Grotesque',
    data: fontFile('bricolage-grotesque', 'bricolage-grotesque-latin-400-normal.woff'),
    weight: 400 as const,
    style: 'normal' as const,
  },
  {
    name: 'JetBrains Mono',
    data: fontFile('jetbrains-mono', 'jetbrains-mono-latin-500-normal.woff'),
    weight: 500 as const,
    style: 'normal' as const,
  },
];

// Palette, taken verbatim from tokens.css (light theme).
const GROUND = '#F6F4EE';
const INK = '#15171C';
const MUTED = '#6B7079';
const LAYERS = ['#CBD8F0', '#CFDCD3', '#EDD4D8', '#F1DAB4', '#D1E4BC'];
const OUTLINE = 'rgba(21, 23, 28, 0.24)'; // ink at 24%, as the mark's hairline

// Minimal hyperscript for satori's element tree (no JSX in a .ts endpoint).
type Node = { type: string; props: Record<string, unknown> };
function h(type: string, props: Record<string, unknown>, ...children: unknown[]): Node {
  return {
    type,
    props: { ...props, children: children.length <= 1 ? children[0] : children },
  };
}

/** The five-bar register mark: pastel layers with a 1px ink hairline. */
function registerMark(): Node {
  return h(
    'div',
    { style: { display: 'flex', flexDirection: 'column', gap: '7px' } },
    ...LAYERS.map((color) =>
      h('div', {
        style: {
          width: '112px',
          height: '14px',
          borderRadius: '4px',
          background: color,
          border: `1px solid ${OUTLINE}`,
        },
      }),
    ),
  );
}

/** Fit the title font to its length so long chapter titles still breathe. */
function titleSize(title: string): number {
  if (title.length > 44) return 58;
  if (title.length > 30) return 70;
  return 88;
}

const KICKER = `aigovernanceengineer.com · Body of Knowledge v${site.bokVersion}`;

function template(title: string): Node {
  return h(
    'div',
    {
      style: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        width: '1200px',
        height: '630px',
        padding: '76px 80px',
        background: GROUND,
        color: INK,
      },
    },
    h(
      'div',
      { style: { display: 'flex', alignItems: 'center', gap: '28px' } },
      registerMark(),
      h(
        'div',
        {
          style: {
            fontFamily: 'Bricolage Grotesque',
            fontWeight: 400,
            fontSize: '30px',
            letterSpacing: '-0.01em',
            color: INK,
          },
        },
        site.name,
      ),
    ),
    h(
      'div',
      { style: { display: 'flex', flexDirection: 'column', gap: '24px' } },
      h(
        'div',
        {
          style: {
            fontFamily: 'JetBrains Mono',
            fontWeight: 500,
            fontSize: '26px',
            letterSpacing: '0.02em',
            color: MUTED,
          },
        },
        KICKER,
      ),
      h(
        'div',
        {
          style: {
            display: 'flex',
            fontFamily: 'Bricolage Grotesque',
            fontWeight: 700,
            fontSize: `${titleSize(title)}px`,
            lineHeight: 1.05,
            letterSpacing: '-0.02em',
            color: INK,
          },
        },
        title,
      ),
    ),
  );
}

/** Render one OG card to a PNG buffer. */
export async function renderOg({ title }: { title: string }): Promise<Buffer> {
  const svg = await satori(template(title) as unknown as never, {
    width: 1200,
    height: 630,
    fonts: FONTS,
  });
  const png = new Resvg(svg, { fitTo: { mode: 'width', value: 1200 } }).render().asPng();
  return png;
}
