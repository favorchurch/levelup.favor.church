import Link from "next/link";
import { Icon } from "./Icon";
import { isMilestone } from "@/lib/day";
import type { Devotional } from "@/lib/types";

type State = "completed" | "current" | "locked";

export default function DayNode({
  devotional,
  state,
}: {
  devotional: Pick<Devotional, "day" | "theme" | "scripture_ref">;
  state: State;
}) {
  const { day } = devotional;
  const milestone = isMilestone(day);
  const title =
    day === 21 ? "The Summit" : milestone ? "Mystery Chest Unlocked" : devotional.scripture_ref;

  if (state === "completed") {
    return (
      <Link
        href={`/day/${day}`}
        className="bg-surface-container-low p-4 rounded-xl flex items-center gap-4 opacity-80 border-l-4 border-primary hover:opacity-100 transition-opacity"
      >
        <div className="w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center text-primary">
          <Icon name="check" className="font-bold" />
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2">
            <span className="text-label-sm font-bold text-primary uppercase">Day {day}</span>
            <span className="text-label-sm px-2 py-0.5 bg-surface-container-highest rounded text-on-surface-variant">
              Completed
            </span>
          </div>
          <p className="text-body-md font-bold truncate">{devotional.theme}</p>
        </div>
      </Link>
    );
  }

  if (state === "current") {
    return (
      <Link
        href={`/day/${day}`}
        className="bg-surface-container p-4 rounded-xl flex items-center gap-4 border-l-4 border-primary-container pulse-glow"
      >
        <div className="w-12 h-12 rounded-full bg-primary-container flex items-center justify-center text-white">
          <Icon name="play_arrow" fill />
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2">
            <span className="text-label-sm font-bold text-primary-container uppercase">Day {day}</span>
            <span className="text-label-sm px-2 py-0.5 bg-primary-container text-white rounded font-bold">
              Current
            </span>
          </div>
          <p className="text-body-md font-bold truncate">{title}</p>
        </div>
      </Link>
    );
  }

  // locked
  return (
    <div className="bg-surface-container-low p-4 rounded-xl flex items-center gap-4 opacity-40">
      <div className="w-12 h-12 rounded-full bg-surface-container-highest flex items-center justify-center text-on-surface-variant">
        <Icon name={milestone ? "card_giftcard" : "lock"} />
      </div>
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2">
          <span className="text-label-sm font-bold uppercase">Day {day}</span>
          {milestone && (
            <span className="text-label-sm text-tertiary">Chest</span>
          )}
        </div>
        <p className="text-body-md font-bold truncate">{title}</p>
      </div>
    </div>
  );
}
