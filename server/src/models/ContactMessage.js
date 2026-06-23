import mongoose from 'mongoose';

/**
 * Inbound contact form submission. Created by the public API,
 * read/managed from the admin dashboard (Contact Hub).
 */
const contactMessageSchema = new mongoose.Schema(
  {
    name: { type: String, required: [true, 'Name is required'], trim: true },
    email: {
      type: String,
      required: [true, 'Email is required'],
      lowercase: true,
      trim: true,
      match: [/^\S+@\S+\.\S+$/, 'Please provide a valid email'],
    },
    subject: { type: String, trim: true, default: '' },
    message: { type: String, required: [true, 'Message is required'], trim: true },

    status: {
      type: String,
      enum: ['unread', 'read', 'replied', 'archived'],
      default: 'unread',
      index: true,
    },
    // Light spam/audit metadata (no PII beyond what was submitted).
    ipAddress: { type: String, trim: true, default: '' },
    userAgent: { type: String, trim: true, default: '' },
  },
  { timestamps: true } // createdAt satisfies the "CreatedAt" field
);

contactMessageSchema.index({ createdAt: -1 });

export const ContactMessage = mongoose.model('ContactMessage', contactMessageSchema);
export default ContactMessage;
