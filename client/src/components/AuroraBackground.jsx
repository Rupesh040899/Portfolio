import { useRef, useMemo } from 'react';
import { useGSAP } from '@gsap/react';
import gsap, { ScrollTrigger } from '../lib/gsap.js';

/**
 * Subtle dark background: a couple of faint glows near the top + a
 * quiet starfield over a deep navy sky. Calm and clean (image-2 style)
 * rather than a full rainbow aurora.
 */
export default function AuroraBackground() {
  const root = useRef(null);

  const stars = useMemo(
    () =>
      Array.from({ length: 50 }, (_, i) => ({
        left: (i * 37) % 100,
        top: (i * 53) % 70,
        size: (i % 3) + 1,
      })),
    []
  );

  useGSAP(
    () => {
      if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

      gsap.to('.glow', {
        xPercent: (i) => (i % 2 === 0 ? 8 : -8),
        yPercent: (i) => (i % 2 === 0 ? 5 : -3),
        duration: (i) => 12 + i * 3,
        ease: 'sine.inOut',
        repeat: -1,
        yoyo: true,
        stagger: 0.5,
      });
      gsap.to('.star', {
        opacity: 0.8,
        duration: 1.8,
        ease: 'sine.inOut',
        repeat: -1,
        yoyo: true,
        stagger: { each: 0.2, from: 'random' },
      });

      gsap.to('.glow-wrap', {
        yPercent: -20,
        ease: 'none',
        scrollTrigger: { trigger: document.body, start: 'top top', end: 'bottom top', scrub: true },
      });
      return () => ScrollTrigger.getAll().forEach((s) => s.kill());
    },
    { scope: root }
  );

  return (
    <div ref={root} className="pointer-events-none fixed inset-0 -z-10 overflow-hidden bg-bg">
      <div className="glow-wrap absolute inset-x-0 top-0 h-[70vh]">
        <div
          className="glow absolute -left-1/4 -top-20 h-[55vh] w-[70vw] rounded-full blur-[120px] opacity-25"
          style={{ background: 'radial-gradient(50% 60% at 50% 40%, #2dd4bf 0%, transparent 70%)' }}
        />
        <div
          className="glow absolute right-0 -top-10 h-[50vh] w-[55vw] rounded-full blur-[130px] opacity-20"
          style={{ background: 'radial-gradient(50% 60% at 50% 40%, #60a5fa 0%, transparent 70%)' }}
        />
      </div>

      {stars.map((s, i) => (
        <span
          key={i}
          className="star absolute rounded-full bg-white opacity-20"
          style={{ left: `${s.left}%`, top: `${s.top}%`, width: s.size, height: s.size }}
        />
      ))}

      <div className="absolute inset-x-0 bottom-0 h-2/3 bg-gradient-to-b from-transparent to-bg" />
    </div>
  );
}
