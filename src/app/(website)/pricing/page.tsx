"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Check } from "lucide-react";
import { Button, Card, CardHeader, CardTitle, CardDescription, CardContent, Modal, Input, Label } from "@/components/ui";
import { useSubscriptionPlans, useCreateSubscription } from "@/lib/hooks";
import { useOptionalAuth } from "@/lib/auth-context";
import { useWebsiteTheme } from "@/lib/website-theme";
import type { SubscriptionPlan } from "@/types";

export default function PricingPage() {
  const auth = useOptionalAuth();
  const router = useRouter();
  const { data: plans = [], isLoading } = useSubscriptionPlans();
  const createSubscription = useCreateSubscription();
  const [subscribePlan, setSubscribePlan] = useState<SubscriptionPlan | null>(null);
  const [phoneNumber, setPhoneNumber] = useState("");
  const [interval, setInterval] = useState<"monthly" | "yearly">("monthly");
  const [error, setError] = useState("");

  const planList = Array.isArray(plans) ? plans : [];
  const displayPlans = planList.length > 0 ? planList : [
    { id: "standard", name: "Personal Vehicle Health Plan – Standard", slug: "standard", description: "For private vehicle owners who want preventive monitoring.", priceMonthly: 1400, priceYearly: 14000, features: ["One preventive diagnostic every 6 months", "10% discount on additional on-demand visits", "Priority booking", "Digital service history access"] },
    { id: "plus", name: "Personal Vehicle Health Plan – Plus", slug: "plus", description: "Enhanced preventive monitoring with second-opinion support.", priceMonthly: 2000, priceYearly: 20000, features: ["One preventive diagnostic every 4 months", "15% discount on additional visits", "Second-opinion support included", "Priority scheduling", "Digital service history"] },
    { id: "premium", name: "Personal Vehicle Health Plan – Premium", slug: "premium", description: "Highest tier with insurance and warranty diagnostic eligibility.", priceMonthly: 2800, priceYearly: 28000, features: ["One preventive diagnostic every 3 months", "20% discount on additional visits", "Insurance and warranty diagnostic eligibility", "Highest priority scheduling", "Dedicated advisory support", "Digital service history"] },
  ] as SubscriptionPlan[];

  const openSubscribeModal = (plan: SubscriptionPlan) => {
    setSubscribePlan(plan);
    setPhoneNumber(auth?.user?.phone ?? "");
    setInterval("monthly");
    setError("");
  };

  const closeModal = () => {
    setSubscribePlan(null);
    setError("");
  };

  const handleSubscribe = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!subscribePlan) return;
    setError("");
    try {
      await createSubscription.mutateAsync({
        planId: subscribePlan.id,
        interval,
        phoneNumber: phoneNumber.trim(),
      });
      closeModal();
      router.push("/pricing/confirmation");
    } catch (err: unknown) {
      setError((err as { message?: string })?.message ?? "Failed to start payment");
    }
  };

  const { theme } = useWebsiteTheme();

  if (isLoading) {
    return (
      <div className={theme === "dark" ? "bg-black text-white min-h-screen" : "bg-white text-slate-900 min-h-screen"}>
        <div className="pt-32 pb-20 container mx-auto px-6">
          <div className="flex flex-col md:flex-row gap-8">
            {/* Left label skeleton */}
            <div className="md:w-1/5">
              <div className="flex items-center mb-8">
                <div className="w-10 h-px bg-[var(--primary)] mr-3" />
                <div
                  className={
                    theme === "dark"
                      ? "h-3 w-16 rounded bg-zinc-800 animate-pulse"
                      : "h-3 w-16 rounded bg-slate-200 animate-pulse"
                  }
                />
              </div>
            </div>

            {/* Right content skeleton */}
            <div className="md:w-4/5 space-y-8">
              <div className="space-y-3">
                <div
                  className={
                    theme === "dark"
                      ? "h-9 w-64 rounded bg-zinc-800 animate-pulse"
                      : "h-9 w-64 rounded bg-slate-200 animate-pulse"
                  }
                />
                <div
                  className={
                    theme === "dark"
                      ? "h-4 w-80 rounded bg-zinc-900 animate-pulse"
                      : "h-4 w-80 rounded bg-slate-100 animate-pulse"
                  }
                />
              </div>

              <div className="grid gap-8 md:grid-cols-3">
                {Array.from({ length: 3 }).map((_, i) => (
                  <div
                    key={i}
                    className={
                      theme === "dark"
                        ? "rounded-lg border border-zinc-800 bg-zinc-900 p-6 space-y-4 animate-pulse"
                        : "rounded-lg border border-slate-200 bg-white p-6 space-y-4 animate-pulse"
                    }
                  >
                    <div
                      className={
                        theme === "dark"
                          ? "h-5 w-24 rounded bg-zinc-800"
                          : "h-5 w-24 rounded bg-slate-200"
                      }
                    />
                    <div
                      className={
                        theme === "dark"
                          ? "h-4 w-32 rounded bg-zinc-800"
                          : "h-4 w-32 rounded bg-slate-200"
                      }
                    />
                    <div
                      className={
                        theme === "dark"
                          ? "h-6 w-28 rounded bg-zinc-700"
                          : "h-6 w-28 rounded bg-slate-300"
                      }
                    />
                    <div
                      className={
                        theme === "dark"
                          ? "h-3 w-20 rounded bg-zinc-800"
                          : "h-3 w-20 rounded bg-slate-200"
                      }
                    />
                    <div
                      className={
                        theme === "dark"
                          ? "h-10 w-full rounded-full bg-zinc-800"
                          : "h-10 w-full rounded-full bg-slate-200"
                      }
                    />
                  </div>
                ))}
              </div>

              <div
                className={
                  theme === "dark"
                    ? "h-3 w-80 rounded bg-zinc-900 animate-pulse"
                    : "h-3 w-80 rounded bg-slate-100 animate-pulse"
                }
              />
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={theme === "dark" ? "bg-black text-white min-h-screen" : "bg-white text-slate-900 min-h-screen"}>
      <div className="pt-32 pb-20 container mx-auto px-6">
        <div className="flex flex-col md:flex-row gap-8">
          {/* Left label column aligned with logo */}
          <div className="md:w-1/5">
            <div className="flex items-center mb-8">
              <div className="w-10 h-px bg-[var(--primary)] mr-3"></div>
              <span className="text-sm uppercase tracking-wider">Pricing</span>
            </div>
          </div>

          {/* Right content column slightly to the right */}
          <div className="md:w-4/5">
            <div className="mb-10">
              <h1 className="text-4xl md:text-5xl font-bold mb-4">
                Subscription plans
              </h1>
              <p className="text-zinc-400 text-lg max-w-2xl">
                Choose a plan and submit a subscription request. Our technical team will contact you to arrange payment and activation.
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
                          <span className="text-2xl font-bold">
                            KES {Number(plan.priceMonthly).toLocaleString()}
                          </span>
                          <span className="text-zinc-500">/month</span>
                          {plan.priceYearly != null && (
                            <p className="text-sm text-zinc-500 mt-1">
                              or KES {Number(plan.priceYearly).toLocaleString()}/year
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
                      {plan.priceMonthly === 0 ? (
                        <Link href="/dashboard/inspections">
                          <Button className="w-full" variant="outline">
                            Request inspection
                          </Button>
                        </Link>
                      ) : auth?.user ? (
                        <Button
                          className="w-full"
                          variant={plan.slug === "plus" ? "primary" : "outline"}
                          onClick={() => openSubscribeModal(plan)}
                        >
                          Request subscription
                        </Button>
                      ) : (
                        <Link href="/signup">
                          <Button
                            className="w-full"
                            variant={plan.slug === "plus" ? "primary" : "outline"}
                          >
                            Sign up to subscribe
                          </Button>
                        </Link>
                      )}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            <p className="text-zinc-500 text-sm mt-12">
              Coltium-Auto does not repair vehicles or sell parts. Subscription grants access to diagnostic
              oversight and reports only. Payment is arranged separately with our team (typically via M-Pesa).
            </p>
          </div>
        </div>
      </div>

      <Modal
        open={!!subscribePlan}
        onClose={closeModal}
        title="Request subscription"
        description={subscribePlan ? `${subscribePlan.name} plan` : undefined}
      >
        {subscribePlan && (
          <form onSubmit={handleSubscribe} className="space-y-4">
            <div>
              <Label>Billing</Label>
              <div className="flex gap-2 mt-2">
                <Button
                  type="button"
                  variant={interval === "monthly" ? "primary" : "outline"}
                  size="sm"
                  onClick={() => setInterval("monthly")}
                >
                  Monthly (KES {Number(subscribePlan.priceMonthly).toLocaleString()})
                </Button>
                {subscribePlan.priceYearly != null && (
                  <Button
                    type="button"
                    variant={interval === "yearly" ? "primary" : "outline"}
                    size="sm"
                    onClick={() => setInterval("yearly")}
                  >
                    Yearly (KES {Number(subscribePlan.priceYearly).toLocaleString()})
                  </Button>
                )}
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="phone">Contact phone number</Label>
              <Input
                id="phone"
                type="tel"
                placeholder="07XX XXX XXX or 2547XX XXX XXX"
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value)}
                required
              />
            </div>
            {error && (
              <p className="text-sm text-red-500">{error}</p>
            )}
            <Button
              type="submit"
              className="w-full"
              loading={createSubscription.isPending}
              disabled={!phoneNumber.trim()}
            >
              Submit subscription request
            </Button>
          </form>
        )}
      </Modal>
    </div>
  );
}
