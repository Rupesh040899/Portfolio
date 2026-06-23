import { useContent } from '../context/ContentContext.jsx';
import Reveal from '../components/Reveal.jsx';
import SectionHeading from '../components/SectionHeading.jsx';

export default function Experience() {
  const { content } = useContent();
  const experiences = content.experiences || [];
  if (!experiences.length) return null;

  return (
    <section id="experience" className="container-pro py-24">
      <SectionHeading label="Experience" title="Where I've worked" />

      <div className="mx-auto mt-10 max-w-3xl space-y-5">
        {experiences.map((e, i) => (
          <Reveal key={e._id} delay={i * 60}>
            <div className="card card-hover p-6">
              <div className="flex flex-wrap items-baseline justify-between gap-2">
                <h3 className="text-lg font-semibold">{e.role}</h3>
                {e.duration && <span className="text-sm text-muted">{e.duration}</span>}
              </div>
              <div className="text-sm font-medium text-accent">{e.company}</div>
              {e.description && <p className="mt-3 text-sm text-muted">{e.description}</p>}
              {!!e.achievements?.length && (
                <ul className="mt-3 space-y-1 text-sm text-muted">
                  {e.achievements.map((a, j) => (
                    <li key={j} className="flex gap-2"><span className="text-accent">▹</span>{a}</li>
                  ))}
                </ul>
              )}
              {!!e.technologies?.length && (
                <div className="mt-4 flex flex-wrap gap-2">
                  {e.technologies.map((t) => (
                    <span key={t} className="rounded-md border border-border bg-bg/40 px-2 py-1 font-mono text-xs text-muted">
                      {t}
                    </span>
                  ))}
                </div>
              )}
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
