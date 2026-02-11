"use client"

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import CustomerService from './(components)/CustomerService';
import { useRouter } from 'next/navigation';
import { whatsappUrl } from '@/lib/contact';
import { useWebsiteTheme } from '@/lib/website-theme';

export default function Home() {
    const [scrollY, setScrollY] = useState(0);
    const router = useRouter()
    const { theme } = useWebsiteTheme();
    const isDark = theme === "dark";

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
        window.open(whatsappUrl, '_blank');
    }

    return (
        <div className={isDark ? "bg-black text-white min-h-screen" : "bg-white text-slate-900 min-h-screen"}>
            {/* Hero Section */}
            <section className="relative h-[60vh] sm:h-screen flex items-center pt-24 md:pt-28 text-white">
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
                    {/* Left text readability overlay */}
                    <div className="absolute inset-y-0 left-0 w-1/2 bg-gradient-to-r from-black/80 via-black/60 to-transparent pointer-events-none" />
                </div>


                <div className="container mx-auto px-6 relative z-10">
                    <motion.div
                        initial="hidden"
                        animate="visible"
                        variants={fadeInUp}
                        className="max-w-3xl"
                    >
                        <p className="text-sm uppercase tracking-[0.25em] text-gray-300 mb-4">
                            Independent Mobile Vehicle Diagnostics
                        </p>
                        <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold mb-6 leading-snug max-w-2xl">
                            Professional diagnosis, no repair incentives.
                        </h1>
                        <p className="text-gray-300 text-lg md:text-xl max-w-xl">
                            Coltium-Auto provides independent, on-site diagnostic oversight for modern vehicles —
                            so you understand the true root cause before anyone starts replacing parts.
                        </p>
                        <div className="flex flex-col sm:flex-row gap-4 mt-8">
                            <button
                                onClick={() => router.push('/login')}
                                className="bg-[var(--primary)] transition-colors px-8 py-3 rounded-full flex items-center gap-2"
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
                                className="border border-white hover:bg-white hover:text-black transition-colors px-8 py-3 rounded-full flex items-center gap-2"
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
            <section className={isDark ? "py-16 bg-black text-white" : "py-16 bg-white text-slate-900"}>
                <div className="container mx-auto px-6">
                    <div className="flex flex-col md:flex-row">
                        <div className="md:w-1/5">
                            <div className="flex items-center mb-8">
                                <div className="w-10 h-px bg-[var(--primary)] mr-3"></div>
                                <span className="text-sm uppercase tracking-wider">ABOUT</span>
                            </div>
                        </div>

                        <div className="md:w-4/5">
                            <div className="mb-8">
                                <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold leading-tight">
                                    Independent vehicle diagnostic oversight — like a medical diagnostic practice, but for cars.
                                </h2>
                            </div>

                            <div className="grid md:grid-cols-2 gap-8 pt-4">
                                <div className={`space-y-4 text-sm md:text-base ${
                                  isDark ? "text-gray-300" : "text-slate-700"
                                }`}>
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
                                <div className={`space-y-3 text-sm md:text-base ${
                                  isDark ? "text-gray-300" : "text-slate-700"
                                }`}>
                                    <div className={`border-t pt-4 ${
                                      isDark ? "border-gray-700" : "border-slate-200"
                                    }`}>
                                        <p className="font-semibold mb-2">
                                          We help when:
                                        </p>
                                        <ul className="space-y-1 list-disc list-inside">
                                            <li>Warning lights or performance issues appear with no clear explanation.</li>
                                            <li>Multiple garages give conflicting repair recommendations.</li>
                                            <li>Insurance or warranty claims become technical disputes.</li>
                                            <li>You need to know what is urgent versus optional.</li>
                                        </ul>
                                    </div>
                                    <div className={`border-t pt-4 ${
                                      isDark ? "border-gray-700" : "border-slate-200"
                                    }`}>
                                        <p className="font-semibold mb-2">
                                          Our role is simple:
                                        </p>
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