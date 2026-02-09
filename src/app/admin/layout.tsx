"use client";

import { useEffect } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { LayoutDashboard, Users, ClipboardList, FileText, LogOut } from "lucide-react";
import { useAuth } from "@/lib/auth-context";
import { cn } from "@/lib/utils";

const nav = [
  { href: "/admin", label: "Overview", icon: LayoutDashboard },
  { href: "/admin/users", label: "Users", icon: Users },
  { href: "/admin/technicians", label: "Technicians", icon: Users },
  { href: "/admin/inspections", label: "Inspections", icon: ClipboardList },
  { href: "/admin/reports", label: "Reports", icon: FileText },
];

export default function AdminLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const pathname = usePathname();
  const router = useRouter();
  const { user, loading, logout } = useAuth();

  useEffect(() => {
    if (loading) return;
    if (!user) {
      router.replace("/login?from=/admin");
      return;
    }
    if (user.role !== "admin") {
      if (user.role === "technician") router.replace("/technician");
      else if (user.role === "user") router.replace("/dashboard");
      else router.replace("/");
    }
  }, [user, loading, router]);

  if (loading || !user) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin h-8 w-8 border-2 border-[var(--primary)] border-t-transparent rounded-full" />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex">
      <aside className="w-56 border-r border-zinc-800 bg-zinc-900/50 flex flex-col">
        <div className="p-4 border-b border-zinc-800">
          <Link href="/admin" className="font-semibold text-white">
            Coltium-Auto
          </Link>
          <p className="text-xs text-zinc-500 mt-1">Admin</p>
        </div>
        <nav className="flex-1 p-2 space-y-1">
          {nav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "flex items-center gap-2 rounded-md px-3 py-2 text-sm transition-colors",
                pathname === item.href
                  ? "bg-[var(--primary)]/20 text-[var(--primary)]"
                  : "text-zinc-400 hover:bg-zinc-800 hover:text-white"
              )}
            >
              <item.icon className="h-4 w-4" />
              {item.label}
            </Link>
          ))}
        </nav>
        <div className="p-2 border-t border-zinc-800">
          <Link
            href="/dashboard"
            className="flex items-center gap-2 rounded-md px-3 py-2 text-sm text-zinc-400 hover:bg-zinc-800 hover:text-white"
          >
            User dashboard
          </Link>
          <p className="px-3 py-2 text-xs text-zinc-500 truncate">{user.email}</p>
          <button
            onClick={() => {
              logout();
              router.push("/");
            }}
            className="flex w-full items-center gap-2 rounded-md px-3 py-2 text-sm text-zinc-400 hover:bg-zinc-800 hover:text-white"
          >
            <LogOut className="h-4 w-4" />
            Sign out
          </button>
        </div>
      </aside>
      <main className="flex-1 p-6 overflow-auto">{children}</main>
    </div>
  );
}
