import { NextResponse } from "next/server";
import { ADMIN_SESSION_COOKIE_NAME, parseCookieHeader, verifyAdminSession } from "@/lib/admin-session";

const DEFAULT_BACKEND_URL = "http://127.0.0.1:8000";

function getAdminSessionMaxAgeSeconds() {
  const rawValue = process.env.ADMIN_SESSION_MAX_AGE_SECONDS;
  const parsed = Number.parseInt(rawValue ?? "", 10);
  if (!Number.isFinite(parsed) || parsed <= 0) {
    return 60 * 15;
  }
  return parsed;
}

export function resolveBackendBaseUrl() {
  return (process.env.NEXT_PUBLIC_API_BASE_URL ?? DEFAULT_BACKEND_URL).replace(/\/+$/, "");
}

export function getBackendAdminToken() {
  return process.env.BACKEND_ADMIN_API_TOKEN ?? process.env.ADMIN_API_TOKEN ?? "";
}

export function getAdminDashboardSecret() {
  return process.env.ADMIN_DASHBOARD_SECRET ?? "";
}

export function getAdminDashboardPassword() {
  return process.env.ADMIN_DASHBOARD_PASSWORD ?? "";
}

export function getAdminSessionToken(cookieHeader: string | null | undefined) {
  const cookies = parseCookieHeader(cookieHeader);
  return cookies[ADMIN_SESSION_COOKIE_NAME] ?? "";
}

export async function isAdminSessionValid(cookieHeader: string | null | undefined) {
  const secret = getAdminDashboardSecret();
  if (!secret) return false;
  const token = getAdminSessionToken(cookieHeader);
  if (!token) return false;
  return verifyAdminSession(token, secret);
}

export async function requireAdminSession(request: Request) {
  if (!(await isAdminSessionValid(request.headers.get("cookie")))) {
    return NextResponse.json({ success: false, message: "Unauthorized." }, { status: 401 });
  }

  return null;
}

export async function createAdminSessionCookie() {
  const secret = getAdminDashboardSecret();
  if (!secret) {
    throw new Error("ADMIN_DASHBOARD_SECRET is not configured.");
  }

  const { signAdminSession } = await import("@/lib/admin-session");
  const maxAge = getAdminSessionMaxAgeSeconds();
  const value = await signAdminSession(secret, maxAge);
  return {
    name: ADMIN_SESSION_COOKIE_NAME,
    value,
    maxAge,
  };
}
