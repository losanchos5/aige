/**
 * The Monet paintings of the editorial-restraint design: the only decorative
 * colour on the site (panel mats, card tops, the wide strip, the feature image,
 * the closing band, the byline frame and the cite card). Every file is public
 * domain; provenance per file is in public/paintings/CREDITS.md.
 *
 * The WebP variants are produced once by scripts/paintings-build.mjs (the hero
 * painting predates it and lives in public/hero/). `variants` lists the files
 * that exist, with their intrinsic size; `color` is the mean colour of the
 * image, shown as the background until the file arrives. Painting.astro is the
 * one place that turns a record into an <img>.
 */

export interface PaintingVariant {
  width: number;
  height: number;
}

/** A tight crop for a thin frame, so the strokes stay legible at a small size. */
export interface PaintingCrop {
  variants: PaintingVariant[];
  objectPosition: string;
  color: string;
}

export type CropName = 'byline' | 'cite';

export interface Painting {
  title: string;
  year: number;
  artist: string;
  /** Wikimedia Commons file page of the downloaded original. */
  commons: string;
  /** The licence as the Commons file page states it. */
  licence: string;
  /** Public folder of the files; each is `${dir}/${file}-${width}.webp`. */
  dir: '/paintings' | '/hero';
  file: string;
  variants: PaintingVariant[];
  objectPosition: string;
  color: string;
  crops?: Partial<Record<CropName, PaintingCrop>>;
}

const ARTIST = 'Claude Monet';
const PD = 'Public domain (PD-Art: Monet died in 1926)';
const MET_CC0 = 'CC0 1.0, Public Domain Dedication (The Metropolitan Museum of Art, Open Access)';

export const paintings = {
  'seine-giverny': {
    title: 'The Seine at Giverny',
    year: 1897,
    artist: ARTIST,
    commons: 'https://commons.wikimedia.org/wiki/File:Claude_Monet,_The_Seine_at_Giverny,_1897,_NGA_46655.jpg',
    licence: 'Public domain (National Gallery of Art, Washington, Open Access)',
    dir: '/hero',
    file: 'monet-seine-giverny-1897',
    variants: [
      { width: 1200, height: 968 },
      { width: 1600, height: 1291 },
      { width: 1920, height: 1550 },
      { width: 2400, height: 1937 },
    ],
    // The closing band's crop; the home hero sets its own in index.astro.
    objectPosition: '50% 58%',
    color: '#b2b19d',
  },
  'morning-seine-giverny': {
    title: 'Morning on the Seine near Giverny',
    year: 1897,
    artist: ARTIST,
    commons: 'https://commons.wikimedia.org/wiki/File:Morning_on_the_Seine_near_Giverny_MET_DT1903.jpg',
    licence: MET_CC0,
    dir: '/paintings',
    file: 'monet-morning-seine-giverny-1897',
    variants: [
      { width: 640, height: 565 },
      { width: 1280, height: 1129 },
    ],
    objectPosition: '50% 50%',
    color: '#6e747b',
    crops: {
      // The blue-green water with yellow and rose flecks.
      byline: {
        variants: [
          { width: 320, height: 98 },
          { width: 640, height: 196 },
        ],
        objectPosition: '50% 50%',
        color: '#506677',
      },
      // The upper river and trees; the card shows the top clear.
      cite: {
        variants: [
          { width: 320, height: 396 },
          { width: 640, height: 791 },
        ],
        objectPosition: '50% 0%',
        color: '#757b82',
      },
    },
  },
  'ice-floes': {
    title: 'Ice Floes',
    year: 1893,
    artist: ARTIST,
    commons: 'https://commons.wikimedia.org/wiki/File:Ice_Floes_MET_DT2158.jpg',
    licence: MET_CC0,
    dir: '/paintings',
    file: 'monet-ice-floes-1893',
    variants: [
      { width: 1200, height: 794 },
      { width: 1600, height: 1059 },
      { width: 2400, height: 1588 },
    ],
    objectPosition: '50% 40%',
    color: '#b3aea9',
  },
  'charing-cross-bridge': {
    title: 'Charing Cross Bridge',
    year: 1899,
    artist: ARTIST,
    commons: 'https://commons.wikimedia.org/wiki/File:Charing_Cross_Bridge,_Monet.jpg',
    licence: PD,
    dir: '/paintings',
    file: 'monet-charing-cross-bridge-1899',
    // The Commons original is 2000px wide, so there is no 2400.
    variants: [
      { width: 1200, height: 975 },
      { width: 1600, height: 1300 },
      { width: 2000, height: 1625 },
    ],
    objectPosition: '50% 50%',
    color: '#acbabc',
  },
  'pourville-cliff-morning': {
    title: 'A Cliff at Pourville in the Morning',
    year: 1897,
    artist: ARTIST,
    commons: 'https://commons.wikimedia.org/wiki/File:MBAM_Monet_-_Falaise_de_Pourville,_le_matin.jpg',
    licence: PD,
    dir: '/paintings',
    file: 'monet-pourville-cliff-morning-1897',
    variants: [
      { width: 640, height: 414 },
      { width: 1280, height: 829 },
    ],
    objectPosition: '50% 50%',
    color: '#a19a8f',
  },
  'pourville-misty-morning': {
    title: 'Misty Morning at Pourville',
    year: 1882,
    artist: ARTIST,
    commons:
      'https://commons.wikimedia.org/wiki/File:Le_Matin_temps_brumeux_Pourville_(1882)_Claude_Monet_-_Birmingham_Museum_of_Art_(W_711).jpg',
    licence: PD,
    dir: '/paintings',
    file: 'monet-pourville-misty-morning-1882',
    variants: [
      { width: 1200, height: 978 },
      { width: 1600, height: 1303 },
      { width: 2400, height: 1955 },
    ],
    objectPosition: '50% 50%',
    color: '#c9ccca',
  },
  'vetheuil-fog': {
    title: 'Vétheuil in the Fog',
    year: 1879,
    artist: ARTIST,
    commons: 'https://commons.wikimedia.org/wiki/File:Monet,_Claude_-_Vetheuil_in_the_Fog.jpg',
    licence: PD,
    dir: '/paintings',
    file: 'monet-vetheuil-fog-1879',
    variants: [
      { width: 640, height: 536 },
      { width: 1280, height: 1072 },
    ],
    objectPosition: '50% 50%',
    color: '#969fa0',
  },
  'vernon-church-fog': {
    title: 'The Church at Vernon, Fog',
    year: 1894,
    artist: ARTIST,
    commons: 'https://commons.wikimedia.org/wiki/File:Monet_-_Kirche_von_Vernon_im_Nebel_-_1894.jpg',
    licence: PD,
    dir: '/paintings',
    file: 'monet-vernon-church-fog-1894',
    // The Commons original is 1275px wide.
    variants: [
      { width: 640, height: 458 },
      { width: 1275, height: 912 },
    ],
    objectPosition: '50% 50%',
    color: '#e1d3e4',
  },
  'antibes-morning': {
    title: 'Morning at Antibes',
    year: 1888,
    artist: ARTIST,
    commons: 'https://commons.wikimedia.org/wiki/File:Morning_at_Antibes_(Claude_Monet,_1888).jpg',
    licence: PD,
    dir: '/paintings',
    file: 'monet-antibes-morning-1888',
    variants: [
      { width: 640, height: 512 },
      { width: 1280, height: 1025 },
    ],
    objectPosition: '50% 50%',
    color: '#a19f95',
  },
} satisfies Record<string, Painting>;

export type PaintingId = keyof typeof paintings;
