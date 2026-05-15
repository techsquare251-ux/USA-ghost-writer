"use client";

import { useEffect, useMemo, useState } from "react";
import { createPortal } from "react-dom";
import { X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Toast } from "@/components/common/Toast";

const DEFAULT_DATE_OFFSET_DAYS = 1;

const getDefaultDate = () => {
  const date = new Date();
  date.setDate(date.getDate() + DEFAULT_DATE_OFFSET_DAYS);
  return date.toISOString().split("T")[0] ?? "";
};

type BookingModalProps = {
  open: boolean;
  onClose: () => void;
};

type AvailabilityResponse = {
  date: string;
  slots: string[];
};

type BookingPayload = {
  name: string;
  email: string;
  phone: string;
  date: string;
  start_time: string;
  message?: string;
  context?: string;
};

export function BookingModal({ open, onClose }: BookingModalProps) {
  const [mounted, setMounted] = useState(false);
  const [serverMessage, setServerMessage] = useState<string>("");
  const [isSuccess, setIsSuccess] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [availableSlots, setAvailableSlots] = useState<string[]>([]);
  const [selectedSlot, setSelectedSlot] = useState<string>("");
  const [formValues, setFormValues] = useState<BookingPayload>({
    name: "",
    email: "",
    phone: "",
    date: getDefaultDate(),
    start_time: "",
    message: "",
    context: "booking",
  });

  const apiBaseUrl = useMemo(
    () => (process.env.NEXT_PUBLIC_API_BASE_URL ?? "").replace(/\/+$/, ""),
    []
  );

  useEffect(() => {
    setMounted(true);
    return () => setMounted(false);
  }, []);

  useEffect(() => {
    if (!open) return;
    setFormValues((prev) => (prev.date ? prev : { ...prev, date: getDefaultDate() }));
  }, [open]);

  useEffect(() => {
    if (!open) return;
    setSelectedSlot("");
    setAvailableSlots([]);
    setIsLoading(true);
    setServerMessage("");
  }, [open]);

  useEffect(() => {
    if (!open || !formValues.date) return;
    const controller = new AbortController();

    const loadAvailability = async () => {
      setIsLoading(true);
      setServerMessage("");
      try {
        setIsLoading(true);
        const response = await fetch(
          `${apiBaseUrl}/api/schedule/availability?date=${formValues.date}`,
          { signal: controller.signal }
        );
        if (!response.ok) {
          throw new Error("Unable to load availability.");
        }
        const data = (await response.json()) as AvailabilityResponse;
        setAvailableSlots(data.slots ?? []);
        if (data.slots?.length) {
          setSelectedSlot(data.slots[0]);
          setFormValues((prev) => ({ ...prev, start_time: data.slots[0] }));
        } else {
          setSelectedSlot("");
          setFormValues((prev) => ({ ...prev, start_time: "" }));
        }
      } catch (error) {
        if ((error as Error).name !== "AbortError") {
          setAvailableSlots([]);
          setServerMessage("No availability found for that date.");
          setIsSuccess(false);
        }
      } finally {
        setIsLoading(false);
      }
    };

    loadAvailability();
    return () => controller.abort();
  }, [apiBaseUrl, formValues.date, open]);

  const handleInputChange = (field: keyof BookingPayload, value: string) => {
    setFormValues((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async () => {
    setServerMessage("");
    setIsSuccess(false);

    if (!formValues.name || !formValues.email || !formValues.phone) {
      setServerMessage("Please fill out your name, email, and phone.");
      return;
    }

    if (!formValues.date || !formValues.start_time) {
      setServerMessage("Please select a date and time.");
      return;
    }

    setIsSubmitting(true);
    try {
      const response = await fetch(`${apiBaseUrl}/api/schedule/book`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formValues),
      });

      const result = (await response.json()) as { success: boolean; message: string };
      if (!response.ok) {
        throw new Error(result.message || "Unable to book meeting.");
      }

      setServerMessage(result.message || "Your meeting is booked.");
      setIsSuccess(true);
      setFormValues({
        name: "",
        email: "",
        phone: "",
        date: formValues.date,
        start_time: "",
        message: "",
        context: "booking",
      });
      setSelectedSlot("");
    } catch (error) {
      setServerMessage((error as Error).message || "Unable to book meeting.");
      setIsSuccess(false);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleToastClose = () => {
    setServerMessage("");
  };

  if (!open || !mounted) return null;

  const modal = (
    <div className="fixed inset-0 z-[100] flex items-center justify-center overflow-y-auto bg-black/45 px-4 py-4 sm:px-6 sm:py-6">
      <div className="relative w-full max-w-3xl overflow-hidden rounded-3xl bg-white shadow-[0_30px_90px_-40px_rgba(15,23,42,0.6)] max-h-[calc(100vh-2rem)] sm:max-h-[calc(100vh-3rem)]">
        <button
          type="button"
          onClick={onClose}
          aria-label="Close booking"
          className="absolute right-4 top-4 rounded-full border border-black/10 bg-white p-2 text-brand-muted transition hover:text-brand-charcoal"
        >
          <X className="size-4" aria-hidden="true" />
        </button>

        <div className="grid gap-6 overflow-y-auto p-6 sm:p-8 lg:grid-cols-[1.1fr_0.9fr]">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-secondary">Book a call</p>
            <h3 className="mt-2 font-display text-2xl font-semibold text-brand-charcoal">Schedule your 15-minute consult</h3>
            <p className="mt-2 text-sm text-brand-muted">
              Pick a time that works for you and our publishing specialist will confirm the call.
            </p>

            <div className="mt-6 grid gap-3">
              <Input
                placeholder="Full name"
                value={formValues.name}
                onChange={(event) => handleInputChange("name", event.target.value)}
              />
              <Input
                placeholder="Email address"
                type="email"
                value={formValues.email}
                onChange={(event) => handleInputChange("email", event.target.value)}
              />
              <Input
                placeholder="Phone number"
                value={formValues.phone}
                onChange={(event) => handleInputChange("phone", event.target.value)}
              />
              <Input
                type="date"
                value={formValues.date}
                onChange={(event) => handleInputChange("date", event.target.value)}
              />
              <textarea
                className="min-h-[110px] w-full rounded-lg border border-input bg-transparent px-3 py-2 text-sm outline-none focus-visible:border-ring focus-visible:ring-2 focus-visible:ring-ring/40"
                placeholder="Tell us what you want to discuss (optional)"
                value={formValues.message}
                onChange={(event) => handleInputChange("message", event.target.value)}
              />
            </div>
          </div>

          <div className="rounded-2xl border border-brand-green/10 bg-brand-cream/40 p-4">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-brand-muted">Available times</p>
            <div className="mt-4 max-h-[260px] min-h-[180px] overflow-y-auto pr-1">
              {isLoading ? (
                <p className="text-sm text-brand-muted">Loading availability...</p>
              ) : availableSlots.length ? (
                <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
                  {availableSlots.map((slot) => (
                    <button
                      key={slot}
                      type="button"
                      onClick={() => {
                        setSelectedSlot(slot);
                        handleInputChange("start_time", slot);
                      }}
                      className={`rounded-lg border px-3 py-2 text-center text-sm font-semibold transition ${
                        selectedSlot === slot
                          ? "border-secondary bg-secondary text-white"
                          : "border-brand-green/10 bg-white text-brand-charcoal hover:border-secondary/40"
                      }`}
                    >
                      {slot}
                    </button>
                  ))}
                </div>
              ) : (
                <p className="text-sm text-brand-muted">No times available for this date.</p>
              )}
            </div>

            <Button
              onClick={handleSubmit}
              disabled={isSubmitting}
              className="mt-6 h-11 w-full rounded-md bg-secondary text-white shadow-[0_10px_24px_-14px_rgba(193,18,31,0.6)] transition hover:bg-secondary/90 disabled:cursor-not-allowed disabled:opacity-70"
            >
              {isSubmitting ? "Booking..." : "Confirm booking"}
            </Button>

            <p className="mt-3 text-xs text-brand-muted">
              You will receive a confirmation email after scheduling.
            </p>
          </div>
        </div>
      </div>

      <Toast message={serverMessage} variant={isSuccess ? "success" : "error"} onClose={handleToastClose} />
    </div>
  );

  return createPortal(modal, document.body);
}
