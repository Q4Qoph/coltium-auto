"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Check, Loader2, Smartphone } from "lucide-react";
import { Button, Card, CardHeader, CardTitle, CardDescription, CardContent, Modal, Input, Label } from "@/components/ui";
import { useSubscriptionPlans, useCreateSubscription, usePaymentStatus } from "@/lib/hooks";
import { useOptionalAuth } from "@/lib/auth-context";
import type { SubscriptionPlan } from "@/types";

export default function PricingPage() {
  const auth = useOptionalAuth();
  const { data: plans = [], isLoading } = useSubscriptionPlans();
  const createSubscription = useCreateSubscription();
  const [subscribePlan, setSubscribePlan] = useState<SubscriptionPlan | null>(null);
  const [phoneNumber, setPhoneNumber] = useState("");
  const [interval, setInterval] = useState<"monthly" | "yearly">("monthly");
  const [pendingPayment, setPendingPayment] = useState<{ checkoutRequestId: string; customerMessage: string } | null>(null);
  const [error, setError] = useState("");

  const { data: paymentStatus, isSuccess: paymentCompleted } = usePaymentStatus(pendingPayment?.checkoutRequestId ?? null);

  const planList = Array.isArray(plans) ? plans : [];
  const displayPlans = planList.length > 0 ? planList : [
    { id: "starter", name: "Starter", slug: "starter", description: "Basic inspections", priceMonthly: 19.99, priceYearly: 199.99, features: ["5 inspections/year", "Basic report"], inspectionLimit: 5 },
    { id: "pro", name: "Pro", slug: "pro", description: "Full diagnostic oversight", priceMonthly: 39.99, priceYearly: 399.99, features: ["Unlimited inspections", "Full diagnostic report", "Priority support"], inspectionLimit: undefined },
  ] as SubscriptionPlan[];

  const openSubscribeModal = (plan: SubscriptionPlan) => {
    setSubscribePlan(plan);
    setPhoneNumber(auth?.user?.phone ?? "");
    setInterval("monthly");
    setPendingPayment(null);
    setError("");
  };

  const closeModal = () => {
    setSubscribePlan(null);
    setPendingPayment(null);
    setError("");
  };

  const handleSubscribe = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!subscribePlan) return;
    setError("");
    try {
      const res = await createSubscription.mutateAsync({
        planId: subscribePlan.id,
        interval,
        phoneNumber: phoneNumber.trim(),
      });
      setPendingPayment({
        checkoutRequestId: res.payment.checkoutRequestId,
        customerMessage: res.payment.customerMessage,
      });
    } catch (err: unknown) {
      setError((err as { message?: string })?.message ?? "Failed to start payment");
    }
  };

  useEffect(() => {
    if (paymentStatus?.payment?.status === "completed") {
      closeModal();
    }
  }, [paymentStatus?.payment?.status]);

  if (isLoading) {
    return (
      <div className="bg-black text-white min-h-screen">
        <div className="pt-32 pb-20 px-6 container mx-auto max-w-5xl space-y-12">
          <div className="space-y-3">
            <div className="h-8 w-64 mx-auto rounded-md bg-slate-200 animate-pulse" />
            <div className="h-4 w-96 mx-auto rounded-md bg-slate-100 animate-pulse" />
          </div>
          <div className="grid gap-8 md:grid-cols-3">
            {Array.from({ length: 3 }).map((_, i) => (
              <div
                key={i}
                className="h-64 w-full rounded-lg bg-slate-100 border border-slate-100 animate-pulse"
              />
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-black text-white min-h-screen">
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
                Pay with M-Pesa. Choose a plan and complete payment on your phone.
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
                          variant={plan.slug === "pro" ? "primary" : "outline"}
                          onClick={() => openSubscribeModal(plan)}
                        >
                          Subscribe with M-Pesa
                        </Button>
                      ) : (
                        <Link href="/signup">
                          <Button
                            className="w-full"
                            variant={plan.slug === "pro" ? "primary" : "outline"}
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
              oversight and reports only. Payment via M-Pesa.
            </p>
          </div>
        </div>
      </div>

      <Modal
        open={!!subscribePlan}
        onClose={closeModal}
        title="Subscribe with M-Pesa"
        description={subscribePlan ? `${subscribePlan.name} plan` : undefined}
      >
        {subscribePlan && (
          <div className="space-y-4">
            {!pendingPayment ? (
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
                  <Label htmlFor="phone">M-Pesa phone number</Label>
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
                  Send payment request to phone
                </Button>
              </form>
            ) : (
              <div className="space-y-4 text-center py-4">
                <div className="flex justify-center">
                  <Smartphone className="h-12 w-12 text-[var(--primary)]" />
                </div>
                <p className="text-zinc-300">{pendingPayment.customerMessage}</p>
                <p className="text-sm text-zinc-500">
                  Enter your M-Pesa PIN on your phone to complete payment. This window will update automatically.
                </p>
                {paymentStatus?.payment?.status === "completed" && (
                  <p className="text-green-500 font-medium">Payment successful. Your subscription is active.</p>
                )}
                {paymentStatus?.payment?.status === "failed" && (
                  <p className="text-red-500">Payment failed. Please try again or use a different number.</p>
                )}
                <div className="flex justify-center">
                  <Loader2 className="h-6 w-6 animate-pulse text-[var(--primary)]" />
                </div>
              </div>
            )}
          </div>
        )}
      </Modal>
    </div>
  );
}
