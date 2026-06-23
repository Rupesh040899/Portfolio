# RUPESH OS — Full Setup Guide (read me first)

This guide gets the project running **from scratch on a fresh laptop**, step by
step. No prior context needed. Follow it top to bottom.

There are two ways to run the app:

- **Mode A — No database (fastest):** the site shows built-in sample data.
  Great for just seeing it work. Nothing to install except Node.
- **Mode B — With your database:** content comes from MongoDB and you can edit
  it. Do this once you want it to be "real".

---

## 0) Prerequisites (install these once)

| Tool | Why | Check it's installed |
|---|---|---|
| **Node.js 18+** (20 LTS recommended) | runs both apps | `node -v` |
| **npm** (comes with Node) | installs packages | `npm -v` |
| **Git** | clone the repo | `git --version` |
| **MongoDB** *(Mode B only)* | the database | see Step 5 |

Download Node from https://nodejs.org (the "LTS" button).

> ⚠️ **Important about `.env` files:** they are intentionally NOT pushed to
> GitHub (they hold secrets). After you clone, you must create them by copying
> the `.env.example` files. Steps 3 and 6 below do exactly that.

---

## 1) Get the code onto your laptop

```bash
git clone <your-repo-url>
cd "MERN Portfolio Project"
```

You'll see two folders: `server/` (backend) and `client/` (frontend).

---

## 2) Install dependencies (both apps)

```bash
# from the project root
cd server
npm install

cd ../client
npm install
```

This creates the `node_modules` folders (also not pushed to GitHub — that's
normal, `npm install` rebuilds them).

---

# ───────────────  MODE A: Run without a database  ───────────────

If you just want to SEE the site working, do this:

## 3A) Create the env files

```bash
# in server/
cp .env.example .env        # Windows PowerShell: Copy-Item .env.example .env

# in client/
cp .env.example .env        # Windows PowerShell: Copy-Item .env.example .env
```

Leave `MONGO_URI` blank in `server/.env`, and leave `VITE_USE_MOCKS=true` in
`client/.env`. That's it.

## 4A) Run it (two terminals)

```bash
# Terminal 1
cd server
npm run dev          # http://localhost:5000

# Terminal 2
cd client
npm run dev          # http://localhost:5173
```

Open **http://localhost:5173**. Done. Skip to "Troubleshooting" if anything
errors. To make it use a real database instead, continue to Mode B.

---

# ───────────────  MODE B: Run with MongoDB  ───────────────

## 5) Get a MongoDB database

Pick ONE option:

### Option 1 — MongoDB Atlas (free, cloud, easiest)
1. Create a free account at https://www.mongodb.com/atlas
2. Create a free **M0** cluster.
3. **Database Access** → add a database user (username + password). Remember these.
4. **Network Access** → "Add IP Address" → "Allow access from anywhere" (`0.0.0.0/0`)
   for now (you can lock this down later).
5. **Connect** → "Drivers" → copy the connection string. It looks like:
   ```
   mongodb+srv://<username>:<password>@cluster0.xxxxx.mongodb.net/?retryWrites=true&w=majority
   ```
6. Replace `<username>` and `<password>` with the user you made, and add the
   database name right before the `?` (this project uses **`Portfolio`**):
   ```
   mongodb+srv://<username>:<password>@cluster0.xxxxx.mongodb.net/Portfolio?retryWrites=true&w=majority
   ```
   (Keep `<username>`/`<password>` as placeholders here — never commit real
   credentials to any file. The real values belong only in `server/.env`.)

> ⚠️ **Two gotchas that WILL bite you (they did during setup):**
> - **URL-encode special characters in the password.** If your password contains
>   `@ # : / ?`, encode them — e.g. `@` → `%40` and `:` → `%3A`, so an example
>   password `p@ss:word` becomes `p%40ss%3Aword`. An un-encoded `@` breaks the
>   whole connection string.
> - **The database name is case-sensitive.** `Portfolio` and `portfolio` are
>   different databases and MongoDB won't allow both. Use the **exact** spelling
>   of your existing DB folder everywhere (this project uses `Portfolio`).

### Option 2 — Local MongoDB (on your laptop)
1. Install **MongoDB Community Server**: https://www.mongodb.com/try/download/community
2. Start it (it usually runs as a service after install).
3. Your connection string is simply:
   ```
   mongodb://127.0.0.1:27017/rupesh_os
   ```

## 6) Configure `server/.env`

Open `server/.env` and fill it in. Here is every setting explained:

```ini
# --- Core ---
NODE_ENV=development
PORT=5000
CLIENT_URL=http://localhost:5173

# --- Database ---
# Paste the connection string from Step 5 here (password URL-encoded, DB name = Portfolio):
MONGO_URI=mongodb+srv://<username>:<password>@cluster0.xxxxx.mongodb.net/Portfolio?retryWrites=true&w=majority

# --- Auth  (explained in detail in the next section) ---
JWT_SECRET=PASTE_A_LONG_RANDOM_STRING_HERE
JWT_EXPIRES_IN=7d
COOKIE_EXPIRES_DAYS=7

# Bootstrap admin login (created when you run the seed)
ADMIN_EMAIL=rupesh.m@ly.design
ADMIN_PASSWORD=ChooseAStrongPassword123!
ADMIN_NAME=Rupesh Mali

# --- Cloudinary (only needed if you upload images later) ---
CLOUDINARY_CLOUD_NAME=
CLOUDINARY_API_KEY=
CLOUDINARY_API_SECRET=

# --- GitHub showcase (optional) ---
GITHUB_USERNAME=your-github-username
GITHUB_TOKEN=
```

### 👉 What to put in the "Auth" section (and how)

These control login security for the **Admin Dashboard** (at `/admin/login`).
Set them before seeding — the seed creates your admin account from these values.

| Variable | What it is | What to put |
|---|---|---|
| `JWT_SECRET` | The secret key used to sign login tokens. **Must be long, random, and private.** Never share it or commit it. | A random 64+ character string — generate it (below). |
| `JWT_EXPIRES_IN` | How long a login stays valid. | `7d` (7 days) is fine. Use `1d`, `12h`, `30d`, etc. |
| `COOKIE_EXPIRES_DAYS` | How long the login cookie lasts, in days. | `7` |
| `ADMIN_EMAIL` | The email you'll log into the admin with. | your email |
| `ADMIN_PASSWORD` | The password for that admin account. | a strong password you choose |
| `ADMIN_NAME` | Display name for the admin. | your name |

**Generate a strong `JWT_SECRET`** — run this in a terminal and paste the output:

```bash
node -e "console.log(require('crypto').randomBytes(48).toString('hex'))"
```

That prints something like `7f3a9c...` (96 characters). Copy the whole thing and
set `JWT_SECRET=` to it. That's all you need for Auth.

> 🔐 The `ADMIN_EMAIL` / `ADMIN_PASSWORD` are only used the first time you run
> the seed (Step 8) to create your admin account in the database. Choose a real
> password — it's how you'd log into the admin dashboard.

## 7) Configure `client/.env`

Open `client/.env` and turn mock data OFF so it reads from your database:

```ini
VITE_API_URL=
VITE_USE_MOCKS=false
```

(Leave `VITE_API_URL` blank — in dev the client automatically forwards `/api`
calls to the backend on port 5000.)

## 8) Seed the database (first run only)

This fills the database with the starter content and creates your admin login:

```bash
cd server
npm run seed
```

You should see `[seed] Done — RUPESH OS is seeded.` To wipe content later:
`npm run seed:destroy`.

> Edit the starter content in `server/src/seed/data.js` before seeding if you
> want your own data in from the start.

> ⚠️ **If your database is already populated** (e.g. you're connecting a fresh
> laptop to the same Atlas cluster you set up before), **SKIP this step** — the
> data is already there. `npm run seed` **wipes and reloads** everything from
> `data.js`, which would overwrite any edits you made via the dashboard/Atlas.

## 9) Run it (two terminals)

```bash
# Terminal 1
cd server
npm run dev          # should log: MongoDB connected

# Terminal 2
cd client
npm run dev
```

Open **http://localhost:5173**. The site is now powered by your database. 🎉

Verify the backend sees the DB: open http://localhost:5000/api/health — it
should say `"database":"connected"`.

---

## How to change the content shown on the site

The site reads everything from MongoDB. Three ways to edit it, easiest first:

1. **Admin Dashboard (recommended)** — log in and edit via forms. See the next
   section. No code, no commands, changes are instant.
2. **MongoDB Atlas** — Browse Collections → `Portfolio` → edit a document →
   refresh the site. Good for quick one-off tweaks.
3. **Seed file** — edit `server/src/seed/data.js`, then `cd server && npm run seed`.
   ⚠️ This **wipes and reloads ALL content** from the file — don't use it after
   you've edited via the dashboard or Atlas, or it overwrites those changes.

> Mock mode only: if `VITE_USE_MOCKS=true`, the site ignores the database and
> reads `client/src/lib/mockData.js` instead.

> Your photo: drop a square image at `client/public/profile.jpg` to show it in
> the hero (or set `avatar.url` on the Hero in the dashboard).

---

## Admin Dashboard

A login-protected panel to manage all content without touching code.

- **URL:** http://localhost:5173/admin/login
- **Login:** the `ADMIN_EMAIL` / `ADMIN_PASSWORD` from `server/.env`
  (the admin account is created when you run `npm run seed`).

From there you can edit **Hero, About, Skills, Projects, Experience, Education,
Certifications, Testimonials**, and read **Contact messages**. Everything saves
straight to MongoDB — refresh the public site to see changes. (The backend must
be running.)

> 🔐 Change the default admin password to something strong (via
> `PATCH /api/auth/password`, or ask for a change-password screen to be added).

---

## Receiving contact-form messages (by email)

When someone submits the contact form, the backend **emails it to your Gmail**
(and also saves it to MongoDB if the database is connected). Email works even
**without a database** — you just need to configure it once.

**1. Create a Gmail "App Password"** (a 16-character password just for this app):
   - Turn on **2-Step Verification**: https://myaccount.google.com/security
   - Then create an app password: https://myaccount.google.com/apppasswords
   - Copy the 16-character code (looks like `abcd efgh ijkl mnop`).

   > Use an App Password, **not** your normal Gmail password — Google blocks
   > normal-password logins for apps.

**2. Fill these in `server/.env`:**
   ```ini
   SMTP_USER=your.email@gmail.com
   SMTP_PASS=abcdefghijklmnop      # the 16-char app password, no spaces
   MAIL_TO=your.email@gmail.com    # where to receive (blank = same as SMTP_USER)
   ```

**3. In `client/.env` set `VITE_USE_MOCKS=false`** so the form actually calls the
   backend (in mock mode the form only *pretends* to send). The rest of the site
   still falls back to sample data if the DB isn't connected, so this is safe.

**4. Restart both servers.** Submit the form — the message lands in your inbox.
   Hitting **Reply** answers the sender directly (their address is set as reply-to).

> If `SMTP_USER`/`SMTP_PASS` are blank, the form still "succeeds" for the visitor
> but no email is sent (the server logs a warning). Configure them to actually
> receive mail.

---

## Troubleshooting

| Problem | Fix |
|---|---|
| `EADDRINUSE: ...:5000` | Port 5000 is busy. Close the other process, or change `PORT` in `server/.env` (and it'll still work — the client proxy targets 5000, so if you change it, also set `VITE_API_URL=http://localhost:NEWPORT/api`). |
| Backend logs `MONGO_URI is not set` | You're in Mode A, or you forgot to fill `MONGO_URI`. Fine for Mode A. |
| `MongoDB connection failed` | Check the connection string, the DB user/password, and (Atlas) that your IP is allowed in Network Access. |
| Site loads but shows sample data even with DB | `client/.env` still has `VITE_USE_MOCKS=true`. Set it to `false` and restart `npm run dev`. |
| API routes return `503` | The database isn't connected — see the two rows above. |
| Changes to `.env` don't take effect | Restart that app (`Ctrl+C`, then `npm run dev`). Env files are read only at startup. |
| **Edited `tailwind.config.js` but colors / theme toggle don't change** | **Restart `npm run dev`.** Tailwind does NOT hot-reload config changes — the dev server caches it. `.jsx`/`.css` edits hot-reload fine; only the config needs a restart. |
| **Blank white/black page** | There's an error. Check **two places**: the terminal running `npm run dev` (CSS/build errors show here) and the browser console (`F12` → Console) for JS errors. After fixing, hard-refresh (`Ctrl+Shift+R`). |
| Light theme doesn't fully turn white | Almost always a cached old build — hard-refresh (`Ctrl+Shift+R`). If you just edited the Tailwind config, restart `npm run dev` (see above). |
| Can't log into `/admin` | Make sure you ran `npm run seed` (creates the admin) and you're using the `ADMIN_EMAIL` / `ADMIN_PASSWORD` from `server/.env`. The backend must be running. |
| `db already exists with different case` | DB-name case mismatch — your `MONGO_URI` must use the exact case of the existing database (this project uses `Portfolio`). |
| `npm install` errors | Make sure Node is 18+ (`node -v`). Delete `node_modules` and try again. |

> 💡 **Stopping servers cleanly:** always stop a dev server with `Ctrl+C` in its
> terminal (don't just close the window). A leftover process keeps holding the
> port, and the next `npm run dev` silently moves to a different port (e.g. 5174)
> — so your browser at `:5173` shows a stale page. If you hit `EADDRINUSE`, a
> previous server is still running.

---

## Project structure (quick reference)

```
MERN Portfolio Project/
├─ SETUP.md                ← this file
├─ README.md               ← overview
├─ server/                 backend (Express + Mongoose)
│  ├─ .env.example         template — copy to .env
│  ├─ src/
│  │  ├─ models/           Mongoose schemas (the data shapes)
│  │  ├─ controllers/      one file per resource (plain & explicit)
│  │  ├─ routes/           one router per resource + index.js
│  │  ├─ middleware/       auth (JWT), error handler, requireDatabase
│  │  ├─ services/         GitHub showcase + email (Nodemailer)
│  │  ├─ seed/data.js      starter content; seed.js + exportJson.js scripts
│  │  └─ server.js         entry point (npm run dev)
│  └─ README.md            API reference
└─ client/                 frontend (React + Vite + Tailwind + GSAP + React Router)
   ├─ .env.example         template — copy to .env
   ├─ tailwind.config.js   colors/theme (RESTART dev after editing — see below)
   ├─ public/              profile.jpg (your photo) + favicon.svg
   ├─ src/
   │  ├─ lib/              api.js (+ mockData.js fallback), gsap.js
   │  ├─ context/          ContentContext (loads content once)
   │  ├─ hooks/            useTheme, useCountUp, useTilt, useMagnetic
   │  ├─ sections/         Hero, About, Skills, Projects, Experience, Education, Certifications, Contact
   │  ├─ components/       Navbar, AuroraBackground, ScrollProgress, Loader, Stats, TechMarquee, Reveal, SectionHeading, ProjectModal
   │  ├─ admin/            Admin dashboard (auth, layout, pages, forms)
   │  ├─ App.jsx           public portfolio · main.jsx wires the router
   │  └─ styles/index.css  theme colors (CSS variables) + components
   └─ README.md            frontend reference
```

**Light / dark theme:** the toggle (☀️/🌙 in the navbar) is in
`src/hooks/useTheme.js`. All colors are CSS variables defined in
`src/styles/index.css` (`:root` = dark, `:root.light` = light), so the toggle
swaps the whole palette at once. Your choice is saved in the browser.

---

## Daily workflow (after the one-time setup)

```bash
# Terminal 1
cd server && npm run dev

# Terminal 2
cd client && npm run dev
# open http://localhost:5173
```

Pushing changes back to GitHub:
```bash
git add .
git commit -m "your message"
git push
```
(Your `.env` files won't be pushed — that's by design. Re-create them on any new
machine using the steps above.)
