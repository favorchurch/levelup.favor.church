import { redirect } from "next/navigation";
import TopBar from "@/components/TopBar";
import BottomNav from "@/components/BottomNav";
import LeaderboardList from "@/components/LeaderboardList";
import { getUserId } from "@/lib/session";
import { getLeaderboard, getUser } from "@/lib/content";

export const dynamic = "force-dynamic";

export default async function LeaderboardPage() {
  const uid = await getUserId();
  if (!uid) redirect("/onboarding");
  const [user, rows] = await Promise.all([getUser(uid), getLeaderboard(100)]);
  if (!user) redirect("/onboarding");

  return (
    <>
      <TopBar streak={user.streak} xp={user.xp} />
      <main className="px-margin-mobile pb-32 pt-24 max-w-2xl mx-auto">
        <section className="mb-lg">
          <h2 className="text-headline-lg font-headline-lg mb-2">Hall of Faith</h2>
          <p className="text-on-surface-variant font-body-md">
            Push your limits. Claim your throne.
          </p>
        </section>
        <LeaderboardList rows={rows} currentUserId={uid} />
      </main>
      <BottomNav />
    </>
  );
}
