"use client";

import Link from "next/link";
import { Button } from "@/components/ui";
import { useWebsiteTheme } from "@/lib/website-theme";

export default function AboutPage() {
  const { theme } = useWebsiteTheme();

  return (
    <div className={theme === "dark" ? "bg-black text-white min-h-screen" : "bg-white text-slate-900 min-h-screen"}>
      <div className="pt-12 pb-20 px-6 container mx-auto">
        <div className="flex flex-col md:flex-row">
          <div className="md:w-1/5">
            <div className="flex items-center mb-8">
              <div className="w-10 h-px bg-[var(--primary)] mr-3"></div>
              <span className={`text-sm uppercase tracking-wider ${theme === "dark" ? "text-gray-400" : "text-slate-500"}`}>About</span>
            </div>
          </div>

          <div className="md:w-4/5 max-w-3xl">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              Independent vehicle diagnostic oversight — like a medical diagnostic practice, but for cars.
            </h1>
            <div className={`space-y-4 mb-10 ${theme === "dark" ? "text-zinc-300" : "text-slate-600"}`}>
              <p>
                Modern vehicles are complex systems of software, electronics, sensors, and mechanical components.
                In this environment, rushed diagnosis and guesswork are common — and parts are often replaced
                without addressing the real root cause.
              </p>
              <p>
                Coltium-Auto fills the missing role of a neutral, professional diagnostic authority. We focus
                solely on technical truth: what is really wrong, how severe it is, and what should — and should not —
                be done next.
              </p>
            </div>
            <div className="flex flex-wrap gap-4">
              <Link href="/services">
                <Button>View services</Button>
              </Link>
              <Link href="/pricing">
                <Button variant="outline">Pricing & plans</Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
