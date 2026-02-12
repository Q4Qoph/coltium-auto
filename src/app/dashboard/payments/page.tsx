"use client";

import Link from "next/link";
import { Card, CardHeader, CardTitle, CardDescription, CardContent, Badge } from "@/components/ui";
import { useMyPayments } from "@/lib/hooks";

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


export default function DashboardPaymentsPage() {
  const { data: payments = [], isLoading, error } = useMyPayments();

  if (isLoading) {
    return (
      <div className="space-y-6">
        <div className="h-6 w-40 rounded-md bg-slate-200 animate-pulse" />
        <div className="h-4 w-64 rounded-md bg-slate-100 animate-pulse" />
        <Card>
          <CardContent className="py-8">
            <div className="space-y-3">
              {Array.from({ length: 5 }).map((_, i) => (
                <div key={i} className="h-12 w-full rounded-md bg-slate-100 animate-pulse" />
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold">Payments</h1>
        <p className="text-zinc-400 mt-1">Your payment history for subscriptions and diagnostics.</p>
      </div>

      {error && (
        <div className="rounded-md border border-red-800 bg-red-900/30 px-3 py-2 text-sm text-red-200">
          {(error as { message?: string }).message ?? "Failed to load payments."}
        </div>
      )}

      <Card>
        <CardHeader>
          <CardTitle>Payment history</CardTitle>
          <CardDescription>All payments linked to your account.</CardDescription>
        </CardHeader>
        <CardContent>
          {payments.length === 0 ? (
            <p className="text-zinc-500 text-sm">No payments yet.</p>
          ) : (
            <ul className="divide-y divide-slate-200">
              {payments.map((p) => (
                <li key={p.id} className="py-4 flex flex-wrap items-center justify-between gap-2">
                  <div>
                    <p className="font-medium">
                      KES {Number(p.amount).toLocaleString()}
                      {p.subscription?.plan && (
                        <span className="text-zinc-500 font-normal ml-2">
                          · {p.subscription.plan.name}
                        </span>
                      )}
                    </p>
                    <p className="text-sm text-zinc-500">
                      {formatDate(p.createdAt)}
                      {p.method === "manual" && p.reference && ` · ${p.reference}`}
                    </p>
                  </div>
                  <Badge variant={statusVariant(p.status)}>
                    {p.status === "completed" ? "Completed" : p.status === "failed" ? "Failed" : "Pending"}
                  </Badge>
                </li>
              ))}
            </ul>
          )}
          <p className="mt-4 text-sm text-zinc-500">
            Questions about a payment?{" "}
            <Link href="/contact" className="text-[var(--primary)] hover:underline">
              Contact us
            </Link>
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
