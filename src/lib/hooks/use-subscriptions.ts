"use client";

import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { subscriptionsApi, paymentsApi } from "@/lib/api";

export const subscriptionKeys = {
  all: ["subscriptions"] as const,
  plans: () => [...subscriptionKeys.all, "plans"] as const,
  mine: () => [...subscriptionKeys.all, "mine"] as const,
};

export const paymentKeys = {
  status: (checkoutRequestId: string) => ["payments", "status", checkoutRequestId] as const,
};

export function useSubscriptionPlans() {
  return useQuery({
    queryKey: subscriptionKeys.plans(),
    queryFn: () => subscriptionsApi.plans(),
  });
}

export function useMySubscription() {
  return useQuery({
    queryKey: subscriptionKeys.mine(),
    queryFn: () => subscriptionsApi.mine(),
  });
}

export function useCreateSubscription() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (body: { planId: string; interval: "monthly" | "yearly"; phoneNumber: string }) =>
      subscriptionsApi.create(body),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: subscriptionKeys.all });
    },
  });
}

/** Poll payment status (e.g. after STK push). Pass null to disable. */
export function usePaymentStatus(checkoutRequestId: string | null) {
  return useQuery({
    queryKey: paymentKeys.status(checkoutRequestId ?? ""),
    queryFn: () => (checkoutRequestId ? paymentsApi.getStatus(checkoutRequestId) : Promise.reject(new Error("No id"))),
    enabled: !!checkoutRequestId,
    refetchInterval: (data) =>
      (data as { payment?: { status?: string } } | undefined)?.payment?.status === "completed" ||
      (data as { payment?: { status?: string } } | undefined)?.payment?.status === "failed"
        ? false
        : 3000,
  });
}
