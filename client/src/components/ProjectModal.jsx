import { useEffect } from 'react';

function Block({ label, children }) {
  if (!children || (Array.isArray(children) && !children.length)) return null;
  return (
    <div>
      <h4 className="text-xs font-semibold uppercase tracking-wide text-accent">{label}</h4>
      <div className="mt-1 text-sm leading-relaxed text-muted">{children}</div>
    </div>
  );
}

/** Clean, accessible project details dialog. */
export default function ProjectModal({ project, onClose }) {
  const cs = project.caseStudy || {};
  const images = [project.thumbnail, ...(project.gallery || [])].filter((g) => g?.url);

  useEffect(() => {
    const onKey = (e) => e.key === 'Escape' && onClose();
    document.addEventListener('keydown', onKey);
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', onKey);
      document.body.style.overflow = '';
    };
  }, [onClose]);

  return (
    <div
      className="fixed inset-0 z-50 flex items-start justify-center overflow-y-auto bg-black/50 p-4 backdrop-blur-sm md:p-8"
      onClick={onClose}
    >
      <div
        className="card my-auto w-full max-w-2xl bg-elevated p-6 shadow-2xl md:p-8"
        onClick={(e) => e.stopPropagation()}
        role="dialog"
        aria-modal="true"
      >
        <div className="flex items-start justify-between gap-4">
          <div>
            <h3 className="text-2xl font-bold">{project.title}</h3>
            {project.projectType && <p className="mt-1 text-sm text-muted">{project.projectType}</p>}
          </div>
          <button onClick={onClose} className="link-muted text-lg" aria-label="Close">✕</button>
        </div>

        <p className="mt-3 text-muted">{project.description}</p>

        <div className="mt-4 flex flex-wrap gap-2">
          {(project.techStack || []).map((t) => (
            <span key={t} className="rounded border border-border px-2 py-0.5 font-mono text-xs text-muted">{t}</span>
          ))}
        </div>

        {images.length > 0 && (
          <div className="mt-5 grid grid-cols-2 gap-3 sm:grid-cols-3">
            {images.map((img, i) => (
              <img
                key={i}
                src={img.url}
                alt={img.alt || project.title}
                loading="lazy"
                className="h-28 w-full rounded-lg border border-border object-cover"
              />
            ))}
          </div>
        )}

        <div className="mt-6 space-y-4">
          <Block label="Problem">{cs.problemStatement}</Block>
          <Block label="Solution">{cs.solution}</Block>
          <Block label="Architecture">{cs.architecture}</Block>
          <Block label="Database design">{cs.databaseDesign}</Block>
          <Block label="Result">{cs.results}</Block>
          {!!cs.keyLearnings?.length && (
            <Block label="What I learned">
              <ul className="list-inside list-disc space-y-1">
                {cs.keyLearnings.map((k, i) => <li key={i}>{k}</li>)}
              </ul>
            </Block>
          )}
        </div>

        {(project.liveUrl || project.githubUrl) && (
          <div className="mt-6 flex gap-3">
            {project.liveUrl && <a href={project.liveUrl} target="_blank" rel="noreferrer" className="btn-primary">Live ↗</a>}
            {project.githubUrl && <a href={project.githubUrl} target="_blank" rel="noreferrer" className="btn-ghost">Code ↗</a>}
          </div>
        )}
      </div>
    </div>
  );
}
