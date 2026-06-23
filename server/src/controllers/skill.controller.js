import asyncHandler from '../middleware/asyncHandler.js';
import ApiError from '../utils/ApiError.js';
import Skill from '../models/Skill.js';

// GET /api/skills  (public)
export const getSkills = asyncHandler(async (req, res) => {
  const skills = await Skill.find().sort({ displayOrder: 1, createdAt: -1 });
  res.json({ success: true, count: skills.length, data: skills });
});

// GET /api/skills/:id  (public)
export const getSkill = asyncHandler(async (req, res) => {
  const skill = await Skill.findById(req.params.id);
  if (!skill) throw ApiError.notFound('Skill not found');
  res.json({ success: true, data: skill });
});

// POST /api/skills  (admin)
export const createSkill = asyncHandler(async (req, res) => {
  const skill = await Skill.create(req.body);
  res.status(201).json({ success: true, data: skill });
});

// PUT /api/skills/:id  (admin)
export const updateSkill = asyncHandler(async (req, res) => {
  const skill = await Skill.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });
  if (!skill) throw ApiError.notFound('Skill not found');
  res.json({ success: true, data: skill });
});

// DELETE /api/skills/:id  (admin)
export const deleteSkill = asyncHandler(async (req, res) => {
  const skill = await Skill.findByIdAndDelete(req.params.id);
  if (!skill) throw ApiError.notFound('Skill not found');
  res.json({ success: true, message: 'Skill deleted' });
});
