"use client";

import { AlertTriangle, Fingerprint, RefreshCcw, ShieldAlert, Timer } from "lucide-react";
import { motion } from "framer-motion";

export function CrowdTrustSection() {

    return (
        <motion.section
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            id="logic-behind"
            className="py-20 bg-slate-50 border-t border-slate-200">
            <div className="container mx-auto px-6 lg:px-12 max-w-6xl">
                <div className="text-center mb-16">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-50 border border-blue-100 text-blue-700 font-semibold text-sm mb-4"
                    >
                        <ShieldAlert className="w-4 h-4" />
                        Trust & Safety
                    </motion.div>
                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.1 }}
                        className="text-3xl md:text-4xl font-bold text-slate-900 mb-4"
                    >
                        Maintaining Data Integrity
                    </motion.h2>
                    <motion.p
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.2 }}
                        className="text-lg text-slate-600 max-w-2xl mx-auto"
                    >
                        How we ensure that the "Open" or "Closed" status you see is reliable and not spam.
                    </motion.p>
                </div>

                <div className="grid md:grid-cols-3 gap-8">
                    {/* Card 1: IP Based Tracking */}
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5 }}
                        className="bg-white p-8 rounded-2xl shadow-sm border border-slate-100 relative group overflow-hidden"
                    >
                        <div className="absolute top-0 right-0 w-32 h-32 bg-blue-50 rounded-bl-[100px] -mr-8 -mt-8 opacity-50 group-hover:scale-110 transition-transform"></div>
                        <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center text-blue-600 mb-6 relative z-10">
                            <Fingerprint className="w-6 h-6" />
                        </div>
                        <h3 className="text-xl font-bold text-slate-900 mb-3 relative z-10">1. Anonymous Verification</h3>
                        <p className="text-slate-600 relative z-10">
                            We don't ask for logins to keep it fast, but we log an <strong>anonymous hash of the user's IP address</strong> for every update.
                        </p>
                    </motion.div>

                    {/* Card 2: Rate Limiting */}
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5, delay: 0.2 }}
                        className="bg-white p-8 rounded-2xl shadow-sm border border-slate-100 relative group overflow-hidden"
                    >
                        <div className="absolute top-0 right-0 w-32 h-32 bg-amber-50 rounded-bl-[100px] -mr-8 -mt-8 opacity-50 group-hover:scale-110 transition-transform"></div>
                        <div className="w-12 h-12 bg-amber-100 rounded-xl flex items-center justify-center text-amber-600 mb-6 relative z-10">
                            <Timer className="w-6 h-6" />
                        </div>
                        <h3 className="text-xl font-bold text-slate-900 mb-3 relative z-10">2. Anti-Spam Limits</h3>
                        <p className="text-slate-600 relative z-10">
                            A single user can only update the status of the <span className="font-semibold text-amber-700">same place once every 10 minutes</span>. This prevents spamming or malicious toggling.
                        </p>
                    </motion.div>

                    {/* Card 3: Conflict Resolution */}
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5, delay: 0.4 }}
                        className="bg-white p-8 rounded-2xl shadow-sm border border-slate-100 relative group overflow-hidden"
                    >
                        <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-50 rounded-bl-[100px] -mr-8 -mt-8 opacity-50 group-hover:scale-110 transition-transform"></div>
                        <div className="w-12 h-12 bg-emerald-100 rounded-xl flex items-center justify-center text-emerald-600 mb-6 relative z-10">
                            <RefreshCcw className="w-6 h-6" />
                        </div>
                        <h3 className="text-xl font-bold text-slate-900 mb-3 relative z-10">3. Latest Wins</h3>
                        <p className="text-slate-600 relative z-10">
                            If multiple people update a place, the <strong>most recent confirmation</strong> is shown. However, if a place gets conflicting updates rapidly, we flag it as "Uncertain".
                        </p>
                    </motion.div>
                </div>

                {/* Technical Details Box */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: 0.4 }}
                    className="mt-12 bg-slate-900 rounded-2xl p-8 text-slate-300 font-mono text-sm relative overflow-hidden"
                >
                    <div className="absolute top-4 right-4 text-xs font-sans bg-slate-800 px-2 py-1 rounded text-slate-400">System Logic</div>
                    <p className="mb-2"><span className="text-blue-400">if</span> (user.lastUpdate &lt; 10_MINUTES) &#123;</p>
                    <p className="pl-4 mb-2 text-red-400">blockUpdate("Rate limit exceeded");</p>
                    <p className="mb-2">&#125; <span className="text-blue-400">else</span> &#123;</p>
                    <p className="pl-4 mb-2"><span className="text-emerald-400">acceptUpdate()</span>;</p>
                    <p className="pl-4 mb-2">logIPHash(user.ip);</p>
                    <p>&#125;</p>
                </motion.div>
            </div>
        </motion.section>
    );
}
