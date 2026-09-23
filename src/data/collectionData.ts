/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export interface CollectionPiece {
  id: string;
  number: string;
  title: string;
  frenchTitle: string;
  category: 'Collier' | 'Bague' | 'Boucles d’Oreilles' | 'Manchette' | 'Haute Horlogerie';
  meta: string;
  metal: string;
  stones: string;
  carats: string;
  cut: string;
  colorClarity: string;
  setting: string;
  dimensions: string;
  weight: string;
  provenance: string;
  headline: string;
  description: string;
  image: string;
  detailImage: string;
  angleView: string;
  hallmark: string;
  craftHours: number;
}

export const AURELIA_COLLECTION: CollectionPiece[] = [
  {
    id: 'elan-de-lumiere',
    number: '01 / 04',
    title: 'Élan de Lumière',
    frenchTitle: 'Plastron Foliacé Haute Parure',
    category: 'Collier',
    meta: 'Platinum · White Diamonds',
    metal: '950/1000 Cold-Hammered Platinum',
    stones: '94 Marquise & 210 Round Brilliant Diamonds',
    carats: '84.60 cts total weight',
    cut: 'Marquise & Modified Pear Brilliant',
    colorClarity: 'D-E Color, Flawless to VVS1, Type IIa',
    setting: 'Micro-claw & articulated invisible hinges',
    dimensions: 'Circumference 38 cm (Drop 72 mm)',
    weight: '142.4 grams Platinum',
    provenance: 'Place Vendôme Atelier, Paris — Pièce Unique 2026',
    headline: 'An architectural cascade of marquise and brilliant-cut diamonds draped like liquid silk.',
    description: 'Sculpted over 1,420 hours in our Parisian atelier, Élan de Lumière translates the fluidity of couture silk into flexible 950 platinum links. Each marquise diamond is calibrated to reflect light at varying angles, creating an undulating luminescence with the wearer’s movement.',
    image: '/jewelry-hero.png',
    detailImage: '/IMG_20260921_000911.png',
    angleView: '/IMG_20260921_000911.png',
    hallmark: 'Poinçon Tête de Mascaron & Maître Orfèvre Aurelia',
    craftHours: 1420
  },
  {
    id: 'celeste-arc',
    number: '02 / 04',
    title: 'Celeste Arc',
    frenchTitle: 'Solitaire Architecture Knife-Edge',
    category: 'Bague',
    meta: 'Platinum · Brilliant Cut',
    metal: 'Hand-Forged 950 Platinum',
    stones: 'Single D-Flawless Brilliant Solitaire + Pavé Bridge',
    carats: '11.45 cts (Center Stone: 9.80 cts)',
    cut: 'Triple Excellent Round Brilliant & Baguette shoulders',
    colorClarity: 'D Color, Flawless, Nil Fluorescence',
    setting: 'Minimalist knife-edge tension mount',
    dimensions: 'Ring Size 52 (Bespoke Sizing Available)',
    weight: '18.6 grams Platinum',
    provenance: 'Place Vendôme Atelier, Paris — Pièce Unique 2026',
    headline: 'A monumental center diamond held in structural equilibrium above an open air gallery.',
    description: 'Celeste Arc challenges classical solitaire mounting by suspending an unheated D-Flawless diamond in tension over a tapered knife-edge platinum band. Light enters through all facets unobstructed by under-bezels.',
    image: '/bague-celeste.png',
    detailImage: '/IMG_20260921_000911.png',
    angleView: '/bague-celeste.png',
    hallmark: 'Poinçon d’État Platine & Gravure Archive N° 02-26',
    craftHours: 680
  },
  {
    id: 'nocturne',
    number: '03 / 04',
    title: 'Nocturne',
    frenchTitle: 'Pendants d’Oreilles Articulés',
    category: 'Boucles d’Oreilles',
    meta: 'Platinum · Marquise Diamonds',
    metal: '950 Platinum & 18K White Gold Secure Posts',
    stones: 'Matched Pair of Pear-Cuts & 48 Foliage Marquises',
    carats: '16.80 cts total weight (Matched Pairs 5.20 cts each)',
    cut: 'Modified Pear Brilliant & Marquise Cut',
    colorClarity: 'D-VVS1, Triple-Ex Symmetry',
    setting: 'Articulated three-prong micro-cradle',
    dimensions: 'Drop length 58 mm',
    weight: '24.2 grams pair',
    provenance: 'Place Vendôme Atelier, Paris — Pièce Unique 2026',
    headline: 'Twin pear-cut diamond drops swinging with whisper-quiet articulation.',
    description: 'Matched over four years to achieve exact optical resonance and crystalline clarity, the Nocturne pendants sway freely from articulated platinum leaves, capturing natural twilight and candlelit luminescence.',
    image: '/earrings-nocturne.png',
    detailImage: '/IMG_20260921_000911.png',
    angleView: '/earrings-nocturne.png',
    hallmark: 'Poinçon d’État Platine & Signature Aurelia',
    craftHours: 890
  },
  {
    id: 'divine-line',
    number: '04 / 04',
    title: 'Constellation Divine',
    frenchTitle: 'Haute Création Pièce Unique 2026',
    category: 'Manchette',
    meta: 'Platinum · Calibrated Diamonds',
    metal: 'Cold-Formed Monobloc 950 Platinum',
    stones: '72 Pear-Cut & 140 Calibrated Diamonds',
    carats: '46.20 cts total weight',
    cut: 'Calibrated Pear & Marquise Cut Fringe',
    colorClarity: 'D-E Color, VVS1, Type IIa',
    setting: 'Seamless articulated setting with floating diamond cascade',
    dimensions: 'Custom bespoke proportions',
    weight: '98.5 grams Platinum',
    provenance: 'Place Vendôme Atelier, Paris — Pièce Unique 2026',
    headline: 'An unbroken tessellation of platinum and diamonds creating a sculpture of pure refracted fire.',
    description: 'Sculpted with uncompromising mastery in our Parisian atelier, Constellation Divine wraps the wearer in cold-hammered 950 platinum with calibrated diamonds that rest flush against the skin, capturing twilight brilliance from every angle.',
    image: '/IMG_20260921_000911.png',
    detailImage: '/IMG_20260921_000911.png',
    angleView: '/IMG_20260921_000911.png',
    hallmark: 'Poinçon Mascaron & Gravure Maître Atelier N° 04-26',
    craftHours: 1140
  }
];

export interface BoutiqueSalon {
  city: string;
  flagship: string;
  address: string;
  postalCode: string;
  phone: string;
  email: string;
  concierge: string;
  hours: string;
}

export const BOUTIQUE_SALONS: BoutiqueSalon[] = [
  {
    city: 'Paris',
    flagship: 'Maison Mère & Ateliers',
    address: '26 Place Vendôme',
    postalCode: '75001 Paris, France',
    phone: '+33 1 42 68 00 24',
    email: 'vendome@aurelia-joaillerie.fr',
    concierge: 'M. Henri de Rochefort — Directeur des Salons',
    hours: 'Sur rendez-vous privé — Lundi au Samedi, 10h00 - 19h00'
  },
  {
    city: 'London',
    flagship: 'Mayfair Salon Privé',
    address: '14 New Bond Street',
    postalCode: 'London W1S 3SX, United Kingdom',
    phone: '+44 20 7499 1892',
    email: 'bondstreet@aurelia-joaillerie.com',
    concierge: 'Lady Caroline Spencer — Private Client Director',
    hours: 'By Private Appointment — Monday to Saturday, 10:00 - 18:30'
  },
  {
    city: 'New York',
    flagship: 'Fifth Avenue Penthouse Salon',
    address: '745 Fifth Avenue, 22nd Floor',
    postalCode: 'New York, NY 10151, United States',
    phone: '+1 212 588 3310',
    email: 'fifthavenue@aurelia-joaillerie.com',
    concierge: 'Ms. Eleanor Vance — Vice President, Americas',
    hours: 'By Private Appointment — Tuesday to Saturday, 10:00 - 19:00'
  },
  {
    city: 'Tokyo',
    flagship: 'Ginza Maison & Tea Salon',
    address: '6-10-1 Ginza, Chuo-ku',
    postalCode: 'Tokyo 104-0061, Japan',
    phone: '+81 3 6280 4400',
    email: 'ginza@aurelia-joaillerie.jp',
    concierge: 'Mr. Kenjiro Takahashi — Managing Director, Asia Pacific',
    hours: '完全予約制 — Wednesday to Monday, 11:00 - 19:30'
  },
  {
    city: 'Geneva',
    flagship: 'Salon Privé & Haute Horlogerie',
    address: '38 Rue du Rhône',
    postalCode: '1204 Genève, Switzerland',
    phone: '+41 22 818 2000',
    email: 'geneve@aurelia-joaillerie.ch',
    concierge: 'M. Jean-Luc Morand — Horlogerie & High Jewelry Liaison',
    hours: 'Sur rendez-vous — Mardi au Samedi, 09:30 - 18:30'
  },
  {
    city: 'Zurich',
    flagship: 'Private Vaults & Salon',
    address: '42 Bahnhofstrasse',
    postalCode: '8001 Zürich, Switzerland',
    phone: '+41 44 215 5000',
    email: 'zurich@aurelia-joaillerie.ch',
    concierge: 'Dr. Beatrix Von Berg — European Private Collector Liaison',
    hours: 'By Private Appointment — Monday to Friday, 09:00 - 18:00'
  }
];

export const BUSINESS_REGISTRY = {
  legalName: 'Aurelia Haute Joaillerie S.A.S.',
  capital: '12 500 000 €',
  rcs: 'RCS Paris B 482 910 338',
  vat: 'FR 82 482910338',
  siret: '482 910 338 00024',
  nafCode: '3212Z — Fabrication d’articles de joaillerie et bijouterie',
  guaranteeOffice: 'Garantie de Paris — Poinçon de Maître Enregistré',
  ethics: [
    'Responsible Jewellery Council (RJC) Certified Member #RJC-2024-884',
    'Kimberley Process Certification Scheme (KPCS) Fully Compliant',
    'World Diamond Council (WDC) System of Warranties Certified',
    '100% Recycled & Ethical 950 Platinum Provenance Assurance',
    'United Nations Global Compact Signatory on Fair Labor'
  ],
  pressEmail: 'presse@aurelia-joaillerie.fr',
  conciergeEmail: 'concierge@aurelia-joaillerie.fr',
  heritageArchive: 'Archives Historiques & Patrimoine Aurelia — Place Vendôme'
};
