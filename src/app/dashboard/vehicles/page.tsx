"use client";

import { useState } from "react";
import Link from "next/link";
import { Button, Card, CardHeader, CardTitle, CardDescription, CardContent, Modal } from "@/components/ui";
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
          <h1 className="text-2xl font-bold">Vehicles</h1>
          <p className="text-zinc-400 mt-1">Add and manage vehicles for diagnostic inspections.</p>
        </div>
        <Button onClick={() => setModalOpen(true)}>Add vehicle</Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Your vehicles</CardTitle>
          <CardDescription>Request inspections for any vehicle below.</CardDescription>
        </CardHeader>
        <CardContent>
          {vehicleList.length === 0 ? (
            <div className="text-center py-12 text-zinc-500">
              <p>No vehicles yet.</p>
              <Button className="mt-4" variant="outline" onClick={() => setModalOpen(true)}>
                Add your first vehicle
              </Button>
            </div>
          ) : (
            <ul className="divide-y divide-zinc-800">
              {vehicleList.map((v) => (
                <li key={v.id} className="py-4 flex items-center justify-between">
                  <div>
                    <p className="font-medium">
                      {v.year} {v.make} {v.model}
                    </p>
                    <p className="text-sm text-zinc-500">
                      {v.registrationNumber && `${v.registrationNumber} · `}
                      {v.mileage != null && `${v.mileage} ${v.mileageUnit ?? "km"}`}
                    </p>
                  </div>
                  <div className="flex items-center gap-2">
                    <Link href={`/dashboard/inspections?vehicleId=${v.id}`}>
                      <Button variant="outline" size="sm">Request inspection</Button>
                    </Link>
                    <Button variant="ghost" size="sm" onClick={() => handleDelete(v.id)}>
                      Remove
                    </Button>
                  </div>
                </li>
              ))}
            </ul>
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
                className="flex h-10 w-full rounded-md border border-zinc-700 bg-zinc-950 px-3 py-2 text-sm text-white"
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
