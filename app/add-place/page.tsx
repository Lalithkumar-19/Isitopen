"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { MapPin, Building2, Store } from "lucide-react";
import { toast } from "sonner";

export default function AddPlace() {
    const router = useRouter();
    const [loading, setLoading] = useState(false);
    const [formData, setFormData] = useState({
        name: "",
        category: "Shop", // Default
        city: "",
        area: ""
    });

    const categories = ["Medical", "Bank", "Office", "Shop", "Food", "Other"];

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);

        try {
            const res = await fetch("/api/places", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(formData),
            });

            if (res.ok) {
                const data = await res.json();
                toast.success("Place added successfully!");
                router.push(`/place/${data._id}`); // Redirect to the new place
            } else {
                toast.error("Failed to add place");
            }
        } catch (error) {
            console.error(error);
            toast.error("Something went wrong");
        } finally {
            setLoading(false);
        }
    };

    return (
        <main className="min-h-screen pt-32 pb-20 px-6 bg-[#eefbf3] flex justify-center">
            <div className="w-full max-w-lg bg-white p-8 rounded-2xl shadow-xl border border-emerald-900/5 h-fit">
                <div className="text-center mb-8">
                    <div className="mx-auto w-12 h-12 bg-emerald-100 text-emerald-700 rounded-full flex items-center justify-center mb-4">
                        <Store className="w-6 h-6" />
                    </div>
                    <h1 className="text-2xl font-bold text-slate-900">Add a Public Place</h1>
                    <p className="text-slate-500 mt-2">Help others by adding a shop or service.</p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-6">
                    <div>
                        <label className="block text-sm font-semibold text-slate-700 mb-2">Place Name</label>
                        <input
                            type="text"
                            required
                            placeholder="e.g. Apollo Pharmacy"
                            className="w-full px-4 py-3 rounded-lg border border-slate-200 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-200 outline-none transition-all"
                            value={formData.name}
                            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-semibold text-slate-700 mb-2">City</label>
                            <div className="relative">
                                <MapPin className="absolute left-3 top-3.5 w-4 h-4 text-slate-400" />
                                <input
                                    type="text"
                                    required
                                    placeholder="e.g. Bangalore"
                                    className="w-full pl-9 pr-4 py-3 rounded-lg border border-slate-200 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-200 outline-none transition-all"
                                    value={formData.city}
                                    onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                                />
                            </div>
                        </div>
                        <div>
                            <label className="block text-sm font-semibold text-slate-700 mb-2">Area / Locality</label>
                            <input
                                type="text"
                                required
                                placeholder="e.g. Indiranagar"
                                className="w-full px-4 py-3 rounded-lg border border-slate-200 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-200 outline-none transition-all"
                                value={formData.area}
                                onChange={(e) => setFormData({ ...formData, area: e.target.value })}
                            />
                        </div>
                    </div>

                    <div>
                        <label className="block text-sm font-semibold text-slate-700 mb-2">Category</label>
                        <div className="relative">
                            <Building2 className="absolute left-3 top-3.5 w-4 h-4 text-slate-400" />
                            <select
                                className="w-full pl-9 pr-4 py-3 rounded-lg border border-slate-200 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-200 outline-none transition-all appearance-none bg-white font-medium text-slate-700"
                                value={formData.category}
                                onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                            >
                                {categories.map((cat) => (
                                    <option key={cat} value={cat}>{cat}</option>
                                ))}
                            </select>
                        </div>
                    </div>

                    <Button
                        type="submit"
                        disabled={loading}
                        className="w-full h-12 bg-[#1a3c28] hover:bg-[#1a3c28]/90 text-white font-bold text-lg rounded-xl shadow-lg shadow-emerald-900/20"
                    >
                        {loading ? "Adding..." : "Add Place"}
                    </Button>
                </form>
            </div>
        </main>
    );
}
