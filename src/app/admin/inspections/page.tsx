"use client";

import { useState } from "react";
import {
  Button,
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
  Modal,
  Select,
  Input,
  Label,
} from "@/components/ui";
import { useInspections, useTechnicians, useAssignInspection } from "@/lib/hooks";
import { formatDate, inspectionStatusLabel } from "@/lib/utils";

export default function AdminInspectionsPage() {
  const { data: inspections = [], isLoading: inspectionsLoading } = useInspections();
  const { data: technicians = [], isLoading: techniciansLoading } = useTechnicians();
  const assignInspection = useAssignInspection();
  const [assignModal, setAssignModal] = useState<{ id: string } | null>(null);
  const [assignTech, setAssignTech] = useState("");

  const inspectionList = Array.isArray(inspections) ? inspections : [];
  const technicianList = Array.isArray(technicians) ? technicians : [];
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState<"" | "pending" | "assigned" | "in_progress" | "completed">("");
  const [techFilter, setTechFilter] = useState<string>("");

  function handleAssign(e: React.FormEvent) {
    e.preventDefault();
    if (!assignModal || !assignTech) return;
    assignInspection.mutate(
      { id: assignModal.id, technicianId: assignTech },
      {
        onSuccess: () => {
          setAssignModal(null);
          setAssignTech("");
        },
      }
    );
  }

  const loading = inspectionsLoading || techniciansLoading;

  const filtered = inspectionList.filter((inv) => {
    const term = search.toLowerCase();
    const matchesSearch =
      !term ||
      inv.vehicle?.make?.toLowerCase().includes(term) ||
      inv.vehicle?.model?.toLowerCase().includes(term) ||
      inv.vehicle?.registrationNumber?.toLowerCase().includes(term);
    const matchesStatus = !statusFilter || inv.status === statusFilter;
    const matchesTech = !techFilter || inv.technician?.id === techFilter;
    return matchesSearch && matchesStatus && matchesTech;
  });

  let tableContent: React.ReactNode;
  if (loading) {
    tableContent = (
      <div className="space-y-2">
        {Array.from({ length: 5 }).map((_, i) => (
          <div
            key={i}
            className="h-8 w-full rounded-md bg-slate-100 border border-slate-100 animate-pulse"
          />
        ))}
      </div>
    );
  } else if (filtered.length === 0) {
    tableContent = (
      <div className="py-8 text-center text-slate-500">
        No inspections match your filters.
      </div>
    );
  } else {
    tableContent = (
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Vehicle</TableHead>
            <TableHead>Requested</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Technician</TableHead>
            <TableHead></TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {filtered.map((inv) => (
            <TableRow key={inv.id}>
              <TableCell>
                {inv.vehicle?.make} {inv.vehicle?.model} ({inv.vehicle?.year})
              </TableCell>
              <TableCell>{formatDate(inv.requestedAt)}</TableCell>
              <TableCell>
                <Badge
                  variant={
                    inv.status === "completed"
                      ? "success"
                      : inv.status === "in_progress"
                        ? "warning"
                        : "default"
                  }
                >
                  {inspectionStatusLabel(inv.status)}
                </Badge>
              </TableCell>
              <TableCell>{inv.technician?.name ?? "—"}</TableCell>
              <TableCell>
                {inv.status === "pending" && (
                  <Button size="sm" variant="outline" onClick={() => setAssignModal(inv)}>
                    Assign
                  </Button>
                )}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    );
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-slate-900">Inspections</h1>
        <p className="text-slate-500 mt-1">Assign technicians to pending inspections.</p>
      </div>

      <Card>
        <CardHeader>
          <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
            <div>
              <CardTitle>All inspections</CardTitle>
              <p className="text-sm text-slate-500 mt-1">
                Search by vehicle and filter by status or technician.
              </p>
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
              <div className="w-full md:w-40 space-y-1">
                <Label className="text-xs uppercase tracking-wide text-slate-500">Status</Label>
                <Select
                  value={statusFilter}
                  onChange={(e) =>
                    setStatusFilter(
                      e.target.value as "" | "pending" | "assigned" | "in_progress" | "completed"
                    )
                  }
                >
                  <option value="">All</option>
                  <option value="pending">Pending</option>
                  <option value="assigned">Assigned</option>
                  <option value="in_progress">In progress</option>
                  <option value="completed">Completed</option>
                </Select>
              </div>
              <div className="w-full md:w-48 space-y-1">
                <Label className="text-xs uppercase tracking-wide text-slate-500">Technician</Label>
                <Select value={techFilter} onChange={(e) => setTechFilter(e.target.value)}>
                  <option value="">All</option>
                  {technicianList.map((t) => (
                    <option key={t.id} value={t.id}>
                      {t.name}
                    </option>
                  ))}
                </Select>
              </div>
            </div>
          </div>
        </CardHeader>
        <CardContent>{tableContent}</CardContent>
      </Card>

      <Modal
        open={!!assignModal}
        onClose={() => {
          setAssignModal(null);
          setAssignTech("");
        }}
        title="Assign technician"
      >
        <form onSubmit={handleAssign} className="space-y-4">
          <Select
            value={assignTech}
            onChange={(e) => setAssignTech(e.target.value)}
            required
          >
            <option value="">Select technician</option>
            {technicianList.map((t) => (
              <option key={t.id} value={t.id}>
                {t.name} ({t.email})
              </option>
            ))}
          </Select>
          <div className="flex justify-end gap-2 pt-4">
            <Button
              type="button"
              variant="outline"
              onClick={() => setAssignModal(null)}
            >
              Cancel
            </Button>
            <Button type="submit" loading={assignInspection.isPending}>Assign</Button>
          </div>
        </form>
      </Modal>
    </div>
  );
}
