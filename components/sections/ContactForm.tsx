"use client";

import { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2 } from "lucide-react";
import { contactSchema, type ContactFormValues } from "@/lib/validation";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";

type ContactFormProps = {
  context: string;
  compact?: boolean;
  endpoint?: "/api/quote" | "/api/contact";
  submitLabel?: string;
};

export function ContactForm({
  context,
  compact = false,
  endpoint = "/api/quote",
  submitLabel = "Submit",
}: ContactFormProps) {
  const [serverMessage, setServerMessage] = useState<string>("");
  const {
    control,
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<ContactFormValues>({
    resolver: zodResolver(contactSchema),
    defaultValues: {
      name: "",
      phone: "",
      email: "",
      service: "",
      message: "",
      smsConsent: false,
      context,
    },
  });

  const onSubmitWithEndpoint = async (values: ContactFormValues) => {
    setServerMessage("");
    const response = await fetch(endpoint, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ...values, context }),
    });

    const result = (await response.json()) as { success: boolean; message: string };
    setServerMessage(result.message);

    if (result.success) {
      reset({
        name: "",
        phone: "",
        email: "",
        service: "",
        message: "",
        smsConsent: false,
        context,
      });
    }
  };

  return (
    <div className="rounded-2xl border border-brand-green/10 bg-white p-6 shadow-sm sm:p-8">
      <div className="grid gap-4">
        <div>
          <label htmlFor={`${context}-name`} className="mb-1.5 block text-sm font-medium text-brand-charcoal">
            Name
          </label>
          <Input id={`${context}-name`} aria-invalid={Boolean(errors.name)} {...register("name")} />
          {errors.name ? <p className="mt-1 text-xs text-red-600">{errors.name.message}</p> : null}
        </div>

        <div>
          <label htmlFor={`${context}-phone`} className="mb-1.5 block text-sm font-medium text-brand-charcoal">
            Phone
          </label>
          <Input id={`${context}-phone`} aria-invalid={Boolean(errors.phone)} {...register("phone")} />
          {errors.phone ? <p className="mt-1 text-xs text-red-600">{errors.phone.message}</p> : null}
        </div>

        <div>
          <label htmlFor={`${context}-email`} className="mb-1.5 block text-sm font-medium text-brand-charcoal">
            Email
          </label>
          <Input id={`${context}-email`} aria-invalid={Boolean(errors.email)} {...register("email")} />
          {errors.email ? <p className="mt-1 text-xs text-red-600">{errors.email.message}</p> : null}
        </div>

        {!compact ? (
          <>
            <div>
              <label htmlFor={`${context}-service`} className="mb-1.5 block text-sm font-medium text-brand-charcoal">
                Service Interest
              </label>
              <Input id={`${context}-service`} {...register("service")} />
            </div>

            <div>
              <label htmlFor={`${context}-message`} className="mb-1.5 block text-sm font-medium text-brand-charcoal">
                Message
              </label>
              <textarea
                id={`${context}-message`}
                className="min-h-28 w-full rounded-lg border border-input bg-transparent px-3 py-2 text-sm outline-none focus-visible:border-ring focus-visible:ring-2 focus-visible:ring-ring/40"
                {...register("message")}
              />
            </div>
          </>
        ) : null}

        <div className="flex items-start gap-2 pt-1">
          <Controller
            control={control}
            name="smsConsent"
            render={({ field }) => (
              <Checkbox
                checked={field.value}
                onCheckedChange={(checked) => field.onChange(Boolean(checked))}
                aria-label="SMS consent"
              />
            )}
          />
          <p className="text-xs leading-5 text-brand-muted">I agree to receive SMS updates related to my publishing inquiry.</p>
        </div>

        <Button
          onClick={handleSubmit(onSubmitWithEndpoint)}
          disabled={isSubmitting}
          className="mt-1 h-11 rounded-md bg-brand-green text-white hover:bg-brand-green-light"
        >
          {isSubmitting ? <Loader2 className="size-4 animate-spin" aria-hidden="true" /> : null}
          {isSubmitting ? "Submitting..." : submitLabel}
        </Button>

        {serverMessage ? <p className="text-sm text-brand-muted">{serverMessage}</p> : null}
      </div>
    </div>
  );
}
