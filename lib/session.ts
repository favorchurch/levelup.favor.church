import "server-only";
import { cookies } from "next/headers";

const COOKIE = "lu_uid";
const MAX_AGE = 60 * 60 * 24 * 90; // 90 days

export async function getUserId(): Promise<string | null> {
  const c = await cookies();
  return c.get(COOKIE)?.value ?? null;
}

export async function setUserId(id: string) {
  const c = await cookies();
  c.set(COOKIE, id, {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: MAX_AGE,
  });
}

export async function clearUserId() {
  const c = await cookies();
  c.delete(COOKIE);
}
