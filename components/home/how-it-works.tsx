"use client";

import { Search, MapPin, CheckCircle2, Users } from "lucide-react";
import { motion } from "framer-motion";

export function HowItWorks() {
    const steps = [
        {
            icon: <Search className="w-8 h-8 text-emerald-600" />,
            title: "Search for a Place",
            description: "Enter the name of the shop, pharmacy, or office you want to visit."
        },
        {
            icon: <CheckCircle2 className="w-8 h-8 text-emerald-600" />,
            title: "Check Live Status",
            description: "Instantly see if it's OPEN or CLOSED based on real-time updates."
        },
        {
            icon: <Users className="w-8 h-8 text-emerald-600" />,
            title: "Help the Community",
            description: "If you are at the location, update the status to help others save time."
        }
    ];

    const container = {
        hidden: { opacity: 0 },
        show: {
            opacity: 1,
            transition: {
                staggerChildren: 0.2
            }
        }
    };

    const item = {
        hidden: { opacity: 0, y: 20 },
        show: { opacity: 1, y: 0, transition: { duration: 0.5 } }
    };

    return (
        <section id="how-it-works" className="py-20 bg-white">
            <div className="container mx-auto px-6 lg:px-12">
                <div className="text-center mb-16">
                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5 }}
                        className="text-3xl md:text-4xl font-bold text-slate-900 mb-4"
                    >
                        How <span className="text-emerald-600">Isitopen</span> Works
                    </motion.h2>
                    <motion.p
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5, delay: 0.2 }}
                        className="text-lg text-slate-600 max-w-2xl mx-auto"
                    >
                        Three simple steps to save time and avoid wasted trips.
                    </motion.p>
                </div>

                <motion.div
                    variants={container}
                    initial="hidden"
                    whileInView="show"
                    viewport={{ once: true }}
                    className="grid md:grid-cols-3 gap-10 relative"
                >
                    {/* Connecting Line (Desktop) */}
                    <motion.div
                        initial={{ scaleX: 0 }}
                        whileInView={{ scaleX: 1 }}
                        transition={{ duration: 0.8, delay: 0.4 }}
                        viewport={{ once: true }}
                        className="hidden md:block absolute top-12 left-[16%] right-[16%] h-0.5 bg-gradient-to-r from-emerald-100 via-emerald-200 to-emerald-100 z-0 origin-left"
                    ></motion.div>

                    {steps.map((step, index) => (
                        <motion.div
                            key={index}
                            variants={item}
                            className="relative z-10 flex flex-col items-center text-center group"
                        >
                            <div className="w-24 h-24 bg-emerald-50 rounded-full flex items-center justify-center border-4 border-white shadow-lg mb-6 group-hover:scale-110 transition-transform duration-300">
                                {step.icon}
                            </div>
                            <h3 className="text-xl font-bold text-slate-900 mb-3">{step.title}</h3>
                            <p className="text-slate-600 leading-relaxed max-w-xs">
                                {step.description}
                            </p>

                            {/* Step Number Badge */}
                            <div className="absolute top-0 right-1/2 translate-x-10 -translate-y-2 w-8 h-8 bg-emerald-600 text-white rounded-full flex items-center justify-center font-bold text-sm border-4 border-white">
                                {index + 1}
                            </div>
                        </motion.div>
                    ))}
                </motion.div>
            </div>
        </section>
    );
}
