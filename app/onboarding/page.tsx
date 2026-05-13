import { redirect } from "next/navigation";
import { Icon } from "@/components/Icon";
import { supabase } from "@/lib/supabase";
import { getUserId, setUserId } from "@/lib/session";

async function signIn(formData: FormData) {
  "use server";
  const full_name = String(formData.get("full_name") ?? "").trim();
  const email = String(formData.get("email") ?? "").trim().toLowerCase();
  if (!full_name || !email) return;

  const sb = supabase();
  const { data: existing, error: selErr } = await sb
    .from("users")
    .select("id")
    .eq("email", email)
    .maybeSingle();
  if (selErr) throw selErr;

  let id = existing?.id as string | undefined;
  if (!id) {
    const { data, error } = await sb
      .from("users")
      .insert({ full_name, email })
      .select("id")
      .single();
    if (error) throw error;
    id = data.id as string;
  } else {
    // refresh name in case of typo correction
    await sb.from("users").update({ full_name }).eq("id", id);
  }
  await setUserId(id);
  redirect("/journey");
}

export default async function OnboardingPage() {
  const uid = await getUserId();
  if (uid) redirect("/journey");

  return (
    <div className="min-h-screen flex flex-col">
      <header className="flex justify-between items-center w-full px-margin-mobile py-4 sticky top-0 z-50 bg-background/80 backdrop-blur-md">
        <div className="flex items-center gap-2">
          <Icon name="bolt" className="text-primary text-headline-lg" fill />
          <span className="text-title-md font-headline-lg font-black text-primary italic tracking-tighter">
            LEVEL UP
          </span>
        </div>
        <div className="text-label-bold font-label-bold text-primary">YTH CAMP</div>
      </header>

      <main className="flex-grow flex flex-col items-center justify-center px-margin-mobile relative">
        <div className="absolute top-10 left-[-10%] w-72 h-72 bg-primary-container/20 blur-[100px] rounded-full -z-10" />
        <div className="absolute bottom-10 right-[-10%] w-80 h-80 bg-secondary-container/10 blur-[120px] rounded-full -z-10" />

        <div className="w-full max-w-lg mb-lg">
          <div className="relative w-full aspect-[2/1] rounded-xl overflow-hidden mb-md border-2 border-primary-container/30 shadow-2xl bg-gradient-to-br from-primary-container/40 via-surface-container to-background flex items-end">
            <div className="absolute bottom-4 left-4 flex flex-col items-start">
              <span className="bg-primary-container text-on-primary-fixed px-3 py-1 rounded-full text-label-sm font-label-bold mb-xs">
                EST. 2026
              </span>
              <h1 className="text-display-lg font-display-lg text-white leading-none">
                YTH
                <br />
                CAMP
              </h1>
            </div>
          </div>
          <h2 className="text-headline-lg font-headline-lg text-primary tracking-tight">
            ARE YOU READY?
          </h2>
        </div>

        <form action={signIn} className="w-full max-w-md space-y-md">
          <div className="glass-card p-lg rounded-xl shadow-xl space-y-md">
            <div className="space-y-xs">
              <label
                htmlFor="full_name"
                className="text-label-bold font-label-bold text-on-surface ml-1 block"
              >
                FULL NAME
              </label>
              <div className="relative group">
                <Icon
                  name="person"
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-on-surface-variant group-focus-within:text-primary transition-colors"
                />
                <input
                  id="full_name"
                  name="full_name"
                  required
                  placeholder="Enter your full name"
                  className="w-full bg-surface-container-low border-2 border-surface-variant focus:border-primary-container focus:ring-0 text-on-surface rounded-lg py-4 pl-12 pr-4 transition-all outline-none font-body-md"
                />
              </div>
            </div>
            <div className="space-y-xs">
              <label
                htmlFor="email"
                className="text-label-bold font-label-bold text-on-surface ml-1 block"
              >
                EMAIL ADDRESS
              </label>
              <div className="relative group">
                <Icon
                  name="mail"
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-on-surface-variant group-focus-within:text-primary transition-colors"
                />
                <input
                  id="email"
                  name="email"
                  type="email"
                  required
                  placeholder="Enter your email"
                  className="w-full bg-surface-container-low border-2 border-surface-variant focus:border-primary-container focus:ring-0 text-on-surface rounded-lg py-4 pl-12 pr-4 transition-all outline-none font-body-md"
                />
              </div>
            </div>
            <button
              type="submit"
              className="tactile-primary w-full bg-primary-container text-white font-label-bold text-body-lg py-4 rounded-lg flex items-center justify-center gap-2 transition-all hover:brightness-110"
            >
              SIGN IN
              <Icon name="arrow_forward" fill />
            </button>
          </div>
        </form>
      </main>

      <footer className="w-full py-8 px-margin-mobile mt-xl border-t border-surface-variant/30 flex flex-col items-center gap-md">
        <p className="text-label-sm font-label-sm text-on-surface-variant/50 text-center">
          © 2026 Favor Church. All rights reserved.
        </p>
      </footer>
    </div>
  );
}
