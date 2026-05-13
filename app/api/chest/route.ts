import { NextResponse } from "next/server";
import { getUserId } from "@/lib/session";
import { supabase } from "@/lib/supabase";
import { currentDay, isMilestone } from "@/lib/day";

type Reward =
  | { kind: "bonus_xp"; amount: number }
  | { kind: "badge"; id: string; name: string; icon: string }
  | { kind: "token"; amount: number };

function rollReward(): { kind: "bonus_xp" | "badge" | "token"; amount?: number } {
  const r = Math.random();
  if (r < 0.6) return { kind: "bonus_xp", amount: 50 + Math.floor(Math.random() * 100) };
  if (r < 0.9) return { kind: "badge" };
  return { kind: "token", amount: 1 + Math.floor(Math.random() * 3) };
}

export async function POST(req: Request) {
  const uid = await getUserId();
  if (!uid) return NextResponse.json({ error: "unauthorized" }, { status: 401 });

  let body: { day?: number };
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "bad json" }, { status: 400 });
  }
  const day = Number(body.day);
  if (!Number.isInteger(day) || !isMilestone(day) || day > currentDay()) {
    return NextResponse.json({ error: "bad day" }, { status: 400 });
  }

  const sb = supabase();

  // Idempotent: if already opened, return existing reward.
  const { data: existing } = await sb
    .from("chests")
    .select("*")
    .eq("user_id", uid)
    .eq("day", day)
    .maybeSingle();
  if (existing) {
    const reward = {
      kind: existing.reward_kind,
      ...(existing.reward_value as object),
    } as Reward;
    return NextResponse.json({ reward });
  }

  const roll = rollReward();
  let reward: Reward;
  let reward_value: Record<string, unknown>;

  if (roll.kind === "bonus_xp") {
    const amount = roll.amount ?? 50;
    reward = { kind: "bonus_xp", amount };
    reward_value = { amount };
    // Apply XP immediately.
    const { data: u } = await sb.from("users").select("xp").eq("id", uid).single();
    await sb
      .from("users")
      .update({ xp: (u?.xp ?? 0) + amount })
      .eq("id", uid);
  } else if (roll.kind === "token") {
    const amount = roll.amount ?? 1;
    reward = { kind: "token", amount };
    reward_value = { amount };
  } else {
    // Pick a random badge the user doesn't have yet.
    const { data: badges } = await sb.from("badges").select("*");
    const { data: held } = await sb
      .from("user_badges")
      .select("badge_id")
      .eq("user_id", uid);
    const heldIds = new Set((held ?? []).map((r) => r.badge_id as string));
    const pool = (badges ?? []).filter((b) => !heldIds.has(b.id as string));
    const choice = pool.length > 0
      ? pool[Math.floor(Math.random() * pool.length)]
      : (badges ?? [])[0];
    if (!choice) {
      // Fall back to XP if no badges exist.
      const amount = 75;
      reward = { kind: "bonus_xp", amount };
      reward_value = { amount };
    } else {
      reward = {
        kind: "badge",
        id: choice.id as string,
        name: choice.name as string,
        icon: choice.icon as string,
      };
      reward_value = { id: choice.id, name: choice.name, icon: choice.icon };
      await sb
        .from("user_badges")
        .upsert(
          { user_id: uid, badge_id: choice.id as string },
          { onConflict: "user_id,badge_id", ignoreDuplicates: true }
        );
    }
  }

  await sb.from("chests").upsert(
    {
      user_id: uid,
      day,
      reward_kind: reward.kind,
      reward_value,
    },
    { onConflict: "user_id,day", ignoreDuplicates: true }
  );

  return NextResponse.json({ reward });
}
