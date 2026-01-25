"use client";

import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion";
import { HelpCircle } from "lucide-react";
import { motion } from "framer-motion";

export function FAQ() {
    return (
        <motion.section
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            id="faq"
            className="py-16 md:py-24 bg-[#f8fafc]">
            <div className="container px-4 md:px-6 mx-auto max-w-4xl">
                <div className="flex flex-col items-center justify-center space-y-4 text-center mb-12">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.8 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.5 }}
                        viewport={{ once: true }}
                        className="w-12 h-12 bg-emerald-100 rounded-2xl flex items-center justify-center text-emerald-600 mb-2"
                    >
                        <HelpCircle className="w-6 h-6" />
                    </motion.div>
                    <motion.h2
                        initial={{ opacity: 0, y: 10 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1, duration: 0.5 }}
                        viewport={{ once: true }}
                        className="text-3xl font-bold tracking-tighter text-slate-900 md:text-4xl"
                    >
                        Frequently Asked Questions
                    </motion.h2>
                    <motion.p
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        transition={{ delay: 0.2, duration: 0.5 }}
                        viewport={{ once: true }}
                        className="max-w-[700px] text-slate-600 md:text-lg/relaxed lg:text-base/relaxed xl:text-lg/relaxed"
                    >
                        Learn how Isitopen ensures clarity, user empathy, and real utility.
                    </motion.p>
                </div>

                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3, duration: 0.6 }}
                    viewport={{ once: true }}
                    className="bg-white rounded-2xl border border-emerald-900/5 shadow-xl shadow-emerald-900/5 overflow-hidden"
                >
                    <Accordion type="single" collapsible className="w-full">

                        <AccordionItem value="item-1" className="px-6 data-[state=open]:bg-emerald-50/30">
                            <AccordionTrigger className="text-left text-slate-800 hover:text-emerald-700">1. How is this different from normal opening hours?</AccordionTrigger>
                            <AccordionContent className="text-slate-600 leading-relaxed">
                                Most platforms show fixed timings like “9 AM – 9 PM”, but real life doesn’t always follow schedules.
                                <br /><br />
                                This platform shows <strong>real-time availability</strong>, based on recent confirmations, so you know whether a place is <strong>actually open right now</strong>.
                            </AccordionContent>
                        </AccordionItem>

                        <AccordionItem value="item-2" className="px-6 data-[state=open]:bg-emerald-50/30">
                            <AccordionTrigger className="text-left text-slate-800 hover:text-emerald-700">2. How do you know the information is real-time?</AccordionTrigger>
                            <AccordionContent className="text-slate-600 leading-relaxed">
                                Every open or closed status is <strong>time-stamped</strong>.
                                <br /><br />
                                If a place is not updated recently, we clearly show <strong>“Status Not Confirmed”</strong> instead of guessing. This avoids outdated or misleading information.
                            </AccordionContent>
                        </AccordionItem>

                        <AccordionItem value="item-3" className="px-6 data-[state=open]:bg-emerald-50/30">
                            <AccordionTrigger className="text-left text-slate-800 hover:text-emerald-700">3. Who updates the open or closed status?</AccordionTrigger>
                            <AccordionContent className="text-slate-600 leading-relaxed">
                                Availability can be updated by:
                                <ul className="list-disc pl-5 mt-2 space-y-1">
                                    <li>Staff present at the place</li>
                                    <li>Nearby people who are currently there</li>
                                </ul>
                                <br />
                                This <strong>crowd-assisted approach</strong> keeps the information fresh and practical.
                            </AccordionContent>
                        </AccordionItem>

                        <AccordionItem value="item-4" className="px-6 data-[state=open]:bg-emerald-50/30">
                            <AccordionTrigger className="text-left text-slate-800 hover:text-emerald-700">4. What if the status was updated incorrectly?</AccordionTrigger>
                            <AccordionContent className="text-slate-600 leading-relaxed">
                                Statuses automatically <strong>expire after a short time</strong> (e.g. 30 minutes) if not refreshed.
                                <br /><br />
                                This means:
                                <ul className="list-disc pl-5 mt-2 space-y-1">
                                    <li>Old information does not stay forever</li>
                                    <li>Unconfirmed data is clearly marked</li>
                                    <li>Users are never misled by stale updates</li>
                                </ul>
                            </AccordionContent>
                        </AccordionItem>

                        <AccordionItem value="item-5" className="px-6 data-[state=open]:bg-emerald-50/30">
                            <AccordionTrigger className="text-left text-slate-800 hover:text-emerald-700">5. Do I need to create an account to use this?</AccordionTrigger>
                            <AccordionContent className="text-slate-600 leading-relaxed">
                                No. You can check availability <strong>without signing up</strong>.
                                <br /><br />
                                We intentionally removed mandatory login to keep the experience fast and friction-free. Time saved is the main goal.
                            </AccordionContent>
                        </AccordionItem>

                        <AccordionItem value="item-6" className="px-6 data-[state=open]:bg-emerald-50/30">
                            <AccordionTrigger className="text-left text-slate-800 hover:text-emerald-700">6. Is this meant for booking appointments or services?</AccordionTrigger>
                            <AccordionContent className="text-slate-600 leading-relaxed">
                                No. This platform does <strong>not</strong> handle:
                                <ul className="list-disc pl-5 mt-2 space-y-1">
                                    <li>Appointments</li>
                                    <li>Bookings</li>
                                    <li>Business management</li>
                                </ul>
                                <br />
                                It focuses only on one thing:
                                👉 <strong>Is this place open right now?</strong>
                            </AccordionContent>
                        </AccordionItem>

                        <AccordionItem value="item-7" className="px-6 data-[state=open]:bg-emerald-50/30">
                            <AccordionTrigger className="text-left text-slate-800 hover:text-emerald-700">7. What types of places are supported?</AccordionTrigger>
                            <AccordionContent className="text-slate-600 leading-relaxed">
                                This platform is designed for <strong>public-facing services</strong>, such as:
                                <ul className="list-disc pl-5 mt-2 space-y-1">
                                    <li>Medical stores and pharmacies</li>
                                    <li>Government offices</li>
                                    <li>Banks</li>
                                    <li>Local shops</li>
                                    <li>Repair centers</li>
                                </ul>
                                <br />
                                Private or home-based services are intentionally excluded.
                            </AccordionContent>
                        </AccordionItem>

                        <AccordionItem value="item-8" className="px-6 data-[state=open]:bg-emerald-50/30">
                            <AccordionTrigger className="text-left text-slate-800 hover:text-emerald-700">8. What happens if no one updates a place?</AccordionTrigger>
                            <AccordionContent className="text-slate-600 leading-relaxed">
                                If no recent update exists:
                                <ul className="list-disc pl-5 mt-2 space-y-1">
                                    <li>The place is shown as <strong>“Status Not Confirmed”</strong></li>
                                    <li>Users can decide whether to proceed or not</li>
                                </ul>
                                <br />
                                We prefer <strong>honest uncertainty</strong> over false confidence.
                            </AccordionContent>
                        </AccordionItem>

                        <AccordionItem value="item-9" className="px-6 data-[state=open]:bg-emerald-50/30">
                            <AccordionTrigger className="text-left text-slate-800 hover:text-emerald-700">9. How does this help save time?</AccordionTrigger>
                            <AccordionContent className="text-slate-600 leading-relaxed">
                                By checking availability in advance:
                                <ul className="list-disc pl-5 mt-2 space-y-1">
                                    <li>Users avoid unnecessary travel</li>
                                    <li>No need to ask nearby people</li>
                                    <li>No waiting outside closed shutters</li>
                                </ul>
                                <br />
                                A few seconds of checking can save <strong>hours of effort</strong>.
                            </AccordionContent>
                        </AccordionItem>

                        <AccordionItem value="item-10" className="px-6 border-b-0 data-[state=open]:bg-emerald-50/30">
                            <AccordionTrigger className="text-left text-slate-800 hover:text-emerald-700">10. Is this information guaranteed to be 100% accurate?</AccordionTrigger>
                            <AccordionContent className="text-slate-600 leading-relaxed">
                                This platform does not make guarantees. Instead, it provides:
                                <ul className="list-disc pl-5 mt-2 space-y-1">
                                    <li>Recent confirmations</li>
                                    <li>Clear timestamps</li>
                                    <li>Honest warnings when data is old</li>
                                </ul>
                                <br />
                                The goal is <strong>better decisions</strong>, not blind trust.
                            </AccordionContent>
                        </AccordionItem>

                    </Accordion>
                </motion.div>
            </div>
        </motion.section>
    );
}
