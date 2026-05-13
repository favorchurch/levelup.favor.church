-- Level Up: initial schema
-- All writes go through the Vercel server using the service role.
-- RLS is enabled with no anon policies (defense in depth).

create extension if not exists "pgcrypto";

create table if not exists users (
  id          uuid primary key default gen_random_uuid(),
  full_name   text not null,
  email       text not null unique,
  xp          int  not null default 0,
  streak      int  not null default 0,
  last_active date,
  created_at  timestamptz not null default now()
);

create table if not exists devotionals (
  day              int  primary key check (day between 1 and 21),
  week             int  not null,
  theme            text not null,
  chapter          text not null,
  scripture_ref    text not null,
  scripture_text   text not null,
  reflection_prompt text not null,
  challenge        text not null
);

create table if not exists day_completions (
  user_id      uuid not null references users(id) on delete cascade,
  day          int  not null references devotionals(day),
  reflection   text,
  completed    boolean not null default false,
  completed_at timestamptz,
  updated_at   timestamptz not null default now(),
  primary key (user_id, day)
);

create index if not exists day_completions_user_idx on day_completions(user_id);

create table if not exists upgrades_catalog (
  id        text primary key,
  category  text not null check (category in ('weapon','armor','companion','face','base_avatar')),
  name      text not null,
  icon      text not null,
  min_day   int  not null
);

create table if not exists user_upgrades (
  user_id    uuid not null references users(id) on delete cascade,
  day        int  not null references devotionals(day),
  upgrade_id text not null references upgrades_catalog(id),
  chosen_at  timestamptz not null default now(),
  primary key (user_id, day)
);

create index if not exists user_upgrades_user_idx on user_upgrades(user_id);

create table if not exists chests (
  user_id      uuid not null references users(id) on delete cascade,
  day          int  not null references devotionals(day),
  reward_kind  text not null,
  reward_value jsonb not null,
  opened_at    timestamptz not null default now(),
  primary key (user_id, day)
);

create table if not exists badges (
  id       text primary key,
  name     text not null,
  icon     text not null,
  rarity   text not null default 'rare'
);

create table if not exists user_badges (
  user_id    uuid not null references users(id) on delete cascade,
  badge_id   text not null references badges(id),
  awarded_at timestamptz not null default now(),
  primary key (user_id, badge_id)
);

-- Leaderboard view: first name + last initial
create or replace view leaderboard_v as
select
  u.id,
  trim(split_part(u.full_name,' ',1)) ||
    case
      when split_part(u.full_name,' ',2) <> ''
        then ' ' || left(split_part(u.full_name,' ',2),1) || '.'
      else ''
    end as display_name,
  u.xp,
  u.streak
from users u
order by u.xp desc, u.streak desc;

-- Lock everything down at the table level. The service-role key bypasses RLS,
-- so all server-side queries continue to work; nothing reachable via anon/auth.
alter table users           enable row level security;
alter table devotionals     enable row level security;
alter table day_completions enable row level security;
alter table upgrades_catalog enable row level security;
alter table user_upgrades   enable row level security;
alter table chests          enable row level security;
alter table badges          enable row level security;
alter table user_badges     enable row level security;
