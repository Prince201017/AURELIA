'use client';

/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
  onNavigate: (sectionId: string) => void;
  onOpenAppointment: () => void;
  onOpenAuth?: (mode: 'signin' | 'signup') => void;
  currentUser?: { name: string; email: string } | null;
  onSignOut?: () => void;
}

export function MobileMenu({
  isOpen,
  onClose,
  onNavigate,
  onOpenAppointment,
  onOpenAuth,
  currentUser,
  onSignOut,
}: MobileMenuProps) {
  const handleItemClick = (sectionId?: string) => {
    onClose();
    if (sectionId) {
      setTimeout(() => {
        onNavigate(sectionId);
      }, 350);
    }
  };

  const handleAuthClick = (mode: 'signin' | 'signup') => {
    onClose();
    if (onOpenAuth) {
      setTimeout(() => {
        onOpenAuth(mode);
      }, 300);
    }
  };

  return (
    <div
      className={`mobile-panel ${isOpen ? 'open' : ''}`}
      id="mobilePanel"
      aria-hidden={!isOpen}
    >
      <button
        className="mobile-close text-white hover:text-white/70 transition-colors"
        id="menuClose"
        onClick={onClose}
        aria-label="Close navigation"
      >
        Close
      </button>

      <div className="mobile-scroll-container flex flex-col justify-between min-h-full">
        {/* Main Navigation Links at the top */}
        <nav className="mobile-links" aria-label="Mobile navigation">
          <button onClick={() => handleItemClick('collection')} className="text-white hover:text-white/80">
            Collection
          </button>
          <button onClick={() => handleItemClick('craft')} className="text-white hover:text-white/80">
            Craft
          </button>
          <button onClick={() => handleItemClick('atelier')} className="text-white hover:text-white/80">
            Atelier
          </button>
          <button
            onClick={() => {
              onClose();
              onOpenAppointment();
            }}
            className="text-white hover:text-white/80"
          >
            Salon Privé
          </button>
          <button onClick={() => handleItemClick('footer')} className="text-white hover:text-white/80">
            Correspondance
          </button>
        </nav>

        {/* BOTTOM SECTION: Sign In / Sign Up at the bottom of the menu panel */}
        <div className="mobile-bottom-auth mt-auto pt-8 pb-4 border-t border-white/15">
          {currentUser ? (
            <div className="flex flex-col gap-2">
              <span className="text-[10px] uppercase tracking-[0.25em] text-[#b99a79] font-mono">
                Client Privilège · {currentUser.name}
              </span>
              <div className="flex items-center justify-between pt-1">
                <span className="text-xs text-white/60 truncate max-w-[200px]">
                  {currentUser.email}
                </span>
                <button
                  onClick={() => {
                    onClose();
                    if (onSignOut) onSignOut();
                  }}
                  className="text-xs uppercase tracking-[0.2em] text-white/80 hover:text-white transition-colors"
                >
                  Sign Out
                </button>
              </div>
            </div>
          ) : (
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-5">
                <button
                  onClick={() => handleAuthClick('signin')}
                  className="text-white hover:text-white/80 text-lg font-serif italic transition-colors"
                >
                  Sign In
                </button>
                <span className="text-white/30 text-base">/</span>
                <button
                  onClick={() => handleAuthClick('signup')}
                  className="text-white hover:text-white/80 text-lg font-serif italic transition-colors"
                >
                  Sign Up
                </button>
              </div>
              <span className="text-[9px] uppercase tracking-[0.25em] text-[#b99a79] font-mono">
                Aurelia Privé
              </span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
