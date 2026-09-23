/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState } from 'react';
import { BOUTIQUE_SALONS, BUSINESS_REGISTRY } from '../data/collectionData';
import { ShieldCheck, CheckCircle2, ArrowRight } from 'lucide-react';

interface FooterProps {
  onNavigate: (sectionId: string) => void;
  onOpenAppointment: () => void;
}

export function Footer({ onNavigate, onOpenAppointment }: FooterProps) {
  const [newsletterEmail, setNewsletterEmail] = useState('');
  const [newsletterSent, setNewsletterSent] = useState(false);

  const handleNewsletterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (newsletterEmail) {
      setNewsletterSent(true);
      setTimeout(() => {
        setNewsletterSent(false);
        setNewsletterEmail('');
      }, 4000);
    }
  };

  return (
    <footer className="footer bg-[#090807] text-[#8c857b] border-t border-[rgba(238,233,223,0.08)] pt-20 pb-12 px-[4vw]" id="footer">
      {/* Editorial Gazette & Correspondence Banner (No yellow colors) */}
      <div className="max-w-6xl mx-auto pb-16 mb-16 border-b border-[rgba(238,233,223,0.08)] grid grid-cols-1 lg:grid-cols-12 gap-10 items-end">
        <div className="lg:col-span-6 space-y-3">
          <div className="eyebrow text-white/70">La Gazette Aurelia · Correspondance Privée</div>
          <h3 className="font-serif text-3xl sm:text-4xl text-[#eee9df] font-light leading-tight">
            Receive Private Invitations & Haute Joaillerie Previews
          </h3>
          <p className="text-xs text-[#8c857b] max-w-md leading-relaxed">
            Confidential quarterly communications detailing one-of-a-kind creations, historic gem acquisitions, and salon presentations worldwide.
          </p>
        </div>

        <div className="lg:col-span-6">
          {newsletterSent ? (
            <div className="flex items-center gap-2.5 text-xs text-white bg-white/10 border border-white/20 p-4">
              <CheckCircle2 className="w-4 h-4 shrink-0 text-white" />
              <span>Votre adresse a été enregistrée avec la plus stricte confidentialité diplomatique.</span>
            </div>
          ) : (
            <form onSubmit={handleNewsletterSubmit} className="flex items-center gap-3 border-b border-[#2e2a23] focus-within:border-white transition-colors pb-2">
              <input
                type="email"
                required
                value={newsletterEmail}
                onChange={(e) => setNewsletterEmail(e.target.value)}
                placeholder="Votre adresse email confidentielle"
                className="flex-1 bg-transparent text-[#eee9df] text-xs tracking-wider placeholder:text-[#5c554b] focus:outline-none py-2"
              />
              <button
                type="submit"
                className="text-[10px] uppercase tracking-[0.25em] text-white hover:text-white/70 transition-colors flex items-center gap-2 shrink-0 py-1"
              >
                <span>Souscrire</span>
                <ArrowRight className="w-3.5 h-3.5 text-white" />
              </button>
            </form>
          )}
        </div>
      </div>

      {/* Brand Intro & Salon Presentation Banner */}
      <div className="max-w-6xl mx-auto pb-12 mb-12 border-b border-[rgba(238,233,223,0.08)] flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div>
          <div className="font-serif text-3xl text-white tracking-[0.2em] font-light mb-2">
            AURELIA
          </div>
          <div className="text-[10px] uppercase tracking-[0.28em] text-[#aaa094]">
            Place Vendôme · Paris
          </div>
          <p className="text-xs text-[#7e776e] leading-relaxed max-w-lg mt-2">
            Contemporary haute joaillerie shaped by light, 950 cold-hammered platinum and natural D-Flawless diamonds. Conceived as sculpture, worn as modern heirlooms.
          </p>
        </div>
        <div>
          <button
            onClick={onOpenAppointment}
            className="text-[10px] uppercase tracking-[0.24em] text-white hover:text-white/70 transition-colors border-b border-white/30 hover:border-white pb-1 inline-flex items-center gap-2"
          >
            <span>Request Private Salon Presentation</span>
            <span>→</span>
          </button>
        </div>
      </div>

      {/* 
        Side-by-side Links Grid:
        - 4 columns in one row in desktop mode (wraps to next row if 5th comes)
        - 2 columns in one row in mobile mode
        - Zero yellow colors
      */}
      <div className="max-w-6xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-8 lg:gap-12 pb-16 border-b border-[rgba(238,233,223,0.08)]">
        {/* Column 1: Collections */}
        <div className="space-y-3 text-[10px] uppercase tracking-[0.2em]">
          <div className="text-white font-medium tracking-[0.25em] mb-4">
            Collections
          </div>
          <div className="grid gap-2.5 text-[#aaa094]">
            <button onClick={() => onNavigate('collection')} className="text-left hover:text-white transition-colors">
              Collection I
            </button>
            <button onClick={() => onNavigate('collection')} className="text-left hover:text-white transition-colors">
              Élan de Lumière
            </button>
            <button onClick={() => onNavigate('collection')} className="text-left hover:text-white transition-colors">
              Celeste Arc
            </button>
            <button onClick={() => onNavigate('collection')} className="text-left hover:text-white transition-colors">
              Nocturne
            </button>
            <button onClick={() => onNavigate('collection')} className="text-left hover:text-white transition-colors">
              Constellation Divine
            </button>
            <button onClick={() => onNavigate('collection')} className="text-left hover:text-white transition-colors">
              Archival Vault
            </button>
          </div>
        </div>

        {/* Column 2: Savoir-Faire */}
        <div className="space-y-3 text-[10px] uppercase tracking-[0.2em]">
          <div className="text-white font-medium tracking-[0.25em] mb-4">
            Savoir-Faire
          </div>
          <div className="grid gap-2.5 text-[#aaa094]">
            <button onClick={() => onNavigate('craft')} className="text-left hover:text-white transition-colors">
              The Ateliers
            </button>
            <button onClick={() => onNavigate('craft')} className="text-left hover:text-white transition-colors">
              950 Platinum
            </button>
            <button onClick={() => onNavigate('craft')} className="text-left hover:text-white transition-colors">
              Type IIa Diamonds
            </button>
            <button onClick={() => onNavigate('craft')} className="text-left hover:text-white transition-colors">
              Articulated Pavé
            </button>
            <button onClick={() => onNavigate('maison')} className="text-left hover:text-white transition-colors">
              Patrimoine
            </button>
          </div>
        </div>

        {/* Column 3: Client Privilège */}
        <div className="space-y-3 text-[10px] uppercase tracking-[0.2em]">
          <div className="text-white font-medium tracking-[0.25em] mb-4">
            Client Privilège
          </div>
          <div className="grid gap-2.5 text-[#aaa094]">
            <button onClick={onOpenAppointment} className="text-left hover:text-white transition-colors">
              Salon Privé
            </button>
            <button onClick={onOpenAppointment} className="text-left hover:text-white transition-colors">
              Bespoke Parures
            </button>
            <button onClick={onOpenAppointment} className="text-left hover:text-white transition-colors">
              Armed Courier Delivery
            </button>
            <a href="mailto:concierge@aurelia-joaillerie.fr" className="text-left hover:text-white transition-colors">
              Direct Concierge
            </a>
            <a href="mailto:presse@aurelia-joaillerie.fr" className="text-left hover:text-white transition-colors">
              Press Relations
            </a>
          </div>
        </div>

        {/* Column 4: Correspondance */}
        <div className="space-y-3 text-[10px] uppercase tracking-[0.2em]">
          <div className="text-white font-medium tracking-[0.25em] mb-4">
            Correspondance
          </div>
          <div className="grid gap-2.5 text-[#aaa094]">
            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">
              Instagram
            </a>
            <a href="#wechat" onClick={(e) => e.preventDefault()} className="hover:text-white transition-colors">
              WeChat VIP
            </a>
            <a href="https://whatsapp.com" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">
              WhatsApp Concierge
            </a>
            <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">
              LinkedIn S.A.S.
            </a>
            <a href="mailto:contact@aurelia-joaillerie.fr" className="hover:text-white transition-colors">
              Email Direct
            </a>
          </div>
        </div>
      </div>

      {/* Flagship Salons Worldwide (No yellow colors) */}
      <div className="max-w-6xl mx-auto py-14 border-b border-[rgba(238,233,223,0.08)]">
        <div className="text-[10px] uppercase tracking-[0.3em] text-white/80 mb-8">
          International Salons Privés & Flagships
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
          {BOUTIQUE_SALONS.map((salon) => (
            <div key={salon.city} className="space-y-1 text-xs">
              <h5 className="font-serif text-lg text-white font-light">{salon.city}</h5>
              <div className="text-[9px] uppercase tracking-[0.2em] text-[#aaa094]">{salon.flagship}</div>
              <p className="text-[#756e64] text-[11px] leading-relaxed">{salon.address}</p>
              <div className="text-[#968e82] text-[10px] font-mono pt-1">{salon.phone}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Corporate Registry & Ethical Compliance Data (No yellow colors) */}
      <div className="max-w-6xl mx-auto py-8 border-b border-[rgba(238,233,223,0.06)] flex flex-wrap items-center justify-between gap-6 text-[10px] text-[#6d665b]">
        <div className="space-x-3">
          <span className="text-[#8c857b]">{BUSINESS_REGISTRY.legalName}</span>
          <span>·</span>
          <span>Capital {BUSINESS_REGISTRY.capital}</span>
          <span>·</span>
          <span>{BUSINESS_REGISTRY.rcs}</span>
          <span>·</span>
          <span>{BUSINESS_REGISTRY.guaranteeOffice}</span>
        </div>

        <div className="flex flex-wrap items-center gap-4 text-white/70">
          {BUSINESS_REGISTRY.ethics.map((ethic, idx) => (
            <div key={idx} className="flex items-center gap-1.5">
              <ShieldCheck className="w-3.5 h-3.5 text-white/60" />
              <span className="text-[9px] tracking-wider uppercase text-[#aaa094]">{ethic}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Centered Brand Wordmark at the Bottom */}
      <div className="pt-16 pb-6 text-center overflow-hidden">
        <span
          data-heading-scroll="aurelia-footer"
          className="font-serif text-[42px] xs:text-[48px] sm:text-8xl md:text-9xl lg:text-[145px] tracking-[0.18em] sm:tracking-[0.24em] font-light text-[#1b1915] hover:text-[#2c2720] transition-colors duration-700 uppercase select-none block leading-none"
        >
          AURELIA
        </span>
        <div className="mt-8 flex flex-wrap items-center justify-center gap-4 sm:gap-8 text-[9px] uppercase tracking-[0.3em] text-[#665f54]">
          <span>Place Vendôme · Paris</span>
          <span className="w-1 h-1 rounded-full bg-white/20" />
          <span>© 2026 Aurelia Haute Joaillerie S.A.S.</span>
          <span className="w-1 h-1 rounded-full bg-white/20" />
          <span>Tous droits réservés</span>
        </div>
      </div>
    </footer>
  );
}
