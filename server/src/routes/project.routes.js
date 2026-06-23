import { Router } from 'express';
import {
  getProjects,
  getProject,
  createProject,
  updateProject,
  deleteProject,
} from '../controllers/project.controller.js';
import { protect } from '../middleware/auth.js';
import requireDatabase from '../middleware/requireDatabase.js';

const router = Router();
router.use(requireDatabase);

// Public reads (:idOrSlug accepts a Mongo id or a slug)
router.get('/', getProjects);
router.get('/:idOrSlug', getProject);

// Admin writes
router.post('/', protect, createProject);
router.put('/:id', protect, updateProject);
router.delete('/:id', protect, deleteProject);

export default router;
