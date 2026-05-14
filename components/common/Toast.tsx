"use client";

import { useEffect } from "react";

type ToastProps = {
  message: string;
  variant?: "success" | "error";
  onClose: () => void;
  duration?: number;
};

export function Toast({ message, variant = "success", onClose, duration = 4000 }: ToastProps) {
  useEffect(() => {
    if (!message) return undefined;
    const timer = window.setTimeout(onClose, duration);
    return () => window.clearTimeout(timer);
  }, [message, duration, onClose]);

  if (!message) return null;

  const styles =
    variant === "success"
      ? "border-emerald-200 bg-emerald-50 text-emerald-900"
      : "border-red-200 bg-red-50 text-red-900";

  return (
    <div className="fixed right-6 top-6 z-50">
      <div
        role="status"
        className={`flex min-w-[240px] items-start justify-between gap-3 rounded-xl border px-4 py-3 text-sm shadow-lg ${styles}`}
      >
        <span>{message}</span>
        <button
          type="button"
          onClick={onClose}
          aria-label="Close"
          className="-mr-1 -mt-1 rounded-md px-2 py-1 text-xs font-semibold opacity-70 transition hover:opacity-100"
        >
          x
        </button>
      </div>
    </div>
  );
}
