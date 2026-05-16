import { NextResponse } from "next/server";

const DEFAULT_BACKEND_URL = "http://127.0.0.1:8000";

function resolveBackendBaseUrl() {
  return (process.env.NEXT_PUBLIC_API_BASE_URL ?? DEFAULT_BACKEND_URL).replace(/\/+$/, "");
}

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const backendUrl = resolveBackendBaseUrl();
    const endpoint = `${backendUrl}/api/portfolio${searchParams.toString() ? `?${searchParams.toString()}` : ""}`;

    const response = await fetch(endpoint, { cache: "no-store" });
    const body = await response.text();

    return new NextResponse(body, {
      status: response.status,
      headers: {
        "content-type": response.headers.get("content-type") ?? "application/json",
      },
    });
  } catch {
    return NextResponse.json([], { status: 502 });
  }
}