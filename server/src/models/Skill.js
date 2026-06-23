import mongoose from 'mongoose';

/**
 * A single skill / technology. Powers the interactive Skills Matrix
 * (network graph), so it also carries `connections` to other skills
 * and visual hints (color, group) for rendering nodes & edges.
 */
const skillSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Skill name is required'],
      trim: true,
      unique: true,
    },
    slug: { type: String, trim: true, lowercase: true, index: true },

    category: {
      type: String,
      trim: true,
      enum: ['frontend', 'backend', 'database', 'devops', 'language', 'tooling', 'design', 'other'],
      default: 'other',
      index: true,
    },

    icon: { type: String, trim: true, default: '' }, // icon name or Cloudinary URL
    color: { type: String, trim: true, default: '#7c5cff' }, // node accent color
    description: { type: String, trim: true, default: '' },

    // 0–100 for radial/glow intensity (NOT a progress bar in the UI).
    proficiency: { type: Number, min: 0, max: 100, default: 70 },
    experienceLevel: {
      type: String,
      enum: ['beginner', 'intermediate', 'advanced', 'expert'],
      default: 'intermediate',
    },
    yearsExperience: { type: Number, min: 0, default: 1 },

    // Names of skills this node connects to in the matrix graph.
    connections: { type: [String], default: [] },

    isCore: { type: Boolean, default: false }, // anchor nodes (React, Node, ...)
    displayOrder: { type: Number, default: 0, index: true },
  },
  { timestamps: true }
);

skillSchema.index({ category: 1, displayOrder: 1 });

export const Skill = mongoose.model('Skill', skillSchema);
export default Skill;
