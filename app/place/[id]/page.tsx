"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { Navbar } from "@/components/navbar";
import { Button } from "@/components/ui/button";
import { MapPin, Clock, ArrowLeft, Share2, CheckCircle2, XCircle, AlertTriangle } from "lucide-react";
import { toast } from "sonner";
import dynamic from "next/dynamic";


const PlaceMap = dynamic(() => import("@/components/place-map"), {
    ssr: false,
    loading: () => <div className="w-full h-48 bg-slate-100 animate-pulse rounded-2xl"></div>
});


export default function PlaceDetails() {
    const { id } = useParams();
    const router = useRouter();
    const [place, setPlace] = useState<any>(null);
    const [loading, setLoading] = useState(true);
    const [updating, setUpdating] = useState(false);

    const fetchPlace = async () => {
        try {
            // Re-using search API for now to get one place (not efficient but effective for MVP)
            // Ideally we'd have GET /api/places/[id]
            // But our search API returns all details we need.

            // Wait, we need a specific endpoint to fetch reliable single data or filter the search. 
            // Let's assume we can fetch it via search for now since our API is simple, 
            // OR I should add GET /api/places/[id] to the backend. 
            // For speed, let's update the backend endpoint in a later step if needed, 
            // but actually, we can just use the search API and filter client side if the ID isn't queryable, 
            // OR just add the endpoint wrapper.
            // Actually, the current search API might not support ID.
            // Let's implement a quick fetcher here assuming I'll add the endpoint logic or use a workaround.
            // WORKAROUND: The search API filters by name/category. 
            // I will add a GET /api/place?id=... handler or similar. 
            // Let's modify the backend to support `id` param in search/ route or create a new route.

            // Let's try to hit a new endpoint I will create: /api/place/[id]
            // But Hono routing in `[[...route]]`... I need to handle it there.

            const res = await fetch(`/api/place?id=${id}`);
            if (res.ok) {
                const data = await res.json();
                setPlace(data); // Expecting { ...place, currentStatus, lastUpdated }
            } else {
                // handle error
            }
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        if (id) fetchPlace();
    }, [id]);

    const handleUpdateStatus = async (status: 'OPEN' | 'CLOSED') => {
        setUpdating(true);
        try {
            const res = await fetch('/api/status', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    placeId: id,
                    status,
                    updatedBy: 'public' // Crowd-sourced
                })
            });

            if (res.ok) {
                await fetchPlace(); // Refresh data
                toast.success(`Status updated to ${status}`);
            } else {
                toast.error("Failed to update status");
            }
        } catch (error) {
            console.error("Failed to update status", error);
            toast.error("Network error while updating status");
        } finally {
            setUpdating(false);
        }
    };

    if (loading) return (
        <div className="min-h-screen bg-[#eefbf3] flex items-center justify-center">
            <div className="w-10 h-10 border-4 border-emerald-600 border-t-transparent rounded-full animate-spin"></div>
        </div>
    );

    if (!place) return (
        <div className="min-h-screen bg-[#eefbf3] flex flex-col items-center justify-center p-4">
            <h2 className="text-2xl font-bold text-slate-800 mb-4">Place not found</h2>
            <Button onClick={() => router.push('/search')}>Go Back</Button>
        </div>
    );

    const isOpen = place.currentStatus === 'OPEN';
    const isClosed = place.currentStatus === 'CLOSED';
    const isUnknown = place.currentStatus === 'UNKNOWN';

    // Time calculations
    const lastUpdatedDate = place.lastUpdated ? new Date(place.lastUpdated) : null;
    const timeString = lastUpdatedDate ? lastUpdatedDate.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) : '';

    return (
        <div className="min-h-screen bg-[#f8fafc]">
            <Navbar />

            <main className="max-w-3xl mx-auto px-6 py-12">
                <button
                    onClick={() => router.back()}
                    className="flex items-center text-slate-500 hover:text-slate-800 font-medium mb-8 transition-colors"
                >
                    <ArrowLeft className="w-4 h-4 mr-2" />
                    Back to search
                </button>

                {/* Status Header */}
                <div className="bg-white rounded-3xl shadow-xl overflow-hidden mb-8 border border-emerald-900/5">
                    <div className={`
                        p-12 text-center flex flex-col items-center justify-center
                        ${isOpen ? 'bg-emerald-50' : ''}
                        ${isClosed ? 'bg-slate-50' : ''}
                        ${isUnknown ? 'bg-amber-50' : ''}
                    `}>
                        <div className={`
                            inline-flex items-center gap-3 px-6 py-3 rounded-full text-lg font-bold shadow-sm mb-6
                            ${isOpen ? 'bg-emerald-100 text-emerald-800 border border-emerald-200' : ''}
                            ${isClosed ? 'bg-red-100 text-red-800 border border-red-200' : ''}
                            ${isUnknown ? 'bg-amber-100 text-amber-800 border border-amber-200' : ''}
                        `}>
                            <div className={`w-3 h-3 rounded-full ${isOpen ? 'bg-emerald-600 animate-pulse' : isClosed ? 'bg-red-600' : 'bg-amber-600'}`}></div>
                            {isOpen ? "OPEN RIGHT NOW" : isClosed ? "CLOSED NOW" : "STATUS UNKNOWN"}
                        </div>

                        <h1 className="text-4xl md:text-5xl font-bold text-slate-900 mb-4">{place.name}</h1>

                        {/* Map Section */}
                        {place.lat && place.lng && (
                            <div className="w-full h-48 mt-8 rounded-2xl overflow-hidden border border-slate-200">
                                <PlaceMap lat={place.lat} lng={place.lng} name={place.name} />
                            </div>
                        )}

                        <div className="flex items-center gap-2 text-slate-500 font-medium mt-4">
                            <MapPin className="w-5 h-5" />
                            {place.area}, {place.city}
                        </div>

                        {lastUpdatedDate && !isUnknown && (
                            <div className="mt-8 text-sm font-medium text-slate-400 flex items-center gap-2 bg-white/50 px-4 py-2 rounded-full">
                                <Clock className="w-4 h-4" />
                                Last confirmed at {timeString}
                            </div>
                        )}

                        {isUnknown && (
                            <div className="mt-8 text-sm font-medium text-amber-700 bg-amber-100/50 px-4 py-2 rounded-full flex items-center gap-2">
                                <AlertTriangle className="w-4 h-4" />
                                No recent updates. Verify below!
                            </div>
                        )}
                    </div>

                    {/* Action Area */}
                    <div className="p-8 border-t border-slate-100 bg-white">
                        <p className="text-center text-slate-600 font-medium mb-8">
                            Are you here? Help others by updating the status.
                        </p>

                        <div className="grid grid-cols-2 gap-4 max-w-md mx-auto">
                            <button
                                onClick={() => handleUpdateStatus('OPEN')}
                                disabled={updating}
                                className="flex flex-col items-center justify-center p-6 rounded-xl border-2 border-emerald-100 bg-emerald-50/50 hover:bg-emerald-100 hover:border-emerald-300 transition-all group disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                <CheckCircle2 className="w-10 h-10 text-emerald-600 mb-2 group-hover:scale-110 transition-transform" />
                                <span className="font-bold text-emerald-900">It's Open</span>
                            </button>

                            <button
                                onClick={() => handleUpdateStatus('CLOSED')}
                                disabled={updating}
                                className="flex flex-col items-center justify-center p-6 rounded-xl border-2 border-red-100 bg-red-50/50 hover:bg-red-100 hover:border-red-300 transition-all group disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                <XCircle className="w-10 h-10 text-red-600 mb-2 group-hover:scale-110 transition-transform" />
                                <span className="font-bold text-red-900">It's Closed</span>
                            </button>
                        </div>
                    </div>
                </div>

                {/* Share */}
                <div className="text-center">
                    <Button variant="outline" className="gap-2 text-slate-600" onClick={() => {
                        navigator.clipboard.writeText(window.location.href);
                        toast.success("Link copied to clipboard!");
                    }}>
                        <Share2 className="w-4 h-4" />
                        Share Status Link
                    </Button>
                </div>
            </main>
        </div>
    );
}
