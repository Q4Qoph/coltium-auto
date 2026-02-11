"use client"

import Image from 'next/image';
import { motion } from 'framer-motion';
import { useWebsiteTheme } from '@/lib/website-theme';

const CustomerService = ({ goToWhatsapp }: any) => {
  const { theme } = useWebsiteTheme();
  const isDark = theme === "dark";
  const fadeInRight = {
    hidden: { opacity: 0, x: -50 },
    visible: {
      opacity: 1,
      x: 0,
      transition: { duration: 0.6 }
    }
  };

  const fadeInLeft = {
    hidden: { opacity: 0, x: 50 },
    visible: {
      opacity: 1,
      x: 0,
      transition: { duration: 0.6 }
    }
  };

  return (
    <section className={isDark ? "py-10 sm:py-24 bg-black text-white" : "py-10 sm:py-24 bg-white text-slate-900"}>
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeInRight}
            className="relative h-96 md:h-full"
          >
            <Image
              src="/support.png"
              alt="Independent vehicle diagnostic support"
              layout="fill"
              objectFit="contain"
              className="object-contain"
            />
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeInLeft}
            className="flex flex-col justify-center"
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              Independent<br />Diagnostic<br />Oversight
            </h2>
            <p className={isDark ? "text-gray-400 mb-4" : "text-slate-600 mb-4"}>
              We operate like a medical diagnostic practice — but for vehicles. Our job is to examine the
              vehicle carefully, interpret the data professionally, and give you clear, neutral guidance.
            </p>
            <p className={isDark ? "text-gray-400 mb-6" : "text-slate-600 mb-6"}>
              We do not repair vehicles, sell parts, or work for garages, insurers, or warranty providers.
              That means our only incentive is technical accuracy and your long‑term interest.
            </p>
            <ul className={`text-sm space-y-2 mb-8 ${
              isDark ? "text-gray-300" : "text-slate-700"
            }`}>
              <li>• On-site diagnostics using professional tooling and methods.</li>
              <li>• Severity-ranked findings so you know what is urgent versus optional.</li>
              <li>• Clear next-step recommendations you can share with any garage or provider.</li>
            </ul>
            <button
              onClick={goToWhatsapp}
              className="bg-[var(--primary)] transition-colors px-6 py-3 rounded-full self-start flex items-center gap-2"
            >
              Book on-site diagnostics
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M12.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
              </svg>
            </button>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default CustomerService;