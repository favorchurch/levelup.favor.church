"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import confetti from "canvas-confetti";
import { Icon } from "./Icon";
import UpgradePicker from "./UpgradePicker";
import type { Upgrade } from "@/lib/types";

export default function CompleteButton({
  day,
  alreadyCompleted,
}: {
  day: number;
  alreadyCompleted: boolean;
}) {
  const router = useRouter();
  const [busy, setBusy] = useState(false);
  const [upgrades, setUpgrades] = useState<Upgrade[] | null>(null);
  const [isMilestone, setIsMilestone] = useState(false);

  async function onComplete() {
    if (busy) return;
    setBusy(true);
    try {
      const res = await fetch("/api/complete-day", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ day }),
      });
      const data = (await res.json()) as {
        upgrades?: Upgrade[];
        milestone?: boolean;
      };
      confetti({ particleCount: 120, spread: 80, origin: { y: 0.7 } });
      setIsMilestone(Boolean(data.milestone));
      if (data.upgrades && data.upgrades.length > 0) {
        setUpgrades(data.upgrades);
      } else {
        finish(Boolean(data.milestone));
      }
    } finally {
      setBusy(false);
    }
  }

  function finish(milestone: boolean) {
    if (milestone) {
      router.push(`/chest/${day}`);
    } else {
      router.push("/journey");
      router.refresh();
    }
  }

  return (
    <>
      <div className="fixed bottom-24 left-0 w-full px-margin-mobile z-40 max-w-2xl mx-auto right-0">
        <button
          onClick={onComplete}
          disabled={busy}
          className="w-full bg-primary-container text-on-primary-container py-5 rounded-xl font-headline-lg text-title-md uppercase tracking-widest tactile-primary flex items-center justify-center gap-4 disabled:opacity-70"
        >
          <Icon name="check_circle" className="font-bold" />
          {alreadyCompleted ? "COMPLETED" : busy ? "SAVING…" : "COMPLETE DAY"}
        </button>
      </div>
      {upgrades && (
        <UpgradePicker
          day={day}
          options={upgrades}
          onDone={() => {
            setUpgrades(null);
            finish(isMilestone);
          }}
        />
      )}
    </>
  );
}
