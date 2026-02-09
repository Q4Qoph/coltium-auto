"use client";

import { useState } from "react";
import { Button, Card, CardHeader, CardTitle, CardContent, Table, TableHeader, TableBody, TableRow, TableHead, TableCell, Badge, Modal, Select } from "@/components/ui";
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

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[40vh]">
        <div className="animate-spin h-8 w-8 border-2 border-[var(--primary)] border-t-transparent rounded-full" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold">Inspections</h1>
        <p className="text-zinc-400 mt-1">Assign technicians to pending inspections.</p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>All inspections</CardTitle>
        </CardHeader>
        <CardContent>
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
              {inspectionList.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={5} className="text-center text-zinc-500">
                    No inspections
                  </TableCell>
                </TableRow>
              ) : (
                inspectionList.map((inv) => (
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
                ))
              )}
            </TableBody>
          </Table>
        </CardContent>
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
