"use client";

import { useState, useMemo } from "react";
import { useAdminSubscriptions, useUpdateSubscriptionStatus } from "@/lib/hooks";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  Select,
  Button,
  Badge,
  Input,
  Label,
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableHead,
  TableCell,
} from "@/components/ui";
import type { AdminSubscriptionSummary } from "@/types";

function statusLabel(status: AdminSubscriptionSummary["status"]) {
  switch (status) {
    case "active":
      return "Active";
    case "pending":
      return "Pending payment";
    case "failed":
      return "Failed";
    case "cancelled":
      return "Cancelled";
    case "expired":
      return "Expired";
    case "trialing":
      return "Trialing";
    default:
      return status;
  }
}

export default function AdminSubscriptionsPage() {
  const { data: subs = [], isLoading, error } = useAdminSubscriptions();
  const updateStatus = useUpdateSubscriptionStatus();
  const [localStatus, setLocalStatus] = useState<Record<string, AdminSubscriptionSummary["status"]>>({});
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState<AdminSubscriptionSummary["status"] | "">("");

  const filteredSubs = useMemo(() => {
    const list = Array.isArray(subs) ? (subs as AdminSubscriptionSummary[]) : [];
    const term = search.toLowerCase().trim();

    return list.filter((sub) => {
      const matchesSearch =
        !term ||
        sub.user?.name?.toLowerCase().includes(term) ||
        sub.user?.email?.toLowerCase().includes(term) ||
        sub.plan?.name?.toLowerCase().includes(term);

      const matchesStatus = !statusFilter || sub.status === statusFilter;

      return matchesSearch && matchesStatus;
    });
  }, [subs, search, statusFilter]);

  const handleChange = (id: string, status: AdminSubscriptionSummary["status"]) => {
    setLocalStatus((prev) => ({ ...prev, [id]: status }));
  };

  const handleSave = (id: string) => {
    const status = localStatus[id];
    if (!status) return;
    updateStatus.mutate({ id, status });
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">Subscriptions & payments</h1>
          <p className="text-zinc-400 mt-1">
            Monitor subscription payments and adjust subscription status for users.
          </p>
        </div>
      </div>

      {error && (
        <div className="rounded-md border border-red-800 bg-red-900/30 px-3 py-2 text-sm text-red-200">
          {(error as { message?: string }).message ?? "Failed to load subscriptions."}
        </div>
      )}

      <Card>
        <CardHeader>
          <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
            <div>
              <CardTitle>All subscriptions</CardTitle>
              <CardDescription>Latest subscriptions with their most recent payment status.</CardDescription>
            </div>
            <div className="flex flex-col md:flex-row gap-3 w-full md:w-auto">
              <div className="flex-1 space-y-1">
                <Label className="text-xs uppercase tracking-wide text-slate-500">Search</Label>
                <Input
                  placeholder="User or plan..."
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
                      (e.target.value || "") as AdminSubscriptionSummary["status"] | ""
                    )
                  }
                >
                  <option value="">All</option>
                  <option value="active">Active</option>
                  <option value="pending">Pending</option>
                  <option value="failed">Failed</option>
                  <option value="cancelled">Cancelled</option>
                  <option value="expired">Expired</option>
                  <option value="trialing">Trialing</option>
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
          ) : filteredSubs.length === 0 ? (
            <div className="py-8 text-center text-slate-500">
              No subscriptions match your search or filters.
            </div>
          ) : (
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>User</TableHead>
                    <TableHead>Plan</TableHead>
                    <TableHead>Subscription status</TableHead>
                    <TableHead>Latest payment</TableHead>
                    <TableHead>Set status</TableHead>
                    <TableHead />
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredSubs.map((sub) => {
                    const latest = sub.latestPayment;
                    const currentStatus = localStatus[sub.id] ?? sub.status;
                    return (
                      <TableRow key={sub.id}>
                        <TableCell>
                          <div className="flex flex-col">
                            <span className="font-medium">
                              {sub.user?.name ?? "Unknown"}
                            </span>
                            <span className="text-xs text-zinc-500">
                              {sub.user?.email}
                            </span>
                          </div>
                        </TableCell>
                        <TableCell>{sub.plan?.name ?? "—"}</TableCell>
                        <TableCell>
                          <Badge
                            variant={
                              sub.status === "active"
                                ? "success"
                                : sub.status === "pending"
                                  ? "warning"
                                  : "default"
                            }
                          >
                            {statusLabel(sub.status)}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          {latest ? (
                            <div className="flex flex-col">
                              <span>
                                KES {latest.amount.toLocaleString()} · {latest.status}
                              </span>
                              <span className="text-xs text-zinc-500">
                                {new Date(latest.createdAt).toLocaleString()}
                              </span>
                            </div>
                          ) : (
                            <span className="text-xs text-zinc-500">No payments yet</span>
                          )}
                        </TableCell>
                        <TableCell>
                          <Select
                            value={currentStatus}
                            onChange={(e) =>
                              handleChange(
                                sub.id,
                                e.target.value as AdminSubscriptionSummary["status"]
                              )
                            }
                          >
                            <option value="pending">Pending</option>
                            <option value="active">Active</option>
                            <option value="failed">Failed</option>
                            <option value="cancelled">Cancelled</option>
                            <option value="expired">Expired</option>
                            <option value="trialing">Trialing</option>
                          </Select>
                        </TableCell>
                        <TableCell>
                          <Button
                            size="sm"
                            loading={updateStatus.isPending}
                            onClick={() => handleSave(sub.id)}
                          >
                            Save
                          </Button>
                        </TableCell>
                      </TableRow>
                    );
                  })}
                </TableBody>
              </Table>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}

