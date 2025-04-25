"use client"

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import CustomerService from './(components)/CustomerService';

export default function Home() {
    const [scrollY, setScrollY] = useState(0);

    useEffect(() => {
        const handleScroll = () => {
            setScrollY(window.scrollY);
        };

        window.addEventListener('scroll', handleScroll);
        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    const fadeInUp = {
        hidden: { opacity: 0, y: 20 },
        visible: {
            opacity: 1,
            y: 0,
            transition: { duration: 0.6 }
        }
    };

    return (
        <div className="bg-black text-white min-h-screen">
            {/* Hero Section */}
            <section className="relative h-[60vh] sm:h-screen flex items-center">
                <div className="absolute inset-0 overflow-hidden">
                    <Image
                        src="/1.png"
                        alt="Luxury Car"
                        layout="fill"
                        objectFit="cover"
                        priority
                        className="opacity-80"
                    />
                    {/* Mirror overlay */}
                    <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-black/70 mix-blend-overlay pointer-events-none"></div>
                </div>


                <div className="container mx-auto px-6 relative z-10">
                    <motion.div
                        initial="hidden"
                        animate="visible"
                        variants={fadeInUp}
                        className="max-w-2xl"
                    >
                        <h1 className="text-4xl md:text-7xl font-bold mb-4">
                            Wrap Your Ride. <br />
                            Own the Look.
                        </h1>
                        <div className="flex flex-col sm:flex-row gap-4 mt-8">
                            <button className="bg-[#eb2c09] transition-colors px-8 py-3 rounded-sm flex items-center gap-2">
                                Get a Wrap
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                                    <path fillRule="evenodd" d="M12.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
                                </svg>
                            </button>
                            <button className="border border-white hover:bg-white hover:text-black transition-colors px-8 py-3 rounded-sm flex items-center gap-2">
                                Explore Finishes
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                                    <path fillRule="evenodd" d="M12.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
                                </svg>
                            </button>
                        </div>
                    </motion.div>
                </div>
            </section>

            {/* About Section */}
            <section className="py-16 bg-black text-white">
                <div className="container mx-auto px-6">
                    <div className="flex flex-col md:flex-row">
                        <div className="md:w-1/5">
                            <div className="flex items-center mb-8">
                                <div className="w-10 h-px bg-[#eb2c09] mr-3"></div>
                                <span className="text-sm uppercase tracking-wider">ABOUT US</span>
                            </div>
                        </div>

                        <div className="md:w-4/5">
                            <div className="mb-8">
                                <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold leading-tight">
                                    From sleek matte finishes to bold custom designs, our expert vehicle wraps <span className='text-gray-400 opacity-80'>turn ordinary cars into showstoppers</span>
                                </h2>
                            </div>

                            <div className="flex justify-end gap-6  pt-8">
                                <p className="w-1/2 flex items-center border-t border-gray-400  mt-3">
                                </p>
                                <p className="w-1/2 text-gray-400 text-sm md:text-base">
                                    We specialize in premium car wraps that combine aesthetics, protection, and performance. Whether you're looking for a full color change, a satin finish, or branded graphics for your business fleet, our team delivers precision work using industry-leading materials. Every project is handled with care and attention to detail, ensuring your vehicle stands out on the road and stays protected from the elements.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            <CustomerService />
        </div>
    );
}