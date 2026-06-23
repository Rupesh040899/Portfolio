import app from './app.js';
import env from './config/env.js';
import { connectDB } from './config/db.js';

async function start() {
  // Non-fatal: server boots even if the DB is not yet configured.
  await connectDB();

  const server = app.listen(env.port, () => {
    console.log(`\x1b[36m[server] RUPESH OS API running on http://localhost:${env.port} (${env.nodeEnv})\x1b[0m`);
    console.log(`[server] Health check: http://localhost:${env.port}/api/health`);
  });

  // Graceful shutdown
  const shutdown = (signal) => {
    console.log(`\n[server] ${signal} received — shutting down.`);
    server.close(() => process.exit(0));
  };
  process.on('SIGINT', () => shutdown('SIGINT'));
  process.on('SIGTERM', () => shutdown('SIGTERM'));

  process.on('unhandledRejection', (reason) => {
    console.error('[server] Unhandled rejection:', reason);
  });
}

start();
