const DEFAULT_START = "2026-05-30";

function startDate(): Date {
  const raw = process.env.START_DATE ?? DEFAULT_START;
  const [y, m, d] = raw.split("-").map((n) => parseInt(n, 10));
  return new Date(Date.UTC(y, (m ?? 1) - 1, d ?? 1));
}

export function currentDay(now: Date = new Date()): number {
  const start = startDate();
  const today = Date.UTC(now.getUTCFullYear(), now.getUTCMonth(), now.getUTCDate());
  const diffDays = Math.floor((today - start.getTime()) / 86_400_000) + 1;
  return Math.min(21, Math.max(1, diffDays));
}

export function isUnlocked(day: number, now: Date = new Date()): boolean {
  return day <= currentDay(now);
}

export const MILESTONE_DAYS = [3, 7, 10, 14, 17, 21] as const;
export function isMilestone(day: number) {
  return (MILESTONE_DAYS as readonly number[]).includes(day);
}
