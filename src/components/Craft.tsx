/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { CRAFT_MEDIA_ITEMS, CraftMediaItem } from '../data/mediaContent';
import { MediaStoryBanner, MediaStoryItem } from './MediaStoryBanner';

interface CraftProps {
  onNavigatePiece?: (pieceId: string) => void;
  onNavigateSection?: (sectionId: string) => void;
  onOpenAppointment?: () => void;
}

export function Craft({ onNavigatePiece, onNavigateSection, onOpenAppointment }: CraftProps) {
  const handleActionClick = (item: CraftMediaItem) => {
    if (item.targetType === 'piece' && item.pieceId && onNavigatePiece) {
      onNavigatePiece(item.pieceId);
    } else if (item.targetType === 'appointment' && onOpenAppointment) {
      onOpenAppointment();
    } else if (onNavigateSection) {
      const target = item.link.replace('#', '');
      onNavigateSection(target);
    }
  };

  const stories: MediaStoryItem[] = CRAFT_MEDIA_ITEMS.map((item) => ({
    id: item.id,
    media: {
      type: item.type,
      src: item.src,
      poster: item.poster,
      focalPoint: item.id.includes('constellation')
        ? 'center 30%'
        : item.id.includes('elan')
        ? 'left center'
        : 'center center'
    },
    eyebrow: item.eyebrow,
    title: item.title,
    description: item.description,
    specifications: item.specs,
    cta: {
      label: item.linkText,
      onClick: () => handleActionClick(item)
    },
    position: 'right'
  }));

  return <MediaStoryBanner id="craft" stories={stories} position="right" />;
}
