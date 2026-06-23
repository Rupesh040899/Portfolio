import mongoose from 'mongoose';
import env from './env.js';

let isConnected = false;

/**
 * Connect to MongoDB.
 *
 * This is deliberately NON-fatal: if `MONGO_URI` is empty or the
 * connection fails, we log a clear warning and let the server keep
 * running. That way the frontend can be developed against the API
 * before the database is provisioned. Routes that need the DB will
 * report a 503 via `requireDatabase` middleware.
 */
export async function connectDB() {
  if (!env.mongoUri) {
    console.warn(
      '\x1b[33m[db] MONGO_URI is not set — running WITHOUT a database.\x1b[0m\n' +
        '      Add MONGO_URI to your .env when your MongoDB is ready.'
    );
    return null;
  }

  try {
    mongoose.set('strictQuery', true);
    const conn = await mongoose.connect(env.mongoUri, {
      serverSelectionTimeoutMS: 8000,
    });
    isConnected = true;
    console.log(`\x1b[32m[db] MongoDB connected:\x1b[0m ${conn.connection.host}/${conn.connection.name}`);

    mongoose.connection.on('disconnected', () => {
      isConnected = false;
      console.warn('[db] MongoDB disconnected');
    });
    mongoose.connection.on('reconnected', () => {
      isConnected = true;
      console.log('[db] MongoDB reconnected');
    });

    return conn;
  } catch (err) {
    isConnected = false;
    console.error(`\x1b[31m[db] MongoDB connection failed:\x1b[0m ${err.message}`);
    console.warn('[db] Server will continue running without a database.');
    return null;
  }
}

/** True when mongoose currently has an active connection. */
export function isDbConnected() {
  return isConnected && mongoose.connection.readyState === 1;
}

export default connectDB;
