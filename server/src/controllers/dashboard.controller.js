import asyncHandler from '../middleware/asyncHandler.js';
import {
  Project,
  Skill,
  Experience,
  Education,
  Certification,
  Testimonial,
  ContactMessage,
} from '../models/index.js';

/** GET /api/dashboard  (admin) — overview counts + recent activity. */
export const getOverview = asyncHandler(async (req, res) => {
  const [
    projects,
    featuredProjects,
    skills,
    experiences,
    education,
    certifications,
    testimonials,
    unreadMessages,
    totalMessages,
    recentMessages,
    recentProjects,
  ] = await Promise.all([
    Project.countDocuments(),
    Project.countDocuments({ featured: true }),
    Skill.countDocuments(),
    Experience.countDocuments(),
    Education.countDocuments(),
    Certification.countDocuments(),
    Testimonial.countDocuments(),
    ContactMessage.countDocuments({ status: 'unread' }),
    ContactMessage.countDocuments(),
    ContactMessage.find().sort({ createdAt: -1 }).limit(5),
    Project.find().sort({ updatedAt: -1 }).limit(5).select('title slug updatedAt status featured'),
  ]);

  res.json({
    success: true,
    data: {
      counts: {
        projects,
        featuredProjects,
        skills,
        experiences,
        education,
        certifications,
        testimonials,
        unreadMessages,
        totalMessages,
      },
      recentMessages,
      recentProjects,
    },
  });
});
