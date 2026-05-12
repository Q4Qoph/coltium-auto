"use client";

import Link from "next/link";
import { Users, ClipboardList, Mail } from "lucide-react";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui";
import { useUsers, useInspections, useAdminContactMessages } from "@/lib/hooks";
import type { ContactMessage } from "@/types";

function formatShortDate(iso: string) {
  return new Date(iso).toLocaleDateString(undefined, {
    month: "short",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
}

export default function AdminDashboardPage() {
  const { data: usersData } = useUsers();
  const { data: inspections = [] } = useInspections();
  const { data: contactMessages = [], isLoading: contactLoading } = useAdminContactMessages();

  const totalUsers = (usersData as { total?: number })?.total ?? 0;
  const inspectionList = Array.isArray(inspections) ? inspections : [];
  const contactList = Array.isArray(contactMessages) ? (contactMessages as ContactMessage[]) : [];
  const recentContacts = contactList.slice(0, 5);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold">Admin overview</h1>
        <p className="text-zinc-400 mt-1">Manage users, technicians, and inspections.</p>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
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
        <Link href="/admin/contact-messages">
          <Card className="cursor-pointer border-none shadow-sm bg-gradient-to-br from-violet-50 to-white hover:shadow-md transition-shadow h-full">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-xs font-semibold tracking-wide text-violet-700 uppercase">
                Contact
              </CardTitle>
              <Mail className="h-4 w-4 text-violet-500" />
            </CardHeader>
            <CardContent>
              <p className="text-3xl font-bold text-slate-900">{contactList.length}</p>
              <p className="text-sm text-slate-500 mt-1">Website form submissions</p>
            </CardContent>
          </Card>
        </Link>
      </div>

      <Card>
        <CardHeader className="flex flex-row items-start justify-between gap-4">
          <div>
            <CardTitle>Recent contact messages</CardTitle>
            <CardDescription>Latest inquiries from the public contact page.</CardDescription>
          </div>
          <Link
            href="/admin/contact-messages"
            className="text-sm text-[var(--primary)] hover:underline shrink-0"
          >
            View all
          </Link>
        </CardHeader>
        <CardContent>
          {contactLoading ? (
            <div className="space-y-2">
              {Array.from({ length: 3 }).map((_, i) => (
                <div
                  key={i}
                  className="h-10 w-full rounded-md bg-slate-100 border border-slate-100 animate-pulse"
                />
              ))}
            </div>
          ) : recentContacts.length === 0 ? (
            <p className="text-sm text-slate-500">No messages yet — they will appear here when visitors use the contact form.</p>
          ) : (
            <ul className="divide-y divide-slate-100">
              {recentContacts.map((m) => (
                <li key={m.id} className="py-3 first:pt-0">
                  <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-1">
                    <div>
                      <p className="font-medium text-slate-900">{m.name}</p>
                      <p className="text-sm text-slate-500">{m.email}</p>
                    </div>
                    <time className="text-xs text-slate-400 shrink-0">{formatShortDate(m.createdAt)}</time>
                  </div>
                  <p className="text-sm text-slate-600 mt-2 line-clamp-2 whitespace-pre-wrap">{m.message}</p>
                </li>
              ))}
            </ul>
          )}
        </CardContent>
      </Card>

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
