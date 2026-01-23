import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Check, MoveRight } from "lucide-react";

export function SolutionSection() {
    return (
        <section className="py-24 overflow-hidden bg-white">
            <div className="max-w-7xl mx-auto px-6 lg:px-8">
                <div className="grid lg:grid-cols-2 gap-16 items-center">

                    {/* Left Column: Image & Decorations */}
                    <div className="relative mx-auto w-full max-w-[500px] lg:max-w-none">
                        {/* Background subtle shape */}
                        <div className="absolute top-10 left-10 right-0 bottom-0 bg-[#f8fafc] rounded-3xl -z-10 transform rotate-3"></div>

                        {/* Main Image */}
                        <div className="relative z-10">
                            <Image
                                src="https://images.unsplash.com/photo-1560250097-0b93528c311a?q=80&w=800&auto=format&fit=crop"
                                alt="Confident user"
                                width={600}
                                height={700}
                                className="rounded-2xl object-cover shadow-2xl w-full h-auto"
                            />
                        </div>

                        {/* Star Decoration (Top Left) */}
                        <div className="absolute -top-8 -left-8 z-20 text-[#1a3c28] rotate-12 animate-pulse">
                            <svg width="60" height="60" viewBox="0 0 24 24" fill="currentColor">
                                <path d="M12 0L14.5 9.5L24 12L14.5 14.5L12 24L9.5 14.5L0 12L9.5 9.5L12 0Z" />
                            </svg>
                        </div>

                        {/* Squiggle Decoration (Top Right) */}
                        <div className="absolute -top-6 right-10 z-0">
                            <svg width="100" height="50" viewBox="0 0 100 50" fill="none" stroke="#fbbf24" strokeWidth="3">
                                <path d="M0 25C10 25 10 0 20 0C30 0 30 25 40 25C50 25 50 0 60 0C70 0 70 25 80 25C90 25 90 0 100 0" />
                            </svg>
                        </div>

                        {/* Floating Stats Card */}
                        <div className="absolute bottom-10 -right-4 lg:-right-12 z-30 bg-white p-5 rounded-2xl shadow-[0_20px_50px_rgba(0,0,0,0.1)] max-w-[220px] w-full border border-slate-100 animate-bounce-slow">
                            <p className="text-sm font-bold text-slate-800 mb-2">Live Status Updates</p>
                            <div className="flex items-end gap-2 h-16 mb-2">
                                <div className="w-1/4 bg-emerald-100 h-[60%] rounded-t-sm"></div>
                                <div className="w-1/4 bg-emerald-200 h-[40%] rounded-t-sm"></div>
                                <div className="w-1/4 bg-emerald-300 h-[80%] rounded-t-sm"></div>
                                <div className="w-1/4 bg-[#1a3c28] h-full rounded-t-sm relative">
                                    <div className="absolute -top-6 left-1/2 -translate-x-1/2 text-[10px] font-bold bg-slate-800 text-white px-1.5 py-0.5 rounded">98%</div>
                                </div>
                            </div>
                            <div className="flex justify-between text-[10px] text-slate-400 font-medium tracking-wide">
                                <span>M</span><span>T</span><span>W</span><span>T</span>
                            </div>
                        </div>
                    </div>

                    {/* Right Column: Content */}
                    <div className="relative">
                        <h2 className="text-4xl lg:text-5xl font-bold text-[#1a2c42] mb-6 leading-tight">
                            Plan your visits with <br />
                            <span className="text-[#1a3c28]">absolute confidence.</span>
                        </h2>

                        <p className="text-lg text-slate-600 mb-8 leading-relaxed">
                            Stop guessing if a shop is open. Our community-driven platform gives you real-time checks and verified status updates, so you never waste a trip again.
                        </p>

                        <p className="text-slate-800 font-semibold mb-8">
                            Join thousands of smart commuters saving time daily!
                        </p>

                        <div className="space-y-6 mb-10">
                            {/* Feature 1 */}
                            <div className="flex items-center gap-4 group">
                                <div className="size-12 rounded-xl bg-orange-100 flex items-center justify-center text-orange-600 shrink-0 group-hover:scale-110 transition-transform">
                                    <Check className="size-6" strokeWidth={3} />
                                </div>
                                <span className="text-lg text-slate-700 font-medium">Instant real-time availability checks</span>
                            </div>

                            {/* Feature 2 */}
                            <div className="flex items-center gap-4 group">
                                <div className="size-12 rounded-xl bg-purple-100 flex items-center justify-center text-purple-600 shrink-0 group-hover:scale-110 transition-transform">
                                    <Check className="size-6" strokeWidth={3} />
                                </div>
                                <span className="text-lg text-slate-700 font-medium">Crowdsourced reliability you can trust</span>
                            </div>
                        </div>

                        <Button className="h-14 px-8 text-lg font-semibold bg-red-100 hover:bg-red-200 text-red-900 rounded-lg shadow-sm border border-red-200 cursor-pointer">
                            Start Checking Now
                            <MoveRight className="ml-2 w-5 h-5" />
                        </Button>
                    </div>

                </div>
            </div>
        </section>
    );
}
