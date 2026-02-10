"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { Button, Card, CardHeader, CardTitle, CardDescription, CardContent, Badge, Modal, Select } from "@/components/ui";
import { Input, Label } from "@/components/ui";
import { useInspections, useVehicles, useCreateInspection } from "@/lib/hooks";
import { formatDate, inspectionStatusLabel } from "@/lib/utils";

export default function InspectionsPage() {
  const searchParams = useSearchParams();
  const vehicleIdParam = searchParams.get("vehicleId");
  const {
    data: inspections = [],
    isLoading: inspectionsLoading,
    error: inspectionsError,
  } = useInspections();
  const {
    data: vehicles = [],
    isLoading: vehiclesLoading,
    error: vehiclesError,
  } = useVehicles();
  const createInspection = useCreateInspection();
  const [modalOpen, setModalOpen] = useState(!!vehicleIdParam);
  const [form, setForm] = useState({ vehicleId: vehicleIdParam ?? "", scheduledAt: "", notes: "" });
  const [error, setError] = useState("");

  const inspectionList = Array.isArray(inspections) ? inspections : [];
  const vehicleList = Array.isArray(vehicles) ? vehicles : [];
  const errorState = inspectionsError || vehiclesError;
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState<"" | "pending" | "assigned" | "in_progress" | "completed">("");

  const filtered = inspectionList.filter((inv) => {
    const term = search.toLowerCase();
    const matchesSearch =
      !term ||
      inv.vehicle?.make?.toLowerCase().includes(term) ||
      inv.vehicle?.model?.toLowerCase().includes(term) ||
      inv.vehicle?.registrationNumber?.toLowerCase().includes(term);
    const matchesStatus = !statusFilter || inv.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  useEffect(() => {
    if (vehicleIdParam) {
      setForm((f) => ({ ...f, vehicleId: vehicleIdParam }));
      setModalOpen(true);
    }
  }, [vehicleIdParam]);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    createInspection.mutate(
      {
        vehicleId: form.vehicleId,
        scheduledAt: form.scheduledAt || undefined,
        notes: form.notes || undefined,
      },
      {
        onSuccess: () => {
          setModalOpen(false);
          setForm({ vehicleId: "", scheduledAt: "", notes: "" });
        },
        onError: (err: { message?: string }) => {
          setError(err?.message ?? "Failed to request inspection");
        },
      }
    );
  }

  const loading = inspectionsLoading || vehiclesLoading;
  const statusVariant = (s: string) =>
    s === "completed" ? "success" : s === "in_progress" ? "warning" : "default";

  if (loading && !errorState) {
    return (
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <div className="h-6 w-40 rounded-md bg-slate-200 animate-pulse" />
            <div className="mt-2 h-4 w-64 rounded-md bg-slate-100 animate-pulse" />
          </div>
          <div className="h-9 w-32 rounded-md bg-slate-200 animate-pulse" />
        </div>
        <Card>
          <CardHeader>
            <div className="h-5 w-32 rounded-md bg-slate-200 animate-pulse mb-2" />
            <div className="h-4 w-56 rounded-md bg-slate-100 animate-pulse" />
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              {Array.from({ length: 5 }).map((_, i) => (
                <div
                  key={i}
                  className="h-10 w-full rounded-md bg-slate-100 border border-slate-100 animate-pulse"
                />
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">Inspections</h1>
          <p className="text-zinc-400 mt-1">Request and track diagnostic inspections.</p>
        </div>
        <Button onClick={() => setModalOpen(true)} disabled={vehicleList.length === 0}>
          Request inspection
        </Button>
      </div>

      {errorState && (
        <div className="rounded-md border border-red-800 bg-red-900/30 px-3 py-2 text-sm text-red-200">
          {(errorState as { message?: string }).message ?? "Failed to load inspections or vehicles."}
        </div>
      )}

      {vehicleList.length === 0 && (
        <Card>
          <CardContent className="py-8 text-center text-zinc-500">
            Add a vehicle first to request an inspection.{" "}
            <Link href="/dashboard/vehicles" className="text-[var(--primary)] hover:underline">
              Go to Vehicles
            </Link>
          </CardContent>
        </Card>
      )}

      <Card>
        <CardHeader>
          <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
            <div>
              <CardTitle>Inspection history</CardTitle>
              <CardDescription>Status: Pending → Assigned → In progress → Completed</CardDescription>
            </div>
            <div className="flex flex-col md:flex-row gap-3 w-full md:w-auto">
              <div className="flex-1 space-y-1">
                <Label className="text-xs uppercase tracking-wide text-slate-500">Search</Label>
                <Input
                  placeholder="Search by vehicle..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                />
              </div>
              <div className="w-full md:w-48 space-y-1">
                <Label className="text-xs uppercase tracking-wide text-slate-500">Status</Label>
                <Select
                  value={statusFilter}
                  onChange={(e) =>
                    setStatusFilter(
                      e.target.value as "" | "pending" | "assigned" | "in_progress" | "completed"
                    )
                  }
                >
                  <option value="">All statuses</option>
                  <option value="pending">Pending</option>
                  <option value="assigned">Assigned</option>
                  <option value="in_progress">In progress</option>
                  <option value="completed">Completed</option>
                </Select>
              </div>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          {filtered.length === 0 ? (
            <p className="text-zinc-500 text-sm">No inspections yet.</p>
          ) : (
            <ul className="divide-y divide-zinc-800">
              {filtered.map((inv) => (
                <li key={inv.id} className="py-4 flex items-center justify-between">
                  <div>
                    <p className="font-medium">
                      {inv.vehicle?.make} {inv.vehicle?.model} ({inv.vehicle?.year})
                    </p>
                    <p className="text-sm text-zinc-500">
                      Requested {formatDate(inv.requestedAt)}
                      {inv.scheduledAt && ` · Scheduled ${formatDate(inv.scheduledAt)}`}
                    </p>
                  </div>
                  <div className="flex items-center gap-2">
                    <Badge variant={statusVariant(inv.status)}>
                      {inspectionStatusLabel(inv.status)}
                    </Badge>
                    {inv.status === "completed" && inv.reportId && (
                      <Link href={`/dashboard/reports?reportId=${inv.reportId}`}>
                        <Button variant="outline" size="sm">View report</Button>
                      </Link>
                    )}
                  </div>
                </li>
              ))}
            </ul>
          )}
        </CardContent>
      </Card>

      <Modal open={modalOpen} onClose={() => setModalOpen(false)} title="Request inspection">
        <form onSubmit={handleSubmit} className="space-y-4">
          {error && <p className="text-sm text-red-500">{error}</p>}
          <div className="space-y-2">
            <Label>Vehicle</Label>
            <Select
              value={form.vehicleId}
              onChange={(e) => setForm((f) => ({ ...f, vehicleId: e.target.value }))}
              required
            >
              <option value="">Select vehicle</option>
              {vehicleList.map((v) => (
                <option key={v.id} value={v.id}>
                  {v.year} {v.make} {v.model}
                </option>
              ))}
            </Select>
          </div>
          <div className="space-y-2">
            <Label>Preferred date (optional)</Label>
            <Input
              type="date"
              value={form.scheduledAt}
              onChange={(e) => setForm((f) => ({ ...f, scheduledAt: e.target.value }))}
            />
          </div>
          <div className="space-y-2">
            <Label>Notes (optional)</Label>
            <textarea
              className="flex min-h-[80px] w-full rounded-md border border-slate-300 bg-white px-3 py-2 text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-[var(--primary)]"
              value={form.notes}
              onChange={(e) => setForm((f) => ({ ...f, notes: e.target.value }))}
              placeholder="e.g. Check engine light on"
            />
          </div>
          <div className="flex justify-end gap-2 pt-4">
            <Button type="button" variant="outline" onClick={() => setModalOpen(false)}>
              Cancel
            </Button>
            <Button type="submit" loading={createInspection.isPending}>Request inspection</Button>
          </div>
        </form>
      </Modal>
    </div>
  );
}
