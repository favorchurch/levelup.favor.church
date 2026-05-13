import { redirect, notFound } from "next/navigation";
import Link from "next/link";
import TopBar from "@/components/TopBar";
import BottomNav from "@/components/BottomNav";
import VerseCard from "@/components/VerseCard";
import ReflectionCard from "@/components/ReflectionCard";
import ChallengeCard from "@/components/ChallengeCard";
import CompleteButton from "@/components/CompleteButton";
import { Icon } from "@/components/Icon";
import { getUserId } from "@/lib/session";
import { getCompletion, getDevotional, getUser } from "@/lib/content";
import { currentDay } from "@/lib/day";

export const dynamic = "force-dynamic";

export default async function DayPage({
  params,
}: {
  params: Promise<{ day: string }>;
}) {
  const uid = await getUserId();
  if (!uid) redirect("/onboarding");

  const { day: dayStr } = await params;
  const day = parseInt(dayStr, 10);
  if (Number.isNaN(day) || day < 1 || day > 21) notFound();

  const today = currentDay();
  if (day > today) redirect("/journey");

  const [user, devotional, completion] = await Promise.all([
    getUser(uid),
    getDevotional(day),
    getCompletion(uid, day),
  ]);
  if (!user || !devotional) notFound();

  const weekTheme =
    devotional.week === 1
      ? "Abide In Christ"
      : devotional.week === 2
      ? "Renewed & Equipped"
      : "Battle & Mission";
  const dayInWeek = devotional.week === 3 ? day - 14 : devotional.week === 2 ? day - 7 : day;
  const dayCount = devotional.week === 3 ? 7 : devotional.week === 2 ? 7 : 7;
  const pct = Math.round((dayInWeek / dayCount) * 100);

  return (
    <>
      <TopBar streak={user.streak} xp={user.xp} />
      <main className="pt-24 pb-40 px-margin-mobile max-w-2xl mx-auto">
        <div className="flex justify-between items-center mb-md">
          {day > 1 ? (
            <Link
              href={`/day/${day - 1}`}
              className="flex items-center gap-1 text-on-surface-variant hover:text-primary text-label-bold font-label-bold"
            >
              <Icon name="arrow_back" /> Prev
            </Link>
          ) : (
            <span />
          )}
          <Link
            href="/journey"
            className="text-on-surface-variant hover:text-primary text-label-bold font-label-bold"
          >
            Journey
          </Link>
          {day < 21 && day < today ? (
            <Link
              href={`/day/${day + 1}`}
              className="flex items-center gap-1 text-on-surface-variant hover:text-primary text-label-bold font-label-bold"
            >
              Next <Icon name="arrow_forward" />
            </Link>
          ) : (
            <span />
          )}
        </div>

        <section className="mb-lg">
          <div className="relative w-full aspect-video rounded-xl overflow-hidden mb-md bg-gradient-to-br from-primary-container/60 via-surface-container to-background">
            <div className="absolute inset-0 bg-gradient-to-t from-background to-transparent" />
            <div className="absolute bottom-4 left-4">
              <p className="font-label-bold text-label-sm text-primary uppercase tracking-widest mb-1">
                Week {String(devotional.week).padStart(2, "0")}
              </p>
              <h1 className="font-headline-lg text-headline-lg-mobile text-on-surface uppercase">
                {weekTheme}
              </h1>
            </div>
          </div>
          <div className="flex items-center gap-2 mb-md">
            <div className="h-3 flex-1 bg-surface-container-highest rounded-full overflow-hidden">
              <div
                className="h-full bg-primary-container rounded-r-full"
                style={{ width: `${pct}%` }}
              />
            </div>
            <span className="font-label-bold text-label-sm text-on-surface-variant whitespace-nowrap">
              DAY {dayInWeek} / {dayCount}
            </span>
          </div>
        </section>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-md mb-lg">
          <VerseCard reference={devotional.scripture_ref} text={devotional.scripture_text} />
          <ReflectionCard
            day={day}
            prompt={devotional.reflection_prompt}
            initialText={completion?.reflection ?? ""}
          />
          <ChallengeCard text={devotional.challenge} />
        </div>

        <CompleteButton day={day} alreadyCompleted={Boolean(completion)} />
      </main>
      <BottomNav />
    </>
  );
}
