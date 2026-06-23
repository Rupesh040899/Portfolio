# RUPESH OS

A futuristic, operating-system–style developer portfolio for **Rupesh Mali**,
built as a production-grade **MERN** application with a custom, data-driven CMS.

It doesn't look like a portfolio. It feels like a product.

```
RUPESH Portfolio Project/
├─ server/   Express + Mongoose API + admin CMS (the data layer)
└─ client/   React + Vite + Tailwind + GSAP immersive frontend
```

## Status

| Layer | State |
|---|---|
| Backend models + REST API | ✅ complete & boot-tested |
| Frontend experience (boot, command center, vault, matrix, analytics, timeline, contact, assistant, recruiter mode) | ✅ complete & build-tested |
| Database connection | ⏳ **you connect it later** — see below |
| Admin dashboard UI | 🔜 next phase (API is ready for it) |

> **No database yet?** Everything runs without one. The server boots and serves
> non-DB routes; the client renders from mock data. Connecting Mongo is a single
> `.env` change — nothing else needs to change.

## Quick start

**1. Backend**
```bash
cd server
cp .env.example .env      # leave MONGO_URI blank for now
npm install
npm run dev               # http://localhost:5000
```

**2. Frontend** (new terminal)
```bash
cd client
cp .env.example .env      # VITE_USE_MOCKS=true
npm install
npm run dev               # http://localhost:5173
```

Open http://localhost:5173 — watch the boot sequence, explore the Command
Center, decrypt a project in the Vault, and try typing **`hire-rupesh`** in the
assistant (bottom-right ✦).

## When your database is ready (on your laptop)

1. Start MongoDB (local `mongod` or a free MongoDB Atlas cluster).
2. In `server/.env`, set `MONGO_URI=...` (and a real `JWT_SECRET`).
3. Seed sample content + create your admin login:
   ```bash
   cd server && npm run seed
   ```
4. In `client/.env`, set `VITE_USE_MOCKS=false`.
5. Restart both apps — the site is now fully live from MongoDB.

## What makes this recruiter-worthy

- **Custom CMS**: all content lives in MongoDB; only branding, layout, theme &
  animation config are hardcoded.
- **Clean architecture**: model → controller (factories) → route → middleware,
  with JWT auth, validation, rate limiting and centralized errors.
- **Data-driven everything**: hero, about, skills, projects (with full case
  studies + metrics), experience, education, certifications, testimonials,
  contact inbox, dashboard, and a live GitHub showcase.
- **Awwwards-grade frontend**: GSAP boot sequence, glassmorphism, aurora
  lighting, 3D tilt, magnetic interactions, an interactive skills network, a
  scrub-driven timeline, an AI assistant and a secret recruiter mode — at
  ~124 KB gzipped JS, reduced-motion aware.

See `server/README.md` and `client/README.md` for details.
