"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
  LayoutDashboard,
  Users,
  ClipboardList,
  FileText,
  CreditCard,
  Repeat,
  Package,
  LogOut,
  Menu,
  X,
} from "lucide-react";
import { useAuth } from "@/lib/auth-context";
import { cn } from "@/lib/utils";

const nav = [
  { href: "/admin", label: "Overview", icon: LayoutDashboard },
  { href: "/admin/users", label: "Users", icon: Users },
  { href: "/admin/technicians", label: "Technicians", icon: Users },
  { href: "/admin/plans", label: "Plans", icon: Package },
  { href: "/admin/subscriptions", label: "Subscriptions", icon: Repeat },
  { href: "/admin/payments", label: "Payments", icon: CreditCard },
  { href: "/admin/inspections", label: "Inspections", icon: ClipboardList },
  { href: "/admin/reports", label: "Reports", icon: FileText },
];

export default function AdminLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const pathname = usePathname();
  const router = useRouter();
  const { user, loading, logout } = useAuth();
  const [loggingOut, setLoggingOut] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const pathnameRef = useRef(pathname);
  pathnameRef.current = pathname;

  useEffect(() => {
    if (loading || loggingOut) return;
    const currentPath = pathnameRef.current;
    if (!user) {
      if (!currentPath.startsWith("/login")) {
        router.replace(`/login?from=${encodeURIComponent(currentPath)}`);
      }
      return;
    }
    if (user.role !== "admin") {
      const target =
        user.role === "technician" ? "/technician" : user.role === "user" ? "/dashboard" : "/";
      if (!currentPath.startsWith(target)) {
        router.replace(target);
      }
    }
  }, [user, loading, loggingOut, router]);

  useEffect(() => {
    setSidebarOpen(false);
  }, [pathname]);

  if (loading || !user) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white">
        <div className="space-y-2 w-full max-w-md px-6">
          <div className="h-6 w-40 rounded-md bg-slate-200 animate-pulse" />
          <div className="h-4 w-64 rounded-md bg-slate-100 animate-pulse" />
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

  return (
    <div className="min-h-screen flex flex-col bg-white text-slate-900 md:flex-row">
      <header className="sticky top-0 z-40 flex items-center justify-between border-b border-slate-200 bg-white/95 px-4 py-3 md:hidden">
        <Link href="/admin" className="inline-flex items-center">
          <Image
            src="/logo.png"
            alt="Coltium-Auto"
            width={126}
            height={36}
            className="h-9 w-auto object-contain"
            priority
          />
        </Link>
        <button
          type="button"
          onClick={() => setSidebarOpen(true)}
          className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-slate-200 text-slate-700"
          aria-label="Open admin menu"
          aria-expanded={sidebarOpen}
        >
          <Menu className="h-5 w-5" />
        </button>
      </header>

      {sidebarOpen && (
        <button
          type="button"
          className="fixed inset-0 z-40 bg-black/40 md:hidden"
          onClick={() => setSidebarOpen(false)}
          aria-label="Close admin menu"
        />
      )}

      <aside
        className={cn(
          "fixed inset-y-0 left-0 z-50 flex h-dvh w-72 shrink-0 flex-col border-r border-slate-200 bg-white/95 transition-transform duration-200 md:static md:z-auto md:h-auto md:w-64 md:translate-x-0",
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        )}
      >
        <div className="px-5 py-4 border-b border-slate-200">
          <div className="flex items-start justify-between gap-4">
            <div>
              <Link
                href="/admin"
                className="inline-flex items-center"
                onClick={() => setSidebarOpen(false)}
              >
                <Image
                  src="/logo.png"
                  alt="Coltium-Auto"
                  width={126}
                  height={36}
                  className="h-9 w-auto object-contain"
                  priority
                />
              </Link>
              <p className="text-xs text-slate-500 mt-1">Admin console</p>
            </div>
            <button
              type="button"
              onClick={() => setSidebarOpen(false)}
              className="inline-flex h-8 w-8 items-center justify-center rounded-full text-slate-500 hover:bg-slate-100 md:hidden"
              aria-label="Close admin menu"
            >
              <X className="h-4 w-4" />
            </button>
          </div>
        </div>
        <nav className="flex-1 px-3 py-4 space-y-1">
          {nav.map((item) => {
            const active = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setSidebarOpen(false)}
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
            type="button"
            onClick={async () => {
              setSidebarOpen(false);
              setLoggingOut(true);
              await logout();
              router.push("/");
            }}
            className="flex w-full items-center gap-2 rounded-full px-3 py-2 text-sm text-slate-600 hover:bg-slate-100 hover:text-slate-900"
          >
            <LogOut className="h-4 w-4" />
            <span>Sign out</span>
          </button>
        </div>
      </aside>
      <main className="min-w-0 flex-1 overflow-auto bg-white p-4 sm:p-6">{children}</main>
    </div>
  );
}
