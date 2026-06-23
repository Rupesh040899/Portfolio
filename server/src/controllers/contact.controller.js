import asyncHandler from '../middleware/asyncHandler.js';
import ApiError from '../utils/ApiError.js';
import ContactMessage from '../models/ContactMessage.js';
import { isDbConnected } from '../config/db.js';
import { sendContactEmail } from '../services/mail.service.js';

/**
 * POST /api/contact  (public)
 * Emails the message to the site owner (if mail is configured) and
 * also saves it to MongoDB (if the database is connected). Either can
 * be off and the request still succeeds — so it works before the DB
 * is set up, as long as email is configured.
 */
export const submitMessage = asyncHandler(async (req, res) => {
  const { name, email, subject, message } = req.body;
  if (!name || !email || !message) {
    throw ApiError.badRequest('Name, email and message are required');
  }

  // Save to the database when it's available (best-effort).
  let saved = null;
  if (isDbConnected()) {
    saved = await ContactMessage.create({
      name,
      email,
      subject,
      message,
      ipAddress: req.ip,
      userAgent: req.get('user-agent') || '',
    });
  }

  // Send the notification email (won't fail the request if mail is off).
  await sendContactEmail({ name, email, subject, message }).catch((err) =>
    console.error('[mail] failed to send contact email:', err.message)
  );

  res.status(201).json({
    success: true,
    message: 'Message received — thank you!',
    data: saved ? { id: saved._id, createdAt: saved.createdAt } : null,
  });
});

/** GET /api/contact  (admin) */
export const listMessages = asyncHandler(async (req, res) => {
  const filter = {};
  if (req.query.status) filter.status = req.query.status;

  const messages = await ContactMessage.find(filter).sort({ createdAt: -1 });
  res.json({ success: true, count: messages.length, data: messages });
});

/** PATCH /api/contact/:id  (admin) — update status */
export const updateMessage = asyncHandler(async (req, res) => {
  const doc = await ContactMessage.findByIdAndUpdate(
    req.params.id,
    { status: req.body.status },
    { new: true, runValidators: true }
  );
  if (!doc) throw ApiError.notFound('Message not found');
  res.json({ success: true, data: doc });
});

/** DELETE /api/contact/:id  (admin) */
export const deleteMessage = asyncHandler(async (req, res) => {
  const doc = await ContactMessage.findByIdAndDelete(req.params.id);
  if (!doc) throw ApiError.notFound('Message not found');
  res.json({ success: true, message: 'Message deleted', data: { id: req.params.id } });
});
