import { Router } from 'express';
import { getHero, updateHero } from '../controllers/hero.controller.js';
import { protect } from '../middleware/auth.js';
import requireDatabase from '../middleware/requireDatabase.js';

const router = Router();
router.use(requireDatabase);

router.get('/', getHero); // public
router.put('/', protect, updateHero); // admin
router.patch('/', protect, updateHero); // admin

export default router;
