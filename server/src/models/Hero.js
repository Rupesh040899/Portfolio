import mongoose from 'mongoose';
import mediaSchema from './shared/media.schema.js';

/**
 * Hero / landing content. This is a SINGLETON collection — there is
 * only ever one hero document. Use `Hero.getSingleton()` to fetch
 * (and lazily create) it.
 */
const heroSchema = new mongoose.Schema(
  {
    name: { type: String, trim: true, default: 'Rupesh Mali' },
    title: { type: String, trim: true, default: 'Full-Stack Software Engineer' },
    tagline: { type: String, trim: true, default: '' },
    description: { type: String, trim: true, default: '' },

    // Rotating roles for the typing animation in the hero.
    roles: { type: [String], default: [] },

    resumeUrl: { type: String, trim: true, default: '' },
    githubUrl: { type: String, trim: true, default: '' },
    linkedinUrl: { type: String, trim: true, default: '' },
    twitterUrl: { type: String, trim: true, default: '' },
    email: { type: String, trim: true, lowercase: true, default: '' },
    phone: { type: String, trim: true, default: '' },
    location: { type: String, trim: true, default: '' },

    // Visual assets for the cinematic hero / boot sequence.
    avatar: { type: mediaSchema, default: () => ({}) },
    backgroundAssets: { type: [mediaSchema], default: [] },

    // Marker so we can enforce a single document.
    singletonKey: { type: String, default: 'hero', unique: true, immutable: true },
  },
  { timestamps: true }
);

heroSchema.statics.getSingleton = async function getSingleton() {
  let doc = await this.findOne({ singletonKey: 'hero' });
  if (!doc) doc = await this.create({ singletonKey: 'hero' });
  return doc;
};

export const Hero = mongoose.model('Hero', heroSchema);
export default Hero;
