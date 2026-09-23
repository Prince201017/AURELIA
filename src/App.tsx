/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState } from 'react';
import { useScrollChoreography } from './hooks/useScrollChoreography';
import { LuxuryCursor } from './components/LuxuryCursor';
import { Navigation } from './components/Navigation';
import { MobileMenu } from './components/MobileMenu';
import { Hero } from './components/Hero';
import { Maison } from './components/Maison';
import { Collection } from './components/Collection';
import { Craft } from './components/Craft';
import { Atelier } from './components/Atelier';
import { Footer } from './components/Footer';
import { PieceModal } from './components/PieceModal';
import { AppointmentModal } from './components/AppointmentModal';
import { CollectionPiece } from './types';
import { AURELIA_COLLECTION } from './data/collectionData';

export default function App() {
  const { scrollY, velocity } = useScrollChoreography();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isAppointmentOpen, setIsAppointmentOpen] = useState(false);
  const [selectedPiece, setSelectedPiece] = useState<CollectionPiece | null>(null);

  const handleNavigate = (sectionId: string) => {
    const el = document.getElementById(sectionId);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleSelectPiece = (piece: CollectionPiece) => {
    setSelectedPiece(piece);
  };

  const handleNavigatePiece = (pieceId: string) => {
    const piece = AURELIA_COLLECTION.find((p: CollectionPiece) => p.id === pieceId);
    if (piece) {
      setSelectedPiece(piece);
    } else {
      handleNavigate('collection');
    }
  };

  const handleRequestViewing = () => {
    setSelectedPiece(null);
    setIsAppointmentOpen(true);
  };

  return (
    <div className="min-h-screen bg-[#090807] text-[#eee9df] selection:bg-white/20 selection:text-white relative overflow-x-hidden">
      {/* Precision luxury cursor (desktop fine pointers only) */}
      <LuxuryCursor />

      {/* Atmospheric dynamic lighting gradient that softly breathes with scroll velocity */}
      <div
        className="pointer-events-none fixed inset-0 z-0 opacity-40 transition-transform duration-700 ease-out"
        style={{
          background: 'radial-gradient(circle at 50% 25%, rgba(255, 255, 255, 0.04) 0%, transparent 60%)',
          transform: `translate3d(0, ${Math.min(30, Math.max(-30, velocity * 0.4))}px, 0)`
        }}
      />

      {/* Navigation header with white brand name, solid colored strip background and mobile panel system */}
      <Navigation
        scrollY={scrollY}
        onOpenMenu={() => setIsMobileMenuOpen(true)}
        onNavigate={handleNavigate}
        onOpenAppointment={() => setIsAppointmentOpen(true)}
      />

      {/* Sequenced Mobile Menu Panel Overlay */}
      <MobileMenu
        isOpen={isMobileMenuOpen}
        onClose={() => setIsMobileMenuOpen(false)}
        onNavigate={handleNavigate}
        onOpenAppointment={() => setIsAppointmentOpen(true)}
      />

      {/* Main Experience Stream */}
      <main>
        {/* 1. Hero: Pure cinematic media banner without dark fade or progress indicators, clickable links */}
        <Hero
          onExploreClick={() => handleNavigate('collection')}
          onOpenAppointment={() => setIsAppointmentOpen(true)}
          onNavigatePiece={handleNavigatePiece}
          onNavigateSection={handleNavigate}
        />

        {/* 2. Maison: 'Where precision becomes poetry', dual-column editorial */}
        <Maison />

        {/* 3. Collection: 'The Collection', asymmetrical grid, pointer-following card response */}
        <Collection onSelectPiece={handleSelectPiece} />

        {/* 4. Craft: Second banner showcase with multi-media, right-side image blend, touch sliding, no indicators */}
        <Craft
          onNavigatePiece={handleNavigatePiece}
          onNavigateSection={handleNavigate}
          onOpenAppointment={() => setIsAppointmentOpen(true)}
        />

        {/* 5. Atelier: 'Wear the unrepeatable', expanding architectural ring, slow CTA */}
        <Atelier onOpenAppointment={() => setIsAppointmentOpen(true)} />
      </main>

      {/* 6. Footer: 4-column side-by-side grid (desktop) / 2-column (mobile), zero yellow colors */}
      <Footer
        onNavigate={handleNavigate}
        onOpenAppointment={() => setIsAppointmentOpen(true)}
      />

      {/* High-res Inspection Modal */}
      <PieceModal
        piece={selectedPiece}
        onClose={() => setSelectedPiece(null)}
        onRequestViewing={handleRequestViewing}
      />

      {/* Private Salon Appointment Inquiry Modal */}
      <AppointmentModal
        isOpen={isAppointmentOpen}
        onClose={() => setIsAppointmentOpen(false)}
        selectedPiece={selectedPiece}
      />
    </div>
  );
}
