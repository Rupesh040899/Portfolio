import { Router } from 'express';
import { getShowcase } from '../controllers/github.controller.js';

const router = Router();

// Public, live-fetched (no database required).
router.get('/', getShowcase);

export default router;
