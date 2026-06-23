import { Router } from 'express';
import { isDbConnected } from '../config/db.js';

// One router per resource — plain and explicit (no factories).
import authRoutes from './auth.routes.js';
import heroRoutes from './hero.routes.js';
import aboutRoutes from './about.routes.js';
import skillRoutes from './skill.routes.js';
import projectRoutes from './project.routes.js';
import experienceRoutes from './experience.routes.js';
import educationRoutes from './education.routes.js';
import certificationRoutes from './certification.routes.js';
import testimonialRoutes from './testimonial.routes.js';
import contactRoutes from './contact.routes.js';
import dashboardRoutes from './dashboard.routes.js';
import githubRoutes from './github.routes.js';

const router = Router();

// Health / status — works even before the database is connected.
router.get('/health', (req, res) => {
  res.json({
    success: true,
    status: 'ok',
    database: isDbConnected() ? 'connected' : 'disconnected',
    timestamp: new Date().toISOString(),
  });
});

router.use('/auth', authRoutes);
router.use('/hero', heroRoutes);
router.use('/about', aboutRoutes);
router.use('/skills', skillRoutes);
router.use('/projects', projectRoutes);
router.use('/experiences', experienceRoutes);
router.use('/education', educationRoutes);
router.use('/certifications', certificationRoutes);
router.use('/testimonials', testimonialRoutes);
router.use('/contact', contactRoutes);
router.use('/dashboard', dashboardRoutes);
router.use('/github', githubRoutes);

export default router;
