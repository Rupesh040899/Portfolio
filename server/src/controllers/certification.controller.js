import asyncHandler from '../middleware/asyncHandler.js';
import ApiError from '../utils/ApiError.js';
import Certification from '../models/Certification.js';

// GET /api/certifications  (public)
export const getCertifications = asyncHandler(async (req, res) => {
  const items = await Certification.find().sort({ issueDate: -1, displayOrder: 1 });
  res.json({ success: true, count: items.length, data: items });
});

// GET /api/certifications/:id  (public)
export const getCertification = asyncHandler(async (req, res) => {
  const item = await Certification.findById(req.params.id);
  if (!item) throw ApiError.notFound('Certification not found');
  res.json({ success: true, data: item });
});

// POST /api/certifications  (admin)
export const createCertification = asyncHandler(async (req, res) => {
  const item = await Certification.create(req.body);
  res.status(201).json({ success: true, data: item });
});

// PUT /api/certifications/:id  (admin)
export const updateCertification = asyncHandler(async (req, res) => {
  const item = await Certification.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });
  if (!item) throw ApiError.notFound('Certification not found');
  res.json({ success: true, data: item });
});

// DELETE /api/certifications/:id  (admin)
export const deleteCertification = asyncHandler(async (req, res) => {
  const item = await Certification.findByIdAndDelete(req.params.id);
  if (!item) throw ApiError.notFound('Certification not found');
  res.json({ success: true, message: 'Certification deleted' });
});
