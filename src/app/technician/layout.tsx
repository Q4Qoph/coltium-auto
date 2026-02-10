"use client";

import { useEffect } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { ClipboardList, LayoutDashboard, LogOut } from "lucide-react";
import { useAuth } from "@/lib/auth-context";
import { cn } from "@/lib/utils";

export default function TechnicianLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const pathname = usePathname();
  const router = useRouter();
  const { user, loading, logout } = useAuth();

  useEffect(() => {
    if (loading) return;
    if (!user) {
      router.replace("/login?from=/technician");
      return;
    }
    if (user.role !== "technician" && user.role !== "admin") {
      if (user.role === "user") router.replace("/dashboard");
      else router.replace("/");
    }
  }, [user, loading, router]);

  if (loading || !user) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[var(--background)]">
        <div className="space-y-2 w-full max-w-md px-6">
          <div className="h-6 w-40 rounded-md bg-slate-200 animate-pulse" />
          <div className="mt-2 h-4 w-64 rounded-md bg-slate-100 animate-pulse" />
          <div className="mt-4 space-y-2">
            {Array.from({ length: 4 }).map((_, i) => (
              <div
                key={i}
                className="h-8 w-full rounded-md bg-slate-100 border border-slate-100 animate-pulse"
              />
            ))}
          </div>
        </div>
      </div>
    );
  }

  const nav = [
    { href: "/technician", label: "Assigned jobs", icon: ClipboardList },
  ] as const;

  return (
    <div className="min-h-screen flex bg-[var(--background)] text-slate-900">
      <aside className="w-64 bg-white/95 border-r border-slate-200 flex flex-col">
        <div className="px-5 py-4 border-b border-slate-200">
          <Link href="/technician" className="inline-flex items-center gap-2">
            <span className="h-2 w-2 rounded-full bg-[var(--primary)]" />
            <span className="font-semibold tracking-tight text-slate-900">Coltium-Auto</span>
          </Link>
          <p className="text-xs text-slate-500 mt-1">Technician workspace</p>
        </div>
        <nav className="flex-1 px-3 py-4 space-y-1">
          {nav.map((item) => {
            const active = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "flex items-center gap-3 rounded-full px-3 py-2 text-sm font-medium transition-colors",
                  active
                    ? "bg-[var(--primary)] text-white"
                    : "text-slate-600 hover:bg-slate-100 hover:text-slate-900"
                )}
              >
                <item.icon
                  className={cn(
                    "h-4 w-4",
                    active ? "text-white" : "text-slate-500"
                  )}
                />
                <span>{item.label}</span>
              </Link>
            );
          })}
        </nav>
        <div className="px-4 py-4 border-t border-slate-200 space-y-2">
          <p className="px-2 py-1 text-xs text-slate-500 rounded-full bg-slate-50 truncate">
            {user.email}
          </p>
          <button
            onClick={() => {
              logout();
              router.push("/");
            }}
            className="flex w-full items-center gap-2 rounded-full px-3 py-2 text-sm text-slate-600 hover:bg-slate-100 hover:text-slate-900"
          >
            <LogOut className="h-4 w-4" />
            <span>Sign out</span>
          </button>
        </div>
      </aside>
      <main className="flex-1 p-6 overflow-auto bg-[var(--background)]">{children}</main>
    </div>
  );
}
