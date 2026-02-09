"use client";

import { Card, CardHeader, CardTitle, CardContent, Table, TableHeader, TableBody, TableRow, TableHead, TableCell, Badge } from "@/components/ui";
import { useReports } from "@/lib/hooks";
import { formatDate, severityLabel } from "@/lib/utils";

export default function AdminReportsPage() {
  const { data: reports = [], isLoading } = useReports();
  const reportList = Array.isArray(reports) ? reports : [];

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
        <h1 className="text-2xl font-bold">Reports</h1>
        <p className="text-zinc-400 mt-1">Review and edit uploaded diagnostic reports.</p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>All reports</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Date</TableHead>
                <TableHead>Vehicle</TableHead>
                <TableHead>Severity</TableHead>
                <TableHead>Summary</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {reportList.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={4} className="text-center text-zinc-500">
                    No reports
                  </TableCell>
                </TableRow>
              ) : (
                reportList.map((r) => (
                  <TableRow key={r.id}>
                    <TableCell>{formatDate(r.uploadedAt)}</TableCell>
                    <TableCell>
                      {r.inspection?.vehicle
                        ? `${r.inspection.vehicle.make} ${r.inspection.vehicle.model}`
                        : "—"}
                    </TableCell>
                    <TableCell>
                      <Badge
                        variant={
                          r.severityRanking === "critical"
                            ? "danger"
                            : r.severityRanking === "monitor"
                              ? "warning"
                              : "default"
                        }
                      >
                        {severityLabel(r.severityRanking)}
                      </Badge>
                    </TableCell>
                    <TableCell className="max-w-xs truncate">{r.summary ?? "—"}</TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
