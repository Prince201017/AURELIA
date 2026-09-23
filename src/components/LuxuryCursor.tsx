/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useEffect, useState } from 'react';

export function LuxuryCursor() {
  const [pos, setPos] = useState({ x: -100, y: -100 });
  const [isBig, setIsBig] = useState(false);

  useEffect(() => {
    // Only active on fine pointer (desktop mouse)
    if (window.matchMedia('(pointer: coarse)').matches) {
      return;
    }

    const onPointerMove = (e: PointerEvent) => {
      setPos({ x: e.clientX, y: e.clientY });
    };

    const onMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement | null;
      if (!target) return;
      const interactive = target.closest('a, button, .card, input, select, textarea, [role="button"]');
      if (interactive) {
        setIsBig(true);
      } else {
        setIsBig(false);
      }
    };

    window.addEventListener('pointermove', onPointerMove, { passive: true });
    document.addEventListener('mouseover', onMouseOver, { passive: true });

    return () => {
      window.removeEventListener('pointermove', onPointerMove);
      document.removeEventListener('mouseover', onMouseOver);
    };
  }, []);

  return (
    <div
      className={`cursor ${isBig ? 'big' : ''}`}
      id="cursor"
      style={{
        left: `${pos.x}px`,
        top: `${pos.y}px`
      }}
    />
  );
}
