import asyncHandler from '../middleware/asyncHandler.js';
import ApiError from '../utils/ApiError.js';
import Project from '../models/Project.js';

// GET /api/projects  (public) — featured first.
export const getProjects = asyncHandler(async (req, res) => {
  const projects = await Project.find().sort({ featured: -1, displayOrder: 1, createdAt: -1 });
  res.json({ success: true, count: projects.length, data: projects });
});

// GET /api/projects/:idOrSlug  (public) — accepts a Mongo id OR a slug.
export const getProject = asyncHandler(async (req, res) => {
  const { idOrSlug } = req.params;
  const isObjectId = /^[0-9a-fA-F]{24}$/.test(idOrSlug);

  const project = isObjectId
    ? await Project.findById(idOrSlug)
    : await Project.findOne({ slug: idOrSlug });

  if (!project) throw ApiError.notFound('Project not found');
  res.json({ success: true, data: project });
});

// POST /api/projects  (admin)
export const createProject = asyncHandler(async (req, res) => {
  const project = await Project.create(req.body);
  res.status(201).json({ success: true, data: project });
});

// PUT /api/projects/:id  (admin)
export const updateProject = asyncHandler(async (req, res) => {
  const project = await Project.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });
  if (!project) throw ApiError.notFound('Project not found');
  res.json({ success: true, data: project });
});

// DELETE /api/projects/:id  (admin)
export const deleteProject = asyncHandler(async (req, res) => {
  const project = await Project.findByIdAndDelete(req.params.id);
  if (!project) throw ApiError.notFound('Project not found');
  res.json({ success: true, message: 'Project deleted' });
});
