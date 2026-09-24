'use client';

/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect } from 'react';

interface NavigationProps {
  scrollY: number;
  onOpenMenu: () => void;
  onNavigate: (sectionId: string) => void;
  onOpenAppointment: () => void;
  onOpenAuth: (mode?: 'signin' | 'signup') => void;
  currentUser?: { name: string; email: string } | null;
  onSignOut?: () => void;
}

export function Navigation({
  onOpenMenu,
  onNavigate,
  onOpenAppointment,
  onOpenAuth,
  currentUser,
  onSignOut,
}: NavigationProps) {
  // Start with true since Hero is the first banner at top of page
  const [isOverBanner, setIsOverBanner] = useState(true);

  useEffect(() => {
    let ticking = false;

    const checkBannerOverlap = () => {
      // Find all banners in the document (Hero, Mid-Page Media Story Banners, etc.)
      const bannerElements = document.querySelectorAll<HTMLElement>('[data-banner="true"]');
      const navHeight = 80;
      let overBanner = false;

      bannerElements.forEach((banner) => {
        const rect = banner.getBoundingClientRect();
        // The nav occupies [0, navHeight]. It is over a banner if:
        // rect.top <= navHeight (banner has reached or passed top of viewport)
        // AND rect.bottom >= 0 (banner has not yet completely scrolled out above viewport)
        if (rect.top <= navHeight && rect.bottom >= 0) {
          overBanner = true;
        }
      });

      setIsOverBanner(overBanner);
      ticking = false;
    };

    const onScrollOrResize = () => {
      if (!ticking) {
        requestAnimationFrame(checkBannerOverlap);
        ticking = true;
      }
    };

    // Initial check
    checkBannerOverlap();

    window.addEventListener('scroll', onScrollOrResize, { passive: true });
    window.addEventListener('resize', onScrollOrResize, { passive: true });

    // Periodic safety check for any dynamic DOM adjustments
    const timer = setInterval(checkBannerOverlap, 400);

    return () => {
      window.removeEventListener('scroll', onScrollOrResize);
      window.removeEventListener('resize', onScrollOrResize);
      clearInterval(timer);
    };
  }, []);

  return (
    <header
      className={`nav ${isOverBanner ? 'nav-on-banner' : 'nav-solid'}`}
      data-over-banner={isOverBanner}
    >
      {/* Smooth transitioning backdrop layer for nav coming and disappearing */}
      <div
        className={`nav-backdrop ${isOverBanner ? 'nav-backdrop-hidden' : 'nav-backdrop-visible'}`}
        aria-hidden="true"
      />

      <a
        className="logo"
        href="#"
        onClick={(e) => {
          e.preventDefault();
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
      >
        AURELIA
      </a>

      <nav className="navlinks" aria-label="Main Navigation">
        <a
          href="#collection"
          onClick={(e) => {
            e.preventDefault();
            onNavigate('collection');
          }}
        >
          Collection
        </a>
        <a
          href="#craft"
          onClick={(e) => {
            e.preventDefault();
            onNavigate('craft');
          }}
        >
          Craft
        </a>
        <a
          href="#atelier"
          onClick={(e) => {
            e.preventDefault();
            onNavigate('atelier');
          }}
        >
          Atelier
        </a>
        <button
          onClick={onOpenAppointment}
          className="salon-prive-btn"
        >
          Salon Privé
        </button>

        {currentUser ? (
          <div className="flex items-center gap-3 pl-2">
            <button
              onClick={() => onOpenAuth('signin')}
              className="text-[11px] tracking-[0.2em] uppercase text-white/90 hover:text-white transition-colors"
              title={currentUser.email}
            >
              {currentUser.name}
            </button>
            <span className="text-white/20">·</span>
            <button
              onClick={onSignOut}
              className="text-[10px] tracking-[0.2em] uppercase text-[#8c857b] hover:text-white transition-colors"
            >
              Déconnexion
            </button>
          </div>
        ) : (
          <button
            onClick={() => onOpenAuth('signin')}
            className="text-[11px] tracking-[0.22em] uppercase text-white/80 hover:text-white transition-colors pl-2"
          >
            Sign In
          </button>
        )}
      </nav>

      <button
        className="menu"
        onClick={onOpenMenu}
        aria-label="Open mobile menu"
      >
        MENU
      </button>
    </header>
  );
}
