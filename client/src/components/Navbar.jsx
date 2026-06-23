import { useEffect, useState } from 'react';
import { useContent } from '../context/ContentContext.jsx';
import { useTheme } from '../hooks/useTheme.js';

const LINKS = [
  { id: 'about', label: 'About' },
  { id: 'skills', label: 'Skills' },
  { id: 'projects', label: 'Projects' },
  { id: 'experience', label: 'Experience' },
  { id: 'contact', label: 'Contact' },
];

export default function Navbar() {
  const { content } = useContent();
  const { theme, toggle } = useTheme();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 16);
    onScroll();
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const go = (id) => {
    setOpen(false);
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all ${
        scrolled
          ? 'border-b border-white/10 bg-bg/30 backdrop-blur-xl'
          : 'border-b border-transparent'
      }`}
    >
      <nav className="container-pro flex items-center justify-between py-4">
        <button onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} className="text-lg font-extrabold tracking-tight">
          <span className="text-aurora">{content.hero?.name || 'Rupesh Mali'}</span>
        </button>

        <div className="hidden items-center gap-7 md:flex">
          {LINKS.map((l) => (
            <button key={l.id} onClick={() => go(l.id)} className="text-sm link-muted">
              {l.label}
            </button>
          ))}
          <ThemeButton theme={theme} toggle={toggle} />
          {content.hero?.resumeUrl && (
            <a href={content.hero.resumeUrl} target="_blank" rel="noreferrer" className="btn-primary">
              Resume
            </a>
          )}
        </div>

        <div className="flex items-center gap-3 md:hidden">
          <ThemeButton theme={theme} toggle={toggle} />
          <button onClick={() => setOpen((o) => !o)} aria-label="Menu" className="text-xl">
            {open ? '✕' : '☰'}
          </button>
        </div>
      </nav>

      {open && (
        <div className="border-t border-white/10 bg-bg/80 px-6 pb-4 backdrop-blur-xl md:hidden">
          {LINKS.map((l) => (
            <button key={l.id} onClick={() => go(l.id)} className="block w-full py-2.5 text-left text-sm link-muted">
              {l.label}
            </button>
          ))}
          {content.hero?.resumeUrl && (
            <a href={content.hero.resumeUrl} target="_blank" rel="noreferrer" className="btn-primary mt-2 w-full">
              Resume
            </a>
          )}
        </div>
      )}
    </header>
  );
}

function ThemeButton({ theme, toggle }) {
  return (
    <button
      onClick={toggle}
      aria-label={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
      title={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
      className="flex h-9 w-9 items-center justify-center rounded-lg border border-border text-muted transition-colors hover:border-accent hover:text-accent"
    >
      {theme === 'light' ? '🌙' : '☀️'}
    </button>
  );
}
