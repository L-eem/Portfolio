import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(req: NextRequest) {
  const token = process.env.ACCESS_TOKEN;
  if (!token) return NextResponse.next();

  const cookie = req.cookies.get("access_token")?.value;
  const url = new URL(req.url);
  const urlToken = url.searchParams.get("key");

  if (cookie === token || urlToken === token) {
    const res = NextResponse.next();
    if (urlToken === token) {
      res.cookies.set("access_token", token, {
        httpOnly: true,
        sameSite: "lax",
        secure: true,
        path: "/",
        maxAge: 60 * 60 * 24 * 30,
      });
      url.searchParams.delete("key");
      return NextResponse.redirect(url);
    }
    return res;
  }

  return new NextResponse(
    "Private link. Append ?key=YOUR_TOKEN to access (cookie will be set).",
    { status: 401 }
  );
}

export const config = {
  matcher: ["/((?!api|_next|static|favicon.ico|robots.txt).*)"],
};




