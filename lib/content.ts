import "server-only";
import { supabase } from "./supabase";
import type {
  Devotional,
  DayCompletion,
  Upgrade,
  UserUpgrade,
  User,
  LeaderboardRow,
} from "./types";

export async function getDevotional(day: number): Promise<Devotional | null> {
  const { data, error } = await supabase()
    .from("devotionals")
    .select("*")
    .eq("day", day)
    .maybeSingle();
  if (error) throw error;
  return data as Devotional | null;
}

export async function getAllDevotionals(): Promise<Devotional[]> {
  const { data, error } = await supabase()
    .from("devotionals")
    .select("*")
    .order("day", { ascending: true });
  if (error) throw error;
  return (data ?? []) as Devotional[];
}

export async function getUser(id: string): Promise<User | null> {
  const { data, error } = await supabase()
    .from("users")
    .select("*")
    .eq("id", id)
    .maybeSingle();
  if (error) throw error;
  return data as User | null;
}

export async function getCompletions(userId: string): Promise<DayCompletion[]> {
  const { data, error } = await supabase()
    .from("day_completions")
    .select("*")
    .eq("user_id", userId)
    .eq("completed", true);
  if (error) throw error;
  return (data ?? []) as DayCompletion[];
}

export async function getCompletion(
  userId: string,
  day: number
): Promise<DayCompletion | null> {
  const { data, error } = await supabase()
    .from("day_completions")
    .select("*")
    .eq("user_id", userId)
    .eq("day", day)
    .maybeSingle();
  if (error) throw error;
  return data as DayCompletion | null;
}

export async function getUserUpgrades(userId: string): Promise<
  (UserUpgrade & { upgrade: Upgrade })[]
> {
  const { data, error } = await supabase()
    .from("user_upgrades")
    .select("*, upgrade:upgrades_catalog(*)")
    .eq("user_id", userId);
  if (error) throw error;
  return (data ?? []) as (UserUpgrade & { upgrade: Upgrade })[];
}

export async function getEligibleUpgrades(
  userId: string,
  day: number
): Promise<Upgrade[]> {
  const sb = supabase();
  const { data: taken, error: tErr } = await sb
    .from("user_upgrades")
    .select("upgrade_id")
    .eq("user_id", userId);
  if (tErr) throw tErr;
  const takenIds = (taken ?? []).map((r) => r.upgrade_id as string);
  let q = sb.from("upgrades_catalog").select("*").lte("min_day", day);
  if (takenIds.length > 0) q = q.not("id", "in", `(${takenIds.join(",")})`);
  const { data, error } = await q;
  if (error) throw error;
  const pool = (data ?? []) as Upgrade[];
  // Shuffle and return up to 3.
  return shuffle(pool).slice(0, 3);
}

function shuffle<T>(arr: T[]): T[] {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

export async function getLeaderboard(limit = 100): Promise<LeaderboardRow[]> {
  const { data, error } = await supabase()
    .from("leaderboard_v")
    .select("*")
    .limit(limit);
  if (error) throw error;
  return (data ?? []) as LeaderboardRow[];
}
