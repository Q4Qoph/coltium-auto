"use client";

import React from 'react';
import { Mail, Phone, Clock, MapPin, Globe } from 'lucide-react';
import { CONTACT, mailtoUrl, telUrl } from '@/lib/contact';
import { useWebsiteTheme } from '@/lib/website-theme';
import ContactForm from '@/app/(website)/(components)/ContactForm';

export default function ContactPage() {
  const { theme } = useWebsiteTheme();

  return (
    <section className={theme === "dark" ? "min-h-screen bg-black text-white" : "min-h-screen bg-white text-slate-900"}>
      <div className={theme === "dark" ? "bg-gradient-to-b from-zinc-900 to-black pb-24" : "pb-24"}>
        <div className="pt-12 px-6 container mx-auto">
          {/* Header Section */}
          <div className="flex flex-col md:flex-row">
            <div className="md:w-1/5">
              <div className="flex items-center mb-8">
                <div className="w-10 h-px bg-[var(--primary)] mr-3"></div>
                <span className="text-sm uppercase tracking-wider">CONTACT</span>
              </div>
            </div>

            <div className="md:w-4/5">
              <div className="mb-16">
                <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold leading-tight">
                  Connect with our <span className="text-gray-500">independent diagnostic team to understand what your vehicle really needs.</span>
                </h2>
              </div>
            </div>
          </div>
        </div>

        {/* Contact Information Grid */}
        <div className="px-6 container mx-auto">
          <div className="flex flex-col md:flex-row">
            {/* Keep left gutter aligned with label column */}
            <div className="md:w-1/5" />
            <div className="md:w-4/5">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-10">
                {/* Email */}
                <div>
                  <div className="flex items-start">
                    <Mail className="mr-4 shrink-0" size={24} />
                    <div>
                      <h3 className="text-xl font-semibold mb-2">Email Us</h3>
                      <a
                        href={mailtoUrl}
                        className={`${theme === "dark" ? "text-gray-400 hover:text-white" : "text-slate-700 hover:text-slate-900"} transition-colors`}
                      >
                        {CONTACT.email}
                      </a>
                    </div>
                  </div>
                </div>

                {/* Phone */}
                <div>
                  <div className="flex items-start">
                    <Phone className="mr-4 shrink-0" size={24} />
                    <div>
                      <h3 className="text-xl font-semibold mb-2">Call Us</h3>
                      <a
                        href={telUrl}
                        className={`${theme === "dark" ? "text-gray-400 hover:text-white" : "text-slate-700 hover:text-slate-900"} transition-colors`}
                      >
                        {CONTACT.phone}
                      </a>
                    </div>
                  </div>
                </div>

                {/* Website */}
                <div>
                  <div className="flex items-start">
                    <Globe className="mr-4 shrink-0" size={24} />
                    <div>
                      <h3 className="text-xl font-semibold mb-2">Website</h3>
                      <a
                        href={CONTACT.website}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={`${theme === "dark" ? "text-gray-400 hover:text-white" : "text-slate-700 hover:text-slate-900"} transition-colors`}
                      >
                        {CONTACT.website.replace(/^https?:\/\//, '')}
                      </a>
                    </div>
                  </div>
                </div>

                {/* Hours */}
                <div>
                  <div className="flex items-start mb-4">
                    <Clock className="mr-4 shrink-0" size={24} />
                    <div>
                      <h3 className="text-xl font-semibold mb-2">Opening Hours</h3>
                      <p className={theme === "dark" ? "text-gray-400" : "text-slate-600"}>Monday - Friday: 8:00 AM - 6:00 PM</p>
                      <p className={theme === "dark" ? "text-gray-400" : "text-slate-600"}>Saturday: 9:00 AM - 4:00 PM</p>
                      <p className={theme === "dark" ? "text-gray-400" : "text-slate-600"}>Sunday: Closed</p>
                    </div>
                  </div>
                </div>

                {/* Address */}
                <div className="md:col-span-2">
                  <div className="flex items-start mb-6">
                    <MapPin className="mr-4 shrink-0" size={24} />
                    <div>
                      <h3 className="text-xl font-semibold mb-2">Our Location</h3>
                      <p className={theme === "dark" ? "text-gray-400 leading-relaxed" : "text-slate-700 leading-relaxed"}>
                        {CONTACT.address}
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <div
                className={`mt-12 pt-10 border-t ${theme === "dark" ? "border-zinc-800" : "border-slate-200"}`}
              >
                <ContactForm />
              </div>
            </div>
          </div>
        </div>

        {/* Location map (temporarily disabled) */}
        {/*
        <div className="container mx-auto px-6 border-gray-800 pt-12">
          <div className="md:w-full h-96 bg-gray-900">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3988.9256836890104!2d36.872113800000015!3d-1.2120109000000034!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x182f3f262c510ee9%3A0x357e14f327e4ab1d!2sQuick%20Mart%20Thome!5e0!3m2!1sen!2ske!4v1745603631837!5m2!1sen!2ske"
              className="w-full h-full"
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
        </div>
        */}
      </div>
    </section>
  );
}
