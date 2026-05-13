"use client";

import { useState } from "react";
import { Icon } from "./Icon";
import Minigame from "./Minigame";

export default function TopBar({
  streak,
  xp,
}: {
  streak: number;
  xp: number;
}) {
  const [openGame, setOpenGame] = useState(false);

  return (
    <header className="fixed top-0 left-0 w-full h-16 flex justify-between items-center px-margin-mobile bg-surface-container-low z-50 border-b border-surface-variant/40">
      <button
        onClick={() => setOpenGame(true)}
        className="flex items-center gap-2 group"
        aria-label="Open bolt mini-game"
      >
        <Icon name="bolt" className="text-primary-container group-hover:scale-110 transition-transform" fill />
        <span className="font-display-lg text-title-md tracking-tighter text-primary-container italic">
          LEVEL UP
        </span>
      </button>
      <div className="bg-surface-variant px-3 py-1 rounded-full flex items-center gap-2">
        <span className="font-label-bold text-label-bold text-primary">
          {streak} 🔥 {xp} XP
        </span>
      </div>
      {openGame && <Minigame onClose={() => setOpenGame(false)} />}
    </header>
  );
}
