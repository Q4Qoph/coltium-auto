"use client";

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { Button, Card, CardHeader, CardTitle, CardDescription, CardContent, Badge } from "@/components/ui";
import { useReports } from "@/lib/hooks";
import type { DiagnosticReport } from "@/types";
import { formatDate, severityLabel } from "@/lib/utils";

export default function ReportsPage() {
  const searchParams = useSearchParams();
  const reportIdParam = searchParams.get("reportId");
  const { data: reports = [], isLoading } = useReports();
  const [selected, setSelected] = useState<DiagnosticReport | null>(null);

  const reportList = Array.isArray(reports) ? reports : [];

  useEffect(() => {
    if (reportIdParam && reportList.length > 0) {
      const r = reportList.find((x) => x.id === reportIdParam);
      if (r) setSelected(r);
    }
  }, [reportIdParam, reportList]);

  const severityVariant = (s: string) =>
    s === "critical" ? "danger" : s === "monitor" ? "warning" : "default";

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
        <h1 className="text-2xl font-bold">Diagnostic reports</h1>
        <p className="text-zinc-400 mt-1">View and download your vehicle diagnostic history.</p>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        <Card className="lg:col-span-1">
          <CardHeader>
            <CardTitle>Report history</CardTitle>
            <CardDescription>Full vehicle diagnostic history</CardDescription>
          </CardHeader>
          <CardContent>
            {reportList.length === 0 ? (
              <p className="text-zinc-500 text-sm">No reports yet.</p>
            ) : (
              <ul className="space-y-2">
                {reportList.map((r) => (
                  <li key={r.id}>
                    <button
                      type="button"
                      onClick={() => setSelected(r)}
                      className={`w-full text-left rounded-md px-3 py-2 text-sm transition-colors ${
                        selected?.id === r.id ? "bg-[var(--primary)]/20 text-[var(--primary)]" : "hover:bg-zinc-800 text-zinc-300"
                      }`}
                    >
                      {formatDate(r.uploadedAt)}
                      {r.inspection?.vehicle && (
                        <span className="block text-zinc-500 text-xs">
                          {r.inspection.vehicle.make} {r.inspection.vehicle.model}
                        </span>
                      )}
                    </button>
                  </li>
                ))}
              </ul>
            )}
          </CardContent>
        </Card>

        <div className="lg:col-span-2">
          {selected ? (
            <Card>
              <CardHeader className="flex flex-row items-start justify-between">
                <div>
                  <CardTitle>Report — {formatDate(selected.uploadedAt)}</CardTitle>
                  {selected.inspection?.vehicle && (
                    <CardDescription>
                      {selected.inspection.vehicle.year} {selected.inspection.vehicle.make}{" "}
                      {selected.inspection.vehicle.model}
                    </CardDescription>
                  )}
                </div>
                {selected.fileUrl && (
                  <a href={selected.fileUrl} target="_blank" rel="noopener noreferrer">
                    <Button variant="outline" size="sm">Download PDF</Button>
                  </a>
                )}
              </CardHeader>
              <CardContent className="space-y-4">
                {selected.summary && (
                  <div>
                    <h4 className="text-sm font-medium text-zinc-400 mb-1">Summary</h4>
                    <p className="text-sm">{selected.summary}</p>
                  </div>
                )}
                <div>
                  <h4 className="text-sm font-medium text-zinc-400 mb-2">Severity</h4>
                  <Badge variant={severityVariant(selected.severityRanking)}>
                    {severityLabel(selected.severityRanking)}
                  </Badge>
                </div>
                {selected.findings && selected.findings.length > 0 && (
                  <div>
                    <h4 className="text-sm font-medium text-zinc-400 mb-2">Findings</h4>
                    <ul className="space-y-2">
                      {selected.findings.map((f) => (
                        <li key={f.id} className="text-sm flex gap-2">
                          <Badge variant={severityVariant(f.severity)} className="shrink-0">
                            {f.severity}
                          </Badge>
                          <span>{f.description}</span>
                          {f.code && <span className="text-zinc-500">({f.code})</span>}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
                {selected.recommendations && selected.recommendations.length > 0 && (
                  <div>
                    <h4 className="text-sm font-medium text-zinc-400 mb-2">Recommendations</h4>
                    <ul className="list-disc list-inside text-sm space-y-1">
                      {selected.recommendations.map((rec, i) => (
                        <li key={i}>{rec}</li>
                      ))}
                    </ul>
                  </div>
                )}
              </CardContent>
            </Card>
          ) : (
            <Card>
              <CardContent className="py-12 text-center text-zinc-500">
                Select a report from the list to view details.
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
}
