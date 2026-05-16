"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function DashboardLoginPage() {
  const router = useRouter();
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const submit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setLoading(true);
    setError("");

    try {
      const response = await fetch("/api/admin/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password }),
      });

      const body = (await response.json().catch(() => ({}))) as { success?: boolean; message?: string };
      if (!response.ok || !body.success) {
        throw new Error(body.message ?? "Invalid password.");
      }

      const currentUrl = new URL(window.location.href);
      const nextPath = currentUrl.searchParams.get("next") ?? "/dashboard";
      const safeNextPath = nextPath.startsWith("/dashboard") ? nextPath : "/dashboard";
      router.push(safeNextPath);
      router.refresh();
    } catch (loginError) {
      setError(loginError instanceof Error ? loginError.message : "Could not sign in.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="flex min-h-screen items-center justify-center bg-gradient-to-b from-brand-cream via-white to-brand-cream px-4">
      <form onSubmit={submit} className="w-full max-w-md rounded-3xl border border-brand-green/10 bg-white p-8 shadow-[0_24px_80px_-40px_rgba(11,60,109,0.3)]">
        <p className="text-[10px] font-semibold uppercase tracking-[0.24em] text-brand-green/75">Restricted Access</p>
        <h1 className="mt-2 text-3xl font-black text-brand-charcoal">Dashboard Login</h1>
        <p className="mt-2 text-sm leading-6 text-brand-muted">Enter the admin password to manage portfolio items.</p>

        {error ? <div className="mt-5 rounded-2xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">{error}</div> : null}

        <label className="mt-6 block text-sm font-medium text-brand-charcoal">
          Password
          <input
            type="password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            className="mt-2 w-full rounded-xl border border-brand-green/15 px-4 py-3 outline-none transition focus:border-secondary"
            placeholder="Enter dashboard password"
          />
        </label>

        <button
          type="submit"
          disabled={loading}
          className="mt-6 inline-flex w-full items-center justify-center rounded-full bg-secondary px-5 py-3 text-sm font-semibold text-white transition hover:bg-secondary/90 disabled:cursor-not-allowed disabled:opacity-60"
        >
          {loading ? "Signing in..." : "Sign in"}
        </button>
      </form>
    </main>
  );
}
