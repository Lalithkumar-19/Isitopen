"use client";

import { useEffect, useState, useRef } from "react";
import { MapContainer, TileLayer, Marker, useMapEvents, useMap } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import { Search, Loader2, Navigation } from "lucide-react";
import { searchLocation } from "@/lib/geocoding";
import { toast } from "sonner";

// Fix Leaflet icons
// @ts-ignore
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
    iconRetinaUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png",
    iconUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png",
    shadowUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png",
});

// Component to handle map clicks and updates
function LocationMarker({
    position,
    setPosition,
    externalCenter
}: {
    position: { lat: number, lng: number } | null,
    setPosition: (pos: { lat: number, lng: number }) => void,
    externalCenter: { lat: number, lng: number } | null
}) {
    const map = useMap();

    // Handle map click
    useMapEvents({
        click(e) {
            setPosition(e.latlng);
        },
    });

    // Handle external center updates (Search or Geolocation)
    useEffect(() => {
        if (externalCenter) {
            map.flyTo(externalCenter, 15);
        }
    }, [externalCenter, map]);

    return position ? <Marker position={position} /> : null;
}

interface MapPickerProps {
    onLocationSelect: (location: { lat: number, lng: number }) => void;
    cityQuery?: string; // Input from the form
}

export default function MapPicker({ onLocationSelect, cityQuery }: MapPickerProps) {
    const [position, setPosition] = useState<{ lat: number, lng: number } | null>(null);
    const [mapCenter, setMapCenter] = useState<{ lat: number, lng: number }>({ lat: 12.9716, lng: 77.5946 }); // Default Bangalore
    const [searchQuery, setSearchQuery] = useState("");
    const [isSearching, setIsSearching] = useState(false);

    // Internal handler to update state and notify parent
    const handleLocationSelect = (pos: { lat: number, lng: number }) => {
        setPosition(pos);
        onLocationSelect(pos);
    };

    // 1. Sync Map with Form Input (Debounced)
    useEffect(() => {
        if (!cityQuery || cityQuery.length < 3) return;

        const timer = setTimeout(async () => {
            setIsSearching(true);
            const result = await searchLocation(cityQuery);
            if (result) {
                const newPos = { lat: result.lat, lng: result.lng };
                setMapCenter(newPos); // Moves the map
                // We DON'T automatiaclly set the pin here, we just show the area. 
                // User must click to pin exact shop.
            }
            setIsSearching(false);
        }, 1500); // 1.5s delay to avoid too many requests while typing

        return () => clearTimeout(timer);
    }, [cityQuery]);

    // 2. Internal Search Bar Handler
    const handleManualSearch = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!searchQuery) return;

        setIsSearching(true);
        const result = await searchLocation(searchQuery);
        if (result) {
            const newPos = { lat: result.lat, lng: result.lng };
            setMapCenter(newPos);
            handleLocationSelect(newPos); // Here we also drop the pin because user explicitly searched
        } else {
            toast.error("Location not found");
        }
        setIsSearching(false);
    };

    // 3. Current Location Handler
    const getCurrentLocation = () => {
        setIsSearching(true);
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
                (pos) => {
                    const newPos = { lat: pos.coords.latitude, lng: pos.coords.longitude };
                    // Force a slight state change to ensure re-render if value is same (rare but safer)
                    setMapCenter(newPos);
                    handleLocationSelect(newPos);
                    setIsSearching(false);
                },
                (err) => {
                    console.error(err);
                    toast.error("Could not get your location. Please enable permissions.");
                    setIsSearching(false);
                },
                { enableHighAccuracy: true }
            );
        } else {
            toast.error("Geolocation is not supported by your browser");
            setIsSearching(false);
        }
    };

    return (
        <div className="space-y-3 relative group">
            {/* Map Search Bar Overlay */}
            <div className="absolute top-3 left-3 right-3 z-[400] flex gap-2">
                <form onSubmit={handleManualSearch} className="flex-1">
                    <div className="relative">
                        <input
                            type="text"
                            placeholder="Search map specific location..."
                            className="w-full pl-9 pr-3 py-2 text-sm bg-white rounded-md shadow-md border border-slate-200 outline-none focus:ring-2 focus:ring-emerald-500"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                        />
                        <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
                    </div>
                </form>
                <button
                    type="button"
                    onClick={getCurrentLocation}
                    className="bg-white p-2 rounded-md shadow-md border border-slate-200 text-emerald-700 hover:bg-emerald-50"
                    title="Use Current Location"
                >
                    <Navigation className="w-5 h-5" />
                </button>
            </div>

            {/* Map Container */}
            <div className="h-[250px] w-full rounded-xl overflow-hidden border border-slate-200 z-0 relative">
                {isSearching && (
                    <div className="absolute inset-0 bg-white/50 z-[500] flex items-center justify-center backdrop-blur-[1px]">
                        <Loader2 className="w-8 h-8 animate-spin text-emerald-600" />
                    </div>
                )}

                <MapContainer
                    center={mapCenter}
                    zoom={13}
                    style={{ height: "100%", width: "100%", zIndex: 0 }}
                    scrollWheelZoom={true}
                >
                    <TileLayer
                        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    />
                    <LocationMarker
                        position={position}
                        setPosition={handleLocationSelect}
                        externalCenter={mapCenter}
                    />
                </MapContainer>
            </div>

            <div className="flex justify-between text-[10px] text-slate-500 px-1">
                <p>💡 Tip: You can drag the map and tap correctly to pin.</p>
                {position && <p>Selected: {position.lat.toFixed(5)}, {position.lng.toFixed(5)}</p>}
            </div>
        </div>
    );
}
