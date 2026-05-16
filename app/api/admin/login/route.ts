import { NextResponse } from "next/server";
import { timingSafeEqual } from "crypto";
import { createAdminSessionCookie, getAdminDashboardPassword } from "../_lib";
import {
  checkAdminLoginRateLimit,
  clearAdminLoginFailures,
  recordAdminLoginFailure,
} from "@/lib/admin-rate-limit";

function getClientIp(request: Request) {
  const forwarded = request.headers.get("x-forwarded-for") ?? "";
  const first = forwarded.split(",")[0]?.trim();
  return first || request.headers.get("x-real-ip") || "unknown";
}

function safePasswordMatch(input: string, expected: string) {
  const inputBuffer = Buffer.from(input, "utf8");
  const expectedBuffer = Buffer.from(expected, "utf8");
  if (inputBuffer.length !== expectedBuffer.length) {
    return false;
  }
  return timingSafeEqual(inputBuffer, expectedBuffer);
}

function withNoStore(response: NextResponse) {
  response.headers.set("cache-control", "no-store");
  return response;
}

function withRetryAfter(response: NextResponse, retryAfterSeconds: number) {
  response.headers.set("retry-after", String(retryAfterSeconds));
  return response;
}

export async function POST(request: Request) {
  try {
    const ip = getClientIp(request);
    const currentRateLimit = await checkAdminLoginRateLimit(ip);
    if (currentRateLimit.blocked) {
      return withNoStore(
        withRetryAfter(
          NextResponse.json(
            {
              success: false,
              message: "Too many login attempts. Please wait and try again.",
            },
            { status: 429 }
          ),
          currentRateLimit.retryAfterSeconds
        )
      );
    }

    const payload = (await request.json()) as { password?: string };
    const password = getAdminDashboardPassword();

    if (!password) {
      return withNoStore(
        NextResponse.json({ success: false, message: "Admin password is not configured." }, { status: 503 })
      );
    }

    const suppliedPassword = payload.password ?? "";
    if (!safePasswordMatch(suppliedPassword, password)) {
      const updatedRateLimit = await recordAdminLoginFailure(ip);
      if (updatedRateLimit.blocked) {
        return withNoStore(
          withRetryAfter(
            NextResponse.json(
              {
                success: false,
                message: "Too many login attempts. Please wait and try again.",
              },
              { status: 429 }
            ),
            updatedRateLimit.retryAfterSeconds
          )
        );
      }
      return withNoStore(NextResponse.json({ success: false, message: "Invalid password." }, { status: 401 }));
    }

    await clearAdminLoginFailures(ip);

    const sessionCookie = await createAdminSessionCookie();
    const response = NextResponse.json({ success: true, message: "Signed in." });
    response.cookies.set({
      name: sessionCookie.name,
      value: sessionCookie.value,
      httpOnly: true,
      sameSite: "strict",
      secure: process.env.NODE_ENV === "production",
      path: "/",
      maxAge: sessionCookie.maxAge,
    });
    return withNoStore(response);
  } catch {
    return withNoStore(NextResponse.json({ success: false, message: "Could not sign in." }, { status: 500 }));
  }
}
