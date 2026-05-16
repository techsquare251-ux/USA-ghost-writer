import { NextResponse } from "next/server";
import { getBackendAdminToken, isAdminSessionValid, resolveBackendBaseUrl } from "../_lib";

export async function GET(request: Request) {
  if (!(await isAdminSessionValid(request.headers.get("cookie")))) {
    return NextResponse.json({ success: false, message: "Unauthorized." }, { status: 401 });
  }

  const endpoint = `${resolveBackendBaseUrl()}/api/admin/portfolio`;
  const response = await fetch(endpoint, {
    headers: {
      Accept: "application/json",
      "X-Admin-Token": getBackendAdminToken(),
    },
    cache: "no-store",
  });

  const body = await response.text();
  return new NextResponse(body, {
    status: response.status,
    headers: {
      "content-type": response.headers.get("content-type") ?? "application/json",
    },
  });
}

export async function POST(request: Request) {
  if (!(await isAdminSessionValid(request.headers.get("cookie")))) {
    return NextResponse.json({ success: false, message: "Unauthorized." }, { status: 401 });
  }

  const endpoint = `${resolveBackendBaseUrl()}/api/admin/portfolio`;
  const contentType = request.headers.get("content-type") ?? "";

  // If it's multipart form data (file upload), forward it as-is
  if (contentType.includes("multipart/form-data")) {
    const response = await fetch(endpoint, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": contentType,
        "X-Admin-Token": getBackendAdminToken(),
      },
      body: request.body,
      duplex: "half",
    } as Parameters<typeof fetch>[1]);

    const body = await response.text();
    return new NextResponse(body, {
      status: response.status,
      headers: {
        "content-type": response.headers.get("content-type") ?? "application/json",
      },
    });
  }

  // Otherwise, handle as JSON
  const response = await fetch(endpoint, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      "X-Admin-Token": getBackendAdminToken(),
    },
    body: await request.text(),
  });

  const body = await response.text();
  return new NextResponse(body, {
    status: response.status,
    headers: {
      "content-type": response.headers.get("content-type") ?? "application/json",
    },
  });
}
