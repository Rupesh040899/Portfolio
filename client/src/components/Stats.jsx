import { useContent } from '../context/ContentContext.jsx';
import Reveal from './Reveal.jsx';
import useCountUp from '../hooks/useCountUp.js';

function Stat({ value, suffix, label }) {
  const { ref, value: shown } = useCountUp(Number(value) || 0);
  return (
    <div ref={ref} className="card card-hover p-5 text-center">
      <div className="text-3xl font-extrabold tracking-tight">
        {shown}
        <span className="text-accent">{suffix}</span>
      </div>
      <div className="mt-1 text-xs uppercase tracking-wide text-muted">{label}</div>
    </div>
  );
}

/** Honest stats strip, driven by about.statistics. */
export default function Stats() {
  const { content } = useContent();
  const stats = content.about?.statistics || [];
  if (!stats.length) return null;

  return (
    <Reveal>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
        {stats.map((s) => (
          <Stat key={s.label} value={s.value} suffix={s.suffix} label={s.label} />
        ))}
      </div>
    </Reveal>
  );
}
