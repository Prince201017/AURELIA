'use client';

/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import {
  X,
  Eye,
  EyeOff,
  Check,
  Shield,
  FileText,
  ArrowRight,
  ArrowLeft,
} from 'lucide-react';

interface AuthGatewayProps {
  initialMode?: 'signin' | 'signup';
  onClose: () => void;
  onAuthSuccess?: (user: { name: string; email: string; provider?: string }) => void;
}

export function AuthGateway({
  initialMode = 'signin',
  onClose,
  onAuthSuccess,
}: AuthGatewayProps) {
  const [mode, setMode] = useState<'signin' | 'signup'>(initialMode);
  const [showPassword, setShowPassword] = useState(false);

  // Form Fields
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMsg, setErrorMsg] = useState('');

  // Step state for signup: 'inputs' -> 'consent' (both inside the exact same card with border radius)
  const [signUpStep, setSignUpStep] = useState<'inputs' | 'consent'>('inputs');
  const [consent18Plus, setConsent18Plus] = useState(false);
  const [consentTermsRead, setConsentTermsRead] = useState(false);

  // Policy reading view in same style text font: 'tos' | 'privacy' | null
  const [readingPolicy, setReadingPolicy] = useState<'tos' | 'privacy' | null>(null);

  // Provider auth state
  const [authProvider, setAuthProvider] = useState<string | null>(null);

  // Success notification
  const [authComplete, setAuthComplete] = useState<string | null>(null);

  const handleTogglePassword = (e: React.MouseEvent) => {
    e.preventDefault();
    setShowPassword(!showPassword);
  };

  const handleSignInSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password) {
      setErrorMsg('Please enter your email and password.');
      return;
    }
    setErrorMsg('');
    const user = { name: email.split('@')[0], email };
    setAuthComplete(`Welcome back, ${user.name}`);
    if (onAuthSuccess) onAuthSuccess(user);
    setTimeout(() => {
      setAuthComplete(null);
      onClose();
    }, 1200);
  };

  const handleProceedToConsent = (e: React.FormEvent) => {
    e.preventDefault();
    if (!fullName.trim() || !email.trim() || !password.trim()) {
      setErrorMsg('Please fill in all required fields to continue.');
      return;
    }
    if (password.length < 6) {
      setErrorMsg('Password must be at least 6 characters long.');
      return;
    }
    setErrorMsg('');
    // Seamlessly transition to the checkmark step inside the SAME card
    setSignUpStep('consent');
  };

  const handleProviderAuth = (providerName: string) => {
    setErrorMsg('');
    const simulatedName = providerName === 'Google' ? 'Hariom Kumar' : 'Client Privé';
    const simulatedEmail = providerName === 'Google' ? 'hariomkumar7118@gmail.com' : 'client@apple.id';

    setFullName(simulatedName);
    setEmail(simulatedEmail);
    setAuthProvider(providerName);
    setMode('signup');
    // Provider sign up must also complete the checkmark before account is created
    setSignUpStep('consent');
  };

  const handleCompleteAccountCreation = () => {
    if (!consent18Plus || !consentTermsRead) {
      setErrorMsg('Please confirm both checkboxes to complete account creation.');
      return;
    }

    const user = {
      name: fullName || email.split('@')[0],
      email,
      provider: authProvider || 'Email',
    };

    setAuthComplete(`Account created successfully. Welcome to Maison Aurelia, ${user.name}.`);
    if (onAuthSuccess) onAuthSuccess(user);

    setTimeout(() => {
      setAuthComplete(null);
      onClose();
    }, 1400);
  };

  return (
    <div className="auth-gateway fixed inset-0 z-[100] w-full h-full overflow-y-auto bg-[#f4efe8] flex flex-col select-text">
      {/* Floating Close Button (NO top header bar cutting the screen) */}
      <button
        onClick={onClose}
        className="fixed top-5 right-5 sm:top-7 sm:right-7 z-50 p-2 sm:px-3 sm:py-2 rounded-full bg-white/90 hover:bg-white text-[#1c1917] shadow-sm border border-[#dfd7cc] transition-all cursor-pointer flex items-center gap-1.5"
        title="Return to Maison"
        aria-label="Close gateway"
      >
        <X className="w-4 h-4 text-[#1c1917]" />
        <span className="text-[10px] uppercase font-mono tracking-[0.2em] text-[#57534e] hidden sm:inline">
          Return
        </span>
      </button>

      {/* Main Full-Height Container with 100% full background across all screens and bottom */}
      <div className="min-h-screen w-full flex flex-col lg:flex-row bg-[#f4efe8]">
        {/* =========================================================================
            LEFT COLUMN: Editorial Image with Exact Text Overlay (Desktop)
            Matching IMG_20260924_151639.png in typography, positioning and style
           ========================================================================= */}
        <div className="hidden lg:flex lg:w-1/2 relative bg-[#f5f0e8] min-h-screen overflow-hidden select-none border-r border-[#e2dcd2]">
          {/* High-res photograph of model with diamond parure */}
          <img
            src="/IMG_20260924_182658.png"
            alt="Maison Aurelia High Jewellery"
            className="absolute inset-0 w-full h-full object-cover object-top"
          />

          {/* Soft ambient tint to ensure crisp text legibility */}
          <div className="absolute inset-0 bg-gradient-to-r from-[#fbf9f6]/35 via-transparent to-transparent pointer-events-none" />

          {/* EXACT TEXT OVERLAY MATCHING IMG_20260924_151639.png */}
          <div className="relative z-10 w-full h-full flex flex-col justify-between p-12 xl:p-16">
            {/* Top-Left Section */}
            <div className="pt-4">
              <div className="space-y-3">
                <span className="text-[11px] uppercase tracking-[0.28em] text-[#1c1917] font-medium font-mono block">
                  MAISON AURELIA
                </span>
                <div className="w-10 h-[1px] bg-[#1c1917]/50" />
              </div>

              {/* Headline: "A More Radiant You" in Cormorant Garamond */}
              <div className="mt-8 space-y-1">
                <h2 className="font-serif text-5xl xl:text-6xl text-[#1c1917] font-normal leading-[1.06] tracking-tight">
                  A More<br />
                  Radiant<br />
                  You
                </h2>
              </div>

              {/* Subtitles */}
              <div className="mt-9 space-y-1.5 text-[10px] uppercase tracking-[0.28em] text-[#57534e] font-mono">
                <div>PLATINUM</div>
                <div>DIAMONDS</div>
                <div>TIMELESS</div>
              </div>
            </div>

            {/* Bottom-Left Section */}
            <div className="pb-4 space-y-3">
              <div className="w-10 h-[1px] bg-[#1c1917]/50" />
              <div className="text-[10px] uppercase tracking-[0.28em] text-[#57534e] font-mono leading-relaxed">
                <div>JEWELLERY</div>
                <div>BEYOND TIME</div>
              </div>
            </div>
          </div>
        </div>

        {/* =========================================================================
            RIGHT COLUMN: Full Background with the Form & Checkmark in Same Card
            "The from and checkmark is in same with border radius"
            "an the sign in or up page bottom don't have full background" -> fixed with min-h-screen bg-[#f4efe8]
            "And the form font style make as like you first sign form"
           ========================================================================= */}
        <div className="w-full lg:w-1/2 min-h-screen bg-[#f4efe8] flex items-center justify-center p-4 sm:p-8 md:p-12 lg:p-16 overflow-y-auto">
          {/* THE CARD: Form and checkmark share the EXACT SAME container with rounded-2xl */}
          <div className="w-full max-w-[480px] bg-[#faf8f5] border border-[#dfd7cc] shadow-xl p-7 sm:p-9 my-auto rounded-2xl relative transition-all duration-300 overflow-hidden">
            {/* Error Message */}
            {errorMsg && (
              <div className="mb-4 p-3 bg-red-50 border border-red-200 text-red-700 text-xs rounded-lg">
                {errorMsg}
              </div>
            )}

            {/* Success Notification */}
            {authComplete && (
              <div className="mb-4 p-3 bg-[#f0f7f3] border border-[#a8d3ba] text-[#1b4332] text-xs rounded-lg flex items-center gap-2">
                <Check className="w-4 h-4 text-[#2d6a4f] shrink-0" />
                <span>{authComplete}</span>
              </div>
            )}

            {/* POLICY READER OVERLAY IN SAME LUXURY FONT STYLE */}
            {readingPolicy && (
              <div className="absolute inset-0 bg-[#faf8f5] z-30 p-6 sm:p-8 rounded-2xl flex flex-col justify-between animate-fadeIn">
                <div className="overflow-y-auto pr-1.5 custom-auth-scroll">
                  <div className="flex items-center justify-between border-b border-[#dfd7cc] pb-3">
                    <h3 className="font-serif text-2xl text-[#1c1917] tracking-tight">
                      {readingPolicy === 'tos' ? 'Terms of Service & Conditions' : 'Privacy Policy'}
                    </h3>
                    <button
                      type="button"
                      onClick={() => setReadingPolicy(null)}
                      className="font-serif text-sm text-black underline underline-offset-4 hover:text-[#57534e] cursor-pointer"
                    >
                      Close
                    </button>
                  </div>

                  <div className="mt-4 font-serif text-xs sm:text-sm text-[#38332d] leading-relaxed space-y-3.5">
                    {readingPolicy === 'tos' ? (
                      <>
                        <div>
                          <h4 className="font-medium text-[#1c1917] text-sm">
                            1. Exclusive Intellectual Property & Geometries
                          </h4>
                          <p className="mt-1 text-[#57534e]">
                            All website content, product photography, brand marks, designs, CAD files, certificates, and bespoke concepts are owned by Maison Aurelia or its licensors. You may not copy, reproduce, resell, or commercially use them without written permission. Product descriptions and images are presented as accurately as possible, but minor variations may occur in handmade or made-to-order pieces.
                          </p>
                        </div>

                        <div>
                          <h4 className="font-medium text-[#1c1917] text-sm">
                            2. Bespoke Commissions & Certified Escrow
                          </h4>
                          <p className="mt-1 text-[#57534e]">
                            Orders are confirmed only after payment authorization and written acceptance. Prices are shown in Indian Rupees and include applicable taxes unless stated otherwise. For high-value or bespoke orders, we may request identity, address, and payment verification before dispatch. A disclosed advance or customization charge may be non-refundable where work has started.
                          </p>
                        </div>

                        <div>
                          <h4 className="font-medium text-[#1c1917] text-sm">
                            3. Diplomatic Armored Courier Handover
                          </h4>
                          <p className="mt-1 text-[#57534e]">
                            We deliver to serviceable addresses in India through trusted logistics partners. Delivery dates are estimates and may be affected by verification, weather, remote locations, customs, or events beyond our control. You must inspect the parcel at delivery and report visible damage or a missing item to support promptly with photographs and the order number.
                          </p>
                        </div>

                        <div>
                          <h4 className="font-medium text-[#1c1917] text-sm">
                            4. Salon Discretion & Private Viewing Protocols
                          </h4>
                          <p className="mt-1 text-[#57534e]">
                            Eligible ready-to-ship products may be returned or exchanged within the period stated on the product page, subject to condition, packaging, certificates, and verification. Personalized, engraved, resized, altered, hygiene-sensitive, or made-to-order pieces may be excluded except where defective or incorrectly supplied. Nothing here limits rights available under the Consumer Protection Act, 2019.
                          </p>
                        </div>
                      </>
                    ) : (
                      <>
                        <div>
                          <h4 className="font-medium text-[#1c1917] text-sm">
                            1. Sovereign European Vault Security
                          </h4>
                          <p className="mt-1 text-[#57534e]">
                            Personal dossier records, finger dimensions, gemstone preferences, and salon appointments are encrypted and stored within sovereign, air-gapped European vault servers in compliance with Swiss Federal and GDPR regulations.
                          </p>
                        </div>

                        <div>
                          <h4 className="font-medium text-[#1c1917] text-sm">
                            2. Absolute Zero Commercial Tracking
                          </h4>
                          <p className="mt-1 text-[#57534e]">
                            Maison Aurelia maintains an absolute policy of zero commercial tracking. Your client records are never sold, rented, monetized, or shared with commercial advertising networks.
                          </p>
                        </div>

                        <div>
                          <h4 className="font-medium text-[#1c1917] text-sm">
                            3. Complete Right of Erasure
                          </h4>
                          <p className="mt-1 text-[#57534e]">
                            In accordance with GDPR and CNIL standards, clients hold the absolute sovereignty to request full, irreversible erasure of their dossier and private communications at any time.
                          </p>
                        </div>
                      </>
                    )}
                  </div>
                </div>

                <div className="pt-4 border-t border-[#dfd7cc] mt-4 flex items-center justify-between">
                  <span className="text-[10px] uppercase font-mono tracking-[0.2em] text-[#8c857b]">
                    Maison Aurelia Legal Registry
                  </span>
                  <button
                    type="button"
                    onClick={() => setReadingPolicy(null)}
                    className="auth-policy-done py-2.5 px-5 bg-black text-white font-serif text-sm rounded-lg hover:bg-stone-800 transition-colors cursor-pointer"
                  >
                    Done Reading
                  </button>
                </div>
              </div>
            )}

            {/* ===================================================================
                VIEW A: CHECKMARK CONSENT SECTION (Inside the SAME rounded-2xl card)
                Appears when the user inputs all sign up info, or via Google/Apple
               =================================================================== */}
            {mode === 'signup' && signUpStep === 'consent' ? (
              <div className="animate-fadeIn">
                <div className="flex items-center justify-between">
                  <h2 className="font-serif text-2xl sm:text-3xl text-[#1c1917] font-normal tracking-tight">
                    Before We Create Your Account
                  </h2>
                </div>

                {/* EXACT MANDATED LINE */}
                <p className="font-serif italic text-xs text-[#57534e] mt-1.5 leading-relaxed">
                  Please read our privacy policy, terms of service for creating account.
                </p>

                {/* TWO CONSOLIDATED POLICIES (Terms of Service & Privacy Policy) */}
                <div className="mt-5 space-y-3">
                  {/* Policy 1: Terms of Service */}
                  <div className="bg-[#fbf9f6] p-3.5 border border-[#dfd7cb] rounded-xl">
                    <div className="flex items-start justify-between gap-3">
                      <div className="flex items-start gap-2.5">
                        <div className="w-6 h-6 rounded-full bg-[#ede7dc] flex items-center justify-center shrink-0 mt-0.5">
                          <FileText className="w-3.5 h-3.5 text-black" />
                        </div>
                        <div>
                          <h4 className="text-xs font-semibold uppercase tracking-wider text-[#1c1917]">
                            Terms of Service
                          </h4>
                          <p className="text-xs text-[#57534e] mt-0.5 leading-relaxed font-serif">
                            Covers product listings, bespoke orders, pricing, payments, delivery, returns, cancellations, and intellectual property for purchases made in India.
                          </p>
                        </div>
                      </div>
                      <button
                        type="button"
                        onClick={() => setReadingPolicy('tos')}
                        className="font-serif text-sm font-medium text-black underline underline-offset-4 decoration-black/70 hover:text-[#1c1917] cursor-pointer shrink-0 pt-0.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-black focus-visible:ring-offset-2" style={{ color: '#000000' }}
                      >
                        Read
                      </button>
                    </div>
                  </div>

                  {/* Policy 2: Privacy Policy */}
                  <div className="bg-[#fbf9f6] p-3.5 border border-[#dfd7cb] rounded-xl">
                    <div className="flex items-start justify-between gap-3">
                      <div className="flex items-start gap-2.5">
                        <div className="w-6 h-6 rounded-full bg-[#ede7dc] flex items-center justify-center shrink-0 mt-0.5">
                          <Shield className="w-3.5 h-3.5 text-black" />
                        </div>
                        <div>
                          <h4 className="text-xs font-semibold uppercase tracking-wider text-[#1c1917]">
                            Privacy Policy
                          </h4>
                          <p className="text-xs text-[#57534e] mt-0.5 leading-relaxed font-serif">
                            Explains how we collect, use, store, and protect account, order, payment, delivery, and customer-support information under applicable Indian law.
                          </p>
                        </div>
                      </div>
                      <button
                        type="button"
                        onClick={() => setReadingPolicy('privacy')}
                        className="font-serif text-sm font-medium text-black underline underline-offset-4 decoration-black/70 hover:text-[#1c1917] cursor-pointer shrink-0 pt-0.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-black focus-visible:ring-offset-2" style={{ color: '#000000' }}
                      >
                        Read
                      </button>
                    </div>
                  </div>
                </div>

                {/* TWO CIRCULAR BLACK CHECKBOXES */}
                <div className="mt-5 pt-4 border-t border-[#e2dcd2] space-y-3">
                  {/* Checkbox 1: 18+ Consent (Circular in Black) */}
                  <label className="flex items-start gap-3 cursor-pointer select-none group">
                    <div
                      onClick={() => setConsent18Plus(!consent18Plus)}
                      className={`mt-0.5 w-5 h-5 rounded-full border-2 border-black flex items-center justify-center transition-all duration-200 shrink-0 ${
                        consent18Plus ? 'bg-black text-white' : 'bg-[#faf8f5] hover:bg-[#ede7dc]'
                      }`}
                    >
                      {consent18Plus && <Check className="w-3 h-3 stroke-[3] text-white" />}
                    </div>
                    <div>
                      <div className="text-xs font-semibold text-[#1c1917]">
                        I am 18+ years old.
                      </div>
                      <div className="text-[11px] text-[#57534e] font-serif">
                        I confirm that I am at least 18 years of age.
                      </div>
                    </div>
                  </label>

                  {/* Checkbox 2: Read All Policies (Circular in Black) */}
                  <label className="flex items-start gap-3 cursor-pointer select-none group">
                    <div
                      onClick={() => setConsentTermsRead(!consentTermsRead)}
                      className={`mt-0.5 w-5 h-5 rounded-full border-2 border-black flex items-center justify-center transition-all duration-200 shrink-0 ${
                        consentTermsRead ? 'bg-black text-white' : 'bg-[#faf8f5] hover:bg-[#ede7dc]'
                      }`}
                    >
                      {consentTermsRead && <Check className="w-3 h-3 stroke-[3] text-white" />}
                    </div>
                    <div>
                      <div className="text-xs font-semibold text-[#1c1917]">
                        I agree to the policies.
                      </div>
                      <div className="text-[11px] text-[#57534e] font-serif">
                        I accept the Terms of Service and Privacy Policy.
                      </div>
                    </div>
                  </label>
                </div>

                {/* Bottom Buttons: Left Back Button & Right Agree Button */}
                <div className="mt-5 pt-4 border-t border-[#e2dcd2] flex items-center gap-3">
                  <button
                    type="button"
                    onClick={() => setSignUpStep('inputs')}
                    className="px-4 py-3 border-2 border-black bg-[#faf8f5] text-black hover:bg-stone-100 rounded-lg transition-colors cursor-pointer flex items-center gap-2 font-serif font-medium text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-black focus-visible:ring-offset-2" style={{ color: '#000000' }}
                    title="Back to form details"
                  >
                    <ArrowLeft className="w-4 h-4 stroke-[2]" />
                    <span>Back</span>
                  </button>

                  <button
                    type="button"
                    onClick={handleCompleteAccountCreation}
                    disabled={!consent18Plus || !consentTermsRead}
                    className={`flex-1 py-3 px-5 border text-xs uppercase tracking-[0.2em] font-medium transition-all duration-300 flex items-center justify-between rounded-lg ${
                      consent18Plus && consentTermsRead
                        ? 'border-black bg-black text-white hover:bg-stone-900 cursor-pointer shadow-md'
                        : 'border-black bg-[#e8e1d8] text-black cursor-not-allowed'
                    }`}
                  >
                    <span className="w-4" />
                    <span className={consent18Plus && consentTermsRead ? 'text-white font-serif text-sm' : 'text-black font-serif text-sm'}>Agree</span>
                    <ArrowRight className={`w-4 h-4 ${consent18Plus && consentTermsRead ? 'text-white' : 'text-black'}`} />
                  </button>
                </div>
              </div>
            ) : (
              /* ===================================================================
                  VIEW B: INPUT FORM SECTION (Inside the SAME rounded-2xl card)
                 =================================================================== */
              <div>
                {/* Smooth Animated Heading Transition: 'Welcome back' for sign in / 'Create an account' for sign up */}
                <div key={mode} className="animate-fadeIn">
                  <h1 className="font-serif text-3xl sm:text-4xl text-[#1c1917] font-normal tracking-tight">
                    {mode === 'signin' ? 'Welcome back' : 'Create an account'}
                  </h1>

                  <p className="font-serif italic text-xs sm:text-sm text-[#57534e] mt-2 leading-relaxed">
                    {mode === 'signin'
                      ? 'Sign in to your account for a more personal jewellery experience and exclusive access to the maison.'
                      : 'Create your account for bespoke parures, private salon reservations, and maison archives.'}
                  </p>
                </div>

                {/* Mode Switcher Tabs */}
                <div className="flex items-center gap-8 border-b border-[#e2dcd2] mt-6">
                  <button
                    type="button"
                    onClick={() => {
                      setMode('signin');
                      setSignUpStep('inputs');
                      setErrorMsg('');
                    }}
                    className={`font-serif text-xs uppercase tracking-[0.2em] relative pb-2.5 font-semibold transition-colors cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-black focus-visible:ring-offset-2 ${
                      mode === 'signin'
                        ? 'text-[#1c1917]'
                        : 'text-black hover:text-[#57534e]'
                    }`}
                  >
                    SIGN IN
                    {mode === 'signin' && (
                      <span className="absolute bottom-[-1px] left-0 right-0 h-[2px] bg-[#1c1917]" />
                    )}
                  </button>

                  <button
                    type="button"
                    onClick={() => {
                      setMode('signup');
                      setErrorMsg('');
                    }}
                    className={`font-serif text-xs uppercase tracking-[0.2em] relative pb-2.5 font-semibold transition-colors cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-black focus-visible:ring-offset-2 ${
                      mode === 'signup'
                        ? 'text-[#1c1917]'
                        : 'text-black hover:text-[#57534e]'
                    }`}
                  >
                    SIGN UP
                    {mode === 'signup' && (
                      <span className="absolute bottom-[-1px] left-0 right-0 h-[2px] bg-[#1c1917]" />
                    )}
                  </button>
                </div>

                {/* The Form */}
                <form
                  onSubmit={mode === 'signin' ? handleSignInSubmit : handleProceedToConsent}
                  className="mt-5 space-y-3.5"
                >
                  {/* Full Name for Create Account */}
                  {mode === 'signup' && (
                    <div>
                      <input
                        type="text"
                        required
                        value={fullName}
                        onChange={(e) => setFullName(e.target.value)}
                        placeholder="Full Name"
                        className="w-full px-4 py-3 bg-white border border-black text-black placeholder-[#57534e] text-sm focus:outline-none focus:border-black focus:ring-1 focus:ring-black hover:border-black transition-colors rounded-lg font-serif placeholder:font-serif"
                      />
                    </div>
                  )}

                  {/* Email Address */}
                  <div>
                    <input
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="Email Address"
                      className="w-full px-4 py-3 bg-white border border-black text-black placeholder-[#57534e] text-sm focus:outline-none focus:border-black focus:ring-1 focus:ring-black hover:border-black transition-colors rounded-lg font-serif placeholder:font-serif"
                    />
                  </div>

                  {/* Password with Eye Toggle */}
                  <div>
                    <div className="relative flex items-center">
                      <input
                        type={showPassword ? 'text' : 'password'}
                        required
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="Password"
                        className="w-full px-4 py-3 pr-12 bg-white border border-black text-black placeholder-[#57534e] text-sm focus:outline-none focus:border-black focus:ring-1 focus:ring-black hover:border-black transition-colors rounded-lg font-serif placeholder:font-serif"
                      />

                      {/* Password Eye Toggle (Clean, non-inverted) */}
                      <div className="absolute right-3 flex items-center">
                        <button
                          type="button"
                          onClick={handleTogglePassword}
                          className="p-1.5 rounded-full text-black hover:bg-stone-100 transition-colors flex items-center justify-center cursor-pointer"
                          title={showPassword ? 'Hide password' : 'Show password'}
                          aria-label={showPassword ? 'Hide password' : 'Show password'}
                        >
                          {showPassword ? (
                            <EyeOff className="w-4 h-4 text-black stroke-black" />
                          ) : (
                            <Eye className="w-4 h-4 text-black stroke-black" />
                          )}
                        </button>
                      </div>
                    </div>

                    {/* Forgot Password Link */}
                    {mode === 'signin' && (
                      <div className="flex justify-end pt-1.5">
                        <button
                          type="button"
                          onClick={() => {
                            setAuthComplete('A confidential password reset token has been dispatched to your email address.');
                            setTimeout(() => setAuthComplete(null), 3000);
                          }}
                          className="text-xs text-[#57534e] hover:text-black font-serif italic transition-colors cursor-pointer"
                        >
                          Forgot password?
                        </button>
                      </div>
                    )}
                  </div>

                  {/* Primary Action Button: 'Sign in' / 'Sign up' in white inside dark background */}
                  <button
                    type="submit"
                    className="w-full mt-3 py-3.5 px-6 bg-[#1c1917] hover:bg-black text-white text-xs uppercase tracking-[0.2em] font-medium transition-all duration-200 flex items-center justify-between rounded-lg group cursor-pointer shadow-sm"
                  >
                    <span className="w-4" />
                    <span className="tracking-[0.2em] text-white">
                      {mode === 'signin' ? 'Sign in' : 'Sign up'}
                    </span>
                    <ArrowRight className="w-4 h-4 text-white transition-transform group-hover:translate-x-1" />
                  </button>
                </form>

                {/* Divider: OR CONTINUE WITH */}
                <div className="relative my-5 flex items-center justify-center">
                  <div className="absolute inset-0 flex items-center">
                    <div className="w-full border-t border-[#e2dcd2]" />
                  </div>
                  <span className="relative bg-[#faf8f5] px-4 text-[9px] uppercase tracking-[0.25em] text-[#8c857b] font-mono">
                    OR CONTINUE WITH
                  </span>
                </div>

                {/* Social Provider Buttons - White background, black border, text inside in black, with icons */}
                <div className="grid grid-cols-2 gap-3">
                  {/* Google */}
                  <button
                    type="button"
                    onClick={() => handleProviderAuth('Google')}
                    className="w-full py-2.5 px-3 border border-black text-black text-[10px] sm:text-[11px] tracking-[0.16em] uppercase font-medium flex items-center justify-center gap-2.5 transition-colors bg-white hover:bg-[#f3ede3] rounded-lg cursor-pointer"
                  >
                    <svg className="w-4 h-4 shrink-0" viewBox="0 0 24 24">
                      <path
                        fill="#4285F4"
                        d="M23.745 12.27c0-.7-.06-1.4-.19-2.07H12v4.51h6.6c-.29 1.52-1.14 2.8-2.4 3.66v3.05h3.88c2.27-2.09 3.66-5.17 3.66-9.15z"
                      />
                      <path
                        fill="#34A853"
                        d="M12 24c3.24 0 5.95-1.08 7.93-2.91l-3.88-3.05c-1.08.72-2.45 1.16-4.05 1.16-3.12 0-5.77-2.1-6.72-4.93H1.26v3.15C3.25 21.37 7.34 24 12 24z"
                      />
                      <path
                        fill="#FBBC05"
                        d="M5.28 14.27c-.25-.72-.38-1.49-.38-2.27s.13-1.55.38-2.27V6.58H1.26C.46 8.16 0 9.98 0 12s.46 3.84 1.26 5.42l4.02-3.15z"
                      />
                      <path
                        fill="#EA4335"
                        d="M12 4.75c1.77 0 3.35.61 4.6 1.8l3.42-3.42C17.95 1.19 15.24 0 12 0 7.34 0 3.25 2.63 1.26 6.58l4.02 3.15c.95-2.83 3.6-4.98 6.72-4.98z"
                      />
                    </svg>
                    <span className="text-black font-medium tracking-[0.16em]">GOOGLE</span>
                  </button>

                  {/* Apple */}
                  <button
                    type="button"
                    onClick={() => handleProviderAuth('Apple')}
                    className="w-full py-2.5 px-3 border border-black text-black text-[10px] sm:text-[11px] tracking-[0.16em] uppercase font-medium flex items-center justify-center gap-2.5 transition-colors bg-white hover:bg-[#f3ede3] rounded-lg cursor-pointer"
                  >
                    <svg className="w-3.5 h-3.5 fill-black shrink-0" viewBox="0 0 170 170">
                      <path d="M150.37 130.25c-2.45 5.66-5.35 10.87-8.71 15.66-4.58 6.53-8.33 11.05-11.22 13.56-4.48 4.12-9.28 6.23-14.42 6.35-3.69 0-8.14-1.05-13.32-3.18-5.19-2.12-9.97-3.17-14.34-3.17-4.58 0-9.49 1.05-14.75 3.17-5.26 2.13-9.5 3.24-12.74 3.35-4.35.13-9.16-1.9-14.42-6.08-3.7-3.04-7.7-7.77-12.01-14.19-6.3-9.47-11.07-20.35-14.3-32.65-3.23-12.3-4.85-23.75-4.85-34.36 0-16.14 4.14-29.24 12.42-39.31 8.28-10.07 18.59-15.19 30.93-15.37 5.09 0 10.74 1.34 16.94 4.02 6.2 2.68 10.22 4.09 12.06 4.22 1.48-.22 5.76-1.68 12.83-4.38 7.07-2.7 13.06-3.83 17.97-3.39 13.39 1.13 23.78 6.13 31.18 15.01-11.83 7.17-17.65 17.06-17.47 29.68.17 9.87 3.99 18.27 11.45 25.19 7.46 6.92 16.5 10.78 27.12 11.59-2.35 7.15-5.29 14.3-8.82 21.46zM119.22 33.56c0-7.39 2.67-14.41 8.01-21.06 5.34-6.65 11.96-11.06 19.86-13.23.44 2.26.66 4.43.66 6.52 0 7.39-2.73 14.54-8.19 21.45-5.46 6.91-12.16 11.39-20.1 13.44-.09-2.43-.24-4.8-.24-7.12z" />
                    </svg>
                    <span className="text-black font-medium tracking-[0.16em]">APPLE</span>
                  </button>
                </div>

                {/* Bottom Switch Link */}
                <div className="text-center mt-5 text-xs text-[#57534e] font-serif">
                  {mode === 'signin' ? (
                    <span>
                      New to AURELIA?{' '}
                      <button
                        type="button"
                        onClick={() => {
                          setMode('signup');
                          setSignUpStep('inputs');
                          setErrorMsg('');
                        }}
                        className="font-serif text-black underline underline-offset-4 hover:text-[#57534e] cursor-pointer"
                      >
                        Create an account
                      </button>{' '}
                      →
                    </span>
                  ) : (
                    <span>
                      Already have an account?{' '}
                      <button
                        type="button"
                        onClick={() => {
                          setMode('signin');
                          setErrorMsg('');
                        }}
                        className="font-serif text-black underline underline-offset-4 hover:text-[#57534e] cursor-pointer"
                      >
                        Sign in
                      </button>{' '}
                      →
                    </span>
                  )}
                </div>

                {/* Legal Footnote */}
                <div className="border-t border-[#e2dcd2] mt-5 pt-3.5 text-center">
                  <p className="text-[10px] text-[#8c857b] font-serif">
                    By continuing, you agree to Maison Aurelia's Terms of Service and Privacy Policy.
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
