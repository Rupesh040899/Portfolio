import { ContentProvider, useContent } from './context/ContentContext.jsx';
import AuroraBackground from './components/AuroraBackground.jsx';
import ScrollProgress from './components/ScrollProgress.jsx';
import Loader from './components/Loader.jsx';
import Navbar from './components/Navbar.jsx';
import Stats from './components/Stats.jsx';
import TechMarquee from './components/TechMarquee.jsx';
import Hero from './sections/Hero.jsx';
import About from './sections/About.jsx';
import Skills from './sections/Skills.jsx';
import Projects from './sections/Projects.jsx';
import Experience from './sections/Experience.jsx';
import Education from './sections/Education.jsx';
import Certifications from './sections/Certifications.jsx';
import Contact from './sections/Contact.jsx';

function Portfolio() {
  const { content, loading } = useContent();

  if (loading) return <Loader />;

  return (
    <>
      <AuroraBackground />
      <ScrollProgress />
      <Navbar />
      <main>
        <Hero />

        <div className="container-pro -mt-6 pb-16">
          <Stats />
        </div>

        <TechMarquee />

        <About />
        <Skills />
        <Projects />
        <Experience />
        <Education />
        <Certifications />
        <Contact />
      </main>

      <footer className="border-t border-border">
        <div className="container-pro flex flex-col items-center justify-between gap-2 py-8 text-sm text-muted sm:flex-row">
          <span>© {new Date().getFullYear()} {content.hero?.name || 'Rupesh Mali'}</span>
          <span>Built with React &amp; Node · MERN</span>
        </div>
      </footer>
    </>
  );
}

export default function App() {
  return (
    <ContentProvider>
      <Portfolio />
    </ContentProvider>
  );
}
