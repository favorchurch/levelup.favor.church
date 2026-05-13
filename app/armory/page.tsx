import { redirect } from "next/navigation";
import TopBar from "@/components/TopBar";
import BottomNav from "@/components/BottomNav";
import ArmoryGrid from "@/components/ArmoryGrid";
import { Icon } from "@/components/Icon";
import { getUserId } from "@/lib/session";
import { getUser, getUserUpgrades } from "@/lib/content";
import { levelFromXp, levelProgressPct, xpToNextLevel } from "@/lib/xp";

export const dynamic = "force-dynamic";

export default async function ArmoryPage() {
  const uid = await getUserId();
  if (!uid) redirect("/onboarding");

  const [user, items] = await Promise.all([getUser(uid), getUserUpgrades(uid)]);
  if (!user) redirect("/onboarding");

  const level = levelFromXp(user.xp);
  const pct = levelProgressPct(user.xp);
  const toNext = xpToNextLevel(user.xp);

  return (
    <>
      <TopBar streak={user.streak} xp={user.xp} />
      <main className="px-margin-mobile pt-24 pb-32 max-w-2xl mx-auto flex flex-col gap-lg">
        <section className="relative">
          <div className="flex justify-between items-end mb-xs">
            <h2 className="font-headline-lg text-headline-lg-mobile">Avatar Armory</h2>
            <span className="font-label-bold text-label-bold text-tertiary-container uppercase tracking-widest">
              Level {level}
            </span>
          </div>
          <div className="relative w-full aspect-[4/5] bg-surface-container rounded-xl overflow-hidden border-2 border-surface-variant flex items-center justify-center">
            <div className="absolute inset-0 bg-gradient-to-tr from-primary-container/30 via-transparent to-tertiary-container/20" />
            <Icon name="person" className="text-primary-container text-[200px]" fill />
            <div className="absolute bottom-0 left-0 w-full p-md bg-gradient-to-t from-black/80 to-transparent">
              <div className="flex justify-between items-center mb-2">
                <span className="font-label-bold text-label-sm text-on-surface-variant">
                  XP PROGRESS
                </span>
                <span className="font-label-bold text-label-sm text-primary">{pct}%</span>
              </div>
              <div className="w-full h-3 bg-surface-container-highest rounded-full overflow-hidden">
                <div
                  className="h-full bg-primary-container rounded-r-full"
                  style={{ width: `${pct}%` }}
                />
              </div>
              <p className="text-label-sm font-label-sm text-on-surface-variant mt-xs">
                {toNext} XP to next level
              </p>
            </div>
          </div>
        </section>

        <ArmoryGrid items={items} />
      </main>
      <BottomNav />
    </>
  );
}
