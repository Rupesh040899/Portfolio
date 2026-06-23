import { http } from '../lib/api.js';

const TOKEN_KEY = 'rupesh_os_token';

export const tokenStore = {
  get: () => localStorage.getItem(TOKEN_KEY),
  set: (t) => localStorage.setItem(TOKEN_KEY, t),
  clear: () => localStorage.removeItem(TOKEN_KEY),
};

/**
 * Admin API — thin wrapper over the shared axios instance (which already
 * attaches the bearer token). All admin screens go through here.
 */
export const adminApi = {
  // Auth
  login: (email, password) => http.post('/auth/login', { email, password }).then((r) => r.data),
  me: () => http.get('/auth/me').then((r) => r.data),
  logout: () => http.post('/auth/logout').then((r) => r.data),

  // Dashboard
  dashboard: () => http.get('/dashboard').then((r) => r.data),

  // Generic collection CRUD
  list: (endpoint) => http.get(endpoint).then((r) => r.data.data ?? r.data),
  getOne: (endpoint, id) => http.get(`${endpoint}/${id}`).then((r) => r.data.data),
  create: (endpoint, body) => http.post(endpoint, body).then((r) => r.data.data),
  update: (endpoint, id, body) => http.put(`${endpoint}/${id}`, body).then((r) => r.data.data),
  remove: (endpoint, id) => http.delete(`${endpoint}/${id}`).then((r) => r.data),

  // Singletons (hero / about)
  getSingleton: (endpoint) => http.get(endpoint).then((r) => r.data.data),
  saveSingleton: (endpoint, body) => http.put(endpoint, body).then((r) => r.data.data),

  // Contact messages
  messages: () => http.get('/contact').then((r) => r.data.data),
  updateMessage: (id, status) => http.patch(`/contact/${id}`, { status }).then((r) => r.data.data),
  deleteMessage: (id) => http.delete(`/contact/${id}`).then((r) => r.data),
};

export default adminApi;
