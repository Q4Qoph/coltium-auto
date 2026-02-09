"use client";

import { useState } from "react";
import { Button, Card, CardHeader, CardTitle, CardDescription, CardContent, Badge, Modal } from "@/components/ui";
import { Input, Label } from "@/components/ui";
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
  const assigned = list.filter((i) => i.status === "assigned" || i.status === "in_progress");

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
      <div className="flex items-center justify-center min-h-[40vh]">
        <div className="animate-spin h-8 w-8 border-2 border-[var(--primary)] border-t-transparent rounded-full" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold">Assigned inspections</h1>
        <p className="text-zinc-400 mt-1">Mark jobs in progress and upload diagnostic reports.</p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Your jobs</CardTitle>
          <CardDescription>
            Start an inspection, then upload the report when complete.
          </CardDescription>
        </CardHeader>
        <CardContent>
          {assigned.length === 0 ? (
            <p className="text-zinc-500 text-sm">No assigned inspections.</p>
          ) : (
            <ul className="divide-y divide-zinc-800">
              {assigned.map((inv) => (
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
                    <Badge
                      variant={
                        inv.status === "in_progress" ? "warning" : "default"
                      }
                    >
                      {inspectionStatusLabel(inv.status)}
                    </Badge>
                    {inv.status === "assigned" && (
                      <Button size="sm" onClick={() => handleStart(inv.id)}>
                        Start
                      </Button>
                    )}
                    {inv.status === "in_progress" && (
                      <Button size="sm" variant="secondary" onClick={() => setUploadModal(inv)}>
                        Upload report
                      </Button>
                    )}
                  </div>
                </li>
              ))}
            </ul>
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
              className="flex min-h-[80px] w-full rounded-md border border-zinc-700 bg-zinc-950 px-3 py-2 text-sm text-white"
              value={uploadForm.summary}
              onChange={(e) => setUploadForm((f) => ({ ...f, summary: e.target.value }))}
              placeholder="Brief summary of findings"
            />
          </div>
          <div className="space-y-2">
            <Label>Overall severity</Label>
            <select
              className="flex h-10 w-full rounded-md border border-zinc-700 bg-zinc-950 px-3 py-2 text-sm text-white"
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
              className="flex min-h-[60px] w-full rounded-md border border-zinc-700 bg-zinc-950 px-3 py-2 text-sm text-white"
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
