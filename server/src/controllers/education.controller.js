import asyncHandler from '../middleware/asyncHandler.js';
import ApiError from '../utils/ApiError.js';
import Education from '../models/Education.js';

// GET /api/education  (public)
export const getEducationList = asyncHandler(async (req, res) => {
  const education = await Education.find().sort({ startDate: -1, displayOrder: 1 });
  res.json({ success: true, count: education.length, data: education });
});

// GET /api/education/:id  (public)
export const getEducation = asyncHandler(async (req, res) => {
  const item = await Education.findById(req.params.id);
  if (!item) throw ApiError.notFound('Education entry not found');
  res.json({ success: true, data: item });
});

// POST /api/education  (admin)
export const createEducation = asyncHandler(async (req, res) => {
  const item = await Education.create(req.body);
  res.status(201).json({ success: true, data: item });
});

// PUT /api/education/:id  (admin)
export const updateEducation = asyncHandler(async (req, res) => {
  const item = await Education.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });
  if (!item) throw ApiError.notFound('Education entry not found');
  res.json({ success: true, data: item });
});

// DELETE /api/education/:id  (admin)
export const deleteEducation = asyncHandler(async (req, res) => {
  const item = await Education.findByIdAndDelete(req.params.id);
  if (!item) throw ApiError.notFound('Education entry not found');
  res.json({ success: true, message: 'Education entry deleted' });
});
