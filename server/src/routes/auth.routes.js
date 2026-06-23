import { Router } from 'express';
import { login, logout, getMe, updatePassword } from '../controllers/auth.controller.js';
import { protect } from '../middleware/auth.js';
import requireDatabase from '../middleware/requireDatabase.js';

const router = Router();

router.use(requireDatabase);
router.post('/login', login);
router.post('/logout', logout);
router.get('/me', protect, getMe);
router.patch('/password', protect, updatePassword);

export default router;
