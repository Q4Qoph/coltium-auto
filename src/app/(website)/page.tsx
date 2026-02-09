"use client"

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import CustomerService from './(components)/CustomerService';
import { useRouter } from 'next/navigation';

export default function Home() {
    const [scrollY, setScrollY] = useState(0);
    const router = useRouter()

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
    const goToWhatsapp = () => {
        window.open('https://wa.me/message/DRBDDWMHOCREO1', '_blank');
    }

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
                        <p className="text-sm uppercase tracking-[0.25em] text-gray-300 mb-4">
                            Independent Mobile Vehicle Diagnostics
                        </p>
                        <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6 leading-tight">
                            Professional diagnosis.<br />
                            No repair incentives.
                        </h1>
                        <p className="text-gray-300 text-lg md:text-xl max-w-xl">
                            Coltium-Auto provides independent, on-site diagnostic oversight for modern vehicles —
                            so you understand the true root cause before anyone starts replacing parts.
                        </p>
                        <div className="flex flex-col sm:flex-row gap-4 mt-8">
                            <button
                                onClick={goToWhatsapp}
                                className="bg-[var(--primary)] transition-colors px-8 py-3 rounded-sm flex items-center gap-2"
                            >
                                Book a diagnostic
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                                    <path
                                        fillRule="evenodd"
                                        d="M12.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-2.293-2.293a1 1 0 010-1.414z"
                                        clipRule="evenodd"
                                    />
                                </svg>
                            </button>
                            <button
                                onClick={() => router.push('/services')}
                                className="border border-white hover:bg-white hover:text-black transition-colors px-8 py-3 rounded-sm flex items-center gap-2"
                            >
                                View services & plans
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                                    <path
                                        fillRule="evenodd"
                                        d="M12.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-2.293-2.293a1 1 0 010-1.414z"
                                        clipRule="evenodd"
                                    />
                                </svg>
                            </button>
                        </div>
                        <p className="mt-6 text-sm text-gray-400">
                            We do not repair vehicles. We do not sell parts. We work for you — not for garages, insurers, or warranty providers.
                        </p>
                    </motion.div>
                </div>
            </section>

            {/* About / Problem Section */}
            <section className="py-16 bg-black text-white">
                <div className="container mx-auto px-6">
                    <div className="flex flex-col md:flex-row">
                        <div className="md:w-1/5">
                            <div className="flex items-center mb-8">
                                <div className="w-10 h-px bg-[var(--primary)] mr-3"></div>
                                <span className="text-sm uppercase tracking-wider">ABOUT COLTIUM-AUTO</span>
                            </div>
                        </div>

                        <div className="md:w-4/5">
                            <div className="mb-8">
                                <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold leading-tight">
                                    Independent vehicle diagnostic oversight — like a medical diagnostic practice, but for cars.
                                </h2>
                            </div>

                            <div className="grid md:grid-cols-2 gap-8 pt-4">
                                <div className="space-y-4 text-gray-300 text-sm md:text-base">
                                    <p>
                                        Modern vehicles are complex systems of software, electronics, sensors, and mechanical components.
                                        In this environment, rushed diagnosis and guesswork are common — and parts are often replaced
                                        without addressing the real root cause.
                                    </p>
                                    <p>
                                        Coltium-Auto fills the missing role of a neutral, professional diagnostic authority. We focus
                                        solely on technical truth: what is really wrong, how severe it is, and what should — and should not —
                                        be done next.
                                    </p>
                                </div>
                                <div className="space-y-3 text-gray-300 text-sm md:text-base">
                                    <div className="border-t border-gray-700 pt-4">
                                        <p className="font-semibold mb-2 text-white">We help when:</p>
                                        <ul className="space-y-1 list-disc list-inside">
                                            <li>Warning lights or performance issues appear with no clear explanation.</li>
                                            <li>Multiple garages give conflicting repair recommendations.</li>
                                            <li>Insurance or warranty claims become technical disputes.</li>
                                            <li>You need to know what is urgent versus optional.</li>
                                        </ul>
                                    </div>
                                    <div className="border-t border-gray-700 pt-4">
                                        <p className="font-semibold mb-2 text-white">Our role is simple:</p>
                                        <p>
                                            Diagnose vehicles correctly, explain findings clearly, and guide owners and organizations
                                            toward informed decisions — before money is spent on repairs.
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <CustomerService goToWhatsapp={goToWhatsapp} />
        </div>
    );
}