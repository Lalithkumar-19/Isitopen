"use client";

import { useState } from "react";
import { Search, MapPin, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";

export function SearchSection() {
    const [query, setQuery] = useState("");
    const [loading, setLoading] = useState(false);

    const handleSearch = (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        // Simulate search for now, ready to connect to API
        setTimeout(() => setLoading(false), 1000);
        console.log("Searching for:", query);
    };

    const categories = ["Medical", "Govt Office", "Bank", "ATM", "Petrol Pump", "Garage"];

    return (
        <section className="py-20 bg-[#1a3c28] relative overflow-hidden">
            {/* Background Texture */}
            <div className="absolute inset-0 opacity-10 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')]"></div>

            <div className="relative max-w-5xl mx-auto px-6 lg:px-8 text-center">
                <h2 className="text-3xl lg:text-4xl font-bold text-white mb-6">
                    Is it <span className="text-emerald-400">Open</span> right now?
                </h2>
                <p className="text-emerald-100/80 mb-10 text-lg max-w-2xl mx-auto">
                    Don't assume. Check real-time crowd-sourced status before you step out.
                </p>

                <div className="bg-white p-2 rounded-2xl shadow-2xl max-w-3xl mx-auto flex flex-col md:flex-row gap-2">
                    {/* Location Input */}
                    <div className="flex-1 flex items-center px-4 py-3 bg-slate-50 rounded-xl border border-transparent focus-within:border-emerald-500 focus-within:bg-white transition-all">
                        <MapPin className="text-slate-400 w-5 h-5 mr-3 shrink-0" />
                        <input
                            type="text"
                            placeholder="City or Area (e.g. Indiranagar)"
                            className="bg-transparent w-full outline-none text-slate-800 placeholder:text-slate-400"
                        />
                    </div>

                    {/* Divider for mobile */}
                    <div className="h-px md:h-auto md:w-px bg-slate-200 mx-2"></div>

                    {/* Search Input */}
                    <div className="flex-[1.5] flex items-center px-4 py-3 bg-slate-50 rounded-xl border border-transparent focus-within:border-emerald-500 focus-within:bg-white transition-all">
                        <Search className="text-slate-400 w-5 h-5 mr-3 shrink-0" />
                        <input
                            type="text"
                            placeholder="What are you looking for? (e.g. Pharmacy)"
                            className="bg-transparent w-full outline-none text-slate-800 placeholder:text-slate-400"
                            value={query}
                            onChange={(e) => setQuery(e.target.value)}
                        />
                    </div>

                    {/* Search Button */}
                    <Button
                        onClick={handleSearch}
                        className="h-14 md:h-auto px-8 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-semibold text-lg hover:shadow-lg hover:shadow-emerald-900/20 transition-all cursor-pointer"
                        disabled={loading}
                    >
                        {loading ? <Loader2 className="animate-spin w-5 h-5" /> : "Check Now"}
                    </Button>
                </div>

                {/* Categories */}
                <div className="mt-10 flex flex-wrap justify-center gap-3">
                    <span className="text-emerald-100/60 text-sm font-medium uppercase tracking-wider mr-2 py-2">Popular:</span>
                    {categories.map((cat, i) => (
                        <button
                            key={i}
                            className="px-4 py-2 rounded-full bg-white/10 hover:bg-white/20 text-emerald-50 text-sm font-medium border border-white/5 transition-all cursor-pointer backdrop-blur-sm"
                        >
                            {cat}
                        </button>
                    ))}
                </div>
            </div>
        </section>
    );
}
