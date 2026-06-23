import dotenv from 'dotenv';

dotenv.config();

/**
 * Centralised, typed access to environment variables.
 * Everything that reads `process.env` should go through here so we
 * have one place to document and default config.
 */
const env = {
  nodeEnv: process.env.NODE_ENV || 'development',
  isProd: process.env.NODE_ENV === 'production',
  port: Number(process.env.PORT) || 5000,
  clientUrl: process.env.CLIENT_URL || 'http://localhost:5173',

  // Database — intentionally allowed to be empty so the app boots without it.
  mongoUri: process.env.MONGO_URI || '',

  // Auth
  jwtSecret: process.env.JWT_SECRET || 'insecure-dev-secret-change-me',
  jwtExpiresIn: process.env.JWT_EXPIRES_IN || '7d',
  cookieExpiresDays: Number(process.env.COOKIE_EXPIRES_DAYS) || 7,

  // Bootstrap admin
  adminEmail: process.env.ADMIN_EMAIL || 'admin@rupesh.os',
  adminPassword: process.env.ADMIN_PASSWORD || 'ChangeMe123!',
  adminName: process.env.ADMIN_NAME || 'Rupesh Mali',

  // Cloudinary
  cloudinary: {
    cloudName: process.env.CLOUDINARY_CLOUD_NAME || '',
    apiKey: process.env.CLOUDINARY_API_KEY || '',
    apiSecret: process.env.CLOUDINARY_API_SECRET || '',
  },

  // GitHub
  github: {
    username: process.env.GITHUB_USERNAME || '',
    token: process.env.GITHUB_TOKEN || '',
  },

  // Email (contact form notifications, via Gmail SMTP)
  mail: {
    user: process.env.SMTP_USER || '',
    pass: process.env.SMTP_PASS || '',
    to: process.env.MAIL_TO || '',
  },
};

export default env;
