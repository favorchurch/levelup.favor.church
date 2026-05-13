export const XP_REFLECTION = 100;
export const XP_CHALLENGE = 50;
export const XP_MINIGAME_DAILY_CAP = 50;

// Per-level XP requirement (level 1 needs 0 to start; level N requires LEVEL_STEP*(N-1) total).
export const LEVEL_STEP = 250;

export function levelFromXp(xp: number): number {
  return Math.max(1, Math.floor(xp / LEVEL_STEP) + 1);
}

export function xpIntoLevel(xp: number): number {
  return xp % LEVEL_STEP;
}

export function xpToNextLevel(xp: number): number {
  return LEVEL_STEP - xpIntoLevel(xp);
}

export function levelProgressPct(xp: number): number {
  return Math.round((xpIntoLevel(xp) / LEVEL_STEP) * 100);
}

/**
 * Decide the new streak given the user's prior last_active date (UTC ISO date or null).
 * - First completion ever → streak = 1.
 * - Same day re-completion → unchanged.
 * - Consecutive day → +1.
 * - Otherwise → reset to 1.
 */
export function nextStreak(
  prior: { streak: number; last_active: string | null },
  today: Date = new Date()
): number {
  const todayUtc = Date.UTC(today.getUTCFullYear(), today.getUTCMonth(), today.getUTCDate());
  if (!prior.last_active) return 1;
  const [y, m, d] = prior.last_active.split("-").map((n) => parseInt(n, 10));
  const last = Date.UTC(y, (m ?? 1) - 1, d ?? 1);
  const diffDays = Math.round((todayUtc - last) / 86_400_000);
  if (diffDays === 0) return prior.streak || 1;
  if (diffDays === 1) return (prior.streak || 0) + 1;
  return 1;
}

export function todayUtcIsoDate(now: Date = new Date()): string {
  const y = now.getUTCFullYear();
  const m = String(now.getUTCMonth() + 1).padStart(2, "0");
  const d = String(now.getUTCDate()).padStart(2, "0");
  return `${y}-${m}-${d}`;
}
