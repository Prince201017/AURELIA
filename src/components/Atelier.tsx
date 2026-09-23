/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

interface AtelierProps {
  onOpenAppointment: () => void;
}

export function Atelier({ onOpenAppointment }: AtelierProps) {
  return (
    <section className="detail" id="atelier">
      <div className="detail-inner reveal">
        <div className="eyebrow">03 — Private Atelier</div>
        <h2 data-heading-scroll="atelier-title">
          Wear the
          <br />
          unrepeatable.
        </h2>
        <p>
          Private appointments for collectors seeking a piece developed around their own sense of proportion, movement and light.
        </p>
        <button
          onClick={onOpenAppointment}
          className="cta"
        >
          Request a private appointment
        </button>
      </div>
    </section>
  );
}
