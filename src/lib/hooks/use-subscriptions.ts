"use client";

import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { subscriptionsApi } from "@/lib/api";

export const subscriptionKeys = {
  all: ["subscriptions"] as const,
  plans: () => [...subscriptionKeys.all, "plans"] as const,
  mine: () => [...subscriptionKeys.all, "mine"] as const,
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
