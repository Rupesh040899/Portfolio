import asyncHandler from '../middleware/asyncHandler.js';
import Hero from '../models/Hero.js';

// GET /api/hero  (public) — there is only ever one hero document.
export const getHero = asyncHandler(async (req, res) => {
  const hero = await Hero.getSingleton();
  res.json({ success: true, data: hero });
});

// PUT /api/hero  (admin) — update the hero document.
export const updateHero = asyncHandler(async (req, res) => {
  const hero = await Hero.getSingleton();
  const { singletonKey, _id, ...fields } = req.body; // never let these be overwritten
  hero.set(fields);
  await hero.save();
  res.json({ success: true, data: hero });
});
