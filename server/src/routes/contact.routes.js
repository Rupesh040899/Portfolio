import { Router } from 'express';
import {
  submitMessage,
  listMessages,
  updateMessage,
  deleteMessage,
} from '../controllers/contact.controller.js';
import { protect } from '../middleware/auth.js';
import requireDatabase from '../middleware/requireDatabase.js';

const router = Router();

// Public: submit a message. Works WITHOUT a database — it emails you
// (if mail is configured) and saves to Mongo only when connected.
router.post('/', submitMessage);

// Admin: manage stored submissions (these need the database).
router.get('/', requireDatabase, protect, listMessages);
router.patch('/:id', requireDatabase, protect, updateMessage);
router.delete('/:id', requireDatabase, protect, deleteMessage);

export default router;
