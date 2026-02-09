"use client";

import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { vehiclesApi } from "@/lib/api";
import type { Vehicle } from "@/types";

export const vehicleKeys = {
  all: ["vehicles"] as const,
  list: () => [...vehicleKeys.all, "list"] as const,
};

export function useVehicles() {
  return useQuery({
    queryKey: vehicleKeys.list(),
    queryFn: () => vehiclesApi.list(),
  });
}

export function useVehicle(id: string | null) {
  return useQuery({
    queryKey: [...vehicleKeys.all, id],
    queryFn: () => (id ? vehiclesApi.get(id) : Promise.reject(new Error("No id"))),
    enabled: !!id,
  });
}

export function useCreateVehicle() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (body: Parameters<typeof vehiclesApi.create>[0]) => vehiclesApi.create(body),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: vehicleKeys.list() });
    },
  });
}

export function useUpdateVehicle() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, body }: { id: string; body: Parameters<typeof vehiclesApi.update>[1] }) =>
      vehiclesApi.update(id, body),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: vehicleKeys.all });
    },
  });
}

export function useDeleteVehicle() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: string) => vehiclesApi.delete(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: vehicleKeys.list() });
    },
  });
}
