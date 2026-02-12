"use client";

import { useState, useMemo } from "react";
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
} from "@/components/ui";
import { useAdminPlans, useCreatePlan, useUpdatePlan } from "@/lib/hooks";
import type { SubscriptionPlan } from "@/types";

const emptyForm = {
  name: "",
  slug: "",
  description: "",
  priceMonthly: "",
  priceYearly: "",
  featuresText: "",
};

export default function AdminPlansPage() {
  const { data: plans = [], isLoading, error } = useAdminPlans();
  const createPlan = useCreatePlan();
  const updatePlan = useUpdatePlan();
  const [modalOpen, setModalOpen] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [form, setForm] = useState(emptyForm);
  const [formError, setFormError] = useState("");
  const [search, setSearch] = useState("");

  const list = Array.isArray(plans) ? (plans as SubscriptionPlan[]) : [];
  const filtered = useMemo(() => {
    const term = search.toLowerCase().trim();
    if (!term) return list;
    return list.filter(
      (p) =>
        p.name?.toLowerCase().includes(term) ||
        p.slug?.toLowerCase().includes(term) ||
        p.description?.toLowerCase().includes(term)
    );
  }, [list, search]);

  const openCreate = () => {
    setEditingId(null);
    setForm(emptyForm);
    setFormError("");
    setModalOpen(true);
  };

  const openEdit = (plan: SubscriptionPlan) => {
    setEditingId(plan.id);
    setForm({
      name: plan.name,
      slug: plan.slug,
      description: plan.description ?? "",
      priceMonthly: String(plan.priceMonthly),
      priceYearly: plan.priceYearly != null ? String(plan.priceYearly) : "",
      featuresText: (plan.features ?? []).join("\n"),
    });
    setFormError("");
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
    setEditingId(null);
    setForm(emptyForm);
    setFormError("");
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFormError("");
    const name = form.name.trim();
    const slug = form.slug.trim().toLowerCase();
    const priceMonthly = parseFloat(form.priceMonthly);
    const priceYearly = form.priceYearly.trim() ? parseFloat(form.priceYearly) : undefined;
    const features = form.featuresText
      .split("\n")
      .map((s) => s.trim())
      .filter(Boolean);

    if (!name) {
      setFormError("Name is required.");
      return;
    }
    if (!slug) {
      setFormError("Slug is required.");
      return;
    }
    if (!Number.isFinite(priceMonthly) || priceMonthly < 0) {
      setFormError("Monthly price must be a non-negative number.");
      return;
    }

    const body = {
      name,
      slug,
      description: form.description.trim() || undefined,
      priceMonthly,
      priceYearly,
      features: features.length ? features : undefined,
    };

    if (editingId) {
      updatePlan.mutate(
        { id: editingId, body },
        {
          onSuccess: () => closeModal(),
          onError: (err: { message?: string }) =>
            setFormError(err?.message ?? "Failed to update plan"),
        }
      );
    } else {
      createPlan.mutate(body, {
        onSuccess: () => closeModal(),
        onError: (err: { message?: string }) =>
          setFormError(err?.message ?? "Failed to create plan"),
      });
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">Plans</h1>
          <p className="text-zinc-400 mt-1">
            Create and edit subscription plans (name, pricing, features).
          </p>
        </div>
        <Button onClick={openCreate}>Add plan</Button>
      </div>

      {error && (
        <div className="rounded-md border border-red-800 bg-red-900/30 px-3 py-2 text-sm text-red-200">
          {(error as { message?: string }).message ?? "Failed to load plans."}
        </div>
      )}

      <Card>
        <CardHeader>
          <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
            <div>
              <CardTitle>All plans</CardTitle>
              <p className="text-sm text-slate-500 mt-1">Search by name, slug, or description.</p>
            </div>
            <div className="w-full md:w-64 space-y-1">
              <Label className="text-xs uppercase tracking-wide text-slate-500">Search</Label>
              <Input
                placeholder="Search plans..."
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
              No plans match your search.
            </div>
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Name</TableHead>
                  <TableHead>Slug</TableHead>
                  <TableHead>Monthly</TableHead>
                  <TableHead>Yearly</TableHead>
                  <TableHead />
                </TableRow>
              </TableHeader>
              <TableBody>
                {filtered.map((p) => (
                  <TableRow key={p.id}>
                    <TableCell className="font-medium">{p.name}</TableCell>
                    <TableCell className="text-slate-600">{p.slug}</TableCell>
                    <TableCell>KES {Number(p.priceMonthly).toLocaleString()}</TableCell>
                    <TableCell>
                      {p.priceYearly != null
                        ? `KES ${Number(p.priceYearly).toLocaleString()}`
                        : "—"}
                    </TableCell>
                    <TableCell>
                      <Button
                        type="button"
                        variant="outline"
                        size="sm"
                        onClick={() => openEdit(p)}
                      >
                        Edit
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}
        </CardContent>
      </Card>

      <Modal
        open={modalOpen}
        onClose={closeModal}
        title={editingId ? "Edit plan" : "Add plan"}
        description={editingId ? "Update plan details." : "Create a new subscription plan."}
      >
        <form onSubmit={handleSubmit} className="space-y-4">
          {formError && <p className="text-sm text-red-500">{formError}</p>}
          <div className="space-y-2">
            <Label>Name *</Label>
            <Input
              value={form.name}
              onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))}
              placeholder="e.g. Pro"
              required
            />
          </div>
          <div className="space-y-2">
            <Label>Slug *</Label>
            <Input
              value={form.slug}
              onChange={(e) => setForm((f) => ({ ...f, slug: e.target.value }))}
              placeholder="e.g. pro"
              required
            />
            <p className="text-xs text-slate-500">Lowercase, no spaces (used in URLs).</p>
          </div>
          <div className="space-y-2">
            <Label>Description</Label>
            <Input
              value={form.description}
              onChange={(e) => setForm((f) => ({ ...f, description: e.target.value }))}
              placeholder="Short description"
            />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>Price monthly (KES) *</Label>
              <Input
                type="number"
                min="0"
                step="0.01"
                value={form.priceMonthly}
                onChange={(e) => setForm((f) => ({ ...f, priceMonthly: e.target.value }))}
                required
              />
            </div>
            <div className="space-y-2">
              <Label>Price yearly (KES)</Label>
              <Input
                type="number"
                min="0"
                step="0.01"
                value={form.priceYearly}
                onChange={(e) => setForm((f) => ({ ...f, priceYearly: e.target.value }))}
                placeholder="Optional"
              />
            </div>
          </div>
          <div className="space-y-2">
            <Label>Features (one per line)</Label>
            <textarea
              className="flex min-h-[80px] w-full rounded-md border border-slate-200 bg-white px-3 py-2 text-sm placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-[var(--primary)]"
              value={form.featuresText}
              onChange={(e) => setForm((f) => ({ ...f, featuresText: e.target.value }))}
              placeholder="e.g. 5 inspections/year"
              rows={3}
            />
          </div>
          <div className="flex justify-end gap-2 pt-2">
            <Button type="button" variant="outline" onClick={closeModal}>
              Cancel
            </Button>
            <Button type="submit" loading={createPlan.isPending || updatePlan.isPending}>
              {editingId ? "Save changes" : "Create plan"}
            </Button>
          </div>
        </form>
      </Modal>
    </div>
  );
}
