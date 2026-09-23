/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export interface HeroMediaItem {
  id: string;
  type: 'image' | 'video';
  src: string;
  poster?: string;
  title: string;
  link: string; // Target section or piece to navigate to
  targetType: 'section' | 'piece' | 'appointment';
  pieceId?: string;
}

export interface CraftSpec {
  label: string;
  value: string;
}

export interface CraftMediaItem {
  id: string;
  type: 'image' | 'video';
  src: string;
  poster?: string;
  eyebrow: string;
  title: string;
  description: string;
  specs: CraftSpec[];
  link: string;
  linkText: string;
  targetType: 'section' | 'piece' | 'appointment';
  pieceId?: string;
}

/**
 * Hero Section Media Content
 * Clickable banner items linking directly to collections, atelier, and bespoke salons
 */
export const HERO_MEDIA_ITEMS: HeroMediaItem[] = [
  {
    id: 'constellation-divine-hero',
    type: 'image',
    src: '/IMG_20260921_000911.png',
    title: 'Constellation Divine',
    link: '#collection',
    targetType: 'piece',
    pieceId: 'divine-line'
  },
  {
    id: 'savoir-faire-film-hero',
    type: 'video',
    src: '/jewelry-cinematic.webm',
    poster: '/jewelry-hero.png',
    title: 'Film Cinématique Atelier',
    link: '#craft',
    targetType: 'section'
  },
  {
    id: 'elan-de-lumiere-hero',
    type: 'image',
    src: '/jewelry-hero.png',
    title: 'Élan de Lumière',
    link: '#collection',
    targetType: 'piece',
    pieceId: 'elan-de-lumiere'
  },
  {
    id: 'celeste-arc-hero',
    type: 'image',
    src: '/bague-celeste.png',
    title: 'Celeste Arc',
    link: '#collection',
    targetType: 'piece',
    pieceId: 'celeste-arc'
  },
  {
    id: 'nocturne-hero',
    type: 'image',
    src: '/earrings-nocturne.png',
    title: 'Nocturne Pendants',
    link: '#collection',
    targetType: 'piece',
    pieceId: 'nocturne'
  }
];

/**
 * Second Banner (Craft & Creation Showcase) Media Content
 * Interactive multi-media slider with touch controls, infinite loop,
 * background image blend at the right side, and synchronized editorial copy.
 */
export const CRAFT_MEDIA_ITEMS: CraftMediaItem[] = [
  {
    id: 'craft-elan',
    type: 'image',
    src: '/IMG_20260921_000911.png',
    eyebrow: '02 — THE CRAFT',
    title: 'Made with\nobsession.',
    description:
      'True excellence is never accidental. From the rarest gems to the smallest detail, each Aurelia creation is a result of relentless pursuit — a harmony of heritage, precision and a deeper love for beauty.',
    specs: [
      { label: 'GEMS', value: 'Japanese cultured pearls' },
      { label: 'METAL', value: '950 platinum & natural diamonds' },
      { label: 'CRAFT', value: 'Meticulously hand-finished' },
      { label: 'ORIGIN', value: 'Atelier Aurelia France' }
    ],
    link: '#collection',
    linkText: 'EXPLORE ÉLAN DE LUMIÈRE →',
    targetType: 'piece',
    pieceId: 'elan-de-lumiere'
  },
  {
    id: 'craft-atelier-video',
    type: 'video',
    src: '/jewelry-cinematic.webm',
    poster: '/jewelry-hero.png',
    eyebrow: '02 — The Craft',
    title: 'Sculpting\nthe invisible.',
    description:
      'In our Place Vendôme atelier, master joailliers pierce cold-hammered platinum by hand. Each articulated link flexes like liquid silk, allowing light to cascade across 94 marquise-cut stones with zero visible mounting metal.',
    specs: [
      { label: 'Atelier Hours', value: '1,420 Hours Hand-Sculpted' },
      { label: 'Provenance', value: '26 Place Vendôme, Paris' },
      { label: 'Tolerance', value: '0.02 mm Articulation Gap' },
      { label: 'Savoir-Faire', value: 'Maître Orfèvre & Gemmologue' }
    ],
    link: '#atelier',
    linkText: 'Discover The Parisian Atelier →',
    targetType: 'section'
  },
  {
    id: 'craft-constellation',
    type: 'image',
    src: '/jewelry-hero.png',
    eyebrow: '02 — The Craft',
    title: 'Light, metal\n& anatomy.',
    description:
      'Constellation Divine explores the boundary between high jewellery and anatomical sculpture. Cold-hammered 950 platinum embraces 46.20 carats of natural D-Flawless diamonds, engineered to move seamlessly with the body.',
    specs: [
      { label: 'Metal', value: 'Cold-Formed Monobloc 950 Platinum' },
      { label: 'Diamonds', value: '72 Pear-Cut & 140 Calibrated Stones' },
      { label: 'Setting', value: 'Articulated tension suspension' },
      { label: 'Edition', value: 'Pièce Unique 2026' }
    ],
    link: '#collection',
    linkText: 'View Constellation Divine →',
    targetType: 'piece',
    pieceId: 'divine-line'
  },
  {
    id: 'craft-celeste',
    type: 'image',
    src: '/bague-celeste.png',
    eyebrow: '02 — The Craft',
    title: 'Equilibrium\nin tension.',
    description:
      'A monumental 9.80-carat D-Flawless diamond held in architectural suspension above an open-air knife-edge gallery. Unencumbered by traditional under-bezels, ambient light enters every facet without obstruction.',
    specs: [
      { label: 'Center Stone', value: '9.80 cts D-Flawless Brilliant' },
      { label: 'Mounting', value: 'Knife-Edge Tapered Platinum' },
      { label: 'Clarity', value: 'Flawless Type IIa · Nil Fluorescence' },
      { label: 'Craft Hours', value: '680 Hours Hand-Forged' }
    ],
    link: '#collection',
    linkText: 'Explore Celeste Arc Solitaire →',
    targetType: 'piece',
    pieceId: 'celeste-arc'
  }
];
