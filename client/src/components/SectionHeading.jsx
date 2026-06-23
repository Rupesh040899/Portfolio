import Reveal from './Reveal.jsx';

/** Centered section heading: accent eyebrow + bold title + optional sub. */
export default function SectionHeading({ label, title, sub }) {
  return (
    <Reveal>
      <div className="text-center">
        <p className="eyebrow justify-center">{label}</p>
        <h2 className="mt-3 text-3xl font-bold tracking-tight md:text-4xl">{title}</h2>
        {sub && <p className="mx-auto mt-3 max-w-2xl text-muted">{sub}</p>}
      </div>
    </Reveal>
  );
}
