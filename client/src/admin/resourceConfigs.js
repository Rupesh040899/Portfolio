/**
 * Field configs that drive the admin forms. Each collection/singleton
 * lists the fields to render. `key` supports dot-paths (e.g. caseStudy.x).
 */

const SKILL_CATEGORIES = ['frontend', 'backend', 'database', 'devops', 'language', 'tooling', 'design', 'other'];
const LEVELS = ['beginner', 'intermediate', 'advanced', 'expert'];

export const configs = {
  hero: {
    type: 'singleton',
    endpoint: '/hero',
    label: 'Hero',
    fields: [
      { key: 'name', label: 'Name' },
      { key: 'title', label: 'Title' },
      { key: 'tagline', label: 'Tagline', full: true },
      { key: 'description', label: 'Description', type: 'textarea', full: true },
      { key: 'roles', label: 'Roles (rotating)', type: 'list', help: 'One per line' },
      { key: 'email', label: 'Email' },
      { key: 'phone', label: 'Phone' },
      { key: 'location', label: 'Location' },
      { key: 'githubUrl', label: 'GitHub URL' },
      { key: 'linkedinUrl', label: 'LinkedIn URL' },
      { key: 'resumeUrl', label: 'Resume URL' },
      { key: 'avatar.url', label: 'Photo URL (optional)' },
    ],
  },

  about: {
    type: 'singleton',
    endpoint: '/about',
    label: 'About',
    fields: [
      { key: 'introduction', label: 'Introduction', full: true },
      { key: 'bio', label: 'Bio', type: 'textarea', full: true },
      { key: 'experienceLabel', label: 'Experience label', help: 'e.g. "1+ yr · Full-Stack Fellowship"' },
      { key: 'yearsExperience', label: 'Years experience', type: 'number' },
      { key: 'location', label: 'Location' },
      { key: 'availableForWork', label: 'Available for work', type: 'boolean' },
      { key: 'highlights', label: 'Highlights', type: 'list', full: true },
      { key: 'statistics', label: 'Statistics', type: 'json', full: true, help: 'Array of { label, value, suffix }' },
    ],
  },

  skills: {
    type: 'collection',
    endpoint: '/skills',
    label: 'Skills',
    titleKey: 'name',
    subKey: 'category',
    fields: [
      { key: 'name', label: 'Name' },
      { key: 'category', label: 'Category', type: 'select', options: SKILL_CATEGORIES },
      { key: 'color', label: 'Color (hex)' },
      { key: 'proficiency', label: 'Proficiency (0–100)', type: 'number' },
      { key: 'experienceLevel', label: 'Level', type: 'select', options: LEVELS },
      { key: 'isCore', label: 'Core skill', type: 'boolean' },
      { key: 'displayOrder', label: 'Display order', type: 'number' },
    ],
  },

  projects: {
    type: 'collection',
    endpoint: '/projects',
    label: 'Projects',
    titleKey: 'title',
    subKey: 'projectType',
    fields: [
      { key: 'title', label: 'Title' },
      { key: 'projectType', label: 'Type', help: 'e.g. Full-Stack App' },
      { key: 'shortDescription', label: 'Short description', full: true },
      { key: 'description', label: 'Description', type: 'textarea', full: true },
      { key: 'techStack', label: 'Tech stack', type: 'list', help: 'One per line' },
      { key: 'featured', label: 'Featured', type: 'boolean' },
      { key: 'displayOrder', label: 'Display order', type: 'number' },
      { key: 'liveUrl', label: 'Live URL' },
      { key: 'githubUrl', label: 'GitHub URL' },
      { key: 'thumbnail.url', label: 'Thumbnail image URL', full: true },
      { key: 'caseStudy.problemStatement', label: 'Case study · Problem', type: 'textarea', full: true },
      { key: 'caseStudy.solution', label: 'Case study · Solution', type: 'textarea', full: true },
      { key: 'caseStudy.architecture', label: 'Case study · Architecture', type: 'textarea', full: true },
      { key: 'caseStudy.databaseDesign', label: 'Case study · Database design', type: 'textarea', full: true },
      { key: 'caseStudy.results', label: 'Case study · Results', type: 'textarea', full: true },
      { key: 'caseStudy.keyLearnings', label: 'Case study · Key learnings', type: 'list', full: true },
      { key: 'gallery', label: 'Gallery images', type: 'json', full: true, help: 'Array of { url, alt }' },
    ],
  },

  experiences: {
    type: 'collection',
    endpoint: '/experiences',
    label: 'Experience',
    titleKey: 'role',
    subKey: 'company',
    fields: [
      { key: 'role', label: 'Role' },
      { key: 'company', label: 'Company' },
      { key: 'employmentType', label: 'Employment type', type: 'select', options: ['full-time', 'part-time', 'contract', 'freelance', 'internship'] },
      { key: 'duration', label: 'Duration', help: 'e.g. "Mar 2026 — Present"' },
      { key: 'current', label: 'Current role', type: 'boolean' },
      { key: 'displayOrder', label: 'Display order', type: 'number' },
      { key: 'description', label: 'Description', type: 'textarea', full: true },
      { key: 'technologies', label: 'Technologies', type: 'list' },
      { key: 'achievements', label: 'Achievements', type: 'list', full: true },
    ],
  },

  education: {
    type: 'collection',
    endpoint: '/education',
    label: 'Education',
    titleKey: 'degree',
    subKey: 'institute',
    fields: [
      { key: 'degree', label: 'Degree' },
      { key: 'institute', label: 'Institute' },
      { key: 'duration', label: 'Duration' },
      { key: 'displayOrder', label: 'Display order', type: 'number' },
      { key: 'description', label: 'Description', type: 'textarea', full: true },
    ],
  },

  certifications: {
    type: 'collection',
    endpoint: '/certifications',
    label: 'Certifications',
    titleKey: 'name',
    subKey: 'issuer',
    fields: [
      { key: 'name', label: 'Name' },
      { key: 'issuer', label: 'Issuer' },
      { key: 'credentialUrl', label: 'Credential URL' },
      { key: 'displayOrder', label: 'Display order', type: 'number' },
      { key: 'skills', label: 'Skills', type: 'list' },
    ],
  },

  testimonials: {
    type: 'collection',
    endpoint: '/testimonials',
    label: 'Testimonials',
    titleKey: 'name',
    subKey: 'company',
    fields: [
      { key: 'name', label: 'Name' },
      { key: 'position', label: 'Position' },
      { key: 'company', label: 'Company' },
      { key: 'rating', label: 'Rating (1–5)', type: 'number' },
      { key: 'displayOrder', label: 'Display order', type: 'number' },
      { key: 'review', label: 'Review', type: 'textarea', full: true },
    ],
  },
};

export default configs;
