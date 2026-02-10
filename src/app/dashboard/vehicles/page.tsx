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
  Modal,
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableHead,
  TableCell,
} from "@/components/ui";
import { Input, Label } from "@/components/ui";
import { useVehicles, useCreateVehicle, useDeleteVehicle } from "@/lib/hooks";

const initialForm = {
  make: "",
  model: "",
  year: new Date().getFullYear(),
  vin: "",
  registrationNumber: "",
  mileage: "",
  mileageUnit: "km" as "km" | "mi",
};

export default function VehiclesPage() {
  const { data: vehicles = [], isLoading } = useVehicles();
  const createVehicle = useCreateVehicle();
  const deleteVehicle = useDeleteVehicle();
  const [modalOpen, setModalOpen] = useState(false);
  const [form, setForm] = useState(initialForm);
  const [error, setError] = useState("");

  const vehicleList = Array.isArray(vehicles) ? vehicles : [];
  const [search, setSearch] = useState("");

  const filtered = vehicleList.filter((v) => {
    const term = search.toLowerCase();
    if (!term) return true;
    return (
      v.make?.toLowerCase().includes(term) ||
      v.model?.toLowerCase().includes(term) ||
      v.registrationNumber?.toLowerCase().includes(term) ||
      String(v.year ?? "").includes(term)
    );
  });

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    createVehicle.mutate(
      {
        make: form.make,
        model: form.model,
        year: form.year,
        vin: form.vin || undefined,
        registrationNumber: form.registrationNumber || undefined,
        mileage: form.mileage ? parseInt(form.mileage, 10) : undefined,
        mileageUnit: form.mileageUnit,
      },
      {
        onSuccess: () => {
          setModalOpen(false);
          setForm(initialForm);
        },
        onError: (err: { message?: string }) => {
          setError(err?.message ?? "Failed to add vehicle");
        },
      }
    );
  }

  function handleDelete(id: string) {
    if (!confirm("Remove this vehicle? Inspections linked to it will remain.")) return;
    deleteVehicle.mutate(id);
  }

  if (isLoading) {
    // Skeleton state while loading vehicles
    return (
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <div className="h-6 w-40 rounded-md bg-slate-200 animate-pulse" />
            <div className="mt-2 h-4 w-64 rounded-md bg-slate-100 animate-pulse" />
          </div>
          <div className="h-9 w-28 rounded-md bg-slate-200 animate-pulse" />
        </div>

        <Card>
          <CardHeader>
            <div className="h-5 w-32 rounded-md bg-slate-200 animate-pulse mb-2" />
            <div className="h-4 w-56 rounded-md bg-slate-100 animate-pulse" />
          </CardHeader>
          <CardContent>
            <div className="h-10 w-full rounded-md bg-slate-100 animate-pulse mb-2" />
            <div className="space-y-2 mt-4">
              {Array.from({ length: 4 }).map((_, i) => (
                <div
                  key={i}
                  className="h-8 w-full rounded-md bg-slate-50 border border-slate-100 animate-pulse"
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
          <h1 className="text-2xl font-bold text-slate-900">Vehicles</h1>
          <p className="text-slate-500 mt-1">Add and manage vehicles for diagnostic inspections.</p>
        </div>
        <Button onClick={() => setModalOpen(true)}>Add vehicle</Button>
      </div>

      <Card>
        <CardHeader>
          <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
            <div>
              <CardTitle>Your vehicles</CardTitle>
              <CardDescription>Request inspections for any vehicle below.</CardDescription>
            </div>
            <div className="w-full md:w-64 space-y-1">
              <Label className="text-xs uppercase tracking-wide text-slate-500">Search</Label>
              <Input
                placeholder="Search by make, model, reg..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>
          </div>
        </CardHeader>
        <CardContent>
          {filtered.length === 0 ? (
            <div className="text-center py-12 text-slate-500">
              <p>No vehicles yet.</p>
              <Button className="mt-4" variant="outline" onClick={() => setModalOpen(true)}>
                Add your first vehicle
              </Button>
            </div>
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Vehicle</TableHead>
                  <TableHead>Registration</TableHead>
                  <TableHead>Mileage</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filtered.map((v) => (
                  <TableRow key={v.id}>
                    <TableCell>
                      <div className="font-medium">
                        {v.year} {v.make} {v.model}
                      </div>
                    </TableCell>
                    <TableCell>{v.registrationNumber ?? "—"}</TableCell>
                    <TableCell>
                      {v.mileage != null ? `${v.mileage} ${v.mileageUnit ?? "km"}` : "—"}
                    </TableCell>
                    <TableCell className="text-right space-x-2">
                      <Link href={`/dashboard/inspections?vehicleId=${v.id}`}>
                        <Button variant="outline" size="sm">
                          Request inspection
                        </Button>
                      </Link>
                      <Button
                        variant="ghost"
                        size="sm"
                        className="text-red-600 hover:bg-red-50"
                        onClick={() => handleDelete(v.id)}
                      >
                        Remove
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}
        </CardContent>
      </Card>

      <Modal open={modalOpen} onClose={() => setModalOpen(false)} title="Add vehicle">
        <form onSubmit={handleSubmit} className="space-y-4">
          {error && <p className="text-sm text-red-500">{error}</p>}
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>Make</Label>
              <Input
                value={form.make}
                onChange={(e) => setForm((f) => ({ ...f, make: e.target.value }))}
                placeholder="e.g. Toyota"
                required
              />
            </div>
            <div className="space-y-2">
              <Label>Model</Label>
              <Input
                value={form.model}
                onChange={(e) => setForm((f) => ({ ...f, model: e.target.value }))}
                placeholder="e.g. Land Cruiser"
                required
              />
            </div>
          </div>
          <div className="space-y-2">
            <Label>Year</Label>
            <Input
              type="number"
              min={1990}
              max={new Date().getFullYear() + 1}
              value={form.year}
              onChange={(e) => setForm((f) => ({ ...f, year: parseInt(e.target.value, 10) || f.year }))}
              required
            />
          </div>
          <div className="space-y-2">
            <Label>VIN (optional)</Label>
            <Input
              value={form.vin}
              onChange={(e) => setForm((f) => ({ ...f, vin: e.target.value }))}
              placeholder="17-character VIN"
            />
          </div>
          <div className="space-y-2">
            <Label>Registration number (optional)</Label>
            <Input
              value={form.registrationNumber}
              onChange={(e) => setForm((f) => ({ ...f, registrationNumber: e.target.value }))}
              placeholder="e.g. KCA 123A"
            />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>Mileage (optional)</Label>
              <Input
                type="number"
                min={0}
                value={form.mileage}
                onChange={(e) => setForm((f) => ({ ...f, mileage: e.target.value }))}
                placeholder="0"
              />
            </div>
            <div className="space-y-2">
              <Label>Unit</Label>
              <select
                className="flex h-10 w-full rounded-md border border-slate-300 bg-white px-3 py-2 text-sm text-slate-800"
                value={form.mileageUnit}
                onChange={(e) => setForm((f) => ({ ...f, mileageUnit: e.target.value as "km" | "mi" }))}
              >
                <option value="km">km</option>
                <option value="mi">mi</option>
              </select>
            </div>
          </div>
          <div className="flex justify-end gap-2 pt-4">
            <Button type="button" variant="outline" onClick={() => setModalOpen(false)}>
              Cancel
            </Button>
            <Button type="submit" loading={createVehicle.isPending}>Add vehicle</Button>
          </div>
        </form>
      </Modal>
    </div>
  );
}
