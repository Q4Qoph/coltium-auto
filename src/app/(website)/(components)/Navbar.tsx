"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useOptionalAuth } from "@/lib/auth-context";
import { useWebsiteTheme } from "@/lib/website-theme";
import { Moon, Sun } from "lucide-react";

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const pathname = usePathname();
  const auth = useOptionalAuth();
  const { theme, toggleTheme } = useWebsiteTheme();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const isActive = (href: string) => {
    if (href === "/") return pathname === "/";
    return pathname === href || pathname.startsWith(href + "/");
  };

  return (
    <motion.header
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
      className="fixed w-full z-50 transition-all duration-300 py-4 bg-black bg-opacity-90"
    >
      <div className="container mx-auto px-6 flex justify-between items-center">
        <div className="flex items-center">
          <Link href="/" className="flex items-center">
            <Image
              src="/logo.png"
              alt="Coltium-Auto"
              width={140}
              height={40}
              priority
            />
          </Link>

        </div>

        <div className="hidden md:flex items-center space-x-8">
          <Link
            href="/"
            className={`text-sm pb-1 border-b-2 transition-colors ${
              isActive("/")
                ? "text-white border-[var(--primary)]"
                : "text-gray-300 border-transparent hover:text-white hover:border-[var(--primary)]"
            }`}
          >
            Home
          </Link>
          <Link
            href="/about"
            className={`text-sm pb-1 border-b-2 transition-colors ${
              isActive("/about")
                ? "text-white border-[var(--primary)]"
                : "text-gray-300 border-transparent hover:text-white hover:border-[var(--primary)]"
            }`}
          >
            About
          </Link>
          <Link
            href="/services"
            className={`text-sm pb-1 border-b-2 transition-colors ${
              isActive("/services")
                ? "text-white border-[var(--primary)]"
                : "text-gray-300 border-transparent hover:text-white hover:border-[var(--primary)]"
            }`}
          >
            Services
          </Link>
          <Link
            href="/pricing"
            className={`text-sm pb-1 border-b-2 transition-colors ${
              isActive("/pricing")
                ? "text-white border-[var(--primary)]"
                : "text-gray-300 border-transparent hover:text-white hover:border-[var(--primary)]"
            }`}
          >
            Pricing
          </Link>
          <Link
            href="/faqs"
            className={`text-sm pb-1 border-b-2 transition-colors ${
              isActive("/faqs")
                ? "text-white border-[var(--primary)]"
                : "text-gray-300 border-transparent hover:text-white hover:border-[var(--primary)]"
            }`}
          >
            Faqs
          </Link>
          <Link
            href="/contact"
            className={`text-sm pb-1 border-b-2 transition-colors ${
              isActive("/contact")
                ? "text-white border-[var(--primary)]"
                : "text-gray-300 border-transparent hover:text-white hover:border-[var(--primary)]"
            }`}
          >
            Contact
          </Link>
          {auth?.user ? (
            <Link
              href={
                auth.user.role === "admin"
                  ? "/admin"
                  : auth.user.role === "technician"
                  ? "/technician"
                  : "/dashboard"
              }
              className="bg-zinc-700 text-white hover:bg-zinc-600 transition-colors px-4 py-2 rounded-full text-sm"
            >
              Dashboard
            </Link>
          ) : (
            <>
              <Link
                href="/login"
                className="text-sm text-gray-300 hover:text-white transition-colors"
              >
                Login
              </Link>
              <Link
                href="/signup"
                className="bg-[var(--primary)] text-white transition-colors px-6 py-2 rounded-full text-sm"
              >
                Sign up
              </Link>
            </>
          )}
          {/* Theme toggle: simple circle with tooltip */}
          <button
            type="button"
            onClick={toggleTheme}
            aria-label="Toggle website theme"
            title="Toggle Mode"
            className="ml-4 inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-slate-600/70 bg-slate-900/70 text-slate-200 hover:bg-slate-800/80 transition-colors"
          >
            {theme === "dark" ? (
              <Moon className="h-4 w-4" />
            ) : (
              <Sun className="h-4 w-4" />
            )}
          </button>
        </div>

        <button
          className="md:hidden text-white"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          exit={{ opacity: 0, height: 0 }}
          className={`md:hidden ${theme === "dark" ? "bg-black bg-opacity-95" : "bg-white border-b border-slate-200"}`}
        >
          <div className="container mx-auto px-6 py-4 flex flex-col space-y-4">
            <Link
              href="/"
              className={`py-2 transition-colors ${
                isActive("/") ? "text-white font-semibold" : "text-gray-300 hover:text-white"
              }`}
            >
              Home
            </Link>
            <Link
              href="/about"
              className={`py-2 transition-colors ${
                isActive("/about") ? "text-white font-semibold" : "text-gray-300 hover:text-white"
              }`}
            >
              About
            </Link>
            <Link
              href="/services"
              className={`py-2 transition-colors ${
                isActive("/services") ? "text-white font-semibold" : "text-gray-300 hover:text-white"
              }`}
            >
              Services
            </Link>
            <Link
              href="/pricing"
              className={`py-2 transition-colors ${
                isActive("/pricing") ? "text-white font-semibold" : "text-gray-300 hover:text-white"
              }`}
            >
              Pricing
            </Link>
            <Link
              href="/faqs"
              className={`py-2 transition-colors ${
                isActive("/faqs") ? "text-white font-semibold" : "text-gray-300 hover:text-white"
              }`}
            >
              Faqs
            </Link>
            <Link
              href="/contact"
              className={`py-2 transition-colors ${
                isActive("/contact") ? "text-white font-semibold" : "text-gray-300 hover:text-white"
              }`}
            >
              Contact
            </Link>
            <button
              type="button"
              onClick={toggleTheme}
              className="mt-2 flex items-center gap-2 rounded-full border border-slate-600/70 bg-slate-900/70 px-3 py-1 text-xs text-gray-200"
              aria-label="Toggle website theme"
              aria-pressed={theme === "light"}
            >
              <span>Theme</span>
              <span className="relative inline-flex h-4 w-8 items-center rounded-full bg-slate-800">
                <span
                  className={`absolute h-3 w-3 rounded-full bg-white shadow transform transition-transform ${
                    theme === "dark" ? "translate-x-1" : "translate-x-4"
                  }`}
                />
              </span>
              {theme === "dark" ? (
                <Moon className="h-3 w-3" />
              ) : (
                <Sun className="h-3 w-3" />
              )}
            </button>
            {auth?.user ? (
              <Link href={auth.user.role === "admin" ? "/admin" : auth.user.role === "technician" ? "/technician" : "/dashboard"} className="bg-zinc-700 text-white px-6 py-2 rounded-full text-sm self-start">
                Dashboard
              </Link>
            ) : (
              <>
                <Link href="/login" className="text-gray-300 hover:text-white transition-colors py-2">Login</Link>
                <Link href="/signup" className="bg-[var(--primary)] hover:bg-[var(--primary-hover)] text-white px-6 py-2 rounded-full text-sm self-start">
                  Sign up
                </Link>
              </>
            )}
          </div>
        </motion.div>
      )}
    </motion.header>
  );
};

export default Navbar;