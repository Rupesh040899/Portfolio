import { useState } from 'react';
import { useContent } from '../context/ContentContext.jsx';
import Reveal from '../components/Reveal.jsx';
import SectionHeading from '../components/SectionHeading.jsx';
import ProjectModal from '../components/ProjectModal.jsx';

const MOBILE_VISIBLE = 4; // how many to show on mobile before "Show all"

export default function Projects() {
  const { content } = useContent();
  const projects = content.projects || [];
  const [active, setActive] = useState(null);
  const [showAll, setShowAll] = useState(false);
  if (!projects.length) return null;

  const hasMore = projects.length > MOBILE_VISIBLE;

  return (
    <section id="projects" className="container-pro py-24">
      <SectionHeading label="Work" title="Selected projects" />

      <div className="mt-10 grid gap-5 md:grid-cols-2">
        {projects.map((p, i) => (
          <Reveal
            key={p._id || p.slug}
            delay={(i % 2) * 70}
            // Hide extras on mobile until "Show all"; always show on md+ screens.
            className={i >= MOBILE_VISIBLE && !showAll ? 'hidden md:block' : ''}
          >
            <button
              onClick={() => setActive(p)}
              className="card card-hover group relative flex h-full w-full flex-col overflow-hidden text-left"
            >
              {/* Thumbnail (if set in the DB) — otherwise a gradient accent bar */}
              {p.thumbnail?.url ? (
                <div className="relative h-44 w-full overflow-hidden">
                  <img
                    src={p.thumbnail.url}
                    alt={p.title}
                    loading="lazy"
                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-surface/90 to-transparent" />
                  {p.featured && (
                    <span className="absolute left-3 top-3 rounded-md bg-bg/70 px-2 py-0.5 text-xs font-medium text-accent backdrop-blur">
                      Featured
                    </span>
                  )}
                </div>
              ) : (
                <span
                  className="block h-1 w-full opacity-70"
                  style={{ backgroundImage: 'linear-gradient(90deg,#2dd4bf,#22d3ee,#60a5fa)' }}
                />
              )}

              <div className="flex flex-1 flex-col p-6">
                <div className="flex items-start justify-between gap-3">
                  <h3 className="text-lg font-semibold">{p.title}</h3>
                  {p.featured && !p.thumbnail?.url && (
                    <span className="rounded-md bg-accent-soft px-2 py-0.5 text-xs font-medium text-accent">
                      Featured
                    </span>
                  )}
                </div>
                <p className="mt-2 text-sm text-muted">{p.shortDescription}</p>
                <div className="mt-4 flex flex-wrap gap-2">
                  {(p.techStack || []).slice(0, 5).map((t) => (
                    <span key={t} className="rounded border border-border px-2 py-0.5 font-mono text-xs text-muted">
                      {t}
                    </span>
                  ))}
                </div>
                <span className="text-aurora mt-5 inline-block text-sm font-semibold">View details →</span>
              </div>
            </button>
          </Reveal>
        ))}
      </div>

      {/* Mobile-only toggle (desktop always shows all) */}
      {hasMore && (
        <div className="mt-8 flex justify-center md:hidden">
          <button onClick={() => setShowAll((s) => !s)} className="btn-ghost">
            {showAll ? 'Show less' : `Show all ${projects.length} projects`}
          </button>
        </div>
      )}

      {active && <ProjectModal project={active} onClose={() => setActive(null)} />}
    </section>
  );
}
