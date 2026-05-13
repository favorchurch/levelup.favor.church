export type User = {
  id: string;
  full_name: string;
  email: string;
  xp: number;
  streak: number;
  last_active: string | null;
  created_at: string;
};

export type Devotional = {
  day: number;
  week: number;
  theme: string;
  chapter: string;
  scripture_ref: string;
  scripture_text: string;
  reflection_prompt: string;
  challenge: string;
};

export type DayCompletion = {
  user_id: string;
  day: number;
  reflection: string | null;
  completed: boolean;
  completed_at: string | null;
  updated_at: string;
};

export type Upgrade = {
  id: string;
  category: "weapon" | "armor" | "companion" | "face" | "base_avatar";
  name: string;
  icon: string;
  min_day: number;
};

export type UserUpgrade = {
  user_id: string;
  day: number;
  upgrade_id: string;
  chosen_at: string;
};

export type ChestReward = {
  user_id: string;
  day: number;
  reward_kind: "bonus_xp" | "badge" | "token";
  reward_value: Record<string, unknown>;
  opened_at: string;
};

export type Badge = {
  id: string;
  name: string;
  icon: string;
  rarity: string;
};

export type LeaderboardRow = {
  id: string;
  display_name: string;
  xp: number;
  streak: number;
};
