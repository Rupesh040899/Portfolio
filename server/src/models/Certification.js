import mongoose from 'mongoose';
import mediaSchema from './shared/media.schema.js';

const certificationSchema = new mongoose.Schema(
  {
    name: { type: String, required: [true, 'Certificate name is required'], trim: true },
    issuer: { type: String, required: [true, 'Issuer is required'], trim: true },
    issueDate: { type: Date },
    expiryDate: { type: Date },
    credentialId: { type: String, trim: true, default: '' },
    credentialUrl: { type: String, trim: true, default: '' },
    image: { type: mediaSchema, default: () => ({}) },
    skills: { type: [String], default: [] },

    displayOrder: { type: Number, default: 0 },
  },
  { timestamps: true }
);

certificationSchema.index({ issueDate: -1 });

export const Certification = mongoose.model('Certification', certificationSchema);
export default Certification;
