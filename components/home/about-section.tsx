"use client";

import { CheckCircle2, ShieldCheck, Clock, Users } from "lucide-react";
import { motion } from "framer-motion";

export function AboutSection() {
    const cardVariants = {
        hidden: { opacity: 0, x: 50 },
        visible: { opacity: 1, x: 0, transition: { duration: 0.5 } }
    };

    return (
        <motion.section
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="py-24 bg-[#1a3c28] text-white overflow-hidden relative">
            {/* Background Decor */}
            <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-emerald-500 rounded-full mix-blend-multiply filter blur-[100px] opacity-10 animate-pulse"></div>
            <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-emerald-700 rounded-full mix-blend-multiply filter blur-[100px] opacity-10"></div>

            <div className="container mx-auto px-6 lg:px-12 relative z-10">
                <div className="grid lg:grid-cols-2 gap-16 items-center">

                    {/* Left Side: Why We Built This */}
                    <div className="space-y-8">
                        <motion.div
                            initial={{ opacity: 0, x: -30 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6 }}
                        >
                            <h2 className="text-3xl md:text-5xl font-bold mb-6 leading-tight">
                                Why We Built <span className="text-emerald-400">Isitopen</span>
                            </h2>
                            <p className="text-emerald-100/90 text-lg md:text-xl leading-relaxed">
                                People don’t suffer because shops have fixed timings.
                                <br />
                                They suffer because <span className="text-white font-semibold">availability is unclear</span> in real life.
                            </p>
                            <p className="border-l-4 border-emerald-500 pl-4 mt-6 text-emerald-100 italic">
                                This project focuses only on real-time clarity, not bookings, management, or assumptions.
                            </p>
                        </motion.div>

                        {/* Problem Solved */}
                        <motion.div
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6, delay: 0.2 }}
                            className="bg-white/5 p-6 rounded-2xl border border-emerald-500/20 backdrop-blur-sm"
                        >
                            <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
                                <ShieldCheck className="w-5 h-5 text-emerald-400" />
                                What We Solved
                            </h3>
                            <ul className="grid sm:grid-cols-2 gap-3 text-emerald-100">
                                <li className="flex items-center gap-2">
                                    <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                                    Reduced unnecessary travel
                                </li>
                                <li className="flex items-center gap-2">
                                    <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                                    Eliminated guesswork
                                </li>
                                <li className="flex items-center gap-2">
                                    <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                                    No outdated info
                                </li>
                                <li className="flex items-center gap-2">
                                    <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                                    Improved convenience
                                </li>
                            </ul>
                        </motion.div>
                    </div>

                    {/* Right Side: What Makes It Different */}
                    <div className="space-y-6">
                        <motion.div
                            initial={{ opacity: 0 }}
                            whileInView={{ opacity: 1 }}
                            viewport={{ once: true }}
                            className="relative"
                        >
                            <h3 className="text-2xl font-bold mb-8 flex items-center before:content-[''] before:w-12 before:h-1 before:bg-emerald-500 before:mr-4">
                                What Makes This Different
                            </h3>
                        </motion.div>

                        <motion.div
                            className="grid gap-4"
                            initial="hidden"
                            whileInView="visible"
                            viewport={{ once: true }}
                            variants={{
                                visible: { transition: { staggerChildren: 0.15 } }
                            }}
                        >
                            <motion.div variants={cardVariants} className="group bg-white rounded-xl p-6 shadow-xl transition-all hover:-translate-y-1 hover:shadow-2xl">
                                <div className="flex items-start justify-between">
                                    <div>
                                        <h4 className="text-lg font-bold text-slate-800 mb-1">No Static Timings</h4>
                                        <p className="text-slate-500 text-sm">We don't rely on "9 AM - 5 PM" charts. We check what's happening NOW.</p>
                                    </div>
                                    <div className="w-10 h-10 bg-red-100 rounded-lg flex items-center justify-center text-red-600">
                                        <span className="font-bold text-lg">❌</span>
                                    </div>
                                </div>
                            </motion.div>

                            <motion.div variants={cardVariants} className="group bg-white rounded-xl p-6 shadow-xl transition-all hover:-translate-y-1 hover:shadow-2xl">
                                <div className="flex items-start justify-between">
                                    <div>
                                        <h4 className="text-lg font-bold text-slate-800 mb-1">Auto-Expiring Availability</h4>
                                        <p className="text-slate-500 text-sm">Old updates vanish automatically to prevent misleading data.</p>
                                    </div>
                                    <div className="w-10 h-10 bg-emerald-100 rounded-lg flex items-center justify-center text-emerald-600">
                                        <Clock className="w-6 h-6" />
                                    </div>
                                </div>
                            </motion.div>

                            <motion.div variants={cardVariants} className="group bg-white rounded-xl p-6 shadow-xl transition-all hover:-translate-y-1 hover:shadow-2xl">
                                <div className="flex items-start justify-between">
                                    <div>
                                        <h4 className="text-lg font-bold text-slate-800 mb-1">Community Assisted</h4>
                                        <p className="text-slate-500 text-sm">Real people nearby update the status for everyone's benefit.</p>
                                    </div>
                                    <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center text-blue-600">
                                        <Users className="w-6 h-6" />
                                    </div>
                                </div>
                            </motion.div>

                            <motion.div variants={cardVariants} className="group bg-white rounded-xl p-6 shadow-xl transition-all hover:-translate-y-1 hover:shadow-2xl">
                                <div className="flex items-start justify-between">
                                    <div>
                                        <h4 className="text-lg font-bold text-slate-800 mb-1">Honest "Not Confirmed"</h4>
                                        <p className="text-slate-500 text-sm">We'd rather tell you we don't know than lie to you.</p>
                                    </div>
                                    <div className="w-10 h-10 bg-amber-100 rounded-lg flex items-center justify-center text-amber-600">
                                        <span className="font-bold text-lg">⚠️</span>
                                    </div>
                                </div>
                            </motion.div>
                        </motion.div>
                    </div>
                </div>
            </div>
        </motion.section>
    );
}
