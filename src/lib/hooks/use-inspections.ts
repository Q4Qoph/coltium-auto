"use client";

import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { inspectionsApi } from "@/lib/api";

export const inspectionKeys = {
  all: ["inspections"] as const,
  list: (params?: { status?: string; vehicleId?: string }) =>
    [...inspectionKeys.all, "list", params] as const,
  listAssigned: () => [...inspectionKeys.all, "assigned"] as const,
  detail: (id: string) => [...inspectionKeys.all, id] as const,
};

export function useInspections(params?: { status?: string; vehicleId?: string }) {
  return useQuery({
    queryKey: inspectionKeys.list(params),
    queryFn: () => inspectionsApi.list(params),
  });
}

export function useAssignedInspections() {
  return useQuery({
    queryKey: inspectionKeys.listAssigned(),
    queryFn: () => inspectionsApi.listAssigned(),
  });
}

export function useInspection(id: string | null) {
  return useQuery({
    queryKey: inspectionKeys.detail(id ?? ""),
    queryFn: () => (id ? inspectionsApi.get(id) : Promise.reject(new Error("No id"))),
    enabled: !!id,
  });
}

export function useCreateInspection() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (body: Parameters<typeof inspectionsApi.create>[0]) =>
      inspectionsApi.create(body),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: inspectionKeys.all });
    },
  });
}

export function useAssignInspection() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, technicianId }: { id: string; technicianId: string }) =>
      inspectionsApi.assign(id, technicianId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: inspectionKeys.all });
    },
  });
}

export function useStartInspection() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: string) => inspectionsApi.start(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: inspectionKeys.all });
    },
  });
}

export function useCompleteInspection() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: string) => inspectionsApi.complete(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: inspectionKeys.all });
    },
  });
}
