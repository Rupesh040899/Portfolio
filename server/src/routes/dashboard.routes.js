import { Router } from 'express';
import { getOverview } from '../controllers/dashboard.controller.js';
import { protect } from '../middleware/auth.js';
import requireDatabase from '../middleware/requireDatabase.js';

const router = Router();

router.use(requireDatabase, protect);
router.get('/', getOverview);

export default router;
