"use client";

import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { subscriptionsApi, paymentsApi, adminSubscriptionsApi, adminPaymentsApi } from "@/lib/api";
import type { AdminSubscriptionSummary } from "@/types";

export const subscriptionKeys = {
  all: ["subscriptions"] as const,
  plans: () => [...subscriptionKeys.all, "plans"] as const,
  mine: () => [...subscriptionKeys.all, "mine"] as const,
};

export const paymentKeys = {
  all: ["payments"] as const,
  mine: () => [...paymentKeys.all, "mine"] as const,
  status: (checkoutRequestId: string) => ["payments", "status", checkoutRequestId] as const,
};

export const adminPaymentKeys = {
  all: ["admin", "payments"] as const,
};

export function useSubscriptionPlans() {
  return useQuery({
    queryKey: subscriptionKeys.plans(),
    queryFn: () => subscriptionsApi.plans(),
  });
}

// —— Admin subscriptions —— 
export const adminSubscriptionKeys = {
  all: ["admin", "subscriptions"] as const,
};

export function useAdminSubscriptions() {
  return useQuery({
    queryKey: adminSubscriptionKeys.all,
    queryFn: () => adminSubscriptionsApi.list(),
  });
}

export function useUpdateSubscriptionStatus() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (args: { id: string; status: AdminSubscriptionSummary["status"] }) =>
      adminSubscriptionsApi.updateStatus(args.id, args.status),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: adminSubscriptionKeys.all });
      queryClient.invalidateQueries({ queryKey: subscriptionKeys.all });
    },
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

export function useMyPayments() {
  return useQuery({
    queryKey: paymentKeys.mine(),
    queryFn: () => paymentsApi.mine(),
  });
}

export function useAdminPayments() {
  return useQuery({
    queryKey: adminPaymentKeys.all,
    queryFn: () => adminPaymentsApi.list(),
  });
}

export function useCreateManualPayment() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (body: { userId: string; subscriptionId?: string; amount: number; status?: string; reference?: string }) =>
      adminPaymentsApi.createManual(body),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: adminPaymentKeys.all });
      queryClient.invalidateQueries({ queryKey: adminSubscriptionKeys.all });
      queryClient.invalidateQueries({ queryKey: subscriptionKeys.all });
      queryClient.invalidateQueries({ queryKey: paymentKeys.all });
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
