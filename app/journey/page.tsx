import { redirect } from "next/navigation";
import TopBar from "@/components/TopBar";
import BottomNav from "@/components/BottomNav";
import DayNode from "@/components/DayNode";
import { Icon } from "@/components/Icon";
import { getUserId } from "@/lib/session";
import { getAllDevotionals, getCompletions, getUser } from "@/lib/content";
import { currentDay } from "@/lib/day";

export const dynamic = "force-dynamic";

export default async function JourneyPage() {
  const uid = await getUserId();
  if (!uid) redirect("/onboarding");

  const [user, devotionals, completions] = await Promise.all([
    getUser(uid),
    getAllDevotionals(),
    getCompletions(uid),
  ]);
  if (!user) redirect("/onboarding");

  const completedSet = new Set(completions.map((c) => c.day));
  const today = currentDay();
  const completedCount = completedSet.size;
  const progress = Math.round((completedCount / 21) * 100);

  return (
    <>
      <TopBar streak={user.streak} xp={user.xp} />
      <main className="relative px-margin-mobile pt-24 pb-32 max-w-md mx-auto">
        <section className="mb-6 mt-4 bg-surface-container rounded-xl p-md border-b-4 border-surface-variant relative overflow-hidden">
          <div className="relative z-10">
            <p className="text-label-sm font-label-sm uppercase tracking-widest text-primary mb-1">
              Current Quest
            </p>
            <h2 className="text-headline-lg font-headline-lg mb-4 leading-none">
              THE 21 DAY CHALLENGE
            </h2>
            <div className="space-y-2">
              <div className="flex justify-between text-label-bold font-label-bold mb-1">
                <span>Progress</span>
                <span>{progress}%</span>
              </div>
              <div className="h-3 w-full bg-surface-container-highest rounded-full overflow-hidden">
                <div
                  className="h-full bg-primary-container rounded-full transition-all duration-500"
                  style={{ width: `${progress}%` }}
                />
              </div>
            </div>
          </div>
          <div className="absolute -right-8 -top-8 opacity-10">
            <Icon name="auto_awesome" className="text-[120px]" />
          </div>
        </section>

        <div className="space-y-3 mb-8">
          {devotionals.map((d) => {
            const completed = completedSet.has(d.day);
            const state = completed
              ? "completed"
              : d.day <= today
              ? "current"
              : "locked";
            return <DayNode key={d.day} devotional={d} state={state} />;
          })}
        </div>
      </main>
      <BottomNav />
    </>
  );
}
