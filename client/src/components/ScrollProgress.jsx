import { useEffect, useState } from 'react';

/** Thin aurora progress bar at the very top, tracking scroll position. */
export default function ScrollProgress() {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const onScroll = () => {
      const el = document.documentElement;
      const max = el.scrollHeight - el.clientHeight;
      setProgress(max > 0 ? Math.min(1, el.scrollTop / max) : 0);
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
    };
  }, []);

  return (
    <div className="fixed inset-x-0 top-0 z-[60] h-[3px]">
      <div
        className="h-full origin-left"
        style={{
          transform: `scaleX(${progress})`,
          backgroundImage: 'linear-gradient(90deg,#2dd4bf,#22d3ee,#a78bfa,#e879f9)',
        }}
      />
    </div>
  );
}
