"use client";

import { useState } from "react";
import { ClipboardList, Wrench } from "lucide-react";
import {
  Button,
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  Badge,
  Modal,
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableHead,
  TableCell,
} from "@/components/ui";
import { Input, Label, Select } from "@/components/ui";
import type { Inspection } from "@/types";
import { useAssignedInspections, useStartInspection, useCompleteInspection, useUploadReport } from "@/lib/hooks";
import { formatDate, inspectionStatusLabel } from "@/lib/utils";

const initialUploadForm = {
  summary: "",
  severityRanking: "monitor" as "critical" | "monitor" | "informational",
  recommendations: "",
  file: null as File | null,
};

export default function TechnicianDashboardPage() {
  const { data: inspections = [], isLoading } = useAssignedInspections();
  const startInspection = useStartInspection();
  const completeInspection = useCompleteInspection();
  const uploadReport = useUploadReport();
  const [uploadModal, setUploadModal] = useState<Inspection | null>(null);
  const [uploadForm, setUploadForm] = useState(initialUploadForm);
  const [uploadError, setUploadError] = useState("");

  const list = Array.isArray(inspections) ? inspections : [];
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState<"" | "assigned" | "in_progress">("");

  const assignedAll = list.filter((i) => i.status === "assigned" || i.status === "in_progress");
  const assigned = assignedAll.filter((inv) => {
    const term = search.toLowerCase();
    const matchesSearch =
      !term ||
      inv.user?.name?.toLowerCase().includes(term) ||
      inv.user?.email?.toLowerCase().includes(term) ||
      inv.user?.phone?.toLowerCase().includes(term) ||
      (inv.notes?.toLowerCase().includes(term) ?? false);
    const matchesStatus = !statusFilter || inv.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  function handleStart(id: string) {
    startInspection.mutate(id);
  }

  function handleUpload(e: React.FormEvent) {
    e.preventDefault();
    if (!uploadModal) return;
    setUploadError("");
    const formData = new FormData();
    formData.append("summary", uploadForm.summary);
    formData.append("severityRanking", uploadForm.severityRanking);
    formData.append("recommendations", uploadForm.recommendations);
    if (uploadForm.file) formData.append("file", uploadForm.file);
    uploadReport.mutate(
      { inspectionId: uploadModal.id, formData },
      {
        onSuccess: () => {
          completeInspection.mutate(uploadModal.id);
          setUploadModal(null);
          setUploadForm(initialUploadForm);
        },
        onError: (err: { message?: string }) => {
          setUploadError(err?.message ?? "Upload failed");
        },
      }
    );
  }

  if (isLoading) {
    return (
      <div className="space-y-6">
        <div>
          <div className="h-6 w-56 rounded-md bg-slate-200 animate-pulse" />
          <div className="mt-2 h-4 w-80 rounded-md bg-slate-100 animate-pulse" />
        </div>
        <Card>
          <CardHeader>
            <div className="h-5 w-40 rounded-md bg-slate-200 animate-pulse mb-2" />
            <div className="h-4 w-72 rounded-md bg-slate-100 animate-pulse" />
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              {Array.from({ length: 4 }).map((_, i) => (
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
      <div className="flex items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold">Technician dashboard</h1>
          <p className="text-slate-500 mt-1">
            View your assigned inspections and upload diagnostic reports.
          </p>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <Card className="bg-gradient-to-br from-sky-50 to-white border-none shadow-sm">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-xs font-semibold tracking-wide text-sky-700 uppercase">
              Assigned jobs
            </CardTitle>
            <ClipboardList className="h-4 w-4 text-sky-500" />
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold text-slate-900">
              {assignedAll.filter((i) => i.status === "assigned").length}
            </p>
            <p className="text-sm text-slate-500">Waiting to be started.</p>
          </CardContent>
        </Card>
        <Card className="bg-gradient-to-br from-emerald-50 to-white border-none shadow-sm">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-xs font-semibold tracking-wide text-emerald-700 uppercase">
              In progress
            </CardTitle>
            <Wrench className="h-4 w-4 text-emerald-500" />
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold text-slate-900">
              {assignedAll.filter((i) => i.status === "in_progress").length}
            </p>
            <p className="text-sm text-slate-500">Currently being inspected.</p>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
            <div>
              <CardTitle>Your jobs</CardTitle>
              <CardDescription>
                Start an inspection, then upload the report when complete.
              </CardDescription>
            </div>
            <div className="flex flex-col md:flex-row gap-3 w-full md:w-auto">
              <div className="flex-1 space-y-1">
                <Label className="text-xs uppercase tracking-wide text-slate-500">Search</Label>
                <Input
                  placeholder="Search by requester name, email, phone or notes..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                />
              </div>
              <div className="w-full md:w-48 space-y-1">
                <Label className="text-xs uppercase tracking-wide text-slate-500">Status</Label>
                <Select
                  value={statusFilter}
                  onChange={(e) =>
                    setStatusFilter(e.target.value as "" | "assigned" | "in_progress")
                  }
                >
                  <option value="">All</option>
                  <option value="assigned">Assigned</option>
                  <option value="in_progress">In progress</option>
                </Select>
              </div>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          {assigned.length === 0 ? (
            <p className="text-zinc-500 text-sm">No assigned inspections.</p>
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Requested by</TableHead>
                  <TableHead>Requested</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {assigned.map((inv) => (
                  <TableRow key={inv.id}>
                    <TableCell>
                      {inv.user ? (
                        <div className="text-sm">
                          <div className="font-medium">{inv.user.name}</div>
                          <a href={`mailto:${inv.user.email}`} className="text-[var(--primary)] hover:underline">
                            {inv.user.email}
                          </a>
                          {inv.user.phone && (
                            <div className="text-slate-500">
                              <a href={`tel:${inv.user.phone}`} className="hover:underline">{inv.user.phone}</a>
                            </div>
                          )}
                        </div>
                      ) : (
                        "—"
                      )}
                    </TableCell>
                    <TableCell>
                      <div className="text-sm text-slate-600">
                        {formatDate(inv.requestedAt)}
                        {inv.scheduledAt && ` · ${formatDate(inv.scheduledAt)}`}
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge
                        variant={inv.status === "in_progress" ? "warning" : "default"}
                      >
                        {inspectionStatusLabel(inv.status)}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-right space-x-2">
                      {inv.status === "assigned" && (
                        <Button size="sm" onClick={() => handleStart(inv.id)}>
                          Start
                        </Button>
                      )}
                      {inv.status === "in_progress" && (
                        <Button
                          size="sm"
                          variant="secondary"
                          onClick={() => setUploadModal(inv)}
                        >
                          Upload report
                        </Button>
                      )}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}
        </CardContent>
      </Card>

      <Modal
        open={!!uploadModal}
        onClose={() => {
          setUploadModal(null);
          setUploadError("");
        }}
        title="Upload diagnostic report"
      >
        <form onSubmit={handleUpload} className="space-y-4">
          {uploadError && <p className="text-sm text-red-500">{uploadError}</p>}
          <div className="space-y-2">
            <Label>Summary</Label>
            <textarea
              className="flex min-h-[80px] w-full rounded-md border border-slate-300 bg-white px-3 py-2 text-sm text-slate-900"
              value={uploadForm.summary}
              onChange={(e) => setUploadForm((f) => ({ ...f, summary: e.target.value }))}
              placeholder="Brief summary of findings"
            />
          </div>
          <div className="space-y-2">
            <Label>Overall severity</Label>
            <select
              className="flex h-10 w-full rounded-md border border-slate-300 bg-white px-3 py-2 text-sm text-slate-900"
              value={uploadForm.severityRanking}
              onChange={(e) =>
                setUploadForm((f) => ({
                  ...f,
                  severityRanking: e.target.value as "critical" | "monitor" | "informational",
                }))
              }
            >
              <option value="critical">Critical</option>
              <option value="monitor">Monitor</option>
              <option value="informational">Informational</option>
            </select>
          </div>
          <div className="space-y-2">
            <Label>Recommendations (one per line)</Label>
            <textarea
              className="flex min-h-[60px] w-full rounded-md border border-slate-300 bg-white px-3 py-2 text-sm text-slate-900"
              value={uploadForm.recommendations}
              onChange={(e) => setUploadForm((f) => ({ ...f, recommendations: e.target.value }))}
              placeholder="Recommendation 1&#10;Recommendation 2"
            />
          </div>
          <div className="space-y-2">
            <Label>PDF report (optional)</Label>
            <input
              type="file"
              accept=".pdf"
              className="block w-full text-sm text-zinc-400 file:mr-4 file:py-2 file:px-4 file:rounded file:border-0 file:bg-zinc-700 file:text-white"
              onChange={(e) => setUploadForm((f) => ({ ...f, file: e.target.files?.[0] ?? null }))}
            />
          </div>
          <div className="flex justify-end gap-2 pt-4">
            <Button
              type="button"
              variant="outline"
              onClick={() => setUploadModal(null)}
            >
              Cancel
            </Button>
            <Button type="submit" loading={uploadReport.isPending}>
              Upload & complete
            </Button>
          </div>
        </form>
      </Modal>
    </div>
  );
}
