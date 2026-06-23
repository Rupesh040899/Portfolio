import asyncHandler from '../middleware/asyncHandler.js';
import ApiError from '../utils/ApiError.js';
import env from '../config/env.js';
import * as github from '../services/github.service.js';

/** GET /api/github  (public) — profile + top repos + languages. */
export const getShowcase = asyncHandler(async (req, res) => {
  const username = req.query.username || env.github.username;
  if (!username) {
    throw ApiError.badRequest('No GitHub username configured. Set GITHUB_USERNAME or pass ?username=.');
  }

  const [profile, repos, languages] = await Promise.all([
    github.getProfile(username),
    github.getTopRepos(username),
    github.getLanguageBreakdown(username),
  ]);

  res.json({ success: true, data: { profile, repos, languages } });
});
