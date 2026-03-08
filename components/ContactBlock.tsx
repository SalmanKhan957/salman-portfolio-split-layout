"use client";

import { useState } from "react";
import { SITE } from "@/lib/content";
import { Phone, Linkedin, Mail, Send } from "lucide-react";

const WHATSAPP_NUMBER = "923205299646"; // Pakistan number (no +)

function isValidEmail(email: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email.trim());
}

export function ContactBlock() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState(""); // REQUIRED now (valid email)
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");

  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">("idle");
  const [errorMsg, setErrorMsg] = useState("");

  const onSend = async () => {
    setErrorMsg("");
    setStatus("idle");

    // Client-side validation (fast feedback)
    if (!name.trim()) return setErrorMsg("Name is required.");
    if (!isValidEmail(email)) return setErrorMsg("A valid email is required.");
    if (!message.trim() || message.trim().length < 10) return setErrorMsg("Message is too short.");

    setStatus("sending");

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name,
          email,
          subject,
          message,
          company: "" // honeypot for bots
        })
      });

      const data = await res.json().catch(() => ({}));

      if (!res.ok || !data.ok) {
        setStatus("error");
        setErrorMsg(data?.error || "Failed to send. Try again.");
        return;
      }

      setStatus("sent");
      setName("");
      setEmail("");
      setSubject("");
      setMessage("");
    } catch {
      setStatus("error");
      setErrorMsg("Network error. Try again.");
    }
  };

  const emailOk = isValidEmail(email);

  return (
    <div className="grid gap-6 md:grid-cols-2">
      {/* Left card */}
      <div className="rounded-3xl border border-ink-200 bg-ink-50 p-7 shadow-soft">
        <h3 className="text-4xl font-semibold tracking-tight text-ink-950">Contact Me</h3>

        <p className="mt-4 max-w-sm text-sm leading-relaxed text-ink-700">
          I read every message. If you’re hiring, collaborating, or want help shipping an AI product, send me a note.
        </p>

        <p className="mt-8 text-xs text-ink-500">
          Form sends directly to my inbox. You can also reach me here:
        </p>

        <div className="mt-3">
          <p className="text-sm font-semibold text-ink-900">Write me on my social networks</p>
          <div className="mt-4 flex items-center gap-3">
            <a
              href={`https://wa.me/${WHATSAPP_NUMBER}`}
              target="_blank"
              rel="noreferrer"
              className="inline-flex h-11 w-11 items-center justify-center rounded-2xl bg-ink-900 text-white hover:bg-ink-800 transition"
              aria-label="WhatsApp"
              title="WhatsApp"
            >
              <Phone className="h-5 w-5" />
            </a>

            <a
              href={SITE.linkedin}
              target="_blank"
              rel="noreferrer"
              className="inline-flex h-11 w-11 items-center justify-center rounded-2xl bg-white text-ink-900 border border-ink-200 hover:bg-ink-100 transition"
              aria-label="LinkedIn"
              title="LinkedIn"
            >
              <Linkedin className="h-5 w-5" />
            </a>

            <a
              href={`mailto:${SITE.email}`}
              className="inline-flex h-11 w-11 items-center justify-center rounded-2xl bg-white text-ink-900 border border-ink-200 hover:bg-ink-100 transition"
              aria-label="Email"
              title="Email"
            >
              <Mail className="h-5 w-5" />
            </a>
          </div>
        </div>
      </div>

      {/* Right form panel */}
      <div className="rounded-3xl bg-ink-950 p-7 text-white shadow-soft">
        <h3 className="text-xl font-semibold">Send Me A Message</h3>

        <div className="mt-5 grid gap-4 sm:grid-cols-2">
          <input
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Name *"
            className="h-12 rounded-2xl bg-white/10 px-4 text-sm text-white placeholder:text-white/50 border border-white/10 focus:border-white/30 outline-none"
          />

          <input
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email Address *"
            className="h-12 rounded-2xl bg-white/10 px-4 text-sm text-white placeholder:text-white/50 border border-white/10 focus:border-white/30 outline-none"
          />
        </div>

        <input
          value={subject}
          onChange={(e) => setSubject(e.target.value)}
          placeholder="Subject"
          className="mt-4 h-12 w-full rounded-2xl bg-white/10 px-4 text-sm text-white placeholder:text-white/50 border border-white/10 focus:border-white/30 outline-none"
        />

        <textarea
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Message *"
          rows={7}
          className="mt-4 w-full rounded-2xl bg-white/10 px-4 py-3 text-sm text-white placeholder:text-white/50 border border-white/10 focus:border-white/30 outline-none"
        />

        {errorMsg ? <p className="mt-3 text-sm text-red-300">{errorMsg}</p> : null}
        {status === "sent" ? <p className="mt-3 text-sm text-green-300">Message sent.</p> : null}

        <button
          onClick={onSend}
          disabled={status === "sending" || !name.trim() || !emailOk || !message.trim()}
          className="mt-6 inline-flex items-center gap-2 rounded-2xl bg-red-700 px-6 py-3 text-sm font-semibold hover:bg-red-600 disabled:opacity-50 disabled:cursor-not-allowed transition"
        >
          <Send className="h-4 w-4" />
          {status === "sending" ? "Sending..." : "Send Message"}
        </button>
      </div>
    </div>
  );
}