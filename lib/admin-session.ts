const SESSION_PREFIX = "liblit_admin_session";
export const ADMIN_SESSION_COOKIE_NAME = SESSION_PREFIX;

const encoder = new TextEncoder();

function toBase64Url(value: string | Uint8Array) {
  const bytes = typeof value === "string" ? encoder.encode(value) : value;
  let binary = "";
  for (let index = 0; index < bytes.length; index += 1) {
    binary += String.fromCharCode(bytes[index]);
  }
  return btoa(binary).replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/g, "");
}

function fromBase64Url(value: string) {
  const padded = value.replace(/-/g, "+").replace(/_/g, "/") + "===".slice((value.length + 3) % 4);
  const binary = atob(padded);
  const bytes = new Uint8Array(binary.length);
  for (let index = 0; index < binary.length; index += 1) {
    bytes[index] = binary.charCodeAt(index);
  }
  return bytes;
}

async function importHmacKey(secret: string) {
  return crypto.subtle.importKey(
    "raw",
    encoder.encode(secret),
    { name: "HMAC", hash: "SHA-256" },
    false,
    ["sign", "verify"]
  );
}

export function parseCookieHeader(cookieHeader: string | null | undefined): Record<string, string> {
  if (!cookieHeader) return {};

  return cookieHeader.split(";").reduce<Record<string, string>>((accumulator, pair) => {
    const [rawKey, ...rawValue] = pair.trim().split("=");
    if (!rawKey) return accumulator;
    accumulator[decodeURIComponent(rawKey)] = decodeURIComponent(rawValue.join("=") ?? "");
    return accumulator;
  }, {});
}

export async function signAdminSession(secret: string, maxAgeSeconds: number) {
  const now = Math.floor(Date.now() / 1000);
  const payload = {
    iat: now,
    exp: now + maxAgeSeconds,
    role: "admin",
  };
  const payloadEncoded = toBase64Url(JSON.stringify(payload));
  const key = await importHmacKey(secret);
  const signature = await crypto.subtle.sign("HMAC", key, encoder.encode(payloadEncoded));
  return `${payloadEncoded}.${toBase64Url(new Uint8Array(signature))}`;
}

export async function verifyAdminSession(token: string, secret: string) {
  const [payloadEncoded, signatureEncoded] = token.split(".");
  if (!payloadEncoded || !signatureEncoded) return false;

  try {
    const key = await importHmacKey(secret);
    const isValid = await crypto.subtle.verify(
      "HMAC",
      key,
      fromBase64Url(signatureEncoded),
      encoder.encode(payloadEncoded)
    );
    if (!isValid) return false;

    const payload = JSON.parse(new TextDecoder().decode(fromBase64Url(payloadEncoded))) as { exp?: number; role?: string };
    if (payload.role !== "admin") return false;
    if (!payload.exp || payload.exp < Math.floor(Date.now() / 1000)) return false;
    return true;
  } catch {
    return false;
  }
}
