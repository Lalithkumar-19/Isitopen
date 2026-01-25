"use client";

import { useEffect, useState, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { Navbar } from "@/components/navbar";
import { PlaceCard } from "@/components/place-card";
import { MapPin, Search as SearchIcon, Loader2, Frown } from "lucide-react";

function SearchContent() {
    const searchParams = useSearchParams();
    const initialQuery = searchParams.get("q") || "";
    const initialCity = searchParams.get("city") || "";

    const [query, setQuery] = useState(initialQuery);
    const [city, setCity] = useState(initialCity);
    const [loading, setLoading] = useState(true);
    const [places, setPlaces] = useState([]);
    const [debouncedQuery, setDebouncedQuery] = useState(initialQuery);
    const [debouncedCity, setDebouncedCity] = useState(initialCity);
    const [page, setPage] = useState(1);

    // Initial fetch
    useEffect(() => {
        const fetchPlaces = async () => {
            setLoading(true);
            try {
                const params = new URLSearchParams();
                if (debouncedQuery) params.append("q", debouncedQuery);
                if (debouncedCity) params.append("city", debouncedCity);
                params.append("page", page.toString());
                params.append("limit", "20");

                const res = await fetch(`/api/search?${params.toString()}`);
                const data = await res.json();
                setPlaces(data.results || []);
            } catch (error) {
                console.error("Failed to fetch places", error);
            } finally {
                setLoading(false);
            }
        };

        fetchPlaces();
    }, [debouncedQuery, debouncedCity, page]);

    // Update debounced values when inputs change (to avoid too many API calls)
    useEffect(() => {
        const timer = setTimeout(() => {
            setDebouncedQuery(query);
            setDebouncedCity(city);
            setPage(1); // Reset page on new search
        }, 500);
        return () => clearTimeout(timer);
    }, [query, city]);


    return (
        <div className="min-h-screen bg-[#f8fafc]">
            <Navbar />

            {/* Search Header */}
            <div className="relative pt-32 pb-24 px-6 shadow-2xl overflow-hidden">
                {/* Background Image */}
                <div className="absolute inset-0 z-0">
                    <img
                        src="https://images.pexels.com/photos/13119976/pexels-photo-13119976.jpeg?cs=srgb&dl=pexels-abdul-batin-235375905-13119976.jpg&fm=jpg"
                        alt="City Background"
                        className="w-full h-full object-cover opacity-100 filter blur-[2px]"
                    />
                    <div className="absolute inset-0 bg-gradient-to-b from-[#1a3c28]/95 to-[#1a3c28]/80 mix-blend-multiply"></div>
                </div>

                <div className="relative z-10 max-w-7xl mx-auto text-center md:text-left">
                    <h1 className="text-4xl md:text-5xl font-extrabold text-white mb-4 tracking-tight drop-shadow-md">
                        Check <span className="text-emerald-400">Live Status</span> Instantly
                    </h1>
                    <p className="text-emerald-100 text-lg mb-8 max-w-2xl font-medium drop-shadow">
                        Real-time updates for shops, services, and public places around you.
                    </p>

                    <div className="bg-white p-2 rounded-2xl flex flex-col md:flex-row gap-2 max-w-4xl shadow-xl shadow-emerald-900/20 mx-auto md:mx-0">
                        <div className="flex-1 flex items-center px-5 py-4 bg-slate-50 rounded-xl border border-transparent focus-within:border-emerald-500 focus-within:bg-white focus-within:ring-4 focus-within:ring-emerald-500/20 transition-all">
                            <MapPin className="text-emerald-600 w-5 h-5 mr-3 shrink-0" />
                            <input
                                type="text"
                                placeholder="City or Area (e.g. Indiranagar)"
                                className="bg-transparent w-full outline-none text-slate-900 placeholder:text-slate-400 font-semibold"
                                value={city}
                                onChange={(e) => setCity(e.target.value)}
                            />
                        </div>
                        <div className="h-px md:h-auto md:w-px bg-slate-200 mx-1"></div>
                        <div className="flex-[1.5] flex items-center px-5 py-4 bg-slate-50 rounded-xl border border-transparent focus-within:border-emerald-500 focus-within:bg-white focus-within:ring-4 focus-within:ring-emerald-500/20 transition-all">
                            <SearchIcon className="text-emerald-600 w-5 h-5 mr-3 shrink-0" />
                            <input
                                type="text"
                                placeholder="What are you looking for? (e.g. Pharmacy, ATM)"
                                className="bg-transparent w-full outline-none text-slate-900 placeholder:text-slate-400 font-semibold"
                                value={query}
                                onChange={(e) => setQuery(e.target.value)}
                            />
                        </div>
                    </div>

                    {/* Quick Filters */}
                    <div className="mt-8 flex flex-wrap gap-3 justify-center md:justify-start">
                        {["Medical", "Bank", "Petrol Pump", "Food", "Groceries"].map((tag) => (
                            <button
                                key={tag}
                                onClick={() => setQuery(tag)}
                                className="px-4 py-2 bg-emerald-900/40 hover:bg-emerald-800/60 border border-emerald-700/50 rounded-full text-emerald-100 text-sm font-semibold transition-all backdrop-blur-sm"
                            >
                                {tag}
                            </button>
                        ))}
                    </div>
                </div>
            </div>

            {/* Results Grid */}
            <div className="max-w-7xl mx-auto px-6 py-12">
                {loading ? (
                    <div className="flex justify-center py-20">
                        <Loader2 className="w-10 h-10 animate-spin text-emerald-600" />
                    </div>
                ) : places.length > 0 ? (
                    <>
                        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
                            {places.map((place: any) => (
                                <PlaceCard key={place._id} place={place} />
                            ))}
                        </div>

                        {/* Pagination Controls */}
                        <div className="flex justify-center gap-4">
                            <button
                                disabled={page <= 1}
                                onClick={() => setPage(p => Math.max(1, p - 1))}
                                className="px-4 py-2 rounded-lg border border-slate-200 bg-white text-slate-600 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-slate-50 transition-colors"
                            >
                                Previous
                            </button>
                            <span className="px-4 py-2 text-slate-600 font-medium">
                                Page {page}
                            </span>
                            <button
                                disabled={places.length < 20}
                                onClick={() => setPage(p => p + 1)}
                                className="px-4 py-2 rounded-lg border border-slate-200 bg-white text-slate-600 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-slate-50 transition-colors"
                            >
                                Next
                            </button>
                        </div>
                    </>
                ) : (
                    <div className="text-center py-20 bg-white rounded-2xl border border-slate-200 border-dashed">
                        <div className="w-16 h-16 bg-slate-50 rounded-full flex items-center justify-center mx-auto mb-4">
                            <Frown className="w-8 h-8 text-slate-400" />
                        </div>
                        <h3 className="text-xl font-semibold text-slate-900 mb-2">No places found</h3>
                        <p className="text-slate-500 max-w-xs mx-auto">
                            We couldn't find matches for your search. Try adjusting the city or keyword.
                        </p>
                    </div>
                )}
            </div>
        </div>
    );
}

export default function SearchPage() {
    return (
        <Suspense>
            <SearchContent />
        </Suspense>
    )
}
