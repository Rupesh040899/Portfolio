import { Router } from 'express';
import {
  getCertifications,
  getCertification,
  createCertification,
  updateCertification,
  deleteCertification,
} from '../controllers/certification.controller.js';
import { protect } from '../middleware/auth.js';
import requireDatabase from '../middleware/requireDatabase.js';

const router = Router();
router.use(requireDatabase);

router.get('/', getCertifications);
router.get('/:id', getCertification);

router.post('/', protect, createCertification);
router.put('/:id', protect, updateCertification);
router.delete('/:id', protect, deleteCertification);

export default router;
