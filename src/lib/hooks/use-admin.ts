"use client";

import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { usersApi, techniciansApi } from "@/lib/api";

export const userKeys = {
  all: ["users"] as const,
  list: (params?: Record<string, string>) => [...userKeys.all, "list", params] as const,
};

export const technicianKeys = {
  all: ["technicians"] as const,
  list: () => [...technicianKeys.all, "list"] as const,
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
