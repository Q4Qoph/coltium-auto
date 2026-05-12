"use client";

import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { usersApi, techniciansApi, adminPlansApi, adminContactMessagesApi } from "@/lib/api";
import { subscriptionKeys } from "./use-subscriptions";

export const userKeys = {
  all: ["users"] as const,
  list: (params?: Record<string, string>) => [...userKeys.all, "list", params] as const,
};

export const technicianKeys = {
  all: ["technicians"] as const,
  list: () => [...technicianKeys.all, "list"] as const,
};

export const adminPlanKeys = {
  all: ["admin", "plans"] as const,
  list: () => [...adminPlanKeys.all, "list"] as const,
};

export const adminContactMessageKeys = {
  all: ["admin", "contact-messages"] as const,
  list: () => [...adminContactMessageKeys.all, "list"] as const,
};

export function useUsers(params?: { page?: number; limit?: number; role?: string }) {
  return useQuery({
    queryKey: userKeys.list(params as Record<string, string>),
    queryFn: () => usersApi.list(params),
  });
}

export function useTechnicians() {
  return useQuery({
    queryKey: technicianKeys.list(),
    queryFn: () => techniciansApi.list(),
  });
}

export function useCreateTechnician() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (body: Parameters<typeof techniciansApi.create>[0]) =>
      techniciansApi.create(body),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: technicianKeys.all });
    },
  });
}

export function useAdminPlans() {
  return useQuery({
    queryKey: adminPlanKeys.list(),
    queryFn: () => adminPlansApi.list(),
  });
}

export function useCreatePlan() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (body: Parameters<typeof adminPlansApi.create>[0]) =>
      adminPlansApi.create(body),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: adminPlanKeys.all });
      queryClient.invalidateQueries({ queryKey: subscriptionKeys.plans() });
    },
  });
}

export function useUpdatePlan() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, body }: { id: string; body: Parameters<typeof adminPlansApi.update>[1] }) =>
      adminPlansApi.update(id, body),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: adminPlanKeys.all });
      queryClient.invalidateQueries({ queryKey: subscriptionKeys.plans() });
    },
  });
}

export function useAdminContactMessages() {
  return useQuery({
    queryKey: adminContactMessageKeys.list(),
    queryFn: () => adminContactMessagesApi.list(),
  });
}
