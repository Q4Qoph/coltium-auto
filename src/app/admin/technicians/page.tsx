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
  Modal,
  Input,
  Label,
  Select,
} from "@/components/ui";
import { useTechnicians, useCreateTechnician } from "@/lib/hooks";

export default function AdminTechniciansPage() {
  const { data: technicians = [], isLoading } = useTechnicians();
  const createTechnician = useCreateTechnician();
  const [modalOpen, setModalOpen] = useState(false);
  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const [error, setError] = useState("");

  const list = Array.isArray(technicians) ? technicians : [];
  const [search, setSearch] = useState("");

  const filtered = list.filter((t) => {
    if (!search) return true;
    const term = search.toLowerCase();
    return (
      t.name?.toLowerCase().includes(term) ||
      t.email?.toLowerCase().includes(term)
    );
  });

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
          <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
            <div>
              <CardTitle>Technician list</CardTitle>
              <p className="text-sm text-slate-500 mt-1">Search technicians by name or email.</p>
            </div>
            <div className="w-full md:w-64 space-y-1">
              <Label className="text-xs uppercase tracking-wide text-slate-500">Search</Label>
              <Input
                placeholder="Search technicians..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>
          </div>
        </CardHeader>
        <CardContent>
          {isLoading ? (
            <div className="space-y-2">
              {Array.from({ length: 4 }).map((_, i) => (
                <div
                  key={i}
                  className="h-8 w-full rounded-md bg-slate-100 border border-slate-100 animate-pulse"
                />
              ))}
            </div>
          ) : filtered.length === 0 ? (
            <div className="py-8 text-center text-slate-500">
              No technicians match your search.
            </div>
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Name</TableHead>
                  <TableHead>Email</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filtered.map((t) => (
                  <TableRow key={t.id}>
                    <TableCell>{t.name}</TableCell>
                    <TableCell>{t.email}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}
        </CardContent>
      </Card>

      <Modal open={modalOpen} onClose={() => setModalOpen(false)} title="Add technician">
        <form onSubmit={handleSubmit} className="space-y-4">
          {error && <p className="text-sm text-red-500">{error}</p>}
          <div className="space-y-2">
            <Label className="text-sm font-medium text-slate-700">Name</Label>
            <Input
              value={form.name}
              onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))}
              required
            />
          </div>
          <div className="space-y-2">
            <Label className="text-sm font-medium text-slate-700">Email</Label>
            <Input
              type="email"
              value={form.email}
              onChange={(e) => setForm((f) => ({ ...f, email: e.target.value }))}
              required
            />
          </div>
          <div className="space-y-2">
            <Label className="text-sm font-medium text-slate-700">Password</Label>
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
