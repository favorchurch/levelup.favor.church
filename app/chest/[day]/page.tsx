import { redirect, notFound } from "next/navigation";
import TopBar from "@/components/TopBar";
import BottomNav from "@/components/BottomNav";
import MysteryChest from "@/components/MysteryChest";
import { getUserId } from "@/lib/session";
import { getUser } from "@/lib/content";
import { supabase } from "@/lib/supabase";
import { isMilestone, currentDay } from "@/lib/day";

export const dynamic = "force-dynamic";

export default async function ChestPage({
  params,
}: {
  params: Promise<{ day: string }>;
}) {
  const uid = await getUserId();
  if (!uid) redirect("/onboarding");

  const { day: dayStr } = await params;
  const day = parseInt(dayStr, 10);
  if (Number.isNaN(day) || !isMilestone(day)) notFound();
  if (day > currentDay()) redirect("/journey");

  const user = await getUser(uid);
  if (!user) redirect("/onboarding");

  const { data: chest } = await supabase()
    .from("chests")
    .select("*")
    .eq("user_id", uid)
    .eq("day", day)
    .maybeSingle();

  const existing = chest
    ? ({ kind: chest.reward_kind, ...(chest.reward_value as object) } as
        | { kind: "bonus_xp"; amount: number }
        | { kind: "badge"; id: string; name: string; icon: string }
        | { kind: "token"; amount: number })
    : null;

  return (
    <>
      <TopBar streak={user.streak} xp={user.xp} />
      <MysteryChest day={day} existing={existing} />
      <BottomNav />
    </>
  );
}
