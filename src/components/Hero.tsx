'use client';

/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect, useRef } from 'react';
import { HERO_MEDIA_ITEMS, HeroMediaItem } from '../data/mediaContent';

interface HeroProps {
  onExploreClick: () => void;
  onOpenAppointment: () => void;
  onNavigatePiece?: (pieceId: string) => void;
  onNavigateSection?: (sectionId: string) => void;
}

const SLIDE_DURATION = 6500; // 6.5 seconds per slide

export function Hero({ onExploreClick, onNavigatePiece, onNavigateSection }: HeroProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const touchStartX = useRef<number | null>(null);
  const touchEndX = useRef<number | null>(null);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  // Auto-advance loop (infinite)
  useEffect(() => {
    timerRef.current = setTimeout(() => {
      setCurrentIndex((prev) => (prev + 1) % HERO_MEDIA_ITEMS.length);
    }, SLIDE_DURATION);

    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, [currentIndex]);

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev - 1 + HERO_MEDIA_ITEMS.length) % HERO_MEDIA_ITEMS.length);
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % HERO_MEDIA_ITEMS.length);
  };

  // Touch controls: sliding left and right
  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    touchEndX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = () => {
    if (!touchStartX.current || !touchEndX.current) return;
    const distance = touchStartX.current - touchEndX.current;
    const minSwipeDistance = 45;

    if (distance > minSwipeDistance) {
      handleNext();
    } else if (distance < -minSwipeDistance) {
      handlePrev();
    }

    touchStartX.current = null;
    touchEndX.current = null;
  };

  const currentMedia = HERO_MEDIA_ITEMS[currentIndex];

  const handleMediaClick = (item: HeroMediaItem) => {
    if (item.targetType === 'piece' && item.pieceId && onNavigatePiece) {
      onNavigatePiece(item.pieceId);
    } else if (onNavigateSection) {
      const target = item.link.replace('#', '');
      onNavigateSection(target);
    }
  };

  return (
    <section
      className="hero relative overflow-hidden select-none cursor-pointer"
      id="hero"
      data-banner="true"
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
      onClick={() => handleMediaClick(currentMedia)}
      title={`Click to explore ${currentMedia.title}`}
    >
      {/* Background Media Banner Display (Without dark fade/vignette overlays) */}
      <div className="absolute inset-0 z-0 bg-[#090807]">
        {HERO_MEDIA_ITEMS.map((slide, idx) => {
          const isActive = idx === currentIndex;

          return (
            <div
              key={slide.id}
              className={`absolute inset-0 transition-opacity duration-1000 ease-out ${
                isActive ? 'opacity-100 pointer-events-auto z-10' : 'opacity-0 pointer-events-none z-0'
              }`}
            >
              {slide.type === 'video' ? (
                <div className="relative w-full h-full overflow-hidden">
                  <video
                    src={slide.src}
                    poster={slide.poster}
                    autoPlay
                    loop
                    muted
                    playsInline
                    className="w-full h-full object-cover filter saturate-[0.95] contrast-[1.05] transition-transform duration-[7000ms] ease-out"
                  />
                </div>
              ) : (
                <div
                  className="w-full h-full bg-cover transition-transform duration-[7000ms] ease-out"
                  style={{
                    backgroundImage: `url("${slide.src}")`,
                    backgroundPosition: slide.id.includes('constellation') ? 'center 28%' : 'center center',
                    transform: isActive ? 'scale(1.04)' : 'scale(1.00)',
                    filter: 'saturate(0.95) contrast(1.05)'
                  }}
                />
              )}
            </div>
          );
        })}
      </div>

      {/* Hero Core Copy (Clean White & Platinum Typography - No Yellow Text) */}
      <div
        className="hero-copy reveal relative z-20 pointer-events-none"
        data-heading-scroll="hero-title"
      >
        <div className="eyebrow text-white/70">Haute Joaillerie · Collection I</div>
        <h1 className="text-white">
          Born
          <br />
          of light.
        </h1>
        <p className="text-white/80">
          A study in platinum, diamond and feminine form. Designed as jewellery first — presented as art.
        </p>
      </div>

      {/* Discover Scroll Action */}
      <div
        className="scroll text-white/70 hover:text-white transition-colors"
        onClick={(e) => {
          e.stopPropagation();
          onExploreClick();
        }}
        role="button"
        tabIndex={0}
      >
        Discover the collection ↓
      </div>
    </section>
  );
}
