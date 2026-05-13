"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Icon } from "./Icon";

const TABS = [
  { href: "/journey", label: "Home", icon: "home" },
  { href: "/leaderboard", label: "Hall of Faith", icon: "leaderboard" },
  { href: "/armory", label: "Armory", icon: "military_tech" },
] as const;

export default function BottomNav() {
  const pathname = usePathname() ?? "";
  return (
    <nav className="fixed bottom-0 left-0 w-full z-50 flex justify-around items-center px-4 pt-3 pb-safe bg-surface-container border-t-2 border-surface-variant shadow-lg rounded-t-xl">
      {TABS.map((t) => {
        const active = pathname.startsWith(t.href);
        return (
          <Link
            key={t.href}
            href={t.href}
            className={
              active
                ? "flex flex-col items-center justify-center bg-primary-container text-on-primary-container rounded-xl px-6 py-2 shadow-[0_4px_0_0_#872100] translate-y-1 transition-all duration-75"
                : "flex flex-col items-center justify-center text-on-surface-variant px-6 py-2 hover:bg-surface-bright transition-all"
            }
          >
            <Icon name={t.icon} fill={active} />
            <span className="font-label-bold text-label-sm">{t.label}</span>
          </Link>
        );
      })}
    </nav>
  );
}
