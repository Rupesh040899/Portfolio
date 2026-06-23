/**
 * Exports the seed data to JSON files you can import directly into
 * MongoDB (Atlas Data Explorer or Compass → "Add Data → Import JSON").
 * One file per collection, named to match the real collection names.
 *
 *   node src/seed/exportJson.js
 *
 * Dates are written in Extended-JSON ({ "$date": ... }) so they import
 * as real Date values. Run this, then import each file into the
 * matching collection in your `portfolio` database.
 */
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import slugify from 'slugify';

import {
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

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const outDir = path.resolve(__dirname, '../../import-json');
fs.mkdirSync(outDir, { recursive: true });

// Recursively convert Date instances to Extended JSON so Mongo imports them as dates.
function convert(value) {
  if (value instanceof Date) return { $date: value.toISOString() };
  if (Array.isArray(value)) return value.map(convert);
  if (value && typeof value === 'object') {
    const out = {};
    for (const [k, v] of Object.entries(value)) out[k] = convert(v);
    return out;
  }
  return value;
}

const slug = (s) => slugify(s, { lower: true, strict: true });

const datasets = [
  [Hero, [{ ...data.hero, singletonKey: 'hero' }]],
  [About, [{ ...data.about, singletonKey: 'about' }]],
  [Skill, data.skills.map((s) => ({ ...s, slug: slug(s.name) }))],
  [Project, data.projects.map((p) => ({ ...p, slug: slug(p.title) }))],
  [Experience, data.experiences],
  [Education, data.education],
  [Certification, data.certifications],
  [Testimonial, data.testimonials],
];

console.log(`[export] Writing JSON to: ${outDir}\n`);
for (const [Model, docs] of datasets) {
  const name = Model.collection.name; // exact collection name Mongoose uses
  const file = path.join(outDir, `${name}.json`);
  fs.writeFileSync(file, JSON.stringify(convert(docs), null, 2));
  console.log(`  ${name}.json  (${docs.length} document${docs.length === 1 ? '' : 's'})`);
}
console.log('\n[export] Done. Import each file into the matching collection.');
process.exit(0);
