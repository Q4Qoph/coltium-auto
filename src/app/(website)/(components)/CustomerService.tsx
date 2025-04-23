"use client"

import Image from 'next/image';
import { motion } from 'framer-motion';

const CustomerService = () => {
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
    <section className="py-10 sm:py-24">
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
              src="/support.jpg"
              alt="Superior Customer Service"
              layout="fill"
              objectFit="cover"
            className="trans -scale-x-100"
            />
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeInLeft}
            className="flex flex-col justify-center"
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-8">
              Premium<br />Wrap<br />Support
            </h2>
            <p className="text-gray-400 mb-8">
              From design consultation to post-install care, we provide unmatched customer service for every wrap project. Whether it’s your first wrap or your fifth, our team ensures a smooth, stress-free experience. Clear timelines. Professional advice. Flawless results.
            </p>
            <button className="bg-[#eb2c09]  transition-colors  px-6 py-3 rounded-sm self-start flex items-center gap-2">
              Book a consult
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