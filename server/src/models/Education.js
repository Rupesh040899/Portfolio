import mongoose from 'mongoose';
import mediaSchema from './shared/media.schema.js';

const educationSchema = new mongoose.Schema(
  {
    institute: { type: String, required: [true, 'Institute is required'], trim: true },
    degree: { type: String, required: [true, 'Degree is required'], trim: true },
    fieldOfStudy: { type: String, trim: true, default: '' },
    grade: { type: String, trim: true, default: '' },

    startDate: { type: Date },
    endDate: { type: Date },
    current: { type: Boolean, default: false },
    duration: { type: String, trim: true, default: '' },

    description: { type: String, trim: true, default: '' },
    location: { type: String, trim: true, default: '' },
    logo: { type: mediaSchema, default: () => ({}) },

    displayOrder: { type: Number, default: 0 },
  },
  { timestamps: true }
);

educationSchema.index({ startDate: -1 });

export const Education = mongoose.model('Education', educationSchema);
export default Education;
