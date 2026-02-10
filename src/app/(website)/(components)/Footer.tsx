"use client"

import React from 'react';
import Link from 'next/link';
import { ArrowUp, Instagram, Twitter, Facebook, Send } from 'lucide-react';
import Image from 'next/image';
import { CONTACT, mailtoUrl, telUrl } from '@/lib/contact';

const Footer = () => {
  return (
    <footer className="bg-black text-white p-8">
      <div className="container mx-auto px-6">
        {/* Top part with logo and tagline */}
        <div className="flex flex-col md:flex-row justify-between items-start mb-16">
          <div className="mb-8 md:mb-0">
            <Image
              src="/logo.png" // Change to your actual logo path
              alt="Coltium-Auto"
              width={150}
              height={50}
              className="mb-4"
            />

            <p className="text-gray-400 max-w-sm">
              Independent mobile vehicle diagnostic and technical oversight. We diagnose correctly, explain clearly, and guide owners and organisations toward informed decisions — before money is spent on repairs.
            </p>


            <div className="mt-8">
              <Link href="/contact">
                <div className="inline-flex items-center border border-white rounded-full px-6 py-2 hover:bg-white hover:text-black transition duration-300">
                  Contact Us
                  <span className="ml-2">→</span>
                </div>
              </Link>
            </div>
          </div>

          {/* Address and Contact */}
          <div className="mb-8 md:mb-0">
            <h3 className="text-gray-400 mb-2">Address</h3>
            <p className="text-lg mb-6">{CONTACT.address}</p>

            <h3 className="text-gray-400 mb-2">Contact Us</h3>
            <a href={telUrl} className="text-lg block mb-1 hover:text-white transition-colors">{CONTACT.phone}</a>
            <a href={mailtoUrl} className="text-lg block mb-1 hover:text-white transition-colors">{CONTACT.email}</a>
            <a href={CONTACT.website} target="_blank" rel="noopener noreferrer" className="text-lg block hover:text-white transition-colors">{CONTACT.website.replace(/^https?:\/\//, '')}</a>
          </div>

          {/* Back to top button */}
          <div>
            <button
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
              className="flex flex-col items-center"
            >
              <span className="mb-2">Back to top</span>
              <div className="rounded-full border border-white p-4">
                <ArrowUp size={24} />
              </div>
            </button>
          </div>
        </div>

        {/* Social Media Icons */}
        <div className="flex justify-end mb-16">
          <div className="flex space-x-4">
            <Link href="https://www.instagram.com/coltium_auto" className="p-2 border border-white rounded-full hover:bg-white hover:text-black transition duration-300">
              <Instagram size={20} />
            </Link>
            <Link href="https://twitter.com" className="p-2 border border-white rounded-full hover:bg-white hover:text-black transition duration-300">
              <Twitter size={20} />
            </Link>
            <Link href="https://facebook.com" className="p-2 border border-white rounded-full hover:bg-white hover:text-black transition duration-300">
              <Facebook size={20} />
            </Link>
            <Link href="/contact" className="p-2 border border-white rounded-full hover:bg-white hover:text-black transition duration-300">
              <Send size={20} />
            </Link>

          </div>
        </div>

        {/* Navigation Links */}
        <div className="flex flex-wrap justify-between mb-8 border-b border-gray-800 pb-6">
          <Link href="/" className="text-lg hover:underline mb-4 md:mb-0">Home</Link>
          <Link href="/services" className="text-lg hover:underline mb-4 md:mb-0">Services</Link>
          <Link href="/faqs" className="text-lg hover:underline mb-4 md:mb-0">FAQs</Link>
          <Link href="/contact" className="text-lg hover:underline mb-4 md:mb-0">Contact</Link>
        </div>

        {/* Bottom part with copyright and policy */}
        <div className="flex flex-col md:flex-row justify-between items-center">
          <Link href="/terms" className="text-lg hover:underline mb-4 md:mb-0">Terms & Conditions</Link>
          <p className="text-gray-400">© {new Date().getFullYear()} Coltium-Auto. All Rights Reserved.</p>
          <Link href="/cookies" className="text-lg hover:underline mt-4 md:mt-0">Cookies Policy</Link>
        </div>
      </div>
    </footer>
  );
};

export default Footer;