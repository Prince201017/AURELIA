/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useEffect, useRef, useState } from 'react';

interface HeadingConfig {
  travelDistance: number;
  speed: number;
  startThreshold: number;
  clipRate: number;
}

const HEADING_CONFIGS: Record<string, HeadingConfig> = {
  'hero-title': { travelDistance: 130, speed: 0.45, startThreshold: 0.40, clipRate: 1.15 },
  'born-of-light': { travelDistance: 130, speed: 0.45, startThreshold: 0.40, clipRate: 1.15 },
  'maison-title': { travelDistance: 90, speed: 0.36, startThreshold: 0.30, clipRate: 1.05 },
  'precision-poetry': { travelDistance: 90, speed: 0.36, startThreshold: 0.30, clipRate: 1.05 },
  'the-collection': { travelDistance: 110, speed: 0.38, startThreshold: 0.32, clipRate: 1.10 },
  'craft-title': { travelDistance: 95, speed: 0.34, startThreshold: 0.28, clipRate: 1.08 },
  'made-obsession': { travelDistance: 95, speed: 0.34, startThreshold: 0.28, clipRate: 1.08 },
  'atelier-title': { travelDistance: 120, speed: 0.42, startThreshold: 0.35, clipRate: 1.20 },
  'wear-unrepeatable': { travelDistance: 120, speed: 0.42, startThreshold: 0.35, clipRate: 1.20 },
  'aurelia-footer': { travelDistance: 70, speed: 0.28, startThreshold: 0.22, clipRate: 1.00 }
};

export function useScrollChoreography() {
  const [scrollY, setScrollY] = useState(0);
  const [velocity, setVelocity] = useState(0);
  const rafId = useRef<number | null>(null);
  const currentScrollRef = useRef(0);
  const targetScrollRef = useRef(0);
  const prevScrollRef = useRef(0);
  const velocityRef = useRef(0);

  useEffect(() => {
    // 1. Setup IntersectionObserver for .reveal elements
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.05, rootMargin: '0px 0px 50px 0px' }
    );

    document.querySelectorAll('.reveal').forEach((el) => {
      const rect = el.getBoundingClientRect();
      if (rect.top <= window.innerHeight + 100) {
        el.classList.add('visible');
      } else {
        observer.observe(el);
      }
    });

    // Reduced motion check
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    if (mediaQuery.matches) {
      // Mark all visible immediately
      document.querySelectorAll('.reveal').forEach((el) => el.classList.add('visible'));
      return;
    }

    const onScroll = () => {
      targetScrollRef.current = window.scrollY;
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    targetScrollRef.current = window.scrollY;
    currentScrollRef.current = window.scrollY;

    const tick = () => {
      // Smooth lerp scroll interpolation
      const diff = targetScrollRef.current - currentScrollRef.current;
      currentScrollRef.current += diff * 0.16;

      // Compute scroll velocity
      const instantVelocity = targetScrollRef.current - prevScrollRef.current;
      velocityRef.current += (instantVelocity - velocityRef.current) * 0.12;
      prevScrollRef.current = targetScrollRef.current;

      setScrollY(currentScrollRef.current);
      setVelocity(velocityRef.current);

      const vh = window.innerHeight;

      // Hero specific progress
      const heroCopy = document.querySelector<HTMLElement>('.hero-copy');
      if (heroCopy) {
        const heroProgress = Math.min(1.5, Math.max(0, currentScrollRef.current / (vh * 0.75)));
        heroCopy.style.setProperty('--hero-progress', heroProgress.toFixed(3));
      }

      // Process physical heading departures
      const headingElements = document.querySelectorAll<HTMLElement>('[data-heading-scroll]');

      headingElements.forEach((el) => {
        const key = el.getAttribute('data-heading-scroll');
        const config = key ? HEADING_CONFIGS[key] : null;
        if (!config) return;

        const rect = el.getBoundingClientRect();
        const elHeight = rect.height || 80;
        const thresholdPx = vh * config.startThreshold;

        // When heading scrolls towards upper viewport
        if (rect.top < thresholdPx) {
          const distancePastThreshold = thresholdPx - rect.top;
          const progress = Math.max(0, distancePastThreshold / (thresholdPx + elHeight));

          // Physical upward displacement
          const yOffset = -Math.min(config.travelDistance, progress * config.travelDistance * config.speed * 2.6);

          // Top edge departure clip progression
          let topClipPercent = 0;
          if (rect.top <= 24) {
            const clippedPixels = Math.max(0, -rect.top + 24);
            topClipPercent = Math.min(100, (clippedPixels / elHeight) * 100 * config.clipRate);
          }

          el.style.transform = `translate3d(0, ${yOffset.toFixed(2)}px, 0)`;
          if (topClipPercent > 0) {
            el.style.clipPath = `inset(${topClipPercent.toFixed(1)}% 0% 0% 0%)`;
          } else {
            el.style.clipPath = 'none';
          }
        } else {
          el.style.transform = 'translate3d(0, 0px, 0)';
          el.style.clipPath = 'none';
        }
      });

      rafId.current = requestAnimationFrame(tick);
    };

    rafId.current = requestAnimationFrame(tick);

    return () => {
      window.removeEventListener('scroll', onScroll);
      observer.disconnect();
      if (rafId.current) {
        cancelAnimationFrame(rafId.current);
      }
    };
  }, []);

  return { scrollY, velocity };
}
