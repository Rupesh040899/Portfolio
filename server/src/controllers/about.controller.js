import asyncHandler from '../middleware/asyncHandler.js';
import About from '../models/About.js';

// GET /api/about  (public) — single about document.
export const getAbout = asyncHandler(async (req, res) => {
  const about = await About.getSingleton();
  res.json({ success: true, data: about });
});

// PUT /api/about  (admin)
export const updateAbout = asyncHandler(async (req, res) => {
  const about = await About.getSingleton();
  const { singletonKey, _id, ...fields } = req.body;
  about.set(fields);
  await about.save();
  res.json({ success: true, data: about });
});
