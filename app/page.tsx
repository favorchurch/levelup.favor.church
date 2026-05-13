import { redirect } from "next/navigation";
import { getUserId } from "@/lib/session";

export default async function RootPage() {
  const uid = await getUserId();
  redirect(uid ? "/journey" : "/onboarding");
}
