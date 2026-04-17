import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";

import { getEnv } from "@/lib/env";
import { ContactFormSchema } from "@/lib/validators";

export async function POST(request: NextRequest) {
  const raw = await request.json().catch(() => null);
  const parsed = ContactFormSchema.safeParse(raw);
  if (!parsed.success) {
    return NextResponse.json(
      { error: "Invalid data", details: parsed.error.flatten() },
      { status: 400 },
    );
  }

  const { firstName, lastName, email, message, website } = parsed.data;
  if (website && website.trim().length > 0) {
    return NextResponse.json({ ok: true });
  }

  const apiKey = process.env.RESEND_API_KEY?.trim();
  if (!apiKey) {
    return NextResponse.json(
      { error: "Contact form is not configured (missing RESEND_API_KEY)." },
      { status: 503 },
    );
  }

  const explicitInbox = process.env.CONTACT_INBOX_EMAIL?.trim();
  let inbox: string | undefined = explicitInbox;
  if (!inbox) {
    try {
      const env = getEnv();
      inbox = env.INTELTECH_ADMIN_EMAILS.split(",")[0]?.trim();
    } catch {
      return NextResponse.json({ error: "Server configuration error." }, { status: 500 });
    }
  }
  if (!inbox) {
    return NextResponse.json(
      { error: "No inbox configured. Set CONTACT_INBOX_EMAIL or INTELTECH_ADMIN_EMAILS." },
      { status: 503 },
    );
  }

  const from =
    process.env.RESEND_FROM_EMAIL?.trim() ?? "Intelligence Tech <onboarding@resend.dev>";

  // #region agent log
  fetch("http://127.0.0.1:7331/ingest/17a577ca-5ed8-4ef8-8a76-8f39d9185056", {
    method: "POST",
    headers: { "Content-Type": "application/json", "X-Debug-Session-Id": "68d7ec" },
    body: JSON.stringify({
      sessionId: "68d7ec",
      runId: "run1",
      hypothesisId: "H1",
      location: "api/contact/route.ts:before_send",
      message: "contact_send_attempt",
      data: {
        fromDomain: from.includes("@") ? from.split("@")[1].replace(/>.*/, "") : "unknown",
        hasExplicitInbox: Boolean(explicitInbox),
        inboxDomain: inbox.includes("@") ? inbox.split("@")[1] : "unknown",
      },
      timestamp: Date.now(),
    }),
  }).catch(() => {});
  // #endregion

  const resend = new Resend(apiKey);
  const result = await resend.emails.send({
    from,
    to: [inbox],
    replyTo: email,
    subject: `[Contact] ${firstName} ${lastName}`,
    text: `From: ${firstName} ${lastName} <${email}>\n\n${message}`,
  });

  if (result.error) {
    // #region agent log
    fetch("http://127.0.0.1:7331/ingest/17a577ca-5ed8-4ef8-8a76-8f39d9185056", {
      method: "POST",
      headers: { "Content-Type": "application/json", "X-Debug-Session-Id": "68d7ec" },
      body: JSON.stringify({
        sessionId: "68d7ec",
        runId: "run1",
        hypothesisId: "H2",
        location: "api/contact/route.ts:send_error",
        message: "contact_send_failed",
        data: {
          errorType: typeof result.error,
          errorMessage:
            result.error && typeof result.error === "object" && "message" in result.error
              ? String((result.error as { message?: unknown }).message).slice(0, 200)
              : "unknown",
        },
        timestamp: Date.now(),
      }),
    }).catch(() => {});
    // #endregion
    return NextResponse.json({ error: "Failed to send message. Try again later." }, { status: 502 });
  }

  // #region agent log
  fetch("http://127.0.0.1:7331/ingest/17a577ca-5ed8-4ef8-8a76-8f39d9185056", {
    method: "POST",
    headers: { "Content-Type": "application/json", "X-Debug-Session-Id": "68d7ec" },
    body: JSON.stringify({
      sessionId: "68d7ec",
      runId: "run1",
      hypothesisId: "H3",
      location: "api/contact/route.ts:send_ok",
      message: "contact_send_ok",
      data: { hasId: Boolean((result as { data?: { id?: string } }).data?.id) },
      timestamp: Date.now(),
    }),
  }).catch(() => {});
  // #endregion

  return NextResponse.json({ ok: true });
}
