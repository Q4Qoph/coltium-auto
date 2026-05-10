"use client"

import React from 'react';
import Link from 'next/link';
import { ArrowUp } from 'lucide-react';
import { FaInstagram, FaFacebook, FaXTwitter, FaTiktok, FaYoutube } from 'react-icons/fa6';
import Image from 'next/image';
import { CONTACT, mailtoUrl, telUrl } from '@/lib/contact';
import { useWebsiteTheme } from '@/lib/website-theme';
import { cn } from '@/lib/utils';

const Footer = () => {
  const { theme } = useWebsiteTheme();
  const isDark = theme === "dark";

  return (
    <footer
      className={cn(
        "p-8",
        isDark ? "bg-black text-white" : "bg-white text-slate-900 border-t border-slate-200"
      )}
    >
      <div className="container mx-auto px-6">
        {/* Top part with logo and tagline */}
        <div className="flex flex-col md:flex-row justify-between items-start mb-16">
          <div className="mb-8 md:mb-0">
            <Image
              src="/logo.png"
              alt="Coltium-Auto"
              width={150}
              height={50}
              className="mb-4"
            />

            <p className={cn("max-w-sm", isDark ? "text-gray-400" : "text-slate-600")}>
              Independent mobile vehicle diagnostic and technical oversight. We diagnose correctly, explain clearly, and guide owners and organisations toward informed decisions — before money is spent on repairs.
            </p>


            <div className="mt-8">
              <Link href="/contact">
                <div
                  className={cn(
                    "inline-flex items-center rounded-full px-6 py-2 transition duration-300",
                    isDark
                      ? "border border-white hover:bg-white hover:text-black"
                      : "border border-slate-900 text-slate-900 hover:bg-slate-900 hover:text-white"
                  )}
                >
                  Contact Us
                  <span className="ml-2">→</span>
                </div>
              </Link>
            </div>
          </div>

          {/* Address and Contact */}
          <div className="mb-8 md:mb-0">
            <h3 className={cn("mb-2", isDark ? "text-gray-400" : "text-slate-500")}>Address</h3>
            <p className="text-lg mb-6">{CONTACT.address}</p>

            <h3 className={cn("mb-2", isDark ? "text-gray-400" : "text-slate-500")}>Contact Us</h3>
            <a href={telUrl} className={cn("text-lg block mb-1 transition-colors", isDark ? "hover:text-white" : "hover:text-[var(--primary)]")}>{CONTACT.phone}</a>
            <a href={mailtoUrl} className={cn("text-lg block mb-1 transition-colors", isDark ? "hover:text-white" : "hover:text-[var(--primary)]")}>{CONTACT.email}</a>
            <a href={CONTACT.website} target="_blank" rel="noopener noreferrer" className={cn("text-lg block transition-colors", isDark ? "hover:text-white" : "hover:text-[var(--primary)]")}>{CONTACT.website.replace(/^https?:\/\//, '')}</a>
          </div>

          {/* Back to top button */}
          <div>
            <button
              type="button"
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
              className="flex flex-col items-center"
            >
              <span className="mb-2">Back to top</span>
              <div
                className={cn(
                  "rounded-full p-4 transition-colors",
                  isDark ? "border border-white" : "border border-slate-300 hover:border-slate-900"
                )}
              >
                <ArrowUp size={24} />
              </div>
            </button>
          </div>
        </div>

        {/* Social Media Icons */}
        <div className="flex justify-end mb-16">
          <div className="flex space-x-4">
            {[
              { href: "https://www.instagram.com/coltiumauto/", Icon: FaInstagram },
              { href: "https://x.com/CAuto58801", Icon: FaXTwitter },
              { href: "https://www.facebook.com/profile.php?id=61586599855233", Icon: FaFacebook },
              { href: "https://www.tiktok.com/@coltiumauto", Icon: FaTiktok },
              { href: "https://www.youtube.com/@Coltiumauto", Icon: FaYoutube },
            ].map(({ href, Icon }) => (
              <Link
                key={href}
                href={href}
                className={cn(
                  "p-2 rounded-full transition duration-300",
                  isDark
                    ? "border border-white hover:bg-white hover:text-black"
                    : "border border-slate-300 text-slate-700 hover:bg-slate-900 hover:text-white hover:border-slate-900"
                )}
              >
                <Icon size={20} />
              </Link>
            ))}
          </div>
        </div>

        {/* Navigation Links */}
        <div
          className={cn(
            "flex flex-wrap justify-between mb-8 pb-6 border-b",
            isDark ? "border-gray-800" : "border-slate-200"
          )}
        >
          <Link href="/" className={cn("text-lg mb-4 md:mb-0 transition-colors", isDark ? "hover:underline" : "hover:text-[var(--primary)]")}>Home</Link>
          <Link href="/services" className={cn("text-lg mb-4 md:mb-0 transition-colors", isDark ? "hover:underline" : "hover:text-[var(--primary)]")}>Services</Link>
          <Link href="/faqs" className={cn("text-lg mb-4 md:mb-0 transition-colors", isDark ? "hover:underline" : "hover:text-[var(--primary)]")}>FAQs</Link>
          <Link href="/contact" className={cn("text-lg mb-4 md:mb-0 transition-colors", isDark ? "hover:underline" : "hover:text-[var(--primary)]")}>Contact</Link>
        </div>

        {/* Bottom part with copyright and policy */}
        <div className="flex flex-col md:flex-row justify-between items-center">
          <Link href="/terms" className={cn("text-lg mb-4 md:mb-0", isDark ? "hover:underline" : "hover:text-[var(--primary)]")}>Terms & Conditions</Link>
          <p className={isDark ? "text-gray-400" : "text-slate-500"}>© {new Date().getFullYear()} Coltium-Auto. All Rights Reserved.</p>
          <Link href="/cookies" className={cn("text-lg mt-4 md:mt-0 mb-4 md:mb-0", isDark ? "hover:underline" : "hover:text-[var(--primary)]")}>Cookies Policy</Link>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
