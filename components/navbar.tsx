"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Menu, X, Store, Search, PlusCircle } from "lucide-react";
import Link from "next/link";
import { AddPlaceModal } from "@/components/add-place-modal";
import { useRouter } from "next/navigation";

export function Navbar() {
    const [isOpen, setIsOpen] = useState(false);
    const links = [
        { href: "/", label: "Home", isHome: true },
        { href: "/search", label: "Browse Places", isHome: false },
        { href: "/#how-it-works", label: "How it Works", isHome: true },
        { href: "/#logic-behind", label: "Logic Behind", isHome: true },
        { href: "/#faq", label: "FAQ", isHome: true },
    ];

    const navigate = useRouter();
    const navigateTo = (path: string) => {
        if (path.startsWith("/#")) {
            navigate.push("/");
            setTimeout(() => {
                document.querySelector(path)?.scrollIntoView({ behavior: "smooth" });
            }, 1000);
        } else {
            navigate.push(path);
        }
    }

    return (
        <nav className="sticky top-0 z-50 w-full border-b border-emerald-900/10 bg-[#eefbf3] backdrop-blur-md supports-[backdrop-filter]:bg-[#eefbf3]/80">
            <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-6 lg:px-8">
                {/* Logo */}
                <Link href="/" className="flex items-center gap-2">
                    <div className="flex size-10 items-center justify-center rounded-lg bg-emerald-600 text-white">
                        <Store className="size-6" />
                    </div>
                    <div className="flex flex-col leading-none">
                        <span className="text-xl font-bold text-emerald-950 tracking-tight">Isitopen</span>
                        <span className="text-[10px] font-semibold text-emerald-600 tracking-widest uppercase">LIVE STATUS</span>
                    </div>
                </Link>

                {/* Desktop Navigation */}
                <div className="hidden md:flex items-center gap-8 text-sm font-semibold text-slate-600">
                    {links.map((link) => (
                        <Link
                            key={link.href}
                            href={link.href}
                            className={`text-slate-900 hover:text-emerald-700 transition-colors  text-emerald-700" : "") : ""}`}
                            onClick={() => navigateTo(link.href)}
                        >
                            {link.label}
                        </Link>
                    ))}

                </div>

                {/* Desktop Actions */}
                <div className="hidden md:flex items-center gap-4">
                    <Link href="/search">
                        <Button variant="ghost" className="font-semibold text-slate-700 hover:bg-emerald-50 hover:text-emerald-700">
                            <Search className="mr-2 h-4 w-4" />
                            Find Status
                        </Button>
                    </Link>
                    <AddPlaceModal />
                </div>

                {/* Mobile Menu Button */}
                <div className="flex md:hidden">
                    <button
                        type="button"
                        className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-slate-700 hover:bg-emerald-50"
                        onClick={() => setIsOpen(!isOpen)}
                    >
                        <span className="sr-only">Open main menu</span>
                        {isOpen ? <X className="size-6" /> : <Menu className="size-6" />}
                    </button>
                </div>
            </div>

            {/* Mobile Menu */}
            {isOpen && (
                <div className="md:hidden border-t border-emerald-900/10 bg-[#eefbf3]">
                    <div className="space-y-1 px-6 py-6 pb-20">
                        <Link
                            href="/"
                            className="block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-slate-900 hover:bg-emerald-50"
                            onClick={() => setIsOpen(false)}
                        >
                            Home
                        </Link>
                        <Link
                            href="/search"
                            className="block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-slate-900 hover:bg-emerald-50"
                            onClick={() => setIsOpen(false)}
                        >
                            Browse Places
                        </Link>
                        <Link
                            href="/about"
                            className="block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-slate-900 hover:bg-emerald-50"
                            onClick={() => setIsOpen(false)}
                        >
                            How it Works
                        </Link>

                        <div className="mt-8 space-y-4">
                            <Link href="/search">
                                <Button variant="outline" className="w-full justify-start font-semibold text-slate-700 border-emerald-200 hover:bg-emerald-50 mb-4">
                                    <Search className="mr-2 h-4 w-4" />
                                    Find Status
                                </Button>
                            </Link>
                            <AddPlaceModal>
                                <Button className="w-full justify-start bg-[#1a3c28] hover:bg-[#1a3c28]/90 text-white font-semibold shadow-sm">
                                    <PlusCircle className="mr-2 h-4 w-4" />
                                    Add Place
                                </Button>
                            </AddPlaceModal>
                        </div>
                    </div>
                </div>
            )}
        </nav>
    );
}
