"use client"
import Image from 'next/image';
import { motion } from 'framer-motion';

const BrandsGrid = () => {
  const brands = [
    { id: 'bugatti', name: 'Bugatti', logo: '/images/logos/bugatti.svg' },
    { id: 'ferrari', name: 'Ferrari', logo: '/images/logos/ferrari.svg' },
    { id: 'lamborghini', name: 'Lamborghini', logo: '/images/logos/lamborghini.svg' },
    { id: 'jaguar', name: 'Jaguar', logo: '/images/logos/jaguar.svg' },
    { id: 'bentley', name: 'Bentley', logo: '/images/logos/bentley.svg' },
  ];
  
  const fadeInUp = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.4 }
    }
  };

  return (
    <section className="py-24 border-b border-gray-800">
      <div className="container mx-auto px-6">
        <h2 className="text-sm uppercase tracking-wider text-gray-400 mb-6">POPULAR EXOTIC & LUXURY RENTAL MAKES</h2>
        <p className="text-gray-400 max-w-2xl mb-12">
          Our collection includes the most prestigious brands in the automotive world, from Italian supercars to British luxury sedans.
        </p>
        
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
          {brands.map((brand, index) => (
            <motion.div
              key={brand.id}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeInUp}
              custom={index}
              whileHover={{ scale: 1.05 }}
              className="bg-gray-900 border border-gray-800 rounded-sm p-6 flex items-center justify-center h-32"
            >
              <div className="relative h-12 w-full">
                <Image
                  src={brand.logo}
                  alt={brand.name}
                  layout="fill"
                  objectFit="contain"
                  className="filter invert opacity-80"
                />
              </div>
            </motion.div>
          ))}
        </div>
        
        <div className="flex justify-center mt-12">
          <button className="bg-yellow-400 hover:bg-yellow-500 transition-colors text-black px-8 py-3 rounded-sm">
            See All Brands
          </button>
        </div>
      </div>
    </section>
  );
};

export default BrandsGrid;