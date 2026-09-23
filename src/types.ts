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
