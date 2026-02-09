"use client";

import Link from "next/link";
import { Button } from "@/components/ui";

export default function AboutPage() {
  return (
    <div className="pt-32 pb-20 px-6">
      <div className="container mx-auto max-w-3xl">
        <h1 className="text-4xl font-bold mb-6">About Coltium-Auto</h1>
        <p className="text-zinc-400 text-lg mb-6">
          Coltium-Auto is an independent, mobile vehicle diagnostic and technical oversight service.
          We provide professional, high-accuracy diagnosis for modern vehicles — without selling repairs or parts.
        </p>
        <div className="space-y-4 text-zinc-300 mb-10">
          <p>
            Our role is simple: diagnose vehicles correctly, explain findings clearly, and guide owners and
            organisations toward informed decisions before money is spent on repairs.
          </p>
          <p>
            We operate like a medical diagnostic practice, but for vehicles. We do not work for garages,
            insurers, or warranty providers. Our only incentive is technical accuracy and your long-term interest.
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
  );
}
