import mongoose from 'mongoose';
import mediaSchema from './shared/media.schema.js';

const testimonialSchema = new mongoose.Schema(
  {
    name: { type: String, required: [true, 'Name is required'], trim: true },
    position: { type: String, trim: true, default: '' },
    company: { type: String, trim: true, default: '' },
    image: { type: mediaSchema, default: () => ({}) },
    review: { type: String, required: [true, 'Review is required'], trim: true },
    rating: { type: Number, min: 1, max: 5, default: 5 },

    relationship: { type: String, trim: true, default: '' }, // e.g. "Manager", "Client"
    featured: { type: Boolean, default: false },
    displayOrder: { type: Number, default: 0 },
  },
  { timestamps: true }
);

export const Testimonial = mongoose.model('Testimonial', testimonialSchema);
export default Testimonial;
