"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import Image from "next/image";
import { useOptionalAuth } from "@/lib/auth-context";

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const auth = useOptionalAuth();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <motion.header
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
      className={`fixed w-full z-50 transition-all duration-300 ${scrolled ? 'bg-black bg-opacity-90 py-3' : 'bg-transparent py-6'
        }`}
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
          <Link href="/" className="text-sm text-gray-300 hover:text-white transition-colors">Home</Link>
          <Link href="/about" className="text-sm text-gray-300 hover:text-white transition-colors">About</Link>
          <Link href="/services" className="text-sm text-gray-300 hover:text-white transition-colors">Services</Link>
          <Link href="/pricing" className="text-sm text-gray-300 hover:text-white transition-colors">Pricing</Link>
          <Link href="/faqs" className="text-sm text-gray-300 hover:text-white transition-colors">Faqs</Link>
          <Link href="/contact" className="text-sm text-gray-300 hover:text-white transition-colors">Contact</Link>
          {auth?.user ? (
            <Link href={auth.user.role === "admin" ? "/admin" : auth.user.role === "technician" ? "/technician" : "/dashboard"} className="bg-zinc-700 text-white hover:bg-zinc-600 transition-colors px-4 py-2 rounded-sm text-sm">
              Dashboard
            </Link>
          ) : (
            <>
              <Link href="/login" className="text-sm text-gray-300 hover:text-white transition-colors">Login</Link>
              <Link href="/signup" className="bg-[var(--primary)] text-white transition-colors px-6 py-2 rounded-sm text-sm">
                Sign up
              </Link>
            </>
          )}
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
          className="md:hidden bg-black bg-opacity-95"
        >
          <div className="container mx-auto px-6 py-4 flex flex-col space-y-4">
            <Link href="/" className="text-gray-300 hover:text-white transition-colors py-2">Home</Link>
            <Link href="/about" className="text-gray-300 hover:text-white transition-colors py-2">About</Link>
            <Link href="/services" className="text-gray-300 hover:text-white transition-colors py-2">Services</Link>
            <Link href="/pricing" className="text-gray-300 hover:text-white transition-colors py-2">Pricing</Link>
            <Link href="/faqs" className="text-gray-300 hover:text-white transition-colors py-2">Faqs</Link>
            <Link href="/contact" className="text-gray-300 hover:text-white transition-colors py-2">Contact</Link>
            {auth?.user ? (
              <Link href={auth.user.role === "admin" ? "/admin" : auth.user.role === "technician" ? "/technician" : "/dashboard"} className="bg-zinc-700 text-white px-6 py-2 rounded-sm text-sm self-start">
                Dashboard
              </Link>
            ) : (
              <>
                <Link href="/login" className="text-gray-300 hover:text-white transition-colors py-2">Login</Link>
                <Link href="/signup" className="bg-[var(--primary)] hover:bg-[var(--primary-hover)] text-white px-6 py-2 rounded-sm text-sm self-start">
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