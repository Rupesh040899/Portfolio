import jwt from 'jsonwebtoken';
import env from '../config/env.js';

export function signToken(adminId) {
  return jwt.sign({ id: adminId }, env.jwtSecret, { expiresIn: env.jwtExpiresIn });
}

/** Set the auth cookie + return a normalised auth payload. */
export function sendTokenResponse(admin, statusCode, res) {
  const token = signToken(admin._id);

  res.cookie('token', token, {
    httpOnly: true,
    secure: env.isProd,
    sameSite: env.isProd ? 'none' : 'lax',
    maxAge: env.cookieExpiresDays * 24 * 60 * 60 * 1000,
  });

  res.status(statusCode).json({
    success: true,
    token,
    admin: admin.toJSON(),
  });
}
