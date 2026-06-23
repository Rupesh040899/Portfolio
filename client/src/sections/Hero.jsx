import { useRef, useState } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from '../lib/gsap.js';
import { useContent } from '../context/ContentContext.jsx';
import useTilt from '../hooks/useTilt.js';
import useMagnetic from '../hooks/useMagnetic.js';

function initials(name = '') {
  return name.split(' ').filter(Boolean).slice(0, 2).map((n) => n[0]).join('').toUpperCase();
}

export default function Hero() {
  const root = useRef(null);
  const tilt = useTilt({ max: 10 });
  const resumeBtn = useMagnetic();
  const projectsBtn = useMagnetic();
  const { content } = useContent();
  const hero = content.hero;
  const about = content.about;
  const [imgOk, setImgOk] = useState(true);

  useGSAP(
    () => {
      if (!hero) return;
      gsap.from('[data-hero]', { y: 30, opacity: 0, duration: 0.9, ease: 'power3.out', stagger: 0.1 });
      gsap.from('[data-photo]', { scale: 0.9, opacity: 0, duration: 1.1, ease: 'power3.out', delay: 0.2 });
    },
    { scope: root, dependencies: [!!hero] }
  );

  if (!hero) return null;

  // Photo: hero.avatar.url from the DB, else the file you drop at client/public/profile.jpg
  const photoSrc = hero.avatar?.url || '/profile.jpg';
  const experience =
    about?.experienceLabel || (about?.yearsExperience ? `${about.yearsExperience}+ yrs` : 'Early career');

  return (
    <section
      id="home"
      ref={root}
      className="container-pro grid min-h-[92vh] items-center gap-12 py-24 md:grid-cols-5"
    >
      {/* Left: intro */}
      <div className="md:col-span-3">
        <p data-hero className="mb-4 font-mono text-sm text-accent">Hi, my name is</p>

        <h1 data-hero className="text-5xl font-extrabold leading-[1.02] tracking-tight sm:text-6xl md:text-7xl">
          <span className="text-aurora">{hero.name}</span>
        </h1>
        <p data-hero className="mt-4 text-2xl font-semibold text-muted md:text-3xl">{hero.title}</p>

        <p data-hero className="mt-6 max-w-xl leading-relaxed text-muted">{hero.description}</p>

        <div data-hero className="mt-9 flex flex-wrap items-center gap-4">
          <a
            ref={resumeBtn}
            href={hero.resumeUrl || '#contact'}
            target={hero.resumeUrl ? '_blank' : undefined}
            rel="noreferrer"
            className="btn-primary"
          >
            {hero.resumeUrl ? 'View Resume' : 'Get in touch'}
          </a>
          <a ref={projectsBtn} href="#contact" className="btn-ghost">Let's talk</a>
        </div>

        <div data-hero className="mt-9 flex flex-wrap items-center gap-x-6 gap-y-2 text-sm">
          {hero.email && <a href={`mailto:${hero.email}`} className="link-muted">{hero.email}</a>}
          {hero.githubUrl && <a href={hero.githubUrl} target="_blank" rel="noreferrer" className="link-muted">GitHub</a>}
          {hero.linkedinUrl && <a href={hero.linkedinUrl} target="_blank" rel="noreferrer" className="link-muted">LinkedIn</a>}
        </div>
      </div>

      {/* Right: photo with aurora ring */}
      <div className="md:col-span-2">
        <div data-photo ref={tilt} className="relative mx-auto w-fit" style={{ transformStyle: 'preserve-3d' }}>
          {/* glow */}
          <div
            className="absolute -inset-5 rounded-[2.2rem] opacity-70 blur-2xl"
            style={{ background: 'linear-gradient(135deg,#2dd4bf,#22d3ee,#60a5fa)' }}
          />
          {/* gradient ring */}
          <div
            className="relative rounded-[2rem] p-[3px]"
            style={{ background: 'linear-gradient(135deg,#2dd4bf,#22d3ee,#60a5fa)' }}
          >
            {imgOk ? (
              <img
                src={photoSrc}
                alt={hero.name}
                onError={() => setImgOk(false)}
                className="h-72 w-72 rounded-[1.85rem] object-cover sm:h-80 sm:w-80"
              />
            ) : (
              <div className="flex h-72 w-72 items-center justify-center rounded-[1.85rem] bg-surface text-5xl font-extrabold text-aurora sm:h-80 sm:w-80">
                {initials(hero.name)}
              </div>
            )}
          </div>

          {/* status chip */}
          {about?.availableForWork && (
            <div className="absolute -bottom-3 left-1/2 -translate-x-1/2 whitespace-nowrap rounded-full border border-border bg-elevated px-4 py-2 text-xs font-medium shadow-lg backdrop-blur">
              <span className="mr-2 inline-block h-2 w-2 rounded-full bg-accent align-middle" />
              {experience} · Open to work
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
