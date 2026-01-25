"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { MapPin, Building2, Store, PlusCircle, ImagePlus, Loader2, Link as LinkIcon } from "lucide-react";
import { toast } from "sonner";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import dynamic from "next/dynamic";

const MapPicker = dynamic(() => import("@/components/map-picker"), {
    ssr: false,
    loading: () => <div className="h-[200px] w-full bg-slate-100 animate-pulse rounded-lg flex items-center justify-center text-slate-400 text-xs">Loading Map...</div>
});

export function AddPlaceModal({ children, trigger }: { children?: React.ReactNode, trigger?: React.ReactNode }) {
    const router = useRouter();
    const [open, setOpen] = useState(false);
    const [loading, setLoading] = useState(false);
    const [uploading, setUploading] = useState(false);
    const [imageFile, setImageFile] = useState<File | null>(null);
    const [formData, setFormData] = useState({
        name: "",
        category: "Shop",
        city: "",
        area: "",
        image: "",
        lat: null as number | null,
        lng: null as number | null,
        googleMapsLink: ""
    });

    const categories = ["Medical", "Bank", "Office", "Shop", "Food", "Other"];

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            setImageFile(e.target.files[0]);
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);

        try {
            let imageUrl = "";

            if (imageFile) {
                setUploading(true);
                const formData = new FormData();
                formData.append("image", imageFile);

                // Upload to ImgBB
                const imgRes = await fetch(`https://api.imgbb.com/1/upload?key=38f3a12dd0a8b653d5f07d2f68240073`, {
                    method: "POST",
                    body: formData,
                });

                const imgData = await imgRes.json();
                if (imgData.success) {
                    imageUrl = imgData.data.url;
                } else {
                    console.error("Image upload failed", imgData);
                    toast.warning("Failed to upload image, but continuing...");
                }
                setUploading(false);
            }

            const res = await fetch("/api/places", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ ...formData, image: imageUrl }),
            });

            if (res.ok) {
                const data = await res.json();
                setOpen(false);
                setFormData({ name: "", category: "Shop", city: "", area: "", image: "", lat: null, lng: null, googleMapsLink: "" });
                setImageFile(null);
                toast.success("Place added successfully!");
                router.push(`/place/${data._id}`);
            } else {
                toast.error("Failed to add place");
            }
        } catch (error) {
            console.error(error);
            toast.error("Something went wrong");
        } finally {
            setLoading(false);
            setUploading(false);
        }
    };

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                {trigger || (
                    children ? children : (
                        <Button className="bg-[#1a3c28] hover:bg-[#1a3c28]/90 text-white font-semibold rounded-lg px-6 shadow-sm">
                            <PlusCircle className="mr-2 h-4 w-4" />
                            Add Place
                        </Button>
                    )
                )}
            </DialogTrigger>
            <DialogContent className="sm:max-w-[500px] bg-white p-0 overflow-hidden gap-0 rounded-2xl border-none max-h-[90vh] flex flex-col">
                <div className="bg-[#eefbf3] p-6 border-b border-emerald-900/5 shrink-0">
                    <DialogHeader>
                        <DialogTitle className="text-2xl font-bold text-emerald-950 flex items-center gap-2">
                            <div className="w-8 h-8 bg-emerald-100 text-emerald-700 rounded-lg flex items-center justify-center">
                                <Store className="w-5 h-5" />
                            </div>
                            Add a Public Place
                        </DialogTitle>
                        <DialogDescription className="text-slate-600 ml-10">
                            Help others by adding a shop or service to the live tracking system.
                        </DialogDescription>
                    </DialogHeader>
                </div>

                <div className="p-6 overflow-y-auto scrollbar-hide">
                    <form onSubmit={handleSubmit} className="space-y-5">
                        <div className="space-y-2">
                            <label className="text-sm font-semibold text-slate-700">Place Name</label>
                            <input
                                type="text"
                                required
                                placeholder="e.g. Apollo Pharmacy"
                                className="w-full px-4 py-2.5 rounded-lg border border-slate-200 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-200 outline-none transition-all placeholder:text-slate-400"
                                value={formData.name}
                                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                            />
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-2">
                                <label className="text-sm font-semibold text-slate-700">City</label>
                                <div className="relative">
                                    <MapPin className="absolute left-3 top-3 w-4 h-4 text-slate-400" />
                                    <input
                                        type="text"
                                        required
                                        placeholder="Bangalore"
                                        className="w-full pl-9 pr-4 py-2.5 rounded-lg border border-slate-200 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-200 outline-none transition-all placeholder:text-slate-400"
                                        value={formData.city}
                                        onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                                    />
                                </div>
                            </div>
                            <div className="space-y-2">
                                <label className="text-sm font-semibold text-slate-700">Area</label>
                                <input
                                    type="text"
                                    required
                                    placeholder="Indiranagar"
                                    className="w-full px-4 py-2.5 rounded-lg border border-slate-200 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-200 outline-none transition-all placeholder:text-slate-400"
                                    value={formData.area}
                                    onChange={(e) => setFormData({ ...formData, area: e.target.value })}
                                />
                            </div>
                        </div>

                        <div className="space-y-2">
                            <label className="text-sm font-semibold text-slate-700">Category</label>
                            <div className="relative">
                                <Building2 className="absolute left-3 top-3 w-4 h-4 text-slate-400" />
                                <select
                                    className="w-full pl-9 pr-4 py-2.5 rounded-lg border border-slate-200 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-200 outline-none transition-all appearance-none bg-white font-medium text-slate-700"
                                    value={formData.category}
                                    onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                                >
                                    {categories.map((cat) => (
                                        <option key={cat} value={cat}>{cat}</option>
                                    ))}
                                </select>
                            </div>
                        </div>

                        {/* Map Section */}
                        <div className="z-0 pt-2">
                            <label className="text-sm font-semibold text-slate-700 mb-2 block">Pin Location</label>
                            <MapPicker
                                onLocationSelect={(loc: { lat: number, lng: number }) => setFormData({ ...formData, lat: loc.lat, lng: loc.lng })}
                                cityQuery={formData.city || formData.area ? `${formData.area || ''}, ${formData.city || ''}` : undefined}
                            />
                        </div>

                        <div className="space-y-2">
                            <label className="text-sm font-semibold text-slate-700">Google Maps Link (Optional)</label>
                            <div className="relative">
                                <LinkIcon className="absolute left-3 top-3 w-4 h-4 text-slate-400" />
                                <input
                                    type="url"
                                    placeholder="https://maps.google.com/..."
                                    className="w-full pl-9 pr-4 py-2.5 rounded-lg border border-slate-200 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-200 outline-none transition-all placeholder:text-slate-400"
                                    value={formData.googleMapsLink}
                                    onChange={(e) => setFormData({ ...formData, googleMapsLink: e.target.value })}
                                />
                            </div>
                        </div>

                        <div className="space-y-2">
                            <label className="text-sm font-semibold text-slate-700">Photo (Optional)</label>
                            <div className="flex items-center gap-4">
                                <div className="relative flex-1">
                                    <input
                                        type="file"
                                        accept="image/*"
                                        onChange={handleFileChange}
                                        className="hidden"
                                        id="image-upload"
                                    />
                                    <label
                                        htmlFor="image-upload"
                                        className="flex items-center justify-center w-full px-4 py-2.5 border-2 border-dashed border-slate-300 rounded-lg cursor-pointer hover:border-emerald-500 hover:bg-emerald-50 transition-all text-sm text-slate-500 font-medium"
                                    >
                                        {imageFile ? (
                                            <span className="text-emerald-600 truncate">{imageFile.name}</span>
                                        ) : (
                                            <span className="flex items-center gap-2">
                                                <ImagePlus className="w-4 h-4" />
                                                Click to upload
                                            </span>
                                        )}
                                    </label>
                                </div>
                                {imageFile && (
                                    <Button
                                        type="button"
                                        variant="ghost"
                                        size="sm"
                                        onClick={() => setImageFile(null)}
                                        className="text-red-500 hover:text-red-700 hover:bg-red-50"
                                    >
                                        Remove
                                    </Button>
                                )}
                            </div>
                            <p className="text-[10px] text-slate-400">Supported: JPG, PNG. Max 5MB.</p>

                            <div className="relative flex items-center gap-2 mt-2">
                                <div className="h-px bg-slate-200 flex-1"></div>
                                <span className="text-xs text-slate-400 font-medium">OR</span>
                                <div className="h-px bg-slate-200 flex-1"></div>
                            </div>

                            <div className="relative mt-2">
                                <LinkIcon className="absolute left-3 top-3 w-4 h-4 text-slate-400" />
                                <input
                                    type="url"
                                    placeholder="Paste image URL directly..."
                                    className="w-full pl-9 pr-4 py-2.5 rounded-lg border border-slate-200 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-200 outline-none transition-all placeholder:text-slate-400"
                                    value={formData.image}
                                    onChange={(e) => setFormData({ ...formData, image: e.target.value })}
                                />
                            </div>
                        </div>

                        <Button
                            type="submit"
                            disabled={loading || uploading}
                            className="w-full h-11 bg-[#1a3c28] hover:bg-[#1a3c28]/90 text-white font-bold text-base rounded-xl mt-2"
                        >
                            {loading || uploading ? (
                                <span className="flex items-center gap-2">
                                    <Loader2 className="w-4 h-4 animate-spin" />
                                    {uploading ? "Uploading Image..." : "Adding Place..."}
                                </span>
                            ) : "Add Place"}
                        </Button>
                    </form>
                </div>
            </DialogContent>
        </Dialog>
    );
}
