"use client"

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, Search, Car, Shield } from 'lucide-react';

const FaqPage = () => {
  const [activeTab, setActiveTab] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [expandedItems, setExpandedItems] = useState<Record<string, boolean>>({});
  // FAQ Data organized by categories
  const faqData = {
    carWrapping: [
      {
        id: 'wrap1',
        question: 'What is car wrapping?',
        answer: "Car wrapping is the process of covering your vehicle's original paintwork with a vinyl film. This provides a completely different look while protecting the original paint underneath. Wraps come in various colors, finishes, and designs, allowing for customization that would be difficult or impossible to achieve with regular paint."
      },
      {
        id: 'wrap2',
        question: 'How long does it take to wrap a car?',
        answer: 'The duration depends on the complexity of the wrap and the size of the vehicle. A basic color change wrap typically takes 3-5 days for a standard vehicle. More complex designs or larger vehicles may require additional time. We always ensure that each step is done meticulously for the best results.'
      },
      {
        id: 'wrap3',
        question: 'Can I wrap my car if it has scratches or damages?',
        answer: 'While minor imperfections might not be noticeable under a wrap, significant scratches, dents, or rust can affect the final appearance and longevity of the wrap. We recommend addressing any substantial paint or body issues before applying a wrap for the best results and to prevent potential issues down the line.'
      },
      {
        id: 'wrap4',
        question: 'Will a car wrap protect my vehicle\'s paint?',
        answer: 'Yes, vinyl wraps provide a protective layer that shields your original paint from minor scratches, UV damage, and small debris. However, they don\'t offer the same level of protection as dedicated paint protection films (PPF), which are designed specifically for maximum protection rather than aesthetics.'
      },
      {
        id: 'wrap5',
        question: 'Do I need to do anything to maintain my car wrap?',
        answer: 'Regular maintenance includes gentle hand washing with pH-neutral soap, avoiding high-pressure washes close to edges and seams, and keeping the vehicle clean from contaminants like tree sap or bird droppings that could damage the vinyl. We provide detailed care instructions with every wrap service.'
      },
      {
        id: 'wrap6',
        question: 'Is car wrapping legal in Kenya?',
        answer: 'Yes, car wrapping is legal in Kenya. However, significant color changes may need to be reported to relevant authorities and updated in your vehicle documentation. We can advise on the specific requirements based on your wrap design and vehicle type.'
      },
      {
        id: 'wrap7',
        question: 'Can I remove the car wrap later?',
        answer: 'Yes, vinyl wraps are designed to be removable without damaging the original paint when installed and removed properly. The removal process should be done by professionals to ensure no damage occurs, especially for wraps that have been on for several years.'
      },
      {
        id: 'wrap8',
        question: 'How long does a car wrap last?',
        answer: 'With proper care and maintenance, a high-quality wrap can last 5-7 years. Factors affecting durability include the quality of vinyl used, installation expertise, exposure to harsh weather conditions, and how well the wrap is maintained.'
      }
    ],
    paintProtection: [
      {
        id: 'ppf1',
        question: 'What is paint protection film (PPF)?',
        answer: 'Paint Protection Film (PPF) is a thermoplastic urethane film applied to painted surfaces of a new or used vehicle to protect from stone chips, bug damage, and minor abrasions. Premium PPF products also offer self-healing properties, meaning light scratches disappear with heat application.'
      },
      {
        id: 'ppf2',
        question: 'How long does it take to install paint protection film?',
        answer: 'Installation time varies based on coverage. Partial installations (front bumper, hood, mirrors) typically take 1-2 days, while full-vehicle PPF application can take 3-5 days. We prioritize precision over speed to ensure perfect application without bubbles or imperfections.'
      },
      {
        id: 'ppf3',
        question: 'Is paint protection film the same as ceramic coating?',
        answer: 'No, they serve different purposes. PPF is a physical urethane film that protects against physical impacts and scratches. Ceramic coating is a liquid polymer that chemically bonds with the vehicle\'s paint, providing hydrophobic properties and protection against UV damage and chemical stains. They can be used together for maximum protection.'
      },
      {
        id: 'ppf4',
        question: 'How do I maintain my paint protection film?',
        answer: 'Maintain PPF by washing with pH-neutral soap, avoiding waxes with petroleum distillates, and not washing the vehicle for 7 days after installation. The film requires minimal special care and can be treated much like your vehicle\'s paint, though we recommend avoiding automatic car washes with brushes.'
      },
      {
        id: 'ppf5',
        question: 'Will paint protection film change the appearance of my car?',
        answer: 'High-quality PPF is virtually invisible once installed. Modern films are designed to be optically clear with no distortion. Some premium PPF options can even enhance gloss levels or add special finishes like matte or satin effects if desired.'
      },
      {
        id: 'ppf6',
        question: 'Can paint protection film be removed?',
        answer: 'Yes, PPF can be removed without damaging the underlying paint when done correctly. Professional removal is recommended, especially for older films. Once removed, the protected paint underneath will typically look newer and better preserved than unprotected areas.'
      },
      {
        id: 'ppf7',
        question: 'How long does paint protection film last?',
        answer: 'Premium paint protection films typically last 7-10 years, depending on the product quality, installation expertise, environmental conditions, and maintenance. Some high-end films come with warranties up to 10 years against yellowing, cracking, or peeling.'
      },
      {
        id: 'ppf8',
        question: 'Why should I invest in paint protection film for my car?',
        answer: 'PPF preserves your vehicle\'s appearance and value by preventing damage that would otherwise require expensive repainting. It\'s an especially worthwhile investment for luxury vehicles, leased vehicles (to avoid return penalties), or any car you want to keep looking new for years to come.'
      }
    ]
  };

  // Combine all FAQs for "All" tab
  const allFaqs = [...faqData.carWrapping, ...faqData.paintProtection];

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
    if (activeTab === 'wrapping') faqs = faqData.carWrapping;
    if (activeTab === 'protection') faqs = faqData.paintProtection;

    if (searchTerm.trim() === '') return faqs;

    return faqs.filter((faq: any) =>
      faq.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
      faq.answer.toLowerCase().includes(searchTerm.toLowerCase())
    );
  };

  const filteredFaqs = getFilteredFaqs();

  return (
    <div className="bg-black text-white min-h-screen">
      {/* Hero Section */}
      <section className="pt-32 pb-20 px-6 bg-gradient-to-b from-zinc-900 to-black">
        <div className="container mx-auto text-center">
          <motion.h1
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-5xl md:text-6xl font-bold mb-8"
          >
            Frequently Asked Questions
          </motion.h1>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-gray-400 text-xl max-w-2xl mx-auto mb-12"
          >
            Everything you need to know about our premium vehicle transformation services
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
              className="block w-full pl-10 pr-4 py-4  border border-zinc-700 rounded-full focus:ring-[#cd0d0f] focus:border-[#cd0d0f] focus:outline-none text-white"
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
              { id: 'wrapping', label: 'Car Wrapping', icon: <Car size={18} /> },
              { id: 'protection', label: 'Paint Protection', icon: <Shield size={18} /> }
            ].map((tab) => (
              <motion.button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center px-6 py-3 rounded-full text-sm font-medium transition-all ${activeTab === tab.id
                    ? 'bg-[#cd0d0f] text-white'
                    : 'bg-zinc-800 text-gray-300 hover:bg-zinc-700'
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
                    className={`w-full flex justify-between items-center p-5 text-left rounded-lg transition-all ${expandedItems[faq.id] ? 'bg-zinc-800' : 'bg-zinc-900 hover:bg-zinc-800'
                      }`}
                  >
                    <span className="text-lg font-medium pr-8">{faq.question}</span>
                    <ChevronDown
                      className={`transform transition-transform ${expandedItems[faq.id] ? 'rotate-180 text-[#cd0d0f]' : ''}`}
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
                        <div className="p-5 bg-zinc-800 text-gray-300 rounded-b-lg border-t border-zinc-700">
                          {faq.answer}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              ))
            ) : (
              <div className="text-center py-12">
                <p className="text-gray-400 text-lg">No questions found matching "{searchTerm}"</p>
                <button
                  onClick={() => setSearchTerm('')}
                  className="mt-4 text-[#cd0d0f] hover:underline"
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
            className="bg-zinc-800 p-10 rounded-2xl text-center"
          >
            <h2 className="text-3xl font-bold mb-4">Still have questions?</h2>
            <p className="text-gray-400 mb-8 max-w-lg mx-auto">
              Our team is always ready to help. Get in touch with us directly and we'll be happy to answer any specific questions you might have.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <a
                href="tel:+254792391610"
                className="inline-flex items-center justify-center bg-[#cd0d0f] rounded-lg px-6 py-3 font-medium hover:bg-opacity-90 transition duration-300"
              >
                Call Us
              </a>
              <a
                href="mailto:wrapndrivelimited@gmail.com"
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