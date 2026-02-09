"use client";

import Link from "next/link";
import { Car, ClipboardList, FileText } from "lucide-react";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui";
import { useVehicles, useInspections, useMySubscription } from "@/lib/hooks";
import { formatDate } from "@/lib/utils";

export default function DashboardPage() {
  const { data: vehicles = [], isLoading: vehiclesLoading } = useVehicles();
  const { data: inspections = [], isLoading: inspectionsLoading } = useInspections();
  const { data: subscription, isLoading: subLoading } = useMySubscription();

  const loading = vehiclesLoading || inspectionsLoading || subLoading;
  const vehicleList = Array.isArray(vehicles) ? vehicles : [];
  const inspectionList = Array.isArray(inspections) ? inspections : [];
  const pending = inspectionList.filter(
    (x) => x.status === "pending" || x.status === "assigned"
  );
  const recent = inspectionList.slice(0, 5);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[40vh]">
        <div className="animate-spin h-8 w-8 border-2 border-[var(--primary)] border-t-transparent rounded-full" />
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-bold">Dashboard</h1>
        <p className="text-zinc-400 mt-1">
          Manage your vehicles and diagnostic inspections.
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-zinc-400">Vehicles</CardTitle>
            <Car className="h-4 w-4 text-zinc-500" />
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold">{vehicleList.length}</p>
            <Link href="/dashboard/vehicles" className="text-sm text-[var(--primary)] hover:underline">
              Manage vehicles
            </Link>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-zinc-400">Pending inspections</CardTitle>
            <ClipboardList className="h-4 w-4 text-zinc-500" />
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold">{pending.length}</p>
            <Link href="/dashboard/inspections" className="text-sm text-[var(--primary)] hover:underline">
              View inspections
            </Link>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-zinc-400">Subscription</CardTitle>
            <FileText className="h-4 w-4 text-zinc-500" />
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold">
              {subscription ? (subscription as { plan?: { name?: string } }).plan?.name ?? "Active" : "None"}
            </p>
            <Link href="/pricing" className="text-sm text-[var(--primary)] hover:underline">
              {subscription ? "Manage" : "Subscribe"}
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
                  className="flex items-center justify-between py-2 border-b border-zinc-800 last:border-0"
                >
                  <span className="text-sm">
                    {inv.vehicle?.make} {inv.vehicle?.model} — {formatDate(inv.requestedAt)}
                  </span>
                  <span
                    className={`text-xs px-2 py-1 rounded ${
                      inv.status === "completed"
                        ? "bg-emerald-900/40 text-emerald-300"
                        : inv.status === "in_progress"
                          ? "bg-amber-900/40 text-amber-300"
                          : "bg-zinc-700 text-zinc-300"
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
