"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useOptionalAuth } from "@/lib/auth-context";
import { useWebsiteTheme } from "@/lib/website-theme";
import { Moon, Sun } from "lucide-react";
import { cn } from "@/lib/utils";

function ThemeSwitch({
  theme,
  onToggle,
}: {
  theme: "dark" | "light";
  onToggle: () => void;
}) {
  const isLight = theme === "light";
  return (
    <button
      type="button"
      role="switch"
      aria-checked={isLight}
      aria-label={isLight ? "Switch to dark theme" : "Switch to light theme"}
      onClick={onToggle}
      className={cn(
        "relative inline-flex h-6 w-11 shrink-0 cursor-pointer rounded-full border transition-colors",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--primary)] focus-visible:ring-offset-2",
        isLight
          ? "border-slate-300 bg-slate-200 shadow-inner"
          : "border-slate-600/80 bg-slate-800 shadow-inner"
      )}
    >
      <span
        className={cn(
          "pointer-events-none absolute top-0.5 left-0.5 flex h-5 w-5 items-center justify-center rounded-full bg-white shadow-md ring-1 ring-black/5 transition-transform duration-200 ease-out",
          isLight && "translate-x-5"
        )}
      >
        {isLight ? (
          <Sun className="h-3 w-3 text-amber-600" strokeWidth={2} />
        ) : (
          <Moon className="h-3 w-3 text-slate-700" strokeWidth={2} />
        )}
      </span>
    </button>
  );
}

const Navbar = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const pathname = usePathname();
  const auth = useOptionalAuth();
  const { theme, toggleTheme } = useWebsiteTheme();

  const isActive = (href: string) => {
    if (href === "/") return pathname === "/";
    return pathname === href || pathname.startsWith(href + "/");
  };

  /** Nav bar stays black in both themes — links are always light on dark. */
  const deskLinkClass = (href: string) => {
    const active = isActive(href);
    return active
      ? "text-white border-[var(--primary)]"
      : "text-gray-300 border-transparent hover:text-white hover:border-[var(--primary)]";
  };

  const mobileNavLinkClass = (href: string) => {
    const active = isActive(href);
    return active
      ? "text-white font-semibold"
      : "text-gray-300 hover:text-white";
  };

  useEffect(() => {
    setMobileMenuOpen(false);
  }, [pathname]);

  const navItems = [
    { href: "/", label: "Home" },
    { href: "/about", label: "About" },
    { href: "/services", label: "Services" },
    { href: "/pricing", label: "Pricing" },
    { href: "/faqs", label: "Faqs" },
    { href: "/contact", label: "Contact" },
  ];

  return (
    <motion.header
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
      className="fixed top-0 left-0 right-0 z-50 w-full bg-black bg-opacity-90 pb-3 pt-[max(0.75rem,env(safe-area-inset-top))] text-white transition-all duration-300"
    >
      <div className="container mx-auto flex items-center justify-between px-6">
        <div className="flex items-center">
          <Link href="/" className="flex items-center">
            <Image
              src="/logo.png"
              alt="Coltium-Auto"
              width={126}
              height={36}
              className="h-9 w-auto"
              priority
            />
          </Link>
        </div>

        <div className="hidden items-center space-x-8 md:flex">
          {navItems.map(({ href, label }) => (
            <Link
              key={href}
              href={href}
              className={cn("border-b-2 pb-1 text-sm transition-colors", deskLinkClass(href))}
            >
              {label}
            </Link>
          ))}
          {auth?.user ? (
            <Link
              href={
                auth.user.role === "admin"
                  ? "/admin"
                  : auth.user.role === "technician"
                  ? "/technician"
                  : "/dashboard"
              }
              className="rounded-full bg-zinc-700 px-4 py-1.5 text-sm text-white transition-colors hover:bg-zinc-600"
            >
              Dashboard
            </Link>
          ) : (
            <>
              <Link href="/login" className="text-sm text-gray-300 transition-colors hover:text-white">
                Login
              </Link>
              <Link
                href="/signup"
                className="rounded-full bg-[var(--primary)] px-5 py-1.5 text-sm !text-white transition-colors hover:bg-[var(--primary-hover)]"
              >
                Sign up
              </Link>
            </>
          )}
          <ThemeSwitch theme={theme} onToggle={toggleTheme} />
        </div>

        <button
          type="button"
          className="rounded-lg p-2 -mr-2 text-white transition-colors hover:bg-white/10 focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--primary)] md:hidden"
          onClick={() => setMobileMenuOpen((open) => !open)}
          aria-expanded={mobileMenuOpen}
          aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
        >
          {mobileMenuOpen ? (
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          ) : (
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          )}
        </button>
      </div>

      {/* Mobile: compact grid + short actions row */}
      {mobileMenuOpen && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: "auto" }}
          exit={{ opacity: 0, height: 0 }}
          className="border-white/10 bg-black bg-opacity-95 md:hidden"
        >
          <div className="container mx-auto max-h-[min(75vh,420px)] overflow-y-auto overscroll-contain px-6 py-2.5">
            <div className="grid grid-cols-2 gap-x-3 gap-y-1 text-sm">
              {navItems.map(({ href, label }) => (
                <Link
                  key={href}
                  href={href}
                  onClick={() => setMobileMenuOpen(false)}
                  className={cn("rounded-md py-2 pl-1 transition-colors", mobileNavLinkClass(href))}
                >
                  {label}
                </Link>
              ))}
            </div>

            <div className="mt-3 flex flex-wrap items-center gap-3 border-t border-white/10 pt-3">
              <ThemeSwitch theme={theme} onToggle={toggleTheme} />
              {auth?.user ? (
                <Link
                  href={
                    auth.user.role === "admin"
                      ? "/admin"
                      : auth.user.role === "technician"
                      ? "/technician"
                      : "/dashboard"
                  }
                  onClick={() => setMobileMenuOpen(false)}
                  className="ml-auto rounded-full bg-zinc-700 px-4 py-1.5 text-sm text-white"
                >
                  Dashboard
                </Link>
              ) : (
                <div className="ml-auto flex flex-wrap items-center gap-2">
                  <Link
                    href="/login"
                    onClick={() => setMobileMenuOpen(false)}
                    className="rounded-full px-3 py-1.5 text-sm text-gray-300 hover:text-white"
                  >
                    Login
                  </Link>
                  <Link
                    href="/signup"
                    onClick={() => setMobileMenuOpen(false)}
                    className="rounded-full bg-[var(--primary)] px-4 py-1.5 text-sm !text-white hover:bg-[var(--primary-hover)]"
                  >
                    Sign up
                  </Link>
                </div>
              )}
            </div>
          </div>
        </motion.div>
      )}
    </motion.header>
  );
};

export default Navbar;
