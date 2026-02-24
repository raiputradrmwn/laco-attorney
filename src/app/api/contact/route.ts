import { NextResponse } from "next/server";
import { z } from "zod";

import { prisma } from "@/lib/prisma";

const contactSchema = z.object({
  name: z.string().trim().min(2, "Name is required"),
  email: z.string().trim().email("Valid email is required"),
  practice: z.string().trim().min(2, "Practice is required"),
  message: z.string().trim().min(10, "Message is too short"),
});

function escapeHtml(input: string) {
  return input
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

async function sendContactNotification(payload: z.infer<typeof contactSchema>) {
  const apiKey = process.env.RESEND_API_KEY;
  const recipient = process.env.CONTACT_TO_EMAIL;
  const fromAddress = process.env.CONTACT_FROM_EMAIL || "LACO Contact <onboarding@resend.dev>";

  if (!apiKey || !recipient) {
    return { sent: false, reason: "Email provider is not configured" };
  }

  const safeName = escapeHtml(payload.name);
  const safeEmail = escapeHtml(payload.email);
  const safePractice = escapeHtml(payload.practice);
  const safeMessage = escapeHtml(payload.message).replace(/\n/g, "<br/>");

  const html = `
    <h2>New Contact Inquiry</h2>
    <p><strong>Name:</strong> ${safeName}</p>
    <p><strong>Email:</strong> ${safeEmail}</p>
    <p><strong>Legal Service:</strong> ${safePractice}</p>
    <p><strong>Message:</strong><br/>${safeMessage}</p>
  `;

  const text = [
    "New Contact Inquiry",
    `Name: ${payload.name}`,
    `Email: ${payload.email}`,
    `Legal Service: ${payload.practice}`,
    "Message:",
    payload.message,
  ].join("\n");

  const response = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      from: fromAddress,
      to: [recipient],
      reply_to: payload.email,
      subject: `New Contact Inquiry - ${payload.practice}`,
      text,
      html,
    }),
  });

  if (!response.ok) {
    const providerError = await response.text();
    return { sent: false, reason: providerError || "Failed to send email" };
  }

  return { sent: true };
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const parsed = contactSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json(
        { error: parsed.error.issues[0]?.message || "Invalid payload" },
        { status: 400 }
      );
    }

    const data = parsed.data;

    const storedMessage = `[Legal Service: ${data.practice}]\n\n${data.message}`;

    const inquiry = await prisma.contactInquiry.create({
      data: {
        name: data.name,
        email: data.email,
        message: storedMessage,
      },
    });

    const notification = await sendContactNotification(data);

    return NextResponse.json(
      {
        success: true,
        id: inquiry.id,
        emailSent: notification.sent,
        emailReason: notification.sent ? undefined : notification.reason,
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("Failed to handle contact inquiry", error);
    return NextResponse.json(
      { error: "Failed to submit contact inquiry" },
      { status: 500 }
    );
  }
}
