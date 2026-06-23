# RUPESH OS — Client

The immersive, OS-style frontend. React + Vite + Tailwind + GSAP.

> **Runs before your database is ready.** With `VITE_USE_MOCKS=true` the
> UI renders from built-in mock data. When the API + Mongo are live, set
> `VITE_USE_MOCKS=false` and it reads everything from `/api`.

## Setup

```bash
cd client
cp .env.example .env
npm install
npm run dev        # http://localhost:5173  (proxies /api -> :5000)
npm run build      # production build
```

## What's inside

| Area | File | Notes |
|---|---|---|
| Boot sequence | `components/boot/BootSequence.jsx` | typed status lines + logo reveal |
| Background | `components/layout/AuroraBackground.jsx` | aurora blobs, grid, vignette |
| Cursor light | `components/layout/CursorGlow.jsx` | dynamic lighting |
| Command Center | `sections/CommandCenter.jsx` | floating app panels (tilt + spotlight) |
| Hero | `sections/Hero.jsx` | parallax layers, typed roles |
| Project Vault | `sections/ProjectVault.jsx` + `components/project/ProjectCaseStudy.jsx` | locked files → fullscreen case study |
| Skills Matrix | `sections/SkillsMatrix.jsx` | SVG network graph (no progress bars) |
| Analytics | `sections/Analytics.jsx` | count-up stats + usage bars |
| Timeline | `sections/Timeline.jsx` | scrub-driven career journey |
| Contact Hub | `sections/Contact.jsx` | posts to `/api/contact` |
| AI Assistant | `components/assistant/AIAssistant.jsx` | rule-based answers from content |
| Recruiter Mode | `components/recruiter/RecruiterMode.jsx` | secret — type `hire-rupesh` in the assistant |

## Interaction toolkit (reusable hooks)

- `useMagnetic` — magnetic buttons
- `useTilt` — 3D card tilt + cursor spotlight (`--mx/--my`)
- `useReveal` — scroll-in reveals for any section (`data-reveal`)
- `useCountUp` — numbers that animate into view

## Design tokens

Defined in `tailwind.config.js` (`os.*`, `accent.*`) and `styles/index.css`
(`.glass`, `.btn-os`, `.text-gradient`, aurora keyframes). Reduced-motion is
respected globally.

## Swapping the assistant for a real LLM

`lib/assistant.js` is a pure function. Replace `answerQuestion` with a call to
your backend (which can call the Claude API) and keep the same return shape.
