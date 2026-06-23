import mongoose from 'mongoose';
import mediaSchema from './shared/media.schema.js';

/**
 * Work experience entry. Powers the cinematic Timeline Experience.
 */
const experienceSchema = new mongoose.Schema(
  {
    company: { type: String, required: [true, 'Company is required'], trim: true },
    role: { type: String, required: [true, 'Role is required'], trim: true },
    employmentType: {
      type: String,
      enum: ['full-time', 'part-time', 'contract', 'freelance', 'internship'],
      default: 'full-time',
    },
    location: { type: String, trim: true, default: '' },

    // Use startDate/endDate for sorting; `duration` is an optional display label.
    startDate: { type: Date },
    endDate: { type: Date }, // null/absent => current role
    current: { type: Boolean, default: false },
    duration: { type: String, trim: true, default: '' },

    description: { type: String, trim: true, default: '' },
    technologies: { type: [String], default: [] },
    achievements: { type: [String], default: [] },

    companyLogo: { type: mediaSchema, default: () => ({}) },
    companyUrl: { type: String, trim: true, default: '' },

    displayOrder: { type: Number, default: 0 },
  },
  { timestamps: true }
);

experienceSchema.index({ current: -1, startDate: -1 });

export const Experience = mongoose.model('Experience', experienceSchema);
export default Experience;
