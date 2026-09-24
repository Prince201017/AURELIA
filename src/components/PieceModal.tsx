'use client';

/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useRef, useEffect } from 'react';
import { CollectionPiece } from '../types';
import { X, Sparkles, Compass, Shield, Award, ChevronRight, Eye } from 'lucide-react';

interface PieceModalProps {
  piece: CollectionPiece | null;
  onClose: () => void;
  onRequestViewing: (piece: CollectionPiece) => void;
}

export function PieceModal({ piece, onClose, onRequestViewing }: PieceModalProps) {
  const [activeView, setActiveView] = useState<'primary' | 'macro' | 'profile'>('primary');
  const [lightAngle, setLightAngle] = useState(0);
  const [loupePos, setLoupePos] = useState({ x: 50, y: 50 });
  const [isLoupeActive, setIsLoupeActive] = useState(false);
  const imageContainerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  if (!piece) return null;

  const currentImage =
    activeView === 'primary'
      ? piece.image
      : activeView === 'macro'
      ? piece.detailImage || piece.image
      : piece.angleView || piece.image;

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!imageContainerRef.current) return;
    const rect = imageContainerRef.current.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    setLoupePos({ x, y });
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/85 backdrop-blur-md overflow-y-auto"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-5xl bg-[#0c0b09] border border-[rgba(238,233,223,0.12)] p-6 sm:p-10 shadow-2xl text-[#eee9df] my-auto flex flex-col lg:flex-row gap-8 lg:gap-12"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 text-[#888177] hover:text-white transition-colors focus:outline-none flex items-center gap-1.5 text-[9px] uppercase tracking-[0.2em]"
        >
          <span>Close Dossier</span>
          <X className="w-4 h-4" />
        </button>

        {/* Left: High-Precision Gemological Viewer */}
        <div className="lg:w-7/12 flex flex-col">
          <div className="flex items-center justify-between mb-3 text-[9px] uppercase tracking-[0.25em] text-[#a0978b]">
            <span className="flex items-center gap-2 text-white">
              <Sparkles className="w-3 h-3 text-white" />
              <span>Inspection Optique Haute Joaillerie</span>
            </span>
            <span className="font-mono text-[#8a8174]">{piece.number}</span>
          </div>

          {/* Interactive Image Canvas with Dynamic Lighting & Loupe */}
          <div
            ref={imageContainerRef}
            onMouseMove={handleMouseMove}
            onMouseEnter={() => setIsLoupeActive(true)}
            onMouseLeave={() => setIsLoupeActive(false)}
            className="relative aspect-[4/5] sm:aspect-[1/1] lg:aspect-[4/5] w-full overflow-hidden bg-[#070605] border border-[#26221c] select-none cursor-crosshair group"
          >
            {/* Main Piece Image with Dynamic Specular Refraction based on Light Angle */}
            <img
              src={currentImage}
              alt={piece.title}
              className="w-full h-full object-cover object-center transition-all duration-300"
              style={{
                filter: `brightness(${1 + Math.abs(lightAngle) * 0.003}) contrast(${
                  1.08 + Math.abs(lightAngle) * 0.002
                })`,
                transform: `scale(1.02) rotate(${lightAngle * 0.04}deg)`
              }}
            />

            {/* Specular Light Sweep Overlay */}
            <div
              className="absolute inset-0 pointer-events-none mix-blend-overlay transition-opacity duration-300"
              style={{
                background: `linear-gradient(${120 + lightAngle * 1.2}deg, rgba(255,255,255,0) 30%, rgba(255,255,255,${
                  0.18 + Math.abs(lightAngle) * 0.003
                }) 50%, rgba(255,255,255,0) 70%)`
              }}
            />

            {/* Precision Micro-Loupe / Magnifier Lens */}
            {isLoupeActive && (
              <div
                className="absolute pointer-events-none rounded-full border border-white/80 shadow-2xl hidden md:block overflow-hidden"
                style={{
                  width: '160px',
                  height: '160px',
                  left: `${loupePos.x}%`,
                  top: `${loupePos.y}%`,
                  transform: 'translate(-50%, -50%)',
                  backgroundImage: `url("${currentImage}")`,
                  backgroundSize: '350%',
                  backgroundPosition: `${loupePos.x}% ${loupePos.y}%`,
                  boxShadow: '0 0 35px rgba(0,0,0,0.9), inset 0 0 20px rgba(0,0,0,0.5)'
                }}
              >
                <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                  <div className="w-2 h-2 rounded-full border border-white/70" />
                </div>
              </div>
            )}

            {/* View State Badge */}
            <div className="absolute bottom-4 left-4 bg-[#0a0908]/80 backdrop-blur-sm px-3 py-1.5 text-[9px] uppercase tracking-[0.2em] text-[#a8a092] border border-[#221e19]">
              {activeView === 'primary'
                ? 'Vue Faciale d’Art'
                : activeView === 'macro'
                ? 'Sertissage Macro 10×'
                : 'Architecture Profil'}
            </div>

            {/* Loupe prompt */}
            <div className="absolute top-4 right-4 bg-[#0a0908]/80 backdrop-blur-sm px-2.5 py-1 text-[8px] uppercase tracking-[0.2em] text-[#8e8578] flex items-center gap-1.5 border border-[#221e19]">
              <Eye className="w-2.5 h-2.5 text-white" />
              <span>Survoler pour loupe ×3</span>
            </div>
          </div>

          {/* Perspective Selector & Refraction Angle Controller */}
          <div className="mt-4 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4 pt-2 border-t border-[#1e1b16]">
            {/* Angle tabs */}
            <div className="flex gap-2">
              <button
                onClick={() => setActiveView('primary')}
                className={`text-[9px] uppercase tracking-[0.2em] px-3 py-1.5 border transition-all ${
                  activeView === 'primary'
                    ? 'border-white text-white bg-white/10'
                    : 'border-[#26221c] text-[#888177] hover:text-[#d6cdbf]'
                }`}
              >
                Face
              </button>
              <button
                onClick={() => setActiveView('macro')}
                className={`text-[9px] uppercase tracking-[0.2em] px-3 py-1.5 border transition-all ${
                  activeView === 'macro'
                    ? 'border-white text-white bg-white/10'
                    : 'border-[#26221c] text-[#888177] hover:text-[#d6cdbf]'
                }`}
              >
                Détail Pavage
              </button>
              <button
                onClick={() => setActiveView('profile')}
                className={`text-[9px] uppercase tracking-[0.2em] px-3 py-1.5 border transition-all ${
                  activeView === 'profile'
                    ? 'border-white text-white bg-white/10'
                    : 'border-[#26221c] text-[#888177] hover:text-[#d6cdbf]'
                }`}
              >
                Structure Profil
              </button>
            </div>

            {/* Refraction Light Angle Controller */}
            <div className="flex items-center gap-3">
              <span className="text-[8px] uppercase tracking-[0.25em] text-[#8a8174] flex items-center gap-1">
                <Compass className="w-3 h-3 text-white" />
                <span>Angle de Lumière:</span>
              </span>
              <input
                type="range"
                min="-50"
                max="50"
                value={lightAngle}
                onChange={(e) => setLightAngle(Number(e.target.value))}
                className="w-24 accent-white cursor-pointer opacity-80 hover:opacity-100"
                title="Ajuster l'orientation lumineuse sur les facettes"
              />
              <span className="text-[9px] font-mono text-white w-8 text-right">
                {lightAngle > 0 ? `+${lightAngle}°` : `${lightAngle}°`}
              </span>
            </div>
          </div>
        </div>

        {/* Right: Gemological Dossier, Savoir-Faire & Acquisition */}
        <div className="lg:w-5/12 flex flex-col justify-between space-y-6">
          <div className="space-y-4">
            <div>
              <div className="text-[10px] uppercase tracking-[0.3em] text-[#aaa094] mb-1">
                {piece.frenchTitle}
              </div>
              <h2 className="font-serif text-3xl sm:text-4xl text-[#f5f2ec] font-light leading-tight">
                {piece.title}
              </h2>
              <div className="text-xs text-[#a0978b] tracking-wider mt-1">{piece.meta}</div>
            </div>

            <p className="text-xs text-[#b8b0a4] leading-relaxed font-light">
              {piece.description}
            </p>

            {/* Official Gemological Dossier Grid */}
            <div className="border-t border-b border-[#221e18] py-4 my-2 space-y-2.5 text-xs">
              <div className="flex justify-between items-center">
                <span className="text-[10px] uppercase tracking-[0.18em] text-[#787169]">
                  Métal & Titrage
                </span>
                <span className="text-[#eee9df] font-mono text-right">{piece.metal}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-[10px] uppercase tracking-[0.18em] text-[#787169]">
                  Gemmes & Poids
                </span>
                <span className="text-white font-mono text-right font-medium">
                  {piece.carats}
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-[10px] uppercase tracking-[0.18em] text-[#787169]">
                  Couleur / Pureté
                </span>
                <span className="text-[#eee9df] text-right">{piece.colorClarity}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-[10px] uppercase tracking-[0.18em] text-[#787169]">
                  Taille des Pierres
                </span>
                <span className="text-[#eee9df] text-right">{piece.cut}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-[10px] uppercase tracking-[0.18em] text-[#787169]">
                  Architecture Sertissage
                </span>
                <span className="text-[#eee9df] text-right">{piece.setting}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-[10px] uppercase tracking-[0.18em] text-[#787169]">
                  Temps d'Atelier
                </span>
                <span className="text-[#eee9df] font-mono text-right">
                  {piece.craftHours} Heures de Façon
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-[10px] uppercase tracking-[0.18em] text-[#787169]">
                  Poinçon d’État
                </span>
                <span className="text-[#a0978b] text-[11px] text-right">{piece.hallmark}</span>
              </div>
            </div>

            {/* Certification Guarantees */}
            <div className="space-y-2 pt-1">
              <div className="flex items-center gap-2 text-[10px] text-[#8e8578]">
                <Shield className="w-3.5 h-3.5 text-white/70 shrink-0" />
                <span>Certificat GIA N° 22340918 & Poinçon de Maître Joaillier</span>
              </div>
              <div className="flex items-center gap-2 text-[10px] text-[#8e8578]">
                <Award className="w-3.5 h-3.5 text-white/70 shrink-0" />
                <span>Conforme au Processus de Kimberley & Charte Éthique RJC</span>
              </div>
            </div>
          </div>

          {/* Acquisition / Salon Viewing Action */}
          <div className="space-y-3 pt-4 border-t border-[#1e1b16]">
            <button
              onClick={() => onRequestViewing(piece)}
              className="w-full group flex items-center justify-center gap-3 py-4 bg-white hover:bg-[#eee9df] text-[#090807] text-xs uppercase tracking-[0.25em] font-medium transition-all duration-300"
            >
              <span>Réserver une Présentation en Salon</span>
              <ChevronRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
            </button>

            <div className="text-center">
              <span className="text-[9px] uppercase tracking-[0.2em] text-[#6d665d]">
                Présentation privée Place Vendôme, Mayfair, Fifth Avenue ou à Domicile
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
