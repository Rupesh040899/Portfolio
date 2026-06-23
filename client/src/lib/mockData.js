/**
 * Mock content used when VITE_USE_MOCKS=true (or when the API is
 * unreachable). Mirrors the server seed data so the experience looks
 * complete before MongoDB is connected. Once your DB is live, set
 * VITE_USE_MOCKS=false and this is bypassed.
 *
 * ⚠️ HONEST-CONTENT NOTE
 * This is written for an early-career developer / intern. Keep it
 * truthful. Anything marked "// EDIT" or "(replace…)" is a placeholder
 * for YOUR real details — swap in real values, don't inflate them.
 */
export const mockData = {
  hero: {
    name: 'Rupesh Mali',
    title: 'Full-Stack Developer (Intern)',
    tagline: 'Learning fast, building real things with the MERN stack.',
    description:
      "I'm a full-stack developer currently doing a software engineering internship. I build with the MERN stack — React on the front; Node, Express and MongoDB on the back — and I care about writing clean code and shipping things that actually work. I'm early in my journey and getting better every week.",
    roles: ['Full-Stack Developer', 'MERN Stack', 'React • Node • MongoDB', 'Always Learning'],
    email: 'rupesh.mali0408@gmail.com',
    location: 'India',
    githubUrl: 'https://github.com/',
    linkedinUrl: 'https://linkedin.com/in/',
    resumeUrl: '',
  },
  about: {
    introduction: 'Early-career developer who loves building and learning.',
    bio: "I'm currently interning as a full-stack developer, working hands-on with the MERN stack. I enjoy taking an idea all the way from a MongoDB schema to a polished React interface. I'm honest about where I am — at the start of my career — and serious about improving every single day.",
    yearsExperience: 0,
    experienceLabel: '3 months (interning)', // EDIT as your internship progresses
    location: 'India',
    availableForWork: true,
    // Honest, modest numbers. EDIT each value to your real figures.
    statistics: [
      { label: 'Months Interning', value: 3, suffix: '', icon: 'clock' },
      { label: 'Projects Built', value: 4, suffix: '', icon: 'rocket' }, // EDIT real count
      { label: 'Technologies Used', value: 8, suffix: '', icon: 'layers' }, // EDIT
      { label: 'Courses Completed', value: 2, suffix: '', icon: 'book' }, // EDIT
    ],
    highlights: ['Eager to learn', 'MERN stack', 'Clean, readable code', 'Detail-oriented'],
  },
  // Self-rated comfort levels — honest for someone early in their journey.
  // EDIT proficiency / level to match how you actually feel about each.
  skills: [
    { _id: 's1', name: 'React', category: 'frontend', color: '#61dafb', proficiency: 75, experienceLevel: 'intermediate', isCore: true, connections: ['Redux', 'Tailwind', 'GSAP'] },
    { _id: 's2', name: 'JavaScript', category: 'language', color: '#f7df1e', proficiency: 78, experienceLevel: 'intermediate', isCore: true, connections: ['React', 'Node.js'] },
    { _id: 's3', name: 'Redux', category: 'frontend', color: '#764abc', proficiency: 55, experienceLevel: 'beginner', connections: ['React'] },
    { _id: 's4', name: 'Tailwind', category: 'frontend', color: '#38bdf8', proficiency: 72, experienceLevel: 'intermediate', connections: ['React'] },
    { _id: 's5', name: 'GSAP', category: 'frontend', color: '#88ce02', proficiency: 50, experienceLevel: 'beginner', connections: ['React'] },
    { _id: 's6', name: 'Node.js', category: 'backend', color: '#3c873a', proficiency: 70, experienceLevel: 'intermediate', isCore: true, connections: ['Express', 'MongoDB', 'JWT'] },
    { _id: 's7', name: 'Express', category: 'backend', color: '#ffffff', proficiency: 68, experienceLevel: 'intermediate', connections: ['Node.js'] },
    { _id: 's8', name: 'MongoDB', category: 'database', color: '#47a248', proficiency: 65, experienceLevel: 'intermediate', connections: ['Node.js', 'Express'] },
    { _id: 's9', name: 'JWT', category: 'backend', color: '#f04e98', proficiency: 55, experienceLevel: 'beginner', connections: ['Node.js'] },
    { _id: 's10', name: 'Git', category: 'tooling', color: '#f1502f', proficiency: 65, experienceLevel: 'intermediate', connections: [] },
    { _id: 's11', name: 'TypeScript', category: 'language', color: '#3178c6', proficiency: 35, experienceLevel: 'beginner', connections: ['JavaScript'] }, // currently learning
  ],
  projects: [
    {
      _id: 'p1',
      title: 'RUPESH OS Portfolio',
      slug: 'rupesh-os-portfolio',
      shortDescription: 'This site — a futuristic, OS-style portfolio with a custom MERN backend.',
      description:
        'An immersive portfolio that behaves like an operating system — boot sequence, command center, project vault and a data-driven backend with a custom CMS API.',
      techStack: ['React', 'GSAP', 'Node.js', 'Express', 'MongoDB', 'Tailwind'],
      featured: true,
      projectType: 'Web App',
      industry: 'Personal',
      caseStudy: {
        problemStatement: 'I wanted a portfolio that shows what I can build, not just a list of skills.',
        solution: 'Built a full MERN app: an Express + Mongoose API with JWT auth, and an animated React frontend.',
        architecture: 'React + Vite SPA talking to an Express/Mongoose REST API; media planned via Cloudinary.',
        databaseDesign: 'Singleton hero/about documents + collection-based skills, projects, experiences, etc.',
        results: 'A complete, working MERN application I built end-to-end while learning.',
        keyLearnings: ['Structuring a real REST API', 'Mongoose schema design', 'GSAP animation basics'],
      },
      metrics: {}, // add real numbers only if you can back them up (e.g. a real Lighthouse score)
    },
    // ─────────────────────────────────────────────────────────────
    // PLACEHOLDER PROJECTS — replace these two with REAL projects you
    // built (college, internship, or personal). Delete one if you only
    // have one more. Keep it truthful: describe what YOU actually did.
    // ─────────────────────────────────────────────────────────────
    {
      _id: 'p2',
      title: 'Project #2 — replace with your work',
      slug: 'project-two',
      shortDescription: 'One honest line about a real project you built.',
      description: 'Describe what the project does and what your role was.',
      techStack: ['React', 'Node.js', 'MongoDB'],
      featured: true,
      projectType: 'Web App',
      industry: '',
      caseStudy: {
        problemStatement: 'What problem were you solving?',
        solution: 'What did you build and how?',
        results: 'What was the outcome? (Keep it real.)',
        keyLearnings: ['Something you learned'],
      },
      metrics: {},
    },
    {
      _id: 'p3',
      title: 'Project #3 — replace with your work',
      slug: 'project-three',
      shortDescription: 'One honest line about another real project.',
      description: 'Describe the project and your contribution.',
      techStack: ['JavaScript', 'Express', 'MongoDB'],
      featured: false,
      projectType: '',
      industry: '',
      caseStudy: {
        problemStatement: 'What problem were you solving?',
        solution: 'What did you build and how?',
        results: 'What was the outcome?',
        keyLearnings: ['Something you learned'],
      },
      metrics: {},
    },
  ],
  experiences: [
    {
      _id: 'e1',
      company: 'Your Company — replace', // EDIT: your internship company
      role: 'Full-Stack Developer Intern',
      current: true,
      duration: 'Mar 2026 — Present · 6-month internship', // EDIT real dates
      description:
        'Working hands-on across the stack with the MERN stack. (Replace with what you actually do — features you build, tools you use, what you are learning.)',
      technologies: ['React', 'Node.js', 'Express', 'MongoDB'],
      achievements: [
        '(Add a real thing you built or contributed to)',
        '(Add something you learned or improved)',
      ],
    },
  ],
  education: [
    {
      _id: 'ed1',
      institute: 'Your College / University — replace', // EDIT
      degree: 'Your Degree (e.g. B.E. Computer Engineering)', // EDIT
      duration: 'Replace with your years', // EDIT
      description: 'A short, honest line about your studies or focus.',
    },
  ],
  certifications: [
    // EDIT: list real courses/certificates you completed, or empty this array.
    { _id: 'c1', name: 'Replace with a real course/certificate', issuer: 'Issuer', skills: ['React', 'Node.js'] },
  ],
  // No fabricated testimonials. Add real ones here when you have them
  // (name, position, company, review, rating). There is no testimonials
  // section on the page yet — ask to have one added once you have quotes.
  testimonials: [],
};

export default mockData;
