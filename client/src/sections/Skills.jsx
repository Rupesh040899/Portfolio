import { useContent } from '../context/ContentContext.jsx';
import Reveal from '../components/Reveal.jsx';
import SectionHeading from '../components/SectionHeading.jsx';

const GROUPS = [
  { key: 'frontend', label: 'Frontend' },
  { key: 'backend', label: 'Backend' },
  { key: 'database', label: 'Database' },
  { key: 'language', label: 'Languages' },
  { key: 'tooling', label: 'Tools' },
];

export default function Skills() {
  const { content } = useContent();
  const skills = content.skills || [];
  if (!skills.length) return null;

  const byGroup = GROUPS.map((g) => ({ ...g, items: skills.filter((s) => s.category === g.key) })).filter(
    (g) => g.items.length
  );
  const known = new Set(GROUPS.map((g) => g.key));
  const other = skills.filter((s) => !known.has(s.category));
  if (other.length) byGroup.push({ key: 'other', label: 'Other', items: other });

  return (
    <section id="skills" className="container-pro py-24">
      <SectionHeading label="Core Skills" title="What I work with" />

      <div className="mt-10 grid gap-4 sm:grid-cols-2">
        {byGroup.map((g, i) => (
          <Reveal key={g.key} delay={i * 50}>
            <div className="card card-hover h-full p-6">
              <h3 className="text-sm font-semibold uppercase tracking-wide text-muted">{g.label}</h3>
              <div className="mt-4 flex flex-wrap gap-2">
                {g.items.map((s) => (
                  <span
                    key={s._id || s.name}
                    title={s.experienceLevel || ''}
                    className="rounded-md border border-border bg-bg px-3 py-1.5 text-sm font-medium"
                  >
                    {s.name}
                  </span>
                ))}
              </div>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
