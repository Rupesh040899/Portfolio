import env from '../config/env.js';

/**
 * Lightweight GitHub showcase service. Fetched live (never persisted),
 * with a short in-memory cache to stay under rate limits. Uses the
 * global fetch available in Node 18+.
 */
const CACHE_TTL_MS = 10 * 60 * 1000; // 10 minutes
const cache = new Map();

function ghHeaders() {
  const headers = { Accept: 'application/vnd.github+json', 'User-Agent': 'rupesh-os' };
  if (env.github.token) headers.Authorization = `Bearer ${env.github.token}`;
  return headers;
}

async function ghGet(path) {
  const cached = cache.get(path);
  if (cached && cached.expires > Date.now()) return cached.value;

  const res = await fetch(`https://api.github.com${path}`, { headers: ghHeaders() });
  if (!res.ok) {
    const err = new Error(`GitHub API ${res.status}: ${res.statusText}`);
    err.statusCode = res.status === 404 ? 404 : 502;
    throw err;
  }
  const value = await res.json();
  cache.set(path, { value, expires: Date.now() + CACHE_TTL_MS });
  return value;
}

export async function getProfile(username = env.github.username) {
  if (!username) return null;
  const user = await ghGet(`/users/${username}`);
  return {
    login: user.login,
    name: user.name,
    avatarUrl: user.avatar_url,
    bio: user.bio,
    followers: user.followers,
    following: user.following,
    publicRepos: user.public_repos,
    htmlUrl: user.html_url,
  };
}

export async function getTopRepos(username = env.github.username, limit = 6) {
  if (!username) return [];
  const repos = await ghGet(`/users/${username}/repos?per_page=100&sort=updated`);
  return repos
    .filter((r) => !r.fork)
    .sort((a, b) => b.stargazers_count - a.stargazers_count)
    .slice(0, limit)
    .map((r) => ({
      name: r.name,
      description: r.description,
      htmlUrl: r.html_url,
      homepage: r.homepage,
      language: r.language,
      stars: r.stargazers_count,
      forks: r.forks_count,
      topics: r.topics || [],
      updatedAt: r.updated_at,
    }));
}

/** Aggregate languages across the user's repos into { name: byteCount }. */
export async function getLanguageBreakdown(username = env.github.username) {
  if (!username) return {};
  const repos = await ghGet(`/users/${username}/repos?per_page=100`);
  const totals = {};
  for (const r of repos) {
    if (r.fork || !r.language) continue;
    totals[r.language] = (totals[r.language] || 0) + (r.size || 1);
  }
  return totals;
}
