import { useContent } from '../context/ContentContext.jsx';
import Reveal from '../components/Reveal.jsx';
import SectionHeading from '../components/SectionHeading.jsx';

export default function Certifications() {
  const { content } = useContent();
  const certs = content.certifications || [];
  if (!certs.length) return null;

  return (
    <section id="certifications" className="container-pro py-24">
      <SectionHeading label="Certifications" title="Courses & credentials" />

      <div className="mt-10 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
        {certs.map((c, i) => (
          <Reveal key={c._id} delay={i * 60}>
            <a
              href={c.credentialUrl || undefined}
              target={c.credentialUrl ? '_blank' : undefined}
              rel="noreferrer"
              className="card card-hover block h-full p-6"
            >
              <div className="mb-3 flex h-11 w-11 items-center justify-center rounded-xl bg-accent-soft text-xl">
                📜
              </div>
              <h3 className="font-semibold">{c.name}</h3>
              <div className="text-sm text-accent">{c.issuer}</div>
              {!!c.skills?.length && (
                <div className="mt-3 flex flex-wrap gap-2">
                  {c.skills.map((s) => (
                    <span key={s} className="rounded-md border border-border bg-bg/40 px-2 py-1 font-mono text-xs text-muted">
                      {s}
                    </span>
                  ))}
                </div>
              )}
            </a>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
