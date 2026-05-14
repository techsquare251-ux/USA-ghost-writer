import { NextResponse } from "next/server";
import { Resend } from "resend";
import { contactSchema } from "@/lib/validation";

export async function POST(request: Request) {
  try {
    const payload = await request.json();
    const result = contactSchema.safeParse(payload);

    if (!result.success) {
      return NextResponse.json(
        { success: false, message: "Invalid form data." },
        { status: 400 }
      );
    }

    const data = result.data;
    const apiKey = process.env.RESEND_API_KEY;

    if (apiKey) {
      const resend = new Resend(apiKey);
      await resend.emails.send({
        from: "USA Ghost Writer <onboarding@resend.dev>",
        to: [process.env.NEXT_PUBLIC_EMAIL ?? "support@usaghostwriter.com"],
        subject: `New Contact Request (${data.context ?? "general"})`,
        text: [
          `Name: ${data.name}`,
          `Phone: ${data.phone}`,
          `Email: ${data.email}`,
          `Service: ${data.service ?? "N/A"}`,
          `Message: ${data.message ?? "N/A"}`,
          `SMS Consent: ${data.smsConsent ? "Yes" : "No"}`,
          `Context: ${data.context ?? "N/A"}`,
        ].join("\n"),
      });
    } else {
      console.log("Contact request (dev mode):", data);
    }

    return NextResponse.json({
      success: true,
      message: "Thanks. Our team will reach out shortly.",
    });
  } catch {
    return NextResponse.json(
      { success: false, message: "Something went wrong. Please try again." },
      { status: 500 }
    );
  }
}
