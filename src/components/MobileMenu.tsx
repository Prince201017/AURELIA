/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
  onNavigate: (sectionId: string) => void;
  onOpenAppointment: () => void;
}

export function MobileMenu({ isOpen, onClose, onNavigate, onOpenAppointment }: MobileMenuProps) {
  const handleItemClick = (sectionId?: string) => {
    onClose();
    if (sectionId) {
      setTimeout(() => {
        onNavigate(sectionId);
      }, 350);
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
    </div>
  );
}
