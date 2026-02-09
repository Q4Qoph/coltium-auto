"use client";

import Link from "next/link";
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
          <Card className="hover:border-zinc-600 transition-colors cursor-pointer">
            <CardHeader>
              <CardTitle className="text-zinc-400">Users</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-3xl font-bold">{totalUsers}</p>
              <p className="text-sm text-zinc-500 mt-1">View and manage users & subscriptions</p>
            </CardContent>
          </Card>
        </Link>
        <Link href="/admin/inspections">
          <Card className="hover:border-zinc-600 transition-colors cursor-pointer">
            <CardHeader>
              <CardTitle className="text-zinc-400">Inspections</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-3xl font-bold">{inspectionList.length}</p>
              <p className="text-sm text-zinc-500 mt-1">Assign technicians and review status</p>
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
