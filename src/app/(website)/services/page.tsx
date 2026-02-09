"use client"

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Shield, Sparkles, Droplet, Activity, ClipboardCheck, Users } from 'lucide-react';
import Link from 'next/link';

const ServiceCard = ({ icon, title, description, bulletPoints }: any) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div
      className="bg-zinc-900 p-8 rounded-lg transition-all duration-300 h-full"
      whileHover={{ y: -10 }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className={`text-[var(--primary)] mb-6 transition-all duration-300 ${isHovered ? 'scale-110' : ''}`}>
        {icon}
      </div>
      <h3 className="text-2xl font-bold mb-4">{title}</h3>
      <p className="text-gray-400 mb-6">{description}</p>
      <ul className="space-y-2">
        {bulletPoints.map((point: string, index: number) => (
          <li key={index} className="flex items-start">
            <span className="text-[var(--primary)] mr-2">•</span>
            <span className="text-gray-300">{point}</span>
          </li>
        ))}
      </ul>
    </motion.div>
  );
};

const ServicesPage = () => {
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
    <div className="bg-black text-white min-h-screen ">
      {/* Hero Section */}
      <section className="pt-32 bg-gradient-to-b from-zinc-900 to-black">
        <div className="container mx-auto px-6">
          <motion.div
            initial="hidden"
            animate="visible"
            variants={fadeIn}
            className="max-w-3xl"
          >
            <p className="text-sm uppercase tracking-[0.25em] text-gray-400 mb-4">
              Services &amp; access
            </p>
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              Independent vehicle diagnostic oversight — applied to your use case.
            </h2>
            <p className="text-gray-400 text-xl mb-12">
              One core service: professional, neutral diagnosis. Multiple ways to access it, depending on whether you&apos;re an
              individual owner, buyer, fleet, or organisation.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Main Services (Use-Cases) */}
      <section className="py-16 bg-zinc-950">
        <div className="container mx-auto px-6">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={staggerContainer}
            className="grid grid-cols-1 md:grid-cols-3 gap-6"
          >
            <motion.div variants={fadeIn}>
              <ServiceCard
                icon={<Activity size={40} />}
                title="On-Demand Diagnostic Assessment"
                description="For vehicles showing warning lights, performance issues, or abnormal behaviour."
                bulletPoints={[
                  'Full multi-ECU diagnostic scan',
                  'Live data evaluation',
                  'Fault prioritisation (critical / monitor / informational)',
                  'Root-cause hypothesis',
                  'Clear recommendations before any repair work'
                ]}
              />
            </motion.div>

            <motion.div variants={fadeIn}>
              <ServiceCard
                icon={<Shield size={40} />}
                title="Preventive Vehicle Health Check"
                description="For vehicles with no visible problems but requiring proactive oversight."
                bulletPoints={[
                  'System health assessment across major ECUs',
                  'Early fault detection and trend indicators',
                  'Risk and wear indicators',
                  'Preventive guidance to avoid breakdowns',
                  'Foundation for ongoing health subscriptions'
                ]}
              />
            </motion.div>

            <motion.div variants={fadeIn}>
              <ServiceCard
                icon={<Sparkles size={40} />}
                title="Second-Opinion Diagnostic Review"
                description="For customers who have already received a garage quote or repair recommendation."
                bulletPoints={[
                  'Independent re-diagnosis of the vehicle',
                  'Validation or rejection of proposed repairs',
                  'Identification of misdiagnosis or over-repair',
                  'Technical justification you can share with any provider',
                  'Helps prevent unnecessary spend on the wrong work'
                ]}
              />
            </motion.div>

            <motion.div variants={fadeIn}>
              <ServiceCard
                icon={<Droplet size={40} />}
                title="Pre-Purchase Diagnostic Inspection"
                description="For buyers or sellers of used vehicles needing a high-confidence, data-backed assessment."
                bulletPoints={[
                  'Deep diagnostic inspection across systems',
                  'Hidden electronic fault detection',
                  'ECU fault history indicators',
                  'Risk classification: Buy / Caution / Avoid',
                  'Supports price, risk, and negotiation decisions'
                ]}
              />
            </motion.div>

            <motion.div variants={fadeIn}>
              <ServiceCard
                icon={<ClipboardCheck size={40} />}
                title="Insurance & Warranty Diagnostic Support"
                description="Independent technical input for insurance and warranty-related questions and disputes."
                bulletPoints={[
                  'Independent technical assessment of the vehicle',
                  'Failure-mode analysis',
                  'Fault origin classification (defect, wear, misuse, external damage, improper repair, software fault)',
                  'Evidence-based diagnostic reporting',
                  'We do not approve claims or interpret policy — we provide facts only'
                ]}
              />
            </motion.div>

            <motion.div variants={fadeIn}>
              <ServiceCard
                icon={<Users size={40} />}
                title="Fleet Diagnostic Oversight"
                description="For organisations managing multiple vehicles that need predictable uptime and technical oversight."
                bulletPoints={[
                  'Routine diagnostic health checks across the fleet',
                  'Early fault detection to prevent unplanned downtime',
                  'Repair priority guidance by severity and impact',
                  'Support for maintenance planning and budgeting',
                  'No maintenance execution — oversight only'
                ]}
              />
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Access Model Section */}
      <section className="py-16 border-t border-zinc-900">
        <div className="container mx-auto px-6">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeIn}
            className="mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Access model</h2>
            <p className="text-gray-400 max-w-2xl">
              Customers do not buy diagnostics per feature. You subscribe to access professional diagnostic oversight,
              and select the plan that matches how often and how deeply you need us involved.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            {[
              {
                number: '01',
                title: 'On-Call Diagnostic Access',
                description:
                  'Pay-per-service access when you need one-off diagnostic oversight for a specific issue or vehicle.'
              },
              {
                number: '02',
                title: 'Personal Vehicle Health Subscription',
                description:
                  'Ongoing preventive health checks and diagnostic oversight for one or more personal vehicles.'
              },
              {
                number: '03',
                title: 'Pre-Purchase Diagnostic Package',
                description:
                  'High-confidence diagnostic inspections for used vehicles before you buy or finalise a sale.'
              },
              {
                number: '04',
                title: 'Fleet Diagnostic Retainer',
                description:
                  'Structured oversight for organisations managing multiple vehicles, with routine checks and priority support.'
              }
            ].map((step, index) => (
              <motion.div
                key={index}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={{
                  hidden: { opacity: 0, y: 20 },
                  visible: {
                    opacity: 1,
                    y: 0,
                    transition: { delay: index * 0.2, duration: 0.6 }
                  }
                }}
                className="relative"
              >
                <div className="text-5xl font-bold text-[var(--primary)] opacity-20 mb-4">{step.number}</div>
                <h3 className="text-xl font-bold mb-2">{step.title}</h3>
                <p className="text-gray-400">{step.description}</p>
                {index < 3 && (
                  <div className="hidden md:block absolute top-8 right-0 w-full h-px bg-gradient-to-r from-[var(--primary)] to-transparent opacity-20"></div>
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* How it works Section */}
      <section className="py-16">
        <div className="container mx-auto px-6">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeIn}
            className="mb-10"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4">How it works</h2>
            <p className="text-gray-400 max-w-2xl">
              Simple, transparent, and free from hidden incentives.
            </p>
          </motion.div>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 text-sm text-gray-300">
            <div className="border border-zinc-800 rounded-lg p-6 bg-zinc-950/40">
              <h3 className="font-semibold mb-2">1. Request or subscribe</h3>
              <p>Customer subscribes to a plan or requests a one-off diagnostic service.</p>
            </div>
            <div className="border border-zinc-800 rounded-lg p-6 bg-zinc-950/40">
              <h3 className="font-semibold mb-2">2. On-site diagnostics</h3>
              <p>Coltium-Auto contacts you, attends to the vehicle, and performs comprehensive diagnostics.</p>
            </div>
            <div className="border border-zinc-800 rounded-lg p-6 bg-zinc-950/40">
              <h3 className="font-semibold mb-2">3. Findings &amp; guidance</h3>
              <p>We deliver severity-ranked findings, root-cause analysis, and clear next-step recommendations.</p>
            </div>
            <div className="border border-zinc-800 rounded-lg p-6 bg-zinc-950/40">
              <h3 className="font-semibold mb-2">4. You decide</h3>
              <p>You choose how and where to proceed with repairs or claims, backed by independent technical facts.</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-zinc-950">
        <div className="container mx-auto px-6">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeIn}
            className="flex flex-col md:flex-row items-center justify-between"
          >
            <div className="md:w-2/3 mb-8 md:mb-0">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                Ready to understand what your vehicle really needs?
              </h2>
              <p className="text-gray-400">
                Contact us today to schedule independent diagnostics before you approve any major repair or
                commit to a vehicle purchase.
              </p>
            </div>
            <div>
              <Link href="tel:+254792391610" className="inline-flex items-center bg-[var(--primary)] rounded-full px-8 py-3 font-medium hover:bg-opacity-90 transition duration-300">
                Call to book
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default ServicesPage;