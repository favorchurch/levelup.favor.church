import { NextResponse, type NextRequest } from "next/server";

const PUBLIC = new Set(["/onboarding"]);

export function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;
  if (PUBLIC.has(pathname)) return NextResponse.next();

  const uid = req.cookies.get("lu_uid")?.value;
  if (!uid) {
    const url = req.nextUrl.clone();
    url.pathname = "/onboarding";
    return NextResponse.redirect(url);
  }
  return NextResponse.next();
}

export const config = {
  // Gate all app pages and JSON API routes. Skip Next internals and static files.
  matcher: [
    "/((?!_next/|favicon.ico|robots.txt|sitemap.xml|api/healthz).*)",
  ],
};
