import mongoose from 'mongoose';

/**
 * Reusable media sub-document. We never store binaries in Mongo —
 * files live in Cloudinary and we keep the URL + the public_id
 * (needed to delete/transform the asset later).
 */
export const mediaSchema = new mongoose.Schema(
  {
    url: { type: String, trim: true, default: '' },
    publicId: { type: String, trim: true, default: '' },
    alt: { type: String, trim: true, default: '' },
    width: { type: Number },
    height: { type: Number },
    format: { type: String, trim: true },
  },
  { _id: false }
);

export default mediaSchema;
