import { NextResponse } from "next/server";

const DEFAULT_BACKEND_URL = "http://127.0.0.1:8000";

function resolveBackendBaseUrl() {
  return (process.env.NEXT_PUBLIC_API_BASE_URL ?? DEFAULT_BACKEND_URL).replace(/\/+$/, "");
}

export async function GET(_: Request, { params }: { params: { itemId: string } }) {
  try {
    const endpoint = `${resolveBackendBaseUrl()}/api/portfolio/${params.itemId}/cover-image`;
    const response = await fetch(endpoint, { cache: "no-store" });

    if (!response.ok) {
      return NextResponse.json({ detail: "Cover image not found." }, { status: response.status });
    }

    const body = await response.arrayBuffer();
    return new Response(body, {
      status: response.status,
      headers: {
        "content-type": response.headers.get("content-type") ?? "application/octet-stream",
        "cache-control": response.headers.get("cache-control") ?? "no-store",
      },
    });
  } catch {
    return NextResponse.json({ detail: "Unable to load cover image." }, { status: 502 });
  }
}