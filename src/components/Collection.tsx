/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState } from 'react';
import { AURELIA_COLLECTION, CollectionPiece } from '../data/collectionData';
import { Sparkles, SlidersHorizontal } from 'lucide-react';

interface CollectionProps {
  onSelectPiece: (piece: CollectionPiece) => void;
}

export function Collection({ onSelectPiece }: CollectionProps) {
  const [activeCategory, setActiveCategory] = useState<string>('All');
  const [mouseOffsets, setMouseOffsets] = useState<Record<string, { x: number; y: number }>>({});

  const handleCardMouseMove = (id: string, e: React.MouseEvent<HTMLElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width - 0.5) * 16;
    const y = ((e.clientY - rect.top) / rect.height - 0.5) * 16;
    setMouseOffsets((prev) => ({ ...prev, [id]: { x, y } }));
  };

  const handleCardMouseLeave = (id: string) => {
    setMouseOffsets((prev) => ({ ...prev, [id]: { x: 0, y: 0 } }));
  };

  const filteredPieces =
    activeCategory === 'All'
      ? AURELIA_COLLECTION
      : AURELIA_COLLECTION.filter((p) => p.category === activeCategory);

  return (
    <section className="collection" id="collection">
      {/* Section Head matching user foundation */}
      <div className="section-head reveal">
        <div>
          <div className="eyebrow">01 — Selected works</div>
          <h3>The Collection</h3>
        </div>

        {/* Curated Category Filter Controls */}
        <div className="flex flex-wrap items-center gap-2 sm:gap-4 mt-6 sm:mt-0 text-[10px] uppercase tracking-[0.2em]">
          <span className="hidden md:inline-flex items-center gap-1.5 text-[#888075] mr-2">
            <SlidersHorizontal className="w-3 h-3 text-[#14120f]" />
            <span>Curation:</span>
          </span>
          {[
            { label: 'All Creations', value: 'All' },
            { label: 'Colliers', value: 'Collier' },
            { label: 'Solitaires', value: 'Bague' },
            { label: 'Boucles d’Oreilles', value: 'Boucles d’Oreilles' },
            { label: 'Manchettes', value: 'Manchette' }
          ].map((cat) => (
            <button
              key={cat.value}
              onClick={() => setActiveCategory(cat.value)}
              className={`px-3 py-1.5 border transition-all ${
                activeCategory === cat.value
                  ? 'border-[#14120f] text-[#14120f] bg-[#14120f]/5 font-medium'
                  : 'border-transparent text-[#766e66] hover:text-[#14120f]'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>
      </div>

      {/* Asymmetric Product Grid */}
      <div className="products">
        {filteredPieces.map((piece) => {
          const offset = mouseOffsets[piece.id] || { x: 0, y: 0 };

          return (
            <article
              key={piece.id}
              className="card reveal group"
              onClick={() => onSelectPiece(piece)}
              onMouseMove={(e) => handleCardMouseMove(piece.id, e)}
              onMouseLeave={() => handleCardMouseLeave(piece.id)}
            >
              <div
                className="card-image"
                style={{
                  backgroundImage: `url("${piece.image}")`,
                  transform: `scale(1.03) translate3d(${offset.x}px, ${offset.y}px, 0)`
                }}
              />

              <div className="card-info">
                <div className="card-number">{piece.number}</div>
                <div className="card-title">{piece.title}</div>
                <div className="card-meta">{piece.meta}</div>

                <div className="card-hover-action">
                  <Sparkles className="w-3 h-3 text-[#14120f]" />
                  <span>Examine Gemological Dossier & Light Refraction</span>
                </div>
              </div>
            </article>
          );
        })}
      </div>
    </section>
  );
}
