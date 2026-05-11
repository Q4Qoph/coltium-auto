"use client";

import Link from "next/link";
import Image from "next/image";
import { ClipboardList, FileText } from "lucide-react";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui";
import { useInspections, useMySubscription } from "@/lib/hooks";
import { formatDate } from "@/lib/utils";

export default function DashboardPage() {
  const {
    data: inspections = [],
    isLoading: inspectionsLoading,
    error: inspectionsError,
  } = useInspections();
  const {
    data: subscription,
    isLoading: subLoading,
    error: subscriptionError,
  } = useMySubscription();

  const loading = inspectionsLoading || subLoading;
  const error = inspectionsError || subscriptionError;
  const inspectionList = Array.isArray(inspections) ? inspections : [];
  const pending = inspectionList.filter(
    (x) => x.status === "pending" || x.status === "assigned"
  );
  const recent = inspectionList.slice(0, 5);

  if (loading && !error) {
    return (
      <div className="space-y-8">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <div className="h-6 w-40 rounded-md bg-slate-200 animate-pulse" />
            <div className="mt-2 h-4 w-full max-w-64 rounded-md bg-slate-100 animate-pulse" />
          </div>
          <div className="h-8 w-32 rounded-md bg-slate-200 animate-pulse" />
        </div>
        <div className="grid gap-4 md:grid-cols-3">
          {Array.from({ length: 3 }).map((_, i) => (
            <div
              key={i}
              className="h-32 w-full rounded-lg bg-slate-100 border border-slate-100 animate-pulse"
            />
          ))}
        </div>
        <div className="h-64 w-full rounded-lg bg-slate-100 border border-slate-100 animate-pulse" />
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold">Dashboard</h1>
          <p className="text-zinc-400 mt-1">
            Request and track diagnostic inspections.
          </p>
        </div>
        <Image
          src="/logo.png"
          alt="Coltium-Auto"
          width={120}
          height={40}
          className="h-8 w-auto"
        />
      </div>

      {error && (
        <div className="rounded-md border border-red-800 bg-red-900/30 px-3 py-2 text-sm text-red-200">
          {(error as { message?: string }).message ?? "Something went wrong loading your data."}
        </div>
      )}

      <div className="grid gap-4 md:grid-cols-2">
        <Card className="bg-gradient-to-br from-amber-50 to-white border-none shadow-sm">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-xs font-semibold tracking-wide text-amber-700 uppercase">
              Pending inspections
            </CardTitle>
            <ClipboardList className="h-4 w-4 text-amber-500" />
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold text-slate-900">{pending.length}</p>
            <Link href="/dashboard/inspections" className="text-sm text-[var(--primary)] hover:underline">
              View inspections
            </Link>
          </CardContent>
        </Card>
        <Card className="bg-gradient-to-br from-emerald-50 to-white border-none shadow-sm">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-xs font-semibold tracking-wide text-emerald-700 uppercase">
              Subscription
            </CardTitle>
            <FileText className="h-4 w-4 text-emerald-500" />
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold text-slate-900">
              {subscription
                ? (subscription as { status?: string }).status === "pending"
                  ? "Pending activation"
                  : (subscription as { plan?: { name?: string } }).plan?.name ?? "Active"
                : "None"}
            </p>
            <Link href="/pricing" className="text-sm text-[var(--primary)] hover:underline">
              {subscription
                ? (subscription as { status?: string }).status === "pending"
                  ? "View options"
                  : "Manage"
                : "Subscribe"}
            </Link>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Recent inspections</CardTitle>
          <CardDescription>Latest inspection requests and status</CardDescription>
        </CardHeader>
        <CardContent>
          {recent.length === 0 ? (
            <p className="text-zinc-500 text-sm">No inspections yet.</p>
          ) : (
            <ul className="space-y-2">
              {recent.map((inv) => (
                <li
                  key={inv.id}
                  className="flex flex-col gap-2 py-2 border-b border-slate-200 last:border-0 sm:flex-row sm:items-center sm:justify-between"
                >
                  <span className="text-sm">
                    {inv.serviceType
                      ? `${String(inv.serviceType).replace(/_/g, " ")} — `
                      : ""}
                    {formatDate(inv.requestedAt)}
                  </span>
                  <span
                    className={`text-xs px-2.5 py-1 rounded-full font-semibold tracking-wide uppercase ${
                      inv.status === "completed"
                        ? "bg-emerald-50 text-emerald-700"
                        : inv.status === "in_progress"
                          ? "bg-amber-50 text-amber-700"
                          : "bg-slate-100 text-slate-700"
                    }`}
                  >
                    {inv.status.replace("_", " ")}
                  </span>
                </li>
              ))}
            </ul>
          )}
          <Link
            href="/dashboard/inspections"
            className="inline-block mt-4 text-sm text-[var(--primary)] hover:underline"
          >
            View all inspections
          </Link>
        </CardContent>
      </Card>
    </div>
  );
}
