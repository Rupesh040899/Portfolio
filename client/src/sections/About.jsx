import { useContent } from '../context/ContentContext.jsx';
import Reveal from '../components/Reveal.jsx';
import SectionHeading from '../components/SectionHeading.jsx';

export default function About() {
  const { content } = useContent();
  const about = content.about;
  if (!about) return null;

  const experience =
    about.experienceLabel || (about.yearsExperience ? `${about.yearsExperience}+ years` : 'Early career');

  return (
    <section id="about" className="container-pro py-24">
      <SectionHeading label="About" title="A bit about me" />

      <div className="mt-10 grid gap-10 md:grid-cols-3">
        <Reveal className="md:col-span-2">
          <p className="text-lg font-medium">{about.introduction}</p>
          <p className="mt-4 leading-relaxed text-muted">{about.bio}</p>

          {!!about.highlights?.length && (
            <ul className="mt-6 grid gap-x-6 gap-y-2 sm:grid-cols-2">
              {about.highlights.map((h) => (
                <li key={h} className="flex items-center gap-2 text-sm text-muted">
                  <span className="text-accent">▹</span>
                  {h}
                </li>
              ))}
            </ul>
          )}
        </Reveal>

        <Reveal delay={100}>
          <div className="card divide-y divide-border">
            <Fact label="Experience" value={experience} />
            <Fact label="Location" value={about.location || '—'} />
            <Fact label="Status" value={about.availableForWork ? 'Open to work' : 'Currently engaged'} />
          </div>
        </Reveal>
      </div>
    </section>
  );
}

function Fact({ label, value }) {
  return (
    <div className="px-5 py-4">
      <div className="text-xs uppercase tracking-wide text-muted">{label}</div>
      <div className="mt-1 font-semibold">{value}</div>
    </div>
  );
}
