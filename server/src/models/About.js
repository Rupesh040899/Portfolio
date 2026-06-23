import mongoose from 'mongoose';
import mediaSchema from './shared/media.schema.js';

/** A single animated stat on the About / Analytics surface. */
const statSchema = new mongoose.Schema(
  {
    label: { type: String, trim: true, required: true },
    value: { type: Number, required: true },
    suffix: { type: String, trim: true, default: '' }, // e.g. "+", "K", "%"
    icon: { type: String, trim: true, default: '' },
  },
  { _id: false }
);

const achievementSchema = new mongoose.Schema(
  {
    title: { type: String, trim: true, required: true },
    description: { type: String, trim: true, default: '' },
    icon: { type: String, trim: true, default: '' },
    date: { type: Date },
  },
  { _id: false }
);

/**
 * About section. SINGLETON collection (one document).
 */
const aboutSchema = new mongoose.Schema(
  {
    profileImage: { type: mediaSchema, default: () => ({}) },
    introduction: { type: String, trim: true, default: '' },
    bio: { type: String, trim: true, default: '' },
    yearsExperience: { type: Number, default: 0 },
    // Free-text experience label (e.g. "3 months (interning)") — shown
    // instead of "X+ years" when set. Better fit for early-career.
    experienceLabel: { type: String, trim: true, default: '' },
    location: { type: String, trim: true, default: '' },
    availableForWork: { type: Boolean, default: true },

    statistics: { type: [statSchema], default: [] },
    achievements: { type: [achievementSchema], default: [] },

    // Free-form facts / "what I value" bullets for the command center.
    highlights: { type: [String], default: [] },

    singletonKey: { type: String, default: 'about', unique: true, immutable: true },
  },
  { timestamps: true }
);

aboutSchema.statics.getSingleton = async function getSingleton() {
  let doc = await this.findOne({ singletonKey: 'about' });
  if (!doc) doc = await this.create({ singletonKey: 'about' });
  return doc;
};

export const About = mongoose.model('About', aboutSchema);
export default About;
