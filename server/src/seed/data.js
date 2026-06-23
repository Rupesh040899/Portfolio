/**
 * Seed data for RUPESH OS — populated from Rupesh Mali's resume.
 * Run `npm run seed` to load this into the database.
 *
 * NOTE: GitHub / LinkedIn URLs and per-project demo links are left as
 * placeholders ('') — add your real links (see the // ADD markers).
 */

export const hero = {
  name: 'Rupesh Mali',
  title: 'Full-Stack Developer',
  tagline: 'I build and ship full-stack web apps with the MERN stack.',
  description:
    "Full-stack developer focused on the MERN stack. I've built and deployed 10+ projects — from a JWT-secured MERN movie app to a CMS-driven marketing site. I completed Crio.do's Full-Stack Developer Fellowship and currently work as a Full-Stack Developer (Intern) at Lemon Yellow LLP.",
  roles: ['Full-Stack Developer', 'MERN Stack', 'React • Node • MongoDB', 'Crio Fellowship Grad'],
  resumeUrl: '', // ADD: link to your resume PDF (e.g. Google Drive / Cloudinary)
  githubUrl: 'https://github.com/Rupesh040899', // ADD: your real GitHub profile URL
  linkedinUrl: 'https://www.linkedin.com/in/rupesh-mali-50433619b/', // ADD: your real LinkedIn URL
  email: 'rupesh.mali0408@gmail.com',
  phone: '+91-8108634897',
  location: 'Mumbai, India',
};

export const about = {
  introduction: 'Full-stack developer (MERN) — builder, fast learner, shipping real projects.',
  bio: "I'm a full-stack developer focused on the MERN stack (MongoDB, Express, React, Node). I completed Crio.do's Full-Stack Developer Fellowship and have built and deployed 10+ projects, from a JWT-authenticated movie app to a CMS-driven marketing site. I currently work as a Full-Stack Developer (Intern) at Lemon Yellow LLP, building production web apps, and I'm looking for a full-time full-stack role.",
  yearsExperience: 0,
  experienceLabel: 'Full-Stack Developer Intern',
  location: 'Mumbai, India',
  availableForWork: true,
  statistics: [
    { label: 'Projects Built', value: 10, suffix: '+', icon: 'rocket' },
    { label: 'Technologies', value: 20, suffix: '+', icon: 'layers' },
    { label: 'Live Deployments', value: 7, suffix: '', icon: 'cloud' },
  ],
  highlights: ['MERN stack', 'Clean, readable code', 'Fast learner', 'Ships & deploys projects'],
};

export const skills = [
  // Languages
  { name: 'JavaScript', category: 'language', color: '#f7df1e', proficiency: 82, experienceLevel: 'intermediate', isCore: true, displayOrder: 1 },
  { name: 'TypeScript', category: 'language', color: '#3178c6', proficiency: 55, experienceLevel: 'beginner', displayOrder: 2 },
  { name: 'HTML5', category: 'frontend', color: '#e34f26', proficiency: 88, experienceLevel: 'advanced', displayOrder: 3 },
  { name: 'CSS3', category: 'frontend', color: '#1572b6', proficiency: 85, experienceLevel: 'advanced', displayOrder: 4 },
  // Frontend
  { name: 'React.js', category: 'frontend', color: '#61dafb', proficiency: 82, experienceLevel: 'intermediate', isCore: true, displayOrder: 5 },
  { name: 'Next.js', category: 'frontend', color: '#ffffff', proficiency: 55, experienceLevel: 'beginner', displayOrder: 6 },
  { name: 'Tailwind CSS', category: 'frontend', color: '#38bdf8', proficiency: 80, experienceLevel: 'intermediate', displayOrder: 7 },
  { name: 'Bootstrap', category: 'frontend', color: '#7952b3', proficiency: 78, experienceLevel: 'intermediate', displayOrder: 8 },
  { name: 'Material UI', category: 'frontend', color: '#007fff', proficiency: 75, experienceLevel: 'intermediate', displayOrder: 9 },
  { name: 'SCSS', category: 'frontend', color: '#cd6799', proficiency: 65, experienceLevel: 'intermediate', displayOrder: 10 },
  // Backend
  { name: 'Node.js', category: 'backend', color: '#3c873a', proficiency: 72, experienceLevel: 'intermediate', isCore: true, displayOrder: 11 },
  { name: 'Express.js', category: 'backend', color: '#ffffff', proficiency: 72, experienceLevel: 'intermediate', displayOrder: 12 },
  { name: 'REST API', category: 'backend', color: '#22d3ee', proficiency: 78, experienceLevel: 'intermediate', displayOrder: 13 },
  { name: 'JWT', category: 'backend', color: '#f04e98', proficiency: 65, experienceLevel: 'intermediate', displayOrder: 14 },
  // Database
  { name: 'MongoDB', category: 'database', color: '#47a248', proficiency: 72, experienceLevel: 'intermediate', isCore: true, displayOrder: 15 },
  { name: 'MySQL', category: 'database', color: '#4479a1', proficiency: 62, experienceLevel: 'intermediate', displayOrder: 16 },
  // Tools / DevOps
  { name: 'Git', category: 'tooling', color: '#f1502f', proficiency: 75, experienceLevel: 'intermediate', displayOrder: 17 },
  { name: 'Postman', category: 'tooling', color: '#ff6c37', proficiency: 72, experienceLevel: 'intermediate', displayOrder: 18 },
  { name: 'Vercel', category: 'devops', color: '#ffffff', proficiency: 75, experienceLevel: 'intermediate', displayOrder: 19 },
  { name: 'Netlify', category: 'devops', color: '#00c7b7', proficiency: 70, experienceLevel: 'intermediate', displayOrder: 20 },
  { name: 'Render', category: 'devops', color: '#5b7fff', proficiency: 62, experienceLevel: 'beginner', displayOrder: 21 },
  { name: 'Strapi', category: 'backend', color: '#4945ff', proficiency: 60, experienceLevel: 'intermediate', displayOrder: 22 },
];

export const projects = [
  {
    // VOID placeholder — replace with your next project later.
    title: 'Coming Soon',
    shortDescription: 'A new project is in the works — details coming soon.',
    description: 'This slot is reserved for an upcoming project. Check back shortly.',
    techStack: [],
    featured: true,
    status: 'published',
    projectType: '',
    liveUrl: '',
    githubUrl: '',
    displayOrder: 1,
    caseStudy: {},
    metrics: {},
  },
  {
    title: 'Omnivore VC — Marketing Website',
    shortDescription: 'CMS-driven marketing site for an impact VC firm — React + Vite + TypeScript + Strapi.',
    description:
      'A production-ready marketing website for an impact venture-capital firm, with a React + Vite + TypeScript frontend and a Strapi headless-CMS backend. A fully CMS-driven content layer (portfolio companies, spotlight media, team, page heroes) is consumed over REST APIs with React Query caching and Recoil state. Includes scroll-driven UI — sticky category tabs that morph from a vertical stack into a horizontal bar — hardened cross-browser with rAF-batched passive scroll listeners and scroll-anchoring fixes, per-route SEO via Strapi middleware (meta, Open Graph, Twitter, JSON-LD), dynamic routing, category filtering and an auto-hiding sticky navbar.',
    techStack: ['React', 'Vite', 'TypeScript', 'Tailwind CSS', 'Strapi', 'Framer Motion', 'GSAP', 'React Query', 'Recoil'],
    featured: true,
    status: 'published',
    projectType: 'Marketing Website',
    liveUrl: 'https://omnivore.vc/', // ADD: demo link
    githubUrl: '', // ADD: repo link
    displayOrder: 2,
    caseStudy: {
      problemStatement: 'Build a fast, fully CMS-driven marketing site for an impact VC firm.',
      solution: 'React + Vite + TypeScript frontend with a Strapi headless CMS; content consumed over REST with React Query caching and Recoil state.',
      architecture: 'React/Vite/TS SPA ↔ Strapi (headless CMS) over REST APIs, with dynamic routing, category filtering and React Query caching.',
      databaseDesign: 'Content modelled in Strapi: portfolio companies, spotlight media, team, and page heroes.',
      results: 'Scroll-driven sticky tabs (vertical→horizontal), per-route SEO/OG/Twitter/JSON-LD via Strapi middleware, and an auto-hiding navbar — fully responsive and cross-browser hardened.',
      keyLearnings: ['Headless-CMS architecture with Strapi', 'Cross-browser scroll handling (rAF, passive listeners, scroll-anchoring)', 'SEO & JSON-LD structured data'],
    },
    metrics: {},
  },
  {
    title: 'AI Chatbot Web App',
    shortDescription: 'Production-ready AI chatbot — React + Vite frontend, Express backend, OpenAI/Grok APIs.',
    description:
      'A production-ready AI chatbot web application with a React + Vite frontend and an Express.js backend. A modular AI service layer supports OpenAI-compatible and Grok APIs, switchable via environment variables. Features real-time chat with typing indicators, markdown rendering and code syntax highlighting, in a premium dark glassmorphism UI with GSAP and Framer Motion animations, fully responsive.',
    techStack: ['React', 'Vite', 'Express', 'OpenAI API', 'Grok API', 'GSAP', 'Framer Motion'],
    featured: true,
    status: 'published',
    projectType: 'Full-Stack App',
    liveUrl: '', // ADD: demo link
    githubUrl: '', // ADD: repo link
    displayOrder: 3,
    caseStudy: {
      problemStatement: 'Build a polished, provider-agnostic AI chat app that can switch LLM providers easily.',
      solution: 'A modular AI service layer (OpenAI-compatible + Grok) configured via env vars, with a React + Vite UI and Express backend.',
      architecture: 'React + Vite SPA → Express API → AI provider (OpenAI/Grok), selectable through environment variables.',
      results: 'Real-time chat with typing indicators, markdown + code highlighting, and a responsive glassmorphism UI.',
      keyLearnings: ['Designing a swappable provider/service layer', 'Real-time chat UX', 'GSAP & Framer Motion animation'],
    },
    metrics: {},
  },
  {
    title: 'Realtime Chat Application',
    shortDescription: 'Full-stack 1:1 realtime messaging with Next.js, Socket.IO, JWT and MongoDB.',
    description:
      'A full-stack realtime one-to-one messaging application built with Next.js (App Router), Express.js, Socket.IO and MongoDB/Mongoose. JWT authentication with bcrypt password hashing and persistent login. Realtime features over WebSockets include instant messaging, online/offline presence, typing indicators and seen/unseen receipts, in a responsive glassmorphism UI with GSAP animations and React Context state.',
    techStack: ['Next.js', 'Express', 'Socket.IO', 'JWT', 'MongoDB', 'Mongoose', 'GSAP'],
    featured: true,
    status: 'published',
    projectType: 'Full-Stack App',
    liveUrl: '', // ADD: demo link
    githubUrl: '', // ADD: repo link
    displayOrder: 4,
    caseStudy: {
      problemStatement: 'Build realtime one-to-one chat with presence and delivery receipts.',
      solution: 'Next.js App Router + Express + Socket.IO over WebSockets, with JWT/bcrypt auth and React Context state.',
      architecture: 'Next.js client ↔ Socket.IO / Express server ↔ MongoDB (Mongoose). JWT auth with persistent login.',
      results: 'Instant messaging, online/offline presence, typing indicators and seen/unseen receipts in a glassmorphism UI.',
      keyLearnings: ['Socket.IO & WebSocket events', 'Auth with JWT + bcrypt', 'Realtime state with React Context'],
    },
    metrics: {},
  },
  {
    title: 'MERN Movie App',
    shortDescription: 'Full-stack movie browsing & management app with JWT auth and admin roles.',
    description:
      'A full-stack movie browsing and management application built with React.js, Node.js, Express.js and MongoDB Atlas. JWT-based authentication with role-based admin access secures movie create, update and delete operations. Search, sort and pagination over RESTful APIs enable efficient browsing of large datasets. Backend deployed on Railway and frontend on Vercel, with secure environment-variable configuration and CORS handling.',
    techStack: ['React', 'Node.js', 'Express', 'MongoDB', 'JWT', 'REST API'],
    featured: true,
    status: 'published',
    projectType: 'Full-Stack App',
    liveUrl: '', // ADD: demo link
    githubUrl: '', // ADD: repo link
    displayOrder: 5,
    caseStudy: {
      problemStatement: 'Build a complete, production-style MERN app with real authentication and admin controls.',
      solution: 'React + Node/Express + MongoDB Atlas with JWT auth and role-based admin access to manage movies.',
      architecture: 'React SPA → Express REST API → MongoDB Atlas. Backend on Railway, frontend on Vercel, with CORS + env config.',
      results: 'A deployed full-stack app with search, sort and pagination over REST APIs.',
      keyLearnings: ['JWT auth & role-based access', 'REST API design', 'Deploying front + back with CORS/env config'],
    },
    metrics: {},
  },
  {
    title: 'QTify',
    shortDescription: 'A song-browsing app built from a Figma design with React + Material UI.',
    description:
      'QTify is a music-browsing application offering songs across albums and genres, built from scratch in React with Material UI and Swiper for a smooth, aesthetic UI.',
    techStack: ['React', 'Material UI', 'Swiper.js', 'CSS Modules', 'REST API'],
    featured: false,
    status: 'published',
    projectType: 'Frontend App',
    liveUrl: '',
    githubUrl: '',
    displayOrder: 6,
    caseStudy: {
      problemStatement: 'Turn a Figma design into a reusable, responsive React UI.',
      solution: 'Built modular components (cards, carousels, buttons) and a genre-based tab filter.',
      results: 'A deployed, component-driven music UI fed by REST APIs.',
      keyLearnings: ['Component reusability', 'Customizing Material UI', 'Reading Figma → components'],
    },
    metrics: {},
  },
  {
    title: 'QKart — Frontend',
    shortDescription: 'E-commerce frontend with auth, cart and checkout in React.',
    description:
      'QKart is an e-commerce application. I implemented the core authentication, shopping cart and checkout flows, with responsive design and dynamic data from REST APIs.',
    techStack: ['React', 'Material UI', 'JavaScript', 'REST API'],
    featured: false,
    status: 'published',
    projectType: 'E-Commerce',
    liveUrl: '',
    githubUrl: '',
    displayOrder: 7,
    caseStudy: {
      problemStatement: 'Build the core shopping experience for an e-commerce site.',
      solution: 'Implemented auth, cart and checkout logic with debounced keyword search and localStorage.',
      results: 'A responsive store deployed to Netlify/Vercel.',
      keyLearnings: ['Debouncing & search', 'localStorage & React hooks', 'Error handling'],
    },
    metrics: {},
  },
  {
    title: 'XBoard',
    shortDescription: 'A news-feed website pulling live content from Flipboard via RSS.',
    description:
      'XBoard is a news-feed website showing the latest news for selected topics, built from scratch with HTML, CSS, Bootstrap and JavaScript.',
    techStack: ['HTML', 'CSS', 'Bootstrap', 'JavaScript', 'jQuery'],
    featured: false,
    status: 'published',
    projectType: 'Web App',
    liveUrl: '',
    githubUrl: '',
    displayOrder: 8,
    caseStudy: {
      problemStatement: 'Aggregate and display live news by topic.',
      solution: "Fetched Flipboard's RSS feed via REST API and presented it with accordions and a carousel.",
      results: 'A working news feed built from scratch.',
      keyLearnings: ['Consuming RSS/REST feeds', 'Bootstrap components'],
    },
    metrics: {},
  },
  {
    title: 'QTrip — Dynamic',
    shortDescription: 'A dynamic travel website with filters, carousels and saved preferences.',
    description:
      'QTrip is a travel website for discovering adventures across cities. The dynamic version adds JavaScript-driven interactivity on top of HTML/CSS.',
    techStack: ['HTML', 'CSS', 'JavaScript', 'REST API'],
    featured: false,
    status: 'published',
    projectType: 'Web App',
    liveUrl: '',
    githubUrl: '',
    displayOrder: 9,
    caseStudy: {
      problemStatement: 'Make a static travel site dynamic and user-friendly.',
      solution: 'Added multi-select filters, image carousels and localStorage to persist preferences.',
      results: 'Deployed on Render with dynamic, API-driven content.',
      keyLearnings: ['DOM manipulation & events', 'Working with JSON/REST', 'localStorage'],
    },
    metrics: {},
  },
  {
    title: 'QTrip — Static',
    shortDescription: 'A responsive travel website built from a wireframe with Bootstrap.',
    description:
      'The static version of QTrip — three responsive pages built from a wireframe using HTML, CSS and Bootstrap.',
    techStack: ['HTML', 'CSS', 'Bootstrap'],
    featured: false,
    status: 'published',
    projectType: 'Web App',
    liveUrl: '',
    githubUrl: '',
    displayOrder: 10,
    caseStudy: {
      problemStatement: 'Translate a wireframe into responsive pages.',
      solution: 'Built 3 pages with HTML/CSS and used Bootstrap extensively for responsiveness.',
      results: 'Deployed to Netlify/Vercel.',
      keyLearnings: ['Responsive design', 'Bootstrap grid'],
    },
    metrics: {},
  },
  {
    title: 'XCruise',
    shortDescription: 'A responsive cruise-booking landing site built with HTML & CSS.',
    description:
      'XCruise is a responsive static website for booking cruise vacations, showcasing destinations with a clean, modern layout.',
    techStack: ['HTML5', 'CSS', 'Flexbox', 'CSS Grid'],
    featured: false,
    status: 'published',
    projectType: 'Web App',
    liveUrl: '',
    githubUrl: '',
    displayOrder: 11,
    caseStudy: {
      problemStatement: 'Build a polished, responsive marketing site from scratch.',
      solution: 'Used semantic HTML, Flexbox and CSS Grid with media queries for responsiveness.',
      results: 'A visually appealing, responsive site across devices.',
      keyLearnings: ['CSS Flexbox & Grid', 'Responsive layout', 'Semantic HTML'],
    },
    metrics: {},
  },
];

export const experiences = [
  {
    company: 'Lemon Yellow LLP',
    role: 'Full-Stack Developer Intern',
    employmentType: 'internship',
    current: true,
    startDate: new Date('2024-03-02'),
    duration: 'Mar-2026 — Present',
    description:
      'Full-stack developer intern building production web applications with React, Next.js, Node.js, Express and MongoDB. Shipped a CMS-driven marketing website and real-time and AI-powered apps, focusing on clean UI, performance and cross-browser correctness.',
    technologies: ['React', 'Next.js', 'TypeScript', 'Node.js', 'Express', 'MongoDB', 'Strapi', 'Socket.IO', 'Tailwind CSS', 'GSAP'],
    achievements: [
      'Built Omnivore VC — a CMS-driven marketing website (React + Vite + TypeScript + Strapi) with per-route SEO and scroll-driven UI interactions.',
      'Built a realtime one-to-one chat app (Next.js + Socket.IO + MongoDB) with JWT auth, online presence, typing indicators and seen/unseen receipts.',
      'Developed an AI chatbot web app (React + Vite + Express) with a provider-agnostic OpenAI/Grok service layer.',
      'Crafted responsive, animated interfaces with GSAP and Framer Motion, hardened for cross-browser correctness.',
    ],
    displayOrder: 1,
  },
  {
    company: 'First Advantage',
    role: 'Operations Analyst',
    employmentType: 'full-time',
    current: true,
    startDate: new Date('2024-07-01'),
    duration: 'Jul 2024 — Mar 2026',
    description:
      'Operations Analyst leveraging data analysis and reporting to improve operational efficiency. Manage vendor relationships, document processes, and use MySQL to drive improvements.',
    technologies: ['MySQL', 'Data Analysis', 'Reporting'],
    achievements: [
      'Use data analysis and reporting to enhance operational efficiency',
      'Manage vendor relationships and document processes',
    ],
    displayOrder: 2,
  },
];

export const education = [
  {
    institute: 'Crio.do',
    degree: 'Fellowship in Software Development — Full-Stack Specialization',
    duration: 'Jul 2024 — Jun 2025',
    description: 'Hands-on, project-based full-stack program covering the MERN stack and real-world development workflows.',
    displayOrder: 1,
  },
  {
    institute: 'University of Mumbai',
    degree: 'B.E. — Electronics & Telecommunication Engineering',
    duration: 'Jun 2016 — Dec 2020',
    description: 'Bachelor of Engineering, Mumbai, Maharashtra.',
    displayOrder: 2,
  },
];

export const certifications = [];

export const testimonials = [];
