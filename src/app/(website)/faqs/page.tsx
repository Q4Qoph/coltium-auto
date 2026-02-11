"use client"

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, Search, Shield, Users } from 'lucide-react';
import { telUrl, mailtoUrl } from '@/lib/contact';
import { useWebsiteTheme } from '@/lib/website-theme';

const FaqPage = () => {
  const { theme } = useWebsiteTheme();
  const isDark = theme === "dark";
  const [activeTab, setActiveTab] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [expandedItems, setExpandedItems] = useState<Record<string, boolean>>({});
  // FAQ Data organised by categories (Coltium-Auto)
  const faqData = {
    basics: [
      {
        id: 'basic1',
        question: 'What is Coltium-Auto?',
        answer:
          'Coltium-Auto is an independent, mobile vehicle diagnostic and technical oversight service. We operate like a medical diagnostic practice, but for vehicles. We focus solely on diagnosis, explanation, and guidance — not on selling or performing repairs.'
      },
      {
        id: 'basic2',
        question: 'Do you repair vehicles or sell parts?',
        answer:
          'No. We do not repair vehicles, do not sell parts, and are not a garage. This is intentional. By separating diagnosis from repair, we remove financial incentives that can bias recommendations, so you receive neutral, professional technical insight.'
      },
      {
        id: 'basic3',
        question: 'Who do you work for?',
        answer:
          'We work for vehicle owners and organisations only — not for garages, insurers, or warranty providers. Our responsibility is to provide accurate technical facts and clear guidance so that you can make informed decisions with any provider you choose.'
      },
      {
        id: 'basic4',
        question: 'What kind of vehicles do you diagnose?',
        answer:
          'We focus on modern vehicles with electronic control units (ECUs): passenger cars, SUVs, light commercial vehicles, and similar platforms. If you are unsure whether your vehicle is a good fit, contact us and we will advise before booking.'
      },
      {
        id: 'basic5',
        question: 'What is “independent vehicle diagnostic oversight”?',
        answer:
          'It is a structured, professional process where we perform comprehensive diagnostics, interpret fault codes and live data, identify likely root causes, rank issues by severity, and recommend what should and should not be done next — all without any repair interest.'
      }
    ],
    individuals: [
      {
        id: 'ind1',
        question: 'When should an individual vehicle owner contact Coltium-Auto?',
        answer:
          'Contact us when warning lights appear, the vehicle behaves abnormally, multiple garages give conflicting advice, or before you approve expensive repairs. We are also useful for preventive health checks and pre-purchase inspections.'
      },
      {
        id: 'ind2',
        question: 'How does a typical on-demand diagnostic assessment work?',
        answer:
          'You request the service, we schedule an on-site visit, then perform a multi-ECU diagnostic scan and live data evaluation. We identify and prioritise faults, develop a root-cause hypothesis, and give you clear written and verbal recommendations before any repair work is authorised.'
      },
      {
        id: 'ind3',
        question: 'Can you give a second opinion on a garage quote?',
        answer:
          'Yes. We can independently assess the vehicle and compare findings with an existing garage quote or repair recommendation. We validate or challenge the proposed work, highlight possible misdiagnosis or over-repair, and provide technical justification you can take back to the provider.'
      },
      {
        id: 'ind4',
        question: 'Do you decide which garage I should use?',
        answer:
          'No. We do not direct you to specific garages or take commissions. Our role is to arm you with accurate diagnostics and clear priorities so you can choose any garage, insurer, or provider with confidence.'
      }
    ],
    organisations: [
      {
        id: 'org1',
        question: 'How does Coltium-Auto support fleets and organisations?',
        answer:
          'For fleets and organisations, we provide routine diagnostic health checks, early fault detection across vehicles, repair priority guidance, and downtime prevention support. We do not execute maintenance — we provide technical oversight so your existing providers can act more effectively.'
      },
      {
        id: 'org2',
        question: 'What is a Fleet Diagnostic Retainer?',
        answer:
          'A Fleet Diagnostic Retainer is an ongoing agreement that gives your organisation structured access to Coltium-Auto for scheduled fleet-wide checks, on-call diagnostic support, and prioritised response. It is designed to reduce unplanned downtime and uncontrolled maintenance spending.'
      },
      {
        id: 'org3',
        question: 'Can you assist with insurance or warranty disputes?',
        answer:
          'Yes. We can provide independent technical assessments, failure-mode analysis, and fault origin classification (for example, manufacturing defect, normal wear, misuse, external damage, improper repair, or software fault). However, we do not decide claim outcomes or interpret policy wording.'
      },
      {
        id: 'org4',
        question: 'Do you replace the role of a garage or workshop?',
        answer:
          'No. We complement, not replace, garages and workshops. They remain responsible for repair execution. We provide the diagnostic clarity and technical oversight that helps ensure the right work is done for the right reasons.'
      }
    ]
  };

  // Combine all FAQs for "All" tab
  const allFaqs = [...faqData.basics, ...faqData.individuals, ...faqData.organisations];

  // Toggle FAQ item expansion
  const toggleItem = (id: number) => {
    setExpandedItems(prev => ({
      ...prev,
      [id]: !prev[id]
    }));
  };

  // Filter FAQs based on active tab and search term
  const getFilteredFaqs = () => {
    let faqs: any = [];

    if (activeTab === 'all') faqs = allFaqs;
    if (activeTab === 'basics') faqs = faqData.basics;
    if (activeTab === 'individuals') faqs = faqData.individuals;
    if (activeTab === 'organisations') faqs = faqData.organisations;

    if (searchTerm.trim() === '') return faqs;

    return faqs.filter((faq: any) =>
      faq.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
      faq.answer.toLowerCase().includes(searchTerm.toLowerCase())
    );
  };

  const filteredFaqs = getFilteredFaqs();

  return (
    <div className={isDark ? "bg-black text-white min-h-screen" : "bg-white text-slate-900 min-h-screen"}>
      {/* Hero Section */}
      <section className={isDark ? "pt-32 pb-20 px-6 bg-gradient-to-b from-zinc-900 to-black" : "pt-32 pb-20 px-6 bg-slate-100"}>
        <div className="container mx-auto text-center">
          <motion.h2
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-5xl md:text-6xl font-bold mb-8"
          >
            Frequently Asked Questions
          </motion.h2>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className={`${isDark ? "text-gray-400" : "text-slate-600"} text-xl max-w-2xl mx-auto mb-12`}
          >
            Everything you need to know about Coltium-Auto&apos;s independent vehicle diagnostic and technical oversight services.
          </motion.p>

          {/* Search Bar */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="relative max-w-xl mx-auto"
          >
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search className="h-5 w-5 text-gray-500" />
            </div>
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search questions..."
              className="block w-full pl-10 pr-4 py-4 border border-slate-300 rounded-full bg-white text-slate-900 placeholder:text-slate-400 focus:ring-[var(--primary)] focus:border-[var(--primary)] focus:outline-none"
            />
          </motion.div>
        </div>
      </section>

      {/* Tabs */}
      <section className="px-6">
        <div className="container mx-auto">
          <div className="flex flex-wrap justify-center mb-12 gap-4">
            {[
              { id: 'all', label: 'All Questions', icon: null },
              { id: 'basics', label: 'Service Basics', icon: <Shield size={18} /> },
              { id: 'individuals', label: 'Individuals', icon: null },
              { id: 'organisations', label: 'Fleets & Organisations', icon: <Users size={18} /> }
            ].map((tab) => (
              <motion.button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center px-6 py-3 rounded-full text-sm font-medium transition-all ${activeTab === tab.id
                    ? 'bg-[var(--primary)] text-white'
                    : isDark
                      ? 'bg-zinc-800 text-gray-300 hover:bg-zinc-700'
                      : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                  }`}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                {tab.icon && <span className="mr-2">{tab.icon}</span>}
                {tab.label}
              </motion.button>
            ))}
          </div>

          {/* FAQ Items */}
          <div className="max-w-3xl mx-auto">
            {filteredFaqs.length > 0 ? (
              filteredFaqs.map((faq: any) => (
                <motion.div
                  key={faq.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5 }}
                  className="mb-4"
                >
                  <button
                    onClick={() => toggleItem(faq.id)}
                    className={`w-full flex justify-between items-center p-5 text-left rounded-lg transition-all ${
                      expandedItems[faq.id]
                        ? isDark
                          ? 'bg-zinc-800'
                          : 'bg-slate-100'
                        : isDark
                          ? 'bg-zinc-900 hover:bg-zinc-800'
                          : 'bg-white hover:bg-slate-50 border border-slate-200'
                      }`}
                  >
                    <span className="text-lg font-medium pr-8">{faq.question}</span>
                    <ChevronDown
                      className={`transform transition-transform ${expandedItems[faq.id] ? 'rotate-180 text-[var(--primary)]' : ''}`}
                      size={20}
                    />
                  </button>

                  <AnimatePresence>
                    {expandedItems[faq.id] && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3 }}
                        className="overflow-hidden"
                      >
                        <div className={`p-5 rounded-b-lg border-t ${
                          isDark
                            ? "bg-zinc-800 text-gray-300 border-zinc-700"
                            : "bg-slate-50 text-slate-700 border-slate-200"
                        }`}>
                          {faq.answer}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              ))
            ) : (
              <div className="text-center py-12">
                <p className={`${isDark ? "text-gray-400" : "text-slate-600"} text-lg`}>No questions found matching "{searchTerm}"</p>
                <button
                  onClick={() => setSearchTerm('')}
                  className="mt-4 text-[var(--primary)] hover:underline"
                >
                  Clear search
                </button>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Still Have Questions */}
      <section className="py-20 px-6">
        <div className="container mx-auto max-w-4xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className={`${isDark ? "bg-zinc-800 text-white" : "bg-slate-100 text-slate-900"} p-10 rounded-2xl text-center`}
          >
            <h2 className="text-3xl font-bold mb-4">Still have questions?</h2>
            <p className={`${isDark ? "text-gray-400" : "text-slate-600"} mb-8 max-w-lg mx-auto`}>
              Our team is always ready to help. Get in touch with us directly and we'll be happy to answer any specific questions you might have.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <a
                href={telUrl}
                className="inline-flex items-center justify-center bg-[var(--primary)] rounded-lg px-6 py-3 font-medium hover:bg-opacity-90 transition duration-300"
              >
                Call Us
              </a>
              <a
                href={mailtoUrl}
                className="inline-flex items-center justify-center border border-white rounded-lg px-6 py-3 font-medium hover:bg-white hover:text-black transition duration-300"
              >
                Email Us
              </a>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default FaqPage;