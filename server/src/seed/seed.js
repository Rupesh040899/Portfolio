/**
 * Seed / reset script.
 *   npm run seed            -> wipe content + insert sample data + ensure admin
 *   npm run seed:destroy    -> wipe all content collections (keeps admins)
 *
 * Requires MONGO_URI in .env.
 */
import mongoose from 'mongoose';
import env from '../config/env.js';
import { connectDB } from '../config/db.js';
import {
  Admin,
  Hero,
  About,
  Skill,
  Project,
  Experience,
  Education,
  Certification,
  Testimonial,
} from '../models/index.js';
import * as data from './data.js';

const destroyOnly = process.argv.includes('--destroy');

async function ensureAdmin() {
  const existing = await Admin.findOne({ email: env.adminEmail.toLowerCase() });
  if (existing) {
    console.log(`[seed] Admin already exists: ${existing.email}`);
    return;
  }
  await Admin.create({
    name: env.adminName,
    email: env.adminEmail,
    password: env.adminPassword,
    role: 'admin',
  });
  console.log(`[seed] Created admin: ${env.adminEmail} (password from ADMIN_PASSWORD)`);
}

async function run() {
  if (!env.mongoUri) {
    console.error('[seed] MONGO_URI is not set. Add it to your .env and try again.');
    process.exit(1);
  }

  await connectDB();

  console.log('[seed] Clearing content collections...');
  await Promise.all([
    Hero.deleteMany({}),
    About.deleteMany({}),
    Skill.deleteMany({}),
    Project.deleteMany({}),
    Experience.deleteMany({}),
    Education.deleteMany({}),
    Certification.deleteMany({}),
    Testimonial.deleteMany({}),
  ]);

  if (destroyOnly) {
    console.log('[seed] Content destroyed.');
    await mongoose.connection.close();
    process.exit(0);
  }

  console.log('[seed] Inserting sample data...');
  await Hero.create({ ...data.hero, singletonKey: 'hero' });
  await About.create({ ...data.about, singletonKey: 'about' });
  await Skill.insertMany(data.skills);
  await Project.insertMany(data.projects);
  await Experience.insertMany(data.experiences);
  await Education.insertMany(data.education);
  await Certification.insertMany(data.certifications);
  await Testimonial.insertMany(data.testimonials);

  await ensureAdmin();

  console.log('\x1b[32m[seed] Done — RUPESH OS is seeded.\x1b[0m');
  await mongoose.connection.close();
  process.exit(0);
}

run().catch(async (err) => {
  console.error('[seed] Failed:', err);
  await mongoose.connection.close().catch(() => {});
  process.exit(1);
});
