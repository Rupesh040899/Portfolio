import asyncHandler from '../middleware/asyncHandler.js';
import ApiError from '../utils/ApiError.js';
import Testimonial from '../models/Testimonial.js';

// GET /api/testimonials  (public)
export const getTestimonials = asyncHandler(async (req, res) => {
  const items = await Testimonial.find().sort({ displayOrder: 1, createdAt: -1 });
  res.json({ success: true, count: items.length, data: items });
});

// GET /api/testimonials/:id  (public)
export const getTestimonial = asyncHandler(async (req, res) => {
  const item = await Testimonial.findById(req.params.id);
  if (!item) throw ApiError.notFound('Testimonial not found');
  res.json({ success: true, data: item });
});

// POST /api/testimonials  (admin)
export const createTestimonial = asyncHandler(async (req, res) => {
  const item = await Testimonial.create(req.body);
  res.status(201).json({ success: true, data: item });
});

// PUT /api/testimonials/:id  (admin)
export const updateTestimonial = asyncHandler(async (req, res) => {
  const item = await Testimonial.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });
  if (!item) throw ApiError.notFound('Testimonial not found');
  res.json({ success: true, data: item });
});

// DELETE /api/testimonials/:id  (admin)
export const deleteTestimonial = asyncHandler(async (req, res) => {
  const item = await Testimonial.findByIdAndDelete(req.params.id);
  if (!item) throw ApiError.notFound('Testimonial not found');
  res.json({ success: true, message: 'Testimonial deleted' });
});
