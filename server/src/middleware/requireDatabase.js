import { isDbConnected } from '../config/db.js';
import ApiError from '../utils/ApiError.js';

/**
 * Guard for routes that need the database. Because the server can
 * run without Mongo (see config/db.js), we return a clear 503 instead
 * of throwing confusing connection errors deep in a query.
 */
export function requireDatabase(req, res, next) {
  if (!isDbConnected()) {
    return next(
      ApiError.serviceUnavailable(
        'Database is not connected. Set MONGO_URI in the server .env and restart.'
      )
    );
  }
  next();
}

export default requireDatabase;
