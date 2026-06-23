# RUPESH OS — Server

Express + Mongoose backend powering the RUPESH OS portfolio CMS.

> **No database yet? No problem.** The server boots without `MONGO_URI`.
> Public/admin data routes return `503` until you set it; everything else
> (health check, GitHub showcase, root) works. When your MongoDB is ready,
> just fill in `MONGO_URI` in `.env` and restart.

## Setup

```bash
cd server
cp .env.example .env      # then edit values
npm install
npm run dev               # nodemon, http://localhost:5000
```

Once your DB is connected:

```bash
npm run seed              # sample content + bootstrap admin
npm run seed:destroy      # wipe content collections
```

The bootstrap admin uses `ADMIN_EMAIL` / `ADMIN_PASSWORD` from `.env`.

## Architecture

```
src/
├─ config/        env + graceful DB connection
├─ models/        Mongoose schemas (the data layer)
│  └─ shared/     reusable sub-schemas (Cloudinary media)
├─ middleware/    auth (JWT), error handler, asyncHandler, requireDatabase
├─ controllers/   one plain, explicit file per resource (no factories)
├─ routes/        one router per resource, mounted in index.js under /api
├─ services/      GitHub showcase (live, cached, not persisted)
├─ seed/          sample data + seed script
├─ app.js         express app (security, cors, rate limit, routes)
└─ server.js      bootstrap + graceful shutdown
```

**Design notes**
- **Data-driven CMS:** all content lives in MongoDB; only branding, layout,
  theme and animation config are hardcoded in the client.
- **Singletons** (`hero`, `about`) are one-document collections with their own
  `get`/`update` controllers.
- **Collections** (`skills`, `projects`, `experiences`, `education`,
  `certifications`, `testimonials`) each have an explicit controller with
  `getAll / getOne / create / update / delete` — plain Mongoose calls, easy to
  read and modify. (`projects/:idOrSlug` accepts a Mongo id **or** a slug.)
- **Media** is never stored in Mongo — only Cloudinary `{ url, publicId }`.
- **Auth** is JWT (httpOnly cookie + Bearer header both supported).

## API

| Method | Endpoint | Access | Notes |
|---|---|---|---|
| GET | `/api/health` | public | status + db state |
| POST | `/api/auth/login` | public | returns token + sets cookie |
| POST | `/api/auth/logout` | public | |
| GET | `/api/auth/me` | admin | current admin |
| PATCH | `/api/auth/password` | admin | change password |
| GET / PUT | `/api/hero` | public / admin | singleton |
| GET / PUT | `/api/about` | public / admin | singleton |
| GET, GET/:id | `/api/skills` | public | list + single |
| POST, PUT/:id, DELETE/:id | `/api/skills` | admin | |
| … | `/api/projects` | public/admin | `GET /:idOrSlug` accepts id **or slug** |
| … | `/api/experiences` | public/admin | |
| … | `/api/education` | public/admin | |
| … | `/api/certifications` | public/admin | |
| … | `/api/testimonials` | public/admin | |
| POST | `/api/contact` | public | emails the owner + saves if DB is on (works without DB) |
| GET, PATCH/:id, DELETE/:id | `/api/contact` | admin | manage stored inbox (needs DB) |
| GET | `/api/dashboard` | admin | overview counts |
| GET | `/api/github` | public | live profile + repos + languages |

List endpoints return all items sorted sensibly (e.g. featured/newest first).
Responses follow `{ success, count, data }`; errors follow
`{ success: false, message, details? }`.
