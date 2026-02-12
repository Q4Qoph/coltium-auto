"use client";

import { useState } from "react";
import Link from "next/link";
import {
  Button,
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  Badge,
  Modal,
  Select,
  Input,
  Label,
} from "@/components/ui";
import { useInspections, useCreateInspection, useMySubscription } from "@/lib/hooks";
import { formatDate, inspectionStatusLabel } from "@/lib/utils";
import type { ServiceType } from "@/types";

const SERVICE_OPTIONS: { id: ServiceType; label: string; requiresPlan: boolean }[] = [
  { id: "on_demand", label: "On-Demand Diagnostic Assessment (KES 6,500/visit)", requiresPlan: false },
  { id: "preventive", label: "Preventive Vehicle Health Check — plan-included (requires active plan)", requiresPlan: true },
  { id: "second_opinion", label: "Second-Opinion Diagnostic Review (KES 5,000/case)", requiresPlan: false },
  { id: "pre_purchase", label: "Pre-Purchase Diagnostic Inspection (KES 10,000/vehicle)", requiresPlan: false },
  { id: "insurance", label: "Insurance and Warranty Diagnostic Support (KES 18,000/case)", requiresPlan: false },
  { id: "fleet", label: "Fleet Diagnostic Oversight (custom pricing)", requiresPlan: false },
];

function serviceTypeLabel(st?: ServiceType | null): string {
  if (!st) return "—";
  const o = SERVICE_OPTIONS.find((s) => s.id === st);
  return o ? o.label.split(" (")[0] : st;
}

export default function InspectionsPage() {
  const { data: inspections = [], isLoading: inspectionsLoading, error: inspectionsError } = useInspections();
  const { data: subscription, isLoading: subLoading } = useMySubscription();
  const createInspection = useCreateInspection();

  const [modalOpen, setModalOpen] = useState(false);
  const [form, setForm] = useState<{ serviceType: ServiceType | ""; scheduledAt: string; notes: string }>({
    serviceType: "",
    scheduledAt: "",
    notes: "",
  });
  const [error, setError] = useState("");

  const inspectionList = Array.isArray(inspections) ? inspections : [];
  const hasActiveSubscription = (subscription as { status?: string } | null)?.status === "active";
  const selectedService = form.serviceType ? SERVICE_OPTIONS.find((s) => s.id === form.serviceType) : null;
  const needsPlanToProceed =
    selectedService?.requiresPlan === true && !hasActiveSubscription;

  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState<"" | "pending" | "assigned" | "in_progress" | "completed">("");

  const filtered = inspectionList.filter((inv) => {
    const term = search.toLowerCase();
    const matchesSearch =
      !term ||
      inv.notes?.toLowerCase().includes(term) ||
      serviceTypeLabel(inv.serviceType).toLowerCase().includes(term);
    const matchesStatus = !statusFilter || inv.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  function closeModal() {
    setModalOpen(false);
    setForm({ serviceType: "", scheduledAt: "", notes: "" });
    setError("");
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!form.serviceType) {
      setError("Please select a service.");
      return;
    }
    setError("");
    createInspection.mutate(
      {
        serviceType: form.serviceType,
        scheduledAt: form.scheduledAt || undefined,
        notes: form.notes || undefined,
      },
      {
        onSuccess: () => closeModal(),
        onError: (err: { message?: string }) => {
          setError(err?.message ?? "Failed to request inspection.");
        },
      }
    );
  }

  const loading = inspectionsLoading || subLoading;
  const statusVariant = (s: string) =>
    s === "completed" ? "success" : s === "in_progress" ? "warning" : "default";

  if (loading && !inspectionsError) {
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
          <p className="text-zinc-400 mt-1">
            Request a diagnostic service. Select the service type; we’ll confirm location and vehicle details with you.
          </p>
        </div>
        <Button onClick={() => setModalOpen(true)}>Request inspection</Button>
      </div>

      {inspectionsError && (
        <div className="rounded-md border border-red-800 bg-red-900/30 px-3 py-2 text-sm text-red-200">
          {(inspectionsError as { message?: string }).message ?? "Failed to load inspections."}
        </div>
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
                  placeholder="Search by service or notes..."
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
            <p className="text-zinc-500 text-sm">No inspections yet. Request a service to get started.</p>
          ) : (
            <ul className="divide-y divide-slate-200">
              {filtered.map((inv) => (
                <li key={inv.id} className="py-4 flex items-center justify-between">
                  <div>
                    <p className="font-medium">
                      {serviceTypeLabel(inv.serviceType)}
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

      <Modal open={modalOpen} onClose={closeModal} title="Request inspection">
        <div className="space-y-4">
          <p className="text-sm text-slate-600">
            All options are services. <strong>Plan-included services</strong> (e.g. Preventive Vehicle Health Check) require an active subscription plan; the rest are <strong>pay-per-service</strong> and do not require a plan.
          </p>

          <div className="space-y-2">
            <Label>Service</Label>
            <Select
              value={form.serviceType}
              onChange={(e) => setForm((f) => ({ ...f, serviceType: e.target.value as ServiceType }))}
            >
              <option value="">Select a service</option>
              {SERVICE_OPTIONS.map((opt) => (
                <option key={opt.id} value={opt.id}>
                  {opt.label}
                </option>
              ))}
            </Select>
          </div>

          {needsPlanToProceed && (
            <div className="rounded-lg border border-amber-200 bg-amber-50 p-4">
              <p className="text-sm text-amber-900">
                <strong>Preventive Vehicle Health Check</strong> is a plan-included service. You need an active subscription plan to use it. Subscribe or activate your plan first.
              </p>
              <div className="flex flex-wrap gap-2 mt-3">
                <Link href="/pricing">
                  <Button>View plans & subscribe</Button>
                </Link>
                <Button type="button" variant="outline" onClick={closeModal}>
                  Cancel
                </Button>
              </div>
            </div>
          )}

          {selectedService && !needsPlanToProceed && (
            <form onSubmit={handleSubmit} className="space-y-4 border-t border-slate-200 pt-4">
              {error && <p className="text-sm text-red-500">{error}</p>}
              <p className="text-sm text-slate-500">
                We’ll contact you to confirm location and vehicle details before the visit.
              </p>
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
                  placeholder="e.g. Check engine light on, or any other details"
                />
              </div>
              <div className="flex justify-end gap-2 pt-2">
                <Button type="button" variant="outline" onClick={closeModal}>
                  Cancel
                </Button>
                <Button type="submit" loading={createInspection.isPending}>
                  Request inspection
                </Button>
              </div>
            </form>
          )}

          {!form.serviceType && (
            <div className="flex justify-end">
              <Button type="button" variant="outline" onClick={closeModal}>
                Cancel
              </Button>
            </div>
          )}
        </div>
      </Modal>
    </div>
  );
}
