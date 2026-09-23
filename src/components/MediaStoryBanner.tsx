/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect, useRef } from 'react';

export interface MediaSpecification {
  label: string;
  value: string;
}

export interface MediaStoryItem {
  id: string;
  media: {
    type?: 'image' | 'video';
    src: string;
    poster?: string;
    focalPoint?: string;
  };
  eyebrow?: string;
  title: string;
  description: string;
  specifications?: MediaSpecification[];
  cta?: {
    label: string;
    onClick?: () => void;
    href?: string;
  };
  position?: 'left' | 'right';
}

export interface MediaStoryBannerProps {
  id?: string;
  story?: MediaStoryItem;
  stories?: MediaStoryItem[];
  media?:
    | {
        type?: 'image' | 'video';
        src: string;
        poster?: string;
        focalPoint?: string;
      }
    | string;
  eyebrow?: string;
  title?: string;
  description?: string;
  specifications?: MediaSpecification[];
  cta?: {
    label: string;
    onClick?: () => void;
    href?: string;
  };
  position?: 'left' | 'right';
  className?: string;
}

const DEFAULT_SLIDE_DURATION = 7500;

export function MediaStoryBanner({
  id = 'craft',
  story,
  stories,
  media,
  eyebrow,
  title,
  description,
  specifications,
  cta,
  position = 'right',
  className = ''
}: MediaStoryBannerProps) {
  // Normalize items array
  const storyItems: MediaStoryItem[] = stories && stories.length > 0
    ? stories
    : story
    ? [story]
    : [
        {
          id: 'story-primary',
          media:
            typeof media === 'string'
              ? { type: 'image', src: media }
              : media || { type: 'image', src: '/jewelry-hero.png' },
          eyebrow: eyebrow || '02 — THE CRAFT',
          title: title || 'Made with\nobsession.',
          description:
            description ||
            'True excellence is never accidental. From the rarest gems to the smallest detail, each Aurelia creation is a result of relentless pursuit — a harmony of heritage, precision and a deeper love for beauty.',
          specifications: specifications || [
            { label: 'GEMS', value: 'Japanese cultured pearls' },
            { label: 'METAL', value: '950 platinum & natural diamonds' },
            { label: 'CRAFT', value: 'Meticulously hand-finished' },
            { label: 'ORIGIN', value: 'Atelier Aurelia France' }
          ],
          cta: cta || {
            label: 'EXPLORE ÉLAN DE LUMIÈRE →'
          },
          position: position
        }
      ];

  const [currentIndex, setCurrentIndex] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const touchStartX = useRef<number | null>(null);
  const touchEndX = useRef<number | null>(null);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  const activeItem = storyItems[currentIndex] || storyItems[0];
  const activePosition = activeItem.position || position || 'right';

  // Auto-advance loop when multiple stories are present
  useEffect(() => {
    if (storyItems.length <= 1) return;

    timerRef.current = setTimeout(() => {
      handleNext();
    }, DEFAULT_SLIDE_DURATION);

    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, [currentIndex, storyItems.length]);

  const changeSlide = (newIndex: number) => {
    setIsTransitioning(true);
    setTimeout(() => {
      setCurrentIndex(newIndex);
      setIsTransitioning(false);
    }, 280);
  };

  const handlePrev = () => {
    if (storyItems.length <= 1) return;
    const nextIdx = (currentIndex - 1 + storyItems.length) % storyItems.length;
    changeSlide(nextIdx);
  };

  const handleNext = () => {
    if (storyItems.length <= 1) return;
    const nextIdx = (currentIndex + 1) % storyItems.length;
    changeSlide(nextIdx);
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

  const handleCtaClick = (e: React.MouseEvent) => {
    if (activeItem.cta?.onClick) {
      e.preventDefault();
      activeItem.cta.onClick();
    }
  };

  return (
    <section
      id={id}
      data-banner="true"
      className={`media-story-banner relative w-full overflow-hidden select-none bg-[#070605] ${className}`}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
      aria-label="Editorial Media Story Banner"
    >
      {/* 
        TWO SEPARATE PARTS SIDE BY SIDE:
        - Left side: Image presentation
        - Right side: Text panel
        - In the middle: Seamless bled / mix blend with NO solid separation line
      */}
      <div
        className={`relative w-full min-h-[92vh] sm:min-h-[96vh] lg:min-h-screen flex flex-col ${
          activePosition === 'left' ? 'lg:flex-row-reverse' : 'lg:flex-row'
        } items-stretch`}
      >
        {/* 
          1. LEFT SIDE IMAGE PORTION:
          Prominently displays the jewelry photograph or cinematic film.
          The edge facing the text panel is feathered and smoothly bled using both 
          mask-image and an overlay gradient into the dark background of the text panel.
          NO hard cut, NO vertical divider line.
        */}
        <div className="relative w-full lg:w-[56%] xl:w-[58%] min-h-[52vh] sm:min-h-[62vh] lg:min-h-full flex items-center justify-center overflow-hidden">
          {/* Media Container with soft feather mask */}
          <div
            className="absolute inset-0 w-full h-full"
            style={{
              WebkitMaskImage:
                activePosition === 'right'
                  ? 'linear-gradient(to right, rgba(0,0,0,1) 0%, rgba(0,0,0,1) 52%, rgba(0,0,0,0.85) 68%, rgba(0,0,0,0.3) 86%, rgba(0,0,0,0) 100%)'
                  : 'linear-gradient(to left, rgba(0,0,0,1) 0%, rgba(0,0,0,1) 52%, rgba(0,0,0,0.85) 68%, rgba(0,0,0,0.3) 86%, rgba(0,0,0,0) 100%)',
              maskImage:
                activePosition === 'right'
                  ? 'linear-gradient(to right, rgba(0,0,0,1) 0%, rgba(0,0,0,1) 52%, rgba(0,0,0,0.85) 68%, rgba(0,0,0,0.3) 86%, rgba(0,0,0,0) 100%)'
                  : 'linear-gradient(to left, rgba(0,0,0,1) 0%, rgba(0,0,0,1) 52%, rgba(0,0,0,0.85) 68%, rgba(0,0,0,0.3) 86%, rgba(0,0,0,0) 100%)'
            }}
          >
            {storyItems.map((item, idx) => {
              const isActive = idx === currentIndex;
              const isVideo = item.media.type === 'video';

              return (
                <div
                  key={item.id || idx}
                  className={`absolute inset-0 transition-opacity duration-1000 ease-out ${
                    isActive ? 'opacity-100 z-10' : 'opacity-0 z-0'
                  }`}
                >
                  {isVideo ? (
                    <video
                      src={item.media.src}
                      poster={item.media.poster}
                      autoPlay
                      loop
                      muted
                      playsInline
                      className="w-full h-full object-cover filter contrast-[1.05] saturate-[0.98]"
                      style={{
                        objectPosition: item.media.focalPoint || 'center center'
                      }}
                    />
                  ) : (
                    <div
                      className="w-full h-full bg-cover transition-transform duration-[7000ms] ease-out"
                      style={{
                        backgroundImage: `url("${item.media.src}")`,
                        backgroundPosition: item.media.focalPoint || 'left 25%',
                        transform: isActive ? 'scale(1.02)' : 'scale(1.00)',
                        filter: 'contrast(1.05) saturate(0.98)'
                      }}
                    />
                  )}
                </div>
              );
            })}
          </div>

          {/* 
            BLED / MIX BLEND OVERLAY:
            Seamlessly blends the image into #070605 without any abrupt boundary or line
          */}
          {/* Desktop blend into adjacent panel */}
          <div
            className="hidden lg:block absolute inset-0 pointer-events-none z-20"
            style={{
              background:
                activePosition === 'right'
                  ? 'linear-gradient(to right, transparent 0%, transparent 45%, rgba(7, 6, 5, 0.2) 60%, rgba(7, 6, 5, 0.6) 76%, rgba(7, 6, 5, 0.92) 90%, #070605 100%)'
                  : 'linear-gradient(to left, transparent 0%, transparent 45%, rgba(7, 6, 5, 0.2) 60%, rgba(7, 6, 5, 0.6) 76%, rgba(7, 6, 5, 0.92) 90%, #070605 100%)'
            }}
          />

          {/* Mobile vertical blend: dissolves image downward into text panel */}
          <div
            className="lg:hidden absolute inset-0 pointer-events-none z-20"
            style={{
              background:
                'linear-gradient(to bottom, transparent 0%, transparent 45%, rgba(7, 6, 5, 0.35) 65%, rgba(7, 6, 5, 0.85) 85%, #070605 100%)'
            }}
          />
        </div>

        {/* 
          2. RIGHT SIDE TEXT PANEL:
          Sits beside the image as a dedicated editorial panel on the dark background.
          Has NO solid separation line or border dividing it from the left image.
        */}
        <div className="relative w-full lg:w-[44%] xl:w-[42%] flex items-center justify-start px-6 sm:px-12 lg:px-12 xl:px-16 py-12 sm:py-16 lg:py-24 z-20 bg-[#070605]">
          {/* Synchronized Editorial Content */}
          <div
            className={`w-full max-w-lg transition-all duration-300 ${
              isTransitioning ? 'opacity-0 translate-y-1' : 'opacity-100 translate-y-0'
            }`}
          >
            {/* Eyebrow: 02 — THE CRAFT */}
            {activeItem.eyebrow && (
              <div className="text-[10px] sm:text-[11px] uppercase tracking-[0.32em] text-[#b0a79b] font-normal mb-5 sm:mb-6">
                {activeItem.eyebrow}
              </div>
            )}

            {/* Title: Made with obsession. */}
            <h2
              data-heading-scroll="craft-title"
              className="font-serif text-4xl sm:text-5xl lg:text-[54px] xl:text-[62px] font-light text-white leading-[1.05] tracking-[-0.015em] mb-6 sm:mb-8 whitespace-pre-line"
            >
              {activeItem.title}
            </h2>

            {/* Editorial Narrative */}
            <p className="text-xs sm:text-[13px] text-[#c4bcb1] font-light leading-[1.8] mb-8 sm:mb-10 max-w-md">
              {activeItem.description}
            </p>

            {/* 
              Specifications Grid with Hairline Dividers
              Matches the Reference Screenshot:
              GEMS | METAL
              CRAFT | ORIGIN
            */}
            {activeItem.specifications && activeItem.specifications.length > 0 && (
              <div className="border-t border-white/20 pt-4 pb-2 my-6">
                <div className="grid grid-cols-2 gap-x-6 sm:gap-x-10 gap-y-4">
                  {activeItem.specifications.map((spec, sIdx) => {
                    const isSecondRow = sIdx >= 2;
                    return (
                      <div
                        key={sIdx}
                        className={
                          isSecondRow
                            ? 'border-t border-white/20 pt-4 col-span-1'
                            : 'col-span-1'
                        }
                      >
                        <div className="text-[9px] uppercase tracking-[0.26em] text-[#8e867b] mb-1 font-sans">
                          {spec.label}
                        </div>
                        <div className="text-xs sm:text-sm font-serif text-[#eee9df] font-normal leading-snug">
                          {spec.value}
                        </div>
                      </div>
                    );
                  })}
                </div>
                <div className="border-b border-white/20 mt-4" />
              </div>
            )}

            {/* 
              Centered Text CTA with Hairline Top & Bottom Borders
              Matches Reference Screenshot: EXPLORE ÉLAN DE LUMIÈRE →
            */}
            {activeItem.cta && (
              <div className="border-t border-b border-white/20 py-3.5 my-6 text-center">
                <a
                  href={activeItem.cta.href || '#'}
                  onClick={handleCtaClick}
                  className="text-[10px] sm:text-[11px] uppercase tracking-[0.28em] text-white hover:text-white/75 transition-colors font-medium inline-block cursor-pointer select-none"
                >
                  {activeItem.cta.label}
                </a>
              </div>
            )}

            {/* Subtle Chapter Navigation / Carousel Hint */}
            {storyItems.length > 1 && (
              <div className="flex items-center justify-between pt-2 text-[9px] uppercase tracking-[0.22em] text-[#7a7266]">
                <span>Création {currentIndex + 1} de {storyItems.length}</span>
                <div className="flex items-center gap-3">
                  <button
                    onClick={handlePrev}
                    className="hover:text-white transition-colors px-1.5 py-0.5"
                    aria-label="Previous story"
                  >
                    ← Précédent
                  </button>
                  <span className="text-white/30">|</span>
                  <button
                    onClick={handleNext}
                    className="hover:text-white transition-colors px-1.5 py-0.5"
                    aria-label="Next story"
                  >
                    Suivant →
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
