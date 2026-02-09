"use client";

import Link from "next/link";
import { Check } from "lucide-react";
import { Button, Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui";
import { useSubscriptionPlans } from "@/lib/hooks";
import type { SubscriptionPlan } from "@/types";

export default function PricingPage() {
  const { data: plans = [], isLoading } = useSubscriptionPlans();
  const planList = Array.isArray(plans) ? plans : [];

  // Fallback plans when API is not available
  const displayPlans = planList.length > 0 ? planList : [
    {
      id: "on-call",
      name: "On-Call Diagnostic",
      slug: "on-call",
      description: "Pay per inspection when you need oversight.",
      priceMonthly: 0,
      features: ["One-off inspections", "Full diagnostic report", "Severity ranking", "Recommendations"],
      inspectionLimit: undefined,
    },
    {
      id: "vehicle-health",
      name: "Vehicle Health",
      slug: "vehicle-health",
      description: "Regular health checks for your vehicle.",
      priceMonthly: 4999,
      priceYearly: 49990,
      features: ["2 inspections per year", "Preventive health checks", "Early fault detection", "Priority support"],
      inspectionLimit: 2,
    },
    {
      id: "fleet",
      name: "Fleet Oversight",
      slug: "fleet",
      description: "For organisations with multiple vehicles.",
      priceMonthly: 14999,
      priceYearly: 149990,
      features: ["Unlimited vehicles", "Routine diagnostics", "Fleet dashboard", "Dedicated support"],
      inspectionLimit: undefined,
    },
  ] as SubscriptionPlan[];

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center pt-32">
        <div className="animate-spin h-8 w-8 border-2 border-[var(--primary)] border-t-transparent rounded-full" />
      </div>
    );
  }

  return (
    <div className="pt-32 pb-20 px-6">
      <div className="container mx-auto max-w-5xl">
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Subscription plans</h1>
          <p className="text-zinc-400 text-lg max-w-2xl mx-auto">
            Access professional diagnostic oversight. Choose the plan that matches how often you need us.
          </p>
        </div>

        <div className="grid gap-8 md:grid-cols-3">
          {displayPlans.map((plan) => (
            <Card key={plan.id} className="flex flex-col">
              <CardHeader>
                <CardTitle>{plan.name}</CardTitle>
                <CardDescription>{plan.description}</CardDescription>
                <div className="mt-4">
                  {plan.priceMonthly === 0 ? (
                    <span className="text-2xl font-bold">Pay per inspection</span>
                  ) : (
                    <>
                      <span className="text-2xl font-bold">KES {plan.priceMonthly?.toLocaleString()}</span>
                      <span className="text-zinc-500">/month</span>
                      {plan.priceYearly != null && (
                        <p className="text-sm text-zinc-500 mt-1">
                          or KES {plan.priceYearly.toLocaleString()}/year
                        </p>
                      )}
                    </>
                  )}
                </div>
              </CardHeader>
              <CardContent className="flex-1 flex flex-col">
                <ul className="space-y-3 mb-6">
                  {plan.features.map((f, i) => (
                    <li key={i} className="flex items-center gap-2 text-sm text-zinc-300">
                      <Check className="h-4 w-4 text-[var(--primary)] shrink-0" />
                      {f}
                    </li>
                  ))}
                </ul>
                <div className="mt-auto">
                  <Link href={plan.priceMonthly === 0 ? "/dashboard/inspections" : "/signup"}>
                    <Button className="w-full" variant={plan.slug === "vehicle-health" ? "primary" : "outline"}>
                      {plan.priceMonthly === 0 ? "Request inspection" : "Subscribe"}
                    </Button>
                  </Link>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <p className="text-center text-zinc-500 text-sm mt-12">
          Coltium-Auto does not repair vehicles or sell parts. Subscription grants access to diagnostic oversight and reports only.
        </p>
      </div>
    </div>
  );
}
