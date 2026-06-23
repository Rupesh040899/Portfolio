import asyncHandler from '../middleware/asyncHandler.js';
import ApiError from '../utils/ApiError.js';
import Experience from '../models/Experience.js';

// GET /api/experiences  (public) — by displayOrder, then current, then newest.
export const getExperiences = asyncHandler(async (req, res) => {
  const experiences = await Experience.find().sort({ displayOrder: 1, current: -1, startDate: -1 });
  res.json({ success: true, count: experiences.length, data: experiences });
});

// GET /api/experiences/:id  (public)
export const getExperience = asyncHandler(async (req, res) => {
  const experience = await Experience.findById(req.params.id);
  if (!experience) throw ApiError.notFound('Experience not found');
  res.json({ success: true, data: experience });
});

// POST /api/experiences  (admin)
export const createExperience = asyncHandler(async (req, res) => {
  const experience = await Experience.create(req.body);
  res.status(201).json({ success: true, data: experience });
});

// PUT /api/experiences/:id  (admin)
export const updateExperience = asyncHandler(async (req, res) => {
  const experience = await Experience.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });
  if (!experience) throw ApiError.notFound('Experience not found');
  res.json({ success: true, data: experience });
});

// DELETE /api/experiences/:id  (admin)
export const deleteExperience = asyncHandler(async (req, res) => {
  const experience = await Experience.findByIdAndDelete(req.params.id);
  if (!experience) throw ApiError.notFound('Experience not found');
  res.json({ success: true, message: 'Experience deleted' });
});
