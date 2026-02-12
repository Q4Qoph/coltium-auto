"use client";

import { useState } from "react";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableHead,
  TableCell,
  Badge,
  Input,
  Select,
  Label,
} from "@/components/ui";
import { useReports } from "@/lib/hooks";
import { formatDate, severityLabel } from "@/lib/utils";

export default function ReportsContent() {
  const { data: reports = [], isLoading } = useReports();
  const reportList = Array.isArray(reports) ? reports : [];
  const [search, setSearch] = useState("");
  const [severityFilter, setSeverityFilter] = useState<"" | "critical" | "monitor" | "informational">("");

  const filtered = reportList.filter((r) => {
    const term = search.toLowerCase();
    const matchesSearch =
      !term ||
      r.summary?.toLowerCase().includes(term) ||
      (r.inspection?.notes?.toLowerCase().includes(term) ?? false);
    const matchesSeverity = !severityFilter || r.severityRanking === severityFilter;
    return matchesSearch && matchesSeverity;
  });

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-slate-900">Reports</h1>
        <p className="text-slate-500 mt-1">
          Review and edit uploaded diagnostic reports.
        </p>
      </div>

      <Card>
        <CardHeader>
          <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
            <div>
              <CardTitle>All reports</CardTitle>
              <p className="text-sm text-slate-500 mt-1">
                Search by summary or inspection notes; filter by severity.
              </p>
            </div>
            <div className="flex flex-col md:flex-row gap-3 w-full md:w-auto">
              <div className="flex-1 space-y-1">
                <Label className="text-xs uppercase tracking-wide text-slate-500">Search</Label>
                <Input
                  placeholder="Summary or notes..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                />
              </div>
              <div className="w-full md:w-48 space-y-1">
                <Label className="text-xs uppercase tracking-wide text-slate-500">Severity</Label>
                <Select
                  value={severityFilter}
                  onChange={(e) =>
                    setSeverityFilter(
                      e.target.value as "" | "critical" | "monitor" | "informational"
                    )
                  }
                >
                  <option value="">All</option>
                  <option value="critical">Critical</option>
                  <option value="monitor">Monitor</option>
                  <option value="informational">Informational</option>
                </Select>
              </div>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          {isLoading ? (
            <div className="space-y-2">
              {Array.from({ length: 5 }).map((_, i) => (
                <div
                  key={i}
                  className="h-8 w-full rounded-md bg-slate-100 border border-slate-100 animate-pulse"
                />
              ))}
            </div>
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Date</TableHead>
                  <TableHead>Severity</TableHead>
                  <TableHead>Summary</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filtered.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={3} className="text-center text-slate-500">
                      No reports match your filters
                    </TableCell>
                  </TableRow>
                ) : (
                  filtered.map((r) => (
                    <TableRow key={r.id}>
                      <TableCell>{formatDate(r.uploadedAt)}</TableCell>
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
                      <TableCell className="max-w-xs truncate">
                        {r.summary ?? "—"}
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
