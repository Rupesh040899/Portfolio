import { useRef } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from '../lib/gsap.js';

/**
 * 3D tilt toward the cursor. Attach the returned ref to an element.
 * Also sets --mx/--my (0–100%) so you can place a cursor-follow glow.
 */
export function useTilt({ max = 12 } = {}) {
  const ref = useRef(null);

  useGSAP(
    () => {
      const el = ref.current;
      if (!el || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

      const onMove = (e) => {
        const r = el.getBoundingClientRect();
        const px = (e.clientX - r.left) / r.width;
        const py = (e.clientY - r.top) / r.height;
        el.style.setProperty('--mx', `${px * 100}%`);
        el.style.setProperty('--my', `${py * 100}%`);
        gsap.to(el, {
          rotateY: (px - 0.5) * max * 2,
          rotateX: -(py - 0.5) * max * 2,
          transformPerspective: 800,
          transformOrigin: 'center',
          duration: 0.4,
          ease: 'power2.out',
        });
      };
      const onLeave = () =>
        gsap.to(el, { rotateX: 0, rotateY: 0, duration: 0.7, ease: 'elastic.out(1,0.5)' });

      el.addEventListener('mousemove', onMove);
      el.addEventListener('mouseleave', onLeave);
      return () => {
        el.removeEventListener('mousemove', onMove);
        el.removeEventListener('mouseleave', onLeave);
      };
    },
    { scope: ref }
  );

  return ref;
}

export default useTilt;
