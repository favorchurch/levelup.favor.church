"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import confetti from "canvas-confetti";
import { Icon } from "./Icon";

type Reward =
  | { kind: "bonus_xp"; amount: number }
  | { kind: "badge"; id: string; name: string; icon: string }
  | { kind: "token"; amount: number };

export default function MysteryChest({
  day,
  existing,
}: {
  day: number;
  existing: Reward | null;
}) {
  const router = useRouter();
  const [reward, setReward] = useState<Reward | null>(existing);
  const [busy, setBusy] = useState(false);

  async function open() {
    if (busy || reward) return;
    setBusy(true);
    const res = await fetch("/api/chest", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({ day }),
    });
    const data = (await res.json()) as { reward: Reward };
    confetti({ particleCount: 200, spread: 100, origin: { y: 0.6 } });
    setReward(data.reward);
    setBusy(false);
  }

  return (
    <main className="flex-1 flex flex-col items-center justify-center pt-24 pb-32 px-margin-mobile bg-celebration relative min-h-screen">
      <button
        onClick={() => router.push("/journey")}
        className="absolute top-20 left-margin-mobile flex items-center gap-2 text-on-surface-variant font-label-bold hover:text-primary transition-colors"
      >
        <Icon name="arrow_back" />
        Back to Journey
      </button>

      <div className="relative w-full max-w-md aspect-square flex items-center justify-center mb-lg">
        <div className="absolute inset-0 bg-primary-container/20 rounded-full blur-[100px] animate-pulse" />
        <button
          onClick={open}
          disabled={busy || Boolean(reward)}
          className="relative group cursor-pointer"
          aria-label="Open chest"
        >
          <div className="w-64 h-64 md:w-80 md:h-80 bg-surface-container-high rounded-3xl border-4 border-primary-container flex items-center justify-center glow-primary transition-transform duration-300 group-hover:scale-105 group-active:scale-95 overflow-hidden">
            <Icon
              name={reward ? "redeem" : "card_giftcard"}
              className="text-8xl text-primary-container"
              fill
            />
          </div>
          <div className="absolute -bottom-8 left-1/2 -translate-x-1/2 w-full text-center">
            <p className="font-headline-lg text-headline-lg text-primary-container uppercase tracking-widest italic">
              {reward ? "Reward Unlocked" : busy ? "Opening…" : "Tap to Open"}
            </p>
          </div>
        </button>
      </div>

      {reward && (
        <div className="w-full max-w-sm mt-lg bg-surface-container rounded-2xl border-2 border-primary-container p-md text-center">
          {reward.kind === "bonus_xp" && (
            <>
              <Icon name="keyboard_double_arrow_up" className="text-primary-container text-5xl" fill />
              <p className="font-headline-lg text-headline-lg-mobile mt-sm">+{reward.amount} XP</p>
              <p className="text-on-surface-variant text-body-md">Bonus experience added.</p>
            </>
          )}
          {reward.kind === "badge" && (
            <>
              <Icon name={reward.icon} className="text-primary-container text-5xl" fill />
              <p className="font-headline-lg text-headline-lg-mobile mt-sm">{reward.name}</p>
              <p className="text-on-surface-variant text-body-md">Rare badge unlocked.</p>
            </>
          )}
          {reward.kind === "token" && (
            <>
              <Icon name="generating_tokens" className="text-primary-container text-5xl" fill />
              <p className="font-headline-lg text-headline-lg-mobile mt-sm">{reward.amount} Token{reward.amount === 1 ? "" : "s"}</p>
              <p className="text-on-surface-variant text-body-md">Save these for future drops.</p>
            </>
          )}
          <button
            onClick={() => router.push("/journey")}
            className="w-full mt-md py-4 bg-primary-container text-on-primary-container font-headline-lg text-label-bold rounded-xl tactile-primary uppercase tracking-widest"
          >
            Continue
          </button>
        </div>
      )}

      {!reward && (
        <div className="w-full max-w-xl mt-xl">
          <h2 className="font-headline-lg text-title-md text-on-surface text-center mb-md uppercase tracking-tight">
            Potential Rewards
          </h2>
          <div className="grid grid-cols-3 gap-4">
            {[
              { i: "military_tech", l: "Rare Badge" },
              { i: "keyboard_double_arrow_up", l: "Bonus XP" },
              { i: "generating_tokens", l: "Token" },
            ].map((r) => (
              <div
                key={r.l}
                className="bg-surface-container rounded-xl p-4 flex flex-col items-center border-2 border-surface-variant"
              >
                <div className="w-12 h-12 rounded-full bg-surface-container-highest flex items-center justify-center mb-2">
                  <Icon name={r.i} className="text-primary-container" fill />
                </div>
                <span className="font-label-bold text-label-sm text-center">{r.l}</span>
              </div>
            ))}
          </div>
        </div>
      )}
    </main>
  );
}
