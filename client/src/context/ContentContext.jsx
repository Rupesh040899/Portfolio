import { createContext, useContext, useEffect, useState } from 'react';
import { api } from '../lib/api.js';

/**
 * Loads all portfolio content once (from the API, or mock data before
 * the database is connected) and shares it with the whole app.
 * Plain React Context — nothing fancy.
 */
const ContentContext = createContext(null);

export function ContentProvider({ children }) {
  const [content, setContent] = useState({
    hero: null,
    about: null,
    skills: [],
    projects: [],
    experiences: [],
    education: [],
    certifications: [],
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let active = true;

    async function load() {
      const [hero, about, skills, projects, experiences, education, certifications] =
        await Promise.all([
          api.getHero(),
          api.getAbout(),
          api.getSkills(),
          api.getProjects(),
          api.getExperiences(),
          api.getEducation(),
          api.getCertifications(),
        ]);

      if (!active) return;
      setContent({ hero, about, skills, projects, experiences, education, certifications });
      setLoading(false);
    }

    load();
    return () => {
      active = false;
    };
  }, []);

  return (
    <ContentContext.Provider value={{ content, loading }}>{children}</ContentContext.Provider>
  );
}

export function useContent() {
  const ctx = useContext(ContentContext);
  if (!ctx) throw new Error('useContent must be used inside <ContentProvider>');
  return ctx;
}
