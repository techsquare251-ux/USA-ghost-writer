import { NextRequest, NextResponse } from "next/server";
import { ADMIN_SESSION_COOKIE_NAME, parseCookieHeader, verifyAdminSession } from "@/lib/admin-session";

function getCookieToken(request: NextRequest) {
  const cookies = parseCookieHeader(request.headers.get("cookie"));
  return cookies[ADMIN_SESSION_COOKIE_NAME] ?? "";
}

function isTruthy(value: string | undefined) {
  if (!value) return false;
  const normalized = value.trim().toLowerCase();
  return normalized === "1" || normalized === "true" || normalized === "yes" || normalized === "on";
}

function isDashboardPath(pathname: string) {
  return pathname === "/dashboard" || pathname.startsWith("/dashboard/");
}

export async function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname;
  const secret = process.env.ADMIN_DASHBOARD_SECRET ?? "";
  const forceReauthOnEntry = isTruthy(process.env.ADMIN_FORCE_REAUTH_ON_DASHBOARD_VISIT ?? "true");

  if (pathname.startsWith("/api/admin")) {
    if (pathname.startsWith("/api/admin/login")) {
      const response = NextResponse.next();
      response.headers.set("cache-control", "no-store");
      return response;
    }

    const token = getCookieToken(request);
    const isValid = secret ? await verifyAdminSession(token, secret) : false;
    if (!isValid) {
      return NextResponse.json({ success: false, message: "Unauthorized." }, { status: 401 });
    }

    const response = NextResponse.next();
    response.headers.set("cache-control", "no-store");
    return response;
  }

  if (pathname.startsWith("/dashboard")) {
    if (pathname.startsWith("/dashboard/login")) {
      const response = NextResponse.next();
      response.headers.set("cache-control", "no-store");
      return response;
    }

    if (forceReauthOnEntry && isDashboardPath(pathname)) {
      const referer = request.headers.get("referer") ?? "";
      const fromDashboard = referer.includes("/dashboard");
      if (!fromDashboard) {
        const loginUrl = new URL("/dashboard/login", request.url);
        loginUrl.searchParams.set("next", pathname);
        const response = NextResponse.redirect(loginUrl);
        response.cookies.set({
          name: ADMIN_SESSION_COOKIE_NAME,
          value: "",
          httpOnly: true,
          sameSite: "strict",
          secure: process.env.NODE_ENV === "production",
          path: "/",
          maxAge: 0,
        });
        response.headers.set("cache-control", "no-store");
        return response;
      }
    }

    const token = getCookieToken(request);
    const isValid = secret ? await verifyAdminSession(token, secret) : false;
    if (!isValid) {
      const loginUrl = new URL("/dashboard/login", request.url);
      loginUrl.searchParams.set("next", pathname);
      return NextResponse.redirect(loginUrl);
    }

    const response = NextResponse.next();
    response.headers.set("cache-control", "no-store");
    return response;
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/dashboard/:path*", "/api/admin/:path*"],
};
