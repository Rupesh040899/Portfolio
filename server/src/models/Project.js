import mongoose from 'mongoose';
import slugify from 'slugify';
import mediaSchema from './shared/media.schema.js';

/** Case-study narrative — "show how you think, not just what you built". */
const caseStudySchema = new mongoose.Schema(
  {
    problemStatement: { type: String, trim: true, default: '' },
    research: { type: String, trim: true, default: '' },
    solution: { type: String, trim: true, default: '' },
    architecture: { type: String, trim: true, default: '' },
    databaseDesign: { type: String, trim: true, default: '' },
    backendFlow: { type: String, trim: true, default: '' },
    challenges: { type: [String], default: [] },
    results: { type: String, trim: true, default: '' },
    keyLearnings: { type: [String], default: [] },
  },
  { _id: false }
);

/** Headline metrics shown on the vault card / analytics. */
const metricsSchema = new mongoose.Schema(
  {
    performanceIncrease: { type: String, trim: true, default: '' },
    usersImpacted: { type: String, trim: true, default: '' },
    revenueImpact: { type: String, trim: true, default: '' },
    pageSpeedScore: { type: Number, min: 0, max: 100 },
  },
  { _id: false }
);

const projectSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, 'Project title is required'],
      trim: true,
    },
    slug: { type: String, unique: true, lowercase: true, index: true },

    shortDescription: { type: String, trim: true, default: '', maxlength: 280 },
    description: { type: String, trim: true, default: '' },

    thumbnail: { type: mediaSchema, default: () => ({}) },
    gallery: { type: [mediaSchema], default: [] },

    techStack: { type: [String], default: [], index: true },

    liveUrl: { type: String, trim: true, default: '' },
    githubUrl: { type: String, trim: true, default: '' },

    featured: { type: Boolean, default: false, index: true },
    status: {
      type: String,
      enum: ['draft', 'published', 'archived'],
      default: 'published',
      index: true,
    },

    projectType: { type: String, trim: true, default: '' }, // e.g. "Web App", "API"
    industry: { type: String, trim: true, default: '' },

    startDate: { type: Date },
    endDate: { type: Date },

    caseStudy: { type: caseStudySchema, default: () => ({}) },
    metrics: { type: metricsSchema, default: () => ({}) },

    displayOrder: { type: Number, default: 0, index: true },
    views: { type: Number, default: 0 },
  },
  { timestamps: true }
);

// Auto-generate a unique-ish slug from the title when missing.
projectSchema.pre('validate', function generateSlug(next) {
  if (!this.slug && this.title) {
    this.slug = slugify(this.title, { lower: true, strict: true });
  }
  next();
});

projectSchema.index({ featured: -1, displayOrder: 1, createdAt: -1 });

export const Project = mongoose.model('Project', projectSchema);
export default Project;
