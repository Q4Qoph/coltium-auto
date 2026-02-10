"use client";

import Link from "next/link";
import { Users, ClipboardList } from "lucide-react";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui";
import { useUsers, useInspections } from "@/lib/hooks";

export default function AdminDashboardPage() {
  const { data: usersData } = useUsers();
  const { data: inspections = [] } = useInspections();

  const totalUsers = (usersData as { total?: number })?.total ?? 0;
  const inspectionList = Array.isArray(inspections) ? inspections : [];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold">Admin overview</h1>
        <p className="text-zinc-400 mt-1">Manage users, technicians, and inspections.</p>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <Link href="/admin/users">
          <Card className="cursor-pointer border-none shadow-sm bg-gradient-to-br from-sky-50 to-white hover:shadow-md transition-shadow">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-xs font-semibold tracking-wide text-sky-700 uppercase">
                Users
              </CardTitle>
              <Users className="h-4 w-4 text-sky-500" />
            </CardHeader>
            <CardContent>
              <p className="text-3xl font-bold text-slate-900">{totalUsers}</p>
              <p className="text-sm text-slate-500 mt-1">View and manage users & subscriptions</p>
            </CardContent>
          </Card>
        </Link>
        <Link href="/admin/inspections">
          <Card className="cursor-pointer border-none shadow-sm bg-gradient-to-br from-amber-50 to-white hover:shadow-md transition-shadow">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-xs font-semibold tracking-wide text-amber-700 uppercase">
                Inspections
              </CardTitle>
              <ClipboardList className="h-4 w-4 text-amber-500" />
            </CardHeader>
            <CardContent>
              <p className="text-3xl font-bold text-slate-900">{inspectionList.length}</p>
              <p className="text-sm text-slate-500 mt-1">Assign technicians and review status</p>
            </CardContent>
          </Card>
        </Link>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Quick links</CardTitle>
          <CardDescription>Admin actions</CardDescription>
        </CardHeader>
        <CardContent className="flex flex-wrap gap-4">
          <Link href="/admin/technicians">
            <span className="text-[var(--primary)] hover:underline">Manage technicians</span>
          </Link>
          <Link href="/admin/inspections">
            <span className="text-[var(--primary)] hover:underline">Assign inspections</span>
          </Link>
          <Link href="/admin/reports">
            <span className="text-[var(--primary)] hover:underline">Review reports</span>
          </Link>
        </CardContent>
      </Card>
    </div>
  );
}
