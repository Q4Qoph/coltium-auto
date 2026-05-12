"use client";

import { useState } from "react";
import { Button, Input, Label } from "@/components/ui";
import { useWebsiteTheme } from "@/lib/website-theme";
import { contactMessagesApi } from "@/lib/api";

export default function ContactForm() {
  const { theme } = useWebsiteTheme();
  const isDark = theme === "dark";
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    setSuccess(false);
    setLoading(true);
    try {
      await contactMessagesApi.submit({
        name: name.trim(),
        email: email.trim(),
        phone: phone.trim() || undefined,
        message: message.trim(),
      });
      setSuccess(true);
      setName("");
      setEmail("");
      setPhone("");
      setMessage("");
    } catch (err: unknown) {
      setError((err as { message?: string })?.message ?? "Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  const muted = isDark ? "text-zinc-400" : "text-slate-600";
  const fieldBg = isDark ? "bg-zinc-900 border-zinc-700 text-white" : "bg-white border-slate-200 text-slate-900";

  return (
    <form onSubmit={handleSubmit} className="w-full space-y-5">
      <div>
        <h3 className={`text-xl font-semibold mb-1 ${isDark ? "text-white" : "text-slate-900"}`}>
          Send us a message
        </h3>
        <p className={`text-sm ${muted}`}>
          We read every inquiry and will get back to you as soon as we can.
        </p>
      </div>

      {error && (
        <div
          className={`rounded-md border px-3 py-2 text-sm ${
            isDark ? "border-red-800 bg-red-950/40 text-red-200" : "border-red-200 bg-red-50 text-red-800"
          }`}
        >
          {error}
        </div>
      )}
      {success && (
        <div
          className={`rounded-md border px-3 py-2 text-sm ${
            isDark ? "border-emerald-800 bg-emerald-950/40 text-emerald-200" : "border-emerald-200 bg-emerald-50 text-emerald-900"
          }`}
        >
          Thank you — your message was sent. Our team will reply shortly.
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-5">
        <div className="space-y-2">
          <Label htmlFor="contact-name" className={isDark ? "text-zinc-200" : undefined}>
            Name
          </Label>
          <Input
            id="contact-name"
            className={fieldBg}
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            autoComplete="name"
            maxLength={200}
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="contact-email" className={isDark ? "text-zinc-200" : undefined}>
            Email
          </Label>
          <Input
            id="contact-email"
            type="email"
            className={fieldBg}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            autoComplete="email"
            maxLength={320}
          />
        </div>
        <div className="space-y-2 md:col-span-2">
          <Label htmlFor="contact-phone" className={isDark ? "text-zinc-200" : undefined}>
            Phone <span className={muted}>(optional)</span>
          </Label>
          <Input
            id="contact-phone"
            type="tel"
            className={fieldBg}
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            autoComplete="tel"
            maxLength={40}
          />
        </div>
        <div className="space-y-2 md:col-span-2">
          <Label htmlFor="contact-message" className={isDark ? "text-zinc-200" : undefined}>
            Message
          </Label>
          <textarea
            id="contact-message"
            required
            rows={5}
            maxLength={8000}
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            className={`w-full rounded-md border px-3 py-2 text-sm shadow-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--primary)] ${fieldBg}`}
            placeholder="How can we help?"
          />
        </div>
      </div>
      <Button type="submit" loading={loading} className={isDark ? "bg-[var(--primary)] text-black hover:opacity-90" : undefined}>
        Submit
      </Button>
    </form>
  );
}
