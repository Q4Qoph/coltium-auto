"use client"

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Shield, Sparkles, Droplet } from 'lucide-react';
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
      <div className={`text-[#cd0d0f] mb-6 transition-all duration-300 ${isHovered ? 'scale-110' : ''}`}>
        {icon}
      </div>
      <h3 className="text-2xl font-bold mb-4">{title}</h3>
      <p className="text-gray-400 mb-6">{description}</p>
      <ul className="space-y-2">
        {bulletPoints.map((point: string, index: number) => (
          <li key={index} className="flex items-start">
            <span className="text-[#cd0d0f] mr-2">•</span>
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
    <div className="text-white min-h-screen ">
      {/* Hero Section */}
      <section className="pt-32 bg-gradient-to-b from-zinc-900 to-black">
        <div className="container mx-auto px-6">
          <motion.div
            initial="hidden"
            animate="visible"
            variants={fadeIn}
            className="max-w-3xl"
          >
            <h1 className="text-4xl md:text-5xl font-bold mb-6">Premium Services for Exceptional Vehicles</h1>
            <p className="text-gray-400 text-xl mb-12">This isn't just car care, it's an experience.</p>
          </motion.div>
        </div>
      </section>

      {/* Main Services */}
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
                icon={<Droplet size={40} />}
                title="Vinyl Wraps"
                description="Redefine your car's identity with our premium vinyl wraps, expertly applied for a transformative finish."
                bulletPoints={[
                  "Color change wraps",
                  "Matte & satin finishes",
                  "Custom designs",
                  "Paint protection film",
                  "Commercial branding"
                ]}
              />
            </motion.div>

            <motion.div variants={fadeIn}>
              <ServiceCard
                icon={<Shield size={40} />}
                title="PPF & Ceramic Coating"
                description="Elite-level protection for your vehicle that preserves its appearance and value for years to come."
                bulletPoints={[
                  "Paint Protection Film (PPF)",
                  "Ceramic coating application",
                  "Hydrophobic treatments",
                  "UV damage prevention",
                  "Self-healing technology"
                ]}
              />
            </motion.div>

            <motion.div variants={fadeIn}>
              <ServiceCard
                icon={<Sparkles size={40} />}
                title="Detailing & Facelifts"
                description="Revive, refresh, and stun with our comprehensive detailing services that restore your vehicle's glory."
                bulletPoints={[
                  "Interior deep cleaning",
                  "Exterior detailing",
                  "Headlight restoration",
                  "Engine bay detailing",
                  "Chrome treatments"
                ]}
              />
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Process Section */}
      <section className="py-20">
        <div className="container mx-auto px-6">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeIn}
            className="mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-6">Our Process</h2>
            <p className="text-gray-400 max-w-2xl">
              We believe in transparency and excellence in every step of our service delivery.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            {[
              { number: "01", title: "Consultation", description: "We discuss your vision and requirements to understand exactly what you're looking for." },
              { number: "02", title: "Design & Planning", description: "Our experts create a detailed plan and select the perfect materials for your vehicle." },
              { number: "03", title: "Execution", description: "Skilled technicians carry out the work with precision in our controlled environment." },
              { number: "04", title: "Quality Check", description: "Every project undergoes rigorous inspection before delivery to ensure perfection." }
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
                <div className="text-5xl font-bold text-[#cd0d0f] opacity-20 mb-4">{step.number}</div>
                <h3 className="text-xl font-bold mb-2">{step.title}</h3>
                <p className="text-gray-400">{step.description}</p>
                {index < 3 && (
                  <div className="hidden md:block absolute top-8 right-0 w-full h-px bg-gradient-to-r from-[#cd0d0f] to-transparent opacity-20"></div>
                )}
              </motion.div>
            ))}
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
              <h2 className="text-3xl md:text-4xl font-bold mb-4">Ready to transform your vehicle?</h2>
              <p className="text-gray-400">
                Contact us today to schedule a consultation or learn more about our premium services.
              </p>
            </div>
            <div>
              <Link href="tel:+254792391610" className="inline-flex items-center bg-[#cd0d0f] rounded-full px-8 py-3 font-medium hover:bg-opacity-90 transition duration-300">
                Call Us Right Now
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default ServicesPage;