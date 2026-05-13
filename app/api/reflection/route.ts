import { NextResponse } from "next/server";
import { getUserId } from "@/lib/session";
import { supabase } from "@/lib/supabase";
import { currentDay } from "@/lib/day";

export async function PATCH(req: Request) {
  const uid = await getUserId();
  if (!uid) return NextResponse.json({ error: "unauthorized" }, { status: 401 });

  let body: { day?: number; text?: string };
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "bad json" }, { status: 400 });
  }
  const day = Number(body.day);
  if (!Number.isInteger(day) || day < 1 || day > 21) {
    return NextResponse.json({ error: "bad day" }, { status: 400 });
  }
  if (day > currentDay()) {
    return NextResponse.json({ error: "day locked" }, { status: 403 });
  }
  const text = typeof body.text === "string" ? body.text.slice(0, 5000) : "";

  // Upsert with reflection only; completed_at preserved via on-conflict do-nothing for that col.
  const sb = supabase();
  const { error } = await sb
    .from("day_completions")
    .upsert(
      { user_id: uid, day, reflection: text },
      { onConflict: "user_id,day", ignoreDuplicates: false }
    );
  if (error) return NextResponse.json({ error: error.message }, { status: 500 });

  return NextResponse.json({ ok: true });
}
