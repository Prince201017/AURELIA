/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState } from 'react';
import { CollectionPiece } from '../types';
import { BOUTIQUE_SALONS } from '../data/collectionData';
import { X, CheckCircle2, ShieldCheck } from 'lucide-react';

interface AppointmentModalProps {
  isOpen: boolean;
  onClose: () => void;
  selectedPiece?: CollectionPiece | null;
}

export function AppointmentModal({ isOpen, onClose, selectedPiece }: AppointmentModalProps) {
  const [selectedCity, setSelectedCity] = useState('Paris');
  const [viewingFormat, setViewingFormat] = useState<'salon' | 'residence'>('salon');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [preferredDate, setPreferredDate] = useState('');
  const [notes, setNotes] = useState('');
  const [submitted, setSubmitted] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  const handleResetAndClose = () => {
    setSubmitted(false);
    onClose();
  };

  const activeSalon = BOUTIQUE_SALONS.find((s) => s.city === selectedCity) || BOUTIQUE_SALONS[0];

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/80 backdrop-blur-md overflow-y-auto"
      onClick={handleResetAndClose}
    >
      <div
        className="relative w-full max-w-xl bg-[#0d0c0a] border border-[rgba(238,233,223,0.12)] p-8 sm:p-12 shadow-2xl text-[#eee9df] my-auto transition-all"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Subtle Luxury Corner Accent */}
        <div className="absolute top-0 right-0 w-16 h-16 pointer-events-none border-t border-r border-white/20" />
        <div className="absolute bottom-0 left-0 w-16 h-16 pointer-events-none border-b border-l border-white/20" />

        {/* Close Button */}
        <button
          onClick={handleResetAndClose}
          className="absolute top-6 right-6 p-2 text-[#736c62] hover:text-[#eee9df] transition-colors focus:outline-none"
          aria-label="Fermer"
        >
          <X className="w-5 h-5" />
        </button>

        {submitted ? (
          <div className="py-12 text-center space-y-5">
            <div className="w-12 h-12 rounded-full border border-white flex items-center justify-center mx-auto text-white">
              <CheckCircle2 className="w-6 h-6" />
            </div>
            <div className="text-[9px] uppercase tracking-[0.35em] text-[#aaa094]">
              Haute Joaillerie · Protocole Confidentiel
            </div>
            <h3 className="font-serif text-3xl sm:text-4xl text-[#eee9df] font-light leading-snug">
              Votre Demande Est Enregistrée
            </h3>
            <p className="text-xs text-[#8c857b] max-w-md mx-auto leading-relaxed font-light">
              Notre Directeur de Haute Joaillerie pour le salon de {activeSalon.city} ({activeSalon.flagship}) prendra contact avec vous ou votre attaché personnel sous douze heures.
            </p>
            <div className="pt-4">
              <button
                onClick={handleResetAndClose}
                className="px-8 py-3.5 border border-white text-[9px] uppercase tracking-[0.25em] text-[#eee9df] hover:bg-white hover:text-[#090807] transition-all duration-300"
              >
                Retourner à la Collection
              </button>
            </div>
          </div>
        ) : (
          <div className="space-y-6">
            {/* Modal Header */}
            <div>
              <div className="eyebrow text-[#aaa094] text-[9px] tracking-[0.35em] uppercase mb-2">
                Salon Privé · Présentation Exclusive
              </div>
              <h2 className="font-serif text-2xl sm:text-3xl lg:text-4xl text-[#eee9df] font-light leading-tight">
                Request Private Salon Presentation
              </h2>
              <p className="text-xs text-[#827a6f] mt-2 font-light leading-relaxed">
                {selectedPiece
                  ? `Private viewing of "${selectedPiece.title}" (${selectedPiece.carats}) at our Place Vendôme salons or your residence.`
                  : 'Bespoke salon audience for private collectors seeking unique creations, archival heritage viewings, or custom parures.'}
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-5">
              {/* Salon Location Selection */}
              <div>
                <label className="block text-[9px] uppercase tracking-[0.22em] text-[#8c857b] mb-1.5">
                  Select Maison Salon
                </label>
                <div className="relative">
                  <select
                    value={selectedCity}
                    onChange={(e) => setSelectedCity(e.target.value)}
                    className="w-full bg-[#14120f] border border-[#2b2721] text-[#eee9df] px-3.5 py-2.5 text-xs focus:border-white focus:outline-none transition-colors cursor-pointer"
                  >
                    {BOUTIQUE_SALONS.map((salon) => (
                      <option key={salon.city} value={salon.city}>
                        {salon.city} — {salon.flagship} ({salon.address})
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Presentation Format */}
              <div>
                <label className="block text-[9px] uppercase tracking-[0.22em] text-[#8c857b] mb-1.5">
                  Presentation Format
                </label>
                <div className="grid grid-cols-2 gap-3">
                  <button
                    type="button"
                    onClick={() => setViewingFormat('salon')}
                    className={`py-2.5 px-3 border text-center text-[10px] uppercase tracking-[0.2em] transition-all ${
                      viewingFormat === 'salon'
                        ? 'border-white text-white bg-white/10'
                        : 'border-[#26221c] text-[#736c62] hover:text-[#bbb1a3]'
                    }`}
                  >
                    At Maison Salon Privé
                  </button>
                  <button
                    type="button"
                    onClick={() => setViewingFormat('residence')}
                    className={`py-2.5 px-3 border text-center text-[10px] uppercase tracking-[0.2em] transition-all ${
                      viewingFormat === 'residence'
                        ? 'border-white text-white bg-white/10'
                        : 'border-[#26221c] text-[#736c62] hover:text-[#bbb1a3]'
                    }`}
                  >
                    Private Residence (Courier Escort)
                  </button>
                </div>
              </div>

              {/* Name & Contact */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div>
                  <label className="block text-[9px] uppercase tracking-[0.22em] text-[#8c857b] mb-1">
                    Full Name & Title
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Lady Katherine Vance"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full bg-transparent border-b border-[#2b2721] focus:border-white text-[#eee9df] text-xs py-2 px-0 placeholder:text-[#524c43] focus:outline-none transition-colors"
                  />
                </div>
                <div>
                  <label className="block text-[9px] uppercase tracking-[0.22em] text-[#8c857b] mb-1">
                    Confidential Email
                  </label>
                  <input
                    type="email"
                    required
                    placeholder="client@domain.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full bg-transparent border-b border-[#2b2721] focus:border-white text-[#eee9df] text-xs py-2 px-0 placeholder:text-[#524c43] focus:outline-none transition-colors"
                  />
                </div>
              </div>

              {/* Telephone & Preferred Timing */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div>
                  <label className="block text-[9px] uppercase tracking-[0.22em] text-[#8c857b] mb-1">
                    Telephone (Direct or Personal Attaché)
                  </label>
                  <input
                    type="tel"
                    required
                    placeholder="+33 (0) 1 42 68 00 00"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="w-full bg-transparent border-b border-[#2b2721] focus:border-white text-[#eee9df] text-xs py-2 px-0 placeholder:text-[#524c43] focus:outline-none transition-colors"
                  />
                </div>
                <div>
                  <label className="block text-[9px] uppercase tracking-[0.22em] text-[#8c857b] mb-1">
                    Preferred Date & Time Window
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. Next Tuesday, afternoon"
                    value={preferredDate}
                    onChange={(e) => setPreferredDate(e.target.value)}
                    className="w-full bg-transparent border-b border-[#2b2721] focus:border-white text-[#eee9df] text-xs py-2 px-0 placeholder:text-[#524c43] focus:outline-none transition-colors"
                  />
                </div>
              </div>

              {/* Special Requests */}
              <div>
                <label className="block text-[9px] uppercase tracking-[0.22em] text-[#8c857b] mb-1">
                  Private Inquiries & Specific Gemological Interests
                </label>
                <textarea
                  rows={2}
                  placeholder="Specify particular carats, archival pieces, or bespoke parure requirements..."
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  className="w-full bg-transparent border-b border-[#2b2721] focus:border-white text-[#eee9df] text-xs py-2 px-0 placeholder:text-[#524c43] focus:outline-none transition-colors resize-none"
                />
              </div>

              {/* Confidentiality Notice */}
              <div className="flex items-center gap-2 text-[10px] text-[#6d665a] pt-1">
                <ShieldCheck className="w-3.5 h-3.5 text-white/70 shrink-0" />
                <span>Confidentialité absolue garantie · Données protégées par le secret professionnel joaillier</span>
              </div>

              {/* Submit CTA */}
              <div className="pt-3">
                <button
                  type="submit"
                  className="w-full py-4 border border-white/40 bg-[#12100d] hover:bg-white text-[#eee9df] hover:text-[#090807] uppercase text-[10px] tracking-[0.28em] font-medium transition-all duration-500 cursor-pointer shadow-lg"
                >
                  Confirmer la Demande d'Audience Privée →
                </button>
              </div>
            </form>
          </div>
        )}
      </div>
    </div>
  );
}
