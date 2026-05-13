# LEVEL UP — 21-Day Challenge

Favor Church YTH CAMP. Next.js 15 + Supabase Postgres on Vercel.

## Stack

- Next.js 15 App Router (TypeScript, RSC + server actions)
- Tailwind CSS with the Level Up design tokens (Montserrat + Inter)
- Supabase Postgres (service-role only, no anon access)
- `framer-motion` and `canvas-confetti` for moments
- Cookie auth: httpOnly `lu_uid`, 90-day expiry

The start date is read from `START_DATE` so the same codebase can ship next year — just bump the env.

## Local setup

```bash
pnpm install
cp .env.example .env.local
# fill in NEXT_PUBLIC_SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY, START_DATE
pnpm dev
```

Open http://localhost:3000 — root redirects to `/onboarding` until you have a cookie, then to `/journey`.

## Supabase setup

In the Supabase SQL editor (or via the CLI), run in order:

1. `supabase/migrations/0001_init.sql`
2. `supabase/seed/devotionals.sql`
3. `supabase/seed/upgrades.sql`
4. `supabase/seed/badges.sql`

RLS is enabled on every table with **no policies**. All reads/writes go through the Vercel server using the service role key, which bypasses RLS by design.

Get credentials at **Project Settings → API**:
- `NEXT_PUBLIC_SUPABASE_URL` — Project URL
- `SUPABASE_SERVICE_ROLE_KEY` — service_role secret (server-only, never prefix `NEXT_PUBLIC_`)

## Vercel deploy

1. Push to GitHub.
2. Import the repo on Vercel (framework auto-detected).
3. Add env vars:
   - `NEXT_PUBLIC_SUPABASE_URL`
   - `SUPABASE_SERVICE_ROLE_KEY`
   - `START_DATE=2026-05-30`
4. Deploy. Preview URLs come on every PR.

## App map

| Path | Purpose |
| --- | --- |
| `/onboarding` | Full name + email → upsert + cookie |
| `/journey` | 21-node quest path with progress |
| `/day/[day]` | Devotion (verse + reflection + challenge + Complete) |
| `/chest/[day]` | Milestone reward (days 3, 7, 10, 14, 17, 21) |
| `/leaderboard` | Hall of Faith — first name + last initial |
| `/armory` | Avatar level + earned upgrades grouped by category |

## API map

| Path | Method | Notes |
| --- | --- | --- |
| `/api/reflection` | PATCH | Debounced autosave (5KB cap) |
| `/api/complete-day` | POST | Marks day completed, awards XP, returns 3 upgrade options |
| `/api/complete-day?step=upgrade` | POST | Writes user's daily pick |
| `/api/complete-day?step=minigame` | POST | Bonus XP, +50/day cap |
| `/api/chest` | POST | Idempotent reward roll for milestone days |

## XP economy (lib/xp.ts)

- Complete a day: **+150 XP** (100 reflection + 50 challenge)
- Mini-game: bonus XP, server caps at **+50/day**
- Chest bonus_xp roll: **50–149 XP**
- Level: 250 XP per level

## Verification walk-through

1. `/` → redirect to `/onboarding`. Submit name+email → cookie set → `/journey`.
2. `/journey`: Day 1 available, 2–21 locked.
3. `/day/1`: type reflection (wait ~1s, confirm `day_completions.reflection`). Tap **Complete Day** → XP increments, upgrade modal appears, pick one → row in `user_upgrades`. Day 3 is a milestone → redirect to `/chest/3` → open → row in `chests`.
4. `/armory`: chosen item visible.
5. `/leaderboard`: user appears with `First L.` formatting.
6. Temporarily set `START_DATE=2026-05-22` → Day 9 unlocks, Day 7 chest available.

In Supabase Studio, query any table with the anon role → confirm RLS denies (no policies).

## Out of scope for v1

- "Who's Online" realtime presence — deferred.
- Admin dashboard — edit `devotionals` via Supabase Studio for now.
- Push notifications, TTS Listen button — stubbed only.

## Tree

```
app/             # routes (RSC) + API handlers
components/      # client + server components
lib/             # supabase, session, day, xp, content, types
middleware.ts    # cookie auth gate
supabase/
  migrations/    # 0001_init.sql
  seed/          # devotionals, upgrades, badges
prototype/       # original HTML mockups (reference only)
```
