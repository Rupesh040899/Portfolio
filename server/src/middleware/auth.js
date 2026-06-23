import jwt from 'jsonwebtoken';
import env from '../config/env.js';
import ApiError from '../utils/ApiError.js';
import asyncHandler from './asyncHandler.js';
import Admin from '../models/Admin.js';

/**
 * Extract a JWT from the Authorization header (Bearer) or the
 * httpOnly cookie, verify it, and attach the admin to req.admin.
 */
export const protect = asyncHandler(async (req, res, next) => {
  let token;

  if (req.headers.authorization?.startsWith('Bearer ')) {
    token = req.headers.authorization.split(' ')[1];
  } else if (req.cookies?.token) {
    token = req.cookies.token;
  }

  if (!token) {
    throw ApiError.unauthorized('Not authenticated — please log in.');
  }

  const decoded = jwt.verify(token, env.jwtSecret);
  const admin = await Admin.findById(decoded.id);

  if (!admin) {
    throw ApiError.unauthorized('Account no longer exists.');
  }
  if (!admin.isActive) {
    throw ApiError.forbidden('Account is disabled.');
  }

  req.admin = admin;
  next();
});

/** Restrict a route to specific roles (defaults defined on the Admin model). */
export const authorize = (...roles) => (req, res, next) => {
  if (!req.admin || (roles.length && !roles.includes(req.admin.role))) {
    return next(ApiError.forbidden('You do not have permission to perform this action.'));
  }
  next();
};

export default protect;
