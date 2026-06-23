import { Router } from 'express';
import {
  getEducationList,
  getEducation,
  createEducation,
  updateEducation,
  deleteEducation,
} from '../controllers/education.controller.js';
import { protect } from '../middleware/auth.js';
import requireDatabase from '../middleware/requireDatabase.js';

const router = Router();
router.use(requireDatabase);

router.get('/', getEducationList);
router.get('/:id', getEducation);

router.post('/', protect, createEducation);
router.put('/:id', protect, updateEducation);
router.delete('/:id', protect, deleteEducation);

export default router;
