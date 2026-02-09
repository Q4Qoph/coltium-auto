"use client";

import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { reportsApi } from "@/lib/api";

export const reportKeys = {
  all: ["reports"] as const,
  list: (params?: { vehicleId?: string; inspectionId?: string }) =>
    [...reportKeys.all, "list", params] as const,
  detail: (id: string) => [...reportKeys.all, id] as const,
};

export function useReports(params?: { vehicleId?: string; inspectionId?: string }) {
  return useQuery({
    queryKey: reportKeys.list(params),
    queryFn: () => reportsApi.list(params),
  });
}

export function useReport(id: string | null) {
  return useQuery({
    queryKey: reportKeys.detail(id ?? ""),
    queryFn: () => (id ? reportsApi.get(id) : Promise.reject(new Error("No id"))),
    enabled: !!id,
  });
}

export function useUploadReport() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ inspectionId, formData }: { inspectionId: string; formData: FormData }) =>
      reportsApi.upload(inspectionId, formData),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: reportKeys.all });
      queryClient.invalidateQueries({ queryKey: ["inspections"] });
    },
  });
}
