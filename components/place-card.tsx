"use client";

import { MapPin, Clock, ExternalLink, Image as ImageIcon, X } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";

interface PlaceCardProps {
    place: {
        _id: string;
        name: string;
        category: string;
        city: string;
        area: string;
        currentStatus: string;
        lastUpdated: string | null;
        image?: string;
        googleMapsLink?: string;
        lat?: number;
        lng?: number;
    };
}

export function PlaceCard({ place }: PlaceCardProps) {
    const isOpen = place.currentStatus === 'OPEN';
    const isClosed = place.currentStatus === 'CLOSED';
    const isUnknown = place.currentStatus === 'UNKNOWN';

    // Format time ago
    const getTimeAgo = (dateInfo: string | null) => {
        if (!dateInfo) return "Unknown";
        const date = new Date(dateInfo);
        const now = new Date();
        const seconds = Math.floor((now.getTime() - date.getTime()) / 1000);

        if (seconds < 60) return "Just now";
        const minutes = Math.floor(seconds / 60);
        if (minutes < 60) return `${minutes}m ago`;
        const hours = Math.floor(minutes / 60);
        if (hours < 24) return `${hours}h ago`;
        return `${Math.floor(hours / 24)}d ago`;
    };

    // Fallback images based on category
    const getFallbackImage = (category: string) => {
        switch (category) {
            case 'Medical': return "https://images.unsplash.com/photo-1587854692152-cbe660dbde88?auto=format&fit=crop&q=80&w=400";
            case 'Bank': return "https://images.unsplash.com/photo-1601597111158-2fceff292cdc?auto=format&fit=crop&q=80&w=400";
            case 'Food': return "https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&q=80&w=400";
            case 'Shop': return "https://images.unsplash.com/photo-1441986300917-64674bd600d8?auto=format&fit=crop&q=80&w=400";
            case 'Office': return "https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&q=80&w=400";
            default: return "https://images.unsplash.com/photo-1497366811353-6870744d04b2?auto=format&fit=crop&q=80&w=400";
        }
    };

    // Construct OSM embed URL
    const mapSrc = place.lat && place.lng
        ? `https://www.openstreetmap.org/export/embed.html?bbox=${place.lng - 0.01},${place.lat - 0.01},${place.lng + 0.01},${place.lat + 0.01}&layer=mapnik&marker=${place.lat},${place.lng}`
        : null;

    return (
        <div className="group bg-white rounded-xl border border-slate-200 hover:shadow-xl hover:border-emerald-500/30 transition-all duration-300 relative overflow-hidden flex flex-col h-full">
            {/* Image Section */}
            <div className="h-48 w-full relative overflow-hidden bg-slate-100">
                <img
                    src={place.image || getFallbackImage(place.category)}
                    alt={place.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute top-3 right-3">
                    <div className={`
                        px-3 py-1.5 rounded-full text-xs font-bold flex items-center gap-1.5 shadow-sm backdrop-blur-md
                        ${isOpen ? 'bg-emerald-500/90 text-white' : ''}
                        ${isClosed ? 'bg-red-500/90 text-white' : ''}
                        ${isUnknown ? 'bg-slate-800/80 text-white' : ''}
                    `}>
                        <div className={`w-2 h-2 rounded-full ${isOpen ? 'bg-white animate-pulse' : isClosed ? 'bg-red-200' : 'bg-slate-400'}`}></div>
                        {isOpen ? 'OPEN' : isClosed ? 'CLOSED' : 'UNKNOWN'}
                    </div>
                </div>
            </div>

            {/* Content */}
            <div className="p-5 flex flex-col flex-1">
                <div className="flex justify-between items-start mb-2">
                    <div className="inline-block px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider bg-slate-100 text-slate-600">
                        {place.category}
                    </div>
                    {place.lastUpdated && (
                        <div className="flex items-center gap-1 text-xs text-slate-400">
                            <Clock className="w-3 h-3" />
                            {getTimeAgo(place.lastUpdated)}
                        </div>
                    )}
                </div>

                <Link href={`/place/${place._id}`}>
                    <h3 className="text-lg font-bold text-slate-900 group-hover:text-emerald-700 transition-colors mb-1 line-clamp-1">
                        {place.name}
                    </h3>
                </Link>

                <div className="flex items-center gap-1 text-sm text-slate-500 font-medium mb-4">
                    <MapPin className="w-4 h-4 text-emerald-600" />
                    <span className="truncate">{place.area}, {place.city}</span>
                </div>

                <div className="mt-auto pt-4 border-t border-slate-100 flex items-center justify-between gap-2">
                    <Link href={`/place/${place._id}`} className="flex-1">
                        <Button variant="outline" className="w-full h-9 text-xs font-semibold hover:bg-emerald-50 hover:text-emerald-700 hover:border-emerald-200">
                            Update Status
                        </Button>
                    </Link>

                    {mapSrc ? (
                        <Dialog>
                            <DialogTrigger asChild>
                                <button className="w-9 h-9 flex items-center justify-center rounded-md border border-slate-200 text-slate-500 hover:text-emerald-600 hover:border-emerald-200 hover:bg-emerald-50 transition-colors" title="View Map">
                                    <MapPin className="w-4 h-4" />
                                </button>
                            </DialogTrigger>
                            <DialogContent className="sm:max-w-[600px] p-0 overflow-hidden">
                                <div className="bg-emerald-900 py-3 px-4 flex justify-between items-center text-white">
                                    <span className="font-semibold flex items-center gap-2">
                                        <MapPin className="w-4 h-4" />
                                        {place.name} Location
                                    </span>
                                </div>
                                <div className="h-[400px] w-full bg-slate-100 relative">
                                    <iframe
                                        width="100%"
                                        height="100%"
                                        frameBorder="0"
                                        scrolling="no"
                                        marginHeight={0}
                                        marginWidth={0}
                                        src={mapSrc}
                                        className="absolute inset-0"
                                    >
                                    </iframe>
                                </div>
                                <div className="p-3 bg-slate-50 text-xs text-slate-500 text-center border-t">
                                    View larger on <a href={`https://www.openstreetmap.org/?mlat=${place.lat}&mlon=${place.lng}`} target="_blank" className="underline text-emerald-600">OpenStreetMap website</a>
                                </div>
                            </DialogContent>
                        </Dialog>
                    ) : (
                        <a
                            href={`https://www.openstreetmap.org/search?query=${encodeURIComponent(`${place.name}, ${place.area}, ${place.city}`)}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="w-9 h-9 flex items-center justify-center rounded-md border border-slate-200 text-slate-500 hover:text-emerald-600 hover:border-emerald-200 hover:bg-emerald-50 transition-colors"
                            title="Search on OpenStreetMap"
                        >
                            <MapPin className="w-4 h-4" />
                        </a>
                    )}

                    {place.googleMapsLink ? (
                        <Dialog>
                            <DialogTrigger asChild>
                                <button className="w-9 h-9 flex items-center justify-center rounded-md border border-slate-200 text-slate-500 hover:text-blue-600 hover:border-blue-200 hover:bg-blue-50 transition-colors" title="View Google Maps">
                                    <ExternalLink className="w-4 h-4" />
                                </button>
                            </DialogTrigger>
                            <DialogContent className="sm:max-w-[600px] p-0 overflow-hidden">
                                <div className="bg-blue-900 py-3 px-4 flex justify-between items-center text-white">
                                    <span className="font-semibold flex items-center gap-2">
                                        <MapPin className="w-4 h-4" />
                                        {place.name} on Google Maps
                                    </span>
                                </div>
                                <div className="h-[400px] w-full bg-slate-100 relative">
                                    <iframe
                                        width="100%"
                                        height="100%"
                                        frameBorder="0"
                                        src={`https://www.google.com/maps/embed/v1/place?key=YOUR_API_KEY&q=${encodeURIComponent(place.googleMapsLink)}`}
                                        className="absolute inset-0"
                                        title="Google Maps Embed"
                                        allowFullScreen
                                    >
                                    </iframe>
                                    {/* Note: Standard embed requires API Key. Fallback to direct link if embed fails or for simple MVP without API Key */}
                                    <div className="absolute inset-0 flex items-center justify-center bg-slate-50 z-10">
                                        <div className="text-center p-6">
                                            <p className="text-slate-500 mb-4">Click below to view and navigate on Google Maps</p>
                                            <a
                                                href={place.googleMapsLink}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="inline-flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
                                            >
                                                <ExternalLink className="w-4 h-4" />
                                                Open Google Maps
                                            </a>
                                        </div>
                                    </div>
                                </div>
                            </DialogContent>
                        </Dialog>
                    ) : null}
                </div>

                {isUnknown && (
                    <div className="mt-3 text-[10px] text-orange-600 bg-orange-50 px-2 py-1.5 rounded text-center">
                        ⚠️ Not updated recently
                    </div>
                )}
            </div>
        </div>
    );
}
