"use client";

import Link from "next/link";
import { useWebsiteTheme } from "@/lib/website-theme";

export default function PricingConfirmationPage() {
  const { theme } = useWebsiteTheme();

  return (
    <div className={theme === "dark" ? "bg-black text-white min-h-screen" : "bg-white text-slate-900 min-h-screen"}>
      <div className="pt-32 pb-20 container mx-auto px-6 flex flex-col items-center text-center max-w-2xl">
        <h1 className="text-3xl md:text-4xl font-bold mb-4">
          Thank you for subscribing
        </h1>
        <p className={theme === "dark" ? "text-gray-300 mb-4" : "text-slate-700 mb-4"}>
          Your subscription request has been received.
        </p>
        <p className={theme === "dark" ? "text-gray-400 mb-8" : "text-slate-600 mb-8"}>
          One of our technical team members will reach out to you shortly to confirm details, arrange payment (usually via M-Pesa),
          and activate your subscription. You can continue using your dashboard while we process your request.
        </p>
        <div className="flex flex-col sm:flex-row gap-4">
          <Link href="/dashboard">
            <span className="inline-flex items-center justify-center px-6 py-3 rounded-full bg-[var(--primary)] text-white text-sm font-medium">
              Go to dashboard
            </span>
          </Link>
          <Link href="/pricing">
            <span className="inline-flex items-center justify-center px-6 py-3 rounded-full border border-slate-300 text-sm font-medium">
              Back to pricing
            </span>
          </Link>
        </div>
      </div>
    </div>
  );
}

