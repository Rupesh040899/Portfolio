import { useContent } from '../context/ContentContext.jsx';
import Reveal from '../components/Reveal.jsx';
import SectionHeading from '../components/SectionHeading.jsx';

export default function Education() {
  const { content } = useContent();
  const education = content.education || [];
  if (!education.length) return null;

  return (
    <section id="education" className="container-pro py-24">
      <SectionHeading label="Education" title="Where I studied" />

      <div className="mt-10 grid gap-5 md:grid-cols-2">
        {education.map((e, i) => (
          <Reveal key={e._id} delay={i * 60}>
            <div className="card card-hover h-full p-6">
              <div className="mb-3 flex h-11 w-11 items-center justify-center rounded-xl bg-accent-soft text-xl">
                🎓
              </div>
              <div className="flex flex-wrap items-baseline justify-between gap-2">
                <h3 className="text-lg font-semibold">{e.degree}</h3>
                {e.duration && <span className="text-sm text-muted">{e.duration}</span>}
              </div>
              <div className="text-sm font-medium text-accent">{e.institute}</div>
              {e.description && <p className="mt-3 text-sm text-muted">{e.description}</p>}
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
