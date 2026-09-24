'use client';

/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect } from 'react';
import { useScrollChoreography } from '../hooks/useScrollChoreography';
import { LuxuryCursor } from '../components/LuxuryCursor';
import { Navigation } from '../components/Navigation';
import { MobileMenu } from '../components/MobileMenu';
import { Hero } from '../components/Hero';
import { Maison } from '../components/Maison';
import { Collection } from '../components/Collection';
import { Craft } from '../components/Craft';
import { Atelier } from '../components/Atelier';
import { Footer } from '../components/Footer';
import { PieceModal } from '../components/PieceModal';
import { AppointmentModal } from '../components/AppointmentModal';
import { AuthGateway } from '../components/AuthGateway';
import { CollectionPiece } from '../types';
import { AURELIA_COLLECTION } from '../data/collectionData';

export default function Home() {
  const { scrollY, velocity } = useScrollChoreography();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isAppointmentOpen, setIsAppointmentOpen] = useState(false);
  const [isAuthOpen, setIsAuthOpen] = useState(false);
  const [authMode, setAuthMode] = useState<'signin' | 'signup'>('signin');
  const [selectedPiece, setSelectedPiece] = useState<CollectionPiece | null>(null);

  // Client User session state (hydrated safely in useEffect for Next.js SSR)
  const [currentUser, setCurrentUser] = useState<{ name: string; email: string } | null>(null);

  useEffect(() => {
    try {
      const saved = localStorage.getItem('aurelia_client_user');
      if (saved) {
        setCurrentUser(JSON.parse(saved));
      }
    } catch {
      // storage unavailable
    }
  }, []);

  // MANDATORY REQUIREMENT:
  // "And make sure if any menu like pannel is open so no scroll behind the pannel on site the scroll is only on pannel."
  useEffect(() => {
    const isAnyPanelOpen = isMobileMenuOpen || isAppointmentOpen || isAuthOpen || !!selectedPiece;
    if (isAnyPanelOpen) {
      document.body.style.overflow = 'hidden';
      document.documentElement.style.overflow = 'hidden';
      document.body.classList.add('menu-open');
      document.documentElement.classList.add('menu-open');
    } else {
      document.body.style.overflow = '';
      document.documentElement.style.overflow = '';
      document.body.classList.remove('menu-open');
      document.documentElement.classList.remove('menu-open');
    }
    return () => {
      document.body.style.overflow = '';
      document.documentElement.style.overflow = '';
      document.body.classList.remove('menu-open');
      document.documentElement.classList.remove('menu-open');
    };
  }, [isMobileMenuOpen, isAppointmentOpen, isAuthOpen, selectedPiece]);

  const handleOpenAuth = (mode: 'signin' | 'signup' = 'signin') => {
    setAuthMode(mode);
    setIsAuthOpen(true);
  };

  const handleCloseAuth = () => {
    setIsAuthOpen(false);
    // Guarantees all underlying text remains visible when returning from AuthGateway
    requestAnimationFrame(() => {
      document.querySelectorAll('.reveal').forEach((el) => el.classList.add('visible'));
      window.dispatchEvent(new Event('scroll'));
    });
  };

  const handleAuthSuccess = (user: { name: string; email: string }) => {
    setCurrentUser(user);
    try {
      localStorage.setItem('aurelia_client_user', JSON.stringify(user));
    } catch {
      // storage unavailable
    }
  };

  const handleSignOut = () => {
    setCurrentUser(null);
    try {
      localStorage.removeItem('aurelia_client_user');
    } catch {
      // storage unavailable
    }
  };

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
        onOpenAuth={handleOpenAuth}
        currentUser={currentUser}
        onSignOut={handleSignOut}
      />

      {/* Sequenced Mobile Menu Panel Overlay with internal scroll */}
      <MobileMenu
        isOpen={isMobileMenuOpen}
        onClose={() => setIsMobileMenuOpen(false)}
        onNavigate={handleNavigate}
        onOpenAppointment={() => setIsAppointmentOpen(true)}
        onOpenAuth={handleOpenAuth}
        currentUser={currentUser}
        onSignOut={handleSignOut}
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
        onOpenAuth={handleOpenAuth}
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

      {/* Full-Screen Sign Page Gateway (preserving underlying DOM & scroll states) */}
      {isAuthOpen && (
        <AuthGateway
          initialMode={authMode}
          onClose={handleCloseAuth}
          onAuthSuccess={(user) => {
            handleAuthSuccess(user);
            handleCloseAuth();
          }}
        />
      )}
    </div>
  );
}
