"use client";

import { useState } from "react";
import { Button, Card, CardHeader, CardTitle, CardContent, Table, TableHeader, TableBody, TableRow, TableHead, TableCell, Modal, Input, Label } from "@/components/ui";
import { useTechnicians, useCreateTechnician } from "@/lib/hooks";

export default function AdminTechniciansPage() {
  const { data: technicians = [], isLoading } = useTechnicians();
  const createTechnician = useCreateTechnician();
  const [modalOpen, setModalOpen] = useState(false);
  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const [error, setError] = useState("");

  const list = Array.isArray(technicians) ? technicians : [];

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    createTechnician.mutate(
      {
        name: form.name,
        email: form.email,
        password: form.password,
        role: "technician",
      },
      {
        onSuccess: () => {
          setModalOpen(false);
          setForm({ name: "", email: "", password: "" });
        },
        onError: (err: { message?: string }) => {
          setError(err?.message ?? "Failed to add technician");
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
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">Technicians</h1>
          <p className="text-zinc-400 mt-1">Manage technician accounts for assigning inspections.</p>
        </div>
        <Button onClick={() => setModalOpen(true)}>Add technician</Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Technician list</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Email</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {list.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={2} className="text-center text-zinc-500">
                    No technicians. Add one to assign inspections.
                  </TableCell>
                </TableRow>
              ) : (
                list.map((t) => (
                  <TableRow key={t.id}>
                    <TableCell>{t.name}</TableCell>
                    <TableCell>{t.email}</TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      <Modal open={modalOpen} onClose={() => setModalOpen(false)} title="Add technician">
        <form onSubmit={handleSubmit} className="space-y-4">
          {error && <p className="text-sm text-red-500">{error}</p>}
          <div className="space-y-2">
            <Label>Name</Label>
            <Input
              value={form.name}
              onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))}
              required
            />
          </div>
          <div className="space-y-2">
            <Label>Email</Label>
            <Input
              type="email"
              value={form.email}
              onChange={(e) => setForm((f) => ({ ...f, email: e.target.value }))}
              required
            />
          </div>
          <div className="space-y-2">
            <Label>Password</Label>
            <Input
              type="password"
              value={form.password}
              onChange={(e) => setForm((f) => ({ ...f, password: e.target.value }))}
              required
              minLength={8}
            />
          </div>
          <div className="flex justify-end gap-2 pt-4">
            <Button type="button" variant="outline" onClick={() => setModalOpen(false)}>
              Cancel
            </Button>
            <Button type="submit" loading={createTechnician.isPending}>Add technician</Button>
          </div>
        </form>
      </Modal>
    </div>
  );
}
