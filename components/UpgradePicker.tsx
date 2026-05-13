"use client";

import { useState } from "react";
import { Icon } from "./Icon";
import type { Upgrade } from "@/lib/types";

export default function UpgradePicker({
  day,
  options,
  onDone,
}: {
  day: number;
  options: Upgrade[];
  onDone: () => void;
}) {
  const [busy, setBusy] = useState<string | null>(null);

  async function choose(id: string) {
    if (busy) return;
    setBusy(id);
    await fetch("/api/complete-day?step=upgrade", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({ day, upgrade_id: id }),
    });
    onDone();
  }

  return (
    <div className="fixed inset-0 z-[90] bg-black/80 backdrop-blur-sm flex items-end md:items-center justify-center p-md">
      <div className="w-full max-w-md bg-surface-container rounded-2xl border-2 border-primary-container/30 p-md">
        <h2 className="font-headline-lg text-title-md text-primary uppercase tracking-tight mb-xs">
          Choose Your Upgrade
        </h2>
        <p className="text-body-md text-on-surface-variant mb-md">
          One pick per day. This becomes part of your armory.
        </p>
        <div className="grid grid-cols-1 gap-sm">
          {options.map((u) => (
            <button
              key={u.id}
              onClick={() => choose(u.id)}
              disabled={Boolean(busy)}
              className="bg-surface-container-high p-md rounded-xl border-l-4 border-primary-container flex items-center gap-md text-left hover:bg-surface-bright transition-colors disabled:opacity-60"
            >
              <div className="w-14 h-14 bg-surface-container-highest rounded-lg flex items-center justify-center">
                <Icon name={u.icon} className="text-primary-container text-3xl" fill />
              </div>
              <div className="flex-1 min-w-0">
                <p className="font-label-bold text-label-bold text-on-surface">{u.name}</p>
                <p className="text-label-sm text-on-surface-variant uppercase tracking-wide">
                  {u.category.replace("_", " ")}
                </p>
              </div>
              <Icon
                name={busy === u.id ? "hourglass_top" : "arrow_forward"}
                className="text-primary-container"
              />
            </button>
          ))}
        </div>
        <p className="text-label-sm text-on-surface-variant text-center mt-md">
          Day {day} reward.
        </p>
      </div>
    </div>
  );
}
