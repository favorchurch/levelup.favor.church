import { Icon } from "./Icon";
import type { LeaderboardRow } from "@/lib/types";

export default function LeaderboardList({
  rows,
  currentUserId,
}: {
  rows: LeaderboardRow[];
  currentUserId: string | null;
}) {
  if (rows.length === 0) {
    return (
      <div className="bg-surface-container rounded-xl p-lg text-center border border-surface-variant">
        <p className="text-body-md text-on-surface-variant">Be the first to log XP.</p>
      </div>
    );
  }

  const top3 = rows.slice(0, 3);
  const rest = rows.slice(3);
  const order = [top3[1], top3[0], top3[2]].filter(Boolean) as LeaderboardRow[];
  const podiumHeights = top3[0] ? [96, 128, 80] : []; // 2nd, 1st, 3rd
  const podiumBorders = ["border-slate-400", "border-primary", "border-amber-700"];
  const rankLabels = ["2ND", "1ST", "3RD"];
  const myIndex = currentUserId ? rows.findIndex((r) => r.id === currentUserId) : -1;

  return (
    <>
      {top3.length > 0 && (
        <div className="flex items-end justify-center gap-4 mb-xl mt-8 pt-8">
          {order.map((row, idx) => {
            const isFirst = idx === 1;
            return (
              <div key={row.id} className={`flex flex-col items-center flex-1 ${isFirst ? "-mt-8" : ""}`}>
                <div className="relative mb-2">
                  {isFirst && (
                    <div className="absolute -top-6 left-1/2 -translate-x-1/2">
                      <Icon name="military_tech" className="text-primary text-4xl" fill />
                    </div>
                  )}
                  <div
                    className={`${isFirst ? "w-20 h-20 glow-orange" : "w-16 h-16"} rounded-full border-4 ${podiumBorders[idx]} bg-surface-container flex items-center justify-center`}
                  >
                    <span className="font-headline-lg text-title-md text-on-surface uppercase">
                      {initials(row.display_name)}
                    </span>
                  </div>
                  <div
                    className={`absolute -bottom-2 left-1/2 -translate-x-1/2 ${isFirst ? "bg-primary" : idx === 0 ? "bg-slate-400" : "bg-amber-700"} text-on-primary-fixed text-[10px] font-bold px-2 py-0.5 rounded-full`}
                  >
                    {rankLabels[idx]}
                  </div>
                </div>
                <p className="font-label-bold text-label-bold text-center">{row.display_name}</p>
                <div
                  className="w-full rounded-t-xl mt-2 flex flex-col items-center pt-3"
                  style={{
                    height: podiumHeights[idx],
                    background:
                      idx === 1
                        ? "rgba(255,181,160,0.18)"
                        : idx === 0
                        ? "rgba(148,163,184,0.18)"
                        : "rgba(180,83,9,0.18)",
                  }}
                >
                  <span className={`text-primary font-label-bold ${isFirst ? "text-title-md" : ""}`}>
                    {row.xp} XP
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      )}

      <div className="space-y-sm">
        {rest.map((row, idx) => {
          const rank = idx + 4;
          const mine = row.id === currentUserId;
          if (mine) {
            return (
              <div
                key={row.id}
                className="bg-primary-container p-4 rounded-xl flex items-center gap-4 glow-orange tactile-button"
              >
                <span className="text-on-primary-container font-headline-lg text-title-md w-8 text-center">
                  {rank}
                </span>
                <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center font-bold text-white">
                  YOU
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-label-bold text-white truncate">{row.display_name}</p>
                </div>
                <div className="flex items-center gap-1 bg-on-primary-container/20 px-2 py-1 rounded-lg">
                  <Icon name="bolt" className="text-white text-sm" fill />
                  <span className="font-label-bold text-white">{row.xp}</span>
                </div>
              </div>
            );
          }
          return (
            <div
              key={row.id}
              className="bg-surface-container p-4 rounded-xl flex items-center gap-4 border border-white/5"
            >
              <span className="text-on-surface-variant font-headline-lg text-title-md w-8 text-center">
                {rank}
              </span>
              <div className="w-10 h-10 rounded-full bg-surface-container-high flex items-center justify-center font-bold text-on-surface-variant">
                {initials(row.display_name)}
              </div>
              <div className="flex-1 min-w-0">
                <p className="font-label-bold text-on-surface truncate">{row.display_name}</p>
              </div>
              <div className="flex items-center gap-1 text-on-surface-variant">
                <Icon name="bolt" className="text-sm" />
                <span className="font-label-bold">{row.xp}</span>
              </div>
            </div>
          );
        })}
      </div>

      {myIndex >= 3 && (
        <div className="mt-lg bg-surface-container p-lg rounded-2xl border-l-4 border-primary">
          <h3 className="text-title-md font-headline-lg mb-sm">Keep climbing.</h3>
          <p className="text-body-md text-on-surface-variant leading-tight">
            You’re ranked <span className="text-primary font-bold">#{myIndex + 1}</span>. Complete
            today’s verse to climb the leaderboard.
          </p>
        </div>
      )}
    </>
  );
}

function initials(name: string): string {
  return name
    .split(" ")
    .map((p) => p[0])
    .filter(Boolean)
    .slice(0, 2)
    .join("")
    .toUpperCase();
}
