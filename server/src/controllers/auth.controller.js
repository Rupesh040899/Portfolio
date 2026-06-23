import asyncHandler from '../middleware/asyncHandler.js';
import ApiError from '../utils/ApiError.js';
import { sendTokenResponse } from '../utils/token.js';
import Admin from '../models/Admin.js';

/** POST /api/auth/login */
export const login = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    throw ApiError.badRequest('Email and password are required');
  }

  const admin = await Admin.findOne({ email: email.toLowerCase() }).select('+password');
  if (!admin || !(await admin.comparePassword(password))) {
    throw ApiError.unauthorized('Invalid credentials');
  }
  if (!admin.isActive) {
    throw ApiError.forbidden('Account is disabled');
  }

  admin.lastLoginAt = new Date();
  await admin.save({ validateBeforeSave: false });

  sendTokenResponse(admin, 200, res);
});

/** POST /api/auth/logout */
export const logout = asyncHandler(async (req, res) => {
  res.cookie('token', '', { httpOnly: true, expires: new Date(0) });
  res.json({ success: true, message: 'Logged out' });
});

/** GET /api/auth/me */
export const getMe = asyncHandler(async (req, res) => {
  res.json({ success: true, admin: req.admin.toJSON() });
});

/** PATCH /api/auth/password */
export const updatePassword = asyncHandler(async (req, res) => {
  const { currentPassword, newPassword } = req.body;
  if (!currentPassword || !newPassword) {
    throw ApiError.badRequest('Current and new password are required');
  }

  const admin = await Admin.findById(req.admin._id).select('+password');
  if (!(await admin.comparePassword(currentPassword))) {
    throw ApiError.unauthorized('Current password is incorrect');
  }

  admin.password = newPassword;
  await admin.save();
  sendTokenResponse(admin, 200, res);
});
