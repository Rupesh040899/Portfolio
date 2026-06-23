import { Router } from 'express';
import { getAbout, updateAbout } from '../controllers/about.controller.js';
import { protect } from '../middleware/auth.js';
import requireDatabase from '../middleware/requireDatabase.js';

const router = Router();
router.use(requireDatabase);

router.get('/', getAbout); // public
router.put('/', protect, updateAbout); // admin
router.patch('/', protect, updateAbout); // admin

export default router;
