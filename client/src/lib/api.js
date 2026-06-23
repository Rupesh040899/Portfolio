import axios from 'axios';
import { mockData } from './mockData.js';

const USE_MOCKS = import.meta.env.VITE_USE_MOCKS !== 'false';
const BASE_URL = import.meta.env.VITE_API_URL || '/api';

export const http = axios.create({
  baseURL: BASE_URL,
  withCredentials: true,
  timeout: 12000,
});

// Attach admin token (set after login) to requests.
http.interceptors.request.use((config) => {
  const token = localStorage.getItem('rupesh_os_token');
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

/**
 * Resilient fetch: tries the API, falls back to mock data so the UI
 * never renders empty before the database is connected. Set
 * VITE_USE_MOCKS=false to require the real API.
 */
async function getWithFallback(path, mockKey) {
  if (USE_MOCKS) {
    return mockData[mockKey];
  }
  try {
    const { data } = await http.get(path);
    return data?.data ?? data;
  } catch (err) {
    console.warn(`[api] ${path} failed (${err.message}) — using mock data.`);
    return mockData[mockKey];
  }
}

export const api = {
  getHero: () => getWithFallback('/hero', 'hero'),
  getAbout: () => getWithFallback('/about', 'about'),
  getSkills: () => getWithFallback('/skills', 'skills'),
  getProjects: () => getWithFallback('/projects', 'projects'),
  getExperiences: () => getWithFallback('/experiences', 'experiences'),
  getEducation: () => getWithFallback('/education', 'education'),
  getCertifications: () => getWithFallback('/certifications', 'certifications'),
  getTestimonials: () => getWithFallback('/testimonials', 'testimonials'),

  async getProject(slug) {
    if (USE_MOCKS) return mockData.projects.find((p) => p.slug === slug);
    try {
      const { data } = await http.get(`/projects/${slug}`);
      return data?.data ?? data;
    } catch {
      return mockData.projects.find((p) => p.slug === slug);
    }
  },

  async submitContact(payload) {
    if (USE_MOCKS) {
      await new Promise((r) => setTimeout(r, 600));
      return { success: true, message: '(mock) Message received — connect the DB to store it.' };
    }
    const { data } = await http.post('/contact', payload);
    return data;
  },
};

export default api;
