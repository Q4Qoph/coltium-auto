"use client";

import { useState, useMemo } from "react";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  Button,
  Modal,
  Input,
  Label,
  Select,
  Badge,
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableHead,
  TableCell,
} from "@/components/ui";
import { useAdminPayments, useCreateManualPayment, useAdminSubscriptions } from "@/lib/hooks";
import { usersApi } from "@/lib/api";
import { useQuery } from "@tanstack/react-query";
import type { PaymentRow } from "@/types";
import type { User } from "@/types";

function statusVariant(status: string) {
  switch (status) {
    case "completed":
      return "success";
    case "failed":
      return "danger";
    default:
      return "warning";
  }
}

function formatDate(iso: string) {
  return new Date(iso).toLocaleString();
}

export default function AdminPaymentsPage() {
  const { data: payments = [], isLoading, error } = useAdminPayments();
  const { data: subscriptions = [] } = useAdminSubscriptions();
  const { data: usersData } = useQuery({
    queryKey: ["users", "list"],
    queryFn: () => usersApi.list({ limit: 500 }),
  });
  const users: User[] = usersData?.users ?? [];
  const createManual = useCreateManualPayment();

  const [modalOpen, setModalOpen] = useState(false);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState<"" | "pending" | "completed" | "failed">("");
  const [methodFilter, setMethodFilter] = useState<"" | "mpesa" | "manual">("");
  const [userId, setUserId] = useState("");
  const [subscriptionId, setSubscriptionId] = useState("");
  const [amount, setAmount] = useState("");
  const [status, setStatus] = useState<"pending" | "completed" | "failed">("completed");
  const [reference, setReference] = useState("");
  const [formError, setFormError] = useState("");

  const subscriptionsForUser = useMemo(() => {
    if (!userId) return [];
    return subscriptions.filter((s) => s.user?.id === userId);
  }, [userId, subscriptions]);

  const filteredPayments = useMemo(() => {
    const list = Array.isArray(payments) ? (payments as PaymentRow[]) : [];
    const term = search.toLowerCase().trim();

    return list.filter((p) => {
      const matchesSearch =
        !term ||
        p.user?.name?.toLowerCase().includes(term) ||
        p.user?.email?.toLowerCase().includes(term) ||
        p.subscription?.plan?.name?.toLowerCase().includes(term) ||
        p.method?.toLowerCase().includes(term) ||
        p.reference?.toLowerCase().includes(term);

      const matchesStatus = !statusFilter || p.status === statusFilter;
      const matchesMethod = !methodFilter || p.method === methodFilter;

      return matchesSearch && matchesStatus && matchesMethod;
    });
  }, [payments, search, statusFilter, methodFilter]);

  const resetForm = () => {
    setUserId("");
    setSubscriptionId("");
    setAmount("");
    setStatus("completed");
    setReference("");
    setFormError("");
  };

  const handleOpen = () => {
    resetForm();
    setModalOpen(true);
  };

  const handleClose = () => {
    setModalOpen(false);
    resetForm();
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFormError("");
    const amountNum = parseFloat(amount);
    if (!userId.trim()) {
      setFormError("Please select a user.");
      return;
    }
    if (!Number.isFinite(amountNum) || amountNum <= 0) {
      setFormError("Amount must be a positive number.");
      return;
    }
    createManual.mutate(
      {
        userId: userId.trim(),
        subscriptionId: subscriptionId.trim() || undefined,
        amount: amountNum,
        status,
        reference: reference.trim() || undefined,
      },
      {
        onSuccess: () => handleClose(),
        onError: (err: { message?: string }) => setFormError(err?.message ?? "Failed to create payment"),
      }
    );
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">Payments</h1>
          <p className="text-zinc-400 mt-1">
            View all payments and add manual transactions linked to a user and subscription.
          </p>
        </div>
        <Button onClick={handleOpen}>Add manual payment</Button>
      </div>

      {error && (
        <div className="rounded-md border border-red-800 bg-red-900/30 px-3 py-2 text-sm text-red-200">
          {(error as { message?: string }).message ?? "Failed to load payments."}
        </div>
      )}

      <Card>
        <CardHeader>
          <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
            <div>
              <CardTitle>All payments</CardTitle>
              <CardDescription>M-Pesa and manual payments across all users.</CardDescription>
            </div>
            <div className="flex flex-col md:flex-row gap-3 w-full md:w-auto">
              <div className="flex-1 space-y-1">
                <Label className="text-xs uppercase tracking-wide text-slate-500">Search</Label>
                <Input
                  placeholder="User, plan, method, reference..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                />
              </div>
              <div className="flex gap-3 w-full md:w-auto">
                <div className="w-full md:w-40 space-y-1">
                  <Label className="text-xs uppercase tracking-wide text-slate-500">Status</Label>
                  <Select
                    value={statusFilter}
                    onChange={(e) =>
                      setStatusFilter(
                        e.target.value as "" | "pending" | "completed" | "failed"
                      )
                    }
                  >
                    <option value="">All</option>
                    <option value="completed">Completed</option>
                    <option value="pending">Pending</option>
                    <option value="failed">Failed</option>
                  </Select>
                </div>
                <div className="w-full md:w-40 space-y-1">
                  <Label className="text-xs uppercase tracking-wide text-slate-500">Method</Label>
                  <Select
                    value={methodFilter}
                    onChange={(e) =>
                      setMethodFilter(e.target.value as "" | "mpesa" | "manual")
                    }
                  >
                    <option value="">All</option>
                    <option value="mpesa">M-Pesa</option>
                    <option value="manual">Manual</option>
                  </Select>
                </div>
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
          ) : filteredPayments.length === 0 ? (
            <div className="py-8 text-center text-slate-500">
              No payments match your search or filters.
            </div>
          ) : (
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Date</TableHead>
                    <TableHead>User</TableHead>
                    <TableHead>Amount</TableHead>
                    <TableHead>Method</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Subscription / Ref</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredPayments.map((p) => (
                    <TableRow key={p.id}>
                      <TableCell className="text-slate-600">
                        {formatDate(p.createdAt)}
                      </TableCell>
                      <TableCell>
                        <div className="flex flex-col">
                          <span className="font-medium">{p.user?.name ?? "—"}</span>
                          <span className="text-xs text-slate-500">{p.user?.email}</span>
                        </div>
                      </TableCell>
                      <TableCell className="font-medium">
                        KES {Number(p.amount).toLocaleString()}
                      </TableCell>
                      <TableCell className="capitalize">{p.method}</TableCell>
                      <TableCell>
                        <Badge variant={statusVariant(p.status)}>
                          {p.status === "completed"
                            ? "Completed"
                            : p.status === "failed"
                              ? "Failed"
                              : "Pending"}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        {p.subscription?.plan?.name ?? (p.reference ? p.reference : "—")}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          )}
        </CardContent>
      </Card>

      <Modal open={modalOpen} onClose={handleClose} title="Add manual payment" description="Link a payment to a user and optionally to a subscription.">
        <form onSubmit={handleSubmit} className="space-y-4">
          {formError && <p className="text-sm text-red-500">{formError}</p>}
          <div className="space-y-2">
            <Label>User *</Label>
            <Select value={userId} onChange={(e) => setUserId(e.target.value)} required>
              <option value="">Select user</option>
              {users.map((u) => (
                <option key={u.id} value={u.id}>
                  {u.name} ({u.email})
                </option>
              ))}
            </Select>
          </div>
          <div className="space-y-2">
            <Label>Subscription (optional)</Label>
            <Select
              value={subscriptionId}
              onChange={(e) => setSubscriptionId(e.target.value)}
            >
              <option value="">None</option>
              {subscriptionsForUser.map((s) => (
                <option key={s.id} value={s.id}>
                  {s.plan?.name ?? s.id} — {s.status}
                </option>
              ))}
            </Select>
            {userId && subscriptionsForUser.length === 0 && (
              <p className="text-xs text-slate-500">This user has no subscriptions.</p>
            )}
          </div>
          <div className="space-y-2">
            <Label htmlFor="amount">Amount (KES) *</Label>
            <Input
              id="amount"
              type="number"
              min="1"
              step="0.01"
              placeholder="0"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              required
            />
          </div>
          <div className="space-y-2">
            <Label>Status</Label>
            <Select value={status} onChange={(e) => setStatus(e.target.value as "pending" | "completed" | "failed")}>
              <option value="pending">Pending</option>
              <option value="completed">Completed</option>
              <option value="failed">Failed</option>
            </Select>
            <p className="text-xs text-slate-500">
              If you set Completed and link a subscription, that subscription will be set to Active.
            </p>
          </div>
          <div className="space-y-2">
            <Label htmlFor="reference">Reference / note (optional)</Label>
            <Input
              id="reference"
              type="text"
              placeholder="e.g. Bank transfer ref"
              value={reference}
              onChange={(e) => setReference(e.target.value)}
            />
          </div>
          <div className="flex justify-end gap-2 pt-2">
            <Button type="button" variant="outline" onClick={handleClose}>
              Cancel
            </Button>
            <Button type="submit" loading={createManual.isPending}>
              Create payment
            </Button>
          </div>
        </form>
      </Modal>
    </div>
  );
}
