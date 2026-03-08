import { Resend } from "resend";
import { NextResponse } from "next/server";

export const runtime = "nodejs";

function getResend() {
  const key = process.env.RESEND_API_KEY;
  return key ? new Resend(key) : null;
}

function isValidEmail(email: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email.trim());
}

function escapeHtml(str: string) {
  return str
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

export async function POST(req: Request) {
  try {
    const resend = getResend();
    if (!resend) {
      return NextResponse.json(
        { ok: false, error: "Server email is not configured." },
        { status: 500 }
      );
    }

    const body = await req.json();

    const name = String(body?.name ?? "").trim();
    const email = String(body?.email ?? "").trim();
    const subject = String(body?.subject ?? "").trim();
    const message = String(body?.message ?? "").trim();

    // honeypot (bots fill it)
    const company = String(body?.company ?? "").trim();
    if (company) return NextResponse.json({ ok: true });

    if (!name || name.length < 2)
      return NextResponse.json({ ok: false, error: "Name is required." }, { status: 400 });
    if (!isValidEmail(email))
      return NextResponse.json({ ok: false, error: "Valid email is required." }, { status: 400 });
    if (!message || message.length < 10)
      return NextResponse.json({ ok: false, error: "Message is too short." }, { status: 400 });

    const to = process.env.CONTACT_TO_EMAIL || "saiman.mubasher@gmail.com";
    const from =
      process.env.CONTACT_FROM_EMAIL || "Salman Mubashir <contact@salman-mubashir.site>";
    const finalSubject = subject ? `Portfolio: ${subject}` : "Portfolio message";

    const html = `
      <div style="font-family:Arial,sans-serif;line-height:1.5">
        <h2>New portfolio message</h2>
        <p><b>Name:</b> ${escapeHtml(name)}</p>
        <p><b>Email:</b> ${escapeHtml(email)}</p>
        <p><b>Subject:</b> ${escapeHtml(subject || "-")}</p>
        <hr/>
        <p style="white-space:pre-wrap">${escapeHtml(message)}</p>
      </div>
    `;

    const { error } = await resend.emails.send({
      from,
      to,
      subject: finalSubject,
      replyTo: email, // ✅ correct field
      html
    });

    if (error)
      return NextResponse.json({ ok: false, error: "Email send failed." }, { status: 500 });

    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json({ ok: false, error: "Bad request." }, { status: 400 });
  }
}