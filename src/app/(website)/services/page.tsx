"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { Shield, Sparkles, Droplet, Activity, ClipboardCheck, Users, Check } from "lucide-react";
import Link from "next/link";
import { telUrl } from "@/lib/contact";
import { useWebsiteTheme } from "@/lib/website-theme";

const ServiceCard = ({
  icon,
  title,
  description,
  bulletPoints,
  price,
  priceLines,
  note,
  isDark,
}: {
  icon: React.ReactNode;
  title: string;
  description: string;
  bulletPoints: string[];
  price?: string;
  priceLines?: { label: string; value: string }[];
  note?: string;
  isDark: boolean;
}) => {
  const [isHovered, setIsHovered] = useState(false);

  const cardBg = isDark ? "bg-zinc-900/80 border-zinc-800" : "bg-white border-slate-200";
  const borderCls = isDark ? "border-zinc-800" : "border-slate-200";

  return (
    <motion.div
      className={`relative overflow-hidden rounded-xl border p-6 md:p-8 h-full flex flex-col transition-all duration-300 ${cardBg} ${borderCls}`}
      whileHover={{ y: -4 }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Top accent line on hover */}
      <div
        className={`absolute top-0 left-0 right-0 h-0.5 bg-[var(--primary)] transition-all duration-300 ${
          isHovered ? "opacity-100" : "opacity-0"
        }`}
      />

      <div
        className={`inline-flex h-12 w-12 items-center justify-center rounded-lg mb-5 transition-transform duration-300 ${
          isDark ? "bg-[var(--primary)]/20 text-[var(--primary)]" : "bg-[var(--primary)]/10 text-[var(--primary)]"
        } ${isHovered ? "scale-105" : ""}`}
      >
        {icon}
      </div>

      <h3 className="text-xl font-bold mb-2">{title}</h3>
      <p className={`text-sm mb-5 leading-relaxed ${isDark ? "text-gray-400" : "text-slate-600"}`}>
        {description}
      </p>

      <ul className="space-y-2.5 flex-1">
        {bulletPoints.map((point: string, index: number) => (
          <li key={index} className="flex items-start gap-2 text-sm">
            <Check className="h-4 w-4 text-[var(--primary)] shrink-0 mt-0.5" />
            <span className={isDark ? "text-gray-300" : "text-slate-700"}>{point}</span>
          </li>
        ))}
      </ul>

      {note && (
        <div
          className={`mt-4 rounded-xl py-2.5 px-3 text-sm ${
            isDark
              ? "bg-amber-500/10 text-amber-200/95"
              : " bg-amber-50 text-amber-900"
          }`}
        >
          {note}
        </div>
      )}

      {(price || (priceLines && priceLines.length > 0)) && (
        <div
          className={`mt-4 pt-4 border-t ${borderCls}`}
        >
          {priceLines && priceLines.length > 0 ? (
            <ul className="space-y-1.5">
              {priceLines.map((row, i) => (
                <li key={i} className="flex justify-between gap-2 text-sm">
                  <span className={isDark ? "text-gray-400" : "text-slate-600"}>{row.label}</span>
                  <span className={`font-semibold ${isDark ? "text-[var(--primary)]" : "text-slate-900"}`}>
                    {row.value}
                  </span>
                </li>
              ))}
            </ul>
          ) : price ? (
            <p className={`text-sm font-semibold ${isDark ? "text-[var(--primary)]" : "text-slate-900"}`}>
              {price}
            </p>
          ) : null}
        </div>
      )}
    </motion.div>
  );
};

const ServicesPage = () => {
  const { theme } = useWebsiteTheme();
  const isDark = theme === "dark";
  const fadeIn = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6 }
    }
  };

  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  return (
    <div className={isDark ? "bg-black text-white min-h-screen" : "bg-white text-slate-900 min-h-screen"}>
      {/* Hero Section */}
      <section className={isDark ? "pt-12 pb-12 bg-gradient-to-b from-zinc-900 to-black" : "pt-12 pb-10 bg-slate-100"}>
        <div className="container mx-auto px-6">
          <motion.div
            initial="hidden"
            animate="visible"
            variants={fadeIn}
            className="max-w-3xl"
          >
            <h1 className="text-4xl md:text-5xl font-bold mb-6 leading-tight text-left">
              All services are based on one core principle: correct diagnosis before repair.
            </h1>
            <p className={isDark ? "text-gray-400 text-lg" : "text-slate-600 text-lg"}>
              We provide independent vehicle diagnostic oversight on-demand, preventive, second-opinion,
              pre-purchase, insurance support, or fleet. You receive clear findings and recommendations; you decide the next step.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Main Services */}
      <section className={isDark ? "py-16 bg-black" : "py-16 bg-white"}>
        <div className="container mx-auto px-6">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeIn}
            className="mb-12"
          >
            <h2 className="text-2xl md:text-3xl font-bold mb-2">Six ways to access diagnostic oversight</h2>
            <p className={isDark ? "text-gray-400" : "text-slate-600"}>
              From one-off assessments to fleet retainers. Pricing where applicable.
            </p>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={staggerContainer}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            <motion.div variants={fadeIn}>
              <ServiceCard
                isDark={isDark}
                icon={<Activity size={24} />}
                title="On-Demand Diagnostic Assessment"
                description="For warning lights, performance issues, or abnormal vehicle behavior."
                bulletPoints={[
                  "Full multi-module ECU scan",
                  "Fault code interpretation",
                  "Live data analysis",
                  "Severity classification",
                  "Root-cause hypothesis",
                  "Written technical summary",
                  "Clear next-step guidance",
                ]}
                price="Price: KES 6,500 per visit. Within Nairobi service zone."
              />
            </motion.div>

            <motion.div variants={fadeIn}>
              <ServiceCard
                isDark={isDark}
                icon={<Shield size={24} />}
                title="Preventive Vehicle Health Check"
                description="For vehicles without active warning lights but requiring proactive monitoring."
                bulletPoints={[
                  "Full system health scan",
                  "Early fault detection",
                  "Wear and risk assessment",
                  "Technical summary report",
                ]}
                price="Available through subscription plans."
              />
            </motion.div>

            <motion.div variants={fadeIn}>
              <ServiceCard
                isDark={isDark}
                icon={<Sparkles size={24} />}
                title="Second-Opinion Diagnostic Review"
                description="For customers who have already received a repair recommendation from a garage."
                bulletPoints={[
                  "Independent re-diagnosis",
                  "Verification of proposed repairs",
                  "Identification of misdiagnosis or unnecessary part replacement",
                  "Written technical opinion",
                ]}
                price="Price: KES 5,000 per case. If a physical visit is required, standard diagnostic pricing applies."
              />
            </motion.div>

            <motion.div variants={fadeIn}>
              <ServiceCard
                isDark={isDark}
                icon={<Droplet size={24} />}
                title="Pre-Purchase Diagnostic Inspection"
                description="For buyers or sellers of used vehicles."
                bulletPoints={[
                  "Full electronic system scan",
                  "Fault history indicators",
                  "Hidden error detection",
                  "Risk classification",
                  "Structured written report",
                  "Clear buy or caution recommendation",
                ]}
                price="Price: KES 10,000 per vehicle. Within Nairobi service zone."
              />
            </motion.div>

            <motion.div variants={fadeIn}>
              <ServiceCard
                isDark={isDark}
                icon={<ClipboardCheck size={24} />}
                title="Insurance and Warranty Diagnostic Support"
                description="For customers involved in insurance or warranty disputes."
                bulletPoints={[
                  "Independent fault origin analysis",
                  "Failure mode classification",
                  "Technical documentation for claim submission",
                  "Evidence-based diagnostic report",
                ]}
                note="Coltium-Auto does not determine claim approval and does not interpret insurance policies."
                price="Price: KES 18,000 per case."
              />
            </motion.div>

            <motion.div variants={fadeIn}>
              <ServiceCard
                isDark={isDark}
                icon={<Users size={24} />}
                title="Fleet Diagnostic Oversight"
                description="For organizations managing multiple vehicles."
                bulletPoints={[
                  "Scheduled diagnostic visits",
                  "Priority response",
                  "Per-vehicle technical summaries",
                  "Repair prioritization guidance",
                  "Optional insurance support documentation",
                ]}
                priceLines={[
                  { label: "Small Fleet (up to 5 vehicles)", value: "KES 45,000/mo" },
                  { label: "Medium Fleet (6–15 vehicles)", value: "KES 95,000/mo" },
                  { label: "Enterprise (16+ vehicles)", value: "Custom pricing" },
                ]}
              />
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Access Model Section */}
      <section className={isDark ? "py-16 border-t border-zinc-800" : "py-16 border-t border-slate-200"}>
        <div className="container mx-auto px-6">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeIn}
            className="mb-12"
          >
            <h2 className="text-2xl md:text-3xl font-bold mb-3">Four ways to engage</h2>
            <p className={isDark ? "text-gray-400 max-w-2xl" : "text-slate-600 max-w-2xl"}>
              You subscribe or request a service; we deliver diagnostic oversight. No per-feature upsells.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { number: "01", title: "On-Call Diagnostic Access", description: "Pay-per-service when you need one-off oversight for a specific issue or vehicle." },
              { number: "02", title: "Personal Vehicle Health Subscription", description: "Ongoing preventive health checks and diagnostic oversight for your vehicle(s)." },
              { number: "03", title: "Pre-Purchase Diagnostic Package", description: "High-confidence inspection for used vehicles before you buy or finalise a sale." },
              { number: "04", title: "Fleet Diagnostic Retainer", description: "Structured oversight for organisations: routine checks and priority support." },
            ].map((step, index) => (
              <motion.div
                key={index}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={{ hidden: { opacity: 0, y: 16 }, visible: { opacity: 1, y: 0, transition: { delay: index * 0.1, duration: 0.5 } } }}
                className={`rounded-xl border p-6 ${isDark ? "border-zinc-800 bg-zinc-900/50" : "border-slate-200 bg-slate-50/50"}`}
              >
                <span className="text-3xl font-bold text-[var(--primary)]/30">{step.number}</span>
                <h3 className="text-lg font-bold mt-2 mb-2">{step.title}</h3>
                <p className={`text-sm ${isDark ? "text-gray-400" : "text-slate-600"}`}>{step.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* How it works Section */}
      <section className={isDark ? "py-16 bg-zinc-950/30" : "py-16 bg-slate-50/50"}>
        <div className="container mx-auto px-6">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeIn}
            className="mb-12"
          >
            <h2 className="text-2xl md:text-3xl font-bold mb-3">Five steps, no surprises</h2>
            <p className={isDark ? "text-gray-400 max-w-2xl" : "text-slate-600 max-w-2xl"}>
              Simple, transparent, and independent.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-5 gap-4">
            {[
              { step: 1, title: "Subscribe or request", body: "Choose a plan or request a one-off diagnostic service." },
              { step: 2, title: "We confirm details", body: "We contact you to confirm location and vehicle details." },
              { step: 3, title: "On-site diagnostics", body: "We perform professional on-site diagnostics." },
              { step: 4, title: "Clear findings", body: "You receive clear findings and recommendations." },
              { step: 5, title: "You decide", body: "You decide your next step independently." },
            ].map((item, index) => (
              <motion.div
                key={item.step}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={{ hidden: { opacity: 0, y: 12 }, visible: { opacity: 1, y: 0, transition: { delay: index * 0.08, duration: 0.4 } } }}
                className={`rounded-xl border p-5 text-center md:text-left ${isDark ? "border-zinc-800 bg-zinc-900/50" : "border-slate-200 bg-white"}`}
              >
                <span className={`inline-flex h-8 w-8 items-center justify-center rounded-full text-sm font-bold ${isDark ? "bg-[var(--primary)]/20 text-[var(--primary)]" : "bg-[var(--primary)]/10 text-[var(--primary)]"}`}>
                  {item.step}
                </span>
                <h3 className="font-semibold mt-3 mb-1">{item.title}</h3>
                <p className={`text-sm ${isDark ? "text-gray-400" : "text-slate-600"}`}>{item.body}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className={isDark ? "py-20 bg-zinc-950 border-t border-zinc-800" : "py-20 bg-slate-100 border-t border-slate-200"}>
        <div className="container mx-auto px-6">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-8">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeIn}
              className="max-w-xl"
            >
              <h2 className="text-2xl md:text-3xl font-bold mb-3">
                Ready to understand what your vehicle really needs?
              </h2>
              <p className={isDark ? "text-gray-400" : "text-slate-600"}>
                Contact us to schedule independent diagnostics before you approve any major repair or commit to a vehicle purchase.
              </p>
            </motion.div>
            <Link
              href={telUrl}
              className="inline-flex shrink-0 items-center justify-center rounded-full bg-[var(--primary)] px-8 py-3.5 font-medium text-white transition-opacity hover:opacity-90"
            >
              Call to book
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ServicesPage;