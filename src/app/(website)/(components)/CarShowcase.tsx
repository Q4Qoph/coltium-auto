"use client"

import { useState } from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';

const CarShowcase = () => {
  const [selectedCar, setSelectedCar] = useState(0);

  const cars = [
    {
      id: 'bmw-m4',
      brand: 'BMW',
      model: 'M4 Competition',
      color: 'Satin Red',
      image: '/m4.png',
      specs: {
        finish: 'Satin Red',
        material: '3M',
        duration: '4 Days'
      },
      description: "Wrapped in satin red with gloss black accents, this M4 turns heads everywhere it goes. A clean, confident statement on wheels."
    },
    {
      id: 'g63-wrap',
      brand: 'MERCEDES',
      model: 'G63 AMG',
      color: 'Chrome Black',
      image: '/g63.png',
      specs: {
        finish: 'Chrome Black',
        material: 'KPMF',
        duration: '5 Days'
      },
      description: "Luxury meets bold with this chrome black G-Wagon wrap. Reflective, flawless, and protected."
    }
  ];


  const currentCar = cars[selectedCar];

  const fadeInUp = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6 }
    }
  };

  return (
    <section className="py-24 border-b border-gray-800">
      <div className="container mx-auto px-6">
        <div className="mb-16">
          <h2 className="text-sm uppercase tracking-wider text-gray-400 mb-6">TRANSFORMED RIDES</h2>
          <div className="flex justify-between items-end">
            <p className="text-gray-400 max-w-md">
              See how we turn ordinary cars into rolling art with premium wraps.
            </p>
            <button className="bg-[var(--primary)] transition-colors px-6 py-2 rounded-full text-sm">
              See all cars
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
          {/* Car Navigation */}
          <div className="lg:col-span-1 flex lg:flex-col gap-4 mb-8 lg:mb-0 overflow-x-auto lg:overflow-x-visible">
            {cars.map((car, index) => (
              <button
                key={car.id}
                onClick={() => setSelectedCar(index)}
                className={`flex-shrink-0 w-16 h-16 rounded-full flex items-center justify-center border-2 transition-all ${selectedCar === index
                  ? 'border-[var(--primary)] bg-opacity-20'
                  : 'border-gray-700 hover:border-gray-500'
                  }`}
              >
                <Image
                  src={car.image}
                  alt={`${car.brand} ${car.model}`}
                  width={40}
                  height={20}
                  className="object-contain"
                />
              </button>
            ))}
          </div>

          {/* Car Display */}
          <div className="lg:col-span-4">
            <div className="mb-10">
              <motion.h3
                key={currentCar.brand}
                initial="hidden"
                animate="visible"
                variants={fadeInUp}
                className="text-7xl md:text-8xl lg:text-9xl font-bold tracking-tighter"
              >
                {currentCar.brand}
              </motion.h3>
            </div>

            <div className="relative h-64 md:h-80 lg:h-96 mb-12">
              <motion.div
                key={currentCar.id}
                initial={{ opacity: 0, x: 100 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -100 }}
                transition={{ duration: 0.5 }}
                className="absolute inset-0"
              >
                <Image
                  src={currentCar.image}
                  alt={`${currentCar.brand} ${currentCar.model}`}
                  layout="fill"
                  objectFit="contain"
                  className="object-center"
                />
              </motion.div>
            </div>

            <div className="flex flex-col md:flex-row justify-between items-start md:items-center">
              <div>
                <h4 className="text-xl font-semibold">{currentCar.brand}-{currentCar.model}</h4>
                <p className="text-gray-400 mt-2 max-w-lg">
                  {currentCar.description}
                </p>
              </div>

              <div className="flex gap-8 mt-8 md:mt-0">
                <div className="text-center">
                  <p className="text-2xl font-bold">{currentCar.specs.finish}</p>
                  <p className="text-xs text-gray-400">Finish</p>
                </div>
                <div className="text-center">
                  <p className="text-2xl font-bold">{currentCar.specs.material}</p>
                  <p className="text-xs text-gray-400">Material</p>
                </div>
                <div className="text-center">
                  <p className="text-2xl font-bold">{currentCar.specs.duration}</p>
                  <p className="text-xs text-gray-400">Duration (D)</p>
                </div>
              </div>

              <button className="mt-8 md:mt-0 bg-[var(--primary)] transition-colors px-6 py-2 rounded-full text-sm flex items-center gap-2">
                Book a Wrap
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M12.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CarShowcase;